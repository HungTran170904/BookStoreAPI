import { uploadImage } from "../Clouddinary/CloudinaryService.js";
import RequestError from "../CustomedError/RequestError.js";
import { DB} from "../Repository/DBConfig.js"

const {Book}=DB;
export async function createBookService(book){
          var savedBook= await Book.create(book);
          console.log("a new book instance saved:", savedBook.toJSON());
          return savedBook;
}
export async function findByPaginationService({offset, limit}){
          return await Book.findAll({
                    order:[
                              ["title","ASC"]
                    ],
                    offset: parseInt(offset),
                    limit:parseInt(limit)});
}
export async function deleteBookService(bookId){
          await Book.destroy({
                    where:{id: bookId}
          })
}
export async function uploadBookImage(bookId, file){
          console.log("BookId", bookId)
          const book=await Book.findOne({where:{id: bookId}});
          if(!book) throw new RequestError("BookId "+bookId+" does not exist");
          book.imageUrl=await uploadImage(file, book.imageUrl);
          await book.save();
          return book.imageUrl;
}
