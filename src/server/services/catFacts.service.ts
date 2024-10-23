import type { Facts } from '@/types/facts'
import { supabase } from '../db/supabaseServices'

// get
const getAllDataFromFacts = async () => {
  const { data, error } = await supabase.from('facts').select('*')

  // handle error
  if (error) {
    console.error(error.message)
    return
  }

  // Check if data is empty
  if (!data || data.length === 0) {
    console.warn('No data found in the table.')
    return []
  }

  return data
}

// add
const insertDataIntoFacts = async (data: Facts) => {
  const { error } = await supabase.from('facts').insert([data])

  // handle error
  if (error) {
    throw new Error(`Error inserting data: ${error.message}`)
  }
}

// update
const updateDataFromFacts = async (id: number, facts: Facts) => {
  const { data, error } = await supabase.from('facts').update(facts).eq('id', id)

  // handle error
  if (error) {
    throw new Error(`${error.message}`)
  }

  const response = data

  return response
}

// delete
const deleteDataFromFacts = async (id: number) => {
  const { error } = await supabase.from('facts').delete().eq('id', id)

  // handle error
  if (error) {
    throw new Error(`${error.message}`)
  }
}

export const factsService = {
  getAllDataFromFacts,
  insertDataIntoFacts,
  updateDataFromFacts,
  deleteDataFromFacts
}
