import type { Facts } from '@/types/facts'
import { ref } from 'vue'

export async function catFactsFactory(data: any, date: any) {
  const catFacts = ref<Facts>({
    id: data._id,
    facts: data.text,
    created_at: date
  })

  return catFacts
}

export function formatDateFactory(data: any) {
  const date = ref<string>('')
  date.value = data.updatedAt.toString()
  const dateOnly = date.value.split('T')[0]

  return dateOnly
}

function findLastIndexId(Items: Facts[]): number {
  // if empty
  if (Items.length === 0) {
    return -1
  }

  const lastItem = Items[Items.length - 1]

  return lastItem.id
}

export const factsFactory = {
  findLastIndexId
}
