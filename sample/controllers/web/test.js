import { response } from '../../../index.js'
const { success } = response
export default (req, res) => {
  console.log(req.params)
  success(res, req.params)
}
