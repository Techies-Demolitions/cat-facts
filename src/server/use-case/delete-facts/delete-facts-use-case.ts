import { factsService } from '@/server/services/catFacts.service'

export async function deleteFactsUseCase(itemId: number) {
  const response = await factsService.deleteDataFromFacts(itemId)

  return response
}
