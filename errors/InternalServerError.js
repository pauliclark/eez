import { error } from '../response/index.js'
export default class InternalServerError extends Error {
  constructor (message) {
    super(message)
    this.name = 'InternalServerError'
  }

  respond (res) {
    error(res, this.message)
  }
}
