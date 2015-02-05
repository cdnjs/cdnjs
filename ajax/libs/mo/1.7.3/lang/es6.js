/**
 * Copyright (C) 2010-2014, Dexter.Yy, MIT License
 * vim: et:ts=4:sw=4:sts=4
 */
if (typeof module === 'undefined' 
        && (typeof define !== 'function' || !define.amd)) {
    define = function(mid, deps, factory){
        factory();
    };
}
define("mo/lang/es6", [
    "./es6-utils",
    "./es6-collection",
    "./es6-promise"
], function(_0, _1, _2){});
