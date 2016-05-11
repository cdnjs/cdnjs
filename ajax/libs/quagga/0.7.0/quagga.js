(function (root, factory) {
    var factorySource = factory.toString();

    if (typeof module !== 'undefined') {
        module.exports = factory(factorySource);
    } else {
        //Browser globals case. Just assign the
        //result to a property on the global.
        root.Quagga = factory(factorySource);
    }
}(this, function (__factorySource__) {/**
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

/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

define('image_loader',[],function() {
    "use strict";

    var ImageLoader = {};
    ImageLoader.load = function(directory, callback, offset, size, sequence) {
        var htmlImagesSrcArray = new Array(size),
            htmlImagesArray = new Array(htmlImagesSrcArray.length),
            i,
            img,
            num;
            
        if (sequence === false) {
            htmlImagesSrcArray[0] = directory;
        } else {
            for ( i = 0; i < htmlImagesSrcArray.length; i++) {
                num = (offset + i);
                htmlImagesSrcArray[i] = directory + "image-" + ("00" + num).slice(-3) + ".jpg";
            }
        }
        htmlImagesArray.notLoaded = [];
        htmlImagesArray.addImage = function(img) {
            htmlImagesArray.notLoaded.push(img);
        };
        htmlImagesArray.loaded = function(loadedImg) {
            var notloadedImgs = htmlImagesArray.notLoaded;
            for (var x = 0; x < notloadedImgs.length; x++) {
                if (notloadedImgs[x] == loadedImg) {
                    notloadedImgs.splice(x, 1);
                    for (var y = 0; y < htmlImagesSrcArray.length; y++) {
                        var imgName = htmlImagesSrcArray[y].substr(htmlImagesSrcArray[y].lastIndexOf("/"));
                        if (loadedImg.src.lastIndexOf(imgName) != -1) {
                            htmlImagesArray[y] = loadedImg;
                            break;
                        }
                    }
                    break;
                }
            }
            if (notloadedImgs.length === 0) {
                console.log("Images loaded");
                callback.apply(null, [htmlImagesArray]);
            }
        };
        
        for ( i = 0; i < htmlImagesSrcArray.length; i++) {
            img = new Image();
            htmlImagesArray.addImage(img);
            addOnloadHandler(img, htmlImagesArray);
            img.src = htmlImagesSrcArray[i];
        }
    };
    
    function addOnloadHandler(img, htmlImagesArray) {
        img.onload = function() {
            htmlImagesArray.loaded(this);
        };
    }

    return (ImageLoader);
});

/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

define('input_stream',["image_loader"], function(ImageLoader) {
    "use strict";

    var InputStream = {};
    InputStream.createVideoStream = function(video) {
        var that = {},
            _config = null,
            _eventNames = ['canrecord', 'ended'],
            _eventHandlers = {},
            _calculatedWidth,
            _calculatedHeight,
            _topRight = {x: 0, y: 0},
            _canvasSize = {x: 0, y: 0};

        function initSize() {
            var width = video.videoWidth,
                height = video.videoHeight;

            _calculatedWidth = _config.size ? width/height > 1 ? _config.size : Math.floor((width/height) * _config.size) : width;
            _calculatedHeight = _config.size ? width/height > 1 ? Math.floor((height/width) * _config.size) : _config.size : height;

            _canvasSize.x = _calculatedWidth;
            _canvasSize.y = _calculatedHeight;
        }

        that.getRealWidth = function() {
            return video.videoWidth;
        };

        that.getRealHeight = function() {
            return video.videoHeight;
        };

        that.getWidth = function() {
            return _calculatedWidth;
        };

        that.getHeight = function() {
            return _calculatedHeight;
        };

        that.setWidth = function(width) {
            _calculatedWidth = width;
        };

        that.setHeight = function(height) {
            _calculatedHeight = height;
        };

        that.setInputStream = function(config) {
            _config = config;
            video.src = (typeof config.src !== 'undefined') ? config.src : '';
        };

        that.ended = function() {
            return video.ended;
        };

        that.getConfig = function() {
            return _config;
        };

        that.setAttribute = function(name, value) {
            video.setAttribute(name, value);
        };

        that.pause = function() {
            video.pause();
        };

        that.play = function() {
            video.play();
        };

        that.setCurrentTime = function(time) {
            if (_config.type !== "LiveStream")
                video.currentTime = time;
        };

        that.addEventListener = function(event, f, bool) {
            if (_eventNames.indexOf(event) !== -1) {
                if (!_eventHandlers[event]) {
                    _eventHandlers[event] = [];
                }
                _eventHandlers[event].push(f);
            } else {
                video.addEventListener(event, f, bool);
            }
        };

        that.clearEventHandlers = function() {
            _eventNames.forEach(function(eventName) {
                var handlers = _eventHandlers[eventName];
                if (handlers && handlers.length > 0) {
                    handlers.forEach(function(handler) {
                        video.removeEventListener(eventName, handler);
                    });
                }
            });
        };

        that.trigger = function(eventName, args) {
            var j,
                handlers = _eventHandlers[eventName];

            if (eventName === 'canrecord') {
                initSize();
            }
            if (handlers && handlers.length > 0) {
                for ( j = 0; j < handlers.length; j++) {
                    handlers[j].apply(that, args);
                }
            }
        };

        that.setTopRight = function(topRight) {
            _topRight.x = topRight.x;
            _topRight.y = topRight.y;
        };

        that.getTopRight = function() {
            return _topRight;
        };

        that.setCanvasSize = function(size) {
            _canvasSize.x = size.x;
            _canvasSize.y = size.y;
        };

        that.getCanvasSize = function() {
            return _canvasSize;
        };

        that.getFrame = function() {
            return video;
        };

        return that;
    };

    InputStream.createLiveStream = function(video) {
        video.setAttribute("autoplay", true);
        var that = InputStream.createVideoStream(video);

        that.ended = function() {
            return false;
        };

        return that;
    };

    InputStream.createImageStream = function() {
        var that = {};
        var _config = null;

        var width = 0,
            height = 0,
            frameIdx = 0,
            paused = true,
            loaded = false,
            imgArray = null,
            size = 0,
            offset = 1,
            baseUrl = null,
            ended = false,
            calculatedWidth,
            calculatedHeight,
            _eventNames = ['canrecord', 'ended'],
            _eventHandlers = {},
            _topRight = {x: 0, y: 0},
            _canvasSize = {x: 0, y: 0};

        function loadImages() {
            loaded = false;
            ImageLoader.load(baseUrl, function(imgs) {
                imgArray = imgs;
                width = imgs[0].width;
                height = imgs[0].height;
                calculatedWidth = _config.size ? width/height > 1 ? _config.size : Math.floor((width/height) * _config.size) : width;
                calculatedHeight = _config.size ? width/height > 1 ? Math.floor((height/width) * _config.size) : _config.size : height;
                _canvasSize.x = calculatedWidth;
                _canvasSize.y = calculatedHeight;
                loaded = true;
                frameIdx = 0;
                setTimeout(function() {
                    publishEvent("canrecord", []);
                }, 0);
            }, offset, size, _config.sequence);
        }

        function publishEvent(eventName, args) {
            var j,
                handlers = _eventHandlers[eventName];
                
            if (handlers && handlers.length > 0) {
                for ( j = 0; j < handlers.length; j++) {
                    handlers[j].apply(that, args);
                }
            }
        }


        that.trigger = publishEvent;

        that.getWidth = function() {
            return calculatedWidth;
        };

        that.getHeight = function() {
            return calculatedHeight;
        };

        that.setWidth = function(width) {
            calculatedWidth = width;
        };

        that.setHeight = function(height) {
            calculatedHeight = height;
        };

        that.getRealWidth = function() {
            return width;
        };

        that.getRealHeight = function() {
            return height;
        };

        that.setInputStream = function(stream) {
            _config = stream;
            if (stream.sequence === false) {
                baseUrl = stream.src;
                size = 1;
            } else {
                baseUrl = stream.src;
                size = stream.length;
            }
            loadImages();
        };

        that.ended = function() {
            return ended;
        };

        that.setAttribute = function() {};

        that.getConfig = function() {
            return _config;
        };

        that.pause = function() {
            paused = true;
        };

        that.play = function() {
            paused = false;
        };

        that.setCurrentTime = function(time) {
            frameIdx = time;
        };

        that.addEventListener = function(event, f) {
            if (_eventNames.indexOf(event) !== -1) {
                if (!_eventHandlers[event]) {
                    _eventHandlers[event] = [];
                }
                _eventHandlers[event].push(f);
            }
        };

        that.setTopRight = function(topRight) {
            _topRight.x = topRight.x;
            _topRight.y = topRight.y;
        };

        that.getTopRight = function() {
            return _topRight;
        };

        that.setCanvasSize = function(size) {
            _canvasSize.x = size.x;
            _canvasSize.y = size.y;
        };

        that.getCanvasSize = function() {
            return _canvasSize;
        };

        that.getFrame = function() {
            var frame;
            
            if (!loaded){
                return null;
            }
            if (!paused) {
                frame = imgArray[frameIdx];
                if (frameIdx < (size - 1)) {
                    frameIdx++;
                } else {
                    setTimeout(function() {
                        ended = true;
                        publishEvent("ended", []);
                    }, 0);
                }
            }
            return frame;
        };

        return that;
    };

    return (InputStream);
});

/*
 * typedefs.js
 * Normalizes browser-specific prefixes
 */

glMatrixArrayType = Float32Array;
if (typeof window !== 'undefined') {
    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
}
Math.imul = Math.imul || function(a, b) {
    var ah = (a >>> 16) & 0xffff,
        al = a & 0xffff,
        bh = (b >>> 16) & 0xffff,
        bl = b & 0xffff;
    // the shift by 0 fixes the sign on the high part
    // the final |0 converts the unsigned value into a signed value
    return ((al * bl) + (((ah * bl + al * bh) << 16) >>> 0)|0);
};
define("typedefs", (function (global) {
    return function () {
        var ret, fn;
        return ret || global.typedefs;
    };
}(this)));

/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

define('subImage',["typedefs"], function() {
    "use strict";

    /**
     * Construct representing a part of another {ImageWrapper}. Shares data
     * between the parent and the child.
     * @param from {ImageRef} The position where to start the {SubImage} from. (top-left corner)
     * @param size {ImageRef} The size of the resulting image
     * @param I {ImageWrapper} The {ImageWrapper} to share from
     * @returns {SubImage} A shared part of the original image
     */
    function SubImage(from, size, I) {
        if (!I) {
            I = {
                data : null,
                size : size
            };
        }
        this.data = I.data;
        this.originalSize = I.size;
        this.I = I;

        this.from = from;
        this.size = size;
    }

    /**
     * Displays the {SubImage} in a given canvas
     * @param canvas {Canvas} The canvas element to write to
     * @param scale {Number} Scale which is applied to each pixel-value
     */
    SubImage.prototype.show = function(canvas, scale) {
        var ctx,
            frame,
            data,
            current,
            y,
            x,
            pixel;
            
        if (!scale) {
            scale = 1.0;
        }
        ctx = canvas.getContext('2d');
        canvas.width = this.size.x;
        canvas.height = this.size.y;
        frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
        data = frame.data;
        current = 0;
        for (y = 0; y < this.size.y; y++) {
            for (x = 0; x < this.size.x; x++) {
                pixel = y * this.size.x + x;
                current = this.get(x, y) * scale;
                data[pixel * 4 + 0] = current;
                data[pixel * 4 + 1] = current;
                data[pixel * 4 + 2] = current;
                data[pixel * 4 + 3] = 255;
            }
        }
        frame.data = data;
        ctx.putImageData(frame, 0, 0);
    };

    /**
     * Retrieves a given pixel position from the {SubImage}
     * @param x {Number} The x-position
     * @param y {Number} The y-position
     * @returns {Number} The grayscale value at the pixel-position
     */
    SubImage.prototype.get = function(x, y) {
        return this.data[(this.from.y + y) * this.originalSize.x + this.from.x + x];
    };

    /**
     * Updates the underlying data from a given {ImageWrapper}
     * @param image {ImageWrapper} The updated image
     */
    SubImage.prototype.updateData = function(image) {
        this.originalSize = image.size;
        this.data = image.data;
    };

    /**
     * Updates the position of the shared area
     * @param from {x,y} The new location
     * @returns {SubImage} returns {this} for possible chaining
     */
    SubImage.prototype.updateFrom = function(from) {
        this.from = from;
        return this;
    };
    
    return (SubImage);
}); 
/**
 * @fileoverview gl-matrix - High performance matrix and vector operations
 * @author Brandon Jones
 * @author Colin MacKenzie IV
 * @version 2.3.0
 */

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

!function(t,n){if("object"==typeof exports&&"object"==typeof module)module.exports=n();else if("function"==typeof define&&define.amd)define('gl-matrix',n);else{var r=n();for(var a in r)("object"==typeof exports?exports:t)[a]=r[a]}}(this,function(){return function(t){function n(a){if(r[a])return r[a].exports;var e=r[a]={exports:{},id:a,loaded:!1};return t[a].call(e.exports,e,e.exports,n),e.loaded=!0,e.exports}var r={};return n.m=t,n.c=r,n.p="",n(0)}([function(t,n,r){n.glMatrix=r(1),n.mat2=r(2),n.mat2d=r(3),n.mat3=r(4),n.mat4=r(5),n.quat=r(6),n.vec2=r(9),n.vec3=r(7),n.vec4=r(8)},function(t,n){var r={};r.EPSILON=1e-6,r.ARRAY_TYPE="undefined"!=typeof Float32Array?Float32Array:Array,r.RANDOM=Math.random,r.setMatrixArrayType=function(t){GLMAT_ARRAY_TYPE=t};var a=Math.PI/180;r.toRadian=function(t){return t*a},t.exports=r},function(t,n,r){var a=r(1),e={};e.create=function(){var t=new a.ARRAY_TYPE(4);return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t},e.clone=function(t){var n=new a.ARRAY_TYPE(4);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n},e.copy=function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t},e.identity=function(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t},e.transpose=function(t,n){if(t===n){var r=n[1];t[1]=n[2],t[2]=r}else t[0]=n[0],t[1]=n[2],t[2]=n[1],t[3]=n[3];return t},e.invert=function(t,n){var r=n[0],a=n[1],e=n[2],u=n[3],o=r*u-e*a;return o?(o=1/o,t[0]=u*o,t[1]=-a*o,t[2]=-e*o,t[3]=r*o,t):null},e.adjoint=function(t,n){var r=n[0];return t[0]=n[3],t[1]=-n[1],t[2]=-n[2],t[3]=r,t},e.determinant=function(t){return t[0]*t[3]-t[2]*t[1]},e.multiply=function(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=r[0],c=r[1],f=r[2],s=r[3];return t[0]=a*i+u*c,t[1]=e*i+o*c,t[2]=a*f+u*s,t[3]=e*f+o*s,t},e.mul=e.multiply,e.rotate=function(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=Math.sin(r),c=Math.cos(r);return t[0]=a*c+u*i,t[1]=e*c+o*i,t[2]=a*-i+u*c,t[3]=e*-i+o*c,t},e.scale=function(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=r[0],c=r[1];return t[0]=a*i,t[1]=e*i,t[2]=u*c,t[3]=o*c,t},e.fromRotation=function(t,n){var r=Math.sin(n),a=Math.cos(n);return t[0]=a,t[1]=r,t[2]=-r,t[3]=a,t},e.fromScaling=function(t,n){return t[0]=n[0],t[1]=0,t[2]=0,t[3]=n[1],t},e.str=function(t){return"mat2("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+")"},e.frob=function(t){return Math.sqrt(Math.pow(t[0],2)+Math.pow(t[1],2)+Math.pow(t[2],2)+Math.pow(t[3],2))},e.LDU=function(t,n,r,a){return t[2]=a[2]/a[0],r[0]=a[0],r[1]=a[1],r[3]=a[3]-t[2]*r[1],[t,n,r]},t.exports=e},function(t,n,r){var a=r(1),e={};e.create=function(){var t=new a.ARRAY_TYPE(6);return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t[4]=0,t[5]=0,t},e.clone=function(t){var n=new a.ARRAY_TYPE(6);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n[4]=t[4],n[5]=t[5],n},e.copy=function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t},e.identity=function(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t[4]=0,t[5]=0,t},e.invert=function(t,n){var r=n[0],a=n[1],e=n[2],u=n[3],o=n[4],i=n[5],c=r*u-a*e;return c?(c=1/c,t[0]=u*c,t[1]=-a*c,t[2]=-e*c,t[3]=r*c,t[4]=(e*i-u*o)*c,t[5]=(a*o-r*i)*c,t):null},e.determinant=function(t){return t[0]*t[3]-t[1]*t[2]},e.multiply=function(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=n[4],c=n[5],f=r[0],s=r[1],h=r[2],M=r[3],l=r[4],v=r[5];return t[0]=a*f+u*s,t[1]=e*f+o*s,t[2]=a*h+u*M,t[3]=e*h+o*M,t[4]=a*l+u*v+i,t[5]=e*l+o*v+c,t},e.mul=e.multiply,e.rotate=function(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=n[4],c=n[5],f=Math.sin(r),s=Math.cos(r);return t[0]=a*s+u*f,t[1]=e*s+o*f,t[2]=a*-f+u*s,t[3]=e*-f+o*s,t[4]=i,t[5]=c,t},e.scale=function(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=n[4],c=n[5],f=r[0],s=r[1];return t[0]=a*f,t[1]=e*f,t[2]=u*s,t[3]=o*s,t[4]=i,t[5]=c,t},e.translate=function(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=n[4],c=n[5],f=r[0],s=r[1];return t[0]=a,t[1]=e,t[2]=u,t[3]=o,t[4]=a*f+u*s+i,t[5]=e*f+o*s+c,t},e.fromRotation=function(t,n){var r=Math.sin(n),a=Math.cos(n);return t[0]=a,t[1]=r,t[2]=-r,t[3]=a,t[4]=0,t[5]=0,t},e.fromScaling=function(t,n){return t[0]=n[0],t[1]=0,t[2]=0,t[3]=n[1],t[4]=0,t[5]=0,t},e.fromTranslation=function(t,n){return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t[4]=n[0],t[5]=n[1],t},e.str=function(t){return"mat2d("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+", "+t[4]+", "+t[5]+")"},e.frob=function(t){return Math.sqrt(Math.pow(t[0],2)+Math.pow(t[1],2)+Math.pow(t[2],2)+Math.pow(t[3],2)+Math.pow(t[4],2)+Math.pow(t[5],2)+1)},t.exports=e},function(t,n,r){var a=r(1),e={};e.create=function(){var t=new a.ARRAY_TYPE(9);return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=0,t[7]=0,t[8]=1,t},e.fromMat4=function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[4],t[4]=n[5],t[5]=n[6],t[6]=n[8],t[7]=n[9],t[8]=n[10],t},e.clone=function(t){var n=new a.ARRAY_TYPE(9);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n[4]=t[4],n[5]=t[5],n[6]=t[6],n[7]=t[7],n[8]=t[8],n},e.copy=function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t},e.identity=function(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=0,t[7]=0,t[8]=1,t},e.transpose=function(t,n){if(t===n){var r=n[1],a=n[2],e=n[5];t[1]=n[3],t[2]=n[6],t[3]=r,t[5]=n[7],t[6]=a,t[7]=e}else t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8];return t},e.invert=function(t,n){var r=n[0],a=n[1],e=n[2],u=n[3],o=n[4],i=n[5],c=n[6],f=n[7],s=n[8],h=s*o-i*f,M=-s*u+i*c,l=f*u-o*c,v=r*h+a*M+e*l;return v?(v=1/v,t[0]=h*v,t[1]=(-s*a+e*f)*v,t[2]=(i*a-e*o)*v,t[3]=M*v,t[4]=(s*r-e*c)*v,t[5]=(-i*r+e*u)*v,t[6]=l*v,t[7]=(-f*r+a*c)*v,t[8]=(o*r-a*u)*v,t):null},e.adjoint=function(t,n){var r=n[0],a=n[1],e=n[2],u=n[3],o=n[4],i=n[5],c=n[6],f=n[7],s=n[8];return t[0]=o*s-i*f,t[1]=e*f-a*s,t[2]=a*i-e*o,t[3]=i*c-u*s,t[4]=r*s-e*c,t[5]=e*u-r*i,t[6]=u*f-o*c,t[7]=a*c-r*f,t[8]=r*o-a*u,t},e.determinant=function(t){var n=t[0],r=t[1],a=t[2],e=t[3],u=t[4],o=t[5],i=t[6],c=t[7],f=t[8];return n*(f*u-o*c)+r*(-f*e+o*i)+a*(c*e-u*i)},e.multiply=function(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=n[4],c=n[5],f=n[6],s=n[7],h=n[8],M=r[0],l=r[1],v=r[2],m=r[3],p=r[4],d=r[5],A=r[6],R=r[7],w=r[8];return t[0]=M*a+l*o+v*f,t[1]=M*e+l*i+v*s,t[2]=M*u+l*c+v*h,t[3]=m*a+p*o+d*f,t[4]=m*e+p*i+d*s,t[5]=m*u+p*c+d*h,t[6]=A*a+R*o+w*f,t[7]=A*e+R*i+w*s,t[8]=A*u+R*c+w*h,t},e.mul=e.multiply,e.translate=function(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=n[4],c=n[5],f=n[6],s=n[7],h=n[8],M=r[0],l=r[1];return t[0]=a,t[1]=e,t[2]=u,t[3]=o,t[4]=i,t[5]=c,t[6]=M*a+l*o+f,t[7]=M*e+l*i+s,t[8]=M*u+l*c+h,t},e.rotate=function(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=n[4],c=n[5],f=n[6],s=n[7],h=n[8],M=Math.sin(r),l=Math.cos(r);return t[0]=l*a+M*o,t[1]=l*e+M*i,t[2]=l*u+M*c,t[3]=l*o-M*a,t[4]=l*i-M*e,t[5]=l*c-M*u,t[6]=f,t[7]=s,t[8]=h,t},e.scale=function(t,n,r){var a=r[0],e=r[1];return t[0]=a*n[0],t[1]=a*n[1],t[2]=a*n[2],t[3]=e*n[3],t[4]=e*n[4],t[5]=e*n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t},e.fromTranslation=function(t,n){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=n[0],t[7]=n[1],t[8]=1,t},e.fromRotation=function(t,n){var r=Math.sin(n),a=Math.cos(n);return t[0]=a,t[1]=r,t[2]=0,t[3]=-r,t[4]=a,t[5]=0,t[6]=0,t[7]=0,t[8]=1,t},e.fromScaling=function(t,n){return t[0]=n[0],t[1]=0,t[2]=0,t[3]=0,t[4]=n[1],t[5]=0,t[6]=0,t[7]=0,t[8]=1,t},e.fromMat2d=function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=0,t[3]=n[2],t[4]=n[3],t[5]=0,t[6]=n[4],t[7]=n[5],t[8]=1,t},e.fromQuat=function(t,n){var r=n[0],a=n[1],e=n[2],u=n[3],o=r+r,i=a+a,c=e+e,f=r*o,s=a*o,h=a*i,M=e*o,l=e*i,v=e*c,m=u*o,p=u*i,d=u*c;return t[0]=1-h-v,t[3]=s-d,t[6]=M+p,t[1]=s+d,t[4]=1-f-v,t[7]=l-m,t[2]=M-p,t[5]=l+m,t[8]=1-f-h,t},e.normalFromMat4=function(t,n){var r=n[0],a=n[1],e=n[2],u=n[3],o=n[4],i=n[5],c=n[6],f=n[7],s=n[8],h=n[9],M=n[10],l=n[11],v=n[12],m=n[13],p=n[14],d=n[15],A=r*i-a*o,R=r*c-e*o,w=r*f-u*o,q=a*c-e*i,Y=a*f-u*i,g=e*f-u*c,y=s*m-h*v,x=s*p-M*v,P=s*d-l*v,E=h*p-M*m,T=h*d-l*m,b=M*d-l*p,D=A*b-R*T+w*E+q*P-Y*x+g*y;return D?(D=1/D,t[0]=(i*b-c*T+f*E)*D,t[1]=(c*P-o*b-f*x)*D,t[2]=(o*T-i*P+f*y)*D,t[3]=(e*T-a*b-u*E)*D,t[4]=(r*b-e*P+u*x)*D,t[5]=(a*P-r*T-u*y)*D,t[6]=(m*g-p*Y+d*q)*D,t[7]=(p*w-v*g-d*R)*D,t[8]=(v*Y-m*w+d*A)*D,t):null},e.str=function(t){return"mat3("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+", "+t[4]+", "+t[5]+", "+t[6]+", "+t[7]+", "+t[8]+")"},e.frob=function(t){return Math.sqrt(Math.pow(t[0],2)+Math.pow(t[1],2)+Math.pow(t[2],2)+Math.pow(t[3],2)+Math.pow(t[4],2)+Math.pow(t[5],2)+Math.pow(t[6],2)+Math.pow(t[7],2)+Math.pow(t[8],2))},t.exports=e},function(t,n,r){var a=r(1),e={};e.create=function(){var t=new a.ARRAY_TYPE(16);return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t},e.clone=function(t){var n=new a.ARRAY_TYPE(16);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n[4]=t[4],n[5]=t[5],n[6]=t[6],n[7]=t[7],n[8]=t[8],n[9]=t[9],n[10]=t[10],n[11]=t[11],n[12]=t[12],n[13]=t[13],n[14]=t[14],n[15]=t[15],n},e.copy=function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],t},e.identity=function(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t},e.transpose=function(t,n){if(t===n){var r=n[1],a=n[2],e=n[3],u=n[6],o=n[7],i=n[11];t[1]=n[4],t[2]=n[8],t[3]=n[12],t[4]=r,t[6]=n[9],t[7]=n[13],t[8]=a,t[9]=u,t[11]=n[14],t[12]=e,t[13]=o,t[14]=i}else t[0]=n[0],t[1]=n[4],t[2]=n[8],t[3]=n[12],t[4]=n[1],t[5]=n[5],t[6]=n[9],t[7]=n[13],t[8]=n[2],t[9]=n[6],t[10]=n[10],t[11]=n[14],t[12]=n[3],t[13]=n[7],t[14]=n[11],t[15]=n[15];return t},e.invert=function(t,n){var r=n[0],a=n[1],e=n[2],u=n[3],o=n[4],i=n[5],c=n[6],f=n[7],s=n[8],h=n[9],M=n[10],l=n[11],v=n[12],m=n[13],p=n[14],d=n[15],A=r*i-a*o,R=r*c-e*o,w=r*f-u*o,q=a*c-e*i,Y=a*f-u*i,g=e*f-u*c,y=s*m-h*v,x=s*p-M*v,P=s*d-l*v,E=h*p-M*m,T=h*d-l*m,b=M*d-l*p,D=A*b-R*T+w*E+q*P-Y*x+g*y;return D?(D=1/D,t[0]=(i*b-c*T+f*E)*D,t[1]=(e*T-a*b-u*E)*D,t[2]=(m*g-p*Y+d*q)*D,t[3]=(M*Y-h*g-l*q)*D,t[4]=(c*P-o*b-f*x)*D,t[5]=(r*b-e*P+u*x)*D,t[6]=(p*w-v*g-d*R)*D,t[7]=(s*g-M*w+l*R)*D,t[8]=(o*T-i*P+f*y)*D,t[9]=(a*P-r*T-u*y)*D,t[10]=(v*Y-m*w+d*A)*D,t[11]=(h*w-s*Y-l*A)*D,t[12]=(i*x-o*E-c*y)*D,t[13]=(r*E-a*x+e*y)*D,t[14]=(m*R-v*q-p*A)*D,t[15]=(s*q-h*R+M*A)*D,t):null},e.adjoint=function(t,n){var r=n[0],a=n[1],e=n[2],u=n[3],o=n[4],i=n[5],c=n[6],f=n[7],s=n[8],h=n[9],M=n[10],l=n[11],v=n[12],m=n[13],p=n[14],d=n[15];return t[0]=i*(M*d-l*p)-h*(c*d-f*p)+m*(c*l-f*M),t[1]=-(a*(M*d-l*p)-h*(e*d-u*p)+m*(e*l-u*M)),t[2]=a*(c*d-f*p)-i*(e*d-u*p)+m*(e*f-u*c),t[3]=-(a*(c*l-f*M)-i*(e*l-u*M)+h*(e*f-u*c)),t[4]=-(o*(M*d-l*p)-s*(c*d-f*p)+v*(c*l-f*M)),t[5]=r*(M*d-l*p)-s*(e*d-u*p)+v*(e*l-u*M),t[6]=-(r*(c*d-f*p)-o*(e*d-u*p)+v*(e*f-u*c)),t[7]=r*(c*l-f*M)-o*(e*l-u*M)+s*(e*f-u*c),t[8]=o*(h*d-l*m)-s*(i*d-f*m)+v*(i*l-f*h),t[9]=-(r*(h*d-l*m)-s*(a*d-u*m)+v*(a*l-u*h)),t[10]=r*(i*d-f*m)-o*(a*d-u*m)+v*(a*f-u*i),t[11]=-(r*(i*l-f*h)-o*(a*l-u*h)+s*(a*f-u*i)),t[12]=-(o*(h*p-M*m)-s*(i*p-c*m)+v*(i*M-c*h)),t[13]=r*(h*p-M*m)-s*(a*p-e*m)+v*(a*M-e*h),t[14]=-(r*(i*p-c*m)-o*(a*p-e*m)+v*(a*c-e*i)),t[15]=r*(i*M-c*h)-o*(a*M-e*h)+s*(a*c-e*i),t},e.determinant=function(t){var n=t[0],r=t[1],a=t[2],e=t[3],u=t[4],o=t[5],i=t[6],c=t[7],f=t[8],s=t[9],h=t[10],M=t[11],l=t[12],v=t[13],m=t[14],p=t[15],d=n*o-r*u,A=n*i-a*u,R=n*c-e*u,w=r*i-a*o,q=r*c-e*o,Y=a*c-e*i,g=f*v-s*l,y=f*m-h*l,x=f*p-M*l,P=s*m-h*v,E=s*p-M*v,T=h*p-M*m;return d*T-A*E+R*P+w*x-q*y+Y*g},e.multiply=function(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=n[4],c=n[5],f=n[6],s=n[7],h=n[8],M=n[9],l=n[10],v=n[11],m=n[12],p=n[13],d=n[14],A=n[15],R=r[0],w=r[1],q=r[2],Y=r[3];return t[0]=R*a+w*i+q*h+Y*m,t[1]=R*e+w*c+q*M+Y*p,t[2]=R*u+w*f+q*l+Y*d,t[3]=R*o+w*s+q*v+Y*A,R=r[4],w=r[5],q=r[6],Y=r[7],t[4]=R*a+w*i+q*h+Y*m,t[5]=R*e+w*c+q*M+Y*p,t[6]=R*u+w*f+q*l+Y*d,t[7]=R*o+w*s+q*v+Y*A,R=r[8],w=r[9],q=r[10],Y=r[11],t[8]=R*a+w*i+q*h+Y*m,t[9]=R*e+w*c+q*M+Y*p,t[10]=R*u+w*f+q*l+Y*d,t[11]=R*o+w*s+q*v+Y*A,R=r[12],w=r[13],q=r[14],Y=r[15],t[12]=R*a+w*i+q*h+Y*m,t[13]=R*e+w*c+q*M+Y*p,t[14]=R*u+w*f+q*l+Y*d,t[15]=R*o+w*s+q*v+Y*A,t},e.mul=e.multiply,e.translate=function(t,n,r){var a,e,u,o,i,c,f,s,h,M,l,v,m=r[0],p=r[1],d=r[2];return n===t?(t[12]=n[0]*m+n[4]*p+n[8]*d+n[12],t[13]=n[1]*m+n[5]*p+n[9]*d+n[13],t[14]=n[2]*m+n[6]*p+n[10]*d+n[14],t[15]=n[3]*m+n[7]*p+n[11]*d+n[15]):(a=n[0],e=n[1],u=n[2],o=n[3],i=n[4],c=n[5],f=n[6],s=n[7],h=n[8],M=n[9],l=n[10],v=n[11],t[0]=a,t[1]=e,t[2]=u,t[3]=o,t[4]=i,t[5]=c,t[6]=f,t[7]=s,t[8]=h,t[9]=M,t[10]=l,t[11]=v,t[12]=a*m+i*p+h*d+n[12],t[13]=e*m+c*p+M*d+n[13],t[14]=u*m+f*p+l*d+n[14],t[15]=o*m+s*p+v*d+n[15]),t},e.scale=function(t,n,r){var a=r[0],e=r[1],u=r[2];return t[0]=n[0]*a,t[1]=n[1]*a,t[2]=n[2]*a,t[3]=n[3]*a,t[4]=n[4]*e,t[5]=n[5]*e,t[6]=n[6]*e,t[7]=n[7]*e,t[8]=n[8]*u,t[9]=n[9]*u,t[10]=n[10]*u,t[11]=n[11]*u,t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],t},e.rotate=function(t,n,r,e){var u,o,i,c,f,s,h,M,l,v,m,p,d,A,R,w,q,Y,g,y,x,P,E,T,b=e[0],D=e[1],L=e[2],_=Math.sqrt(b*b+D*D+L*L);return Math.abs(_)<a.EPSILON?null:(_=1/_,b*=_,D*=_,L*=_,u=Math.sin(r),o=Math.cos(r),i=1-o,c=n[0],f=n[1],s=n[2],h=n[3],M=n[4],l=n[5],v=n[6],m=n[7],p=n[8],d=n[9],A=n[10],R=n[11],w=b*b*i+o,q=D*b*i+L*u,Y=L*b*i-D*u,g=b*D*i-L*u,y=D*D*i+o,x=L*D*i+b*u,P=b*L*i+D*u,E=D*L*i-b*u,T=L*L*i+o,t[0]=c*w+M*q+p*Y,t[1]=f*w+l*q+d*Y,t[2]=s*w+v*q+A*Y,t[3]=h*w+m*q+R*Y,t[4]=c*g+M*y+p*x,t[5]=f*g+l*y+d*x,t[6]=s*g+v*y+A*x,t[7]=h*g+m*y+R*x,t[8]=c*P+M*E+p*T,t[9]=f*P+l*E+d*T,t[10]=s*P+v*E+A*T,t[11]=h*P+m*E+R*T,n!==t&&(t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15]),t)},e.rotateX=function(t,n,r){var a=Math.sin(r),e=Math.cos(r),u=n[4],o=n[5],i=n[6],c=n[7],f=n[8],s=n[9],h=n[10],M=n[11];return n!==t&&(t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15]),t[4]=u*e+f*a,t[5]=o*e+s*a,t[6]=i*e+h*a,t[7]=c*e+M*a,t[8]=f*e-u*a,t[9]=s*e-o*a,t[10]=h*e-i*a,t[11]=M*e-c*a,t},e.rotateY=function(t,n,r){var a=Math.sin(r),e=Math.cos(r),u=n[0],o=n[1],i=n[2],c=n[3],f=n[8],s=n[9],h=n[10],M=n[11];return n!==t&&(t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15]),t[0]=u*e-f*a,t[1]=o*e-s*a,t[2]=i*e-h*a,t[3]=c*e-M*a,t[8]=u*a+f*e,t[9]=o*a+s*e,t[10]=i*a+h*e,t[11]=c*a+M*e,t},e.rotateZ=function(t,n,r){var a=Math.sin(r),e=Math.cos(r),u=n[0],o=n[1],i=n[2],c=n[3],f=n[4],s=n[5],h=n[6],M=n[7];return n!==t&&(t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15]),t[0]=u*e+f*a,t[1]=o*e+s*a,t[2]=i*e+h*a,t[3]=c*e+M*a,t[4]=f*e-u*a,t[5]=s*e-o*a,t[6]=h*e-i*a,t[7]=M*e-c*a,t},e.fromTranslation=function(t,n){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=n[0],t[13]=n[1],t[14]=n[2],t[15]=1,t},e.fromScaling=function(t,n){return t[0]=n[0],t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=n[1],t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=n[2],t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t},e.fromRotation=function(t,n,r){var e,u,o,i=r[0],c=r[1],f=r[2],s=Math.sqrt(i*i+c*c+f*f);return Math.abs(s)<a.EPSILON?null:(s=1/s,i*=s,c*=s,f*=s,e=Math.sin(n),u=Math.cos(n),o=1-u,t[0]=i*i*o+u,t[1]=c*i*o+f*e,t[2]=f*i*o-c*e,t[3]=0,t[4]=i*c*o-f*e,t[5]=c*c*o+u,t[6]=f*c*o+i*e,t[7]=0,t[8]=i*f*o+c*e,t[9]=c*f*o-i*e,t[10]=f*f*o+u,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t)},e.fromXRotation=function(t,n){var r=Math.sin(n),a=Math.cos(n);return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=a,t[6]=r,t[7]=0,t[8]=0,t[9]=-r,t[10]=a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t},e.fromYRotation=function(t,n){var r=Math.sin(n),a=Math.cos(n);return t[0]=a,t[1]=0,t[2]=-r,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=r,t[9]=0,t[10]=a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t},e.fromZRotation=function(t,n){var r=Math.sin(n),a=Math.cos(n);return t[0]=a,t[1]=r,t[2]=0,t[3]=0,t[4]=-r,t[5]=a,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t},e.fromRotationTranslation=function(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=a+a,c=e+e,f=u+u,s=a*i,h=a*c,M=a*f,l=e*c,v=e*f,m=u*f,p=o*i,d=o*c,A=o*f;return t[0]=1-(l+m),t[1]=h+A,t[2]=M-d,t[3]=0,t[4]=h-A,t[5]=1-(s+m),t[6]=v+p,t[7]=0,t[8]=M+d,t[9]=v-p,t[10]=1-(s+l),t[11]=0,t[12]=r[0],t[13]=r[1],t[14]=r[2],t[15]=1,t},e.fromRotationTranslationScale=function(t,n,r,a){var e=n[0],u=n[1],o=n[2],i=n[3],c=e+e,f=u+u,s=o+o,h=e*c,M=e*f,l=e*s,v=u*f,m=u*s,p=o*s,d=i*c,A=i*f,R=i*s,w=a[0],q=a[1],Y=a[2];return t[0]=(1-(v+p))*w,t[1]=(M+R)*w,t[2]=(l-A)*w,t[3]=0,t[4]=(M-R)*q,t[5]=(1-(h+p))*q,t[6]=(m+d)*q,t[7]=0,t[8]=(l+A)*Y,t[9]=(m-d)*Y,t[10]=(1-(h+v))*Y,t[11]=0,t[12]=r[0],t[13]=r[1],t[14]=r[2],t[15]=1,t},e.fromRotationTranslationScaleOrigin=function(t,n,r,a,e){var u=n[0],o=n[1],i=n[2],c=n[3],f=u+u,s=o+o,h=i+i,M=u*f,l=u*s,v=u*h,m=o*s,p=o*h,d=i*h,A=c*f,R=c*s,w=c*h,q=a[0],Y=a[1],g=a[2],y=e[0],x=e[1],P=e[2];return t[0]=(1-(m+d))*q,t[1]=(l+w)*q,t[2]=(v-R)*q,t[3]=0,t[4]=(l-w)*Y,t[5]=(1-(M+d))*Y,t[6]=(p+A)*Y,t[7]=0,t[8]=(v+R)*g,t[9]=(p-A)*g,t[10]=(1-(M+m))*g,t[11]=0,t[12]=r[0]+y-(t[0]*y+t[4]*x+t[8]*P),t[13]=r[1]+x-(t[1]*y+t[5]*x+t[9]*P),t[14]=r[2]+P-(t[2]*y+t[6]*x+t[10]*P),t[15]=1,t},e.fromQuat=function(t,n){var r=n[0],a=n[1],e=n[2],u=n[3],o=r+r,i=a+a,c=e+e,f=r*o,s=a*o,h=a*i,M=e*o,l=e*i,v=e*c,m=u*o,p=u*i,d=u*c;return t[0]=1-h-v,t[1]=s+d,t[2]=M-p,t[3]=0,t[4]=s-d,t[5]=1-f-v,t[6]=l+m,t[7]=0,t[8]=M+p,t[9]=l-m,t[10]=1-f-h,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t},e.frustum=function(t,n,r,a,e,u,o){var i=1/(r-n),c=1/(e-a),f=1/(u-o);return t[0]=2*u*i,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=2*u*c,t[6]=0,t[7]=0,t[8]=(r+n)*i,t[9]=(e+a)*c,t[10]=(o+u)*f,t[11]=-1,t[12]=0,t[13]=0,t[14]=o*u*2*f,t[15]=0,t},e.perspective=function(t,n,r,a,e){var u=1/Math.tan(n/2),o=1/(a-e);return t[0]=u/r,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=u,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=(e+a)*o,t[11]=-1,t[12]=0,t[13]=0,t[14]=2*e*a*o,t[15]=0,t},e.perspectiveFromFieldOfView=function(t,n,r,a){var e=Math.tan(n.upDegrees*Math.PI/180),u=Math.tan(n.downDegrees*Math.PI/180),o=Math.tan(n.leftDegrees*Math.PI/180),i=Math.tan(n.rightDegrees*Math.PI/180),c=2/(o+i),f=2/(e+u);return t[0]=c,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=f,t[6]=0,t[7]=0,t[8]=-((o-i)*c*.5),t[9]=(e-u)*f*.5,t[10]=a/(r-a),t[11]=-1,t[12]=0,t[13]=0,t[14]=a*r/(r-a),t[15]=0,t},e.ortho=function(t,n,r,a,e,u,o){var i=1/(n-r),c=1/(a-e),f=1/(u-o);return t[0]=-2*i,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=-2*c,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=2*f,t[11]=0,t[12]=(n+r)*i,t[13]=(e+a)*c,t[14]=(o+u)*f,t[15]=1,t},e.lookAt=function(t,n,r,u){var o,i,c,f,s,h,M,l,v,m,p=n[0],d=n[1],A=n[2],R=u[0],w=u[1],q=u[2],Y=r[0],g=r[1],y=r[2];return Math.abs(p-Y)<a.EPSILON&&Math.abs(d-g)<a.EPSILON&&Math.abs(A-y)<a.EPSILON?e.identity(t):(M=p-Y,l=d-g,v=A-y,m=1/Math.sqrt(M*M+l*l+v*v),M*=m,l*=m,v*=m,o=w*v-q*l,i=q*M-R*v,c=R*l-w*M,m=Math.sqrt(o*o+i*i+c*c),m?(m=1/m,o*=m,i*=m,c*=m):(o=0,i=0,c=0),f=l*c-v*i,s=v*o-M*c,h=M*i-l*o,m=Math.sqrt(f*f+s*s+h*h),m?(m=1/m,f*=m,s*=m,h*=m):(f=0,s=0,h=0),t[0]=o,t[1]=f,t[2]=M,t[3]=0,t[4]=i,t[5]=s,t[6]=l,t[7]=0,t[8]=c,t[9]=h,t[10]=v,t[11]=0,t[12]=-(o*p+i*d+c*A),t[13]=-(f*p+s*d+h*A),t[14]=-(M*p+l*d+v*A),t[15]=1,t)},e.str=function(t){return"mat4("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+", "+t[4]+", "+t[5]+", "+t[6]+", "+t[7]+", "+t[8]+", "+t[9]+", "+t[10]+", "+t[11]+", "+t[12]+", "+t[13]+", "+t[14]+", "+t[15]+")"},e.frob=function(t){return Math.sqrt(Math.pow(t[0],2)+Math.pow(t[1],2)+Math.pow(t[2],2)+Math.pow(t[3],2)+Math.pow(t[4],2)+Math.pow(t[5],2)+Math.pow(t[6],2)+Math.pow(t[7],2)+Math.pow(t[8],2)+Math.pow(t[9],2)+Math.pow(t[10],2)+Math.pow(t[11],2)+Math.pow(t[12],2)+Math.pow(t[13],2)+Math.pow(t[14],2)+Math.pow(t[15],2))},t.exports=e},function(t,n,r){var a=r(1),e=r(4),u=r(7),o=r(8),i={};i.create=function(){var t=new a.ARRAY_TYPE(4);return t[0]=0,t[1]=0,t[2]=0,t[3]=1,t},i.rotationTo=function(){var t=u.create(),n=u.fromValues(1,0,0),r=u.fromValues(0,1,0);return function(a,e,o){var c=u.dot(e,o);return-.999999>c?(u.cross(t,n,e),u.length(t)<1e-6&&u.cross(t,r,e),u.normalize(t,t),i.setAxisAngle(a,t,Math.PI),a):c>.999999?(a[0]=0,a[1]=0,a[2]=0,a[3]=1,a):(u.cross(t,e,o),a[0]=t[0],a[1]=t[1],a[2]=t[2],a[3]=1+c,i.normalize(a,a))}}(),i.setAxes=function(){var t=e.create();return function(n,r,a,e){return t[0]=a[0],t[3]=a[1],t[6]=a[2],t[1]=e[0],t[4]=e[1],t[7]=e[2],t[2]=-r[0],t[5]=-r[1],t[8]=-r[2],i.normalize(n,i.fromMat3(n,t))}}(),i.clone=o.clone,i.fromValues=o.fromValues,i.copy=o.copy,i.set=o.set,i.identity=function(t){return t[0]=0,t[1]=0,t[2]=0,t[3]=1,t},i.setAxisAngle=function(t,n,r){r=.5*r;var a=Math.sin(r);return t[0]=a*n[0],t[1]=a*n[1],t[2]=a*n[2],t[3]=Math.cos(r),t},i.add=o.add,i.multiply=function(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=r[0],c=r[1],f=r[2],s=r[3];return t[0]=a*s+o*i+e*f-u*c,t[1]=e*s+o*c+u*i-a*f,t[2]=u*s+o*f+a*c-e*i,t[3]=o*s-a*i-e*c-u*f,t},i.mul=i.multiply,i.scale=o.scale,i.rotateX=function(t,n,r){r*=.5;var a=n[0],e=n[1],u=n[2],o=n[3],i=Math.sin(r),c=Math.cos(r);return t[0]=a*c+o*i,t[1]=e*c+u*i,t[2]=u*c-e*i,t[3]=o*c-a*i,t},i.rotateY=function(t,n,r){r*=.5;var a=n[0],e=n[1],u=n[2],o=n[3],i=Math.sin(r),c=Math.cos(r);return t[0]=a*c-u*i,t[1]=e*c+o*i,t[2]=u*c+a*i,t[3]=o*c-e*i,t},i.rotateZ=function(t,n,r){r*=.5;var a=n[0],e=n[1],u=n[2],o=n[3],i=Math.sin(r),c=Math.cos(r);return t[0]=a*c+e*i,t[1]=e*c-a*i,t[2]=u*c+o*i,t[3]=o*c-u*i,t},i.calculateW=function(t,n){var r=n[0],a=n[1],e=n[2];return t[0]=r,t[1]=a,t[2]=e,t[3]=Math.sqrt(Math.abs(1-r*r-a*a-e*e)),t},i.dot=o.dot,i.lerp=o.lerp,i.slerp=function(t,n,r,a){var e,u,o,i,c,f=n[0],s=n[1],h=n[2],M=n[3],l=r[0],v=r[1],m=r[2],p=r[3];return u=f*l+s*v+h*m+M*p,0>u&&(u=-u,l=-l,v=-v,m=-m,p=-p),1-u>1e-6?(e=Math.acos(u),o=Math.sin(e),i=Math.sin((1-a)*e)/o,c=Math.sin(a*e)/o):(i=1-a,c=a),t[0]=i*f+c*l,t[1]=i*s+c*v,t[2]=i*h+c*m,t[3]=i*M+c*p,t},i.sqlerp=function(){var t=i.create(),n=i.create();return function(r,a,e,u,o,c){return i.slerp(t,a,o,c),i.slerp(n,e,u,c),i.slerp(r,t,n,2*c*(1-c)),r}}(),i.invert=function(t,n){var r=n[0],a=n[1],e=n[2],u=n[3],o=r*r+a*a+e*e+u*u,i=o?1/o:0;return t[0]=-r*i,t[1]=-a*i,t[2]=-e*i,t[3]=u*i,t},i.conjugate=function(t,n){return t[0]=-n[0],t[1]=-n[1],t[2]=-n[2],t[3]=n[3],t},i.length=o.length,i.len=i.length,i.squaredLength=o.squaredLength,i.sqrLen=i.squaredLength,i.normalize=o.normalize,i.fromMat3=function(t,n){var r,a=n[0]+n[4]+n[8];if(a>0)r=Math.sqrt(a+1),t[3]=.5*r,r=.5/r,t[0]=(n[5]-n[7])*r,t[1]=(n[6]-n[2])*r,t[2]=(n[1]-n[3])*r;else{var e=0;n[4]>n[0]&&(e=1),n[8]>n[3*e+e]&&(e=2);var u=(e+1)%3,o=(e+2)%3;r=Math.sqrt(n[3*e+e]-n[3*u+u]-n[3*o+o]+1),t[e]=.5*r,r=.5/r,t[3]=(n[3*u+o]-n[3*o+u])*r,t[u]=(n[3*u+e]+n[3*e+u])*r,t[o]=(n[3*o+e]+n[3*e+o])*r}return t},i.str=function(t){return"quat("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+")"},t.exports=i},function(t,n,r){var a=r(1),e={};e.create=function(){var t=new a.ARRAY_TYPE(3);return t[0]=0,t[1]=0,t[2]=0,t},e.clone=function(t){var n=new a.ARRAY_TYPE(3);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n},e.fromValues=function(t,n,r){var e=new a.ARRAY_TYPE(3);return e[0]=t,e[1]=n,e[2]=r,e},e.copy=function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t},e.set=function(t,n,r,a){return t[0]=n,t[1]=r,t[2]=a,t},e.add=function(t,n,r){return t[0]=n[0]+r[0],t[1]=n[1]+r[1],t[2]=n[2]+r[2],t},e.subtract=function(t,n,r){return t[0]=n[0]-r[0],t[1]=n[1]-r[1],t[2]=n[2]-r[2],t},e.sub=e.subtract,e.multiply=function(t,n,r){return t[0]=n[0]*r[0],t[1]=n[1]*r[1],t[2]=n[2]*r[2],t},e.mul=e.multiply,e.divide=function(t,n,r){return t[0]=n[0]/r[0],t[1]=n[1]/r[1],t[2]=n[2]/r[2],t},e.div=e.divide,e.min=function(t,n,r){return t[0]=Math.min(n[0],r[0]),t[1]=Math.min(n[1],r[1]),t[2]=Math.min(n[2],r[2]),t},e.max=function(t,n,r){return t[0]=Math.max(n[0],r[0]),t[1]=Math.max(n[1],r[1]),t[2]=Math.max(n[2],r[2]),t},e.scale=function(t,n,r){return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t},e.scaleAndAdd=function(t,n,r,a){return t[0]=n[0]+r[0]*a,t[1]=n[1]+r[1]*a,t[2]=n[2]+r[2]*a,t},e.distance=function(t,n){var r=n[0]-t[0],a=n[1]-t[1],e=n[2]-t[2];return Math.sqrt(r*r+a*a+e*e)},e.dist=e.distance,e.squaredDistance=function(t,n){var r=n[0]-t[0],a=n[1]-t[1],e=n[2]-t[2];return r*r+a*a+e*e},e.sqrDist=e.squaredDistance,e.length=function(t){var n=t[0],r=t[1],a=t[2];return Math.sqrt(n*n+r*r+a*a)},e.len=e.length,e.squaredLength=function(t){var n=t[0],r=t[1],a=t[2];return n*n+r*r+a*a},e.sqrLen=e.squaredLength,e.negate=function(t,n){return t[0]=-n[0],t[1]=-n[1],t[2]=-n[2],t},e.inverse=function(t,n){return t[0]=1/n[0],t[1]=1/n[1],t[2]=1/n[2],t},e.normalize=function(t,n){var r=n[0],a=n[1],e=n[2],u=r*r+a*a+e*e;return u>0&&(u=1/Math.sqrt(u),t[0]=n[0]*u,t[1]=n[1]*u,t[2]=n[2]*u),t},e.dot=function(t,n){return t[0]*n[0]+t[1]*n[1]+t[2]*n[2]},e.cross=function(t,n,r){var a=n[0],e=n[1],u=n[2],o=r[0],i=r[1],c=r[2];return t[0]=e*c-u*i,t[1]=u*o-a*c,t[2]=a*i-e*o,t},e.lerp=function(t,n,r,a){var e=n[0],u=n[1],o=n[2];return t[0]=e+a*(r[0]-e),t[1]=u+a*(r[1]-u),t[2]=o+a*(r[2]-o),t},e.hermite=function(t,n,r,a,e,u){var o=u*u,i=o*(2*u-3)+1,c=o*(u-2)+u,f=o*(u-1),s=o*(3-2*u);return t[0]=n[0]*i+r[0]*c+a[0]*f+e[0]*s,t[1]=n[1]*i+r[1]*c+a[1]*f+e[1]*s,t[2]=n[2]*i+r[2]*c+a[2]*f+e[2]*s,t},e.bezier=function(t,n,r,a,e,u){var o=1-u,i=o*o,c=u*u,f=i*o,s=3*u*i,h=3*c*o,M=c*u;return t[0]=n[0]*f+r[0]*s+a[0]*h+e[0]*M,t[1]=n[1]*f+r[1]*s+a[1]*h+e[1]*M,t[2]=n[2]*f+r[2]*s+a[2]*h+e[2]*M,t},e.random=function(t,n){n=n||1;var r=2*a.RANDOM()*Math.PI,e=2*a.RANDOM()-1,u=Math.sqrt(1-e*e)*n;return t[0]=Math.cos(r)*u,t[1]=Math.sin(r)*u,t[2]=e*n,t},e.transformMat4=function(t,n,r){var a=n[0],e=n[1],u=n[2],o=r[3]*a+r[7]*e+r[11]*u+r[15];return o=o||1,t[0]=(r[0]*a+r[4]*e+r[8]*u+r[12])/o,t[1]=(r[1]*a+r[5]*e+r[9]*u+r[13])/o,t[2]=(r[2]*a+r[6]*e+r[10]*u+r[14])/o,t},e.transformMat3=function(t,n,r){var a=n[0],e=n[1],u=n[2];return t[0]=a*r[0]+e*r[3]+u*r[6],t[1]=a*r[1]+e*r[4]+u*r[7],t[2]=a*r[2]+e*r[5]+u*r[8],t},e.transformQuat=function(t,n,r){var a=n[0],e=n[1],u=n[2],o=r[0],i=r[1],c=r[2],f=r[3],s=f*a+i*u-c*e,h=f*e+c*a-o*u,M=f*u+o*e-i*a,l=-o*a-i*e-c*u;return t[0]=s*f+l*-o+h*-c-M*-i,t[1]=h*f+l*-i+M*-o-s*-c,t[2]=M*f+l*-c+s*-i-h*-o,t},e.rotateX=function(t,n,r,a){var e=[],u=[];return e[0]=n[0]-r[0],e[1]=n[1]-r[1],e[2]=n[2]-r[2],u[0]=e[0],u[1]=e[1]*Math.cos(a)-e[2]*Math.sin(a),u[2]=e[1]*Math.sin(a)+e[2]*Math.cos(a),t[0]=u[0]+r[0],t[1]=u[1]+r[1],t[2]=u[2]+r[2],t},e.rotateY=function(t,n,r,a){var e=[],u=[];return e[0]=n[0]-r[0],e[1]=n[1]-r[1],e[2]=n[2]-r[2],u[0]=e[2]*Math.sin(a)+e[0]*Math.cos(a),u[1]=e[1],u[2]=e[2]*Math.cos(a)-e[0]*Math.sin(a),t[0]=u[0]+r[0],t[1]=u[1]+r[1],t[2]=u[2]+r[2],t},e.rotateZ=function(t,n,r,a){var e=[],u=[];return e[0]=n[0]-r[0],e[1]=n[1]-r[1],e[2]=n[2]-r[2],u[0]=e[0]*Math.cos(a)-e[1]*Math.sin(a),u[1]=e[0]*Math.sin(a)+e[1]*Math.cos(a),u[2]=e[2],t[0]=u[0]+r[0],t[1]=u[1]+r[1],t[2]=u[2]+r[2],t},e.forEach=function(){var t=e.create();return function(n,r,a,e,u,o){var i,c;for(r||(r=3),a||(a=0),c=e?Math.min(e*r+a,n.length):n.length,i=a;c>i;i+=r)t[0]=n[i],t[1]=n[i+1],t[2]=n[i+2],u(t,t,o),n[i]=t[0],n[i+1]=t[1],n[i+2]=t[2];return n}}(),e.angle=function(t,n){var r=e.fromValues(t[0],t[1],t[2]),a=e.fromValues(n[0],n[1],n[2]);e.normalize(r,r),e.normalize(a,a);var u=e.dot(r,a);return u>1?0:Math.acos(u)},e.str=function(t){return"vec3("+t[0]+", "+t[1]+", "+t[2]+")"},t.exports=e},function(t,n,r){var a=r(1),e={};e.create=function(){var t=new a.ARRAY_TYPE(4);return t[0]=0,t[1]=0,t[2]=0,t[3]=0,t},e.clone=function(t){var n=new a.ARRAY_TYPE(4);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n},e.fromValues=function(t,n,r,e){var u=new a.ARRAY_TYPE(4);return u[0]=t,u[1]=n,u[2]=r,u[3]=e,u},e.copy=function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t},e.set=function(t,n,r,a,e){return t[0]=n,t[1]=r,t[2]=a,t[3]=e,t},e.add=function(t,n,r){return t[0]=n[0]+r[0],t[1]=n[1]+r[1],t[2]=n[2]+r[2],t[3]=n[3]+r[3],t},e.subtract=function(t,n,r){return t[0]=n[0]-r[0],t[1]=n[1]-r[1],t[2]=n[2]-r[2],t[3]=n[3]-r[3],t},e.sub=e.subtract,e.multiply=function(t,n,r){return t[0]=n[0]*r[0],t[1]=n[1]*r[1],t[2]=n[2]*r[2],t[3]=n[3]*r[3],t},e.mul=e.multiply,e.divide=function(t,n,r){return t[0]=n[0]/r[0],t[1]=n[1]/r[1],t[2]=n[2]/r[2],t[3]=n[3]/r[3],t},e.div=e.divide,e.min=function(t,n,r){return t[0]=Math.min(n[0],r[0]),t[1]=Math.min(n[1],r[1]),t[2]=Math.min(n[2],r[2]),t[3]=Math.min(n[3],r[3]),t},e.max=function(t,n,r){return t[0]=Math.max(n[0],r[0]),t[1]=Math.max(n[1],r[1]),t[2]=Math.max(n[2],r[2]),t[3]=Math.max(n[3],r[3]),t},e.scale=function(t,n,r){return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=n[3]*r,t},e.scaleAndAdd=function(t,n,r,a){return t[0]=n[0]+r[0]*a,t[1]=n[1]+r[1]*a,t[2]=n[2]+r[2]*a,t[3]=n[3]+r[3]*a,t},e.distance=function(t,n){var r=n[0]-t[0],a=n[1]-t[1],e=n[2]-t[2],u=n[3]-t[3];return Math.sqrt(r*r+a*a+e*e+u*u)},e.dist=e.distance,e.squaredDistance=function(t,n){var r=n[0]-t[0],a=n[1]-t[1],e=n[2]-t[2],u=n[3]-t[3];return r*r+a*a+e*e+u*u},e.sqrDist=e.squaredDistance,e.length=function(t){var n=t[0],r=t[1],a=t[2],e=t[3];return Math.sqrt(n*n+r*r+a*a+e*e)},e.len=e.length,e.squaredLength=function(t){var n=t[0],r=t[1],a=t[2],e=t[3];return n*n+r*r+a*a+e*e},e.sqrLen=e.squaredLength,e.negate=function(t,n){return t[0]=-n[0],t[1]=-n[1],t[2]=-n[2],t[3]=-n[3],t},e.inverse=function(t,n){return t[0]=1/n[0],t[1]=1/n[1],t[2]=1/n[2],t[3]=1/n[3],t},e.normalize=function(t,n){var r=n[0],a=n[1],e=n[2],u=n[3],o=r*r+a*a+e*e+u*u;return o>0&&(o=1/Math.sqrt(o),t[0]=r*o,t[1]=a*o,t[2]=e*o,t[3]=u*o),t},e.dot=function(t,n){return t[0]*n[0]+t[1]*n[1]+t[2]*n[2]+t[3]*n[3]},e.lerp=function(t,n,r,a){var e=n[0],u=n[1],o=n[2],i=n[3];return t[0]=e+a*(r[0]-e),t[1]=u+a*(r[1]-u),t[2]=o+a*(r[2]-o),t[3]=i+a*(r[3]-i),t},e.random=function(t,n){return n=n||1,t[0]=a.RANDOM(),t[1]=a.RANDOM(),t[2]=a.RANDOM(),t[3]=a.RANDOM(),e.normalize(t,t),e.scale(t,t,n),t},e.transformMat4=function(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3];return t[0]=r[0]*a+r[4]*e+r[8]*u+r[12]*o,t[1]=r[1]*a+r[5]*e+r[9]*u+r[13]*o,t[2]=r[2]*a+r[6]*e+r[10]*u+r[14]*o,t[3]=r[3]*a+r[7]*e+r[11]*u+r[15]*o,t},e.transformQuat=function(t,n,r){var a=n[0],e=n[1],u=n[2],o=r[0],i=r[1],c=r[2],f=r[3],s=f*a+i*u-c*e,h=f*e+c*a-o*u,M=f*u+o*e-i*a,l=-o*a-i*e-c*u;return t[0]=s*f+l*-o+h*-c-M*-i,t[1]=h*f+l*-i+M*-o-s*-c,t[2]=M*f+l*-c+s*-i-h*-o,t[3]=n[3],t},e.forEach=function(){var t=e.create();return function(n,r,a,e,u,o){var i,c;for(r||(r=4),a||(a=0),c=e?Math.min(e*r+a,n.length):n.length,i=a;c>i;i+=r)t[0]=n[i],t[1]=n[i+1],t[2]=n[i+2],t[3]=n[i+3],u(t,t,o),n[i]=t[0],n[i+1]=t[1],n[i+2]=t[2],n[i+3]=t[3];return n}}(),e.str=function(t){return"vec4("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+")"},t.exports=e},function(t,n,r){var a=r(1),e={};e.create=function(){var t=new a.ARRAY_TYPE(2);return t[0]=0,t[1]=0,t},e.clone=function(t){var n=new a.ARRAY_TYPE(2);return n[0]=t[0],n[1]=t[1],n},e.fromValues=function(t,n){var r=new a.ARRAY_TYPE(2);return r[0]=t,r[1]=n,r},e.copy=function(t,n){return t[0]=n[0],t[1]=n[1],t},e.set=function(t,n,r){return t[0]=n,t[1]=r,t},e.add=function(t,n,r){return t[0]=n[0]+r[0],t[1]=n[1]+r[1],t},e.subtract=function(t,n,r){return t[0]=n[0]-r[0],t[1]=n[1]-r[1],t},e.sub=e.subtract,e.multiply=function(t,n,r){return t[0]=n[0]*r[0],t[1]=n[1]*r[1],t},e.mul=e.multiply,e.divide=function(t,n,r){return t[0]=n[0]/r[0],t[1]=n[1]/r[1],t},e.div=e.divide,e.min=function(t,n,r){return t[0]=Math.min(n[0],r[0]),t[1]=Math.min(n[1],r[1]),t},e.max=function(t,n,r){return t[0]=Math.max(n[0],r[0]),t[1]=Math.max(n[1],r[1]),t},e.scale=function(t,n,r){return t[0]=n[0]*r,t[1]=n[1]*r,t},e.scaleAndAdd=function(t,n,r,a){return t[0]=n[0]+r[0]*a,t[1]=n[1]+r[1]*a,t},e.distance=function(t,n){var r=n[0]-t[0],a=n[1]-t[1];return Math.sqrt(r*r+a*a)},e.dist=e.distance,e.squaredDistance=function(t,n){var r=n[0]-t[0],a=n[1]-t[1];return r*r+a*a},e.sqrDist=e.squaredDistance,e.length=function(t){var n=t[0],r=t[1];return Math.sqrt(n*n+r*r)},e.len=e.length,e.squaredLength=function(t){var n=t[0],r=t[1];return n*n+r*r},e.sqrLen=e.squaredLength,e.negate=function(t,n){return t[0]=-n[0],t[1]=-n[1],t},e.inverse=function(t,n){return t[0]=1/n[0],t[1]=1/n[1],t},e.normalize=function(t,n){var r=n[0],a=n[1],e=r*r+a*a;return e>0&&(e=1/Math.sqrt(e),t[0]=n[0]*e,t[1]=n[1]*e),t},e.dot=function(t,n){return t[0]*n[0]+t[1]*n[1]},e.cross=function(t,n,r){var a=n[0]*r[1]-n[1]*r[0];return t[0]=t[1]=0,t[2]=a,t},e.lerp=function(t,n,r,a){var e=n[0],u=n[1];return t[0]=e+a*(r[0]-e),t[1]=u+a*(r[1]-u),t},e.random=function(t,n){n=n||1;var r=2*a.RANDOM()*Math.PI;return t[0]=Math.cos(r)*n,t[1]=Math.sin(r)*n,t},e.transformMat2=function(t,n,r){var a=n[0],e=n[1];return t[0]=r[0]*a+r[2]*e,t[1]=r[1]*a+r[3]*e,t},e.transformMat2d=function(t,n,r){var a=n[0],e=n[1];return t[0]=r[0]*a+r[2]*e+r[4],t[1]=r[1]*a+r[3]*e+r[5],t},e.transformMat3=function(t,n,r){
var a=n[0],e=n[1];return t[0]=r[0]*a+r[3]*e+r[6],t[1]=r[1]*a+r[4]*e+r[7],t},e.transformMat4=function(t,n,r){var a=n[0],e=n[1];return t[0]=r[0]*a+r[4]*e+r[12],t[1]=r[1]*a+r[5]*e+r[13],t},e.forEach=function(){var t=e.create();return function(n,r,a,e,u,o){var i,c;for(r||(r=2),a||(a=0),c=e?Math.min(e*r+a,n.length):n.length,i=a;c>i;i+=r)t[0]=n[i],t[1]=n[i+1],u(t,t,o),n[i]=t[0],n[i+1]=t[1];return n}}(),e.str=function(t){return"vec2("+t[0]+", "+t[1]+")"},t.exports=e}])});
/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

define('cluster',["gl-matrix"], function(glMatrix) {
    "use strict";

    var vec2 = glMatrix.vec2;
    /**
     * Creates a cluster for grouping similar orientations of datapoints 
     */
    var Cluster = {
        create : function(point, threshold) {
            var points = [], center = {
                rad : 0,
                vec : vec2.clone([0, 0])
            }, pointMap = {};

            function init() {
                add(point);
                updateCenter();
            }

            function add(point) {
                pointMap[point.id] = point;
                points.push(point);
            }

            function updateCenter() {
                var i, sum = 0;
                for ( i = 0; i < points.length; i++) {
                    sum += points[i].rad;
                }
                center.rad = sum / points.length;
                center.vec = vec2.clone([Math.cos(center.rad), Math.sin(center.rad)]);
            }

            init();

            return {
                add : function(point) {
                    if (!pointMap[point.id]) {
                        add(point);
                        updateCenter();
                    }
                },
                fits : function(point) {
                    // check cosine similarity to center-angle
                    var similarity = Math.abs(vec2.dot(point.point.vec, center.vec));
                    if (similarity > threshold) {
                        return true;
                    }
                    return false;
                },
                getPoints : function() {
                    return points;
                },
                getCenter : function() {
                    return center;
                }
            };
        },
        createPoint : function(point, id, property) {
            return {
                rad : point[property],
                point : point,
                id : id
            };
        }
    };

    return (Cluster);
});

/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

define('array_helper',[],function() {
    "use strict";

    return {
        init : function(arr, val) {
            var l = arr.length;
            while (l--) {
                arr[l] = val;
            }
        },

        /**
         * Shuffles the content of an array
         * @return {Array} the array itself shuffled
         */
        shuffle : function(arr) {
            var i = arr.length - 1, j, x;
            for (i; i >= 0; i--) {
                j = Math.floor(Math.random() * i);
                x = arr[i];
                arr[i] = arr[j];
                arr[j] = x;
            }
            return arr;
        },

        toPointList : function(arr) {
            var i, j, row = [], rows = [];
            for ( i = 0; i < arr.length; i++) {
                row = [];
                for ( j = 0; j < arr[i].length; j++) {
                    row[j] = arr[i][j];
                }
                rows[i] = "[" + row.join(",") + "]";
            }
            return "[" + rows.join(",\r\n") + "]";
        },

        /**
         * returns the elements which's score is bigger than the threshold
         * @return {Array} the reduced array
         */
        threshold : function(arr, threshold, scoreFunc) {
            var i, queue = [];
            for ( i = 0; i < arr.length; i++) {
                if (scoreFunc.apply(arr, [arr[i]]) >= threshold) {
                    queue.push(arr[i]);
                }
            }
            return queue;
        },

        maxIndex : function(arr) {
            var i, max = 0;
            for ( i = 0; i < arr.length; i++) {
                if (arr[i] > arr[max]) {
                    max = i;
                }
            }
            return max;
        },

        max : function(arr) {
            var i, max = 0;
            for ( i = 0; i < arr.length; i++) {
                if (arr[i] > max) {
                    max = arr[i];
                }
            }
            return max;
        },

        sum: function(arr) {
            var length = arr.length,
                sum = 0;

            while(length--) {
                sum += arr[length];
            }
            return sum;
        }
    };
}); 
/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

define('cv_utils',['cluster', "array_helper", "gl-matrix"], function(Cluster2, ArrayHelper, glMatrix) {

    "use strict";
    /*
    * cv_utils.js
    * Collection of CV functions and libraries
    */

    /**
     * Namespace for various CV alorithms
     * @class Represents a collection of useful CV algorithms/functions
     */

    var CVUtils = {},
        vec2 = glMatrix.vec2,
        vec3 = glMatrix.vec3;

    /**
     * @param x x-coordinate
     * @param y y-coordinate
     * @return ImageReference {x,y} Coordinate
     */
    CVUtils.imageRef = function(x, y) {
        var that = {
            x : x,
            y : y,
            toVec2 : function() {
                return vec2.clone([this.x, this.y]);
            },
            toVec3 : function() {
                return vec3.clone([this.x, this.y, 1]);
            },
            round : function() {
                this.x = this.x > 0.0 ? Math.floor(this.x + 0.5) : Math.floor(this.x - 0.5);
                this.y = this.y > 0.0 ? Math.floor(this.y + 0.5) : Math.floor(this.y - 0.5);
                return this;
            }
        };
        return that;
    };

    /**
     * Computes an integral image of a given grayscale image.
     * @param imageDataContainer {ImageDataContainer} the image to be integrated
     */
    CVUtils.computeIntegralImage2 = function(imageWrapper, integralWrapper) {
        var imageData = imageWrapper.data;
        var width = imageWrapper.size.x;
        var height = imageWrapper.size.y;
        var integralImageData = integralWrapper.data;
        var sum = 0, posA = 0, posB = 0, posC = 0, posD = 0, x, y;

        // sum up first column
        posB = width;
        sum = 0;
        for ( y = 1; y < height; y++) {
            sum += imageData[posA];
            integralImageData[posB] += sum;
            posA += width;
            posB += width;
        }

        posA = 0;
        posB = 1;
        sum = 0;
        for ( x = 1; x < width; x++) {
            sum += imageData[posA];
            integralImageData[posB] += sum;
            posA++;
            posB++;
        }

        for ( y = 1; y < height; y++) {
            posA = y * width + 1;
            posB = (y - 1) * width + 1;
            posC = y * width;
            posD = (y - 1) * width;
            for ( x = 1; x < width; x++) {
                integralImageData[posA] += imageData[posA] + integralImageData[posB] + integralImageData[posC] - integralImageData[posD];
                posA++;
                posB++;
                posC++;
                posD++;
            }
        }
    };

    CVUtils.computeIntegralImage = function(imageWrapper, integralWrapper) {
        var imageData = imageWrapper.data;
        var width = imageWrapper.size.x;
        var height = imageWrapper.size.y;
        var integralImageData = integralWrapper.data;
        var sum = 0;

        // sum up first row
        for (var i = 0; i < width; i++) {
            sum += imageData[i];
            integralImageData[i] = sum;
        }

        for (var v = 1; v < height; v++) {
            sum = 0;
            for (var u = 0; u < width; u++) {
                sum += imageData[v * width + u];
                integralImageData[((v) * width) + u] = sum + integralImageData[(v - 1) * width + u];
            }
        }
    };

    CVUtils.thresholdImage = function(imageWrapper, threshold, targetWrapper) {
        if (!targetWrapper) {
            targetWrapper = imageWrapper;
        }
        var imageData = imageWrapper.data, length = imageData.length, targetData = targetWrapper.data;

        while (length--) {
            targetData[length] = imageData[length] < threshold ? 1 : 0;
        }
    };

    CVUtils.computeHistogram = function(imageWrapper, bitsPerPixel) {
        if (!bitsPerPixel) {
            bitsPerPixel = 8;
        }
        var imageData = imageWrapper.data,
            length = imageData.length,
            bitShift = 8 - bitsPerPixel,
            bucketCnt = 1 << bitsPerPixel,
            hist = new Int32Array(bucketCnt);

        while (length--) {
            hist[imageData[length] >> bitShift]++;
        }
        return hist;
    };

    CVUtils.sharpenLine = function(line) {
        var i,
            length = line.length,
            left = line[0],
            center = line[1],
            right;

        for (i = 1; i < length - 1; i++) {
            right = line[i + 1];
            //  -1 4 -1 kernel
            line[i-1] = (((center * 2) - left - right)) & 255;
            left = center;
            center = right;
        }
        return line;
    };

    CVUtils.determineOtsuThreshold = function(imageWrapper, bitsPerPixel) {
        if (!bitsPerPixel) {
            bitsPerPixel = 8;
        }
        var hist,
            threshold,
            bitShift = 8 - bitsPerPixel;

        function px(init, end) {
            var sum = 0, i;
            for ( i = init; i <= end; i++) {
                sum += hist[i];
            }
            return sum;
        }

        function mx(init, end) {
            var i, sum = 0;

            for ( i = init; i <= end; i++) {
                sum += i * hist[i];
            }

            return sum;
        }

        function determineThreshold() {
            var vet = [0], p1, p2, p12, k, m1, m2, m12,
                max = (1 << bitsPerPixel) - 1;

            hist = CVUtils.computeHistogram(imageWrapper, bitsPerPixel);
            for ( k = 1; k < max; k++) {
                p1 = px(0, k);
                p2 = px(k + 1, max);
                p12 = p1 * p2;
                if (p12 === 0) {
                    p12 = 1;
                }
                m1 = mx(0, k) * p2;
                m2 = mx(k + 1, max) * p1;
                m12 = m1 - m2;
                vet[k] = m12 * m12 / p12;
            }
            return ArrayHelper.maxIndex(vet);
        }

        threshold = determineThreshold();
        return threshold << bitShift;
    };

    CVUtils.otsuThreshold = function(imageWrapper, targetWrapper) {
        var threshold = CVUtils.determineOtsuThreshold(imageWrapper);

        CVUtils.thresholdImage(imageWrapper, threshold, targetWrapper);
        return threshold;
    };

    // local thresholding
    CVUtils.computeBinaryImage = function(imageWrapper, integralWrapper, targetWrapper) {
        CVUtils.computeIntegralImage(imageWrapper, integralWrapper);

        if (!targetWrapper) {
            targetWrapper = imageWrapper;
        }
        var imageData = imageWrapper.data;
        var targetData = targetWrapper.data;
        var width = imageWrapper.size.x;
        var height = imageWrapper.size.y;
        var integralImageData = integralWrapper.data;
        var sum = 0, v, u, kernel = 3, A, B, C, D, avg, size = (kernel * 2 + 1) * (kernel * 2 + 1);

        // clear out top & bottom-border
        for ( v = 0; v <= kernel; v++) {
            for ( u = 0; u < width; u++) {
                targetData[((v) * width) + u] = 0;
                targetData[(((height - 1) - v) * width) + u] = 0;
            }
        }

        // clear out left & right border
        for ( v = kernel; v < height - kernel; v++) {
            for ( u = 0; u <= kernel; u++) {
                targetData[((v) * width) + u] = 0;
                targetData[((v) * width) + (width - 1 - u)] = 0;
            }
        }

        for ( v = kernel + 1; v < height - kernel - 1; v++) {
            for ( u = kernel + 1; u < width - kernel; u++) {
                A = integralImageData[(v - kernel - 1) * width + (u - kernel - 1)];
                B = integralImageData[(v - kernel - 1) * width + (u + kernel)];
                C = integralImageData[(v + kernel) * width + (u - kernel - 1)];
                D = integralImageData[(v + kernel) * width + (u + kernel)];
                sum = D - C - B + A;
                avg = sum / (size);
                targetData[v * width + u] = imageData[v * width + u] > (avg + 5) ? 0 : 1;
            }
        }
    };

    CVUtils.cluster = function(points, threshold, property) {
        var i, k, cluster, point, clusters = [];

        if (!property) {
            property = "rad";
        }

        function addToCluster(point) {
            var found = false;
            for ( k = 0; k < clusters.length; k++) {
                cluster = clusters[k];
                if (cluster.fits(point)) {
                    cluster.add(point);
                    found = true;
                }
            }
            return found;
        }

        // iterate over each cloud
        for ( i = 0; i < points.length; i++) {
            point = Cluster2.createPoint(points[i], i, property);
            if (!addToCluster(point)) {
                clusters.push(Cluster2.create(point, threshold));
            }
        }

        return clusters;

    };

    CVUtils.Tracer = {
        trace : function(points, vec) {
            var iteration, maxIterations = 10, top = [], result = [], centerPos = 0, currentPos = 0;

            function trace(idx, forward) {
                var from, to, toIdx, predictedPos, thresholdX = 1, thresholdY = Math.abs(vec[1] / 10), found = false;

                function match(pos, predicted) {
                    if (pos.x > (predicted.x - thresholdX) && pos.x < (predicted.x + thresholdX) && pos.y > (predicted.y - thresholdY) && pos.y < (predicted.y + thresholdY)) {
                        return true;
                    } else {
                        return false;
                    }
                }

                // check if the next index is within the vec specifications
                // if not, check as long as the threshold is met

                from = points[idx];
                if (forward) {
                    predictedPos = {
                        x : from.x + vec[0],
                        y : from.y + vec[1]
                    };
                } else {
                    predictedPos = {
                        x : from.x - vec[0],
                        y : from.y - vec[1]
                    };
                }

                toIdx = forward ? idx + 1 : idx - 1;
                to = points[toIdx];
                while (to && ( found = match(to, predictedPos)) !== true && (Math.abs(to.y - from.y) < vec[1])) {
                    toIdx = forward ? toIdx + 1 : toIdx - 1;
                    to = points[toIdx];
                }

                return found ? toIdx : null;
            }

            for ( iteration = 0; iteration < maxIterations; iteration++) {
                // randomly select point to start with
                centerPos = Math.floor(Math.random() * points.length);

                // trace forward
                top = [];
                currentPos = centerPos;
                top.push(points[currentPos]);
                while (( currentPos = trace(currentPos, true)) !== null) {
                    top.push(points[currentPos]);
                }
                if (centerPos > 0) {
                    currentPos = centerPos;
                    while (( currentPos = trace(currentPos, false)) !== null) {
                        top.push(points[currentPos]);
                    }
                }

                if (top.length > result.length) {
                    result = top;
                }
            }

            return result;

        }
    };

    CVUtils.DILATE = 1;
    CVUtils.ERODE = 2;

    CVUtils.dilate = function(inImageWrapper, outImageWrapper) {
        var v, u, inImageData = inImageWrapper.data, outImageData = outImageWrapper.data, height = inImageWrapper.size.y, width = inImageWrapper.size.x, sum, yStart1, yStart2, xStart1, xStart2;

        for ( v = 1; v < height - 1; v++) {
            for ( u = 1; u < width - 1; u++) {
                yStart1 = v - 1;
                yStart2 = v + 1;
                xStart1 = u - 1;
                xStart2 = u + 1;
                sum = inImageData[yStart1 * width + xStart1]/* +   inImageData[yStart1*width+u] */ + inImageData[yStart1 * width + xStart2] +
                /* inImageData[v*width+xStart1]  + */
                inImageData[v * width + u] + /* inImageData[v*width+xStart2] +*/
                inImageData[yStart2 * width + xStart1]/* +   inImageData[yStart2*width+u]*/ + inImageData[yStart2 * width + xStart2];
                outImageData[v * width + u] = sum > 0 ? 1 : 0;
            }
        }
    };

    CVUtils.erode = function(inImageWrapper, outImageWrapper) {
        var v, u, inImageData = inImageWrapper.data, outImageData = outImageWrapper.data, height = inImageWrapper.size.y, width = inImageWrapper.size.x, sum, yStart1, yStart2, xStart1, xStart2;

        for ( v = 1; v < height - 1; v++) {
            for ( u = 1; u < width - 1; u++) {
                yStart1 = v - 1;
                yStart2 = v + 1;
                xStart1 = u - 1;
                xStart2 = u + 1;
                sum = inImageData[yStart1 * width + xStart1]/* +   inImageData[yStart1*width+u] */ + inImageData[yStart1 * width + xStart2] +
                /* inImageData[v*width+xStart1]  + */
                inImageData[v * width + u] + /* inImageData[v*width+xStart2] +*/
                inImageData[yStart2 * width + xStart1]/* +   inImageData[yStart2*width+u]*/ + inImageData[yStart2 * width + xStart2];
                outImageData[v * width + u] = sum === 5 ? 1 : 0;
            }
        }
    };

    CVUtils.subtract = function(aImageWrapper, bImageWrapper, resultImageWrapper) {
        if (!resultImageWrapper) {
            resultImageWrapper = aImageWrapper;
        }
        var length = aImageWrapper.data.length, aImageData = aImageWrapper.data, bImageData = bImageWrapper.data, cImageData = resultImageWrapper.data;

        while (length--) {
            cImageData[length] = aImageData[length] - bImageData[length];
        }
    };

    CVUtils.bitwiseOr = function(aImageWrapper, bImageWrapper, resultImageWrapper) {
        if (!resultImageWrapper) {
            resultImageWrapper = aImageWrapper;
        }
        var length = aImageWrapper.data.length, aImageData = aImageWrapper.data, bImageData = bImageWrapper.data, cImageData = resultImageWrapper.data;

        while (length--) {
            cImageData[length] = aImageData[length] || bImageData[length];
        }
    };

    CVUtils.countNonZero = function(imageWrapper) {
        var length = imageWrapper.data.length, data = imageWrapper.data, sum = 0;

        while (length--) {
            sum += data[length];
        }
        return sum;
    };

    CVUtils.topGeneric = function(list, top, scoreFunc) {
        var i, minIdx = 0, min = 0, queue = [], score, hit, pos;

        for ( i = 0; i < top; i++) {
            queue[i] = {
                score : 0,
                item : null
            };
        }

        for ( i = 0; i < list.length; i++) {
            score = scoreFunc.apply(this, [list[i]]);
            if (score > min) {
                hit = queue[minIdx];
                hit.score = score;
                hit.item = list[i];
                min = Number.MAX_VALUE;
                for ( pos = 0; pos < top; pos++) {
                    if (queue[pos].score < min) {
                        min = queue[pos].score;
                        minIdx = pos;
                    }
                }
            }
        }

        return queue;
    };

    CVUtils.grayArrayFromImage = function(htmlImage, offsetX, ctx, array) {
        ctx.drawImage(htmlImage, offsetX, 0, htmlImage.width, htmlImage.height);
        var ctxData = ctx.getImageData(offsetX, 0, htmlImage.width, htmlImage.height).data;
        CVUtils.computeGray(ctxData, array);
    };

    CVUtils.grayArrayFromContext = function(ctx, size, offset, array) {
        var ctxData = ctx.getImageData(offset.x, offset.y, size.x, size.y).data;
        CVUtils.computeGray(ctxData, array);
    };

    CVUtils.grayAndHalfSampleFromCanvasData = function(canvasData, size, outArray) {
        var topRowIdx = 0;
        var bottomRowIdx = size.x;
        var endIdx = Math.floor(canvasData.length / 4);
        var outWidth = size.x / 2;
        var outImgIdx = 0;
        var inWidth = size.x;
        var i;

        while (bottomRowIdx < endIdx) {
            for ( i = 0; i < outWidth; i++) {
                outArray[outImgIdx] = Math.floor(((0.299 * canvasData[topRowIdx * 4 + 0] + 0.587 * canvasData[topRowIdx * 4 + 1] + 0.114 * canvasData[topRowIdx * 4 + 2]) + (0.299 * canvasData[(topRowIdx + 1) * 4 + 0] + 0.587 * canvasData[(topRowIdx + 1) * 4 + 1] + 0.114 * canvasData[(topRowIdx + 1) * 4 + 2]) + (0.299 * canvasData[(bottomRowIdx) * 4 + 0] + 0.587 * canvasData[(bottomRowIdx) * 4 + 1] + 0.114 * canvasData[(bottomRowIdx) * 4 + 2]) + (0.299 * canvasData[(bottomRowIdx + 1) * 4 + 0] + 0.587 * canvasData[(bottomRowIdx + 1) * 4 + 1] + 0.114 * canvasData[(bottomRowIdx + 1) * 4 + 2])) / 4);
                outImgIdx++;
                topRowIdx = topRowIdx + 2;
                bottomRowIdx = bottomRowIdx + 2;
            }
            topRowIdx = topRowIdx + inWidth;
            bottomRowIdx = bottomRowIdx + inWidth;
        }

    };

    CVUtils.computeGray = function(imageData, outArray, config) {
        var l = (imageData.length / 4) | 0,
            i,
            singleChannel = config && config.singleChannel === true;

        if (singleChannel) {
            for (i = 0; i < l; i++) {
                outArray[i] = imageData[i * 4 + 0];
            }
        } else {
            for (i = 0; i < l; i++) {
                outArray[i] = Math.floor(0.299 * imageData[i * 4 + 0] + 0.587 * imageData[i * 4 + 1] + 0.114 * imageData[i * 4 + 2]);
            }
        }
    };

    CVUtils.loadImageArray = function(src, callback, canvas) {
        if (!canvas)
            canvas = document.createElement('canvas');
        var img = new Image();
        img.callback = callback;
        img.onload = function() {
            canvas.width = this.width;
            canvas.height = this.height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(this, 0, 0);
            var array = new Uint8Array(this.width * this.height);
            ctx.drawImage(this, 0, 0);
            var data = ctx.getImageData(0, 0, this.width, this.height).data;
            CVUtils.computeGray(data, array);
            this.callback(array, {
                x : this.width,
                y : this.height
            }, this);
        };
        img.src = src;
    };

    /**
     * @param inImg {ImageWrapper} input image to be sampled
     * @param outImg {ImageWrapper} to be stored in
     */
    CVUtils.halfSample = function(inImgWrapper, outImgWrapper) {
        var inImg = inImgWrapper.data;
        var inWidth = inImgWrapper.size.x;
        var outImg = outImgWrapper.data;
        var topRowIdx = 0;
        var bottomRowIdx = inWidth;
        var endIdx = inImg.length;
        var outWidth = inWidth / 2;
        var outImgIdx = 0;
        while (bottomRowIdx < endIdx) {
            for (var i = 0; i < outWidth; i++) {
                outImg[outImgIdx] = Math.floor((inImg[topRowIdx] + inImg[topRowIdx + 1] + inImg[bottomRowIdx] + inImg[bottomRowIdx + 1]) / 4);
                outImgIdx++;
                topRowIdx = topRowIdx + 2;
                bottomRowIdx = bottomRowIdx + 2;
            }
            topRowIdx = topRowIdx + inWidth;
            bottomRowIdx = bottomRowIdx + inWidth;
        }
    };

    CVUtils.hsv2rgb = function(hsv, rgb) {
        var h = hsv[0], s = hsv[1], v = hsv[2], c = v * s, x = c * (1 - Math.abs((h / 60) % 2 - 1)), m = v - c, r = 0, g = 0, b = 0;
        rgb = rgb || [0, 0, 0];

        if (h < 60) {
            r = c;
            g = x;
        } else if (h < 120) {
            r = x;
            g = c;
        } else if (h < 180) {
            g = c;
            b = x;
        } else if (h < 240) {
            g = x;
            b = c;
        } else if (h < 300) {
            r = x;
            b = c;
        } else if (h < 360) {
            r = c;
            b = x;
        }
        rgb[0] = ((r + m) * 255) | 0;
        rgb[1] = ((g + m) * 255) | 0;
        rgb[2] = ((b + m) * 255) | 0;
        return rgb;
    };

    CVUtils._computeDivisors = function(n) {
        var largeDivisors = [],
            divisors = [],
            i;

        for (i = 1; i < Math.sqrt(n) + 1; i++) {
            if (n % i === 0) {
                divisors.push(i);
                if (i !== n/i) {
                    largeDivisors.unshift(Math.floor(n/i));
                }
            }
        }
        return divisors.concat(largeDivisors);
    };

    CVUtils._computeIntersection = function(arr1, arr2) {
        var i = 0,
            j = 0,
            result = [];

        while (i < arr1.length && j < arr2.length) {
            if (arr1[i] === arr2[j]) {
                result.push(arr1[i]);
                i++;
                j++;
            } else if (arr1[i] > arr2[j]) {
                j++;
            } else {
                i++;
            }
        }
        return result;
    };

    CVUtils.calculatePatchSize = function(patchSize, imgSize) {
        var divisorsX = this._computeDivisors(imgSize.x),
            divisorsY = this._computeDivisors(imgSize.y),
            wideSide = Math.max(imgSize.x, imgSize.y),
            common = this._computeIntersection(divisorsX, divisorsY),
            nrOfPatchesList = [8, 10, 15, 20, 32, 60, 80],
            nrOfPatchesMap = {
                "x-small": 5,
                "small": 4,
                "medium": 3,
                "large": 2,
                "x-large": 1
            },
            nrOfPatchesIdx = nrOfPatchesMap[patchSize] || nrOfPatchesMap.medium,
            nrOfPatches = nrOfPatchesList[nrOfPatchesIdx],
            desiredPatchSize = Math.floor(wideSide/nrOfPatches),
            optimalPatchSize;

        function findPatchSizeForDivisors(divisors) {
            var i = 0,
                found = divisors[Math.floor(divisors.length/2)];

            while(i < (divisors.length - 1) && divisors[i] < desiredPatchSize) {
                i++;
            }
            if (i > 0) {
                if (Math.abs(divisors[i] - desiredPatchSize) > Math.abs(divisors[i-1] - desiredPatchSize)) {
                    found = divisors[i-1];
                } else {
                    found = divisors[i];
                }
            }
            if (desiredPatchSize / found < nrOfPatchesList[nrOfPatchesIdx+1] / nrOfPatchesList[nrOfPatchesIdx] &&
                desiredPatchSize / found > nrOfPatchesList[nrOfPatchesIdx-1]/nrOfPatchesList[nrOfPatchesIdx] ) {
                return {x: found, y: found};
            }
            return null;
        }

        optimalPatchSize = findPatchSizeForDivisors(common);
        if (!optimalPatchSize) {
            optimalPatchSize = findPatchSizeForDivisors(this._computeDivisors(wideSide));
            if (!optimalPatchSize) {
                optimalPatchSize = findPatchSizeForDivisors((this._computeDivisors(desiredPatchSize * nrOfPatches)));
            }
        }
        return optimalPatchSize;
    };

    CVUtils._parseCSSDimensionValues = function(value) {
        var dimension = {
                value: parseFloat(value),
                unit: value.indexOf("%") === value.length-1 ? "%" : "%"
            };

        return dimension;
    };

    CVUtils._dimensionsConverters = {
        top: function(dimension, context) {
            if (dimension.unit === "%") {
                return Math.floor(context.height * (dimension.value / 100));
            }
        },
        right: function(dimension, context) {
            if (dimension.unit === "%") {
                return Math.floor(context.width - (context.width * (dimension.value / 100)));
            }
        },
        bottom: function(dimension, context) {
            if (dimension.unit === "%") {
                return Math.floor(context.height - (context.height * (dimension.value / 100)));
            }
        },
        left: function(dimension, context) {
            if (dimension.unit === "%") {
                return Math.floor(context.width * (dimension.value / 100));
            }
        }
    };

    CVUtils.computeImageArea = function(inputWidth, inputHeight, area) {
        var context = {width: inputWidth, height: inputHeight};

        var parsedArea = Object.keys(area).reduce(function(result, key) {
            var value = area[key],
                parsed = CVUtils._parseCSSDimensionValues(value),
                calculated = CVUtils._dimensionsConverters[key](parsed, context);

            result[key] = calculated;
            return result;
        }, {});

        return {
            sx: parsedArea.left,
            sy: parsedArea.top,
            sw: parsedArea.right - parsedArea.left,
            sh: parsedArea.bottom - parsedArea.top
        };
    };

    return (CVUtils);
});


/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define  */

define('image_wrapper',[
    "subImage",
    "cv_utils",
    "array_helper",
    "gl-matrix"
    ], 
    function(SubImage, CVUtils, ArrayHelper, glMatrix) {
    
    'use strict';
    var vec2 = glMatrix.vec2,
        mat2 = glMatrix.mat2;

    /**
     * Represents a basic image combining the data and size.
     * In addition, some methods for manipulation are contained.
     * @param size {x,y} The size of the image in pixel
     * @param data {Array} If given, a flat array containing the pixel data
     * @param ArrayType {Type} If given, the desired DataType of the Array (may be typed/non-typed)
     * @param initialize {Boolean} Indicating if the array should be initialized on creation.
     * @returns {ImageWrapper}
     */
    function ImageWrapper(size, data, ArrayType, initialize) {
        if (!data) {
            if (ArrayType) {
                this.data = new ArrayType(size.x * size.y);
                if (ArrayType === Array && initialize) {
                    ArrayHelper.init(this.data, 0);
                }
            } else {
                this.data = new Uint8Array(size.x * size.y);
                if (Uint8Array === Array && initialize) {
                    ArrayHelper.init(this.data, 0);
                }
            }

        } else {
            this.data = data;
        }
        this.size = size;
    }

    /**
     * tests if a position is within the image with a given offset
     * @param imgRef {x, y} The location to test
     * @param border Number the padding value in pixel
     * @returns {Boolean} true if location inside the image's border, false otherwise
     * @see cvd/image.h
     */
    ImageWrapper.prototype.inImageWithBorder = function(imgRef, border) {
        return (imgRef.x >= border) && (imgRef.y >= border) && (imgRef.x < (this.size.x - border)) && (imgRef.y < (this.size.y - border));
    };

    /**
     * Transforms an image according to the given affine-transformation matrix.
     * @param inImg ImageWrapper a image containing the information to be extracted.
     * @param outImg ImageWrapper the image to be filled.  The whole image out image is filled by the in image.
     * @param M mat2 the matrix used to map point in the out matrix to those in the in matrix
     * @param inOrig vec2 origin in the in image
     * @param outOrig vec2 origin in the out image
     * @returns Number the number of pixels not in the in image
     * @see cvd/vision.h
     */
    ImageWrapper.transform = function(inImg, outImg, M, inOrig, outOrig) {
        var w = outImg.size.x, h = outImg.size.y, iw = inImg.size.x, ih = inImg.size.y;
        var across = vec2.clone([M[0], M[2]]);
        var down = vec2.clone([M[1], M[3]]);
        var defaultValue = 0;

        var p0 = vec2.subtract(inOrig, mat2.xVec2(M, outOrig, vec2.clone()), vec2.clone());

        var min_x = p0[0], min_y = p0[1];
        var max_x = min_x, max_y = min_y;
        var p, i, j;

        var sampleFunc = ImageWrapper.sample;

        if (across[0] < 0)
            min_x += w * across[0];
        else
            max_x += w * across[0];

        if (down[0] < 0)
            min_x += h * down[0];
        else
            max_x += h * down[0];

        if (across[1] < 0)
            min_y += w * across[1];
        else
            max_y += w * across[1];

        if (down[1] < 0)
            min_y += h * down[1];
        else
            max_y += h * down[1];

        var carrigeReturn = vec2.subtract(down, vec2.scale(across, w, vec2.clone()), vec2.clone());

        if (min_x >= 0 && min_y >= 0 && max_x < iw - 1 && max_y < ih - 1) {
            p = p0;
            for ( i = 0; i < h; ++i, vec2.add(p, carrigeReturn))
                for ( j = 0; j < w; ++j, vec2.add(p, across))
                    outImg.set(j, i, sampleFunc(inImg, p[0], p[1]));
            return 0;
        } else {
            var x_bound = iw - 1;
            var y_bound = ih - 1;
            var count = 0;
            p = p0;
            for ( i = 0; i < h; ++i, vec2.add(p, carrigeReturn)) {
                for ( j = 0; j < w; ++j, vec2.add(p, across)) {
                    if (0 <= p[0] && 0 <= p[1] && p[0] < x_bound && p[1] < y_bound) {
                        outImg.set(j, i, sampleFunc(inImg, p[0], p[1]));
                    } else {
                        outImg.set(j, i, defaultValue); ++count;
                    }
                }
            }
            return count;
        }
    };

    /**
     * Performs bilinear sampling
     * @param inImg Image to extract sample from
     * @param x the x-coordinate
     * @param y the y-coordinate
     * @returns the sampled value
     * @see cvd/vision.h
     */
    ImageWrapper.sample = function(inImg, x, y) {
        var lx = Math.floor(x);
        var ly = Math.floor(y);
        var w = inImg.size.x;
        var base = ly * inImg.size.x + lx;
        var a = inImg.data[base + 0];
        var b = inImg.data[base + 1];
        var c = inImg.data[base + w];
        var d = inImg.data[base + w + 1];
        var e = a - b;
        x -= lx;
        y -= ly;

        var result = Math.floor(x * (y * (e - c + d) - e) + y * (c - a) + a);
        return result;
    };

    /**
     * Initializes a given array. Sets each element to zero.
     * @param array {Array} The array to initialize
     */
    ImageWrapper.clearArray = function(array) {
        var l = array.length;
        while (l--) {
            array[l] = 0;
        }
    };

    /**
     * Creates a {SubImage} from the current image ({this}).
     * @param from {ImageRef} The position where to start the {SubImage} from. (top-left corner)
     * @param size {ImageRef} The size of the resulting image
     * @returns {SubImage} A shared part of the original image
     */
    ImageWrapper.prototype.subImage = function(from, size) {
        return new SubImage(from, size, this);
    };

    /**
     * Creates an {ImageWrapper) and copies the needed underlying image-data area
     * @param imageWrapper {ImageWrapper} The target {ImageWrapper} where the data should be copied
     * @param from {ImageRef} The location where to copy from (top-left location)
     */
    ImageWrapper.prototype.subImageAsCopy = function(imageWrapper, from) {
        var sizeY = imageWrapper.size.y, sizeX = imageWrapper.size.x;
        var x, y;
        for ( x = 0; x < sizeX; x++) {
            for ( y = 0; y < sizeY; y++) {
                imageWrapper.data[y * sizeX + x] = this.data[(from.y + y) * this.size.x + from.x + x];
            }
        }
    };

    ImageWrapper.prototype.copyTo = function(imageWrapper) {
        var length = this.data.length, srcData = this.data, dstData = imageWrapper.data;

        while (length--) {
            dstData[length] = srcData[length];
        }
    };

    /**
     * Retrieves a given pixel position from the image
     * @param x {Number} The x-position
     * @param y {Number} The y-position
     * @returns {Number} The grayscale value at the pixel-position
     */
    ImageWrapper.prototype.get = function(x, y) {
        return this.data[y * this.size.x + x];
    };

    /**
     * Retrieves a given pixel position from the image
     * @param x {Number} The x-position
     * @param y {Number} The y-position
     * @returns {Number} The grayscale value at the pixel-position
     */
    ImageWrapper.prototype.getSafe = function(x, y) {
        var i;
        
        if (!this.indexMapping) {
            this.indexMapping = {
                x : [],
                y : []
            };
            for (i = 0; i < this.size.x; i++) {
                this.indexMapping.x[i] = i;
                this.indexMapping.x[i + this.size.x] = i;
            }
            for (i = 0; i < this.size.y; i++) {
                this.indexMapping.y[i] = i;
                this.indexMapping.y[i + this.size.y] = i;
            }
        }
        return this.data[(this.indexMapping.y[y + this.size.y]) * this.size.x + this.indexMapping.x[x + this.size.x]];
    };

    /**
     * Sets a given pixel position in the image
     * @param x {Number} The x-position
     * @param y {Number} The y-position
     * @param value {Number} The grayscale value to set
     * @returns {ImageWrapper} The Image itself (for possible chaining)
     */
    ImageWrapper.prototype.set = function(x, y, value) {
        this.data[y * this.size.x + x] = value;
        return this;
    };

    /**
     * Sets the border of the image (1 pixel) to zero
     */
    ImageWrapper.prototype.zeroBorder = function() {
        var i, width = this.size.x, height = this.size.y, data = this.data;
        for ( i = 0; i < width; i++) {
            data[i] = data[(height - 1) * width + i] = 0;
        }
        for ( i = 1; i < height - 1; i++) {
            data[i * width] = data[i * width + (width - 1)] = 0;
        }
    };

    /**
     * Inverts a binary image in place
     */
    ImageWrapper.prototype.invert = function() {
        var data = this.data, length = data.length;

        while (length--) {
            data[length] = data[length] ? 0 : 1;
        }

    };

    ImageWrapper.prototype.convolve = function(kernel) {
        var x, y, kx, ky, kSize = (kernel.length / 2) | 0, accu = 0;
        for ( y = 0; y < this.size.y; y++) {
            for ( x = 0; x < this.size.x; x++) {
                accu = 0;
                for ( ky = -kSize; ky <= kSize; ky++) {
                    for ( kx = -kSize; kx <= kSize; kx++) {
                        accu += kernel[ky+kSize][kx + kSize] * this.getSafe(x + kx, y + ky);
                    }
                }
                this.data[y * this.size.x + x] = accu;
            }
        }
    };

    ImageWrapper.prototype.moments = function(labelcount) {
        var data = this.data,
            x,
            y,
            height = this.size.y,
            width = this.size.x,
            val,
            ysq,
            labelsum = [],
            i,
            label,
            mu11,
            mu02,
            mu20,
            x_,
            y_,
            tmp,
            result = [],
            PI = Math.PI,
            PI_4 = PI / 4;

        if (labelcount <= 0) {
            return result;
        }

        for ( i = 0; i < labelcount; i++) {
            labelsum[i] = {
                m00 : 0,
                m01 : 0,
                m10 : 0,
                m11 : 0,
                m02 : 0,
                m20 : 0,
                theta : 0,
                rad : 0
            };
        }

        for ( y = 0; y < height; y++) {
            ysq = y * y;
            for ( x = 0; x < width; x++) {
                val = data[y * width + x];
                if (val > 0) {
                    label = labelsum[val - 1];
                    label.m00 += 1;
                    label.m01 += y;
                    label.m10 += x;
                    label.m11 += x * y;
                    label.m02 += ysq;
                    label.m20 += x * x;
                }
            }
        }

        for ( i = 0; i < labelcount; i++) {
            label = labelsum[i];
            if (!isNaN(label.m00) && label.m00 !== 0) {
                x_ = label.m10 / label.m00;
                y_ = label.m01 / label.m00;
                mu11 = label.m11 / label.m00 - x_ * y_;
                mu02 = label.m02 / label.m00 - y_ * y_;
                mu20 = label.m20 / label.m00 - x_ * x_;
                tmp = (mu02 - mu20) / (2 * mu11);
                tmp = 0.5 * Math.atan(tmp) + (mu11 >= 0 ? PI_4 : -PI_4 ) + PI;
                label.theta = (tmp * 180 / PI + 90) % 180 - 90;
                if (label.theta < 0) {
                    label.theta += 180;
                }
                label.rad = tmp > PI ? tmp - PI : tmp;
                label.vec = vec2.clone([Math.cos(tmp), Math.sin(tmp)]);
                result.push(label);
            }
        }

        return result;
    };

    /**
     * Displays the {ImageWrapper} in a given canvas
     * @param canvas {Canvas} The canvas element to write to
     * @param scale {Number} Scale which is applied to each pixel-value
     */
    ImageWrapper.prototype.show = function(canvas, scale) {
        var ctx,
            frame,
            data,
            current,
            pixel,
            x,
            y;
        
        if (!scale) {
            scale = 1.0;
        }
        ctx = canvas.getContext('2d');
        canvas.width = this.size.x;
        canvas.height = this.size.y;
        frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
        data = frame.data;
        current = 0;
        for (y = 0; y < this.size.y; y++) {
            for (x = 0; x < this.size.x; x++) {
                pixel = y * this.size.x + x;
                current = this.get(x, y) * scale;
                data[pixel * 4 + 0] = current;
                data[pixel * 4 + 1] = current;
                data[pixel * 4 + 2] = current;
                data[pixel * 4 + 3] = 255;
            }
        }
        //frame.data = data;
        ctx.putImageData(frame, 0, 0);
    };

    /**
     * Displays the {SubImage} in a given canvas
     * @param canvas {Canvas} The canvas element to write to
     * @param scale {Number} Scale which is applied to each pixel-value
     */
    ImageWrapper.prototype.overlay = function(canvas, scale, from) {
        if (!scale || scale < 0 || scale > 360) {
            scale = 360;
        }
        var hsv = [0, 1, 1];
        var rgb = [0, 0, 0];
        var whiteRgb = [255, 255, 255];
        var blackRgb = [0, 0, 0];
        var result = [];
        var ctx = canvas.getContext('2d');
        var frame = ctx.getImageData(from.x, from.y, this.size.x, this.size.y);
        var data = frame.data;
        var length = this.data.length;
        while (length--) {
            hsv[0] = this.data[length] * scale;
            result = hsv[0] <= 0 ? whiteRgb : hsv[0] >= 360 ? blackRgb : CVUtils.hsv2rgb(hsv, rgb);
            data[length * 4 + 0] = result[0];
            data[length * 4 + 1] = result[1];
            data[length * 4 + 2] = result[2];
            data[length * 4 + 3] = 255;
        }
        ctx.putImageData(frame, from.x, from.y);
    };

    return (ImageWrapper);
}); 
/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

/**
 * http://www.codeproject.com/Tips/407172/Connected-Component-Labeling-and-Vectorization
 */
define('tracer',[],function() {
    "use strict";
    
    var Tracer = {
        searchDirections : [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]],
        create : function(imageWrapper, labelWrapper) {
            var imageData = imageWrapper.data,
                labelData = labelWrapper.data,
                searchDirections = this.searchDirections,
                width = imageWrapper.size.x,
                pos;

            function trace(current, color, label, edgelabel) {
                var i,
                    y,
                    x;

                for ( i = 0; i < 7; i++) {
                    y = current.cy + searchDirections[current.dir][0];
                    x = current.cx + searchDirections[current.dir][1];
                    pos = y * width + x;
                    if ((imageData[pos] === color) && ((labelData[pos] === 0) || (labelData[pos] === label))) {
                        labelData[pos] = label;
                        current.cy = y;
                        current.cx = x;
                        return true;
                    } else {
                        if (labelData[pos] === 0) {
                            labelData[pos] = edgelabel;
                        }
                        current.dir = (current.dir + 1) % 8;
                    }
                }
                return false;
            }

            function vertex2D(x, y, dir) {
                return {
                    dir : dir,
                    x : x,
                    y : y,
                    next : null,
                    prev : null
                };
            }

            function contourTracing(sy, sx, label, color, edgelabel) {
                var Fv = null,
                    Cv,
                    P,
                    ldir,
                    current = {
                        cx : sx,
                        cy : sy,
                        dir : 0
                    };

                if (trace(current, color, label, edgelabel)) {
                    Fv = vertex2D(sx, sy, current.dir);
                    Cv = Fv;
                    ldir = current.dir;
                    P = vertex2D(current.cx, current.cy, 0);
                    P.prev = Cv;
                    Cv.next = P;
                    P.next = null;
                    Cv = P;
                    do {
                        current.dir = (current.dir + 6) % 8;
                        trace(current, color, label, edgelabel);
                        if (ldir != current.dir) {
                            Cv.dir = current.dir;
                            P = vertex2D(current.cx, current.cy, 0);
                            P.prev = Cv;
                            Cv.next = P;
                            P.next = null;
                            Cv = P;
                        } else {
                            Cv.dir = ldir;
                            Cv.x = current.cx;
                            Cv.y = current.cy;
                        }
                        ldir = current.dir;
                    } while(current.cx != sx || current.cy != sy);
                    Fv.prev = Cv.prev;
                    Cv.prev.next = Fv;
                }
                return Fv;
            }

            return {
                trace : function(current, color, label, edgelabel) {
                    return trace(current, color, label, edgelabel);
                },
                contourTracing : function(sy, sx, label, color, edgelabel) {
                    return contourTracing(sy, sx, label, color, edgelabel);
                }
            };
        }
    };

    return (Tracer);
});

/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

/**
 * http://www.codeproject.com/Tips/407172/Connected-Component-Labeling-and-Vectorization
 */
define('rasterizer',["tracer"], function(Tracer) {
    "use strict";

    var Rasterizer = {
        createContour2D : function() {
            return {
                dir : null,
                index : null,
                firstVertex : null,
                insideContours : null,
                nextpeer : null,
                prevpeer : null
            };
        },
        CONTOUR_DIR : {
            CW_DIR : 0,
            CCW_DIR : 1,
            UNKNOWN_DIR : 2
        },
        DIR : {
            OUTSIDE_EDGE : -32767,
            INSIDE_EDGE : -32766
        },
        create : function(imageWrapper, labelWrapper) {
            var imageData = imageWrapper.data,
                labelData = labelWrapper.data,
                width = imageWrapper.size.x,
                height = imageWrapper.size.y,
                tracer = Tracer.create(imageWrapper, labelWrapper);

            return {
                rasterize : function(depthlabel) {
                    var color,
                        bc,
                        lc,
                        labelindex,
                        cx,
                        cy,
                        colorMap = [],
                        vertex,
                        p,
                        cc,
                        sc,
                        pos,
                        connectedCount = 0,
                        i;

                    for ( i = 0; i < 400; i++) {
                        colorMap[i] = 0;
                    }

                    colorMap[0] = imageData[0];
                    cc = null;
                    for ( cy = 1; cy < height - 1; cy++) {
                        labelindex = 0;
                        bc = colorMap[0];
                        for ( cx = 1; cx < width - 1; cx++) {
                            pos = cy * width + cx;
                            if (labelData[pos] === 0) {
                                color = imageData[pos];
                                if (color !== bc) {
                                    if (labelindex === 0) {
                                        lc = connectedCount + 1;
                                        colorMap[lc] = color;
                                        bc = color;
                                        vertex = tracer.contourTracing(cy, cx, lc, color, Rasterizer.DIR.OUTSIDE_EDGE);
                                        if (vertex !== null) {
                                            connectedCount++;
                                            labelindex = lc;
                                            p = Rasterizer.createContour2D();
                                            p.dir = Rasterizer.CONTOUR_DIR.CW_DIR;
                                            p.index = labelindex;
                                            p.firstVertex = vertex;
                                            p.nextpeer = cc;
                                            p.insideContours = null;
                                            if (cc !== null) {
                                                cc.prevpeer = p;
                                            }
                                            cc = p;
                                        }
                                    } else {
                                        vertex = tracer.contourTracing(cy, cx, Rasterizer.DIR.INSIDE_EDGE, color, labelindex);
                                        if (vertex !== null) {
                                            p = Rasterizer.createContour2D();
                                            p.firstVertex = vertex;
                                            p.insideContours = null;
                                            if (depthlabel === 0) {
                                                p.dir = Rasterizer.CONTOUR_DIR.CCW_DIR;
                                            } else {
                                                p.dir = Rasterizer.CONTOUR_DIR.CW_DIR;
                                            }
                                            p.index = depthlabel;
                                            sc = cc;
                                            while ((sc !== null) && sc.index !== labelindex) {
                                                sc = sc.nextpeer;
                                            }
                                            if (sc !== null) {
                                                p.nextpeer = sc.insideContours;
                                                if (sc.insideContours !== null) {
                                                    sc.insideContours.prevpeer = p;
                                                }
                                                sc.insideContours = p;
                                            }
                                        }
                                    }
                                } else {
                                    labelData[pos] = labelindex;
                                }
                            } else if (labelData[pos] === Rasterizer.DIR.OUTSIDE_EDGE || labelData[pos] === Rasterizer.DIR.INSIDE_EDGE) {
                                labelindex = 0;
                                if (labelData[pos] === Rasterizer.DIR.INSIDE_EDGE) {
                                    bc = imageData[pos];
                                } else {
                                    bc = colorMap[0];
                                }
                            } else {
                                labelindex = labelData[pos];
                                bc = colorMap[labelindex];
                            }
                        }
                    }
                    sc = cc;
                    while (sc !== null) {
                        sc.index = depthlabel;
                        sc = sc.nextpeer;
                    }
                    return {
                        cc : cc,
                        count : connectedCount
                    };
                },
                debug: {
                    drawContour : function(canvas, firstContour) {
                        var ctx = canvas.getContext("2d"),
                            pq = firstContour,
                            iq,
                            q,
                            p;
                            
                        ctx.strokeStyle = "red";
                        ctx.fillStyle = "red";
                        ctx.lineWidth = 1;
    
                        if (pq !== null) {
                            iq = pq.insideContours;
                        } else {
                            iq = null;
                        }
    
                        while (pq !== null) {
                            if (iq !== null) {
                                q = iq;
                                iq = iq.nextpeer;
                            } else {
                                q = pq;
                                pq = pq.nextpeer;
                                if (pq !== null) {
                                    iq = pq.insideContours;
                                } else {
                                    iq = null;
                                }
                            }
    
                            switch(q.dir) {
                            case Rasterizer.CONTOUR_DIR.CW_DIR:
                                ctx.strokeStyle = "red";
                                break;
                            case Rasterizer.CONTOUR_DIR.CCW_DIR:
                                ctx.strokeStyle = "blue";
                                break;
                            case Rasterizer.CONTOUR_DIR.UNKNOWN_DIR:
                                ctx.strokeStyle = "green";
                                break;
                            }
    
                            p = q.firstVertex;
                            ctx.beginPath();
                            ctx.moveTo(p.x, p.y);
                            do {
                                p = p.next;
                                ctx.lineTo(p.x, p.y);
                            } while(p !== q.firstVertex);
                            ctx.stroke();
                        }
                    }
                }
            };
        }
    };

    return (Rasterizer);
});

/* jshint undef: true, unused: true, browser:true, devel: true, -W041: false */
/* global define */

define('skeletonizer',[],function() {
    "use strict";

    /* @preserve ASM BEGIN */
    function Skeletonizer(stdlib, foreign, buffer) {
        "use asm";

        var images = new stdlib.Uint8Array(buffer),
            size = foreign.size | 0,
            imul = stdlib.Math.imul;

        function erode(inImagePtr, outImagePtr) {
            inImagePtr = inImagePtr | 0;
            outImagePtr = outImagePtr | 0;

            var v = 0,
                u = 0,
                sum = 0,
                yStart1 = 0,
                yStart2 = 0,
                xStart1 = 0,
                xStart2 = 0,
                offset = 0;

            for ( v = 1; (v | 0) < ((size - 1) | 0); v = (v + 1) | 0) {
                offset = (offset + size) | 0;
                for ( u = 1; (u | 0) < ((size - 1) | 0); u = (u + 1) | 0) {
                    yStart1 = (offset - size) | 0;
                    yStart2 = (offset + size) | 0;
                    xStart1 = (u - 1) | 0;
                    xStart2 = (u + 1) | 0;
                    sum = ((images[(inImagePtr + yStart1 + xStart1) | 0] | 0) + (images[(inImagePtr + yStart1 + xStart2) | 0] | 0) + (images[(inImagePtr + offset + u) | 0] | 0) + (images[(inImagePtr + yStart2 + xStart1) | 0] | 0) + (images[(inImagePtr + yStart2 + xStart2) | 0] | 0)) | 0;
                    if ((sum | 0) == (5 | 0)) {
                        images[(outImagePtr + offset + u) | 0] = 1;
                    } else {
                        images[(outImagePtr + offset + u) | 0] = 0;
                    }
                }
            }
            return;
        }

        function subtract(aImagePtr, bImagePtr, outImagePtr) {
            aImagePtr = aImagePtr | 0;
            bImagePtr = bImagePtr | 0;
            outImagePtr = outImagePtr | 0;

            var length = 0;

            length = imul(size, size) | 0;

            while ((length | 0) > 0) {
                length = (length - 1) | 0;
                images[(outImagePtr + length) | 0] = ((images[(aImagePtr + length) | 0] | 0) - (images[(bImagePtr + length) | 0] | 0)) | 0;
            }
        }

        function bitwiseOr(aImagePtr, bImagePtr, outImagePtr) {
            aImagePtr = aImagePtr | 0;
            bImagePtr = bImagePtr | 0;
            outImagePtr = outImagePtr | 0;

            var length = 0;

            length = imul(size, size) | 0;

            while ((length | 0) > 0) {
                length = (length - 1) | 0;
                images[(outImagePtr + length) | 0] = ((images[(aImagePtr + length) | 0] | 0) | (images[(bImagePtr + length) | 0] | 0)) | 0;
            }
        }

        function countNonZero(imagePtr) {
            imagePtr = imagePtr | 0;

            var sum = 0,
                length = 0;

            length = imul(size, size) | 0;

            while ((length | 0) > 0) {
                length = (length - 1) | 0;
                sum = ((sum | 0) + (images[(imagePtr + length) | 0] | 0)) | 0;
            }

            return (sum | 0);
        }

        function init(imagePtr, value) {
            imagePtr = imagePtr | 0;
            value = value | 0;

            var length = 0;

            length = imul(size, size) | 0;

            while ((length | 0) > 0) {
                length = (length - 1) | 0;
                images[(imagePtr + length) | 0] = value;
            }
        }

        function dilate(inImagePtr, outImagePtr) {
            inImagePtr = inImagePtr | 0;
            outImagePtr = outImagePtr | 0;

            var v = 0,
                u = 0,
                sum = 0,
                yStart1 = 0,
                yStart2 = 0,
                xStart1 = 0,
                xStart2 = 0,
                offset = 0;

            for ( v = 1; (v | 0) < ((size - 1) | 0); v = (v + 1) | 0) {
                offset = (offset + size) | 0;
                for ( u = 1; (u | 0) < ((size - 1) | 0); u = (u + 1) | 0) {
                    yStart1 = (offset - size) | 0;
                    yStart2 = (offset + size) | 0;
                    xStart1 = (u - 1) | 0;
                    xStart2 = (u + 1) | 0;
                    sum = ((images[(inImagePtr + yStart1 + xStart1) | 0] | 0) + (images[(inImagePtr + yStart1 + xStart2) | 0] | 0) + (images[(inImagePtr + offset + u) | 0] | 0) + (images[(inImagePtr + yStart2 + xStart1) | 0] | 0) + (images[(inImagePtr + yStart2 + xStart2) | 0] | 0)) | 0;
                    if ((sum | 0) > (0 | 0)) {
                        images[(outImagePtr + offset + u) | 0] = 1;
                    } else {
                        images[(outImagePtr + offset + u) | 0] = 0;
                    }
                }
            }
            return;
        }

        function memcpy(srcImagePtr, dstImagePtr) {
            srcImagePtr = srcImagePtr | 0;
            dstImagePtr = dstImagePtr | 0;

            var length = 0;

            length = imul(size, size) | 0;

            while ((length | 0) > 0) {
                length = (length - 1) | 0;
                images[(dstImagePtr + length) | 0] = (images[(srcImagePtr + length) | 0] | 0);
            }
        }

        function zeroBorder(imagePtr) {
            imagePtr = imagePtr | 0;

            var x = 0,
                y = 0;

            for ( x = 0; (x | 0) < ((size - 1) | 0); x = (x + 1) | 0) {
                images[(imagePtr + x) | 0] = 0;
                images[(imagePtr + y) | 0] = 0;
                y = ((y + size) - 1) | 0;
                images[(imagePtr + y) | 0] = 0;
                y = (y + 1) | 0;
            }
            for ( x = 0; (x | 0) < (size | 0); x = (x + 1) | 0) {
                images[(imagePtr + y) | 0] = 0;
                y = (y + 1) | 0;
            }
        }

        function skeletonize() {
            var subImagePtr = 0,
                erodedImagePtr = 0,
                tempImagePtr = 0,
                skelImagePtr = 0,
                sum = 0,
                done = 0;
                
            erodedImagePtr = imul(size, size) | 0;
            tempImagePtr = (erodedImagePtr + erodedImagePtr) | 0;
            skelImagePtr = (tempImagePtr + erodedImagePtr) | 0;

            // init skel-image
            init(skelImagePtr, 0);
            zeroBorder(subImagePtr);

            do {
                erode(subImagePtr, erodedImagePtr);
                dilate(erodedImagePtr, tempImagePtr);
                subtract(subImagePtr, tempImagePtr, tempImagePtr);
                bitwiseOr(skelImagePtr, tempImagePtr, skelImagePtr);
                memcpy(erodedImagePtr, subImagePtr);
                sum = countNonZero(subImagePtr) | 0;
                done = ((sum | 0) == 0 | 0);
            } while(!done);
        }

        return {
            skeletonize : skeletonize
        };
    }
    /* @preserve ASM END */

    return Skeletonizer;
});

/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

define('image_debug',[],function() {
    "use strict";
    
    return {
        drawRect: function(pos, size, ctx, style){
            ctx.strokeStyle = style.color;
            ctx.fillStyle = style.color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.strokeRect(pos.x, pos.y, size.x, size.y);
        },
        drawPath: function(path, def, ctx, style) {
            ctx.strokeStyle = style.color;
            ctx.fillStyle = style.color;
            ctx.lineWidth = style.lineWidth;
            ctx.beginPath();
            ctx.moveTo(path[0][def.x], path[0][def.y]);
            for (var j = 1; j < path.length; j++) {
                ctx.lineTo(path[j][def.x], path[j][def.y]);
            }
            ctx.closePath();
            ctx.stroke();
        },
        drawImage: function(imageData, size, ctx) {
            var canvasData = ctx.getImageData(0, 0, size.x, size.y),
                data = canvasData.data,
                imageDataPos = imageData.length,
                canvasDataPos = data.length,
                value;

            if (canvasDataPos/imageDataPos !== 4) {
                return false;
            }
            while(imageDataPos--){
                value = imageData[imageDataPos];
                data[--canvasDataPos] = 255;
                data[--canvasDataPos] = value;
                data[--canvasDataPos] = value;
                data[--canvasDataPos] = value;
            }
            ctx.putImageData(canvasData, 0, 0);
            return true;
        }
    };
    
});

/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

define("barcode_locator", ["image_wrapper", "cv_utils", "rasterizer", "tracer", "skeletonizer", "array_helper", "image_debug", "gl-matrix"],
function(ImageWrapper, CVUtils, Rasterizer, Tracer, skeletonizer, ArrayHelper, ImageDebug, glMatrix) {

    var _config,
        _currentImageWrapper,
        _skelImageWrapper,
        _subImageWrapper,
        _labelImageWrapper,
        _patchGrid,
        _patchLabelGrid,
        _imageToPatchGrid,
        _binaryImageWrapper,
        _patchSize,
        _canvasContainer = {
            ctx : {
                binary : null
            },
            dom : {
                binary : null
            }
        },
        _numPatches = {x: 0, y: 0},
        _inputImageWrapper,
        _skeletonizer,
        vec2 = glMatrix.vec2,
        mat2 = glMatrix.mat2,
        self = this;

    function initBuffers() {
        var skeletonImageData;
        
        if (_config.halfSample) {
            _currentImageWrapper = new ImageWrapper({
                x : _inputImageWrapper.size.x / 2 | 0,
                y : _inputImageWrapper.size.y / 2 | 0
            });
        } else {
            _currentImageWrapper = _inputImageWrapper;
        }

        _patchSize = CVUtils.calculatePatchSize(_config.patchSize, _currentImageWrapper.size);

        _numPatches.x = _currentImageWrapper.size.x / _patchSize.x | 0;
        _numPatches.y = _currentImageWrapper.size.y / _patchSize.y | 0;

        _binaryImageWrapper = new ImageWrapper(_currentImageWrapper.size, undefined, Uint8Array, false);

        _labelImageWrapper = new ImageWrapper(_patchSize, undefined, Array, true);

        skeletonImageData = new ArrayBuffer(64*1024);
        _subImageWrapper = new ImageWrapper(_patchSize, new Uint8Array(skeletonImageData, 0, _patchSize.x * _patchSize.y));
        _skelImageWrapper = new ImageWrapper(_patchSize, new Uint8Array(skeletonImageData, _patchSize.x * _patchSize.y * 3, _patchSize.x * _patchSize.y), undefined, true);
        _skeletonizer = skeletonizer(self, {
            size : _patchSize.x
        }, skeletonImageData);

        _imageToPatchGrid = new ImageWrapper({
            x : (_currentImageWrapper.size.x / _subImageWrapper.size.x) | 0,
            y : (_currentImageWrapper.size.y / _subImageWrapper.size.y) | 0
        }, undefined, Array, true);
        _patchGrid = new ImageWrapper(_imageToPatchGrid.size, undefined, undefined, true);
        _patchLabelGrid = new ImageWrapper(_imageToPatchGrid.size, undefined, Int32Array, true);
    }

    function initCanvas() {
        if (_config.useWorker || typeof document === 'undefined') {
            return;
        }
        _canvasContainer.dom.binary = document.createElement("canvas");
        _canvasContainer.dom.binary.className = "binaryBuffer";
        if (_config.showCanvas === true) {
            document.querySelector("#debug").appendChild(_canvasContainer.dom.binary);
        }
        _canvasContainer.ctx.binary = _canvasContainer.dom.binary.getContext("2d");
        _canvasContainer.dom.binary.width = _binaryImageWrapper.size.x;
        _canvasContainer.dom.binary.height = _binaryImageWrapper.size.y;
    }

    /**
     * Creates a bounding box which encloses all the given patches
     * @returns {Array} The minimal bounding box 
     */
    function boxFromPatches(patches) {
        var overAvg, i, j, patch, transMat, minx = _binaryImageWrapper.size.x, miny = _binaryImageWrapper.size.y, maxx = -_binaryImageWrapper.size.x, maxy = -_binaryImageWrapper.size.y, box, scale;

        // draw all patches which are to be taken into consideration
        overAvg = 0;
        for ( i = 0; i < patches.length; i++) {
            patch = patches[i];
            overAvg += patch.rad;
            if (_config.showPatches) {
                ImageDebug.drawRect(patch.pos, _subImageWrapper.size, _canvasContainer.ctx.binary, {color: "red"});
            }
        }

        overAvg /= patches.length;
        overAvg = (overAvg * 180 / Math.PI + 90) % 180 - 90;
        if (overAvg < 0) {
            overAvg += 180;
        }

        overAvg = (180 - overAvg) * Math.PI / 180;
        transMat = mat2.clone([Math.cos(overAvg), Math.sin(overAvg), -Math.sin(overAvg), Math.cos(overAvg)]);

        // iterate over patches and rotate by angle
        for ( i = 0; i < patches.length; i++) {
            patch = patches[i];
            for ( j = 0; j < 4; j++) {
                vec2.transformMat2(patch.box[j], patch.box[j], transMat);
            }

            if (_config.boxFromPatches.showTransformed) {
                ImageDebug.drawPath(patch.box, {x: 0, y: 1}, _canvasContainer.ctx.binary, {color: '#99ff00', lineWidth: 2});
            }
        }

        // find bounding box
        for ( i = 0; i < patches.length; i++) {
            patch = patches[i];
            for ( j = 0; j < 4; j++) {
                if (patch.box[j][0] < minx) {
                    minx = patch.box[j][0];
                }
                if (patch.box[j][0] > maxx) {
                    maxx = patch.box[j][0];
                }
                if (patch.box[j][1] < miny) {
                    miny = patch.box[j][1];
                }
                if (patch.box[j][1] > maxy) {
                    maxy = patch.box[j][1];
                }
            }
        }

        box = [[minx, miny], [maxx, miny], [maxx, maxy], [minx, maxy]];

        if (_config.boxFromPatches.showTransformedBox) {
            ImageDebug.drawPath(box, {x: 0, y: 1}, _canvasContainer.ctx.binary, {color: '#ff0000', lineWidth: 2});
        }

        scale = _config.halfSample ? 2 : 1;
        // reverse rotation;
        transMat = mat2.invert(transMat, transMat);
        for ( j = 0; j < 4; j++) {
            vec2.transformMat2(box[j], box[j], transMat);
        }

        if (_config.boxFromPatches.showBB) {
            ImageDebug.drawPath(box, {x: 0, y: 1}, _canvasContainer.ctx.binary, {color: '#ff0000', lineWidth: 2});
        }
        
        for ( j = 0; j < 4; j++) {
            vec2.scale(box[j], box[j], scale);
        }

        return box;
    }

    /**
     * Creates a binary image of the current image
     */
    function binarizeImage() {
        CVUtils.otsuThreshold(_currentImageWrapper, _binaryImageWrapper);
        _binaryImageWrapper.zeroBorder();
        if (_config.showCanvas) {
            _binaryImageWrapper.show(_canvasContainer.dom.binary, 255);
        }
    }
    
    /**
     * Iterate over the entire image
     * extract patches
     */
    function findPatches() {
        var i,
            j,
            x,
            y,
            moments,
            patchesFound = [],
            rasterizer,
            rasterResult,
            patch;
        for ( i = 0; i < _numPatches.x; i++) {
            for ( j = 0; j < _numPatches.y; j++) {

                x = _subImageWrapper.size.x * i;
                y = _subImageWrapper.size.y * j;

                // seperate parts
                skeletonize(x, y);

                // Rasterize, find individual bars
                _skelImageWrapper.zeroBorder();
                ArrayHelper.init(_labelImageWrapper.data, 0);
                rasterizer = Rasterizer.create(_skelImageWrapper, _labelImageWrapper);
                rasterResult = rasterizer.rasterize(0);

                if (_config.showLabels) {
                    _labelImageWrapper.overlay(_canvasContainer.dom.binary, Math.floor(360 / rasterResult.count), {x : x, y : y});
                }

                // calculate moments from the skeletonized patch
                moments = _labelImageWrapper.moments(rasterResult.count);

                // extract eligible patches
                patchesFound = patchesFound.concat(describePatch(moments, [i, j], x, y));
            }
        }
        
        if (_config.showFoundPatches) {
            for ( i = 0; i < patchesFound.length; i++) {
                patch = patchesFound[i];
                ImageDebug.drawRect(patch.pos, _subImageWrapper.size, _canvasContainer.ctx.binary, {color: "#99ff00", lineWidth: 2});
            }
        }
        
        return patchesFound;
    }
    
    /**
     * Finds those connected areas which contain at least 6 patches
     * and returns them ordered DESC by the number of contained patches
     * @param {Number} maxLabel 
     */
    function findBiggestConnectedAreas(maxLabel){
        var i,
            sum,
            labelHist = [],
            topLabels = [];
            
        for ( i = 0; i < maxLabel; i++) {
            labelHist.push(0);
        }
        sum = _patchLabelGrid.data.length;
        while (sum--) {
            if (_patchLabelGrid.data[sum] > 0) {
                labelHist[_patchLabelGrid.data[sum] - 1]++;
            }
        }

        labelHist = labelHist.map(function(val, idx) {
            return {
                val : val,
                label : idx + 1
            };
        });

        labelHist.sort(function(a, b) {
            return b.val - a.val;
        });

        // extract top areas with at least 6 patches present
        topLabels = labelHist.filter(function(el) {
            return el.val >= 5;
        });
        
        return topLabels;
    }
    
    /**
     * 
     */
    function findBoxes(topLabels, maxLabel) {
        var i,
            j,
            sum,
            patches = [],
            patch,
            box,
            boxes = [],
            hsv = [0, 1, 1],
            rgb = [0, 0, 0];
            
        for ( i = 0; i < topLabels.length; i++) {
            sum = _patchLabelGrid.data.length;
            patches.length = 0;
            while (sum--) {
                if (_patchLabelGrid.data[sum] === topLabels[i].label) {
                    patch = _imageToPatchGrid.data[sum];
                    patches.push(patch);
                }
            }
            box = boxFromPatches(patches);
            if (box) {
                boxes.push(box);

                // draw patch-labels if requested
                if (_config.showRemainingPatchLabels) {
                    for ( j = 0; j < patches.length; j++) {
                        patch = patches[j];
                        hsv[0] = (topLabels[i].label / (maxLabel + 1)) * 360;
                        CVUtils.hsv2rgb(hsv, rgb);
                        ImageDebug.drawRect(patch.pos, _subImageWrapper.size, _canvasContainer.ctx.binary, {color: "rgb(" + rgb.join(",") + ")", lineWidth: 2});
                    }
                }
            }
        }
        return boxes;
    }

    /**
     * Find similar moments (via cluster)
     * @param {Object} moments
     */
    function similarMoments(moments) {
        var clusters = CVUtils.cluster(moments, 0.90);
        var topCluster = CVUtils.topGeneric(clusters, 1, function(e) {
            return e.getPoints().length;
        });
        var points = [], result = [];
        if (topCluster.length === 1) {
            points = topCluster[0].item.getPoints();
            for (var i = 0; i < points.length; i++) {
                result.push(points[i].point);
            }
        }
        return result;
    }

    function skeletonize(x, y) {
        _binaryImageWrapper.subImageAsCopy(_subImageWrapper, CVUtils.imageRef(x, y));
        _skeletonizer.skeletonize();
        
        // Show skeleton if requested
        if (_config.showSkeleton) {
            _skelImageWrapper.overlay(_canvasContainer.dom.binary, 360, CVUtils.imageRef(x, y));
        }
    }

    /**
     * Extracts and describes those patches which seem to contain a barcode pattern
     * @param {Array} moments
     * @param {Object} patchPos,
     * @param {Number} x
     * @param {Number} y
     * @returns {Array} list of patches
     */
    function describePatch(moments, patchPos, x, y) {
        var k,
            avg,
            sum = 0,
            eligibleMoments = [],
            matchingMoments,
            patch,
            patchesFound = [],
            minComponentWeight = Math.ceil(_patchSize.x/3);

        if (moments.length >= 2) {
            // only collect moments which's area covers at least minComponentWeight pixels.
            for ( k = 0; k < moments.length; k++) {
                if (moments[k].m00 > minComponentWeight) {
                    eligibleMoments.push(moments[k]);
                }
            }

            // if at least 2 moments are found which have at least minComponentWeights covered
            if (eligibleMoments.length >= 2) {
                sum = eligibleMoments.length;
                matchingMoments = similarMoments(eligibleMoments);
                avg = 0;
                // determine the similarity of the moments
                for ( k = 0; k < matchingMoments.length; k++) {
                    avg += matchingMoments[k].rad;
                }

                // Only two of the moments are allowed not to fit into the equation
                // add the patch to the set
                if (matchingMoments.length > 1 && matchingMoments.length >= (eligibleMoments.length / 4) * 3 && matchingMoments.length > moments.length / 4) {
                    avg /= matchingMoments.length;
                    patch = {
                        index : patchPos[1] * _numPatches.x + patchPos[0],
                        pos : {
                            x : x,
                            y : y
                        },
                        box : [vec2.clone([x, y]), vec2.clone([x + _subImageWrapper.size.x, y]), vec2.clone([x + _subImageWrapper.size.x, y + _subImageWrapper.size.y]), vec2.clone([x, y + _subImageWrapper.size.y])],
                        moments : matchingMoments,
                        rad : avg,
                        vec : vec2.clone([Math.cos(avg), Math.sin(avg)])
                    };
                    patchesFound.push(patch);
                }
            }
        }
        return patchesFound;
    }

    /**
     * finds patches which are connected and share the same orientation
     * @param {Object} patchesFound
     */
    function rasterizeAngularSimilarity(patchesFound) {
        var label = 0,
            threshold = 0.95,
            currIdx = 0,
            j,
            patch,
            hsv = [0, 1, 1],
            rgb = [0, 0, 0];

        function notYetProcessed() {
            var i;
            for ( i = 0; i < _patchLabelGrid.data.length; i++) {
                if (_patchLabelGrid.data[i] === 0 && _patchGrid.data[i] === 1) {
                    return i;
                }
            }
            return _patchLabelGrid.length;
        }

        function trace(currentIdx) {
            var x, y, currentPatch, patch, idx, dir, current = {
                x : currentIdx % _patchLabelGrid.size.x,
                y : (currentIdx / _patchLabelGrid.size.x) | 0
            }, similarity;

            if (currentIdx < _patchLabelGrid.data.length) {
                currentPatch = _imageToPatchGrid.data[currentIdx];
                // assign label
                _patchLabelGrid.data[currentIdx] = label;
                for ( dir = 0; dir < Tracer.searchDirections.length; dir++) {
                    y = current.y + Tracer.searchDirections[dir][0];
                    x = current.x + Tracer.searchDirections[dir][1];
                    idx = y * _patchLabelGrid.size.x + x;

                    // continue if patch empty
                    if (_patchGrid.data[idx] === 0) {
                        _patchLabelGrid.data[idx] = Number.MAX_VALUE;
                        continue;
                    }

                    patch = _imageToPatchGrid.data[idx];
                    if (_patchLabelGrid.data[idx] === 0) {
                        similarity = Math.abs(vec2.dot(patch.vec, currentPatch.vec));
                        if (similarity > threshold) {
                            trace(idx);
                        }
                    }
                }
            }
        }
        
        // prepare for finding the right patches
        ArrayHelper.init(_patchGrid.data, 0);
        ArrayHelper.init(_patchLabelGrid.data, 0);
        ArrayHelper.init(_imageToPatchGrid.data, null);

        for ( j = 0; j < patchesFound.length; j++) {
            patch = patchesFound[j];
            _imageToPatchGrid.data[patch.index] = patch;
            _patchGrid.data[patch.index] = 1;
        }

        // rasterize the patches found to determine area
        _patchGrid.zeroBorder();

        while (( currIdx = notYetProcessed()) < _patchLabelGrid.data.length) {
            label++;
            trace(currIdx);
        }
        
        // draw patch-labels if requested
        if (_config.showPatchLabels) {
            for ( j = 0; j < _patchLabelGrid.data.length; j++) {
                if (_patchLabelGrid.data[j] > 0 && _patchLabelGrid.data[j] <= label) {
                    patch = _imageToPatchGrid.data[j];
                    hsv[0] = (_patchLabelGrid.data[j] / (label + 1)) * 360;
                    CVUtils.hsv2rgb(hsv, rgb);
                    ImageDebug.drawRect(patch.pos, _subImageWrapper.size, _canvasContainer.ctx.binary, {color: "rgb(" + rgb.join(",") + ")", lineWidth: 2});
                }
            }
        }
        
        return label;
    }

    return {
        init : function(inputImageWrapper, config) {
            _config = config;
            _inputImageWrapper = inputImageWrapper;

            initBuffers();
            initCanvas();
        },

        locate : function() {
            var patchesFound,
            topLabels,
            boxes;

            if (_config.halfSample) {
                CVUtils.halfSample(_inputImageWrapper, _currentImageWrapper);
            }

            binarizeImage();
            patchesFound = findPatches();
            // return unless 5% or more patches are found
            if (patchesFound.length < _numPatches.x * _numPatches.y * 0.05) {
                return null;
            }

            // rasterrize area by comparing angular similarity;
            var maxLabel = rasterizeAngularSimilarity(patchesFound);
            if (maxLabel < 1) {
                return null;
            }

            // search for area with the most patches (biggest connected area)
            topLabels = findBiggestConnectedAreas(maxLabel);
            if (topLabels.length === 0) {
                return null;
            }

            boxes = findBoxes(topLabels, maxLabel);
            return boxes;
        },

        checkImageConstraints: function(inputStream, config) {
            var patchSize,
                width = inputStream.getWidth(),
                height = inputStream.getHeight(),
                halfSample = config.halfSample ? 0.5 : 1,
                size,
                area;

            // calculate width and height based on area
            if (inputStream.getConfig().area) {
                area = CVUtils.computeImageArea(width, height, inputStream.getConfig().area);
                inputStream.setTopRight({x: area.sx, y: area.sy});
                inputStream.setCanvasSize({x: width, y: height});
                width = area.sw;
                height = area.sh;
            }

            size = {
                x: Math.floor(width * halfSample),
                y: Math.floor(height * halfSample)
            };

            patchSize = CVUtils.calculatePatchSize(config.patchSize, size);
            console.log("Patch-Size: " + JSON.stringify(patchSize));

            inputStream.setWidth(Math.floor(Math.floor(size.x/patchSize.x)*(1/halfSample)*patchSize.x));
            inputStream.setHeight(Math.floor(Math.floor(size.y/patchSize.y)*(1/halfSample)*patchSize.y));

            if ((inputStream.getWidth() % patchSize.x) === 0 && (inputStream.getHeight() % patchSize.y) === 0) {
                return true;
            }

            throw new Error("Image dimensions do not comply with the current settings: Width (" +
                width + " )and height (" + height +
                ") must a multiple of " + patchSize.x);
        }
    };
});


/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

define('bresenham',["cv_utils", "image_wrapper"], function(CVUtils, ImageWrapper) {
    "use strict";
    var Bresenham = {};

    var Slope = {
        DIR : {
            UP : 1,
            DOWN : -1
        }
    };
    /**
     * Scans a line of the given image from point p1 to p2 and returns a result object containing 
     * gray-scale values (0-255) of the underlying pixels in addition to the min
     * and max values.
     * @param {Object} imageWrapper
     * @param {Object} p1 The start point {x,y}
     * @param {Object} p2 The end point {x,y}
     * @returns {line, min, max}
     */
    Bresenham.getBarcodeLine = function(imageWrapper, p1, p2) {
        var x0 = p1.x | 0,
            y0 = p1.y | 0,
            x1 = p2.x | 0,
            y1 = p2.y | 0,
            steep = Math.abs(y1 - y0) > Math.abs(x1 - x0),
            deltax,
            deltay,
            error,
            ystep,
            y,
            tmp,
            x,
            line = [],
            imageData = imageWrapper.data,
            width = imageWrapper.size.x,
            sum = 0,
            val,
            min = 255,
            max = 0;

        function read(a, b) {
            val = imageData[b * width + a];
            sum += val;
            min = val < min ? val : min;
            max = val > max ? val : max;
            line.push(val);
        }

        if (steep) {
            tmp = x0;
            x0 = y0;
            y0 = tmp;

            tmp = x1;
            x1 = y1;
            y1 = tmp;
        }
        if (x0 > x1) {
            tmp = x0;
            x0 = x1;
            x1 = tmp;

            tmp = y0;
            y0 = y1;
            y1 = tmp;
        }
        deltax = x1 - x0;
        deltay = Math.abs(y1 - y0);
        error = (deltax / 2) | 0;
        y = y0;
        ystep = y0 < y1 ? 1 : -1;
        for ( x = x0; x < x1; x++) {
            if(steep){
                read(y, x);
            } else {
                read(x, y);
            }
            error = error - deltay;
            if (error < 0) {
                y = y + ystep;
                error = error + deltax;
            }
        }

        return {
            line : line,
            min : min,
            max : max
        };
    };

    Bresenham.toOtsuBinaryLine = function(result) {
        var line = result.line,
            image = new ImageWrapper({x: line.length - 1, y: 1}, line),
            threshold = CVUtils.determineOtsuThreshold(image, 5);

        line = CVUtils.sharpenLine(line);
        CVUtils.thresholdImage(image, threshold);

        return {
            line: line,
            threshold: threshold
        };
    };
    
    /**
     * Converts the result from getBarcodeLine into a binary representation 
     * also considering the frequency and slope of the signal for more robust results
     * @param {Object} result {line, min, max}
     */
    Bresenham.toBinaryLine = function(result) {

        var min = result.min,
            max = result.max,
            line = result.line,
            slope,
            slope2,
            center = min + (max - min) / 2,
            extrema = [],
            currentDir,
            dir,
            threshold = (max - min) / 12,
            rThreshold = -threshold,
            i,
            j;

        // 1. find extrema
        currentDir = line[0] > center ? Slope.DIR.UP : Slope.DIR.DOWN;
        extrema.push({
            pos : 0,
            val : line[0]
        });
        for ( i = 0; i < line.length - 2; i++) {
            slope = (line[i + 1] - line[i]);
            slope2 = (line[i + 2] - line[i + 1]);
            if ((slope + slope2) < rThreshold && line[i + 1] < (center*1.5)) {
                dir = Slope.DIR.DOWN;
            } else if ((slope + slope2) > threshold && line[i + 1] > (center*0.5)) {
                dir = Slope.DIR.UP;
            } else {
                dir = currentDir;
            }

            if (currentDir !== dir) {
                extrema.push({
                    pos : i,
                    val : line[i]
                });
                currentDir = dir;
            }
        }
        extrema.push({
            pos : line.length,
            val : line[line.length - 1]
        });

        for ( j = extrema[0].pos; j < extrema[1].pos; j++) {
            line[j] = line[j] > center ? 0 : 1;
        }

        // iterate over extrema and convert to binary based on avg between minmax
        for ( i = 1; i < extrema.length - 1; i++) {
            if (extrema[i + 1].val > extrema[i].val) {
                threshold = (extrema[i].val + ((extrema[i + 1].val - extrema[i].val) / 3) * 2) | 0;
            } else {
                threshold = (extrema[i + 1].val + ((extrema[i].val - extrema[i + 1].val) / 3)) | 0;
            }

            for ( j = extrema[i].pos; j < extrema[i + 1].pos; j++) {
                line[j] = line[j] > threshold ? 0 : 1;
            }
        }

        return {
            line : line,
            threshold : threshold
        };
    };
    
    /**
     * Used for development only 
     */
    Bresenham.debug = {
        printFrequency: function(line, canvas) {
            var i,
                ctx = canvas.getContext("2d");
            canvas.width = line.length;
            canvas.height = 256;
    
            ctx.beginPath();
            ctx.strokeStyle = "blue";
            for ( i = 0; i < line.length; i++) {
                ctx.moveTo(i, 255);
                ctx.lineTo(i, 255 - line[i]);
            }
            ctx.stroke();
            ctx.closePath();
        },
        
        printPattern: function(line, canvas) {
            var ctx = canvas.getContext("2d"), i;
    
            canvas.width = line.length;
            ctx.fillColor = "black";
            for ( i = 0; i < line.length; i++) {
                if (line[i] === 1) {
                    ctx.fillRect(i, 0, 1, 100);
                }
            }
        }
    };

    return (Bresenham);
}); 
/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

define(
    'barcode_reader',[],function() {
        "use strict";
        
        function BarcodeReader(config) {
            this._row = [];
            this.config = config || {};
            return this;
        }
        
        BarcodeReader.prototype._nextUnset = function(line, start) {
            var i;
            
            if (start === undefined) {
                start = 0;
            }
            for (i = start; i < line.length; i++) {
                if (!line[i]) {
                    return i;
                }
            }
            return line.length;
        };
        
        BarcodeReader.prototype._matchPattern = function(counter, code) {
            var i,
                error = 0,
                singleError = 0,
                modulo = this.MODULO,
                maxSingleError = this.SINGLE_CODE_ERROR || 1;
                
            for (i = 0; i < counter.length; i++) {
                singleError = Math.abs(code[i] - counter[i]);
                if (singleError > maxSingleError) {
                    return Number.MAX_VALUE;
                }
                error += singleError;
            }
            return error/modulo;
        };

        BarcodeReader.prototype._nextSet = function(line, offset) {
            var i;

            offset = offset || 0;
            for (i = offset; i < line.length; i++) {
                if (line[i]) {
                    return i;
                }
            }
            return line.length;
        };

        BarcodeReader.prototype._normalize = function(counter, modulo) {
            var i,
                self = this,
                sum = 0,
                ratio,
                numOnes = 0,
                normalized = [],
                norm = 0;
                
            if (!modulo) {
                modulo = self.MODULO;
            }
            for (i = 0; i < counter.length; i++) {
                if (counter[i] === 1) {
                    numOnes++;
                } else {
                    sum += counter[i];
                }
            }
            ratio = sum / (modulo - numOnes);
            if (ratio > 1.0) {
                for (i = 0; i < counter.length; i++) {
                    norm = counter[i] === 1 ? counter[i] : counter[i] / ratio;
                    normalized.push(norm);
                }
            } else {
                ratio = (sum + numOnes)/modulo;
                for (i = 0; i < counter.length; i++) {
                    norm = counter[i] / ratio;
                    normalized.push(norm);
                }
            }
            return normalized;
        };

        BarcodeReader.prototype._matchTrace = function(cmpCounter, epsilon) {
            var counter = [],
                i,
                self = this,
                offset = self._nextSet(self._row),
                isWhite = !self._row[offset],
                counterPos = 0,
                bestMatch = {
                    error : Number.MAX_VALUE,
                    code : -1,
                    start : 0
                },
                error;

            if (cmpCounter) {
                for ( i = 0; i < cmpCounter.length; i++) {
                    counter.push(0);
                }
                for ( i = offset; i < self._row.length; i++) {
                    if (self._row[i] ^ isWhite) {
                        counter[counterPos]++;
                    } else {
                        if (counterPos === counter.length - 1) {
                            error = self._matchPattern(counter, cmpCounter);

                            if (error < epsilon) {
                                bestMatch.start = i - offset;
                                bestMatch.end = i;
                                bestMatch.counter = counter;
                                return bestMatch;
                            } else {
                                return null;
                            }
                        } else {
                            counterPos++;
                        }
                        counter[counterPos] = 1;
                        isWhite = !isWhite;
                    }
                }
            } else {
                counter.push(0);
                for ( i = offset; i < self._row.length; i++) {
                    if (self._row[i] ^ isWhite) {
                        counter[counterPos]++;
                    } else {
                        counterPos++;
                        counter.push(0);
                        counter[counterPos] = 1;
                        isWhite = !isWhite;
                    }
                }
            }

            // if cmpCounter was not given
            bestMatch.start = offset;
            bestMatch.end = self._row.length - 1;
            bestMatch.counter = counter;
            return bestMatch;
        };
        
        BarcodeReader.prototype.decodePattern = function(pattern) {
            var self = this,
                result;
            
            self._row = pattern;
            result = self._decode();
            if (result === null) {
                self._row.reverse();
                result = self._decode();
                if (result) {
                    result.direction = BarcodeReader.DIRECTION.REVERSE;
                    result.start = self._row.length - result.start;
                    result.end = self._row.length - result.end;
                }
            } else {
                result.direction = BarcodeReader.DIRECTION.FORWARD;
            }
            if (result) {
                result.format = self.FORMAT;
            }
            return result;
        };

        BarcodeReader.prototype._matchRange = function(start, end, value) {
            var i;

            start = start < 0 ? 0 : start;
            for (i = start; i < end; i++) {
                if (this._row[i] !== value) {
                    return false;
                }
            }
            return true;
        };

        BarcodeReader.prototype._fillCounters = function(offset, end, isWhite) {
            var self = this,
                counterPos = 0,
                i,
                counters = [];

            isWhite = (typeof isWhite !== 'undefined') ? isWhite : true;
            offset = (typeof offset !== 'undefined') ? offset : self._nextUnset(self._row);
            end = end || self._row.length;

            counters[counterPos] = 0;
            for (i = offset; i < end; i++) {
                if (self._row[i] ^ isWhite) {
                    counters[counterPos]++;
                } else {
                    counterPos++;
                    counters[counterPos] = 1;
                    isWhite = !isWhite;
                }
            }
            return counters;
        };

        Object.defineProperty(BarcodeReader.prototype, "FORMAT", {
            value: 'unknown',
            writeable: false
        });
        
        BarcodeReader.DIRECTION = {
            FORWARD : 1,
            REVERSE : -1
        };
        
        BarcodeReader.Exception = {
            StartNotFoundException : "Start-Info was not found!",
            CodeNotFoundException : "Code could not be found!",
            PatternNotFoundException : "Pattern could not be found!"
        };

        BarcodeReader.CONFIG_KEYS = {};
        
        return (BarcodeReader);
    }
);

/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

define(
     'code_128_reader',[
        "./barcode_reader"
    ],
    function(BarcodeReader) {
        "use strict";
        
        function Code128Reader() {
            BarcodeReader.call(this);
        }
        
        var properties = {
            CODE_SHIFT : {value: 98},
            CODE_C : {value: 99},
            CODE_B : {value: 100},
            CODE_A : {value: 101},
            START_CODE_A : {value: 103},
            START_CODE_B : {value: 104},
            START_CODE_C : {value: 105},
            STOP_CODE : {value: 106},
            MODULO : {value: 11},
            CODE_PATTERN : {value: [
                [2, 1, 2, 2, 2, 2],
                [2, 2, 2, 1, 2, 2],
                [2, 2, 2, 2, 2, 1],
                [1, 2, 1, 2, 2, 3],
                [1, 2, 1, 3, 2, 2],
                [1, 3, 1, 2, 2, 2],
                [1, 2, 2, 2, 1, 3],
                [1, 2, 2, 3, 1, 2],
                [1, 3, 2, 2, 1, 2],
                [2, 2, 1, 2, 1, 3],
                [2, 2, 1, 3, 1, 2],
                [2, 3, 1, 2, 1, 2],
                [1, 1, 2, 2, 3, 2],
                [1, 2, 2, 1, 3, 2],
                [1, 2, 2, 2, 3, 1],
                [1, 1, 3, 2, 2, 2],
                [1, 2, 3, 1, 2, 2],
                [1, 2, 3, 2, 2, 1],
                [2, 2, 3, 2, 1, 1],
                [2, 2, 1, 1, 3, 2],
                [2, 2, 1, 2, 3, 1],
                [2, 1, 3, 2, 1, 2],
                [2, 2, 3, 1, 1, 2],
                [3, 1, 2, 1, 3, 1],
                [3, 1, 1, 2, 2, 2],
                [3, 2, 1, 1, 2, 2],
                [3, 2, 1, 2, 2, 1],
                [3, 1, 2, 2, 1, 2],
                [3, 2, 2, 1, 1, 2],
                [3, 2, 2, 2, 1, 1],
                [2, 1, 2, 1, 2, 3],
                [2, 1, 2, 3, 2, 1],
                [2, 3, 2, 1, 2, 1],
                [1, 1, 1, 3, 2, 3],
                [1, 3, 1, 1, 2, 3],
                [1, 3, 1, 3, 2, 1],
                [1, 1, 2, 3, 1, 3],
                [1, 3, 2, 1, 1, 3],
                [1, 3, 2, 3, 1, 1],
                [2, 1, 1, 3, 1, 3],
                [2, 3, 1, 1, 1, 3],
                [2, 3, 1, 3, 1, 1],
                [1, 1, 2, 1, 3, 3],
                [1, 1, 2, 3, 3, 1],
                [1, 3, 2, 1, 3, 1],
                [1, 1, 3, 1, 2, 3],
                [1, 1, 3, 3, 2, 1],
                [1, 3, 3, 1, 2, 1],
                [3, 1, 3, 1, 2, 1],
                [2, 1, 1, 3, 3, 1],
                [2, 3, 1, 1, 3, 1],
                [2, 1, 3, 1, 1, 3],
                [2, 1, 3, 3, 1, 1],
                [2, 1, 3, 1, 3, 1],
                [3, 1, 1, 1, 2, 3],
                [3, 1, 1, 3, 2, 1],
                [3, 3, 1, 1, 2, 1],
                [3, 1, 2, 1, 1, 3],
                [3, 1, 2, 3, 1, 1],
                [3, 3, 2, 1, 1, 1],
                [3, 1, 4, 1, 1, 1],
                [2, 2, 1, 4, 1, 1],
                [4, 3, 1, 1, 1, 1],
                [1, 1, 1, 2, 2, 4],
                [1, 1, 1, 4, 2, 2],
                [1, 2, 1, 1, 2, 4],
                [1, 2, 1, 4, 2, 1],
                [1, 4, 1, 1, 2, 2],
                [1, 4, 1, 2, 2, 1],
                [1, 1, 2, 2, 1, 4],
                [1, 1, 2, 4, 1, 2],
                [1, 2, 2, 1, 1, 4],
                [1, 2, 2, 4, 1, 1],
                [1, 4, 2, 1, 1, 2],
                [1, 4, 2, 2, 1, 1],
                [2, 4, 1, 2, 1, 1],
                [2, 2, 1, 1, 1, 4],
                [4, 1, 3, 1, 1, 1],
                [2, 4, 1, 1, 1, 2],
                [1, 3, 4, 1, 1, 1],
                [1, 1, 1, 2, 4, 2],
                [1, 2, 1, 1, 4, 2],
                [1, 2, 1, 2, 4, 1],
                [1, 1, 4, 2, 1, 2],
                [1, 2, 4, 1, 1, 2],
                [1, 2, 4, 2, 1, 1],
                [4, 1, 1, 2, 1, 2],
                [4, 2, 1, 1, 1, 2],
                [4, 2, 1, 2, 1, 1],
                [2, 1, 2, 1, 4, 1],
                [2, 1, 4, 1, 2, 1],
                [4, 1, 2, 1, 2, 1],
                [1, 1, 1, 1, 4, 3],
                [1, 1, 1, 3, 4, 1],
                [1, 3, 1, 1, 4, 1],
                [1, 1, 4, 1, 1, 3],
                [1, 1, 4, 3, 1, 1],
                [4, 1, 1, 1, 1, 3],
                [4, 1, 1, 3, 1, 1],
                [1, 1, 3, 1, 4, 1],
                [1, 1, 4, 1, 3, 1],
                [3, 1, 1, 1, 4, 1],
                [4, 1, 1, 1, 3, 1],
                [2, 1, 1, 4, 1, 2],
                [2, 1, 1, 2, 1, 4],
                [2, 1, 1, 2, 3, 2],
                [2, 3, 3, 1, 1, 1, 2]
            ]},
            SINGLE_CODE_ERROR: {value: 1},
            AVG_CODE_ERROR: {value: 0.5},
            FORMAT: {value: "code_128", writeable: false}
        };
        
        Code128Reader.prototype = Object.create(BarcodeReader.prototype, properties);
        Code128Reader.prototype.constructor = Code128Reader;
        
        Code128Reader.prototype._decodeCode = function(start) {
            var counter = [0, 0, 0, 0, 0, 0],
                i,
                self = this,
                offset = start,
                isWhite = !self._row[offset],
                counterPos = 0,
                bestMatch = {
                    error : Number.MAX_VALUE,
                    code : -1,
                    start : start,
                    end : start
                },
                code,
                error,
                normalized;

            for ( i = offset; i < self._row.length; i++) {
                if (self._row[i] ^ isWhite) {
                    counter[counterPos]++;
                } else {
                    if (counterPos === counter.length - 1) {
                        normalized = self._normalize(counter);
                        if (normalized) {
                            for (code = 0; code < self.CODE_PATTERN.length; code++) {
                                error = self._matchPattern(normalized, self.CODE_PATTERN[code]);
                                if (error < bestMatch.error) {
                                    bestMatch.code = code;
                                    bestMatch.error = error;
                                }
                            }
                            bestMatch.end = i;
                            return bestMatch;
                        }
                    } else {
                        counterPos++;
                    }
                    counter[counterPos] = 1;
                    isWhite = !isWhite;
                }
            }
            return null;
        };

        Code128Reader.prototype._findStart = function() {
            var counter = [0, 0, 0, 0, 0, 0],
                i,
                self = this,
                offset = self._nextSet(self._row),
                isWhite = false,
                counterPos = 0,
                bestMatch = {
                    error : Number.MAX_VALUE,
                    code : -1,
                    start : 0,
                    end : 0
                },
                code,
                error,
                j,
                sum,
                normalized;
                
            for ( i = offset; i < self._row.length; i++) {
                if (self._row[i] ^ isWhite) {
                    counter[counterPos]++;
                } else {
                    if (counterPos === counter.length - 1) {
                        sum = 0;
                        for ( j = 0; j < counter.length; j++) {
                            sum += counter[j];
                        }
                        normalized = self._normalize(counter);
                        if (normalized) {
                            for (code = self.START_CODE_A; code <= self.START_CODE_C; code++) {
                                error = self._matchPattern(normalized, self.CODE_PATTERN[code]);
                                if (error < bestMatch.error) {
                                    bestMatch.code = code;
                                    bestMatch.error = error;
                                }
                            }
                            if (bestMatch.error < self.AVG_CODE_ERROR) {
                                bestMatch.start = i - sum;
                                bestMatch.end = i;
                                return bestMatch;
                            }
                        }

                        for ( j = 0; j < 4; j++) {
                            counter[j] = counter[j + 2];
                        }
                        counter[4] = 0;
                        counter[5] = 0;
                        counterPos--;
                    } else {
                        counterPos++;
                    }
                    counter[counterPos] = 1;
                    isWhite = !isWhite;
                }
            }
            return null;
        };

        Code128Reader.prototype._decode = function() {
            var self = this,
                startInfo = self._findStart(),
                code = null,
                done = false,
                result = [],
                multiplier = 0,
                checksum = 0,
                codeset,
                rawResult = [],
                decodedCodes = [],
                shiftNext = false,
                unshift,
                lastCharacterWasPrintable;

            if (startInfo === null) {
                return null;
            }
            code = {
                code : startInfo.code,
                start : startInfo.start,
                end : startInfo.end
            };
            decodedCodes.push(code);
            checksum = code.code;
            switch(code.code) {
            case self.START_CODE_A:
                codeset = self.CODE_A;
                break;
            case self.START_CODE_B:
                codeset = self.CODE_B;
                break;
            case self.START_CODE_C:
                codeset = self.CODE_C;
                break;
            default:
                return null;
            }

            while (!done) {
                unshift = shiftNext;
                shiftNext = false;
                code = self._decodeCode(code.end);
                if (code !== null) {
                    if (code.code !== self.STOP_CODE) {
                        rawResult.push(code.code);
                        multiplier++;
                        checksum += multiplier * code.code;
                    }
                    decodedCodes.push(code);

                    switch(codeset) {
                    case self.CODE_A:
                        if (code.code < 64) {
                            result.push(String.fromCharCode(32 + code.code));
                        } else if (code.code < 96) {
                            result.push(String.fromCharCode(code.code - 64));
                        } else {
                            switch (code.code) {
                            case self.CODE_SHIFT:
                                shiftNext = true;
                                codeset = self.CODE_B;
                                break;
                            case self.CODE_B:
                                codeset = self.CODE_B;
                                break;
                            case self.CODE_C:
                                codeset = self.CODE_C;
                                break;
                            case self.STOP_CODE:
                                done = true;
                                break;
                            }
                        }
                        break;
                    case self.CODE_B:
                        if (code.code < 96) {
                            result.push(String.fromCharCode(32 + code.code));
                        } else {
                            if (code.code != self.STOP_CODE) {
                                lastCharacterWasPrintable = false;
                            }
                            switch (code.code) {
                            case self.CODE_SHIFT:
                                shiftNext = true;
                                codeset = self.CODE_A;
                                break;
                            case self.CODE_A:
                                codeset = self.CODE_A;
                                break;
                            case self.CODE_C:
                                codeset = self.CODE_C;
                                break;
                            case self.STOP_CODE:
                                done = true;
                                break;
                            }
                        }
                        break;
                    case self.CODE_C:
                        if (code.code < 100) {
                            result.push(code.code < 10 ? "0" + code.code : code.code);
                        }
                        switch (code.code) {
                        case self.CODE_A:
                            codeset = self.CODE_A;
                            break;
                        case self.CODE_B:
                            codeset = self.CODE_B;
                            break;
                        case self.STOP_CODE:
                            done = true;
                            break;
                        }
                        break;
                    }
                } else {
                    done = true;
                }
                if (unshift) {
                    codeset = codeset == self.CODE_A ? self.CODE_B : self.CODE_A;
                }
            }

            if (code === null) {
                return null;
            }

            // find end bar
            code.end = self._nextUnset(self._row, code.end);
            if(!self._verifyTrailingWhitespace(code)){
                return null;
            }

            // checksum
            // Does not work correctly yet!!! startcode - endcode?
            checksum -= multiplier * rawResult[rawResult.length - 1];
            if (checksum % 103 != rawResult[rawResult.length - 1]) {
                return null;
            }

            if (!result.length) {
                return null;
            }

            // remove last code from result (checksum)
            result.splice(result.length - 1, 1);



            return {
                code : result.join(""),
                start : startInfo.start,
                end : code.end,
                codeset : codeset,
                startInfo : startInfo,
                decodedCodes : decodedCodes,
                endInfo : code
            };
        };


        BarcodeReader.prototype._verifyTrailingWhitespace = function(endInfo) {
            var self = this,
                trailingWhitespaceEnd;

            trailingWhitespaceEnd = endInfo.end + ((endInfo.end - endInfo.start) / 2);
            if (trailingWhitespaceEnd < self._row.length) {
                if (self._matchRange(endInfo.end, trailingWhitespaceEnd, 0)) {
                    return endInfo;
                }
            }
            return null;
        };
        
        return (Code128Reader);
    }
);
/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

define(
     'ean_reader',[
        "./barcode_reader"
    ],
    function(BarcodeReader) {
        "use strict";
        
        function EANReader(opts) {
            BarcodeReader.call(this, opts);
        }
        
        var properties = {
            CODE_L_START : {value: 0},
            MODULO : {value: 7},
            CODE_G_START : {value: 10},
            START_PATTERN : {value: [1 / 3 * 7, 1 / 3 * 7, 1 / 3 * 7]},
            STOP_PATTERN : {value: [1 / 3 * 7, 1 / 3 * 7, 1 / 3 * 7]},
            MIDDLE_PATTERN : {value: [1 / 5 * 7, 1 / 5 * 7, 1 / 5 * 7, 1 / 5 * 7, 1 / 5 * 7]},
            CODE_PATTERN : {value: [
                [3, 2, 1, 1],
                [2, 2, 2, 1],
                [2, 1, 2, 2],
                [1, 4, 1, 1],
                [1, 1, 3, 2],
                [1, 2, 3, 1],
                [1, 1, 1, 4],
                [1, 3, 1, 2],
                [1, 2, 1, 3],
                [3, 1, 1, 2],
                [1, 1, 2, 3],
                [1, 2, 2, 2],
                [2, 2, 1, 2],
                [1, 1, 4, 1],
                [2, 3, 1, 1],
                [1, 3, 2, 1],
                [4, 1, 1, 1],
                [2, 1, 3, 1],
                [3, 1, 2, 1],
                [2, 1, 1, 3]
            ]},
            CODE_FREQUENCY : {value: [0, 11, 13, 14, 19, 25, 28, 21, 22, 26]},
            SINGLE_CODE_ERROR: {value: 0.67},
            AVG_CODE_ERROR: {value: 0.27},
            FORMAT: {value: "ean_13", writeable: false}
        };
        
        EANReader.prototype = Object.create(BarcodeReader.prototype, properties);
        EANReader.prototype.constructor = EANReader;
        
        EANReader.prototype._decodeCode = function(start, coderange) {
            var counter = [0, 0, 0, 0],
                i,
                self = this,
                offset = start,
                isWhite = !self._row[offset],
                counterPos = 0,
                bestMatch = {
                    error : Number.MAX_VALUE,
                    code : -1,
                    start : start,
                    end : start
                },
                code,
                error,
                normalized;

            if (!coderange) {
                coderange = self.CODE_PATTERN.length;
            }

            for ( i = offset; i < self._row.length; i++) {
                if (self._row[i] ^ isWhite) {
                    counter[counterPos]++;
                } else {
                    if (counterPos === counter.length - 1) {
                        normalized = self._normalize(counter);
                        if (normalized) {
                            for (code = 0; code < coderange; code++) {
                                error = self._matchPattern(normalized, self.CODE_PATTERN[code]);
                                if (error < bestMatch.error) {
                                    bestMatch.code = code;
                                    bestMatch.error = error;
                                }
                            }
                            bestMatch.end = i;
                            if (bestMatch.error > self.AVG_CODE_ERROR) {
                                return null;
                            }
                            return bestMatch;
                        }
                    } else {
                        counterPos++;
                    }
                    counter[counterPos] = 1;
                    isWhite = !isWhite;
                }
            }
            return null;
        };

        EANReader.prototype._findPattern = function(pattern, offset, isWhite, tryHarder, epsilon) {
            var counter = [],
                self = this,
                i,
                counterPos = 0,
                bestMatch = {
                    error : Number.MAX_VALUE,
                    code : -1,
                    start : 0,
                    end : 0
                },
                error,
                j,
                sum,
                normalized;

            if (!offset) {
                offset = self._nextSet(self._row);
            }

            if (isWhite === undefined) {
                isWhite = false;
            }

            if (tryHarder === undefined) {
                tryHarder = true;
            }

            if ( epsilon === undefined) {
                epsilon = self.AVG_CODE_ERROR;
            }

            for ( i = 0; i < pattern.length; i++) {
                counter[i] = 0;
            }

            for ( i = offset; i < self._row.length; i++) {
                if (self._row[i] ^ isWhite) {
                    counter[counterPos]++;
                } else {
                    if (counterPos === counter.length - 1) {
                        sum = 0;
                        for ( j = 0; j < counter.length; j++) {
                            sum += counter[j];
                        }
                        normalized = self._normalize(counter);
                        if (normalized) {
                            error = self._matchPattern(normalized, pattern);

                            if (error < epsilon) {
                                bestMatch.error = error;
                                bestMatch.start = i - sum;
                                bestMatch.end = i;
                                return bestMatch;
                            }
                        }
                        if (tryHarder) {
                            for ( j = 0; j < counter.length - 2; j++) {
                                counter[j] = counter[j + 2];
                            }
                            counter[counter.length - 2] = 0;
                            counter[counter.length - 1] = 0;
                            counterPos--;
                        } else {
                            return null;
                        }
                    } else {
                        counterPos++;
                    }
                    counter[counterPos] = 1;
                    isWhite = !isWhite;
                }
            }
            return null;
        };

        EANReader.prototype._findStart = function() {
            var self = this,
                leadingWhitespaceStart,
                offset = self._nextSet(self._row),
                startInfo;

            while(!startInfo) {
                startInfo = self._findPattern(self.START_PATTERN, offset);
                if (!startInfo) {
                    return null;
                }
                leadingWhitespaceStart = startInfo.start - (startInfo.end - startInfo.start);
                if (leadingWhitespaceStart >= 0) {
                    if (self._matchRange(leadingWhitespaceStart, startInfo.start, 0)) {
                        return startInfo;
                    }
                }
                offset = startInfo.end;
                startInfo = null;
            }
        };

        EANReader.prototype._verifyTrailingWhitespace = function(endInfo) {
            var self = this,
                trailingWhitespaceEnd;

            trailingWhitespaceEnd = endInfo.end + (endInfo.end - endInfo.start);
            if (trailingWhitespaceEnd < self._row.length) {
                if (self._matchRange(endInfo.end, trailingWhitespaceEnd, 0)) {
                    return endInfo;
                }
            }
            return null;
        };

        EANReader.prototype._findEnd = function(offset, isWhite) {
            var self = this,
                endInfo = self._findPattern(self.STOP_PATTERN, offset, isWhite, false);

            return endInfo !== null ? self._verifyTrailingWhitespace(endInfo) : null;
        };

        EANReader.prototype._calculateFirstDigit = function(codeFrequency) {
            var i,
                self = this;

            for ( i = 0; i < self.CODE_FREQUENCY.length; i++) {
                if (codeFrequency === self.CODE_FREQUENCY[i]) {
                    return i;
                }
            }
            return null;
        };

        EANReader.prototype._decodePayload = function(code, result, decodedCodes) {
            var i,
                self = this,
                codeFrequency = 0x0,
                firstDigit;

            for ( i = 0; i < 6; i++) {
                code = self._decodeCode(code.end);
                if (!code) {
                    return null;
                }
                if (code.code >= self.CODE_G_START) {
                    code.code = code.code - self.CODE_G_START;
                    codeFrequency |= 1 << (5 - i);
                } else {
                    codeFrequency |= 0 << (5 - i);
                }
                result.push(code.code);
                decodedCodes.push(code);
            }

            firstDigit = self._calculateFirstDigit(codeFrequency);
            if (firstDigit === null) {
                return null;
            }
            result.unshift(firstDigit);

            code = self._findPattern(self.MIDDLE_PATTERN, code.end, true, false);
            if (code === null) {
                return null;
            }
            decodedCodes.push(code);

            for ( i = 0; i < 6; i++) {
                code = self._decodeCode(code.end, self.CODE_G_START);
                if (!code) {
                    return null;
                }
                decodedCodes.push(code);
                result.push(code.code);
            }

            return code;
        };

        EANReader.prototype._decode = function() {
            var startInfo,
                self = this,
                code,
                result = [],
                decodedCodes = [];

            startInfo = self._findStart();
            if (!startInfo) {
                return null;
            }
            code = {
                code : startInfo.code,
                start : startInfo.start,
                end : startInfo.end
            };
            decodedCodes.push(code);
            code = self._decodePayload(code, result, decodedCodes);
            if (!code) {
                return null;
            }
            code = self._findEnd(code.end, false);
            if (!code){
                return null;
            }

            decodedCodes.push(code);

            // Checksum
            if (!self._checksum(result)) {
                return null;
            }

            return {
                code : result.join(""),
                start : startInfo.start,
                end : code.end,
                codeset : "",
                startInfo : startInfo,
                decodedCodes : decodedCodes
            };
        };

        EANReader.prototype._checksum = function(result) {
            var sum = 0, i;

            for ( i = result.length - 2; i >= 0; i -= 2) {
                sum += result[i];
            }
            sum *= 3;
            for ( i = result.length - 1; i >= 0; i -= 2) {
                sum += result[i];
            }
            return sum % 10 === 0;
        };
        
        return (EANReader);
    }
);
/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

define(
    'code_39_reader',[
        "./barcode_reader",
        "./array_helper"
    ],
    function(BarcodeReader, ArrayHelper) {
        "use strict";

        function Code39Reader() {
            BarcodeReader.call(this);
        }

        var properties = {
            ALPHABETH_STRING: {value: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-. *$/+%"},
            ALPHABET: {value: [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 45, 46, 32, 42, 36, 47, 43, 37]},
            CHARACTER_ENCODINGS: {value: [0x034, 0x121, 0x061, 0x160, 0x031, 0x130, 0x070, 0x025, 0x124, 0x064, 0x109, 0x049, 0x148, 0x019, 0x118, 0x058, 0x00D, 0x10C, 0x04C, 0x01C, 0x103, 0x043, 0x142, 0x013, 0x112, 0x052, 0x007, 0x106, 0x046, 0x016, 0x181, 0x0C1, 0x1C0, 0x091, 0x190, 0x0D0, 0x085, 0x184, 0x0C4, 0x094, 0x0A8, 0x0A2, 0x08A, 0x02A]},
            ASTERISK: {value: 0x094},
            FORMAT: {value: "code_39", writeable: false}
        };

        Code39Reader.prototype = Object.create(BarcodeReader.prototype, properties);
        Code39Reader.prototype.constructor = Code39Reader;

        Code39Reader.prototype._toCounters = function(start, counter) {
            var self = this,
                numCounters = counter.length,
                end = self._row.length,
                isWhite = !self._row[start],
                i,
                counterPos = 0;

            ArrayHelper.init(counter, 0);

            for ( i = start; i < end; i++) {
                if (self._row[i] ^ isWhite) {
                    counter[counterPos]++;
                } else {
                    counterPos++;
                    if (counterPos === numCounters) {
                        break;
                    } else {
                        counter[counterPos] = 1;
                        isWhite = !isWhite;
                    }
                }
            }

            return counter;
        };

        Code39Reader.prototype._decode = function() {
            var self = this,
                counters = [0,0,0,0,0,0,0,0,0],
                result = [],
                start = self._findStart(),
                decodedChar,
                lastStart,
                pattern,
                nextStart;

            if (!start) {
                return null;
            }
            nextStart = self._nextSet(self._row, start.end);

            do {
                counters = self._toCounters(nextStart, counters);
                pattern = self._toPattern(counters);
                if (pattern < 0) {
                    return null;
                }
                decodedChar = self._patternToChar(pattern);
                if (decodedChar < 0){
                    return null;
                }
                result.push(decodedChar);
                lastStart = nextStart;
                nextStart += ArrayHelper.sum(counters);
                nextStart = self._nextSet(self._row, nextStart);
            } while(decodedChar !== '*');
            result.pop();

            if (!result.length) {
                return null;
            }

            if(!self._verifyTrailingWhitespace(lastStart, nextStart, counters)) {
                return null;
            }

            return {
                code : result.join(""),
                start : start.start,
                end : nextStart,
                startInfo : start,
                decodedCodes : result
            };
        };

        Code39Reader.prototype._verifyTrailingWhitespace = function(lastStart, nextStart, counters) {
            var trailingWhitespaceEnd,
                patternSize = ArrayHelper.sum(counters);

            trailingWhitespaceEnd = nextStart - lastStart - patternSize;
            if ((trailingWhitespaceEnd * 3) >= patternSize) {
                return true;
            }
            return false;
        };

        Code39Reader.prototype._patternToChar = function(pattern) {
            var i,
                self = this;

            for (i = 0; i < self.CHARACTER_ENCODINGS.length; i++) {
                if (self.CHARACTER_ENCODINGS[i] === pattern) {
                    return String.fromCharCode(self.ALPHABET[i]);
                }
            }
        };

        Code39Reader.prototype._findNextWidth = function(counters, current) {
            var i,
                minWidth = Number.MAX_VALUE;

            for (i = 0; i < counters.length; i++) {
                if (counters[i] < minWidth && counters[i] > current) {
                    minWidth = counters[i];
                }
            }

            return minWidth;
        };

        Code39Reader.prototype._toPattern = function(counters) {
            var numCounters = counters.length,
                maxNarrowWidth = 0,
                numWideBars = numCounters,
                wideBarWidth = 0,
                self = this,
                pattern,
                i;

            while(numWideBars > 3) {
                maxNarrowWidth = self._findNextWidth(counters, maxNarrowWidth);
                numWideBars = 0;
                pattern = 0;
                for (i = 0; i < numCounters; i++) {
                    if (counters[i] > maxNarrowWidth) {
                        pattern |= 1 << (numCounters - 1 - i);
                        numWideBars++;
                        wideBarWidth += counters[i];
                    }
                }

                if (numWideBars === 3) {
                    for (i = 0; i < numCounters && numWideBars > 0; i++) {
                        if (counters[i] > maxNarrowWidth) {
                            numWideBars--;
                            if ((counters[i] * 2) >= wideBarWidth) {
                                return -1;
                            }
                        }
                    }
                    return pattern;
                }
            }
            return -1;
        };

        Code39Reader.prototype._findStart = function() {
            var self = this,
                offset = self._nextSet(self._row),
                patternStart = offset,
                counter = [0,0,0,0,0,0,0,0,0],
                counterPos = 0,
                isWhite = false,
                i,
                j,
                whiteSpaceMustStart;

            for ( i = offset; i < self._row.length; i++) {
                if (self._row[i] ^ isWhite) {
                    counter[counterPos]++;
                } else {
                    if (counterPos === counter.length - 1) {

                        // find start pattern
                        if (self._toPattern(counter) === self.ASTERISK) {
                            whiteSpaceMustStart = Math.floor(Math.max(0, patternStart - ((i - patternStart) / 4)));
                            if (self._matchRange(whiteSpaceMustStart, patternStart, 0)) {
                                return {
                                    start: patternStart,
                                    end: i
                                };
                            }
                        }

                        patternStart += counter[0] + counter[1];
                        for ( j = 0; j < 7; j++) {
                            counter[j] = counter[j + 2];
                        }
                        counter[7] = 0;
                        counter[8] = 0;
                        counterPos--;
                    } else {
                        counterPos++;
                    }
                    counter[counterPos] = 1;
                    isWhite = !isWhite;
                }
            }
            return null;
        };

        return (Code39Reader);
    }
);
/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

define(
    'code_39_vin_reader',[
        "./code_39_reader"
    ],
    function(Code39Reader) {
        "use strict";

        function Code39VINReader() {
            Code39Reader.call(this);
        }

        var patterns = {
            IOQ: /[IOQ]/g,
            AZ09: /[A-Z0-9]{17}/
        };

        Code39VINReader.prototype = Object.create(Code39Reader.prototype);
        Code39VINReader.prototype.constructor = Code39VINReader;

        // Cribbed from:
        // https://github.com/zxing/zxing/blob/master/core/src/main/java/com/google/zxing/client/result/VINResultParser.java
        Code39VINReader.prototype._decode = function() {
            var result = Code39Reader.prototype._decode.apply(this);
            if (!result) {
                return null;
            }

            var code = result.code;

            if (!code) {
                return;
            }

            code = code.replace(patterns.IOQ, '');

            if (!code.match(patterns.AZ09)) {
                console.log('Failed AZ09 pattern code:', code);
                return null;
            }

            if (!this._checkChecksum(code)) {
                return null;
            }

            result.code = code;
            return result;
        };

        Code39VINReader.prototype._checkChecksum = function(code) {
            // TODO
            return !!code;
        };

        return (Code39VINReader);
    }
);

/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

define(
    'codabar_reader',[
        "./barcode_reader"
    ],
    function(BarcodeReader) {
        "use strict";

        function CodabarReader() {
            BarcodeReader.call(this);
            this._counters = [];
        }

        var properties = {
            ALPHABETH_STRING: {value: "0123456789-$:/.+ABCD"},
            ALPHABET: {value: [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 45, 36, 58, 47, 46, 43, 65, 66, 67, 68]},
            CHARACTER_ENCODINGS: {value: [0x003, 0x006, 0x009, 0x060, 0x012, 0x042, 0x021, 0x024, 0x030, 0x048, 0x00c, 0x018, 0x045, 0x051, 0x054, 0x015, 0x01A, 0x029, 0x00B, 0x00E]},
            START_END: {value: [0x01A, 0x029, 0x00B, 0x00E]},
            MIN_ENCODED_CHARS: {value: 4},
            MAX_ACCEPTABLE: {value: 2.0},
            PADDING: {value: 1.5},
            FORMAT: {value: "codabar", writeable: false}
        };

        CodabarReader.prototype = Object.create(BarcodeReader.prototype, properties);
        CodabarReader.prototype.constructor = CodabarReader;

        CodabarReader.prototype._decode = function() {
            var self = this,
                result = [],
                start,
                decodedChar,
                pattern,
                nextStart,
                end;

            this._counters = self._fillCounters();
            start = self._findStart();
            if (!start) {
                return null;
            }
            nextStart = start.startCounter;

            do {
                pattern = self._toPattern(nextStart);
                if (pattern < 0) {
                    return null;
                }
                decodedChar = self._patternToChar(pattern);
                if (decodedChar < 0){
                    return null;
                }
                result.push(decodedChar);
                nextStart += 8;
                if (result.length > 1 && self._isStartEnd(pattern)) {
                    break;
                }
            } while(nextStart < self._counters.length);

            // verify end
            if ((result.length - 2) < self.MIN_ENCODED_CHARS || !self._isStartEnd(pattern)) {
                return null;
            }

            // verify end white space
            if (!self._verifyWhitespace(start.startCounter, nextStart - 8)){
                return null;
            }

            if (!self._validateResult(result, start.startCounter)){
                return null;
            }

            nextStart = nextStart > self._counters.length ? self._counters.length : nextStart;
            end = start.start + self._sumCounters(start.startCounter, nextStart - 8);

            return {
                code : result.join(""),
                start : start.start,
                end : end,
                startInfo : start,
                decodedCodes : result
            };
        };

        CodabarReader.prototype._verifyWhitespace = function(startCounter, endCounter) {
            if ((startCounter - 1 <= 0) || this._counters[startCounter-1] >= (this._calculatePatternLength(startCounter) / 2.0)) {
                if ((endCounter + 8 >= this._counters.length) || this._counters[endCounter+7] >= (this._calculatePatternLength(endCounter) / 2.0)) {
                    return true;
                }
            }
            return false;
        };

        CodabarReader.prototype._calculatePatternLength = function(offset) {
            var i,
                sum = 0;

            for (i = offset; i < offset + 7; i++) {
                sum += this._counters[i];
            }

            return sum;
        };

        CodabarReader.prototype._thresholdResultPattern = function(result, startCounter){
            var self = this,
                categorization = {
                    space: {
                        narrow: { size: 0, counts: 0, min: 0, max: Number.MAX_VALUE},
                        wide: {size: 0, counts: 0, min: 0, max: Number.MAX_VALUE}
                    },
                    bar: {
                        narrow: { size: 0, counts: 0, min: 0, max: Number.MAX_VALUE},
                        wide: { size: 0, counts: 0, min: 0, max: Number.MAX_VALUE}
                    }
                },
                kind,
                cat,
                i,
                j,
                pos = startCounter,
                pattern;

            for (i = 0; i < result.length; i++){
                pattern = self._charToPattern(result[i]);
                for (j = 6; j >= 0; j--) {
                    kind = (j & 1) === 2 ? categorization.bar : categorization.space;
                    cat = (pattern & 1)  === 1 ? kind.wide : kind.narrow;
                    cat.size += self._counters[pos + j];
                    cat.counts++;
                    pattern >>= 1;
                }
                pos += 8;
            }

            ["space", "bar"].forEach(function(key) {
                var kind = categorization[key];
                kind.wide.min = Math.floor((kind.narrow.size/kind.narrow.counts + kind.wide.size / kind.wide.counts) / 2);
                kind.narrow.max = Math.ceil(kind.wide.min);
                kind.wide.max = Math.ceil((kind.wide.size * self.MAX_ACCEPTABLE + self.PADDING) / kind.wide.counts);
            });

            return categorization;
        };

        CodabarReader.prototype._charToPattern = function(char) {
            var self = this,
                charCode = char.charCodeAt(0),
                i;

            for (i = 0; i < self.ALPHABET.length; i++) {
                if (self.ALPHABET[i] === charCode){
                    return self.CHARACTER_ENCODINGS[i];
                }
            }
            return 0x0;
        };

        CodabarReader.prototype._validateResult = function(result, startCounter) {
            var self = this,
                thresholds = self._thresholdResultPattern(result, startCounter),
                i,
                j,
                kind,
                cat,
                size,
                pos = startCounter,
                pattern;

            for (i = 0; i < result.length; i++) {
                pattern = self._charToPattern(result[i]);
                for (j = 6; j >= 0; j--) {
                    kind = (j & 1) === 0 ? thresholds.bar : thresholds.space;
                    cat = (pattern & 1)  === 1 ? kind.wide : kind.narrow;
                    size = self._counters[pos + j];
                    if (size < cat.min || size > cat.max) {
                        return false;
                    }
                    pattern >>= 1;
                }
                pos += 8;
            }
            return true;
        };

        CodabarReader.prototype._patternToChar = function(pattern) {
            var i,
                self = this;

            for (i = 0; i < self.CHARACTER_ENCODINGS.length; i++) {
                if (self.CHARACTER_ENCODINGS[i] === pattern) {
                    return String.fromCharCode(self.ALPHABET[i]);
                }
            }
            return -1;
        };

        CodabarReader.prototype._computeAlternatingThreshold = function(offset, end) {
            var i,
                min = Number.MAX_VALUE,
                max = 0,
                counter;

            for (i = offset; i < end; i += 2){
                counter = this._counters[i];
                if (counter > max) {
                    max = counter;
                }
                if (counter < min) {
                    min = counter;
                }
            }

            return ((min + max) / 2.0) | 0;
        };

        CodabarReader.prototype._toPattern = function(offset) {
            var numCounters = 7,
                end = offset + numCounters,
                barThreshold,
                spaceThreshold,
                bitmask = 1 << (numCounters - 1),
                pattern = 0,
                i,
                threshold;

            if (end > this._counters.length) {
                return -1;
            }

            barThreshold = this._computeAlternatingThreshold(offset, end);
            spaceThreshold = this._computeAlternatingThreshold(offset + 1, end);

            for (i = 0; i < numCounters; i++){
                threshold = (i & 1) === 0 ? barThreshold : spaceThreshold;
                if (this._counters[offset + i] > threshold) {
                    pattern |= bitmask;
                }
                bitmask >>= 1;
            }

            return pattern;
        };

        CodabarReader.prototype._isStartEnd = function(pattern) {
            var i;

            for (i = 0; i < this.START_END.length; i++) {
                if (this.START_END[i] === pattern) {
                    return true;
                }
            }
            return false;
        };

        CodabarReader.prototype._sumCounters = function(start, end) {
            var i,
                sum = 0;

            for (i = start; i < end; i++) {
                sum += this._counters[i];
            }
            return sum;
        };

        CodabarReader.prototype._findStart = function() {
            var self = this,
                i,
                pattern,
                start = self._nextUnset(self._row),
                end;

            for (i = 1; i < this._counters.length; i++) {
                pattern = self._toPattern(i);
                if (pattern !== -1 && self._isStartEnd(pattern)) {
                    // TODO: Look for whitespace ahead
                    start += self._sumCounters(0, i);
                    end = start + self._sumCounters(i, i + 8);
                    return {
                        start: start,
                        end: end,
                        startCounter: i,
                        endCounter: i + 8
                    };
                }
            }
        };

        return (CodabarReader);
    }
);
/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

define(
    'upc_reader',[
        "./ean_reader"
    ],
    function(EANReader) {
        "use strict";

        function UPCReader() {
            EANReader.call(this);
        }

        var properties = {
            FORMAT: {value: "upc_a", writeable: false}
        };

        UPCReader.prototype = Object.create(EANReader.prototype, properties);
        UPCReader.prototype.constructor = UPCReader;

        UPCReader.prototype._decode = function() {
            var result = EANReader.prototype._decode.call(this);

            if (result && result.code && result.code.length === 13 && result.code.charAt(0) === "0") {

                result.code = result.code.substring(1);
                return result;
            }
            return null;
        };

        return (UPCReader);
    }
);
/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

define(
    'ean_8_reader',[
        "./ean_reader"
    ],
    function(EANReader) {
        "use strict";

        function EAN8Reader() {
            EANReader.call(this);
        }

        var properties = {
            FORMAT: {value: "ean_8", writeable: false}
        };

        EAN8Reader.prototype = Object.create(EANReader.prototype, properties);
        EAN8Reader.prototype.constructor = EAN8Reader;

        EAN8Reader.prototype._decodePayload = function(code, result, decodedCodes) {
            var i,
                self = this;

            for ( i = 0; i < 4; i++) {
                code = self._decodeCode(code.end, self.CODE_G_START);
                if (!code) {
                    return null;
                }
                result.push(code.code);
                decodedCodes.push(code);
            }

            code = self._findPattern(self.MIDDLE_PATTERN, code.end, true, false);
            if (code === null) {
                return null;
            }
            decodedCodes.push(code);

            for ( i = 0; i < 4; i++) {
                code = self._decodeCode(code.end, self.CODE_G_START);
                if (!code) {
                    return null;
                }
                decodedCodes.push(code);
                result.push(code.code);
            }

            return code;
        };

        return (EAN8Reader);
    }
);
/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

define(
    'upc_e_reader',[
        "./ean_reader"
    ],
    function(EANReader) {
        "use strict";

        function UPCEReader() {
            EANReader.call(this);
        }

        var properties = {
            CODE_FREQUENCY : {value: [
                [ 56, 52, 50, 49, 44, 38, 35, 42, 41, 37 ],
                [7, 11, 13, 14, 19, 25, 28, 21, 22, 26]]},
            STOP_PATTERN: { value: [1 / 6 * 7, 1 / 6 * 7, 1 / 6 * 7, 1 / 6 * 7, 1 / 6 * 7, 1 / 6 * 7]},
            FORMAT: {value: "upc_e", writeable: false}
        };

        UPCEReader.prototype = Object.create(EANReader.prototype, properties);
        UPCEReader.prototype.constructor = UPCEReader;

        UPCEReader.prototype._decodePayload = function(code, result, decodedCodes) {
            var i,
                self = this,
                codeFrequency = 0x0;

            for ( i = 0; i < 6; i++) {
                code = self._decodeCode(code.end);
                if (!code) {
                    return null;
                }
                if (code.code >= self.CODE_G_START) {
                    code.code = code.code - self.CODE_G_START;
                    codeFrequency |= 1 << (5 - i);
                }
                result.push(code.code);
                decodedCodes.push(code);
            }
            if (!self._determineParity(codeFrequency, result)) {
                return null;
            }

            return code;
        };

        UPCEReader.prototype._determineParity = function(codeFrequency, result) {
            var self =this,
                i,
                nrSystem;

            for (nrSystem = 0; nrSystem < self.CODE_FREQUENCY.length; nrSystem++){
                for ( i = 0; i < self.CODE_FREQUENCY[nrSystem].length; i++) {
                    if (codeFrequency === self.CODE_FREQUENCY[nrSystem][i]) {
                        result.unshift(nrSystem);
                        result.push(i);
                        return true;
                    }
                }
            }
            return false;
        };

        UPCEReader.prototype._convertToUPCA = function(result) {
            var upca = [result[0]],
                lastDigit = result[result.length - 2];

            if (lastDigit <= 2) {
                upca = upca.concat(result.slice(1, 3))
                    .concat([lastDigit, 0, 0, 0, 0])
                    .concat(result.slice(3, 6));
            } else if (lastDigit === 3) {
                upca = upca.concat(result.slice(1, 4))
                    .concat([0 ,0, 0, 0, 0])
                    .concat(result.slice(4,6));
            } else if (lastDigit === 4) {
                upca = upca.concat(result.slice(1, 5))
                    .concat([0, 0, 0, 0, 0, result[5]]);
            } else {
                upca = upca.concat(result.slice(1, 6))
                    .concat([0, 0, 0, 0, lastDigit]);
            }

            upca.push(result[result.length - 1]);
            return upca;
        };

        UPCEReader.prototype._checksum = function(result) {
            return EANReader.prototype._checksum.call(this, this._convertToUPCA(result));
        };

        UPCEReader.prototype._findEnd = function(offset, isWhite) {
            isWhite = true;
            return EANReader.prototype._findEnd.call(this, offset, isWhite);
        };

        UPCEReader.prototype._verifyTrailingWhitespace = function(endInfo) {
            var self = this,
                trailingWhitespaceEnd;

            trailingWhitespaceEnd = endInfo.end + ((endInfo.end - endInfo.start)/2);
            if (trailingWhitespaceEnd < self._row.length) {
                if (self._matchRange(endInfo.end, trailingWhitespaceEnd, 0)) {
                    return endInfo;
                }
            }
        };

        return (UPCEReader);
    }
);
/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

define('html_utils',[], function() {
    "use strict";

    function createNode(htmlStr) {
        var temp = document.createElement('div');
        
        temp.innerHTML = htmlStr;
        while (temp.firstChild) {
            return temp.firstChild;
        }
    }

    function mergeObjects(obj1, obj2) {
        for (var p in obj2) {
            try {
                if (obj2[p].constructor == Object) {
                    obj1[p] = mergeObjects(obj1[p], obj2[p]);
                } else {
                    obj1[p] = obj2[p];
                }
            } catch(e) {
                obj1[p] = obj2[p];
            }
        }

        return obj1;
    }

    return {
        createNode : function(htmlStr) {
            return createNode(htmlStr);
        },
        mergeObjects : function(obj1, obj2) {
            return mergeObjects(obj1, obj2);
        }
    };
}); 
/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

define(
    'i2of5_reader',[
        "./barcode_reader",
        "./html_utils"
    ],
    function(BarcodeReader, HTMLUtils) {
        "use strict";

        function I2of5Reader(opts) {
            opts = HTMLUtils.mergeObjects(getDefaulConfig(), opts);
            BarcodeReader.call(this, opts);
            this.barSpaceRatio = [1, 1];
            if (opts.normalizeBarSpaceWidth) {
                this.SINGLE_CODE_ERROR = 0.38;
                this.AVG_CODE_ERROR = 0.09;
            }
        }

        function getDefaulConfig() {
            var config = {};

            Object.keys(I2of5Reader.CONFIG_KEYS).forEach(function(key) {
                config[key] = I2of5Reader.CONFIG_KEYS[key]['default'];
            });
            return config;
        }

        var N = 1,
            W = 3,
            properties = {
            MODULO : {value: 10},
            START_PATTERN : {value: [N*2.5, N*2.5, N*2.5, N*2.5]},
            STOP_PATTERN : {value: [N*2, N*2, W*2]},
            CODE_PATTERN : {value: [
                [N, N, W, W, N],
                [W, N, N, N, W],
                [N, W, N, N, W],
                [W, W, N, N, N],
                [N, N, W, N, W],
                [W, N, W, N, N],
                [N, W, W, N, N],
                [N, N, N, W, W],
                [W, N, N, W, N],
                [N, W, N, W, N]
            ]},
            SINGLE_CODE_ERROR: {value: 0.78, writable: true},
            AVG_CODE_ERROR: {value: 0.38, writable: true},
            MAX_CORRECTION_FACTOR: {value: 5},
            FORMAT: {value: "i2of5"}
        };

        I2of5Reader.prototype = Object.create(BarcodeReader.prototype, properties);
        I2of5Reader.prototype.constructor = I2of5Reader;

        I2of5Reader.prototype._matchPattern = function(counter, code) {
            if (this.config.normalizeBarSpaceWidth) {
                var i,
                    counterSum = [0, 0],
                    codeSum = [0, 0],
                    correction = [0, 0],
                    correctionRatio = this.MAX_CORRECTION_FACTOR,
                    correctionRatioInverse = 1 / correctionRatio;

                for (i = 0; i < counter.length; i++) {
                    counterSum[i % 2] += counter[i];
                    codeSum[i % 2] += code[i];
                }
                correction[0] = codeSum[0] / counterSum[0];
                correction[1] = codeSum[1] / counterSum[1];

                correction[0] = Math.max(Math.min(correction[0], correctionRatio), correctionRatioInverse);
                correction[1] = Math.max(Math.min(correction[1], correctionRatio), correctionRatioInverse);
                this.barSpaceRatio = correction;
                for (i = 0; i < counter.length; i++) {
                    counter[i] *= this.barSpaceRatio[i % 2];
                }
            }
            return BarcodeReader.prototype._matchPattern.call(this, counter, code);
        };

        I2of5Reader.prototype._findPattern = function(pattern, offset, isWhite, tryHarder) {
            var counter = [],
                self = this,
                i,
                counterPos = 0,
                bestMatch = {
                    error : Number.MAX_VALUE,
                    code : -1,
                    start : 0,
                    end : 0
                },
                error,
                j,
                sum,
                normalized,
                epsilon = self.AVG_CODE_ERROR;

            isWhite = isWhite || false;
            tryHarder = tryHarder || false;

            if (!offset) {
                offset = self._nextSet(self._row);
            }

            for ( i = 0; i < pattern.length; i++) {
                counter[i] = 0;
            }

            for ( i = offset; i < self._row.length; i++) {
                if (self._row[i] ^ isWhite) {
                    counter[counterPos]++;
                } else {
                    if (counterPos === counter.length - 1) {
                        sum = 0;
                        for ( j = 0; j < counter.length; j++) {
                            sum += counter[j];
                        }
                        normalized = self._normalize(counter);
                        if (normalized) {
                            error = self._matchPattern(normalized, pattern);

                            if (error < epsilon) {
                                bestMatch.error = error;
                                bestMatch.start = i - sum;
                                bestMatch.end = i;
                                return bestMatch;
                            }
                        }
                        if (tryHarder) {
                            for (j = 0; j < counter.length - 2; j++) {
                                counter[j] = counter[j + 2];
                            }
                            counter[counter.length - 2] = 0;
                            counter[counter.length - 1] = 0;
                            counterPos--;
                        } else {
                            return null;
                        }
                    } else {
                        counterPos++;
                    }
                    counter[counterPos] = 1;
                    isWhite = !isWhite;
                }
            }
            return null;
        };

        I2of5Reader.prototype._findStart = function() {
            var self = this,
                leadingWhitespaceStart,
                offset = self._nextSet(self._row),
                startInfo,
                narrowBarWidth = 1;

            while(!startInfo) {
                startInfo = self._findPattern(self.START_PATTERN, offset, false, true);
                if (!startInfo) {
                    return null;
                }
                narrowBarWidth = Math.floor((startInfo.end - startInfo.start) / 4);
                leadingWhitespaceStart = startInfo.start - narrowBarWidth*10;
                if (leadingWhitespaceStart >= 0) {
                    if (self._matchRange(leadingWhitespaceStart, startInfo.start, 0)) {
                        return startInfo;
                    }
                }
                offset = startInfo.end;
                startInfo = null;
            }
        };

        I2of5Reader.prototype._verifyTrailingWhitespace = function(endInfo) {
            var self = this,
                trailingWhitespaceEnd;

            trailingWhitespaceEnd = endInfo.end + ((endInfo.end - endInfo.start) / 2);
            if (trailingWhitespaceEnd < self._row.length) {
                if (self._matchRange(endInfo.end, trailingWhitespaceEnd, 0)) {
                    return endInfo;
                }
            }
            return null;
        };

        I2of5Reader.prototype._findEnd = function() {
            var self = this,
                endInfo,
                tmp;

            self._row.reverse();
            endInfo = self._findPattern(self.STOP_PATTERN);
            self._row.reverse();

            if (endInfo === null) {
                return null;
            }

            // reverse numbers
            tmp = endInfo.start;
            endInfo.start = self._row.length - endInfo.end;
            endInfo.end = self._row.length - tmp;

            return endInfo !== null ? self._verifyTrailingWhitespace(endInfo) : null;
        };

        I2of5Reader.prototype._decodePair = function(counterPair) {
            var i,
                code,
                codes = [],
                self = this;

            for (i = 0; i < counterPair.length; i++) {
                code = self._decodeCode(counterPair[i]);
                if (!code) {
                    return null;
                }
                codes.push(code);
            }
            return codes;
        };

        I2of5Reader.prototype._decodeCode = function(counter) {
            var j,
                self = this,
                sum = 0,
                normalized,
                error,
                epsilon = self.AVG_CODE_ERROR,
                code,
                bestMatch = {
                    error : Number.MAX_VALUE,
                    code : -1,
                    start : 0,
                    end : 0
                };

            for ( j = 0; j < counter.length; j++) {
                sum += counter[j];
            }
            normalized = self._normalize(counter);
            if (normalized) {
                for (code = 0; code < self.CODE_PATTERN.length; code++) {
                    error = self._matchPattern(normalized, self.CODE_PATTERN[code]);
                    if (error < bestMatch.error) {
                        bestMatch.code = code;
                        bestMatch.error = error;
                    }
                }
                if (bestMatch.error < epsilon) {
                    return bestMatch;
                }
            }
            return null;
        };

        I2of5Reader.prototype._decodePayload = function(counters, result, decodedCodes) {
            var i,
                self = this,
                pos = 0,
                counterLength = counters.length,
                counterPair = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0]],
                codes;

            while (pos < counterLength) {
                for (i = 0; i < 5; i++) {
                    counterPair[0][i] = counters[pos]*this.barSpaceRatio[0];
                    counterPair[1][i] = counters[pos + 1]*this.barSpaceRatio[1];
                    pos += 2;
                }
                codes = self._decodePair(counterPair);
                if (!codes) {
                    return null;
                }
                for (i = 0; i < codes.length; i++) {
                    result.push(codes[i].code + "");
                    decodedCodes.push(codes[i]);
                }
            }
            return codes;
        };

        I2of5Reader.prototype._verifyCounterLength = function(counters) {
            return (counters.length % 10 === 0);
        };

        I2of5Reader.prototype._decode = function() {
            var startInfo,
                endInfo,
                self = this,
                code,
                result = [],
                decodedCodes = [],
                counters;

            startInfo = self._findStart();
            if (!startInfo) {
                return null;
            }
            decodedCodes.push(startInfo);

            endInfo = self._findEnd();
            if (!endInfo) {
                return null;
            }

            counters = self._fillCounters(startInfo.end, endInfo.start, false);
            if (!self._verifyCounterLength(counters)) {
                return null;
            }
            code = self._decodePayload(counters, result, decodedCodes);
            if (!code) {
                return null;
            }
            if (result.length % 2 !== 0 ||
                    result.length < 6) {
                return null;
            }

            decodedCodes.push(endInfo);
            return {
                code : result.join(""),
                start : startInfo.start,
                end : endInfo.end,
                startInfo : startInfo,
                decodedCodes : decodedCodes
            };
        };

        I2of5Reader.CONFIG_KEYS = {
            normalizeBarSpaceWidth: {
                'type': 'boolean',
                'default': false,
                'description': 'If true, the reader tries to normalize the' +
                'width-difference between bars and spaces'
            }
        };

        return (I2of5Reader);
    }
);
/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

define('barcode_decoder',[
    "bresenham",
    "image_debug",
    'code_128_reader',
    'ean_reader',
    'code_39_reader',
    'code_39_vin_reader',
    'codabar_reader',
    'upc_reader',
    'ean_8_reader',
    'upc_e_reader',
    'i2of5_reader'
], function(
    Bresenham,
    ImageDebug,
    Code128Reader,
    EANReader,
    Code39Reader,
    Code39VINReader,
    CodabarReader,
    UPCReader,
    EAN8Reader,
    UPCEReader,
    I2of5Reader) {
    "use strict";

    var readers = {
        code_128_reader: Code128Reader,
        ean_reader: EANReader,
        ean_8_reader: EAN8Reader,
        code_39_reader: Code39Reader,
        code_39_vin_reader: Code39VINReader,
        codabar_reader: CodabarReader,
        upc_reader: UPCReader,
        upc_e_reader: UPCEReader,
        i2of5_reader: I2of5Reader
    };
    var BarcodeDecoder = {
        create : function(config, inputImageWrapper) {
            var _canvas = {
                ctx : {
                        frequency : null,
                        pattern : null,
                        overlay : null
                    },
                    dom : {
                        frequency : null,
                        pattern : null,
                        overlay : null
                    }
                },
                _barcodeReaders = [];

            initCanvas();
            initReaders();
            initConfig();

            function initCanvas() {
                if (typeof document !== 'undefined') {
                    var $debug = document.querySelector("#debug.detection");
                    _canvas.dom.frequency = document.querySelector("canvas.frequency");
                    if (!_canvas.dom.frequency) {
                        _canvas.dom.frequency = document.createElement("canvas");
                        _canvas.dom.frequency.className = "frequency";
                        if($debug) {
                            $debug.appendChild(_canvas.dom.frequency);
                        }
                    }
                    _canvas.ctx.frequency = _canvas.dom.frequency.getContext("2d");

                    _canvas.dom.pattern = document.querySelector("canvas.patternBuffer");
                    if (!_canvas.dom.pattern) {
                        _canvas.dom.pattern = document.createElement("canvas");
                        _canvas.dom.pattern.className = "patternBuffer";
                        if($debug) {
                            $debug.appendChild(_canvas.dom.pattern);
                        }
                    }
                    _canvas.ctx.pattern = _canvas.dom.pattern.getContext("2d");

                    _canvas.dom.overlay = document.querySelector("canvas.drawingBuffer");
                    if (_canvas.dom.overlay) {
                        _canvas.ctx.overlay = _canvas.dom.overlay.getContext("2d");
                    }
                }
            }

            function initReaders() {
                config.readers.forEach(function(readerConfig) {
                    var reader,
                        config = {};

                    if (typeof readerConfig === 'object') {
                        reader = readerConfig.format;
                        config = readerConfig.config;
                    } else if (typeof readerConfig === 'string') {
                        reader = readerConfig;
                    }
                    _barcodeReaders.push(new readers[reader](config));
                });
                console.log("Registered Readers: " + _barcodeReaders
                    .map(function(reader) {return JSON.stringify({format: reader.FORMAT, config: reader.config});})
                    .join(', '));
            }

            function initConfig() {
                if (typeof document !== 'undefined') {
                    var i,
                        vis = [{
                            node : _canvas.dom.frequency,
                            prop : config.showFrequency
                        }, {
                            node : _canvas.dom.pattern,
                            prop : config.showPattern
                        }];

                    for (i = 0; i < vis.length; i++) {
                        if (vis[i].prop === true) {
                            vis[i].node.style.display = "block";
                        } else {
                            vis[i].node.style.display = "none";
                        }
                    }
                }
            }

            /**
             * extend the line on both ends
             * @param {Array} line
             * @param {Number} angle
             */
            function getExtendedLine(line, angle, ext) {
                function extendLine(amount) {
                    var extension = {
                        y : amount * Math.sin(angle),
                        x : amount * Math.cos(angle)
                    };

                    line[0].y -= extension.y;
                    line[0].x -= extension.x;
                    line[1].y += extension.y;
                    line[1].x += extension.x;
                }

                // check if inside image
                extendLine(ext);
                while (ext > 1 && (!inputImageWrapper.inImageWithBorder(line[0], 0) || !inputImageWrapper.inImageWithBorder(line[1], 0))) {
                    ext -= Math.ceil(ext/2);
                    extendLine(-ext);
                }
                return line;
            }

            function getLine(box) {
                return [{
                    x : (box[1][0] - box[0][0]) / 2 + box[0][0],
                    y : (box[1][1] - box[0][1]) / 2 + box[0][1]
                }, {
                    x : (box[3][0] - box[2][0]) / 2 + box[2][0],
                    y : (box[3][1] - box[2][1]) / 2 + box[2][1]
                }];
            }

            function tryDecode(line) {
                var result = null,
                    i,
                    barcodeLine = Bresenham.getBarcodeLine(inputImageWrapper, line[0], line[1]);

                if (config.showFrequency) {
                    ImageDebug.drawPath(line, {x: 'x', y: 'y'}, _canvas.ctx.overlay, {color: 'red', lineWidth: 3});
                    Bresenham.debug.printFrequency(barcodeLine.line, _canvas.dom.frequency);
                }
                Bresenham.toBinaryLine(barcodeLine);
                if (config.showPattern) {
                    Bresenham.debug.printPattern(barcodeLine.line, _canvas.dom.pattern);
                }

                for ( i = 0; i < _barcodeReaders.length && result === null; i++) {
                    result = _barcodeReaders[i].decodePattern(barcodeLine.line);
                }
                if(result === null){
                    return null;
                }
                return {
                    codeResult: result,
                    barcodeLine: barcodeLine
                };

            }

            /**
             * This method slices the given area apart and tries to detect a barcode-pattern
             * for each slice. It returns the decoded barcode, or null if nothing was found
             * @param {Array} box
             * @param {Array} line
             * @param {Number} lineAngle
             */
            function tryDecodeBruteForce(box, line, lineAngle) {
                var sideLength = Math.sqrt(Math.pow(box[1][0] - box[0][0], 2) + Math.pow((box[1][1] - box[0][1]), 2)),
                    i,
                    slices = 16,
                    result = null,
                    dir,
                    extension,
                    xdir = Math.sin(lineAngle),
                    ydir = Math.cos(lineAngle);

                for ( i = 1; i < slices && result === null; i++) {
                    // move line perpendicular to angle
                    dir = sideLength / slices * i * (i % 2 === 0 ? -1 : 1);
                    extension = {
                        y : dir * xdir,
                        x : dir * ydir
                    };
                    line[0].y += extension.x;
                    line[0].x -= extension.y;
                    line[1].y += extension.x;
                    line[1].x -= extension.y;

                    result = tryDecode(line);
                }
                return result;
            }

            function getLineLength(line) {
                return Math.sqrt(
                    Math.pow(Math.abs(line[1].y - line[0].y), 2) +
                    Math.pow(Math.abs(line[1].x - line[0].x), 2));
            }

            /**
             * With the help of the configured readers (Code128 or EAN) this function tries to detect a
             * valid barcode pattern within the given area.
             * @param {Object} box The area to search in
             * @returns {Object} the result {codeResult, line, angle, pattern, threshold}
             */
            function decodeFromBoundingBox(box) {
                var line,
                    lineAngle,
                    ctx = _canvas.ctx.overlay,
                    result,
                    lineLength;

                if (config.drawBoundingBox && ctx) {
                    ImageDebug.drawPath(box, {x: 0, y: 1}, ctx, {color: "blue", lineWidth: 2});
                }

                line = getLine(box);
                lineLength = getLineLength(line);
                lineAngle = Math.atan2(line[1].y - line[0].y, line[1].x - line[0].x);
                line = getExtendedLine(line, lineAngle, Math.floor(lineLength*0.1));
                if(line === null){
                    return null;
                }

                result = tryDecode(line);
                if(result === null) {
                    result = tryDecodeBruteForce(box, line, lineAngle);
                }

                if(result === null) {
                    return null;
                }

                if (result && config.drawScanline && ctx) {
                    ImageDebug.drawPath(line, {x: 'x', y: 'y'}, ctx, {color: 'red', lineWidth: 3});
                }

                return {
                    codeResult : result.codeResult,
                    line : line,
                    angle : lineAngle,
                    pattern : result.barcodeLine.line,
                    threshold : result.barcodeLine.threshold
                };
            }

            return {
                decodeFromBoundingBox : function(box) {
                    return decodeFromBoundingBox(box);
                },
                decodeFromBoundingBoxes : function(boxes) {
                    var i, result;
                    for ( i = 0; i < boxes.length; i++) {
                        result = decodeFromBoundingBox(boxes[i]);
                        if (result && result.codeResult) {
                            result.box = boxes[i];
                            return result;
                        }
                    }
                },
                setReaders: function(readers) {
                    config.readers = readers;
                    _barcodeReaders.length = 0;
                    initReaders();
                }
            };
        }
    };

    return (BarcodeDecoder);
});

/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

define('frame_grabber',["cv_utils"], function(CVUtils) {
    "use strict";

    var FrameGrabber = {};

    FrameGrabber.create = function(inputStream, canvas) {
        var _that = {},
            _streamConfig = inputStream.getConfig(),
            _video_size = CVUtils.imageRef(inputStream.getRealWidth(), inputStream.getRealHeight()),
            _canvasSize = inputStream.getCanvasSize(),
            _size = CVUtils.imageRef(inputStream.getWidth(), inputStream.getHeight()),
            topRight = inputStream.getTopRight(),
            _sx = topRight.x,
            _sy = topRight.y,
            _canvas,
            _ctx = null,
            _data = null;

        _canvas = canvas ? canvas : document.createElement("canvas");
        _canvas.width = _canvasSize.x;
        _canvas.height = _canvasSize.y;
        _ctx = _canvas.getContext("2d");
        _data = new Uint8Array(_size.x * _size.y);
        console.log("FrameGrabber", JSON.stringify({
            size: _size,
            topRight: topRight,
            videoSize: _video_size,
            canvasSize: _canvasSize
        }));

        /**
         * Uses the given array as frame-buffer 
         */
        _that.attachData = function(data) {
            _data = data;
        };

        /**
         * Returns the used frame-buffer
         */
        _that.getData = function() {
            return _data;
        };

        /**
         * Fetches a frame from the input-stream and puts into the frame-buffer.
         * The image-data is converted to gray-scale and then half-sampled if configured.
         */
        _that.grab = function() {
            var doHalfSample = _streamConfig.halfSample,
                frame = inputStream.getFrame(),
                ctxData;
            if (frame) {
                _ctx.drawImage(frame, 0, 0, _canvasSize.x, _canvasSize.y);
                ctxData = _ctx.getImageData(_sx, _sy, _size.x, _size.y).data;
                if(doHalfSample){
                    CVUtils.grayAndHalfSampleFromCanvasData(ctxData, _size, _data);
                } else {
                    CVUtils.computeGray(ctxData, _data, _streamConfig);
                }
                return true;
            } else {
                return false;
            }
        };

        _that.getSize = function() {
            return _size;
        };

        return _that;
    };

    return (FrameGrabber);
});

/**
 * The basic configuration
 */

define('config',[],function(){
  var config = {
      inputStream: { name: "Live",
          type: "LiveStream",
          constraints: {
              width: 640,
              height: 480,
              minAspectRatio: 0,
              maxAspectRatio: 100,
              facing: "environment" // or user
          },
          area: {
              top: "0%",
              right: "0%",
              left: "0%",
              bottom: "0%"
          },
          singleChannel: false // true: only the red color-channel is read
      },
      tracking: false,
      debug: false,
      controls: false,
      locate: true,
      numOfWorkers: 4,
      visual: {
        show: true
      },
      decoder:{
        drawBoundingBox: false,
        showFrequency: false,
        drawScanline: false,
        showPattern: false,
        readers: [
          'code_128_reader'
        ]
      },
      locator: {
        halfSample: true,
        patchSize: "medium", // x-small, small, medium, large, x-large
        showCanvas: false,
        showPatches: false,
        showFoundPatches: false,
        showSkeleton: false,
        showLabels: false,
        showPatchLabels: false,
        showRemainingPatchLabels: false,
        boxFromPatches: {
          showTransformed: false,
          showTransformedBox: false,
          showBB: false
        }
      }
   };

   return config;
});

/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

define('events',[],function() {
    "use strict";

    var _events = function() {
        var events = {};

        function getEvent(eventName) {
            if (!events[eventName]) {
                events[eventName] = {
                    subscribers : []
                };
            }
            return events[eventName];
        }
        
        function clearEvents(){
            events = {};
        }

        function publishSubscription(subscription, data) {
            if (subscription.async) {
                setTimeout(function() {
                    subscription.callback(data);
                }, 4);
            } else {
                subscription.callback(data);
            }
        }
        
        function subscribe(event, callback, async) {
            var subscription;

            if ( typeof callback === "function") {
                subscription = {
                    callback : callback,
                    async : async
                };
            } else {
                subscription = callback;
                if (!subscription.callback) {
                    throw "Callback was not specified on options";
                }
            }

            getEvent(event).subscribers.push(subscription);
        }

        return {
            subscribe : function(event, callback, async) {
                return subscribe(event, callback, async);
            },
            publish : function(eventName, data) {
                var event = getEvent(eventName),
                    subscribers = event.subscribers;
                    
                event.subscribers = subscribers.filter(function(subscriber) {
                    publishSubscription(subscriber, data);
                    return !subscriber.once;
                });
            },
            once: function(event, callback, async) {
                subscribe(event, {
                    callback: callback,
                    async: async,
                    once: true
                });
            },
            unsubscribe: function(eventName, callback) {
                var event;
                
                if (eventName) {
                    event = getEvent(eventName);
                    if (event && callback) {
                        event.subscribers = event.subscribers.filter(function(subscriber){
                            return subscriber.callback !== callback;
                        });
                    } else {
                        event.subscribers = [];
                    }
                } else {
                    clearEvents();
                }
            }
        };
    }();

    return _events;
}); 
/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define, MediaStreamTrack */

define('camera_access',["html_utils"], function(HtmlUtils) {
    "use strict";
    var streamRef,
        loadedDataHandler;

    /**
     * Wraps browser-specific getUserMedia
     * @param {Object} constraints
     * @param {Object} success Callback
     * @param {Object} failure Callback
     */
    function getUserMedia(constraints, success, failure) {
        if (typeof navigator.getUserMedia !== 'undefined') {
            navigator.getUserMedia(constraints, function (stream) {
                streamRef = stream;
                var videoSrc = (window.URL && window.URL.createObjectURL(stream)) || stream;
                success.apply(null, [videoSrc]);
            }, failure);
        } else {
            failure(new TypeError("getUserMedia not available"));
        }
    }

    function loadedData(video, callback) {
        var attempts = 10;

        function checkVideo() {
            if (attempts > 0) {
                if (video.videoWidth > 0 && video.videoHeight > 0) {
                    console.log(video.videoWidth + "px x " + video.videoHeight + "px");
                    callback();
                } else {
                    window.setTimeout(checkVideo, 500);
                }
            } else {
                callback('Unable to play video stream. Is webcam working?');
            }
            attempts--;
        }
        checkVideo();
    }

    /**
     * Tries to attach the camera-stream to a given video-element
     * and calls the callback function when the content is ready
     * @param {Object} constraints
     * @param {Object} video
     * @param {Object} callback
     */
    function initCamera(constraints, video, callback) {
        getUserMedia(constraints, function(src) {
            video.src = src;
            if (loadedDataHandler) {
                video.removeEventListener("loadeddata", loadedDataHandler, false);
            }
            loadedDataHandler = loadedData.bind(null, video, callback);
            video.addEventListener('loadeddata', loadedDataHandler, false);
            video.play();
        }, function(e) {
            callback(e);
        });
    }

    /**
     * Normalizes the incoming constraints to satisfy the current browser
     * @param config
     * @param cb Callback which is called whenever constraints are created
     * @returns {*}
     */
    function normalizeConstraints(config, cb) {
        var constraints = {
                audio: false,
                video: true
            },
            videoConstraints = HtmlUtils.mergeObjects({
                width: 640,
                height: 480,
                minAspectRatio: 0,
                maxAspectRatio: 100,
                facing: "environment"
            }, config);

        if ( typeof MediaStreamTrack !== 'undefined' && typeof MediaStreamTrack.getSources !== 'undefined') {
            MediaStreamTrack.getSources(function(sourceInfos) {
                var videoSourceId;
                for (var i = 0; i != sourceInfos.length; ++i) {
                    var sourceInfo = sourceInfos[i];
                    if (sourceInfo.kind == "video" && sourceInfo.facing == videoConstraints.facing) {
                        videoSourceId = sourceInfo.id;
                    }
                }
                constraints.video = {
                    mandatory: {
                        minWidth: videoConstraints.width,
                        minHeight: videoConstraints.height,
                        minAspectRatio: videoConstraints.minAspectRatio,
                        maxAspectRatio: videoConstraints.maxAspectRatio
                    },
                    optional: [{
                        sourceId: videoSourceId
                    }]
                };
                return cb(constraints);
            });
        } else {
            constraints.video = {
                mediaSource: "camera",
                width: { min: videoConstraints.width, max: videoConstraints.width },
                height: { min: videoConstraints.height, max: videoConstraints.height },
                require: ["width", "height"]
            };
            return cb(constraints);
        }
    }

    /**
     * Requests the back-facing camera of the user. The callback is called
     * whenever the stream is ready to be consumed, or if an error occures.
     * @param {Object} video
     * @param {Object} callback
     */
    function request(video, videoConstraints, callback) {
        normalizeConstraints(videoConstraints, function(constraints) {
            initCamera(constraints, video, callback);
        });
    }

    return {
        request : function(video, constraints, callback) {
            request(video, constraints, callback);
        },
        release : function() {
            var tracks = streamRef && streamRef.getVideoTracks();
            if (tracks.length) {
                tracks[0].stop();
            }
            streamRef = null;
        }
    };
});

/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

define('result_collector',["image_debug"], function(ImageDebug) {
    "use strict";

    function contains(codeResult, list) {
        if (list) {
            return list.some(function (item) {
                return Object.keys(item).every(function (key) {
                    return item[key] === codeResult[key];
                });
            });
        }
        return false;
    }

    function passesFilter(codeResult, filter) {
        if (typeof filter === 'function') {
            return filter(codeResult);
        }
        return true;
    }

    return {
        create: function(config) {
            var canvas = document.createElement("canvas"),
                ctx = canvas.getContext("2d"),
                results = [],
                capacity = config.capacity || 20,
                capture = config.capture === true;

            function matchesConstraints(codeResult) {
                return capacity && codeResult && !contains(codeResult, config.blacklist) && passesFilter(codeResult, config.filter);
            }

            return {
                addResult: function(data, imageSize, codeResult) {
                    var result = {};

                    if (matchesConstraints(codeResult)) {
                        capacity--;
                        result.codeResult = codeResult;
                        if (capture) {
                            canvas.width = imageSize.x;
                            canvas.height = imageSize.y;
                            ImageDebug.drawImage(data, imageSize, ctx);
                            result.frame = canvas.toDataURL();
                        }
                        results.push(result);
                    }
                },
                getResults: function() {
                    return results;
                }
            };
        }
    };
});

/* jshint undef: true, unused: true, browser:true, devel: true, evil: true */
/* global define */
define('quagga',[
        "input_stream",
        "image_wrapper",
        "barcode_locator",
        "barcode_decoder",
        "frame_grabber",
        "html_utils",
        "config",
        "events",
        "camera_access",
        "image_debug",
        "gl-matrix",
        "result_collector"],
function(InputStream,
         ImageWrapper,
         BarcodeLocator,
         BarcodeDecoder,
         FrameGrabber,
         HtmlUtils,
         _config,
         Events,
         CameraAccess,
         ImageDebug,
         glMatrix,
         ResultCollector) {
    "use strict";
    
    var _inputStream,
        _framegrabber,
        _stopped,
        _canvasContainer = {
            ctx : {
                image : null,
                overlay : null
            },
            dom : {
                image : null,
                overlay : null
            }
        },
        _inputImageWrapper,
        _boxSize,
        _decoder,
        _workerPool = [],
        _onUIThread = true,
        vec2 = glMatrix.vec2,
        _resultCollector;

    function initializeData(imageWrapper) {
        initBuffers(imageWrapper);
        _decoder = BarcodeDecoder.create(_config.decoder, _inputImageWrapper);
    }

    function initConfig() {
        if (typeof document !== "undefined") {
            var vis = [{
                node: document.querySelector("div[data-controls]"),
                prop: _config.controls
            }, {
                node: _canvasContainer.dom.overlay,
                prop: _config.visual.show
            }];

            for (var i = 0; i < vis.length; i++) {
                if (vis[i].node) {
                    if (vis[i].prop === true) {
                        vis[i].node.style.display = "block";
                    } else {
                        vis[i].node.style.display = "none";
                    }
                }
            }
        }
    }

    function initInputStream(cb) {
        var video;
        if (_config.inputStream.type == "VideoStream") {
            video = document.createElement("video");
            _inputStream = InputStream.createVideoStream(video);
        } else if (_config.inputStream.type == "ImageStream") {
            _inputStream = InputStream.createImageStream();
        } else if (_config.inputStream.type == "LiveStream") {
            var $viewport = document.querySelector("#interactive.viewport");
            if ($viewport) {
                video = $viewport.querySelector("video");
                if (!video) {
                    video = document.createElement("video");
                    $viewport.appendChild(video);
                }
            }
            _inputStream = InputStream.createLiveStream(video);
            CameraAccess.request(video, _config.inputStream.constraints, function(err) {
                if (!err) {
                    _inputStream.trigger("canrecord");
                } else {
                    return cb(err);
                }
            });
        }

        _inputStream.setAttribute("preload", "auto");
        _inputStream.setAttribute("autoplay", true);
        _inputStream.setInputStream(_config.inputStream);
        _inputStream.addEventListener("canrecord", canRecord.bind(undefined, cb));
    }

    function canRecord(cb) {
        BarcodeLocator.checkImageConstraints(_inputStream, _config.locator);
        initCanvas();
        _framegrabber = FrameGrabber.create(_inputStream, _canvasContainer.dom.image);
        initConfig();

        if (_config.numOfWorkers > 0) {
            initWorkers(function() {
                console.log("Workers created");
                ready(cb);
            });
        } else {
            initializeData();
            ready(cb);
        }
    }

    function ready(cb){
        _inputStream.play();
        cb();
    }

    function initCanvas() {
        if (typeof document !== "undefined") {
            var $viewport = document.querySelector("#interactive.viewport");
            _canvasContainer.dom.image = document.querySelector("canvas.imgBuffer");
            if (!_canvasContainer.dom.image) {
                _canvasContainer.dom.image = document.createElement("canvas");
                _canvasContainer.dom.image.className = "imgBuffer";
                if ($viewport && _config.inputStream.type == "ImageStream") {
                    $viewport.appendChild(_canvasContainer.dom.image);
                }
            }
            _canvasContainer.ctx.image = _canvasContainer.dom.image.getContext("2d");
            _canvasContainer.dom.image.width = _inputStream.getCanvasSize().x;
            _canvasContainer.dom.image.height = _inputStream.getCanvasSize().y;

            _canvasContainer.dom.overlay = document.querySelector("canvas.drawingBuffer");
            if (!_canvasContainer.dom.overlay) {
                _canvasContainer.dom.overlay = document.createElement("canvas");
                _canvasContainer.dom.overlay.className = "drawingBuffer";
                if ($viewport) {
                    $viewport.appendChild(_canvasContainer.dom.overlay);
                }
                var clearFix = document.createElement("br");
                clearFix.setAttribute("clear", "all");
                if ($viewport) {
                    $viewport.appendChild(clearFix);
                }
            }
            _canvasContainer.ctx.overlay = _canvasContainer.dom.overlay.getContext("2d");
            _canvasContainer.dom.overlay.width = _inputStream.getCanvasSize().x;
            _canvasContainer.dom.overlay.height = _inputStream.getCanvasSize().y;
        }
    }

    function initBuffers(imageWrapper) {
        if (imageWrapper) {
            _inputImageWrapper = imageWrapper;
        } else {
            _inputImageWrapper = new ImageWrapper({
                x : _inputStream.getWidth(),
                y : _inputStream.getHeight()
            });
        }

        console.log(_inputImageWrapper.size);
        _boxSize = [
                vec2.clone([0, 0]),
                vec2.clone([0, _inputImageWrapper.size.y]),
                vec2.clone([_inputImageWrapper.size.x, _inputImageWrapper.size.y]),
                vec2.clone([_inputImageWrapper.size.x, 0])
            ];
        BarcodeLocator.init(_inputImageWrapper, _config.locator);
    }

    function getBoundingBoxes() {
        if (_config.locate) {
            return BarcodeLocator.locate();
        } else {
            return [[
                vec2.clone(_boxSize[0]),
                vec2.clone(_boxSize[1]),
                vec2.clone(_boxSize[2]),
                vec2.clone(_boxSize[3])]];
        }
    }

    function transformResult(result) {
        var topRight = _inputStream.getTopRight(),
            xOffset = topRight.x,
            yOffset = topRight.y,
            i;

        if (!result || (xOffset === 0 && yOffset === 0)) {
            return;
        }


        if (result.line && result.line.length === 2) {
            moveLine(result.line);
        }
        if (result.boxes && result.boxes.length > 0) {
            for (i = 0; i < result.boxes.length; i++) {
                moveBox(result.boxes[i]);
            }
        }

        function moveBox(box) {
            var corner = box.length;

            while(corner--) {
                box[corner][0] += xOffset;
                box[corner][1] += yOffset;
            }
        }

        function moveLine(line) {
            line[0].x += xOffset;
            line[0].y += yOffset;
            line[1].x += xOffset;
            line[1].y += yOffset;
        }
    }

    function publishResult(result, imageData) {
        if (_onUIThread) {
            transformResult(result);
            if (imageData && result && result.codeResult) {
                if (_resultCollector) {
                    _resultCollector.addResult(imageData, _inputStream.getCanvasSize(), result.codeResult);
                }
            }
        }

        Events.publish("processed", result);
        if (result && result.codeResult) {
            Events.publish("detected", result);
        }
    }

    function locateAndDecode() {
        var result,
            boxes;

        boxes = getBoundingBoxes();
        if (boxes) {
            result = _decoder.decodeFromBoundingBoxes(boxes);
            result = result || {};
            result.boxes = boxes;
            publishResult(result, _inputImageWrapper.data);
        } else {
            publishResult();
        }
    }

    function update() {
        var availableWorker;

        if (_onUIThread) {
            if (_workerPool.length > 0) {
                availableWorker = _workerPool.filter(function(workerThread) {
                    return !workerThread.busy;
                })[0];
                if (availableWorker) {
                    _framegrabber.attachData(availableWorker.imageData);
                } else {
                    return; // all workers are busy
                }
            } else {
                _framegrabber.attachData(_inputImageWrapper.data);
            }
            if (_framegrabber.grab()) {
                if (availableWorker) {
                    availableWorker.busy = true;
                    availableWorker.worker.postMessage({
                        cmd: 'process',
                        imageData: availableWorker.imageData
                    }, [availableWorker.imageData.buffer]);
                } else {
                    locateAndDecode();
                }
            }
        } else {
            locateAndDecode();
        }
    }

    function start() {
        _stopped = false;
        ( function frame() {
            if (!_stopped) {
                update();
                if (_onUIThread && _config.inputStream.type == "LiveStream") {
                    window.requestAnimFrame(frame);
                }
            }
        }());
    }

    function initWorkers(cb) {
        var i;
        _workerPool = [];

        for (i = 0; i < _config.numOfWorkers; i++) {
            initWorker(workerInitialized);
        }

        function workerInitialized(workerThread) {
            _workerPool.push(workerThread);
            if (_workerPool.length >= _config.numOfWorkers){
                cb();
            }
        }
    }

    function initWorker(cb) {
        var blobURL,
            workerThread = {
                worker: undefined,
                imageData: new Uint8Array(_inputStream.getWidth() * _inputStream.getHeight()),
                busy: true
            };

        blobURL = generateWorkerBlob();
        workerThread.worker = new Worker(blobURL);

        workerThread.worker.onmessage = function(e) {
            if (e.data.event === 'initialized') {
                URL.revokeObjectURL(blobURL);
                workerThread.busy = false;
                workerThread.imageData = new Uint8Array(e.data.imageData);
                console.log("Worker initialized");
                return cb(workerThread);
            } else if (e.data.event === 'processed') {
                workerThread.imageData = new Uint8Array(e.data.imageData);
                workerThread.busy = false;
                publishResult(e.data.result, workerThread.imageData);
            } else if (e.data.event === 'error') {
                console.log("Worker error: " + e.data.message);
            }
        };

        workerThread.worker.postMessage({
            cmd: 'init',
            size: {x: _inputStream.getWidth(), y: _inputStream.getHeight()},
            imageData: workerThread.imageData,
            config: _config
        }, [workerThread.imageData.buffer]);
    }


    function workerInterface(factory) {
        if (factory) {
            /* jshint ignore:start */
            var Quagga = factory();
            if (!Quagga) {
                self.postMessage({'event': 'error', message: 'Quagga could not be created'});
                return;
            }
            /* jshint ignore:end */
        }
        /* jshint ignore:start */
        var imageWrapper;

        self.onmessage = function(e) {
            if (e.data.cmd === 'init') {
                var config = e.data.config;
                config.numOfWorkers = 0;
                imageWrapper = new Quagga.ImageWrapper({
                    x : e.data.size.x,
                    y : e.data.size.y
                }, new Uint8Array(e.data.imageData));
                Quagga.init(config, ready, imageWrapper);
                Quagga.onProcessed(onProcessed);
            } else if (e.data.cmd === 'process') {
                imageWrapper.data = new Uint8Array(e.data.imageData);
                Quagga.start();
            } else if (e.data.cmd === 'setReaders') {
                Quagga.setReaders(e.data.readers);
            }
        };

        function onProcessed(result) {
            self.postMessage({'event': 'processed', imageData: imageWrapper.data, result: result}, [imageWrapper.data.buffer]);
        }

        function ready() {
            self.postMessage({'event': 'initialized', imageData: imageWrapper.data}, [imageWrapper.data.buffer]);
        }
        /* jshint ignore:end */
    }

    function generateWorkerBlob() {
        var blob,
            factorySource;

        /* jshint ignore:start */
        if (typeof __factorySource__ !== 'undefined') {
            factorySource = __factorySource__;
        }
        /* jshint ignore:end */

        blob = new Blob(['(' + workerInterface.toString() + ')(' + factorySource + ');'],
            {type : 'text/javascript'});

        return window.URL.createObjectURL(blob);
    }

    function setReaders(readers) {
        if (_decoder) {
            _decoder.setReaders(readers);
        } else if (_onUIThread && _workerPool.length > 0) {
            _workerPool.forEach(function(workerThread) {
                workerThread.worker.postMessage({cmd: 'setReaders', readers: readers});
            });
        }
    }

    return {
        init : function(config, cb, imageWrapper) {
            _config = HtmlUtils.mergeObjects(_config, config);
            if (imageWrapper) {
                _onUIThread = false;
                initializeData(imageWrapper);
                return cb();
            } else {
                initInputStream(cb);
            }
        },
        start : function() {
            start();
        },
        stop : function() {
            _stopped = true;
            _workerPool.forEach(function(workerThread) {
                workerThread.worker.terminate();
                console.log("Worker terminated!");
            });
            _workerPool.length = 0;
            if (_config.inputStream.type === "LiveStream") {
                CameraAccess.release();
                _inputStream.clearEventHandlers();
            }
        },
        pause: function() {
            _stopped = true;
        },
        onDetected : function(callback) {
            Events.subscribe("detected", callback);
        },
        offDetected: function(callback) {
            Events.unsubscribe("detected", callback);
        },
        onProcessed: function(callback) {
            Events.subscribe("processed", callback);
        },
        offProcessed: function(callback) {
            Events.unsubscribe("processed", callback);
        },
        setReaders: function(readers) {
            setReaders(readers);
        },
        registerResultCollector: function(resultCollector) {
            if (resultCollector && typeof resultCollector.addResult === 'function') {
                _resultCollector = resultCollector;
            }
        },
        canvas : _canvasContainer,
        decodeSingle : function(config, resultCallback) {
            config = HtmlUtils.mergeObjects({
                inputStream: {
                    type : "ImageStream",
                    sequence : false,
                    size: 800,
                    src: config.src
                },
                numOfWorkers: 1,
                locator: {
                    halfSample: false
                }
            }, config);
            this.init(config, function() {
                Events.once("processed", function(result) {
                    _stopped = true;
                    resultCallback.call(null, result);
                }, true);
                start();
            });
        },
        ImageWrapper: ImageWrapper,
        ImageDebug: ImageDebug,
        ResultCollector: ResultCollector
    };
});

    return require('quagga');
}));