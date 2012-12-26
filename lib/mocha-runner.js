#!/usr/bin/env phantomjs

// Script helper to run headless unit test (using mocha)
//
// adapted from https://github.com/Backbonist/front-tests
//
// Thanks to @filirom1

var fs        = require('fs');
var webpage   = require('webpage');

// basic options parser: https://github.com/mklabs/140-opts
function parse(a) {
  return a.map(function(c,d){return{n:c.match(/^--?(.+)/),v:a[d+1]||!0}}).reduce(function(a,b){b.n&&(a[b.n[1]]=b.v);return a},{});
}

// reg to parse out the port number from URL provided
var rport = /:[0-9]*$/;

// cli options (todo: noptify this)
var options = parse(phantom.args.slice(1));

// reporter: Spec by default. Other valid options are XUnit, dot, etc.
options.reporter = options.reporter || 'Spec';

// timeout: 6000
options.timeout = options.timeout || 6000;

// ui
options.ui = options.ui || 'bdd';

// url
var url = phantom.args[0];

if (!url) {
  console.log('Usage: headless-mocha URL [options]');
  phantom.exit(1);
}

var page = new webpage.create();
page.onConsoleMessage = function (msg) { console.log(msg); };

console.log('... Opening URL', url, '...');
page.open(url, function (status) {
  if (status !== 'success') {
    console.log('Failed to load the page. Check the url');
    return phantom.exit(1);
  }

  var test;
  // inject custom scripts to change the behaviour of phantomjs

  // add ES5 bind (and everything else)
  page.injectJs('./lib/es5-shim.js');

  // add the node.js console
  page.injectJs('./lib/console.js');

  // add a shim for the node.js process.stdout.write
  page.injectJs('./lib/process.stdout.write.js');

  // now execute run the test suite
  page.evaluate(function(options) {

    if(!window.mocha) {
      console.log('... Error loading the environment. Unable to find mocha ...');
      console.log('... Aborting ...');
      _phantom.abort = true;
      return;
    }

    // normalize reporters
    var reporters = Object.keys(mocha.reporters);

    var reporter = reporters.filter(function(reporter) {
      return reporter.toLowerCase() === options.reporter.toLowerCase();
    })[0];

    reporter = mocha.reporters[reporter];
    if(!reporter) {
      console.log('... Error:', options.reporter, 'is not a valid reporter ...');
      console.log('\nReporters\n\n  -', Object.keys(mocha.reporters).join('\n  - ') + '\n');
      console.log('... Aborting ...');
      _phantom.abort = true;
      return;
    }

    // setup mocha with the [spec reporter](http://visionmedia.github.com/mocha/#spec-reporter)
    mocha.setup({
      ui: options.ui,

      // TODO: it could be great to pass `spec` has an option in the command line.
      // <https://github.com/ariya/phantomjs/commit/81794f90960>
      reporter: reporter
    });

    // failures holder for later use
    mocha.failures =  [];

    // then run mocha
    mocha.run()

      .on('end', function(){
        // and add a flag when the test end.
        mocha.end = true;
      })

      .on('fail', function(test, err) {
        mocha.failures.push(test);
      });

  }, options);

  // to know if mocha has finished running or not.
  defer(function () {
    return page.evaluate(function () {
      // custom flag, set ~10 lines before
      return _phantom.abort || mocha.end;
    });
  }, function() {
    var failures = page.evaluate(function() {
      if(_phantom.abort) return [new Error('Error loading env')];
      return mocha.failures;
    });

    // length 0 ==> exit code 0, otherwise, exit code is the number of failures.
    phantom.exit(failures.length);
  });
});


// Utilities

function defer (test, fn) {
  var start, condition, func, interval, time, testStart;
  start = new Date().getTime();
  testStart = new Date().getTime();
  condition = false;
  func = function () {
    if (new Date().getTime() - start < options.timeout && !condition) {
      condition = test();
    } else {
      if (!condition) {
        console.log('Timeout passed before the tests finished.');
        phantom.exit();
      } else {
        clearInterval(interval);
        fn();
      }
    }
  };

  interval = setInterval(func, 100);
}

