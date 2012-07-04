/*global phantom:true, console:true, WebPage:true, Date:true*/
(function () {
  var url, timeout, page, defer;

  if (phantom.args.length < 1) {
    console.log("Usage: phantomjs run-mocha.js URL [timeout]");
    phantom.exit();
  }

  url = phantom.args[0];
  timeout = phantom.args[1] || 6000;

  page = new WebPage();

  defer = function (test) {
    var start, condition, func, interval, time, testStart;
    start = new Date().getTime();
    testStart = new Date().getTime();
    condition = false;
    func = function () {
      if (new Date().getTime() - start < timeout && !condition) {
        condition = test();
      } else {
        if (!condition) {
          console.log("Timeout passed before the tests finished.");
          phantom.exit();
        } else {
          clearInterval(interval);
          phantom.exit();
        }
      }
    };
    interval = setInterval(func, 100);
  };
  page.onConsoleMessage = function (msg) { console.log(msg); };
  page.open(url, function (status) {
    var test;
    // inject custom scripts to change the behaviour of phantomjs

    // add ES5 bind
    page.injectJs('lib/bind.js');

    // add the node.js console
    page.injectJs('lib/console.js');

    // add a shim for the node.js process.stdout.write
    page.injectJs('lib/process.stdout.write.js');

    // now execute phantomjs
    page.evaluate(function(){

      // setup mocha with the [spec reporter](http://visionmedia.github.com/mocha/#spec-reporter)
      mocha.setup({
        ui: 'bdd',

        // TODO: it could be great to pass `spec` has an option in the command line.
        // <https://github.com/ariya/phantomjs/commit/81794f90960>
        reporter: mocha.reporters.Spec
      });

      // wait for dom loaded
      $(function(){

        // then run mocha
        mocha.run().on('end', function(){

          // and add a flag when the test end.
          mocha.end = true;
        });
      });
    });
    if (status !== "success") {
      console.log("Failed to load the page. Check the url");
      phantom.exit();
    }

    // to know if mocha has finished running or not.
    test = function () {
      return page.evaluate(function () {

        // custom flag, set ~10 lines before
        return mocha.end;
      });
    };
    defer(test);
  });

}());
