import { Response, NextFunction } from "express";


export default class User {

    public static async authenticate(jwt: string, response: Response, next: NextFunction): Promise<void> {
        if (jwt === "<jwt token>") { // JWT is valid
            next();
        } else {
            response.write(JSON.stringify({ "error": "JWT not valid" }));
            response.end();
        }
    }

    public static async register(data: any, response: Response): Promise<void> {

        // on success return { "success": true }
        // on fail return { "error": "<reason>", "success": false }
        response.write(JSON.stringify({ success: true }))
        response.end();
    }

    public static async login(data: any, response: Response): Promise<void> {

        // on success return { "success": true, jwt: "<jwt token>" }
        // on fail return { "success": false, "error": "password or email incorrect"}
        response.write(JSON.stringify({ jwt: "<jwt token>", success: true }))
        response.end();
    }

}