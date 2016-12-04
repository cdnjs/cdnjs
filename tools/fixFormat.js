#!/usr/bin/env node

var fs = require('fs'),
  async = require('async'),
  glob = require('glob'),
  GitUrlParse = require('git-url-parse'),
  _ = require('lodash'),
  packages = glob.sync('./ajax/libs/*/package.json');
  colors = require('colors'),
  licenses = JSON.parse(fs.readFileSync('tools/license-list.json', 'utf8'));
  isThere = require('is-there');

function fixFormat() {
  /*
   *
   * 1. Fix the format and indent of package.json of each lib.
   * 2. Migrate package.json of the libs using the new format of license(s) field using SPDX license identifier
   *    cc https://github.com/cdnjs/cdnjs/issues/5543, $5543
   *    The recognized SPDX license identifier will be in an array in tools/license-list.json
   * 3. Fix the package.json of each lib. If the minified file exists, filename field should point to it.
   *
   */

  async.each(packages, function(item, callback) {
    var pkg = JSON.parse(fs.readFileSync(item, 'utf8'));

    deletePackageParts(pkg);
    deleteHomepage(pkg);
    fixAuthors(pkg);
    fixLicense(pkg, item);
    setNpmBasePaths(pkg);
    filterKeywords(pkg);
    fixAutoupdate(pkg);
    fixFilenameField(pkg, item);

    const pkgJson = JSON.stringify(pkg, null, 2) + '\n';

    if (!_.isEqual(fs.readFileSync(item, 'utf8'), pkgJson)) {
      fs.writeFileSync(item, pkgJson, 'utf8');
      console.log(('Library - ' + pkg.name + ' was updated!').green);
    }

    callback();
  });

  function deletePackageParts(pkg) {
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
    delete pkg.repositories;
  }

  function deleteHomepage(pkg) {
    if ((pkg.repository != undefined) && (pkg.repository.type == 'git')) {
      if (pkg.homepage != undefined) {
        var repoUrlHttps = GitUrlParse(pkg.repository.url).toString('https');
        if (pkg.homepage == repoUrlHttps ||
            pkg.homepage == repoUrlHttps + '#readme' ||
            pkg.homepage == repoUrlHttps + '.git' ) {
          delete pkg.homepage;
        }
      }
    }
  }

  function fixAuthors(pkg) {
    if (pkg.authors != undefined) {
      if (Array.isArray(pkg.authors) && pkg.authors.length == 1) {
        pkg.author = pkg.authors[0];
        delete pkg.authors;
      } else if (!Array.isArray(pkg.authors)) {
        pkg.author = pkg.authors;
        delete pkg.authors;
      }
    };

    if ((pkg.author != undefined) && Array.isArray(pkg.author)) {
      pkg.authors = pkg.author;
      delete pkg.author;
    }
  }

  function fixLicense(pkg, item) {
    if ((pkg.licenses != undefined) && !Array.isArray(pkg.licenses)) {
      pkg.license = pkg.licenses;
      delete pkg.licenses;
    }

    if ((pkg.license != undefined) && Array.isArray(pkg.license)) {
      pkg.licenses = pkg.license;
      delete pkg.license;
    }

    if (pkg.licenses !== undefined && pkg.licenses.length == 1) {
      pkg.license = pkg.licenses[0];
      delete pkg.licenses;
    }

    if (pkg.license !== undefined) {
      if (pkg.license.type !== undefined) {
        if (licenses.indexOf(pkg.license.type) !== -1) {
          pkg.license = pkg.license.type;
        } else if (adapt(pkg.license.type)) {
          pkg.license = adapt(pkg.license.type);
        } else {
          unRecognizedLicense(pkg.name, pkg.license.type);
        }
      }
    } else if (pkg.licenses !== undefined) {
      for (license in pkg.licenses) {
        if (pkg.licenses[license].type !== undefined) {
          if (licenses.indexOf(pkg.licenses[license].type) !== -1) {
            pkg.licenses[license] = pkg.licenses[license].type;
          } else {
            unRecognizedLicense(pkg.name, pkg.licenses[license].type);
          }
        }
      }
    } else {
      console.log((pkg.name + ' does not have license field ...').red);
    }
  }

  function setNpmBasePaths(pkg) {
    if (pkg.npmFileMap) {
      for (var i in pkg.npmFileMap) {
        var npmbasePath = pkg.npmFileMap[i].basePath;
        if (npmbasePath && npmbasePath.length != 0 && ((typeof npmbasePath) == 'string')) {
          npmbasePath = (npmbasePath).replace(/^\/+|\/+$/g , '');
          pkg.npmFileMap[i].basePath = npmbasePath;
        }
      }
    }
  }

  function filterKeywords(pkg) {
    if (pkg.keywords !== undefined) {
      var mod = _.uniq(pkg.keywords);
      if (pkg.keywords.length != mod.length) {
        pkg.keywords = mod;
      }
    }
  }

  function fixAutoupdate(pkg) {
    if (pkg.autoupdate) {
      var basePath = pkg.autoupdate.basePath || ""
      if (basePath || pkg.autoupdate.files) {
        if (basePath && basePath.length !== 0) {
          basePath = basePath.replace(/^\/+|\/+$/g , "");
        }
        pkg.autoupdate.fileMap = [
          {
              basePath: basePath || "",
              files: pkg.autoupdate.files
          }
        ];
        delete pkg.autoupdate.basePath;
        delete pkg.autoupdate.files;
      }
    }
  }

  function unRecognizedLicense(lib, license) {
    console.log(('Library ' + lib + ' has un-recognized license - ' + license).yellow);
  }

  function adapt(licenseName) {
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

  function fixFilenameField(pkg, item) {
    var orig = pkg.filename.split('.');
    var min = '';
    if (orig[orig.length - 2] !== 'min') {
      var temp = orig,
          ext = temp.pop();
      temp.push('min');
      temp.push(ext);
      min = temp.join('.');
    }
    pkg.filename = pkg.filename.replace(/^\/+/g , "");
    if (min !== '' && isThere('./ajax/libs/' + pkg.name + '/' + pkg.version + '/' + min)) {
      pkg.filename = min;
    }
  };
};

// don't execute this function if we are just running tests
if (process.argv[1].indexOf('jasmine') == -1) {
  fixFormat();
}

exports.fixFormat = fixFormat;

