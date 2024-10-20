import { getCatFactsData, getTestingFactsData } from '@/server/api/get-facts/index.get'
import { catFactsFactory, formatDateFactory } from '@/server/factories/facts.factory'
import { addFactsUseCase } from '@/server/use-case/add-facts/add-facts-use-case'
import { deleteFactsUseCase } from '@/server/use-case/delete-facts/delete-facts-use-case'
import { getFactsUseCase } from '@/server/use-case/get-facts/get-facts-use-case'
import { useItemStore } from '@/stores/items'
import type { Facts } from '@/types/facts'

const itemStore = useItemStore

// useItemStore
export function useItem() {
  async function getItem() {
    const response = await itemStore.getItemStore()

    return response
  }

  async function setItem(items: Facts[]) {
    itemStore.setItemStore(items)
  }

  async function addItem(name: string, date: number) {
    itemStore.addItemStore(name, date)
  }

  function popItem() {
    itemStore.popItemStore()
  }

  async function updateItem(previousFactsId: number, updatedFacts: string, updatedDate: number) {
    itemStore.updateItemStore(previousFactsId, updatedFacts, updatedDate)
  }

  function deleteItem(item: Facts) {
    itemStore.deleteItemStore(item)
  }

  return { getItem, setItem, addItem, popItem, updateItem, deleteItem }
}

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

export async function getTestingFacts() {
  const response = await getTestingFactsData()

  return response
}

// useFacts
export function useFacts() {
  async function getFacts() {
    const response = await getFactsUseCase()

    return response
  }

  async function addFacts(facts: string, date: number) {
    const response = await addFactsUseCase(facts, date)

    return response
  }

  function popFacts() {
    itemStore.popItemStore()
  }

  async function updateFacts(previousFactsId: number, updatedFacts: string, updatedDate: number) {
    itemStore.updateItemStore(previousFactsId, updatedFacts, updatedDate)
  }

  function deleteFacts(id: number) {
    deleteFactsUseCase(id)
  }

  return { getFacts, addFacts, updateFacts, popFacts, deleteFacts }
}
