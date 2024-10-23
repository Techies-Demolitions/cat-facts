import { factsService } from '../../services/catFacts.service.js'

export async function deleteFactsUseCase(itemId) {
  const response = await factsService.deleteDataFromFacts(itemId)

  return response
}
