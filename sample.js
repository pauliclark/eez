import eez, { routing, response } from './index.js'
const { success } = response

eez()
routing.get('/', (req, res) => {
  success(res, 'root path')
})
routing.get('/test', (req, res) => {
  success(res, 'test path')
})
