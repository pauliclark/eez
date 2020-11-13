import { notFound } from '../response/index.js'
export default class NotFoundError extends Error {
  constructor (message) {
    super(message)
    this.name = 'NotFoundError'
  }

  respond (res) {
    notFound(res, this.message)
  }
}
