import express from 'express'
import { addFactsUseCase } from '../use-case/add-facts/add-facts-use-case.js'

const router = express.Router()

router.post('/post-facts', async (req, res) => {
  try {
    const { catFact } = req.body
    console.log('I am CALLED!')

    if (!catFact) {
      return res.status(400).json({ error: 'catFact is required' })
    }

    const facts = await addFactsUseCase(catFact)
    res.status(200).json(facts)
  } catch (error) {
    if (error.message.includes('No internet connection')) {
      return res.status(503).json({ error: 'Service unavailable. No internet connection.' })
    }
    res.status(500).json({ error: 'Error adding fact' })
  }
})

export default router
