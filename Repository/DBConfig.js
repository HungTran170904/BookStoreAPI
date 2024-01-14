import Sequelize from "sequelize";
import BookModel from "../Model/Book.js"
import { DB_DATABASE,
          DB_HOST,
          DB_PASS,
          DB_PORT,
          DB_USER,
          NODE_ENV, } from '../Config/index.js'
import UserModel from "../Model/User.js";
import OrderModel from "../Model/Order.js";
import OrderItemModel from "../Model/OrderItem.js";
import CartItemModel from "../Model/CartItem.js";
export const sequelize=new Sequelize(
          DB_DATABASE,
          DB_USER,
          DB_PASS,
          {
                    dialect:'mysql',
                    host: DB_HOST,
                    port: parseInt(DB_PORT),
                    timezone: '+07:00',
                    define:{
                              charset:'utf8mb4',
                              collate:'utf8mb4_general_ci',
                              underscored: true,
                              freezeTableName: true
                    },
                    pool:{
                              min:0,
                              max: 50
                    },
                    logQueryParameters: NODE_ENV==='development',
                    logging: (query, time)=>{
                              console.log(time+":"+query)
                    },
                    benchmark: true,
                    attibuteBehavior: 'unsafe-legacy',
                    ssl: false
          }
)
sequelize.authenticate();

const initAllModels = (sequelize) => {
          const Book = BookModel(sequelize);
          const User=UserModel(sequelize);
          const Order=OrderModel(sequelize);
          const OrderItem=OrderItemModel(sequelize);
          const CartItem=CartItemModel(sequelize);
          const models={Book, User, Order, OrderItem, CartItem};
          Object.keys(models).forEach((modelName)=>{
                if(models[modelName].associate)
                    models[modelName].associate(models);
          })
          return models;
      }
      
export const DB = {
          ...initAllModels(sequelize),
          sequelize, // connection instance
          Sequelize, // library
}