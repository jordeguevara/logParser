const { createReadStream } = require('fs');
const { lookup } = require('geoip-lite');
const parser = require('ua-parser-js');
const { createInterface } = require('readline');
const { Parser } = require('json2csv');
const { writeCSV } = require('./utils/util');
const {
  validateDeviceData,
  validateLocationData,
} = require('./utils/validate');

function LogParser(filePath, outputFile, cb) {
  try {
    if (!filePath) throw new Error('Need to specify log path');
    if (!outputFile) {
      outputFile = 'result';
    }
    const rl = createInterface({
      input: createReadStream(filePath),
      crlfDelay: Infinity,
    });

    const data = [];
    rl.on('line', (line) => {
      // Gets line and splits it by " - " where the ip is the first value
      const IPAddress = line.split(' - ')[0];
      const locationData = lookup(IPAddress); // translate to data object with region and country and city
      const userAgentData = parser(line); // get userAgent data
      const result = {
        state: validateLocationData('region', locationData),
        country: validateLocationData('country', locationData),
        browser: validateDeviceData('browser', userAgentData),
        device: validateDeviceData('device', userAgentData),
      };
      data.push(result);
    });

    rl.on('close', () => {
      const fields = ['state', 'country', 'browser', 'device'];
      const json2csvParser = new Parser({ fields });
      const csv = json2csvParser.parse(data);
      writeCSV(`${outputFile}.csv`, csv);
      cb(null, csv);
    });
  } catch (e) {
    throw new Error(e.message);
  }
}

module.exports = LogParser;
