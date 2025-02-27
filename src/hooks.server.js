import { ObjectId } from "mongodb";
import { usersCollection } from "$lib/database/mongodb";

export async function handle({ event, resolve }) {
    const session = event.cookies.get("session");

    if (session) {
        try {
            // 💡 Convertit en ObjectId pour MongoDB
            const user = await usersCollection.findOne({ _id: new ObjectId(session) });

            if (user) {
                event.locals.user = user;
                // console.log("Utilisateur trouvé :", user);
            } else {
                // console.log("Utilisateur introuvable.");
                event.locals.user = null;
            }
        } catch (error) {
            // console.error("Erreur lors de la récupération de l'utilisateur :", error);
            event.locals.user = null;
        }
    } else {
        event.locals.user = null;
    }

    return await resolve(event);
}
