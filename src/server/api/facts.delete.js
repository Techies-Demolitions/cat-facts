// src/server/api/index.delete.js
import express from 'express'
import { deleteFactsUseCase } from '../use-case/delete-facts/delete-facts-use-case.js'

const router = express.Router()

router.delete('/delete-facts', async (req, res) => {
  try {
    const { id } = req.body // Assume you're sending the ID in the body
    await deleteFactsUseCase(id)
    res.status(204).send() // No content
  } catch (error) {
    res.status(500).json({ error: 'Error deleting fact' })
  }
})

// Export the router to use in the main file
export default router
