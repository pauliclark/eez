
export const success = (res, data) => {
  res.status(200).send(data)
}
export const error = (res, data) => {
  res.status(500).send(data)
}
export const denied = (res, data) => {
  res.status(403).send(data)
}
export const notFound = (res, data) => {
  res.status(404).send(data)
}
export default {
  success,
  error,
  denied,
  notFound
}
