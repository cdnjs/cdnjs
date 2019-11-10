/*!
 * pts.js - Copyright © 2017-2018 William Ngan and contributors.
 * Licensed under Apache 2.0 License.
 * See https://github.com/williamngan/pts for details.
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Pts"] = factory();
	else
		root["Pts"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Source code licensed under Apache License 2.0. 
// Copyright © 2017 William Ngan. (https://github.com/williamngan/pts)
Object.defineProperty(exports, "__esModule", { value: true });
const Util_1 = __webpack_require__(1);
const Num_1 = __webpack_require__(3);
const LinearAlgebra_1 = __webpack_require__(4);
exports.PtBaseArray = Float32Array;
/**
 * Pt is a subclass of Float32Array with additional properties and functions to support vector and geometric calculations.
 * See [Pt guide](../../guide/Pt-0200.html) for details
 */
class Pt extends exports.PtBaseArray {
    /**
     * Create a Pt. If no parameter is provided, this will instantiate a Pt with 2 dimensions [0, 0].
     *
     * Note that `new Pt(3)` will only instantiate Pt with length of 3 (ie, same as `new Float32Array(3)` ). If you need a Pt with 1 dimension of value 3, use `new Pt([3])`.
     * @example `new Pt()`, `new Pt(1,2,3,4,5)`, `new Pt([1,2])`, `new Pt({x:0, y:1})`, `new Pt(pt)`
     * @param args a list of numeric parameters, an array of numbers, or an object with {x,y,z,w} properties
     */
    constructor(...args) {
        if (args.length === 1 && typeof args[0] == "number") {
            super(args[0]); // init with the TypedArray's length. Needed this in order to make ".map", ".slice" etc work.
        }
        else {
            super((args.length > 0) ? Util_1.Util.getArgs(args) : [0, 0]);
        }
    }
    static make(dimensions, defaultValue = 0, randomize = false) {
        let p = new exports.PtBaseArray(dimensions);
        if (defaultValue)
            p.fill(defaultValue);
        if (randomize) {
            for (let i = 0, len = p.length; i < len; i++) {
                p[i] = p[i] * Math.random();
            }
        }
        return new Pt(p);
    }
    get id() { return this._id; }
    set id(s) { this._id = s; }
    get x() { return this[0]; }
    get y() { return this[1]; }
    get z() { return this[2]; }
    get w() { return this[3]; }
    set x(n) { this[0] = n; }
    set y(n) { this[1] = n; }
    set z(n) { this[2] = n; }
    set w(n) { this[3] = n; }
    /**
     * Clone this Pt
     */
    clone() {
        return new Pt(this);
    }
    /**
     * Check if another Pt is equal to this Pt, within a threshold
     * @param p another Pt to compare with
     * @param threshold a threshold value within which the two Pts are considered equal. Default is 0.000001.
     */
    equals(p, threshold = 0.000001) {
        for (let i = 0, len = this.length; i < len; i++) {
            if (Math.abs(this[i] - p[i]) > threshold)
                return false;
        }
        return true;
    }
    /**
     * Update the values of this Pt
     * @param args a list of numbers, an array of number, or an object with {x,y,z,w} properties
     */
    to(...args) {
        let p = Util_1.Util.getArgs(args);
        for (let i = 0, len = Math.min(this.length, p.length); i < len; i++) {
            this[i] = p[i];
        }
        return this;
    }
    /**
     * Like `to()` but returns a new Pt
     * @param args a list of numbers, an array of number, or an object with {x,y,z,w} properties
     */
    $to(...args) {
        return this.clone().to(...args);
    }
    /**
     * Update the values of this Pt to point at a specific angle
     * @param radian target angle in radian
     * @param magnitude Optional magnitude if known. If not provided, it'll calculate and use this Pt's magnitude.
     * @param anchorFromPt If `true`, translate to new position from current position. Default is `false` which update the position from origin (0,0);
     */
    toAngle(radian, magnitude, anchorFromPt = false) {
        let m = (magnitude != undefined) ? magnitude : this.magnitude();
        let change = [Math.cos(radian) * m, Math.sin(radian) * m];
        return (anchorFromPt) ? this.add(change) : this.to(change);
    }
    /**
     * Create an operation using this Pt, passing this Pt into a custom function's first parameter. See the [Op guide](../../guide/Op-0400.html) for details.
     * For example: `let myOp = pt.op( fn ); let result = myOp( [1,2,3] );`
     * @param fn any function that takes a Pt as its first parameter
     * @returns a resulting function that takes other parameters required in `fn`
     */
    op(fn) {
        let self = this;
        return (...params) => {
            return fn(self, ...params);
        };
    }
    /**
     * This combines a series of operations into an array. See `op()` for details.
     * For example: `let myOps = pt.ops([fn1, fn2, fn3]); let results = myOps.map( (op) => op([1,2,3]) );`
     * @param fns an array of functions for `op`
     * @returns an array of resulting functions
     */
    ops(fns) {
        let _ops = [];
        for (let i = 0, len = fns.length; i < len; i++) {
            _ops.push(this.op(fns[i]));
        }
        return _ops;
    }
    /**
     * Take specific dimensional values from this Pt and create a new Pt
     * @param axis a string such as "xy" (use Const.xy) or an array to specify index for two dimensions
     */
    $take(axis) {
        let p = [];
        for (let i = 0, len = axis.length; i < len; i++) {
            p.push(this[axis[i]] || 0);
        }
        return new Pt(p);
    }
    /**
     * Concatenate this Pt with addition dimensional values and return as a new Pt
     * @param args a list of numbers, an array of number, or an object with {x,y,z,w} properties
     */
    $concat(...args) {
        return new Pt(this.toArray().concat(Util_1.Util.getArgs(args)));
    }
    /**
     * Add scalar or vector values to this Pt
     * @param args a list of numbers, an array of number, or an object with {x,y,z,w} properties
     */
    add(...args) {
        (args.length === 1 && typeof args[0] == "number") ? LinearAlgebra_1.Vec.add(this, args[0]) : LinearAlgebra_1.Vec.add(this, Util_1.Util.getArgs(args));
        return this;
    }
    /**
     * Like `add`, but returns result as a new Pt
     */
    $add(...args) { return this.clone().add(...args); }
    /**
     * Subtract scalar or vector values from this Pt
     * @param args a list of numbers, an array of number, or an object with {x,y,z,w} properties
     */
    subtract(...args) {
        (args.length === 1 && typeof args[0] == "number") ? LinearAlgebra_1.Vec.subtract(this, args[0]) : LinearAlgebra_1.Vec.subtract(this, Util_1.Util.getArgs(args));
        return this;
    }
    /**
     * Like `subtract`, but returns result as a new Pt
     */
    $subtract(...args) { return this.clone().subtract(...args); }
    /**
     * Multiply scalar or vector values (as element-wise) with this Pt.
     * @param args a list of numbers, an array of number, or an object with {x,y,z,w} properties
     */
    multiply(...args) {
        (args.length === 1 && typeof args[0] == "number") ? LinearAlgebra_1.Vec.multiply(this, args[0]) : LinearAlgebra_1.Vec.multiply(this, Util_1.Util.getArgs(args));
        return this;
    }
    /**
     * Like `multiply`, but returns result as a new Pt
     */
    $multiply(...args) { return this.clone().multiply(...args); }
    /**
     * Divide this Pt over scalar or vector values (as element-wise)
     * @param args a list of numbers, an array of number, or an object with {x,y,z,w} properties
     */
    divide(...args) {
        (args.length === 1 && typeof args[0] == "number") ? LinearAlgebra_1.Vec.divide(this, args[0]) : LinearAlgebra_1.Vec.divide(this, Util_1.Util.getArgs(args));
        return this;
    }
    /**
     * Like `divide`, but returns result as a new Pt
     */
    $divide(...args) { return this.clone().divide(...args); }
    /**
     * Get the sqaured distance (magnitude) of this Pt from origin
     */
    magnitudeSq() { return LinearAlgebra_1.Vec.dot(this, this); }
    /**
     * Get the distance (magnitude) of this Pt from origin
     */
    magnitude() { return LinearAlgebra_1.Vec.magnitude(this); }
    /**
     * Convert to a unit vector, which is a normalized vector whose magnitude equals 1.
     * @param magnitude Optional: if the magnitude is known, pass it as a parameter to avoid duplicate calculation.
     */
    unit(magnitude = undefined) {
        LinearAlgebra_1.Vec.unit(this, magnitude);
        return this;
    }
    /**
     * Get a unit vector from this Pt
     */
    $unit(magnitude = undefined) { return this.clone().unit(magnitude); }
    /**
     * Dot product of this Pt and another Pt
     * @param args a list of numbers, an array of number, or an object with {x,y,z,w} properties
     */
    dot(...args) { return LinearAlgebra_1.Vec.dot(this, Util_1.Util.getArgs(args)); }
    /**
     * 2D Cross product of this Pt and another Pt. Return results as a new Pt.
     * @param args a list of numbers, an array of number, or an object with {x,y,z,w} properties
     */
    cross2D(...args) { return LinearAlgebra_1.Vec.cross2D(this, Util_1.Util.getArgs(args)); }
    /**
     * 3D Cross product of this Pt and another Pt. Return results as a new Pt.
     * @param args a list of numbers, an array of number, or an object with {x,y,z,w} properties
     */
    $cross(...args) { return LinearAlgebra_1.Vec.cross(this, Util_1.Util.getArgs(args)); }
    /**
     * Calculate vector projection of this Pt on another Pt. Returns result as a new Pt.
     * @param p a list of numbers, an array of number, or an object with {x,y,z,w} properties
     */
    $project(p) {
        let m = p.magnitude();
        let a = this.$unit();
        let b = p.$divide(m);
        let dot = a.dot(b);
        return a.multiply(m * dot);
    }
    /**
     * Absolute values for all values in this pt
     */
    abs() {
        LinearAlgebra_1.Vec.abs(this);
        return this;
    }
    /**
     * Get a new Pt with absolute values of this Pt
     */
    $abs() {
        return this.clone().abs();
    }
    /**
     * Floor values for all values in this pt
     */
    floor() {
        LinearAlgebra_1.Vec.floor(this);
        return this;
    }
    /**
     * Get a new Pt with floor values of this Pt
     */
    $floor() {
        return this.clone().floor();
    }
    /**
     * Ceil values for all values in this pt
     */
    ceil() {
        LinearAlgebra_1.Vec.ceil(this);
        return this;
    }
    /**
     * Get a new Pt with ceil values of this Pt
     */
    $ceil() {
        return this.clone().ceil();
    }
    /**
     * Round values for all values in this pt
     */
    round() {
        LinearAlgebra_1.Vec.round(this);
        return this;
    }
    /**
     * Get a new Pt with round values of this Pt
     */
    $round() {
        return this.clone().round();
    }
    /**
     * Find the minimum value across all dimensions in this Pt
     * @returns an object with `value` and `index` which returns the minimum value and its dimensional index
     */
    minValue() {
        return LinearAlgebra_1.Vec.min(this);
    }
    /**
     * Find the maximum value across all dimensions in this Pt
     * @returns an object with `value` and `index` which returns the maximum value and its dimensional index
     */
    maxValue() {
        return LinearAlgebra_1.Vec.max(this);
    }
    /**
     * Get a new Pt that has the minimum dimensional values of this Pt and another Pt
     * @param args a list of numbers, an array of number, or an object with {x,y,z,w} properties
     */
    $min(...args) {
        let p = Util_1.Util.getArgs(args);
        let m = this.clone();
        for (let i = 0, len = Math.min(this.length, p.length); i < len; i++) {
            m[i] = Math.min(this[i], p[i]);
        }
        return m;
    }
    /**
     * Get a new Pt that has the maximum dimensional values of this Pt and another Pt
     * @param args a list of numbers, an array of number, or an object with {x,y,z,w} properties
     */
    $max(...args) {
        let p = Util_1.Util.getArgs(args);
        let m = this.clone();
        for (let i = 0, len = Math.min(this.length, p.length); i < len; i++) {
            m[i] = Math.max(this[i], p[i]);
        }
        return m;
    }
    /**
     * Get angle of this vector from origin
     * @param axis a string such as "xy" (use Const.xy) or an array to specify index for two dimensions
     */
    angle(axis = Util_1.Const.xy) {
        return Math.atan2(this[axis[1]], this[axis[0]]);
    }
    /**
     * Get the angle between this and another Pt
     * @param p the other Pt
     * @param axis a string such as "xy" (use Const.xy) or an array to specify index for two dimensions
     */
    angleBetween(p, axis = Util_1.Const.xy) {
        return Num_1.Geom.boundRadian(this.angle(axis)) - Num_1.Geom.boundRadian(p.angle(axis));
    }
    /**
     * Scale this Pt from origin or from an anchor point
     * @param scale scale ratio
     * @param anchor optional anchor point to scale from
     */
    scale(scale, anchor) {
        Num_1.Geom.scale(this, scale, anchor || Pt.make(this.length, 0));
        return this;
    }
    /**
     * Rotate this Pt from origin or from an anchor point in 2D
     * @param angle rotate angle
     * @param anchor optional anchor point to scale from
     * @param axis optional string such as "yz" to specify a 2D plane
     */
    rotate2D(angle, anchor, axis) {
        Num_1.Geom.rotate2D(this, angle, anchor || Pt.make(this.length, 0), axis);
        return this;
    }
    /**
     * Shear this Pt from origin or from an anchor point in 2D
     * @param shear shearing value which can be a number or an array of 2 numbers
     * @param anchor optional anchor point to scale from
     * @param axis optional string such as "yz" to specify a 2D plane
     */
    shear2D(scale, anchor, axis) {
        Num_1.Geom.shear2D(this, scale, anchor || Pt.make(this.length, 0), axis);
        return this;
    }
    /**
     * Reflect this Pt along a 2D line
     * @param line a Group of 2 Pts that defines a line for reflection
     * @param axis optional axis such as "yz" to define a 2D plane of reflection
     */
    reflect2D(line, axis) {
        Num_1.Geom.reflect2D(this, line, axis);
        return this;
    }
    /**
     * A string representation of this Pt: "Pt(1, 2, 3)"
     */
    toString() {
        return `Pt(${this.join(", ")})`;
    }
    /**
     * Convert this Pt to a javascript Array
     */
    toArray() {
        return [].slice.call(this);
    }
}
exports.Pt = Pt;
/**
 * A Group is a subclass of Array. It should onnly contain Pt instances. You can think of it as an array of arrays (Float32Arrays to be specific).
 * See [Group guide](../../guide/Group-0300.html) for details
 */
class Group extends Array {
    constructor(...args) {
        super(...args);
    }
    get id() { return this._id; }
    set id(s) { this._id = s; }
    /** The first Pt in this group */
    get p1() { return this[0]; }
    /** The second Pt in this group */
    get p2() { return this[1]; }
    /** The third Pt in this group */
    get p3() { return this[2]; }
    /** The forth Pt in this group */
    get p4() { return this[3]; }
    /** The last Pt in this group */
    get q1() { return this[this.length - 1]; }
    /** The second-last Pt in this group */
    get q2() { return this[this.length - 2]; }
    /** The third-last Pt in this group */
    get q3() { return this[this.length - 3]; }
    /** The forth-last Pt in this group */
    get q4() { return this[this.length - 4]; }
    /**
     * Depp clone this group and its Pts
     */
    clone() {
        let group = new Group();
        for (let i = 0, len = this.length; i < len; i++) {
            group.push(this[i].clone());
        }
        return group;
    }
    /**
     * Convert an array of numeric arrays into a Group of Pts
     * @param list an array of numeric arrays
     * @example `Group.fromArray( [[1,2], [3,4], [5,6]] )`
     */
    static fromArray(list) {
        let g = new Group();
        for (let i = 0, len = list.length; i < len; i++) {
            let p = (list[i] instanceof Pt) ? list[i] : new Pt(list[i]);
            g.push(p);
        }
        return g;
    }
    /**
     * Convert an array of Pts into a Group.
     * @param list an array of Pts
     */
    static fromPtArray(list) {
        return Group.from(list);
    }
    /**
     * Split this Group into an array of sub-groups
     * @param chunkSize number of items per sub-group
     * @param stride forward-steps after each sub-group
     * @param loopBack if `true`, always go through the array till the end and loop back to the beginning to complete the segments if needed
     */
    split(chunkSize, stride, loopBack = false) {
        let sp = Util_1.Util.split(this, chunkSize, stride, loopBack);
        return sp;
    }
    /**
     * Insert a Pt into this group
     * @param pts Another group of Pts
     * @param index the index position to insert into
     */
    insert(pts, index = 0) {
        Group.prototype.splice.apply(this, [index, 0, ...pts]);
        return this;
    }
    /**
     * Like Array's splice function, with support for negative index and a friendlier name.
     * @param index start index, which can be negative (where -1 is at index 0, -2 at index 1, etc)
     * @param count number of items to remove
     * @returns The items that are removed.
     */
    remove(index = 0, count = 1) {
        let param = (index < 0) ? [index * -1 - 1, count] : [index, count];
        return Group.prototype.splice.apply(this, param);
    }
    /**
     * Split this group into an array of sub-group segments
     * @param pts_per_segment number of Pts in each segment
     * @param stride forward-step to take
     * @param loopBack if `true`, always go through the array till the end and loop back to the beginning to complete the segments if needed
     */
    segments(pts_per_segment = 2, stride = 1, loopBack = false) {
        return this.split(pts_per_segment, stride, loopBack);
    }
    /**
     * Get all the line segments (ie, edges in a graph) of this group
     */
    lines() { return this.segments(2, 1); }
    /**
     * Find the centroid of this group's Pts, which is the average middle point.
     */
    centroid() {
        return Num_1.Geom.centroid(this);
    }
    /**
     * Find the rectangular bounding box of this group's Pts.
     * @returns a Group of 2 Pts representing the top-left and bottom-right of the rectangle
     */
    boundingBox() {
        return Num_1.Geom.boundingBox(this);
    }
    /**
     * Anchor all the Pts in this Group using a target Pt as origin. (ie, subtract all Pt with the target anchor to get a relative position). All the Pts' values will be updated.
     * @param ptOrIndex a Pt, or a numeric index to target a specific Pt in this Group
     */
    anchorTo(ptOrIndex = 0) { Num_1.Geom.anchor(this, ptOrIndex, "to"); }
    /**
     * Anchor all the Pts in this Group by its absolute position from a target Pt. (ie, add all Pt with the target anchor to get an absolute position).  All the Pts' values will be updated.
     * @param ptOrIndex a Pt, or a numeric index to target a specific Pt in this Group
     */
    anchorFrom(ptOrIndex = 0) { Num_1.Geom.anchor(this, ptOrIndex, "from"); }
    /**
     * Create an operation using this Group, passing this Group into a custom function's first parameter.  See the [Op guide](../../guide/Op-0400.html) for details.
     * For example: `let myOp = group.op( fn ); let result = myOp( [1,2,3] );`
     * @param fn any function that takes a Group as its first parameter
     * @returns a resulting function that takes other parameters required in `fn`
     */
    op(fn) {
        let self = this;
        return (...params) => {
            return fn(self, ...params);
        };
    }
    /**
     * This combines a series of operations into an array. See `op()` for details.
     * For example: `let myOps = pt.ops([fn1, fn2, fn3]); let results = myOps.map( (op) => op([1,2,3]) );`
     * @param fns an array of functions for `op`
     * @returns an array of resulting functions
     */
    ops(fns) {
        let _ops = [];
        for (let i = 0, len = fns.length; i < len; i++) {
            _ops.push(this.op(fns[i]));
        }
        return _ops;
    }
    /**
     * Get an interpolated point on the line segments defined by this Group
     * @param t a value between 0 to 1 usually
     */
    interpolate(t) {
        t = Num_1.Num.clamp(t, 0, 1);
        let chunk = this.length - 1;
        let tc = 1 / (this.length - 1);
        let idx = Math.floor(t / tc);
        return Num_1.Geom.interpolate(this[idx], this[Math.min(this.length - 1, idx + 1)], (t - idx * tc) * chunk);
    }
    /**
     * Move every Pt's position by a specific amount. Same as `add`.
     * @param args a list of numbers, an array of number, or an object with {x,y,z,w} properties
     */
    moveBy(...args) {
        return this.add(...args);
    }
    /**
     * Move the first Pt in this group to a specific position, and move all the other Pts correspondingly
     * @param args a list of numbers, an array of number, or an object with {x,y,z,w} properties
     */
    moveTo(...args) {
        let d = new Pt(Util_1.Util.getArgs(args)).subtract(this[0]);
        this.moveBy(d);
        return this;
    }
    /**
     * Scale this group's Pts from an anchor point. Default anchor point is the first Pt in this group.
     * @param scale scale ratio
     * @param anchor optional anchor point to scale from
     */
    scale(scale, anchor) {
        for (let i = 0, len = this.length; i < len; i++) {
            Num_1.Geom.scale(this[i], scale, anchor || this[0]);
        }
        return this;
    }
    /**
     * Rotate this group's Pt from an anchor point in 2D. Default anchor point is the first Pt in this group.
     * @param angle rotate angle
     * @param anchor optional anchor point to scale from
     * @param axis optional string such as "yz" to specify a 2D plane
     */
    rotate2D(angle, anchor, axis) {
        for (let i = 0, len = this.length; i < len; i++) {
            Num_1.Geom.rotate2D(this[i], angle, anchor || this[0], axis);
        }
        return this;
    }
    /**
     * Shear this group's Pt from an anchor point in 2D. Default anchor point is the first Pt in this group.
     * @param shear shearing value which can be a number or an array of 2 numbers
     * @param anchor optional anchor point to scale from
     * @param axis optional string such as "yz" to specify a 2D plane
     */
    shear2D(scale, anchor, axis) {
        for (let i = 0, len = this.length; i < len; i++) {
            Num_1.Geom.shear2D(this[i], scale, anchor || this[0], axis);
        }
        return this;
    }
    /**
     * Reflect this group's Pts along a 2D line. Default anchor point is the first Pt in this group.
     * @param line a Group of 2 Pts that defines a line for reflection
     * @param axis optional axis such as "yz" to define a 2D plane of reflection
     */
    reflect2D(line, axis) {
        for (let i = 0, len = this.length; i < len; i++) {
            Num_1.Geom.reflect2D(this[i], line, axis);
        }
        return this;
    }
    /**
     * Sort this group's Pts by values in a specific dimension
     * @param dim dimensional index
     * @param desc if true, sort descending. Default is false (ascending)
     */
    sortByDimension(dim, desc = false) {
        return this.sort((a, b) => (desc) ? b[dim] - a[dim] : a[dim] - b[dim]);
    }
    /**
     * Update each Pt in this Group with a Pt function
     * @param ptFn string name of an existing Pt function. Note that the function must return Pt.
     * @param args arguments for the function specified in ptFn
     */
    forEachPt(ptFn, ...args) {
        if (!this[0][ptFn]) {
            Util_1.Util.warn(`${ptFn} is not a function of Pt`);
            return this;
        }
        for (let i = 0, len = this.length; i < len; i++) {
            this[i] = this[i][ptFn](...args);
        }
        return this;
    }
    /**
     * Add scalar or vector values to this group's Pts.
     * @param args a list of numbers, an array of number, or an object with {x,y,z,w} properties
     */
    add(...args) {
        return this.forEachPt("add", ...args);
    }
    /**
     * Subtract scalar or vector values from this group's Pts.
     * @param args a list of numbers, an array of number, or an object with {x,y,z,w} properties
     */
    subtract(...args) {
        return this.forEachPt("subtract", ...args);
    }
    /**
     * Multiply scalar or vector values (as element-wise) with this group's Pts.
     * @param args a list of numbers, an array of number, or an object with {x,y,z,w} properties
     */
    multiply(...args) {
        return this.forEachPt("multiply", ...args);
    }
    /**
     * Divide this group's Pts over scalar or vector values (as element-wise)
     * @param args a list of numbers, an array of number, or an object with {x,y,z,w} properties
     */
    divide(...args) {
        return this.forEachPt("divide", ...args);
    }
    /**
     * Apply this group as a matrix and calculate matrix addition
     * @param g a scalar number, an array of numeric arrays, or a group of Pt
     * @returns a new Group
     */
    $matrixAdd(g) {
        return LinearAlgebra_1.Mat.add(this, g);
    }
    /**
     * Apply this group as a matrix and calculate matrix multiplication
     * @param g a scalar number, an array of numeric arrays, or a Group of K Pts, each with N dimensions (K-rows, N-columns) -- or if transposed is true, then N Pts with K dimensions
     * @param transposed (Only applicable if it's not elementwise multiplication) If true, then a and b's columns should match (ie, each Pt should have the same dimensions). Default is `false`.
     * @param elementwise if true, then the multiplication is done element-wise. Default is `false`.
     * @returns If not elementwise, this will return a new  Group with M Pt, each with N dimensions (M-rows, N-columns).
     */
    $matrixMultiply(g, transposed = false, elementwise = false) {
        return LinearAlgebra_1.Mat.multiply(this, g, transposed, elementwise);
    }
    /**
     * Zip one slice of an array of Pt. Imagine the Pts are organized in rows, then this function will take the values in a specific column.
     * @param idx index to zip at
     * @param defaultValue a default value to fill if index out of bound. If not provided, it will throw an error instead.
     */
    zipSlice(index, defaultValue = false) {
        return LinearAlgebra_1.Mat.zipSlice(this, index, defaultValue);
    }
    /**
     * Zip a group of Pt. eg, [[1,2],[3,4],[5,6]] => [[1,3,5],[2,4,6]]
     * @param defaultValue a default value to fill if index out of bound. If not provided, it will throw an error instead.
     * @param useLongest If true, find the longest list of values in a Pt and use its length for zipping. Default is false, which uses the first item's length for zipping.
     */
    $zip(defaultValue = undefined, useLongest = false) {
        return LinearAlgebra_1.Mat.zip(this, defaultValue, useLongest);
    }
    /**
     * Get a string representation of this group
     */
    toString() {
        return "Group[ " + this.reduce((p, c) => p + c.toString() + " ", "") + " ]";
    }
}
exports.Group = Group;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Source code licensed under Apache License 2.0.
// Copyright © 2017 William Ngan. (https://github.com/williamngan/pts)
Object.defineProperty(exports, "__esModule", { value: true });
const Pt_1 = __webpack_require__(0);
/**
 * Various constant values for enumerations and calculations
 */
exports.Const = {
    xy: "xy",
    yz: "yz",
    xz: "xz",
    xyz: "xyz",
    horizontal: 0,
    vertical: 1,
    /* represents identical point or value */
    identical: 0,
    /* represents right position or direction */
    right: 4,
    /* represents bottom right position or direction */
    bottom_right: 5,
    /* represents bottom position or direction */
    bottom: 6,
    /* represents bottom left position or direction */
    bottom_left: 7,
    /* represents left position or direction */
    left: 8,
    /* represents top left position or direction */
    top_left: 1,
    /* represents top position or direction */
    top: 2,
    /* represents top right position or direction */
    top_right: 3,
    /* represents an arbitrary very small number. It is set as 0.0001 here. */
    epsilon: 0.0001,
    /* represents Number.MAX_VALUE */
    max: Number.MAX_VALUE,
    /* represents Number.MIN_VALUE */
    min: Number.MIN_VALUE,
    /* pi radian (180 deg) */
    pi: Math.PI,
    /* two pi radian (360deg) */
    two_pi: 6.283185307179586,
    /* half pi radian (90deg) */
    half_pi: 1.5707963267948966,
    /* pi/4 radian (45deg) */
    quarter_pi: 0.7853981633974483,
    /* pi/180: 1 degree in radian */
    one_degree: 0.017453292519943295,
    /* multiply this constant with a radian to get a degree */
    rad_to_deg: 57.29577951308232,
    /* multiply this constant with a degree to get a radian */
    deg_to_rad: 0.017453292519943295,
    /* Gravity acceleration (unit: m/s^2) and gravity force (unit: Newton) on 1kg of mass. */
    gravity: 9.81,
    /* 1 Newton: 0.10197 Kilogram-force */
    newton: 0.10197,
    /* Gaussian constant (1 / Math.sqrt(2 * Math.PI)) */
    gaussian: 0.3989422804014327
};
/**
 * Util provides various helper functions
 */
class Util {
    /**
     * Convert different kinds of parameters (arguments, array, object) into an array of numbers
     * @param args a list of numbers, an array of number, or an object with {x,y,z,w} properties
     */
    static getArgs(args) {
        if (args.length < 1)
            return [];
        let pos = [];
        let isArray = Array.isArray(args[0]) || ArrayBuffer.isView(args[0]);
        // positional arguments: x,y,z,w,...
        if (typeof args[0] === 'number') {
            pos = Array.prototype.slice.call(args);
            // as an object of {x, y?, z?, w?}
        }
        else if (typeof args[0] === 'object' && !isArray) {
            let a = ["x", "y", "z", "w"];
            let p = args[0];
            for (let i = 0; i < a.length; i++) {
                if ((p.length && i >= p.length) || !(a[i] in p))
                    break; // check for length and key exist
                pos.push(p[a[i]]);
            }
            // as an array of values
        }
        else if (isArray) {
            pos = [].slice.call(args[0]);
        }
        return pos;
    }
    /**
     * Send a warning message based on Util.warnLevel global setting. This allows you to dynamically set whether minor errors should be thrown or printed in console or muted.
     * @param message any error or warning message
     * @param defaultReturn optional return value
     */
    static warn(message = "error", defaultReturn = undefined) {
        if (Util.warnLevel == "error") {
            throw new Error(message);
        }
        else if (Util.warnLevel == "warn") {
            console.warn(message);
        }
        return defaultReturn;
    }
    static randomInt(range, start = 0) {
        return Math.floor(Math.random() * range) + start;
    }
    /**
     * Split an array into chunks of sub-array
     * @param pts an array
     * @param size chunk size, ie, number of items in a chunk
     * @param stride optional parameter to "walk through" the array in steps
     * @param loopBack if `true`, always go through the array till the end and loop back to the beginning to complete the segments if needed
     */
    static split(pts, size, stride, loopBack = false) {
        let st = stride || size;
        let chunks = [];
        for (let i = 0; i < pts.length; i++) {
            if (i * st + size > pts.length) {
                if (loopBack) {
                    let g = pts.slice(i * st);
                    g = g.concat(pts.slice(0, (i * st + size) % size));
                    chunks.push(g);
                }
                else {
                    break;
                }
            }
            else {
                chunks.push(pts.slice(i * st, i * st + size));
            }
        }
        return chunks;
    }
    /**
     * Flatten an array of arrays such as Group[] to a flat Array or Group
     * @param pts an array, usually an array of Groups
     * @param flattenAsGroup a boolean to specify whether the return type should be a Group or Array. Default is `true` which returns a Group.
     */
    static flatten(pts, flattenAsGroup = true) {
        let arr = (flattenAsGroup) ? new Pt_1.Group() : new Array();
        return arr.concat.apply(arr, pts);
    }
    /**
   * Given two arrays of object<T>, and a function that operate on two object<T>, return an array of T
   * @param a an array of object<T>, eg [ Group, Group, ... ]
   * @param b another array of object<T>
   * @param op a function that takes two parameters (a, b) and returns a T
   */
    static combine(a, b, op) {
        let result = [];
        for (let i = 0, len = a.length; i < len; i++) {
            for (let k = 0, lenB = b.length; k < lenB; k++) {
                result.push(op(a[i], b[k]));
            }
        }
        return result;
    }
    /**
     * Zip arrays. eg, [[1,2],[3,4],[5,6]] => [[1,3,5],[2,4,6]]
     * @param arrays an array of arrays
     */
    static zip(...arrays) {
        let z = [];
        for (let i = 0, len = arrays[0].length; i < len; i++) {
            let p = [];
            for (let k = 0; k < arrays.length; k++) {
                p.push(arrays[k][i]);
            }
            z.push(p);
        }
        return z;
    }
    /**
     * Create a convenient stepper. This returns a function which you can call repeatedly to step a counter.
     * @param max Maximum of the stepper range. The resulting stepper will return (min to max-1) values.
     * @param min Minimum of the stepper range. Default is 0.
     * @param stride Stride of the step. Default is 1.
     * @param callback An optional callback function( step ), which will be called each tiem when stepper function is called.
     * @example `let counter = stepper(100); let c = counter(); c = counter(); ...`
     * @returns a function which will increment the stepper and return its value at each call.
     */
    static stepper(max, min = 0, stride = 1, callback) {
        let c = min;
        return function () {
            c += stride;
            if (c >= max) {
                c = min + (c - max);
            }
            if (callback)
                callback(c);
            return c;
        };
    }
    /**
     * A convenient way to step through a range. Same as `for (i=0; i<range; i++)`, except this also stores the resulting return values at each step and return them as an array.
     * @param range a range to step through
     * @param fn a callback function(index). If this function returns a value, it will be stored at each step
     * @returns an array of returned values at each step
     */
    static forRange(fn, range, start = 0, step = 1) {
        let temp = [];
        for (let i = start, len = range; i < len; i += step) {
            temp[i] = fn(i);
        }
        return temp;
    }
}
Util.warnLevel = "default";
exports.Util = Util;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Source code licensed under Apache License 2.0. 
// Copyright © 2017 William Ngan. (https://github.com/williamngan/pts)
Object.defineProperty(exports, "__esModule", { value: true });
const Util_1 = __webpack_require__(1);
const Num_1 = __webpack_require__(3);
const Pt_1 = __webpack_require__(0);
const LinearAlgebra_1 = __webpack_require__(4);
let _errorLength = (obj, param = "expected") => Util_1.Util.warn("Group's length is less than " + param, obj);
let _errorOutofBound = (obj, param = "") => Util_1.Util.warn(`Index ${param} is out of bound in Group`, obj);
/**
 * Line class provides static functions to create and operate on lines. A line is usually represented as a Group of 2 Pts.
 * You can use the static function as-is, or apply the `op` method in Group or Pt to many of these functions.
 * See [Op guide](../../guide/Op-0400.html) for details.
 */
class Line {
    /**
     * Create a line by "drawing" from an anchor point, given an angle and a magnitude
     * @param anchor an anchor Pt
     * @param angle an angle in radian
     * @param magnitude magnitude of the line
     * @return a Group of 2 Pts representing a line segement
     */
    static fromAngle(anchor, angle, magnitude) {
        let g = new Pt_1.Group(new Pt_1.Pt(anchor), new Pt_1.Pt(anchor));
        g[1].toAngle(angle, magnitude, true);
        return g;
    }
    /**
     * Calculate the slope of a line
     * @param p1 line's first end point
     * @param p2 line's second end point
     */
    static slope(p1, p2) {
        return (p2[0] - p1[0] === 0) ? undefined : (p2[1] - p1[1]) / (p2[0] - p1[0]);
    }
    /**
     * Calculate the slope and xy intercepts of a line
     * @param p1 line's first end point
     * @param p2 line's second end point
     * @returns an object with `slope`, `xi`, `yi` properties
     */
    static intercept(p1, p2) {
        if (p2[0] - p1[0] === 0) {
            return undefined;
        }
        else {
            let m = (p2[1] - p1[1]) / (p2[0] - p1[0]);
            let c = p1[1] - m * p1[0];
            return { slope: m, yi: c, xi: (m === 0) ? undefined : -c / m };
        }
    }
    /**
     * Given a 2D path and a point, find whether the point is on left or right side of the line
     * @param line  a Group of at least 2 Pts
     * @param pt a Pt
     * @returns a negative value if on left and a positive value if on right. If collinear, then the return value is 0.
     */
    static sideOfPt2D(line, pt) {
        return (line[1][0] - line[0][0]) * (pt[1] - line[0][1]) - (pt[0] - line[0][0]) * (line[1][1] - line[0][1]);
    }
    /**
     * Check if three Pts are collinear, ie, on the same straight path.
     * @param p1 first Pt
     * @param p2 second Pt
     * @param p3 third Pt
     * @param threshold a threshold where a smaller value means higher precision threshold for the straight line. Default is 0.01.
     */
    static collinear(p1, p2, p3, threshold = 0.01) {
        // Use cross product method
        let a = new Pt_1.Pt(0, 0, 0).to(p1).$subtract(p2);
        let b = new Pt_1.Pt(0, 0, 0).to(p1).$subtract(p3);
        return a.$cross(b).divide(1000).equals(new Pt_1.Pt(0, 0, 0), threshold);
    }
    /**
     * Get magnitude of a line segment
     * @param line a Group of at least 2 Pts
     */
    static magnitude(line) {
        return (line.length >= 2) ? line[1].$subtract(line[0]).magnitude() : 0;
    }
    /**
     * Get squared magnitude of a line segment
     * @param line a Group of at least 2 Pts
     */
    static magnitudeSq(line) {
        return (line.length >= 2) ? line[1].$subtract(line[0]).magnitudeSq() : 0;
    }
    /**
     * Find a point on a line that is perpendicular (shortest distance) to a target point
     * @param pt a target Pt
     * @param ln a group of Pts that defines a line
     * @param asProjection if true, this returns the projection vector instead. Default is false.
     * @returns a Pt on the line that is perpendicular to the target Pt, or a projection vector if `asProjection` is true.
     */
    static perpendicularFromPt(line, pt, asProjection = false) {
        if (line[0].equals(line[1]))
            return undefined;
        let a = line[0].$subtract(line[1]);
        let b = line[1].$subtract(pt);
        let proj = b.$subtract(a.$project(b));
        return (asProjection) ? proj : proj.$add(pt);
    }
    /**
     * Given a line and a point, find the shortest distance from the point to the line
     * @param line a Group of 2 Pts
     * @param pt a Pt
     * @see `Line.perpendicularFromPt`
     */
    static distanceFromPt(line, pt) {
        return Line.perpendicularFromPt(line, pt, true).magnitude();
    }
    /**
     * Given two lines as rays (infinite lines), find their intersection point if any.
     * @param la a Group of 2 Pts representing a ray
     * @param lb a Group of 2 Pts representing a ray
     * @returns an intersection Pt or undefined if no intersection
     */
    static intersectRay2D(la, lb) {
        let a = Line.intercept(la[0], la[1]);
        let b = Line.intercept(lb[0], lb[1]);
        let pa = la[0];
        let pb = lb[0];
        if (a == undefined) {
            if (b == undefined)
                return undefined;
            // one of them is vertical line, while the other is not, so they will intersect
            let y1 = -b.slope * (pb[0] - pa[0]) + pb[1]; // -slope * x + y
            return new Pt_1.Pt(pa[0], y1);
        }
        else {
            // diff slope, or b slope is vertical line
            if (b == undefined) {
                let y1 = -a.slope * (pa[0] - pb[0]) + pa[1];
                return new Pt_1.Pt(pb[0], y1);
            }
            else if (b.slope != a.slope) {
                let px = (a.slope * pa[0] - b.slope * pb[0] + pb[1] - pa[1]) / (a.slope - b.slope);
                let py = a.slope * (px - pa[0]) + pa[1];
                return new Pt_1.Pt(px, py);
            }
            else {
                if (a.yi == b.yi) {
                    return new Pt_1.Pt(pa[0], pa[1]);
                }
                else {
                    return undefined;
                }
            }
        }
    }
    /**
     * Given two line segemnts, find their intersection point if any.
     * @param la a Group of 2 Pts representing a line segment
     * @param lb a Group of 2 Pts representing a line segment
     * @returns an intersection Pt or undefined if no intersection
     */
    static intersectLine2D(la, lb) {
        let pt = Line.intersectRay2D(la, lb);
        return (pt && Num_1.Geom.withinBound(pt, la[0], la[1]) && Num_1.Geom.withinBound(pt, lb[0], lb[1])) ? pt : undefined;
    }
    /**
     * Given a line segemnt and a ray (infinite line), find their intersection point if any.
     * @param line a Group of 2 Pts representing a line segment
     * @param ray a Group of 2 Pts representing a ray
     * @returns an intersection Pt or undefined if no intersection
     */
    static intersectLineWithRay2D(line, ray) {
        let pt = Line.intersectRay2D(line, ray);
        return (pt && Num_1.Geom.withinBound(pt, line[0], line[1])) ? pt : undefined;
    }
    /**
     * Given a line segemnt and a ray (infinite line), find its intersection point(s) with a polygon.
     * @param lineOrRay a Group of 2 Pts representing a line or ray
     * @param poly a Group of Pts representing a polygon
     * @param sourceIsRay a boolean value to treat the line as a ray (infinite line). Default is `false`.
     */
    static intersectPolygon2D(lineOrRay, poly, sourceIsRay = false) {
        let fn = sourceIsRay ? Line.intersectLineWithRay2D : Line.intersectLine2D;
        let pts = new Pt_1.Group();
        for (let i = 0, len = poly.length; i < len; i++) {
            let d = fn(poly[i], lineOrRay);
            if (d)
                pts.push(d);
        }
        return (pts.length > 0) ? pts : undefined;
    }
    /**
     * Get two intersection Pts of a ray with a 2D grid point
     * @param ray a ray specified by 2 Pts
     * @param gridPt a Pt on the grid
     * @returns a group of two intersecting Pts. The first one is horizontal intersection and the second one is vertical intersection.
     */
    static intersectGridWithRay2D(ray, gridPt) {
        let t = Line.intercept(new Pt_1.Pt(ray[0]).subtract(gridPt), new Pt_1.Pt(ray[1]).subtract(gridPt));
        let g = new Pt_1.Group();
        if (t && t.xi)
            g.push(new Pt_1.Pt(gridPt[0] + t.xi, gridPt[1]));
        if (t && t.yi)
            g.push(new Pt_1.Pt(gridPt[0], gridPt[1] + t.yi));
        return g;
    }
    /**
     * Get two intersection Pts of a line segment with a 2D grid point
     * @param ray a ray specified by 2 Pts
     * @param gridPt a Pt on the grid
     * @returns a group of two intersecting Pts. The first one is horizontal intersection and the second one is vertical intersection.
     */
    static intersectGridWithLine2D(line, gridPt) {
        let g = Line.intersectGridWithRay2D(line, gridPt);
        let gg = new Pt_1.Group();
        for (let i = 0, len = g.length; i < len; i++) {
            if (Num_1.Geom.withinBound(g[i], line[0], line[1]))
                gg.push(g[i]);
        }
        return gg;
    }
    /**
     * Quick way to check rectangle intersection.
     * For more optimized implementation, store the rectangle's sides separately (eg, `Rectangle.sides()`) and use `Polygon.intersect2D()`.
     * @param line a Group representing a line
     * @param rect a Group representing a rectangle
     */
    static intersectRect2D(line, rect) {
        return Rectangle.intersectRect2D(Line.toRect(line), rect);
    }
    /**
     * Get evenly distributed points on a line
     * @param line a Group representing a line
     * @param num number of points to get
     */
    static subpoints(line, num) {
        let pts = new Pt_1.Group();
        for (let i = 1; i <= num; i++) {
            pts.push(Num_1.Geom.interpolate(line[0], line[1], i / (num + 1)));
        }
        return pts;
    }
    /**
     * Crop this line by a circle or rectangle at end point.
     * @param line line to crop
     * @param size size of circle or rectangle as Pt
     * @param index line's end point index, ie, 0 = start and 1 = end.
     * @param cropAsCircle a boolean to specify whether the `size` parameter should be treated as circle. Default is `true`.
     * @return an intersecting point on the line that can be used for cropping.
     */
    static crop(line, size, index = 0, cropAsCircle = true) {
        let tdx = (index === 0) ? 1 : 0;
        let ls = line[tdx].$subtract(line[index]);
        if (ls[0] === 0 || size[0] === 0)
            return line[index];
        if (cropAsCircle) {
            let d = ls.unit().multiply(size[1]);
            return line[index].$add(d);
        }
        else {
            let rect = Rectangle.fromCenter(line[index], size);
            let sides = Rectangle.sides(rect);
            let sideIdx = 0;
            if (Math.abs(ls[1] / ls[0]) > Math.abs(size[1] / size[0])) {
                sideIdx = (ls[1] < 0) ? 0 : 2;
            }
            else {
                sideIdx = (ls[0] < 0) ? 3 : 1;
            }
            return Line.intersectRay2D(sides[sideIdx], line);
        }
    }
    /**
     * Create an marker arrow or line, placed at an end point of this line
     * @param line line to place marker
     * @param size size of the marker as Pt
     * @param graphic either "arrow" or "line"
     * @param atTail a boolean, if `true`, the marker will be positioned at tail of the line (ie, index = 1). Default is `true`.
     * @returns a Group that defines the marker's shape
     */
    static marker(line, size, graphic = ("arrow" || "line"), atTail = true) {
        let h = atTail ? 0 : 1;
        let t = atTail ? 1 : 0;
        let unit = line[h].$subtract(line[t]);
        if (unit.magnitudeSq() === 0)
            return new Pt_1.Group();
        unit.unit();
        let ps = Num_1.Geom.perpendicular(unit).multiply(size[0]).add(line[t]);
        if (graphic == "arrow") {
            ps.add(unit.$multiply(size[1]));
            return new Pt_1.Group(line[t], ps[0], ps[1]);
        }
        else {
            return new Pt_1.Group(ps[0], ps[1]);
        }
    }
    /**
     * Convert this line to a rectangle representation
     * @param line a Group representing a line
     */
    static toRect(line) {
        return new Pt_1.Group(line[0].$min(line[1]), line[0].$max(line[1]));
    }
}
exports.Line = Line;
/**
 * Rectangle class provides static functions to create and operate on rectangles. A rectangle is usually represented as a Group of 2 Pts, marking the top-left and bottom-right corners of the rectangle.
 * You can use the static function as-is, or apply the `op` method in Group or Pt to many of these functions.
 * See [Op guide](../../guide/Op-0400.html) for details.
 */
class Rectangle {
    /**
     * Same as `Rectangle.fromTopLeft`
     */
    static from(topLeft, widthOrSize, height) {
        return Rectangle.fromTopLeft(topLeft, widthOrSize, height);
    }
    /**
     * Create a rectangle given a top-left position and a size
     * @param topLeft top-left point
     * @param widthOrSize width as a number, or a Pt that defines its size
     * @param height optional height as a number
     */
    static fromTopLeft(topLeft, widthOrSize, height) {
        let size = (typeof widthOrSize == "number") ? [widthOrSize, (height || widthOrSize)] : widthOrSize;
        return new Pt_1.Group(new Pt_1.Pt(topLeft), new Pt_1.Pt(topLeft).add(size));
    }
    /**
     * Create a rectangle given a center position and a size
     * @param topLeft top-left point
     * @param widthOrSize width as a number, or a Pt that defines its size
     * @param height optional height as a number
     */
    static fromCenter(center, widthOrSize, height) {
        let half = (typeof widthOrSize == "number") ? [widthOrSize / 2, (height || widthOrSize) / 2] : new Pt_1.Pt(widthOrSize).divide(2);
        return new Pt_1.Group(new Pt_1.Pt(center).subtract(half), new Pt_1.Pt(center).add(half));
    }
    /**
     * Convert this rectangle to a circle that fits within the rectangle
     * @returns a Group that represents a circle
     * @see `Circle`
     */
    static toCircle(pts) {
        return Circle.fromRect(pts);
    }
    /**
     * Create a square that either fits within or encloses a rectangle
     * @param pts a Group of 2 Pts representing a rectangle
     * @param enclose if `true`, the square will enclose the rectangle. Default is `false`, which will fit the square inside the rectangle.
     */
    static toSquare(pts, enclose = false) {
        let s = Rectangle.size(pts);
        let m = (enclose) ? s.maxValue().value : s.minValue().value;
        return Rectangle.fromCenter(Rectangle.center(pts), m, m);
    }
    /**
     * Get the size of this rectangle as a Pt
     * @param pts a Group of 2 Pts representing a Rectangle
     */
    static size(pts) {
        return pts[0].$max(pts[1]).subtract(pts[0].$min(pts[1]));
    }
    /**
     * Get the center of this rectangle
     * @param pts a Group of 2 Pts representing a Rectangle
     */
    static center(pts) {
        let min = pts[0].$min(pts[1]);
        let max = pts[0].$max(pts[1]);
        return min.add(max.$subtract(min).divide(2));
    }
    /**
     * Get the 4 corners of this rectangle as a Group
     * @param rect a Group of 2 Pts representing a Rectangle
     */
    static corners(rect) {
        let p0 = rect[0].$min(rect[1]);
        let p2 = rect[0].$max(rect[1]);
        return new Pt_1.Group(p0, new Pt_1.Pt(p2.x, p0.y), p2, new Pt_1.Pt(p0.x, p2.y));
    }
    /**
     * Get the 4 sides of this rectangle as an array of 4 Groups
     * @param rect a Group of 2 Pts representing a Rectangle
     * @returns an array of 4 Groups, each of which represents a line segment
     */
    static sides(rect) {
        let [p0, p1, p2, p3] = Rectangle.corners(rect);
        return [
            new Pt_1.Group(p0, p1), new Pt_1.Group(p1, p2),
            new Pt_1.Group(p2, p3), new Pt_1.Group(p3, p0)
        ];
    }
    /**
     * Same as `Rectangle.sides`
     */
    static lines(rect) {
        return Rectangle.sides(rect);
    }
    /**
     * Given an array of rectangles, get a rectangle that bounds all of them
     * @param rects an array of Groups that represent rectangles
     * @returns the bounding rectangle as a Group
     */
    static boundingBox(rects) {
        let merged = Util_1.Util.flatten(rects, false);
        let min = Pt_1.Pt.make(2, Number.MAX_VALUE);
        let max = Pt_1.Pt.make(2, Number.MIN_VALUE);
        // calculate min max in a single pass
        for (let i = 0, len = merged.length; i < len; i++) {
            for (let k = 0; k < 2; k++) {
                min[k] = Math.min(min[k], merged[i][k]);
                max[k] = Math.max(max[k], merged[i][k]);
            }
        }
        return new Pt_1.Group(min, max);
    }
    /**
     * Convert this rectangle into a Group representing a polygon
     * @param rect a Group of 2 Pts representing a Rectangle
     */
    static polygon(rect) {
        return Rectangle.corners(rect);
    }
    /**
     * Subdivide a rectangle into 4 rectangles, one for each quadrant
     * @param rect a Group of 2 Pts representing a Rectangle
     * @returns an array of 4 Groups of rectangles
     */
    static quadrants(rect, center) {
        let corners = Rectangle.corners(rect);
        let _center = (center != undefined) ? new Pt_1.Pt(center) : Rectangle.center(rect);
        return corners.map((c) => new Pt_1.Group(c, _center).boundingBox());
    }
    /**
     * Subdivde a rectangle into 2 rectangles, by row or by column
     * @param rect Group of 2 Pts representing a Rectangle
     * @param ratio a value between 0 to 1 to indicate the split ratio
     * @param asRows if `true`, split into 2 rows. Default is `false` which splits into 2 columns.
     * @returns an array of 2 Groups of rectangles
     */
    static halves(rect, ratio = 0.5, asRows = false) {
        let min = rect[0].$min(rect[1]);
        let max = rect[0].$max(rect[1]);
        let mid = (asRows) ? Num_1.Num.lerp(min[1], max[1], ratio) : Num_1.Num.lerp(min[0], max[0], ratio);
        return (asRows)
            ? [new Pt_1.Group(min, new Pt_1.Pt(max[0], mid)), new Pt_1.Group(new Pt_1.Pt(min[0], mid), max)]
            : [new Pt_1.Group(min, new Pt_1.Pt(mid, max[1])), new Pt_1.Group(new Pt_1.Pt(mid, min[1]), max)];
    }
    /**
     * Check if a point is within a rectangle
     * @param rect a Group of 2 Pts representing a Rectangle
     * @param pt the point to check
     */
    static withinBound(rect, pt) {
        return Num_1.Geom.withinBound(pt, rect[0], rect[1]);
    }
    /**
     * Check if a rectangle is within the bounds of another rectangle
     * @param rect1 a Group of 2 Pts representing a rectangle
     * @param rect2 a Group of 2 Pts representing a rectangle
     */
    static hasIntersectRect2D(rect1, rect2) {
        let pts = Rectangle.corners(rect1);
        for (let i = 0, len = pts.length; i < len; i++) {
            if (Num_1.Geom.withinBound(pts[i], rect2[0], rect2[1]))
                return true;
        }
        return false;
    }
    /**
     * Quick way to check rectangle intersection.
     * For more optimized implementation, store the rectangle's sides separately (eg, `Rectangle.sides()`) and use `Polygon.intersect2D()`.
     * @param rect1 a Group of 2 Pts representing a rectangle
     * @param rect2 a Group of 2 Pts representing a rectangle
     */
    static intersectRect2D(rect1, rect2) {
        return Util_1.Util.flatten(Polygon.intersect2D(Rectangle.sides(rect1), Rectangle.sides(rect2)));
    }
}
exports.Rectangle = Rectangle;
/**
 * Circle class provides static functions to create and operate on circles. A circle is usually represented as a Group of 2 Pts, where the first Pt specifies the center, and the second Pt specifies the radius.
 * You can use the static function as-is, or apply the `op` method in Group or Pt to many of these functions.
 * See [Op guide](../../guide/Op-0400.html) for details.
 */
class Circle {
    /**
     * Create a circle that either fits within or encloses a rectangle
     * @param pts a Group of 2 Pts representing a rectangle
     * @param enclose if `true`, the circle will enclose the rectangle. Default is `false`, which will fit the circle inside the rectangle.
     */
    static fromRect(pts, enclose = false) {
        let r = 0;
        let min = r = Rectangle.size(pts).minValue().value / 2;
        if (enclose) {
            let max = Rectangle.size(pts).maxValue().value / 2;
            r = Math.sqrt(min * min + max * max);
        }
        else {
            r = min;
        }
        return new Pt_1.Group(Rectangle.center(pts), new Pt_1.Pt(r, r));
    }
    /**
     * Create a circle based on a center point and a radius
     * @param pt center point of circle
     * @param radius radius of circle
     */
    static fromCenter(pt, radius) {
        return new Pt_1.Group(new Pt_1.Pt(pt), new Pt_1.Pt(radius, radius));
    }
    /**
     * Check if a point is within a circle
     * @param pts a Group of 2 Pts representing a circle
     * @param pt the point to checks
     * @param threshold an optional small number to set threshold. Default is 0.
     */
    static withinBound(pts, pt, threshold = 0) {
        let d = pts[0].$subtract(pt);
        return d.dot(d) + threshold < pts[1].x * pts[1].x;
    }
    /**
     * Get the intersection points between a circle and a ray (infinite line)
     * @param pts a Group of 2 Pts representing a circle
     * @param ray a Group of 2 Pts representing a ray
     * @returns a Group of intersection points, or an empty Group if no intersection is found
     */
    static intersectRay2D(pts, ray) {
        let d = ray[0].$subtract(ray[1]);
        let f = pts[0].$subtract(ray[0]);
        let a = d.dot(d);
        let b = f.dot(d);
        let c = f.dot(f) - pts[1].x * pts[1].x;
        let p = b / a;
        let q = c / a;
        let disc = p * p - q; // discriminant
        if (disc < 0) {
            return new Pt_1.Group();
        }
        else {
            let discSqrt = Math.sqrt(disc);
            let t1 = -p + discSqrt;
            let p1 = ray[0].$subtract(d.$multiply(t1));
            if (disc === 0)
                return new Pt_1.Group(p1);
            let t2 = -p - discSqrt;
            let p2 = ray[0].$subtract(d.$multiply(t2));
            return new Pt_1.Group(p1, p2);
        }
    }
    /**
     * Get the intersection points between a circle and a line segment
     * @param pts a Group of 2 Pts representing a circle
     * @param ray a Group of 2 Pts representing a line
     * @returns a Group of intersection points, or an empty Group if no intersection is found
     */
    static intersectLine2D(pts, line) {
        let ps = Circle.intersectRay2D(pts, line);
        let g = new Pt_1.Group();
        if (ps.length > 0) {
            for (let i = 0, len = ps.length; i < len; i++) {
                if (Rectangle.withinBound(line, ps[i]))
                    g.push(ps[i]);
            }
        }
        return g;
    }
    /**
     * Get the intersection points between two circles
     * @param pts a Group of 2 Pts representing a circle
     * @param circle a Group of 2 Pts representing a circle
     * @returns a Group of intersection points, or an empty Group if no intersection is found
     */
    static intersectCircle2D(pts, circle) {
        let dv = circle[0].$subtract(pts[0]);
        let dr2 = dv.magnitudeSq();
        let dr = Math.sqrt(dr2);
        let ar = pts[1].x;
        let br = circle[1].x;
        let ar2 = ar * ar;
        let br2 = br * br;
        if (dr > ar + br) {
            return new Pt_1.Group();
        }
        else if (dr < Math.abs(ar - br)) {
            return new Pt_1.Group(pts[0].clone());
        }
        else {
            let a = (ar2 - br2 + dr2) / (2 * dr);
            let h = Math.sqrt(ar2 - a * a);
            let p = dv.$multiply(a / dr).add(pts[0]);
            return new Pt_1.Group(new Pt_1.Pt(p.x + h * dv.y / dr, p.y - h * dv.x / dr), new Pt_1.Pt(p.x - h * dv.y / dr, p.y + h * dv.x / dr));
        }
    }
    /**
     * Quick way to check rectangle intersection with a circle.
     * For more optimized implementation, store the rectangle's sides separately (eg, `Rectangle.sides()`) and use `Polygon.intersect2D()`.
     * @param pts a Group of 2 Pts representing a circle
     * @param rect a Group of 2 Pts representing a rectangle
     * @returns a Group of intersection points, or an empty Group if no intersection is found
     */
    static intersectRect2D(pts, rect) {
        let sides = Rectangle.sides(rect);
        let g = [];
        for (let i = 0, len = sides.length; i < len; i++) {
            let ps = Circle.intersectLine2D(pts, sides[i]);
            if (ps.length > 0)
                g.push(ps);
        }
        return Util_1.Util.flatten(g);
    }
    /**
     * Convert this cirlce to a rectangle that encloses this circle
     * @param pts a Group of 2 Pts representing a circle
     */
    static toRect(pts) {
        let r = pts[1][0];
        return new Pt_1.Group(pts[0].$subtract(r), pts[0].$add(r));
    }
    /**
     * Convert this cirlce to a rectangle that fits within this circle
     * @param pts a Group of 2 Pts representing a circle
     */
    static toInnerRect(pts) {
        let r = pts[1][0];
        let half = Math.sqrt(r * r) / 2;
        return new Pt_1.Group(pts[0].$subtract(half), pts[0].$add(half));
    }
    /**
     * Convert this cirlce to a triangle that fits within this circle
     * @param pts a Group of 2 Pts representing a circle
     */
    static toInnerTriangle(pts) {
        let ang = -Math.PI / 2;
        let inc = Math.PI * 2 / 3;
        let g = new Pt_1.Group();
        for (let i = 0; i < 3; i++) {
            g.push(pts[0].clone().toAngle(ang, pts[1][0], true));
            ang += inc;
        }
        return g;
    }
}
exports.Circle = Circle;
/**
 * Triangle class provides static functions to create and operate on trianges. A triange is usually represented as a Group of 3 Pts.
 * You can use the static function as-is, or apply the `op` method in Group or Pt to many of these functions.
 * See [Op guide](../../guide/Op-0400.html) for details.
 */
class Triangle {
    /**
     * Create a triangle from a rectangle. The triangle will be isosceles, with the bottom of the rectangle as its base.
     * @param rect a Group of 2 Pts representing a rectangle
     */
    static fromRect(rect) {
        let top = rect[0].$add(rect[1]).divide(2);
        top.y = rect[0][1];
        let left = rect[1].clone();
        left.x = rect[0][0];
        return new Pt_1.Group(top, rect[1].clone(), left);
    }
    /**
     * Create a triangle that fits within a circle
     * @param circle a Group of 2 Pts representing a circle
     */
    static fromCircle(circle) {
        return Circle.toInnerTriangle(circle);
    }
    /**
     * Create an equilateral triangle based on a center point and a size
     * @param pt the center point
     * @param size size is the magnitude of lines from center to the triangle's vertices, like a "radius".
     */
    static fromCenter(pt, size) {
        return Triangle.fromCircle(Circle.fromCenter(pt, size));
    }
    /**
     * Get the medial, which is an inner triangle formed by connecting the midpoints of this triangle's sides
     * @param pts a Group of Pts
     * @returns a Group representing a medial triangle
     */
    static medial(pts) {
        if (pts.length < 3)
            return _errorLength(new Pt_1.Group(), 3);
        return Polygon.midpoints(pts, true);
    }
    /**
     * Given a point of the triangle, the opposite side is the side which the point doesn't touch.
     * @param pts a Group of Pts
     * @param index a Pt on the triangle group
     * @returns a Group that represents a line of the opposite side
     */
    static oppositeSide(pts, index) {
        if (pts.length < 3)
            return _errorLength(new Pt_1.Group(), 3);
        if (index === 0) {
            return Pt_1.Group.fromPtArray([pts[1], pts[2]]);
        }
        else if (index === 1) {
            return Pt_1.Group.fromPtArray([pts[0], pts[2]]);
        }
        else {
            return Pt_1.Group.fromPtArray([pts[0], pts[1]]);
        }
    }
    /**
     * Get a triangle's altitude, which is a line from a triangle's point to its opposite side, and perpendicular to its opposite side.
     * @param pts a Group of Pts
     * @param index a Pt on the triangle group
     * @returns a Group that represents the altitude line
     */
    static altitude(pts, index) {
        let opp = Triangle.oppositeSide(pts, index);
        if (opp.length > 1) {
            return new Pt_1.Group(pts[index], Line.perpendicularFromPt(opp, pts[index]));
        }
        else {
            return new Pt_1.Group();
        }
    }
    /**
     * Get orthocenter, which is the intersection point of a triangle's 3 altitudes (the 3 lines that are perpendicular to its 3 opposite sides).
     * @param pts a Group of Pts
     * @returns the orthocenter as a Pt
     */
    static orthocenter(pts) {
        if (pts.length < 3)
            return _errorLength(undefined, 3);
        let a = Triangle.altitude(pts, 0);
        let b = Triangle.altitude(pts, 1);
        return Line.intersectRay2D(a, b);
    }
    /**
     * Get incenter, which is the center point of its inner circle, and also the intersection point of its 3 angle bisector lines (each of which cuts one of the 3 angles in half).
     * @param pts a Group of Pts
     * @returns the incenter as a Pt
     */
    static incenter(pts) {
        if (pts.length < 3)
            return _errorLength(undefined, 3);
        let a = Polygon.bisector(pts, 0).add(pts[0]);
        let b = Polygon.bisector(pts, 1).add(pts[1]);
        return Line.intersectRay2D(new Pt_1.Group(pts[0], a), new Pt_1.Group(pts[1], b));
    }
    /**
     * Get an interior circle, which is the largest circle completed enclosed by this triangle
     * @param pts a Group of Pts
     * @param center Optional parameter if the incenter is already known. Otherwise, leave it empty and the incenter will be calculated
     */
    static incircle(pts, center) {
        let c = (center) ? center : Triangle.incenter(pts);
        let area = Polygon.area(pts);
        let perim = Polygon.perimeter(pts, true);
        let r = 2 * area / perim.total;
        return Circle.fromCenter(c, r);
    }
    /**
     * Get circumcenter, which is the intersection point of its 3 perpendicular bisectors lines ( each of which divides a side in half and is perpendicular to the side)
     * @param pts a Group of Pts
     * @returns the circumcenter as a Pt
     */
    static circumcenter(pts) {
        let md = Triangle.medial(pts);
        let a = [md[0], Num_1.Geom.perpendicular(pts[0].$subtract(md[0])).p1.$add(md[0])];
        let b = [md[1], Num_1.Geom.perpendicular(pts[1].$subtract(md[1])).p1.$add(md[1])];
        return Line.intersectRay2D(a, b);
    }
    /**
     * Get circumcenter, which is the intersection point of its 3 perpendicular bisectors lines ( each of which divides a side in half and is perpendicular to the side)
     * @param pts a Group of Pts
     * @param center Optional parameter if the circumcenter is already known. Otherwise, leave it empty and the circumcenter will be calculated
     */
    static circumcircle(pts, center) {
        let c = (center) ? center : Triangle.circumcenter(pts);
        let r = pts[0].$subtract(c).magnitude();
        return Circle.fromCenter(c, r);
    }
}
exports.Triangle = Triangle;
/**
 * Polygon class provides static functions to create and operate on polygons. A polygon is usually represented as a Group of 3 or more Pts.
 * You can use the static function as-is, or apply the `op` method in Group or Pt to many of these functions.
 * See [Op guide](../../guide/Op-0400.html) for details.
 */
class Polygon {
    /**
     * Get the centroid of a polygon, which is the average of all its points.
     * @param pts a Group of Pts representing a polygon
     */
    static centroid(pts) {
        return Num_1.Geom.centroid(pts);
    }
    /**
     * Get the line segments in this polygon
     * @param pts a Group of Pts
     * @param closePath a boolean to specify whether the polygon should be closed (ie, whether the final segment should be counted).
     * @returns an array of Groups which has 2 Pts in each group
     */
    static lines(pts, closePath = false) {
        if (pts.length < 2)
            return _errorLength(new Pt_1.Group(), 2);
        let sp = Util_1.Util.split(pts, 2, 1);
        if (closePath)
            sp.push(new Pt_1.Group(pts[pts.length - 1], pts[0]));
        return sp.map((g) => g);
    }
    /**
     * Get a new polygon group that is derived from midpoints in this polygon
     * @param pts a Group of Pts
     * @param closePath a boolean to specify whether the polygon should be closed (ie, whether the final segment should be counted).
     * @param t a value between 0 to 1 for interpolation. Default to 0.5 which will get the middle point.
     */
    static midpoints(pts, closePath = false, t = 0.5) {
        if (pts.length < 2)
            return _errorLength(new Pt_1.Group(), 2);
        let sides = Polygon.lines(pts, closePath);
        let mids = sides.map((s) => Num_1.Geom.interpolate(s[0], s[1], t));
        return mids;
    }
    /**
     * Given a Pt in the polygon group, the adjacent sides are the two sides which the Pt touches.
     * @param pts a group of Pts
     * @param index the target Pt
     * @param closePath a boolean to specify whether the polygon should be closed (ie, whether the final segment should be counted).
     */
    static adjacentSides(pts, index, closePath = false) {
        if (pts.length < 2)
            return _errorLength(new Pt_1.Group(), 2);
        if (index < 0 || index >= pts.length)
            return _errorOutofBound(new Pt_1.Group(), index);
        let gs = [];
        let left = index - 1;
        if (closePath && left < 0)
            left = pts.length - 1;
        if (left >= 0)
            gs.push(new Pt_1.Group(pts[index], pts[left]));
        let right = index + 1;
        if (closePath && right > pts.length - 1)
            right = 0;
        if (right <= pts.length - 1)
            gs.push(new Pt_1.Group(pts[index], pts[right]));
        return gs;
    }
    /**
     * Get a bisector which is a line that split between two sides of a polygon equally.
     * @param pts a group of Pts
     * @param index the Pt in the polygon to bisect from
     * @param closePath a boolean to specify whether the polygon should be closed (ie, whether the final segment should be counted).
     * @returns a bisector Pt that's a normalized unit vector
     */
    static bisector(pts, index) {
        let sides = Polygon.adjacentSides(pts, index, true);
        if (sides.length >= 2) {
            let a = sides[0][1].$subtract(sides[0][0]).unit();
            let b = sides[1][1].$subtract(sides[1][0]).unit();
            return a.add(b).divide(2);
        }
        else {
            return undefined;
        }
    }
    /**
     * Find the perimeter of this polygon, ie, the lengths of its sides.
     * @param pts a group of Pts
     * @param closePath a boolean to specify whether the polygon should be closed (ie, whether the final segment should be counted).
     * @returns an object with `total` length, and `segments` which is a Pt that stores each segment's length
     */
    static perimeter(pts, closePath = false) {
        if (pts.length < 2)
            return _errorLength(new Pt_1.Group(), 2);
        let lines = Polygon.lines(pts, closePath);
        let mag = 0;
        let p = Pt_1.Pt.make(lines.length, 0);
        for (let i = 0, len = lines.length; i < len; i++) {
            let m = Line.magnitude(lines[i]);
            mag += m;
            p[i] = m;
        }
        return {
            total: mag,
            segments: p
        };
    }
    /**
     * Find the area of a *convex* polygon.
     * @param pts a group of Pts
     */
    static area(pts) {
        if (pts.length < 3)
            return _errorLength(new Pt_1.Group(), 3);
        // determinant
        let det = (a, b) => a[0] * b[1] - a[1] * b[0];
        let area = 0;
        for (let i = 0, len = pts.length; i < len; i++) {
            if (i < pts.length - 1) {
                area += det(pts[i], pts[i + 1]);
            }
            else {
                area += det(pts[i], pts[0]);
            }
        }
        return Math.abs(area / 2);
    }
    /**
     * Get a convex hull of the point set using Melkman's algorithm
     * (Reference: http://geomalgorithms.com/a12-_hull-3.html)
     * @param pts a group of Pt
     * @param sorted a boolean value to indicate if the group is pre-sorted by x position. Default is false.
     * @returns a group of Pt that defines the convex hull polygon
     */
    static convexHull(pts, sorted = false) {
        if (pts.length < 3)
            return _errorLength(new Pt_1.Group(), 3);
        if (!sorted) {
            pts = pts.slice();
            pts.sort((a, b) => a[0] - b[0]);
        }
        // check if is on left of ray a-b
        let left = (a, b, c) => {
            return (b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1]) > 0;
        };
        // double end queue
        let dq = [];
        let bot = pts.length - 2;
        let top = bot + 3;
        dq[bot] = pts[2];
        dq[top] = pts[2];
        // first 3 pt as counter-clockwise triangle
        if (left(pts[0], pts[1], pts[2])) {
            dq[bot + 1] = pts[0];
            dq[bot + 2] = pts[1];
        }
        else {
            dq[bot + 1] = pts[1];
            dq[bot + 2] = pts[0];
        }
        // remaining pts
        for (let i = 3, len = pts.length; i < len; i++) {
            let pt = pts[i];
            // if inside the hull
            if (left(dq[bot], dq[bot + 1], pt) && left(dq[top - 1], dq[top], pt)) {
                continue;
            }
            // rightmost tangent
            while (!left(dq[bot], dq[bot + 1], pt)) {
                bot += 1;
            }
            bot -= 1;
            dq[bot] = pt;
            // leftmost tangent
            while (!left(dq[top - 1], dq[top], pt)) {
                top -= 1;
            }
            top += 1;
            dq[top] = pt;
        }
        let hull = new Pt_1.Group();
        for (let h = 0; h < (top - bot); h++) {
            hull.push(dq[bot + h]);
        }
        return hull;
    }
    /**
     * Find intersection points of 2 polygons
     * @param poly a Group representing a polygon
     * @param linesOrRays an array of Groups representing lines
     * @param sourceIsRay a boolean value to treat the line as a ray (infinite line). Default is `false`.
     */
    static intersect2D(poly, linesOrRays, sourceIsRay = false) {
        let groups = [];
        for (let i = 0, len = linesOrRays.length; i < len; i++) {
            let _ip = Line.intersectPolygon2D(linesOrRays[i], poly, sourceIsRay);
            if (_ip)
                groups.push(_ip);
        }
        return groups;
    }
    /**
     * Given a point in the polygon as an origin, get an array of lines that connect all the remaining points to the origin point.
     * @param pts a Group representing a polygon
     * @param originIndex the origin point's index in the polygon
     */
    static network(pts, originIndex = 0) {
        let g = [];
        for (let i = 0, len = pts.length; i < len; i++) {
            if (i != originIndex)
                g.push(new Pt_1.Group(pts[originIndex], pts[i]));
        }
        return g;
    }
    /**
     * Given a target Pt, find a Pt in a Group that's nearest to it.
     * @param pts a Group of Pt
     * @param pt Pt to check
     * @returns an index in the pts indicating the nearest Pt, or -1 if none found
     */
    static nearestPt(pts, pt) {
        let _near = Number.MAX_VALUE;
        let _item = -1;
        for (let i = 0, len = pts.length; i < len; i++) {
            let d = pts[i].$subtract(pt).magnitudeSq();
            if (d < _near) {
                _near = d;
                _item = i;
            }
        }
        return _item;
    }
    /**
     * Get a bounding box for each polygon group, as well as a union bounding-box for all groups
     * @param polys an array of Groups, or an array of Pt arrays
     */
    static toRects(poly) {
        let boxes = poly.map((g) => Num_1.Geom.boundingBox(g));
        let merged = Util_1.Util.flatten(boxes, false);
        boxes.unshift(Num_1.Geom.boundingBox(merged));
        return boxes;
    }
}
exports.Polygon = Polygon;
/**
 * Curve class provides static functions to interpolate curves. A curve is usually represented as a Group of 3 control points.
 * You can use the static function as-is, or apply the `op` method in Group or Pt to many of these functions.
 * See [Op guide](../../guide/Op-0400.html) for details.
 */
class Curve {
    /**
     * Get a precalculated coefficients per step
     * @param steps number of steps
     */
    static getSteps(steps) {
        let ts = new Pt_1.Group();
        for (let i = 0; i <= steps; i++) {
            let t = i / steps;
            ts.push(new Pt_1.Pt(t * t * t, t * t, t, 1));
        }
        return ts;
    }
    /**
     * Given an index for the starting position in a Pt group, get the control and/or end points of a curve segment
     * @param pts a group of Pt
     * @param index start index in `pts` array. Default is 0.
     * @param copyStart an optional boolean value to indicate if the start index should be used twice. Default is false.
     * @returns a group of 4 Pts
     */
    static controlPoints(pts, index = 0, copyStart = false) {
        if (index > pts.length - 1)
            return new Pt_1.Group();
        let _index = (i) => (i < pts.length - 1) ? i : pts.length - 1;
        let p0 = pts[index];
        index = (copyStart) ? index : index + 1;
        // get points based on index
        return new Pt_1.Group(p0, pts[_index(index++)], pts[_index(index++)], pts[_index(index++)]);
    }
    /**
     * Calulcate weighted sum to get the interpolated points
     * @param ctrls anchors
     * @param params parameters
     */
    static _calcPt(ctrls, params) {
        let x = ctrls.reduce((a, c, i) => a + c.x * params[i], 0);
        let y = ctrls.reduce((a, c, i) => a + c.y * params[i], 0);
        if (ctrls[0].length > 2) {
            let z = ctrls.reduce((a, c, i) => a + c.z * params[i], 0);
            return new Pt_1.Pt(x, y, z);
        }
        return new Pt_1.Pt(x, y);
    }
    /**
     * Create a Catmull-Rom curve. Catmull-Rom is a kind of Cardinal curve with smooth-looking curve.
     * @param pts a group of anchor Pt
     * @param steps the number of line segments per curve. Defaults to 10 steps.
     * @returns a curve as a group of interpolated Pt
     */
    static catmullRom(pts, steps = 10) {
        if (pts.length < 2)
            return new Pt_1.Group();
        let ps = new Pt_1.Group();
        let ts = Curve.getSteps(steps);
        // use first point twice
        let c = Curve.controlPoints(pts, 0, true);
        for (let i = 0; i <= steps; i++) {
            ps.push(Curve.catmullRomStep(ts[i], c));
        }
        let k = 0;
        while (k < pts.length - 2) {
            let cp = Curve.controlPoints(pts, k);
            if (cp.length > 0) {
                for (let i = 0; i <= steps; i++) {
                    ps.push(Curve.catmullRomStep(ts[i], cp));
                }
                k++;
            }
        }
        return ps;
    }
    /**
     * Interpolate to get a point on Catmull-Rom curve
     * @param step the coefficients [t*t*t, t*t, t, 1]
     * @param ctrls a group of anchor Pts
     * @return an interpolated Pt on the curve
     */
    static catmullRomStep(step, ctrls) {
        /*
        * Basis Matrix (http://mrl.nyu.edu/~perlin/courses/fall2002/hw/12.html)
        * [-0.5,  1.5, -1.5, 0.5],
        * [ 1  , -2.5,  2  ,-0.5],
        * [-0.5,  0  ,  0.5, 0  ],
        * [ 0  ,  1  ,  0  , 0  ]
        */
        let m = new Pt_1.Group(new Pt_1.Pt(-0.5, 1, -0.5, 0), new Pt_1.Pt(1.5, -2.5, 0, 1), new Pt_1.Pt(-1.5, 2, 0.5, 0), new Pt_1.Pt(0.5, -0.5, 0, 0));
        return Curve._calcPt(ctrls, LinearAlgebra_1.Mat.multiply([step], m, true)[0]);
    }
    /**
     * Create a Cardinal spline curve
     * @param pts a group of anchor Pt
     * @param steps the number of line segments per curve. Defaults to 10 steps.
     * @param tension optional value between 0 to 1 to specify a "tension". Default to 0.5 which is the tension for Catmull-Rom curve.
     * @returns a curve as a group of interpolated Pt
     */
    static cardinal(pts, steps = 10, tension = 0.5) {
        if (pts.length < 2)
            return new Pt_1.Group();
        let ps = new Pt_1.Group();
        let ts = Curve.getSteps(steps);
        // use first point twice
        let c = Curve.controlPoints(pts, 0, true);
        for (let i = 0; i <= steps; i++) {
            ps.push(Curve.cardinalStep(ts[i], c, tension));
        }
        let k = 0;
        while (k < pts.length - 2) {
            let cp = Curve.controlPoints(pts, k);
            if (cp.length > 0) {
                for (let i = 0; i <= steps; i++) {
                    ps.push(Curve.cardinalStep(ts[i], cp, tension));
                }
                k++;
            }
        }
        return ps;
    }
    /**
     * Interpolate to get a point on Catmull-Rom curve
     * @param step the coefficients [t*t*t, t*t, t, 1]
     * @param ctrls a group of anchor Pts
     * @param tension optional value between 0 to 1 to specify a "tension". Default to 0.5 which is the tension for Catmull-Rom curve
     * @return an interpolated Pt on the curve
     */
    static cardinalStep(step, ctrls, tension = 0.5) {
        /*
        * Basis Matrix (http://algorithmist.wordpress.com/2009/10/06/cardinal-splines-part-4/)
        * [ -s  2-s  s-2   s ]
        * [ 2s  s-3  3-2s -s ]
        * [ -s   0    s    0 ]
        * [  0   1    0    0 ]
        */
        let m = new Pt_1.Group(new Pt_1.Pt(-1, 2, -1, 0), new Pt_1.Pt(-1, 1, 0, 0), new Pt_1.Pt(1, -2, 1, 0), new Pt_1.Pt(1, -1, 0, 0));
        let h = LinearAlgebra_1.Mat.multiply([step], m, true)[0].multiply(tension);
        let h2 = (2 * step[0] - 3 * step[1] + 1);
        let h3 = -2 * step[0] + 3 * step[1];
        let pt = Curve._calcPt(ctrls, h);
        pt.x += h2 * ctrls[1].x + h3 * ctrls[2].x;
        pt.y += h2 * ctrls[1].y + h3 * ctrls[2].y;
        if (pt.length > 2)
            pt.z += h2 * ctrls[1].z + h3 * ctrls[2].z;
        return pt;
    }
    /**
     * Create a Bezier curve. In a cubic bezier curve, the first and 4th anchors are end-points, and 2nd and 3rd anchors are control-points.
     * @param pts a group of anchor Pt
     * @param steps the number of line segments per curve. Defaults to 10 steps.
     * @returns a curve as a group of interpolated Pt
     */
    static bezier(pts, steps = 10) {
        if (pts.length < 4)
            return new Pt_1.Group();
        let ps = new Pt_1.Group();
        let ts = Curve.getSteps(steps);
        let k = 0;
        while (k < pts.length - 3) {
            let c = Curve.controlPoints(pts, k);
            if (c.length > 0) {
                for (let i = 0; i <= steps; i++) {
                    ps.push(Curve.bezierStep(ts[i], c));
                }
                // go to the next set of point, but assume current end pt is next start pt
                k += 3;
            }
        }
        return ps;
    }
    /**
     * Interpolate to get a point on a cubic Bezier curve
     * @param step the coefficients [t*t*t, t*t, t, 1]
     * @param ctrls a group of anchor Pts
     * @return an interpolated Pt on the curve
     */
    static bezierStep(step, ctrls) {
        /*
        * Bezier basis matrix
        * [ -1,  3, -3,  1 ]
        * [  3, -6,  3,  0 ]
        * [ -3,  3,  0,  0 ]
        * [  1,  0,  0,  0 ]
        */
        let m = new Pt_1.Group(new Pt_1.Pt(-1, 3, -3, 1), new Pt_1.Pt(3, -6, 3, 0), new Pt_1.Pt(-3, 3, 0, 0), new Pt_1.Pt(1, 0, 0, 0));
        return Curve._calcPt(ctrls, LinearAlgebra_1.Mat.multiply([step], m, true)[0]);
    }
    /**
     * Create a B-spline curve
     * @param pts a group of anchor Pt
     * @param steps the number of line segments per curve. Defaults to 10 steps.
     * @param tension optional value between 0 to n to specify a "tension". Default is 1 which is the usual tension.
     * @returns a curve as a group of interpolated Pt
     */
    static bspline(pts, steps = 10, tension = 1) {
        if (pts.length < 2)
            return new Pt_1.Group();
        let ps = new Pt_1.Group();
        let ts = Curve.getSteps(steps);
        let k = 0;
        while (k < pts.length - 3) {
            let c = Curve.controlPoints(pts, k);
            if (c.length > 0) {
                if (tension !== 1) {
                    for (let i = 0; i <= steps; i++) {
                        ps.push(Curve.bsplineTensionStep(ts[i], c, tension));
                    }
                }
                else {
                    for (let i = 0; i <= steps; i++) {
                        ps.push(Curve.bsplineStep(ts[i], c));
                    }
                }
                k++;
            }
        }
        return ps;
    }
    /**
     * Interpolate to get a point on a B-spline curve
     * @param step the coefficients [t*t*t, t*t, t, 1]
     * @param ctrls a group of anchor Pts
     * @return an interpolated Pt on the curve
     */
    static bsplineStep(step, ctrls) {
        /*
        * Basis matrix:
        * [ -1.0/6.0,  3.0/6.0, -3.0/6.0, 1.0/6.0 ],
        * [  3.0/6.0, -6.0/6.0,  3.0/6.0,    0.0 ],
        * [ -3.0/6.0,      0.0,  3.0/6.0,    0.0 ],
        * [  1.0/6.0,  4.0/6.0,  1.0/6.0,    0.0 ]
        */
        let m = new Pt_1.Group(new Pt_1.Pt(-0.16666666666666666, 0.5, -0.5, 0.16666666666666666), new Pt_1.Pt(0.5, -1, 0, 0.6666666666666666), new Pt_1.Pt(-0.5, 0.5, 0.5, 0.16666666666666666), new Pt_1.Pt(0.16666666666666666, 0, 0, 0));
        return Curve._calcPt(ctrls, LinearAlgebra_1.Mat.multiply([step], m, true)[0]);
    }
    /**
     * Interpolate to get a point on a B-spline curve
     * @param step the coefficients [t*t*t, t*t, t, 1]
     * @param ctrls a group of anchor Pts
     * @param tension optional value between 0 to n to specify a "tension". Default to 1 which is the usual tension.
     * @return an interpolated Pt on the curve
     */
    static bsplineTensionStep(step, ctrls, tension = 1) {
        /*
        * Basis matrix:
        * [ -1/6a, 2 - 1.5a, 1.5a - 2, 1/6a ]
        * [ 0.5a,  2a-3,     3-2.5a    0 ]
        * [ -0.5a, 0,        0.5a,     0 ]
        * [ 1/6a,  1 - 1/3a, 1/6a,     0 ]
        */
        let m = new Pt_1.Group(new Pt_1.Pt(-0.16666666666666666, 0.5, -0.5, 0.16666666666666666), new Pt_1.Pt(-1.5, 2, 0, -0.3333333333333333), new Pt_1.Pt(1.5, -2.5, 0.5, 0.16666666666666666), new Pt_1.Pt(0.16666666666666666, 0, 0, 0));
        let h = LinearAlgebra_1.Mat.multiply([step], m, true)[0].multiply(tension);
        let h2 = (2 * step[0] - 3 * step[1] + 1);
        let h3 = -2 * step[0] + 3 * step[1];
        let pt = Curve._calcPt(ctrls, h);
        pt.x += h2 * ctrls[1].x + h3 * ctrls[2].x;
        pt.y += h2 * ctrls[1].y + h3 * ctrls[2].y;
        if (pt.length > 2)
            pt.z += h2 * ctrls[1].z + h3 * ctrls[2].z;
        return pt;
    }
}
exports.Curve = Curve;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Source code licensed under Apache License 2.0. 
// Copyright © 2017 William Ngan. (https://github.com/williamngan/pts)
Object.defineProperty(exports, "__esModule", { value: true });
const Util_1 = __webpack_require__(1);
const Op_1 = __webpack_require__(2);
const Pt_1 = __webpack_require__(0);
const LinearAlgebra_1 = __webpack_require__(4);
/**
 * Num class provides various helper functions for basic numeric operations
 */
class Num {
    /**
     * Check if two numbers are equal or almost equal within a threshold
     * @param a number a
     * @param b number b
     * @param threshold a threshold within which the two numbers are considered equal
     */
    static equals(a, b, threshold = 0.00001) {
        return Math.abs(a - b) < threshold;
    }
    /**
     * Linear interpolation
     * @param a start value
     * @param b end value
     * @param t usually a value between 0 to 1
     */
    static lerp(a, b, t) {
        return (1 - t) * a + t * b;
    }
    /**
     * Clamp values between min and max
     * @param val value to clamp
     * @param min min value
     * @param max max value
     */
    static clamp(val, min, max) {
        return Math.max(min, Math.min(max, val));
    }
    /**
     * Different from Num.clamp in that the value out-of-bound will be "looped back" to the other end.
     * @param val value to bound
     * @param min min value
     * @param max max value
     * @example `boundValue(361, 0, 360)` will return 1
     */
    static boundValue(val, min, max) {
        let len = Math.abs(max - min);
        let a = val % len;
        if (a > max)
            a -= len;
        else if (a < min)
            a += len;
        return a;
    }
    /**
     * Check if a value is within
     * @param p
     * @param a
     * @param b
     */
    static within(p, a, b) {
        return p >= Math.min(a, b) && p <= Math.max(a, b);
    }
    /**
     * Get a random number within a range
     * @param a range value 1
     * @param b range value 2
     */
    static randomRange(a, b = 0) {
        let r = (a > b) ? (a - b) : (b - a);
        return a + Math.random() * r;
    }
    /**
     * Normalize a value within a range
     * @param n the value to normalize
     * @param a range value 1
     * @param b range value 1
     */
    static normalizeValue(n, a, b) {
        let min = Math.min(a, b);
        let max = Math.max(a, b);
        return (n - min) / (max - min);
    }
    /**
     * Sum a group of numeric arrays
     * @param pts an array of numeric arrays
     * @returns a array of sums
     */
    static sum(pts) {
        let c = new Pt_1.Pt(pts[0]);
        for (let i = 1, len = pts.length; i < len; i++) {
            LinearAlgebra_1.Vec.add(c, pts[i]);
        }
        return c;
    }
    /**
     * Sum a group of numeric arrays
     * @param pts an array of numeric arrays
     * @returns a array of sums
     */
    static average(pts) {
        return Num.sum(pts).divide(pts.length);
    }
    /**
     * Given a value between 0 to 1, returns a value that cycles between 0 -> 1 -> 0 using sine method.
     * @param t a value between 0 to 1
     * @return a value between 0 to 1
     */
    static cycle(t) {
        return (Math.sin(Math.PI * 2 * t) + 1) / 2;
    }
    /**
     * Map a value from one range to another
     * @param n a value in the first range
     * @param currMin lower bound of the first range
     * @param currMax upper bound of the first range
     * @param targetMin lower bound of the second range
     * @param targetMax upper bound of the second range
     * @returns a remapped value in the second range
     */
    static mapToRange(n, currA, currB, targetA, targetB) {
        if (currA == currB)
            throw new Error("[currMin, currMax] must define a range that is not zero");
        let min = Math.min(targetA, targetB);
        let max = Math.max(targetA, targetB);
        return Num.normalizeValue(n, currA, currB) * (max - min) + min;
    }
}
exports.Num = Num;
/**
 * Geom class provides various helper functions for basic geometric operations
 */
class Geom {
    /**
     * Bound an angle between 0 to 360 degrees
     */
    static boundAngle(angle) {
        return Num.boundValue(angle, 0, 360);
    }
    /**
     * Bound a radian between 0 to 2-PI
     */
    static boundRadian(angle) {
        return Num.boundValue(angle, 0, Util_1.Const.two_pi);
    }
    /**
     * Convert an angle in degree to radian
     */
    static toRadian(angle) {
        return angle * Util_1.Const.deg_to_rad;
    }
    /**
     * Convert an angle in radian to degree
     */
    static toDegree(radian) {
        return radian * Util_1.Const.rad_to_deg;
    }
    /**
     * Get a bounding box for a set of Pts
     * @param pts a Group or an array of Pts
     * @return a Group of two Pts, representing the top-left and bottom-right corners.
     */
    static boundingBox(pts) {
        let minPt = pts.reduce((a, p) => a.$min(p));
        let maxPt = pts.reduce((a, p) => a.$max(p));
        return new Pt_1.Group(minPt, maxPt);
    }
    /**
     * Get a centroid (the average middle point) for a set of Pts
     * @param pts a Group or an array of Pts
     * @return a centroid Pt
     */
    static centroid(pts) {
        return Num.average(pts);
    }
    /**
     * Given an anchor Pt, rebase all Pts in this group either to or from this anchor base.
     * @param pts a Group or array of Pt
     * @param ptOrIndex an index for the Pt array, or an external Pt
     * @param direction "to" (subtract all Pt with this anchor base) or "from" (add all Pt from this anchor base)
     */
    static anchor(pts, ptOrIndex = 0, direction = "to") {
        let method = (direction == "to") ? "subtract" : "add";
        for (let i = 0, len = pts.length; i < len; i++) {
            if (typeof ptOrIndex == "number") {
                if (ptOrIndex !== i)
                    pts[i][method](pts[ptOrIndex]);
            }
            else {
                pts[i][method](ptOrIndex);
            }
        }
    }
    /**
     * Get an interpolated (or extrapolated) value between two Pts
     * @param a first Pt
     * @param b second Pt
     * @param t a value between 0 to 1 to interpolate, or any other value to extrapolate
     * @returns interpolated point as a new Pt
     */
    static interpolate(a, b, t = 0.5) {
        let len = Math.min(a.length, b.length);
        let d = Pt_1.Pt.make(len);
        for (let i = 0; i < len; i++) {
            d[i] = a[i] * (1 - t) + b[i] * t;
        }
        return d;
    }
    /**
     * Find two Pt that are perpendicular to this Pt (2D)
     * @param axis a string such as "xy" (use Const.xy) or an array to specify index for two dimensions
     * @returns an array of two Pt that are perpendicular to this Pt
     */
    static perpendicular(pt, axis = Util_1.Const.xy) {
        let y = axis[1];
        let x = axis[0];
        let p = new Pt_1.Pt(pt);
        let pa = new Pt_1.Pt(p);
        pa[x] = -p[y];
        pa[y] = p[x];
        let pb = new Pt_1.Pt(p);
        pb[x] = p[y];
        pb[y] = -p[x];
        return new Pt_1.Group(pa, pb);
    }
    /**
     * Check if two Pts (vectors) are perpendicular to each other
     */
    static isPerpendicular(p1, p2) {
        return new Pt_1.Pt(p1).dot(p2) === 0;
    }
    /**
     * Check if a Pt is within the rectangular boundary defined by two Pts
     * @param pt the Pt to check
     * @param boundPt1 boundary Pt 1
     * @param boundPt2 boundary Pt 2
     */
    static withinBound(pt, boundPt1, boundPt2) {
        for (let i = 0, len = Math.min(pt.length, boundPt1.length, boundPt2.length); i < len; i++) {
            if (!Num.within(pt[i], boundPt1[i], boundPt2[i]))
                return false;
        }
        return true;
    }
    /**
     * Sort the Pts so that their edges will form a non-overlapping polygon
     * Ref: https://stackoverflow.com/questions/6989100/sort-points-in-clockwise-order
     * @param pts an array of Pts
     */
    static sortEdges(pts) {
        let bounds = Geom.boundingBox(pts);
        let center = bounds[1].add(bounds[0]).divide(2);
        let fn = (a, b) => {
            if (a.length < 2 || b.length < 2)
                throw new Error("Pt dimension cannot be less than 2");
            let da = a.$subtract(center);
            let db = b.$subtract(center);
            if (da[0] >= 0 && db[0] < 0)
                return 1;
            if (da[0] < 0 && db[0] >= 0)
                return -1;
            if (da[0] == 0 && db[0] == 0) {
                if (da[1] >= 0 || db[1] >= 0)
                    return (da[1] > db[1]) ? 1 : -1;
                return (db[1] > da[1]) ? 1 : -1;
            }
            // compute the cross product of vectors (center -> a) x (center -> b)
            let det = da.cross2D(db);
            if (det < 0)
                return 1;
            if (det > 0)
                return -1;
            // points a and b are on the same line from the center
            // check which point is closer to the center
            return (da[0] * da[0] + da[1] * da[1] > db[0] * db[0] + db[1] * db[1]) ? 1 : -1;
        };
        return pts.sort(fn);
    }
    /**
     * Scale a Pt or a Group of Pts
     * @param ps a Pt or a Group of Pts
     * @param scale scale value
     * @param anchor optional anchor point to scale from
     */
    static scale(ps, scale, anchor) {
        let pts = (!Array.isArray(ps)) ? [ps] : ps;
        let scs = (typeof scale == "number") ? Pt_1.Pt.make(pts[0].length, scale) : scale;
        if (!anchor)
            anchor = Pt_1.Pt.make(pts[0].length, 0);
        for (let i = 0, len = pts.length; i < len; i++) {
            let p = pts[i];
            for (let k = 0, lenP = p.length; k < lenP; k++) {
                p[k] = (anchor && anchor[k]) ? anchor[k] + (p[k] - anchor[k]) * scs[k] : p[k] * scs[k];
            }
        }
        return Geom;
    }
    /**
     * Rotate a Pt or a Group of Pts in 2D space
     * @param ps a Pt or a Group of Pts
     * @param angle rotate angle
     * @param anchor optional anchor point to rotate from
     * @param axis optional axis such as "yz" to define a 2D plane of rotation
     */
    static rotate2D(ps, angle, anchor, axis) {
        let pts = (!Array.isArray(ps)) ? [ps] : ps;
        let fn = (anchor) ? LinearAlgebra_1.Mat.rotateAt2DMatrix : LinearAlgebra_1.Mat.rotate2DMatrix;
        if (!anchor)
            anchor = Pt_1.Pt.make(pts[0].length, 0);
        let cos = Math.cos(angle);
        let sin = Math.sin(angle);
        for (let i = 0, len = pts.length; i < len; i++) {
            let p = (axis) ? pts[i].$take(axis) : pts[i];
            p.to(LinearAlgebra_1.Mat.transform2D(p, fn(cos, sin, anchor)));
        }
        return Geom;
    }
    /**
     * Shear a Pt or a Group of Pts in 2D space
     * @param ps a Pt or a Group of Pts
     * @param scale shearing value which can be a number or an array of 2 numbers
     * @param anchor optional anchor point to shear from
     * @param axis optional axis such as "yz" to define a 2D plane of shearing
     */
    static shear2D(ps, scale, anchor, axis) {
        let pts = (!Array.isArray(ps)) ? [ps] : ps;
        let s = (typeof scale == "number") ? [scale, scale] : scale;
        if (!anchor)
            anchor = Pt_1.Pt.make(pts[0].length, 0);
        let fn = (anchor) ? LinearAlgebra_1.Mat.shearAt2DMatrix : LinearAlgebra_1.Mat.shear2DMatrix;
        let tanx = Math.tan(s[0]);
        let tany = Math.tan(s[1]);
        for (let i = 0, len = pts.length; i < len; i++) {
            let p = (axis) ? pts[i].$take(axis) : pts[i];
            p.to(LinearAlgebra_1.Mat.transform2D(p, fn(tanx, tany, anchor)));
        }
        return Geom;
    }
    /**
     * Reflect a Pt or a Group of Pts along a 2D line
     * @param ps a Pt or a Group of Pts
     * @param line a Group of 2 Pts that defines a line for reflection
     * @param axis optional axis such as "yz" to define a 2D plane of reflection
     */
    static reflect2D(ps, line, axis) {
        let pts = (!Array.isArray(ps)) ? [ps] : ps;
        for (let i = 0, len = pts.length; i < len; i++) {
            let p = (axis) ? pts[i].$take(axis) : pts[i];
            p.to(LinearAlgebra_1.Mat.transform2D(p, LinearAlgebra_1.Mat.reflectAt2DMatrix(line[0], line[1])));
        }
        return Geom;
    }
    /**
     * Generate a sine and cosine lookup table
     * @returns an object with 2 tables (array of 360 values) and 2 functions to get sin/cos given a radian parameter. { sinTable:Float64Array, cosTable:Float64Array, sin:(rad)=>number, cos:(rad)=>number }
     */
    static cosTable() {
        let cos = new Float64Array(360);
        for (let i = 0; i < 360; i++)
            cos[i] = Math.cos(i * Math.PI / 180);
        let find = (rad) => cos[Math.floor(Geom.boundAngle(Geom.toDegree(rad)))];
        return { table: cos, cos: find };
    }
    /**
     * Generate a sine and cosine lookup table
     * @returns an object with 2 tables (array of 360 values) and 2 functions to get sin/cos given a radian parameter. { sinTable:Float64Array, cosTable:Float64Array, sin:(rad)=>number, cos:(rad)=>number }
     */
    static sinTable() {
        let sin = new Float64Array(360);
        for (let i = 0; i < 360; i++)
            sin[i] = Math.sin(i * Math.PI / 180);
        let find = (rad) => sin[Math.floor(Geom.boundAngle(Geom.toDegree(rad)))];
        return { table: sin, sin: find };
    }
}
exports.Geom = Geom;
/**
 * Shaping provides various shaping/easing functions to interpolate a value non-linearly.
 */
class Shaping {
    /**
     * Linear mapping
     * @parma t a value between 0 to 1
     * @parma c the value to shape, default is 1
     */
    static linear(t, c = 1) {
        return c * t;
    }
    /**
     * Quadratic in, adapted from Robert Penner's [easing functions](http://robertpenner.com/easing/)
     * @parma t a value between 0 to 1
     * @parma c the value to shape, default is 1
    */
    static quadraticIn(t, c = 1) {
        return c * t * t;
    }
    /**
     * Quadratic out, adapted from Robert Penner's [easing functions](http://robertpenner.com/easing/)
     * @parma t a value between 0 to 1
     * @parma c the value to shape, default is 1
    */
    static quadraticOut(t, c = 1) {
        return -c * t * (t - 2);
    }
    /**
     * Quadratic in-out, adapted from Robert Penner's [easing functions](http://robertpenner.com/easing/)
     * @parma t a value between 0 to 1
     * @parma c the value to shape, default is 1
     */
    static quadraticInOut(t, c = 1) {
        let dt = t * 2;
        return (t < 0.5) ? c / 2 * t * t * 4 : -c / 2 * ((dt - 1) * (dt - 3) - 1);
    }
    /**
     * Cubic in, adapted from Robert Penner's [easing functions](http://robertpenner.com/easing/)
     * @parma t a value between 0 to 1
     * @parma c the value to shape, default is 1
     */
    static cubicIn(t, c = 1) {
        return c * t * t * t;
    }
    /**
     * Cubic out, adapted from Robert Penner's [easing functions](http://robertpenner.com/easing/)
     * @parma t a value between 0 to 1
     * @parma c the value to shape, default is 1
     */
    static cubicOut(t, c = 1) {
        let dt = t - 1;
        return c * (dt * dt * dt + 1);
    }
    /**
     * Cubic in-out, adapted from Robert Penner's [easing functions](http://robertpenner.com/easing/)
     * @parma t a value between 0 to 1
     * @parma c the value to shape, default is 1
     */
    static cubicInOut(t, c = 1) {
        let dt = t * 2;
        return (t < 0.5) ? c / 2 * dt * dt * dt : c / 2 * ((dt - 2) * (dt - 2) * (dt - 2) + 2);
    }
    /**
     * Exponential ease In, adapted from Golan Levin's [polynomial shapers](http://www.flong.com/texts/code/shapers_poly/)
     * @parma t a value between 0 to 1
     * @parma c the value to shape, default is 1
     * @parma p a value between 0 to 1 to control the curve. Default is 0.25.
     */
    static exponentialIn(t, c = 1, p = 0.25) {
        return c * Math.pow(t, 1 / p);
    }
    /**
     * Exponential ease out, adapted from Golan Levin's [polynomial shapers](http://www.flong.com/texts/code/shapers_poly/)
     * @parma t a value between 0 to 1
     * @parma c the value to shape, default is 1
     * @parma p a value between 0 to 1 to control the curve. Default is 0.25.
     */
    static exponentialOut(t, c = 1, p = 0.25) {
        return c * Math.pow(t, p);
    }
    /**
     * Sinuous in, adapted from Robert Penner's [easing functions](http://robertpenner.com/easing/)
     * @parma t a value between 0 to 1
     * @parma c the value to shape, default is 1
     */
    static sineIn(t, c = 1) {
        return -c * Math.cos(t * Util_1.Const.half_pi) + c;
    }
    /**
     * Sinuous out, adapted from Robert Penner's [easing functions](http://robertpenner.com/easing/)
     * @parma t a value between 0 to 1
     * @parma c the value to shape, default is 1
     */
    static sineOut(t, c = 1) {
        return c * Math.sin(t * Util_1.Const.half_pi);
    }
    /**
     * Sinuous in-out, adapted from Robert Penner's [easing functions](http://robertpenner.com/easing/)
     * @parma t a value between 0 to 1
     * @parma c the value to shape, default is 1
     */
    static sineInOut(t, c = 1) {
        return -c / 2 * (Math.cos(Math.PI * t) - 1);
    }
    /**
     * A faster way to approximate cosine ease in-out using Blinn-Wyvill Approximation. Adapated from Golan Levin's [polynomial shaping](http://www.flong.com/texts/code/shapers_poly/)
     * @parma t a value between 0 to 1
     * @parma c the value to shape, default is 1
     */
    static cosineApprox(t, c = 1) {
        let t2 = t * t;
        let t4 = t2 * t2;
        let t6 = t4 * t2;
        return c * (4 * t6 / 9 - 17 * t4 / 9 + 22 * t2 / 9);
    }
    /**
     * Circular in, adapted from Robert Penner's [easing functions](http://robertpenner.com/easing/)
     * @parma t a value between 0 to 1
     * @parma c the value to shape, default is 1
     */
    static circularIn(t, c = 1) {
        return -c * (Math.sqrt(1 - t * t) - 1);
    }
    /**
     * Circular out, adapted from Robert Penner's [easing functions](http://robertpenner.com/easing/)
     * @parma t a value between 0 to 1
     * @parma c the value to shape, default is 1
     */
    static circularOut(t, c = 1) {
        let dt = t - 1;
        return c * Math.sqrt(1 - dt * dt);
    }
    /**
     * Circular in-out, adapted from Robert Penner's [easing functions](http://robertpenner.com/easing/)
     * @parma t a value between 0 to 1
     * @parma c the value to shape, default is 1
     */
    static circularInOut(t, c = 1) {
        let dt = t * 2;
        return (t < 0.5) ? -c / 2 * (Math.sqrt(1 - dt * dt) - 1) : c / 2 * (Math.sqrt(1 - (dt - 2) * (dt - 2)) + 1);
    }
    /**
     * Elastic in, adapted from Robert Penner's [easing functions](http://robertpenner.com/easing/)
     * @parma t a value between 0 to 1
     * @parma c the value to shape, default is 1
     * @parma p elastic parmeter between 0 to 1. The lower the number, the more elastic it will be. Default is 0.7.
     */
    static elasticIn(t, c = 1, p = 0.7) {
        let dt = t - 1;
        let s = (p / Util_1.Const.two_pi) * 1.5707963267948966;
        return c * (-Math.pow(2, 10 * dt) * Math.sin((dt - s) * Util_1.Const.two_pi / p));
    }
    /**
     * Elastic out, adapted from Robert Penner's [easing functions](http://robertpenner.com/easing/)
     * @parma t a value between 0 to 1
     * @parma c the value to shape, default is 1
     * @parma p elastic parmeter between 0 to 1. The lower the number, the more elastic it will be. Default is 0.7.
     */
    static elasticOut(t, c = 1, p = 0.7) {
        let s = (p / Util_1.Const.two_pi) * 1.5707963267948966;
        return c * (Math.pow(2, -10 * t) * Math.sin((t - s) * Util_1.Const.two_pi / p)) + c;
    }
    /**
     * Elastic in-out, adapted from Robert Penner's [easing functions](http://robertpenner.com/easing/)
     * @parma t a value between 0 to 1
     * @parma c the value to shape, default is 1
     * @parma p elastic parmeter between 0 to 1. The lower the number, the more elastic it will be. Default is 0.6.
     */
    static elasticInOut(t, c = 1, p = 0.6) {
        let dt = t * 2;
        let s = (p / Util_1.Const.two_pi) * 1.5707963267948966;
        if (t < 0.5) {
            dt -= 1;
            return c * (-0.5 * (Math.pow(2, 10 * dt) * Math.sin((dt - s) * Util_1.Const.two_pi / p)));
        }
        else {
            dt -= 1;
            return c * (0.5 * (Math.pow(2, -10 * dt) * Math.sin((dt - s) * Util_1.Const.two_pi / p))) + c;
        }
    }
    /**
     * Bounce in, adapted from Robert Penner's [easing functions](http://robertpenner.com/easing/)
     * @parma t a value between 0 to 1
     * @parma c the value to shape, default is 1
     */
    static bounceIn(t, c = 1) {
        return c - Shaping.bounceOut((1 - t), c);
    }
    /**
     * Bounce out, adapted from Robert Penner's [easing functions](http://robertpenner.com/easing/)
     * @parma t a value between 0 to 1
     * @parma c the value to shape, default is 1
     */
    static bounceOut(t, c = 1) {
        if (t < (1 / 2.75)) {
            return c * (7.5625 * t * t);
        }
        else if (t < (2 / 2.75)) {
            t -= 1.5 / 2.75;
            return c * (7.5625 * t * t + 0.75);
        }
        else if (t < (2.5 / 2.75)) {
            t -= 2.25 / 2.75;
            return c * (7.5625 * t * t + 0.9375);
        }
        else {
            t -= 2.625 / 2.75;
            return c * (7.5625 * t * t + 0.984375);
        }
    }
    /**
     * Bounce in-out, adapted from Robert Penner's [easing functions](http://robertpenner.com/easing/)
     * @parma t a value between 0 to 1
     * @parma c the value to shape, default is 1
     */
    static bounceInOut(t, c = 1) {
        return (t < 0.5) ? Shaping.bounceIn(t * 2, c) / 2 : Shaping.bounceOut(t * 2 - 1, c) / 2 + c / 2;
    }
    /**
     * Sigmoid curve changes its shape adapted from the input value, but always returns a value between 0 to 1.
     * @parma t a value between 0 to 1
     * @parma c the value to shape, default is 1
     * @parma p the larger the value, the "steeper" the curve will be. Default is 10.
     */
    static sigmoid(t, c = 1, p = 10) {
        let d = p * (t - 0.5);
        return c / (1 + Math.exp(-d));
    }
    /**
     * The Logistic Sigmoid is a useful curve. Adapted from Golan Levin's [shaping function](http://www.flong.com/texts/code/shapers_exp/)
     * @parma t a value between 0 to 1
     * @parma c the value to shape, default is 1
     * @parma p a parameter between 0 to 1 to control the steepness of the curve. Higher is steeper. Default is 0.7.
     */
    static logSigmoid(t, c = 1, p = 0.7) {
        p = Math.max(Util_1.Const.epsilon, Math.min(1 - Util_1.Const.epsilon, p));
        p = 1 / (1 - p);
        let A = 1 / (1 + Math.exp(((t - 0.5) * p * -2)));
        let B = 1 / (1 + Math.exp(p));
        let C = 1 / (1 + Math.exp(-p));
        return c * (A - B) / (C - B);
    }
    /**
     * An exponential seat curve. Adapted from Golan Levin's [shaping functions](http://www.flong.com/texts/code/shapers_exp/)
     * @parma t a value between 0 to 1
     * @parma c the value to shape, default is 1
     * @parma p a parameter between 0 to 1 to control the steepness of the curve. Higher is steeper. Default is 0.5.
     */
    static seat(t, c = 1, p = 0.5) {
        if ((t < 0.5)) {
            return c * (Math.pow(2 * t, 1 - p)) / 2;
        }
        else {
            return c * (1 - (Math.pow(2 * (1 - t), 1 - p)) / 2);
        }
    }
    /**
     * Quadratic bezier curve. Adapted from Golan Levin's [shaping functions](http://www.flong.com/texts/code/shapers_exp/)
     * @parma t a value between 0 to 1
     * @parma c the value to shape, default is 1
     * @parma p1 a Pt object specifying the first control Pt, or a value specifying the control Pt's x position (its y position will default to 0.5). Default is `Pt(0.95, 0.95)
     */
    static quadraticBezier(t, c = 1, p = [0.05, 0.95]) {
        let a = (typeof p != "number") ? p[0] : p;
        let b = (typeof p != "number") ? p[1] : 0.5;
        let om2a = 1 - 2 * a;
        if (om2a === 0) {
            om2a = Util_1.Const.epsilon;
        }
        let d = (Math.sqrt(a * a + om2a * t) - a) / om2a;
        return c * ((1 - 2 * b) * (d * d) + (2 * b) * d);
    }
    /**
     * Cubic bezier curve. This reuses the bezier functions in Curve class.
     * @parma t a value between 0 to 1
     * @parma c the value to shape, default is 1
     * @parma p1` a Pt object specifying the first control Pt. Default is `Pt(0.1, 0.7).
     * @parma p2` a Pt object specifying the second control Pt. Default is `Pt(0.9, 0.2).
     */
    static cubicBezier(t, c = 1, p1 = [0.1, 0.7], p2 = [0.9, 0.2]) {
        let curve = new Pt_1.Group(new Pt_1.Pt(0, 0), new Pt_1.Pt(p1), new Pt_1.Pt(p2), new Pt_1.Pt(1, 1));
        return c * Op_1.Curve.bezierStep(new Pt_1.Pt(t * t * t, t * t, t, 1), Op_1.Curve.controlPoints(curve)).y;
    }
    /**
     * Give a Pt, draw a quadratic curve that will pass through that Pt as closely as possible. Adapted from Golan Levin's [shaping functions](http://www.flong.com/texts/code/shapers_poly/)
     * @parma t a value between 0 to 1
     * @parma c the value to shape, default is 1
     * @parma p1` a Pt object specifying the Pt to pass through. Default is `Pt(0.2, 0.35)
     */
    static quadraticTarget(t, c = 1, p1 = [0.2, 0.35]) {
        let a = Math.min(1 - Util_1.Const.epsilon, Math.max(Util_1.Const.epsilon, p1[0]));
        let b = Math.min(1, Math.max(0, p1[1]));
        let A = (1 - b) / (1 - a) - (b / a);
        let B = (A * (a * a) - b) / a;
        let y = A * (t * t) - B * t;
        return c * Math.min(1, Math.max(0, y));
    }
    /**
     * Step function is a simple jump from 0 to 1 at a specific Pt in time
     * @parma t a value between 0 to 1
     * @parma c the value to shape, default is 1
     * @parma p usually a value between 0 to 1, which specify the Pt to "jump". Default is 0.5 which is in the middle.
     */
    static cliff(t, c = 1, p = 0.5) {
        return (t > p) ? c : 0;
    }
    /**
     * Convert any shaping functions into a series of steps
     * @parma fn the original shaping function
     * @parma steps the number of steps
     * @parma t a value between 0 to 1
     * @parma c the value to shape, default is 1
     * @parma args optional paramters to pass to original function
     */
    static step(fn, steps, t, c, ...args) {
        let s = 1 / steps;
        let tt = Math.floor(t / s) * s;
        return fn(tt, c, ...args);
    }
}
exports.Shaping = Shaping;
/**
 * Range object keeps track of a Group of n-dimensional Pts to provide its minimum, maximum, and magnitude in each dimension.
 * It also provides convenient functions such as mapping the Group to another range.
 */
class Range {
    /**
     * Construct a Range instance for a Group of Pts,
     * @param g a Group or an array of Pts
     */
    constructor(g) {
        this._dims = 0;
        this._source = Pt_1.Group.fromPtArray(g);
        this.calc();
    }
    /**
     * Get this Range's maximum values per dimension
     */
    get max() { return this._max.clone(); }
    /**
     * Get this Range's minimum values per dimension
     */
    get min() { return this._min.clone(); }
    /**
     * Get this Range's magnitude in each dimension
     */
    get magnitude() { return this._mag.clone(); }
    /**
     * Go through the group and find its min and max values.
     * Usually you don't need to call this function directly.
     */
    calc() {
        if (!this._source)
            return;
        let dims = this._source[0].length;
        this._dims = dims;
        let max = new Pt_1.Pt(dims);
        let min = new Pt_1.Pt(dims);
        let mag = new Pt_1.Pt(dims);
        for (let i = 0; i < dims; i++) {
            max[i] = Util_1.Const.min;
            min[i] = Util_1.Const.max;
            mag[i] = 0;
            let s = this._source.zipSlice(i);
            for (let k = 0, len = s.length; k < len; k++) {
                max[i] = Math.max(max[i], s[k]);
                min[i] = Math.min(min[i], s[k]);
                mag[i] = max[i] - min[i];
            }
        }
        this._max = max;
        this._min = min;
        this._mag = mag;
        return this;
    }
    /**
     * Map this Range to another range of values
     * @param min target range's minimum value
     * @param max target range's maximum value
     * @param exclude Optional boolean array where `true` means excluding the conversion in that specific dimension.
     */
    mapTo(min, max, exclude) {
        let target = new Pt_1.Group();
        for (let i = 0, len = this._source.length; i < len; i++) {
            let g = this._source[i];
            let n = new Pt_1.Pt(this._dims);
            for (let k = 0; k < this._dims; k++) {
                n[k] = (exclude && exclude[k]) ? g[k] : Num.mapToRange(g[k], this._min[k], this._max[k], min, max);
            }
            target.push(n);
        }
        return target;
    }
    /**
     * Add more Pts to this Range and recalculate its min and max values
     * @param g a Group or an array of Pts to append to this Range
     * @param update Optional. Set the parameter to `false` if you want to append without immediately updating this Range's min and max values. Default is `true`.
     */
    append(g, update = true) {
        if (g[0].length !== this._dims)
            throw new Error(`Dimensions don't match. ${this._dims} dimensions in Range and ${g[0].length} provided in parameter. `);
        this._source = this._source.concat(g);
        if (update)
            this.calc();
        return this;
    }
    /**
     * Create a number of evenly spaced "ticks" that span this Range's min and max value.
     * @param count number of subdivision. For example, 10 subdivision will return 11 tick values, which include first(min) and last(max) values.
     */
    ticks(count) {
        let g = new Pt_1.Group();
        for (let i = 0; i <= count; i++) {
            let p = new Pt_1.Pt(this._dims);
            for (let k = 0, len = this._max.length; k < len; k++) {
                p[k] = Num.lerp(this._min[k], this._max[k], i / count);
            }
            g.push(p);
        }
        return g;
    }
}
exports.Range = Range;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Source code licensed under Apache License 2.0. 
// Copyright © 2017 William Ngan. (https://github.com/williamngan/pts)
Object.defineProperty(exports, "__esModule", { value: true });
const Pt_1 = __webpack_require__(0);
const Op_1 = __webpack_require__(2);
/**
 * Vec provides static function for vector operations. It's not yet optimized but good enough to use.
 */
class Vec {
    /**
     * Add b to vector `a`
     * @returns vector `a`
     */
    static add(a, b) {
        if (typeof b == "number") {
            for (let i = 0, len = a.length; i < len; i++)
                a[i] += b;
        }
        else {
            for (let i = 0, len = a.length; i < len; i++)
                a[i] += b[i] || 0;
        }
        return a;
    }
    /**
     * Subtract `b` from vector `a`
     * @returns vector `a`
     */
    static subtract(a, b) {
        if (typeof b == "number") {
            for (let i = 0, len = a.length; i < len; i++)
                a[i] -= b;
        }
        else {
            for (let i = 0, len = a.length; i < len; i++)
                a[i] -= b[i] || 0;
        }
        return a;
    }
    /**
     * Multiply `b` with vector `a`
     * @returns vector `a`
     */
    static multiply(a, b) {
        if (typeof b == "number") {
            for (let i = 0, len = a.length; i < len; i++)
                a[i] *= b;
        }
        else {
            if (a.length != b.length) {
                throw new Error(`Cannot do element-wise multiply since the array lengths don't match: ${a.toString()} multiply-with ${b.toString()}`);
            }
            for (let i = 0, len = a.length; i < len; i++)
                a[i] *= b[i];
        }
        return a;
    }
    /**
     * Divide `a` over `b`
     * @returns vector `a`
     */
    static divide(a, b) {
        if (typeof b == "number") {
            if (b === 0)
                throw new Error("Cannot divide by zero");
            for (let i = 0, len = a.length; i < len; i++)
                a[i] /= b;
        }
        else {
            if (a.length != b.length) {
                throw new Error(`Cannot do element-wise divide since the array lengths don't match. ${a.toString()} divide-by ${b.toString()}`);
            }
            for (let i = 0, len = a.length; i < len; i++)
                a[i] /= b[i];
        }
        return a;
    }
    /**
     * Dot product of `a` and `b`
     */
    static dot(a, b) {
        if (a.length != b.length)
            throw new Error("Array lengths don't match");
        let d = 0;
        for (let i = 0, len = a.length; i < len; i++) {
            d += a[i] * b[i];
        }
        return d;
    }
    /**
     * 2D cross product of `a` and `b`
     */
    static cross2D(a, b) {
        return a[0] * b[1] - a[1] * b[0];
    }
    /**
     * 3D Cross product of `a` and `b`
     */
    static cross(a, b) {
        return new Pt_1.Pt((a[1] * b[2] - a[2] * b[1]), (a[2] * b[0] - a[0] * b[2]), (a[0] * b[1] - a[1] * b[0]));
    }
    /**
     * Magnitude of `a`
     */
    static magnitude(a) {
        return Math.sqrt(Vec.dot(a, a));
    }
    /**
     * Unit vector of `a`. If magnitude of `a` is already known, pass it in the second paramter to optimize calculation.
     */
    static unit(a, magnitude = undefined) {
        let m = (magnitude === undefined) ? Vec.magnitude(a) : magnitude;
        if (m === 0)
            throw new Error("Cannot calculate unit vector because magnitude is 0");
        return Vec.divide(a, m);
    }
    /**
     * Set `a` to its absolute value in each dimension
     * @returns vector `a`
     */
    static abs(a) {
        return Vec.map(a, Math.abs);
    }
    /**
     * Set `a` to its floor value in each dimension
     * @returns vector `a`
     */
    static floor(a) {
        return Vec.map(a, Math.floor);
    }
    /**
     * Set `a` to its ceiling value in each dimension
     * @returns vector `a`
     */
    static ceil(a) {
        return Vec.map(a, Math.ceil);
    }
    /**
     * Set `a` to its rounded value in each dimension
     * @returns vector `a`
     */
    static round(a) {
        return Vec.map(a, Math.round);
    }
    /**
     * Find the max value within a vector's dimensions
     * @returns an object with `value` and `index` that specifies the max value and its corresponding dimension.
     */
    static max(a) {
        let m = Number.MIN_VALUE;
        let index = 0;
        for (let i = 0, len = a.length; i < len; i++) {
            m = Math.max(m, a[i]);
            if (m === a[i])
                index = i;
        }
        return { value: m, index: index };
    }
    /**
     * Find the min value within a vector's dimensions
     * @returns an object with `value` and `index` that specifies the min value and its corresponding dimension.
     */
    static min(a) {
        let m = Number.MAX_VALUE;
        let index = 0;
        for (let i = 0, len = a.length; i < len; i++) {
            m = Math.min(m, a[i]);
            if (m === a[i])
                index = i;
        }
        return { value: m, index: index };
    }
    /**
     * Sum all the dimensions' values
     */
    static sum(a) {
        let s = 0;
        for (let i = 0, len = a.length; i < len; i++)
            s += a[i];
        return s;
    }
    /**
     * Given a mapping function, update `a`'s value in each dimension
     * @returns vector `a`
     */
    static map(a, fn) {
        for (let i = 0, len = a.length; i < len; i++) {
            a[i] = fn(a[i], i, a);
        }
        return a;
    }
}
exports.Vec = Vec;
/**
 * Mat provides static function for matrix operations. It's not yet optimized but good enough to use.
 */
class Mat {
    /**
     * Matrix additions. Matrices should have the same rows and columns.
     * @param a a group of Pt
     * @param b a scalar number, an array of numeric arrays, or a group of Pt
     * @returns a group with the same rows and columns as a and b
     */
    static add(a, b) {
        if (typeof b != "number") {
            if (a[0].length != b[0].length)
                throw new Error("Cannot add matrix if rows' and columns' size don't match.");
            if (a.length != b.length)
                throw new Error("Cannot add matrix if rows' and columns' size don't match.");
        }
        let g = new Pt_1.Group();
        let isNum = typeof b == "number";
        for (let i = 0, len = a.length; i < len; i++) {
            g.push(a[i].$add((isNum) ? b : b[i]));
        }
        return g;
    }
    /**
     * Matrix multiplication
     * @param a a Group of M Pts, each with K dimensions (M-rows, K-columns)
     * @param b a scalar number, an array of numeric arrays, or a Group of K Pts, each with N dimensions (K-rows, N-columns) -- or if transposed is true, then N Pts with K dimensions
     * @param transposed (Only applicable if it's not elementwise multiplication) If true, then a and b's columns should match (ie, each Pt should have the same dimensions). Default is `false`.
     * @param elementwise if true, then the multiplication is done element-wise. Default is `false`.
     * @returns If not elementwise, this will return a group with M Pt, each with N dimensions (M-rows, N-columns).
     */
    static multiply(a, b, transposed = false, elementwise = false) {
        let g = new Pt_1.Group();
        if (typeof b != "number") {
            if (elementwise) {
                if (a.length != b.length)
                    throw new Error("Cannot multiply matrix element-wise because the matrices' sizes don't match.");
                for (let ai = 0, alen = a.length; ai < alen; ai++) {
                    g.push(a[ai].$multiply(b[ai]));
                }
            }
            else {
                if (!transposed && a[0].length != b.length)
                    throw new Error("Cannot multiply matrix if rows in matrix-a don't match columns in matrix-b.");
                if (transposed && a[0].length != b[0].length)
                    throw new Error("Cannot multiply matrix if transposed and the columns in both matrices don't match.");
                if (!transposed)
                    b = Mat.transpose(b);
                for (let ai = 0, alen = a.length; ai < alen; ai++) {
                    let p = Pt_1.Pt.make(b.length, 0);
                    for (let bi = 0, blen = b.length; bi < blen; bi++) {
                        p[bi] = Vec.dot(a[ai], b[bi]);
                    }
                    g.push(p);
                }
            }
        }
        else {
            for (let ai = 0, alen = a.length; ai < alen; ai++) {
                g.push(a[ai].$multiply(b));
            }
        }
        return g;
    }
    /**
     * Zip one slice of an array of Pt. Imagine the Pts are organized in rows, then this function will take the values in a specific column.
     * @param g a group of Pt
     * @param idx index to zip at
     * @param defaultValue a default value to fill if index out of bound. If not provided, it will throw an error instead.
     */
    static zipSlice(g, index, defaultValue = false) {
        let z = [];
        for (let i = 0, len = g.length; i < len; i++) {
            if (g[i].length - 1 < index && defaultValue === false)
                throw `Index ${index} is out of bounds`;
            z.push(g[i][index] || defaultValue);
        }
        return new Pt_1.Pt(z);
    }
    /**
     * Zip a group of Pt. eg, [[1,2],[3,4],[5,6]] => [[1,3,5],[2,4,6]]
     * @param g a group of Pt
     * @param defaultValue a default value to fill if index out of bound. If not provided, it will throw an error instead.
     * @param useLongest If true, find the longest list of values in a Pt and use its length for zipping. Default is false, which uses the first item's length for zipping.
     */
    static zip(g, defaultValue = false, useLongest = false) {
        let ps = new Pt_1.Group();
        let len = (useLongest) ? g.reduce((a, b) => Math.max(a, b.length), 0) : g[0].length;
        for (let i = 0; i < len; i++) {
            ps.push(Mat.zipSlice(g, i, defaultValue));
        }
        return ps;
    }
    /**
     * Same as `zip` function
     */
    static transpose(g, defaultValue = false, useLongest = false) {
        return Mat.zip(g, defaultValue, useLongest);
    }
    /**
     * Transform a 2D point given a 2x3 or 3x3 matrix
     * @param pt a Pt to be transformed
     * @param m 2x3 or 3x3 matrix
     * @returns a new transformed Pt
     */
    static transform2D(pt, m) {
        let x = pt[0] * m[0][0] + pt[1] * m[1][0] + m[2][0];
        let y = pt[0] * m[0][1] + pt[1] * m[1][1] + m[2][1];
        return new Pt_1.Pt(x, y);
    }
    /**
     * Get a scale matrix for use in `transform2D`
     */
    static scale2DMatrix(x, y) {
        return new Pt_1.Group(new Pt_1.Pt(x, 0, 0), new Pt_1.Pt(0, y, 0), new Pt_1.Pt(0, 0, 1));
    }
    /**
     * Get a rotate matrix for use in `transform2D`
     */
    static rotate2DMatrix(cosA, sinA) {
        return new Pt_1.Group(new Pt_1.Pt(cosA, sinA, 0), new Pt_1.Pt(-sinA, cosA, 0), new Pt_1.Pt(0, 0, 1));
    }
    /**
     * Get a shear matrix for use in `transform2D`
     */
    static shear2DMatrix(tanX, tanY) {
        return new Pt_1.Group(new Pt_1.Pt(1, tanX, 0), new Pt_1.Pt(tanY, 1, 0), new Pt_1.Pt(0, 0, 1));
    }
    /**
     * Get a translate matrix for use in `transform2D`
     */
    static translate2DMatrix(x, y) {
        return new Pt_1.Group(new Pt_1.Pt(1, 0, 0), new Pt_1.Pt(0, 1, 0), new Pt_1.Pt(x, y, 1));
    }
    /**
     * Get a matrix to scale a point from an origin point. For use in `transform2D`
     */
    static scaleAt2DMatrix(sx, sy, at) {
        let m = Mat.scale2DMatrix(sx, sy);
        m[2][0] = -at[0] * sx + at[0];
        m[2][1] = -at[1] * sy + at[1];
        return m;
    }
    /**
     * Get a matrix to rotate a point from an origin point. For use in `transform2D`
     */
    static rotateAt2DMatrix(cosA, sinA, at) {
        let m = Mat.rotate2DMatrix(cosA, sinA);
        m[2][0] = at[0] * (1 - cosA) + at[1] * sinA;
        m[2][1] = at[1] * (1 - cosA) - at[0] * sinA;
        return m;
    }
    /**
     * Get a matrix to shear a point from an origin point. For use in `transform2D`
     */
    static shearAt2DMatrix(tanX, tanY, at) {
        let m = Mat.shear2DMatrix(tanX, tanY);
        m[2][0] = -at[1] * tanY;
        m[2][1] = -at[0] * tanX;
        return m;
    }
    /**
     * Get a matrix to reflect a point along a line. For use in `transform2D`
     * @param p1 first end point to define the reflection line
     * @param p1 second end point to define the reflection line
     */
    static reflectAt2DMatrix(p1, p2) {
        let intercept = Op_1.Line.intercept(p1, p2);
        if (intercept == undefined) {
            return [
                new Pt_1.Pt([-1, 0, 0]),
                new Pt_1.Pt([0, 1, 0]),
                new Pt_1.Pt([p1[0] + p2[0], 0, 1])
            ];
        }
        else {
            let yi = intercept.yi;
            let ang2 = Math.atan(intercept.slope) * 2;
            let cosA = Math.cos(ang2);
            let sinA = Math.sin(ang2);
            return [
                new Pt_1.Pt([cosA, sinA, 0]),
                new Pt_1.Pt([sinA, -cosA, 0]),
                new Pt_1.Pt([-yi * sinA, yi + yi * cosA, 1])
            ];
        }
    }
}
exports.Mat = Mat;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Source code licensed under Apache License 2.0. 
// Copyright © 2017 William Ngan. (https://github.com/williamngan/pts)
Object.defineProperty(exports, "__esModule", { value: true });
const Pt_1 = __webpack_require__(0);
/**
 * Bound is a subclass of Group that represents a rectangular boundary.
 * It includes some convenient properties such as `x`, `y`, bottomRight`, `center`, and `size`.
 */
class Bound extends Pt_1.Group {
    /**
     * Create a Bound. This is similar to the Group constructor.
     * @param args a list of Pt as parameters
     */
    constructor(...args) {
        super(...args);
        this._center = new Pt_1.Pt();
        this._size = new Pt_1.Pt();
        this._topLeft = new Pt_1.Pt();
        this._bottomRight = new Pt_1.Pt();
        this._inited = false;
        this.init();
    }
    /**
     * Create a Bound from a [ClientRect](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect) object.
     * @param rect an object has top/left/bottom/right/width/height properties
     * @returns a Bound object
     */
    static fromBoundingRect(rect) {
        let b = new Bound(new Pt_1.Pt(rect.left || 0, rect.top || 0), new Pt_1.Pt(rect.right || 0, rect.bottom || 0));
        if (rect.width && rect.height)
            b.size = new Pt_1.Pt(rect.width, rect.height);
        return b;
    }
    static fromGroup(g) {
        if (g.length < 2)
            throw new Error("Cannot create a Bound from a group that has less than 2 Pt");
        return new Bound(g[0], g[g.length - 1]);
    }
    /**
     * Initiate the bound's properties.
     */
    init() {
        if (this.p1) {
            this._size = this.p1.clone();
            this._inited = true;
        }
        if (this.p1 && this.p2) {
            let a = this.p1;
            let b = this.p2;
            this.topLeft = a.$min(b);
            this._bottomRight = a.$max(b);
            this._updateSize();
            this._inited = true;
        }
    }
    /**
     * Clone this bound and return a new one
     */
    clone() {
        return new Bound(this._topLeft.clone(), this._bottomRight.clone());
    }
    /**
     * Recalculte size and center
     */
    _updateSize() {
        this._size = this._bottomRight.$subtract(this._topLeft).abs();
        this._updateCenter();
    }
    /**
     * Recalculate center
     */
    _updateCenter() {
        this._center = this._size.$multiply(0.5).add(this._topLeft);
    }
    /**
     * Recalculate based on top-left position and size
     */
    _updatePosFromTop() {
        this._bottomRight = this._topLeft.$add(this._size);
        this._updateCenter();
    }
    /**
     * Recalculate based on bottom-right position and size
     */
    _updatePosFromBottom() {
        this._topLeft = this._bottomRight.$subtract(this._size);
        this._updateCenter();
    }
    /**
     * Recalculate based on center position and size
     */
    _updatePosFromCenter() {
        let half = this._size.$multiply(0.5);
        this._topLeft = this._center.$subtract(half);
        this._bottomRight = this._center.$add(half);
    }
    get size() { return new Pt_1.Pt(this._size); }
    set size(p) {
        this._size = new Pt_1.Pt(p);
        this._updatePosFromTop();
    }
    get center() { return new Pt_1.Pt(this._center); }
    set center(p) {
        this._center = new Pt_1.Pt(p);
        this._updatePosFromCenter();
    }
    get topLeft() { return new Pt_1.Pt(this._topLeft); }
    set topLeft(p) {
        this._topLeft = new Pt_1.Pt(p);
        this[0] = this._topLeft;
        this._updateSize();
    }
    get bottomRight() { return new Pt_1.Pt(this._bottomRight); }
    set bottomRight(p) {
        this._bottomRight = new Pt_1.Pt(p);
        this[1] = this._bottomRight;
        this._updateSize();
    }
    get width() { return (this._size.length > 0) ? this._size.x : 0; }
    set width(w) {
        this._size.x = w;
        this._updatePosFromTop();
    }
    get height() { return (this._size.length > 1) ? this._size.y : 0; }
    set height(h) {
        this._size.y = h;
        this._updatePosFromTop();
    }
    get depth() { return (this._size.length > 2) ? this._size.z : 0; }
    set depth(d) {
        this._size.z = d;
        this._updatePosFromTop();
    }
    get x() { return this.topLeft.x; }
    get y() { return this.topLeft.y; }
    get z() { return this.topLeft.z; }
    get inited() { return this._inited; }
    /**
     * If the Group elements are changed, call this function to update the Bound's properties.
     * It's preferable to change the topLeft/bottomRight etc properties instead of changing the Group array directly.
     */
    update() {
        this._topLeft = this[0];
        this._bottomRight = this[1];
        this._updateSize();
        return this;
    }
}
exports.Bound = Bound;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Source code licensed under Apache License 2.0. 
// Copyright © 2017 William Ngan. (https://github.com/williamngan/pts)
Object.defineProperty(exports, "__esModule", { value: true });
const Util_1 = __webpack_require__(1);
/**
* Form is an abstract class that represents a form that's used in a Space for expressions.
*/
class Form {
    constructor() {
        this._ready = false;
    }
    /**
    * get whether the Form has received the Space's rendering context
    */
    get ready() { return this._ready; }
    /**
     * Check number of items in a Group against a required number
     * @param pts
     */
    static _checkSize(pts, required = 2) {
        if (pts.length < required) {
            Util_1.Util.warn("Requires 2 or more Pts in this Group.");
            return false;
        }
        return true;
    }
}
exports.Form = Form;
/**
* VisualForm is an abstract class that represents a form that can be used to express Pts visually.
* For example, CanvasForm is an implementation of VisualForm that draws on CanvasSpace which represents a html canvas.
*/
class VisualForm extends Form {
    constructor() {
        super(...arguments);
        this._filled = true;
        this._stroked = true;
        this._font = new Font(14, "sans-serif");
    }
    get filled() { return this._filled; }
    set filled(b) { this._filled = b; }
    get stroked() { return this._stroked; }
    set stroked(b) { this._stroked = b; }
    get currentFont() { return this._font; }
    _multiple(groups, shape, ...rest) {
        if (!groups)
            return this;
        for (let i = 0, len = groups.length; i < len; i++) {
            this[shape](groups[i], ...rest);
        }
        return this;
    }
    /**
    * Set fill color (not implemented)
    */
    fill(c) {
        return this;
    }
    /**
    * Set current fill style and without stroke.
    * @example `form.fillOnly("#F90")`, `form.fillOnly("rgba(0,0,0,.5")`
    * @param c fill color which can be as color, gradient, or pattern. (See [canvas documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle))
    */
    fillOnly(c) {
        this.stroke(false);
        return this.fill(c);
    }
    /**
    * Set stroke style (not implemented)
    */
    stroke(c, width, linejoin, linecap) {
        return this;
    }
    /**
    * Set current stroke style and without fill.
    * @example `form.strokeOnly("#F90")`, `form.strokeOnly("#000", 0.5, 'round', 'square')`
    * @param c stroke color which can be as color, gradient, or pattern. (See [canvas documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeStyle)
    */
    strokeOnly(c, width, linejoin, linecap) {
        this.fill(false);
        return this.stroke(c, width, linejoin, linecap);
    }
    /**
    * Draw multiple points at once
    * @param pts an array of Pt or an array of number arrays
    * @param radius radius of the point. Default is 5.
    * @param shape The shape of the point. Defaults to "square", but it can be "circle" or a custom shape function in your own implementation.
    */
    points(pts, radius, shape) {
        if (!pts)
            return;
        for (let i = 0, len = pts.length; i < len; i++) {
            this.point(pts[i], radius, shape);
        }
        return this;
    }
    /**
    * Draw multiple circles at once
    * @param groups an array of Groups that defines multiple circles
    */
    circles(groups) {
        return this._multiple(groups, "circle");
    }
    /**
    * Draw multiple squares at once
    * @param groups an array of Groups that defines multiple circles
    */
    squares(groups) {
        return this._multiple(groups, "square");
    }
    /**
    * Draw multiple lines at once
    * @param groups An array of Groups of Pts
    */
    lines(groups) {
        return this._multiple(groups, "line");
    }
    /**
    * Draw multiple polygons at once
    * @param groups An array of Groups of Pts
    */
    polygons(groups) {
        return this._multiple(groups, "polygon");
    }
    /**
    * Draw multiple rectangles at once
    * @param groups An array of Groups of Pts
    */
    rects(groups) {
        return this._multiple(groups, "rect");
    }
}
exports.VisualForm = VisualForm;
/**
* Font class lets you create a specific font style with properties for its size and style
*/
class Font {
    /**
    * Create a font style
    * @param size font size. Defaults is 12px.
    * @param face Optional font-family, use css-like string such as "Helvetica" or "Helvetica, sans-serif". Default is "sans-serif".
    * @param weight Optional font weight such as "bold". Default is "" (none).
    * @param style Optional font style such as "italic". Default is "" (none).
    * @param lineHeight Optional line height. Default is 1.5.
    * @example `new Font(12, "Frutiger, sans-serif", "bold", "underline", 1.5)`
    */
    constructor(size = 12, face = "sans-serif", weight = "", style = "", lineHeight = 1.5) {
        this.size = size;
        this.face = face;
        this.style = style;
        this.weight = weight;
        this.lineHeight = lineHeight;
    }
    /**
    * Get a string representing the font style, in css-like string such as "italic bold 12px/1.5 sans-serif"
    */
    get value() { return `${this.style} ${this.weight} ${this.size}px/${this.lineHeight} ${this.face}`; }
    /**
    * Get a string representing the font style, in css-like string such as "italic bold 12px/1.5 sans-serif"
    */
    toString() { return this.value; }
}
exports.Font = Font;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Source code licensed under Apache License 2.0. 
// Copyright © 2017 William Ngan. (https://github.com/williamngan/pts)
Object.defineProperty(exports, "__esModule", { value: true });
const Bound_1 = __webpack_require__(5);
const Pt_1 = __webpack_require__(0);
const UI_1 = __webpack_require__(14);
/**
* Space is an abstract class that represents a general context for expressing Pts.
* See [Space guide](../../guide/Space-0500.html) for details.
*/
class Space {
    constructor() {
        this.id = "space";
        this.bound = new Bound_1.Bound();
        this._time = { prev: 0, diff: 0, end: -1 };
        this.players = {};
        this.playerCount = 0;
        this._animID = -1;
        this._pause = false;
        this._refresh = undefined;
        this._pointer = new Pt_1.Pt();
        this._isReady = false;
        this._playing = false;
    }
    /**
    * Set whether the rendering should be repainted on each frame
    * @param b a boolean value to set whether to repaint each frame
    */
    refresh(b) {
        this._refresh = b;
        return this;
    }
    /**
    * Add an IPlayer to this space. An IPlayer can define the following callback functions:
    * - `animate( time, ftime, space )`
    * - `start(bound, space)`
    * - `resize( size, event )`
    * - `action( type, x, y, event )`
    * Subclasses of Space may define other callback functions.
    * @param player an IPlayer object with animate function, or simply a function(time, ftime){}
    */
    add(p) {
        let player = (typeof p == "function") ? { animate: p } : p;
        let k = this.playerCount++;
        let pid = this.id + k;
        this.players[pid] = player;
        player.animateID = pid;
        if (player.resize && this.bound.inited)
            player.resize(this.bound);
        // if _refresh is not set, set it to true
        if (this._refresh === undefined)
            this._refresh = true;
        return this;
    }
    /**
    * Remove a player from this Space
    * @param player an IPlayer that has an `animateID` property
    */
    remove(player) {
        delete this.players[player.animateID];
        return this;
    }
    /**
    * Remove all players from this Space
    */
    removeAll() {
        this.players = {};
        return this;
    }
    /**
    * Main play loop. This implements window.requestAnimationFrame and calls it recursively.
    * Override this `play()` function to implemenet your own animation loop.
    * @param time current time
    */
    play(time = 0) {
        this._animID = requestAnimationFrame(this.play.bind(this));
        if (this._pause)
            return this;
        this._time.diff = time - this._time.prev;
        this._time.prev = time;
        try {
            this.playItems(time);
        }
        catch (err) {
            cancelAnimationFrame(this._animID);
            this._playing = false;
            throw err;
        }
        return this;
    }
    /**
    * Replay the animation after `stop()`. This resets the end-time counter.
    * You may also use `pause()` and `resume()` for temporary pause.
    */
    replay() {
        this._time.end = -1;
        this.play();
    }
    /**
    * Main animate function. This calls all the items to perform
    * @param time current time
    */
    playItems(time) {
        this._playing = true;
        // clear before draw if refresh is true
        if (this._refresh)
            this.clear();
        // animate all players
        if (this._isReady) {
            for (let k in this.players) {
                if (this.players[k].animate)
                    this.players[k].animate(time, this._time.diff, this);
            }
        }
        // stop if time ended
        if (this._time.end >= 0 && time > this._time.end) {
            cancelAnimationFrame(this._animID);
            this._playing = false;
        }
    }
    /**
    * Pause the animation
    * @param toggle a boolean value to set if this function call should be a toggle (between pause and resume)
    */
    pause(toggle = false) {
        this._pause = (toggle) ? !this._pause : true;
        return this;
    }
    /**
    * Resume the pause animation
    */
    resume() {
        this._pause = false;
        return this;
    }
    /**
    * Specify when the animation should stop: immediately, after a time period, or never stops.
    * @param t a value in millisecond to specify a time period to play before stopping, or `-1` to play forever, or `0` to end immediately. Default is 0 which will stop the animation immediately.
    */
    stop(t = 0) {
        this._time.end = t;
        return this;
    }
    /**
    * Play animation loop, and then stop after `duration` time has passed.
    * @param duration a value in millisecond to specify a time period to play before stopping, or `-1` to play forever
    */
    playOnce(duration = 5000) {
        this.play();
        this.stop(duration);
        return this;
    }
    /**
    * Custom rendering
    * @param context rendering context
    */
    render(context) {
        if (this._renderFunc)
            this._renderFunc(context, this);
        return this;
    }
    /**
    * Set a custom rendering `function(graphics_context, canvas_space)` if needed
    */
    set customRendering(f) { this._renderFunc = f; }
    get customRendering() { return this._renderFunc; }
    /**
     * Get a boolean to indicate whether the animation is playing
     */
    get isPlaying() { return this._playing; }
    /**
    * Get this space's bounding box
    */
    get outerBound() { return this.bound.clone(); }
    /**
    * The bounding box of the canvas
    */
    get innerBound() { return new Bound_1.Bound(Pt_1.Pt.make(this.size.length, 0), this.size.clone()); }
    /**
    * Get the size of this bounding box as a Pt
    */
    get size() { return this.bound.size.clone(); }
    /**
    * Get the size of this bounding box as a Pt
    */
    get center() { return this.size.divide(2); }
    /**
    * Get width of canvas
    */
    get width() { return this.bound.width; }
    /**
    * Get height of canvas
    */
    get height() { return this.bound.height; }
}
exports.Space = Space;
class MultiTouchSpace extends Space {
    constructor() {
        super(...arguments);
        // track mouse dragging
        this._pressed = false;
        this._dragged = false;
        this._hasMouse = false;
        this._hasTouch = false;
    }
    /**
    * Get the mouse or touch pointer that stores the last action
    */
    get pointer() {
        let p = this._pointer.clone();
        p.id = this._pointer.id;
        return p;
    }
    /**
    * Bind event listener in canvas element. You can also use `bindMouse` or `bindTouch` to bind mouse or touch events conveniently.
    * @param evt an event string such as "mousedown"
    * @param callback callback function for this event
    */
    bindCanvas(evt, callback) {
        this._canvas.addEventListener(evt, callback);
    }
    /**
    * Unbind a callback from the event listener
    * @param evt an event string such as "mousedown"
    * @param callback callback function to unbind
    */
    unbindCanvas(evt, callback) {
        this._canvas.removeEventListener(evt, callback);
    }
    /**
    * A convenient method to bind (or unbind) all mouse events in canvas element. All "players" added to this space that implements an `action` callback property will receive mouse event callbacks. The types of mouse actions are defined by UIPointerActions constants: "up", "down", "move", "drag", "drop", "over", and "out". See `Space`'s `add()` function for more details.
    * @param _bind a boolean value to bind mouse events if set to `true`. If `false`, all mouse events will be unbound. Default is true.
    * @see Space`'s [`add`](./_space_.space.html#add) function
    */
    bindMouse(_bind = true) {
        if (_bind) {
            this.bindCanvas("mousedown", this._mouseDown.bind(this));
            this.bindCanvas("mouseup", this._mouseUp.bind(this));
            this.bindCanvas("mouseover", this._mouseOver.bind(this));
            this.bindCanvas("mouseout", this._mouseOut.bind(this));
            this.bindCanvas("mousemove", this._mouseMove.bind(this));
            this._hasMouse = true;
        }
        else {
            this.unbindCanvas("mousedown", this._mouseDown.bind(this));
            this.unbindCanvas("mouseup", this._mouseUp.bind(this));
            this.unbindCanvas("mouseover", this._mouseOver.bind(this));
            this.unbindCanvas("mouseout", this._mouseOut.bind(this));
            this.unbindCanvas("mousemove", this._mouseMove.bind(this));
            this._hasMouse = false;
        }
        return this;
    }
    /**
    * A convenient method to bind (or unbind) all touch events in canvas element. All "players" added to this space that implements an `action` callback property will receive mouse event callbacks. The types of mouse actions are: "up", "down", "move", "drag", "drop", "over", and "out".
    * @param _bind a boolean value to bind touch events if set to `true`. If `false`, all mouse events will be unbound. Default is true.
    * @see Space`'s [`add`](./_space_.space.html#add) function
    */
    bindTouch(_bind = true) {
        if (_bind) {
            this.bindCanvas("touchstart", this._mouseDown.bind(this));
            this.bindCanvas("touchend", this._mouseUp.bind(this));
            this.bindCanvas("touchmove", this._touchMove.bind(this));
            this.bindCanvas("touchcancel", this._mouseOut.bind(this));
            this._hasTouch = true;
        }
        else {
            this.unbindCanvas("touchstart", this._mouseDown.bind(this));
            this.unbindCanvas("touchend", this._mouseUp.bind(this));
            this.unbindCanvas("touchmove", this._touchMove.bind(this));
            this.unbindCanvas("touchcancel", this._mouseOut.bind(this));
            this._hasTouch = false;
        }
        return this;
    }
    /**
    * A convenient method to convert the touch points in a touch event to an array of `Pt`.
    * @param evt a touch event which contains touches, changedTouches, and targetTouches list
    * @param which a string to select a touches list: "touches", "changedTouches", or "targetTouches". Default is "touches"
    * @return an array of Pt, whose origin position (0,0) is offset to the top-left of this space
    */
    touchesToPoints(evt, which = "touches") {
        if (!evt || !evt[which])
            return [];
        let ts = [];
        for (var i = 0; i < evt[which].length; i++) {
            let t = evt[which].item(i);
            ts.push(new Pt_1.Pt(t.pageX - this.bound.topLeft.x, t.pageY - this.bound.topLeft.y));
        }
        return ts;
    }
    /**
    * Go through all the `players` and call its `action` callback function
    * @param type an UIPointerActions constant or string: "up", "down", "move", "drag", "drop", "over", and "out"
    * @param evt mouse or touch event
    */
    _mouseAction(type, evt) {
        let px = 0, py = 0;
        if (evt instanceof MouseEvent) {
            for (let k in this.players) {
                if (this.players.hasOwnProperty(k)) {
                    let v = this.players[k];
                    px = evt.pageX - this.outerBound.x;
                    py = evt.pageY - this.outerBound.y;
                    if (v.action)
                        v.action(type, px, py, evt);
                }
            }
        }
        else {
            for (let k in this.players) {
                if (this.players.hasOwnProperty(k)) {
                    let v = this.players[k];
                    let c = evt.changedTouches && evt.changedTouches.length > 0;
                    let touch = evt.changedTouches.item(0);
                    px = (c) ? touch.pageX - this.outerBound.x : 0;
                    py = (c) ? touch.pageY - this.outerBound.y : 0;
                    if (v.action)
                        v.action(type, px, py, evt);
                }
            }
        }
        if (type) {
            this._pointer.to(px, py);
            this._pointer.id = type;
        }
    }
    /**
    * MouseDown handler
    * @param evt
    */
    _mouseDown(evt) {
        this._mouseAction(UI_1.UIPointerActions.down, evt);
        this._pressed = true;
        return false;
    }
    /**
    * MouseUp handler
    * @param evt
    */
    _mouseUp(evt) {
        this._mouseAction(UI_1.UIPointerActions.up, evt);
        if (this._dragged)
            this._mouseAction(UI_1.UIPointerActions.down, evt);
        this._pressed = false;
        this._dragged = false;
        return false;
    }
    /**
    * MouseMove handler
    * @param evt
    */
    _mouseMove(evt) {
        this._mouseAction(UI_1.UIPointerActions.move, evt);
        if (this._pressed) {
            this._dragged = true;
            this._mouseAction(UI_1.UIPointerActions.drag, evt);
        }
        return false;
    }
    /**
    * MouseOver handler
    * @param evt
    */
    _mouseOver(evt) {
        this._mouseAction(UI_1.UIPointerActions.over, evt);
        return false;
    }
    /**
    * MouseOut handler
    * @param evt
    */
    _mouseOut(evt) {
        this._mouseAction(UI_1.UIPointerActions.out, evt);
        if (this._dragged)
            this._mouseAction(UI_1.UIPointerActions.drop, evt);
        this._dragged = false;
        return false;
    }
    /**
    * TouchMove handler
    * @param evt
    */
    _touchMove(evt) {
        this._mouseMove(evt);
        evt.preventDefault();
        return false;
    }
}
exports.MultiTouchSpace = MultiTouchSpace;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Source code licensed under Apache License 2.0. 
// Copyright © 2017 William Ngan. (https://github.com/williamngan/pts)
Object.defineProperty(exports, "__esModule", { value: true });
const Space_1 = __webpack_require__(7);
const Form_1 = __webpack_require__(6);
const Bound_1 = __webpack_require__(5);
const Util_1 = __webpack_require__(1);
const Pt_1 = __webpack_require__(0);
/**
 * A Space for DOM elements
 */
class DOMSpace extends Space_1.MultiTouchSpace {
    /**
    * Create a DOMSpace which represents a Space for DOM elements
    * @param elem Specify an element by its "id" attribute as string, or by the element object itself. Use css to customize its appearance if needed.
    * @param callback an optional callback `function(boundingBox, spaceElement)` to be called when canvas is appended and ready. Alternatively, a "ready" event will also be fired from the element when it's appended, which can be traced with `spaceInstance.canvas.addEventListener("ready")`
    * @example `new DOMSpace( "#myElementID" )`
    */
    constructor(elem, callback) {
        super();
        this.id = "domspace";
        this._autoResize = true;
        this._bgcolor = "#e1e9f0";
        this._css = {};
        var _selector = null;
        var _existed = false;
        this.id = "pts";
        // check element or element id string
        if (elem instanceof Element) {
            _selector = elem;
            this.id = "pts_existing_space";
        }
        else {
            _selector = document.querySelector(elem);
            _existed = true;
            this.id = elem.substr(1);
        }
        // if selector is not defined, create a canvas
        if (!_selector) {
            this._container = DOMSpace.createElement("div", "pts_container");
            this._canvas = DOMSpace.createElement("div", "pts_element");
            this._container.appendChild(this._canvas);
            document.body.appendChild(this._container);
            _existed = false;
        }
        else {
            this._canvas = _selector;
            this._container = _selector.parentElement;
        }
        // no mutation observer, so we set a timeout for ready event
        setTimeout(this._ready.bind(this, callback), 50);
    }
    /**
    * Helper function to create a DOM element
    * @param elem element tag name
    * @param id element id attribute
    * @param appendTo Optional, if specified, the created element will be appended to this element
    */
    static createElement(elem = "div", id, appendTo) {
        let d = document.createElement(elem);
        if (id)
            d.setAttribute("id", id);
        if (appendTo && appendTo.appendChild)
            appendTo.appendChild(d);
        return d;
    }
    /**
    * Handle callbacks after element is mounted in DOM
    * @param callback
    */
    _ready(callback) {
        if (!this._container)
            throw new Error(`Cannot initiate #${this.id} element`);
        this._isReady = true;
        this._resizeHandler(null);
        this.clear(this._bgcolor);
        this._canvas.dispatchEvent(new Event("ready"));
        for (let k in this.players) {
            if (this.players.hasOwnProperty(k)) {
                if (this.players[k].start)
                    this.players[k].start(this.bound.clone(), this);
            }
        }
        this._pointer = this.center;
        this.refresh(false); // No need to clear and redraw for every frame in DOM
        if (callback)
            callback(this.bound, this._canvas);
    }
    /**
    * Set up various options for DOMSpace. The `opt` parameter is an object with the following fields. This is usually set during instantiation, eg `new DOMSpace(...).setup( { opt } )`
    * @param opt an object with optional settings, as follows.
    * @param opt.bgcolor a hex or rgba string to set initial background color of the canvas, or use `false` or "transparent" to set a transparent background. You may also change it later with `clear()`
    * @param opt.resize a boolean to set whether `<canvas>` size should auto resize to match its container's size. You can also set it manually with `autoSize()`
    * @example `space.setup({ bgcolor: "#f00", resize: true })`
    */
    setup(opt) {
        if (opt.bgcolor) {
            this._bgcolor = opt.bgcolor;
        }
        this.autoResize = (opt.resize != undefined) ? opt.resize : false;
        return this;
    }
    /**
     * Not implemented. See SVGSpace and HTMLSpace for implementation
     */
    getForm() {
        return null;
    }
    /**
    * Set whether the canvas element should resize when its container is resized.
    * @param auto a boolean value indicating if auto size is set
    */
    set autoResize(auto) {
        this._autoResize = auto;
        if (auto) {
            window.addEventListener('resize', this._resizeHandler.bind(this));
        }
        else {
            delete this._css['width'];
            delete this._css['height'];
            window.removeEventListener('resize', this._resizeHandler.bind(this));
        }
    }
    get autoResize() { return this._autoResize; }
    /**
    * This overrides Space's `resize` function. It's used as a callback function for window's resize event and not usually called directly. You can keep track of resize events with `resize: (bound ,evt)` callback in your player objects (See `Space`'s `add()` function).
    * @param b a Bound object to resize to
    * @param evt Optionally pass a resize event
    */
    resize(b, evt) {
        this.bound = b;
        this.styles({ width: `${b.width}px`, height: `${b.height}px` }, true);
        for (let k in this.players) {
            if (this.players.hasOwnProperty(k)) {
                let p = this.players[k];
                if (p.resize)
                    p.resize(this.bound, evt);
            }
        }
        ;
        return this;
    }
    /**
    * Window resize handling
    * @param evt
    */
    _resizeHandler(evt) {
        let b = Bound_1.Bound.fromBoundingRect(this._container.getBoundingClientRect());
        if (this._autoResize) {
            this.styles({ width: "100%", height: "100%" }, true);
        }
        else {
            this.styles({ width: `${b.width}px`, height: `${b.height}px` }, true);
        }
        this.resize(b, evt);
    }
    /**
    * Get this DOM element
    */
    get element() {
        return this._canvas;
    }
    /**
    * Get the parent DOM element that contains this DOM element
    */
    get parent() {
        return this._container;
    }
    /**
    * A property to indicate if the Space is ready
    */
    get ready() { return this._isReady; }
    /**
    * Clear the element's contents, and ptionally set a new backgrounc color. Overrides Space's `clear` function.
    * @param bg Optionally specify a custom background color in hex or rgba string, or "transparent". If not defined, it will use its `bgcolor` property as background color to clear the canvas.
    */
    clear(bg) {
        if (bg)
            this.background = bg;
        this._canvas.innerHTML = "";
        return this;
    }
    /**
    * Set a background color on the container element
    @param bg background color as hex or rgba string
    */
    set background(bg) {
        this._bgcolor = bg;
        this._container.style.backgroundColor = this._bgcolor;
    }
    get background() { return this._bgcolor; }
    /**
    * Add or update a style definition, and optionally update that style in the Element
    * @param key style name
    * @param val style value
    * @param update a boolean to update the element's style immediately if set to `true`. Default is `false`.
    */
    style(key, val, update = false) {
        this._css[key] = val;
        if (update)
            this._canvas.style[key] = val;
        return this;
    }
    /**
    * Add of update a list of style definitions, and optionally update those styles in the Element
    * @param styles a key-value objects of style definitions
    * @param update a boolean to update the element's style immediately if set to `true`. Default is `false`.
    * @return this
    */
    styles(styles, update = false) {
        for (let k in styles) {
            if (styles.hasOwnProperty(k))
                this.style(k, styles[k], update);
        }
        return this;
    }
    /**
    * A static helper function to add or update Element attributes
    * @param elem Element to update
    * @param data an object with key-value pairs
    * @returns this DOM element
    */
    static setAttr(elem, data) {
        for (let k in data) {
            if (data.hasOwnProperty(k)) {
                elem.setAttribute(k, data[k]);
            }
        }
        return elem;
    }
    /**
    * A static helper function to compose an inline style string from a object of styles
    * @param elem Element to update
    * @param data an object with key-value pairs
    * @exmaple DOMSpace.getInlineStyles( {width: "100px", "font-size": "10px"} ); // returns "width: 100px; font-size: 10px"
    */
    static getInlineStyles(data) {
        let str = "";
        for (let k in data) {
            if (data.hasOwnProperty(k)) {
                if (data[k])
                    str += `${k}: ${data[k]}; `;
            }
        }
        return str;
    }
}
exports.DOMSpace = DOMSpace;
/**
 * HTMLSpace. Note that this is currently experimental and may change in future.
 */
class HTMLSpace extends DOMSpace {
    /**
    * Get a new `HTMLForm` for drawing
    * @see `HTMLForm`
    */
    getForm() {
        return new HTMLForm(this);
    }
    /**
     * A static function to add a DOM element inside a node. Usually you don't need to use this directly. See methods in `DOMForm` instead.
     * @param parent the parent element, or `null` to use current `<svg>` as parent.
     * @param name a string of element name,  such as `rect` or `circle`
     * @param id id attribute of the new element
     * @param autoClass add a class based on the id (from char 0 to index of "-"). Default is true.
     */
    static htmlElement(parent, name, id, autoClass = true) {
        if (!parent || !parent.appendChild)
            throw new Error("parent is not a valid DOM element");
        let elem = document.querySelector(`#${id}`);
        if (!elem) {
            elem = document.createElement(name);
            elem.setAttribute("id", id);
            if (autoClass)
                elem.setAttribute("class", id.substring(0, id.indexOf("-")));
            parent.appendChild(elem);
        }
        return elem;
    }
    /**
    * Remove an item from this Space
    * @param item a player item with an auto-assigned `animateID` property
    */
    remove(player) {
        let temp = this._container.querySelectorAll("." + HTMLForm.scopeID(player));
        temp.forEach((el) => {
            el.parentNode.removeChild(el);
        });
        return super.remove(player);
    }
    /**
     * Remove all items from this Space
     */
    removeAll() {
        this._container.innerHTML = "";
        return super.removeAll();
    }
}
exports.HTMLSpace = HTMLSpace;
/**
 * Form for HTMLSpace. Note that this is currently experimental and may change in future.
 */
class HTMLForm extends Form_1.VisualForm {
    constructor(space) {
        super();
        this._ctx = {
            group: null,
            groupID: "pts",
            groupCount: 0,
            currentID: "pts0",
            currentClass: "",
            style: {
                "filled": true,
                "stroked": true,
                "background": "#f03",
                "border-color": "#fff",
                "color": "#000",
                "border-width": "1px",
                "border-radius": "0",
                "border-style": "solid",
                "position": "absolute",
                "top": 0,
                "left": 0,
                "width": 0,
                "height": 0
            },
            font: "11px sans-serif",
            fontSize: 11,
            fontFamily: "sans-serif"
        };
        this._ready = false;
        this._space = space;
        this._space.add({ start: () => {
                this._ctx.group = this._space.element;
                this._ctx.groupID = "pts_dom_" + (HTMLForm.groupID++);
                this._ready = true;
            } });
    }
    get space() { return this._space; }
    /**
     * Update a style in _ctx context or throw an Erorr if the style doesn't exist
     * @param k style key
     * @param v  style value
     * @param unit Optional unit like 'px' to append to value
     */
    styleTo(k, v, unit = '') {
        if (this._ctx.style[k] === undefined)
            throw new Error(`${k} style property doesn't exist`);
        this._ctx.style[k] = `${v}${unit}`;
    }
    /**
    * Set current fill style. Provide a valid color string or `false` to specify no fill color.
    * @example `form.fill("#F90")`, `form.fill("rgba(0,0,0,.5")`, `form.fill(false)`
    * @param c fill color
    */
    fill(c) {
        if (typeof c == "boolean") {
            this.styleTo("filled", c);
            if (!c)
                this.styleTo("background", "transparent");
        }
        else {
            this.styleTo("filled", true);
            this.styleTo("background", c);
        }
        return this;
    }
    /**
    * Set current stroke style. Provide a valid color string or `false` to specify no stroke color.
    * @example `form.stroke("#F90")`, `form.stroke("rgba(0,0,0,.5")`, `form.stroke(false)`, `form.stroke("#000", 0.5, 'round', 'square')`
    * @param c stroke color which can be as color, gradient, or pattern. (See [canvas documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeStyle))
    * @param width Optional value (can be floating point) to set line width
    * @param linejoin not implemented in HTMLForm
    * @param linecap not implemented in HTMLForm
    */
    stroke(c, width, linejoin, linecap) {
        if (typeof c == "boolean") {
            this.styleTo("stroked", c);
            if (!c)
                this.styleTo("border-width", 0);
        }
        else {
            this.styleTo("stroked", true);
            this.styleTo("border-color", c);
            this.styleTo("border-width", (width || 1) + "px");
        }
        return this;
    }
    /**
    * Set current text color style. Provide a valid color string.
    * @example `form.fill("#F90")`, `form.fill("rgba(0,0,0,.5")`, `form.fill(false)`
    * @param c fill color
    */
    fillText(c) {
        this.styleTo("color", c);
        return this;
    }
    /**
     * Add custom class to the created element
     * @param c custom class name or `false` to reset it
     * @example `form.fill("#f00").cls("myClass").rects(r)` `form.cls(false).circles(c)`
     */
    cls(c) {
        if (typeof c == "boolean") {
            this._ctx.currentClass = "";
        }
        else {
            this._ctx.currentClass = c;
        }
        return this;
    }
    /**
    * Set the current font
    * @param sizeOrFont either a number to specify font-size, or a `Font` object to specify all font properties
    * @param weight Optional font-weight string such as "bold"
    * @param style Optional font-style string such as "italic"
    * @param lineHeight Optional line-height number suchas 1.5
    * @param family Optional font-family such as "Helvetica, sans-serif"
    * @example `form.font( myFont )`, `form.font(14, "bold")`
    */
    font(sizeOrFont, weight, style, lineHeight, family) {
        if (typeof sizeOrFont == "number") {
            this._font.size = sizeOrFont;
            if (family)
                this._font.face = family;
            if (weight)
                this._font.weight = weight;
            if (style)
                this._font.style = style;
            if (lineHeight)
                this._font.lineHeight = lineHeight;
            this._ctx.font = this._font.value;
        }
        else {
            this._font = sizeOrFont;
        }
        return this;
    }
    /**
    * Reset the context's common styles to this form's styles. This supports using multiple forms on the same canvas context.
    */
    reset() {
        this._ctx.style = {
            "filled": true, "stroked": true,
            "background": "#f03", "border-color": "#fff",
            "border-width": "1px"
        };
        this._font = new Form_1.Font(14, "sans-serif");
        this._ctx.font = this._font.value;
        return this;
    }
    /**
     * Set this form's group scope by an ID, and optionally define the group's parent element. A group scope keeps track of elements by their generated IDs, and updates their properties as needed. See also `scope()`.
     * @param group_id a string to use as prefix for the group's id. For example, group_id "hello" will create elements with id like "hello-1", "hello-2", etc
     * @param group Optional DOM element to define this group's parent element
     * @returns this form's context
     */
    updateScope(group_id, group) {
        this._ctx.group = group;
        this._ctx.groupID = group_id;
        this._ctx.groupCount = 0;
        this.nextID();
        return this._ctx;
    }
    /**
     * Set the current group scope to an item added into space, in order to keep track of any point, circle, etc created within it. The item must have an `animateID` property, so that elements created within the item will have generated IDs like "item-{animateID}-{count}".
     * @param item a "player" item that's added to space (see `space.add(...)`) and has an `animateID` property
     * @returns this form's context
     */
    scope(item) {
        if (!item || item.animateID == null)
            throw new Error("item not defined or not yet added to Space");
        return this.updateScope(HTMLForm.scopeID(item), this.space.element);
    }
    /**
     * Get next available id in the current group
     * @returns an id string
     */
    nextID() {
        this._ctx.groupCount++;
        this._ctx.currentID = `${this._ctx.groupID}-${this._ctx.groupCount}`;
        return this._ctx.currentID;
    }
    /**
     * A static function to generate an ID string based on a context object
     * @param ctx a context object for an HTMLForm
     */
    static getID(ctx) {
        return ctx.currentID || `p-${HTMLForm.domID++}`;
    }
    /**
     * A static function to generate an ID string for a scope, based on a "player" item in the Space
     * @param item a "player" item that's added to space (see `space.add(...)`) and has an `animateID` property
     */
    static scopeID(item) {
        return `item-${item.animateID}`;
    }
    /**
     * A static function to help adding style object to an element. This put all styles into `style` attribute instead of individual attributes, so that the styles can be parsed by Adobe Illustrator.
     * @param elem A DOM element to add to
     * @param styles an object of style properties
     * @example `HTMLForm.style(elem, {fill: "#f90", stroke: false})`
     * @returns DOM element
     */
    static style(elem, styles) {
        let st = [];
        if (!styles["filled"])
            st.push("background: none");
        if (!styles["stroked"])
            st.push("border: none");
        for (let k in styles) {
            if (styles.hasOwnProperty(k) && k != "filled" && k != "stroked") {
                let v = styles[k];
                if (v) {
                    if (!styles["filled"] && k.indexOf('background') === 0) {
                        continue;
                    }
                    else if (!styles["stroked"] && k.indexOf('border-width') === 0) {
                        continue;
                    }
                    else {
                        st.push(`${k}: ${v}`);
                    }
                }
            }
        }
        return HTMLSpace.setAttr(elem, { style: st.join(";") });
    }
    /**
   * A helper function to set top, left, width, height of DOM element
   * @param x left position
   * @param y top position
   * @param w width
   * @param h height
   */
    static rectStyle(ctx, pt, size) {
        ctx.style["left"] = pt[0] + "px";
        ctx.style["top"] = pt[1] + "px";
        ctx.style["width"] = size[0] + "px";
        ctx.style["height"] = size[1] + "px";
        return ctx;
    }
    /**
    * Draws a point
    * @param ctx a context object of HTMLForm
    * @param pt a Pt object or numeric array
    * @param radius radius of the point. Default is 5.
    * @param shape The shape of the point. Defaults to "square", but it can be "circle" or a custom shape function in your own implementation.
    * @example `HTMLForm.point( p )`, `HTMLForm.point( p, 10, "circle" )`
    */
    static point(ctx, pt, radius = 5, shape = "square") {
        if (shape === "circle") {
            return HTMLForm.circle(ctx, pt, radius);
        }
        else {
            return HTMLForm.square(ctx, pt, radius);
        }
    }
    /**
    * Draws a point
    * @param p a Pt object
    * @param radius radius of the point. Default is 5.
    * @param shape The shape of the point. Defaults to "square", but it can be "circle" or a custom shape function in your own implementation.
    * @example `form.point( p )`, `form.point( p, 10, "circle" )`
    */
    point(pt, radius = 5, shape = "square") {
        this.nextID();
        if (shape == "circle")
            this.styleTo("border-radius", "100%");
        HTMLForm.point(this._ctx, pt, radius, shape);
        return this;
    }
    /**
    * A static function to draw a circle
    * @param ctx a context object of HTMLForm
    * @param pt center position of the circle
    * @param radius radius of the circle
    */
    static circle(ctx, pt, radius = 10) {
        let elem = HTMLSpace.htmlElement(ctx.group, "div", HTMLForm.getID(ctx));
        HTMLSpace.setAttr(elem, { class: `pts-form pts-circle ${ctx.currentClass}` });
        HTMLForm.rectStyle(ctx, new Pt_1.Pt(pt).$subtract(radius), new Pt_1.Pt(radius * 2, radius * 2));
        HTMLForm.style(elem, ctx.style);
        return elem;
    }
    /**
    * Draw a circle
    * @param pts usually a Group of 2 Pts, but it can also take an array of two numeric arrays [ [position], [size] ]
    * @see [`Circle.fromCenter`](./_op_.circle.html#frompt)
    */
    circle(pts) {
        this.nextID();
        this.styleTo("border-radius", "100%");
        HTMLForm.circle(this._ctx, pts[0], pts[1][0]);
        return this;
    }
    /**
    * A static function to draw a square
    * @param ctx a context object of HTMLForm
    * @param pt center position of the square
    * @param halfsize half size of the square
    */
    static square(ctx, pt, halfsize) {
        let elem = HTMLSpace.htmlElement(ctx.group, "div", HTMLForm.getID(ctx));
        HTMLSpace.setAttr(elem, { class: `pts-form pts-square ${ctx.currentClass}` });
        HTMLForm.rectStyle(ctx, new Pt_1.Pt(pt).$subtract(halfsize), new Pt_1.Pt(halfsize * 2, halfsize * 2));
        HTMLForm.style(elem, ctx.style);
        return elem;
    }
    /**
     * Draw a square, given a center and its half-size
     * @param pt center Pt
     * @param halfsize half-size
     */
    square(pt, halfsize) {
        this.nextID();
        HTMLForm.square(this._ctx, pt, halfsize);
        return this;
    }
    /**
    * A static function to draw a rectangle
    * @param ctx a context object of HTMLForm
    * @param pts usually a Group of 2 Pts specifying the top-left and bottom-right positions. Alternatively it can be an array of numeric arrays.
    */
    static rect(ctx, pts) {
        if (!this._checkSize(pts))
            return;
        let elem = HTMLSpace.htmlElement(ctx.group, "div", HTMLForm.getID(ctx));
        HTMLSpace.setAttr(elem, { class: `pts-form pts-rect ${ctx.currentClass}` });
        HTMLForm.rectStyle(ctx, pts[0], pts[1]);
        HTMLForm.style(elem, ctx.style);
        return elem;
    }
    /**
    * Draw a rectangle
    * @param pts usually a Group of 2 Pts specifying the top-left and bottom-right positions. Alternatively it can be an array of numeric arrays.
    */
    rect(pts) {
        this.nextID();
        this.styleTo("border-radius", "0");
        HTMLForm.rect(this._ctx, pts);
        return this;
    }
    /**
    * A static function to draw text
    * @param ctx a context object of HTMLForm
    * @param `pt` a Point object to specify the anchor point
    * @param `txt` a string of text to draw
    * @param `maxWidth` specify a maximum width per line
    */
    static text(ctx, pt, txt) {
        let elem = HTMLSpace.htmlElement(ctx.group, "div", HTMLForm.getID(ctx));
        HTMLSpace.setAttr(elem, {
            position: 'absolute',
            class: `pts-form pts-text ${ctx.currentClass}`,
            left: pt[0],
            top: pt[1],
        });
        elem.textContent = txt;
        HTMLForm.style(elem, ctx.style);
        return elem;
    }
    /**
    * Draw text on canvas
    * @param `pt` a Pt or numeric array to specify the anchor point
    * @param `txt` text
    * @param `maxWidth` specify a maximum width per line
    */
    text(pt, txt) {
        this.nextID();
        HTMLForm.text(this._ctx, pt, txt);
        return this;
    }
    /**
    * A convenient way to draw some text on canvas for logging or debugging. It'll be draw on the top-left of the canvas as an overlay.
    * @param txt text
    */
    log(txt) {
        this.fill("#000").stroke("#fff", 0.5).text([10, 14], txt);
        return this;
    }
    /**
     * Arc is not implemented in HTMLForm
     */
    arc(pt, radius, startAngle, endAngle, cc) {
        Util_1.Util.warn("arc is not implemented in HTMLForm");
        return this;
    }
    /**
     * Line is not implemented in HTMLForm
     */
    line(pts) {
        Util_1.Util.warn("line is not implemented in HTMLForm");
        return this;
    }
    /**
     * Polygon is not implemented in HTMLForm
     * @param pts
     */
    polygon(pts) {
        Util_1.Util.warn("polygon is not implemented in HTMLForm");
        return this;
    }
}
HTMLForm.groupID = 0;
HTMLForm.domID = 0;
exports.HTMLForm = HTMLForm;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Source code licensed under Apache License 2.0.
// Copyright © 2017 William Ngan. (https://github.com/williamngan/pts)
Object.defineProperty(exports, "__esModule", { value: true });
const Pt_1 = __webpack_require__(0);
/** Various functions to support typography */
class Typography {
    /**
     * Create a heuristic text width estimate function. It will be less accurate but faster.
     * @param fn a reference function that can measure text width accurately
     * @param samples a list of string samples. Default is ["M", "n", "."]
     * @param distribution a list of the samples' probability distribution. Default is [0.06, 0.8, 0.14].
     * @return a function that can estimate text width
     */
    static textWidthEstimator(fn, samples = ["M", "n", "."], distribution = [0.06, 0.8, 0.14]) {
        let m = samples.map(fn);
        let avg = new Pt_1.Pt(distribution).dot(m);
        return (str) => str.length * avg;
    }
    /**
     * Truncate text to fit width
     * @param fn a function that can measure text width
     * @param str text to truncate
     * @param width width to fit
     * @param tail text to indicate overflow such as "...". Default is empty "".
     */
    static truncate(fn, str, width, tail = "") {
        let trim = Math.floor(str.length * Math.min(1, width / (fn(str) * 1.1)));
        if (trim < str.length) {
            trim = Math.max(0, trim - tail.length);
            return [str.substr(0, trim) + tail, trim];
        }
        else {
            return [str, str.length];
        }
    }
    /**
     * Get a function to scale font size proportionally to text box size changes.
     * @param box Initial box as a Group
     * @param ratio font-size change ratio. Default is 1.
     * @returns a function where input parameter is a new box, and returns the new font size value
     */
    static fontSizeToBox(box, ratio = 1) {
        let h = (box[1][1] - box[0][1]);
        let f = ratio * h;
        return function (b) {
            let nh = (b[1][1] - b[0][1]) / h;
            return f * nh;
        };
    }
}
exports.Typography = Typography;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Source code licensed under Apache License 2.0. 
// Copyright © 2017 William Ngan. (https://github.com/williamngan/pts)
Object.defineProperty(exports, "__esModule", { value: true });
const Space_1 = __webpack_require__(7);
const Form_1 = __webpack_require__(6);
const Bound_1 = __webpack_require__(5);
const Pt_1 = __webpack_require__(0);
const Util_1 = __webpack_require__(1);
const Typography_1 = __webpack_require__(9);
const Op_1 = __webpack_require__(2);
/**
* CanvasSpace is an implementation of the abstract class Space. It represents a space for HTML Canvas.
* Learn more about the concept of Space in [this guide](..guide/Space-0500.html)
*/
class CanvasSpace extends Space_1.MultiTouchSpace {
    /**
    * Create a CanvasSpace which represents a HTML Canvas Space
    * @param elem Specify an element by its "id" attribute as string, or by the element object itself. An element can be an existing `<canvas>`, or a `<div>` container in which a new `<canvas>` will be created. If left empty, a `<div id="pt_container"><canvas id="pt" /></div>` will be added to DOM. Use css to customize its appearance if needed.
    * @param callback an optional callback `function(boundingBox, spaceElement)` to be called when canvas is appended and ready. Alternatively, a "ready" event will also be fired from the `<canvas>` element when it's appended, which can be traced with `spaceInstance.canvas.addEventListener("ready")`
    * @example `new CanvasSpace( "#myElementID" )`
    */
    constructor(elem, callback) {
        super();
        this._pixelScale = 1;
        this._autoResize = true;
        this._bgcolor = "#e1e9f0";
        this._offscreen = false;
        this._initialResize = false;
        var _selector = null;
        var _existed = false;
        this.id = "pt";
        // check element or element id string
        if (elem instanceof Element) {
            _selector = elem;
            this.id = "pts_existing_space";
        }
        else {
            ;
            _selector = document.querySelector(elem);
            _existed = true;
            this.id = elem;
        }
        // if selector is not defined, create a canvas
        if (!_selector) {
            this._container = this._createElement("div", this.id + "_container");
            this._canvas = this._createElement("canvas", this.id);
            this._container.appendChild(this._canvas);
            document.body.appendChild(this._container);
            _existed = false;
            // if selector is element but not canvas, create a canvas inside it
        }
        else if (_selector.nodeName.toLowerCase() != "canvas") {
            this._container = _selector;
            this._canvas = this._createElement("canvas", this.id + "_canvas");
            this._container.appendChild(this._canvas);
            this._initialResize = true;
            // if selector is an existing canvas
        }
        else {
            this._canvas = _selector;
            this._container = _selector.parentElement;
            this._autoResize = false;
        }
        // if size is known then set it immediately
        // if (_existed) {
        // let b = this._container.getBoundingClientRect();
        // this.resize( Bound.fromBoundingRect(b) );
        // }
        // no mutation observer, so we set a timeout for ready event
        setTimeout(this._ready.bind(this, callback), 100);
        // store canvas 2d rendering context
        this._ctx = this._canvas.getContext('2d');
    }
    /**
    * Helper function to create a DOM element
    * @param elem element tag name
    * @param id element id attribute
    */
    _createElement(elem = "div", id) {
        let d = document.createElement(elem);
        d.setAttribute("id", id);
        return d;
    }
    /**
    * Handle callbacks after element is mounted in DOM
    * @param callback
    */
    _ready(callback) {
        if (!this._container)
            throw new Error(`Cannot initiate #${this.id} element`);
        this._isReady = true;
        this._resizeHandler(null);
        this.clear(this._bgcolor);
        this._canvas.dispatchEvent(new Event("ready"));
        for (let k in this.players) {
            if (this.players.hasOwnProperty(k)) {
                if (this.players[k].start)
                    this.players[k].start(this.bound.clone(), this);
            }
        }
        this._pointer = this.center;
        this._initialResize = false; // unset
        if (callback)
            callback(this.bound, this._canvas);
    }
    /**
    * Set up various options for CanvasSpace. The `opt` parameter is an object with the following fields. This is usually set during instantiation, eg `new CanvasSpace(...).setup( { opt } )`
    * @param opt an object with optional settings, as follows.
    * @param opt.bgcolor a hex or rgba string to set initial background color of the canvas, or use `false` or "transparent" to set a transparent background. You may also change it later with `clear()`
    * @param opt.resize a boolean to set whether `<canvas>` size should auto resize to match its container's size. You can also set it manually with `autoSize()`
    * @param opt.retina a boolean to set if device pixel scaling should be used. This may make drawings on retina displays look sharper but may reduce performance slightly. Default is `true`.
    * @param opt.offscreen a boolean to set if a duplicate canvas should be created for offscreen rendering. Default is `false`.
    * @example `space.setup({ bgcolor: "#f00", retina: true, resize: true })`
    */
    setup(opt) {
        if (opt.bgcolor)
            this._bgcolor = opt.bgcolor;
        this.autoResize = (opt.resize != undefined) ? opt.resize : false;
        if (opt.retina !== false) {
            let r1 = window.devicePixelRatio || 1;
            let r2 = this._ctx.webkitBackingStorePixelRatio || this._ctx.mozBackingStorePixelRatio || this._ctx.msBackingStorePixelRatio || this._ctx.oBackingStorePixelRatio || this._ctx.backingStorePixelRatio || 1;
            this._pixelScale = r1 / r2;
        }
        if (opt.offscreen) {
            this._offscreen = true;
            this._offCanvas = this._createElement("canvas", this.id + "_offscreen");
            this._offCtx = this._offCanvas.getContext('2d');
        }
        else {
            this._offscreen = false;
        }
        return this;
    }
    /**
    * Set whether the canvas element should resize when its container is resized.
    * @param auto a boolean value indicating if auto size is set
    */
    set autoResize(auto) {
        this._autoResize = auto;
        if (auto) {
            window.addEventListener('resize', this._resizeHandler.bind(this));
        }
        else {
            window.removeEventListener('resize', this._resizeHandler.bind(this));
        }
    }
    get autoResize() { return this._autoResize; }
    /**
  * This overrides Space's `resize` function. It's used as a callback function for window's resize event and not usually called directly. You can keep track of resize events with `resize: (bound ,evt)` callback in your player objects (See `Space`'s `add()` function).
  * @param b a Bound object to resize to
  * @param evt Optionally pass a resize event
  */
    resize(b, evt) {
        this.bound = b;
        this._canvas.width = this.bound.size.x * this._pixelScale;
        this._canvas.height = this.bound.size.y * this._pixelScale;
        this._canvas.style.width = Math.floor(this.bound.size.x) + "px";
        this._canvas.style.height = Math.floor(this.bound.size.y) + "px";
        if (this._offscreen) {
            this._offCanvas.width = this.bound.size.x * this._pixelScale;
            this._offCanvas.height = this.bound.size.y * this._pixelScale;
            // this._offCanvas.style.width = Math.floor(this.bound.size.x) + "px";
            // this._offCanvas.style.height = Math.floor(this.bound.size.y) + "px";
        }
        if (this._pixelScale != 1) {
            this._ctx.scale(this._pixelScale, this._pixelScale);
            this._ctx.translate(0.5, 0.5);
            if (this._offscreen) {
                this._offCtx.scale(this._pixelScale, this._pixelScale);
                this._offCtx.translate(0.5, 0.5);
            }
        }
        for (let k in this.players) {
            if (this.players.hasOwnProperty(k)) {
                let p = this.players[k];
                if (p.resize)
                    p.resize(this.bound, evt);
            }
        }
        ;
        this.render(this._ctx);
        // if it's a valid resize event and space is not playing, repaint the canvas once
        if (evt && !this.isPlaying)
            this.playOnce(0);
        return this;
    }
    /**
    * Window resize handling
    * @param evt
    */
    _resizeHandler(evt) {
        let b = (this._autoResize || this._initialResize) ? this._container.getBoundingClientRect() : this._canvas.getBoundingClientRect();
        if (b) {
            let box = Bound_1.Bound.fromBoundingRect(b);
            // Need to compute offset from window scroll. See outerBound calculation in Space's _mouseAction 
            box.center = box.center.add(window.pageXOffset, window.pageYOffset);
            this.resize(box, evt);
        }
    }
    /**
    * Set a background color for this canvas. Alternatively, you may use `clear()` function.
    @param bg background color as hex or rgba string
    */
    set background(bg) { this._bgcolor = bg; }
    get background() { return this._bgcolor; }
    /**
    * `pixelScale` property returns a number that let you determine if the screen is "retina" (when value >= 2)
    */
    get pixelScale() {
        return this._pixelScale;
    }
    /**
    * Check if an offscreen canvas is created
    */
    get hasOffscreen() {
        return this._offscreen;
    }
    /**
    * Get the rendering context of offscreen canvas (if created via `setup()`)
    */
    get offscreenCtx() { return this._offCtx; }
    /**
    * Get the offscreen canvas element
    */
    get offscreenCanvas() { return this._offCanvas; }
    /**
    * Get a new `CanvasForm` for drawing
    * @see `CanvasForm`
    */
    getForm() { return new CanvasForm(this); }
    /**
    * Get the html canvas element
    */
    get element() {
        return this._canvas;
    }
    /**
    * Get the parent element that contains the canvas element
    */
    get parent() {
        return this._container;
    }
    /**
     * A property to indicate if the Space is ready
     */
    get ready() {
        return this._isReady;
    }
    /**
    * Get the rendering context of canvas
    */
    get ctx() { return this._ctx; }
    /**
    * Clear the canvas with its background color. Overrides Space's `clear` function.
    * @param bg Optionally specify a custom background color in hex or rgba string, or "transparent". If not defined, it will use its `bgcolor` property as background color to clear the canvas.
    */
    clear(bg) {
        if (bg)
            this._bgcolor = bg;
        let lastColor = this._ctx.fillStyle;
        if (this._bgcolor && this._bgcolor != "transparent") {
            this._ctx.fillStyle = this._bgcolor;
            this._ctx.fillRect(-1, -1, this._canvas.width + 1, this._canvas.height + 1);
        }
        else {
            this._ctx.clearRect(-1, -1, this._canvas.width + 1, this._canvas.height + 1);
        }
        this._ctx.fillStyle = lastColor;
        return this;
    }
    /**
    * Similiar to `clear()` but clear the offscreen canvas instead
    * @param bg Optionally specify a custom background color in hex or rgba string, or "transparent". If not defined, it will use its `bgcolor` property as background color to clear the canvas.
    */
    clearOffscreen(bg) {
        if (this._offscreen) {
            if (bg) {
                this._offCtx.fillStyle = bg;
                this._offCtx.fillRect(-1, -1, this._canvas.width + 1, this._canvas.height + 1);
            }
            else {
                this._offCtx.clearRect(-1, -1, this._offCanvas.width + 1, this._offCanvas.height + 1);
            }
        }
        return this;
    }
    /**
    * Main animation function. Call `Space.playItems`.
    * @param time current time
    */
    playItems(time) {
        if (this._isReady) {
            this._ctx.save();
            if (this._offscreen)
                this._offCtx.save();
            super.playItems(time);
            this._ctx.restore();
            if (this._offscreen)
                this._offCtx.restore();
            this.render(this._ctx);
        }
    }
}
exports.CanvasSpace = CanvasSpace;
/**
* CanvasForm is an implementation of abstract class VisualForm. It provide methods to express Pts on CanvasSpace.
* You may extend CanvasForm to implement your own expressions for CanvasSpace.
*/
class CanvasForm extends Form_1.VisualForm {
    /**
    * Create a new CanvasForm. You may also use `space.getForm()` to get the default form.
    * @param space an instance of CanvasSpace
    */
    constructor(space) {
        super();
        /**
        * store common styles so that they can be restored to canvas context when using multiple forms. See `reset()`.
        */
        this._style = {
            fillStyle: "#f03", strokeStyle: "#fff",
            lineWidth: 1, lineJoin: "bevel", lineCap: "butt",
        };
        this._space = space;
        this._space.add({ start: () => {
                this._ctx = this._space.ctx;
                this._ctx.fillStyle = this._style.fillStyle;
                this._ctx.strokeStyle = this._style.strokeStyle;
                this._ctx.lineJoin = "bevel";
                this._ctx.font = this._font.value;
                this._ready = true;
            } });
    }
    /**
    * get the CanvasSpace instance that this form is associated with
    */
    get space() { return this._space; }
    /**
    * Toggle whether to draw on offscreen canvas (if offscreen is set in CanvasSpace)
    * @param off if `true`, draw on offscreen canvas instead of the visible canvas. Default is `true`
    * @param clear optionally provide a valid color string to fill a bg color. see CanvasSpace's `clearOffscreen` function.
    */
    useOffscreen(off = true, clear = false) {
        if (clear)
            this._space.clearOffscreen((typeof clear == "string") ? clear : null);
        this._ctx = (this._space.hasOffscreen && off) ? this._space.offscreenCtx : this._space.ctx;
        return this;
    }
    /**
    * Render the offscreen canvas's content on the visible canvas
    * @param offset Optional offset on the top-left position when drawing on the visible canvas
    */
    renderOffscreen(offset = [0, 0]) {
        if (this._space.hasOffscreen) {
            this._space.ctx.drawImage(this._space.offscreenCanvas, offset[0], offset[1], this._space.width, this._space.height);
        }
    }
    /**
    * Set current fill style. Provide a valid color string or `false` to specify no fill color.
    * @example `form.fill("#F90")`, `form.fill("rgba(0,0,0,.5")`, `form.fill(false)`
    * @param c fill color which can be as color, gradient, or pattern. (See [canvas documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle))
    */
    fill(c) {
        if (typeof c == "boolean") {
            this.filled = c;
        }
        else {
            this.filled = true;
            this._style.fillStyle = c;
            this._ctx.fillStyle = c;
        }
        return this;
    }
    /**
    * Set current stroke style. Provide a valid color string or `false` to specify no stroke color.
    * @example `form.stroke("#F90")`, `form.stroke("rgba(0,0,0,.5")`, `form.stroke(false)`, `form.stroke("#000", 0.5, 'round', 'square')`
    * @param c stroke color which can be as color, gradient, or pattern. (See [canvas documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeStyle))
    * @param width Optional value (can be floating point) to set line width
    * @param linejoin Optional string to set line joint style. Can be "miter", "bevel", or "round".
    * @param linecap Optional string to set line cap style. Can be "butt", "round", or "square".
    */
    stroke(c, width, linejoin, linecap) {
        if (typeof c == "boolean") {
            this.stroked = c;
        }
        else {
            this.stroked = true;
            this._style.strokeStyle = c;
            this._ctx.strokeStyle = c;
            if (width) {
                this._ctx.lineWidth = width;
                this._style.lineWidth = width;
            }
            if (linejoin) {
                this._ctx.lineJoin = linejoin;
                this._style.lineJoin = linejoin;
            }
            if (linecap) {
                this._ctx.lineCap = linecap;
                this._style.lineCap = linecap;
            }
        }
        return this;
    }
    /**
    * Set the current font
    * @param sizeOrFont either a number to specify font-size, or a `Font` object to specify all font properties
    * @param weight Optional font-weight string such as "bold"
    * @param style Optional font-style string such as "italic"
    * @param lineHeight Optional line-height number suchas 1.5
    * @param family Optional font-family such as "Helvetica, sans-serif"
    * @example `form.font( myFont )`, `form.font(14, "bold")`
    */
    font(sizeOrFont, weight, style, lineHeight, family) {
        if (typeof sizeOrFont == "number") {
            this._font.size = sizeOrFont;
            if (family)
                this._font.face = family;
            if (weight)
                this._font.weight = weight;
            if (style)
                this._font.style = style;
            if (lineHeight)
                this._font.lineHeight = lineHeight;
            this._ctx.font = this._font.value;
        }
        else {
            this._font = sizeOrFont;
        }
        // If using estimate, reapply it when font changes.
        if (this._estimateTextWidth)
            this.fontWidthEstimate(true);
        return this;
    }
    /**
     * Set whether to use ctx.measureText or a faster but less accurate heuristic function.
     * @param estimate `true` to use heuristic function, or `false` to use ctx.measureText
     */
    fontWidthEstimate(estimate = true) {
        this._estimateTextWidth = (estimate) ? Typography_1.Typography.textWidthEstimator(((c) => this._ctx.measureText(c).width)) : undefined;
        return this;
    }
    /**
     * Get the width of this text. It will return an actual measurement or an estimate based on `fontWidthEstimate` setting. Default is an actual measurement using canvas context's measureText.
     * @param c a string of text contents
     */
    getTextWidth(c) {
        return (!this._estimateTextWidth) ? this._ctx.measureText(c).width : this._estimateTextWidth(c);
    }
    /**
     * Truncate text to fit width
     * @param str text to truncate
     * @param width width to fit
     * @param tail text to indicate overflow such as "...". Default is empty "".
     */
    _textTruncate(str, width, tail = "") {
        return Typography_1.Typography.truncate(this.getTextWidth.bind(this), str, width, tail);
    }
    /**
     * Align text within a rectangle box
     * @param box a Group that defines a rectangular box
     * @param vertical a string that specifies the vertical alignment in the box: "top", "bottom", "middle", "start", "end"
     * @param offset Optional offset from the edge (like padding)
     * @param center Optional center position
     */
    _textAlign(box, vertical, offset, center) {
        if (!center)
            center = Op_1.Rectangle.center(box);
        var px = box[0][0];
        if (this._ctx.textAlign == "end" || this._ctx.textAlign == "right") {
            px = box[1][0];
        }
        else if (this._ctx.textAlign == "center" || this._ctx.textAlign == "middle") {
            px = center[0];
        }
        var py = center[1];
        if (vertical == "top" || vertical == "start") {
            py = box[0][1];
        }
        else if (vertical == "end" || vertical == "bottom") {
            py = box[1][1];
        }
        return (offset) ? new Pt_1.Pt(px + offset[0], py + offset[1]) : new Pt_1.Pt(px, py);
    }
    /**
    * Reset the rendering context's common styles to this form's styles. This supports using multiple forms on the same canvas context.
    */
    reset() {
        for (let k in this._style) {
            if (this._style.hasOwnProperty(k)) {
                this._ctx[k] = this._style[k];
            }
        }
        this._font = new Form_1.Font();
        this._ctx.font = this._font.value;
        return this;
    }
    _paint() {
        if (this._filled)
            this._ctx.fill();
        if (this._stroked)
            this._ctx.stroke();
    }
    /**
    * Draws a point
    * @param p a Pt object
    * @param radius radius of the point. Default is 5.
    * @param shape The shape of the point. Defaults to "square", but it can be "circle" or a custom shape function in your own implementation.
    * @example `form.point( p )`, `form.point( p, 10, "circle" )`
    */
    point(p, radius = 5, shape = "square") {
        if (!p)
            return;
        if (!CanvasForm[shape])
            throw new Error(`${shape} is not a static function of CanvasForm`);
        CanvasForm[shape](this._ctx, p, radius);
        this._paint();
        return this;
    }
    /**
    * A static function to draw a circle
    * @param ctx canvas rendering context
    * @param pt center position of the circle
    * @param radius radius of the circle
    */
    static circle(ctx, pt, radius = 10) {
        if (!pt)
            return;
        ctx.beginPath();
        ctx.arc(pt[0], pt[1], radius, 0, Util_1.Const.two_pi, false);
        ctx.closePath();
    }
    /**
    * Draw a circle
    * @param pts usually a Group of 2 Pts, but it can also take an array of two numeric arrays [ [position], [size] ]
    * @see [`Circle.fromCenter`](./_op_.circle.html#frompt)
    */
    circle(pts) {
        CanvasForm.circle(this._ctx, pts[0], pts[1][0]);
        this._paint();
        return this;
    }
    /**
    * A static function to draw an arc.
    * @param ctx canvas rendering context
    * @param pt center position
    * @param radius radius of the arc circle
    * @param startAngle start angle of the arc
    * @param endAngle end angle of the arc
    * @param cc an optional boolean value to specify if it should be drawn clockwise (`false`) or counter-clockwise (`true`). Default is clockwise.
    */
    static arc(ctx, pt, radius, startAngle, endAngle, cc) {
        if (!pt)
            return;
        ctx.beginPath();
        ctx.arc(pt[0], pt[1], radius, startAngle, endAngle, cc);
    }
    /**
    * Draw an arc.
    * @param pt center position
    * @param radius radius of the arc circle
    * @param startAngle start angle of the arc
    * @param endAngle end angle of the arc
    * @param cc an optional boolean value to specify if it should be drawn clockwise (`false`) or counter-clockwise (`true`). Default is clockwise.
    */
    arc(pt, radius, startAngle, endAngle, cc) {
        CanvasForm.arc(this._ctx, pt, radius, startAngle, endAngle, cc);
        this._paint();
        return this;
    }
    /**
    * A static function to draw a square
    * @param ctx canvas rendering context
    * @param pt center position of the square
    * @param halfsize half size of the square
    */
    static square(ctx, pt, halfsize) {
        if (!pt)
            return;
        let x1 = pt[0] - halfsize;
        let y1 = pt[1] - halfsize;
        let x2 = pt[0] + halfsize;
        let y2 = pt[1] + halfsize;
        // faster than using `rect`
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x1, y2);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x2, y1);
        ctx.closePath();
    }
    /**
     * Draw a square, given a center and its half-size
     * @param pt center Pt
     * @param halfsize half-size
     */
    square(pt, halfsize) {
        CanvasForm.square(this._ctx, pt, halfsize);
        this._paint();
        return this;
    }
    /**
    * A static function to draw a line
    * @param ctx canvas rendering context
    * @param pts a Group of multiple Pts, or an array of multiple numeric arrays
    */
    static line(ctx, pts) {
        if (pts.length < 2)
            return;
        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1]);
        for (let i = 1, len = pts.length; i < len; i++) {
            if (pts[i])
                ctx.lineTo(pts[i][0], pts[i][1]);
        }
    }
    /**
    * Draw a line or polyline
    * @param pts a Group of multiple Pts, or an array of multiple numeric arrays
    */
    line(pts) {
        CanvasForm.line(this._ctx, pts);
        this._paint();
        return this;
    }
    /**
    * A static function to draw polygon
    * @param ctx canvas rendering context
    * @param pts a Group of multiple Pts, or an array of multiple numeric arrays
    */
    static polygon(ctx, pts) {
        if (pts.length < 2)
            return;
        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1]);
        for (let i = 1, len = pts.length; i < len; i++) {
            if (pts[i])
                ctx.lineTo(pts[i][0], pts[i][1]);
        }
        ctx.closePath();
    }
    /**
    * Draw a polygon
    * @param pts a Group of multiple Pts, or an array of multiple numeric arrays
    */
    polygon(pts) {
        CanvasForm.polygon(this._ctx, pts);
        this._paint();
        return this;
    }
    /**
    * A static function to draw a rectangle
    * @param ctx canvas rendering context
    * @param pts usually a Group of 2 Pts specifying the top-left and bottom-right positions. Alternatively it can be an array of numeric arrays.
    */
    static rect(ctx, pts) {
        if (pts.length < 2)
            return;
        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1]);
        ctx.lineTo(pts[0][0], pts[1][1]);
        ctx.lineTo(pts[1][0], pts[1][1]);
        ctx.lineTo(pts[1][0], pts[0][1]);
        ctx.closePath();
    }
    /**
    * Draw a rectangle
    * @param pts usually a Group of 2 Pts specifying the top-left and bottom-right positions. Alternatively it can be an array of numeric arrays.
    */
    rect(pts) {
        CanvasForm.rect(this._ctx, pts);
        this._paint();
        return this;
    }
    /**
    * A static function to draw text
    * @param ctx canvas rendering context
    * @param `pt` a Point object to specify the anchor point
    * @param `txt` a string of text to draw
    * @param `maxWidth` specify a maximum width per line
    */
    static text(ctx, pt, txt, maxWidth) {
        if (!pt)
            return;
        ctx.fillText(txt, pt[0], pt[1], maxWidth);
    }
    /**
    * Draw text on canvas
    * @param `pt` a Pt or numeric array to specify the anchor point
    * @param `txt` text
    * @param `maxWidth` specify a maximum width per line
    */
    text(pt, txt, maxWidth) {
        CanvasForm.text(this._ctx, pt, txt, maxWidth);
        return this;
    }
    /**
     * Fit a single-line text in a rectangular box
     * @param box a rectangle box defined by a Group
     * @param txt string of text
     * @param tail text to indicate overflow such as "...". Default is empty "".
     * @param verticalAlign "top", "middle", or "bottom" to specify vertical alignment inside the box
     * @param overrideBaseline If `true`, use the corresponding baseline as verticalAlign. If `false`, use the current canvas context's textBaseline setting. Default is `true`.
     */
    textBox(box, txt, verticalAlign = "middle", tail = "", overrideBaseline = true) {
        if (overrideBaseline)
            this._ctx.textBaseline = verticalAlign;
        let size = Op_1.Rectangle.size(box);
        let t = this._textTruncate(txt, size[0], tail);
        this.text(this._textAlign(box, verticalAlign), t[0]);
        return this;
    }
    /**
     * Fit multi-line text in a rectangular box. Note that this will also set canvas context's textBaseline to "top".
     * @param box a rectangle box defined by a Group
     * @param txt string of text
     * @param lineHeight line height as a ratio of font size. Default is 1.2.
     * @param verticalAlign "top", "middle", or "bottom" to specify vertical alignment inside the box
     * @param crop a boolean to specify whether to crop text when overflowing
     */
    paragraphBox(box, txt, lineHeight = 1.2, verticalAlign = "top", crop = true) {
        let size = Op_1.Rectangle.size(box);
        this._ctx.textBaseline = "top"; // override textBaseline
        let lstep = this._font.size * lineHeight;
        // find next lines recursively
        let nextLine = (sub, buffer = [], cc = 0) => {
            if (!sub)
                return buffer;
            if (crop && cc * lstep > size[1] - lstep * 2)
                return buffer;
            if (cc > 10000)
                throw new Error("max recursion reached (10000)");
            let t = this._textTruncate(sub, size[0], "");
            // new line
            let newln = t[0].indexOf("\n");
            if (newln >= 0) {
                buffer.push(t[0].substr(0, newln));
                return nextLine(sub.substr(newln + 1), buffer, cc + 1);
            }
            // word wrap
            let dt = t[0].lastIndexOf(" ") + 1;
            if (dt <= 0 || t[1] === sub.length)
                dt = undefined;
            let line = t[0].substr(0, dt);
            buffer.push(line);
            return (t[1] <= 0 || t[1] === sub.length) ? buffer : nextLine(sub.substr((dt || t[1])), buffer, cc + 1);
        };
        let lines = nextLine(txt); // go through all lines
        let lsize = lines.length * lstep; // total height
        let lbox = box;
        if (verticalAlign == "middle" || verticalAlign == "center") {
            let lpad = (size[1] - lsize) / 2;
            if (crop)
                lpad = Math.max(0, lpad);
            lbox = new Pt_1.Group(box[0].$add(0, lpad), box[1].$subtract(0, lpad));
        }
        else if (verticalAlign == "bottom") {
            lbox = new Pt_1.Group(box[0].$add(0, size[1] - lsize), box[1]);
        }
        else {
            lbox = new Pt_1.Group(box[0], box[0].$add(size[0], lsize));
        }
        let center = Op_1.Rectangle.center(lbox);
        for (let i = 0, len = lines.length; i < len; i++) {
            this.text(this._textAlign(lbox, "top", [0, i * lstep], center), lines[i]);
        }
        return this;
    }
    /**
     * Set text alignment and baseline (eg, vertical-align)
     * @param alignment Canvas' textAlign option: "left", "right", "center", "start", or "end"
     * @param baseline Canvas' textBaseline option: "top", "hanging", "middle", "alphabetic", "ideographic", "bottom". For convenience, you can also use "center" (same as "middle"), and "baseline" (same as "alphabetic")
     */
    alignText(alignment = "left", baseline = "alphabetic") {
        if (baseline == "center")
            baseline = "middle";
        if (baseline == "baseline")
            baseline = "alphabetic";
        this._ctx.textAlign = alignment;
        this._ctx.textBaseline = baseline;
        return this;
    }
    /**
    * A convenient way to draw some text on canvas for logging or debugging. It'll be draw on the top-left of the canvas as an overlay.
    * @param txt text
    */
    log(txt) {
        let w = this._ctx.measureText(txt).width + 20;
        this.stroke(false).fill("rgba(0,0,0,.4)").rect([[0, 0], [w, 20]]);
        this.fill("#fff").text([10, 14], txt);
        return this;
    }
}
exports.CanvasForm = CanvasForm;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Source code licensed under Apache License 2.0. 
// Copyright © 2017 William Ngan. (https://github.com/williamngan/pts)
Object.defineProperty(exports, "__esModule", { value: true });
const Pt_1 = __webpack_require__(0);
const Util_1 = __webpack_require__(1);
const Num_1 = __webpack_require__(3);
/**
 * Color is a subclass of Pt. You can think of a color as a point in a color space. The Color class provides support for many color spaces.
 */
class Color extends Pt_1.Pt {
    /**
     * Create a Color. Same as creating a Pt.
     * @param args Pt-like parameters which can be a list of numeric parameters, an array of numbers, or an object with {x,y,z,w} properties
     */
    constructor(...args) {
        super(...args);
        this._mode = "rgb";
        this._isNorm = false;
    }
    /**
     * Create a Color object with defaults to 4 dimensions
     * @param args Pt-like parameters which can be a list of numeric parameters, an array of numbers, or an object with {x,y,z,w} properties
     */
    static from(...args) {
        let p = [1, 1, 1, 1];
        let c = Util_1.Util.getArgs(args);
        for (let i = 0, len = p.length; i < len; i++) {
            if (i < c.length)
                p[i] = c[i];
        }
        return new Color(p);
    }
    /**
     * Convert a rgb hex string like #FF0000 or #F00 to a Color object
     * @param hex a hex string, with optional '#' prefix
     */
    static fromHex(hex) {
        if (hex[0] == "#")
            hex = hex.substr(1); // remove '#' if needed
        if (hex.length <= 3) {
            let fn = (i) => hex[i] || "F";
            hex = `${fn(0)}${fn(0)}${fn(1)}${fn(1)}${fn(2)}${fn(2)}`;
        }
        let alpha = 1;
        if (hex.length === 8) {
            alpha = hex.substr(6) && 0xFF / 255;
            hex = hex.substring(0, 6);
        }
        let hexVal = parseInt(hex, 16);
        return new Color(hexVal >> 16, hexVal >> 8 & 0xFF, hexVal & 0xFF, alpha);
    }
    /**
     * Create RGB Color
     * @param args Pt-like parameters which can be a list of numeric parameters, an array of numbers, or an object with {x,y,z,w} properties.
     */
    static rgb(...args) { return Color.from(...args).toMode("rgb"); }
    /**
     * Create HSL Color
     * @param args Pt-like parameters which can be a list of numeric parameters, an array of numbers, or an object with {x,y,z,w} properties.
     */
    static hsl(...args) { return Color.from(...args).toMode("hsl"); }
    /**
     * Create HSB Color
     * @param args Pt-like parameters which can be a list of numeric parameters, an array of numbers, or an object with {x,y,z,w} properties.
     */
    static hsb(...args) { return Color.from(...args).toMode("hsb"); }
    /**
     * Create LAB Color
     * @param args Pt-like parameters which can be a list of numeric parameters, an array of numbers, or an object with {x,y,z,w} properties.
     */
    static lab(...args) { return Color.from(...args).toMode("lab"); }
    /**
     * Create LCH Color
     * @param args Pt-like parameters which can be a list of numeric parameters, an array of numbers, or an object with {x,y,z,w} properties.
     */
    static lch(...args) { return Color.from(...args).toMode("lch"); }
    /**
     * Create LUV Color
     * @param args Pt-like parameters which can be a list of numeric parameters, an array of numbers, or an object with {x,y,z,w} properties.
     */
    static luv(...args) { return Color.from(...args).toMode("luv"); }
    /**
     * Create XYZ Color
     * @param args Pt-like parameters which can be a list of numeric parameters, an array of numbers, or an object with {x,y,z,w} properties.
     */
    static xyz(...args) { return Color.from(...args).toMode("xyz"); }
    /**
     * Get a Color object whose values are the maximum of its mode
     * @param mode a mode string such as "rgb" or "lab"
     * @example Color.maxValue("rgb") will return a rgb Color object with values (255,255,255)
     */
    static maxValues(mode) { return Color.ranges[mode].zipSlice(1).$take([0, 1, 2]); }
    /**
     * Get a hex string such as "#FF0000". Same as `toString("hex")`
     */
    get hex() { return this.toString("hex"); }
    /**
     * Get a rgb string such as "rgb(255,0,0)". Same as `toString("rgb")`
     */
    get rgb() { return this.toString("rgb"); }
    /**
     * Get a rgba string such as "rgb(255,0,0,0.5)". Same as `toString("rgba")`
     */
    get rgba() { return this.toString("rgba"); }
    /**
     * Clone this Color
     */
    clone() {
        let c = new Color(this);
        c.toMode(this._mode);
        return c;
    }
    /**
     * Convert this color from current color space to another color space
     * @param mode a ColorType string: "rgb" "hsl" "hsb" "lab" "lch" "luv" "xyz";
     * @param convert if `true`, convert this Color to the new color space specified in `mode`. Default is `false`, which only sets the color mode without converting color values.
     */
    toMode(mode, convert = false) {
        if (convert) {
            let fname = this._mode.toUpperCase() + "to" + mode.toUpperCase();
            if (Color[fname]) {
                this.to(Color[fname](this, this._isNorm, this._isNorm));
            }
            else {
                throw new Error("Cannot convert color with " + fname);
            }
        }
        this._mode = mode;
        return this;
    }
    /**
     * Get this Color's mode
     */
    get mode() { return this._mode; }
    // rgb
    get r() { return this[0]; }
    set r(n) { this[0] = n; }
    get g() { return this[1]; }
    set g(n) { this[1] = n; }
    get b() { return this[1]; }
    set b(n) { this[2] = n; }
    // hsl, hsb
    get h() { return (this._mode == "lch") ? this[2] : this[0]; }
    set h(n) {
        let i = (this._mode == "lch") ? 2 : 0;
        this[i] = n;
    }
    get s() { return this[1]; }
    set s(n) { this[1] = n; }
    get l() { return (this._mode == "hsl") ? this[2] : this[0]; }
    set l(n) {
        let i = (this._mode == "hsl") ? 2 : 0;
        this[i] = n;
    }
    // lab, lch, luv
    get a() { return this[1]; }
    set a(n) { this[1] = n; }
    get c() { return this[1]; }
    set c(n) { this[1] = n; }
    get u() { return this[1]; }
    set u(n) { this[1] = n; }
    get v() { return this[1]; }
    set v(n) { this[2] = n; }
    /**
     * Get alpha value
     */
    get alpha() { return (this.length > 3) ? this[3] : 1; }
    /**
     * Normalize the color values to between 0 to 1, or revert it back to the min/max values in current color mode
     * @param toNorm a boolean value specifying whether to normalize (`true`) or revert (`false`)
     */
    normalize(toNorm = true) {
        if (this._isNorm == toNorm)
            return this;
        let ranges = Color.ranges[this._mode];
        for (let i = 0; i < 3; i++) {
            this[i] = (!toNorm)
                ? Num_1.Num.mapToRange(this[i], 0, 1, ranges[i][0], ranges[i][1])
                : Num_1.Num.mapToRange(this[i], ranges[i][0], ranges[i][1], 0, 1);
        }
        this._isNorm = toNorm;
        return this;
    }
    /**
     * Like `normalize()` but returns as a new Color
     * @param toNorm a boolean value specifying whether to normalize (`true`) or revert (`false`)
     * @returns new Color
     */
    $normalize(toNorm = true) { return this.clone().normalize(toNorm); }
    /**
     * Convert this Color to a string. It can be used to get a hex or rgb string for use in rendering
     * @param format "hex", "rgb", "rgba", or "mode" which means using current color mode label. Default is "mode".
     */
    toString(format = "mode") {
        if (format == "hex") {
            let _hex = (n) => {
                let s = Math.floor(n).toString(16);
                return (s.length < 2) ? '0' + s : s;
            };
            return `#${_hex(this[0])}${_hex(this[1])}${_hex(this[2])}`;
        }
        else if (format == "rgba") {
            return `rgba(${Math.floor(this[0])},${Math.floor(this[1])},${Math.floor(this[2])},${this.alpha}`;
        }
        else if (format == "rgb") {
            return `rgb(${Math.floor(this[0])},${Math.floor(this[1])},${Math.floor(this[2])}`;
        }
        else {
            return `${this._mode}(${this[0]},${this[1]},${this[2]},${this.alpha})`;
        }
    }
    /**
     * Convert RGB to HSL
     * @param rgb a RGB Color
     * @param normalizedInput a boolean specifying whether input color is normalized. Default is not normalized: `false`.
     * @param normalizedOutput a boolean specifying whether output color shoud be normalized. Default is not normalized: `false`.
     * @returns a new HSL Color
     */
    static RGBtoHSL(rgb, normalizedInput = false, normalizedOutput = false) {
        let [r, g, b] = (!normalizedInput) ? rgb.$normalize() : rgb;
        let max = Math.max(r, g, b);
        let min = Math.min(r, g, b);
        let h = (max + min) / 2;
        let s = h;
        let l = h;
        if (max == min) {
            h = 0;
            s = 0; // achromatic
        }
        else {
            let d = max - min;
            s = (l > 0.5) ? d / (2 - max - min) : d / (max + min);
            h = 0;
            if (max === r) {
                h = (g - b) / d + ((g < b) ? 6 : 0);
            }
            else if (max === g) {
                h = (b - r) / d + 2;
            }
            else if (max === b) {
                h = (r - g) / d + 4;
            }
        }
        return Color.hsl(((normalizedOutput) ? h / 60 : h * 60), s, l, rgb.alpha);
    }
    /**
     * Convert HSL to RGB
     * @param hsl a HSL Color
     * @param normalizedInput a boolean specifying whether input color is normalized. Default is not normalized: `false`.
     * @param normalizedOutput a boolean specifying whether output color shoud be normalized. Default is not normalized: `false`.
     * @returns a new RGB Color
     */
    static HSLtoRGB(hsl, normalizedInput = false, normalizedOutput = false) {
        let [h, s, l] = hsl;
        if (!normalizedInput)
            h = h / 360;
        if (s == 0)
            return Color.rgb(l * 255, l * 255, l * 255, hsl.alpha);
        let q = (l <= 0.5) ? l * (1 + s) : l + s - (l * s);
        let p = 2 * l - q;
        let convert = (t) => {
            t = (t < 0) ? t + 1 : (t > 1) ? t - 1 : t;
            if (t * 6 < 1) {
                return p + (q - p) * t * 6;
            }
            else if (t * 2 < 1) {
                return q;
            }
            else if (t * 3 < 2) {
                return p + (q - p) * ((2 / 3) - t) * 6;
            }
            else {
                return p;
            }
        };
        let sc = (normalizedOutput) ? 1 : 255;
        return Color.rgb(sc * convert((h + 1 / 3)), sc * convert(h), sc * convert((h - 1 / 3)), hsl.alpha);
    }
    /**
     * Convert RGB to HSB
     * @param rgb a RGB Color
     * @param normalizedInput a boolean specifying whether input color is normalized. Default is not normalized: `false`.
     * @param normalizedOutput a boolean specifying whether output color shoud be normalized. Default is not normalized: `false`.
     * @returns a new HSB Color
     */
    static RGBtoHSB(rgb, normalizedInput = false, normalizedOutput = false) {
        let [r, g, b] = (!normalizedInput) ? rgb.$normalize() : rgb;
        let max = Math.max(r, g, b);
        let min = Math.min(r, g, b);
        let d = max - min;
        let h = 0;
        let s = (max === 0) ? 0 : d / max;
        let v = max;
        if (max != min) {
            if (max === r) {
                h = (g - b) / d + ((g < b) ? 6 : 0);
            }
            else if (max === g) {
                h = (b - r) / d + 2;
            }
            else if (max === b) {
                h = (r - g) / d + 4;
            }
        }
        return Color.hsb(((normalizedOutput) ? h / 60 : h * 60), s, v, rgb.alpha);
    }
    /**
     * Convert HSB to RGB
     * @param hsb a HSB Color
     * @param normalizedInput a boolean specifying whether input color is normalized. Default is not normalized: `false`.
     * @param normalizedOutput a boolean specifying whether output color shoud be normalized. Default is not normalized: `false`.
     * @returns a new RGB Color
     */
    static HSBtoRGB(hsb, normalizedInput = false, normalizedOutput = false) {
        let [h, s, v] = hsb;
        if (!normalizedInput)
            h = h / 360;
        let i = Math.floor(h * 6);
        let f = h * 6 - i;
        let p = v * (1 - s);
        let q = v * (1 - f * s);
        let t = v * (1 - (1 - f) * s);
        let pick = [
            [v, t, p], [q, v, p], [p, v, t],
            [p, q, v], [t, p, v], [v, p, q]
        ];
        let c = pick[i % 6];
        let sc = (normalizedOutput) ? 1 : 255;
        return Color.rgb(sc * c[0], sc * c[1], sc * c[2], hsb.alpha);
    }
    /**
   * Convert RGB to LAB
   * @param rgb a RGB Color
   * @param normalizedInput a boolean specifying whether input color is normalized. Default is not normalized: `false`.
   * @param normalizedOutput a boolean specifying whether output color shoud be normalized. Default is not normalized: `false`.
   * @returns a new LAB Color
   */
    static RGBtoLAB(rgb, normalizedInput = false, normalizedOutput = false) {
        let c = (normalizedInput) ? rgb.$normalize(false) : rgb;
        return Color.XYZtoLAB(Color.RGBtoXYZ(c), false, normalizedOutput);
    }
    /**
     * Convert LAB to RGB
     * @param lab a LAB Color
     * @param normalizedInput a boolean specifying whether input color is normalized. Default is not normalized: `false`.
     * @param normalizedOutput a boolean specifying whether output color shoud be normalized. Default is not normalized: `false`.
     * @returns a new RGB Color
     */
    static LABtoRGB(lab, normalizedInput = false, normalizedOutput = false) {
        let c = (normalizedInput) ? lab.$normalize(false) : lab;
        return Color.XYZtoRGB(Color.LABtoXYZ(c), false, normalizedOutput);
    }
    /**
     * Convert RGB to LCH
     * @param rgb a RGB Color
     * @param normalizedInput a boolean specifying whether input color is normalized. Default is not normalized: `false`.
     * @param normalizedOutput a boolean specifying whether output color shoud be normalized. Default is not normalized: `false`.
     * @returns a new LCH Color
     */
    static RGBtoLCH(rgb, normalizedInput = false, normalizedOutput = false) {
        let c = (normalizedInput) ? rgb.$normalize(false) : rgb;
        return Color.LABtoLCH(Color.RGBtoLAB(c), false, normalizedOutput);
    }
    /**
     * Convert LCH to RGB
     * @param lch a LCH Color
     * @param normalizedInput a boolean specifying whether input color is normalized. Default is not normalized: `false`.
     * @param normalizedOutput a boolean specifying whether output color shoud be normalized. Default is not normalized: `false`.
     * @returns a new RGB Color
     */
    static LCHtoRGB(lch, normalizedInput = false, normalizedOutput = false) {
        let c = (normalizedInput) ? lch.$normalize(false) : lch;
        return Color.LABtoRGB(Color.LCHtoLAB(c), false, normalizedOutput);
    }
    /**
     * Convert RGB to LUV
     * @param rgb a RGB Color
     * @param normalizedInput a boolean specifying whether input color is normalized. Default is not normalized: `false`.
     * @param normalizedOutput a boolean specifying whether output color shoud be normalized. Default is not normalized: `false`.
     * @returns a new LUV Color
     */
    static RGBtoLUV(rgb, normalizedInput = false, normalizedOutput = false) {
        let c = (normalizedInput) ? rgb.$normalize(false) : rgb;
        return Color.XYZtoLUV(Color.RGBtoXYZ(c), false, normalizedOutput);
    }
    /**
     * Convert LUV to RGB
     * @param rgb a RGB Color
     * @param normalizedInput a boolean specifying whether input color is normalized. Default is not normalized: `false`.
     * @param normalizedOutput a boolean specifying whether output color shoud be normalized. Default is not normalized: `false`.
     * @returns a new RGB Color
     */
    static LUVtoRGB(luv, normalizedInput = false, normalizedOutput = false) {
        let c = (normalizedInput) ? luv.$normalize(false) : luv;
        return Color.XYZtoRGB(Color.LUVtoXYZ(c), false, normalizedOutput);
    }
    /**
     * Convert RGB to XYZ
     * @param rgb a RGB Color
     * @param normalizedInput a boolean specifying whether input color is normalized. Default is not normalized: `false`.
     * @param normalizedOutput a boolean specifying whether output color shoud be normalized. Default is not normalized: `false`.
     * @returns a new XYZ Color
     */
    static RGBtoXYZ(rgb, normalizedInput = false, normalizedOutput = false) {
        let c = (!normalizedInput) ? rgb.$normalize() : rgb.clone();
        for (let i = 0; i < 3; i++) {
            c[i] = (c[i] > 0.04045) ? Math.pow((c[i] + 0.055) / 1.055, 2.4) : c[i] / 12.92;
            if (!normalizedOutput)
                c[i] = c[i] * 100;
        }
        let cc = Color.xyz(c[0] * 0.4124564 + c[1] * 0.3575761 + c[2] * 0.1804375, c[0] * 0.2126729 + c[1] * 0.7151522 + c[2] * 0.0721750, c[0] * 0.0193339 + c[1] * 0.1191920 + c[2] * 0.9503041, rgb.alpha);
        return (normalizedOutput) ? cc.normalize() : cc;
    }
    /**
     * Convert XYZ to RGB
     * @param xyz a XYZ Color
     * @param normalizedInput a boolean specifying whether input color is normalized. Default is not normalized: `false`.
     * @param normalizedOutput a boolean specifying whether output color shoud be normalized. Default is not normalized: `false`.
     * @returns a new RGB Color
     */
    static XYZtoRGB(xyz, normalizedInput = false, normalizedOutput = false) {
        let [x, y, z] = (!normalizedInput) ? xyz.$normalize() : xyz;
        let rgb = [
            x * 3.2404542 + y * -1.5371385 + z * -0.4985314,
            x * -0.9692660 + y * 1.8760108 + z * 0.0415560,
            x * 0.0556434 + y * -0.2040259 + z * 1.0572252
        ];
        // convert xyz to rgb. Note that not all colors are visible in rgb, so here we bound rgb between 0 to 1
        for (let i = 0; i < 3; i++) {
            rgb[i] = (rgb[i] < 0) ? 0 : (rgb[i] > 0.0031308) ? (1.055 * Math.pow(rgb[i], 1 / 2.4) - 0.055) : (12.92 * rgb[i]);
            rgb[i] = Math.max(0, Math.min(1, rgb[i]));
            if (!normalizedOutput)
                rgb[i] = Math.round(rgb[i] * 255);
        }
        let cc = Color.rgb(rgb[0], rgb[1], rgb[2], xyz.alpha);
        return (normalizedOutput) ? cc.normalize() : cc;
    }
    /**
     * Convert XYZ to LAB
     * @param xyz a XYZ Color
     * @param normalizedInput a boolean specifying whether input color is normalized. Default is not normalized: `false`.
     * @param normalizedOutput a boolean specifying whether output color shoud be normalized. Default is not normalized: `false`.
     * @returns a new LAB Color
     */
    static XYZtoLAB(xyz, normalizedInput = false, normalizedOutput = false) {
        let c = (normalizedInput) ? xyz.$normalize(false) : xyz.clone();
        // adjust for D65  
        c.divide(Color.D65);
        let fn = (n) => (n > 0.008856) ? Math.pow(n, 1 / 3) : (7.787 * n) + 16 / 116;
        let cy = fn(c[1]);
        let cc = Color.lab((116 * cy) - 16, 500 * (fn(c[0]) - cy), 200 * (cy - fn(c[2])), xyz.alpha);
        return (normalizedOutput) ? cc.normalize() : cc;
    }
    /**
     * Convert LAB to XYZ
     * @param lab a LAB Color
     * @param normalizedInput a boolean specifying whether input color is normalized. Default is not normalized: `false`.
     * @param normalizedOutput a boolean specifying whether output color shoud be normalized. Default is not normalized: `false`.
     * @returns a new XYZ Color
     */
    static LABtoXYZ(lab, normalizedInput = false, normalizedOutput = false) {
        let c = (normalizedInput) ? lab.$normalize(false) : lab;
        let y = (c[0] + 16) / 116;
        let x = (c[1] / 500) + y;
        let z = y - c[2] / 200;
        let fn = (n) => {
            let nnn = n * n * n;
            return (nnn > 0.008856) ? nnn : (n - 16 / 116) / 7.787;
        };
        let d = Color.D65;
        // adjusted
        let cc = Color.xyz(
        // Math.max(0, Math.min( 100, d[0] * fn(x) )),
        // Math.max(0, Math.min( 100, d[1] * fn(y) )),
        // Math.max(0, Math.min( 100, d[2] * fn(z) )),
        Math.max(0, d[0] * fn(x)), Math.max(0, d[1] * fn(y)), Math.max(0, d[2] * fn(z)), lab.alpha);
        return (normalizedOutput) ? cc.normalize() : cc;
    }
    /**
     * Convert XYZ to LUV
     * @param xyz a XYZ Color
     * @param normalizedInput a boolean specifying whether input color is normalized. Default is not normalized: `false`.
     * @param normalizedOutput a boolean specifying whether output color shoud be normalized. Default is not normalized: `false`.
     * @returns a new LUV Color
     */
    static XYZtoLUV(xyz, normalizedInput = false, normalizedOutput = false) {
        let [x, y, z] = (normalizedInput) ? xyz.$normalize(false) : xyz;
        let u = (4 * x) / (x + (15 * y) + (3 * z));
        let v = (9 * y) / (x + (15 * y) + (3 * z));
        y = y / 100;
        y = (y > 0.008856) ? Math.pow(y, 1 / 3) : (7.787 * y + 16 / 116);
        let refU = (4 * Color.D65[0]) / (Color.D65[0] + (15 * Color.D65[1]) + (3 * Color.D65[2]));
        let refV = (9 * Color.D65[1]) / (Color.D65[0] + (15 * Color.D65[1]) + (3 * Color.D65[2]));
        let L = (116 * y) - 16;
        return Color.luv(L, 13 * L * (u - refU), 13 * L * (v - refV), xyz.alpha);
    }
    /**
     * Convert LUV to XYZ
     * @param luv a LUV Color
     * @param normalizedInput a boolean specifying whether input color is normalized. Default is not normalized: `false`.
     * @param normalizedOutput a boolean specifying whether output color shoud be normalized. Default is not normalized: `false`.
     * @returns a new XYZ Color
     */
    static LUVtoXYZ(luv, normalizedInput = false, normalizedOutput = false) {
        let [l, u, v] = (normalizedInput) ? luv.$normalize(false) : luv;
        let y = (l + 16) / 116;
        let cubeY = y * y * y;
        y = (cubeY > 0.008856) ? cubeY : (y - 16 / 116) / 7.787;
        let refU = (4 * Color.D65[0]) / (Color.D65[0] + (15 * Color.D65[1]) + (3 * Color.D65[2]));
        let refV = (9 * Color.D65[1]) / (Color.D65[0] + (15 * Color.D65[1]) + (3 * Color.D65[2]));
        u = u / (13 * l) + refU;
        v = v / (13 * l) + refV;
        y = y * 100;
        let x = -1 * (9 * y * u) / ((u - 4) * v - u * v);
        let z = (9 * y - (15 * v * y) - (v * x)) / (3 * v);
        return Color.xyz(x, y, z, luv.alpha);
    }
    /**
     * Convert LAB to LCH
     * @param lab a LAB Color
     * @param normalizedInput a boolean specifying whether input color is normalized. Default is not normalized: `false`.
     * @param normalizedOutput a boolean specifying whether output color shoud be normalized. Default is not normalized: `false`.
     * @returns a new LCH Color
     */
    static LABtoLCH(lab, normalizedInput = false, normalizedOutput = false) {
        let c = (normalizedInput) ? lab.$normalize(false) : lab;
        let h = Num_1.Geom.toDegree(Num_1.Geom.boundRadian(Math.atan2(c[2], c[1]))); // 0 to 360 degrees
        return Color.lch(c[0], Math.sqrt(c[1] * c[1] + c[2] * c[2]), h, lab.alpha);
    }
    /**
     * Convert LCH to LAB
     * @param lch a LCH Color
     * @param normalizedInput a boolean specifying whether input color is normalized. Default is not normalized: `false`.
     * @param normalizedOutput a boolean specifying whether output color shoud be normalized. Default is not normalized: `false`.
     * @returns a new LAB Color
     */
    static LCHtoLAB(lch, normalizedInput = false, normalizedOutput = false) {
        let c = (normalizedInput) ? lch.$normalize(false) : lch;
        let rad = Num_1.Geom.toRadian(c[2]);
        return Color.lab(c[0], Math.cos(rad) * c[1], Math.sin(rad) * c[1], lch.alpha);
    }
}
// XYZ property for Standard Observer 2deg, Daylight/sRGB illuminant D65
Color.D65 = new Pt_1.Pt(95.047, 100, 108.883, 1);
/**
 * Value range for each color space
 */
Color.ranges = {
    rgb: new Pt_1.Group(new Pt_1.Pt(0, 255), new Pt_1.Pt(0, 255), new Pt_1.Pt(0, 255)),
    hsl: new Pt_1.Group(new Pt_1.Pt(0, 360), new Pt_1.Pt(0, 1), new Pt_1.Pt(0, 1)),
    hsb: new Pt_1.Group(new Pt_1.Pt(0, 360), new Pt_1.Pt(0, 1), new Pt_1.Pt(0, 1)),
    lab: new Pt_1.Group(new Pt_1.Pt(0, 100), new Pt_1.Pt(-128, 127), new Pt_1.Pt(-128, 127)),
    lch: new Pt_1.Group(new Pt_1.Pt(0, 100), new Pt_1.Pt(0, 100), new Pt_1.Pt(0, 360)),
    luv: new Pt_1.Group(new Pt_1.Pt(0, 100), new Pt_1.Pt(-134, 220), new Pt_1.Pt(-140, 122)),
    xyz: new Pt_1.Group(new Pt_1.Pt(0, 100), new Pt_1.Pt(0, 100), new Pt_1.Pt(0, 100))
};
exports.Color = Color;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Source code licensed under Apache License 2.0. 
// Copyright © 2017 William Ngan. (https://github.com/williamngan/pts)
Object.defineProperty(exports, "__esModule", { value: true });
const Pt_1 = __webpack_require__(0);
const Op_1 = __webpack_require__(2);
const Util_1 = __webpack_require__(1);
const Num_1 = __webpack_require__(3);
const LinearAlgebra_1 = __webpack_require__(4);
/**
 * The `Create` class provides various convenient functions to create structures or shapes.
 */
class Create {
    /**
     * Create a set of random points inside a bounday
     * @param bound the rectangular boundary
     * @param count number of random points to create
     * @param dimensions number of dimensions in each point
     */
    static distributeRandom(bound, count, dimensions = 2) {
        let pts = new Pt_1.Group();
        for (let i = 0; i < count; i++) {
            let p = [bound.x + Math.random() * bound.width];
            if (dimensions > 1)
                p.push(bound.y + Math.random() * bound.height);
            if (dimensions > 2)
                p.push(bound.z + Math.random() * bound.depth);
            pts.push(new Pt_1.Pt(p));
        }
        return pts;
    }
    /**
     * Create a set of points that distribute evenly on a line
     * @param line a Group representing a line
     * @param count number of points to create
     */
    static distributeLinear(line, count) {
        let ln = Op_1.Line.subpoints(line, count - 2);
        ln.unshift(line[0]);
        ln.push(line[line.length - 1]);
        return ln;
    }
    /**
     * Create an evenly distributed set of points (like a grid of points) inside a boundary.
     * @param bound the rectangular boundary
     * @param columns number of columns
     * @param rows number of rows
     * @param orientation a Pt or number array to specify where the point should be inside a cell. Default is [0.5, 0.5] which places the point in the middle.
     * @returns a Group of Pts
     */
    static gridPts(bound, columns, rows, orientation = [0.5, 0.5]) {
        if (columns === 0 || rows === 0)
            throw new Error("grid columns and rows cannot be 0");
        let unit = bound.size.$subtract(1).$divide(columns, rows);
        let offset = unit.$multiply(orientation);
        let g = new Pt_1.Group();
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
                g.push(bound.topLeft.$add(unit.$multiply(c, r)).add(offset));
            }
        }
        return g;
    }
    /**
     * Create a grid inside a boundary
     * @param bound the rectangular boundary
     * @param columns number of columns
     * @param rows number of rows
     * @returns an array of Groups, where each group represents a rectangular cell
     */
    static gridCells(bound, columns, rows) {
        if (columns === 0 || rows === 0)
            throw new Error("grid columns and rows cannot be 0");
        let unit = bound.size.$subtract(1).divide(columns, rows); // subtract 1 to fill whole border of rectangles
        let g = [];
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
                g.push(new Pt_1.Group(bound.topLeft.$add(unit.$multiply(c, r)), bound.topLeft.$add(unit.$multiply(c, r).add(unit))));
            }
        }
        return g;
    }
    /**
     * Create a set of Pts around a circular path
     * @param center circle center
     * @param radius circle radius
     * @param count number of Pts to create
     */
    static radialPts(center, radius, count) {
        let g = new Pt_1.Group();
        let a = Util_1.Const.two_pi / count;
        for (let i = 0; i < count; i++) {
            g.push(new Pt_1.Pt(center).toAngle(a * i - Util_1.Const.half_pi, radius, true));
        }
        return g;
    }
    /**
     * Given a group of Pts, return a new group of `Noise` Pts.
     * @param pts a Group or an array of Pts
     * @param dx small increment value in x dimension
     * @param dy small increment value in y dimension
     * @param rows Optional row count to generate 2D noise
     * @param columns Optional column count to generate 2D noise
     */
    static noisePts(pts, dx = 0.01, dy = 0.01, rows = 0, columns = 0) {
        let seed = Math.random();
        let g = new Pt_1.Group();
        for (let i = 0, len = pts.length; i < len; i++) {
            let np = new Noise(pts[i]);
            let r = (rows && rows > 0) ? Math.floor(i / rows) : i;
            let c = (columns && columns > 0) ? i % columns : i;
            np.initNoise(dx * c, dy * r);
            np.seed(seed);
            g.push(np);
        }
        return g;
    }
    /**
     * Create a Delaunay Group. Use the `.delaunay()` and `.voronoi()` functions in the returned group to generate tessellations.
     * @param pts a Group or an array of Pts
     * @returns an instance of the Delaunay class
     */
    static delaunay(pts) {
        return Delaunay.from(pts);
    }
}
exports.Create = Create;
/**
 * Perlin noise gradient indices
 */
const grad3 = [
    [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
    [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
    [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1]
];
/**
 * Perlin noise permutation table
 */
const permTable = [151, 160, 137, 91, 90, 15,
    131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23,
    190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33,
    88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166,
    77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244,
    102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196,
    135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123,
    5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42,
    223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9,
    129, 22, 39, 253, 9, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228,
    251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107,
    49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254,
    138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180
];
/**
 * A class to generate Perlin noise. Currently it implements a basic 2D noise. More to follow.
 * Based on https://gist.github.com/banksean/304522
 */
class Noise extends Pt_1.Pt {
    /**
     * Create a Noise Pt that's capable of generating noise
     * @param args a list of numeric parameters, an array of numbers, or an object with {x,y,z,w} properties
     */
    constructor(...args) {
        super(...args);
        this.perm = [];
        this._n = new Pt_1.Pt(0.01, 0.01);
        // For easier index wrapping, double the permutation table length
        this.perm = permTable.concat(permTable);
    }
    /**
     * Set the initial noise values
     * @param args a list of numeric parameters, an array of numbers, or an object with {x,y,z,w} properties
     * @example `noise.initNoise( 0.01, 0.1 )`
     */
    initNoise(...args) {
        this._n = new Pt_1.Pt(...args);
    }
    /**
     * Add a small increment to the noise values
     * @param x step in x dimension
     * @param y step in y dimension
     */
    step(x = 0, y = 0) {
        this._n.add(x, y);
    }
    /**
     * Specify a seed for this Noise
     * @param s seed value
     */
    seed(s) {
        if (s > 0 && s < 1)
            s *= 65536;
        s = Math.floor(s);
        if (s < 256)
            s |= s << 8;
        for (let i = 0; i < 255; i++) {
            let v = (i & 1) ? permTable[i] ^ (s & 255) : permTable[i] ^ ((s >> 8) & 255);
            this.perm[i] = this.perm[i + 256] = v;
        }
    }
    /**
     * Generate a 2D Perlin noise value
     */
    noise2D() {
        let i = Math.floor(this._n[0]) % 255;
        let j = Math.floor(this._n[1]) % 255;
        let x = (this._n[0] % 255) - i;
        let y = (this._n[1] % 255) - j;
        let n00 = LinearAlgebra_1.Vec.dot(grad3[(i + this.perm[j]) % 12], [x, y, 0]);
        let n01 = LinearAlgebra_1.Vec.dot(grad3[(i + this.perm[j + 1]) % 12], [x, y - 1, 0]);
        let n10 = LinearAlgebra_1.Vec.dot(grad3[(i + 1 + this.perm[j]) % 12], [x - 1, y, 0]);
        let n11 = LinearAlgebra_1.Vec.dot(grad3[(i + 1 + this.perm[j + 1]) % 12], [x - 1, y - 1, 0]);
        let _fade = (f) => f * f * f * (f * (f * 6 - 15) + 10);
        let tx = _fade(x);
        return Num_1.Num.lerp(Num_1.Num.lerp(n00, n10, tx), Num_1.Num.lerp(n01, n11, tx), _fade(y));
    }
}
exports.Noise = Noise;
/**
 * Delaunay is a Group of Pts that can generate Delaunay and Voronoi tessellations. The triangulation algorithm is ported from [Pt](https://github.com/williamngan/pt)
 * This implementation is based on [Paul Bourke's algorithm](http://paulbourke.net/papers/triangulate/)
 * with reference to its [javascript implementation by ironwallaby](https://github.com/ironwallaby/delaunay)
 */
class Delaunay extends Pt_1.Group {
    constructor() {
        super(...arguments);
        this._mesh = [];
    }
    /**
     * Generate Delaunay triangles. This function also caches the mesh that is used to generate Voronoi tessellation in `voronoi()`.
     * @param triangleOnly if true, returns an array of triangles in Groups, otherwise return the whole DelaunayShape
     * @returns an array of Groups or an array of DelaunayShapes `{i, j, k, triangle, circle}` which records the indices of the vertices, and the calculated triangles and circumcircles
     */
    delaunay(triangleOnly = true) {
        if (this.length < 3)
            return [];
        this._mesh = [];
        let n = this.length;
        // sort the points and store the sorted index
        let indices = [];
        for (let i = 0; i < n; i++)
            indices[i] = i;
        indices.sort((i, j) => this[j][0] - this[i][0]);
        // duplicate the points list and add super triangle's points to it
        let pts = this.slice();
        let st = this._superTriangle();
        pts = pts.concat(st);
        // arrays to store edge buffer and opened triangles
        let opened = [this._circum(n, n + 1, n + 2, st)];
        let closed = [];
        let tris = [];
        // Go through each point using the sorted indices
        for (let i = 0, len = indices.length; i < len; i++) {
            let c = indices[i];
            let edges = [];
            let j = opened.length;
            if (!this._mesh[c])
                this._mesh[c] = {};
            // Go through each opened triangles
            while (j--) {
                let circum = opened[j];
                let radius = circum.circle[1][0];
                let d = pts[c].$subtract(circum.circle[0]);
                // if point is to the right of circumcircle, add it to closed list and don't check again
                if (d[0] > 0 && d[0] * d[0] > radius * radius) {
                    closed.push(circum);
                    tris.push(circum.triangle);
                    opened.splice(j, 1);
                    continue;
                }
                // if it's outside the circumcircle, skip
                if (d[0] * d[0] + d[1] * d[1] - radius * radius > Util_1.Const.epsilon) {
                    continue;
                }
                // otherwise it's inside the circumcircle, so we add to edge buffer and remove it from the opened list
                edges.push(circum.i, circum.j, circum.j, circum.k, circum.k, circum.i);
                opened.splice(j, 1);
            }
            // dedup edges
            Delaunay._dedupe(edges);
            // Go through the edge buffer and create a triangle for each edge
            j = edges.length;
            while (j > 1) {
                opened.push(this._circum(edges[--j], edges[--j], c, false, pts));
            }
        }
        for (let i = 0, len = opened.length; i < len; i++) {
            let o = opened[i];
            if (o.i < n && o.j < n && o.k < n) {
                closed.push(o);
                tris.push(o.triangle);
                this._cache(o);
            }
        }
        return (triangleOnly) ? tris : closed;
    }
    /**
     * Generate Voronoi cells. `delaunay()` must be called before calling this function.
     * @returns an array of Groups, each of which represents a Voronoi cell
     */
    voronoi() {
        let vs = [];
        let n = this._mesh;
        for (let i = 0, len = n.length; i < len; i++) {
            vs.push(this.neighborPts(i, true));
        }
        return vs;
    }
    /**
     * Get the cached mesh. The mesh is an array of objects, each of which representing the enclosing triangles around a Pt in this Delaunay group
     * @return an array of objects that store a series of DelaunayShapes
     */
    mesh() {
        return this._mesh;
    }
    /**
     * Given an index of a Pt in this Delaunay Group, returns its neighboring Pts in the network
     * @param i index of a Pt
     * @param sort if true, sort the neighbors so that their edges will form a polygon
     * @returns an array of Pts
     */
    neighborPts(i, sort = false) {
        let cs = new Pt_1.Group();
        let n = this._mesh;
        for (let k in n[i]) {
            if (n[i].hasOwnProperty(k))
                cs.push(n[i][k].circle[0]);
        }
        return (sort) ? Num_1.Geom.sortEdges(cs) : cs;
    }
    /**
     * Given an index of a Pt in this Delaunay Group, returns its neighboring DelaunayShapes
     * @param i index of a Pt
     * @returns an array of DelaunayShapes `{i, j, k, triangle, circle}`
     */
    neighbors(i) {
        let cs = [];
        let n = this._mesh;
        for (let k in n[i]) {
            if (n[i].hasOwnProperty(k))
                cs.push(n[i][k]);
        }
        return cs;
    }
    /**
     * Record a DelaunayShape in the mesh
     * @param o DelaunayShape instance
     */
    _cache(o) {
        this._mesh[o.i][`${Math.min(o.j, o.k)}-${Math.max(o.j, o.k)}`] = o;
        this._mesh[o.j][`${Math.min(o.i, o.k)}-${Math.max(o.i, o.k)}`] = o;
        this._mesh[o.k][`${Math.min(o.i, o.j)}-${Math.max(o.i, o.j)}`] = o;
    }
    /**
     * Get the initial "super triangle" that contains all the points in this set
     * @returns a Group representing a triangle
     */
    _superTriangle() {
        let minPt = this[0];
        let maxPt = this[0];
        for (let i = 1, len = this.length; i < len; i++) {
            minPt = minPt.$min(this[i]);
            maxPt = maxPt.$max(this[i]);
        }
        let d = maxPt.$subtract(minPt);
        let mid = minPt.$add(maxPt).divide(2);
        let dmax = Math.max(d[0], d[1]);
        return new Pt_1.Group(mid.$subtract(20 * dmax, dmax), mid.$add(0, 20 * dmax), mid.$add(20 * dmax, -dmax));
    }
    /**
     * Get a triangle from 3 points in a list of points
     * @param i index 1
     * @param j index 2
     * @param k index 3
     * @param pts a Group of Pts
     */
    _triangle(i, j, k, pts = this) {
        return new Pt_1.Group(pts[i], pts[j], pts[k]);
    }
    /**
     * Get a circumcircle and triangle from 3 points in a list of points
     * @param i index 1
     * @param j index 2
     * @param k index 3
     * @param tri a Group representing a triangle, or `false` to create it from indices
     * @param pts a Group of Pts
     */
    _circum(i, j, k, tri, pts = this) {
        let t = tri || this._triangle(i, j, k, pts);
        return {
            i: i,
            j: j,
            k: k,
            triangle: t,
            circle: Op_1.Triangle.circumcircle(t)
        };
    }
    /**
     * Dedupe the edges array
     * @param edges
     */
    static _dedupe(edges) {
        let j = edges.length;
        while (j > 1) {
            let b = edges[--j];
            let a = edges[--j];
            let i = j;
            while (i > 1) {
                let n = edges[--i];
                let m = edges[--i];
                if ((a == m && b == n) || (a == n && b == m)) {
                    edges.splice(j, 2);
                    edges.splice(i, 2);
                    break;
                }
            }
        }
        return edges;
    }
}
exports.Delaunay = Delaunay;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Source code licensed under Apache License 2.0. 
// Copyright © 2017 William Ngan. (https://github.com/williamngan/pts)
Object.defineProperty(exports, "__esModule", { value: true });
const Form_1 = __webpack_require__(6);
const Num_1 = __webpack_require__(3);
const Util_1 = __webpack_require__(1);
const Pt_1 = __webpack_require__(0);
const Op_1 = __webpack_require__(2);
const Dom_1 = __webpack_require__(8);
/**
 * A Space for SVG elements
 */
class SVGSpace extends Dom_1.DOMSpace {
    /**
    * Create a SVGSpace which represents a Space for SVG elements
    * @param elem Specify an element by its "id" attribute as string, or by the element object itself. An element can be an existing `<svg>`, or a `<div>` container in which a new `<svg>` will be created. If left empty, a `<div id="pt_container"><svg id="pt" /></div>` will be added to DOM. Use css to customize its appearance if needed.
    * @param callback an optional callback `function(boundingBox, spaceElement)` to be called when canvas is appended and ready. Alternatively, a "ready" event will also be fired from the `<svg>` element when it's appended, which can be traced with `spaceInstance.canvas.addEventListener("ready")`
    * @example `new SVGSpace( "#myElementID" )`
    */
    constructor(elem, callback) {
        super(elem, callback);
        this.id = "svgspace";
        this._bgcolor = "#999";
        if (this._canvas.nodeName.toLowerCase() != "svg") {
            let s = SVGSpace.svgElement(this._canvas, "svg", `${this.id}_svg`);
            this._container = this._canvas;
            this._canvas = s;
        }
    }
    /**
    * Get a new `SVGForm` for drawing
    * @see `SVGForm`
    */
    getForm() { return new SVGForm(this); }
    /**
    * Get the html element
    */
    get element() {
        return this._canvas;
    }
    /**
    * This overrides Space's `resize` function. It's used as a callback function for window's resize event and not usually called directly. You can keep track of resize events with `resize: (bound ,evt)` callback in your player objects (See `Space`'s `add()` function).
    * @param b a Bound object to resize to
    * @param evt Optionally pass a resize event
    */
    resize(b, evt) {
        super.resize(b, evt);
        SVGSpace.setAttr(this.element, {
            "viewBox": `0 0 ${this.bound.width} ${this.bound.height}`,
            "width": `${this.bound.width}`,
            "height": `${this.bound.height}`,
            "xmlns": "http://www.w3.org/2000/svg",
            "version": "1.1"
        });
        return this;
    }
    /**
     * A static function to add a svg element inside a node. Usually you don't need to use this directly. See methods in `SVGForm` instead.
     * @param parent the parent element, or `null` to use current `<svg>` as parent.
     * @param name a string of element name,  such as `rect` or `circle`
     * @param id id attribute of the new element
     */
    static svgElement(parent, name, id) {
        if (!parent || !parent.appendChild)
            throw new Error("parent is not a valid DOM element");
        let elem = document.querySelector(`#${id}`);
        if (!elem) {
            elem = document.createElementNS("http://www.w3.org/2000/svg", name);
            elem.setAttribute("id", id);
            parent.appendChild(elem);
        }
        return elem;
    }
    /**
    * Remove an item from this Space
    * @param item a player item with an auto-assigned `animateID` property
    */
    remove(player) {
        let temp = this._container.querySelectorAll("." + SVGForm.scopeID(player));
        temp.forEach((el) => {
            el.parentNode.removeChild(el);
        });
        return super.remove(player);
    }
    /**
     * Remove all items from this Space
     */
    removeAll() {
        this._container.innerHTML = "";
        return super.removeAll();
    }
}
exports.SVGSpace = SVGSpace;
/**
* SVGForm is an implementation of abstract class VisualForm. It provide methods to express Pts on SVGSpace.
* You may extend SVGForm to implement your own expressions for SVGSpace.
*/
class SVGForm extends Form_1.VisualForm {
    /**
    * Create a new SVGForm. You may also use `space.getForm()` to get the default form.
    * @param space an instance of SVGSpace
    */
    constructor(space) {
        super();
        this._ctx = {
            group: null,
            groupID: "pts",
            groupCount: 0,
            currentID: "pts0",
            currentClass: "",
            style: {
                "filled": true,
                "stroked": true,
                "fill": "#f03",
                "stroke": "#fff",
                "stroke-width": 1,
                "stroke-linejoin": "bevel",
                "stroke-linecap": "sqaure"
            },
            font: "11px sans-serif",
            fontSize: 11,
            fontFamily: "sans-serif"
        };
        this._ready = false;
        this._space = space;
        this._space.add({ start: () => {
                this._ctx.group = this._space.element;
                this._ctx.groupID = "pts_svg_" + (SVGForm.groupID++);
                this._ready = true;
            } });
    }
    /**
    * get the SVGSpace instance that this form is associated with
    */
    get space() { return this._space; }
    /**
     * Update a style in _ctx context or throw an Erorr if the style doesn't exist
     * @param k style key
     * @param v  style value
     */
    styleTo(k, v) {
        if (this._ctx.style[k] === undefined)
            throw new Error(`${k} style property doesn't exist`);
        this._ctx.style[k] = v;
    }
    /**
      * Set current fill style. Provide a valid color string or `false` to specify no fill color.
      * @example `form.fill("#F90")`, `form.fill("rgba(0,0,0,.5")`, `form.fill(false)`
      * @param c fill color
      */
    fill(c) {
        if (typeof c == "boolean") {
            this.styleTo("filled", c);
        }
        else {
            this.styleTo("filled", true);
            this.styleTo("fill", c);
        }
        return this;
    }
    /**
      * Set current stroke style. Provide a valid color string or `false` to specify no stroke color.
      * @example `form.stroke("#F90")`, `form.stroke("rgba(0,0,0,.5")`, `form.stroke(false)`, `form.stroke("#000", 0.5, 'round', 'square')`
      * @param c stroke color which can be as color, gradient, or pattern. (See [canvas documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeStyle))
      * @param width Optional value (can be floating point) to set line width
      * @param linejoin Optional string to set line joint style. Can be "miter", "bevel", or "round".
      * @param linecap Optional string to set line cap style. Can be "butt", "round", or "square".
      */
    stroke(c, width, linejoin, linecap) {
        if (typeof c == "boolean") {
            this.styleTo("stroked", c);
        }
        else {
            this.styleTo("stroked", true);
            this.styleTo("stroke", c);
            if (width)
                this.styleTo("stroke-width", width);
            if (linejoin)
                this.styleTo("stroke-linejoin", linejoin);
            if (linecap)
                this.styleTo("stroke-linecap", linecap);
        }
        return this;
    }
    /**
     * Add custom class to the created element
     * @param c custom class name or `false` to reset it
     * @example `form.fill("#f00").cls("myClass").rects(r)` `form.cls(false).circles(c)`
     */
    cls(c) {
        if (typeof c == "boolean") {
            this._ctx.currentClass = "";
        }
        else {
            this._ctx.currentClass = c;
        }
        return this;
    }
    /**
    * Set the current font
    * @param sizeOrFont either a number to specify font-size, or a `Font` object to specify all font properties
    * @param weight Optional font-weight string such as "bold"
    * @param style Optional font-style string such as "italic"
    * @param lineHeight Optional line-height number suchas 1.5
    * @param family Optional font-family such as "Helvetica, sans-serif"
    * @example `form.font( myFont )`, `form.font(14, "bold")`
    */
    font(sizeOrFont, weight, style, lineHeight, family) {
        if (typeof sizeOrFont == "number") {
            this._font.size = sizeOrFont;
            if (family)
                this._font.face = family;
            if (weight)
                this._font.weight = weight;
            if (style)
                this._font.style = style;
            if (lineHeight)
                this._font.lineHeight = lineHeight;
            this._ctx.font = this._font.value;
        }
        else {
            this._font = sizeOrFont;
        }
        return this;
    }
    /**
    * Reset the context's common styles to this form's styles. This supports using multiple forms on the same canvas context.
    */
    reset() {
        this._ctx.style = {
            "filled": true, "stroked": true,
            "fill": "#f03", "stroke": "#fff",
            "stroke-width": 1,
            "stroke-linejoin": "bevel",
            "stroke-linecap": "sqaure"
        };
        this._font = new Form_1.Font(14, "sans-serif");
        this._ctx.font = this._font.value;
        return this;
    }
    /**
     * Set this form's group scope by an ID, and optionally define the group's parent element. A group scope keeps track of elements by their generated IDs, and updates their properties as needed. See also `scope()`.
     * @param group_id a string to use as prefix for the group's id. For example, group_id "hello" will create elements with id like "hello-1", "hello-2", etc
     * @param group Optional DOM or SVG element to define this group's parent element
     * @returns this form's context
     */
    updateScope(group_id, group) {
        this._ctx.group = group;
        this._ctx.groupID = group_id;
        this._ctx.groupCount = 0;
        this.nextID();
        return this._ctx;
    }
    /**
     * Set the current group scope to an item added into space, in order to keep track of any point, circle, etc created within it. The item must have an `animateID` property, so that elements created within the item will have generated IDs like "item-{animateID}-{count}".
     * @param item a "player" item that's added to space (see `space.add(...)`) and has an `animateID` property
     * @returns this form's context
     */
    scope(item) {
        if (!item || item.animateID == null)
            throw new Error("item not defined or not yet added to Space");
        return this.updateScope(SVGForm.scopeID(item), this.space.element);
    }
    /**
     * Get next available id in the current group
     * @returns an id string
     */
    nextID() {
        this._ctx.groupCount++;
        this._ctx.currentID = `${this._ctx.groupID}-${this._ctx.groupCount}`;
        return this._ctx.currentID;
    }
    /**
     * A static function to generate an ID string based on a context object
     * @param ctx a context object for an SVGForm
     */
    static getID(ctx) {
        return ctx.currentID || `p-${SVGForm.domID++}`;
    }
    /**
     * A static function to generate an ID string for a scope, based on a "player" item in the Space
     * @param item a "player" item that's added to space (see `space.add(...)`) and has an `animateID` property
     */
    static scopeID(item) {
        return `item-${item.animateID}`;
    }
    /**
     * A static function to help adding style object to an element. This put all styles into `style` attribute instead of individual attributes, so that the styles can be parsed by Adobe Illustrator.
     * @param elem A DOM element to add to
     * @param styles an object of style properties
     * @example `SVGForm.style(elem, {fill: "#f90", stroke: false})`
     * @returns this DOM element
     */
    static style(elem, styles) {
        let st = [];
        if (!styles["filled"])
            st.push("fill: none");
        if (!styles["stroked"])
            st.push("stroke: none");
        for (let k in styles) {
            if (styles.hasOwnProperty(k) && k != "filled" && k != "stroked") {
                let v = styles[k];
                if (v) {
                    if (!styles["filled"] && k.indexOf('fill') === 0) {
                        continue;
                    }
                    else if (!styles["stroked"] && k.indexOf('stroke') === 0) {
                        continue;
                    }
                    else {
                        st.push(`${k}: ${v}`);
                    }
                }
            }
        }
        return Dom_1.DOMSpace.setAttr(elem, { style: st.join(";") });
    }
    /**
      * Draws a point
      * @param ctx a context object of SVGForm
      * @param pt a Pt object or numeric array
      * @param radius radius of the point. Default is 5.
      * @param shape The shape of the point. Defaults to "square", but it can be "circle" or a custom shape function in your own implementation.
      * @example `SVGForm.point( p )`, `SVGForm.point( p, 10, "circle" )`
      */
    static point(ctx, pt, radius = 5, shape = "square") {
        if (shape === "circle") {
            return SVGForm.circle(ctx, pt, radius);
        }
        else {
            return SVGForm.square(ctx, pt, radius);
        }
    }
    /**
      * Draws a point
      * @param p a Pt object
      * @param radius radius of the point. Default is 5.
      * @param shape The shape of the point. Defaults to "square", but it can be "circle" or a custom shape function in your own implementation.
      * @example `form.point( p )`, `form.point( p, 10, "circle" )`
      */
    point(pt, radius = 5, shape = "square") {
        this.nextID();
        SVGForm.point(this._ctx, pt, radius, shape);
        return this;
    }
    /**
      * A static function to draw a circle
      * @param ctx a context object of SVGForm
      * @param pt center position of the circle
      * @param radius radius of the circle
      */
    static circle(ctx, pt, radius = 10) {
        let elem = SVGSpace.svgElement(ctx.group, "circle", SVGForm.getID(ctx));
        Dom_1.DOMSpace.setAttr(elem, {
            cx: pt[0],
            cy: pt[1],
            r: radius,
            'class': `pts-svgform pts-circle ${ctx.currentClass}`,
        });
        SVGForm.style(elem, ctx.style);
        return elem;
    }
    /**
      * Draw a circle
      * @param pts usually a Group of 2 Pts, but it can also take an array of two numeric arrays [ [position], [size] ]
      * @see [`Circle.fromCenter`](./_op_.circle.html#frompt)
      */
    circle(pts) {
        this.nextID();
        SVGForm.circle(this._ctx, pts[0], pts[1][0]);
        return this;
    }
    /**
      * A static function to draw an arc.
      * @param ctx a context object of SVGForm
      * @param pt center position
      * @param radius radius of the arc circle
      * @param startAngle start angle of the arc
      * @param endAngle end angle of the arc
      * @param cc an optional boolean value to specify if it should be drawn clockwise (`false`) or counter-clockwise (`true`). Default is clockwise.
      */
    static arc(ctx, pt, radius, startAngle, endAngle, cc) {
        let elem = SVGSpace.svgElement(ctx.group, "path", SVGForm.getID(ctx));
        const start = new Pt_1.Pt(pt).toAngle(startAngle, radius, true);
        const end = new Pt_1.Pt(pt).toAngle(endAngle, radius, true);
        const diff = Num_1.Geom.boundAngle(endAngle) - Num_1.Geom.boundAngle(startAngle);
        let largeArc = (diff > Util_1.Const.pi) ? true : false;
        if (cc)
            largeArc = !largeArc;
        const sweep = (cc) ? "0" : "1";
        const d = `M ${start[0]} ${start[1]} A ${radius} ${radius} 0 ${largeArc ? "1" : "0"} ${sweep} ${end[0]} ${end[1]}`;
        Dom_1.DOMSpace.setAttr(elem, {
            d: d,
            'class': `pts-svgform pts-arc ${ctx.currentClass}`,
        });
        SVGForm.style(elem, ctx.style);
        return elem;
    }
    /**
      * Draw an arc.
      * @param pt center position
      * @param radius radius of the arc circle
      * @param startAngle start angle of the arc
      * @param endAngle end angle of the arc
      * @param cc an optional boolean value to specify if it should be drawn clockwise (`false`) or counter-clockwise (`true`). Default is clockwise.
      */
    arc(pt, radius, startAngle, endAngle, cc) {
        this.nextID();
        SVGForm.arc(this._ctx, pt, radius, startAngle, endAngle, cc);
        return this;
    }
    /**
      * A static function to draw a square
      * @param ctx a context object of SVGForm
      * @param pt center position of the square
      * @param halfsize half size of the square
      */
    static square(ctx, pt, halfsize) {
        let elem = SVGSpace.svgElement(ctx.group, "rect", SVGForm.getID(ctx));
        Dom_1.DOMSpace.setAttr(elem, {
            x: pt[0] - halfsize,
            y: pt[1] - halfsize,
            width: halfsize * 2,
            height: halfsize * 2,
            'class': `pts-svgform pts-square ${ctx.currentClass}`,
        });
        SVGForm.style(elem, ctx.style);
        return elem;
    }
    /**
     * Draw a square, given a center and its half-size
     * @param pt center Pt
     * @param halfsize half-size
     */
    square(pt, halfsize) {
        this.nextID();
        SVGForm.square(this._ctx, pt, halfsize);
        return this;
    }
    /**
    * A static function to draw a line
    * @param ctx a context object of SVGForm
    * @param pts a Group of multiple Pts, or an array of multiple numeric arrays
    */
    static line(ctx, pts) {
        if (!this._checkSize(pts))
            return;
        if (pts.length > 2)
            return SVGForm._poly(ctx, pts, false);
        let elem = SVGSpace.svgElement(ctx.group, "line", SVGForm.getID(ctx));
        Dom_1.DOMSpace.setAttr(elem, {
            x1: pts[0][0],
            y1: pts[0][1],
            x2: pts[1][0],
            y2: pts[1][1],
            'class': `pts-svgform pts-line ${ctx.currentClass}`,
        });
        SVGForm.style(elem, ctx.style);
        return elem;
    }
    /**
    * Draw a line or polyline
    * @param pts a Group of multiple Pts, or an array of multiple numeric arrays
    */
    line(pts) {
        this.nextID();
        SVGForm.line(this._ctx, pts);
        return this;
    }
    /**
     * A static helper function to draw polyline or polygon
     * @param ctx a context object of SVGForm
     * @param pts a Group of multiple Pts, or an array of multiple numeric arrays
     * @param closePath a boolean to specify if the polygon path should be closed
     */
    static _poly(ctx, pts, closePath = true) {
        if (!this._checkSize(pts))
            return;
        let elem = SVGSpace.svgElement(ctx.group, ((closePath) ? "polygon" : "polyline"), SVGForm.getID(ctx));
        let points = pts.reduce((a, p) => a + `${p[0]},${p[1]} `, "");
        Dom_1.DOMSpace.setAttr(elem, {
            points: points,
            'class': `pts-svgform pts-polygon ${ctx.currentClass}`,
        });
        SVGForm.style(elem, ctx.style);
        return elem;
    }
    /**
      * A static function to draw polygon
      * @param ctx a context object of SVGForm
      * @param pts a Group of multiple Pts, or an array of multiple numeric arrays
      */
    static polygon(ctx, pts) {
        return SVGForm._poly(ctx, pts, true);
    }
    /**
    * Draw a polygon
    * @param pts a Group of multiple Pts, or an array of multiple numeric arrays
    */
    polygon(pts) {
        this.nextID();
        SVGForm.polygon(this._ctx, pts);
        return this;
    }
    /**
    * A static function to draw a rectangle
    * @param ctx a context object of SVGForm
    * @param pts usually a Group of 2 Pts specifying the top-left and bottom-right positions. Alternatively it can be an array of numeric arrays.
    */
    static rect(ctx, pts) {
        if (!this._checkSize(pts))
            return;
        let elem = SVGSpace.svgElement(ctx.group, "rect", SVGForm.getID(ctx));
        let bound = Pt_1.Group.fromArray(pts).boundingBox();
        let size = Op_1.Rectangle.size(bound);
        Dom_1.DOMSpace.setAttr(elem, {
            x: bound[0][0],
            y: bound[0][1],
            width: size[0],
            height: size[1],
            'class': `pts-svgform pts-rect ${ctx.currentClass}`,
        });
        SVGForm.style(elem, ctx.style);
        return elem;
    }
    /**
      * Draw a rectangle
      * @param pts usually a Group of 2 Pts specifying the top-left and bottom-right positions. Alternatively it can be an array of numeric arrays.
      */
    rect(pts) {
        this.nextID();
        SVGForm.rect(this._ctx, pts);
        return this;
    }
    /**
      * A static function to draw text
      * @param ctx a context object of SVGForm
      * @param `pt` a Point object to specify the anchor point
      * @param `txt` a string of text to draw
      * @param `maxWidth` specify a maximum width per line
      */
    static text(ctx, pt, txt) {
        let elem = SVGSpace.svgElement(ctx.group, "text", SVGForm.getID(ctx));
        Dom_1.DOMSpace.setAttr(elem, {
            "pointer-events": "none",
            x: pt[0],
            y: pt[1],
            dx: 0, dy: 0,
            'class': `pts-svgform pts-text ${ctx.currentClass}`,
        });
        elem.textContent = txt;
        SVGForm.style(elem, ctx.style);
        return elem;
    }
    /**
      * Draw text on canvas
      * @param `pt` a Pt or numeric array to specify the anchor point
      * @param `txt` text
      * @param `maxWidth` specify a maximum width per line
      */
    text(pt, txt) {
        this.nextID();
        SVGForm.text(this._ctx, pt, txt);
        return this;
    }
    /**
      * A convenient way to draw some text on canvas for logging or debugging. It'll be draw on the top-left of the canvas as an overlay.
      * @param txt text
      */
    log(txt) {
        this.fill("#000").stroke("#fff", 0.5).text([10, 14], txt);
        return this;
    }
}
SVGForm.groupID = 0;
SVGForm.domID = 0;
exports.SVGForm = SVGForm;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Source code licensed under Apache License 2.0.
// Copyright © 2017 William Ngan. (https://github.com/williamngan/pts)
Object.defineProperty(exports, "__esModule", { value: true });
const Op_1 = __webpack_require__(2);
/**
 * An enumeration of different UI types
 */
var UIShape;
(function (UIShape) {
    UIShape[UIShape["Rectangle"] = 0] = "Rectangle";
    UIShape[UIShape["Circle"] = 1] = "Circle";
    UIShape[UIShape["Polygon"] = 2] = "Polygon";
    UIShape[UIShape["Polyline"] = 3] = "Polyline";
    UIShape[UIShape["Line"] = 4] = "Line";
})(UIShape = exports.UIShape || (exports.UIShape = {}));
exports.UIPointerActions = {
    up: "up", down: "down", move: "move", drag: "drag", drop: "drop", over: "over", out: "out"
};
class UI {
    /**
     * Wrap an UI insider a group
     */
    constructor(group, shape, states, id) {
        this.group = group;
        this.shape = shape;
        this._id = id;
        this._states = states;
        this._actions = {};
    }
    /**
     * Get and set uique id
     */
    get id() { return this._id; }
    set id(d) { this._id = d; }
    /**
     * Get a state
     * @param key state's name
     */
    state(key) {
        return this._states[key] || false;
    }
    /**
     * Add an event handler
     * @param key event key
     * @param fn handler function
     */
    on(key, fn) {
        this._actions[key] = fn;
        return this;
    }
    /**
     * Remove an event handler
     * @param key even key
     * @param fn
     */
    off(key) {
        delete this._actions[key];
        return this;
    }
    /**
     * Listen for interactions and trigger action handlers
     * @param key action key
     * @param p point to check
     */
    listen(key, p) {
        if (this._actions[key] !== undefined) {
            if (this._trigger(p)) {
                this._actions[key](p, this, key);
                return true;
            }
        }
        return false;
    }
    /**
     * Take a custom render function to render this UI
     * @param fn render function
     */
    render(fn) {
        fn(this.group, this._states);
    }
    /**
     * Check intersection using a specific function based on UIShape
     * @param p a point to check
     */
    _trigger(p) {
        let fn = null;
        if (this.shape === UIShape.Rectangle) {
            fn = Op_1.Rectangle.withinBound;
        }
        else if (this.shape === UIShape.Circle) {
            fn = Op_1.Circle.withinBound;
        }
        else if (this.shape === UIShape.Polygon) {
            fn = Op_1.Rectangle.withinBound;
        }
        else {
            return false;
        }
        return fn(this.group, p);
    }
}
exports.UI = UI;
/**
 * A simple UI button that can track clicks and hovers
 */
class UIButton extends UI {
    constructor(group, shape, states, id) {
        super(group, shape, states, id);
        this._clicks = 0;
    }
    /**
     * Get the total number of clicks on this UIButton
     */
    get clicks() { return this._clicks; }
    /**
     * Add a click handler
     * @param fn a function to handle clicks
     */
    onClick(fn) {
        this._clicks++;
        this.on(exports.UIPointerActions.up, fn);
    }
    /**
     * Add hover handler
     * @param over a function to handle when pointer enters hover
     * @param out a function to handle when pointer exits hover
     */
    onHover(over, out) {
        this.on(exports.UIPointerActions.over, over);
        this.on(exports.UIPointerActions.out, out);
    }
}
exports.UIButton = UIButton;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const _Bound = __webpack_require__(5);
const _Canvas = __webpack_require__(10);
const _Create = __webpack_require__(12);
const _Form = __webpack_require__(6);
const _LinearAlgebra = __webpack_require__(4);
const _Num = __webpack_require__(3);
const _Op = __webpack_require__(2);
const _Pt = __webpack_require__(0);
const _Space = __webpack_require__(7);
const _Color = __webpack_require__(11);
const _Util = __webpack_require__(1);
const _Dom = __webpack_require__(8);
const _Svg = __webpack_require__(13);
const _Typography = __webpack_require__(9);
// A function to switch scope for Pts library. eg, Pts.scope( Pts, window );
let namespace = (sc) => {
    let lib = module.exports;
    for (let k in lib) {
        if (k != "namespace") {
            sc[k] = lib[k];
        }
    }
};
module.exports = Object.assign({ namespace }, _Bound, _Canvas, _Create, _Form, _LinearAlgebra, _Op, _Num, _Pt, _Space, _Util, _Color, _Dom, _Svg, _Typography);


/***/ })
/******/ ]);
});
//# sourceMappingURL=pts.js.map