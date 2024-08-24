import type { Facts } from '@/types/facts'

export function saveLocalData(items: Facts[]) {
  localStorage.setItem('itemsStored', JSON.stringify(items))
}

export function retrieveLocalData() {
  const retrievedData = localStorage.getItem('itemsStored')

  return retrievedData
}
