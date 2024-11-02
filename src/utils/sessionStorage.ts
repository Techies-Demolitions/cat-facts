// To save state in one session

import type { ClientSideFact } from '@/types/facts'

export function setSessionData(facts: ClientSideFact[]) {
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
