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

  return { getItem, setItem, addItem, popItem, updateItem, deleteItem }
}
