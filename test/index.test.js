
const chai = require('chai');
const fs = require('fs');
const LogParser = require('../index.js');
const fixtures = require('./fixtures/fixtures');

const { expect } = chai;

function check(csvPath) {
  fs.exists(`./${csvPath}`, (exists) => {
    if (!exists) {
      setTimeout(() => {
        check(csvPath);
      }, 500);
    } else {
      fs.unlink(`./${csvPath}`, (err) => {
      });
    }
  });
}


function fileToExisit(file, cb) {
  fs.exists(`./${file}`, (exists) => {
    if (!exists) {
      cb(exists); // false
    } else cb(exists); // true
  });
}
describe('index.js', () => {
  it('should return error when no input file is given', () => {
    expect(() => LogParser('', '')).to.throw('Need to specify log path');
  });
  it('should return data properly', () => {
    const csvPath = 'mydata';
    LogParser('./test/logs/test2.log', csvPath, (err, result) => {
      expect(result).to.be.a('string');
      expect(result).to.be.equal(fixtures.test1);
    });
    check(`${csvPath}.csv`);
  });
  it('should return default result.csv', () => {
    const csvPath = 'result';
    LogParser('./test/logs/test2.log', '', (err, result) => {
      expect(result).to.be.a('string');
      expect(result).to.be.equal(fixtures.test1);
      fileToExisit(`${csvPath}.csv`, (value) => {
        expect(value).to.be.true;
        check(`${csvPath}.csv`);
      });
    });
  });
});
