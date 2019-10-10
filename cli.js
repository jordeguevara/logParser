const LogParser = require('./index');

if (!process.argv[2]) throw new Error('Need to specify log path');
if (!process.argv[3]) process.argv[3] = 'result';

const file = process.argv[2];
const output = `${process.argv[3]}`;
LogParser(file, output, () => {
  console.log(`Your CSV is ready at ${output}`);
});
