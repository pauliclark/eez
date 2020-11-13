import { error } from '../response/index.js'
export default class InvalidInputError extends Error {
  constructor (message) {
    super(message)
    this.name = 'InvalidInputError'
  }

  respond (res) {
    error(res, this.message)
  }
}
