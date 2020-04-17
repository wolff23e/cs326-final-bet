import express, { Request, Response } from "express";
import User from './user';

export default class Router {

    private server = express();
    private router = express.Router();

    constructor() {
		  // from https://enable-cors.org/server_expressjs.html
      this.router.use((request, response, next) => {
        response.header('Content-Type','application/json');
			  response.header('Access-Control-Allow-Origin', '*');
			  response.header('Access-Control-Allow-Headers', '*');
			  next();
      });
    
      // Serve static pages 
      this.server.use('/', express.static('./public'));

      // Endpoint for API
      this.server.use('/api', this.router);

      // API Routes
      this.router.post('/register', this.registerHandler.bind(this));
      this.router.post('/login', this.lginHandler.bind(this));
      this.router.all('*', this.errorHandler.bind(this));
    }

    private async errorHandler(_: Request, response: Response) : Promise<void> {
      response.write(JSON.stringify({'result' : 'invalid request'}));
      response.end();
    }
    
    private async registerHandler(request: Request, response: Response) : Promise<void> {
      await User.register(request.body, response);
    }

    private async lginHandler(request: Request, response: Response) : Promise<void> {
      await User.login(request.body, response);
    }

    public listen(port: number, callback: () => void) : void  {
	    this.server.listen(port, callback);
    }

}

