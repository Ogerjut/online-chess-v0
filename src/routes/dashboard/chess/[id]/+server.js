import { json } from '@sveltejs/kit';
import { tablesCollection, usersCollection } from '$lib/database/mongodb.js';
import { ObjectId } from 'mongodb';

export async function POST({ request, params }) {
    const { playerId } = await request.json();
    
    // retirer player 
    const removePlayer = await tablesCollection.updateOne(
        { _id: new ObjectId(params.id) },  
        { $pull: { players: playerId } } 
    );
    
    const setReady = await tablesCollection.updateOne(
        { _id: new ObjectId(params.id) },  
        { $set: { ready: false } } 
    );
    
    const table = await tablesCollection.findOne({ _id: new ObjectId(params.id) })
    // si table vide, la supprimer
    if (table.players.length === 0) {
        tablesCollection.deleteOne({ _id: new ObjectId(params.id) })
        console.log("table supprimée")
        return json ({success : true, message : "a player left and deleted table"})
    }    
    return json({success : true, message : "a player left the table" });
    
}


export async function GET({request, params}) {
    const table = await tablesCollection.findOne({ _id: new ObjectId(params.id) })
    if (table.ready) {
            const players = [ await usersCollection.findOne({_id : new ObjectId(table.players[0])}), await usersCollection.findOne({_id : new ObjectId(table.players[1])})]  
            players[1]._id = players[1]._id.toString()
            players[0]._id = players[0]._id.toString()
            return json ({success :true, table : table, players : players, message : "table and players returned"})
        }
    
        return json ({success : false, message : "error"})
}
