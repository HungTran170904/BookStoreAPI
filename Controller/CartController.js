import { addToCartService, deleteCartItem, updateQuantityService } from "../Service/CartService.js";

export async function addToCartController(req, res, next){
          try {
                    const cartItem=await addToCartService(req.user,req.body);
                    return res.status(200).json(cartItem);
          } catch (error) {
                    next(error);
          }
}
export async function updateQuantityController(req, res, next){
          try {
                    await updateQuantityService(req.user,req.body);
                    return res.status(200);
          } catch (error) {
                    next(error);
          }
}
export async function deleteCartItemController(req, res, next){
          try {
                    await deleteCartItem(req.params.id)
                    return res.status(204).end();
          } catch (error) {
                    next(error);
          }
}