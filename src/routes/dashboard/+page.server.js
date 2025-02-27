import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
    if (!locals.user) {
        throw redirect(302, "/login");
    }
    return { 
        user: {
            ...locals.user,
            _id: locals.user._id.toString() // 🔥 Convertir ObjectId en string
        }
    };
}
