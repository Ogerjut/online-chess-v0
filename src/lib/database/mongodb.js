import { MongoClient } from 'mongodb';

const MONGO_URI = 'mongodb://localhost:27017'; 
const DB_NAME = 'games';

const client = new MongoClient(MONGO_URI);
await client.connect();

console.log('✅ Connecté à MongoDB');

export const db = client.db(DB_NAME);
export const usersCollection = db.collection('users');
export const tablesCollection = db.collection("tables")
export const matchmakingCollection = db.collection("matchmaking")
