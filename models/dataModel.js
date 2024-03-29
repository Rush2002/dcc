import mongoose from "mongoose";


const bookSchema = mongoose.Schema({
    book_name:{type:String},
    author_name:{type:String},
    discription:{type:String},
    is_confirm:{type:Boolean,default:false}
})


export const bookModel = mongoose.model("books",bookSchema);


export const addNewBook =async (book_name,author_name,discription) => {
    const bookDoc = bookModel({
        book_name:book_name,
        author_name: author_name,
        discription:discription
    })

    try {
        const book = await bookDoc.save();
        return book;
    } catch (error) {
        return error;
    }
}


export const getUnConfirmedBooks = async  () => {
    try {
        const books = await bookModel.find({is_confirm:false});
        return books;
    } catch (error) {
        console.log(error);
    }
}


export const getConfirmedBooks = async  () => {
    try {
        const books = await bookModel.find({is_confirm:true});
        return books;
    } catch (error) {
        console.log(error);
    }
}


export const  updateBookStatus = async (id) => {
    try {
        const bookDoc = await bookModel.findByIdAndUpdate(id,{is_confirm:true},{new:true})
        return bookDoc;
    } catch (error) {
        return error;
    }
}

export const  deleteBookById = async (id) => {
    try {
        const deleteBook = await bookModel.findByIdAndDelete(id);
        console.log(deleteBook);
        if (!deleteBook) {
            return null;
        }
        return deleteBook;

    } catch (error) {
        return error;
    }
}
