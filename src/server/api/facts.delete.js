// src/server/api/index.delete.js
import express from 'express'
import { deleteFactsUseCase } from '../use-case/delete-facts/delete-facts-use-case.js'

const router = express.Router()

router.delete('/delete-facts', async (req, res) => {
  try {
    const { id } = req.body
    await deleteFactsUseCase(id)
    res.status(204).send() // No Content
  } catch (error) {
    if (error.message.includes('No internet connection')) {
      return res.status(503).json({ error: 'Service unavailable. No internet connection.' })
    }
    res.status(500).json({ error: 'Deleting fact failed' })
  }
})

// Export the router to use in the main file
export default router
