import { piniaInstance } from '@/global'
import type { Facts } from '@/types/facts'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useItemStore = defineStore('items', () => {
  const items = ref<Facts[]>([])

  const getItemData: any = localStorage.getItem('itemsStored')

  if (getItemData !== null) {
    items.value = JSON.parse(getItemData)
  }

  const id = ref<number>(items.value.length)

  // Actions
  function addItemStore(itemName: string) {
    const item = {
      id: id.value++,
      facts: itemName
    }
    items.value.push(item as Facts)
  }

  function setItemStore(setItems: Facts[]) {
    items.value = setItems
  }

  function deleteItemStore(item: Facts) {
    items.value = items.value.filter((items) => items.id !== item.id)
  }

  function popItemStore() {
    items.value.pop()
    id.value -= 1
  }

  function updateItemStore(updatedItem: Facts) {
    const locale = items.value.findIndex((items) => items.id === updatedItem.id)
    if (locale === -1) {
      items.value[locale] = updatedItem
    } else {
      throw new Error('Item not found')
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
