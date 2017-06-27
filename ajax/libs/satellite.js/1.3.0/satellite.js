(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        //Allow using this built library as an AMD module
        //in another project. That other project will only
        //see this AMD call, not the internal modules in
        //the closure below.
        define([], factory);
    } else {
        //Browser globals case. Just assign the
        //result to a property on the global.
        root.satellite = factory();
    }
}(this, function () {/**
 * @license almond 0.2.9 Copyright (c) 2011-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */
//Going sloppy to avoid 'use strict' string cost, but strict practices should
//be followed.
/*jslint sloppy: true */
/*global setTimeout: false */

var requirejs, require, define;
(function (undef) {
    var main, req, makeMap, handlers,
        defined = {},
        waiting = {},
        config = {},
        defining = {},
        hasOwn = Object.prototype.hasOwnProperty,
        aps = [].slice,
        jsSuffixRegExp = /\.js$/;

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    /**
     * Given a relative module name, like ./something, normalize it to
     * a real name that can be mapped to a path.
     * @param {String} name the relative name
     * @param {String} baseName a real name that the name arg is relative
     * to.
     * @returns {String} normalized name
     */
    function normalize(name, baseName) {
        var nameParts, nameSegment, mapValue, foundMap, lastIndex,
            foundI, foundStarMap, starI, i, j, part,
            baseParts = baseName && baseName.split("/"),
            map = config.map,
            starMap = (map && map['*']) || {};

        //Adjust any relative paths.
        if (name && name.charAt(0) === ".") {
            //If have a base name, try to normalize against it,
            //otherwise, assume it is a top-level require that will
            //be relative to baseUrl in the end.
            if (baseName) {
                //Convert baseName to array, and lop off the last part,
                //so that . matches that "directory" and not name of the baseName's
                //module. For instance, baseName of "one/two/three", maps to
                //"one/two/three.js", but we want the directory, "one/two" for
                //this normalization.
                baseParts = baseParts.slice(0, baseParts.length - 1);
                name = name.split('/');
                lastIndex = name.length - 1;

                // Node .js allowance:
                if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                    name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
                }

                name = baseParts.concat(name);

                //start trimDots
                for (i = 0; i < name.length; i += 1) {
                    part = name[i];
                    if (part === ".") {
                        name.splice(i, 1);
                        i -= 1;
                    } else if (part === "..") {
                        if (i === 1 && (name[2] === '..' || name[0] === '..')) {
                            //End of the line. Keep at least one non-dot
                            //path segment at the front so it can be mapped
                            //correctly to disk. Otherwise, there is likely
                            //no path mapping for a path starting with '..'.
                            //This can still fail, but catches the most reasonable
                            //uses of ..
                            break;
                        } else if (i > 0) {
                            name.splice(i - 1, 2);
                            i -= 2;
                        }
                    }
                }
                //end trimDots

                name = name.join("/");
            } else if (name.indexOf('./') === 0) {
                // No baseName, so this is ID is resolved relative
                // to baseUrl, pull off the leading dot.
                name = name.substring(2);
            }
        }

        //Apply map config if available.
        if ((baseParts || starMap) && map) {
            nameParts = name.split('/');

            for (i = nameParts.length; i > 0; i -= 1) {
                nameSegment = nameParts.slice(0, i).join("/");

                if (baseParts) {
                    //Find the longest baseName segment match in the config.
                    //So, do joins on the biggest to smallest lengths of baseParts.
                    for (j = baseParts.length; j > 0; j -= 1) {
                        mapValue = map[baseParts.slice(0, j).join('/')];

                        //baseName segment has  config, find if it has one for
                        //this name.
                        if (mapValue) {
                            mapValue = mapValue[nameSegment];
                            if (mapValue) {
                                //Match, update name to the new value.
                                foundMap = mapValue;
                                foundI = i;
                                break;
                            }
                        }
                    }
                }

                if (foundMap) {
                    break;
                }

                //Check for a star map match, but just hold on to it,
                //if there is a shorter segment match later in a matching
                //config, then favor over this star map.
                if (!foundStarMap && starMap && starMap[nameSegment]) {
                    foundStarMap = starMap[nameSegment];
                    starI = i;
                }
            }

            if (!foundMap && foundStarMap) {
                foundMap = foundStarMap;
                foundI = starI;
            }

            if (foundMap) {
                nameParts.splice(0, foundI, foundMap);
                name = nameParts.join('/');
            }
        }

        return name;
    }

    function makeRequire(relName, forceSync) {
        return function () {
            //A version of a require function that passes a moduleName
            //value for items that may need to
            //look up paths relative to the moduleName
            return req.apply(undef, aps.call(arguments, 0).concat([relName, forceSync]));
        };
    }

    function makeNormalize(relName) {
        return function (name) {
            return normalize(name, relName);
        };
    }

    function makeLoad(depName) {
        return function (value) {
            defined[depName] = value;
        };
    }

    function callDep(name) {
        if (hasProp(waiting, name)) {
            var args = waiting[name];
            delete waiting[name];
            defining[name] = true;
            main.apply(undef, args);
        }

        if (!hasProp(defined, name) && !hasProp(defining, name)) {
            throw new Error('No ' + name);
        }
        return defined[name];
    }

    //Turns a plugin!resource to [plugin, resource]
    //with the plugin being undefined if the name
    //did not have a plugin prefix.
    function splitPrefix(name) {
        var prefix,
            index = name ? name.indexOf('!') : -1;
        if (index > -1) {
            prefix = name.substring(0, index);
            name = name.substring(index + 1, name.length);
        }
        return [prefix, name];
    }

    /**
     * Makes a name map, normalizing the name, and using a plugin
     * for normalization if necessary. Grabs a ref to plugin
     * too, as an optimization.
     */
    makeMap = function (name, relName) {
        var plugin,
            parts = splitPrefix(name),
            prefix = parts[0];

        name = parts[1];

        if (prefix) {
            prefix = normalize(prefix, relName);
            plugin = callDep(prefix);
        }

        //Normalize according
        if (prefix) {
            if (plugin && plugin.normalize) {
                name = plugin.normalize(name, makeNormalize(relName));
            } else {
                name = normalize(name, relName);
            }
        } else {
            name = normalize(name, relName);
            parts = splitPrefix(name);
            prefix = parts[0];
            name = parts[1];
            if (prefix) {
                plugin = callDep(prefix);
            }
        }

        //Using ridiculous property names for space reasons
        return {
            f: prefix ? prefix + '!' + name : name, //fullName
            n: name,
            pr: prefix,
            p: plugin
        };
    };

    function makeConfig(name) {
        return function () {
            return (config && config.config && config.config[name]) || {};
        };
    }

    handlers = {
        require: function (name) {
            return makeRequire(name);
        },
        exports: function (name) {
            var e = defined[name];
            if (typeof e !== 'undefined') {
                return e;
            } else {
                return (defined[name] = {});
            }
        },
        module: function (name) {
            return {
                id: name,
                uri: '',
                exports: defined[name],
                config: makeConfig(name)
            };
        }
    };

    main = function (name, deps, callback, relName) {
        var cjsModule, depName, ret, map, i,
            args = [],
            callbackType = typeof callback,
            usingExports;

        //Use name if no relName
        relName = relName || name;

        //Call the callback to define the module, if necessary.
        if (callbackType === 'undefined' || callbackType === 'function') {
            //Pull out the defined dependencies and pass the ordered
            //values to the callback.
            //Default to [require, exports, module] if no deps
            deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;
            for (i = 0; i < deps.length; i += 1) {
                map = makeMap(deps[i], relName);
                depName = map.f;

                //Fast path CommonJS standard dependencies.
                if (depName === "require") {
                    args[i] = handlers.require(name);
                } else if (depName === "exports") {
                    //CommonJS module spec 1.1
                    args[i] = handlers.exports(name);
                    usingExports = true;
                } else if (depName === "module") {
                    //CommonJS module spec 1.1
                    cjsModule = args[i] = handlers.module(name);
                } else if (hasProp(defined, depName) ||
                           hasProp(waiting, depName) ||
                           hasProp(defining, depName)) {
                    args[i] = callDep(depName);
                } else if (map.p) {
                    map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
                    args[i] = defined[depName];
                } else {
                    throw new Error(name + ' missing ' + depName);
                }
            }

            ret = callback ? callback.apply(defined[name], args) : undefined;

            if (name) {
                //If setting exports via "module" is in play,
                //favor that over return value and exports. After that,
                //favor a non-undefined return value over exports use.
                if (cjsModule && cjsModule.exports !== undef &&
                        cjsModule.exports !== defined[name]) {
                    defined[name] = cjsModule.exports;
                } else if (ret !== undef || !usingExports) {
                    //Use the return value from the function.
                    defined[name] = ret;
                }
            }
        } else if (name) {
            //May just be an object definition for the module. Only
            //worry about defining if have a module name.
            defined[name] = callback;
        }
    };

    requirejs = require = req = function (deps, callback, relName, forceSync, alt) {
        if (typeof deps === "string") {
            if (handlers[deps]) {
                //callback in this case is really relName
                return handlers[deps](callback);
            }
            //Just return the module wanted. In this scenario, the
            //deps arg is the module name, and second arg (if passed)
            //is just the relName.
            //Normalize module name, if it contains . or ..
            return callDep(makeMap(deps, callback).f);
        } else if (!deps.splice) {
            //deps is a config object, not an array.
            config = deps;
            if (config.deps) {
                req(config.deps, config.callback);
            }
            if (!callback) {
                return;
            }

            if (callback.splice) {
                //callback is an array, which means it is a dependency list.
                //Adjust args if there are dependencies
                deps = callback;
                callback = relName;
                relName = null;
            } else {
                deps = undef;
            }
        }

        //Support require(['a'])
        callback = callback || function () {};

        //If relName is a function, it is an errback handler,
        //so remove it.
        if (typeof relName === 'function') {
            relName = forceSync;
            forceSync = alt;
        }

        //Simulate async callback;
        if (forceSync) {
            main(undef, deps, callback, relName);
        } else {
            //Using a non-zero value because of concern for what old browsers
            //do, and latest browsers "upgrade" to 4 if lower value is used:
            //http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#dom-windowtimers-settimeout:
            //If want a value immediately, use require('id') instead -- something
            //that works in almond on the global level, but not guaranteed and
            //unlikely to work in other AMD implementations.
            setTimeout(function () {
                main(undef, deps, callback, relName);
            }, 4);
        }

        return req;
    };

    /**
     * Just drops the config on the floor, but returns req in case
     * the config return value is used.
     */
    req.config = function (cfg) {
        return req(cfg);
    };

    /**
     * Expose module registry for debugging and tooling
     */
    requirejs._defined = defined;

    define = function (name, deps, callback) {

        //This module may not have dependencies
        if (!deps.splice) {
            //deps is not an array, so probably means
            //an object literal or factory function for
            //the value. Adjust args.
            callback = deps;
            deps = [];
        }

        if (!hasProp(defined, name) && !hasProp(waiting, name)) {
            waiting[name] = [name, deps, callback];
        }
    };

    define.amd = {
        jQuery: true
    };
}());

define("almond", function(){});

/*
 * satellite-js v1.2
 * (c) 2013 Shashwat Kandadai and UCSC
 * https://github.com/shashwatak/satellite-js
 * License: MIT
 */

define('constants',[], function() {
    'use strict';

    var pi = Math.PI,
        mu = 398600.5,                  // in km3 / s2
        earthRadius =  6378.137,        // in km
        xke = 60.0 / Math.sqrt(earthRadius * earthRadius * earthRadius / mu),
        j2 = 0.00108262998905,
        j3 = -0.00000253215306;

    return {
        pi: pi,
        twoPi: pi * 2,
        deg2rad: pi / 180.0,
        rad2deg: 180 / pi,
        minutesPerDay: 1440.0,
        mu: mu,
        earthRadius: earthRadius,
        xke: xke,
        tumin: 1.0 / xke,
        j2: j2,
        j3: j3,
        j4: -0.00000161098761,
        j3oj2: j3 / j2,
        x2o3: 2.0 / 3.0
    };
});
/*
 * satellite-js v1.2
 * (c) 2013 Shashwat Kandadai and UCSC
 * https://github.com/shashwatak/satellite-js
 * License: MIT
 */

define('coordinate-transforms/degrees-lat',[
    '../constants'
], function(
    constants
) {
    'use strict';

    return function(radians) {
        if (radians > constants.pi/2 || radians < (-constants.pi/2)){
            return 'Err';
        }
        var degrees = (radians/constants.pi*180);
        if (degrees < 0){
            degrees = degrees;
        }
        else{
            degrees = degrees;
        }
        return degrees;
    };
});
/*
 * satellite-js v1.2
 * (c) 2013 Shashwat Kandadai and UCSC
 * https://github.com/shashwatak/satellite-js
 * License: MIT
 */

define('coordinate-transforms/degrees-long',[
    '../constants'
], function(
    constants
) {
    'use strict';

    return function (radians) {
        var degrees = (radians/constants.pi*180) % (360);
        if (degrees > 180){
            degrees = 360 - degrees;
        }
        else if (degrees < -180){
            degrees = 360 + degrees;
        }
        return degrees;
    };
});
/*
 * satellite-js v1.2
 * (c) 2013 Shashwat Kandadai and UCSC
 * https://github.com/shashwatak/satellite-js
 * License: MIT
 */

define('coordinate-transforms/ecf-to-eci',[], function() {
    'use strict';

    return function ecfToEci (ecfCoords, gmst){
        // ccar.colorado.edu/ASEN5070/handouts/coordsys.doc
        //
        // [X]     [C -S  0][X]
        // [Y]  =  [S  C  0][Y]
        // [Z]eci  [0  0  1][Z]ecf
        //
        var X = (ecfCoords.x * Math.cos(gmst))    - (ecfCoords.y * Math.sin(gmst));
        var Y = (ecfCoords.x * (Math.sin(gmst)))  + (ecfCoords.y * Math.cos(gmst));
        var Z =  ecfCoords.z;
        return { x : X, y : Y, z : Z };
    };
});
/*
 * satellite-js v1.2
 * (c) 2013 Shashwat Kandadai and UCSC
 * https://github.com/shashwatak/satellite-js
 * License: MIT
 */

define('coordinate-transforms/geodetic-to-ecf',[], function() {
    'use strict';

    return function (geodeticCoords) {
        var longitude   = geodeticCoords.longitude;
        var latitude    = geodeticCoords.latitude;
        var height      = geodeticCoords.height;
        var a           = 6378.137;
        var b           = 6356.7523142;
        var f           = (a - b)/a;
        var e2          = ((2*f) - (f*f));
        var normal      = a / Math.sqrt( 1 - (e2*(Math.sin(latitude)*Math.sin(latitude))));

        var X           = (normal + height) * Math.cos (latitude) * Math.cos (longitude);
        var Y           = (normal + height) * Math.cos (latitude) * Math.sin (longitude);
        var Z           = ((normal*(1-e2)) + height) * Math.sin (latitude);
        return { x : X, y : Y, z : Z };
    };
});
/*
 * satellite-js v1.2
 * (c) 2013 Shashwat Kandadai and UCSC
 * https://github.com/shashwatak/satellite-js
 * License: MIT
 */

define('coordinate-transforms/topocentric',[
    './geodetic-to-ecf'
], function(
    geodeticToEcf
) {
    'use strict';

    return function(observerCoords, satelliteCoords) {
        // http://www.celestrak.com/columns/v02n02/
        // TS Kelso's method, except I'm using ECF frame
        // and he uses ECI.

        var longitude   = observerCoords.longitude;
        var latitude    = observerCoords.latitude;

        // TODO: defined but never used
        //var height      = observerCoords.height;

        var observerEcf = geodeticToEcf (observerCoords);

        var rx      = satelliteCoords.x - observerEcf.x;
        var ry      = satelliteCoords.y - observerEcf.y;
        var rz      = satelliteCoords.z - observerEcf.z;

        var topS   = ( (Math.sin(latitude) * Math.cos(longitude) * rx) +
        (Math.sin(latitude) * Math.sin(longitude) * ry) -
        (Math.cos(latitude) * rz));
        var topE   = ( -Math.sin(longitude) * rx) + (Math.cos(longitude) * ry);
        var topZ   = ( (Math.cos(latitude)*Math.cos(longitude)*rx) +
        (Math.cos(latitude)*Math.sin(longitude)*ry) +
        (Math.sin(latitude)*rz));
        return { topS : topS, topE : topE, topZ : topZ };
    };
});
/*
 * satellite-js v1.2
 * (c) 2013 Shashwat Kandadai and UCSC
 * https://github.com/shashwatak/satellite-js
 * License: MIT
 */

define('coordinate-transforms/topocentric-to-look-angles',[
    '../constants'
], function(
    constants
) {
    'use strict';

    /**
     * @param {Object} topocentric
     * @param {Number} topocentric.topS Positive horizontal vector S due south.
     * @param {Number} topocentric.topE Positive horizontal vector E due east.
     * @param {Number} topocentric.topZ Vector Z normal to the surface of the earth (up).
     * @returns {Object}
     */
    return function(topocentric) {
        var topS = topocentric.topS;
        var topE = topocentric.topE;
        var topZ = topocentric.topZ;
        var rangeSat    = Math.sqrt((topS*topS) + (topE*topE) + (topZ*topZ));
        var El      = Math.asin (topZ/rangeSat);
        var Az      = Math.atan2 (-topE, topS) + constants.pi;

        return {
            azimuth : Az,
            elevation : El,
            rangeSat : rangeSat  // Range in km.
        };
    };
});

/*
 * satellite-js v1.2
 * (c) 2013 Shashwat Kandadai and UCSC
 * https://github.com/shashwatak/satellite-js
 * License: MIT
 */

define('coordinate-transforms/ecf-to-look-angles',[
    './topocentric',
    './topocentric-to-look-angles'
], function(
    topocentric,
    topocentricToLookAngles
) {
    'use strict';

    return function (observerCoordsEcf, satelliteCoordsEcf) {
        var topocentricCoords = topocentric(observerCoordsEcf, satelliteCoordsEcf);
        return topocentricToLookAngles(topocentricCoords);
    };
});
/*
 * satellite-js v1.2
 * (c) 2013 Shashwat Kandadai and UCSC
 * https://github.com/shashwatak/satellite-js
 * License: MIT
 */

define('coordinate-transforms/eci-to-ecf',[], function() {
    'use strict';

    return function(eciCoords, gmst){
        // ccar.colorado.edu/ASEN5070/handouts/coordsys.doc
        //
        // [X]     [C -S  0][X]
        // [Y]  =  [S  C  0][Y]
        // [Z]eci  [0  0  1][Z]ecf
        //
        //
        // Inverse:
        // [X]     [C  S  0][X]
        // [Y]  =  [-S C  0][Y]
        // [Z]ecf  [0  0  1][Z]eci

        var X = (eciCoords.x * Math.cos(gmst))    + (eciCoords.y * Math.sin(gmst));
        var Y = (eciCoords.x * (-Math.sin(gmst))) + (eciCoords.y * Math.cos(gmst));
        var Z =  eciCoords.z;
        return { x : X, y : Y, z : Z };
    };
});
/*
 * satellite-js v1.2
 * (c) 2013 Shashwat Kandadai and UCSC
 * https://github.com/shashwatak/satellite-js
 * License: MIT
 */

define('coordinate-transforms/eci-to-geodetic',[], function() {
    'use strict';

    return function (eciCoords, gmst) {
        // http://www.celestrak.com/columns/v02n03/
        var a   = 6378.137;
        var b   = 6356.7523142;
        var R   = Math.sqrt( (eciCoords.x * eciCoords.x) + (eciCoords.y * eciCoords.y) );
        var f   = (a - b)/a;
        var e2  = ((2*f) - (f*f));
        var longitude = Math.atan2(eciCoords.y, eciCoords.x) - gmst;
        var kmax = 20;
        var k = 0;
        var latitude = Math.atan2(eciCoords.z,
            Math.sqrt(eciCoords.x * eciCoords.x +
            eciCoords.y * eciCoords.y));
        var C;
        while (k < kmax){
            C = 1 / Math.sqrt( 1 - e2*(Math.sin(latitude)*Math.sin(latitude)) );
            latitude = Math.atan2 (eciCoords.z + (a*C*e2*Math.sin(latitude)), R);
            k += 1;
        }
        var height = (R/Math.cos(latitude)) - (a*C);
        return { longitude : longitude, latitude : latitude, height : height };
    };
});
/*
 * satellite-js v1.2
 * (c) 2013 Shashwat Kandadai and UCSC
 * https://github.com/shashwatak/satellite-js
 * License: MIT
 */

define('doppler-factor',[], function() {
    'use strict';

    return function (myLocation, position, velocity) {
        var currentRange = Math.sqrt(
            Math.pow(position.x - myLocation.x, 2) +
            Math.pow(position.y - myLocation.y, 2) +
            Math.pow(position.z - myLocation.z, 2));
        var nextPos   = {
            x : position.x + velocity.x,
            y : position.y + velocity.y,
            z : position.z + velocity.z
        };
        var nextRange =  Math.sqrt(
            Math.pow(nextPos.x - myLocation.x, 2) +
            Math.pow(nextPos.y - myLocation.y, 2) +
            Math.pow(nextPos.z - myLocation.z, 2));
        var rangeRate =  nextRange - currentRange;

        function sign(value) {
            return value >= 0 ? 1 : -1;
        }

        rangeRate *= sign(rangeRate);
        var c = 299792.458; // Speed of light in km/s
        var factor = (1 + rangeRate/c);
        return factor;
    };
});
define('gstime/days2mdhms',[], function() {
    'use strict';

    return function(year, days){
        /* -----------------------------------------------------------------------------
         *
         *                           procedure days2mdhms
         *
         *  this procedure converts the day of the year, days, to the equivalent month
         *    day, hour, minute and second.
         *
         *  algorithm     : set up array for the number of days per month
         *                  find leap year - use 1900 because 2000 is a leap year
         *                  loop through a temp value while the value is < the days
         *                  perform int conversions to the correct day and month
         *                  convert remainder into h m s using type conversions
         *
         *  author        : david vallado                  719-573-2600    1 mar 2001
         *
         *  inputs          description                    range / units
         *    year        - year                           1900 .. 2100
         *    days        - julian day of the year         0.0  .. 366.0
         *
         *  outputs       :
         *    mon         - month                          1 .. 12
         *    day         - day                            1 .. 28,29,30,31
         *    hr          - hour                           0 .. 23
         *    min         - minute                         0 .. 59
         *    sec         - second                         0.0 .. 59.999
         *
         *  locals        :
         *    dayofyr     - day of year
         *    temp        - temporary extended values
         *    inttemp     - temporary int value
         *    i           - index
         *    lmonth[12]  - int array containing the number of days per month
         *
         *  coupling      :
         *    none.
         * --------------------------------------------------------------------------- */

        var lmonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        var dayofyr = Math.floor(days);
        //  ----------------- find month and day of month ----------------
        if ((year % 4) === 0){
            lmonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        }

        var i = 1;
        var inttemp = 0;
        while ((dayofyr > (inttemp + lmonth[i-1])) && i < 12) {
            inttemp = inttemp + lmonth[i-1];
            i += 1;
        }
        var mon = i;
        var day = dayofyr - inttemp;

        //  ----------------- find hours minutes and seconds -------------
        var temp = (days - dayofyr) * 24.0;
        var hr   = Math.floor(temp);
        temp = (temp - hr) * 60.0;
        var minute  = Math.floor(temp);
        var sec  = (temp - minute) * 60.0;

        var mdhmsResult = {
            mon : mon,
            day : day,
            hr : hr,
            minute : minute,
            sec : sec
        };

        return mdhmsResult;
    };
});
define('gstime/gstime',[
    '../constants'
], function(
    constants
) {
    'use strict';

    return function(jdut1) {
        /* -----------------------------------------------------------------------------
         *
         *                           function gstime
         *
         *  this function finds the greenwich sidereal time.
         *
         *  author        : david vallado                  719-573-2600    1 mar 2001
         *
         *  inputs          description                    range / units
         *    jdut1       - julian date in ut1             days from 4713 bc
         *
         *  outputs       :
         *    gstime      - greenwich sidereal time        0 to 2pi rad
         *
         *  locals        :
         *    temp        - temporary variable for doubles   rad
         *    tut1        - julian centuries from the
         *                  jan 1, 2000 12 h epoch (ut1)
         *
         *  coupling      :
         *    none
         *
         *  references    :
         *    vallado       2004, 191, eq 3-45
         * --------------------------------------------------------------------------- */

        var tut1 = (jdut1 - 2451545.0) / 36525.0;
        var temp = -6.2e-6* tut1 * tut1 * tut1 + 0.093104 * tut1 * tut1 +
            (876600.0*3600 + 8640184.812866) * tut1 + 67310.54841;  //#  sec
        temp = (temp * constants.deg2rad / 240.0) % constants.twoPi; // 360/86400 = 1/240, to deg, to rad

        //  ------------------------ check quadrants ---------------------
        if (temp < 0.0){
            temp += constants.twoPi;
        }
        return temp;
    };
});
define('gstime/jday',[], function() {
    'use strict';

    return function(year, mon, day, hr, minute, sec) {
        if (year instanceof Date) {
            var date = year;
            year = date.getUTCFullYear();
            mon = date.getUTCMonth() + 1;   // Note, this function requires months in range 1-12.
            day = date.getUTCDate();
            hr = date.getUTCHours();
            minute = date.getUTCMinutes();
            sec = date.getUTCSeconds();
        }

        return (367.0 * year -
        Math.floor((7 * (year + Math.floor((mon + 9) / 12.0))) * 0.25) +
        Math.floor( 275 * mon / 9.0 ) +
        day + 1721013.5 +
        ((sec / 60.0 + minute) / 60.0 + hr) / 24.0  //  ut in days
            //#  - 0.5*sgn(100.0*year + mon - 190002.5) + 0.5;
        );
    };
});
/*
 * satellite-js v1.2
 * (c) 2013 Shashwat Kandadai and UCSC
 * https://github.com/shashwatak/satellite-js
 * License: MIT
 */

define('dpper',[
    './constants'
], function(
    constants
) {
    'use strict';

    return function(satrec, dpperParameters) {
        /* -----------------------------------------------------------------------------
         *
         *                           procedure dpper
         *
         *  this procedure provides deep space long period periodic contributions
         *    to the mean elements.  by design, these periodics are zero at epoch.
         *    this used to be dscom which included initialization, but it's really a
         *    recurring function.
         *
         *  author        : david vallado                  719-573-2600   28 jun 2005
         *
         *  inputs        :
         *    e3          -
         *    ee2         -
         *    peo         -
         *    pgho        -
         *    pho         -
         *    pinco       -
         *    plo         -
         *    se2 , se3 , sgh2, sgh3, sgh4, sh2, sh3, si2, si3, sl2, sl3, sl4 -
         *    t           -
         *    xh2, xh3, xi2, xi3, xl2, xl3, xl4 -
         *    zmol        -
         *    zmos        -
         *    ep          - eccentricity                           0.0 - 1.0
         *    inclo       - inclination - needed for lyddane modification
         *    nodep       - right ascension of ascending node
         *    argpp       - argument of perigee
         *    mp          - mean anomaly
         *
         *  outputs       :
         *    ep          - eccentricity                           0.0 - 1.0
         *    inclp       - inclination
         *    nodep        - right ascension of ascending node
         *    argpp       - argument of perigee
         *    mp          - mean anomaly
         *
         *  locals        :
         *    alfdp       -
         *    betdp       -
         *    cosip  , sinip  , cosop  , sinop  ,
         *    dalf        -
         *    dbet        -
         *    dls         -
         *    f2, f3      -
         *    pe          -
         *    pgh         -
         *    ph          -
         *    pinc        -
         *    pl          -
         *    sel   , ses   , sghl  , sghs  , shl   , shs   , sil   , sinzf , sis   ,
         *    sll   , sls
         *    xls         -
         *    xnoh        -
         *    zf          -
         *    zm          -
         *
         *  coupling      :
         *    none.
         *
         *  references    :
         *    hoots, roehrich, norad spacetrack report #3 1980
         *    hoots, norad spacetrack report #6 1986
         *    hoots, schumacher and glover 2004
         *    vallado, crawford, hujsak, kelso  2006
         ----------------------------------------------------------------------------*/

        // TODO: defined but never used
        //var inclo   = dpperParameters.inclo;

        var init    = dpperParameters.init,
            ep      = dpperParameters.ep,
            inclp   = dpperParameters.inclp,
            nodep   = dpperParameters.nodep,
            argpp   = dpperParameters.argpp,
            mp      = dpperParameters.mp,
            opsmode = dpperParameters.opsmode;


        // Copy satellite attributes into local variables for convenience
        // and symmetry in writing formulae.

        var alfdp, betdp,
            cosip, sinip, cosop, sinop,
            dalf, dbet, dls,
            f2, f3,
            pe, pgh, ph, pinc, pl,
            sel, ses, sghl, sghs, shs, sil, sinzf, sis,  sll, sls,
            xls, xnoh, zf, zm, shll;

        // TODO: defined but never used
        //var shl;

        var e3      = satrec.e3;
        var ee2     = satrec.ee2;
        var peo     = satrec.peo;
        var pgho    = satrec.pgho;
        var pho     = satrec.pho;
        var pinco   = satrec.pinco;
        var plo     = satrec.plo;
        var se2     = satrec.se2;
        var se3     = satrec.se3;
        var sgh2    = satrec.sgh2;
        var sgh3    = satrec.sgh3;
        var sgh4    = satrec.sgh4;
        var sh2     = satrec.sh2;
        var sh3     = satrec.sh3;
        var si2     = satrec.si2;
        var si3     = satrec.si3;
        var sl2     = satrec.sl2;
        var sl3     = satrec.sl3;
        var sl4     = satrec.sl4;
        var t       = satrec.t;
        var xgh2    = satrec.xgh2;
        var xgh3    = satrec.xgh3;
        var xgh4    = satrec.xgh4;
        var xh2     = satrec.xh2;
        var xh3     = satrec.xh3;
        var xi2     = satrec.xi2;
        var xi3     = satrec.xi3;
        var xl2     = satrec.xl2;
        var xl3     = satrec.xl3;
        var xl4     = satrec.xl4;
        var zmol    = satrec.zmol;
        var zmos    = satrec.zmos;

        //  ---------------------- constants -----------------------------
        var zns     = 1.19459e-5;
        var zes     = 0.01675;
        var znl     = 1.5835218e-4;
        var zel     = 0.05490;

        //  --------------- calculate time varying periodics -----------
        zm      = zmos + zns * t;
        // be sure that the initial call has time set to zero
        if (init === 'y') {
            zm      = zmos;
        }
        zf      = zm    + 2.0   * zes   * Math.sin(zm);
        sinzf   = Math.sin(zf);
        f2      =  0.5  * sinzf * sinzf - 0.25;
        f3      = -0.5  * sinzf * Math.cos(zf);
        ses     = se2   * f2    + se3   * f3;
        sis     = si2   * f2    + si3   * f3;
        sls     = sl2   * f2    + sl3   * f3    + sl4   * sinzf;
        sghs    = sgh2  * f2    + sgh3  * f3    + sgh4  * sinzf;
        shs     = sh2   * f2    + sh3   * f3;
        zm          = zmol  + znl   * t;
        if (init === 'y') {
            zm      = zmol;
        }

        zf          = zm    + 2.0   * zel   * Math.sin(zm);
        sinzf       = Math.sin(zf);
        f2          =  0.5  * sinzf * sinzf - 0.25;
        f3          = -0.5  * sinzf * Math.cos(zf);
        sel     = ee2   * f2    + e3    * f3;
        sil     = xi2   * f2    + xi3   * f3;
        sll     = xl2   * f2    + xl3   * f3    + xl4 * sinzf;
        sghl    = xgh2  * f2    + xgh3  * f3    + xgh4 * sinzf;
        shll    = xh2   * f2    + xh3   * f3;
        pe      = ses   + sel;
        pinc    = sis   + sil;
        pl      = sls   + sll;
        pgh     = sghs  + sghl;
        ph      = shs   + shll;

        if (init === 'n'){
            pe      = pe    - peo;
            pinc    = pinc  - pinco;
            pl      = pl    - plo;
            pgh     = pgh   - pgho;
            ph      = ph    - pho;
            inclp   = inclp + pinc;
            ep      = ep    + pe;
            sinip = Math.sin(inclp);
            cosip = Math.cos(inclp);

            /* ----------------- apply periodics directly ------------ */
            //  sgp4fix for lyddane choice
            //  strn3 used original inclination - this is technically feasible
            //  gsfc used perturbed inclination - also technically feasible
            //  probably best to readjust the 0.2 limit value and limit discontinuity
            //  0.2 rad = 11.45916 deg
            //  use next line for original strn3 approach and original inclination
            //  if (inclo >= 0.2)
            //  use next line for gsfc version and perturbed inclination
            if (inclp >= 0.2) {
                ph      = ph    / sinip;
                pgh     = pgh   - cosip     * ph;
                argpp   = argpp + pgh;
                nodep   = nodep + ph;
                mp      = mp    + pl;
            }
            else {
                //  ---- apply periodics with lyddane modification ----
                sinop   = Math.sin(nodep);
                cosop   = Math.cos(nodep);
                alfdp   = sinip * sinop;
                betdp   = sinip * cosop;
                dalf    =  ph   * cosop + pinc * cosip * sinop;
                dbet    = -ph   * sinop + pinc * cosip * cosop;
                alfdp       = alfdp + dalf;
                betdp       = betdp + dbet;
                nodep       = nodep % constants.twoPi;
                //  sgp4fix for afspc written intrinsic functions
                //  nodep used without a trigonometric function ahead
                if (nodep < 0.0 && opsmode === 'a') {
                    nodep   = nodep + constants.twoPi;
                }
                xls     = mp    + argpp + cosip * nodep;
                dls     = pl    + pgh   - pinc  * nodep * sinip;
                xls         = xls   + dls;
                xnoh    = nodep;
                nodep       = Math.atan2(alfdp, betdp);
                //  sgp4fix for afspc written intrinsic functions
                //  nodep used without a trigonometric function ahead
                if (nodep < 0.0 && opsmode === 'a'){
                    nodep = nodep + constants.twoPi;
                }
                if (Math.abs(xnoh - nodep) > constants.pi) {
                    if (nodep < xnoh){
                        nodep = nodep + constants.twoPi;
                    }
                    else{
                        nodep = nodep - constants.twoPi;
                    }
                }
                mp    = mp  + pl;
                argpp = xls - mp - cosip * nodep;
            }
        }
        var dpperResult = {
            ep : ep,
            inclp : inclp,
            nodep : nodep,
            argpp : argpp,
            mp : mp
        };
        return dpperResult;
    };
});
/*
 * satellite-js v1.2
 * (c) 2013 Shashwat Kandadai and UCSC
 * https://github.com/shashwatak/satellite-js
 * License: MIT
 */

define('dspace',[
    './constants'
], function(
    constants
) {
    'use strict';

    return function(dspaceParameters) {
        /*-----------------------------------------------------------------------------
         *
         *                           procedure dspace
         *
         *  this procedure provides deep space contributions to mean elements for
         *    perturbing third body.  these effects have been averaged over one
         *    revolution of the sun and moon.  for earth resonance effects, the
         *    effects have been averaged over no revolutions of the satellite.
         *    (mean motion)
         *
         *  author        : david vallado                  719-573-2600   28 jun 2005
         *
         *  inputs        :
         *    d2201, d2211, d3210, d3222, d4410, d4422, d5220, d5232, d5421, d5433 -
         *    dedt        -
         *    del1, del2, del3  -
         *    didt        -
         *    dmdt        -
         *    dnodt       -
         *    domdt       -
         *    irez        - flag for resonance           0-none, 1-one day, 2-half day
         *    argpo       - argument of perigee
         *    argpdot     - argument of perigee dot (rate)
         *    t           - time
         *    tc          -
         *    gsto        - gst
         *    xfact       -
         *    xlamo       -
         *    no          - mean motion
         *    atime       -
         *    em          - eccentricity
         *    ft          -
         *    argpm       - argument of perigee
         *    inclm       - inclination
         *    xli         -
         *    mm          - mean anomaly
         *    xni         - mean motion
         *    nodem       - right ascension of ascending node
         *
         *  outputs       :
         *    atime       -
         *    em          - eccentricity
         *    argpm       - argument of perigee
         *    inclm       - inclination
         *    xli         -
         *    mm          - mean anomaly
         *    xni         -
         *    nodem       - right ascension of ascending node
         *    dndt        -
         *    nm          - mean motion
         *
         *  locals        :
         *    delt        -
         *    ft          -
         *    theta       -
         *    x2li        -
         *    x2omi       -
         *    xl          -
         *    xldot       -
         *    xnddt       -
         *    xndt        -
         *    xomi        -
         *
         *  coupling      :
         *    none        -
         *
         *  references    :
         *    hoots, roehrich, norad spacetrack report #3 1980
         *    hoots, norad spacetrack report #6 1986
         *    hoots, schumacher and glover 2004
         *    vallado, crawford, hujsak, kelso  2006
         ----------------------------------------------------------------------------*/

        var delt,   ft,     theta,  x2li,   x2omi,
            xl,     xldot,  xnddt,  xndt,   xomi;

        var irez    = dspaceParameters.irez,
            d2201   = dspaceParameters.d2201,
            d2211   = dspaceParameters.d2211,
            d3210   = dspaceParameters.d3210,
            d3222   = dspaceParameters.d3222,
            d4410   = dspaceParameters.d4410,
            d4422   = dspaceParameters.d4422,
            d5220   = dspaceParameters.d5220,
            d5232   = dspaceParameters.d5232,
            d5421   = dspaceParameters.d5421,
            d5433   = dspaceParameters.d5433,
            dedt    = dspaceParameters.dedt,
            del1    = dspaceParameters.del1,
            del2    = dspaceParameters.del2,
            del3    = dspaceParameters.del3,
            didt    = dspaceParameters.didt,
            dmdt    = dspaceParameters.dmdt,
            dnodt   = dspaceParameters.dnodt,
            domdt   = dspaceParameters.domdt,
            argpo   = dspaceParameters.argpo,
            argpdot = dspaceParameters.argpdot,
            t       = dspaceParameters.t,
            tc      = dspaceParameters.tc,
            gsto    = dspaceParameters.gsto,
            xfact   = dspaceParameters.xfact,
            xlamo   = dspaceParameters.xlamo,
            no      = dspaceParameters.no,
            atime   = dspaceParameters.atime,
            em      = dspaceParameters.em,
            argpm   = dspaceParameters.argpm,
            inclm   = dspaceParameters.inclm,
            xli     = dspaceParameters.xli,
            mm      = dspaceParameters.mm,
            xni     = dspaceParameters.xni,
            nodem   = dspaceParameters.nodem,
            nm      = dspaceParameters.nm;


        var fasx2 = 0.13130908;
        var fasx4 = 2.8843198;
        var fasx6 = 0.37448087;
        var g22   = 5.7686396;
        var g32   = 0.95240898;
        var g44   = 1.8014998;
        var g52   = 1.0508330;
        var g54   = 4.4108898;
        var rptim = 4.37526908801129966e-3; // equates to 7.29211514668855e-5 rad/sec
        var stepp =    720.0;
        var stepn =   -720.0;
        var step2 = 259200.0;

        //  ----------- calculate deep space resonance effects -----------
        var dndt   = 0.0;
        theta  = (gsto + tc * rptim) % constants.twoPi;
        em         = em + dedt * t;

        inclm  = inclm + didt * t;
        argpm  = argpm + domdt * t;
        nodem  = nodem + dnodt * t;
        mm     = mm + dmdt * t;


        //   sgp4fix for negative inclinations
        //   the following if statement should be commented out
        //  if (inclm < 0.0)
        // {
        //    inclm = -inclm;
        //    argpm = argpm - pi;
        //    nodem = nodem + pi;
        //  }

        /* - update resonances : numerical (euler-maclaurin) integration - */
        /* ------------------------- epoch restart ----------------------  */
        //   sgp4fix for propagator problems
        //   the following integration works for negative time steps and periods
        //   the specific changes are unknown because the original code was so convoluted

        // sgp4fix take out atime = 0.0 and fix for faster operation

        ft    = 0.0;
        if (irez !== 0){
            //  sgp4fix streamline check
            if (atime === 0.0 || t * atime <= 0.0 || Math.abs(t) < Math.abs(atime)){
                atime  = 0.0;
                xni    = no;
                xli    = xlamo;
            }

            // sgp4fix move check outside loop
            if (t > 0.0){
                delt = stepp;
            }
            else {
                delt = stepn;
            }
            var iretn = 381; // added for do loop
            var iret  =   0; // added for loop
            while (iretn === 381){
                //  ------------------- dot terms calculated -------------
                //  ----------- near - synchronous resonance terms -------
                if (irez !== 2){
                    xndt  = del1 * Math.sin(xli - fasx2) + del2 * Math.sin(2.0 * (xli - fasx4)) +
                    del3 * Math.sin(3.0 * (xli - fasx6));
                    xldot = xni  + xfact;
                    xnddt = del1 * Math.cos(xli - fasx2) +
                    2.0 * del2 * Math.cos(2.0 * (xli - fasx4)) +
                    3.0 * del3 * Math.cos(3.0 * (xli - fasx6));
                    xnddt = xnddt * xldot;
                }
                else{
                    // --------- near - half-day resonance terms --------
                    xomi  = argpo + argpdot * atime;
                    x2omi = xomi + xomi;
                    x2li  = xli + xli;
                    xndt  = (d2201 * Math.sin(x2omi + xli  - g22) + d2211 * Math.sin( xli  - g22) +
                    d3210 * Math.sin(xomi  + xli  - g32) + d3222 * Math.sin(-xomi + xli - g32) +
                    d4410 * Math.sin(x2omi + x2li - g44) + d4422 * Math.sin( x2li - g44) +
                    d5220 * Math.sin(xomi  + xli  - g52) + d5232 * Math.sin(-xomi + xli - g52) +
                    d5421 * Math.sin(xomi  + x2li - g54) + d5433 * Math.sin(-xomi + x2li - g54));
                    xldot = xni + xfact;
                    xnddt = (d2201 * Math.cos(x2omi + xli  - g22)   + d2211 * Math.cos(xli - g22) +
                    d3210 * Math.cos( xomi + xli  - g32)   + d3222 * Math.cos(-xomi + xli - g32) +
                    d5220 * Math.cos( xomi + xli  - g52)   + d5232 * Math.cos(-xomi + xli - g52) +
                    2.0 * (d4410 * Math.cos(x2omi + x2li - g44)  +
                    d4422 * Math.cos( x2li - g44) + d5421  * Math.cos(xomi + x2li - g54) +
                    d5433 * Math.cos(-xomi + x2li - g54)));
                    xnddt = xnddt * xldot;
                }
                //  ----------------------- integrator -------------------
                //  sgp4fix move end checks to end of routine
                if (Math.abs(t - atime) >= stepp){
                    iret  = 0;
                    iretn = 381;
                }
                else{
                    ft    = t - atime;
                    iretn = 0;
                }
                if (iretn === 381){
                    xli   = xli + xldot * delt + xndt * step2;
                    xni   = xni + xndt * delt + xnddt * step2;
                    atime = atime + delt;
                }
            }
            nm  = xni + xndt  * ft + xnddt * ft * ft * 0.5;
            xl  = xli + xldot * ft + xndt  * ft * ft * 0.5;
            if (irez !== 1){
                mm   = xl - 2.0 * nodem + 2.0 * theta;
                dndt = nm - no;
            }
            else{
                mm   = xl - nodem - argpm + theta;
                dndt = nm - no;
            }
            nm = no + dndt;
        }
        var dspaceResults = {
            atime : atime,
            em : em,
            argpm : argpm,
            inclm : inclm,
            xli : xli,
            mm : mm,
            xni : xni,
            nodem : nodem,
            dndt : dndt,
            nm : nm
        };
        return dspaceResults;
    };
});
/*
 * satellite-js v1.2
 * (c) 2013 Shashwat Kandadai and UCSC
 * https://github.com/shashwatak/satellite-js
 * License: MIT
 */

define('sgp4',[
    './constants',
    './dpper',
    './dspace'
], function(
    constants,
    dpper,
    dspace
) {
    'use strict';

    return function (satrec, tsince) {
        /*-----------------------------------------------------------------------------
         *
         *                             procedure sgp4
         *
         *  this procedure is the sgp4 prediction model from space command. this is an
         *    updated and combined version of sgp4 and sdp4, which were originally
         *    published separately in spacetrack report //3. this version follows the
         *    methodology from the aiaa paper (2006) describing the history and
         *    development of the code.
         *
         *  author        : david vallado                  719-573-2600   28 jun 2005
         *
         *  inputs        :
         *    satrec  - initialised structure from sgp4init() call.
         *    tsince  - time since epoch (minutes)
         *
         *  outputs       :
         *    r           - position vector                     km
         *    v           - velocity                            km/sec
         *  return code - non-zero on error.
         *                   1 - mean elements, ecc >= 1.0 or ecc < -0.001 or a < 0.95 er
         *                   2 - mean motion less than 0.0
         *                   3 - pert elements, ecc < 0.0  or  ecc > 1.0
         *                   4 - semi-latus rectum < 0.0
         *                   5 - epoch elements are sub-orbital
         *                   6 - satellite has decayed
         *
         *  locals        :
         *    am          -
         *    axnl, aynl        -
         *    betal       -
         *    cosim   , sinim   , cosomm  , sinomm  , cnod    , snod    , cos2u   ,
         *    sin2u   , coseo1  , sineo1  , cosi    , sini    , cosip   , sinip   ,
         *    cosisq  , cossu   , sinsu   , cosu    , sinu
         *    delm        -
         *    delomg      -
         *    dndt        -
         *    eccm        -
         *    emsq        -
         *    ecose       -
         *    el2         -
         *    eo1         -
         *    eccp        -
         *    esine       -
         *    argpm       -
         *    argpp       -
         *    omgadf      -
         *    pl          -
         *    r           -
         *    rtemsq      -
         *    rdotl       -
         *    rl          -
         *    rvdot       -
         *    rvdotl      -
         *    su          -
         *    t2  , t3   , t4    , tc
         *    tem5, temp , temp1 , temp2  , tempa  , tempe  , templ
         *    u   , ux   , uy    , uz     , vx     , vy     , vz
         *    inclm       - inclination
         *    mm          - mean anomaly
         *    nm          - mean motion
         *    nodem       - right asc of ascending node
         *    xinc        -
         *    xincp       -
         *    xl          -
         *    xlm         -
         *    mp          -
         *    xmdf        -
         *    xmx         -
         *    xmy         -
         *    nodedf      -
         *    xnode       -
         *    nodep       -
         *    np          -
         *
         *  coupling      :
         *    getgravconst-
         *    dpper
         *    dspace
         *
         *  references    :
         *    hoots, roehrich, norad spacetrack report //3 1980
         *    hoots, norad spacetrack report //6 1986
         *    hoots, schumacher and glover 2004
         *    vallado, crawford, hujsak, kelso  2006
         ----------------------------------------------------------------------------*/

        var am, axnl, aynl, betal,
            cosim, sinim, cnod, snod, cos2u,
            sin2u, coseo1, sineo1, cosi, sini, cosip, sinip,
            cosisq, cossu, sinsu, cosu, sinu,
            delm, delomg, dndt,
            emsq, ecose, el2, eo1, esine,
            argpm, argpp, pl,
            r, v, rdotl, rl, rvdot, rvdotl, su,
            t2, t3, t4, tc,
            tem5, temp, temp1, temp2, tempa, tempe, templ,
            u, ux, uy, uz, vx, vy, vz,
            inclm, mm, nm, nodem,
            xinc, xincp, xl, xlm, mp, xmdf, xmx, xmy,
            nodedf, xnode, nodep;

        // TODO: defined but never used
        //var cosomm, sinomm, eccm, eccp, omgadf, rtemsq, np;

        var mrt = 0.0;

        /* ------------------ set mathematical constants --------------- */
        // sgp4fix divisor for divide by zero check on inclination
        // the old check used 1.0 + cos(pi-1.0e-9), but then compared it to
        // 1.5 e-12, so the threshold was changed to 1.5e-12 for consistency

        var temp4 = 1.5e-12;

        var vkmpersec = constants.earthRadius * constants.xke / 60.0;

        //  --------------------- clear sgp4 error flag -----------------
        satrec.t = tsince;
        satrec.error = 0;

        //  ------- update for secular gravity and atmospheric drag -----
        xmdf = satrec.mo + satrec.mdot * satrec.t;
        var argpdf = satrec.argpo + satrec.argpdot * satrec.t;
        nodedf = satrec.nodeo + satrec.nodedot * satrec.t;
        argpm = argpdf;
        mm = xmdf;
        t2 = satrec.t * satrec.t;
        nodem = nodedf + satrec.nodecf * t2;
        tempa = 1.0 - satrec.cc1 * satrec.t;
        tempe = satrec.bstar * satrec.cc4 * satrec.t;
        templ = satrec.t2cof * t2;

        if (satrec.isimp !== 1) {
            delomg = satrec.omgcof * satrec.t;
            //  sgp4fix use mutliply for speed instead of pow
            var delmtemp = 1.0 + satrec.eta * Math.cos(xmdf);
            delm = satrec.xmcof *
            (delmtemp * delmtemp * delmtemp -
            satrec.delmo);
            temp = delomg + delm;
            mm = xmdf + temp;
            argpm = argpdf - temp;
            t3 = t2 * satrec.t;
            t4 = t3 * satrec.t;
            tempa = tempa - satrec.d2 * t2 - satrec.d3 * t3 -
            satrec.d4 * t4;
            tempe = tempe + satrec.bstar * satrec.cc5 * (Math.sin(mm) -
            satrec.sinmao);
            templ = templ + satrec.t3cof * t3 + t4 * (satrec.t4cof +
            satrec.t * satrec.t5cof);
        }
        nm = satrec.no;
        var em = satrec.ecco;
        inclm = satrec.inclo;
        if (satrec.method === 'd') {
            tc = satrec.t;

            var dspaceParameters = {
                irez: satrec.irez,
                d2201: satrec.d2201,
                d2211: satrec.d2211,
                d3210: satrec.d3210,
                d3222: satrec.d3222,
                d4410: satrec.d4410,
                d4422: satrec.d4422,
                d5220: satrec.d5220,
                d5232: satrec.d5232,
                d5421: satrec.d5421,
                d5433: satrec.d5433,
                dedt: satrec.dedt,
                del1: satrec.del1,
                del2: satrec.del2,
                del3: satrec.del3,
                didt: satrec.didt,
                dmdt: satrec.dmdt,
                dnodt: satrec.dnodt,
                domdt: satrec.domdt,
                argpo: satrec.argpo,
                argpdot: satrec.argpdot,
                t: satrec.t,
                tc: tc,
                gsto: satrec.gsto,
                xfact: satrec.xfact,
                xlamo: satrec.xlamo,
                no: satrec.no,
                atime: satrec.atime,
                em: em,
                argpm: argpm,
                inclm: inclm,
                xli: satrec.xli,
                mm: mm,
                xni: satrec.xni,
                nodem: nodem,
                nm: nm
            };

            var dspaceResult = dspace(dspaceParameters);

            // TODO: defined but never used
            //var atime = dspaceResult.atime;

            em = dspaceResult.em;
            argpm = dspaceResult.argpm;
            inclm = dspaceResult.inclm;

            // TODO: defined but never used
            //var xli = dspaceResult.xli;

            mm = dspaceResult.mm;

            // TODO: defined but never used
            //var xni = dspaceResult.xni;

            nodem = dspaceResult.nodem;
            dndt = dspaceResult.dndt;
            nm = dspaceResult.nm;
        }

        if (nm <= 0.0) {
            //  printf("// error nm %f\n", nm);
            satrec.error = 2;
            //  sgp4fix add return
            return [false, false];
        }
        am = Math.pow((constants.xke / nm), constants.x2o3) * tempa * tempa;
        nm = constants.xke / Math.pow(am, 1.5);
        em = em - tempe;

        //  fix tolerance for error recognition
        //  sgp4fix am is fixed from the previous nm check
        if (em >= 1.0 || em < -0.001) {  // || (am < 0.95)
            //  printf("// error em %f\n", em);
            satrec.error = 1;
            //  sgp4fix to return if there is an error in eccentricity
            return [false, false];
        }
        //  sgp4fix fix tolerance to avoid a divide by zero
        if (em < 1.0e-6) {
            em = 1.0e-6;
        }
        mm = mm + satrec.no * templ;
        xlm = mm + argpm + nodem;
        emsq = em * em;
        temp = 1.0 - emsq;

        nodem = (nodem) % constants.twoPi;
        argpm = (argpm) % constants.twoPi;
        xlm = (xlm) % constants.twoPi;
        mm = (xlm - argpm - nodem) % constants.twoPi;

        //  ----------------- compute extra mean quantities -------------
        sinim = Math.sin(inclm);
        cosim = Math.cos(inclm);

        //  -------------------- add lunar-solar periodics --------------
        var ep = em;
        xincp = inclm;
        argpp = argpm;
        nodep = nodem;
        mp = mm;
        sinip = sinim;
        cosip = cosim;
        if (satrec.method === 'd') {

            var dpperParameters = {
                inclo: satrec.inclo,
                init: 'n',
                ep: ep,
                inclp: xincp,
                nodep: nodep,
                argpp: argpp,
                mp: mp,
                opsmode: satrec.operationmod
            };

            var dpperResult = dpper(satrec, dpperParameters);
            ep = dpperResult.ep;
            xincp = dpperResult.inclp;
            nodep = dpperResult.nodep;
            argpp = dpperResult.argpp;
            mp = dpperResult.mp;

            if (xincp < 0.0) {
                xincp = -xincp;
                nodep = nodep + constants.pi;
                argpp = argpp - constants.pi;
            }
            if (ep < 0.0 || ep > 1.0) {
                //  printf("// error ep %f\n", ep);
                satrec.error = 3;
                //  sgp4fix add return
                return [false, false];
            }
        }
        //  -------------------- long period periodics ------------------
        if (satrec.method === 'd') {
            sinip = Math.sin(xincp);
            cosip = Math.cos(xincp);
            satrec.aycof = -0.5 * constants.j3oj2 * sinip;
            //  sgp4fix for divide by zero for xincp = 180 deg
            if (Math.abs(cosip + 1.0) > 1.5e-12) {
                satrec.xlcof = -0.25 * constants.j3oj2 * sinip * (3.0 + 5.0 * cosip) / (1.0 + cosip);
            }
            else {
                satrec.xlcof = -0.25 * constants.j3oj2 * sinip * (3.0 + 5.0 * cosip) / temp4;
            }
        }
        axnl = ep * Math.cos(argpp);
        temp = 1.0 / (am * (1.0 - ep * ep));
        aynl = ep * Math.sin(argpp) + temp * satrec.aycof;
        xl = mp + argpp + nodep + temp * satrec.xlcof * axnl;

        //  --------------------- solve kepler's equation ---------------
        u = (xl - nodep) % constants.twoPi;
        eo1 = u;
        tem5 = 9999.9;
        var ktr = 1;
        //    sgp4fix for kepler iteration
        //    the following iteration needs better limits on corrections
        while (Math.abs(tem5) >= 1.0e-12 && ktr <= 10) {
            sineo1 = Math.sin(eo1);
            coseo1 = Math.cos(eo1);
            tem5 = 1.0 - coseo1 * axnl - sineo1 * aynl;
            tem5 = (u - aynl * coseo1 + axnl * sineo1 - eo1) / tem5;
            if (Math.abs(tem5) >= 0.95) {
                if (tem5 > 0.0) {
                    tem5 = 0.95;
                }
                else {
                    tem5 = -0.95;
                }
            }
            eo1 = eo1 + tem5;
            ktr = ktr + 1;
        }
        //  ------------- short period preliminary quantities -----------
        ecose = axnl * coseo1 + aynl * sineo1;
        esine = axnl * sineo1 - aynl * coseo1;
        el2 = axnl * axnl + aynl * aynl;
        pl = am * (1.0 - el2);
        if (pl < 0.0) {

            //  printf("// error pl %f\n", pl);
            satrec.error = 4;
            //  sgp4fix add return
            return [false, false];
        }
        else {
            rl = am * (1.0 - ecose);
            rdotl = Math.sqrt(am) * esine / rl;
            rvdotl = Math.sqrt(pl) / rl;
            betal = Math.sqrt(1.0 - el2);
            temp = esine / (1.0 + betal);
            sinu = am / rl * (sineo1 - aynl - axnl * temp);
            cosu = am / rl * (coseo1 - axnl + aynl * temp);
            su = Math.atan2(sinu, cosu);
            sin2u = (cosu + cosu) * sinu;
            cos2u = 1.0 - 2.0 * sinu * sinu;
            temp = 1.0 / pl;
            temp1 = 0.5 * constants.j2 * temp;
            temp2 = temp1 * temp;

            //  -------------- update for short period periodics ------------
            if (satrec.method === 'd') {
                cosisq = cosip * cosip;
                satrec.con41 = 3.0 * cosisq - 1.0;
                satrec.x1mth2 = 1.0 - cosisq;
                satrec.x7thm1 = 7.0 * cosisq - 1.0;
            }
            mrt = rl * (1.0 - 1.5 * temp2 * betal * satrec.con41) +
            0.5 * temp1 * satrec.x1mth2 * cos2u;
            su = su - 0.25 * temp2 * satrec.x7thm1 * sin2u;
            xnode = nodep + 1.5 * temp2 * cosip * sin2u;
            xinc = xincp + 1.5 * temp2 * cosip * sinip * cos2u;
            var mvt = rdotl - nm * temp1 * satrec.x1mth2 * sin2u / constants.xke;
            rvdot = rvdotl + nm * temp1 * (satrec.x1mth2 * cos2u +
            1.5 * satrec.con41) / constants.xke;

            //  --------------------- orientation vectors -------------------
            sinsu = Math.sin(su);
            cossu = Math.cos(su);
            snod = Math.sin(xnode);
            cnod = Math.cos(xnode);
            sini = Math.sin(xinc);
            cosi = Math.cos(xinc);
            xmx = -snod * cosi;
            xmy = cnod * cosi;
            ux = xmx * sinsu + cnod * cossu;
            uy = xmy * sinsu + snod * cossu;
            uz = sini * sinsu;
            vx = xmx * cossu - cnod * sinsu;
            vy = xmy * cossu - snod * sinsu;
            vz = sini * cossu;

            //  --------- position and velocity (in km and km/sec) ----------
            r = {x: 0.0, y: 0.0, z: 0.0};
            r.x = (mrt * ux) * constants.earthRadius;
            r.y = (mrt * uy) * constants.earthRadius;
            r.z = (mrt * uz) * constants.earthRadius;
            v = {x: 0.0, y: 0.0, z: 0.0};
            v.x = (mvt * ux + rvdot * vx) * vkmpersec;
            v.y = (mvt * uy + rvdot * vy) * vkmpersec;
            v.z = (mvt * uz + rvdot * vz) * vkmpersec;
        }
        //  sgp4fix for decaying satellites
        if (mrt < 1.0) {
            // printf("// decay condition %11.6f \n",mrt);
            satrec.error = 6;
            return {position: false, velocity: false};
        }
        return {position: r, velocity: v};
    };
});
/*
 * satellite-js v1.2
 * (c) 2013 Shashwat Kandadai and UCSC
 * https://github.com/shashwatak/satellite-js
 * License: MIT
 */

define('propagate/propagate',[
    '../constants',
    '../gstime/jday',
    '../sgp4'
], function(
    constants,
    jday,
    sgp4
) {
    'use strict';

    return function propagate() {
        //Return a position and velocity vector for a given date and time.
        var satrec = arguments[0],
            date = Array.prototype.slice.call(arguments, 1),
            j = jday.apply(null, date),
            m = (j - satrec.jdsatepoch) * constants.minutesPerDay;
        return sgp4(satrec, m);
    };
});
/*
 * satellite-js v1.2
 * (c) 2013 Shashwat Kandadai and UCSC
 * https://github.com/shashwatak/satellite-js
 * License: MIT
 */

define('dscom',[
    './constants'
], function(
    constants
) {
    'use strict';

    return function(dscomParameters) {
        /*-----------------------------------------------------------------------------
         *
         *                           procedure dscom
         *
         *  this procedure provides deep space common items used by both the secular
         *    and periodics subroutines.  input is provided as shown. this routine
         *    used to be called dpper, but the functions inside weren't well organized.
         *
         *  author        : david vallado                  719-573-2600   28 jun 2005
         *
         *  inputs        :
         *    epoch       -
         *    ep          - eccentricity
         *    argpp       - argument of perigee
         *    tc          -
         *    inclp       - inclination
         *    nodep       - right ascension of ascending node
         *    np          - mean motion
         *
         *  outputs       :
         *    sinim  , cosim  , sinomm , cosomm , snodm  , cnodm
         *    day         -
         *    e3          -
         *    ee2         -
         *    em          - eccentricity
         *    emsq        - eccentricity squared
         *    gam         -
         *    peo         -
         *    pgho        -
         *    pho         -
         *    pinco       -
         *    plo         -
         *    rtemsq      -
         *    se2, se3         -
         *    sgh2, sgh3, sgh4        -
         *    sh2, sh3, si2, si3, sl2, sl3, sl4         -
         *    s1, s2, s3, s4, s5, s6, s7          -
         *    ss1, ss2, ss3, ss4, ss5, ss6, ss7, sz1, sz2, sz3         -
         *    sz11, sz12, sz13, sz21, sz22, sz23, sz31, sz32, sz33        -
         *    xgh2, xgh3, xgh4, xh2, xh3, xi2, xi3, xl2, xl3, xl4         -
         *    nm          - mean motion
         *    z1, z2, z3, z11, z12, z13, z21, z22, z23, z31, z32, z33         -
         *    zmol        -
         *    zmos        -
         *
         *  locals        :
         *    a1, a2, a3, a4, a5, a6, a7, a8, a9, a10         -
         *    betasq      -
         *    cc          -
         *    ctem, stem        -
         *    x1, x2, x3, x4, x5, x6, x7, x8          -
         *    xnodce      -
         *    xnoi        -
         *    zcosg  , zsing  , zcosgl , zsingl , zcosh  , zsinh  , zcoshl , zsinhl ,
         *    zcosi  , zsini  , zcosil , zsinil ,
         *    zx          -
         *    zy          -
         *
         *  coupling      :
         *    none.
         *
         *  references    :
         *    hoots, roehrich, norad spacetrack report #3 1980
         *    hoots, norad spacetrack report #6 1986
         *    hoots, schumacher and glover 2004
         *    vallado, crawford, hujsak, kelso  2006
         ----------------------------------------------------------------------------*/

        var epoch   = dscomParameters.epoch,
            ep      = dscomParameters.ep,
            argpp   = dscomParameters.argpp,
            tc      = dscomParameters.tc,
            inclp   = dscomParameters.inclp,
            nodep   = dscomParameters.nodep,
            np      = dscomParameters.np,
            e3      = dscomParameters.e3,
            ee2     = dscomParameters.ee2,
            peo     = dscomParameters.peo,
            pgho    = dscomParameters.pgho,
            pho     = dscomParameters.pho,
            pinco   = dscomParameters.pinco,
            plo     = dscomParameters.plo,
            se2     = dscomParameters.se2,
            se3     = dscomParameters.se3,
            sgh2    = dscomParameters.sgh2,
            sgh3    = dscomParameters.sgh3,
            sgh4    = dscomParameters.sgh4,
            sh2     = dscomParameters.sh2,
            sh3     = dscomParameters.sh3,
            si2     = dscomParameters.si2,
            si3     = dscomParameters.si3,
            sl2     = dscomParameters.sl2,
            sl3     = dscomParameters.sl3,
            sl4     = dscomParameters.sl4,
            xgh2    = dscomParameters.xgh2,
            xgh3    = dscomParameters.xgh3,
            xgh4    = dscomParameters.xgh4,
            xh2     = dscomParameters.xh2,
            xh3     = dscomParameters.xh3,
            xi2     = dscomParameters.xi2,
            xi3     = dscomParameters.xi3,
            xl2     = dscomParameters.xl2,
            xl3     = dscomParameters.xl3,
            xl4     = dscomParameters.xl4,
            zmol    = dscomParameters.zmol,
            zmos    = dscomParameters.zmos;


        var a1, a2, a3, a4, a5, a6, a7, a8, a9, a10,
            betasq, cc,  ctem, stem,
            x1, x2, x3, x4, x5, x6, x7, x8,
            xnodce, xnoi,
            zcosg, zsing, zcosgl, zsingl,
            zcosh, zsinh, zcoshl, zsinhl,
            zcosi, zsini, zcosil, zsinil,
            zx, zy;

        var ss1,  ss2,  ss3,  ss4,  ss5,  ss6,  ss7,
            sz1,  sz2,  sz3,
            sz11, sz12, sz13,
            sz21, sz22, sz23,
            sz31, sz32, sz33;
        var s1, s2, s3, s4, s5, s6, s7;
        var z1, z2, z3,
            z11,z12,z13,
            z21,z22,z23,
            z31,z32,z33;

        //  -------------------------- constants -------------------------
        var zes     =  0.01675;
        var zel     =  0.05490;
        var c1ss    =  2.9864797e-6;
        var c1l     =  4.7968065e-7;
        var zsinis  =  0.39785416;
        var zcosis  =  0.91744867;
        var zcosgs  =  0.1945905;
        var zsings  = -0.98088458;
        //  --------------------- local variables ------------------------
        var nm     = np;
        var em     = ep;
        var snodm  = Math.sin(nodep);
        var cnodm  = Math.cos(nodep);
        var sinomm = Math.sin(argpp);
        var cosomm = Math.cos(argpp);
        var sinim  = Math.sin(inclp);
        var cosim  = Math.cos(inclp);
        var emsq   = em * em;
        betasq = 1.0 - emsq;
        var rtemsq = Math.sqrt(betasq);

        //  ----------------- initialize lunar solar terms ---------------
        peo        = 0.0;
        pinco      = 0.0;
        plo        = 0.0;
        pgho       = 0.0;
        pho        = 0.0;
        var day    = epoch + 18261.5 + tc / 1440.0;
        xnodce = (4.5236020 - 9.2422029e-4 * day) % constants.twoPi;
        stem   = Math.sin(xnodce);
        ctem   = Math.cos(xnodce);
        zcosil = 0.91375164 - 0.03568096 * ctem;
        zsinil = Math.sqrt(1.0 - zcosil * zcosil);
        zsinhl = 0.089683511 * stem / zsinil;
        zcoshl = Math.sqrt(1.0 - zsinhl * zsinhl);
        var gam    = 5.8351514 + 0.0019443680 * day;
        zx     = 0.39785416 * stem / zsinil;
        zy     = zcoshl * ctem + 0.91744867 * zsinhl * stem;
        zx         = Math.atan2(zx, zy);
        zx         = gam + zx - xnodce;
        zcosgl = Math.cos(zx);
        zsingl = Math.sin(zx);

        //  ------------------------- do solar terms ---------------------
        zcosg = zcosgs;
        zsing = zsings;
        zcosi = zcosis;
        zsini = zsinis;
        zcosh = cnodm;
        zsinh = snodm;
        cc    = c1ss;
        xnoi  = 1.0 / nm;

        var lsflg = 0;
        while (lsflg < 2) {
            lsflg += 1;
            a1     =   zcosg   * zcosh + zsing * zcosi * zsinh;
            a3     =  -zsing   * zcosh + zcosg * zcosi * zsinh;
            a7     =  -zcosg   * zsinh + zsing * zcosi * zcosh;
            a8     =   zsing   * zsini;
            a9     =   zsing   * zsinh + zcosg * zcosi * zcosh;
            a10    =   zcosg   * zsini;
            a2     =   cosim   * a7    + sinim * a8;
            a4     =   cosim   * a9    + sinim * a10;
            a5     =  -sinim   * a7    + cosim * a8;
            a6     =  -sinim   * a9    + cosim * a10;

            x1     =  a1   * cosomm    + a2    * sinomm;
            x2     =  a3   * cosomm    + a4    * sinomm;
            x3     = -a1   * sinomm    + a2    * cosomm;
            x4     = -a3   * sinomm    + a4    * cosomm;
            x5     =  a5   * sinomm;
            x6     =  a6   * sinomm;
            x7     =  a5   * cosomm;
            x8     =  a6   * cosomm;

            z31    = 12.0  *  x1 * x1 - 3.0 * x3 * x3;
            z32    = 24.0  *  x1 * x2 - 6.0 * x3 * x4;
            z33    = 12.0  *  x2 * x2 - 3.0 * x4 * x4;
            z1     =  3.0  * (a1 * a1 + a2 * a2) + z31 * emsq;
            z2     =  6.0  * (a1 * a3 + a2 * a4) + z32 * emsq;
            z3     =  3.0  * (a3 * a3 + a4 * a4) + z33 * emsq;
            z11    = -6.0  *  a1 * a5 + emsq *
            (-24.0  *  x1 * x7-6.0  * x3 * x5);
            z12    = -6.0  * (a1 * a6 + a3 * a5) + emsq *
            (-24.0  * (x2 * x7 + x1 * x8) +
            -6.0  * (x3 * x6 + x4 * x5));
            z13    = -6.0  *  a3 * a6 + emsq *
            (-24.0  *  x2 * x8 - 6.0 * x4 * x6);
            z21    =  6.0  *  a2 * a5 + emsq *
            ( 24.0  *  x1 * x5 - 6.0 * x3 * x7);
            z22    =  6.0  * (a4 * a5 + a2 * a6) + emsq *
            ( 24.0  * (x2 * x5 + x1 * x6) -
            6.0  * (x4 * x7 + x3 * x8));
            z23    =  6.0  *  a4 * a6 + emsq *
            ( 24.0  *  x2 * x6 - 6.0 * x4 * x8);
            z1         =   z1  + z1 + betasq * z31;
            z2         =   z2  + z2 + betasq * z32;
            z3         =   z3  + z3 + betasq * z33;
            s3     =   cc  * xnoi;
            s2     =  -0.5 * s3 / rtemsq;
            s4     =   s3  * rtemsq;
            s1     = -15.0 * em * s4;
            s5     =   x1  * x3 + x2 * x4;
            s6     =   x2  * x3 + x1 * x4;
            s7     =   x2  * x4 - x1 * x3;

            //  ----------------------- do lunar terms -------------------
            if (lsflg === 1) {
                ss1    = s1;
                ss2    = s2;
                ss3    = s3;
                ss4    = s4;
                ss5    = s5;
                ss6    = s6;
                ss7    = s7;
                sz1    = z1;
                sz2    = z2;
                sz3    = z3;
                sz11   = z11;
                sz12   = z12;
                sz13   = z13;
                sz21   = z21;
                sz22   = z22;
                sz23   = z23;
                sz31   = z31;
                sz32   = z32;
                sz33   = z33;
                zcosg      = zcosgl;
                zsing      = zsingl;
                zcosi      = zcosil;
                zsini      = zsinil;
                zcosh      = zcoshl * cnodm + zsinhl * snodm;
                zsinh      = snodm * zcoshl - cnodm * zsinhl;
                cc         = c1l;
            }
        }
        zmol = (4.7199672 + 0.22997150  * day - gam)   % constants.twoPi;
        zmos = (6.2565837 + 0.017201977 * day)         % constants.twoPi;

        //  ------------------------ do solar terms ----------------------
        se2  =   2.0 * ss1 * ss6;
        se3  =   2.0 * ss1 * ss7;
        si2  =   2.0 * ss2 * sz12;
        si3  =   2.0 * ss2 * (sz13 - sz11);
        sl2  =  -2.0 * ss3 * sz2;
        sl3  =  -2.0 * ss3 * (sz3 - sz1);
        sl4  =  -2.0 * ss3 * (-21.0 - 9.0 * emsq) * zes;
        sgh2 =   2.0 * ss4 * sz32;
        sgh3 =   2.0 * ss4 * (sz33 - sz31);
        sgh4 = -18.0 * ss4 * zes;
        sh2  =  -2.0 * ss2 * sz22;
        sh3  =  -2.0 * ss2 * (sz23 - sz21);

        //  ------------------------ do lunar terms ----------------------
        ee2  =   2.0 * s1 * s6;
        e3   =   2.0 * s1 * s7;
        xi2  =   2.0 * s2 * z12;
        xi3  =   2.0 * s2 * (z13 - z11);
        xl2  =  -2.0 * s3 * z2;
        xl3  =  -2.0 * s3 * (z3 - z1);
        xl4  =  -2.0 * s3 * (-21.0 - 9.0 * emsq) * zel;
        xgh2 =   2.0 * s4 * z32;
        xgh3 =   2.0 * s4 * (z33 - z31);
        xgh4 = -18.0 * s4 * zel;
        xh2  =  -2.0 * s2 * z22;
        xh3  =  -2.0 * s2 * (z23 - z21);

        var dscomResults =  {
            snodm : snodm,
            cnodm : cnodm,
            sinim : sinim,
            cosim : cosim,
            sinomm : sinomm,

            cosomm : cosomm,
            day : day,
            e3 : e3,
            ee2 : ee2,
            em : em,

            emsq : emsq,
            gam : gam,
            peo : peo,
            pgho : pgho,
            pho : pho,

            pinco : pinco,
            plo : plo,
            rtemsq : rtemsq,
            se2 : se2,
            se3 : se3,

            sgh2 : sgh2,
            sgh3 : sgh3,
            sgh4 : sgh4,
            sh2 : sh2,
            sh3 : sh3,

            si2 : si2,
            si3 : si3,
            sl2 : sl2,
            sl3 : sl3,
            sl4 : sl4,

            s1 : s1,
            s2 : s2,
            s3 : s3,
            s4 : s4,
            s5 : s5,

            s6 : s6,
            s7 : s7,
            ss1 : ss1,
            ss2 : ss2,
            ss3 : ss3,

            ss4 : ss4,
            ss5 : ss5,
            ss6 : ss6,
            ss7 : ss7,
            sz1 : sz1,

            sz2 : sz2,
            sz3 : sz3,
            sz11 : sz11,
            sz12 : sz12,
            sz13 : sz13,

            sz21 : sz21,
            sz22 : sz22,
            sz23 : sz23,
            sz31 : sz31,
            sz32 : sz32,

            sz33 : sz33,
            xgh2 : xgh2,
            xgh3 : xgh3,
            xgh4 : xgh4,
            xh2 : xh2,

            xh3 : xh3,
            xi2 : xi2,
            xi3 : xi3,
            xl2 : xl2,
            xl3 : xl3,

            xl4 : xl4,
            nm : nm,
            z1 : z1,
            z2 : z2,
            z3 : z3,

            z11 : z11,
            z12 : z12,
            z13 : z13,
            z21 : z21,
            z22 : z22,

            z23 : z23,
            z31 : z31,
            z32 : z32,
            z33 : z33,
            zmol : zmol,

            zmos : zmos
        };
        return dscomResults;
    };
});
/*
 * satellite-js v1.2
 * (c) 2013 Shashwat Kandadai and UCSC
 * https://github.com/shashwatak/satellite-js
 * License: MIT
 */

define('dsinit',[
    './constants'
], function(
    constants
) {
    'use strict';

    return function(dsinitParameters) {
        /*-----------------------------------------------------------------------------
         *
         *                           procedure dsinit
         *
         *  this procedure provides deep space contributions to mean motion dot due
         *    to geopotential resonance with half day and one day orbits.
         *
         *  author        : david vallado                  719-573-2600   28 jun 2005
         *
         *  inputs        :
         *    cosim, sinim-
         *    emsq        - eccentricity squared
         *    argpo       - argument of perigee
         *    s1, s2, s3, s4, s5      -
         *    ss1, ss2, ss3, ss4, ss5 -
         *    sz1, sz3, sz11, sz13, sz21, sz23, sz31, sz33 -
         *    t           - time
         *    tc          -
         *    gsto        - greenwich sidereal time                   rad
         *    mo          - mean anomaly
         *    mdot        - mean anomaly dot (rate)
         *    no          - mean motion
         *    nodeo       - right ascension of ascending node
         *    nodedot     - right ascension of ascending node dot (rate)
         *    xpidot      -
         *    z1, z3, z11, z13, z21, z23, z31, z33 -
         *    eccm        - eccentricity
         *    argpm       - argument of perigee
         *    inclm       - inclination
         *    mm          - mean anomaly
         *    xn          - mean motion
         *    nodem       - right ascension of ascending node
         *
         *  outputs       :
         *    em          - eccentricity
         *    argpm       - argument of perigee
         *    inclm       - inclination
         *    mm          - mean anomaly
         *    nm          - mean motion
         *    nodem       - right ascension of ascending node
         *    irez        - flag for resonance           0-none, 1-one day, 2-half day
         *    atime       -
         *    d2201, d2211, d3210, d3222, d4410, d4422, d5220, d5232, d5421, d5433    -
         *    dedt        -
         *    didt        -
         *    dmdt        -
         *    dndt        -
         *    dnodt       -
         *    domdt       -
         *    del1, del2, del3        -
         *    ses  , sghl , sghs , sgs  , shl  , shs  , sis  , sls
         *    theta       -
         *    xfact       -
         *    xlamo       -
         *    xli         -
         *    xni
         *
         *  locals        :
         *    ainv2       -
         *    aonv        -
         *    cosisq      -
         *    eoc         -
         *    f220, f221, f311, f321, f322, f330, f441, f442, f522, f523, f542, f543  -
         *    g200, g201, g211, g300, g310, g322, g410, g422, g520, g521, g532, g533  -
         *    sini2       -
         *    temp        -
         *    temp1       -
         *    theta       -
         *    xno2        -
         *
         *  coupling      :
         *    getgravconst
         *
         *  references    :
         *    hoots, roehrich, norad spacetrack report #3 1980
         *    hoots, norad spacetrack report #6 1986
         *    hoots, schumacher and glover 2004
         *    vallado, crawford, hujsak, kelso  2006
         ----------------------------------------------------------------------------*/

        var cosim   = dsinitParameters.cosim,
            emsq    = dsinitParameters.emsq,
            argpo   = dsinitParameters.argpo,

            s1      = dsinitParameters.s1,
            s2      = dsinitParameters.s2,
            s3      = dsinitParameters.s3,
            s4      = dsinitParameters.s4,
            s5      = dsinitParameters.s5,
            sinim   = dsinitParameters.sinim,

            ss1     = dsinitParameters.ss1,
            ss2     = dsinitParameters.ss2,
            ss3     = dsinitParameters.ss3,
            ss4     = dsinitParameters.ss4,
            ss5     = dsinitParameters.ss5,

            sz1     = dsinitParameters.sz1,
            sz3     = dsinitParameters.sz3,
            sz11    = dsinitParameters.sz11,
            sz13    = dsinitParameters.sz13,
            sz21    = dsinitParameters.sz21,
            sz23    = dsinitParameters.sz23,
            sz31    = dsinitParameters.sz31,
            sz33    = dsinitParameters.sz33,

            t       = dsinitParameters.t,
            tc      = dsinitParameters.tc,
            gsto    = dsinitParameters.gsto,

            mo      = dsinitParameters.mo,
            mdot    = dsinitParameters.mdot,
            no      = dsinitParameters.no,
            nodeo   = dsinitParameters.nodeo,
            nodedot = dsinitParameters.nodedot,

            xpidot  = dsinitParameters.xpidot,

            z1      = dsinitParameters.z1,
            z3      = dsinitParameters.z3,
            z11     = dsinitParameters.z11,
            z13     = dsinitParameters.z13,
            z21     = dsinitParameters.z21,
            z23     = dsinitParameters.z23,
            z31     = dsinitParameters.z31,
            z33     = dsinitParameters.z33,

            ecco    = dsinitParameters.ecco,
            eccsq   = dsinitParameters.eccsq,
            em      = dsinitParameters.em,

            argpm   = dsinitParameters.argpm,
            inclm   = dsinitParameters.inclm,
            mm      = dsinitParameters.mm,
            nm      = dsinitParameters.nm,
            nodem   = dsinitParameters.nodem,
            irez    = dsinitParameters.irez,
            atime   = dsinitParameters.atime,

            d2201   = dsinitParameters.d2201,
            d2211   = dsinitParameters.d2211,
            d3210   = dsinitParameters.d3210,
            d3222   = dsinitParameters.d3222,
            d4410   = dsinitParameters.d4410,
            d4422   = dsinitParameters.d4422,

            d5220   = dsinitParameters.d5220,
            d5232   = dsinitParameters.d5232,
            d5421   = dsinitParameters.d5421,
            d5433   = dsinitParameters.d5433,

            dedt    = dsinitParameters.dedt,
            didt    = dsinitParameters.didt,
            dmdt    = dsinitParameters.dmdt,
            dnodt   = dsinitParameters.dnodt,
            domdt   = dsinitParameters.domdt,

            del1    = dsinitParameters.del1,
            del2    = dsinitParameters.del2,
            del3    = dsinitParameters.del3,

            xfact   = dsinitParameters.xfact,
            xlamo   = dsinitParameters.xlamo,
            xli     = dsinitParameters.xli,
            xni     = dsinitParameters.xni;

        var f220, f221, f311, f321, f322, f330, f441, f442, f522, f523, f542, f543;
        var g200, g201, g211, g300, g310, g322, g410, g422, g520, g521, g532, g533;
        var sini2,  temp,   temp1,    theta,    xno2,
            ainv2,  aonv,   cosisq, eoc;

        var q22     = 1.7891679e-6;
        var q31     = 2.1460748e-6;
        var q33     = 2.2123015e-7;
        var root22  = 1.7891679e-6;
        var root44  = 7.3636953e-9;
        var root54  = 2.1765803e-9;
        var rptim   = 4.37526908801129966e-3; // equates to 7.29211514668855e-5 rad/sec
        var root32  = 3.7393792e-7;
        var root52  = 1.1428639e-7;
        var x2o3    = 2.0 / 3.0;
        var znl     = 1.5835218e-4;
        var zns     = 1.19459e-5;


        //  -------------------- deep space initialization ------------
        irez    = 0;
        if (0.0034906585 < nm < 0.0052359877){
            irez = 1;
        }
        if (8.26e-3 <= nm <= 9.24e-3 && em >= 0.5){
            irez = 2;
        }

        //  ------------------------ do solar terms -------------------
        var ses =  ss1 * zns *  ss5;
        var sis =  ss2 * zns * (sz11 + sz13);
        var sls = -zns * ss3 * (sz1  + sz3  - 14.0 - 6.0 * emsq);
        var sghs=  ss4 * zns * (sz31 + sz33 -  6.0);
        var shs = -zns * ss2 * (sz21 + sz23);

        //  sgp4fix for 180 deg incl
        if (inclm < 5.2359877e-2 || inclm > constants.pi - 5.2359877e-2){
            shs = 0.0;
        }
        if (sinim !== 0.0){
            shs = shs / sinim;
        }
        var sgs  = sghs - cosim * shs;

        //  ------------------------- do lunar terms ------------------
        dedt =  ses + s1  *  znl *  s5;
        didt =  sis + s2  *  znl * (z11 + z13);
        dmdt =  sls - znl *  s3  * (z1  + z3 - 14.0 - 6.0 * emsq);
        var sghl =  s4  * znl * (z31 +  z33 - 6.0);
        var shll = -znl * s2  * (z21 +  z23);
        //  sgp4fix for 180 deg incl
        if ((inclm < 5.2359877e-2) || (inclm > (constants.pi - 5.2359877e-2))){
            shll = 0.0;
        }
        domdt = sgs + sghl;
        dnodt = shs;
        if (sinim !== 0.0){
            domdt = domdt - cosim / sinim * shll;
            dnodt = dnodt + shll / sinim;
        }


        //  ----------- calculate deep space resonance effects --------
        var dndt    = 0.0;
        theta   = (gsto + tc * rptim) % constants.twoPi;
        em          = em + dedt * t;
        inclm       = inclm + didt * t;
        argpm       = argpm + domdt * t;
        nodem       = nodem + dnodt * t;
        mm          = mm + dmdt * t;

        //   sgp4fix for negative inclinations
        //   the following if statement should be commented out
        //if (inclm < 0.0)
        //  {
        //    inclm  = -inclm;
        //    argpm  = argpm - pi;
        //    nodem = nodem + pi;
        //  }


        //  -------------- initialize the resonance terms -------------
        if (irez !== 0) {
            aonv = Math.pow(nm / constants.xke, x2o3);
            //  ---------- geopotential resonance for 12 hour orbits ------
            if (irez === 2) {
                cosisq = cosim * cosim;
                var emo= em;
                em     = ecco;
                var emsqo  = emsq;
                emsq   = eccsq;
                eoc    = em * emsq;
                g201   = -0.306 - (em - 0.64) * 0.440;

                if (em <= 0.65){
                    g211 =    3.616  -  13.2470 * em +  16.2900 * emsq;
                    g310 =  -19.302  + 117.3900 * em - 228.4190 * emsq +  156.5910 * eoc;
                    g322 =  -18.9068 + 109.7927 * em - 214.6334 * emsq +  146.5816 * eoc;
                    g410 =  -41.122  + 242.6940 * em - 471.0940 * emsq +  313.9530 * eoc;
                    g422 = -146.407  + 841.8800 * em - 1629.014 * emsq + 1083.4350 * eoc;
                    g520 = -532.114  + 3017.977 * em - 5740.032 * emsq + 3708.2760 * eoc;
                }
                else {
                    g211 =   -72.099 +   331.819 * em -   508.738 * emsq +   266.724 * eoc;
                    g310 =  -346.844 +  1582.851 * em -  2415.925 * emsq +  1246.113 * eoc;
                    g322 =  -342.585 +  1554.908 * em -  2366.899 * emsq +  1215.972 * eoc;
                    g410 = -1052.797 +  4758.686 * em -  7193.992 * emsq +  3651.957 * eoc;
                    g422 = -3581.690 + 16178.110 * em - 24462.770 * emsq + 12422.520 * eoc;
                    if (em > 0.715) {
                        g520 =-5149.66 + 29936.92 * em - 54087.36 * emsq + 31324.56 * eoc;
                    }
                    else {
                        g520 = 1464.74 -  4664.75 * em +  3763.64 * emsq;
                    }
                }
                if (em < 0.7) {
                    g533 = -919.22770 + 4988.6100 * em - 9064.7700 * emsq + 5542.21  * eoc;
                    g521 = -822.71072 + 4568.6173 * em - 8491.4146 * emsq + 5337.524 * eoc;
                    g532 = -853.66600 + 4690.2500 * em - 8624.7700 * emsq + 5341.4  * eoc;
                }
                else{
                    g533 =-37995.780 + 161616.52 * em - 229838.20 * emsq + 109377.94 * eoc;
                    g521 =-51752.104 + 218913.95 * em - 309468.16 * emsq + 146349.42 * eoc;
                    g532 =-40023.880 + 170470.89 * em - 242699.48 * emsq + 115605.82 * eoc;
                }
                sini2 =  sinim * sinim;
                f220  =  0.75 * (1.0 + 2.0 * cosim+cosisq);
                f221  =  1.5 * sini2;
                f321  =  1.875 * sinim  *  (1.0 - 2.0 * cosim - 3.0 * cosisq);
                f322  = -1.875 * sinim  *  (1.0 + 2.0 * cosim - 3.0 * cosisq);
                f441  = 35.0 * sini2 * f220;
                f442  = 39.3750 * sini2 * sini2;
                f522  =  9.84375 * sinim * (sini2 * (1.0 - 2.0 * cosim- 5.0 * cosisq) +
                0.33333333 * (-2.0 + 4.0 * cosim + 6.0 * cosisq) );
                f523  = sinim * (4.92187512 * sini2 * (-2.0 - 4.0 * cosim +
                10.0 * cosisq) + 6.56250012 * (1.0+2.0 * cosim - 3.0 * cosisq));
                f542  = 29.53125 * sinim * (2.0 - 8.0 * cosim + cosisq *
                (-12.0    + 8.0   *  cosim + 10.0 * cosisq));
                f543  = 29.53125 * sinim * (-2.0 - 8.0   * cosim+cosisq *
                ( 12.0    + 8.0   * cosim - 10.0  * cosisq));

                xno2  =  nm     * nm;
                ainv2 =  aonv   * aonv;
                temp1 =  3.0    * xno2  * ainv2;
                temp  =  temp1  * root22;
                d2201 =  temp   * f220  * g201;
                d2211 =  temp   * f221  * g211;
                temp1 =  temp1  * aonv;
                temp  =  temp1  * root32;
                d3210 =  temp   * f321  * g310;
                d3222 =  temp   * f322  * g322;
                temp1 =  temp1  * aonv;
                temp  =  2.0    * temp1 * root44;
                d4410 =  temp   * f441  * g410;
                d4422 =  temp   * f442  * g422;
                temp1 =  temp1  * aonv;
                temp  =  temp1  * root52;
                d5220 =  temp   * f522  * g520;
                d5232 =  temp   * f523  * g532;
                temp  =  2.0    * temp1 * root54;
                d5421 =  temp   * f542  * g521;
                d5433 =  temp   * f543  * g533;
                xlamo = (mo     + nodeo + nodeo -  theta    - theta) % constants.twoPi;
                xfact =  mdot   + dmdt  + 2.0   * (nodedot  + dnodt  - rptim) - no;
                em    =  emo;
                emsq  =  emsqo;
            }
            //  ---------------- synchronous resonance terms --------------
            if (irez === 1) {
                g200  = 1.0 + emsq * (-2.5 + 0.8125 * emsq);
                g310  = 1.0 + 2.0 * emsq;
                g300  = 1.0 + emsq * (-6.0 + 6.60937 * emsq);
                f220  = 0.75 * (1.0 + cosim) * (1.0 + cosim);
                f311  = 0.9375 * sinim * sinim * (1.0 + 3.0 * cosim) - 0.75 * (1.0 + cosim);
                f330  = 1.0 + cosim;
                f330  = 1.875 * f330 * f330 * f330;
                del1  = 3.0 * nm * nm * aonv * aonv;
                del2  = 2.0 * del1 * f220 * g200 * q22;
                del3  = 3.0 * del1 * f330 * g300 * q33 * aonv;
                del1  = del1 * f311 * g310 * q31 * aonv;
                xlamo = (mo + nodeo + argpo - theta) % constants.twoPi;
                xfact = mdot + xpidot - rptim + dmdt + domdt + dnodt - no;
            }
            //  ------------ for sgp4, initialize the integrator ----------
            xli   = xlamo;
            xni   = no;
            atime = 0.0;
            nm    = no + dndt;
        }
        var dsinitResults = {
            em : em,
            argpm : argpm,
            inclm : inclm,
            mm : mm,
            nm : nm,
            nodem : nodem,

            irez : irez,
            atime : atime,

            d2201 : d2201,
            d2211 : d2211,
            d3210 : d3210,
            d3222 : d3222,
            d4410 : d4410,

            d4422 : d4422,
            d5220 : d5220,
            d5232 : d5232,
            d5421 : d5421,
            d5433 : d5433,

            dedt : dedt,
            didt : didt,
            dmdt : dmdt,
            dndt : dndt,
            dnodt : dnodt,
            domdt : domdt,

            del1 : del1,
            del2 : del2,
            del3 : del3,

            xfact : xfact,
            xlamo : xlamo,
            xli : xli,
            xni : xni
        };
        return dsinitResults;
    };
});
/*
 * satellite-js v1.2
 * (c) 2013 Shashwat Kandadai and UCSC
 * https://github.com/shashwatak/satellite-js
 * License: MIT
 */

define('initl',[
    './constants',
    './gstime/gstime'
], function(
    constants,
    gstime
) {
    'use strict';

    return function (initlParameters) {
        /*-----------------------------------------------------------------------------
         *
         *                           procedure initl
         *
         *  this procedure initializes the spg4 propagator. all the initialization is
         *    consolidated here instead of having multiple loops inside other routines.
         *
         *  author        : david vallado                  719-573-2600   28 jun 2005
         *
         *  inputs        :
         *    ecco        - eccentricity                           0.0 - 1.0
         *    epoch       - epoch time in days from jan 0, 1950. 0 hr
         *    inclo       - inclination of satellite
         *    no          - mean motion of satellite
         *    satn        - satellite number
         *
         *  outputs       :
         *    ainv        - 1.0 / a
         *    ao          - semi major axis
         *    con41       -
         *    con42       - 1.0 - 5.0 cos(i)
         *    cosio       - cosine of inclination
         *    cosio2      - cosio squared
         *    eccsq       - eccentricity squared
         *    method      - flag for deep space                    'd', 'n'
         *    omeosq      - 1.0 - ecco * ecco
         *    posq        - semi-parameter squared
         *    rp          - radius of perigee
         *    rteosq      - square root of (1.0 - ecco*ecco)
         *    sinio       - sine of inclination
         *    gsto        - gst at time of observation               rad
         *    no          - mean motion of satellite
         *
         *  locals        :
         *    ak          -
         *    d1          -
         *    del         -
         *    adel        -
         *    po          -
         *
         *  coupling      :
         *    getgravconst
         *    gstime      - find greenwich sidereal time from the julian date
         *
         *  references    :
         *    hoots, roehrich, norad spacetrack report #3 1980
         *    hoots, norad spacetrack report #6 1986
         *    hoots, schumacher and glover 2004
         *    vallado, crawford, hujsak, kelso  2006
         ----------------------------------------------------------------------------*/

        // TODO: defined but never used
        //var satn = initlParameters.satn;

        var ecco = initlParameters.ecco,
            epoch = initlParameters.epoch,
            inclo = initlParameters.inclo,
            no = initlParameters.no,
            method = initlParameters.method,
            opsmode = initlParameters.opsmode;

        var ak, d1, adel, po, gsto;

        // TODO: defined but never used
        // var del;

        // sgp4fix use old way of finding gst
        //  ----------------------- earth constants ----------------------
        //  sgp4fix identify constants and allow alternate values

        //  ------------- calculate auxillary epoch quantities ----------
        var eccsq = ecco * ecco;
        var omeosq = 1.0 - eccsq;
        var rteosq = Math.sqrt(omeosq);
        var cosio = Math.cos(inclo);
        var cosio2 = cosio * cosio;

        //  ------------------ un-kozai the mean motion -----------------
        ak = Math.pow(constants.xke / no, constants.x2o3);
        d1 = 0.75 * constants.j2 * (3.0 * cosio2 - 1.0) / (rteosq * omeosq);
        var delPrime = d1 / (ak * ak);
        adel = ak * (1.0 - delPrime * delPrime - delPrime *
        (1.0 / 3.0 + 134.0 * delPrime * delPrime / 81.0));
        delPrime = d1 / (adel * adel);
        no = no / (1.0 + delPrime);

        var ao = Math.pow(constants.xke / no, constants.x2o3);
        var sinio = Math.sin(inclo);
        po = ao * omeosq;
        var con42 = 1.0 - 5.0 * cosio2;
        var con41 = -con42 - cosio2 - cosio2;
        var ainv = 1.0 / ao;
        var posq = po * po;
        var rp = ao * (1.0 - ecco);
        method = 'n';

        //  sgp4fix modern approach to finding sidereal time
        if (opsmode === 'a') {
            //  sgp4fix use old way of finding gst
            //  count integer number of days from 0 jan 1970
            var ts70 = epoch - 7305.0;
            var ds70 = Math.floor(ts70 + 1.0e-8);
            var tfrac = ts70 - ds70;
            //  find greenwich location at epoch
            var c1 = 1.72027916940703639e-2;
            var thgr70 = 1.7321343856509374;
            var fk5r = 5.07551419432269442e-15;
            var c1p2p = c1 + constants.twoPi;
            gsto = ( thgr70 + c1 * ds70 + c1p2p * tfrac + ts70 * ts70 * fk5r) % constants.twoPi;
            if (gsto < 0.0) {
                gsto = gsto + constants.twoPi;
            }
        }
        else {
            gsto = gstime(epoch + 2433281.5);
        }

        var initlResults = {
            no: no,

            method: method,

            ainv: ainv,
            ao: ao,
            con41: con41,
            con42: con42,
            cosio: cosio,

            cosio2: cosio2,
            eccsq: eccsq,
            omeosq: omeosq,
            posq: posq,

            rp: rp,
            rteosq: rteosq,
            sinio: sinio,
            gsto: gsto
        };
        return initlResults;
    };
});
/*
 * satellite-js v1.2
 * (c) 2013 Shashwat Kandadai and UCSC
 * https://github.com/shashwatak/satellite-js
 * License: MIT
 */

define('sgp4init',[
    './constants',
    './dpper',
    './dscom',
    './dsinit',
    './initl',
    './sgp4'
], function(
    constants,
    dpper,
    dscom,
    dsinit,
    initl,
    sgp4
) {
    'use strict';

    return function(satrec, sgp4initParameters) {
        /*-----------------------------------------------------------------------------
         *
         *                             procedure sgp4init
         *
         *  this procedure initializes variables for sgp4.
         *
         *  author        : david vallado                  719-573-2600   28 jun 2005
         *
         *  inputs        :
         *    opsmode     - mode of operation afspc or improved 'a', 'i'
         *    satn        - satellite number
         *    bstar       - sgp4 type drag coefficient              kg/m2er
         *    ecco        - eccentricity
         *    epoch       - epoch time in days from jan 0, 1950. 0 hr
         *    argpo       - argument of perigee (output if ds)
         *    inclo       - inclination
         *    mo          - mean anomaly (output if ds)
         *    no          - mean motion
         *    nodeo       - right ascension of ascending node
         *
         *  outputs       :
         *    satrec      - common values for subsequent calls
         *    return code - non-zero on error.
         *                   1 - mean elements, ecc >= 1.0 or ecc < -0.001 or a < 0.95 er
         *                   2 - mean motion less than 0.0
         *                   3 - pert elements, ecc < 0.0  or  ecc > 1.0
         *                   4 - semi-latus rectum < 0.0
         *                   5 - epoch elements are sub-orbital
         *                   6 - satellite has decayed
         *
         *  locals        :
         *    cnodm  , snodm  , cosim  , sinim  , cosomm , sinomm
         *    cc1sq  , cc2    , cc3
         *    coef   , coef1
         *    cosio4      -
         *    day         -
         *    dndt        -
         *    em          - eccentricity
         *    emsq        - eccentricity squared
         *    eeta        -
         *    etasq       -
         *    gam         -
         *    argpm       - argument of perigee
         *    nodem       -
         *    inclm       - inclination
         *    mm          - mean anomaly
         *    nm          - mean motion
         *    perige      - perigee
         *    pinvsq      -
         *    psisq       -
         *    qzms24      -
         *    rtemsq      -
         *    s1, s2, s3, s4, s5, s6, s7          -
         *    sfour       -
         *    ss1, ss2, ss3, ss4, ss5, ss6, ss7         -
         *    sz1, sz2, sz3
         *    sz11, sz12, sz13, sz21, sz22, sz23, sz31, sz32, sz33        -
         *    tc          -
         *    temp        -
         *    temp1, temp2, temp3       -
         *    tsi         -
         *    xpidot      -
         *    xhdot1      -
         *    z1, z2, z3          -
         *    z11, z12, z13, z21, z22, z23, z31, z32, z33         -
         *
         *  coupling      :
         *    getgravconst-
         *    initl       -
         *    dscom       -
         *    dpper       -
         *    dsinit      -
         *    sgp4        -
         *
         *  references    :
         *    hoots, roehrich, norad spacetrack report #3 1980
         *    hoots, norad spacetrack report #6 1986
         *    hoots, schumacher and glover 2004
         *    vallado, crawford, hujsak, kelso  2006
         ----------------------------------------------------------------------------*/

        var opsmode = sgp4initParameters.opsmode,
            satn    = sgp4initParameters.satn,
            epoch   = sgp4initParameters.epoch,

            xbstar  = sgp4initParameters.xbstar,
            xecco   = sgp4initParameters.xecco,
            xargpo  = sgp4initParameters.xargpo,

            xinclo  = sgp4initParameters.xinclo,
            xmo     = sgp4initParameters.xmo,
            xno     = sgp4initParameters.xno,

            xnodeo  = sgp4initParameters.xnodeo;


        var cnodm,  snodm,  cosim,  sinim,  cosomm, sinomm,
            cc1sq,  cc2,    cc3,    coef,   coef1,  cosio4,
            day,    dndt,
            em, emsq, eeta, etasq,  gam,
            argpm,  nodem,  inclm,  mm,     nm,
            perige, pinvsq, psisq,  qzms24, rtemsq,
            s1,  s2,  s3,  s4,  s5,  s6,  s7,   sfour,
            ss1,ss2,    ss3,    ss4,    ss5,    ss6,    ss7,
            sz1, sz2, sz3,
            sz11, sz12, sz13, sz21, sz22, sz23, sz31, sz32, sz33,
            tc, temp,   temp1,  temp2,  temp3,  temp4, tsi,
            xpidot, xhdot1,
            z1, z2, z3,
            z11, z12, z13, z21, z22, z23, z31, z32, z33;
        /* ------------------------ initialization --------------------- */
        // sgp4fix divisor for divide by zero check on inclination
        // the old check used 1.0 + Math.cos(pi-1.0e-9), but then compared it to
        // 1.5 e-12, so the threshold was changed to 1.5e-12 for consistency

        temp4    =   1.5e-12;

        //  ----------- set all near earth variables to zero ------------
        satrec.isimp   = 0;   satrec.method = 'n'; satrec.aycof    = 0.0;
        satrec.con41   = 0.0; satrec.cc1    = 0.0; satrec.cc4      = 0.0;
        satrec.cc5     = 0.0; satrec.d2     = 0.0; satrec.d3       = 0.0;
        satrec.d4      = 0.0; satrec.delmo  = 0.0; satrec.eta      = 0.0;
        satrec.argpdot = 0.0; satrec.omgcof = 0.0; satrec.sinmao   = 0.0;
        satrec.t       = 0.0; satrec.t2cof  = 0.0; satrec.t3cof    = 0.0;
        satrec.t4cof   = 0.0; satrec.t5cof  = 0.0; satrec.x1mth2   = 0.0;
        satrec.x7thm1  = 0.0; satrec.mdot   = 0.0; satrec.nodedot  = 0.0;
        satrec.xlcof   = 0.0; satrec.xmcof  = 0.0; satrec.nodecf   = 0.0;

        //  ----------- set all deep space variables to zero ------------
        satrec.irez  = 0;   satrec.d2201 = 0.0; satrec.d2211 = 0.0;
        satrec.d3210 = 0.0; satrec.d3222 = 0.0; satrec.d4410 = 0.0;
        satrec.d4422 = 0.0; satrec.d5220 = 0.0; satrec.d5232 = 0.0;
        satrec.d5421 = 0.0; satrec.d5433 = 0.0; satrec.dedt  = 0.0;
        satrec.del1  = 0.0; satrec.del2  = 0.0; satrec.del3  = 0.0;
        satrec.didt  = 0.0; satrec.dmdt  = 0.0; satrec.dnodt = 0.0;
        satrec.domdt = 0.0; satrec.e3    = 0.0; satrec.ee2   = 0.0;
        satrec.peo   = 0.0; satrec.pgho  = 0.0; satrec.pho   = 0.0;
        satrec.pinco = 0.0; satrec.plo   = 0.0; satrec.se2   = 0.0;
        satrec.se3   = 0.0; satrec.sgh2  = 0.0; satrec.sgh3  = 0.0;
        satrec.sgh4  = 0.0; satrec.sh2   = 0.0; satrec.sh3   = 0.0;
        satrec.si2   = 0.0; satrec.si3   = 0.0; satrec.sl2   = 0.0;
        satrec.sl3   = 0.0; satrec.sl4   = 0.0; satrec.gsto  = 0.0;
        satrec.xfact = 0.0; satrec.xgh2  = 0.0; satrec.xgh3  = 0.0;
        satrec.xgh4  = 0.0; satrec.xh2   = 0.0; satrec.xh3   = 0.0;
        satrec.xi2   = 0.0; satrec.xi3   = 0.0; satrec.xl2   = 0.0;
        satrec.xl3   = 0.0; satrec.xl4   = 0.0; satrec.xlamo = 0.0;
        satrec.zmol  = 0.0; satrec.zmos  = 0.0; satrec.atime = 0.0;
        satrec.xli   = 0.0; satrec.xni   = 0.0;


        // sgp4fix - note the following variables are also passed directly via satrec.
        // it is possible to streamline the sgp4init call by deleting the "x"
        // variables, but the user would need to set the satrec.* values first. we
        // include the additional assignments in case twoline2rv is not used.

        satrec.bstar   = xbstar;
        satrec.ecco    = xecco;
        satrec.argpo   = xargpo;
        satrec.inclo   = xinclo;
        satrec.mo      = xmo;
        satrec.no      = xno;
        satrec.nodeo   = xnodeo;

        //  sgp4fix add opsmode
        satrec.operationmode = opsmode;

        //  ------------------------ earth constants -----------------------
        //  sgp4fix identify constants and allow alternate values


        var ss     = 78.0 / constants.earthRadius + 1.0;
        //  sgp4fix use multiply for speed instead of pow
        var qzms2ttemp = (120.0 - 78.0) / constants.earthRadius;
        var qzms2t = qzms2ttemp * qzms2ttemp * qzms2ttemp * qzms2ttemp;
        var x2o3   =  2.0 / 3.0;

        satrec.init = 'y';
        satrec.t    = 0.0;

        var initlParameters = {
            satn : satn,
            ecco : satrec.ecco,

            epoch : epoch,
            inclo : satrec.inclo,
            no : satrec.no,

            method : satrec.method,
            opsmode : satrec.operationmode
        };

        var initlResult= initl(initlParameters);

        satrec.no       = initlResult.no;

        // TODO: defined but never used
        //var method      = initlResult.method;
        //var ainv        = initlResult.ainv;

        var ao          = initlResult.ao;
        satrec.con41    = initlResult.con41;
        var con42       = initlResult.con42;
        var cosio       = initlResult.cosio;
        var cosio2      = initlResult.cosio2;
        var eccsq       = initlResult.eccsq;
        var omeosq      = initlResult.omeosq;
        var posq        = initlResult.posq;
        var rp          = initlResult.rp;
        var rteosq      = initlResult.rteosq;
        var sinio       = initlResult.sinio;
        satrec.gsto     = initlResult.gsto;

        satrec.error = 0;

        // sgp4fix remove this check as it is unnecessary
        // the mrt check in sgp4 handles decaying satellite cases even if the starting
        // condition is below the surface of te earth
        //     if (rp < 1.0)
        //       {
        //         printf("// *** satn%d epoch elts sub-orbital ***\n", satn);
        //         satrec.error = 5;
        //       }


        if (omeosq >= 0.0 || satrec.no >= 0.0){
            satrec.isimp = 0;
            if (rp < 220.0 / constants.earthRadius + 1.0){
                satrec.isimp = 1;
            }
            sfour  = ss;
            qzms24 = qzms2t;
            perige = (rp - 1.0) * constants.earthRadius;

            //  - for perigees below 156 km, s and qoms2t are altered -
            if (perige < 156.0){
                sfour = perige - 78.0;
                if (perige < 98.0){
                    sfour = 20.0;
                }
                //  sgp4fix use multiply for speed instead of pow
                var qzms24temp =  (120.0 - sfour) / constants.earthRadius;
                qzms24 = qzms24temp * qzms24temp * qzms24temp * qzms24temp;
                sfour  = sfour / constants.earthRadius + 1.0;
            }
            pinvsq = 1.0 / posq;

            tsi  = 1.0 / (ao - sfour);
            satrec.eta  = ao * satrec.ecco * tsi;
            etasq = satrec.eta * satrec.eta;
            eeta  = satrec.ecco * satrec.eta;
            psisq = Math.abs(1.0 - etasq);
            coef  = qzms24 * Math.pow(tsi, 4.0);
            coef1 = coef / Math.pow(psisq, 3.5);
            cc2   = coef1 * satrec.no * (ao * (1.0 + 1.5 * etasq + eeta *
                    (4.0 + etasq)) + 0.375 * constants.j2 * tsi / psisq * satrec.con41 *
                    (8.0 + 3.0 * etasq * (8.0 + etasq)));
            satrec.cc1   = satrec.bstar * cc2;
            cc3   = 0.0;
            if (satrec.ecco > 1.0e-4) {
                cc3 = -2.0 * coef * tsi * constants.j3oj2 * satrec.no * sinio / satrec.ecco;
            }
            satrec.x1mth2 = 1.0 - cosio2;
            satrec.cc4    = 2.0 * satrec.no * coef1 * ao * omeosq *
                            (satrec.eta * (2.0 + 0.5 * etasq) + satrec.ecco *
                            (0.5 + 2.0 * etasq) - constants.j2 * tsi / (ao * psisq) *
                            (-3.0 * satrec.con41 * (1.0 - 2.0 * eeta + etasq *
                            (1.5 - 0.5 * eeta)) + 0.75 * satrec.x1mth2 *
                            (2.0 * etasq - eeta * (1.0 + etasq)) * Math.cos(2.0 * satrec.argpo)));
            satrec.cc5 =    2.0 * coef1 * ao * omeosq * (1.0 + 2.75 *
                            (etasq + eeta) + eeta * etasq);
            cosio4 = cosio2 * cosio2;
            temp1 = 1.5 * constants.j2 * pinvsq * satrec.no;
            temp2 = 0.5 * temp1 * constants.j2 * pinvsq;
            temp3 = -0.46875 * constants.j4 * pinvsq * pinvsq * satrec.no;
            satrec.mdot   = satrec.no + 0.5 * temp1 * rteosq * satrec.con41 + 0.0625 *
                            temp2 * rteosq * (13.0 - 78.0 * cosio2 + 137.0 * cosio4);
            satrec.argpdot = (-0.5 * temp1 * con42 + 0.0625 * temp2 *
                            (7.0 - 114.0 * cosio2 + 395.0 * cosio4) +
            temp3 * (3.0 - 36.0 * cosio2 + 49.0 * cosio4));
            xhdot1 = -temp1 * cosio;
            satrec.nodedot = xhdot1 + (0.5 * temp2 * (4.0 - 19.0 * cosio2) +
                            2.0 * temp3 * (3.0 - 7.0 * cosio2)) * cosio;
            xpidot =  satrec.argpdot+ satrec.nodedot;
            satrec.omgcof   = satrec.bstar * cc3 * Math.cos(satrec.argpo);
            satrec.xmcof    = 0.0;
            if (satrec.ecco > 1.0e-4) {
                satrec.xmcof = -x2o3 * coef * satrec.bstar / eeta;
            }
            satrec.nodecf = 3.5 * omeosq * xhdot1 * satrec.cc1;
            satrec.t2cof   = 1.5 * satrec.cc1;
            //  sgp4fix for divide by zero with xinco = 180 deg
            if (Math.abs(cosio+1.0) > 1.5e-12){
                satrec.xlcof = -0.25 * constants.j3oj2 * sinio * (3.0 + 5.0 * cosio) / (1.0 + cosio);
            }
            else{
                satrec.xlcof = -0.25 * constants.j3oj2 * sinio * (3.0 + 5.0 * cosio) / temp4;
            }
            satrec.aycof   = -0.5 * constants.j3oj2 * sinio;
            //  sgp4fix use multiply for speed instead of pow
            var delmotemp = 1.0 + satrec.eta * Math.cos(satrec.mo);
            satrec.delmo   = delmotemp * delmotemp * delmotemp;
            satrec.sinmao  = Math.sin(satrec.mo);
            satrec.x7thm1  = 7.0 * cosio2 - 1.0;

            //  --------------- deep space initialization -------------
            if (2*constants.pi / satrec.no >= 225.0){
                satrec.method = 'd';
                satrec.isimp  = 1;
                tc    =  0.0;
                inclm = satrec.inclo;

                var dscomParameters = {
                    epoch : epoch,
                    ep : satrec.ecco,
                    argpp : satrec.argpo,
                    tc : tc,
                    inclp : satrec.inclo,
                    nodep : satrec.nodeo,

                    np : satrec.no,

                    e3 : satrec.e3,
                    ee2 : satrec.ee2,

                    peo : satrec.peo,
                    pgho : satrec.pgho,
                    pho : satrec.pho,
                    pinco : satrec.pinco,

                    plo : satrec.plo,
                    se2 : satrec.se2,
                    se3 : satrec.se3,

                    sgh2 : satrec.sgh2,
                    sgh3 : satrec.sgh3,
                    sgh4 : satrec.sgh4,

                    sh2 : satrec.sh2,
                    sh3 : satrec.sh3,
                    si2 : satrec.si2,
                    si3 : satrec.si3,

                    sl2 : satrec.sl2,
                    sl3 : satrec.sl3,
                    sl4 : satrec.sl4,

                    xgh2 : satrec.xgh2,
                    xgh3 : satrec.xgh3,
                    xgh4 : satrec.xgh4,
                    xh2 : satrec.xh2,

                    xh3 : satrec.xh3,
                    xi2 : satrec.xi2,
                    xi3 : satrec.xi3,
                    xl2 : satrec.xl2,

                    xl3 : satrec.xl3,
                    xl4 : satrec.xl4,

                    zmol : satrec.zmol,
                    zmos : satrec.zmos
                };

                var dscomResult = dscom(dscomParameters);

                snodm = dscomResult.snodm;
                cnodm = dscomResult.cnodm;
                sinim = dscomResult.sinim;
                cosim = dscomResult.cosim;
                sinomm = dscomResult.sinomm;

                cosomm = dscomResult.cosomm;
                day = dscomResult.day;
                satrec.e3 = dscomResult.e3;
                satrec.ee2 = dscomResult.ee2;
                em = dscomResult.em;

                emsq = dscomResult.emsq;
                gam = dscomResult.gam;
                satrec.peo = dscomResult.peo;
                satrec.pgho = dscomResult.pgho;
                satrec.pho = dscomResult.pho;

                satrec.pinco = dscomResult.pinco;
                satrec.plo = dscomResult.plo;
                rtemsq = dscomResult.rtemsq;
                satrec.se2 = dscomResult.se2;
                satrec.se3 = dscomResult.se3;

                satrec.sgh2 = dscomResult.sgh2;
                satrec.sgh3 = dscomResult.sgh3;
                satrec.sgh4 = dscomResult.sgh4;
                satrec.sh2 = dscomResult.sh2;
                satrec.sh3 = dscomResult.sh3;

                satrec.si2 = dscomResult.si2;
                satrec.si3 = dscomResult.si3;
                satrec.sl2 = dscomResult.sl2;
                satrec.sl3 = dscomResult.sl3;
                satrec.sl4 = dscomResult.sl4;

                s1 = dscomResult.s1;
                s2 = dscomResult.s2;
                s3 = dscomResult.s3;
                s4 = dscomResult.s4;
                s5 = dscomResult.s5;

                s6 = dscomResult.s6;
                s7 = dscomResult.s7;
                ss1 = dscomResult.ss1;
                ss2 = dscomResult.ss2;
                ss3 = dscomResult.ss3;

                ss4 = dscomResult.ss4;
                ss5 = dscomResult.ss5;
                ss6 = dscomResult.ss6;
                ss7 = dscomResult.ss7;
                sz1 = dscomResult.sz1;

                sz2 = dscomResult.sz2;
                sz3 = dscomResult.sz3;
                sz11 = dscomResult.sz11;
                sz12 = dscomResult.sz12;
                sz13 = dscomResult.sz13;

                sz21 = dscomResult.sz21;
                sz22 = dscomResult.sz22;
                sz23 = dscomResult.sz23;
                sz31 = dscomResult.sz31;
                sz32 = dscomResult.sz32;

                sz33 = dscomResult.sz33;
                satrec.xgh2 = dscomResult.xgh2;
                satrec.xgh3 = dscomResult.xgh3;
                satrec.xgh4 = dscomResult.xgh4;
                satrec.xh2 = dscomResult.xh2;

                satrec.xh3 = dscomResult.xh3;
                satrec.xi2 = dscomResult.xi2;
                satrec.xi3 = dscomResult.xi3;
                satrec.xl2 = dscomResult.xl2;
                satrec.xl3 = dscomResult.xl3;

                satrec.xl4 = dscomResult.xl4;
                nm = dscomResult.nm;
                z1 = dscomResult.z1;
                z2 = dscomResult.z2;
                z3 = dscomResult.z3;

                z11 = dscomResult.z11;
                z12 = dscomResult.z12;
                z13 = dscomResult.z13;
                z21 = dscomResult.z21;
                z22 = dscomResult.z22;

                z23 = dscomResult.z23;
                z31 = dscomResult.z31;
                z32 = dscomResult.z32;
                z33 = dscomResult.z33;
                satrec.zmol = dscomResult.zmol;
                satrec.zmos = dscomResult.zmos;

                var dpperParameters = {
                    inclo : inclm,
                    init : satrec.init,
                    ep : satrec.ecco,
                    inclp : satrec.inclo,
                    nodep : satrec.nodeo,
                    argpp : satrec.argpo,
                    mp : satrec.mo,
                    opsmode : satrec.operationmode
                };

                var dpperResult = dpper(satrec, dpperParameters);

                satrec.ecco = dpperResult.ep;
                satrec.inclo = dpperResult.inclp;
                satrec.nodeo = dpperResult.nodep;
                satrec.argpo = dpperResult.argpp;
                satrec.mo = dpperResult.mp;

                argpm  = 0.0;
                nodem  = 0.0;
                mm     = 0.0;

                var dsinitParameters = {
                    cosim : cosim,
                    emsq : emsq,
                    argpo : satrec.argpo,
                    s1 : s1,
                    s2 : s2,
                    s3 : s3,
                    s4 : s4,
                    s5 : s5,
                    sinim : sinim,
                    ss1 : ss1,
                    ss2 : ss2,
                    ss3 : ss3,
                    ss4 : ss4,
                    ss5 : ss5,
                    sz1 : sz1,
                    sz3 : sz3,
                    sz11 : sz11,
                    sz13 : sz13,
                    sz21 : sz21,
                    sz23 : sz23,
                    sz31 : sz31,
                    sz33 : sz33,
                    t : satrec.t,
                    tc : tc,
                    gsto : satrec.gsto,
                    mo : satrec.mo,
                    mdot : satrec.mdot,
                    no : satrec.no,
                    nodeo : satrec.nodeo,
                    nodedot : satrec.nodedot,
                    xpidot : xpidot,
                    z1 : z1,
                    z3 : z3,
                    z11 : z11,
                    z13 : z13,
                    z21 : z21,
                    z23 : z23,
                    z31 : z31,
                    z33 : z33,
                    ecco : satrec.ecco,
                    eccsq : eccsq,
                    em : em,
                    argpm : argpm,
                    inclm : inclm,
                    mm : mm,
                    nm : nm,
                    nodem : nodem,
                    irez : satrec.irez,
                    atime : satrec.atime,
                    d2201 : satrec.d2201,
                    d2211 : satrec.d2211,
                    d3210 : satrec.d3210,
                    d3222 : satrec.d3222 ,
                    d4410 : satrec.d4410,
                    d4422 : satrec.d4422,
                    d5220 : satrec.d5220,
                    d5232 : satrec.d5232,
                    d5421 : satrec.d5421,
                    d5433 : satrec.d5433,
                    dedt : satrec.dedt,
                    didt : satrec.didt,
                    dmdt : satrec.dmdt,
                    dnodt : satrec.dnodt,
                    domdt : satrec.domdt,
                    del1 : satrec.del1,
                    del2 : satrec.del2,
                    del3 : satrec.del3,
                    xfact : satrec.xfact,
                    xlamo : satrec.xlamo,
                    xli : satrec.xli,
                    xni : satrec.xni
                };

                var dsinitResult = dsinit( dsinitParameters );

                em              = dsinitResult.em;
                argpm           = dsinitResult.argpm;
                inclm           = dsinitResult.inclm;
                mm              = dsinitResult.mm;
                nm              = dsinitResult.nm;

                nodem           = dsinitResult.nodem;
                satrec.irez     = dsinitResult.irez;
                satrec.atime    = dsinitResult.atime;
                satrec.d2201    = dsinitResult.d2201;
                satrec.d2211    = dsinitResult.d2211;

                satrec.d3210    = dsinitResult.d3210;
                satrec.d3222    = dsinitResult.d3222;
                satrec.d4410    = dsinitResult.d4410;
                satrec.d4422    = dsinitResult.d4422;
                satrec.d5220    = dsinitResult.d5220;

                satrec.d5232    = dsinitResult.d5232;
                satrec.d5421    = dsinitResult.d5421;
                satrec.d5433    = dsinitResult.d5433;
                satrec.dedt     = dsinitResult.dedt;
                satrec.didt     = dsinitResult.didt;

                satrec.dmdt     = dsinitResult.dmdt;
                dndt            = dsinitResult.dndt;
                satrec.dnodt    = dsinitResult.dnodt;
                satrec.domdt    = dsinitResult.domdt;
                satrec.del1     = dsinitResult.del1;

                satrec.del2     = dsinitResult.del2;
                satrec.del3     = dsinitResult.del3;
                satrec.xfact    = dsinitResult.xfact;
                satrec.xlamo    = dsinitResult.xlamo;
                satrec.xli      = dsinitResult.xli;

                satrec.xni      = dsinitResult.xni;
            }

            //----------- set variables if not deep space -----------
            if (satrec.isimp !== 1){
                cc1sq       = satrec.cc1 * satrec.cc1;
                satrec.d2   = 4.0 * ao * tsi * cc1sq;
                temp        = satrec.d2 * tsi * satrec.cc1 / 3.0;
                satrec.d3   = (17.0 * ao + sfour) * temp;
                satrec.d4   = 0.5 * temp * ao * tsi * (221.0 * ao + 31.0 * sfour) * satrec.cc1;
                satrec.t3cof= satrec.d2 + 2.0 * cc1sq;
                satrec.t4cof= 0.25 * (3.0 * satrec.d3 + satrec.cc1 *
                (12.0 * satrec.d2 + 10.0 * cc1sq));
                satrec.t5cof= 0.2 * (3.0 * satrec.d4 +
                12.0 * satrec.cc1 * satrec.d3 +
                6.0 * satrec.d2 * satrec.d2 +
                15.0 * cc1sq * (2.0 * satrec.d2 + cc1sq));
            }


            /* finally propogate to zero epoch to initialize all others. */
            // sgp4fix take out check to let satellites process until they are actually below earth surface
            //  if(satrec.error == 0)
        }
        sgp4(satrec, 0.0);

        satrec.init = 'n';

        // sgp4fix return boolean. satrec.error contains any error codes
        return true;
    };
});
/*
 * satellite-js v1.2
 * (c) 2013 Shashwat Kandadai and UCSC
 * https://github.com/shashwatak/satellite-js
 * License: MIT
 */

define('propagate/twoline2satrec',[
    '../constants',
    '../gstime/days2mdhms',
    '../gstime/jday',
    '../sgp4init'
], function(
    constants,
    days2mdhms,
    jday,
    sgp4init
) {
    'use strict';

    return function twoline2rv(longstr1, longstr2){
        /*Return a Satellite imported from two lines of TLE data.

         Provide the two TLE lines as strings `longstr1` and `longstr2`,
         and select which standard set of gravitational constants you want
         by providing `gravity_constants`:

         `sgp4.propagation.wgs72` - Standard WGS 72 model
         `sgp4.propagation.wgs84` - More recent WGS 84 model
         `sgp4.propagation.wgs72old` - Legacy support for old SGP4 behavior

         Normally, computations are made using various recent improvements
         to the algorithm.  If you want to turn some of these off and go
         back into "afspc" mode, then set `afspc_mode` to `True`. */

        var opsmode = 'i';
        var xpdotp   =  1440.0 / (2.0 *constants.pi);  //  229.1831180523293;
        var revnum = 0;
        var elnum = 0;
        var year = 0;

        var satrec = {};
        satrec.error = 0;

        // TODO: defined but never used
        //var cardnumb        = parseInt(longstr1.substring(0, 1), 10);

        satrec.satnum       = longstr1.substring(2, 7);

        // TODO: defined but never used
        //var classification  = longstr1.substring(7, 8);
        //var intldesg        = longstr1.substring(9, 11);

        satrec.epochyr      = parseInt(longstr1.substring(18, 20), 10);
        satrec.epochdays    = parseFloat(longstr1.substring(20, 32));
        satrec.ndot         = parseFloat(longstr1.substring(33, 43));
        satrec.nddot        = parseFloat(
                                '.' + parseInt(longstr1.substring(44, 50), 10) +
                                'E' + longstr1.substring(50, 52)
                            );
        satrec.bstar        = parseFloat(
                                longstr1.substring(53, 54) +
                                '.' +  parseInt(longstr1.substring(54, 59), 10) +
                                'E' + longstr1.substring(59, 61)
                            );

        // TODO: defined but never used
        //var numb            = parseInt(longstr1.substring(62, 63), 10);

        elnum               = parseInt(longstr1.substring(64, 68), 10);

        //satrec.satnum   = longstr2.substring(2, 7);
        satrec.inclo    = parseFloat(longstr2.substring(8, 16));
        satrec.nodeo    = parseFloat(longstr2.substring(17, 25));
        satrec.ecco     = parseFloat('.' + longstr2.substring(26, 33));
        satrec.argpo    = parseFloat(longstr2.substring(34, 42));
        satrec.mo       = parseFloat(longstr2.substring(43, 51));
        satrec.no       = parseFloat(longstr2.substring(52, 63));
        revnum          = parseFloat(longstr2.substring(63, 68));


        //  ---- find no, ndot, nddot ----
        satrec.no   = satrec.no / xpdotp; //   rad/min
        //satrec.nddot= satrec.nddot * Math.pow(10.0, nexp);
        //satrec.bstar= satrec.bstar * Math.pow(10.0, ibexp);

        //  ---- convert to sgp4 units ----
        satrec.a    = Math.pow( satrec.no*constants.tumin , (-2.0/3.0) );
        satrec.ndot = satrec.ndot  / (xpdotp*1440.0);  //   ? * minperday
        satrec.nddot= satrec.nddot / (xpdotp*1440.0*1440);

        //  ---- find standard orbital elements ----
        satrec.inclo = satrec.inclo  * constants.deg2rad;
        satrec.nodeo = satrec.nodeo  * constants.deg2rad;
        satrec.argpo = satrec.argpo  * constants.deg2rad;
        satrec.mo    = satrec.mo     * constants.deg2rad;

        satrec.alta = satrec.a*(1.0 + satrec.ecco) - 1.0;
        satrec.altp = satrec.a*(1.0 - satrec.ecco) - 1.0;


        // ----------------------------------------------------------------
        // find sgp4epoch time of element set
        // remember that sgp4 uses units of days from 0 jan 1950 (sgp4epoch)
        // and minutes from the epoch (time)
        // ----------------------------------------------------------------

        // ---------------- temp fix for years from 1957-2056 -------------------
        // --------- correct fix will occur when year is 4-digit in tle ---------

        if (satrec.epochyr < 57){
            year = satrec.epochyr + 2000;
        }
        else{
            year = satrec.epochyr + 1900;
        }


        var mdhmsResult = days2mdhms(year, satrec.epochdays);
        var mon      = mdhmsResult.mon;
        var day      = mdhmsResult.day;
        var hr       = mdhmsResult.hr;
        var minute   = mdhmsResult.minute;
        var sec      = mdhmsResult.sec;
        satrec.jdsatepoch = jday(year, mon, day, hr, minute, sec);

        //  ---------------- initialize the orbit at sgp4epoch -------------------
        var sgp4initParameters = {
            opsmode : opsmode,
            satn : satrec.satnum,
            epoch : satrec.jdsatepoch-2433281.5,
            xbstar : satrec.bstar,

            xecco : satrec.ecco,
            xargpo : satrec.argpo,
            xinclo : satrec.inclo,
            xmo : satrec.mo,
            xno : satrec.no,

            xnodeo : satrec.nodeo
        };

        sgp4init(satrec, sgp4initParameters );

        return satrec;
    };
});
define('satellite',[
    './constants',
    './coordinate-transforms/degrees-lat',
    './coordinate-transforms/degrees-long',
    './coordinate-transforms/ecf-to-eci',
    './coordinate-transforms/ecf-to-look-angles',
    './coordinate-transforms/eci-to-ecf',
    './coordinate-transforms/eci-to-geodetic',
    './coordinate-transforms/geodetic-to-ecf',
    './coordinate-transforms/topocentric',
    './coordinate-transforms/topocentric-to-look-angles',
    './doppler-factor',
    './gstime/days2mdhms',
    './gstime/gstime',
    './gstime/jday',
    './propagate/propagate',
    './propagate/twoline2satrec',
    './sgp4'
], function(
    constants,
    degreesLat,
    degreesLong,
    ecfToEci,
    ecfToLookAngles,
    eciToEcf,
    eciToGeodetic,
    geodeticToEcf,
    topocentric,
    topocentricToLookAngles,
    dopplerFactor,
    days2mdhms,
    gstime,
    jday,
    propagate,
    twoline2satrec,
    sgp4
) {
    'use strict';

    return {
        version: '1.2.0',
        constants: constants,

        // Coordinate transforms
        degreesLat: degreesLat,
        degreesLong: degreesLong,
        eciToEcf: eciToEcf,
        ecfToEci: ecfToEci,
        eciToGeodetic: eciToGeodetic,
        ecfToLookAngles: ecfToLookAngles,
        geodeticToEcf: geodeticToEcf,

        dopplerFactor: dopplerFactor,
        gstimeFromJday: gstime,
        gstimeFromDate: function() {
            return gstime(jday.apply(null, arguments));
        },
        jday: jday,
        propagate: propagate,
        twoline2satrec: twoline2satrec,
        sgp4: sgp4
    };
});
    return require('satellite');
}));
//# sourceMappingURL=satellite.js.map