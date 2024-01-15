import express from 'express'
import { NewAccessTokenController, addNewUserController, loginController, uploadProfileController } from '../Controller/UserController.js';
import { UploadMiddleWare } from '../Middleware/UploadMiddleWare.js';
const UserRouter=express.Router();
UserRouter.post("/auth/login", loginController);
UserRouter.post("/auth/newAccessToken", NewAccessTokenController);
UserRouter.post("/auth/addNewUser",  addNewUserController);
UserRouter.post("/uploadProfile",UploadMiddleWare,uploadProfileController);
export default UserRouter;