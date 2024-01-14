import express from 'express'
import multer from "multer"
import { NewAccessTokenController, addNewUserController, loginController, uploadProfileController } from '../Controller/UserController.js';
import { UploadMiddleWare } from '../Middleware/UploadMiddleWare.js';
const UserRouter=express.Router();
UserRouter.post("/auth/login",multer().array(), loginController);
UserRouter.post("/auth/newAccessToken",multer().array(), NewAccessTokenController);
UserRouter.post("/auth/addNewUser",  addNewUserController);
UserRouter.post("/uploadProfile",UploadMiddleWare,uploadProfileController);
export default UserRouter;