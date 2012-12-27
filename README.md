# An example on how to test your front with mocha and phantomjs

Install phantomjs <http://phantomjs.org/>

Run the phantomjs script:

    $ cd example
    $ ../bin/headless-mocha http://127.0.0.1:3000

It will print this following output:

    Array
      #push()
        ✓ should append a value

        ✓ should return the length


    Array
      #pop()
        ✓ should remove and return the last value

        ✓ should adjust .length


    Test web
      ✓ should print `Hey guy` when clicking on link toto



    ✔ 5 tests complete (650ms)


## Options

The script is a facade and wrapper to mocha runner. The HTML test suite is not
scrapped to get back the results, Mocha runner is invoked directly within the
PhantomJS instance, allowing you to specify options like reporter (not all but
most of mocha reporters are supported)


      $ headless-mocha --help
      Usage: headless-mocha URL [options]

      This script is a wrapper on top of Filirom1s front-tests
      PhantomJS runner for mocha.

      > https://github.com/Backbonist/front-tests

      In addition, this wrapper is able to start a static http server prior
      to the PhantomJS / Mocha test suite. The URL is then used by PhantomJS
      to open a new webpage, Mocha then runs the test suite and reports results
      based on the --reporter

      Options:
       - help       show this help message
       - reporter   mocha reporter to use (one of: doc, spec, dot, min, ...)
       - noserver   prevent the built-in http server from starting
       - port       specify the port of the built-in http server [3000]

## Integration

This package exposes a `bin` you can decide to install globally, but it's not recommended.

The best way to integrate the runner in your workflow is to add it as a `test`
step within your build tool. This build tool can then use the internal binary
linked by npm in `node_modules/.bin/headless-mocha` to not rely on global installs.

### Using Make

See `tasks/mocha.mk`.

Include this file into your project Makefile to get any targets defined below.


    include node_modules/front-tests/tasks/*.mk

Configure below options prior to the include to match your setup. Example:

```make
# Location of the test directory and files to watch
TEST_DIR   ?= test
TEST_FILES ?= $(shell find $(TEST_DIR) -name '*.js' -o -name '*.html')

# The URL to load
MOCHA_TEST_URL ?= http://localhost:3000

# HEADLESS_MOCHA_FLAGS = --noserver
HEADLESS_MOCHA_FLAGS ?=

# Path to the xUnit XML report for mocha test suite
MOCHA_REPORT ?= reports/mocha.xml

# The reporter to use with `mocha` target
MOCHA_REPORTER ?= spec
```

Any option above can be left out, these values are the default ones.

### Setup your test suite

Test suite are not different from standard HTML test suite. If your test suite
  is running properly in your browser, then it should work properly using this
headless runner.

Serve the example folder using pushState (use `serve-filirom1`)

## Thanks

This project is mainly inspired, copied from:
  * [node.js util sources](https://raw.github.com/joyent/node/master/lib/util.js)
  * [@jeytrapp PhantomJS Mocha Scrapper](https://gist.github.com/3041251/c861295758d8b97d7050e4e35858b3f5e1ddaae3)
  * [phantomjs injectme example](http://phantomjs.org/)
  * [underscore.js debounce](http://underscorejs.org/)
