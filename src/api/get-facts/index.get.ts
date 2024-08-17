const catUrl = 'https://cat-fact.herokuapp.com/facts/random'

export async function getCatFactsData() {
  const response = await fetch(catUrl)
  const data = await response.json().catch((error) => {
    console.error('Server Error: ' + error)
  })

  return data
}
