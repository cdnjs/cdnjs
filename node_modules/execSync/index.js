/*============================================================================
 * Copyright(c) 2010 Mario L Gutierrez <mario@mgutz.com>
 * MIT Licensed
 *==========================================================================*/

var ffi = require('ffi');

var libc = ffi.Library(null, {
  // FILE* popen(char* cmd, char* mode);
  popen: ['pointer', ['string', 'string']],

  // void pclose(FILE* fp);
  pclose: ['int', [ 'pointer']],

  // char* fgets(char* buff, int buff, in)
  fgets: ['string', ['pointer', 'int','pointer']],
});


/**
 * Executes shell `cmd` returning result code.
 *
 * @example
 *  var result = execSync.code('rm -rf tempdir');
 */
function code(cmd) {
  return exec(cmd).code;
}


/**
 * Executes shell `cmd` returning code and stdout+stderr.
 *
 * @example
 *  var results = execSync.exec('echo my_bad 1>&2; echo $USER');
 *
 * @returns Returns { code: Number, stdout: String}. If there is an
 * error executing cmd, an Error is thrown.
 */
function exec(cmd) {
  var buffer = new Buffer(32);
  var result = '';
  var fp = libc.popen('(' + cmd + ') 2>&1', 'r');
  var code;

  if (!fp) throw new Error('execSync error: '+cmd);

  while(libc.fgets(buffer, 32, fp)) {
    result += buffer.readCString();
  }
  code = libc.pclose(fp) >> 8;

  return {
    stdout: result,
    code: code
  };
}

/**
 * Executes shell `cmd` returning STDOUT.
 *
 * @example
 *  var user = execSync.stdout('echo $USER');
 *
 * @returns Returns STDOUT. If `cmd` cannot be exected
 * an `Error` is thrown.
 */
function stdout(cmd) {
  return exec(cmd).stdout;
}

module.exports = {
    code: code,
    stdout: stdout,
    exec: exec
};

