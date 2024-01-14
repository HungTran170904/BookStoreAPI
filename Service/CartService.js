import RequestError from "../CustomedError/RequestError.js";
import { DB } from "../Repository/DBConfig.js";

const {Book, Order, OrderItem,CartItem, User}=DB;
export async function addToCartService(user, newCartItem){
        const book=Book.findOne({where:{id: newCartItem.BookId}});
        if(!book) throw new RequestError("BookId "+newCartItem.BookId+" does not exist");
        if(newCartItem.quantity<=0) throw new RequestError("Quantity must be positive");
        newCartItem.UserId=user.id;
        const savedItem=await CartItem.create(newCartItem,{
                    include:[{model:User}, {model:Book}]
        })
        return savedItem;
}
export async function updateQuantityService({cartItemId, quantity}){
          await CartItem.update({quantity: quantity},{where:{id: cartItemId}})
}
export async function deleteCartItem(cartItemId){
          await CartItem.destroy({
                    where:{id: cartItemId}
          })
}