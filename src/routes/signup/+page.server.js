import { fail } from '@sveltejs/kit';
import {usersCollection} from '$lib/database/mongodb.js'
import bcrypt from 'bcrypt'

export const actions = {
    register: async ({ request }) => {
        const data = await request.formData();
        const username = data.get('username');
        const password = data.get('password');
        console.log(data)

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await usersCollection.findOne({ username });
        if (existingUser) {
            console.log('user already exists...')
        return fail(400, { error: "User already exists !" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await usersCollection.insertOne({ username, password: hashedPassword });

        console.log("user created")
        return {success : true}
    }
};
