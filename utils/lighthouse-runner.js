/* eslint-disable prefer-arrow-callback */
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

const fs = require('fs');
const mkdirp = require('mkdirp');
const getDirName = require('path').dirname;

function writeFile(path, contents, cb) {
  mkdirp(getDirName(path), function commitFileWrite(err) {
    return err ? cb(err) : fs.writeFile(path, contents, cb);
  });
}

function launchChromeAndRunLighthouse(url, opts, config = null) {
  return chromeLauncher.launch({
    chromeFlags: opts.chromeFlags,
    logLevel: opts.logLevel,
  }).then((chrome) => {
    // eslint-disable-next-line no-param-reassign
    opts.port = chrome.port;
    return lighthouse(url, opts, config).then(results => chrome.kill().then(() => results.report));
  });
}

const opts = {
  chromeFlags: ['--show-paint-rects'],
  logLevel: 'info',
  output: 'html',
};

// Usage:
launchChromeAndRunLighthouse('http://localhost:3000', opts).then((results) => {
  writeFile('./reports/lighthouse-audit.html', results, function logAuditWrite() {
    console.log('All done');
  });
});
