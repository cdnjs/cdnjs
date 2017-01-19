#!/usr/bin/env node

var async = require('async');
var glob = require('glob');
var fs = require('fs-extra');
var _ = require('lodash');
var natcompare = require('./natcompare.js');
var RSS = require('rss');
var isThere = require("is-there");
var feed = new RSS({
  title: 'cdnjs.com - library updates',
  description: 'Track when libraries are added and updated! Created by <a href="https://twitter.com/ryan_kirkman">Ryan Kirkman</a> and <a href="https://twitter.com/neutralthoughts">Thomas Davis</a>, managed by <a href="https://twitter.com/PeterDaveHello">Peter Dave Hello</a>. Sponsored and hosted by <a href="https://cloudflare.com">Cloudflare</a>',
  site_url: 'https://cdnjs.com/',
  feed_url: 'https://cdnjs.com/rss.xml',
  image_url: 'https://cdnjs.com/img/poweredbycloudflare.png',
  copyright: 'Copyright © 2015 Cdnjs. All rights reserved',

  author: 'cdnjs team'
});
var exec = require('child_process').exec;
var execSync = require('child_process').execSync;
var data;

exec('git log --since="2 weeks ago" --name-status --format="blahcrap %ad" -- **/package.json', function(err, stdout, stderr) {
  console.dir(err);
  var recentLibraries = stdout.split('blahcrap');
  recentLibraries = _.filter(recentLibraries, function(lib) {
    if (lib.length > 4) {
      return true;
    }
    return false;
  });

  recentLibraries = _.map(recentLibraries, function(entry) {

    var entry = entry.split('\n\n');
    if (entry.length < 2) {
      return [];
    }

    var date = new Date(entry[0]);
    var libs = entry[1].split('\n');
    if (libs.length === 0) {
      return [];
    }

    return _.map(libs, function (lib) {
      lib = lib.replace('\t', '\n');
      lib = lib.split('\n');

      var change = lib[0];
      var path = lib[1];
      if (path) {
        return {
          date: date,
          change: change,
          path: path.replace(/(^\s+|\s+$)/g, '')
        };
      }

      return null;
    });

  });

  recentLibraries = _.flatten(recentLibraries);

  recentLibraries = _.filter(recentLibraries, function(lib) {
    // console.log(lib, 'a', lib.length);
    if (lib === null) {
      return false;
    }
    if (!isThere(lib.path)) {
      return false;
    }
    return true;
  });
  recentLibraries = _.uniqBy(recentLibraries, function(arrayElement) {
    return arrayElement.path;
  });
  recentLibraries = _.sortBy(recentLibraries, function(arrayElement) {
    // element will be each array, so we just return a date from first element in it
    return arrayElement.date.getTime();
  });
  recentLibraries = recentLibraries.reverse();
  _.each(recentLibraries, function(lib) {
    var library = JSON.parse(fs.readFileSync(lib.path, 'utf8'));
    var title = '';
    if (lib.change === 'M') {
      title = library.name + ' updated to version ' + library.version;
    }
    if (lib.change === 'A') {
      title = library.name + '(' + library.version + ') was added';
    }
    var fileurl = 'https://cdnjs.cloudflare.com/ajax/libs/' + library.name +
      '/' + library.version + '/' + library.filename;
    feed.item({
      title: title,
      url: library.homepage,
      guid: library.name + library.version,
      description: library.description + '<br /><br />' + '<a href="' + fileurl +
        '">' + fileurl + '</a>',
      date: lib.date
    });
  });
  fs.writeFileSync('../new-website/public/rss.xml', feed.xml(true), 'utf8');
});

threads = null;
var packages = [];

try {
  data = JSON.parse(fs.readFileSync('../new-website/public/packages.min.json', 'utf8'));
} catch (e) {
  data = {packages: []};
}

glob("ajax/libs/*/package.json", function(error, matches) {
  async.each(matches, function(item, callback) {
    var library = JSON.parse(fs.readFileSync(item, 'utf8'));
    if (library.version === undefined) {
      console.log("Package " + library.name + " doesn't have a valid version, ignore it!");
      return;
    }
    delete library.main;
    delete library.scripts;
    delete library.bugs;
    delete library.npmFileMap;
    delete library.dependencies;
    delete library.devDependencies;
    var temp = {};
    if (library.npmName) {
      temp.type = 'npm';
      temp.target = library.npmName;
      library.autoupdate = temp;
    } else if (library.autoupdate) {
      temp.type = library.autoupdate.source;
      temp.target = library.autoupdate.target;
      library.autoupdate = temp;
    } else {
      delete library.autoupdate;
    }
    delete library.npmName;
    library.assets = [];
    var oldVersions = [];
    var pkgSave = {};
    data.packages.forEach(function(pkg) {
      if (pkg.name === library.name) {
        oldVersions = pkg.assets.map(function(d) {
          return d[['version']];
        });
        pkgSave = pkg;
      }
    });
    var versions = glob.sync("ajax/libs/" + library.name + "/!(package.json)/")
      .map(function(ver) {
        return ver.slice(0, -1);
      });
    async.each(versions, function(version, callback) {
      var temp = Object();
      var needRefresh = false;
      temp.version = version.replace(/^.+\//, "");
      var savedIndex = oldVersions.indexOf(temp.version);
      var savedSRI;
      var sriFiles;
      if (Object.keys(pkgSave).length !== 0) {
        try {
          savedSRI = JSON.parse(fs.readFileSync('../new-website/sri/' + library.name + '/' + temp.version + '.json', 'utf8'));
        } catch(e) {
          savedSRI = {};
        }
        if (savedIndex !== -1) {
          sriFiles = _.filter(pkgSave.assets[savedIndex].files, function(f) {
            switch (f.split('.').pop()) {
              case 'js':
              case 'css':
                return true;
              default:
                return false;
            }
          });
          needRefresh = sriFiles.length !== Object.keys(savedSRI).length;
          if (needRefresh) {
            console.log(library.name + ' needs SRI update');
          }
        }
      }
      if (savedIndex === -1 || needRefresh) {
        console.log('Processing ' + library.name + ' - v' + temp.version);
        var libSri = {};
        temp.files = glob.sync(version + "/**/*", {nodir: true});
        for (var i = 0; i < temp.files.length; i++) {
          var filespec = temp.files[i];
          var fileType = temp.files[i].split('.').pop();
          temp.files[i] = filespec.replace(version + "/", "");
          switch (fileType) {
            case 'js':
            case 'css':
              var genSRI = 'cat "' + filespec + '" | ' +
                'openssl dgst -sha256 -binary | ' +
                'openssl enc -base64 -A';
              var fileSRI = execSync(genSRI).toString();
              if (fileSRI !== '') {
                libSri[temp.files[i]] = 'sha256-' + fileSRI;
              }
              break;
            default:
              break;
          }
        }
        var realVer = version.split('/').pop();
        if (Object.keys(libSri).length > 0) {
          var tmpPath;
          tmpPath = '../new-website/sri/' + library.name;
          fs.mkdirpSync(tmpPath);
          fs.writeFileSync(tmpPath + '/' + realVer + '.json', JSON.stringify(libSri), 'utf8');
        }
      } else {
        for (var i = 0, size = pkgSave.assets.length; i < size; i++) {
          if (pkgSave.assets[i].version === temp.version) {
            temp.files = pkgSave.assets[i].files;
          }
        }
      }
      library.assets.push(temp);
    }, function(err) {
      console.log(err);
    });
    library.assets.sort(function(a, b) {
      return natcompare.compare(a.version, b.version);
    });
    library.assets.reverse();
    packages.push(library);
  }, function(err) {
    console.log(err);
  });
  // Initialize the feed object
  fs.writeFileSync('../cdnjs.debug.packages.json', JSON.stringify({packages: packages}, null, 2), 'utf8');
  fs.writeFileSync('../new-website/public/packages.min.json', JSON.stringify({packages: packages}), 'utf8');
});
