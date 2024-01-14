import { DataTypes } from "sequelize";

const UserModel=(sequelize)=>{
          const User=sequelize.define(
                    'User', 
                  {
                    id:{
                              type: DataTypes.INTEGER,
                              autoIncrement: true,
                              primaryKey: true
                    },
                    email:{
                              type: DataTypes.STRING,
                              unique: true
                    },
                    password:{
                              type: DataTypes.STRING,
                              allowNull: false
                    },
                    name: {
                              type: DataTypes.STRING,
                              allowNull: false
                    },
                    profileUrl:{
                            type: DataTypes.STRING
                    },
                    refreshToken:{
                              type: DataTypes.STRING
                    },
                    role:{
                        type: DataTypes.STRING, //ADMIN, USER
                        allowNull:false
                    }
          });
          User.associate=(models)=>{
              User.hasMany(models.Order,{
                  onDelete:"CASCADE"
              });
              User.hasMany(models.CartItem,{
                  onDelete:"CASCADE"
              });
          }
          return User;
}
export default UserModel;