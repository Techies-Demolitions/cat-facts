// src/server/api/index.get.js
import express from 'express'
import { getFactsUseCase } from '../use-case/get-facts/get-facts-use-case.js'

const router = express.Router()

router.get('/get-facts', async (req, res) => {
  try {
    const facts = await getFactsUseCase()
    res.status(200).json(facts)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching facts' })
  }
})

// Export the router to use in the main file
export default router
