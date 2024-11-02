import { factsService } from '@/server/services/catFacts.service'
import { networkService } from '../../services/network.service'

export async function addFactsUseCase(catFact) {
  await networkService.checkInternetConnection()

  const response = await factsService.insertDataIntoFacts(catFact)

  return response
}
