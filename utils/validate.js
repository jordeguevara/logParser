module.exports = {
  validateLocationData: (type, data) => {
    if (typeof type !== 'string') { throw new Error('type has to be a string'); }
    if (typeof data !== 'object') { throw new Error('data has to be an object'); }
    if (data && data[type]) return data[type];
    return null;
  },
  validateDeviceData: (type, data) => {
    if (typeof type !== 'string') { throw new Error('type has to be a string'); }
    if (typeof data !== 'object') { throw new Error('data has to be an object'); }
    switch (type) {
      case 'browser':

        if (data && data[type] && data[type].name) return data[type].name;
        return null;
      case 'device':
        if (data && data[type] && data[type].type) return data[type].type;
        return null;
      default:
        return null;
    }
  },
};
