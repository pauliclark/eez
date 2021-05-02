import { routing } from '../../index.js'
import home from './web/home.js'
import test from './web/test.js'
const { get } = routing

export default async () => {
  get('/', home)
  get('/:test', test)
}
