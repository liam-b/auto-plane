const pwm = require('./pwm.js')

const MIN_DUTY_CYCLE = 5
const MAX_DUTY_CYCLE = 12

module.exports = class {
  constructor(pwmHat, channel) {
    this.pwmDevice = new pwm.Device(pwmHat, channel)
    this.speed = 0

    this.updateSpeed(this.position)
  }

  setSpeed(position) {
    this.updateSpeed(position)
  }

  updateSpeed(newSpeed) {
    this.speed = newSpeed

    let speed = newSpeed * ((MAX_DUTY_CYCLE - MIN_DUTY_CYCLE) / 2 / 100)
    speed += (MIN_DUTY_CYCLE + MAX_DUTY_CYCLE) / 2
    this.pwmDevice.dutyCycle = Math.max(MIN_DUTY_CYCLE, Math.min(Math.abs(speed), MAX_DUTY_CYCLE))
  }
}