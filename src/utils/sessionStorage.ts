// To save state in one session

import type { Facts } from '@/types/facts'

export function setSessionData(facts: Facts[]) {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('catfactsStored', JSON.stringify(facts))
  }
}

export function getSessionData() {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem('catfactsStored')
  }
  return null
}
