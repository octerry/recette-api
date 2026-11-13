import { Router } from "express";
import { getAll, getBy } from "../services/meal-db.service.js";

const router = Router();

router.get('/', async (req, res) => {
    const currentUrl = await req.protocol + '://' + req.get('host') + req.originalUrl;
    let finalResponse = await getAll(currentUrl);

    // id primaire : 52802
    if (req.query.char) {
        finalResponse = await getBy("char",req.query.char);
    }
    if (req.query.category) {
        finalResponse = await getBy("category",req.query.category);
    }
    if (req.query.country) {
        finalResponse = await getBy("country",req.query.country);
    }
    
    if (finalResponse === null) res.status(404).json({erreur: "Identifiant introuvable"})
    
    res.json(finalResponse)
})

router.get('/:page', async (req, res) => {
    const currentUrl = await req.protocol + '://' + req.get('host') + req.originalUrl;
    
    const item = await getAll(currentUrl, Number(req.params.page));
    if (item === null) res.status(404).json({erreur: "Identifiant introuvable"})
    else {
        res.json(item)
    }
})

export default router;