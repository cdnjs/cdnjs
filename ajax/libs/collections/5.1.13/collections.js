
// used exclusively to generate collections.min.js for browsers

var Shim = require("./shim");

/*jshint evil:true */
// reassigning causes eval to not use lexical scope.
var globalEval = eval,
    global = globalEval('this');
/*jshint evil:false */

global.List = require("./list");
global.Set = require("./set");
global.Map = require("./map");
global.MultiMap = require("./multi-map");
global.WeakMap = require("./weak-map");
global.SortedSet = require("./sorted-set");
global.SortedMap = require("./sorted-map");
global.LruSet = require("./lru-set");
global.LruMap = require("./lru-map");
global.SortedArray = require("./sorted-array");
global.SortedArraySet = require("./sorted-array-set");
global.SortedArrayMap = require("./sorted-array-map");
global.FastSet = require("./fast-set");
global.FastMap = require("./fast-map");
global.Dict = require("./dict");
global.Iterator = require("./iterator");

