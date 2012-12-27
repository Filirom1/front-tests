var path  = require('path');
var http  = require('http');
var spawn = require('child_process').spawn;
var send  = require('send');
var parse = require('url').parse;

// path to mocha script
var script = path.join(__dirname, '../lib/mocha-runner.js');

module.exports = runner;
runner.phantomjs = phantomjs;

function runner(opts, done) {
  done = done || function(err) {
    process.exit(err ? err.code : 0);
  };

  opts.argv = opts.argv || process.argv.slice(2);

  var args = [script].concat(opts.argv);

  if(opts.cwd) process.chdir(opts.cwd);

  if(opts.noserver) {
    return runner.phantomjs(args);
  }

  // parse url / port
  var url = opts.url = parse(opts.argv[0] || '');
  opts.port = opts.port || url.port || 3000;
  if (!(url.port || url.host)) {
    return done(new Error('You must provide an URL option'));
  }

  // start server

  var app = http.createServer(function(req, res){
    send(req, req.url)
      .root(process.cwd())
      .pipe(res);
  });

  // and spawn

  app.listen(opts.port, function(err) {
    if(err) throw err;
    console.log('... Server listening on %s ...', opts.port);
    runner.phantomjs(args, done);
  });

  return app;
};

function phantomjs(args, done) {
  var proc = spawn('phantomjs', args, { stdio: 'inherit', customFds: [0, 1, 2] });
  proc.on('exit', function(code) {
    if(!code) return done();
    var err = new Error('Mocha / PhantomJS ran with error (code: ' + code + ')');
    err.code = code;
    done(err);
  });
  return proc;
}
