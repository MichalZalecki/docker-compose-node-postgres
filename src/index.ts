import express from 'express'

const PORT = process.env.PORT || 3000
const app = express()

app.get('/ping', async (req, res) => {
  res.send('hello')
})

app.listen(PORT, () => {
  console.log('Started at http://localhost:%d', PORT)
})
