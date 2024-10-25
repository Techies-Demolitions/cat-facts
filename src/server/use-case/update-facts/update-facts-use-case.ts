import { factsService } from '@/server/services/catFacts.service'
import type { Facts } from '@/types/facts'

export async function updateFactsUseCase(id: number, facts: Facts) {
  const response = await factsService.updateDataFromFacts(id, facts)

  return response
}
