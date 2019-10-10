const chai = require('chai');
const sinon = require('sinon');
const fs = require('fs');
const { writeCSV } = require('../utils/util');
const { validateDeviceData, validateLocationData } = require('../utils/validate');
const { locationData, deviceData } = require('./fixtures/fixtures');

const { expect } = chai;

describe('utils', () => {
  let fsStub;
  beforeEach(() => {
    fsStub = sinon.stub(fs, 'writeFile').returns({});
  });
  afterEach(() => {
    fsStub.restore();
  });

  context('util.js', () => {
    it('should write csv data', () => {
      writeCSV('myCsv.data', './fixtures/fixtures.js');
      expect(fsStub.calledOnceWith('myCsv.data', './fixtures/fixtures.js')).to.be.true;
    });
  });

  context('validate.js', () => {
    it('should return null when device.type is undefined', () => {
      const type = 'device';
      const data = deviceData;
      const result = validateDeviceData(type, data);
      expect(result).to.be.equal(null);
    });
    it('should return string when device.browser has a value', () => {
      const type = 'browser';
      const data = deviceData;
      const result = validateDeviceData(type, data);
      expect(result).to.be.equal('Chrome');
    });
    it('should return an error when wrong parameters are inputted [validateDeviceData]', () => {
      const type = 'browser';
      const data = deviceData;
      expect(() => validateDeviceData(data, type)).to.throw('type has to be a string');
      expect(() => validateDeviceData(type, 'not an object')).to.throw('data has to be an object');
    });

    it('should return null when location.region/location.country is undefined', () => {
      const type = 'region';
      const data = JSON.parse(JSON.stringify(locationData));
      data.region = undefined;

      const type2 = 'country';
      const data2 = JSON.parse(JSON.stringify(locationData));
      data2.country = undefined;


      const result = validateLocationData(type, data);
      const result2 = validateLocationData(type2, data2);
      expect(result).to.be.equal(null);
    });
    it('should return string when location.region/location.country has a value', () => {
      const type = 'region';
      const type2 = 'country';
      const data = locationData;

      const result = validateLocationData(type, data);
      const result2 = validateLocationData(type2, data);
      expect(result).to.be.equal('MA');
      expect(result2).to.be.equal('US');
    });
    it('should return an error when wrong parameters are inputted [validateLocationData]', () => {
      const type = 'region';
      const data = locationData;
      expect(() => validateLocationData(data, type)).to.throw('type has to be a string');
      expect(() => validateLocationData(type, 'not an object')).to.throw('data has to be an object');
    });
  });
});
