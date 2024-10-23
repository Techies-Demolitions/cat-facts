import { factsService } from '@/server/services/catFacts.service'

export async function getFactsUseCase() {
  const response = await factsService.getAllDataFromFacts()

  return response
}
