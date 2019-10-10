const fs = require("fs");
module.exports = {

  writeCSV: (filename,csvFile) =>{
    fs.writeFile(filename, csvFile, function(err) {
      if (err) throw err;
    });
  }
}