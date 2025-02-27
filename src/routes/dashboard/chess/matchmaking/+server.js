import { json } from '@sveltejs/kit';
import { matchmakingCollection, tablesCollection } from '$lib/database/mongodb.js';

export async function POST({ request }) {
    const { playerId } = await request.json();

    console.log(`🔍 Joueur ${playerId} cherche une partie...`);

    // Vérifier si un joueur attend déjà
    const opponent = await matchmakingCollection.findOne({ gameId: null });

    if (opponent) {
        console.log(`✅ Adversaire trouvé : ${opponent.playerId}`);

        // Créer une partie
        const newGame = await tablesCollection.insertOne({
            players: [opponent.playerId, playerId],
            status: "ongoing",
            createdAt: new Date()
        });

        const gameId = newGame.insertedId.toString();

        // Mettre à jour les joueurs pour les assigner à la partie
        await matchmakingCollection.updateOne({ _id: opponent._id }, { $set: { gameId } });
        await matchmakingCollection.insertOne({ playerId, joinedAt: new Date(), gameId });

        console.log(`🎮 Partie créée : ${gameId}`);

        return json({ success: true, gameId });
    } else {
        // Aucun adversaire, ajouter le joueur à la file d'attente
        await matchmakingCollection.insertOne({ playerId, joinedAt: new Date(), gameId: null });

        console.log(`⏳ Joueur ${playerId} en attente d'un adversaire...`);
        return json({ success: true, waiting: true });
    }
}
