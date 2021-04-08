import { NextFunction, Request, Response } from "express";


export function logRequests(req: Request, res: Response, next: NextFunction) {
  console.log("Entrou em: " + req.path);
  next();
}
