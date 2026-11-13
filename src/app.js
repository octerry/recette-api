import express from 'express';
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readFileSync } from 'node:fs';
import cors from 'cors';
import mealRoutes from './routes/meal.routes.js'
import singleMealRoutes from './routes/singlemeal.routes.js'
import statsRoutes from './routes/stats.routes.js'
import filterRoutes from './routes/filter.routes.js'

const app = express();
app.use(cors())

app.get('/', (req, res) => { // Pour check si l'URL fonctionne
    res.json('Hello World!')
})

app.get('/health', async (req, res) => { // Avoir les infos de l'API
    const __dirname = dirname(fileURLToPath(import.meta.url)) // Position du fichier
    const data = JSON.parse( readFileSync(join(__dirname, '..', 'package.json'), 'utf8') ) // Récupère et "traduit" le JSON
    
    res.json({
        version : data ? data.version : "1.0,0"
    })
})

app.use('/api/meals', mealRoutes) // HAHA on dirait Happy Meals
app.use('/api/filter', filterRoutes)
app.use('/api/singlemeal', singleMealRoutes)
app.use('/api/stats', statsRoutes)

export default app;