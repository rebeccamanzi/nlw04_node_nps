import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors";
import  createConnection from './database';
import { AppError } from './errors/AppError';
import { router } from './routes';

createConnection();
const app = express();

// use -> middleware (o que está entre req/resp)
app.use(express.json()); // permite trabalhar com json (ex: receber no body)
app.use(router);

app.use((err: Error, request: Request, response: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message
    })
  }
  return response.status(500).json({
    status: "Error",
    message: `Internal server error ${err.message}`
  })
})

export { app };