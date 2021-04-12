/* eslint-disable no-console */
import 'reflect-metadata';
import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import { createConnection } from 'typeorm';
import routes from './routes';
import { errorHandler } from './utils/errorHandler';

// create typeorm connection
createConnection().then(() => {
  console.log('banco conectado');
});
const app = express();
app.use(express.json());
app.use(routes);
const port = process.env.PORT || 3333;
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  console.log(err);
  errorHandler(err, response);
});

app.listen(port, () => {
  console.log(`[*]Servidor iniciado na porta ${port}`);
  console.log(`[*]Acesso em http://localhost:${port}`);
});
