const catUrl = 'https://cat-fact.herokuapp.com/facts/random'
import { FactsThings } from '@/enums/enums'

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
