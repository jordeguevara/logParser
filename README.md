### Overview

Create a log parser that can:

✅ Read an access log file

✅ Resolve Country and State from IP address (IE MaxMind GeoLite2 Free)

✅ Translate useragent to device type (Mobile, Desktop, Tablet) and Browser
(Safari, Chrome, etc)

✅ Combine new Geo & Device fields with existing fields on access log file and
output/export a CSV

The goal of this test is to showcase your ability to leverage existing libraries without writing an
exhaustive amount of code. Reach out to us if you need additional direction.
Below is a sample access log you can use if you don't have one.

https://cti-developer-dropbox.s3.amazonaws.com/gobankingrates.com.access.log

Requirements

✅ Any libraries must be installed via a package manager

✅ Must be run from the cli

✅ Provide instructions on how to build and run

✅ Must be written in either PHP, Python or NodeJS

Bonus

✅ Do this all with Docker

✅ Unit Tests

## How to use

### Node

1) Clone the repo
```
git clone https://github.com/jordeguevara/logParser.git
```

2) go into the logParser dir

```
cd logParser
```

3) Install dependencies via npm

```
npm install
```

4) 

```
npm start <input: access log path> <optional: output filePath>
```

example:
```
npm start ./test/logs/test.access.logs /Users/jordeguevara/Desktop/myData
```
<small><i> If output file Path is omitted it will default to current directory in which it was called<i> </small>

Output
```
Your CSV is ready at /Users/jordeguevara/Desktop/myData.csv
```
There will be a csv file at that location
### Docker
