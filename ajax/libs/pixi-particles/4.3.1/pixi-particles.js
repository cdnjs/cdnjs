/*!
 * pixi-particles - v4.3.1
 * Compiled Wed, 09 Jun 2021 13:12:54 UTC
 *
 * pixi-particles is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
this.PIXI = this.PIXI || {};
(function (exports, pixi) {
    'use strict';

    /**
     * A single node in a PropertyList.
     */
    var PropertyNode = /** @class */ (function () {
        /**
         * @param value The value for this node
         * @param time The time for this node, between 0-1
         * @param [ease] Custom ease for this list. Only relevant for the first node.
         */
        function PropertyNode(value, time, ease) {
            this.value = value;
            this.time = time;
            this.next = null;
            this.isStepped = false;
            if (ease) {
                this.ease = typeof ease === 'function' ? ease : exports.ParticleUtils.generateEase(ease);
            }
            else {
                this.ease = null;
            }
        }
        /**
         * Creates a list of property values from a data object {list, isStepped} with a list of objects in
         * the form {value, time}. Alternatively, the data object can be in the deprecated form of
         * {start, end}.
         * @param data The data for the list.
         * @param data.list The array of value and time objects.
         * @param data.isStepped If the list is stepped rather than interpolated.
         * @param data.ease Custom ease for this list.
         * @return The first node in the list
         */
        // eslint-disable-next-line max-len
        PropertyNode.createList = function (data) {
            if ('list' in data) {
                var array = data.list;
                var node = void 0;
                var _a = array[0], value = _a.value, time = _a.time;
                // eslint-disable-next-line max-len
                var first = node = new PropertyNode(typeof value === 'string' ? exports.ParticleUtils.hexToRGB(value) : value, time, data.ease);
                // only set up subsequent nodes if there are a bunch or the 2nd one is different from the first
                if (array.length > 2 || (array.length === 2 && array[1].value !== value)) {
                    for (var i = 1; i < array.length; ++i) {
                        var _b = array[i], value_1 = _b.value, time_1 = _b.time;
                        node.next = new PropertyNode(typeof value_1 === 'string' ? exports.ParticleUtils.hexToRGB(value_1) : value_1, time_1);
                        node = node.next;
                    }
                }
                first.isStepped = !!data.isStepped;
                return first;
            }
            // Handle deprecated version here
            var start = new PropertyNode(typeof data.start === 'string' ? exports.ParticleUtils.hexToRGB(data.start) : data.start, 0);
            // only set up a next value if it is different from the starting value
            if (data.end !== data.start) {
                start.next = new PropertyNode(typeof data.end === 'string' ? exports.ParticleUtils.hexToRGB(data.end) : data.end, 1);
            }
            return start;
        };
        return PropertyNode;
    }());

    // get Texture.from()/Texture.fromImage(), in V4 and V5 friendly methods
    /**
     * @hidden
     */
    var TextureFromString;
    // to avoid Rollup transforming our import, save pixi namespace in a variable
    var pixiNS = pixi;
    if (parseInt((/^(\d+)\./).exec(pixi.VERSION)[1], 10) < 5) {
        TextureFromString = pixiNS.Texture.fromImage;
    }
    else {
        TextureFromString = pixiNS.Texture.from;
    }
    function GetTextureFromString(s) {
        return TextureFromString(s);
    }
    (function (ParticleUtils) {
        /**
         * If errors and warnings should be logged within the library.
         */
        ParticleUtils.verbose = false;
        ParticleUtils.DEG_TO_RADS = Math.PI / 180;
        /**
         * Rotates a point by a given angle.
         * @param angle The angle to rotate by in degrees
         * @param p The point to rotate around 0,0.
         */
        function rotatePoint(angle, p) {
            if (!angle)
                return;
            angle *= ParticleUtils.DEG_TO_RADS;
            var s = Math.sin(angle);
            var c = Math.cos(angle);
            var xnew = (p.x * c) - (p.y * s);
            var ynew = (p.x * s) + (p.y * c);
            p.x = xnew;
            p.y = ynew;
        }
        ParticleUtils.rotatePoint = rotatePoint;
        /**
         * Combines separate color components (0-255) into a single uint color.
         * @param r The red value of the color
         * @param g The green value of the color
         * @param b The blue value of the color
         * @return The color in the form of 0xRRGGBB
         */
        function combineRGBComponents(r, g, b /* , a*/) {
            return /* a << 24 |*/ (r << 16) | (g << 8) | b;
        }
        ParticleUtils.combineRGBComponents = combineRGBComponents;
        /**
         * Reduces the point to a length of 1.
         * @param point The point to normalize
         */
        function normalize(point) {
            var oneOverLen = 1 / ParticleUtils.length(point);
            point.x *= oneOverLen;
            point.y *= oneOverLen;
        }
        ParticleUtils.normalize = normalize;
        /**
         * Multiplies the x and y values of this point by a value.
         * @param point The point to scaleBy
         * @param value The value to scale by.
         */
        function scaleBy(point, value) {
            point.x *= value;
            point.y *= value;
        }
        ParticleUtils.scaleBy = scaleBy;
        /**
         * Returns the length (or magnitude) of this point.
         * @param point The point to measure length
         * @return The length of this point.
         */
        function length(point) {
            return Math.sqrt((point.x * point.x) + (point.y * point.y));
        }
        ParticleUtils.length = length;
        /**
         * Converts a hex string from "#AARRGGBB", "#RRGGBB", "0xAARRGGBB", "0xRRGGBB",
         * "AARRGGBB", or "RRGGBB" to an object of ints of 0-255, as
         * {r, g, b, (a)}.
         * @param color The input color string.
         * @param output An object to put the output in. If omitted, a new object is created.
         * @return The object with r, g, and b properties, possibly with an a property.
         */
        function hexToRGB(color, output) {
            if (!output) {
                output = {};
            }
            if (color.charAt(0) === '#') {
                color = color.substr(1);
            }
            else if (color.indexOf('0x') === 0) {
                color = color.substr(2);
            }
            var alpha;
            if (color.length === 8) {
                alpha = color.substr(0, 2);
                color = color.substr(2);
            }
            output.r = parseInt(color.substr(0, 2), 16); // Red
            output.g = parseInt(color.substr(2, 2), 16); // Green
            output.b = parseInt(color.substr(4, 2), 16); // Blue
            if (alpha) {
                output.a = parseInt(alpha, 16);
            }
            return output;
        }
        ParticleUtils.hexToRGB = hexToRGB;
        /**
         * Generates a custom ease function, based on the GreenSock custom ease, as demonstrated
         * by the related tool at http://www.greensock.com/customease/.
         * @param segments An array of segments, as created by
         * http://www.greensock.com/customease/.
         * @return A function that calculates the percentage of change at
         *                    a given point in time (0-1 inclusive).
         */
        function generateEase(segments) {
            var qty = segments.length;
            var oneOverQty = 1 / qty;
            /*
             * Calculates the percentage of change at a given point in time (0-1 inclusive).
             * @param {Number} time The time of the ease, 0-1 inclusive.
             * @return {Number} The percentage of the change, 0-1 inclusive (unless your
             *                  ease goes outside those bounds).
             */
            // eslint-disable-next-line func-names
            return function (time) {
                var i = (qty * time) | 0; // do a quick floor operation
                var t = (time - (i * oneOverQty)) * qty;
                var s = segments[i] || segments[qty - 1];
                return (s.s + (t * ((2 * (1 - t) * (s.cp - s.s)) + (t * (s.e - s.s)))));
            };
        }
        ParticleUtils.generateEase = generateEase;
        /**
         * Gets a blend mode, ensuring that it is valid.
         * @param name The name of the blend mode to get.
         * @return The blend mode as specified in the PIXI.BLEND_MODES enumeration.
         */
        function getBlendMode(name) {
            if (!name)
                return pixi.BLEND_MODES.NORMAL;
            name = name.toUpperCase();
            while (name.indexOf(' ') >= 0) {
                name = name.replace(' ', '_');
            }
            return pixi.BLEND_MODES[name] || pixi.BLEND_MODES.NORMAL;
        }
        ParticleUtils.getBlendMode = getBlendMode;
        /**
         * Converts a list of {value, time} objects starting at time 0 and ending at time 1 into an evenly
         * spaced stepped list of PropertyNodes for color values. This is primarily to handle conversion of
         * linear gradients to fewer colors, allowing for some optimization for Canvas2d fallbacks.
         * @param list The list of data to convert.
         * @param [numSteps=10] The number of steps to use.
         * @return The blend mode as specified in the PIXI.blendModes enumeration.
         */
        function createSteppedGradient(list, numSteps) {
            if (numSteps === void 0) { numSteps = 10; }
            if (typeof numSteps !== 'number' || numSteps <= 0) {
                numSteps = 10;
            }
            var first = new PropertyNode(ParticleUtils.hexToRGB(list[0].value), list[0].time);
            first.isStepped = true;
            var currentNode = first;
            var current = list[0];
            var nextIndex = 1;
            var next = list[nextIndex];
            for (var i = 1; i < numSteps; ++i) {
                var lerp = i / numSteps;
                // ensure we are on the right segment, if multiple
                while (lerp > next.time) {
                    current = next;
                    next = list[++nextIndex];
                }
                // convert the lerp value to the segment range
                lerp = (lerp - current.time) / (next.time - current.time);
                var curVal = ParticleUtils.hexToRGB(current.value);
                var nextVal = ParticleUtils.hexToRGB(next.value);
                var output = {
                    r: ((nextVal.r - curVal.r) * lerp) + curVal.r,
                    g: ((nextVal.g - curVal.g) * lerp) + curVal.g,
                    b: ((nextVal.b - curVal.b) * lerp) + curVal.b,
                };
                currentNode.next = new PropertyNode(output, i / numSteps);
                currentNode = currentNode.next;
            }
            // we don't need to have a PropertyNode for time of 1, because in a stepped version at that point
            // the particle has died of old age
            return first;
        }
        ParticleUtils.createSteppedGradient = createSteppedGradient;
    })(exports.ParticleUtils || (exports.ParticleUtils = {}));

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }

    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    function intValueSimple(lerp) {
        if (this.ease) {
            lerp = this.ease(lerp);
        }
        return ((this.next.value - this.current.value) * lerp) + this.current.value;
    }
    function intColorSimple(lerp) {
        if (this.ease) {
            lerp = this.ease(lerp);
        }
        var curVal = this.current.value;
        var nextVal = this.next.value;
        var r = ((nextVal.r - curVal.r) * lerp) + curVal.r;
        var g = ((nextVal.g - curVal.g) * lerp) + curVal.g;
        var b = ((nextVal.b - curVal.b) * lerp) + curVal.b;
        return exports.ParticleUtils.combineRGBComponents(r, g, b);
    }
    function intValueComplex(lerp) {
        if (this.ease) {
            lerp = this.ease(lerp);
        }
        // make sure we are on the right segment
        while (lerp > this.next.time) {
            this.current = this.next;
            this.next = this.next.next;
        }
        // convert the lerp value to the segment range
        lerp = (lerp - this.current.time) / (this.next.time - this.current.time);
        return ((this.next.value - this.current.value) * lerp) + this.current.value;
    }
    function intColorComplex(lerp) {
        if (this.ease) {
            lerp = this.ease(lerp);
        }
        // make sure we are on the right segment
        while (lerp > this.next.time) {
            this.current = this.next;
            this.next = this.next.next;
        }
        // convert the lerp value to the segment range
        lerp = (lerp - this.current.time) / (this.next.time - this.current.time);
        var curVal = this.current.value;
        var nextVal = this.next.value;
        var r = ((nextVal.r - curVal.r) * lerp) + curVal.r;
        var g = ((nextVal.g - curVal.g) * lerp) + curVal.g;
        var b = ((nextVal.b - curVal.b) * lerp) + curVal.b;
        return exports.ParticleUtils.combineRGBComponents(r, g, b);
    }
    function intValueStepped(lerp) {
        if (this.ease) {
            lerp = this.ease(lerp);
        }
        // make sure we are on the right segment
        while (this.next && lerp > this.next.time) {
            this.current = this.next;
            this.next = this.next.next;
        }
        return this.current.value;
    }
    function intColorStepped(lerp) {
        if (this.ease) {
            lerp = this.ease(lerp);
        }
        // make sure we are on the right segment
        while (this.next && lerp > this.next.time) {
            this.current = this.next;
            this.next = this.next.next;
        }
        var curVal = this.current.value;
        return exports.ParticleUtils.combineRGBComponents(curVal.r, curVal.g, curVal.b);
    }
    /**
     * Singly linked list container for keeping track of interpolated properties for particles.
     * Each Particle will have one of these for each interpolated property.
     */
    var PropertyList = /** @class */ (function () {
        /**
         * @param isColor If this list handles color values
         */
        function PropertyList(isColor) {
            if (isColor === void 0) { isColor = false; }
            this.current = null;
            this.next = null;
            this.isColor = !!isColor;
            this.interpolate = null;
            this.ease = null;
        }
        /**
         * Resets the list for use.
         * @param first The first node in the list.
         * @param first.isStepped If the values should be stepped instead of interpolated linearly.
         */
        PropertyList.prototype.reset = function (first) {
            this.current = first;
            this.next = first.next;
            var isSimple = this.next && this.next.time >= 1;
            if (isSimple) {
                this.interpolate = this.isColor ? intColorSimple : intValueSimple;
            }
            else if (first.isStepped) {
                this.interpolate = this.isColor ? intColorStepped : intValueStepped;
            }
            else {
                this.interpolate = this.isColor ? intColorComplex : intValueComplex;
            }
            this.ease = this.current.ease;
        };
        return PropertyList;
    }());

    /**
     * An individual particle image. You shouldn't have to deal with these.
     */
    var Particle = /** @class */ (function (_super) {
        __extends(Particle, _super);
        /**
         * @param {PIXI.particles.Emitter} emitter The emitter that controls this particle.
         */
        function Particle(emitter) {
            var _this = 
            // start off the sprite with a blank texture, since we are going to replace it
            // later when the particle is initialized.
            _super.call(this) || this;
            // initialize LinkedListChild props so they are included in underlying JS class definition
            _this.prevChild = _this.nextChild = null;
            _this.emitter = emitter;
            // particles should be centered
            _this.anchor.x = _this.anchor.y = 0.5;
            _this.velocity = new pixi.Point();
            _this.rotationSpeed = 0;
            _this.rotationAcceleration = 0;
            _this.maxLife = 0;
            _this.age = 0;
            _this.ease = null;
            _this.extraData = null;
            _this.alphaList = new PropertyList();
            _this.speedList = new PropertyList();
            _this.speedMultiplier = 1;
            _this.acceleration = new pixi.Point();
            _this.maxSpeed = NaN;
            _this.scaleList = new PropertyList();
            _this.scaleMultiplier = 1;
            _this.colorList = new PropertyList(true);
            _this._doAlpha = false;
            _this._doScale = false;
            _this._doSpeed = false;
            _this._doAcceleration = false;
            _this._doColor = false;
            _this._doNormalMovement = false;
            _this._oneOverLife = 0;
            _this.next = null;
            _this.prev = null;
            // save often used functions on the instance instead of the prototype for better speed
            _this.init = _this.init;
            _this.Particle_init = Particle.prototype.init;
            _this.update = _this.update;
            _this.Particle_update = Particle.prototype.update;
            _this.Sprite_destroy = _super.prototype.destroy;
            _this.Particle_destroy = Particle.prototype.destroy;
            _this.applyArt = _this.applyArt;
            _this.kill = _this.kill;
            return _this;
        }
        /**
         * Initializes the particle for use, based on the properties that have to
         * have been set already on the particle.
         */
        Particle.prototype.init = function () {
            // reset the age
            this.age = 0;
            // set up the velocity based on the start speed and rotation
            this.velocity.x = this.speedList.current.value * this.speedMultiplier;
            this.velocity.y = 0;
            exports.ParticleUtils.rotatePoint(this.rotation, this.velocity);
            if (this.noRotation) {
                this.rotation = 0;
            }
            else {
                // convert rotation to Radians from Degrees
                this.rotation *= exports.ParticleUtils.DEG_TO_RADS;
            }
            // convert rotation speed to Radians from Degrees
            this.rotationSpeed *= exports.ParticleUtils.DEG_TO_RADS;
            this.rotationAcceleration *= exports.ParticleUtils.DEG_TO_RADS;
            // set alpha to inital alpha
            this.alpha = this.alphaList.current.value;
            // set scale to initial scale
            this.scale.x = this.scale.y = this.scaleList.current.value;
            // figure out what we need to interpolate
            this._doAlpha = !!this.alphaList.current.next;
            this._doSpeed = !!this.speedList.current.next;
            this._doScale = !!this.scaleList.current.next;
            this._doColor = !!this.colorList.current.next;
            this._doAcceleration = this.acceleration.x !== 0 || this.acceleration.y !== 0;
            // _doNormalMovement can be cancelled by subclasses
            this._doNormalMovement = this._doSpeed || this.speedList.current.value !== 0 || this._doAcceleration;
            // save our lerp helper
            this._oneOverLife = 1 / this.maxLife;
            // set the inital color
            var color = this.colorList.current.value;
            this.tint = exports.ParticleUtils.combineRGBComponents(color.r, color.g, color.b);
            // ensure visibility
            this.visible = true;
        };
        /**
         * Sets the texture for the particle. This can be overridden to allow
         * for an animated particle.
         * @param art The texture to set.
         */
        Particle.prototype.applyArt = function (art) {
            this.texture = art || pixi.Texture.EMPTY;
        };
        /**
         * Updates the particle.
         * @param delta Time elapsed since the previous frame, in __seconds__.
         * @return The standard interpolation multiplier (0-1) used for all
         *         relevant particle properties. A value of -1 means the particle
         *         died of old age instead.
         */
        Particle.prototype.update = function (delta) {
            // increase age
            this.age += delta;
            // recycle particle if it is too old
            if (this.age >= this.maxLife || this.age < 0) {
                this.kill();
                return -1;
            }
            // determine our interpolation value
            var lerp = this.age * this._oneOverLife; // lifetime / maxLife;
            if (this.ease) {
                if (this.ease.length === 4) {
                    // the t, b, c, d parameters that some tween libraries use
                    // (time, initial value, end value, duration)
                    lerp = this.ease(lerp, 0, 1, 1);
                }
                else {
                    // the simplified version that we like that takes
                    // one parameter, time from 0-1. TweenJS eases provide this usage.
                    lerp = this.ease(lerp);
                }
            }
            // interpolate alpha
            if (this._doAlpha) {
                this.alpha = this.alphaList.interpolate(lerp);
            }
            // interpolate scale
            if (this._doScale) {
                var scale = this.scaleList.interpolate(lerp) * this.scaleMultiplier;
                this.scale.x = this.scale.y = scale;
            }
            // handle movement
            if (this._doNormalMovement) {
                var deltaX = void 0;
                var deltaY = void 0;
                // interpolate speed
                if (this._doSpeed) {
                    var speed = this.speedList.interpolate(lerp) * this.speedMultiplier;
                    exports.ParticleUtils.normalize(this.velocity);
                    exports.ParticleUtils.scaleBy(this.velocity, speed);
                    deltaX = this.velocity.x * delta;
                    deltaY = this.velocity.y * delta;
                }
                else if (this._doAcceleration) {
                    var oldVX = this.velocity.x;
                    var oldVY = this.velocity.y;
                    this.velocity.x += this.acceleration.x * delta;
                    this.velocity.y += this.acceleration.y * delta;
                    if (this.maxSpeed) {
                        var currentSpeed = exports.ParticleUtils.length(this.velocity);
                        // if we are going faster than we should, clamp at the max speed
                        // DO NOT recalculate vector length
                        if (currentSpeed > this.maxSpeed) {
                            exports.ParticleUtils.scaleBy(this.velocity, this.maxSpeed / currentSpeed);
                        }
                    }
                    // calculate position delta by the midpoint between our old velocity and our new velocity
                    deltaX = (oldVX + this.velocity.x) / 2 * delta;
                    deltaY = (oldVY + this.velocity.y) / 2 * delta;
                }
                else {
                    deltaX = this.velocity.x * delta;
                    deltaY = this.velocity.y * delta;
                }
                // adjust position based on velocity
                this.position.x += deltaX;
                this.position.y += deltaY;
            }
            // interpolate color
            if (this._doColor) {
                this.tint = this.colorList.interpolate(lerp);
            }
            // update rotation
            if (this.rotationAcceleration !== 0) {
                var newRotationSpeed = this.rotationSpeed + (this.rotationAcceleration * delta);
                this.rotation += (this.rotationSpeed + newRotationSpeed) / 2 * delta;
                this.rotationSpeed = newRotationSpeed;
            }
            else if (this.rotationSpeed !== 0) {
                this.rotation += this.rotationSpeed * delta;
            }
            else if (this.acceleration && !this.noRotation) {
                this.rotation = Math.atan2(this.velocity.y, this.velocity.x); // + Math.PI / 2;
            }
            return lerp;
        };
        /**
         * Kills the particle, removing it from the display list
         * and telling the emitter to recycle it.
         */
        Particle.prototype.kill = function () {
            this.emitter.recycle(this);
        };
        /**
         * Destroys the particle, removing references and preventing future use.
         */
        Particle.prototype.destroy = function () {
            if (this.parent) {
                this.parent.removeChild(this);
            }
            this.Sprite_destroy();
            this.emitter = this.velocity = this.colorList = this.scaleList = this.alphaList
                = this.speedList = this.ease = this.next = this.prev = null;
        };
        /**
         * Checks over the art that was passed to the Emitter's init() function, to do any special
         * modifications to prepare it ahead of time.
         * @param art The array of art data. For Particle, it should be an array of
         *            Textures. Any strings in the array will be converted to
         *            Textures via Texture.from().
         * @return The art, after any needed modifications.
         */
        Particle.parseArt = function (art) {
            // convert any strings to Textures.
            var i;
            for (i = art.length; i >= 0; --i) {
                if (typeof art[i] === 'string') {
                    art[i] = GetTextureFromString(art[i]);
                }
            }
            // particles from different base textures will be slower in WebGL than if they
            // were from one spritesheet
            if (exports.ParticleUtils.verbose) {
                for (i = art.length - 1; i > 0; --i) {
                    if (art[i].baseTexture !== art[i - 1].baseTexture) {
                        if (window.console) {
                            // eslint-disable-next-line max-len
                            console.warn('PixiParticles: using particle textures from different images may hinder performance in WebGL');
                        }
                        break;
                    }
                }
            }
            return art;
        };
        /**
         * Parses extra emitter data to ensure it is set up for this particle class.
         * Particle does nothing to the extra data.
         * @param extraData The extra data from the particle config.
         * @return The parsed extra data.
         */
        Particle.parseData = function (extraData) {
            return extraData;
        };
        return Particle;
    }(pixi.Sprite));

    /**
     * Chain of line segments for generating spawn positions.
     */
    var PolygonalChain = /** @class */ (function () {
        /**
         * @param data Point data for polygon chains. Either a list of points for a single chain, or a list of chains.
         */
        function PolygonalChain(data) {
            this.segments = [];
            this.countingLengths = [];
            this.totalLength = 0;
            this.init(data);
        }
        /**
         * @param data Point data for polygon chains. Either a list of points for a single chain, or a list of chains.
         */
        PolygonalChain.prototype.init = function (data) {
            // if data is not present, set up a segment of length 0
            if (!data || !data.length) {
                this.segments.push({ p1: { x: 0, y: 0 }, p2: { x: 0, y: 0 }, l: 0 });
            }
            else if (Array.isArray(data[0])) {
                // list of segment chains, each defined as a list of points
                for (var i = 0; i < data.length; ++i) {
                    // loop through the chain, connecting points
                    var chain = data[i];
                    var prevPoint = chain[0];
                    for (var j = 1; j < chain.length; ++j) {
                        var second = chain[j];
                        this.segments.push({ p1: prevPoint, p2: second, l: 0 });
                        prevPoint = second;
                    }
                }
            }
            else {
                var prevPoint = data[0];
                // list of points
                for (var i = 1; i < data.length; ++i) {
                    var second = data[i];
                    this.segments.push({ p1: prevPoint, p2: second, l: 0 });
                    prevPoint = second;
                }
            }
            // now go through our segments to calculate the lengths so that we
            // can set up a nice weighted random distribution
            for (var i = 0; i < this.segments.length; ++i) {
                var _a = this.segments[i], p1 = _a.p1, p2 = _a.p2;
                var segLength = Math.sqrt(((p2.x - p1.x) * (p2.x - p1.x)) + ((p2.y - p1.y) * (p2.y - p1.y)));
                // save length so we can turn a random number into a 0-1 interpolation value later
                this.segments[i].l = segLength;
                this.totalLength += segLength;
                // keep track of the length so far, counting up
                this.countingLengths.push(this.totalLength);
            }
        };
        /**
         * Gets a random point in the chain.
         * @param out The point to store the selected position in.
         */
        PolygonalChain.prototype.getRandomPoint = function (out) {
            // select a random spot in the length of the chain
            var rand = Math.random() * this.totalLength;
            var chosenSeg;
            var lerp;
            // if only one segment, it wins
            if (this.segments.length === 1) {
                chosenSeg = this.segments[0];
                lerp = rand;
            }
            else {
                // otherwise, go through countingLengths until we have determined
                // which segment we chose
                for (var i = 0; i < this.countingLengths.length; ++i) {
                    if (rand < this.countingLengths[i]) {
                        chosenSeg = this.segments[i];
                        // set lerp equal to the length into that segment
                        // (i.e. the remainder after subtracting all the segments before it)
                        lerp = i === 0 ? rand : rand - this.countingLengths[i - 1];
                        break;
                    }
                }
            }
            // divide lerp by the segment length, to result in a 0-1 number.
            lerp /= chosenSeg.l || 1;
            var p1 = chosenSeg.p1, p2 = chosenSeg.p2;
            // now calculate the position in the segment that the lerp value represents
            out.x = p1.x + (lerp * (p2.x - p1.x));
            out.y = p1.y + (lerp * (p2.y - p1.y));
        };
        return PolygonalChain;
    }());

    // get the shared ticker, in V4 and V5 friendly methods
    /**
     * @hidden
     */
    var ticker;
    // to avoid Rollup transforming our import, save pixi namespace in a variable
    var pixiNS$1 = pixi;
    if (parseInt((/^(\d+)\./).exec(pixi.VERSION)[1], 10) < 5) {
        ticker = pixiNS$1.ticker.shared;
    }
    else {
        ticker = pixiNS$1.Ticker.shared;
    }
    /**
     * @hidden
     */
    var helperPoint = new pixi.Point();
    /**
     * A particle emitter.
     */
    var Emitter = /** @class */ (function () {
        /**
         * @param particleParent The container to add the particles to.
         * @param particleImages A texture or array of textures to use
         *                       for the particles. Strings will be turned
         *                       into textures via Texture.fromImage().
         * @param config A configuration object containing settings for the emitter.
         * @param config.emit If config.emit is explicitly passed as false, the
         *                    Emitter will start disabled.
         * @param config.autoUpdate If config.autoUpdate is explicitly passed as
         *                          true, the Emitter will automatically call
         *                          update via the PIXI shared ticker.
         */
        function Emitter(particleParent, particleImages, config) {
            /**
             * A number keeping index of currently applied image. Used to emit arts in order.
             */
            this._currentImageIndex = -1;
            this._particleConstructor = Particle;
            // properties for individual particles
            this.particleImages = null;
            this.startAlpha = null;
            this.startSpeed = null;
            this.minimumSpeedMultiplier = 1;
            this.acceleration = null;
            this.maxSpeed = NaN;
            this.startScale = null;
            this.minimumScaleMultiplier = 1;
            this.startColor = null;
            this.minLifetime = 0;
            this.maxLifetime = 0;
            this.minStartRotation = 0;
            this.maxStartRotation = 0;
            this.noRotation = false;
            this.minRotationSpeed = 0;
            this.maxRotationSpeed = 0;
            this.particleBlendMode = 0;
            this.customEase = null;
            this.extraData = null;
            // properties for spawning particles
            this._frequency = 1;
            this.spawnChance = 1;
            this.maxParticles = 1000;
            this.emitterLifetime = -1;
            this.spawnPos = null;
            this.spawnType = null;
            this._spawnFunc = null;
            this.spawnRect = null;
            this.spawnCircle = null;
            this.spawnPolygonalChain = null;
            this.particlesPerWave = 1;
            this.particleSpacing = 0;
            this.angleStart = 0;
            // emitter properties
            this.rotation = 0;
            this.ownerPos = null;
            this._prevEmitterPos = null;
            this._prevPosIsValid = false;
            this._posChanged = false;
            this._parent = null;
            this.addAtBack = false;
            this.particleCount = 0;
            this._emit = false;
            this._spawnTimer = 0;
            this._emitterLife = -1;
            this._activeParticlesFirst = null;
            this._activeParticlesLast = null;
            this._poolFirst = null;
            this._origConfig = null;
            this._origArt = null;
            this._autoUpdate = false;
            this._currentImageIndex = -1;
            this._destroyWhenComplete = false;
            this._completeCallback = null;
            // set the initial parent
            this.parent = particleParent;
            if (particleImages && config) {
                this.init(particleImages, config);
            }
            // save often used functions on the instance instead of the prototype for better speed
            this.recycle = this.recycle;
            this.update = this.update;
            this.rotate = this.rotate;
            this.updateSpawnPos = this.updateSpawnPos;
            this.updateOwnerPos = this.updateOwnerPos;
        }
        Object.defineProperty(Emitter.prototype, "orderedArt", {
            /**
             * If the emitter is using particle art in order as provided in `particleImages`.
             * Effective only when `particleImages` has multiple art options.
             * This is particularly useful ensuring that each art shows up once, in case you need to emit a body in an order.
             * For example: dragon - [Head, body1, body2, ..., tail]
             */
            get: function () { return this._currentImageIndex !== -1; },
            set: function (value) {
                this._currentImageIndex = value ? 0 : -1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Emitter.prototype, "frequency", {
            /**
             * Time between particle spawns in seconds. If this value is not a number greater than 0,
             * it will be set to 1 (particle per second) to prevent infinite loops.
             */
            get: function () { return this._frequency; },
            set: function (value) {
                // do some error checking to prevent infinite loops
                if (typeof value === 'number' && value > 0) {
                    this._frequency = value;
                }
                else {
                    this._frequency = 1;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Emitter.prototype, "particleConstructor", {
            /**
             * The constructor used to create new particles. The default is
             * the built in Particle class. Setting this will dump any active or
             * pooled particles, if the emitter has already been used.
             */
            get: function () { return this._particleConstructor; },
            set: function (value) {
                if (value !== this._particleConstructor) {
                    this._particleConstructor = value;
                    // clean up existing particles
                    this.cleanup();
                    // scrap all the particles
                    for (var particle = this._poolFirst; particle; particle = particle.next) {
                        particle.destroy();
                    }
                    this._poolFirst = null;
                    // re-initialize the emitter so that the new constructor can do anything it needs to
                    if (this._origConfig && this._origArt) {
                        this.init(this._origArt, this._origConfig);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Emitter.prototype, "parent", {
            /**
            * The container to add particles to. Settings this will dump any active particles.
            */
            get: function () { return this._parent; },
            set: function (value) {
                this.cleanup();
                this._parent = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Sets up the emitter based on the config settings.
         * @param art A texture or array of textures to use for the particles.
         * @param config A configuration object containing settings for the emitter.
         */
        Emitter.prototype.init = function (art, config) {
            if (!art || !config) {
                return;
            }
            // clean up any existing particles
            this.cleanup();
            // store the original config and particle images, in case we need to re-initialize
            // when the particle constructor is changed
            this._origConfig = config;
            this._origArt = art;
            // set up the array of data, also ensuring that it is an array
            art = Array.isArray(art) ? art.slice() : [art];
            // run the art through the particle class's parsing function
            var partClass = this._particleConstructor;
            this.particleImages = partClass.parseArt ? partClass.parseArt(art) : art;
            // /////////////////////////
            // Particle Properties   //
            // /////////////////////////
            // set up the alpha
            if (config.alpha) {
                this.startAlpha = PropertyNode.createList(config.alpha);
            }
            else {
                this.startAlpha = new PropertyNode(1, 0);
            }
            // set up the speed
            if (config.speed) {
                this.startSpeed = PropertyNode.createList(config.speed);
                // eslint-disable-next-line max-len
                this.minimumSpeedMultiplier = ('minimumSpeedMultiplier' in config ? config.minimumSpeedMultiplier : config.speed.minimumSpeedMultiplier) || 1;
            }
            else {
                this.minimumSpeedMultiplier = 1;
                this.startSpeed = new PropertyNode(0, 0);
            }
            // set up acceleration
            var acceleration = config.acceleration;
            if (acceleration && (acceleration.x || acceleration.y)) {
                // make sure we disable speed interpolation
                this.startSpeed.next = null;
                this.acceleration = new pixi.Point(acceleration.x, acceleration.y);
                this.maxSpeed = config.maxSpeed || NaN;
            }
            else {
                this.acceleration = new pixi.Point();
            }
            // set up the scale
            if (config.scale) {
                this.startScale = PropertyNode.createList(config.scale);
                // eslint-disable-next-line max-len
                this.minimumScaleMultiplier = ('minimumScaleMultiplier' in config ? config.minimumScaleMultiplier : config.scale.minimumScaleMultiplier) || 1;
            }
            else {
                this.startScale = new PropertyNode(1, 0);
                this.minimumScaleMultiplier = 1;
            }
            // set up the color
            if (config.color) {
                this.startColor = PropertyNode.createList(config.color);
            }
            else {
                this.startColor = new PropertyNode({ r: 0xFF, g: 0xFF, b: 0xFF }, 0);
            }
            // set up the start rotation
            if (config.startRotation) {
                this.minStartRotation = config.startRotation.min;
                this.maxStartRotation = config.startRotation.max;
            }
            else {
                this.minStartRotation = this.maxStartRotation = 0;
            }
            if (config.noRotation
                && (this.minStartRotation || this.maxStartRotation)) {
                this.noRotation = !!config.noRotation;
            }
            else {
                this.noRotation = false;
            }
            // set up the rotation speed
            if (config.rotationSpeed) {
                this.minRotationSpeed = config.rotationSpeed.min;
                this.maxRotationSpeed = config.rotationSpeed.max;
            }
            else {
                this.minRotationSpeed = this.maxRotationSpeed = 0;
            }
            this.rotationAcceleration = config.rotationAcceleration || 0;
            // set up the lifetime
            this.minLifetime = config.lifetime.min;
            this.maxLifetime = config.lifetime.max;
            // get the blend mode
            this.particleBlendMode = exports.ParticleUtils.getBlendMode(config.blendMode);
            // use the custom ease if provided
            if (config.ease) {
                this.customEase = typeof config.ease === 'function'
                    ? config.ease : exports.ParticleUtils.generateEase(config.ease);
            }
            else {
                this.customEase = null;
            }
            // set up the extra data, running it through the particle class's parseData function.
            if (partClass.parseData) {
                this.extraData = partClass.parseData(config.extraData);
            }
            else {
                this.extraData = config.extraData || null;
            }
            // ////////////////////////
            // Emitter Properties   //
            // ////////////////////////
            // reset spawn type specific settings
            this.spawnRect = this.spawnCircle = null;
            this.particlesPerWave = 1;
            if (config.particlesPerWave && config.particlesPerWave > 1) {
                this.particlesPerWave = config.particlesPerWave;
            }
            this.particleSpacing = 0;
            this.angleStart = 0;
            // determine the spawn function to use
            this.parseSpawnType(config);
            // set the spawning frequency
            this.frequency = config.frequency;
            this.spawnChance = (typeof config.spawnChance === 'number' && config.spawnChance > 0) ? config.spawnChance : 1;
            // set the emitter lifetime
            this.emitterLifetime = config.emitterLifetime || -1;
            // set the max particles
            this.maxParticles = config.maxParticles > 0 ? config.maxParticles : 1000;
            // determine if we should add the particle at the back of the list or not
            this.addAtBack = !!config.addAtBack;
            // reset the emitter position and rotation variables
            this.rotation = 0;
            this.ownerPos = new pixi.Point();
            this.spawnPos = new pixi.Point(config.pos.x, config.pos.y);
            this.initAdditional(art, config);
            this._prevEmitterPos = this.spawnPos.clone();
            // previous emitter position is invalid and should not be used for interpolation
            this._prevPosIsValid = false;
            // start emitting
            this._spawnTimer = 0;
            this.emit = config.emit === undefined ? true : !!config.emit;
            this.autoUpdate = !!config.autoUpdate;
            this.orderedArt = !!config.orderedArt;
        };
        /**
         * Sets up additional parameters to the emitter from config settings.
         * Using for parsing additional parameters on classes that extend from Emitter
         * @param art A texture or array of textures to use for the particles.
         * @param config A configuration object containing settings for the emitter.
         */
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        Emitter.prototype.initAdditional = function (art, config) {
            // override in subclasses
        };
        /**
         * Parsing emitter spawn type from config settings.
         * Place for override and add new kind of spawn type
         * @param config A configuration object containing settings for the emitter.
         */
        Emitter.prototype.parseSpawnType = function (config) {
            var spawnCircle;
            switch (config.spawnType) {
                case 'rect':
                    this.spawnType = 'rect';
                    this._spawnFunc = this._spawnRect;
                    var spawnRect = config.spawnRect;
                    this.spawnRect = new pixi.Rectangle(spawnRect.x, spawnRect.y, spawnRect.w, spawnRect.h);
                    break;
                case 'circle':
                    this.spawnType = 'circle';
                    this._spawnFunc = this._spawnCircle;
                    spawnCircle = config.spawnCircle;
                    this.spawnCircle = new pixi.Circle(spawnCircle.x, spawnCircle.y, spawnCircle.r);
                    break;
                case 'ring':
                    this.spawnType = 'ring';
                    this._spawnFunc = this._spawnRing;
                    spawnCircle = config.spawnCircle;
                    this.spawnCircle = new pixi.Circle(spawnCircle.x, spawnCircle.y, spawnCircle.r);
                    this.spawnCircle.minRadius = spawnCircle.minR;
                    break;
                case 'burst':
                    this.spawnType = 'burst';
                    this._spawnFunc = this._spawnBurst;
                    this.particleSpacing = config.particleSpacing;
                    this.angleStart = config.angleStart ? config.angleStart : 0;
                    break;
                case 'point':
                    this.spawnType = 'point';
                    this._spawnFunc = this._spawnPoint;
                    break;
                case 'polygonalChain':
                    this.spawnType = 'polygonalChain';
                    this._spawnFunc = this._spawnPolygonalChain;
                    this.spawnPolygonalChain = new PolygonalChain(config.spawnPolygon);
                    break;
                default:
                    this.spawnType = 'point';
                    this._spawnFunc = this._spawnPoint;
                    break;
            }
        };
        /**
         * Recycles an individual particle. For internal use only.
         * @param particle The particle to recycle.
         * @internal
         */
        Emitter.prototype.recycle = function (particle) {
            if (particle.next) {
                particle.next.prev = particle.prev;
            }
            if (particle.prev) {
                particle.prev.next = particle.next;
            }
            if (particle === this._activeParticlesLast) {
                this._activeParticlesLast = particle.prev;
            }
            if (particle === this._activeParticlesFirst) {
                this._activeParticlesFirst = particle.next;
            }
            // add to pool
            particle.prev = null;
            particle.next = this._poolFirst;
            this._poolFirst = particle;
            // remove child from display, or make it invisible if it is in a ParticleContainer
            if (particle.parent) {
                particle.parent.removeChild(particle);
            }
            // decrease count
            --this.particleCount;
        };
        /**
         * Sets the rotation of the emitter to a new value.
         * @param newRot The new rotation, in degrees.
         */
        Emitter.prototype.rotate = function (newRot) {
            if (this.rotation === newRot)
                return;
            // caclulate the difference in rotation for rotating spawnPos
            var diff = newRot - this.rotation;
            this.rotation = newRot;
            // rotate spawnPos
            exports.ParticleUtils.rotatePoint(diff, this.spawnPos);
            // mark the position as having changed
            this._posChanged = true;
        };
        /**
         * Changes the spawn position of the emitter.
         * @param x The new x value of the spawn position for the emitter.
         * @param y The new y value of the spawn position for the emitter.
         */
        Emitter.prototype.updateSpawnPos = function (x, y) {
            this._posChanged = true;
            this.spawnPos.x = x;
            this.spawnPos.y = y;
        };
        /**
         * Changes the position of the emitter's owner. You should call this if you are adding
         * particles to the world container that your emitter's owner is moving around in.
         * @param x The new x value of the emitter's owner.
         * @param y The new y value of the emitter's owner.
         */
        Emitter.prototype.updateOwnerPos = function (x, y) {
            this._posChanged = true;
            this.ownerPos.x = x;
            this.ownerPos.y = y;
        };
        /**
         * Prevents emitter position interpolation in the next update.
         * This should be used if you made a major position change of your emitter's owner
         * that was not normal movement.
         */
        Emitter.prototype.resetPositionTracking = function () {
            this._prevPosIsValid = false;
        };
        Object.defineProperty(Emitter.prototype, "emit", {
            /**
             * If particles should be emitted during update() calls. Setting this to false
             * stops new particles from being created, but allows existing ones to die out.
             */
            get: function () { return this._emit; },
            set: function (value) {
                this._emit = !!value;
                this._emitterLife = this.emitterLifetime;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Emitter.prototype, "autoUpdate", {
            /**
             * If the update function is called automatically from the shared ticker.
             * Setting this to false requires calling the update function manually.
             */
            get: function () { return this._autoUpdate; },
            set: function (value) {
                if (this._autoUpdate && !value) {
                    ticker.remove(this.update, this);
                }
                else if (!this._autoUpdate && value) {
                    ticker.add(this.update, this);
                }
                this._autoUpdate = !!value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Starts emitting particles, sets autoUpdate to true, and sets up the Emitter to destroy itself
         * when particle emission is complete.
         * @param callback Callback for when emission is complete (all particles have died off)
         */
        Emitter.prototype.playOnceAndDestroy = function (callback) {
            this.autoUpdate = true;
            this.emit = true;
            this._destroyWhenComplete = true;
            this._completeCallback = callback;
        };
        /**
         * Starts emitting particles and optionally calls a callback when particle emission is complete.
         * @param callback Callback for when emission is complete (all particles have died off)
         */
        Emitter.prototype.playOnce = function (callback) {
            this.emit = true;
            this._completeCallback = callback;
        };
        /**
         * Updates all particles spawned by this emitter and emits new ones.
         * @param delta Time elapsed since the previous frame, in __seconds__.
         */
        Emitter.prototype.update = function (delta) {
            if (this._autoUpdate) {
                delta = delta / pixi.settings.TARGET_FPMS / 1000;
            }
            // if we don't have a parent to add particles to, then don't do anything.
            // this also works as a isDestroyed check
            if (!this._parent)
                return;
            // update existing particles
            var i;
            var particle;
            var next;
            for (particle = this._activeParticlesFirst; particle; particle = next) {
                next = particle.next;
                particle.update(delta);
            }
            var prevX;
            var prevY;
            // if the previous position is valid, store these for later interpolation
            if (this._prevPosIsValid) {
                prevX = this._prevEmitterPos.x;
                prevY = this._prevEmitterPos.y;
            }
            // store current position of the emitter as local variables
            var curX = this.ownerPos.x + this.spawnPos.x;
            var curY = this.ownerPos.y + this.spawnPos.y;
            // spawn new particles
            if (this._emit) {
                // decrease spawn timer
                this._spawnTimer -= delta < 0 ? 0 : delta;
                // while _spawnTimer < 0, we have particles to spawn
                while (this._spawnTimer <= 0) {
                    // determine if the emitter should stop spawning
                    if (this._emitterLife >= 0) {
                        this._emitterLife -= this._frequency;
                        if (this._emitterLife <= 0) {
                            this._spawnTimer = 0;
                            this._emitterLife = 0;
                            this.emit = false;
                            break;
                        }
                    }
                    // determine if we have hit the particle limit
                    if (this.particleCount >= this.maxParticles) {
                        this._spawnTimer += this._frequency;
                        continue;
                    }
                    // determine the particle lifetime
                    var lifetime = void 0;
                    if (this.minLifetime === this.maxLifetime) {
                        lifetime = this.minLifetime;
                    }
                    else {
                        lifetime = (Math.random() * (this.maxLifetime - this.minLifetime)) + this.minLifetime;
                    }
                    // only make the particle if it wouldn't immediately destroy itself
                    if (-this._spawnTimer < lifetime) {
                        // If the position has changed and this isn't the first spawn,
                        // interpolate the spawn position
                        var emitPosX = void 0;
                        var emitPosY = void 0;
                        if (this._prevPosIsValid && this._posChanged) {
                            // 1 - _spawnTimer / delta, but _spawnTimer is negative
                            var lerp = 1 + (this._spawnTimer / delta);
                            emitPosX = ((curX - prevX) * lerp) + prevX;
                            emitPosY = ((curY - prevY) * lerp) + prevY;
                        }
                        else // otherwise just set to the spawn position
                         {
                            emitPosX = curX;
                            emitPosY = curY;
                        }
                        // create enough particles to fill the wave (non-burst types have a wave of 1)
                        i = 0;
                        for (var len = Math.min(this.particlesPerWave, this.maxParticles - this.particleCount); i < len; ++i) {
                            // see if we actually spawn one
                            if (this.spawnChance < 1 && Math.random() >= this.spawnChance) {
                                continue;
                            }
                            // create particle
                            var p = void 0;
                            if (this._poolFirst) {
                                p = this._poolFirst;
                                this._poolFirst = this._poolFirst.next;
                                p.next = null;
                            }
                            else {
                                p = new this.particleConstructor(this);
                            }
                            // set a random texture if we have more than one
                            if (this.particleImages.length > 1) {
                                // if using ordered art
                                if (this._currentImageIndex !== -1) {
                                    // get current art index, then increment for the next particle
                                    p.applyArt(this.particleImages[this._currentImageIndex++]);
                                    // loop around if needed
                                    if (this._currentImageIndex < 0 || this._currentImageIndex >= this.particleImages.length) {
                                        this._currentImageIndex = 0;
                                    }
                                }
                                // otherwise grab a random one
                                else {
                                    p.applyArt(this.particleImages[Math.floor(Math.random() * this.particleImages.length)]);
                                }
                            }
                            else {
                                // if they are actually the same texture, a standard particle
                                // will quit early from the texture setting in setTexture().
                                p.applyArt(this.particleImages[0]);
                            }
                            // set up the start and end values
                            p.alphaList.reset(this.startAlpha);
                            if (this.minimumSpeedMultiplier !== 1) {
                                // eslint-disable-next-line max-len
                                p.speedMultiplier = (Math.random() * (1 - this.minimumSpeedMultiplier)) + this.minimumSpeedMultiplier;
                            }
                            p.speedList.reset(this.startSpeed);
                            p.acceleration.x = this.acceleration.x;
                            p.acceleration.y = this.acceleration.y;
                            p.maxSpeed = this.maxSpeed;
                            if (this.minimumScaleMultiplier !== 1) {
                                // eslint-disable-next-line max-len
                                p.scaleMultiplier = (Math.random() * (1 - this.minimumScaleMultiplier)) + this.minimumScaleMultiplier;
                            }
                            p.scaleList.reset(this.startScale);
                            p.colorList.reset(this.startColor);
                            // randomize the rotation speed
                            if (this.minRotationSpeed === this.maxRotationSpeed) {
                                p.rotationSpeed = this.minRotationSpeed;
                            }
                            else {
                                // eslint-disable-next-line max-len
                                p.rotationSpeed = (Math.random() * (this.maxRotationSpeed - this.minRotationSpeed)) + this.minRotationSpeed;
                            }
                            p.rotationAcceleration = this.rotationAcceleration;
                            p.noRotation = this.noRotation;
                            // set up the lifetime
                            p.maxLife = lifetime;
                            // set the blend mode
                            p.blendMode = this.particleBlendMode;
                            // set the custom ease, if any
                            p.ease = this.customEase;
                            // set the extra data, if any
                            p.extraData = this.extraData;
                            // set additional properties to particle
                            this.applyAdditionalProperties(p);
                            // call the proper function to handle rotation and position of particle
                            this._spawnFunc(p, emitPosX, emitPosY, i);
                            // initialize particle
                            p.init();
                            // add the particle to the display list
                            if (this.addAtBack) {
                                this._parent.addChildAt(p, 0);
                            }
                            else {
                                this._parent.addChild(p);
                            }
                            // add particle to list of active particles
                            if (this._activeParticlesLast) {
                                this._activeParticlesLast.next = p;
                                p.prev = this._activeParticlesLast;
                                this._activeParticlesLast = p;
                            }
                            else {
                                this._activeParticlesLast = this._activeParticlesFirst = p;
                            }
                            ++this.particleCount;
                            // update the particle by the time passed, so the particles are spread out properly
                            p.update(-this._spawnTimer); // we want a positive delta, because a negative delta messes things up
                        }
                    }
                    // increase timer and continue on to any other particles that need to be created
                    this._spawnTimer += this._frequency;
                }
            }
            // if the position changed before this update, then keep track of that
            if (this._posChanged) {
                this._prevEmitterPos.x = curX;
                this._prevEmitterPos.y = curY;
                this._prevPosIsValid = true;
                this._posChanged = false;
            }
            // if we are all done and should destroy ourselves, take care of that
            if (!this._emit && !this._activeParticlesFirst) {
                if (this._completeCallback) {
                    var cb = this._completeCallback;
                    this._completeCallback = null;
                    cb();
                }
                if (this._destroyWhenComplete) {
                    this.destroy();
                }
            }
        };
        /**
         * Set additional properties to new particle.
         * Using on classes that extend from Emitter
         * @param p The particle
         */
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        Emitter.prototype.applyAdditionalProperties = function (p) {
            // for override in subclass
        };
        /**
         * Positions a particle for a point type emitter.
         * @param p The particle to position and rotate.
         * @param emitPosX The emitter's x position
         * @param emitPosY The emitter's y position
         * @param i The particle number in the current wave. Not used for this function.
         */
        Emitter.prototype._spawnPoint = function (p, emitPosX, emitPosY) {
            // set the initial rotation/direction of the particle based on
            // starting particle angle and rotation of emitter
            if (this.minStartRotation === this.maxStartRotation) {
                p.rotation = this.minStartRotation + this.rotation;
            }
            else {
                // eslint-disable-next-line max-len
                p.rotation = (Math.random() * (this.maxStartRotation - this.minStartRotation)) + this.minStartRotation + this.rotation;
            }
            // drop the particle at the emitter's position
            p.position.x = emitPosX;
            p.position.y = emitPosY;
        };
        /**
         * Positions a particle for a rectangle type emitter.
         * @param p The particle to position and rotate.
         * @param emitPosX The emitter's x position
         * @param emitPosY The emitter's y position
         * @param i The particle number in the current wave. Not used for this function.
         */
        Emitter.prototype._spawnRect = function (p, emitPosX, emitPosY) {
            // set the initial rotation/direction of the particle based on starting
            // particle angle and rotation of emitter
            if (this.minStartRotation === this.maxStartRotation) {
                p.rotation = this.minStartRotation + this.rotation;
            }
            else {
                // eslint-disable-next-line max-len
                p.rotation = (Math.random() * (this.maxStartRotation - this.minStartRotation)) + this.minStartRotation + this.rotation;
            }
            // place the particle at a random point in the rectangle
            helperPoint.x = (Math.random() * this.spawnRect.width) + this.spawnRect.x;
            helperPoint.y = (Math.random() * this.spawnRect.height) + this.spawnRect.y;
            if (this.rotation !== 0) {
                exports.ParticleUtils.rotatePoint(this.rotation, helperPoint);
            }
            p.position.x = emitPosX + helperPoint.x;
            p.position.y = emitPosY + helperPoint.y;
        };
        /**
         * Positions a particle for a circle type emitter.
         * @param p The particle to position and rotate.
         * @param emitPosX The emitter's x position
         * @param emitPosY The emitter's y position
         * @param i The particle number in the current wave. Not used for this function.
         */
        Emitter.prototype._spawnCircle = function (p, emitPosX, emitPosY) {
            // set the initial rotation/direction of the particle based on starting
            // particle angle and rotation of emitter
            if (this.minStartRotation === this.maxStartRotation) {
                p.rotation = this.minStartRotation + this.rotation;
            }
            else {
                // eslint-disable-next-line max-len
                p.rotation = (Math.random() * (this.maxStartRotation - this.minStartRotation)) + this.minStartRotation + this.rotation;
            }
            // place the particle at a random radius in the circle
            helperPoint.x = Math.random() * this.spawnCircle.radius;
            helperPoint.y = 0;
            // rotate the point to a random angle in the circle
            exports.ParticleUtils.rotatePoint(Math.random() * 360, helperPoint);
            // offset by the circle's center
            helperPoint.x += this.spawnCircle.x;
            helperPoint.y += this.spawnCircle.y;
            // rotate the point by the emitter's rotation
            if (this.rotation !== 0) {
                exports.ParticleUtils.rotatePoint(this.rotation, helperPoint);
            }
            // set the position, offset by the emitter's position
            p.position.x = emitPosX + helperPoint.x;
            p.position.y = emitPosY + helperPoint.y;
        };
        /**
         * Positions a particle for a ring type emitter.
         * @param p The particle to position and rotate.
         * @param emitPosX The emitter's x position
         * @param emitPosY The emitter's y position
         * @param i The particle number in the current wave. Not used for this function.
         */
        Emitter.prototype._spawnRing = function (p, emitPosX, emitPosY) {
            var spawnCircle = this.spawnCircle;
            // set the initial rotation/direction of the particle based on starting
            // particle angle and rotation of emitter
            if (this.minStartRotation === this.maxStartRotation) {
                p.rotation = this.minStartRotation + this.rotation;
            }
            else {
                p.rotation = (Math.random() * (this.maxStartRotation - this.minStartRotation))
                    + this.minStartRotation + this.rotation;
            }
            // place the particle at a random radius in the ring
            if (spawnCircle.minRadius !== spawnCircle.radius) {
                helperPoint.x = (Math.random() * (spawnCircle.radius - spawnCircle.minRadius))
                    + spawnCircle.minRadius;
            }
            else {
                helperPoint.x = spawnCircle.radius;
            }
            helperPoint.y = 0;
            // rotate the point to a random angle in the circle
            var angle = Math.random() * 360;
            p.rotation += angle;
            exports.ParticleUtils.rotatePoint(angle, helperPoint);
            // offset by the circle's center
            helperPoint.x += this.spawnCircle.x;
            helperPoint.y += this.spawnCircle.y;
            // rotate the point by the emitter's rotation
            if (this.rotation !== 0) {
                exports.ParticleUtils.rotatePoint(this.rotation, helperPoint);
            }
            // set the position, offset by the emitter's position
            p.position.x = emitPosX + helperPoint.x;
            p.position.y = emitPosY + helperPoint.y;
        };
        /**
         * Positions a particle for polygonal chain.
         * @param p The particle to position and rotate.
         * @param emitPosX The emitter's x position
         * @param emitPosY The emitter's y position
         * @param i The particle number in the current wave. Not used for this function.
         */
        Emitter.prototype._spawnPolygonalChain = function (p, emitPosX, emitPosY) {
            // set the initial rotation/direction of the particle based on starting
            // particle angle and rotation of emitter
            if (this.minStartRotation === this.maxStartRotation) {
                p.rotation = this.minStartRotation + this.rotation;
            }
            else {
                p.rotation = (Math.random() * (this.maxStartRotation - this.minStartRotation))
                    + this.minStartRotation + this.rotation;
            }
            // get random point on the polygon chain
            this.spawnPolygonalChain.getRandomPoint(helperPoint);
            // rotate the point by the emitter's rotation
            if (this.rotation !== 0) {
                exports.ParticleUtils.rotatePoint(this.rotation, helperPoint);
            }
            // set the position, offset by the emitter's position
            p.position.x = emitPosX + helperPoint.x;
            p.position.y = emitPosY + helperPoint.y;
        };
        /**
         * Positions a particle for a burst type emitter.
         * @param p The particle to position and rotate.
         * @param emitPosX The emitter's x position
         * @param emitPosY The emitter's y position
         * @param i The particle number in the current wave.
         */
        Emitter.prototype._spawnBurst = function (p, emitPosX, emitPosY, i) {
            // set the initial rotation/direction of the particle based on spawn
            // angle and rotation of emitter
            if (this.particleSpacing === 0) {
                p.rotation = Math.random() * 360;
            }
            else {
                p.rotation = this.angleStart + (this.particleSpacing * i) + this.rotation;
            }
            // drop the particle at the emitter's position
            p.position.x = emitPosX;
            p.position.y = emitPosY;
        };
        /**
         * Kills all active particles immediately.
         */
        Emitter.prototype.cleanup = function () {
            var particle;
            var next;
            for (particle = this._activeParticlesFirst; particle; particle = next) {
                next = particle.next;
                this.recycle(particle);
                if (particle.parent) {
                    particle.parent.removeChild(particle);
                }
            }
            this._activeParticlesFirst = this._activeParticlesLast = null;
            this.particleCount = 0;
        };
        /**
         * Destroys the emitter and all of its particles.
         */
        Emitter.prototype.destroy = function () {
            // make sure we aren't still listening to any tickers
            this.autoUpdate = false;
            // puts all active particles in the pool, and removes them from the particle parent
            this.cleanup();
            // wipe the pool clean
            var next;
            for (var particle = this._poolFirst; particle; particle = next) {
                // store next value so we don't lose it in our destroy call
                next = particle.next;
                particle.destroy();
            }
            this._poolFirst = this._parent = this.particleImages = this.spawnPos = this.ownerPos
                = this.startColor = this.startScale = this.startAlpha = this.startSpeed
                    = this.customEase = this._completeCallback = null;
        };
        return Emitter;
    }());

    /**
     * A helper point for math things.
     * @hidden
     */
    var helperPoint$1 = new pixi.Point();
    /**
     * A hand picked list of Math functions (and a couple properties) that are
     * allowable. They should be used without the preceding "Math."
     * @hidden
     */
    var MATH_FUNCS = [
        'pow',
        'sqrt',
        'abs',
        'floor',
        'round',
        'ceil',
        'E',
        'PI',
        'sin',
        'cos',
        'tan',
        'asin',
        'acos',
        'atan',
        'atan2',
        'log',
    ];
    /**
     * create an actual regular expression object from the string
     * @hidden
     */
    var WHITELISTER = new RegExp([
        // Allow the 4 basic operations, parentheses and all numbers/decimals, as well
        // as 'x', for the variable usage.
        '[01234567890\\.\\*\\-\\+\\/\\(\\)x ,]',
    ].concat(MATH_FUNCS).join('|'), 'g');
    /**
     * Parses a string into a function for path following.
     * This involves whitelisting the string for safety, inserting "Math." to math function
     * names, and using `new Function()` to generate a function.
     * @hidden
     * @param pathString The string to parse.
     * @return The path function - takes x, outputs y.
     */
    function parsePath(pathString) {
        var matches = pathString.match(WHITELISTER);
        for (var i = matches.length - 1; i >= 0; --i) {
            if (MATH_FUNCS.indexOf(matches[i]) >= 0) {
                matches[i] = "Math." + matches[i];
            }
        }
        pathString = matches.join('');
        // eslint-disable-next-line no-new-func
        return new Function('x', "return " + pathString + ";");
    }
    /**
     * An particle that follows a path defined by an algebraic expression, e.g. "sin(x)" or
     * "5x + 3".
     * To use this class, the particle config must have a "path" string in the
     * "extraData" parameter. This string should have "x" in it to represent movement (from the
     * speed settings of the particle). It may have numbers, parentheses, the four basic
     * operations, and the following Math functions or properties (without the preceding "Math."):
     * "pow", "sqrt", "abs", "floor", "round", "ceil", "E", "PI", "sin", "cos", "tan", "asin",
     * "acos", "atan", "atan2", "log".
     * The overall movement of the particle and the expression value become x and y positions for
     * the particle, respectively. The final position is rotated by the spawn rotation/angle of
     * the particle.
     *
     * Some example paths:
     *
     * 	"sin(x/10) * 20" // A sine wave path.
     * 	"cos(x/100) * 30" // Particles curve counterclockwise (for medium speed/low lifetime particles)
     * 	"pow(x/10, 2) / 2" // Particles curve clockwise (remember, +y is down).
     */
    var PathParticle = /** @class */ (function (_super) {
        __extends(PathParticle, _super);
        /**
         * @param {PIXI.particles.Emitter} emitter The emitter that controls this PathParticle.
         */
        function PathParticle(emitter) {
            var _this = _super.call(this, emitter) || this;
            _this.path = null;
            _this.initialRotation = 0;
            _this.initialPosition = new pixi.Point();
            _this.movement = 0;
            return _this;
        }
        /**
         * Initializes the particle for use, based on the properties that have to
         * have been set already on the particle.
         */
        PathParticle.prototype.init = function () {
            // get initial rotation before it is converted to radians
            this.initialRotation = this.rotation;
            // standard init
            this.Particle_init();
            // set the path for the particle
            this.path = this.extraData.path;
            // cancel the normal movement behavior
            this._doNormalMovement = !this.path;
            // reset movement
            this.movement = 0;
            // grab position
            this.initialPosition.x = this.position.x;
            this.initialPosition.y = this.position.y;
        };
        /**
         * Updates the particle.
         * @param delta Time elapsed since the previous frame, in __seconds__.
         */
        PathParticle.prototype.update = function (delta) {
            var lerp = this.Particle_update(delta);
            // if the particle died during the update, then don't bother
            if (lerp >= 0 && this.path) {
                // increase linear movement based on speed
                if (this._doSpeed) {
                    var speed = this.speedList.interpolate(lerp) * this.speedMultiplier;
                    this.movement += speed * delta;
                }
                else {
                    var speed = this.speedList.current.value * this.speedMultiplier;
                    this.movement += speed * delta;
                }
                // set up the helper point for rotation
                helperPoint$1.x = this.movement;
                helperPoint$1.y = this.path(this.movement);
                exports.ParticleUtils.rotatePoint(this.initialRotation, helperPoint$1);
                this.position.x = this.initialPosition.x + helperPoint$1.x;
                this.position.y = this.initialPosition.y + helperPoint$1.y;
            }
            return lerp;
        };
        /**
         * Destroys the particle, removing references and preventing future use.
         */
        PathParticle.prototype.destroy = function () {
            this.Particle_destroy();
            this.path = this.initialPosition = null;
        };
        /**
         * Checks over the art that was passed to the Emitter's init() function, to do any special
         * modifications to prepare it ahead of time. This just runs Particle.parseArt().
         * @param art The array of art data. For Particle, it should be an array of
         *            Textures. Any strings in the array will be converted to
         *            Textures via Texture.fromImage().
         * @return The art, after any needed modifications.
         */
        PathParticle.parseArt = function (art) {
            return Particle.parseArt(art);
        };
        /**
         * Parses extra emitter data to ensure it is set up for this particle class.
         * PathParticle checks for the existence of path data, and parses the path data for use
         * by particle instances.
         * @param extraData The extra data from the particle config.
         * @return The parsed extra data.
         */
        PathParticle.parseData = function (extraData) {
            var output = {};
            if (extraData && extraData.path) {
                try {
                    output.path = parsePath(extraData.path);
                }
                catch (e) {
                    if (exports.ParticleUtils.verbose) {
                        console.error('PathParticle: error in parsing path expression');
                    }
                    output.path = null;
                }
            }
            else {
                if (exports.ParticleUtils.verbose) {
                    console.error('PathParticle requires a path string in extraData!');
                }
                output.path = null;
            }
            return output;
        };
        return PathParticle;
    }(Particle));

    /**
     * An individual particle image with an animation. Art data passed to the emitter must be
     * formatted in a particular way for AnimatedParticle to be able to handle it:
     *
     * ```typescript
     * {
     *     //framerate is required. It is the animation speed of the particle in frames per
     *     //second.
     *     //A value of "matchLife" causes the animation to match the lifetime of an individual
     *     //particle, instead of at a constant framerate. This causes the animation to play
     *     //through one time, completing when the particle expires.
     *     framerate: 6,
     *     //loop is optional, and defaults to false.
     *     loop: true,
     *     //textures is required, and can be an array of any (non-zero) length.
     *     textures: [
     *         //each entry represents a single texture that should be used for one or more
     *         //frames. Any strings will be converted to Textures with Texture.from().
     *         //Instances of PIXI.Texture will be used directly.
     *         "animFrame1.png",
     *         //entries can be an object with a 'count' property, telling AnimatedParticle to
     *         //use that texture for 'count' frames sequentially.
     *         {
     *             texture: "animFrame2.png",
     *             count: 3
     *         },
     *         "animFrame3.png"
     *     ]
     * }
     * ```
     */
    var AnimatedParticle = /** @class */ (function (_super) {
        __extends(AnimatedParticle, _super);
        /**
         * @param emitter The emitter that controls this AnimatedParticle.
         */
        function AnimatedParticle(emitter) {
            var _this = _super.call(this, emitter) || this;
            _this.textures = null;
            _this.duration = 0;
            _this.framerate = 0;
            _this.elapsed = 0;
            _this.loop = false;
            return _this;
        }
        /**
         * Initializes the particle for use, based on the properties that have to
         * have been set already on the particle.
         */
        AnimatedParticle.prototype.init = function () {
            this.Particle_init();
            this.elapsed = 0;
            // if the animation needs to match the particle's life, then cacluate variables
            if (this.framerate < 0) {
                this.duration = this.maxLife;
                this.framerate = this.textures.length / this.duration;
            }
        };
        /**
         * Sets the textures for the particle.
         * @param art An array of PIXI.Texture objects for this animated particle.
         */
        AnimatedParticle.prototype.applyArt = function (art) {
            this.textures = art.textures;
            this.framerate = art.framerate;
            this.duration = art.duration;
            this.loop = art.loop;
        };
        /**
         * Updates the particle.
         * @param delta Time elapsed since the previous frame, in __seconds__.
         */
        AnimatedParticle.prototype.update = function (delta) {
            var lerp = this.Particle_update(delta);
            // only animate the particle if it is still alive
            if (lerp >= 0) {
                this.elapsed += delta;
                if (this.elapsed >= this.duration) {
                    // loop elapsed back around
                    if (this.loop) {
                        this.elapsed = this.elapsed % this.duration;
                    }
                    // subtract a small amount to prevent attempting to go past the end of the animation
                    else {
                        this.elapsed = this.duration - 0.000001;
                    }
                }
                // add a very small number to the frame and then floor it to avoid
                // the frame being one short due to floating point errors.
                var frame = ((this.elapsed * this.framerate) + 0.0000001) | 0;
                // in the very rare case that framerate * elapsed math ends up going past the end, use the last texture
                this.texture = this.textures[frame] || this.textures[this.textures.length - 1] || pixi.Texture.EMPTY;
            }
            return lerp;
        };
        /**
         * Destroys the particle, removing references and preventing future use.
         */
        AnimatedParticle.prototype.destroy = function () {
            this.Particle_destroy();
            this.textures = null;
        };
        /**
         * Checks over the art that was passed to the Emitter's init() function, to do any special
         * modifications to prepare it ahead of time.
         * @param art The array of art data, properly formatted for AnimatedParticle.
         * @return The art, after any needed modifications.
         */
        AnimatedParticle.parseArt = function (art) {
            var outArr = [];
            for (var i = 0; i < art.length; ++i) {
                var data = art[i];
                var output = outArr[i] = {};
                var outTextures = output.textures = [];
                var textures = data.textures;
                for (var j = 0; j < textures.length; ++j) {
                    var tex = textures[j];
                    if (typeof tex === 'string') {
                        outTextures.push(GetTextureFromString(tex));
                    }
                    else if (tex instanceof pixi.Texture) {
                        outTextures.push(tex);
                    }
                    // assume an object with extra data determining duplicate frame data
                    else {
                        var dupe = tex.count || 1;
                        if (typeof tex.texture === 'string') {
                            tex = GetTextureFromString(tex.texture);
                        }
                        else // if(tex.texture instanceof Texture)
                         {
                            tex = tex.texture;
                        }
                        for (; dupe > 0; --dupe) {
                            outTextures.push(tex);
                        }
                    }
                }
                // use these values to signify that the animation should match the particle life time.
                if (data.framerate === 'matchLife') {
                    // -1 means that it should be calculated
                    output.framerate = -1;
                    output.duration = 0;
                    output.loop = false;
                }
                else {
                    // determine if the animation should loop
                    output.loop = !!data.loop;
                    // get the framerate, default to 60
                    output.framerate = data.framerate > 0 ? data.framerate : 60;
                    // determine the duration
                    output.duration = outTextures.length / output.framerate;
                }
            }
            return outArr;
        };
        return AnimatedParticle;
    }(Particle));

    /**
     * A semi-experimental Container that uses a doubly linked list to manage children instead of an
     * array. This means that adding/removing children often is not the same performance hit that
     * it would to be continually pushing/splicing.
     * However, this is primarily intended to be used for heavy particle usage, and may not handle
     * edge cases well if used as a complete Container replacement.
     */
    var LinkedListContainer = /** @class */ (function (_super) {
        __extends(LinkedListContainer, _super);
        function LinkedListContainer() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._firstChild = null;
            _this._lastChild = null;
            _this._childCount = 0;
            return _this;
        }
        Object.defineProperty(LinkedListContainer.prototype, "firstChild", {
            get: function () {
                return this._firstChild;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LinkedListContainer.prototype, "lastChild", {
            get: function () {
                return this._lastChild;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LinkedListContainer.prototype, "childCount", {
            get: function () {
                return this._childCount;
            },
            enumerable: true,
            configurable: true
        });
        LinkedListContainer.prototype.addChild = function () {
            var children = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                children[_i] = arguments[_i];
            }
            // if there is only one argument we can bypass looping through the them
            if (children.length > 1) {
                // loop through the array and add all children
                for (var i = 0; i < children.length; i++) {
                    // eslint-disable-next-line prefer-rest-params
                    this.addChild(children[i]);
                }
            }
            else {
                var child = children[0];
                // if the child has a parent then lets remove it as PixiJS objects can only exist in one place
                if (child.parent) {
                    child.parent.removeChild(child);
                }
                child.parent = this;
                this.sortDirty = true;
                // ensure child transform will be recalculated
                child.transform._parentID = -1;
                // add to list if we have a list
                if (this._lastChild) {
                    this._lastChild.nextChild = child;
                    child.prevChild = this._lastChild;
                    this._lastChild = child;
                }
                // otherwise initialize the list
                else {
                    this._firstChild = this._lastChild = child;
                }
                // update child count
                ++this._childCount;
                // ensure bounds will be recalculated
                this._boundsID++;
                // TODO - lets either do all callbacks or all events.. not both!
                this.onChildrenChange();
                this.emit('childAdded', child, this, this._childCount);
                child.emit('added', this);
            }
            return children[0];
        };
        LinkedListContainer.prototype.addChildAt = function (child, index) {
            if (index < 0 || index > this._childCount) {
                throw new Error("addChildAt: The index " + index + " supplied is out of bounds " + this._childCount);
            }
            if (child.parent) {
                child.parent.removeChild(child);
            }
            child.parent = this;
            this.sortDirty = true;
            // ensure child transform will be recalculated
            child.transform._parentID = -1;
            var c = child;
            // if no children, do basic initialization
            if (!this._firstChild) {
                this._firstChild = this._lastChild = c;
            }
            // add at beginning (back)
            else if (index === 0) {
                this._firstChild.prevChild = c;
                c.nextChild = this._firstChild;
                this._firstChild = c;
            }
            // add at end (front)
            else if (index === this._childCount) {
                this._lastChild.nextChild = c;
                c.prevChild = this._lastChild;
                this._lastChild = c;
            }
            // otherwise we have to start counting through the children to find the right one
            // - SLOW, only provided to fully support the possibility of use
            else {
                var i = 0;
                var target = this._firstChild;
                while (i < index) {
                    target = target.nextChild;
                    ++i;
                }
                // insert before the target that we found at the specified index
                target.prevChild.nextChild = c;
                c.prevChild = target.prevChild;
                c.nextChild = target;
                target.prevChild = c;
            }
            // update child count
            ++this._childCount;
            // ensure bounds will be recalculated
            this._boundsID++;
            // TODO - lets either do all callbacks or all events.. not both!
            this.onChildrenChange(index); // the PixiJS types say this has no arguments
            child.emit('added', this);
            this.emit('childAdded', child, this, index);
            return child;
        };
        /**
         * Adds a child to the container to be rendered below another child.
         *
         * @param child The child to add
         * @param relative - The current child to add the new child relative to.
         * @return The child that was added.
         */
        LinkedListContainer.prototype.addChildBelow = function (child, relative) {
            if (relative.parent !== this) {
                throw new Error("addChildBelow: The relative target must be a child of this parent");
            }
            if (child.parent) {
                child.parent.removeChild(child);
            }
            child.parent = this;
            this.sortDirty = true;
            // ensure child transform will be recalculated
            child.transform._parentID = -1;
            // insert before the target that we were given
            relative.prevChild.nextChild = child;
            child.prevChild = relative.prevChild;
            child.nextChild = relative;
            relative.prevChild = child;
            if (this._firstChild === relative) {
                this._firstChild = child;
            }
            // update child count
            ++this._childCount;
            // ensure bounds will be recalculated
            this._boundsID++;
            // TODO - lets either do all callbacks or all events.. not both!
            this.onChildrenChange();
            this.emit('childAdded', child, this, this._childCount);
            child.emit('added', this);
            return child;
        };
        /**
         * Adds a child to the container to be rendered above another child.
         *
         * @param child The child to add
         * @param relative - The current child to add the new child relative to.
         * @return The child that was added.
         */
        LinkedListContainer.prototype.addChildAbove = function (child, relative) {
            if (relative.parent !== this) {
                throw new Error("addChildBelow: The relative target must be a child of this parent");
            }
            if (child.parent) {
                child.parent.removeChild(child);
            }
            child.parent = this;
            this.sortDirty = true;
            // ensure child transform will be recalculated
            child.transform._parentID = -1;
            // insert after the target that we were given
            relative.nextChild.prevChild = child;
            child.nextChild = relative.nextChild;
            child.prevChild = relative;
            relative.nextChild = child;
            if (this._lastChild === relative) {
                this._lastChild = child;
            }
            // update child count
            ++this._childCount;
            // ensure bounds will be recalculated
            this._boundsID++;
            // TODO - lets either do all callbacks or all events.. not both!
            this.onChildrenChange();
            this.emit('childAdded', child, this, this._childCount);
            child.emit('added', this);
            return child;
        };
        LinkedListContainer.prototype.swapChildren = function (child, child2) {
            if (child === child2 || child.parent !== this || child2.parent !== this) {
                return;
            }
            var _a = child, prevChild = _a.prevChild, nextChild = _a.nextChild;
            child.prevChild = child2.prevChild;
            child.nextChild = child2.nextChild;
            child2.prevChild = prevChild;
            child2.nextChild = nextChild;
            if (this._firstChild === child) {
                this._firstChild = child2;
            }
            else if (this._firstChild === child2) {
                this._firstChild = child;
            }
            if (this._lastChild === child) {
                this._lastChild = child2;
            }
            else if (this._lastChild === child2) {
                this._lastChild = child;
            }
            this.onChildrenChange();
        };
        LinkedListContainer.prototype.getChildIndex = function (child) {
            var index = 0;
            var test = this._firstChild;
            while (test) {
                if (test === child) {
                    break;
                }
                test = test.nextChild;
                ++index;
            }
            if (!test) {
                throw new Error('The supplied DisplayObject must be a child of the caller');
            }
            return index;
        };
        LinkedListContainer.prototype.setChildIndex = function (child, index) {
            if (index < 0 || index >= this._childCount) {
                throw new Error("The index " + index + " supplied is out of bounds " + this._childCount);
            }
            if (child.parent !== this) {
                throw new Error('The supplied DisplayObject must be a child of the caller');
            }
            // remove child
            if (child.nextChild) {
                child.nextChild.prevChild = child.prevChild;
            }
            if (child.prevChild) {
                child.prevChild.nextChild = child.nextChild;
            }
            if (this._firstChild === child) {
                this._firstChild = child.nextChild;
            }
            if (this._lastChild === child) {
                this._lastChild = child.prevChild;
            }
            child.nextChild = null;
            child.prevChild = null;
            // do addChildAt
            if (!this._firstChild) {
                this._firstChild = this._lastChild = child;
            }
            else if (index === 0) {
                this._firstChild.prevChild = child;
                child.nextChild = this._firstChild;
                this._firstChild = child;
            }
            else if (index === this._childCount) {
                this._lastChild.nextChild = child;
                child.prevChild = this._lastChild;
                this._lastChild = child;
            }
            else {
                var i = 0;
                var target = this._firstChild;
                while (i < index) {
                    target = target.nextChild;
                    ++i;
                }
                target.prevChild.nextChild = child;
                child.prevChild = target.prevChild;
                child.nextChild = target;
                target.prevChild = child;
            }
            this.onChildrenChange(index);
        };
        LinkedListContainer.prototype.removeChild = function () {
            var children = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                children[_i] = arguments[_i];
            }
            // if there is only one argument we can bypass looping through the them
            if (children.length > 1) {
                // loop through the arguments property and remove all children
                for (var i = 0; i < children.length; i++) {
                    this.removeChild(children[i]);
                }
            }
            else {
                var child = children[0];
                // bail if not actually our child
                if (child.parent !== this)
                    return null;
                child.parent = null;
                // ensure child transform will be recalculated
                child.transform._parentID = -1;
                // swap out child references
                if (child.nextChild) {
                    child.nextChild.prevChild = child.prevChild;
                }
                if (child.prevChild) {
                    child.prevChild.nextChild = child.nextChild;
                }
                if (this._firstChild === child) {
                    this._firstChild = child.nextChild;
                }
                if (this._lastChild === child) {
                    this._lastChild = child.prevChild;
                }
                // clear sibling references
                child.nextChild = null;
                child.prevChild = null;
                // update child count
                --this._childCount;
                // ensure bounds will be recalculated
                this._boundsID++;
                // TODO - lets either do all callbacks or all events.. not both!
                this.onChildrenChange();
                child.emit('removed', this);
                this.emit('childRemoved', child, this);
            }
            return children[0];
        };
        LinkedListContainer.prototype.getChildAt = function (index) {
            if (index < 0 || index >= this._childCount) {
                throw new Error("getChildAt: Index (" + index + ") does not exist.");
            }
            if (index === 0) {
                return this._firstChild;
            }
            // add at end (front)
            else if (index === this._childCount) {
                return this._lastChild;
            }
            // otherwise we have to start counting through the children to find the right one
            // - SLOW, only provided to fully support the possibility of use
            var i = 0;
            var target = this._firstChild;
            while (i < index) {
                target = target.nextChild;
                ++i;
            }
            return target;
        };
        LinkedListContainer.prototype.removeChildAt = function (index) {
            var child = this.getChildAt(index);
            // ensure child transform will be recalculated..
            child.parent = null;
            child.transform._parentID = -1;
            // swap out child references
            if (child.nextChild) {
                child.nextChild.prevChild = child.prevChild;
            }
            if (child.prevChild) {
                child.prevChild.nextChild = child.nextChild;
            }
            if (this._firstChild === child) {
                this._firstChild = child.nextChild;
            }
            if (this._lastChild === child) {
                this._lastChild = child.prevChild;
            }
            // clear sibling references
            child.nextChild = null;
            child.prevChild = null;
            // update child count
            --this._childCount;
            // ensure bounds will be recalculated
            this._boundsID++;
            // TODO - lets either do all callbacks or all events.. not both!
            this.onChildrenChange(index); // the PixiJS types say this has no arguments
            child.emit('removed', this);
            this.emit('childRemoved', child, this, index);
            return child;
        };
        LinkedListContainer.prototype.removeChildren = function (beginIndex, endIndex) {
            if (beginIndex === void 0) { beginIndex = 0; }
            if (endIndex === void 0) { endIndex = this._childCount; }
            var begin = beginIndex;
            var end = endIndex;
            var range = end - begin;
            if (range > 0 && range <= end) {
                var removed = [];
                var child = this._firstChild;
                for (var i = 0; i <= end && child; ++i, child = child.nextChild) {
                    if (i >= begin) {
                        removed.push(child);
                    }
                }
                // child before removed section
                var prevChild = removed[0].prevChild;
                // child after removed section
                var nextChild = removed[removed.length - 1].nextChild;
                if (!nextChild) {
                    // if we removed the last child, then the new last child is the one before
                    // the removed section
                    this._lastChild = prevChild;
                }
                else {
                    // otherwise, stitch the child before the section to the child after
                    nextChild.prevChild = prevChild;
                }
                if (!prevChild) {
                    // if we removed the first child, then the new first child is the one after
                    // the removed section
                    this._firstChild = nextChild;
                }
                else {
                    // otherwise stich the child after the section to the one before
                    prevChild.nextChild = nextChild;
                }
                for (var i = 0; i < removed.length; ++i) {
                    // clear parenting and sibling references for all removed children
                    removed[i].parent = null;
                    if (removed[i].transform) {
                        removed[i].transform._parentID = -1;
                    }
                    removed[i].nextChild = null;
                    removed[i].prevChild = null;
                }
                this._boundsID++;
                this.onChildrenChange(beginIndex);
                for (var i = 0; i < removed.length; ++i) {
                    removed[i].emit('removed', this);
                    this.emit('childRemoved', removed[i], this, i);
                }
                return removed;
            }
            else if (range === 0 && this._childCount === 0) {
                return [];
            }
            throw new RangeError('removeChildren: numeric values are outside the acceptable range.');
        };
        /**
         * Updates the transform on all children of this container for rendering.
         * Copied from and overrides PixiJS v5 method (v4 method is identical)
         */
        LinkedListContainer.prototype.updateTransform = function () {
            this._boundsID++;
            this.transform.updateTransform(this.parent.transform);
            // TODO: check render flags, how to process stuff here
            this.worldAlpha = this.alpha * this.parent.worldAlpha;
            var child;
            var next;
            for (child = this._firstChild; child; child = next) {
                next = child.nextChild;
                if (child.visible) {
                    child.updateTransform();
                }
            }
        };
        /**
         * Recalculates the bounds of the container.
         * Copied from and overrides PixiJS v5 method (v4 method is identical)
         */
        LinkedListContainer.prototype.calculateBounds = function () {
            this._bounds.clear();
            this._calculateBounds();
            var child;
            var next;
            for (child = this._firstChild; child; child = next) {
                next = child.nextChild;
                if (!child.visible || !child.renderable) {
                    continue;
                }
                child.calculateBounds();
                // TODO: filter+mask, need to mask both somehow
                if (child._mask) {
                    var maskObject = (child._mask.maskObject || child._mask);
                    maskObject.calculateBounds();
                    this._bounds.addBoundsMask(child._bounds, maskObject._bounds);
                }
                else if (child.filterArea) {
                    this._bounds.addBoundsArea(child._bounds, child.filterArea);
                }
                else {
                    this._bounds.addBounds(child._bounds);
                }
            }
            this._bounds.updateID = this._boundsID;
        };
        /**
         * Retrieves the local bounds of the displayObject as a rectangle object. Copied from and overrides PixiJS v5 method
         */
        LinkedListContainer.prototype.getLocalBounds = function (rect, skipChildrenUpdate) {
            if (skipChildrenUpdate === void 0) { skipChildrenUpdate = false; }
            // skip Container's getLocalBounds, go directly to DisplayObject
            var result = pixi.DisplayObject.prototype.getLocalBounds.call(this, rect);
            if (!skipChildrenUpdate) {
                var child = void 0;
                var next = void 0;
                for (child = this._firstChild; child; child = next) {
                    next = child.nextChild;
                    if (child.visible) {
                        child.updateTransform();
                    }
                }
            }
            return result;
        };
        /**
         * Renders the object using the WebGL renderer. Copied from and overrides PixiJS v5 method
         */
        LinkedListContainer.prototype.render = function (renderer) {
            // if the object is not visible or the alpha is 0 then no need to render this element
            if (!this.visible || this.worldAlpha <= 0 || !this.renderable) {
                return;
            }
            // do a quick check to see if this element has a mask or a filter.
            if (this._mask || (this.filters && this.filters.length)) {
                this.renderAdvanced(renderer);
            }
            else {
                this._render(renderer);
                var child = void 0;
                var next = void 0;
                // simple render children!
                for (child = this._firstChild; child; child = next) {
                    next = child.nextChild;
                    child.render(renderer);
                }
            }
        };
        /**
         * Render the object using the WebGL renderer and advanced features. Copied from and overrides PixiJS v5 method
         */
        LinkedListContainer.prototype.renderAdvanced = function (renderer) {
            renderer.batch.flush();
            var filters = this.filters;
            var mask = this._mask;
            // _enabledFilters note: As of development, _enabledFilters is not documented in pixi.js
            // types but is in code of current release (5.2.4).
            // push filter first as we need to ensure the stencil buffer is correct for any masking
            if (filters) {
                if (!this._enabledFilters) {
                    this._enabledFilters = [];
                }
                this._enabledFilters.length = 0;
                for (var i = 0; i < filters.length; i++) {
                    if (filters[i].enabled) {
                        this._enabledFilters.push(filters[i]);
                    }
                }
                if (this._enabledFilters.length) {
                    renderer.filter.push(this, this._enabledFilters);
                }
            }
            if (mask) {
                renderer.mask.push(this, this._mask);
            }
            // add this object to the batch, only rendered if it has a texture.
            this._render(renderer);
            var child;
            var next;
            // now loop through the children and make sure they get rendered
            for (child = this._firstChild; child; child = next) {
                next = child.nextChild;
                child.render(renderer);
            }
            renderer.batch.flush();
            if (mask) {
                renderer.mask.pop(this);
            }
            if (filters && this._enabledFilters && this._enabledFilters.length) {
                renderer.filter.pop();
            }
        };
        /**
         * Renders the object using the WebGL renderer. Copied from and overrides PixiJS V4 method.
         */
        LinkedListContainer.prototype.renderWebGL = function (renderer) {
            // if the object is not visible or the alpha is 0 then no need to render this element
            if (!this.visible || this.worldAlpha <= 0 || !this.renderable) {
                return;
            }
            // do a quick check to see if this element has a mask or a filter.
            if (this._mask || (this.filters && this.filters.length)) {
                this.renderAdvancedWebGL(renderer);
            }
            else {
                this._renderWebGL(renderer);
                var child = void 0;
                var next = void 0;
                // simple render children!
                for (child = this._firstChild; child; child = next) {
                    next = child.nextChild;
                    child.renderWebGL(renderer);
                }
            }
        };
        /**
         * Render the object using the WebGL renderer and advanced features. Copied from and overrides PixiJS V4 method.
         */
        LinkedListContainer.prototype.renderAdvancedWebGL = function (renderer) {
            renderer.flush();
            // _filters is a v4 specific property
            var filters = this._filters;
            var mask = this._mask;
            // push filter first as we need to ensure the stencil buffer is correct for any masking
            if (filters) {
                if (!this._enabledFilters) {
                    this._enabledFilters = [];
                }
                this._enabledFilters.length = 0;
                for (var i = 0; i < filters.length; i++) {
                    if (filters[i].enabled) {
                        this._enabledFilters.push(filters[i]);
                    }
                }
                if (this._enabledFilters.length) {
                    renderer.filterManager.pushFilter(this, this._enabledFilters);
                }
            }
            if (mask) {
                renderer.maskManager.pushMask(this, this._mask);
            }
            // add this object to the batch, only rendered if it has a texture.
            this._renderWebGL(renderer);
            var child;
            var next;
            // now loop through the children and make sure they get rendered
            for (child = this._firstChild; child; child = next) {
                next = child.nextChild;
                child.renderWebGL(renderer);
            }
            renderer.flush();
            if (mask) {
                renderer.maskManager.popMask(this, this._mask);
            }
            if (filters && this._enabledFilters && this._enabledFilters.length) {
                renderer.filterManager.popFilter();
            }
        };
        /**
         * Renders the object using the Canvas renderer. Copied from and overrides PixiJS V4 method or Canvas mixin in V5.
         */
        LinkedListContainer.prototype.renderCanvas = function (renderer) {
            // if not visible or the alpha is 0 then no need to render this
            if (!this.visible || this.worldAlpha <= 0 || !this.renderable) {
                return;
            }
            if (this._mask) {
                renderer.maskManager.pushMask(this._mask);
            }
            this._renderCanvas(renderer);
            var child;
            var next;
            for (child = this._firstChild; child; child = next) {
                next = child.nextChild;
                child.renderCanvas(renderer);
            }
            if (this._mask) {
                renderer.maskManager.popMask(renderer);
            }
        };
        return LinkedListContainer;
    }(pixi.Container));

    exports.AnimatedParticle = AnimatedParticle;
    exports.Emitter = Emitter;
    exports.GetTextureFromString = GetTextureFromString;
    exports.LinkedListContainer = LinkedListContainer;
    exports.Particle = Particle;
    exports.PathParticle = PathParticle;
    exports.PolygonalChain = PolygonalChain;
    exports.PropertyList = PropertyList;
    exports.PropertyNode = PropertyNode;

}(this.PIXI.particles = this.PIXI.particles || {}, PIXI));
//# sourceMappingURL=pixi-particles.js.map
