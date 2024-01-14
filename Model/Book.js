import { DataTypes } from "sequelize";
const BookModel=(sequelize)=>{
          const Book=sequelize.define(
                    'Book',
                    {
                              id:{
                                        type: DataTypes.INTEGER,
                                        autoIncrement: true,
                                        primaryKey: true
                              },
                              title:{
                                        type: DataTypes.STRING,
                                        allowNull: false
                              },
                              price:{
                                        type:DataTypes.BIGINT
                              },
                              authorName:{
                                        type: DataTypes.STRING
                              },
                              genre:{
                                        type: DataTypes.STRING,
                              },
                              publisherName:{
                                        type: DataTypes.STRING
                              },
                              imageUrl:{
                                        type: DataTypes.STRING
                              }
                    }
          );
          Book.associate=(models)=>{
                    Book.hasMany(models.OrderItem,{
                              onDelete:"RESTRICT"
                    });
                    Book.hasMany(models.CartItem,{
                              onDelete:"RESTRICT"
                    });
          }
          return Book;
}
export default BookModel;