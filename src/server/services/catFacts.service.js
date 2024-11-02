import { supabase } from '../db/supabaseServices.js'

// get
const getAllDataFromFacts = async () => {
  try {
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
  } catch (err) {
    console.error(`Error fetching data: ${err.message}`)
    return []
  }
}

// add || post data
const insertDataIntoFacts = async (data) => {
  try {
    const { error } = await supabase.from('facts').insert([data])

    // handle error
    if (error) {
      throw new Error(`Error inserting data: ${error.message}`)
    }
  } catch (err) {
    console.error(err.message)
    throw new Error(`Failed to insert data: ${err.message}`)
  }
}

// update || put data
const updateDataFromFacts = async (id, facts) => {
  try {
    const { data, error } = await supabase.from('facts').update(facts).eq('id', id)

    // handle error
    if (error) {
      throw new Error(`${error.message}`)
    }

    return data
  } catch (err) {
    console.error(err.message)
    throw new Error(`Failed to update data: ${err.message}`)
  }
}

// delete
const deleteDataFromFacts = async (id) => {
  try {
    const { error } = await supabase.from('facts').delete().eq('id', id)

    // handle error
    if (error) {
      throw new Error(`${error.message}`)
    }
  } catch (err) {
    console.error(err.message)
    throw new Error(`Failed to delete data: ${err.message}`)
  }
}

export const factsService = {
  getAllDataFromFacts,
  insertDataIntoFacts,
  updateDataFromFacts,
  deleteDataFromFacts
}
