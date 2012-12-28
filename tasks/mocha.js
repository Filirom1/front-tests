
var path   = require('path');
var spawn  = require('child_process').spawn;
var runner = require('..');

module.exports = function(grunt) {

  // Grunt task
  // ----------

  // Example:
  //
  //    grunt.initConfig({
  //      'headless-mocha': {
  //        url: 'http://localhost:3000'
  //        cwd: 'example',
  //        reporter: 'spec'
  //      }
  //    });
  //

  grunt.registerTask('headless-mocha', 'Runs the URL Mocha test suite headlessly through PhantomJS', function() {
    var options = grunt.config(this.name);
    if(!options.url) {
      grunt.log.error('You must provide an URL option');
      return false;
    }

    options.argv = options.argv || [];
    options.argv = [options.url].concat(options.argv);

    if(options.reporter) options.argv.push('--reporter', options.reporter);

    var done = this.async();
    runner(options, function(err) {
      if(err) {
        grunt.log.error(err);
        return done(false);
      }

      done();
    });
  });

};
