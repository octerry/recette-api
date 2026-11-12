import { Router } from "express";
import { fetchMeals } from "../services/meal-db.service.js";

const router = Router();

router.get('/', async (req, res) => {
    let finalResponse = await fetchMeals();

    // if (req.query.espece) {
    //     finalResponse = finalResponse.filter((item) => item.espece === req.query.espece)
    // }

    // if (req.query.statut) {
    //     finalResponse = finalResponse.filter((item) => item.statut === req.query.statut)
    // }

    // if (req.query.nom) {
    //     finalResponse = finalResponse.filter((item) => item.nom.toLowerCase().includes(req.query.nom.toLocaleLowerCase()))
    // }

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