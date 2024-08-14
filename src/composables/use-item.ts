import { useItemStore } from '@/stores/items'
import type { Item } from '@/types/Item'

const itemStore = useItemStore

export function useItem() {
  async function getItem() {
    const response = await itemStore.getItemStore()
    return response
  }

  async function setItem(items: Item[]) {
    itemStore.setItemStore(items)
  }

  async function addItem(name: string) {
    itemStore.addItemStore(name)
  }

  function popItem() {
    itemStore.popItemStore()
  }

  async function updateItem(item: Item) {
    itemStore.updateItemStore(item)
  }

  async function deleteItem(item: Item) {
    itemStore.deleteItemStore(item)
  }

  return { getItem, setItem, addItem, popItem, updateItem, deleteItem }
}

export async function storeLocalStorage() {
  await itemStore.saveData()
}
