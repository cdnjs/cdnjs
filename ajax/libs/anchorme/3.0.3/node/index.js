"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dictionary_1 = require("./dictionary");
var transform_1 = require("./transform");
var regex_1 = require("./regex");
var utils_1 = require("./utils");
var dictionary_2 = require("./dictionary");
var TLDsRgex = new RegExp("^(".concat(dictionary_2.TLDs, ")$"), 'i');
var list = function (input, skipHTML) {
    if (skipHTML === void 0) { skipHTML = true; }
    var found = [];
    var result = null;
    var _loop_1 = function () {
        var start = result.index;
        var end = start + result[0].length;
        var string = result[0];
        var protocol = result[regex_1.iidxes.url.protocol[0]] ||
            result[regex_1.iidxes.url.protocol[1]] ||
            result[regex_1.iidxes.url.protocol[2]];
        // ### Parenthesis problem
        /**
                As we're using the \b to tokenize the URL, sometimes the parenthesis are part of the URL
                and sometimes they are actually the last part, this makes the tokenization stops just
                before them.
                To fix this, we calculate how many parenthesis are open and how many are closed inside
                the URL and based on the number we should be able to know whether the aforementioned
                parenthesis character is part of the URL or not
            */
        if (dictionary_1.closingParenthesis.indexOf(input.charAt(end)) > -1) {
            dictionary_1.parenthesis.forEach(function (str) {
                var opening = str.charAt(0);
                var closing = str.charAt(1);
                if ((0, utils_1.checkParenthesis)(opening, closing, string, input.charAt(end))) {
                    string = string + input.charAt(end);
                    end++;
                }
            });
        }
        // filter out URLs that doesn't have a vaild TLD
        var tld = result[regex_1.iidxes.url.TLD[0]] || result[regex_1.iidxes.url.TLD[1]];
        if (tld && (!protocol) && (!result[regex_1.iidxes.email.protocol]) && (!tld.startsWith("xn--") && !TLDsRgex.test(tld))) {
            return "continue";
        }
        if (skipHTML) {
            // ### HTML problem 1
            /**
                checking whether the token is already inside an HTML element by seeing if it's
                preceded by an HTML attribute that would hold a url (e.g. src, cite ...etc)
            */
            if (['""', "''", "()"].indexOf(input.charAt(start - 1) + input.charAt(end)) !== -1) {
                if ((0, utils_1.isInsideAttribute)(input.substring(start - utils_1.maximumAttrLength - 15, start))) {
                    return "continue";
                }
            }
            // ### HTML problem 2
            /**
                Checking whether the token is the content of an actual anchor
                e.g. <a href="https://something.com">click to go to something.com and have fun</a>
            */
            if (input.substring(end, input.length).indexOf("</a>") > -1 &&
                input.substring(0, start).indexOf("<a") > -1 &&
                (0, utils_1.isInsideAnchorTag)(string, input, end)) {
                return "continue";
            }
            // same thing like above for img src, and we're doing only those two since they are most common
            if (input.substring(0, start).indexOf("<img") > -1 &&
                input.substring(end, input.length).indexOf(">") > -1 &&
                (0, utils_1.isInsideImgSrc)(string, input, end)) {
                return "continue";
            }
        }
        if (result[regex_1.iidxes.isURL]) {
            var host = result[regex_1.iidxes.url.host[0]] || result[regex_1.iidxes.url.host[1]] || result[regex_1.iidxes.url.host[2]];
            var path = (string.match(/(?:[^\/:]|])((?:\/[^?#\s]+)+)/) || [])[1];
            var query = (string.match(/(?:\?)([^#]+)\b/) || [])[1];
            var fragment = (string.match(/(?:#)(.+)\b/) || [])[1];
            var ipv6 = host === undefined ? (string.match(/\/\/\[((?:(?:[a-f\d:]+:+)+[a-f\d]+))\]/) || [])[1] : undefined;
            found.push({
                start: start,
                end: end,
                string: string,
                isURL: true,
                protocol: protocol,
                port: result[regex_1.iidxes.url.port],
                ipv4: result[regex_1.iidxes.url.ipv4],
                ipv6: ipv6,
                host: ipv6 ? '[' + ipv6 + ']' : host,
                confirmedByProtocol: !!protocol,
                path: path || undefined,
                query: query,
                fragment: fragment,
                reason: "url",
            });
        }
        else if (result[regex_1.iidxes.isFile]) {
            var filePath = string.substr(8);
            found.push({
                start: start,
                end: end,
                string: string,
                isFile: true,
                protocol: result[regex_1.iidxes.file.protocol],
                filename: result[regex_1.iidxes.file.fileName],
                filePath: filePath,
                fileDirectory: filePath.substr(0, filePath.length - result[regex_1.iidxes.file.fileName].length),
                reason: "file",
            });
        }
        else if (result[regex_1.iidxes.isEmail]) {
            found.push({
                start: start,
                end: end,
                string: string,
                isEmail: true,
                local: result[regex_1.iidxes.email.local],
                protocol: result[regex_1.iidxes.email.protocol],
                host: result[regex_1.iidxes.email.host],
                reason: "email",
            });
        }
        else {
            found.push({
                start: start,
                end: end,
                string: string,
                reason: "unknown",
            });
        }
    };
    while ((result = regex_1.finalRegex.exec(input)) !== null) {
        _loop_1();
    }
    return found;
};
var anchorme = function (arg) {
    var _a = typeof arg === "string"
        ? { input: arg, options: undefined, extensions: undefined }
        : arg, input = _a.input, options = _a.options, extensions = _a.extensions;
    if (extensions) {
        for (var index = 0; index < extensions.length; index++) {
            var extension = extensions[index];
            input = input.replace(extension.test, extension.transform);
        }
    }
    var found = list(input, (options || {}).skipHTML);
    var newStr = "";
    // the following code isn't very intuitive nor human readable
    // but faster than others
    for (var index = 0; index < found.length; index++) {
        newStr =
            (newStr
                ? newStr
                : index === 0
                    ? input.substring(0, found[index].start)
                    : "") +
                (0, transform_1.transform)(found[index], options) +
                (found[index + 1]
                    ? input.substring(found[index].end, found[index + 1].start)
                    : input.substring(found[index].end));
    }
    return newStr ? newStr : input;
};
anchorme.list = list;
anchorme.validate = {
    ip: function (input) { return regex_1.ipRegex.test(input); },
    email: function (input) { return regex_1.emailRegex.test(input); },
    file: function (input) { return regex_1.fileRegex.test(input); },
    url: function (input) { return regex_1.urlRegex.test(input) || regex_1.ipRegex.test(input); },
};
exports.default = anchorme;
