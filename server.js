import app from './src/app.js';
import * as dotenv from 'dotenv';

// Utilise le .env à la place des variables environements
dotenv.config() 

// Va chercher la variable PORT dans le .env
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => { // OUAIS CA MARCHE
    console.log('Serveur lancé sur http://localhost:' + PORT);
})

app.use((req, res) => { // Ah j'ai mal écrit
    res.status(404).json({erreur: "Route inconnue"})
})

app.use((err, req, res, next) => { // Huh ? C'est pas moi le problème ?
    console.log(err)
    res.status(500).json({erreur: "Erreur serveur"})
})