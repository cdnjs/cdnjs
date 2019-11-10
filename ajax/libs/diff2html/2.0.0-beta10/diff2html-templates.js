(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["line-by-line/column-line-number.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<tr>\n    <td class=\"d2h-code-linenumber ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "diffParser")),"LINE_TYPE")),"INFO"), env.opts.autoescape);
output += "\"></td>\n    <td class=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "diffParser")),"LINE_TYPE")),"INFO"), env.opts.autoescape);
output += "\">\n        <div class=\"d2h-code-line ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "diffParser")),"LINE_TYPE")),"INFO"), env.opts.autoescape);
output += "\"> ";
output += runtime.suppressValue((lineno = 3, colno = 77, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "utils")),"escape"), "utils[\"escape\"]", context, [runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "block")),"header")])), env.opts.autoescape);
output += "</div>\n    </td>\n</tr>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["line-by-line/empty-diff.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<tr>\n    <td class=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "diffParser")),"LINE_TYPE")),"INFO"), env.opts.autoescape);
output += "\">\n        <div class=\"d2h-code-line ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "diffParser")),"LINE_TYPE")),"INFO"), env.opts.autoescape);
output += "\">\n            File without changes\n        </div>\n    </td>\n</tr>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["line-by-line/file-diff.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<div id=\"";
output += runtime.suppressValue((lineno = 0, colno = 32, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "printerUtils")),"getHtmlId"), "printerUtils[\"getHtmlId\"]", context, [runtime.contextOrFrameLookup(context, frame, "file")])), env.opts.autoescape);
output += "\" class=\"d2h-file-wrapper\" data-lang=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "file")),"language"), env.opts.autoescape);
output += "\">\n    <div class=\"d2h-file-header\">\n    <span class=\"d2h-file-stats\">\n      <span class=\"d2h-lines-added\">\n        <span>+";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "file")),"addedLines"), env.opts.autoescape);
output += "</span>\n      </span>\n      <span class=\"d2h-lines-deleted\">\n        <span>-";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "file")),"deletedLines"), env.opts.autoescape);
output += "</span>\n      </span>\n    </span>\n    <span class=\"d2h-file-name-wrapper\">\n        <span class=\"d2h-file-name\">&nbsp;";
output += runtime.suppressValue((lineno = 11, colno = 67, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "printerUtils")),"getDiffName"), "printerUtils[\"getDiffNam\"]", context, [runtime.contextOrFrameLookup(context, frame, "file")])), env.opts.autoescape);
output += "</span>\n    </span>\n    </div>\n    <div class=\"d2h-file-diff\">\n        <div class=\"d2h-code-wrapper\">\n            <table class=\"d2h-diff-table\">\n                <tbody class=\"d2h-diff-tbody\">\n                ";
output += runtime.suppressValue(env.getFilter("safe").call(context, runtime.contextOrFrameLookup(context, frame, "diffs")), env.opts.autoescape);
output += "\n                </tbody>\n            </table>\n        </div>\n    </div>\n</div>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["line-by-line/line.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<tr>\n    <td class=\"d2h-code-linenumber ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "type"), env.opts.autoescape);
output += "\">\n        <div class=\"line-num1\">";
output += runtime.suppressValue(env.getFilter("safe").call(context, (lineno = 2, colno = 50, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "utils")),"valueOrEmpty"), "utils[\"valueOrEmp\"]", context, [runtime.contextOrFrameLookup(context, frame, "oldNumber")]))), env.opts.autoescape);
output += "</div>\n        <div class=\"line-num2\">";
output += runtime.suppressValue(env.getFilter("safe").call(context, (lineno = 3, colno = 50, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "utils")),"valueOrEmpty"), "utils[\"valueOrEmp\"]", context, [runtime.contextOrFrameLookup(context, frame, "newNumber")]))), env.opts.autoescape);
output += "</div>\n    </td>\n    <td class=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "type"), env.opts.autoescape);
output += "\">\n        <div class=\"d2h-code-line ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "type"), env.opts.autoescape);
output += "\">";
if(runtime.contextOrFrameLookup(context, frame, "prefix")) {
output += "\n            <span class=\"d2h-code-line-prefix\">";
output += runtime.suppressValue(env.getFilter("safe").call(context, (lineno = 8, colno = 89, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "utils")),"convertWhiteSpaceToNonBreakingSpace"), "utils[\"convertWhi\"]", context, [runtime.contextOrFrameLookup(context, frame, "prefix")]))), env.opts.autoescape);
output += "</span>\n            ";
;
}
if(runtime.contextOrFrameLookup(context, frame, "content")) {
output += "<span class=\"d2h-code-line-ctn\">";
output += runtime.suppressValue(env.getFilter("safe").call(context, (lineno = 11, colno = 86, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "utils")),"convertWhiteSpaceToNonBreakingSpace"), "utils[\"convertWhi\"]", context, [runtime.contextOrFrameLookup(context, frame, "content")]))), env.opts.autoescape);
output += "</span>";
;
}
output += "\n        </div>\n    </td>\n</tr>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["line-by-line/wrapper.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<div class=\"d2h-wrapper\">\n    ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "content"), env.opts.autoescape);
output += "\n</div>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();

