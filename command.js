module.exports.serialize = (command, data) => {
  return JSON.stringify({
    command,
    data
  })
}

module.exports.deserialize = (json) => {
  try {
    return JSON.parse(json)
  } catch (error) {
    console.error('bad json')
    return null
  }
}