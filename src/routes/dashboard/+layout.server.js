export async function load({ locals }) {
    if (!locals.user) {
        return { user: null };
    }

    return { 
        user: {
            ...locals.user,
            _id: locals.user._id.toString() // 🔥 Convertir ObjectId en string
        }
    };
}
