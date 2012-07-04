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
    page.injectJs('lib/bind.js');
    page.injectJs('lib/console.js');
    page.injectJs('lib/process.stdout.write.js');
    page.evaluate(function(){
      mocha.setup({
        ui: 'bdd',
        reporter: mocha.reporters.Spec
      });
      $(function(){
        mocha.run().on('end', function(){
          mocha.end = true;
        });
      });
    });
    if (status !== "success") {
      console.log("Failed to load the page. Check the url");
      phantom.exit();
    }
    test = function () {
      return page.evaluate(function () {
        return mocha.end;
      });
    };
    defer(test);
  });

}());
