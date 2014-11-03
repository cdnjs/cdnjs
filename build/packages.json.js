var glob = require('glob');
var fs = require('fs');
var _ = require('underscore');
var natcompare = require('./natcompare.js');
var RSS = require('rss');
var feed = new RSS({
    title:        'cdnjs.com - library updates',
    description:  'Track when libraries are added and updated! Managed by <a href="http://twitter.com/ryan_kirkman">Ryan Kirkman</a> and <a href="http://twitter.com/neutralthoughts">Thomas Davis</a>. Sponsored and hosted by <a href="http://cloudflare.com">Cloudflare</a>',
    site_url:         'http://cdnjs.com/',
    feed_url:         'http://cdnjs.com/rss.xml',
    image_url:        'http://cdnjs.com/img/poweredbycloudflare.png',
    copyright:    'Copyright © 2013 Cdnjs. All rights reserved',
    
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
      var fileurl = '//cdnjs.cloudflare.com/ajax/libs/'+ package.name + '/' + package.version + '/' + package.filename;
      feed.item({
          title:          title,
          url:            package.homepage,
          guid:           package.name+package.version, 
          description:    package.description + '<br /><br />' + '<a href="'+fileurl+'">'+fileurl+'</a>',
          date:           lib.date
      });
    })
    fs.writeFileSync('scratch/rss', feed.xml(true), 'utf8');

})


var packages = Array();

glob("ajax/libs/**/package.json", function (error, matches) {
  matches.forEach(function(element){
    var package = JSON.parse(fs.readFileSync(element, 'utf8'));
    package.assets = Array();
    var versions = glob.sync("ajax/libs/"+package.name+"/!(package.json)");
    versions.forEach(function(version) {
      var temp = Object();
      temp.version = version.replace(/^.+\//, "");
      temp.files = glob.sync(version + "/**/*.*");
      for (var i = 0; i < temp.files.length; i++){
        var filespec = temp.files[i];
        temp.files[i] = {
          name: filespec.replace(version + "/", ""),
          size: Math.round(fs.statSync(filespec).size / 1024)
        };
      }
      package.assets.push(temp);
    });
    package.assets.sort(function(a, b){
      return natcompare.compare(a.version, b.version);
    })
    package.assets.reverse();
    packages.push(package);
  });
  // Initialize the feed object
  fs.writeFileSync('scratch/packages.json', JSON.stringify({"packages":packages}), 'utf8');
});
