import express from 'express'
import { getFactsUseCase } from '../use-case/get-facts/get-facts-use-case.js'

const router = express.Router()

router.get('/get-facts', async (req, res) => {
  try {
    const facts = await getFactsUseCase()
    res.status(200).json(facts)
  } catch (error) {
    if (error.message.includes('No internet connection')) {
      return res.status(503).json({ error: 'Service unavailable. No internet connection.' })
    }
    res.status(500).json({ error: 'Error fetching facts' })
  }
})

router.get('/', async (req, res) => {
  res.send([
    {
      name: 'test'
    }
  ])
})

// Export the router to use in the main file
export default router
