import express from 'express'
import { createModels } from './models'
const config = require('../config/config.json')

import { Env } from './typings/Env'

const PORT = process.env.PORT || 8080
const app = express()
const db = createModels(config as Env)
app.get('/ping', async (req, res) => {
  const all = await db.Recipe.findAll()
  res.send(all)
})

app.listen(PORT, () => {
  console.log('Started at http://localhost:%d', PORT)
})
