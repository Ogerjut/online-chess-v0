import { json } from '@sveltejs/kit';
import { matchmakingCollection } from '$lib/database/mongodb.js';

export async function POST({ request }) {
    const { playerId } = await request.json();

    const player = await matchmakingCollection.findOne({ playerId });

    if (!player) {
        return json({ error: "Joueur non trouvé dans le matchmaking." }, { status: 404 });
    }

    if (player.gameId) {
        return json({ success: true, gameId: player.gameId });
    } else {
        return json({ success: true, waiting: true });
    }
}
