import express from 'express'
import cors from 'cors' // Import cors

const app = express()

app.use(cors()) // Use CORS middleware

app.get('/test/index', (req, res) => {
  res.send({
    name: 'hello world'
  })
})

app.listen(8080, () => {
  console.log('Server is running at http://localhost:8080')
})
