import { Router } from 'express';
import { logRequests } from './middleware/logRequest';
import { UserController } from './controller/UserController';

const router = Router();
const userController = new UserController();

router.get('/', logRequests, (req, res) => {
  res.send('hello World!');
});

router.post('/signup', userController.signUp);

export default router;
