import { Router } from "express";
import { fetchBy } from "../services/meal-db.service.js";

const router = Router();

router.get('/', async (req, res) => {
    let finalResponse = await fetchBy("random");

    res.json(finalResponse)
})

router.get('/:id', async (req, res) => {
    const perso = await getCharacter(req.params.id);
    if (perso === null) res.status(404).json({erreur: "Personnage introuvable"})

    res.json({
        id: perso.id,
        nom: perso.nom,
        statut: perso.statut,
        origine: perso.origin
    })
})

export default router;