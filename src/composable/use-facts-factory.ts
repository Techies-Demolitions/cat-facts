// FACTORY -> COMPOSABLES

import { factsFactory } from '@/factories/facts.factory'
import type { Facts } from '@/types/facts'

export function useFactsFactory() {
  async function buildCatFact(data: any, modifiedDate: any) {
    const response = await factsFactory.buildCatFact(data, modifiedDate)

    return response
  }

  function formatDateFactory(data: any) {
    const response = factsFactory.formatDateFactory(data)

    return response
  }

  // Filters anything not relevant with cats
  function isFetchedFactForCats(input: string): boolean {
    const response = factsFactory.isFetchedFactForCats(input)

    return response
  }

  function findLastIndexId(Items: Facts[]): number {
    // if empty
    if (Items.length === 0) {
      return -1
    }

    const lastItem = Items[Items.length - 1]

    return lastItem.id
  }

  return { buildCatFact, formatDateFactory, isFetchedFactForCats, findLastIndexId }
}
