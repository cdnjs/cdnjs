#!/usr/bin/env node

var path = require('path');
var assert = require('assert');
var fs = require('fs-extra');
var glob = require('glob');
var _ = require('lodash');
var request = require('superagent');
var async = require('async');
var tarball = require('tarball-extract');
var chmodr = require('chmodr');
var colors = require('colors');
var isThere = require('is-there');
var stable = require('semver-stable');
var semver = require('semver');
var tempDirPath;
var args;

if (process.env.BOT_CDNJS_NPM_TEMP === undefined) {
  throw 'BOT_CDNJS_NPM_TEMP is missing';
}
tempDirPath = process.env.BOT_CDNJS_NPM_TEMP;

colors.setTheme({
  prompt: 'cyan',
  info: 'grey',
  success: 'green',
  warn: 'yellow',
  error: 'red'
});

var newVersionCount = 0;
var parse = function (jsonFile, ignoreMissing, ignoreParseFail) {
  var content;

  try {
    content = fs.readFileSync(jsonFile, 'utf8');
  } catch (err1) {
    if (!ignoreMissing) {
      assert.ok(0, jsonFile + " doesn't exist!");
    }

    return null;
  }

  try {
    return JSON.parse(content);
  } catch (err2) {
    if (!ignoreParseFail) {
      // assert.ok(0, jsonFile + " failed to parse");
    }

    return null;
  }
};

var reEscape = function (s) {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

/**
 * Check if an npmFileMap object contains any path which are not normalized, and thus could allow access to parent dirs
 * @param pkg
 * @returns {*}
 */
var isValidFileMap = function (pkg) {
  var isValidPath = function (p) {
    if (p !== null) { // don't allow parent dir access, or tricky paths
      p = p.replace(/\/+/g, '/'); // don't penalize for consequtive path seperators
      return p === path.normalize(p);
    }

    return false;
  };

  if (pkg && pkg.npmFileMap) {
    return _.every(pkg.npmFileMap, function (fileSpec) {
      if (isValidPath(fileSpec.basePath || '/')) {
        return _.every(fileSpec.files, isValidPath);
      }

      return false;
    });
  }

  return false;
};

var error = function (msg, name) {
  var err = new Error(msg);
  err.name = name;
  console.log(msg.error);
  return err;
};

error.PKG_NAME = 'BadPackageName';
error.FILE_PATH = 'BadFilePath';

/**
 * returns a fucntion that takes N args, where each arg is a path that must not outside of libPath.
 * returns true if all paths are within libPath, else false
 */
var isAllowedPathFn = function (libPath) { // is path within the lib dir? if not, they shouldnt be writing/reading there
  libPath = path.normalize(libPath || '/');
  return function () {
    var paths = arguments.length >= 1 ? [].slice.call(arguments, 0) : [];
    var re = new RegExp('^' + reEscape(libPath));
    return _.every(paths, function (p) {
      p = path.normalize(p);
      return p.match(re);
    });
  };
};

var invalidNpmName = function (name) {
  return (name.indexOf('..') !== -1); // doesnt contain
};

var getPackagePath = function (pkg, version) {
  return path.normalize(path.join(__dirname, 'ajax', 'libs', pkg.name, version));
};

var getPackageTempPath = function (pkg, version) {
  return path.normalize(path.join(tempDirPath, pkg.name, version));
};

/**
 * Attempt to update the npmFileMap from extracted package.json, then using npmFileMap move required files to libPath/../
 * If the npmFileMap tries to modify files outside of libPath, dont let it!
 * @param pkg
 * @param libPath = root folder for extracted lib
 * @returns {Array} = array of security related errors triggered during operation.
 */
var processNewVersion = function (pkg, version) {
  // sometimes the tar is extracted to a dir that isnt called 'package' - get that dir via glob
  var extractLibPath = glob.sync(getPackageTempPath(pkg, version) + '/*/')[0];

  if (!extractLibPath) {
    // even more rarely, the tar doesnt seem to get extracted at all.. which is probably a bug in that lib.
    var msg = pkg.npmName + '@' + version +
      ' - never got extracted! This problem usually goes away on next run.' +
      ' Couldnt find extract dir here: ' + getPackageTempPath(pkg, version);
    console.log(msg.error);
    return;
  }

  // trick to handle wrong permission lib like clipboard.js@0.0.7
  fs.chmodSync(extractLibPath, 0755);
  chmodr.sync(extractLibPath, 0755);

  var libPath = getPackagePath(pkg, version);
  var isAllowedPath = isAllowedPathFn(extractLibPath);
  var newPath = path.join(libPath, 'package.json');
  if (fs.existsSync(newPath)) { // turn this off for now
    var newPkg = parse(newPath);
    if (isValidFileMap(newPkg)) {
      pkg.npmFileMap = newPkg.npmFileMap;
    }
  }

  var npmFileMap = pkg.npmFileMap;
  var errors = [];
  var updated = false;
  _.each(npmFileMap, function (fileSpec) {
    var basePath = fileSpec.basePath || '';
    if (fileSpec.files.length === 0) {
      fs.mkdirsSync(libPath);
      return;
    }
    _.each(fileSpec.files, function (file) {
      var libContentsPath = path.normalize(path.join(extractLibPath, basePath));
      if (!isAllowedPath(libContentsPath)) {
        errors.push(error(pkg.npmName + ' contains a malicious file path: ' +
          libContentsPath, error.FILE_PATH));
        return;
      }

      var files = glob.sync(path.join(libContentsPath, file), { nodir: true });
      if (files.length === 0) {
        // usually old versions have this problem
        var msg;
        msg = (pkg.npmName + '@' + version + ' - couldnt find file in npmFileMap.') +
          (' Doesnt exist: ' + path.join(libContentsPath, file)).info;
        fs.mkdirsSync(libPath);
        console.log(msg);
      }

      _.each(files, function (extractFilePath) {
        if (extractFilePath.match(/(\.zip\s*$)/i)) {
          return;
        }

        var copyPart = path.relative(libContentsPath, extractFilePath);
        var copyPath = path.join(libPath, copyPart);
        if (fs.statSync(extractFilePath).size !== 0){
          // don't copy the empty file from the source
          fs.mkdirsSync(path.dirname(copyPath));
          fs.copySync(extractFilePath, copyPath);
          fs.chmodSync(copyPath, '0644');
        } else {
          console.log('Warning! '.warn + copyPart.gray + ' is empty, file will not be copied!');
        }
        updated = true;
      });
    });
  });

  if (updated) {
    newVersionCount++;
    var libPatha = path.normalize(path.join(__dirname, 'ajax', 'libs', pkg.name, 'package.json'));
    console.log('------------'.red, libPatha.green);
    if (
      (!pkg.version) ||
      (
        semver.gt(version, pkg.version) &&
        (
          stable.is(version) ||
          (!stable.is(version) && !stable.is(pkg.version))
        )
      )
    ) {
      pkg.version = version;
      fs.writeFileSync(libPatha, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
    }
  }

  return errors;
};

/**
 * download and extract a tarball for a single npm version, get the files in npmFileMap and delete the rest
 * @param pkg
 * @param tarballUrl
 * @param version
 * @param cb
 * @returns {*}
 */
var updateLibraryVersion = function (pkg, tarballUrl, version, cb) {
  if (invalidNpmName(pkg.name)) {
    return cb(error(pkg.npmName + ' has a malicious package name:' + pkg.name, error.PKG_NAME));
  }

  var extractLibPath = getPackageTempPath(pkg, version);
  var libPath = getPackagePath(pkg, version);

  if (fs.existsSync(libPath)) {
    cb();
  } else {
    fs.mkdirsSync(extractLibPath);
    var url = tarballUrl;
    var msg;
    var downloadFile = path.join(extractLibPath, 'dist.tar.gz');
    tarball.extractTarballDownload(url, downloadFile, extractLibPath, {}, function (err, result) {
      if (!err && fs.existsSync(downloadFile)) {
        msg = 'Found version ' + version + ' of ' +
          pkg.npmName + ', now try to import it.';
        console.log(msg.warn);
        processNewVersion(pkg, version);
      } else if (result.error === 'Server respond 404') {
        msg = 'Got 404 on version ' + version + ' of ' + pkg.npmName +
          ', create an empty folder for it.';
        fs.mkdirsSync('./ajax/libs/' + pkg.name + '/' + version);
        console.log(msg.warn);
      } else {
        msg = 'error downloading ' + version + ' of ' + pkg.npmName +
          ' it didnt exist: ' + result.error;
        console.log(msg.error);
      }

      cb();
    });
  }
};

/**
 * grab all versions of a lib that has an 'npmFileMap' and 'npmName' in its package.json
 * @param pkg
 * @param tarballUrl
 * @param cb
 */
var updateLibrary = function (pkg, cb) {
  var msg;
  if (!isValidFileMap(pkg)) {
    msg = pkg.npmName.error + ' has a malicious npmFileMap';
    console.log(msg.warn);
    return cb(null);
  }

  // if the package has a .do_not_update file we ignore the update process for
  // it and move on.
  if (fs.existsSync("./ajax/libs/" + pkg.name + "/.do_not_update")) {
    console.log('package has .do_not_update; ignore');
    return cb(null)
  }

  msg = 'Checking versions for ' + pkg.npmName;
  if (pkg.name !== pkg.npmName) {
    msg += ' (' + pkg.name + ')';
  }

  console.log(msg.prompt);
  var npmNameScopeReg = /^@.+\/.+$/;
  var scopedPackage = false;
  if (npmNameScopeReg.test(pkg.npmName)) {
    scopedPackage = pkg.npmName;
    pkg.npmName = pkg.npmName.replace('/', '%2f');
  }

  request.get('https://registry.npmjs.org/' + pkg.npmName).end(function (error, result) {
    if (scopedPackage !== false) {
      pkg.npmName = scopedPackage;
    }
    if (result !== undefined && result.body !== undefined) {
      async.each(_.toPairs(result.body.versions), function (p, cb) {
        var data = p[1];
        var version = p[0];
        updateLibraryVersion(pkg, data.dist.tarball, version, cb);
      }, function (err) {

        var msg = 'Library "' + pkg.name + '" update finished' +
          (err ? ' ' + err.error : '');
        console.log(msg);
        cb(null);
      });
    } else {
      console.log(('Got error on ' + pkg.name + ' ! Error: ' + error).error);
    }
  });
};

exports.run = function () {
  fs.removeSync(path.join(tempDirPath));
  fs.mkdirsSync(tempDirPath);

  console.log('Looking for npm enabled libraries...');

  // load up those files
  var packages;
  var globPattern = '*';
  if (args.length === 2) {
    globPattern = args[1];
  }

  packages = glob.sync('./ajax/libs/' + globPattern + '/package.json');
  packages = _(packages).map(function (pkg) {
    var parsedPkg = parse(pkg);
    return (parsedPkg.npmName && parsedPkg.npmFileMap) ? parsedPkg : null;
  }).compact().value();
  var msg = 'Found ' + packages.length + ' npm enabled libraries';
  console.log(msg.prompt);

  async.each(packages, updateLibrary, function (err) {
    var msg = 'Auto Update Completed - ' + newVersionCount +
      ' versions were updated';
    console.log(msg.prompt);
    if (err) {
      console.dir(err);
    }
  });
};

exports.updateLibrary = updateLibrary;
exports.updateLibraryVersion = updateLibraryVersion;
exports.processNewVersion = processNewVersion;
exports.error = error;
exports.isAllowedPathFn = isAllowedPathFn;
exports.isValidFileMap = isValidFileMap;
exports.invalidNpmName = invalidNpmName;

args = process.argv.slice(2);
if (args.length > 0 && args[0] === 'run') {
  exports.run();
} else {
  console.log('to start "npm auto-update", pass the "run" arg'.prompt);
}

process.on('uncaughtException', (err) => {
  console.log(err);
});
