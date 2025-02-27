import { json } from '@sveltejs/kit';
import { tablesCollection } from '$lib/database/mongodb.js';
import { ObjectId } from 'mongodb';

export async function POST({ request }) {
    const { playerId } = await request.json();

    console.log(`🔍 Player ${playerId} look for a table ...`);

    const availableTable = await tablesCollection.findOne({ready : false });
  
    if (!availableTable) {
        const newTable = await tablesCollection.insertOne({
            players: [playerId],
            ready: false,
            completed: false,
            createdAt : new Date()
        });
     
        return json({ success: true, table : newTable.insertedId.toString() , message: "Table created and joined" });

    } else {
        const tableID = new ObjectId(availableTable._id)
        await tablesCollection.updateOne({ _id : tableID }, {$push : { players : playerId}});
        await tablesCollection.updateOne({ _id : tableID }, {$set : { ready: true } });
        
        return json({ success: true, table : tableID, message: "Existing table joined and ready" });
        
        
    }
}
