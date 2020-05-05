import { MongoClient, Db } from 'mongodb';
import { mongo as mongoCred } from "../secret.json";
import { UserData } from './user';
import { EventData } from './event';
import * as crypto from 'crypto';

export enum Collection {
    USERS = "users",
    EVENTS = "events",
    TAGS = "tags"
}

class Database {

    private db: Db | null = null;  

    constructor() {
        let client = new MongoClient(mongoCred.url, { useNewUrlParser: true });

        (async () => {
            try {
                client = await client.connect();
                this.db = client.db(mongoCred.db);
                console.log("Successfully connected to MongoDB");
            } catch (err) {
                console.log(err);
            }
        })();

        
    }

    public async addUser (data: UserData): Promise<void> {
        console.log(JSON.stringify(data));
        const userCollection = this.db!.collection(Collection.USERS);
    
        try {
            await userCollection.insertOne({...data, _id: data.email});
        } catch (e) {
            console.log(e);
        }
    }

    public async getUser (email: string): Promise<UserData | null> {
        const userCollection = this.db!.collection(Collection.USERS);
        console.log(JSON.stringify({email}));
    
        try {
            const result = await userCollection.findOne({ _id: email }, { projection: {_id: false} });
            if (result) return result as UserData;
        } catch (e) {
            console.log(e);
        }

        return null;
    }

    public async addEvent (data: EventData): Promise<string | null> {
        const eventCollection = this.db!.collection(Collection.EVENTS);

        // make unique ID
        const dataString = JSON.stringify(data);
        const eventId = crypto.createHash("sha256").update(dataString).digest("hex");

        try {
            await eventCollection.insert({...data, _id: eventId, id: eventId });
            return eventId;
        } catch (e) {
            console.log(e);
        }

        return null;
    }

}

const db = new Database();
export { db };