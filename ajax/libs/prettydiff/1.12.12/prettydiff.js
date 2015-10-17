/*prettydiff.com api.topcoms: true, api.insize: 4, api.inchar: " ", api.vertical: true */
/*global pd, exports, define */
/*jslint for: true*/
/*

 Execute in a NodeJS app:

    npm install prettydiff        (local install)

    var prettydiff = require("prettydiff"),
        args       = {
            source: "asdf",
            diff  : "asdd",
            lang  : "text"
        },
        output     = prettydiff.api(args);

 Execute on command line with NodeJS:

    npm install prettydiff -g     (global install)

    prettydiff source:"c:\mydirectory\myfile.js" readmethod:"file" diff:"c:\myotherfile.js"

 Execute with WSH:
    cscript prettydiff.wsf /source:"myFile.xml" /mode:"beautify"

 Execute from JavaScript:
    var args   = {
            source: "asdf",
            diff  : "asdd",
            lang  : "text"
        },
        output = prettydiff(args);


                *******   license start   *******
 @source: http://prettydiff.com/prettydiff.js
 @documentation - English: http://prettydiff.com/documentation.php

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


 Join the Pretty Diff mailing list at:
 https://groups.google.com/d/forum/pretty-diff

 Special thanks to:

 * Harry Whitfield for the numerous test cases provided against
 JSPretty.  http://g6auc.me.uk/

 * Andreas Greuel for contributing samples to test diffview.js
 https://plus.google.com/105958105635636993368/posts

 */
var prettydiff = function prettydiff(api) {
        "use strict";
        var startTime    = Date.now(),
            jsxstatus    = false,
            summary      = "",
            charDecoder  = function init_charDecoder() {
                return;
            },
            csspretty    = function init_csspretty() {
                return;
            },
            csvbeauty    = function init_csvbeauty() {
                return;
            },
            csvmin       = function init_csvmin() {
                return;
            },
            diffview     = function init_diffview() {
                return;
            },
            jspretty     = function init_jspretty() {
                return;
            },
            markuppretty = function init_markuppretty() {
                return;
            },
            //the native sort method Array.prototype.sort is not stable and
            //should not be trusted cross-browser. So I wrote something that
            //performs a more intelligent sort and is always stable.
            safeSort     = function (array, operation, recursive) {
                var arTest  = function (item) {
                        if (typeof item !== "object" || item.length === undefined || item.length < 2) {
                            return false;
                        }
                        return true;
                    },
                    normal  = function (item) {
                        var done    = [item[0]],
                            storeb  = item,
                            child   = function () {
                                var a   = 0,
                                    len = storeb.length;
                                for (a = 0; a < len; a += 1) {
                                    if (arTest(storeb[a]) === true) {
                                        storeb[a] = normal(storeb[a]);
                                    }
                                }
                            },
                            recurse = function (x) {
                                var a      = 0,
                                    storea = [],
                                    len    = storeb.length;
                                for (a = 0; a < len; a += 1) {
                                    if (storeb[a] !== x) {
                                        storea.push(storeb[a]);
                                    }
                                }
                                storeb = storea;
                                if (storea.length > 0) {
                                    done.push(storea[0]);
                                    recurse(storea[0]);
                                } else {
                                    if (recursive === true) {
                                        child();
                                    }
                                    item = storeb;
                                }
                            };
                        recurse(array[0]);
                    },
                    descend = function (item) {
                        var c       = 0,
                            storeb  = item,
                            len     = item.length,
                            child   = function () {
                                var a    = 0,
                                    lenc = storeb.length;
                                for (a = 0; a < lenc; a += 1) {
                                    if (arTest(storeb[a]) === true) {
                                        storeb[a] = descend(storeb[a]);
                                    }
                                }
                            },
                            recurse = function () {
                                var a      = 0,
                                    b      = 0,
                                    d      = 0,
                                    e      = 0,
                                    ind    = [],
                                    key    = storeb[c],
                                    tstore = "",
                                    tkey   = typeof key;
                                for (a = c; a < len; a += 1) {
                                    tstore = typeof storeb[a];
                                    if (storeb[a] > key || (tstore > tkey)) {
                                        key = storeb[a];
                                        ind = [a];
                                    } else if (storeb[a] === key) {
                                        ind.push(a);
                                    }
                                }
                                d = ind.length;
                                b = d + c;
                                for (a = c; a < b; a += 1) {
                                    storeb[ind[e]] = storeb[a];
                                    storeb[a]      = key;
                                    e              += 1;
                                }
                                c += d;
                                if (c < len) {
                                    recurse();
                                } else {
                                    if (recursive === true) {
                                        child();
                                    }
                                    item = storeb;
                                }
                            };
                        recurse();
                        return item;
                    },
                    ascend  = function (item) {
                        var c       = 0,
                            storeb  = item,
                            len     = item.length,
                            child   = function () {
                                var a    = 0,
                                    lenc = storeb.length;
                                for (a = 0; a < lenc; a += 1) {
                                    if (arTest(storeb[a]) === true) {
                                        storeb[a] = ascend(storeb[a]);
                                    }
                                }
                            },
                            recurse = function () {
                                var a      = 0,
                                    b      = 0,
                                    d      = 0,
                                    e      = 0,
                                    ind    = [],
                                    key    = storeb[c],
                                    tstore = "",
                                    tkey   = typeof key;
                                for (a = c; a < len; a += 1) {
                                    tstore = typeof storeb[a];
                                    if (storeb[a] < key || tstore < tkey) {
                                        key = storeb[a];
                                        ind = [a];
                                    } else if (storeb[a] === key) {
                                        ind.push(a);
                                    }
                                }
                                d = ind.length;
                                b = d + c;
                                for (a = c; a < b; a += 1) {
                                    storeb[ind[e]] = storeb[a];
                                    storeb[a]      = key;
                                    e              += 1;
                                }
                                c += d;
                                if (c < len) {
                                    recurse();
                                } else {
                                    if (recursive === true) {
                                        child();
                                    }
                                    item = storeb;
                                }
                            };
                        recurse();
                        return item;
                    };
                if (arTest(array) === false) {
                    return array;
                }
                if (recursive === "true") {
                    recursive = true;
                } else if (recursive !== true) {
                    recursive = false;
                }
                if (operation === "normal") {
                    return normal(array);
                }
                if (operation === "descend") {
                    return descend(array);
                }
                return ascend(array);
            },
            //everything above, except "startTime", "jsxstatus", and
            //"summary" is a library.  Here is the logic that puts it
            //all together into a combined application
            core         = function core(api) {
                var spacetest      = (/^\s+$/g),
                    apioutput      = "",
                    apidiffout     = "",
                    builder        = {},
                    setlangmode    = function dom__langkey_setlangmode(input) {
                        if (input === "css" || input === "less" || input === "scss") {
                            return "css";
                        }
                        if (input.indexOf("html") > -1 || input === "html" || input === "ejs" || input === "html_ruby" || input === "handlebars" || input === "twig" || input === "php") {
                            return "html";
                        }
                        if (input === "markup" || input === "jsp" || input === "xml" || input === "xhtml") {
                            return "markup";
                        }
                        if (input === "javascript" || input === "json" || input === "jsx") {
                            return "javascript";
                        }
                        if (input === "text") {
                            return "text";
                        }
                        if (input === "csv") {
                            return "csv";
                        }
                        if (input === "tss" || input === "titanium") {
                            return "tss";
                        }
                        return "javascript";
                    },
                    nameproper     = function dom__langkey_nameproper(input) {
                        if (input === "javascript") {
                            return "JavaScript";
                        }
                        if (input === "text") {
                            return "Plain Text";
                        }
                        if (input === "jsx") {
                            return "React JSX";
                        }
                        if (input === "scss") {
                            return "SCSS (Sass)";
                        }
                        if (input === "ejs") {
                            return "EJS Template";
                        }
                        if (input === "handlebars") {
                            return "Handlebars Template";
                        }
                        if (input === "html_ruby") {
                            return "ERB (Ruby) Template";
                        }
                        if (input === "tss" || input === "titanium") {
                            return "Titanium Stylesheets";
                        }
                        if (input === "typescript") {
                            return "TypeScript (not supported yet)";
                        }
                        if (input === "twig") {
                            return "HTML TWIG Template";
                        }
                        if (input === "jsp") {
                            return "JSTL (JSP)";
                        }
                        if (input === "java") {
                            return "Java (not supported yet)";
                        }
                        return input.toUpperCase();
                    },
                    //determines api source as necessary to make a decision about whether to supply
                    //externally needed JS functions to reports
                    caccessibility = (api.accessibility === true || api.accessibility === "true"),
                    capi           = (api.api === undefined || api.api.length === 0)
                        ? ""
                        : api.api,
                    //braceline - should a new line pad the interior of blocks (curly braces) in
                    //JavaScript
                    cbraceline     = (api.braceline === true || api.braceline === "true"),
                    //api.bracepadding - should curly braces be padded with a space in JavaScript?
                    cbracepadding  = (api.bracepadding === true || api.bracepadding === "true"),
                    //api.indent - should JSPretty format JavaScript in the normal KNR style or push
                    //curly braces onto a separate line like the "allman" style
                    cbraces        = (api.braces === "allman")
                        ? "allman"
                        : "knr",
                    //api.comments - if comments should receive indentation or not
                    ccomm          = (api.comments === "noindent")
                        ? "noindent"
                        : ((api.comments === "nocomment")
                            ? "nocomment"
                            : "indent"),
                    //api.conditional - should IE conditional comments be preserved during markup
                    //minification
                    ccond          = (api.conditional === true || api.conditional === "true"),
                    //api.content - should content be normalized during a diff operation
                    ccontent       = (api.content === true || api.content === "true"),
                    //api.context - should the diff report only include the differences, if so then
                    //buffered by how many lines of code
                    ccontext       = (api.context === "" || (/^(\s+)$/).test(api.context) || isNaN(api.context))
                        ? ""
                        : Number(api.context),
                    //api.correct - should JSPretty make some corrections for sloppy JS
                    ccorrect       = (api.correct === true || api.correct === "true"),
                    //api.cssinsertlines = if a new line should be forced between each css block
                    ccssinsertlines = (api.cssinsertlines === true || api.cssinsertlines === "true"),
                    //api.csvchar - what character should be used as a separator
                    ccsvchar       = (typeof api.csvchar === "string" && api.csvchar.length > 0)
                        ? api.csvchar
                        : ",",
                    //api.diff - source code to compare with
                    cdiff          = (typeof api.diff === "string" && api.diff.length > 0 && (/^(\s+)$/).test(api.diff) === false)
                        ? api.diff
                        : "",
                    //api.diffcli - if operating from Node.js and set to true diff output will be
                    //printed to stdout just like git diff
                    cdiffcli       = (api.diffcli === true || api.diffcli === "true"),
                    //api.diffcomments - should comments be included in the diff operation
                    cdiffcomments  = (api.diffcomments === true || api.diffcomments === "true"),
                    //api.difflabel - a text label to describe the diff code
                    cdifflabel     = (typeof api.difflabel === "string" && api.difflabel.length > 0)
                        ? api.difflabel
                        : "new",
                    //api.diffview - should the diff report be a single column showing both sources
                    //simultaneously "inline" or showing the sources in separate columns
                    //"sidebyside"
                    cdiffview      = (api.diffview === "inline")
                        ? "inline"
                        : "sidebyside",
                    //api.elseline - for the 'else' keyword onto a new line in JavaScript
                    celseline      = (api.elseline === true || api.elseline === "true"),
                    //api.force_indent - should markup beautification always force indentation even
                    //if disruptive
                    cforce         = (api.force_indent === true || api.force_indent === "true"),
                    //api.html - should markup be presumed to be HTML with all the aloppiness HTML
                    //allows
                    chtml          = (api.html === true || api.html === "true" || (typeof api.html === "string" && api.html === "html-yes")),
                    //api.inchar - what character should be used to create a single identation
                    cinchar        = (typeof api.inchar === "string" && api.inchar.length > 0)
                        ? api.inchar
                        : " ",
                    //api.inlevel - should indentation in JSPretty be buffered with additional
                    //indentation?  Useful when supplying code to sites accepting markdown
                    cinlevel       = (isNaN(api.inlevel) || Number(api.inlevel) < 1)
                        ? 0
                        : Number(api.inlevel),
                    //api.insize - how many characters from api.inchar should constitute a single
                    //indentation
                    cinsize        = (isNaN(api.insize))
                        ? 4
                        : Number(api.insize),
                    //api.jsscope - do you want to enable the jsscope feature of JSPretty?  This
                    //feature will output formatted HTML instead of text code showing which
                    //variables are declared at which functional depth
                    cjsscope       = (api.jsscope === true || api.jsscope === "true")
                        ? "report"
                        : (api.jsscope !== "html" && api.jsscope !== "report")
                            ? "none"
                            : api.jsscope,
                    //api.lang - which programming language will we be analyzing
                    clang          = (typeof api.lang === "string" && api.lang !== "auto")
                        ? setlangmode(api.lang.toLowerCase())
                        : "auto",
                    //api.langdefault - what language should lang value "auto" resort to when it
                    //cannot determine the language
                    clangdefault   = (typeof api.langdefault === "string")
                        ? setlangmode(api.langdefault.toLowerCase())
                        : "text",
                    //api.mode - is this a minify, beautify, or diff operation
                    cmode          = (typeof api.mode === "string" && (api.mode === "minify" || api.mode === "beautify" || api.mode === "parse"))
                        ? api.mode
                        : "diff",
                    //api.obfuscate - when minifying code with JSPretty should we make it sloppy and
                    //change variable names to make the code extra small?
                    cobfuscate     = (api.obfuscate === true || api.obfuscate === "true"),
                    //api.objsort will alphabetize object keys in JavaScript
                    cobjsort       = (api.objsort === "all" || (api.objsort === "css" && clang !== "javascript") || (api.objsort === "js" && clang !== "css")),
                    //api.preserve - should empty lines be preserved in beautify operations of
                    //JSPretty?
                    cpreserve      = (api.preserve === "all" || (api.preserve === "css" && clang !== "javascript") || (api.preserve === "js" && clang !== "css")),
                    //api.quote - should all single quote characters be converted to double quote
                    //characters during a diff operation to reduce the number of false positive
                    //comparisons
                    cquote         = (api.quote === true || api.quote === "true"),
                    //api.quoteConvert - convert " to ' (or ' to ") of string literals or markup
                    //attributes
                    cquoteConvert  = (api.quoteConvert === "single" || api.quoteConvert === "double")
                        ? api.quoteConvert
                        : "none",
                    //api.semicolon - should trailing semicolons be removed during a diff operation
                    //to reduce the number of false positive comparisons
                    csemicolon     = (api.semicolon === true || api.semicolon === "true"),
                    //api.source - the source code in minify and beautify operations or "base" code
                    //in operations
                    csource        = (typeof api.source === "string" && api.source.length > 0 && (/^(\s+)$/).test(api.source) === false)
                        ? api.source
                        : ((cmode === "diff")
                            ? ""
                            : "Source sample is missing."),
                    //api.sourcelabel - a text label to describe the api.source code for the diff
                    //report
                    csourcelabel   = (typeof api.sourcelabel === "string" && api.sourcelabel.length > 0)
                        ? api.sourcelabel
                        : "base",
                    //api.space - should JSPretty include a space between a function keyword and the
                    //next adjacent opening parenthesis character in beautification operations
                    cspace         = (api.space !== false && api.space !== "false"),
                    //api.style - should JavaScript and CSS code receive indentation if embedded
                    //inline in markup
                    cstyle         = (api.style === "noindent")
                        ? "noindent"
                        : "indent",
                    //api.styleguide - preset of beautification options to bring a JavaScript sample
                    //closer to conformance of a given style guide
                    cstyleguide    = (typeof api.styleguide === "string")
                        ? api.styleguide
                        : "",
                    //api.tagmerge - Allows combining immediately adjacent start and end tags of the
                    //same name into a single self-closing tag:  <a href="home"></a> into <a
                    //href="home"/>
                    ctagmerge = (api.tagmerge === true || api.tagmerge === "true"),
                    //api.titanium - TSS document support via option, because this is a uniquely
                    //modified form of JSON
                    ctitanium      = (api.titanium === true || api.titanium === "true"),
                    //api.topcoms - should comments at the top of a JavaScript or CSS source be
                    //preserved during minify operations
                    ctopcoms       = (api.topcoms === true || api.topcoms === "true"),
                    //varword - should consecutive variables be merged into a comma separated list
                    //or the opposite
                    cvarword       = (api.varword === "each" || api.varword === "list")
                        ? api.varword
                        : "none",
                    //api.vertical - whether or not to vertically align lists of assigns in CSS and
                    //JavaScript
                    cvertical      = (api.vertical === "all" || (api.vertical === "css" && clang !== "javascript") || (api.vertical === "js" && clang !== "css")),
                    //api.wrap - in markup beautification should text content wrap after the first
                    //complete word up to a certain character length
                    cwrap          = (isNaN(api.wrap) === true)
                        ? 80
                        : Number(api.wrap),
                    autoval        = [],
                    autostring     = "",
                    auto           = function core__auto(a) {
                        var b        = [],
                            c        = 0,
                            d        = 0,
                            join     = "",
                            flaga    = false,
                            flagb    = false,
                            defaultt = clangdefault,
                            output   = function core__auto_output(langname) {
                                if (langname === "unknown") {
                                    return [
                                        defaultt, setlangmode(defaultt), "unknown"
                                    ];
                                }
                                if (langname === "xhtml") {
                                    return [
                                        "xml", "html", "XHTML"
                                    ];
                                }
                                if (langname === "tss") {
                                    return [
                                        "javascript", "javascript", "Titanium Stylesheets"
                                    ];
                                }
                                return [
                                    langname, setlangmode(langname), nameproper(langname)
                                ];
                            };
                        if (a === null) {
                            return;
                        }
                        if (a === undefined || (/^(\s*#(?!(!\/)))/).test(a) === true || (/\n\s*(\.|@)mixin\(?(\s*)/).test(a) === true) {
                            if ((/\$[a-zA-Z]/).test(a) === true || (/\{\s*(\w|\.|\$|#)+\s*\{/).test(a) === true) {
                                return output("scss");
                            }
                            if ((/@[a-zA-Z]/).test(a) === true || (/\{\s*(\w|\.|@|#)+\s*\{/).test(a) === true) {
                                return output("less");
                            }
                            return output("css");
                        }
                        b = a.replace(/\[[a-zA-Z][\w\-]*\=("|')?[a-zA-Z][\w\-]*("|')?\]/g, "").split("");
                        c = b.length;
                        if ((/^([\s\w\-]*<)/).test(a) === false && (/(>[\s\w\-]*)$/).test(a) === false) {
                            for (d = 1; d < c; d += 1) {
                                if (flaga === false) {
                                    if (b[d] === "*" && b[d - 1] === "/") {
                                        b[d - 1] = "";
                                        flaga    = true;
                                    } else if (flagb === false && b[d] === "f" && d < c - 6 && b[d + 1] === "i" && b[d + 2] === "l" && b[d + 3] === "t" && b[d + 4] === "e" && b[d + 5] === "r" && b[d + 6] === ":") {
                                        flagb = true;
                                    }
                                } else if (flaga === true && b[d] === "*" && d !== c - 1 && b[d + 1] === "/") {
                                    flaga    = false;
                                    b[d]     = "";
                                    b[d + 1] = "";
                                } else if (flagb === true && b[d] === ";") {
                                    flagb = false;
                                    b[d]  = "";
                                }
                                if (flaga === true || flagb === true) {
                                    b[d] = "";
                                }
                            }
                            join = b.join("");
                            if ((/^(\s*(\{|\[))/).test(a) === true && (/((\]|\})\s*)$/).test(a) && a.indexOf(",") !== -1) {
                                return output("json");
                            }
                            if ((/((\}?(\(\))?\)*;?\s*)|([a-z0-9]("|')?\)*);?(\s*\})*)$/i).test(a) === true && ((/(var\s+[a-z]+[a-zA-Z0-9]*)/).test(a) === true || (/((\=|(\$\())\s*function)|(\s*function\s+(\w*\s+)?\()/).test(a) === true || a.indexOf("{") === -1 || (/^(\s*if\s+\()/).test(a) === true)) {
                                if (a.indexOf("(") > -1 || a.indexOf("=") > -1 || (a.indexOf(";") > -1 && a.indexOf("{") > -1)) {
                                    if ((/:\s*((number)|(string))/).test(a) === true && (/((public)|(private))\s+/).test(a) === true) {
                                        return output("typescript");
                                    }
                                    return output("javascript");
                                }
                                return output("unknown");
                            }
                            if (a.indexOf("{") !== -1 && (/^(\s*[\{\$\.#@a-z0-9])|^(\s*\/(\*|\/))|^(\s*\*\s*\{)/i).test(a) === true && (/^(\s*if\s*\()/).test(a) === false && (/\=\s*(\{|\[|\()/).test(join) === false && (((/(\+|-|\=|\?)\=/).test(join) === false || (/\/\/\s*\=+/).test(join) === true) || ((/\=+('|")?\)/).test(a) === true && (/;\s*base64/).test(a) === true)) && (/function(\s+\w+)*\s*\(/).test(join) === false) {
                                if ((/:\s*((number)|(string))/).test(a) === true && (/((public)|(private))\s+/).test(a) === true) {
                                    return output("typescript");
                                }
                                if ((/((public)|(private))\s+(((static)?\s+(v|V)oid)|(class)|(final))/).test(a) === true) {
                                    return output("java");
                                }
                                if ((/<[a-zA-Z]/).test(a) === true && (/<\/[a-zA-Z]/).test(a) === true && ((/\s?\{%/).test(a) === true || (/\{(\{|#)(?!(\{|#|\=))/).test(a) === true)) {
                                    return output("twig");
                                }
                                if ((/^\s*($|@)/).test(a) === false && ((/:\s*(\{|\(|\[)/).test(a) === true || (/^(\s*return;?\s*\{)/).test(a) === true) && (/(\};?\s*)$/).test(a) === true) {
                                    return output("javascript");
                                }
                                if ((/\{\{#/).test(a) === true && (/\{\{\//).test(a) === true && (/<\w/).test(a) === true) {
                                    return output("handlebars");
                                }
                                if ((/\{\s*(\w|\.|@|#)+\s*\{/).test(a) === true) {
                                    return output("less");
                                }
                                if ((/\$(\w|-)/).test(a) === true) {
                                    return output("scss");
                                }
                                if ((/(;|\{|:)\s*@\w/).test(a) === true) {
                                    return output("less");
                                }
                                return output("css");
                            }
                            if ((/"\s*:\s*\{/).test(a) === true) {
                                return output("tss");
                            }
                            return output("unknown");
                        }
                        if ((((/(>[\w\s:]*)?<(\/|!)?[\w\s:-\[]+/).test(a) === true || (/^(\s*<\?xml)/).test(a) === true) && ((/^([\s\w]*<)/).test(a) === true || (/(>[\s\w]*)$/).test(a) === true)) || ((/^(\s*<s((cript)|(tyle)))/i).test(a) === true && (/(<\/s((cript)|(tyle))>\s*)$/i).test(a) === true)) {
                            if (((/\s*<!doctype\ html>/i).test(a) === true && (/\s*<html/i).test(a) === true) || ((/^(\s*<!DOCTYPE\s+((html)|(HTML))\s+PUBLIC\s+)/).test(a) === true && (/XHTML\s+1\.1/).test(a) === false && (/XHTML\s+1\.0\s+(S|s)((trict)|(TRICT))/).test(a) === false)) {
                                if ((/<%\s*\}/).test(a) === true) {
                                    return output("ejs");
                                }
                                if ((/<%\s*end/).test(a) === true) {
                                    return output("html_ruby");
                                }
                                if ((/\{\{(#|\/|\{)/).test(a) === true) {
                                    return output("handlebars");
                                }
                                if ((/\{\{end\}\}/).test(a) === true) {
                                    //place holder for Go lang templates
                                    return output("html");
                                }
                                if ((/\s?\{%/).test(a) === true && (/\{(\{|#)(?!(\{|#|\=))/).test(a) === true) {
                                    return output("twig");
                                }
                                if ((/<\?/).test(a) === true) {
                                    return output("php");
                                }
                                if ((/<jsp:include\s/).test(a) === true || (/<c:((set)|(if))\s/).test(a) === true) {
                                    return output("jsp");
                                }
                                return output("html");
                            }
                            if ((/^(\s*<\?xml)/).test(a) === true) {
                                if ((/<%\s*\}/).test(a) === true) {
                                    return output("ejs");
                                }
                                if ((/<%\s*end/).test(a) === true) {
                                    return output("html_ruby");
                                }
                                if ((/\{\{(#|\/|\{)/).test(a) === true) {
                                    return output("handlebars");
                                }
                                if ((/\{\{end\}\}/).test(a) === true) {
                                    //place holder for Go lang templates
                                    return ("xml");
                                }
                                if ((/\s?\{%/).test(a) === true && (/\{\{(?!(\{|#|\=))/).test(a) === true) {
                                    return output("twig");
                                }
                                if ((/<\?(?!(xml))/).test(a) === true) {
                                    return output("php");
                                }
                                if ((/<jsp:include\s/).test(a) === true || (/<c:((set)|(if))\s/).test(a) === true) {
                                    return output("jsp");
                                }
                                if ((/XHTML\s+1\.1/).test(a) === true || (/XHTML\s+1\.0\s+(S|s)((trict)|(TRICT))/).test(a) === true) {
                                    return output("xhtml");
                                }
                                return output("xml");
                            }
                            if ((/<jsp:include\s/).test(a) === true || (/<c:((set)|(if))\s/).test(a) === true) {
                                return output("jsp");
                            }
                            return output("xml");
                        }
                        return output("unknown");
                    },
                    proctime       = function core__proctime() {
                        var minuteString = "",
                            hourString   = "",
                            minutes      = 0,
                            hours        = 0,
                            elapsed      = ((Date.now() - startTime) / 1000),
                            secondString = elapsed.toFixed(3),
                            plural       = function core__proctime_plural(x, y) {
                                var a = "";
                                if (x !== 1) {
                                    a = x + y + "s ";
                                } else {
                                    a = x + y + " ";
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
                        return "<p><strong>Execution time:</strong> <em>" + hourString + minuteString + secondString + "</em></p>";
                    },
                    pdcomment      = function core__pdcomment() {
                        var comment    = "",
                            a          = 0,
                            b          = csource.length,
                            c          = csource.indexOf("/*prettydiff.com") + 16,
                            difftest   = false,
                            build      = [],
                            comma      = -1,
                            g          = 0,
                            sourceChar = [],
                            quote      = "",
                            sind       = csource.indexOf("/*prettydiff.com"),
                            dind       = cdiff.indexOf("/*prettydiff.com");
                        if ((csource.charAt(c - 17) === "\"" && (/var\s+prettydiff\s*\=\s*function/).test(csource) === false) || (sind < 0 && dind < 0)) {
                            return;
                        }
                        if (sind > -1 && (/^(\s*\{\s*"token"\s*:\s*\[)/).test(csource) === true && (/\],\s*"types"\s*:\s*\[/).test(csource) === true) {
                            return;
                        }
                        if (sind < 0 && dind > -1 && (/^(\s*\{\s*"token"\s*:\s*\[)/).test(cdiff) === true && (/\],\s*"types"\s*:\s*\[/).test(cdiff) === true) {
                            return;
                        }
                        if (c === 15 && typeof cdiff === "string") {
                            c        = cdiff.indexOf("/*prettydiff.com") + 16;
                            difftest = true;
                        } else if (c === 15) {
                            return;
                        }
                        for (c = c; c < b; c += 1) {
                            if (difftest === false) {
                                if (csource.charAt(c) === "*" && csource.charAt(c + 1) === "/") {
                                    break;
                                }
                                sourceChar.push(csource.charAt(c));
                            } else {
                                if (cdiff.charAt(c) === "*" && cdiff.charAt(c + 1) === "/") {
                                    break;
                                }
                                sourceChar.push(cdiff.charAt(c));
                            }
                        }
                        comment = sourceChar.join("").toLowerCase();
                        b       = comment.length;
                        for (c = 0; c < b; c += 1) {
                            if ((typeof comment.charAt(c - 1) !== "string" || comment.charAt(c - 1) !== "\\") && (comment.charAt(c) === "\"" || comment.charAt(c) === "'")) {
                                if (quote === "") {
                                    quote = comment.charAt(c);
                                } else {
                                    quote = "";
                                }
                            }
                            if (quote === "") {
                                if (comment.charAt(c) === ",") {
                                    g     = comma + 1;
                                    comma = c;
                                    build.push(comment.substring(g, comma).replace(/^(\s*)/, "").replace(/(\s*)$/, ""));
                                }
                            }
                        }
                        g     = comma + 1;
                        comma = comment.length;
                        build.push(comment.substring(g, comma).replace(/^(\s*)/, "").replace(/(\s*)$/, ""));
                        quote      = "";
                        b          = build.length;
                        sourceChar = [];
                        for (c = 0; c < b; c += 1) {
                            a = build[c].length;
                            for (g = 0; g < a; g += 1) {
                                if (build[c].indexOf(":") === -1) {
                                    build[c] = "";
                                    break;
                                }
                                sourceChar = [];
                                if ((typeof build[c].charAt(g - 1) !== "string" || build[c].charAt(g - 1) !== "\\") && (build[c].charAt(g) === "\"" || build[c].charAt(g) === "'")) {
                                    if (quote === "") {
                                        quote = build[c].charAt(g);
                                    } else {
                                        quote = "";
                                    }
                                }
                                if (quote === "") {
                                    if (build[c].charAt(g) === ":") {
                                        sourceChar.push(build[c].substring(0, g).replace(/(\s*)$/, ""));
                                        sourceChar.push(build[c].substring(g + 1).replace(/^(\s*)/, ""));
                                        if (sourceChar[1].charAt(0) === sourceChar[1].charAt(sourceChar[1].length - 1) && sourceChar[1].charAt(sourceChar[1].length - 2) !== "\\" && (sourceChar[1].charAt(0) === "\"" || sourceChar[1].charAt(0) === "'")) {
                                            sourceChar[1] = sourceChar[1].substring(1, sourceChar[1].length - 1);
                                        }
                                        build[c] = sourceChar;
                                        break;
                                    }
                                }
                            }
                        }
                        for (c = 0; c < b; c += 1) {
                            if (typeof build[c][1] === "string") {
                                build[c][0] = build[c][0].replace("api.", "");
                                if (build[c][0] === "braceline") {
                                    if (build[c][1] === "true") {
                                        cbraceline = true;
                                    } else if (build[c][1] === "false") {
                                        cbraceline = false;
                                    }
                                } else if (build[c][0] === "bracepadding") {
                                    if (build[c][1] === "true") {
                                        cbracepadding = true;
                                    } else if (build[c][1] === "false") {
                                        cbracepadding = false;
                                    }
                                } else if (build[c][0] === "braces" || build[c][0] === "indent") {
                                    if (build[c][1] === "knr") {
                                        cbraces = "knr";
                                    } else if (build[c][1] === "allman") {
                                        cbraces = "allman";
                                    }
                                } else if (build[c][0] === "comments") {
                                    if (build[c][1] === "indent") {
                                        ccomm = "indent";
                                    } else if (build[c][1] === "noindent") {
                                        ccomm = "noindent";
                                    }
                                } else if (build[c][0] === "conditional") {
                                    if (build[c][1] === "true") {
                                        ccond = true;
                                    } else if (build[c][1] === "false") {
                                        ccond = false;
                                    }
                                } else if (build[c][0] === "content") {
                                    if (build[c][1] === "true") {
                                        ccontent = true;
                                    } else if (build[c][1] === "false") {
                                        ccontent = false;
                                    }
                                } else if (build[c][0] === "context" && ((/\D/).test(build[c][1]) === false || build[c][1] === "")) {
                                    ccontext = build[c][1];
                                } else if (build[c][0] === "correct") {
                                    if (build[c][1] === "true") {
                                        ccorrect = true;
                                    } else if (build[c][1] === "false") {
                                        ccorrect = false;
                                    }
                                } else if (build[c][0] === "csvchar") {
                                    ccsvchar = build[c][1];
                                } else if (build[c][0] === "diffcli") {
                                    if (build[c][1] === "true") {
                                        cdiffcli = true;
                                    } else if (build[c][1] === "false") {
                                        cdiffcli = false;
                                    }
                                } else if (build[c][0] === "diffcomments") {
                                    if (build[c][1] === "true") {
                                        cdiffcomments = true;
                                    } else if (build[c][1] === "false") {
                                        cdiffcomments = false;
                                    }
                                } else if (build[c][0] === "difflabel") {
                                    cdifflabel = build[c][1];
                                } else if (build[c][0] === "diffview") {
                                    if (build[c][1] === "sidebyside") {
                                        cdiffview = "sidebyside";
                                    } else if (build[c][1] === "inline") {
                                        cdiffview = "inline";
                                    }
                                } else if (build[c][0] === "elseline" && build[c][1] === "true") {
                                    celseline = true;
                                } else if (build[c][0] === "force_indent") {
                                    if (build[c][1] === "true") {
                                        cforce = true;
                                    } else if (build[c][1] === "false") {
                                        cforce = false;
                                    }
                                } else if (build[c][0] === "html") {
                                    if (build[c][1] === "html-no") {
                                        chtml = "html-no";
                                    } else if (build[c][1] === "html-yes") {
                                        chtml = "html-yes";
                                    }
                                } else if (build[c][0] === "inchar") {
                                    cinchar = build[c][1];
                                } else if (build[c][0] === "inlevel") {
                                    if (build[c][1] === "true") {
                                        cinlevel = true;
                                    } else if (build[c][1] === "false") {
                                        cinlevel = false;
                                    }
                                } else if (build[c][0] === "insize" && (/\D/).test(build[c][1]) === false) {
                                    cinsize = build[c][1];
                                } else if (build[c][0] === "jslines") {
                                    if (build[c][1] === "true") {
                                        cpreserve = true;
                                    } else if (build[c][1] === "false") {
                                        cpreserve = false;
                                    }
                                } else if (build[c][0] === "jsscope") {
                                    if (build[c][1] === "true") {
                                        cjsscope = true;
                                    } else if (build[c][1] === "false") {
                                        cjsscope = false;
                                    }
                                } else if (build[c][0] === "jsspace") {
                                    if (build[c][1] === "true") {
                                        cspace = true;
                                    } else if (build[c][1] === "false") {
                                        cspace = false;
                                    }
                                } else if (build[c][0] === "lang") {
                                    if (build[c][1] === "auto") {
                                        clang = "auto";
                                    } else if (build[c][1] === "javascript") {
                                        clang = "javascript";
                                    } else if (build[c][1] === "css") {
                                        clang = "csv";
                                    } else if (build[c][1] === "csv") {
                                        clang = "csv";
                                    } else if (build[c][1] === "markup") {
                                        clang = "markup";
                                    } else if (build[c][1] === "text") {
                                        clang = "text";
                                    }
                                } else if (build[c][0] === "langdefault") {
                                    if (build[c][1] === "javascript") {
                                        clang = "javascript";
                                    } else if (build[c][1] === "css") {
                                        clang = "csv";
                                    } else if (build[c][1] === "csv") {
                                        clang = "csv";
                                    } else if (build[c][1] === "markup") {
                                        clang = "markup";
                                    } else if (build[c][1] === "text") {
                                        clang = "text";
                                    }
                                } else if (build[c][0] === "mode") {
                                    if (build[c][1] === "beautify") {
                                        cmode = "beautify";
                                    } else if (build[c][1] === "minify") {
                                        cmode = "minify";
                                    } else if (build[c][1] === "diff") {
                                        cmode = "diff";
                                    } else if (build[c][1] === "parse") {
                                        cmode = "parse";
                                    }
                                } else if (build[c][0] === "obfuscate") {
                                    if (build[c][1] === "true") {
                                        cobfuscate = true;
                                    } else if (build[c][1] === "false") {
                                        cobfuscate = false;
                                    }
                                } else if (build[c][0] === "objsort") {
                                    if (build[c][1] === "all" || build[c][1] === "true") {
                                        cobjsort = true;
                                    } else if (build[c][1] === "css" && clang !== "javascript") {
                                        cobjsort = true;
                                    } else if (build[c][1] === "js" && clang !== "css") {
                                        cobjsort = true;
                                    } else if (build[c][1] === "none" || build[c][1] === "false") {
                                        cobjsort = false;
                                    }
                                } else if (build[c][0] === "preserve") {
                                    if (build[c][1] === "all" || build[c][1] === "true") {
                                        cpreserve = true;
                                    } else if (build[c][1] === "css" && clang !== "javascript") {
                                        cpreserve = true;
                                    } else if (build[c][1] === "js" && clang !== "css") {
                                        cpreserve = true;
                                    } else if (build[c][1] === "none" || build[c][1] === "false") {
                                        cpreserve = false;
                                    }
                                } else if (build[c][0] === "quote") {
                                    if (build[c][1] === "true") {
                                        cquote = true;
                                    } else if (build[c][1] === "false") {
                                        cquote = false;
                                    }
                                } else if (build[c][0] === "quoteConvert") {
                                    if (build[c][1] === "single") {
                                        cquoteConvert = "single";
                                    } else if (build[c][1] === "double") {
                                        cquoteConvert = "double";
                                    } else if (build[c][1] === "none") {
                                        cquoteConvert = "none";
                                    }
                                } else if (build[c][0] === "semicolon") {
                                    if (build[c][1] === "true") {
                                        csemicolon = true;
                                    } else if (build[c][1] === "false") {
                                        csemicolon = false;
                                    }
                                } else if (build[c][0] === "sourcelabel") {
                                    csourcelabel = build[c][1];
                                } else if (build[c][0] === "style") {
                                    if (build[c][1] === "indent") {
                                        cstyle = "indent";
                                    } else if (build[c][1] === "noindent") {
                                        cstyle = "noindent";
                                    }
                                } else if (build[c][0] === "styleguide") {
                                    cstyleguide = build[c][1];
                                } else if (build[c][0] === "titanium") {
                                    if (build[c][1] === "true") {
                                        ctitanium = true;
                                    } else if (build[c][1] === "false") {
                                        ctitanium = false;
                                    }
                                } else if (build[c][0] === "topcoms") {
                                    if (build[c][1] === "true") {
                                        ctopcoms = true;
                                    } else if (build[c][1] === "false") {
                                        ctopcoms = false;
                                    }
                                } else if (build[c][0] === "varword") {
                                    if (build[c][1] === "each") {
                                        cvarword = "each";
                                    } else if (build[c][1] === "list") {
                                        cvarword = "list";
                                    } else if (build[c][1] === "none") {
                                        cvarword = "none";
                                    }
                                } else if (build[c][0] === "vertical") {
                                    if (build[c][1] === "all" || build[c][1] === "true") {
                                        cvertical = true;
                                    } else if (build[c][1] === "css" && clang !== "javascript") {
                                        cvertical = true;
                                    } else if (build[c][1] === "js" && clang !== "css") {
                                        cvertical = true;
                                    } else if (build[c][1] === "none" || build[c][1] === "false") {
                                        cvertical = false;
                                    }
                                } else if (build[c][0] === "wrap" && isNaN(build[c][1]) === false) {
                                    cwrap = Number(build[c][1]);
                                }
                            }
                        }
                    };
                if (api.preserve === true || api.preserve === "true") {
                    cpreserve = true;
                }
                if (api.alphasort === true || api.alphasort === "true" || api.objsort === true || api.objsort === "true") {
                    cobjsort = true;
                }
                if (api.indent === "allman") {
                    cbraces = "allman";
                }
                if (api.vertical === true || api.vertical === "true") {
                    cvertical = true;
                }
                if (csource === "Source sample is missing.") {
                    return [
                        "Error: Source sample is missing.", ""
                    ];
                }
                if (cdiff === "Diff sample is missing." && cmode === "diff") {
                    return [
                        "Error: Diff sample is missing.", ""
                    ];
                }
                if (clang === "html") {
                    chtml = true;
                    clang = "markup";
                } else if (clang === "tss" || clang === "titanium") {
                    ctitanium = true;
                    clang     = "javscript";
                }
                if (clang === "auto") {
                    autoval = auto(csource);
                    clang   = autoval[1];
                    if (autoval[2] === "unknown") {
                        autostring = "<p>Code type set to <strong>auto</strong>, but language could not be determined." +
                                " Language defaulted to <em>" + autoval[0] + "</em>.</p>";
                    } else {
                        autostring = "<p>Code type set to <strong>auto</strong>. Presumed language is <em>" + autoval[2] + "</em>.</p>";
                    }
                } else if (capi === "dom") {
                    autoval    = [
                        clang, clang, clang
                    ];
                    autostring = "<p>Code type is set to <strong>" + clang + "</strong>.</p>";
                } else {
                    clang      = setlangmode(clang);
                    autostring = "<p>Code type is set to <strong>" + clang + "</strong>.</p>";
                }
                pdcomment();
                if (clang === "css") {
                    if (api.objsort === "js") {
                        cobjsort = false;
                    }
                    if (api.preserve === "js") {
                        cpreserve = false;
                    }
                    if (api.vertical === "js") {
                        cvertical = false;
                    }
                }
                if (clang === "js") {
                    if (api.objsort === "css") {
                        cobjsort = false;
                    }
                    if (api.preserve === "css") {
                        cpreserve = false;
                    }
                    if (api.vertical === "css") {
                        cvertical = false;
                    }
                }
                if (cmode === "minify") {
                    if (clang === "css") {
                        apioutput = csspretty({
                            mode        : cmode,
                            objsort     : cobjsort,
                            quoteConvert: cquoteConvert,
                            source      : csource,
                            topcoms     : ctopcoms
                        });
                    } else if (clang === "csv") {
                        apioutput = csvmin(csource, ccsvchar);
                    } else if (clang === "markup") {
                        apioutput = markuppretty({
                            conditional : ccond,
                            mode        : cmode,
                            objsort     : cobjsort,
                            presume_html: chtml,
                            quoteConvert: cquoteConvert,
                            source      : csource,
                            styleguide  : cstyleguide,
                            tagmerge    : ctagmerge,
                            top_comments: ctopcoms
                        });
                    } else if (clang === "text") {
                        apioutput  = csource;
                        apidiffout = "";
                    } else {
                        apioutput = jspretty({
                            correct     : ccorrect,
                            mode        : cmode,
                            obfuscate   : cobfuscate,
                            objsort     : cobjsort,
                            quoteConvert: cquoteConvert,
                            source      : csource,
                            styleguide  : cstyleguide,
                            titanium    : ctitanium,
                            topcoms     : ctopcoms,
                            varword     : cvarword,
                            wrap        : -1
                        });
                    }
                    return (function core__minifyReport() {
                        var sizediff = function core__minifyReport_score() {
                            var a                 = 0,
                                lines             = 0,
                                source            = csource,
                                sizeOld           = source.length,
                                windowsSize       = 0,
                                sizeNew           = apioutput.length,
                                sizeDifference    = sizeOld - sizeNew,
                                windowsDifference = 0,
                                percent           = ((sizeDifference / sizeOld) * 100),
                                percentUnix       = percent.toFixed(2) + "%",
                                percentWindows    = "",
                                output            = [];
                            for (a = 0; a < sizeOld; a += 1) {
                                if (source.charAt(a) === "\n") {
                                    lines += 1;
                                }
                            }
                            windowsSize       = sizeOld + lines;
                            windowsDifference = windowsSize - sizeNew;
                            percent           = ((windowsDifference / windowsSize) * 100);
                            percentWindows    = percent.toFixed(2) + "%";
                            if (summary.indexOf("<p id='jserror'>") === 0) {
                                output.push(summary);
                            } else if (summary !== "") {
                                output.push("<p><strong class='duplicate'>Duplicate id attribute values detected:</strong> " + summary + "</p>");
                            }
                            output.push("<div class='doc'><table class='analysis' summary='Minification efficiency report" +
                                    "'><caption>Minification efficiency report</caption><thead><tr><th colspan='2'>Ou" +
                                    "tput Size</th><th colspan='2'>Number of Lines From Input</th></tr></thead><tbody" +
                                    "><tr><td colspan='2'>");
                            output.push(sizeNew);
                            output.push("</td><td colspan='2'>");
                            output.push(lines + 1);
                            output.push("</td></tr><tr><th>Operating System</th><th>Input Size</th><th>Size Difference</t" +
                                    "h><th>Percentage of Decrease</th></tr><tr><th>Unix/Linux</th><td>");
                            output.push(sizeOld);
                            output.push("</td><td>");
                            output.push(sizeDifference);
                            output.push("</td><td>");
                            output.push(percentUnix);
                            output.push("</td></tr><tr><th>Windows</th><td>");
                            output.push(windowsSize);
                            output.push("</td><td>");
                            output.push(windowsDifference);
                            output.push("</td><td>");
                            output.push(percentWindows);
                            output.push("</td></tr></tbody></table></div>");
                            return output.join("");
                        };
                        if (jsxstatus === true) {
                            autoval    = [
                                "jsx", "javascript", "React JSX"
                            ];
                            autostring = "<p>Code type set to <strong>auto</strong>. Presumed language is <em>React JSX</e" +
                                             "m>.</p>";
                        }
                        return [
                            apioutput, autostring + proctime() + sizediff()
                        ];
                    }());
                }
                if (cmode === "parse") {
                    if (clang === "css") {
                        apioutput = csspretty({
                            mode        : cmode,
                            objsort     : cobjsort,
                            quoteConvert: cquoteConvert,
                            source      : csource
                        });
                    } else if (clang === "csv") {
                        apioutput  = "CSV not supported in parse mode";
                        apidiffout = "";
                    } else if (clang === "markup") {
                        apioutput  = markuppretty({
                            correct     : ccorrect,
                            html        : chtml,
                            mode        : cmode,
                            objsort     : cobjsort,
                            quoteConvert: cquoteConvert,
                            source      : csource,
                            tagmerge    : ctagmerge,
                            varword     : cvarword
                        });
                        autostring = autostring + summary;
                    } else if (clang === "text") {
                        apioutput  = csource;
                        apidiffout = "";
                    } else {
                        apioutput = jspretty({
                            correct     : ccorrect,
                            mode        : cmode,
                            objsort     : cobjsort,
                            quoteConvert: cquoteConvert,
                            source      : csource,
                            titanium    : ctitanium,
                            varword     : cvarword
                        });
                    }
                    if (apidiffout === false) {
                        apidiffout = "";
                    }
                    if (jsxstatus === true) {
                        autostring = "<p>Code type is presumed to be <em>React JSX</em>.</p>";
                    }
                    if (apioutput.token !== undefined) {
                        autostring = autostring + "<p>Total tokens: <strong>" + apioutput.token.length + "</strong></p>";
                    }
                    return [
                        apioutput, autostring + proctime()
                    ];
                }
                if (cmode === "beautify") {
                    if (clang === "css") {
                        apioutput  = csspretty({
                            comm          : ccomm,
                            cssinsertlines: ccssinsertlines,
                            inchar        : cinchar,
                            insize        : cinsize,
                            mode          : cmode,
                            objsort       : cobjsort,
                            preserve      : cpreserve,
                            quoteConvert  : cquoteConvert,
                            source        : csource,
                            vertical      : (api.vertical === "jsonly")
                                ? false
                                : cvertical
                        });
                        apidiffout = summary;
                    } else if (clang === "csv") {
                        apioutput  = csvbeauty(csource, ccsvchar);
                        apidiffout = "";
                    } else if (clang === "markup") {
                        apioutput  = markuppretty({
                            accessibility: caccessibility,
                            braceline    : cbraceline,
                            bracepadding : cbracepadding,
                            braces       : cbraces,
                            comments     : ccomm,
                            correct      : ccorrect,
                            force_indent : cforce,
                            html         : chtml,
                            inchar       : cinchar,
                            inlevel      : cinlevel,
                            insize       : cinsize,
                            mode         : cmode,
                            objsort      : cobjsort,
                            preserve     : cpreserve,
                            quoteConvert : cquoteConvert,
                            source       : csource,
                            space        : cspace,
                            style        : cstyle,
                            styleguide   : cstyleguide,
                            tagmerge     : ctagmerge,
                            varword      : cvarword,
                            vertical     : (api.vertical === "jsonly")
                                ? "jsonly"
                                : cvertical,
                            wrap         : cwrap
                        });
                        apidiffout = summary;
                        if (cinchar !== "\t") {
                            apioutput = apioutput.replace(/\n[\t]*\u0020\/>/g, "");
                        }
                    } else if (clang === "text") {
                        apioutput  = csource;
                        apidiffout = "";
                    } else {
                        apioutput  = jspretty({
                            braceline   : cbraceline,
                            bracepadding: cbracepadding,
                            braces      : cbraces,
                            comments    : ccomm,
                            correct     : ccorrect,
                            elseline    : celseline,
                            inchar      : cinchar,
                            inlevel     : cinlevel,
                            insize      : cinsize,
                            jsscope     : cjsscope,
                            objsort     : cobjsort,
                            preserve    : cpreserve,
                            quoteConvert: cquoteConvert,
                            source      : csource,
                            space       : cspace,
                            styleguide  : cstyleguide,
                            titanium    : ctitanium,
                            varword     : cvarword,
                            vertical    : (api.vertical === "jsonly")
                                ? true
                                : cvertical,
                            wrap        : cwrap
                        });
                        apidiffout = summary;
                    }
                    if (apidiffout === false) {
                        apidiffout = "";
                    }
                    if (jsxstatus === true) {
                        autostring = "<p>Code type is presumed to be <em>React JSX</em>.</p>";
                    }
                    if (capi === "" && cjsscope !== "none" && clang === "javascript") {
                        builder.head       = "<?xml version='1.0' encoding='UTF-8' ?><!DOCTYPE html PUBLIC '-//W3C//DTD XHTML " +
                                                 "1.1//EN' 'http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd'><html xmlns='http://www." +
                                                 "w3.org/1999/xhtml' xml:lang='en'><head><title>Pretty Diff - The difference tool<" +
                                                 "/title><meta name='robots' content='index, follow'/> <meta name='DC.title' conte" +
                                                 "nt='Pretty Diff - The difference tool'/> <link rel='canonical' href='http://pret" +
                                                 "tydiff.com/' type='application/xhtml+xml'/><meta http-equiv='Content-Type' conte" +
                                                 "nt='application/xhtml+xml;charset=UTF-8'/><meta http-equiv='Content-Style-Type' " +
                                                 "content='text/css'/><style type='text/css'>";
                        builder.cssCore    = "body{font-family:'Arial';font-size:10px;overflow-y:scroll;}#samples #dcolorSchem" +
                                                 "e{position:relative;z-index:1000}#apireturn textarea{font-size:1.2em;height:50em" +
                                                 ";width:100%}button{border-radius:.9em;display:block;font-weight:bold;width:100%}" +
                                                 "div .button{text-align:center}div button{display:inline-block;font-weight:bold;m" +
                                                 "argin:1em 0;padding:1em 2em}button:hover{cursor:pointer}#introduction{clear:both" +
                                                 ";margin:0 0 0 5.6em;position:relative;top:-2.75em}#introduction ul{clear:both;he" +
                                                 "ight:3em;margin:0 0 0 -5.5em;overflow:hidden;width:100em}#introduction li{clear:" +
                                                 "none;display:block;float:left;font-size:1.4em;margin:0 4.95em -1em 0}#introducti" +
                                                 "on li li{font-size:1em;margin-left:2em}#introduction .information,#webtool #intr" +
                                                 "oduction h2{left:-90em;position:absolute;top:0;width:10em}#introduction h2{float" +
                                                 ":none}#displayOps{float:right;font-size:1.5em;font-weight:bold;margin-right:1em;" +
                                                 "width:22.5em}#displayOps.default{position:static}#displayOps.maximized{margin-bo" +
                                                 "ttom:-2em;position:relative}#displayOps li{clear:none;display:block;float:left;l" +
                                                 "ist-style:none;margin:2em 0 0;text-align:right;width:9em}h1{float:left;font-size" +
                                                 ":2em;margin:0 .5em .5em 0}#hideOptions{margin-left:5em;padding:0}#title_text{bor" +
                                                 "der-style:solid;border-width:.05em;display:block;float:left;font-size:1em;margin" +
                                                 "-left:.55em;padding:.1em}h1 svg,h1 img{border-style:solid;border-width:.05em;flo" +
                                                 "at:left;height:2em;width:2em}h1 span{font-size:.5em}h2,h3{background:#fff;border" +
                                                 "-style:solid;border-width:.075em;display:inline-block;font-size:1.8em;font-weigh" +
                                                 "t:bold;margin:0 .5em .5em 0;padding:0 .2em}#doc h3{margin-top:.5em}h3{font-size:" +
                                                 "1.6em}h4{font-size:1.4em}fieldset{border-radius:.9em;clear:both;margin:3.5em 0 -" +
                                                 "2em;padding:0 0 0 1em}legend{border-style:solid;border-width:.1em;font-size:1.2e" +
                                                 "m;font-weight:bold;margin-left:-.25em}.button{margin:1em 0;text-align:center}.bu" +
                                                 "tton button{display:block;font-size:2em;height:1.5em;margin:0 auto;padding:0;wid" +
                                                 "th:50%}#diffreport{right:57.8em}#beaureport{right:38.8em}#minnreport{right:19.8e" +
                                                 "m}#statreport{right:.8em}#statreport .body p,#statreport .body li,#statreport .b" +
                                                 "ody h3{font-size:1.2em}#statreport .body h3{margin-top:0}#statreport .body ul{ma" +
                                                 "rgin-top:1em}#reports{height:4em}#reports h2{display:none}.box{border-style:soli" +
                                                 "d;border-width:0;left:auto;margin:0;padding:0;position:absolute;z-index:10}.box " +
                                                 "button{border-radius:0;border-style:solid;border-width:.1em;display:block;float:" +
                                                 "right;font-family:'Lucida Console','Trebuchet MS','Arial';height:1.75em;padding:" +
                                                 "0;position:absolute;right:0;text-align:center;top:0;width:1.75em;z-index:7}.box " +
                                                 "button.resize{border-width:.05em;cursor:se-resize;font-size:1.667em;font-weight:" +
                                                 "normal;height:.8em;line-height:.5em;margin:-.85em 0 0;position:absolute;right:.0" +
                                                 "5em;top:100%;width:.85em}.box button.minimize{margin:.35em 4em 0 0}.box button.m" +
                                                 "aximize{margin:.35em 1.75em 0 0}.box button.save{margin:.35em 6.25em 0 0}.box .b" +
                                                 "uttons{float:right;margin:0}.box h3.heading{cursor:pointer;float:left;font-size:" +
                                                 "1em;height:3em;margin:0 0 -3.2em;position:relative;width:17em;z-index:6}.box h3." +
                                                 "heading span{display:block;font-size:1.8em;padding:.25em 0 0 .5em}.box .body{cle" +
                                                 "ar:both;height:20em;margin-top:-.1em;overflow:scroll;padding:4.25em 1em 1em;posi" +
                                                 "tion:relative;right:0;top:0;width:75em;z-index:5}.options{border-radius:0 0 .9em" +
                                                 " .9em;clear:both;margin-bottom:1em;padding:1em 1em 3.5em;width:auto}label{displa" +
                                                 "y:inline;font-size:1.4em}ol li{font-size:1.4em;list-style-type:decimal}ol li li{" +
                                                 "font-size:1em}body#doc ol li{font-size:1.1em}ul{margin:-1.4em 0 2em;padding:0}ul" +
                                                 " li{list-style-type:none}li{clear:both;margin:1em 0 1em 3em}li h4{display:inline" +
                                                 ";float:left;margin:.4em 0;text-align:left;width:14em}p{clear:both;font-size:1.2e" +
                                                 "m;margin:0 0 1em}#option_comment{height:2.5em;margin-bottom:-1.5em;width:100%}.d" +
                                                 "ifflabel{display:block;height:0}#beau-other-span,#diff-other-span{text-indent:-2" +
                                                 "00em;width:0}.options p span{display:block;float:left;font-size:1.2em}#top{min-w" +
                                                 "idth:80em}#top em{font-weight:bold}#update{clear:left;float:right;font-weight:bo" +
                                                 "ld;padding:.5em;position:absolute;right:1em;top:11em}#announcement{height:2.5em;" +
                                                 "margin:0 -5em -4.75em;width:27.5em}#textreport{width:100%}#options{float:left;ma" +
                                                 "rgin:0;width:19em}#options label{width:auto}#options p{clear:both;font-size:1em;" +
                                                 "margin:0;padding:0}#options p span{clear:both;float:none;height:2em;margin:0 0 0" +
                                                 " 2em}#csvchar{width:11.8em}#language,#csvchar,#colorScheme{margin:0 0 1em 2em}#c" +
                                                 "odeInput{margin-left:22.5em}#Beautify.wide p,#Beautify.tall p.file,#Minify.wide " +
                                                 "p,#Minify.tall p.file{clear:none;float:none}#diffops p,#miniops p,#beauops p{cle" +
                                                 "ar:both;font-size:1em;padding-top:1em}#options p strong,#diffops p strong,#minio" +
                                                 "ps p strong,#beauops p strong,#options .label,#diffops .label,#miniops .label,#b" +
                                                 "eauops .label{display:block;float:left;font-size:1.2em;font-weight:bold;margin-b" +
                                                 "ottom:1em;width:17.5em}input[type='radio']{margin:0 .25em}input[type='file']{box" +
                                                 "-shadow:none}select{border-style:inset;border-width:.1em;width:11.85em}.options " +
                                                 "input,.options label{border-style:none;display:block;float:left}.options span la" +
                                                 "bel{margin-left:.4em;white-space:nowrap;width:12em}.options p span label{font-si" +
                                                 "ze:1em}#webtool .options input[type=text]{margin-right:1em;width:11.6em}#webtool" +
                                                 " .options input[type=text],div input,textarea{border-style:inset;border-width:.1" +
                                                 "em}textarea{display:inline-block;height:10em;margin:0}strong label{font-size:1em" +
                                                 ";width:inherit}strong.new{background:#ff6;font-style:italic}#miniops span strong" +
                                                 ",#diffops span strong,#beauops span strong{display:inline;float:none;font-size:1" +
                                                 "em;width:auto}#Beautify .input label,#Beautify .output label,#Minify .input labe" +
                                                 "l,#Minify .output label{display:block;font-size:1.05em;font-weight:bold}#beautyi" +
                                                 "nput,#minifyinput,#baseText,#newText,#beautyoutput,#minifyoutput{font-size:1em}." +
                                                 "clear{clear:both;display:block}.wide,.tall,#diffBase,#diffNew{border-radius:0 0 " +
                                                 ".9em .9em;margin-bottom:1em}#diffBase,#diffNew{padding:1em}#diffBase p,#diffNew " +
                                                 "p{clear:none;float:none}#diffBase.wide textarea,#diffNew.wide textarea{height:10" +
                                                 ".1em}.wide,.tall{padding:1em 1.25em 0}#diff .addsource{cursor:pointer;margin-bot" +
                                                 "tom:1em;padding:0}#diff .addsource input{display:block;float:left;margin:.5em .5" +
                                                 "em -1.5em}#diff .addsource label{cursor:pointer;display:inline-block;font-size:1" +
                                                 ".2em;padding:.5em .5em .5em 2em}.wide label{float:none;margin-right:0;width:100%" +
                                                 "}.wide #beautyinput,.wide #minifyinput,.wide #beautyoutput,.wide #minifyoutput{h" +
                                                 "eight:14.8em;margin:0;width:99.5%}.tall .input{clear:none;float:left}.tall .outp" +
                                                 "ut{clear:none;float:right;margin-top:-2.4em}.tall .input,.tall .output{width:49%" +
                                                 "}.tall .output label{text-align:right}.tall .input textarea{height:31.7em}.tall " +
                                                 ".output textarea{height:34em}.tall textarea{margin:0 0 -.1em;width:100%}.tall #b" +
                                                 "eautyinput,.tall #minifyinput{float:left}.tall #beautyoutput,.tall #minifyoutput" +
                                                 "{float:right}.wide{width:auto}#diffBase.difftall,#diffNew.difftall{margin-bottom" +
                                                 ":1.3em;padding:1em 1% .9em;width:47.5%}#diffBase.difftall{float:left}#diffNew.di" +
                                                 "fftall{float:right}.file input,.labeltext input{display:inline-block;margin:0 .7" +
                                                 "em 0 0;width:16em}.labeltext,.file{font-size:.9em;font-weight:bold;margin-bottom" +
                                                 ":1em}.difftall textarea{height:30.6em;margin-bottom:.5em}#diffBase textarea,#dif" +
                                                 "fNew textarea{width:99.5%}.input,.output{margin:0}#diffBase.wide,#diffNew.wide{p" +
                                                 "adding:.8em 1em}#diffBase.wide{margin-bottom:1.2em}#diffoutput{width:100%}#diffo" +
                                                 "utput p em,#diffoutput li em,.analysis .bad,.analysis .good{font-weight:bold}#di" +
                                                 "ffoutput ul{font-size:1.2em;margin-top:1em}#diffoutput ul li{display:list-item;l" +
                                                 "ist-style-type:disc}.analysis th{text-align:left}.analysis td{text-align:right}#" +
                                                 "doc ul{margin-top:1em}#doc ul li{font-size:1.2em}body#doc ul li{font-size:1.1em}" +
                                                 "#doc ol li span{display:block;margin-left:2em}.diff,.beautify{border-style:solid" +
                                                 ";border-width:.2em;display:inline-block;font-family:'Courier New',Courier,'Lucid" +
                                                 "a Console',monospace;margin:0 1em 1em 0;position:relative}.beautify .data em{dis" +
                                                 "play:inline-block;font-style:normal;font-weight:bold;padding-top:.5em}.diff .ski" +
                                                 "p{border-style:none none solid;border-width:0 0 .1em}.diff li,.diff p,.diff h3,." +
                                                 "beautify li{font-size:1.1em}.diff .diff-left,.diff .diff-right{display:table-cel" +
                                                 "l}.diff .diff-left{border-style:none none none solid;border-width:0 0 0 .1em}.di" +
                                                 "ff .diff-right{border-style:none none none solid;border-width:0 0 0 .1em;margin-" +
                                                 "left:-.1em;min-width:16.5em;right:0;top:0}.diff-right .data ol{min-width:16.5em}" +
                                                 ".diff-right .data{border-style:none solid none none;border-width:0 .1em 0 0;widt" +
                                                 "h:100%}.diff-right .data li{min-width:16.5em}.diff ol,.beautify ol{display:table" +
                                                 "-cell;margin:0;padding:0}.diff li,.beautify li{border-style:none none solid;bord" +
                                                 "er-width:0 0 .1em;display:block;line-height:1.2;list-style-type:none;margin:0;pa" +
                                                 "dding-bottom:0;padding-right:.5em}.diff li{padding-top:.5em}.beautify .count li{" +
                                                 "padding-top:.5em}@media screen and (-webkit-min-device-pixel-ratio:0) {.beautify" +
                                                 " .count li{padding-top:.546em}}#doc .beautify .count li.fold{color:#900;cursor:p" +
                                                 "ointer;font-weight:bold;padding-left:.5em}.diff .count,.beautify .count{border-s" +
                                                 "tyle:solid;border-width:0 .1em 0 0;font-weight:normal;padding:0;text-align:right" +
                                                 "}.diff .count li,.beautify .count li{padding-left:2em}.diff .data,.beautify .dat" +
                                                 "a{text-align:left;white-space:pre}.diff .data li,.beautify .data li{letter-spaci" +
                                                 "ng:.1em;padding-left:.5em;white-space:pre}#webtool .diff h3{border-style:none so" +
                                                 "lid solid;border-width:0 .1em .2em;box-shadow:none;display:block;font-family:Ver" +
                                                 "dana;margin:0 0 0 -.1em;padding:.2em 2em;text-align:left}.diff li em{font-style:" +
                                                 "normal;margin:0 -.09em;padding:.05em 0}.diff p.author{border-style:solid;border-" +
                                                 "width:.2em .1em .1em;margin:0;overflow:hidden;padding:.4em;text-align:right}#dco" +
                                                 "lorScheme{float:right;margin:-2em 0 0 0}#dcolorScheme label{display:inline-block" +
                                                 ";font-size:1em;margin-right:1em}body#doc{font-size:.8em;max-width:80em}#doc th{f" +
                                                 "ont-weight:bold}#doc td span{display:block}#doc table,.box .body table{border-co" +
                                                 "llapse:collapse;border-style:solid;border-width:.2em;clear:both}#doc table{font-" +
                                                 "size:1.2em}body#doc table{font-size:1em}#doc td,#doc th{border-left-style:solid;" +
                                                 "border-left-width:.1em;border-top-style:solid;border-top-width:.1em;padding:.5em" +
                                                 "}#doc em,.box .body em{font-style:normal;font-weight:bold}#doc div{margin-bottom" +
                                                 ":2em}#doc div div{clear:both;margin-bottom:1em}#doc h2{font-size:1.6em;margin:.5" +
                                                 "em .5em .5em 0}#doc ol{clear:both}#doc_contents li{font-size:1.75em;margin:1em 0" +
                                                 " 0}#doc_contents ol ol li{font-size:.75em;list-style:lower-alpha;margin:.5em 0 0" +
                                                 "}#doc_contents ol{padding-bottom:1em}#doc #doc_contents ol ol{background-color:i" +
                                                 "nherit;border-style:none;margin:.25em .3em 0 0;padding-bottom:0}#doc_contents a{" +
                                                 "text-decoration:none}#diffoutput #thirdparties li{display:inline-block;list-styl" +
                                                 "e-type:none}#thirdparties a{border-style:none;display:block;height:4em;text-deco" +
                                                 "ration:none}button,fieldset,.box h3.heading,.box .body,.options,.diff .replace e" +
                                                 "m,.diff .delete em,.diff .insert em,.wide,.tall,#diffBase,#diffNew,#doc div,#doc" +
                                                 " div div,#doc ol,#option_comment,#update,#thirdparties img,#diffoutput #thirdpar" +
                                                 "ties{border-style:solid;border-width:.1em}#apitest p{clear:both;padding-top:.75e" +
                                                 "m}#apitest label,#apitest select,#apitest input,#apitest textarea{float:left}#ap" +
                                                 "itest label{width:20em}#apitest select,#apitest input,#apitest textarea{width:30" +
                                                 "em}#pdsamples{list-style-position:inside;margin:-12em 0 0 0;padding:0;position:r" +
                                                 "elative;z-index:10}#pdsamples li{border-radius:1em;border-style:solid;border-wid" +
                                                 "th:.1em;margin:0 0 3em;padding:1em}#pdsamples li div{border-radius:1em;border-st" +
                                                 "yle:solid;border-width:.1em;margin:0;padding:1em}#pdsamples li p{display:inline-" +
                                                 "block;font-size:1em;margin:0}#pdsamples li p a{display:block;margin:0 0 1em 2em}" +
                                                 "#pdsamples li ul{margin:0 0 0 2em}#samples #pdsamples li li{background:none tran" +
                                                 "sparent;border-style:none;display:list-item;list-style:disc outside;margin:0;pad" +
                                                 "ding:.5em}#modalSave span{background:#000;display:block;left:0;opacity:.5;positi" +
                                                 "on:absolute;top:0;z-index:9000}#modalSave p{background:#eee;color:#333;font-size" +
                                                 ":3em;padding:1em;position:absolute;text-align:center;top:10em;width:25em;z-index" +
                                                 ":9001}#modalSave p em{display:block;font-size:.75em;margin-top:1em}#modalSave p " +
                                                 "strong{color:#c00;font-weight:bold}@media print{p,.options,#Beautify,#Minify,#di" +
                                                 "ff,ul{display:none}div{width:100%}html td{font-size:.8em;white-space:normal}}";
                        builder.cssColor   = "html .white,body.white{color:#333}body.white button{background:#eee;border-color" +
                                                 ":#222;box-shadow:0 .1em .2em rgba(64,64,64,0.75);color:#666;text-shadow:.05em .0" +
                                                 "5em .1em #ccc}.white button:hover,.white button:active{background:#999;color:#ee" +
                                                 "e;text-shadow:.1em .1em .1em #333}.white a{color:#009}.white #title_text{border-" +
                                                 "color:#fff;color:#333}.white #introduction h2{border-color:#999;color:#333}.whit" +
                                                 "e h1 svg{background:#eee;border-color:#999;box-shadow:0 .1em .2em rgba(150,150,1" +
                                                 "50,0.5)}.white h2,.white h3{background:#eee;border-color:#eee;box-shadow:none;pa" +
                                                 "dding-left:0;text-shadow:none}.white fieldset{background:#ddd;border-color:#999}" +
                                                 ".white legend{background:#fff;border-color:#999;color:#333;text-shadow:none}.whi" +
                                                 "te .box{background:#666;border-color:#999;box-shadow:0 .4em .8em rgba(64,64,64,0" +
                                                 ".75)}.white .box button{box-shadow:0 .1em .2em rgba(0,0,0,0.75);text-shadow:.1em" +
                                                 " .1em .1em rgba(0,0,0,.5)}.white .box button.resize{background:#bbf;border-color" +
                                                 ":#446;color:#446}.white .box button.resize:hover{background:#ddf;border-color:#2" +
                                                 "28;color:#228}.white .box button.save{background:#d99;border-color:#300;color:#3" +
                                                 "00}.white .box button.save:hover{background:#fcc;border-color:#822;color:#822}.w" +
                                                 "hite .box button.minimize{background:#bbf;border-color:#006;color:#006}.white .b" +
                                                 "ox button.minimize:hover{background:#eef;border-color:#228;color:#228}.white .bo" +
                                                 "x button.maximize{background:#9c9;border-color:#030;color:#030}.white .box butto" +
                                                 "n.maximize:hover{background:#cfc;border-color:#060;color:#060}.white .box h3.hea" +
                                                 "ding{background:#ddd;border-color:#888;box-shadow:.2em .2em .4em #666}.white .bo" +
                                                 "x h3.heading:hover{background:#333;color:#eee}.white .box .body{background:#eee;" +
                                                 "border-color:#888;box-shadow:0 0 .4em rgba(64,64,64,0.75)}.white .options{backgr" +
                                                 "ound:#eee;border-color:#999;box-shadow:0 .2em .4em rgba(64,64,64,0.5);text-shado" +
                                                 "w:.05em .05em .1em #ccc}.white .options h2,.white #Beautify h2,.white #Minify h2" +
                                                 ",.white #diffBase h2,.white #diffNew h2{background:#eee;border-color:#eee;box-sh" +
                                                 "adow:none;text-shadow:none}.white #option_comment{background:#ddd;border-color:#" +
                                                 "999}.white #top em{color:#00f}.white #update{background:#eee;border-color:#999;b" +
                                                 "ox-shadow:0 .1em .2em rgba(64,64,64,0.5)}.white .wide,.white .tall,.white #diffB" +
                                                 "ase,.white #diffNew{background:#eee;border-color:#999;box-shadow:0 .2em .4em rgb" +
                                                 "a(64,64,64,0.5)}.white .file input,.white .labeltext input{border-color:#fff}#we" +
                                                 "btool.white input.unchecked{background:#ccc;color:#666}.white .options input[typ" +
                                                 "e=text],.white .options select{border-color:#999}.white #beautyoutput,.white #mi" +
                                                 "nifyoutput{background:#ddd}.white #diffoutput p em,.white #diffoutput li em{colo" +
                                                 "r:#c00}.white .analysis .bad{background-color:#ebb;color:#400}.white .analysis ." +
                                                 "good{background-color:#cec;color:#040}.white #doc .analysis thead th,.white #doc" +
                                                 " .analysis th[colspan]{background:#eef}.white div input{border-color:#999}.white" +
                                                 " textarea{border-color:#999}.white textarea:hover{background:#eef8ff}.white .dif" +
                                                 "f,.white .beautify,.white .diff ol,.white .beautify ol,.white .diff .diff-left,." +
                                                 "white .diff .diff-right,.white h3,.white p.author{border-color:#999}.white .diff" +
                                                 " .count li,.white .beautify .count li{background:#eed;border-color:#bbc;color:#8" +
                                                 "86}.white .diff h3{background:#ddd;border-bottom-color:#bbc}.white .diff .empty{" +
                                                 "background-color:#ddd;border-color:#ccc}.white .diff .replace{background-color:#" +
                                                 "fea;border-color:#dd8}.white .diff .data .replace em{background-color:#ffd;borde" +
                                                 "r-color:#963;color:#630}.white .diff .delete{background-color:#fbb;border-color:" +
                                                 "#eaa}.white .diff .data .delete em{background-color:#fdd;border-color:#700;color" +
                                                 ":#600}.white .diff .equal,.white .beautify .data li{background-color:#fff;border" +
                                                 "-color:#eee}.white .beautify .data em.s1{color:#f66}.white .beautify .data em.s2" +
                                                 "{color:#12f}.white .beautify .data em.s3{color:#090}.white .beautify .data em.s4" +
                                                 "{color:#d6d}.white .beautify .data em.s5{color:#7cc}.white .beautify .data em.s6" +
                                                 "{color:#c85}.white .beautify .data em.s7{color:#737}.white .beautify .data em.s8" +
                                                 "{color:#6d0}.white .beautify .data em.s9{color:#dd0s}.white .beautify .data em.s" +
                                                 "10{color:#893}.white .beautify .data em.s11{color:#b97}.white .beautify .data em" +
                                                 ".s12{color:#bbb}.white .beautify .data em.s13{color:#cc3}.white .beautify .data " +
                                                 "em.s14{color:#333}.white .beautify .data em.s15{color:#9d9}.white .beautify .dat" +
                                                 "a em.s16{color:#880}.white .beautify .data .l0{background:#fff}.white .beautify " +
                                                 ".data .l1{background:#fed}.white .beautify .data .l2{background:#def}.white .bea" +
                                                 "utify .data .l3{background:#efe}.white .beautify .data .l4{background:#fef}.whit" +
                                                 "e .beautify .data .l5{background:#eef}.white .beautify .data .l6{background:#fff" +
                                                 "8cc}.white .beautify .data .l7{background:#ede}.white .beautify .data .l8{backgr" +
                                                 "ound:#efc}.white .beautify .data .l9{background:#ffd}.white .beautify .data .l10" +
                                                 "{background:#edc}.white .beautify .data .l11{background:#fdb}.white .beautify .d" +
                                                 "ata .l12{background:#f8f8f8}.white .beautify .data .l13{background:#ffb}.white ." +
                                                 "beautify .data .l14{background:#eec}.white .beautify .data .l15{background:#cfc}" +
                                                 ".white .beautify .data .l16{background:#eea}.white .beautify .data .c0{backgroun" +
                                                 "d:#ddd}.white .beautify .data li{color:#777}.white .diff .skip{background-color:" +
                                                 "#efefef;border-color:#ddd}.white .diff .insert{background-color:#bfb;border-colo" +
                                                 "r:#aea}.white .diff .data .insert em{background-color:#efc;border-color:#070;col" +
                                                 "or:#050}.white .diff p.author{background:#efefef;border-top-color:#bbc}.white #d" +
                                                 "oc table,.white .box .body table{background:#fff;border-color:#999}.white #doc s" +
                                                 "trong,.white .box .body strong{color:#c00}.white .box .body em,.white .box .body" +
                                                 " #doc em{color:#090}.white #thirdparties img,.white #diffoutput #thirdparties{bo" +
                                                 "rder-color:#999}.white #thirdparties img{box-shadow:.2em .2em .4em #999}.white #" +
                                                 "diffoutput #thirdparties{background:#eee}.white #doc div,#doc.white div{backgrou" +
                                                 "nd:#ddd;border-color:#999}.white #doc ol,#doc.white ol{background:#eee;border-co" +
                                                 "lor:#999}.white #doc div div,#doc.white div div{background:#eee;border-color:#99" +
                                                 "9}.white #doc table,#doc.white table{background:#fff;border-color:#999}.white #d" +
                                                 "oc th,#doc.white th{background:#ddd;border-left-color:#999;border-top-color:#999" +
                                                 "}.white #doc tr:hover,#doc.white tr:hover{background:#ddd}#doc.white em{color:#0" +
                                                 "60}.white #doc div:hover,#doc.white div:hover{background:#ccc}.white #doc div di" +
                                                 "v:hover,#doc.white div div:hover,#doc.white div ol:hover{background:#fff}.white " +
                                                 "#pdsamples li{background:#eee;border-color:#999}.white #pdsamples li div{backgro" +
                                                 "und:#ddd;border-color:#999}.white #pdsamples li div a{color:#47a}.white #pdsampl" +
                                                 "es li p a{color:#009}";
                        builder.cssExtra   = "body{background:#eee}#doc p em{color:#090}";
                        builder.body       = "</style></head><body id='webtool' class='";
                        builder.bodyColor  = "white";
                        builder.title      = "'><h1><a href='http://prettydiff.com/'>Pretty Diff - The difference tool</a></h1" +
                                                 "><div class='doc'>";
                        builder.scriptOpen = "<script type='application/javascript'><![CDATA[";
                        builder.scriptBody = "var pd={};pd.beaufold=function dom__beaufold(){'use strict';var self=this,title=" +
                                                 "self.getAttribute('title').split('line '),min=Number(title[1].substr(0,title[1]." +
                                                 "indexOf(' '))),max=Number(title[2]),a=0,b='',list=[self.parentNode.getElementsBy" +
                                                 "TagName('li'),self.parentNode.nextSibling.getElementsByTagName('li')];if(self.in" +
                                                 "nerHTML.charAt(0)==='-'){for(a=min;a<max;a+=1){list[0][a].style.display='none';l" +
                                                 "ist[1][a].style.display='none';}self.innerHTML='+'+self.innerHTML.substr(1);}els" +
                                                 "e{for(a=min;a<max;a+=1){list[0][a].style.display='block';list[1][a].style.displa" +
                                                 "y='block';if(list[0][a].getAttribute('class')==='fold'&&list[0][a].innerHTML.cha" +
                                                 "rAt(0)==='+'){b=list[0][a].getAttribute('title');b=b.substring(b.indexOf('to lin" +
                                                 "e ')+1);a=Number(b)-1;}}self.innerHTML='-'+self.innerHTML.substr(1);}};(function" +
                                                 "(){'use strict';var lists=document.getElementsByTagName('ol'),listslen=lists.len" +
                                                 "gth,list=[],listlen=0,a=0,b=0;for(a=0;a<listslen;a+=1){if(lists[a].getAttribute(" +
                                                 "'class')==='count'&&lists[a].parentNode.getAttribute('class')==='beautify'){list" +
                                                 "=lists[a].getElementsByTagName('li');listlen=list.length;for(b=0;b<listlen;b+=1)" +
                                                 "{if(list[b].getAttribute('class')==='fold'){list[b].onmousedown=pd.beaufold;}}}}" +
                                                 "}());";
                        builder.scriptEnd  = "]]></script>";
                        return [
                            builder.head + builder.cssCore + builder.cssColor + builder.cssExtra + builder.body + builder.bodyColor + builder.title + auto + proctime() + "</div>" + apidiffout + builder.scriptOpen + builder.scriptBody + builder.scriptEnd + "</body></html>", ""
                        ];
                    }
                    return [
                        apioutput, autostring + proctime() + apidiffout
                    ];
                }
                if (cmode === "diff") {
                    summary = "diff";
                    if (cdiffcomments === false) {
                        ccomm = "nocomment";
                    }
                    if (csource === "" || cdiff === "") {
                        return [
                            "", ""
                        ];
                    }
                    if (clang === "css") {
                        apioutput  = csspretty({
                            comm    : ccomm,
                            diffcomm: cdiffcomments,
                            inchar  : cinchar,
                            insize  : cinsize,
                            mode    : cmode,
                            objsort : cobjsort,
                            preserve: cpreserve,
                            source  : csource,
                            topcoms : ctopcoms,
                            vertical: false
                        });
                        apidiffout = csspretty({
                            comm    : ccomm,
                            diffcomm: cdiffcomments,
                            inchar  : cinchar,
                            insize  : cinsize,
                            mode    : cmode,
                            objsort : cobjsort,
                            preserve: cpreserve,
                            source  : cdiff,
                            topcoms : ctopcoms,
                            vertical: false
                        });
                    } else if (clang === "csv") {
                        apioutput  = csvbeauty(csource, ccsvchar);
                        apidiffout = csvbeauty(cdiff, ccsvchar);
                    } else if (clang === "markup") {
                        apioutput  = markuppretty({
                            bracepadding: cbracepadding,
                            braces      : cbraces,
                            comments    : ccomm,
                            conditional : ccond,
                            content     : ccontent,
                            diffcomments: cdiffcomments,
                            force_indent: cforce,
                            html        : chtml,
                            inchar      : cinchar,
                            insize      : cinsize,
                            mode        : cmode,
                            objsort     : cobjsort,
                            source      : csource,
                            style       : cstyle,
                            styleguide  : cstyleguide,
                            tagmerge    : ctagmerge,
                            vertical    : false,
                            wrap        : cwrap
                        }).replace(/\n[\t]*\ \/>/g, "");
                        apidiffout = markuppretty({
                            bracepadding: cbracepadding,
                            braces      : cbraces,
                            comments    : ccomm,
                            conditional : ccond,
                            content     : ccontent,
                            ctagmerge   : ctagmerge,
                            diffcomments: cdiffcomments,
                            force_indent: cforce,
                            html        : chtml,
                            inchar      : cinchar,
                            insize      : cinsize,
                            mode        : cmode,
                            objsort     : cobjsort,
                            source      : cdiff,
                            style       : cstyle,
                            styleguide  : cstyleguide,
                            vertical    : false,
                            wrap        : cwrap
                        }).replace(/\n[\t]*\ \/>/g, "");
                    } else if (clang === "text") {
                        apioutput  = csource;
                        apidiffout = cdiff;
                    } else {
                        apioutput  = jspretty({
                            bracepadding: cbracepadding,
                            braces      : cbraces,
                            comments    : ccomm,
                            correct     : ccorrect,
                            elseline    : celseline,
                            inchar      : cinchar,
                            inlevel     : cinlevel,
                            insize      : cinsize,
                            jsscope     : false,
                            objsort     : cobjsort,
                            preserve    : false,
                            source      : csource,
                            space       : cspace,
                            styleguide  : cstyleguide,
                            titanium    : ctitanium,
                            vertical    : false,
                            wrap        : cwrap
                        });
                        apidiffout = jspretty({
                            bracepadding: cbracepadding,
                            braces      : cbraces,
                            comments    : ccomm,
                            correct     : ccorrect,
                            elseline    : celseline,
                            inchar      : cinchar,
                            inlevel     : cinlevel,
                            insize      : cinsize,
                            jsscope     : false,
                            objsort     : cobjsort,
                            preserve    : false,
                            source      : cdiff,
                            space       : cspace,
                            styleguide  : cstyleguide,
                            titanium    : ctitanium,
                            vertical    : false,
                            wrap        : cwrap
                        });
                    }
                    if (cquote === true) {
                        apioutput  = apioutput.replace(/'/g, "\"");
                        apidiffout = apidiffout.replace(/'/g, "\"");
                    }
                    if (csemicolon === true) {
                        apioutput  = apioutput.replace(/;\n/g, "\n");
                        apidiffout = apidiffout.replace(/;\n/g, "\n");
                    }
                    if (csourcelabel === "" || spacetest.test(csourcelabel)) {
                        csourcelabel = "Base Text";
                    }
                    if (cdifflabel === "" || spacetest.test(cdifflabel)) {
                        cdifflabel = "New Text";
                    }
                    if (cdiffview === "inline") {
                        cdiffview = true;
                    }
                    return (function core__diff() {
                        var a     = [],
                            s     = "s",
                            t     = "s",
                            achar = "";
                        if (cdiffcli === true) {
                            return diffview({
                                baseTextLines: apioutput,
                                baseTextName : csourcelabel,
                                contextSize  : ccontext,
                                diffcli      : cdiffcli,
                                inline       : cdiffview,
                                newTextLines : apidiffout,
                                newTextName  : cdifflabel,
                                tchar        : cinchar,
                                tsize        : cinsize
                            });
                        }
                        if (apioutput === "Error: This does not appear to be JavaScript." || apidiffout === "Error: This does not appear to be JavaScript.") {
                            a[1] = [
                                "<p><strong>Error:</strong> Please try using the option labeled <em>Plain Text (d" +
                                        "iff only)</em>. <span style='display:block'>The input does not appear to be mark" +
                                        "up, CSS, or JavaScript.</span></p>",
                                0, 0
                            ];
                        } else {
                            if (clang !== "text") {
                                achar = cinchar;
                            }
                            a[1] = diffview({
                                baseTextLines: apioutput,
                                baseTextName : csourcelabel,
                                contextSize  : ccontext,
                                inline       : cdiffview,
                                newTextLines : apidiffout,
                                newTextName  : cdifflabel,
                                tchar        : achar,
                                tsize        : cinsize
                            });
                            if (a[1][2] === 1) {
                                t = "";
                                if (a[1][1] === 0) {
                                    s = "";
                                }
                            }
                        }
                        a[0] = "<p><strong>Number of differences:</strong> <em>" + (a[1][1] + a[1][2]) + "</em> difference" + s + " from <em>" + a[1][2] + "</em> line" + t + " of code.</p>";
                        if (jsxstatus === true) {
                            autostring = "<p>Code type is presumed to be <em>React JSX</em>.</p>";
                        }
                        if (capi === "") {
                            builder.head          = "<?xml version='1.0' encoding='UTF-8' ?><!DOCTYPE html PUBLIC '-//W3C//DTD XHTML " +
                                                        "1.1//EN' 'http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd'><html xmlns='http://www." +
                                                        "w3.org/1999/xhtml' xml:lang='en'><head><title>Pretty Diff - The difference tool<" +
                                                        "/title><meta name='robots' content='index, follow'/> <meta name='DC.title' conte" +
                                                        "nt='Pretty Diff - The difference tool'/> <link rel='canonical' href='http://pret" +
                                                        "tydiff.com/' type='application/xhtml+xml'/><meta http-equiv='Content-Type' conte" +
                                                        "nt='application/xhtml+xml;charset=UTF-8'/><meta http-equiv='Content-Style-Type' " +
                                                        "content='text/css'/><style type='text/css'>";
                            builder.cssCore       = "body{font-family:'Arial';font-size:10px;overflow-y:scroll;}#samples #dcolorSchem" +
                                                        "e{position:relative;z-index:1000}#apireturn textarea{font-size:1.2em;height:50em" +
                                                        ";width:100%}button{border-radius:.9em;display:block;font-weight:bold;width:100%}" +
                                                        "div .button{text-align:center}div button{display:inline-block;font-weight:bold;m" +
                                                        "argin:1em 0;padding:1em 2em}button:hover{cursor:pointer}#introduction{clear:both" +
                                                        ";margin:0 0 0 5.6em;position:relative;top:-2.75em}#introduction ul{clear:both;he" +
                                                        "ight:3em;margin:0 0 0 -5.5em;overflow:hidden;width:100em}#introduction li{clear:" +
                                                        "none;display:block;float:left;font-size:1.4em;margin:0 4.95em -1em 0}#introducti" +
                                                        "on li li{font-size:1em;margin-left:2em}#introduction .information,#webtool #intr" +
                                                        "oduction h2{left:-90em;position:absolute;top:0;width:10em}#introduction h2{float" +
                                                        ":none}#displayOps{float:right;font-size:1.5em;font-weight:bold;margin-right:1em;" +
                                                        "width:22.5em}#displayOps.default{position:static}#displayOps.maximized{margin-bo" +
                                                        "ttom:-2em;position:relative}#displayOps li{clear:none;display:block;float:left;l" +
                                                        "ist-style:none;margin:2em 0 0;text-align:right;width:9em}h1{float:left;font-size" +
                                                        ":2em;margin:0 .5em .5em 0}#hideOptions{margin-left:5em;padding:0}#title_text{bor" +
                                                        "der-style:solid;border-width:.05em;display:block;float:left;font-size:1em;margin" +
                                                        "-left:.55em;padding:.1em}h1 svg,h1 img{border-style:solid;border-width:.05em;flo" +
                                                        "at:left;height:2em;width:2em}h1 span{font-size:.5em}h2,h3{background:#fff;border" +
                                                        "-style:solid;border-width:.075em;display:inline-block;font-size:1.8em;font-weigh" +
                                                        "t:bold;margin:0 .5em .5em 0;padding:0 .2em}#doc h3{margin-top:.5em}h3{font-size:" +
                                                        "1.6em}h4{font-size:1.4em}fieldset{border-radius:.9em;clear:both;margin:3.5em 0 -" +
                                                        "2em;padding:0 0 0 1em}legend{border-style:solid;border-width:.1em;font-size:1.2e" +
                                                        "m;font-weight:bold;margin-left:-.25em}.button{margin:1em 0;text-align:center}.bu" +
                                                        "tton button{display:block;font-size:2em;height:1.5em;margin:0 auto;padding:0;wid" +
                                                        "th:50%}#diffreport{right:57.8em}#beaureport{right:38.8em}#minnreport{right:19.8e" +
                                                        "m}#statreport{right:.8em}#statreport .body p,#statreport .body li,#statreport .b" +
                                                        "ody h3{font-size:1.2em}#statreport .body h3{margin-top:0}#statreport .body ul{ma" +
                                                        "rgin-top:1em}#reports{height:4em}#reports h2{display:none}.box{border-style:soli" +
                                                        "d;border-width:0;left:auto;margin:0;padding:0;position:absolute;z-index:10}.box " +
                                                        "button{border-radius:0;border-style:solid;border-width:.1em;display:block;float:" +
                                                        "right;font-family:'Lucida Console','Trebuchet MS','Arial';height:1.75em;padding:" +
                                                        "0;position:absolute;right:0;text-align:center;top:0;width:1.75em;z-index:7}.box " +
                                                        "button.resize{border-width:.05em;cursor:se-resize;font-size:1.667em;font-weight:" +
                                                        "normal;height:.8em;line-height:.5em;margin:-.85em 0 0;position:absolute;right:.0" +
                                                        "5em;top:100%;width:.85em}.box button.minimize{margin:.35em 4em 0 0}.box button.m" +
                                                        "aximize{margin:.35em 1.75em 0 0}.box button.save{margin:.35em 6.25em 0 0}.box .b" +
                                                        "uttons{float:right;margin:0}.box h3.heading{cursor:pointer;float:left;font-size:" +
                                                        "1em;height:3em;margin:0 0 -3.2em;position:relative;width:17em;z-index:6}.box h3." +
                                                        "heading span{display:block;font-size:1.8em;padding:.25em 0 0 .5em}.box .body{cle" +
                                                        "ar:both;height:20em;margin-top:-.1em;overflow:scroll;padding:4.25em 1em 1em;posi" +
                                                        "tion:relative;right:0;top:0;width:75em;z-index:5}.options{border-radius:0 0 .9em" +
                                                        " .9em;clear:both;margin-bottom:1em;padding:1em 1em 3.5em;width:auto}label{displa" +
                                                        "y:inline;font-size:1.4em}ol li{font-size:1.4em;list-style-type:decimal}ol li li{" +
                                                        "font-size:1em}body#doc ol li{font-size:1.1em}ul{margin:-1.4em 0 2em;padding:0}ul" +
                                                        " li{list-style-type:none}li{clear:both;margin:1em 0 1em 3em}li h4{display:inline" +
                                                        ";float:left;margin:.4em 0;text-align:left;width:14em}p{clear:both;font-size:1.2e" +
                                                        "m;margin:0 0 1em}#option_comment{height:2.5em;margin-bottom:-1.5em;width:100%}.d" +
                                                        "ifflabel{display:block;height:0}#beau-other-span,#diff-other-span{text-indent:-2" +
                                                        "00em;width:0}.options p span{display:block;float:left;font-size:1.2em}#top{min-w" +
                                                        "idth:80em}#top em{font-weight:bold}#update{clear:left;float:right;font-weight:bo" +
                                                        "ld;padding:.5em;position:absolute;right:1em;top:11em}#announcement{height:2.5em;" +
                                                        "margin:0 -5em -4.75em;width:27.5em}#textreport{width:100%}#options{float:left;ma" +
                                                        "rgin:0;width:19em}#options label{width:auto}#options p{clear:both;font-size:1em;" +
                                                        "margin:0;padding:0}#options p span{clear:both;float:none;height:2em;margin:0 0 0" +
                                                        " 2em}#csvchar{width:11.8em}#language,#csvchar,#colorScheme{margin:0 0 1em 2em}#c" +
                                                        "odeInput{margin-left:22.5em}#Beautify.wide p,#Beautify.tall p.file,#Minify.wide " +
                                                        "p,#Minify.tall p.file{clear:none;float:none}#diffops p,#miniops p,#beauops p{cle" +
                                                        "ar:both;font-size:1em;padding-top:1em}#options p strong,#diffops p strong,#minio" +
                                                        "ps p strong,#beauops p strong,#options .label,#diffops .label,#miniops .label,#b" +
                                                        "eauops .label{display:block;float:left;font-size:1.2em;font-weight:bold;margin-b" +
                                                        "ottom:1em;width:17.5em}input[type='radio']{margin:0 .25em}input[type='file']{box" +
                                                        "-shadow:none}select{border-style:inset;border-width:.1em;width:11.85em}.options " +
                                                        "input,.options label{border-style:none;display:block;float:left}.options span la" +
                                                        "bel{margin-left:.4em;white-space:nowrap;width:12em}.options p span label{font-si" +
                                                        "ze:1em}#webtool .options input[type=text]{margin-right:1em;width:11.6em}#webtool" +
                                                        " .options input[type=text],div input,textarea{border-style:inset;border-width:.1" +
                                                        "em}textarea{display:inline-block;height:10em;margin:0}strong label{font-size:1em" +
                                                        ";width:inherit}strong.new{background:#ff6;font-style:italic}#miniops span strong" +
                                                        ",#diffops span strong,#beauops span strong{display:inline;float:none;font-size:1" +
                                                        "em;width:auto}#Beautify .input label,#Beautify .output label,#Minify .input labe" +
                                                        "l,#Minify .output label{display:block;font-size:1.05em;font-weight:bold}#beautyi" +
                                                        "nput,#minifyinput,#baseText,#newText,#beautyoutput,#minifyoutput{font-size:1em}." +
                                                        "clear{clear:both;display:block}.wide,.tall,#diffBase,#diffNew{border-radius:0 0 " +
                                                        ".9em .9em;margin-bottom:1em}#diffBase,#diffNew{padding:1em}#diffBase p,#diffNew " +
                                                        "p{clear:none;float:none}#diffBase.wide textarea,#diffNew.wide textarea{height:10" +
                                                        ".1em}.wide,.tall{padding:1em 1.25em 0}#diff .addsource{cursor:pointer;margin-bot" +
                                                        "tom:1em;padding:0}#diff .addsource input{display:block;float:left;margin:.5em .5" +
                                                        "em -1.5em}#diff .addsource label{cursor:pointer;display:inline-block;font-size:1" +
                                                        ".2em;padding:.5em .5em .5em 2em}.wide label{float:none;margin-right:0;width:100%" +
                                                        "}.wide #beautyinput,.wide #minifyinput,.wide #beautyoutput,.wide #minifyoutput{h" +
                                                        "eight:14.8em;margin:0;width:99.5%}.tall .input{clear:none;float:left}.tall .outp" +
                                                        "ut{clear:none;float:right;margin-top:-2.4em}.tall .input,.tall .output{width:49%" +
                                                        "}.tall .output label{text-align:right}.tall .input textarea{height:31.7em}.tall " +
                                                        ".output textarea{height:34em}.tall textarea{margin:0 0 -.1em;width:100%}.tall #b" +
                                                        "eautyinput,.tall #minifyinput{float:left}.tall #beautyoutput,.tall #minifyoutput" +
                                                        "{float:right}.wide{width:auto}#diffBase.difftall,#diffNew.difftall{margin-bottom" +
                                                        ":1.3em;padding:1em 1% .9em;width:47.5%}#diffBase.difftall{float:left}#diffNew.di" +
                                                        "fftall{float:right}.file input,.labeltext input{display:inline-block;margin:0 .7" +
                                                        "em 0 0;width:16em}.labeltext,.file{font-size:.9em;font-weight:bold;margin-bottom" +
                                                        ":1em}.difftall textarea{height:30.6em;margin-bottom:.5em}#diffBase textarea,#dif" +
                                                        "fNew textarea{width:99.5%}.input,.output{margin:0}#diffBase.wide,#diffNew.wide{p" +
                                                        "adding:.8em 1em}#diffBase.wide{margin-bottom:1.2em}#diffoutput{width:100%}#diffo" +
                                                        "utput p em,#diffoutput li em,.analysis .bad,.analysis .good{font-weight:bold}#di" +
                                                        "ffoutput ul{font-size:1.2em;margin-top:1em}#diffoutput ul li{display:list-item;l" +
                                                        "ist-style-type:disc}.analysis th{text-align:left}.analysis td{text-align:right}#" +
                                                        "doc ul{margin-top:1em}#doc ul li{font-size:1.2em}body#doc ul li{font-size:1.1em}" +
                                                        "#doc ol li span{display:block;margin-left:2em}.diff,.beautify{border-style:solid" +
                                                        ";border-width:.2em;display:inline-block;font-family:'Courier New',Courier,'Lucid" +
                                                        "a Console',monospace;margin:0 1em 1em 0;position:relative}.beautify .data em{dis" +
                                                        "play:inline-block;font-style:normal;font-weight:bold;padding-top:.5em}.diff .ski" +
                                                        "p{border-style:none none solid;border-width:0 0 .1em}.diff li,.diff p,.diff h3,." +
                                                        "beautify li{font-size:1.1em}.diff .diff-left,.diff .diff-right{display:table-cel" +
                                                        "l}.diff .diff-left{border-style:none none none solid;border-width:0 0 0 .1em}.di" +
                                                        "ff .diff-right{border-style:none none none solid;border-width:0 0 0 .1em;margin-" +
                                                        "left:-.1em;min-width:16.5em;right:0;top:0}.diff-right .data ol{min-width:16.5em}" +
                                                        ".diff-right .data{border-style:none solid none none;border-width:0 .1em 0 0;widt" +
                                                        "h:100%}.diff-right .data li{min-width:16.5em}.diff ol,.beautify ol{display:table" +
                                                        "-cell;margin:0;padding:0}.diff li,.beautify li{border-style:none none solid;bord" +
                                                        "er-width:0 0 .1em;display:block;line-height:1.2;list-style-type:none;margin:0;pa" +
                                                        "dding-bottom:0;padding-right:.5em}.diff li{padding-top:.5em}.beautify .count li{" +
                                                        "padding-top:.5em}@media screen and (-webkit-min-device-pixel-ratio:0) {.beautify" +
                                                        " .count li{padding-top:.546em}}#doc .beautify .count li.fold{color:#900;cursor:p" +
                                                        "ointer;font-weight:bold;padding-left:.5em}.diff .count,.beautify .count{border-s" +
                                                        "tyle:solid;border-width:0 .1em 0 0;font-weight:normal;padding:0;text-align:right" +
                                                        "}.diff .count li,.beautify .count li{padding-left:2em}.diff .data,.beautify .dat" +
                                                        "a{text-align:left;white-space:pre}.diff .data li,.beautify .data li{letter-spaci" +
                                                        "ng:.1em;padding-left:.5em;white-space:pre}#webtool .diff h3{border-style:none so" +
                                                        "lid solid;border-width:0 .1em .2em;box-shadow:none;display:block;font-family:Ver" +
                                                        "dana;margin:0 0 0 -.1em;padding:.2em 2em;text-align:left}.diff li em{font-style:" +
                                                        "normal;margin:0 -.09em;padding:.05em 0}.diff p.author{border-style:solid;border-" +
                                                        "width:.2em .1em .1em;margin:0;overflow:hidden;padding:.4em;text-align:right}#dco" +
                                                        "lorScheme{float:right;margin:-2em 0 0 0}#dcolorScheme label{display:inline-block" +
                                                        ";font-size:1em;margin-right:1em}body#doc{font-size:.8em;max-width:80em}#doc th{f" +
                                                        "ont-weight:bold}#doc td span{display:block}#doc table,.box .body table{border-co" +
                                                        "llapse:collapse;border-style:solid;border-width:.2em;clear:both}#doc table{font-" +
                                                        "size:1.2em}body#doc table{font-size:1em}#doc td,#doc th{border-left-style:solid;" +
                                                        "border-left-width:.1em;border-top-style:solid;border-top-width:.1em;padding:.5em" +
                                                        "}#doc em,.box .body em{font-style:normal;font-weight:bold}#doc div{margin-bottom" +
                                                        ":2em}#doc div div{clear:both;margin-bottom:1em}#doc h2{font-size:1.6em;margin:.5" +
                                                        "em .5em .5em 0}#doc ol{clear:both}#doc_contents li{font-size:1.75em;margin:1em 0" +
                                                        " 0}#doc_contents ol ol li{font-size:.75em;list-style:lower-alpha;margin:.5em 0 0" +
                                                        "}#doc_contents ol{padding-bottom:1em}#doc #doc_contents ol ol{background-color:i" +
                                                        "nherit;border-style:none;margin:.25em .3em 0 0;padding-bottom:0}#doc_contents a{" +
                                                        "text-decoration:none}#diffoutput #thirdparties li{display:inline-block;list-styl" +
                                                        "e-type:none}#thirdparties a{border-style:none;display:block;height:4em;text-deco" +
                                                        "ration:none}button,fieldset,.box h3.heading,.box .body,.options,.diff .replace e" +
                                                        "m,.diff .delete em,.diff .insert em,.wide,.tall,#diffBase,#diffNew,#doc div,#doc" +
                                                        " div div,#doc ol,#option_comment,#update,#thirdparties img,#diffoutput #thirdpar" +
                                                        "ties{border-style:solid;border-width:.1em}#apitest p{clear:both;padding-top:.75e" +
                                                        "m}#apitest label,#apitest select,#apitest input,#apitest textarea{float:left}#ap" +
                                                        "itest label{width:20em}#apitest select,#apitest input,#apitest textarea{width:30" +
                                                        "em}#pdsamples{list-style-position:inside;margin:-12em 0 0 0;padding:0;position:r" +
                                                        "elative;z-index:10}#pdsamples li{border-radius:1em;border-style:solid;border-wid" +
                                                        "th:.1em;margin:0 0 3em;padding:1em}#pdsamples li div{border-radius:1em;border-st" +
                                                        "yle:solid;border-width:.1em;margin:0;padding:1em}#pdsamples li p{display:inline-" +
                                                        "block;font-size:1em;margin:0}#pdsamples li p a{display:block;margin:0 0 1em 2em}" +
                                                        "#pdsamples li ul{margin:0 0 0 2em}#samples #pdsamples li li{background:none tran" +
                                                        "sparent;border-style:none;display:list-item;list-style:disc outside;margin:0;pad" +
                                                        "ding:.5em}#modalSave span{background:#000;display:block;left:0;opacity:.5;positi" +
                                                        "on:absolute;top:0;z-index:9000}#modalSave p{background:#eee;color:#333;font-size" +
                                                        ":3em;padding:1em;position:absolute;text-align:center;top:10em;width:25em;z-index" +
                                                        ":9001}#modalSave p em{display:block;font-size:.75em;margin-top:1em}#modalSave p " +
                                                        "strong{color:#c00;font-weight:bold}@media print{p,.options,#Beautify,#Minify,#di" +
                                                        "ff,ul{display:none}div{width:100%}html td{font-size:.8em;white-space:normal}}";
                            builder.cssColor      = "html .white,body.white{color:#333}body.white button{background:#eee;border-color" +
                                                        ":#222;box-shadow:0 .1em .2em rgba(64,64,64,0.75);color:#666;text-shadow:.05em .0" +
                                                        "5em .1em #ccc}.white button:hover,.white button:active{background:#999;color:#ee" +
                                                        "e;text-shadow:.1em .1em .1em #333}.white a{color:#009}.white #title_text{border-" +
                                                        "color:#fff;color:#333}.white #introduction h2{border-color:#999;color:#333}.whit" +
                                                        "e h1 svg{background:#eee;border-color:#999;box-shadow:0 .1em .2em rgba(150,150,1" +
                                                        "50,0.5)}.white h2,.white h3{background:#eee;border-color:#eee;box-shadow:none;pa" +
                                                        "dding-left:0;text-shadow:none}.white fieldset{background:#ddd;border-color:#999}" +
                                                        ".white legend{background:#fff;border-color:#999;color:#333;text-shadow:none}.whi" +
                                                        "te .box{background:#666;border-color:#999;box-shadow:0 .4em .8em rgba(64,64,64,0" +
                                                        ".75)}.white .box button{box-shadow:0 .1em .2em rgba(0,0,0,0.75);text-shadow:.1em" +
                                                        " .1em .1em rgba(0,0,0,.5)}.white .box button.resize{background:#bbf;border-color" +
                                                        ":#446;color:#446}.white .box button.resize:hover{background:#ddf;border-color:#2" +
                                                        "28;color:#228}.white .box button.save{background:#d99;border-color:#300;color:#3" +
                                                        "00}.white .box button.save:hover{background:#fcc;border-color:#822;color:#822}.w" +
                                                        "hite .box button.minimize{background:#bbf;border-color:#006;color:#006}.white .b" +
                                                        "ox button.minimize:hover{background:#eef;border-color:#228;color:#228}.white .bo" +
                                                        "x button.maximize{background:#9c9;border-color:#030;color:#030}.white .box butto" +
                                                        "n.maximize:hover{background:#cfc;border-color:#060;color:#060}.white .box h3.hea" +
                                                        "ding{background:#ddd;border-color:#888;box-shadow:.2em .2em .4em #666}.white .bo" +
                                                        "x h3.heading:hover{background:#333;color:#eee}.white .box .body{background:#eee;" +
                                                        "border-color:#888;box-shadow:0 0 .4em rgba(64,64,64,0.75)}.white .options{backgr" +
                                                        "ound:#eee;border-color:#999;box-shadow:0 .2em .4em rgba(64,64,64,0.5);text-shado" +
                                                        "w:.05em .05em .1em #ccc}.white .options h2,.white #Beautify h2,.white #Minify h2" +
                                                        ",.white #diffBase h2,.white #diffNew h2{background:#eee;border-color:#eee;box-sh" +
                                                        "adow:none;text-shadow:none}.white #option_comment{background:#ddd;border-color:#" +
                                                        "999}.white #top em{color:#00f}.white #update{background:#eee;border-color:#999;b" +
                                                        "ox-shadow:0 .1em .2em rgba(64,64,64,0.5)}.white .wide,.white .tall,.white #diffB" +
                                                        "ase,.white #diffNew{background:#eee;border-color:#999;box-shadow:0 .2em .4em rgb" +
                                                        "a(64,64,64,0.5)}.white .file input,.white .labeltext input{border-color:#fff}#we" +
                                                        "btool.white input.unchecked{background:#ccc;color:#666}.white .options input[typ" +
                                                        "e=text],.white .options select{border-color:#999}.white #beautyoutput,.white #mi" +
                                                        "nifyoutput{background:#ddd}.white #diffoutput p em,.white #diffoutput li em{colo" +
                                                        "r:#c00}.white .analysis .bad{background-color:#ebb;color:#400}.white .analysis ." +
                                                        "good{background-color:#cec;color:#040}.white #doc .analysis thead th,.white #doc" +
                                                        " .analysis th[colspan]{background:#eef}.white div input{border-color:#999}.white" +
                                                        " textarea{border-color:#999}.white textarea:hover{background:#eef8ff}.white .dif" +
                                                        "f,.white .beautify,.white .diff ol,.white .beautify ol,.white .diff .diff-left,." +
                                                        "white .diff .diff-right,.white h3,.white p.author{border-color:#999}.white .diff" +
                                                        " .count li,.white .beautify .count li{background:#eed;border-color:#bbc;color:#8" +
                                                        "86}.white .diff h3{background:#ddd;border-bottom-color:#bbc}.white .diff .empty{" +
                                                        "background-color:#ddd;border-color:#ccc}.white .diff .replace{background-color:#" +
                                                        "fea;border-color:#dd8}.white .diff .data .replace em{background-color:#ffd;borde" +
                                                        "r-color:#963;color:#630}.white .diff .delete{background-color:#fbb;border-color:" +
                                                        "#eaa}.white .diff .data .delete em{background-color:#fdd;border-color:#700;color" +
                                                        ":#600}.white .diff .equal,.white .beautify .data li{background-color:#fff;border" +
                                                        "-color:#eee}.white .beautify .data em.s1{color:#f66}.white .beautify .data em.s2" +
                                                        "{color:#12f}.white .beautify .data em.s3{color:#090}.white .beautify .data em.s4" +
                                                        "{color:#d6d}.white .beautify .data em.s5{color:#7cc}.white .beautify .data em.s6" +
                                                        "{color:#c85}.white .beautify .data em.s7{color:#737}.white .beautify .data em.s8" +
                                                        "{color:#6d0}.white .beautify .data em.s9{color:#dd0s}.white .beautify .data em.s" +
                                                        "10{color:#893}.white .beautify .data em.s11{color:#b97}.white .beautify .data em" +
                                                        ".s12{color:#bbb}.white .beautify .data em.s13{color:#cc3}.white .beautify .data " +
                                                        "em.s14{color:#333}.white .beautify .data em.s15{color:#9d9}.white .beautify .dat" +
                                                        "a em.s16{color:#880}.white .beautify .data .l0{background:#fff}.white .beautify " +
                                                        ".data .l1{background:#fed}.white .beautify .data .l2{background:#def}.white .bea" +
                                                        "utify .data .l3{background:#efe}.white .beautify .data .l4{background:#fef}.whit" +
                                                        "e .beautify .data .l5{background:#eef}.white .beautify .data .l6{background:#fff" +
                                                        "8cc}.white .beautify .data .l7{background:#ede}.white .beautify .data .l8{backgr" +
                                                        "ound:#efc}.white .beautify .data .l9{background:#ffd}.white .beautify .data .l10" +
                                                        "{background:#edc}.white .beautify .data .l11{background:#fdb}.white .beautify .d" +
                                                        "ata .l12{background:#f8f8f8}.white .beautify .data .l13{background:#ffb}.white ." +
                                                        "beautify .data .l14{background:#eec}.white .beautify .data .l15{background:#cfc}" +
                                                        ".white .beautify .data .l16{background:#eea}.white .beautify .data .c0{backgroun" +
                                                        "d:#ddd}.white .beautify .data li{color:#777}.white .diff .skip{background-color:" +
                                                        "#efefef;border-color:#ddd}.white .diff .insert{background-color:#bfb;border-colo" +
                                                        "r:#aea}.white .diff .data .insert em{background-color:#efc;border-color:#070;col" +
                                                        "or:#050}.white .diff p.author{background:#efefef;border-top-color:#bbc}.white #d" +
                                                        "oc table,.white .box .body table{background:#fff;border-color:#999}.white #doc s" +
                                                        "trong,.white .box .body strong{color:#c00}.white .box .body em,.white .box .body" +
                                                        " #doc em{color:#090}.white #thirdparties img,.white #diffoutput #thirdparties{bo" +
                                                        "rder-color:#999}.white #thirdparties img{box-shadow:.2em .2em .4em #999}.white #" +
                                                        "diffoutput #thirdparties{background:#eee}.white #doc div,#doc.white div{backgrou" +
                                                        "nd:#ddd;border-color:#999}.white #doc ol,#doc.white ol{background:#eee;border-co" +
                                                        "lor:#999}.white #doc div div,#doc.white div div{background:#eee;border-color:#99" +
                                                        "9}.white #doc table,#doc.white table{background:#fff;border-color:#999}.white #d" +
                                                        "oc th,#doc.white th{background:#ddd;border-left-color:#999;border-top-color:#999" +
                                                        "}.white #doc tr:hover,#doc.white tr:hover{background:#ddd}#doc.white em{color:#0" +
                                                        "60}.white #doc div:hover,#doc.white div:hover{background:#ccc}.white #doc div di" +
                                                        "v:hover,#doc.white div div:hover,#doc.white div ol:hover{background:#fff}.white " +
                                                        "#pdsamples li{background:#eee;border-color:#999}.white #pdsamples li div{backgro" +
                                                        "und:#ddd;border-color:#999}.white #pdsamples li div a{color:#47a}.white #pdsampl" +
                                                        "es li p a{color:#009}";
                            builder.cssExtra      = "body{background:#eee}#doc p em{color:#090}";
                            builder.body          = "</style></head><body id='webtool' class='";
                            builder.bodyColor     = "white";
                            builder.title         = "'><h1><a href='http://prettydiff.com/'>Pretty Diff - The difference tool</a></h1" +
                                                        "><div class='doc'>";
                            builder.accessibility = "</div><p>Accessibility note. &lt;em&gt; tags in the output represent character d" +
                                                        "ifferences per lines compared.</p>";
                            builder.scriptOpen    = "<script type='application/javascript'><![CDATA[var pd={},d=document.getElementsB" +
                                                        "yTagName('ol');";
                            builder.scriptBody    = "(function(){var cells=d[0].getElemensByTagName('li'),len=cells.length,a=0;for(a=" +
                                                        "0;a<len;a+=1){if(cells[a].getAttribute('class')==='fold'){cells[a].onmousedown=p" +
                                                        "d.difffold;}}if(d.length>3){d[2].onmousedown=pd.colSliderGrab;d[2].ontouchstart=" +
                                                        "pd.colSliderGrab;}}());pd.difffold=function dom__difffold(){var self=this,title=" +
                                                        "self.getAttribute('title').split('line '),min=Number(title[1].substr(0,title[1]." +
                                                        "indexOf(' '))),max=Number(title[2]),a=0,b=0,inner=self.innerHTML,lists=[],parent" +
                                                        "=self.parentNode.parentNode,listnodes=(parent.getAttribute('class'==='diff'))?pa" +
                                                        "rent.getElementsByTagName('ol'):parent.parentNode.getElementsByTagName('ol'),lis" +
                                                        "tLen=listnodes.length;for(a=0;a<listLen;a+=1){lists.push(listnodes[a].getElement" +
                                                        "sByTagName('li'));}if(lists.length>3){for(a=0;a<min;a+=1){if(lists[0][a].getAttr" +
                                                        "ibute('class')==='empty'){min+=1;max+=1}}}max=(max>=lists[0].length)?lists[0].le" +
                                                        "ngth:max;if(inner.charAt(0)===' - '){self.innerHTML='+'+inner.substr(1);for(a=mi" +
                                                        "n;a<max;a+=1){for(b=0;b<listLen;b+=1){lists[b][a].style.display='none';}}}else{s" +
                                                        "elf.innerHTML=' - '+inner.substr(1);for(a=min;a<max;a+=1){for(b=0;b<listLen;b+=1" +
                                                        "){lists[b][a].style.display='block';}}}};pd.colSliderProperties=[d[0].clientWidt" +
                                                        "h,d[1].clientWidth,d[2].parentNode.clientWidth,d[2].parentNode.parentNode.client" +
                                                        "Width,d[2].parentNode.offsetLeft-d[2].parentNode.parentNode.offsetLeft,];pd.colS" +
                                                        "liderGrab=function(){'use strict';var x=this,a=x.parentNode,b=a.parentNode,c=0,c" +
                                                        "ounter=pd.colSliderProperties[0],data=pd.colSliderProperties[1],width=pd.colSlid" +
                                                        "erProperties[2],total=pd.colSliderProperties[3],offset=(pd.colSliderProperties[4" +
                                                        "]),min=0,max=data-1,status='ew',g=min+15,h=max-15,k=false,z=a.previousSibling,dr" +
                                                        "op=function(g){x.style.cursor=status+'-resize';g=null;document.onmousemove=null;" +
                                                        "document.onmouseup=null;},boxmove=function(f){f=f||window.event;c=offset-f.clien" +
                                                        "tX;if(c>g&&c<h){k=true;}if(k===true&&c>h){a.style.width=((total-counter-2)/10)+'" +
                                                        "em';status='e';}else if(k===true&&c<g){a.style.width=(width/10)+'em';status='w';" +
                                                        "}else if(c<max&&c>min){a.style.width=((width+c)/10)+'em';status='ew';}document.o" +
                                                        "nmouseup=drop;};if(typeof pd.o==='object'&&typeof pd.o.re==='object'){offset+=pd" +
                                                        ".o.re.offsetLeft;offset-=pd.o.rf.scrollLeft;}else{c=(document.body.parentNode.sc" +
                                                        "rollLeft>document.body.scrollLeft)?document.body.parentNode.scrollLeft:document." +
                                                        "body.scrollLeft;offset-=c;}offset+=x.clientWidth;x.style.cursor='ew-resize';b.st" +
                                                        "yle.width=(total/10)+'em';b.style.display='inline-block';if(z.nodeType!==1){do{z" +
                                                        "=z.previousSibling;}while(z.nodeType!==1);}z.style.display='block';a.style.width" +
                                                        "=(a.clientWidth/10)+'em';a.style.position='absolute';document.onmousemove=boxmov" +
                                                        "e;document.onmousedown=null;};";
                            builder.scriptEnd     = "]]></script>";
                            return [
                                builder.head + builder.cssCore + builder.cssColor + builder.cssExtra + builder.body + builder.bodyColor + builder.title + auto + proctime() + a[0] + builder.accessibility + a[1][0] + builder.scriptOpen + builder.scriptBody + builder.scriptEnd + "</body></html>", ""
                            ];
                        }
                        return [
                            a[1][0], autostring + proctime() + a[0] + " <p>Accessibility note. &lt;em&gt; tags in the output represent presentation for" +
                                    " variable coloring and scope.</p>"
                        ];
                    }());
                }
            };

        //Library to provide a character entity representation for
        //UTF8/16.  Requires a browser to access the actual characters.
        //This library is ignored in other environments.  Only used in
        //csvmin and csvbeauty libraries.
        charDecoder  = function charDecoder(input) {
            var a         = 0,
                b         = 0,
                index     = 0,
                inputLenA = 0,
                inputLenB = 0,
                output    = [],
                entity    = [],
                type      = [],
                uni       = (/u\+[0-9a-f]{4,5}\+/),
                unit      = (/u![0-9a-f]{4,5}\+/),
                htmln     = (/&#[0-9]{1,6};/),
                htmlt     = (/&![0-9]{1,6};/);
            if ((pd === undefined || pd.o.report.beau === null || pd.o.report.beau === undefined || typeof pd.o.report.beau.innerHTML !== "string") || (input.search(unit) === -1 && input.search(uni) === -1 && input.search(htmlt) === -1 && input.search(htmln) === -1)) {
                return input;
            }
            inputLenA = input.length;
            for (b = 0; b < inputLenA; b += 1) {
                if (input.search(htmln) === -1 || (input.search(uni) < input.search(htmln) && input.search(uni) !== -1)) {
                    index = input.search(uni);
                    type.push(index + "|h");
                    inputLenB = input.length;
                    for (a = index; a < inputLenB; a += 1) {
                        if (input.charAt(a) === "+" && input.charAt(a - 1) === "u") {
                            input = input.slice(0, a) + "!" + input.slice(a + 1);
                        }
                        if (input.charAt(a) === "+" && input.charAt(a - 1) !== "u") {
                            a += 1;
                            break;
                        }
                    }
                    entity.push(input.slice(index + 2, a - 1));
                    input = input.replace(unit, "");
                } else if (input.search(uni) === -1 || (input.search(htmln) < input.search(uni) && input.search(htmln) !== -1)) {
                    index = input.search(htmln);
                    type.push(index + "|d");
                    inputLenB = input.length;
                    for (a = index; a < inputLenB; a += 1) {
                        if (input.charAt(a) === "#") {
                            input = input.slice(0, a) + "!" + input.slice(a + 1);
                        }
                        if (input.charAt(a) === ";") {
                            a += 1;
                            break;
                        }
                    }
                    entity.push(input.slice(index + 2, a - 1));
                    input = input.replace(htmlt, "");
                }
                if (input.search(uni) === -1 && input.search(htmln) === -1) {
                    break;
                }
            }
            input = input.replace(/u![0-9a-f]{4,5}\+/g, "").replace(/&![0-9]{1,6};/g, "").split("");
            index = entity.length;
            for (b = 0; b < index; b += 1) {
                type[b] = type[b].split("|");
                if (type[b][1] === "h") {
                    entity[b] = parseInt(entity[b], 16);
                }
                pd.o.report.beau.innerHTML = "&#" + parseInt(entity[b], 10) + ";";
                entity[b]                  = pd.o.report.beau.innerHTML;
                output.push(entity[b]);
            }
            return output.join("");
        };

        //Library to parse/beautify/minify CSS (and similar languages).
        csspretty    = function csspretty(args) {
            var scssinsertlines = (args.cssinsertlines === true || args.cssinsertlines === "true"),
                sdiffcomm       = (args.diffcomm === true || args.diffcomm === "true"),
                sinchar         = (typeof args.inchar !== "string" || args.inchar === "")
                    ? " "
                    : args.inchar,
                sinlevel        = (isNaN(args.inlevel) === true)
                    ? 0
                    : Number(args.inlevel),
                sinsize         = (isNaN(args.insize) === true)
                    ? 4
                    : Number(args.insize),
                smode           = (args.mode === "minify" || args.mode === "parse" || args.mode === "diff")
                    ? args.mode
                    : "beautify",
                sobjsort        = (args.objsort === true || args.objsort === "true"),
                spres           = (args.preserve !== false && args.preserve !== "false"),
                ssource         = (typeof args.source !== "string" || args.source === "" || (/^(\s+)$/).test(args.source) === true)
                    ? "Error: no source supplied to csspretty."
                    : args.source,
                stopcoms        = (args.topcoms === true || args.topcoms === "true"),
                svertical       = (args.vertical === true || args.vertical === "true"),
                token           = [],
                types           = [],
                lines           = [],
                uri             = [],
                output          = "",
                endline         = false,
                stats           = {
                    braces    : 0,
                    colon     : 0,
                    comments  : {
                        chars: 0,
                        count: 0
                    },
                    properties: {
                        chars: 0,
                        count: 0
                    },
                    selectors : {
                        chars: 0,
                        count: 0
                    },
                    semi      : 0,
                    space     : 0,
                    values    : {
                        chars: 0,
                        count: 0
                    },
                    variables : {
                        chars: 0,
                        count: 0
                    }
                };
            if (ssource === "Error: no source supplied to csspretty.") {
                return ssource;
            }
            (function csspretty__tokenize() {
                var a          = 0,
                    b          = ssource.split(""),
                    len        = ssource.length,
                    ltype      = "",
                    itemsize   = 0,
                    space      = "",
                    spacer     = function csspretty__tokenize_space(end) {
                        var slen = space.split("\n").length;
                        if (slen > 1 && end === true && spres === true) {
                            endline = true;
                            return;
                        }
                        if (types[types.length - 1] !== "comment" && types[types.length - 1] !== "comment-inline" && (slen > 2 || (slen > 1 && b[a] + b[a + 1] === "//"))) {
                            lines[lines.length - 1] = 1;
                        }
                        space = "";
                    },
                    objSort    = function csspretty__tokenize_objSort() {
                        var cc        = 0,
                            dd        = 0,
                            ee        = 0,
                            startlen  = token.length - 1,
                            end       = startlen,
                            keys      = [],
                            keylen    = 0,
                            keyend    = 0,
                            start     = 0,
                            sort      = function jspretty__tokenize_objSort_sort(x, y) {
                                var xx = x[0],
                                    yy = y[0];
                                if (types[xx] === "comment" || types[xx] === "comment-inline") {
                                    do {
                                        xx += 1;
                                    } while (xx < startlen && (types[xx] === "comment" || types[xx] === "comment-inline"));
                                }
                                if (types[yy] === "comment" || types[yy] === "comment-inline") {
                                    do {
                                        yy += 1;
                                    } while (yy < startlen && (types[yy] === "comment" || types[yy] === "comment-inline"));
                                }
                                if (token[xx].toLowerCase() < token[yy].toLowerCase()) {
                                    return -1;
                                }
                                return 1;
                            },
                            semiTest  = true,
                            pairToken = [],
                            pairTypes = [],
                            pairLines = [];
                        if (types[end] === "comment" || types[end] === "comment-inline") {
                            do {
                                end -= 1;
                            } while (end > 0 && (types[end] === "comment" || types[end] === "comment-inline"));
                        }
                        for (cc = startlen; cc > -1; cc -= 1) {
                            if (types[cc] === "end") {
                                dd += 1;
                            }
                            if (types[cc] === "start") {
                                dd -= 1;
                            }
                            if (dd === 0) {
                                if (token[cc] === ";" || token[cc] === "}") {
                                    semiTest = true;
                                    start    = cc + 1;
                                    if (types[start] === "comment-inline") {
                                        start += 1;
                                    }
                                }
                                if (semiTest === true && (token[cc] === ";" || token[cc] === "}") && start < end && (keys.length === 0 || start !== keys[keys.length - 1][0])) {
                                    if (lines[start - 1] > 0 && (types[start] === "comment" || types[start] === "selector")) {
                                        lines[start - 1] = 0;
                                        lines[start]     = 1;
                                    }
                                    if (types[end + 1] === "comment-inline") {
                                        end += 1;
                                    }
                                    keys.push([
                                        start, end + 1, false
                                    ]);
                                    end = start - 1;
                                }
                            }
                            if (dd < 0 && cc < startlen) {
                                if (keys.length > 0 && keys[keys.length - 1][0] > cc + 1) {
                                    keys.push([
                                        cc + 1, keys[keys.length - 1][0] - 1, keys[keys.length - 1][2]
                                    ]);
                                }
                                if (keys.length > 1 && (types[cc - 1] === "selector" || token[cc - 1] === "=" || token[cc - 1] === ":" || token[cc - 1] === "[" || token[cc - 1] === "{" || token[cc - 1] === "," || cc === 0)) {
                                    keys.sort(sort);
                                    keylen   = keys.length;
                                    semiTest = false;
                                    for (dd = 0; dd < keylen; dd += 1) {
                                        keyend = keys[dd][1];
                                        for (ee = keys[dd][0]; ee < keyend; ee += 1) {
                                            pairToken.push(token[ee]);
                                            pairTypes.push(types[ee]);
                                            if ((types[ee] === "comment" || types[ee] === "selector") && lines[ee] > 0) {
                                                pairLines[pairLines.length - 1] = 1;
                                                pairLines.push(0);
                                            } else {
                                                pairLines.push(lines[ee]);
                                            }
                                            if (token[ee] === ";" || token[ee] === "}") {
                                                semiTest = true;
                                            } else if (token[ee] !== ";" && token[ee] !== "}" && types[ee] !== "comment" && types[ee] !== "comment-inline") {
                                                semiTest = false;
                                            }
                                        }
                                        if (semiTest === false) {
                                            ee = pairTypes.length - 1;
                                            if (pairTypes[ee] === "comment" || pairTypes[ee] === "comment-inline") {
                                                do {
                                                    ee -= 1;
                                                } while (ee > 0 && (pairTypes[ee] === "comment" || pairTypes[ee] === "comment-inline"));
                                            }
                                            ee += 1;
                                            pairToken.splice(ee, 0, ";");
                                            pairTypes.splice(ee, 0, "semi");
                                            if (pairLines[ee - 1] > 0) {
                                                pairLines[ee - 1] = 0;
                                                pairLines.splice(ee, 0, 1);
                                            } else {
                                                pairLines.splice(ee, 0, 0);
                                            }
                                        }
                                    }
                                    ee = pairTypes.length - 1;
                                    if (pairTypes[ee] === "comment" || pairTypes[ee] === "comment-inline") {
                                        do {
                                            ee -= 1;
                                        } while (ee > 0 && (pairTypes[ee] === "comment" || pairTypes[ee] === "comment-inline"));
                                    }
                                    keylen = token.length - (cc + 1);
                                    token.splice(cc + 1, keylen);
                                    types.splice(cc + 1, keylen);
                                    lines.splice(cc + 1, keylen);
                                    token = token.concat(pairToken);
                                    types = types.concat(pairTypes);
                                    lines = lines.concat(pairLines);
                                }
                                return;
                            }
                        }
                    },
                    item       = function csspretty__tokenize_item(type) {
                        var aa    = token.length,
                            bb    = 0,
                            coms  = [],
                            value = function csspretty__tokenize_item_value(val) {
                                var x      = val.split(""),
                                    leng   = x.length,
                                    cc     = 0,
                                    dd     = 0,
                                    items  = [],
                                    block  = "",
                                    values = [];
                                for (cc = 0; cc < leng; cc += 1) {
                                    items.push(x[cc]);
                                    if (block === "") {
                                        if (x[cc] === "\"") {
                                            block = "\"";
                                            dd    += 1;
                                        } else if (x[cc] === "'") {
                                            block = "'";
                                            dd    += 1;
                                        } else if (x[cc] === "(") {
                                            block = ")";
                                            dd    += 1;
                                        } else if (x[cc] === "[") {
                                            block = "]";
                                            dd    += 1;
                                        }
                                    } else if ((x[cc] === "(" && block === ")") || (x[cc] === "[" && block === "]")) {
                                        dd += 1;
                                    } else if (x[cc] === block) {
                                        dd -= 1;
                                        if (dd === 0) {
                                            block = "";
                                        }
                                    }
                                    if (block === "" && x[cc] === " ") {
                                        items.pop();
                                        values.push(items.join(""));
                                        items = [];
                                    }
                                }
                                values.push(items.join(""));
                                leng = values.length;
                                for (cc = 0; cc < leng; cc += 1) {
                                    if ((/^(\.\d)/).test(values[cc]) === true) {
                                        values[cc] = "0" + values[cc];
                                    } else if ((/^(0+([a-z]{2,3}|%))$/).test(values[cc]) === true) {
                                        values[cc] = "0";
                                    } else if ((/^(0+)/).test(values[cc]) === true) {
                                        values[cc] = values[cc].replace(/0+/, "0");
                                        if ((/\d/).test(values[cc].charAt(1)) === true) {
                                            values[cc] = values[cc].substr(1);
                                        }
                                    } else if ((/^url\((?!\$)/).test(values[cc]) === true && (/\+/).test(values[cc]) === false && values[cc].charAt(values[cc].length - 1) === ")") {
                                        if (values[cc].charAt(4) !== "\"") {
                                            if (values[cc].charAt(4) === "'") {
                                                values[cc] = values[cc].replace("url('", "url(\"");
                                            } else {
                                                values[cc] = values[cc].replace("url(", "url(\"");
                                                if (values[cc] === "url(\")") {
                                                    values[cc] = "url(\"\")";
                                                }
                                            }
                                        }
                                        if (values[cc].charAt(values[cc].length - 2) !== "\"") {
                                            if (values[cc].charAt(values[cc].length - 2) === "'") {
                                                values[cc] = values[cc].substr(0, values[cc].length - 2);
                                            } else {
                                                values[cc] = values[cc].substr(0, values[cc].length - 1);
                                            }
                                            values[cc] = values[cc] + "\")";
                                        }
                                        uri.push(values[cc].substring(5, values[cc].length - 2));
                                    } else if ((/^(#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}))$/).test(values[cc]) === true) {
                                        values[cc] = values[cc].toLowerCase();
                                        if (values[cc].length === 7 && values[cc].charAt(1) === values[cc].charAt(2) && values[cc].charAt(3) === values[cc].charAt(4) && values[cc].charAt(5) === values[cc].charAt(6)) {
                                            values[cc] = "#" + values[cc].charAt(1) + values[cc].charAt(3) + values[cc].charAt(5);
                                        }
                                    }
                                }
                                return values.join(" ");
                            };
                        if (ltype === "comment" || ltype === "comment-inline") {
                            do {
                                aa    -= 1;
                                ltype = types[aa];
                                coms.push(token[aa]);
                            } while (aa > 0 && (ltype === "comment" || ltype === "comment-inline"));
                        } else {
                            aa -= 1;
                        }
                        if (ltype === "item") {
                            if (type === "start") {
                                stats.selectors.count += 1;
                                stats.selectors.chars += itemsize;
                                if (types[aa - 1] !== "comment" && types[aa - 1] !== "comment-inline" && types[aa - 1] !== "end" && types[aa - 1] !== "start" && types[aa - 1] !== "semi" && types[aa - 1] !== undefined) {
                                    (function csspretty__tokenize_item_selparts() {
                                        var parts = [],
                                            cc    = aa,
                                            dd    = 0;
                                        do {
                                            parts.push(token[cc]);
                                            cc -= 1;
                                        } while (cc > 0 && types[cc] !== "comment" && types[cc] !== "comment-inline" && types[cc] !== "end" && types[cc] !== "start" && types[cc] !== "semi" && types[cc] !== undefined);
                                        parts.reverse();
                                        cc += 1;
                                        dd = aa - cc;
                                        token.splice(cc, dd);
                                        types.splice(cc, dd);
                                        lines.splice(cc, dd);
                                        aa        -= dd;
                                        token[aa] = parts.join("").replace(/\s*,(\s*)/g, ",");
                                    }());
                                } else {
                                    token[aa] = token[aa].replace(/\s*,(\s*)/g, ",");
                                }
                                types[aa] = "selector";
                            } else if (type === "end") {
                                types[aa] = "value";
                                if (smode !== "diff") {
                                    token[aa] = value(token[aa]);
                                }
                                if (smode === "beautify" || (smode === "diff" && sdiffcomm === true)) {
                                    if (token[token.length - 2] === "{") {
                                        types[types.length - 1] = "propvar";
                                        stats.values.count      -= 1;
                                        stats.values.chars      -= itemsize;
                                        stats.variables.count   += 1;
                                        stats.variables.chars   += itemsize;
                                    } else {
                                        if (coms.length > 0 && ltype !== "semi" && ltype !== "end" && ltype !== "start") {
                                            aa = coms.length - 1;
                                            do {
                                                token.pop();
                                                types.pop();
                                                lines.pop();
                                                aa -= 1;
                                            } while (aa > 0);
                                            if (smode === "diff") {
                                                token.push("x;");
                                            } else {
                                                token.push(";");
                                            }
                                            types.push("semi");
                                            lines.push(0);
                                            bb = coms.length - 1;
                                            do {
                                                token.push(coms[aa]);
                                                if (coms[aa].indexOf("//") === 0 && lines[lines.length - 1] === 0) {
                                                    types.push("comment-inline");
                                                } else {
                                                    types.push("comment");
                                                }
                                                lines.push(0);
                                                aa += 1;
                                            } while (aa < bb);
                                        } else {
                                            if (smode === "diff") {
                                                token.push("x;");
                                            } else {
                                                token.push(";");
                                            }
                                            types.push("semi");
                                            lines.push(0);
                                        }
                                    }
                                }
                                stats.values.count += 1;
                                stats.values.chars += itemsize;
                            } else if (type === "semi") {
                                if (types[aa - 1] === "colon") {
                                    stats.values.count += 1;
                                    stats.values.chars += itemsize;
                                    types[aa]          = "value";
                                    if (smode !== "diff") {
                                        token[aa] = value(token[aa]);
                                    }
                                } else {
                                    types[aa]             = "propvar";
                                    stats.variables.count += 1;
                                    stats.variables.chars += itemsize;
                                }
                            } else if (type === "colon") {
                                types[aa]              = "property";
                                stats.properties.count += 1;
                                stats.properties.chars += itemsize;
                            }
                        }
                    },
                    comment    = function csspretty__tokenize_comment(inline) {
                        var aa        = 0,
                            out       = [b[a]],
                            type      = "",
                            spareType = [],
                            spareToke = [],
                            spareLine = [];
                        spacer(false);
                        type = (inline === true && lines[lines.length - 1] === 0 && token[token.length - 1] !== "comment" && token[token.length - 1] !== "comment-inline")
                            ? "comment-inline"
                            : "comment";
                        for (aa = a + 1; aa < len; aa += 1) {
                            out.push(b[aa]);
                            if ((inline === false && b[aa - 1] === "*" && b[aa] === "/") || (inline === true && (b[aa + 1] === "\n"))) {
                                break;
                            }
                        }
                        a                    = aa;
                        stats.comments.count += 1;
                        stats.comments.chars += out.length;
                        if (smode === "minify") {
                            out.push("\n");
                        }
                        if (smode === "beautify" || (smode === "diff" && sdiffcomm === true) || (smode === "minify" && stopcoms === true)) {
                            if (token.length > 0 && token[token.length - 1].charAt(token[token.length - 1].length - 1) === "," && types[types.length - 1] !== "comment" && types[types.length - 1] !== "comment-inline") {
                                spareToke.push(token[token.length - 1]);
                                token.pop();
                                types.pop();
                                lines.pop();
                                token.push(out.join(""));
                                types.push(type);
                                lines.push(0);
                                token.push(spareToke[0]);
                                types.push("selector");
                                lines.push(0);
                            } else if (ltype === "colon" || ltype === "property" || ltype === "value" || ltype === "propvar") {
                                do {
                                    spareToke.push(token[token.length - 1]);
                                    spareType.push(types[types.length - 1]);
                                    spareLine.push(lines[lines.length - 1]);
                                    token.pop();
                                    types.pop();
                                    lines.pop();
                                } while (types.length > 1 && types[types.length - 1] !== "semi" && types[types.length - 1] !== "start");
                                token.push(out.join(""));
                                types.push(type);
                                lines.push(0);
                                do {
                                    token.push(spareToke[spareToke.length - 1]);
                                    types.push(spareType[spareType.length - 1]);
                                    lines.push(spareLine[spareLine.length - 1]);
                                    spareToke.pop();
                                    spareType.pop();
                                    spareLine.pop();
                                } while (spareToke.length > 0);
                            } else {
                                ltype = type;
                                types.push(type);
                                token.push(out.join(""));
                                lines.push(0);
                            }
                        }
                    },
                    buildtoken = function csspretty__tokenize_build() {
                        var aa    = 0,
                            bb    = 0,
                            out   = [],
                            block = "",
                            comma = (token.length > 0 && token[token.length - 1].charAt(token[token.length - 1].length - 1) === ",");
                        spacer(false);
                        for (aa = a; aa < len; aa += 1) {
                            out.push(b[aa]);
                            if (block === "") {
                                if (b[aa] === "\"") {
                                    block = "\"";
                                    bb    += 1;
                                } else if (b[aa] === "'") {
                                    block = "'";
                                    bb    += 1;
                                } else if (b[aa] === "(") {
                                    block = ")";
                                    bb    += 1;
                                } else if (b[aa] === "[") {
                                    block = "]";
                                    bb    += 1;
                                } else if (b[aa] === "#" && b[aa + 1] === "{") {
                                    block = "}";
                                    bb    += 1;
                                }
                            } else if ((b[aa] === "(" && block === ")") || (b[aa] === "[" && block === "]")) {
                                bb += 1;
                            } else if (b[aa] === block) {
                                bb -= 1;
                                if (bb === 0) {
                                    block = "";
                                }
                            }
                            if (block === "" && b[aa] !== "\\" && (b[aa + 1] === ";" || b[aa + 1] === ":" || b[aa + 1] === "}" || b[aa + 1] === "{" || (b[aa + 1] === "/" && (b[aa + 2] === "*" || b[aa + 2] === "/")))) {
                                break;
                            }
                        }
                        a        = aa;
                        itemsize = out.length;
                        if (comma === true && types[types.length - 1] !== "comment" && types[types.length - 1] !== "comment-inline") {
                            token[token.length - 1] = token[token.length - 1] + out.join("").replace(/\s+/g, " ").replace(/^\s/, "").replace(/\s$/, "");
                            return;
                        }
                        token.push(out.join("").replace(/\s+/g, " ").replace(/^\s/, "").replace(/\s$/, ""));
                        lines.push(0);
                        if (token[token.length - 1].indexOf("extend(") === 0) {
                            ltype = "pseudo";
                            types.push("pseudo");
                        } else {
                            ltype = "item";
                            types.push("item");
                        }
                    },
                    properties = function csspretty__tokenize_properties() {
                        var aa    = 0,
                            bb    = 1,
                            cc    = 0,
                            dd    = 0,
                            p     = [],
                            set   = [
                                []
                            ],
                            next  = 0,
                            stoke = [],
                            stype = [],
                            sline = [];
                        for (aa = token.length - 1; aa > -1; aa -= 1) {
                            if (types[aa] === "start") {
                                bb -= 1;
                                if (bb === 0) {
                                    next = aa;
                                    set.pop();
                                    for (aa = set.length - 1; aa > -1; aa -= 1) {
                                        set[aa].reverse();
                                    }
                                    break;
                                }
                            }
                            if (types[aa] === "end") {
                                bb += 1;
                            }
                            if (bb === 1 && types[aa] === "property" && smode === "beautify") {
                                p.push(aa);
                            }
                            set[set.length - 1].push(aa);
                            if (bb === 1 && (types[aa - 1] === "comment" || types[aa - 1] === "comment-inline" || types[aa - 1] === "semi" || types[aa - 1] === "end" || types[aa - 1] === "start") && types[aa] !== "start" && types[aa] !== "end") {
                                set.push([]);
                            }
                        }
                        //this reverse fixes the order of consecutive comments
                        set.reverse();
                        bb = 0;
                        if (svertical === true) {
                            for (aa = p.length - 1; aa > -1; aa -= 1) {
                                if (token[p[aa]].length > bb && token[p[aa]] !== "filter" && token[p[aa]] !== "progid") {
                                    bb = token[p[aa]].length;
                                }
                            }
                            for (aa = p.length - 1; aa > -1; aa -= 1) {
                                cc = bb - token[p[aa]].length;
                                if (cc > 0 && token[p[aa]] !== "filter" && token[p[aa]] !== "progid") {
                                    do {
                                        token[p[aa]] = token[p[aa]] + " ";
                                        cc           -= 1;
                                    } while (cc > 0);
                                }
                            }
                        }
                        (function csspretty__tokenize_properties_propcheck() {
                            var leng      = set.length,
                                fourcount = function csspretty__tokenize_properties_propcheck_fourcount(ind, name) {
                                    var test         = [
                                            false, false, false, false
                                        ],
                                        value        = [
                                            "0", "0", "0", "0"
                                        ],
                                        zero         = (/^(0+([a-z]+|%))/),
                                        start        = -1,
                                        yy           = -1,
                                        xx           = 0,
                                        valsplit     = [],
                                        store        = function csspretty__tokenize_properties_propcheck_fourcount_store(side) {
                                            yy          += 1;
                                            value[side] = token[set[xx][2]];
                                            test[side]  = true;
                                            if (start < 0) {
                                                start = xx;
                                            }
                                        },
                                        fixalignment = function csspretty__tokenize_properties_propcheck_fourcount_fixalignment() {
                                            var aaa  = 0,
                                                bbb  = 0,
                                                ccc  = 0,
                                                lenp = p.length;
                                            for (aaa = 0; aaa < lenp; aaa += 1) {
                                                token[p[aaa]] = token[p[aaa]].replace(/(\s+)$/, "");
                                                if (token[p[aaa]].indexOf(name + "-") === 0) {
                                                    p.splice(aaa, 1);
                                                    lenp -= 1;
                                                } else if (token[p[aaa]].replace().length > bbb) {
                                                    bbb = token[p[aaa]].length;
                                                }
                                            }
                                            for (aaa = 0; aaa < lenp; aaa += 1) {
                                                if (token[p[aaa]].length < bbb) {
                                                    ccc = bbb - token[p[aaa]].length;
                                                    do {
                                                        token[p[aaa]] = token[p[aaa]] + " ";
                                                        ccc           -= 1;
                                                    } while (ccc > 0);
                                                }
                                            }
                                        };
                                    for (xx = ind; xx < leng; xx += 1) {
                                        if (token[set[xx][2]] !== undefined && token[set[xx][0]].indexOf(name) === 0) {
                                            if (token[set[xx][0]] === name || token[set[xx][0]].indexOf(name + " ") === 0) {
                                                yy       += 1;
                                                valsplit = token[set[xx][2]].split(" ");
                                                if (valsplit.length === 1) {
                                                    value = [
                                                        token[set[xx][2]], token[set[xx][2]], token[set[xx][2]], token[set[xx][2]]
                                                    ];
                                                } else if (valsplit.length === 2) {
                                                    value = [
                                                        valsplit[0], valsplit[1], valsplit[0], valsplit[1]
                                                    ];
                                                } else if (valsplit.length === 3) {
                                                    value = [
                                                        valsplit[0], valsplit[1], valsplit[2], valsplit[1]
                                                    ];
                                                } else if (valsplit.length === 4) {
                                                    value = [
                                                        valsplit[0], valsplit[1], valsplit[2], valsplit[3]
                                                    ];
                                                }
                                                test  = [
                                                    true, true, true, true
                                                ];
                                                start = xx;
                                            } else if (token[set[xx][0]].indexOf(name + "-bottom") === 0) {
                                                store(2);
                                            } else if (token[set[xx][0]].indexOf(name + "-left") === 0) {
                                                store(3);
                                            } else if (token[set[xx][0]].indexOf(name + "-right") === 0) {
                                                store(1);
                                            } else if (token[set[xx][0]].indexOf(name + "-top") === 0) {
                                                store(0);
                                            }
                                        }
                                        if (token[set[xx][0]].indexOf(name) !== 0 || xx === leng - 1) {
                                            if (test[0] === true && test[1] === true && test[2] === true && test[3] === true) {
                                                set.splice(start + 1, yy);
                                                leng                 -= yy;
                                                token[set[start][0]] = name;
                                                if (zero.test(value[0]) === true) {
                                                    value[0] = "0";
                                                }
                                                if (zero.test(value[1]) === true) {
                                                    value[1] = "0";
                                                }
                                                if (zero.test(value[2]) === true) {
                                                    value[2] = "0";
                                                }
                                                if (zero.test(value[3]) === true) {
                                                    value[3] = "0";
                                                }
                                                if (value[1] === value[3]) {
                                                    value.pop();
                                                    if (value[0] === value[2]) {
                                                        value.pop();
                                                        if (value[0] === value[1]) {
                                                            value.pop();
                                                        }
                                                    }
                                                }
                                                token[set[start][2]] = value.join(" ");
                                                if (smode === "beautify" && svertical === true) {
                                                    if (token[set[start][0]].charAt(token[set[start][0]].length - 1) === " ") {
                                                        yy = token[set[start][0]].length - name.length;
                                                        do {
                                                            name = name + " ";
                                                            yy   -= 1;
                                                        } while (yy > 0);
                                                    } else {
                                                        fixalignment();
                                                    }
                                                }
                                            }
                                            break;
                                        }
                                    }
                                };
                            leng = set.length;
                            for (aa = 0; aa < leng; aa += 1) {
                                if (types[set[aa][0]] === "property") {
                                    if (token[set[aa][0]].indexOf("margin") === 0) {
                                        fourcount(aa, "margin");
                                    }
                                    if (token[set[aa][0]].indexOf("padding") === 0) {
                                        fourcount(aa, "padding");
                                    }
                                }
                            }
                        }());
                        bb = set.length;
                        for (aa = 0; aa < bb; aa += 1) {
                            dd = set[aa].length;
                            for (cc = 0; cc < dd; cc += 1) {
                                stoke.push(token[set[aa][cc]]);
                                stype.push(types[set[aa][cc]]);
                                sline.push(lines[set[aa][cc]]);
                            }
                        }
                        token.splice(next + 1, token.length - next - 1);
                        types.splice(next + 1, types.length - next - 1);
                        lines.splice(next + 1, lines.length - next - 1);
                        token = token.concat(stoke);
                        types = types.concat(stype);
                        lines = lines.concat(sline);
                    };
                for (a = 0; a < len; a += 1) {
                    if (ltype !== "comment" && ltype !== "comment-inline" && ltype !== "" && stopcoms === true) {
                        stopcoms = false;
                    }
                    if ((/\s/).test(b[a]) === true) {
                        stats.space += 1;
                        space       += b[a];
                    } else if (b[a] === "/" && b[a + 1] === "*") {
                        comment(false);
                    } else if (b[a] === "/" && b[a + 1] === "/") {
                        comment(true);
                    } else if (b[a] === "{") {
                        if (token[token.length - 2] === ":") {
                            types[types.length - 1] = "pseudo";
                        }
                        item("start");
                        ltype = "start";
                        types.push("start");
                        token.push("{");
                        lines.push(0);
                        stats.braces += 1;
                        space        = "";
                    } else if (b[a] === "}") {
                        if (types[types.length - 1] === "item" && token[token.length - 2] === "{" && token[token.length - 3] !== undefined && token[token.length - 3].charAt(token[token.length - 3].length - 1) === "@") {
                            //less variable selector
                            token[token.length - 3] = token[token.length - 3] + "{" + token[token.length - 1] + "}";
                            token.pop();
                            token.pop();
                            types.pop();
                            types.pop();
                            lines.pop();
                            lines.pop();
                        } else {
                            item("end");
                            if (smode !== "diff") {
                                properties();
                            }
                            ltype = "end";
                            if (sobjsort === true) {
                                objSort();
                            }
                            types.push("end");
                            token.push("}");
                            lines.push(0);
                            stats.braces += 1;
                            space        = "";
                        }
                    } else if (b[a] === ";") {
                        item("semi");
                        if (types[types.length - 1] !== "semi") {
                            ltype = "semi";
                            types.push("semi");
                            token.push(";");
                            lines.push(0);
                        }
                        stats.semi += 1;
                        space      = "";
                    } else if (b[a] === ":") {
                        item("colon");
                        ltype = "colon";
                        types.push("colon");
                        token.push(":");
                        lines.push(0);
                        stats.colon += 1;
                        space       = "";
                    } else {
                        buildtoken();
                    }
                }
                spacer(true);
            }());
            if (smode === "parse") {
                return {
                    token: token,
                    types: types
                };
            }
            if (smode !== "minify") {
                output = (function csspretty__beautify() {
                    var a        = 0,
                        len      = token.length,
                        build    = [],
                        indent   = sinlevel,
                        mixin    = false,
                        tab      = (function csspretty__beautify_tab() {
                            var aa = 0,
                                bb = [];
                            for (aa = 0; aa < sinsize; aa += 1) {
                                bb.push(sinchar);
                            }
                            return bb.join("");
                        }()),
                        nl       = function csspretty__beautify_nl(tabs) {
                            var aa = 0;
                            build.push("\n");
                            for (aa = 0; aa < tabs; aa += 1) {
                                build.push(tab);
                            }
                        },
                        selector = function csspretty__beautify_selector(item) {
                            var aa    = 0,
                                bb    = 0,
                                cc    = 0,
                                block = "",
                                items = [],
                                leng  = item.length;
                            for (aa = 0; aa < leng; aa += 1) {
                                if (block === "") {
                                    if (item.charAt(aa) === "\"") {
                                        block = "\"";
                                        bb    += 1;
                                    } else if (item.charAt(aa) === "'") {
                                        block = "'";
                                        bb    += 1;
                                    } else if (item.charAt(aa) === "(") {
                                        block = ")";
                                        bb    += 1;
                                    } else if (item.charAt(aa) === "[") {
                                        block = "]";
                                        bb    += 1;
                                    }
                                } else if ((item.charAt(aa) === "(" && block === ")") || (item.charAt(aa) === "[" && block === "]")) {
                                    bb += 1;
                                } else if (item.charAt(aa) === block) {
                                    bb -= 1;
                                    if (bb === 0) {
                                        block = "";
                                    }
                                }
                                if (block === "" && item.charAt(aa) === ",") {
                                    items.push(item.substring(cc, aa + 1));
                                    cc = aa + 1;
                                }
                            }
                            if (cc > 0) {
                                items.push(item.substr(cc));
                            }
                            leng = items.length;
                            if (leng === 0) {
                                items.push(item);
                            }
                            build.push(items[0].replace(/,(\s*)/g, ", ").replace(/(,\ )$/, ","));
                            for (aa = 1; aa < leng; aa += 1) {
                                nl(indent);
                                build.push(items[aa].replace(/,(\s*)/g, ", ").replace(/(,\ )$/, ","));
                            }
                            build.push(" ");
                        };
                    if (sinlevel > 0) {
                        a = sinlevel;
                        do {
                            a -= 1;
                            build.push(tab);
                        } while (a > 0);
                    }
                    for (a = 0; a < len; a += 1) {
                        if (types[a] === "start") {
                            if (a > 0 && token[a - 1].charAt(token[a - 1].length - 1) === "#") {
                                build.push(token[a]);
                            } else {
                                if (types[a - 1] === "colon") {
                                    build.push(" ");
                                }
                                build.push(token[a]);
                                indent += 1;
                                nl(indent);
                            }
                        } else if (types[a] === "end") {
                            if (mixin === true) {
                                mixin = false;
                                build.push(token[a]);
                                build.push(" ");
                            } else {
                                indent -= 1;
                                nl(indent);
                                build.push(token[a]);
                                if (types[a + 1] !== "end" && types[a + 1] !== "semi") {
                                    nl(indent);
                                }
                            }
                            if (scssinsertlines === true && types[a + 1] !== "end") {
                                build.push("\n");
                            }
                        } else if (types[a] === "semi") {
                            if (token[a] !== "x;") {
                                build.push(token[a]);
                            }
                            if (types[a + 1] === "comment-inline") {
                                build.push(" ");
                            } else if (types[a + 1] !== "end") {
                                nl(indent);
                            }
                        } else if (types[a] === "selector") {
                            if (spres === true && lines[a - 1] > 0) {
                                nl(indent);
                            }
                            if (token[a].charAt(token[a].length - 1) === "#") {
                                build.push(token[a]);
                                mixin = true;
                            } else if (token[a].indexOf(",") > -1) {
                                selector(token[a]);
                            } else {
                                if (token[a].charAt(0) === ":" && token[a - 1] === "}" && build[build.length - 1] === " ") {
                                    build.pop();
                                }
                                build.push(token[a]);
                                build.push(" ");
                            }
                        } else if ((types[a] === "comment" || types[a] === "comment-inline") && types[a - 1] !== "colon" && types[a - 1] !== "property") {
                            if (lines[a - 1] > 0) {
                                nl(indent);
                            }
                            build.push(token[a]);
                            if (types[a + 1] !== "end") {
                                nl(indent);
                            }
                        } else {
                            if (types[a] === "value" && types[a - 1] !== "semi" && (mixin === false || token[a - 1] === ":") && token[a - 2] !== "filter" && token[a - 2] !== "progid") {
                                build.push(" ");
                            }
                            build.push(token[a]);
                        }
                    }
                    if (spres === true && (lines[lines.length - 1] > 0 || endline === true)) {
                        return build.join("").replace(/(\s+)$/, "\n");
                    }
                    return build.join("").replace(/(\s+)$/, "");
                }());
            } else {
                output = token.join("").replace(/;\}/g, "}");
            }
            if (smode === "beautify") {
                summary = (function csspretty__summary() {
                    var summ = [],
                        inl  = ssource.length,
                        out  = output.length,
                        uris = uri.length,
                        uric = 0,
                        a    = 0,
                        b    = 0;
                    summ.push("<div class='doc' id='cssreport'><p><strong>Number of HTTP requests:</strong> <em" +
                            ">");
                    summ.push(uris);
                    summ.push("</em></p><table class='analysis' id='css-parts' summary='Component counts and si" +
                            "zes'><caption>Component counts and sizes</caption><thead><tr><th>Type Name</th><" +
                            "th>Quantity</th><th>Character Size</th></tr></thead><tbody><tr><th>curly braces<" +
                            "/th><td>");
                    summ.push(stats.braces);
                    summ.push("</td><td>");
                    summ.push(stats.braces);
                    summ.push("</td></tr><tr><th>colon</th><td>");
                    summ.push(stats.colon);
                    summ.push("</td><td>");
                    summ.push(stats.colon);
                    summ.push("</td></tr><tr><th>comments</th><td>");
                    summ.push(stats.comments.count);
                    summ.push("</td><td>");
                    summ.push(stats.comments.chars);
                    summ.push("</td></tr><tr><th>properties</th><td>");
                    summ.push(stats.properties.count);
                    summ.push("</td><td>");
                    summ.push(stats.properties.chars);
                    summ.push("</td></tr><tr><th>selectors</th><td>");
                    summ.push(stats.selectors.count);
                    summ.push("</td><td>");
                    summ.push(stats.selectors.chars);
                    summ.push("</td></tr><tr><th>semicolons</th><td>");
                    summ.push(stats.semi);
                    summ.push("</td><td>");
                    summ.push(stats.semi);
                    summ.push("</td></tr><tr><th>white space</th><td>");
                    summ.push(stats.space);
                    summ.push("</td><td>");
                    summ.push(stats.space);
                    summ.push("</td></tr><tr><th>values</th><td>");
                    summ.push(stats.values.count);
                    summ.push("</td><td>");
                    summ.push(stats.values.chars);
                    summ.push("</td></tr><tr><th>variables</th><td>");
                    summ.push(stats.variables.count);
                    summ.push("</td><td>");
                    summ.push(stats.variables.chars);
                    summ.push("</td></tr></tbody></table><table class='analysis' id='css-size' summary='CSS cha" +
                            "racter size change'><caption>CSS character size change</caption><tbody><tr><th>I" +
                            "nput</th><td>");
                    summ.push(inl);
                    summ.push("</td></tr><tr><th>Output</th><td>");
                    summ.push(out);
                    summ.push("</td></tr><tr><th>");
                    if (out > inl) {
                        summ.push("Increase</th><td>");
                        summ.push(out - inl);
                        summ.push("</td></tr><tr><th>Percent Change</th><td>");
                        a = (((out - inl) / out) * 100);
                        summ.push(a.toFixed(2));
                    } else {
                        summ.push("Decrease</th><td>");
                        summ.push(inl - out);
                        summ.push("</td></tr><tr><th>Percent Change</th><td>");
                        a = (((inl - out) / inl) * 100);
                        summ.push(a.toFixed(2));
                    }
                    summ.push("%</td></tr></tbody></table><table class='analysis' id='css-uri' summary='A list " +
                            "of HTTP requests'><caption>A List of HTTP Requests</caption><thead><tr><th>Quant" +
                            "ity</th><th>URI</th></tr></thead><tbody>");
                    for (a = 0; a < uris; a += 1) {
                        uric = 1;
                        for (b = a + 1; b < uris; b += 1) {
                            if (uri[a] === uri[b]) {
                                uric += 1;
                                uri.splice(b, 1);
                                uris -= 1;
                            }
                        }
                        summ.push("<tr><td>");
                        summ.push(uric);
                        summ.push("</td><td>");
                        summ.push(uri[a].replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"));
                        summ.push("</td></tr>");
                    }
                    summ.push("</tbody></table></div>");
                    return summ.join("");
                }());
            }
            return output;
        };

        //Library to change CSV (and similar formats) to something
        //human readable.
        csvbeauty    = function csvbeauty(source, ch) {
            var errorLocation  = "",
                a              = 0,
                b              = 0,
                quotedNewlines = [],
                error          = "Error: Unterminated string begging at character number ";
            (function csvbeauty__logic() {
                var bb     = 0,
                    srcLen = 0,
                    src    = [];
                source = source.replace(/\{csv/g, "{prettydiffcsv").replace(/"{2}/g, "{csvquote}");
                src    = source.split("");
                srcLen = src.length;
                for (a = 0; a < srcLen; a += 1) {
                    if (src[a] === "\"") {
                        for (bb = a + 1; bb < srcLen; bb += 1) {
                            if (src[bb] === "\"") {
                                quotedNewlines.push(source.slice(a, bb + 1));
                                src[a]  = "{csvstring}";
                                src[bb] = "";
                                a       = bb + 1;
                                break;
                            }
                            src[bb] = "";
                        }
                        if (bb === srcLen) {
                            errorLocation = src.join("").slice(a, a + 9);
                            source        = error;
                            return;
                        }
                    }
                }
                source = src.join("").replace(/\{csvquote\}/g, "\"\"");
            }());
            if (ch === "") {
                ch = ",";
            } else {
                ch = charDecoder(ch);
            }
            if (ch.length > source.length) {
                return source.replace(/\{prettydiffcsv/g, "{csv");
            }
            if (source === error) {
                if (a !== source.length - 1) {
                    return source + a + ", '" + errorLocation + "'.";
                }
                return source + a + ".";
            }
            source = source.replace(/\n/g, "\n\n{-}\n\n");
            if (source.charAt(source.length - ch.length) === ch) {
                source = source.slice(0, source.length + 1 - ch.length) + "{|}";
            }
            do {
                source = source.replace(ch, "\n");
            } while (source.indexOf(ch) !== -1);
            b = quotedNewlines.length;
            for (a = 0; a < b; a += 1) {
                quotedNewlines[a] = quotedNewlines[a].replace(/\n/g, "{ }");
                source            = source.replace("{csvstring}", quotedNewlines[a]);
            }
            return source.replace(/\{csvquote\}/g, "\"").replace(/\{prettydiffcsv/g, "{csv");
        };

        //Library to regress changes made by csvbeauty back to the standard format.
        csvmin       = function csvmin(source, ch) {
            if (ch === "") {
                ch = ",";
            } else {
                ch = charDecoder(ch);
            }
            (function csvmin__logic() {
                var multiline     = function csvmin__logic_multiline(x) {
                        var output = [],
                            y      = 0,
                            len    = x.length - 2;
                        if (len === 0) {
                            return "{ }";
                        }
                        for (y = 0; y < len; y += 1) {
                            output.push(ch);
                        }
                        return output.join("") + "{ }";
                    },
                    a             = 0,
                    b             = 0,
                    segment       = [],
                    partLen       = 0,
                    part          = [],
                    srcLines      = source.replace(/\n\n\{-\}\n\n/g, "{-}").replace(/\n{2,}/g, multiline).split("\n"),
                    srcLen        = srcLines.length,
                    errorLocation = "",
                    error         = "Error: Unterminated String begging at character number ";
                for (a = 0; a < srcLen; a += 1) {
                    segment = [];
                    if (typeof srcLines[a] === "string" && srcLines[a].indexOf("\"") !== -1) {
                        part    = srcLines[a].split("");
                        partLen = part.length;
                        for (b = 0; b < partLen; b += 1) {
                            if (part[b] === "\"") {
                                segment.push(b);
                            }
                        }
                        if (segment.length === 1) {
                            srcLines[a]   = part.join("");
                            errorLocation = srcLines[a].slice(segment[0], segment[0] + 9);
                            return error + (srcLines.join(ch).indexOf(srcLines[a]) + segment[0]) + " or value number " + (a + 1) + ", '" + errorLocation + "'.";
                        }
                        if (segment.length > 2) {
                            partLen = segment.length - 1;
                            for (b = 1; b < partLen; b += 1) {
                                part[segment[b]] = "\"\"";
                            }
                        }
                        srcLines[a] = part.join("");
                    }
                }
                if (srcLines[srcLines.length - 1] === "{|}") {
                    srcLines[srcLines.length - 1] = "";
                }
                source = srcLines.join(ch).replace(/\n/g, ch);
            }());
            do {
                source = source.replace("{ }", "\n");
            } while (source.indexOf("{ }") !== -1);
            source = source.replace(/\n{2}/g, "\n");
            if (source.indexOf("{|}") === source.length - 3) {
                source = source.slice(0, source.length - 3) + ch;
            }
            return source.replace(/\{-\}/g, "\n");
        };

        //Library to compare text input
        diffview     = function diffview(args) {
            var errorout      = 0,
                diffline      = 0,
                baseTextLines = (typeof args.baseTextLines === "string")
                    ? args.baseTextLines.replace(/\u0000|\u0001|\u0002|\u0003|\u0004|\u0005|\u0006|\u0007|\u0008|\u000b|\u000c|\u000e|\u000f|\u0010|\u0011|\u0012|\u0013|\u0014|\u0015|\u0016|\u0017|\u0018|\u0019|\u001a|\u001b|\u001c|\u001d|\u001e|\u001f|\u007f|\u0080|\u0081|\u0082|\u0083|\u0084|\u0085|\u0086|\u0087|\u0088|\u0089|\u008a|\u008b|\u008c|\u008d|\u008e|\u008f|\u0090|\u0091|\u0092|\u0093|\u0094|\u0095|\u0096|\u0097|\u0098|\u0099|\u009a|\u009b|\u009c|\u009d|\u009e|\u009f/g, "")
                    : "",
                newTextLines  = (typeof args.newTextLines === "string")
                    ? args.newTextLines.replace(/\u0000|\u0001|\u0002|\u0003|\u0004|\u0005|\u0006|\u0007|\u0008|\u000b|\u000c|\u000e|\u000f|\u0010|\u0011|\u0012|\u0013|\u0014|\u0015|\u0016|\u0017|\u0018|\u0019|\u001a|\u001b|\u001c|\u001d|\u001e|\u001f|\u007f|\u0080|\u0081|\u0082|\u0083|\u0084|\u0085|\u0086|\u0087|\u0088|\u0089|\u008a|\u008b|\u008c|\u008d|\u008e|\u008f|\u0090|\u0091|\u0092|\u0093|\u0094|\u0095|\u0096|\u0097|\u0098|\u0099|\u009a|\u009b|\u009c|\u009d|\u009e|\u009f/g, "")
                    : "",
                baseTextName  = (typeof args.baseTextName === "string")
                    ? args.baseTextName.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
                    : "Base Source",
                newTextName   = (typeof args.newTextName === "string")
                    ? args.newTextName.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
                    : "New Source",
                diffcli       = (args.diffcli === true || args.diffcli === "true"),
                context       = ((/^([0-9]+)$/).test(args.contextSize))
                    ? Number(args.contextSize)
                    : -1,
                tsize         = ((/^([0-9]+)$/).test(args.tsize))
                    ? Number(args.tsize)
                    : 4,
                tchar         = (typeof args.tchar === "string")
                    ? args.tchar
                    : " ",
                inline        = (args.inline === true || args.inline === "true"),
                tab           = (function diffview__tab() {
                    var a      = 0,
                        output = [];
                    if (tchar === "") {
                        return "";
                    }
                    for (a = 0; a < tsize; a += 1) {
                        output.push(tchar);
                    }
                    return output.join("");
                }()),
                stringAsLines = function diffview__stringAsLines(str) {
                    var lfpos     = str.indexOf("\n"),
                        crpos     = str.indexOf("\r"),
                        linebreak = ((lfpos > -1 && crpos > -1) || crpos < 0)
                            ? "\n"
                            : "\r",
                        lines     = "";
                    if (linebreak === "\n") {
                        str = str.replace(/\r/g, "");
                    } else {
                        str = str.replace(/\n/g, "");
                    }
                    lines = (diffcli === true)
                        ? str
                        : str.replace(/&/g, "&amp;").replace(/&#lt;/g, "$#lt;").replace(/&#gt;/g, "$#gt;").replace(/</g, "$#lt;").replace(/>/g, "$#gt;");
                    return lines.split(linebreak);
                },
                baseTextArray = stringAsLines(baseTextLines),
                newTextArray  = stringAsLines(newTextLines),
                opcodes       = (function diffview__opcodes() {
                    var junkdict            = {},
                        isbjunk             = function diffview__opcodes_isbjunk(key) {
                            if (junkdict.hasOwnProperty(key)) {
                                return junkdict[key];
                            }
                        },
                        sourceFirst         = [],
                        sourceSecond        = [],
                        secondInContext     = [],
                        reverse             = false,
                        matching_blocks     = [],
                        answer              = [],
                        get_matching_blocks = function diffview__opcodes_getMatchingBlocks() {
                            var a                  = 0,
                                matchingLen        = 0,
                                lowFirst           = 0,
                                highFirst          = 0,
                                lowSecond          = 0,
                                highSecond         = 0,
                                bestLongestFirst   = 0,
                                bestLongestSecond  = 0,
                                bestLongestSize    = 0,
                                matchFirstPrior    = 0,
                                matchFirstNew      = 0,
                                matchSecondPrior   = 0,
                                matchSecondNew     = 0,
                                matchSizePrior     = 0,
                                matchSizeNew       = 0,
                                sourceFirstLength  = sourceFirst.length,
                                sourceSecondLength = sourceSecond.length,
                                matchInstance      = [],
                                queueInstance      = [],
                                non_adjacent       = [],
                                queue              = [
                                    [
                                        0, sourceFirstLength, 0, sourceSecondLength
                                    ]
                                ],
                                matchingSort       = function diffview__opcodes_getMatchingBlocks_ntuplecomp(x, y) {
                                    var b   = 0,
                                        end = Math.max(x.length, y.length);
                                    for (b = 0; b < end; b += 1) {
                                        if (x[b] < y[b]) {
                                            return -1;
                                        }
                                        if (x[b] > y[b]) {
                                            return 1;
                                        }
                                    }
                                    return (x.length === y.length)
                                        ? 0
                                        : ((x.length < y.length)
                                            ? -1
                                            : 1);
                                },
                                find_longest_match = function diffview__opcodes_getMatchingBlocks_findLongestMatch(lowFirst, highFirst, lowSecond, highSecond) {
                                    var b                   = 0,
                                        c                   = 0,
                                        sContextLength      = secondInContext.length,
                                        sContextCompareLine = 0,
                                        distance            = 0,
                                        priorLine           = [
                                            0, 0
                                        ],
                                        bestFirst           = lowFirst,
                                        bestSecond          = lowSecond,
                                        bestsize            = 0;
                                    for (b = lowFirst; b < highFirst; b += 1) {
                                        for (c = 0; c < sContextLength; c += 1) {
                                            if (secondInContext[c][1] === sourceFirst[b] && (sourceFirst[b] !== sourceSecond[b] || b === highFirst - 1 || sourceFirst[b + 1] === sourceSecond[b + 1])) {
                                                sContextCompareLine = secondInContext[c][0];
                                                break;
                                            }
                                        }
                                        if (c !== sContextLength) {
                                            if (sContextCompareLine >= lowSecond) {
                                                if (sContextCompareLine >= highSecond) {
                                                    break;
                                                }
                                                if (priorLine[0] === sContextCompareLine - 1) {
                                                    distance = priorLine[1] + 1;
                                                } else {
                                                    distance = 1;
                                                }
                                                if (distance > bestsize) {
                                                    bestFirst  = b - distance + 1;
                                                    bestSecond = sContextCompareLine - distance + 1;
                                                    bestsize   = distance;
                                                }
                                            }
                                            priorLine = [
                                                sContextCompareLine, distance
                                            ];
                                        }
                                    }
                                    while (bestFirst > lowFirst && bestSecond > lowSecond && isbjunk(sourceSecond[bestSecond - 1]) === undefined && sourceFirst[bestFirst - 1] === sourceSecond[bestSecond - 1]) {
                                        bestFirst  -= 1;
                                        bestSecond -= 1;
                                        bestsize   += 1;
                                    }
                                    while (bestFirst + bestsize < highFirst && bestSecond + bestsize < highSecond && isbjunk(sourceSecond[bestSecond + bestsize]) === undefined && sourceFirst[bestFirst + bestsize] === sourceSecond[bestSecond + bestsize]) {
                                        bestsize += 1;
                                    }
                                    while (bestFirst > lowFirst && bestSecond > lowSecond && isbjunk(sourceSecond[bestSecond - 1]) !== undefined && sourceFirst[bestFirst - 1] === sourceSecond[bestSecond - 1]) {
                                        bestFirst  -= 1;
                                        bestSecond -= 1;
                                        bestsize   += 1;
                                    }
                                    while (bestFirst + bestsize < highFirst && bestSecond + bestsize < highSecond && isbjunk(sourceSecond[bestSecond + bestsize]) !== undefined && sourceFirst[bestFirst + bestsize] === sourceSecond[bestSecond + bestsize]) {
                                        bestsize += 1;
                                    }
                                    return [
                                        bestFirst, bestSecond, bestsize
                                    ];
                                };
                            while (queue.length > 0) {
                                queueInstance     = queue.pop();
                                lowFirst          = queueInstance[0];
                                highFirst         = queueInstance[1];
                                lowSecond         = queueInstance[2];
                                highSecond        = queueInstance[3];
                                matchInstance     = find_longest_match(lowFirst, highFirst, lowSecond, highSecond);
                                bestLongestFirst  = matchInstance[0];
                                bestLongestSecond = matchInstance[1];
                                bestLongestSize   = matchInstance[2];
                                if (bestLongestSize > 0) {
                                    matching_blocks.push(matchInstance);
                                    if (lowFirst < bestLongestFirst && lowSecond < bestLongestSecond) {
                                        queue.push([
                                            lowFirst, bestLongestFirst, lowSecond, bestLongestSecond
                                        ]);
                                    }
                                    if (bestLongestFirst + bestLongestSize < highFirst && bestLongestSecond + bestLongestSize < highSecond) {
                                        queue.push([
                                            bestLongestFirst + bestLongestSize, highFirst, bestLongestSecond + bestLongestSize, highSecond
                                        ]);
                                    }
                                }
                            }
                            matching_blocks.sort(matchingSort);
                            matchingLen = matching_blocks.length;
                            for (a = 0; a < matchingLen; a += 1) {
                                matchFirstNew  = matching_blocks[a][0];
                                matchSecondNew = matching_blocks[a][1];
                                matchSizeNew   = matching_blocks[a][2];
                                if (matchFirstPrior + matchSizePrior === matchFirstNew && matchSecondPrior + matchSizePrior === matchSecondNew) {
                                    matchSizePrior += matchSizeNew;
                                } else {
                                    if (matchSizePrior > 0) {
                                        non_adjacent.push([
                                            matchFirstPrior, matchSecondPrior, matchSizePrior
                                        ]);
                                    }
                                    matchFirstPrior  = matchFirstNew;
                                    matchSecondPrior = matchSecondNew;
                                    matchSizePrior   = matchSizeNew;
                                }
                            }
                            if (matchSizePrior > 0) {
                                non_adjacent.push([
                                    matchFirstPrior, matchSecondPrior, matchSizePrior
                                ]);
                            }
                            non_adjacent.push([
                                sourceFirstLength, sourceSecondLength, 0
                            ]);
                            return non_adjacent;
                        };
                    if (baseTextLines === "" || newTextLines === "") {
                        return "";
                    }
                    (function diffview__opcodes_diffArray() {
                        (function diffview__opcodes_diffArray_determineReverse() {
                            if (baseTextArray.length > newTextArray.length) {
                                reverse      = true;
                                sourceFirst  = newTextArray;
                                sourceSecond = baseTextArray;
                            } else {
                                sourceFirst  = baseTextArray;
                                sourceSecond = newTextArray;
                            }
                        }());
                        (function diffview__opcodes_diffArray_clarity() {
                            var a          = 0,
                                b          = 0,
                                sourceLine = "",
                                ssLen      = sourceSecond.length;
                            for (a = 0; a < ssLen; a += 1) {
                                sourceLine = sourceSecond[a];
                                for (b = secondInContext.length - 1; b > -1; b -= 1) {
                                    if (secondInContext[b][1] === sourceLine) {
                                        break;
                                    }
                                }
                                if (b > -1) {
                                    if (ssLen >= 200 && 100 > ssLen) {
                                        secondInContext.splice(b, 1);
                                    }
                                } else {
                                    secondInContext.push([
                                        a, sourceLine
                                    ]);
                                }
                            }
                        }());
                        (function diffview__opcodes_diffArray_algorithm() {
                            var a              = 0,
                                matchingFirst  = 0,
                                matchingSecond = 0,
                                matchingSize   = 0,
                                tag            = "",
                                firstSize      = 0,
                                secondSize     = 0,
                                blocks         = get_matching_blocks(),
                                blockLength    = blocks.length,
                                closerMatch    = function diffview__opcodes_diffArray_algorithm_closerMatch(current, next, compare) {
                                    var diffspot       = function diffview__opcodes_diffArray_algorithm_closerMatch_diffspot(test, base) {
                                            var b           = 0,
                                                cleanedTest = test.replace(/^(\s+)/, "").split(""),
                                                minSize     = Math.min(cleanedTest.length, base.length);
                                            for (b = 0; b < minSize; b += 1) {
                                                if (cleanedTest[b] !== base[b]) {
                                                    return b;
                                                }
                                            }
                                            return b;
                                        },
                                        cleanedCompare = compare.replace(/^(\s+)/, "").split(""),
                                        test           = diffspot(next, cleanedCompare) - diffspot(current, cleanedCompare);
                                    if (test > 0) {
                                        return true;
                                    }
                                    return false;
                                };
                            for (a = 0; a < blockLength; a += 1) {
                                matchingFirst  = blocks[a][0];
                                matchingSecond = blocks[a][1];
                                matchingSize   = blocks[a][2];
                                tag            = "";
                                if (firstSize < matchingFirst && secondSize < matchingSecond) {
                                    if (firstSize - secondSize !== matchingFirst - matchingSecond && secondSize - matchingSecond < 3 && firstSize - matchingFirst < 3) {
                                        if (reverse === true && firstSize - matchingFirst > secondSize - matchingSecond) {
                                            if (closerMatch(sourceSecond[secondSize], sourceSecond[secondSize + 1], sourceFirst[firstSize]) === true) {
                                                answer.push([
                                                    "delete", secondSize, secondSize + 1, firstSize, firstSize
                                                ]);
                                                answer.push([
                                                    "replace", secondSize + 1, matchingSecond, firstSize, matchingFirst
                                                ]);
                                            } else {
                                                answer.push([
                                                    "replace", secondSize, matchingSecond, firstSize, matchingFirst
                                                ]);
                                            }
                                        } else if (reverse === false && matchingSecond - secondSize > matchingFirst - firstSize) {
                                            if (closerMatch(sourceSecond[secondSize], sourceSecond[secondSize + 1], sourceFirst[firstSize]) === true) {
                                                answer.push([
                                                    "insert", firstSize, firstSize, secondSize, secondSize + 1
                                                ]);
                                                answer.push([
                                                    "replace", firstSize, matchingFirst, secondSize + 1, matchingSecond
                                                ]);
                                            } else {
                                                answer.push([
                                                    "replace", firstSize, matchingFirst, secondSize, matchingSecond
                                                ]);
                                            }
                                        } else {
                                            tag = "replace";
                                        }
                                    } else {
                                        tag = "replace";
                                    }
                                } else if (firstSize < matchingFirst) {
                                    if (reverse === true) {
                                        tag = "insert";
                                    } else {
                                        tag = "delete";
                                    }
                                } else if (secondSize < matchingSecond) {
                                    if (reverse === true) {
                                        tag = "delete";
                                    } else {
                                        tag = "insert";
                                    }
                                }
                                if (tag !== "") {
                                    if (reverse === true) {
                                        answer.push([
                                            tag, secondSize, matchingSecond, firstSize, matchingFirst
                                        ]);
                                    } else {
                                        answer.push([
                                            tag, firstSize, matchingFirst, secondSize, matchingSecond
                                        ]);
                                    }
                                }
                                firstSize  = matchingFirst + matchingSize;
                                secondSize = matchingSecond + matchingSize;
                                if (matchingSize > 0) {
                                    if (reverse === true) {
                                        answer.push([
                                            "equal", matchingSecond, secondSize, matchingFirst, firstSize
                                        ]);
                                    } else {
                                        answer.push([
                                            "equal", matchingFirst, firstSize, matchingSecond, secondSize
                                        ]);
                                    }
                                }
                            }
                        }());
                    }());
                    return answer;
                }());
            return (function diffview__report() {
                var a              = 0,
                    i              = 0,
                    node           = ["<div class='diff'>"],
                    data           = (diffcli === true)
                        ? [
                            [], [], [], [], [], []
                        ]
                        : [
                            [], [], [], []
                        ],
                    baseStart      = 0,
                    baseEnd        = 0,
                    newStart       = 0,
                    newEnd         = 0,
                    rowcnt         = 0,
                    foldcount      = 0,
                    foldback       = 0,
                    foldstart      = 0,
                    jump           = 0,
                    finaldoc       = "",
                    tabFix         = (tab === "")
                        ? ""
                        : new RegExp("^((" + tab.replace(/\\/g, "\\") + ")+)"),
                    noTab          = function diffview__report_noTab(str) {
                        var b      = 0,
                            strLen = str.length,
                            output = [];
                        for (b = 0; b < strLen; b += 1) {
                            output.push(str[b].replace(tabFix, ""));
                        }
                        return output;
                    },
                    baseTab        = (tab === "")
                        ? []
                        : noTab(baseTextArray),
                    newTab         = (tab === "")
                        ? []
                        : noTab(newTextArray),
                    opcodesLength  = opcodes.length,
                    change         = "",
                    btest          = false,
                    ntest          = false,
                    repeat         = false,
                    ctest          = true,
                    code           = [],
                    charcompOutput = [],
                    charcomp       = function diffview__report_charcomp(lineA, lineB) {
                        var b             = 0,
                            dataA         = [],
                            dataB         = [],
                            cleanedA      = (diffcli === true)
                                ? lineA
                                : lineA.replace(/&#160;/g, " ").replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/\$#lt;/g, "<").replace(/\$#gt;/g, ">").replace(/&amp;/g, "&"),
                            cleanedB      = (diffcli === true)
                                ? lineB
                                : lineB.replace(/&#160;/g, " ").replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/\$#lt;/g, "<").replace(/\$#gt;/g, ">").replace(/&amp;/g, "&"),
                            dataMinLength = 0,
                            currentdiff   = [],
                            regStart      = (/_pdiffdiff\u005f/g),
                            regEnd        = (/_epdiffdiff\u005f/g),
                            strStart      = "_pdiffdiff_",
                            strEnd        = "_epdiffdiff_",
                            tabdiff       = (function diffview__report_charcomp_tabdiff() {
                                var tabMatchA  = "",
                                    tabMatchB  = "",
                                    splitA     = "",
                                    splitB     = "",
                                    analysis   = [],
                                    matchListA = cleanedA.match(tabFix),
                                    matchListB = cleanedB.match(tabFix);
                                if (matchListA === null || matchListB === null || (matchListA[0] === "" && matchListA.length === 1) || (matchListB[0] === "" && matchListB.length === 1)) {
                                    return [
                                        "", "", cleanedA, cleanedB
                                    ];
                                }
                                tabMatchA = matchListA[0];
                                tabMatchB = matchListB[0];
                                splitA    = cleanedA.split(tabMatchA)[1];
                                splitB    = cleanedB.split(tabMatchB)[1];
                                if (tabMatchA.length > tabMatchB.length) {
                                    analysis  = tabMatchA.split(tabMatchB);
                                    tabMatchA = tabMatchB + strStart + analysis[1] + strEnd;
                                    tabMatchB = tabMatchB + strStart + strEnd;
                                } else {
                                    analysis  = tabMatchB.split(tabMatchA);
                                    tabMatchB = tabMatchA + strStart + analysis[1] + strEnd;
                                    tabMatchA = tabMatchA + strStart + strEnd;
                                }
                                return [
                                    tabMatchA, tabMatchB, splitA, splitB
                                ];
                            }()),
                            compare       = function diffview__report_charcomp_compare(start) {
                                var x     = 0,
                                    y     = 0,
                                    max   = Math.max(dataA.length, dataB.length),
                                    store = [],
                                    sorta = function diffview__report_charcomp_compare_sorta(a, b) {
                                        if (a[1] - a[0] < b[1] - b[0]) {
                                            return 1;
                                        }
                                        return -1;
                                    },
                                    sortb = function diffview__report_charcomp_compare_sortb(a, b) {
                                        if (a[0] + a[1] > b[0] + b[1]) {
                                            return 1;
                                        }
                                        return -1;
                                    };
                                for (x = start; x < dataMinLength; x += 1) {
                                    for (y = start; y < max; y += 1) {
                                        if (dataA[x] === dataB[y] || dataB[x] === dataA[y]) {
                                            store.push([
                                                x, y
                                            ]);
                                            break;
                                        }
                                    }
                                }
                                if (store.length === 0) {
                                    return [
                                        dataMinLength, max, 0
                                    ];
                                }
                                store.sort(sorta);
                                if (dataMinLength - start < 5000) {
                                    store.sort(sortb);
                                }
                                if (store[0][0] < store[0][1]) {
                                    x = store[0][0];
                                    y = store[0][1];
                                } else {
                                    y = store[0][0];
                                    x = store[0][1];
                                }
                                if (dataA[y] === dataB[x]) {
                                    if (dataA[y - 1] === dataB[x - 1] && x !== start) {
                                        x -= 1;
                                        y -= 1;
                                    }
                                    return [
                                        x, y, 0
                                    ];
                                }
                                if (dataA[x] === dataB[y]) {
                                    if (dataA[x - 1] === dataB[y - 1] && x !== start) {
                                        x -= 1;
                                        y -= 1;
                                    }
                                    return [
                                        x, y, 1
                                    ];
                                }
                            };
                        if (cleanedA === cleanedB) {
                            return [
                                lineA, lineB
                            ];
                        }
                        errorout -= 1;
                        if (tabFix !== "" && cleanedA.length !== cleanedB.length && cleanedA.replace(tabFix, "") === cleanedB.replace(tabFix, "")) {
                            errorout += 1;
                            if (diffcli === true) {
                                tabdiff[0] = tabdiff[0] + tabdiff[2];
                                tabdiff[0] = tabdiff[0].replace(regStart, "<pd>").replace(regEnd, "</pd>");
                                tabdiff[1] = tabdiff[1] + tabdiff[3];
                                tabdiff[1] = tabdiff[1].replace(regStart, "<pd>").replace(regEnd, "</pd>");
                                return [
                                    tabdiff[0], tabdiff[1]
                                ];
                            }
                            tabdiff[0] = tabdiff[0] + tabdiff[2];
                            tabdiff[0] = tabdiff[0].replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(regStart, "<em>").replace(regEnd, "</em>");
                            tabdiff[1] = tabdiff[1] + tabdiff[3];
                            tabdiff[1] = tabdiff[1].replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(regStart, "<em>").replace(regEnd, "</em>");

                            return [
                                tabdiff[0], tabdiff[1]
                            ];
                        }
                        dataA         = cleanedA.split("");
                        dataB         = cleanedB.split("");
                        dataMinLength = Math.min(dataA.length, dataB.length);
                        for (b = 0; b < dataMinLength; b += 1) {
                            if (dataA[b] === undefined || dataB[b] === undefined) {
                                break;
                            }
                            if (dataA[b] !== dataB[b]) {
                                errorout    += 1;
                                currentdiff = compare(b);
                                if (b > 0) {
                                    dataA[b - 1] = dataA[b - 1] + strStart;
                                    dataB[b - 1] = dataB[b - 1] + strStart;
                                } else {
                                    dataA[b] = strStart + dataA[b];
                                    dataB[b] = strStart + dataB[b];
                                }
                                if (currentdiff[2] === 1) {
                                    if (currentdiff[0] === 0) {
                                        dataA[0] = dataA[0].replace(regStart, strStart + strEnd);
                                    } else if (currentdiff[0] === dataMinLength) {
                                        if (dataB.length === dataMinLength) {
                                            dataA[dataA.length - 1] = dataA[dataA.length - 1] + strEnd;
                                        } else {
                                            dataA[currentdiff[0] - 1] = dataA[currentdiff[0] - 1] + strEnd;
                                        }
                                    } else {
                                        if (dataA[currentdiff[0]].indexOf(strStart) > -1) {
                                            dataA[currentdiff[0]] = dataA[currentdiff[0]] + strEnd;
                                        } else {
                                            dataA[currentdiff[0]] = strEnd + dataA[currentdiff[0]];
                                        }
                                    }
                                    if (currentdiff[1] > dataB.length - 1 || currentdiff[0] === dataMinLength) {
                                        dataB[dataB.length - 1] = dataB[dataB.length - 1] + strEnd;
                                    } else {
                                        dataB[currentdiff[1]] = strEnd + dataB[currentdiff[1]];
                                    }
                                } else {
                                    if (currentdiff[0] === 0) {
                                        dataB[0] = dataB[0].replace(regStart, strStart + strEnd);
                                    } else if (currentdiff[0] === dataMinLength) {
                                        if (dataA.length === dataMinLength) {
                                            dataB[dataB.length - 1] = dataB[dataB.length - 1] + strEnd;
                                        } else {
                                            dataB[currentdiff[0] - 1] = dataB[currentdiff[0] - 1] + strEnd;
                                        }
                                    } else {
                                        if (dataB[currentdiff[0]].indexOf(strStart) > -1) {
                                            dataB[currentdiff[0]] = dataB[currentdiff[0]] + strEnd;
                                        } else {
                                            dataB[currentdiff[0]] = strEnd + dataB[currentdiff[0]];
                                        }
                                    }
                                    if (currentdiff[1] > dataA.length - 1 || currentdiff[0] === dataMinLength) {
                                        dataA[dataA.length - 1] = dataA[dataA.length - 1] + strEnd;
                                    } else {
                                        dataA[currentdiff[1]] = strEnd + dataA[currentdiff[1]];
                                    }
                                }
                                if (currentdiff[1] > currentdiff[0] && currentdiff[1] - currentdiff[0] < 1000) {
                                    if (currentdiff[2] === 1) {
                                        do {
                                            dataA.unshift("");
                                            currentdiff[0] += 1;
                                        } while (currentdiff[1] > currentdiff[0]);
                                    } else {
                                        do {
                                            dataB.unshift("");
                                            currentdiff[0] += 1;
                                        } while (currentdiff[1] > currentdiff[0]);
                                    }
                                }
                                dataMinLength = Math.min(dataA.length, dataB.length);
                                b             = currentdiff[1];
                            }
                        }
                        if (dataA.length > dataB.length && dataB[dataB.length - 1] !== undefined && dataB[dataB.length - 1].indexOf(strEnd) < 0) {
                            dataB.push(strStart + strEnd);
                            dataA[dataB.length - 1] = strStart + dataA[dataB.length - 1];
                            dataA[dataA.length - 1] = dataA[dataA.length - 1] + strEnd;
                            errorout                += 1;
                        }
                        if (dataB.length > dataA.length && dataA[dataA.length - 1] !== undefined && dataA[dataA.length - 1].indexOf(strEnd) < 0) {
                            dataA.push(strStart + strEnd);
                            dataB[dataA.length - 1] = strStart + dataB[dataA.length - 1];
                            dataB[dataB.length - 1] = dataB[dataB.length - 1] + strEnd;
                            errorout                += 1;
                        }
                        if (diffcli === true) {
                            return [
                                dataA.join("").replace(regStart, "<pd>").replace(regEnd, "</pd>"), dataB.join("").replace(regStart, "<pd>").replace(regEnd, "</pd>")
                            ];
                        }
                        return [
                            dataA.join("").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(regStart, "<em>").replace(regEnd, "</em>"), dataB.join("").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(regStart, "<em>").replace(regEnd, "</em>")
                        ];
                    };
                if (diffcli === false) {
                    if (inline === true) {
                        node.push("<h3 class='texttitle'>");
                        node.push(baseTextName);
                        node.push(" vs. ");
                        node.push(newTextName);
                        node.push("</h3><ol class='count'>");
                    } else {
                        data[0].push("<div class='diff-left'><h3 class='texttitle'>");
                        data[0].push(baseTextName);
                        data[0].push("</h3><ol class='count'>");
                        data[2].push("<div class='diff-right'><h3 class='texttitle'>");
                        data[2].push(newTextName);
                        data[2].push("</h3><ol class='count' style='cursor:w-resize'>");
                    }
                }
                for (a = 0; a < opcodesLength; a += 1) {
                    code      = opcodes[a];
                    change    = code[0];
                    baseStart = code[1];
                    baseEnd   = code[2];
                    newStart  = code[3];
                    newEnd    = code[4];
                    rowcnt    = Math.max(baseEnd - baseStart, newEnd - newStart);
                    ctest     = true;
                    for (i = 0; i < rowcnt; i += 1) {
                        if (context > -1 && opcodes.length > 1 && ((a > 0 && i === context) || (a === 0 && i === 0)) && change === "equal") {
                            ctest = false;
                            jump  = rowcnt - ((a === 0
                                ? 1
                                : 2) * context);
                            if (jump > 1) {
                                foldcount += 1;
                                baseStart += jump;
                                newStart  += jump;
                                i         += jump - 1;
                                if (diffcli === true) {
                                    data[5].push([
                                        baseStart, newStart
                                    ]);
                                } else {
                                    data[0].push("<li>...</li>");
                                    if (inline === false) {
                                        data[1].push("<li class='skip'>&#10;</li>");
                                    }
                                    data[2].push("<li>...</li>");
                                    data[3].push("<li class='skip'>&#10;</li>");
                                }
                                if (a + 1 === opcodes.length) {
                                    break;
                                }
                            }
                        } else if (change !== "equal") {
                            diffline += 1;
                        }
                        if (baseTextArray[baseStart] === newTextArray[newStart]) {
                            change = "equal";
                        } else if (change === "equal") {
                            change = "replace";
                        }
                        if (tab !== "") {
                            if (btest === false && baseTextArray[baseEnd] !== newTextArray[newEnd] && typeof baseTextArray[baseStart + 1] === "string" && typeof newTextArray[newStart] === "string" && baseTab[baseStart + 1] === newTab[newStart] && baseTab[baseStart] !== newTab[newStart] && (typeof newTextArray[newStart - 1] !== "string" || baseTab[baseStart] !== newTab[newStart - 1])) {
                                btest = true;
                            } else if (ntest === false && baseTextArray[baseEnd] !== newTextArray[newEnd] && typeof newTextArray[newStart + 1] === "string" && typeof baseTextArray[baseStart] === "string" && newTab[newStart + 1] === baseTab[baseStart] && newTab[newStart] !== baseTab[baseStart] && (typeof baseTextArray[baseStart - 1] !== "string" || newTab[newStart] !== baseTab[baseStart - 1])) {
                                ntest = true;
                            }
                        }
                        if (diffcli === true) {
                            //data array schema:
                            //0 - base line number
                            //1 - base code line
                            //2 - new line number
                            //3 - new code line
                            //4 - change
                            //5 - index of context (not parallel)
                            if (ntest === true || change === "insert") {
                                data[0].push(0);
                                data[1].push("");
                                data[2].push(newStart + 1);
                                data[3].push(newTextArray[newStart]);
                                data[4].push("insert");
                                errorout += 1;
                            } else if (btest === true || change === "delete") {
                                data[0].push(baseStart + 1);
                                data[1].push(baseTextArray[baseStart]);
                                data[2].push(0);
                                data[3].push("");
                                data[4].push("delete");
                                errorout += 1;
                            } else if (change === "replace") {
                                if (baseTextArray[baseStart] !== newTextArray[newStart]) {
                                    if (baseTextArray[baseStart] === "") {
                                        charcompOutput = [
                                            "", newTextArray[newStart]
                                        ];
                                    } else if (newTextArray[newStart] === "") {
                                        charcompOutput = [
                                            baseTextArray[baseStart], ""
                                        ];
                                    } else if (baseStart < baseEnd && newStart < newEnd) {
                                        charcompOutput = charcomp(baseTextArray[baseStart], newTextArray[newStart]);
                                    }
                                }
                                if (baseStart < baseEnd) {
                                    data[0].push(baseStart + 1);
                                    if (newStart < newEnd) {
                                        data[1].push(charcompOutput[0]);
                                    } else {
                                        data[1].push(baseTextArray[baseStart]);
                                    }
                                    data[2].push(0);
                                    data[3].push("");
                                    data[4].push("delete");
                                }
                                if (newStart < newEnd) {
                                    data[0].push(0);
                                    data[1].push("");
                                    data[2].push(newStart + 1);
                                    if (baseStart < baseEnd) {
                                        data[3].push(charcompOutput[1]);
                                    } else {
                                        data[3].push(newTextArray[newStart]);
                                    }
                                    data[4].push("insert");
                                }
                                errorout += 1;
                            } else if (baseStart < baseEnd || newStart < newEnd) {
                                data[0].push(baseStart + 1);
                                data[1].push(baseTextArray[baseStart]);
                                data[2].push(newStart + 1);
                                data[3].push(newTextArray[newStart]);
                                data[4].push(change);
                                if (change !== "equal") {
                                    errorout += 1;
                                }
                            }
                            if (btest === true) {
                                baseStart += 1;
                                btest     = false;
                            } else if (ntest === true) {
                                newStart += 1;
                                ntest    = false;
                            } else {
                                baseStart += 1;
                                newStart  += 1;
                            }
                        } else if (inline === true) {
                            if (context < 0 && baseTextArray[baseStart - 1] === newTextArray[newStart - 1] && baseTextArray[baseStart] !== newTextArray[newStart] && foldstart > 0) {
                                data[0][foldstart] = data[0][foldstart].replace("xxx", foldcount);
                            }
                            if (ntest === true || change === "insert") {
                                data[0].push("<li class='empty'>&#8203;&#10;</li>");
                                data[2].push("<li>");
                                data[2].push(newStart + 1);
                                data[2].push("&#10;</li>");
                                data[3].push("<li class='insert'>");
                                data[3].push(newTextArray[newStart]);
                                data[3].push("&#10;</li>");
                                foldcount += 1;
                                errorout  += 1;
                            } else if (btest === true || change === "delete") {
                                data[0].push("<li>");
                                data[0].push(baseStart + 1);
                                data[0].push("</li>");
                                data[2].push("<li class='empty'>&#8203;&#10;</li>");
                                data[3].push("<li class='delete'>");
                                data[3].push(baseTextArray[baseStart]);
                                data[3].push("&#10;</li>");
                                foldcount += 1;
                                errorout  += 1;
                            } else if (change === "replace") {
                                if (baseTextArray[baseStart] !== newTextArray[newStart]) {
                                    if (baseTextArray[baseStart] === "") {
                                        charcompOutput = [
                                            "", newTextArray[newStart]
                                        ];
                                        errorout       += 1;
                                    } else if (newTextArray[newStart] === "") {
                                        charcompOutput = [
                                            baseTextArray[baseStart], ""
                                        ];
                                        errorout       += 1;
                                    } else if (baseStart < baseEnd && newStart < newEnd) {
                                        charcompOutput = charcomp(baseTextArray[baseStart], newTextArray[newStart]);
                                    }
                                }
                                if (baseStart < baseEnd) {
                                    data[0].push("<li>");
                                    data[0].push(baseStart + 1);
                                    data[0].push("</li>");
                                    data[2].push("<li class='empty'>&#8203;&#10;</li>");
                                    data[3].push("<li class='delete'>");
                                    if (newStart < newEnd) {
                                        data[3].push(charcompOutput[0]);
                                    } else {
                                        data[3].push(baseTextArray[baseStart]);
                                    }
                                    data[3].push("&#10;</li>");
                                    foldcount += 1;
                                }
                                if (newStart < newEnd) {
                                    data[0].push("<li class='empty'>&#8203;&#10;</li>");
                                    data[2].push("<li>");
                                    data[2].push(newStart + 1);
                                    data[2].push("</li>");
                                    data[3].push("<li class='insert'>");
                                    if (baseStart < baseEnd) {
                                        data[3].push(charcompOutput[1]);
                                    } else {
                                        data[3].push(newTextArray[newStart]);
                                    }
                                    data[3].push("&#10;</li>");
                                    foldcount += 1;
                                }
                            } else if (baseStart < baseEnd || newStart < newEnd) {
                                foldcount += 1;
                                if (context < 0 && baseTextArray[baseStart] === newTextArray[newStart] && ((baseTextArray[baseStart - 1] !== newTextArray[newStart - 1]) || (baseStart === 0 && newStart === 0)) && baseTextArray[baseStart + 1] === newTextArray[newStart + 1] && ((baseEnd - baseStart > 1) || (newEnd - newStart > 1))) {
                                    foldstart = data[0].length;
                                    if (a === opcodesLength - 1) {
                                        if (baseEnd > newEnd) {
                                            data[0].push("<li class='fold' title='folds from line " + foldcount + " to line " + (baseEnd + 3) + "'>");
                                        } else {
                                            data[0].push("<li class='fold' title='folds from line " + foldcount + " to line " + (newEnd + 3) + "'>");
                                        }
                                    } else {
                                        data[0].push("<li class='fold' title='folds from line " + foldcount + " to line xxx'>");
                                    }
                                    data[0].push("- " + (baseStart + 1));
                                } else {
                                    data[0].push("<li>");
                                    data[0].push(baseStart + 1);
                                }
                                data[0].push("</li>");
                                data[2].push("<li>");
                                data[2].push(newStart + 1);
                                data[2].push("</li>");
                                data[3].push("<li class='");
                                data[3].push(change);
                                data[3].push("'>");
                                data[3].push(baseTextArray[baseStart]);
                                data[3].push("&#10;</li>");
                                if (change !== "equal") {
                                    errorout += 1;
                                }
                            }
                            if (btest === true) {
                                baseStart += 1;
                                btest     = false;
                            } else if (ntest === true) {
                                newStart += 1;
                                ntest    = false;
                            } else {
                                baseStart += 1;
                                newStart  += 1;
                            }
                        } else {
                            if (context < 0 && baseTextArray[baseStart] !== newTextArray[newStart]) {
                                data[0][foldstart] = data[0][foldstart].replace("xxx", foldcount);
                            }
                            if (btest === false && ntest === false && typeof baseTextArray[baseStart] === "string" && typeof newTextArray[newStart] === "string") {
                                if (baseTextArray[baseStart] === "" && newTextArray[newStart] !== "") {
                                    change = "insert";
                                }
                                if (newTextArray[newStart] === "" && baseTextArray[baseStart] !== "") {
                                    change = "delete";
                                }
                                if (change === "replace" && baseStart < baseEnd && newStart < newEnd && baseTextArray[baseStart] !== newTextArray[newStart]) {
                                    charcompOutput = charcomp(baseTextArray[baseStart], newTextArray[newStart]);
                                } else {
                                    charcompOutput = [
                                        baseTextArray[baseStart], newTextArray[newStart]
                                    ];
                                }
                                if (baseStart === Number(data[0][data[0].length - 1].substring(data[0][data[0].length - 1].indexOf(">") + 1, data[0][data[0].length - 1].lastIndexOf("<"))) - 1 || newStart === Number(data[2][data[2].length - 1].substring(data[2][data[2].length - 1].indexOf(">") + 1, data[2][data[2].length - 1].lastIndexOf("<"))) - 1) {
                                    repeat = true;
                                }
                                if (repeat === false) {
                                    foldcount += 1;
                                    if (baseStart < baseEnd) {
                                        if (context < 0 && baseTextArray[baseStart] === newTextArray[newStart] && ((baseTextArray[baseStart - 1] !== newTextArray[newStart - 1]) || (a > 1 && opcodes[a - 1][0] !== "equal" && baseStart === opcodes[a - 1][2]) || (baseStart === 0 && newStart === 0)) && baseTextArray[baseStart + 1] === newTextArray[newStart + 1] && ((baseEnd - baseStart > 1) || (newEnd - newStart > 1))) {
                                            if (a === opcodesLength - 1) {
                                                if (baseEnd > newEnd) {
                                                    data[0].push("<li class='fold' title='folds from line " + foldcount + " to line " + (baseEnd + 2) + "'>- " + (baseStart + 1) + "</li>");
                                                } else {
                                                    data[0].push("<li class='fold' title='folds from line " + foldcount + " to line " + (baseEnd + 1 + foldback) + "'>- " + (baseStart + 1) + "</li>");
                                                }
                                            } else {
                                                foldstart = data[0].length;
                                                data[0].push("<li class='fold' title='folds from line " + (baseStart + 1) + " to line xxx'>- " + (baseStart + 1) + "</li>");
                                            }
                                        } else {
                                            data[0].push("<li>" + (baseStart + 1) + "</li>");
                                        }
                                        data[1].push("<li class='");
                                        if (newStart >= newEnd) {
                                            data[1].push("delete");
                                        } else if (baseTextArray[baseStart] === "" && newTextArray[newStart] !== "") {
                                            data[1].push("empty");
                                        } else {
                                            data[1].push(change);
                                        }
                                        data[1].push("'>");
                                        data[1].push(charcompOutput[0]);
                                        data[1].push("&#10;</li>");
                                    } else if (ctest === true) {
                                        data[0].push("<li class='empty'>&#8203;&#10;</li>");
                                        data[1].push("<li class='empty'>&#8203;</li>");
                                    }
                                    if (newStart < newEnd) {
                                        data[2].push("<li>" + (newStart + 1) + "</li>");
                                        data[3].push("<li class='");
                                        if (baseStart >= baseEnd) {
                                            data[3].push("insert");
                                            foldback  += 1;
                                            foldcount -= 1;
                                        } else if (newTextArray[newStart] === "" && baseTextArray[baseStart] !== "") {
                                            data[3].push("empty");
                                        } else {
                                            data[3].push(change);
                                        }
                                        data[3].push("'>");
                                        data[3].push(charcompOutput[1]);
                                        data[3].push("&#10;</li>");
                                    } else if (ctest === true) {
                                        data[2].push("<li class='empty'>&#8203;&#10;</li>");
                                        data[3].push("<li class='empty'>&#8203;</li>");
                                    }
                                } else {
                                    repeat = false;
                                }
                                if (baseStart < baseEnd) {
                                    baseStart += 1;
                                }
                                if (newStart < newEnd) {
                                    newStart += 1;
                                }
                            } else if (btest === true || (typeof baseTextArray[baseStart] === "string" && typeof newTextArray[newStart] !== "string")) {
                                if (baseStart !== Number(data[0][data[0].length - 1].substring(data[0][data[0].length - 1].indexOf(">") + 1, data[0][data[0].length - 1].lastIndexOf("<"))) - 1) {
                                    foldcount += 1;
                                    data[0].push("<li>" + (baseStart + 1) + "</li>");
                                    data[1].push("<li class='delete'>");
                                    data[1].push(baseTextArray[baseStart]);
                                    data[1].push("&#10;</li>");
                                    data[2].push("<li class='empty'>&#8203;&#10;</li>");
                                    data[3].push("<li class='empty'>&#8203;</li>");
                                }
                                btest     = false;
                                baseStart += 1;
                            } else if (ntest === true || (typeof baseTextArray[baseStart] !== "string" && typeof newTextArray[newStart] === "string")) {
                                if (newStart !== Number(data[2][data[2].length - 1].substring(data[2][data[2].length - 1].indexOf(">") + 1, data[2][data[2].length - 1].lastIndexOf("<"))) - 1) {
                                    foldcount += 1;
                                    data[0].push("<li class='empty'>&#8203;&#10;</li>");
                                    data[1].push("<li class='empty'>&#8203;</li>");
                                    data[2].push("<li>" + (newStart + 1) + "</li>");
                                    data[3].push("<li class='insert'>");
                                    data[3].push(newTextArray[newStart]);
                                    data[3].push("&#10;</li>");
                                }
                                ntest    = false;
                                newStart += 1;
                            }
                        }
                    }
                }
                if (typeof data[0][foldstart] === "string") {
                    data[0][foldstart] = data[0][foldstart].replace("xxx", foldcount);
                }
                if (diffcli === true) {
                    data.push(errorout);
                    return data;
                }
                node.push(data[0].join(""));
                node.push("</ol><ol class=");
                if (inline === true) {
                    node.push("'count'>");
                } else {
                    node.push("'data'>");
                    node.push(data[1].join(""));
                    node.push("</ol></div>");
                }
                node.push(data[2].join(""));
                node.push("</ol><ol class='data'>");
                node.push(data[3].join(""));
                if (inline === true) {
                    node.push("</ol>");
                } else {
                    node.push("</ol></div>");
                }
                node.push("<p class='author'>Diff view written by <a href='http://prettydiff.com/'>Pretty D" +
                        "iff</a>.</p></div>");
                finaldoc = node.join("");
                return [
                    finaldoc.replace(/li\ class='equal'><\/li/g, "li class='equal'>&#10;</li").replace(/\$#gt;/g, "&gt;").replace(/\$#lt;/g, "&lt;").replace(/%#lt;/g, "$#lt;").replace(/%#gt;/g, "$#gt;"), errorout, diffline
                ];
            }());
        };

        //Library to parse/beautify/minify JavaScript.
        jspretty     = function jspretty(args) {
            var jbraceline    = (args.braceline === true || args.braceline === "true"),
                jbracepadding = (args.bracepadding === true || args.bracepadding === "true"),
                jbraces       = (args.braces === "allman"),
                jchar         = (typeof args.inchar === "string" && args.inchar.length > 0)
                    ? args.inchar
                    : " ",
                jcomment      = (args.comments === "noindent")
                    ? "noindent"
                    : (args.comments === "nocomment")
                        ? "nocomment"
                        : "indent",
                jelseline     = (args.elseline === true || args.elseline === "true"),
                jlevel        = (args.inlevel > -1)
                    ? args.inlevel
                    : ((Number(args.inlevel) > -1)
                        ? Number(args.inlevel)
                        : 0),
                jmode         = (args.mode === "minify" || args.mode === "parse" || args.mode === "diff")
                    ? args.mode
                    : "beautify",
                jobfuscate    = (args.obfuscate === true || args.obfuscate === "true"),
                jobjsort      = (args.objsort === true || args.objsort === "true"),
                jpres         = (args.preserve !== false && args.preserve !== "false"),
                jquoteConvert = (args.quoteConvert === "double" || args.quoteConvert === "single")
                    ? args.quoteConvert
                    : "none",
                jscorrect     = (args.correct === true || args.correct === "true"),
                jsize         = (isNaN(args.insize) === false && Number(args.insize) >= 0)
                    ? Number(args.insize)
                    : 4,
                jsource       = (typeof args.source === "string" && args.source.length > 0)
                    ? args.source + " "
                    : "Error: no source code supplied to jspretty!",
                jspace        = (args.space !== false && args.space !== "false"),
                jsscope       = (args.jsscope === true || args.jsscope === "true")
                    ? "report"
                    : (args.jsscope !== "html" && args.jsscope !== "report")
                        ? "none"
                        : args.jsscope,
                jstyleguide   = (typeof args.styleguide === "string")
                    ? args.styleguide.toLowerCase().replace(/\s/g, "")
                    : "",
                jtitanium     = (args.titanium === true || args.titanium === "true"),
                jtopcoms      = (args.topcoms === true || args.topcoms === "true"),
                jvarword      = (args.varword === "each" || args.varword === "list")
                    ? args.varword
                    : "none",
                jvertical     = (args.vertical !== false && args.vertical !== "false"),
                jwrap         = (isNaN(Number(args.wrap)) === true)
                    ? 0
                    : Number(args.wrap),
                sourcemap     = [
                    0, ""
                ],
                token         = [],
                types         = [],
                level         = [],
                lines         = [],
                globals       = [],
                meta          = [],
                varlist       = [],
                markupvar     = [],
                error         = [],
                news          = 0,
                scolon        = 0,
                stats         = {
                    comma       : 0,
                    commentBlock: {
                        chars: 0,
                        token: 0
                    },
                    commentLine : {
                        chars: 0,
                        token: 0
                    },
                    container   : 0,
                    number      : {
                        chars: 0,
                        token: 0
                    },
                    operator    : {
                        chars: 0,
                        token: 0
                    },
                    regex       : {
                        chars: 0,
                        token: 0
                    },
                    semicolon   : 0,
                    server      : {
                        chars: 0,
                        token: 0
                    },
                    space       : {
                        newline: 0,
                        other  : 0,
                        space  : 0,
                        tab    : 0
                    },
                    string      : {
                        chars: 0,
                        quote: 0,
                        token: 0
                    },
                    word        : {
                        chars: 0,
                        token: 0
                    }
                },
                result        = "";
            if (jsource === "Error: no source code supplied to jspretty!") {
                return jsource;
            }
            if (jsscope !== "none") {
                jwrap = 0;
            }
            if (jstyleguide === "airbnb") {
                jchar         = " ";
                jpres         = true;
                jquoteConvert = "single";
                jscorrect     = true;
                jsize         = 2;
                jvarword      = "each";
                jwrap         = 80;
            } else if (jstyleguide === "crockford" || jstyleguide === "jslint") {
                jbracepadding = false;
                jelseline     = false;
                jchar         = " ";
                jscorrect     = true;
                jsize         = 4;
                jspace        = true;
                jvarword      = "list";
                jvertical     = false;
            } else if (jstyleguide === "google") {
                jchar         = " ";
                jpres         = true;
                jquoteConvert = "single";
                jscorrect     = true;
                jsize         = 4;
                jvertical     = false;
                jwrap         = -1;
            } else if (jstyleguide === "grunt") {
                jchar         = " ";
                jsize         = 2;
                jquoteConvert = "single";
                jvarword      = "each";
            } else if (jstyleguide === "jquery") {
                jbracepadding = true;
                jchar         = "\u0009";
                jquoteConvert = "double";
                jscorrect     = true;
                jsize         = 1;
                jvarword      = "each";
                jwrap         = 80;
            } else if (jstyleguide === "mrdoobs") {
                jbraceline    = true;
                jbracepadding = true;
                jchar         = "\u0009";
                jscorrect     = true;
                jsize         = 1;
                jvertical     = false;
            } else if (jstyleguide === "mediawiki") {
                jbracepadding = true;
                jchar         = "\u0009";
                jpres         = true;
                jquoteConvert = "single";
                jscorrect     = true;
                jsize         = 1;
                jspace        = false;
                jwrap         = 80;
            } else if (jstyleguide === "meteor") {
                jchar     = " ";
                jscorrect = true;
                jsize     = 2;
                jwrap     = 80;
            } else if (jstyleguide === "yandex") {
                jbracepadding = false;
                jquoteConvert = "single";
                jscorrect     = true;
                jvarword      = "each";
                jvertical     = false;
            }
            if (jtitanium === true) {
                jscorrect = false;
                token.push("x{");
                types.push("start");
                lines.push(0);
            }
            //this function tokenizes the source code into an array
            //of literals and syntax tokens
            (function jspretty__tokenize() {
                var a              = 0,
                    b              = jsource.length,
                    c              = jsource.split(""),
                    ltoke          = "",
                    ltype          = "",
                    lengtha        = 0,
                    lengthb        = 0,
                    wordTest       = -1,
                    templateString = [],
                    dostate        = {
                        count: [],
                        index: 0,
                        len  : -1,
                        state: []
                    },
                    obj            = {
                        count : [],
                        len   : -1,
                        status: []
                    },
                    block          = {
                        consec     : [],
                        count      : [],
                        index      : [],
                        len        : -1,
                        priorreturn: [],
                        semi       : [],
                        word       : []
                    },
                    vart           = {
                        count: [],
                        index: [],
                        len  : -1
                    },
                    objSort        = function jspretty__tokenize_objSort() {
                        var cc        = 0,
                            dd        = 0,
                            ee        = 0,
                            startlen  = token.length - 1,
                            end       = startlen,
                            keys      = [],
                            keylen    = 0,
                            keyend    = 0,
                            start     = 0,
                            sort      = function jspretty__tokenize_objSort_sort(x, y) {
                                var xx = x[0],
                                    yy = y[0];
                                if (types[xx] === "comment" || types[xx] === "comment-inline") {
                                    do {
                                        xx += 1;
                                    } while (xx < startlen && (types[xx] === "comment" || types[xx] === "comment-inline"));
                                }
                                if (types[yy] === "comment" || types[yy] === "comment-inline") {
                                    do {
                                        yy += 1;
                                    } while (yy < startlen && (types[yy] === "comment" || types[yy] === "comment-inline"));
                                }
                                if (token[xx].toLowerCase() > token[yy].toLowerCase()) {
                                    return 1;
                                }
                                return -1;
                            },
                            commaTest = true,
                            pairToken = [],
                            pairTypes = [],
                            pairLines = [];
                        if (token[end] === "," || types[end] === "comment" || types[end] === "comment-inline") {
                            do {
                                end -= 1;
                            } while (end > 0 && (token[end] === "," || types[end] === "comment" || types[end] === "comment-inline"));
                        }
                        for (cc = end; cc > -1; cc -= 1) {
                            if (types[cc] === "end") {
                                dd += 1;
                            }
                            if (types[cc] === "start" || types[cc] === "method") {
                                dd -= 1;
                            }
                            if (dd === 0) {
                                if (token[cc] === ",") {
                                    commaTest = true;
                                    start     = cc + 1;
                                }
                                if (commaTest === true && token[cc] === "," && start < end) {
                                    keys.push([
                                        start, end + 1, false
                                    ]);
                                    end = start - 1;
                                }
                            }
                            if (dd < 0 && cc < startlen) {
                                if (keys.length > 0 && keys[keys.length - 1][0] > cc + 1) {
                                    keys.push([
                                        cc + 1, keys[keys.length - 1][0] - 1, keys[keys.length - 1][2]
                                    ]);
                                }
                                if (keys.length > 1 && (token[cc - 1] === "=" || token[cc - 1] === ":" || token[cc - 1] === "(" || token[cc - 1] === "[" || token[cc - 1] === "," || cc === 0)) {
                                    keys.sort(sort);
                                    keylen    = keys.length;
                                    commaTest = false;
                                    for (dd = 0; dd < keylen; dd += 1) {
                                        keyend = keys[dd][1];
                                        for (ee = keys[dd][0]; ee < keyend; ee += 1) {
                                            pairToken.push(token[ee]);
                                            pairTypes.push(types[ee]);
                                            pairLines.push(lines[ee]);
                                            if (token[ee] === ",") {
                                                commaTest = true;
                                            } else if (token[ee] !== "," && types[ee] !== "comment" && types[ee] !== "comment-inline") {
                                                commaTest = false;
                                            }
                                        }
                                        if (dd < keylen - 1 && keys[dd + 1][2] === true) {
                                            pairLines[pairLines.length - 1] = 2;
                                        } else {
                                            pairLines[pairLines.length - 1] = 0;
                                        }
                                        if (commaTest === false) {
                                            ee = pairTypes.length - 1;
                                            if (pairTypes[ee] === "comment" || pairTypes[ee] === "comment-inline") {
                                                do {
                                                    ee -= 1;
                                                } while (ee > 0 && (pairTypes[ee] === "comment" || pairTypes[ee] === "comment-inline"));
                                            }
                                            ee += 1;
                                            pairToken.splice(ee, 0, ",");
                                            pairTypes.splice(ee, 0, "separator");
                                            if (pairLines[ee - 1] === 2) {
                                                pairLines[ee - 1] = 0;
                                                pairLines.splice(ee, 0, 2);
                                            } else {
                                                pairLines.splice(ee, 0, 0);
                                            }
                                        }
                                    }
                                    ee = pairTypes.length - 1;
                                    if (pairTypes[ee] === "comment" || pairTypes[ee] === "comment-inline") {
                                        do {
                                            ee -= 1;
                                        } while (ee > 0 && (pairTypes[ee] === "comment" || pairTypes[ee] === "comment-inline"));
                                    }
                                    pairToken.splice(ee, 1);
                                    pairTypes.splice(ee, 1);
                                    pairLines.splice(ee, 1);
                                    keylen = token.length - (cc + 1);
                                    token.splice(cc + 1, keylen);
                                    types.splice(cc + 1, keylen);
                                    lines.splice(cc + 1, keylen);
                                    token = token.concat(pairToken);
                                    types = types.concat(pairTypes);
                                    lines = lines.concat(pairLines);
                                }
                                return;
                            }
                        }
                    },
                    objpop         = function jspretty__tokenize_objpop() {
                        obj.count.pop();
                        obj.len -= 1;
                        obj.status.pop();
                        if (jobjsort === true) {
                            objSort();
                        }
                    },
                    blockpop       = function jspretty__tokenize_blockpop() {
                        block.consec.pop();
                        block.count.pop();
                        block.index.pop();
                        block.len -= 1;
                        block.priorreturn.pop();
                        block.semi.pop();
                        block.word.pop();
                    },
                    vartpop        = function jspretty__tokenize_vartpop() {
                        vart.count.pop();
                        vart.index.pop();
                        vart.len -= 1;
                    },
                    blockinsert    = function jspretty__tokenize_blockinsert() {
                        var index  = 0,
                            consec = false,
                            last   = lines.length - 1,
                            linel  = lines[last];
                        if (block.len < 0) {
                            return;
                        }
                        index  = block.index[block.len];
                        consec = block.consec[block.len];
                        if (types[index] === "comment" || types[index] === "comment-inline") {
                            do {
                                index -= 1;
                            } while (index > 0 && (types[index] === "comment" || types[index] === "comment-inline"));
                            index += 1;
                        }
                        if (block.word[block.len] === "else" && token[index] === block.word[block.len]) {
                            index += 1;
                        }
                        if (block.len > -1 && block.count[block.len] === 0) {
                            token.splice(index, 0, "x{");
                            types.splice(index, 0, "start");
                            if (jbraceline === true) {
                                lines.splice(index, 0, 2);
                                lines[last] = 2;
                                lines.push(0);
                            } else {
                                lines[last] = 0;
                                lines.splice(index, 0, 0);
                                lines.push(linel);
                            }
                            token.push("x}");
                            types.push("end");
                            if (block.priorreturn[block.len] === true) {
                                token.push("x;");
                                types.push("separator");
                                lines.push(0);
                            }
                            blockpop();
                            if (consec === true) {
                                blockinsert();
                            }
                        }
                    },
                    slashes        = function jspretty__tokenize_slashes(index) {
                        var slashy = index;
                        do {
                            slashy -= 1;
                        } while (c[slashy] === "\\" && slashy > 0);
                        if ((index - slashy) % 2 === 1) {
                            return true;
                        }
                        return false;
                    },
                    commaComment   = function jspretty__tokenize_commacomment() {
                        var x = types.length;
                        do {
                            x -= 1;
                        } while (x > 0 && (types[x - 1] === "comment" || types[x - 1] === "comment-inline"));
                        token.splice(x, 0, ",");
                        types.splice(x, 0, "separator");
                    },
                    plusplus       = function jspretty__tokenize_plusplus() {
                        var store = [],
                            pre   = true,
                            toke  = "+=",
                            tokea = "",
                            tokeb = "",
                            tokec = "";
                        lengtha = token.length;
                        tokea   = token[lengtha - 1];
                        tokeb   = token[lengtha - 2];
                        tokec   = token[lengtha - 3];
                        if (jscorrect !== true || (tokea !== "++" && tokea !== "--" && tokeb !== "++" && tokeb !== "--")) {
                            return;
                        }
                        if (tokec === "[" || tokec === ";" || tokec === "x;" || tokec === "}" || tokec === "{" || tokec === "(" || tokec === ")" || tokec === "," || tokec === "return") {
                            if (tokea === "++" || tokea === "--") {
                                if (tokec === "[" || tokec === "(" || tokec === "," || tokec === "return") {
                                    return;
                                }
                                if (tokeb === "--") {
                                    toke = "-=";
                                }
                                pre = false;
                            } else if (tokeb === "--") {
                                toke = "-=";
                            }
                        } else {
                            return;
                        }
                        if (pre === true) {
                            store.push(tokea);
                            store.push(types[lengtha - 1]);
                            store.push(lines[lengtha - 1]);
                            token.pop();
                            types.pop();
                            lines.pop();
                            token.pop();
                            types.pop();
                            lines.pop();
                            token.push(store[0]);
                            types.push(store[1]);
                            lines.push(store[2]);
                            token.push(toke);
                            types.push("operator");
                            token.push("1");
                            types.push("literal");
                        } else {
                            token.pop();
                            types.pop();
                            lines.pop();
                            token.push(toke);
                            types.push("operator");
                            lines.push(0);
                            token.push("1");
                            types.push("literal");
                            lines.push(0);
                        }
                    },
                    asi            = function jspretty__tokenize_asi() {
                        var len   = token.length - 1,
                            aa    = len,
                            bb    = 0,
                            tokel = token[len],
                            typel = types[len],
                            colon = false,
                            early = false,
                            paren = false,
                            opers = false;
                        if (typel === "comment" || typel === "comment-inline") {
                            do {
                                len -= 1;
                            } while (len > 0 && (types[len] === "comment" || types[len] === "comment-inline"));
                            if (len < 1) {
                                return;
                            }
                            tokel = token[len];
                            typel = types[len];
                        }
                        if (tokel === undefined || typel === "start" || typel === "separator" || typel === "operator" || tokel === "x}" || tokel === ";" || tokel === "x;" || tokel === "var" || tokel === "else" || tokel.indexOf("#!/") === 0) {
                            return;
                        }
                        if (obj.len > -1 && obj.status[obj.len] === true && obj.count[obj.len] === 0) {
                            return;
                        }
                        if ((typel === "literal" && types[len - 1] !== "start") || typel !== "literal") {
                            for (aa = aa; aa > -1; aa -= 1) {
                                if (types[aa] === "end") {
                                    bb += 1;
                                } else if (types[aa] === "start" || types[aa] === "method") {
                                    bb -= 1;
                                }
                                if (bb < 0) {
                                    if (token[aa - 1] === "do" || typel === "word" || typel === "literal" || (opers === true && colon === false)) {
                                        break;
                                    }
                                    return;
                                }
                                if (bb === 0) {
                                    if (aa === 0 && ((token[0] === "{" && tokel === "}") || (token[0] === "[" && tokel === "]"))) {
                                        return;
                                    }
                                    if (token[aa] === "(" && (token[aa - 1] === "function" || token[aa - 2] === "function" || (tokel === ")" && token[aa - 1] === block.word[block.len]))) {
                                        return;
                                    }
                                    if (token[aa] === "do" || token[aa] === block.word[block.len]) {
                                        break;
                                    }
                                    if (c[a] === "}" && (types[aa] === "start" || types[aa] === "method")) {
                                        aa -= 1;
                                    }
                                    if ((token[aa - 1] === "else" && aa !== len) || token[aa] === "else" || token[aa] === "try" || token[aa] === "finally" || (colon === true && token[aa] === ",") || token[aa - 1] === "catch") {
                                        if (token[aa] === "return") {
                                            break;
                                        }
                                        return;
                                    }
                                    if (tokel === ")") {
                                        if (token[aa - 1] === "if" || token[aa - 1] === "for" || token[aa - 1] === "with") {
                                            return;
                                        }
                                        break;
                                    }
                                    if (token[aa - 1] === "if" || token[aa - 1] === "for" || token[aa - 1] === "else" || token[aa - 1] === "with") {
                                        break;
                                    }
                                    if (token[aa] === ":") {
                                        colon = true;
                                    } else if (types[aa] === "operator") {
                                        opers = true;
                                    }
                                    if (token[aa] === "=" || token[aa] === "return" || token[aa] === "," || token[aa] === ";" || token[aa] === "x;" || (token[aa] === "?" && colon === true)) {
                                        break;
                                    }
                                    if ((token[aa - 1] === ")" && (token[aa] === "{" || token[aa] === "x}")) || (token[aa] === ")" && (token[aa + 1] === "{" || token[aa + 1] === "x{"))) {
                                        bb = 0;
                                        if (token[aa] === ")") {
                                            b += 1;
                                        }
                                        colon = false;
                                        for (aa -= 1; aa > -1; aa -= 1) {
                                            if (types[aa] === "end") {
                                                bb += 1;
                                            } else if (types[aa] === "start" || types[aa] === "method") {
                                                bb -= 1;
                                            }
                                            if (bb < 0) {
                                                return;
                                            }
                                            if (bb === 0 && token[aa] === "(") {
                                                paren = true;
                                                if (token[aa - 1] === "if" || token[aa - 1] === "for" || token[aa - 1] === "with") {
                                                    return;
                                                }
                                            }
                                            if (bb === 0 && paren === true) {
                                                if (colon === true && token[aa] === "?") {
                                                    early = true;
                                                    break;
                                                }
                                                aa -= 1;
                                                if ((token[aa] === "function" && ((types[aa - 1] === "operator" && token[aa - 1] !== ":") || token[aa - 1] === "return")) || (token[aa - 1] === "function" && (types[aa - 2] === "operator" || token[aa - 2] === "return"))) {
                                                    early = true;
                                                    break;
                                                }
                                                if (token[aa] === "function" && token[aa - 1] === ":") {
                                                    colon = true;
                                                } else if (colon === false) {
                                                    return;
                                                }
                                            }
                                        }
                                        if (early === false) {
                                            return;
                                        }
                                        break;
                                    }
                                }
                            }
                        }
                        if (token[aa] === "if" || token[aa] === "for" || token[aa] === "else" || token[aa] === "with") {
                            return;
                        }
                        ltoke = ";";
                        ltype = "separator";
                        token.splice(len + 1, 0, "x;");
                        types.splice(len + 1, 0, "separator");
                        lines.splice(len + 1, 0, 0);
                        blockinsert();
                    },
                    asifix         = function jspretty__tokenize_asifix() {
                        var len = types.length;
                        do {
                            len -= 1;
                        } while (len > 0 && (types[len] === "comment" || types[len] === "comment-inline"));
                        if (token[len] === "x;") {
                            token.splice(len, 1);
                            types.splice(len, 1);
                            lines.splice(len, 1);
                        }
                    },
                    asibrace       = function jspretty__tokenize_asibrace() {
                        var aa = token.length;
                        do {
                            aa -= 1;
                        } while (aa > -1 && token[aa] === "x}");
                        aa += 1;
                        token.splice(aa, 0, ltoke);
                        types.splice(aa, 0, ltype);
                    },
                    quoteConvert   = function jspretty__tokenize_quoteConvert(item) {
                        var dub   = (jquoteConvert === "double"),
                            qchar = (dub === true)
                                ? "\""
                                : "'";
                        item = item.slice(1, item.length - 1);
                        if (dub === true) {
                            item = item.replace(/"/g, "'");
                        } else {
                            item = item.replace(/'/g, "\"");
                        }
                        return qchar + item + qchar;
                    },
                    commentSplit   = function jspretty__tokenize_commentSplit(item) {
                        var tokel   = token[token.length - 1],
                            start   = jwrap,
                            spacely = (item.indexOf(" ") > 0);
                        if (token.length === 0) {
                            return;
                        }
                        item = item.slice(2);
                        if (spacely === true) {
                            if (tokel.indexOf("//") === 0 && tokel.length < start && tokel.indexOf(" ") > 0) {
                                start = start - tokel.length - 1;
                                if (item.charAt(start) !== " ") {
                                    do {
                                        start -= 1;
                                    } while (start > 0 && item.charAt(start) !== " ");
                                }
                                if (start > 0) {
                                    token[token.length - 1] = tokel + " " + item.slice(0, start);
                                    item                    = item.slice(start + 1);
                                }
                            }
                            start = jwrap - 2;
                            do {
                                if (item.charAt(start) !== " ") {
                                    do {
                                        start -= 1;
                                    } while (start > 0 && item.charAt(start) !== " ");
                                }
                                token.push("//" + item.slice(0, start));
                                types.push("comment");
                                lines.push(0);
                                item  = item.slice(start + 1);
                                start = jwrap - 2;
                            } while (item.length > start);
                            if (item !== "") {
                                token.push("//" + item.slice(0, start));
                                types.push("comment");
                                lines.push(0);
                            }
                        } else {
                            if (tokel.indexOf("//") === 0 && tokel.length < start && tokel.indexOf(" ") === -1 && item.indexOf(" ") === -1) {
                                start                   = start - tokel.length;
                                token[token.length - 1] = tokel + item.slice(0, start);
                                item                    = item.slice(start);
                                start                   = jwrap;
                            }
                            start -= 2;
                            do {
                                token.push("//" + item.slice(0, start));
                                types.push("comment");
                                lines.push(0);
                                item = item.slice(start);
                            } while (item.length > start);
                            if (item !== "") {
                                token.push("//" + item.slice(0, start));
                                types.push("comment");
                                lines.push(0);
                            }
                        }
                    },
                    strlen         = function jspretty__tokenize_strlen(item) {
                        var aa    = 0,
                            bb    = 0,
                            qchar = item.charAt(0);
                        if (item.length > jwrap + 2) {
                            item = item.slice(1, item.length - 1);
                            bb   = parseInt(item.length / jwrap, 10) * jwrap;
                            for (aa = 0; aa < bb; aa += jwrap) {
                                token.push(qchar + item.slice(aa, aa + jwrap) + qchar);
                                types.push("literal");
                                lines.push(0);
                                token.push("+");
                                types.push("operator");
                                lines.push(0);
                            }
                            if (aa - jwrap !== jwrap) {
                                token.push(qchar + item.slice(aa, aa + jwrap) + qchar);
                                types.push("literal");
                                lines.push(0);
                            } else {
                                token.pop();
                                types.pop();
                                lines.pop();
                            }
                        } else {
                            token.push(item);
                            types.push("literal");
                            lines.push(0);
                        }
                        lengtha = token.length;
                    },
                    strmerge       = function jspretty__tokenize_strmerge(item, wrap) {
                        var aa = 0,
                            bb = "";
                        item = item.slice(1, item.length - 1);
                        token.pop();
                        types.pop();
                        lines.pop();
                        aa = token.length - 1;
                        bb = token[aa];
                        if (wrap === true) {
                            bb = bb.slice(0, bb.length - 1) + item + bb.charAt(0);
                            token.pop();
                            types.pop();
                            lines.pop();
                            strlen(bb);
                        } else {
                            token[aa] = bb.slice(0, bb.length - 1) + item + bb.charAt(0);
                        }
                    },
                    methodTest     = function jspretty__tokenize_methodTest() {
                        var cc  = 0,
                            dd  = 0,
                            end = token.length - 1;
                        if (token[end] === "," || types[end] === "comment" || types[end] === "comment-inline") {
                            do {
                                end -= 1;
                            } while (end > 0 && (token[end] === "," || types[end] === "comment" || types[end] === "comment-inline"));
                        }
                        for (cc = end; cc > -1; cc -= 1) {
                            if (types[cc] === "end") {
                                dd += 1;
                            }
                            if (types[cc] === "start" || types[cc] === "method") {
                                dd -= 1;
                            }
                            if (dd === 0 && token[cc - 1] === ")" && token[cc] === "{") {
                                for (cc -= 1; cc > -1; cc -= 1) {
                                    if (types[cc] === "end") {
                                        dd += 1;
                                    }
                                    if (types[cc] === "start" || types[cc] === "method") {
                                        dd -= 1;
                                    }
                                    if (dd === 0 && types[cc - 1] === "word") {
                                        if (token[cc - 1] === "function" || token[cc - 2] === "function") {
                                            return "method";
                                        }
                                        return "start";
                                    }
                                }
                                return "start";
                            }
                            if (dd < 0) {
                                if (types[cc] === "start" && types[cc + 1] === "start" && token[cc + 2] !== "function") {
                                    do {
                                        cc += 1;
                                    } while (cc < end && types[cc] === "start");
                                } else if (token[cc] === "{" && token[cc - 1] === ")") {
                                    dd = 1;
                                    for (cc -= 2; cc > -1; cc -= 1) {
                                        if (types[cc] === "end") {
                                            dd += 1;
                                        }
                                        if (types[cc] === "start" || types[cc] === "method") {
                                            dd -= 1;
                                        }
                                        if (dd === 0) {
                                            break;
                                        }
                                    }
                                }
                                if (token[cc + 1] !== "function") {
                                    cc -= 1;
                                    if (token[cc + 1] === "function") {
                                        return "start";
                                    }
                                }
                                if (types[cc] === "word" && token[cc] !== "function") {
                                    cc -= 1;
                                }
                                if (token[cc] === "function" || token[cc - 1] === "function" || token[cc + 1] === "function") {
                                    return "method";
                                }
                                return "start";
                            }
                        }
                        return "start";
                    },
                    newarray       = function jspretty__tokenize_newarray() {
                        var aa       = token.length - 1,
                            bb       = 0,
                            cc       = aa,
                            arraylen = 0;
                        for (aa = aa; aa > -1; aa -= 1) {
                            if (types[aa] === "end") {
                                bb += 1;
                            }
                            if (types[aa] === "start" || types[aa] === "method") {
                                bb -= 1;
                            }
                            if (bb === -1 || (bb === 0 && token[aa] === ";")) {
                                break;
                            }
                        }
                        if (types[aa] === "method" && token[aa - 1] === "Array" && token[aa - 2] === "new") {
                            if (cc - aa === 1 && (/^([0-9])$/).test(token[cc]) === true) {
                                arraylen = token[cc] - 1;
                                token.pop();
                                token.pop();
                                token.pop();
                                types.pop();
                                types.pop();
                                types.pop();
                                lines.pop();
                                lines.pop();
                                lines.pop();
                                token[token.length - 1] = "[";
                                types[types.length - 1] = "start";
                                lines[lines.length - 1] = 0;
                                do {
                                    token.push(",");
                                    types.push("separator");
                                    lines.push(0);
                                    arraylen -= 1;
                                } while (arraylen > 0);
                            } else {
                                token[aa] = "[";
                                types[aa] = "start";
                                token.splice(aa - 2, 2);
                                types.splice(aa - 2, 2);
                                lines.splice(aa - 2, 2);
                            }
                            token.push("]");
                        } else {
                            token.push(")");
                        }
                        types.push("end");
                        lines.push(0);
                    },
                    logError       = function jspretty__tokenize_logError(message, start) {
                        var f = a,
                            g = types.length;
                        if (error.length > 0) {
                            return;
                        }
                        error.push(message);
                        do {
                            f -= 1;
                        } while (c[f] !== "\n" && c[f] !== "\r" && f > 0);
                        error.push(c.slice(f, start).join(""));
                        if (g > 1) {
                            do {
                                g -= 1;
                            } while (g > 0 && types[g] !== "comment");
                        }
                        if (g > -1 && g < token.length && token[g].indexOf("//") === 0 && error[1].replace(/^\s+/, "").indexOf(token[g + 1]) === 0 && (token[g].split("\"").length % 2 === 1 || token[g].split("'").length % 2 === 1)) {
                            error = [
                                message, token[g] + error[1]
                            ];
                        } else {
                            error = [
                                message, error[1]
                            ];
                        }
                    },
                    generic        = function jspretty__tokenize_genericBuilder(start, ending) {
                        var ee     = 0,
                            g      = 0,
                            end    = ending.split(""),
                            endlen = end.length - 1,
                            jj     = b,
                            build  = [start],
                            base   = a + start.length,
                            output = "",
                            escape = false;
                        if (ending === "\r") {
                            end = ["\n"];
                        }
                        if (c[a - 1] === "\\" && slashes(a - 1) === true && (c[a] === "\"" || c[a] === "'")) {
                            token.pop();
                            types.pop();
                            lines.pop();
                            if (token[0] === "{") {
                                if (c[a] === "\"") {
                                    start  = "\"";
                                    ending = "\\\"";
                                    build  = ["\""];
                                } else {
                                    start  = "'";
                                    ending = "\\'";
                                    build  = ["'"];
                                }
                                escape = true;
                            } else {
                                if (c[a] === "\"") {
                                    return "\\\"";
                                }
                                return "\\'";
                            }
                        }
                        for (ee = base; ee < jj; ee += 1) {
                            build.push(c[ee]);
                            if ((start === "\"" || start === "'") && c[ee - 1] !== "\\" && (c[ee] === "\n" || c[ee] === "\r" || ee === jj - 1)) {
                                logError("Unterminated string in JavaScript.", ee);
                                break;
                            }
                            if (c[ee] === end[g] && (c[ee - 1] !== "\\" || slashes(ee - 1) === false)) {
                                if (g === endlen) {
                                    break;
                                }
                                g += 1;
                            } else if (c[ee + 1] !== end[g]) {
                                g = 0;
                            }
                        }
                        if (escape === true) {
                            output = build[build.length - 1];
                            build.pop();
                            build.pop();
                            build.push(output);
                        }
                        a = ee;
                        if (start === "//") {
                            stats.space.newline += 1;
                            build.pop();
                        }
                        output = build.join("");
                        if (jsscope !== "none") {
                            output = output.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
                        }
                        return output;
                    },
                    operator       = function jspretty__tokenize_operator() {
                        var syntax = [
                                "=", "<", ">", "+", "*", "?", "|", "^", ":", "&", "%", "~"
                            ],
                            g      = 0,
                            h      = 0,
                            jj     = b,
                            build  = [c[a]],
                            synlen = syntax.length,
                            output = "";
                        if (a < b - 1) {
                            if (c[a] !== "<" && c[a + 1] === "<") {
                                return c[a];
                            }
                            if (c[a] === "!" && c[a + 1] === "/") {
                                return "!";
                            }
                            if (c[a] === ":" && c[a + 1] !== ":") {
                                if (obj.len > -1 && obj.count[obj.len] === 0) {
                                    obj.status[obj.len] = true;
                                }
                                return ":";
                            }
                            if (c[a] === "-") {
                                if (c[a + 1] === "-") {
                                    output = "--";
                                } else if (c[a + 1] === "=") {
                                    output = "-=";
                                }
                                if (output === "") {
                                    return "-";
                                }
                            }
                        }
                        if (output === "") {
                            for (g = a + 1; g < jj; g += 1) {
                                for (h = 0; h < synlen; h += 1) {
                                    if (c[g] === syntax[h]) {
                                        build.push(syntax[h]);
                                        break;
                                    }
                                }
                                if (h === synlen) {
                                    break;
                                }
                            }
                            output = build.join("");
                        }
                        a = a + (output.length - 1);
                        if (jsscope !== "none") {
                            output = output.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
                        }
                        if (output === "?" && obj.len > -1 && obj.count[obj.len] === 0 && obj.status[obj.len] === false) {
                            obj.count[obj.len] += 1;
                        }
                        return output;
                    },
                    regex          = function jspretty__tokenize_regex() {
                        var ee     = 0,
                            f      = b,
                            h      = 0,
                            i      = 0,
                            build  = ["/"],
                            output = "",
                            square = false;
                        for (ee = a + 1; ee < f; ee += 1) {
                            build.push(c[ee]);
                            if (c[ee - 1] !== "\\" || c[ee - 2] === "\\") {
                                if (c[ee] === "[") {
                                    square = true;
                                }
                                if (c[ee] === "]") {
                                    square = false;
                                }
                            }
                            if (c[ee] === "/" && square === false) {
                                if (c[ee - 1] === "\\") {
                                    i = 0;
                                    for (h = ee - 1; h > 0; h -= 1) {
                                        if (c[h] === "\\") {
                                            i += 1;
                                        } else {
                                            break;
                                        }
                                    }
                                    if (i % 2 === 0) {
                                        break;
                                    }
                                } else {
                                    break;
                                }
                            }
                        }
                        if (c[ee + 1] === "g" || c[ee + 1] === "i" || c[ee + 1] === "m" || c[ee + 1] === "y") {
                            build.push(c[ee + 1]);
                            if (c[ee + 2] !== c[ee + 1] && (c[ee + 2] === "g" || c[ee + 2] === "i" || c[ee + 2] === "m" || c[ee + 2] === "y")) {
                                build.push(c[ee + 2]);
                                if (c[ee + 3] !== c[ee + 1] && c[ee + 3] !== c[ee + 2] && (c[ee + 3] === "g" || c[ee + 3] === "i" || c[ee + 3] === "m" || c[ee + 3] === "y")) {
                                    build.push(c[ee + 3]);
                                    if (c[ee + 4] !== c[ee + 1] && c[ee + 4] !== c[ee + 2] && c[ee + 4] !== c[ee + 3] && (c[ee + 4] === "g" || c[ee + 4] === "i" || c[ee + 4] === "m" || c[ee + 4] === "y")) {
                                        build.push(c[ee + 4]);
                                        a = ee + 4;
                                    } else {
                                        a = ee + 3;
                                    }
                                } else {
                                    a = ee + 2;
                                }
                            } else {
                                a = ee + 1;
                            }
                        } else {
                            a = ee;
                        }
                        output = build.join("");
                        if (jsscope !== "none") {
                            output = output.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
                        }
                        return output;
                    },
                    tempstring     = function jspretty__tokenize_tempstring() {
                        var output = [c[a]];
                        for (a += 1; a < b; a += 1) {
                            output.push(c[a]);
                            if (c[a] === "`" && (c[a - 1] !== "\\" || slashes(a - 1) === false)) {
                                templateString.pop();
                                break;
                            }
                            if (c[a - 1] === "$" && c[a] === "{" && (c[a - 2] !== "\\" || slashes(a - 2) === false)) {
                                templateString[templateString.length - 1] = true;
                                break;
                            }
                        }
                        return output.join("");
                    },
                    numb           = function jspretty__tokenize_number() {
                        var ee    = 0,
                            f     = b,
                            build = [c[a]],
                            dot   = (build[0] === ".");
                        if (a < b - 2 && c[a + 1] === "x" && (/[0-9A-Fa-f]/).test(c[a + 2])) {
                            build.push("x");
                            for (ee = a + 2; ee < f; ee += 1) {
                                if ((/[0-9A-Fa-f]/).test(c[ee])) {
                                    build.push(c[ee]);
                                } else {
                                    break;
                                }
                            }
                        } else {
                            for (ee = a + 1; ee < f; ee += 1) {
                                if ((/[0-9]/).test(c[ee]) || (c[ee] === "." && dot === false)) {
                                    build.push(c[ee]);
                                    if (c[ee] === ".") {
                                        dot = true;
                                    }
                                } else {
                                    break;
                                }
                            }
                        }
                        if (ee < f - 1 && (c[ee] === "e" || c[ee] === "E")) {
                            build.push(c[ee]);
                            if (c[ee + 1] === "-") {
                                build.push("-");
                                ee += 1;
                            }
                            dot = false;
                            for (ee += 1; ee < f; ee += 1) {
                                if ((/[0-9]/).test(c[ee]) || (c[ee] === "." && dot === false)) {
                                    build.push(c[ee]);
                                    if (c[ee] === ".") {
                                        dot = true;
                                    }
                                } else {
                                    break;
                                }
                            }
                        }
                        a = ee - 1;
                        return build.join("");
                    },
                    space          = function jspretty__tokenize_space() {
                        var schars    = [],
                            f         = 0,
                            locallen  = b,
                            emptyline = 1,
                            output    = "",
                            stest     = (/\s/),
                            asitest   = false;
                        for (f = a; f < locallen; f += 1) {
                            if (c[f] === "\n") {
                                stats.space.newline += 1;
                                asitest             = true;
                            } else if (c[f] === " ") {
                                stats.space.space += 1;
                            } else if (c[f] === "\t") {
                                stats.space.tab += 1;
                            } else if (stest.test(c[f]) === true) {
                                stats.space.other += 1;
                                if (c[f] === "\r") {
                                    asitest = true;
                                }
                            } else {
                                break;
                            }
                            schars.push(c[f]);
                        }
                        a = f - 1;
                        if (token.length === 0) {
                            return;
                        }
                        output = schars.join("");
                        if (output.indexOf("\n") > -1 && token[token.length - 1].indexOf("#!/") !== 0) {
                            if (output.indexOf("\n") !== output.lastIndexOf("\n") || token[token.length - 1].indexOf("//") === 0) {
                                emptyline = 2;
                            }
                            lines[lines.length - 1] = emptyline;
                        }
                        if (asitest === true && ltoke !== ";" && lengthb < token.length) {
                            asi();
                            lengthb = token.length;
                        }
                    },
                    word           = function jspretty__tokenize_word() {
                        var f      = wordTest,
                            g      = 1,
                            build  = [],
                            output = "",
                            dotest = false;
                        do {
                            build.push(c[f]);
                            if (c[f] === "\\") {
                                logError("Illegal escape in JavaScript word token.", a);
                            }
                            f += 1;
                        } while (f < a);
                        output   = build.join("");
                        wordTest = -1;
                        if (types.length > 1 && output === "function" && types[types.length - 1] === "method" && (token[token.length - 2] === "{" || token[token.length - 2] === "x{")) {
                            types[types.length - 1] = "start";
                        }
                        if (types.length > 2 && output === "function" && ltype === "method" && (token[token.length - 2] === "}" || token[token.length - 2] === "x}")) {
                            if (token[token.length - 2] === "}") {
                                for (f = token.length - 3; f > -1; f -= 1) {
                                    if (types[f] === "end") {
                                        g += 1;
                                    } else if (types[f] === "start" || types[f] === "end") {
                                        g -= 1;
                                    }
                                    if (g === 0) {
                                        break;
                                    }
                                }
                                if (token[f] === "{" && token[f - 1] === ")") {
                                    g = 1;
                                    for (f -= 2; f > -1; f -= 1) {
                                        if (types[f] === "end") {
                                            g += 1;
                                        } else if (types[f] === "start" || types[f] === "end") {
                                            g -= 1;
                                        }
                                        if (g === 0) {
                                            break;
                                        }
                                    }
                                    if (token[f - 1] !== "function" && token[f - 2] !== "function") {
                                        types[types.length - 1] = "start";
                                    }
                                }
                            } else {
                                types[types.length - 1] = "start";
                            }
                        }
                        if (jscorrect === true && (output === "Object" || output === "Array") && c[a + 1] === "(" && c[a + 2] === ")" && token[lengtha - 2] === "=" && token[lengtha - 1] === "new") {
                            if (output === "Object") {
                                token[lengtha - 1] = "{";
                                token.push("}");
                            } else {
                                token[lengtha - 1] = "[";
                                token.push("]");
                            }
                            types[lengtha - 1] = "start";
                            types.push("end");
                            c[a + 1]        = "";
                            c[a + 2]        = "";
                            stats.container += 2;
                            a               += 2;
                        } else {
                            g = types.length - 1;
                            f = g;
                            if (jvarword !== "none" && output === "var") {
                                if (types[g] === "comment" || types[g] === "comment-inline") {
                                    do {
                                        g -= 1;
                                    } while (g > 0 && (types[g] === "comment" || types[g] === "comment-inline"));
                                }
                                if (jvarword === "list" && vart.len > -1 && vart.index[vart.len] === g) {
                                    stats.word.token     += 1;
                                    stats.word.chars     += output.length;
                                    ltoke                = ",";
                                    ltype                = "separator";
                                    token[g]             = ltoke;
                                    types[g]             = ltype;
                                    vart.count[vart.len] = 0;
                                    vart.index[vart.len] = g;
                                    return;
                                }
                                vart.len += 1;
                                vart.count.push(0);
                                vart.index.push(g);
                                g = f;
                            } else if (vart.len > -1 && output !== "var" && token.length === vart.index[vart.len] + 1 && token[vart.index[vart.len]] === ";" && ltoke !== "var" && jvarword === "list") {
                                vartpop();
                            }
                            if (output === "else" && (types[g] === "comment" || types[g] === "comment-inline")) {
                                do {
                                    f -= 1;
                                } while (f > -1 && (types[f] === "comment" || types[f] === "comment-inline"));
                                if (token[f] === "x;" && (token[f - 1] === "}" || token[f - 1] === "x}")) {
                                    token.splice(f, 1);
                                    types.splice(f, 1);
                                    lines.splice(f, 1);
                                    g -= 1;
                                    f -= 1;
                                }
                                do {
                                    build = [
                                        token[g], types[g], lines[g]
                                    ];
                                    token.pop();
                                    types.pop();
                                    lines.pop();
                                    token.splice(g - 3, 0, build[0]);
                                    types.splice(g - 3, 0, build[1]);
                                    lines.splice(g - 3, 0, build[2]);
                                    f += 1;
                                } while (f < g);
                            }
                            if (output === "try" && block.len > -1) {
                                block.count[block.len] += 1;
                            } else if (output === "catch" && block.len > -1) {
                                block.count[block.len] -= 1;
                            }
                            if (output === "do") {
                                dostate.count.push(0);
                                dostate.state.push(output);
                                dostate.len += 1;
                            }
                            if (output === "while" && dostate.state[dostate.len] === "do" && dostate.count[dostate.len] === 0) {
                                if (output === "while") {
                                    dotest = true;
                                }
                                if (ltoke === "}") {
                                    asifix();
                                }
                                dostate.count.pop();
                                dostate.state.pop();
                                dostate.len   -= 1;
                                dostate.index = token.length - 1;
                                blockinsert();
                            }
                            if (output === "if" && block.len > -1 && token[block.index[block.len]] === "else") {
                                blockpop();
                            }
                            if (output === "if" || output === "for" || output === "with" || (output === "while" && dotest === false) || output === "else" || output === "do") {
                                if (block.len > -1 && block.index[block.len] === token.length) {
                                    block.consec.push(true);
                                } else {
                                    block.consec.push(false);
                                }
                                if (ltoke === "return") {
                                    block.priorreturn.push(true);
                                } else {
                                    block.priorreturn.push(false);
                                }
                                block.word.push(output);
                                block.count.push(0);
                                if (output === "do") {
                                    block.index.push(token.length + 1);
                                } else {
                                    block.index.push(token.length);
                                }
                                block.semi.push(false);
                                block.len += 1;
                            }
                            token.push(output);
                            types.push("word");
                            ltoke            = output;
                            ltype            = "word";
                            stats.word.token += 1;
                            stats.word.chars += output.length;
                            lengtha          = token.length;
                        }
                        lines.push(0);
                    },
                    markup         = function jspretty__tokenize_markup() {
                        var output     = [],
                            curlytest  = false,
                            endtag     = false,
                            anglecount = 0,
                            curlycount = 0,
                            tagcount   = 0,
                            d          = 0,
                            syntax     = "=<>+*?|^:&.,;%(){}[]|~";
                        if (syntax.indexOf(c[a + 1]) > -1 || (/\s/).test(c[a + 1]) === true || ((/\d/).test(c[a + 1]) === true && (ltype === "operator" || ltype === "literal" || (ltype === "word" && ltoke !== "return")))) {
                            ltype = "operator";
                            return operator();
                        }
                        for (d = token.length - 1; d > -1; d -= 1) {
                            if (token[d] === "return" || types[d] === "operator" || types[d] === "method") {
                                ltype     = "markup";
                                jsxstatus = true;
                                break;
                            }
                            if (token[d] !== "(") {
                                ltype = "operator";
                                return operator();
                            }
                        }
                        for (a = a; a < b; a += 1) {
                            output.push(c[a]);
                            if (c[a] === "{") {
                                curlycount += 1;
                                curlytest  = true;
                            } else if (c[a] === "}") {
                                curlycount -= 1;
                                if (curlycount === 0) {
                                    curlytest = false;
                                }
                            } else if (c[a] === "<" && curlytest === false) {
                                anglecount += 1;
                                if (c[a + 1] === "/") {
                                    endtag = true;
                                }
                            } else if (c[a] === ">" && curlytest === false) {
                                anglecount -= 1;
                                if (endtag === true) {
                                    tagcount -= 1;
                                } else if (c[a - 1] !== "/") {
                                    tagcount += 1;
                                }
                                if (anglecount === 0 && curlycount === 0 && tagcount < 1) {
                                    return output.join("");
                                }
                                endtag = false;
                            }
                        }
                        return output.join("");
                    };
                for (a = 0; a < b; a += 1) {
                    lengtha = token.length;
                    if ((/\s/).test(c[a])) {
                        //space
                        if (wordTest > -1) {
                            word();
                        }
                        space();
                    } else if (c[a] === "<" && c[a + 1] === "?" && c[a + 2] === "p" && c[a + 3] === "h" && c[a + 4] === "p") {
                        //php
                        if (wordTest > -1) {
                            word();
                        }
                        ltoke              = generic("<?php", "?>");
                        ltype              = "literal";
                        stats.server.token += 1;
                        stats.server.chars += ltoke.length;
                        token.push(ltoke);
                        types.push(ltype);
                        lines.push(0);
                    } else if (c[a] === "<" && c[a + 1] === "%") {
                        //asp
                        if (wordTest > -1) {
                            word();
                        }
                        ltoke              = generic("<%", "%>");
                        ltype              = "literal";
                        stats.server.token += 1;
                        stats.server.chars += ltoke.length;
                        token.push(ltoke);
                        types.push(ltype);
                        lines.push(0);
                    } else if (c[a] === "<" && c[a + 1] === "!" && c[a + 2] === "-" && c[a + 3] === "-" && c[a + 4] === "#") {
                        //ssi
                        if (wordTest > -1) {
                            word();
                        }
                        ltoke              = generic("<!--#", "-->");
                        ltype              = "literal";
                        stats.server.token += 1;
                        stats.server.chars += ltoke.length;
                        token.push(ltoke);
                        types.push(ltype);
                        lines.push(0);
                    } else if (c[a] === "<") {
                        //markup
                        if (wordTest > -1) {
                            word();
                        }
                        ltoke              = markup();
                        stats.server.token += 1;
                        stats.server.chars += ltoke.length;
                        token.push(ltoke);
                        types.push(ltype);
                        lines.push(0);
                    } else if (c[a] === "/" && (a === b - 1 || c[a + 1] === "*")) {
                        //comment block
                        if (wordTest > -1) {
                            word();
                        }
                        ltoke                    = generic("/*", "*\/");
                        stats.commentBlock.token += 1;
                        stats.commentBlock.chars += ltoke.length;
                        if (ltoke.indexOf("# sourceMappingURL=") === 2) {
                            sourcemap[0] = token.length;
                            sourcemap[1] = ltoke;
                        }
                        if (jcomment !== "nocomment") {
                            ltype = "comment";
                            token.push(ltoke);
                            types.push(ltype);
                            lines.push(0);
                        }
                    } else if ((lines.length === 0 || lines[lines.length - 1] > 0) && c[a] === "#" && c[a + 1] === "!" && c[a + 2] === "/") {
                        //shebang
                        ltoke              = generic("#!/", "\r");
                        ltoke              = ltoke.slice(0, ltoke.length - 1);
                        ltype              = "literal";
                        stats.server.token += 1;
                        stats.server.chars += ltoke.length;
                        token.push(ltoke);
                        types.push(ltype);
                        lines.push(2);
                    } else if (c[a] === "/" && (a === b - 1 || c[a + 1] === "/")) {
                        //comment line
                        if (wordTest > -1) {
                            word();
                        }
                        asi();
                        ltoke                   = generic("//", "\r");
                        stats.commentLine.token += 1;
                        stats.commentLine.chars += ltoke.length;
                        if (ltoke.indexOf("# sourceMappingURL=") === 2) {
                            sourcemap[0] = token.length;
                            sourcemap[1] = ltoke;
                        }
                        if (jcomment !== "nocomment") {
                            if (lines[lines.length - 1] === 0 && ltype !== "comment" && ltype !== "comment-inline" && jstyleguide !== "mrdoobs") {
                                ltype = "comment-inline";
                            } else {
                                ltype = "comment";
                            }
                            if (ltype === "comment" && jwrap > 0 && ltoke.length > jwrap) {
                                commentSplit(ltoke);
                            } else {
                                token.push(ltoke);
                                types.push(ltype);
                                lines.push(0);
                            }
                        }
                    } else if (c[a] === "/" && (lengtha > 0 && (types[lengtha - 1] !== "word" || ltoke === "typeof" || ltoke === "return") && ltype !== "literal" && ltype !== "end")) {
                        //regex
                        if (wordTest > -1) {
                            word();
                        }
                        if (ltoke === "return" || ltype !== "word") {
                            ltoke             = regex();
                            ltype             = "regex";
                            stats.regex.token += 1;
                            stats.regex.chars += ltoke.length;
                        } else {
                            stats.operator.token += 1;
                            stats.operator.chars += 1;
                            ltoke                = "/";
                            ltype                = "operator";
                        }
                        token.push(ltoke);
                        types.push(ltype);
                        lines.push(0);
                    } else if (c[a] === "`" || (c[a] === "}" && templateString[templateString.length - 1] === true)) {
                        //template string
                        if (wordTest > -1) {
                            word();
                        }
                        if (c[a] === "`") {
                            templateString.push(false);
                        } else {
                            templateString[templateString.length - 1] = false;
                        }
                        ltoke              = tempstring();
                        ltype              = "literal";
                        stats.string.token += 1;
                        if (ltoke.charAt(ltoke.length - 1) === "{") {
                            stats.string.quote += 3;
                            stats.string.chars += ltoke.length - 3;
                        } else {
                            stats.string.quote += 2;
                            stats.string.chars = ltoke.length - 2;
                        }
                        token.push(ltoke);
                        types.push(ltype);
                        lines.push(0);
                    } else if (c[a] === "\"" || c[a] === "'") {
                        //string
                        if (wordTest > -1) {
                            word();
                        }
                        ltoke = generic(c[a], c[a]);
                        ltype = "literal";
                        if ((ltoke.charAt(0) === "\"" && jquoteConvert === "single") || (ltoke.charAt(0) === "'" && jquoteConvert === "double")) {
                            ltoke = quoteConvert(ltoke);
                        }
                        stats.string.token += 1;
                        if (ltoke.length > 1) {
                            stats.string.chars += ltoke.length - 2;
                        }
                        stats.string.quote += 2;
                        if (token[lengtha] === "+" && jwrap < 0 && (token[lengtha - 1].charAt(0) === "\"" || token[lengtha - 1].charAt(0) === "'")) {
                            strmerge(ltoke, false);
                        } else if (jwrap > 0 && (types[lengtha] !== "operator" || token[lengtha] === "=" || token[lengtha] === ":" || (token[lengtha] === "+" && types[lengtha - 1] === "literal"))) {
                            if (types[lengtha - 2] === "literal" && token[lengtha - 1] === "+" && (token[lengtha - 2].charAt(0) === "\"" || token[lengtha - 2].charAt(0) === "'") && token[lengtha - 2].length < jwrap + 2) {
                                strmerge(ltoke, true);
                            } else {
                                strlen(ltoke);
                            }
                        } else {
                            token.push(ltoke);
                            types.push(ltype);
                            lines.push(0);
                        }
                    } else if (c[a] === "-" && (a < b - 1 && c[a + 1] !== "=" && c[a + 1] !== "-") && (ltype === "literal" || ltype === "word") && ltoke !== "return" && (ltoke === ")" || ltoke === "]" || ltype === "word" || ltype === "literal")) {
                        //subtraction
                        if (wordTest > -1) {
                            word();
                        }
                        stats.operator.token += 1;
                        stats.operator.chars += 1;
                        ltoke                = "-";
                        ltype                = "operator";
                        token.push(ltoke);
                        types.push(ltype);
                        lines.push(0);
                    } else if (wordTest === -1 && ((/\d/).test(c[a]) || (a !== b - 2 && c[a] === "-" && c[a + 1] === "." && (/\d/).test(c[a + 2])) || (a !== b - 1 && (c[a] === "-" || c[a] === ".") && (/\d/).test(c[a + 1])))) {
                        //number
                        if (wordTest > -1) {
                            word();
                        }
                        if (ltype === "end" && c[a] === "-") {
                            ltoke                = "-";
                            ltype                = "operator";
                            stats.operator.token += 1;
                            stats.operator.chars += 1;
                        } else {
                            ltoke              = numb();
                            ltype              = "literal";
                            stats.number.token += 1;
                            stats.number.chars += ltoke.length;
                        }
                        token.push(ltoke);
                        types.push(ltype);
                        lines.push(0);
                    } else if (c[a] === ",") {
                        //comma
                        if (wordTest > -1) {
                            word();
                        }
                        stats.comma += 1;
                        if (ltype === "comment" || ltype === "comment-inline") {
                            commaComment();
                        } else if (vart.len > -1 && vart.count[vart.len] === 0 && jvarword === "each") {
                            asifix();
                            ltoke = "var";
                            ltype = "word";
                            token.push(";");
                            types.push("separator");
                            lines.push(0);
                            token.push(ltoke);
                            types.push(ltype);
                            lines.push(0);
                            vart.index[vart.len] = token.length - 1;
                        } else {
                            ltoke = ",";
                            ltype = "separator";
                            asifix();
                            token.push(ltoke);
                            types.push(ltype);
                            lines.push(0);
                        }
                    } else if (c[a] === ".") {
                        //period
                        if (wordTest > -1) {
                            word();
                        }
                        stats.operator.token += 1;
                        if (c[a + 1] === "." && c[a + 2] === ".") {
                            ltoke                = "...";
                            ltype                = "operator";
                            stats.operator.chars += 3;
                            a                    += 2;
                        } else {
                            asifix();
                            ltoke                = ".";
                            ltype                = "separator";
                            stats.operator.chars += 1;
                        }
                        token.push(ltoke);
                        types.push(ltype);
                        lines.push(0);
                    } else if (c[a] === ";") {
                        //semicolon
                        if (wordTest > -1) {
                            word();
                        }
                        if (vart.len > -1 && vart.count[vart.len] === 0) {
                            if (jvarword === "each") {
                                vartpop();
                            } else {
                                vart.index[vart.len] = token.length;
                            }
                        }
                        stats.semicolon += 1;
                        plusplus();
                        ltoke = ";";
                        ltype = "separator";
                        if (dostate.index === token.length - 1) {
                            asifix();
                        }
                        if (token[token.length - 1] === "x}") {
                            asibrace();
                        } else {
                            token.push(ltoke);
                            types.push(ltype);
                        }
                        lines.push(0);
                        blockinsert();
                    } else if (c[a] === "(") {
                        //parenthesis open
                        if (wordTest > -1) {
                            word();
                        }
                        if (block.len > -1) {
                            block.count[block.len] += 1;
                        }
                        if (vart.len > -1) {
                            vart.count[vart.len] += 1;
                        }
                        if (dostate.len > -1) {
                            dostate.count[dostate.len] += 1;
                        }
                        stats.container += 1;
                        if (ltoke === ")" || token[token.length - 1] === "x;") {
                            ltype = "method";
                        } else if (ltype === "comment" || ltype === "comment-inline" || ltype === "start") {
                            ltype = "start";
                        } else if ((token[lengtha - 1] === "function" && jspace === false) || token[token.length - 2] === "function") {
                            ltype = "method";
                        } else if (lengtha === 0 || ltoke === "return" || ltoke === "function" || ltoke === "for" || ltoke === "if" || ltoke === "with" || ltoke === "while" || ltoke === "switch" || ltoke === "catch" || ltype === "separator" || ltype === "operator" || (a > 0 && (/\s/).test(c[a - 1]) === true)) {
                            ltype = "start";
                        } else if (ltype === "end") {
                            ltype = methodTest();
                        } else {
                            ltype = "method";
                        }
                        asifix();
                        ltoke = "(";
                        token.push(ltoke);
                        types.push(ltype);
                        lines.push(0);
                    } else if (c[a] === "[") {
                        //square open
                        if (wordTest > -1) {
                            word();
                        }
                        if (block.len > -1) {
                            block.count[block.len] += 1;
                        }
                        if (vart.len > -1) {
                            vart.count[vart.len] += 1;
                        }
                        if (dostate.len > -1) {
                            dostate.count[dostate.len] += 1;
                        }
                        stats.container += 1;
                        ltoke           = "[";
                        ltype           = "start";
                        token.push(ltoke);
                        types.push(ltype);
                        lines.push(0);
                    } else if (c[a] === "{") {
                        //curly open
                        if (wordTest > -1) {
                            word();
                        }
                        if (vart.len > -1) {
                            vart.count[vart.len] += 1;
                        }
                        if (dostate.len > -1) {
                            dostate.count[dostate.len] += 1;
                        }
                        if (ltoke !== ")" && ltoke !== "else" && ltoke !== "do") {
                            obj.count.push(0);
                            obj.status.push(false);
                            obj.len += 1;
                        } else if (obj.len > -1) {
                            obj.count[obj.len] += 1;
                        }
                        if (ltoke === "else" || ltoke === "do" || (ltoke === ")" && block.len > -1 && block.count[block.len] === 0 && token[token.length - 4] !== "catch" && (block.word[block.len] === "if" || block.word[block.len] === "for" || block.word[block.len] === "while" || block.word[block.len] === "with"))) {
                            blockpop();
                        }
                        if (block.len > -1) {
                            block.count[block.len] += 1;
                        }
                        if (ltoke === ")") {
                            asifix();
                        }
                        stats.container += 1;
                        if ((ltype === "comment" || ltype === "comment-inline") && token[lengtha - 2] === ")") {
                            ltoke              = token[lengtha - 1];
                            token[lengtha - 1] = "{";
                            ltype              = types[lengtha - 1];
                            types[lengtha - 1] = "start";
                        } else {
                            ltoke = "{";
                            ltype = "start";
                        }
                        token.push(ltoke);
                        types.push(ltype);
                        if (jbraceline === true) {
                            lines.push(2);
                        } else {
                            lines.push(0);
                        }
                    } else if (c[a] === ")") {
                        //parenthesis close
                        if (wordTest > -1) {
                            word();
                        }
                        if (block.len > -1) {
                            block.count[block.len] -= 1;
                        }
                        if (vart.len > -1) {
                            vart.count[vart.len] -= 1;
                            if (vart.count[vart.len] < 0) {
                                vartpop();
                            }
                        }
                        asifix();
                        stats.container += 1;
                        plusplus();
                        ltoke = ")";
                        ltype = "end";
                        if (jscorrect === true) {
                            newarray();
                        } else {
                            token.push(ltoke);
                            types.push(ltype);
                            lines.push(0);
                        }
                        if (dostate.len > -1) {
                            dostate.count[dostate.len] -= 1;
                            if (dostate.count[dostate.len] === 0 && dostate.state[dostate.len] === "while") {
                                asi();
                                dostate.count.pop();
                                dostate.state.pop();
                                dostate.len   -= 1;
                                dostate.index = token.length - 1;
                            }
                        }
                    } else if (c[a] === "]") {
                        //square close
                        if (wordTest > -1) {
                            word();
                        }
                        if (block.len > -1) {
                            block.count[block.len] -= 1;
                        }
                        if (vart.len > -1) {
                            vart.count[vart.len] -= 1;
                            if (vart.count[vart.len] < 0) {
                                vartpop();
                            }
                        }
                        if (dostate.len > -1) {
                            dostate.count[dostate.len] -= 1;
                        }
                        asifix();
                        stats.container += 1;
                        plusplus();
                        ltoke = "]";
                        ltype = "end";
                        token.push(ltoke);
                        types.push(ltype);
                        lines.push(0);
                    } else if (c[a] === "}") {
                        //curly close
                        if (wordTest > -1) {
                            word();
                        }
                        if (ltoke === ",") {
                            token.pop();
                            types.pop();
                            lines.pop();
                        }
                        if (dostate.len > -1) {
                            dostate.count[dostate.len] -= 1;
                        }
                        asi();
                        if (vart.len > -1) {
                            if ((jvarword === "list" && vart.count[vart.len] === 0) || (token[token.length - 1] === "x;" && jvarword === "each")) {
                                vartpop();
                            }
                            vart.count[vart.len] -= 1;
                            if (vart.count[vart.len] < 0) {
                                vartpop();
                            }
                        }
                        if (obj.len > -1) {
                            if (obj.count[obj.len] === 0) {
                                objpop();
                            } else {
                                obj.count[obj.len] -= 1;
                            }
                        }
                        if (ltype === "comment" || ltype === "comment-inline") {
                            do {
                                lengtha -= 1;
                            } while (lengtha > 0 && (types[lengtha] === "comment" || ltype === "comment-inline"));
                            ltoke   = token[lengtha];
                            lengtha = token.length;
                        }
                        if (jbraceline === true) {
                            lines[lines.length - 1] = 2;
                        }
                        if (ltoke === ",") {
                            stats.container += 1;
                            ltoke           = "}";
                            ltype           = "end";
                            token.push(ltoke);
                            types.push(ltype);
                            lines.push(0);
                        } else {
                            if (ltoke === ";" && jmode === "minify" && jobfuscate === true) {
                                token[token.length - 1] = "x;";
                            }
                            plusplus();
                            stats.container += 1;
                            ltoke           = "}";
                            ltype           = "end";
                            token.push(ltoke);
                            types.push(ltype);
                            lines.push(0);
                        }
                        if (block.len > -1) {
                            if (block.count[block.len] > 0) {
                                block.count[block.len] -= 1;
                                if (block.count[block.len] === 0) {
                                    blockinsert();
                                }
                            }
                        }
                    } else if (c[a] === "=" || c[a] === "&" || c[a] === "<" || c[a] === ">" || c[a] === "+" || c[a] === "-" || c[a] === "*" || c[a] === "/" || c[a] === "!" || c[a] === "?" || c[a] === "|" || c[a] === "^" || c[a] === ":" || c[a] === "%" || c[a] === "~") {
                        //operator
                        if (wordTest > -1) {
                            word();
                        }
                        ltoke                = operator();
                        ltype                = "operator";
                        stats.operator.token += 1;
                        stats.operator.chars += ltoke.length;
                        if (ltoke !== "!" && ltoke !== "++" && ltoke !== "--") {
                            asifix();
                        }
                        token.push(ltoke);
                        types.push(ltype);
                        lines.push(0);
                    } else if (wordTest < 0 && c[a] !== "") {
                        wordTest = a;
                    }
                    if (block.len > -1) {
                        if (block.count[block.len] === 0 && token[token.length - 1] === ")" && token[block.index[block.len]] === block.word[block.len] && (block.word[block.len] === "if" || block.word[block.len] === "for" || block.word[block.len] === "while" || block.word[block.len] === "with")) {
                            block.index[block.len] = token.length;
                        }
                    }
                    if (vart.len > -1 && token.length === vart.index[vart.len] + 2 && token[vart.index[vart.len]] === ";" && ltoke !== "var" && jvarword === "list") {
                        vartpop();
                    }
                }
                if (((token[token.length - 1] !== "}" && token[0] === "{") || token[0] !== "{") && ((token[token.length - 1] !== "]" && token[0] === "[") || token[0] !== "[")) {
                    asi();
                }
                if (block.len > -1) {
                    blockinsert();
                }
                if (sourcemap[0] === token.length - 1) {
                    token.push("\n" + sourcemap[1]);
                    types.push("literal");
                    lines.push(0);
                }
            }());

            if (jscorrect === true) {
                (function jspretty__jscorrect() {
                    var a = 0,
                        b = token.length;
                    for (a = 0; a < b; a += 1) {
                        if (token[a] === "x;") {
                            token[a] = ";";
                            scolon   += 1;
                        }
                        if (token[a] === "x{") {
                            token[a] = "{";
                        }
                        if (token[a] === "x}") {
                            token[a] = "}";
                        }
                    }
                }());
            }

            if (jmode === "parse") {
                return {
                    token: token,
                    types: types
                };
            }

            if (jsxstatus === true && jsscope !== "none" && token[0] === "{") {
                jsscope = "none";
                (function jspretty__jsxScope() {
                    var a   = 0,
                        len = token.length;
                    for (a = 0; a < len; a += 1) {
                        if (types[a] === "word" && token[a - 1] !== ".") {
                            token[a] = "[pdjsxscope]" + token[a] + "[/pdjsxscope]";
                        }
                    }
                }());
            }

            if (jmode === "beautify" || (jmode === "minify" && jobfuscate === true)) {
                //this function is the pretty-print and var finding algorithm
                (function jspretty__algorithm() {
                    var a          = 0,
                        b          = token.length,
                        indent     = jlevel,
                        obj        = [],
                        list       = [],
                        listtest   = [],
                        lastlist   = false,
                        ternary    = [],
                        varline    = [],
                        casetest   = [],
                        fortest    = 0,
                        ctype      = "",
                        ctoke      = "",
                        ltype      = types[0],
                        ltoke      = token[0],
                        lettest    = -1,
                        varlen     = [],
                        methodtest = [],
                        assignlist = [false],
                        tern       = function jspretty__algorithm_tern() {
                            var c = 0,
                                d = 0;
                            for (c = a - 1; c > -1; c -= 1) {
                                if (types[c] === "end") {
                                    d += 1;
                                } else if (types[c] === "start" || types[c] === "method") {
                                    d -= 1;
                                    if (d < 0) {
                                        return;
                                    }
                                }
                                if (d === 0 && token[c] === "?") {
                                    indent -= 1;
                                    ternary.pop();
                                    if (ternary.length === 0) {
                                        return;
                                    }
                                }
                            }
                        },
                        functest   = function jspretty__algorithm_functest() {
                            var aa   = 0,
                                bb   = 1,
                                curl = (token[a - 1] === "}");
                            for (aa = a - 2; aa > -1; aa -= 1) {
                                if (curl === true) {
                                    if (token[aa] === "}") {
                                        bb += 1;
                                    }
                                    if (token[aa] === "{") {
                                        bb -= 1;
                                    }
                                } else {
                                    if (token[aa] === ")") {
                                        bb += 1;
                                    }
                                    if (token[aa] === "(") {
                                        bb -= 1;
                                    }
                                }
                                if (bb < 0) {
                                    level[a - 1] = indent;
                                    return false;
                                }
                                if (bb === 0) {
                                    if (token[aa - 1] === ")" && curl === false) {
                                        bb = 1;
                                        for (aa -= 2; aa > -1; aa -= 1) {
                                            if (token[aa] === ")") {
                                                bb += 1;
                                            }
                                            if (token[aa] === "(") {
                                                bb -= 1;
                                            }
                                            if (bb === 0) {
                                                if (token[aa - 1] === "function" || token[aa - 2] === "function") {
                                                    return true;
                                                }
                                                return false;
                                            }
                                        }
                                        return false;
                                    }
                                    if (curl === false && token[aa + 1] === "function") {
                                        return true;
                                    }
                                    return false;
                                }
                            }
                            return false;
                        },
                        separator  = function jspretty__algorithm_separator() {
                            if (ternary.length > 0 && ctoke !== ".") {
                                tern();
                            }
                            if (types[a - 1] === "comment-inline" && a > 1) {
                                return (function jspretty__algorithm_commentfix() {
                                    var c    = 0,
                                        d    = b,
                                        last = token[a - 1];
                                    level[a - 2] = "x";
                                    level[a - 1] = "x";
                                    for (c = a; c < d; c += 1) {
                                        token[c - 1] = token[c];
                                        types[c - 1] = types[c];
                                        if (token[c] === ";" || token[c] === "x;" || token[c] === "{" || token[c] === "x{" || lines[c] > 0) {
                                            token[c] = last;
                                            types[c] = "comment-inline";
                                            a        -= 1;
                                            return;
                                        }
                                    }
                                    token[c - 1] = last;
                                    types[c - 1] = "comment-inline";
                                    a            -= 1;
                                }());
                            }
                            if (ctoke === ".") {
                                level[a - 1] = "x";
                                return level.push("x");
                            }
                            if (ctoke === ",") {
                                level[a - 1] = "x";
                                if (listtest[listtest.length - 1] === false) {
                                    listtest[listtest.length - 1] = true;
                                    (function jspretty__algorithm_separator_listTest() {
                                        var c         = 0,
                                            d         = 0,
                                            assign    = false,
                                            compare   = false,
                                            semicolon = false;
                                        if (methodtest[methodtest.length - 1] === true) {
                                            list[list.length - 1] = true;
                                            return;
                                        }
                                        for (c = a - 1; c > -1; c -= 1) {
                                            if (types[c] === "end") {
                                                d += 1;
                                            }
                                            if (types[c] === "start" || types[c] === "method") {
                                                d -= 1;
                                                if (token[c] === "[" && d === -1) {
                                                    obj[obj.length - 1] = false;
                                                }
                                            }
                                            if (d === 0) {
                                                if (semicolon === false && token[c] === "return") {
                                                    list[list.length - 1] = true;
                                                    return;
                                                }
                                                if (assign === false && (token[c] === "=" || token[c] === ";" || token[c] === "x;")) {
                                                    assign = true;
                                                }
                                                if (compare === false && (token[c] === "&&" || token[c] === "||")) {
                                                    compare = true;
                                                }
                                                if (semicolon === false && (token[c] === ";" || token[c] === "x;")) {
                                                    semicolon = true;
                                                }
                                            }
                                            if (d === -1) {
                                                if (types[c] === "method") {
                                                    list[list.length - 1] = true;
                                                } else if (token[c] === "{" || token[c] === "x{") {
                                                    if (token[c - 1] !== ")") {
                                                        obj[obj.length - 1] = true;
                                                    } else if (compare === false && semicolon === false) {
                                                        for (c = c - 1; c > -1; c -= 1) {
                                                            if (types[c] === "end") {
                                                                d += 1;
                                                            }
                                                            if (types[c] === "start" || types[c] === "method") {
                                                                d -= 1;
                                                            }
                                                            if (d === -1 && token[c] === "(") {
                                                                if (token[c - 1] === "function" || token[c - 2] === "function" || token[c - 1] === "if" || token[c - 1] === "for" || token[c - 1] === "with") {
                                                                    return;
                                                                }
                                                                break;
                                                            }
                                                        }
                                                    }
                                                } else if (compare === false && semicolon === false && ((token[c] === "(" && token[c - 1] === "for") || token[c] === "[")) {
                                                    list[list.length - 1] = true;
                                                    return;
                                                }
                                                if (compare === false && semicolon === false && varline[varline.length - 1] === false && (assign === false || token[c] === "(")) {
                                                    list[list.length - 1] = true;
                                                }
                                                return;
                                            }
                                        }
                                    }());
                                }
                                if (obj[obj.length - 1] === true || (token[a - 2] === "+" && ltype === "literal" && level[a - 2] > 0 && (ltoke.charAt(0) === "\"" || ltoke.charAt(0) === "'"))) {
                                    level.push(indent);
                                    if (obj[obj.length - 1] === true) {
                                        return;
                                    }
                                }
                                if (list[list.length - 1] === true) {
                                    return (function jspretty__algorithm_separator_inList() {
                                        var c = 0,
                                            d = 0;
                                        for (c = a - 1; c > -1; c -= 1) {
                                            if (types[c] === "end") {
                                                d += 1;
                                            }
                                            if (types[c] === "start" || types[c] === "method") {
                                                d -= 1;
                                            }

                                            if (d === -1) {
                                                if (token[c] === "[" && token[c + 1] !== "]" && token[c + 2] !== "]") {
                                                    level[c] = indent;
                                                    if (token[a - 2] === "+" && ltype === "literal" && level[a - 2] > 0 && (ltoke.charAt(0) === "\"" || ltoke.charAt(0) === "'")) {
                                                        for (d = a - 2; d > c; d -= 2) {
                                                            if (token[d] !== "+") {
                                                                return;
                                                            }
                                                            if (token[d - 1].charAt(0) !== "\"" && token[d - 1].charAt(0) !== "'") {
                                                                level[d] = "s";
                                                            }
                                                        }
                                                        return;
                                                    }
                                                }
                                                return level.push("s");
                                            }
                                        }
                                        return level.push("s");
                                    }());
                                }
                                if (varline[varline.length - 1] === true && fortest === 0) {
                                    if (ltoke !== "]") {
                                        (function jspretty__algorithm_separator_varline() {
                                            var c     = 0,
                                                brace = false;
                                            for (c = a - 1; c > -1; c -= 1) {
                                                if (token[c] === "]") {
                                                    brace = true;
                                                }
                                                if (types[c] === "method" || types[c] === "start") {
                                                    if (token[c] === "[" && token[c + 1] !== "]" && brace === false) {
                                                        level[c] = indent;
                                                    }
                                                    return;
                                                }
                                            }
                                        }());
                                    }
                                    return level.push(indent);
                                }
                                return level.push(indent);
                            }
                            if (ctoke === ";" || ctoke === "x;") {
                                if (ctoke === "x;") {
                                    scolon += 1;
                                }
                                level[a - 1] = "x";
                                if (fortest === 0) {
                                    if (varline[varline.length - 1] === true) {
                                        varline[varline.length - 1] = false;
                                        if ((methodtest.length === 0 || methodtest[methodtest.length - 1] === false) && varlen.length > 0 && varlen[varlen.length - 1].length > 1) {
                                            varlist.push(varlen[varlen.length - 1]);
                                        }
                                        varlen.pop();
                                        (function jspretty__algorithm_separator_varlinefix() {
                                            var c = 0,
                                                d = 0;
                                            for (c = a - 1; c > -1; c -= 1) {
                                                if (types[c] === "start" || types[c] === "method") {
                                                    d += 1;
                                                }
                                                if (types[c] === "end") {
                                                    d -= 1;
                                                }
                                                if (d > 0) {
                                                    return;
                                                }
                                                if (d === 0) {
                                                    if (token[c] === "var" || token[c] === "let" || token[c] === "const") {
                                                        return;
                                                    }
                                                    if (token[c] === ",") {
                                                        indent -= 1;
                                                        return;
                                                    }
                                                }
                                            }
                                        }());
                                    }
                                    return level.push(indent);
                                }
                                if (fortest > 0) {
                                    if (varline[varline.length - 1] === true) {
                                        varline[varline.length - 1] = false;
                                    }
                                    return level.push("s");
                                }
                                return level.push("s");
                            }
                        },
                        method     = function jspretty__algorithm_method() {
                            if (ltoke === "*" && token[a - 2] === "function") {
                                level[a - 2] = "x";
                                level[a - 1] = "s";
                                level.push("x");
                            } else {
                                level[a - 1] = "x";
                                if (jbracepadding === true) {
                                    level.push("s");
                                } else {
                                    level.push("x");
                                }
                            }
                            list.push(false);
                            listtest.push(false);
                            methodtest.push(true);
                            obj.push(false);
                            assignlist.push(false);
                            if (fortest > 0) {
                                fortest += 1;
                            }
                        },
                        start      = function jspretty__algorithm_start() {
                            list.push(false);
                            listtest.push(false);
                            methodtest.push(false);
                            assignlist.push(false);
                            if (ctoke !== "(") {
                                indent += 1;
                            }
                            if (ltoke === "for") {
                                fortest = 1;
                            }
                            if (ctoke === "{" || ctoke === "x{") {
                                casetest.push(false);
                                varlen.push([]);
                                if (ctoke === "{") {
                                    varline.push(false);
                                }
                                if (ltoke === "=" || ltoke === ";" || ltoke === "x;" || ltoke === "," || ltoke === ":" || ltoke === "?" || ltoke === "return" || ltoke === "in" || ltype === "start" || ltype === "method") {
                                    obj.push(true);
                                } else {
                                    obj.push(false);
                                }
                                if (jbraces === true && ltype !== "operator" && ltoke !== "return") {
                                    level[a - 1] = indent - 1;
                                } else if (ltoke === ")") {
                                    level[a - 1] = "s";
                                } else if (ltoke === "{" || ltoke === "x{" || ltoke === "[" || ltoke === "}" || ltoke === "x}") {
                                    level[a - 1] = indent - 1;
                                }
                                return level.push(indent);
                            }
                            obj.push(false);
                            if (ctoke === "(") {
                                if (ltoke === "-" && token[a - 2] === "(") {
                                    level[a - 2] = "x";
                                }
                                if (ltoke === "function" || ltoke === "switch" || ltoke === "for" || ltoke === "while") {
                                    methodtest[methodtest.length - 1] = true;
                                }
                                if (jsscope !== "none" || jmode === "minify") {
                                    if (ltoke === "function" || token[a - 2] === "function") {
                                        meta[meta.length - 1] = 0;
                                    }
                                }
                                if (fortest > 0 && ltoke !== "for") {
                                    fortest += 1;
                                }
                                if (ltoke === "}" || ltoke === ")") {
                                    if (types[a - 1] !== "comment" && types[a - 1] !== "comment-inline" && functest() === true) {
                                        level[a - 1] = "x";
                                    } else {
                                        level[a - 1] = indent;
                                    }
                                }
                                if (ltoke === "}" || ltoke === "x}") {
                                    return level.push("x");
                                }
                                if ((ltoke === "-" && (a < 2 || (token[a - 2] !== ")" && token[a - 2] !== "]" && types[a - 2] !== "word" && types[a - 2] !== "literal"))) || (jspace === false && ltoke === "function")) {
                                    level[a - 1] = "x";
                                }
                                if (jbracepadding === true) {
                                    return level.push("s");
                                }
                                return level.push("x");
                            }
                            if (ctoke === "[") {
                                if (ltoke === "[") {
                                    list[list.length - 2] = true;
                                }
                                if (ltoke === "return") {
                                    level[a - 1] = "s";
                                } else if (ltoke === "]" || ltype === "word" || ltoke === ")") {
                                    level[a - 1] = "x";
                                } else if (ltoke === "[" || ltoke === "{" || ltoke === "x{") {
                                    level[a - 1] = indent - 1;
                                }
                                return (function jspretty__algorithm_start_squareBrace() {
                                    var c = 0;
                                    for (c = a + 1; c < b; c += 1) {
                                        if (token[c] === "]") {
                                            return level.push("x");
                                        }
                                        if (token[c] === ",") {
                                            return level.push(indent);
                                        }
                                    }
                                    return level.push("x");
                                }());
                            }
                            return level.push("x");
                        },
                        end        = function jspretty__algorithm_end() {
                            if (ternary.length > 0 && token[a + 1] !== "?" && token[a + 1] !== ":") {
                                tern();
                            }
                            if (fortest === 1 && ctoke === ")" && varline[varline.length - 1] === true) {
                                varline[varline.length - 1] = false;
                            }
                            if (ctoke !== ")" && (ltype !== "markup" || (ltype === "markup" && token[a - 2] !== "return"))) {
                                indent -= 1;
                            } else if (fortest > 0 && ctoke === ")") {
                                fortest -= 1;
                            }
                            if (ctoke === "}" || ctoke === "x}") {
                                if (types[a - 1] !== "comment" && types[a - 1] !== "comment-inline" && ltoke !== "{" && ltoke !== "x{" && ltype !== "end" && ltype !== "literal" && ltype !== "separator" && ltoke !== "++" && ltoke !== "--" && varline[varline.length - 1] === false && (a < 2 || token[a - 2] !== ";" || token[a - 2] !== "x;" || ltoke === "break" || ltoke === "return")) {
                                    (function jspretty__algorithm_end_curlyBrace() {
                                        var c       = 0,
                                            d       = 1,
                                            assign  = false,
                                            listlen = list.length;
                                        for (c = a - 1; c > -1; c -= 1) {
                                            if (types[c] === "end") {
                                                d += 1;
                                            }
                                            if (types[c] === "start" || types[c] === "method") {
                                                d -= 1;
                                            }
                                            if (d === 1) {
                                                if (token[c] === "=" || token[c] === ";" || token[c] === "x;") {
                                                    assign = true;
                                                }
                                                if (c > 0 && token[c] === "return" && (token[c - 1] === ")" || token[c - 1] === "{" || token[c - 1] === "x{" || token[c - 1] === "}" || token[c - 1] === "x}" || token[c - 1] === ";" || token[c - 1] === "x;")) {
                                                    indent       -= 1;
                                                    level[a - 1] = indent;
                                                    return;
                                                }
                                                if ((token[c] === ":" && ternary.length === 0) || (token[c] === "," && assign === false && varline[varline.length - 1] === false)) {
                                                    return;
                                                }
                                                if ((c === 0 || token[c - 1] === "{" || token[c - 1] === "x{") || token[c] === "for" || token[c] === "if" || token[c] === "do" || token[c] === "function" || token[c] === "while" || token[c] === "var" || token[c] === "let" || token[c] === "const" || token[c] === "with") {
                                                    if (list[listlen - 1] === false && listlen > 1 && (a === b - 1 || token[a + 1] !== ")") && obj[obj.length - 1] === false) {
                                                        indent -= 1;
                                                    }
                                                    if (varline[varline.length - 1] === true) {
                                                        indent -= 1;
                                                    }
                                                    return;
                                                }
                                            }
                                        }
                                    }());
                                }
                                if (jsscope !== "none" || jmode === "minify") {
                                    (function jspretty__algorithm_end_jsscope() {
                                        var c     = 0,
                                            d     = 1,
                                            build = [],
                                            paren = false;
                                        for (c = a - 1; c > -1; c -= 1) {
                                            if (types[c] === "end") {
                                                d += 1;
                                            } else if (types[c] === "start" || types[c] === "method") {
                                                d -= 1;
                                            }
                                            if (d < 0) {
                                                return;
                                            }
                                            if (d === 1) {
                                                if (meta[c] === "v" && token[c] !== build[build.length - 1]) {
                                                    build.push(token[c]);
                                                } else if (token[c] === ")") {
                                                    paren = true;
                                                } else if (paren === true && types[c] === "word" && token[c] !== build[build.length - 1]) {
                                                    build.push(token[c]);
                                                }
                                                if (c === lettest) {
                                                    meta[c] = a - 1;
                                                    if (token[c] === "let" || token[c] === "const") {
                                                        meta[meta.length - 2] = [
                                                            build, true
                                                        ];
                                                    }
                                                    build   = [];
                                                    lettest = -1;
                                                }
                                            }
                                            if (c > 0 && token[c - 1] === "function" && types[c] === "word" && token[c] !== build[build.length - 1]) {
                                                build.push(token[c]);
                                            }
                                            if (d === 0) {
                                                if (types[c] === "separator" || types[c] === "operator" || types[c] === "literal" || token[c] === "if" || token[c] === "else" || token[c] === "for" || token[c] === "switch" || token[c] === "do" || token[c] === "return" || token[c] === "while" || token[c] === "catch" || token[c] === "try" || token[c] === "with") {
                                                    return;
                                                }
                                                if (token[c] === "function") {
                                                    if (types[c + 1] === "word") {
                                                        meta[c + 2] = a;
                                                    } else {
                                                        meta[c + 1] = a;
                                                    }
                                                    meta[meta.length - 1] = [
                                                        build, false
                                                    ];
                                                    return;
                                                }
                                            }
                                        }
                                    }());
                                }
                                casetest.pop();
                            }
                            if ((types[a - 1] === "comment" && token[a - 1].substr(0, 2) === "//") || types[a - 1] === "comment-inline") {
                                if (token[a - 2] === "x}") {
                                    level[a - 3] = indent + 1;
                                }
                                level[a - 1] = indent;
                                level.push("x");
                            } else if ((ltoke === "{" && ctoke === "}") || (ltoke === "[" && ctoke === "]")) {
                                level[a - 1] = "x";
                                if (ctoke === "}" && jtitanium === true) {
                                    level.push(indent);
                                } else {
                                    level.push("x");
                                }
                            } else if (ctoke === "]") {
                                if (list[list.length - 1] === true || (ltoke === "]" && level[a - 2] === indent + 1)) {
                                    level[a - 1] = indent;
                                } else if (level[a - 1] === "s") {
                                    level[a - 1] = "x";
                                }
                                if (list[list.length - 1] === false) {
                                    if (ltoke === "}" || ltoke === "x}") {
                                        level[a - 1] = indent;
                                    }
                                    (function jspretty__algorithm_end_squareBrace() {
                                        var c = 0,
                                            d = 1;
                                        for (c = a - 1; c > -1; c -= 1) {
                                            if (token[c] === "]") {
                                                d += 1;
                                            }
                                            if (token[c] === "[") {
                                                d -= 1;
                                                if (d === 0) {
                                                    if (c > 0 && (token[c + 1] === "{" || token[c + 1] === "x{" || token[c + 1] === "[")) {
                                                        level[c] = indent + 1;
                                                        return;
                                                    }
                                                    if (token[c + 1] !== "[" || lastlist === false) {
                                                        level[c] = "x";
                                                        return;
                                                    }
                                                    return;
                                                }
                                            }
                                            if (d === 1 && token[c] === "+" && level[c] > 0) {
                                                level[c] -= 1;
                                            }
                                        }
                                    }());
                                }
                                level.push("x");
                            } else if (ctoke === ")" && ltype !== "markup") {
                                if (jbracepadding === true && ltype !== "end" && ltype !== "start" && ltype !== "method") {
                                    level[a - 1] = "s";
                                } else {
                                    level[a - 1] = "x";
                                }
                                level.push("s");
                            } else if ((ctoke === "}" || ctoke === "x}") && obj[obj.length - 1] === false && ltype === "word" && list[list.length - 1] === false && casetest[casetest.length - 1] === false) {
                                indent       += 1;
                                level[a - 1] = indent;
                                level.push(indent);
                            } else if (ctoke === "}" || ctoke === "x}" || list[list.length - 1] === true) {
                                if (ctoke === "}" && ltoke === "x}" && token[a + 1] === "else") {
                                    level[a - 2] = indent + 2;
                                    level.push("x");
                                } else {
                                    level.push(indent);
                                }
                                level[a - 1] = indent;
                            } else {
                                level.push("x");
                            }
                            lastlist = list[list.length - 1];
                            list.pop();
                            listtest.pop();
                            methodtest.pop();
                            if (ctoke === "}") {
                                if (varline[varline.length - 1] === true || (obj[obj.length - 1] === true && ltoke !== "{")) {
                                    if (varlen.length > 0 && assignlist[assignlist.length - 1] === false) {
                                        if (varlen[varlen.length - 1].length > 1) {
                                            varlist.push(varlen[varlen.length - 1]);
                                        }
                                    }
                                }
                                varlen.pop();
                                varline.pop();
                            }
                            assignlist.pop();
                            obj.pop();
                        },
                        operator   = function jspretty__algorithm_operator() {
                            if (ctoke === "!" || ctoke === "...") {
                                if (ltoke === "(") {
                                    level[a - 1] = "x";
                                }
                                if (ltoke === "}" || ltoke === "x}") {
                                    level[a - 1] = indent;
                                }
                                return level.push("x");
                            }
                            if (ltoke === ";" || ltoke === "x;") {
                                if (fortest === 0) {
                                    level[a - 1] = indent;
                                }
                                return level.push("x");
                            }
                            if (ctoke === "?") {
                                ternary.push(a);
                                indent       += 1;
                                level[a - 1] = indent;
                            }
                            if (ctoke === ":") {
                                if (obj[obj.length - 1] === true) {
                                    if (ternary.length > 0) {
                                        (function jspretty__algorithm_operator_ternObj() {
                                            var c = 0,
                                                d = 0,
                                                e = ternary[ternary.length - 1];
                                            for (c = a - 1; c > e; c -= 1) {
                                                if (types[c] === "end") {
                                                    d += 1;
                                                } else if (types[c] === "start" || types[c] === "method") {
                                                    d -= 1;
                                                }
                                                if (d < 0) {
                                                    return;
                                                }
                                            }
                                            if (d === 0) {
                                                level[a - 1] = indent;
                                            }
                                        }());
                                    } else {
                                        level[a - 1] = "x";
                                    }
                                } else if (ternary.length > 0) {
                                    level[a - 1] = indent;
                                } else {
                                    level[a - 1] = "s";
                                }
                                return (function jspretty__algorithm_operator_colon() {
                                    var c      = 0,
                                        d      = 0,
                                        listin = (varlen.length > 0)
                                            ? varlen[varlen.length - 1][varlen[varlen.length - 1].length - 1] + 1
                                            : 0,
                                        listop = token[listin],
                                        assign = (listop !== undefined && listop.indexOf("=") < 0);
                                    if (listin === 0) {
                                        return;
                                    }
                                    if (obj[obj.length - 1] === true && varlen.length > 0 && (listop === undefined || (assign === true && types[listin] === "operator"))) {
                                        c = a - 1;
                                        if (types[c] === "comment" || types[c] === "comment-inline") {
                                            do {
                                                c -= 1;
                                            } while (c > 0 && (types[c] === "comment" || types[c] === "comment-inline"));
                                        }
                                        if (ternary.length === 0) {
                                            varlen[varlen.length - 1].push(c);
                                        }
                                    }
                                    for (c = a - 1; c > -1; c -= 1) {
                                        if (types[c] === "start" || types[c] === "method") {
                                            d += 1;
                                        }
                                        if (types[c] === "end") {
                                            d -= 1;
                                        }
                                        if (d === 0 && token[c] === "=") {
                                            break;
                                        }
                                        if (d > 0) {
                                            if (d === 1 && token[c] === "{" && ternary.length === 0) {
                                                obj[obj.length - 1] = true;
                                            }
                                            break;
                                        }
                                        if (d === 0) {
                                            if (ternary.length === 0 && (token[c] === "case" || token[c] === "default")) {
                                                if (token[a + 1] !== "case") {
                                                    indent += 1;
                                                }
                                                return level.push(indent);
                                            }
                                            if (token[c] === "," && ternary.length === 0) {
                                                obj[obj.length - 1] = true;
                                                break;
                                            }
                                        }
                                    }
                                    return level.push("s");
                                }());
                            }
                            if (ctoke === "++" || ctoke === "--") {
                                if (ltype === "literal" || ltype === "word") {
                                    level[a - 1] = "x";
                                    level.push("s");
                                } else if (a < b - 1 && (types[a + 1] === "literal" || types[a + 1] === "word")) {
                                    level.push("x");
                                } else {
                                    level.push("s");
                                }
                                return;
                            }
                            if (ctoke === "+") {
                                if (ltoke.length === jwrap + 2 && (token[a + 1].charAt(0) === "\"" || token[a + 1].charAt(0) === "'")) {
                                    if (list[list.length - 1] === true || obj[obj.length - 1] === true || methodtest[methodtest.length - 1] === true || ((token[a - 1].charAt(0) === "\"" || token[a - 1].charAt(0) === "'") && (token[a - 2] === "+" || token[a - 2].indexOf("=") > -1 || types[a - 2] === "start"))) {
                                        return level.push(indent + 2);
                                    }
                                    return level.push(indent + 1);
                                }
                                if ((ltoke.charAt(0) === "\"" || ltoke.charAt(0) === "'") && token[a + 1] !== undefined && (token[a + 1].charAt(0) === "\"" || token[a + 1].charAt(0) === "'") && (token[a - 2] === "=" || token[a - 2] === "(" || (token[a - 2] === "+" && level[a - 2] > 0))) {
                                    if (ltoke.length + 3 + token[a + 1].length < jwrap) {
                                        return level.push("s");
                                    }
                                    if (varline[varline.length - 1] === true) {
                                        level.push(indent);
                                    } else {
                                        level.push(indent + 1);
                                    }
                                    return;
                                }
                            }
                            if (ctoke !== "?" || ternary.length === 0) {
                                level[a - 1] = "s";
                            }
                            if (ctoke.indexOf("=") > -1 && ctoke !== "==" && ctoke !== "===" && ctoke !== "!=" && ctoke !== "!==" && ctoke !== ">=" && ctoke !== "<=" && varlen.length > 0 && methodtest[methodtest.length - 1] === false && obj[obj.length - 1] === false) {
                                if (assignlist[assignlist.length - 1] === true) {
                                    (function jspretty__algorithm_operator_assignTest() {
                                        var c = 0,
                                            d = "";
                                        for (c = a - 1; c > -1; c -= 1) {
                                            d = token[c];
                                            if (d === ";" || d === "x;" || d === ",") {
                                                return varlen[varlen.length - 1].push(a - 1);
                                            }
                                            if (d.indexOf("=") > -1 && d !== "==" && d !== "===" && d !== "!=" && d !== "!==" && d !== ">=" && d !== "<=") {
                                                return;
                                            }
                                        }
                                    }());
                                }
                                (function jspretty__algorithm_operator_assignSpaces() {
                                    var c = 0,
                                        d = 0,
                                        e = false,
                                        f = "";
                                    for (c = a + 1; c < b; c += 1) {
                                        if (types[c] === "start" || types[c] === "method") {
                                            if (e === true && types[c] === "start" && token[c] !== "[") {
                                                if (assignlist[assignlist.length - 1] === true) {
                                                    assignlist[assignlist.length - 1] = false;
                                                    if (varlen[varlen.length - 1].length > 1) {
                                                        varlist.push(varlen[varlen.length - 1]);
                                                    }
                                                    varlen.pop();
                                                }
                                                break;
                                            }
                                            d += 1;
                                        }
                                        if (types[c] === "end") {
                                            d -= 1;
                                        }
                                        if (d < 0) {
                                            if (assignlist[assignlist.length - 1] === true) {
                                                assignlist[assignlist.length - 1] = false;
                                                if (varlen[varlen.length - 1].length > 1) {
                                                    varlist.push(varlen[varlen.length - 1]);
                                                }
                                                varlen.pop();
                                            }
                                            break;
                                        }
                                        if (d === 0) {
                                            f = token[c];
                                            if (e === true) {
                                                if (types[c] === "operator" || token[c] === ";" || token[c] === "x;" || token[c] === "var" || token[c] === "let" || token[c] === "const") {
                                                    if (f !== undefined && f.indexOf("=") > -1 && f !== "==" && f !== "===" && f !== "!=" && f !== "!==" && f !== ">=" && f !== "<=") {
                                                        if (assignlist[assignlist.length - 1] === false) {
                                                            varlen.push([a - 1]);
                                                            assignlist[assignlist.length - 1] = true;
                                                        }
                                                    }
                                                    if ((f === ";" || f === "x;" || f === "var" || f === "let" || f === "const") && assignlist[assignlist.length - 1] === true) {
                                                        assignlist[assignlist.length - 1] = false;
                                                        if (varlen.length > 0) {
                                                            if (varlen[varlen.length - 1].length > 1) {
                                                                varlist.push(varlen[varlen.length - 1]);
                                                            }
                                                            varlen.pop();
                                                        }
                                                    }
                                                    return;
                                                }
                                                if (assignlist[assignlist.length - 1] === true && (f === "return" || f === "break" || f === "continue" || f === "throw")) {
                                                    assignlist[assignlist.length - 1] = false;
                                                    if (varlen[varlen.length - 1].length > 1) {
                                                        varlist.push(varlen[varlen.length - 1]);
                                                    }
                                                    varlen.pop();
                                                }
                                            }
                                            if (f === ";" || f === "x;" || f === ",") {
                                                e = true;
                                            }
                                        }
                                    }
                                }());
                            }
                            if ((ctoke === "-" && ltoke === "return") || ltoke === "=") {
                                return level.push("x");
                            }
                            level.push("s");
                        },
                        word       = function jspretty__algorithm_word() {
                            var next    = token[a + 1],
                                compare = (next !== undefined && next !== "==" && next !== "===" && next !== "!=" && next !== "!==" && next === ">=" && next !== "<=" && next.indexOf("=") > -1);
                            if (varline[varline.length - 1] === true && (ltoke === "," || ltoke === "var" || ltoke === "let" || ltoke === "const")) {
                                if (fortest === 0 && (methodtest[methodtest.length - 1] === false || methodtest.length === 0)) {
                                    if (types[a + 1] === "operator" && compare === true && varlen.length > 0 && token[varlen[varlen.length - 1][varlen[varlen.length - 1].length - 1] + 1] !== ":") {
                                        varlen[varlen.length - 1].push(a);
                                    }
                                }
                                if (jsscope !== "none" || jmode === "minify") {
                                    meta[meta.length - 1] = "v";
                                }
                            } else if ((jsscope !== "none" || jmode === "minify") && ltoke === "function") {
                                meta[meta.length - 1] = "v";
                            }
                            if (ltoke === "}" || ltoke === "x}") {
                                level[a - 1] = indent;
                            }
                            if (ctoke === "else" && ltoke === "}" && token[a - 2] === "x}") {
                                level[a - 3] -= 1;
                            }
                            if (varline.length === 1 && varline[0] === true && (ltoke === "var" || ltoke === "let" || ltoke === "const" || ltoke === "," || (ltoke === "function" && types[a + 1] === "method"))) {
                                globals.push(ctoke);
                            }
                            if ((ctoke === "let" || ctoke === "const") && lettest < 0) {
                                lettest = a;
                            }
                            if (ctoke === "new") {
                                (function jspretty__algorithm_word_new() {
                                    var c       = 0,
                                        nextish = (typeof next === "string")
                                            ? next
                                            : "",
                                        apiword = (nextish === "")
                                            ? []
                                            : [
                                                "ActiveXObject", "ArrayBuffer", "AudioContext", "Canvas", "CustomAnimation", "DOMParser", "DataView", "Date", "Error", "EvalError", "FadeAnimation", "FileReader", "Flash", "Float32Array", "Float64Array", "FormField", "Frame", "Generator", "HotKey", "Image", "Iterator", "Intl", "Int16Array", "Int32Array", "Int8Array", "InternalError", "Loader", "Map", "MenuItem", "MoveAnimation", "Notification", "ParallelArray", "Point", "Promise", "Proxy", "RangeError", "Rectangle", "ReferenceError", "Reflect", "RegExp", "ResizeAnimation", "RotateAnimation", "Set", "SQLite", "ScrollBar", "Set", "Shadow", "StopIteration", "Symbol", "SyntaxError", "Text", "TextArea", "Timer", "TypeError", "URL", "Uint16Array", "Uint32Array", "Uint8Array", "Uint8ClampedArray", "URIError", "WeakMap", "WeakSet", "Web", "Window", "XMLHttpRequest"
                                            ],
                                        apilen  = apiword.length;
                                    for (c = 0; c < apilen; c += 1) {
                                        if (nextish === apiword[c]) {
                                            return;
                                        }
                                    }
                                    news += 1;
                                    if (jsscope !== "none") {
                                        token[a] = "<strong class='new'>new</strong>";
                                    }
                                }());
                            }
                            if (ctoke === "from" && ltoke === "}") {
                                level[a - 1] = "s";
                            }
                            if (ctoke === "this" && jsscope !== "none") {
                                token[a] = "<strong class='new'>this</strong>";
                            }
                            if (ctoke === "function" && jspace === false && a < b - 1 && token[a + 1] === "(") {
                                return level.push("x");
                            }
                            if (ctoke === "return") {
                                listtest[listtest.length - 1] = false;
                            }
                            if (ltype === "literal" && ltoke.charAt(ltoke.length - 1) === "{" && jbracepadding === false) {
                                level[a - 1] = "x";
                            } else if (ltoke === "-" && a > 1) {
                                if (types[a - 2] === "operator" || token[a - 2] === ",") {
                                    level[a - 1] = "x";
                                } else if (types[a - 2] === "start" || types[a - 2] === "method") {
                                    level[a - 2] = "x";
                                    level[a - 1] = "x";
                                }
                            } else if (ctoke === "while" && (ltoke === "}" || ltoke === "x}")) {
                                (function jspretty__algorithm_word_curlyBrace() {
                                    var c = 0,
                                        d = 0;
                                    for (c = a - 1; c > -1; c -= 1) {
                                        if (token[c] === "}" || token[c] === "x}") {
                                            d += 1;
                                        }
                                        if (token[c] === "{" || token[c] === "x{") {
                                            d -= 1;
                                        }
                                        if (d === 0) {
                                            if (token[c - 1] === "do") {
                                                level[a - 1] = "s";
                                                return;
                                            }
                                            level[a - 1] = indent;
                                            return;
                                        }
                                    }
                                }());
                            } else if (ctoke === "in" || (((ctoke === "else" && jelseline === false) || ctoke === "catch") && (ltoke === "}" || ltoke === "x}"))) {
                                level[a - 1] = "s";
                            } else if (ctoke === "var" || ctoke === "let" || ctoke === "const") {
                                if (methodtest.length === 0 || methodtest[methodtest.length - 1] === false) {
                                    varlen.push([]);
                                }
                                if (ltype === "end") {
                                    level[a - 1] = indent;
                                }
                                if (varline.length === 0) {
                                    varline.push(true);
                                } else {
                                    varline[varline.length - 1] = true;
                                }
                                if (fortest === 0) {
                                    (function jspretty__algorithm_word_varlisttest() {
                                        var c = 0,
                                            d = 0;
                                        for (c = a + 1; c < b; c += 1) {
                                            if (types[c] === "end") {
                                                d -= 1;
                                            }
                                            if (types[c] === "start" || types[c] === "method") {
                                                d += 1;
                                            }
                                            if (d < 0 || (d === 0 && (token[c] === ";" || token[c] === ","))) {
                                                break;
                                            }
                                        }
                                        if (token[c] === ",") {
                                            indent += 1;
                                        }
                                    }());
                                }
                            } else if (ctoke === "default" || ctoke === "case") {
                                if (casetest[casetest.length - 1] === false) {
                                    if (ltoke === "{" || ltoke === "x{") {
                                        indent -= 1;
                                    }
                                    level[a - 1]                  = indent;
                                    casetest[casetest.length - 1] = true;
                                } else if ((ltoke === ":" && (ctoke === "default" || types[a - 1] === "comment-inline" || types[a - 1] === "comment")) || ltoke !== ":") {
                                    indent       -= 1;
                                    level[a - 1] = indent;
                                }
                            } else if ((ctoke === "break" || ctoke === "return") && casetest[casetest.length - 1] === true) {
                                level[a - 1] = indent;
                                (function jspretty__algorithm_word_break() {
                                    var c = 0;
                                    for (c = a + 1; c < b; c += 1) {
                                        if (token[c] === "}" || token[c] === "x}") {
                                            casetest[casetest.length - 1] = false;
                                            return;
                                        }
                                        if (token[c] === "{" || token[c] === "x{" || token[c] === "[") {
                                            return;
                                        }
                                        if (token[c] === "case" || token[c] === "default" || token[c] === "switch") {
                                            indent                        -= 1;
                                            casetest[casetest.length - 1] = false;
                                            return;
                                        }
                                    }
                                }());
                            } else if (ctoke === "catch" || ctoke === "finally") {
                                level[a - 1] = "s";
                                return level.push("s");
                            }
                            if (jbracepadding === false && a < b - 1 && token[a + 1].charAt(0) === "}") {
                                return level.push("x");
                            }
                            level.push("s");
                        };
                    if (jtitanium === true) {
                        indent -= 1;
                    }
                    for (a = 0; a < b; a += 1) {
                        if (jsscope !== "none" || jmode === "minify") {
                            meta.push("");
                        }
                        ctype = types[a];
                        ctoke = token[a];
                        if (ctype === "comment") {
                            if (ltoke === "=" && (/^(\/\*\*\s*@[a-z_]+\s)/).test(ctoke) === true) {
                                level[a - 1] = "s";
                            } else {
                                level[a - 1] = indent;
                            }
                            level.push(indent);
                        } else if (ctype === "comment-inline") {
                            if (a < b - 1 && (token[a + 1] === "{" || token[a + 1] === "x{")) {
                                token[a]     = token[a + 1];
                                types[a]     = "start";
                                token[a + 1] = ctoke;
                                types[a + 1] = ctype;
                                a            -= 1;
                            } else {
                                level[a - 1] = "s";
                                level.push(indent);
                            }
                        } else if (ctype === "regex") {
                            level.push("x");
                        } else if (ctype === "literal") {
                            if (ctoke.indexOf("#!/") === 0) {
                                level.push(indent);
                            } else {
                                level.push("s");
                            }
                        } else if (ctype === "separator") {
                            separator();
                        } else if (ctype === "method") {
                            method();
                        } else if (ctype === "start") {
                            start();
                        } else if (ctype === "end") {
                            end();
                        } else if (ctype === "operator") {
                            operator();
                        } else if (ctype === "word") {
                            word();
                        } else if (ctype === "markup") {
                            if (ltoke === "return") {
                                level[a - 1] = "s";
                                level.push("x");
                            } else if (ltype === "start" || (token[a - 2] === "return" && ltype === "method")) {
                                level.push(indent);
                            } else {
                                level.push("x");
                            }
                            if (varline[varline.length - 1] === true) {
                                markupvar.push(a);
                            }
                        }
                        if (ctype !== "comment" && ctype !== "comment-inline") {
                            ltype = ctype;
                            ltoke = ctoke;
                        }
                    }
                }());
            }
            if (jtitanium === true) {
                token[0] = "";
                types[0] = "";
                lines[0] = 0;
            }
            if (jmode === "minify") {
                result = (function jspretty__minify() {
                    var a        = 0,
                        length   = token.length,
                        comtest  = (jtopcoms === false),
                        build    = [],
                        letter   = [65],
                        gg       = 0,
                        minmeta  = [],
                        output   = [],
                        findvars = function jspretty__minify_findvars(x) {
                            var metax    = meta[x],
                                metameta = meta[metax],
                                mini     = minmeta[meta[x]],
                                ee       = 0,
                                ff       = 0,
                                hh       = metameta.length;
                            if (hh > 0) {
                                for (ee = metax - 1; ee > a; ee -= 1) {
                                    if (types[ee] === "word") {
                                        for (ff = 0; ff < hh; ff += 1) {
                                            if (token[ee] === metameta[ff] && token[ee - 1] !== ".") {
                                                if (token[ee - 1] === "function" && token[ee + 1] === "(") {
                                                    token[ee] = mini[ff];
                                                } else if (token[ee - 1] === "case" || token[ee + 1] !== ":" || (token[ee + 1] === ":" && level[ee] !== "x")) {
                                                    token[ee] = mini[ff];
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        rename   = function jspretty__minify_rename(x) {
                            var b        = 0,
                                len      = x.length,
                                array    = [],
                                inc      = function jspretty__minify_rename_inc() {
                                    letter[letter.length - 1] += 1;
                                    if (letter[letter.length - 1] === 91) {
                                        letter[letter.length - 1] = 97;
                                    }
                                    if (letter[0] === 123) {
                                        for (gg = letter.length - 1; gg > -1; gg -= 1) {
                                            letter[gg] = 65;
                                        }
                                        letter.push(65);
                                    } else if (letter[letter.length - 1] === 123) {
                                        gg         = letter.length - 1;
                                        letter[gg] = 65;
                                        do {
                                            gg         -= 1;
                                            letter[gg] += 1;
                                            if (letter[gg] === 91) {
                                                letter[gg] = 97;
                                            }
                                            if (letter[gg] === 123) {
                                                letter[gg] = 65;
                                            }
                                        } while (letter[gg] === 65 && gg > 1);
                                    }
                                },
                                toLetter = function jspretty__minify_rename_toLetter() {
                                    var ii  = letter.length - 1,
                                        out = [];
                                    for (ii = ii; ii > -1; ii -= 1) {
                                        out.push(String.fromCharCode(letter[ii]));
                                    }
                                    return "a" + out.join("");
                                };
                            for (b = 0; b < len; b += 1) {
                                array.push(toLetter());
                                inc();
                            }
                            minmeta.push(array);
                        },
                        lastsemi = function jspretty__minify_lastsemi() {
                            var aa = 0,
                                bb = 0;
                            for (aa = a; aa > -1; aa -= 1) {
                                if (types[aa] === "end") {
                                    bb += 1;
                                } else if (types[aa] === "start" || types[aa] === "method") {
                                    bb -= 1;
                                }
                                if (bb < 0) {
                                    if (token[aa - 1] === "for") {
                                        build.push(";");
                                    }
                                    return;
                                }
                            }
                        };
                    if (jobfuscate === true) {
                        for (a = 0; a < token.length; a += 1) {
                            if (typeof meta[a] === "number" || typeof meta[a] === "string") {
                                minmeta.push(meta[a]);
                            } else {
                                rename(meta[a]);
                            }
                        }
                        for (a = token.length - 1; a > -1; a -= 1) {
                            if (typeof meta[a] === "number") {
                                findvars(a);
                            }
                        }
                    }
                    for (a = 0; a < length; a += 1) {
                        if (types[a] !== "comment") {
                            comtest = true;
                        }
                        if (types[a - 1] === "operator" && types[a] === "operator") {
                            build.push(" ");
                        }
                        if (types[a] === "markup" && typeof markuppretty === "function") {
                            build.push(markuppretty({
                                jsx   : true,
                                mode  : "minify",
                                source: token[a]
                            }));
                        } else if (types[a] === "word" && (types[a + 1] === "word" || types[a + 1] === "literal" || token[a + 1] === "x{" || types[a + 1] === "comment" || types[a + 1] === "comment-inline")) {
                            build.push(token[a]);
                            build.push(" ");
                        } else if (types[a] === "comment" && comtest === false) {
                            build.push(token[a]);
                            build.push("\n");
                        } else if (token[a] === "x;" && token[a + 1] !== "}") {
                            build.push(";");
                        } else if (token[a] === ";" && token[a + 1] === "}") {
                            lastsemi();
                        } else if (token[a] !== "x;" && token[a] !== "x{" && token[a] !== "x}" && types[a] !== "comment" && types[a] !== "comment-inline") {
                            build.push(token[a]);
                        }
                    }
                    if (error.length > 0) {
                        output.push("<p id='jserror'><strong>Error: ");
                        output.push(error[0].replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\u0000|\u0001|\u0002|\u0003|\u0004|\u0005|\u0006|\u0007|\u0008|\u000b|\u000c|\u000e|\u000f|\u0010|\u0011|\u0012|\u0013|\u0014|\u0015|\u0016|\u0017|\u0018|\u0019|\u001a|\u001b|\u001c|\u001d|\u001e|\u001f|\u007f|\u0080|\u0081|\u0082|\u0083|\u0084|\u0085|\u0086|\u0087|\u0088|\u0089|\u008a|\u008b|\u008c|\u008d|\u008e|\u008f|\u0090|\u0091|\u0092|\u0093|\u0094|\u0095|\u0096|\u0097|\u0098|\u0099|\u009a|\u009b|\u009c|\u009d|\u009e|\u009f/g, ""));
                        output.push("</strong> <code><span>");
                        error[1] = error[1].replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\u0000|\u0001|\u0002|\u0003|\u0004|\u0005|\u0006|\u0007|\u0008|\u000b|\u000c|\u000e|\u000f|\u0010|\u0011|\u0012|\u0013|\u0014|\u0015|\u0016|\u0017|\u0018|\u0019|\u001a|\u001b|\u001c|\u001d|\u001e|\u001f|\u007f|\u0080|\u0081|\u0082|\u0083|\u0084|\u0085|\u0086|\u0087|\u0088|\u0089|\u008a|\u008b|\u008c|\u008d|\u008e|\u008f|\u0090|\u0091|\u0092|\u0093|\u0094|\u0095|\u0096|\u0097|\u0098|\u0099|\u009a|\u009b|\u009c|\u009d|\u009e|\u009f/g, "").replace(/^(\s+)/, "");
                        if (error.indexOf("\n") > 0) {
                            output.push(error[1].replace("\n", "</span>"));
                        } else {
                            output.push(error[1]);
                            output.push("</span>");
                        }
                        output.push("</code></p>");
                        summary = output.join("");
                    }
                    return build.join("");
                }());
            } else {
                //the result function generates the output
                if (jsscope !== "none") {
                    result = (function jspretty__resultScope() {
                        var a           = 0,
                            b           = token.length,
                            build       = [],
                            linecount   = 2,
                            last        = "",
                            scope       = 1,
                            buildlen    = 0,
                            commentfix  = (function jspretty__resultScope_commentfix() {
                                var aa = 1,
                                    bb = 1;
                                if (types[0] !== "comment" || (token[0].indexOf("//") === 0 && lines[0] > 0) || types[1] !== "comment") {
                                    return 1;
                                }
                                do {
                                    if (token[aa].indexOf("/*") === 0) {
                                        bb += 1;
                                    }
                                    aa += 1;
                                } while (types[aa] === "comment" && aa < b);
                                return bb;
                            }()),
                            folderItem  = [],
                            comfold     = -1,
                            data        = [
                                "<div class='beautify' data-prettydiff-ignore='true'><ol class='count'>", "<li>", 1, "</li>"
                            ],
                            folder      = function jspretty__resultScope_folder() {
                                var datalen = (data.length - (commentfix * 3) > 0)
                                        ? data.length - (commentfix * 3)
                                        : 1,
                                    index   = a,
                                    start   = data[datalen + 1] || 1,
                                    assign  = true,
                                    kk      = index;
                                if (types[a] === "comment" && comfold === -1) {
                                    comfold = a;
                                } else if (types[a] !== "comment") {
                                    index = meta[a];
                                    do {
                                        kk -= 1;
                                    } while (token[kk] !== "function" && kk > -1);
                                    kk -= 1;
                                    if (token[kk] === "(" && types[kk] === "start") {
                                        do {
                                            kk -= 1;
                                        } while (kk > -1 && types[kk] === "start" && token[kk] === "(");
                                    }
                                    if (token[kk] === "=" || token[kk] === ":" || token[kk] === "," || (token[kk + 1] === "(" && types[kk + 1] === "start")) {
                                        assign = false;
                                    }
                                }
                                if (types[a] === "comment" && lines[a] === 2) {
                                    datalen -= 3;
                                    start   -= 1;
                                }
                                data[datalen]     = "<li class='fold' title='folds from line " + start + " to line xxx'>";
                                data[datalen + 1] = "- " + start;
                                folderItem.push([
                                    datalen, index, assign
                                ]);
                            },
                            foldclose   = function jspretty__resultScope_foldclose() {
                                var end  = (function jspretty__resultScope_foldclose_end() {
                                        if (comfold > -1 || folderItem[folderItem.length - 1][2] === true) {
                                            return linecount - commentfix - 1;
                                        }
                                        return linecount - commentfix;
                                    }()),
                                    semi = (/(>;<\/em>)$/).test(token[a]),
                                    gg   = 0,
                                    lets = false;
                                if (semi === true) {
                                    end -= 1;
                                    for (gg = build.length - 1; gg > 0; gg -= 1) {
                                        if (build[gg] === "let" || build[gg] === "const") {
                                            lets = true;
                                        }
                                        if (build[gg].indexOf("><li") > 0) {
                                            build[gg] = build[gg].replace(/class\='l\d+'/, "class='l" + (scope + 1) + "'");
                                            if (lets === true) {
                                                break;
                                            }
                                        }
                                        if (build[gg].indexOf("<em class='l" + scope + "'>" + tab) > -1) {
                                            build[gg] = build[gg].replace("<em class='l" + scope + "'>" + tab, "<em class='l" + (scope + 1) + "'>" + tab);
                                        }
                                    }
                                }
                                if (a > 1 && token[a].indexOf("}</em>") === token[a].length - 6 && token[a - 1].indexOf("{</em>") === token[a - 1].length - 6) {
                                    for (gg = data.length - 1; gg > 0; gg -= 1) {
                                        if (typeof data[gg] === "string" && data[gg].charAt(0) === "-") {
                                            data[gg - 1] = "<li>";
                                            data[gg]     = Number(data[gg].substr(1));
                                            folderItem.pop();
                                            return;
                                        }
                                    }
                                }
                                if (folderItem[folderItem.length - 1][1] === b - 1 && token[a].indexOf("<em ") === 0) {
                                    end += 1;
                                }
                                data[folderItem[folderItem.length - 1][0]] = data[folderItem[folderItem.length - 1][0]].replace("xxx", end);
                                folderItem.pop();
                            },
                            blockline   = function jspretty__resultScope_blockline(x) {
                                var commentLines = x.split("\n"),
                                    hh           = 0,
                                    ii           = commentLines.length - 1;
                                if (lines[a] > 0) {
                                    data.push("<li>");
                                    data.push(linecount);
                                    data.push("</li>");
                                    linecount += 1;
                                }
                                for (hh = 0; hh < ii; hh += 1) {
                                    data.push("<li>");
                                    data.push(linecount);
                                    data.push("</li>");
                                    linecount        += 1;
                                    commentLines[hh] = commentLines[hh] + "<em>&#xA;</em></li><li class='c0'>";
                                }
                                return commentLines.join("").replace(/\r/g, "");
                            },
                            findvars    = function jspretty__resultScope_findvars(x) {
                                var metax         = meta[x],
                                    metameta      = meta[metax][0],
                                    lettest       = meta[metax][1],
                                    ee            = 0,
                                    ff            = 0,
                                    hh            = metameta.length,
                                    adjustment    = 1,
                                    functionBlock = true,
                                    varbuild      = [],
                                    varbuildlen   = 0,
                                    letcomma      = function jspretty__resultScope_letcomma() {
                                        var aa = 0,
                                            bb = 0;
                                        for (aa = a; aa > -1; aa -= 1) {
                                            if (types[aa] === "end") {
                                                bb -= 1;
                                            }
                                            if (types[aa] === "start" || types[aa] === "method") {
                                                bb += 1;
                                            }
                                            if (bb > 0) {
                                                return;
                                            }
                                            if (bb === 0) {
                                                if (token[aa] === "var" || token[aa] === ";" || token[aa] === "x;") {
                                                    return;
                                                }
                                                if (token[aa] === "let" || token[aa] === "const") {
                                                    token[ee] = "<em class='s" + scope + "'>" + varbuild[0] + "</em>";
                                                }
                                            }
                                        }
                                    };
                                if (types[a - 1] === "word" && token[a - 1] !== "function" && lettest === false) {
                                    varbuild     = token[a - 1].split(" ");
                                    token[a - 1] = "<em class='s" + scope + "'>" + varbuild[0] + "</em>";
                                    varbuildlen  = varbuild.length;
                                    if (varbuildlen > 1) {
                                        do {
                                            token[ee]   = token[ee] + " ";
                                            varbuildlen -= 1;
                                        } while (varbuildlen > 1);
                                    }
                                }
                                if (hh > 0) {
                                    ee = metax - 1;
                                    if (lettest === true) {
                                        ee -= 1;
                                    }
                                    for (ee = ee; ee > a; ee -= 1) {
                                        if (types[ee] === "word") {
                                            varbuild = token[ee].split(" ");
                                            for (ff = 0; ff < hh; ff += 1) {
                                                if (varbuild[0] === metameta[ff] && token[ee - 1] !== ".") {
                                                    if (token[ee - 1] === "function" && token[ee + 1] === "(") {
                                                        token[ee]   = "<em class='s" + (scope + 1) + "'>" + varbuild[0] + "</em>";
                                                        varbuildlen = varbuild.length;
                                                        if (varbuildlen > 1) {
                                                            do {
                                                                token[ee]   = token[ee] + " ";
                                                                varbuildlen -= 1;
                                                            } while (varbuildlen > 1);
                                                        }
                                                    } else if (token[ee - 1] === "case" || token[ee + 1] !== ":" || (token[ee + 1] === ":" && level[ee] !== "x")) {
                                                        if (lettest === true) {
                                                            if (token[ee - 1] === "let" || token[ee - 1] === "const") {
                                                                token[ee] = "<em class='s" + scope + "'>" + varbuild[0] + "</em>";
                                                            } else if (token[ee - 1] === ",") {
                                                                letcomma();
                                                            } else {
                                                                token[ee] = "<em class='s" + scope + "'>" + varbuild[0] + "</em>";
                                                            }
                                                        } else {
                                                            token[ee] = "<em class='s" + scope + "'>" + varbuild[0] + "</em>";
                                                        }
                                                        varbuildlen = varbuild.length;
                                                        if (varbuildlen > 1) {
                                                            do {
                                                                token[ee]   = token[ee] + " ";
                                                                varbuildlen -= 1;
                                                            } while (varbuildlen > 1);
                                                        }
                                                    }
                                                    break;
                                                }
                                            }
                                        }
                                        if (functionBlock === true) {
                                            if (types[ee] === "end") {
                                                adjustment += 1;
                                            } else if (types[ee] === "start" || types[ee] === "method") {
                                                adjustment -= 1;
                                            }
                                            if (adjustment === 0 && token[ee] === "{") {
                                                token[ee]     = "<em class='s" + scope + "'>{</em>";
                                                functionBlock = false;
                                            }
                                        }
                                    }
                                } else {
                                    ee = a + 1;
                                    if (lettest === true) {
                                        ee -= 1;
                                    }
                                    for (ee = ee; ee < metax; ee += 1) {
                                        if (types[ee] === "end") {
                                            adjustment -= 1;
                                        } else if (types[ee] === "start" || types[ee] === "method") {
                                            adjustment += 1;
                                        }
                                        if (adjustment === 1 && token[ee] === "{") {
                                            token[ee] = "<em class='s" + scope + "'>{</em>";
                                            return;
                                        }
                                    }
                                }
                            },
                            indent      = jlevel,
                            tab         = (function jspretty__resultScope_tab() {
                                var aa = jchar,
                                    bb = jsize,
                                    cc = [];
                                for (bb = bb; bb > 0; bb -= 1) {
                                    cc.push(aa);
                                }
                                return cc.join("");
                            }()),
                            lscope      = [
                                "<em class='l0'>" + tab + "</em>", "<em class='l0'>" + tab + "</em><em class='l1'>" + tab + "</em>", "<em class='l0'>" + tab + "</em><em class='l1'>" + tab + "</em><em class='l2'>" + tab + "</em>", "<em class='l0'>" + tab + "</em><em class='l1'>" + tab + "</em><em class='l2'>" + tab + "</em><em class='l3'>" + tab + "</em>", "<em class='l0'>" + tab + "</em><em class='l1'>" + tab + "</em><em class='l2'>" + tab + "</em><em class='l3'>" + tab + "</em><em class='l4'>" + tab + "</em>", "<em class='l0'>" + tab + "</em><em class='l1'>" + tab + "</em><em class='l2'>" + tab + "</em><em class='l3'>" + tab + "</em><em class='l4'>" + tab + "</em><em class='l5'>" + tab + "</em>", "<em class='l0'>" + tab + "</em><em class='l1'>" + tab + "</em><em class='l2'>" + tab + "</em><em class='l3'>" + tab + "</em><em class='l4'>" + tab + "</em><em class='l5'>" + tab + "</em><em class='l6'>" + tab + "</em>", "<em class='l0'>" + tab + "</em><em class='l1'>" + tab + "</em><em class='l2'>" + tab + "</em><em class='l3'>" + tab + "</em><em class='l4'>" + tab + "</em><em class='l5'>" + tab + "</em><em class='l6'>" + tab + "</em><em class='l7'>" + tab + "</em>", "<em class='l0'>" + tab + "</em><em class='l1'>" + tab + "</em><em class='l2'>" + tab + "</em><em class='l3'>" + tab + "</em><em class='l4'>" + tab + "</em><em class='l5'>" + tab + "</em><em class='l6'>" + tab + "</em><em class='l7'>" + tab + "</em><em class='l8'>" + tab + "</em>", "<em class='l0'>" + tab + "</em><em class='l1'>" + tab + "</em><em class='l2'>" + tab + "</em><em class='l3'>" + tab + "</em><em class='l4'>" + tab + "</em><em class='l5'>" + tab + "</em><em class='l6'>" + tab + "</em><em class='l7'>" + tab + "</em><em class='l8'>" + tab + "</em><em class='l9'>" + tab + "</em>", "<em class='l0'>" + tab + "</em><em class='l1'>" + tab + "</em><em class='l2'>" + tab + "</em><em class='l3'>" + tab + "</em><em class='l4'>" + tab + "</em><em class='l5'>" + tab + "</em><em class='l6'>" + tab + "</em><em class='l7'>" + tab + "</em><em class='l8'>" + tab + "</em><em class='l9'>" + tab + "</em><em class='l10'>" + tab + "</em>", "<em class='l0'>" + tab + "</em><em class='l1'>" + tab + "</em><em class='l2'>" + tab + "</em><em class='l3'>" + tab + "</em><em class='l4'>" + tab + "</em><em class='l5'>" + tab + "</em><em class='l6'>" + tab + "</em><em class='l7'>" + tab + "</em><em class='l8'>" + tab + "</em><em class='l9'>" + tab + "</em><em class='l10'>" + tab + "</em><em class='l11'>" + tab + "</em>", "<em class='l0'>" + tab + "</em><em class='l1'>" + tab + "</em><em class='l2'>" + tab + "</em><em class='l3'>" + tab + "</em><em class='l4'>" + tab + "</em><em class='l5'>" + tab + "</em><em class='l6'>" + tab + "</em><em class='l7'>" + tab + "</em><em class='l8'>" + tab + "</em><em class='l9'>" + tab + "</em><em class='l10'>" + tab + "</em><em class='l11'>" + tab + "</em><em class='l12'>" + tab + "</em>", "<em class='l0'>" + tab + "</em><em class='l1'>" + tab + "</em><em class='l2'>" + tab + "</em><em class='l3'>" + tab + "</em><em class='l4'>" + tab + "</em><em class='l5'>" + tab + "</em><em class='l6'>" + tab + "</em><em class='l7'>" + tab + "</em><em class='l8'>" + tab + "</em><em class='l9'>" + tab + "</em><em class='l10'>" + tab + "</em><em class='l11'>" + tab + "</em><em class='l12'>" + tab + "</em><em class='l13'>" + tab + "</em>", "<em class='l0'>" + tab + "</em><em class='l1'>" + tab + "</em><em class='l2'>" + tab + "</em><em class='l3'>" + tab + "</em><em class='l4'>" + tab + "</em><em class='l5'>" + tab + "</em><em class='l6'>" + tab + "</em><em class='l7'>" + tab + "</em><em class='l8'>" + tab + "</em><em class='l9'>" + tab + "</em><em class='l10'>" + tab + "</em><em class='l11'>" + tab + "</em><em class='l12'>" + tab + "</em><em class='l13'>" + tab + "</em><em class='l14'>" + tab + "</em>", "<em class='l0'>" + tab + "</em><em class='l1'>" + tab + "</em><em class='l2'>" + tab + "</em><em class='l3'>" + tab + "</em><em class='l4'>" + tab + "</em><em class='l5'>" + tab + "</em><em class='l6'>" + tab + "</em><em class='l7'>" + tab + "</em><em class='l8'>" + tab + "</em><em class='l9'>" + tab + "</em><em class='l10'>" + tab + "</em><em class='l11'>" + tab + "</em><em class='l12'>" + tab + "</em><em class='l13'>" + tab + "</em><em class='l14'>" + tab + "</em><em class='l15'>" + tab + "</em>", "<em class='l0'>" + tab + "</em><em class='l1'>" + tab + "</em><em class='l2'>" + tab + "</em><em class='l3'>" + tab + "</em><em class='l4'>" + tab + "</em><em class='l5'>" + tab + "</em><em class='l6'>" + tab + "</em><em class='l7'>" + tab + "</em><em class='l8'>" + tab + "</em><em class='l9'>" + tab + "</em><em class='l10'>" + tab + "</em><em class='l11'>" + tab + "</em><em class='l12'>" + tab + "</em><em class='l13'>" + tab + "</em><em class='l14'>" + tab + "</em><em class='l15'>" + tab + "</em><em class='l16'>" + tab + "</em>"
                            ],
                            nl          = function jspretty__resultScope_nl(x, linetest) {
                                var dd = 0;
                                if (token[a] !== "x}" || (token[a] === "x}" && token[a + 1] !== "}")) {
                                    data.push("<li>");
                                    data.push(linecount);
                                    data.push("</li>");
                                    linecount += 1;
                                    if (a < b - 1 && token[a + 1].indexOf("/*") === 0) {
                                        build.push("<em>&#xA;</em></li><li class='c0'>");
                                    } else {
                                        build.push("<em>&#xA;</em></li><li class='l" + scope + "'>");
                                        if (x > 0) {
                                            dd = scope;
                                            if (scope > 0) {
                                                if (scope === x + 1 && x > 0 && linetest !== true) {
                                                    dd -= 1;
                                                }
                                                build.push(lscope[dd - 1]);
                                            }
                                        } else if (linetest === true) {
                                            build.push(lscope[0]);
                                        }
                                    }
                                } else {
                                    if (x > 0) {
                                        dd = scope;
                                        if (scope > 0) {
                                            if (scope === x + 1 && x > 0 && linetest !== true) {
                                                dd -= 1;
                                            }
                                            build.push(lscope[dd - 1]);
                                        }
                                    }
                                }
                                for (dd = dd; dd < x; dd += 1) {
                                    build.push(tab);
                                }
                            },
                            rl          = function jspretty__resultScope_rl(x) {
                                var bb = token.length,
                                    cc = 2,
                                    dd = 0;
                                for (dd = a + 2; dd < bb; dd += 1) {
                                    if (token[dd] === "x}") {
                                        cc += 1;
                                    } else {
                                        break;
                                    }
                                }
                                nl(x - cc);
                                a += 1;
                            },
                            markupBuild = function jspretty__resultScope_markupBuild() {
                                var mindent  = (function jspretty__resultScope_markupBuild_offset() {
                                        var d = 0;
                                        if (a === markupvar[0]) {
                                            markupvar.splice(0, 1);
                                            return 1;
                                        }
                                        if (token[d] === "return" || token[0] === "{") {
                                            return 1;
                                        }
                                        if (level[a] === "x" || level[a] === "s") {
                                            return 0;
                                        }
                                        for (d = a - 1; d > -1; d -= 1) {
                                            if (token[d] !== "(") {
                                                if (token[d] === "=") {
                                                    return 1;
                                                }
                                                return 0;
                                            }
                                        }
                                        return 0;
                                    }()),
                                    markup   = (function jspretty__resultScope_markupBuild_varscope() {
                                        var item    = markuppretty({
                                                inchar : jchar,
                                                inlevel: mindent,
                                                insize : jsize,
                                                jsscope: true,
                                                jsx    : true,
                                                mode   : "beautify",
                                                source : token[a]
                                            }).replace(/return\s+</g, "return <"),
                                            emscope = function jsscope__resultScope_markupBuild_varscope_emscope(x) {
                                                return "<em class='s" + x.replace("[pdjsxem", "").replace("]", "") + "'>";
                                            },
                                            word    = "",
                                            newword = "",
                                            inca    = 0,
                                            incb    = 0,
                                            lena    = meta.length,
                                            lenb    = 0,
                                            vars    = [];
                                        if (item.indexOf("[pdjsxscope]") < 0) {
                                            return item.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").split("\n");
                                        }
                                        do {
                                            newword = "";
                                            vars    = [];
                                            word    = item.substring(item.indexOf("[pdjsxscope]") + 12, item.indexOf("[/pdjsxscope]"));
                                            for (inca = 0; inca < lena; inca += 1) {
                                                if (typeof meta[inca] === "number" && inca < a && a < meta[inca]) {
                                                    vars.push(meta[inca]);
                                                    lenb = meta[meta[inca]].length;
                                                    for (incb = 0; incb < lenb; incb += 1) {
                                                        if (meta[meta[inca]][incb] === word) {
                                                            newword = "[pdjsxem" + (vars.length + 1) + "]" + word + "[/pdjsxem]";
                                                        }
                                                    }
                                                    if (incb < lenb) {
                                                        break;
                                                    }
                                                    vars.pop();
                                                }
                                            }
                                            if (newword === "") {
                                                lenb = globals.length;
                                                for (incb = 0; incb < lenb; incb += 1) {
                                                    if (word === globals[incb]) {
                                                        newword = "[pdjsxem0]" + word + "[/pdjsxem]";
                                                    }
                                                }
                                                if (newword === "") {
                                                    newword = word;
                                                }
                                            }
                                            item = item.replace("[pdjsxscope]" + word + "[/pdjsxscope]", newword);
                                        } while (item.indexOf("[pdjsxscope]") > -1);
                                        return item.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\[pdjsxem\d+\]/g, emscope).replace(/\[\/pdjsxem\]/g, "</em>").split("\n");
                                    }()),
                                    len      = 0,
                                    c        = 0,
                                    spaces   = 0,
                                    synthtab = "\\" + tab.charAt(0),
                                    tabreg   = {};
                                len = tab.length;
                                for (c = 1; c < len; c += 1) {
                                    synthtab = synthtab + "\\" + tab.charAt(c);
                                }
                                tabreg  = new RegExp("^(" + synthtab + "+)");
                                mindent = indent + 2;
                                if (level[a] === "x" || level[a] === "s") {
                                    markup[0] = markup[0].replace(tabreg, "");
                                    mindent   -= 1;
                                }
                                len = markup.length;
                                for (c = 0; c < len - 1; c += 1) {
                                    if (markup[c].indexOf(tab) !== 0 && c > 0) {
                                        spaces = markup[c - 1].split(tab).length - 1;
                                        do {
                                            spaces    -= 1;
                                            markup[c] = tab + markup[c];
                                        } while (spaces > 0);
                                    }
                                    build.push(markup[c]);
                                    nl(mindent - 1);
                                }
                                build.push(markup[markup.length - 1]);
                            },
                            multiline   = function (x) {
                                var temparray = x.split("\n"),
                                    c         = 0,
                                    d         = temparray.length;
                                build.push(temparray[0]);
                                for (c = 1; c < d; c += 1) {
                                    nl(indent);
                                    build.push(temparray[c]);
                                }
                            };
                        if (jvertical === true) {
                            (function jspretty__resultScope_varSpaces() {
                                var aa          = 0,
                                    lastListLen = 0,
                                    cc          = 0,
                                    dd          = 0,
                                    longest     = 0,
                                    longTest    = 0,
                                    strlongest  = 0,
                                    strspace    = "",
                                    tokenInList = "",
                                    longList    = [],
                                    joins       = function jspretty__resultScope_varSpaces_joins(x) {
                                        var xlen    = token[x].length,
                                            mixTest = false,
                                            perTest = false,
                                            period  = function jspretty__resultScope_varSpaces_joins_periodInit() {
                                                return;
                                            },
                                            ending  = function jspretty__resultScope_varSpaces_joins_endingInit() {
                                                return;
                                            };
                                        period = function jspretty__resultScope_varSpaces_joins_period() {
                                            perTest = true;
                                            xlen    += 1;
                                            do {
                                                x    -= 2;
                                                xlen += token[x].length + 1;
                                            } while (x > 1 && token[x - 1] === ".");
                                            if (token[x] === ")" || token[x] === "]") {
                                                x       += 1;
                                                xlen    -= 2;
                                                mixTest = true;
                                                ending();
                                            }
                                        };
                                        ending = function jspretty__resultScope_varSpaces_joins_ending() {
                                            var yy = 0;
                                            for (x -= 1; x > -1; x -= 1) {
                                                xlen += token[x].length;
                                                if (types[x] === "start" || types[x] === "method") {
                                                    yy += 1;
                                                    if (yy === 1) {
                                                        if (mixTest === true) {
                                                            return;
                                                        }
                                                        break;
                                                    }
                                                }
                                                if (types[x] === "end") {
                                                    yy -= 1;
                                                }
                                                if (types[x] === "operator" || types[x] === "separator") {
                                                    if (level[x] === "s") {
                                                        xlen += 1;
                                                    }
                                                    if (level[x - 1] === "s") {
                                                        xlen += 1;
                                                    }
                                                }
                                                if (token[x] === ";" || token[x] === "x;" || token[x] === "}" || token[x] === "x}") {
                                                    return;
                                                }
                                            }
                                            if (types[x - 1] === "word" || types[x - 1] === "literal") {
                                                x    -= 1;
                                                xlen += token[x].length;
                                            }
                                            if (types[x] === "word" && token[x - 1] === ".") {
                                                period();
                                            }
                                            if (token[x] === "{") {
                                                return;
                                            }
                                            if (token[x - 1] === ")" || token[x - 1] === "]") {
                                                xlen -= 1;
                                                ending();
                                            }
                                        };
                                        if (types[x] === "word" && token[x - 1] === ".") {
                                            period();
                                        } else if (token[x] === ")" || token[x] === "]") {
                                            ending();
                                            if (perTest === false) {
                                                xlen += 1;
                                            }
                                        } else {
                                            xlen += 1;
                                        }
                                        if (token[x - 1] === "," && token[varlist[aa][cc] + 1] !== ":" && token[varlist[aa][0] - 1] !== "var" && token[varlist[aa][0] - 1] !== "let" && token[varlist[aa][0] - 1] !== "const") {
                                            xlen += jsize;
                                        }
                                        return xlen;
                                    };
                                for (aa = varlist.length - 1; aa > -1; aa -= 1) {
                                    if (varlist[aa] !== undefined) {
                                        lastListLen = varlist[aa].length;
                                        longest     = 0;
                                        longList    = [];
                                        for (cc = 0; cc < lastListLen; cc += 1) {
                                            longTest = joins(varlist[aa][cc]);
                                            if (longTest > longest) {
                                                longest = longTest;
                                            }
                                            longList.push(longTest);
                                        }
                                        strspace = "";
                                        if (longest > jsize) {
                                            strlongest = longest - jsize;
                                        } else if (longest < jsize) {
                                            strlongest = jsize - longest;
                                        }
                                        if (token[varlist[aa][0] - 1] === "var") {
                                            strlongest = strlongest - jsize;
                                        } else if (token[varlist[aa][0] + 1] === "=") {
                                            strlongest += 1;
                                        }
                                        if (longest !== jsize && strlongest > 0) {
                                            do {
                                                strspace   += " ";
                                                strlongest -= 1;
                                            } while (strlongest > -1);
                                        }
                                        for (cc = 0; cc < lastListLen; cc += 1) {
                                            tokenInList = token[varlist[aa][cc]];
                                            if (longList[cc] < longest) {
                                                do {
                                                    tokenInList  += " ";
                                                    longList[cc] += 1;
                                                } while (longList[cc] < longest);
                                            }
                                            token[varlist[aa][cc]] = tokenInList;
                                            if (token[varlist[aa][cc] + 2] !== undefined && token[varlist[aa][cc] + 2].length === jwrap + 2 && token[varlist[aa][cc] + 3] === "+" && token[varlist[aa][cc] + 4] !== undefined && (token[varlist[aa][cc] + 4].charAt(0) === "\"" || token[varlist[aa][cc] + 4].charAt(0) === "'")) {
                                                dd = varlist[aa][cc] + 4;
                                                do {
                                                    token[dd] = strspace + token[dd];
                                                    dd        += 2;
                                                } while (types[dd] === "literal" && types[dd - 1] !== "separator");
                                            }
                                        }
                                    }
                                }
                            }());
                        }
                        if (types[a] === "comment" && token[a].indexOf("/*") === 0) {
                            build.push("<ol class='data'><li class='c0'>");
                        } else {
                            build.push("<ol class='data'><li>");
                        }
                        for (a = 0; a < indent; a += 1) {
                            build.push(tab);
                        }
                        for (a = b - 1; a > -1; a -= 1) {
                            if (typeof meta[a] === "number") {
                                scope -= 1;
                                findvars(a);
                            } else if (meta[a] !== undefined && typeof meta[a] !== "string" && typeof meta[a] !== "number" && a > 0 && token[a] !== "x;" && token[a] !== "x}" && token[a] !== "x{") {
                                token[a] = "<em class='s" + scope + "'>" + token[a] + "</em>";
                                scope    += 1;
                                if (scope > 16) {
                                    scope = 16;
                                }
                            }
                        }
                        (function jspretty__resultScope_globals() {
                            var aa          = 0,
                                bb          = token.length,
                                globalLocal = globals,
                                dd          = globalLocal.length,
                                ee          = 0,
                                word        = [],
                                wordlen     = 0;
                            for (aa = bb - 1; aa > 0; aa -= 1) {
                                if (types[aa] === "word" && (token[aa + 1] !== ":" || (token[aa + 1] === ":" && level[aa + 1] === "x")) && token[aa].indexOf("<em ") < 0) {
                                    word = token[aa].split(" ");
                                    for (ee = dd - 1; ee > -1; ee -= 1) {
                                        if (word[0] === globalLocal[ee] && token[aa - 1] !== ".") {
                                            if (token[aa - 1] === "function" && types[aa + 1] === "method") {
                                                token[aa] = "<em class='s1'>" + word[0] + "</em>";
                                                wordlen   = word.length;
                                                if (wordlen > 1) {
                                                    do {
                                                        token[aa] = token[aa] + " ";
                                                        wordlen   -= 1;
                                                    } while (wordlen > 1);
                                                }
                                            } else {
                                                token[aa] = "<em class='s0'>" + word[0] + "</em>";
                                                wordlen   = word.length;
                                                if (wordlen > 1) {
                                                    do {
                                                        token[aa] = token[aa] + " ";
                                                        wordlen   -= 1;
                                                    } while (wordlen > 1);
                                                }
                                            }
                                            break;
                                        }
                                    }
                                }
                            }
                        }());
                        scope = 0;
                        for (a = 0; a < b; a += 1) {
                            if (typeof meta[a] === "number") {
                                folder();
                            }
                            if (comfold === -1 && types[a] === "comment" && ((token[a].indexOf("/*") === 0 && token[a].indexOf("\n") > 0) || types[a + 1] === "comment" || lines[a] === 2)) {
                                folder();
                                comfold = a;
                            }
                            if (comfold > -1 && types[a] !== "comment") {
                                foldclose();
                                comfold = -1;
                            }
                            if (types[a] === "comment" && token[a].indexOf("/*") === 0) {
                                build.push(blockline(token[a]));
                            } else if (token[a] !== "x;" && token[a] !== "x}" && token[a] !== "x{") {
                                if (typeof meta[a] === "number") {
                                    scope += 1;
                                    if (scope > 16) {
                                        scope = 16;
                                    }
                                    build.push(token[a]);
                                } else if (typeof meta[a] !== "string" && typeof meta[a] !== "number") {
                                    build.push(token[a]);
                                    scope    -= 1;
                                    buildlen = build.length - 1;
                                    do {
                                        buildlen -= 1;
                                    } while (buildlen > 0 && build[buildlen].indexOf("</li><li") < 0);
                                    build[buildlen] = build[buildlen].replace(/class\='l\d+'/, "class='l" + scope + "'");
                                } else if (token[a] !== "x;" && token[a] !== "x{" && token[a] !== "x}") {
                                    if (types[a] === "markup") {
                                        if (level[a] !== "x" && level[a] !== "s") {
                                            if (types[a - 1] === "operator") {
                                                nl(indent);
                                            } else if (token[a - 1] !== "return") {
                                                nl(indent + 1);
                                            }
                                        }
                                        if (typeof markuppretty === "function") {
                                            markupBuild();
                                        } else {
                                            build.push(token[a].replace(/\n(\s*)/g, " "));
                                        }
                                    } else if (types[a] === "comment") {
                                        if (a === 0) {
                                            build[0] = "<ol class='data'><li class='c0'>";
                                        } else {
                                            buildlen = build.length - 1;
                                            if (build[buildlen].indexOf("<li") < 0) {
                                                do {
                                                    build[buildlen] = build[buildlen].replace(/<em\ class\='[a-z]\d+'>/g, "").replace(/<\/em>/g, "");
                                                    buildlen        -= 1;
                                                    if (buildlen > 0 && build[buildlen] === undefined) {
                                                        buildlen -= 1;
                                                    }
                                                } while (buildlen > 0 && build[buildlen - 1] !== undefined && build[buildlen].indexOf("<li") < 0);
                                            }
                                            if ((/^(<em>&#xA;<\/em><\/li><li\ class='l\d+'>)$/).test(build[buildlen - 1]) === true) {
                                                build[buildlen - 1] = build[buildlen - 1].replace(/class\='l\d+'/, "class='c0'");
                                            }
                                            build[buildlen] = build[buildlen].replace(/class\='l\d+'/, "class='c0'");
                                        }
                                        build.push(token[a]);
                                    } else {
                                        if (types[a] === "literal" && token[a].indexOf("\n") > 0) {
                                            multiline(token[a]);
                                        } else {
                                            build.push(token[a]);
                                        }
                                    }
                                }
                            }
                            if (jpres === true && lines[a] > 0 && level[a] !== "x" && level[a] !== "s" && token[a] !== "+") {
                                if (token[a] === "+" || token[a] === "-" || token[a] === "*" || token[a] === "/") {
                                    if (a < b - 1 && types[a + 1] !== "comment" && types[a + 1] !== "comment-inline") {
                                        nl(level[a]);
                                        build.push(tab);
                                        level[a] = "x";
                                    } else {
                                        indent = level[a];
                                        if (lines[a] === 2) {
                                            build.push("\n");
                                        }
                                        nl(indent);
                                        build.push(tab);
                                        build.push(token[a + 1]);
                                        nl(indent);
                                        build.push(tab);
                                        level[a + 1] = "x";
                                        a            += 1;
                                    }
                                } else if (lines[a] === 2 && token[a].charAt(0) !== "=" && token[a].charAt(0) !== "!" && (types[a] !== "start" || (a < b - 1 && types[a + 1] !== "end"))) {
                                    if ((token[a] !== "x}" || isNaN(level[a]) === true) && (a < b - 1 && (types[a + 1] === "comment" || types[a + 1] === "comment-inline" || (token[a] !== "." && types[a + 1] !== "separator")))) {
                                        data.push("<li>");
                                        data.push(linecount);
                                        data.push("</li>");
                                        linecount += 1;
                                        if (types[a] === "comment") {
                                            build.push("<em>&#xA;</em></li><li class='c0'>");
                                        } else {
                                            commentfix += 1;
                                            nl(level[a], true);
                                        }
                                    }
                                }
                            }
                            if ((token[a] === ";" || token[a] === "x;") && token[a + 1] === "x}" && ((/<em\ class='s\d+'>\}<\/em>/).test(token[a + 2]) === true || token[a + 2] === "x}")) {
                                rl(indent);
                            } else if (token[a] === "x{" && level[a] === "s" && level[a - 1] === "s") {
                                build.push("");
                            } else if (a < b - 1 && types[a + 1] === "comment" && jcomment === "noindent") {
                                nl(jlevel);
                            } else if (level[a] === "s" && token[a] !== "x}") {
                                build.push(" ");
                            } else if (token[a] !== "" && level[a] !== "x" && (token[a] !== "x}" || (token[a] === "x}" && (token[a - 1] === "x;" || token[a - 1] === ";") && types[a + 1] !== "word") || lines[a] === 2)) {
                                indent = level[a];
                                nl(indent);
                            }
                            if (folderItem.length > 0) {
                                if (a === folderItem[folderItem.length - 1][1] && comfold === -1) {
                                    foldclose();
                                }
                            }
                        }
                        for (a = build.length - 1; a > -1; a -= 1) {
                            if (build[a] === tab) {
                                build.pop();
                            } else {
                                break;
                            }
                        }
                        last = build[build.length - 1];
                        if (last.indexOf("<li") > 0) {
                            build[build.length - 1] = "<em>&#xA;</em></li>";
                        } else if (last.indexOf("</li>") < 0) {
                            build.push("<em>&#xA;</em></li>");
                        }
                        build.push("</ol></div>");
                        last = build.join("");
                        if (last.match(/<li/g) !== null) {
                            scope = last.match(/<li/g).length;
                            if (linecount - 1 > scope) {
                                linecount -= 1;
                                do {
                                    data.pop();
                                    data.pop();
                                    data.pop();
                                    linecount -= 1;
                                } while (linecount > scope);
                            }
                        }
                        data.push("</ol>");
                        if (jsscope === "html") {
                            data.push(last);
                            return data.join("");
                        }
                        build   = [
                            "<p>Scope analysis does not provide support for undeclared variables.</p>", "<p><em>", scolon, "</em> instances of <strong>missing semicolons</strong> counted.</p>", "<p><em>", news, "</em> unnecessary instances of the keyword <strong>new</strong> counted.</p>", data.join(""), last
                        ];
                        summary = build.join("");
                        data    = [];
                        build   = [];
                        return "";
                    }()).replace(/(\s+)$/, "").replace(/\u0000|\u0001|\u0002|\u0003|\u0004|\u0005|\u0006|\u0007|\u0008|\u000b|\u000c|\u000e|\u000f|\u0010|\u0011|\u0012|\u0013|\u0014|\u0015|\u0016|\u0017|\u0018|\u0019|\u001a|\u001b|\u001c|\u001d|\u001e|\u001f|\u007f|\u0080|\u0081|\u0082|\u0083|\u0084|\u0085|\u0086|\u0087|\u0088|\u0089|\u008a|\u008b|\u008c|\u008d|\u008e|\u008f|\u0090|\u0091|\u0092|\u0093|\u0094|\u0095|\u0096|\u0097|\u0098|\u0099|\u009a|\u009b|\u009c|\u009d|\u009e|\u009f/g, "");
                } else {
                    result = (function jspretty__result() {
                        var a      = 0,
                            b      = token.length,
                            build  = [],
                            indent = jlevel,
                            tab    = (function jspretty__result_tab() {
                                var aa = jchar,
                                    bb = jsize,
                                    cc = [];
                                for (bb = bb; bb > 0; bb -= 1) {
                                    cc.push(aa);
                                }
                                return cc.join("");
                            }()),
                            nl     = function jspretty__result_nl(x) {
                                var dd = 0;
                                build.push("\n");
                                for (dd = 0; dd < x; dd += 1) {
                                    build.push(tab);
                                }
                            },
                            rl     = function jspretty__result_rl(x) {
                                var bb = token.length,
                                    cc = 2,
                                    dd = 0;
                                for (dd = a + 2; dd < bb; dd += 1) {
                                    if (token[dd] === "x}") {
                                        cc += 1;
                                    } else {
                                        break;
                                    }
                                }
                                nl(x - cc);
                                a += 1;
                            };
                        if (jvertical === true) {
                            (function jspretty__result_varSpaces() {
                                var aa          = 0,
                                    varListLen  = 0,
                                    cc          = 0,
                                    dd          = 0,
                                    longest     = 0,
                                    longTest    = 0,
                                    strlongest  = 0,
                                    strspace    = "",
                                    tokenInList = "",
                                    longList    = [],
                                    joins       = function jspretty__result_varSpaces_joins(x) {
                                        var xlen    = token[x].length,
                                            mixTest = false,
                                            perTest = false,
                                            period  = function jspretty__result_varSpaces_joins_periodInit() {
                                                return;
                                            },
                                            ending  = function jspretty__result_varSpaces_joins_endingInit() {
                                                return;
                                            };
                                        period = function jspretty__result_varSpaces_joins_period() {
                                            perTest = true;
                                            xlen    += 1;
                                            do {
                                                x    -= 2;
                                                xlen += token[x].length + 1;
                                            } while (x > 1 && token[x - 1] === ".");
                                            if (token[x] === ")" || token[x] === "]") {
                                                x       += 1;
                                                xlen    -= 2;
                                                mixTest = true;
                                                ending();
                                            }
                                        };
                                        ending = function jspretty__result_varSpaces_joins_ending() {
                                            var yy = 0;
                                            for (x -= 1; x > -1; x -= 1) {
                                                xlen += token[x].length;
                                                if (types[x] === "start" || types[x] === "method") {
                                                    yy += 1;
                                                    if (yy === 1) {
                                                        if (mixTest === true) {
                                                            return;
                                                        }
                                                        break;
                                                    }
                                                }
                                                if (types[x] === "end") {
                                                    yy -= 1;
                                                }
                                                if (types[x] === "operator" || types[x] === "separator") {
                                                    if (level[x] === "s") {
                                                        xlen += 1;
                                                    }
                                                    if (level[x - 1] === "s") {
                                                        xlen += 1;
                                                    }
                                                }
                                                if (token[x] === ";" || token[x] === "x;" || token[x] === "}" || token[x] === "x}") {
                                                    return;
                                                }
                                            }
                                            if (types[x - 1] === "word" || types[x - 1] === "literal") {
                                                x    -= 1;
                                                xlen += token[x].length;
                                            }
                                            if (types[x] === "word" && token[x - 1] === ".") {
                                                period();
                                            }
                                            if (token[x] === "{") {
                                                return;
                                            }
                                            if (token[x - 1] === ")" || token[x - 1] === "]") {
                                                xlen -= 1;
                                                ending();
                                            }
                                        };
                                        if (types[x] === "word" && token[x - 1] === ".") {
                                            period();
                                        } else if (token[x] === ")" || token[x] === "]") {
                                            ending();
                                            if (perTest === false) {
                                                xlen += 1;
                                            }
                                        } else {
                                            xlen += 1;
                                        }
                                        if (token[x - 1] === "," && token[varlist[aa][0] - 1] !== "[" && token[varlist[aa][cc] + 1] !== ":" && token[varlist[aa][0] - 1] !== "var" && token[varlist[aa][0] - 1] !== "let" && token[varlist[aa][0] - 1] !== "const") {
                                            xlen += jsize;
                                        }
                                        return xlen;
                                    };
                                for (aa = varlist.length - 1; aa > -1; aa -= 1) {
                                    if (varlist[aa] !== undefined) {
                                        varListLen = varlist[aa].length;
                                        longest    = 0;
                                        longList   = [];
                                        for (cc = 0; cc < varListLen; cc += 1) {
                                            longTest = joins(varlist[aa][cc]);
                                            if (longTest > longest) {
                                                longest = longTest;
                                            }
                                            longList.push(longTest);
                                        }
                                        strspace = "";
                                        if (longest > jsize) {
                                            strlongest = longest - jsize;
                                        } else if (longest < jsize) {
                                            strlongest = jsize - longest;
                                        }
                                        if (token[varlist[aa][0] - 1] === "var") {
                                            strlongest = strlongest - jsize;
                                        } else if (token[varlist[aa][0] + 1] === "=") {
                                            strlongest += 1;
                                        }
                                        if (longest !== jsize && strlongest > 0) {
                                            do {
                                                strspace   += " ";
                                                strlongest -= 1;
                                            } while (strlongest > -1);
                                        }
                                        for (cc = 0; cc < varListLen; cc += 1) {
                                            tokenInList = token[varlist[aa][cc]];
                                            if (longList[cc] < longest) {
                                                do {
                                                    tokenInList  += " ";
                                                    longList[cc] += 1;
                                                } while (longList[cc] < longest);
                                            }
                                            token[varlist[aa][cc]] = tokenInList;
                                            if (token[varlist[aa][cc] + 2] !== undefined && token[varlist[aa][cc] + 2].length === jwrap + 2 && token[varlist[aa][cc] + 3] === "+" && token[varlist[aa][cc] + 4] !== undefined && (token[varlist[aa][cc] + 4].charAt(0) === "\"" || token[varlist[aa][cc] + 4].charAt(0) === "'")) {
                                                dd = varlist[aa][cc] + 4;
                                                do {
                                                    token[dd] = strspace + token[dd];
                                                    dd        += 2;
                                                } while (types[dd] === "literal" && types[dd - 1] !== "separator");
                                            }
                                        }
                                    }
                                }
                            }());
                        }
                        for (a = 0; a < indent; a += 1) {
                            build.push(tab);
                        }
                        for (a = 0; a < b; a += 1) {
                            if (types[a] === "comment" || (token[a] !== "x;" && token[a] !== "x{" && token[a] !== "x}")) {
                                if (types[a] === "markup") {
                                    if (level[a] !== "x" && level[a] !== "s") {
                                        if (types[a - 1] === "operator") {
                                            nl(indent);
                                        } else if (token[a - 1] !== "return") {
                                            nl(indent + 1);
                                        }
                                    }
                                    if (typeof markuppretty === "function") {
                                        build.push(markuppretty({
                                            inchar : jchar,
                                            inlevel: indent + 1,
                                            insize : jsize,
                                            jsscope: args.jsscope,
                                            jsx    : true,
                                            mode   : "beautify",
                                            source : token[a]
                                        }));
                                    } else {
                                        build.push(token[a].replace(/\n(\s*)/g, " "));
                                    }
                                } else {
                                    build.push(token[a]);
                                }
                                if (token[a].indexOf("//") === 0 && types[a + 1] === "operator") {
                                    nl(indent);
                                    build.push(tab);
                                }
                            }
                            if (jpres === true && lines[a] > 0 && level[a] !== "x" && level[a] !== "s" && token[a] !== "+") {
                                if (token[a] === "+" || token[a] === "-" || token[a] === "*" || token[a] === "/") {
                                    if (a < b - 1 && types[a + 1] !== "comment" && types[a + 1] !== "comment-inline") {
                                        nl(level[a]);
                                        build.push(tab);
                                        level[a] = "x";
                                    } else {
                                        indent = level[a];
                                        if (lines[a] === 2) {
                                            build.push("\n");
                                        }
                                        nl(indent);
                                        build.push(tab);
                                        build.push(token[a + 1]);
                                        nl(indent);
                                        build.push(tab);
                                        level[a + 1] = "x";
                                        a            += 1;
                                    }
                                } else if (lines[a] === 2 && token[a].charAt(0) !== "=" && token[a].charAt(0) !== "!" && (types[a] !== "start" || (a < b - 1 && types[a + 1] !== "end"))) {
                                    if (a < b - 1 && (types[a + 1] === "comment" || types[a + 1] === "comment-inline" || (token[a] !== "." && types[a + 1] !== "separator"))) {
                                        if (token[a] !== "x}" || isNaN(level[a]) === true || level[a] === "x") {
                                            build.push("\n");
                                        }
                                    }
                                }
                            }
                            if ((token[a] === ";" || token[a] === "x;") && token[a + 1] === "x}" && (token[a + 2] === "}" || token[a + 2] === "x}")) {
                                rl(indent);
                            } else if (token[a] === "x{" && level[a] === "s" && level[a - 1] === "s") {
                                build.push("");
                            } else if (a < b - 1 && types[a + 1] === "comment" && jcomment === "noindent") {
                                nl(jlevel);
                            } else if (level[a] === "s" && token[a] !== "x}") {
                                build.push(" ");
                            } else if (token[a] !== "" && level[a] !== "x" && (token[a] !== "x}" || (token[a] === "x}" && (token[a - 1] === "x;" || token[a - 1] === ";") && types[a + 1] !== "word") || lines[a] === 2)) {
                                indent = level[a];
                                nl(indent);
                            }
                        }
                        for (a = build.length - 1; a > -1; a -= 1) {
                            if (build[a] === tab) {
                                build.pop();
                            } else {
                                break;
                            }
                        }
                        if (jpres === true && lines[lines.length - 1] > 0) {
                            return build.join("").replace(/(\s+)$/, "\n");
                        }
                        return build.join("").replace(/(\s+)$/, "");
                    }());
                }
                if (summary !== "diff" && jsscope !== "report") {
                    stats.space.space -= 1;
                    //the analysis report is generated in this function
                    (function jspretty__report() {
                        var originalSize = jsource.length - 1,
                            noOfLines    = result.split("\n").length,
                            newlines     = stats.space.newline,
                            percent      = 0,
                            total        = {
                                chars  : 0,
                                comment: {
                                    chars: stats.commentBlock.chars + stats.commentLine.chars,
                                    token: stats.commentBlock.token + stats.commentLine.token
                                },
                                literal: {
                                    chars: stats.number.chars + stats.regex.chars + stats.string.chars,
                                    token: stats.number.token + stats.regex.token + stats.string.token
                                },
                                space  : stats.space.newline + stats.space.other + stats.space.space + stats.space.tab,
                                syntax : {
                                    chars: 0,
                                    token: stats.string.quote + stats.comma + stats.semicolon + stats.container
                                },
                                token  : 0
                            },
                            output       = [],
                            zero         = function jspretty__report_zero(x, y) {
                                var ratio = 0;
                                if (y === 0) {
                                    return "0.00%";
                                }
                                ratio = ((x / y) * 100);
                                return ratio.toFixed(2) + "%";
                            };
                        total.syntax.chars = total.syntax.token + stats.operator.chars;
                        total.syntax.token += stats.operator.token;
                        total.token        = stats.server.token + stats.word.token + total.comment.token + total.literal.token + total.space + total.syntax.token;
                        total.chars        = stats.server.chars + stats.word.chars + total.comment.chars + total.literal.chars + total.space + total.syntax.chars;
                        if (newlines === 0) {
                            newlines = 1;
                        }
                        output.push("<div class='doc'>");
                        if (error.length > 0) {
                            output.push("<p id='jserror'><strong>Error: ");
                            output.push(error[0].replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\u0000|\u0001|\u0002|\u0003|\u0004|\u0005|\u0006|\u0007|\u0008|\u000b|\u000c|\u000e|\u000f|\u0010|\u0011|\u0012|\u0013|\u0014|\u0015|\u0016|\u0017|\u0018|\u0019|\u001a|\u001b|\u001c|\u001d|\u001e|\u001f|\u007f|\u0080|\u0081|\u0082|\u0083|\u0084|\u0085|\u0086|\u0087|\u0088|\u0089|\u008a|\u008b|\u008c|\u008d|\u008e|\u008f|\u0090|\u0091|\u0092|\u0093|\u0094|\u0095|\u0096|\u0097|\u0098|\u0099|\u009a|\u009b|\u009c|\u009d|\u009e|\u009f/g, ""));
                            output.push("</strong> <code><span>");
                            error[1] = error[1].replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\u0000|\u0001|\u0002|\u0003|\u0004|\u0005|\u0006|\u0007|\u0008|\u000b|\u000c|\u000e|\u000f|\u0010|\u0011|\u0012|\u0013|\u0014|\u0015|\u0016|\u0017|\u0018|\u0019|\u001a|\u001b|\u001c|\u001d|\u001e|\u001f|\u007f|\u0080|\u0081|\u0082|\u0083|\u0084|\u0085|\u0086|\u0087|\u0088|\u0089|\u008a|\u008b|\u008c|\u008d|\u008e|\u008f|\u0090|\u0091|\u0092|\u0093|\u0094|\u0095|\u0096|\u0097|\u0098|\u0099|\u009a|\u009b|\u009c|\u009d|\u009e|\u009f/g, "").replace(/^(\s+)/, "");
                            if (error.indexOf("\n") > 0) {
                                output.push(error[1].replace("\n", "</span>"));
                            } else {
                                output.push(error[1]);
                                output.push("</span>");
                            }
                            output.push("</code></p>");
                        }
                        output.push("<p><em>");
                        output.push(scolon);
                        output.push("</em> instance");
                        if (scolon !== 1) {
                            output.push("s");
                        }
                        output.push(" of <strong>missing semicolons</strong> counted.</p>");
                        output.push("<p><em>");
                        output.push(news);
                        output.push("</em> unnessary instance");
                        if (news !== 1) {
                            output.push("s");
                        }
                        output.push(" of the keyword <strong>new</strong> counted.</p>");
                        output.push("<table class='analysis' summary='JavaScript character size comparison'><caption>" +
                                "JavaScript data report</caption><thead><tr><th>Data Label</th><th>Input</th><th>" +
                                "Output</th><th>Literal Increase</th><th>Percentage Increase</th></tr>");
                        output.push("</thead><tbody><tr><th>Total Character Size</th><td>");
                        output.push(originalSize);
                        output.push("</td><td>");
                        output.push(result.length);
                        output.push("</td><td>");
                        output.push(result.length - originalSize);
                        output.push("</td><td>");
                        percent = (((result.length - originalSize) / originalSize) * 100);
                        output.push(percent.toFixed(2));
                        output.push("%</td></tr><tr><th>Total Lines of Code</th><td>");
                        output.push(newlines);
                        output.push("</td><td>");
                        output.push(noOfLines);
                        output.push("</td><td>");
                        output.push(noOfLines - newlines);
                        output.push("</td><td>");
                        percent = (((noOfLines - newlines) / newlines) * 100);
                        output.push(percent.toFixed(2));
                        output.push("%</td></tr></tbody></table>");
                        output.push("<table class='analysis' summary='JavaScript component analysis'><caption>JavaScr" +
                                "ipt component analysis</caption><thead><tr><th>JavaScript Component</th><th>Comp" +
                                "onent Quantity</th><th>Percentage Quantity from Section</th>");
                        output.push("<th>Percentage Qauntity from Total</th><th>Character Length</th><th>Percentage L" +
                                "ength from Section</th><th>Percentage Length from Total</th></tr></thead><tbody>");
                        output.push("<tr><th>Total Accounted</th><td>");
                        output.push(total.token);
                        output.push("</td><td>100.00%</td><td>100.00%</td><td>");
                        output.push(total.chars);
                        output.push("</td><td>100.00%</td><td>100.00%</td></tr><tr><th colspan='7'>Comments</th></tr>" +
                                "<tr><th>Block Comments</th><td>");
                        output.push(stats.commentBlock.token);
                        output.push("</td><td>");
                        output.push(zero(stats.commentBlock.token, total.comment.token));
                        output.push("</td><td>");
                        output.push(zero(stats.commentBlock.token, total.token));
                        output.push("</td><td>");
                        output.push(stats.commentBlock.chars);
                        output.push("</td><td>");
                        output.push(zero(stats.commentBlock.chars, total.comment.chars));
                        output.push("</td><td>");
                        output.push(zero(stats.commentBlock.chars, total.chars));
                        output.push("</td></tr><tr><th>Inline Comments</th><td>");
                        output.push(stats.commentLine.token);
                        output.push("</td><td>");
                        output.push(zero(stats.commentLine.token, total.comment.token));
                        output.push("</td><td>");
                        output.push(zero(stats.commentLine.token, total.token));
                        output.push("</td><td>");
                        output.push(stats.commentLine.chars);
                        output.push("</td><td>");
                        output.push(zero(stats.commentLine.chars, total.comment.chars));
                        output.push("</td><td>");
                        output.push(zero(stats.commentLine.chars, total.chars));
                        output.push("</td></tr><tr><th>Comment Total</th><td>");
                        output.push(total.comment.token);
                        output.push("</td><td>100.00%</td><td>");
                        output.push(zero(total.comment.token, total.token));
                        output.push("</td><td>");
                        output.push(total.comment.chars);
                        output.push("</td><td>100.00%</td><td>");
                        output.push(zero(total.comment.chars, total.chars));
                        output.push("</td></tr><tr><th colspan='7'>Whitespace Outside of Strings and Comments</th></t" +
                                "r><tr><th>New Lines</th><td>");
                        output.push(stats.space.newline);
                        output.push("</td><td>");
                        output.push(zero(stats.space.newline, total.space));
                        output.push("</td><td>");
                        output.push(zero(stats.space.newline, total.token));
                        output.push("</td><td>");
                        output.push(stats.space.newline);
                        output.push("</td><td>");
                        output.push(zero(stats.space.newline, total.space));
                        output.push("</td><td>");
                        output.push(zero(stats.space.newline, total.chars));
                        output.push("</td></tr><tr><th>Spaces</th><td>");
                        output.push(stats.space.space);
                        output.push("</td><td>");
                        output.push(zero(stats.space.space, total.space));
                        output.push("</td><td>");
                        output.push(zero(stats.space.space, total.token));
                        output.push("</td><td>");
                        output.push(stats.space.space);
                        output.push("</td><td>");
                        output.push(zero(stats.space.space, total.space));
                        output.push("</td><td>");
                        output.push(zero(stats.space.space, total.chars));
                        output.push("</td></tr><tr><th>Tabs</th><td>");
                        output.push(stats.space.tab);
                        output.push("</td><td>");
                        output.push(zero(stats.space.tab, total.space));
                        output.push("</td><td>");
                        output.push(zero(stats.space.tab, total.token));
                        output.push("</td><td>");
                        output.push(stats.space.tab);
                        output.push("</td><td>");
                        output.push(zero(stats.space.tab, total.space));
                        output.push("</td><td>");
                        output.push(zero(stats.space.tab, total.chars));
                        output.push("</td></tr><tr><th>Other Whitespace</th><td>");
                        output.push(stats.space.other);
                        output.push("</td><td>");
                        output.push(zero(stats.space.other, total.space));
                        output.push("</td><td>");
                        output.push(zero(stats.space.other, total.token));
                        output.push("</td><td>");
                        output.push(stats.space.other);
                        output.push("</td><td>");
                        output.push(zero(stats.space.other, total.space));
                        output.push("</td><td>");
                        output.push(zero(stats.space.other, total.chars));
                        output.push("</td></tr><tr><th>Total Whitespace</th><td>");
                        output.push(total.space);
                        output.push("</td><td>100.00%</td><td>");
                        output.push(zero(total.space, total.token));
                        output.push("</td><td>");
                        output.push(total.space);
                        output.push("</td><td>100.00%</td><td>");
                        output.push(zero(total.space, total.chars));
                        output.push("</td></tr><tr><th colspan='7'>Literals</th></tr><tr><th>Strings</th><td>");
                        output.push(stats.string.token);
                        output.push("</td><td>");
                        output.push(zero(stats.string.token, total.literal.token));
                        output.push("</td><td>");
                        output.push(zero(stats.string.token, total.token));
                        output.push("</td><td>");
                        output.push(stats.string.chars);
                        output.push("</td><td>");
                        output.push(zero(stats.string.chars, total.literal.chars));
                        output.push("</td><td>");
                        output.push(zero(stats.string.chars, total.chars));
                        output.push("</td></tr><tr><th>Numbers</th><td>");
                        output.push(stats.number.token);
                        output.push("</td><td>");
                        output.push(zero(stats.number.token, total.literal.token));
                        output.push("</td><td>");
                        output.push(zero(stats.number.token, total.token));
                        output.push("</td><td>");
                        output.push(stats.number.chars);
                        output.push("</td><td>");
                        output.push(zero(stats.number.chars, total.literal.chars));
                        output.push("</td><td>");
                        output.push(zero(stats.number.chars, total.chars));
                        output.push("</td></tr><tr><th>Regular Expressions</th><td>");
                        output.push(stats.regex.token);
                        output.push("</td><td>");
                        output.push(zero(stats.regex.token, total.literal.token));
                        output.push("</td><td>");
                        output.push(zero(stats.regex.token, total.token));
                        output.push("</td><td>");
                        output.push(stats.regex.chars);
                        output.push("</td><td>");
                        output.push(zero(stats.regex.chars, total.literal.chars));
                        output.push("</td><td>");
                        output.push(zero(stats.regex.chars, total.chars));
                        output.push("</td></tr><tr><th>Total Literals</th><td>");
                        output.push(total.literal.token);
                        output.push("</td><td>100.00%</td><td>");
                        output.push(zero(total.literal.token, total.token));
                        output.push("</td><td>");
                        output.push(total.literal.chars);
                        output.push("</td><td>100.00%</td><td>");
                        output.push(zero(total.literal.chars, total.chars));
                        output.push("</td></tr><tr><th colspan='7'>Syntax Characters</th></tr><tr><th>Quote Character" +
                                "s</th><td>");
                        output.push(stats.string.quote);
                        output.push("</td><td>");
                        output.push(zero(stats.string.quote, total.syntax.token));
                        output.push("</td><td>");
                        output.push(zero(stats.string.quote, total.token));
                        output.push("</td><td>");
                        output.push(stats.string.quote);
                        output.push("</td><td>");
                        output.push(zero(stats.string.quote, total.syntax.chars));
                        output.push("</td><td>");
                        output.push(zero(stats.string.quote, total.chars));
                        output.push("</td></tr><tr><th>Commas</th><td>");
                        output.push(stats.comma);
                        output.push("</td><td>");
                        output.push(zero(stats.comma, total.syntax.token));
                        output.push("</td><td>");
                        output.push(zero(stats.comma, total.token));
                        output.push("</td><td>");
                        output.push(stats.comma);
                        output.push("</td><td>");
                        output.push(zero(stats.comma, total.syntax.chars));
                        output.push("</td><td>");
                        output.push(zero(stats.comma, total.chars));
                        output.push("</td></tr><tr><th>Containment Characters</th><td>");
                        output.push(stats.container);
                        output.push("</td><td>");
                        output.push(zero(stats.container, total.syntax.token));
                        output.push("</td><td>");
                        output.push(zero(stats.container, total.token));
                        output.push("</td><td>");
                        output.push(stats.container);
                        output.push("</td><td>");
                        output.push(zero(stats.container, total.syntax.chars));
                        output.push("</td><td>");
                        output.push(zero(stats.container, total.chars));
                        output.push("</td></tr><tr><th>Semicolons</th><td>");
                        output.push(stats.semicolon);
                        output.push("</td><td>");
                        output.push(zero(stats.semicolon, total.syntax.token));
                        output.push("</td><td>");
                        output.push(zero(stats.semicolon, total.token));
                        output.push("</td><td>");
                        output.push(stats.semicolon);
                        output.push("</td><td>");
                        output.push(zero(stats.semicolon, total.syntax.chars));
                        output.push("</td><td>");
                        output.push(zero(stats.semicolon, total.chars));
                        output.push("</td></tr><tr><th>Operators</th><td>");
                        output.push(stats.operator.token);
                        output.push("</td><td>");
                        output.push(zero(stats.operator.token, total.syntax.token));
                        output.push("</td><td>");
                        output.push(zero(stats.operator.token, total.token));
                        output.push("</td><td>");
                        output.push(stats.operator.chars);
                        output.push("</td><td>");
                        output.push(zero(stats.operator.chars, total.syntax.chars));
                        output.push("</td><td>");
                        output.push(zero(stats.operator.chars, total.chars));
                        output.push("</td></tr><tr><th>Total Syntax Characters</th><td>");
                        output.push(total.syntax.token);
                        output.push("</td><td>100.00%</td><td>");
                        output.push(zero(total.syntax.token, total.token));
                        output.push("</td><td>");
                        output.push(total.syntax.chars);
                        output.push("</td><td>100.00%</td><td>");
                        output.push(zero(total.syntax.chars, total.chars));
                        output.push("</td></tr>");
                        output.push("<tr><th colspan='7'>Keywords and Variables</th></tr><tr><th>Words</th><td>");
                        output.push(stats.word.token);
                        output.push("</td><td>100.00%</td><td>");
                        output.push(zero(stats.word.token, total.token));
                        output.push("</td><td>");
                        output.push(stats.word.chars);
                        output.push("</td><td>100.00%</td><td>");
                        output.push(zero(stats.word.chars, total.chars));
                        output.push("</td></tr>");
                        output.push("<tr><th colspan='7'>Server-side Tags</th></tr><tr><th>Server Tags</th><td>");
                        output.push(stats.server.token);
                        output.push("</td><td>100.00%</td><td>");
                        output.push(zero(stats.server.token, total.token));
                        output.push("</td><td>");
                        output.push(stats.server.chars);
                        output.push("</td><td>100.00%</td><td>");
                        output.push(zero(stats.server.chars, total.chars));
                        output.push("</td></tr></tbody></table></div>");
                        summary = output.join("");
                    }());
                }
            }
            return result;
        };

        //Library to parse XML/HTML/markup
        markuppretty = function markuppretty(args) {
            var maccessibility  = (args.accessibility === true || args.accessibility === "true"),
                mbraceline      = (args.braceline === true || args.braceline === "true"),
                mbracepadding   = (args.bracepadding === true || args.bracepadding === "true"),
                mbraces         = (args.braces === "allman")
                    ? "allman"
                    : "knr",
                mchar           = (typeof args.inchar === "string" && args.inchar.length > 0)
                    ? args.inchar
                    : " ",
                mcomm           = (typeof args.comments === "string" && args.comments === "noindent")
                    ? "noindent"
                    : ((args.comments === "nocomment")
                        ? "nocomment"
                        : "indent"),
                mconditional    = (args.html === true || args.conditional === true || args.conditional === "true"),
                mcont           = (args.content === "true" || args.content === true),
                mcorrect        = (args.correct === true || args.correct === "true"),
                mcssinsertlines = (args.cssinsertlines === true || args.cssinsertlines === "true"),
                mforce          = (args.force_indent === "true" || args.force_indent === true),
                mhtml           = (args.html === "true" || args.html === true),
                minlevel        = (isNaN(args.inlevel) === true)
                    ? 0
                    : Number(args.inlevel),
                mjsx            = (args.jsx === true || args.jsx === "true"),
                mmode           = (args.mode === "parse" || args.mode === "diff" || args.mode === "minify")
                    ? args.mode
                    : "beautify",
                mobfuscate      = (args.obfuscate === true || args.obfuscate === "true"),
                mobjsort        = (args.objsort === "true" || args.objsort === true),
                mpreserve       = (args.preserve !== false && args.preserve !== "false"),
                mquoteConvert   = (args.quoteConvert === "single" || args.quoteConvert === "double")
                    ? args.quoteConvert
                    : "none",
                msize           = (isNaN(args.insize) === true)
                    ? 4
                    : Number(args.insize),
                msource         = (typeof args.source === "string" && args.source.length > 0)
                    ? args.source
                    : "Error: no source code supplied to markuppretty!",
                mspace          = (args.space !== false && args.space !== "false"),
                mstyle          = (typeof args.style === "string" && args.style === "noindent")
                    ? "noindent"
                    : "indent",
                mstyleguide     = (typeof args.styleguide === "string")
                    ? args.styleguide
                    : "none",
                mtagmerge       = (args.tagmerge === true || args.tagmerge === "true"),
                mtopcomments    = (args.top_comments === true || args.top_comments === "true"),
                mwrap           = (isNaN(args.wrap) === true || mjsx === true)
                    ? 0
                    : Number(args.wrap),
                mvarword        = (args.varword === "each" || args.varword === "list")
                    ? args.varword
                    : "none",
                mvertical       = (args.vertical === "jsonly")
                    ? "jsonly"
                    : (args.vertical === true || args.vertical === "true"),
                stats           = {
                    cdata      : [
                        0, 0
                    ],
                    comment    : [
                        0, 0
                    ],
                    conditional: [
                        0, 0
                    ],
                    content    : [
                        0, 0
                    ],
                    end        : [
                        0, 0
                    ],
                    ignore     : [
                        0, 0
                    ],
                    script     : [
                        0, 0
                    ],
                    sgml       : [
                        0, 0
                    ],
                    singleton  : [
                        0, 0
                    ],
                    space      : 0,
                    start      : [
                        0, 0
                    ],
                    style      : [
                        0, 0
                    ],
                    template   : [
                        0, 0
                    ],
                    text       : [
                        0, 0
                    ],
                    xml        : [
                        0, 0
                    ]
                },
                //parallel arrays
                //* attrs is a list of arrays, each of which contains (if any) parsed attributes
                //* jscom stores true/false if the current token is a JS comment from JSX format
                //* level describes the indentation of a given token
                //    level is only used in beautify and diff modes
                //* linen stores the input line number on which the token occurs
                //* lines describes the preceeding space using: 2, 1, or 0
                //    lines is populated in markuppretty__tokenize_spacer
                //* token stores parsed tokens
                //* types segments tokens into named groups
                attrs           = [],
                jscom           = [],
                level           = [],
                linen           = [],
                lines           = [],
                token           = [],
                types           = [],
                reqs            = [],
                ids             = [],
                parseError      = [],
                line            = 1,
                //What is the lowercase tag name of the provided token?
                tagName         = function markuppretty__tagName(el) {
                    var space = el.replace(/\s+/, " ").indexOf(" "),
                        name  = (space < 0)
                            ? el.slice(1, el.length - 1)
                            : el.slice(1, space).toLowerCase();
                    return name;
                },
                attrName        = function markuppretty__attrName(atty) {
                    var index = atty.indexOf("="),
                        name  = "",
                        value = "";
                    if (index < 0) {
                        return [
                            atty, ""
                        ];
                    }
                    name  = atty.slice(0, index);
                    value = atty.slice(index + 1);
                    if ((value.charAt(0) === "\"" && value.charAt(value.length - 1) === "\"") || (value.charAt(0) === "'" && value.charAt(value.length - 1) === "'")) {
                        value = value.slice(1, value.length - 1);
                    }
                    if (mhtml === true) {
                        return [
                            name.toLowerCase(), value.toLowerCase()
                        ];
                    }
                    return [
                        name, value
                    ];
                };
            //type definitions:
            //start      end     type
            //<[CDATA[   ]]>     cdata
            //<!--       -->     comment
            //<%--       --%>    comment
            //<!--[if    -->     conditional
            //text       text    content
            //</         >       end
            //<pre       </pre>  ignore (html only)
            //text       text    script
            //<!         >       sgml
            //<          />      singleton
            //<          >       start
            //text       text    style
            //<!--#      -->     template
            //<%         %>      template
            //{{{        }}}     template
            //{{         }}      template
            //{%         %}      template
            //[%         %]      template
            //{@         @}      template
            //{#         #}      template
            //<?         ?>      template
            //{{/        }}      template_end
            //<%\s*}     %>      template_end
            //[%\s*}     %]      template_end
            //{@\s*}     @}      template_end
            //{{#        }}      template_start
            //<%         {\s*%>  template_start
            //[%         {\s*%]  template_start
            //{@         {\s*@}  template_start
            //<?xml      ?>      xml
            if (mmode === "diff") {
                mwrap = 0;
            } else {
                mcont = false;
            }
            (function markuppretty__tokenize() {
                var a        = 0,
                    b        = msource.split(""),
                    c        = b.length,
                    minspace = "",
                    space    = "",
                    list     = 0,
                    litag    = 0,
                    ext      = false,
                    //determine if spaces between nodes are absent, multiline, or merely there
                    //2 - multiline
                    //1 - space present
                    //0 - no space present
                    spacer   = function markuppretty__tokenize_spacer() {
                        if (space.length > 0) {
                            stats.space += space.length;
                            if (mpreserve === true && space.split("\n").length > 2) {
                                lines.push(2);
                            } else {
                                lines.push(1);
                            }
                        } else {
                            lines.push(0);
                        }
                        minspace = space;
                        space    = "";
                    },
                    //parses tags, attributes, and template elements
                    tag      = function markuppretty__tokenize_tag(end) {
                        var output    = [],
                            bcount    = 0,
                            e         = 0,
                            f         = 0,
                            igcount   = 0,
                            quote     = "",
                            element   = "",
                            lastchar  = "",
                            name      = "",
                            jsxquote  = "",
                            cheat     = false,
                            endtag    = false,
                            nopush    = false,
                            simple    = false,
                            preserve  = false,
                            stest     = false,
                            liend     = false,
                            ignoreme  = false,
                            quotetest = false,
                            parseFail = false,
                            singleton = false,
                            attribute = [];
                        spacer();
                        jscom.push(false);
                        attrs.push([]);
                        linen.push(line);
                        ext = false;
                        //this complex series of conditions determines an elements delimiters
                        //look to the types being pushed to quickly reason about the logic
                        //no type is pushed for start tags or singleton tags just yet some types set the
                        //`preserve` flag, which means to preserve internal white
                        //space
                        //The `nopush` flag is set when parsed tags are to be ignored and forgotten
                        if (b[a] === "<") {
                            if (b[a + 1] === "!") {
                                if (b[a + 2] === "-" && b[a + 3] === "-") {
                                    if (b[a + 4] === "#") {
                                        end = "-->";
                                        types.push("template");
                                    } else if (b[a + 4] === "[" && b[a + 5] === "i" && b[a + 6] === "f" && mconditional === true) {
                                        end = "-->";
                                        types.push("conditional");
                                    } else {
                                        end = "-->";
                                        if (mmode === "minify" || mcomm === "nocomment") {
                                            nopush = true;
                                        } else {
                                            preserve = true;
                                            types.push("comment");
                                        }
                                    }
                                } else if (b[a + 2] === "[" && b[a + 3] === "C" && b[a + 4] === "D" && b[a + 5] === "A" && b[a + 6] === "T" && b[a + 7] === "A" && b[a + 8] === "[") {
                                    end      = "]]>";
                                    preserve = true;
                                    types.push("cdata");
                                } else {
                                    end = ">";
                                    types.push("sgml");
                                }
                            } else if (b[a + 1] === "?") {
                                end = "?>";
                                if (b[a + 2] === "x" && b[a + 3] === "m" && b[a + 4] === "l") {
                                    types.push("xml");
                                } else {
                                    preserve = true;
                                    types.push("template");
                                }
                            } else if (b[a + 1] === "%") {
                                preserve = true;
                                if (b[a + 2] === "-" && b[a + 3] === "-") {
                                    end = "--%>";
                                    types.push("comment");
                                } else {
                                    end = "%>";
                                    types.push("template");
                                }
                            } else if (b[a + 4] !== undefined && b[a + 1].toLowerCase() === "p" && b[a + 2].toLowerCase() === "r" && b[a + 3].toLowerCase() === "e" && (b[a + 4] === ">" || (/\s/).test(b[a + 4]) === true)) {
                                end      = "</pre>";
                                preserve = true;
                                types.push("ignore");
                            } else if (b[a + 1] === "<") {
                                if (b[a + 2] === "<") {
                                    end = ">>>";
                                } else {
                                    end = ">>";
                                }
                                types.push("template");
                            } else {
                                if (b[a + 1] === "/") {
                                    types.push("end");
                                } else {
                                    simple = true;
                                }
                                end = ">";
                            }
                        } else if (b[a] === "{") {
                            preserve = true;
                            if (b[a + 1] === "{") {
                                if (b[a + 2] === "{") {
                                    end = "}}}";
                                    types.push("template");
                                } else if (b[a + 2] === "#") {
                                    end = "}}";
                                    types.push("template_start");
                                } else if (b[a + 2] === "/") {
                                    end = "}}";
                                    types.push("template_end");
                                } else {
                                    end = "}}";
                                    types.push("template");
                                }
                            } else {
                                end = b[a + 1] + "}";
                                types.push("template");
                            }
                        } else if (b[a] === "[" && b[a + 1] === "%") {
                            end = "%]";
                            types.push("template");
                        }
                        //This loop is the logic that parses tags and attributes
                        //If the attribute data-prettydiff-ignore is present the `ignore` flag is set
                        //The ignore flag is identical to the preserve flag
                        lastchar = end.charAt(end.length - 1);
                        for (a = a; a < c; a += 1) {
                            if (b[a] === "\n") {
                                line += 1;
                            }
                            output.push(b[a]);
                            if (quote === "") {
                                if (b[a] === "<" && preserve === false && output.length > 1 && end !== ">>" && end !== ">>>" && simple === true) {
                                    parseError.push("Parse error on line " + line + " on element: ");
                                    parseFail = true;
                                }
                                if (stest === true && (/\s/).test(b[a]) === false && b[a] !== lastchar) {
                                    //attribute start
                                    stest = false;
                                    quote = jsxquote;
                                    output.pop();
                                    for (a = a; a < c; a += 1) {
                                        if (b[a] === "\n") {
                                            line += 1;
                                        }
                                        attribute.push(b[a]);
                                        if (quote === "") {
                                            if (b[a + 1] === lastchar) {
                                                //if at end of tag
                                                element = attribute.join("").replace(/\s+/g, " ");
                                                name    = attrName(element)[0];
                                                if (name === "data-prettydiff-ignore") {
                                                    ignoreme = true;
                                                } else if (name === "id") {
                                                    ids.push(element.slice(name.length + 1, element.length));
                                                }
                                                if (element !== " ") {
                                                    attrs[attrs.length - 1].push(element);
                                                }
                                                attribute = [];
                                                break;
                                            }
                                            if ((/\s/).test(b[a]) === true) {
                                                //testing for a run of spaces between an attribute's =
                                                //and a quoted value. Unquoted values separated by space
                                                //are separate attributes
                                                if (attribute[attribute.length - 2] === "=") {
                                                    for (e = a + 1; e < c; e += 1) {
                                                        if ((/\s/).test(b[e]) === false) {
                                                            if (b[e] === "\"" || b[e] === "'") {
                                                                a         = e - 1;
                                                                quotetest = true;
                                                                attribute.pop();
                                                            }
                                                            break;
                                                        }
                                                    }
                                                }
                                                if (quotetest === true) {
                                                    quotetest = false;
                                                } else {
                                                    //if there is an unquoted space attribute is complete
                                                    attribute.pop();
                                                    element = attribute.join("").replace(/\s+/g, " ");
                                                    name    = attrName(element)[0];
                                                    if (name === "data-prettydiff-ignore") {
                                                        ignoreme = true;
                                                    } else if (name === "id") {
                                                        ids.push(element.slice(name.length + 1, element.length));
                                                    }
                                                    if (element !== "") {
                                                        attrs[attrs.length - 1].push(element);
                                                    }
                                                    stest     = true;
                                                    attribute = [];
                                                    break;
                                                }
                                            }
                                            if (b[a] === "\"" || b[a] === "'") {
                                                quote = b[a];
                                            } else if (mjsx === true) {
                                                //jsx variable attribute
                                                if (b[a - 1] === "=" && b[a] === "{") {
                                                    quote  = "}";
                                                    bcount = 1;
                                                } else if (b[a] === "/") {
                                                    //jsx comments
                                                    if (b[a + 1] === "*") {
                                                        quote = "*/";
                                                    } else if (b[a + 1] === "/") {
                                                        quote = "\n";
                                                    }
                                                }
                                            } else if (b[a] === "{" && (b[a + 1] === "{" || b[a + 1] === "%" || b[a + 1] === "@" || b[a + 1] === "#")) {
                                                //opening embedded template expression
                                                if (b[a + 1] === "{") {
                                                    if (b[a + 2] === "{") {
                                                        quote = "}}}";
                                                    } else {
                                                        quote = "}}";
                                                    }
                                                } else {
                                                    quote = b[a + 1] + "}";
                                                }
                                            }
                                        } else if (mjsx === true && (quote === "}" || (quote === "\n" && b[a] === "\n") || (quote === "*/" && b[a - 1] === "*" && b[a] === "/"))) {
                                            //jsx attributes
                                            if (quote === "}") {
                                                if (b[a] === "{") {
                                                    bcount += 1;
                                                } else if (b[a] === quote) {
                                                    bcount -= 1;
                                                    if (bcount === 0) {
                                                        quote     = "";
                                                        element   = attribute.join("").replace(/\s+/g, " ");
                                                        attribute = [];
                                                        if (element !== " ") {
                                                            attrs[attrs.length - 1].push(element);
                                                        }
                                                        break;
                                                    }
                                                }
                                            } else {
                                                quote                   = "";
                                                jsxquote                = "";
                                                jscom[jscom.length - 1] = true;
                                                element                 = attribute.join("");
                                                if (element.charAt(1) === "*") {
                                                    element = element + "\n";
                                                }
                                                attribute = [];
                                                if (element !== " ") {
                                                    attrs[attrs.length - 1].push(element);
                                                }
                                                break;
                                            }
                                        } else {
                                            //terminate attribute at the conclusion of a quote pair
                                            f = 0;
                                            for (e = quote.length - 1; e > -1; e -= 1) {
                                                if (b[a - f] !== quote.charAt(e)) {
                                                    break;
                                                }
                                                f += 1;
                                            }
                                            if (e < 0) {
                                                if (quote === "\"" && mquoteConvert === "single") {
                                                    quote = attribute.slice(0, attribute.length - 1).join("").replace(/'/g, "\"").replace(/"/, "'") + "'";
                                                } else if (quote === "'" && mquoteConvert === "double") {
                                                    quote = attribute.slice(0, attribute.length - 1).join("").replace(/"/g, "'").replace(/'/, "\"") + "\"";
                                                } else {
                                                    quote = attribute.join("");
                                                }
                                                name = attrName(quote)[0];
                                                if (name === "data-prettydiff-ignore") {
                                                    ignoreme = true;
                                                } else if (name === "id") {
                                                    ids.push(quote.slice(name.length + 2, quote.length - 1));
                                                } else if (name === "schemaLocation") {
                                                    reqs.push(quote.slice(name.length + 2, quote.length - 1));
                                                }
                                                attrs[attrs.length - 1].push(quote.replace(/\s+/g, " "));
                                                quote     = "";
                                                attribute = [];
                                                if (b[a + 1] === lastchar) {
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                } else if (b[a] === "\"" || b[a] === "'") {
                                    //opening quote
                                    quote = b[a];
                                } else if (b[a] === "{" && (b[a + 1] === "{" || b[a + 1] === "%" || b[a + 1] === "@" || b[a + 1] === "#")) {
                                    //opening embedded template expression
                                    if (b[a + 1] === "{") {
                                        if (b[a + 2] === "{") {
                                            quote = "}}}";
                                        } else {
                                            quote = "}}";
                                        }
                                    } else {
                                        quote = b[a + 1] + "}";
                                    }
                                    if (quote === end) {
                                        quote = "";
                                    }
                                } else if (simple === true && (/\s/).test(b[a]) === true && b[a - 1] !== "<") {
                                    //identify a space in a regular start or singleton tag
                                    stest = true;
                                } else if (simple === true && mjsx === true && b[a] === "/" && (b[a + 1] === "*" || b[a + 1] === "/")) {
                                    //jsx comment immediately following tag name
                                    stest                     = true;
                                    output[output.length - 1] = " ";
                                    attribute.push(b[a]);
                                    if (b[a + 1] === "*") {
                                        jsxquote = "*/";
                                    } else {
                                        jsxquote = "\n";
                                    }
                                } else if (b[a] === lastchar) {
                                    //if current character matches the last character of the tag ending sequence
                                    f = output.length;
                                    for (e = end.length - 1; e > -1; e -= 1) {
                                        f -= 1;
                                        if (output[f] !== end.charAt(e)) {
                                            break;
                                        }
                                    }
                                    if (e < 0) {
                                        break;
                                    }
                                }
                            } else if (b[a] === quote.charAt(quote.length - 1)) {
                                //find the closing quote or embedded template expression
                                f = 0;
                                for (e = quote.length - 1; e > -1; e -= 1) {
                                    if (b[a - f] !== quote.charAt(e)) {
                                        break;
                                    }
                                    f += 1;
                                }
                                if (e < 0) {
                                    quote = "";
                                }
                            }
                        }
                        //nopush flags mean an early exit
                        if (nopush === true) {
                            attrs.pop();
                            jscom.pop();
                            linen.pop();
                            lines.pop();
                            space = minspace;
                            return;
                        }
                        //fix singleton tags and sort attributes
                        if (attrs[attrs.length - 1].length > 0) {
                            e = attrs.length - 1;
                            if (attrs[e][attrs[e].length - 1] === "/") {
                                attrs[attrs.length - 1].pop();
                                output.splice(output.length - 1, 0, "/");
                            }
                            if (jscom[jscom.length - 1] === false) {
                                attrs[attrs.length - 1] = safeSort(attrs[attrs.length - 1]);
                            }
                        }
                        element = output.join("");
                        if (parseFail === true) {
                            if (element.indexOf("<!--<![") === 0) {
                                parseError.pop();
                            } else {
                                parseError[parseError.length - 1] = parseError[parseError.length - 1] + element;
                                if (element.indexOf("</") > 0) {
                                    token.push(element);
                                    return types.push("end");
                                }
                            }
                        }
                        //cheat identifies HTML singleton elements as singletons even if formatted as
                        //start tags
                        cheat = (function markuppretty__tokenize_tag_cheat() {
                            var tname = tagName(element),
                                atts  = attrs[attrs.length - 1],
                                atty  = [],
                                value = "",
                                type  = "",
                                d     = 0;
                            atty = token[token.length - 1];
                            if (types[types.length - 1] === "end") {
                                if (types[types.length - 2] === "singleton" && atty.charAt(atty.length - 2) !== "/" && "/" + tagName(atty) === tname) {
                                    types[types.length - 2] = "start";
                                } else if (types[types.length - 2] === "start" && tname !== "/span" && tname !== "/div" && tname !== "/script" && (mhtml === false || (mhtml === true && tname !== "/li")) && tname === "/" + tagName(token[token.length - 1]) && mtagmerge === true) {
                                    types.pop();
                                    attrs.pop();
                                    jscom.pop();
                                    linen.pop();
                                    lines.pop();
                                    types[types.length - 1] = "singleton";
                                    token[token.length - 1] = token[token.length - 1].replace(/>$/, "/>");
                                    singleton               = true;
                                    return;
                                }
                            }
                            for (d = atts.length - 1; d > -1; d -= 1) {
                                atty = attrName(atts[d]);
                                if (atty[0] === "type") {
                                    type = atty[1];
                                    if (type.charAt(0) === "\"" || type.charAt(0) === "'") {
                                        type = type.slice(1, type.length - 1);
                                    }
                                } else if (atty[0] === "src" && (tname === "embed" || tname === "img" || tname === "script" || tname === "iframe")) {
                                    value = atty[1];
                                    if (value.charAt(0) === "\"" || value.charAt(0) === "'") {
                                        value = value.slice(1, value.length - 1);
                                    }
                                    reqs.push(value);
                                } else if (tname === "link" && atty === "href") {
                                    value = atty[1];
                                    if (value.charAt(0) === "\"" || value.charAt(0) === "'") {
                                        value = value.slice(1, value.length - 1);
                                    }
                                    reqs.push(value);
                                }
                            }
                            if (tname === "script" || tname === "style") {
                                //identify if there is embedded code requiring an external parser
                                if (tname === "script" && (type === "" || type === "text/javascript" || type === "application/javascript" || type === "application/x-javascript" || type === "text/ecmascript" || type === "application/ecmascript" || type === "text/jsx" || type === "application/jsx" || type === "text/cjs")) {
                                    ext = true;
                                } else if (tname === "style" && (quote === "" || quote === "text/css")) {
                                    ext = true;
                                }
                            }
                            if (mhtml === true) {
                                //simple means of looking for missing li end tags
                                if (tname === "li") {
                                    if (litag === list) {
                                        liend = true;
                                    } else {
                                        litag += 1;
                                    }
                                } else if (tname === "/li" && litag === list) {
                                    litag -= 1;
                                } else if (tname === "ul" || tname === "ol") {
                                    list += 1;
                                } else if (tname === "/ul" || tname === "/ol") {
                                    if (litag === list) {
                                        liend = true;
                                        litag -= 1;
                                    }
                                    list -= 1;
                                } else if (tname === "area" || tname === "base" || tname === "basefont" || tname === "br" || tname === "col" || tname === "embed" || tname === "eventsource" || tname === "frame" || tname === "hr" || tname === "img" || tname === "input" || tname === "keygen" || tname === "link" || tname === "meta" || tname === "param" || tname === "progress" || tname === "source" || tname === "wbr") {
                                    return true;
                                }
                            }
                            return false;
                        }());
                        if (singleton === true) {
                            return;
                        }
                        //am I a singleton or a start type?
                        if (simple === true && ignoreme === false) {
                            if (cheat === true || (output[output.length - 2] === "/" && output[output.length - 1] === ">")) {
                                types.push("singleton");
                            } else {
                                types.push("start");
                            }
                        }
                        //additional logic is required to find the end of a tag with the attribute
                        //data-prettydiff-ignore
                        if (simple === true && preserve === false && ignoreme === true && end === ">" && element.slice(element.length - 2) !== "/>") {
                            if (cheat === true) {
                                types.push("singleton");
                            } else {
                                preserve = true;
                                types.push("ignore");
                                a += 1;
                                for (a = a; a < c; a += 1) {
                                    if (b[a] === "\n") {
                                        line += 1;
                                    }
                                    output.push(b[a]);
                                    if (quote === "") {
                                        if (b[a] === "\"") {
                                            quote = "\"";
                                        } else if (b[a] === "'") {
                                            quote = "'";
                                        } else if (b[a] === "{" && (b[a + 1] === "{" || b[a + 1] === "%" || b[a + 1] === "@" || b[a + 1] === "#")) {
                                            if (b[a + 1] === "{") {
                                                if (b[a + 2] === "{") {
                                                    quote = "}}}";
                                                } else {
                                                    quote = "}}";
                                                }
                                            } else {
                                                quote = b[a + 1] + "}";
                                            }
                                        } else if (b[a] === "<" && simple === true) {
                                            if (b[a + 1] === "/") {
                                                endtag = true;
                                            } else {
                                                endtag = false;
                                            }
                                        } else if (b[a] === lastchar) {
                                            if (b[a - 1] !== "/") {
                                                if (b[a - 1] !== "/") {
                                                    if (endtag === true) {
                                                        igcount -= 1;
                                                        if (igcount < 0) {
                                                            break;
                                                        }
                                                    } else {
                                                        igcount += 1;
                                                    }
                                                }
                                            }
                                        }
                                    } else if (b[a] === quote.charAt(quote.length - 1)) {
                                        f = 0;
                                        for (e = quote.length - 1; e > -1; e -= 1) {
                                            if (b[a - f] !== quote.charAt(e)) {
                                                break;
                                            }
                                            f += 1;
                                        }
                                        if (e < 0) {
                                            quote = "";
                                        }
                                    }
                                }
                            }
                        }
                        element = output.join("");
                        //some template tags can be evaluated as a block start/end based on syntax alone
                        if (types[types.length - 1] === "template") {
                            if ((/^(<%\s*\})/).test(element) === true || (/^(\[%\s*\})/).test(element) === true || (/^(\{@\s*\})/).test(element) === true) {
                                types[types.length - 1] = "template_end";
                            } else if ((/(\{\s*%>)$/).test(element) === true || (/(\{\s*%\])$/).test(element) === true || (/(\{\s*@\})$/).test(element) === true) {
                                types[types.length - 1] = "template_start";
                            }
                        }
                        //HTML5 does not require an end tag for an opening list item <li>
                        //this logic temprorarily creates a pseudo end tag
                        if (liend === true && (mmode === "beautify" || mmode === "diff")) {
                            token.push("</prettydiffli>");
                            lines.push(lines[lines.length - 1]);
                            linen.push(line);
                            lines[lines.length - 2] = 0;
                            attrs.splice(attrs.length - 1, 0, []);
                            types.splice(types.length - 1, 0, "end");
                        }
                        if (preserve === true) {
                            token.push(element);
                        } else {
                            token.push(element.replace(/\s+/g, " "));
                        }
                    },
                    content  = function markuppretty__tokenize_content() {
                        var output    = [],
                            quote     = "",
                            tailSpace = function markuppretty__tokenize_content_tailSpace(spacey) {
                                space = spacey;
                                return "";
                            },
                            name      = "";
                        spacer();
                        attrs.push([]);
                        jscom.push(false);
                        linen.push(line);
                        if (ext === true) {
                            name = tagName(token[token.length - 1]);
                        }
                        for (a = a; a < c; a += 1) {
                            if (b[a] === "\n") {
                                line += 1;
                            }
                            //external code requires additional parsing to look for the appropriate
                            //end tag, but that end tag cannot be quoted or commented
                            if (ext === true) {
                                if (quote === "") {
                                    if (b[a] === "\"") {
                                        quote = "\"";
                                    } else if (b[a] === "'") {
                                        quote = "'";
                                    } else if (b[a] === "/") {
                                        if (b[a + 1] === "*") {
                                            quote = "*";
                                        } else if (b[a + 1] === "/") {
                                            quote = "/";
                                        }
                                    }
                                    if (name === "script" && b[a] === "<" && b[a + 1] === "/" && b[a + 2] === "s" && b[a + 3] === "c" && b[a + 4] === "r" && b[a + 5] === "i" && b[a + 6] === "p" && b[a + 7] === "t") {
                                        a   -= 1;
                                        ext = false;
                                        if (output.length < 2) {
                                            attrs.pop();
                                            jscom.pop();
                                            linen.pop();
                                            return lines.pop();
                                        }
                                        token.push(output.join("").replace(/^(\s+)/, "").replace(/(\s+)$/, ""));
                                        if (typeof jspretty === "function") {
                                            return types.push(name);
                                        }
                                        return types.push("content");
                                    }
                                    if (name === "style" && b[a] === "<" && b[a + 1] === "/" && b[a + 2] === "s" && b[a + 3] === "t" && b[a + 4] === "y" && b[a + 5] === "l" && b[a + 6] === "e") {
                                        a   -= 1;
                                        ext = false;
                                        if (output.length < 2) {
                                            attrs.pop();
                                            jscom.pop();
                                            linen.pop();
                                            return lines.pop();
                                        }
                                        token.push(output.join("").replace(/^(\s+)/, "").replace(/(\s+)$/, ""));
                                        if (typeof csspretty === "function") {
                                            return types.push(name);
                                        }
                                        return types.push("content");
                                    }
                                } else if (quote === b[a] && (quote === "\"" || quote === "'" || (quote === "*" && b[a + 1] === "/"))) {
                                    quote = "";
                                } else if (quote === "/" && b[a] === "\n") {
                                    quote = "";
                                }
                            } else if (b[a] === "<" || (b[a] === "[" && b[a + 1] === "%") || (b[a] === "{" && (b[a + 1] === "{" || b[a + 1] === "%" || b[a + 1] === "@" || b[a + 1] === "#"))) {
                                a -= 1;
                                if (mcont === true) {
                                    token.push("text");
                                } else {
                                    token.push(output.join("").replace(/(\s+)$/, tailSpace).replace(/\s+/g, " "));
                                }
                                return types.push("content");
                            }
                            output.push(b[a]);
                        }
                    };
                for (a = 0; a < c; a += 1) {
                    if (ext === true) {
                        content();
                    } else if ((/\s/).test(b[a]) === true) {
                        space = space + b[a];
                        if (b[a] === "\n") {
                            line += 1;
                        }
                    } else if (b[a] === "<") {
                        tag("");
                    } else if (b[a] === "[" && b[a + 1] === "%") {
                        tag("%]");
                    } else if (b[a] === "{" && (b[a + 1] === "{" || b[a + 1] === "%" || b[a + 1] === "@" || b[a + 1] === "#")) {
                        tag("");
                    } else {
                        content();
                    }
                }
                lines[0] = 0;
            }());
            if (mmode === "parse") {
                (function markuppretty__parse() {
                    var a      = 0,
                        c      = token.length,
                        //white space token to insertion logic
                        insert = function markuppretty__parse_insert(string) {
                            if (types[a] === "content") {
                                token[a] = string + token[a];
                                return;
                            }
                            if (types[a - 1] === "content" && token[a] !== "content") {
                                token[a - 1] = token[a - 1] + string;
                                return;
                            }
                            token.splice(a, 0, string);
                            types.splice(a, 0, "content");
                            lines.splice(a, 0, 1);
                            attrs.splice(a, 0, []);
                            c += 1;
                            a += 1;
                        };
                    for (a = 0; a < c; a += 1) {
                        if (attrs[a].length > 0) {
                            token[a] = token[a].replace(" ", " " + attrs[a].join(" ")).replace(/(\ \/>)$/, "/>");
                        }
                        if (token[a] === "</prettydiffli>") {
                            if (mcorrect === true) {
                                token[a] = "</li>";
                            } else {
                                token[a] = "";
                                types[a] = "";
                            }
                        }
                        if (lines[a] === 2) {
                            if (mpreserve === true) {
                                insert("\n\n");
                            } else if (types[a] === "singleton" || types[a] === "content" || types[a] === "template") {
                                insert(" ");
                            }
                        } else if (lines[a] === 1) {
                            if (types[a] === "singleton" || types[a] === "content" || types[a] === "template") {
                                insert(" ");
                            } else if (types[a] !== types[a - 1] && (types[a - 1] === "singleton" || types[a - 1] === "content" || types[a - 1] === "template")) {
                                insert(" ");
                            }
                        }
                    }
                }());
                return {
                    token: token,
                    types: types
                };
            }
            if (mmode === "minify") {
                (function markuppretty__minify() {
                    var a      = 0,
                        c      = token.length,
                        script = function markuppretty__beautify_script() {
                            token[a] = jspretty({
                                correct     : mcorrect,
                                mode        : "minify",
                                obfuscate   : mobfuscate,
                                quoteConvert: mquoteConvert,
                                source      : token[a],
                                styleguide  : mstyleguide,
                                topcoms     : mtopcomments
                            });
                            level.push("x");
                        },
                        style  = function markuppretty__beautify_style() {
                            token[a] = csspretty({
                                mode   : "minify",
                                objsort: mobjsort,
                                source : token[a],
                                topcoms: mtopcomments
                            });
                            level.push("x");
                        };
                    for (a = 0; a < c; a += 1) {
                        if (types[a] === "script") {
                            script();
                        } else if (types[a] === "style") {
                            style();
                        } else if (lines[a] > 0) {
                            if (types[a] === "singleton" || types[a] === "content" || types[a] === "template") {
                                level.push(0);
                            } else if (types[a - 1] === "singleton" || types[a - 1] === "content" || types[a] === "template") {
                                level.push(0);
                            } else {
                                level.push("x");
                            }
                        } else {
                            level.push("x");
                        }
                    }
                }());
            }
            if (mmode === "beautify" || mmode === "diff") {
                (function markuppretty__beautify() {
                    var a            = 0,
                        c            = token.length,
                        ltype        = "",
                        lline        = 0,
                        indent       = minlevel,
                        cdataS       = "",
                        cdataE       = "",
                        commentS     = "",
                        commentE     = "",
                        cdataStart   = (/^(\s*(\/)*<!?\[+[A-Z]+\[+)/),
                        cdataEnd     = (/((\/)*\]+>\s*)$/),
                        commentStart = (/^(\s*<!--)/),
                        commentEnd   = (/((\/\/)?-->\s*)$/),
                        tab          = (function markuppretty__beautify_tab() {
                            var b      = msize,
                                output = [];
                            for (b = b; b > -1; b -= 1) {
                                output.push(mchar);
                            }
                            return new RegExp("^(" + output.join("") + "+)");
                        }()),
                        tabs         = "",
                        end          = function markuppretty__beautify_end() {
                            var b = 0;
                            indent -= 1;
                            if (ltype === "start") {
                                return level.push("x");
                            }
                            if (mforce === false) {
                                if (lines[a] === 0 && (ltype === "singleton" || ltype === "content" || ltype === "template")) {
                                    return level.push("x");
                                }
                                if (ltype === "comment") {
                                    for (b = a - 1; b > -1; b -= 1) {
                                        if (types[b] !== "comment") {
                                            if (lines[b + 1] === 0 && (types[b] === "singleton" || types[b] === "content" || ltype === "template")) {
                                                for (b += 1; b < a; b += 1) {
                                                    level[b] = "x";
                                                }
                                                return level.push("x");
                                            }
                                            return level.push(indent);
                                        }
                                    }
                                }
                                return level.push(indent);
                            }
                            level.push(indent);
                        },
                        content      = function markuppretty__beautify_content() {
                            var b = 0;
                            if (lines[a] === 0 && mforce === false) {
                                if (ltype === "comment" && lline === 0) {
                                    for (b = a - 1; b > -1; b -= 1) {
                                        if (types[b - 1] !== "comment" && types[b] === "comment") {
                                            if (lines[b] === 0) {
                                                for (b = b; b < a; b += 1) {
                                                    level[b] = "x";
                                                }
                                                return level.push("x");
                                            }
                                            return level.push(indent);
                                        }
                                        if (lines[b] > 0) {
                                            return level.push(indent);
                                        }
                                    }
                                    return level.push(indent);
                                }
                                level.push("x");
                            } else {
                                level.push(indent);
                            }
                        },
                        script       = function markuppretty__beautify_script() {
                            var list = [];
                            stats.script[0] += 1;
                            stats.script[1] += token[a].replace(/\s+/g, " ").length;
                            if (cdataStart.test(token[a]) === true) {
                                cdataS   = cdataStart.exec(token[a])[0].replace(/^\s+/, "") + "\n";
                                token[a] = token[a].replace(cdataStart, "");
                            } else if (commentStart.test(token[a]) === true) {
                                commentS = commentStart.exec(token[a])[0].replace(/^\s+/, "") + "\n";
                                token[a] = token[a].replace(commentStart, "");
                            }
                            if (cdataEnd.test(token[a]) === true) {
                                cdataE   = cdataEnd.exec(token[a])[0];
                                token[a] = token[a].replace(cdataEnd, "");
                            } else if (commentEnd.test(token[a]) === true) {
                                commentE = commentEnd.exec(token[a])[0];
                                token[a] = token[a].replace(commentEnd, "");
                            }
                            token[a] = jspretty({
                                braceline   : mbraceline,
                                bracepadding: mbracepadding,
                                braces      : mbraces,
                                comments    : mcomm,
                                correct     : mcorrect,
                                inchar      : mchar,
                                inlevel     : (mstyle === "noindent")
                                    ? 0
                                    : indent,
                                insize      : msize,
                                mode        : "beautify",
                                objsort     : mobjsort,
                                preserve    : mpreserve,
                                quoteConvert: mquoteConvert,
                                source      : token[a],
                                space       : mspace,
                                styleguide  : mstyleguide,
                                varword     : mvarword,
                                vertical    : (mvertical === "jsonly" || mvertical === true || mvertical === "true")
                            });
                            list     = tab.exec(token[a]);
                            if (list !== null) {
                                tabs = list[0];
                            }
                            if (cdataS !== "") {
                                token[a] = tabs + cdataS + token[a];
                                cdataS   = "";
                            } else if (commentS !== "") {
                                token[a] = tabs + commentS + token[a];
                                commentS = "";
                            }
                            if (cdataE !== "") {
                                token[a] = token[a] + tabs + cdataE;
                                cdataE   = "";
                            } else if (commentE !== "") {
                                token[a] = token[a] + tabs + commentE;
                                commentE = "";
                            }
                            level.push(0);
                        },
                        style        = function markuppretty__beautify_style() {
                            var list = [];
                            stats.style[0] += 1;
                            stats.style[1] += token[a].replace(/\s+/g, " ").length;
                            if (cdataStart.test(token[a]) === true) {
                                cdataS   = cdataStart.exec(token[a])[0].replace(/^\s+/, "") + "\n";
                                token[a] = token[a].replace(cdataStart, "");
                            } else if (commentStart.test(token[a]) === true) {
                                commentS = commentStart.exec(token[a])[0].replace(/^\s+/, "") + "\n";
                                token[a] = token[a].replace(commentStart, "");
                            }
                            if (cdataEnd.test(token[a]) === true) {
                                cdataE   = cdataEnd.exec(token[a])[0];
                                token[a] = token[a].replace(cdataEnd, "");
                            } else if (commentEnd.test(token[a]) === true) {
                                commentE = commentEnd.exec(token[a])[0];
                                token[a] = token[a].replace(commentEnd, "");
                            }
                            token[a] = csspretty({
                                comm          : mcomm,
                                cssinsertlines: mcssinsertlines,
                                inchar        : mchar,
                                inlevel       : (mstyle === "noindent")
                                    ? 0
                                    : indent,
                                insize        : msize,
                                mode          : "beautify",
                                objsort       : mobjsort,
                                source        : token[a],
                                vertical      : (mvertical === true || mvertical === "true")
                            });
                            list     = tab.exec(token[a]);
                            if (list !== null) {
                                tabs = list[0];
                            }
                            if (cdataS !== "") {
                                token[a] = tabs + cdataS + token[a];
                                cdataS   = "";
                            } else if (commentS !== "") {
                                token[a] = tabs + commentS + token[a];
                                commentS = "";
                            }
                            if (cdataE !== "") {
                                token[a] = token[a] + tabs + cdataE;
                                cdataE   = "";
                            } else if (commentE !== "") {
                                token[a] = token[a] + tabs + commentE;
                                commentE = "";
                            }
                            level.push(0);
                        };
                    for (a = 0; a < c; a += 1) {
                        if (types[a] === "start") {
                            level.push(indent);
                            indent         += 1;
                            stats.start[0] += 1;
                            stats.start[1] += token[a].length;
                        } else if (types[a] === "template_start") {
                            level.push(indent);
                            indent            += 1;
                            stats.template[0] += 1;
                            stats.template[1] += token[a].length;
                        } else if (types[a] === "end") {
                            end();
                            stats.end[0] += 1;
                            stats.end[1] += token[a].length;
                        } else if (types[a] === "template_end") {
                            end();
                            stats.template[0] += 1;
                            stats.template[1] += token[a].length;
                        } else if (lines[a] === 0 && (types[a] === "singleton" || types[a] === "content" || types[a] === "template")) {
                            content();
                            stats[types[a]][0] += 1;
                            stats[types[a]][1] += token[a].length;
                        } else if (types[a] === "script") {
                            stats.script[0] += 1;
                            stats.script[1] += token[a].length;
                            script();
                        } else if (types[a] === "style") {
                            stats.style[0] += 1;
                            stats.style[1] += 1;
                            style();
                        } else if (types[a] === "comment" && mcomm === "noindent") {
                            level.push(0);
                            stats.comment[0] += 1;
                            stats.comment[1] += token[a].length;
                        } else {
                            level.push(indent);
                            stats[types[a]][0] += 1;
                            stats[types[a]][1] += token[a].length;
                        }
                        ltype = types[a];
                        lline = lines[a];
                    }
                    level[0] = 0;
                }());
            }
            return (function markuppretty__apply() {
                var a       = 0,
                    c       = level.length,
                    build   = [],
                    output  = "",
                    //tab builds out the character sequence for one step of indentation
                    tab     = (function markuppretty__apply_tab() {
                        var aa  = 0,
                            ind = [mchar];
                        msize -= 1;
                        for (aa = 0; aa < msize; aa += 1) {
                            ind.push(mchar);
                        }
                        return ind.join("");
                    }()),
                    //a new line character plus the correct amount
                    //of identation for the given line of code
                    nl      = function markuppretty__apply_nl(ind, item) {
                        var aa          = 0,
                            indentation = ["\n"];
                        if (mmode === "minify") {
                            return build.push("\n");
                        }
                        if (lines[a] === 2 && item === build) {
                            indentation.push("\n");
                        }
                        for (aa = 0; aa < ind; aa += 1) {
                            indentation.push(tab);
                        }
                        item.push(indentation.join(""));
                    },
                    //populates attributes onto start and singleton tags
                    //it also checks to see if a tag should or content should wrap
                    wrap    = function markuppretty__apply_wrap() {
                        var b        = 0,
                            len      = 0,
                            xlen     = 0,
                            list     = attrs[a],
                            lev      = level[a],
                            atty     = "",
                            string   = "",
                            content  = [],
                            wordslen = 0;
                        if (lev === "x") {
                            b = a;
                            do {
                                b    -= 1;
                                lev  = level[b];
                                xlen += token[b].length;
                            } while (lev === "x" && b > -1);
                            if (lev === "x") {
                                lev = 1;
                            }
                        }
                        if (list.length > 0) {
                            atty   = list.join(" ");
                            string = tagName(token[a]);
                            len    = string.length + 3 + atty.length;
                            if (token[a].charAt(token[a].length - 2) === "/") {
                                len += 1;
                            }
                            if (mwrap === 0 || len <= mwrap) {
                                token[a] = token[a].replace(" ", " " + atty).replace(/(\ \/>)$/, "/>");
                                return;
                            }
                            content.push(token[a].slice(0, token[a].indexOf(" ")));
                            wordslen = content[0].length;
                            len      = list.length;
                            for (b = 0; b < len; b += 1) {
                                if (list[b].length + wordslen + 1 > mwrap) {
                                    nl(lev + 1, content);
                                    wordslen = 0;
                                } else {
                                    content.push(" ");
                                    wordslen += 1;
                                }
                                content.push(list[b]);
                                wordslen += list[b].length;
                            }
                            content.push(token[a].slice(token[a].indexOf(" ") + 1));
                            token[a] = content.join("").replace(/(\ \/>)$/, "/>");
                        } else {
                            list = token[a].split(" ");
                            len  = list.length;
                            if (level[a] === "x" && types[a - 1] === "end") {
                                b   = a - 1;
                                lev = 1;
                                do {
                                    b -= 1;
                                    if (types[b] === "start") {
                                        lev -= 1;
                                    } else if (types[b] === "end") {
                                        lev += 1;
                                    }
                                } while (lev > 0 && b > 0);
                                lev = level[b];
                            }
                            for (b = 0; b < len; b += 1) {
                                string = string + list[b];
                                if (list[b + 1] !== undefined && string.length + list[b + 1].length + 1 > mwrap - xlen) {
                                    content.push(string);
                                    xlen = 0;
                                    if (level[a] === "x" && types[a - 1] !== "end") {
                                        nl(lev + 1, content);
                                    } else {
                                        nl(lev, content);
                                    }
                                    string = "";
                                } else {
                                    string = string + " ";
                                }
                            }
                            content.push(string.replace(/\s$/, ""));
                            if (content.length > 0 && content[content.length - 1].charAt(0) === "\n") {
                                content.pop();
                            }
                            token[a] = content.join("").replace(/(\ \/>)$/, "/>");
                        }
                    },
                    //JSX tags may contain comments, which are captured as
                    //attributes in this parser.  These attributes demand
                    //unique care to be correctly applied.
                    attrcom = function markuppretty__apply_attrcom() {
                        var toke  = token[a].split(" "),
                            attr  = attrs[a],
                            len   = attr.length,
                            ilen  = 0,
                            item  = [toke[0]],
                            temp  = [],
                            tempx = [],
                            index = 0,
                            b     = 0,
                            x     = 0,
                            y     = 0;
                        nl(level[a], build);
                        for (b = 0; b < len; b += 1) {
                            index = attr[b].indexOf("\n");
                            if (index > 0 && index !== attr[b].length - 1 && attr[b].indexOf("/*") === 0) {
                                temp = attr[b].split("\n");
                                tempx.push(temp[0]);
                                y = temp.length;
                                for (x = 0; x < y; x += 1) {
                                    if (temp[x] === "") {
                                        temp[x] = "\n";
                                    } else {
                                        nl(level[a] + 1, tempx);
                                        tempx.push(temp[x].replace(/^(\s+)/, ""));
                                    }
                                }
                                tempx.push("\n");
                                attr[b] = tempx.join("");
                            }
                            if (b > 0 && attr[b - 1].charAt(attr[b - 1].length - 1) === "\n") {
                                nl(level[a] + 1, item);
                                ilen       = item.length - 1;
                                item[ilen] = item[ilen].slice(1);
                            } else {
                                item.push(" ");
                            }
                            item.push(attr[b]);
                        }
                        if (attr[len - 1].charAt(attr[len - 1].length - 1) === "\n") {
                            nl(level[a], item);
                            ilen       = item.length - 1;
                            item[ilen] = item[ilen].slice(1);
                        }
                        item.push(toke[1]);
                        build.push(item.join(""));
                    };
                for (a = 0; a < c; a += 1) {
                    if (jscom[a] === true) {
                        attrcom();
                    } else if (((types[a] === "content" && mwrap > 0 && token[a].length > mwrap) || attrs[a].length > 0) && mmode === "beautify") {
                        wrap();
                    } else if (attrs[a].length > 0) {
                        token[a] = token[a].replace(" ", " " + attrs[a].join(" ")).replace(/(\ \/>)$/, "/>");
                    } else if (types[a] === "singleton") {
                        token[a] = token[a].replace(/(\ \/>)$/, "/>");
                    }
                    if (token[a] === "</prettydiffli>" && mcorrect === true) {
                        token[a] = "</li>";
                    }
                    if (token[a] !== "</prettydiffli>") {
                        if (isNaN(level[a]) === false) {
                            if (mmode === "minify") {
                                build.push(" ");
                            } else {
                                nl(level[a], build);
                            }
                        } else if (level[a] === "s") {
                            build.push(" ");
                        }
                        build.push(token[a]);
                    }
                }
                if (build[0] === "\n") {
                    build[0] = "";
                }
                output = build.join("");
                if (mmode === "beautify") {
                    summary = (function markuppretty__apply_summary() {
                        var len           = token.length,
                            sum           = [],
                            startend      = stats.start[0] - stats.end[0],
                            violations    = 0,
                            binfix        = (/\u0000|\u0001|\u0002|\u0003|\u0004|\u0005|\u0006|\u0007|\u0008|\u000b|\u000c|\u000e|\u000f|\u0010|\u0011|\u0012|\u0013|\u0014|\u0015|\u0016|\u0017|\u0018|\u0019|\u001a|\u001b|\u001c|\u001d|\u001e|\u001f|\u007f|\u0080|\u0081|\u0082|\u0083|\u0084|\u0085|\u0086|\u0087|\u0088|\u0089|\u008a|\u008b|\u008c|\u008d|\u008e|\u008f|\u0090|\u0091|\u0092|\u0093|\u0094|\u0095|\u0096|\u0097|\u0098|\u0099|\u009a|\u009b|\u009c|\u009d|\u009e|\u009f|\ufffd/g),
                            numformat     = function markuppretty__apply_summary_numformat(x) {
                                var y    = String(x).split(""),
                                    z    = 0,
                                    xlen = y.length,
                                    dif  = 0;
                                if (xlen % 3 === 2) {
                                    dif = 2;
                                } else if (xlen % 3 === 1) {
                                    dif = 1;
                                }
                                for (z = xlen - 1; z > 0; z -= 1) {
                                    if ((z % 3) - dif === 0) {
                                        y[z] = "," + y[z];
                                    }
                                }
                                return y.join("");
                            },
                            analysis      = function markuppretty__apply_summary_analysis(arr) {
                                var x       = arr.length,
                                    idtest  = (arr === ids),
                                    y       = 0,
                                    data    = [],
                                    content = [];
                                if (x > 0) {
                                    arr = safeSort(arr);
                                    for (y = 0; y < x; y += 1) {
                                        if (arr[y] === arr[y + 1]) {
                                            if (idtest === true && (data.length === 0 || data[data.length - 1][1] !== arr[y])) {
                                                data.push([
                                                    2, arr[y]
                                                ]);
                                            }
                                            if (data.length > 0) {
                                                data[data.length - 1][0] += 1;
                                            }
                                        } else if (idtest === false) {
                                            data.push([
                                                1, arr[y]
                                            ]);
                                        }
                                    }
                                    x = data.length;
                                    if (idtest === true) {
                                        if (x === 0) {
                                            return "";
                                        }
                                        content.push("<h4>Duplicate id attribute values</h4>");
                                    } else {
                                        content.push("<h4>HTTP requests:</h4>");
                                    }
                                    content.push("<ul>");
                                    for (y = 0; y < x; y += 1) {
                                        if (idtest === true && data[y][0] > 1) {
                                            violations += (data[y][0] - 1);
                                        }
                                        content.push("<li>");
                                        content.push(data[y][0]);
                                        content.push("x - ");
                                        content.push(data[y][1].replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"));
                                        content.push("</li>");
                                    }
                                    content.push("</ul>");
                                    return content.join("");
                                }
                                return "";
                            },
                            accessibility = (function markuppretty__apply_summary_accessibility() {
                                var findings   = [],
                                    tagsbyname = function markuppretty__apply_summary_accessibility_tagsbyname() {
                                        var b              = 0,
                                            x              = 0,
                                            y              = 0,
                                            z              = 0,
                                            tagname        = "",
                                            alttest        = false,
                                            id             = false,
                                            fortest        = false,
                                            attr           = [],
                                            noalt          = [],
                                            emptyalt       = [],
                                            headings       = [],
                                            headtest       = (/^(h\d)$/),
                                            presentationEl = [],
                                            presentationAt = [],
                                            tabindex       = [],
                                            formnoID       = [],
                                            formID         = [],
                                            labelFor       = [],
                                            nofor          = [];
                                        for (b = 0; b < c; b += 1) {
                                            tagname = tagName(token[b]);
                                            if ((types[b] === "start" || types[b] === "singleton") && (tagname === "font" || tagname === "center" || tagname === "basefont" || tagname === "b" || tagname === "i" || tagname === "u" || tagname === "small" || tagname === "big" || tagname === "blink" || tagname === "plaintext" || tagname === "spacer" || tagname === "strike" || tagname === "tt" || tagname === "xmp")) {
                                                presentationEl.push(b);
                                            } else {
                                                if (types[b] === "start" && headtest.test(tagname) === true) {
                                                    z = Number(tagname.charAt(1));
                                                    if (headings.length > 0 && z - headings[headings.length - 1][1] > 1) {
                                                        violations += 1;
                                                        headings.push([
                                                            b, z, true
                                                        ]);
                                                    } else {
                                                        headings.push([
                                                            b, z, false
                                                        ]);
                                                    }
                                                }
                                                y = attrs[b].length;
                                                for (x = 0; x < y; x += 1) {
                                                    attr = attrName(attrs[b][x]);
                                                    if (attr[0] === "alt" && tagname === "img") {
                                                        alttest = true;
                                                        if (attr[1] === "") {
                                                            emptyalt.push(b);
                                                        }
                                                    }
                                                    if (tagname === "label" && attr[0] === "for") {
                                                        labelFor.push(attr[1]);
                                                        fortest = true;
                                                    } else if (tagname === "select" || tagname === "input" || tagname === "textarea") {
                                                        if (attr[0] === "id" || (attr[0] === "type" && (attr[1].toLowerCase() === "hidden" || attr[1].toLowerCase() === "submit"))) {
                                                            id = true;
                                                            if (attr[0] === "id") {
                                                                formID.push([
                                                                    b, x
                                                                ]);
                                                            }
                                                        }
                                                    }
                                                    if (presentationEl[presentationEl.length - 1] !== b && (attr[0] === "alink" || attr[0] === "align" || attr[0] === "background" || attr[0] === "border" || attr[0] === "color" || attr[0] === "compact" || attr[0] === "face" || attr[0] === "height" || attr[0] === "language" || attr[0] === "link" || (attr[0] === "name" && tagname !== "meta" && tagname !== "iframe" && tagname !== "select" && tagname !== "input" && tagname !== "textarea") || attr[0] === "nowrap" || attr[0] === "size" || attr[0] === "start" || attr[0] === "text" || (attr[0] === "type" && tagname !== "script" && tagname !== "style" && tagname !== "input") || (attr[0] === "value" && tagname !== "input" && tagname !== "option" && tagname !== "textarea") || attr[0] === "version" || attr[0] === "vlink" || attr[0] === "width")) {
                                                        presentationAt.push([
                                                            b, x
                                                        ]);
                                                    }
                                                    if (attr[0] === "tabindex") {
                                                        if (isNaN(Number(attr[1])) === true || Number(attr[1]) > 0) {
                                                            tabindex.push([
                                                                b, true
                                                            ]);
                                                        } else {
                                                            tabindex.push([
                                                                b, false
                                                            ]);
                                                        }
                                                    }
                                                }
                                                if (fortest === true) {
                                                    fortest = false;
                                                } else if (tagname === "label") {
                                                    nofor.push(b);
                                                }
                                                if (id === true) {
                                                    id = false;
                                                } else if (tagname === "select" || tagname === "input" || tagname === "textarea") {
                                                    formnoID.push(b);
                                                }
                                                if (alttest === true) {
                                                    alttest = false;
                                                } else if (tagname === "img") {
                                                    noalt.push(b);
                                                }
                                            }
                                        }
                                        attr       = [];
                                        //obsolete tags
                                        b          = presentationEl.length;
                                        violations += b;
                                        if (b > 0) {
                                            attr.push("<h4><strong>");
                                            attr.push(b);
                                            attr.push("</strong> obsolete HTML tag");
                                            if (b > 1) {
                                                attr.push("s");
                                            }
                                            attr.push("</h4> <p>Obsolete elements do not appropriately describe content.</p> <ol>");
                                            for (x = 0; x < b; x += 1) {
                                                attr.push("<li><code>");
                                                attr.push(token[presentationEl[x]].replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"));
                                                attr.push("</code> on input line number ");
                                                attr.push(linen[presentationEl[x]]);
                                                attr.push("</li>");
                                            }
                                            attr.push("</ol>");
                                        } else {
                                            attr.push("<h4><strong>0</strong> obsolete HTML tags</h4>");
                                        }
                                        //obsolete attributes
                                        b = presentationAt.length;
                                        if (b > 0) {
                                            z = 0;
                                            attr.push("<h4><strong>");
                                            y = attr.length;
                                            attr.push("</strong> HTML tag");
                                            if (b > 1) {
                                                attr.push("s");
                                            }
                                            attr.push(" containing obsolete or inappropriate attributes</h4> <p>Obsolete elements do no" +
                                                    "t appropriately describe content.</p> <ol>");
                                            for (x = 0; x < b; x += 1) {
                                                tagname = token[presentationAt[x][0]].replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(attrs[presentationAt[x][0]][presentationAt[x][1]], "<strong>" + attrs[presentationAt[x][0]][presentationAt[x][1]] + "</strong>");
                                                if (x < b - 1 && presentationAt[x][0] === presentationAt[x + 1][0]) {
                                                    do {
                                                        tagname = tagname.replace(attrs[presentationAt[x][0]][presentationAt[x + 1][1]], "<strong>" + attrs[presentationAt[x][0]][presentationAt[x + 1][1]] + "</strong>");
                                                        x       += 1;
                                                    } while (x < b - 1 && presentationAt[x][0] === presentationAt[x + 1][0]);
                                                }
                                                z += 1;
                                                attr.push("<li><code>");
                                                attr.push(tagname);
                                                attr.push("</code> on input line number ");
                                                attr.push(linen[presentationAt[x][0]]);
                                                attr.push("</li>");
                                            }
                                            attr.splice(y, 0, z);
                                            violations += z;
                                            attr.push("</ol>");
                                        } else {
                                            attr.push("<h4><strong>0</strong> HTML tags containing obsolete or inappropriate attributes" +
                                                    "</h4>");
                                        }
                                        //form controls missing a required 'id' attribute
                                        b          = formnoID.length;
                                        violations += b;
                                        if (b > 0) {
                                            attr.push("<h4><strong>");
                                            attr.push(b);
                                            attr.push("</strong> form control element");
                                            if (b > 1) {
                                                attr.push("s");
                                            }
                                            attr.push(" missing a required <em>id</em> attribute</h4> <p>The id attribute is required t" +
                                                    "o bind a point of interaction to an HTML label.</p> <ol>");
                                            for (x = 0; x < b; x += 1) {
                                                attr.push("<li><code>");
                                                attr.push(token[formnoID[x]].replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"));
                                                attr.push("</code> on input line number ");
                                                attr.push(linen[formnoID[x]]);
                                                attr.push("</li>");
                                            }
                                            attr.push("</ol>");
                                        } else {
                                            attr.push("<h4><strong>0</strong> form control elements missing a required <em>id</em> attr" +
                                                    "ibute</h4> <p>The id attribute is required to bind a point of interaction to an " +
                                                    "HTML label.</p>");
                                        }
                                        //form controls missing a binding to a label
                                        b        = formID.length;
                                        formnoID = [];
                                        for (x = 0; x < b; x += 1) {
                                            for (y = labelFor.length - 1; y > -1; y -= 1) {
                                                if (attrName(attrs[formID[x][0]][formID[x][1]])[1] === labelFor[y]) {
                                                    break;
                                                }
                                            }
                                            if (y < 0) {
                                                formnoID.push(formID[x]);
                                            }
                                        }
                                        b          = formnoID.length;
                                        violations += b;
                                        if (b > 0) {
                                            attr.push("<h4><strong>");
                                            attr.push(b);
                                            attr.push("</strong> form control element");
                                            if (b > 1) {
                                                attr.push("s");
                                            }
                                            attr.push(" not bound to a label</h4> <p>The <em>id</em> of a form control must match the <" +
                                                    "em>for</em> of a label.</p><ol>");
                                            for (x = 0; x < b; x += 1) {
                                                attr.push("<li><code>");
                                                attr.push(token[formnoID[x][0]].replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"));
                                                attr.push("</code> on input line number ");
                                                attr.push(linen[formnoID[x][0]]);
                                                attr.push("</li>");
                                            }
                                            attr.push("</ol>");
                                        } else {
                                            attr.push("<h4><strong>0</strong> form control elements not bound to a label</h4> <p>The <e" +
                                                    "m>id</em> of a form control must match the <em>for</em> of a label.</p>");
                                        }
                                        //elements with tabindex
                                        b          = tabindex.length;
                                        violations += b;
                                        if (b > 0) {
                                            attr.push("<h4><strong>");
                                            attr.push(b);
                                            attr.push("</strong> element");
                                            if (b > 1) {
                                                attr.push("s");
                                            }
                                            attr.push(" with a <em>tabindex</em> attribute</h4> <p>The tabindex attribute should have a" +
                                                    " 0 or -1 value and should not be over used.</p> <ol>");
                                            for (x = 0; x < b; x += 1) {
                                                attr.push("<li><code>");
                                                if (tabindex[x][1] === true) {
                                                    attr.push("<strong>");
                                                }
                                                attr.push(token[tabindex[x][0]].replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"));
                                                if (tabindex[x][1] === true) {
                                                    attr.push("</strong>");
                                                }
                                                attr.push("</code> on input line number ");
                                                attr.push(linen[tabindex[x][0]]);
                                                attr.push("</li>");
                                            }
                                            attr.push("</ol>");
                                        } else {
                                            attr.push("<h4><strong>0</strong> elements with a <em>tabindex</em> attribute</h4> <p>The t" +
                                                    "abindex attribute should have a 0 or -1 value and should not be over used.</p>");
                                        }
                                        //headings
                                        b = headings.length;
                                        if (b > 0) {
                                            attr.push("<h4><strong>");
                                            attr.push(b);
                                            attr.push("</strong> HTML heading tag");
                                            if (b > 1) {
                                                attr.push("s");
                                            }
                                            attr.push(" and their order</h4> <p>Poorly ordered tags are described with a <strong>strong" +
                                                    "</strong> tag (color red).</p> <ol>");
                                            for (x = 0; x < b; x += 1) {
                                                attr.push("<li><code>");
                                                if (headings[x][2] === true) {
                                                    attr.push("<strong>");
                                                }
                                                attr.push(token[headings[x][0]].replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"));
                                                if (headings[x][2] === true) {
                                                    attr.push("</strong>");
                                                }
                                                attr.push("</code> on input line number ");
                                                attr.push(linen[headings[x][0]]);
                                                attr.push("</li>");
                                            }
                                            attr.push("</ol>");
                                        } else {
                                            attr.push("<h4><strong>0</strong> HTML heading elements</h4>");
                                        }
                                        //missing alt attributes on images
                                        b          = noalt.length;
                                        violations += b;
                                        if (b > 0) {
                                            attr.push("<h4><strong>");
                                            attr.push(b);
                                            attr.push("</strong> image");
                                            if (b > 1) {
                                                attr.push("s");
                                            }
                                            attr.push(" missing a required <em>alt</em> attribute</h4> <p>The alt attribute is required" +
                                                    " even if it contains no value.</p> <ol>");
                                            for (x = 0; x < b; x += 1) {
                                                attr.push("<li><code>");
                                                attr.push(token[noalt[x]].replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"));
                                                attr.push("</code> on input line number ");
                                                attr.push(linen[noalt[x]]);
                                                attr.push("</li>");
                                            }
                                            attr.push("</ol>");
                                        } else {
                                            attr.push("<h4><strong>0</strong> images missing a required <em>alt</em> attribute</h4> <p>" +
                                                    "The alt attribute is required even if it contains no value.</p>");
                                        }
                                        //alt attributes with empty values
                                        b          = emptyalt.length;
                                        violations += b;
                                        if (b > 0) {
                                            attr.push("<h4><strong>");
                                            attr.push(b);
                                            attr.push("</strong> image");
                                            if (b > 1) {
                                                attr.push("s");
                                            }
                                            attr.push(" have an empty <em>alt</em> attribute value</h4> <p>Empty alt text is not necess" +
                                                    "arily a violation, such as the case of tracking pixels. If an image has embedded");
                                            for (x = 0; x < b; x += 1) {
                                                attr.push("<li><code>");
                                                attr.push(token[emptyalt[x]].replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"));
                                                attr.push("</code> on input line number ");
                                                attr.push(linen[emptyalt[x]]);
                                                attr.push("</li>");
                                            }
                                            attr.push("</ol>");
                                        } else {
                                            attr.push("<h4><strong>0</strong> images have an empty <em>alt</em> attribute value</h4>");
                                        }
                                        return attr.join("");
                                    };
                                if (maccessibility === false) {
                                    return "";
                                }
                                findings.push(tagsbyname());
                                return findings.join("");
                            }()),
                            parseErrors   = (function markuppretty__apply_summary_parseErrors() {
                                var x     = parseError.length,
                                    y     = 0,
                                    fails = [];
                                violations += x;
                                if (x === 0) {
                                    return "";
                                }
                                fails.push("<h4><strong>");
                                fails.push(x);
                                fails.push("</strong> errors interpreting markup</h4> <ol>");
                                for (y = 0; y < x; y += 1) {
                                    fails.push("<li>");
                                    fails.push(parseError[y].replace(binfix, "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace("element: ", "element: <code>"));
                                    fails.push("</code></li>");
                                }
                                fails.push("</ol>");
                                return fails.join("");
                            }()),
                            sizes         = (function markuppretty__apply_summary_sizes() {
                                var table      = [],
                                    insize     = msource.length,
                                    outlines   = output.split("\n").length,
                                    outsize    = output.length,
                                    linechange = (outlines / line) * 100,
                                    charchange = (outsize / insize) * 100;
                                table.push("<h4>Data sizes</h4>");
                                table.push("<table class='analysis' summary='Data sizes'><caption>This table shows changes i" +
                                        "n sizes of the data due to beautification.</caption>");
                                table.push("<thead><tr><th>Data figure</th><th>Input</th><th>Output</th><th>Percent change</" +
                                        "th></tr></thead><tbody>");
                                table.push("<tr><th>Lines of code</th><td>");
                                table.push(numformat(line));
                                table.push("</td><td>");
                                table.push(numformat(outlines));
                                table.push("</td><td>");
                                table.push(linechange.toFixed(2));
                                table.push("%</td></tr>");
                                table.push("<tr><th>Character size</th><td>");
                                table.push(numformat(insize));
                                table.push("</td><td>");
                                table.push(numformat(outsize));
                                table.push("</td><td>");
                                table.push(charchange.toFixed(2));
                                table.push("%</td></tr>");
                                table.push("</tbody></table>");
                                return table.join("");
                            }()),
                            statistics    = (function markuppretty__apply_summary_statistics() {
                                var stat       = [],
                                    totalItems = stats.cdata[0] + stats.comment[0] + stats.content[0] + stats.end[0] + stats.ignore[0] + stats.script[0] + stats.sgml[0] + stats.singleton[0] + stats.start[0] + stats.style[0] + stats.template[0] + stats.text[0] + stats.xml[0],
                                    totalSizes = stats.cdata[1] + stats.comment[1] + stats.content[1] + stats.end[1] + stats.ignore[1] + stats.script[1] + stats.sgml[1] + stats.singleton[1] + stats.start[1] + stats.style[1] + stats.template[1] + stats.text[1] + stats.xml[1],
                                    rowBuilder = function markuppretty__apply_summary_stats_rowBuilder(type) {
                                        var itema = (type === "Total*")
                                                ? totalItems
                                                : stats[type][0],
                                            itemb = (type === "Total*")
                                                ? totalSizes
                                                : stats[type][1],
                                            ratio = 0;
                                        stat.push("<tr><th>");
                                        stat.push(type);
                                        if (itema > 0 && (type === "script" || type === "style")) {
                                            stat.push("**");
                                        }
                                        stat.push("</th><td");
                                        if (startend !== 0 && (type === "start" || type === "end")) {
                                            stat.push(" class=\"bad\"");
                                        }
                                        stat.push(">");
                                        stat.push(itema);
                                        stat.push("</td><td>");
                                        ratio = ((itema / totalItems) * 100);
                                        stat.push(ratio.toFixed(2));
                                        stat.push("%</td><td>");
                                        stat.push(itemb);
                                        stat.push("</td><td");
                                        if (itema > 0 && (type === "script" || type === "style")) {
                                            stat.push(" class='bad'");
                                        }
                                        stat.push(">");
                                        ratio = ((itemb / totalSizes) * 100);
                                        stat.push(ratio.toFixed(2));
                                        stat.push("%</td></tr>");
                                    };
                                stat.push("<h4>Statistics and analysis of parsed code</h4>");
                                stat.push("<table class='analysis' summary='Statistics'><caption>This table provides basic " +
                                        "statistics about the parsed components of the given code sample after beautifica" +
                                        "tion.</caption>");
                                stat.push("<thead><tr><th>Item type</th><th>Number of instances</th><th>Percentage of total" +
                                        " items</th><th>Character size</th><th>Percentage of total size</th></tr></thead>");
                                stat.push("<tbody>");
                                rowBuilder("Total*");
                                rowBuilder("cdata");
                                rowBuilder("comment");
                                rowBuilder("content");
                                rowBuilder("end");
                                rowBuilder("ignore");
                                rowBuilder("script");
                                rowBuilder("sgml");
                                rowBuilder("singleton");
                                rowBuilder("start");
                                rowBuilder("style");
                                rowBuilder("template");
                                rowBuilder("text");
                                rowBuilder("xml");
                                stat.push("<tr><th>space between tags***</th><td colspan='4'>");
                                stat.push(stats.space);
                                stat.push("</td></tr>");
                                stat.push("</tbody></table> ");
                                stat.push("<p>* Totals are accounted for parsed code/content tokens only and not extraneous" +
                                        " space for beautification.</p> ");
                                stat.push("<p>** Script and Style code is measured with minimal white space.</p>");
                                stat.push("<p>*** This is space that is not associated with text, tags, script, or css.</p>" +
                                        " ");
                                return stat.join("");
                            }()),
                            zipf          = (function markuppretty__apply_summary_zipf() {
                                var x          = 0,
                                    ratio      = 0,
                                    wordlen    = 0,
                                    wordcount  = 0,
                                    word       = "",
                                    wordlist   = [],
                                    wordtotal  = [],
                                    wordproper = [],
                                    zipfout    = [],
                                    identical  = true,
                                    sortchild  = function markuppretty__apply_summary_zipf_sortchild(y, z) {
                                        return z[0] - y[0];
                                    };
                                for (x = x; x < len; x += 1) {
                                    if (types[x] === "content") {
                                        wordlist.push(token[x]);
                                    }
                                }
                                wordlist = safeSort(wordlist.join(" ").replace(binfix, "").toLowerCase().replace(/&nbsp;/gi, " ").replace(/(,|\.|\?|!|:|\(|\)|"|\{|\}|\[|\])/g, "").replace(/\s+/g, " ").replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").split(" "));
                                wordlen  = wordlist.length;
                                for (x = 0; x < wordlen; x += 1) {
                                    word = wordlist[x];
                                    if (word.length > 2 && word.length < 30 && (/&#?\w+;/).test(word) === false && word !== "the" && word !== "and" && word !== "for" && word !== "are" && word !== "this" && word !== "from" && word !== "with" && word !== "that" && word !== "to") {
                                        if (wordproper.length === 0 || word !== wordproper[wordproper.length - 1][1]) {
                                            wordproper.push([
                                                1, word
                                            ]);
                                        } else {
                                            wordproper[wordproper.length - 1][0] += 1;
                                        }
                                    }
                                    if (word !== wordlist[x - 1]) {
                                        wordtotal.push([
                                            1, word
                                        ]);
                                    } else {
                                        wordtotal[wordtotal.length - 1][0] += 1;
                                    }
                                }
                                wordtotal  = wordtotal.sort(sortchild).slice(0, 11);
                                wordproper = wordproper.sort(sortchild).slice(0, 11);
                                wordlen    = (wordproper.length > 10)
                                    ? 11
                                    : wordproper.length;
                                for (x = 0; x < wordlen; x += 1) {
                                    if (wordtotal[x][1] !== wordproper[x][1]) {
                                        identical = false;
                                        break;
                                    }
                                }
                                wordlen = (wordtotal.length > 10)
                                    ? 10
                                    : wordtotal.length;
                                if (wordlen > 1) {
                                    wordcount = wordlist.length;
                                    zipfout.push("<h4>Zipf's Law analysis of content</h4>");
                                    zipfout.push("<table class='analysis' summary='Zipf&#39;s Law'><caption>This table demonstrate" +
                                            "s <em>Zipf&#39;s Law</em> by listing the 10 most occuring words in the content a" +
                                            "nd the number of times they occurred.</caption>");
                                    zipfout.push("<thead><tr><th>Word Rank</th><th>Most Occurring Word by Rank</th><th>Number of I" +
                                            "nstances</th><th>Ratio Increased Over Next Most Frequence Occurance</th><th>Perc" +
                                            "entage from ");
                                    zipfout.push(wordcount);
                                    zipfout.push(" total words</th></tr></thead><tbody>");
                                    if (identical === false) {
                                        zipfout.push("<tr><th colspan='5'>Unfiltered Word Set</th></tr>");
                                    }
                                    for (x = 0; x < wordlen; x += 1) {
                                        ratio = (wordtotal[x + 1] !== undefined)
                                            ? (wordtotal[x][0] / wordtotal[x + 1][0])
                                            : 1;
                                        zipfout.push("<tr><td>");
                                        zipfout.push(x + 1);
                                        zipfout.push("</td><td>");
                                        zipfout.push(wordtotal[x][1]);
                                        zipfout.push("</td><td>");
                                        zipfout.push(wordtotal[x][0]);
                                        zipfout.push("</td><td>");
                                        zipfout.push(ratio.toFixed(2));
                                        zipfout.push("</td><td>");
                                        ratio = ((wordtotal[x][0] / wordcount) * 100);
                                        zipfout.push(ratio.toFixed(2));
                                        zipfout.push("%</td></tr>");
                                    }
                                    wordlen = (wordproper.length > 10)
                                        ? 10
                                        : wordproper.length;
                                    if (wordlen > 1 && identical === false) {
                                        zipfout.push("<tr><th colspan='5'>Filtered Word Set</th></tr>");
                                        for (x = 0; x < wordlen; x += 1) {
                                            ratio = (wordproper[x + 1] !== undefined)
                                                ? (wordproper[x][0] / wordproper[x + 1][0])
                                                : 1;
                                            zipfout.push("<tr><td>");
                                            zipfout.push(x + 1);
                                            zipfout.push("</td><td>");
                                            zipfout.push(wordproper[x][1]);
                                            zipfout.push("</td><td>");
                                            zipfout.push(wordproper[x][0]);
                                            zipfout.push("</td><td>");
                                            zipfout.push(ratio.toFixed(2));
                                            zipfout.push("</td><td>");
                                            ratio = ((wordproper[x][0] / wordcount) * 100);
                                            zipfout.push(ratio.toFixed(2));
                                            zipfout.push("%</td></tr>");
                                        }
                                    }
                                    zipfout.push("</tbody></table>");
                                }
                                return zipfout.join("");
                            }());
                        if (startend > 0) {
                            sum.push("<p><strong>");
                            sum.push(startend);
                            sum.push(" more start tag");
                            if (startend > 1) {
                                sum.push("s");
                            }
                            sum.push(" than end tags!</strong></p>");
                        } else if (startend < 0) {
                            startend = startend * -1;
                            sum.push("<p><strong>");
                            sum.push(startend);
                            sum.push(" more end tag");
                            if (startend > 1) {
                                sum.push("s");
                            }
                            sum.push(" than start tags!</strong></p>");
                        }
                        sum.push("<p><strong>Total number of HTTP requests (presuming HTML or XML Schema):</strong" +
                                "> <em>");
                        sum.push(reqs.length);
                        sum.push("</em></p>");
                        sum.push("<div class='doc'>");
                        sum.push(analysis(ids));
                        sum.push(sizes);
                        sum.push(parseErrors);
                        sum.push(accessibility);
                        sum.push(statistics);
                        sum.push(analysis(reqs));
                        sum.push(zipf);
                        sum.push("</div>");
                        if (maccessibility === true) {
                            return sum.join("").replace("<div class='doc'>", "<p><strong>Total potential accessibility violations:</strong> <em>" + violations + "</em></p> <div class='doc'>");
                        }
                        return sum.join("");
                    }());
                }
                return output;
            }());
        };
        return core(api);
    },
    //the edition values use the format YYMMDD for dates.
    edition = {
        addon        : {
            ace: 150519
        },
        api          : {
            dom      : 150708, //dom.js
            nodeLocal: 150708, //node-local.js
            wsh      : 150708
        },
        charDecoder  : 141025,
        css          : 150525, //diffview.css file
        csspretty    : 150708, //csspretty library
        csvbeauty    : 140114, //csvbeauty library
        csvmin       : 131224, //csvmin library
        diffview     : 150708, //diffview library
        documentation: 150629, //documentation.xhtml
        jspretty     : 150708, //jspretty library
        latest       : 0,
        markuppretty : 150708, //markuppretty library
        prettydiff   : 150708, //this file
        version      : "1.12.12", //version number
        webtool      : 150708
    };
edition.latest = (function edition_latest() {
    "use strict";
    return Math.max(edition.charDecoder, edition.css, edition.csspretty, edition.csvbeauty, edition.csvmin, edition.diffview, edition.documentation, edition.jspretty, edition.markuppretty, edition.prettydiff, edition.webtool, edition.api.dom, edition.api.nodeLocal, edition.api.wsh);
}());
if (typeof exports === "object" || typeof exports === "function") { //commonjs and nodejs support
    exports.edition = edition;
    exports.api     = function commonjs(x) {
        "use strict";
        return prettydiff(x);
    };
} else if (typeof define === "object" || typeof define === "function") { //requirejs support
    define(function requirejs(require, exports) {
        "use strict";
        exports.edition = edition;
        exports.api     = function requirejs_export(x) {
            return prettydiff(x);
        }; //worthless if block to appease RequireJS and JSLint
        if (typeof require === "number") {
            return require;
        }
        return exports.api;
    });
}
