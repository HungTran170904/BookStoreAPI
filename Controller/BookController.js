import {createBookService, findByPaginationService, uploadBookImage } from "../Service/BookService.js";

export async function createBookController(req, res, next){
          try {
                   const newBook=await createBookService(req.body);
                   return res.status(200).json(newBook)
          } catch (error) {
                    next(error)
          }
}
export async function findBooksByPaginationController(req, res, next){
          try {
                    const books= await findByPaginationService(req.query);
                    return res.status(200).json(books);
          } catch (error) {
                    next(error)
          }
}
export async function uploadBookImageController(req, res, next){
          try {
                    if(!req.file) throw new RequestError("File not found");
                    const imageUrl=await uploadBookImage(req.query.bookId, req.file);
                    return res.status(200).send(imageUrl);
          } catch (error) {
                    next(error)
          }
}
