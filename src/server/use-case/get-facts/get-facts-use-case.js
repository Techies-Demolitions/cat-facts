import { factsService } from '../../services/catFacts.service.js'

export async function getFactsUseCase() {
  const response = await factsService.getAllDataFromFacts()

  return response
}
