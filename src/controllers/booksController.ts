import { pool } from "../database.js";
import express, { Express, Request, Response, NextFunction } from "express";

interface bookInterface {
  id: string;
  name: string;
  author: string;
  readTime: string;
  description: string;
  cover: string;
  pdf: string;
}

export const addBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, author, readTime, description, rating, cover, pdf } = req.body;
  const buffer = Buffer.from(cover, 'base64');

  await pool.query(
    `INSERT INTO books (name, author, readTime, description, rating, cover, pdf) VALUES  (?,?,?,?,?,?,?)`,
    [name, author, readTime, description, rating, buffer, pdf]
  );
  res.send({
    success:true,
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
    success:true,
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
    success:true,
    message: "Book Fetched Successfully!!",
    book,
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
    success:true,
    message: "Book Rated Successfully!!",
    book,
  });
};
