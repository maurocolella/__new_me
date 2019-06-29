/* eslint-disable prefer-arrow-callback */
const plantuml = require('node-plantuml');
const fs = require('fs');
const mkdirp = require('mkdirp');
const getDirName = require('path').dirname;

function writeFile(inputFile, outputFile) {
  mkdirp(getDirName(outputFile), function parseFile(err) {
    if (err) {
      console.log(err);
      return;
    }
    const gen = plantuml.generate(inputFile, { format: 'svg' });
    gen.out.pipe(fs.createWriteStream(outputFile));
    console.log(`${inputFile} => ${outputFile}`);
    console.log('Successfully processed uml');
  });
}

writeFile('doc/diagram.plantuml', 'reports/diagram.svg');
