import { deleteDataFromFacts } from '@/server/services/catFacts.service'
import type { Facts } from '@/types/facts'

export async function deleteFactsUseCase(itemId: number) {
  const response = await deleteDataFromFacts(itemId)

  return response
}
