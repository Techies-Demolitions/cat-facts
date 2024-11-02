// FACTORY -> COMPOSABLES
import { factsFactory } from '@/factories/facts.factory'
import type { ClientSideFact, ServerSideFact } from '@/types/facts'

export function useFactsFactory() {
  async function buildCatFact(id: any, date: any, facts: any, isServerSide: boolean) {
    const response = await factsFactory.buildServerOrClientCatFact(id, date, facts, isServerSide)

    return response
  }

  async function transformServerSideFactIntoClientSideFact(
    data: ServerSideFact,
    modifiedDate: string
  ) {
    const response = await factsFactory.transformServerSideFactIntoClientSideFact(
      data,
      modifiedDate
    )

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

  function findLastIndexId(Items: ClientSideFact[]): number {
    // if empty
    if (Items.length === 0) {
      return -1
    }

    const lastItem = Items[Items.length - 1]

    return lastItem.id
  }

  return {
    buildCatFact,
    formatDateFactory,
    isFetchedFactForCats,
    findLastIndexId,
    transformServerSideFactIntoClientSideFact
  }
}
