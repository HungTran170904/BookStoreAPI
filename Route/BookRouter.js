import express from 'express'
import { createBookController, deleteBookController, findBooksByPaginationController, uploadBookImageController} from '../Controller/BookController.js'
import { UploadMiddleWare } from '../Middleware/UploadMiddleWare.js';

const BookRouter = express.Router();
BookRouter.post("/admin/createBook", createBookController);
BookRouter.get("/findAllBooks", findBooksByPaginationController);
BookRouter.delete("/admin/deleteBook/:id", deleteBookController);
BookRouter.post("/admin/uploadBookImage", UploadMiddleWare, uploadBookImageController);
export default BookRouter;