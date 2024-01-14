import RequestError from "../CustomedError/RequestError.js";
import { DB } from "../Repository/DBConfig.js";

const {Book, Order, OrderItem,CartItem, User}=DB;
export async function addOrderService(user, newOrder){
          let total=0;
          for (let item of newOrder.orderItems) {
                    const book = await Book.findOne({where:{id: item.BookId}});
                    if(!book) throw new RequestError("BookId "+item.BookId+" does not exists");
                    if(item.quantity <= 0) throw new RequestError("Quantity <=0");
                    total += book.price * item.quantity;
          }
          newOrder.totalFee=total;
          newOrder.UserId=user.id;
          const savedOrder=Order.create(newOrder,{
                    include: [{
                              model: OrderItem,
                              as:"orderItems",
                              include:[{
                                        model: Book
                              }]
                    },
                    {model: User}
          ]
          });
          return savedOrder;
}
export async function updateOrderService(updatedOrder){
          if(!updatedOrder.id) throw new RequestError("OrderId is not null");
          return Order.update({...updatedOrder},{
                    where:{id: updatedOrder.id}
          })
}
export async function deleteOrderService(orderId){
          const order = await Order.findOne({ where: { id: orderId } });
          if(order){
                    await  OrderItem.destroy({where:{OrderId: orderId}})
                    await order.destroy();
          }
}