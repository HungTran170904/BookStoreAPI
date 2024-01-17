import { uploadImage } from "../Clouddinary/CloudinaryService.js";
import RequestError from "../CustomedError/RequestError.js";
import { NewAccessTokenService, addNewUserService, loginService } from "../Service/UserService.js";


export async function loginController(req, res, next){
          try {
                    const loginDTO=await loginService(req.body);
                    return res.status(200).json(loginDTO);
          } catch (error) {
                    console.log(error)
                    next(error);
          }
}
export async function NewAccessTokenController(req, res, next){
          try {
                    const newAccessToken=await NewAccessTokenService(req.body);
                    return res.status(200).send(newAccessToken);
          } catch (error) {
                    next(error);
          }
}
export async function addNewUserController(req, res, next){
          try {
                    const user=await addNewUserService(req.body);
                    return res.status(200).json(user);
          } catch (error) {
                    next(error);
          }
}
export async function uploadProfileController(req, res, next){
          try {     
                    if(!req.file) throw new RequestError("File not found");
                    req.user.profileUrl= await uploadImage(req.file, req.user.profileUrl);
                    return res.status(200).send(req.user.profileUrl);
          } catch (error) {
                    next(error)
          }
}
