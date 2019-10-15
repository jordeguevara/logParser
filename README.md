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
npm test
```

5)
```
npm start <input: access log path> <optional: output filePath>
```

example:
```
npm start ./test/logs/test.access.log 
```
<small><i> If output file Path is omitted it will default to current directory in which it was called<i> </small>

Output
```
Your CSV is ready at ./result.csv
```
There will be a csv file at that location

### Docker

Build your image
```
docker build -t <your username>/parser .
```
Your image will now be listed by Docker:
```
$ docker images

# Example
REPOSITORY                      TAG        ID              CREATED
node                            10         1934b0b038d1    5 days ago
<your username>/parser          latest     d64d3505b0d2    1 minute ago
```

Run it 
```
docker run --name parser --rm -ti <your username>/parser /bin/bash
```
Now you should be able to access terminal in container

```
npm test
npm start ./test/logs/test.access.log 
cat result.csv
```

![yes](https://user-images.githubusercontent.com/34716202/66598741-8dc93780-eb56-11e9-9691-c83b2772586e.gif)


### Tech Used

- Node(10.16.3)
    - Npm
        - ua-parser-js
        - geolite
        
        - Mocha
        - Sinon
        - Chai
        - EsLint
        - Json2csv
