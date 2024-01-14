import {createBookService, deleteBookService, findByPaginationService, uploadBookImage } from "../Service/BookService.js";

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
export async function deleteBookController(req, res, next){
          try {
                    await deleteBookService(req.params.id);
                    return res.status(204).end();
          } catch (error) {
                    next(error);
          }
}
export async function uploadBookImageController(req, res, next){
          try {
                    console.log("Request", req);
                    if(!req.file) throw new RequestError("File not found");
                    const imageUrl=await uploadBookImage(req.body.bookId, req.file);
                    return res.status(200).send(imageUrl);
          } catch (error) {
                    next(error)
          }
}
