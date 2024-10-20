import { getAllDataFromFacts } from '@/server/services/catFacts.service'

export async function getFactsUseCase() {
  const response = await getAllDataFromFacts()

  return response
}
