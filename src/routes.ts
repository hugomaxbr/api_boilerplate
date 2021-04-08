import { Router } from 'express';
import { logRequests } from './middleware/logRequest';
const router = Router();

router.get("/", logRequests, (req, res) => {
  res.send("hello World!");
  console.log("entrou em root");
});


export default router;
