import { piniaInstance } from '@/global'
import type { Item } from '@/types/Item'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useItemStore = defineStore('items', () => {
  const items = ref<Item[]>([])

  const getItemData: any = localStorage.getItem('itemsStored')

  if (getItemData !== null) {
    items.value = JSON.parse(getItemData)
  }

  const id = ref<number>(items.value.length)

  // Actions
  function addItemStore(itemName: string) {
    const item = {
      id: id.value++,
      name: itemName
    }
    items.value.push(item as Item)
  }

  function setItemStore(setItems: Item[]) {
    items.value = setItems
  }

  function deleteItemStore(item: Item) {
    items.value = items.value.filter((items) => items.id !== item.id)
    id.value -= 1
  }

  function popItemStore() {
    items.value.pop()
    id.value -= 1
  }

  function updateItemStore(updatedItem: Item) {
    const locale = items.value.findIndex((items) => items.id === updatedItem.id)
    if (locale === -1) {
      items.value[locale] = updatedItem
    } else {
      console.error('Item not found')
    }
  }

  async function getItemStore() {
    return items.value
  }

  async function getIdCount() {
    return id.value
  }

  async function saveData() {
    localStorage.setItem('itemsStored', JSON.stringify(items.value))
  }

  return {
    addItemStore,
    setItemStore,
    popItemStore,
    updateItemStore,
    getItemStore,
    items,
    getIdCount,
    deleteItemStore,
    saveData
  }
})(piniaInstance)
