const BASE = "https://www.themealdb.com/api/json/v1/1" // URL de l'API TheMealDB

let all = [];
const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('')
const N_PAGES = 30;

fetchAll();

async function fetchAll() {
    let n = 0;

    // Avec les lettres c'est le meilleur moyen de prendre pleins de meals sans se faire timeout (et pour d'autres raisons que je vais mettre dans README)
    await ALPHABET.forEach(async char => {
        const response = await fetch(BASE + "/search.php?f=" + char)
        const data = await response.json()

        // Si la réponse n'est PAS négative (JE DETESTE THEMEALDB)
        if (data.meals !== null) {
            const cleanData = data.meals.map(clean)
            all = all.concat(cleanData); // On ajoute data.meals à all
        }
        n++;
        if (n >= 26) {
            console.log('--> Cache chargé !'); 
            sortAll()
        }
    });
}

async function sortAll() {
    all = all.sort((a, b) => {
        return a.id - b.id;
    });

    console.log("--> Cache trié !")
}

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

export async function getAll (url, page=0) {
    // Traitement de l'URL
    let newUrl = url

    if (url.substring(url.lastIndexOf('/') + 1) != "meals") {
        newUrl = url.substring(0, url.lastIndexOf('/')); // on retire le dernier /bdjqsd
    }

    let nextLocation = page<N_PAGES ? newUrl + '/' + (page+1) : null;
    let prevLocation = page>0 ? newUrl + '/' + (page-1) : null;

    // Traitement de la data
    const pageTaille = Math.ceil(all.length / ( N_PAGES + 1 ));

    const data = {
        infos: {
            count: all.length,
            pages: N_PAGES,
            next: nextLocation,
            prev: prevLocation
        },
        results : await all.slice(pageTaille*page, pageTaille)
    }

    return data;
}

export async function getBy(type, input=null) {
    let finalData = all

    if (type === "char") {
        if (input.length === 1) {
            finalData.filter(item => item.nom[0] === char)
        } else finalData = []
    }
}

export async function getItemBy(type=null, input=null) {
    const data = all

    // if (type === "random") {
    //     const id = Math.floor(Math.random() * all.length)
    //     data = all[id];
    // }
    // if (type === "name") {
    //     const id = all.find(item => item.name == input)
    //     data = all[id];
    // }

    return data ? data[0] : null;
}