import { piniaInstance } from '@/global'
import type { Facts } from '@/types/facts'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useItemStore = defineStore('facts', () => {
  const items = ref<Facts[]>([])

  // testing
  async function fetchdata() {
    try {
      const response = await fetch('/api/test/index') // Correct endpoint
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      const data = await response.json()
      console.log(data)
      return data // Return or store the fetched data as needed
    } catch (error) {
      console.error('Failed to fetch:', error)
      // Handle the error appropriately
    }
  }

  // testing

  function findLastIndexID(Items: Facts[]): number {
    const lastIndex = ref<number>(0)
    lastIndex.value = Items.length
    if (lastIndex.value <= 0) return 0

    return items.value[lastIndex.value - 1].id + 1
  }

  // ID value
  const id = ref<number>(0)
  id.value = findLastIndexID(items.value)

  // Actions
  function addItemStore(facts: string, date: number) {
    const item = {
      id: id.value++,
      facts: facts,
      created_at: date
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
  }

  function updateItemStore(previousFactsId: number, updatedFacts: string, updatedDate: number) {
    const locale = items.value.findIndex((items) => items.id === previousFactsId)
    if (locale === -1) throw new Error('Item not found')

    items.value[locale].facts = updatedFacts
    items.value[locale].created_at = updatedDate
  }

  async function getItemStore() {
    return items.value
  }

  async function getIdCount() {
    return id.value
  }

  return {
    addItemStore,
    setItemStore,
    popItemStore,
    updateItemStore,
    getItemStore,
    getIdCount,
    deleteItemStore,
    fetchdata
  }
})(piniaInstance)
