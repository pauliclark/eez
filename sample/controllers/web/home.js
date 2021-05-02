import { response } from '../../../index.js'
const { success } = response
export default (req, res) => {
  success(res, 'home')
}
