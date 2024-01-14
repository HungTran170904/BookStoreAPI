import { addOrderService, deleteOrderService, updateOrderService } from "../Service/OrderService.js";

export async function addOrderController(req, res, next){
          try {
                    const order=await addOrderService(req.user, req.body);
                    return res.status(200).json(order);
          } catch (error) {
                    next(error);
          }
}
export async function updateOrderController(req, res, next){
          try {
                    const order=await updateOrderService(req.user, req.body);
                    return res.status(200).json(order);
          } catch (error) {
                    next(error);
          }
}
export async function deleteOrderController(req, res, next){
          try {
                    await deleteOrderService(req.params.id);
                    return res.status(204).end();
          } catch (error) {
                    next(error);
          }
}