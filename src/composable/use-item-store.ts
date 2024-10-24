import { useItemStore } from '@/stores/items'
import type { Facts } from '@/types/facts'

const itemStore = useItemStore

// useItemStore
export function useItem() {
  async function getCatFactsStore() {
    const response = await itemStore.getItemStore()

    return response as Facts[]
  }

  async function setItem(items: Facts[]) {
    itemStore.setItemStore(items)
  }

  async function addItem(facts: Facts) {
    itemStore.addItemStore(facts)
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

  return { getCatFactsStore, setItem, addItem, popItem, updateItem, deleteItem }
}
