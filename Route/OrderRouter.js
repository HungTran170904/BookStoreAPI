import express from 'express'
import { addOrderController, deleteOrderController, updateOrderController } from '../Controller/OrderController.js';
const OrderRouter=express.Router();
OrderRouter.post("/addOrder", addOrderController);
OrderRouter.put("/updateOrder", updateOrderController);
OrderRouter.delete("/deleteOrder/:id", deleteOrderController);
export default OrderRouter;
