import express, { Express, Request, Response } from "express";
//Route Imports
import books from './routes/booksRoute.js'
import fileUpload from 'express-fileupload';

const app: Express = express();

const PORT = 8000;


app.use((req,res,next)=>{
  const allowedOrigins = [process.env.VERCEL_FRONTEND_URL,process.env.LOCAL_FRONTEND_URL,'http://192.168.1.4:3000'];
  const origin = req.headers.origin;
  // if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', '*');
  // }
    res.header('Access-Control-Allow-Methods',"POST, PUT, GET, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
    res.header("Access-Control-Allow-Credentials",'true')
    next();
  })
/** Parse the body of the request */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());

app.use("/api/v1", books);

app.get("*", (req, res) => {
  res.status(500).send("Page not found");
});

app.listen(PORT, () => {
  console.log(`Server is Running on Port ${PORT}`);
});
