import { factsService } from '../../services/catFacts.service.js'
import { networkService } from '../../services/network.service.js'

export const getFactsUseCase = async () => {
  await networkService.checkInternetConnection()

  const response = await factsService.getAllDataFromFacts()

  return response
}
