import express, { Request, Response, NextFunction } from "express";
import User from './user';
import Event from './event';

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

      // Parse requests as JSON
      this.server.use(express.json());

      // Endpoint for API
      this.server.use('/api', this.router);

      // API Routes
      this.router.post('/user/register', this.registerHandler.bind(this));
      this.router.post('/user/login', this.loginHandler.bind(this));

      this.router.post('/event/popular', this.popularEventsHandler.bind(this));

      this.router.post('/event/create', [this.authHandler.bind(this), this.createEventHandler.bind(this)]);
      this.router.post('/event/update', [this.authHandler.bind(this), this.updateEventHandler.bind(this)]);
  
      this.router.all('*', this.errorHandler.bind(this));
    }

    private async errorHandler(_: Request, response: Response) : Promise<void> {
      response.write(JSON.stringify({'result' : 'invalid request'}));
      response.end();
    }
    
    private async authHandler(request: Request, response: Response, next: NextFunction) : Promise<void> {
      await User.authenticate(request.body.jwt, response, next);
    }

    private async registerHandler(request: Request, response: Response) : Promise<void> {
      await User.register(request.body, response);
    }

    private async loginHandler(request: Request, response: Response) : Promise<void> {
      await User.login(request.body, response);
    }

    private async createEventHandler(request: Request, response: Response) : Promise<void> {
      await Event.create(request.body, response);
    }

    private async updateEventHandler(request: Request, response: Response) : Promise<void> {
      await Event.update(request.body, response);
    }

    private async popularEventsHandler(request: Request, response: Response) : Promise<void> {
      await Event.getPopularEvents(request.body, response);
    }

    public listen(port: number, callback: () => void) : void  {
	    this.server.listen(port, callback);
    }

}

