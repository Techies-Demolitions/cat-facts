import type { Facts } from '@/types/facts'
import { ref } from 'vue'

export async function catFactsFactory(data: any) {
  const catFacts = ref<Facts>({
    id: data._id,
    facts: data.text,
    fetchDate: data.updatedAt
  })

  return catFacts
}
