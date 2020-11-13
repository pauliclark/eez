import { getApp } from '../containers/app.js'
import { error } from '../response/index.js'

const actions = ['get', 'put', 'patch', 'fetch', 'post']
const routing = {}
actions.forEach(action => {
  routing[action] = (path, method) => {
    const app = getApp()
    app[action](path, (req, res) => {
      try {
        method(req, res)
      } catch (e) {
        if (e.respond) {
          e.respond(res)
        } else {
          error(res, e.message)
        }
      }
    })
  }
})

export default routing
