/**
 * This class defines the operators that are shared by DomQuery and ComponentQuery
 * @class Ext.util.Operators
 * @private
 */
Ext.ns('Ext.util').Operators = {
// @define Ext.util.Operators
    "=": function(a, v) {
        return a == v;
    },
    "!=": function(a, v) {
        return a != v;
    },
    "^=": function(a, v) {
        return a && a.substr(0, v.length) == v;
    },
    "$=": function(a, v) {
        return a && a.substr(a.length - v.length) == v;
    },
    "*=": function(a, v) {
        return a && a.indexOf(v) !== -1;
    },
    "%=": function(a, v) {
        return (a % v) === 0;
    },
    "|=": function(a, v) {
        return a && (a == v || a.substr(0, v.length + 1) == v + '-');
    },
    "~=": function(a, v) {
        return a && (' ' + a + ' ').indexOf(' ' + v + ' ') != -1;
    }
};