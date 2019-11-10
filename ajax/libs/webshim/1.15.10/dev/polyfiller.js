(function (factory) {
	if (typeof WSDEBUG === 'undefined') {
		window.WSDEBUG = true;
	}
	var addAsync = function(){
		if(!window.asyncWebshims){
			window.asyncWebshims = {
				cfg: [],
				ready: []
			};
		}
	};
	var start = function(){
		if(window.jQuery){
			factory(jQuery);
			factory = function(){return window.webshims;};
		}
	};


	window.webshims = {
		setOptions: function(){
			addAsync();
			window.asyncWebshims.cfg.push(arguments);
		},

		ready: function(){
			addAsync();
			window.asyncWebshims.ready.push(arguments);
		},
		activeLang: function(lang){
			addAsync();
			window.asyncWebshims.lang = lang;
		},
		polyfill: function(features){
			addAsync();
			window.asyncWebshims.polyfill = features;
		},
		_curScript: (function(){
			var scripts, i, scriptUrl, match, regUrl;
			//modern browsers: Chrome 29+, Firefox 4+
			var currentScript = document.currentScript;

			//in debug mode remove result to fully test fallback in all browsers
			if(WSDEBUG){
				currentScript = false;
			}
			if (!currentScript) {
				//error trick: works in Safari, Chrome, Firefox, IE 10+
				//idea found here: https://github.com/samyk/jiagra/
				try {
					throw(new Error(''));
				} catch (e) {
					//Safari has sourceURL
					scriptUrl = (e.sourceURL || e.stack || '').split('\n');
					regUrl = /(?:fil|htt|wid|abo|app|res)(.)+/i;

					for(i = 0; i < scriptUrl.length; i++){
						//extract scriptUrl from stack: this is dangerous! All browsers have different string patterns (pattern can even vary between different browser versions). Help to make it bulletproof!!!
						if((match = scriptUrl[i].match(regUrl))){
							scriptUrl = match[0].replace(/[\:\s\(]+[\d\:\)\(\s]+$/, '');
							break;
						}
					}


				}

				scripts = document.scripts || document.getElementsByTagName('script');

				//get script by URL or by readyState == 'interactive' (readySate is supported in IE10-)
				//if this fails the last found script is set to the currentScript
				for (i = 0; i < scripts.length; i++) {
					if(scripts[i].getAttribute('src')){
						currentScript = scripts[i];
						if (scripts[i].readyState == 'interactive' || scriptUrl == scripts[i].src) {
							if(WSDEBUG){
								currentScript.wsFoundCurrent = true;
							}
							break;
						}
					}
				}
			}

			return currentScript;
		})()
	};
	window.webshim = window.webshims;


	window.webshims.timer = setInterval(start, 0);
	start();

	if (typeof define === 'function' && define.amd) {
		define('polyfiller', ['jquery'], factory);
	}
}(function($){
	"use strict";
	var firstRun, path;
	var navigator = window.navigator;
	var webshims = window.webshims;
	var DOMSUPPORT = 'dom-support';
	var special = $.event.special;
	var emptyJ = $([]);

	var asyncWebshims = window.asyncWebshims;
	var support = {};
	var Object = window.Object;
	var addSource = function(text){
		return text +"\n//# sourceURL="+this.url;
	};
	var getAutoEnhance = function(prop){
		return !webCFG.enhanceAuto && prop == 'auto' ? false : prop;
	};
	var featureAlias = {
		matchmedia: 'matchMedia',
		xhr2: 'filereader',
		promise: 'es6',
		URL: 'url'
	};
	var supportCapture = 'capture' in create('input');

	clearInterval(webshims.timer);
	support.advancedObjectProperties = support.objectAccessor = support.ES5 = !!('create' in Object && 'seal' in Object);

	if(support.ES5 && !('toJSON' in Date.prototype)){
		support.ES5 = false;
	}


	path = ($.support.hrefNormalized === false) ? webshims._curScript.getAttribute("src", 4) : webshims._curScript.src;
	path = path.split('?')[0].slice(0, path.lastIndexOf("/") + 1) + 'shims/';

	function create(name){
		return document.createElement(name);
	}

	$.extend(webshims, {
		version: '1.15.10',

		cfg: {
			enhanceAuto: window.Audio && (!window.matchMedia || matchMedia('(min-device-width: 721px)').matches),
			//addCacheBuster: false,
			waitReady: true,
//			extendNative: false,
			loadStyles: true,
			wsdoc: document,
			wspopover: {appendTo: 'auto', hideOnBlur: true},
			ajax: {crossDomain: true},
			loadScript: function(src, success){
				$.ajax($.extend({}, webCFG.ajax, {url: src, success: success, dataType: 'script', cache: true, global: false, dataFilter: addSource}));
			},
			basePath: path
		},
		support: support,
		bugs: {},
		/*
		 * some data
		 */
		modules: {},
		features: {},
		featureList: [],
		setOptions: function(name, opts){
			if (typeof name == 'string' && arguments.length > 1) {
				webCFG[name] = (!$.isPlainObject(opts)) ? opts : $.extend(true, webCFG[name] || {}, opts);
			} else if (typeof name == 'object') {
				$.extend(true, webCFG, name);
			}
		},
		_getAutoEnhance: getAutoEnhance,
		addPolyfill: function(name, cfg){
			cfg = cfg || {};
			var feature = cfg.f || name;
			if (!webshimsFeatures[feature]) {
				webshimsFeatures[feature] = [];
				webshims.featureList.push(feature);
				webCFG[feature] = {};
			}

			webshimsFeatures[feature].push(name);
			cfg.options = $.extend(webCFG[feature], cfg.options);

			addModule(name, cfg);
			if (cfg.methodNames) {
				$.each(cfg.methodNames, function(i, methodName){
					webshims.addMethodName(methodName);
				});
			}
		},
		polyfill: (function(){
			var loaded = {};
			return function(features){
				if(!features){
					features = webshims.featureList;
					WSDEBUG && webshims.warn('loading all features without specifing might be bad for performance');
				}

				if (typeof features == 'string') {
					features = features.split(' ');
				}

				if(WSDEBUG){
					for(var i = 0; i < features.length; i++){
						if(loaded[features[i]]){
							webshims.error(features[i] +' already loaded, you might want to use updatePolyfill instead? see: afarkas.github.io/webshim/demos/#Shiv-dynamic-html5');
						}
						loaded[features[i]] = true;
					}
				}
				return webshims._polyfill(features);
			};
		})(),
		_polyfill: function(features){
			var toLoadFeatures = [];
			var hasFormsExt, needExtStyles;

			if(!firstRun.run){
				hasFormsExt = $.inArray('forms-ext', features) !== -1;
				firstRun();
				needExtStyles = (hasFormsExt && !modules["form-number-date-ui"].test()) || (!supportCapture && $.inArray('mediacapture', features) !== -1);

				if(hasFormsExt && $.inArray('forms', features) == -1){
					features.push('forms');
					if(WSDEBUG){
						webshims.warn('need to load forms feature to use forms-ext feature.');
					}
				}
				if(webCFG.loadStyles){
					loader.loadCSS('styles/shim'+(needExtStyles ? '-ext' : '')+'.css');
				}
			}


			if (webCFG.waitReady) {
				$.readyWait++;
				onReady(features, function(){
					$.ready(true);
				});
			}

			$.each(features, function(i, feature){

				feature = featureAlias[feature] || feature;

				if(!webshimsFeatures[feature]){
					WSDEBUG && webshims.error("could not find webshims-feature (aborted): "+ feature);
					isReady(feature, true);
					return;
				}
				if (feature !== webshimsFeatures[feature][0]) {
					onReady(webshimsFeatures[feature], function(){
						isReady(feature, true);
					});
				}
				toLoadFeatures = toLoadFeatures.concat(webshimsFeatures[feature]);
			});

			loadList(toLoadFeatures);


			$.each(features, function(i, feature){
				var o = webCFG[feature];
				if(!o){return;}
				if(feature == 'mediaelement' && (o.replaceUI = getAutoEnhance(o.replaceUI))){
					o.plugins.unshift('mediacontrols');
				}
				if(o.plugins && o.plugins.length){
					loadList(webCFG[feature].plugins);
				}
			});
		},

		/*
		 * handle ready modules
		 */
		reTest: (function(){
			var resList;
			var reTest = function(i, name){
				var module = modules[name];
				var readyName = name+'Ready';
				if(module && !module.loaded && !( (module.test && $.isFunction(module.test) ) ? module.test([]) : module.test )){
					if(special[readyName]){
						delete special[readyName];
					}
					webshimsFeatures[module.f];

					resList.push(name);
				}
			};
			return function(moduleNames){
				if(typeof moduleNames == 'string'){
					moduleNames = moduleNames.split(' ');
				}
				resList = [];
				$.each(moduleNames, reTest);
				loadList(resList);
			};
		})(),
		isReady: function(name, _set){

			name = name + 'Ready';
			if (_set) {
				if (special[name] && special[name].add) {
					return true;
				}

				special[name] = $.extend(special[name] || {}, {
					add: function(details){
						details.handler.call(this, name);
					}
				});
				$(document).triggerHandler(name);
			}
			return !!(special[name] && special[name].add) || false;
		},
		ready: function(events, fn /*, _created*/){
			var _created = arguments[2];
			if (typeof events == 'string') {
				events = events.split(' ');
			}

			if (!_created) {
				events = $.map($.grep(events, function(evt){
					return !isReady(evt);
				}), function(evt){
					return evt + 'Ready';
				});
			}
			if (!events.length) {
				fn($, webshims, window, document);
				return;
			}
			var readyEv = events.shift(), readyFn = function(){
				onReady(events, fn, true);
			};

			$(document).one(readyEv, readyFn);
		},

		/*
		 * basic DOM-/jQuery-Helpers
		 */


		capturingEvents: function(names, _maybePrevented){
			if (!document.addEventListener) {
				return;
			}
			if (typeof names == 'string') {
				names = [names];
			}
			$.each(names, function(i, name){
				var handler = function(e){
					e = $.event.fix(e);
					if (_maybePrevented && webshims.capturingEventPrevented) {
						webshims.capturingEventPrevented(e);
					}
					return $.event.dispatch.call(this, e);
				};
				special[name] = special[name] || {};
				if (special[name].setup || special[name].teardown) {
					return;
				}
				$.extend(special[name], {
					setup: function(){
						this.addEventListener(name, handler, true);
					},
					teardown: function(){
						this.removeEventListener(name, handler, true);
					}
				});
			});
		},
		register: function(name, fn){
			var module = modules[name];
			if (!module) {
				webshims.error("can't find module: " + name);
				return;
			}
			module.loaded = true;
			var ready = function(){
				fn($, webshims, window, document, undefined, module.options);
				isReady(name, true);
			};
			if (module.d && module.d.length) {
				onReady(module.d, ready);
			} else {
				ready();
			}

		},
		c: {},
		/*
		 * loader
		 */
		loader: {

			addModule: function(name, ext){
				modules[name] = ext;
				ext.name = ext.name || name;
				if(!ext.c){
					ext.c = [];
				}
				$.each(ext.c, function(i, comboname){
					if(!webshims.c[comboname]){
						webshims.c[comboname] = [];
					}
					webshims.c[comboname].push(name);
				});
			},
			loadList: (function(){

				var loadedModules = [];
				var loadScript = function(src, names){
					if (typeof names == 'string') {
						names = [names];
					}
					$.merge(loadedModules, names);
					loader.loadScript(src, false, names);
				};

				var noNeedToLoad = function(name, list){
					if (isReady(name) || $.inArray(name, loadedModules) != -1) {
						return true;
					}
					var module = modules[name];
					var supported;
					if (module) {
						supported = (module.test && $.isFunction(module.test)) ? module.test(list) : module.test;
						if (supported) {
							isReady(name, true);
							return true;
						} else {
							return false;
						}
					}
					return true;
				};

				var setDependencies = function(module, list){
					if (module.d && module.d.length) {
						var addDependency = function(i, dependency){
							if (!noNeedToLoad(dependency, list) && $.inArray(dependency, list) == -1) {
								list.push(dependency);
							}
						};
						$.each(module.d, function(i, dependency){
							if (modules[dependency]) {
								if(!modules[dependency].loaded){
									addDependency(i, dependency);
								}
							}
							else
								if (webshimsFeatures[dependency]) {
									$.each(webshimsFeatures[dependency], addDependency);
									onReady(webshimsFeatures[dependency], function(){
										isReady(dependency, true);
									});
								}
						});
						if (!module.noAutoCallback) {
							module.noAutoCallback = true;
						}
					}
				};

				return function(list){
					var module;
					var loadCombos = [];
					var i;
					var len;
					var foundCombo;
					var loadCombo = function(j, combo){
						foundCombo = combo;
						$.each(webshims.c[combo], function(i, moduleName){
							if($.inArray(moduleName, loadCombos) == -1 || $.inArray(moduleName, loadedModules) != -1){
								foundCombo = false;
								return false;
							}
						});
						if(foundCombo){
							loadScript('combos/'+foundCombo, webshims.c[foundCombo]);
							return false;
						}
					};

					//length of list is dynamically
					for (i = 0; i < list.length; i++) {
						module = modules[list[i]];
						if (!module || noNeedToLoad(module.name, list)) {
							if (WSDEBUG && !module) {
								webshims.warn('could not find: ' + list[i]);
							}
							continue;
						}
						if (module.css && webCFG.loadStyles) {
							loader.loadCSS(module.css);
						}

						if (module.loadInit) {
							module.loadInit();
						}


						setDependencies(module, list);
						if(!module.loaded){
							loadCombos.push(module.name);
						}
						module.loaded = true;
					}

					for(i = 0, len = loadCombos.length; i < len; i++){
						foundCombo = false;

						module = loadCombos[i];

						if($.inArray(module, loadedModules) == -1){
							if(webCFG.debug != 'noCombo'){
								$.each(modules[module].c, loadCombo);
							}
							if(!foundCombo){
								loadScript(modules[module].src || module, module);
							}
						}
					}
				};
			})(),

			makePath: function(src){
				if (src.indexOf('//') != -1 || src.indexOf('/') === 0) {
					return src;
				}

				if (src.indexOf('.') == -1) {
					src += '.js';
				}
				if (webCFG.addCacheBuster) {
					src += webCFG.addCacheBuster;
				}
				return webCFG.basePath + src;
			},

			loadCSS: (function(){
				var parent, loadedSrcs = {};
				return function(src){
					src = this.makePath(src);
					if (loadedSrcs[src]) {
						return;
					}
					parent = parent || $('link, style')[0] || $('script')[0];
					loadedSrcs[src] = 1;
					$('<link rel="stylesheet" />').insertBefore(parent).attr({
						href: src
					});
				};
			})(),

			loadScript: (function(){
				var loadedSrcs = {};
				return function(src, callback, name, noShimPath){
					if(!noShimPath){
						src = loader.makePath(src);
					}
					if (loadedSrcs[src]) {return;}
					var complete = function(){

						if (callback) {
							callback();
						}

						if (name) {
							if (typeof name == 'string') {
								name = name.split(' ');
							}
							$.each(name, function(i, name){
								if (!modules[name]) {
									return;
								}
								if (modules[name].afterLoad) {
									modules[name].afterLoad();
								}
								isReady(!modules[name].noAutoCallback ? name : name + 'FileLoaded', true);
							});

						}
					};

					loadedSrcs[src] = 1;
					webCFG.loadScript(src, complete, $.noop);
				};
			})()
		}
	});

	/*
	 * shortcuts
	 */


	var webCFG = webshims.cfg;
	var webshimsFeatures = webshims.features;
	var isReady = webshims.isReady;
	var onReady = webshims.ready;
	var addPolyfill = webshims.addPolyfill;
	var modules = webshims.modules;
	var loader = webshims.loader;
	var loadList = loader.loadList;
	var addModule = loader.addModule;
	var bugs = webshims.bugs;
	var removeCombos = [];
	var importantLogs = {
		warn: 1,
		error: 1
	};
	var $fn = $.fn;
	var video = create('video');

	webshims.addMethodName = function(name){
		name = name.split(':');
		var prop = name[1];
		if (name.length == 1) {
			prop = name[0];
			name = name[0];
		} else {
			name = name[0];
		}

		$fn[name] = function(){
			return this.callProp(prop, arguments);
		};
	};

	$fn.callProp = function(prop, args){
		var ret;
		if(!args){
			args = [];
		}
		this.each(function(){
			var fn = $.prop(this, prop);

			if (fn && fn.apply) {
				ret = fn.apply(this, args);
				if (ret !== undefined) {
					return false;
				}
			} else {
				webshims.warn(prop+ " is not a method of "+ this);
			}
		});
		return (ret !== undefined) ? ret : this;
	};



	webshims.activeLang = (function(){

		if(!('language' in navigator)){
			navigator.language = navigator.browserLanguage || '';
		}
		var curLang = $.attr(document.documentElement, 'lang') || navigator.language;
		onReady('webshimLocalization', function(){
			webshims.activeLang(curLang);
		});
		return function(lang){
			if(lang){
				if (typeof lang == 'string' ) {
					curLang = lang;
				} else if(typeof lang == 'object'){
					var args = arguments;
					var that = this;
					onReady('webshimLocalization', function(){
						webshims.activeLang.apply(that, args);
					});
				}
			}
			return curLang;
		};
	})();

	webshims.errorLog = [];
	$.each(['log', 'error', 'warn', 'info'], function(i, fn){
		webshims[fn] = function(message){
			if( (importantLogs[fn] && webCFG.debug !== false) || webCFG.debug){
				webshims.errorLog.push(message);
				if(window.console && console.log){
					console[(console[fn]) ? fn : 'log'](message);
				}
			}
		};
	});

	if(WSDEBUG){
		if(!webshims._curScript.wsFoundCurrent){
			webshims.error('Could not detect currentScript! Use basePath to set script path.');
		}
	}

	/*
	 * jQuery-plugins for triggering dom updates can be also very usefull in conjunction with non-HTML5 DOM-Changes (AJAX)
	 * Example:
	 * webshim.addReady(function(context, insertedElement){
	 * 		$('div.tabs', context).add(insertedElement.filter('div.tabs')).tabs();
	 * });
	 *
	 * $.ajax({
	 * 		success: function(html){
	 * 			$('#main').htmlPolyfill(html);
	 * 		}
	 * });
	 */

	(function(){
		//Overwrite DOM-Ready and implement a new ready-method
		$.isDOMReady = $.isReady;
		var onReady = function(){

			$.isDOMReady = true;
			isReady('DOM', true);
			setTimeout(function(){
				isReady('WINDOWLOAD', true);
			}, 9999);
		};

		firstRun = function(){
			if(!firstRun.run){

				if(WSDEBUG && $.mobile && ($.mobile.textinput || $.mobile.rangeslider || $.mobile.button)){
					webshims.info('jQM textinput/rangeslider/button detected waitReady was set to false. Use webshims.ready("featurename") to script against polyfilled methods/properties');

					if(!webCFG.readyEvt){
						webshims.error('in a jQuery mobile enviroment: you should change the readyEvt to "pageinit".');
					}

					if(webCFG.waitReady){
						webshims.error('in a jQuery mobile enviroment: you should change the waitReady to false.')
					}
				}

				if (WSDEBUG && webCFG.waitReady && $.isReady) {
					webshims.warn('Call webshims.polyfill before DOM-Ready or set waitReady to false.');
				}

				if(!$.isDOMReady && webCFG.waitReady){
					var $Ready = $.ready;
					$.ready = function(unwait){
						if(unwait !== true && document.body){
							onReady();
						}
						return $Ready.apply(this, arguments);
					};
					$.ready.promise = $Ready.promise;
				}
				if(webCFG.readyEvt){
					$(document).one(webCFG.readyEvt, onReady);
				} else {
					$(onReady);
				}
			}
			firstRun.run = true;
		};

		$(window).on('load', function(){
			onReady();
			setTimeout(function(){
				isReady('WINDOWLOAD', true);
			}, 9);
		});

		var readyFns = [];
		var eachTrigger = function(){
			if(this.nodeType == 1){
				webshims.triggerDomUpdate(this);
			}
		};
		$.extend(webshims, {
			addReady: function(fn){
				var readyFn = function(context, elem){
					webshims.ready('DOM', function(){fn(context, elem);});
				};
				readyFns.push(readyFn);

				if(webCFG.wsdoc){
					readyFn(webCFG.wsdoc, emptyJ);
				}
			},
			triggerDomUpdate: function(context){
				if(!context || !context.nodeType){
					if(context && context.jquery){
						context.each(function(){
							webshims.triggerDomUpdate(this);
						});
					}
					return;
				}
				var type = context.nodeType;
				if(type != 1 && type != 9){return;}
				var elem = (context !== document) ? $(context) : emptyJ;
				$.each(readyFns, function(i, fn){
					fn(context, elem);
				});
			}
		});

		$fn.clonePolyfill = $fn.clone;

		$fn.htmlPolyfill = function(a){
			if(!arguments.length){
				return $(this.clonePolyfill()).html();
			}
			var ret = $fn.html.call(this,  a);
			if(ret === this && $.isDOMReady){
				this.each(eachTrigger);
			}
			return ret;
		};

		$fn.jProp = function(){
			return this.pushStack($($fn.prop.apply(this, arguments) || []));
		};

		$.each(['after', 'before', 'append', 'prepend', 'replaceWith'], function(i, name){
			$fn[name+'Polyfill'] = function(a){
				a = $(a);
				$fn[name].call(this, a);
				if($.isDOMReady){
					a.each(eachTrigger);
				}
				return this;
			};

		});

		$.each(['insertAfter', 'insertBefore', 'appendTo', 'prependTo', 'replaceAll'], function(i, name){
			$fn[name.replace(/[A-Z]/, function(c){return "Polyfill"+c;})] = function(){
				$fn[name].apply(this, arguments);
				if($.isDOMReady){
					webshims.triggerDomUpdate(this);
				}
				return this;
			};
		});

		$fn.updatePolyfill = function(){
			if($.isDOMReady){
				webshims.triggerDomUpdate(this);
			}
			return this;
		};

		$.each(['getNativeElement', 'getShadowElement', 'getShadowFocusElement'], function(i, name){
			$fn[name] = function(){
				return this.pushStack(this);
			};
		});

	})();


	if(WSDEBUG){
		webCFG.debug = true;
	}

	if(Object.create){
		webshims.objectCreate = function(proto, props, opts){
			if(WSDEBUG && props){
				webshims.error('second argument for webshims.objectCreate is only available with DOM support');
			}
			var o = Object.create(proto);
			if(opts){
				o.options = $.extend(true, {}, o.options  || {}, opts);
				opts = o.options;
			}
			if(o._create && $.isFunction(o._create)){
				o._create(opts);
			}
			return o;
		};
	}




	/*
	 * Start Features
	 */

	/* general modules */
	/* change path $.webshims.modules[moduleName].src */


	addModule('swfmini', {
		test: function(){
			if(window.swfobject && !window.swfmini){
				window.swfmini = window.swfobject;
			}
			return ('swfmini' in window);
		},
		c: [16, 7, 2, 8, 1, 12, 23]
	});
	modules.swfmini.test();

	addModule('sizzle', {test: $.expr.filters});
	/*
	 * polyfill-Modules
	 */

	// webshims lib uses a of http://github.com/kriskowal/es5-shim/ to implement
	addPolyfill('es5', {
		test: !!(support.ES5 && Function.prototype.bind),
		d: ['sizzle']
	});

	addPolyfill('dom-extend', {
		f: DOMSUPPORT,
		noAutoCallback: true,
		d: ['es5'],
		c: [16, 7, 2, 15, 30, 3, 8, 4, 9, 10, 25, 31, 34]
	});

	//<picture
	create('picture');
	addPolyfill('picture', {
		test: ('picturefill' in window) || !!window.HTMLPictureElement || ('respimage' in window),
		d: ['matchMedia'],
		c: [18],
		loadInit: function(){
			isReady('picture', true);
		}
	});
	//>

	//<matchMedia
	addPolyfill('matchMedia', {
		test: !!(window.matchMedia && matchMedia('all').addListener),
		c: [18]
	});
	//>

	//<sticky
	addPolyfill('sticky', {
		test: (($(create('b')).attr('style', 'position: -webkit-sticky; position: sticky').css('position') || '').indexOf('sticky') != -1),
		d: ['es5', 'matchMedia']
	});
	//>

	//<es6
	addPolyfill('es6', {
		test: !!(Math.imul && Number.MIN_SAFE_INTEGER && Object.is && window.Promise && Promise.all),// && window.Map && Map.prototype && typeof Map.prototype.forEach !== 'function' && window.Set
		d: ['es5']
	});
	//>

	//<geolocation

	addPolyfill('geolocation', {
		test: 'geolocation' in navigator,
		options: {
			destroyWrite: true
//			,confirmText: ''
		},
		c: [21]
	});
	//>

	//<canvas
	(function(){
		addPolyfill('canvas', {
			src: 'excanvas',
			test: ('getContext' in create('canvas')),
			options: {type: 'flash'}, //excanvas | flash | flashpro
			noAutoCallback: true,

			loadInit: function(){
				var type = this.options.type;
				if(type && type.indexOf('flash') !== -1 && (!modules.swfmini.test() || swfmini.hasFlashPlayerVersion('9.0.0'))){
					this.src = type == 'flash' ? 'FlashCanvas/flashcanvas' : 'FlashCanvasPro/flashcanvas';
				}
			},
			methodNames: ['getContext'],
			d: [DOMSUPPORT]
		});
	})();
	//>


	//<usermedia
	var userMediaTest =  ('getUserMedia' in navigator);

	addPolyfill('usermedia-core', {
		f: 'usermedia',
		test: userMediaTest && window.URL,
		d: ['url', DOMSUPPORT]
	});

	addPolyfill('usermedia-shim', {
		f: 'usermedia',
		test: !!(userMediaTest || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia),
		d: ['url', 'mediaelement', DOMSUPPORT]
	});
	//>

	//<mediacapture
	addPolyfill('mediacapture', {
		test: supportCapture,
		d: ['swfmini', 'usermedia', DOMSUPPORT, 'filereader', 'forms', 'canvas']
	});
	//>


	//<forms
	(function(){
		var formExtend, formOptions;
		var fShim = 'form-shim-extend';
		var formvalidation = 'formvalidation';
		var fNuAPI = 'form-number-date-api';
		var bustedValidity = false;
		var bustedWidgetUi = false;
		var replaceBustedUI = false;
		var inputtypes = {};


		var progress = create('progress');
		var output = create('output');

		var initialFormTest = function(){
			var tmp, fieldset;
			var testValue = '1(';
			var input = create('input');
			fieldset = $('<fieldset><textarea required="" /></fieldset>')[0];

			support.inputtypes = inputtypes;

			$.each(['range', 'date', 'datetime-local', 'month', 'color', 'number'], function(i, type){
				input.setAttribute('type', type);
				inputtypes[type] = (input.type == type && (input.value = testValue) && input.value != testValue);
			});

			support.datalist = !!(('options' in create('datalist')) && window.HTMLDataListElement);

			support[formvalidation] = ('checkValidity' in input);

			support.fieldsetelements = ('elements' in fieldset);


			if((support.fieldsetdisabled = ('disabled' in fieldset))){
				try {
					if(fieldset.querySelector(':invalid')){
						fieldset.disabled = true;
						tmp = !fieldset.querySelector(':invalid') && fieldset.querySelector(':disabled');
					}
				} catch(er){}
				support.fieldsetdisabled =  !!tmp;
			}

			if(support[formvalidation]){
				bustedWidgetUi = !support.fieldsetdisabled || !support.fieldsetelements || !('value' in progress) || !('value' in output);
				replaceBustedUI = bustedWidgetUi && (/Android/i).test(navigator.userAgent);
				bustedValidity = window.opera || bugs.bustedValidity || bustedWidgetUi || !support.datalist;

				if(!bustedValidity && inputtypes.number){
					bustedValidity = true;
					try {
						input.type = 'number';
						input.value = '';
						input.stepUp();
						bustedValidity = input.value != '1';
					} catch(e){}
				}

			}

			bugs.bustedValidity = bustedValidity;

			formExtend = support[formvalidation] && !bustedValidity ? 'form-native-extend' : fShim;
			initialFormTest = $.noop;
			return false;
		};
		var typeTest = function(o){
			var ret = true;
			if(!o._types){
				o._types = o.types.split(' ');
			}
			$.each(o._types, function(i, name){
				if((name in inputtypes) && !inputtypes[name]){
					ret = false;
					return false;
				}
			});
			return ret;
		};


		webshims.validationMessages = webshims.validityMessages = {
			langSrc: 'i18n/formcfg-',
			availableLangs: "ar bg ca cs el es fa fi fr he hi hu it ja lt nl no pl pt pt-BR pt-PT ru sv zh-CN zh-TW".split(' ')
		};
		webshims.formcfg = $.extend({}, webshims.validationMessages);

		webshims.inputTypes = {};

		addPolyfill('form-core', {
			f: 'forms',
			test: initialFormTest,
			d: ['es5'],
			options: {
				placeholderType: 'value',
				messagePopover: {},
				list: {
					popover: {
						constrainWidth: true
					}
				},
				iVal: {
					sel: '.ws-validate',
					handleBubble: 'hide',
					recheckDelay: 400
//					,fx: 'slide'
				}
	//			,customMessages: false,
	//			overridePlaceholder: false, // might be good for IE10
	//			replaceValidationUI: false
			},
			methodNames: ['setCustomValidity', 'checkValidity', 'setSelectionRange'],
			c: [16, 7, 2, 8, 1, 15, 30, 3, 31]
		});

		formOptions = webCFG.forms;

		addPolyfill('form-native-extend', {
			f: 'forms',
			test: function(toLoad){
				initialFormTest();
				return !support[formvalidation] || bustedValidity  || $.inArray(fNuAPI, toLoad  || []) == -1 || modules[fNuAPI].test();
			},
			d: ['form-core', DOMSUPPORT, 'form-message'],
			c: [6, 5, 14, 29]
		});

		addPolyfill(fShim, {
			f: 'forms',
			test: function(){
				initialFormTest();
				return support[formvalidation] && !bustedValidity;
			},
			d: ['form-core', DOMSUPPORT, 'sizzle'],
			c: [16, 15, 28]
		});

		addPolyfill(fShim+'2', {
			f: 'forms',
			test: function(){
				initialFormTest();
				return support[formvalidation] && !bustedWidgetUi;
			},
			d: [fShim],
			c: [27]
		});

		addPolyfill('form-message', {
			f: 'forms',
			test: function(toLoad){
				initialFormTest();
				return !( formOptions.customMessages || !support[formvalidation] || bustedValidity || !modules[formExtend].test(toLoad) );
			},
			d: [DOMSUPPORT],
			c: [16, 7, 15, 30, 3, 8, 4, 14, 28]
		});


		addPolyfill(fNuAPI, {
			f: 'forms-ext',
			options: {
				types: 'date time range number'
			},
			test: function(){
				initialFormTest();
				var ret = !bustedValidity;

				if(ret){
					ret = typeTest(this.options);
				}

				return ret;
			},
			methodNames: ['stepUp', 'stepDown'],
			d: ['forms', DOMSUPPORT],
			c: [6, 5, 17, 14, 28, 29, 33]
		});

		addModule('range-ui', {
			options: {},
			noAutoCallback: true,
			test: function(){
				return !!$fn.rangeUI;
			},
			d: ['es5'],
			c: [6, 5, 9, 10, 17, 11]
		});

		addPolyfill('form-number-date-ui', {
			f: 'forms-ext',
			test: function(){
				var o = this.options;
				o.replaceUI = getAutoEnhance(o.replaceUI);
				initialFormTest();
				//input widgets on old androids can't be trusted
				if(!o.replaceUI && replaceBustedUI){
					o.replaceUI = true;
				}
				return !o.replaceUI && typeTest(o);
			},
			d: ['forms', DOMSUPPORT, fNuAPI, 'range-ui'],
			options: {
				widgets: {
					calculateWidth: true,
					animate: true
				}
			},
			c: [6, 5, 9, 10, 17, 11]
		});

		addPolyfill('form-datalist', {
			f: 'forms',
			test: function(){
				initialFormTest();
				if(replaceBustedUI){
					formOptions.customDatalist = true;
				}
				return support.datalist && !formOptions.fD;
			},
			d: ['form-core', DOMSUPPORT],
			c: [16, 7, 6, 2, 9, 15, 30, 31, 28, 33]
		});
	})();
	//>

	//<filereader
	var supportFileReader = 'FileReader' in window && 'FormData' in window;
	addPolyfill('filereader-xhr', {
		f: 'filereader',
		test: supportFileReader,
		d: [DOMSUPPORT, 'swfmini'],
		c: [25, 27]
	});

	addPolyfill('canvas-blob', {
		f: 'filereader',
		methodNames: ['toBlob'],
		test: !(supportFileReader && !create('canvas').toBlob)
	});
	//>

	//<details
	addPolyfill('details', {
		test: ('open' in create('details')),
		d: [DOMSUPPORT],
		options: {
//			animate: false,
			text: 'Details'
		},
		c: [21, 22]
	});
	//>

	//<url
	addPolyfill('url', {
		test: function(){
			var support = false;
			try {
				support = new URL('b', 'http://a');
				support = !!(support.searchParams && support.href == 'http://a/b');
			} catch(e){}
			return support;
		},
		d: ['es5']
	});
	//>

	//<mediaelement
	(function(){
		webshims.mediaelement = {};
		var track = create('track');
		support.mediaelement = ('canPlayType' in video);
		support.texttrackapi = ('addTextTrack' in video);
		support.track = ('kind' in track);

		create('audio');

		if(!(bugs.track = !support.texttrackapi)){
			try {
				bugs.track = !('oncuechange' in video.addTextTrack('metadata'));
			} catch(e){}
		}

		addPolyfill('mediaelement-core', {
			f: 'mediaelement',
			noAutoCallback: true,
			options: {
				//replaceUI: false,
				jme: {},
				plugins: [],
				vars: {},
				params: {},
				attrs: {},
				changeSWF: $.noop
			},
			methodNames: ['play', 'pause', 'canPlayType', 'mediaLoad:load'],
			d: ['swfmini'],
			c: [16, 7, 2, 8, 1, 12, 13, 23]
		});


		addPolyfill('mediaelement-jaris', {
			f: 'mediaelement',
			d: ['mediaelement-core', DOMSUPPORT],
			test: function(){
				var options = this.options;

				if(!support.mediaelement || webshims.mediaelement.loadSwf){
					return false;
				}

				if(options.preferFlash && !modules.swfmini.test()){
					options.preferFlash = false;
				}
				return !( options.preferFlash && swfmini.hasFlashPlayerVersion('11.3') );
			},
			c: [21, 25]
		});

		addPolyfill('track', {
			options: {
				positionDisplay: true,
				override: bugs.track
			},
			test: function(){
				var o = this.options;
				o.override = getAutoEnhance(o.override);
				return !o.override && !bugs.track;
			},
			d: ['mediaelement', DOMSUPPORT],
			methodNames: ['addTextTrack'],
			c: [21, 12, 13, 22, 34]
		});

		addModule('jmebase', {
			src: 'jme/base',
			c: [98, 99, 97]
		});

		$.each([
			['mediacontrols', {c: [98, 99], css: 'jme/controls.css'}],
			['playlist', {c: [98, 97]}],
			['alternate-media']
		], function(i, plugin){
			addModule(plugin[0], $.extend({
				src: 'jme/'+plugin[0],
				d: ['jmebase']
			}, plugin[1]));
		});


		addModule('track-ui', {
			d: ['track', DOMSUPPORT]
		});

	})();
	//>


	//>removeCombos<
	addPolyfill('feature-dummy', {
		test: true,
		loaded: true,
		c: removeCombos
	});

	webshims.$ = $;
	$.webshims = webshims;
	$.webshim = webshim;

	webshims.callAsync = function(){
		webshims.callAsync = $.noop;

		if(asyncWebshims){
			if(asyncWebshims.cfg){
				if(!asyncWebshims.cfg.length){
					asyncWebshims.cfg = [[asyncWebshims.cfg]];
				}
				$.each(asyncWebshims.cfg, function(i, cfg){
					webshims.setOptions.apply(webshims, cfg);
				});
			}
			if(asyncWebshims.ready){
				$.each(asyncWebshims.ready, function(i, ready){
					webshims.ready.apply(webshims, ready);
				});
			}
			if(asyncWebshims.lang){
				webshims.activeLang(asyncWebshims.lang);
			}
			if('polyfill' in asyncWebshims){
				webshims.polyfill(asyncWebshims.polyfill);
			}
		}
		webshims.isReady('jquery', true);
	};

	webshims.callAsync();
	return webshims;
}));
