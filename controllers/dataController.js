
import { getConfirmedBooks,getUnConfirmedBooks, deleteBookById, updateBookStatus,addNewBook } from '../models/dataModel.js';


export class DataConroller{

    static addNewBookController = async (req,res) => {
        const {book_name,author_name,discription} = req.body;
        if (!book_name || !author_name || !discription) {
            res.status(400).send({msg:"failed"});
        }else{
            try {
                const book = await addNewBook(book_name,author_name,discription);
                if (!book) {
                    return res.status(400).send("something wrong")
                }
                res.send(book)
            } catch (error) {
                res.send("Internal server error")
            }
        }

    }

    static getConfirmedBookController = async (req,res)=>{
        try {
            const books = await getConfirmedBooks();
            res.send(books)
        } catch (error) {
            res.status(400).send({
                msg:"failed"
            })
        }
    }

    static getUnConfirmedBooksController =  async(req,res)=>{
        try {
            const books = await getUnConfirmedBooks();
            res.send(books)
        } catch (error) {
            res.status(400).send({
                msg:"failed"
            })
        }
    }

    static deleteBookConroller = async(req,res)=>{
        const {id} = req.body;
        try {
            const deletedBook = await deleteBookById(id);
            if (!deletedBook) {
                res.status(400).send({
                    msg:"failed"
                })
            }
            else{
                res.send(deletedBook)
            }
        } catch (error) {
            res.status(400).send({
                msg:"failed"
            })
        }
    }


    static confirmBookController = async(req,res)=>{
        const {id} = req.body;
        try {
            const updatedBook = await updateBookStatus(id);
            if (!updatedBook) {
                res.status(400).send("failed")
            }
            res.send(updatedBook);
        } catch (error) {
            res.status(400).send("failed");
        }
    }
}