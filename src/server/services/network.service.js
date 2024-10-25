import isOnline from 'is-online'

async function checkInternetConnection() {
  const online = await isOnline()
  if (!online) {
    throw new Error('No internet connection. Please try again later.')
  }
}

export const networkService = {
  checkInternetConnection
}
