#!/usr/bin/env node

/*
 * Create sparse-checkout config for checkout latest version of each lib.
 *
 */

var fs = require('fs'),
  async = require('async'),
  glob = require('glob'),
  colors = require('colors'),
  basePath = '/ajax/libs/',
  result = fs.readFileSync('.git/info/sparse-checkout'),
  packages = glob.sync('./ajax/libs/*/package.json');

colors.setTheme({
  success: 'green'
});

args = process.argv.slice(2);

async.each(packages, function (item, callback) {
  var content = JSON.parse(fs.readFileSync(item, 'utf8')),
  temp = '/ajax/libs/' + content.name + '/' + content.version + '/' + content.filename + '\n';
  result += temp;
  callback();
}, function () {

  fs.writeFileSync('.git/info/sparse-checkout', result, 'utf8');
  console.log('Sparse-checkout config for the latest version of libs created!'.success);
});
