const BASE = "https://www.themealdb.com/api/json/v1/1" // URL de l'API TheMealDB

function clean (item) {
    const emptylessItem = Object.fromEntries( // Retire les "" et null vides
        Object.entries(item)
        .filter(([_, value]) => value)
    )

    let ingredients = [];
    let ingredientsNumber = 0;

    Object.keys(emptylessItem).forEach(key => {
        if (key.includes("strIngredient")) {
            ingredients.push({nom:emptylessItem[key], quantite:null})
            ingredientsNumber++
        }
        if (key.includes("strMeasure")) ingredients[key.replace("strMeasure", "")-1].quantite = emptylessItem[key]
    });


    return {
        id: emptylessItem.idMeal,
        nom: emptylessItem.strMeal,
        categorie: emptylessItem.strCategory,
        pays: emptylessItem.strCountry,
        image: emptylessItem.strMealThumb,
        ingredients: ingredients,
        instructions: emptylessItem.strInstructions,
        nbIngredient: ingredientsNumber,
    } ; 
}

export async function fetchMeals() {
    const apiFetch = await fetch(BASE + "/search.php?s=Arrabiata")
    const data = await apiFetch.json()

    return data.meals.map(clean)
}