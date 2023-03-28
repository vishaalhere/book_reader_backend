import express from "express";
import { addBook, deleteBook, getBookById, getBooks, rateBook } from "../controllers/booksController.js";

const router = express.Router();


router.route("/books").get(getBooks);
router.route("/book/:id").get(getBookById);
router.route("/addBook").post(addBook);
router.route("/rateBook/:id").post(rateBook);
router.route("/deleteBook/:id").delete(deleteBook);


export default router;