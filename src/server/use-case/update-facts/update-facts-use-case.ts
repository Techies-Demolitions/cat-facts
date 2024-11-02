import { factsService } from '@/server/services/catFacts.service'
import type { ClientSideFact } from '@/types/facts'

export async function updateFactsUseCase(id: number, facts: ClientSideFact) {
  const response = await factsService.updateDataFromFacts(id, facts)

  return response
}
