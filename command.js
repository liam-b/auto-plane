module.exports.serialize = (command, data) => {
  return JSON.stringify({
    command,
    data
  })
}

module.exports.deserialize = (json) => {
  return JSON.parse(json)
}