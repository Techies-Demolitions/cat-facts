const catUrl = 'https://cat-fact.herokuapp.com/facts/random'
import { FactsThings } from '@/enums/enums'
import { getFactsUseCase } from '@/server/use-case/get-facts/get-facts-use-case'

export async function getCatFactsData() {
  try {
    const response = await fetch(catUrl)

    if (!response.ok) {
      throw new Error(response.statusText)
    }
    const data = await response.json()

    return data
  } catch {
    return FactsThings.ErrorMessage
  }
}

export async function getTestingFactsData() {
  try {
    const response = await getFactsUseCase()

    return response
  } catch (error) {
    console.error(error)
  }
}
