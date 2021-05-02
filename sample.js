import { eez, createEnvironment, identifiers, environments } from './index.js'
import controllers from './sample/controllers/index.js'
const customEnvironment = 'myCustomEnv'
createEnvironment(customEnvironment)
eez({
  env: customEnvironment,
  port: identifiers.autoPort,
  afterListen: () => {
    controllers()
    console.log(environments)
  }
})
