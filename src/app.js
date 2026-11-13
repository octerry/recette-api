import express, { json } from 'express';
import cors from 'cors';
import mealRoutes from './routes/meal.routes.js'
import singleMealRoutes from './routes/singlemeal.routes.js'

const app = express();
app.use(cors())

app.get('/', (req, res) => { // Pour check si l'URL fonctionne
    res.json('Hello World!')
})

app.get('/health', async (req, res) => { // Avoir les infos de l'API
    const jsonFetch = await fetch("./package.json")
    const data = await jsonFetch.json()
    
    res.json({
        version : data ? data.version : "1.0,0"
    })
})

app.use('/api/meals', mealRoutes) // HAHA on dirait Happy Meals
app.use('/api/singlemeal', singleMealRoutes)

export default app;