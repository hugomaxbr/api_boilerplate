import { Router } from 'express';
const router = Router();

router.get("/", (req, res) => {
  res.send("hello World!");
  console.log("entrou em root");
});


export default router;
