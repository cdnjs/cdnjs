(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD.
        define(['react'], factory);
    } else {
        // Browser globals
        root.ReactBootstrap = factory(root.React);
    }
}(this, function (React) {

/**
 * almond 0.1.2 Copyright (c) 2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */
//Going sloppy to avoid 'use strict' string cost, but strict practices should
//be followed.
/*jslint sloppy: true */
/*global setTimeout: false */

var requirejs, require, define;
(function (undef) {
    var defined = {},
        waiting = {},
        config = {},
        defining = {},
        aps = [].slice,
        main, req;

    /**
     * Given a relative module name, like ./something, normalize it to
     * a real name that can be mapped to a path.
     * @param {String} name the relative name
     * @param {String} baseName a real name that the name arg is relative
     * to.
     * @returns {String} normalized name
     */
    function normalize(name, baseName) {
        var baseParts = baseName && baseName.split("/"),
            map = config.map,
            starMap = (map && map['*']) || {},
            nameParts, nameSegment, mapValue, foundMap,
            foundI, foundStarMap, starI, i, j, part;

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

                name = baseParts.concat(name.split("/"));

                //start trimDots
                for (i = 0; (part = name[i]); i++) {
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
                            return true;
                        } else if (i > 0) {
                            name.splice(i - 1, 2);
                            i -= 2;
                        }
                    }
                }
                //end trimDots

                name = name.join("/");
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
        if (waiting.hasOwnProperty(name)) {
            var args = waiting[name];
            delete waiting[name];
            defining[name] = true;
            main.apply(undef, args);
        }

        if (!defined.hasOwnProperty(name)) {
            throw new Error('No ' + name);
        }
        return defined[name];
    }

    /**
     * Makes a name map, normalizing the name, and using a plugin
     * for normalization if necessary. Grabs a ref to plugin
     * too, as an optimization.
     */
    function makeMap(name, relName) {
        var prefix, plugin,
            index = name.indexOf('!');

        if (index !== -1) {
            prefix = normalize(name.slice(0, index), relName);
            name = name.slice(index + 1);
            plugin = callDep(prefix);

            //Normalize according
            if (plugin && plugin.normalize) {
                name = plugin.normalize(name, makeNormalize(relName));
            } else {
                name = normalize(name, relName);
            }
        } else {
            name = normalize(name, relName);
        }

        //Using ridiculous property names for space reasons
        return {
            f: prefix ? prefix + '!' + name : name, //fullName
            n: name,
            p: plugin
        };
    }

    function makeConfig(name) {
        return function () {
            return (config && config.config && config.config[name]) || {};
        };
    }

    main = function (name, deps, callback, relName) {
        var args = [],
            usingExports,
            cjsModule, depName, ret, map, i;

        //Use name if no relName
        relName = relName || name;

        //Call the callback to define the module, if necessary.
        if (typeof callback === 'function') {

            //Pull out the defined dependencies and pass the ordered
            //values to the callback.
            //Default to [require, exports, module] if no deps
            deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;
            for (i = 0; i < deps.length; i++) {
                map = makeMap(deps[i], relName);
                depName = map.f;

                //Fast path CommonJS standard dependencies.
                if (depName === "require") {
                    args[i] = makeRequire(name);
                } else if (depName === "exports") {
                    //CommonJS module spec 1.1
                    args[i] = defined[name] = {};
                    usingExports = true;
                } else if (depName === "module") {
                    //CommonJS module spec 1.1
                    cjsModule = args[i] = {
                        id: name,
                        uri: '',
                        exports: defined[name],
                        config: makeConfig(name)
                    };
                } else if (defined.hasOwnProperty(depName) || waiting.hasOwnProperty(depName)) {
                    args[i] = callDep(depName);
                } else if (map.p) {
                    map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
                    args[i] = defined[depName];
                } else if (!defining[depName]) {
                    throw new Error(name + ' missing ' + depName);
                }
            }

            ret = callback.apply(defined[name], args);

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

    requirejs = require = req = function (deps, callback, relName, forceSync) {
        if (typeof deps === "string") {
            //Just return the module wanted. In this scenario, the
            //deps arg is the module name, and second arg (if passed)
            //is just the relName.
            //Normalize module name, if it contains . or ..
            return callDep(makeMap(deps, callback).f);
        } else if (!deps.splice) {
            //deps is a config object, not an array.
            config = deps;
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

        //Simulate async callback;
        if (forceSync) {
            main(undef, deps, callback, relName);
        } else {
            setTimeout(function () {
                main(undef, deps, callback, relName);
            }, 15);
        }

        return req;
    };

    /**
     * Just drops the config on the floor, but returns req in case
     * the config return value is used.
     */
    req.config = function (cfg) {
        config = cfg;
        return req;
    };

    define = function (name, deps, callback) {

        //This module may not have dependencies
        if (!deps.splice) {
            //deps is not an array, so probably means
            //an object literal or factory function for
            //the value. Adjust args.
            callback = deps;
            deps = [];
        }

        waiting[name] = [name, deps, callback];
    };

    define.amd = {
        jQuery: true
    };
}());

define("almond", function(){});

define('lib/utils/joinClasses',['require','exports','module'],function (require, exports, module) {/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 *
 * This file contains an unmodified version of:
 * https://github.com/facebook/react/blob/v0.12.0/src/utils/joinClasses.js
 *
 * This source code is licensed under the BSD-style license found here:
 * https://github.com/facebook/react/blob/v0.12.0/LICENSE
 * An additional grant of patent rights can be found here:
 * https://github.com/facebook/react/blob/v0.12.0/PATENTS
 */



/**
 * Combines multiple className strings into one.
 * http://jsperf.com/joinclasses-args-vs-array
 *
 * @param {...?string} classes
 * @return {string}
 */
function joinClasses(className/*, ... */) {
  if (!className) {
    className = '';
  }
  var nextClass;
  var argLength = arguments.length;
  if (argLength > 1) {
    for (var ii = 1; ii < argLength; ii++) {
      nextClass = arguments[ii];
      if (nextClass) {
        className = (className ? className + ' ' : '') + nextClass;
      }
    }
  }
  return className;
}

module.exports = joinClasses;

});

define('lib/utils/classSet',['require','exports','module'],function (require, exports, module) {/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 *
 * This file contains an unmodified version of:
 * https://github.com/facebook/react/blob/v0.12.0/src/vendor/stubs/cx.js
 *
 * This source code is licensed under the BSD-style license found here:
 * https://github.com/facebook/react/blob/v0.12.0/LICENSE
 * An additional grant of patent rights can be found here:
 * https://github.com/facebook/react/blob/v0.12.0/PATENTS
 */

/**
 * This function is used to mark string literals representing CSS class names
 * so that they can be transformed statically. This allows for modularization
 * and minification of CSS class names.
 *
 * In static_upstream, this function is actually implemented, but it should
 * eventually be replaced with something more descriptive, and the transform
 * that is used in the main stack should be ported for use elsewhere.
 *
 * @param string|object className to modularize, or an object of key/values.
 *                      In the object case, the values are conditions that
 *                      determine if the className keys should be included.
 * @param [string ...]  Variable list of classNames in the string case.
 * @return string       Renderable space-separated CSS className.
 */
function cx(classNames) {
  if (typeof classNames == 'object') {
    return Object.keys(classNames).filter(function(className) {
      return classNames[className];
    }).join(' ');
  } else {
    return Array.prototype.join.call(arguments, ' ');
  }
}

module.exports = cx;
});

define('lib/utils/Object.assign',['require','exports','module'],function (require, exports, module) {/**
 * Copyright 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This file contains an unmodified version of:
 * https://github.com/facebook/react/blob/v0.12.0/src/vendor/stubs/Object.assign.js
 *
 * This source code is licensed under the BSD-style license found here:
 * https://github.com/facebook/react/blob/v0.12.0/LICENSE
 * An additional grant of patent rights can be found here:
 * https://github.com/facebook/react/blob/v0.12.0/PATENTS
 */

// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.assign

function assign(target, sources) {
  if (target == null) {
    throw new TypeError('Object.assign target cannot be null or undefined');
  }

  var to = Object(target);
  var hasOwnProperty = Object.prototype.hasOwnProperty;

  for (var nextIndex = 1; nextIndex < arguments.length; nextIndex++) {
    var nextSource = arguments[nextIndex];
    if (nextSource == null) {
      continue;
    }

    var from = Object(nextSource);

    // We don't currently support accessors nor proxies. Therefore this
    // copy cannot throw. If we ever supported this then we must handle
    // exceptions and side-effects. We don't support symbols so they won't
    // be transferred.

    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }
  }

  return to;
};

module.exports = assign;

});

define('lib/utils/cloneWithProps',['require','exports','module','react','./joinClasses','./Object.assign'],function (require, exports, module) {/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 *
 * This file contains modified versions of:
 * https://github.com/facebook/react/blob/v0.12.0/src/utils/cloneWithProps.js
 * https://github.com/facebook/react/blob/v0.12.0/src/core/ReactPropTransferer.js
 *
 * This source code is licensed under the BSD-style license found here:
 * https://github.com/facebook/react/blob/v0.12.0/LICENSE
 * An additional grant of patent rights can be found here:
 * https://github.com/facebook/react/blob/v0.12.0/PATENTS
 *
 * TODO: This should be replaced as soon as cloneWithProps is available via
 *  the core React package or a separate package.
 *  @see https://github.com/facebook/react/issues/1906
 */

var React = require('react');
var joinClasses = require('./joinClasses');
var assign = require("./Object.assign");

/**
 * Creates a transfer strategy that will merge prop values using the supplied
 * `mergeStrategy`. If a prop was previously unset, this just sets it.
 *
 * @param {function} mergeStrategy
 * @return {function}
 */
function createTransferStrategy(mergeStrategy) {
  return function(props, key, value) {
    if (!props.hasOwnProperty(key)) {
      props[key] = value;
    } else {
      props[key] = mergeStrategy(props[key], value);
    }
  };
}

var transferStrategyMerge = createTransferStrategy(function(a, b) {
  // `merge` overrides the first object's (`props[key]` above) keys using the
  // second object's (`value`) keys. An object's style's existing `propA` would
  // get overridden. Flip the order here.
  return assign({}, b, a);
});

function emptyFunction() {}

/**
 * Transfer strategies dictate how props are transferred by `transferPropsTo`.
 * NOTE: if you add any more exceptions to this list you should be sure to
 * update `cloneWithProps()` accordingly.
 */
var TransferStrategies = {
  /**
   * Never transfer `children`.
   */
  children: emptyFunction,
  /**
   * Transfer the `className` prop by merging them.
   */
  className: createTransferStrategy(joinClasses),
  /**
   * Transfer the `style` prop (which is an object) by merging them.
   */
  style: transferStrategyMerge
};

/**
 * Mutates the first argument by transferring the properties from the second
 * argument.
 *
 * @param {object} props
 * @param {object} newProps
 * @return {object}
 */
function transferInto(props, newProps) {
  for (var thisKey in newProps) {
    if (!newProps.hasOwnProperty(thisKey)) {
      continue;
    }

    var transferStrategy = TransferStrategies[thisKey];

    if (transferStrategy && TransferStrategies.hasOwnProperty(thisKey)) {
      transferStrategy(props, thisKey, newProps[thisKey]);
    } else if (!props.hasOwnProperty(thisKey)) {
      props[thisKey] = newProps[thisKey];
    }
  }
  return props;
}

/**
 * Merge two props objects using TransferStrategies.
 *
 * @param {object} oldProps original props (they take precedence)
 * @param {object} newProps new props to merge in
 * @return {object} a new object containing both sets of props merged.
 */
function mergeProps(oldProps, newProps) {
  return transferInto(assign({}, oldProps), newProps);
}


var ReactPropTransferer = {
  mergeProps: mergeProps
};

var CHILDREN_PROP = 'children';

/**
 * Sometimes you want to change the props of a child passed to you. Usually
 * this is to add a CSS class.
 *
 * @param {object} child child component you'd like to clone
 * @param {object} props props you'd like to modify. They will be merged
 * as if you used `transferPropsTo()`.
 * @return {object} a clone of child with props merged in.
 */
function cloneWithProps(child, props) {
  var newProps = ReactPropTransferer.mergeProps(props, child.props);

  // Use `child.props.children` if it is provided.
  if (!newProps.hasOwnProperty(CHILDREN_PROP) &&
    child.props.hasOwnProperty(CHILDREN_PROP)) {
    newProps.children = child.props.children;
  }

  if (React.version.substr(0, 4) === '0.12'){
    var mockLegacyFactory = function(){};
    mockLegacyFactory.isReactLegacyFactory = true;
    mockLegacyFactory.type = child.type;

    return React.createElement(mockLegacyFactory, newProps);
  }

  // The current API doesn't retain _owner and _context, which is why this
  // doesn't use ReactElement.cloneAndReplaceProps.
  return React.createElement(child.type, newProps);
}

module.exports = cloneWithProps;
});

define('lib/constants',['require','exports','module'],function (require, exports, module) {module.exports = {
  CLASSES: {
    'alert': 'alert',
    'button': 'btn',
    'button-group': 'btn-group',
    'button-toolbar': 'btn-toolbar',
    'column': 'col',
    'input-group': 'input-group',
    'form': 'form',
    'glyphicon': 'glyphicon',
    'label': 'label',
    'list-group-item': 'list-group-item',
    'panel': 'panel',
    'panel-group': 'panel-group',
    'progress-bar': 'progress-bar',
    'nav': 'nav',
    'navbar': 'navbar',
    'modal': 'modal',
    'row': 'row',
    'well': 'well'
  },
  STYLES: {
    'default': 'default',
    'primary': 'primary',
    'success': 'success',
    'info': 'info',
    'warning': 'warning',
    'danger': 'danger',
    'link': 'link',
    'inline': 'inline',
    'tabs': 'tabs',
    'pills': 'pills'
  },
  SIZES: {
    'large': 'lg',
    'medium': 'md',
    'small': 'sm',
    'xsmall': 'xs'
  },
  GLYPHS: [
    'asterisk',
    'plus',
    'euro',
    'eur',
    'minus',
    'cloud',
    'envelope',
    'pencil',
    'glass',
    'music',
    'search',
    'heart',
    'star',
    'star-empty',
    'user',
    'film',
    'th-large',
    'th',
    'th-list',
    'ok',
    'remove',
    'zoom-in',
    'zoom-out',
    'off',
    'signal',
    'cog',
    'trash',
    'home',
    'file',
    'time',
    'road',
    'download-alt',
    'download',
    'upload',
    'inbox',
    'play-circle',
    'repeat',
    'refresh',
    'list-alt',
    'lock',
    'flag',
    'headphones',
    'volume-off',
    'volume-down',
    'volume-up',
    'qrcode',
    'barcode',
    'tag',
    'tags',
    'book',
    'bookmark',
    'print',
    'camera',
    'font',
    'bold',
    'italic',
    'text-height',
    'text-width',
    'align-left',
    'align-center',
    'align-right',
    'align-justify',
    'list',
    'indent-left',
    'indent-right',
    'facetime-video',
    'picture',
    'map-marker',
    'adjust',
    'tint',
    'edit',
    'share',
    'check',
    'move',
    'step-backward',
    'fast-backward',
    'backward',
    'play',
    'pause',
    'stop',
    'forward',
    'fast-forward',
    'step-forward',
    'eject',
    'chevron-left',
    'chevron-right',
    'plus-sign',
    'minus-sign',
    'remove-sign',
    'ok-sign',
    'question-sign',
    'info-sign',
    'screenshot',
    'remove-circle',
    'ok-circle',
    'ban-circle',
    'arrow-left',
    'arrow-right',
    'arrow-up',
    'arrow-down',
    'share-alt',
    'resize-full',
    'resize-small',
    'exclamation-sign',
    'gift',
    'leaf',
    'fire',
    'eye-open',
    'eye-close',
    'warning-sign',
    'plane',
    'calendar',
    'random',
    'comment',
    'magnet',
    'chevron-up',
    'chevron-down',
    'retweet',
    'shopping-cart',
    'folder-close',
    'folder-open',
    'resize-vertical',
    'resize-horizontal',
    'hdd',
    'bullhorn',
    'bell',
    'certificate',
    'thumbs-up',
    'thumbs-down',
    'hand-right',
    'hand-left',
    'hand-up',
    'hand-down',
    'circle-arrow-right',
    'circle-arrow-left',
    'circle-arrow-up',
    'circle-arrow-down',
    'globe',
    'wrench',
    'tasks',
    'filter',
    'briefcase',
    'fullscreen',
    'dashboard',
    'paperclip',
    'heart-empty',
    'link',
    'phone',
    'pushpin',
    'usd',
    'gbp',
    'sort',
    'sort-by-alphabet',
    'sort-by-alphabet-alt',
    'sort-by-order',
    'sort-by-order-alt',
    'sort-by-attributes',
    'sort-by-attributes-alt',
    'unchecked',
    'expand',
    'collapse-down',
    'collapse-up',
    'log-in',
    'flash',
    'log-out',
    'new-window',
    'record',
    'save',
    'open',
    'saved',
    'import',
    'export',
    'send',
    'floppy-disk',
    'floppy-saved',
    'floppy-remove',
    'floppy-save',
    'floppy-open',
    'credit-card',
    'transfer',
    'cutlery',
    'header',
    'compressed',
    'earphone',
    'phone-alt',
    'tower',
    'stats',
    'sd-video',
    'hd-video',
    'subtitles',
    'sound-stereo',
    'sound-dolby',
    'sound-5-1',
    'sound-6-1',
    'sound-7-1',
    'copyright-mark',
    'registration-mark',
    'cloud-download',
    'cloud-upload',
    'tree-conifer',
    'tree-deciduous',
    'cd',
    'save-file',
    'open-file',
    'level-up',
    'copy',
    'paste',
    'alert',
    'equalizer',
    'king',
    'queen',
    'pawn',
    'bishop',
    'knight',
    'baby-formula',
    'tent',
    'blackboard',
    'bed',
    'apple',
    'erase',
    'hourglass',
    'lamp',
    'duplicate',
    'piggy-bank',
    'scissors',
    'bitcoin',
    'yen',
    'ruble',
    'scale',
    'ice-lolly',
    'ice-lolly-tasted',
    'education',
    'option-horizontal',
    'option-vertical',
    'menu-hamburger',
    'modal-window',
    'oil',
    'grain',
    'sunglasses',
    'text-size',
    'text-color',
    'text-background',
    'object-align-top',
    'object-align-bottom',
    'object-align-horizontal',
    'object-align-left',
    'object-align-vertical',
    'object-align-right',
    'triangle-right',
    'triangle-left',
    'triangle-bottom',
    'triangle-top',
    'console',
    'superscript',
    'subscript',
    'menu-left',
    'menu-right',
    'menu-down',
    'menu-up'
  ]
};

});

define('lib/BootstrapMixin',['require','exports','module','react','./constants'],function (require, exports, module) {var React = require('react');
var constants = require('./constants');

var BootstrapMixin = {
  propTypes: {
    bsClass: React.PropTypes.oneOf(Object.keys(constants.CLASSES)),
    bsStyle: React.PropTypes.oneOf(Object.keys(constants.STYLES)),
    bsSize: React.PropTypes.oneOf(Object.keys(constants.SIZES))
  },

  getBsClassSet: function () {
    var classes = {};

    var bsClass = this.props.bsClass && constants.CLASSES[this.props.bsClass];
    if (bsClass) {
      classes[bsClass] = true;

      var prefix = bsClass + '-';

      var bsSize = this.props.bsSize && constants.SIZES[this.props.bsSize];
      if (bsSize) {
        classes[prefix + bsSize] = true;
      }

      var bsStyle = this.props.bsStyle && constants.STYLES[this.props.bsStyle];
      if (this.props.bsStyle) {
        classes[prefix + bsStyle] = true;
      }
    }

    return classes;
  }
};

module.exports = BootstrapMixin;
});

define('lib/utils/ValidComponentChildren',['require','exports','module','react'],function (require, exports, module) {var React = require('react');

/**
 * Maps children that are typically specified as `props.children`,
 * but only iterates over children that are "valid components".
 *
 * The mapFunction provided index will be normalised to the components mapped,
 * so an invalid component would not increase the index.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} mapFunction.
 * @param {*} mapContext Context for mapFunction.
 * @return {object} Object containing the ordered map of results.
 */
function mapValidComponents(children, func, context) {
  var index = 0;

  return React.Children.map(children, function (child) {
    if (React.isValidElement(child)) {
      var lastIndex = index;
      index++;
      return func.call(context, child, lastIndex);
    }

    return child;
  });
}

/**
 * Iterates through children that are typically specified as `props.children`,
 * but only iterates over children that are "valid components".
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child with the index reflecting the position relative to "valid components".
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} forEachFunc.
 * @param {*} forEachContext Context for forEachContext.
 */
function forEachValidComponents(children, func, context) {
  var index = 0;

  return React.Children.forEach(children, function (child) {
    if (React.isValidElement(child)) {
      func.call(context, child, index);
      index++;
    }
  });
}

/**
 * Count the number of "valid components" in the Children container.
 *
 * @param {?*} children Children tree container.
 * @returns {number}
 */
function numberOfValidComponents(children) {
  var count = 0;

  React.Children.forEach(children, function (child) {
    if (React.isValidElement(child)) { count++; }
  });

  return count;
}

/**
 * Determine if the Child container has one or more "valid components".
 *
 * @param {?*} children Children tree container.
 * @returns {boolean}
 */
function hasValidComponent(children) {
  var hasValid = false;

  React.Children.forEach(children, function (child) {
    if (!hasValid && React.isValidElement(child)) {
      hasValid = true;
    }
  });

  return hasValid;
}

module.exports = {
  map: mapValidComponents,
  forEach: forEachValidComponents,
  numberOf: numberOfValidComponents,
  hasValidComponent: hasValidComponent
};
});

define('lib/PanelGroup',['require','exports','module','react','./utils/joinClasses','./utils/classSet','./utils/cloneWithProps','./BootstrapMixin','./utils/ValidComponentChildren'],function (require, exports, module) {var React = require('react');
var joinClasses = require('./utils/joinClasses');
var classSet = require('./utils/classSet');
var cloneWithProps = require('./utils/cloneWithProps');

var BootstrapMixin = require('./BootstrapMixin');
var ValidComponentChildren = require('./utils/ValidComponentChildren');

var PanelGroup = React.createClass({displayName: "PanelGroup",
  mixins: [BootstrapMixin],

  propTypes: {
    collapsable: React.PropTypes.bool,
    activeKey: React.PropTypes.any,
    defaultActiveKey: React.PropTypes.any,
    onSelect: React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      bsClass: 'panel-group'
    };
  },

  getInitialState: function () {
    var defaultActiveKey = this.props.defaultActiveKey;

    return {
      activeKey: defaultActiveKey
    };
  },

  render: function () {
    var classes = this.getBsClassSet();
    return (
      React.createElement("div", React.__spread({},  this.props, {className: joinClasses(this.props.className, classSet(classes)), onSelect: null}), 
        ValidComponentChildren.map(this.props.children, this.renderPanel)
      )
    );
  },

  renderPanel: function (child, index) {
    var activeKey =
      this.props.activeKey != null ? this.props.activeKey : this.state.activeKey;

    var props = {
      bsStyle: child.props.bsStyle || this.props.bsStyle,
      key: child.key ? child.key : index,
      ref: child.ref
    };

    if (this.props.accordion) {
      props.collapsable = true;
      props.expanded = (child.props.eventKey === activeKey);
      props.onSelect = this.handleSelect;
    }

    return cloneWithProps(
      child,
      props
    );
  },

  shouldComponentUpdate: function() {
    // Defer any updates to this component during the `onSelect` handler.
    return !this._isChanging;
  },

  handleSelect: function (key) {
    if (this.props.onSelect) {
      this._isChanging = true;
      this.props.onSelect(key);
      this._isChanging = false;
    }

    if (this.state.activeKey === key) {
      key = null;
    }

    this.setState({
      activeKey: key
    });
  }
});

module.exports = PanelGroup;
});

define('lib/Accordion',['require','exports','module','react','./PanelGroup'],function (require, exports, module) {var React = require('react');
var PanelGroup = require('./PanelGroup');

var Accordion = React.createClass({displayName: "Accordion",
  render: function () {
    return (
      React.createElement(PanelGroup, React.__spread({},  this.props, {accordion: true}), 
        this.props.children
      )
    );
  }
});

module.exports = Accordion;
});

define('lib/utils/domUtils',['require','exports','module'],function (require, exports, module) {
/**
 * Shortcut to compute element style
 *
 * @param {HTMLElement} elem
 * @returns {CssStyle}
 */
function getComputedStyles(elem) {
  return elem.ownerDocument.defaultView.getComputedStyle(elem, null);
}

/**
 * Get elements offset
 *
 * TODO: REMOVE JQUERY!
 *
 * @param {HTMLElement} DOMNode
 * @returns {{top: number, left: number}}
 */
function getOffset(DOMNode) {
  if (window.jQuery) {
    return window.jQuery(DOMNode).offset();
  }

  var docElem = document.documentElement;
  var box = { top: 0, left: 0 };

  // If we don't have gBCR, just use 0,0 rather than error
  // BlackBerry 5, iOS 3 (original iPhone)
  if ( typeof DOMNode.getBoundingClientRect !== 'undefined' ) {
    box = DOMNode.getBoundingClientRect();
  }

  return {
    top: box.top + window.pageYOffset - docElem.clientTop,
    left: box.left + window.pageXOffset - docElem.clientLeft
  };
}

/**
 * Get elements position
 *
 * TODO: REMOVE JQUERY!
 *
 * @param {HTMLElement} elem
 * @param {HTMLElement?} offsetParent
 * @returns {{top: number, left: number}}
 */
function getPosition(elem, offsetParent) {
  if (window.jQuery) {
    return window.jQuery(elem).position();
  }

  var offset,
      parentOffset = {top: 0, left: 0};

  // Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
  if (getComputedStyles(elem).position === 'fixed' ) {
    // We assume that getBoundingClientRect is available when computed position is fixed
    offset = elem.getBoundingClientRect();

  } else {
    if (!offsetParent) {
      // Get *real* offsetParent
      offsetParent = offsetParent(elem);
    }

    // Get correct offsets
    offset = getOffset(elem);
    if ( offsetParent.nodeName !== 'HTML') {
      parentOffset = getOffset(offsetParent);
    }

    // Add offsetParent borders
    parentOffset.top += parseInt(getComputedStyles(offsetParent).borderTopWidth, 10);
    parentOffset.left += parseInt(getComputedStyles(offsetParent).borderLeftWidth, 10);
  }

  // Subtract parent offsets and element margins
  return {
    top: offset.top - parentOffset.top - parseInt(getComputedStyles(elem).marginTop, 10),
    left: offset.left - parentOffset.left - parseInt(getComputedStyles(elem).marginLeft, 10)
  };
}

/**
 * Get parent element
 *
 * @param {HTMLElement?} elem
 * @returns {HTMLElement}
 */
function offsetParent(elem) {
  var docElem = document.documentElement;
  var offsetParent = elem.offsetParent || docElem;

  while ( offsetParent && ( offsetParent.nodeName !== 'HTML' &&
    getComputedStyles(offsetParent).position === 'static' ) ) {
    offsetParent = offsetParent.offsetParent;
  }

  return offsetParent || docElem;
}

module.exports = {
  getComputedStyles: getComputedStyles,
  getOffset: getOffset,
  getPosition: getPosition,
  offsetParent: offsetParent
};
});

define('lib/utils/EventListener',['require','exports','module'],function (require, exports, module) {/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * This file contains a modified version of:
 * https://github.com/facebook/react/blob/v0.12.0/src/vendor/stubs/EventListener.js
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * TODO: remove in favour of solution provided by:
 *  https://github.com/facebook/react/issues/285
 */

/**
 * Does not take into account specific nature of platform.
 */
var EventListener = {
  /**
   * Listen to DOM events during the bubble phase.
   *
   * @param {DOMEventTarget} target DOM element to register listener on.
   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
   * @param {function} callback Callback function.
   * @return {object} Object with a `remove` method.
   */
  listen: function(target, eventType, callback) {
    if (target.addEventListener) {
      target.addEventListener(eventType, callback, false);
      return {
        remove: function() {
          target.removeEventListener(eventType, callback, false);
        }
      };
    } else if (target.attachEvent) {
      target.attachEvent('on' + eventType, callback);
      return {
        remove: function() {
          target.detachEvent('on' + eventType, callback);
        }
      };
    }
  }
};

module.exports = EventListener;

});

define('lib/AffixMixin',['require','exports','module','react','./utils/domUtils','./utils/EventListener'],function (require, exports, module) {/* global window, document */

var React = require('react');
var domUtils = require('./utils/domUtils');
var EventListener = require('./utils/EventListener');

var AffixMixin = {
  propTypes: {
    offset: React.PropTypes.number,
    offsetTop: React.PropTypes.number,
    offsetBottom: React.PropTypes.number
  },

  getInitialState: function () {
    return {
      affixClass: 'affix-top'
    };
  },

  getPinnedOffset: function (DOMNode) {
    if (this.pinnedOffset) {
      return this.pinnedOffset;
    }

    DOMNode.className = DOMNode.className.replace(/affix-top|affix-bottom|affix/, '');
    DOMNode.className += DOMNode.className.length ? ' affix' : 'affix';

    this.pinnedOffset = domUtils.getOffset(DOMNode).top - window.pageYOffset;

    return this.pinnedOffset;
  },

  checkPosition: function () {
    var DOMNode, scrollHeight, scrollTop, position, offsetTop, offsetBottom,
        affix, affixType, affixPositionTop;

    // TODO: or not visible
    if (!this.isMounted()) {
      return;
    }

    DOMNode = this.getDOMNode();
    scrollHeight = document.documentElement.offsetHeight;
    scrollTop = window.pageYOffset;
    position = domUtils.getOffset(DOMNode);
    offsetTop;
    offsetBottom;

    if (this.affixed === 'top') {
      position.top += scrollTop;
    }

    offsetTop = this.props.offsetTop != null ?
      this.props.offsetTop : this.props.offset;
    offsetBottom = this.props.offsetBottom != null ?
      this.props.offsetBottom : this.props.offset;

    if (offsetTop == null && offsetBottom == null) {
      return;
    }
    if (offsetTop == null) {
      offsetTop = 0;
    }
    if (offsetBottom == null) {
      offsetBottom = 0;
    }

    if (this.unpin != null && (scrollTop + this.unpin <= position.top)) {
      affix = false;
    } else if (offsetBottom != null && (position.top + DOMNode.offsetHeight >= scrollHeight - offsetBottom)) {
      affix = 'bottom';
    } else if (offsetTop != null && (scrollTop <= offsetTop)) {
      affix = 'top';
    } else {
      affix = false;
    }

    if (this.affixed === affix) {
      return;
    }

    if (this.unpin != null) {
      DOMNode.style.top = '';
    }

    affixType = 'affix' + (affix ? '-' + affix : '');

    this.affixed = affix;
    this.unpin = affix === 'bottom' ?
      this.getPinnedOffset(DOMNode) : null;

    if (affix === 'bottom') {
      DOMNode.className = DOMNode.className.replace(/affix-top|affix-bottom|affix/, 'affix-bottom');
      affixPositionTop = scrollHeight - offsetBottom - DOMNode.offsetHeight - domUtils.getOffset(DOMNode).top;
    }

    this.setState({
      affixClass: affixType,
      affixPositionTop: affixPositionTop
    });
  },

  checkPositionWithEventLoop: function () {
    setTimeout(this.checkPosition, 0);
  },

  componentDidMount: function () {
    this._onWindowScrollListener =
      EventListener.listen(window, 'scroll', this.checkPosition);
    this._onDocumentClickListener =
      EventListener.listen(document, 'click', this.checkPositionWithEventLoop);
  },

  componentWillUnmount: function () {
    if (this._onWindowScrollListener) {
      this._onWindowScrollListener.remove();
    }

    if (this._onDocumentClickListener) {
      this._onDocumentClickListener.remove();
    }
  },

  componentDidUpdate: function (prevProps, prevState) {
    if (prevState.affixClass === this.state.affixClass) {
      this.checkPositionWithEventLoop();
    }
  }
};

module.exports = AffixMixin;
});

define('lib/Affix',['require','exports','module','react','./utils/joinClasses','./AffixMixin','./utils/domUtils'],function (require, exports, module) {var React = require('react');
var joinClasses = require('./utils/joinClasses');
var AffixMixin = require('./AffixMixin');
var domUtils = require('./utils/domUtils');

var Affix = React.createClass({displayName: "Affix",
  statics: {
    domUtils: domUtils
  },

  mixins: [AffixMixin],

  render: function () {
    var holderStyle = {top: this.state.affixPositionTop};
    return (
      React.createElement("div", React.__spread({},  this.props, {className: joinClasses(this.props.className, this.state.affixClass), style: holderStyle}), 
        this.props.children
      )
    );
  }
});

module.exports = Affix;
});

define('lib/Alert',['require','exports','module','react','./utils/joinClasses','./utils/classSet','./BootstrapMixin'],function (require, exports, module) {var React = require('react');
var joinClasses = require('./utils/joinClasses');
var classSet = require('./utils/classSet');
var BootstrapMixin = require('./BootstrapMixin');


var Alert = React.createClass({displayName: "Alert",
  mixins: [BootstrapMixin],

  propTypes: {
    onDismiss: React.PropTypes.func,
    dismissAfter: React.PropTypes.number
  },

  getDefaultProps: function () {
    return {
      bsClass: 'alert',
      bsStyle: 'info'
    };
  },

  renderDismissButton: function () {
    return (
      React.createElement("button", {
        type: "button", 
        className: "close", 
        onClick: this.props.onDismiss, 
        "aria-hidden": "true"}, 
        "×"
      )
    );
  },

  render: function () {
    var classes = this.getBsClassSet();
    var isDismissable = !!this.props.onDismiss;

    classes['alert-dismissable'] = isDismissable;

    return (
      React.createElement("div", React.__spread({},  this.props, {className: joinClasses(this.props.className, classSet(classes))}), 
        isDismissable ? this.renderDismissButton() : null, 
        this.props.children
      )
    );
  },

  componentDidMount: function() {
    if (this.props.dismissAfter && this.props.onDismiss) {
      this.dismissTimer = setTimeout(this.props.onDismiss, this.props.dismissAfter);
    }
  },

  componentWillUnmount: function() {
    clearTimeout(this.dismissTimer);
  }
});

module.exports = Alert;
});

define('lib/Badge',['require','exports','module','react','./utils/joinClasses','./utils/ValidComponentChildren','./utils/classSet'],function (require, exports, module) {var React = require('react');
var joinClasses = require('./utils/joinClasses');
var ValidComponentChildren = require('./utils/ValidComponentChildren');
var classSet = require('./utils/classSet');

var Badge = React.createClass({displayName: "Badge",
  propTypes: {
    pullRight: React.PropTypes.bool
  },

  hasContent: function () {
    return ValidComponentChildren.hasValidComponent(this.props.children) ||
      (typeof this.props.children === 'string') ||
      (typeof this.props.children === 'number')
  },

  render: function () {
    var classes = {
      'pull-right': this.props.pullRight,
      'badge': this.hasContent()
    };
    return (
      React.createElement("span", React.__spread({}, 
        this.props, 
        {className: joinClasses(this.props.className, classSet(classes))}), 
        this.props.children
      )
    );
  }
});

module.exports = Badge;

});

define('lib/Button',['require','exports','module','react','./utils/joinClasses','./utils/classSet','./BootstrapMixin'],function (require, exports, module) {var React = require('react');
var joinClasses = require('./utils/joinClasses');
var classSet = require('./utils/classSet');
var BootstrapMixin = require('./BootstrapMixin');

var Button = React.createClass({displayName: "Button",
  mixins: [BootstrapMixin],

  propTypes: {
    active:   React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    block:    React.PropTypes.bool,
    navItem:    React.PropTypes.bool,
    navDropdown: React.PropTypes.bool,
    componentClass: React.PropTypes.node,
    href: React.PropTypes.string,
    target: React.PropTypes.string
  },

  getDefaultProps: function () {
    return {
      bsClass: 'button',
      bsStyle: 'default',
      type: 'button'
    };
  },

  render: function () {
    var classes = this.props.navDropdown ? {} : this.getBsClassSet();
    var renderFuncName;

    classes['active'] = this.props.active;
    classes['btn-block'] = this.props.block;

    if (this.props.navItem) {
      return this.renderNavItem(classes);
    }

    renderFuncName = this.props.href || this.props.target || this.props.navDropdown ?
      'renderAnchor' : 'renderButton';

    return this[renderFuncName](classes);
  },

  renderAnchor: function (classes) {

    var Component = this.props.componentClass || 'a';
    var href = this.props.href || '#';
    classes['disabled'] = this.props.disabled;

    return (
      React.createElement(Component, React.__spread({}, 
        this.props, 
        {href: href, 
        className: joinClasses(this.props.className, classSet(classes)), 
        role: "button"}), 
        this.props.children
      )
    );
  },

  renderButton: function (classes) {
    var Component = this.props.componentClass || 'button';

    return (
      React.createElement(Component, React.__spread({}, 
        this.props, 
        {className: joinClasses(this.props.className, classSet(classes))}), 
        this.props.children
      )
    );
  },

  renderNavItem: function (classes) {
    var liClasses = {
      active: this.props.active
    };

    return (
      React.createElement("li", {className: classSet(liClasses)}, 
        this.renderAnchor(classes)
      )
    );
  }
});

module.exports = Button;

});

define('lib/ButtonGroup',['require','exports','module','react','./utils/joinClasses','./utils/classSet','./BootstrapMixin','./Button'],function (require, exports, module) {var React = require('react');
var joinClasses = require('./utils/joinClasses');
var classSet = require('./utils/classSet');
var BootstrapMixin = require('./BootstrapMixin');
var Button = require('./Button');

var ButtonGroup = React.createClass({displayName: "ButtonGroup",
  mixins: [BootstrapMixin],

  propTypes: {
    vertical:  React.PropTypes.bool,
    justified: React.PropTypes.bool
  },

  getDefaultProps: function () {
    return {
      bsClass: 'button-group'
    };
  },

  render: function () {
    var classes = this.getBsClassSet();
    classes['btn-group'] = !this.props.vertical;
    classes['btn-group-vertical'] = this.props.vertical;
    classes['btn-group-justified'] = this.props.justified;

    return (
      React.createElement("div", React.__spread({}, 
        this.props, 
        {className: joinClasses(this.props.className, classSet(classes))}), 
        this.props.children
      )
    );
  }
});

module.exports = ButtonGroup;
});

define('lib/ButtonToolbar',['require','exports','module','react','./utils/joinClasses','./utils/classSet','./BootstrapMixin','./Button'],function (require, exports, module) {var React = require('react');
var joinClasses = require('./utils/joinClasses');
var classSet = require('./utils/classSet');
var BootstrapMixin = require('./BootstrapMixin');
var Button = require('./Button');

var ButtonToolbar = React.createClass({displayName: "ButtonToolbar",
  mixins: [BootstrapMixin],

  getDefaultProps: function () {
    return {
      bsClass: 'button-toolbar'
    };
  },

  render: function () {
    var classes = this.getBsClassSet();

    return (
      React.createElement("div", React.__spread({}, 
        this.props, 
        {role: "toolbar", 
        className: joinClasses(this.props.className, classSet(classes))}), 
        this.props.children
      )
    );
  }
});

module.exports = ButtonToolbar;
});

define('lib/Carousel',['require','exports','module','react','./utils/joinClasses','./utils/classSet','./utils/cloneWithProps','./BootstrapMixin','./utils/ValidComponentChildren'],function (require, exports, module) {var React = require('react');
var joinClasses = require('./utils/joinClasses');
var classSet = require('./utils/classSet');
var cloneWithProps = require('./utils/cloneWithProps');
var BootstrapMixin = require('./BootstrapMixin');
var ValidComponentChildren = require('./utils/ValidComponentChildren');

var Carousel = React.createClass({displayName: "Carousel",
  mixins: [BootstrapMixin],

  propTypes: {
    slide: React.PropTypes.bool,
    indicators: React.PropTypes.bool,
    controls: React.PropTypes.bool,
    pauseOnHover: React.PropTypes.bool,
    wrap: React.PropTypes.bool,
    onSelect: React.PropTypes.func,
    onSlideEnd: React.PropTypes.func,
    activeIndex: React.PropTypes.number,
    defaultActiveIndex: React.PropTypes.number,
    direction: React.PropTypes.oneOf(['prev', 'next'])
  },

  getDefaultProps: function () {
    return {
      slide: true,
      interval: 5000,
      pauseOnHover: true,
      wrap: true,
      indicators: true,
      controls: true
    };
  },

  getInitialState: function () {
    return {
      activeIndex: this.props.defaultActiveIndex == null ?
        0 : this.props.defaultActiveIndex,
      previousActiveIndex: null,
      direction: null
    };
  },

  getDirection: function (prevIndex, index) {
    if (prevIndex === index) {
      return null;
    }

    return prevIndex > index ?
      'prev' : 'next';
  },

  componentWillReceiveProps: function (nextProps) {
    var activeIndex = this.getActiveIndex();

    if (nextProps.activeIndex != null && nextProps.activeIndex !== activeIndex) {
      clearTimeout(this.timeout);
      this.setState({
        previousActiveIndex: activeIndex,
        direction: nextProps.direction != null ?
          nextProps.direction : this.getDirection(activeIndex, nextProps.activeIndex)
      });
    }
  },

  componentDidMount: function () {
    this.waitForNext();
  },

  componentWillUnmount: function() {
    clearTimeout(this.timeout);
  },

  next: function (e) {
    if (e) {
      e.preventDefault();
    }

    var index = this.getActiveIndex() + 1;
    var count = ValidComponentChildren.numberOf(this.props.children);

    if (index > count - 1) {
      if (!this.props.wrap) {
        return;
      }
      index = 0;
    }

    this.handleSelect(index, 'next');
  },

  prev: function (e) {
    if (e) {
      e.preventDefault();
    }

    var index = this.getActiveIndex() - 1;

    if (index < 0) {
      if (!this.props.wrap) {
        return;
      }
      index = ValidComponentChildren.numberOf(this.props.children) - 1;
    }

    this.handleSelect(index, 'prev');
  },

  pause: function () {
    this.isPaused = true;
    clearTimeout(this.timeout);
  },

  play: function () {
    this.isPaused = false;
    this.waitForNext();
  },

  waitForNext: function () {
    if (!this.isPaused && this.props.slide && this.props.interval &&
        this.props.activeIndex == null) {
      this.timeout = setTimeout(this.next, this.props.interval);
    }
  },

  handleMouseOver: function () {
    if (this.props.pauseOnHover) {
      this.pause();
    }
  },

  handleMouseOut: function () {
    if (this.isPaused) {
      this.play();
    }
  },

  render: function () {
    var classes = {
      carousel: true,
      slide: this.props.slide
    };

    return (
      React.createElement("div", React.__spread({}, 
        this.props, 
        {className: joinClasses(this.props.className, classSet(classes)), 
        onMouseOver: this.handleMouseOver, 
        onMouseOut: this.handleMouseOut}), 
        this.props.indicators ? this.renderIndicators() : null, 
        React.createElement("div", {className: "carousel-inner", ref: "inner"}, 
          ValidComponentChildren.map(this.props.children, this.renderItem)
        ), 
        this.props.controls ? this.renderControls() : null
      )
    );
  },

  renderPrev: function () {
    return (
      React.createElement("a", {className: "left carousel-control", href: "#prev", key: 0, onClick: this.prev}, 
        React.createElement("span", {className: "glyphicon glyphicon-chevron-left"})
      )
    );
  },

  renderNext: function () {
    return (
      React.createElement("a", {className: "right carousel-control", href: "#next", key: 1, onClick: this.next}, 
        React.createElement("span", {className: "glyphicon glyphicon-chevron-right"})
      )
    );
  },

  renderControls: function () {
    if (this.props.wrap) {
      var activeIndex = this.getActiveIndex();
      var count = ValidComponentChildren.numberOf(this.props.children);

      return [
        (activeIndex !== 0) ? this.renderPrev() : null,
        (activeIndex !== count - 1) ? this.renderNext() : null
      ];
    }

    return [
      this.renderPrev(),
      this.renderNext()
    ];
  },

  renderIndicator: function (child, index) {
    var className = (index === this.getActiveIndex()) ?
      'active' : null;

    return (
      React.createElement("li", {
        key: index, 
        className: className, 
        onClick: this.handleSelect.bind(this, index, null)})
    );
  },

  renderIndicators: function () {
    var indicators = [];
    ValidComponentChildren
      .forEach(this.props.children, function(child, index) {
        indicators.push(
          this.renderIndicator(child, index),

          // Force whitespace between indicator elements, bootstrap
          // requires this for correct spacing of elements.
          ' '
        );
      }, this);

    return (
      React.createElement("ol", {className: "carousel-indicators"}, 
        indicators
      )
    );
  },

  getActiveIndex: function () {
    return this.props.activeIndex != null ? this.props.activeIndex : this.state.activeIndex;
  },

  handleItemAnimateOutEnd: function () {
    this.setState({
      previousActiveIndex: null,
      direction: null
    }, function() {
      this.waitForNext();

      if (this.props.onSlideEnd) {
        this.props.onSlideEnd();
      }
    });
  },

  renderItem: function (child, index) {
    var activeIndex = this.getActiveIndex();
    var isActive = (index === activeIndex);
    var isPreviousActive = this.state.previousActiveIndex != null &&
            this.state.previousActiveIndex === index && this.props.slide;

    return cloneWithProps(
        child,
        {
          active: isActive,
          ref: child.ref,
          key: child.key ? child.key : index,
          index: index,
          animateOut: isPreviousActive,
          animateIn: isActive && this.state.previousActiveIndex != null && this.props.slide,
          direction: this.state.direction,
          onAnimateOutEnd: isPreviousActive ? this.handleItemAnimateOutEnd: null
        }
      );
  },

  handleSelect: function (index, direction) {
    clearTimeout(this.timeout);

    var previousActiveIndex = this.getActiveIndex();
    direction = direction || this.getDirection(previousActiveIndex, index);

    if (this.props.onSelect) {
      this.props.onSelect(index, direction);
    }

    if (this.props.activeIndex == null && index !== previousActiveIndex) {
      if (this.state.previousActiveIndex != null) {
        // If currently animating don't activate the new index.
        // TODO: look into queuing this canceled call and
        // animating after the current animation has ended.
        return;
      }

      this.setState({
        activeIndex: index,
        previousActiveIndex: previousActiveIndex,
        direction: direction
      });
    }
  }
});

module.exports = Carousel;
});

define('lib/utils/TransitionEvents',['require','exports','module'],function (require, exports, module) {/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 *
 * This file contains a modified version of:
 * https://github.com/facebook/react/blob/v0.12.0/src/addons/transitions/ReactTransitionEvents.js
 *
 * This source code is licensed under the BSD-style license found here:
 * https://github.com/facebook/react/blob/v0.12.0/LICENSE
 * An additional grant of patent rights can be found here:
 * https://github.com/facebook/react/blob/v0.12.0/PATENTS
 */

var canUseDOM = !!(
  typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  );

/**
 * EVENT_NAME_MAP is used to determine which event fired when a
 * transition/animation ends, based on the style property used to
 * define that event.
 */
var EVENT_NAME_MAP = {
  transitionend: {
    'transition': 'transitionend',
    'WebkitTransition': 'webkitTransitionEnd',
    'MozTransition': 'mozTransitionEnd',
    'OTransition': 'oTransitionEnd',
    'msTransition': 'MSTransitionEnd'
  },

  animationend: {
    'animation': 'animationend',
    'WebkitAnimation': 'webkitAnimationEnd',
    'MozAnimation': 'mozAnimationEnd',
    'OAnimation': 'oAnimationEnd',
    'msAnimation': 'MSAnimationEnd'
  }
};

var endEvents = [];

function detectEvents() {
  var testEl = document.createElement('div');
  var style = testEl.style;

  // On some platforms, in particular some releases of Android 4.x,
  // the un-prefixed "animation" and "transition" properties are defined on the
  // style object but the events that fire will still be prefixed, so we need
  // to check if the un-prefixed events are useable, and if not remove them
  // from the map
  if (!('AnimationEvent' in window)) {
    delete EVENT_NAME_MAP.animationend.animation;
  }

  if (!('TransitionEvent' in window)) {
    delete EVENT_NAME_MAP.transitionend.transition;
  }

  for (var baseEventName in EVENT_NAME_MAP) {
    var baseEvents = EVENT_NAME_MAP[baseEventName];
    for (var styleName in baseEvents) {
      if (styleName in style) {
        endEvents.push(baseEvents[styleName]);
        break;
      }
    }
  }
}

if (canUseDOM) {
  detectEvents();
}

// We use the raw {add|remove}EventListener() call because EventListener
// does not know how to remove event listeners and we really should
// clean up. Also, these events are not triggered in older browsers
// so we should be A-OK here.

function addEventListener(node, eventName, eventListener) {
  node.addEventListener(eventName, eventListener, false);
}

function removeEventListener(node, eventName, eventListener) {
  node.removeEventListener(eventName, eventListener, false);
}

var ReactTransitionEvents = {
  addEndEventListener: function(node, eventListener) {
    if (endEvents.length === 0) {
      // If CSS transitions are not supported, trigger an "end animation"
      // event immediately.
      window.setTimeout(eventListener, 0);
      return;
    }
    endEvents.forEach(function(endEvent) {
      addEventListener(node, endEvent, eventListener);
    });
  },

  removeEndEventListener: function(node, eventListener) {
    if (endEvents.length === 0) {
      return;
    }
    endEvents.forEach(function(endEvent) {
      removeEventListener(node, endEvent, eventListener);
    });
  }
};

module.exports = ReactTransitionEvents;

});

define('lib/CarouselItem',['require','exports','module','react','./utils/joinClasses','./utils/classSet','./utils/TransitionEvents'],function (require, exports, module) {var React = require('react');
var joinClasses = require('./utils/joinClasses');
var classSet = require('./utils/classSet');
var TransitionEvents = require('./utils/TransitionEvents');

var CarouselItem = React.createClass({displayName: "CarouselItem",
  propTypes: {
    direction: React.PropTypes.oneOf(['prev', 'next']),
    onAnimateOutEnd: React.PropTypes.func,
    active: React.PropTypes.bool,
    caption: React.PropTypes.node
  },

  getInitialState: function () {
    return {
      direction: null
    };
  },

  getDefaultProps: function () {
    return {
      animation: true
    };
  },

  handleAnimateOutEnd: function () {
    if (this.props.onAnimateOutEnd && this.isMounted()) {
      this.props.onAnimateOutEnd(this.props.index);
    }
  },

  componentWillReceiveProps: function (nextProps) {
    if (this.props.active !== nextProps.active) {
      this.setState({
        direction: null
      });
    }
  },

  componentDidUpdate: function (prevProps) {
    if (!this.props.active && prevProps.active) {
      TransitionEvents.addEndEventListener(
        this.getDOMNode(),
        this.handleAnimateOutEnd
      );
    }

    if (this.props.active !== prevProps.active) {
      setTimeout(this.startAnimation, 20);
    }
  },

  startAnimation: function () {
    if (!this.isMounted()) {
      return;
    }

    this.setState({
      direction: this.props.direction === 'prev' ?
        'right' : 'left'
    });
  },

  render: function () {
    var classes = {
      item: true,
      active: (this.props.active && !this.props.animateIn) || this.props.animateOut,
      next: this.props.active && this.props.animateIn && this.props.direction === 'next',
      prev: this.props.active && this.props.animateIn && this.props.direction === 'prev'
    };

    if (this.state.direction && (this.props.animateIn || this.props.animateOut)) {
      classes[this.state.direction] = true;
    }

    return (
      React.createElement("div", React.__spread({},  this.props, {className: joinClasses(this.props.className, classSet(classes))}), 
        this.props.children, 
        this.props.caption ? this.renderCaption() : null
      )
    );
  },

  renderCaption: function () {
    return (
      React.createElement("div", {className: "carousel-caption"}, 
        this.props.caption
      )
    );
  }
});

module.exports = CarouselItem;
});

define('lib/Col',['require','exports','module','react','./utils/joinClasses','./utils/classSet','./constants'],function (require, exports, module) {var React = require('react');
var joinClasses = require('./utils/joinClasses');
var classSet = require('./utils/classSet');
var constants = require('./constants');


var Col = React.createClass({displayName: "Col",
  propTypes: {
    xs: React.PropTypes.number,
    sm: React.PropTypes.number,
    md: React.PropTypes.number,
    lg: React.PropTypes.number,
    xsOffset: React.PropTypes.number,
    smOffset: React.PropTypes.number,
    mdOffset: React.PropTypes.number,
    lgOffset: React.PropTypes.number,
    xsPush: React.PropTypes.number,
    smPush: React.PropTypes.number,
    mdPush: React.PropTypes.number,
    lgPush: React.PropTypes.number,
    xsPull: React.PropTypes.number,
    smPull: React.PropTypes.number,
    mdPull: React.PropTypes.number,
    lgPull: React.PropTypes.number,
    componentClass: React.PropTypes.node.isRequired
  },

  getDefaultProps: function () {
    return {
      componentClass: 'div'
    };
  },

  render: function () {
    var ComponentClass = this.props.componentClass;
    var classes = {};

    Object.keys(constants.SIZES).forEach(function (key) {
      var size = constants.SIZES[key];
      var prop = size;
      var classPart = size + '-';

      if (this.props[prop]) {
        classes['col-' + classPart + this.props[prop]] = true;
      }

      prop = size + 'Offset';
      classPart = size + '-offset-';
      if (this.props[prop]) {
        classes['col-' + classPart + this.props[prop]] = true;
      }

      prop = size + 'Push';
      classPart = size + '-push-';
      if (this.props[prop]) {
        classes['col-' + classPart + this.props[prop]] = true;
      }

      prop = size + 'Pull';
      classPart = size + '-pull-';
      if (this.props[prop]) {
        classes['col-' + classPart + this.props[prop]] = true;
      }
    }, this);

    return (
      React.createElement(ComponentClass, React.__spread({},  this.props, {className: joinClasses(this.props.className, classSet(classes))}), 
        this.props.children
      )
    );
  }
});

module.exports = Col;
});

define('lib/CollapsableMixin',['require','exports','module','react','./utils/TransitionEvents'],function (require, exports, module) {var React = require('react');
var TransitionEvents = require('./utils/TransitionEvents');

var CollapsableMixin = {

  propTypes: {
    collapsable: React.PropTypes.bool,
    defaultExpanded: React.PropTypes.bool,
    expanded: React.PropTypes.bool
  },

  getInitialState: function () {
    return {
      expanded: this.props.defaultExpanded != null ? this.props.defaultExpanded : null,
      collapsing: false
    };
  },

  handleTransitionEnd: function () {
    this._collapseEnd = true;
    this.setState({
      collapsing: false
    });
  },

  componentWillReceiveProps: function (newProps) {
    if (this.props.collapsable && newProps.expanded !== this.props.expanded) {
      this._collapseEnd = false;
      this.setState({
        collapsing: true
      });
    }
  },

  _addEndTransitionListener: function () {
    var node = this.getCollapsableDOMNode();

    if (node) {
      TransitionEvents.addEndEventListener(
        node,
        this.handleTransitionEnd
      );
    }
  },

  _removeEndTransitionListener: function () {
    var node = this.getCollapsableDOMNode();

    if (node) {
      TransitionEvents.removeEndEventListener(
        node,
        this.handleTransitionEnd
      );
    }
  },

  componentDidMount: function () {
    this._afterRender();
  },

  componentWillUnmount: function () {
    this._removeEndTransitionListener();
  },

  componentWillUpdate: function (nextProps) {
    var dimension = (typeof this.getCollapsableDimension === 'function') ?
      this.getCollapsableDimension() : 'height';
    var node = this.getCollapsableDOMNode();

    this._removeEndTransitionListener();
  },

  componentDidUpdate: function (prevProps, prevState) {
    this._afterRender();
  },

  _afterRender: function () {
    if (!this.props.collapsable) {
      return;
    }

    this._addEndTransitionListener();
    setTimeout(this._updateDimensionAfterRender, 0);
  },

  _updateDimensionAfterRender: function () {
    var node = this.getCollapsableDOMNode();
    if (node) {
        var dimension = (typeof this.getCollapsableDimension === 'function') ?
            this.getCollapsableDimension() : 'height';
        node.style[dimension] = this.isExpanded() ?
            this.getCollapsableDimensionValue() + 'px' : '0px';
    }
  },

  isExpanded: function () {
    return (this.props.expanded != null) ?
      this.props.expanded : this.state.expanded;
  },

  getCollapsableClassSet: function (className) {
    var classes = {};

    if (typeof className === 'string') {
      className.split(' ').forEach(function (className) {
        if (className) {
          classes[className] = true;
        }
      });
    }

    classes.collapsing = this.state.collapsing;
    classes.collapse = !this.state.collapsing;
    classes['in'] = this.isExpanded() && !this.state.collapsing;

    return classes;
  }
};

module.exports = CollapsableMixin;

});

define('lib/utils/createChainedFunction',['require','exports','module'],function (require, exports, module) {/**
 * Safe chained function
 *
 * Will only create a new function if needed,
 * otherwise will pass back existing functions or null.
 *
 * @param {function} one
 * @param {function} two
 * @returns {function|null}
 */
function createChainedFunction(one, two) {
  var hasOne = typeof one === 'function';
  var hasTwo = typeof two === 'function';

  if (!hasOne && !hasTwo) { return null; }
  if (!hasOne) { return two; }
  if (!hasTwo) { return one; }

  return function chainedFunction() {
    one.apply(this, arguments);
    two.apply(this, arguments);
  };
}

module.exports = createChainedFunction;
});

define('lib/DropdownStateMixin',['require','exports','module','react','./utils/EventListener'],function (require, exports, module) {var React = require('react');
var EventListener = require('./utils/EventListener');

/**
 * Checks whether a node is within
 * a root nodes tree
 *
 * @param {DOMElement} node
 * @param {DOMElement} root
 * @returns {boolean}
 */
function isNodeInRoot(node, root) {
  while (node) {
    if (node === root) {
      return true;
    }
    node = node.parentNode;
  }

  return false;
}

var DropdownStateMixin = {
  getInitialState: function () {
    return {
      open: false
    };
  },

  setDropdownState: function (newState, onStateChangeComplete) {
    if (newState) {
      this.bindRootCloseHandlers();
    } else {
      this.unbindRootCloseHandlers();
    }

    this.setState({
      open: newState
    }, onStateChangeComplete);
  },

  handleDocumentKeyUp: function (e) {
    if (e.keyCode === 27) {
      this.setDropdownState(false);
    }
  },

  handleDocumentClick: function (e) {
    // If the click originated from within this component
    // don't do anything.
    if (isNodeInRoot(e.target, this.getDOMNode())) {
      return;
    }

    this.setDropdownState(false);
  },

  bindRootCloseHandlers: function () {
    this._onDocumentClickListener =
      EventListener.listen(document, 'click', this.handleDocumentClick);
    this._onDocumentKeyupListener =
      EventListener.listen(document, 'keyup', this.handleDocumentKeyUp);
  },

  unbindRootCloseHandlers: function () {
    if (this._onDocumentClickListener) {
      this._onDocumentClickListener.remove();
    }

    if (this._onDocumentKeyupListener) {
      this._onDocumentKeyupListener.remove();
    }
  },

  componentWillUnmount: function () {
    this.unbindRootCloseHandlers();
  }
};

module.exports = DropdownStateMixin;
});

define('lib/DropdownMenu',['require','exports','module','react','./utils/joinClasses','./utils/classSet','./utils/cloneWithProps','./utils/createChainedFunction','./utils/ValidComponentChildren'],function (require, exports, module) {var React = require('react');
var joinClasses = require('./utils/joinClasses');
var classSet = require('./utils/classSet');
var cloneWithProps = require('./utils/cloneWithProps');

var createChainedFunction = require('./utils/createChainedFunction');
var ValidComponentChildren = require('./utils/ValidComponentChildren');

var DropdownMenu = React.createClass({displayName: "DropdownMenu",
  propTypes: {
    pullRight: React.PropTypes.bool,
    onSelect: React.PropTypes.func
  },

  render: function () {
    var classes = {
        'dropdown-menu': true,
        'dropdown-menu-right': this.props.pullRight
      };

    return (
        React.createElement("ul", React.__spread({}, 
          this.props, 
          {className: joinClasses(this.props.className, classSet(classes)), 
          role: "menu"}), 
          ValidComponentChildren.map(this.props.children, this.renderMenuItem)
        )
      );
  },

  renderMenuItem: function (child, index) {
    return cloneWithProps(
      child,
      {
        // Capture onSelect events
        onSelect: createChainedFunction(child.props.onSelect, this.props.onSelect),

        // Force special props to be transferred
        key: child.key ? child.key : index,
        ref: child.ref
      }
    );
  }
});

module.exports = DropdownMenu;
});

define('lib/DropdownButton',['require','exports','module','react','./utils/joinClasses','./utils/classSet','./utils/cloneWithProps','./utils/createChainedFunction','./BootstrapMixin','./DropdownStateMixin','./Button','./ButtonGroup','./DropdownMenu','./utils/ValidComponentChildren'],function (require, exports, module) {var React = require('react');
var joinClasses = require('./utils/joinClasses');
var classSet = require('./utils/classSet');
var cloneWithProps = require('./utils/cloneWithProps');

var createChainedFunction = require('./utils/createChainedFunction');
var BootstrapMixin = require('./BootstrapMixin');
var DropdownStateMixin = require('./DropdownStateMixin');
var Button = require('./Button');
var ButtonGroup = require('./ButtonGroup');
var DropdownMenu = require('./DropdownMenu');
var ValidComponentChildren = require('./utils/ValidComponentChildren');


var DropdownButton = React.createClass({displayName: "DropdownButton",
  mixins: [BootstrapMixin, DropdownStateMixin],

  propTypes: {
    pullRight: React.PropTypes.bool,
    dropup:    React.PropTypes.bool,
    title:     React.PropTypes.node,
    href:      React.PropTypes.string,
    onClick:   React.PropTypes.func,
    onSelect:  React.PropTypes.func,
    navItem:   React.PropTypes.bool,
    noCaret:   React.PropTypes.bool
  },

  render: function () {
    var renderMethod = this.props.navItem ?
      'renderNavItem' : 'renderButtonGroup';

    var caret = this.props.noCaret ?
        null : (React.createElement("span", {className: "caret"}));

    return this[renderMethod]([
      React.createElement(Button, React.__spread({}, 
        this.props, 
        {ref: "dropdownButton", 
        className: "dropdown-toggle", 
        onClick: this.handleDropdownClick, 
        key: 0, 
        navDropdown: this.props.navItem, 
        navItem: null, 
        title: null, 
        pullRight: null, 
        dropup: null}), 
        this.props.title, ' ', 
        caret
      ),
      React.createElement(DropdownMenu, {
        ref: "menu", 
        "aria-labelledby": this.props.id, 
        pullRight: this.props.pullRight, 
        key: 1}, 
        ValidComponentChildren.map(this.props.children, this.renderMenuItem)
      )
    ]);
  },

  renderButtonGroup: function (children) {
    var groupClasses = {
        'open': this.state.open,
        'dropup': this.props.dropup
      };

    return (
      React.createElement(ButtonGroup, {
        bsSize: this.props.bsSize, 
        className: joinClasses(this.props.className, classSet(groupClasses))}, 
        children
      )
    );
  },

  renderNavItem: function (children) {
    var classes = {
        'dropdown': true,
        'open': this.state.open,
        'dropup': this.props.dropup
      };

    return (
      React.createElement("li", {className: joinClasses(this.props.className, classSet(classes))}, 
        children
      )
    );
  },

  renderMenuItem: function (child, index) {
    // Only handle the option selection if an onSelect prop has been set on the
    // component or it's child, this allows a user not to pass an onSelect
    // handler and have the browser preform the default action.
    var handleOptionSelect = this.props.onSelect || child.props.onSelect ?
      this.handleOptionSelect : null;

    return cloneWithProps(
      child,
      {
        // Capture onSelect events
        onSelect: createChainedFunction(child.props.onSelect, handleOptionSelect),

        // Force special props to be transferred
        key: child.key ? child.key : index,
        ref: child.ref
      }
    );
  },

  handleDropdownClick: function (e) {
    e.preventDefault();

    this.setDropdownState(!this.state.open);
  },

  handleOptionSelect: function (key) {
    if (this.props.onSelect) {
      this.props.onSelect(key);
    }

    this.setDropdownState(false);
  }
});

module.exports = DropdownButton;

});

define('lib/FadeMixin',['require','exports','module'],function (require, exports, module) {/*global document */
// TODO: listen for onTransitionEnd to remove el
function getElementsAndSelf (root, classes){
  var els = root.querySelectorAll('.' + classes.join('.'));

  els = [].map.call(els, function(e){ return e; });

  for(var i = 0; i < classes.length; i++){
    if( !root.className.match(new RegExp('\\b' +  classes[i] + '\\b'))){
      return els;
    }
  }
  els.unshift(root);
  return els;
}

module.exports = {
  _fadeIn: function () {
    var els;

    if (this.isMounted()) {
      els = getElementsAndSelf(this.getDOMNode(), ['fade']);

      if (els.length) {
        els.forEach(function (el) {
          el.className += ' in';
        });
      }
    }
  },

  _fadeOut: function () {
    var els = getElementsAndSelf(this._fadeOutEl, ['fade', 'in']);

    if (els.length) {
      els.forEach(function (el) {
        el.className = el.className.replace(/\bin\b/, '');
      });
    }

    setTimeout(this._handleFadeOutEnd, 300);
  },

  _handleFadeOutEnd: function () {
    if (this._fadeOutEl && this._fadeOutEl.parentNode) {
      this._fadeOutEl.parentNode.removeChild(this._fadeOutEl);
    }
  },

  componentDidMount: function () {
    if (document.querySelectorAll) {
      // Firefox needs delay for transition to be triggered
      setTimeout(this._fadeIn, 20);
    }
  },

  componentWillUnmount: function () {
    var els = getElementsAndSelf(this.getDOMNode(), ['fade']),
        container = (this.props.container && this.props.container.getDOMNode()) || document.body;

    if (els.length) {
      this._fadeOutEl = document.createElement('div');
      container.appendChild(this._fadeOutEl);
      this._fadeOutEl.appendChild(this.getDOMNode().cloneNode(true));
      // Firefox needs delay for transition to be triggered
      setTimeout(this._fadeOut, 20);
    }
  }
};

});

define('lib/Glyphicon',['require','exports','module','react','./utils/joinClasses','./utils/classSet','./BootstrapMixin','./constants'],function (require, exports, module) {var React = require('react');
var joinClasses = require('./utils/joinClasses');
var classSet = require('./utils/classSet');
var BootstrapMixin = require('./BootstrapMixin');
var constants = require('./constants');

var Glyphicon = React.createClass({displayName: "Glyphicon",
  mixins: [BootstrapMixin],

  propTypes: {
    glyph: React.PropTypes.oneOf(constants.GLYPHS).isRequired
  },

  getDefaultProps: function () {
    return {
      bsClass: 'glyphicon'
    };
  },

  render: function () {
    var classes = this.getBsClassSet();

    classes['glyphicon-' + this.props.glyph] = true;

    return (
      React.createElement("span", React.__spread({},  this.props, {className: joinClasses(this.props.className, classSet(classes))}), 
        this.props.children
      )
    );
  }
});

module.exports = Glyphicon;
});

define('lib/Grid',['require','exports','module','react','./utils/joinClasses'],function (require, exports, module) {var React = require('react');
var joinClasses = require('./utils/joinClasses');

var Grid = React.createClass({displayName: "Grid",
  propTypes: {
    fluid: React.PropTypes.bool,
    componentClass: React.PropTypes.node.isRequired
  },

  getDefaultProps: function () {
    return {
      componentClass: 'div'
    };
  },

  render: function () {
    var ComponentClass = this.props.componentClass;
    var className = this.props.fluid ? 'container-fluid' : 'container';

    return (
      React.createElement(ComponentClass, React.__spread({}, 
        this.props, 
        {className: joinClasses(this.props.className, className)}), 
        this.props.children
      )
    );
  }
});

module.exports = Grid;
});

define('lib/Input',['require','exports','module','react','./utils/joinClasses','./utils/classSet','./Button'],function (require, exports, module) {var React = require('react');
var joinClasses = require('./utils/joinClasses');
var classSet = require('./utils/classSet');
var Button = require('./Button');

var Input = React.createClass({displayName: "Input",

  propTypes: {
    type: React.PropTypes.string,
    label: React.PropTypes.node,
    help: React.PropTypes.node,
    addonBefore: React.PropTypes.node,
    addonAfter: React.PropTypes.node,
    buttonBefore: React.PropTypes.node,
    buttonAfter: React.PropTypes.node,
    bsSize: React.PropTypes.oneOf(['small', 'medium', 'large']),
    bsStyle: function(props) {
      if (props.type === 'submit') {
        // Return early if `type=submit` as the `Button` component
        // it transfers these props to has its own propType checks.
        return;
      }

      return React.PropTypes.oneOf(['success', 'warning', 'error']).apply(null, arguments);
    },
    hasFeedback: React.PropTypes.bool,
    groupClassName: React.PropTypes.string,
    wrapperClassName: React.PropTypes.string,
    labelClassName: React.PropTypes.string,
    disabled: React.PropTypes.bool
  },

  getInputDOMNode: function () {
    return this.refs.input.getDOMNode();
  },

  getValue: function () {
    if (this.props.type === 'static') {
      return this.props.value;
    }
    else if (this.props.type) {
      if (this.props.type == "select" && this.props.multiple) {
        return this.getSelectedOptions();
      } else {
        return this.getInputDOMNode().value;
      }
    }
    else {
      throw Error('Cannot use getValue without specifying input type.');
    }
  },

  getChecked: function () {
    return this.getInputDOMNode().checked;
  },

  getSelectedOptions: function () {
    var values = [];

    Array.prototype.forEach.call(
      this.getInputDOMNode().getElementsByTagName('option'),
      function (option) {
        if (option.selected) {
          var value = option.getAttribute('value') || option.innerHTML;

          values.push(value);
        }
      }
    );

    return values;
  },

  isCheckboxOrRadio: function () {
    return this.props.type === 'radio' || this.props.type === 'checkbox';
  },

  isFile: function () {
    return this.props.type === 'file';
  },

  renderInput: function () {
    var input = null;

    if (!this.props.type) {
      return this.props.children
    }

    switch (this.props.type) {
      case 'select':
        input = (
          React.createElement("select", React.__spread({},  this.props, {className: joinClasses(this.props.className, 'form-control'), ref: "input", key: "input"}), 
            this.props.children
          )
        );
        break;
      case 'textarea':
        input = React.createElement("textarea", React.__spread({},  this.props, {className: joinClasses(this.props.className, 'form-control'), ref: "input", key: "input"}));
        break;
      case 'static':
        input = (
          React.createElement("p", React.__spread({},  this.props, {className: joinClasses(this.props.className, 'form-control-static'), ref: "input", key: "input"}), 
            this.props.value
          )
        );
        break;
      case 'submit':
        input = (
          React.createElement(Button, React.__spread({},  this.props, {componentClass: "input", ref: "input", key: "input"}))
        );
        break;
      default:
        var className = this.isCheckboxOrRadio() || this.isFile() ? '' : 'form-control';
        input = React.createElement("input", React.__spread({},  this.props, {className: joinClasses(this.props.className, className), ref: "input", key: "input"}));
    }

    return input;
  },

  renderInputGroup: function (children) {
    var addonBefore = this.props.addonBefore ? (
      React.createElement("span", {className: "input-group-addon", key: "addonBefore"}, 
        this.props.addonBefore
      )
    ) : null;

    var addonAfter = this.props.addonAfter ? (
      React.createElement("span", {className: "input-group-addon", key: "addonAfter"}, 
        this.props.addonAfter
      )
    ) : null;

    var buttonBefore = this.props.buttonBefore ? (
      React.createElement("span", {className: "input-group-btn"}, 
        this.props.buttonBefore
      )
    ) : null;

    var buttonAfter = this.props.buttonAfter ? (
      React.createElement("span", {className: "input-group-btn"}, 
        this.props.buttonAfter
      )
    ) : null;

    var inputGroupClassName;
    switch (this.props.bsSize) {
      case 'small': inputGroupClassName = 'input-group-sm'; break;
      case 'large': inputGroupClassName = 'input-group-lg'; break;
    }

    return addonBefore || addonAfter || buttonBefore || buttonAfter ? (
      React.createElement("div", {className: joinClasses(inputGroupClassName, 'input-group'), key: "input-group"}, 
        addonBefore, 
        buttonBefore, 
        children, 
        addonAfter, 
        buttonAfter
      )
    ) : children;
  },

  renderIcon: function () {
    var classes = {
      'glyphicon': true,
      'form-control-feedback': true,
      'glyphicon-ok': this.props.bsStyle === 'success',
      'glyphicon-warning-sign': this.props.bsStyle === 'warning',
      'glyphicon-remove': this.props.bsStyle === 'error'
    };

    return this.props.hasFeedback ? (
      React.createElement("span", {className: classSet(classes), key: "icon"})
    ) : null;
  },

  renderHelp: function () {
    return this.props.help ? (
      React.createElement("span", {className: "help-block", key: "help"}, 
        this.props.help
      )
    ) : null;
  },

  renderCheckboxandRadioWrapper: function (children) {
    var classes = {
      'checkbox': this.props.type === 'checkbox',
      'radio': this.props.type === 'radio'
    };

    return (
      React.createElement("div", {className: classSet(classes), key: "checkboxRadioWrapper"}, 
        children
      )
    );
  },

  renderWrapper: function (children) {
    return this.props.wrapperClassName ? (
      React.createElement("div", {className: this.props.wrapperClassName, key: "wrapper"}, 
        children
      )
    ) : children;
  },

  renderLabel: function (children) {
    var classes = {
      'control-label': !this.isCheckboxOrRadio()
    };
    classes[this.props.labelClassName] = this.props.labelClassName;

    return this.props.label ? (
      React.createElement("label", {htmlFor: this.props.id, className: classSet(classes), key: "label"}, 
        children, 
        this.props.label
      )
    ) : children;
  },

  renderFormGroup: function (children) {
    var classes = {
      'form-group': true,
      'has-feedback': this.props.hasFeedback,
      'has-success': this.props.bsStyle === 'success',
      'has-warning': this.props.bsStyle === 'warning',
      'has-error': this.props.bsStyle === 'error'
    };
    classes[this.props.groupClassName] = this.props.groupClassName;

    return (
      React.createElement("div", {className: classSet(classes)}, 
        children
      )
    );
  },

  render: function () {
    if (this.isCheckboxOrRadio()) {
      return this.renderFormGroup(
        this.renderWrapper([
          this.renderCheckboxandRadioWrapper(
            this.renderLabel(
              this.renderInput()
            )
          ),
          this.renderHelp()
        ])
      );
    }
    else {
      return this.renderFormGroup([
        this.renderLabel(),
        this.renderWrapper([
          this.renderInputGroup(
            this.renderInput()
          ),
          this.renderIcon(),
          this.renderHelp()
        ])
      ]);
    }
  }
});

module.exports = Input;

});

define('lib/Interpolate',['require','exports','module','react','./utils/ValidComponentChildren','./utils/Object.assign'],function (require, exports, module) {// https://www.npmjs.org/package/react-interpolate-component


var React = require('react');
var ValidComponentChildren = require('./utils/ValidComponentChildren');
var assign = require('./utils/Object.assign');

var REGEXP = /\%\((.+?)\)s/;

var Interpolate = React.createClass({
  displayName: 'Interpolate',

  propTypes: {
    format: React.PropTypes.string
  },

  getDefaultProps: function() {
    return { component: 'span' };
  },

  render: function() {
    var format = (ValidComponentChildren.hasValidComponent(this.props.children) ||
        (typeof this.props.children === 'string')) ?
        this.props.children : this.props.format;
    var parent = this.props.component;
    var unsafe = this.props.unsafe === true;
    var props = assign({}, this.props);

    delete props.children;
    delete props.format;
    delete props.component;
    delete props.unsafe;

    if (unsafe) {
      var content = format.split(REGEXP).reduce(function(memo, match, index) {
        var html;

        if (index % 2 === 0) {
          html = match;
        } else {
          html = props[match];
          delete props[match];
        }

        if (React.isValidElement(html)) {
          throw new Error('cannot interpolate a React component into unsafe text');
        }

        memo += html;

        return memo;
      }, '');

      props.dangerouslySetInnerHTML = { __html: content };

      return React.createElement(parent, props);
    } else {
      var kids = format.split(REGEXP).reduce(function(memo, match, index) {
        var child;

        if (index % 2 === 0) {
          if (match.length === 0) {
            return memo;
          }

          child = match;
        } else {
          child = props[match];
          delete props[match];
        }

        memo.push(child);

        return memo;
      }, []);

      return React.createElement(parent, props, kids);
    }
  }
});

module.exports = Interpolate;

});

define('lib/Jumbotron',['require','exports','module','react','./utils/joinClasses'],function (require, exports, module) {var React = require('react');
var joinClasses = require('./utils/joinClasses');

var Jumbotron = React.createClass({displayName: "Jumbotron",

  render: function () {
    return (
      React.createElement("div", React.__spread({},  this.props, {className: joinClasses(this.props.className, 'jumbotron')}), 
        this.props.children
      )
    );
  }
});

module.exports = Jumbotron;
});

define('lib/Label',['require','exports','module','react','./utils/joinClasses','./utils/classSet','./BootstrapMixin'],function (require, exports, module) {var React = require('react');
var joinClasses = require('./utils/joinClasses');
var classSet = require('./utils/classSet');
var BootstrapMixin = require('./BootstrapMixin');

var Label = React.createClass({displayName: "Label",
  mixins: [BootstrapMixin],

  getDefaultProps: function () {
    return {
      bsClass: 'label',
      bsStyle: 'default'
    };
  },

  render: function () {
    var classes = this.getBsClassSet();

    return (
      React.createElement("span", React.__spread({},  this.props, {className: joinClasses(this.props.className, classSet(classes))}), 
        this.props.children
      )
    );
  }
});

module.exports = Label;
});

define('lib/ListGroup',['require','exports','module','react','./utils/classSet','./utils/cloneWithProps','./utils/ValidComponentChildren','./utils/createChainedFunction'],function (require, exports, module) {var React = require('react');
var classSet = require('./utils/classSet');
var cloneWithProps = require('./utils/cloneWithProps');

var ValidComponentChildren = require('./utils/ValidComponentChildren');
var createChainedFunction = require('./utils/createChainedFunction');

var ListGroup = React.createClass({displayName: "ListGroup",
  propTypes: {
    onClick: React.PropTypes.func
  },

  render: function () {
    return (
      React.createElement("div", {className: "list-group"}, 
        ValidComponentChildren.map(this.props.children, this.renderListItem)
      )
    );
  },

  renderListItem: function (child, index) {
    return cloneWithProps(child, {
      ref: child.ref,
      key: child.key ? child.key : index
    });
  }
});

module.exports = ListGroup;

});

define('lib/ListGroupItem',['require','exports','module','react','./utils/joinClasses','./BootstrapMixin','./utils/classSet','./utils/cloneWithProps','./utils/ValidComponentChildren'],function (require, exports, module) {var React = require('react');
var joinClasses = require('./utils/joinClasses');
var BootstrapMixin = require('./BootstrapMixin');
var classSet = require('./utils/classSet');
var cloneWithProps = require('./utils/cloneWithProps');

var ValidComponentChildren = require('./utils/ValidComponentChildren');

var ListGroupItem = React.createClass({displayName: "ListGroupItem",
  mixins: [BootstrapMixin],

  propTypes: {
    bsStyle: React.PropTypes.oneOf(['danger','info','success','warning']),
    active: React.PropTypes.any,
    disabled: React.PropTypes.any,
    header: React.PropTypes.node,
    onClick: React.PropTypes.func,
    eventKey: React.PropTypes.any,
    href: React.PropTypes.string,
    target: React.PropTypes.string
  },

  getDefaultProps: function () {
    return {
      bsClass: 'list-group-item'
    };
  },

  render: function () {
    var classes = this.getBsClassSet();

    classes['active'] = this.props.active;
    classes['disabled'] = this.props.disabled;

    if (this.props.href || this.props.target || this.props.onClick) {
      return this.renderAnchor(classes);
    } else {
      return this.renderSpan(classes);
    }
  },

  renderSpan: function (classes) {
    return (
      React.createElement("span", React.__spread({},  this.props, {className: joinClasses(this.props.className, classSet(classes))}), 
        this.props.header ? this.renderStructuredContent() : this.props.children
      )
    );
  },

  renderAnchor: function (classes) {
    return (
      React.createElement("a", React.__spread({}, 
        this.props, 
        {className: joinClasses(this.props.className, classSet(classes))
      }), 
        this.props.header ? this.renderStructuredContent() : this.props.children
      )
    );
  },

  renderStructuredContent: function () {
    var header;
    if (React.isValidElement(this.props.header)) {
      header = cloneWithProps(this.props.header, {
        className: 'list-group-item-heading'
      });
    } else {
      header = (
        React.createElement("h4", {className: "list-group-item-heading"}, 
          this.props.header
        )
      );
    }

    var content = (
      React.createElement("p", {className: "list-group-item-text"}, 
        this.props.children
      )
    );

    return {
      header: header,
      content: content
    };
  }
});

module.exports = ListGroupItem;

});

define('lib/MenuItem',['require','exports','module','react','./utils/joinClasses','./utils/classSet'],function (require, exports, module) {var React = require('react');
var joinClasses = require('./utils/joinClasses');
var classSet = require('./utils/classSet');

var MenuItem = React.createClass({displayName: "MenuItem",
  propTypes: {
    header:    React.PropTypes.bool,
    divider:   React.PropTypes.bool,
    href:      React.PropTypes.string,
    title:     React.PropTypes.string,
    target:    React.PropTypes.string,
    onSelect:  React.PropTypes.func,
    eventKey:  React.PropTypes.any
  },

  getDefaultProps: function () {
    return {
      href: '#'
    };
  },

  handleClick: function (e) {
    if (this.props.onSelect) {
      e.preventDefault();
      this.props.onSelect(this.props.eventKey, this.props.href, this.props.target);
    }
  },

  renderAnchor: function () {
    return (
      React.createElement("a", {onClick: this.handleClick, href: this.props.href, target: this.props.target, title: this.props.title, tabIndex: "-1"}, 
        this.props.children
      )
    );
  },

  render: function () {
    var classes = {
        'dropdown-header': this.props.header,
        'divider': this.props.divider
      };

    var children = null;
    if (this.props.header) {
      children = this.props.children;
    } else if (!this.props.divider) {
      children = this.renderAnchor();
    }

    return (
      React.createElement("li", React.__spread({},  this.props, {role: "presentation", title: null, href: null, 
        className: joinClasses(this.props.className, classSet(classes))}), 
        children
      )
    );
  }
});

module.exports = MenuItem;
});

define('lib/Modal',['require','exports','module','react','./utils/joinClasses','./utils/classSet','./BootstrapMixin','./FadeMixin','./utils/EventListener'],function (require, exports, module) {/* global document:false */

var React = require('react');
var joinClasses = require('./utils/joinClasses');
var classSet = require('./utils/classSet');
var BootstrapMixin = require('./BootstrapMixin');
var FadeMixin = require('./FadeMixin');
var EventListener = require('./utils/EventListener');


// TODO:
// - aria-labelledby
// - Add `modal-body` div if only one child passed in that doesn't already have it
// - Tests

var Modal = React.createClass({displayName: "Modal",
  mixins: [BootstrapMixin, FadeMixin],

  propTypes: {
    title: React.PropTypes.node,
    backdrop: React.PropTypes.oneOf(['static', true, false]),
    keyboard: React.PropTypes.bool,
    closeButton: React.PropTypes.bool,
    animation: React.PropTypes.bool,
    onRequestHide: React.PropTypes.func.isRequired
  },

  getDefaultProps: function () {
    return {
      bsClass: 'modal',
      backdrop: true,
      keyboard: true,
      animation: true,
      closeButton: true
    };
  },

  render: function () {
    var modalStyle = {display: 'block'};
    var dialogClasses = this.getBsClassSet();
    delete dialogClasses.modal;
    dialogClasses['modal-dialog'] = true;

    var classes = {
      modal: true,
      fade: this.props.animation,
      'in': !this.props.animation || !document.querySelectorAll
    };

    var modal = (
      React.createElement("div", React.__spread({}, 
        this.props, 
        {title: null, 
        tabIndex: "-1", 
        role: "dialog", 
        style: modalStyle, 
        className: joinClasses(this.props.className, classSet(classes)), 
        onClick: this.props.backdrop === true ? this.handleBackdropClick : null, 
        ref: "modal"}), 
        React.createElement("div", {className: classSet(dialogClasses)}, 
          React.createElement("div", {className: "modal-content", style: {overflow: 'hidden'}}, 
            this.props.title ? this.renderHeader() : null, 
            this.props.children
          )
        )
      )
    );

    return this.props.backdrop ?
      this.renderBackdrop(modal) : modal;
  },

  renderBackdrop: function (modal) {
    var classes = {
      'modal-backdrop': true,
      'fade': this.props.animation
    };

    classes['in'] = !this.props.animation || !document.querySelectorAll;

    var onClick = this.props.backdrop === true ?
      this.handleBackdropClick : null;

    return (
      React.createElement("div", null, 
        React.createElement("div", {className: classSet(classes), ref: "backdrop", onClick: onClick}), 
        modal
      )
    );
  },

  renderHeader: function () {
    var closeButton;
    if (this.props.closeButton) {
      closeButton = (
          React.createElement("button", {type: "button", className: "close", "aria-hidden": "true", onClick: this.props.onRequestHide}, "×")
        );
    }

    var style = this.props.bsStyle;
    var classes = {
      'modal-header': true
    };
    classes['bg-' + style] = style;
    classes['text-' + style] = style;

    var className = classSet(classes);

    return (
      React.createElement("div", {className: className}, 
        closeButton, 
        this.renderTitle()
      )
    );
  },

  renderTitle: function () {
    return (
      React.isValidElement(this.props.title) ?
        this.props.title : React.createElement("h4", {className: "modal-title"}, this.props.title)
    );
  },

  iosClickHack: function () {
    // IOS only allows click events to be delegated to the document on elements
    // it considers 'clickable' - anchors, buttons, etc. We fake a click handler on the
    // DOM nodes themselves. Remove if handled by React: https://github.com/facebook/react/issues/1169
    this.refs.modal.getDOMNode().onclick = function () {};
    this.refs.backdrop.getDOMNode().onclick = function () {};
  },

  componentDidMount: function () {
    this._onDocumentKeyupListener =
      EventListener.listen(document, 'keyup', this.handleDocumentKeyUp);

    var container = (this.props.container && this.props.container.getDOMNode()) || document.body;
    container.className += container.className.length ? ' modal-open' : 'modal-open';

    if (this.props.backdrop) {
      this.iosClickHack();
    }
  },

  componentDidUpdate: function (prevProps) {
    if (this.props.backdrop && this.props.backdrop !== prevProps.backdrop) {
      this.iosClickHack();
    }
  },

  componentWillUnmount: function () {
    this._onDocumentKeyupListener.remove();
    var container = (this.props.container && this.props.container.getDOMNode()) || document.body;
    container.className = container.className.replace(/ ?modal-open/, '');
  },

  handleBackdropClick: function (e) {
    if (e.target !== e.currentTarget) {
      return;
    }

    this.props.onRequestHide();
  },

  handleDocumentKeyUp: function (e) {
    if (this.props.keyboard && e.keyCode === 27) {
      this.props.onRequestHide();
    }
  }
});

module.exports = Modal;

});

define('lib/Nav',['require','exports','module','react','./utils/joinClasses','./BootstrapMixin','./CollapsableMixin','./utils/classSet','./utils/domUtils','./utils/cloneWithProps','./utils/ValidComponentChildren','./utils/createChainedFunction'],function (require, exports, module) {var React = require('react');
var joinClasses = require('./utils/joinClasses');
var BootstrapMixin = require('./BootstrapMixin');
var CollapsableMixin = require('./CollapsableMixin');
var classSet = require('./utils/classSet');
var domUtils = require('./utils/domUtils');
var cloneWithProps = require('./utils/cloneWithProps');

var ValidComponentChildren = require('./utils/ValidComponentChildren');
var createChainedFunction = require('./utils/createChainedFunction');


var Nav = React.createClass({displayName: "Nav",
  mixins: [BootstrapMixin, CollapsableMixin],

  propTypes: {
    bsStyle: React.PropTypes.oneOf(['tabs','pills']),
    stacked: React.PropTypes.bool,
    justified: React.PropTypes.bool,
    onSelect: React.PropTypes.func,
    collapsable: React.PropTypes.bool,
    expanded: React.PropTypes.bool,
    navbar: React.PropTypes.bool,
    eventKey: React.PropTypes.any,
    right: React.PropTypes.bool
  },

  getDefaultProps: function () {
    return {
      bsClass: 'nav'
    };
  },

  getCollapsableDOMNode: function () {
    return this.getDOMNode();
  },

  getCollapsableDimensionValue: function () {
    var node = this.refs.ul.getDOMNode(),
        height = node.offsetHeight,
        computedStyles = domUtils.getComputedStyles(node);

    return height + parseInt(computedStyles.marginTop, 10) + parseInt(computedStyles.marginBottom, 10);
  },

  render: function () {
    var classes = this.props.collapsable ? this.getCollapsableClassSet() : {};

    classes['navbar-collapse'] = this.props.collapsable;

    if (this.props.navbar && !this.props.collapsable) {
      return (this.renderUl());
    }

    return (
      React.createElement("nav", React.__spread({},  this.props, {className: joinClasses(this.props.className, classSet(classes))}), 
        this.renderUl()
      )
    );
  },

  renderUl: function () {
    var classes = this.getBsClassSet();

    classes['nav-stacked'] = this.props.stacked;
    classes['nav-justified'] = this.props.justified;
    classes['navbar-nav'] = this.props.navbar;
    classes['pull-right'] = this.props.pullRight;
    classes['navbar-right'] = this.props.right;

    return (
      React.createElement("ul", React.__spread({},  this.props, {className: joinClasses(this.props.className, classSet(classes)), ref: "ul"}), 
        ValidComponentChildren.map(this.props.children, this.renderNavItem)
      )
    );
  },

  getChildActiveProp: function (child) {
    if (child.props.active) {
      return true;
    }
    if (this.props.activeKey != null) {
      if (child.props.eventKey == this.props.activeKey) {
        return true;
      }
    }
    if (this.props.activeHref != null) {
      if (child.props.href === this.props.activeHref) {
        return true;
      }
    }

    return child.props.active;
  },

  renderNavItem: function (child, index) {
    return cloneWithProps(
      child,
      {
        active: this.getChildActiveProp(child),
        activeKey: this.props.activeKey,
        activeHref: this.props.activeHref,
        onSelect: createChainedFunction(child.props.onSelect, this.props.onSelect),
        ref: child.ref,
        key: child.key ? child.key : index,
        navItem: true
      }
    );
  }
});

module.exports = Nav;

});

define('lib/Navbar',['require','exports','module','react','./utils/joinClasses','./BootstrapMixin','./utils/classSet','./utils/cloneWithProps','./utils/ValidComponentChildren','./utils/createChainedFunction','./Nav'],function (require, exports, module) {var React = require('react');
var joinClasses = require('./utils/joinClasses');
var BootstrapMixin = require('./BootstrapMixin');
var classSet = require('./utils/classSet');
var cloneWithProps = require('./utils/cloneWithProps');

var ValidComponentChildren = require('./utils/ValidComponentChildren');
var createChainedFunction = require('./utils/createChainedFunction');
var Nav = require('./Nav');


var Navbar = React.createClass({displayName: "Navbar",
  mixins: [BootstrapMixin],

  propTypes: {
    fixedTop: React.PropTypes.bool,
    fixedBottom: React.PropTypes.bool,
    staticTop: React.PropTypes.bool,
    inverse: React.PropTypes.bool,
    fluid: React.PropTypes.bool,
    role: React.PropTypes.string,
    componentClass: React.PropTypes.node.isRequired,
    brand: React.PropTypes.node,
    toggleButton: React.PropTypes.node,
    toggleNavKey: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    onToggle: React.PropTypes.func,
    navExpanded: React.PropTypes.bool,
    defaultNavExpanded: React.PropTypes.bool
  },

  getDefaultProps: function () {
    return {
      bsClass: 'navbar',
      bsStyle: 'default',
      role: 'navigation',
      componentClass: 'Nav'
    };
  },

  getInitialState: function () {
    return {
      navExpanded: this.props.defaultNavExpanded
    };
  },

  shouldComponentUpdate: function() {
    // Defer any updates to this component during the `onSelect` handler.
    return !this._isChanging;
  },

  handleToggle: function () {
    if (this.props.onToggle) {
      this._isChanging = true;
      this.props.onToggle();
      this._isChanging = false;
    }

    this.setState({
      navExpanded: !this.state.navExpanded
    });
  },

  isNavExpanded: function () {
    return this.props.navExpanded != null ? this.props.navExpanded : this.state.navExpanded;
  },

  render: function () {
    var classes = this.getBsClassSet();
    var ComponentClass = this.props.componentClass;

    classes['navbar-fixed-top'] = this.props.fixedTop;
    classes['navbar-fixed-bottom'] = this.props.fixedBottom;
    classes['navbar-static-top'] = this.props.staticTop;
    classes['navbar-inverse'] = this.props.inverse;

    return (
      React.createElement(ComponentClass, React.__spread({},  this.props, {className: joinClasses(this.props.className, classSet(classes))}), 
        React.createElement("div", {className: this.props.fluid ? 'container-fluid' : 'container'}, 
          (this.props.brand || this.props.toggleButton || this.props.toggleNavKey != null) ? this.renderHeader() : null, 
          ValidComponentChildren.map(this.props.children, this.renderChild)
        )
      )
    );
  },

  renderChild: function (child, index) {
    return cloneWithProps(child, {
      navbar: true,
      collapsable: this.props.toggleNavKey != null && this.props.toggleNavKey === child.props.eventKey,
      expanded: this.props.toggleNavKey != null && this.props.toggleNavKey === child.props.eventKey && this.isNavExpanded(),
      key: child.key ? child.key : index,
      ref: child.ref
    });
  },

  renderHeader: function () {
    var brand;

    if (this.props.brand) {
      brand = React.isValidElement(this.props.brand) ?
        cloneWithProps(this.props.brand, {
          className: 'navbar-brand'
        }) : React.createElement("span", {className: "navbar-brand"}, this.props.brand);
    }

    return (
      React.createElement("div", {className: "navbar-header"}, 
        brand, 
        (this.props.toggleButton || this.props.toggleNavKey != null) ? this.renderToggleButton() : null
      )
    );
  },

  renderToggleButton: function () {
    var children;

    if (React.isValidElement(this.props.toggleButton)) {
      return cloneWithProps(this.props.toggleButton, {
        className: 'navbar-toggle',
        onClick: createChainedFunction(this.handleToggle, this.props.toggleButton.props.onClick)
      });
    }

    children = (this.props.toggleButton != null) ?
      this.props.toggleButton : [
        React.createElement("span", {className: "sr-only", key: 0}, "Toggle navigation"),
        React.createElement("span", {className: "icon-bar", key: 1}),
        React.createElement("span", {className: "icon-bar", key: 2}),
        React.createElement("span", {className: "icon-bar", key: 3})
    ];

    return (
      React.createElement("button", {className: "navbar-toggle", type: "button", onClick: this.handleToggle}, 
        children
      )
    );
  }
});

module.exports = Navbar;

});

define('lib/NavItem',['require','exports','module','react','./utils/joinClasses','./utils/classSet','./BootstrapMixin'],function (require, exports, module) {var React = require('react');
var joinClasses = require('./utils/joinClasses');
var classSet = require('./utils/classSet');
var BootstrapMixin = require('./BootstrapMixin');

var NavItem = React.createClass({displayName: "NavItem",
  mixins: [BootstrapMixin],

  propTypes: {
    onSelect: React.PropTypes.func,
    active: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    href: React.PropTypes.string,
    title: React.PropTypes.string,
    eventKey: React.PropTypes.any,
    target: React.PropTypes.string
  },

  getDefaultProps: function () {
    return {
      href: '#'
    };
  },

  render: function () {
    var $__0= 
        
        
        
        
        
        
           this.props,disabled=$__0.disabled,active=$__0.active,href=$__0.href,title=$__0.title,target=$__0.target,children=$__0.children,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{disabled:1,active:1,href:1,title:1,target:1,children:1}),
        classes = {
          'active': active,
          'disabled': disabled
        };

    return (
      React.createElement("li", React.__spread({},  props, {className: joinClasses(props.className, classSet(classes))}), 
        React.createElement("a", {
          href: href, 
          title: title, 
          target: target, 
          onClick: this.handleClick, 
          ref: "anchor"}, 
          children 
        )
      )
    );
  },

  handleClick: function (e) {
    if (this.props.onSelect) {
      e.preventDefault();

      if (!this.props.disabled) {
        this.props.onSelect(this.props.eventKey, this.props.href, this.props.target);
      }
    }
  }
});

module.exports = NavItem;
});

define('lib/utils/CustomPropTypes',['require','exports','module','react'],function (require, exports, module) {var React = require('react');

var ANONYMOUS = '<<anonymous>>';

var CustomPropTypes = {
  /**
   * Checks whether a prop provides a DOM element
   *
   * The element can be provided in two forms:
   * - Directly passed
   * - Or passed an object which has a `getDOMNode` method which will return the required DOM element
   *
   * @param props
   * @param propName
   * @param componentName
   * @returns {Error|undefined}
   */
  mountable: createMountableChecker()
};

/**
 * Create chain-able isRequired validator
 *
 * Largely copied directly from:
 *  https://github.com/facebook/react/blob/0.11-stable/src/core/ReactPropTypes.js#L94
 */
function createChainableTypeChecker(validate) {
  function checkType(isRequired, props, propName, componentName) {
    componentName = componentName || ANONYMOUS;
    if (props[propName] == null) {
      if (isRequired) {
        return new Error(
          'Required prop `' + propName + '` was not specified in ' +
            '`' + componentName + '`.'
        );
      }
    } else {
      return validate(props, propName, componentName);
    }
  }

  var chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);

  return chainedCheckType;
}

function createMountableChecker() {
  function validate(props, propName, componentName) {
    if (typeof props[propName] !== 'object' ||
      typeof props[propName].getDOMNode !== 'function' && props[propName].nodeType !== 1) {
      return new Error(
        'Invalid prop `' + propName + '` supplied to ' +
          '`' + componentName + '`, expected a DOM element or an object that has a `getDOMNode` method'
      );
    }
  }

  return createChainableTypeChecker(validate);
}

module.exports = CustomPropTypes;
});

define('lib/OverlayMixin',['require','exports','module','react','./utils/CustomPropTypes'],function (require, exports, module) {var React = require('react');
var CustomPropTypes = require('./utils/CustomPropTypes');

module.exports = {
  propTypes: {
    container: CustomPropTypes.mountable
  },

  getDefaultProps: function () {
    return {
      container: {
        // Provide `getDOMNode` fn mocking a React component API. The `document.body`
        // reference needs to be contained within this function so that it is not accessed
        // in environments where it would not be defined, e.g. nodejs. Equally this is needed
        // before the body is defined where `document.body === null`, this ensures
        // `document.body` is only accessed after componentDidMount.
        getDOMNode: function getDOMNode() {
          return document.body;
        }
      }
    };
  },

  componentWillUnmount: function () {
    this._unrenderOverlay();
    if (this._overlayTarget) {
      this.getContainerDOMNode()
        .removeChild(this._overlayTarget);
      this._overlayTarget = null;
    }
  },

  componentDidUpdate: function () {
    this._renderOverlay();
  },

  componentDidMount: function () {
    this._renderOverlay();
  },

  _mountOverlayTarget: function () {
    this._overlayTarget = document.createElement('div');
    this.getContainerDOMNode()
      .appendChild(this._overlayTarget);
  },

  _renderOverlay: function () {
    if (!this._overlayTarget) {
      this._mountOverlayTarget();
    }

    var overlay = this.renderOverlay();

    // Save reference to help testing
    if (overlay !== null) {
      this._overlayInstance = React.render(overlay, this._overlayTarget);
    } else {
      // Unrender if the component is null for transitions to null
      this._unrenderOverlay();
    }
  },

  _unrenderOverlay: function () {
    React.unmountComponentAtNode(this._overlayTarget);
    this._overlayInstance = null;
  },

  getOverlayDOMNode: function () {
    if (!this.isMounted()) {
      throw new Error('getOverlayDOMNode(): A component must be mounted to have a DOM node.');
    }

    if (this._overlayInstance) {
      return this._overlayInstance.getDOMNode();
    }

    return null;
  },

  getContainerDOMNode: function () {
    return this.props.container.getDOMNode ?
      this.props.container.getDOMNode() : this.props.container;
  }
};

});

define('lib/ModalTrigger',['require','exports','module','react','./OverlayMixin','./utils/cloneWithProps','./utils/createChainedFunction'],function (require, exports, module) {var React = require('react');
var OverlayMixin = require('./OverlayMixin');
var cloneWithProps = require('./utils/cloneWithProps');

var createChainedFunction = require('./utils/createChainedFunction');

var ModalTrigger = React.createClass({displayName: "ModalTrigger",
  mixins: [OverlayMixin],

  propTypes: {
    modal: React.PropTypes.node.isRequired
  },

  getInitialState: function () {
    return {
      isOverlayShown: false
    };
  },

  show: function () {
    this.setState({
      isOverlayShown: true
    });
  },

  hide: function () {
    this.setState({
      isOverlayShown: false
    });
  },

  toggle: function () {
    this.setState({
      isOverlayShown: !this.state.isOverlayShown
    });
  },

  renderOverlay: function () {
    if (!this.state.isOverlayShown) {
      return React.createElement("span", null);
    }

    return cloneWithProps(
      this.props.modal,
      {
        onRequestHide: this.hide
      }
    );
  },

  render: function () {
    var child = React.Children.only(this.props.children);
    return cloneWithProps(
      child,
      {
        onClick: createChainedFunction(child.props.onClick, this.toggle)
      }
    );
  }
});

module.exports = ModalTrigger;
});

define('lib/OverlayTrigger',['require','exports','module','react','./OverlayMixin','./utils/domUtils','./utils/cloneWithProps','./utils/createChainedFunction','./utils/Object.assign'],function (require, exports, module) {var React = require('react');
var OverlayMixin = require('./OverlayMixin');
var domUtils = require('./utils/domUtils');
var cloneWithProps = require('./utils/cloneWithProps');

var createChainedFunction = require('./utils/createChainedFunction');
var assign = require('./utils/Object.assign');

/**
 * Check if value one is inside or equal to the of value
 *
 * @param {string} one
 * @param {string|array} of
 * @returns {boolean}
 */
function isOneOf(one, of) {
  if (Array.isArray(of)) {
    return of.indexOf(one) >= 0;
  }
  return one === of;
}

var OverlayTrigger = React.createClass({displayName: "OverlayTrigger",
  mixins: [OverlayMixin],

  propTypes: {
    trigger: React.PropTypes.oneOfType([
      React.PropTypes.oneOf(['manual', 'click', 'hover', 'focus']),
      React.PropTypes.arrayOf(React.PropTypes.oneOf(['click', 'hover', 'focus']))
    ]),
    placement: React.PropTypes.oneOf(['top','right', 'bottom', 'left']),
    delay: React.PropTypes.number,
    delayShow: React.PropTypes.number,
    delayHide: React.PropTypes.number,
    defaultOverlayShown: React.PropTypes.bool,
    overlay: React.PropTypes.node.isRequired
  },

  getDefaultProps: function () {
    return {
      placement: 'right',
      trigger: ['hover', 'focus']
    };
  },

  getInitialState: function () {
    return {
      isOverlayShown: this.props.defaultOverlayShown == null ?
        false : this.props.defaultOverlayShown,
      overlayLeft: null,
      overlayTop: null
    };
  },

  show: function () {
    this.setState({
      isOverlayShown: true
    }, function() {
      this.updateOverlayPosition();
    });
  },

  hide: function () {
    this.setState({
      isOverlayShown: false
    });
  },

  toggle: function () {
    this.state.isOverlayShown ?
      this.hide() : this.show();
  },

  renderOverlay: function () {
    if (!this.state.isOverlayShown) {
      return React.createElement("span", null);
    }

    return cloneWithProps(
      this.props.overlay,
      {
        onRequestHide: this.hide,
        placement: this.props.placement,
        positionLeft: this.state.overlayLeft,
        positionTop: this.state.overlayTop
      }
    );
  },

  render: function () {
    if (this.props.trigger === 'manual') {
      return React.Children.only(this.props.children);
    }

    var props = {};

    if (isOneOf('click', this.props.trigger)) {
      props.onClick = createChainedFunction(this.toggle, this.props.onClick);
    }

    if (isOneOf('hover', this.props.trigger)) {
      props.onMouseOver = createChainedFunction(this.handleDelayedShow, this.props.onMouseOver);
      props.onMouseOut = createChainedFunction(this.handleDelayedHide, this.props.onMouseOut);
    }

    if (isOneOf('focus', this.props.trigger)) {
      props.onFocus = createChainedFunction(this.handleDelayedShow, this.props.onFocus);
      props.onBlur = createChainedFunction(this.handleDelayedHide, this.props.onBlur);
    }

    return cloneWithProps(
      React.Children.only(this.props.children),
      props
    );
  },

  componentWillUnmount: function() {
    clearTimeout(this._hoverDelay);
  },

  componentDidMount: function() {
    this.updateOverlayPosition();
  },

  handleDelayedShow: function () {
    if (this._hoverDelay != null) {
      clearTimeout(this._hoverDelay);
      this._hoverDelay = null;
      return;
    }

    var delay = this.props.delayShow != null ?
      this.props.delayShow : this.props.delay;

    if (!delay) {
      this.show();
      return;
    }

    this._hoverDelay = setTimeout(function() {
      this._hoverDelay = null;
      this.show();
    }.bind(this), delay);
  },

  handleDelayedHide: function () {
    if (this._hoverDelay != null) {
      clearTimeout(this._hoverDelay);
      this._hoverDelay = null;
      return;
    }

    var delay = this.props.delayHide != null ?
      this.props.delayHide : this.props.delay;

    if (!delay) {
      this.hide();
      return;
    }

    this._hoverDelay = setTimeout(function() {
      this._hoverDelay = null;
      this.hide();
    }.bind(this), delay);
  },

  updateOverlayPosition: function () {
    if (!this.isMounted()) {
      return;
    }

    var pos = this.calcOverlayPosition();

    this.setState({
      overlayLeft: pos.left,
      overlayTop: pos.top
    });
  },

  calcOverlayPosition: function () {
    var childOffset = this.getPosition();

    var overlayNode = this.getOverlayDOMNode();
    var overlayHeight = overlayNode.offsetHeight;
    var overlayWidth = overlayNode.offsetWidth;

    switch (this.props.placement) {
      case 'right':
        return {
          top: childOffset.top + childOffset.height / 2 - overlayHeight / 2,
          left: childOffset.left + childOffset.width
        };
      case 'left':
        return {
          top: childOffset.top + childOffset.height / 2 - overlayHeight / 2,
          left: childOffset.left - overlayWidth
        };
      case 'top':
        return {
          top: childOffset.top - overlayHeight,
          left: childOffset.left + childOffset.width / 2 - overlayWidth / 2
        };
      case 'bottom':
        return {
          top: childOffset.top + childOffset.height,
          left: childOffset.left + childOffset.width / 2 - overlayWidth / 2
        };
      default:
        throw new Error('calcOverlayPosition(): No such placement of "' + this.props.placement + '" found.');
    }
  },

  getPosition: function () {
    var node = this.getDOMNode();
    var container = this.getContainerDOMNode();

    var offset = container.tagName == 'BODY' ?
      domUtils.getOffset(node) : domUtils.getPosition(node, container);

    return assign({}, offset, {
      height: node.offsetHeight,
      width: node.offsetWidth
    });
  }
});

module.exports = OverlayTrigger;
});

define('lib/PageHeader',['require','exports','module','react','./utils/joinClasses'],function (require, exports, module) {var React = require('react');
var joinClasses = require('./utils/joinClasses');

var PageHeader = React.createClass({displayName: "PageHeader",

  render: function () {
    return (
      React.createElement("div", React.__spread({},  this.props, {className: joinClasses(this.props.className, 'page-header')}), 
        React.createElement("h1", null, this.props.children)
      )
    );
  }
});

module.exports = PageHeader;
});

define('lib/Panel',['require','exports','module','react','./utils/joinClasses','./utils/classSet','./utils/cloneWithProps','./BootstrapMixin','./CollapsableMixin'],function (require, exports, module) {var React = require('react');
var joinClasses = require('./utils/joinClasses');
var classSet = require('./utils/classSet');
var cloneWithProps = require('./utils/cloneWithProps');

var BootstrapMixin = require('./BootstrapMixin');
var CollapsableMixin = require('./CollapsableMixin');

var Panel = React.createClass({displayName: "Panel",
  mixins: [BootstrapMixin, CollapsableMixin],

  propTypes: {
    onSelect: React.PropTypes.func,
    header: React.PropTypes.node,
    footer: React.PropTypes.node,
    eventKey: React.PropTypes.any
  },

  getDefaultProps: function () {
    return {
      bsClass: 'panel',
      bsStyle: 'default'
    };
  },

  handleSelect: function (e) {
    if (this.props.onSelect) {
      this._isChanging = true;
      this.props.onSelect(this.props.eventKey);
      this._isChanging = false;
    }

    e.preventDefault();

    this.setState({
      expanded: !this.state.expanded
    });
  },

  shouldComponentUpdate: function () {
    return !this._isChanging;
  },

  getCollapsableDimensionValue: function () {
    return this.refs.panel.getDOMNode().scrollHeight;
  },

  getCollapsableDOMNode: function () {
    if (!this.isMounted() || !this.refs || !this.refs.panel) {
      return null;
    }

    return this.refs.panel.getDOMNode();
  },

  render: function () {
    var classes = this.getBsClassSet();
    classes['panel'] = true;

    return (
      React.createElement("div", React.__spread({},  this.props, {className: joinClasses(this.props.className, classSet(classes)), 
        id: this.props.collapsable ? null : this.props.id, onSelect: null}), 
        this.renderHeading(), 
        this.props.collapsable ? this.renderCollapsableBody() : this.renderBody(), 
        this.renderFooter()
      )
    );
  },

  renderCollapsableBody: function () {
    return (
      React.createElement("div", {className: classSet(this.getCollapsableClassSet('panel-collapse')), id: this.props.id, ref: "panel"}, 
        this.renderBody()
      )
    );
  },

  renderBody: function () {
    var allChildren = this.props.children;
    var bodyElements = [];

    function getProps() {
      return {key: bodyElements.length};
    }

    function addPanelChild (child) {
      bodyElements.push(cloneWithProps(child, getProps()));
    }

    function addPanelBody (children) {
      bodyElements.push(
        React.createElement("div", React.__spread({className: "panel-body"},  getProps()), 
          children
        )
      );
    }

    // Handle edge cases where we should not iterate through children.
    if (!Array.isArray(allChildren) || allChildren.length == 0) {
      if (this.shouldRenderFill(allChildren)) {
        addPanelChild(allChildren);
      } else {
        addPanelBody(allChildren);
      }
    } else {
      var panelBodyChildren = [];

      function maybeRenderPanelBody () {
        if (panelBodyChildren.length == 0) {
          return;
        }

        addPanelBody(panelBodyChildren);
        panelBodyChildren = [];
      }

      allChildren.forEach(function(child) {
        if (this.shouldRenderFill(child)) {
          maybeRenderPanelBody();

          // Separately add the filled element.
          addPanelChild(child);
        } else {
          panelBodyChildren.push(child);
        }
      }.bind(this));

      maybeRenderPanelBody();
    }

    return bodyElements;
  },

  shouldRenderFill: function (child) {
    return React.isValidElement(child) && child.props.fill != null
  },

  renderHeading: function () {
    var header = this.props.header;

    if (!header) {
      return null;
    }

    if (!React.isValidElement(header) || Array.isArray(header)) {
      header = this.props.collapsable ?
        this.renderCollapsableTitle(header) : header;
    } else if (this.props.collapsable) {
      header = cloneWithProps(header, {
        className: 'panel-title',
        children: this.renderAnchor(header.props.children)
      });
    } else {
      header = cloneWithProps(header, {
        className: 'panel-title'
      });
    }

    return (
      React.createElement("div", {className: "panel-heading"}, 
        header
      )
    );
  },

  renderAnchor: function (header) {
    return (
      React.createElement("a", {
        href: '#' + (this.props.id || ''), 
        className: this.isExpanded() ? null : 'collapsed', 
        onClick: this.handleSelect}, 
        header
      )
    );
  },

  renderCollapsableTitle: function (header) {
    return (
      React.createElement("h4", {className: "panel-title"}, 
        this.renderAnchor(header)
      )
    );
  },

  renderFooter: function () {
    if (!this.props.footer) {
      return null;
    }

    return (
      React.createElement("div", {className: "panel-footer"}, 
        this.props.footer
      )
    );
  }
});

module.exports = Panel;

});

define('lib/PageItem',['require','exports','module','react','./utils/joinClasses','./utils/classSet'],function (require, exports, module) {var React = require('react');
var joinClasses = require('./utils/joinClasses');
var classSet = require('./utils/classSet');

var PageItem = React.createClass({displayName: "PageItem",

  propTypes: {
    href: React.PropTypes.string,
    target: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    previous: React.PropTypes.bool,
    next: React.PropTypes.bool,
    onSelect: React.PropTypes.func,
    eventKey: React.PropTypes.any
  },

  getDefaultProps: function () {
    return {
      href: '#'
    };
  },

  render: function () {
    var classes = {
      'disabled': this.props.disabled,
      'previous': this.props.previous,
      'next': this.props.next
    };

    return (
      React.createElement("li", React.__spread({}, 
        this.props, 
        {className: joinClasses(this.props.className, classSet(classes))}), 
        React.createElement("a", {
          href: this.props.href, 
          title: this.props.title, 
          target: this.props.target, 
          onClick: this.handleSelect, 
          ref: "anchor"}, 
          this.props.children
        )
      )
    );
  },

  handleSelect: function (e) {
    if (this.props.onSelect) {
      e.preventDefault();

      if (!this.props.disabled) {
        this.props.onSelect(this.props.eventKey, this.props.href, this.props.target);
      }
    }
  }
});

module.exports = PageItem;
});

define('lib/Pager',['require','exports','module','react','./utils/joinClasses','./utils/cloneWithProps','./utils/ValidComponentChildren','./utils/createChainedFunction'],function (require, exports, module) {var React = require('react');
var joinClasses = require('./utils/joinClasses');
var cloneWithProps = require('./utils/cloneWithProps');

var ValidComponentChildren = require('./utils/ValidComponentChildren');
var createChainedFunction = require('./utils/createChainedFunction');

var Pager = React.createClass({displayName: "Pager",

  propTypes: {
    onSelect: React.PropTypes.func
  },

  render: function () {
    return (
      React.createElement("ul", React.__spread({}, 
        this.props, 
        {className: joinClasses(this.props.className, 'pager')}), 
        ValidComponentChildren.map(this.props.children, this.renderPageItem)
      )
    );
  },

  renderPageItem: function (child, index) {
    return cloneWithProps(
      child,
      {
        onSelect: createChainedFunction(child.props.onSelect, this.props.onSelect),
        ref: child.ref,
        key: child.key ? child.key : index
      }
    );
  }
});

module.exports = Pager;
});

define('lib/Popover',['require','exports','module','react','./utils/joinClasses','./utils/classSet','./BootstrapMixin'],function (require, exports, module) {var React = require('react');
var joinClasses = require('./utils/joinClasses');
var classSet = require('./utils/classSet');
var BootstrapMixin = require('./BootstrapMixin');


var Popover = React.createClass({displayName: "Popover",
  mixins: [BootstrapMixin],

  propTypes: {
    placement: React.PropTypes.oneOf(['top','right', 'bottom', 'left']),
    positionLeft: React.PropTypes.number,
    positionTop: React.PropTypes.number,
    arrowOffsetLeft: React.PropTypes.number,
    arrowOffsetTop: React.PropTypes.number,
    title: React.PropTypes.node
  },

  getDefaultProps: function () {
    return {
      placement: 'right'
    };
  },

  render: function () {
    var classes = {};
    classes['popover'] = true;
    classes[this.props.placement] = true;
    classes['in'] = this.props.positionLeft != null || this.props.positionTop != null;

    var style = {};
    style['left'] = this.props.positionLeft;
    style['top'] = this.props.positionTop;
    style['display'] = 'block';

    var arrowStyle = {};
    arrowStyle['left'] = this.props.arrowOffsetLeft;
    arrowStyle['top'] = this.props.arrowOffsetTop;

    return (
      React.createElement("div", React.__spread({},  this.props, {className: joinClasses(this.props.className, classSet(classes)), style: style, title: null}), 
        React.createElement("div", {className: "arrow", style: arrowStyle}), 
        this.props.title ? this.renderTitle() : null, 
        React.createElement("div", {className: "popover-content"}, 
          this.props.children
        )
      )
    );
  },

  renderTitle: function() {
    return (
      React.createElement("h3", {className: "popover-title"}, this.props.title)
    );
  }
});

module.exports = Popover;
});

define('lib/ProgressBar',['require','exports','module','react','./utils/joinClasses','./Interpolate','./BootstrapMixin','./utils/classSet','./utils/cloneWithProps','./utils/ValidComponentChildren'],function (require, exports, module) {var React = require('react');
var joinClasses = require('./utils/joinClasses');
var Interpolate = require('./Interpolate');
var BootstrapMixin = require('./BootstrapMixin');
var classSet = require('./utils/classSet');
var cloneWithProps = require('./utils/cloneWithProps');

var ValidComponentChildren = require('./utils/ValidComponentChildren');


var ProgressBar = React.createClass({displayName: "ProgressBar",
  propTypes: {
    min: React.PropTypes.number,
    now: React.PropTypes.number,
    max: React.PropTypes.number,
    label: React.PropTypes.node,
    srOnly: React.PropTypes.bool,
    striped: React.PropTypes.bool,
    active: React.PropTypes.bool
  },

  mixins: [BootstrapMixin],

  getDefaultProps: function () {
    return {
      bsClass: 'progress-bar',
      min: 0,
      max: 100
    };
  },

  getPercentage: function (now, min, max) {
    return Math.ceil((now - min) / (max - min) * 100);
  },

  render: function () {
    var classes = {
        progress: true
      };

    if (this.props.active) {
      classes['progress-striped'] = true;
      classes['active'] = true;
    } else if (this.props.striped) {
      classes['progress-striped'] = true;
    }

    if (!ValidComponentChildren.hasValidComponent(this.props.children)) {
      if (!this.props.isChild) {
        return (
          React.createElement("div", React.__spread({},  this.props, {className: joinClasses(this.props.className, classSet(classes))}), 
            this.renderProgressBar()
          )
        );
      } else {
        return (
          this.renderProgressBar()
        );
      }
    } else {
      return (
        React.createElement("div", React.__spread({},  this.props, {className: joinClasses(this.props.className, classSet(classes))}), 
          ValidComponentChildren.map(this.props.children, this.renderChildBar)
        )
      );
    }
  },

  renderChildBar: function (child, index) {
    return cloneWithProps(child, {
      isChild: true,
      key: child.key ? child.key : index,
      ref: child.ref
    });
  },

  renderProgressBar: function () {
    var percentage = this.getPercentage(
        this.props.now,
        this.props.min,
        this.props.max
      );

    var label;

    if (typeof this.props.label === "string") {
      label = this.renderLabel(percentage);
    } else if (this.props.label) {
      label = this.props.label;
    }

    if (this.props.srOnly) {
      label = this.renderScreenReaderOnlyLabel(label);
    }

    var classes = this.getBsClassSet();

    return (
      React.createElement("div", React.__spread({},  this.props, {className: joinClasses(this.props.className, classSet(classes)), role: "progressbar", 
        style: {width: percentage + '%'}, 
        "aria-valuenow": this.props.now, 
        "aria-valuemin": this.props.min, 
        "aria-valuemax": this.props.max}), 
        label
      )
    );
  },

  renderLabel: function (percentage) {
    var InterpolateClass = this.props.interpolateClass || Interpolate;

    return (
      React.createElement(InterpolateClass, {
        now: this.props.now, 
        min: this.props.min, 
        max: this.props.max, 
        percent: percentage, 
        bsStyle: this.props.bsStyle}, 
        this.props.label
      )
    );
  },

  renderScreenReaderOnlyLabel: function (label) {
    return (
      React.createElement("span", {className: "sr-only"}, 
        label
      )
    );
  }
});

module.exports = ProgressBar;

});

define('lib/Row',['require','exports','module','react','./utils/joinClasses'],function (require, exports, module) {var React = require('react');
var joinClasses = require('./utils/joinClasses');

var Row = React.createClass({displayName: "Row",
  propTypes: {
    componentClass: React.PropTypes.node.isRequired
  },

  getDefaultProps: function () {
    return {
      componentClass: 'div'
    };
  },

  render: function () {
    var ComponentClass = this.props.componentClass;

    return (
      React.createElement(ComponentClass, React.__spread({},  this.props, {className: joinClasses(this.props.className, 'row')}), 
        this.props.children
      )
    );
  }
});

module.exports = Row;
});

define('lib/SplitButton',['require','exports','module','react','./utils/joinClasses','./utils/classSet','./BootstrapMixin','./DropdownStateMixin','./Button','./ButtonGroup','./DropdownMenu'],function (require, exports, module) {var React = require('react');
var joinClasses = require('./utils/joinClasses');
var classSet = require('./utils/classSet');
var BootstrapMixin = require('./BootstrapMixin');
var DropdownStateMixin = require('./DropdownStateMixin');
var Button = require('./Button');
var ButtonGroup = require('./ButtonGroup');
var DropdownMenu = require('./DropdownMenu');

var SplitButton = React.createClass({displayName: "SplitButton",
  mixins: [BootstrapMixin, DropdownStateMixin],

  propTypes: {
    pullRight:     React.PropTypes.bool,
    title:         React.PropTypes.node,
    href:          React.PropTypes.string,
    target:        React.PropTypes.string,
    dropdownTitle: React.PropTypes.node,
    onClick:       React.PropTypes.func,
    onSelect:      React.PropTypes.func,
    disabled:      React.PropTypes.bool
  },

  getDefaultProps: function () {
    return {
      dropdownTitle: 'Toggle dropdown'
    };
  },

  render: function () {
    var groupClasses = {
        'open': this.state.open,
        'dropup': this.props.dropup
      };

    var button = (
      React.createElement(Button, React.__spread({}, 
        this.props, 
        {ref: "button", 
        onClick: this.handleButtonClick, 
        title: null, 
        id: null}), 
        this.props.title
      )
    );

    var dropdownButton = (
      React.createElement(Button, React.__spread({}, 
        this.props, 
        {ref: "dropdownButton", 
        className: joinClasses(this.props.className, 'dropdown-toggle'), 
        onClick: this.handleDropdownClick, 
        title: null, 
        href: null, 
        target: null, 
        id: null}), 
        React.createElement("span", {className: "sr-only"}, this.props.dropdownTitle), 
        React.createElement("span", {className: "caret"})
      )
    );

    return (
      React.createElement(ButtonGroup, {
        bsSize: this.props.bsSize, 
        className: classSet(groupClasses), 
        id: this.props.id}, 
        button, 
        dropdownButton, 
        React.createElement(DropdownMenu, {
          ref: "menu", 
          onSelect: this.handleOptionSelect, 
          "aria-labelledby": this.props.id, 
          pullRight: this.props.pullRight}, 
          this.props.children
        )
      )
    );
  },

  handleButtonClick: function (e) {
    if (this.state.open) {
      this.setDropdownState(false);
    }

    if (this.props.onClick) {
      this.props.onClick(e, this.props.href, this.props.target);
    }
  },

  handleDropdownClick: function (e) {
    e.preventDefault();

    this.setDropdownState(!this.state.open);
  },

  handleOptionSelect: function (key) {
    if (this.props.onSelect) {
      this.props.onSelect(key);
    }

    this.setDropdownState(false);
  }
});

module.exports = SplitButton;

});

define('lib/SubNav',['require','exports','module','react','./utils/joinClasses','./utils/classSet','./utils/cloneWithProps','./utils/ValidComponentChildren','./utils/createChainedFunction','./BootstrapMixin'],function (require, exports, module) {var React = require('react');
var joinClasses = require('./utils/joinClasses');
var classSet = require('./utils/classSet');
var cloneWithProps = require('./utils/cloneWithProps');

var ValidComponentChildren = require('./utils/ValidComponentChildren');
var createChainedFunction = require('./utils/createChainedFunction');
var BootstrapMixin = require('./BootstrapMixin');


var SubNav = React.createClass({displayName: "SubNav",
  mixins: [BootstrapMixin],

  propTypes: {
    onSelect: React.PropTypes.func,
    active: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    href: React.PropTypes.string,
    title: React.PropTypes.string,
    text: React.PropTypes.node,
    target: React.PropTypes.string
  },

  getDefaultProps: function () {
    return {
      bsClass: 'nav'
    };
  },

  handleClick: function (e) {
    if (this.props.onSelect) {
      e.preventDefault();

      if (!this.props.disabled) {
        this.props.onSelect(this.props.eventKey, this.props.href, this.props.target);
      }
    }
  },

  isActive: function () {
    return this.isChildActive(this);
  },

  isChildActive: function (child) {
    if (child.props.active) {
      return true;
    }

    if (this.props.activeKey != null && this.props.activeKey === child.props.eventKey) {
      return true;
    }

    if (this.props.activeHref != null && this.props.activeHref === child.props.href) {
      return true;
    }

    if (child.props.children) {
      var isActive = false;

      ValidComponentChildren.forEach(
        child.props.children,
        function (child) {
          if (this.isChildActive(child)) {
            isActive = true;
          }
        },
        this
      );

      return isActive;
    }

    return false;
  },

  getChildActiveProp: function (child) {
    if (child.props.active) {
      return true;
    }
    if (this.props.activeKey != null) {
      if (child.props.eventKey == this.props.activeKey) {
        return true;
      }
    }
    if (this.props.activeHref != null) {
      if (child.props.href === this.props.activeHref) {
        return true;
      }
    }

    return child.props.active;
  },

  render: function () {
    var classes = {
      'active': this.isActive(),
      'disabled': this.props.disabled
    };

    return (
      React.createElement("li", React.__spread({},  this.props, {className: joinClasses(this.props.className, classSet(classes))}), 
        React.createElement("a", {
          href: this.props.href, 
          title: this.props.title, 
          target: this.props.target, 
          onClick: this.handleClick, 
          ref: "anchor"}, 
          this.props.text
        ), 
        React.createElement("ul", {className: "nav"}, 
          ValidComponentChildren.map(this.props.children, this.renderNavItem)
        )
      )
    );
  },

  renderNavItem: function (child, index) {
    return cloneWithProps(
      child,
      {
        active: this.getChildActiveProp(child),
        onSelect: createChainedFunction(child.props.onSelect, this.props.onSelect),
        ref: child.ref,
        key: child.key ? child.key : index
      }
    );
  }
});

module.exports = SubNav;

});

define('lib/TabbedArea',['require','exports','module','react','./BootstrapMixin','./utils/cloneWithProps','./utils/ValidComponentChildren','./Nav','./NavItem'],function (require, exports, module) {var React = require('react');
var BootstrapMixin = require('./BootstrapMixin');
var cloneWithProps = require('./utils/cloneWithProps');

var ValidComponentChildren = require('./utils/ValidComponentChildren');
var Nav = require('./Nav');
var NavItem = require('./NavItem');

function getDefaultActiveKeyFromChildren(children) {
  var defaultActiveKey;

  ValidComponentChildren.forEach(children, function(child) {
    if (defaultActiveKey == null) {
      defaultActiveKey = child.props.eventKey;
    }
  });

  return defaultActiveKey;
}

var TabbedArea = React.createClass({displayName: "TabbedArea",
  mixins: [BootstrapMixin],

  propTypes: {
    bsStyle: React.PropTypes.oneOf(['tabs','pills']),
    animation: React.PropTypes.bool,
    onSelect: React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      bsStyle: "tabs",
      animation: true
    };
  },

  getInitialState: function () {
    var defaultActiveKey = this.props.defaultActiveKey != null ?
      this.props.defaultActiveKey : getDefaultActiveKeyFromChildren(this.props.children);

    // TODO: In __DEV__ mode warn via `console.warn` if no `defaultActiveKey` has
    // been set by this point, invalid children or missing key properties are likely the cause.

    return {
      activeKey: defaultActiveKey,
      previousActiveKey: null
    };
  },

  componentWillReceiveProps: function (nextProps) {
    if (nextProps.activeKey != null && nextProps.activeKey !== this.props.activeKey) {
      this.setState({
        previousActiveKey: this.props.activeKey
      });
    }
  },

  handlePaneAnimateOutEnd: function () {
    this.setState({
      previousActiveKey: null
    });
  },

  render: function () {
    var activeKey =
      this.props.activeKey != null ? this.props.activeKey : this.state.activeKey;

    function renderTabIfSet(child) {
      return child.props.tab != null ? this.renderTab(child) : null;
    }

    var nav = (
      React.createElement(Nav, React.__spread({},  this.props, {activeKey: activeKey, onSelect: this.handleSelect, ref: "tabs"}), 
        ValidComponentChildren.map(this.props.children, renderTabIfSet, this)
      )
    );

    return (
      React.createElement("div", null, 
        nav, 
        React.createElement("div", {id: this.props.id, className: "tab-content", ref: "panes"}, 
          ValidComponentChildren.map(this.props.children, this.renderPane)
        )
      )
    );
  },

  getActiveKey: function () {
    return this.props.activeKey != null ? this.props.activeKey : this.state.activeKey;
  },

  renderPane: function (child, index) {
    var activeKey = this.getActiveKey();

    return cloneWithProps(
        child,
        {
          active: (child.props.eventKey === activeKey &&
            (this.state.previousActiveKey == null || !this.props.animation)),
          ref: child.ref,
          key: child.key ? child.key : index,
          animation: this.props.animation,
          onAnimateOutEnd: (this.state.previousActiveKey != null &&
            child.props.eventKey === this.state.previousActiveKey) ? this.handlePaneAnimateOutEnd: null
        }
      );
  },

  renderTab: function (child) {
    var key = child.props.eventKey;
    return (
      React.createElement(NavItem, {
        ref: 'tab' + key, 
        eventKey: key}, 
        child.props.tab
      )
    );
  },

  shouldComponentUpdate: function() {
    // Defer any updates to this component during the `onSelect` handler.
    return !this._isChanging;
  },

  handleSelect: function (key) {
    if (this.props.onSelect) {
      this._isChanging = true;
      this.props.onSelect(key);
      this._isChanging = false;
    } else if (key !== this.getActiveKey()) {
      this.setState({
        activeKey: key,
        previousActiveKey: this.getActiveKey()
      });
    }
  }
});

module.exports = TabbedArea;
});

define('lib/Table',['require','exports','module','react','./utils/joinClasses','./utils/classSet'],function (require, exports, module) {var React = require('react');
var joinClasses = require('./utils/joinClasses');
var classSet = require('./utils/classSet');

var Table = React.createClass({displayName: "Table",
  propTypes: {
    striped: React.PropTypes.bool,
    bordered: React.PropTypes.bool,
    condensed: React.PropTypes.bool,
    hover: React.PropTypes.bool,
    responsive: React.PropTypes.bool
  },

  render: function () {
    var classes = {
      'table': true,
      'table-striped': this.props.striped,
      'table-bordered': this.props.bordered,
      'table-condensed': this.props.condensed,
      'table-hover': this.props.hover
    };
    var table = (
      React.createElement("table", React.__spread({},  this.props, {className: joinClasses(this.props.className, classSet(classes))}), 
        this.props.children
      )
    );

    return this.props.responsive ? (
      React.createElement("div", {className: "table-responsive"}, 
        table
      )
    ) : table;
  }
});

module.exports = Table;
});

define('lib/TabPane',['require','exports','module','react','./utils/joinClasses','./utils/classSet','./utils/TransitionEvents'],function (require, exports, module) {var React = require('react');
var joinClasses = require('./utils/joinClasses');
var classSet = require('./utils/classSet');
var TransitionEvents = require('./utils/TransitionEvents');

var TabPane = React.createClass({displayName: "TabPane",
  getDefaultProps: function () {
    return {
      animation: true
    };
  },

  getInitialState: function () {
    return {
      animateIn: false,
      animateOut: false
    };
  },

  componentWillReceiveProps: function (nextProps) {
    if (this.props.animation) {
      if (!this.state.animateIn && nextProps.active && !this.props.active) {
        this.setState({
          animateIn: true
        });
      } else if (!this.state.animateOut && !nextProps.active && this.props.active) {
        this.setState({
          animateOut: true
        });
      }
    }
  },

  componentDidUpdate: function () {
    if (this.state.animateIn) {
      setTimeout(this.startAnimateIn, 0);
    }
    if (this.state.animateOut) {
      TransitionEvents.addEndEventListener(
        this.getDOMNode(),
        this.stopAnimateOut
      );
    }
  },

  startAnimateIn: function () {
    if (this.isMounted()) {
      this.setState({
        animateIn: false
      });
    }
  },

  stopAnimateOut: function () {
    if (this.isMounted()) {
      this.setState({
        animateOut: false
      });

      if (typeof this.props.onAnimateOutEnd === 'function') {
        this.props.onAnimateOutEnd();
      }
    }
  },

  render: function () {
    var classes = {
      'tab-pane': true,
      'fade': true,
      'active': this.props.active || this.state.animateOut,
      'in': this.props.active && !this.state.animateIn
    };

    return (
      React.createElement("div", React.__spread({},  this.props, {className: joinClasses(this.props.className, classSet(classes))}), 
        this.props.children
      )
    );
  }
});

module.exports = TabPane;
});

define('lib/Tooltip',['require','exports','module','react','./utils/joinClasses','./utils/classSet','./BootstrapMixin'],function (require, exports, module) {var React = require('react');
var joinClasses = require('./utils/joinClasses');
var classSet = require('./utils/classSet');
var BootstrapMixin = require('./BootstrapMixin');


var Tooltip = React.createClass({displayName: "Tooltip",
  mixins: [BootstrapMixin],

  propTypes: {
    placement: React.PropTypes.oneOf(['top','right', 'bottom', 'left']),
    positionLeft: React.PropTypes.number,
    positionTop: React.PropTypes.number,
    arrowOffsetLeft: React.PropTypes.number,
    arrowOffsetTop: React.PropTypes.number
  },

  getDefaultProps: function () {
    return {
      placement: 'right'
    };
  },

  render: function () {
    var classes = {};
    classes['tooltip'] = true;
    classes[this.props.placement] = true;
    classes['in'] = this.props.positionLeft != null || this.props.positionTop != null;

    var style = {};
    style['left'] = this.props.positionLeft;
    style['top'] = this.props.positionTop;

    var arrowStyle = {};
    arrowStyle['left'] = this.props.arrowOffsetLeft;
    arrowStyle['top'] = this.props.arrowOffsetTop;

    return (
        React.createElement("div", React.__spread({},  this.props, {className: joinClasses(this.props.className, classSet(classes)), style: style}), 
          React.createElement("div", {className: "tooltip-arrow", style: arrowStyle}), 
          React.createElement("div", {className: "tooltip-inner"}, 
            this.props.children
          )
        )
      );
  }
});

module.exports = Tooltip;
});

define('lib/Well',['require','exports','module','react','./utils/joinClasses','./utils/classSet','./BootstrapMixin'],function (require, exports, module) {var React = require('react');
var joinClasses = require('./utils/joinClasses');
var classSet = require('./utils/classSet');
var BootstrapMixin = require('./BootstrapMixin');

var Well = React.createClass({displayName: "Well",
  mixins: [BootstrapMixin],

  getDefaultProps: function () {
    return {
      bsClass: 'well'
    };
  },

  render: function () {
    var classes = this.getBsClassSet();

    return (
      React.createElement("div", React.__spread({},  this.props, {className: joinClasses(this.props.className, classSet(classes))}), 
        this.props.children
      )
    );
  }
});

module.exports = Well;
});

/*global define */

define('react-bootstrap',['require','./lib/Accordion','./lib/Affix','./lib/AffixMixin','./lib/Alert','./lib/BootstrapMixin','./lib/Badge','./lib/Button','./lib/ButtonGroup','./lib/ButtonToolbar','./lib/Carousel','./lib/CarouselItem','./lib/Col','./lib/CollapsableMixin','./lib/DropdownButton','./lib/DropdownMenu','./lib/DropdownStateMixin','./lib/FadeMixin','./lib/Glyphicon','./lib/Grid','./lib/Input','./lib/Interpolate','./lib/Jumbotron','./lib/Label','./lib/ListGroup','./lib/ListGroupItem','./lib/MenuItem','./lib/Modal','./lib/Nav','./lib/Navbar','./lib/NavItem','./lib/ModalTrigger','./lib/OverlayTrigger','./lib/OverlayMixin','./lib/PageHeader','./lib/Panel','./lib/PanelGroup','./lib/PageItem','./lib/Pager','./lib/Popover','./lib/ProgressBar','./lib/Row','./lib/SplitButton','./lib/SubNav','./lib/TabbedArea','./lib/Table','./lib/TabPane','./lib/Tooltip','./lib/Well'],function (require) {
  

  return {
    Accordion: require('./lib/Accordion'),
    Affix: require('./lib/Affix'),
    AffixMixin: require('./lib/AffixMixin'),
    Alert: require('./lib/Alert'),
    BootstrapMixin: require('./lib/BootstrapMixin'),
    Badge: require('./lib/Badge'),
    Button: require('./lib/Button'),
    ButtonGroup: require('./lib/ButtonGroup'),
    ButtonToolbar: require('./lib/ButtonToolbar'),
    Carousel: require('./lib/Carousel'),
    CarouselItem: require('./lib/CarouselItem'),
    Col: require('./lib/Col'),
    CollapsableMixin: require('./lib/CollapsableMixin'),
    DropdownButton: require('./lib/DropdownButton'),
    DropdownMenu: require('./lib/DropdownMenu'),
    DropdownStateMixin: require('./lib/DropdownStateMixin'),
    FadeMixin: require('./lib/FadeMixin'),
    Glyphicon: require('./lib/Glyphicon'),
    Grid: require('./lib/Grid'),
    Input: require('./lib/Input'),
    Interpolate: require('./lib/Interpolate'),
    Jumbotron: require('./lib/Jumbotron'),
    Label: require('./lib/Label'),
    ListGroup: require('./lib/ListGroup'),
    ListGroupItem: require('./lib/ListGroupItem'),
    MenuItem: require('./lib/MenuItem'),
    Modal: require('./lib/Modal'),
    Nav: require('./lib/Nav'),
    Navbar: require('./lib/Navbar'),
    NavItem: require('./lib/NavItem'),
    ModalTrigger: require('./lib/ModalTrigger'),
    OverlayTrigger: require('./lib/OverlayTrigger'),
    OverlayMixin: require('./lib/OverlayMixin'),
    PageHeader: require('./lib/PageHeader'),
    Panel: require('./lib/Panel'),
    PanelGroup: require('./lib/PanelGroup'),
    PageItem: require('./lib/PageItem'),
    Pager: require('./lib/Pager'),
    Popover: require('./lib/Popover'),
    ProgressBar: require('./lib/ProgressBar'),
    Row: require('./lib/Row'),
    SplitButton: require('./lib/SplitButton'),
    SubNav: require('./lib/SubNav'),
    TabbedArea: require('./lib/TabbedArea'),
    Table: require('./lib/Table'),
    TabPane: require('./lib/TabPane'),
    Tooltip: require('./lib/Tooltip'),
    Well: require('./lib/Well')
  };
});

    //Register in the values from the outer closure for common dependencies
    //as local almond modules
    define('react', function () {
        return React;
    });

    //Use almond's special top-level, synchronous require to trigger factory
    //functions, get the final module value, and export it as the public
    //value.
    return require('react-bootstrap');
}));
