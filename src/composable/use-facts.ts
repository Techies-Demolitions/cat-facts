import { getCatFactsData } from '@/server/api/get-facts/index.get'
import { catFactsFactory, formatDateFactory } from '@/server/factories/facts.factory'

// useAPI
export async function getCatFacts() {
  const facts = await getCatFactsData()

  if (typeof facts === 'string') return facts // checks if response not ok

  const modifiedDate = formatDateFactory(facts)

  const responseFactory = await catFactsFactory(facts, modifiedDate).catch((error) => {
    throw new Error(error)
  })

  return responseFactory
}

// useFacts
export function useFacts() {
  async function getFacts() {}

  async function addFacts(facts: string, date: number) {}

  function popFacts() {}

  async function updateFacts(previousFactsId: number, updatedFacts: string, updatedDate: number) {}

  function deleteFacts(id: number) {}

  return { getFacts, addFacts, updateFacts, popFacts, deleteFacts }
}
