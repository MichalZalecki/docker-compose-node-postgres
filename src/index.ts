import express from 'express'
import { createModels } from './models'
const config = require('../config/config.json')

import { Env } from './typings/Env'

const PORT = process.env.PORT || 8080
const app = express()
const db = createModels(config as Env)
app.get('/ping', async (req, res) => {
  // console.log(newRecipe)
  const t = await db.Technique.create({
    name: 'arrimina',
    description: 'firria',
    idealTemperature: 22,
    duration: 33,
    title: 'amuni',
  })

  const oneRec = await db.Recipe.findOne()
  await oneRec?.addTechnique(t)
  const allRecipes = await db.Recipe.findAll({
    include: [
      {
        model: db.Ingredient,
        as: 'ingredients',
        attributes: ['name', 'title', 'description'],
      },
      {
        model: db.Technique,
        as: 'techniques',
        attributes: ['name', 'title', 'description'],
      },
    ],
  })
  res.send(allRecipes)
})

app.listen(PORT, () => {
  console.log('Started at http://localhost:%d', PORT)
})
