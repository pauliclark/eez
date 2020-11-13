import { setApp, getApp } from './containers/app.js'
import express from 'express'
import routing from './routing/index.js'
import response from './response/index.js'

let { log, warn, error } = console
const init = async ({
  port = 3000,
  beforeApp = () => {},
  afterApp = () => {},
  afterListen = () => {},
  log: customLog,
  warn: customWarn,
  error: customError
} = {}) => {
  if (customLog) log = customLog
  if (customWarn) warn = customWarn
  if (customError) error = customError
  log(process.env)
  try {
    beforeApp()
  } catch (e) {
    error(e)
  }
  const app = express()
  setApp(app)

  try {
    afterApp()
  } catch (e) {
    error(e)
  }
  try {
    await new Promise((resolve, reject) => {
      app.listen(port, () => {
        log(`Listening at http://localhost:${port}`)
      })
    })
  } catch (e) {
    error(e)
  }
  try {
    afterListen()
  } catch (e) {
    error(e)
  }
}
const eez = init
export { getApp, eez, routing, response }
export default init
