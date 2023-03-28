import { pool } from "../database.js";
import express, { Express, Request, Response, NextFunction } from "express";

export const addBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, author, readTime, description, rating, cover, pdf } = req.body;
  const coverBuffer = Buffer.from(cover.split(",")[1], "base64");
  const pdfBuffer = Buffer.from(pdf.split(",")[1], "base64");
  await pool.query(
    `INSERT INTO books (name, author, readTime, description, rating, cover, pdf) VALUES  (?,?,?,?,?,?,?)`,
    [name, author, readTime, description, rating, coverBuffer, pdfBuffer]
  );
  res.send({
    success: true,
    message: "Book Added Successfully!!",
  });
};

export const getBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const [books] = await pool.query("SELECT * FROM books");
  res.send({
    success: true,
    message: "Books Fetched Successfully!!",
    books,
  });
};

export const getBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const [result]: any = await pool.query(`SELECT * FROM books where id = ?`, [
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

export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  await pool.query(`DELETE FROM books WHERE id = ?`, [
    id,
  ]);
  res.send({
    success: true,
    message: "Book Deleted Successfully!!",
  });
};

export const rateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { rating } = req.body;
  const [result]: any = await pool.query(
    `UPDATE books SET rating=? WHERE id = ?`,
    [rating, id]
  );
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
