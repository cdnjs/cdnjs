/*prettydiff.com api.topcoms: true, api.insize: 4, api.inchar: " ", api.vertical: true */
/*global __dirname, ace, csspretty, csvpretty, define, diffview, exports, global, jspretty, markuppretty, process, require, safeSort */
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

if (typeof require === "function" && typeof ace !== "object") {
    (function glib_prettydiff() {
        "use strict";
        var localPath = (typeof process === "object" && process.cwd() === "/" && typeof __dirname === "string")
            ? __dirname
            : ".";
        if (global.csspretty === undefined) {
            global.csspretty = require(localPath + "/lib/csspretty.js").api;
        }
        if (global.csvpretty === undefined) {
            global.csvpretty = require(localPath + "/lib/csvpretty.js").api;
        }
        if (global.diffview === undefined) {
            global.diffview = require(localPath + "/lib/diffview.js").api;
        }
        if (global.jspretty === undefined) {
            global.jspretty = require(localPath + "/lib/jspretty.js").api;
        }
        if (global.markuppretty === undefined) {
            global.markuppretty = require(localPath + "/lib/markuppretty.js").api;
        }
        if (global.safeSort === undefined) {
            global.safeSort = require(localPath + "/lib/safeSort.js").api;
        }
    }());
} else {
    global.csspretty    = csspretty;
    global.csvpretty    = csvpretty;
    global.diffview     = diffview;
    global.jspretty     = jspretty;
    global.markuppretty = markuppretty;
    global.safeSort     = safeSort;
}
var prettydiff = function prettydiff_(api) {
    "use strict";
    var startTime = (typeof Date.now === "function")
            ? Date.now()
            : (function prettydiff__dateShim() {
                var dateItem = new Date;
                return Date.parse(dateItem);
            }()),
        core      = function core_(api) {
            var spacetest   = (/^\s+$/g),
                apioutput   = "",
                apidiffout  = "",
                builder     = {},
                setlangmode = function core__langkey_setlangmode(input) {
                    if (input === "css" || input === "less" || input === "scss") {
                        return "css";
                    }
                    if (input.indexOf("html") > -1 || input === "html" || input === "ejs" || input === "html_ruby" || input === "handlebars" || input === "swig" || input === "twig" || input === "php" || input === "dustjs") {
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
                nameproper  = function core__langkey_nameproper(input) {
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
                options     = {
                    //determines api source as necessary to make a decision about whether to supply
                    //externally needed JS functions to reports
                    accessibility : (api.accessibility === true || api.accessibility === "true"),
                    api           : (api.api === undefined || api.api.length === 0)
                        ? ""
                        : api.api,
                    //braceline - should a new line pad the interior of blocks (curly braces) in
                    //JavaScript
                    braceline     : (api.braceline === true || api.braceline === "true"),
                    //bracepadding - should curly braces be padded with a space in JavaScript?
                    bracepadding  : (api.bracepadding === true || api.bracepadding === "true"),
                    //indent - should JSPretty format JavaScript in the normal KNR style or push
                    //curly braces onto a separate line like the "allman" style
                    braces        : (api.braces === "allman")
                        ? "allman"
                        : "knr",
                    //comments - if comments should receive indentation or not
                    comments      : (api.comments === "noindent")
                        ? "noindent"
                        : ((api.comments === "nocomment")
                            ? "nocomment"
                            : "indent"),
                    //commline - If in markup a newline should be forced above comments
                    commline      : (api.commline === true || api.commline === "true"),
                    //conditional - should IE conditional comments be preserved during markup
                    //minification
                    conditional   : (api.conditional === true || api.conditional === "true"),
                    //content - should content be normalized during a diff operation
                    content       : (api.content === true || api.content === "true"),
                    //context - should the diff report only include the differences, if so then
                    //buffered by how many lines of code
                    context       : (api.context === "" || (/^(\s+)$/).test(api.context) || isNaN(api.context))
                        ? ""
                        : Number(api.context),
                    //correct - should JSPretty make some corrections for sloppy JS
                    correct       : (api.correct === true || api.correct === "true"),
                    //cssinsertlines = if a new line should be forced between each css block
                    cssinsertlines: (api.cssinsertlines === true || api.cssinsertlines === "true"),
                    //csvchar - what character should be used as a separator
                    csvchar       : (typeof api.csvchar === "string" && api.csvchar.length > 0)
                        ? api.csvchar
                        : ",",
                    //diff - source code to compare with
                    diff          : (typeof api.diff === "string" && api.diff.length > 0 && (/^(\s+)$/).test(api.diff) === false)
                        ? api.diff
                        : "",
                    //diffcli - if operating from Node.js and set to true diff output will be
                    //printed to stdout just like git diff
                    diffcli       : (api.diffcli === true || api.diffcli === "true"),
                    //diffcomments - should comments be included in the diff operation
                    diffcomments  : (api.diffcomments === true || api.diffcomments === "true"),
                    //difflabel - a text label to describe the diff code
                    difflabel     : (typeof api.difflabel === "string" && api.difflabel.length > 0)
                        ? api.difflabel
                        : "new",
                    //diffview - should the diff report be a single column showing both sources
                    //simultaneously "inline" or showing the sources in separate columns
                    //"sidebyside"
                    diffview      : (api.diffview === "inline")
                        ? "inline"
                        : "sidebyside",
                    //dustjs - support for this specific templating scheme
                    dustjs        : (api.dustjs === true || api.dustjs === "true"),
                    //elseline - for the 'else' keyword onto a new line in JavaScript
                    elseline      : (api.elseline === true || api.elseline === "true"),
                    //endcomma - if a trailing comma should be injected at the end of arrays and
                    //object literals in JavaScript
                    endcomma      : (api.endcomma === true || api.endcomma === "true"),
                    //force_indent - should markup beautification always force indentation even if
                    //disruptive
                    force_indent  : (api.force_indent === true || api.force_indent === "true"),
                    //html - should markup be presumed to be HTML with all the aloppiness HTML
                    //allows
                    html          : (api.html === true || api.html === "true" || (typeof api.html === "string" && api.html === "html-yes")),
                    //inchar - what character should be used to create a single identation
                    inchar        : (typeof api.inchar === "string" && api.inchar.length > 0)
                        ? api.inchar
                        : " ",
                    //inlevel - should indentation in JSPretty be buffered with additional
                    //indentation?  Useful when supplying code to sites accepting markdown
                    inlevel       : (isNaN(api.inlevel) || Number(api.inlevel) < 1)
                        ? 0
                        : Number(api.inlevel),
                    //insize - how many characters from api.inchar should constitute a single
                    //indentation
                    insize        : (isNaN(api.insize))
                        ? 4
                        : Number(api.insize),
                    //jsscope - do you want to enable the jsscope feature of JSPretty?  This feature
                    //will output formatted HTML instead of text code showing which variables are
                    //declared at which functional depth
                    jsscope       : (api.jsscope === true || api.jsscope === "true")
                        ? "report"
                        : (api.jsscope !== "html" && api.jsscope !== "report")
                            ? "none"
                            : api.jsscope,
                    //lang - which programming language will we be analyzing
                    lang          : (typeof api.lang === "string" && api.lang !== "auto")
                        ? setlangmode(api.lang.toLowerCase())
                        : "auto",
                    //langdefault - what language should lang value "auto" resort to when it cannot
                    //determine the language
                    langdefault   : (typeof api.langdefault === "string")
                        ? setlangmode(api.langdefault.toLowerCase())
                        : "text",
                    //methodchain - if JavaScript method chains should be strung onto a single line
                    //instead of indented
                    methodchain   : (api.methodchain === true || api.methodchain === "true"),
                    //miniwrap - when language is JavaScript and mode is 'minify' if option 'jwrap'
                    //should be applied to all code
                    miniwrap      : (api.miniwrap === true || api.miniwrap === "true"),
                    //mode - is this a minify, beautify, or diff operation
                    mode          : (typeof api.mode === "string" && (api.mode === "minify" || api.mode === "beautify" || api.mode === "parse"))
                        ? api.mode
                        : "diff",
                    //noleadzero - in CSS removes and prevents a run of 0s from appearing
                    //immediately before a value's decimal.
                    noleadzero    : (api.noleadzero === true || api.noleadzero === "true"),
                    //objsort will alphabetize object keys in JavaScript
                    objsort       : (api.objsort === "all"),
                    //preserve - should empty lines be preserved in beautify operations of JSPretty?
                    preserve      : (api.preserve === "all"),
                    //quote - should all single quote characters be converted to double quote
                    //characters during a diff operation to reduce the number of false positive
                    //comparisons
                    quote         : (api.quote === true || api.quote === "true"),
                    //quoteConvert - convert " to ' (or ' to ") of string literals or markup
                    //attributes
                    quoteConvert  : (api.quoteConvert === "single" || api.quoteConvert === "double")
                        ? api.quoteConvert
                        : "none",
                    //semicolon - should trailing semicolons be removed during a diff operation to
                    //reduce the number of false positive comparisons
                    semicolon     : (api.semicolon === true || api.semicolon === "true"),
                    //source - the source code in minify and beautify operations or "base" code in
                    //operations
                    source        : (typeof api.source === "string" && api.source.length > 0 && (/^(\s+)$/).test(api.source) === false)
                        ? api.source
                        : "",
                    //sourcelabel - a text label to describe the api.source code for the diff report
                    sourcelabel   : (typeof api.sourcelabel === "string" && api.sourcelabel.length > 0)
                        ? api.sourcelabel
                        : "base",
                    //space - should JSPretty include a space between a function keyword and the
                    //next adjacent opening parenthesis character in beautification operations
                    space         : (api.space !== false && api.space !== "false"),
                    //spaceclose - If markup self-closing tags should end with " />" instead of "/>"
                    spaceclose    : (api.spaceclose === true || api.spaceclose === "true"),
                    //style - should JavaScript and CSS code receive indentation if embedded inline
                    //in markup
                    style         : (api.style === "noindent")
                        ? "noindent"
                        : "indent",
                    //styleguide - preset of beautification options to bring a JavaScript sample
                    //closer to conformance of a given style guide
                    styleguide    : (typeof api.styleguide === "string")
                        ? api.styleguide
                        : "",
                    //tagmerge - Allows combining immediately adjacent start and end tags of the
                    //same name into a single self-closing tag:  <a href="home"></a> into
                    //<a//href="home"/>
                    tagmerge      : (api.tagmerge === true || api.tagmerge === "true"),
                    //sort markup child nodes alphabetically
                    tagsort       : (api.tagsort === true || api.tagsort === "true"),
                    //textpreserve - Force the markup beautifier to retain text (white space and
                    //all) exactly as provided.
                    textpreserve  : (api.textpreserve === true || api.textpreserve === "true"),
                    //titanium - TSS document support via option, because this is a uniquely
                    //modified form of JSON
                    titanium      : (api.titanium === true || api.titanium === "true"),
                    //topcoms - should comments at the top of a JavaScript or CSS source be
                    //preserved during minify operations
                    topcoms       : (api.topcoms === true || api.topcoms === "true"),
                    //varword - should consecutive variables be merged into a comma separated list
                    //or the opposite
                    varword       : (api.varword === "each" || api.varword === "list")
                        ? api.varword
                        : "none",
                    //vertical - whether or not to vertically align lists of assigns in CSS and
                    //JavaScript
                    vertical      : (api.vertical === "all"),
                    //wrap - in markup beautification should text content wrap after the first
                    //complete word up to a certain character length
                    wrap          : (isNaN(api.wrap) === true)
                        ? 80
                        : Number(api.wrap)
                },
                autoval     = [],
                autostring  = "",
                auto        = function core__auto(a) {
                    var b      = [],
                        c      = 0,
                        d      = 0,
                        join   = "",
                        flaga  = false,
                        flagb  = false,
                        output = function core__langkey_auto_output(langname) {
                            if (langname === "unknown") {
                                return [options.langdefault, setlangmode(options.langdefault), "unknown"];
                            }
                            if (langname === "xhtml") {
                                return ["xml", "html", "XHTML"];
                            }
                            if (langname === "tss") {
                                return ["tss", "tss", "Titanium Stylesheets"];
                            }
                            return [langname, setlangmode(langname), nameproper(langname)];
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
                    b = a.replace(/\[[a-zA-Z][\w\-]*\=("|')?[a-zA-Z][\w\-]*("|')?\]/g, "")
                        .split("");
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
                        if ((/((\}?(\(\))?\)*;?\s*)|([a-z0-9]("|')?\)*);?(\s*\})*)$/i).test(a) === true && ((/(var\s+(\w|\$)+[a-zA-Z0-9]*)/).test(a) === true || (/console\.log\(/).test(a) === true || (/document\.get/).test(a) === true || (/((\=|(\$\())\s*function)|(\s*function\s+(\w*\s+)?\()/).test(a) === true || a.indexOf("{") === -1 || (/^(\s*if\s+\()/).test(a) === true)) {
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
                    if ((((/(>[\w\s:]*)?<(\/|!)?[\w\s:\-\[]+/).test(a) === true || (/^(\s*<\?xml)/).test(a) === true) && ((/^([\s\w]*<)/).test(a) === true || (/(>[\s\w]*)$/).test(a) === true)) || ((/^(\s*<s((cript)|(tyle)))/i).test(a) === true && (/(<\/s((cript)|(tyle))>\s*)$/i).test(a) === true)) {
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
                            if ((/\{(#|\?|\^|@|<|\+|~)/).test(a) === true && (/\{\//).test(a) === true) {
                                return output("dustjs");
                            }
                            return output("html");
                        }
                        if ((/<jsp:include\s/).test(a) === true || (/<c:((set)|(if))\s/).test(a) === true) {
                            return output("jsp");
                        }
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
                            return output("xml");
                        }
                        if ((/\s?\{%/).test(a) === true && (/\{\{(?!(\{|#|\=))/).test(a) === true) {
                            return output("twig");
                        }
                        if ((/<\?(?!(xml))/).test(a) === true) {
                            return output("php");
                        }
                        if ((/\{(#|\?|\^|@|<|\+|~)/).test(a) === true && (/\{\//).test(a) === true) {
                            return output("dustjs");
                        }
                        if ((/<jsp:include\s/).test(a) === true || (/<c:((set)|(if))\s/).test(a) === true) {
                            return output("jsp");
                        }
                        return output("xml");
                    }
                    return output("unknown");
                },
                proctime    = function core__proctime() {
                    var minuteString = "",
                        hourString   = "",
                        minutes      = 0,
                        hours        = 0,
                        elapsed      = (typeof Date.now === "function")
                            ? ((Date.now() - startTime) / 1000)
                            : (function core__proctime_dateShim() {
                                var dateitem = new Date;
                                return Date.parse(dateitem);
                            }()),
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
                pdcomment   = function core__pdcomment() {
                    var comment    = "",
                        a          = 0,
                        b          = options.source.length,
                        c          = options.source
                            .indexOf("/*prettydiff.com") + 16,
                        difftest   = false,
                        build      = [],
                        comma      = -1,
                        g          = 0,
                        sourceChar = [],
                        quote      = "",
                        sind       = options.source
                            .indexOf("/*prettydiff.com"),
                        dind       = options.diff
                            .indexOf("/*prettydiff.com");
                    if ((options.source.charAt(c - 17) === "\"" && options.source.charAt(c) === "\"") || (sind < 0 && dind < 0)) {
                        return;
                    }
                    if (sind > -1 && (/^(\s*\{\s*"token"\s*:\s*\[)/).test(options.source) === true && (/\],\s*"types"\s*:\s*\[/).test(options.source) === true) {
                        return;
                    }
                    if (sind < 0 && dind > -1 && (/^(\s*\{\s*"token"\s*:\s*\[)/).test(options.diff) === true && (/\],\s*"types"\s*:\s*\[/).test(options.diff) === true) {
                        return;
                    }
                    if (c === 15 && typeof options.diff === "string") {
                        c        = options.diff
                            .indexOf("/*prettydiff.com") + 16;
                        difftest = true;
                    } else if (c === 15) {
                        return;
                    }
                    for (c = c; c < b; c += 1) {
                        if (difftest === false) {
                            if (options.source.charAt(c) === "*" && options.source.charAt(c + 1) === "/") {
                                break;
                            }
                            sourceChar.push(options.source.charAt(c));
                        } else {
                            if (options.diff.charAt(c) === "*" && options.diff.charAt(c + 1) === "/") {
                                break;
                            }
                            sourceChar.push(options.diff.charAt(c));
                        }
                    }
                    comment = sourceChar.join("")
                        .toLowerCase();
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
                            if (build[c][0] === "braces" || build[c][0] === "indent") {
                                if (build[c][1] === "knr") {
                                    options.braces = "knr";
                                } else if (build[c][1] === "allman") {
                                    options.braces = "allman";
                                }
                            } else if (build[c][0] === "comments") {
                                if (build[c][1] === "indent") {
                                    options.comments = "indent";
                                } else if (build[c][1] === "noindent") {
                                    options.comments = "noindent";
                                }
                            } else if (build[c][0] === "diffview") {
                                if (build[c][1] === "sidebyside") {
                                    options.diffview = "sidebyside";
                                } else if (build[c][1] === "inline") {
                                    options.diffview = "inline";
                                }
                            } else if (build[c][0] === "lang" || build[c][0] === "langdefault") {
                                options[build[c][0]] = setlangmode(build[c][1]);
                            } else if (build[c][0] === "mode") {
                                if (build[c][1] === "beautify") {
                                    options.mode = "beautify";
                                } else if (build[c][1] === "minify") {
                                    options.mode = "minify";
                                } else if (build[c][1] === "diff") {
                                    options.mode = "diff";
                                } else if (build[c][1] === "parse") {
                                    options.mode = "parse";
                                }
                            } else if (build[c][0] === "quoteConvert") {
                                if (build[c][1] === "single") {
                                    options.quoteConvert = "single";
                                } else if (build[c][1] === "double") {
                                    options.quoteConvert = "double";
                                } else if (build[c][1] === "none") {
                                    options.quoteConvert = "none";
                                }
                            } else if (build[c][0] === "style") {
                                if (build[c][1] === "indent") {
                                    options.style = "indent";
                                } else if (build[c][1] === "noindent") {
                                    options.style = "noindent";
                                }
                            } else if (build[c][0] === "varword") {
                                if (build[c][1] === "each") {
                                    options.varword = "each";
                                } else if (build[c][1] === "list") {
                                    options.varword = "list";
                                } else if (build[c][1] === "none") {
                                    options.varword = "none";
                                }
                            } else if (options[build[c][0]] !== undefined) {
                                if (build[c][1] === "true") {
                                    options[build[c][0]] = true;
                                } else if (build[c][1] === "false") {
                                    options[build[c][0]] = false;
                                } else if (isNaN(build[c][1]) === false) {
                                    options[build[c][0]] = Number(build[c][1]);
                                } else {
                                    options[build[c][0]] = build[c][1];
                                }
                            }
                        }
                    }
                };
            pdcomment();
            if (api.preserve === true || api.preserve === "true") {
                options.preserve = true;
            }
            if (api.alphasort === true || api.alphasort === "true" || api.objsort === true || api.objsort === "true") {
                options.objsort = true;
            }
            if (api.indent === "allman") {
                options.braces = "allman";
            }
            if (api.vertical === true || api.vertical === "true") {
                options.vertical = true;
            }
            if (options.source === "") {
                return ["Error: Source sample is missing.", ""];
            }
            if (options.mode === "diff") {
                if (options.diff === "Diff sample is missing.") {
                    return ["Error: Diff sample is missing.", ""];
                }
                if (options.lang === "csv") {
                    options.lang = "text";
                }
            }
            if (options.lang === "auto") {
                autoval      = auto(options.source);
                options.lang = autoval[1];
                if (autoval[2] === "unknown") {
                    autostring = "<p>Code type set to <strong>auto</strong>, but language could not be determined." +
                            " Language defaulted to <em>" + autoval[0] + "</em>.</p>";
                } else {
                    autostring = "<p>Code type set to <strong>auto</strong>. Presumed language is <em>" + autoval[2] + "</em>.</p>";
                }
            } else if (options.api === "dom") {
                autoval    = [
                    options.lang, options.lang, options.lang
                ];
                autostring = "<p>Code type is set to <strong>" + options.lang + "</strong>.</p>";
            } else {
                options.lang = setlangmode(options.lang);
                autostring   = "<p>Code type is set to <strong>" + options.lang + "</strong>.</p>";
            }
            if (autoval[0] === "dustjs") {
                options.dustjs = true;
            }
            if (options.lang === "html") {
                options.html = true;
                options.lang = "markup";
            } else if (options.lang === "tss" || options.lang === "titanium") {
                options.titanium = true;
                options.lang     = "javscript";
            }
            if (options.lang === "css") {
                if (api.objsort === "css" || api.objsort === "cssonly") {
                    options.objsort = true;
                }
                if (api.preserve === "css" || api.preserve === "cssonly") {
                    options.preserve = true;
                }
                if (api.vertical === "css" || api.vertical === "cssonly") {
                    options.vertical = true;
                }
            }
            if (options.lang === "js") {
                if (api.objsort === "js" || api.objsort === "jsonly") {
                    options.objsort = true;
                }
                if (api.preserve === "js" || api.preserve === "jsonly") {
                    options.preserve = true;
                }
                if (api.vertical === "js" || api.vertical === "jsonly") {
                    options.vertical = true;
                }
            }
            if (options.mode === "minify") {
                if (options.lang === "css") {
                    apioutput = global.csspretty(options);
                } else if (options.lang === "csv") {
                    apioutput = global.csvpretty(options);
                } else if (options.lang === "markup") {
                    apioutput = global.markuppretty(options);
                } else if (options.lang === "text") {
                    apioutput  = options.source;
                    apidiffout = "";
                } else {
                    apioutput = global.jspretty(options);
                }
                return (function core__minifyReport() {
                    var sizediff = function core__minifyReport_score() {
                        var a                 = 0,
                            lines             = 0,
                            source            = options.source,
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
                        if (global.report.indexOf("<p id='jserror'>") === 0) {
                            output.push(global.report);
                        } else if (global.report !== "") {
                            output.push("<p><strong class='duplicate'>Duplicate id attribute values detected:</strong> " + global.report + "</p>");
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
                    if (global.jsxstatus === true) {
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
            if (options.mode === "parse") {
                if (options.lang === "css") {
                    apioutput = global.csspretty(options);
                } else if (options.lang === "csv") {
                    apioutput = global.csvpretty(options);
                } else if (options.lang === "markup") {
                    apioutput  = global.markuppretty(options);
                    autostring = autostring + global.report;
                } else if (options.lang === "text") {
                    apioutput  = options.source;
                    apidiffout = "";
                } else {
                    apioutput = global.jspretty(options);
                }
                if (apidiffout === false) {
                    apidiffout = "";
                }
                if (global.jsxstatus === true) {
                    autostring = "<p>Code type is presumed to be <em>React JSX</em>.</p>";
                }
                if (apioutput.token !== undefined) {
                    autostring = autostring + "<p>Total tokens: <strong>" + apioutput.token.length + "</strong></p>";
                }
                return [
                    apioutput, autostring + proctime()
                ];
            }
            if (options.mode === "beautify") {
                if (options.lang === "css") {
                    apioutput  = global.csspretty(options);
                    apidiffout = global.report;
                } else if (options.lang === "csv") {
                    apioutput  = global.csvpretty(options);
                    apidiffout = global.report;
                } else if (options.lang === "markup") {
                    if (api.vertical === "jsonly") {
                        options.vertical = "jsonly";
                    }
                    apioutput  = global.markuppretty(options);
                    apidiffout = global.report;
                    if (options.inchar !== "\t") {
                        apioutput = apioutput.replace(/\n[\t]*\u0020\/>/g, "");
                    }
                } else if (options.lang === "text") {
                    apioutput  = options.source;
                    apidiffout = "";
                } else {
                    if (api.vertical === "jsonly") {
                        options.vertical = "jsonly";
                    }
                    apioutput  = global.jspretty(options);
                    apidiffout = global.report;
                }
                if (apidiffout === false) {
                    apidiffout = "";
                }
                if (global.jsxstatus === true) {
                    autostring = "<p>Code type is presumed to be <em>React JSX</em>.</p>";
                }
                if (options.api === "" && options.jsscope !== "none" && options.lang === "javascript") {
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
            if (options.mode === "diff") {
                global.report    = "diff";
                options.vertical = false;
                options.jsscope  = false;
                options.preserve = false;
                if (options.diffcomments === false) {
                    options.comments = "nocomment";
                }
                if (options.source === "" || options.diff === "") {
                    return ["", ""];
                }
                if (options.lang === "css") {
                    apioutput      = global.csspretty(options);
                    options.source = options.diff;
                    apidiffout     = global.csspretty(options);
                } else if (options.lang === "csv") {
                    apioutput  = global.csvpretty(options);
                    apidiffout = global.csvpretty(options);
                } else if (options.lang === "markup") {
                    apioutput      = global.markuppretty(options)
                        .replace(/\n[\t]*\ \/>/g, "");
                    options.source = options.diff;
                    apidiffout     = global.markuppretty(options)
                        .replace(/\n[\t]*\ \/>/g, "");
                } else if (options.lang === "text") {
                    apioutput  = options.source;
                    apidiffout = options.diff;
                } else {
                    apioutput      = global.jspretty(options);
                    options.source = options.diff;
                    apidiffout     = global.jspretty(options);
                }
                if (options.quote === true) {
                    apioutput  = apioutput.replace(/'/g, "\"");
                    apidiffout = apidiffout.replace(/'/g, "\"");
                }
                if (options.semicolon === true) {
                    apioutput  = apioutput.replace(/;\n/g, "\n");
                    apidiffout = apidiffout.replace(/;\n/g, "\n");
                }
                if (options.sourcelabel === "" || spacetest.test(options.sourcelabel)) {
                    options.sourcelabel = "Base Text";
                }
                if (options.difflabel === "" || spacetest.test(options.difflabel)) {
                    options.difflabel = "New Text";
                }
                return (function core__diff() {
                    var a     = [],
                        s     = "s",
                        t     = "s",
                        achar = "";
                    if (options.diffcli === true) {
                        return global.diffview({
                            baseTextLines: apioutput,
                            baseTextName : options.sourcelabel,
                            contextSize  : options.context,
                            diffcli      : options.diffcli,
                            inline       : options.diffview,
                            newTextLines : apidiffout,
                            newTextName  : options.difflabel,
                            tchar        : options.inchar,
                            tsize        : options.insize
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
                        if (options.lang !== "text") {
                            achar = options.inchar;
                        }
                        a[1] = global.diffview({
                            baseTextLines: apioutput,
                            baseTextName : options.sourcelabel,
                            contextSize  : options.context,
                            inline       : options.diffview,
                            newTextLines : apidiffout,
                            newTextName  : options.difflabel,
                            tchar        : achar,
                            tsize        : options.insize
                        });
                        if (a[1][2] === 1) {
                            t = "";
                            if (a[1][1] === 0) {
                                s = "";
                            }
                        }
                    }
                    a[0] = "<p><strong>Number of differences:</strong> <em>" + (a[1][1] + a[1][2]) + "</em> difference" + s + " from <em>" + a[1][2] + "</em> line" + t + " of code.</p>";
                    if (global.jsxstatus === true) {
                        autostring = "<p>Code type is presumed to be <em>React JSX</em>.</p>";
                    }
                    if (options.api === "") {
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
                    if (options.mode === "diff") {
                        return [
                            a[1][0], autostring + proctime() + a[0] + " <p>Accessibility note. &lt;em&gt; tags in the output represent character differ" +
                                    "ences per lines compared.</p>"
                        ];
                    }
                    return [
                        a[1][0], autostring + proctime() + a[0] + " <p>Accessibility note. &lt;em&gt; tags in the output represent presentation for" +
                                " variable coloring and scope.</p>"
                    ];
                }());
            }
        };
    return core(api);
};
global.report         = "";
global.edition        = {
    addon        : {
        ace: 150918
    },
    api          : {
        dom      : 151007, //dom.js
        nodeLocal: 151014, //node-local.js
        wsh      : 151003
    },
    css          : 151014, //diffview.css file
    csspretty    : 151003, //csspretty lib
    csvpretty    : 151003, //csvpretty lib
    diffview     : 151003, //diffview lib
    documentation: 151012, //documentation.xhtml
    jspretty     : 151007, //jspretty lib
    latest       : 0,
    markuppretty : 151012, //markuppretty lib
    prettydiff   : 151005, //this file
    safeSort     : 151003, //safeSort lib
    version      : "1.14.8", //version number
    webtool      : 151004
};
global.edition.latest = (function edition_latest() {
    "use strict";
    return Math.max(global.edition.css, global.edition.csspretty, global.edition.csvpretty, global.edition.diffview, global.edition.documentation, global.edition.jspretty, global.edition.markuppretty, global.edition.prettydiff, global.edition.webtool, global.edition.api.dom, global.edition.api.nodeLocal, global.edition.api.wsh);
}());
if (typeof exports === "object" || typeof exports === "function") {
    //commonjs and nodejs support
    exports.report  = global.report;
    exports.edition = global.edition;
    exports.api     = function commonjs(x) {
        "use strict";
        return prettydiff(x);
    };
} else if ((typeof define === "object" || typeof define === "function") && (ace === undefined || ace.createEditSession === undefined)) {
    //requirejs support
    define(function requirejs(require, exports) {
        "use strict";
        exports.global = global;
        exports.api    = function requirejs_export(x) {
            return prettydiff(x);
        };
        //worthless if block to appease RequireJS and JSLint
        if (typeof require === "number") {
            return require;
        }
        return exports.api;
    });
}
