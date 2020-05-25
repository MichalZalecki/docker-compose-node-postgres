import express from 'express'
import { createModels } from './models'
const config = require('../config/config.json')

import { Env } from './typings/Env'

const PORT = process.env.PORT || 8080
const app = express()
const db = createModels(config as Env)
app.get('/ping', async (req, res) => {
  // console.log(newRecipe)
  const oneRecipe = await db.Recipe.create({
    title: 'Cane',
    name: 'arrosto',
    description: 'No schifo',
    author: 'Jakie Chan',
  })

  const ing = await db.Ingredient.create({
    name: 'Prosciutto',
    title: 'Cotto',
    description: 'Rovagnati',
  })

  if (ing && oneRecipe) {
    const added = await oneRecipe.addIngredient(ing, { through: { amount: 23.34 } })
    res.send(added)
  }
})

app.listen(PORT, () => {
  console.log('Started at http://localhost:%d', PORT)
})
