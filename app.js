const five = require('johnny-five');
const raspi = require('raspi-io');
const board = new five.Board({io: new raspi()});
const sensor = require('node-dht-sensor');

function delay(duration) {
  return new Promise(resolve => setTimeout(resolve, duration));
}

async function takeReading () {
  await delay(1000);
  sensor.read(11, 17, function(err, temperature, humidity) {
    console.log('temp: ' + (temperature.toFixed(1) * 9 / 5 + 32) + 'F°, ' + 'humidity: ' + humidity.toFixed(1) + '%');
    takeReading();
  });
};

takeReading();
