"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils = require("../util/utils");
var SPLIT_REG_EXP = /[[\]]/g;
/**
* Returns the value of the path or
* undefined if the path can't be resolved
*/
function get(data, path, deepCopy) {
    var tokens = tokenize(path);
    var value = data;
    for (var i = 0; i < tokens.length; i++) {
        if (value === undefined) {
            return undefined;
        }
        if (typeof value !== 'object') {
            throw new Error('invalid data or path');
        }
        value = value[tokens[i]];
    }
    return deepCopy !== false ? utils.deepCopy(value) : value;
}
exports.get = get;
/**
 * This class allows to set or get specific
 * values within a json data structure using
 * string-based paths
 */
function setValue(root, path, value) {
    if (path === null) {
        return value;
    }
    var tokens = tokenize(path);
    var rootCopy = utils.deepCopy(root);
    var valueCopy = utils.deepCopy(value);
    var node = rootCopy;
    var i;
    for (i = 0; i < tokens.length - 1; i++) {
        var token = tokens[i];
        if (node[token] !== undefined && node[token] !== null && typeof node[token] === 'object') {
            node = node[token];
        }
        else if (typeof tokens[i + 1] === 'number') {
            var array = new Array(tokens[i + 1]);
            array.fill(null);
            node = node[token] = array;
        }
        else {
            node = node[token] = {};
        }
    }
    if (value === undefined) {
        delete node[tokens[i]];
    }
    else {
        node[tokens[i]] = valueCopy;
    }
    return rootCopy;
}
exports.setValue = setValue;
/**
 * Parses the path. Splits it into
 * keys for objects and indices for arrays.
 */
function tokenize(path) {
    if (path === null) {
        return [];
    }
    var tokens = [];
    var parts = path.split('.');
    for (var i = 0; i < parts.length; i++) {
        var part = parts[i].trim();
        if (part.length === 0) {
            continue;
        }
        var arrayIndexes = part.split(SPLIT_REG_EXP);
        if (arrayIndexes.length === 0) {
            // TODO
            continue;
        }
        tokens.push(arrayIndexes[0]);
        for (var j = 1; j < arrayIndexes.length; j++) {
            if (arrayIndexes[j].length === 0) {
                continue;
            }
            tokens.push(Number(arrayIndexes[j]));
        }
    }
    return tokens;
}
