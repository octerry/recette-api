import { Router } from "express";
import { fetchItemBy } from "../services/meal-db.service.js";

const router = Router();

router.get('/', async (req, res) => {
    let finalResponse = await fetchItemBy("char","a");

    if (req.query.name) {
        finalResponse = await fetchItemBy("name",req.query.name);
    }
    if (req.query.char) {
        finalResponse = await fetchItemBy("char",req.query.char);
    }
    if (typeof(req.query.random) === "string") {
        finalResponse = await fetchItemBy("random");
    }

    if (finalResponse === null) res.status(404).json({erreur: "Plat introuvable"})

    res.json(finalResponse)
})

router.get('/:id', async (req, res) => {
    const item = await fetchItemBy("char", Number(req.params.id) + 52802);
    if (item === null) res.status(404).json({erreur: "Identifiant introuvable"})
    else res.json(item)
})

export default router;