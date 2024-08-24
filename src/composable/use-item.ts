import { getCatFactsData } from '@/server/api/get-facts/index.get'
import { catFactsFactory, formatDateFactory } from '@/factories/facts.factory'
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

// useLocalStorage
export async function storeLocalStorage() {
  await itemStore.saveData()
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
