var fs = require('fs');
var _ = require('underscore');
var Promise = require('bluebird');

var main = module.exports = {
    cleanDir: function(path) {
        var deferred = Promise.defer();
        
        var remove = function(file) {
            var myDeferred = Promise.defer();
            var myHandler = function(err) { if (err) { myDeferred.reject(err)} else { myDeferred.resolve(); }}
            fs.stat(file, function(err, stat) {
                if (err) {
                    myDeferred.reject(err);
                } else {
                    if (stat.isFile()) {
                        console.log("unlink " + file);
                        fs.unlink(file, myHandler);
                    } else if (stat.isDirectory()) {
                        main.cleanDir(file)
                            .then(function() {
                                console.log("rmdir " + file);
                                fs.rmdir(file, myHandler);
                            })
                            .catch(myHandler);
                    }
                }
            });
            return myDeferred.promise;
        }
        
        fs.readdir(path, function(err, files) {
            if(err) {
                deferred.reject(err);
            } else {
                var promises = [];
                _.each(files, function(file) {
                    promises.push(remove(path + "/" + file));
                });
                
                Promise.all(promises)
                    .then(function() {
                        deferred.resolve();
                    })
                    .catch(function(err) {
                        deferred.reject(err);
                    });
            }
        });
        
        return deferred.promise;
    },
    
    randomName: function(length) {
        length = length || 5;
        var text = [];
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
        for( var i=0; i < length; i++ )
            text.push(possible.charAt(Math.floor(Math.random() * possible.length)));
    
        return text.join('');
    },
    randomNum: function(d) {
        return Math.round(Math.random()*d);
    },
    
    fmt: {
        number: function(n) {
            // output large numbers with thousands separator
            var s = n.toString();
            var l = s.length;
            var a = [];
            var r = (l % 3) || 3;
            var i = 0;
            while (i < l) {
                a.push(s.substr(i,r));
                i += r;
                r = 3;
            }
            return a.join(',');
        } 
    }

};seImmediate: function(value) {
    return new Bluebird(function(resolve, reject) {
      if (global.setImmediate) {
        setImmediate(function() {
          resolve(value);
        });
      } else {
        // poorman's setImmediate - must wait at least 1ms
        setTimeout(function() {
          resolve(value);
        },1);
      }
    });

  },
  readModuleFile: function(path) {
    return moduleFile.read(path);
  },
  fetchTemplate: function(path) {
    return template.fetch(path);
  },
  inherits: inherits,
  dateToExcel: function(d) {
    return 25569 + d.getTime() / (24 * 3600 * 1000);
  },
  excelToDate: function(v) {
    return new Date((v - 25569) * 24 * 3600 * 1000);
  },
  parsePath: function(filepath) {
    var last = filepath.lastIndexOf('/');
    return {
      path: filepath.substring(0, last),
      name: filepath.substring(last + 1)
    };
  },
  getRelsPath: function(filepath) {
    var path = utils.parsePath(filepath);
    return path.path + '/_rels/' + path.name + '.rels';
  },
  xmlEncode: function(text) {
    return text.replace(/[<>&'"]/g, function (c) {
      switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '\'': return '&apos;';
        case '"': return '&quot;';
        default: return '';
      }
    });
  },
  xmlDecode: function(text) {
    return text.replace(/&([a-z]*);/, function(c) {
      switch (c) {
        case '&lt;': return '<';
        case '&gt;': return '>';
        case '&amp;': return '&';
        case '&apos;': return '\'';
        case '&quot;': return '"';
        default: return c;
      }
    });
  },
  validInt: function(value) {
    var i = parseInt(value);
    return !isNaN(i) ? i : 0;
  },

  isDateFmt: function(fmt) {
    if (!fmt) { return false; }

    // must remove all chars inside quotes and []
    fmt = fmt.replace(/[\[][^\]]*[\]]/g,'');
    fmt = fmt.replace(/"[^"]*"/g,'');
    // then check for date formatting chars
    var result = fmt.match(/[ymdhMsb]+/) !== null;
    return result;
  },

  fs: {
    exists: function(path) {
      return new Bluebird(function(resolve, reject) {

        fs.exists(path, function(exists) {
          resolve(exists);
        });
      });
    }
  },
  
  toIsoDateString: function(dt) {
    return dt.toIsoString().subsstr(0,10);
  }
};

