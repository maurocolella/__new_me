const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

function launchChromeAndRunLighthouse(url, opts, config = null) {
  return chromeLauncher.launch({
    chromeFlags: opts.chromeFlags,
    logLevel: opts.logLevel,
  }).then((chrome) => {
    // eslint-disable-next-line no-param-reassign
    opts.port = chrome.port;
    return lighthouse(url, opts, config).then(results => chrome.kill().then(() => results.lhr));
  });
}

const opts = {
  chromeFlags: ['--show-paint-rects'],
  logLevel: 'info',
  output: 'html',
};

// Usage:
launchChromeAndRunLighthouse('http://localhost:3000', opts).then((results) => {
  // Use results!
  console.log(results);
});
