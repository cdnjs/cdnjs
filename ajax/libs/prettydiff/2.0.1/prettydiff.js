/*prettydiff.com topcoms: true, insize: 4, inchar: " ", vertical: true */
/*jshint laxbreak: true*/
/*global __dirname, ace, csspretty, csvpretty, define, diffview, exports, finalFile, global, jspretty, language, markuppretty, process, require, safeSort */
/*

 Execute in a NodeJS app:

    var prettydiff = require("prettydiff"),
        args       = {
            source: "asdf",
            diff  : "asdd",
            lang  : "text"
        },
        output     = prettydiff.api(args);

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


 Join the Pretty Diff mailing list at:
 https://groups.google.com/d/forum/pretty-diff

 Special thanks to:

 * Harry Whitfield for the numerous test cases provided against
 JSPretty.  http://g6auc.me.uk/

 * Andreas Greuel for contributing samples to test diffview.js
 https://plus.google.com/105958105635636993368/posts

 */
if (typeof global.meta !== "object") {
    // schema for global.meta lang - array, language detection time - string,
    // proctime (total execution time minus visual rendering) insize - number, input
    // size outsize - number, output size difftotal - number, difference count
    // difflines - number, difference lines
    global.meta = {
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
if (typeof require === "function" && typeof ace !== "object") {
    (function glib_prettydiff() {
        "use strict";
        var localPath = (typeof process === "object" && typeof process.cwd === "function" && (process.cwd() === "/" || (/^([a-z]:\\)$/).test(process.cwd()) === true) && typeof __dirname === "string")
            ? __dirname
            : ".";
        if (global.language === undefined) {
            global.language = require(localPath + "/lib/language.js").api;
        }
        if (global.finalFile === undefined) {
            global.finalFile = require(localPath + "/lib/finalFile.js").api;
        }
        if (global.safeSort === undefined) {
            global.safeSort = require(localPath + "/lib/safeSort.js").api;
        }
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
    }());
} else {
    global.csspretty    = csspretty;
    global.csvpretty    = csvpretty;
    global.diffview     = diffview;
    global.finalFile    = finalFile;
    global.jspretty     = jspretty;
    global.language     = language;
    global.markuppretty = markuppretty;
    global.safeSort     = safeSort;
}
global.jsxstatus = false;
var prettydiff = function prettydiff_(api) {
    "use strict";
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
                builder      = global.finalFile,
                html         = [
                    builder.html.head, //0
                    builder.css.color.canvas, //1
                    builder.css.color.shadow, //2
                    builder.css.color.white, //3
                    builder.css.reports, //4
                    builder.css.global, //5
                    builder.html.body, //6
                    builder.html.color, //7
                    builder.html.intro, //8
                    "", //9 - for meta analysis, like stats and accessibility
                    "", //10 - for generated report
                    builder.html.script, //11
                    builder.script.minimal, //12
                    builder.html.end //13
                ],
                options      = {
                    // determines api source as necessary to make a decision about whether to supply
                    // externally needed JS functions to reports
                    api            : (api.api === undefined || api.api.length === 0)
                        ? ""
                        : api.api,
                    // braceline - should a new line pad the interior of blocks (curly braces) in
                    // JavaScript
                    braceline      : (api.braceline === true || api.braceline === "true"),
                    //bracepadding - should curly braces be padded with a space in JavaScript?
                    bracepadding   : (api.bracepadding === true || api.bracepadding === "true"),
                    // indent - should JSPretty format JavaScript in the normal KNR style or push
                    // curly braces onto a separate line like the "allman" style
                    braces         : (api.braces === true || api.braces === "true" || api.braces === "allman")
                        ? "allman"
                        : "knr",
                    //color scheme of generated HTML artifacts
                    color          : (api.color === "canvas" || api.color === "shadow")
                        ? api.color
                        : "white",
                    //comments - if comments should receive indentation or not
                    comments       : (api.comments === "noindent")
                        ? "noindent"
                        : ((api.comments === "nocomment")
                            ? "nocomment"
                            : "indent"),
                    //commline - If in markup a newline should be forced above comments
                    commline       : (api.commline === true || api.commline === "true"),
                    // compressedcss - If the beautified CSS should contain minified properties
                    compressedcss  : (api.compressedcss === true || api.compressedcss === "true"),
                    // conditional - should IE conditional comments be preserved during markup
                    // minification
                    conditional    : (api.conditional === true || api.conditional === "true"),
                    //content - should content be normalized during a diff operation
                    content        : (api.content === true || api.content === "true"),
                    // context - should the diff report only include the differences, if so then
                    // buffered by how many lines of code
                    context        : (api.context === "" || (/^(\s+)$/).test(api.context) || isNaN(api.context))
                        ? ""
                        : Number(api.context),
                    //correct - should JSPretty make some corrections for sloppy JS
                    correct        : (api.correct === true || api.correct === "true"),
                    //crlf - if output should use \r\n (Windows compatible) for line termination
                    crlf           : (api.crlf === true || api.crlf === "true"),
                    //cssinsertlines = if a new line should be forced between each css block
                    cssinsertlines : (api.cssinsertlines === true || api.cssinsertlines === "true"),
                    //csvchar - what character should be used as a separator
                    csvchar        : (typeof api.csvchar === "string" && api.csvchar.length > 0)
                        ? api.csvchar
                        : ",",
                    //diff - source code to compare with
                    diff           : (typeof api.diff === "string" && api.diff.length > 0 && (/^(\s+)$/).test(api.diff) === false)
                        ? api.diff
                        : "",
                    // diffcli - if operating from Node.js and set to true diff output will be
                    // printed to stdout just like git diff
                    diffcli        : (api.diffcli === true || api.diffcli === "true"),
                    //diffcomments - should comments be included in the diff operation
                    diffcomments   : (api.diffcomments === true || api.diffcomments === "true"),
                    //difflabel - a text label to describe the diff code
                    difflabel      : (typeof api.difflabel === "string" && api.difflabel.length > 0)
                        ? api.difflabel
                        : "new",
                    // diffspaceignore - If white space differences should be ignored by the diff
                    // tool
                    diffspaceignore: (api.diffspaceignore === true || api.diffspaceignore === "true"),
                    // diffview - should the diff report be a single column showing both sources
                    // simultaneously "inline" or showing the sources in separate columns
                    // "sidebyside"
                    diffview       : (api.diffview === "inline")
                        ? "inline"
                        : "sidebyside",
                    //dustjs - support for this specific templating scheme
                    dustjs         : (api.dustjs === true || api.dustjs === "true"),
                    //elseline - for the 'else' keyword onto a new line in JavaScript
                    elseline       : (api.elseline === true || api.elseline === "true"),
                    // endcomma - if a trailing comma should be injected at the end of arrays and
                    // object literals in JavaScript
                    endcomma       : (api.endcomma === true || api.endcomma === "true"),
                    // force_attribute - forces indentation of all markup attriubtes
                    force_attribute: (api.force_attribute === true || api.force_attribute === "true"),
                    // force_indent - should markup beautification always force indentation even if
                    // disruptive
                    force_indent   : (api.force_indent === true || api.force_indent === "true"),
                    // formatArray - defines whether JavaScript array keys should be indented or kept on a single line
                    formatArray    : (api.formatArray === "indent" || api.formatArray === "inline")
                        ? api.formatArray
                        : "default",
                    // formatObject - defines whether JavaScript object properties should be indented or kept on a single line
                    formatObject   : (api.formatObject === "indent" || api.formatObject === "inline")
                        ? api.formatObject
                        : "default",
                    // html - should markup be presumed to be HTML with all the aloppiness HTML
                    // allows
                    html           : (api.html === true || api.html === "true" || (typeof api.html === "string" && api.html === "html-yes")),
                    //inchar - what character(s) should be used to create a single identation
                    inchar         : (typeof api.inchar === "string" && api.inchar.length > 0)
                        ? api.inchar
                        : " ",
                    // inlevel - should indentation in JSPretty be buffered with additional
                    // indentation?  Useful when supplying code to sites accepting markdown
                    inlevel        : (isNaN(api.inlevel) || Number(api.inlevel) < 1)
                        ? 0
                        : Number(api.inlevel),
                    // insize - how many characters from api.inchar should constitute a single
                    // indentation
                    insize         : (isNaN(api.insize))
                        ? 4
                        : Number(api.insize),
                    // jsscope - do you want to enable the jsscope feature of JSPretty?  This
                    // feature will output formatted HTML instead of text code showing which
                    // variables are declared at which functional depth
                    jsscope        : (api.jsscope === true || api.jsscope === "true")
                        ? "report"
                        : (api.jsscope !== "html" && api.jsscope !== "report")
                            ? "none"
                            : api.jsscope,
                    //lang - which programming language will we be analyzing
                    lang           : (typeof api.lang === "string" && api.lang !== "auto")
                        ? language.setlangmode(api.lang.toLowerCase())
                        : "auto",
                    // langdefault - what language should lang value "auto" resort to when it cannot
                    // determine the language
                    langdefault    : (typeof api.langdefault === "string")
                        ? language.setlangmode(api.langdefault.toLowerCase())
                        : "text",
                    // methodchain - if JavaScript method chains should be strung onto a single line
                    // instead of indented
                    methodchain    : (api.methodchain === "chain" || api.methodchain === "none")
                        ? api.methodchain
                        : "indent",
                    // miniwrap - when language is JavaScript and mode is 'minify' if option 'jwrap'
                    // should be applied to all code
                    miniwrap       : (api.miniwrap === true || api.miniwrap === "true"),
                    //mode - is this a minify, beautify, or diff operation
                    mode           : (api.mode === "minify" || api.mode === "beautify" || api.mode === "parse" || api.mode === "analysis")
                        ? api.mode
                        : "diff",
                    //neverflatten - prevent flattening of destructured lists in JavaScript
                    neverflatten   : (api.neverflatten === true || api.neverflatten === "true"),
                    //nocaseindent - if a 'case' should be indented to its parent 'switch'
                    nocaseindent   : (api.nocaseindent === true || api.nocaseindent === "true"),
                    // nochainindent - prevent indentation when JavaScript chains of methods are
                    // broken onto multiple lines
                    nochainindent  : (api.nochainindent === true || api.nochainindent === "true"),
                    // nodeasync - meta data has to be passed in the output for bulk async
                    // operations otherwise there is cross-talk, which means prettydiff has to return
                    // an array of [data, meta] instead of a single string
                    nodeasync      : (api.nodeasync === true || api.nodeasync === "true"),
                    // nodeerror - nodeonly rule about whether parse errors should be logged to the
                    // console
                    nodeerror      : (api.nodeerror === true || api.nodeerror === "true"),
                    // noleadzero - in CSS removes and prevents a run of 0s from appearing
                    // immediately before a value's decimal.
                    noleadzero     : (api.noleadzero === true || api.noleadzero === "true"),
                    //objsort will alphabetize object keys in JavaScript
                    objsort        : (api.objsort === "all" || api.objsort === "js" || api.objsort === "css" || api.objsort === true || api.objsort === "true")
                        ? api.objsort
                        : "none",
                    //parseFormat - determine how the parse tree should be organized and formatted
                    parseFormat    : (api.parseFormat === "sequential" || api.parseFormat === "htmltable")
                        ? api.parseFormat
                        : "parallel",
                    // parseSpace - whether whitespace tokens between tags should be included in the
                    // parse tree output
                    parseSpace     : (api.parseSpace === true || api.parseSpace === "true"),
                    //preserve - should empty lines be preserved in beautify operations of JSPretty?
                    preserve       : (function core__optionPreserve() {
                        if (api.preserve === 1 || api.preserve === undefined || api.preserve === true || api.preserve === "all" || api.preserve === "js" || api.preserve === "css") {
                            return 1;
                        }
                        if (api.preserve === false || isNaN(api.preserve) === true || Number(api.preserve) < 1 || api.preserve === "none") {
                            return 0;
                        }
                        return Number(api.preserve);
                    }()),
                    // quote - should all single quote characters be converted to double quote
                    // characters during a diff operation to reduce the number of false positive
                    // comparisons
                    quote          : (api.quote === true || api.quote === "true"),
                    // quoteConvert - convert " to ' (or ' to ") of string literals or markup
                    // attributes
                    quoteConvert   : (api.quoteConvert === "single" || api.quoteConvert === "double")
                        ? api.quoteConvert
                        : "none",
                    //selectorlist - should comma separated CSS selector lists be on one line
                    selectorlist   : (api.selectorlist === true || api.selectorlist === "true"),
                    // semicolon - should trailing semicolons be removed during a diff operation to
                    // reduce the number of false positive comparisons
                    semicolon      : (api.semicolon === true || api.semicolon === "true"),
                    // source - the source code in minify and beautify operations or "base" code in
                    // operations
                    source         : (typeof api.source === "string" && api.source.length > 0 && (/^(\s+)$/).test(api.source) === false)
                        ? api.source
                        : "",
                    //sourcelabel - a text label to describe the api.source code for the diff report
                    sourcelabel    : (typeof api.sourcelabel === "string" && api.sourcelabel.length > 0)
                        ? api.sourcelabel
                        : "base",
                    // space - should JSPretty include a space between a function keyword and the
                    // next adjacent opening parenthesis character in beautification operations
                    space          : (api.space !== false && api.space !== "false"),
                    //spaceclose - If markup self-closing tags should end with " />" instead of "/>"
                    spaceclose     : (api.spaceclose === true || api.spaceclose === "true"),
                    // style - should JavaScript and CSS code receive indentation if embedded inline
                    // in markup
                    style          : (api.style === "noindent")
                        ? "noindent"
                        : "indent",
                    // styleguide - preset of beautification options to bring a JavaScript sample
                    // closer to conformance of a given style guide
                    styleguide     : (typeof api.styleguide === "string")
                        ? api.styleguide
                        : "",
                    // tagmerge - Allows combining immediately adjacent start and end tags of the
                    // same name into a single self-closing tag:  <a href="home"></a> into
                    // <a//href="home"/>
                    tagmerge       : (api.tagmerge === true || api.tagmerge === "true"),
                    //sort markup child nodes alphabetically
                    tagsort        : (api.tagsort === true || api.tagsort === "true"),
                    // textpreserve - Force the markup beautifier to retain text (white space and
                    // all) exactly as provided.
                    ternaryline    : (api.ternaryline === true || api.ternaryline === "true"),
                    textpreserve   : (api.textpreserve === true || api.textpreserve === "true"),
                    // titanium - TSS document support via option, because this is a uniquely
                    // modified form of JSON
                    titanium       : (api.titanium === true || api.titanium === "true"),
                    // topcoms - should comments at the top of a JavaScript or CSS source be
                    // preserved during minify operations
                    topcoms        : (api.topcoms === true || api.topcoms === "true"),
                    // varword - should consecutive variables be merged into a comma separated list
                    // or the opposite
                    varword        : (api.varword === "each" || api.varword === "list")
                        ? api.varword
                        : "none",
                    // vertical - whether or not to vertically align lists of assigns in CSS and
                    // JavaScript
                    vertical       : (api.vertical === "all" || api.vertical === "css" || api.vertical === "js")
                        ? api.vertical
                        : "none",
                    // wrap - in markup beautification should text content wrap after the first
                    // complete word up to a certain character length
                    wrap           : (isNaN(api.wrap) === true)
                        ? 80
                        : Number(api.wrap)
                },
                autoval      = [
                    "", "", ""
                ],
                jspretty     = function core__jspretty() {
                    var jsout = global.jspretty(options);
                    if (options.nodeasync === true) {
                        metaerror = jsout[1];
                        return jsout[0];
                    }
                    metaerror = global.meta.error;
                    return jsout;
                },
                markuppretty = function core__markuppretty() {
                    var markout = global.markuppretty(options);
                    if (options.nodeasync === true) {
                        metaerror = markout[1];
                        if (options.mode === "beautify" && options.inchar !== "\t") {
                            markout[0] = markout[0].replace(/\r?\n[\t]*\u0020\/>/g, "");
                        } else if (options.mode === "diff") {
                            markout[0] = markout[0].replace(/\r?\n[\t]*\ \/>/g, "");
                        }
                        return markout[0];
                    }
                    metaerror = global.meta.error;
                    if (options.mode === "beautify" && options.inchar !== "\t") {
                        markout = markout.replace(/\r?\n[\t]*\u0020\/>/g, "");
                    } else if (options.mode === "diff") {
                        markout = markout.replace(/\r?\n[\t]*\ \/>/g, "");
                    }
                    return markout;
                },
                csspretty    = function core__markupcss() {
                    var cssout = global.csspretty(options);
                    if (options.nodeasync === true) {
                        metaerror = cssout[1];
                        return cssout[0];
                    }
                    metaerror = global.meta.error;
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
                pdcomment    = function core__pdcomment() {
                    var comment    = options.source,
                        a          = 0,
                        b          = options.source.length,
                        str        = "/*prettydiff.com",
                        c          = options
                            .source
                            .indexOf(str) + 16,
                        build      = [],
                        comma      = -1,
                        g          = 0,
                        sourceChar = [],
                        quote      = "",
                        sind       = options
                            .source
                            .indexOf(str),
                        dind       = options
                            .diff
                            .indexOf(str);
                    if (sind < 0) {
                        str  = "<!--prettydiff.com";
                        sind = options
                            .source
                            .indexOf(str);
                        c    = sind + 18;
                    }
                    if (dind < 0) {
                        dind = options
                            .source
                            .indexOf("<!--prettydiff.com");
                    }
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
                        c       = options
                            .diff
                            .indexOf("/*prettydiff.com") + 16;
                        comment = options.diff;
                    } else if (c === 17 && typeof options.diff === "string") {
                        str     = "<!--prettydiff.com";
                        c       = options
                            .diff
                            .indexOf(str) + 18;
                        comment = options.diff;
                    } else if (c === 17) {
                        return;
                    }
                    for (c = c; c < b; c += 1) {
                        if (quote === "") {
                            if (comment.charAt(c) === "\"" || comment.charAt(c) === "'") {
                                quote = comment.charAt(c);
                            } else {
                                if (comment.charAt(c) === "*" && comment.charAt(c + 1) === "/" && str === "/*prettydiff.com") {
                                    break;
                                }
                                if (comment.charAt(c) === "-" && comment.charAt(c + 1) === "-" && comment.charAt(c + 2) === ">" && str === "<!--prettydiff.com") {
                                    break;
                                }
                                sourceChar.push(comment.charAt(c));
                            }
                        } else if (comment.charAt(c) === quote) {
                            quote = "";
                        }
                    }
                    comment = sourceChar
                        .join("");
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
                                if (build[c][1] === "knr" || build[c][1] === "allman") {
                                    options.braces = build[c][1];
                                }
                            } else if (build[c][0] === "color") {
                                if (typeof b[c][1] === "string" && b[c][1] !== "") {
                                    options.color = b[c][1];
                                }
                            } else if (build[c][0] === "comments") {
                                if (build[c][1] === "indent" || build[c][1] === "noindent") {
                                    options.comments = "noindent";
                                }
                            } else if (build[c][0] === "diffview") {
                                if (build[c][1] === "sidebyside" || build[c][1] === "inline") {
                                    options.diffview = build[c][1];
                                }
                            } else if (build[c][0] === "formatArray" || build[c][0] === "formatObject") {
                                if (build[c][1] === "default" || build[c][1] === "indent" || build[c][1] === "inline") {
                                    options[build[c][0]] = build[c][1];
                                }
                            } else if (build[c][0] === "jsscope") {
                                if (build[c][1] === "html" || build[c][1] === "none" || build[c][1] === "report") {
                                    options.jsscope = build[c][1];
                                }
                            } else if (build[c][0] === "lang" || build[c][0] === "langdefault") {
                                options[build[c][0]] = language.setlangmode(build[c][1]);
                            } else if (build[c][0] === "mode") {
                                if (build[c][1] === "beautify" || build[c][1] === "minify" || build[c][1] === "diff" || build[c][1] === "parse" || build[c][1] === "analysis") {
                                    options.mode = build[c][1];
                                }
                            } else if (build[c][0] === "objsort") {
                                if (build[c][1] === "all" || build[c][1] === "js" || build[c][1] === "css" || build[c][1] === "none" || build[c][1] === "true" || build[c][1] === "false") {
                                    options.objsort = build[c][1];
                                }
                            } else if (build[c][0] === "parseFormat") {
                                if (build[c][1] === "htmltable" || build[c][1] === "parallel" || build[c][1] === "sequential") {
                                    options.parseFormat = build[c][1];
                                }
                            } else if (build[c][0] === "quoteConvert") {
                                if (build[c][1] === "single" || build[c][1] === "double" || build[c][1] === "none") {
                                    options.quoteConvert = build[c][1];
                                }
                            } else if (build[c][0] === "style") {
                                if (build[c][1] === "indent" || build[c][1] === "noindent") {
                                    options.style = build[c][1];
                                }
                            } else if (build[c][0] === "varword") {
                                if (build[c][1] === "each" || build[c][1] === "list" || build[c][1] === "none") {
                                    options.varword = build[c][1];
                                }
                            } else if (build[c][0] === "vertical") {
                                if (build[c][1] === "all" || build[c][1] === "css" || build[c][1] === "js" || build[c][1] === "none") {
                                    options.vertical = build[c][1];
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
                    meta.lang   = autoval;
                    meta.time   = proctime();
                    meta.insize = (options.mode === "diff")
                        ? options.source.length + options.diff.length
                        : options.source.length;
                    if (options.mode === "parse" && options.lang !== "text" && (autoval[0] !== "" || options.lang !== "auto")) {
                        if (options.parseFormat === "sequential" || options.parseFormat === "htmltable") {
                            meta.outsize = finalProduct.data.length;
                        } else {
                            meta.outsize = finalProduct.data.token.length;
                        }
                    } else {
                        meta.outsize = finalProduct.length;
                    }
                    if (autoval[0] === "text" && options.mode !== "diff") {
                        if (autoval[2] === "unknown") {
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
                    global.meta = meta;
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
            pdcomment();
            if (options.lang === "auto") {
                autoval      = language.auto(options.source, options.langdefault);
                options.lang = autoval[1];
            } else if (options.api === "dom") {
                autoval = [options.lang, options.lang, options.lang];
            } else {
                options.lang = language.setlangmode(options.lang);
            }
            if (api.alphasort === true || api.alphasort === "true" || api.objsort === true || api.objsort === "true") {
                options.objsort = "all";
            }
            if (api.indent === "allman") {
                options.braces = "allman";
            }
            if (api.methodchain === true || api.methodchain === "true") {
                options.methodchain = "chain";
            } else if (api.methodchain === false || api.methodchain === "false") {
                options.methodchain = "indent";
            }
            if (api.vertical === true || api.vertical === "true") {
                options.vertical = "all";
            } else if (api.vertical === "cssonly") {
                options.vertical = "css";
            } else if (api.vertical === "jsonly") {
                options.vertical = "js";
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
            global.jsxstatus = false;
            html[7]          = options.color;
            if (autoval[0] === "text" && options.mode !== "diff") {
                metaerror = "Language is either text or undetermined, but text is only allowed for the 'diff'" +
                        " mode!";
                return output(options.source);
            }
            if (options.mode === "diff") {
                options.vertical = false;
                options.jsscope  = false;
                options.preserve = 0;
                if (options.diffcomments === false) {
                    options.comments = "nocomment";
                }
                if (options.lang === "css") {
                    apioutput      = csspretty();
                    options.source = options.diff;
                    apidiffout     = csspretty();
                } else if (options.lang === "csv") {
                    apioutput  = global.csvpretty(options);
                    apidiffout = global.csvpretty(options);
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
                if (global.jsxstatus === true) {
                    autoval = ["jsx", "javascript", "React JSX"];
                }
                return (function core__diff() {
                    var a = "";
                    options.diff   = apidiffout;
                    options.source = apioutput;
                    if (options.diffcli === true) {
                        return output(global.diffview(options));
                    }
                    if (apioutput === "Error: This does not appear to be JavaScript." || apidiffout === "Error: This does not appear to be JavaScript.") {
                        return output("<p><strong>Error:</strong> Please try using the option labeled <em>Plain Text (d" +
                                "iff only)</em>. <span style='display:block'>The input does not appear to be mark" +
                                "up, CSS, or JavaScript.</span></p>");
                    }
                    if (options.lang === "text") {
                        options.inchar = "";
                    }
                    a = global.diffview(options);
                    if (global.jsxstatus === true) {
                        autoval = ["jsx", "javascript", "React JSX"];
                    }
                    if (options.api === "") {
                        html[10] = a[0];
                        html[12] = builder.script.diff;
                        return output(html.join(""), a[1], a[2]);
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
                    apioutput = global.csvpretty(options);
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
                        html[10]  = apidiffout;
                        apioutput = html.join("");
                    } else if (options.mode === "beautify" && options.jsscope !== "none" && options.lang === "javascript") {
                        html[10]  = apidiffout;
                        html[12]  = builder.script.beautify;
                        apioutput = html.join("");
                    }
                }
                if (global.jsxstatus === true) {
                    autoval = ["jsx", "javascript", "React JSX"];
                }
                return output(apioutput);
            }
        };
    return core(api);
};
global.edition        = {
    addon        : {
        ace: 160307
    },
    api          : {
        dom      : 160422, //dom.js
        nodeLocal: 160422, //node-local.js
        wsh      : 160422
    },
    css          : 160418, //css files
    csspretty    : 160418, //csspretty lib
    csvpretty    : 160307, //csvpretty lib
    diffview     : 160418, //diffview lib
    documentation: 160422, //documentation.xhtml
    jspretty     : 160422, //jspretty lib
    language     : 160422, //language lib
    latest       : 0,
    lint         : 160422, //unit test and lint automation as test/lint.js
    markuppretty : 160422, //markuppretty lib
    prettydiff   : 160422, //this file
    safeSort     : 160307, //safeSort lib
    version      : "2.0.1", //version number
    webtool      : 160422
};
global.edition.latest = (function edition_latest() {
    "use strict";
    return Math.max(global.edition.css, global.edition.csspretty, global.edition.csvpretty, global.edition.diffview, global.edition.documentation, global.edition.jspretty, global.edition.language, global.edition.markuppretty, global.edition.prettydiff, global.edition.webtool, global.edition.api.dom, global.edition.api.nodeLocal, global.edition.api.wsh);
}());
if (typeof exports === "object" || typeof exports === "function") {
    //commonjs and nodejs support
    exports.edition = global.edition;
    exports.meta    = global.meta;
    exports.api     = function commonjs(x) {
        "use strict";
        return prettydiff(x);
    };
} else if ((typeof define === "object" || typeof define === "function") && (ace === undefined || ace.prettydiffid === undefined)) {
    //requirejs support
    define(function requirejs(require, exports) {
        "use strict";
        exports.edition = global.edition;
        exports.meta    = global.meta;
        exports.api     = function requirejs_export(x) {
            return prettydiff(x);
        };
        //worthless if block to appease RequireJS and JSLint
        if (typeof require === "number") {
            return require;
        }
        return exports.api;
    });
}
