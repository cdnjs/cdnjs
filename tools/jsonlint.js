#!/usr/bin/env node

var fs = require('fs');
var glob = require('glob');
var async = require('async');
var colors = require('colors');
var jsonlint = require("jsonlint");
var errorCount = 0;

var jsonfiles = glob.sync("ajax/libs/*/package.json");

console.log("Found " + jsonfiles.length + " json file(s)");

async.map(jsonfiles, function lintjson(item, cb) {
  fs.readFile(item, 'utf8', (err, data) => {
    if (err) throw err;
    try {
      jsonlint.parse(data);
    } catch(e) {
      errorCount++;
      console.log("\n" + item.yellow + " parsing failed:\n".red);
      console.log(e.toString().magenta);
    }
    cb();
  });
}, function (err, results) {
  if (err) {
    console.dir(err);
  }
  if (errorCount > 0) {
    console.log("\nYou can validate json here: https://jsonlint.com/ once you revised the file(s) with formatting problem.\n".cyan);
    process.exit(1);
  } else if (jsonfiles.length > 0) {
    console.log("\nAll json parsed without problem!\n".green);
  }
});

