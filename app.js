const fs = require('fs');
const http = require('http');
const express = require('express');
const saxon = require('saxon-js');

const favicon = fs.readFileSync('./favicon.ico');
const index = fs.readFileSync('./index.html', 'utf-8');
const sample = fs.readFileSync('./bates.xml', 'utf-8');

const app = express();
app.use(express.json()); 

const env = saxon.getPlatform();

const doc = env.parseXmlFromString(env.readFile('./CDA.xsl'));
// hack: avoid error "Required cardinality of value of parameter $static-base-uri is exactly one; supplied value is empty"
if (process.platform !== 'win32') {
  doc._saxonBaseUri = 'file:///' + __dirname + '/';
}
else {
  doc._saxonBaseUri = __dirname + '/';
}

const sef = saxon.compile(doc);

app.get(['/', '/index.html'], (req, res) => {
  res.send(index);
});

app.get(['/favicon.ico'], (req, res) => {
  res.send(favicon);
});

app.post(['/submit'], (req, res) => {
  console.log('received post');
  if (req.body.first) {
    sectionOrder = req.body.first;
  }
  console.log(sectionOrder);
  let output = saxon.transform({
    stylesheetInternal: sef,
    sourceText: sample,
    stylesheetParams: {
      "section-order":  sectionOrder  
   }
  }, "async").then(output => {
    let transformedXmlStr = saxon.serialize(output.principalResult);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(transformedXmlStr);
    res.end();
  }).catch(err=>{console.log(err)});
    //res.write('<!doctype html><html lang="en"><body>Hello World</body>');
  // let transformedXmlStr = saxon.serialize(result.principalResult);
});

let httpServer = http.createServer(app);
httpServer.listen(80);
console.log('HTTP server listening...')