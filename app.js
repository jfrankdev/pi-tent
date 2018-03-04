const five = require('johnny-five');
const raspi = require('raspi-io');
const board = new five.Board({io: new raspi()});
const sensor = require('node-dht-sensor');

let TEMP_ARR = [];
let NEW_TEMP;

function delay(duration) {
  return new Promise(resolve => setTimeout(resolve, duration));
}

async function takeReading () {
  await delay(1000);
  sensor.read(11, 17, function(err, temperature, humidity) {
    const F_TEMP = temperature.toFixed(1) * 9 / 5 + 32;
    TEMP_ARR.unshift(F_TEMP);
    let NEW_ARR = TEMP_ARR[0] / 100;
      NEW_TEMP = NEW_ARR.toFixed(2).split('').slice(1).join('');
    takeReading();
  });
};

takeReading();

var blessed = require('blessed')
  , contrib = require('blessed-contrib')

var screen = blessed.screen()

var grid = new contrib.grid({rows: 12, cols: 12, screen: screen})

var donut = grid.set(8, 8, 4, 2, contrib.donut,
  {
  label: 'temperature',
  radius: 16,
  arcWidth: 4,
  yPadding: 2,
  data: [{label: 'temperature', percent: 0}]
})

let PCT = 0;

function updateDonut(){

  if (PCT > 0.99) PCT = 0.00;
  var color = "green";
  if (PCT >= 0.25) color = "cyan";
  if (PCT >= 0.5) color = "yellow";
  if (PCT >= 0.75) color = "red";
  donut.setData([
    {percent: Number(NEW_TEMP), label: 'temperature', 'color': color  }
  ]);
  PCT = Number(NEW_TEMP);
}

setInterval(function() {
   updateDonut();
   screen.render()
}, 500)

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

screen.render()
