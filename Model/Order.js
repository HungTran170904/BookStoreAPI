import { DataTypes } from "sequelize";
import { sequelize } from "../Repository/DBConfig.js";
import UserModel from "./User.js";

const OrderModel=(sequelize)=>{
          const Order=sequelize.define(
                    "Order",
                    {
                              id:{
                                        type: DataTypes.INTEGER,
                                        autoIncrement: true,
                                        primaryKey: true
                              },
                              orderDate: {
                                        type: DataTypes.DATE,
                              },
                              totalFee:{
                                        type: DataTypes.BIGINT
                              },
                              status:{
                                        type: DataTypes.STRING
                              }
                    })
          Order.associate=(models)=>{
                    Order.belongsTo(models.User);
                    Order.hasMany(models.OrderItem, {
                              as:"orderItems", 
                              onDelete: "CASCADE"});
          }
          return Order;
}
export default OrderModel;