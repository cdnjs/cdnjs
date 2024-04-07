"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iidxes = exports.urlRegex = exports.fileRegex = exports.emailRegex = exports.ipRegex = exports.finalRegex = exports.final2 = exports.final1 = exports.file = exports.url = exports.email = void 0;
var dictionary_1 = require("./dictionary");
var emailAddress = "([\\w!#$%&'*+=?^`{|}~-]+(?:\\.[\\w!#$%&'*+=?^`{|}~-]+)*)";
var domain = "(?:(?:(?:[a-z\\d]|[a-z\\d][\\w\\-]*[a-z\\d]))\\.)+(xn--[a-z\\d]{2,}|[a-z]{2,})(?=[^.]|\\b)";
var allowedInPath = "\\w\\-.~\\!$&*+,;=:@%'\"\\[\\]()?#";
var path = "((?:/|\\?)(?:([".concat(allowedInPath).concat(dictionary_1.nonLatinAlphabetRanges, "\\/](?:[\\w\\-~+=#&\\/").concat(dictionary_1.nonLatinAlphabetRanges, "]|\\b)+)*)+)");
var ipv4 = "((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?))";
var ipv6 = "\\[(?:(?:[a-f\\d:]+:+)+[a-f\\d]+)\\]";
var port = "(:(\\d{1,5}))?";
var protocol = "(ht{2}ps?:|ftps?:)\\/\\/";
var confirmedByProtocol = "(".concat(protocol, ")\\S+\\b");
var fqdn = "(((".concat(protocol, ")?(").concat(domain, "|").concat(ipv4, ")(?=\\b|_)").concat(port, ")|(?:").concat(confirmedByProtocol, "))");
exports.email = "\\b(mailto:)?".concat(emailAddress, "@(").concat(domain, "|").concat(ipv4, ")");
exports.url = "(".concat(fqdn, ")").concat(path, "?");
exports.file = "(file:\\/\\/\\/)(?:[a-z]+:(?:\\/|\\\\)+)?([\\w.]+(?:[\\/\\\\]?)+)+";
// since safari doesn't like lookbehind, we're trying an alternative
exports.final1 = "(?<=\\b|_)((".concat(exports.email, ")|(").concat(exports.file, ")|(").concat(exports.url, "))(\\b)?");
exports.final2 = "((\\b)(".concat(exports.email, ")|(\\b)(").concat(exports.file, ")|(\\b)(").concat(exports.url, "))(\\b)?");
exports.finalRegex = new RegExp(exports.final2, "gi");
try {
    exports.finalRegex = new RegExp(exports.final1, "gi");
}
catch (e) {
    exports.finalRegex = new RegExp(exports.final2, "gi");
}
// for validation purposes
exports.ipRegex = new RegExp("^(".concat(ipv4, "|").concat(ipv6, ")$"), "i");
exports.emailRegex = new RegExp("^(".concat(exports.email, ")$"), "i");
exports.fileRegex = new RegExp("^(".concat(exports.file, ")$"), "i");
exports.urlRegex = new RegExp("^(".concat(exports.url, ")$"), "i");
// identifying parts of the link
// the initial value of this object is precomputed.
// https://github.com/alexcorvi/anchorme.js/blob/098843bc0d042601cff592c4f8c9f6d0424c09cd/src/regex.ts
var iidxes = { "isFile": 8, "file": { "fileName": 10, "protocol": 9 }, "isEmail": 2, "email": { "protocol": 3, "local": 4, "host": 5 }, "isURL": 11, "url": { "TLD": [18, 6], "protocol": [15, 22], "host": [17], "ipv4": 19, "byProtocol": 13, "port": 21, "protocolWithDomain": 12, "path": 24 } };
exports.iidxes = iidxes;
