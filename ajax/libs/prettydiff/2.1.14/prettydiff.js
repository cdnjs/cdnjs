/*prettydiff.com topcoms: true, insize: 4, inchar: " ", vertical: true */
/*jshint laxbreak: true*/
/*global __dirname, ace, console, define, global, module, options, process, require */
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

    prettydiff source:"c:\mydirectory\myfile.js" readmethod:"file" diff:"c:\myotherfile.js"

 Execute with WSH:
    cscript prettydiff.wsf /source:"myFile.xml" /mode:"beautify"

 Execute from JavaScript:
    var global = {},
        args   = {
            source: "asdf",
            diff  : "asdd",
            lang  : "text"
        },
        output = prettydiff(args);


                *******   license start   *******
 @source: http://prettydiff.com/prettydiff.js
 @documentation - English: http://prettydiff.com/documentation.xhtml

 @licstart  The following is the entire license notice for Pretty Diff.

 This code may not be used or redistributed unless the following
 conditions are met:

 * Prettydiff created by Austin Cheney originally on 3 Mar 2009.
 http://prettydiff.com/

 * The use of diffview.js and prettydiff.js must contain the following
 copyright:
 Copyright (c) 2007, Snowtide Informatics Systems, Inc.
 All rights reserved.
     - Redistributions of source code must retain the above copyright
 notice, this list of conditions and the following disclaimer.
     - Redistributions in binary form must reproduce the above copyright
 notice, this list of conditions and the following disclaimer in the
 documentation and/or other materials provided with the
 distribution.
     - Neither the name of the Snowtide Informatics Systems nor the
 names of its contributors may be used to endorse or promote products
 derived from this software without specific prior written
 permission.
     - used as diffview function
     http://prettydiff.com/lib/diffview.js

 * The code mentioned above has significantly expanded documentation in
 each of the respective function's external JS file as linked from the
 documentation page:
 http://prettydiff.com/documentation.php

 * In addition to the previously stated requirements any use of any
 component, aside from directly using the full files in their entirety,
 must restate the license mentioned at the top of each concerned file.

 If each and all these conditions are met use, extension, alteration,
 and redistribution of Pretty Diff and its required assets is unlimited
 and free without author permission.

 @licend  The above is the entire license notice for Pretty Diff.
                *******   license end   *******


 Special thanks to:

 * Harry Whitfield for the numerous test cases provided against
 JSPretty.  http://g6auc.me.uk/

 * Andreas Greuel for contributing samples to test diffview.js
 https://plus.google.com/105958105635636993368/posts

 */
(function prettydiff_init() {
    "use strict";
    if (typeof global.prettydiff !== "object") {
        global.prettydiff = {};
    }
    if (typeof global.prettydiff.meta !== "object") {
        // schema for global.prettydiff.meta lang - array, language detection time - string,
        // proctime (total execution time minus visual rendering) insize - number, input
        // size outsize - number, output size difftotal - number, difference count
        // difflines - number, difference lines
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
    if (typeof require === "function" && (typeof ace !== "object" || ace.prettydiffid === undefined)) {
        (function glib_prettydiff() {
            var localPath = (typeof process === "object" && typeof process.cwd === "function" && (process.cwd() === "/" || (/^([a-z]:\\)$/).test(process.cwd()) === true) && typeof __dirname === "string")
                ? __dirname
                : ".";
            if (global.prettydiff.language === undefined) {
                global.prettydiff.language = require(localPath + "/lib/language.js");
            }
            if (global.prettydiff.finalFile === undefined) {
                global.prettydiff.finalFile = require(localPath + "/lib/finalFile.js");
            }
            if (global.prettydiff.csspretty === undefined) {
                global.prettydiff.csspretty = require(localPath + "/lib/csspretty.js");
            }
            if (global.prettydiff.csvpretty === undefined) {
                global.prettydiff.csvpretty = require(localPath + "/lib/csvpretty.js");
            }
            if (global.prettydiff.diffview === undefined) {
                global.prettydiff.diffview = require(localPath + "/lib/diffview.js");
            }
            if (global.prettydiff.jspretty === undefined) {
                global.prettydiff.jspretty = require(localPath + "/lib/jspretty.js");
            }
            if (global.prettydiff.options === undefined) {
                global.prettydiff.options = require(localPath + "/lib/options.js");
            }
            if (global.prettydiff.safeSort === undefined) {
                global.prettydiff.safeSort = require(localPath + "/lib/safeSort.js");
            }
            if (global.prettydiff.markuppretty === undefined) {
                global.prettydiff.markuppretty = require(localPath + "/lib/markuppretty.js");
            }
        }());
    }
    var prettydiff = function prettydiff_(api) {
        var startTime = (typeof Date.now === "function")
                ? Date.now()
                : (function prettydiff__dateShim() {
                    var dateItem = new Date();
                    return Date.parse(dateItem);
                }()),
            core      = function core_(api) {
                var spacetest    = (/^\s+$/g),
                    apioutput    = "",
                    apidiffout   = "",
                    metaerror    = "",
                    finalFile    = global.prettydiff.finalFile,
                    options      = global.prettydiff.options.functions.validate(api),
                    jspretty     = function core__jspretty() {
                        var jsout = global.prettydiff.jspretty(options);
                        if (options.nodeasync === true) {
                            metaerror = jsout[1];
                            return jsout[0];
                        }
                        metaerror = global.prettydiff.meta.error;
                        return jsout;
                    },
                    markuppretty = function core__markuppretty() {
                        var markout = global.prettydiff.markuppretty(options);
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
                        var cssout = global.prettydiff.csspretty(options);
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
                            elapsed      = (typeof Date.now === "function")
                                ? ((Date.now() - startTime) / 1000)
                                : (function core__proctime_dateShim() {
                                    var dateitem = new Date();
                                    return Date.parse(dateitem);
                                }()),
                            secondString = elapsed.toFixed(3),
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
                        var meta = {
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
                                meta.error = "Language is set to text, but plain text is only supported in diff mode. File not" +
                                        " parsed.";
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
                    return output("");
                }
                if (options.mode === "diff" && options.diffcli === false) {
                    if (options.diff === "") {
                        metaerror = "options.mode is 'diff' and options.diff is empty!";
                        return output("");
                    }
                    if (options.lang === "csv") {
                        options.lang = "text";
                    }
                }
                if (options.autoval[0] === "text" && options.mode !== "diff") {
                    metaerror = "Language is either text or undetermined, but text is only allowed for the 'diff'" +
                            " mode!";
                    return output(options.source);
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
                        apioutput  = global.prettydiff.csvpretty(options);
                        apidiffout = global.prettydiff.csvpretty(options);
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
                            return output(global.prettydiff.diffview(options));
                        }
                        if (apioutput === "Error: This does not appear to be JavaScript." || apidiffout === "Error: This does not appear to be JavaScript.") {
                            return output("<p><strong>Error:</strong> Please try using the option labeled <em>Plain Text (d" +
                                    "iff only)</em>. <span style='display:block'>The input does not appear to be mark" +
                                    "up, CSS, or JavaScript.</span></p>");
                        }
                        if (options.lang === "text") {
                            options.inchar = "";
                        }
                        a = global.prettydiff.diffview(options);
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
                        apioutput = global.prettydiff.csvpretty(options);
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
                            finalFile.order[10]  = apidiffout;
                            apioutput = finalFile.order.join("");
                        } else if (options.mode === "beautify" && options.jsscope !== "none" && options.lang === "javascript") {
                            finalFile.order[10]  = apidiffout;
                            finalFile.order[12]  = finalFile.script.beautify;
                            apioutput = finalFile.order.join("");
                        }
                    }
                    if (options.jsx === true) {
                        options.autoval = ["jsx", "javascript", "React JSX"];
                    }
                    return output(apioutput);
                }
            };
        return core(api);
    };
    global.prettydiff.edition        = {
        addon        : {
            ace: 160307
        },
        api          : {
            dom      : 161002, //dom.js
            nodeLocal: 160816 //node-local.js
        },
        css          : 160814, //css files
        csspretty    : 160902, //csspretty lib
        csvpretty    : 160816, //csvpretty lib
        diffview     : 161002, //diffview lib
        documentation: 160828, //documentation.xhtml and various guide pages
        finalFile    : 160816, //HTML report generator
        jspretty     : 161011, //jspretty lib
        language     : 160921, //language lib
        latest       : 0,
        lint         : 161002, //unit test and lint automation as test/lint.js
        markuppretty : 161002, //markuppretty lib
        options      : 161002, //options management
        prettydiff   : 161002, //this file
        safeSort     : 160816, //safeSort lib
        version      : "2.1.14", //version number
        webtool      : 160827
    };
    global.prettydiff.edition.latest = (function edition_latest() {
        return Math.max(global.prettydiff.edition.css, global.prettydiff.edition.csspretty, global.prettydiff.edition.csvpretty, global.prettydiff.edition.diffview, global.prettydiff.edition.documentation, global.prettydiff.edition.finalFile, global.prettydiff.edition.jspretty, global.prettydiff.edition.language, global.prettydiff.edition.markuppretty, global.prettydiff.edition.options, global.prettydiff.edition.prettydiff, global.prettydiff.edition.webtool, global.prettydiff.edition.api.dom, global.prettydiff.edition.api.nodeLocal);
    }());
    if (typeof module === "object" && typeof module.parent === "object") {
        //commonjs and nodejs support
        module.exports.edition    = global.prettydiff.edition;
        module.exports.meta       = global.prettydiff.meta;
        module.exports            = function commonjs_prettydiff(x) {
            return prettydiff(x);
        };
        if (process.argv.length === 2 && process.argv[1].indexOf("prettydiff.js") > -1) {
            console.log("Please try:  node api/node-local.js");
        }
    } else if ((typeof define === "object" || typeof define === "function") && (typeof ace !== "object" || ace.prettydiffid === undefined)) {
        //requirejs support
        define(function requirejs(require, module) {
            module.exports.edition    = global.prettydiff.edition;
            module.exports.meta       = global.prettydiff.meta;
            module.exports            = function requirejs_prettydiff_export(x) {
                return prettydiff(x);
            };
            //worthless if block to appease RequireJS and JSLint
            if (typeof require === "number") {
                return require;
            }
            return function requirejs_prettydiff_module(x) {
                prettydiff(x);
            };
        });
    } else {
        global.prettydiff.prettydiff = prettydiff;
    }
}());
