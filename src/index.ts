import express from 'express'
import { createModels } from './models'
import config from '../config/config.json'

const PORT = process.env.PORT || 8080
const app = express()
const db = createModels(config)
app.get('/ping', async (req, res) => {
  const newTechnique = await db.Technique.create({
    name: 'arrimina',
    description: 'firria',
    standardTemperature: 22,
    duration: 33,
    title: 'amuni',
  })

  const oneRec = await db.Recipe.create({ name: 'petro', title: 'racina', description: 'schifio', author: 'maria' })
  await oneRec?.addTechnique(newTechnique, { through: { idealTemperature: 232 } })
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
