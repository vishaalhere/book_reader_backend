import { pool } from "../database.js";
export const addBook = async (req, res, next) => {
    const { name, author, readTime, description, rating, cover, pdf } = req.body;
    const buffer = Buffer.from(cover, 'base64');
    await pool.query(`INSERT INTO books (name, author, readTime, description, rating, cover, pdf) VALUES  (?,?,?,?,?,?,?)`, [name, author, readTime, description, rating, buffer, pdf]);
    res.send({
        success: true,
        message: "Book Added Successfully!!",
    });
};
export const getBooks = async (req, res, next) => {
    const [books] = await pool.query("SELECT * FROM books");
    res.send({
        success: true,
        message: "Books Fetched Successfully!!",
        books,
    });
};
export const getBookById = async (req, res, next) => {
    const { id } = req.params;
    const [result] = await pool.query(`SELECT * FROM books where id = ?`, [
        id,
    ]);
    let book;
    if (Array.isArray(result) && result.length > 0 && result[0].id) {
        book = result[0];
    }
    res.send({
        success: true,
        message: "Book Fetched Successfully!!",
        book,
    });
};
export const rateBook = async (req, res, next) => {
    const { id } = req.params;
    const { rating } = req.body;
    const [result] = await pool.query(`UPDATE books SET rating=? WHERE id = ?`, [rating, id]);
    let book;
    if (Array.isArray(result) && result.length > 0 && result[0].id) {
        book = result[0];
    }
    res.send({
        success: true,
        message: "Book Rated Successfully!!",
        book,
    });
};
