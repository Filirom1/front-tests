var path  = require('path');
var http  = require('http');
var spawn = require('child_process').spawn;
var send  = require('send');

// path to mocha script
var script = path.join(__dirname, '../lib/mocha-runner.js');

module.exports = runner;
runner.phantomjs = phantomjs;

function runner(opts) {
  var args = [script].concat(opts.argv || process.argv.slice(2));

  if(opts.cwd) process.chdir(opts.cwd);

  if(opts.noserver) {
    return runner.phantomjs(args);
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
    runner.phantomjs(args);
  });


  return app;
};

function phantomjs(args) {
  var proc = spawn('phantomjs', args, { stdio: 'inherit', customFds: [0, 1, 2] });
  proc.on('exit', process.exit.bind(process));
  return proc;
}
