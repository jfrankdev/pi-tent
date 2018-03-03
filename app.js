//const readline = require('readline');
//const log = console.log;
const five = require('johnny-five');
const raspi = require('raspi-io');
const board = new five.Board({io: new raspi()});
//const rl = readline.createInterface({input: process.stdin,output: process.stdout,terminal: false});

var sensor = require('node-dht-sensor');




  sensor.read(11, 17, function(err, temperature, humidity) {
          console.log('temp: ' + (temperature.toFixed(1) * 9 / 5 + 32) + 'F°, ' + 'humidity: ' + humidity.toFixed(1) + '%');
  });
