const pwm = require('./pwm.js')
const Esc = require('./esc.js')

var pwmHat = new pwm.Hat(60)
var esc = new Esc(pwmHat, 0)
esc.setSpeed(80)