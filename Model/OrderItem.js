import { DataTypes } from "sequelize";
import { sequelize } from "../Repository/DBConfig.js";

const OrderItemModel=(sequelize)=>{
          const OrderItem=sequelize.define(
                    "OrderItem",
                    {
                              id:{
                                        type: DataTypes.INTEGER,
                                        autoIncrement: true,
                                        primaryKey: true
                              },
                              quantity:{
                                        type: DataTypes.INTEGER
                              }
                    }
          )
          OrderItem.associate=(models)=>{
                    OrderItem.belongsTo(models.Book);
                    OrderItem.belongsTo(models.Order);
          }
          return OrderItem;
}
export default OrderItemModel;