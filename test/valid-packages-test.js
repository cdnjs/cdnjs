"use strict";

var assert = require("assert");
var fs = require("fs");
var glob = require("glob");
var vows = require("vows-si");
var jsv = require("JSV").JSV.createEnvironment();
var gitUrlParse = require("git-url-parse");
var isThere = require("is-there");

function parse(jsonFile, ignoreMissing) {
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
    assert.ok(0, jsonFile + " failed to parse, you can validate your json here: http://jsonlint.com/");
    return null;
  }
}

function pkgName(jsonFile) {
  return jsonFile.split("/")[3];
}

function prettyError(err) {
  return err.message + " (" + err.details + "): " +
        err.schemaUri.split("#")[1];
}

// load up those files
var packages = glob.sync("./ajax/libs/*/").map(function(pkg) {
  if (!fs.lstatSync(pkg.substring(0, pkg.length - 1)).isSymbolicLink()) {
    return pkg + "package.json";
  }
  return null;
}).filter(function(n) {
  return (typeof n === 'string');
});
var schemata = glob.sync("./test/schemata/*.json").map(function(schema) {
  return jsv.createSchema(parse(schema));
});
var suite = vows.describe('Package structure');

packages.map(function(pkg) {
  var packageVows = {topic: pkg};
  var pname = pkgName(pkg);
  var context = {};
  packageVows[pname + " has package.json"] = function(pkg) {
    assert.ok(isThere(pkg), pkgName(pkg) + " missing!");
  };
  packageVows[pname + " package.json is well-formed"] = function(pkg) {
    assert.ok(parse(pkg, true),
            pkgName(pkg) + " malformed!");
  };
  packageVows[pname + " package.json is valid"] = function(pkg) {
    var pkgObj = parse(pkg, true);
    var valid = true;
    var errors;
    if (pkgObj === null) {
            // we already know about the problem
      return;
    }
    errors = schemata.map(function(schema) {
      var schemaErrors = schema.validate(pkgObj).errors;
      if (schemaErrors.length) {
        return {
          name: schema._attributes.name,
          errors: schemaErrors
        };
      }
      return null;
    }).filter(Boolean);
    if (errors.length) {
      valid = false;
    }
    if (!valid) {
      assert.ok(valid,
                [pkgName(pkg) + " is not a valid cdnjs package.json format:"].concat(
                    errors
                        .filter(function(schema) {
                          return schema !== null;
                        })
                        .map(function(schema) {
                          return "\t  » " + schema.name +
                                "\n\t\t" +
                                schema.errors.map(prettyError).join("\n\t\t");
                        })
                )
                .join("\n"));
    }
  };
  packageVows[pname + ": filename from package.json exists"] = function(pkg) {
    var json = parse(pkg, true);
    if (json.version === undefined) {
      return;
    }
    var filePath = "./ajax/libs/" + json.name + "/" + json.version +
      "/" + json.filename;
    assert.ok(isThere(filePath),
                  filePath + " does not exist but is referenced in package.json!");
  };
  packageVows[pname + ": name in package.json should be parent folder name"] = function(pkg) {
    var json = parse(pkg, true);
    var dirs = pkg.split("/");
    var trueName = dirs[dirs.length - 2];
    assert.ok(trueName === json.name,
            pkgName(pkg) + ": Name property should be '" + trueName + "', not '" + json.name + "'");
  };

  packageVows[pname + ": make sure repository field follow npm package.json format"] = function(pkg) {
    var json = parse(pkg, true);
    if (json.repository) {
      assert.ok(
                 ((json.repository.type !== undefined) && (json.repository.url !== undefined)),
                "There repository field in " + json.name + "'s package.json should follow npm's format, must have type and url field."
            );
    }
  };

  packageVows[pname + ": must have auto-update config if it has no version specified"] = function(pkg) {
    var json = parse(pkg, true);
    if (json.version !== undefined) {
      return;
    }
    assert.ok((json.npmName !== undefined && json.npmFileMap !== undefined && Array.isArray(json.npmFileMap)) || (json.autoupdate !== undefined),
                   pkgName(pkg) + ": must have a valid auto-update config");
  };
  packageVows[pname + ": npmName and npmFileMap should be a pair"] = function(pkg) {
    var json = parse(pkg, true);
    if (!json.npmName && !json.npmFileMap) {
      return;
    }
    assert.ok(json.npmName !== undefined && json.npmFileMap !== undefined,
                  pkgName(pkg) + ": npmName and npmFileMap should be a pair");
  };
  var targetPrefixes = new RegExp("^git://.+.git$");
  packageVows[pname + ": autoupdate block is valid (if present)"] = function(pkg) {
    var json = parse(pkg, true);
    var fileMapPostfixes = new RegExp("\\*\\*$");
    if (json.autoupdate) {
      assert.ok(json.autoupdate.source === "git",
                pkgName(pkg) + ": Autoupdate source should be 'git', not " + json.autoupdate.source);
      assert.ok(targetPrefixes.test(json.autoupdate.target),
                pkgName(pkg) + ": Autoupdate target should match '" + targetPrefixes +
                "', but is " + json.autoupdate.target);
      for (var i in json.autoupdate.files) {
        assert.ok(!fileMapPostfixes.test(json.autoupdate.files[i]),
                    pkgName(pkg) + ": fileMap should not end with ***");
      }
    } else if (json.npmFileMap) {
      assert.ok(Array.isArray(json.npmFileMap),
                pkgName(pkg) + ": npmFileMap should be an array and include one or multiply objects to describe corresponding bash path and files");
      for (var i in json.npmFileMap) {
        for (var j in json.npmFileMap[i].files) {
          assert.ok(!fileMapPostfixes.test(json.npmFileMap[i].files[j]),
                        pkgName(pkg) + ": fileMap should not end with ***");
        }
      }
    }
  };
  packageVows[pname + ": should not have multiple auto-update configs"] = function(pkg) {
    var json = parse(pkg, true);
    assert.ok(json.autoupdate === undefined || json.npmFileMap === undefined,
            pkgName(pkg) + ": has both git and npm auto-update config, should remove one of it");
  };
  packageVows[pname + ": should point filename field to minified file"] = function(pkg) {
    var json = parse(pkg, true);
    if (json.filename) {
      var path = "./ajax/libs/" + json.name + "/" + json.version + "/";
      var orig = json.filename.split(".");
      var min = '';
      if (orig[orig.length - 2] !== 'min') {
        var temp = orig;
        var ext = temp.pop();
        temp.push("min");
        temp.push(ext);
        min = temp.join(".");
      }
      assert.ok(min === '' || !isThere(path + min),
                pkgName(pkg) + ": filename field in package.json should point filename field to minified file.");
    }
  };

  packageVows[pname + ": format check"] = function(pkg) {
    var orig = fs.readFileSync(pkg, 'utf8');
    var correct = JSON.stringify(JSON.parse(orig), null, 2) + '\n';
    var content = JSON.parse(correct);
    if (content.version === undefined) {
      return;
    }
    assert.ok(orig === correct,
            pkgName(pkg) + ": package.json wrong indent, please use 2-spaces as indent, remove trailing spaces, you can use our tool: tools/fixFormat.js to fix it for you, here is an example: (Please ignore the first 2 spaces and the wildcard symbol in autoupadte config due to a bug)\n" + correct + "\n");
    if (content.author !== undefined) {
      assert.ok(!Array.isArray(content.author),
                pkgName(pkg) + ": author field in package.json should be a object or string to show its author info, if there is multiple authors info, you should use 'authors' instead, you can use our tool: tools/fixFormat.js to fix it for you.");
    }
    if (content.authors !== undefined) {
      assert.ok(Array.isArray(content.authors) && content.authors.length > 1,
                pkgName(pkg) + ": authors field in package.json should be an array to include multiple authors info, if there is only one author, you should use 'author' instead, you can use our tool: tools/fixFormat.js to fix it for you.");
    }
    if (content.licenses !== undefined) {
      assert.ok(Array.isArray(content.licenses),
                pkgName(pkg) + ": licenses field in package.json should be an array to include multiple licenses info, if there is only one license, you should use 'license' instead, you can use our tool: tools/fixFormat.js to fix it for you.");
    }
  };

  packageVows[pname + ": useless fields check"] = function(pkg) {
    var json = parse(pkg, true);
    var jsonFix = JSON.parse(JSON.stringify(json));
    delete jsonFix.bin;
    delete jsonFix.jshintConfig;
    delete jsonFix.eslintConfig;
    delete jsonFix.requiredFiles;
    delete jsonFix.styles;
    delete jsonFix.install;
    delete jsonFix.typescript;
    delete jsonFix.browserify;
    delete jsonFix.browser;
    delete jsonFix.jam;
    delete jsonFix.jest;
    delete jsonFix.scripts;
    delete jsonFix.devDependencies;
    delete jsonFix.main;
    delete jsonFix.peerDependencies;
    delete jsonFix.contributors;
    delete jsonFix.maintainers;
    delete jsonFix.bugs;
    delete jsonFix.gitHEAD;
    delete jsonFix.gitHead;
    delete jsonFix.spm;
    delete jsonFix.dist;
    delete jsonFix.issues;
    delete jsonFix.files;
    delete jsonFix.ignore;
    delete jsonFix.engines;
    delete jsonFix.engine;
    delete jsonFix.directories;
    delete jsonFix.repositories;

    assert.ok(JSON.stringify(json) === JSON.stringify(jsonFix),
            pkgName(pkg) + ": we don't need bin, jshintConfig, eslintConfig, styles, install, typescript, browserify, browser, jam, jest, scripts, devDependencies, main, peerDependencies, contributors, bugs, gitHEAD, issues, files, ignore, engines, engine, directories, repositories and maintainers fields in package.json");
  };
  packageVows[pname + ": There must be repository information when using auto-update config"] = function(pkg) {
    var json = parse(pkg, true);
    assert.ok(
            (
                (json.repository !== undefined) ||
                (json.autoupdate === undefined && json.npmFileMap === undefined)
            ),
            pkgName(pkg) + ": Need to add repository information in package.json");
  };
  packageVows[pname + ": Homepage doesn't need to be set if it's the same as repository"] = function(pkg) {
    var json = parse(pkg, true);
    if ((json.repository !== undefined) && (json.repository.type === 'git') && (json.homepage !== undefined)) {
      var repoUrlHttps = gitUrlParse(json.repository.url).toString("https");
      assert.ok(
                (
                    (json.homepage !== repoUrlHttps) &&
                    (json.homepage !== repoUrlHttps + '#readme') &&
                    (json.homepage !== repoUrlHttps + '.git')
                ),
                pkgName(pkg) + ": Maybe you'll like to use its GitHub page or GitLab page as its homepage?");
    }
  };
  packageVows[pname + ": There must be \"String\" type basePath in auto-update config"] = function(pkg) {
    var json = parse(pkg, true);
    if (json.npmFileMap) {
      for (var i in json.npmFileMap) {
        assert.ok(json.npmFileMap[i].basePath != undefined && ((typeof json.npmFileMap[i].basePath) == "string"),
                  pkgName(pkg) + ": Need to add \"String\" type basePath in auto-update config");
      }
    } else if (json.autoupdate) {
        var autoupdate = json.autoupdate;
        if (autoupdate.fileMap) {
            assert.ok(autoupdate.basePath === undefined, "The autoupadte.basePath should appear inside of fileMap only.");
            assert.ok(Array.isArray(autoupdate.fileMap) === true, "The fileMap should be an array.");
            autoupdate.fileMap.forEach(function (c) {
                assert.ok(c && typeof c.basePath === "string", "The basePath should be a string.");
                assert.ok(Array.isArray(c.files), "The files field should be an array.");
                c.files.forEach(function (cFile) {
                    assert.ok(cFile && typeof cFile === "string", "The file items should be a non-empty strings.");
                });
            });
        } else {
            assert.ok(json.autoupdate.basePath != undefined && ((typeof json.autoupdate.basePath) == "string"),
                      pkgName(pkg) + ": Need to add \"String\" type basePath in auto-update config or a fileMap \"Array\"");
        }
    }
  }
  packageVows[pname + ": There should not be leading slash (\"/\") in filename "] = function(pkg) {
    var json = parse(pkg, true);
    assert.ok(json.filename[0] != '/',
       pkgName(pkg) + ": Need to remove leading/trailing slash (\"/\") in filename in package.json");
  }
  packageVows[pname + ": There should not be leading or trailing slash (\"/\") in basePath "] = function(pkg) {
    var json = parse(pkg, true);
    if (json.npmFileMap) {
      for (var i in json.npmFileMap) {
        if (json.npmFileMap[i].basePath) {
          var basePath = json.npmFileMap[i].basePath;
          assert.ok(
             (
                 (basePath.length == 0) ||
                 (basePath[0] != '/' && basePath[basePath.length-1] != '/')
             ),
             pkgName(pkg) + ": Need to remove leading/trailing slash (\"/\") in basePath in package.json");
        }
      }
    } else if (json.autoupdate) {
        if (json.autoupdate.basePath) {
          var basePath = json.autoupdate.basePath;
            assert.ok(
                (
                    (basePath.length == 0) ||
                    (basePath[0] != '/' && basePath[basePath.length-1] != '/')
                ),
                pkgName(pkg) + ": Need to remove \"/\" at the front or the last of basePath in package.json");
        }
      }
  };
  packageVows[pname + ": There must be array datatype files in auto-update config"] = function(pkg) {
    var json = parse(pkg, true);
    if (json.npmFileMap) {
      for (var i in json.npmFileMap) {
        assert.ok(Array.isArray(json.npmFileMap[i].files),
                  pkgName(pkg) + ": files in auto-update config file map need to be an array");
      }
    } else if (json.autoupdate) {
        assert.ok(json.autoupdate.files === undefined,
                  pkgName(pkg) + ": files in auto-update config file is deprecated.");
      }
  };

  packageVows[pname + ": keys with leading underscore should be removed"] = function(pkg) {
    var json = parse(pkg, true);

    for (var key in json) {
      assert.ok(key[0] !== '_',
                pkgName(pkg) + ": keys with leading underscore in package.json need to be removed");
    }
  };

  context[pname] = packageVows;
  suite.addBatch(context);
  return null;
});

suite.export(module);
