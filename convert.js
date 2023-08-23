const fs = require('fs');
const saxon = require('saxon-js');

const env = saxon.getPlatform();

const doc = env.parseXmlFromString(env.readFile('./CDA.xsl'));
// hack: avoid error "Required cardinality of value of parameter $static-base-uri is exactly one; supplied value is empty"
doc._saxonBaseUri = "C:/Source/Repos/xlst/";

const sef = saxon.compile(doc);


const result = saxon.transform({
  stylesheetInternal: sef,
  sourceText: env.readFile('bates.xml')
});

let transformedXmlStr = saxon.serialize(result.principalResult);

//console.log(transformedXmlStr);

fs.writeFileSync('./output.html', transformedXmlStr)

/*

let filename = 'bates.xml';

SaxonJS.transform({
  stylesheetFileName: "CDA.xsl",
  sourceFileName: `./sampleXML/${filename}`,
  destination: "serialized"
}, "sync")
.then (output => {
  fs.writeFileSync(`./${filename}`, output.principalResult);
  console.log('done?');
})
*/
