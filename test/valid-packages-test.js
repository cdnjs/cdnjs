"use strict";

var assert = require("assert"),
    path = require("path"),
    fs = require("fs"),
    glob = require("glob"),
    vows = require("vows-si"),
    jsv = require("JSV").JSV.createEnvironment(),
    isThere = require("is-there");

function parse(json_file, ignore_missing, ignore_parse_fail) {
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
            assert.ok(0, json_file + " failed to parse, you can validate your json here: http://jsonlint.com/");
        }
        return null;
    }
}

function pkg_name(json_file) {
    return json_file.split("/")[3];
}

function pretty_error(err) {
    return err.message + " (" + err.details + "): " +
        err.schemaUri.split("#")[1];
}

// load up those files
var packages = glob.sync("./ajax/libs/*/").map(function (pkg) {
        return pkg + "package.json";
    }),
    schemata = glob.sync("./test/schemata/*.json").map(function (schema) {
        return jsv.createSchema(parse(schema));
    }),
    suite = vows.describe('Package structure');

packages.map(function (pkg) {
    var package_vows = {"topic": pkg},
        pname = pkg_name(pkg),
        context = {};
    package_vows[pname + " has package.json"] = function (pkg) {
        assert.ok(isThere(pkg), pkg_name(pkg) + " missing!");
    };
    package_vows[pname + " package.json is well-formed"] = function (pkg) {
        assert.ok(parse(pkg, true),
            pkg_name(pkg) + " malformed!");
    };
    package_vows[pname + " package.json is valid"] = function (pkg) {
        var pkg_obj = parse(pkg, true, true),
            valid = false,
            errors;
        if (pkg_obj === null) {
            // we already know about the problem
            return;
        }
        errors = schemata.map(function (schema) {
            var schema_errors = schema.validate(pkg_obj).errors;
            if (!schema_errors.length) {
                valid = true;
            } else {
                return {
                    name: schema._attributes.name,
                    errors: schema_errors
                };
            }
            return null;
        });
        if (!valid) {
            assert.ok(valid,
                [pkg_name(pkg) + " is not a valid cdnjs package.json format:"].concat(
                    errors
                        .filter(function (schema) {
                            return schema !== null;
                        })
                        .map(function (schema) {
                            return "\t  » " + schema.name +
                                "\n\t\t" +
                                schema.errors.map(pretty_error).join("\n\t\t");
                        })
                )
                .join("\n"));
        }
    };
    package_vows[pname + ": filename from package.json exists"] = function (pkg) {
        var json = parse(pkg, true, true);
        var filePath = "./ajax/libs/" + json.name + "/"+ json.version
            + "/" + json.filename;
        assert.ok(isThere(filePath),
                  filePath +" does not exist but is referenced in package.json!");
    };
    package_vows[pname + ": required file exist"] = function (pkg) {
      var json = parse(pkg, true, true);
      if (json.requiredFiles !== undefined) {
        for (var i in json.requiredFiles) {
          var filePath = "./ajax/libs/" + json.name + "/"+ json.version + "/" + json.requiredFiles[i];
          assert.ok(isThere(filePath), filePath +" does not exist but is required!");
        }
      }
    };
    package_vows[pname + ": name in package.json should be parent folder name"] = function (pkg) {
        var json = parse(pkg, true, true);
        var dirs = pkg.split("/");
        var trueName = dirs[dirs.length - 2];
        if (!fs.lstatSync("./ajax/libs/" + trueName).isSymbolicLink()) {
            assert.ok(trueName == json.name,
                pkg_name(pkg) + ": Name property should be '" + trueName + "', not '" + json.name +"'");
        }
    };

    package_vows[pname + ": validate type of repository/repositories"] = function (pkg) {
        var json = parse(pkg, true, true);
            assert.ok(
                (
                    (json.repositories === undefined) ||
                    (Array.isArray(json.repositories) && json.repositories.length > 1)
                ),
            "There is only one repo in " + json.name + "'s package.json, please use repository object instead of repositories array."
            );
            assert.ok(!Array.isArray(json.repository), "repository should not be an array, please use repositories instead if there are multiple repos in " + json.name + "'s package.json");
    };

     package_vows[pname + ": do not use repositories if there is only one repo"] = function (pkg) {
        var json = parse(pkg, true, true);
            assert.ok(
                (
                    (json.repositories === undefined) ||
                    (Array.isArray(json.repositories) && json.repositories.length > 1)
                ),
            "There is only one repo in " + json.name + "'s package.json, please use repository object instead of repositories array."
            );
    };   package_vows[pname + ": make sure repository field follow npm package.json format"] = function (pkg) {
        var json = parse(pkg, true, true);
            if (json.repositories === undefined && json.repository !== undefined) {
                json.repositories = [];
                json.repositories[0] = json.repository;
            }
            for (var repo in json.repositories) {
                assert.ok(
                    (
                        (json.repositories[repo].type !== undefined) &&
                        (json.repositories[repo].url  !== undefined)
                    ),
                "There repository field in " + json.name + "'s package.json should follow npm's format, must have type and url field."
                );
            }
    };

    var targetPrefixes = new RegExp("^git://.+\.git$");
    package_vows[pname + ": autoupdate block is valid (if present)"] = function (pkg) {
        var json = parse(pkg, true, true),
            fileMapPostfixes = new RegExp("\\*\\*$");
        if (json.autoupdate) {
            assert.ok(json.autoupdate.source == "git",
                pkg_name(pkg) + ": Autoupdate source should be 'git', not " + json.autoupdate.source);
            assert.ok(targetPrefixes.test(json.autoupdate.target),
                pkg_name(pkg) + ": Autoupdate target should match '" + targetPrefixes +
                "', but is " + json.autoupdate.target);
            for (var i in json.autoupdate.files) {
                assert.ok(!fileMapPostfixes.test(json.autoupdate.files[i]),
                    pkg_name(pkg) + ": fileMap should not end with ***");
            }

        } else if (json.npmFileMap) {
            assert.ok(Array.isArray(json.npmFileMap),
                pkg_name(pkg) + ": npmFileMap should be an array and include one or multiply objects to describe corresponding bash path and files");
            for (var i in json.npmFileMap) {
                for (var j in json.npmFileMap[i].files) {
                    assert.ok(!fileMapPostfixes.test(json.npmFileMap[i].files[j]),
                        pkg_name(pkg) + ": fileMap should not end with ***");
                }
            }
        }
    }
    package_vows[pname + ": should not have multiple auto-update configs"] = function(pkg) {
        var json = parse(pkg, true, true);
        assert.ok(json.autoupdate === undefined || json.npmFileMap === undefined,
            pkg_name(pkg) + ": has both git and npm auto-update config, should remove one of it");
    }
    package_vows[pname + ": should point filename field to minified file"] = function (pkg) {
        var json = parse(pkg, true, true);
        if (json.filename) {
            var path = "./ajax/libs/" + json.name + "/"+ json.version + "/",
                orig = json.filename.split("."),
                min = '';
            if (orig[orig.length - 2] !== 'min') {
                var temp = orig,
                    ext = temp.pop();
                temp.push("min");
                temp.push(ext);
                min = temp.join(".");
            }
            assert.ok(min === '' || !isThere(path + min),
                pkg_name(pkg) + ": filename field in package.json should point filename field to minified file.");
        }
    }

    package_vows[pname + ": format check"] = function (pkg) {
        var orig = fs.readFileSync(pkg, 'utf8'),
            correct = JSON.stringify(JSON.parse(orig), null, 2) + '\n',
            content = JSON.parse(correct);
        assert.ok(orig === correct,
            pkg_name(pkg) + ": package.json wrong indent, please use 2-spaces as indent, remove trailing spaces, you can use our tool: tools/fixFormat.js to fix it for you, here is an example: (Please ignore the first 2 spaces and the wildcard symbol in autoupadte config due to a bug)\n" + correct +"\n");
        if (content.author != undefined) {
            assert.ok(!Array.isArray(content.author),
                pkg_name(pkg) + ": author field in package.json should be a object or string to show its author info, if there is multiple authors info, you should use 'authors' instead, you can use our tool: tools/fixFormat.js to fix it for you.");
        }
        if (content.authors != undefined) {
            assert.ok(Array.isArray(content.authors),
                pkg_name(pkg) + ": authors field in package.json should be an array to include multiple authors info, if there is only one author, you should use 'author' instead, you can use our tool: tools/fixFormat.js to fix it for you.");
        }
        if (content.licenses != undefined) {
            assert.ok(Array.isArray(content.licenses),
                pkg_name(pkg) + ": licenses field in package.json should be an array to include multiple licenses info, if there is only one license, you should use 'license' instead, you can use our tool: tools/fixFormat.js to fix it for you.");
        }
        if (content.author != undefined) {
            assert.ok(!Array.isArray(content.author),
                pkg_name(pkg) + ": author field in package.json should be a object or string to show its author info, if there is multiple authors info, you should use 'authors' instead, you can use our tool: tools/fixFormat.js to fix it for you.");
        }
    }

    package_vows[pname + ": useless fields check"] = function (pkg) {
        var json = parse(pkg, true, true);
        var json_fix = JSON.parse(JSON.stringify(json));
        delete json_fix.eslintConfig;
        delete json_fix.styles;
        delete json_fix.install;
        delete json_fix.typescript;
        delete json_fix.browserify;
        delete json_fix.browser;
        delete json_fix.jam;
        delete json_fix.jest;
        delete json_fix.scripts;
        delete json_fix.devDependencies;
        delete json_fix.main;
        delete json_fix.peerDependencies;
        delete json_fix.contributors;
        delete json_fix.maintainers;
        delete json_fix.bugs;
        delete json_fix.issues;
        delete json_fix.files;
        delete json_fix.ignore;
        delete json_fix.engines;
        delete json_fix.engine;
        delete json_fix.directories;

        assert.ok(JSON.stringify(json) === JSON.stringify(json_fix) ,
            pkg_name(pkg) + ": we don't need eslintConfig, styles, install, typescript, browserify, browser, jam, jest, scripts, devDependencies, main, peerDependencies, contributors, bugs, issues, files, ignore, engines, engine, directories and maintainers fields in package.json");
    }
    context[pname] = package_vows;
    suite.addBatch(context);
});

suite.export(module);
