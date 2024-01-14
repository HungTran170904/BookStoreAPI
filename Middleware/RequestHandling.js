import jwt from "jsonwebtoken";
import { SERCRET_KEY } from "../Config/index.js";
import TokenError from "../CustomedError/TokenError.js";
import { DB } from "../Repository/DBConfig.js";
import UnauthorizedError from "../CustomedError/UnauthorizedError.js";

export const RequestMiddleWare=async(req, res, next)=>{
          if(req.originalUrl.startsWith("/api/user/auth")) next();
          else {
                    try {    
                              //decode jwt
                              const accessToken=req.headers.authorization;
                              if(!accessToken) throw new TokenError("Token does not exist")
                              var decoded=jwt.verify(accessToken, SERCRET_KEY);
                              console.log("OK")
                              if(decoded.type!=="ACCESS") throw new TokenError("This is not access token");
                              const user=await DB.User.findOne({where:{id:decoded.userId}})
                              //Authorization
                              if(req.originalUrl.indexOf("/admin")>=0&&user.role!="ADMIN")
                                        throw new UnauthorizedError("You do not have permissions to access this url endpoint");
                              req.user=user;
                              next();
                    } catch (error) {
                              next(error);
                    }
          }
}