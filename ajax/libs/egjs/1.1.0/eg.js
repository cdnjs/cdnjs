/**
* Copyright (c) 2015 NAVER corp.
* egjs projects are licensed under the MIT license
* https://naver.github.io/egjs/license.txt
*
* egjs JavaScript library
* http://naver.github.io/egjs
*
* @version 1.1.0
* @SHA-1 fb4a69e (1.1.0-rc)
*
* For custom build use egjs-cli
* https://github.com/naver/egjs-cli
*/
"use strict";
/**
* Copyright (c) 2015 NAVER Corp.
* egjs projects are licensed under the MIT license
*/

(function(jQueryName, ns, global) {
var eg;
	if (!global[ns]) {
		global[ns] = {};
	}
	eg = global[ns];

	var $ = global[jQueryName];

	var dependency = {
		"jQuery": {
			"url": "http://jquery.com/"
		},
		"Hammer": {
			"url": "http://hammerjs.github.io/"
		},
		"Outlayer": {
			"url": "https://github.com/metafizzy/outlayer/"
		}
	};

	// jscs:disable maximumLineLength
	var templateMessage = [
		"[egjs] The {{name}} library must be loaded before {{componentName}}.",
		"[egjs] For AMD environment (like RequireJS), \"{{name}}\" must be declared, which is required by {{componentName}}.",
        "[egjs] The {{index}} argument of {{componentName}} is missing.\r\nDownload {{name}} from [{{url}}].",
		"[egjs] The {{name}} parameter of {{componentName}} is not valid.\r\nPlease check and try again.",
        "[egjs] The {{index}} argument of {{componentName}} is undefined.\r\nPlease check and try again."
	];

	// jscs:enable maximumLineLength

	var ordinal = [ "1st", "2nd", "3rd"];

	function changeOrdinal(index) {
		return index > 2 ? (index + 1) + "th" : ordinal[index];
	}

	function replaceStr(str, obj) {
		var i;
		for (i in obj) {
			str = str.replace(new RegExp("{{" + i + "}}","gi"), obj[i]);
		}
		return str;
	}

	function checkDependency(componentName, di) {
		var i = 0;
		var l = di.length;
		var message = [];
		var paramList = [];
		var require = global.require;
		var dependencyInfo;
		var param;
		var messageInfo;
		var isString;
		var isUndefined;
		var registedDependency;
		var isNotGlobal;
		var specifiedAMD;

		for (; i < l; i++) {
			param = di[i];
			messageInfo = {
				"index": changeOrdinal(i),
				"name": param,
				"componentName": componentName
			};

			isString = typeof di[i] === "string";
			isUndefined = di[i] === undefined;
			registedDependency = isString && (dependencyInfo = dependency[di[i]]);
			isNotGlobal = isString && dependencyInfo && !global[di[i]];
			specifiedAMD = isNotGlobal &&
				require && require.specified && require.specified(di[i]);

			// Message decision flow
			//             argument
			// |--------------|--------------|
			// undefined    string    !string&&!undefined
			// |              |              |
			// msg(4)         |             (OK)
			//         defined dependency
			//                |
			// |-----------------------------|
			// |                             |
			// msg(3)                     in global
			//                               |
			//                 |------------------------------|
			//              use AMD                          (OK)
			//                 |
			//  |------------------------------|
			//  msg(2)                  require.specified
			// 	                               |
			// 	                |------------------------------|
			//                  msg(1)                  require.defined
			// 	                                               |
			//                                  |------------------------------|
			//                                  msg(0)                        (OK)

			if (!isString && !isUndefined) {
				paramList.push(param);
				continue;
			}

			if (specifiedAMD && require.defined(di[i])) {
				param = require(di[i]);
				paramList.push(param);
				continue;
			}

			if (specifiedAMD && !require.defined(di[i])) {
				messageInfo.url = dependencyInfo.url;
				message.push(replaceStr(templateMessage[0], messageInfo));
				continue;
			}

			if (isNotGlobal && require &&
				require.specified && !require.specified(di[i])) {
				messageInfo.url = dependencyInfo.url;
				message.push(replaceStr(templateMessage[1], messageInfo));
				continue;
			}

			if (isNotGlobal && !require) {
				messageInfo.url = dependencyInfo.url;
				message.push(replaceStr(templateMessage[2], messageInfo));
				continue;
			}

			if (registedDependency && global[di[i]]) {
				param = global[di[i]];
				paramList.push(param);
				continue;
			}

			if (isString && !dependencyInfo) {
				message.push(replaceStr(templateMessage[3], messageInfo));
				continue;
			}

			if (di[i] === undefined) {
				message.push(replaceStr(templateMessage[4], messageInfo));
				continue;
			}
		}

		return [paramList, message];
	}

	function capitalizeFirstLetter(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	function plugin(name) {
		var upperCamelCase = capitalizeFirstLetter(name);
		var events;
		var special;
		var componentMethodNames;

		if (!(eg[upperCamelCase] && eg[upperCamelCase].prototype._events)) {
			return false;
		}

		// jscs:disable validateLineBreaks, maximumLineLength
		if ($.fn[name]) {
			throw new Error("The name '" + upperCamelCase + "' has already been used and registered as plugin. Try with different one.");
		}

		// jscs:enable validateLineBreaks, maximumLineLength

		// Extend method.
		$.fn[name] = function(options) {
			var ins;
			var result;
			if (typeof options === "string") {
				ins = this.data(ns + "-" + name);
				if (options === "instance") {
					return ins;
				} else {
					result = ins[options].apply(ins, Array.prototype.slice.call(arguments, 1));
					return result === ins ? this : result;
				}
			}

			if (options === undefined || $.isPlainObject(options)) {
				this.data(ns + "-" + name, new eg[upperCamelCase](
					this, options || {}, name + ":"
				));
			}
			return this;
		};

		componentMethodNames = {
			trigger: "trigger",
			add: "on",
			remove: "off"
		};
		events = eg[upperCamelCase].prototype._events();

		for (var i in events) {
			special = $.event.special[name + ":" + events[i]] = {};

			// to not bind native event
			special.setup = function() {
				return true;
			};

			for (var j in componentMethodNames) {
				// jscs:disable validateLineBreaks, maximumLineLength
				/*jshint loopfunc: true */
				special[j] = (function(componentMethodName) {
					return function(event, param) {
						$(this).data(ns + "-" + name)[componentMethodName](
							event.type,
							componentMethodName === "trigger" ? param : event.handler
						);
						return false;
					};
				})(componentMethodNames[j]);

				// jscs:enable validateLineBreaks, maximumLineLength
			}
		}
	}

	var warn = function(msg) {
		/* jshint ignore:start */
		if (global.console && global.console.warn) {
			warn = function(msg) {
				global.console.warn(msg);
			};
		} else {
			warn = function(msg) {
			};
		}
		/* jshint ignore:end */
		warn(msg);
	};

	/**
	 * Regist module.
	 * @private
	 */
	if (!eg.module) {
		eg.module = function(name, di, fp) {
			var result = checkDependency(name, di);

			if (result[1].length) {
				warn(result[1].join("\r\n"));
			} else {
				fp.apply(global, result[0]);
				plugin(name);
			}
		};
	}

})("jQuery", "eg", window);
/**
* Copyright (c) 2015 NAVER Corp.
* egjs projects are licensed under the MIT license
*/

eg.module("eg", ["jQuery", eg, window], function($, ns, global) {
var raf = global.requestAnimationFrame || global.webkitRequestAnimationFrame ||
				global.mozRequestAnimationFrame || global.msRequestAnimationFrame;
	var caf = global.cancelAnimationFrame || global.webkitCancelAnimationFrame ||
				global.mozCancelAnimationFrame || global.msCancelAnimationFrame;

	if (raf && !caf) {
		var keyInfo = {};
		var oldraf = raf;
		raf = function(callback) {
			function wrapCallback() {
				if (keyInfo[key]) {
					callback();
				}
			}
			var key = oldraf(wrapCallback);
			keyInfo[key] = true;
			return key;
		};
		caf = function(key) {
			delete keyInfo[key];
		};
	} else if (!(raf && caf)) {
		raf = function(callback) {
			return global.setTimeout(callback, 16);
		};
		caf = global.clearTimeout;
	}

	function resultCache(scope, name, param, defaultValue) {
		var method = scope.hook[name];
		if (method) {
			defaultValue = method.apply(scope, param);
		}

		scope[name] = function() {
			var method = scope.hook[name];
			if (method) {
				return method.apply(scope, param);
			}
			return defaultValue;
		};
		return defaultValue;
	}

	/**
	 * @namespace eg
	 * @group egjs
	 */

	/**
	 * @name eg.VERSION
	 * @description version infomation
	 * @ko 버전 정보
	 */
	ns.VERSION = "1.1.0";
	ns.hook =  {
		// isHWAccelerable : null,
		// isTransitional 	: null,
		// agent : null
	};
	/**
	* Get browser agent information
	*
	* @ko Agent 정보를 반환한다. 값은 캐싱된다.
	* @method eg#agent
	* @return {Object} agent
	* @return {String} agent.os os infomation <ko>os 정보 객체</ko>
	* @return {String} agent.os.name os name (android, ios, window, mac) <ko>os 이름 (android, ios, window, mac)</ko>
	* @return {String} agent.os.version os version <ko>os 버전</ko>
	* @return {String} agent.browser browser information <ko>브라우저 정보 객체</ko>
	* @return {String} agent.browser.name browser name (default, safari, chrome, sbrowser, ie, firefox) <ko>브라우저 이름 (default, safari, chrome, sbrowser, ie, firefox)</ko>
	* @return {String} agent.browser.version browser version <ko>브라우저 버전 정보</ko>
	* @return {String} agent.browser.webview check whether browser is webview <ko>웹뷰 브라우저 여부</ko>
	* @example
eg.agent();
// {
//     os : {
//          name : "ios",
//          version : "8.2"
//     },
//     browser : {
//          name : "safari",
//          version : "8.2"
//          nativeVersion : "-1"
//     }
// }


eg.hook.agent = function(agent) {
if(agent.os.name === "naver") {
	agent.browser.name = "inapp";
	return agent;
}
}
	*/
	/*
	*	{String|RegEx} criteria
	*	{String|RegEx} identity
	*	{String} versionSearch
	*	{String} versionAlias
	*	{String|RegEx} webviewBrowserVersion
	*	{String|RegEx} webviewToken
	*/
	var userAgentRules = {
		browser: [{
			criteria: "PhantomJS",
			identity: "PhantomJS"
		}, {
			criteria: /Edge/,
			identity: "Edge",
			versionSearch: "Edge"
		}, {
			criteria: /MSIE|Trident|Windows Phone/,
			identity: "IE",
			versionSearch: "IEMobile|MSIE|rv"
		}, {
			criteria: /SAMSUNG|SamsungBrowser/,
			identity: "SBrowser",
			versionSearch: "Chrome"
		}, {
			criteria: /Chrome|CriOS/,
			identity: "Chrome"
		}, {
			criteria: /Android/,
			identity: "default"
		}, {
			criteria: /iPhone|iPad/,
			identity: "Safari",
			versionSearch: "Version"
		}, {
			criteria: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		}, {
			criteria: "Firefox",
			identity: "Firefox"
		}],
		os: [{
			criteria: /Windows Phone|Windows NT/,
			identity: "Window",
			versionSearch: "Windows Phone|Windows NT"
		}, {
			criteria: "Windows 2000",
			identity: "Window",
			versionAlias: "5.0"
		}, {
			criteria: /iPhone|iPad/,
			identity: "iOS",
			versionSearch: "iPhone OS|CPU OS"
		}, {
			criteria: "Mac",
			versionSearch: "OS X",
			identity: "MAC"
		}, {
			criteria: /Android/,
			identity: "Android"
		}],

		// Webview check condition
		// ios: If has no version information
		// Android 5.0 && chrome 40+: Presence of "; wv" in userAgent
		// Under android 5.0:  Presence of "NAVER" or "Daum" in userAgent
		webview: [{
			criteria: /iPhone|iPad/,
			browserVersionSearch: "Version",
			webviewBrowserVersion: /-1/
		}, {
			criteria: /iPhone|iPad|Android/,
			webviewToken: /NAVER|DAUM|; wv/

		}],
		defaultString: {
			browser: {
				version: "-1",
				name: "default"
			},
			os: {
				version: "-1",
				name: "unknown"
			}
		}
	};

	var UAParser = {
		getBrowserName: function(browserRules) {
			return this.getIdentityStringFromArray(
				browserRules,
				userAgentRules.defaultString.browser
			);
		},
		getBrowserVersion: function(browserName) {
			var browserVersion;
			var versionToken;

			if (!browserName) {
				return;
			}

			versionToken =
				this.getBrowserRule(browserName).versionSearch || browserName;

			browserVersion = this.extractBrowserVersion(versionToken, this.ua);

			return browserVersion;
		},
		extractBrowserVersion: function(versionToken, ua) {
			var browserVersion = userAgentRules.defaultString.browser.version;
			var versionIndex;
			var versionTokenIndex;
			var versionRegexResult =
				(new RegExp("(" + versionToken + ")", "i")).exec(ua);

			if (!versionRegexResult) {
				return browserVersion;
			}

			versionTokenIndex = versionRegexResult.index;
			versionToken = versionRegexResult[0];
			if (versionTokenIndex > -1) {
				versionIndex = versionTokenIndex + versionToken.length + 1;
				browserVersion = ua.substring(versionIndex)
					.split(" ")[0]
					.replace(/_/g, ".")
					.replace(/\;|\)/g, "");
			}

			return browserVersion;
		},
		getOSName: function(osRules) {
			return this.getIdentityStringFromArray(
				osRules,
				userAgentRules.defaultString.os
			);
		},
		getOSVersion: function(osName) {
			var ua = this.ua;
			var osRule = this.getOSRule(osName) || {};
			var defaultOSVersion = userAgentRules.defaultString.os.version;
			var osVersion;
			var osVersionToken;
			var osVersionRegex;
			var osVersionRegexResult;

			if (!osName) {
				return;
			}

			if (osRule.versionAlias) {
				return osRule.versionAlias;
			}

			osVersionToken = osRule.versionSearch || osName;
			osVersionRegex =
				new RegExp(
					"(" + osVersionToken + ")\\s([\\d_\\.]+|\\d_0)",
					"i"
				);

			osVersionRegexResult = osVersionRegex.exec(ua);
			if (osVersionRegexResult) {
				osVersion = osVersionRegex.exec(ua)[2].replace(/_/g, ".")
													.replace(/\;|\)/g, "");
			}

			return osVersion || defaultOSVersion;
		},
		getOSRule: function(osName) {
			return this.getRule(userAgentRules.os, osName);
		},
		getBrowserRule: function(browserName) {
			return this.getRule(userAgentRules.browser, browserName);
		},
		getRule: function(rules, targetIdentity) {
			var criteria;
			var identityMatched;

			for (var i = 0, rule; rule = rules[i]; i++) {
				criteria = rule.criteria;
				identityMatched =
					new RegExp(rule.identity, "i").test(targetIdentity);
				if (criteria ?
					identityMatched && this.isMatched(this.ua, criteria) :
					identityMatched) {
					return rule;
				}
			}
		},
		getIdentityStringFromArray: function(rules, defaultStrings) {
			for (var i = 0, rule; rule = rules[i]; i++) {
				if (this.isMatched(this.ua, rule.criteria)) {
					return rule.identity || defaultStrings.name;
				}
			}
			return defaultStrings.name;
		},
		isMatched: function(base, target) {
			return target &&
				target.test ? !!target.test(base) : base.indexOf(target) > -1;
		},
		isWebview: function() {
			var ua = this.ua;
			var webviewRules = userAgentRules.webview;
			var isWebview = false;
			var browserVersion;

			for (var i = 0, rule; rule = webviewRules[i]; i++) {
				if (!this.isMatched(ua, rule.criteria)) {
					continue;
				}

				browserVersion =
					this.extractBrowserVersion(rule.browserVersionSearch, ua);

				if (this.isMatched(ua, rule.webviewToken) ||
					this.isMatched(browserVersion, rule.webviewBrowserVersion)) {
					isWebview = true;
					break;
				}
			}

			return isWebview;
		}
	};

	UAParser.create = function(useragent) {
		UAParser.ua = useragent;
		var agent = {
			os: {},
			browser: {}
		};

		agent.browser.name = UAParser.getBrowserName(userAgentRules.browser);
		agent.browser.version = UAParser.getBrowserVersion(agent.browser.name);
		agent.os.name = UAParser.getOSName(userAgentRules.os);
		agent.os.version = UAParser.getOSVersion(agent.os.name);
		agent.browser.webview = UAParser.isWebview();

		agent.browser.name = agent.browser.name.toLowerCase();
		agent.os.name = agent.os.name.toLowerCase();

		return agent;
	};

	ns.agent = function() {
		var info = UAParser.create(global.navigator.userAgent);
		return resultCache(this, "agent", [info], info);
	};

	/**
	 * Get a translate string
	 *
	 * @ko translate 문자를 반환한다.
	 * @method eg#translate
	 * @param {String} x x-coordinate <ko>x 좌표</ko>
	 * @param {String} y y-coordinate <ko>y 좌표</ko>
	 * @param {Boolean} [isHA] isHWAccelerable <ko>하드웨어 가속 여부</ko>
	 * @return {String}
	 * @example
eg.translate('10px', '200%');  // translate(10px,200%);
eg.translate('10px', '200%', true);  // translate3d(10px,200%,0);
	 */
	ns.translate = function(x, y, isHA) {
		isHA = isHA || false;
		return "translate" + (isHA ?
								"3d(" : "(") + x + "," + y + (isHA ? ",0)" :
								")");
	};

	/**
	 * Check hardware acceleration support
	 *
	 * @ko 해당 기기에서 하드웨어 가속을 할 수 있다면 true을 반환하며, 값은 캐싱된다.
	 * @method eg#isHWAccelerable
	 * @return {Boolean}
	 * @example
eg.isHWAccelerable();  // Returns 'true' when supports hardware acceleration

// also, you can control return value
eg.hook.isHWAccelerable = function(defalutVal,agent) {
if(agent.os.name === "ios") {
	// if os is 'ios', return value is 'false'
	return false;
} else if(agent.browser.name === "chrome" ) {
	// if browser is 'chrome', return value is 'true'
	return true;
}
return defaultVal;
}
	 */
	ns.isHWAccelerable = function() {
		var result = false;
		var agent = ns.agent();
		var osVersion = agent.os.version;
		var browser = agent.browser.name;
		var browserVersion = agent.browser.version;
		var useragent;

		// chrome 25- has a text blur bug (except Samsung's sbrowser)
		if (browser.indexOf("chrome") !== -1) {
			result = browserVersion >= "25";
		} else if (/ie|edge|firefox|safari|inapp/.test(browser)) {
			result = true;
		} else if (agent.os.name.indexOf("android") !== -1) {
			// for Xiaomi
			useragent = (UAParser.ua.match(/\(.*\)/) || [null])[0];

			// android 4.1+ blacklist
			// EK-GN120 : Galaxy Camera, SM-G386F : Galaxy Core LTE
			// SHW-M420 : Galaxy Nexus , SHW-M200 : NexusS , GT-S7562 : Galaxy S duos
			result = (osVersion >= "4.1.0" && !/EK-GN120|SM-G386F/.test(useragent)) ||
				(osVersion >= "4.0.3" &&
					/SHW-|SHV-|GT-|SCH-|SGH-|SPH-|LG-F160|LG-F100|LG-F180|LG-F200|EK-|IM-A|LG-F240|LG-F260/.test(useragent) && !/SHW-M420|SHW-M200|GT-S7562/.test(useragent));
		}
		return resultCache(this, "isHWAccelerable", [result, agent], result);
	};

	/**
	 * Check CSS transition support
	 *
	 * @ko 해당 기기에서 css transtion을 할 수 있다면 true을 반환하며, 값은 캐싱된다.
	 * @method eg#isTransitional
	 * @return {Boolean}
	 * @example
eg.isTransitional();  // Returns 'true' when supports CSS transition

// also, you can control return value
eg.hook.isTransitional = function(defaultVal, agent) {
if(agent.os.name === "ios") {
	// if os is 'ios', return value is 'false'
	return false;
} else if(agent.browser.name === "chrome" ) {
	// if browser is 'chrome', return value is 'true'
	return true;
}
return defaultVal;
}
	 */
	ns.isTransitional = function() {
		var result = false;
		var agent = ns.agent();
		var browser = agent.browser.name;

		if (/chrome|firefox/.test(browser)) {
			result = true;
		} else {
			switch (agent.os.name) {
				case "ios" :
					result = /safari|inapp/.test(browser) &&
							parseInt(agent.os.version, 10) < 6;
					break;
				case "window" :
					result = browser.indexOf("safari") !== -1 ||
							(browser.indexOf("ie") !== -1 &&
								parseInt(agent.browser.nativeVersion, 10) >= 10);
					break;
				default :
					result = /chrome|firefox|safari/.test(browser);
					break;
			}
		}
		return resultCache(this, "isTransitional", [result, agent], result);
	};

	// 1. user press one position on screen.
	// 2. user moves to the other position on screen.
	// 3. when user releases fingers on screen, 'click' event is fired at previous position.
	ns._hasClickBug = function() {
		var agent = ns.agent();
		var result = agent.browser.name === "safari";

		return resultCache(this, "_hasClickBug", [result, agent], result);
	};

	/*
	* requestAnimationFrame polyfill
	* @ko requestAnimationFrame 폴리필
	* @method eg#requestAnimationFrame
	* @param {Function} timer function
	* @return {Number} key
	* @example
		var timerId = eg.requestAnimationFrame(function() {
			console.log("call");
		});
	* @see  https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
	*/
	ns.requestAnimationFrame = function(fp) {
		return raf(fp);
	};
	/*
	* cancelAnimationFrame polyfill
	* @ko cancelAnimationFrame 폴리필
	* @method eg#cancelAnimationFrame
	* @param {Number} key
	* @example
		eg.cancelAnimationFrame(timerId);
	* @see  https://developer.mozilla.org/en-US/docs/Web/API/Window/cancelAnimationFrame
	*/
	ns.cancelAnimationFrame = function(key) {
		caf(key);
	};

	$.extend($.easing, {
		easeOutCubic: function(p) {
			return 1 - Math.pow(1 - p, 3);
		}
	});
});
/**
* Copyright (c) 2015 NAVER Corp.
* egjs projects are licensed under the MIT license
*/

eg.module("class", [eg], function(ns) {
/**
	 *
	 * The Class object is used to implement object-oriented style programming
	 * @group egjs
	 * @ko Class는 어플리케이션을 객체지향 프로그래밍 방식으로 구현하는데 사용합니다.
	 * @class
	 * @name eg.Class
	 *
	 * @support {"ie": "7+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "ios" : "7+", "an" : "2.1+ (except 3.x)"}
	 * @param {Object} def Class definition of object literal type. <ko>리터럴 형태의 클래스 정의부</ko>
	 * @example
	 	var Some = eg.Class({
	 		//Class initialize
			"construct" : function(val){
				this.val = val;
			},
			"sumVal" : function(val) {
				return this.val + val;
			}
	 	});

	 	var some = new Some(5);
	 	some.sumVal(5);//10
	 */
	ns.Class = function(def) {
		var typeClass = function typeClass() {
			if (typeof def.construct === "function") {
				def.construct.apply(this, arguments);
			}
		};

		typeClass.prototype = def;

		/**
		 * Retrun instance itself.
		 * @ko 자신의 인스턴스를 반환한다.
		 * @method eg.Class#instance
		 * @return {eg.Class} instance of itself<ko>자신의 인스턴스</ko>
		 */
		typeClass.prototype.instance = function() {
			return this;
		};

		typeClass.prototype.constructor = typeClass;
		return typeClass;
	};
	/**
	 * Extends class
	 * @ko extend는 Class를 상속할 때 사용합니다.
	 * @static
	 * @method eg.Class.extend
	 * @param {eg.Class} oSuperClass Super class. <ko>상속하려는 클래스</ko>
	 * @param {Object} def Class definition of object literal type. <ko>리터럴 형태의 클래스 정의부</ko>
	 * @return {eg.Class} instance of new eg.Class <ko>새로 생성된 eg.Class 인스턴스</ko>
	 * @example
	 	var Some = eg.Class.extend(eg.Component,{
			"some" : function(){}
	 	})
	 */

	ns.Class.extend = function(superClass, def) {
		var extendClass = function extendClass() {
			// Call a parent constructor
			superClass.apply(this, arguments);

			// Call a child constructor
			if (typeof def.construct === "function") {
				def.construct.apply(this, arguments);
			}
		};

		var ExtProto = function() {};
		ExtProto.prototype = superClass.prototype;

		//extendClass.$super = oSuperClass.prototype; //'super' is supported not yet.

		var extProto = new ExtProto();
		for (var i in def) {
			extProto[i] = def[i];
		}
		extProto.constructor = extendClass;
		extendClass.prototype = extProto;

		return extendClass;
	};
});
/**
* Copyright (c) 2015 NAVER Corp.
* egjs projects are licensed under the MIT license
*/

eg.module("component", [eg], function(ns) {
/**
	 * Component
	 * @class
	 * @group egjs
	 * @name eg.Component
	 *
	 * @support {"ie": "7+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "ios" : "7+", "an" : "2.1+ (except 3.x)"}
	 */
	ns.Component = ns.Class({
		construct: function() {
			// The reference count does not support yet.
			// this.constructor.$count = (this.constructor.$count || 0) + 1;
			this.eventHandler = {};
			this.options = {};
		},
		/**
		 * Get or set option.
		 * @ko 옵션을 관리한다.
		 * @method eg.Component#option
		 * @param {String} key
		 * @param {Object} value
		 * @return {eg.Component|Object} (set)instance of itself or (get)option value <ko>(set)자신의 인스턴스 혹은 (get)option 값</ko>
		 * @example
			var Some = eg.Class.extend(eg.Component);
			var some = new Some({
				"foo": 1,
				"bar": 2,
			});
			some.option("foo"); // return 1
			some.option("foo",3); // return some instance
			some.option(); // return options object.
			some.option({
				"foo" : 10,
				"bar" : 20,
				"baz" : 30
			}); // return some instance.
		 */
		option: function(key, value) {
			if (arguments.length >= 2) {
				this.options[key] = value;
				return this;
			}

			if (typeof key === "string") {
				return this.options[key];
			}

			if (arguments.length === 0) {
				return this.options;
			}

			for (var i in key) {
				this.options[i] = key[i];
			}

			return this;
		},
		/**
		 * Trigger custom event.
		 * @ko 커스텀 이벤트를 실행합니다.
		 * @method eg.Component#trigger
		 * @param {String} eventName
		 * @param {Object} customEvent
		 * @return {Boolean}
		 * @example
			var Some = eg.Class.extend(eg.Component,{
				"some": function(){
					this.trigger("hi");// fire hi event.
				}
			});
		 */
		trigger: function(eventName, customEvent) {
			customEvent = customEvent || {};
			var handlerList = this.eventHandler[eventName] || [];
			var hasHandlerList = handlerList.length > 0;

			if (!hasHandlerList) {
				return true;
			}

			// If detach method call in handler in first time then handeler list calls.
			handlerList = handlerList.concat();

			customEvent.eventType = eventName;

			var isCanceled = false;
			var arg = [customEvent];
			var i;
			var len;
			var handler;

			customEvent.stop = function() {
				isCanceled = true;
			};

			if ((len = arguments.length) > 2) {
				arg = arg.concat(Array.prototype.slice.call(arguments, 2, len));
			}

			for (i = 0; handler = handlerList[i]; i++) {
				handler.apply(this, arg);
			}

			return !isCanceled;
		},
		/**
		 * Check whether the event has been registered in component.
		 * @ko 컴포넌트에 등록된 이벤트를 확인합니다.
		 * @method eg.Component#hasOn
		 * @param {String} eventName
		 * @return {Boolean}
		 * @example
			var Some = eg.Class.extend(eg.Component,{
				"some": function(){
					this.hasOn("hi");// check hi event.
				}
			});
		 */
		hasOn: function(eventName) {
			return !!this.eventHandler[eventName];
		},
		/**
		 * Attach an event handler function.
		 * @ko 이벤트를 등록합니다.
		 * @method eg.Component#on
		 * @param {eventName} eventName
		 * @param {Function} handlerToAttach
		 * @return {eg.Component} instance of itself<ko>자신의 인스턴스</ko>
		 * @example
			var Some = eg.Class.extend(eg.Component,{
				"hi": function(){},
				"some": function(){
					this.on("hi",this.hi); //attach event
				}
			});
		 */
		on: function(eventName, handlerToAttach) {
			if (typeof eventName === "object" &&
			typeof handlerToAttach === "undefined") {
				var eventHash = eventName;
				var i;
				for (i in eventHash) {
					this.on(i, eventHash[i]);
				}
				return this;
			} else if (typeof eventName === "string" &&
				typeof handlerToAttach === "function") {
				var handlerList = this.eventHandler[eventName];

				if (typeof handlerList === "undefined") {
					handlerList = this.eventHandler[eventName] = [];
				}

				handlerList.push(handlerToAttach);
			}

			return this;
		},
		/**
		 * Detach an event handler function.
		 * @ko 이벤트를 해제합니다.
		 * @method eg.Component#off
		 * @param {eventName} eventName
		 * @param {Function} handlerToDetach
		 * @return {eg.Component} instance of itself<ko>자신의 인스턴스</ko>
		 * @example
			var Some = eg.Class.extend(eg.Component,{
				"hi": function(){},
				"some": function(){
					this.off("hi",this.hi); //detach event
				}
			});
		 */
		off: function(eventName, handlerToDetach) {
			// All event detach.
			if (arguments.length === 0) {
				this.eventHandler = {};
				return this;
			}

			// All handler of specific event detach.
			if (typeof handlerToDetach === "undefined") {
				if (typeof eventName === "string") {
					this.eventHandler[eventName] = undefined;
					return this;
				} else {
					var eventHash = eventName;
					for (var i in eventHash) {
						this.off(i, eventHash[i]);
					}
					return this;
				}
			}

			// The handler of specific event detach.
			var handlerList = this.eventHandler[eventName];
			if (handlerList) {
				var k;
				var handlerFunction;
				for (k = 0, handlerFunction; handlerFunction = handlerList[k]; k++) {
					if (handlerFunction === handlerToDetach) {
						handlerList = handlerList.splice(k, 1);
						break;
					}
				}
			}

			return this;
		}
	});
});


/**
* Copyright (c) 2015 NAVER Corp.
* egjs projects are licensed under the MIT license
*/

// jscs:disable maximumLineLength
eg.module("rotate", ["jQuery", eg, window, document], function($, ns, global, doc) {
// jscs:enable maximumLineLength
	/**
	 * @namespace jQuery
	 * @group jQuery Extension
	 */
	/**
	 * Add rotate event support in jQuery
	 *
	 * @ko jQuery custom rotate 이벤트 지원
	 * @name jQuery#rotate
	 * @event
	 * @param {Event} e event
	 * @param {Boolean} e.isVertical vertical <ko>수직여부</ko>
	 * @support { "ios" : "7+", "an" : "2.1+ (except 3.x)"}
	 * @example
	 * $(window).on("rotate",function(e){
	 *      e.isVertical;
	 * });
	 *
	 */

	var beforeScreenWidth = -1;
	var beforeVertical = null;
	var rotateTimer = null;
	var agent = ns.agent();
	var isMobile = /android|ios/.test(agent.os.name);

	/**
	 * Return event name string for orientationChange according browser support
	 */
	var orientationChange = function() {
		var type;
		/**
		 * Some platform/broswer returns previous widht/height state value. For workaround, give some delays.
		 *
		 * Android bug:
		 * - Andorid 2.3 - Has orientationchange with bug. Needs 500ms delay.
		 *
		 *   Note: Samsung's branded Android 2.3
		 *   When check orientationchange using resize event, could cause browser crash if user binds resize event on window
		 *
		 * - Android 2.2 - orientationchange fires twice(at first time width/height are not updated, but second returns well)
		 * - Lower than 2.2 - use resize event
		 *
		 * InApp bug:
		 * - Set 200ms delay
		 */
		if ((agent.os.name === "android" && agent.os.version === "2.1")) {//|| htInfo.galaxyTab2)
			type = "resize";
		} else {
			type = "onorientationchange" in global ? "orientationchange" : "resize";
		}

		orientationChange = function() {
			return type;
		};
		return type;

	};
	/**
	* When viewport orientation is portrait, return true otherwise false
	*/
	function isVertical() {
		var eventName = orientationChange();
		var screenWidth;
		var degree;
		var vertical;

		if (eventName === "resize") {
			screenWidth = doc.documentElement.clientWidth;

			if (beforeScreenWidth === -1) { //first call isVertical
				vertical = screenWidth < doc.documentElement.clientHeight;
			} else {
				if (screenWidth < beforeScreenWidth) {
					vertical = true;
				} else if (screenWidth === beforeScreenWidth) {
					vertical = beforeVertical;
				} else {
					vertical = false;
				}
			}

			beforeScreenWidth = screenWidth;
		} else {
			degree = global.orientation;
			if (degree === 0 || degree === 180) {
				vertical = true;
			} else if (degree === 90 || degree === -90) {
				vertical = false;
			}
		}
		return vertical;
	}

	/**
	* Trigger rotate event
	*/
	function triggerRotate() {
		var currentVertical = isVertical();
		if (isMobile) {
			if (beforeVertical !== currentVertical) {
				beforeVertical = currentVertical;
				$(global).trigger("rotate");
			}
		}
	}

	/**
	* Trigger event handler
	*/
	function handler(e) {

		var eventName = orientationChange();
		var delay;
		var screenWidth;

		if (eventName === "resize") {
			global.setTimeout(function() {
				triggerRotate();
			}, 0);
		} else {
			delay = 300;
			if (agent.os.name === "android") {
				screenWidth = doc.documentElement.clientWidth;
				if (e.type === "orientationchange" && screenWidth === beforeScreenWidth) {
					global.setTimeout(function() {
						handler(e);
					}, 500);

					// When width value wasn't changed after firing orientationchange, then call handler again after 300ms.
					return false;
				}
				beforeScreenWidth = screenWidth;
			}

			global.clearTimeout(rotateTimer);
			rotateTimer = global.setTimeout(function() {
				triggerRotate();
			}, delay);
		}
	}

	$.event.special.rotate = {
		setup: function() {
			beforeVertical = isVertical();
			beforeScreenWidth = doc.documentElement.clientWidth;
			$(global).on(orientationChange(), handler);
		},
		teardown: function() {
			$(global).off(orientationChange(), handler);
		},
		trigger: function(e) {
			e.isVertical = beforeVertical;
		}
	};

	/**
	 * Check if device is in portrait mode
	 * @ko 해당 기기가 portait(수직방향) 모드일 경우, true을 반환한다.
	 * @method eg#isPortrait
	 * @return {Boolean}
	 * @example
eg.isPortrait();  // Check if device is in portrait mode
	*/
	ns.isPortrait = isVertical;

	return {
		"orientationChange": orientationChange,
		"isVertical": isVertical,
		"triggerRotate": triggerRotate,
		"handler": handler
	};
});
/**
* Copyright (c) 2015 NAVER Corp.
* egjs projects are licensed under the MIT license
*/

// jscs:disable maximumLineLength
eg.module("scrollEnd", ["jQuery", eg, window], function($, ns, global) {
// jscs:eable maximumLineLength
	/**
	* Add scrollEnd event support in jQuery
	* @ko jQuery custom scrollEnd 이벤트 지원
	* @name jQuery#scrollEnd
	* @event
	* @param {Number} e.top top position <ko>상단(top) 위치 값</ko>
	* @param {Number} e.left left position <ko>왼쪽(left) 위치 값</ko>
	* @support {"ie": "9+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "ios" : "7+", "an" : "2.1+ (except 3.x)"}
	* @example
	* $(window).on("scrollend",function(e){
	*      e.top;
	*      e.left;
	* });
	*
	*/

	var scrollEndTimer;
	var rotateFlag = false;

	var CHROME = 3;
	var TIMERBASE = 2;
	var TOUCHBASE = 1;
	var SCROLLBASE = 0;

	var latency = 250;

	var deviceType = getDeviceType();

	$.event.special.scrollend = {
		setup: function() {
			attachEvent();
		},
		teardown: function() {
			removeEvent();
		}
	};

	/**
	 * iOS & Safari:
	 * 		iOS7 and lower, scroll event occurs once when the scroll is stopped
	 * 		iOS8 and upper, scroll event occurs on every scroll
	 * 		Scroll event occurs when the rotation
	 * Android:
	 *		Scroll event occurs on every scroll
	 *		Scroll event occurs on rotation and should be ignored to handle
	 * @ko
	 * iOS & Safari :
	 *		iOS 7.x 이하에서는 스크롤이 멈췄을때 scroll 이벤트 한번 발생
	 *      iOS 8.x 이상에서는 scroll 이벤트가 android 와 동일하게 스크롤시 매번 발생
	 *		회전시 scroll 이벤트가 발생되어 이를 무시처리해야함
	 *		(orientationchange 에 의해 발생하는 scroll 이벤트 1회만 무시)
	 * Android :
	 *		스크롤시 scroll 이벤트 매번 발생
	 *		회전시 scroll 이벤트가 발생되어 이를 무시 처리해야 함
	 */
	function getDeviceType() {
		var retValue = TIMERBASE;
		var agent = ns.agent();
		var osInfo = agent.os;
		var osVersion = parseInt(osInfo.version, 10);
		var browserInfo = agent.browser;

		// Browsers that trigger scroll event like scrollstop : SCROLLBASE
		if (osInfo.name === "ios") {

			// webview : TIMERBASE
			if (browserInfo.webview === true) {
				retValue = TIMERBASE;
			} else if (osVersion <= 7) {
				retValue = SCROLLBASE;
			}
		} else if (osInfo.name === "android") {
			if (browserInfo.name === "default" && osVersion <= 2.3) {
				retValue = SCROLLBASE;
			}
		}
		return retValue;
	}

	function attachEvent() {
		$(global).on("scroll", scroll);
		$(global).on("orientationchange", onOrientationchange);
	}

	function onOrientationchange() {
		rotateFlag = true;
	}

	function scroll() {
		if (rotateFlag) {
			rotateFlag = false;
			return;
		}

		switch (deviceType) {
			case SCROLLBASE :
				triggerScrollEnd();
				break;
			case TIMERBASE :
				triggerScrollEndAlways();
				break;
		}

	}

	function triggerScrollEnd() {
		$(global).trigger("scrollend", {
			top: global.pageYOffset,
			left: global.pageXOffset
		});
	}

	function triggerScrollEndAlways() {
		clearTimeout(scrollEndTimer);
		scrollEndTimer = setTimeout(function() {
			if (rotateFlag) {
				rotateFlag = false;
				return;
			}
			triggerScrollEnd();
		}, latency);
	}

	function removeEvent() {
		$(global).off("scroll", scroll);
		$(global).off("orientationchange", onOrientationchange);
	}

	return {
		getDeviceType: getDeviceType,
		CHROME: CHROME,
		TIMERBASE: TIMERBASE,
		TOUCHBASE: TOUCHBASE,
		SCROLLBASE: SCROLLBASE
	};
});
/**
* Copyright (c) 2015 NAVER Corp.
* egjs projects are licensed under the MIT license
*/

eg.module("animate", ["jQuery", window], function($, global) {
/**
     * Extends jQuery animate in order to use 'transform' property
     * @ko jQuery animate 사용시 transform을 사용할 수 있도록 확장한 animate 메소드
     * @name jQuery#animate
     * @method
     * @param {Object} properties An object of CSS properties and values that the animation will move toward. <ko>애니메이션 할 CSS 속성과 값으로 구성된 오브젝트</ko>
     * @param {Number|String} [duration=4000] A string or number determining how long the animation will run. <ko>애니메이션 진행 시간</ko>
     * @param {String} [easing="swing"] A string indicating which easing function to use for the transition. <ko>transition에 사용할 easing 함수명</ko>
     * @param {Function} [complete] A function to call once the animation is complete. <ko>애니메이션이 완료한 후 호출하는 함수</ko>
     *
     * @example
     * $("#box")
     * 		.animate({"transform" : "translate3d(150px, 100px, 0px) rotate(20deg) scaleX(1)"} , 3000)
     * 		.animate({"transform" : "+=translate3d(150px, 10%, -20px) rotate(20deg) scale3d(2, 4.2, 1)"} , 3000);
     * @see {@link http://api.jquery.com/animate/}
     *
     * @support {"ie": "10+", "ch" : "latest", "sf" : "latest", "ios" : "7+", "an" : "2.3+ (except 3.x)"}
     */
	var supportFloat32Array = "Float32Array" in window;
	var CSSMatrix = global.WebKitCSSMatrix || global.MSCSSMatrix ||
					global.OCSSMatrix || global.MozMatrix || global.CSSMatrix;

	/**
	 * Utility functions : matrix and toRadian is copied from transform2d
	 * turns a transform string into its "matrix(A, B, C, D, X, Y)" form (as an array, though)
	 */
	function matrix(transform) {
		transform = transform.split(")");
		var trim = $.trim;
		var i = -1;

		// last element of the array is an empty string, get rid of it
		var l = transform.length - 1;
		var split;
		var prop;
		var val;
		var prev = supportFloat32Array ? new Float32Array(6) : [];
		var curr = supportFloat32Array ? new Float32Array(6) : [];
		var rslt = supportFloat32Array ? new Float32Array(6) : [1, 0, 0, 1, 0, 0];

		prev[0] = prev[3] = rslt[0] = rslt[3] = 1;
		prev[1] = prev[2] = prev[4] = prev[5] = 0;

		// Loop through the transform properties, parse and multiply them
		while (++i < l) {
			split = transform[i].split("(");
			prop = trim(split[0]);
			val = split[1];
			curr[0] = curr[3] = 1;
			curr[1] = curr[2] = curr[4] = curr[5] = 0;

			switch (prop) {
				case "translateX":
					curr[4] = parseInt(val, 10);
					break;

				case "translateY":
					curr[5] = parseInt(val, 10);
					break;

				case "translate":
					val = val.split(",");
					curr[4] = parseInt(val[0], 10);
					curr[5] = parseInt(val[1] || 0, 10);
					break;

				case "rotate":
					val = toRadian(val);
					curr[0] = Math.cos(val);
					curr[1] = Math.sin(val);
					curr[2] = -Math.sin(val);
					curr[3] = Math.cos(val);
					break;

				case "scaleX":
					curr[0] = +val;
					break;

				case "scaleY":
					curr[3] = val;
					break;

				case "scale":
					val = val.split(",");
					curr[0] = val[0];
					curr[3] = val.length > 1 ? val[1] : val[0];
					break;

				case "skewX":
					curr[2] = Math.tan(toRadian(val));
					break;

				case "skewY":
					curr[1] = Math.tan(toRadian(val));
					break;

				case "matrix":
					val = val.split(",");
					curr[0] = val[0];
					curr[1] = val[1];
					curr[2] = val[2];
					curr[3] = val[3];
					curr[4] = parseInt(val[4], 10);
					curr[5] = parseInt(val[5], 10);
					break;
			}

			// Matrix product (array in column-major order)
			rslt[0] = prev[0] * curr[0] + prev[2] * curr[1];
			rslt[1] = prev[1] * curr[0] + prev[3] * curr[1];
			rslt[2] = prev[0] * curr[2] + prev[2] * curr[3];
			rslt[3] = prev[1] * curr[2] + prev[3] * curr[3];
			rslt[4] = prev[0] * curr[4] + prev[2] * curr[5] + prev[4];
			rslt[5] = prev[1] * curr[4] + prev[3] * curr[5] + prev[5];

			prev = [rslt[0],rslt[1],rslt[2],rslt[3],rslt[4],rslt[5]];
		}
		return rslt;
	}

	// converts an angle string in any unit to a radian Float
	function toRadian(value) {
		return ~value.indexOf("deg") ?
			parseInt(value, 10) * (Math.PI * 2 / 360) :
			~value.indexOf("grad") ?
				parseInt(value, 10) * (Math.PI / 200) :
				parseFloat(value);
	}

	/**
	 * Get a 'px' converted value if it has a %.
	 * Otherwise it returns value appened with 'px'.
	 */
	function getConverted(val, base) {
		var ret = val;
		var num = val.match(/([0-9]*)%/);

		if (num && num.length >= 1) {
			ret = base * (parseFloat(num[1]) / 100) + "px";
		} else if (val.indexOf("px") === -1) {
			ret = val + "px";
		}

		return ret;
	}

	function correctUnit(transform, width, height) {
		var m;
		var ret = "";
		var arr = transform.split(")");

		for (var i = 0, len = arr.length - 1; i < len; i++) {
			var name = arr[i];

			// '%' is only meaningful on translate.
			if ((m = name.match(/(translate([XYZ]|3d)?|rotate)\(([^)]*)/)) && m.length > 1) {
				if (m[1] === "rotate") {
					if (m[3].indexOf("deg") === -1) {
						name = m[1] + "(" + m[3] + "deg";
					}
				} else {
					switch (m[2]) {
					case "X":
						name = m[1] + "(" + getConverted(m[3], width);
						break;
					case "Y":
						name = m[1] + "(" +  getConverted(m[3], height);
						break;
					case "Z":

						//Meaningless. Do nothing
						break;
					default://2d, 3d
						var nums = m[3].split(",");
						var bases = [width, height, 100];

						for (var k = 0, l = nums.length; k < l; k++) {
							nums[k] = getConverted(nums[k], bases[k]);
						}
						name = m[1] + "(" + nums.join(",");
						break;
					}
				}
			}

			name = " " + name + ")";
			ret += name;
		}

		//Remove wrong '%'s and '+=' because it cannot be translated to a matrix.
		ret = ret.replace("%", "").replace("+=", "");
		return ret;
	}

	/**
	 * Parse a transform atom value.
	 *
	 * "30px" --> {num: 30, unit: "px"}
	 *
	 * Because calculation of string number is heavy,
	 * In advance, convert a string number to a float number with an unit for the use of transformByPos,
	 * which is called very frequently.
	 */
	function toParsedFloat(val) {
		var m = val.match(/(-*[\d|\.]+)(px|deg|rad)*/);
		if (m && m.length >= 1) {
			return {"num": parseFloat(m[1]), "unit": m[2]};
		}
	}

	function getTransformGenerateFunction(transform) {
		var splitted = transform.split(")");
		var list = [];

		for (var i = 0, len = splitted.length - 1; i < len; i++) {
			var parsed = parseStyle(splitted[i]);

			parsed[1] = $.map(parsed[1], toParsedFloat);
			list.push(parsed);
		}

		return function transformByPos(pos) {
			var transform = "";
			var defaultVal = 0;

			$.each(list, function(i) {
				if (list[i][0] === "scale") {
					defaultVal = 1;
				}

				var valStr = $.map(list[i][1], function(value) {
					var val = value.num;
					defaultVal === 1 && (val = val - 1);
					return (defaultVal + val * pos) + (value.unit || "");
				}).join(",");

				transform += list[i][0] + "(" + valStr + ") ";
			});

			return transform;
		};
	}

	function rateFn(element, startTf, endTf) {
		var isRelative = endTf.indexOf("+=") >= 0;
		var start;
		var end;

		// Convert translate unit to 'px'.
		endTf = correctUnit(endTf,
					parseFloat($.css(element, "width")) || 0,
					parseFloat($.css(element, "height")) || 0);

		if (isRelative) {
			start = (!startTf || startTf === "none") ?
						"matrix(1, 0, 0, 1, 0, 0)" : startTf;
			end = getTransformGenerateFunction(endTf);
		} else {
			start = toMatrix(startTf);
			end = toMatrix(endTf);

			//If the type of matrix is not equal, then match to matrix3d
			if (start[1].length < end[1].length) {
				start = toMatrix3d(start);
			} else if (start[1].length > end[1].length) {
				end = toMatrix3d(end);
			}
		}

		return function(pos) {
			var result = [];
			var ret = "";

			if (isRelative) {
				// This means a muliply between a matrix and a transform.
				ret = start + end(pos);
				return ret;
			}

			if (pos === 1) {
				ret = data2String(end);
			} else {
				for (var i = 0, s, e, l = start[1].length; i < l; i++) {
					s = parseFloat(start[1][i]);
					e = parseFloat(end[1][i]);
					result.push(s + (e - s) * pos);
				}

				ret = data2String([start[0], result]);
			}

			return ret;
		};
	}

	/**
	 * ["translate", [100, 0]] --> translate(100px, 0)
	 * {translate : [100, 0]} --> translate(100px, 0)
	 * {matrix : [1, 0, 1, 0, 100, 0]} --> matrix(1, 0, 1, 0, 100, 0)
	 */
	function data2String(property) {
		var name;
		var tmp = [];

		if ($.isArray(property)) {
			name = property[0];
			return name + "(" + property[1].join(unit(name) + ",") + unit(name) + ")";
		} else {
			for (name in property) {
				tmp.push(name);
			}

			return $.map(tmp, function(v) {
				return v + "(" +  property[v] + unit(v) + ")";
			}).join(" ");
		}
	}

	function unit(name) {
		return name.indexOf("translate") >= 0 ?
				"px" : name.indexOf("rotate") >= 0 ? "deg" : "";
	}

	// ["translate" , ["10", "20"]]
	function parseStyle(property) {
		var m = property.match(/(\b\w+?)\((\s*[^\)]+)/);
		var name;
		var value;
		var result = ["",""];

		if (m && m.length > 2) {
			name = m[1];
			value = m[2].split(",");
			value = $.map(value, function(v) {
				return $.trim(v);
			});
			result = [ $.trim(name), value ];
		}
		return result;
	}

	function toMatrix(transform) {
		var retMatrix = [];

		if (!transform || transform === "none") {
			return ["matrix", [ "1", "0", "0", "1", "0", "0"] ];
		}

		retMatrix = CSSMatrix ? parseStyle(new CSSMatrix(transform).toString()) :
								["matrix", matrix(transform)];

		/**
		 * Make an unintended 2d matrix to 3d matrix.
		 *
		 * WebkitCSSMatrix changes 'transform3d' style to '2d matix' if it is judged as needless.
		 * But generally, Developers would intend 3d transform by force for a HW Accelation. eg. translate3d(a, b, 0)
		 */
		if (transform.indexOf("3d") >= 0 && retMatrix[0].indexOf("3d") < 0) {
			retMatrix = toMatrix3d(retMatrix);
		}

		return retMatrix;
	}

	function toMatrix3d(matrix) {
		var name = matrix[0];
		var val = matrix[1];

		if (name === "matrix3d") {
			return matrix;
		}

		// matrix(a, b, c, d, tx, ty) is a shorthand for matrix3d(a, b, 0, 0, c, d, 0, 0, 0, 0, 1, 0, tx, ty, 0, 1)
		return [
			name + "3d", [val[0], val[1], "0", "0",
						val[2], val[3], "0", "0",
						"0", "0", "1", "0",
						val[4], val[5], "0", "1"]
		];
	}

	$.fx.step.transform = function(fx) {
		fx.rateFn = fx.rateFn || rateFn(fx.elem, fx.start, fx.end);
		$.style(fx.elem, "transform", fx.rateFn(fx.pos));
	};

	// All of this interfaces are functions for unit testing.
	return {
		toMatrix: toMatrix,
		toMatrix3d: toMatrix3d
	};
});

/**
* Copyright (c) 2015 NAVER Corp.
* egjs projects are licensed under the MIT license
*/

eg.module("css", ["jQuery", document], function($, doc) {
/**
	 * Apply css prefix cssHooks
	 * @ko css prefix cssHooks 적용
	 *
	 * @name jQuery#css
	 * @method
	 *
	 * * @support {"ie": "10+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "ios" : "7+", "an" : "2.1+ (except 3.x)"}
	 * @example
	 * $("#ID").css("transform", "translate('10px', '10px');
	 * $("#ID").css("Transform", "translate('10px', '10px');
	 * $("#ID").css("webkitTransform", "translate('10px', '10px');
	 * $("#ID").css("transform");
	 * $("#ID").css("webkitTransform");
	 */

	if (!$.cssHooks) {
		throw (new Error("jQuery 1.4.3+ is needed for this plugin to work"));
	}

	// run in jQuery 1.8.x below
	if ($.fn && $.fn.jquery && $.fn.jquery.replace(/\./, "") >= "18") {
		return;
	}

	var cssPrefixes = [ "Webkit", "Moz", "O", "ms" ];
	var acts = ["transitionProperty", "transitionDuration", "transition",
				"transform", "transitionTimingFunction"];

	var vendorPrefix = (function() {
		var bodyStyle = (doc.head || doc.getElementsByTagName("head")[0]).style;
		for (var i = 0, len = cssPrefixes.length ; i < len ; i++) {
			if (cssPrefixes[i] + "Transition" in bodyStyle) {
				return cssPrefixes[i];
			}
		}
	})();

	// ie7, 8 - transform and transition are not supported
	// ie9 - transition not supported
	if (!vendorPrefix) {
		return;
	}

	// If "ms" using "Ms" property in the get function
	var setCssHooks = function(prop) {
		var upperProp = prop.charAt(0).toUpperCase() + prop.slice(1);
		var vendorProp = vendorPrefix + upperProp;
		var getVendorProp = vendorPrefix === "ms" ? "Ms" + upperProp : vendorProp;

		$.cssHooks[upperProp] =
		$.cssHooks[vendorPrefix.toLowerCase() + upperProp] =
		$.cssHooks[prop] = {
			get: function(elem, computed) {
				return computed ? $.css(elem, getVendorProp) : elem.style[vendorProp];
			},
			set: function(elem, value) {
				elem.style[vendorProp] = value;
			}
		};
	};

	for (var n = 0, actsLen = acts.length; n < actsLen; n++) {
		setCssHooks(acts[n]);
	}

	return {
		vendorPrefix: vendorPrefix,
		setCssHooks: setCssHooks
	};

});
/**
* Copyright (c) 2015 NAVER Corp.
* egjs projects are licensed under the MIT license
*/

// jscs:disable maximumLineLength
eg.module("persist", ["jQuery", eg, window, document], function($, ns, global, doc) {
// jscs:enable maximumLineLength
	var wp = global.performance;
	var history = global.history;
	var location = global.location;
	var userAgent = global.navigator.userAgent;
	var JSON = global.JSON;
	var CONST_PERSIST = "___persist___";
	var GLOBAL_KEY = "KEY" + CONST_PERSIST;
	var $global = $(global);
	var isPersisted = $global.attr(CONST_PERSIST) === true;

	// In case of IE8, TYPE_BACK_FORWARD is undefined.
	var isBackForwardNavigated = (wp && wp.navigation &&
									(wp.navigation.type === (wp.navigation.TYPE_BACK_FORWARD || 2)));
	var isSupportState = "replaceState" in history && "state" in history;

	var storage = (function() {
		if (!isSupportState) {
			if ("sessionStorage" in global) {
				var tmpKey = "__tmp__" + CONST_PERSIST;
				sessionStorage.setItem(tmpKey, CONST_PERSIST);
				return sessionStorage.getItem(tmpKey) === CONST_PERSIST ?
						sessionStorage :
						localStorage;
			} else {
				return global.localStorage;
			}
		}
	})();

	// jscs:disable maximumLineLength
	/* jshint ignore:start */
	if (!isSupportState && !storage ||
		(!JSON && !console.warn(
			"The JSON object is not supported in your browser.\r\n" +
			"For work around use polyfill which can be found at:\r\n" +
			"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON#Polyfill")
		)) {
		return;
	}
	/* jshint ignore:end */

	// jscs:enable maximumLineLength
	function onPageshow(e) {
		isPersisted = isPersisted || (e.originalEvent && e.originalEvent.persisted);
		if (!isPersisted && isBackForwardNavigated) {
			$global.trigger("persist");
		} else {
			reset();
		}
	}

	/*
	 * flush current history state
	 */
	function reset() {
		setState(null);
	}

	/*
	 * Get state value
	 */
	function getState() {
		var stateStr;
		var state = {};
		var isValidStateStr = false;

		if (isSupportState) {
			stateStr = history.state;

			// "null" is not a valid
			isValidStateStr = typeof stateStr === "string" && stateStr !== "null";
		} else {
			stateStr = storage.getItem(location.href + CONST_PERSIST);
			isValidStateStr = stateStr && stateStr.length > 0;
		}

		if (isValidStateStr) {
			try {
				state = JSON.parse(stateStr);

				// like '[ ... ]', '1', '1.234', '"123"' is also not valid
				if (jQuery.type(state) !== "object" || state instanceof Array) {
					throw new Error();
				}
			} catch (e) {
				/* jshint ignore:start */
				console.warn("window.history or session/localStorage has no valid " +
						"format data to be handled in persist.");
				/* jshint ignore:end */
			}
		}

		// Note2 (Android 4.3) return value is null
		return state;
	}

	function getStateByKey(key) {
		var result = getState()[key];

		// some device returns "null" or undefined
		if (result === "null" || typeof result === "undefined") {
			result = null;
		}
		return result;
	}

	/*
	 * Set state value
	 */
	function setState(state) {
		if (isSupportState) {
			try {
				history.replaceState(
					state === null ? null : JSON.stringify(state),
					doc.title,
					location.href
				);
			} catch (e) {
				/* jshint ignore:start */
				console.warn(e.message);
				/* jshint ignore:end */
			}
		} else {
			if (state) {
				storage.setItem(location.href + CONST_PERSIST, JSON.stringify(state));
			} else {
				storage.removeItem(location.href  + CONST_PERSIST);
			}
		}
		state ? $global.attr(CONST_PERSIST, true) : $global.attr(CONST_PERSIST, null);
	}

	function setStateByKey(key, data) {
		var beforeData = getState();
		beforeData[key] = data;
		setState(beforeData);
	}

	/**
	* Save current state
	* @ko 인자로 넘긴 현재 상태정보를 저장한다.
	* @method jQuery.persist
	* @support {"ie": "9+", "ch" : "latest", "ff" : "1.5+",  "sf" : "latest", "ios" : "7+", "an" : "2.2+ (except 3.x)"}
	* @param {Object} state State object to be stored in order to restore UI component's state <ko>UI 컴포넌트의 상태를 복원하기위해 저장하려는 상태 객체</ko>
	* @example
	$("a").on("click",function(e){
		e.preventdefault();
		// save state
		$.persist(state);
	});
	*/
	/**
	* Return current state
	* @ko 인자로 넘긴 현재 상태정보를 반환한다.
	* @method jQuery.persist
	* @return {Object} state Stored state object <ko>복원을 위해 저장되어있는 상태 객체</ko>
	* @example
	$("a").on("click",function(e){
		e.preventdefault();
		// get state
		var state = $.persist();
	});
	*/
	/**
	* Save current state
	* @ko 인자로 넘긴 현재 상태정보를 저장한다.
	* @method jQuery.persist
    * @param {String} key State key to be stored in order to restore UI component's state <ko>UI 컴포넌트의 상태를 복원하기위해 저장하려는 상태 객체의 키</ko>
    * @param {String} state State object to be stored in order to restore UI component's state <ko>UI 컴포넌트의 상태를 복원하기위해 저장하려는 상태 객체</ko>
	* @return {Object} state Stored state object <ko>복원을 위해 저장되어있는 상태 객체</ko>
	* @example
	$("a").on("click",function(e){
		e.preventdefault();
		// save state
		$.persist("KEY",state);
	});
	*/
	/**
	* Return current state
	* @ko 인자로 넘긴 현재 상태정보를 반환한다.
	* @method jQuery.persist
	* @param {String} key State key to be stored in order to restore UI component's state <ko>UI 컴포넌트의 상태를 복원하기위해 저장하려는 상태 객체의 키</ko>
	* @return {Object} state Stored state object <ko>복원을 위해 저장되어있는 상태 객체</ko>
	* @example
	$("a").on("click",function(e){
		e.preventdefault();
		// get state
		var state = $.persist("KEY");
	});
	*/
	$.persist = function(state) {
		var key;
		var data;
		if (typeof state === "string") {
			key = state;
			data = arguments.length === 2 ? arguments[1] : null;
		} else {
			key = GLOBAL_KEY;
			data = arguments.length === 1 ? state : null;
		}
		data && setStateByKey(key, data);
		return getStateByKey(key);
	};

	/**
	* Return persist needs by checking bfCache support
	* @ko Persist 동작 필요여부를 반환한다.
	* @method $.persist.isApplicable
	* @example
	$.persist.isApplicable();
	*/
	$.persist.isNeeded = function() {
		var agentOs = ns.agent(userAgent).os;
		var isNeeded = true;
		if (agentOs.name === "ios" ||
				(agentOs.name === "android" && parseFloat(agentOs.version) < 4.4)) {
			isNeeded = false;
		}
		$.persist.isNeeded = function() {
			return isNeeded;
		};
		return isNeeded;
	};

	// in case of reload
	!isBackForwardNavigated && reset();

	$.event.special.persist = {
		setup: function() {
			$global.on("pageshow", onPageshow);
		},
		teardown: function() {
			$global.off("pageshow", onPageshow);
		},
		trigger: function(e) {

			//If you use 'persist' event, you can get global-key only!
			e.state = getStateByKey(GLOBAL_KEY);
		}
	};
	return {
		"isBackForwardNavigated": isBackForwardNavigated,
		"onPageshow": onPageshow,
		"reset": reset,
		"getState": getState,
		"setState": setState,
		"persist": $.persist,
		"isNeeded": $.persist.isNeeded,
		"GLOBALKEY": GLOBAL_KEY
	};
});
/**
* Copyright (c) 2015 NAVER Corp.
* egjs projects are licensed under the MIT license
*/

eg.module("visible", ["jQuery", eg, document], function($, ns, doc) {
/**
	 * Check element's visible state within viewport, regardless scroll position
	 * @ko scroll 위치와 상관없이 특정 엘리먼트나 viewport 안에 엘리먼트가 보이는지 확인한다.
	 * @class
	 * @name eg.Visible
	 * @extends eg.Component
	 * @group egjs
	 *
	 * @param {HTMLElement|String|jQuery} [element=document] The parent element that to check targets (wrapper is only one.) <ko>확인할 영역의 상위 엘리먼트</ko>
	 * @param {Object} options
	 * @param {String} [options.targetClass="check_visible"] A class name of targets <ko>확인할 엘리먼트가 가진 클래스명</ko>
	 * @param {Number} [options.expandSize=0] expand size of the wrapper.
	 * e.g. If a wrapper size is 100 x 100 and 'expandSize' option is 20, visible range is 120 x 120
	 * <ko> 상위 엘리먼트 기준으로 추가적인 영역을 확인하도록 지정</ko>
	 * @support {"ie": "7+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "ios" : "7+", "an" : "2.1+ (except 3.x)"}
	 *
	 * @codepen {"id":"WbWzqq", "ko":"Visible 기본 예제", "en":"Visible basic example", "collectionId":"Ayrabj", "height" : 403}
	 */
	var EVENTS = {
		"change": "change"
	};
	ns.Visible = ns.Class.extend(ns.Component, {
		_events: function() {
			return EVENTS;
		},
		construct: function(element, options, _prefix) {
			this._prefix = _prefix || "";
			this.options = {
				targetClass: "check_visible",
				expandSize: 0
			};
			$.extend(this.options, options);

			this._wrapper = $(element)[0] || doc;

			// this._wrapper is Element, or may be Window
			if (this._wrapper.nodeType && this._wrapper.nodeType === 1) {
				this._getAreaRect = this._getWrapperRect;
			} else {
				this._getAreaRect = this._getWindowRect;
			}

			this._targets = [];
			this._timer = null;
			this._supportElementsByClassName = (function() {
				var dummy = doc.createElement("div");
				var dummies;
				if (!dummy.getElementsByClassName) {
					return false;
				}
				dummies = dummy.getElementsByClassName("dummy");
				dummy.innerHTML = "<span class='dummy'></span>";
				return dummies.length === 1;
			})();

			this.refresh();
		},
		/**
		 * Update targets
		 * @ko target들을 갱신한다.
		 * @method eg.Visible#refresh
		 * @return {eg.Visible} instance of itself<ko>자신의 인스턴스</ko>
		 *
		 * @remark
		 * If targets was added or removed, must be called to refresh
		 * <ko> 확인 대상이 영역 안에 추가 된 경우, 또는 확인 대상이 영역 안에서 삭제 된 경우, 영역 내의 확인 대상을 이 메소드를 호출하여 갱신해야한다. <ko>
		 */
		refresh: function() {
			if (this._supportElementsByClassName) {
				this._targets = this._wrapper
					.getElementsByClassName(this.options.targetClass);
				this.refresh = function() {
					return this;
				};
			} else {
				this.refresh = function() {
					this._targets = $(this._wrapper)
						.find("." + this.options.targetClass)
						.get();
					return this;
				};
			}
			return this.refresh();
		},
		/**
		 * Checks if the target elements has been changed.
		 * @ko target들이 변경했는지 확인한다.
		 * @method eg.Visible#check
		 * @param {Number} [delay=-1] Delay time in milliseconds <ko>호출 후, 일정 시간이 지난 후에 확인하고자 할때 사용한다.</ko>
		 * @return {eg.Visible} instance of itself<ko>자신의 인스턴스</ko>
		 */
		check: function(delay) {
			if (typeof delay === "undefined") {
				delay = -1;
			}
			clearTimeout(this._timer);
			if (delay < 0) {
				this._check();
			} else {
				this._timer = setTimeout($.proxy(function() {
					this._check();
					this._timer = null;
				}, this), delay);
			}
			return this;
		},
		_getWrapperRect: function() {
			return this._wrapper.getBoundingClientRect();
		},
		_getWindowRect: function() {
			// [IE7] document.documentElement.clientHeight has always value 0 (bug)
			return {
				top: 0,
				left: 0,
				bottom: doc.documentElement.clientHeight ||
							doc.body.clientHeight,
				right: doc.documentElement.clientWidth ||
							doc.body.clientWidth
			};
		},
		_reviseElements: function(target, i) {
			if (this._supportElementsByClassName) {
				this._reviseElements = function() {
					return true;
				};
			} else {
				this._reviseElements = function(target, i) {
					if (!$(target).hasClass(this.options.targetClass)) {
						target.__VISIBLE__ = null;
						this._targets.splice(i, 1);
						return false;
					}
					return true;
				};
			}
			return this._reviseElements(target, i);
		},
		_check: function() {
			var expandSize = parseInt(this.options.expandSize, 10);
			var visibles = [];
			var invisibles = [];
			var area = this._getAreaRect();

			// Error Fix: Cannot set property top of #<ClientRect> which has only a getter
			area = $.extend({}, area);

			area.top -= expandSize;
			area.left -= expandSize;
			area.bottom += expandSize;
			area.right += expandSize;
			for (var i = this._targets.length - 1, target, targetArea, after, before;
					target = this._targets[i] ; i--) {
				targetArea = target.getBoundingClientRect();
				if (targetArea.width === 0 && targetArea.height === 0) {
					continue;
				}
				if (this._reviseElements(target, i)) {
					before = !!target.__VISIBLE__;
					target.__VISIBLE__ = after = !(
						targetArea.bottom < area.top ||
						area.bottom < targetArea.top ||
						targetArea.right < area.left ||
						area.right < targetArea.left
					);
					(before !== after) && (after ? visibles : invisibles).unshift(target);
				}
			}
			/**
			 * Trigger when the target elements are visible or hidden based on the base area.
			 * @ko 기준 영역을 기준으로 보이는 엘리먼트와 사라진 엘리먼트가 변경된 경우 발생하는 이벤트
			 * @name eg.Visible#change
			 * @event
			 * @param {Array} visible The visible elements (the element type is `HTMLElement`) <ko>보여지게 된 엘리먼트들 </ko>
			 * @param {Array} invisible The invisible elements (the element type is `HTMLElement`) <ko>안 보여지게 된 엘리먼트들 </ko>
			 */
			this.trigger(this._prefix + EVENTS.change, {
				visible: visibles,
				invisible: invisibles
			});
		},
		destroy: function() {
			this.off();
			this._targets = [];
			this._wrapper = this._timer = null;
		}
	});
});
/**
 * Visible in jQuery plugin
 *
 * @ko Visible in jQuery plugin
 * @name jQuery#visible:change
 * @event
 * @example
	// create
	$("body").visible();

 	// event
 	$("body").on("visible:change",callback);
 	$("body").off("visible:change",callback);
 	$("body").trigger("visible:change",callback);
 * @see eg.Visble
 */
/**
 * visible:change jQuery event plugin
 *
 * @ko visible:change jQuery 이벤트 plugin
 * @method jQuery.visible
 * @example
	// create
	$("body").visible();

 	// event
 	$("body").on("visible:change",callback);
 	$("body").off("visible:change",callback);
 	$("body").trigger("visible:change",callback);

 	// method
 	$("body").visible("option","circular",true); //Set option
 	$("body").visible("instance"); // Return flicking instance
 	$("body").visible("check",10); // Check to change target elements.
 * @see eg.Visble#event:change
 */

/**
* Copyright (c) 2015 NAVER Corp.
* egjs projects are licensed under the MIT license
*/

// jscs:disable maximumLineLength
eg.module("movableCoord", ["jQuery", eg, window, "Hammer"], function($, ns, global, HM) {
var SUPPORT_TOUCH = "ontouchstart" in global;

	// jscs:enable maximumLineLength
	// It is scheduled to be removed in case of build process.
	// ns.__checkLibrary__( !("Hammer" in window), "You must download Hammerjs. (http://hammerjs.github.io/)\n\ne.g. bower install hammerjs");
	// ns.__checkLibrary__( !("easeOutQuint" in $.easing), "You must download jQuery Easing Plugin(http://gsgd.co.uk/sandbox/jquery/easing/)\n\ne.g. bower install jquery.easing");
	/**
	 * Easily get computed coordinate values according user actions.
	 * @group egjs
	 * @ko MovableCoord는 사용자 행동에 의해, 좌표계를 제어할 수 있다.
	 * @class
	 * @name eg.MovableCoord
	 * @extends eg.Component
	 *
	 * @param {Object} options
	 * @param {Array} options.min The minimum coordinate  <ko>좌표계의 최소값</ko>
	 * @param {Number} [options.min.0=0] The minimum x-coordinate <ko>최소 X좌표</ko>
	 * @param {Number} [options.min.1=0] The minimum y-coordinate <ko>최소 Y좌표</ko>
	 *
	 * @param {Array} options.max The maximum coordinate <ko>좌표계의 최대값</ko>
	 * @param {Number} [options.max.0=100] The maximum x-coordinate <ko>최대 X좌표</ko>
	 * @param {Number} [options.max.1=100] The maximum y-coordinate <ko>최대 Y좌표</ko>
	 *
	 * @param {Array} options.bounce The area can move using animation. <ko>바운스: 애니메이션에 의해 이동할 수 있는 영역 </ko>
	 * @param {Boolean} [options.bounce.0=10] The bounce top range <ko>top 바우스 영역</ko>
	 * @param {Boolean} [options.bounce.1=10] The bounce right range <ko>right 바우스 영역</ko>
	 * @param {Boolean} [options.bounce.2=10] The bounce bottom range <ko>bottom 바우스 영역</ko>
	 * @param {Boolean} [options.bounce.3=10] The bounce left range <ko>left 바우스 영역</ko>
	 *
	 * @param {Array} options.margin The area can move using user's action. <ko>영역별 마진 영역: 사용자의 액션에 의해, 추가로 이동할수 있는 영역</ko>
	 * @param {Boolean} [options.margin.0=0] The margin top range <ko>top 마진 영역</ko>
	 * @param {Boolean} [options.margin.1=0] The margin right range <ko>right 마진 영역</ko>
	 * @param {Boolean} [options.margin.2=0] The margin bottom range <ko>bottom 마진 영역</ko>
	 * @param {Boolean} [options.margin.3=0] The margin left range <ko>left 마진 영역</ko>
	 * @param {Array} options.circular <ko>영역별 순환 여부</ko>
	 * @param {Boolean} [options.circular.0=false] The circular top range <ko>top 순환 영역</ko>
	 * @param {Boolean} [options.circular.1=false] The circular right range <ko>right 순환 영역</ko>
	 * @param {Boolean} [options.circular.2=false] The circular bottom range <ko>bottom 순환 영역</ko>
	 * @param {Boolean} [options.circular.3=false] The circular left range <ko>left 순환 영역</ko>
	 *
	 * @param {Function} [options.easing=easing.easeOutCubic] Function of the Easing (jQuery UI Easing, jQuery Easing Plugin). <ko>Easing 함수</ko>
	 * @param {Number} [options.maximumDuration=Infinity] The maximum duration. <ko>최대 좌표 이동 시간</ko>
	 * @param {Number} [options.deceleration=0.0006] deceleration This value can be altered to change the momentum animation duration. higher numbers make the animation shorter. <ko>감속계수. 높을값이 주어질수록 애니메이션의 동작 시간이 짧아진다.</ko>
	 * @see Hammerjs {@link http://hammerjs.github.io}
	 * @see There is usability issue due to default CSS properties ({@link http://hammerjs.github.io/jsdoc/Hammer.defaults.cssProps.html}) settings from Hammerjs. movableCoord removes that settings to fix.
	 * <ko>Hammerjs의 기본 CSS 속성({@link http://hammerjs.github.io/jsdoc/Hammer.defaults.cssProps.html}) 으로 인해 사용성 이슈가 있다. 따라서, movableCoord는 hammerjs의 기본 CSS 속성을 제거하였다.</ko>
	 *
	 * @codepen {"id":"bdVybg", "ko":"MovableCoord 기본 예제", "en":"MovableCoord basic example", "collectionId":"AKpkGW", "height": 403}
	 *
	 * @see Easing Functions Cheat Sheet {@link http://easings.net/}
	 * @see To use other easing functions, import jQuery easing plugin({@link http://gsgd.co.uk/sandbox/jquery/easing/}) or jQuery UI easing.({@link https://jqueryui.com/easing/})<ko>다른 easing 함수를 사용하고 싶다면, jQuery easing plugin({@link http://gsgd.co.uk/sandbox/jquery/easing/})이나, jQuery UI easing({@link https://jqueryui.com/easing/}) 라이브러리를 삽입해야 한다.</ko>
	 *
	 * @support {"ie": "10+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "ios" : "7+", "an" : "2.3+ (except 3.x)"}
	 */
	var MC = ns.MovableCoord = ns.Class.extend(ns.Component, {
		construct: function(options) {
			this.options = {
				min: [0, 0],
				max: [100, 100],
				bounce: [10, 10, 10, 10],
				margin: [0,0,0,0],
				circular: [false, false, false, false],
				easing: $.easing.easeOutCubic,
				maximumDuration: Infinity,
				deceleration: 0.0006
			};
			this._reviseOptions(options);
			this._status = {
				grabOutside: false,		// check whether user's action started on outside
				curHammer: null,		// current hammer instance
				moveDistance: null,		// a position of the first user's action
				animationParam: null,	// animation information
				prevented: false		//  check whether the animation event was prevented
			};
			this._hammers = {};
			this._pos = this.options.min.concat();
			this._subOptions = {};
			this._raf = null;
			this._animationEnd = $.proxy(this._animationEnd, this);	// for caching
			this._panmove = $.proxy(this._panmove, this);	// for caching
			this._panend = $.proxy(this._panend, this);	// for caching
		},
		/**
		 * Bind element
		 * @ko movableCoord을 사용하기 위한 엘리먼트를 등록한다.
		 * @method eg.MovableCoord#bind
		 * @param {HTMLElement|String|jQuery} element  A target element. <ko>movableCoord을 사용하기 위한 엘리먼트</ko>
		 * @param {Object} options
		 * @param {Number} [options.direction=eg.MovableCoord.DIRECTION_ALL] The controllable directions. <ko>움직일수 있는 방향</ko>
		 * @param {Array} options.scale The moving scale. <ko>이동 배율</ko>
		 * @param {Number} [options.scale.0=1] x-scale <ko>x축 배율</ko>
		 * @param {Number} [options.scale.1=1] y-scale <ko>y축 배율</ko>
		 * @param {Number} [options.thresholdAngle=45] The threshold angle about direction which range is 0~90 <ko>방향에 대한 임계각 (0~90)</ko>
		 * @param {Number} [options.interruptable=true] interruptable This value can be enabled to interrupt cycle of the animation event. <ko>이 값이  true이면, 애니메이션의 이벤트 사이클을 중단할수 있다.</ko>
		 * @param {Array} [options.inputType] inputType you can control input type. a kind of inputs are "touch", "mouse".  default value is ["touch", "mouse"] <ko>입력 타입을 지정할수 있다. 입력타입은 "touch", "mouse" 가 있으며, 배열로 입력할 수 있다. (기본값은 ["touch", "mouse"] 이다)</ko>
		 *
		 * @return {eg.MovableCoord} instance of itself<ko>자신의 인스턴스</ko>
		 */
		bind: function(el, options) {
			var $el = $(el);
			var keyValue = $el.data(MC._KEY);
			var subOptions = {
				direction: MC.DIRECTION_ALL,
				scale: [ 1, 1 ],
				thresholdAngle: 45,
				interruptable: true,
				inputType: [ "touch", "mouse" ]
			};

			$.extend(subOptions, options);

			var inputClass = this._convertInputType(subOptions.inputType);
			if (!inputClass) {
				return this;
			}
			if (keyValue) {
				this._hammers[keyValue].get("pan").set({
					direction: subOptions.direction
				});
			} else {
				keyValue = Math.round(Math.random() * new Date().getTime());
				this._hammers[keyValue] = this._createHammer(
					$el.get(0),
					subOptions,
					inputClass
				);
				$el.data(MC._KEY, keyValue);
			}
			return this;
		},

		_createHammer: function(el, subOptions, inputClass) {
			try {
				// create Hammer
				var hammer = new HM.Manager(el, {
						recognizers: [
							[
								HM.Tap, {

									// for long tap
									time: 30000
								}
							],
							[
								HM.Pan, {
									direction: subOptions.direction,
									threshold: 0
								}, ["tap"]
							]
						],

						// css properties were removed due to usablility issue
						// http://hammerjs.github.io/jsdoc/Hammer.defaults.cssProps.html
						cssProps: {
							userSelect: "none",
							touchSelect: "none",
							touchCallout: "none",
							userDrag: "none"
						},
						inputClass: inputClass
					});
				return hammer.on("hammer.input", $.proxy(function(e) {
					if (e.isFirst) {
						// apply options each
						this._subOptions = subOptions;
						this._status.curHammer = hammer;
						this._panstart(e);
					}
				}, this))
				.on("panstart panmove", this._panmove)
				.on("panend tap", this._panend);
			} catch (e) {}
		},

		_convertInputType: function(inputType) {
			var hasTouch = false;
			var hasMouse = false;
			inputType = inputType || [];
			$.each(inputType, function(i, v) {
				switch (v) {
					case "mouse" : hasMouse = true; break;
					case "touch" : hasTouch = SUPPORT_TOUCH;
				}
			});

			return hasTouch && HM.TouchInput || hasMouse && HM.MouseInput || null;
		},

		/**
		 * Unbind element
		 * @ko movableCoord을 사용하기 위한 엘리먼트를 해제한다.
		 * @method eg.MovableCoord#unbind
		 * @param {HTMLElement|String|jQuery} element The target element.<ko>movableCoord을 사용하기 위한 설정한 엘리먼트</ko>
		 * @return {eg.MovableCoord} instance of itself<ko>자신의 인스턴스</ko>
		 */
		unbind: function(el) {
			var $el = $(el);
			var key = $el.data(MC._KEY);
			if (key) {
				this._hammers[key].destroy();
				delete this._hammers[key];
				$el.data(MC._KEY, null);
			}
			return this;
		},

		_grab: function() {
			if (this._status.animationParam) {
				var pos = this._getCircularPos(this._pos);
				if (pos[0] !== this._pos[0] || pos[1] !== this._pos[1]) {
					this._pos = pos;
					this._triggerChange(this._pos, true);
				}
				this._status.animationParam = null;
				this._raf && ns.cancelAnimationFrame(this._raf);
				this._raf = null;
			}
		},

		_getCircularPos: function(pos, min, max, circular) {
			min = min || this.options.min;
			max = max || this.options.max;
			circular = circular || this.options.circular;

			if (circular[0] && pos[1] < min[1]) { // up
				pos[1] = (pos[1] - min[1]) % (max[1] - min[1] + 1) + max[1];
			}
			if (circular[1] && pos[0] > max[0]) { // right
				pos[0] = (pos[0] - min[0]) % (max[0] - min[0] + 1) + min[0];
			}
			if (circular[2] && pos[1] > max[1]) { // down
				pos[1] = (pos[1] - min[1]) % (max[1] - min[1] + 1) + min[1];
			}
			if (circular[3] && pos[0] < min[0]) { // left
				pos[0] = (pos[0] - min[0]) % (max[0] - min[0] + 1) + max[0];
			}
			pos[0] = +pos[0].toFixed(5), pos[1] = +pos[1].toFixed(5);

			return pos;
		},

		// determine outside
		_isOutside: function(pos, min, max) {
			return pos[0] < min[0] || pos[1] < min[1] ||
				pos[0] > max[0] || pos[1] > max[1];
		},

		// from outside to outside
		_isOutToOut: function(pos, destPos, min, max) {
			return (pos[0] < min[0] || pos[0] > max[0] ||
				pos[1] < min[1] || pos[1] > max[1]) &&
				(destPos[0] < min[0] || destPos[0] > max[0] ||
				destPos[1] < min[1] || destPos[1] > max[1]);
		},

		// panstart event handler
		_panstart: function(e) {
			if (!this._subOptions.interruptable && this._status.prevented) {
				return;
			}
			this._setInterrupt(true);
			var pos = this._pos;
			this._grab();
			/**
			 * When an area was pressed
			 * @ko 스크린에서 사용자가 손을 대었을 때
			 * @name eg.MovableCoord#hold
			 * @event
			 * @param {Object} param
			 * @param {Array} param.pos coordinate <ko>좌표 정보</ko>
			 * @param {Number} param.pos.0 x-coordinate <ko>x 좌표</ko>
			 * @param {Number} param.pos.1 y-coordinate <ko>y 좌표</ko>
			 * @param {Object} param.hammerEvent Hammerjs event. if you use api, this value is null. http://hammerjs.github.io/api/#hammer.input-event <ko>사용자의 액션에 대한 hammerjs 이벤트 정보 (API에 의해 호출될 경우, null 을 반환)</ko>
			 *
			 */
			this.trigger("hold", {
				pos: pos.concat(),
				hammerEvent: e
			});
			this._status.moveDistance = pos.concat();
			this._status.grabOutside = this._isOutside(
				pos,
				this.options.min,
				this.options.max
			);
		},

		// panmove event handler
		_panmove: function(e) {
			if (!this._isInterrupting() || !this._status.moveDistance) {
				return;
			}
			var tv;
			var tn;
			var tx;
			var pos = this._pos;
			var min = this.options.min;
			var max = this.options.max;
			var bounce = this.options.bounce;
			var margin = this.options.margin;
			var direction = this._subOptions.direction;
			var scale = this._subOptions.scale;
			var userDirection = this._getDirection(e.angle);
			var out = [
				margin[0] + bounce[0],
				margin[1] + bounce[1],
				margin[2] + bounce[2],
				margin[3] + bounce[3]
			];
			var prevent  = false;

			// not support offset properties in Hammerjs - start
			var prevInput = this._status.curHammer.session.prevInput;
			if (prevInput) {
				e.offsetX = e.deltaX - prevInput.deltaX;
				e.offsetY = e.deltaY - prevInput.deltaY;
			} else {
				e.offsetX = e.offsetY = 0;
			}

			// not support offset properties in Hammerjs - end
			if (direction === MC.DIRECTION_ALL ||
				(direction & MC.DIRECTION_HORIZONTAL &&
				userDirection & MC.DIRECTION_HORIZONTAL)
			) {
				this._status.moveDistance[0] += (e.offsetX * scale[0]);
				prevent = true;
			}
			if (direction === MC.DIRECTION_ALL ||
				(direction & MC.DIRECTION_VERTICAL &&
				userDirection & MC.DIRECTION_VERTICAL)
			) {
				this._status.moveDistance[1] += (e.offsetY * scale[1]);
				prevent = true;
			}
			if (prevent) {
				e.srcEvent.preventDefault();
				e.srcEvent.stopPropagation();
			}

			e.preventSystemEvent = prevent;
			pos[0] = this._status.moveDistance[0];
			pos[1] = this._status.moveDistance[1];
			pos = this._getCircularPos(pos, min, max);

			// from outside to inside
			if (this._status.grabOutside && !this._isOutside(pos, min, max)) {
				this._status.grabOutside = false;
			}

			// when move pointer is held in outside
			if (this._status.grabOutside) {
				tn = min[0] - out[3], tx = max[0] + out[1], tv = pos[0];
				pos[0] = tv > tx ? tx : (tv < tn ? tn : tv);
				tn = min[1] - out[0], tx = max[1] + out[2], tv = pos[1];
				pos[1] = tv > tx ? tx : (tv < tn ? tn : tv);
			} else {

				// when start pointer is held in inside
				// get a initialization slope value to prevent smooth animation.
				var initSlope = this._initSlope();
				if (pos[1] < min[1]) { // up
					tv = (min[1] - pos[1]) / (out[0] * initSlope);
					pos[1] = min[1] - this._easing(tv) * out[0];
				} else if (pos[1] > max[1]) { // down
					tv = (pos[1] - max[1]) / (out[2] * initSlope);
					pos[1] = max[1] + this._easing(tv) * out[2];
				}
				if (pos[0] < min[0]) { // left
					tv = (min[0] - pos[0]) / (out[3] * initSlope);
					pos[0] = min[0] - this._easing(tv) * out[3];
				} else if (pos[0] > max[0]) { // right
					tv = (pos[0] - max[0]) / (out[1] * initSlope);
					pos[0] = max[0] + this._easing(tv) * out[1];
				}

			}
			this._triggerChange(pos, true, e);
		},

		// panend event handler
		_panend: function(e) {
			var pos = this._pos;

			if (!this._isInterrupting() || !this._status.moveDistance) {
				return;
			}

			// Abort the animating post process when "tap" occurs
			if (e.type === "tap") {
				this._setInterrupt(false);
				this.trigger("release", {
					depaPos: pos.concat(),
					destPos: pos.concat(),
					hammerEvent: e || null
				});
			} else {
				var direction = this._subOptions.direction;
				var scale = this._subOptions.scale;
				var vX =  Math.abs(e.velocityX);
				var vY = Math.abs(e.velocityY);

				// console.log(e.velocityX, e.velocityY, e.deltaX, e.deltaY);
				!(direction & MC.DIRECTION_HORIZONTAL) && (vX = 0);
				!(direction & MC.DIRECTION_VERTICAL) && (vY = 0);

				this._animateBy(
					this._getNextOffsetPos([
						vX * (e.deltaX < 0 ? -1 : 1) * scale[0],
						vY * (e.deltaY < 0 ? -1 : 1) * scale[1]
					]),
				this._animationEnd, false, null, e);
			}
			this._status.moveDistance = null;
		},

		_isInterrupting: function() {
			// when interruptable is 'true', return value is always 'true'.
			return this._subOptions.interruptable || this._status.prevented;
		},

		// get user's direction
		_getDirection: function(angle) {
			var thresholdAngle = this._subOptions.thresholdAngle;
			if (thresholdAngle < 0 || thresholdAngle > 90) {
				return MC.DIRECTION_NONE;
			}
			angle = Math.abs(angle);
			return angle > thresholdAngle && angle < 180 - thresholdAngle ?
					MC.DIRECTION_VERTICAL : MC.DIRECTION_HORIZONTAL;
		},

		_animationEnd: function() {
			/**
			 * When animation was ended.
			 * @ko 에니메이션이 끝났을 때 발생한다.
			 * @name eg.MovableCoord#animationEnd
			 * @event
			 */
			var pos = this._pos;
			var min = this.options.min;
			var max = this.options.max;
			this._animateTo([
				Math.min(max[0], Math.max(min[0], pos[0])),
				Math.min(max[1], Math.max(min[1], pos[1]))
			], $.proxy(this.trigger, this, "animationEnd"), true, null);
		},

		_getNextOffsetPos: function(speeds) {
			var normalSpeed = Math.sqrt(
				speeds[0] * speeds[0] + speeds[1] * speeds[1]
			);
			var duration = Math.abs(normalSpeed / -this.options.deceleration);
			return [
				speeds[0] / 2 * duration,
				speeds[1] / 2 * duration
			];
		},

		_getDurationFromPos: function(pos) {
			var normalPos = Math.sqrt(pos[0] * pos[0] + pos[1] * pos[1]);
			var duration = Math.sqrt(
				normalPos / this.options.deceleration * 2
			);

			// when duration is under 100, then value is zero
			return duration < 100 ? 0 : duration;
		},

		_animateBy: function(offset, callback, isBounce, duration, e) {
			var pos = this._pos;
			return this._animateTo([
				pos[0] + offset[0],
				pos[1] + offset[1]
			], callback, isBounce, duration, e);
		},

		_getPointOfIntersection: function(depaPos, destPos) {
			var circular = this.options.circular;
			var bounce = this.options.bounce;
			var min = this.options.min;
			var max = this.options.max;
			var boxLT = [ min[0] - bounce[3], min[1] - bounce[0] ];
			var boxRB = [ max[0] + bounce[1], max[1] + bounce[2] ];
			var xd;
			var yd;
			destPos = [destPos[0], destPos[1]];
			xd = destPos[0] - depaPos[0], yd = destPos[1] - depaPos[1];
			if (!circular[3]) {
				destPos[0] = Math.max(boxLT[0], destPos[0]);
			} // left
			if (!circular[1]) {
				destPos[0] = Math.min(boxRB[0], destPos[0]);
			} // right
			destPos[1] = xd ?
							depaPos[1] + yd / xd * (destPos[0] - depaPos[0]) :
							destPos[1];

			if (!circular[0]) {
				destPos[1] = Math.max(boxLT[1], destPos[1]);
			} // up
			if (!circular[2]) {
				destPos[1] = Math.min(boxRB[1], destPos[1]);
			} // down
			destPos[0] = yd ?
							depaPos[0] + xd / yd * (destPos[1] - depaPos[1]) :
							destPos[0];
			return destPos;

		},

		_isCircular: function(circular, destPos, min, max) {
			return (circular[0] && destPos[1] < min[1]) ||
					(circular[1] && destPos[0] > max[0]) ||
					(circular[2] && destPos[1] > max[1]) ||
					(circular[3] && destPos[0] < min[0]);
		},

		_animateTo: function(absPos, callback, isBounce, duration, e) {
			var pos = this._pos;
			var destPos = this._getPointOfIntersection(pos, absPos);
			var param = {
					depaPos: pos.concat(),
					destPos: destPos,
					hammerEvent: e || null
				};
			if (!isBounce && e) {	// check whether user's action
				/**
				 * When an area was released
				 * @ko 스크린에서 사용자가 손을 떼었을 때
				 * @name eg.MovableCoord#release
				 * @event
				 *
				 * @param {Object} param
				 * @param {Array} param.depaPos departure coordinate <ko>현재 좌표</ko>
				 * @param {Number} param.depaPos.0 departure x-coordinate <ko>현재 x 좌표</ko>
				 * @param {Number} param.depaPos.1 departure y-coordinate <ko>현재 y 좌표</ko>
				 * @param {Array} param.destPos destination coordinate <ko>애니메이션에 의해 이동할 좌표</ko>
				 * @param {Number} param.destPos.0 destination x-coordinate <ko>x 좌표</ko>
				 * @param {Number} param.destPos.1 destination y-coordinate <ko>y 좌표</ko>
				 * @param {Object} param.hammerEvent Hammerjs event. if you use api, this value is null. http://hammerjs.github.io/api/#hammer.input-event <ko>사용자의 액션에 대한 hammerjs 이벤트 정보 (API에 의해 호출될 경우, null 을 반환)</ko>
				 *
				 */
				this.trigger("release", param);
			}
			this._afterReleaseProcess(param, callback, isBounce, duration);
		},

		// when user release a finger, pointer or mouse
		_afterReleaseProcess: function(param, callback, isBounce, duration) {
			// caution: update option values, due to value was changed by "release" event
			var pos = this._pos;
			var min = this.options.min;
			var max = this.options.max;
			var circular = this.options.circular;
			var isCircular = this._isCircular(
								circular,
								param.destPos,
								min,
								max
							);
			var destPos = this._isOutToOut(pos, param.destPos, min, max) ?
				pos : param.destPos;
			var distance = [
				Math.abs(destPos[0] - pos[0]),
				Math.abs(destPos[1] - pos[1])
			];
			var animationParam;
			duration = duration === null ?
						this._getDurationFromPos(distance) : duration;
			duration = this.options.maximumDuration > duration ?
						duration : this.options.maximumDuration;

			var done = $.proxy(function(isNext) {
					this._status.animationParam = null;
					pos[0] = Math.round(destPos[0]);
					pos[1] = Math.round(destPos[1]);
					pos = this._getCircularPos(pos, min, max, circular);
					!isNext && this._setInterrupt(false);
					callback();
				}, this);

			if (distance[0] === 0 && distance[1] === 0) {
				return done(!isBounce);
			}

			// prepare animation parameters
			animationParam = {
				duration: duration,
				depaPos: pos.concat(),
				destPos: destPos,
				isBounce: isBounce,
				isCircular: isCircular,
				done: done,
				hammerEvent: param.hammerEvent
			};

			/**
			 * When animation was started.
			 * @ko 에니메이션이 시작했을 때 발생한다.
			 * @name eg.MovableCoord#animationStart
			 * @event
			 * @param {Object} param
			 * @param {Number} param.duration
			 * @param {Array} param.depaPos departure coordinate <ko>현재 좌표</ko>
			 * @param {Number} param.depaPos.0 departure x-coordinate <ko>현재 x 좌표</ko>
			 * @param {Number} param.depaPos.1 departure y-coordinate <ko>현재 y 좌표</ko>
			 * @param {Array} param.destPos destination coordinate <ko>애니메이션에 의해 이동할 좌표</ko>
			 * @param {Number} param.destPos.0 destination x-coordinate <ko>x 좌표</ko>
			 * @param {Number} param.destPos.1 destination y-coordinate <ko>y 좌표</ko>
			 * @param {Boolean} param.isBounce When an animation is bounced, a value is 'true'.  <ko>바운스 되는 애니메이션인 경우 true</ko>
			 * @param {Boolean} param.isCircular When the area is circular type, a value is 'true'. <ko>순환하여 움직여야하는 애니메이션인경우 true</ko>
			 * @param {Function} param.done If user control animation, user must call this function. <ko>애니메이션이 끝났다는 것을 알려주는 함수</ko>
			 * @param {Object} param.hammerEvent Hammerjs event. if you use api, this value is null. http://hammerjs.github.io/api/#hammer.input-event <ko>사용자의 액션에 대한 hammerjs 이벤트 정보 (API에 의해 호출될 경우, null 을 반환)</ko>
			 *
			 */
			var retTrigger = this.trigger("animationStart", animationParam);

			// You can't stop the 'animationStart' event when 'circular' is true.
			if (isCircular && !retTrigger) {
				throw new Error(
					"You can't stop the 'animation' event when 'circular' is true."
				);
			}
			animationParam.depaPos = pos;
			animationParam.startTime = new Date().getTime();
			this._status.animationParam = animationParam;
			if (retTrigger) {
				if (animationParam.duration) {
					// console.error("depaPos", pos, "depaPos",destPos, "duration", duration, "ms");
					var info = this._status.animationParam;
					var self = this;
					(function loop() {
						self._raf = null;
						if (self._frame(info) >= 1) {
							return done(true);
						} // animationEnd
						self._raf = ns.requestAnimationFrame(loop);
					})();
				} else {
					this._triggerChange(animationParam.destPos, false);
					done(!isBounce);
				}
			}
		},

		// animation frame (0~1)
		_frame: function(param) {
			var curTime = new Date() - param.startTime;
			var easingPer = this._easing(curTime / param.duration);
			var pos = [ param.depaPos[0], param.depaPos[1] ];

			for (var i = 0; i < 2 ; i++) {
				(pos[i] !== param.destPos[i]) &&
				(pos[i] += (param.destPos[i] - pos[i]) * easingPer);
			}
			pos = this._getCircularPos(pos);
			this._triggerChange(pos, false);
			return easingPer;
		},

		// set up 'css' expression
		_reviseOptions: function(options) {
			var key;
			$.each(["bounce", "margin", "circular"], function(i, v) {
				key = options[v];
				if (key != null) {
					if ($.isArray(key)) {
						options[v] = key.length === 2 ?
							key.concat(key) : key.concat();
					} else if (/string|number|boolean/.test(typeof key)) {
						options[v] = [ key, key, key, key ];
					} else {
						options[v] = null;
					}
				}
			});
			$.extend(this.options, options);
		},

		// trigger 'change' event
		_triggerChange: function(pos, holding, e) {
			/**
			 * When coordinate was changed
			 * @ko 좌표가 변경됐을 때 발생한다.
			 * @name eg.MovableCoord#change
			 * @event
			 *
			 * @param {Object} param
			 * @param {Array} param.pos departure coordinate  <ko>좌표</ko>
			 * @param {Number} param.pos.0 departure x-coordinate <ko>x 좌표</ko>
			 * @param {Number} param.pos.1 departure y-coordinate <ko>y 좌표</ko>
			 * @param {Boolean} param.holding If an area was pressed, this value is 'true'. <ko>스크린을 사용자가 누르고 있을 경우 true </ko>
			 * @param {Object} param.hammerEvent Hammerjs event. if you use api, this value is null. http://hammerjs.github.io/api/#hammer.input-event <ko>사용자의 액션에 대한 hammerjs 이벤트 정보 (API에 의해 호출될 경우, null 을 반환)</ko>
			 *
			 */
			this._pos = pos.concat();
			this.trigger("change", {
				pos: pos.concat(),
				holding: holding,
				hammerEvent: e || null
			});
		},

		/**
		 * Get current position
		 * @ko 현재 위치를 반환한다.
		 * @method eg.MovableCoord#get
		 * @return {Array} pos
		 * @return {Number} pos.0 x position
		 * @return {Number} pos.1 y position
		 */
		get: function() {
			return this._pos.concat();
		},

		/**
		 * Set to absolute position
		 *
		 * When duration is greater than zero, 'change' event is triggered
		 * @ko 위치를 설정한다. 만약, duration이 0보다 크다면 'change' 이벤트가 발생한다.
		 * @method eg.MovableCoord#setTo
		 * @param {Number} x x-coordinate <ko>이동할 x좌표</ko>
		 * @param {Number} y y-coordinate <ko>이동할 y좌표</ko>
		 * @param {Number} [duration=0] Duration of animation in milliseconds. <ko>애니메이션 진행시간(ms)</ko>
		 * @return {eg.MovableCoord} instance of itself<ko>자신의 인스턴스</ko>
		 */
		setTo: function(x, y, duration) {
			this._grab();
			var pos = this._pos.concat();
			var circular = this.options.circular;
			var min = this.options.min;
			var max = this.options.max;
			if (x === pos[0] && y === pos[1]) {
				return this;
			}
			this._setInterrupt(true);
			if (x !== pos[0]) {
				if (!circular[3]) {
					x = Math.max(min[0], x);
				}
				if (!circular[1]) {
					x = Math.min(max[0], x);
				}
			}
			if (y !== pos[1]) {
				if (!circular[0]) {
					y = Math.max(min[1], y);
				}
				if (!circular[2]) {
					y = Math.min(max[1], y);
				}
			}
			if (duration) {
				this._animateTo([ x, y ], this._animationEnd, false, duration);
			} else {
				this._pos = this._getCircularPos([ x, y ]);
				this._triggerChange(this._pos, false);
				this._setInterrupt(false);
			}
			return this;
		},
		/**
		 * Set to relative position
		 *
		 * When duration is greater than zero, 'change' event is triggered
		 * @ko 현재를 기준으로 위치를 설정한다. 만약, duration이 0보다 크다면 'change' 이벤트가 발생한다.
		 * @method eg.MovableCoord#setBy
		 * @param {Number} x x-coordinate <ko>이동할 x좌표</ko>
		 * @param {Number} y y-coordinate <ko>이동할 y좌표</ko>
		 * @param {Number} [duration=0] Duration of animation in milliseconds. <ko>애니메이션 진행시간(ms)</ko>
		 * @return {eg.MovableCoord} instance of itself<ko>자신의 인스턴스</ko>
		 */
		setBy: function(x, y, duration) {
			return this.setTo(
				x != null ? this._pos[0] + x : this._pos[0],
				y != null ? this._pos[1] + y : this._pos[1],
				duration
			);
		},

		_easing: function(p) {
			return p > 1 ? 1 : this.options.easing(p, p, 0, 1, 1);
		},

		_initSlope: function() {
			var easing = this.options.easing;
			var isIn = false;
			var p;
			for (p in $.easing) {
				if ($.easing[p] === easing) {
					isIn = !~p.indexOf("Out");
					break;
				}
			}
			return isIn ?
					easing(0.9999, 0.9999, 0, 1, 1) / 0.9999 :
					easing(0.00001, 0.00001, 0, 1, 1) / 0.00001;
		},

		_setInterrupt: function(prevented) {
			!this._subOptions.interruptable &&
			(this._status.prevented = prevented);
		},

		/**
		 * Release resources and unbind custom events
		 * @ko 모든 커스텀 이벤트와 자원을 해제한다.
		 * @method eg.MovableCoord#destroy
		 */
		destroy: function() {
			this.off();
			for (var p in this._hammers) {
				this._hammers[p].destroy();
				this._hammers[p] = null;
			}
		}
	});
	MC._KEY = "__MOVABLECOORD__";
	/**
	 * @name eg.MovableCoord.DIRECTION_NONE
	 * @constant
	 * @type {Number}
	 */
	MC.DIRECTION_NONE = 1;
	/**
	 * @name eg.MovableCoord.DIRECTION_LEFT
	 * @constant
	 * @type {Number}
	*/
	MC.DIRECTION_LEFT = 2;
	/**
	 * @name eg.MovableCoord.DIRECTION_RIGHT
	 * @constant
	 * @type {Number}
	*/
	MC.DIRECTION_RIGHT = 4;
	/**
	 * @name eg.MovableCoord.DIRECTION_UP
	 * @constant
	 * @type {Number}
	  */
	MC.DIRECTION_UP = 8;
	/**
	 * @name eg.MovableCoord.DIRECTION_DOWN
	 * @constant
	 * @type {Number}
	*/
	MC.DIRECTION_DOWN = 16;
	/**
	 * @name eg.MovableCoord.DIRECTION_HORIZONTAL
	 * @constant
	 * @type {Number}
	*/
	MC.DIRECTION_HORIZONTAL = 2 | 4;
	/**
	 * @name eg.MovableCoord.DIRECTION_VERTICAL
	 * @constant
	 * @type {Number}
	*/
	MC.DIRECTION_VERTICAL = 8 | 16;

	/**
	 * @name eg.MovableCoord.DIRECTION_ALL
	 * @constant
	 * @type {Number}
	*/
	MC.DIRECTION_ALL = MC.DIRECTION_HORIZONTAL | MC.DIRECTION_VERTICAL;

	return {
		"MovableCoord": ns.MovableCoord
	};
});
// jscs:disable validateLineBreaks, maximumLineLength
/**
* Copyright (c) 2015 NAVER Corp.
* egjs projects are licensed under the MIT license
*/
eg.module("flicking", ["jQuery", eg, window, document, eg.MovableCoord], function ($, ns, global, doc, MC) {
// jscs:enable validateLineBreaks, maximumLineLength
	/**
	 * To build flickable UI
	 * @group egjs
	 * @ko 플리킹 UI를 구성한다.
	 * @class
	 * @name eg.Flicking
	 * @extends eg.Component
	 *
	 * @param {HTMLElement|String|jQuery} element wrapper element <ko>기준 요소</ko>
	 * @param {Object} options
	 * @param {Boolean} [options.hwAccelerable=eg.isHWAccelerable()] Force to use HW compositing <ko>하드웨어 가속 사용여부</ko>
	 * @param {String} [options.prefix=eg-flick] Prefix string for flicking elements <ko>요소에 설정될 접두사</ko>
	 * @param {Number} [options.deceleration=0.0006] Deceleration value can be altered to change the momentum animation duration. higher numbers make the animation shorter <ko>감속계수는 가속도를 조절하여 애니메이션 시간을 변경할 수 있다. 높을수록 애니메이션이 짧아진다.</ko>
	 * @param {Boolean} [options.horizontal=true] For move direction (when horizontal is false, then move direction is vertical) <ko>이동방향 설정 (horizontal == true 가로방향, horizontal == false 세로방향)</ko>
	 * @param {Boolean} [options.circular=false] To make panels rotate infinitely  <ko>순환 여부</ko>
	 * @param {Number|Array} [options.previewPadding=[0,0]] Padding value to display previous and next panels. If set array value the order is left(up) to right(down) <ko>이전과 다음 패널을 출력하는 프리뷰 형태에 사용되는 padding 값. 배열 형태로 지정시 좌측(상단), 우측(하단) 순서로 지정</ko>
	 * @param {Number} [options.threshold=40] Threshold pixels to move panels in prev/next direction <ko>다음 패널로 이동되기 위한 임계치 픽셀</ko>
	 * @param {Number} [options.duration=100] Duration time of panel change animation in milliseconds <ko>패널 이동 애니메이션 진행시간(ms) 값</ko>
	 * @param {Function} [options.panelEffect=easeOutCubic] easing function which is used on panel move animation<ko>패널 간의 이동 애니메이션에 사용되는 effect easing 함수</ko>
	 * @param {Number} [options.defaultIndex=0] Default panel index to show in first time <ko>초기에 출력할 패널 인덱스</ko>
	 * @param {Array} [options.inputType] inputType you can control input type. a kind of inputs are "touch", "mouse".  default value is ["touch", "mouse"] <ko>입력 타입을 지정할수 있다. 입력타입은 "touch", "mouse"가 있으며, 배열로 입력할 수 있다. (기본값은 ["touch", "mouse"] 이다)</ko>
	 *
	 * @codepen {"id":"rVOpPK", "ko":"플리킹 기본 예제", "en":"Flicking default example", "collectionId":"ArxyLK", "height" : 403}
	 *
	 * @support {"ie": "10+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "ios" : "7+", "an" : "2.3+ (except 3.x)"}
	 *
	 * @see Easing Functions Cheat Sheet {@link http://easings.net/}
	 * @see If you want to use another easing function then should be import jQuery easing plugin({@link http://gsgd.co.uk/sandbox/jquery/easing/}) or jQuery UI easing.({@link https://jqueryui.com/easing/})<ko>다른 easing 함수를 사용하고 싶다면, jQuery easing plugin({@link http://gsgd.co.uk/sandbox/jquery/easing/})이나, jQuery UI easing({@link https://jqueryui.com/easing/}) 라이브러리를 삽입해야 한다.</ko>
	 * @example
	 	<!-- HTML -->
		<div id="mflick">
			<div>
				<p>Layer 0</p>
			</div>
			<div>
				<p>Layer 1</p>
			</div>
			<div>
				<p>Layer 2</p>
			</div>
		</div>
		<script>
	 	var some = new eg.Flicking("#mflick", {
	 		circular : true,
	 		threshold : 50
	 	}).on({
	 		beforeRestore : function(e) { ... },
	 		flickStart : function(e) { ... }
	 	);
	 	</script>
	 */

	// define custom events name
	var EVENTS = {
		"beforeFlickStart": "beforeFlickStart",
		"beforeRestore": "beforeRestore",
		"flick": "flick",
		"flickEnd": "flickEnd",
		"restore": "restore"
	};

	// check for css transform support
	var SUPPORT_TRANSFORM = doc.documentElement.style;
	SUPPORT_TRANSFORM = "transform" in SUPPORT_TRANSFORM ||
		"webkitTransform" in SUPPORT_TRANSFORM;

	// check for will-change support
	var SUPPORT_WILLCHANGE = global.CSS && global.CSS.supports &&
		global.CSS.supports("will-change", "transform");

	// check for Android 2.x
	var IS_ANDROID2 = ns.agent().os;
	IS_ANDROID2 = IS_ANDROID2.name === "android" && /^2\./.test(IS_ANDROID2.version);

	ns.Flicking = ns.Class.extend(ns.Component, {
		_events: function() {
			return EVENTS;
		},
		/**
		 * Constructor
		 * @param {HTMLElement|String|jQuery} element - base element
		 * @param {Object} options
		 */
		construct: function (element, options, _prefix) {
			this.$wrapper = $(element);

			var $children = this.$wrapper.children();
			if (!$children.length) {
				// jscs:disable validateLineBreaks, maximumLineLength
				throw new Error("Given base element doesn't exist or it hasn't proper DOM structure to be initialized.");

				// jscs:enable validateLineBreaks, maximumLineLength
			}

			$.extend(this.options = {
				hwAccelerable: ns.isHWAccelerable(),  // check weather hw acceleration is available
				prefix: "eg-flick",		// prefix value of class name
				deceleration: 0.0006,		// deceleration value
				horizontal: true,			// move direction (true == horizontal, false == vertical)
				circular: false,			// circular mode. In this mode at least 3 panels are required.
				previewPadding: [0, 0],	// preview padding value in left(up) to right(down) order. In this mode at least 5 panels are required.
				threshold: 40,				// the distance pixel threshold value for change panel
				duration: 100,				// duration ms for animation
				panelEffect: $.easing.easeOutCubic,  // $.easing function for panel change animation
				defaultIndex: 0,			// initial panel index to be shown
				inputType: ["touch", "mouse"]	// input type
			}, options);

			var padding = this.options.previewPadding;

			if (typeof padding === "number") {
				padding = this.options.previewPadding = [ padding, padding ];
			} else if (padding.constructor !== Array) {
				padding = this.options.previewPadding = [ 0, 0 ];
			}

			// config value
			this._conf = {
				panel: {
					$list: $children,	// panel list
					index: 0,			// current physical dom index
					no: 0,				// current logical panel index
					size: 0,			// panel size
					count: 0,			// total physical panel count
					origCount: 0,		// total count of given original panels
					changed: false,		// if panel changed
					animating: false,	// current animating status boolean
					minCount: padding[0] + padding[1] > 0 ? 5 : 3  // minimum panel count
				},
				touch: {
					holdPos: [0, 0],	// hold x,y coordinate
					destPos: [0, 0],	// destination x,y coordinate
					distance: 0,		// touch distance pixel of start to end touch
					direction: null,	// touch direction
					lastPos: 0			// to determine move on holding
				},
				customEvent: {			// for custom events value
					flick: true,
					restore: false,
					restoreCall: false
				},
				useLayerHack: this.options.hwAccelerable && !SUPPORT_WILLCHANGE,
				dirData: [],			// direction constant value according horizontal or vertical
				indexToMove: 0,
				eventPrefix: _prefix || "",

				// For buggy link highlighting on Android 2.x
				$dummyAnchor: null
			};

			$([["LEFT", "RIGHT"], ["UP", "DOWN"]][+!this.options.horizontal]).each(
				$.proxy(function (i, v) {
					this._conf.dirData.push(MC["DIRECTION_" + v]);
				}, this));

			!ns._hasClickBug() && (this._setPointerEvents = $.noop);

			this._build();
			this._bindEvents();

			this._applyPanelsCss();
			this._arrangePanels();

			this.options.hwAccelerable && SUPPORT_WILLCHANGE && this._setHint();
			this._adjustContainerCss("end");
		},

		/**
		 * Build and set panel nodes to make flicking structure
		 */
		_build: function () {
			var panel = this._conf.panel;
			var options = this.options;
			var $children = panel.$list;
			var padding = options.previewPadding.concat();
			var prefix = options.prefix;
			var horizontal = options.horizontal;
			var panelCount = panel.count = panel.origCount = $children.length;
			var cssValue;

			this._setPadding(padding, true);
			var sizeValue = this._getDataByDirection([ panel.size, "100%" ]);

			// panels' css values
			$children.addClass(prefix + "-panel").css({
				position: "absolute",
				width: sizeValue[0],
				height: sizeValue[1],
				top: 0,
				left: 0
			});

			// create container element
			cssValue = "position:relative;z-index:2000;width:100%;height:100%;" +
				(!horizontal ? "top:" + padding[0] + "px;" : "");

			this.$container = $children.wrapAll(
				"<div class='" + prefix + "-container' style='" + cssValue + "' />"
			).parent();

			if (this._addClonePanels()) {
				panelCount = panel.count = (
					panel.$list = this.$container.children()
				).length;
			}

			// create MovableCoord instance
			this._mcInst = new MC({
				min: [0, 0],
				max: this._getDataByDirection([panel.size * (panelCount - 1), 0]),
				margin: 0,
				circular: false,
				easing: options.panelEffect,
				deceleration: options.deceleration
			}).bind(this.$wrapper, {
				scale: this._getDataByDirection([-1, 0]),
				direction: MC["DIRECTION_" +
					(horizontal ? "HORIZONTAL" : "VERTICAL")],
				interruptable: false,
				inputType: options.inputType
			});

			this._setDefaultPanel(options.defaultIndex);
		},

		/**
		 * Set preview padding value
		 * @param {Array} padding
		 * @param {Boolean} build
		 */
		_setPadding: function(padding, build) {
			var horizontal = this.options.horizontal;
			var panel = this._conf.panel;

			panel.size = this.$wrapper[
				horizontal ? "outerWidth" : "height"
			]() - (padding[0] + padding[1]);

			var cssValue = {
				padding: (horizontal ?
				"0 " + padding.reverse().join("px 0 ") :
				padding.join("px 0 ")) + "px"
			};

			if (build) {
				cssValue.overflow = "hidden";
			} else if (!horizontal) {
				this.$container.css("top", padding[0]);
			}

			this.$wrapper.css(cssValue);
		},

		/**
		 * To fulfill minimum panel count cloning original node when circular or previewPadding option are set
		 * @return {Boolean} true : added clone node, false : not added
		 */
		_addClonePanels: function () {
			var panel = this._conf.panel;
			var panelCount = panel.origCount;
			var cloneCount = panel.minCount - panelCount;
			var list = panel.$list;
			var cloneNodes;

			// if panels are given less than required when circular option is set, then clone node to apply circular mode
			if (this.options.circular && panelCount < panel.minCount) {
				cloneNodes = list.clone();

				while (cloneNodes.length < cloneCount) {
					cloneNodes = cloneNodes.add(list.clone());
				}

				return this.$container.append(cloneNodes);
			}
		},

		/**
		 * Move panel's position within array
		 * @param {Number} count element counts to move
		 * @param {Boolean} append where the list to be appended(moved) (true: to the end, false: to the beginning)
		 */
		_movePanelPosition: function (count, append) {
			var panel = this._conf.panel;
			var list = panel.$list.toArray();
			var listToMove;

			listToMove = list.splice(append ? 0 : panel.count - count, count);
			panel.$list = $(append ? list.concat(listToMove) : listToMove.concat(list));
		},

		/**
		 * Set default panel to show
		 * @param {Number} index
		 */
		_setDefaultPanel: function (index) {
			var panel = this._conf.panel;
			var lastIndex = panel.count - 1;
			var coords;

			if (this.options.circular) {
				// if default index is given, then move correspond panel to the first position
				if (index > 0 && index <= lastIndex) {
					this._movePanelPosition(index, true);
				}

				// set first panel's position according physical node length
				this._movePanelPosition(this._getBasePositionIndex(), false);

				panel.no = index;
			} else {
				// if defaultIndex option is given, then move to that index panel
				if (index > 0 && index <= lastIndex) {
					panel.no = panel.index = index;
					coords = [ -(panel.size * index), 0];

					this._setTranslate(coords);
					this._setMovableCoord("setTo", [
						Math.abs(coords[0]), Math.abs(coords[1])
					], true, 0);
				}
			}
		},

		/**
		 * Arrange panels' position
		 * @param {Boolean} sort Need to sort panel's position
		 * @param {Number} indexToMove Number to move from current position (negative: left, positive: right)
		 */
		_arrangePanels: function (sort, indexToMove) {
			var conf = this._conf;
			var panel = conf.panel;
			var touch = conf.touch;
			var dirData = conf.dirData;

			if (this.options.circular) {
				// when arranging panels, set flag to not trigger flick custom event
				conf.customEvent.flick = false;

				// move elements according direction
				if (sort) {
					indexToMove && (touch.direction = dirData[+!Boolean(indexToMove > 0)]);
					this._arrangePanelPosition(touch.direction, indexToMove);
				}

				// set index for base element's position
				panel.index = this._getBasePositionIndex();

				// arrange MovableCoord's coord position
				conf.customEvent.flick = !!this._setMovableCoord("setTo", [
					panel.size * panel.index, 0
				], true, 0);
			}

			this._applyPanelsPos();
		},

		/**
		 * Set each panel's position in DOM
 		 */
		_applyPanelsPos: function() {
			this._conf.panel.$list.each(
				$.proxy(this._applyPanelsCss, this)
			);
		},

		/**
		 * Set CSS style values to move elements
		 *
		 * Initialize setting up checking if browser support transform css property.
		 * If browser doesn't support transform, then use left/top properties instead.
		 */
		_setMoveStyle: (function () {
			return SUPPORT_TRANSFORM ?
				function ($element, coords) {
					$element.css("transform",
						ns.translate(coords[0], coords[1], this._conf.useLayerHack)
					);
				} :	function ($element, coords) {
					$element.css({ left: coords[0], top: coords[1] });
				};
		})(),

		/**
		 * Callback function for applying CSS values to each panels
		 *
		 * Need to be initialized before use, to set up for Android 2.x browsers or others.
		 */
		_applyPanelsCss: function () {
			var conf = this._conf;
			var dummyAnchorClassName = "__dummy_anchor";

			if (IS_ANDROID2) {
				conf.$dummyAnchor = $("." + dummyAnchorClassName);

				!conf.$dummyAnchor.length && this.$wrapper.append(
					conf.$dummyAnchor = $("<a href='javascript:void(0);' class='" +
						dummyAnchorClassName +
						"' style='position:absolute;height:0px;width:0px;'>")
				);

				this._applyPanelsCss = function (i, v) {
					var coords = this._getDataByDirection([
						(this._conf.panel.size * i) + "px", 0
					]);

					$(v).css({
						left: coords[0],
						top: coords[1]
					});
				};
			} else {
				this._applyPanelsCss = function (i, v) {
					var coords = this._getDataByDirection([
						SUPPORT_TRANSFORM ?
							(100 * i) + "%" :
							(this._conf.panel.size * i) + "px", 0]);

					this._setMoveStyle($(v), coords);
				};
			}
		},

		/**
		 * Adjust container's css value to handle Android 2.x link highlighting bug
		 *
		 * @param {String} phase
		 *    start - set left/top value to 0
		 *    end - set translate value to 0
		 * @param {Array} coords coordinate value
		 */
		_adjustContainerCss: function (phase, coords) {
			var conf = this._conf;
			var panel = conf.panel;
			var options = this.options;
			var horizontal = options.horizontal;
			var paddingTop = options.previewPadding[0];
			var container = this.$container;
			var value;

			if (IS_ANDROID2) {
				if (!coords) {
					coords = [-panel.size * panel.index, 0];
				}

				if (phase === "start") {
					container = container[0].style;
					value = parseInt(container[horizontal ? "left" : "top"], 10);

					if (horizontal) {
						value && (container.left = 0);
					} else {
						value !== paddingTop && (container.top = paddingTop + "px");
					}

					this._setTranslate([-coords[+!options.horizontal], 0]);

				} else if (phase === "end") {
					!horizontal && (coords[0] += paddingTop);
					coords = this._getCoordsValue(coords);

					container.css({
						left: coords.x,
						top: coords.y,
						transform: ns.translate(0, 0, conf.useLayerHack)
					});

					conf.$dummyAnchor[0].focus();
				}
			}
		},

		/**
		 * Set MovableCoord coord value
		 * @param {String} method
		 * @param {Array} coord
		 * @param {Boolean} isDirVal
		 * @param {Number} duration
		 * @return {eg.MovableCoord} MovableCoord instance
		 */
		_setMovableCoord: function (method, coord, isDirVal, duration) {
			isDirVal && this._getDataByDirection(coord);
			return this._mcInst[method](coord[0], coord[1], duration);
		},

		/**
		 * Set hint for browser to decide efficient way of doing transform changes(or animation)
		 * https://dev.opera.com/articles/css-will-change-property/
		 */
		_setHint: function () {
			var value = "transform";
			this.$container.css("willChange", value);
			this._conf.panel.$list.css("willChange", value);
		},

		/**
		 * Get data according options.horizontal value
		 *
		 * @param {Array} value primary data to handle
		 * @return {Array}
		 */
		_getDataByDirection: function (value) {
			!this.options.horizontal && value.reverse();
			return value;
		},

		/**
		 * Move nodes
		 * @param {Boolean} direction
		 * @param {Number} indexToMove
		 */
		_arrangePanelPosition: function (direction, indexToMove) {
			var next = direction === this._conf.dirData[0];
			this._movePanelPosition(Math.abs(indexToMove || 1), next);
		},

		/**
		 * Get the base position index of the panel
		 */
		_getBasePositionIndex: function () {
			var panel = this._conf.panel;
			return panel.index = Math.floor(panel.count / 2 - 0.1);
		},

		/**
		 * Bind events
		 */
		_bindEvents: function () {
			this._mcInst.on({
				hold: $.proxy(this._holdHandler, this),
				change: $.proxy(this._changeHandler, this),
				release: $.proxy(this._releaseHandler, this),
				animationStart: $.proxy(this._animationStartHandler, this),
				animationEnd: $.proxy(this._animationEndHandler, this)
			});
		},

		/**
		 * 'hold' event handler
		 */
		_holdHandler: function (e) {
			this._conf.touch.holdPos = e.pos;
			this._conf.panel.changed = false;

			this._adjustContainerCss("start", e.pos);
		},

		/**
		 * 'change' event handler
		 */
		_changeHandler: function (e) {
			var conf = this._conf;
			var touch = conf.touch;
			var pos = e.pos;
			var direction;
			var eventRes = null;
			var movedPx;

			this._setPointerEvents(e);  // for "click" bug

			/**
			 * Occurs during the change
			 * @ko 패널이 이동될 때 발생하는 이벤트
			 * @name eg.Flicking#flick
			 * @event
			 * @param {Object} param
			 * @param {String} param.eventType Name of event <ko>이벤트명</ko>
			 * @param {Number} param.index Current panel physical index <ko>현재 패널 물리적 인덱스</ko>
			 * @param {Number} param.no Current panel logical position <ko>현재 패널 논리적 인덱스</ko>
			 * @param {Number} param.direction Direction of the panel move (see eg.MovableCoord.DIRECTION_* constant) <ko>플리킹 방향 (eg.MovableCoord.DIRECTION_* constant 확인)</ko>
			 * @param {Array} param.pos Departure coordinate <ko>출발점 좌표</ko>
			 * @param {Number} param.pos.0 Departure x-coordinate <ko>x 좌표</ko>
			 * @param {Boolean} param.holding Holding if an area is pressed, this value is 'true'. <ko>스크린을 사용자가 누르고 있을 경우 true </ko>
			 */
			if (e.hammerEvent) {
				direction = e.hammerEvent.direction;

				// Adjust direction in case of diagonal touch move
				movedPx = e.hammerEvent[ this.options.horizontal ? "deltaX" : "deltaY" ];

				if (!~$.inArray(direction, conf.dirData)) {
					direction = conf.dirData[ +(Math.abs(touch.lastPos) <= movedPx) ];
				}

				touch.lastPos = movedPx;
			} else {
				touch.lastPos = null;
			}

			conf.customEvent.flick && (eventRes = this._triggerEvent(EVENTS.flick, {
				pos: e.pos,
				holding: e.holding,
				direction: direction || touch.direction
			}));

			(eventRes || eventRes === null) && this._setTranslate([
				-pos[+!this.options.horizontal], 0
			]);
		},

		/**
		 * 'release' event handler
		 */
		_releaseHandler: function (e) {
			var touch = this._conf.touch;
			var pos = e.destPos;
			var posIndex = +!this.options.horizontal;
			var holdPos = touch.holdPos[posIndex];
			var panelSize = this._conf.panel.size;

			touch.distance = e.depaPos[posIndex] - touch.holdPos[posIndex];

			touch.direction = this._conf.dirData[
				+!Boolean(touch.holdPos[posIndex] < e.depaPos[posIndex])
			];

			pos[posIndex] = Math.max(
				holdPos - panelSize, Math.min(holdPos, pos[posIndex])
			);

			touch.destPos[posIndex] =
				pos[posIndex] = Math.round(pos[posIndex] / panelSize) * panelSize;

			touch.distance === 0 && this._adjustContainerCss("end");

			this._setPointerEvents();  // for "click" bug
		},

		/**
		 * 'animationStart' event handler
		 */
		_animationStartHandler: function (e) {
			var conf = this._conf;
			var panel = conf.panel;
			var customEvent = conf.customEvent;

			panel.animating = true;

			if (!customEvent.restoreCall && e.hammerEvent &&
				this._setPhaseValue("start", {
					depaPos: e.depaPos,
					destPos: e.destPos
				}) === false) {
				e.stop();
			}

			if (e.hammerEvent) {
				e.duration = this.options.duration;

				e.destPos[+!this.options.horizontal] =
					panel.size * (
						panel.index + conf.indexToMove
					);
			}

			if (this._isMovable()) {
				!customEvent.restoreCall && (customEvent.restore = false);
			} else {
				this._triggerBeforeRestore(e);
			}
		},

		/**
		 * 'animationEnd' event handler
		 */
		_animationEndHandler: function () {
			this._setPhaseValue("end");

			this._conf.panel.animating = false;
			this._triggerRestore();
		},

		/**
		 * Trigger beforeRestore event
		 * @param {Object} e event object
		 */
		_triggerBeforeRestore: function(e) {
			var conf = this._conf;
			var touch = conf.touch;

			// reverse direction value when restore
			touch.direction = ~~conf.dirData.join("").replace(touch.direction, "");

			/**
			 * Before panel restores it's last position
			 * @ko 플리킹 임계치에 도달하지 못하고 사용자의 액션이 끝났을 경우, 원래 패널로 복원되기 전에 발생하는 이벤트
			 * @name eg.Flicking#beforeRestore
			 * @event
			 *
			 * @param {Object} param
			 * @param {String} param.eventType Name of event <ko>이벤트명</ko>
			 * @param {Number} param.index Current panel physical index <ko>현재 패널 물리적 인덱스</ko>
			 * @param {Number} param.no Current panel logical position <ko>현재 패널 논리적 인덱스</ko>
			 * @param {Number} param.direction Direction of the panel move (see eg.MovableCoord.DIRECTION_* constant) <ko>플리킹 방향 (eg.MovableCoord.DIRECTION_* constant 확인)</ko>
			 * @param {Array} param.depaPos Departure coordinate <ko>출발점 좌표</ko>
			 * @param {Number} param.depaPos.0 Departure x-coordinate <ko>x 좌표</ko>
			 * @param {Number} param.depaPos.1 Departure y-coordinate <ko>y 좌표</ko>
			 * @param {Array} param.destPos Destination coordinate <ko>도착점 좌표</ko>
			 * @param {Number} param.destPos.0 Destination x-coordinate <ko>x 좌표</ko>
			 * @param {Number} param.destPos.1 Destination y-coordinate <ko>y 좌표</ko>
			 */
			conf.customEvent.restore = this._triggerEvent(EVENTS.beforeRestore, {
				depaPos: e.depaPos,
				destPos: e.destPos
			});

			if (!conf.customEvent.restore) {
				"stop" in e && e.stop();
				conf.panel.animating = false;
			}
		},

		/**
		 * Trigger restore event
		 */
		_triggerRestore: function() {
			var customEvent = this._conf.customEvent;

			/**
			 * After panel restores it's last position
			 * @ko 플리킹 임계치에 도달하지 못하고 사용자의 액션이 끝났을 경우, 원래 인덱스로 복원된 후 발생하는 이벤트
			 * @name eg.Flicking#restore
			 * @event
			 *
			 * @param {Object} param
			 * @param {String} param.eventType Name of event <ko>이벤트명</ko>
			 * @param {Number} param.index Current panel physical index <ko>현재 패널 물리적 인덱스</ko>
			 * @param {Number} param.no Current panel logical position <ko>현재 패널 논리적 인덱스</ko>
			 * @param {Number} param.direction Direction of the panel move (see eg.MovableCoord.DIRECTION_* constant) <ko>플리킹 방향 (eg.MovableCoord.DIRECTION_* constant 확인)</ko>
			 */
			customEvent.restore && this._triggerEvent(EVENTS.restore);
			customEvent.restoreCall = false;
		},

		/**
		 * Set value when panel changes
		 * @param {String} phase - [start|end]
		 * @param {Object} pos
		 */
		_setPhaseValue: function (phase, pos) {
			var conf = this._conf;
			var options = this.options;
			var panel = conf.panel;

			if (phase === "start" && (panel.changed = this._isMovable())) {
				conf.indexToMove === 0 && this._setPanelNo();

				/**
				 * Before panel changes
				 * @ko 플리킹이 시작되기 전에 발생하는 이벤트
				 * @name eg.Flicking#beforeFlickStart
				 * @event
				 *
				 * @param {Object} param
				 * @param {String} param.eventType Name of event <ko>이벤트명</ko>
				 * @param {Number} param.index Current panel physical index <ko>현재 패널 물리적 인덱스</ko>
				 * @param {Number} param.no Current panel logical position <ko>현재 패널 논리적 인덱스</ko>
				 * @param {Number} param.direction Direction of the panel move (see eg.MovableCoord.DIRECTION_* constant) <ko>플리킹 방향 (eg.MovableCoord.DIRECTION_* constant 확인)</ko>
				 * @param {Array} param.depaPos Departure coordinate <ko>출발점 좌표</ko>
				 * @param {Number} param.depaPos.0 Departure x-coordinate <ko>x 좌표</ko>
				 * @param {Number} param.depaPos.1 Departure y-coordinate <ko>y 좌표</ko>
				 * @param {Array} param.destPos Destination coordinate <ko>도착점 좌표</ko>
				 * @param {Number} param.destPos.0 Destination x-coordinate <ko>x 좌표</ko>
				 * @param {Number} param.destPos.1 Destination y-coordinate <ko>y 좌표</ko>
				 */
				if (!this._triggerEvent(EVENTS.beforeFlickStart, pos)) {
					return panel.changed = panel.animating = false;
				}
			} else if (phase === "end") {
				if (options.circular && panel.changed) {
					this._arrangePanels(true, conf.indexToMove);
				}

				!IS_ANDROID2 && this._setTranslate([-panel.size * panel.index, 0]);
				conf.touch.distance = conf.indexToMove = 0;

				/**
				 * After panel changes
				 * @ko 플리킹으로 패널이 이동된 후 발생하는 이벤트
				 * @name eg.Flicking#flickEnd
				 * @event
				 *
				 * @param {Object} param
				 * @param {String} param.eventType Name of event <ko>이벤트명</ko>
				 * @param {Number} param.index Current panel physical index <ko>현재 패널 물리적 인덱스</ko>
				 * @param {Number} param.no Current panel logical position <ko>현재 패널 논리적 인덱스</ko>
				 * @param {Number} param.direction Direction of the panel move (see eg.MovableCoord.DIRECTION_* constant) <ko>플리킹 방향 (eg.MovableCoord.DIRECTION_* constant 확인)</ko>
				 */
				panel.changed && this._triggerEvent(EVENTS.flickEnd);
			}

			!(phase === "start" && pos === undefined) && this._adjustContainerCss(phase);
		},

		/**
		 * Set the logical panel index number
		 * @param {Boolean} recover
		 */
		_setPanelNo: function (recover) {
			var panel = this._conf.panel;
			var count = panel.origCount - 1;
			var num = this._conf.touch.direction === this._conf.dirData[0] ? 1 : -1;

			if (recover) {
				panel.index = panel.prevIndex >= 0 ?
					panel.prevIndex : panel.index - num;

				panel.no = panel.prevNo >= 0 ?
					panel.prevNo : panel.no - num;

			} else {
				panel.index += num;
				panel.no += num;
			}

			if (panel.no > count) {
				panel.no = 0;
			} else if (panel.no < 0) {
				panel.no = count;
			}
		},

		/**
		 * Set pointerEvents css property on container element due to the iOS click bug
		 * @param {Event} e
		 */
		_setPointerEvents: function (e) {
			var pointer = this.$container.css("pointerEvents");
			var val;

			if (e && e.holding &&
				e.hammerEvent && e.hammerEvent.preventSystemEvent &&
				pointer !== "none"
			) {
				val = "none";
			} else if (!e && pointer !== "auto") {
				val = "auto";
			}

			val && this.$container.css("pointerEvents", val);
		},

		/**
		 * Get coordinate value with unit
		 * @param coords {Array} x,y numeric value
		 * @return {Object} x,y coordinate value with unit
		 */
		_getCoordsValue: function (coords) {
			// the param comes as [ val, 0 ], whatever the direction. So reorder the value depend the direction.
			this._getDataByDirection(coords);

			return {
				x: this._getUnitValue(coords[0]),
				y: this._getUnitValue(coords[1])
			};
		},

		/**
		 * Set translate property value
		 * @param {Array} coords coordinate x,y value
		 */
		_setTranslate: function (coords) {
			var options = this.options;

			if (!SUPPORT_TRANSFORM && !options.horizontal) {
				coords[0] += options.previewPadding[0];
			}

			coords = this._getCoordsValue(coords);
			this._setMoveStyle(this.$container, [ coords.x, coords.y ]);
		},

		/**
		 * Return unit formatted value
		 * @param {Number|String} val
		 * @return {String} val Value formatted with unit
		 */
		_getUnitValue: function (val) {
			var rx = /(?:[a-z]{2,}|%)$/;
			return (parseInt(val, 10) || 0) + (String(val).match(rx) || "px");
		},

		/**
		 * Check if panel passed through threshold pixel
		 */
		_isMovable: function () {
			return Math.abs(this._conf.touch.distance) >= this.options.threshold;
		},

		/**
		 * Trigger custom events
		 * @param {String} name - event name
		 * @param {Object} param - additional event value
		 * @return {Boolean}
		 */
		_triggerEvent: function (name, param) {
			var conf = this._conf;
			var panel = conf.panel;

			return this.trigger(conf.eventPrefix + name, $.extend({
				eventType: name,
				index: panel.index,
				no: panel.no,
				direction: conf.touch.direction
			}, param));
		},

		/**
		 * Get next/prev panel element/index.
		 * @param {Boolean} direction
		 * @param {Boolean} element - true:to get element, false:to get index
		 * @param {Number} physical - true : physical, false : logical
		 * @return {jQuery|Number}
		 */
		_getElement: function (direction, element, physical) {
			var panel = this._conf.panel;
			var circular = this.options.circular;
			var pos = panel.index;
			var next = direction === this._conf.dirData[0];
			var result = null;
			var total;
			var index;
			var currentIndex;

			if (physical) {
				total = panel.count;
				index = pos;
			} else {
				total = panel.origCount;
				index = panel.no;
			}

			currentIndex = index;

			if (next) {
				if (index < total - 1) {
					index++;
				} else if (circular) {
					index = 0;
				}
			} else {
				if (index > 0) {
					index--;
				} else if (circular) {
					index = total - 1;
				}
			}

			if (currentIndex !== index) {
				result = element ? $(panel.$list[next ? pos + 1 : pos - 1]) : index;
			}

			return result;
		},

		/**
		 * Set value to force move panels when duration is 0
		 * @param {Boolean} next
		 */
		_setValueToMove: function (next) {
			var conf = this._conf;

			conf.touch.distance = this.options.threshold + 1;
			conf.touch.direction = conf.dirData[ +!next ];
		},

		/**
		 * Check and parse value to number
		 * @param {Number|String} val
		 * @param {Number} defVal
		 * @return {Number}
		 */
		_getNumValue: function (val, defVal) {
			return isNaN(val = parseInt(val, 10)) ? defVal : val;
		},

		/**
		 * Get current panel position
		 * @ko 현재 패널의 인덱스 값을 반환한다.
		 * @method eg.Flicking#getIndex
		 * @param {Boolean} [physical=false] Boolean to get physical or logical index (true : physical, false : logical) <ko>물리적/논리적 값 인덱스 불리언(true: 물리적, false: 논리적)</ko>
		 * @return {Number} Number Current index number <ko>현재 패널 인덱스 번호</ko>
		 */
		getIndex: function (physical) {
			return this._conf.panel[ physical ? "index" : "no" ];
		},

		/**
		 * Get current panel element
		 * @ko 현재 패널 요소의 레퍼런스를 반환한다.
		 * @method eg.Flicking#getElement
		 * @return {jQuery} jQuery Current element <ko>현재 요소</ko>
		 */
		getElement: function () {
			var panel = this._conf.panel;
			return $(panel.$list[panel.index]);
		},

		/**
		 * Get next panel element
		 * @ko 다음 패널 요소의 레퍼런스를 반환한다.
		 * @method eg.Flicking#getNextElement
		 * @return {jQuery|null} Next element or null if no more element exist<ko>다음 패널 요소. 패널이 없는 경우에는 null</ko>
		 */
		getNextElement: function () {
			return this._getElement(this._conf.dirData[0], true);
		},

		/**
		 * Get next panel index
		 * @ko 다음 패널의 인덱스 값을 반환한다.
		 * @method eg.Flicking#getNextIndex
		 * @param {Boolean} [physical=false] Boolean to get physical or logical index (true : physical, false : logical) <ko>물리적/논리적 값 인덱스 불리언(true: 물리적, false: 논리적)</ko>
		 * @return {Number|null} Next element index value or null if no more element exist<ko>다음 패널 인덱스 번호. 패널이 없는 경우에는 null</ko>
		 */
		getNextIndex: function (physical) {
			return this._getElement(this._conf.dirData[0], false, physical);
		},

		/**
		 * Get whole panel elements
		 * @ko 패널을 구성하는 모든 요소들의 레퍼런스를 반환한다.
		 * @method eg.Flicking#getAllElements
		 * @return {jQuery} jQuery All panel elements <ko>모든 패널 요소</ko>
		 */
		getAllElements: function () {
			return this._conf.panel.$list;
		},

		/**
		 * Get previous panel element
		 * @ko 이전 패널 요소의 레퍼런스를 반환한다.
		 * @method ns.Flicking#getPrevElement
		 * @return {jQuery|null} Previous element or null if no more element exist <ko>이전 패널 요소. 패널이 없는 경우에는 null</ko>
		 */
		getPrevElement: function () {
			return this._getElement(this._conf.dirData[1], true);
		},

		/**
		 * Get previous panel index
		 * @ko 이전 패널의 인덱스 값을 반환한다.
		 * @method eg.Flicking#getPrevIndex
		 * @param {Boolean} [physical=false] Boolean to get physical or logical index (true : physical, false : logical) <ko>물리적/논리적 값 인덱스 불리언(true: 물리적, false: 논리적)</ko>
		 * @return {Number|null} Previous element index value or null if no more element exist<ko>이전 패널 인덱스 번호. 패널이 없는 경우에는 null</ko>
		 */
		getPrevIndex: function (physical) {
			return this._getElement(this._conf.dirData[1], false, physical);
		},

		/**
		 * Get total panel count
		 * @ko 전체 패널의 개수를 반환한다.
		 * @method eg.Flicking#getTotalCount
		 * @param {Boolean} [physical=false] Boolean to get physical or logical index (true : physical, false : logical) <ko>물리적/논리적 값 인덱스 불리언(true: 물리적, false: 논리적)</ko>
		 * @return {Number} Number Count of all elements <ko>모든 패널 요소 개수</ko>
		 */
		getTotalCount: function (physical) {
			return this._conf.panel[ physical ? "count" : "origCount" ];
		},

		/**
		 * Return either panel is animating or not
		 * @ko 현재 애니메이션중인지 여부를 리턴한다.
		 * @method eg.Flicking#isPlaying
		 * @return {Boolean}
		 */
		isPlaying: function () {
			return this._conf.panel.animating;
		},

		/**
		 * Move panel to the given direction
		 * @param {Boolean} next
		 * @param {Number} duration
		 */
		_movePanel: function (next, duration) {
			var panel = this._conf.panel;
			var options = this.options;

			if (panel.animating) {
				return;
			}

			this._setValueToMove(next);

			if (options.circular ||
				this[next ? "getNextIndex" : "getPrevIndex"]() != null
			) {
				this._movePanelByPhase("setBy", [
					panel.size * (next ? 1 : -1), 0
				], duration);
			}

			return this;
		},

		/**
		 * Move panel applying start/end phase value
		 * @param {String} method movableCoord method name
		 * @param {Object} coords coordinate array value
		 * @param {Number} duration duration value
		 */
		_movePanelByPhase: function(method, coords, duration) {
			duration = this._getNumValue(duration, this.options.duration);

			if (this._setPhaseValue("start") !== false) {
				this._setMovableCoord(method, coords, true, duration);
				!duration && this._setPhaseValue("end");
			}
		},

		/**
		 * Move to next panel
		 * @ko 다음 패널로 이동한다.
		 * @method eg.Flicking#next
		 * @param {Number} [duration=options.duration] Duration of animation in milliseconds <ko>애니메이션 진행시간(ms)</ko>
		 * @return {eg.Flicking} instance of itself<ko>자신의 인스턴스</ko>
		 */
		next: function (duration) {
			return this._movePanel(true, duration);
		},

		/**
		 * Move to previous panel
		 * @ko 이전 패널로 이동한다.
		 * @method eg.Flicking#prev
		 * @param {Number} [duration=options.duration] Duration of animation in milliseconds <ko>애니메이션 진행시간(ms)</ko>
		 * @return {eg.Flicking} instance of itself<ko>자신의 인스턴스</ko>
		 */
		prev: function (duration) {
			return this._movePanel(false, duration);
		},

		/**
		 * Move to indicated panel
		 * @ko 지정한 패널로 이동한다.
		 * @method eg.Flicking#moveTo
		 * @param {Number} no logical panel index
		 * @param {Number} [duration=options.duration] Duration of animation in milliseconds <ko>애니메이션 진행시간(ms)</ko>
		 * @return {eg.Flicking} instance of itself<ko>자신의 인스턴스</ko>
		 */
		moveTo: function (no, duration) {
			var panel = this._conf.panel;
			var circular = this.options.circular;
			var currentIndex = panel.index;
			var indexToMove;
			var isPositive;

			no = this._getNumValue(no, -1);

			if (no < 0 || no >= panel.origCount || no === panel.no || panel.animating) {
				return this;
			}

			// remember current value in case of restoring
			panel.prevIndex = currentIndex;
			panel.prevNo = panel.no;

			if (circular) {
				indexToMove = no - panel.no;
				isPositive = indexToMove > 0;

				// check for real panel count which can be moved on each sides
				if (Math.abs(indexToMove) > (isPositive ?
						panel.count - (currentIndex + 1) : currentIndex)) {
					indexToMove = indexToMove + (isPositive ? -1 : 1) * panel.count;
				}

				panel.no = no;
			} else {
				indexToMove = no - currentIndex;
				panel.no = panel.index = no;
			}

			this._conf.indexToMove = indexToMove;
			this._setValueToMove(isPositive);

			this._movePanelByPhase(
				circular ? "setBy" : "setTo",
				[ panel.size * (circular ? indexToMove : no), 0 ],
				duration
			);

			return this;
		},

		/**
		 * Update panel's previewPadding size according options.previewPadding
		 */
		_checkPadding: function () {
			var options = this.options;
			var previewPadding = options.previewPadding.concat();
			var padding = this.$wrapper.css("padding").split(" ");

			options.horizontal && padding.reverse();

			// get current padding value
			padding = padding.length === 2 ?
				[ padding[0], padding[0] ] : [ padding[0], padding[2] ];

			padding = $.map(padding, function(num) {
				return parseInt(num, 10);
			});

			// update padding when current and given are different
			if (previewPadding.length === 2 &&
				previewPadding[0] !== padding[0] || previewPadding[1] !== padding[1]) {

				this._setPadding(previewPadding);
			}
		},

		/**
		 * Update panel size according current viewport
		 * @ko 패널 사이즈 정보를 갱신한다.
		 * @method eg.Flicking#resize
		 * @return {eg.Flicking} instance of itself<ko>자신의 인스턴스</ko>
		 * @example
			var some = new eg.Flicking("#mflick", {
				previewPadding: [10,10]
			});

			// when device orientaion changes
			some.resize();

			// or when changes previewPadding option from its original value
			some.options.previewPadding = [20, 30];
			some.resize();
		 */
		resize: function () {
			var conf = this._conf;
			var options = this.options;
			var panel = conf.panel;
			var horizontal = options.horizontal;
			var panelSize;
			var maxCoords;

			if (~~options.previewPadding.join("")) {
				this._checkPadding();
				panelSize = panel.size;
			} else if (horizontal) {
				panelSize = panel.size = this.$wrapper.width();
			}

			maxCoords = this._getDataByDirection([panelSize * (panel.count - 1), 0]);

			// resize elements
			horizontal && this.$container.width(maxCoords[0] + panelSize);
			panel.$list.css(horizontal ? "width" : "height", panelSize);

			this._mcInst.options.max = maxCoords;
			this._setMovableCoord("setTo", [panelSize * panel.index, 0], true, 0);

			if (IS_ANDROID2) {
				this._applyPanelsPos();
				this._adjustContainerCss("end");
			}

			return this;
		},

		/**
		 * Restore panel in its right position
		 * @ko 패널의 위치가 올바로 위치하지 않게 되는 경우, 제대로 위치하도록 보정한다.
		 * @method eg.Flicking#restore
		 * @param {Number} [duration=options.duration] Duration of animation in milliseconds <ko>애니메이션 진행시간(ms)</ko>
		 * @return {eg.Flicking} instance of itself<ko>자신의 인스턴스</ko>
		 * @example
			var some = new eg.Flicking("#mflick").on({
				beforeFlickStart : function(e) {
					if(e.no === 2) {
						e.stop();  // stop flicking
						this.restore(100);  // restoring to previous position
					}
				}
			);
		 */
		restore: function (duration) {
			var conf = this._conf;
			var panel = conf.panel;
			var currPos = this._getDataByDirection(this._mcInst.get());
			var destPos;

			// check if the panel isn't in right position
			if (currPos[0] % panel.size) {
				conf.customEvent.restoreCall = true;
				duration = this._getNumValue(duration, this.options.duration);

				this._setPanelNo(true);
				destPos = this._getDataByDirection([panel.size * panel.index, 0]);

				this._triggerBeforeRestore({ depaPos: currPos, destPos: destPos });
				this._setMovableCoord("setTo", destPos, true, duration);

				if (!duration) {
					this._adjustContainerCss("end");
					this._triggerRestore();
				}

				// to handle on api call
			} else if (panel.changed) {
				this._setPanelNo(true);

				conf.touch.distance = conf.indexToMove = 0;
				panel.prevIndex = panel.prevNo = -1;
			}

			return this;
		}
	});
});
/**
 * Flicking in jQuery plugin
 *
 * @ko Flicking in jQuery plugin
 * @method jQuery.flicking
 * @example
	<div id="content">
	    <div>
	        <p>Layer 0</p>
	    </div>
	    <div>
	        <p>Layer 1</p>
	    </div>
	    <div>
	        <p>Layer 2</p>
	    </div>
	</div>
    <script>
	// create
	$("#content").flicking({
        circular : true,
     	threshold : 50
    });
 	// method
	$("#content").flicking("option","circular",true); //Set option
	$("#content").flicking("instance"); // Return flicking instance
	$("#content").flicking("getNextIndex",1); // Get next panel index
 	</script>
 * @see eg.Flicking
 */
/**
 * flicking:beforeRestore jQuery event plugin
 *
 * @ko flicking:beforeRestore jQuery event plugin
 * @name jQuery#flicking:beforeRestore
 * @event
 * @example
 $("#mflick").on("flicking:beforeRestore",callback);
 $("#mflick").off("flicking:beforeRestore",callback);
 $("#mflick").trigger("flicking:beforeRestore",callback);
 * @see eg.Flicking#event:beforeRestore
 */
/**
 * flicking:beforeFlickStart jQuery event plugin
 *
 * @ko flicking:beforeFlickStart jQuery event plugin
 * @name jQuery#flicking:beforeFlickStart
 * @event
 * @example
 $("#mflick").on("flicking:beforeFlickStart",callback);
 $("#mflick").off("flicking:beforeFlickStart",callback);
 $("#mflick").trigger("flicking:beforeFlickStart",callback);
 * @see eg.Flicking#event:beforeFlickStart
 */
/**
 * flicking:flick jQuery event plugin
 *
 * @ko flicking:flick jQuery event plugin
 * @name jQuery#flicking:flick
 * @event
 * @example
 $("#mflick").on("flicking:flick",callback);
 $("#mflick").off("flicking:flick",callback);
 $("#mflick").trigger("flicking:flick",callback);
 * @see eg.Flicking#event:flick
 */
/**
 * flicking:flickEnd jQuery event plugin
 *
 * @ko flicking:flickEnd jQuery event plugin
 * @name jQuery#flicking:flickEnd
 * @event
 * @example
 $("#mflick").on("flicking:flickEnd",callback);
 $("#mflick").off("flicking:flickEnd",callback);
 $("#mflick").trigger("flicking:flickEnd",callback);
 * @see eg.Flicking#event:flickEnd
 */
/**
 * flicking:restore jQuery event plugin
 *
 * @ko flicking:restore jQuery event plugin
 * @name jQuery#flicking:restore
 * @event
 * @example
 $("#mflick").on("flicking:restore",callback);
 $("#mflick").off("flicking:restore",callback);
 $("#mflick").trigger("flicking:restore",callback);
 * @see eg.Flicking#event:restore
 */
/**
* Copyright (c) 2015 NAVER Corp.
* egjs projects are licensed under the MIT license
*/

// jscs:disable validateLineBreaks, maximumLineLength
eg.module("infiniteGrid", ["jQuery", eg, window, document, "Outlayer"], function($, ns, global, doc, Outlayer) {
// jscs:enable validateLineBreaks, maximumLineLength
	if (!Outlayer) {
		ns.InfiniteGrid = ns.Class({});
		return;
	}

	function clone(target, source, what) {
		var s;
		$.each(what, function(i, v) {
			s = source[v];
			if (s != null) {
				if ($.isArray(s)) {
					target[v] = $.merge([], s);
				} else if ($.isPlainObject(s)) {
					target[v] = $.extend(true, {}, s);
				} else {
					target[v] = s;
				}
			}
		});
		return target;
	}

	var InfiniteGridCore = Outlayer.create("InfiniteGrid");
	$.extend(InfiniteGridCore.prototype, {
		// @override (from layout)
		_resetLayout: function() {
			if (!this._isLayoutInited) {
				this._registGroupKey(this.options.defaultGroupKey, this.items);
			}
			this.element.style.width = null;
			this.getSize();	// create size property
			this._measureColumns();
		},

		// @override
		_getContainerSize: function() {
			return {
				height: Math.max.apply(Math, this._appendCols),
				width: this.size.innerWidth
			};
		},

		// @override
		_getItemLayoutPosition: function(item) {
			if (this._equalItemSize) {
				item.size = this._equalItemSize;
			} else {
				item.getSize();
			}
			(item.isAppend == null) && (item.isAppend = true);
			var outerHeight = parseInt(item.size.outerHeight, 10);
			var shortColIndex;
			var isAppend = item.isAppend;
			var cols = isAppend ? this._appendCols : this._prependCols;
			var y = Math[isAppend ? "min" : "max"].apply(Math, cols);
			if (isAppend) {
				shortColIndex = $.inArray(y, cols);
			} else {
				var i = cols.length;
				while (i-- >= 0) {
					if (cols[i] === y) {
						shortColIndex = i;
						break;
					}
				}
			}
			cols[shortColIndex] = y + (isAppend ? outerHeight : -outerHeight);

			return {
				x: this.columnWidth * shortColIndex,
				y: isAppend ? y : y - outerHeight
			};
		},
		resetLayout: function() {
			this._resetLayout();
			this._isLayoutInited = true;
		},
		updateCols: function(isAppend) {
			var col = isAppend ? this._appendCols : this._prependCols;
			var items = this.getColItems(isAppend);
			var base = this._isFitted || isAppend ? 0 : this._getMinY(items);
			var i = 0;
			var len = col.length;
			var item;
			for (; i < len; i++) {
				if (item = items[i]) {
					col[i] = item.position.y + (isAppend ? item.size.outerHeight : -base);
				} else {
					col[i] = 0;
				}
			}
			return base;
		},
		_getMinY: function(items) {
			return Math.min.apply(Math, $.map(items, function(v) {
				return v ? v.position.y : 0;
			}));
		},
		_measureColumns: function() {
			var containerWidth = this.size.innerWidth;
			var columnWidth = this._getColumnWidth();
			var cols = containerWidth / columnWidth;
			var excess = columnWidth - containerWidth % columnWidth;

			// if overshoot is less than a pixel, round up, otherwise floor it
			cols = Math.max(Math[ excess && excess <= 1 ? "round" : "floor" ](cols), 1);

			// reset column Y
			this._appendCols = [];
			this._prependCols = [];
			while (cols--) {
				this._appendCols.push(0);
				this._prependCols.push(0);
			}
		},
		_getColumnWidth: function() {
			var el = this.items[0] && this.items[0].element;
			var size;
			if (el) {
				/* jshint ignore:start */
				size = getSize(el);
				/* jshint ignore:end */
			} else {
				size = {
					outerWidth: 0,
					outerHeight: 0
				};
			}
			this.options.isEqualSize && (this._equalItemSize = size);
			this.columnWidth = size.outerWidth || this.size.outerWidth;
			return this.columnWidth;
		},
		_getColIdx: function(item) {
			return parseInt(item.position.x / parseInt(this.columnWidth, 10), 10);
		},
		getColItems: function(isTail) {
			var len = this._appendCols.length;
			var colItems = new Array(len);
			var item;
			var idx;
			var count = 0;
			var i = isTail ? this.items.length - 1 : 0;
			while (item = this.items[i]) {
				idx = this._getColIdx(item);
				if (!colItems[idx]) {
					colItems[idx] = item;
					if (++count === len) {
						return colItems;
					}
				}
				i += isTail ? -1 : 1;
			}
			return colItems;
		},
		clone: function(target, source) {
			clone(target, source, [
				"_isLayoutInited",
				"_equalItemSize",
				"_appendCols",
				"_prependCols",
				"columnWidth",
				"size",
				"options"
				]);
			target.items = target.items || [];
			target.items.length = source.items.length;
			$.each(source.items, function(i) {
				target.items[i] = clone(target.items[i] || {}, source.items[i],
					["position", "size", "isAppend", "groupKey"]);
			});
			return target;
		},
		itemize: function(elements, groupKey) {
			var items = this._itemize(elements);
			this._registGroupKey(groupKey, items);
			return items;
		},
		_registGroupKey: function(groupKey, array) {
			if (groupKey != null) {
				var i = 0;
				var v;
				while (v = array[i++]) {
					v.groupKey = groupKey;
				}
			}
		},

		// @override
		destroy: function() {
			this.off();
			Outlayer.prototype.destroy.apply(this);
		}
	});

	/**
	 * To build Grid layout UI
	 * InfiniteGrid is composed using Outlayer and supports recycle-dom.
	 * DOM elements are fixed even contents are added infinitely.
	 * @group egjs
	 * @ko 그리드 레이아웃을 구성하는 UI 컴포넌트. InfiniteGrid는 Outlayer로 구성되어 있다. 하지만, 이 컴포넌트는 recycle-dom을 지원한다.
	 * 컨텐츠를 계속 증가하면 할수록 일정한 DOM 개수를 유지할수 있다.
	 * @class
	 * @name eg.InfiniteGrid
	 * @extends eg.Component
	 *
	 * @param {HTMLElement|String|jQuery} element wrapper element <ko>기준 요소</ko>
	 * @param {Object} [options]
	 * @param {String} [options.itemSelector] selector string for layout item elements <ko>레이아웃의 아이템으로 사용될 엘리먼트들의 셀렉터</ko>
	 * @param {Boolean} [options.isEqualSize=false] determine if all item's size are same <ko> 모든 아이템의 사이즈가 동일한지를 지정한다</ko>
	 * @param {String} [options.defaultGroupKey=null] when encounter item markup during the initialization, then set `defaultGroupKey` as groupKey <ko>초기화할때 마크업에 아이템이 있다면, defalutGroupKey를 groupKey로 지정한다</ko>
	 * @param {Number} [options.count=30] when count value is greater than 0, grid will maintain same DOM length recycling <ko>count값이 0보다 클 경우, 그리드는 일정한 dom 개수를 유지한다</ko>
	 * @param {Number} [options.threshold=300] Threshold pixels to determine if grid needs to append or prepend elements<ko>엘리먼트가 append 또는 prepend될지를 결정하는 임계치 픽셀</ko>
	 *
	 * @codepen {"id":"zvrbap", "ko":"InfiniteGrid 데모", "en":"InfiniteGrid example", "collectionId":"DPYEww", "height": 403}
	 *  @support {"ie": "8+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "ios" : "7+", "an" : "2.1+ (except 3.x)"}
	 *
	 *  @see Outlayer {@link https://github.com/metafizzy/outlayer}
	 *
	 * @example
		<!-- HTML -->
		<ul id="grid">
			<li class="item">
			  <div>테스트1</div>
			</li>
			<li class="item">
			  <div>테스트2</div>
			</li>
			<li class="item">
			  <div>테스트3</div>
			</li>
			<li class="item">
			  <div>테스트4</div>
			</li>
			<li class="item">
			  <div>테스트5</div>
			</li>
			<li class="item">
			  <div>테스트6</div>
			</li>
		</ul>
		<script>
		var some = new eg.InfiniteGrid("#grid", {
			itemSelector : ".item"
		}).on("layoutComplete", function(e) {
			// ...
		});
		</script>
	 */
	var EVENTS = {
		"layoutComplete": "layoutComplete",
		"append": "append",
		"prepend": "prepend"
	};
	ns.InfiniteGrid = ns.Class.extend(ns.Component, {
		_events: function() {
			return EVENTS;
		},
		construct: function(el, options, _prefix) {
			this.options = $.extend({
				"isEqualSize": false,
				"defaultGroupKey": null,
				"count": 30,
				"threshold": 300
			}, options);
			this.options.transitionDuration = 0;	// don't use this option.
			this.options.isInitLayout = false;	// isInitLayout is always 'false' in order to controll layout.
			this.options.isResizeBound = false;	// isResizeBound is always 'false' in order to controll layout.

			// if el is jQuery instance, el should change to HTMLElement.
			if (el instanceof $) {
				el = el.get(0);
			}
			this._prefix = _prefix || "";
			this.core = new InfiniteGridCore(el, this.options)
				.on(EVENTS.layoutComplete, $.proxy(this._onlayoutComplete, this));
			this.$view = $(global);
			this._reset();
			this.core.$element.children().length > 0 && this.layout();
			this._onResize = $.proxy(this._onResize, this);
			this._onScroll = $.proxy(this._onScroll, this);
			this._isIos = ns.agent().os.name === "ios";
			this._prevScrollTop = 0;
			this._topElement = null;
			this._bottomElement = null;
			this._refreshViewport();
			this.$view.on("resize", this._onResize);
			this.$view.on("scroll", this._onScroll);
		},
		_getScrollTop: function() {
			return doc.body.scrollTop || doc.documentElement.scrollTop;
		},
		_onScroll: function() {
			if (this.isProcessing()) {
				return;
			}
			var scrollTop = this._getScrollTop();
			var prevScrollTop = this._prevScrollTop;

			if (this._isIos && scrollTop === 0 || prevScrollTop === scrollTop) {
				return;
			}
			var ele;
			var rect;
			if (prevScrollTop < scrollTop) {
				ele = this._bottomElement || this.getBottomElement();
				rect = ele.getBoundingClientRect();
				if (rect.top <= this._clientHeight + this.options.threshold) {
					/**
					 * Occurs when grid needs to append elements.
					 * in order words, when scroll reaches end of page
					 *
					 * @ko 엘리먼트가 append 될 필요가 있을 때 발생하는 이벤트.
					 * 즉, 스크롤이 페이지 하단에 도달했을 때 발생한다.
					 * @name eg.InfiniteGrid#append
					 * @event
					 *
					 * @param {Object} param
					 * @param {Number} param.scrollTop scrollTop scroll-y position of window<ko>윈도우 y 스크롤의 값</ko>
					 */
					this.trigger(this._prefix + EVENTS.append, {
						scrollTop: scrollTop
					});
				}
			} else {
				if (this.isRecycling() && this._removedContent > 0 &&
					(ele = this._topElement || this.getTopElement())) {
					rect = ele.getBoundingClientRect();
					if (rect.bottom >= -this.options.threshold) {
						/**
						 * Occurs when grid needs to prepend elements
						 * in order words, when scroll reaches top of page and a count of cropped element is more than zero.
						 *
						 * @ko 엘리먼트가 prepend 될 필요가 있을 때 발생하는 이벤트.
						 * 즉, 스크롤이 페이지 상단에 도달하고, 순환에 의해 잘려진 엘리먼트가 존재할때 발생한다.
						 * @name eg.InfiniteGrid#prepend
						 * @event
						 *
						 * @param {Object} param
						 * @param {Number} param.scrollTop scrollTop scroll-y position of window<ko>윈도우 y 스크롤의 값</ko>
						 */
						var croppedDistance = this.fit();
						if (croppedDistance > 0) {
							scrollTop -= croppedDistance;
							this.$view.scrollTop(scrollTop);
						}
						this.trigger(this._prefix + EVENTS.prepend, {
							scrollTop: scrollTop
						});
					}
				}
			}
			this._prevScrollTop = scrollTop;
		},
		_onResize: function() {
			if (this.resizeTimeout) {
				clearTimeout(this.resizeTimeout);
			}
			var self = this;
			function delayed() {
				self._refreshViewport();
				self.core.element.style.width = null;
				self.core.needsResizeLayout() && self.layout();
				delete self.resizeTimeout;
			}
			this.resizeTimeout = setTimeout(delayed, 100);
		},
		_refreshViewport: function() {
			this._clientHeight = this.$view.height();
		},
		/**
		 * Get current status
		 * @ko infiniteGrid의 현재상태를 반환한다.
		 * @method eg.InfiniteGrid#getStatue
		 * @return {Object} infiniteGrid status Object<ko>infiniteGrid 상태 오브젝트</ko>
		 */
		getStatus: function() {
			var data = [];
			var p;
			for (p in this) {
				if (this.hasOwnProperty(p) && /^_/.test(p)) {
					data.push(p);
				}
			}
			return {
				core: this.core.clone({}, this.core),
				data: clone({}, this, data),
				html: this.core.$element.html(),
				cssText: this.core.element.style.cssText
			};
		},
		/**
		 * Set current status
		 * @ko infiniteGrid의 현재상태를 설정한다.
		 * @method eg.InfiniteGrid#setStatus
		 * @param {Object} status Object
		 * @return {eg.InfiniteGrid} instance of itself<ko>자신의 인스턴스</ko>
		 */
		setStatus: function(status) {
			this.core.element.style.cssText = status.cssText;
			this.core.$element.html(status.html);
			this.core.items = this.core.itemize(this.core.$element.children().toArray());
			this.core.clone(this.core, status.core);
			$.extend(this, status.data);
			return this;
		},
		/**
		 * Check if element is appending or prepending
		 * @ko append나 prepend가 진행중일 경우 true를 반환한다.
		 * @method eg.InfiniteGrid#isProcessing
		 * @return {Boolean}
		 */
		isProcessing: function() {
			return this._isProcessing;
		},
		/**
		 * Check if elements are in recycling mode
		 * @ko recycle 모드 여부를 반환한다.
		 * @method eg.InfiniteGrid#isRecycling
		 * @return {Boolean}
		 */
		isRecycling: function() {
			return this.core.options.count > 0 && this._isRecycling;
		},
		/**
		 * Get group keys
		 * @ko 그룹키들을 반환한다.
		 * @method eg.InfiniteGrid#getGroupKeys
		 * @return {Array} groupKeys
		 */
		getGroupKeys: function() {
			var result = [];
			if (this.core._isLayoutInited) {
				var i = 0;
				var item;
				while (item = this.core.items[i++]) {
					result.push(item.groupKey);
				}
			}
			return result;
		},
		/**
		 * Rearrange layout
		 * @ko 레이아웃을 재배치한다.
		 * @method eg.InfiniteGrid#layout
		 * @return {eg.InfiniteGrid} instance of itself<ko>자신의 인스턴스</ko>
		 */
		layout: function() {
			this._isProcessing = true;
			this._isAppendType = true;
			var i = 0;
			var v;
			while (v = this.core.items[i++]) {
				v.isAppend = true;
			}
			this.core.layout();
			return this;
		},
		/**
		 * Append elements
		 * @ko 엘리먼트를 append 한다.
		 * @method eg.InfiniteGrid#append
		 * @param {Array|String|jQuery} elements to be appended elements <ko>append될 엘리먼트 배열</ko>
		 * @param {Number|String} [groupKey] to be appended groupkey of elements<ko>append될 엘리먼트의 그룹키</ko>
		 * @return {Number} length a number of elements
		 */
		append: function($elements, groupKey) {
			if (this._isProcessing || $elements.length === 0) {
				return;
			}

			// convert jQuery instance
			$elements = $($elements);
			this._isProcessing = true;
			if (!this._isRecycling) {
				this._isRecycling =
				(this.core.items.length + $elements.length) >= this.core.options.count;
			}
			this._insert($elements, groupKey, true);
			return $elements.length;
		},
		/**
		 * Prepend elements
		 * @ko 엘리먼트를 prepend 한다.
		 * @method eg.InfiniteGrid#prepend
		 * @param {Array|String|jQuery} elements to be prepended elements <ko>prepend될 엘리먼트 배열</ko>
		 * @param {Number|String} [groupKey] to be prepended groupkey of elements<ko>prepend될 엘리먼트의 그룹키</ko>
		 * @return {Number} length a number of elements
		 */
		prepend: function($elements, groupKey) {
			if (!this.isRecycling() || this._removedContent === 0 ||
				this._isProcessing || $elements.length === 0) {
				return;
			}

			// convert jQuery instance
			$elements = $($elements);

			this._isProcessing = true;
			this._fit();
			if ($elements.length > this._removedContent) {
				$elements = $elements.slice(0, this._removedContent);
			}
			this._insert($elements, groupKey, false);
			return $elements.length;
		},
		/**
		 * Clear elements and data
		 * @ko 엘리먼트와 데이터를 지운다.
		 * @method eg.InfiniteGrid#clear
		 * @return {eg.InfiniteGrid} instance of itself<ko>자신의 인스턴스</ko>
		 */
		clear: function() {
			this.core.$element.empty();
			this.core.items.length = 0;
			this._reset();
			this.layout();
			return this;

		},

		_getTopItem: function() {
			var item = null;
			var min = Infinity;
			$.each(this.core.getColItems(false), function(i, v) {
				if (v && v.position.y < min) {
					min = v.position.y;
					item = v;
				}
			});
			return item;
		},

		/**
		 * Get the first element at the top
		 * @ko 가장 위에 있는 엘리먼트를 반환한다.
		 * @method eg.InfiniteGrid#getTopElement
		 *
		 * @return {HTMLElement} element
		 */
		getTopElement: function() {
			var item = this._getTopItem();
			return item && item.element;
		},

		_getBottomItem: function() {
			var item = null;
			var max = -Infinity;
			$.each(this.core.getColItems(true), function(i, v) {
				if (v && v.position.y + v.size.outerHeight > max) {
					max = v.position.y + v.size.outerHeight;
					item = v;
				}
			});
			return item;
		},

		/**
		 * Get the last element at the bottom
		 * @ko 가장 아래에 있는 엘리먼트를 반환한다.
		 * @method eg.InfiniteGrid#getBottomElement
		 *
		 * @return {HTMLElement} element
		 */
		getBottomElement: function() {
			var item = this._getBottomItem();
			return item && item.element;
		},

		_onlayoutComplete: function(e) {
			var distance = 0;
			var isAppend = this._isAppendType;
			var item;
			var i = 0;
			while (item = e[i++]) {
				if (typeof item.oldVisibility !== "undefined") {
					item.element.style.visibility = item.oldVisibility;
					delete item.oldVisibility;
				}
			}

			// refresh element
			this._topElement = this.getTopElement();
			this._bottomElement = this.getBottomElement();

			if (isAppend === false) {
				this._isFitted = false;
				this._fit(true);
				distance = e.length >= this.core.items.length ?
					0 : this.core.items[e.length].position.y;
				if (distance > 0) {
					this._prevScrollTop = this._getScrollTop() + distance;
					this.$view.scrollTop(this._prevScrollTop);
				}
			}

			// reset flags
			this._reset(true);

			/**
			 * Occurs when layout is completed (after append / after prepend / after layout)
			 * @ko 레이아웃이 완료 되었을 때 발생하는 이벤트 (append/prepend/layout 메소드 호출 후, 아이템의 배치가 완료되었을때 발생)
			 * @name eg.InfiniteGrid#layoutComplete
			 * @event
			 *
			 * @param {Object} param
			 * @param {Array} param.target target rearranged elements<ko>재배치된 엘리먼트들</ko>
			 * @param {Boolean} param.isAppend isAppend determine if append or prepend (value is true when call layout method)<ko>아이템이 append로 추가되었는지, prepend로 추가되었는지를 반한환다. (layout호출시에는 true)</ko>
			 * @param {Number} param.distance the distance of moved top-element after layoutComplete event is triggered. in order words, prepended distance or height <ko>최상단 엘리먼트가 layoutComplete 이벤트 발생 후,이동되어진 거리. 즉, prepend 되어 늘어난 거리(높이)</ko>
			 * @param {Number} param.croppedCount the count of removed elements for recycle-dom. <ko>순환 구조에 의해, 삭제된 엘리먼트 개수</ko>
			 */
			this.trigger(this._prefix + EVENTS.layoutComplete, {
				target: e.concat(),
				isAppend: isAppend,
				distance: distance,
				croppedCount: this._removedContent
			});
		},

		// $elements => $([HTMLElement, HTMLElement, ...])
		_insert: function($elements, groupKey, isAppend) {
			if ($elements.length === 0) {
				return;
			}
			this._isAppendType = isAppend;
			var elements = $elements.toArray();
			var $cloneElements = $(elements);
			var i = 0;
			var item;
			var items = this.core.itemize(elements, groupKey);
			while (item = items[i++]) {
				item.isAppend = isAppend;
				item.oldVisibility = item.element.style.visibility;
				item.element.style.visibility = "hidden";
			}
			if (isAppend) {
				this.core.items = this.core.items.concat(items);
			} else {
				this.core.items = items.concat(this.core.items.slice(0));
				items = items.reverse();
			}
			if (this.isRecycling()) {
				this._adjustRange(isAppend, $cloneElements);
			}
			var noChild = this.core.$element.children().length === 0;
			this.core.$element[isAppend ? "append" : "prepend"]($cloneElements);
			noChild && this.core.resetLayout();		// for init-items

			var needCheck = this._checkImageLoaded($cloneElements);
			if (needCheck.length > 0) {
				this._waitImageLoaded(items, needCheck);
			} else {
				// convert to async
				var self = this;
				setTimeout(function() {
					self.core.layoutItems(items, true);
				}, 0);
			}
		},
		_adjustRange: function (isTop, $elements) {
			var diff = this.core.items.length - this.core.options.count;
			var targets;
			var idx;
			if (diff <= 0 || (idx = this._getDelimiterIndex(isTop, diff)) < 0) {
				return;
			}
			if (isTop) {
				targets = this.core.items.slice(0, idx);
				this.core.items = this.core.items.slice(idx);
				this._isFitted = false;
			} else {
				targets = this.core.items.slice(idx);
				this.core.items = this.core.items.slice(0, idx);
			}

			// @todo improve performance
			var i = 0;
			var item;
			var el;
			while (item = targets[i++]) {
				el = item.element;
				idx = $elements.index(el);
				if (idx !== -1) {
					$elements.splice(idx, 1);
				} else {
					el.parentNode.removeChild(el);
				}
			}
			this._removedContent += isTop ? targets.length : -targets.length;

		},
		_getDelimiterIndex: function(isTop, removeCount) {
			var len = this.core.items.length;
			var i;
			var idx = 0;
			var baseIdx = isTop ? removeCount - 1 : len - removeCount;
			var targetIdx = baseIdx + (isTop ? 1 : -1);
			var groupKey = this.core.items[baseIdx].groupKey;
			if (groupKey != null && groupKey === this.core.items[targetIdx].groupKey) {
				if (isTop) {
					for (i = baseIdx; i > 0; i--) {
						if (groupKey !== this.core.items[i].groupKey) {
							break;
						}
					}
					idx =  i === 0 ? -1 : i + 1;
				} else {
					for (i = baseIdx; i < len; i++) {
						if (groupKey !== this.core.items[i].groupKey) {
							break;
						}
					}
					idx = i === len ? -1 : i;
				}
			} else {
				idx = isTop ? targetIdx : baseIdx;
			}
			return idx;
		},

		// fit size
		_fit: function(applyDom) {
			// for caching
			if (this.core.options.count <= 0) {
				this._fit = function() {
					return false;
				};
				this._isFitted = true;
				return false;
			}

			if (this._isFitted) {
				return false;
			}

			var item;
			var height;
			var i = 0;
			var y = this.core.updateCols();	// for prepend
			while (item = this.core.items[i++]) {
				item.position.y -= y;
				applyDom && item.css({
					"top": item.position.y + "px"
				});
			}
			this.core.updateCols(true);	// for append
			height = this.core._getContainerSize().height;
			applyDom && this.core._setContainerMeasure(height, false);
			this._isFitted = true;
			return true;
		},

		/**
		 * Remove white space which was removed by append action.
		 * @ko append에 의해 제거된 빈공간을 제거한다.
		 * @method eg.InfiniteGrid#fit
		 * @return {Number} distance if empty space is removed, value is not zero. <ko>빈공간이 제거되면 0이 아닌 값을 반환</ko>
		 */
		fit: function() {
			var item = this._getTopItem();
			var distance = item ? item.position.y : 0;
			this._fit(true);
			return distance;
		},
		_reset: function(isLayoutComplete) {
			if (!isLayoutComplete) {
				this._isFitted = true;
				this._isRecycling = false;
				this._removedContent = 0;
			}
			this._isAppendType = null;
			this._isProcessing = false;
		},
		_checkImageLoaded: function($elements) {
			var needCheck = [];
			$elements.each(function(k, v) {
				if (v.nodeName === "IMG") {
					!v.complete && needCheck.push(v);
				} else if (v.nodeType &&
					(v.nodeType === 1 || v.nodeType === 9 || v.nodeType === 11)) {	// ELEMENT_NODE, DOCUMENT_NODE, DOCUMENT_FRAGMENT_NODE
					needCheck = needCheck.concat($(v).find("img").filter(function(fk, fv) {
						return !fv.complete;
					}).toArray());
				}
			});
			return needCheck;
		},
		_waitImageLoaded: function(items, needCheck) {
			var core = this.core;
			var checkCount = needCheck.length;
			var onCheck = function(e) {
				checkCount--;
				$(e.target).off("load error");
				checkCount <= 0 && core.layoutItems(items, true);
			};
			$.each(needCheck, function(k, v) {
				$(v).on("load error", onCheck);
			});
		},
		/**
		 * Release resources and unbind custom events
		 * @ko 모든 커스텀 이벤트와 자원을 해제한다.
		 * @method eg.InfiniteGrid#destroy
		 */
		destroy: function() {
			if (this.core) {
				this.core.destroy();
				this.core = null;
			}
			this.$view.off("resize", this._onResize)
				.off("scroll", this._onScroll);
			this.off();
		}
	});
});
/**
 * InfiniteGrid in jQuery plugin
 * @ko InfiniteGrid in jQuery plugin
 * @method jQuery.infiniteGrid
 * @example
     <ul id="grid">
        <li class="item">
          <div>test1</div>
        </li>
        <li class="item">
          <div>test3</div>
        </li>
      </ul>
    <script>
	// create
	$("#grid").infiniteGrid({
        itemSelector : ".item"
    });
 	// method
 	$("#grid").infiniteGrid("option","itemSelector",".selected"); //Set option
 	$("#grid").infiniteGrid("instance"); // Return infiniteGrid instance
 	$("#grid").infiniteGrid("getBottomElement"); // Get bottom element
 	</script>
 * @see eg.InfiniteGrid
 */
 /**
 * infiniteGrid:layoutComplete jQuery event plugin
 *
 * @ko infiniteGrid:layoutComplete jQuery event plugin
 * @name jQuery#infiniteGrid:layoutComplete
 * @event
 * @example
     <ul id="grid">
        <li class="item">
          <div>test1</div>
        </li>
        <li class="item">
          <div>test3</div>
        </li>
      </ul>
    <script>
	// create
	$("#grid").infiniteGrid({
        itemSelector : ".item"
    });
 	// event
 	$("#grid").on("infiniteGrid:layoutComplete",callback);
 	$("#grid").off("infiniteGrid:layoutComplete",callback);
 	$("#grid").trigger("infiniteGrid:layoutComplete",callback);
 	</script>
 * @see eg.InfiniteGrid#event:layoutComplete
 */
/**
 * infiniteGrid:append jQuery event plugin
 *
 * @ko infiniteGrid:append jQuery event plugin
 * @name jQuery#infiniteGrid:append
 * @event
 * @example
     <ul id="grid">
        <li class="item">
          <div>test1</div>
        </li>
        <li class="item">
          <div>test3</div>
        </li>
      </ul>
    <script>
	// create
	$("#grid").infiniteGrid({
        itemSelector : ".item"
    });
 	// event
 	$("#grid").on("infiniteGrid:append",callback);
 	$("#grid").off("infiniteGrid:append",callback);
 	$("#grid").trigger("infiniteGrid:append",callback);
 	</script>
 * @see eg.InfiniteGrid#event:append
 */
/**
 * infiniteGrid:prepend jQuery event plugin
 *
 * @ko infiniteGrid:prepend jQuery event plugin
 * @name jQuery#infiniteGrid:prepend
 * @event
 * @example
     <ul id="grid">
        <li class="item">
          <div>test1</div>
        </li>
        <li class="item">
          <div>test3</div>
        </li>
      </ul>
    <script>
	// create
	$("#grid").infiniteGrid({
        itemSelector : ".item"
    });
 	// event
 	$("#grid").on("infiniteGrid:prepend",callback);
 	$("#grid").off("infiniteGrid:prepend",callback);
 	$("#grid").trigger("infiniteGrid:prepend",callback);
 	</script>
 * @see eg.InfiniteGrid#event:prepend
 */