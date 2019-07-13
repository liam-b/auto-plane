const raspi = require('raspi')
const serial = require('./serial.js')
const pwm = require('./pwm.js')
const Esc = require('./esc.js')
const Servo = require('./servo.js')

const bot = {}
var serial

raspi.init(async () => {
  serial = await serial.init()
  bot.pwmHat = new pwm.Hat(60)
  bot.esc = new Esc(pwmHat, 0)
  bot.servo = new Servo(pwmHat, 1)

  loop()
})

async function loop() {
  let res = await serial.response(1000)
  if (res.command == 'ping') serial.send('pong')

  loop()
}