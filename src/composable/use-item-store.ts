import { useItemStore } from '@/stores/items'
import type { ClientSideFact } from '@/types/facts'

const itemStore = useItemStore

// useItemStore
export function useFactsStore() {
  async function getCatFactsStore() {
    const response = await itemStore.getItemStore()

    return response
  }

  async function setCatFactsStore(items: ClientSideFact[]) {
    itemStore.setItemStore(items)
  }

  async function addItem(facts: ClientSideFact) {
    itemStore.addItemStore(facts)
  }

  function popItem() {
    itemStore.popItemStore()
  }

  async function updateItem(previousFactsId: number, updatedFacts: string, updatedDate: number) {
    itemStore.updateItemStore(previousFactsId, updatedFacts, updatedDate)
  }

  function deleteItem(item: ClientSideFact) {
    itemStore.deleteItemStore(item)
  }

  return { getCatFactsStore, setCatFactsStore, addItem, popItem, updateItem, deleteItem }
}
