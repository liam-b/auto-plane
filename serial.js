const Serial = require('raspi-serial').Serial
const Command = require('./command.js')
const sleep = require('util').promisify(setTimeout)

var serial
module.exports.init = () => {
  serial = new Serial({
    portId: "/dev/ttyUSB0",
    baudRate: 57600
  })
}

module.exports.send = (name, data) => {
  port.write(command.serialize(name, data))
}

module.exports.response = (timeout) => {
  return new Promise(resolve => {
    let callback = response => resolve(command.deserialize(response))
    port.once('data', callback)
    sleep(timeout).then(() => {
      port.removeListener('data', callback)
      resolve()
    })
  })
}