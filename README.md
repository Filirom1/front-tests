# An example how to test your front with mocha and phantomjs

Install phantomjs <http://phantomjs.org/>

Serve the example folder using pushState (use `serve-filirom1`)

    $ serve -P example

Run the phantomjs script:

    $ phantomjs run-mocha.js http://127.0.0.1:3000

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


## Test it in a browser

Serve the example folder using pushState (use `serve-filirom1`)

    $ serve -P example

Then inside your browser run the following command:

    > mocha.run();

## Thanks

This project is mainly inspired, copied from:
  * [node.js util sources](https://raw.github.com/joyent/node/master/lib/util.js)
  * [@jeytrapp PhantomJS Mocha Scrapper](https://gist.github.com/3041251/c861295758d8b97d7050e4e35858b3f5e1ddaae3)
  * [phantomjs injectme exemple](http://phantomjs.org/)
  * [underscore.js debounce](http://underscorejs.org/)
