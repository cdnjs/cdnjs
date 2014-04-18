var Hipchat = require('node-hipchat'),
    path = require("path"),
    fs = require("fs-extra"),
    glob = require("glob"),
    _ = require('lodash'),
    request = require("superagent"),
    async = require("async"),
    tarball = require('tarball-extract'),
    mkdirp = require('mkdirp');

var HC = new Hipchat(process.env.HIPCHAT);
var hipchat = {
  message: function(color, message) {
    if (process.env.HIPCHAT) {
      var params = {
        room: 165440,
        from: 'Auto Update',
        message: message,
        color: color,
        notify: 0
      };
      HC.postMessage(params, function(data) {});
    } else {
      console.log('No Hipchat API Key');
    }
  }
};

hipchat.message('gray', 'Auto Update Started');
var newVersionCount = 0;
var parse = function (json_file, ignore_missing, ignore_parse_fail) {
    var content;
    
    try {
        content = fs.readFileSync(json_file, 'utf8');
    } catch (err1) {
        if (!ignore_missing) {
            assert.ok(0, json_file + " doesn't exist!");
        }
        return null;
    }
    try {
        return JSON.parse(content);
    } catch (err2) {
        if (!ignore_parse_fail) {
            //assert.ok(0, json_file + " failed to parse");
        }
        return null;
    }
}

var reEscape = function(s){
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

/**
 * Check if an npmFileMap object contains any path which are not normalized, and thus could allow access to parent dirs
 * @param pkg
 * @returns {*}
 */
var isValidFileMap = function(pkg){
    var isValidPath = function(p){
        if(p !== null){ //don't allow parent dir access, or tricky paths
            p = p.replace(/\/+/g, '/'); //dont penalize for consequtive path seperators
            return p === path.normalize(p);
        }
        return false
    };

    if(pkg && pkg.npmFileMap){
        return _.every(pkg.npmFileMap, function(fileSpec){
           if(isValidPath(fileSpec.basePath || "/")){
               return _.every(fileSpec.files, isValidPath);
           }
           return false;
        });
    }
    return false
};

var error = function(msg, name){
    var err = new Error(msg);
    err.name = name;
    console.log(msg);
    hipchat.message('red', msg);
    return err;
}
error.PKG_NAME = 'BadPackageName'
error.FILE_PATH = 'BadFilePath'

/**
* returns a fucntion that takes N args, where each arg is a path that must not outside of libPath.
 * returns true if all paths are within libPath, else false
*/
var isAllowedPathFn = function(libPath){ //is path within the lib dir? if not, they shouldnt be writing/reading there
    libPath = path.normalize(libPath || "/");
    return function(){
        var paths = 1 <= arguments.length ? [].slice.call(arguments, 0) : [];
        var re = new RegExp("^"+reEscape(libPath));
        return _.every(paths, function(p) {
            p = path.normalize(p);
            return p.match(re);
        });
    }
};

var invalidNpmName = function(name){
    return !!~name.indexOf(".."); //doesnt contain
}

/**
 * Attempt to update the npmFileMap from extracted package.json, then using npmFileMap move required files to libPath/../
 * If the npmFileMap tries to modify files outside of libPath, dont let it!
 * @param pkg
 * @param libPath = root folder for extracted lib
 * @returns {Array} = array of security related errors triggered during operation.
 */
var processNewVersion = function(pkg, libPath){
    var isAllowedPath = isAllowedPathFn(libPath);

    var newPkg = parse(path.join(libPath, 'package.json'));
    if(isValidFileMap(newPkg)){
        pkg.npmFileMap = newPkg.npmFileMap;
    }
    var npmFileMap = pkg.npmFileMap;
    var errors = [];

    _.each(npmFileMap, function(fileSpec) {
        var basePath = fileSpec.basePath || "";

        _.each(fileSpec.files, function(file) {
            var libContentsPath = path.normalize(path.join(libPath, basePath, file));
            if(!isAllowedPath(libContentsPath)){
                errors.push(error(pkg.npmName+" contains a malicious file path: "+libContentsPath, error.FILE_PATH));
                return
            }
            var files = glob.sync(libContentsPath);

            _.each(files, function(extractFilePath) {
                if(extractFilePath.match(/(dependencies|\.zip\s*$)/i)) return;

                var replacePath = path.normalize(path.join('package', basePath));
                var actualPath = extractFilePath.replace(replacePath, "");
                if(!isAllowedPath(extractFilePath, actualPath)){
                    errors.push(error(pkg.npmName+" contains a malicious file path: "+extractFilePath+' or '+actualPath, error.FILE_PATH));
                    return;
                }
                fs.renameSync(extractFilePath, actualPath);
            });
        });
    });
    return errors;
}

/**
 * download and extract a tarball for a single npm version, get the files in npmFileMap and delete the rest
 * @param pkg
 * @param tarballUrl
 * @param version
 * @param cb
 * @returns {*}
 */
var updateLibraryVersion = function(pkg, tarballUrl, version, cb) {
    if(invalidNpmName(pkg.name)){
        return cb(error(pkg.npmName+" has a malicious package name:"+ pkg.name, error.PKG_NAME));
    }
    var libPath = path.normalize(path.join(__dirname, 'ajax', 'libs', pkg.name, version));


    if(!fs.existsSync(libPath)) {
        fs.mkdirSync(libPath);
        var url = tarballUrl;
        var downloadFile = libPath + '/dist.tar.gz';
        tarball.extractTarballDownload(url , downloadFile, libPath, {}, function(err, result) {
            fs.unlinkSync(downloadFile);
            var extractPath = path.join(libPath, 'package');
            processNewVersion(pkg, extractPath);
            fs.removeSync(extractPath);
            newVersionCount++;
            console.log("Do not have version", version, "of", pkg.npmName);
            cb()
        });
    } else {
        cb()
    }
};

/**
 * grab all versions of a lib that has an 'npmFileMap' and 'npmName' in its package.json
 * @param pkg
 * @param tarballUrl
 * @param cb
 */
var updateLibrary = function (pkg, cb) {
    if(!isValidFileMap(pkg)){
        console.log(pkg.npmName+" has a malicious npmFileMap");
        hipchat.message('red', pkg.npmName+" has a malicious npmFileMap: "+ JSON.stringify(pkg.npmFileMap));
        return cb(null);
    }
    console.log('Checking versions for ' + pkg.npmName);
    request.get('http://registry.npmjs.org/' + pkg.npmName, function(result) {
        async.eachLimit(_.pairs(result.body.versions), 5, function(p, cb){ //extract 5 at a time
            var data = p[1];
            var version = p[0];
            updateLibraryVersion(pkg, data.dist.tarball, version, cb)
        }, function(err){
            var npmVersion = result.body['dist-tags'] && result.body['dist-tags'].latest || 0;
            pkg.version = npmVersion;
            fs.writeFileSync('ajax/libs/' + pkg.name + '/package.json', JSON.stringify(pkg, null, 2), 'utf8');

            cb(null);
        });
    });
}

exports.run = function(){
    console.log('Looking for npm enabled libraries...');

    // load up those files
    var packages = glob.sync("./ajax/libs/*/package.json");
    packages = _(packages).map(function (pkg) {
        var parsedPkg = parse(pkg);
        return (parsedPkg.npmName && parsedPkg.npmFileMap) ? parsedPkg : null;
    }).compact().value();
    hipchat.message('green', 'Found ' + packages.length + ' npm enabled libraries');
    console.log('Found ' + packages.length + ' npm enabled libraries');

    async.eachSeries(packages, updateLibrary, function(err) {
      console.log('Script completed');
      hipchat.message('green', 'Auto Update Completed - ' + newVersionCount + ' versions were updated');
    });
}
exports.updateLibrary = updateLibrary;
exports.updateLibraryVersion = updateLibraryVersion;
exports.processNewVersion = processNewVersion;
exports.error = error;
exports.isAllowedPathFn = isAllowedPathFn;
exports.isValidFileMap = isValidFileMap;
exports.invalidNpmName = invalidNpmName;


var args = process.argv.slice(2);
if(args.length > 0 && args[0] == 'run'){
   exports.run()
} else {
   console.log('to start, pass the "run" arg')
}

