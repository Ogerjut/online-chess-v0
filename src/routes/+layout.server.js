export async function load({ locals }) {
    return {
        logged: !!locals.user, // !! pour conversion en bool
        user: locals.user ? { ...locals.user, _id: locals.user._id.toString() } : null 
    };
}
