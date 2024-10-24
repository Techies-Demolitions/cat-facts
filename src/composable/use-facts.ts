import { getCatFactsData } from '@/server/api/generate-facts/index.get'
import { catFactsFactory, formatDateFactory } from '@/server/factories/facts.factory'
import type { Facts } from '@/types/facts'

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

      const response = await data.json()

      return response as Facts[]
    } catch (error) {
      if (error instanceof Error) throw error
      else throw new Error('Unknown error occurred') //handles unknown error
    }
  }

  async function generateFacts() {
    const facts = await getCatFactsData() //api/generate-facts

    if (typeof facts === 'string') return facts // checks if response not ok

    const modifiedDate = formatDateFactory(facts)

    const responseFactory = await catFactsFactory(facts, modifiedDate).catch((error) => {
      throw new Error(error)
    })

    return responseFactory
  }

  function addFacts(facts: string, date: number) {}

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
