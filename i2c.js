const raspi = require('raspi')
const I2C = require('raspi-i2c').I2C

var i2c
raspi.init(() => {
  i2c = new I2C()
})

module.exports.Device = class {
  constructor(address) {
    this.address = address
  }

  write(register, data) {
    i2c.writeByteSync(this.address, register, data)
  }

  read(register) {
    return i2c.readByteSync(this.address, register)
  }
}