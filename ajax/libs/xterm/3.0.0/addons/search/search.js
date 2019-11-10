"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SearchHelper_1 = require("./SearchHelper");
function findNext(terminal, term) {
    if (!terminal._searchHelper) {
        terminal.searchHelper = new SearchHelper_1.SearchHelper(terminal);
    }
    return terminal.searchHelper.findNext(term);
}
exports.findNext = findNext;
;
function findPrevious(terminal, term) {
    if (!terminal._searchHelper) {
        terminal.searchHelper = new SearchHelper_1.SearchHelper(terminal);
    }
    return terminal.searchHelper.findPrevious(term);
}
exports.findPrevious = findPrevious;
;
function apply(terminalConstructor) {
    terminalConstructor.prototype.findNext = function (term) {
        return findNext(this, term);
    };
    terminalConstructor.prototype.findPrevious = function (term) {
        return findPrevious(this, term);
    };
}
exports.apply = apply;
//# sourceMappingURL=search.js.map
