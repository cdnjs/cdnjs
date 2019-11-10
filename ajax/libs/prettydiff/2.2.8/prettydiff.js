/*prettydiff.com topcoms: true, insize: 4, inchar: " ", vertical: true */
/*jshint laxbreak: true*/
/*global __dirname, ace, console, define, global, module, options, performance, process, require */
/*

 Execute in a NodeJS app:

    var prettydiff = require("prettydiff"),
        args       = {
            source: "asdf",
            diff  : "asdd",
            lang  : "text"
        },
        output     = prettydiff(args);

 Execute on command line with NodeJS:

    node api/node-local.js source:"c:\mydirectory\myfile.js" readmethod:"file" diff:"c:\myotherfile.js"

 Execute from JavaScript:
    var global = {},
        args   = {
            source: "asdf",
            diff  : "asdd",
            lang  : "text"
        },
        output = prettydiff(args);

 Manage with biddle
     biddle install http://prettydiff.com/downloads/prettydiff/prettydiff_latest.zip
     biddle global prettydiff
     prettydiff source:"c:\mydirectory\myfile.js" readmethod:"file" diff:"c:\myotherfile.js"

 Please see the license.txt file associated with the Pretty Diff
 application for license information.

 Special thanks to:

 * Harry Whitfield for the numerous test cases provided against
 JSPretty.  http://g6auc.me.uk/

 * Andreas Greuel for contributing samples to test diffview.js
 https://plus.google.com/105958105635636993368/posts

 */
(function prettydiff_init() {
    "use strict";
    var prettydiff = function prettydiff_(api) {
        var startTime = Date.now(),
            core      = function core_(api) {
                var spacetest    = (/^\s+$/g),
                    apioutput    = "",
                    apidiffout   = "",
                    metaerror    = "",
                    finalFile    = global.prettydiff.finalFile,
                    options      = global
                        .prettydiff
                        .options
                        .functions
                        .validate(api),
                    jspretty     = function core__jspretty() {
                        var jsout = global
                            .prettydiff
                            .jspretty(options);
                        if (options.nodeasync === true) {
                            metaerror = jsout[1];
                            return jsout[0];
                        }
                        metaerror = global.prettydiff.meta.error;
                        return jsout;
                    },
                    markuppretty = function core__markuppretty() {
                        var markout = global
                            .prettydiff
                            .markuppretty(options);
                        if (options.nodeasync === true) {
                            metaerror = markout[1];
                            if (options.mode === "beautify" && options.inchar !== "\t") {
                                markout[0] = markout[0].replace(/\r?\n[\t]*\u0020\/>/g, "");
                            } else if (options.mode === "diff") {
                                markout[0] = markout[0].replace(/\r?\n[\t]*\u0020\/>/g, "");
                            }
                            return markout[0];
                        }
                        metaerror = global.prettydiff.meta.error;
                        if (options.mode === "beautify" && options.inchar !== "\t") {
                            markout = markout.replace(/\r?\n[\t]*\u0020\/>/g, "");
                        } else if (options.mode === "diff") {
                            markout = markout.replace(/\r?\n[\t]*\u0020\/>/g, "");
                        }
                        return markout;
                    },
                    csspretty    = function core__markupcss() {
                        var cssout = global
                            .prettydiff
                            .csspretty(options);
                        if (options.nodeasync === true) {
                            metaerror = cssout[1];
                            return cssout[0];
                        }
                        metaerror = global.prettydiff.meta.error;
                        return cssout;
                    },
                    proctime     = function core__proctime() {
                        var minuteString = "",
                            hourString   = "",
                            minutes      = 0,
                            hours        = 0,
                            elapsed      = (Date.now() - startTime) / 1000,
                            secondString = elapsed + "",
                            plural       = function core__proctime_plural(x, y) {
                                var a = x + y;
                                if (x !== 1) {
                                    a = a + "s";
                                }
                                if (y !== " second") {
                                    a = a + " ";
                                }
                                return a;
                            },
                            minute       = function core__proctime_minute() {
                                minutes      = parseInt((elapsed / 60), 10);
                                minuteString = plural(minutes, " minute");
                                minutes      = elapsed - (minutes * 60);
                                secondString = (minutes === 1)
                                    ? "1 second"
                                    : minutes.toFixed(3) + " seconds";
                            };
                        if (elapsed >= 60 && elapsed < 3600) {
                            minute();
                        } else if (elapsed >= 3600) {
                            hours      = parseInt((elapsed / 3600), 10);
                            hourString = hours.toString();
                            elapsed    = elapsed - (hours * 3600);
                            hourString = plural(hours, " hour");
                            minute();
                        } else {
                            secondString = plural(secondString, " second");
                        }
                        return hourString + minuteString + secondString;
                    },
                    output       = function core__output(finalProduct, difftotal, difflines) {
                        var meta         = {
                                difflines: 0,
                                difftotal: 0,
                                error    : "",
                                insize   : 0,
                                lang     : [
                                    "", "", ""
                                ],
                                outsize  : 0,
                                time     : ""
                            };
                        meta.lang   = options.autoval;
                        meta.time   = proctime();
                        meta.insize = (options.mode === "diff")
                            ? options.source.length + options.diff.length
                            : options.source.length;
                        if (options.mode === "parse" && options.lang !== "text" && typeof finalProduct === "object" && (options.autoval[0] !== "" || options.lang !== "auto")) {
                            if (options.parseFormat === "sequential" || options.parseFormat === "htmltable") {
                                meta.outsize = finalProduct.data.length;
                            } else {
                                meta.outsize = finalProduct.data.token.length;
                            }
                        } else {
                            meta.outsize = finalProduct.length;
                        }
                        if (options.autoval[0] === "text" && options.mode !== "diff") {
                            if (options.autoval[2] === "unknown") {
                                meta.error = "Language is set to auto, but could not be detected. File not parsed.";
                            } else {
                                meta.error = "Language is set to text, but plain text is only supported in diff mode. File n" +
                                        "ot parsed.";
                            }
                        }
                        if (difftotal !== undefined) {
                            meta.difftotal = difftotal;
                        }
                        if (difflines !== undefined) {
                            meta.difflines = difflines;
                        }
                        meta.error = metaerror;
                        if (options.nodeasync === true) {
                            return [finalProduct, meta];
                        }
                        global.prettydiff.meta = meta;
                        return finalProduct;
                    };
                if (options.source === "" && (options.mode === "beautify" || options.mode === "minify" || options.mode === "analysis" || (options.mode === "diff" && options.diffcli === false) || (options.mode === "parse" && options.parseFormat === "htmltable"))) {
                    metaerror = "options.source is empty!";
                    console.log(metaerror);
                    return output("", 0, 0);
                }
                if (options.mode === "diff" && options.diffcli === false) {
                    if (options.diff === "") {
                        metaerror = "options.mode is 'diff' and options.diff is empty!";
                        console.log(metaerror);
                        return output("", 0, 0);
                    }
                    if (options.lang === "csv") {
                        options.lang = "text";
                    }
                }
                if (options.autoval[0] === "text" && options.mode !== "diff") {
                    metaerror = "Language is either text or undetermined, but text is only allowed for the 'dif" +
                            "f' mode!";
                    return output(options.source, 0, 0);
                }
                finalFile.order[7] = options.color;
                if (options.mode === "diff") {
                    options.vertical = false;
                    options.jsscope  = "none";
                    options.preserve = 0;
                    if (options.diffcomments === false) {
                        options.comments = "nocomment";
                    }
                    if (options.lang === "css") {
                        apioutput      = csspretty();
                        options.source = options.diff;
                        apidiffout     = csspretty();
                    } else if (options.lang === "csv") {
                        apioutput  = global
                            .prettydiff
                            .csvpretty(options);
                        apidiffout = global
                            .prettydiff
                            .csvpretty(options);
                    } else if (options.lang === "markup") {
                        apioutput      = markuppretty();
                        options.source = options.diff;
                        apidiffout     = markuppretty();
                    } else if (options.lang === "text") {
                        apioutput  = options.source;
                        apidiffout = options.diff;
                    } else {
                        apioutput      = jspretty();
                        options.source = options.diff;
                        apidiffout     = jspretty();
                    }
                    if (options.quote === true) {
                        apioutput  = apioutput.replace(/'/g, "\"");
                        apidiffout = apidiffout.replace(/'/g, "\"");
                    }
                    if (options.semicolon === true) {
                        apioutput  = apioutput
                            .replace(/;\r\n/g, "\r\n")
                            .replace(/;\n/g, "\n");
                        apidiffout = apidiffout
                            .replace(/;\r\n/g, "\r\n")
                            .replace(/;\n/g, "\n");
                    }
                    if (options.sourcelabel === "" || spacetest.test(options.sourcelabel)) {
                        options.sourcelabel = "Base Text";
                    }
                    if (options.difflabel === "" || spacetest.test(options.difflabel)) {
                        options.difflabel = "New Text";
                    }
                    if (options.jsx === true) {
                        options.autoval = ["jsx", "javascript", "React JSX"];
                    }
                    return (function core__diff() {
                        var a = "";
                        options.diff   = apidiffout;
                        options.source = apioutput;
                        if (options.diffcli === true) {
                            a = global.prettydiff.diffview(options);
                            return output(a[0], a[1], a[2]);
                        }
                        if (apioutput === "Error: This does not appear to be JavaScript." || apidiffout === "Error: This does not appear to be JavaScript.") {
                            return output(
                                "<p><strong>Error:</strong> Please try using the option labeled <em>Plain Text " +
                                "(diff only)</em>. <span style='display:block'>The input does not appear to be " +
                                "markup, CSS, or JavaScript.</span></p>", 0, 0
                            );
                        }
                        if (options.lang === "text") {
                            options.inchar = "";
                        }
                        a = global
                            .prettydiff
                            .diffview(options);
                        if (options.jsx === true) {
                            options.autoval = ["jsx", "javascript", "React JSX"];
                        }
                        if (options.api === "") {
                            finalFile.order[10] = a[0];
                            finalFile.order[12] = finalFile.script.diff;
                            return output(finalFile.order.join(""), a[1], a[2]);
                        }
                        return output(a[0], a[1], a[2]);
                    }());
                } else {
                    if (options.mode === "analysis") {
                        options.accessibility = true;
                    }
                    if (options.lang === "css") {
                        apioutput = csspretty();
                    } else if (options.lang === "csv") {
                        apioutput = global
                            .prettydiff
                            .csvpretty(options);
                    } else if (options.lang === "markup") {
                        apioutput = markuppretty();
                    } else if (options.lang === "text") {
                        apioutput  = options.source;
                        apidiffout = "";
                    } else {
                        apioutput = jspretty();
                    }
                    if (options.api === "") {
                        if (options.mode === "analysis" || (options.mode === "parse" && options.parseFormat === "htmltable")) {
                            finalFile.order[10] = apidiffout;
                            apioutput           = finalFile
                                .order
                                .join("");
                        } else if (options.mode === "beautify" && options.jsscope !== "none" && (options.lang === "javascript" || options.lang === "json")) {
                            finalFile.order[10] = apidiffout;
                            finalFile.order[12] = finalFile.script.beautify;
                            apioutput           = finalFile
                                .order
                                .join("");
                        }
                    }
                    if (options.jsx === true) {
                        options.autoval = ["jsx", "javascript", "React JSX"];
                    }
                    return output(apioutput, 0, 0);
                }
            };
        return core(api);
    };

    if (typeof global.prettydiff !== "object") {
        global.prettydiff = {};
    }
    if (typeof global.prettydiff.meta !== "object") {
        // schema for global.prettydiff.meta lang - array, language detection time -
        // string, proctime (total execution time minus visual rendering) insize -
        // number, input size outsize - number, output size difftotal - number,
        // difference count difflines - number, difference lines
        global.prettydiff.meta = {
            difflines: 0,
            difftotal: 0,
            error    : "",
            insize   : 0,
            lang     : [
                "", "", ""
            ],
            outsize  : 0,
            time     : ""
        };
    }
    if (typeof process === "object" && Array.isArray(process.argv) === true && process.argv[1].replace(/\\/g, "/").replace(".js", "").split("prettydiff/prettydiff")[1] === "") {
        return console.log("This file \u001b[31m\u001b[1mdoes not execute from the command line\u001b[0m\u001b[39m.  Use \u001b[32mapi/node-local.js\u001b[39m instead.");
    }
    if (typeof define === "function" && (typeof ace !== "object" || ace.prettydiffid === undefined)) {
        define(function prettydiff_requirejs() {
            return function prettydiff_requirejs_wrapper(x) {
                return prettydiff(x);
            };
        });
    } else if (typeof module === "object" && typeof module.parent === "object") {
        //commonjs and nodejs support
        module.exports         = function commonjs_prettydiff(x) {
            return prettydiff(x);
        };
        module.exports.edition = global.prettydiff.edition;
        module.exports.meta    = global.prettydiff.meta;
        if (typeof require === "function" && (typeof ace !== "object" || ace.prettydiffid === undefined)) {
            (function glib_prettydiff() {
                var localPath = (
                    typeof process === "object" && typeof process.cwd === "function" && (process.cwd() === "/" || (/^([a-z]:\\)$/).test(process.cwd()) === true) && typeof __dirname === "string"
                )
                    ? __dirname
                    : ".";
                if (global.prettydiff.language === undefined) {
                    global.prettydiff.language = require(
                        localPath + "/lib/language.js"
                    );
                }
                if (global.prettydiff.finalFile === undefined) {
                    global.prettydiff.finalFile = require(
                        localPath + "/lib/finalFile.js"
                    );
                }
                if (global.prettydiff.csspretty === undefined) {
                    global.prettydiff.csspretty = require(
                        localPath + "/lib/csspretty.js"
                    );
                }
                if (global.prettydiff.csvpretty === undefined) {
                    global.prettydiff.csvpretty = require(
                        localPath + "/lib/csvpretty.js"
                    );
                }
                if (global.prettydiff.diffview === undefined) {
                    global.prettydiff.diffview = require(
                        localPath + "/lib/diffview.js"
                    );
                }
                if (global.prettydiff.jspretty === undefined) {
                    global.prettydiff.jspretty = require(
                        localPath + "/lib/jspretty.js"
                    );
                }
                if (global.prettydiff.options === undefined) {
                    global.prettydiff.options = require(
                        localPath + "/lib/options.js"
                    );
                }
                if (global.prettydiff.safeSort === undefined) {
                    global.prettydiff.safeSort = require(
                        localPath + "/lib/safeSort.js"
                    );
                }
                if (global.prettydiff.markuppretty === undefined) {
                    global.prettydiff.markuppretty = require(
                        localPath + "/lib/markuppretty.js"
                    );
                }
            }());
        }
    } else {
        global.prettydiff.prettydiff = prettydiff;
    }
    global.prettydiff.edition        = {
        addon        : {
            ace: 160307
        },
        api          : {
            dom      : 170707, //dom.js
            nodeLocal: 170707 //node-local.js
        },
        css          : 170707, //css files
        csspretty    : 170707, //csspretty lib
        csvpretty    : 170514, //csvpretty lib
        diffview     : 170521, //diffview lib
        documentation: 170707, //documentation.xhtml and various guide pages
        finalFile    : 170514, //HTML report generator
        jspretty     : 170707, //jspretty lib
        language     : 170514, //language lib
        latest       : 0,
        lint         : 170707, //unit test and lint automation as test/lint.js
        markuppretty : 170707, //markuppretty lib
        options      : 170521, //options management
        prettydiff   : 170707, //this file
        safeSort     : 170514, //safeSort lib
        version      : "2.2.8", //version number
        webtool      : 170707
    };
    global.prettydiff.edition.latest = (function edition_latest() {
        return Math.max(
            global.prettydiff.edition.css,
            global.prettydiff.edition.csspretty,
            global.prettydiff.edition.csvpretty,
            global.prettydiff.edition.diffview,
            global.prettydiff.edition.documentation,
            global.prettydiff.edition.finalFile,
            global.prettydiff.edition.jspretty,
            global.prettydiff.edition.language,
            global.prettydiff.edition.markuppretty,
            global.prettydiff.edition.options,
            global.prettydiff.edition.prettydiff,
            global.prettydiff.edition.webtool,
            global.prettydiff.edition.api.dom,
            global.prettydiff.edition.api.nodeLocal
        );
    }());
}());
