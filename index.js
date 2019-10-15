const { createReadStream,createWriteStream } = require('fs');
const { lookup } = require('geoip-lite');
const parser = require('ua-parser-js');
const { createInterface } = require('readline');
const {
  validateDeviceData,
  validateLocationData,
} = require('./utils/validate');

var csvWriter = require('csv-write-stream')
var writer = csvWriter({ headers: ['state', 'country', 'browser', 'device']})
const locationCache = new Map();
const userAgentCache = new Map();

function LogParser(filePath, outputFile, cb) {
  console.time('par')
  try {
    if (!filePath) throw new Error('Need to specify log path');
    if (!outputFile) {
      outputFile = 'result';
    }
    const rl = createInterface({
      input: createReadStream(filePath),
      crlfDelay: Infinity,
    });

    writer.pipe(createWriteStream(outputFile))

    rl.on('line', (line) => {
      // Gets line and splits it by " - " where the ip is the first value
      const IPAddress = line.split(' - ')[0];
      let locationData; //= lookup(IPAddress);
      let userAgentData; //= parser(line);
      if(locationCache.get(IPAddress))
        locationData = locationCache.get(IPAddress)
      else{
        locationData = lookup(IPAddress)
        locationCache.set(IPAddress,locationData)
      }
      if(userAgentCache.get(line))
        userAgentData = userAgentCache.get(line)
      else{
        userAgentData = parser(line);
        userAgentCache.set(line,userAgentData)
      }
      const result = {
        state: validateLocationData('region', locationData),
        country: validateLocationData('country', locationData),
        browser: validateDeviceData('browser', userAgentData),
        device: validateDeviceData('device', userAgentData),
      };
      writer.write(result)
    });

    rl.on('close', () => {
      cb(null, outputFile);
      writer.end()
      console.timeEnd('par')
    });
  } catch (e) {
    throw new Error(e.message);
  }
}

module.exports = LogParser;
