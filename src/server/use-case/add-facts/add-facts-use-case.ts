import { factsService } from '@/server/services/catFacts.service'
import type { Facts } from '@/types/facts'

export async function addFactsUseCase(facts: string, created_at: number) {
  const item = {
    created_at,
    facts
  }
  const response = await factsService.insertDataIntoFacts(item as Facts)

  return response
}
