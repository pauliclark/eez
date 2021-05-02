import { eez, createEnvironment, identifiers } from './index.js'
import controllers from './sample/controllers/index.js'
const customEnvironment = 'myCustomEnv'
createEnvironment(customEnvironment)
eez({
  env: customEnvironment,
  port: identifiers.autoPort,
  afterListen: controllers
})
