const fs = require("fs");
module.exports = {
  validateLocationData: (type, data) => {
    if ( data && data[type]) return data[type];
    else return null;
  },
  validateDeviceData: (type, data) => {
    switch (type) {
      case "browser":
        if (data[type].name) return data[type].name;
        else return null;
      case "device":
        if(data[type].type)
            return data[type].type;
        else return null;
      default:
        return null;
    }
  }
};
