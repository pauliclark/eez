import { setApp, getApp } from './containers/app.js'
import { setEnv, getEnv, createEnvironment } from './containers/environment.js'
import { setLog } from './containers/log.js'
import { setServer, getServer } from './containers/server.js'
import { getInfo, setInfo } from './containers/info.js'
import express from 'express'
import routing from './routing/index.js'
import response from './response/index.js'
import errors from './errors/index.js'
import identifiers, { noPort, autoPort } from './constants/identifiers.js'
import environments from './constants/environments.js'
import getPort from 'get-port'
import hbs from 'hbs'
import { contextLog } from '@pauliclark/log-context'
const eezLog = contextLog('eez')

const init = async ({
  env = (process.argv[2] || process.env.NODE_ENV || environments.DEV).toLowerCase(),
  port = noPort,
  beforeApp = () => {},
  afterApp = () => {},
  afterListen = () => {},
  logger = eezLog
} = {}) => {
  setEnv(env)

  if (logger) setLog(logger)

  try {
    await beforeApp()
  } catch (e) {
    logger.error(e)
  }
  const app = express()
  app.set('view engine', 'hbs')
  app.engine('hbs', hbs.__express)
  app.use(express.json())
  setApp(app)
  try {
    await afterApp()
  } catch (e) {
    logger.error(e)
  }
  if (port !== noPort) {
    try {
      if (port === autoPort) {
        port = await getPort()
      }
      await new Promise((resolve, reject) => {
        try {
          app.listen(port, function () {
            setServer(this)
            setInfo('port', this.address().port)
            logger.info(`Listening on port ${getInfo('port')}`)
            resolve()
          })
        } catch (e) {
          reject(e)
        }
      })
    } catch (e) {
      logger.error(e)
    }
  }
  try {
    afterListen()
  } catch (e) {
    logger.error(e)
  }
}
const eez = init
export {
  getApp,
  getServer,
  getEnv,
  createEnvironment,
  environments,
  getInfo,
  eez,
  routing,
  response,
  errors,
  identifiers

}
export default init
