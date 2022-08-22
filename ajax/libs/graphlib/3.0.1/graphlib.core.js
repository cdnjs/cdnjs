/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./lib/alg/index.js":
/*!**************************!*\
  !*** ./lib/alg/index.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = {\n  components: (__webpack_require__(/*! ./components */ \"./lib/alg/components.ts\").components),\n  dijkstra: (__webpack_require__(/*! ./dijkstra */ \"./lib/alg/dijkstra.ts\").dijkstra),\n  dijkstraAll: (__webpack_require__(/*! ./dijkstra-all */ \"./lib/alg/dijkstra-all.ts\").dijkstraAll),\n  findCycles: (__webpack_require__(/*! ./find-cycles */ \"./lib/alg/find-cycles.ts\").findCycles),\n  floydWarshall: (__webpack_require__(/*! ./floyd-warshall */ \"./lib/alg/floyd-warshall.ts\").floydWarshall),\n  isAcyclic: (__webpack_require__(/*! ./is-acyclic */ \"./lib/alg/is-acyclic.ts\").isAcyclic),\n  postorder: (__webpack_require__(/*! ./postorder */ \"./lib/alg/postorder.ts\").postorder),\n  preorder: (__webpack_require__(/*! ./preorder */ \"./lib/alg/preorder.ts\").preorder),\n  prim: (__webpack_require__(/*! ./prim */ \"./lib/alg/prim.ts\").prim),\n  tarjan: (__webpack_require__(/*! ./tarjan */ \"./lib/alg/tarjan.ts\").tarjan),\n  topsort: (__webpack_require__(/*! ./topsort */ \"./lib/alg/topsort.ts\").topsort)\n};\n\n\n//# sourceURL=webpack://graphlib/./lib/alg/index.js?");

/***/ }),

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/**\n * Copyright (c) 2014, Chris Pettitt\n * All rights reserved.\n *\n * Redistribution and use in source and binary forms, with or without\n * modification, are permitted provided that the following conditions are met:\n *\n * 1. Redistributions of source code must retain the above copyright notice, this\n * list of conditions and the following disclaimer.\n *\n * 2. Redistributions in binary form must reproduce the above copyright notice,\n * this list of conditions and the following disclaimer in the documentation\n * and/or other materials provided with the distribution.\n *\n * 3. Neither the name of the copyright holder nor the names of its contributors\n * may be used to endorse or promote products derived from this software without\n * specific prior written permission.\n *\n * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS \"AS IS\" AND\n * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED\n * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE\n * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE\n * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL\n * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR\n * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER\n * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,\n * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE\n * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\n */\n\nmodule.exports = {\n  Graph: (__webpack_require__(/*! ./graph */ \"./lib/graph.ts\").Graph),\n  json: {\n    read: (__webpack_require__(/*! ./json */ \"./lib/json.ts\").read),\n    write: (__webpack_require__(/*! ./json */ \"./lib/json.ts\").write),\n  },\n  alg: __webpack_require__(/*! ./alg */ \"./lib/alg/index.js\"),\n  version: (__webpack_require__(/*! ./version */ \"./lib/version.ts\").version)\n};\n\n\n//# sourceURL=webpack://graphlib/./lib/index.js?");

/***/ }),

/***/ "./lib/alg/components.ts":
/*!*******************************!*\
  !*** ./lib/alg/components.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.components = void 0;\nfunction components(g) {\n    var visited = {};\n    var cmpts = [];\n    var cmpt;\n    function dfs(v) {\n        if (visited.hasOwnProperty(v))\n            return;\n        visited[v] = true;\n        cmpt.push(v);\n        g.successors(v).forEach(dfs);\n        g.predecessors(v).forEach(dfs);\n    }\n    g.nodes().forEach(function (v) {\n        cmpt = [];\n        dfs(v);\n        if (cmpt.length) {\n            cmpts.push(cmpt);\n        }\n    });\n    return cmpts;\n}\nexports.components = components;\n\n\n//# sourceURL=webpack://graphlib/./lib/alg/components.ts?");

/***/ }),

/***/ "./lib/alg/dfs.ts":
/*!************************!*\
  !*** ./lib/alg/dfs.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.dfs = void 0;\n/*\n * A helper that preforms a pre- or post-order traversal on the input graph\n * and returns the nodes in the order they were visited. If the graph is\n * undirected then this algorithm will navigate using neighbors. If the graph\n * is directed then this algorithm will navigate using successors.\n *\n * Order must be one of \"pre\" or \"post\".\n */\nfunction dfs(g, vOrVs, order) {\n    let vs;\n    if (Array.isArray(vOrVs)) {\n        vs = vOrVs;\n    }\n    else {\n        vs = [vOrVs];\n    }\n    var navigation = (g.isDirected() ? g.successors : g.neighbors).bind(g);\n    var acc = [];\n    var visited = {};\n    vs.forEach(function (v) {\n        if (!g.hasNode(v)) {\n            throw new Error(\"Graph does not have node: \" + v);\n        }\n        doDfs(g, v, order === \"post\", visited, navigation, acc);\n    });\n    return acc;\n}\nexports.dfs = dfs;\nfunction doDfs(g, v, postorder, visited, navigation, acc) {\n    if (!visited.hasOwnProperty(v)) {\n        visited[v] = true;\n        if (!postorder) {\n            acc.push(v);\n        }\n        navigation(v).forEach(function (w) {\n            doDfs(g, w, postorder, visited, navigation, acc);\n        });\n        if (postorder) {\n            acc.push(v);\n        }\n    }\n}\n\n\n//# sourceURL=webpack://graphlib/./lib/alg/dfs.ts?");

/***/ }),

/***/ "./lib/alg/dijkstra-all.ts":
/*!*********************************!*\
  !*** ./lib/alg/dijkstra-all.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.dijkstraAll = void 0;\nconst dijkstra_1 = __webpack_require__(/*! ./dijkstra */ \"./lib/alg/dijkstra.ts\");\nfunction dijkstraAll(g, weightFunc, edgeFunc) {\n    return g.nodes().reduce(function (acc, v) {\n        acc[v] = (0, dijkstra_1.dijkstra)(g, v, weightFunc, edgeFunc);\n        return acc;\n    }, {});\n}\nexports.dijkstraAll = dijkstraAll;\n\n\n//# sourceURL=webpack://graphlib/./lib/alg/dijkstra-all.ts?");

/***/ }),

/***/ "./lib/alg/dijkstra.ts":
/*!*****************************!*\
  !*** ./lib/alg/dijkstra.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.dijkstra = void 0;\nconst priority_queue_1 = __webpack_require__(/*! ../data/priority-queue */ \"./lib/data/priority-queue.ts\");\nvar DEFAULT_WEIGHT_FUNC = () => 1;\nfunction dijkstra(g, source, weightFn = DEFAULT_WEIGHT_FUNC, edgeFn = function (v) { return g.outEdges(v); }) {\n    return runDijkstra(g, String(source), weightFn, edgeFn);\n}\nexports.dijkstra = dijkstra;\nfunction runDijkstra(g, source, weightFn, edgeFn) {\n    var results = {};\n    var pq = new priority_queue_1.PriorityQueue();\n    var v, vEntry;\n    var updateNeighbors = function (edge) {\n        var w = edge.v !== v ? edge.v : edge.w;\n        var wEntry = results[w];\n        var weight = weightFn(edge);\n        var distance = vEntry.distance + weight;\n        if (weight < 0) {\n            throw new Error(\"dijkstra does not allow negative edge weights. \" +\n                \"Bad edge: \" + edge + \" Weight: \" + weight);\n        }\n        if (distance < wEntry.distance) {\n            wEntry.distance = distance;\n            wEntry.predecessor = v;\n            pq.decrease(w, distance);\n        }\n    };\n    g.nodes().forEach(function (v) {\n        var distance = v === source ? 0 : Number.POSITIVE_INFINITY;\n        results[v] = { distance: distance };\n        pq.add(v, distance);\n    });\n    while (pq.size() > 0) {\n        v = pq.removeMin();\n        vEntry = results[v];\n        if (vEntry.distance === Number.POSITIVE_INFINITY) {\n            break;\n        }\n        edgeFn(v).forEach(updateNeighbors);\n    }\n    return results;\n}\n\n\n//# sourceURL=webpack://graphlib/./lib/alg/dijkstra.ts?");

/***/ }),

/***/ "./lib/alg/find-cycles.ts":
/*!********************************!*\
  !*** ./lib/alg/find-cycles.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.findCycles = void 0;\nconst tarjan_1 = __webpack_require__(/*! ./tarjan */ \"./lib/alg/tarjan.ts\");\nfunction findCycles(g) {\n    return (0, tarjan_1.tarjan)(g).filter(function (cmpt) {\n        return cmpt.length > 1 || (cmpt.length === 1 && g.hasEdge(cmpt[0], cmpt[0]));\n    });\n}\nexports.findCycles = findCycles;\n\n\n//# sourceURL=webpack://graphlib/./lib/alg/find-cycles.ts?");

/***/ }),

/***/ "./lib/alg/floyd-warshall.ts":
/*!***********************************!*\
  !*** ./lib/alg/floyd-warshall.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.floydWarshall = void 0;\nvar DEFAULT_WEIGHT_FUNC = () => 1;\nfunction floydWarshall(g, weightFn = DEFAULT_WEIGHT_FUNC, edgeFn = function (v) { return g.outEdges(v); }) {\n    return runFloydWarshall(g, weightFn, edgeFn);\n}\nexports.floydWarshall = floydWarshall;\nfunction runFloydWarshall(g, weightFn, edgeFn) {\n    var results = {};\n    var nodes = g.nodes();\n    nodes.forEach(function (v) {\n        results[v] = {};\n        results[v][v] = { distance: 0 };\n        nodes.forEach(function (w) {\n            if (v !== w) {\n                results[v][w] = { distance: Number.POSITIVE_INFINITY };\n            }\n        });\n        edgeFn(v).forEach(function (edge) {\n            var w = edge.v === v ? edge.w : edge.v;\n            var d = weightFn(edge);\n            results[v][w] = { distance: d, predecessor: v };\n        });\n    });\n    nodes.forEach(function (k) {\n        var rowK = results[k];\n        nodes.forEach(function (i) {\n            var rowI = results[i];\n            nodes.forEach(function (j) {\n                var ik = rowI[k];\n                var kj = rowK[j];\n                var ij = rowI[j];\n                var altDistance = ik.distance + kj.distance;\n                if (altDistance < ij.distance) {\n                    ij.distance = altDistance;\n                    ij.predecessor = kj.predecessor;\n                }\n            });\n        });\n    });\n    return results;\n}\n\n\n//# sourceURL=webpack://graphlib/./lib/alg/floyd-warshall.ts?");

/***/ }),

/***/ "./lib/alg/is-acyclic.ts":
/*!*******************************!*\
  !*** ./lib/alg/is-acyclic.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.isAcyclic = void 0;\nconst topsort_1 = __webpack_require__(/*! ./topsort */ \"./lib/alg/topsort.ts\");\nfunction isAcyclic(g) {\n    try {\n        (0, topsort_1.topsort)(g);\n    }\n    catch (e) {\n        if (e instanceof topsort_1.topsort.CycleException) {\n            return false;\n        }\n        throw e;\n    }\n    return true;\n}\nexports.isAcyclic = isAcyclic;\n\n\n//# sourceURL=webpack://graphlib/./lib/alg/is-acyclic.ts?");

/***/ }),

/***/ "./lib/alg/postorder.ts":
/*!******************************!*\
  !*** ./lib/alg/postorder.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.postorder = void 0;\nconst dfs_1 = __webpack_require__(/*! ./dfs */ \"./lib/alg/dfs.ts\");\nfunction postorder(g, vs) {\n    return (0, dfs_1.dfs)(g, vs, \"post\");\n}\nexports.postorder = postorder;\n\n\n//# sourceURL=webpack://graphlib/./lib/alg/postorder.ts?");

/***/ }),

/***/ "./lib/alg/preorder.ts":
/*!*****************************!*\
  !*** ./lib/alg/preorder.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.preorder = void 0;\nconst dfs_1 = __webpack_require__(/*! ./dfs */ \"./lib/alg/dfs.ts\");\nfunction preorder(g, vs) {\n    return (0, dfs_1.dfs)(g, vs, \"pre\");\n}\nexports.preorder = preorder;\n\n\n//# sourceURL=webpack://graphlib/./lib/alg/preorder.ts?");

/***/ }),

/***/ "./lib/alg/prim.ts":
/*!*************************!*\
  !*** ./lib/alg/prim.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.prim = void 0;\nconst graph_1 = __webpack_require__(/*! ../graph */ \"./lib/graph.ts\");\nconst priority_queue_1 = __webpack_require__(/*! ../data/priority-queue */ \"./lib/data/priority-queue.ts\");\nfunction prim(g, weightFunc) {\n    var result = new graph_1.Graph();\n    var parents = {};\n    var pq = new priority_queue_1.PriorityQueue();\n    var v;\n    function updateNeighbors(edge) {\n        var w = edge.v === v ? edge.w : edge.v;\n        var pri = pq.priority(w);\n        if (pri !== undefined) {\n            var edgeWeight = weightFunc(edge);\n            if (edgeWeight < pri) {\n                parents[w] = v;\n                pq.decrease(w, edgeWeight);\n            }\n        }\n    }\n    if (g.nodeCount() === 0) {\n        return result;\n    }\n    g.nodes().forEach(function (v) {\n        pq.add(v, Number.POSITIVE_INFINITY);\n        result.setNode(v);\n    });\n    // Start from an arbitrary node\n    pq.decrease(g.nodes()[0], 0);\n    var init = false;\n    while (pq.size() > 0) {\n        v = pq.removeMin();\n        if (parents.hasOwnProperty(v)) {\n            result.setEdge(v, parents[v]);\n        }\n        else if (init) {\n            throw new Error(\"Input graph is not connected: \" + g);\n        }\n        else {\n            init = true;\n        }\n        g.nodeEdges(v).forEach(updateNeighbors);\n    }\n    return result;\n}\nexports.prim = prim;\n\n\n//# sourceURL=webpack://graphlib/./lib/alg/prim.ts?");

/***/ }),

/***/ "./lib/alg/tarjan.ts":
/*!***************************!*\
  !*** ./lib/alg/tarjan.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.tarjan = void 0;\nfunction tarjan(g) {\n    var index = 0;\n    var stack = [];\n    var visited = {}; // node id -> { onStack, lowlink, index }\n    var results = [];\n    function dfs(v) {\n        var entry = visited[v] = {\n            onStack: true,\n            lowlink: index,\n            index: index++\n        };\n        stack.push(v);\n        g.successors(v).forEach(function (w) {\n            if (!visited.hasOwnProperty(w)) {\n                dfs(w);\n                entry.lowlink = Math.min(entry.lowlink, visited[w].lowlink);\n            }\n            else if (visited[w].onStack) {\n                entry.lowlink = Math.min(entry.lowlink, visited[w].index);\n            }\n        });\n        if (entry.lowlink === entry.index) {\n            var cmpt = [];\n            var w;\n            do {\n                w = stack.pop();\n                visited[w].onStack = false;\n                cmpt.push(w);\n            } while (v !== w);\n            results.push(cmpt);\n        }\n    }\n    g.nodes().forEach(function (v) {\n        if (!visited.hasOwnProperty(v)) {\n            dfs(v);\n        }\n    });\n    return results;\n}\nexports.tarjan = tarjan;\n\n\n//# sourceURL=webpack://graphlib/./lib/alg/tarjan.ts?");

/***/ }),

/***/ "./lib/alg/topsort.ts":
/*!****************************!*\
  !*** ./lib/alg/topsort.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.topsort = void 0;\ntopsort.CycleException = CycleException;\nfunction topsort(g) {\n    var visited = {};\n    var stack = {};\n    var results = [];\n    function visit(node) {\n        if (stack.hasOwnProperty(node)) {\n            throw new CycleException();\n        }\n        if (!visited.hasOwnProperty(node)) {\n            stack[node] = true;\n            visited[node] = true;\n            g.predecessors(node).forEach(visit);\n            delete stack[node];\n            results.push(node);\n        }\n    }\n    g.sinks().forEach(visit);\n    if (Object.keys(visited).length !== g.nodeCount()) {\n        throw new CycleException();\n    }\n    return results;\n}\nexports.topsort = topsort;\nfunction CycleException() { }\nCycleException.prototype = new Error(); // must be an instance of Error to pass testing\n\n\n//# sourceURL=webpack://graphlib/./lib/alg/topsort.ts?");

/***/ }),

/***/ "./lib/data/priority-queue.ts":
/*!************************************!*\
  !*** ./lib/data/priority-queue.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.PriorityQueue = void 0;\n/**\n * A min-priority queue data structure. This algorithm is derived from Cormen,\n * et al., \"Introduction to Algorithms\". The basic idea of a min-priority\n * queue is that you can efficiently (in O(1) time) get the smallest key in\n * the queue. Adding and removing elements takes O(log n) time. A key can\n * have its priority decreased in O(log n) time.\n */\nclass PriorityQueue {\n    constructor() {\n        this._arr = [];\n        this._keyIndices = {};\n    }\n    /**\n     * Returns the number of elements in the queue. Takes `O(1)` time.\n     */\n    size() {\n        return this._arr.length;\n    }\n    /**\n     * Returns the keys that are in the queue. Takes `O(n)` time.\n     */\n    keys() {\n        return this._arr.map(function (x) { return x.key; });\n    }\n    /**\n     * Returns `true` if **key** is in the queue and `false` if not.\n     */\n    has(key) {\n        return this._keyIndices.hasOwnProperty(key);\n    }\n    /**\n     * Returns the priority for **key**. If **key** is not present in the queue\n     * then this function returns `undefined`. Takes `O(1)` time.\n     */\n    priority(key) {\n        var index = this._keyIndices[key];\n        if (index !== undefined) {\n            return this._arr[index].priority;\n        }\n    }\n    /**\n     * Returns the key for the minimum element in this queue. If the queue is\n     * empty this function throws an Error. Takes `O(1)` time.\n     */\n    min() {\n        if (this.size() === 0) {\n            throw new Error(\"Queue underflow\");\n        }\n        return this._arr[0].key;\n    }\n    /**\n     * Inserts a new key into the priority queue. If the key already exists in\n     * the queue this function returns `false`; otherwise it will return `true`.\n     * Takes `O(n)` time.\n     */\n    add(key, priority) {\n        var keyIndices = this._keyIndices;\n        key = String(key);\n        if (!keyIndices.hasOwnProperty(key)) {\n            var arr = this._arr;\n            var index = arr.length;\n            keyIndices[key] = index;\n            arr.push({ key: key, priority: priority });\n            this._decrease(index);\n            return true;\n        }\n        return false;\n    }\n    /**\n     * Removes and returns the smallest key in the queue. Takes `O(log n)` time.\n     */\n    removeMin() {\n        this._swap(0, this._arr.length - 1);\n        var min = this._arr.pop();\n        delete this._keyIndices[min.key];\n        this._heapify(0);\n        return min.key;\n    }\n    /**\n     * Decreases the priority for **key** to **priority**. If the new priority is\n     * greater than the previous priority, this function will throw an Error.\n     */\n    decrease(key, priority) {\n        var index = this._keyIndices[key];\n        if (priority > this._arr[index].priority) {\n            throw new Error(\"New priority is greater than current priority. \" +\n                \"Key: \" + key + \" Old: \" + this._arr[index].priority + \" New: \" + priority);\n        }\n        this._arr[index].priority = priority;\n        this._decrease(index);\n    }\n    _heapify(i) {\n        var arr = this._arr;\n        var l = 2 * i;\n        var r = l + 1;\n        var largest = i;\n        if (l < arr.length) {\n            largest = arr[l].priority < arr[largest].priority ? l : largest;\n            if (r < arr.length) {\n                largest = arr[r].priority < arr[largest].priority ? r : largest;\n            }\n            if (largest !== i) {\n                this._swap(i, largest);\n                this._heapify(largest);\n            }\n        }\n    }\n    _decrease(index) {\n        var arr = this._arr;\n        var priority = arr[index].priority;\n        var parent;\n        while (index !== 0) {\n            parent = index >> 1;\n            if (arr[parent].priority < priority) {\n                break;\n            }\n            this._swap(index, parent);\n            index = parent;\n        }\n    }\n    _swap(i, j) {\n        var arr = this._arr;\n        var keyIndices = this._keyIndices;\n        var origArrI = arr[i];\n        var origArrJ = arr[j];\n        arr[i] = origArrJ;\n        arr[j] = origArrI;\n        keyIndices[origArrJ.key] = i;\n        keyIndices[origArrI.key] = j;\n    }\n}\nexports.PriorityQueue = PriorityQueue;\n\n\n//# sourceURL=webpack://graphlib/./lib/data/priority-queue.ts?");

/***/ }),

/***/ "./lib/graph.ts":
/*!**********************!*\
  !*** ./lib/graph.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Graph = void 0;\nvar DEFAULT_EDGE_NAME = \"\\x00\";\nvar GRAPH_NODE = \"\\x00\";\nvar EDGE_KEY_DELIM = \"\\x01\";\n// Implementation notes:\n//\n//  * Node id query functions should return string ids for the nodes\n//  * Edge id query functions should return an \"edgeObj\", edge object, that is\n//    composed of enough information to uniquely identify an edge: {v, w, name}.\n//  * Internally we use an \"edgeId\", a stringified form of the edgeObj, to\n//    reference edges. This is because we need a performant way to look these\n//    edges up and, object properties, which have string keys, are the closest\n//    we're going to get to a performant hashtable in JavaScript.\nclass Graph {\n    constructor(opts = {}) {\n        // Defaults to be set when creating a new node\n        this._defaultNodeLabelFn = () => undefined;\n        // Defaults to be set when creating a new edge\n        this._defaultEdgeLabelFn = () => undefined;\n        // v -> label\n        this._nodes = {};\n        // v -> edgeObj\n        this._in = {};\n        // u -> v -> Number\n        this._preds = {};\n        // v -> edgeObj\n        this._out = {};\n        // v -> w -> Number\n        this._sucs = {};\n        // e -> edgeObj\n        this._edgeObjs = {};\n        // e -> label\n        this._edgeLabels = {};\n        /* Number of nodes in the graph. Should only be changed by the implementation. */\n        this._nodeCount = 0;\n        /* Number of edges in the graph. Should only be changed by the implementation. */\n        this._edgeCount = 0;\n        this._isDirected = opts.hasOwnProperty(\"directed\") ? opts.directed : true;\n        this._isMultigraph = opts.hasOwnProperty(\"multigraph\") ? opts.multigraph : false;\n        this._isCompound = opts.hasOwnProperty(\"compound\") ? opts.compound : false;\n        if (this._isCompound) {\n            // v -> parent\n            this._parent = {};\n            // v -> children\n            this._children = {};\n            this._children[GRAPH_NODE] = {};\n        }\n    }\n    /* === Graph functions ========= */\n    /**\n     * Whether graph was created with 'directed' flag set to true or not.\n     */\n    isDirected() {\n        return this._isDirected;\n    }\n    /**\n     * Whether graph was created with 'multigraph' flag set to true or not.\n     */\n    isMultigraph() {\n        return this._isMultigraph;\n    }\n    /**\n     * Whether graph was created with 'compound' flag set to true or not.\n     */\n    isCompound() {\n        return this._isCompound;\n    }\n    /**\n     * Sets the label of the graph.\n     */\n    setGraph(label) {\n        this._label = label;\n        return this;\n    }\n    /**\n     * Gets the graph label.\n     */\n    graph() {\n        if (typeof this._label === 'object') {\n            return Object.assign({}, this._label);\n        }\n        return this._label;\n    }\n    /* === Node functions ========== */\n    /**\n     * Sets the default node label. If newDefault is a function, it will be\n     * invoked ach time when setting a label for a node. Otherwise, this label\n     * will be assigned as default label in case if no label was specified while\n     * setting a node.\n     * Complexity: O(1).\n     */\n    setDefaultNodeLabel(newDefault) {\n        this._defaultNodeLabelFn = newDefault;\n        if (typeof newDefault !== 'function') {\n            this._defaultNodeLabelFn = () => newDefault;\n        }\n        return this;\n    }\n    /**\n     * Gets the number of nodes in the graph.\n     * Complexity: O(1).\n     */\n    nodeCount() {\n        return this._nodeCount;\n    }\n    /**\n     * Gets all nodes of the graph. Note, the in case of compound graph subnodes are\n     * not included in list.\n     * Complexity: O(1).\n     */\n    nodes() {\n        return Object.keys(this._nodes);\n    }\n    /**\n     * Gets list of nodes without in-edges.\n     * Complexity: O(|V|).\n     */\n    sources() {\n        var self = this;\n        return this.nodes().filter(function (v) {\n            return Object.keys(self._in[v]).length === 0;\n        });\n    }\n    /**\n     * Gets list of nodes without out-edges.\n     * Complexity: O(|V|).\n     */\n    sinks() {\n        var self = this;\n        return this.nodes().filter(function (v) {\n            return Object.keys(self._out[v]).length === 0;\n        });\n    }\n    /**\n     * Invokes setNode method for each node in names list.\n     * Complexity: O(|names|).\n     */\n    setNodes(vs, value) {\n        var args = arguments;\n        var self = this;\n        vs.forEach(function (v) {\n            if (args.length > 1) {\n                self.setNode(v, value);\n            }\n            else {\n                self.setNode(v);\n            }\n        });\n        return this;\n    }\n    /**\n     * Creates or updates the value for the node v in the graph. If label is supplied\n     * it is set as the value for the node. If label is not supplied and the node was\n     * created by this call then the default node label will be assigned.\n     * Complexity: O(1).\n     */\n    setNode(v, value) {\n        if (this._nodes.hasOwnProperty(v)) {\n            if (arguments.length > 1) {\n                this._nodes[v] = value;\n            }\n            return this;\n        }\n        this._nodes[v] = arguments.length > 1 ? value : this._defaultNodeLabelFn(v);\n        if (this._isCompound) {\n            this._parent[v] = GRAPH_NODE;\n            this._children[v] = {};\n            this._children[GRAPH_NODE][v] = true;\n        }\n        this._in[v] = {};\n        this._preds[v] = {};\n        this._out[v] = {};\n        this._sucs[v] = {};\n        ++this._nodeCount;\n        return this;\n    }\n    /**\n     * Gets the label of node with specified name.\n     * Complexity: O(|V|).\n     */\n    node(v) {\n        return this._nodes[v];\n    }\n    /**\n     * Detects whether graph has a node with specified name or not.\n     */\n    hasNode(v) {\n        return this._nodes.hasOwnProperty(v);\n    }\n    /**\n     * Remove the node with the name from the graph or do nothing if the node is not in\n     * the graph. If the node was removed this function also removes any incident\n     * edges.\n     * Complexity: O(1).\n     */\n    removeNode(v) {\n        var self = this;\n        if (this._nodes.hasOwnProperty(v)) {\n            var removeEdge = function (e) { self.removeEdge(self._edgeObjs[e]); };\n            delete this._nodes[v];\n            if (this._isCompound) {\n                this._removeFromParentsChildList(v);\n                delete this._parent[v];\n                this.children(v).forEach(function (child) {\n                    self.setParent(child);\n                });\n                delete this._children[v];\n            }\n            Object.keys(this._in[v]).forEach(removeEdge);\n            delete this._in[v];\n            delete this._preds[v];\n            Object.keys(this._out[v]).forEach(removeEdge);\n            delete this._out[v];\n            delete this._sucs[v];\n            --this._nodeCount;\n        }\n        return this;\n    }\n    /**\n     * Sets node p as a parent for node v if it is defined, or removes the\n     * parent for v if p is undefined. Method throws an exception in case of\n     * invoking it in context of noncompound graph.\n     * Average-case complexity: O(1).\n     */\n    setParent(v, parent) {\n        if (!this._isCompound) {\n            throw new Error(\"Cannot set parent in a non-compound graph\");\n        }\n        if (parent === undefined) {\n            parent = GRAPH_NODE;\n        }\n        else {\n            // Coerce parent to string\n            parent += \"\";\n            for (var ancestor = parent; ancestor !== undefined; ancestor = this.parent(ancestor)) {\n                if (ancestor === v) {\n                    throw new Error(\"Setting \" + parent + \" as parent of \" + v +\n                        \" would create a cycle\");\n                }\n            }\n            this.setNode(parent);\n        }\n        this.setNode(v);\n        this._removeFromParentsChildList(v);\n        this._parent[v] = parent;\n        this._children[parent][v] = true;\n        return this;\n    }\n    _removeFromParentsChildList(v) {\n        delete this._children[this._parent[v]][v];\n    }\n    /**\n     * Gets parent node for node v.\n     * Complexity: O(1).\n     */\n    parent(v) {\n        if (this._isCompound) {\n            var parent = this._parent[v];\n            if (parent !== GRAPH_NODE) {\n                return parent;\n            }\n        }\n    }\n    /**\n     * Gets list of direct children of node v.\n     * Complexity: O(1).\n     */\n    children(v = GRAPH_NODE) {\n        if (this._isCompound) {\n            var children = this._children[v];\n            if (children) {\n                return Object.keys(children);\n            }\n        }\n        else if (v === GRAPH_NODE) {\n            return this.nodes();\n        }\n        else if (this.hasNode(v)) {\n            return [];\n        }\n        return;\n    }\n    /**\n     * Return all nodes that are predecessors of the specified node or undefined if node v is not in\n     * the graph. Behavior is undefined for undirected graphs - use neighbors instead.\n     * Complexity: O(|V|).\n     */\n    predecessors(v) {\n        var predsV = this._preds[v];\n        if (predsV) {\n            return Object.keys(predsV);\n        }\n    }\n    /**\n     * Return all nodes that are successors of the specified node or undefined if node v is not in\n     * the graph. Behavior is undefined for undirected graphs - use neighbors instead.\n     * Complexity: O(|V|).\n     */\n    successors(v) {\n        var sucsV = this._sucs[v];\n        if (sucsV) {\n            return Object.keys(sucsV);\n        }\n    }\n    /**\n     * Return all nodes that are predecessors or successors of the specified node or undefined if\n     * node v is not in the graph.\n     * Complexity: O(|V|).\n     */\n    neighbors(v) {\n        var preds = this.predecessors(v);\n        if (preds) {\n            const union = new Set(preds);\n            for (const succ of this.successors(v)) {\n                union.add(succ);\n            }\n            return Array.from(union.values());\n        }\n    }\n    isLeaf(v) {\n        var neighbors;\n        if (this.isDirected()) {\n            neighbors = this.successors(v);\n        }\n        else {\n            neighbors = this.neighbors(v);\n        }\n        return neighbors.length === 0;\n    }\n    /**\n     * Creates new graph with nodes filtered via filter. Edges incident to rejected node\n     * are also removed. In case of compound graph, if parent is rejected by filter,\n     * than all its children are rejected too.\n     * Average-case complexity: O(|E|+|V|).\n     */\n    filterNodes(filter) {\n        var copy = new Graph({\n            directed: this._isDirected,\n            multigraph: this._isMultigraph,\n            compound: this._isCompound\n        });\n        copy.setGraph(this.graph());\n        var self = this;\n        Object.entries(this._nodes).forEach(function ([v, value]) {\n            if (filter(v)) {\n                copy.setNode(v, value);\n            }\n        });\n        Object.values(this._edgeObjs).forEach(function (e) {\n            if (copy.hasNode(e.v) && copy.hasNode(e.w)) {\n                copy.setEdge(e, self.edge(e));\n            }\n        });\n        var parents = {};\n        function findParent(v) {\n            var parent = self.parent(v);\n            if (parent === undefined || copy.hasNode(parent)) {\n                parents[v] = parent;\n                return parent;\n            }\n            else if (parent in parents) {\n                return parents[parent];\n            }\n            else {\n                return findParent(parent);\n            }\n        }\n        if (this._isCompound) {\n            copy.nodes().forEach(function (v) {\n                copy.setParent(v, findParent(v));\n            });\n        }\n        return copy;\n    }\n    /* === Edge functions ========== */\n    /**\n     * Sets the default edge label or factory function. This label will be\n     * assigned as default label in case if no label was specified while setting\n     * an edge or this function will be invoked each time when setting an edge\n     * with no label specified and returned value * will be used as a label for edge.\n     * Complexity: O(1).\n     */\n    setDefaultEdgeLabel(newDefault) {\n        this._defaultEdgeLabelFn = newDefault;\n        if (typeof newDefault !== 'function') {\n            this._defaultEdgeLabelFn = () => newDefault;\n        }\n        return this;\n    }\n    /**\n     * Gets the number of edges in the graph.\n     * Complexity: O(1).\n     */\n    edgeCount() {\n        return this._edgeCount;\n    }\n    /**\n     * Gets edges of the graph. In case of compound graph subgraphs are not considered.\n     * Complexity: O(|E|).\n     */\n    edges() {\n        return Object.values(this._edgeObjs);\n    }\n    /**\n     * Establish an edges path over the nodes in nodes list. If some edge is already\n     * exists, it will update its label, otherwise it will create an edge between pair\n     * of nodes with label provided or default label if no label provided.\n     * Complexity: O(|nodes|).\n     */\n    setPath(vs, value) {\n        var self = this;\n        var args = arguments;\n        vs.reduce(function (v, w) {\n            if (args.length > 1) {\n                self.setEdge(v, w, value);\n            }\n            else {\n                self.setEdge(v, w);\n            }\n            return w;\n        });\n        return this;\n    }\n    /**\n     * Creates or updates the label for the edge (v, w) with the optionally supplied\n     * name. If label is supplied it is set as the value for the edge. If label is not\n     * supplied and the edge was created by this call then the default edge label will\n     * be assigned. The name parameter is only useful with multigraphs.\n     */\n    setEdge(vOrEdge, wOrValue, _label, _name) {\n        var v, w, name, value;\n        var valueSpecified = false;\n        var arg0 = arguments[0];\n        if (typeof arg0 === \"object\" && arg0 !== null && \"v\" in arg0) {\n            v = arg0.v;\n            w = arg0.w;\n            name = arg0.name;\n            if (arguments.length === 2) {\n                value = arguments[1];\n                valueSpecified = true;\n            }\n        }\n        else {\n            v = arg0;\n            w = arguments[1];\n            name = arguments[3];\n            if (arguments.length > 2) {\n                value = arguments[2];\n                valueSpecified = true;\n            }\n        }\n        v = \"\" + v;\n        w = \"\" + w;\n        if (name !== undefined) {\n            name = \"\" + name;\n        }\n        var e = edgeArgsToId(this._isDirected, v, w, name);\n        if (this._edgeLabels.hasOwnProperty(e)) {\n            if (valueSpecified) {\n                this._edgeLabels[e] = value;\n            }\n            return this;\n        }\n        if (name !== undefined && !this._isMultigraph) {\n            throw new Error(\"Cannot set a named edge when isMultigraph = false\");\n        }\n        // It didn't exist, so we need to create it.\n        // First ensure the nodes exist.\n        this.setNode(v);\n        this.setNode(w);\n        this._edgeLabels[e] = valueSpecified ? value : this._defaultEdgeLabelFn(v, w, name);\n        var edgeObj = edgeArgsToObj(this._isDirected, v, w, name);\n        // Ensure we add undirected edges in a consistent way.\n        v = edgeObj.v;\n        w = edgeObj.w;\n        Object.freeze(edgeObj);\n        this._edgeObjs[e] = edgeObj;\n        incrementOrInitEntry(this._preds[w], v);\n        incrementOrInitEntry(this._sucs[v], w);\n        this._in[w][e] = edgeObj;\n        this._out[v][e] = edgeObj;\n        this._edgeCount++;\n        return this;\n    }\n    /**\n     * Gets the label for the specified edge.\n     * Complexity: O(1).\n     */\n    edge(vOrEdge, w, name) {\n        var e = (arguments.length === 1\n            ? edgeObjToId(this._isDirected, arguments[0])\n            : edgeArgsToId(this._isDirected, vOrEdge, w, name));\n        return this._edgeLabels[e];\n    }\n    /**\n     * Detects whether the graph contains specified edge or not. No subgraphs are considered.\n     * Complexity: O(1).\n     */\n    hasEdge(vOrEdge, w, name) {\n        var e = (arguments.length === 1\n            ? edgeObjToId(this._isDirected, arguments[0])\n            : edgeArgsToId(this._isDirected, vOrEdge, w, name));\n        return this._edgeLabels.hasOwnProperty(e);\n    }\n    /**\n     * Removes the specified edge from the graph. No subgraphs are considered.\n     * Complexity: O(1).\n     */\n    removeEdge(vOrEdge, w, name) {\n        var e = (arguments.length === 1\n            ? edgeObjToId(this._isDirected, arguments[0])\n            : edgeArgsToId(this._isDirected, vOrEdge, w, name));\n        var edge = this._edgeObjs[e];\n        if (edge) {\n            const v = edge.v;\n            const w = edge.w;\n            delete this._edgeLabels[e];\n            delete this._edgeObjs[e];\n            decrementOrRemoveEntry(this._preds[w], v);\n            decrementOrRemoveEntry(this._sucs[v], w);\n            delete this._in[w][e];\n            delete this._out[v][e];\n            this._edgeCount--;\n        }\n        return this;\n    }\n    /**\n     * Return all edges that point to the node v. Optionally filters those edges down to just those\n     * coming from node u. Behavior is undefined for undirected graphs - use nodeEdges instead.\n     * Complexity: O(|E|).\n     */\n    inEdges(v, u) {\n        var inV = this._in[v];\n        if (inV) {\n            var edges = Object.values(inV);\n            if (!u) {\n                return edges;\n            }\n            return edges.filter(function (edge) { return edge.v === u; });\n        }\n    }\n    /**\n     * Return all edges that are pointed at by node v. Optionally filters those edges down to just\n     * those point to w. Behavior is undefined for undirected graphs - use nodeEdges instead.\n     * Complexity: O(|E|).\n     */\n    outEdges(v, w) {\n        var outV = this._out[v];\n        if (outV) {\n            var edges = Object.values(outV);\n            if (!w) {\n                return edges;\n            }\n            return edges.filter(function (edge) { return edge.w === w; });\n        }\n    }\n    /**\n     * Returns all edges to or from node v regardless of direction. Optionally filters those edges\n     * down to just those between nodes v and w regardless of direction.\n     * Complexity: O(|E|).\n     */\n    nodeEdges(v, w) {\n        var inEdges = this.inEdges(v, w);\n        if (inEdges) {\n            return inEdges.concat(this.outEdges(v, w));\n        }\n    }\n}\nexports.Graph = Graph;\nfunction incrementOrInitEntry(map, k) {\n    if (map[k]) {\n        map[k]++;\n    }\n    else {\n        map[k] = 1;\n    }\n}\nfunction decrementOrRemoveEntry(map, k) {\n    if (!--map[k]) {\n        delete map[k];\n    }\n}\nfunction edgeArgsToId(isDirected, v_, w_, name) {\n    var v = \"\" + v_;\n    var w = \"\" + w_;\n    if (!isDirected && v > w) {\n        var tmp = v;\n        v = w;\n        w = tmp;\n    }\n    return v + EDGE_KEY_DELIM + w + EDGE_KEY_DELIM +\n        (name === undefined ? DEFAULT_EDGE_NAME : name);\n}\nfunction edgeArgsToObj(isDirected, v_, w_, name) {\n    var v = \"\" + v_;\n    var w = \"\" + w_;\n    if (!isDirected && v > w) {\n        var tmp = v;\n        v = w;\n        w = tmp;\n    }\n    var edgeObj = { v: v, w: w };\n    if (name) {\n        edgeObj.name = name;\n    }\n    return edgeObj;\n}\nfunction edgeObjToId(isDirected, edgeObj) {\n    return edgeArgsToId(isDirected, edgeObj.v, edgeObj.w, edgeObj.name);\n}\n\n\n//# sourceURL=webpack://graphlib/./lib/graph.ts?");

/***/ }),

/***/ "./lib/json.ts":
/*!*********************!*\
  !*** ./lib/json.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.read = exports.write = void 0;\nconst graph_1 = __webpack_require__(/*! ./graph */ \"./lib/graph.ts\");\n/**\n * Creates a JSON representation of the graph that can be serialized to a string with\n * JSON.stringify. The graph can later be restored using json.read.\n */\nfunction write(g) {\n    var json = {\n        options: {\n            directed: g.isDirected(),\n            multigraph: g.isMultigraph(),\n            compound: g.isCompound()\n        },\n        nodes: writeNodes(g),\n        edges: writeEdges(g)\n    };\n    if (g.graph() !== undefined) {\n        json.value = g.graph();\n    }\n    return json;\n}\nexports.write = write;\nfunction writeNodes(g) {\n    return g.nodes().map(function (v) {\n        var nodeValue = g.node(v);\n        var parent = g.parent(v);\n        var node = { v: v };\n        if (nodeValue !== undefined) {\n            node.value = nodeValue;\n        }\n        if (parent !== undefined) {\n            node.parent = parent;\n        }\n        return node;\n    });\n}\nfunction writeEdges(g) {\n    return g.edges().map(function (e) {\n        var edgeValue = g.edge(e);\n        var edge = { v: e.v, w: e.w };\n        if (e.name !== undefined) {\n            edge.name = e.name;\n        }\n        if (edgeValue !== undefined) {\n            edge.value = edgeValue;\n        }\n        return edge;\n    });\n}\n/**\n * Takes JSON as input and returns the graph representation.\n *\n * @example\n * var g2 = graphlib.json.read(JSON.parse(str));\n * g2.nodes();\n * // ['a', 'b']\n * g2.edges()\n * // [ { v: 'a', w: 'b' } ]\n */\nfunction read(json) {\n    var g = new graph_1.Graph(json.options).setGraph(json.value);\n    json.nodes.forEach(function (entry) {\n        g.setNode(entry.v, entry.value);\n        if (entry.parent) {\n            g.setParent(entry.v, entry.parent);\n        }\n    });\n    json.edges.forEach(function (entry) {\n        g.setEdge({ v: entry.v, w: entry.w, name: entry.name }, entry.value);\n    });\n    return g;\n}\nexports.read = read;\n\n\n//# sourceURL=webpack://graphlib/./lib/json.ts?");

/***/ }),

/***/ "./lib/version.ts":
/*!************************!*\
  !*** ./lib/version.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.version = void 0;\nexports.version = '3.0.0';\n\n\n//# sourceURL=webpack://graphlib/./lib/version.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./lib/index.js");
/******/ 	graphlib = __webpack_exports__;
/******/ 	
/******/ })()
;