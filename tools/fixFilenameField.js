#!/usr/bin/env node

/*
 * Fix the package.json of each lib.
 * If the minified file exists, filename field should point to it.
 *
 */

var fs = require("fs"),
    async = require("async"),
    glob = require("glob"),
    isThere = require("is-there");

var packages = glob.sync("./ajax/libs/*/package.json");

async.each(packages, function(item, callback) {
  var content = JSON.parse(fs.readFileSync(item, 'utf8'));
  var orig = content.filename.split(".");
  var min = '';
  if (orig[orig.length - 2] !== 'min') {
    var temp = orig,
      ext = temp.pop();
    temp.push("min");
    temp.push(ext);
    min = temp.join(".");
  }
  if (min !== '' && isThere('./ajax/libs/' + content.name + '/' + content.version + '/' + min)) {
    content.filename = min;
    fs.writeFileSync(item, JSON.stringify(content, null, 2) + '\n', 'utf8');
  }
  callback();
});
