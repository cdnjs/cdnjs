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
  delete pkg.bin;
  delete pkg.jshintConfig;
  delete pkg.eslintConfig;
  delete pkg.maintainers;
  delete pkg.styles;
  delete pkg.requiredFiles;
  delete pkg.install;
  delete pkg.typescript;
  delete pkg.browserify;
  delete pkg.browser;
  delete pkg.jam;
  delete pkg.jest;
  delete pkg.scripts;
  delete pkg.devDependencies;
  delete pkg.main;
  delete pkg.peerDependencies;
  delete pkg.contributors;
  delete pkg.bugs;
  delete pkg.gitHEAD;
  delete pkg.gitHead;
  delete pkg.spm;
  delete pkg.dist;
  delete pkg.issues;
  delete pkg.files;
  delete pkg.ignore;
  delete pkg.engines;
  delete pkg.engine;
  delete pkg.directories;
  if ((pkg.authors != undefined) && !Array.isArray(pkg.authors)) {
    pkg.author = pkg.authors;
    delete pkg.authors;
  }
  if ((pkg.author != undefined) && Array.isArray(pkg.author)) {
    pkg.authors = pkg.author;
    delete pkg.author;
  }
  if ((pkg.licenses != undefined) && !Array.isArray(pkg.licenses)) {
    pkg.license = pkg.licenses;
    delete pkg.licenses;
  }
  if ((pkg.license != undefined) && Array.isArray(pkg.license)) {
    pkg.licenses = pkg.license;
    delete pkg.license;
  }
  fs.writeFileSync(item, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
  callback();
});
