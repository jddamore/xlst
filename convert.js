const fs = require('fs');
const saxon = require('saxon-js');

const env = saxon.getPlatform();

const doc = env.parseXmlFromString(env.readFile('./CDA.xsl'));
// hack: avoid error "Required cardinality of value of parameter $static-base-uri is exactly one; supplied value is empty"
// doc._saxonBaseUri = "C:/Users/JohnD'Amore/Source/Repos/xlst/";
doc._saxonBaseUri = __dirname + '/';

const sef = saxon.compile(doc);


const result = saxon.transform({
  stylesheetInternal: sef,
  sourceText: env.readFile('bates.xml'),
  stylesheetParams: {
    "section-order": "11450-4,8716-3" 
 }
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

