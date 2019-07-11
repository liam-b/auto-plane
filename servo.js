const pwm = require('./pwm.js')

const MIN_DUTY_CYCLE = 5
const MAX_DUTY_CYCLE = 12

module.exports = class {
  constructor(pwmHat, channel) {
    this.pwmDevice = new pwm.Device(pwmHat, channel)
    this.position = 0

    this.updatePosition(this.position)
  }

  rotateTo(position) {
    this.updatePosition(position)
  }

  updatePosition(newPosition) {
    this.position = newPosition

    let position = (((newPosition + 100) * (MAX_DUTY_CYCLE - MIN_DUTY_CYCLE)) / 200) + MIN_DUTY_CYCLE
    this.pwmDevice.dutyCycle = Math.max(MIN_DUTY_CYCLE, Math.min(Math.abs(position), MAX_DUTY_CYCLE))
  }
}