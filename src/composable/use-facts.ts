import { getCatFactsData } from '@/server/api/generate-facts/index.get'
import type { ClientSideFact, ServerSideFact as ServerSideFact } from '@/types/facts'
import { useFactsFactory } from './use-facts-factory'
import { useFactsStore } from './use-item-store'
const {
  buildCatFact,
  formatDateFactory,
  isFetchedFactForCats,
  transformServerSideFactIntoClientSideFact
} = useFactsFactory()
const { setCatFactsStore } = useFactsStore()

// useFacts
export function useFacts() {
  async function getFacts() {
    try {
      const data = await fetch('/api/get-facts')

      //handles api error response
      if (!data.ok) {
        const errorResponse = await data.json()
        throw new Error(errorResponse.error || 'An error occurred while fetching facts')
      }

      const jsonData = await data.json()
      const response = jsonData as ClientSideFact[]

      // loads catFactsStore
      setCatFactsStore(response)

      return response
    } catch (error) {
      if (error instanceof Error) throw error
      else throw new Error('Unknown error occurred') //handles unknown error
    }
  }

  async function generateFacts(retries = 5) {
    if (retries <= 0) throw new Error('Too many requests! Fetching stopped.. Server may overload')

    try {
      const data = await getCatFactsData()
      const fetchedFact = data as ServerSideFact
      const stringifiedFact = JSON.stringify(fetchedFact.text)
      const isFactForCat = isFetchedFactForCats(stringifiedFact)

      if (isFactForCat) {
        const modifiedDate = formatDateFactory(fetchedFact)
        const responseFactory = await transformServerSideFactIntoClientSideFact(
          fetchedFact,
          modifiedDate
        )
        return responseFactory
      }

      return await generateFacts(retries - 1) // Retry if the fact is not related to cats
    } catch (error) {
      console.error('Error generating cat facts:', error)
      throw error
    }
  }

  async function addFacts(fact: string, date: number) {
    const builtCatFact = await buildCatFact(0, date, fact, true)
    console.log('Hey dude: ' + JSON.stringify(builtCatFact))
    try {
      const response = await fetch('/api/post-facts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(builtCatFact)
      })

      if (!response.ok) {
        throw new Error(`Failed to post fact: ${response.statusText}`)
      }
    } catch (error) {
      console.error('Error posting fact:', error)
    }
  }

  function popFacts() {}

  async function updateFacts(previousFactsId: number, updatedFacts: string, updatedDate: number) {}

  async function deleteFacts(id: number) {
    try {
      const response = await fetch('/api/delete-facts', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      })

      if (!response.ok) {
        const errorResponse = await response.json()
        throw new Error(errorResponse.error || 'An error occurred while fetching facts')
      }
    } catch (error) {
      if (error instanceof Error) throw error
      else throw new Error('Unknown error occurred') //handles unknown error
    }
  }

  return { getFacts, addFacts, updateFacts, popFacts, deleteFacts, generateFacts }
}
