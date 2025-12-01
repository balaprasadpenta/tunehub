import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    res.send("get method from song route")
})

export default router;