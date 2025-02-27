import { tablesCollection, usersCollection, matchmakingCollection } from '$lib/database/mongodb.js'
import { ObjectId } from 'mongodb'

export async function load({params}) {

    if (!params.id) {
        throw new Error("Missing table ID");
    }

    const table = await tablesCollection.findOne({_id : new ObjectId(params.id)})
    table._id = table._id.toString();

    if (table.ready) {
        const players = [ await usersCollection.findOne({_id : new ObjectId(table.players[0])}), await usersCollection.findOne({_id : new ObjectId(table.players[1])})]  
        players[1]._id = players[1]._id.toString()
        players[0]._id = players[0]._id.toString()
        return {params, table, players}
    } 
    
    return {params, table}
};