#!/usr/bin/env node

/*
 * Update the descption info of libs from their GitHub repo
 *
 */

var fs = require("fs"),
    async = require("async"),
    glob = require("glob"),
    GitUrlParse = require("git-url-parse"),
    request = require("superagent");

var packages = glob.sync("./ajax/libs/*/package.json");

async.each(packages, function(lib, callback) {
  var pkg = JSON.parse(fs.readFileSync(lib, 'utf8'));
  if (pkg.repository != undefined) {
    var target = GitUrlParse(pkg.repository.url).toString("https")
  } else if (pkg.repositories != undefined && typeof pkg.repositories == array) {
    var target = GitUrlParse(pkg.repositories[0].url).toString("https");
  }
  if (target) {
    console.log('Fetching info of ' + pkg.name);
    request.get(target.replace(/.git$/, '') + '/raw/master/package.json').end(function(error, result) {
      if (error && result != undefined) {
        console.dir('error on ' + pkg.name + ' ' + target);
      } else if (result && result.status / 100 == 2 && result.text != undefined) {
        var newPkg;
        try {
          newPkg = JSON.parse(result.text);
          console.log( pkg.name + '\'s package.json downloaded');
          if (newPkg.description) {
            console.log(pkg.name + ' description found!');
            pkg.description = newPkg.description;
            fs.writeFileSync(lib, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
          }
        } catch (e) {
          return console.error(e);
        }
      } else {
        console.log('error on ' + pkg.name);
      }
    });
  }
  callback();
});
