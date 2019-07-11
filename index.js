const pwm = require('./pwm.js')
const Servo = require('./servo.js')

var pwmHat = new pwm.Hat(60)
var servo = new Servo(pwmHat, 1)
servo.rotateTo(80)