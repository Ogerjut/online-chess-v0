import { fail } from '@sveltejs/kit';
import {usersCollection} from '$lib/database/mongodb.js'
import {compare} from 'bcrypt'

export const actions = {
    login : async ({ request, cookies }) => {
        const data = await request.formData()
        const username = data.get('username')
        const password = data.get('password')

        console.log("username", username);
        console.log("password", password);
        if (!username || !password) {
            return fail(400, { error: 'Email et mot de passe sont requis' });
          }

        const user = await usersCollection.findOne({username});
        if (!user) {
            return fail(401, { error: 'Identifiants invalides, username' });
          }
      
        const isValid = await compare(password, user.password);
        if (!isValid) {
        return fail(401, { error: 'Identifiants invalides, password' });
        }
      
        // Création du cookie de session
        cookies.set('session', user._id.toString(), {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7 // 1 semaine
        });
        
        console.log("connected")
        return {success : true,
                username : username }
    }
};
