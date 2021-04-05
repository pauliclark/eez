let serverContainer
export const setServer = server => {
  if (serverContainer) throw new Error('Server is already defined')
  serverContainer = server
}
export const getServer = () => {
  if (!serverContainer) throw new Error('Server is not defined')
  return serverContainer
}
