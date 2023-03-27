import express from "express";
import { addBook, getBookById, getBooks, rateBook } from "../controllers/booksController.js";

const router = express.Router();


router.route("/books").get(getBooks);
router.route("/book/:id").get(getBookById);
router.route("/addBook").post(addBook);
router.route("/rateBook/:id").post(rateBook);


export default router;