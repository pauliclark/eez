const envs = [
  'development',
  'test',
  'staging',
  'production'
]
const environments = {}
envs.forEach(env => { environments[env.toUpperCase()] = env })
environments.DEV = environments.DEVELOPMENT
environments.PROD = environments.PRODUCTION
export default environments
