import type { ClientSideFact, ServerSideFact } from '@/types/facts'
import { ref } from 'vue'

// builds server-side || client-side in one factory
async function buildServerOrClientCatFact(
  id: number,
  date: Date,
  facts: string,
  isServerSide: boolean
) {
  if (isServerSide) {
    const textId = id.toString(id)
    const serverCatFact: ServerSideFact = {
      _id: textId,
      text: facts,
      updatedAt: JSON.stringify(date)
    }

    return serverCatFact
  } else {
    // if clientSide
    const clientCatFact: ClientSideFact = {
      id: id,
      created_at: JSON.stringify(date),
      facts: facts
    }

    return clientCatFact
  }
}

async function transformServerSideFactIntoClientSideFact(
  data: ServerSideFact,
  modifiedDate: string
) {
  const catFacts = ref<ClientSideFact>({
    id: parseInt(data._id),
    created_at: modifiedDate,
    facts: data.text
  })

  return catFacts.value
}

function formatDateFactory(data: any) {
  const date = ref<string>('')
  date.value = data.updatedAt.toString()
  const dateOnly = date.value.split('T')[0]

  return dateOnly
}

function isFetchedFactForCats(input: string): boolean {
  return typeof input === 'string' && input.search(/cat/i) >= 0
}

export const factsFactory = {
  buildServerOrClientCatFact,
  transformServerSideFactIntoClientSideFact,
  formatDateFactory,
  isFetchedFactForCats
}
