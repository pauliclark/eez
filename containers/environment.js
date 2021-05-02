
import environments from '../constants/environments.js'
const envContainer = {
  env: null
}
export const createEnvironment = env => {
  if (Object.values(environments).includes(env.toLowerCase())) throw new Error(`${env} is already defined. {available = [${Object.values(environments).join(', ')}]}`)
  environments[env.toUpperCase()] = env.toLowerCase()
}
export const setEnv = env => {
  if (!(Object.values(environments).includes(env.toLowerCase()))) throw new Error(`${env} is not a valid EEZ environment {available = [${Object.values(environments).join(', ')}]}`)
  envContainer.env = env.toLowerCase()
}
export const getEnv = () => {
  if (!envContainer.env) throw new Error('ENV is not defined')
  return envContainer.env
}
