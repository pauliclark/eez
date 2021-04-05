import { setApp, getApp } from './containers/app.js'
import { setLog } from './containers/log.js'
import { setServer, getServer } from './containers/server.js'
import express from 'express'
import routing from './routing/index.js'
import response from './response/index.js'
import errors from './errors/index.js'
import identifiers, { autoPort } from './constants/identifiers.js'
import getPort from 'get-port'
import hbs from 'hbs'

const init = async ({
  env = (process.argv[2] || process.env.NODE_ENV || 'DEV').toUpperCase(),
  port = autoPort,
  beforeApp = () => {},
  afterApp = () => {},
  afterListen = () => {},
  logger = console
} = {}) => {
  if (logger) setLog(logger)

  try {
    beforeApp()
  } catch (e) {
    logger.error(e)
  }
  const app = express()
  app.set('view engine', 'html')
  app.engine('html', hbs.__express)
  setApp(app)
  try {
    afterApp()
  } catch (e) {
    logger.error(e)
  }
  try {
    if (port === autoPort) {
      port = await getPort()
    }
    await new Promise((resolve, reject) => {
      try {
        app.listen(port, function () {
          setServer(this)
          logger.info(`Listening at http://localhost:${this.address().port}`)
          resolve()
        })
      } catch (e) {
        reject(e)
      }
    })
  } catch (e) {
    logger.error(e)
  }
  try {
    afterListen()
  } catch (e) {
    logger.error(e)
  }
}
const eez = init
export { getApp, getServer, eez, routing, response, errors, identifiers }
export default init
