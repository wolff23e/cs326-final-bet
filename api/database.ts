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
    
    public async getTaggedEvents (tag: string, limit: number): Promise<EventData[] > {
        const eventCollection = this.db!.collection(Collection.EVENTS); 
        console.log(tag);

        try {
            const result = await eventCollection.find({tags: { $elemMatch: { $eq: tag } }}).toArray();
            console.log("getTaggedEvents: " + result);

            if (result) return result as EventData[];
        } catch (e) {
            console.log(e);
        }
        return [];
    } 
    //will be for tag pulling
    public async tagInterestDisplay (limit: number): Promise<string[] > {
        const eventArray = await this.getRecentEvents(limit);

        const tagArrayReturn: string[] = [];
        //make loop function for tags
        for(var i = 0; i < eventArray.length; i++) {
            eventArray[i].tags.forEach(tag => {
                if (tag) tagArrayReturn.push(tag);
            })
        }
        var uniqueItems = Array.from(new Set(tagArrayReturn));
        uniqueItems = uniqueItems.filter(item => item);
        return uniqueItems;
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

    public async getEvent (id: string): Promise<EventData | null> {
        const eventCollection = this.db!.collection(Collection.EVENTS); 
    
        try {
            const result = await eventCollection.findOne({ _id:id }, { projection: {_id: false} });
            if (result) return result as EventData;
        } catch (e) {
            console.log(e);
        }

        return null;
    }

    public async getRecentEvents (limit: number): Promise<EventData[]> {
        const eventCollection = this.db!.collection(Collection.EVENTS); 
        console.log(limit);
    
        try {
            const result = await eventCollection.find().sort( { postTimestamp: -1 }).limit(limit).toArray();
            if (result) return result as EventData[];
        } catch (e) {
            console.log(e);
        }

        return [];
    }


    public async updateEvent (data: EventData): Promise<boolean> {
        const eventCollection = this.db!.collection(Collection.EVENTS);

        try {

            await eventCollection.update({ _id:data.id },{...data, _id: data.id});
            return true;
        } catch (e) {
            console.log(e);
        }

        return true;
    }




    public async getUserEvents (email: string): Promise<EventData[] | null> {
        const eventCollection = this.db!.collection(Collection.EVENTS);
        

        try {
            const events=await eventCollection.find({author:email});
            return events.toArray();
        } catch (e) {
            console.log(e);
        }

        return [];
    }
    public async deleteEvent (id: string): Promise<boolean> {
        const eventCollection = this.db!.collection(Collection.EVENTS);

        try {
            await eventCollection.deleteOne({ _id: id });
            return true;
        } catch (e) {
            console.log(e);
        }

        return false;
    }

   

}

const db = new Database();
export { db };