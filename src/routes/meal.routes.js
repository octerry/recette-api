import { Router } from "express";
import { fetchBy } from "../services/meal-db.service.js";

const router = Router();

router.get('/', async (req, res) => {
    let finalResponse = await fetchBy("char","a");

    // if (req.query.char) {
    //     finalResponse = await fetchBy("char",req.query.char);
    // }
    // if (req.query.random) {
    //     finalResponse = await fetchBy("random");
    // }

    res.json(finalResponse)
})

router.get('/:letter', async (req, res) => {
    const item = await fetchBy("char", req.params.letter); // 52802
    if (item === null) res.status(404).json({erreur: "Identifiant introuvable"})
    else {
        res.json(item)
    }
})

export default router;