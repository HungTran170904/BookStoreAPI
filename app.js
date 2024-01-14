import express from 'express'
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from 'cors'
import { HOST_NAME, NODE_ENV, PORT } from './Config/index.js'
import BookRouter from "./Route/BookRouter.js";
import morgan from 'morgan';
import { DB } from './Repository/DBConfig.js';
import UserRouter from './Route/UserRouter.js';
import { RequestMiddleWare } from './Middleware/RequestHandling.js';
import { ErrorMiddleWare } from './Middleware/errorHandling.js';
import OrderRouter from './Route/OrderRouter.js';
import CartRouter from './Route/CartRouter.js';

const app=express();
const env=NODE_ENV||'development';
// init middlewares
app.use(
          morgan('dev', {
              stream: {
                  write: (message) => {
                      console.log(message)
                  },
              },
          })
      ) //logging
app.use(cors())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())

app.use("/api/book",RequestMiddleWare, BookRouter)
app.use("/api/user",RequestMiddleWare, UserRouter)
app.use("/api/order", RequestMiddleWare, OrderRouter)
app.use("/api/cart", RequestMiddleWare, CartRouter)
app.use(ErrorMiddleWare)

DB.sequelize.
          sync({after:true})
          .then(()=>{
                console.log("Database connected")
          })
          .catch(err=>console.log(err))

app.listen(PORT,()=>{
          console.log("Server is opened")
})
