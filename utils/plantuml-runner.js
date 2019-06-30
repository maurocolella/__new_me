/* eslint-disable prefer-arrow-callback */
const plantuml = require('node-plantuml');
const fs = require('fs');
const mkdirp = require('mkdirp');
// const getDirName = require('path').dirname;
const ejs = require('ejs');

function writeFile(inputDir, outputDir) {
  mkdirp(outputDir, function parseFile(err) {
    if (err) {
      console.log(err);
      return;
    }
    const gen = plantuml.generate(`${inputDir}/diagram.plantuml`, { format: 'svg' });
    // pipe(fs.createWriteStream(outputFile));
    const chunks = [];
    let svg = '';

    gen.out.on('data', function readData(chunk) {
      chunks.push(chunk);
    });

    // Send the buffer or you can put it into a var
    gen.out.on('end', function commitData() {
      svg = Buffer.concat(chunks).toString('utf8');

      ejs.renderFile(
        `${inputDir}/viewer.ejs`,
        { svg },
        {},
        function renderHTML(renderError, str) {
          if (renderError) {
            throw renderError;
          }
          fs.writeFile(`${outputDir}/viewer.html`, str, 'utf8', function afterWrite(writeError) {
            if (writeError) {
              throw writeError;
            }
            fs.copyFile(
              `${inputDir}/svg-pan-zoom.js`,
              `${outputDir}/svg-pan-zoom.js`, function copyScript(copyError) {
                if (copyError) {
                  throw copyError;
                }
                console.log(`${inputDir} => ${outputDir}`);
                console.log('Successfully processed uml');
              },
            );
          });
        },
      );
    });
  });
}

writeFile('doc/diagram', 'reports/diagram');
