import { factsService } from '@/server/services/catFacts.service'
import { networkService } from '../../services/network.service'

export async function addFactsUseCase(facts, created_at) {
  await networkService.checkInternetConnection()
  const item = {
    created_at,
    facts
  }
  const response = await factsService.insertDataIntoFacts(item)

  return response
}
