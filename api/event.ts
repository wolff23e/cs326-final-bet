import { Response, NextFunction } from "express";

interface EventData {
    id: number,
    title: string,
    description: string,
    eventStartTime: number,
    image: string,
    author: string, // name
    postTimestamp: number,
}

const eventsData = [{
    id: 76876423,
    title: "Come hike with us at the UMass Hiking Club",
    description: "Please come sign up at the campus center this Wednesday at 4pm!!",
    eventStartTime: 1587093646,
    image: "https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/topic_centers/2019-8/couple-hiking-mountain-climbing-1296x728-header.jpg?w=1155",
    author: "Sathvik Birudavolu", // name
    postTimestamp: 1584000000,
},{
    id: 12887234,
    title: "Come ski with us at the UMass Ski and Baord Club!",
    description: "Please come sign up at the campus center this Friday at 10pm!!",
    eventStartTime: 1589000000,
    image: "https://upload.wikimedia.org/wikipedia/commons/8/84/Ski_Famille_-_Family_Ski_Holidays.jpg",
    author: "Emma Wolff", // name
    postTimestamp: 1582000000,
}];

export default class Event {

    public static async create(data: any, response: Response): Promise<void> {

        // on success return { "success": true }
        // on fail return { "error": "<reason>", "success": false }
        response.write(JSON.stringify({ success: true }))
        response.end();
    }

    public static async update(data: any, response: Response): Promise<void> {

        // on success return { "success": true }
        // on fail return { "success": false, "error": "<reason>"}
        response.write(JSON.stringify({ success: true }))
        response.end();
    }

    public static async getPopularEvents(data: any, response: Response): Promise<void> {

        response.write(JSON.stringify( { success: true, data: eventsData } ))
        response.end();
    }

    public static async getEventByID(data: any, response: Response): Promise<void> {
        const id = data && !isNaN(data) ? parseInt(data) : -1;

        if (![0, 1].includes(id)) {
            response.write(JSON.stringify( { success: false, data: id } ));
            response.end();
            return;
        }

        response.write(JSON.stringify( { success: true, data: eventsData[id] } ))
        response.end();
    }

    public static async deleteEventByID(data: any, response: Response): Promise<void> {
        
        if (!data.id || isNaN(data.id)) {
            response.write(JSON.stringify( { success: false } ));
            response.end();
            return;
        }

        response.write(JSON.stringify( { success: true } ));
        response.end();
    }

    public static async getTags(data: any, response: Response): Promise<void> {

        const fakeTags = [
            "UMass", 
            "Holyoke",
            "Ski and Board Club",
            "Food",
            "Movies",
            "Bars",
            "Hiking",
            "Robotics",
            "Math",
            "Machine Learning",
            "Bitcoin"
        ];

        const count = data.count ? Math.min(parseInt(data.count), fakeTags.length) : fakeTags.length;

        response.write(JSON.stringify( { success: true, "tags": fakeTags.slice(0, count) } ))
        response.end();
    }

}