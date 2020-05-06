
import Router from './router';
import { db } from './database';


const router = new Router();

const PORT = process.env.PORT || 8080;



router.listen(PORT, () =>
    { 
        if (process.env.PORT) console.log(`App listening at https://murmuring-woodland-32500.herokuapp.com`);
        else console.log(`App listening at http://localhost:${PORT}`);
    }
)
