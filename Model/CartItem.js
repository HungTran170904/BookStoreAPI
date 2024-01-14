import { DataTypes } from "sequelize";

const CartItemModel=(sequelize)=>{
          const CartItem=sequelize.define(
                    "CartItem",
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
          CartItem.associate=(models)=>{
                    CartItem.belongsTo(models.User);
                    CartItem.belongsTo(models.Book);
          }
          return CartItem;
}
export default CartItemModel;
