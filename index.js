const raspi = require('raspi')
const Serial = require('raspi-serial').Serial
const pwm = require('./pwm.js')
const Esc = require('./esc.js')
const Servo = require('./servo.js')

raspi.init(() => {
  var serial = new Serial({
    portId: "/dev/ttyUSB0",
    baudRate: 57600
  })
  
  serial.open(() => {
    serial.on('data', (data) => {
      process.stdout.write(data)
    })

    serial.write('Hello from raspi-serial')
  })
  
  const pwmHat = new pwm.Hat(60)
  const esc = new Esc(pwmHat, 0)
  const servo = new Servo(pwmHat, 1)

  esc.setSpeed(0)
  servo.rotateTo(100)
})