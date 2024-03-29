import express from 'express';
import { accessControl,verifyToken } from '../middleware/userMiddleware.js';
import { DataConroller } from '../controllers/dataController.js';

const router = express.Router();
router.use(express.json());

router.post("/add-book",verifyToken,accessControl.isSiteEngineer,DataConroller.addNewBookController)

router.get("/get-c-books",verifyToken,accessControl.isAdminManagerClient,DataConroller.getConfirmedBookController)

router.get("/get-uc-books",verifyToken,accessControl.isAdminManagerClient,DataConroller.getUnConfirmedBooksController)

router.delete("/delete-book",verifyToken,accessControl.isAdmin,DataConroller.deleteBookConroller)

router.put("/confirm-book",verifyToken,accessControl.isAdminManager,DataConroller.confirmBookController)

export default router