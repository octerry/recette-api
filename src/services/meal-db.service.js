const BASE = "https://www.themealdb.com/api/json/v1/1" // URL de l'API TheMealDB

function clean (item) {
    const emptylessItem = Object.fromEntries( // Retire les "" et null vides et les " " 
        Object.entries(item)
        .filter(([_, value]) => Boolean(value) && value.trim() !== "") // (TheMealDB je te déteste)
    )

    let ingredients = [];
    let ingredientsNumber = 0;

    Object.keys(emptylessItem).forEach(key => {
        if (key.includes("strIngredient")) {
            ingredients.push({nom:emptylessItem[key]})
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

export async function fetchBy (type, input=null) {
    let url = BASE
    if (type === "random") url += "/random.php"
    if (type === "name") url += "/search.php?s=" + input
    if (type === "id") url += "/lookup.php?i=" + input
    if (type === "char") url += "/search.php?f=" + input

    if (url === BASE) return;

    console.log(input)

    const apiFetch = await fetch(url)
    const data = await apiFetch.json();

    // Si la réponse est négative (JE DETESTE THEMEALDB)
    if (!apiFetch.ok || ['{"meals":"no data found"}', '{"meals":null}'].includes(JSON.stringify(data))) return null

    return data.meals.map(clean)
}