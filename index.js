const raspi = require('raspi')
const pwm = require('./pwm.js')
const Esc = require('./esc.js')
const Servo = require('./servo.js')

raspi.init(() => {
  const pwmHat = new pwm.Hat(60)
  const esc = new Esc(pwmHat, 0)
  const servo = new Servo(pwmHat, 1)

  esc.setSpeed(0)
  servo.rotateTo(100)
})