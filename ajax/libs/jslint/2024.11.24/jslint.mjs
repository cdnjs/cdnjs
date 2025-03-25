// #!/usr/bin/env node
// JSLint

// The Unlicense
//
// This is free and unencumbered software released into the public domain.
//
// Anyone is free to copy, modify, publish, use, compile, sell, or
// distribute this software, either in source code form or as a compiled
// binary, for any purpose, commercial or non-commercial, and by any
// means.
//
// In jurisdictions that recognize copyright laws, the author or authors
// of this software dedicate any and all copyright interest in the
// software to the public domain. We make this dedication for the benefit
// of the public at large and to the detriment of our heirs and
// successors. We intend this dedication to be an overt act of
// relinquishment in perpetuity of all present and future rights to this
// software under copyright law.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
// IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
// OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
// ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
// OTHER DEALINGS IN THE SOFTWARE.


// jslint(source, option_dict, global_list) is a function that takes 3
// arguments. The second two arguments are optional.

//      source          A text to analyze.
//      option_dict     An object whose keys correspond to option names.
//      global_list     An array of strings containing global variables that
//                      the file is allowed readonly access.

// jslint returns an object containing its results. The object contains a lot
// of valuable information. It can be used to generate reports. The object
// contains:

//      directives: an array of directive comment tokens.
//      edition: the version of JSLint that did the analysis.
//      exports: the names exported from the module.
//      froms: an array of strings representing each of the imports.
//      functions: an array of objects that represent all functions
//              declared in the file.
//      global: an object representing the global object. Its .context property
//              is an object containing a property for each global variable.
//      id: "(JSLint)"
//      json: true if the file is a JSON text.
//      lines: an array of strings, the source.
//      module: true if an import or export statement was used.
//      ok: true if no warnings were generated. This is what you want.
//      option: the option argument.
//      property: a property object.
//      stop: true if JSLint was unable to finish. You don't want this.
//      tokens: an array of objects representing the tokens in the file.
//      tree: the token objects arranged in a tree.
//      warnings: an array of warning objects. A warning object can contain:
//          name: "JSLintError"
//          column: A column number in the file.
//          line: A line number in the file.
//          code: A warning code string.
//          message: The warning message string.
//          a: Exhibit A.
//          b: Exhibit B.
//          c: Exhibit C.
//          d: Exhibit D.

// jslint works in several phases. In any of these phases, errors might be
// found. Sometimes JSLint is able to recover from an error and continue
// parsing. In some cases, it cannot and will stop early. If that should happen,
// repair your code and try again.

// Phases:

// PHASE 1. Split <source> by newlines into <line_list>.
// PHASE 2. Lex <line_list> into <token_list>.
// PHASE 3. Parse <token_list> into <token_tree> using the Pratt-parser.
// PHASE 4. Walk <token_tree>, traversing all nodes of the tree. It is a
//          recursive traversal. Each node may be processed on the way down
//          (preaction) and on the way up (postaction).
// PHASE 5. Check whitespace between tokens in <token_list>.

// jslint can also examine JSON text. It decides that a file is JSON text if
// the first token is "[" or "{". Processing of JSON text is much simpler than
// the processing of JavaScript programs. Only the first three phases are
// required.

// WARNING: JSLint will hurt your feelings.

/*jslint beta, node*/
/*property
    JSLINT_BETA, NODE_V8_COVERAGE, a, all, argv, arity, artifact,
    assertErrorThrownAsync, assertJsonEqual, assertOrThrow, assign, async, b,
    beta, bitwise, block, body, browser, c, calls, catch, catch_list,
    catch_stack, causes, char, children, clear, closer, closure, code, column,
    concat, consoleError, console_error, console_log, constant, context,
    convert, count, coverageDir, create, cwd, d, dead, debugInline, default,
    delta, devel, directive, directive_ignore_line, directive_list, directives,
    dirname, disrupt, dot, edition, elem_list, ellipsis, else, end, endOffset,
    endsWith, entries, env, error, eval, every, example_list, excludeList, exec,
    execArgv, exit, exitCode, export_dict, exports, expression, extra, fart,
    file, fileList, fileURLToPath, filter, finally, flag, floor, for, forEach,
    formatted_message, free, freeze, from, froms, fsWriteFileWithParents,
    fud_stmt, functionName, function_list, function_stack, functions, get,
    getset, github_repo, globExclude, global, global_dict, global_list,
    holeList, htmlEscape, id, identifier, import, import_list, import_meta_url,
    inc, includeList, indent2, index, indexOf, init, initial, isArray,
    isBlockCoverage, isHole, isNaN, is_equal, is_weird, join, jslint,
    jslint_apidoc, jslint_assert, jslint_charset_ascii, jslint_cli,
    jslint_edition, jslint_phase1_split, jslint_phase2_lex, jslint_phase3_parse,
    jslint_phase4_walk, jslint_phase5_whitage, jslint_report, json,
    jstestDescribe, jstestIt, jstestOnExit, keys, label, lbp, led_infix, length,
    level, line, lineList, line_list, line_offset, line_source, lines,
    linesCovered, linesTotal, live, log, long, loop, m, map, margin, match, max,
    message, meta, min, mkdir, modeCoverageIgnoreFile, modeIndex, mode_cli,
    mode_conditional, mode_json, mode_module, mode_noop, mode_property,
    mode_shebang, mode_stop, module, moduleFsInit, moduleName, module_list,
    name, names, node, nomen, noop, now, nr, nud_prefix,
    objectDeepCopyWithKeysSorted, ok, on, open, opening, option, option_dict,
    order, package_name, padEnd, padStart, parameters, parent, parentIi, parse,
    pathname, pathnameList, platform, pop, processArgv, process_argv,
    process_env, process_exit, promises, property, property_dict, push, quote,
    ranges, readFile, readdir, readonly, recursive, reduce, repeat, replace,
    resolve, result, reverse, role, round, scriptId, search, set, shebang,
    shell, shift, signature, single, slice, some, sort, source, spawn, splice,
    split, stack, stack_trace, start, startOffset, startsWith, statement,
    statement_prv, stdio, stop, stop_at, stringify, subscript, switch,
    syntax_dict, tenure, test, test_cause, test_internal_error, this, thru,
    toLocaleString, toString, token, token_global, token_list, token_nxt,
    token_tree, tokens, trace, tree, trim, trimEnd, trimRight, try, type,
    unlink, unordered, unshift, url, used, v8CoverageListMerge,
    v8CoverageReportCreate, value, variable, version, versions, warn, warn_at,
    warning, warning_list, warnings, white, wrapped, writeFile
*/

// init debugInline
let debugInline = (function () {
    let __consoleError = function () {
        return;
    };
    function debug(...argv) {

// This function will print <argv> to stderr and then return <argv>[0].

        __consoleError("\n\ndebugInline");
        __consoleError(...argv);
        __consoleError("\n");
        return argv[0];
    }
    debug(); // Coverage-hack.
    __consoleError = console.error; //jslint-ignore-line
    return debug;
}());
let jslint_charset_ascii = (
    "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007"
    + "\b\t\n\u000b\f\r\u000e\u000f"
    + "\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017"
    + "\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f"
    + " !\"#$%&'()*+,-./0123456789:;<=>?"
    + "@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_"
    + "`abcdefghijklmnopqrstuvwxyz{|}~\u007f"
);
let jslint_edition = "v2024.11.24";
let jslint_export;                      // The jslint object to be exported.
let jslint_fudge = 1;                   // Fudge starting line and starting
                                        // ... column to 1.
let jslint_import_meta_url = "";        // import.meta.url used by cli.
let jslint_rgx_cap = (
    /^[A-Z]/
);
let jslint_rgx_crlf = (
    /\n|\r\n?/
);
let jslint_rgx_digits_bits = (
    /^[01_]*/
);
let jslint_rgx_digits_decimals = (
    /^[0-9_]*/
);
let jslint_rgx_digits_hexs = (
    /^[0-9A-F_]*/i
);
let jslint_rgx_digits_octals = (
    /^[0-7_]*/
);
let jslint_rgx_directive = (
    /^(jslint|property|global)\s+(.*)$/
);
let jslint_rgx_directive_part = (
    /([a-zA-Z$_][a-zA-Z0-9$_]*)(?::\s*(true|false))?,?\s*|$/g
);
let jslint_rgx_identifier = (
    /^([a-zA-Z_$][a-zA-Z0-9_$]*)$/
);
let jslint_rgx_json_number = (

// https://datatracker.ietf.org/doc/html/rfc7159#section-6
// number = [ minus ] int [ frac ] [ exp ]

    /^-?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][\-+]?\d+)?$/
);
let jslint_rgx_mega = (

// Vim-hack - vim-editor has trouble parsing naked '`' in regexp

    /[\u0060\\]|\$\{/
);
let jslint_rgx_module = (
    /^[a-zA-Z0-9_$:.@\-\/]+$/
);
let jslint_rgx_numeric_separator_illegal = (
    /__|_$|_n$/m
);
let jslint_rgx_slash_star_or_slash = (
    /\/\*|\/$/
);
let jslint_rgx_tab = (
    /\t/g
);
let jslint_rgx_todo = (
    /\b(?:todo|TO\s?DO|HACK)\b/
);
let jslint_rgx_token = new RegExp(
    "^("
    + "(\\s+)"
    + "|([a-zA-Z_$][a-zA-Z0-9_$]*)"
    + "|[(){}\\[\\],:;'\"~\\`]"
    + "|\\?[?.]?"
    + "|=(?:==?|>)?"
    + "|\\.+"
    + "|\\*[*\\/=]?"
    + "|\\/[*\\/]?"
    + "|\\+[=+]?"
    + "|-[=\\-]?"
    + "|[\\^%]=?"
    + "|&[&=]?"
    + "|\\"
    + "|[|=]?"
    + "|>{1,3}=?"
    + "|<<?=?"
    + "|!(?:!|==?)?"

// PR-351 - Add BigInt support.
// PR-390 - Add numeric-separator support.

    + "|((?:0_?|[1-9][0-9_]*)n?)"
    + ")"
    + "(.*)$"
);
let jslint_rgx_url_search_window_jslint = (
    /[&?]window_jslint=1(?:$|&)/m
);
let jslint_rgx_weird_property = (
    /^_|\$|Sync$|_$/m
);
let jstestCountFailed = 0;
let jstestCountTotal = 0;
let jstestItCount = 0;
let jstestItList = [];
let jstestTimeStart;
let moduleChildProcess;
let moduleFs;
let moduleFsInitResolveList;
let modulePath;
let moduleUrl;

async function assertErrorThrownAsync(asyncFunc, regexp) {

// This function will assert calling <asyncFunc> throws an error.

    let err;
    try {
        await asyncFunc();
    } catch (errCaught) {
        err = errCaught;
    }
    assertOrThrow(err, "No error thrown.");
    assertOrThrow(
        !regexp || new RegExp(regexp).test(err.message),
        err
    );
}

function assertJsonEqual(aa, bb, message) {

// This function will assert JSON.stringify(<aa>) === JSON.stringify(<bb>).

    aa = JSON.stringify(objectDeepCopyWithKeysSorted(aa), undefined, 1);
    bb = JSON.stringify(objectDeepCopyWithKeysSorted(bb), undefined, 1);
    if (aa !== bb) {
        throw new Error(
            "\n" + aa + "\n!==\n" + bb
            + (
                typeof message === "string"
                ? " - " + message
                : message
                ? " - " + JSON.stringify(message)
                : ""
            )
        );
    }
}

function assertOrThrow(condition, message) {

// This function will throw <message> if <condition> is falsy.

    if (!condition) {
        throw (
            (!message || typeof message === "string")
            ? new Error(String(message).slice(0, 2048))
            : message
        );
    }
}

function empty() {

// The empty function produces a new empty object that inherits nothing. This is
// much better than '{}' because confusions around accidental method names like
// 'constructor' are completely avoided.

    return Object.create(null);
}

async function fsWriteFileWithParents(pathname, data) {

// This function will write <data> to <pathname> and lazy-mkdirp if necessary.

    await moduleFsInit();

// Try writing to pathname.

    try {
        await moduleFs.promises.writeFile(pathname, data);
    } catch (ignore) {

// Lazy mkdirp.

        await moduleFs.promises.mkdir(modulePath.dirname(pathname), {
            recursive: true
        });

// Retry writing to pathname.

        await moduleFs.promises.writeFile(pathname, data);
    }
    console.error("wrote file " + pathname);
}

function globExclude({
    excludeList = [],
    includeList = [],
    pathnameList = []
}) {

// This function will
// 1. Exclude pathnames in <pathnameList> that don't match glob-patterns in
//    <includeList>.
// 2. Exclude pathnames in <pathnameList> that match glob-patterns in
//    <excludeList>.

    function globAssertNotWeird(list, name) {

// This function will check if <list> of strings contain weird characters.

        [
            [
                "\n", (
                    /^.*?([\u0000-\u0007\r]).*/gm
                )
            ],
            [
                "\r", (
                    /^.*?([\n]).*/gm
                )
            ]
        ].forEach(function ([
            separator, rgx
        ]) {
            list.join(separator).replace(rgx, function (match0, char) {
                throw new Error(
                    "Weird character "
                    + JSON.stringify(char)
                    + " found in " + name + " "
                    + JSON.stringify(match0)
                );
            });
        });
    }

    function globToRegexp(pattern) {

// This function will translate glob <pattern> to javascript-regexp,
// which javascript can then use to "glob" pathnames.

        let ii = 0;
        let isClass = false;
        let strClass = "";
        let strRegex = "";
        pattern = pattern.replace((
            /\/\/+/g
        ), "/");
        pattern = pattern.replace((
            /\*\*\*+/g
        ), "**");
        pattern.replace((
            /\\\\|\\\[|\\\]|\[|\]|./g
        ), function (match0) {
            switch (match0) {
            case "[":
                if (isClass) {
                    strClass += "[";
                    return;
                }
                strClass += "\u0000";
                strRegex += "\u0000";
                isClass = true;
                return;
            case "]":
                if (isClass) {
                    isClass = false;
                    return;
                }
                strRegex += "]";
                return;
            default:
                if (isClass) {
                    strClass += match0;
                    return;
                }
                strRegex += match0;
            }
            return "";
        });
        strClass += "\u0000";

// An expression "[!...]" matches a single character, namely any character that
// is not matched by the expression obtained by removing the first '!' from it.
// (Thus, "[!a-]" matches any single character except 'a', and '-'.)

        strClass = strClass.replace((
            /\u0000!/g
        ), "\u0000^");

// One may include '-' in its literal meaning by making it the first or last
// character between the brackets.

        strClass = strClass.replace((
            /\u0000-/g
        ), "\u0000\\-");
        strClass = strClass.replace((
            /-\u0000/g
        ), "\\-\u0000");

// Escape brackets '[', ']' in character class.

        strClass = strClass.replace((
            /[\[\]]/g
        ), "\\$&");

// https://stackoverflow.com/questions/3561493
// /is-there-a-regexp-escape-function-in-javascript
// $()*+-./?[\]^{|}

        strRegex = strRegex.replace((

// Ignore [-/].

            /[$()*+.?\[\\\]\^{|}]/g
        ), "\\$&");

// Expand wildcard '**/*'.

        strRegex = strRegex.replace((
            /\\\*\\\*\/(?:\\\*)+/g
        ), ".*?");

// Expand wildcard '**'.

        strRegex = strRegex.replace((
            /(^|\/)\\\*\\\*(\/|$)/gm
        ), "$1.*?$2");

// Expand wildcard '*'.

        strRegex = strRegex.replace((
            /(?:\\\*)+/g
        ), "[^\\/]*?");

// Expand wildcard '?'.

        strRegex = strRegex.replace((
            /\\\?/g
        ), "[^\\/]");

// Expand directory-with-trailing-slash '.../'.

        strRegex = strRegex.replace((
            /\/$/gm
        ), "\\/.*?");

// Merge strClass into strRegex.

        ii = 0;
        strClass = strClass.split("\u0000");
        strRegex = strRegex.replace((
            /\u0000/g
        ), function () {
            ii += 1;
            if (strClass[ii] === "") {
                return "";
            }
            return "[" + strClass[ii] + "]";
        });

// Change strRegex from string to regexp.

        strRegex = new RegExp("^" + strRegex + "$", "gm");
        return strRegex;
    }

// Validate excludeList, includeList, pathnameList.

    globAssertNotWeird(excludeList, "pattern");
    globAssertNotWeird(includeList, "pattern");
    globAssertNotWeird(pathnameList, "pathname");

// Optimization
// Concat pathnames into a single, newline-separated string,
// whose pathnames can all be filtered with a single, regexp-pass.

    pathnameList = pathnameList.join("\n");

// 1. Exclude pathnames in <pathnameList> that don't match glob-patterns in
//    <includeList>.

    if (includeList.length > 0) {
        includeList = includeList.map(globToRegexp);
        includeList.forEach(function (pattern) {
            pathnameList = pathnameList.replace(pattern, "\u0000$&");
        });
        pathnameList = pathnameList.replace((
            /^[^\u0000].*/gm
        ), "");
        pathnameList = pathnameList.replace((
            /^\u0000+/gm
        ), "");
    }

// 2. Exclude pathnames in <pathnameList> that match glob-patterns in
//    <excludeList>.

    excludeList = excludeList.map(globToRegexp);
    excludeList.forEach(function (pattern) {
        pathnameList = pathnameList.replace(pattern, "");
    });

// Split newline-separated pathnames back to list.

    pathnameList = pathnameList.split("\n").filter(function (elem) {
        return elem;
    });
    return {
        excludeList,
        includeList,
        pathnameList
    };
}

function htmlEscape(str) {

// This function will make <str> html-safe by escaping & < >.

    return String(str).replace((
        /&/g
    ), "&amp;").replace((
        /</g
    ), "&lt;").replace((
        />/g
    ), "&gt;");
}

function jslint(
    source = "",                // A text to analyze.
    option_dict = empty(),      // An object whose keys correspond to option
                                // ... names.
    global_list = []            // An array of strings containing global
                                // ... variables that the file is allowed
                                // ... readonly access.
) {

// The jslint function itself.

    let catch_list = [];        // The array containing all catch-blocks.
    let catch_stack = [         // The stack of catch-blocks.
        {
            context: empty()
        }
    ];
    let cause_dict = empty();   // The object of test-causes.
    let directive_list = [];    // The directive comments.
    let export_dict = empty();  // The exported names and values.
    let function_list = [];     // The array containing all functions.
    let function_stack = [];    // The stack of functions.
    let global_dict = empty();  // The object containing the global
                                // ... declarations.
    let import_list = [];       // The array collecting all import-from strings.
    let line_list = String(     // The array containing source lines.
        "\n" + source
    ).split(jslint_rgx_crlf).map(function (line_source) {
        return {
            line_source
        };
    });
    let mode_stop = false;      // true if JSLint cannot finish.
    let property_dict = empty();        // The object containing the tallied
                                        // ... property names.
    let state = empty();        // jslint state-object to be passed between
                                // jslint functions.
    let syntax_dict = empty();  // The object containing the parser.
    let tenure = empty();       // The predefined property registry.
    let token_global = {        // The global object; the outermost context.
        async: 0,
        body: true,
        context: empty(),
        finally: 0,
        from: 0,
        id: "(global)",
        level: 0,
        line: jslint_fudge,
        live: [],
        loop: 0,
        switch: 0,
        thru: 0,
        try: 0
    };
    let token_list = [];        // The array of tokens.
    let warning_list = [];      // The array collecting all generated warnings.

// Error reportage functions:

    function artifact(the_token) {

// Return a string representing an artifact.

        the_token = the_token || state.token_nxt;
        return (
            (the_token.id === "(string)" || the_token.id === "(number)")
            ? String(the_token.value)
            : the_token.id
        );
    }

    function is_equal(aa, bb) {

// test_cause:
// ["0&&0", "is_equal", "", "", 0]

        test_cause("");

// Probably deadcode.
// if (aa === bb) {
//     return true;
// }

        jslint_assert(!(aa === bb), `Expected !(aa === bb).`);
        if (Array.isArray(aa)) {
            return (
                Array.isArray(bb)
                && aa.length === bb.length
                && aa.every(function (value, index) {

// test_cause:
// ["`${0}`&&`${0}`", "is_equal", "recurse_isArray", "", 0]
// ["`${0}`&&`${1}`", "is_equal", "recurse_isArray", "", 0]

                    test_cause("recurse_isArray");
                    return is_equal(value, bb[index]);
                })
            );
        }

// Probably deadcode.
// if (Array.isArray(bb)) {
//     return false;
// }

        jslint_assert(!Array.isArray(bb), `Expected !Array.isArray(bb).`);
        switch (aa.id === bb.id && aa.id) {
        case "(number)":
        case "(string)":
            return aa.value === bb.value;

// PR-394 - Bugfix
// Fix jslint falsely believing megastring literals `0` and `1` are similar.

        case "`":
            if (!is_equal(aa.value, bb.value)) {
                return false;
            }
            break;
        }
        if (is_weird(aa) || is_weird(bb)) {

// test_cause:
// ["aa(/./)||{}", "is_equal", "false", "", 0]

            test_cause("false");
            return false;
        }
        if (aa.arity === bb.arity && aa.id === bb.id) {
            if (aa.id === "." || aa.id === "?.") {

// test_cause:
// ["aa.bb&&aa.bb", "is_equal", "recurse_arity_id", "", 0]
// ["aa?.bb&&aa?.bb", "is_equal", "recurse_arity_id", "", 0]

                test_cause("recurse_arity_id");
                return (
                    is_equal(aa.expression, bb.expression)
                    && is_equal(aa.name, bb.name)
                );
            }
            if (aa.arity === "unary") {

// test_cause:
// ["+0&&+0", "is_equal", "recurse_unary", "", 0]

                test_cause("recurse_unary");
                return is_equal(aa.expression, bb.expression);
            }
            if (aa.arity === "binary") {

// test_cause:
// ["aa[0]&&aa[0]", "is_equal", "recurse_binary", "", 0]

                test_cause("recurse_binary");
                return (
                    aa.id !== "("
                    && is_equal(aa.expression[0], bb.expression[0])
                    && is_equal(aa.expression[1], bb.expression[1])
                );
            }
            if (aa.arity === "ternary") {

// test_cause:
// ["aa=(``?``:``)&&(``?``:``)", "is_equal", "recurse_ternary", "", 0]

                test_cause("recurse_ternary");
                return (
                    is_equal(aa.expression[0], bb.expression[0])
                    && is_equal(aa.expression[1], bb.expression[1])
                    && is_equal(aa.expression[2], bb.expression[2])
                );
            }

// Probably deadcode.
// if (aa.arity === "function" || aa.arity === "regexp") {
//     return false;
// }

            jslint_assert(
                !(aa.arity === "function" || aa.arity === "regexp"),
                `Expected !(aa.arity === "function" || aa.arity === "regexp").`
            );

// test_cause:
// ["undefined&&undefined", "is_equal", "true", "", 0]

            test_cause("true");
            return true;
        }

// test_cause:
// ["null&&undefined", "is_equal", "false", "", 0]

        test_cause("false");
        return false;
    }

    function is_weird(thing) {
        switch (thing.id) {
        case "(regexp)":
            return true;
        case "=>":
            return true;
        case "[":
            return thing.arity === "unary";
        case "function":
            return true;
        case "{":
            return true;
        default:
            return false;
        }
    }

    function stop(code, the_token, a, b, c, d) {

// Similar to warn and stop_at. If the token already had a warning, that
// warning will be replaced with this new one. It is likely that the stopping
// warning will be the more meaningful.

        the_token = the_token || state.token_nxt;
        delete the_token.warning;
        throw warn(code, the_token, a, b, c, d);
    }

    function stop_at(code, line, column, a, b, c, d) {

// Same as warn_at, except that it stops the analysis.

        throw warn_at(code, line, column, a, b, c, d);
    }

    function test_cause(code, aa, column) {

// This function will instrument <cause> to <cause_dict> for test-purposes.

        if (option_dict.test_cause) {
            cause_dict[JSON.stringify([
                String(new Error().stack).replace((
                    /^    at (?:file|stop|stop_at|test_cause|warn|warn_at)\b.*?\n/gm
                ), "").match(
                    /\n    at ((?:Object\.\w+?_)?\w+?) /
                )[1].replace((
                    /^Object\./
                ), ""),
                code,
                String(
                    (aa === undefined || aa === token_global)
                    ? ""
                    : aa
                ),
                column || 0
            ])] = true;
        }
    }

    function warn(code, the_token, a, b, c, d) {

// Same as warn_at, except the warning will be associated with a specific token.
// If there is already a warning on this token, suppress the new one. It is
// likely that the first warning will be the most meaningful.

        let the_warning;
        the_token = the_token || state.token_nxt;
        the_warning = warn_at(
            code,
            the_token.line,
            (the_token.from || 0) + jslint_fudge,
            a || artifact(the_token),
            b,
            c,
            d
        );

// Issue #408
// Warnings that should be ignored sometimes suppress legitimate warnings.

        if (the_warning.directive_ignore_line) {
            return the_warning;
        }

// If there is already a warning on this token, suppress the new one. It is
// likely that the first warning will be the most meaningful.

        if (the_token.warning) {
            warning_list.pop();
            return the_warning;
        }
        the_token.warning = the_warning;
        return the_warning;
    }

    function warn_at(code, line, column, a, b, c, d) {

// Report an error at some line and column of the program. The warning object
// resembles an exception.

        let mm;
        let warning = Object.assign(empty(), {
            a,
            b,
            c,
            code,

// Fudge column numbers in warning message.

            column: column || jslint_fudge,
            d,
            line,
            line_source: "",
            name: "JSLintError"
        }, line_list[line]);
        warning.column = Math.max(
            Math.min(warning.column, warning.line_source.length),
            jslint_fudge
        );
        test_cause(code, b || a, warning.column);
        switch (code) {

// The bundle contains the raw text messages that are generated by jslint. It
// seems that they are all error messages and warnings. There are no "Atta
// boy!" or "You are so awesome!" messages. There is no positive reinforcement
// or encouragement. This relentless negativity can undermine self-esteem and
// wound the inner child. But if you accept it as sound advice rather than as
// personal criticism, it can make your programs better.

        case "and":
            mm = `The '&&' subexpression should be wrapped in parens.`;
            break;
        case "bad_assignment_a":
            mm = `Bad assignment to '${a}'.`;
            break;
        case "bad_directive_a":
            mm = `Bad directive '${a}'.`;
            break;
        case "bad_get":
            mm = `A get function takes no parameters.`;
            break;
        case "bad_module_name_a":
            mm = `Bad module name '${a}'.`;
            break;
        case "bad_option_a":
            mm = `Bad option '${a}'.`;
            break;
        case "bad_set":
            mm = `A set function takes one parameter.`;
            break;
        case "duplicate_a":
            mm = `Duplicate '${a}'.`;
            break;
        case "empty_block":
            mm = `Empty block.`;
            break;
        case "expected_a":
            mm = `Expected '${a}'.`;
            break;
        case "expected_a_at_b_c":
            mm = `Expected '${a}' at column ${b}, not column ${c}.`;
            break;
        case "expected_a_b":
            mm = `Expected '${a}' and instead saw '${b}'.`;
            break;
        case "expected_a_b_before_c_d":
            mm = `Expected ${a} '${b}' to be ordered before ${c} '${d}'.`;
            break;
        case "expected_a_b_from_c_d":
            mm = (
                `Expected '${a}' to match '${b}' from line ${c}`
                + ` and instead saw '${d}'.`
            );
            break;
        case "expected_a_before_b":
            mm = `Expected '${a}' before '${b}'.`;
            break;
        case "expected_digits_after_a":
            mm = `Expected digits after '${a}'.`;
            break;
        case "expected_four_digits":
            mm = `Expected four digits after '\\u'.`;
            break;
        case "expected_identifier_a":
            mm = `Expected an identifier and instead saw '${a}'.`;
            break;
        case "expected_line_break_a_b":
            mm = `Expected a line break between '${a}' and '${b}'.`;
            break;
        case "expected_regexp_factor_a":
            mm = `Expected a regexp factor and instead saw '${a}'.`;
            break;
        case "expected_space_a_b":
            mm = `Expected one space between '${a}' and '${b}'.`;
            break;
        case "expected_statements_a":
            mm = `Expected statements before '${a}'.`;
            break;
        case "expected_string_a":
            mm = `Expected a string and instead saw '${a}'.`;
            break;
        case "expected_type_string_a":
            mm = `Expected a type string and instead saw '${a}'.`;
            break;
        case "freeze_exports":
            mm = (
                `Expected 'Object.freeze('. All export values should be frozen.`
            );
            break;

// PR-378 - Relax warning "function_in_loop".
//
//         case "function_in_loop":
//             mm = `Don't create functions within a loop.`;
//             break;

// PR-390 - Add numeric-separator check.

        case "illegal_num_separator":
            mm = `Illegal numeric separator '_' at column ${column}.`;
            break;
        case "infix_in":
            mm = (
                `Unexpected 'in'. Compare with undefined,`
                + ` or use the hasOwnProperty method instead.`
            );
            break;
        case "label_a":
            mm = `'${a}' is a statement label.`;
            break;
        case "misplaced_a":
            mm = `Place '${a}' at the outermost level.`;
            break;
        case "misplaced_directive_a":
            mm = `Place the '/*${a}*/' directive before the first statement.`;
            break;
        case "missing_await_statement":
            mm = `Expected await statement in async function.`;
            break;

// PR-347 - Disable warning "missing_browser".
//
//         case "missing_browser":
//             mm = `/*global*/ requires the Assume a browser option.`;
//             break;

        case "missing_m":
            mm = `Expected 'm' flag on a multiline regular expression.`;
            break;
        case "naked_block":
            mm = `Naked block.`;
            break;
        case "nested_comment":
            mm = `Nested comment.`;
            break;
        case "not_label_a":
            mm = `'${a}' is not a label.`;
            break;
        case "number_isNaN":
            mm = `Use Number.isNaN function to compare with NaN.`;
            break;
        case "out_of_scope_a":
            mm = `'${a}' is out of scope.`;
            break;
        case "redefinition_a_b":
            mm = `Redefinition of '${a}' from line ${b}.`;
            break;
        case "redefinition_global_a_b":
            mm = `Redefinition of global ${a} variable '${b}'.`;
            break;
        case "required_a_optional_b":
            mm = `Required parameter '${a}' after optional parameter '${b}'.`;
            break;
        case "reserved_a":
            mm = `Reserved name '${a}'.`;
            break;
        case "subscript_a":
            mm = `['${a}'] is better written in dot notation.`;
            break;
        case "todo_comment":
            mm = `Unexpected TODO comment.`;
            break;
        case "too_long":
            mm = `Line is longer than 80 characters.`;
            break;
        case "too_many_digits":
            mm = `Too many digits.`;
            break;
        case "unclosed_comment":
            mm = `Unclosed comment.`;
            break;
        case "unclosed_disable":
            mm = (
                `Directive '/*jslint-disable*/' was not closed`
                + ` with '/*jslint-enable*/'.`
            );
            break;
        case "unclosed_mega":
            mm = `Unclosed mega literal.`;
            break;
        case "unclosed_string":
            mm = `Unclosed string.`;
            break;
        case "undeclared_a":
            mm = `Undeclared '${a}'.`;
            break;
        case "unexpected_a":
            mm = `Unexpected '${a}'.`;
            break;
        case "unexpected_a_after_b":
            mm = `Unexpected '${a}' after '${b}'.`;
            break;
        case "unexpected_a_before_b":
            mm = `Unexpected '${a}' before '${b}'.`;
            break;
        case "unexpected_at_top_level_a":
            mm = `Expected '${a}' to be in a function.`;
            break;
        case "unexpected_char_a":
            mm = `Unexpected character '${a}'.`;
            break;
        case "unexpected_comment":
            mm = `Unexpected comment.`;
            break;

// PR-347 - Disable warning "unexpected_directive_a".
//
//         case "unexpected_directive_a":
//             mm = `When using modules, don't use directive '/\u002a${a}'.`;
//             break;

        case "unexpected_expression_a":
            mm = `Unexpected expression '${a}' in statement position.`;
            break;
        case "unexpected_label_a":
            mm = `Unexpected label '${a}'.`;
            break;
        case "unexpected_parens":
            mm = `Don't wrap function literals in parens.`;
            break;
        case "unexpected_space_a_b":
            mm = `Unexpected space between '${a}' and '${b}'.`;
            break;
        case "unexpected_statement_a":
            mm = `Unexpected statement '${a}' in expression position.`;
            break;
        case "unexpected_trailing_space":
            mm = `Unexpected trailing space.`;
            break;
        case "unexpected_typeof_a":
            mm = (
                `Unexpected 'typeof'. Use '===' to compare directly with ${a}.`
            );
            break;
        case "uninitialized_a":
            mm = `Uninitialized '${a}'.`;
            break;
        case "unopened_enable":
            mm = (
                `Directive '/*jslint-enable*/' was not opened`
                + ` with '/*jslint-disable*/'.`
            );
            break;
        case "unreachable_a":
            mm = `Unreachable '${a}'.`;
            break;
        case "unregistered_property_a":
            mm = `Unregistered property name '${a}'.`;
            break;
        case "unused_a":
            mm = `Unused '${a}'.`;
            break;
        case "use_double":
            mm = `Use double quotes, not single quotes.`;
            break;

// PR-386 - Fix issue #382 - Make fart-related warnings more readable.

        case "use_function_not_fart":
            mm = (
                `Use 'function (...)', not '(...) =>' when arrow functions`
                + ` become too complex.`
            );
            break;
        case "use_open":
            mm = (
                `Wrap a ternary expression in parens,`
                + ` with a line break after the left paren.`
            );
            break;
        case "use_spaces":
            mm = `Use spaces, not tabs.`;
            break;
        case "var_on_top":
            mm = `Move variable declaration to top of function or script.`;
            break;
        case "var_switch":
            mm = `Don't declare variables in a switch.`;
            break;
        case "weird_condition_a":
            mm = `Weird condition '${a}'.`;
            break;
        case "weird_expression_a":
            mm = `Weird expression '${a}'.`;
            break;
        case "weird_loop":
            mm = `Weird loop.`;
            break;
        case "weird_property_a":
            mm = `Weird property name '${a}'.`;
            break;
        case "weird_relation_a":
            mm = `Weird relation '${a}'.`;
            break;
        case "wrap_condition":
            mm = `Wrap the condition in parens.`;
            break;

// PR-386 - Fix issue #382 - Make fart-related warnings more readable.

        case "wrap_fart_parameter":
            mm = `Wrap the parameter before '=>' in parens.`;
            break;
        case "wrap_immediate":
            mm = (
                `Wrap an immediate function invocation in parentheses to assist`
                + ` the reader in understanding that the expression is the`
                + ` result of a function, and not the function itself.`
            );
            break;
        case "wrap_regexp":
            mm = `Wrap this regexp in parens to avoid confusion.`;
            break;
        case "wrap_unary":
            mm = `Wrap the unary expression in parens.`;
            break;
        }

// Validate mm.

        jslint_assert(mm, code);
        warning.message = mm;

// PR-242 - Include stack_trace for jslint to debug itself for errors.

        if (option_dict.trace) {
            warning.stack_trace = new Error().stack;
        }
        if (warning.directive_ignore_line) {

// test_cause:
// ["0 //jslint-ignore-line", "semicolon", "directive_ignore_line", "", 0]

            test_cause("directive_ignore_line");
            return warning;
        }
        warning_list.push(warning);
        return warning;
    }

    try {

// tokenize takes a source and produces from it an array of token objects.
// JavaScript is notoriously difficult to tokenize because of the horrible
// interactions between automatic semicolon insertion, regular expression
// literals, and now megastring literals. JSLint benefits from eliminating
// automatic semicolon insertion and nested megastring literals, which allows
// full tokenization to precede parsing.

        option_dict = Object.assign(empty(), option_dict);
        Object.assign(state, {
            artifact,
            catch_list,
            catch_stack,
            directive_list,
            export_dict,
            function_list,
            function_stack,
            global_dict,
            global_list,
            import_list,
            is_equal,
            is_weird,
            line_list,
            mode_json: false,           // true if parsing JSON.
            mode_module: false,         // true if import or export was used.
            mode_property: false,       // true if directive /*property*/ is
                                        // ... used.
            mode_shebang: false,        // true if #! is seen on the first line.
            option_dict,
            property_dict,
            source,
            stop,
            stop_at,
            syntax_dict,
            tenure,
            test_cause,
            token_global,
            token_list,
            token_nxt: token_global,
            warn,
            warn_at,
            warning_list
        });

// PHASE 1. Split <source> by newlines into <line_list>.

        jslint_phase1_split(state);
        jslint_assert(catch_stack.length === 1, `catch_stack.length === 1.`);
        jslint_assert(
            function_stack.length === 0,
            `function_stack.length === 0.`
        );

// PHASE 2. Lex <line_list> into <token_list>.

        jslint_phase2_lex(state);
        jslint_assert(catch_stack.length === 1, `catch_stack.length === 1.`);
        jslint_assert(
            function_stack.length === 0,
            `function_stack.length === 0.`
        );

// PHASE 3. Parse <token_list> into <token_tree> using the Pratt-parser.

        jslint_phase3_parse(state);
        jslint_assert(catch_stack.length === 1, `catch_stack.length === 1.`);
        jslint_assert(
            function_stack.length === 0,
            `function_stack.length === 0.`
        );

// PHASE 4. Walk <token_tree>, traversing all nodes of the tree. It is a
//          recursive traversal. Each node may be processed on the way down
//          (preaction) and on the way up (postaction).

        if (!state.mode_json) {
            jslint_phase4_walk(state);
        }
        jslint_assert(catch_stack.length === 1, `catch_stack.length === 1.`);
        jslint_assert(
            function_stack.length === 0,
            `function_stack.length === 0.`
        );

// PHASE 5. Check whitespace between tokens in <token_list>.

        if (!state.mode_json && warning_list.length === 0) {
            jslint_phase5_whitage(state);
        }
        jslint_assert(catch_stack.length === 1, `catch_stack.length === 1.`);
        jslint_assert(
            function_stack.length === 0,
            `function_stack.length === 0.`
        );

// PR-347 - Disable warning "missing_browser".
//
//         if (!option_dict.browser) {
//             directive_list.forEach(function (comment) {
//                 if (comment.directive === "global") {
//
// // test_cause:
// // ["/*global aa*/", "jslint", "missing_browser", "(comment)", 1]
//
//                     warn("missing_browser", comment);
//                 }
//             });
//         }

        if (option_dict.test_internal_error) {
            jslint_assert(undefined, "test_internal_error");
        }
    } catch (err) {
        mode_stop = true;
        err.message = "[JSLint was unable to finish] " + err.message;
        err.mode_stop = true;
        if (err.name !== "JSLintError") {
            Object.assign(err, {
                column: jslint_fudge,
                line: jslint_fudge,
                line_source: "",
                stack_trace: err.stack
            });
        }
        if (warning_list.indexOf(err) === -1) {
            warning_list.push(err);
        }
    }

// Sort warning_list by mode_stop first, line, column respectively.

    warning_list.sort(function (aa, bb) {
        return (
            Boolean(bb.mode_stop) - Boolean(aa.mode_stop)
            || aa.line - bb.line
            || aa.column - bb.column
        );

// Update each warning with formatted_message ready-for-use by jslint_cli.

    }).map(function ({
        column,
        line,
        line_source,
        message,
        stack_trace = ""
    }, ii, list) {
        list[ii].formatted_message = String(
            String(ii + 1).padStart(2, " ")
            + ". \u001b[31m" + message + "\u001b[39m"
            + " \u001b[90m\/\/ line " + line + ", column " + column
            + "\u001b[39m\n"
            + ("    " + line_source.trim()).slice(0, 72) + "\n"
            + stack_trace
        ).trimRight();
    });

    return {
        causes: cause_dict,
        directives: directive_list,
        edition: jslint_edition,
        exports: export_dict,
        froms: import_list,
        functions: function_list,
        global: token_global,
        id: "(JSLint)",
        json: state.mode_json,
        lines: line_list,
        module: state.mode_module === true,
        ok: warning_list.length === 0 && !mode_stop,
        option: option_dict,
        property: property_dict,
        shebang: (
            state.mode_shebang
            ? line_list[jslint_fudge].line_source
            : undefined
        ),
        stop: mode_stop,
        tokens: token_list,
        tree: state.token_tree,
        warnings: warning_list
    };
}

// PR-362 - Add API Doc.

async function jslint_apidoc({
    example_list,
    github_repo,
    module_list,
    package_name,
    pathname,
    version
}) {

// This function will create API Doc from <module_list>.

    let elem_ii = 0;
    let html;

    function elem_create(moduleObj, key, moduleName) {

// This function will create a sub API Doc from elem <moduleObj>[<key>].

        let example = "N/A";
        let id = encodeURIComponent("apidoc.elem." + moduleName + "." + key);
        let name;
        let signature;
        let source;
        name = htmlEscape((typeof moduleObj[key]) + " " + key);
        if (typeof moduleObj[key] !== "function") {
            return {
                name,
                signature: (`
<a class="apidocElementLiA" href="#${id}">
${name}
</a>
                `),
                source: (`
<li>
    <h2>
    <a href="#${id}" id="${id}">
    ${name}
    </a>
    </h2>
</li>
                `)
            };
        }
        // init source
        source = htmlEscape(trim_start(moduleObj[key].toString()));
        // init signature
        source = source.replace((
            /(\([\S\s]*?\)) \{/
        ), function (match0, match1) {
            signature = htmlEscape(
                match1.replace((
                    / *?\/\*[\S\s]*?\*\/ */g
                ), "").replace((
                    / *?\/\/.*/g
                ), "").replace((
                    /\n{2,}/g
                ), "\n")
            );
            return match0;
        });
        // init comment
        source = source.replace((
            /\n(?:\/\/.*?\n)+\n/
        ), "<span class=\"apidocCodeCommentSpan\">$&</span>");
        // init example
        example_list.some(function (example2) {
            example2.replace(
                new RegExp((
                    "((?:\\n.*?){8}(function )?)\\b"
                    + key
                    + "(\\((?:.*?\\n){8})"
                ), "g"),
                function (ignore, header, isDeclaration, footer) {
                    if (!isDeclaration) {
                        example = "..." + trim_start(
                            htmlEscape(header)
                            + "<span class=\"apidocCodeKeywordSpan\">"
                            + htmlEscape(key)
                            + "</span>"
                            + htmlEscape(footer)
                        ).trimEnd() + "\n...";
                    }
                    return "";
                }
            );
            return example !== "N/A";
        });
        if (source.length > 2048) {
            source = source.slice(0, 2048) + "...\n}\n";
        }
        return {
            name,
            signature: (`
<a class="apidocElementLiA" href="#${id}">
${name}<span class="apidocSignatureSpan">${signature}</span>
</a>
            `),
            source: (`
<li>
    <h2>
    <a href="#${id}" id="${id}">
    ${name}<span class="apidocSignatureSpan">${signature}</span>
    </a>
    </h2>
</li>
<li>Description and source-code:<pre class="apidocCodePre">${source}</pre></li>
<li>Example usage:<pre class="apidocCodePre">${example}</pre></li>
            `)
        };
    }

    function trim_start(str) {

// This function will normalize whitespace before <str>.

        let whitespace = "";
        str.trim().replace((
            /^ */gm
        ), function (match0) {
            if (whitespace === "" || match0.length < whitespace.length) {
                whitespace = match0;
            }
            return "";
        });
        str = str.replace(new RegExp("^" + whitespace, "gm"), "");
        return str;
    }
    await moduleFsInit();

// Html-escape params.

    github_repo = htmlEscape(github_repo);
    package_name = htmlEscape(package_name);
    version = htmlEscape(version);

// Init example_list.

    example_list = await Promise.all(example_list.map(async function (file) {

// This function will read example from given file.

        let result = await moduleFs.promises.readFile(file, "utf8");
        result = (
            "\n\n\n\n\n\n\n\n"
            // bug-workaround - truncate example to manageable size
            + result.slice(0, 524288)
            + "\n\n\n\n\n\n\n\n"
        );
        result = result.replace((
            /\r\n*/g
        ), "\n");
        return result;
    }));

// Init module_list.

    module_list = await Promise.all(module_list.map(async function ({
        pathname
    }) {
        let moduleName = htmlEscape(JSON.stringify(pathname));
        let moduleObj = await import(pathname);
        if (moduleObj.default) {
            moduleObj = moduleObj.default;
        }
        return {
            elem_list: Object.keys(moduleObj).map(function (key) {
                return elem_create(moduleObj, key, moduleName);
            }).sort(function (aa, bb) {
                return (
                    aa.name < bb.name
                    ? -1
                    : 1
                );
            }).map(function (elem) {
                elem_ii += 1;
                elem.signature = elem.signature.replace(
                    ">",
                    ">" + elem_ii + ". "
                );
                elem.source = elem.source.replace(
                    "\">",
                    "\">" + elem_ii + ". "
                );
                return elem;
            }),
            id: encodeURIComponent("apidoc.module." + moduleName),
            moduleName
        };
    }));
    html = (`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="${package_name} API Doc">
<title>${package_name} apidoc</title>
<style>
/* jslint utility2:true */
/*csslint*/
body {
    margin: 0;
    padding: 20px;
}
.apidocCodeCommentSpan,
.apidocCodeKeywordSpan {
    background: royalblue;
    color: white;
}
.apidocCodeCommentSpan {
    display: block;
}
.apidocCodePre {
    background: #eef;
    border: 1px solid;
    font-size: 14px;
    overflow-wrap: break-word;
    padding: 5px;
    white-space: pre-wrap;
}
.apidocDiv {
    color: #555;
    font-family: sans-serif;
}
.apidocDiv a[href] {
    color: royalblue;
    text-decoration: none;
}
.apidocDiv a[href]:hover {
    text-decoration: underline;
}
.apidocDiv li a {
    display: inline-block;
    padding: 8px 0;
}
.apidocDiv ul {
    list-style: none;
    padding-left: 20px;
}
.apidocFooterDiv {
    margin-top: 20px;
    text-align: center;
}
.apidocModuleA {
    font-size: 24px;
    font-weight: bold;
}
.apidocSectionDiv {
    border-top: 1px solid;
    margin-top: 20px;
}
.apidocSignatureSpan {
    color: #666;
    white-space: pre-wrap;
}
</style>
</head>
<body>
<div class="apidocDiv">
<h1>API Doc for <a href="${github_repo}">${package_name} (${version})</a></h1>
<div class="apidocSectionDiv">
    <a href="#apidocTableOfContents1" id="apidocTableOfContents1">
        <h1>Table of Contents</h1>
    </a>
    <ul>
    `) + module_list.map(function ({
        elem_list,
        id,
        moduleName
    }) {
        return (
            (`
        <li>
            <a class="apidocModuleA" href="#${id}">Module ${moduleName}</a>
            <ul>
            `)
            + elem_list.map(function ({
                signature
            }) {
                return "<li>\n" + signature + "\n</li>\n";
            }).join("")
            + (`
            </ul>
        </li>
            `)
        );
    }).join("") + (`
    </ul>
</div>
    `) + module_list.map(function ({
        elem_list,
        id,
        moduleName
    }) {
        return (
            (`
<div class="apidocSectionDiv">
    <h1><a href="#${id}" id="${id}">Module ${moduleName}</a></h1>
    <ul>
            `)
            + elem_list.map(function ({
                source
            }) {
                return source;
            }).join("")
            + (`
    </ul>
</div>
            `)
        );
    }).join("") + (`
<div class="apidocFooterDiv">
    [
    This document was created with
    <a href="https://github.com/jslint-org/jslint">JSLint</a>
    ]
</div>
</div>
</body>
</html>
    `);
    html = html.trim().replace((
        / +?$/gm
    ), "") + "\n";
    await fsWriteFileWithParents(pathname, html);
}

function jslint_assert(condition, message) {

// This function will throw <message> if <condition> is falsy.

    if (condition) {
        return condition;
    }
    throw new Error(
        `This was caused by a bug in JSLint.
Please open an issue with this stack-trace (and possible example-code) at
https://github.com/jslint-org/jslint/issues.
edition = "${jslint_edition}";
${String(message).slice(0, 2000)}`
    );
}

async function jslint_cli({
    console_error,
    console_log,
    file,
    import_meta_url,
    mode_cli,
    mode_noop,
    option,
    process_argv,
    process_env,
    process_exit,
    source
}) {

// This function will run jslint from nodejs-cli.

    let command;
    let data;
    let exit_code = 0;
    let mode_report;
    let mode_wrapper_vim;
    let result;

    function jslint_from_file({
        code,
        file,
        line_offset = 0,
        mode_conditional,
        option = empty()
    }) {
        let result_from_file;
        if (
            mode_conditional
            && !(
                /^\/\*jslint\b/m
            ).test(code.slice(0, 65536))
        ) {
            return;
        }
        option = Object.assign(empty(), option, {
            file
        });
        switch ((
            /\.\w+?$|$/m
        ).exec(file)[0]) {
        case ".html":

// Recursively jslint embedded "<script>\n...\n</script>".

            code.replace((
                /^<script\b[^>]*?>\n([\S\s]*?\n)<\/script>$/gm
            ), function (ignore, match1, ii) {
                jslint_from_file({
                    code: match1,
                    file: file + ".<script>.js",
                    line_offset: string_line_count(code.slice(0, ii)) + 1,
                    option: Object.assign(empty(), {
                        browser: true
                    }, option)
                });
                return "";
            });
            return;
        case ".md":

// Recursively jslint embedded "node --eval '\n...\n'".

            jslint_node_eval({
                code,
                file,
                mode_conditional: true,
                option
            });
            return;
        case ".sh":

// Recursively jslint embedded "node --eval '\n...\n'".

            jslint_node_eval({
                code,
                file,
                option
            });
            return;
        default:
            result_from_file = jslint("\n".repeat(line_offset) + code, option);
        }

// Print only first 10 warnings to stderr.

        if (result_from_file.warnings.length > 0) {
            exit_code = 1;
            console_error(
                mode_wrapper_vim

// PR-349 - Print warnings in format readable by vim.

                ? result_from_file.warnings.slice(0, 10).map(function ({
                    column,
                    line,
                    message
                }, ii) {
                    return (
                        file
                        + ":" + ii
                        + ":" + line
                        + ":" + column
                        + ":" + message
                    );
                }).join("\n")

// Print warnings in format readable by human.

                : "\u001b[1mjslint " + file + "\u001b[22m\n"
                + result_from_file.warnings.slice(0, 10).map(function ({
                    formatted_message
                }) {
                    return formatted_message;
                }).join("\n")
            );
        }
        return result_from_file;
    }

    function jslint_node_eval({
        code,
        file,
        mode_conditional,
        option = empty()
    }) {
        code.replace((
            /\bnode\b.*? (?:--eval|-e) '\n([\S\s]*?\n)'/gm
        ), function (ignore, match1, ii) {
            jslint_from_file({
                code: match1,
                file: file + ".<node -e>.js",
                line_offset: string_line_count(code.slice(0, ii)) + 1,
                mode_conditional,
                option: Object.assign(empty(), {
                    beta: Boolean(
                        process_env.JSLINT_BETA
                        && !(
                            /0|false|null|undefined/
                        ).test(process_env.JSLINT_BETA)
                    ),
                    node: true
                }, option)
            });
            return "";
        });
    }

    function string_line_count(code) {

// This function will count number of newlines in <code>.

        let count;
        let ii;

// https://jsperf.com/regexp-counting-2/8

        count = 0;
        ii = 0;
        while (true) {
            ii = code.indexOf("\n", ii) + 1;
            if (ii === 0) {
                break;
            }
            count += 1;
        }
        return count;
    }

// PR-396 - window.jslint
// Check import.meta.url for directive to export jslint to window-object.
// Useful for ES5-era browser-scripts that rely on window.jslint,
// like CodeMirror.
//
// Example usage:
// <script type="module" src="./jslint.mjs?window_jslint=1"></script>

    import_meta_url = import_meta_url || jslint_import_meta_url;
    if (
        jslint_rgx_url_search_window_jslint.test(import_meta_url)
        && (typeof globalThis === "object" && globalThis)
    ) {
        globalThis.jslint = jslint;
    }

// Feature-detect nodejs.

    if (!(
        (typeof process === "object" && process)
        && process.versions
        && typeof process.versions.node === "string"
        && !mode_noop
    )) {
        return exit_code;
    }
    console_error = console_error || console.error;
    console_log = console_log || console.log;
    process_argv = process_argv || process.argv;
    process_env = process_env || process.env;
    process_exit = process_exit || process.exit;
    await moduleFsInit();
    if (
        !(

// Feature-detect nodejs-cli.

            process.execArgv.indexOf("--eval") === -1
            && process.execArgv.indexOf("-e") === -1
            && (
                (
                    /[\/|\\]jslint(?:\.[cm]?js)?$/m
                ).test(process_argv[1])
                || mode_cli
            )
            && (
                moduleUrl.fileURLToPath(import_meta_url)
                ===
                modulePath.resolve(process_argv[1])
            )
        )
        && !mode_cli
    ) {
        return exit_code;
    }

// init commmand

    command = String(process_argv[2]).split("=");
    command[1] = command.slice(1).join("=");

    switch (command[0]) {

// PR-362 - Add API Doc.

    case "jslint_apidoc":
        await jslint_apidoc(Object.assign(JSON.parse(process_argv[3]), {
            pathname: command[1]
        }));
        return;

// PR-363 - Add command jslint_report.

    case "jslint_report":
        mode_report = command[1];
        process_argv = process_argv.slice(1);
        break;

// COMMIT-b26d6df2 - Add command jslint_wrapper_vim.

    case "jslint_wrapper_vim":
        mode_wrapper_vim = true;
        process_argv = process_argv.slice(1);
        break;

// PR-364 - Add command v8_coverage_report.

    case "v8_coverage_report":
        await v8CoverageReportCreate({
            consoleError: console_error,
            coverageDir: command[1],
            processArgv: process_argv.slice(3)
        });
        return;
    }

// Normalize file relative to process.cwd().

    process_argv.slice(2).some(function (arg) {
        if (!arg.startsWith("-")) {
            file = file || arg;
            return true;
        }
    });
    if (!file) {
        return;
    }
    file = modulePath.resolve(file) + "/";
    if (file.startsWith(process.cwd() + "/")) {
        file = file.replace(process.cwd() + "/", "").slice(0, -1) || ".";
    }
    file = file.replace((
        /\\/g
    ), "/").replace((
        /\/$/g
    ), "");
    if (source) {
        data = source;
    } else {

// jslint_cli - jslint directory.

        try {
            data = await moduleFs.promises.readdir(file, "utf8");
        } catch (ignore) {}
        if (data) {
            await Promise.all(data.map(async function (file2) {
                let code;
                let time_start = Date.now();
                file2 = file + "/" + file2;
                switch ((
                    /\.\w+?$|$/m
                ).exec(file2)[0]) {
                case ".cjs":
                case ".html":
                case ".js":
                case ".json":
                case ".md":
                case ".mjs":
                case ".sh":
                    break;
                default:
                    return;
                }
                try {
                    code = await moduleFs.promises.readFile(file2, "utf8");
                } catch (ignore) {
                    return;
                }
                if (
                    (
                        /(?:\b|_)(?:lock|min|raw|rollup)(?:\b|_)/
                    ).test(file2)
                    || !(code && code.length < 1048576)
                ) {
                    return;
                }
                jslint_from_file({
                    code,
                    file: file2,
                    option
                });
                console_error(
                    "jslint - " + (Date.now() - time_start) + "ms - " + file2
                );
            }));
            process_exit(exit_code);
            return exit_code;
        }

// jslint_cli - jslint file.

        try {
            data = await moduleFs.promises.readFile(file, "utf8");
        } catch (err) {
            console_error(err);
            exit_code = 1;
            process_exit(exit_code);
            return exit_code;
        }
    }
    result = jslint_from_file({
        code: data,
        file,
        option
    });
    if (mode_report) {
        result = jslint.jslint_report(result);
        result = `<body class="JSLINT_ JSLINT_REPORT_">\n${result}</body>\n`;
        await fsWriteFileWithParents(mode_report, result);
    }
    process_exit(exit_code);
    return exit_code;
}

function jslint_phase1_split() {

// PHASE 1. Split <source> by newlines into <line_list>.

    return;
}

function jslint_phase2_lex(state) {

// PHASE 2. Lex <line_list> into <token_list>.

    let {
        artifact,
        directive_list,
        global_dict,
        global_list,
        line_list,
        option_dict,
        stop,
        stop_at,
        tenure,
        test_cause,
        token_global,
        token_list,
        warn,
        warn_at
    } = state;
    let char;                   // The current character being lexed.
    let column = 0;             // The column number of the next character.
    let from;                   // The starting column number of the token.
    let from_mega;              // The starting column of megastring.
    let line = 0;               // The line number of the next character.
    let line_disable;           // The starting line of "/*jslint-disable*/".
    let line_mega;              // The starting line of megastring.
    let line_source = "";       // The remaining line source string.
    let line_whole = "";        // The whole line source string.
    let mode_digits_empty_string = 1;
    let mode_digits_numeric_separator = 2;
    let mode_directive = true;  // true if directives are still allowed.
    let mode_mega = false;      // true if currently parsing a megastring
                                // ... literal.
    let mode_regexp;            // true if regular expression literal seen on
                                // ... this line.
    let paren_backtrack_list = [];      // List of most recent "(" tokens at any
                                        // ... paren-depth.
    let paren_depth = 0;        // Keeps track of current paren-depth.
    let snippet = "";           // A piece of string.
    let token_1;                // The first token.
    let token_prv = token_global;       // The previous token including
                                        // ... comments.
    let token_prv_expr = token_global;  // The previous token excluding
                                        // ... comments.

// Most tokens, including the identifiers, operators, and punctuators, can be
// found with a regular expression. Regular expressions cannot correctly match
// regular expression literals, so we will match those the hard way. String
// literals and number literals can be matched by regular expressions, but they
// don't provide good warnings. The functions char_after, char_before,
// read_digits, and char_after_escape help in the parsing of literals.

    function char_after(match) {

// Get the next character from the source line. Remove it from the line_source,
// and append it to the snippet. Optionally check that the previous character
// matched an expected value.

        if (match !== undefined && char !== match) {

// test_cause:
// ["aa=/[", "char_after", "expected_a", "]", 5]
// ["aa=/aa{/", "char_after", "expected_a_b", "/", 8]

            return (
                char === ""
                ? stop_at("expected_a", line, column - 1, match)
                : stop_at("expected_a_b", line, column, match, char)
            );
        }
        char = line_source.slice(0, 1);
        line_source = line_source.slice(1);
        snippet += char || " ";
        column += 1;
        return char;
    }

    function char_after_escape(extra) {

// Validate char after escape "\\".

        char_after("\\");
        switch (char) {
        case "":

// test_cause:
// ["\"\\", "char_after_escape", "unclosed_string", "", 2]

            return stop_at("unclosed_string", line, column);
        case "/":
            return char_after();
        case "\\":
            return char_after();
        case "`":
            return char_after();
        case "b":
            return char_after();
        case "f":
            return char_after();
        case "n":
            return char_after();
        case "r":
            return char_after();
        case "t":

// test_cause:
// ["\"\\/\\\\\\`\\b\\f\\n\\r\\t\"", "char_after_escape", "char_after", "", 0]

            test_cause("char_after");
            return char_after();
        case "u":
            if (char_after("u") === "{") {
                if (state.mode_json) {

// test_cause:
// ["[\"\\u{12345}\"]", "char_after_escape", "unexpected_a", "{", 5]

                    warn_at("unexpected_a", line, column, char);
                }
                if (read_digits("x", undefined) > 5) {

// test_cause:
// ["\"\\u{123456}\"", "char_after_escape", "too_many_digits", "", 11]

                    warn_at("too_many_digits", line, column);
                }
                if (char !== "}") {

// test_cause:
// ["\"\\u{12345\"", "char_after_escape", "expected_a_before_b", "\"", 10]

                    stop_at("expected_a_before_b", line, column, "}", char);
                }
                return char_after();
            }
            char_before();
            if (read_digits("x", mode_digits_empty_string) < 4) {

// test_cause:
// ["\"\\u0\"", "char_after_escape", "expected_four_digits", "", 5]

                warn_at("expected_four_digits", line, column);
            }
            return;
        default:
            if (extra && extra.indexOf(char) >= 0) {
                return char_after();
            }

// test_cause:
// ["\"\\0\"", "char_after_escape", "unexpected_a_before_b", "0", 3]

            warn_at("unexpected_a_before_b", line, column, "\\", char);
        }
    }

    function char_before() {

// Back up one character by moving a character from the end of the snippet to
// the front of the line_source.

        char = snippet.slice(-1);
        line_source = char + line_source;
        column -= char.length;

// Remove last character from snippet.

        snippet = snippet.slice(0, -1);
        return char;
    }

    function check_numeric_separator(digits, column) {

// This function will check for illegal numeric-separator in <digits>.

        digits.replace((
            jslint_rgx_numeric_separator_illegal
        ), function (ignore, ii) {

// test_cause:
// ["0x0_0_;", "check_numeric_separator", "illegal_num_separator", "", 6]
// ["0x0_0__0;", "check_numeric_separator", "illegal_num_separator", "", 6]
// ["aa=1_2_;", "check_numeric_separator", "illegal_num_separator", "", 7]
// ["aa=1_2__3;", "check_numeric_separator", "illegal_num_separator", "", 7]
// ["aa=1_2_n;", "check_numeric_separator", "illegal_num_separator", "", 7]

            warn_at("illegal_num_separator", line, column + ii + 1);
            return "";
        });
    }

    function lex_comment() {
        let body;
        let ii = 0;
        let jj = 0;
        let the_comment;

// Create a comment object. Comments are not allowed in JSON text. Comments can
// include directives and notices of incompletion.

// Create token from comment //....

        if (snippet === "//") {
            snippet = line_source;
            line_source = "";
            the_comment = token_create("(comment)", snippet);
            if (mode_mega) {

// test_cause:
// ["`${//}`", "lex_comment", "unexpected_comment", "`", 4]

                warn("unexpected_comment", the_comment, "`");
            }

// Create token from comment /*...*/.

        } else {
            snippet = [];
            if (line_source[0] === "/") {

// test_cause:
// ["/*/", "lex_comment", "unexpected_a", "/", 2]

                warn_at("unexpected_a", line, column + ii, "/");
            }

// Lex/loop through each line until "*/".

            while (true) {
                // jslint_rgx_star_slash
                ii = line_source.indexOf("*/");
                if (ii >= 0) {
                    break;
                }
                // jslint_rgx_slash_star
                ii = line_source.indexOf("/*");
                if (ii >= 0) {

// test_cause:
// ["/*/*", "lex_comment", "nested_comment", "", 2]

                    warn_at("nested_comment", line, column + ii);
                }
                snippet.push(line_source);
                line_source = read_line();
                if (line_source === undefined) {

// test_cause:
// ["/*", "lex_comment", "unclosed_comment", "", 1]

                    return stop_at("unclosed_comment", line, column);
                }
            }
            jj = line_source.slice(0, ii).search(
                jslint_rgx_slash_star_or_slash
            );
            if (jj >= 0) {

// test_cause:
// ["/*/**/", "lex_comment", "nested_comment", "", 2]

                warn_at("nested_comment", line, column + jj);
            }
            snippet.push(line_source.slice(0, ii));
            snippet = snippet.join(" ");
            column += ii + 2;
            line_source = line_source.slice(ii + 2);
            the_comment = token_create("(comment)", snippet);
        }

// Uncompleted work comment.

        if (!option_dict.devel && jslint_rgx_todo.test(snippet)) {

// test_cause:
// ["//todo", "lex_comment", "todo_comment", "(comment)", 1] //jslint-ignore-line

            warn("todo_comment", the_comment);
        }

// Lex directives in comment.

        [
            the_comment.directive, body
        ] = Array.from(snippet.match(jslint_rgx_directive) || []).slice(1);
        if (the_comment.directive === undefined) {
            return the_comment;
        }
        directive_list.push(the_comment);
        if (!mode_directive) {

// test_cause:
// ["0\n/*global aa*/", "lex_comment", "misplaced_directive_a", "global", 1]

            warn_at("misplaced_directive_a", line, from, the_comment.directive);
            return the_comment;
        }

// lex_directive();
// JSLint recognizes three directives that can be encoded in comments. This
// function processes one item, and calls itself recursively to process the
// next one.

// Lex/loop through each directive in /*...*/

        ii = 0;
        body.replace(jslint_rgx_directive_part, function (
            match0,
            key,
            val,
            jj
        ) {
            if (ii !== jj) {

// test_cause:
// ["/*jslint !*/", "lex_comment", "bad_directive_a", "!", 1]

                return stop("bad_directive_a", the_comment, body.slice(ii));
            }
            if (match0 === "") {
                return "";
            }
            ii += match0.length;
            switch (the_comment.directive) {
            case "global":
                if (val) {

// test_cause:
// ["/*global aa:false*/", "lex_comment", "bad_option_a", "aa:false", 1]

                    warn("bad_option_a", the_comment, key + ":" + val);
                }
                global_dict[key] = "user-defined";

// PR-347 - Disable warning "unexpected_directive_a".
//
//                 state.mode_module = the_comment;

                break;
            case "jslint":
                if (!option_set_item(key, val !== "false")) {

// test_cause:
// ["/*jslint undefined*/", "lex_comment", "bad_option_a", "undefined", 1]

                    warn("bad_option_a", the_comment, key);
                }
                break;
            case "property":
                state.mode_property = true;
                tenure[key] = true;
                break;
            }
            return "";
        });
        return the_comment;
    }

    function lex_megastring() {
        let id;
        let match;

// The token is a megastring. We don't allow any kind of mega nesting.

        if (mode_mega) {

// test_cause:
// ["`${`", "lex_megastring", "expected_a_b", "`", 4]

            return stop_at("expected_a_b", line, column, "}", "`");
        }
        from_mega = from;
        line_mega = line;
        mode_mega = true;
        snippet = "";

// Parsing a mega literal is tricky. First create a ` token.

        token_create("`");
        from += 1;

// Then loop, building up a string, possibly from many lines, until seeing
// the end of file, a closing `, or a ${ indicting an expression within the
// string.

        while (true) {
            match = line_source.match(jslint_rgx_mega) || {
                "0": "",
                index: 0
            };
            snippet += line_source.slice(0, match.index);
            column += match.index;
            line_source = line_source.slice(match.index);
            match = match[0];
            switch (match) {
            case "${":

// if either ` or ${ was found, then the preceding joins the snippet to become
// a string token.

                token_create("(string)", snippet).quote = "`";
                snippet = "";

// If ${, then create tokens that will become part of an expression until
// a } token is made.

                column += 2;
                token_create("${");
                line_source = line_source.slice(2);

// Lex/loop through each token inside megastring-expression `${...}`.

                while (true) {
                    id = lex_token().id;
                    if (id === "{") {

// test_cause:
// ["`${{", "lex_megastring", "expected_a_b", "{", 4]

                        return stop_at("expected_a_b", line, column, "}", "{");
                    }
                    if (id === "}") {
                        break;
                    }
                }
                break;
            case "\\":
                snippet += line_source.slice(0, 2);
                line_source = line_source.slice(2);
                column += 2;
                break;
            case "`":

// if either ` or ${ was found, then the preceding joins the snippet to become
// a string token.

                token_create("(string)", snippet).quote = "`";
                snippet = "";

// Terminate megastring with `.

                line_source = line_source.slice(1);
                column += 1;
                mode_mega = false;
                return token_create("`");
            default:

// If neither ` nor ${ is seen, then the whole line joins the snippet.

                snippet += line_source + "\n";
                if (read_line() === undefined) {

// test_cause:
// ["`", "lex_megastring", "unclosed_mega", "", 1]

                    return stop_at("unclosed_mega", line_mega, from_mega);
                }
            }
        }
    }

    function lex_number() {
        let prefix = snippet;

// PR-390 - Add numeric-separator check.

        check_numeric_separator(prefix, column - prefix.length);
        char_after();
        switch (prefix === "0" && char) {
        case "b":
        case "o":
        case "x":
            read_digits(char, mode_digits_numeric_separator);

// PR-351 - Ignore BigInt suffix 'n'.

            if (char === "n") {
                char_after("n");
            }
            break;
        default:
            if (char === ".") {
                read_digits("d", mode_digits_numeric_separator);
            }
            if (char === "E" || char === "e") {
                char_after(char);
                if (char !== "+" && char !== "-") {
                    char_before();
                }
                read_digits("d", mode_digits_numeric_separator);
            }
        }

// If the next character after a number is a digit or letter, then something
// unexpected is going on.

        if (
            (char >= "0" && char <= "9")
            || (char >= "a" && char <= "z")
            || (char >= "A" && char <= "Z")
        ) {

// test_cause:
// ["0a", "lex_number", "unexpected_a_after_b", "0", 2]

            return stop_at(
                "unexpected_a_after_b",
                line,
                column,
                snippet.slice(-1),
                snippet.slice(0, -1)
            );
        }
        char_before();
        return token_create("(number)", snippet);
    }

    function lex_regexp() {

// Regexp
// Lex a regular expression literal.

        let flag;
        let mode_regexp_multiline;
        let result;
        let value;
        mode_regexp = true;

        function lex_regexp_bracketed() {
            let mode_regexp_range;

// RegExp
// Match a class.

            char_after("[");
            if (char === "^") {
                char_after("^");
            }
            while (true) {

// RegExp
// Match a character in a character class.

                switch (char) {
                case "":
                case "]":

// test_cause:
// ["aa=/[", "lex_regexp_bracketed", "closer", "", 0]
// ["aa=/[]/", "lex_regexp_bracketed", "closer", "", 0]

                    test_cause("closer");
                    if (mode_regexp_range) {

// test_cause:
// ["aa=/[0-]/", "lex_regexp_bracketed", "unexpected_a", "-", 7]

                        warn_at("unexpected_a", line, column - 1, "-");
                    }
                    return char_after("]");

// PR-362 - Relax regexp-warning against using <space>.
//
//                 case " ":
//
// // test_cause:
// // ["aa=/[ ]/", "lex_regexp_bracketed", "expected_a_b", " ", 6]
//
//                     warn_at("expected_a_b", line, column, "\\u0020", " ");
//                     break;

                case "-":
                case "/":
                case "[":
                case "^":

// test_cause:
// ["aa=/[-]/", "lex_regexp_bracketed", "expected_a_before_b", "-", 6]
// ["aa=/[.^]/", "lex_regexp_bracketed", "expected_a_before_b", "^", 7]
// ["aa=/[/", "lex_regexp_bracketed", "expected_a_before_b", "/", 6]
// ["aa=/[\\\\/]/", "lex_regexp_bracketed", "expected_a_before_b", "/", 8]
// ["aa=/[\\\\[]/", "lex_regexp_bracketed", "expected_a_before_b", "[", 8]

                    warn_at("expected_a_before_b", line, column, "\\", char);
                    break;
                case "\\":
                    char_after_escape("BbDdSsWw-[]^");
                    char_before();
                    break;
                case "`":
                    if (mode_mega) {

// test_cause:
// ["`${/[`]/}`", "lex_regexp_bracketed", "unexpected_a", "`", 6]

                        warn_at("unexpected_a", line, column, "`");
                    }
                    break;
                }
                char_after();
                mode_regexp_range = false;
                if (char === "-") {

// RegExp
// Match a range of subclasses.

                    mode_regexp_range = true;
                    char_after("-");
                }
            }
        }

        function lex_regexp_group() {

// RegExp
// Lex sequence of characters in regexp.

            switch (char) {
            case "":
                warn_at("expected_regexp_factor_a", line, column, char);
                break;
            case ")":
                warn_at("expected_regexp_factor_a", line, column, char);
                break;
            case "]":

// test_cause:
// ["/ /", "lex_regexp_group", "expected_regexp_factor_a", "", 3]
// ["aa=/)", "lex_regexp_group", "expected_regexp_factor_a", ")", 5]
// ["aa=/]", "lex_regexp_group", "expected_regexp_factor_a", "]", 5]

                warn_at("expected_regexp_factor_a", line, column, char);
                break;
            }
            while (true) {
                switch (char) {
                case "":
                case ")":
                case "/":
                case "]":
                    return;

// PR-362 - Relax regexp-warning against using <space>.
//
//                 case " ":
//
// // test_cause:
// // ["aa=/ /", "lex_regexp_group", "expected_a_b", " ", 5]
//
//                     warn_at("expected_a_b", line, column, "\\s", " ");
//                     char_after();
//                     break;

                case "$":
                    if (line_source[0] !== "/") {
                        mode_regexp_multiline = true;
                    }
                    char_after();
                    break;
                case "(":

// RegExp
// Match a group that starts with left paren.

                    char_after("(");
                    switch (char) {
                    case ":":

// test_cause:
// ["aa=/(:)/", "lex_regexp_group", "expected_a_before_b", ":", 6]
// ["aa=/?/", "lex_regexp_group", "expected_a_before_b", "?", 5]

                        warn_at("expected_a_before_b", line, column, "?", ":");
                        break;
                    case "?":
                        char_after("?");
                        switch (char) {
                        case "!":

// PR-437 - Add grammar for regexp-named-capture-group.

                        case "<":
                        case "=":
                            char_after();
                            break;
                        default:
                            char_after(":");
                        }
                        break;
                    }

// RegExp
// Recurse lex_regexp_group().

                    lex_regexp_group();
                    char_after(")");
                    break;
                case "*":
                case "+":
                case "?":
                case "{":
                case "}":

// test_cause:
// ["aa=/+/", "lex_regexp_group", "expected_a_before_b", "+", 5]
// ["aa=/.**/", "lex_regexp_group", "expected_a_before_b", "*", 7]
// ["aa=/?/", "lex_regexp_group", "expected_a_before_b", "?", 5]
// ["aa=/{/", "lex_regexp_group", "expected_a_before_b", "{", 5]
// ["aa=/}/", "lex_regexp_group", "expected_a_before_b", "}", 5]

                    warn_at("expected_a_before_b", line, column, "\\", char);
                    char_after();
                    break;
                case "[":
                    lex_regexp_bracketed();
                    break;
                case "\\":

// test_cause:
// ["aa=/\\/", "lex_regexp_group", "escape", "", 0]

                    test_cause("escape");

// PR-437 - Add grammar for regexp-named-backreference.

                    char_after_escape("BbDdSsWw^${}[]():=!.|*+?k");
                    break;
                case "^":
                    if (snippet !== "^") {
                        mode_regexp_multiline = true;
                    }
                    char_after();
                    break;
                case "`":
                    if (mode_mega) {

// test_cause:
// ["`${/`/}`", "lex_regexp_group", "unexpected_a", "`", 5]

                        warn_at("unexpected_a", line, column, "`");
                    }
                    char_after();
                    break;
                default:
                    char_after();
                }

// RegExp
// Match an optional quantifier.

                switch (char) {
                case "*":
                case "+":
                    if (char_after(char) === "?") {

// test_cause:
// ["aa=/.*?/", "lex_regexp_group", "?", "", 0]
// ["aa=/.+?/", "lex_regexp_group", "?", "", 0]

                        test_cause("?");
                        char_after("?");
                    }
                    break;
                case "?":
                    if (char_after("?") === "?") {

// test_cause:
// ["aa=/.??/", "lex_regexp_group", "unexpected_a", "?", 7]

                        warn_at("unexpected_a", line, column, char);
                        char_after("?");
                    }
                    break;
                case "{":
                    if (read_digits("d", mode_digits_empty_string) === 0) {

// test_cause:
// ["aa=/aa{/", "lex_regexp_group", "expected_a_before_b", ",", 8]

                        warn_at("expected_a_before_b", line, column, "0", ",");
                    }
                    if (char === ",") {

// test_cause:
// ["aa=/.{,/", "lex_regexp_group", "comma", "", 0]

                        test_cause("comma");
                        read_digits("d", mode_digits_empty_string);
                    }
                    if (char_after("}") === "?") {

// test_cause:
// ["aa=/.{0}?/", "lex_regexp_group", "unexpected_a", "?", 9]

                        warn_at("unexpected_a", line, column, char);
                        char_after("?");
                    }
                    break;
                }
            }
        }

// RegExp
// Scan the regexp literal. Give a warning if the first character is = because
// /= looks like a division assignment operator.

        snippet = "";
        char_after();
        if (char === "=") {

// test_cause:
// ["aa=/=/", "lex_regexp", "expected_a_before_b", "=", 5]

            warn_at("expected_a_before_b", line, column, "\\", "=");
        }
        lex_regexp_group();

// RegExp
// Remove last character from snippet.

        snippet = snippet.slice(0, -1);

// RegExp
// Make sure there is a closing slash.

        value = snippet;
        char_after("/");

// RegExp
// Create flag.

        flag = empty();
        while (

// Regexp
// char is a letter.

            (char >= "a" && char <= "z\uffff")
            || (char >= "A" && char <= "Z\uffff")
        ) {

// RegExp
// Process dangling flag letters.

            switch (!flag[char] && char) {
            case "g":
                break;
            case "i":
                break;
            case "m":
                break;
            case "u":
                break;
            case "y":

// test_cause:
// ["aa=/./gimuy", "lex_regexp", "flag", "", 0]

                test_cause("flag");
                break;
            default:

// test_cause:
// ["aa=/./gg", "lex_regexp", "unexpected_a", "g", 8]
// ["aa=/./z", "lex_regexp", "unexpected_a", "z", 7]

                warn_at("unexpected_a", line, column, char);
            }
            flag[char] = true;
            char_after();
        }
        char_before();
        if (char === "/" || char === "*") {

// test_cause:
// ["aa=/.//", "lex_regexp", "unexpected_a", "/", 3]

            return stop_at("unexpected_a", line, from, char);
        }
        result = token_create("(regexp)", char);
        result.flag = flag;
        result.value = value;
        if (mode_regexp_multiline && !flag.m) {

// test_cause:
// ["aa=/$^/", "lex_regexp", "missing_m", "", 7]

            warn_at("missing_m", line, column);
        }
        return result;
    }

    function lex_slash_or_regexp() {

// The / can be a division operator or the beginning of a regular expression
// literal. It is not possible to know which without doing a complete parse.
// We want to complete the tokenization before we begin to parse, so we will
// estimate. This estimator can fail in some cases. For example, it cannot
// know if "}" is ending a block or ending an object literal, so it can
// behave incorrectly in that case; it is not meaningful to divide an
// object, so it is likely that we can get away with it. We avoided the worst
// cases by eliminating automatic semicolon insertion.

        let the_token;
        switch (
            token_prv_expr.identifier
            && !token_prv_expr.dot
            && token_prv_expr.id
        ) {
        case "case":
        case "delete":
        case "in":
        case "instanceof":
        case "new":
        case "typeof":
        case "void":
        case "yield":
            the_token = lex_regexp();

// test_cause:
// ["case /./", "lex_slash_or_regexp", "unexpected_a", "(regexp)", 6]
// ["delete /./", "lex_slash_or_regexp", "unexpected_a", "(regexp)", 8]
// ["in /./", "lex_slash_or_regexp", "unexpected_a", "(regexp)", 4]
// ["instanceof /./", "lex_slash_or_regexp", "unexpected_a", "(regexp)", 12]
// ["new /./", "lex_slash_or_regexp", "unexpected_a", "(regexp)", 5]
// ["typeof /./", "lex_slash_or_regexp", "unexpected_a", "(regexp)", 8]
// ["void /./", "lex_slash_or_regexp", "unexpected_a", "(regexp)", 6]
// ["yield /./", "lex_slash_or_regexp", "unexpected_a", "(regexp)", 7]

            return stop("unexpected_a", the_token);
        case "return":
            return lex_regexp();
        }
        switch (!token_prv_expr.identifier && token_prv_expr.id.slice(-1)) {
        case "!":
        case "%":
        case "&":
        case "*":
        case "+":
        case "-":
        case "/":
        case ";":
        case "<":
        case ">":
        case "^":
        case "{":
        case "|":
        case "}":
        case "~":
            the_token = lex_regexp();

// test_cause:
// ["!/./", "lex_slash_or_regexp", "wrap_regexp", "(regexp)", 2]
// ["%/./", "lex_slash_or_regexp", "wrap_regexp", "(regexp)", 2]
// ["&/./", "lex_slash_or_regexp", "wrap_regexp", "(regexp)", 2]
// ["+/./", "lex_slash_or_regexp", "wrap_regexp", "(regexp)", 2]
// ["-/./", "lex_slash_or_regexp", "wrap_regexp", "(regexp)", 2]
// ["0 * /./", "lex_slash_or_regexp", "wrap_regexp", "(regexp)", 5]
// ["0 / /./", "lex_slash_or_regexp", "wrap_regexp", "(regexp)", 5]
// [";/./", "lex_slash_or_regexp", "wrap_regexp", "(regexp)", 2]
// ["</./", "lex_slash_or_regexp", "wrap_regexp", "(regexp)", 2]
// [">/./", "lex_slash_or_regexp", "wrap_regexp", "(regexp)", 2]
// ["^/./", "lex_slash_or_regexp", "wrap_regexp", "(regexp)", 2]
// ["{/./", "lex_slash_or_regexp", "wrap_regexp", "(regexp)", 2]
// ["|/./", "lex_slash_or_regexp", "wrap_regexp", "(regexp)", 2]
// ["}/./", "lex_slash_or_regexp", "wrap_regexp", "(regexp)", 2]
// ["~/./", "lex_slash_or_regexp", "wrap_regexp", "(regexp)", 2]

            warn("wrap_regexp", the_token);
            return the_token;
        case "(":
        case ",":
        case ":":
        case "=":
        case "?":
        case "[":

// test_cause:
// ["(/./", "lex_slash_or_regexp", "recurse", "", 0]
// [",/./", "lex_slash_or_regexp", "recurse", "", 0]
// [":/./", "lex_slash_or_regexp", "recurse", "", 0]
// ["=/./", "lex_slash_or_regexp", "recurse", "", 0]
// ["?/./", "lex_slash_or_regexp", "recurse", "", 0]
// ["aa[/./", "lex_slash_or_regexp", "recurse", "", 0]

            test_cause("recurse");
            return lex_regexp();
        }
        if (line_source[0] === "=") {
            column += 1;
            line_source = line_source.slice(1);
            snippet = "/=";
            warn_at("unexpected_a", line, column, "/=");
        }
        return token_create(snippet);
    }

    function lex_string(quote) {

// Create a string token.

        let the_token;
        if (!option_dict.single && quote === "'") {

// test_cause:
// ["''", "lex_string", "use_double", "", 1]

            warn_at("use_double", line, column);
        }
        snippet = "";
        char_after();

// Lex/loop through each character in "...".

        while (true) {
            switch (char) {
            case "":

// test_cause:
// ["\"", "lex_string", "unclosed_string", "", 1]

                return stop_at("unclosed_string", line, column);
            case "\\":
                char_after_escape(quote);
                break;
            case "`":
                if (mode_mega) {

// test_cause:
// ["`${\"`\"}`", "lex_string", "unexpected_a", "`", 5]

                    warn_at("unexpected_a", line, column, "`");
                }
                char_after("`");
                break;
            case quote:

// Remove last character from snippet.

                snippet = snippet.slice(0, -1);
                the_token = token_create("(string)", snippet);
                the_token.quote = quote;
                return the_token;
            default:
                char_after();
            }
        }
    }

    function lex_token() {
        let match;

// Lex/loop through each whitespace.

        while (true) {

// Lex/loop through each blank-line.

            while (!line_source) {
                line_source = read_line();
                from = 0;
                if (line_source === undefined) {
                    return (
                        mode_mega

// test_cause:
// ["`${//}`", "lex_token", "unclosed_mega", "", 1]

                        ? stop_at("unclosed_mega", line_mega, from_mega)
                        : line_disable !== undefined

// test_cause:
// ["/*jslint-disable*/", "lex_token", "unclosed_disable", "", 1]

                        ? stop_at("unclosed_disable", line_disable)
                        : token_create("(end)")
                    );
                }
            }
            from = column;
            match = line_source.match(jslint_rgx_token);

// match[1] token
// match[2] whitespace
// match[3] identifier
// match[4] number
// match[5] rest

            if (!match) {

// test_cause:
// ["#", "lex_token", "unexpected_char_a", "#", 1]

                return stop_at(
                    "unexpected_char_a",
                    line,
                    column,
                    line_source[0]
                );
            }
            snippet = match[1];
            column += snippet.length;
            line_source = match[5];
            if (!match[2]) {
                break;
            }
        }

// The token is an identifier.

        if (match[3]) {
            return token_create(snippet, undefined, true);
        }

// Create token from number.

        if (match[4]) {
            return lex_number();
        }

// Create token from string "..." or '...'.

        if (snippet === "\"" || snippet === "'") {
            return lex_string(snippet);
        }

// Create token from megastring `...`.

        if (snippet === "`") {
            return lex_megastring();
        }

// Create token from comment /*...*/ or //....

        if (snippet === "/*" || snippet === "//") {
            return lex_comment();
        }

// Create token from slash /.

        if (snippet === "/") {
            return lex_slash_or_regexp();
        }
        return token_create(snippet);
    }

    function option_set_item(key, val) {

// These are the options that are recognized in the option object or that may
// appear in a /*jslint*/ directive. Most options will have a boolean value,
// usually true. Some options will also predefine some number of global
// variables.

        switch (key) {
        case "beta":            // Enable experimental warnings.
        case "bitwise":         // Allow bitwise operator.
        case "browser":         // Assume browser environment.
        case "convert":         // Allow conversion operator.
        case "couch":           // Assume CouchDb environment.
        case "devel":           // Allow console.log() and friends.
        case "ecma":            // Assume ECMAScript environment.
        case "eval":            // Allow eval().
        case "fart":            // Allow complex fat-arrow.
        case "for":             // Allow for-statement.
        case "getset":          // Allow get() and set().
        case "indent2":         // Use 2-space indent.
        case "long":            // Allow long lines.
        case "node":            // Assume Node.js environment.
        case "nomen":           // Allow weird property name.
        case "single":          // Allow single-quote strings.
        case "subscript":       // Allow identifier in subscript-notation.
        case "test_cause":      // Test jslint's causes.
        case "test_internal_error":     // Test jslint's internal-error
                                        // ... handling-ability.
        case "this":            // Allow 'this'.
        case "trace":           // Include jslint stack-trace in warnings.
        case "unordered":       // Allow unordered cases, params, properties,
                                // ... variables, and exports.
        case "variable":        // Allow unordered const and let declarations
                                // ... that are not at top of function-scope.
        case "white":           // Allow messy whitespace.
            option_dict[key] = val;
            break;

// PR-404 - Alias "evil" to jslint-directive "eval" for backwards-compat.

        case "evil":
            return option_set_item("eval", val);

// PR-404 - Alias "nomen" to jslint-directive "name" for backwards-compat.

        case "name":
            return option_set_item("nomen", val);
        default:
            return false;
        }

// Initialize global-variables.

        switch (val && key) {

// Assign global browser variables to global_dict.
/*
// /\*jslint beta, browser, devel*\/
console.log(JSON.stringify(Object.keys(window).sort(), undefined, 4));
*/

        case "browser":
            object_assign_from_list(global_dict, [

// Shared with Node.js.

                "AbortController",
                // "Buffer",
                // "Crypto",
                // "CryptoKey",
                "Event",
                "EventTarget",
                "MessageChannel",
                "MessageEvent",
                "MessagePort",
                // "Request",
                // "Response",
                // "SubtleCrypto",
                "TextDecoder",
                "TextEncoder",
                "URL",
                "URLSearchParams",
                "WebAssembly",
                // "__dirname",
                // "__filename",
                // "atob",
                // "btoa",
                // "clearImmediate",
                "clearInterval",
                "clearTimeout",
                // "console",
                // "crypto",
                // "exports",
                // "fetch",
                // "global",
                // "module",
                "performance",
                // "process",
                "queueMicrotask",
                // "require",
                // "setImmediate",
                "setInterval",
                "setTimeout",

// Web worker only.
// https://github.com/mdn/content/blob/main/files/en-us/web/api
// /workerglobalscope/index.md

                "importScripts",

// Window.

                "Blob",
                // "CharacterData",
                // "DocumentType",
                // "Element",
                // "Event",
                "FileReader",
                // "FontFace",
                "FormData",
                "IntersectionObserver",
                "MutationObserver",
                // "Storage",
                // "TextDecoder",
                // "TextEncoder",
                // "URL",
                "Worker",
                "XMLHttpRequest",
                // "caches",
                // "clearInterval",
                // "clearTimeout",
                "document",
                // "event",
                "fetch",
                // "history",
                "indexedDb",
                "localStorage",
                "location",
                // "name",
                "navigator",
                "postMessage",
                // "screen",
                "sessionStorage",
                // "setInterval",
                // "setTimeout",
                "structuredClone",
                "window"
            ], "browser");
            break;

// https://docs.couchdb.org/en/stable/query-server/javascript.html#javascript

        case "couch":
            object_assign_from_list(global_dict, [
                "emit",
                "getRow",
                "isArray",
                "log",
                "provides",
                "registerType",
                "require",
                "send",
                "start",
                "sum",
                "toJSON"
            ], "CouchDb");
            break;
        case "devel":
            object_assign_from_list(global_dict, [
                "alert", "confirm", "console", "prompt"
            ], "development");
            break;

// These are the globals that are provided by the language standard.
// Assign global ECMAScript variables to global_dict.
/*
node --input-type=module --eval '
// /\*jslint beta, node*\/
import https from "https";
(async function () {
    let dict = {import: true};
    let result = "";
    await new Promise(function (resolve) {
        https.get((
            "https://raw.githubusercontent.com/mdn/content/main/files"
            + "/en-us/web/javascript/reference/global_objects/index.md"
        ), function (res) {
            res.on("data", function (chunk) {
                result += chunk;
            }).on("end", resolve).setEncoding("utf8");
        });
    });
    result.replace((
        /\n- \{\{JSxRef\("(?:Global_Objects\/)?([^"\/]+?)"/g
    ), function (ignore, key) {
        if (globalThis.hasOwnProperty(key)) {
            dict[key] = true;
        }
        return "";
    });
    console.log(JSON.stringify(Object.keys(dict).sort(), undefined, 4));
}());
'
*/

        case "ecma":
            object_assign_from_list(global_dict, [
                "AggregateError",
                "Array",
                "ArrayBuffer",
                "Atomics",
                "BigInt",
                "BigInt64Array",
                "BigUint64Array",
                "Boolean",
                "DataView",
                "Date",
                "Error",
                "EvalError",
                "Float32Array",
                "Float64Array",
                "Function",
                "Infinity",
                "Int16Array",
                "Int32Array",
                "Int8Array",
                "Intl",
                "JSON",
                "Map",
                "Math",
                "NaN",
                "Number",
                "Object",
                "Promise",
                "Proxy",
                "RangeError",
                "ReferenceError",
                "Reflect",
                "RegExp",
                "Set",
                "SharedArrayBuffer",
                "String",
                "Symbol",
                "SyntaxError",
                "TypeError",
                "URIError",
                "Uint16Array",
                "Uint32Array",
                "Uint8Array",
                "Uint8ClampedArray",
                "WeakMap",
                "WeakSet",
                "WebAssembly",
                "decodeURI",
                "decodeURIComponent",
                "encodeURI",
                "encodeURIComponent",
                "eval",
                "globalThis",
                "import",
                "isFinite",
                "isNaN",
                "parseFloat",
                "parseInt",
                "undefined"
            ], "ECMAScript");
            break;

// Assign global Node.js variables to global_dict.
/*
node --input-type=module --eval '
// /\*jslint beta, node*\/
import moduleHttps from "https";
(async function () {
    let dict = Object.create(null);
    let result = "";
    await new Promise(function (resolve) {
        moduleHttps.get((
            "https://raw.githubusercontent.com/nodejs/node/v16.x/doc/api"
            + "/globals.md"
        ), function (res) {
            res.on("data", function (chunk) {
                result += chunk;
            }).on("end", resolve).setEncoding("utf8");
        });
    });
    result.replace((
        /\n(?:\* \[`|## |## Class: )`\w+/g
    ), function (match0) {
        dict[match0.split("`")[1]] = true;
        return "";
    });
    console.log(JSON.stringify(Object.keys(dict).sort(), undefined, 4));
}());
'
*/

        case "node":
            object_assign_from_list(global_dict, [
                "AbortController",
                "Buffer",
                // "Crypto",
                // "CryptoKey",
                "Event",
                "EventTarget",
                "MessageChannel",
                "MessageEvent",
                "MessagePort",
                // "Request",
                // "Response",
                // "SubtleCrypto",
                "TextDecoder",
                "TextEncoder",
                "URL",
                "URLSearchParams",
                "WebAssembly",
                "__dirname",
                "__filename",
                // "atob",
                // "btoa",
                "clearImmediate",
                "clearInterval",
                "clearTimeout",
                "console",
                // "crypto",
                "exports",
                // "fetch",
                "global",
                "module",
                "performance",
                "process",
                "queueMicrotask",
                "require",
                "setImmediate",
                "setInterval",
                "setTimeout"
            ], "Node.js");
            break;
        }
        return true;
    }

    function read_digits(base, mode) {
        let digits = line_source.match(
            base === "b"
            ? jslint_rgx_digits_bits
            : base === "o"
            ? jslint_rgx_digits_octals
            : base === "x"
            ? jslint_rgx_digits_hexs
            : jslint_rgx_digits_decimals
        )[0];
        if (
            (mode !== mode_digits_empty_string && digits.length === 0)
            || digits[0] === "_"
        ) {

// test_cause:
// ["0x", "read_digits", "expected_digits_after_a", "0x", 2]
// ["0x_", "read_digits", "expected_digits_after_a", "0x", 2]

            warn_at("expected_digits_after_a", line, column, snippet);
        }

// PR-390 - Add numeric-separator check.

        if (mode === mode_digits_numeric_separator) {
            check_numeric_separator(digits, column);
        } else if (digits.indexOf("_") >= 0) {

// test_cause:
// ["\"\\u{1_2}\"", "read_digits", "illegal_num_separator", "", 6]

            warn_at(
                "illegal_num_separator",
                line,
                column + digits.indexOf("_") + 1
            );
        }
        column += digits.length;
        line_source = line_source.slice(digits.length);
        snippet += digits;
        char_after();
        return digits.length;
    }

    function read_line() {

// Put the next line of source in line_source. If the line contains tabs,
// replace them with spaces and give a warning. Also warn if the line contains
// unsafe characters or is too damn long.

        if (
            !option_dict.long
            && line_whole.length > 80
            && line_disable === undefined
            && !state.mode_json
            && token_1
            && !mode_regexp
        ) {

// test_cause:
// ["/////////////////////////////////////////////////////////////////////////////////", "read_line", "too_long", "", 1] //jslint-ignore-line

            warn_at("too_long", line);
        }
        column = 0;
        line += 1;
        mode_regexp = false;
        line_source = undefined;
        line_whole = "";
        if (line_list[line] === undefined) {
            return line_source;
        }
        line_source = line_list[line].line_source;
        line_whole = line_source;

// Scan each line for following ignore-directives:
// "/*jslint-disable*/"
// "/*jslint-enable*/"
// "//jslint-ignore-line"

        if (line_source === "/*jslint-disable*/") {

// test_cause:
// ["/*jslint-disable*/", "read_line", "jslint_disable", "", 0]

            test_cause("jslint_disable");
            line_disable = line;
        } else if (line_source === "/*jslint-enable*/") {
            if (line_disable === undefined) {

// test_cause:
// ["/*jslint-enable*/", "read_line", "unopened_enable", "", 1]

                stop_at("unopened_enable", line);
            }
            line_disable = undefined;
        } else if (
            line_source.endsWith(" //jslint-ignore-line")
            || line_source.endsWith(" //jslint-quiet")
        ) {

// test_cause:
// ["0 //jslint-ignore-line", "read_line", "jslint_ignore_line", "", 0]

            test_cause("jslint_ignore_line");
            line_list[line].directive_ignore_line = true;
        }
        if (line_disable !== undefined) {

// test_cause:
// ["/*jslint-disable*/\n0", "read_line", "line_disable", "", 0]

            test_cause("line_disable");
            line_source = "";
        }
        // jslint_rgx_tab
        if (line_source.indexOf("\t") >= 0) {
            if (!option_dict.white) {

// test_cause:
// ["\t", "read_line", "use_spaces", "", 1]

                warn_at("use_spaces", line, line_source.indexOf("\t") + 1);
            }
            line_source = line_source.replace(jslint_rgx_tab, " ");
        }
        if (!option_dict.white && line_source.endsWith(" ")) {

// test_cause:
// [" ", "read_line", "unexpected_trailing_space", "", 1]

            warn_at("unexpected_trailing_space", line, line_source.length - 1);
        }
        return line_source;
    }

    function token_create(id, value, identifier) {

// Create the token object and append it to token_list.

        let the_token = {
            from,
            id,
            identifier: Boolean(identifier),
            line,
            nr: token_list.length,
            thru: column,
            value
        };
        token_list.push(the_token);

// Directives must appear before the first statement.

        if (id !== "(comment)" && id !== ";") {
            mode_directive = false;
        }

// If this token is an identifier that touches a preceding number, or
// a "/", comment, or regular expression literal that touches a preceding
// comment or regular expression literal, then give a missing space warning.
// This warning is not suppressed by option_dict.white.

        if (
            token_prv.line === line
            && token_prv.thru === from
            && (id === "(comment)" || id === "(regexp)" || id === "/")
            && (token_prv.id === "(comment)" || token_prv.id === "(regexp)")
        ) {

// test_cause:
// ["/**//**/", "token_create", "expected_space_a_b", "(comment)", 5]

            warn(
                "expected_space_a_b",
                the_token,
                artifact(token_prv),
                artifact(the_token)
            );
        }
        if (token_prv.id === "." && id === "(number)") {

// test_cause:
// [".0", "token_create", "expected_a_before_b", ".", 1]

            warn("expected_a_before_b", token_prv, "0", ".");
        }
        if (token_prv_expr.id === "." && the_token.identifier) {
            the_token.dot = true;
        }

// PR-385 - Bugfix - Fixes issue #382 - failure to detect destructured fart.
// Farts are now detected by keeping a list of most recent "(" tokens at any
// given depth. When a "=>" token is encountered, the most recent "(" token at
// current depth is marked as a fart.

        switch (id) {
        case "(":
            paren_backtrack_list[paren_depth] = the_token;
            paren_depth += 1;
            break;
        case ")":
            paren_depth -= 1;
            break;
        case "=>":
            if (
                token_prv_expr.id === ")"
                && paren_backtrack_list[paren_depth]
            ) {
                paren_backtrack_list[paren_depth].fart = the_token;
            }
            break;
        }

// The previous token is used to detect adjacency problems.

        token_prv = the_token;

// The token_prv_expr token is a previous token that was not a comment.
// The token_prv_expr token
// is used to disambiguate "/", which can mean division or regular expression
// literal.

        if (token_prv.id !== "(comment)") {
            token_prv_expr = token_prv;
        }
        return the_token;
    }

// Init global_dict and option_dict.

    option_set_item("ecma", true);
    Object.keys(option_dict).sort().forEach(function (key) {
        option_set_item(key, option_dict[key] === true);
    });
    object_assign_from_list(global_dict, global_list, "user-defined");

// Scan first line for "#!" and ignore it.

    if (line_list[jslint_fudge].line_source.startsWith("#!")) {
        line += 1;
        state.mode_shebang = true;
    }
    token_1 = lex_token();
    state.mode_json = token_1.id === "{" || token_1.id === "[";

// Lex/loop through each token until (end).

    while (true) {
        if (lex_token().id === "(end)") {
            break;
        }
    }
}

function jslint_phase3_parse(state) {

// PHASE 3. Parse <token_list> into <token_tree> using the Pratt-parser.

// Parsing:

// Parsing weaves the tokens into an abstract syntax tree. During that process,
// a token may be given any of these properties:

//      arity       string
//      label       identifier
//      name        identifier
//      expression  expressions
//      block       statements
//      else        statements (else, default, catch)

// Specialized tokens may have additional properties.

    let anon = "anonymous";     // The guessed name for anonymous functions.
    let {
        artifact,
        catch_list,
        catch_stack,
        export_dict,
        function_list,
        function_stack,
        global_dict,
        import_list,
        is_equal,
        option_dict,
        property_dict,
        stop,
        syntax_dict,
        tenure,
        test_cause,
        token_global,
        token_list,
        warn,
        warn_at
    } = state;
    let catchage = catch_stack[0];      // The current catch-block.
    let functionage = token_global;     // The current function.
    let mode_var;               // "var" if using var; "let" if using let.
    let token_ii = 0;           // The number of the next token.
    let token_now = token_global;       // The current token being examined in
                                        // ... the parse.
    let token_nxt = token_global;       // The next token to be examined in
                                        // ... <token_list>.

    function advance(id, match) {

// Produce the next token.

// Attempt to give helpful names to anonymous functions.

        if (
            token_now.identifier
            && token_now.id !== "function"
            && token_now.id !== "async"
        ) {
            anon = token_now.id;
        } else if (
            token_now.id === "(string)"
            && jslint_rgx_identifier.test(token_now.value)
        ) {
            anon = token_now.value;
        }

// Attempt to match token_nxt with an expected id.

        if (id !== undefined && token_nxt.id !== id) {
            return (
                match === undefined

// test_cause:
// ["{0:0}", "advance", "expected_a_b", "0", 2]

                ? stop("expected_a_b", token_nxt, id, artifact())

// test_cause:
// ["{\"aa\":0", "advance", "expected_a_b_from_c_d", "{", 1]

                : stop(
                    "expected_a_b_from_c_d",
                    token_nxt,
                    id,
                    artifact(match),
                    match.line,
                    artifact()
                )
            );
        }

// Promote the tokens, skipping comments.

        token_now = token_nxt;
        while (true) {
            token_nxt = token_list[token_ii];
            state.token_nxt = token_nxt;
            token_ii += 1;
            if (token_nxt.id !== "(comment)") {
                if (token_nxt.id === "(end)") {
                    token_ii -= 1;
                }
                break;
            }
            if (state.mode_json) {

// test_cause:
// ["[//]", "advance", "unexpected_a", "(comment)", 2]

                warn("unexpected_a");
            }
        }
    }

    function assignment(id) {

// Create an assignment operator. The one true assignment is different because
// its left side, when it is a variable, is not treated as an expression.
// That case is special because that is when a variable gets initialized. The
// other assignment operators can modify, but they cannot initialize.

        const the_symbol = symbol(id, 20);
        the_symbol.led_infix = function (left) {
            const the_token = token_now;
            let right;
            the_token.arity = "assignment";
            right = parse_expression(20 - 1);
            if (id === "=" && left.arity === "variable") {
                the_token.names = left;
                the_token.expression = right;
            } else {
                the_token.expression = [left, right];
            }
            if (
                right.arity === "assignment"
                || right.arity === "preassign"
                || right.arity === "postassign"
            ) {
                warn("unexpected_a", right);
            }
            check_mutation(left);
            return the_token;
        };
        return the_symbol;
    }

    function block(special) {

// Parse a block, a sequence of statements wrapped in braces.
//  special "body"      The block is a function body.
//          "ignore"    No warning on an empty block.
//          "naked"     No advance.
//          undefined   An ordinary block.

        let stmts;
        let the_block;
        if (special !== "naked") {
            advance("{");
        }
        the_block = token_now;
        if (special !== "body") {
            functionage.statement_prv = the_block;
        }
        the_block.arity = "statement";
        the_block.body = special === "body";

// Top level function bodies may include the "use strict" pragma.

        if (
            special === "body"
            && function_stack.length === 1
            && token_nxt.value === "use strict"
        ) {
            token_nxt.statement = true;
            advance("(string)");
            advance(";");
        }
        stmts = parse_statements();
        the_block.block = stmts;
        if (stmts.length === 0) {
            if (!option_dict.devel && special !== "ignore") {

// test_cause:
// ["function aa(){}", "block", "empty_block", "{", 14]

                warn("empty_block", the_block);
            }
            the_block.disrupt = false;
        } else {
            the_block.disrupt = stmts[stmts.length - 1].disrupt;
        }
        advance("}");
        return the_block;
    }

    function check_left(left, right) {

// Warn if the left is not one of these:
//      ?.
//      ?:
//      e()
//      e.b
//      e[b]
//      identifier

        const id = left.id;
        if (
            !left.identifier
            && (
                left.arity !== "ternary"
                || (
                    !check_left(left.expression[1])
                    && !check_left(left.expression[2])
                )
            )
            && (
                left.arity !== "binary"
                || (id !== "." && id !== "?." && id !== "(" && id !== "[")
            )
        ) {
            warn("unexpected_a", right || token_nxt);
            return false;
        }
        return true;
    }

    function check_mutation(the_thing) {

// The only expressions that may be assigned to are
//      e.b
//      e[b]
//      v
//      [destructure]
//      {destructure}

        if (
            the_thing.arity !== "variable"
            && the_thing.id !== "."
            && the_thing.id !== "["
            && the_thing.id !== "{"
        ) {

// test_cause:
// ["0=0", "check_mutation", "bad_assignment_a", "0", 1]

            warn("bad_assignment_a", the_thing);
            return false;
        }
        return true;
    }

    function check_not_top_level(thing) {

// Some features should not be at the outermost level.

        if (functionage === token_global) {

// test_cause:
// ["
// while(0){}
// ", "check_not_top_level", "unexpected_at_top_level_a", "while", 1]

            warn("unexpected_at_top_level_a", thing);
        }
    }

    function check_ordered(type, token_list) {

// This function will warn if <token_list> is unordered.

        token_list.reduce(function (aa, token) {
            const bb = artifact(token);
            if (!option_dict.unordered && aa > bb) {
                warn("expected_a_b_before_c_d", token, type, bb, type, aa);
            }
            return bb;
        }, "");
    }

    function check_ordered_case(case_list) {

// This function will warn if <case_list> is unordered.

        case_list.filter(noop).map(function (token) {
            switch (token.identifier || token.id) {
            case "(number)":
                return {
                    order: 1,
                    token,
                    type: "number",
                    value: Number(artifact(token))
                };
            case "(string)":
                return {
                    order: 2,
                    token,
                    type: "string",
                    value: artifact(token)
                };
            case true:
                return {
                    order: 3,
                    token,
                    type: "identifier",
                    value: artifact(token)
                };
            }
        }).reduce(function (aa, bb) {
            if (

// PR-419 - Hide warning about unordered case-statements behind beta-flag.

                option_dict.beta
                && !option_dict.unordered
                && aa && bb
                && (
                    aa.order > bb.order
                    || (aa.order === bb.order && aa.value > bb.value)
                )
            ) {
                warn(
                    "expected_a_b_before_c_d",
                    bb.token,
                    `case-${bb.type}`,
                    bb.value,
                    `case-${aa.type}`,
                    aa.value
                );
            }
            return bb;
        }, undefined);
    }

    function condition() {

// Parse the condition part of a do, if, while.

        const the_paren = token_nxt;
        let the_value;

// test_cause:
// ["do{}while()", "condition", "", "", 0]
// ["if(){}", "condition", "", "", 0]
// ["while(){}", "condition", "", "", 0]

        test_cause("");
        the_paren.free = true;
        advance("(");
        the_value = parse_expression(0);
        advance(")");
        if (the_value.wrapped === true) {

// test_cause:
// ["while((0)){}", "condition", "unexpected_a", "(", 6]

            warn("unexpected_a", the_paren);
        }

// Check for anticondition.

        switch (the_value.id) {
        case "%":
            warn("unexpected_a", the_value);
            break;
        case "&":
            warn("unexpected_a", the_value);
            break;
        case "(number)":
            warn("unexpected_a", the_value);
            break;
        case "(string)":
            warn("unexpected_a", the_value);
            break;
        case "*":
            warn("unexpected_a", the_value);
            break;
        case "+":
            warn("unexpected_a", the_value);
            break;
        case "-":
            warn("unexpected_a", the_value);
            break;
        case "/":
            warn("unexpected_a", the_value);
            break;
        case "<<":
            warn("unexpected_a", the_value);
            break;
        case ">>":
            warn("unexpected_a", the_value);
            break;
        case ">>>":
            warn("unexpected_a", the_value);
            break;
        case "?":
            warn("unexpected_a", the_value);
            break;
        case "^":
            warn("unexpected_a", the_value);
            break;
        case "typeof":
            warn("unexpected_a", the_value);
            break;
        case "|":
            warn("unexpected_a", the_value);
            break;
        case "~":

// test_cause:
// ["if(0%0){}", "condition", "unexpected_a", "%", 5]
// ["if(0&0){}", "condition", "unexpected_a", "&", 5]
// ["if(0){}", "condition", "unexpected_a", "0", 4]
// ["if(0*0){}", "condition", "unexpected_a", "*", 5]
// ["if(0+0){}", "condition", "unexpected_a", "+", 5]
// ["if(0-0){}", "condition", "unexpected_a", "-", 5]
// ["if(0/0){}", "condition", "unexpected_a", "/", 5]
// ["if(0<<0){}", "condition", "unexpected_a", "<<", 5]
// ["if(0>>0){}", "condition", "unexpected_a", ">>", 5]
// ["if(0>>>0){}", "condition", "unexpected_a", ">>>", 5]
// ["if(0?0:0){}", "condition", "unexpected_a", "?", 5]
// ["if(0^0){}", "condition", "unexpected_a", "^", 5]
// ["if(0|0){}", "condition", "unexpected_a", "|", 5]
// ["if(\"aa\"){}", "condition", "unexpected_a", "aa", 4]
// ["if(typeof 0){}", "condition", "unexpected_a", "typeof", 4]
// ["if(~0){}", "condition", "unexpected_a", "~", 4]

            warn("unexpected_a", the_value);
            break;
        }
        return the_value;
    }

    function constant(id, type, value) {

// Create a constant symbol.

        const the_symbol = symbol(id);
        the_symbol.constant = true;
        the_symbol.nud_prefix = (
            typeof value === "function"
            ? value
            : function () {
                token_now.constant = true;
                if (value !== undefined) {
                    token_now.value = value;
                }
                return token_now;
            }
        );
        the_symbol.type = type;
        the_symbol.value = value;
        return the_symbol;
    }

    function constant_Function() {
        if (!option_dict.eval) {

// test_cause:
// ["Function", "constant_Function", "unexpected_a", "Function", 1]

            warn("unexpected_a", token_now);
        } else if (token_nxt.id !== "(") {

// test_cause:
// ["
// /*jslint eval*/
// Function
// ", "constant_Function", "expected_a_before_b", "(end)", 1]

            warn("expected_a_before_b", token_nxt, "(", artifact());
        }
        return token_now;
    }

    function constant_arguments() {

// test_cause:
// ["arguments", "constant_arguments", "unexpected_a", "arguments", 1]

        warn("unexpected_a", token_now);
        return token_now;
    }

    function constant_eval() {
        if (!option_dict.eval) {

// test_cause:
// ["eval", "constant_eval", "unexpected_a", "eval", 1]

            warn("unexpected_a", token_now);
        } else if (token_nxt.id !== "(") {

// test_cause:
// ["/*jslint eval*/\neval", "constant_eval", "expected_a_before_b", "(end)", 1]

            warn("expected_a_before_b", token_nxt, "(", artifact());
        }
        return token_now;
    }

    function constant_ignore() {

// test_cause:
// ["ignore", "constant_ignore", "unexpected_a", "ignore", 1]

        warn("unexpected_a", token_now);
        return token_now;
    }

    function constant_isInfinite() {

// test_cause:
// ["isFinite", "constant_isInfinite", "expected_a_b", "isFinite", 1]

        warn("expected_a_b", token_now, "Number.isFinite", "isFinite");
        return token_now;
    }

    function constant_isNaN() {

// test_cause:
// ["isNaN(0)", "constant_isNaN", "number_isNaN", "isNaN", 1]

        warn("number_isNaN", token_now);
        return token_now;
    }

    function constant_this() {
        if (!option_dict.this) {

// test_cause:
// ["this", "constant_this", "unexpected_a", "this", 1]

            warn("unexpected_a", token_now);
        }
        return token_now;
    }

    function enroll(name, role, readonly) {

// Enroll a name into the current function context. The role can be exception,
// function, label, parameter, or variable. We look for variable redefinition
// because it causes confusion.

        let earlier;
        let id = name.id;

// Reserved words may not be enrolled.

        if (syntax_dict[id] !== undefined && id !== "ignore") {

// test_cause:
// ["let undefined", "enroll", "reserved_a", "undefined", 5]

            warn("reserved_a", name);
            return;
        }

// Has the name been enrolled in this context?

        earlier = functionage.context[id] || catchage.context[id];
        if (earlier) {

// test_cause:
// ["let aa;let aa", "enroll", "redefinition_a_b", "1", 12]

            warn("redefinition_a_b", name, id, earlier.line);
            return;
        }

// Has the name been enrolled in an outer context?

        function_stack.forEach(function ({
            context
        }) {
            earlier = context[id] || earlier;
        });
        if (earlier && id === "ignore") {
            if (earlier.role === "variable") {

// test_cause:
// ["let ignore;function aa(ignore){}", "enroll", "redefinition_a_b", "1", 24]

                warn("redefinition_a_b", name, id, earlier.line);
            }
        } else if (
            earlier
            && role !== "parameter" && role !== "function"
            && (role !== "exception" || earlier.role !== "exception")
        ) {

// test_cause:
// ["
// function aa(){try{aa();}catch(aa){aa();}}
// ", "enroll", "redefinition_a_b", "1", 31]
// ["function aa(){var aa;}", "enroll", "redefinition_a_b", "1", 19]

            warn("redefinition_a_b", name, id, earlier.line);
        } else if (
            option_dict.beta
            && global_dict[id]
            && role !== "parameter"
        ) {

// test_cause:
// ["let Array", "enroll", "redefinition_global_a_b", "Array", 5]

            warn("redefinition_global_a_b", name, global_dict[id], id);
        }

// Enroll it.

        Object.assign(name, {
            dead: true,
            init: false,
            parent: (
                role === "exception"
                ? catchage
                : functionage
            ),
            readonly,
            role,
            used: 0
        });
        name.parent.context[id] = name;
    }

    function infix(bp, id, f) {

// Create an infix operator.

        const the_symbol = symbol(id, bp);
        the_symbol.led_infix = function (left) {
            const the_token = token_now;
            the_token.arity = "binary";
            if (f !== undefined) {
                return f(left);
            }
            the_token.expression = [left, parse_expression(bp)];
            return the_token;
        };
        return the_symbol;
    }

    function infix_dot(left) {
        const the_token = token_now;
        let name = token_nxt;
        if (
            (
                left.id !== "(string)"
                || (name.id !== "indexOf" && name.id !== "repeat")
            )
            && (
                left.id !== "["
                || (
                    name.id !== "concat"
                    && name.id !== "flat"
                    && name.id !== "flatMap"
                    && name.id !== "forEach"
                    && name.id !== "join"
                    && name.id !== "map"
                )
            )
            && (left.id !== "+" || name.id !== "slice")
            && (
                left.id !== "(regexp)"
                || (name.id !== "exec" && name.id !== "test")
            )
        ) {

// test_cause:
// ["\"\".aa", "check_left", "unexpected_a", ".", 3]

            check_left(left, the_token);
        }
        if (!name.identifier) {

// test_cause:
// ["aa.0", "infix_dot", "expected_identifier_a", "0", 4]

            stop("expected_identifier_a");
        }
        advance();
        survey(name);

// The property name is not an expression.

        the_token.name = name;
        the_token.expression = left;
        return the_token;
    }

    function infix_fart_unwrapped() {

// test_cause:
// ["aa=>0", "infix_fart_unwrapped", "wrap_fart_parameter", "=>", 3]

        return stop("wrap_fart_parameter", token_now);
    }

    function infix_grave(left) {
        const the_tick = prefix_tick();

// test_cause:
// ["0``", "check_left", "unexpected_a", "`", 2]

        check_left(left, the_tick);
        the_tick.expression = [left].concat(the_tick.expression);
        return the_tick;
    }

    function infix_lbracket(left) {
        const the_token = token_now;
        let name;
        let the_subscript = parse_expression(0);
        if (the_subscript.id === "(string)" || the_subscript.id === "`") {
            name = survey(the_subscript);

// PR-404 - Add new directive "subscript" to play nice with Google Closure.

            if (!option_dict.subscript && jslint_rgx_identifier.test(name)) {

// test_cause:
// ["aa[`aa`]", "infix_lbracket", "subscript_a", "aa", 4]

                warn("subscript_a", the_subscript, name);
            }
        }

// test_cause:
// ["0[0]", "check_left", "unexpected_a", "[", 2]

        check_left(left, the_token);
        the_token.expression = [left, the_subscript];
        advance("]");
        return the_token;
    }

    function infix_lparen(left) {
        const the_paren = token_now;
        let ellipsis;
        let the_argument;
        if (left.id !== "function") {

// test_cause:
// ["(0?0:0)()", "check_left", "unexpected_a", "(", 8]
// ["0()", "check_left", "unexpected_a", "(", 2]

            check_left(left, the_paren);
        }
        if (functionage.arity === "statement" && left.identifier) {
            functionage.name.calls[left.id] = left;
        }
        the_paren.expression = [left];
        if (token_nxt.id !== ")") {

// Parse/loop through each token in expression (...).

            while (true) {
                if (token_nxt.id === "...") {
                    ellipsis = true;
                    advance("...");
                }
                the_argument = parse_expression(10);
                if (ellipsis) {
                    the_argument.ellipsis = true;
                }
                the_paren.expression.push(the_argument);
                if (token_nxt.id !== ",") {
                    break;
                }
                advance(",");
            }
        }
        advance(")", the_paren);
        if (the_paren.expression.length === 2) {

// test_cause:
// ["aa(0)", "infix_lparen", "free", "", 0]

            test_cause("free");
            the_paren.free = true;
            if (the_argument.wrapped === true) {

// test_cause:
// ["aa((0))", "infix_lparen", "unexpected_a", "(", 3]

                warn("unexpected_a", the_paren);
            }
            if (the_argument.id === "(") {
                the_argument.wrapped = true;
            }
        } else {

// test_cause:
// ["aa()", "infix_lparen", "not_free", "", 0]
// ["aa(0,0)", "infix_lparen", "not_free", "", 0]

            test_cause("not_free");
            the_paren.free = false;
        }
        return the_paren;
    }

    function infix_option_chain(left) {
        const the_token = token_now;
        let name = token_nxt;
        if (
            (
                left.id !== "(string)"
                || (name.id !== "indexOf" && name.id !== "repeat")
            )
            && (
                left.id !== "["
                || (
                    name.id !== "concat"
                    && name.id !== "forEach"
                    && name.id !== "join"
                    && name.id !== "map"
                )
            )

// test_cause:
// ["(0+0)?.0", "infix_option_chain", "check_left", "", 0]

            && (left.id !== "+" || name.id !== "slice")
            && (
                left.id !== "(regexp)"
                || (name.id !== "exec" && name.id !== "test")
            )
        ) {
            test_cause("check_left");

// test_cause:
// ["(/./)?.0", "check_left", "unexpected_a", "?.", 6]
// ["\"aa\"?.0", "check_left", "unexpected_a", "?.", 5]
// ["aa=[]?.aa", "check_left", "unexpected_a", "?.", 6]

            check_left(left, the_token);
        }

// Issue #468 - Fix optional dynamic-property/function-call not recognized.

        if (name.id === "[" || name.id === "(") {
            test_cause("dyn_prop_or_call");

// test_cause:
// ["aa?.(bb)", "infix_option_chain", "dyn_prop_or_call", "", 0]
// ["aa?.[bb]", "infix_option_chain", "dyn_prop_or_call", "", 0]

            return left;
        }
        if (!name.identifier) {

// test_cause:
// ["aa?.0", "infix_option_chain", "expected_identifier_a", "0", 5]

            stop("expected_identifier_a");
        }
        advance();
        survey(name);

// The property name is not an expression.

        the_token.name = name;
        the_token.expression = left;
        return the_token;
    }

    function infixr(bp, id) {

// Create a right associative infix operator.

        const the_symbol = symbol(id, bp);
        the_symbol.led_infix = function parse_infixr_led(left) {
            const the_token = token_now;

// test_cause:
// ["0**0", "parse_infixr_led", "led_infix", "", 0]

            test_cause("led_infix");
            the_token.arity = "binary";
            the_token.expression = [left, parse_expression(bp - 1)];
            return the_token;
        };
        return the_symbol;
    }

    function parse_expression(rbp, initial) {

// This is the heart of JSLINT, the Pratt parser. In addition to parsing, it
// is looking for ad hoc lint patterns. We add .fud_stmt to Pratt's model, which
// is like .nud_prefix except that it is only used on the first token of a
// statement. Having .fud_stmt makes it much easier to define statement-oriented
// languages like JavaScript. I retained Pratt's nomenclature.
// They are elements of the parsing method called Top Down Operator Precedence.

// .nud_prefix  Null denotation. The prefix handler.
// .fud_stmt    First null denotation. The statement handler.
// .led_infix   Left denotation. The infix/postfix handler.
//  lbp         Left binding power of infix operator. It tells us how strongly
//              the operator binds to the argument at its left.
//  rbp         Right binding power.

// It processes a nud_prefix (variable, constant, prefix operator). It will then
// process leds (infix operators) until the bind powers cause it to stop (it
// consumes tokens until it meets a token whose lbp <= rbp). Specifically, it
// means that it collects all tokens that bind together before returning to the
// operator that called it. It returns the expression's parse tree.

// For example, "3 + 1 * 2 * 4 + 5"
// parses into
// {
//     "id": "+",
//     "expression": [
//         {
//             "id": "+",
//             "expression": [
//                 {
//                     "id": "(number)",
//                     "value": "3"
//                 },
//                 {
//                     "id": "*",
//                     "expression": [
//                         {
//                             "id": "*",
//                             "expression": [
//                                 {
//                                     "id": "(number)",
//                                     "value": "1"
//                                 },
//                                 {
//                                     "id": "(number)",
//                                     "value": "2"
//                                 }
//                             ]
//                         },
//                         {
//                             "id": "(number)",
//                             "value": "4"
//                         }
//                     ]
//                 }
//             ]
//         },
//         {
//             "id": "(number)",
//             "value": "5"
//         }
//     ]
// }

        let left;
        let the_symbol;

// Statements will have already advanced, so advance now only if the token is
// not the first of a statement.

        if (!initial) {
            advance();
        }
        the_symbol = syntax_dict[token_now.id];
        if (the_symbol !== undefined && the_symbol.nud_prefix !== undefined) {

// test_cause:
// ["0", "parse_expression", "symbol", "", 0]

            test_cause("symbol");
            left = the_symbol.nud_prefix();
        } else if (token_now.identifier) {

// test_cause:
// ["aa", "parse_expression", "identifier", "", 0]

            test_cause("identifier");
            left = token_now;
            left.arity = "variable";
        } else {

// test_cause:
// ["!", "parse_expression", "unexpected_a", "(end)", 1]
// ["/./", "parse_expression", "unexpected_a", "/", 1]
// ["let aa=`${}`;", "parse_expression", "unexpected_a", "}", 11]

            return stop("unexpected_a", token_now);
        }

// Parse/loop through each symbol in expression.

        while (true) {
            the_symbol = syntax_dict[token_nxt.id];
            if (
                the_symbol === undefined
                || the_symbol.led_infix === undefined
                || the_symbol.lbp <= rbp
            ) {
                break;
            }
            advance();
            left = the_symbol.led_infix(left);
        }
        return left;
    }

    function parse_fart(the_fart) {

// Give the function properties storing its names and for observing the depth
// of loops and switches.

        Object.assign(the_fart, {
            arity: "binary",
            context: empty(),
            finally: 0,
            level: functionage.level + 1,
            loop: 0,
            name: anon,
            switch: 0,
            try: 0
        });

// PR-384 - Relax warning "function_in_loop".
//
//         if (functionage.loop > 0) {

// // test_cause:
// // ["while(0){aa.map(()=>0);}", "parse_fart", "function_in_loop", "=>", 19]
//
//             warn("function_in_loop", the_fart);
//         }

// Push the current function context and establish a new one.

        function_list.push(the_fart);
        function_stack.push(functionage);
        functionage = the_fart;

// Parse the parameter list.

        prefix_function_parameter(the_fart);
        advance("=>");

// The function's body is a block.

        if (token_nxt.id === "{") {
            if (!option_dict.fart) {

// test_cause:
// ["()=>{}", "parse_fart", "use_function_not_fart", "=>", 3]

                warn("use_function_not_fart", the_fart);
            }
            the_fart.block = block("body");
        } else if (
            syntax_dict[token_nxt.id] !== undefined
            && syntax_dict[token_nxt.id].fud_stmt !== undefined
        ) {

// PR-384 - Bugfix - Fixes issue #379 - warn against naked-statement in fart.

// test_cause:
// ["()=>delete aa", "parse_fart", "unexpected_a_after_b", "=>", 5]

            stop("unexpected_a_after_b", token_nxt, token_nxt.id, "=>");

// The function's body is an expression.

        } else {
            the_fart.expression = parse_expression(0);
        }

// Restore the previous context.

        functionage = function_stack.pop();
        return the_fart;
    }

    function parse_json() {
        let container;
        let is_dup;
        let name;
        let negative;
        switch (token_nxt.id) {
        case "(number)":
            if (!jslint_rgx_json_number.test(token_nxt.value)) {

// test_cause:
// ["[-.0]", "parse_json", "unexpected_a", ".", 3]
// ["[-0x0]", "parse_json", "unexpected_a", "0x0", 3]
// ["[.0]", "parse_json", "unexpected_a", ".", 2]
// ["[0x0]", "parse_json", "unexpected_a", "0x0", 2]

                warn("unexpected_a");
            }
            advance("(number)");
            return token_now;
        case "(string)":
            if (token_nxt.quote !== "\"") {

// test_cause:
// ["['']", "parse_json", "unexpected_a", "'", 2]

                warn("unexpected_a", token_nxt, token_nxt.quote);
            }
            advance("(string)");
            return token_now;
        case "-":
            negative = token_nxt;
            negative.arity = "unary";
            advance("-");

// Recurse parse_json().

            negative.expression = parse_json();
            return negative;
        case "[":

// test_cause:
// ["[]", "parse_json", "bracket", "", 0]

            test_cause("bracket");
            container = token_nxt;
            container.expression = [];
            advance("[");
            if (token_nxt.id !== "]") {
                while (true) {

// Recurse parse_json().

                    container.expression.push(parse_json());
                    if (token_nxt.id !== ",") {

// test_cause:
// ["[0,0]", "parse_json", "comma", "", 0]

                        test_cause("comma");
                        break;
                    }
                    advance(",");
                }
            }
            advance("]", container);
            return container;
        case "false":
        case "null":
        case "true":

// test_cause:
// ["[false]", "parse_json", "constant", "", 0]
// ["[null]", "parse_json", "constant", "", 0]
// ["[true]", "parse_json", "constant", "", 0]

            test_cause("constant");
            advance();
            return token_now;
        case "{":

// test_cause:
// ["{}", "parse_json", "brace", "", 0]

            test_cause("brace");
            container = token_nxt;

// Explicit empty-object required to detect "__proto__".

            is_dup = empty();
            container.expression = [];
            advance("{");
            if (token_nxt.id !== "}") {

// JSON
// Parse/loop through each property in {...}.

                while (true) {
                    if (token_nxt.quote !== "\"") {

// test_cause:
// ["{0:0}", "parse_json", "unexpected_a", "0", 2]

                        warn(
                            "unexpected_a",
                            token_nxt,
                            token_nxt.quote
                        );
                    }
                    name = token_nxt;
                    advance("(string)");
                    if (is_dup[token_now.value] !== undefined) {

// test_cause:
// ["{\"aa\":0,\"aa\":0}", "parse_json", "duplicate_a", "aa", 9]

                        warn("duplicate_a", token_now);
                    } else if (token_now.value === "__proto__") {

// test_cause:
// ["{\"__proto__\":0}", "parse_json", "weird_property_a", "__proto__", 2]

                        warn("weird_property_a", token_now);
                    } else {
                        is_dup[token_now.value] = token_now;
                    }
                    advance(":");
                    container.expression.push(

// Recurse parse_json().

                        Object.assign(parse_json(), {
                            label: name
                        })
                    );
                    if (token_nxt.id !== ",") {
                        break;
                    }
                    advance(",");
                }
            }
            advance("}", container);
            return container;
        default:

// test_cause:
// ["[undefined]", "parse_json", "unexpected_a", "undefined", 2]

            stop("unexpected_a");
        }
    }

    function parse_statement() {

// Parse a statement. Any statement may have a label, but only four statements
// have use for one. A statement can be one of the standard statements, or
// an assignment expression, or an invocation expression.

        let first;
        let the_label;
        let the_statement;
        let the_symbol;
        advance();
        if (token_now.identifier && token_nxt.id === ":") {
            the_label = token_now;
            if (the_label.id === "ignore") {

// test_cause:
// ["ignore:", "parse_statement", "unexpected_a", "ignore", 1]

                warn("unexpected_a", the_label);
            }
            advance(":");
            switch (token_nxt.id) {
            case "do":
            case "for":
            case "switch":
            case "while":

// test_cause:
// ["aa:do{}", "parse_statement", "the_statement_label", "do", 0]
// ["aa:for{}", "parse_statement", "the_statement_label", "for", 0]
// ["aa:switch{}", "parse_statement", "the_statement_label", "switch", 0]
// ["aa:while{}", "parse_statement", "the_statement_label", "while", 0]

                test_cause("the_statement_label", token_nxt.id);
                enroll(the_label, "label", true);
                the_label.dead = false;
                the_label.init = true;
                the_statement = parse_statement();
                functionage.statement_prv = the_statement;
                the_statement.label = the_label;
                the_statement.statement = true;
                return the_statement;
            }
            advance();

// test_cause:
// ["aa:", "parse_statement", "unexpected_label_a", "aa", 1]

            warn("unexpected_label_a", the_label);
        }

// Parse the statement.

        first = token_now;
        first.statement = true;
        the_symbol = syntax_dict[first.id];
        if (
            the_symbol !== undefined
            && the_symbol.fud_stmt !== undefined

// PR-318 - Bugfix - Fixes issues #316, #317 - dynamic-import().

            && !(the_symbol.id === "import" && token_nxt.id === "(")
        ) {
            the_symbol.disrupt = false;
            the_symbol.statement = true;
            token_now.arity = "statement";
            the_statement = the_symbol.fud_stmt();
            functionage.statement_prv = the_statement;
        } else {

// It is an expression statement.

            the_statement = parse_expression(0, true);
            functionage.statement_prv = the_statement;
            if (the_statement.wrapped && the_statement.id !== "(") {

// test_cause:
// ["(0)", "parse_statement", "unexpected_a", "(", 1]

                warn("unexpected_a", first);
            }
            semicolon();
        }
        if (the_label !== undefined) {
            the_label.dead = true;
        }
        return the_statement;
    }

    function parse_statements() {

// Parse a list of statements. Give a warning if an unreachable statement
// follows a disruptive statement.

        const statement_list = [];
        let a_statement;
        let disrupt = false;

// Parse/loop each statement until a statement-terminator is reached.

        while (true) {
            switch (token_nxt.id) {
            case "(end)":
            case "case":
            case "default":
            case "else":
            case "}":

// test_cause:
// [";", "parse_statements", "closer", "", 0]
// ["case", "parse_statements", "closer", "", 0]
// ["default", "parse_statements", "closer", "", 0]
// ["else", "parse_statements", "closer", "", 0]
// ["}", "parse_statements", "closer", "", 0]

                test_cause("closer");
                return statement_list;
            }
            a_statement = parse_statement();
            statement_list.push(a_statement);
            if (disrupt) {

// test_cause:
// ["while(0){break;0;}", "parse_statements", "unreachable_a", "0", 16]

                warn("unreachable_a", a_statement);
            }
            disrupt = a_statement.disrupt;
        }
    }

    function postassign(id) {

// Create one of the postassign operators.

        const the_symbol = symbol(id, 150);
        the_symbol.led_infix = function (left) {
            token_now.expression = left;
            token_now.arity = "postassign";
            check_mutation(token_now.expression);
            return token_now;
        };
        return the_symbol;
    }

    function preassign(id) {

// Create one of the preassign operators.

        const the_symbol = symbol(id);
        the_symbol.nud_prefix = function () {
            const the_token = token_now;
            the_token.arity = "preassign";
            the_token.expression = parse_expression(150);
            check_mutation(the_token.expression);
            return the_token;
        };
        return the_symbol;
    }

    function prefix(id, f) {

// Create a prefix operator.

        const the_symbol = symbol(id);
        the_symbol.nud_prefix = function () {
            const the_token = token_now;
            the_token.arity = "unary";
            if (typeof f === "function") {
                return f();
            }
            the_token.expression = parse_expression(150);
            return the_token;
        };
        return the_symbol;
    }

    function prefix_assign_divide() {

// test_cause:
// ["/=", "prefix_assign_divide", "expected_a_b", "/=", 1]

        stop("expected_a_b", token_now, "/\\=", "/=");
    }

    function prefix_async() {
        let the_async = token_now;
        let the_function;
        token_nxt.arity = the_async.arity;

// PR-414 - Parse async fart.

        if (token_nxt.fart) {
            advance("(");
            the_function = Object.assign(token_now.fart, {
                async: 1
            });
            if (!option_dict.fart) {

// test_cause:
// ["async()=>0", "prefix_async", "use_function_not_fart", "=>", 8]

                warn("use_function_not_fart", the_function);
            }
            prefix_lparen();

// Parse async function.

        } else {
            advance("function");
            the_function = Object.assign(token_now, {
                async: 1
            });
            prefix_function();
        }
        if (the_function.async === 1) {

// test_cause:
// ["
// async function aa(){}
// ", "prefix_async", "missing_await_statement", "function", 7]

            warn("missing_await_statement", the_function);
        }
        return the_function;
    }

    function prefix_await() {
        const the_await = token_now;

// PR-370 - Add top-level-await support.

        if (functionage.async === 0 && functionage !== token_global) {

// test_cause:
// ["function aa(){aa=await 0;}", "prefix_await", "unexpected_a", "await", 18]
// ["function aa(){await 0;}", "prefix_await", "unexpected_a", "await", 15]

            warn("unexpected_a", the_await);
        } else {
            functionage.async += 1;
        }
        if (the_await.arity === "statement") {

// PR-405 - Bugfix - fix expression after "await" mis-identified as statement.

            the_await.expression = parse_expression(150);
            semicolon();
        } else {
            the_await.expression = parse_expression(150);
        }
        return the_await;
    }

    function prefix_fart() {

// test_cause:
// ["=>0", "prefix_fart", "expected_a_before_b", "=>", 1]

        return stop("expected_a_before_b", token_now, "()", "=>");
    }

    function prefix_function(the_function) {
        let name = the_function && the_function.name;
        if (the_function === undefined) {
            the_function = token_now;

// A function statement must have a name that will be in the parent's scope.

            if (the_function.arity === "statement") {
                if (!token_nxt.identifier) {

// test_cause:
// ["function(){}", "prefix_function", "expected_identifier_a", "(", 9]
// ["function*aa(){}", "prefix_function", "expected_identifier_a", "*", 9]

                    return stop("expected_identifier_a");
                }
                name = token_nxt;
                enroll(name, "variable", true);
                the_function.name = Object.assign(name, {
                    calls: empty(),

// PR-331 - Bugfix - Fixes issue #272 - function hoisting not allowed.

                    dead: false,
                    init: true
                });
                advance();
            } else if (name === undefined) {

// A function expression may have an optional name.

                the_function.name = anon;
                if (token_nxt.identifier) {
                    name = token_nxt;
                    the_function.name = name;
                    advance();
                }
            }
        }

//  Probably deadcode.
//  if (mode_mega) {
//      warn("unexpected_a", the_function);
//  }
//  jslint_assert(!mode_mega, `Expected !mode_mega.`);

// PR-378 - Relax warning "function_in_loop".
//
// // Don't create functions in loops. It is inefficient, and it can lead to
// // scoping errors.
//
//         if (functionage.loop > 0) {
//
// // test_cause:
// // ["
// // while(0){aa.map(function(){});}
// // ", "prefix_function", "function_in_loop", "function", 17]
//
//             warn("function_in_loop", the_function);
//         }

// Give the function properties for storing its names and for observing the
// depth of loops and switches.

        Object.assign(the_function, {
            async: the_function.async || 0,
            context: empty(),
            finally: 0,
            level: functionage.level + 1,
            loop: 0,
            statement_prv: undefined,
            switch: 0,
            try: 0
        });
        if (the_function.arity !== "statement" && typeof name === "object") {

// test_cause:
// ["let aa=function bb(){return;};", "prefix_function", "expression", "bb", 0]

            test_cause("expression", name.id);
            enroll(name, "function", true);
            name.dead = false;
            name.init = true;
            name.used = 1;
        }

// PR-334 - Bugfix - fix function-redefinition not warned inside function-call.
// Push the current function context and establish a new one.

        function_list.push(the_function);
        function_stack.push(functionage);
        functionage = the_function;

// Parse the parameter list.

        advance("(");
        token_now.arity = "function";
        prefix_function_parameter(the_function);

// The function's body is a block.

        the_function.block = block("body");
        if (
            the_function.arity === "statement"
            && token_nxt.line === token_now.line
        ) {

// test_cause:
// ["function aa(){}0", "prefix_function", "unexpected_a", "0", 16]

            return stop("unexpected_a");
        }
        if (
            token_nxt.id === "."
            || token_nxt.id === "?."

// PR-459 - Allow destructuring-assignment after function-definition.

            // || token_nxt.id === "["
        ) {

// test_cause:
// ["function aa(){}\n.aa", "prefix_function", "unexpected_a", ".", 1]
// ["function aa(){}\n?.aa", "prefix_function", "unexpected_a", "?.", 1]

            warn("unexpected_a");
        }

// Check functions are ordered.

        check_ordered(
            "function",
            function_list.slice(
                function_list.indexOf(the_function) + 1
            ).map(function ({
                level,
                name
            }) {
                return (level === the_function.level + 1) && name;
            }).filter(function (name) {
                return option_dict.beta && name && name.id;
            })
        );

// Restore the previous context.

        functionage = function_stack.pop();
        return the_function;
    }

    function prefix_function_parameter(the_function) {

// This function will parse input <parameters> at beginning of <the_function>

        let optional;
        let parameters = [];
        let signature = ["("];
        let subparam;
        function param_enroll(name) {
            if (name.identifier) {
                enroll(name, "parameter", false);
            } else {

// test_cause:
// ["([aa])=>0", "param_enroll", "use_function_not_fart", "=>", 7]
// ["({aa})=>0", "param_enroll", "use_function_not_fart", "=>", 7]

                if (the_function.id === "=>" && !option_dict.fart) {
                    warn("use_function_not_fart", the_function);
                }

// Recurse param_enroll().

                name.names.forEach(param_enroll);
            }
        }
        function param_parse() {
            let ellipsis = false;
            let param;
            if (token_nxt.id === "{") {
                if (optional !== undefined) {

// test_cause:
// ["function aa(aa=0,{}){}", "param_parse", "required_a_optional_b", "aa", 18]

                    warn(
                        "required_a_optional_b",
                        token_nxt,
                        token_nxt.id,
                        optional.id
                    );
                }
                param = token_nxt;
                param.names = [];
                advance("{");
                signature.push("{");
                while (true) {
                    subparam = token_nxt;
                    if (!subparam.identifier) {

// test_cause:
// ["function aa(aa=0,{}){}", "param_parse", "expected_identifier_a", "}", 19]
// ["function aa({0}){}", "param_parse", "expected_identifier_a", "0", 14]

                        return stop("expected_identifier_a");
                    }
                    survey(subparam);
                    advance();
                    signature.push(subparam.id);
                    if (token_nxt.id === ":") {
                        advance(":");
                        advance();
                        token_now.label = subparam;
                        subparam = token_now;
                        if (!subparam.identifier) {

// test_cause:
// ["function aa({aa:0}){}", "param_parse", "expected_identifier_a", "}", 18]

                            return stop(
                                "expected_identifier_a",
                                token_nxt
                            );
                        }
                    }

// test_cause:
// ["function aa({aa=aa},aa){}", "param_parse", "equal", "", 0]

                    test_cause("equal");
                    if (token_nxt.id === "=") {
                        advance("=");
                        subparam.expression = parse_expression();
                        param.open = true;
                    }
                    param.names.push(subparam);
                    if (token_nxt.id === ",") {
                        advance(",");
                        signature.push(", ");
                    } else {
                        break;
                    }
                }
                parameters.push(param);

// test_cause:
// ["
// function aa({bb,aa}){}
// ", "check_ordered", "expected_a_b_before_c_d", "aa", 17]

                check_ordered("parameter", param.names);
                advance("}");
                signature.push("}");
                if (token_nxt.id === ",") {
                    advance(",");
                    signature.push(", ");
                    param_parse();
                    return;
                }
            } else if (token_nxt.id === "[") {
                if (optional !== undefined) {

// test_cause:
// ["function aa(aa=0,[]){}", "param_parse", "required_a_optional_b", "aa", 18]

                    warn(
                        "required_a_optional_b",
                        token_nxt,
                        token_nxt.id,
                        optional.id
                    );
                }
                param = token_nxt;
                param.names = [];
                advance("[");
                signature.push("[]");
                while (true) {
                    subparam = token_nxt;
                    if (!subparam.identifier) {

// test_cause:
// ["function aa(aa=0,[]){}", "param_parse", "expected_identifier_a", "]", 19]

                        return stop("expected_identifier_a");
                    }
                    advance();
                    param.names.push(subparam);

// test_cause:
// ["function aa([aa=aa],aa){}", "param_parse", "id", "", 0]

                    test_cause("id");
                    if (token_nxt.id === "=") {
                        advance("=");
                        subparam.expression = parse_expression();
                        param.open = true;
                    }
                    if (token_nxt.id === ",") {
                        advance(",");
                    } else {
                        break;
                    }
                }
                parameters.push(param);
                advance("]");
                if (token_nxt.id === ",") {
                    advance(",");
                    signature.push(", ");
                    param_parse();
                    return;
                }
            } else {
                if (token_nxt.id === "...") {
                    ellipsis = true;
                    signature.push("...");
                    advance("...");
                    if (optional !== undefined) {

// test_cause:
// ["function aa(aa=0,...){}", "param_parse", "required_a_optional_b", "aa", 21]

                        warn(
                            "required_a_optional_b",
                            token_nxt,
                            token_nxt.id,
                            optional.id
                        );
                    }
                }
                if (!token_nxt.identifier) {

// test_cause:
// ["function aa(0){}", "param_parse", "expected_identifier_a", "0", 13]

                    return stop("expected_identifier_a");
                }
                param = token_nxt;
                parameters.push(param);
                advance();
                signature.push(param.id);
                if (ellipsis) {
                    param.ellipsis = true;
                } else {
                    if (token_nxt.id === "=") {
                        optional = param;
                        advance("=");
                        param.expression = parse_expression(0);
                    } else {
                        if (optional !== undefined) {

// test_cause:
// ["function aa(aa=0,bb){}", "param_parse", "required_a_optional_b", "aa", 18]

                            warn(
                                "required_a_optional_b",
                                param,
                                param.id,
                                optional.id
                            );
                        }
                    }
                    if (token_nxt.id === ",") {
                        advance(",");
                        signature.push(", ");
                        param_parse();
                        return;
                    }
                }
            }
        }

// test_cause:
// ["function aa(){}", "prefix_function_parameter", "opener", "(", 0]

        test_cause("opener", token_now.id);
        token_now.free = false;
        if (token_nxt.id !== ")" && token_nxt.id !== "(end)") {
            param_parse();
        }
        advance(")");
        signature.push(")");
        parameters.forEach(param_enroll);
        the_function.parameters = parameters;
        the_function.signature = signature.join("");
    }

    function prefix_lbrace() {
        const seen = empty();
        const the_brace = token_now;
        let extra;
        let full;
        let id;
        let name;
        let the_colon;
        let value;
        the_brace.expression = [];
        if (token_nxt.id !== "}") {

// Parse/loop through each property in {...}.

            while (true) {
                name = token_nxt;
                advance();
                if (
                    (name.id === "get" || name.id === "set")
                    && token_nxt.identifier
                ) {
                    if (!option_dict.getset) {

// test_cause:
// ["aa={get aa(){}}", "prefix_lbrace", "unexpected_a", "get", 5]

                        warn("unexpected_a", name);
                    }
                    extra = name.id;
                    full = extra + " " + token_nxt.id;
                    name = token_nxt;
                    advance();
                    id = survey(name);
                    if (seen[full] === true || seen[id] === true) {

// test_cause:
// ["aa={get aa(){},get aa(){}}", "prefix_lbrace", "duplicate_a", "aa", 20]

                        warn("duplicate_a", name);
                    }
                    seen[id] = false;
                    seen[full] = true;
                } else if (name.id === "`") {

// test_cause:
// ["aa={`aa`:0}", "prefix_lbrace", "unexpected_a", "`", 5]

                    stop("unexpected_a", name);

                } else {
                    id = survey(name);
                    if (typeof seen[id] === "boolean") {

// test_cause:
// ["aa={aa,aa}", "prefix_lbrace", "duplicate_a", "aa", 8]

                        warn("duplicate_a", name);
                    }
                    seen[id] = true;
                }
                if (name.identifier) {
                    if (token_nxt.id === "}" || token_nxt.id === ",") {
                        if (typeof extra === "string") {

// test_cause:
// ["aa={get aa}", "prefix_lbrace", "closer", "", 0]

                            test_cause("closer");
                            advance("(");
                        }
                        value = parse_expression(Infinity, true);
                    } else if (token_nxt.id === "(") {

// test_cause:
// ["aa={aa()}", "prefix_lbrace", "paren", "", 0]
// ["aa={get aa(){}}", "prefix_lbrace", "paren", "", 0]

                        test_cause("paren");
                        value = prefix_function({
                            arity: "unary",
                            from: name.from,
                            id: "function",
                            line: name.line,
                            name: (
                                typeof extra === "string"
                                ? extra
                                : id
                            ),
                            thru: name.from
                        });
                    } else {
                        if (typeof extra === "string") {

// test_cause:
// ["aa={get aa.aa}", "prefix_lbrace", "paren", "", 0]

                            test_cause("paren");
                            advance("(");
                        }
                        the_colon = token_nxt;
                        advance(":");
                        value = parse_expression(0);
                        if (
                            value.id === name.id
                            && value.id !== "function"
                        ) {

// test_cause:
// ["aa={aa:aa}", "prefix_lbrace", "unexpected_a", ": aa", 7]

                            warn("unexpected_a", the_colon, ": " + name.id);
                        }
                    }
                    value.label = name;
                    if (typeof extra === "string") {
                        value.extra = extra;
                    }
                    the_brace.expression.push(value);
                } else {

// test_cause:
// ["aa={\"aa\":0}", "prefix_lbrace", "colon", "", 0]

                    test_cause("colon");
                    advance(":");
                    value = parse_expression(0);
                    value.label = name;
                    the_brace.expression.push(value);
                }
                if (token_nxt.id !== ",") {
                    break;
                }

// test_cause:
// ["aa={\"aa\":0,\"bb\":0}", "prefix_lbrace", "comma", "", 0]

                test_cause("comma");
                advance(",");
                if (token_nxt.id === "}") {

// test_cause:
// ["let aa={aa:0,}", "prefix_lbrace", "unexpected_a", ",", 13]

                    warn("unexpected_a", token_now);
                    break;
                }
            }
        }

// test_cause:
// ["aa={bb,aa}", "check_ordered", "expected_a_b_before_c_d", "aa", 8]

        check_ordered(
            "property",
            the_brace.expression.map(function ({
                label
            }) {
                return label;
            })
        );
        advance("}");
        return the_brace;
    }

    function prefix_lbracket() {
        const the_token = token_now;
        let element;
        let ellipsis;
        the_token.expression = [];
        if (token_nxt.id !== "]") {

// Parse/loop through each element in [...].

            while (true) {
                ellipsis = false;
                if (token_nxt.id === "...") {
                    ellipsis = true;
                    advance("...");
                }
                element = parse_expression(10);
                if (ellipsis) {
                    element.ellipsis = true;
                }
                the_token.expression.push(element);
                if (token_nxt.id !== ",") {
                    break;
                }
                advance(",");
                if (token_nxt.id === "]") {

// test_cause:
// ["let aa=[0,]", "prefix_lbracket", "unexpected_a", ",", 10]

                    warn("unexpected_a", token_now);
                    break;
                }
            }
        }
        advance("]");
        return the_token;
    }

    function prefix_lparen() {
        let the_paren = token_now;
        let the_value;

// PR-385 - Bugfix - Fixes issue #382 - failure to detect destructured fart.

        if (token_now.fart) {
            return parse_fart(token_now.fart);
        }

// test_cause:
// ["(0)", "prefix_lparen", "expr", "", 0]

        test_cause("expr");
        the_paren.free = true;
        the_value = parse_expression(0);
        if (the_value.wrapped === true) {

// test_cause:
// ["((0))", "prefix_lparen", "unexpected_a", "(", 1]

            warn("unexpected_a", the_paren);
        }
        the_value.wrapped = true;
        advance(")", the_paren);
        return the_value;
    }

    function prefix_new() {
        const the_new = token_now;
        let right;
        right = parse_expression(160);
        if (token_nxt.id !== "(") {

// test_cause:
// ["new aa", "prefix_new", "expected_a_before_b", "(end)", 1]

            warn("expected_a_before_b", token_nxt, "()", artifact());
        }
        the_new.expression = right;
        return the_new;
    }

    function prefix_tick() {
        const the_tick = token_now;
        the_tick.value = [];
        the_tick.expression = [];
        if (token_nxt.id !== "`") {

// Parse/loop through each token in `${...}`.

            while (true) {
                advance("(string)");
                the_tick.value.push(token_now);
                if (token_nxt.id !== "${") {
                    break;
                }
                advance("${");

// test_cause:
// ["let aa=`${}`;", "prefix_tick", "${", "", 0]

                test_cause("${");
                the_tick.expression.push(parse_expression(0));
                advance("}");
            }
        }
        advance("`");
        return the_tick;
    }

    function prefix_void() {
        const the_void = token_now;

// test_cause:
// ["void 0", "prefix_void", "unexpected_a", "void", 1]
// ["void", "prefix_void", "unexpected_a", "void", 1]

        warn("unexpected_a", the_void);
        the_void.expression = parse_expression(0);
        return the_void;
    }

    function semicolon() {

// Try to match a semicolon.

        if (token_nxt.id === ";") {
            advance(";");
        } else {

// test_cause:
// ["0", "semicolon", "expected_a_b", "(end)", 1]

            warn_at(
                "expected_a_b",
                token_now.line,
                token_now.thru + 1,
                ";",
                artifact()
            );
        }
        anon = "anonymous";
    }

    function stmt(id, fud_stmt) {

// Create a statement.

        const the_symbol = symbol(id);
        the_symbol.fud_stmt = fud_stmt;
        return the_symbol;
    }

    function stmt_break() {
        const the_break = token_now;
        let the_label;
        if (
            (functionage.loop < 1 && functionage.switch < 1)
            || functionage.finally > 0
        ) {

// test_cause:
// ["break", "stmt_break", "unexpected_a", "break", 1]

            warn("unexpected_a", the_break);
        }
        the_break.disrupt = true;
        if (token_nxt.identifier && token_now.line === token_nxt.line) {
            the_label = functionage.context[token_nxt.id];
            if (
                the_label === undefined
                || the_label.role !== "label"
                || the_label.dead
            ) {
                if (the_label !== undefined && the_label.dead) {

// test_cause:
// ["aa:{function aa(aa){break aa;}}", "stmt_break", "out_of_scope_a", "aa", 27]

                    warn("out_of_scope_a");
                } else {

// test_cause:
// ["aa:{break aa;}", "stmt_break", "not_label_a", "aa", 11]

                    warn("not_label_a");
                }
            } else {
                the_label.used += 1;
            }
            the_break.label = token_nxt;
            advance();
        }
        advance(";");
        return the_break;
    }

    function stmt_continue() {
        const the_continue = token_now;
        if (functionage.loop < 1 || functionage.finally > 0) {

// test_cause:
// ["continue", "stmt_continue", "unexpected_a", "continue", 1]
// ["
// function aa(){while(0){try{}finally{continue}}}
// ", "stmt_continue", "unexpected_a", "continue", 37]

            warn("unexpected_a", the_continue);
        }
        check_not_top_level(the_continue);
        the_continue.disrupt = true;
        warn("unexpected_a", the_continue);
        advance(";");
        return the_continue;
    }

    function stmt_debugger() {
        const the_debug = token_now;
        if (!option_dict.devel) {

// test_cause:
// ["debugger", "stmt_debugger", "unexpected_a", "debugger", 1]

            warn("unexpected_a", the_debug);
        }
        semicolon();
        return the_debug;
    }

    function stmt_delete() {
        const the_token = token_now;
        const the_value = parse_expression(0);
        if (
            (the_value.id !== "." && the_value.id !== "[")
            || the_value.arity !== "binary"
        ) {

// test_cause:
// ["delete 0", "stmt_delete", "expected_a_b", "0", 8]

            stop("expected_a_b", the_value, ".", artifact(the_value));
        }
        the_token.expression = the_value;
        semicolon();
        return the_token;
    }

    function stmt_do() {
        const the_do = token_now;
        check_not_top_level(the_do);
        functionage.loop += 1;
        the_do.block = block();
        advance("while");
        the_do.expression = condition();
        semicolon();
        if (the_do.block.disrupt === true) {

// test_cause:
// ["function aa(){do{break;}while(0)}", "stmt_do", "weird_loop", "do", 15]

            warn("weird_loop", the_do);
        }
        functionage.loop -= 1;
        return the_do;
    }

    function stmt_export() {
        let export_list = [];
        let the_export = token_now;
        let the_id;
        let the_name;
        let the_thing;

        the_export.expression = [];
        if (token_nxt.id === "default") {
            if (export_dict.default !== undefined) {

// test_cause:
// ["
// export default 0;export default 0
// ", "stmt_export", "duplicate_a", "default", 25]

                warn("duplicate_a");
            }
            advance("default");
            the_thing = parse_expression(0);
            if (
                the_thing.id !== "("
                || the_thing.expression[0].id !== "."
                || the_thing.expression[0].expression.id !== "Object"
                || the_thing.expression[0].name.id !== "freeze"
            ) {

// test_cause:
// ["export default {}", "stmt_export", "freeze_exports", "{", 16]

                warn("freeze_exports", the_thing);

// PR-301 - Bugfix - Fixes issues #282 - optional-semicolon.

            } else {

// test_cause:
// ["
// export default Object.freeze({})
// ", "semicolon", "expected_a_b", "(end)", 32]

                semicolon();
            }
            export_dict.default = the_thing;
            the_export.expression.push(the_thing);
        } else {

// PR-439 - Add grammar for "export async function ...".

            if (token_nxt.id === "function" || token_nxt.id === "async") {

// test_cause:
// ["export async function aa(){}", "stmt_export", "freeze_exports", "async", 8]
// ["export function aa(){}", "stmt_export", "freeze_exports", "function", 8]

                warn("freeze_exports");
                the_thing = parse_statement();
                the_name = the_thing.name;
                the_id = the_name.id;
                the_name.used += 1;
                if (export_dict[the_id] !== undefined) {

// test_cause:
// ["
// let aa;export{aa};export function aa(){}
// ", "stmt_export", "duplicate_a", "aa", 35]

                    warn("duplicate_a", the_name);
                }
                export_dict[the_id] = the_thing;
                the_export.expression.push(the_thing);
                the_thing.statement = false;
                the_thing.arity = "unary";
            } else if (
                token_nxt.id === "var"
                || token_nxt.id === "let"
                || token_nxt.id === "const"
            ) {

// test_cause:
// ["export const", "stmt_export", "unexpected_a", "const", 8]
// ["export let", "stmt_export", "unexpected_a", "let", 8]
// ["export var", "stmt_export", "unexpected_a", "var", 8]

                warn("unexpected_a");
                parse_statement();
            } else if (token_nxt.id === "{") {

// test_cause:
// ["export {}", "stmt_export", "advance{", "", 0]

                test_cause("advance{");
                advance("{");
                while (true) {
                    if (!token_nxt.identifier) {

// test_cause:
// ["export {}", "stmt_export", "expected_identifier_a", "}", 9]

                        stop("expected_identifier_a");
                    }
                    the_id = token_nxt.id;
                    export_list.push(token_nxt);
                    the_name = token_global.context[the_id];
                    if (the_name === undefined) {

// test_cause:
// ["export {aa}", "stmt_export", "unexpected_a", "aa", 9]

                        warn("unexpected_a");
                    } else {
                        the_name.used += 1;
                        if (export_dict[the_id] !== undefined) {

// test_cause:
// ["let aa;export{aa,aa}", "stmt_export", "duplicate_a", "aa", 18]

                            warn("duplicate_a");
                        }
                        export_dict[the_id] = the_name;
                    }
                    advance();
                    the_export.expression.push(the_thing);
                    if (token_nxt.id === ",") {
                        advance(",");
                    } else {
                        break;
                    }
                }

// PR-439 - Check exported properties are ordered.

// test_cause:
// ["export {bb, aa}", "check_ordered", "expected_a_b_before_c_d", "aa", 13]

                check_ordered("export", export_list);
                advance("}");
                semicolon();
            } else {

// test_cause:
// ["export", "stmt_export", "unexpected_a", "(end)", 1]

                stop("unexpected_a");
            }
        }
        state.mode_module = true;
        return the_export;
    }

    function stmt_for() {
        let first;
        let the_for = token_now;
        if (!option_dict.for) {

// test_cause:
// ["for", "stmt_for", "unexpected_a", "for", 1]

            warn("unexpected_a", the_for);
        }
        check_not_top_level(the_for);
        functionage.loop += 1;
        advance("(");
        token_now.free = true;
        if (token_nxt.id === ";") {

// test_cause:
// ["for(;;){}", "stmt_for", "expected_a_b", "for (;", 1]

            return stop("expected_a_b", the_for, "while (", "for (;");
        }
        switch (token_nxt.id) {
        case "const":
        case "let":
        case "var":

// test_cause:
// ["for(const aa in aa){}", "stmt_for", "unexpected_a", "const", 5]

            return stop("unexpected_a");
        }
        first = parse_expression(0);
        if (first.id === "in") {
            if (first.expression[0].arity !== "variable") {

// test_cause:
// ["for(0 in aa){}", "stmt_for", "bad_assignment_a", "0", 5]

                warn("bad_assignment_a", first.expression[0]);
            }
            the_for.name = first.expression[0];
            the_for.expression = first.expression[1];
            warn("expected_a_b", the_for, "Object.keys", "for in");
        } else {
            the_for.initial = first;
            advance(";");
            the_for.expression = parse_expression(0);
            advance(";");
            the_for.inc = parse_expression(0);
            if (the_for.inc.id === "++") {

// test_cause:
// ["for(aa;aa;aa++){}", "stmt_for", "expected_a_b", "++", 13]

                warn("expected_a_b", the_for.inc, "+= 1", "++");
            }
        }
        advance(")");
        the_for.block = block();
        if (the_for.block.disrupt === true) {

// test_cause:
// ["
// /*jslint for*/
// function aa(bb,cc){for(0;0;0){break;}}
// ", "stmt_for", "weird_loop", "for", 20]

            warn("weird_loop", the_for);
        }
        functionage.loop -= 1;
        return the_for;
    }

    function stmt_if() {
        const the_if = token_now;
        let the_else;
        the_if.expression = condition();
        the_if.block = block();
        if (token_nxt.id === "else") {
            advance("else");
            the_else = token_now;
            the_if.else = (
                token_nxt.id === "if"
                ? parse_statement()
                : block()
            );

// test_cause:
// ["if(0){0}else if(0){0}", "stmt_if", "else", "", 0]
// ["if(0){0}else{0}", "stmt_if", "else", "", 0]

            test_cause("else");
            if (the_if.block.disrupt === true) {
                if (the_if.else.disrupt === true) {

// test_cause:
// ["if(0){break;}else{break;}", "stmt_if", "disrupt", "", 0]

                    test_cause("disrupt");
                    the_if.disrupt = true;
                } else {

// test_cause:
// ["if(0){break;}else{}", "stmt_if", "unexpected_a", "else", 14]

                    warn("unexpected_a", the_else);
                }
            }
        }
        return the_if;
    }

    function stmt_import() {
        const the_import = token_now;
        let name;
        let names;

// PR-347 - Disable warning "unexpected_directive_a".
//
//         if (typeof state.mode_module === "object") {
//
// // test_cause:
// // ["
// // /*global aa*/
// // import aa from "aa"
// // ", "stmt_import", "unexpected_directive_a", "global", 1]
//
//             warn(
//                 "unexpected_directive_a",
//                 state.mode_module,
//                 state.mode_module.directive
//             );
//         }

        state.mode_module = true;

// PR-436 - Add grammar for side-effect import-statement.

        if (token_nxt.id === "(string)") {

// test_cause:
// ["import \"./aa.mjs\";", "stmt_import", "import_side_effect", "", 0]

            test_cause("import_side_effect");
            warn("expected_a_b", token_nxt, "{", artifact());
            advance();
            semicolon();
            return the_import;
        }
        if (token_nxt.identifier) {
            name = token_nxt;
            advance();
            if (name.id === "ignore") {

// test_cause:
// ["import ignore from \"aa\"", "stmt_import", "unexpected_a", "ignore", 8]

                warn("unexpected_a", name);
            }
            enroll(name, "variable", true);
            the_import.name = name;
        } else {
            names = [];
            advance("{");
            if (token_nxt.id !== "}") {
                while (true) {
                    if (!token_nxt.identifier) {

// test_cause:
// ["import {", "stmt_import", "expected_identifier_a", "(end)", 1]

                        stop("expected_identifier_a");
                    }
                    name = token_nxt;
                    advance();
                    if (name.id === "ignore") {

// test_cause:
// ["import {ignore} from \"aa\"", "stmt_import", "unexpected_a", "ignore", 9]

                        warn("unexpected_a", name);
                    }
                    enroll(name, "variable", true);
                    names.push(name);
                    if (token_nxt.id !== ",") {
                        break;
                    }
                    advance(",");
                }
            }
            advance("}");
            the_import.name = names;
        }
        advance("from");
        advance("(string)");
        the_import.import = token_now;
        if (!jslint_rgx_module.test(token_now.value)) {

// test_cause:
// ["import aa from \"!aa\"", "stmt_import", "bad_module_name_a", "!aa", 16]

            warn("bad_module_name_a", token_now);
        }
        import_list.push(token_now.value);
        semicolon();
        return the_import;
    }

    function stmt_lbrace() {

// test_cause:
// [";{}", "stmt_lbrace", "naked_block", "{", 2]
// ["class aa{}", "stmt_lbrace", "naked_block", "{", 9]

        warn("naked_block", token_now);
        return block("naked");
    }

    function stmt_return() {
        const the_return = token_now;
        check_not_top_level(the_return);
        if (functionage.finally > 0) {

// test_cause:
// ["
// function aa(){try{}finally{return;}}
// ", "stmt_return", "unexpected_a", "return", 28]

            warn("unexpected_a", the_return);
        }
        the_return.disrupt = true;
        if (token_nxt.id !== ";" && the_return.line === token_nxt.line) {
            the_return.expression = parse_expression(10);
        }
        advance(";");
        return the_return;
    }

    function stmt_semicolon() {

// test_cause:
// [";", "stmt_semicolon", "unexpected_a", ";", 1]

        warn("unexpected_a", token_now);
        return token_now;
    }

    function stmt_switch() {
        const the_cases = [];
        const the_switch = token_now;
        let dups = [];
        let exp;
        let last;
        let stmts;
        let the_case;
        let the_default;
        let the_disrupt = true;
        let the_last;
        function is_dup(thing) {
            return is_equal(thing, exp);
        }
        check_not_top_level(the_switch);
        if (functionage.finally > 0) {

// test_cause:
// ["
// function aa(){try{}finally{switch(0){}}}
// ", "stmt_switch", "unexpected_a", "switch", 28]

            warn("unexpected_a", the_switch);
        }
        functionage.switch += 1;
        advance("(");
        token_now.free = true;
        the_switch.expression = parse_expression(0);
        the_switch.block = the_cases;
        advance(")");
        advance("{");
        while (true) {

// Loop through cases with breaks.

            the_case = token_nxt;
            the_case.arity = "statement";
            the_case.expression = [];
            while (true) {

// Loop through fallthrough cases.

                advance("case");
                token_now.switch = true;
                exp = parse_expression(0);
                if (dups.some(is_dup)) {

// test_cause:
// ["
// switch(0){case 0:break;case 0:break}
// ", "stmt_switch", "unexpected_a", "0", 29]

                    warn("unexpected_a", exp);
                }
                dups.push(exp);
                the_case.expression.push(exp);
                advance(":");
                if (token_nxt.id !== "case") {
                    break;
                }
            }

// test_cause:
// ["
// switch(0){case 1:case 0:break;}
// ", "check_ordered_case", "expected_a_b_before_c_d", "case-number", 23]
// ["
// switch(0){case "aa":case 0:break;}
// ", "check_ordered_case", "expected_a_b_before_c_d", "case-number", 26]
// ["
// switch(0){case "bb":case "aa":break;}
// ", "check_ordered_case", "expected_a_b_before_c_d", "aa", 26]
// ["
// switch(0){case aa:case "aa":break;}
// ", "check_ordered_case", "expected_a_b_before_c_d", "aa", 24]
// ["
// switch(0){case bb:case aa:break;}
// ", "check_ordered_case", "expected_a_b_before_c_d", "aa", 24]

            check_ordered_case(the_case.expression);
            stmts = parse_statements();
            if (stmts.length < 1) {

// test_cause:
// ["
// switch(0){case 0:default:}
// ", "stmt_switch", "expected_statements_a", "default", 18]
// ["switch(0){case 0:}", "stmt_switch", "expected_statements_a", "}", 18]

                warn("expected_statements_a");

// PR-359 - Bugfix - Fixes issue #358 - switch-statement crashes jslint.

                break;
            }
            the_case.block = stmts;
            the_cases.push(the_case);
            last = stmts[stmts.length - 1];
            if (last.disrupt) {
                if (last.id === "break" && last.label === undefined) {
                    the_disrupt = false;
                }
            } else {
                warn("expected_a_before_b", token_nxt, "break;", artifact());
            }
            if (token_nxt.id !== "case") {
                break;
            }
        }

// test_cause:
// ["
// switch(0){case 1:break;case 0:break;}
// ", "check_ordered_case", "expected_a_b_before_c_d", "case-number", 29]
// ["
// switch(0){case "aa":break;case 0:break;}
// ", "check_ordered_case", "expected_a_b_before_c_d", "case-number", 32]
// ["
// switch(0){case "bb":break;case "aa":break;}
// ", "check_ordered_case", "expected_a_b_before_c_d", "aa", 32]
// ["
// switch(0){case aa:break;case "aa":break;}
// ", "check_ordered_case", "expected_a_b_before_c_d", "aa", 30]
// ["
// switch(0){case bb:break;case aa:break;}
// ", "check_ordered_case", "expected_a_b_before_c_d", "aa", 30]

        check_ordered_case(the_cases.map(function ({
            expression
        }) {
            return expression[0];
        }));
        dups = undefined;
        if (token_nxt.id === "default") {
            the_default = token_nxt;
            advance("default");
            token_now.switch = true;
            advance(":");
            the_switch.else = parse_statements();
            if (the_switch.else.length < 1) {

// test_cause:
// ["
// switch(0){case 0:break;default:}
// ", "stmt_switch", "unexpected_a", "default", 24]

                warn("unexpected_a", the_default);
                the_disrupt = false;
            } else {
                the_last = the_switch.else[
                    the_switch.else.length - 1
                ];
                if (
                    the_last.id === "break"
                    && the_last.label === undefined
                ) {

// test_cause:
// ["
// switch(0){case 0:break;default:break;}
// ", "stmt_switch", "unexpected_a", "break", 32]

                    warn("unexpected_a", the_last);
                    the_last.disrupt = false;
                }
                the_disrupt = the_disrupt && the_last.disrupt;
            }
        } else {
            the_disrupt = false;
        }
        advance("}", the_switch);
        functionage.switch -= 1;
        the_switch.disrupt = the_disrupt;
        return the_switch;
    }

    function stmt_throw() {
        const the_throw = token_now;
        the_throw.disrupt = true;
        the_throw.expression = parse_expression(10);
        semicolon();
        if (functionage.try > 0) {

// test_cause:
// ["try{throw 0}catch(){}", "stmt_throw", "unexpected_a", "throw", 5]

            warn("unexpected_a", the_throw);
        }
        return the_throw;
    }

    function stmt_try() {
        const the_try = token_now;
        let ignored;
        let the_catch;
        let the_disrupt;
        if (functionage.try > 0) {

// test_cause:
// ["try{try{}catch(){}}catch(){}", "stmt_try", "unexpected_a", "try", 5]

            warn("unexpected_a", the_try);
        }
        functionage.try += 1;
        the_try.block = block();
        the_disrupt = the_try.block.disrupt;
        if (token_nxt.id === "catch") {
            ignored = "ignore";
            the_catch = token_nxt;
            the_try.catch = the_catch;
            advance("catch");

// Create new catch-scope for catch-parameter.

            catch_stack.push(catchage);
            catchage = the_catch;
            catch_list.push(catchage);
            the_catch.context = empty();
            if (token_nxt.id === "(") {
                advance("(");
                if (!token_nxt.identifier) {

// test_cause:
// ["try{}catch(){}", "stmt_try", "expected_identifier_a", ")", 12]

                    return stop("expected_identifier_a");
                }
                if (token_nxt.id !== "ignore") {
                    ignored = undefined;
                    the_catch.name = token_nxt;
                    enroll(token_nxt, "exception", true);
                }
                advance();
                advance(")");
            }
            the_catch.block = block(ignored);
            if (the_catch.block.disrupt !== true) {
                the_disrupt = false;
            }

// Restore previous catch-scope after catch-block.

            catchage = catch_stack.pop();

// PR-404 - Relax warning about missing `catch` in `try...finally` statement.
//
//         } else {
//
// // test_cause:
// // ["try{}finally{break;}", "stmt_try", "expected_a_before_b", "finally", 6]
//
//             warn("expected_a_before_b", token_nxt, "catch", artifact());

        }
        if (token_nxt.id === "finally") {
            functionage.finally += 1;
            advance("finally");
            the_try.else = block();
            the_disrupt = the_try.else.disrupt;
            functionage.finally -= 1;
        }
        the_try.disrupt = the_disrupt;
        functionage.try -= 1;
        return the_try;
    }

    function stmt_var() {
        let ellipsis;
        let mode_const;
        let name;
        let the_brace;
        let the_bracket;
        let the_variable = token_now;
        let variable_prv;
        mode_const = the_variable.id === "const";
        the_variable.names = [];

// A program may use var or let, but not both.

        if (!mode_const) {
            if (mode_var === undefined) {
                mode_var = the_variable.id;
            } else if (the_variable.id !== mode_var) {

// test_cause:
// ["let aa;var aa", "stmt_var", "expected_a_b", "var", 8]

                warn("expected_a_b", the_variable, mode_var, the_variable.id);
            }
        }

// We don't expect to see variables created in switch statements.

        if (functionage.switch > 0) {

// test_cause:
// ["switch(0){case 0:var aa}", "stmt_var", "var_switch", "var", 18]

            warn("var_switch", the_variable);
        }
        switch (
            Boolean(functionage.statement_prv)
            && functionage.statement_prv.id
        ) {
        case "const":
        case "let":
        case "var":

// test_cause:
// ["const aa=0;const bb=0;", "stmt_var", "var_prv", "const", 0]
// ["let aa=0;let bb=0;", "stmt_var", "var_prv", "let", 0]
// ["var aa=0;var bb=0;", "stmt_var", "var_prv", "var", 0]

            test_cause("var_prv", functionage.statement_prv.id);
            variable_prv = functionage.statement_prv;
            break;
        case "import":

// test_cause:
// ["import aa from \"aa\";\nlet bb=0;", "stmt_var", "import_prv", "", 0]

            test_cause("import_prv");
            break;
        case false:
            break;
        default:
            if (
                (option_dict.beta && !option_dict.variable)
                || the_variable.id === "var"
            ) {

// test_cause:
// ["console.log();let aa=0;", "stmt_var", "var_on_top", "let", 15]
// ["console.log();var aa=0;", "stmt_var", "var_on_top", "var", 15]
// ["try{aa();}catch(aa){var aa=0;}", "stmt_var", "var_on_top", "var", 21]
// ["while(0){var aa;}", "stmt_var", "var_on_top", "var", 10]

                warn("var_on_top", token_now);
            }
        }
        while (true) {
            if (token_nxt.id === "{") {
                if (the_variable.id === "var") {

// test_cause:
// ["var{aa}=0", "stmt_var", "unexpected_a", "var", 1]

                    warn("unexpected_a", the_variable);
                }
                the_brace = token_nxt;
                advance("{");
                while (true) {
                    name = token_nxt;
                    if (!name.identifier) {

// test_cause:
// ["let {0}", "stmt_var", "expected_identifier_a", "0", 6]

                        return stop("expected_identifier_a");
                    }
                    survey(name);
                    advance();
                    if (token_nxt.id === ":") {
                        advance(":");
                        if (!token_nxt.identifier) {

// test_cause:
// ["let {aa:0}", "stmt_var", "expected_identifier_a", "0", 9]
// ["let {aa:{aa}}", "stmt_var", "expected_identifier_a", "{", 9]

                            return stop("expected_identifier_a");
                        }

// PR-363 - Bugfix
// Add test against false-warning <uninitialized 'bb'> in code
// '/*jslint node*/\nlet {aa:bb} = {}; bb();'.
//
//                         token_nxt.label = name;
//                         the_variable.names.push(token_nxt);
//                         enroll(token_nxt, "variable", mode_const);

                        name = token_nxt;
                        the_variable.names.push(name);
                        survey(name);
                        enroll(name, "variable", mode_const);

                        advance();
                        the_brace.open = true;
                    } else {
                        the_variable.names.push(name);
                        enroll(name, "variable", mode_const);
                    }
                    name.dead = false;
                    name.init = true;
                    if (token_nxt.id === "=") {

// test_cause:
// ["let {aa=0}", "stmt_var", "assign", "", 0]

                        test_cause("assign");
                        advance("=");
                        name.expression = parse_expression();
                        the_brace.open = true;
                    }
                    if (token_nxt.id !== ",") {
                        break;
                    }
                    advance(",");
                }

// test_cause:
// ["let{bb,aa}", "check_ordered", "expected_a_b_before_c_d", "aa", 8]

                check_ordered(the_variable.id, the_variable.names);
                advance("}");
                advance("=");
                the_variable.expression = parse_expression(0);
            } else if (token_nxt.id === "[") {
                if (the_variable.id === "var") {

// test_cause:
// ["var[aa]=0", "stmt_var", "unexpected_a", "var", 1]

                    warn("unexpected_a", the_variable);
                }
                the_bracket = token_nxt;
                advance("[");
                while (true) {
                    ellipsis = false;
                    if (token_nxt.id === "...") {
                        ellipsis = true;
                        advance("...");
                    }
                    if (!token_nxt.identifier) {

// test_cause:
// ["let[]", "stmt_var", "expected_identifier_a", "]", 5]

                        return stop("expected_identifier_a");
                    }
                    name = token_nxt;
                    advance();
                    the_variable.names.push(name);
                    enroll(name, "variable", mode_const);
                    name.dead = false;
                    name.init = true;
                    if (ellipsis) {
                        name.ellipsis = true;
                        break;
                    }
                    if (token_nxt.id === "=") {
                        advance("=");
                        name.expression = parse_expression();
                        the_bracket.open = true;
                    }
                    if (token_nxt.id !== ",") {
                        break;
                    }
                    advance(",");
                }
                advance("]");
                advance("=");
                the_variable.expression = parse_expression(0);
            } else if (token_nxt.identifier) {
                name = token_nxt;
                advance();
                if (name.id === "ignore") {

// test_cause:
// ["
// let ignore;function aa(ignore) {}
// ", "stmt_var", "unexpected_a", "ignore", 5]

                    warn("unexpected_a", name);
                }
                enroll(name, "variable", mode_const);
                if (token_nxt.id === "=" || mode_const) {
                    advance("=");
                    name.dead = false;
                    name.init = true;
                    name.expression = parse_expression(0);
                }
                the_variable.names.push(name);
            } else {

// test_cause:
// ["let 0", "stmt_var", "expected_identifier_a", "0", 5]
// ["var{aa:{aa}}", "stmt_var", "expected_identifier_a", "{", 8]

                return stop("expected_identifier_a");
            }
            if (token_nxt.id !== ",") {
                break;
            }

// test_cause:
// ["let aa,bb;", "stmt_var", "expected_a_b", ",", 7]

            warn("expected_a_b", token_nxt, ";", ",");
            advance(",");
        }

// Warn if variable declarations are unordered.

        if (
            option_dict.beta
            && !option_dict.unordered
            && !option_dict.variable
            && variable_prv
            && (
                variable_prv.id + " " + variable_prv.names[0].id
                > the_variable.id + " " + the_variable.names[0].id
            )
        ) {

// test_cause:
// ["const bb=0;const aa=0;", "stmt_var", "expected_a_b_before_c_d", "aa", 12]
// ["let bb;let aa;", "stmt_var", "expected_a_b_before_c_d", "aa", 8]
// ["var bb;var aa;", "stmt_var", "expected_a_b_before_c_d", "aa", 8]

            warn(
                "expected_a_b_before_c_d",
                the_variable,
                the_variable.id,
                the_variable.names[0].id,
                variable_prv.id,
                variable_prv.names[0].id
            );
        }
        semicolon();
        return the_variable;
    }

    function stmt_while() {
        const the_while = token_now;
        check_not_top_level(the_while);
        functionage.loop += 1;
        the_while.expression = condition();
        the_while.block = block();
        if (the_while.block.disrupt === true) {

// test_cause:
// ["function aa(){while(0){break;}}", "stmt_while", "weird_loop", "while", 15]

            warn("weird_loop", the_while);
        }
        functionage.loop -= 1;
        return the_while;
    }

    function stmt_with() {

// test_cause:
// ["with", "stmt_with", "unexpected_a", "with", 1]

        stop("unexpected_a", token_now);
    }

    function survey(name) {
        let id = name.id;

// Tally the property name. If it is a string, only tally strings that conform
// to the identifier rules.

        if (id === "(string)") {
            id = name.value;
            if (!jslint_rgx_identifier.test(id)) {
                return id;
            }
        } else if (id === "`") {
            if (name.value.length === 1) {
                id = name.value[0].value;
                if (!jslint_rgx_identifier.test(id)) {
                    return id;
                }
            }
        } else if (!name.identifier) {

// test_cause:
// ["let aa={0:0}", "survey", "expected_identifier_a", "0", 9]

            return stop("expected_identifier_a", name);
        }

// If we have seen this name before, increment its count.

        if (typeof property_dict[id] === "number") {
            property_dict[id] += 1;

// If this is the first time seeing this property name, and if there is a
// tenure list, then it must be on the list. Otherwise, it must conform to
// the rules for good property names.

        } else {
            if (state.mode_property) {
                if (tenure[id] !== true) {

// test_cause:
// ["/*property aa*/\naa.bb", "survey", "unregistered_property_a", "bb", 4]

                    warn("unregistered_property_a", name);
                }
            } else if (
                !option_dict.nomen
                && name.identifier
                && jslint_rgx_weird_property.test(id)
            ) {

// test_cause:
// ["aa.$", "survey", "weird_property_a", "$", 4]
// ["aa._", "survey", "weird_property_a", "_", 4]
// ["aa._aa", "survey", "weird_property_a", "_aa", 4]
// ["aa.aaSync", "survey", "weird_property_a", "aaSync", 4]
// ["aa.aa_", "survey", "weird_property_a", "aa_", 4]

                warn("weird_property_a", name);
            }
            property_dict[id] = 1;
        }
        return id;
    }

// These functions are used to specify the grammar of our language:

    function symbol(id, bp) {

// Create a symbol if it does not already exist in the language's syntax.

        let the_symbol = syntax_dict[id];
        if (the_symbol === undefined) {
            the_symbol = empty();
            the_symbol.id = id;
            the_symbol.lbp = bp || 0;
            syntax_dict[id] = the_symbol;
        }
        return the_symbol;
    }

    function ternary(id1, id2) {

// Create a ternary operator.

        const the_symbol = symbol(id1, 30);
        the_symbol.led_infix = function parse_ternary_led(left) {
            const the_token = token_now;
            let second;
            second = parse_expression(20);
            advance(id2);
            token_now.arity = "ternary";
            the_token.arity = "ternary";
            the_token.expression = [left, second, parse_expression(10)];
            if (token_nxt.id !== ")") {

// test_cause:
// ["0?0:0", "parse_ternary_led", "use_open", "?", 2]

                warn("use_open", the_token);
            }
            return the_token;
        };
        return the_symbol;
    }

// Now we parse JavaScript.
// Begin defining the language.

    assignment("%=");
    assignment("&=");
    assignment("*=");
    assignment("+=");
    assignment("-=");
    assignment("/=");
    assignment("<<=");
    assignment("=");
    assignment(">>=");
    assignment(">>>=");
    assignment("^=");
    assignment("|=");
    constant("(number)", "number");
    constant("(regexp)", "regexp");
    constant("(string)", "string");
    constant("Function", "function", constant_Function);
    constant("Infinity", "number", Infinity);
    constant("NaN", "number", NaN);
    constant("arguments", "object", constant_arguments);
    constant("eval", "function", constant_eval);
    constant("false", "boolean", false);
    constant("ignore", "undefined", constant_ignore);
    constant("isFinite", "function", constant_isInfinite);
    constant("isNaN", "function", constant_isNaN);
    constant("null", "null", null);
    constant("this", "object", constant_this);
    constant("true", "boolean", true);
    constant("undefined", "undefined");
    infix(100, "!=");
    infix(100, "!==");
    infix(100, "==");
    infix(100, "===");
    infix(110, "<");
    infix(110, "<=");
    infix(110, ">");
    infix(110, ">=");
    infix(110, "in");
    infix(110, "instanceof");
    infix(120, "<<");
    infix(120, ">>");
    infix(120, ">>>");
    infix(130, "+");
    infix(130, "-");
    infix(140, "%");
    infix(140, "*");
    infix(140, "/");
    infix(160, "(", infix_lparen);
    infix(160, "`", infix_grave);
    infix(170, ".", infix_dot);
    infix(170, "=>", infix_fart_unwrapped);
    infix(170, "?.", infix_option_chain);
    infix(170, "[", infix_lbracket);
    infix(35, "??");
    infix(40, "||");
    infix(50, "&&");
    infix(70, "|");
    infix(80, "^");
    infix(90, "&");
    infixr(150, "**");
    postassign("++");
    postassign("--");
    preassign("++");
    preassign("--");
    prefix("!!");
    prefix("!");
    prefix("(", prefix_lparen);
    prefix("+");
    prefix("-");
    prefix("/=", prefix_assign_divide);
    prefix("=>", prefix_fart);
    prefix("[", prefix_lbracket);
    prefix("`", prefix_tick);
    prefix("async", prefix_async);
    prefix("await", prefix_await);
    prefix("function", prefix_function);
    prefix("new", prefix_new);
    prefix("typeof");
    prefix("void", prefix_void);
    prefix("{", prefix_lbrace);
    prefix("~");
    stmt(";", stmt_semicolon);
    stmt("async", prefix_async);
    stmt("await", prefix_await);
    stmt("break", stmt_break);
    stmt("const", stmt_var);
    stmt("continue", stmt_continue);
    stmt("debugger", stmt_debugger);
    stmt("delete", stmt_delete);
    stmt("do", stmt_do);
    stmt("export", stmt_export);
    stmt("for", stmt_for);
    stmt("function", prefix_function);
    stmt("if", stmt_if);
    stmt("import", stmt_import);
    stmt("let", stmt_var);
    stmt("return", stmt_return);
    stmt("switch", stmt_switch);
    stmt("throw", stmt_throw);
    stmt("try", stmt_try);
    stmt("var", stmt_var);
    stmt("while", stmt_while);
    stmt("with", stmt_with);
    stmt("{", stmt_lbrace);
    symbol(")");
    symbol("*/");
    symbol(",");
    symbol(":");
    symbol(";");
    symbol("]");
    symbol("async");
    symbol("await");
    symbol("case");
    symbol("catch");
    symbol("class");
    symbol("default");
    symbol("else");
    symbol("enum");
    symbol("finally");
    symbol("implements");
    symbol("interface");
    symbol("package");
    symbol("private");
    symbol("protected");
    symbol("public");
    symbol("static");
    symbol("super");
    symbol("void");
    symbol("yield");
    symbol("}");
    ternary("?", ":");

// Init token_nxt.

    advance();

// Parsing of JSON is simple:

    if (state.mode_json) {
        state.token_tree = parse_json();
        advance("(end)");
        return;
    }

// Because browsers encourage combining of script files, the first token might
// be a semicolon to defend against a missing semicolon in the preceding file.

    if (option_dict.browser) {
        if (token_nxt.id === ";") {
            advance(";");
        }

// If we are not in a browser, then the file form of strict pragma may be used.

    } else if (token_nxt.value === "use strict") {
        advance("(string)");
        advance(";");
    }
    state.token_tree = parse_statements();
    advance("(end)");

// Check global functions are ordered.

    check_ordered(
        "function",
        function_list.map(function ({
            level,
            name
        }) {
            return (level === 1) && name;
        }).filter(function (name) {
            return option_dict.beta && name && name.id;
        })
    );
}

function jslint_phase4_walk(state) {

// PHASE 4. Walk <token_tree>, traversing all nodes of the tree. It is a
//          recursive traversal. Each node may be processed on the way down
//          (preaction) and on the way up (postaction).

    let {
        artifact,
        catch_stack,
        function_stack,
        global_dict,
        is_equal,
        is_weird,
        option_dict,
        syntax_dict,
        test_cause,
        token_global,
        warn
    } = state;
    let block_stack = [];               // The stack of blocks.
    let blockage = token_global;        // The current block.
    let catchage = catch_stack[0];      // The current catch-block.
    let functionage = token_global;     // The current function.
    let postaction;
    let postamble;
    let posts = empty();
    let preaction;
    let preamble;
    let pres = empty();

// The relational operators.

    let relationop = object_assign_from_list(empty(), [
        "!=", "!==", "<", "<=", "==", "===", ">", ">="
    ], true);

// Ambulation of the parse tree.

    function action(when) {

// Produce a function that will register task functions that will be called as
// the tree is traversed.

        return function (arity, id, task) {
            let a_set = when[arity];
            let i_set;

// The id parameter is optional. If excluded, the task will be applied to all
// ids.

            if (typeof id !== "string") {
                task = id;
                id = "(all)";
            }

// If this arity has no registrations yet, then create a set object to hold
// them.

            if (a_set === undefined) {
                a_set = empty();
                when[arity] = a_set;
            }

// If this id has no registrations yet, then create a set array to hold them.

            i_set = a_set[id];
            if (i_set === undefined) {
                i_set = [];
                a_set[id] = i_set;
            }

// Register the task with the arity and the id.

            i_set.push(task);
        };
    }

    function amble(when) {

// Produce a function that will act on the tasks registered by an action
// function while walking the tree.

        return function (the_token) {

// Given a task set that was built by an action function, run all
// relevant tasks on the token.

            let a_set = when[the_token.arity];
            let i_set;

// If there are tasks associated with the token's arity...

            if (a_set !== undefined) {

// If there are tasks associated with the token's id...

                i_set = a_set[the_token.id];
                if (i_set !== undefined) {
                    i_set.forEach(function (task) {
                        task(the_token);
                    });
                }

// If there are tasks for all ids.

                i_set = a_set["(all)"];
                if (i_set !== undefined) {
                    i_set.forEach(function (task) {
                        task(the_token);
                    });
                }
            }
        };
    }

    function init_variable(name) {
        let the_variable = lookup(name);
        if (!the_variable || the_variable.readonly) {
            warn("bad_assignment_a", name);
            return;
        }
        the_variable.init = true;
    }

    function lookup(thing) {
        let id = thing.id;
        let the_variable;
        if (thing.arity !== "variable") {
            return;
        }

// Look up the variable in the current context.

        the_variable = functionage.context[id] || catchage.context[id];

// If it isn't local, search all the other contexts. If there are name
// collisions, take the most recent.

        if (the_variable && the_variable.role === "label") {

// test_cause:
// ["aa:while(0){aa;}", "lookup", "label_a", "aa", 13]

            warn("label_a", thing);
            return the_variable;
        }
        if (!the_variable) {
            function_stack.forEach(function ({
                context
            }) {
                if (context[id] && context[id].role !== "label") {
                    the_variable = context[id];
                }
            });

// If it isn't in any of those either, perhaps it is a predefined global.
// If so, add it to the global context.

            if (!the_variable && global_dict[id] === undefined) {

// test_cause:
// ["aa", "lookup", "undeclared_a", "aa", 1]
// ["class aa{}", "lookup", "undeclared_a", "aa", 7]
// ["
// let aa=0;try{aa();}catch(bb){bb();}bb();
// ", "lookup", "undeclared_a", "bb", 36]
// ["
// let aa=0;try{aa();}catch(ignore){bb();}
// ", "lookup", "undeclared_a", "bb", 34]

                warn("undeclared_a", thing);
                return;
            }
            if (!the_variable) {
                the_variable = {
                    dead: false,
                    id,
                    init: true,
                    parent: token_global,
                    readonly: true,
                    role: "variable",
                    used: 0
                };
                token_global.context[id] = the_variable;
            }
            the_variable.closure = true;
            functionage.context[id] = the_variable;
        }
        if (
            (
                the_variable.calls === undefined
                || functionage.name === undefined
                || the_variable.calls[functionage.name.id] === undefined
            )
            && the_variable.dead
        ) {

// test_cause:
// ["let aa;if(aa){let bb;}bb;", "lookup", "out_of_scope_a", "bb", 23]

            warn("out_of_scope_a", thing);
        }
        return the_variable;
    }

    function post_a(thing) {

// Assignment using = sets the init property of a variable. No other assignment
// operator can do this. A = token keeps that variable (or array of variables
// in case of destructuring) in its name property.

        const lvalue = thing.expression[0];
        let right;
        if (thing.id === "=") {
            if (thing.names !== undefined) {

// test_cause:
// ["if(0){aa=0}", "post_a", "=", "", 0]

                test_cause("=");

// Probably deadcode.
// if (Array.isArray(thing.names)) {
//     thing.names.forEach(init_variable);
// } else {
//     init_variable(thing.names);
// }

                jslint_assert(
                    !Array.isArray(thing.names),
                    `Expected !Array.isArray(thing.names).`
                );
                init_variable(thing.names);
            } else {
                if (lvalue.id === "[" || lvalue.id === "{") {
                    lvalue.expression.forEach(function (thing) {
                        if (thing.variable) {
                            thing.variable.init = true;
                        }
                    });
                } else if (
                    lvalue.id === "."
                    && thing.expression[1].id === "undefined"
                ) {

// test_cause:
// ["aa.aa=undefined", "post_a", "expected_a_b", "undefined", 1]

                    warn(
                        "expected_a_b",
                        lvalue.expression,
                        "delete",
                        "undefined"
                    );
                }
            }
        } else {
            if (lvalue.arity === "variable") {
                if (!lvalue.variable || lvalue.variable.readonly) {
                    warn("bad_assignment_a", lvalue);
                }
            }
            right = syntax_dict[thing.expression[1].id];
            if (
                right !== undefined
                && (
                    right.id === "function"
                    || right.id === "=>"
                    || (
                        right.constant
                        && right.id !== "(number)"
                        && (right.id !== "(string)" || thing.id !== "+=")
                    )
                )
            ) {

// test_cause:
// ["aa+=undefined", "post_a", "unexpected_a", "undefined", 5]

                warn("unexpected_a", thing.expression[1]);
            }
        }
    }

    function post_a_pluseq(thing) {
        const right = thing.expression[1];
        if (right.constant) {
            if (
                right.value === ""
                || (right.id === "(number)" && right.value === "0")
                || right.id === "(boolean)"
                || right.id === "null"
                || right.id === "undefined"
                || Number.isNaN(right.value)
            ) {
                warn("unexpected_a", right);
            }
        }
    }

    function post_b(thing) {
        let right;
        if (relationop[thing.id]) {
            if (
                is_weird(thing.expression[0])
                || is_weird(thing.expression[1])
                || is_equal(thing.expression[0], thing.expression[1])
                || (
                    thing.expression[0].constant === true
                    && thing.expression[1].constant === true
                )
            ) {

// test_cause:
// ["if(0===0){0}", "post_b", "weird_relation_a", "===", 5]

                warn("weird_relation_a", thing);
            }
        }
        if (thing.id === "+") {
            if (!option_dict.convert) {
                if (thing.expression[0].value === "") {

// test_cause:
// ["\"\"+0", "post_b", "expected_a_b", "\"\" +", 3]

                    warn("expected_a_b", thing, "String(...)", "\"\" +");
                } else if (thing.expression[1].value === "") {

// test_cause:
// ["0+\"\"", "post_b", "expected_a_b", "+ \"\"", 2]

                    warn("expected_a_b", thing, "String(...)", "+ \"\"");
                }
            }
        } else if (thing.id === "[") {
            if (thing.expression[0].id === "window") {

// test_cause:
// ["aa=window[0]", "post_b", "weird_expression_a", "window[...]", 10]

                warn("weird_expression_a", thing, "window[...]");
            }
            if (thing.expression[0].id === "self") {

// test_cause:
// ["aa=self[0]", "post_b", "weird_expression_a", "self[...]", 8]

                warn("weird_expression_a", thing, "self[...]");
            }
        } else if (thing.id === "." || thing.id === "?.") {
            if (thing.expression.id === "RegExp") {

// test_cause:
// ["aa=RegExp.aa", "post_b", "weird_expression_a", ".", 10]

                warn("weird_expression_a", thing);
            }
        } else if (thing.id !== "=>" && thing.id !== "(") {
            right = thing.expression[1];
            if (
                (thing.id === "+" || thing.id === "-")
                && right.id === thing.id
                && right.arity === "unary"
                && !right.wrapped
            ) {

// test_cause:
// ["0- -0", "post_b", "wrap_unary", "-", 4]

                warn("wrap_unary", right);
            }
            if (
                thing.expression[0].constant === true
                && right.constant === true
            ) {
                thing.constant = true;
            }
        }
    }

    function post_b_and(thing) {
        if (
            is_weird(thing.expression[0])
            || is_equal(thing.expression[0], thing.expression[1])
            || thing.expression[0].constant === true
            || thing.expression[1].constant === true
        ) {

// test_cause:
// ["aa=(()=>0)&&(()=>0)", "post_b_and", "weird_condition_a", "&&", 11]
// ["aa=(``?``:``)&&(``?``:``)", "post_b_and", "weird_condition_a", "&&", 14]
// ["aa=/./&&/./", "post_b_and", "weird_condition_a", "&&", 7]
// ["aa=0&&0", "post_b_and", "weird_condition_a", "&&", 5]
// ["aa=[]&&[]", "post_b_and", "weird_condition_a", "&&", 6]
// ["aa=`${0}`&&`${0}`", "post_b_and", "weird_condition_a", "&&", 10]
// ["
// aa=function aa(){}&&function aa(){}
// ", "post_b_and", "weird_condition_a", "&&", 19]
// ["aa={}&&{}", "post_b_and", "weird_condition_a", "&&", 6]

            warn("weird_condition_a", thing);
        }
    }

    function post_b_lbracket(thing) {
        if (thing.expression[0].id === "RegExp") {

// test_cause:
// ["aa=RegExp[0]", "post_b_lbracket", "weird_expression_a", "[", 10]

            warn("weird_expression_a", thing);
        }
        if (is_weird(thing.expression[1])) {

// test_cause:
// ["aa[[0]]", "post_b_lbracket", "weird_expression_a", "[", 4]

            warn("weird_expression_a", thing.expression[1]);
        }
    }

    function post_b_lparen(thing) {
        let arg;
        let array;
        let cack;
        let left = thing.expression[0];
        let new_date;
        let paren;
        let the_new;
        if (left.id === "new") {
            the_new = left;
            left = left.expression;
        }
        if (left.id === "function") {
            if (!thing.wrapped) {

// test_cause:
// ["aa=function(){}()", "post_b_lparen", "wrap_immediate", "(", 16]

                warn("wrap_immediate", thing);
            }
        } else if (left.identifier) {
            if (the_new !== undefined) {
                if (
                    left.id[0] > "Z"
                    || left.id === "BigInt"
                    || left.id === "Boolean"
                    || left.id === "Number"
                    || left.id === "String"
                    || left.id === "Symbol"
                ) {

// test_cause:
// ["new BigInt()", "post_b_lparen", "unexpected_a", "new", 1]
// ["new Boolean()", "post_b_lparen", "unexpected_a", "new", 1]
// ["new Number()", "post_b_lparen", "unexpected_a", "new", 1]
// ["new String()", "post_b_lparen", "unexpected_a", "new", 1]
// ["new Symbol()", "post_b_lparen", "unexpected_a", "new", 1]
// ["new aa()", "post_b_lparen", "unexpected_a", "new", 1]

                    warn("unexpected_a", the_new);
                } else if (left.id === "Function") {
                    if (!option_dict.eval) {

// test_cause:
// ["new Function()", "post_b_lparen", "unexpected_a", "new Function", 5]

                        warn("unexpected_a", left, "new Function");
                    }
                } else if (left.id === "Array") {
                    arg = thing.expression;
                    if (arg.length !== 2 || arg[1].id === "(string)") {

// test_cause:
// ["new Array()", "post_b_lparen", "expected_a_b", "new Array", 5]

                        warn("expected_a_b", left, "[]", "new Array");
                    }
                } else if (left.id === "Object") {

// test_cause:
// ["new Object()", "post_b_lparen", "expected_a_b", "new Object", 5]

                    warn(
                        "expected_a_b",
                        left,
                        "Object.create(null)",
                        "new Object"
                    );
                }
            } else {
                if (
                    left.id[0] >= "A"
                    && left.id[0] <= "Z"
                    && left.id !== "BigInt"
                    && left.id !== "Boolean"
                    && left.id !== "Number"
                    && left.id !== "String"
                    && left.id !== "Symbol"
                ) {

// test_cause:
// ["let Aa=Aa()", "post_b_lparen", "expected_a_before_b", "Aa", 8]

                    warn("expected_a_before_b", left, "new", artifact(left));
                }
            }
        } else if (left.id === ".") {
            cack = the_new !== undefined;
            if (left.expression.id === "Date" && left.name.id === "UTC") {

// test_cause:
// ["new Date.UTC()", "post_b_lparen", "cack", "", 0]

                test_cause("cack");
                cack = !cack;
            }
            if (jslint_rgx_cap.test(left.name.id) !== cack) {
                if (the_new !== undefined) {

// test_cause:
// ["new Date.UTC()", "post_b_lparen", "unexpected_a", "new", 1]

                    warn("unexpected_a", the_new);
                } else {

// test_cause:
// ["let Aa=Aa.Aa()", "post_b_lparen", "expected_a_before_b", "Aa", 8]

                    warn(
                        "expected_a_before_b",
                        left.expression,
                        "new",
                        left.name.id
                    );
                }
            }
            if (left.name.id === "getTime") {
                paren = left.expression;
                if (paren.id === "(") {
                    array = paren.expression;
                    if (array.length === 1) {
                        new_date = array[0];
                        if (
                            new_date.id === "new"
                            && new_date.expression.id === "Date"
                        ) {

// test_cause:
// ["
// new Date().getTime()
// ", "post_b_lparen", "expected_a_b", "new Date().getTime()", 1]

                            warn(
                                "expected_a_b",
                                new_date,
                                "Date.now()",
                                "new Date().getTime()"
                            );
                        }
                    }
                }
            }
        }
    }

    function post_b_or(thing) {
        if (
            is_weird(thing.expression[0])
            || is_equal(thing.expression[0], thing.expression[1])
            || thing.expression[0].constant === true
        ) {

// test_cause:
// ["aa=0||0", "post_b_or", "weird_condition_a", "||", 5]

            warn("weird_condition_a", thing);
        }
    }

    function post_s_export(the_thing) {

// Some features must be at the most outermost level.

        if (blockage !== token_global) {

// test_cause:
// ["
// if(0){import aa from "aa";}
// ", "post_s_export", "misplaced_a", "import", 7]

            warn("misplaced_a", the_thing);
        }
    }

    function post_s_for(thing) {

// Recurse walk_statement().

        walk_statement(thing.inc);
    }

    function post_s_function(thing) {
        delete functionage.async;
        delete functionage.finally;
        delete functionage.loop;
        delete functionage.statement_prv;
        delete functionage.switch;
        delete functionage.try;
        functionage = function_stack.pop();
        if (thing.wrapped) {

// test_cause:
// ["aa=(function(){})", "post_s_function", "unexpected_parens", "function", 5]

            warn("unexpected_parens", thing);
        }
        return post_s_lbrace();
    }

    function post_s_import(the_thing) {
        const name = the_thing.name;
        if (name) {
            if (Array.isArray(name)) {
                name.forEach(function (name) {
                    name.dead = false;
                    name.init = true;
                    blockage.live.push(name);
                });
            } else {
                name.dead = false;
                name.init = true;
                blockage.live.push(name);
            }
            return post_s_export(the_thing);
        }
    }

    function post_s_lbrace() {
        blockage.live.forEach(function (name) {
            name.dead = true;
        });
        delete blockage.live;
        blockage = block_stack.pop();
    }

    function post_s_try(thing) {
        if (thing.catch) {
            if (thing.catch.name) {
                Object.assign(catchage.context[thing.catch.name.id], {
                    dead: false,
                    init: true
                });
            }

// Recurse walk_statement().

            walk_statement(thing.catch.block);

// Restore previous catch-scope after catch-block.

            catchage = catch_stack.pop();
        }
    }

    function post_s_var(thing) {
        thing.names.forEach(function (name) {
            name.dead = false;
            if (name.expression !== undefined) {
                walk_expression(name.expression);

// Probably deadcode.
// if (name.id === "{" || name.id === "[") {
//     name.names.forEach(subactivate);
// } else {
//     name.init = true;
// }

                jslint_assert(
                    !(name.id === "{" || name.id === "["),
                    `Expected !(name.id === "{" || name.id === "[").`
                );
                name.init = true;
            }
            blockage.live.push(name);
        });
    }

    function post_t(thing) {
        if (
            is_weird(thing.expression[0])
            || thing.expression[0].constant === true
            || is_equal(thing.expression[1], thing.expression[2])
        ) {

// test_cause:
// ["let aa=(aa?`${0}`:`${0}`);", "post_t", "unexpected_a", "?", 11]
// ["let aa=(aa?`0`:`0`);", "post_t", "unexpected_a", "?", 11]

            warn("unexpected_a", thing);
        } else if (is_equal(thing.expression[0], thing.expression[1])) {

// test_cause:
// ["aa?aa:0", "post_t", "expected_a_b", "?", 3]

            warn("expected_a_b", thing, "||", "?");
        } else if (is_equal(thing.expression[0], thing.expression[2])) {

// test_cause:
// ["aa?0:aa", "post_t", "expected_a_b", "?", 3]

            warn("expected_a_b", thing, "&&", "?");
        } else if (
            thing.expression[1].id === "true"
            && thing.expression[2].id === "false"
        ) {

// test_cause:
// ["aa?true:false", "post_t", "expected_a_b", "?", 3]

            warn("expected_a_b", thing, "!!", "?");
        } else if (
            thing.expression[1].id === "false"
            && thing.expression[2].id === "true"
        ) {

// test_cause:
// ["aa?false:true", "post_t", "expected_a_b", "?", 3]

            warn("expected_a_b", thing, "!", "?");
        } else if (
            thing.expression[0].wrapped !== true
            && (
                thing.expression[0].id === "||"
                || thing.expression[0].id === "&&"
            )
        ) {

// test_cause:
// ["(aa&&!aa?0:1)", "post_t", "wrap_condition", "&&", 4]

            warn("wrap_condition", thing.expression[0]);
        }
    }

    function post_u(thing) {
        if (thing.id === "`") {
            if (thing.expression.every(function (thing) {
                return thing.constant;
            })) {
                thing.constant = true;
            }
        } else if (thing.id === "!") {
            if (thing.expression.constant === true) {
                warn("unexpected_a", thing);
            }
        } else if (thing.id === "!!") {
            if (!option_dict.convert) {

// test_cause:
// ["!!0", "post_u", "expected_a_b", "!!", 1]

                warn("expected_a_b", thing, "Boolean(...)", "!!");
            }
        } else if (
            thing.id !== "["
            && thing.id !== "{"
            && thing.id !== "function"
            && thing.id !== "new"
        ) {
            if (thing.expression.constant === true) {
                thing.constant = true;
            }
        }
    }

    function post_u_plus(thing) {
        const right = thing.expression;
        if (!option_dict.convert) {

// test_cause:
// ["aa=+0", "post_u_plus", "expected_a_b", "+", 4]

            warn("expected_a_b", thing, "Number(...)", "+");
        }
        if (right.id === "(" && right.expression[0].id === "new") {
            warn("unexpected_a_before_b", thing, "+", "new");
        } else if (
            right.constant
            || right.id === "{"
            || (right.id === "[" && right.arity !== "binary")
        ) {
            warn("unexpected_a", thing, "+");
        }
    }

    function pre_a_bitwise(thing) {

// These are the bitwise operators.

        switch (!option_dict.bitwise && thing.id) {
        case "&":
        case "&=":
        case "<<":
        case "<<=":
        case ">>":
        case ">>=":
        case ">>>":
        case ">>>=":
        case "^":
        case "^=":
        case "|":
        case "|=":
        case "~":

// test_cause:
// ["0&0", "pre_a_bitwise", "unexpected_a", "&", 2]
// ["0&=0", "pre_a_bitwise", "unexpected_a", "&=", 2]
// ["0<<0", "pre_a_bitwise", "unexpected_a", "<<", 2]
// ["0<<=0", "pre_a_bitwise", "unexpected_a", "<<=", 2]
// ["0>>0", "pre_a_bitwise", "unexpected_a", ">>", 2]
// ["0>>=0", "pre_a_bitwise", "unexpected_a", ">>=", 2]
// ["0>>>0", "pre_a_bitwise", "unexpected_a", ">>>", 2]
// ["0>>>=0", "pre_a_bitwise", "unexpected_a", ">>>=", 2]
// ["0^0", "pre_a_bitwise", "unexpected_a", "^", 2]
// ["0^=0", "pre_a_bitwise", "unexpected_a", "^=", 2]
// ["0|0", "pre_a_bitwise", "unexpected_a", "|", 2]
// ["0|=0", "pre_a_bitwise", "unexpected_a", "|=", 2]
// ["~0", "pre_a_bitwise", "unexpected_a", "~", 1]

            warn("unexpected_a", thing);
            break;
        }
        if (
            thing.id !== "("
            && thing.id !== "&&"
            && thing.id !== "||"
            && thing.id !== "="
            && Array.isArray(thing.expression)
            && thing.expression.length === 2
            && (
                relationop[thing.expression[0].id] === true
                || relationop[thing.expression[1].id] === true
            )
        ) {

// test_cause:
// ["0<0<0", "pre_a_bitwise", "unexpected_a", "<", 4]

            warn("unexpected_a", thing);
        }
    }

    function pre_b(thing) {
        let left;
        let right;
        let value;
        if (relationop[thing.id] === true) {
            left = thing.expression[0];
            right = thing.expression[1];
            if (left.id === "NaN" || right.id === "NaN") {

// test_cause:
// ["NaN===NaN", "pre_b", "number_isNaN", "===", 4]

                warn("number_isNaN", thing);
            } else if (left.id === "typeof") {
                if (right.id !== "(string)") {
                    if (right.id !== "typeof") {

// test_cause:
// ["typeof 0===0", "pre_b", "expected_string_a", "0", 12]

                        warn("expected_string_a", right);
                    }
                } else {
                    value = right.value;
                    if (value === "null" || value === "undefined") {

// test_cause:
// ["
// typeof aa==="undefined"
// ", "pre_b", "unexpected_typeof_a", "undefined", 13]

                        warn("unexpected_typeof_a", right, value);
                    } else if (
                        value !== "bigint"
                        && value !== "boolean"
                        && value !== "function"
                        && value !== "number"
                        && value !== "object"
                        && value !== "string"
                        && value !== "symbol"
                    ) {

// test_cause:
// ["typeof 0===\"aa\"", "pre_b", "expected_type_string_a", "aa", 12]

                        warn("expected_type_string_a", right, value);
                    }
                }
            }
        }
    }

    function pre_b_eqeq(thing) {

// test_cause:
// ["0==0", "pre_b_eqeq", "expected_a_b", "==", 2]

        warn("expected_a_b", thing, "===", "==");
    }

    function pre_b_in(thing) {

// test_cause:
// ["aa in aa", "pre_b_in", "infix_in", "in", 4]

        warn("infix_in", thing);
    }

    function pre_b_instanceof(thing) {

// test_cause:
// ["0 instanceof 0", "pre_b_instanceof", "unexpected_a", "instanceof", 3]

        warn("unexpected_a", thing);
    }

    function pre_b_lparen(thing) {
        const left = thing.expression[0];
        let left_variable;
        let parent;
        if (
            left.identifier
            && functionage.context[left.id] === undefined
            && typeof functionage.name === "object"
        ) {
            parent = functionage.name.parent;
            if (parent) {
                left_variable = parent.context[left.id];
                if (
                    left_variable !== undefined

// Probably deadcode.
// && left_variable.dead

                    && left_variable.parent === parent
                    && left_variable.calls !== undefined
                    && left_variable.calls[functionage.name.id] !== undefined
                ) {
                    left_variable.dead = false;
                }
            }
        }
    }

    function pre_b_noteq(thing) {

// test_cause:
// ["0!=0", "pre_b_noteq", "expected_a_b", "!=", 2]

        warn("expected_a_b", thing, "!==", "!=");
    }

    function pre_b_or(thing) {
        thing.expression.forEach(function (thang) {
            if (thang.id === "&&" && !thang.wrapped) {

// test_cause:
// ["0&&0||0", "pre_b_or", "and", "&&", 2]

                warn("and", thang);
            }
        });
    }

    function pre_s_for(thing) {
        let the_variable;
        if (thing.name !== undefined) {
            thing.name.dead = false;
            the_variable = lookup(thing.name);
            if (the_variable !== undefined) {
                if (the_variable.init && the_variable.readonly) {

// test_cause:
// ["const aa=0;for(aa in aa){}", "pre_s_for", "bad_assignment_a", "aa", 16]

                    warn("bad_assignment_a", thing.name);
                }
                the_variable.init = true;
            }
        }

// Recurse walk_statement().

        walk_statement(thing.initial);
    }

    function pre_s_function(thing) {

// test_cause:
// ["()=>0", "pre_s_function", "", "", 0]
// ["(function (){}())", "pre_s_function", "", "", 0]
// ["function aa(){}", "pre_s_function", "", "", 0]

        test_cause("");
        if (thing.arity === "statement" && blockage.body !== true) {

// test_cause:
// ["if(0){function aa(){}\n}", "pre_s_function", "unexpected_a", "function", 7]

            warn("unexpected_a", thing);
        }
        function_stack.push(functionage);
        block_stack.push(blockage);
        functionage = thing;
        blockage = thing;
        thing.live = [];
        if (typeof thing.name === "object") {
            thing.name.dead = false;
            thing.name.init = true;
        }
        if (thing.extra === "get") {
            if (thing.parameters.length !== 0) {

// test_cause:
// ["
// /*jslint getset*/
// aa={get aa(aa){}}
// ", "pre_s_function", "bad_get", "function", 9]

                warn("bad_get", thing);
            }
        } else if (thing.extra === "set") {
            if (thing.parameters.length !== 1) {

// test_cause:
// ["
// /*jslint getset*/
// aa={set aa(){}}
// ", "pre_s_function", "bad_set", "function", 9]

                warn("bad_set", thing);
            }
        }
        thing.parameters.forEach(function (name) {
            walk_expression(name.expression);
            if (name.id === "{" || name.id === "[") {
                name.names.forEach(subactivate);
            } else {
                name.dead = false;
                name.init = true;
            }
        });
    }

    function pre_s_lbrace(thing) {
        block_stack.push(blockage);
        blockage = thing;
        thing.live = [];
    }

    function pre_try(thing) {
        if (thing.catch !== undefined) {

// Create new catch-scope for catch-parameter.

            catch_stack.push(catchage);
            catchage = thing.catch;
        }
    }

    function pre_v(thing) {
        const the_variable = lookup(thing);
        if (the_variable !== undefined) {
            thing.variable = the_variable;
            the_variable.used += 1;
        }
    }

    function subactivate(name) {
        name.init = true;
        name.dead = false;
        blockage.live.push(name);
    }

    function walk_expression(thing) {
        if (thing) {
            if (Array.isArray(thing)) {

// test_cause:
// ["(function(){}())", "walk_expression", "isArray", "", 0]
// ["0&&0", "walk_expression", "isArray", "", 0]

                test_cause("isArray");
                thing.forEach(walk_expression);
            } else {
                preamble(thing);
                walk_expression(thing.expression);

// PR-414 - Bugfix - fix fart-body not being walked.

                if (thing.id === "function" || thing.id === "=>") {

// test_cause:
// ["aa=()=>0", "walk_expression", "function", "=>", 0]
// ["aa=function(){}", "walk_expression", "function", "function", 0]

                    test_cause("function", thing.id);

// Recurse walk_statement().

                    walk_statement(thing.block);
                }
                if (
                    thing.arity === "preassign" || thing.arity === "postassign"
                ) {

// test_cause:
// ["aa=++aa", "walk_expression", "unexpected_a", "++", 4]
// ["aa=--aa", "walk_expression", "unexpected_a", "--", 4]

                    warn("unexpected_a", thing);
                } else if (
                    thing.arity === "statement"
                    || thing.arity === "assignment"
                ) {

// test_cause:
// ["aa[aa=0]", "walk_expression", "unexpected_statement_a", "=", 6]

                    warn("unexpected_statement_a", thing);
                }

// test_cause:
// ["aa=0", "walk_expression", "default", "", 0]

                test_cause("default");
                postamble(thing);
            }
        }
    }

    function walk_statement(thing) {
        if (!thing) {
            return;
        }
        if (Array.isArray(thing)) {

// test_cause:
// ["+[]", "walk_statement", "isArray", "", 0]

            test_cause("isArray");

// Recurse walk_statement().

            thing.forEach(walk_statement);
            return;
        }
        preamble(thing);
        walk_expression(thing.expression);
        if (thing.arity === "binary") {
            if (thing.id !== "(") {

// test_cause:
// ["0&&0", "walk_statement", "unexpected_expression_a", "&&", 2]

                warn("unexpected_expression_a", thing);
            }
        } else if (
            thing.arity !== "statement"
            && thing.arity !== "assignment"
            && thing.id !== "import"
        ) {

// test_cause:
// ["!0", "walk_statement", "unexpected_expression_a", "!", 1]
// ["+[]", "walk_statement", "unexpected_expression_a", "+", 1]
// ["+new aa()", "walk_statement", "unexpected_expression_a", "+", 1]
// ["0", "walk_statement", "unexpected_expression_a", "0", 1]
// ["typeof 0", "walk_statement", "unexpected_expression_a", "typeof", 1]

            warn("unexpected_expression_a", thing);
        }

// Recurse walk_statement().

        walk_statement(thing.block);
        walk_statement(thing.else);
        postamble(thing);
    }

    postaction = action(posts);
    postamble = amble(posts);
    preaction = action(pres);
    preamble = amble(pres);
    postaction("assignment", "+=", post_a_pluseq);
    postaction("assignment", post_a);
    postaction("binary", "&&", post_b_and);
    postaction("binary", "(", post_b_lparen);
    postaction("binary", "=>", post_s_function);
    postaction("binary", "[", post_b_lbracket);
    postaction("binary", "||", post_b_or);
    postaction("binary", post_b);
    postaction("statement", "const", post_s_var);
    postaction("statement", "export", post_s_export);
    postaction("statement", "for", post_s_for);
    postaction("statement", "function", post_s_function);
    postaction("statement", "import", post_s_import);
    postaction("statement", "let", post_s_var);
    postaction("statement", "try", post_s_try);
    postaction("statement", "var", post_s_var);
    postaction("statement", "{", post_s_lbrace);
    postaction("ternary", post_t);
    postaction("unary", "+", post_u_plus);
    postaction("unary", "function", post_s_function);
    postaction("unary", post_u);
    preaction("assignment", pre_a_bitwise);
    preaction("binary", "!=", pre_b_noteq);
    preaction("binary", "(", pre_b_lparen);
    preaction("binary", "==", pre_b_eqeq);
    preaction("binary", "=>", pre_s_function);
    preaction("binary", "in", pre_b_in);
    preaction("binary", "instanceof", pre_b_instanceof);
    preaction("binary", "||", pre_b_or);
    preaction("binary", pre_b);
    preaction("binary", pre_a_bitwise);
    preaction("statement", "for", pre_s_for);
    preaction("statement", "function", pre_s_function);
    preaction("statement", "try", pre_try);
    preaction("statement", "{", pre_s_lbrace);
    preaction("unary", "function", pre_s_function);
    preaction("unary", "~", pre_a_bitwise);
    preaction("variable", pre_v);

    walk_statement(state.token_tree);
}

function jslint_phase5_whitage(state) {

// PHASE 5. Check whitespace between tokens in <token_list>.

    let {
        artifact,
        catch_list,
        function_list,
        function_stack,
        option_dict,
        test_cause,
        token_global,
        token_list,
        warn
    } = state;
    let closer = "(end)";
    let free = false;

// free = false

// cause:
// "()=>0"
// "aa()"
// "aa(0,0)"
// "function(){}"

// free = true

// cause:
// "(0)"
// "(aa)"
// "aa(0)"
// "do{}while()"
// "for(){}"
// "if(){}"
// "switch(){}"
// "while(){}"

    let left = token_global;
    let margin = 0;
    let mode_indent = (

// PR-330 - Allow 2-space indent.

        option_dict.indent2
        ? 2
        : 4
    );
    let nr_comments_skipped = 0;
    let open = true;
    let opening = true;
    let right;

// This is the set of infix operators that require a space on each side.

    let spaceop = object_assign_from_list(empty(), [
        "!=", "!==", "%", "%=", "&", "&&", "&=", "*", "*=", "+=", "-=", "/",
        "/=", "<", "<<", "<<=", "<=", "=", "==", "===", "=>", ">", ">=", ">>",
        ">>=", ">>>", ">>>=", "^", "^=", "|", "|=", "||"
    ], true);

    function at_margin(fit) {
        const at = margin + fit;
        if (right.from !== at) {
            return expected_at(at);
        }
    }

    function delve(the_function) {
        Object.keys(the_function.context).forEach(function (id) {
            const name = the_function.context[id];
            if (id !== "ignore" && name.parent === the_function) {

// test_cause:
// ["function aa(aa) {return aa;}", "delve", "id", "", 0]

                test_cause("id");
                if (
                    name.used === 0

// Probably deadcode.
// && (
//     name.role !== "function"
//     || name.parent.arity !== "unary"
// )

                    && jslint_assert(
                        name.role !== "function",
                        `Expected name.role !== "function".`
                    )
                ) {

// test_cause:
// ["/*jslint node*/\nlet aa;", "delve", "unused_a", "aa", 5]
// ["function aa(aa){return;}", "delve", "unused_a", "aa", 13]
// ["let aa=0;try{aa();}catch(bb){aa();}", "delve", "unused_a", "bb", 26]

                    warn("unused_a", name);
                } else if (!name.init) {

// test_cause:
// ["/*jslint node*/\nlet aa;aa();", "delve", "uninitialized_a", "aa", 5]

                    warn("uninitialized_a", name);
                }
            }
        });
    }

    function expected_at(at) {

// Probably deadcode.
// if (right === undefined) {
//     right = token_nxt;
// }

        jslint_assert(
            !(right === undefined),
            `Expected !(right === undefined).`
        );
        warn(
            "expected_a_at_b_c",
            right,
            artifact(right),

// Fudge column numbers in warning message.

            at + jslint_fudge,
            right.from + jslint_fudge
        );
    }

    function no_space() {
        if (left.line === right.line) {

// from:
// if (left.line === right.line) {
//     no_space();
// } else {

            if (left.thru !== right.from && nr_comments_skipped === 0) {

// test_cause:
// ["let aa = aa( );", "no_space", "unexpected_space_a_b", ")", 14]

                warn(
                    "unexpected_space_a_b",
                    right,
                    artifact(left),
                    artifact(right)
                );
            }
        } else {

// from:
// } else if (
//     right.arity === "binary"
//     && right.id === "("
//     && free
// ) {
//     no_space();
// } else if (

// Probably deadcode.
// if (open) {
//     const at = (
//         free
//         ? margin
//         : margin + 8
//     );
//     if (right.from < at) {
//         expected_at(at);
//     }
// } else {
//     if (right.from !== margin + 8) {
//         expected_at(margin + 8);
//     }
// }

            jslint_assert(open, `Expected open.`);
            jslint_assert(free, `Expected free.`);
            if (right.from < margin) {

// test_cause:
// ["let aa = aa(\naa\n()\n);", "expected_at", "expected_a_at_b_c", "5", 1]

                expected_at(margin);
            }
        }
    }

    function no_space_only() {
        if (
            left.id !== "(global)"
            && left.nr + 1 === right.nr
            && (
                left.line !== right.line
                || left.thru !== right.from
            )
        ) {
            warn(
                "unexpected_space_a_b",
                right,
                artifact(left),
                artifact(right)
            );
        }
    }

    function one_space() {
        if (left.line === right.line || !open) {
            if (left.thru + 1 !== right.from && nr_comments_skipped === 0) {
                warn(
                    "expected_space_a_b",
                    right,
                    artifact(left),
                    artifact(right)
                );
            }
        } else {
            if (right.from !== margin) {
                expected_at(margin);
            }
        }
    }

    function one_space_only() {
        if (left.line !== right.line || left.thru + 1 !== right.from) {
            warn("expected_space_a_b", right, artifact(left), artifact(right));
        }
    }

    function pop() {
        const previous = function_stack.pop();
        closer = previous.closer;
        free = previous.free;
        margin = previous.margin;
        open = previous.open;
        opening = previous.opening;
    }

    function push() {
        function_stack.push({
            closer,
            free,
            margin,
            open,
            opening
        });
    }

// uninitialized_and_unused();
// Delve into the functions looking for variables that were not initialized
// or used. If the file imports or exports, then its global object is also
// delved.

    if (state.mode_module === true || option_dict.node) {
        delve(token_global);
    }
    catch_list.forEach(delve);
    function_list.forEach(delve);

    if (option_dict.white) {
        return;
    }

// whitage();
// Go through the token list, looking at usage of whitespace.

    token_list.forEach(function whitage(the_token) {
        right = the_token;
        if (right.id === "(comment)" || right.id === "(end)") {
            nr_comments_skipped += 1;
        } else {

// If left is an opener and right is not the closer, then push the previous
// state. If the token following the opener is on the next line, then this is
// an open form. If the tokens are on the same line, then it is a closed form.
// Open form is more readable, with each item (statement, argument, parameter,
// etc) starting on its own line. Closed form is more compact. Statement blocks
// are always in open form.

// The open and close pairs.

            switch (left.id) {
            case "${":
            case "(":
            case "[":
            case "{":

// test_cause:
// ["let aa=[];", "whitage", "opener", "", 0]
// ["let aa=`${0}`;", "whitage", "opener", "", 0]
// ["let aa=aa();", "whitage", "opener", "", 0]
// ["let aa={};", "whitage", "opener", "", 0]

                test_cause("opener");

// Probably deadcode.
// case "${}":

                jslint_assert(
                    !(left.id + right.id === "${}"),
                    "Expected !(left.id + right.id === \"${}\")."
                );
                switch (left.id + right.id) {
                case "()":
                case "[]":
                case "{}":

// If left and right are opener and closer, then the placement of right depends
// on the openness. Illegal pairs (like '{]') have already been detected.

// test_cause:
// ["let aa=[];", "whitage", "opener_closer", "", 0]
// ["let aa=aa();", "whitage", "opener_closer", "", 0]
// ["let aa={};", "whitage", "opener_closer", "", 0]

                    test_cause("opener_closer");
                    if (left.line === right.line) {

// test_cause:
// ["let aa = aa( );", "no_space", "unexpected_space_a_b", ")", 14]

                        no_space();
                    } else {

// test_cause:
// ["let aa = aa(\n );", "expected_at", "expected_a_at_b_c", "1", 2]

                        at_margin(0);
                    }
                    break;
                default:

// test_cause:
// ["let aa=(0);", "whitage", "opener_operand", "", 0]
// ["let aa=[0];", "whitage", "opener_operand", "", 0]
// ["let aa=`${0}`;", "whitage", "opener_operand", "", 0]
// ["let aa=aa(0);", "whitage", "opener_operand", "", 0]
// ["let aa={aa:0};", "whitage", "opener_operand", "", 0]

                    test_cause("opener_operand");
                    opening = left.open || (left.line !== right.line);
                    push();
                    switch (left.id) {
                    case "${":
                        closer = "}";
                        break;
                    case "(":
                        closer = ")";
                        break;
                    case "[":
                        closer = "]";
                        break;
                    case "{":
                        closer = "}";
                        break;
                    }
                    if (opening) {

// test_cause:
// ["function aa(){\nreturn;\n}", "whitage", "opening", "", 0]
// ["let aa=(\n0\n);", "whitage", "opening", "", 0]
// ["let aa=[\n0\n];", "whitage", "opening", "", 0]
// ["let aa=`${\n0\n}`;", "whitage", "opening", "", 0]
// ["let aa={\naa:0\n};", "whitage", "opening", "", 0]

                        test_cause("opening");
                        free = closer === ")" && left.free;
                        open = true;
                        margin += mode_indent;
                        if (right.role === "label") {
                            if (right.from !== 0) {

// test_cause:
// ["
// function aa() {
//  bb:
//     while (aa) {
//         if (aa) {
//             break bb;
//         }
//     }
// }
// ", "expected_at", "expected_a_at_b_c", "1", 2]

                                expected_at(0);
                            }
                        } else if (right.switch) {
                            at_margin(-mode_indent);
                        } else {
                            at_margin(0);
                        }
                    } else {
                        if (right.statement || right.role === "label") {

// test_cause:
// ["
// function aa() {bb:
//     while (aa) {
//         aa();
//     }
// }
// ", "whitage", "expected_line_break_a_b", "bb", 16]

                            warn(
                                "expected_line_break_a_b",
                                right,
                                artifact(left),
                                artifact(right)
                            );
                        }

// test_cause:
// ["let aa=(0);", "whitage", "not_free", "", 0]
// ["let aa=[0];", "whitage", "not_free", "", 0]
// ["let aa=`${0}`;", "whitage", "not_free", "", 0]
// ["let aa={aa:0};", "whitage", "not_free", "", 0]

                        test_cause("not_free");
                        free = false;
                        open = false;

// test_cause:
// ["let aa = ( 0 );", "no_space_only", "unexpected_space_a_b", "0", 12]

                        no_space_only();
                    }
                }
                break;
            default:
                if (right.statement === true) {
                    if (left.id === "else") {

// test_cause:
// ["
// let aa = 0;
// if (aa) {
//     aa();
// } else  if (aa) {
//     aa();
// }
// ", "one_space_only", "expected_space_a_b", "if", 9]

                        one_space_only();
                    } else {

// test_cause:
// [" let aa = 0;", "expected_at", "expected_a_at_b_c", "1", 2]

                        at_margin(0);
                        open = false;
                    }

// If right is a closer, then pop the previous state.

                } else if (right.id === closer) {
                    pop();
                    if (opening && right.id !== ";") {
                        at_margin(0);
                    } else {
                        no_space_only();
                    }
                } else {

// Left is not an opener, and right is not a closer.
// The nature of left and right will determine the space between them.

// If left is ',' or ';' or right is a statement then if open,
// right must go at the margin, or if closed, a space between.

                    if (right.switch) {
                        at_margin(-mode_indent);
                    } else if (right.role === "label") {
                        if (right.from !== 0) {

// test_cause:
// ["
// function aa() {
//     aa();cc:
//     while (aa) {
//         if (aa) {
//             break cc;
//         }
//     }
// }
// ", "expected_at", "expected_a_at_b_c", "1", 10]

                            expected_at(0);
                        }
                    } else if (left.id === ",") {
                        if (!open || (
                            (free || closer === "]")
                            && left.line === right.line
                        )) {

// test_cause:
// ["let {aa,bb} = 0;", "one_space", "expected_space_a_b", "bb", 9]

                            one_space();
                        } else {

// test_cause:
// ["
// function aa() {
//     aa(
//         0,0
//     );
// }
// ", "expected_at", "expected_a_at_b_c", "9", 11]

                            at_margin(0);
                        }

// If right is a ternary operator, line it up on the margin.

                    } else if (right.arity === "ternary") {
                        if (open) {

// test_cause:
// ["
// let aa = (
//     aa
//     ? 0
// : 1
// );
// ", "expected_at", "expected_a_at_b_c", "5", 1]

                            at_margin(0);
                        } else {

// test_cause:
// ["let aa = (aa ? 0 : 1);", "whitage", "use_open", "?", 14]

                            warn("use_open", right);
                        }
                    } else if (
                        right.arity === "binary"
                        && right.id === "("
                        && free
                    ) {

// test_cause:
// ["let aa = aa(\naa ()\n);", "no_space", "unexpected_space_a_b", "(", 4]

                        no_space();
                    } else if (
                        left.id === "."
                        || left.id === "?."
                        || left.id === "..."
                        || right.id === ","
                        || right.id === ";"
                        || right.id === ":"
                        || (
                            right.arity === "binary"
                            && (right.id === "(" || right.id === "[")
                        )
                        || (
                            right.arity === "function"
                            && left.id !== "function"
                        )
                        || (right.id === "." || right.id === "?.")
                    ) {

// test_cause:
// ["let aa = 0 ;", "no_space_only", "unexpected_space_a_b", ";", 12]
// ["let aa = aa ?.aa;", "no_space_only", "unexpected_space_a_b", "?.", 13]

                        no_space_only();
                    } else if (left.id === ";") {

// test_cause:
// ["
// /*jslint for*/
// function aa() {
//     for (
//         aa();
// aa;
//         aa()
//     ) {
//         aa();
//     }
// }
// ", "expected_at", "expected_a_at_b_c", "9", 1]

                        if (open) {
                            at_margin(0);
                        }
                    } else if (
                        left.arity === "ternary"
                        || left.id === "case"
                        || left.id === "catch"
                        || left.id === "else"
                        || left.id === "finally"
                        || left.id === "while"
                        || left.id === "await"
                        || right.id === "catch"
                        || right.id === "else"
                        || right.id === "finally"
                        || (right.id === "while" && !right.statement)
                        || (left.id === ")" && right.id === "{")
                    ) {

// test_cause:
// ["
// function aa() {
//     do {
//         aa();
//     } while(aa());
// }
// ", "one_space_only", "expected_space_a_b", "(", 12]

                        one_space_only();
                    } else if (

// There is a space between left and right.

                        spaceop[left.id] === true
                        || spaceop[right.id] === true
                        || (
                            left.arity === "binary"
                            && (left.id === "+" || left.id === "-")
                        )
                        || (
                            right.arity === "binary"
                            && (right.id === "+" || right.id === "-")
                        )
                        || left.id === "function"
                        || left.id === ":"
                        || left.id === "async"
                        || (
                            (
                                left.identifier
                                || left.id === "(string)"
                                || left.id === "(number)"
                            )
                            && (
                                right.identifier
                                || right.id === "(string)"
                                || right.id === "(number)"
                            )
                        )
                        || (left.arity === "statement" && right.id !== ";")
                    ) {

// test_cause:
// ["let aa=0;", "one_space", "expected_space_a_b", "0", 8]
// ["let aa={\naa:\n0\n};", "expected_at", "expected_a_at_b_c", "5", 1]

                        one_space();
                    } else if (left.arity === "unary" && left.id !== "`") {
                        no_space_only();
                    }
                }
            }
            nr_comments_skipped = 0;
            delete left.calls;
            delete left.dead;
            delete left.free;
            delete left.init;
            delete left.open;
            delete left.used;
            left = right;
        }
    });
}

function jslint_report({
    exports,
    froms,
    functions,
    global,
    json,
    module,
    property,
    stop,
    warnings
}) {

// This function will create human-readable, html-report
// for warnings, properties, and functions from jslint-result-object.
//
// Example usage:
//  let result = jslint("console.log('hello world')");
//  let html = jslint_report(result);

    let html = "";
    let length_80 = 1111;

    function address(line = 1, column = 1) {

// This function will create HTML address element from <line> and <column>

        return `<address>${Number(line)}: ${Number(column)}</address>`;

    }

    function detail(title, list) {
        return (
            (Array.isArray(list) && list.length > 0)
            ? (

// Google Lighthouse Accessibility - <dl>'s do not contain only properly-ordered
// <dt> and <dd> groups, <script>, <template> or <div> elements.

                "<dl>"
                + "<dt>" + htmlEscape(title) + "</dt>"
                + "<dd>" + list.join(", ") + "</dd>"
                + "</dl>"
            )
            : ""
        );
    }

    html += String(`
<style class="JSLINT_REPORT_STYLE">
/* jslint utility2:true */
/*csslint box-model: false, ids:false */
/*csslint ignore:start*/
@font-face {
    font-display: swap;
    font-family: "Daley";
    src: url(
"data:font/woff2;base64,d09GMgABAAAAABy4AA4AAAAAThwAABxiAAEAAAAAAAAAAAAA\
AAAAAAAAAAAAAAAABmAAgiQINAmcDBEICuc41DEBNgIkA4R2C4I+AAQgBYkuByAMgScfYUIF\
7NgjsHGAbcDVFkXZ5Jwd+P96IGPc9rl9ETBEaCzCJkvY2UpziRZ7zftZWk8052U9+NqX6vXL\
KDflSQnlJ0bP+QnPQAy744n9mup6H9PaCDFwM5zjf8exB89bZ1cdrYOP0NgnuRDRWlk9u/fE\
llkxqmfH8lmRQ/DAmER9opk9wR6suc1LvTiXNEe1vbhUCH2USgnEwH3vUm05JQqejGvZvOtz\
7sIKEGgLdDNl/IrfqWVZG/wr42ekomEm91VA1p4LhHBuFzHF8//u7vvbREHMQqGtNLmiOOD/\
X7WWiwqyCE98qt0jk5JJmgR5WJJElBmzRb1F7a66MmSLTNWZ2XSHfKBSKHoVteSEJ6EOdvVw\
fNZOtXKDe39jXdRlkmMnOWIOFBgeEK/b0mFsgffnPyyAitNyutKky7J8a8MSEkAKGLgfptnS\
/gDRSo7vwdNUmQDB7oP6pK7QF5d9SrY8M/tkrXcurSIQAmX7tz7pd33LIB7GQkBQ/k81s/0D\
gpt4gbw7x0Cn/PocitK5KIGPGQIzQzAMuCeC2ERAidx9TySVqX06goT0SFFOOV9Kuxdi5Rg7\
l6n3c+nKRemidOm2dtFV1jXMk4rP2m6RJ8xEdPYONLTbeMgaJ1nwS2W4su3MHwqkkvJ2PdDU\
r7pgAnVRt4Kh789FXlD0r3p6jUtNO19O1s74U9pnIxqFpw+mBgF+8y30PAyw1dzlknLLVcSB\
J2OuCr9eV5Efew6cOGd47ZEfhrW7HXI+FBNFvWgWnugUU4UvlrV63niv2ZPeKu8M76y/HQaG\
weU+4Gzp+Y+cfb9R9djDWcd1Svr1xG7l+j/yf3eM996548qlC+dOzOqQ8//Lo0uaSEQCFuLD\
/bXyWhJ6aPmyaRonVPxGABFL4/0slcKI6f+PmT0M+QRsplmWnv4F49VT+JsPifoa6aeyr2Hz\
EeLdP1FEOV/ZN+c9sAuoNh0BRS0xgCCc9wME5s0HOKj/wc0fWYsTbFQpsZL5SayJPkL45kDo\
DcJJ10MvD0ZSq7FEIr1TfqZ7NC6s75zSp8viaNO5/PczYCV9z6NTa0KBdnGBg6kbdeBkRLfU\
qRd3D9Pqw5jWCc5WM/i95OE8731MBd1u2EmsXIa5dCvavY32U1Ytza4nfbERg6OVRZka7jq0\
r2FcXNDyEhXheaHtaU1o1kvO9MuBOHqugLUEzN+4jznu0oK9wZPur1lWVFfxl8lZzn2XwcjZ\
Csg/RJy0mAMMmgnqXS8ELhOCRUSLzvsM5gAPudEh2lVoRxGgyUVnArZMruE0YS1PqFMD3upb\
jVoecGj1KpWl6/ZysuyzkG4SGA4bps6FBQSg4e4IxNUgdmosmoDn0TpIex/s1BFau6GBNO4z\
cvWXypm4hEg5k3llelySFqNmUtRZ3PHBA7p4MBX1nK4awwAV6kWzIVbUA67A55QKYbMsgVaH\
c1ZxKuZ0DCyqxCsJjLyCEY36gf0wjAu3t0zemc87PmBCJbU9Lso0YAaYJUx8wsR02hYz5hGy\
Js0+A4uHGZgfuf5SOR9iBQuLhpOExaIFrHj6JlXanebzGHp2ELDh6av09PVE1fmdsj2oHRWs\
fOtYrV6wRCyx7XogHqvpnZiPBBdNcL6kIoS9UI/DOIlumlveSgv9oqMBYp7WZ2fGxAXmZmaG\
OCyJG6+wAszZFCQw/EXVjx+YA2uVyN6bhNWiZhgtYjAwR5U/7uV1scghiTGiAPZbA5ZqHw5u\
Yu1cDjhRwREBFyq2wa0R8GgceDUKPo2BX+MhoAkQ1EQIaZqVHMwH3xM+P32TTA34tmOMNZ4n\
mHXqn49fmE3qX1+wMNYoYetOsPx6wxKzkURImERJIjGSSJwkkiCJJEkiKZJImiSSIYlkSYqK\
UBu0UOopuLMmasiJW0PMFOO2UgbDif2NaQUqkBbyaGjdTUvuyamEQwCq9DWsxsG9qPt+VFqV\
6cIsXcyWujWIEtNFdeia9ssNrJUpe3IDMPQZOReC8x+qvt17drPWdcHeL0gTarWwoQ6o828o\
0EJzrA20yZsgVyVHdlCJOF3NaACxHbP38TA+MGx3St9c5t2CxbGtunB4J9AF4Px2rSr1wyK9\
9KoXBR13vw9Fk9qhTX0ivZoanrvhLa5oiJO8cqR0lX7QtJ2c1a62V3PMtutaaoit+hxtXuC5\
ZUXJePSR6btQlt5g7PqPQ822g7F8D123pc4kaGXz7qYztJxDXCxJr7foKqxwy4rikI/NvINx\
bkArRTTnnMWy6YA8J39LfTweThKsqlt7Mz078NDSOPOGgtGTpeG8ZRBF+xKBjdSoNe8gE6uC\
ucOH98jE4+cv1JEjI555TFjYj4+0KdFlojzJGWp2wc1tCaYGSeO8dBfT0u3lpDY3tazzu4wn\
lF9wzy2nK+sTr/qEVdANoZ0ToBdD+MY4ewOHNnkXPBvKVXLSbEGfGVD0Nzr0Fs3HID3Y1Kqx\
mzJ6p1C1/R6Xneyw/q9YRDLahbnsI1u76XzMLPqsK0yvQDeQ4TMR41709sIssmEgs0XH1lcj\
7HLnUG6u2Xpy5vbOowIGqrR6cwF0TLGI5PF7pkbzIVYQU0sIaoNgul3LGAH2B1nREFYXUMia\
prCeAzggGxrC5gIK2dK0exs/AIRKdlIIuxkUspdSsU+rqXagqXaooXakqTiWS/a0E7zA6QIK\
OdMUznMAh+RCQ7hcQCFXmspr3ciuds/6gPsZFPIgpfJhwUIepRAeZ1DIk5Tue4oKfSfKZyNV\
pKU/J7J4Abx1EMV5mXSRDl6lMfU6jfBmBww4k7f6gLzTB+J9od/kA/uGj2mET2nkn7+zQ/JF\
H5Kv+pB804fkOyvwI43wM438V5sdkd/6iPzRR+SvPiL/WIH/aYRxGqMb/Oqe3d54+LWR1vr2\
knnnc467iD247eXBA3YYBAiFfierClXz/8jyL3Qh/zP8y+Y/1eN8jq+SKZAML/lIidjwZ8N4\
aLthvhxGUkGPo+p0eHKZ0sT5FsqJcQCy9UhHIvcJFIlIvANTPFWUTUhSiVdsNRnvwEQxm5uc\
ksjdv5evJfpOgI6c7juH8pnG2RKwlXaDYe9g8rMwYfML3A2SMWeBDopJJsmS5dUE2KttnmQa\
JZlMspvEpJioiEDFNpPUTbwqG3Zjhx2VCeJrIf60s2mI6blZMZVyAyYzI+1a2Y0AIqcbLUgR\
6iRbNtnp82GrImXW0YbcbczDgqQDWNdTenvtTAlT9iPHenluV+d3eed1/5MjMBrX2LgrK2ml\
FuoDOz036n/kaHbAeszR3jHoI4NWB3lusTfuVgkMUkLQaH0F6+pSCS11fXRwT421vs9s7axd\
nvtF7/eeIeq9s1aCLsLWdh+w7sXz3IYdEsSQ0LVsebmES/vXDU9k653W4MiNq8bMj5nLioCY\
edGgOT6tmYwqiOW1ugiEmew6iwjvvYb3SaeZJb7XNufOo9oH8FTneWGL+BLiclptpnhPwcui\
T+rzcF34+ycsL7p3AveuML9i9h13beylyg8CzEz5HppadqmmDxKrAquG9L3ztedRoWxEsAYt\
OM1Eu0G0gyTHkxf7cSkHJQRbA4xmlqHWkv1C0KhFhBq1z81Wq1CZoWic8TJ570WfSj5qsM+Q\
nl4k3H5+P+P3zlv9ltQrzv41qyiSwV/gOadyQBchsmwDGu/JI8tXflE8jqUVA0Zw0SKbdDC9\
c4FR+fak95SdF7uqpoRe9z6YRv+85YUzF4qJy6Q8GOVNwUn/ymyjNNbmcuVfXYeH2osLdCte\
ebmZRyUfQQZA1BSCLK4PWA/z1kBvDZm0t+i3or1LkMD6en95pGG0UOa8ZJXgS9TdEA1I2mZw\
1JOWWxDu0NEh4rM19H55rvueMBUZV1RjkmB3oxkXhAckpa5gzzxUDA2VLOrWFAXx+4gmfU17\
5o3v9H7EYdvGFuM+tDB3TA4ITjVUKduO/R4bXRAcPXZusWkN+t59sFz7Hyi0FkSdzrHXQVFq\
b8c9k9eLRjVlBbNvt4172CanYg/F3Rket1zCTc77UZ61Gq/Be9J8hrKrxbDZMEotf5o8zHDc\
/UJaEtdhgwHEcBEQKM+6NBWIewLmI1sHuWYAedZCw8U1hJfSWcld+2tv3jpCFc5FnosLWC0+\
DnAlnOXUXLoMXrmCVerNQkZHvRm8YtE12vG8+N/vOnPcu3vM1uOnzE3u3VP2ppmLZawm2NuO\
tPa7xwHFCgVKpox5PVrOmaDHrThk1tX864a2+/qhJd3nCFRQ+bfUKI4O+Wgk5byB3saMcUfV\
C8G137yMd16zRm3ZSq+UrDlk5ha3TiAj0b74prWO/vYG+RC+ronP1/McDtefBtY1XhZE0PIB\
wTe7CBTte2U6KPbYd5GffApQlDGssdfmxYGSlnHrQt7++KEwUg3ikkoQyKPixgUDB6Lozjv5\
vM5PBnllt+UzMnP6DStFsOfossbXOefWhQApACCNpkTYGAONIowDfndqDKRFuzn685nthZPe\
vEL7TIWkXAG2yxKBH90+yMzuRzWn3KMmyKGwZWnIErlJ9Vwt8OtR6+4TKad5y9+ViBtTzVG+\
tpv/xiLrcGKJRtYvCUlGeL4Dwy1jo1CSQe0X71EXK1YG44ztxTONjIslL8SwY0Cki0k0vsX/\
/xz7CxkAc9dEdJZhMy/JCGzD2FAGtUcag0tc2e2miJkp477V2qTKB+nFnDl/noxpXJ+yqVdO\
wNjbplmeiuburg9ii1Z1zwtG8QjcJAiVPSOV2mHzq1Qt7p2+YCcIKPmFusE5O+m8s+Wd8o3t\
qO1b1IZF8N0tx6RQnZ9Ux3gXijHlolixst6vhJV6ao0ZFzSprfAc3x0MLvxU0OsmXEVddMVK\
29CC6mPgPtXTUW7tVnZxwm0DTJwNOeVRV4axMSPlpgyv1Va1MQhQqWwUOb0s+gVLOecos4Nf\
eqlFW3fLQrlP86R4XRxrDHF0VIx6ArM5/sTWtObY6U2aosgxbN6FUa1iNTUpMThk1sUfJOC6\
s1SKo9D0g1NfiVmavyful/K7nZdDgutV1A26i7FR3r16bv3zz1cGw+ta17IX/+ripyutix3C\
xNmCxs7uiqKu9/Zjjn06tblXpJxlaLF5Od0d5W9QhQrs2u6UN0trQlCyEK2j9VYgCEIDrhQN\
c00rxg/FOfZ1N+nLV7RXDsYP+p0EzqKcuPujzuzEQsu2mFf4nYvf3Yp32rq/RYLetDLuOOTc\
0WXBtgoech7AHUxAxPBg81qWCsYlzTofRU5/MpuyNoegR6mCJO5ckrLOhWbG7xo/VGwGgpRb\
+Ch+TmlcuY6Qct/2x3gxzeDUU9u+ltexrjelJ0VRR9KXH/AqrbYxHa0vmQ/kBnE5EORBK1ZH\
mTSy7A8DJMgzzqDsu9ML5J3ufkuUNDCfN5UKAjBgw2I/QlS8MQ6o/ll9dTAdoM7HYtV4cNWE\
U4pOl5Y4SIzdMbNSjXFmsBV1uXXf7GaBZZslpFGFiIpokSzxWj4hjlGl4VKJDACo7ScxQf29\
kM8gHD3nUJkwkN2aW2TGttqwOrygJ7r9nYX2tYqy7Z3TQV5ocWzUI8l871y3LsQLoTgEO76B\
Upp69hy6VKRpZvpvgfQ2T06qgXjxh38eatREitX6bzKggIYmN4sAkA3a5oeJZDK3ahQrVJwa\
AD65cEGBkS/tKH9TtybiREEWCMcKD0HH0gELtjB+KNSk7bspmpr6eb0CscIiFyZpmXu8+gxw\
O7pJNbAK2h9q2c5dMHBaoi5DylbNGdweVVdN3Jm9u6YXXlmx4nYY2vIPfSkrE/vyv9gn/Z+j\
R3HKExaUhdV0Az77YWbQPhNfjw+F0vTteSMin+wIfxyPe0DEoI4uz6o2IXwsZC7sg8MicQ3o\
wys+NJYKVW72YiVQ5LKDVwrEg2jNVM6XdNjbsHlRDcAkD08o5iWtFB2dVoydRmmDRLalE+4t\
3gBbAPa7n7qXXXbTZTJXZKy5+1W0K7dgYEcIlu90ovC0C+5gxXiKtZisT14qDJ7f2ksyK59U\
r3QeHtBb24mPz7YDB3rgMTyUZ/fxM8h2i1Z21B8/VA5+9l7BKaOJZ15lWsyPv/z6CjU32ZKq\
+QFeyUywxYnUxUmcQfGc1Sp69oE2n6zFL8BXf5rc3cJMM6S97gagTT1bi7cmAV4MibkC4rz/\
icmmFtMlo5aN1Wp3uxsBfd4+9T42xmxvd79FV/hfuviBcrIaX092PrY5rle9FR4wTnDzrwj4\
7frD2d0KsMcdcADQ1Yu1LECg9Wj3yOS8OhrJdQBqXqsam17vmt2wjjjouHE/EO9sGPdqt23v\
j8rL6wid6ulagtNK5p1hjRkFtUxTIaZnIXk63Zb3P0t5MQ+3vxHIFrmgAdWwiDuA67tbVIF6\
wJ53z0uhyhsfH9bgF0kPT9v2hrT3HKIBgUXIYoxsVU+uryemiUiQEwh+BfxP//qLShlumR26\
I8OqjD+x3hHDj/IrEWmvyL6ioG/atfxe+5GzIqRgfaoayWOiTk+YixO15KDO6Os3XACDjboe\
ryXXOuEmTpDsc7czk+H04Kw1PNJazW32CAURHwBldqK0/nqYHtcrtLyyTYmoD8hbcnJUfa3U\
3FxWNus7uic3Qm1BzEecJW0MAz+W2CyN9FLIy+EpSy6CjkXsllZw1uBs1SxrQWM97/vnHu7m\
OtrkRl8AtBN3RDxI/fg7dZLLtDFYuCYYPMwXiO6ZIpwJ1GGydI9oUYYgnQQKDKoMTcwsjrfe\
Tcht6y18bLcpNfX41WE27447vLNzHuF+j15co5N7Py8vKUpTCoghHMEYKkM6y02lvX+9XiFg\
xBKMRNiwX69+LJb2Xa5WGqo7Rlk0cxsLVd0l2UXAW5jORg31sFMKYWXsDcRUKRDP8Q87OjiM\
dI1hNEt43netf8rOyfp+L58fq3holY9gxXwRJLY6gahgLQi4hS8w9LS+rFcJtdSCBrQLWsMs\
aDg/n8/P8/N+fcyoLepYr3W/CIUT7HsRQTtkduddbVfbo6Twt6fyJVPRrUGqRkWp3rdry65v\
sPYInyq1mPHrQDrqGJYI/LzA/QAzAXLnx+lu9uxHTEka9xgWgRvqEioskh+UWgD4nDvTAxaz\
3v9BqqmFuQwy1wSXye1Df1NXVF7G8bUFxUE4F9axG5fm+vFQJvP8iuYjrFveB6++AqmJTQJ0\
9GHjbPhzdSzkZGxokQzONVs0R0FCPJz1hJKbvDKsaj9hT0vp/gH5oiT8pAbWsBChwAbxHgDd\
59iJVZE3bAzPRN1RuG+MT7th+J3i6KFwVJvPvsGRDIZW4P2rVfiKjDVBM2Va+w6PgI0c5u3K\
O7MrWryPhXFFdBoAwi2JCaW9sZ3fTagQ4Tld6u4djwcWzeCdiYoeNbfalsRYo740afYQ1Rid\
Bp/E9mbcTemEjoWWXIU7I5nK5H/BEqmZnPMyhDV234BTLQKCe6nhU+frwQo1gNFWf+eQGN62\
aeF7BuzaN/94W2xlKd8t8KMA/3uoxymFt19OlCjYZeaMWbTKM9Yog9zDhptYMOzIQAoO7kn6\
nTao8CxjrRRgjKe7mKa+tzuufhAAZtgjA92THkulWvIzEi0++j1DvXMnupDUS8aVusWain+c\
CcvmR5orC+RcJs3wVahLYyEcqbvAS2e0QJ6BlU36R/IEd9Aol9q+M+UGvlo8EyRzISvqusNS\
7ePQ6cQzG1s725db4jNYNHAfF3KFG8wHqDwZDpWDsJ5qRLXR1ulFx85GhkypPubYaCiOQ5DR\
PQUiNpgk4fLJHenSMLMiswXsqW4Cpln1rFoHzpOoBbuZIixmVyhKajeqlFmp8zNAEsbEJz0g\
X0qlQuykZhf82pkhq2hWtCtYUdBODn6iPTBJT5Zk8IqFxqfBeFKjXk/sMeumhT8muOtq2Bgn\
dR4fj6RoOi0zI25kajAXlDZhUhS39jipk39h/69AfDPBLmOxhDj7Lg/WUTbOwJiJ3p7WtOpm\
ypARmhorQifINNm1CNS99GfDcLbD8sn8Fvlmvn7CmW65Pdmu6bKtuE0tn7NglIX1e/JAJP+G\
gB3At7cSOp92rl0lp0pp0xVb5YaQedwGgcJA1pT4cy24lS+jvzDw86YTfb2igJm5MysHmejW\
ZTGXpoAoLBLucUGEz/DwbjqOdzGAl5jy5VoCQws5zNYl4SVt030aZulYMgpDBPZd+kL0wV+w\
nob2LPRDQGEbdUoeFm4fEKio9c/ferVlpSO8Bx7OFZyHip1PIizvoqFe02kpmS17TvIOty42\
+Q0QaCnOpeLsPwwo+vixIeIeUjucUsKejVlez35qyuC0mm5pJJJLEVP2JAe/LTOwUUfKJkNy\
lEe3Kdth241ZNQmkVcAIh6DZJBzvQov5fn3JZA0phBWdNq5iTsm5N2D8gyve3V3X2o3zF3VY\
OqEBgTIADAbC69z7vOKJjGOzHRmUUwLU66iabtIbqR6SPOHCL+fCTfvpKcB/oG2p3wRKErEJ\
v1YOfu9iaKEMLXS3ptdH8fwN2Rdww9bZ7rFa2bwrzcyux3o+hPV6bJZpb71j7lLAdzge3VX7\
9uSCdz6f/FDb7+wzWnbbDSPj9R20+PybDUm/lVAsTuF0aycFQwJfPCUwcBvCGWEq6xoTIEOy\
b0bLta20+LYRYdyEceX7ypfezQKIy5OvJTAHCJy/WyOYaDVyPucMsHnZ0GCH75Cd//te1Bv2\
RkMykqYurBiNbuH3Xfuprirr4Dd453O6abAYGb5tw1d6wrBL8p1J1Sx9Lgw7yxqYn0FTrc0y\
59yLlV+4zIkLfZlPFRVnanHpTyrIlpn4lGkt269+JXnIWhEQWNvuVsrt531jr+8AHkVZfQU8\
8U/4AUZMuOj5iliigFrof/usmloYEI1f8erhJku75snYW7YmFmUcoC7UtG/KfJRuz6j0tWPa\
56J5QA0rJHwSIhNT4GWvez19HT2lia+Pz7/+MVEWlvjY6+9P85a0y9qWkTzQ7nF0wDXpQpw3\
K4xnfK2L08b5MrxdeI+DDfVDeV2JY0Fp6KH602tj2MbxxKM8oG+wTkE/dr8jyo4Sfs/IV6uf\
+IIXpH2Nca1+WCJV5qEv193bcUELLR4iFu83xUedKy9353tn+3o01dF2bNEQ3fK9Q5tCXrCi\
La+woCuvEeYrr+PiN2+i2V/eDJck580pyra8BV5ZIZbpe3kr5vJD3pqoGsnbcl/d+ndvR23b\
K41M4dKwaAwDaMA1gZGBoQWAcYE9mYkmQOnAjkaG41FkGkIP2BAIgKvUvzhpE5JbA6lze2iL\
5Nr+AwiDo2W4BStvK30dKy0JGNbzAY5akexsrV0xo5K8rY50LOTLvDyukIZNbRLKOCk18mD3\
WxmZGlsCMxNdGFYGNJnetUWyCPgo4BONEL4I9b8UeEBGYXuCdCd+DkctrqVLYXGSfE46kvAu\
+ltK5SRxQPnjUqyJXsSYs6VY6WPKfns9+IXjHhd5wQvGipgFdMwVEQ+A7a2AAS0clQwH7KHW\
SEGjhnklSVRghMtPy6gEtJRIKJeYkpQyQiequQunFOOU4BLdK1yp55olZS6npyPhMnvK7xIa\
pyNj+JctcQLXenBOCms46aMkenIx45WpXqxxVJQLz/vgpmAVa0fmDv6Pue9xVTBPfVxCUGfj\
1R8uVi8Zu9nRFqk/t0gR6wmWOlzuKRqk33HpO8qQ+nbGoEZLL/0Va156SJ+u+t86/os7ic49\
/7xoEqvL+2E8VOyCTuT/7j269Zy4jUtN+g4="
    ) format("woff2");
}
.JSLINT_,
.JSLINT_ address,
.JSLINT_ button,
.JSLINT_ cite,
.JSLINT_ dd,
.JSLINT_ dfn,
.JSLINT_ dl,
.JSLINT_ dt,
.JSLINT_ fieldset,
.JSLINT_ fieldset > div,
.JSLINT_ input,
.JSLINT_ label,
.JSLINT_ legend,
.JSLINT_ ol,
.JSLINT_ samp,
.JSLINT_ style,
.JSLINT_ textarea,
.JSLINT_ ul {
    border: 0;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
/* disable text inflation algorithm used on some smartphones and tablets */
.JSLINT_ {
    -ms-text-size-adjust: none;
    -webkit-text-size-adjust: none;
    text-size-adjust: none;
}
.JSLINT_REPORT_ div {
    box-sizing: border-box;
}
/*csslint ignore:end*/

/* css - jslint_report - font */
.JSLINT_,
.JSLINT_ fieldset legend,
.JSLINT_ .center {
    font-family: daley, sans-serif;
    font-size: 14px;
}
.JSLINT_ fieldset textarea,
.JSLINT_ #JSLINT_REPORT_FUNCTIONS dt,
.JSLINT_ #JSLINT_REPORT_WARNINGS samp {
    font-size: 12px;
}
.JSLINT_ fieldset textarea,
.JSLINT_ #JSLINT_REPORT_FUNCTIONS > div {
    font-family: monospace;
}
.JSLINT_ fieldset > div {
    font-family: sans-serif;
}
.JSLINT_ #JSLINT_REPORT_FUNCTIONS .level dfn {
    font-style: normal;
    font-weight: bold;
}
.JSLINT_ #JSLINT_REPORT_FUNCTIONS .level dt {
    font-style: italic;
}
.JSLINT_ #JSLINT_REPORT_TITLE {
    font-size: 32px;
}

/* css - jslint_report - general */
.JSLINT_ {
    background: antiquewhite;
}
.JSLINT_ fieldset {
    background: gainsboro;
    clear: both;
    margin: 16px 40px;
    width: auto;
}
.JSLINT_ fieldset address {
    float: right;
}
.JSLINT_ fieldset legend,
.JSLINT_ .center {
    text-align: center;
}
.JSLINT_ fieldset legend {
    background: darkslategray;
    color: white;
    padding: 4px 0;
    width: 100%;
}
.JSLINT_ fieldset textarea {
    padding: 4px;
    resize: none;
    white-space: pre;
    width: 100%;
}
.JSLINT_ fieldset textarea::selection {
    background: wheat;
}
.JSLINT_ fieldset > div {
    padding: 16px;
    width: 100%;
    word-wrap: break-word;
}
.JSLINT_ #JSLINT_REPORT_FUNCTIONS .level {
    background: cornsilk;
    padding: 8px 16px;
}
.JSLINT_ #JSLINT_REPORT_FUNCTIONS .level dd {
    line-height: 20px;
    padding-left: 120px;
}
.JSLINT_ #JSLINT_REPORT_FUNCTIONS .level dfn {
    display: block;
    line-height: 20px;
}
.JSLINT_ #JSLINT_REPORT_FUNCTIONS .level dl {
    position: relative
}
.JSLINT_ #JSLINT_REPORT_FUNCTIONS .level dt {
    line-height: 20px;
    position: absolute;
    text-align: right;
    width: 100px;
}
.JSLINT_ #JSLINT_REPORT_FUNCTIONS .level0 {
    background: white;
}
.JSLINT_ #JSLINT_REPORT_FUNCTIONS .level1 {
    /* yellow */
    background: #ffffe0;
    margin-left: 16px;
}
.JSLINT_ #JSLINT_REPORT_FUNCTIONS .level2 {
    /* green */
    background: #e0ffe0;
    margin-left: 32px;
}
.JSLINT_ #JSLINT_REPORT_FUNCTIONS .level3 {
    /* blue */
    background: #D0D0ff;
    margin-left: 48px;
}
.JSLINT_ #JSLINT_REPORT_FUNCTIONS .level4 {
    /* purple */
    background: #ffe0ff;
    margin-left: 64px;
}
.JSLINT_ #JSLINT_REPORT_FUNCTIONS .level5 {
    /* red */
    background: #ffe0e0;
    margin-left: 80px;
}
.JSLINT_ #JSLINT_REPORT_FUNCTIONS .level6 {
    /* orange */
    background: #ffe390;
    margin-left: 96px;
}
.JSLINT_ #JSLINT_REPORT_FUNCTIONS .level7 {
    /* gray */
    background: #e0e0e0;
    margin-left: 112px;
}
.JSLINT_ #JSLINT_REPORT_FUNCTIONS .level8 {
    margin-left: 128px;
}
.JSLINT_ #JSLINT_REPORT_FUNCTIONS .level9 {
    margin-left: 144px;
}
.JSLINT_ #JSLINT_REPORT_PROPERTIES {
    background: transparent;
}
.JSLINT_ #JSLINT_REPORT_PROPERTIES textarea {
    background: honeydew;
    height: 100px;
}
.JSLINT_ #JSLINT_REPORT_TITLE {
    color: darkslategray;
    padding-top: 16px;
}
.JSLINT_ #JSLINT_REPORT_WARNINGS cite {
    display: block;
    margin: 16px 0 4px 0;
    overflow-x: hidden;
    white-space: pre-line;
}
.JSLINT_ #JSLINT_REPORT_WARNINGS cite:nth-child(1) {
    margin-top: 0;
}
.JSLINT_ #JSLINT_REPORT_WARNINGS samp {
    background: lavenderblush;
    display: block;
    padding: 4px;
    white-space: pre-wrap;
}
.JSLINT_ #JSLINT_REPORT_WARNINGS > div {
    background: pink;
    max-height: 400px;
    overflow-y: auto;
}
.JSLINT_ #JSLINT_REPORT_WARNINGS > legend {
/* Google Lighthouse Accessibility - Background and foreground colors do not */
/* have a sufficient contrast ratio. */
    /* background: indianred; */
    background: #b44;
}
</style>
            `).trim() + "\n";

// Produce the Title.

    html += "<div class=\"center\" id=\"JSLINT_REPORT_TITLE\">\n";
    html += "JSLint Report\n";
    html += "</div>\n";

// Produce the HTML Error Report.
// <cite>
//     <address>LINE_NUMBER</address>
//     MESSAGE
// </cite>
// <samp>EVIDENCE</samp>

    html += "<fieldset id=\"JSLINT_REPORT_WARNINGS\">\n";
    html += "<legend>Report: Warnings (" + warnings.length + ")</legend>\n";
    html += "<div>\n";
    if (stop) {
        html += "<div class=\"center\">JSLint was unable to finish.</div>\n";
    }
    warnings.forEach(function ({
        column,
        line,
        line_source,
        message,
        stack_trace = ""
    }, ii) {
        html += (
            "<cite>"
            + address(line, column)
            + htmlEscape((ii + 1) + ". " + message)
            + "</cite>"
            + "<samp>"
            + htmlEscape(line_source.slice(0, 400) + "\n" + stack_trace)
            + "</samp>\n"
        );
    });
    if (warnings.length === 0) {
        html += "<div class=\"center\">There are no warnings.</div>\n";
    }
    html += "</div>\n";
    html += "</fieldset>\n";

// Produce the /*property*/ directive.

    html += "<fieldset id=\"JSLINT_REPORT_PROPERTIES\">\n";
    html += (
        "<legend>Report: Properties ("
        + Object.keys(property).length
        + ")</legend>\n"
    );
    html += "<label>\n";
    html += "<textarea readonly>";
    html += "/*property";
    Object.keys(property).sort().forEach(function (key, ii) {
        if (ii !== 0) {
            html += ",";
            length_80 += 2;
        }
        if (length_80 + key.length >= 80) {
            length_80 = 4;
            html += "\n   ";
        }
        html += " " + key;
        length_80 += key.length;
    });
    html += "\n*/\n";
    html += "</textarea>\n";
    html += "</label>\n";
    html += "</fieldset>\n";

// Produce the HTML Function Report.
// <div class=LEVEL>
//     <address>LINE_NUMBER</address>
//     <dfn>FUNCTION_NAME_AND_SIGNATURE</dfn>
//     <dl>
//         <dt>DETAIL</dt>
//         <dd>NAMES</dd>
//     </dl>
// </div>

    html += "<fieldset id=\"JSLINT_REPORT_FUNCTIONS\">\n";
    html += "<legend>Report: Functions (" + functions.length + ")</legend>\n";
    html += "<div>\n";
    if (json) {

// Bugfix - fix website crashing when linting pure json-object.
// return (

        html += (
            warnings.length === 0
            ? "<div class=\"center\">JSON: good.</div>\n"
            : "<div class=\"center\">JSON: bad.</div>\n"
        );
    } else if (functions.length === 0) {
        html += "<div class=\"center\">There are no functions.</div>\n";
    }
    exports = Object.keys(exports).sort();
    froms.sort();
    global = Object.keys(global.context).sort();
    module = (
        module
        ? "module"
        : "global"
    );
    if (global.length + froms.length + exports.length > 0) {
        if (functions.length === 0) {
            html += "<br>\n";
        }
        html += "<div class=\"level level0\">\n";
        html += detail(module, global);
        html += detail("import from", froms);
        html += detail("export", exports);
        html += "</div>\n";
    }
    functions.forEach(function (the_function) {
        let {
            context,
            from,
            id,
            level,
            line,
            name,

// Bugfix - fix html-report from crashing if parameters is undefined.

            parameters = [],
            signature
        } = the_function;
        let list = Object.keys(context);
        let params;
        html += (
            "<div class=\"level level" + htmlEscape(level) + "\">"
            + address(line, from + 1)
            + "<dfn>"
            + (
                id === "=>"
                ? (
                    "\u00ab" + htmlEscape(name) + "\u00bb"
                    + htmlEscape(signature)
                    + " =>"
                )
                : (
                    typeof name === "string"
                    ? "\u00ab" + htmlEscape(name) + "\u00bb"
                    : htmlEscape(name.id)
                ) + htmlEscape(signature)
            )
            + "</dfn>"
        );
        params = [];
        parameters.forEach(function extract({
            id,
            names
        }) {
            switch (id) {
            case "[":
            case "{":

// Recurse extract().

                names.forEach(extract);
                break;
            case "ignore":
                break;
            default:
                params.push(id);
            }
        });
        html += detail("parameter", params.sort());
        list.sort();
        html += detail("variable", list.filter(function (id) {
            return (
                context[id].role === "variable"
                && context[id].parent === the_function
            );
        }));
        html += detail("exception", list.filter(function (id) {
            return context[id].role === "exception";
        }));
        html += detail("closure", list.filter(function (id) {
            return (
                context[id].closure === true
                && context[id].parent === the_function
            );
        }));
        html += detail("outer", list.filter(function (id) {
            return (
                context[id].parent !== the_function
                && context[id].parent.id !== "(global)"
            );
        }));
        html += detail(module, list.filter(function (id) {
            return context[id].parent.id === "(global)";
        }));
        html += detail("label", list.filter(function (id) {
            return context[id].role === "label";
        }));
        html += "</div>\n";
    });
    html += "</div>\n";
    html += "</fieldset>\n";
    return html;
}

async function jstestDescribe(description, testFunction) {

// This function will create-and-run test-group <testFunction>
// with given <description>.

    let message;
    let result;
    let timerTimeout;

// Init jstestTimeStart.

    if (jstestTimeStart === undefined) {
        jstestTimeStart = jstestTimeStart || Date.now();
        process.on("exit", jstestOnExit);
    }

// PR-457 - Wait awhile for imports to initialize.

    await new Promise(function (resolve) {
        setTimeout(resolve);
    });

// Init jstestItList.

    jstestItList = [];
    testFunction();

// Wait for jstestItList to resolve.

    timerTimeout = setTimeout(noop, 0x7fffffff);
    result = await Promise.all(jstestItList);
    clearTimeout(timerTimeout);

// Print test results.

    message = (
        "\n  " + (Date.now() - jstestTimeStart) + "ms"
        + " - test describe - " + description + "\n"
        + result.map(function ([
            err, description, mode
        ]) {
            jstestItCount += 1;
            if (err) {
                jstestCountFailed += 1;
                err = (
                    "    \u001b[31m\u2718 " + jstestItCount + ". test it - "
                    + description + "\n" + err.stack + "\u001b[39m"
                );
                if (mode === "pass") {
                    jstestCountFailed -= 1;
                    err = "";
                }
            }
            return err || (
                "    \u001b[32m\u2714 " + jstestItCount + ". test it - "
                + description + "\u001b[39m"
            );
        }).join("\n")
    );
    console.error(message);
}

function jstestIt(description, testFunction, mode) {

// This function will create-and-run test-case <testFunction>
// inside current test-group with given <description>.

    jstestCountTotal += 1;
    jstestItList.push(new Promise(async function (resolve) {
        let err;
        try {
            await testFunction();
        } catch (errCaught) {
            err = errCaught;
        }
        resolve([err, description, mode]);
    }));
}

function jstestOnExit(exitCode, mode) {

// This function will on process-exit, print test-report
// and exit with non-zero exit-code if any test failed.

    let message = (
        (
            (jstestCountFailed || mode === "testsFailed")
            ? "\n\u001b[31m"
            : "\n\u001b[32m"
        )
        + "  tests total  - " + jstestCountTotal + "\n"
        + "  tests failed - " + jstestCountFailed + "\n"
        + "\n"
        + "  time finished - "
        + Number(Date.now() - jstestTimeStart).toLocaleString()
        + " ms\n"
        + "\u001b[39m"
    );
    if (mode !== "testsFailed") {
        console.error(message);
    }
    process.exitCode = exitCode || jstestCountFailed;
    return message;
}

async function moduleFsInit() {

// This function will import nodejs builtin-modules if they have not yet been
// imported.

// State 3 - Modules already imported.

    if (moduleFs !== undefined) {
        return;
    }

// State 2 - Wait while modules are importing.

    if (moduleFsInitResolveList !== undefined) {
        return new Promise(function (resolve) {
            moduleFsInitResolveList.push(resolve);
        });
    }

// State 1 - Start importing modules.

    moduleFsInitResolveList = [];
    [
        moduleChildProcess,
        moduleFs,
        modulePath,
        moduleUrl
    ] = await Promise.all([
        import("child_process"),
        import("fs"),
        import("path"),
        import("url")
    ]);
    while (moduleFsInitResolveList.length > 0) {
        moduleFsInitResolveList.shift()();
    }
}

function noop(val) {

// This function will do nothing except return <val>.

    return val;
}

function objectDeepCopyWithKeysSorted(obj) {

// This function will recursively deep-copy <obj> with keys sorted.

    let sorted;
    if (typeof obj !== "object" || !obj) {
        return obj;
    }

// Recursively deep-copy list with child-keys sorted.

    if (Array.isArray(obj)) {
        return obj.map(objectDeepCopyWithKeysSorted);
    }

// Recursively deep-copy obj with keys sorted.

    sorted = Object.create(null);
    Object.keys(obj).sort().forEach(function (key) {
        sorted[key] = objectDeepCopyWithKeysSorted(obj[key]);
    });
    return sorted;
}

function object_assign_from_list(dict, list, val) {

// Assign each property-name from <list> to <dict>.

    list.forEach(function (key) {
        dict[key] = val;
    });
    return dict;
}

function v8CoverageListMerge(processCovs) {

// This function is derived from MIT Licensed v8-coverage at
// https://github.com/demurgos/v8-coverage/tree/master/ts
// https://github.com/demurgos/v8-coverage/blob/master/ts/LICENSE.md
//
// Merges a list of v8 process coverages.
// The result is normalized.
// The input values may be mutated, it is not safe to use them after passing
// them to this function.
// The computation is synchronous.
// @param processCovs Process coverages to merge.
// @return Merged process coverage.

    let resultMerged = [];      // List of merged scripts from processCovs.
    let urlToScriptDict = new Map();    // Map scriptCov.url to scriptCovs.

    function compareRangeList(aa, bb) {

// Compares two range coverages.
// The ranges are first ordered by ascending `startOffset` and then by
// descending `endOffset`.
// This corresponds to a pre-order tree traversal.

        if (aa.startOffset !== bb.startOffset) {
            return aa.startOffset - bb.startOffset;
        }
        return bb.endOffset - aa.endOffset;
    }

    function dictKeyValueAppend(dict, key, val) {

// This function will append <val> to list <dict>[<key>].

        let list = dict.get(key);
        if (list === undefined) {
            list = [];
            dict.set(key, list);
        }
        list.push(val);
    }

    function mergeTreeList(parentTrees) {

// This function will return RangeTree object with <parentTrees> merged into
// property-children.
// @precondition Same `start` and `end` for all the parentTrees

        if (parentTrees.length <= 1) {
            return parentTrees[0];
        }

// new RangeTree().

        return {

// Merge parentTrees into property-children.

            children: mergeTreeListToChildren(parentTrees),
            delta: parentTrees.reduce(function (aa, bb) {
                return aa + bb.delta;
            }, 0),
            end: parentTrees[0].end,
            start: parentTrees[0].start
        };
    }

    function mergeTreeListToChildren(parentTrees) {

// This function will return <resultChildren> with <parentTrees> merged.

        let openRange;
        let parentToChildDict = new Map();      // Map parent to child.
        let queueList;
        let queueListIi = 0;
        let queueOffset;
        let queueTrees;
        let resultChildren = [];
        let startToTreeDict = new Map();        // Map tree.start to tree.
        function nextXxx() {

// Increment nextOffset, nextTrees.

            let [
                nextOffset, nextTrees
            ] = queueList[queueListIi] || [];
            let openRangeEnd;
            if (queueTrees === undefined) {
                queueListIi += 1;

// Increment nextOffset, nextTrees.

            } else if (nextOffset === undefined || nextOffset > queueOffset) {
                nextOffset = queueOffset;
                nextTrees = queueTrees;
                queueTrees = undefined;

// Concat queueTrees to nextTrees.

            } else {
                if (nextOffset === queueOffset) {
                    queueTrees.forEach(function (tree) {
                        nextTrees.push(tree);
                    });
                    queueTrees = undefined;
                }
                queueListIi += 1;
            }

// Reached end of queueList.

            if (nextOffset === undefined) {
                if (openRange !== undefined) {

// Append nested-children from parentToChildDict (within openRange) to
// resultChildren.

                    resultAppendNextChild();
                }
                return true;
            }
            if (openRange !== undefined && openRange.end <= nextOffset) {

// Append nested-children from parentToChildDict (within openRange) to
// resultChildren.

                resultAppendNextChild();
                openRange = undefined;
            }
            if (openRange === undefined) {
                openRangeEnd = nextOffset + 1;
                nextTrees.forEach(function ({
                    parentIi,
                    tree
                }) {
                    openRangeEnd = Math.max(openRangeEnd, tree.end);

// Append children from nextTrees to parentToChildDict.

                    dictKeyValueAppend(parentToChildDict, parentIi, tree);
                });
                queueOffset = openRangeEnd;
                openRange = {
                    end: openRangeEnd,
                    start: nextOffset
                };
            } else {
                nextTrees.forEach(function ({
                    parentIi,
                    tree
                }) {
                    let right;
                    if (tree.end > openRange.end) {
                        right = treeSplit(tree, openRange.end);
                        if (queueTrees === undefined) {
                            queueTrees = [];
                        }

// new RangeTreeWithParent().

                        queueTrees.push({
                            parentIi,
                            tree: right
                        });
                    }

// Append children from nextTrees to parentToChildDict.

                    dictKeyValueAppend(parentToChildDict, parentIi, tree);
                });
            }
        }
        function resultAppendNextChild() {

// This function will append next child to <resultChildren>.

            let treesMatching = [];
            parentToChildDict.forEach(function (nested) {
                if (
                    nested.length === 1
                    && nested[0].start === openRange.start
                    && nested[0].end === openRange.end
                ) {
                    treesMatching.push(nested[0]);
                } else {

// new rangeTreeCreate().

                    treesMatching.push({
                        children: nested,
                        delta: 0,
                        end: openRange.end,
                        start: openRange.start
                    });
                }
            });
            parentToChildDict.clear();

// Recurse mergeTreeList().

            resultChildren.push(mergeTreeList(treesMatching));
        }
        function treeSplit(tree, offset) {

// This function will split <tree> along <offset> and return the right-side.
// @precondition `tree.start < offset && offset < tree.end`
// @return RangeTree Right part

            let child;
            let ii = 0;
            let leftChildLen = tree.children.length;
            let mid;
            let resultTree;
            let rightChildren;

// TODO(perf): Binary search (check overhead) //jslint-ignore-line

            while (ii < tree.children.length) {
                child = tree.children[ii];
                if (child.start < offset && offset < child.end) {

// Recurse treeSplit().

                    mid = treeSplit(child, offset);
                    leftChildLen = ii + 1;
                    break;
                }
                if (child.start >= offset) {
                    leftChildLen = ii;
                    break;
                }
                ii += 1;
            }
            rightChildren = tree.children.splice(
                leftChildLen,
                tree.children.length - leftChildLen
            );
            if (mid !== undefined) {
                rightChildren.unshift(mid);
            }

// new rangeTreeCreate().

            resultTree = {
                children: rightChildren,
                delta: tree.delta,
                end: tree.end,
                start: offset
            };
            tree.end = offset;
            return resultTree;
        }

// Init startToTreeDict.

        parentTrees.forEach(function (parentTree, parentIi) {
            parentTree.children.forEach(function (child) {

// Append child with child.start to startToTreeDict.

                dictKeyValueAppend(startToTreeDict, child.start, {
                    parentIi,
                    tree: child
                });
            });
        });

// init queueList.

        queueList = Array.from(startToTreeDict).map(function ([
            startOffset, trees
        ]) {

// new StartEvent().

            return [
                startOffset, trees
            ];
        }).sort(function (aa, bb) {
            return aa[0] - bb[0];
        });
        while (true) {
            if (nextXxx()) {
                break;
            }
        }
        return resultChildren;
    }

    function sortFunc(funcCov) {

// This function will normalize-and-sort <funcCov>.ranges.
// Sorts the ranges (pre-order sort).
// TODO: Tree-based normalization of the ranges. //jslint-ignore-line
// @param funcCov Function coverage to normalize.

        funcCov.ranges = treeToRanges(treeFromSortedRanges(
            funcCov.ranges.sort(compareRangeList)
        ));
        return funcCov;
    }

    function sortScript(scriptCov) {

// This function will normalize-and-sort <scriptCov>.functions.

// Normalize-and-sort functions[xxx].ranges.

        scriptCov.functions.forEach(function (funcCov) {
            sortFunc(funcCov);
        });

// Sort functions by root range (pre-order sort).

        scriptCov.functions.sort(function (aa, bb) {
            return compareRangeList(aa.ranges[0], bb.ranges[0]);
        });
        return scriptCov;
    }

    function treeFromSortedRanges(ranges) {

// @precondition `ranges` are well-formed and pre-order sorted

        let root;
        let stack = [];   // Stack of parent trees and parent counts.
        ranges.forEach(function (range) {

// new rangeTreeCreate().

            let node = {
                children: [],
                delta: range.count,
                end: range.endOffset,
                start: range.startOffset
            };
            let parent;
            let parentCount;
            if (root === undefined) {
                root = node;
                stack.push([
                    node, range.count
                ]);
                return;
            }
            while (true) {
                [
                    parent, parentCount
                ] = stack[stack.length - 1];

// assert: `top !== undefined` (the ranges are sorted)

                if (range.startOffset < parent.end) {
                    break;
                }
                stack.pop();
            }
            node.delta -= parentCount;
            parent.children.push(node);
            stack.push([
                node, range.count
            ]);
        });
        return root;
    }

    function treeToRanges(tree) {

// Get the range coverages corresponding to the tree.
// The ranges are pre-order sorted.

        let count;
        let cur;
        let ii;
        let parentCount;
        let ranges = [];
        let stack = [           // Stack of parent trees and counts.
            [
                tree, 0
            ]
        ];
        function normalizeRange(tree) {

// @internal

            let children = [];
            let curEnd;
            let head;
            let tail = [];
            function endChain() {
                if (tail.length !== 0) {
                    head.end = tail[tail.length - 1].end;
                    tail.forEach(function (tailTree) {
                        tailTree.children.forEach(function (subChild) {
                            subChild.delta += tailTree.delta - head.delta;
                            head.children.push(subChild);
                        });
                    });
                    tail.length = 0;
                }

// Recurse normalizeRange().

                normalizeRange(head);
                children.push(head);
            }
            tree.children.forEach(function (child) {
                if (head === undefined) {
                    head = child;
                } else if (
                    child.delta === head.delta && child.start === curEnd
                ) {
                    tail.push(child);
                } else {
                    endChain();
                    head = child;
                }
                curEnd = child.end;
            });
            if (head !== undefined) {
                endChain();
            }
            if (children.length === 1) {
                if (
                    children[0].start === tree.start
                    && children[0].end === tree.end
                ) {
                    tree.delta += children[0].delta;
                    tree.children = children[0].children;

// `.lazyCount` is zero for both (both are after normalization)

                    return;
                }
            }
            tree.children = children;
        }
        normalizeRange(tree);
        while (stack.length > 0) {
            [
                cur, parentCount
            ] = stack.pop();
            count = parentCount + cur.delta;
            ranges.push({
                count,
                endOffset: cur.end,
                startOffset: cur.start
            });
            ii = cur.children.length - 1;
            while (ii >= 0) {
                stack.push([
                    cur.children[ii], count
                ]);
                ii -= 1;
            }
        }
        return ranges;
    }

    if (processCovs.length === 0) {
        return {
            result: []
        };
    }

// Init urlToScriptDict.

    processCovs.forEach(function ({
        result
    }) {
        result.forEach(function (scriptCov) {
            dictKeyValueAppend(urlToScriptDict, scriptCov.url, scriptCov);
        });
    });
    urlToScriptDict.forEach(function (scriptCovs) {

// assert: `scriptCovs.length > 0`

// function mergeScriptList(scriptCovs) {
// Merges a list of matching script coverages.
// Scripts are matching if they have the same `url`.
// The result is normalized.
// The input values may be mutated, it is not safe to use them after passing
// them to this function.
// The computation is synchronous.
// @param scriptCovs Process coverages to merge.
// @return Merged script coverage, or `undefined` if the input list was empty.

        let functions = [];

// Map funcCovRoot.startOffset:funcCovRoot.endOffset to funcCov.

        let rangeToFuncDict = new Map();

// Probably deadcode.
// if (scriptCovs.length === 0) {
//     return undefined;
// }

        if (scriptCovs.length === 1) {
            resultMerged.push(sortScript(scriptCovs[0]));
            return;
        }

// Init rangeToFuncDict.
// Map funcCovRoot.startOffset:funcCovRoot.endOffset to funcCov.

        scriptCovs.forEach(function ({
            functions
        }) {
            functions.forEach(function (funcCov) {
                dictKeyValueAppend(
                    rangeToFuncDict,

// This string can be used to match function with same root range.
// The string is derived from the start and end offsets of the root range of
// the function.
// This assumes that `ranges` is non-empty (true for valid function coverages).

                    (
                        funcCov.ranges[0].startOffset
                        + ";" + funcCov.ranges[0].endOffset
                    ),
                    funcCov
                );
            });
        });
        rangeToFuncDict.forEach(function (funcCovs) {

// assert: `funcCovs.length > 0`

// function mergeFuncList(funcCovs) {
// Merges a list of matching function coverages.
// Functions are matching if their root ranges have the same span.
// The result is normalized.
// The input values may be mutated, it is not safe to use them after passing
// them to this function.
// The computation is synchronous.
// @param funcCovs Function coverages to merge.
// @return Merged function coverage, or `undefined` if the input list was empty.

            let count = 0;
            let isBlockCoverage;
            let merged;
            let ranges;
            let trees = [];

// Probably deadcode.
// if (funcCovs.length === 0) {
//     return undefined;
// }

            if (funcCovs.length === 1) {
                functions.push(sortFunc(funcCovs[0]));
                return;
            }

// assert: `funcCovs[0].ranges.length > 0`

            funcCovs.forEach(function (funcCov) {

// assert: `funcCov.ranges.length > 0`
// assert: `funcCov.ranges` is sorted

                count += (
                    funcCov.count !== undefined
                    ? funcCov.count
                    : funcCov.ranges[0].count
                );
                if (funcCov.isBlockCoverage) {
                    trees.push(treeFromSortedRanges(funcCov.ranges));
                }
            });
            if (trees.length > 0) {
                isBlockCoverage = true;
                ranges = treeToRanges(mergeTreeList(trees));
            } else {
                isBlockCoverage = false;
                ranges = [
                    {
                        count,
                        endOffset: funcCovs[0].ranges[0].endOffset,
                        startOffset: funcCovs[0].ranges[0].startOffset
                    }
                ];
            }
            merged = {
                functionName: funcCovs[0].functionName,
                isBlockCoverage,
                ranges
            };
            if (count !== ranges[0].count) {
                merged.count = count;
            }

// assert: `merged` is normalized

            functions.push(merged);
        });
        resultMerged.push(sortScript({
            functions,
            scriptId: scriptCovs[0].scriptId,
            url: scriptCovs[0].url
        }));
    });

// Sorts the scripts alphabetically by `url`.
// Reassigns script ids: the script at index `0` receives `"0"`, the script at
// index `1` receives `"1"` etc.

    Object.entries(resultMerged.sort(function (aa, bb) {
        return (
            aa.url > bb.url
            ? 1
            : -1
        );
    })).forEach(function ([
        scriptId, scriptCov
    ]) {
        scriptCov.scriptId = scriptId.toString(10);
    });
    return {
        result: resultMerged
    };
}

async function v8CoverageReportCreate({
    consoleError,
    coverageDir,
    processArgv = []
}) {

// This function will create html-coverage-reports directly from
// v8-coverage-files in <coverageDir>.
// 1. Spawn node.js program <processArgv> with NODE_V8_COVERAGE.
// 2. Merge JSON v8-coverage-files in <coverageDir>.
// 3. Create html-coverage-reports in <coverageDir>.

    let cwd;
    let excludeList = [];
    let exitCode = 0;
    let fileDict;
    let includeList = [];
    let modeIncludeNodeModules;
    let processArgElem;
    let promiseList = [];
    let v8CoverageObj;

    function htmlRender({
        fileList,
        lineList,
        modeIndex,
        pathname
    }) {
        let html;
        let padLines;
        let padPathname;
        let txt;
        let txtBorder;
        html = "";
        html += String(`
<!DOCTYPE html>
<html lang="en">
<head>
<title>V8 Coverage Report</title>
<style>
/* jslint utility2:true */
/*csslint ignore:start*/
.coverage,
.coverage a,
.coverage div,
.coverage pre,
.coverage span,
.coverage table,
.coverage tbody,
.coverage td,
.coverage th,
.coverage thead,
.coverage tr {
    box-sizing: border-box;
    font-family: monospace;
}
/*csslint ignore:end*/

/* css - coverage_report - general */
body {
    margin: 0;
}
.coverage pre {
    margin: 5px 0;
}
.coverage table {
    border-collapse: collapse;
}
.coverage td,
.coverage th {
    border: 1px solid #777;
    line-height: 20px;
    margin: 0;
    padding: 5px 10px;
}
.coverage td span {
    display: inline-block;
    width: 100%;
}
.coverage .content {
    padding: 0 5px;
}
.coverage .content a {
    text-decoration: none;
}
.coverage .count {
    margin: 0 5px;
    padding: 0 5px;
}
.coverage .footer,
.coverage .header {
    padding: 20px;
}
.coverage .footer {
    text-align: center;
}
.coverage .percentbar {
    height: 12px;
    margin: 2px 0;
    min-width: 200px;
    position: relative;
    width: 100%;
}
.coverage .percentbar div {
    height: 100%;
    position: absolute;
}
.coverage .title {
    font-size: large;
    font-weight: bold;
    margin-bottom: 10px;
}

/* css - coverage_report - color */
.coverage td,
.coverage th {
    background: #fff;
}
.coverage .count,
.coverage .coverageHigh {
    background: #9d9;
}
.coverage .count {
    color: #666;
}
.coverage .coverageIgnore {
    background: #ccc;
}
.coverage .coverageLow,
.coverage .uncovered {
    background: #ebb;
}
.coverage .coverageMedium {
    background: #fd7;
}
.coverage .footer,
.coverage .header,
.coverage .lineno {
    background: #ddd;
}
.coverage .percentbar {
    background: #999;
}
.coverage .percentbar div {
    background: #666;
}

/* css - coverage_report - important */
.coverage pre:hover span,
.coverage tr:hover td {
    background: #7d7;
}
.coverage pre:hover span.uncovered,
.coverage tr:hover td.coverageLow {
    background: #f99;
}
</style>
</head>
<body class="coverage">
<!-- header start -->
<div class="header">
<div class="title">V8 Coverage Report</div>
<table>
<thead>
    <tr>
    <th>Files covered</th>
    <th>Lines</th>
    <th>Remaining</th>
    </tr>
</thead>
<tbody>
        `).trim() + "\n";
        if (modeIndex) {
            padLines = String("(ignore) 100.00 %").length;
            padPathname = 32;
            fileList.unshift({
                linesCovered: 0,
                linesTotal: 0,
                modeCoverageIgnoreFile: "",
                pathname: "./"
            });
            fileList.slice(1).forEach(function ({
                linesCovered,
                linesTotal,
                modeCoverageIgnoreFile,
                pathname
            }) {
                if (!modeCoverageIgnoreFile) {
                    fileList[0].linesCovered += linesCovered;
                    fileList[0].linesTotal += linesTotal;
                }
                padPathname = Math.max(padPathname, pathname.length + 2);
                padLines = Math.max(
                    padLines,
                    String(linesCovered + " / " + linesTotal).length
                );
            });
        }
        txtBorder = (
            "+" + "-".repeat(padPathname + 2) + "+"
            + "-".repeat(padLines + 2) + "+"
            + "-".repeat(padLines + 2) + "+\n"
        );
        txt = "";
        txt += "V8 Coverage Report\n";
        txt += txtBorder;
        txt += (
            "| " + String("Files covered").padEnd(padPathname, " ") + " | "
            + String("Lines").padStart(padLines, " ") + " | "
            + String("Remaining").padStart(padLines, " ") + " |\n"
        );
        txt += txtBorder;
        fileList.forEach(function ({
            linesCovered,
            linesTotal,
            modeCoverageIgnoreFile,
            pathname
        }, ii) {
            let coverageLevel;
            let coveragePct;
            let fill;
            let str1;
            let str2;
            let xx1;
            let xx2;
            coveragePct = Math.floor(10000 * linesCovered / linesTotal || 0);
            coverageLevel = (
                modeCoverageIgnoreFile
                ? "coverageIgnore"
                : coveragePct >= 8000
                ? "coverageHigh"
                : coveragePct >= 5000
                ? "coverageMedium"
                : "coverageLow"
            );
            coveragePct = String(coveragePct).replace((
                /..$/m
            ), ".$&");
            if (modeIndex && ii === 0) {
                fill = (

// Badge-color rgb-red.

                    "#" + Math.round(
                        (100 - Number(coveragePct)) * 2.21
                    ).toString(16).padStart(2, "0")

// Badge-color rgb-green.

                    + Math.round(
                        Number(coveragePct) * 2.21
                    ).toString(16).padStart(2, "0")

// Badge-color rgb-blue.

                    + "00"
                );
                str1 = "coverage";
                str2 = coveragePct + " %";
                xx1 = 6 * str1.length + 20;
                xx2 = 6 * str2.length + 20;

// Fs - write coverage_badge.svg.

                promiseList.push(fsWriteFileWithParents((
                    coverageDir + "coverage_badge.svg"
                ), String(`
<svg height="20" width="${xx1 + xx2}" xmlns="http://www.w3.org/2000/svg">
<rect fill="#555" height="20" width="${xx1 + xx2}"/>
<rect fill="${fill}" height="20" width="${xx2}" x="${xx1}"/>
<g
    fill="#fff"
    font-family="verdana, geneva, dejavu sans, sans-serif"
    font-size="11"
    font-weight="bold"
    text-anchor="middle"
>
<text x="${0.5 * xx1}" y="14">${str1}</text>
<text x="${xx1 + 0.5 * xx2}" y="14">${str2}</text>
</g>
</svg>
                `).trim() + "\n"));
                pathname = "";
            }
            txt += (
                "| "
                + String("./" + pathname).padEnd(padPathname, " ") + " | "
                + String(
                    modeCoverageIgnoreFile + " " + coveragePct + " %"
                ).padStart(padLines, " ") + " | "
                + " ".repeat(padLines) + " |\n"
            );
            txt += (
                "| " + "*".repeat(
                    Math.round(0.01 * coveragePct * padPathname)
                ).padEnd(padPathname, "_") + " | "
                + String(
                    linesCovered + " / " + linesTotal
                ).padStart(padLines, " ") + " | "
                + String(
                    (linesTotal - linesCovered) + " / " + linesTotal
                ).padStart(padLines, " ") + " |\n"
            );
            txt += txtBorder;
            pathname = htmlEscape(pathname);

// CL-37251d17 - Bugfix - Fix incorrect http-link to index.html.

            html += String(`
    <tr>
    <td class="${coverageLevel}">
            ${(
                modeIndex
                ? (
                    "<a href=\"" + (pathname || "index") + ".html\">. / "
                    + pathname + "</a><br>"
                )
                : (
                    "<a href=\""
                    + "../".repeat(pathname.split("/").length - 1)
                    + "index.html\">. / </a>"
                    + pathname + "<br>"
                )
            )}
        <div class="percentbar">
            <div style="width: ${coveragePct}%;"></div>
        </div>
    </td>
    <td style="text-align: right;">
        ${modeCoverageIgnoreFile} ${coveragePct} %<br>
        ${linesCovered} / ${linesTotal}
    </td>
    <td style="text-align: right;">
        <br>
        ${linesTotal - linesCovered} / ${linesTotal}
    </td>
    </tr>
        `).trim() + "\n";
        });
        html += String(`
</tbody>
</table>
</div>
<!-- header end -->
        `).trim() + "\n";
        if (!modeIndex) {
            html += String(`
<!-- content start -->
<div class="content">
            `).trim() + "\n";
            lineList.forEach(function ({
                count,
                holeList,
                line,
                startOffset
            }, ii) {
                let chunk;
                let inHole;
                let lineHtml;
                let lineId;
                lineHtml = "";
                lineId = "line_" + (ii + 1);
                switch (count) {
                case -1:
                case 0:
                    if (holeList.length === 0) {
                        lineHtml += "</span>";
                        lineHtml += "<span class=\"uncovered\">";
                        lineHtml += htmlEscape(line);
                        break;
                    }
                    line = line.split("").map(function (char) {
                        return {
                            char,
                            isHole: undefined
                        };
                    });
                    holeList.forEach(function ([
                        aa, bb
                    ]) {
                        aa = Math.max(aa - startOffset, 0);
                        bb = Math.min(bb - startOffset, line.length);
                        while (aa < bb) {
                            line[aa].isHole = true;
                            aa += 1;
                        }
                    });
                    chunk = "";
                    line.forEach(function ({
                        char,
                        isHole
                    }) {
                        if (inHole !== isHole) {
                            lineHtml += htmlEscape(chunk);
                            lineHtml += "</span><span";

// Coverage-hack - Ugly-hack around possible deadcode where isHole is always
// true.

                            if (isHole) {
                                lineHtml += " class=\"uncovered\"";
                            }
                            lineHtml += ">";
                            chunk = "";
                            inHole = isHole;
                        }
                        chunk += char;
                    });
                    lineHtml += htmlEscape(chunk);
                    break;
                default:
                    lineHtml += htmlEscape(line);
                }
                html += String(`
<pre>
<span class="lineno">
<a href="#${lineId}" id="${lineId}">${String(ii + 1).padStart(5, " ")}.</a>
</span>
<span class="count
                ${(
                    count <= 0
                    ? "uncovered"
                    : ""
                )}"
>
${String(count || "-0").padStart(7, " ")}
</span>
<span>${lineHtml}</span>
</pre>
                `).replace((
                    /\n/g
                ), "").trim() + "\n";
            });
            html += String(`
</div>
<!-- content end -->
            `).trim() + "\n";
        }
        html += String(`
<div class="footer">
    [
    This document was created with
    <a href="https://github.com/jslint-org/jslint">JSLint</a>
    ]
</div>
</body>
</html>
        `).trim() + "\n";

// Fs - write <file>.html.

        promiseList.push(fsWriteFileWithParents(pathname + ".html", html));
        if (!modeIndex) {
            return;
        }

// Fs - write coverage_report.txt.

        consoleError("\n" + txt);
        promiseList.push(fsWriteFileWithParents((
            coverageDir + "coverage_report.txt"
        ), txt));
    }

/*
function sentinel() {}
*/

    await moduleFsInit();
    consoleError = consoleError || console.error;
    cwd = process.cwd().replace((
        /\\/g
    ), "/") + "/";

// Init coverageDir.
// Assert coverageDir is subdirectory of cwd.

    assertOrThrow(coverageDir, "invalid coverageDir " + coverageDir);

// CL-61b11012 - coverage - Relax requirement for coverageDir to be in cwd.
//     assertOrThrow(
//         pathnameRelativeCwd(coverageDir),
//         "coverageDir " + coverageDir + " is not subdirectory of cwd " + cwd
//     );

    coverageDir = modulePath.resolve(coverageDir).replace((
        /\\/g
    ), "/") + "/";

    processArgv = processArgv.slice();
    while (processArgv[0] && processArgv[0][0] === "-") {
        processArgElem = processArgv.shift().split("=");
        processArgElem[1] = processArgElem.slice(1).join("=");
        switch (processArgElem[0]) {

// PR-371 - Add cli-option `--exclude=...`.

        case "--exclude":
            excludeList.push(processArgElem[1]);
            break;

// PR-371 - Add cli-option `--include=...`

        case "--include":
            includeList.push(processArgElem[1]);
            break;

// PR-400
// Disable default-coverage of directory `node_modules`,
// but allow override with cli-option `--include-node-modules=1`.

        case "--include-node-modules":
            modeIncludeNodeModules = !(
                /0|false|null|undefined/
            ).test(processArgElem[1]);
            break;
        }
    }

// 1. Spawn node.js program <processArgv> with coverage

    if (processArgv.length > 0) {

// Remove old coverage-files.

        await fsWriteFileWithParents(coverageDir + "/touch.txt", "");
        await Promise.all(Array.from(
            await moduleFs.promises.readdir(coverageDir)
        ).map(async function (file) {
            if ((
                /^coverage-\d+?-\d+?-\d+?\.json$/
            ).test(file)) {
                consoleError("rm file " + coverageDir + file);
                await moduleFs.promises.unlink(coverageDir + file);
            }
        }));
        exitCode = await new Promise(function (resolve) {
            let processArgv0 = processArgv[0];

// If win32 environment, then replace program npm with npm.cmd.
// Coverage-hack - Ugly-hack to get test-coverage under both win32 and linux.

            if (processArgv0 === "npm") {
                processArgv0 = process.platform.replace(
                    "win32",
                    "npm.cmd"
                ).replace(
                    process.platform,
                    "npm"
                );
            }
            moduleChildProcess.spawn(
                processArgv0,
                processArgv.slice(1),
                {
                    env: Object.assign({}, process.env, {
                        NODE_V8_COVERAGE: coverageDir
                    }),

// PR-465
// https://nodejs.org/en/blog/vulnerability/april-2024-security-releases-2
// Node.js will now error with EINVAL if a .bat or .cmd file is passed to
// child_process.spawn and child_process.spawnSync without the shell option set.

                    shell: (
                        processArgv0.endsWith(".bat")
                        || processArgv0.endsWith(".cmd")
                    ),
                    stdio: ["ignore", 1, 2]
                }
            ).on("exit", resolve);
        });
        consoleError(
            `v8CoverageReportCreate - program exited with exitCode=${exitCode}`
        );
    }

// 2. Merge JSON v8-coverage-files in <coverageDir>.

    consoleError("v8CoverageReportCreate - merging coverage files...");
    v8CoverageObj = await moduleFs.promises.readdir(coverageDir);
    v8CoverageObj = v8CoverageObj.filter(function (file) {
        return (
            /^coverage-\d+?-\d+?-\d+?\.json$/
        ).test(file);
    });
    v8CoverageObj = await Promise.all(v8CoverageObj.map(async function (file) {
        let data;
        let pathnameDict = Object.create(null);
        data = await moduleFs.promises.readFile(coverageDir + file, "utf8");
        data = JSON.parse(data);
        data.result.forEach(function (scriptCov) {
            let pathname = scriptCov.url;

// Filter out internal coverages.

            if (!pathname.startsWith("file:///")) {
                return;
            }

// Normalize pathname.

            pathname = moduleUrl.fileURLToPath(pathname);
            pathname = modulePath.resolve(pathname).replace((
                /\\/g
            ), "/");

// Filter files outside of cwd.

            if (pathname.indexOf("[") >= 0 || !pathname.startsWith(cwd)) {
                return;
            }

// Normalize pathname relative to cwd.

            pathname = pathname.slice(cwd.length);
            scriptCov.url = pathname;
            pathnameDict[pathname] = scriptCov;
        });

// PR-400 - Filter directory `node_modules`.

        if (!modeIncludeNodeModules) {
            excludeList.push("node_modules/");
        }

// PR-400 - Filter files by glob-patterns in excludeList, includeList.

        data.result = globExclude({
            excludeList,
            includeList,
            pathnameList: Object.keys(pathnameDict)
        }).pathnameList.map(function (pathname) {
            return pathnameDict[pathname];
        });
        return data;
    }));

// Merge v8CoverageObj.

    v8CoverageObj = v8CoverageListMerge(v8CoverageObj);

// Debug v8CoverageObj.

    await fsWriteFileWithParents(
        coverageDir + "v8_coverage_merged.json",
        JSON.stringify(v8CoverageObj, undefined, 1)
    );

// 3. Create html-coverage-reports in <coverageDir>.

    consoleError("v8CoverageReportCreate - creating html-coverage-report...");
    fileDict = Object.create(null);
    await Promise.all(v8CoverageObj.result.map(async function ({
        functions,
        url: pathname
    }) {
        let lineList;
        let linesCovered;
        let linesTotal;
        let source;
        source = await moduleFs.promises.readFile(pathname, "utf8");
        lineList = [{}];
        source.replace((
            /^.*$/gm
        ), function (line, startOffset) {
            lineList[lineList.length - 1].endOffset = startOffset - 1;
            lineList.push({
                count: -1,
                endOffset: 0,
                holeList: [],
                line,
                startOffset
            });
            return "";
        });
        lineList.shift();
        lineList[lineList.length - 1].endOffset = source.length;
        functions.reverse().forEach(function ({
            ranges
        }) {
            ranges.reverse().forEach(function ({
                count,
                endOffset,
                startOffset
            }, ii, list) {
                lineList.forEach(function (elem) {
                    if (!(
                        (
                            elem.startOffset <= startOffset
                            && startOffset <= elem.endOffset
                        ) || (
                            elem.startOffset <= endOffset
                            && endOffset <= elem.endOffset
                        ) || (
                            startOffset <= elem.startOffset
                            && elem.endOffset <= endOffset
                        )
                    )) {
                        return;
                    }

// Handle tree-root.

                    if (ii + 1 === list.length) {
                        if (elem.count === -1) {
                            elem.count = count;
                        }
                        return;
                    }

// Handle tree-children.

                    if (elem.count !== 0) {
                        elem.count = Math.max(count, elem.count);
                    }
                    if (count === 0) {
                        elem.count = 0;
                        elem.holeList.push([
                            startOffset, endOffset
                        ]);
                    }
                });
            });
        });
        linesTotal = lineList.length;
        linesCovered = lineList.filter(function ({
            count
        }) {
            return count > 0;
        }).length;
        await moduleFs.promises.mkdir((
            modulePath.dirname(coverageDir + pathname)
        ), {
            recursive: true
        });
        fileDict[pathname] = {
            lineList,
            linesCovered,
            linesTotal,
            modeCoverageIgnoreFile: (
                (
                    /^\/\*coverage-ignore-file\*\/$/m
                ).test(source.slice(0, 65536))
                ? "(ignore)"
                : ""
            ),
            pathname
        };
        htmlRender({
            fileList: [
                fileDict[pathname]
            ],
            lineList,
            pathname: coverageDir + pathname
        });
    }));
    htmlRender({
        fileList: Object.keys(fileDict).sort().map(function (pathname) {
            return fileDict[pathname];
        }),
        modeIndex: true,
        pathname: coverageDir + "index"
    });
    await Promise.all(promiseList);
    assertOrThrow(
        exitCode === 0,
        "v8CoverageReportCreate - nonzero exitCode " + exitCode
    );
}

/*
function sentinel() {}
*/

// Export jslint as cjs/esm.

jslint_export = Object.freeze(Object.assign(jslint, {
    assertErrorThrownAsync,
    assertJsonEqual,
    assertOrThrow,
    debugInline,
    fsWriteFileWithParents,
    globExclude,
    htmlEscape,
    jslint,
    jslint_apidoc,
    jslint_assert,
    jslint_charset_ascii,
    jslint_cli,
    jslint_edition,
    jslint_phase1_split,
    jslint_phase2_lex,
    jslint_phase3_parse,
    jslint_phase4_walk,
    jslint_phase5_whitage,
    jslint_report,
    jstestDescribe,
    jstestIt,
    jstestOnExit,
    moduleFsInit,
    noop,
    objectDeepCopyWithKeysSorted,
    v8CoverageListMerge,
    v8CoverageReportCreate
}));
// module.exports = jslint_export;              // Export jslint as cjs.
export default Object.freeze(jslint_export);    // Export jslint as esm.
jslint_import_meta_url = import.meta.url;

// Run jslint_cli.
jslint_cli({});
