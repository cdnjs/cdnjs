#!/usr/bin/env node

var async = require('async');
var glob = require('glob');
var fs = require('fs');
var _ = require('underscore');
var natcompare = require('./natcompare.js');
var RSS = require('rss');
var feed = new RSS({
    title:        'cdnjs.com - library updates',
    description:  'Track when libraries are added and updated! Created by <a href="http://twitter.com/ryan_kirkman">Ryan Kirkman</a> and <a href="http://twitter.com/neutralthoughts">Thomas Davis</a>, managed by <a href="https://twitter.com/PeterDaveHello">Peter Dave Hello</a>. Sponsored and hosted by <a href="http://cloudflare.com">Cloudflare</a>',
    site_url:         'http://cdnjs.com/',
    feed_url:         'http://cdnjs.com/rss.xml',
    image_url:        'http://cdnjs.com/img/poweredbycloudflare.png',
    copyright:    'Copyright © 2015 Cdnjs. All rights reserved',
    
    author: 'cdnjs team'
});
var exec=require('child_process').exec;
exec('git ls-tree -r --name-only HEAD | grep **/package.json | while read filename; do   echo "$(git log -1 --since="2 weeks ago" --name-status --format="%ad" -- $filename) blahcrap"; done',function(err,stdout,stderr){
    var recentLibraries = stdout.split('blahcrap');
    recentLibraries = _.filter(recentLibraries, function(lib){
    //console.log(lib, 'a', lib.length);
      if(lib.length > 4) {
        return true;
      };
      return false;
    });

    recentLibraries = _.map(recentLibraries, function(lib){
      lib = lib.replace('\n\n', '\n');
      lib = lib.replace('\t', '\n');
      lib = lib.substr(1);
      lib = lib.split('\n');


      lib[0] = new Date(lib[0]);
      if(lib[2]) {
        lib = {
          date: lib[0],
          change: lib[1],
          path: lib[2].replace(/(^\s+|\s+$)/g, '')
        }
      } else {
        lib = null;
      }
      return lib;
    })
    recentLibraries = _.filter(recentLibraries, function(lib){
    //console.log(lib, 'a', lib.length);
      if(lib === null) {
        return false;
      };
      return true;
    });
    recentLibraries = _.sortBy(recentLibraries, function(arrayElement) {
    //element will be each array, so we just return a date from first element in it
    return arrayElement.date.getTime();
    });
    recentLibraries = recentLibraries.reverse();
    _.each(recentLibraries, function (lib) {
      var package = JSON.parse(fs.readFileSync(lib.path, 'utf8'));
      var title = '';
      if(lib.change === 'M') {
        title = package.name + ' updated to version ' + package.version
      }
      if(lib.change === 'A') {
        title = package.name + '('+package.version+') was added'
      }
      var fileurl = 'https://cdnjs.cloudflare.com/ajax/libs/'+ package.name + '/' + package.version + '/' + package.filename;
      feed.item({
          title:          title,
          url:            package.homepage,
          guid:           package.name+package.version, 
          description:    package.description + '<br /><br />' + '<a href="'+fileurl+'">'+fileurl+'</a>',
          date:           lib.date
      });
    })
    fs.writeFileSync('../new-website/public/rss.xml', feed.xml(true), 'utf8');

})


var packages = Array();

fs.readFile('../new-website/public/packages.min.json', 'utf8', function(err, data) {
  data = JSON.parse(data);
  glob("ajax/libs/*/package.json", function (error, matches) {
    async.each(matches, function(item, callback) {
      var package = JSON.parse(fs.readFileSync(item, 'utf8'));
      delete package.main;
      delete package.scripts;
      delete package.bugs;
      delete package.npmFileMap;
      delete package.dependencies;
      delete package.devDependencies;
      if (package.npmName) {
        package.autoupdate = 'npm';
      } else if (package.autoupdate) {
        package.autoupdate = package.autoupdate.source;
      } else {
        delete package.autoupdate;
      }
      package.assets = Array();
      var oldVersions = Array();
      var pkgSave;
      data['packages'].forEach(function(pkg){
        if (pkg.name == package.name) {
          oldVersions = pkg['assets'].map(function(d){return d[['version']]});
          pkgSave = pkg;
        }
      });
      var versions = glob.sync("ajax/libs/"+package.name+"/!(package.json)/").map(function(ver){return ver.slice(0, -1);});
      async.each(versions, function(version, callback) {
        var temp = Object();
        temp.version = version.replace(/^.+\//, "");
        if (oldVersions.indexOf(temp.version) != -1) {
          for (var i = 0, size = pkgSave['assets'].length; i < size; i ++) {
            if ( pkgSave['assets'][i].version == temp.version) {
              temp.files = pkgSave['assets'][i].files;
            }
          }
        } else {
          temp.files = glob.sync(version + "/**/*", {nodir:true});
          for (var i = 0; i < temp.files.length; i++){
            var filespec = temp.files[i];
            temp.files[i] = filespec.replace(version + "/", "");
          }
        }
        package.assets.push(temp);
      }, function(err) {
        console.log(err);
      });
      package.assets.sort(function(a, b){
        return natcompare.compare(a.version, b.version);
      })
      package.assets.reverse();
      packages.push(package);
    }, function(err) {
      console.log(err);
    });
    // Initialize the feed object
    fs.writeFileSync('../cdnjs.debug.packages.json', JSON.stringify({"packages":packages}, null, 2), 'utf8');
    fs.writeFileSync('../new-website/public/packages.min.json', JSON.stringify({"packages":packages}), 'utf8');
  });
});
