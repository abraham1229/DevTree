import express from 'express' //ESM (es la nueva version que sustituye require)
import 'dotenv/config'
import router from './router'
import { connectDB } from './config/db'

const app = express(); // Instancia del servidor

connectDB()

//Leer datos de formularios (es middleware global)
app.use(express.json())


app.use('/',router) // Se toma desde /, lo que mapea cada peticion


export default app