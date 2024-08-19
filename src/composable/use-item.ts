import { getCatFactsData } from '@/api/get-facts/index.get'
import { catFactsFactory, modifyDateFactory } from '@/factories/facts.factory'
import { useItemStore } from '@/stores/items'
import type { Facts } from '@/types/facts'

const itemStore = useItemStore

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

  async function updateItem(item: Facts) {
    itemStore.updateItemStore(item)
  }

  async function deleteItem(item: Facts) {
    itemStore.deleteItemStore(item)
  }

  return { getItem, setItem, addItem, popItem, updateItem, deleteItem }
}

export async function storeLocalStorage() {
  await itemStore.saveData()
}

export async function getCatFacts() {
  const facts = await getCatFactsData()
  const modifiedDate = modifyDateFactory(facts)

  const response = await catFactsFactory(facts, modifiedDate).catch((error) => {
    throw new Error(error)
  })

  return response
}
