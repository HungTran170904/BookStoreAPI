import express from 'express'
import { addToCartController, deleteCartItemController, updateQuantityController} from '../Controller/CartController.js';
const CartRouter=express.Router();
CartRouter.post("/addToCart", addToCartController);
CartRouter.get("/updateQuantity", updateQuantityController);
CartRouter.delete("/deleteCartItem/:id", deleteCartItemController);

export default CartRouter;