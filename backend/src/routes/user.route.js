import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  console.log("GET request received at /api/users"); 
  res.send("user route with get method");
});

export default router;
