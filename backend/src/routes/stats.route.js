import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    res.send("this is get route from stats route")
})

export default router;