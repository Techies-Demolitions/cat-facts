import type { Facts } from '@/types/facts'
import { ref } from 'vue'

async function buildCatFact(data: any, modifiedDate: any) {
  const catFacts = ref<Facts>({
    id: data._id,
    facts: data.text,
    created_at: modifiedDate
  })

  return catFacts
}

function formatDateFactory(data: any) {
  const date = ref<string>('')
  date.value = data.updatedAt.toString()
  const dateOnly = date.value.split('T')[0]

  return dateOnly
}

function isFetchedFactForCats(input: string): boolean {
  if (input.search(/cat/i) > 0) return true
  else return false
}

export const factsFactory = {
  buildCatFact,
  formatDateFactory,
  isFetchedFactForCats
}
