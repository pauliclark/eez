import { denied } from '../response/index.js'
export default class AccessDeniedError extends Error {
  constructor (message) {
    super(message)
    this.name = 'AccessDeniedError'
  }

  respond (res) {
    denied(res, this.message)
  }
}
