
import Router from './router';

const PORT = process.env.PORT || 8080;

const router = new Router();
router.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`))
