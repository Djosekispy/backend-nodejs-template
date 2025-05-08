import express from 'express'
import { PORT } from '../src/config/env'
import "reflect-metadata"

const app = express()
const port = PORT || 1234

app.use(express.json())

app.listen(port, async ()=>{
    console.log("Servidor Rodando na por : " + port)
})