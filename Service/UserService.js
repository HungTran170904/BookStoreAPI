import { SALT_ROUNDS, SERCRET_KEY } from "../Config/index.js";
import RequestError from "../CustomedError/RequestError.js";
import TokenError from "../CustomedError/TokenError.js";
import { DB } from "../Repository/DBConfig.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const {User}=DB;
export async function addNewUserService(newUser){
          if(!newUser.email||!checkEmail(newUser.email)) throw new RequestError("Email is invalid");
          const existsUser=await User.findOne({where:{email: newUser.email}});
          if(existsUser) throw new RequestError("Email "+newUser.email+" has already existed");
          if(!newUser.password||!checkPassword(newUser.password)) 
                    throw new RequestError("password should contain at least one number and one special character");
          newUser.password=bcrypt.hashSync(newUser.password, parseInt(SALT_ROUNDS));
          newUser.role="USER";
          const savedUser=await User.create(newUser);
          return {
                    id: savedUser.id,
                    email: savedUser.email,
                    name: savedUser.name,
                    role: savedUser.role
          };
}
function checkEmail(email){
          const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
          return emailRegex.test(email)
}
function checkPassword(password){
          const passwordRegex=/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
          return passwordRegex.test(password);
}
function generateToken(user,time, type){
          const dataInToken={userId: user.id,name: user.name, type: type}
          try {
                    var token = jwt.sign(dataInToken, SERCRET_KEY, { algorithm:"HS256", expiresIn: time * 3600 });
                    return token;
          } catch (error) {
                    console.log("Token generation error", error);
          }
}
export async function loginService({email, password}){
          const user=await User.findOne({where:{email: email}})
          if(!user) throw new RequestError("Email "+email+" not found");
          if(!bcrypt.compareSync(password, user.password)) throw new RequestError("Password is incorrect");
          var refreshToken=generateToken(user,5, "REFRESH");
          console.log("refreshToken", refreshToken)
          var accessToken=generateToken(user,1, "ACCESS");
          console.log("accessToken", accessToken)
          await user.update({refreshToken: refreshToken})
          return {
                    user:{id: user.id, name:user.name},
                    accessToken: accessToken,
                    refreshToken: refreshToken
          }
}
export async function NewAccessTokenService({refreshToken}){
          var decoded=jwt.verify(refreshToken, SERCRET_KEY);
          const user=await User.findOne({where:{id: decoded.userId}})
          if(decoded.userId==user.id&&refreshToken==user.refreshToken)
                    return generateToken(user,1, "ACCESS");
          else throw new TokenError("Refresh token is invalid");
}
