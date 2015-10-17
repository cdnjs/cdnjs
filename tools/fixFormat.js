#!/usr/bin/env node

/*
 * Fix the format and indent of package.json of each lib.
 *
 */

var fs = require("fs"),
  async = require("async"),
  glob = require("glob"),
  packages = glob.sync("./ajax/libs/*/package.json");

async.each(packages, function(item, callback) {
  var pkg = JSON.parse(fs.readFileSync(item, 'utf8'));
  delete pkg.eslintConfig;
  delete pkg.scripts;
  delete pkg.install;
  delete pkg.devDependencies;
  delete pkg.main;
  delete pkg.peerDependencies;
  delete pkg.contributors;
  delete pkg.bugs;
  delete pkg.issues;
  delete pkg.files;
  delete pkg.ignore;
  delete pkg.typescript;
  delete pkg.engines;
  delete pkg.engine;
  delete pkg.browserify;
  delete pkg.browser;
  delete pkg.jam;
  delete pkg.bugs;
  delete pkg.directories;
  delete pkg.jest;
  delete pkg.files;
  fs.writeFileSync(item, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
  callback();
});
