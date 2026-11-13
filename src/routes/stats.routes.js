import { Router } from "express";
import { getAll, getBy } from "../services/meal-db.service.js";

const router = Router();

router.get('/', async (req, res) => {
    const data = await getAll('*') // On récupères TOUT le cache

    const categoriesIsSelected = typeof(req.query.categories) === "string"
    const countriesIsSelected = typeof(req.query.countries) === "string"
    const ingredientsIsSelected = typeof(req.query.ingredients) === "string"
    
    // Armistice parce que dés que l'un va être mis en paramêtre les autres vont disparaître donc c'est un accord à l'amiable :)
    const armistice = !categoriesIsSelected && !countriesIsSelected && !ingredientsIsSelected;

    const eachStatus = { nbDeRecettes:0 };

    // On ajoute ceux qu'on doit afficher
    if (armistice || categoriesIsSelected) eachStatus.categorie = {}
    if (armistice || countriesIsSelected) eachStatus.pays = {}
    if (armistice || ingredientsIsSelected) eachStatus.ingredients = {}

    for (const item of data) {
        // On compte une recette en plus
        eachStatus.nbDeRecettes++;
        
        // Si il existe, on ajoute, sinon on initialise à 1
        if (armistice || categoriesIsSelected) {
            eachStatus.categorie[item.categorie]? eachStatus.categorie[item.categorie]++ : eachStatus.categorie[item.categorie] = 1;
        }

        if (armistice || countriesIsSelected) {
            eachStatus.pays[item.pays]? eachStatus.pays[item.pays]++ : eachStatus.pays[item.pays] = 1;
        }

        if (armistice || ingredientsIsSelected) {
            for (const ing of item.ingredients) {
                eachStatus.ingredients[ing.nom]? eachStatus.ingredients[ing.nom]++ : eachStatus.ingredients[ing.nom] = 1;
            }
        }
    }

    res.json(eachStatus)
})

export default router;