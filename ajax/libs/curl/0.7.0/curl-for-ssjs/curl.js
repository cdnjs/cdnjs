/** @license MIT License (c) copyright B Cavalier & J Hann */

/**
 * curl (cujo resource loader)
 * An AMD-compliant javascript module and resource loader
 *
 * curl is part of the cujo.js family of libraries (http://cujojs.com/)
 *
 * Licensed under the MIT License at:
 * 		http://www.opensource.org/licenses/mit-license.php
 *
 */
(function (global) {
//"use strict"; don't restore this until the config routine is refactored
	var
		version = '0.7.0',
		curlName = 'curl',
		userCfg,
		prevCurl,
		define,
		doc = global.document,
		head = doc && (doc['head'] || doc.getElementsByTagName('head')[0]),
		// to keep IE from crying, we need to put scripts before any
		// <base> elements, but after any <meta>. this should do it:
		insertBeforeEl = head && head.getElementsByTagName('base')[0] || null,
		// constants / flags
		msgUsingExports = {},
		msgFactoryExecuted = {},
		// this is the list of scripts that IE is loading. one of these will
		// be the "interactive" script. too bad IE doesn't send a readystatechange
		// event to tell us exactly which one.
		activeScripts = {},
		// readyStates for IE6-9
		readyStates = 'addEventListener' in global ? {} : { 'loaded': 1, 'complete': 1 },
		// these are always handy :)
		cleanPrototype = {},
		toString = cleanPrototype.toString,
		undef,
		// local cache of resource definitions (lightweight promises)
		cache = {},
		// preload are files that must be loaded before any others
		preload = false,
		// net to catch anonymous define calls' arguments (non-IE browsers)
		argsNet,
		// RegExp's used later, "cached" here
		dontAddExtRx = /\?/,
		absUrlRx = /^\/|^[^:]+:\/\//,
		findLeadingDotsRx = /(\.)(\.?)(?:$|\/([^\.\/]+.*)?)/g, // /(?:^|\/)(\.)(\.?)\/?/g,
		removeCommentsRx = /\/\*[\s\S]*?\*\/|(?:[^\\])\/\/.*?[\n\r]/g,
		findRValueRequiresRx = /require\s*\(\s*["']([^"']+)["']\s*\)|(?:[^\\]?)(["'])/g,
		cjsGetters,
		core;

	function noop () {}

	function isType (obj, type) {
		return toString.call(obj).indexOf('[object ' + type) == 0;
	}

	function normalizePkgDescriptor (descriptor) {
		var main;

		descriptor.path = removeEndSlash(descriptor['path'] || descriptor['location'] || '');
		main = removeEndSlash(descriptor['main']) || 'main';
		if (main.charAt(0) != '.') main = './' + main;
		// trailing slashes trick reduceLeadingDots to see them as base ids
		descriptor.main = reduceLeadingDots(main, descriptor.name + '/');
		// pre-resolve this now to save cpu later
//		descriptor.mainPath = reduceLeadingDots(main, descriptor.path + '/');
		descriptor.config = descriptor['config'];

		return descriptor;
	}

	function joinPath (path, file) {
		return removeEndSlash(path) + '/' + file;
	}

	function removeEndSlash (path) {
		return path && path.charAt(path.length - 1) == '/' ? path.substr(0, path.length - 1) : path;
	}

	function reduceLeadingDots (childId, baseId) {
		// this algorithm is similar to dojo's compactPath, which interprets
		// module ids of "." and ".." as meaning "grab the module whose name is
		// the same as my folder or parent folder".  These special module ids
		// are not included in the AMD spec but seem to work in node.js, too.
		var removeLevels, normId, levels, isRelative;

		removeLevels = 1;
		normId = childId;

		// if baseId is blank, then this is the path for a top-level
		// module/resource so we don't want to remove leading double-dots!
		if (baseId) {
			normId = normId.replace(findLeadingDotsRx, function (m, dot, doubleDot, remainder) {
				if (doubleDot) removeLevels++;
				isRelative = true;
				return remainder || '';
			});
		}

		if (isRelative) {
			levels = baseId.split('/');
			if (removeLevels > levels) throw new Error('attempt to access module beyond root of package: ' + childId);
			levels.splice(levels.length - removeLevels, removeLevels);
			// childId || [] is a trick to not concat if no childId
			return levels.concat(normId || []).join('/');
		}
		else {
			return normId;
		}
	}

	function pluginParts (id) {
		var delPos = id.indexOf('!');
		return {
			resourceId: id.substr(delPos + 1),
			// resourceId can be zero length
			pluginId: delPos >= 0 && id.substr(0, delPos)
		};
	}

	function Begetter () {}

	function beget (parent, mixin) {
		Begetter.prototype = parent || cleanPrototype;
		var child = new Begetter();
		Begetter.prototype = cleanPrototype;
		for (var p in mixin) child[p] = mixin[p];
		return child;
	}

	function Promise () {

		var self, thens, complete;

		self = this;
		thens = [];

		function then (resolved, rejected, progressed) {
			// capture calls to callbacks
			thens.push([resolved, rejected, progressed]);
		}

		function notify (which, arg) {
			// complete all callbacks
			var aThen, cb, i = 0;
			while ((aThen = thens[i++])) {
				cb = aThen[which];
				if (cb) cb(arg);
			}
		}

		complete = function promiseComplete (success, arg) {
			// switch over to sync then()
			then = success ?
				function (resolved, rejected) { resolved && resolved(arg); } :
				function (resolved, rejected) { rejected && rejected(arg); };
			// we no longer throw during multiple calls to resolve or reject
			// since we don't really provide useful information anyways.
			complete = noop;
			// complete all callbacks
			notify(success ? 0 : 1, arg);
			// no more notifications
			notify = noop;
			// release memory
			thens = undef;
		};

		this.then = function (resolved, rejected, progressed) {
			then(resolved, rejected, progressed);
			return self;
		};
		this.resolve = function (val) {
			self.resolved = val;
			complete(true, val);
		};
		this.reject = function (ex) {
			self.rejected = ex;
			complete(false, ex);
		};
		this.progress = function (msg) {
			notify(2, msg);
		}

	}

	function isPromise (o) {
		return o instanceof Promise;
	}

	function when (promiseOrValue, callback, errback, progback) {
		// we can't just sniff for then(). if we do, resources that have a
		// then() method will make dependencies wait!
		if (isPromise(promiseOrValue)) {
			return promiseOrValue.then(callback, errback, progback);
		}
		else {
			return callback(promiseOrValue);
		}
	}

	/**
	 * Returns a function that when executed, executes a lambda function,
	 * but only executes it the number of times stated by howMany.
	 * When done executing, it executes the completed function. Each callback
	 * function receives the same parameters that are supplied to the
	 * returned function each time it executes.  In other words, they
	 * are passed through.
	 * @private
	 * @param howMany {Number} must be greater than zero
	 * @param lambda {Function} executed each time
	 * @param completed {Function} only executes once when the counter
	 *   reaches zero
	 * @returns {Function}
	 */
	function countdown (howMany, lambda, completed) {
		var result;
		return function () {
			if (--howMany >= 0 && lambda) result = lambda.apply(undef, arguments);
			// we want ==, not <=, since some callers expect call-once functionality
			if (howMany == 0 && completed) completed(result);
			return result;
		}
	}

	core = {

		toAbsId: function (id, parentId, cfg) {
			return core.fixMainId(reduceLeadingDots(id, parentId));
		},

		fixMainId: function (id, cfg) {
			// TODO: ensure that all config objects inherit pathMap and then remove extra check:
			return cfg.pathMap && id in cfg.pathMap && cfg.pathMap[id].main || id;
		},

		fixPluginId: function (id, cfg) {
			// only run this on ids you know are for a plugin.
			// prepend plugin folder path, but only if it's missing and
			// path isn't in pathMap. JMH: removed pathMap test because
			// it conflicts with `paths: { js: 'path/to/js', css: 'path/to/css' }`
			if (id && cfg.pluginPath && id.indexOf('/') < 0 /*&& !(id in cfg.pathMap)*/) {
				id = joinPath(cfg.pluginPath, id);
			}
			return id;
		},

		createContext: function (cfg, baseId, depNames, isPreload) {

			var def;

			def = new Promise();
			def.id = baseId || ''; // '' == global
			def.isPreload = isPreload;
			def.depNames = depNames;
			def.config = cfg;

			// functions that dependencies will use:

			function toAbsId (childId) {
				// TODO: resolve plugin ids here too
				return core.fixMainId(reduceLeadingDots(childId, def.id), cfg);
			}

			function toUrl (n) {
				// even though internally, we don't seem to need to do
				// toAbsId, the AMD spec says we need to do this for plugins.
				// also, the spec states that we should not append an extension
				// in this function.
				return core.resolvePathInfo(toAbsId(n), cfg).url;
			}

			function localRequire (ids, callback, errback) {
				var cb, rvid, childDef, earlyExport;

				// this is public, so send pure function
				// also fixes issue #41
				cb = callback && function () { callback.apply(undef, arguments[0]); };

				// RValue require (CommonJS)
				if (isType(ids, 'String')) {
					// return resource
					rvid = toAbsId(ids);
					childDef = cache[rvid];
					// TODO: this can return too early if childDef uses module.exports
					earlyExport = isPromise(childDef) && childDef.exports;
					if (!(rvid in cache)) {
						// this should only happen when devs attempt their own
						// manual wrapping of cjs modules or get confused with
						// the callback syntax:
						throw new Error('Module not resolved: '  + rvid);
					}
					if (cb) {
						throw new Error('require(id, callback) not allowed');
					}
					return earlyExport || childDef;
				}
				else {
					// use same id so that relative modules are normalized correctly
					when(core.getDeps(core.createContext(cfg, def.id, ids, isPreload)), cb, errback);
				}
			}

			def.require = localRequire;
			localRequire['toUrl'] = toUrl;
			def.toAbsId = toAbsId;

			return def;
		},

		createResourceDef: function (cfg, id, isPreload) {
			var def, origResolve, execute;

			def = core.createContext(cfg, id, undef, isPreload);
			origResolve = def.resolve;

			// using countdown to only execute definition function once
			execute = countdown(1, function (deps) {
				def.deps = deps;
				try {
					return core.executeDefFunc(def);
				}
				catch (ex) {
					def.reject(ex);
				}
			});

			// intercept resolve function to execute definition function
			// before resolving
			def.resolve = function resolve (deps) {
				when(isPreload || preload, function () {
					origResolve((cache[def.id] = execute(deps)));
				});
			};

			// track exports
			def.exportsReady = function executeFactory (deps) {
				when(isPreload || preload, function () {
					// only resolve early if we also use exports (to avoid
					// circular dependencies). def.exports will have already
					// been set by the getDeps loop before we get here.
					if (def.exports) {
						execute(deps);
						def.progress(msgFactoryExecuted);
					}
				});
			};

			return def;
		},

		createPluginDef: function (cfg, id, resId, isPreload) {
			var def;

			// use resource id for local require and toAbsId
			def = core.createContext(cfg, resId, undef, isPreload);

			return def;
		},

		getCjsRequire: function (def) {
			return def.require;
		},

		getCjsExports: function (def) {
			return def.exports || (def.exports = {});
		},

		getCjsModule: function (def) {
			var module = def.module;
			if (!module) {
				module = def.module = {
					'id': def.id,
					'uri': core.getDefUrl(def),
					'exports': core.getCjsExports(def),
					'config': function () { return def.config; }
				};
				module.exports = module['exports']; // oh closure compiler!
			}
			return module;
		},

		getDefUrl: function (def) {
			// note: don't look up an anon module's id from it's own toUrl cuz
			// the parent's config was used to find this module
			// the toUrl fallback is for named modules in built files
			// which must have absolute ids.
			return def.url || (def.url = core.checkToAddJsExt(def.require['toUrl'](def.id)), def.config);
		},

		config: function (cfg) {
			var setDefaults, defineName, failMsg, okToOverwrite,
				apiName, apiContext, apiObj,
				defName, defContext, defObj;

			// no config was specified, yet
			setDefaults = !cfg;

			// switch to re-runnable config
			if (cfg) core.config = core.moreConfig;

			defineName = 'define';
			failMsg = ' already exists';

			if (!cfg) cfg = {};

			// allow dev to rename/relocate curl() to another object
			apiName = cfg['apiName'] || curlName;
			apiContext = cfg['apiContext'];
			apiObj = apiContext || global;
			defName = cfg['defineName'] || defineName;
			defContext = cfg['defineContext'];
			defObj = defContext || global;

			// is it ok to overwrite an existing api functions?
			okToOverwrite = cfg['overwriteApi'];

			// restore previous (global) curl, if it was blown away
			// by us. this can happen when configuring curl's api
			// after loading it. do this before any throws below.
			if (!setDefaults && prevCurl) {
				global[curlName] = prevCurl;
				prevCurl = false;
			}

			// only throw if we're overwriting curl accidentally and this
			// isn't a setDefaults pass. (see else)
			if (!setDefaults && !okToOverwrite && apiObj[apiName] && apiObj[apiName] != _curl) {
				throw new Error(apiName + failMsg);
			}
			else {
				// if setDefaults, we must overwrite curl so that dev can
				// configure it. (in this case, the following is the same as
				// global.curl = _curl;)
				apiObj[apiName] = _curl;
			}

			// if setDefaults, only create define() if it doesn't already exist.
			if (!(setDefaults && global[defineName])) {
				if (!setDefaults && !okToOverwrite && defName in defObj && defObj[defName] != define) {
					throw new Error(defName + failMsg);
				}
				else {
					// create AMD public api: define()
					defObj[defName] = define = function () {
						// wrap inner _define so it can be replaced without losing define.amd
						var args = core.fixArgs(arguments);
						_define(args);
					};
				}
				// indicate our capabilities:
				define['amd'] = { 'plugins': true, 'jQuery': true, 'curl': version };
			}

			return core.moreConfig(cfg);
		},

		moreConfig: function (cfg, prevCfg) {
			var newCfg, pluginCfgs, p;

			if (!prevCfg) prevCfg = {};
			newCfg = beget(prevCfg, cfg);

			// set defaults and convert from closure-safe names
			newCfg.baseUrl = newCfg['baseUrl'] || '';
			newCfg.pluginPath = newCfg['pluginPath'] || 'curl/plugin';
			newCfg.dontAddFileExt = new RegExp(newCfg['dontAddFileExt'] || dontAddExtRx);

			// create object to hold path map.
			// each plugin and package will have its own pathMap, too.
			newCfg.pathMap = beget(prevCfg.pathMap);
			pluginCfgs = cfg['plugins'] || {};
			newCfg.plugins = beget(prevCfg.plugins);
			for (p in pluginCfgs) {
				newCfg.plugins[core.fixPluginId(p, newCfg)] = pluginCfgs[p];
			}
			pluginCfgs = newCfg.plugins;

			// temporary arrays of paths. this will be converted to
			// a regexp for fast path parsing.
			newCfg.pathList = [];

			// normalizes path/package info and places info on either
			// the global cfg.pathMap or on a plugin-specific altCfg.pathMap.
			// also populates a pathList on cfg or plugin configs.
			function fixAndPushPaths (coll, isPkg) {
				var id, pluginId, data, parts, currCfg, info;
				for (var name in coll) {
					data = coll[name];
					// grab the package id, if specified. default to
					// property name.
					data.name = data['id'] || data['name'] || name;
					currCfg = newCfg;
					// don't remove `|| name` since data may be a string, not an object
					parts = pluginParts(removeEndSlash(data.name || name));
					id = parts.resourceId;
					pluginId = core.fixPluginId(parts.pluginId, newCfg);
					if (pluginId) {
						// plugin-specific path
						currCfg = pluginCfgs[pluginId];
						if (!currCfg) {
							currCfg = pluginCfgs[pluginId] = beget(newCfg);
							currCfg.pathMap = beget(newCfg.pathMap);
							currCfg.pathList = [];
						}
						// remove plugin-specific path from coll
						delete coll[name];
					}
					if (isPkg) {
						info = normalizePkgDescriptor(data);
						if (info.config) info.config = beget(newCfg, info.config);
					}
					else {
						info = { path: removeEndSlash(data) };
					}
					info.specificity = id.split('/').length;
					if (id) {
						currCfg.pathMap[id] = info;
						currCfg.pathList.push(id);
					}
					else {
						// naked plugin name signifies baseUrl for plugin
						// resources. baseUrl could be relative to global
						// baseUrl.
						currCfg.baseUrl = core.resolveUrl(data, newCfg);
					}
				}
			}

			// adds the path matching regexp onto the cfg or plugin cfgs.
			function convertPathMatcher (cfg) {
				var pathMap = cfg.pathMap;
				cfg.pathRx = new RegExp('^(' +
					cfg.pathList.sort(function (a, b) { return pathMap[b].specificity - pathMap[a].specificity; } )
						.join('|')
						.replace(/\/|\./g, '\\$&') +
					')(?=\\/|$)'
				);
				delete cfg.pathList;
			}

			// fix all new paths and packages
			fixAndPushPaths(cfg['paths'], false);
			fixAndPushPaths(cfg['packages'], true);

			// create search regex for each path map
			for (p in pluginCfgs) {
				// inherit full config
				pluginCfgs[p] = beget(newCfg, pluginCfgs[p]);
				var pathList = pluginCfgs[p].pathList;
				if (pathList) {
					pluginCfgs[p].pathList = pathList.concat(newCfg.pathList);
					convertPathMatcher(pluginCfgs[p]);
				}
			}
			convertPathMatcher(newCfg);

			return newCfg;

		},

		checkPreloads: function (cfg) {
			var preloads;
			preloads = cfg && cfg['preloads'];
			if (preloads && preloads.length > 0) {
				// chain from previous preload, if any.
				when(preload, function () {
					preload = core.getDeps(core.createContext(userCfg, undef, preloads, true));
				});
			}

		},

		resolvePathInfo: function (absId, cfg) {
			// searches through the configured path mappings and packages
			var pathMap, pathInfo, path, pkgCfg;

			pathMap = cfg.pathMap;

			if (!absUrlRx.test(absId)) {
				path = absId.replace(cfg.pathRx, function (match) {
					pathInfo = pathMap[match] || {};
					pkgCfg = pathInfo.config;
					return pathInfo.path || '';
				});
			}
			else {
				path = absId;
			}

			return {
				config: pkgCfg || userCfg,
				url: core.resolveUrl(path, cfg)
			};
		},

		resolveUrl: function (path, cfg) {
			var baseUrl = cfg.baseUrl;
			return baseUrl && !absUrlRx.test(path) ? joinPath(baseUrl, path) : path;
		},

		checkToAddJsExt: function (url, cfg) {
			// don't add extension if a ? is found in the url (query params)
			// i'd like to move this feature to a moduleLoader
			return url + ((cfg || userCfg).dontAddFileExt.test(url) ? '' : '.js');
		},

		loadScript: function (def, success, failure) {
			// script processing rules learned from RequireJS

			// insert script
			var el = doc.createElement('script');

			// initial script processing
			function process (ev) {
				ev = ev || global.event;
				// detect when it's done loading
				// ev.type == 'load' is for all browsers except IE6-9
				// IE6-9 need to use onreadystatechange and look for
				// el.readyState in {loaded, complete} (yes, we need both)
				if (ev.type == 'load' || readyStates[el.readyState]) {
					delete activeScripts[def.id];
					// release event listeners
					el.onload = el.onreadystatechange = el.onerror = ''; // ie cries if we use undefined
					success();
				}
			}

			function fail (e) {
				// some browsers send an event, others send a string,
				// but none of them send anything useful, so just say we failed:
				failure(new Error('Syntax or http error: ' + def.url));
			}

			// set type first since setting other properties could
			// prevent us from setting this later
			// actually, we don't even need to set this at all
			//el.type = 'text/javascript';
			// using dom0 event handlers instead of wordy w3c/ms
			el.onload = el.onreadystatechange = process;
			el.onerror = fail;
			// js! plugin uses alternate mimetypes
			el.type = def.mimetype || 'text/javascript';
			// TODO: support other charsets?
			el.charset = 'utf-8';
			el.async = !def.order;
			el.src = def.url;

			// loading will start when the script is inserted into the dom.
			// IE will load the script sync if it's in the cache, so
			// indicate the current resource definition if this happens.
			activeScripts[def.id] = el;

			head.insertBefore(el, insertBeforeEl);

			// the js! plugin uses this
			return el;
		},

		extractCjsDeps: function (defFunc) {
			// Note: ignores require() inside strings and comments
			var source, ids = [], currQuote;
			// prefer toSource (FF) since it strips comments
			source = typeof defFunc == 'string' ?
					 defFunc :
					 defFunc.toSource ? defFunc.toSource() : defFunc.toString();
			// remove comments, then look for require() or quotes
			source.replace(removeCommentsRx, '').replace(findRValueRequiresRx, function (m, id, qq) {
				// if we encounter a quote
				if (qq) {
					currQuote = currQuote == qq ? undef : currQuote;
				}
				// if we're not inside a quoted string
				else if (!currQuote) {
					ids.push(id);
				}
				return ''; // uses least RAM/CPU
			});
			return ids;
		},

		fixArgs: function (args) {
			// resolve args
			// valid combinations for define:
			// (string, array, object|function) sax|saf
			// (array, object|function) ax|af
			// (string, object|function) sx|sf
			// (object|function) x|f

			var id, deps, defFunc, defFuncArity, len, cjs;

			len = args.length;

			defFunc = args[len - 1];
			defFuncArity = isType(defFunc, 'Function') ? defFunc.length : -1;

			if (len == 2) {
				if (isType(args[0], 'Array')) {
					deps = args[0];
				}
				else {
					id = args[0];
				}
			}
			else if (len == 3) {
				id = args[0];
				deps = args[1];
			}

			// Hybrid format: assume that a definition function with zero
			// dependencies and non-zero arity is a wrapped CommonJS module
			if (!deps && defFuncArity > 0) {
				cjs = true;
				deps = ['require', 'exports', 'module'].slice(0, defFuncArity).concat(core.extractCjsDeps(defFunc));
			}

			return {
				id: id,
				deps: deps || [],
				res: defFuncArity >= 0 ? defFunc : function () { return defFunc; },
				cjs: cjs
			};
		},

		executeDefFunc: function (def) {
			var resource, moduleThis;
			// the force of AMD is strong so anything returned
			// overrides exports.
			// node.js assumes `this` === `exports` so we do that
			// for all cjs-wrapped modules, just in case.
			// also, use module.exports if that was set
			// (node.js convention).
			// note: if .module exists, .exports exists.
			moduleThis = def.cjs ? def.exports : undef;
			resource = def.res.apply(moduleThis, def.deps);
			if (resource === undef && def.exports) {
				// note: exports will equal module.exports unless
				// module.exports was reassigned inside module.
				resource = def.module ? (def.exports = def.module.exports) : def.exports;
			}
			return resource;
		},

		defineResource: function (def, args) {

			def.res = args.res;
			def.cjs = args.cjs;
			def.depNames = args.deps;
			core.getDeps(def);

		},

		getDeps: function (parentDef) {

			var i, names, deps, len, dep, completed, name,
				exportCollector, resolveCollector;

			deps = [];
			names = parentDef.depNames;
			len = names.length;

			if (names.length == 0) allResolved();

			function collect (dep, index, alsoExport) {
				deps[index] = dep;
				if (alsoExport) exportCollector(dep, index);
			}

			// reducer-collectors
			exportCollector = countdown(len, collect, allExportsReady);
			resolveCollector = countdown(len, collect, allResolved);

			// initiate the resolution of all dependencies
			// Note: the correct handling of early exports relies on the
			// fact that the exports pseudo-dependency is always listed
			// before other module dependencies.
			for (i = 0; i < len; i++) {
				name = names[i];
				// is this "require", "exports", or "module"?
				if (name in cjsGetters) {
					// a side-effect of cjsGetters is that the cjs
					// property is also set on the def.
					resolveCollector(cjsGetters[name](parentDef), i, true);
					// if we are using the `module` or `exports` cjs variables,
					// signal any waiters/parents that we can export
					// early (see progress callback in getDep below).
					// note: this may fire for `require` as well, if it
					// is listed after `module` or `exports` in the deps list,
					// but that is okay since all waiters will only record
					// it once.
					if (parentDef.exports) {
						parentDef.progress(msgUsingExports);
					}
				}
				// check for blanks. fixes #32.
				// this helps support yepnope.js, has.js, and the has! plugin
				else if (!name) {
					resolveCollector(undef, i, true);
				}
				// normal module or plugin resource
				else {
					getDep(name, i);
				}
			}

			return parentDef;

			function getDep (name, index) {
				var resolveOnce, exportOnce, childDef, earlyExport;

				resolveOnce = countdown(1, function (dep) {
					exportOnce(dep);
					resolveCollector(dep, index);
				});
				exportOnce = countdown(1, function (dep) {
					exportCollector(dep, index);
				});

				// get child def / dep
				childDef = core.fetchDep(name, parentDef);

				// check if childDef can export. if it can, then
				// we missed the notification and it will never fire in the
				// when() below.
				earlyExport = isPromise(childDef) && childDef.exports;
				if (earlyExport) {
					exportOnce(earlyExport);
				}

				when(childDef,
					resolveOnce,
					parentDef.reject,
					parentDef.exports && function (msg) {
						// messages are only sent from childDefs that support
						// exports, and we only notify parents that understand
						// exports too.
						if (childDef.exports) {
							if (msg == msgUsingExports) {
								// if we're using exports cjs variable on both sides
								exportOnce(childDef.exports);
							}
							else if (msg == msgFactoryExecuted) {
								resolveOnce(childDef.exports);
							}
						}
					}
				);
			}

			function allResolved () {
				parentDef.resolve(deps);
			}

			function allExportsReady () {
				parentDef.exportsReady && parentDef.exportsReady(deps);
			}

		},

		fetchResDef: function (def) {

			// ensure url is computed
			core.getDefUrl(def);

			core.loadScript(def,

				function () {
					var args = argsNet;
					argsNet = undef; // reset it before we get deps

					// if our resource was not explicitly defined with an id (anonymous)
					// Note: if it did have an id, it will be resolved in the define()
					if (def.useNet !== false) {

						// if !args, nothing was added to the argsNet
						if (!args || args.ex) {
							def.reject(new Error(((args && args.ex) || 'define() missing or duplicated: ' + def.url)));
						}
						else {
							core.defineResource(def, args);
						}
					}

				},

				def.reject

			);

			return def;

		},

		fetchDep: function (depName, parentDef) {
			// TODO: start using parentDef.config instead of userCfg
			var toAbsId, isPreload, parts, mainId, loaderId, pluginId,
				resId, pathInfo, def, tempDef, cfg, resCfg;

			toAbsId = parentDef.toAbsId;
			isPreload = parentDef.isPreload;
			// TODO: remove check for userCfg when all defs have a full config
			cfg = parentDef.config || userCfg;

			// check for plugin loaderId
			parts = pluginParts(depName);
			// resId is not normalized since the plugin may need to do it
			resId = parts.resourceId;

			// get id of first resource to load (which could be a plugin)
			mainId = parts.pluginId
				// TODO: this should be abstracted
				? core.fixMainId(core.fixPluginId(reduceLeadingDots(parts.pluginId, parentDef.id), cfg), cfg)
				: toAbsId(resId);
			pathInfo = core.resolvePathInfo(mainId, cfg);

			// get custom module loader from package config if not a plugin
			// TODO: figure out how to make module loaders work with plugins
			if (parts.pluginId) {
				loaderId = mainId;
			}
			else {
				loaderId = pathInfo.config['moduleLoader'];
				if (loaderId) {
					// since we're not using toAbsId, transformers must be absolute
					resId = mainId;
					mainId = loaderId;
					pathInfo = core.resolvePathInfo(loaderId, cfg);
				}
			}

			// find resource definition. ALWAYS check via (id in cache) b/c
			// falsey values could be in there.
			def = cache[mainId];
			if (!(mainId in cache)) {
				def = cache[mainId] = core.createResourceDef(pathInfo.config, mainId, isPreload);
				def.url = core.checkToAddJsExt(pathInfo.url, def.config);
				core.fetchResDef(def);
			}

			// plugin or transformer
			if (mainId == loaderId) {

				// we need to use depName until plugin tells us normalized id.
				// if the plugin changes the id, we need to consolidate
				// def promises below.  Note: exports objects will be different
				// between pre-normalized and post-normalized defs! does this matter?
				// don't put this resource def in the cache because if the
				// resId doesn't change, the check if this is a new
				// normalizedDef (below) will think it's already being loaded.
				tempDef = /*cache[depName] =*/ new Promise();

				// note: this means moduleLoaders can store config info in the
				// plugins config, too.
				resCfg = cfg.plugins[loaderId] || cfg;

				// wait for plugin resource def
				when(def, function(plugin) {
					var normalizedDef, fullId, dynamic;

					dynamic = plugin['dynamic'];
					// check if plugin supports the normalize method
					if ('normalize' in plugin) {
						// dojo/has may return falsey values (0, actually)
						resId = plugin['normalize'](resId, toAbsId, resCfg) || '';
					}
					else {
						resId = toAbsId(resId);
					}

					// use the full id (loaderId + id) to id plugin resources
					// so multiple plugins may each process the same resource
					// resId could be blank if the plugin doesn't require any (e.g. "domReady!")
					fullId = loaderId + '!' + resId;
					normalizedDef = cache[fullId];

					// if this is our first time fetching this (normalized) def
					if (!(fullId in cache)) {

						// because we're using resId, plugins, such as wire!,
						// can use paths relative to the resource
						normalizedDef = core.createPluginDef(resCfg, fullId, resId, isPreload);

						// don't cache non-determinate "dynamic" resources
						if (!dynamic) {
							cache[fullId] = normalizedDef;
						}

						// curl's plugins prefer to receive a deferred,
						// but to be compatible with AMD spec, we have to
						// piggy-back on the callback function parameter:
						var loaded = function (res) {
							normalizedDef.resolve(res);
							if (!dynamic) cache[fullId] = res;
						};
						loaded['resolve'] = loaded;
						loaded['reject'] = loaded['error'] = normalizedDef.reject;

						// load the resource!
						plugin.load(resId, normalizedDef.require, loaded, resCfg);

					}

					// chain defs (resolve when plugin.load executes)
					if (tempDef != normalizedDef) {
						when(normalizedDef, tempDef.resolve, tempDef.reject, tempDef.progress);
					}

				}, tempDef.reject);

			}

			// return tempDef if this is a plugin-based resource
			return tempDef || def;
		},

		getCurrentDefName: function () {
			// IE6-9 mark the currently executing thread as "interactive"
			// Note: Opera lies about which scripts are "interactive", so we
			// just have to test for it. Opera provides a true browser test, not
			// a UA sniff, thankfully.
			// learned this trick from James Burke's RequireJS
			var def;
			if (!isType(global.opera, 'Opera')) {
				for (var d in activeScripts) {
					if (activeScripts[d].readyState == 'interactive') {
						def = d;
						break;
					}
				}
			}
			return def;
		}

	};

	// hook-up cjs free variable getters
	cjsGetters = {'require': core.getCjsRequire, 'exports': core.getCjsExports, 'module': core.getCjsModule};

	function _curl (/* various */) {

		var args = [].slice.call(arguments), cfg;

		// extract config, if it's specified
		if (isType(args[0], 'Object')) {
			cfg = args.shift();
			userCfg = core.config(cfg, userCfg);
			core.checkPreloads(cfg);
		}

		// thanks to Joop Ringelberg for helping troubleshoot the API
		function CurlApi (ids, callback, errback, waitFor) {
			var then, ctx;
			ctx = core.createContext(userCfg, undef, [].concat(ids));
			this['then'] = then = function (resolved, rejected) {
				when(ctx,
					// return the dependencies as arguments, not an array
					function (deps) {
						if (resolved) resolved.apply(undef, deps);
					},
					// just throw if the dev didn't specify an error handler
					function (ex) {
						if (rejected) rejected(ex); else throw ex;
					}
				);
				return this;
			};
			this['next'] = function (ids, cb, eb) {
				// chain api
				return new CurlApi(ids, cb, eb, ctx);
			};
			if (callback) then(callback, errback);
			when(waitFor, function () { core.getDeps(ctx); });
		}

		return new CurlApi(args[0], args[1], args[2]);

	}

	_curl['version'] = version;

	function _define (args) {

		var id = args.id;

		if (id == undef) {
			if (argsNet !== undef) {
				argsNet = {ex: 'Multiple anonymous defines in url'};
			}
			else if (!(id = core.getCurrentDefName())/* intentional assignment */) {
				// anonymous define(), defer processing until after script loads
				argsNet = args;
			}
		}
		if (id != undef) {
			// named define(), it is in the cache if we are loading a dependency
			// (could also be a secondary define() appearing in a built file, etc.)
			var def = cache[id];
			if (!(id in cache)) {
				// id is an absolute id in this case, so we can get the config.
				// there's no way to allow a named define to fetch dependencies
				// in the preload phase since we can't cascade the parent def.
				var cfg = core.resolvePathInfo(id, userCfg).config;
				def = cache[id] = core.createResourceDef(cfg, id);
			}
			if (!isPromise(def)) throw new Error('duplicate define: ' + id);
			// check if this resource has already been resolved
			def.useNet = false;
			core.defineResource(def, args);
		}

	}

	// look for pre-existing globals
	userCfg = global[curlName];
	if (typeof userCfg == 'function') {
		prevCurl = userCfg;
		userCfg = false;
	}
	else {
		// don't use delete here since IE6-8 fail
		global[curlName] = undef;
	}

	// configure first time
	userCfg = core.config(userCfg);
	core.checkPreloads(userCfg);

	// allow curl to be a dependency
	cache[curlName] = _curl;

	// expose curl core for special plugins and modules
	// Note: core overrides will only work in either of two scenarios:
	// 1. the files are running un-compressed (Google Closure or Uglify)
	// 2. the overriding module was compressed into the same file as curl.js
	// Compiling curl and the overriding module separately won't work.
	cache['curl/_privileged'] = {
		'core': core,
		'cache': cache,
		'config': function () { return userCfg; },
		'_define': _define,
		'_curl': _curl,
		'Promise': Promise
	};

}(this.window || global));
/** MIT License (c) copyright B Cavalier & J Hann */

/**
 * curl CommonJS Modules/1.1 loader
 *
 * Licensed under the MIT License at:
 * 		http://www.opensource.org/licenses/mit-license.php
 */

/**
 * @experimental
 */
(function (global, document, globalEval) {

define('curl/loader/cjsm11', function () {

	var head, insertBeforeEl /*, findRequiresRx, myId*/;

//	findRequiresRx = /require\s*\(\s*['"](\w+)['"]\s*\)/,

//	function nextId (index) {
//		var varname = '', part;
//		do {
//			part = index % 26;
//			varname += String.fromCharCode(part + 65);
//			index -= part;
//		}
//		while (index > 0);
//		return 'curl$' + varname;
//	}

//	/**
//	 * @description Finds the require() instances in the source text of a cjs
//	 * 	 module and collects them. If removeRequires is true, it also replaces
//	 * 	 them with a unique variable name. All unique require()'d module ids
//	 * 	 are assigned a unique variable name to be used in the define(deps)
//	 * 	 that will be constructed to wrap the cjs module.
//	 * @param source - source code of cjs module
//	 * @param moduleIds - hashMap (object) to receive pairs of moduleId /
//	 *   unique variable name
//	 * @param removeRequires - if truthy, replaces all require() instances with
//	 *   a unique variable
//	 * @return - source code of cjs module, possibly with require()s replaced
//	 */
//	function parseDepModuleIds (source, moduleIds, removeRequires) {
//		var index = 0;
//		// fast parse
//		source = source.replace(findRequiresRx, function (match, id) {
//			if (!moduleIds[id]) {
//				moduleIds[id] = nextId(index++);
//				moduleIds.push(id);
//			}
//			return removeRequires ? moduleIds[id] : match;
//		});
//		return source;
//	}

	head = document && (document['head'] || document.getElementsByTagName('head')[0]);
	// to keep IE from crying, we need to put scripts before any
	// <base> elements, but after any <meta>. this should do it:
	insertBeforeEl = head && head.getElementsByTagName('base')[0] || null;

	function wrapSource (source, resourceId, fullUrl) {
		var sourceUrl = fullUrl ? '////@ sourceURL=' + fullUrl.replace(/\s/g, '%20') + '.js' : '';
		return "define('" + resourceId + "'," +
			"['require','exports','module'],function(require,exports,module){" +
			source + "\n});\n" + sourceUrl + "\n";
	}

	var injectSource = function (el, source) {
		// got this from Stoyan Stefanov (http://www.phpied.com/dynamic-script-and-style-elements-in-ie/)
		injectSource = ('text' in el) ?
			function (el, source) { el.text = source; } :
			function (el, source) { el.appendChild(document.createTextNode(source)); };
		injectSource(el, source);
	};

	function injectScript (source) {
		var el = document.createElement('script');
		injectSource(el, source);
		el.charset = 'utf-8';
		head.insertBefore(el, insertBeforeEl);
	}

	return {
		'load': function (resourceId, require, callback, config) {
			// TODO: extract xhr from text! plugin and use that instead (after we upgrade to cram.js)
			require(['text!' + resourceId + '.js', 'curl/_privileged'], function (source, priv) {
				var moduleMap;

				// find (and replace?) dependencies
				moduleMap = priv['core'].extractCjsDeps(source);
				//source = parseDepModuleIds(source, moduleMap, config.replaceRequires);

				// get deps
				require(moduleMap, function () {

					// wrap source in a define
					source = wrapSource(source, resourceId, config['injectSourceUrl'] !== false && require.toUrl(resourceId));

					if (config['injectScript']) {
						injectScript(source);
					}
					else {
						//eval(source);
						globalEval(source);
					}

					// call callback now that the module is defined
					callback(require(resourceId));

				}, callback['error'] || function (ex) { throw ex; });

			});
		}
	};

});

}(this, this.document, function () { /* FB needs direct eval here */ eval(arguments[0]); }));
/** MIT License (c) copyright B Cavalier & J Hann */

/**
 * curl ssjs shim
 * Modifies curl to work as an AMD loader function in server-side
 * environments such as RingoJS, Rhino, and NodeJS.
 *
 * Licensed under the MIT License at:
 * 		http://www.opensource.org/licenses/mit-license.php
 *
 * TODO: support environments that implement XMLHttpRequest such as Wakanda
 *
 * @experimental
 */
define['amd'].ssjs = true;
var require, load;
(function (freeRequire, globalLoad) {
define('curl/shim/ssjs', function (require, exports) {
"use strict";

	var priv, config, hasProtocolRx, extractProtocolRx, protocol,
		http, localLoadFunc, remoteLoadFunc,
		undef;

	// first, bail if we're in a browser!
	if (typeof window == 'object' && (window.clientInformation || window.navigator)) {
		return;
	}

	priv = require('curl/_privileged');
	config = priv.config();
    hasProtocolRx = /^\w+:/;
	extractProtocolRx = /(^\w+:)?.*$/;

    protocol = fixProtocol(config.defaultProtocol)
		|| extractProtocol(config.baseUrl)
		|| 'http:';

	// sniff for capabilities

	if (globalLoad) {
		// rhino & ringo make this so easy
		localLoadFunc = remoteLoadFunc = loadScriptViaLoad;
	}
	else if (freeRequire) {
		localLoadFunc = loadScriptViaRequire;
		// try to find an http client
		try {
			// node
			http = freeRequire('http');
			remoteLoadFunc = loadScriptViaNodeHttp;
		}
		catch (ex) {
			remoteLoadFunc = failIfInvoked;
		}

	}
	else {
		localLoadFunc = remoteLoadFunc = failIfInvoked;
	}

	function stripExtension (url) {
		return url.replace(/\.js$/, '');
	}

	priv.core.loadScript = function (def, success, fail) {
		var urlOrPath;
		// figure out if this is local or remote and call appropriate function
		// remote urls always have a protocol or a // at the beginning
		urlOrPath = def.url;
		if (/^\/\//.test(urlOrPath)) {
			// if there's no protocol, use configured protocol
			def.url = protocol + def.url;
		}
		if (hasProtocolRx.test(def.url)) {
			return remoteLoadFunc(def, success, fail);
		}
		else {
			return localLoadFunc(def, success, fail);
		}
	};

	function loadScriptViaLoad (def, success, fail) {
		try {
			globalLoad(def.url);
			success();
		}
		catch (ex) {
			fail(ex);
		}
	}

	function loadScriptViaRequire (def, success, fail) {
		var modulePath;
		try {
			modulePath = stripExtension(def.url);
			freeRequire(modulePath);
			success();
		}
		catch (ex) {
			fail(ex);
		}
	}

	function loadScriptViaNodeHttp (def, success, fail) {
		var options, source;
		options = freeRequire('url').parse(def.url, false, true);
		source = '';
		http.get(options, function (response) {
			response
				.on('data', function (chunk) { source += chunk; })
				.on('end', function () { executeScript(source); success(); })
				.on('error', fail);
		}).on('error', fail);
	}

	function failIfInvoked (def) {
		throw new Error('ssjs: unable to load module in current environment: ' + def.url);
	}

	function executeScript (source) {
		eval(source);
	}

    function extractProtocol (url) {
        var protocol;
        protocol = url && url.replace(extractProtocolRx,
			function (m, p) { return p; }
		);
        return protocol;
    }

	function fixProtocol (protocol) {
		return protocol && protocol[protocol.length - 1] != ':'
			? protocol += ':'
			: protocol;
	}

});
}(require, load));
