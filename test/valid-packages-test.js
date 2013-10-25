"use strict";

var assert = require("assert"),
    path = require("path"),
    fs = require("fs"),
    glob = require("glob"),
    vows = require("vows-si"),
    jsv = require("JSV").JSV.createEnvironment();

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
            assert.ok(0, json_file + " failed to parse");
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
        assert.ok(fs.existsSync(pkg), pkg_name(pkg) + " missing!");
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
                [pkg_name(pkg) + " didn't parse as any known format:"].concat(
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
        assert.ok(fs.existsSync(filePath),
                  filePath +" does not exist but is referenced in package.json!");
    };
    package_vows[pname + ": name in package.json should be parent folder name"] = function (pkg) {
        var json = parse(pkg, true, true);
        var dirs = pkg.split("/");
        var trueName = dirs[dirs.length - 2];
        assert.ok(trueName == json.name,
            pkg_name(pkg) + ": Name property should be '" + trueName + "', not '" + json.name +"'");
    };

    context[pname] = package_vows;
    suite.addBatch(context);
});

suite.export(module);

