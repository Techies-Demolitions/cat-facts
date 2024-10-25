import { useFactsFactory } from '@/composable/use-facts-factory'
import { piniaInstance } from '@/global'
import type { Facts } from '@/types/facts'
import { defineStore } from 'pinia'
import { ref } from 'vue'
const { findLastIndexId } = useFactsFactory()

export const useItemStore = defineStore('facts', () => {
  const items = ref<Facts[]>([])

  // Actions
  function addItemStore(facts: Facts) {
    items.value.push(facts)
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
    return findLastIndexId(items.value)
  }

  return {
    addItemStore,
    setItemStore,
    popItemStore,
    updateItemStore,
    getItemStore,
    getIdCount,
    deleteItemStore
  }
})(piniaInstance)
