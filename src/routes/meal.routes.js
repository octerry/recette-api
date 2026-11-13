import { Router } from "express";
import { getAll } from "../services/meal-db.service.js";

const router = Router();

router.get('/', async (req, res) => {
    const currentUrl = await req.protocol + '://' + req.get('host') + req.originalUrl;
    
    let finalResponse = await getAll(currentUrl);

    // id primaire : 52802
    // if (req.query.char) {
    //     finalResponse = await getBy("char",req.query.char);
    // }
    // if (typeof(req.query.random) === "string") {
    //     finalResponse = await fetchBy("random");
    // }
    
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