import { Response, NextFunction, Request } from "express";
import { db } from './database';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET || '<secret>';

export interface UserData {
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    school: string
}

export default class User {

    private static SALT_ROUNDS = 5;

    public static async authenticate(request: Request, response: Response, next: NextFunction): Promise<void> {

        if (!request.body.jwt) {
            response.write(JSON.stringify({ "error": "JWT not valid" }));
            response.end();
            return;
        }

        try {
            const payload = jwt.verify(request.body.jwt, jwtSecret) as any;
            response.locals.authUser = payload.email;
            console.log("authenticated user: " + JSON.stringify(payload)); 
            next();
        } catch {
            response.write(JSON.stringify({ "error": "JWT not valid" }));
            response.end();
        }
    }

    public static async register(data: any, response: Response): Promise<void> {

        const foundUser = await db.getUser(data.email);

        const saltedPassword = await bcrypt.hash(data.password, this.SALT_ROUNDS);
        data.password = saltedPassword;

        if (foundUser) {
            response.write(JSON.stringify({ success: false, error: "User already exists." }))
        } else {
            await db.addUser(data);
            response.write(JSON.stringify({ success: true }))
        }

        response.end();
    }

    public static async login(data: any, response: Response): Promise<void> {
        const foundUser = await db.getUser(data.email);

        if (!foundUser) {
            response.write(JSON.stringify({ success: false, error: "User not registered." }));
            response.end();
            return;
        } 

        // passwords don't match
        if (!(await bcrypt.compare(data.password, foundUser.password))) {
            response.write(JSON.stringify({ success: false, error: "Email or password incorrect." }));
            response.end();
            return;
        }

        const jwtToken = jwt.sign({ email: data.email, iat: (Date.now() / 1000) }, jwtSecret);

        response.write(JSON.stringify({ jwt: jwtToken, success: true }))
        response.end();
    }

}