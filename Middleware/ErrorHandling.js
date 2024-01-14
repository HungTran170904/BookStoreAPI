import RequestError from "../CustomedError/RequestError.js"
import TokenError from "../CustomedError/TokenError.js"
import UnauthorizedError from "../CustomedError/UnauthorizedError.js"

export const ErrorMiddleWare=(error, req, res,next)=>{
          console.log("Error:", error.message)
          if(error instanceof TokenError){
                    res.status(401).send(error.message)
          }
          else if(error instanceof RequestError){
                    res.status(400).send(error.message);
          }
          else if(error instanceof UnauthorizedError){
                    res.status(403).send(error.message);
          }
          else{
                    res.status(500).send("Unknow error")
          }
}