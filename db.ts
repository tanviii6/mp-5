"use server"
import {MongoClient, Db, Collection} from "mongodb";

const MONGO_URI = process.env.MONGO_URI as string;

if(!MONGO_URI){
    throw new Error('MONGO_URI is not configured in env variable');
}

const DB_NAME = "mp-5";
const URL_COLLECTION = "url_collection";

let client : MongoClient | null = null;
let db: Db | null = null;

async function connect() : Promise<Db>{
    if(!client){
        client = new MongoClient(MONGO_URI);
        await client.connect();
    }

    return client.db(DB_NAME);
}

export default async function getCollection(): Promise<Collection>{

    if(!db){
        db = await connect();
    }

    return db.collection(URL_COLLECTION);
}