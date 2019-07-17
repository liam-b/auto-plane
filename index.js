const sleep = require('util').promisify(setTimeout)
const serial = require('./serial.js')
const pwm = require('./pwm.js')
const Esc = require('./esc.js')
const Servo = require('./servo.js')

console.log('started')

let hat
const bot = {
  pwmHat: hat = new pwm.Hat(60),
  esc: new Esc(hat, 0),
  servo: {
    aileronLeft: new Servo(hat, 1),
    aileronRight: new Servo(hat, 2),
    elevator: new Servo(hat, 3),
    rudder: new Servo(hat, 4)
  }
}

async function ping() {
  serial.flush()

  loop(async (exit) => {
    console.log('pinging')
    let res = serial.read()

    if (res && res.command == 'ping') exit(() => {
      serial.send('pong')
      serial.flush()
      control()
    })
    else await sleep(1000)
  })
}

async function control() {
  serial.flush()

  let errors = 0
  loop(async (exit) => {
    console.log('controlling')
    let res = await serial.response(100)
    if (res) {
      errors = 0
      serial.send('heartbeat')

      if (res.command == 'control') {
        bot.servo.aileronLeft.setPosition(res.data.roll * 2 - 100)
        bot.servo.aileronRight.setPosition((100 - res.data.roll) * 2 - 100)
        bot.servo.elevator.setPosition(res.data.pitch * 2 - 100)
        bot.servo.rudder.setPosition(res.data.yaw * 2 - 100)

        // if (res.data.armed) bot.esc.setSpeed(Math.min(res.data.throttle - 50, 25))
        // else bot.esc.stop()
      }
    } else errors += 1

    if (errors > 10) exit(ping)
  })
}

async function loop(callback) {
  let looping = true
  let exit = (next) => {
    looping = false
    next()
  }

  while (looping) {
    await callback(exit)
  }
}

ping()