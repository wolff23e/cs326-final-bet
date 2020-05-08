import { Response, NextFunction } from "express";
import { db } from './database';

export interface EventData {
    id: string,
    title: string,
    description: string,
    eventStartTime: number,
    location: string,
    image: string,
    tags: string[],
    author: string,
    postTimestamp: number
}

export default class Event {

    private static DEFAULT_EVENT_LIMIT = 10;
    private static DEFAULT_TAG_LIMIT = 10;


    public static async create(data: any, response: Response): Promise<void> {

        // set author and timestamp
        data.author = response.locals.authUser;
        data.postTimestamp = Math.floor(Date.now() / 1000);

        const id = await db.addEvent(data);

        if (!id) {
            response.write(JSON.stringify({ success: false, error: "Error creating event." }));
        } else {
            response.write(JSON.stringify({ success: true }))
        }

        response.end();
    }

    public static async update(data: any, response: Response): Promise<void> {

        if(!data.id){
            response.write(JSON.stringify( { success: false, error: "Event id not valid"} ))
            response.end();
            return;
        }

        const findEvent = await db.getEvent(data.id);
        if (!findEvent) {
            response.write(JSON.stringify( { success: false, error: "Event to update not found"} ))
            response.end();
            return;
        }

        if (findEvent.author !== response.locals.authUser) {
            response.write(JSON.stringify( { success: false, error: "User not authorized to update event."} ))
            response.end();
            return;
        }

        data.author = response.locals.authUser;
        data.postTimestamp = Math.floor(Date.now() / 1000);

        console.log("update:" + JSON.stringify(data));
        const updated=await db.updateEvent(data);

        if(!updated){
            response.write(JSON.stringify( { success: false, error: "Event could not be updated"} ))
            response.end();
            return;
        }
        response.write(JSON.stringify({ success: true }))
        response.end();
    }


    public static async getEvents(data: any, response: Response): Promise<void> {

        let limit = data.limit;
        if (!limit || isNaN(limit)) {
            limit = this.DEFAULT_EVENT_LIMIT;
        }

        const events = await db.getRecentEvents(limit);

        response.write(JSON.stringify( { success: true, data: events } ))
        response.end();
    }

    public static async getEventByID(data: any, response: Response): Promise<void> {
        if(!data.id){
            response.write(JSON.stringify( { success: false, error: "Event id not valid"} ))
            response.end();
            return;
        }

        const eventData = await db.getEvent(data.id);

        if(!eventData){
            response.write(JSON.stringify( { success: false, error: "Event not found"} ))
            response.end();
            return;
        }

        response.write(JSON.stringify( { success: true, data: eventData } ))
        response.end();
    }

    public static async deleteEventByID(data: any, response: Response): Promise<void> {
        
        console.log("deleteEventByID: " + JSON.stringify(data));

        if (!data.id) {
            response.write(JSON.stringify( { success: false } ));
            response.end();
            return;
        }

        const result = await db.deleteEvent(data.id);

        response.write(JSON.stringify( { success: result } ));
        response.end();
    }

    public static async getUserPostedEvents(data: any, response: Response): Promise<void> {

        const email=response.locals.authUser;
        const events=await db.getUserEvents(email);
        console.log(events);
        response.write(JSON.stringify( { success: true, data: events } ))
        response.end();
    }

    public static async getEventsByTag(data: any, response: Response): Promise<void> {

      if(!data.tag){
        response.write(JSON.stringify( { success: false, error: "Not valid" } ))
        response.end();
        return;
      }
        const events = await db.getTaggedEvents(data.tag, this.DEFAULT_TAG_LIMIT);
        console.log(events);
        response.write(JSON.stringify( { success: true, data: events } ))
        response.end();
    }
   

    public static async getTags(data: any, response: Response): Promise<void> {

        let limit = data.limit;
        if(!limit || isNaN(limit)){
            limit = this.DEFAULT_TAG_LIMIT;
        } 
        const tags = await db.tagInterestDisplay(limit);
        response.write(JSON.stringify( { success: true, tags } ))
        response.end();
    }

}