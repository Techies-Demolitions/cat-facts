import express from 'express'
import cors from 'cors'

// Import your route files
import getFactsRoutes from './facts.get.js'
import deleteFactsRoutes from './facts.delete.js'

const app = express()
app.use(cors()) // Enable CORS
app.use(express.json()) // Parse JSON bodies

// Use the imported routes
app.use(getFactsRoutes)
app.use(deleteFactsRoutes)

// Start the server
const PORT = 8080

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
