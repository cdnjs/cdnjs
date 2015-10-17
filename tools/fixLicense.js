#!/usr/bin/env node

/*
 *
 * Tool to help migrate package.json of the libs using the new format of license(s) field using SPDX license identifier
 * cc https://github.com/cdnjs/cdnjs/issues/5543, $5543
 *
 * The recognized SPDX license identifier will be in an array in tools/license-list.json
 *
 */

var fs = require("fs"),
  async = require("async"),
  colors = require('colors'),
  glob = require("glob"),
  licenses = JSON.parse(fs.readFileSync('tools/license-list.json', 'utf8'));
  packages = glob.sync("./ajax/libs/*/package.json");

function updateJSON(path, content)
{
  fs.writeFile(path, JSON.stringify(content, null, 2) + '\n', 'utf8');
  console.log(('Library - ' + content.name + ' been updated!').green);
}

function unRecognizedLicense(lib, license)
{
  console.log(('Library ' + lib + ' has un-recognized license - ' + license).yellow);
}

function adapt(licenseName)
{
  switch(licenseName) {
    case 'GPLv2':
    case 'GNU GPL v2':
      return 'GPL-2.0';
      break;
    case 'GPLv3':
    case 'GNU General Public License Version 3':
      return 'GPL-3.0';
      break;
    case 'Apache License, Version 2.0':
    case 'Apache 2.0':
    case 'Apache License, 2.0':
    case 'Apache License 2.0':
      return 'Apache-2.0';
      break;
  }
}

async.each(packages, function(item, callback) {
  var content = JSON.parse(fs.readFileSync(item, 'utf8'));
  if (content.licenses !== undefined && content.licenses.length == 1) {
    content.license = content.licenses[0];
    delete content.licenses;
    updateJSON(item, content);
  }
  if (content.license !== undefined) {
    if (content.license.type !== undefined) {
      if (licenses.indexOf(content.license.type) !== -1) {
        content.license = content.license.type;
        updateJSON(item, content);
      } else if (adapt(content.license.type)) {
        content.license = adapt(content.license.type);
        updateJSON(item, content);
      } else {
        unRecognizedLicense(content.name, content.license.type);
      }
    }
  } else if (content.licenses !== undefined) {
    var modified = false;
    for (license in content.licenses) {
      if (content.licenses[license].type !== undefined) {
        if (licenses.indexOf(content.licenses[license].type) !== -1) {
          content.licenses[license] = content.licenses[license].type;
          modified = true;
        } else {
          unRecognizedLicense(content.name, content.licenses[license].type);
        }
      }
    }
    if (modified) {
      updateJSON(item, content);
    }
  } else {
    console.log((content.name + ' does not have license field ...').red);
  }
  callback();
}, function(){
  console.log('License field fixed!'.success);
});
