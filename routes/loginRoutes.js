import express from 'express';
import { loginController, newUserController } from '../controllers/authController.js';

const router = express.Router();
router.use(express.json());

router.post("/login", loginController);
// router.post("/newuser",newUserController);

export default router;