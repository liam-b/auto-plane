const pwm = require('./pwm.js')

const MIN_DUTY_CYCLE = 2
const MAX_DUTY_CYCLE = 13

module.exports = class {
  constructor(pwmHat, channel) {
    this.pwmDevice = new pwm.Device(pwmHat, channel)
    this.speed = 0

    this.updateSpeed(this.speed)
  }

  setSpeed(speed) {
    this.updateSpeed(speed)
  }

  updateSpeed(newSpeed) {
    this.speed = newSpeed

    let speed = ((newSpeed * (MAX_DUTY_CYCLE - MIN_DUTY_CYCLE)) / 100) + MIN_DUTY_CYCLE
    this.pwmDevice.dutyCycle = Math.max(MIN_DUTY_CYCLE, Math.min(Math.abs(speed), MAX_DUTY_CYCLE))
  }
}