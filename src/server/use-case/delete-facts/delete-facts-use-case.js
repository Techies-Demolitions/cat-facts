import { factsService } from '../../services/catFacts.service.js'
import { networkService } from '../../services/network.service.js'

export async function deleteFactsUseCase(itemId) {
  await networkService.checkInternetConnection()
  const response = await factsService.deleteDataFromFacts(itemId)

  return response
}
