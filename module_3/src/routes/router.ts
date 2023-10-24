import express from 'express';
import UserController from '../controllers/UserController';

const router = express.Router();

router.post('/v1/record/', UserController.create);
router.get('/v1/record/', UserController.getAll);

export default router;
