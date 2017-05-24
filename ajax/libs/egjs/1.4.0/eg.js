/**
* Copyright (c) 2015 NAVER corp.
* egjs projects are licensed under the MIT license
* https://naver.github.io/egjs/license.txt
*
* egjs JavaScript library
* http://naver.github.io/egjs
*
* @version 1.4.0
* @SHA-1 ee5fdd1 (1.4.0-rc)
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

		if (!(eg[upperCamelCase] && eg[upperCamelCase].prototype &&
			eg[upperCamelCase].prototype._events)) {
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

eg.module("agent", [eg], function(ns) {
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

	var UA;

	function getBrowserName(browserRules) {
		return getIdentityStringFromArray(
			browserRules,
			userAgentRules.defaultString.browser
		);
	}

	function getBrowserVersion(browserName) {
		var browserVersion;
		var versionToken;

		if (!browserName) {
			return;
		}
		versionToken = getBrowserRule(browserName).versionSearch || browserName;
		browserVersion = extractBrowserVersion(versionToken, UA);
		return browserVersion;
	}

	function extractBrowserVersion(versionToken, ua) {
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
	}

	function getOSName(osRules) {
		return getIdentityStringFromArray(
			osRules,
			userAgentRules.defaultString.os
		);
	}

	function getOSVersion(osName) {
		var ua = UA;
		var osRule = getOSRule(osName) || {};
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
	}

	function getOSRule(osName) {
		return getRule(userAgentRules.os, osName);
	}

	function getBrowserRule(browserName) {
		return getRule(userAgentRules.browser, browserName);
	}

	function getRule(rules, targetIdentity) {
		var criteria;
		var identityMatched;

		for (var i = 0, rule; rule = rules[i]; i++) {
			criteria = rule.criteria;
			identityMatched =
				new RegExp(rule.identity, "i").test(targetIdentity);
			if (criteria ?
				identityMatched && isMatched(UA, criteria) :
				identityMatched) {
				return rule;
			}
		}
	}
	function getIdentityStringFromArray(rules, defaultStrings) {
		for (var i = 0, rule; rule = rules[i]; i++) {
			if (isMatched(UA, rule.criteria)) {
				return rule.identity || defaultStrings.name;
			}
		}
		return defaultStrings.name;
	}
	function isMatched(base, target) {
		return target &&
			target.test ? !!target.test(base) : base.indexOf(target) > -1;
	}
	function isWebview() {
		var ua = UA;
		var webviewRules = userAgentRules.webview;
		var ret = false;
		var browserVersion;

		for (var i = 0, rule; rule = webviewRules[i]; i++) {
			if (!isMatched(ua, rule.criteria)) {
				continue;
			}

			browserVersion =
				extractBrowserVersion(rule.browserVersionSearch, ua);

			if (isMatched(ua, rule.webviewToken) ||
				isMatched(browserVersion, rule.webviewBrowserVersion)) {
				ret = true;
				break;
			}
		}

		return ret;
	}

	ns.Agent = {
		"create": function(useragent) {
			this.ua = UA = useragent;
			var agent = {
				os: {},
				browser: {}
			};
			agent.browser.name = getBrowserName(userAgentRules.browser);
			agent.browser.version = getBrowserVersion(agent.browser.name);
			agent.os.name = getOSName(userAgentRules.os);
			agent.os.version = getOSVersion(agent.os.name);
			agent.browser.webview = isWebview();

			agent.browser.name = agent.browser.name.toLowerCase();
			agent.os.name = agent.os.name.toLowerCase();

			return agent;
		}
	};
});
/**
* Copyright (c) 2015 NAVER Corp.
* egjs projects are licensed under the MIT license
*/

eg.module("raf", [eg, window], function(ns, global) {
var raf = global.requestAnimationFrame || global.webkitRequestAnimationFrame ||
				global.mozRequestAnimationFrame || global.msRequestAnimationFrame;
	var caf = global.cancelAnimationFrame || global.webkitCancelAnimationFrame ||
				global.mozCancelAnimationFrame || global.msCancelAnimationFrame;

	// https://gist.github.com/paulirish/5438650
	(function() {

		if ("performance" in global === false) {
			global.performance = {};
		}

		global.Date.now = (global.Date.now || function () {  // thanks IE8
			return new global.Date().getTime();
		});

		if ("now" in global.performance === false) {

			var nowOffset = global.Date.now();

			if (global.performance.timing && global.performance.timing.navigationStart) {
				nowOffset = global.performance.timing.navigationStart;
			}

			global.performance.now = function now() {
				return global.Date.now() - nowOffset;
			};
		}

	})();

	if (raf && !caf) {
		var keyInfo = {};
		var oldraf = raf;
		raf = function(callback) {
			function wrapCallback(timestamp) {
				if (keyInfo[key]) {
					callback(timestamp);
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
			return global.setTimeout(function() {
				callback(global.performance.now());
			}, 16);
		};
		caf = global.clearTimeout;
	}

	/**
	* A polyfill for the window.requestAnimationFrame() method.
	* @ko window.requestAnimationFrame() 메서드의 polyfill 함수다
	* @method eg#requestAnimationFrame
	* @param {Function} timer The function returned through a call to the requestAnimationFrame() method <ko>requestAnimationFrame() 메서드가 호출할 함수</ko>
	* @return {Number} ID of the requestAnimationFrame() method. <ko>requestAnimationFrame() 메서드의 아이디</ko>
	* @example
		var timerId = eg.requestAnimationFrame(function() {
			console.log("call");
		});
	* @see  https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
	*/
	ns.requestAnimationFrame = function(fp) {
		return raf(fp);
	};
	/**
	* A polyfill for the window.cancelAnimationFrame() method. It cancels an animation executed through a call to the requestAnimationFrame() method.
	* @ko window.cancelAnimationFrame() 메서드의 polyfill 함수다. requestAnimationFrame() 메서드로 실행한 애니메이션을 중단한다
	* @method eg#cancelAnimationFrame
	* @param {Number} key −	The ID value returned through a call to the requestAnimationFrame() method. <ko>requestAnimationFrame() 메서드가 반환한 아이디 값</ko>
	* @example
		eg.cancelAnimationFrame(timerId);
	* @see  https://developer.mozilla.org/en-US/docs/Web/API/Window/cancelAnimationFrame
	*/
	ns.cancelAnimationFrame = function(key) {
		caf(key);
	};
});

/**
* Copyright (c) 2015 NAVER Corp.
* egjs projects are licensed under the MIT license
*/

eg.module("eg", ["jQuery", eg, window, eg.Agent], function($, ns, global, Agent) {
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
	 * @description The version numbers of egjs.
	 * @ko egjs 버전
	 */
	ns.VERSION = "1.4.0";
	ns.hook =  {};
	/**
	* Returns the User-Agent information
	* @ko user-agent 정보를 반환한다.
	* @method eg#agent
	* @return {Object} agent
	* @return {Object} agent.os os Operating system information <ko>운영체제 정보</ko>
	* @return {String} agent.os.name Operating system name (android, ios, window, mac) <ko>운영체제 이름 (android, ios, window, mac)</ko>
	* @return {String} agent.os.version Operating system version <ko>운영체제 버전</ko>
	* @return {String} agent.browser Browser information <ko>브라우저 정보</ko>
	* @return {String} agent.browser.name Browser name (default, safari, chrome, sbrowser, ie, firefox) <ko>브라우저 이름 (default, safari, chrome, sbrowser, ie, firefox)</ko>
	* @return {String} agent.browser.version Browser version <ko>브라우저 버전 </ko>
	* @return {String} agent.browser.webview Indicates whether a WebView browser is available<ko>웹뷰 브라우저 여부</ko>
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
	ns.agent = function() {
		var info = Agent.create(global.navigator.userAgent);
		return resultCache(this, "agent", [info], info);
	};

	/**
	 * Returns the syntax of the translate style which is applied to CSS transition properties.
	 *
	 * @ko CSS 트랜지션 속성에 적용할 translate 스타일 구문을 반환한다
	 * @method eg#translate
	 * @param {String} x Distance to move along the X axis <ko>x축을 따라 이동할 거리</ko>
	 * @param {String} y Distance to move along the Y axis <ko>y축을 따라 이동할 거리</ko>
	 * @param {Boolean} [isHA] Force hardware acceleration <ko>하드웨어 가속 사용 여부</ko>
	 * @return {String} Syntax of the translate style <ko>translate 스타일 구문</ko>
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
	 * Checks whether hardware acceleration is enabled.
	 *
	 * @ko 하드웨어 가속을 사용할 수 있는 환경인지 확인한다
	 * @method eg#isHWAccelerable
	 * @return {Boolean} Indicates whether hardware acceleration is enabled. <ko>하드웨어 가속 사용 가능 여부</ko>
	 * @example
eg.isHWAccelerable();  // Returns 'true' when hardware acceleration is supported

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
			useragent = (Agent.ua.match(/\(.*\)/) || [null])[0];

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
	 * Checks whether CSS transition properties can be used.
	 *
	 * @ko CSS 트랜지션 속성을 사용할 수 있는 환경인지 확인한다.
	 * @method eg#isTransitional
	 * @return {Boolean} Indicates whether CSS transition properties can be used. <ko>CSS 트랜지션 속성 사용 가능 여부</ko>
	 * @example
eg.isTransitional();  // Returns 'true' when CSS transition is supported.

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

		if (/chrome|firefox|sbrowser/.test(browser)) {
			result = true;
		} else {
			switch (agent.os.name) {
				case "ios" :
					result = /safari|inapp/.test(browser) &&
							parseInt(agent.os.version, 10) < 6;
					break;
				case "window" :
					result = /safari/.test(browser) ||
							(/ie/.test(browser) &&
								parseInt(agent.browser.nativeVersion, 10) >= 10);
					break;
				default :
					result = /safari/.test(browser);
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

	$ && $.extend($.easing, {
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
	 * A module used to implement an application in object-oriented programming style
	 * @group egjs
	 * @ko 애플리케이션을 객체지향 프로그래밍 방식으로 구현할 때 사용하는 모듈
	 * @class
	 * @name eg.Class
	 *
	 * @support {"ie": "7+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.1+ (except 3.x)"}
	 * @param {Object} def definition. Follow the rules under <a href="https://en.wikipedia.org/wiki/Literal_(computer_programming)">Literals of objects</a>. Note that "construct" is a key reserved as a constructor function. <ko>클래스를 정의하는 부분. <a href="https://en.wikipedia.org/wiki/Literal_(computer_programming)">객체 리터럴 규칙</a>을 따른다. 단, 'construct'는 생성자 함수로 예약된 키다</ko>
	 * @param {Function} [def.construct] The constructor of the class <ko>클래스 생성자 함수 (Optional)</ko>
	 *
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
		 * Returns an instance of a class itself.
		 * @ko 클래스 자신의 인스턴스를 반환한다.
		 * @method eg.Class#instance
		 * @return {eg.Class} An instance of a class itself<ko>클래스 자신의 인스턴스</ko>
		 */
		typeClass.prototype.instance = function() {
			return this;
		};

		typeClass.prototype.constructor = typeClass;
		return typeClass;
	};
	/**
	 * Extends a class.
	 * @ko 클래스를 상속한다.
	 * @static
	 * @method eg.Class.extend
	 * @param {eg.Class} oSuperClass Superclass <ko>상속하려는 클래스</ko>
	 * @param {Object} def Class definition. Follow the rules under <a href="https://en.wikipedia.org/wiki/Literal_(computer_programming)">Literals of objects</a>. Note that "construct" is a key reserved as a constructor function. <ko>클래스를 정의하는 부분. <a href="https://en.wikipedia.org/wiki/Literal_(computer_programming)">객체 리터럴 규칙</a>을 따른다. 단, 'construct'는 생성자 함수로 예약된 키다.</ko>
	 * @param {Function} [def.construct] The constructor of the class <ko>클래스 생성자 함수 (Optional)</ko>
	 * @return {eg.Class} An instance of a new class <ko>새로 생성된 클래스의 인스턴스</ko>
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
	 * A class used to manage events and options in a component
	 * @class
	 * @group egjs
	 * @name eg.Component
	 * @ko 컴포넌트의 이벤트와 옵션을 관리할 수 있게 하는 클래스
	 *
	 * @support {"ie": "7+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.1+ (except 3.x)"}
	 */
	ns.Component = ns.Class({
		construct: function() {
			// The reference count does not support yet.
			// this.constructor.$count = (this.constructor.$count || 0) + 1;
			this.eventHandler = {};
			this.options = {};
		},
		/**
		 * Sets options in a component or returns them.
		 * @ko 컴포넌트에 옵션을 설정하거나 옵션을 반환한다
		 * @method eg.Component#option
		 * @param {String} key The key of the option<ko>옵션의 키</ko>
		 * @param {Object} [value] The option value that corresponds to a given key <ko>키에 해당하는 옵션값</ko>
		 * @return {eg.Component|Object} An instance, an option value, or an option object of a component itself.<br>- If both key and value are used to set an option, it returns an instance of a component itself.<br>- If only a key is specified for the parameter, it returns the option value corresponding to a given key.<br>- If nothing is specified, it returns an option object. <ko>컴포넌트 자신의 인스턴스나 옵션값, 옵션 객체.<br>- 키와 값으로 옵션을 설정하면 컴포넌트 자신의 인스턴스를 반환한다.<br>- 파라미터에 키만 설정하면 키에 해당하는 옵션값을 반환한다.<br>- 파라미터에 아무것도 설정하지 않으면 옵션 객체를 반환한다.</ko>
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
		 * Triggers a custom event.
		 * @ko 커스텀 이벤트를 발생시킨다
		 * @method eg.Component#trigger
		 * @param {String} eventName The name of the custom event to be triggered <ko>발생할 커스텀 이벤트의 이름</ko>
		 * @param {Object} customEvent Event data to be sent when triggering a custom event <ko>커스텀 이벤트가 발생할 때 전달할 데이터</ko>
		 * @return {Boolean} Indicates whether the event has occurred. If the stop() method is called by a custom event handler, it will return false and prevent the event from occurring. <ko>이벤트 발생 여부. 커스텀 이벤트 핸들러에서 stop() 메서드를 호출하면 'false'를 반환하고 이벤트 발생을 중단한다.</ko>
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
		 * Checks whether an event has been attached to a component.
		 * @ko 컴포넌트에 이벤트가 등록됐는지 확인한다.
		 * @method eg.Component#hasOn
		 * @param {String} eventName The name of the event to be attached <ko>등록 여부를 확인할 이벤트의 이름</ko>
		 * @return {Boolean} Indicates whether the event is attached. <ko>이벤트 등록 여부</ko>
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
		 * Attaches an event to a component.
		 * @ko 컴포넌트에 이벤트를 등록한다.
		 * @method eg.Component#on
		 * @param {eventName} eventName The name of the event to be attached <ko>등록할 이벤트의 이름</ko>
		 * @param {Function} handlerToAttach The handler function of the event to be attached <ko>등록할 이벤트의 핸들러 함수</ko>
		 * @return {eg.Component} An instance of a component itself<ko>컴포넌트 자신의 인스턴스</ko>
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
		 * Detaches an event from the component.
		 * @ko 컴포넌트에 등록된 이벤트를 해제한다
		 * @method eg.Component#off
		 * @param {eventName} eventName The name of the event to be detached <ko>해제할 이벤트의 이름</ko>
		 * @param {Function} handlerToDetach The handler function of the event to be detached <ko>해제할 이벤트의 핸들러 함수</ko>
		 * @return {eg.Component} An instance of a component itself <ko>컴포넌트 자신의 인스턴스</ko>
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
	 * This jQuery custom event is fired when device rotates.
	 *
	 * @ko 기기가 회전할 때 발생하는 jQuery 커스텀 이벤트
	 * @name jQuery#rotate
	 * @event
	 * @param {Event} e The Event object in jQuery<ko>jQuery의 Event 객체</ko>
	 * @param {Object} info The object of data to be sent when the event is fired<ko>이벤트가 발생할 때 전달되는 데이터 객체</ko>
	 * @param {Boolean} info.isVertical The orientation of the device (true: portrait, false: landscape) <ko>기기의 화면 방향(true: 수직 방향, false: 수평 방향)</ko>
	 * @support { "ios" : "7+", "an" : "2.1+ (except 3.x)"}
	 * @example
	 * $(window).on("rotate",function(e, info){
	 *      info.isVertical;
	 * });
	 *
	 */

	var beforeScreenWidth = -1;
	var beforeVertical = null;
	var rotateTimer = null;

	var agent = (function() {
		var ua = global.navigator.userAgent;
		var match = ua.match(/(iPhone OS|CPU OS|Android)\s([^\s;-]+)/);  // fetch Android & iOS env only
		var res = {
			os: "",
			version: ""
		};

		if (match) {
			res.os = match[1].replace(/(?:CPU|iPhone)\sOS/, "ios").toLowerCase();
			res.version = match[2].replace(/\D/g, ".");
		}

		return res;
	})();

	var isMobile = /android|ios/.test(agent.os);

	if (!isMobile) {
		ns.isPortrait = function() {
			return false;
		};

		return;
	}

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
		if ((agent.os === "android" && agent.version === "2.1")) {//|| htInfo.galaxyTab2)
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
				beforeScreenWidth = doc.documentElement.clientWidth;
				$(global).trigger("rotate", {
					isVertical: beforeVertical
				});
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
			if (agent.os === "android") {
				screenWidth = doc.documentElement.clientWidth;
				if (e.type === "orientationchange" && screenWidth === beforeScreenWidth) {
					global.setTimeout(function() {
						handler(e);
					}, 500);

					// When width value wasn't changed after firing orientationchange, then call handler again after 300ms.
					return false;
				}
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
	 * Checks whether the current orientation of the device is portrait.
	 * @ko 기기의 화면이 수직 방향인지 확인한다
	 * @method eg#isPortrait
	 * @return {Boolean} The orientation of the device (true: portrait, false: landscape) <ko>기기의 화면 방향(true: 수직 방향, false: 수평 방향)</ko>
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
	* A custom event in jQuery occurs when scroll ends.
	* @ko 스크롤이 끝날 때 발생하는 jQuery 커스텀 이벤트
	* @name jQuery#scrollEnd
	* @event
	* @param {Event} e The Event object in jQuery <ko>jQuery의 Event 객체</ko>
	* @param {Object} info The object of data to be sent when the event is fired<ko>이벤트가 발생할 때 전달되는 데이터 객체</ko>
	* @param {Number} info.top The size of the vertical scroll pane (unit: px)<ko>세로 스크롤 영역의 크기(단위: px)</ko>
	* @param {Number} info.left The size of horizontal scroll pane (unit: px)<ko>가로 스크롤 영역의 크기(단위: px)</ko>
	* @support {"ie": "9+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.1+ (except 3.x)"}
	* @example
	* $(window).on("scrollend",function(e, info){
	*      info.top;
	*      info.left;
	* });
	*
	*/

	var scrollEndTimer;
	var userAgent = global.navigator.userAgent;
	var rotateFlag = false;

	var CHROME = 3;
	var TIMERBASE = 2;
	var TOUCHBASE = 1;
	var SCROLLBASE = 0;

	var latency = 250;

	var detectType = getDetectType(userAgent);

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
	function getDetectType(userAgent) {
		var deviceName;
		var osVersion;
		var retValue = TIMERBASE;
		var matchedDevice = userAgent.match(/iPhone|iPad|Android/);
		var webviewToken = /NAVER|DAUM|; wv/;
		var webviewToken2 = /Version/;

		// webview : TIMERBASE
		if (matchedDevice !== null && !webviewToken.test(userAgent)) {
			deviceName = matchedDevice[0];

			// Browsers that trigger scroll event like scrollstop : SCROLLBASE
			osVersion = userAgent.match(/\s(\d{1,2})_\d/);

			if (deviceName !== "Android" && webviewToken2.test(userAgent) && osVersion && parseInt(osVersion[1], 10) <= 7) {
				retValue = SCROLLBASE;
			} else if (deviceName === "Android") {
				osVersion = userAgent.match(/Android\b(.*?);/);
				if (!/Chrome/.test(userAgent) && osVersion && parseFloat(osVersion, 10) <= 2.3) {
					retValue = SCROLLBASE;
				}
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

		switch (detectType) {
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
		detectType: detectType,
		getDetectType: getDetectType,
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

/**
 * A method that extends the <a href=http://api.jquery.com/animate/>.animate()</a> method provided by jQuery. With this method, you can use the transform property and 3D acceleration
 * @ko jQuery의<a href=http://api.jquery.com/animate/>animate() 메서드</a>를 확장한 메서드. CSS의 transform 속성과 3D 가속을 사용할 수 있다.
 * @name jQuery#animate
 * @method
 * @param {Object} properties An object composed of the CSS property and value which will be applied to an animation<ko>애니메이션을 적용할 CSS 속성과 값으로 구성된 객체</ko>
 * @param {Number|String} [duration=4000] Duration of the animation (unit: ms)<ko>애니메이션 진행 시간(단위: ms)</ko>
 * @param {String} [easing="swing"] The easing function to apply to an animation<ko>애니메이션에 적용할 easing 함수</ko>
 * @param {Function} [complete] A function that is called once the animation is complete.<ko>애니메이션을 완료한 다음 호출할 함수</ko>
 *
 * @example
 * $("#box")
 * 		.animate({"transform" : "translate3d(150px, 100px, 0px) rotate(20deg) scaleX(1)"} , 3000)
 * 		.animate({"transform" : "+=translate3d(150px, 10%, -20px) rotate(20deg) scale3d(2, 4.2, 1)"} , 3000);
 * @see {@link http://api.jquery.com/animate/}
 *
 * @support {"ie": "10+", "ch" : "latest", "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.3+ (except 3.x)"}
 */
eg.module("transform", ["jQuery", window], function($) {
/**
	 * Get a 'px' converted value if it has a %.
	 * Otherwise it returns value appened with 'px'.
	 */
	function getConverted(val, base) {
		var ret = val;
		var num = val.match(/((-|\+)*[0-9]+)%/);

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
		var m = val.match(/((-|\+)*[\d|\.]+)(px|deg|rad)*/);
		if (m && m.length >= 1) {
			return {"num": parseFloat(m[1]), "unit": m[3]};
		}
	}

	function getTransformGenerateFunction(transform) {
		var splitted = transform.split(")");
		var list = [];

		//Make parsed transform list.
		for (var i = 0, len = splitted.length - 1; i < len; i++) {
			var parsed = parseStyle(splitted[i]);

			parsed[1] = $.map(parsed[1], toParsedFloat);
			list.push(parsed);
		}

		return function transformByPos(pos) {
			var transform = "";
			var defaultVal = 0;

			$.each(list, function(i) {
				if (list[i][0].indexOf("scale") >= 0) {
					defaultVal = 1;
				} else {
					defaultVal = 0;
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
		var basePos;

		// Convert translate unit to 'px'.
		endTf = correctUnit(endTf,
					parseFloat($.css(element, "width")) || 0,
					parseFloat($.css(element, "height")) || 0);

		if (isRelative) {
			start = (!startTf || startTf === "none") ?
						"matrix(1, 0, 0, 1, 0, 0)" : startTf;
			end = getTransformGenerateFunction(endTf);
		} else {
			start = toMatrixArray(startTf);
			basePos = toMatrixArray("none");//transform base-position

			//If the type of matrix is not equal, then match to matrix3d
			if (start[1].length < basePos[1].length) {
				start = toMatrix3d(start);
			} else if (start[1].length > basePos[1].length) {
				basePos = toMatrix3d(basePos);
			}

			end = getTransformGenerateFunction(endTf);
		}

		return function(pos) {
			var result = [];
			var ret = "";//matrix for interpolated value from current to base(1, 0, 0, 1, 0, 0)

			if (isRelative) {
				// This means a muliply between a matrix and a transform.
				return start + end(pos);
			}

			if (pos === 1) {
				ret = data2String(basePos);
			} else {
				for (var i = 0, s, e, l = start[1].length; i < l; i++) {
					s = parseFloat(start[1][i]);
					e = parseFloat(basePos[1][i]);

					result.push(s + (e - s) * pos);
				}

				ret = data2String([start[0], result]);
			}

			return ret + end(pos);
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

	/**
	 * Convert matrix string to array type.
	 *
	 * eg. matrix(1, 0, 0, 1, 0, 0) ==>  ["matrix", [1, 0, 0, 1, 0, 0]]
	 * matrix3d(1,0,0,0,0,1,-2.44929e-16,0,0,2.44929e-16,1,0,0,0,0,1)
	 */
	function toMatrixArray(matrixStr) {
		var matched;

		if (!matrixStr || matrixStr === "none") {
			return ["matrix", [ "1", "0", "0", "1", "0", "0"] ];
		}

		matrixStr = matrixStr.replace(/\s/g, "");
		matched = matrixStr.match(/(matrix)(3d)*\((.*)\)/);

		return [matched[1] + (matched[2] || ""), matched[3].split(",")];
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
		toMatrix: toMatrixArray,
		toMatrix3d: toMatrix3d
	};
});

/**
* Copyright (c) 2015 NAVER Corp.
* egjs projects are licensed under the MIT license
*/

eg.module("cssPrefix", ["jQuery", document], function($, doc) {
/**
	 * Enables to add CSS vendor prefixes when you use some jQuery version(1.4.3 ~ 1.8.x) that does not support them.
	 * @ko css에 vender prefix를 자동으로 추가하는 cssHooks이다. 지원하지 않는 jQuery 1.4.3 ~ 1.8.x에서만 활성화 된다.
	 *
	 * @name jQuery#cssPrefix
	 * @method
	 *
	 * @support {"ie": "10+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.1+ (except 3.x)"}
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
	var matchTest = ($.fn.jquery.match(/^\d\.\d+/) || [])[0];
	if (!matchTest || +matchTest.replace(/\D/, "") >= 18) {
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
eg.module("pauseResume", ["jQuery"], function($) {
var animateFn = $.fn.animate;
	var stopFn = $.fn.stop;
	var delayFn = $.fn.delay;
	var uuid = 1;

	function AniProperty(type, el, prop, optall) {
		this.el = el;
		this.opt = optall;
		this.start = -1;
		this.elapsed = 0;
		this.paused = false;
		this.uuid = uuid++;
		this.easingNames = [];
		this.prop = prop;
		this.type = type;
	}

	/**
	 * Generate a new absolute value maker.
	 *
	 * function to avoid JS Hint error "Don't make functions within a loop"
	 */
	function generateAbsoluteValMaker(prevValue, propName, sign) {
		return function absoluteValMaker(match) {
			if (!prevValue || prevValue === "auto") {
				// Empty strings, null, undefined and "auto" are converted to 0.
				// This solution is somewhat extracted from jQuery Tween.propHooks._default.get
				// TODO: Should we consider adopting a Tween.propHooks?
				prevValue = 0;
			} else {
				prevValue = parseFloat(prevValue);
			}
			return prevValue + (match * sign);
		};
	}

	AniProperty.prototype.init = function() {
		var currValue;
		this.start = $.now();
		this.elapsed = 0;

		for (var propName in this.prop) {
			var propValue = this.prop[propName];
			var markIndex;
			var sign;

			// DO NOT SUPPORT TRANSFORM YET
			// TODO: convert from relative value to absolute value on transform
			if (propName === "transform") {
				continue;
			}

			//If it has a absoulte value.
			if (typeof propValue !== "string" ||
				(markIndex = propValue.search(/[+|-]=/)) < 0) {
				// this.prop[propName] = propValue;
				continue;
			}

			//If it has a relative value
			sign = propValue.charAt(markIndex) === "-" ? -1 : 1;

			// Current value
			currValue = $.css(this.el, propName);

			// CurrValue + (relativeValue)
			this.prop[propName] = propValue
				.replace(/([-|+])*([\d|\.])+/g,
					generateAbsoluteValMaker(currValue, propName, sign))
				.replace(/[-|+]+=/g, "");
		}
	};

	AniProperty.prototype.addEasingFn = function(easingName) {
		this.easingNames.push(easingName);
	};

	AniProperty.prototype.clearEasingFn = function() {
		var easing;
		while (easing = this.easingNames.shift()) {
			delete $.easing[easing];
		}
		this.easingNames = [];
	};

	function addAniProperty(type, el, prop, optall) {
		var newProp;

		newProp = new AniProperty(type, el, prop, optall);
		el.__aniProps = el.__aniProps || [];

		//Animation is excuted immediately.
		if (el.__aniProps.length === 0) {
			newProp.init();
		}
		el.__aniProps.push(newProp);
	}

	function removeAniProperty(el) {
		var removeProp = el.__aniProps.shift();
		removeProp && removeProp.clearEasingFn();

		el.__aniProps[0] && el.__aniProps[0].init();
	}

	$.fn.animate = function(prop, speed, easing, callback) {
		return this.each(function() {
			//optall should be made for each elements.
			var optall = $.speed(speed, easing, callback);

			// prepare next animation when current animation completed.
			optall.complete = function() {
				prepareNextAniProp(this);
			};

			//Queue animation property to recover the current animation.
			addAniProperty("animate", this, prop, optall);
			animateFn.call($(this), prop, optall);
		});

		// TODO: Below code is more reasonable?
		// return animateFn.call(this, prop, optall); // and declare optall at outside this.each loop.
	};

	// Check if this element can be paused/resume.
	function getStatus(el) {
		if (!el.__aniProps || el.__aniProps.length === 0) {
			// Current element doesn't have animation information.
			// Check 'animate' is applied to this element.
			return "empty";
		}

		return el.__aniProps[0].paused ? "paused" : "inprogress";
	}

	/**
	 * Set a timer to delay execution of subsequent items in the queue.
	 * And it internally manages "fx"queue to support pause/resume if "fx" type.
	 *
	 * @param {Number} An integer indicating the number of milliseconds to delay execution of the next item in the queue.
	 * @param {String} A string containing the name of the queue. Defaults to fx, the standard effects queue.
	 */
	$.fn.delay = function(time, type) {
		var t;
		var isCallByResume = arguments[2];//internal used value.

		if (type && type !== "fx") {
			return delayFn.call(this, time, type);
		}

		t = parseInt(time, 10);
		t = isNaN(t) ? 0 : t;

		return this.each(function() {
			if (!isCallByResume) {
				// Queue delay property to recover the current animation.
				// Don't add property when delay is called by resume.
				addAniProperty("delay", this, null, {duration: t});
			}

			var self = this;
			delayFn.call($(this), time).queue(function(next) {
				next();

				// Remove delay property when delay has been expired.
				removeAniProperty(self);
			});
		});
	};

	/**
	 * Pauses the animation executed through a call to the jQuery <a href=http://api.jquery.com/animate/>.animate()</a> method.
	 * @ko jQuery의<a href=http://api.jquery.com/animate/>animate() 메서드</a>가 실행한 애니메이션을 일시 정지한다
	 *
	 * @name jQuery#pause
	 * @method
	 * @support {"ie": "10+", "ch" : "latest", "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.3+ (except 3.x)"}
	 * @example
	 * $("#box").pause(); //paused the current animation
	 */
	$.fn.pause = function() {
		return this.each(function() {
			var p;
			var type = "fx";

			if (getStatus(this) !== "inprogress") {
				return;
			}

			//Clear fx-queue except 1 dummy function
			//for promise not to be expired when calling stop()
			$.queue(this, type || "fx", [$.noop]);
			stopFn.call($(this));

			//Remember current animation property
			if (p = this.__aniProps[0]) {
				p.elapsed += $.now() - p.start;

				// Complement native timer's inaccuracy (complete timer can be different from your request.)
				// (eg. your request:400ms -> real :396 ~ 415 ms ))
				if (p.elapsed >= p.opt.duration) {
					p = prepareNextAniProp(this);
				}

				p && (p.paused = true);
			}
		});
	};

	function prepareNextAniProp(el) {
		var removeProp;
		var userCallback;

		// Dequeue animation property that was ended.
		removeProp = el.__aniProps.shift();
		removeProp.clearEasingFn();
		userCallback = removeProp.opt.old;

		// Callback should be called before aniProps.init()
		if (userCallback && typeof userCallback === "function") {
			userCallback.call(el);
		}

		// If next ani property exists
		el.__aniProps[0] && el.__aniProps[0].init();
		return el.__aniProps[0];
	}

	/**
	 * Resumes the animation paused through a call to the pause() method.
	 * @ko pause() 메서드가 일시 정지한 애니메이션을 다시 실행한다
	 *
	 * @name jQuery#resume
	 * @method
	 * @support {"ie": "10+", "ch" : "latest", "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.3+ (except 3.x)"}
	 * @example
	 * $("#box").resume(); //resume the paused animation
	 */
	$.fn.resume = function() {
		return this.each(function() {
			var type = "fx";
			var p;
			var i;

			if (getStatus(this) !== "paused") {
				return;
			}

			//Clear fx-queue,
			//And this queue will be initialized by animate call.
			$.queue(this, type || "fx", []);

			// Restore __aniProps
			i = 0;
			while (p = this.__aniProps[i]) {
				// Restore easing status
				if (p.elapsed > 0 && p.opt.easing) {
					var resumePercent = p.elapsed / p.opt.duration;
					var remainPercent = 1 - resumePercent;
					var originalEasing = $.easing[p.opt.easing];
					var startEasingValue = originalEasing(resumePercent);
					var scale = scaler([startEasingValue, 1], [0, 1]);
					var newEasingName = p.opt.easing + "_" + p.uuid;

					// Make new easing function that continues from pause point.
					$.easing[newEasingName] = generateNewEasingFunc(
						resumePercent, remainPercent, scale, originalEasing);
					p.opt.easing = newEasingName;

					//Store new easing function to clear it later.
					p.addEasingFn(newEasingName);
				}

				p.paused = false;
				p.opt.duration -= p.elapsed;

				// If duration remains, request 'animate' with storing aniProps
				if (p.opt.duration > 0 || p.elapsed === 0) {
					i === 0 && p.init();

					if (p.type === "delay") {
						// pass last parameter 'true' not to add an aniProperty.
						$(this).delay(p.opt.duration, "fx", true);
					} else {
						animateFn.call($(this), p.prop, p.opt);
					}
				}

				i++;
			}
		});
	};

	/**
	 * Generate a new easing function.
	 *
	 * function to avoid JS Hint error "Don't make functions within a loop"
	 */
	function generateNewEasingFunc(resumePercent, remainPercent, scale, originalEasing) {
		return function easingFunc(percent) {
			var newPercent = resumePercent + remainPercent * percent;
			return scale(originalEasing(newPercent));
		};
	}

	$.fn.stop = function(type, clearQueue) {
		var clearQ = clearQueue;
		stopFn.apply(this, arguments);

		if (typeof type !== "string") {
			clearQ = type;
		}

		return this.each(function() {
			var p;

			// When this element was not animated properly, do nothing.
			if (getStatus(this) === "empty") {
				return;
			}

			if (!clearQ) {
				p = this.__aniProps.shift();
				p && p.clearEasingFn();
			} else {
				//If clearQueue is requested,
				//then all properties must be initialized
				//for element not to be resumed.
				while (p = this.__aniProps.shift()) {
					p.clearEasingFn();
				}
				this.__aniProps = [];
			}
		});
	};

	jQuery.expr.filters.paused = function(elem) {
		return getStatus(elem) === "paused";
	};

	//Adopt linear scale from d3
	function scaler(domain, range) {
		var u = uninterpolateNumber(domain[0], domain[1]);
		var i = interpolateNumber(range[0], range[1]);

		return function(x) {
			return i(u(x));
		};
	}

	function interpolateNumber(a, b) {
		a = +a, b = +b;
		return function(t) {
			return a * (1 - t) + b * t;
		};
	}

	function uninterpolateNumber(a, b) {
		b = (b -= a = +a) || 1 / b;
		return function(x) {
			return (x - a) / b;
		};
	}
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
	var agent = ns.agent();

	var isNeeded = (function() {
		var version = parseFloat(agent.os.version);

		return !(
				agent.os.name === "ios" ||
				(agent.os.name === "mac" && agent.browser.name === "safari") ||
				(agent.os.name === "android" &&
					(version <= 4.3 && agent.browser.webview === true || version < 3))
		);
	})();

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
		if (isStorageAvailable(global.sessionStorage)) {
			return global.sessionStorage;
		} else if (isStorageAvailable(global.localStorage)) {
			return global.localStorage;
		}
	})();

	function isStorageAvailable(storage) {
		if (!storage) {
			return;
		}
		var TMP_KEY = "__tmp__" + CONST_PERSIST;

		try {
			// In case of iOS safari private mode, calling setItem on storage throws error
			storage.setItem(TMP_KEY, CONST_PERSIST);

			// In Chrome incognito mode, can not get saved value
			// In IE8, calling storage.getItem occasionally makes "Permission denied" error
			return storage.getItem(TMP_KEY) === CONST_PERSIST;
		} catch (e) {
			return false;
		}
	}
	if (!isSupportState && !storage) {
		return;
	}

	// jscs:disable maximumLineLength
	/* jshint ignore:start */
	if (!JSON) {
		console.warn(
		"The JSON object is not supported in your browser.\r\n" +
		"For work around use polyfill which can be found at:\r\n" +
		"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON#Polyfill");
		return;
	}
	/* jshint ignore:end */

	// jscs:enable maximumLineLength

	/**
	 * This jQuery custom event is fired when device rotates.
	 *
	 * @ko 기기가 회전할 때 발생하는 jQuery 커스텀 이벤트
	 * @name jQuery#persist
	 * @event
	 * @deprecated since version 1.2.0
	 * @example
	 * $(window).on("persist",function(){
	 *      var state = $.persist("KEY");
	 *		// Restore state
	 * });
	 *
	 */
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
		var state;
		var stateStr = storage ?
			storage.getItem(global.location.href + CONST_PERSIST) : history.state;

		// the storage is clean
		if (stateStr === null) {
			return {};
		}

		// "null" is not a valid
		var isValidStateStr = typeof stateStr === "string" &&
									stateStr.length > 0 && stateStr !== "null";
		var isValidType;

		try {
			state = JSON.parse(stateStr);

			// like '[ ... ]', '1', '1.234', '"123"' is also not valid
			isValidType = !($.type(state) !== "object" || state instanceof Array);

			if (!isValidStateStr || !isValidType) {
				throw new Error();
			}
		} catch (e) {
			warnInvalidStorageValue();
			state = {};
		}

		// Note2 (Android 4.3) return value is null
		return state;
	}

	function warnInvalidStorageValue() {
		/* jshint ignore:start */
		console.warn("window.history or session/localStorage has no valid " +
				"format data to be handled in persist.");
		/* jshint ignore:end */
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
		if (storage) {
			if (state) {
				storage.setItem(
					global.location.href + CONST_PERSIST, JSON.stringify(state));
			} else {
				storage.removeItem(global.location.href  + CONST_PERSIST);
			}
		} else {
			try {
				history.replaceState(
					state === null ? null : JSON.stringify(state),
					doc.title,
					global.location.href
				);
			} catch (e) {
				/* jshint ignore:start */
				console.warn(e.message);
				/* jshint ignore:end */
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
	* Get or store the current state of the web page using JSON.
	* @ko 웹 페이지의 현재 상태를 JSON 형식으로 저장하거나 읽는다.
	* @method jQuery.persist
    * @param {String} key The key of the state information to be stored <ko>저장할 상태 정보의 키</ko>
    * @param {Object} [state] The value to be stored in a given key <ko>키에 저장할 값</ko>
	* @example
	// when 'key' and 'value' are given, it saves state object
	$.persist("KEY",state);
	// when only 'key' is given, it loads state object
	var state = $.persist("KEY");
	* @example
	// this is deprecated API
	// save state without Key
	$.persist(state);
	// get state without Key
	var state = $.persist();
	*/
	$.persist = function(state, data) {
		var key;

		if (typeof state === "string") {
			key = state;
		} else {
			key = GLOBAL_KEY;
			data = arguments.length === 1 ? state : null;
		}

		if (data || arguments.length === 2) {
			setStateByKey(key, data);
		}

		return getStateByKey(key);
	};

	/**
	* Return whether you need "Persist" module by checking the bfCache support of the current browser
	* @ko 현재 브라우저의 bfCache 지원여부에 따라 persist 모듈의 필요여부를 반환한다.
	* @group jQuery Extension
	* @namespace
	* @property {function} isNeeded
	* @example
	$.persist.isNeeded();
	*/
	$.persist.isNeeded = function() {
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
		"GLOBALKEY": GLOBAL_KEY
	};
});
/**
* Copyright (c) 2015 NAVER Corp.
* egjs projects are licensed under the MIT license
*/

eg.module("visible", ["jQuery", eg, document], function($, ns, doc) {
/**
	 * A module used to check whether an element is visible in the base element or viewport.
	 * @ko 엘리먼트가 기준 엘리먼트나 뷰포트 안에 보이는지 확인하는 모듈
	 * @class
	 * @name eg.Visible
	 * @extends eg.Component
	 * @group egjs
	 *
	 * @param {HTMLElement|String|jQuery} [element=document] A base element that detects if another element is visible<ko>엘리먼트가 보이는 기준 엘리먼트</ko>
	 * @param {Object} options The option object of the eg.Visible module<ko>eg.Visible 모듈의 옵션 객체</ko>
	 * @param {String} [options.targetClass="check_visible"] The class name of the element to be checked<ko>보이는지 확인할 엘리먼트의 클래스 이름</ko>
	 * @param {Number} [options.expandSize=0] The size of the expanded area to be checked whether an element is visible. If this value is less than zero, the size of the area is smaller than that of the base element. <ko>기준 엘리먼트의 경계를 넘어 엘리먼트가 보이는지 확인할 영역의 크기. 값이 0보다 작으면 엘리먼트가 보이는지 확인할 영역의 크기가 기준 엘리먼트보다 작아진다</ko>
	 * @support {"ie": "7+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.1+ (except 3.x)"}
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
		 * Updates the list of elements where the visibility property is to be checked
		 * @ko visibility 속성을 검사할 엘리먼트의 목록을 갱신한다
		 * @method eg.Visible#refresh
		 * @return {eg.Visible} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
		 *
		 * @remark
		 * If targets was added or removed from DOM tree, must call refresh method to update internal target list.
		 * <ko>확인 대상이 영역 안에 추가되거나 삭제된 경우, 모듈내부에서 사용하는 확인 대상 목록을 이 메소드를 호출하여 갱신해야한다.<ko>
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
		 * Checks whether the visible of the target elements has changed. It trigger that change event on a component.
		 * @ko 대상 엘리먼트의 가시성이 변경됐는지 체크한다. change 이벤트를 발생한다.
		 * @method eg.Visible#check
		 * @param {Number} [delay=-1] Delay time. It delay that change event trigger.<ko>지연시간. change 이벤트 발생을 지연한다.</ko>
		 * @param {Boolean} [containment=false] Whether to check only elements that are completely contained within the reference area.<ko>기준 영역 안에 완전히 포함된 엘리먼트만 체크할지 여부.</ko>
		 * @return {eg.Visible} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
		 */
		check: function(delay, containment) {
			if (typeof delay !== "number") {
				containment = delay;
				delay = -1;
			}

			if (typeof delay === "undefined") {
				delay = -1;
			}

			if (typeof containment === "undefined") {
				containment = false;
			}

			clearTimeout(this._timer);
			if (delay < 0) {
				this._check(containment);
			} else {
				this._timer = setTimeout($.proxy(function() {
					this._check(containment);
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
		_check: function(containment) {
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

					if (containment) {
						target.__VISIBLE__ = after = !(
							targetArea.top < area.top  ||
							targetArea.bottom > area.bottom  ||
							targetArea.right > area.right ||
							targetArea.left < area.left
						);
					} else {
						target.__VISIBLE__ = after = !(
							targetArea.bottom < area.top ||
							area.bottom < targetArea.top ||
							targetArea.right < area.left ||
							area.right < targetArea.left
						);
					}

					(before !== after) && (after ? visibles : invisibles).unshift(target);
				}
			}
			/**
			 * This event is fired when the event is compared with the last verified one and there is an element of which the visibility property has changed.
			 * @ko 마지막으로 확인한 결과와 비교해 visibility 속성이 변경된 엘리먼트가 있을 때 발생하는 이벤트
			 * @name eg.Visible#change
			 * @event
			 * @param {Array} visible Visible elements  (the element type is `HTMLElement`) <ko>보이게 된 엘리먼트들</ko>
			 * @param {Array} invisible Invisible elements  (the element type is `HTMLElement`) <ko>안 보이게 된 엘리먼트들</ko>
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
 * A jQuery custom event of the eg.Visible module. This event is fired when the event is compared with the last verified one and there is an element of which the visibility property has changed.
 *
 * @ko eg.Visible 모듈의 jQuery 커스텀 이벤트. 마지막으로 확인한 결과와 비교해 visibility 속성이 변경된 엘리먼트가 있을 때 발생한다
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
 * A jQuery plugin available in the eg.Visible module.
 * @ko eg.Visible 모듈의 jQuery 플러그인
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
eg.module("movableCoord", [eg, window, "Hammer"], function(ns, global, HM) {
var SUPPORT_TOUCH = "ontouchstart" in global;

	// jscs:enable maximumLineLength
	/**
	 * A module used to change the information of user action entered by various input devices such as touch screen or mouse into logical coordinates within the virtual coordinate system. The coordinate information sorted by time events occurred is provided if animations are made by user actions. You can implement a user interface by applying the logical coordinates provided. For more information on the eg.MovableCoord module, see demos.
	 * @group egjs
	 * @ko 터치 입력 장치나 마우스와 같은 다양한 입력 장치로 전달 받은 사용자의 동작을 가상 좌표계의 논리적 좌표로 변경하는 모듈. 사용자의 동작으로 애니메이션이 일어나면 시간순으로 변경되는 좌표 정보도 제공한다. 변경된 논리적 좌표를 반영해 UI를 구현할 수 있다. eg.MovableCoord 모듈의 자세한 작동 방식은 데모를 참고한다.
	 * @class
	 * @name eg.MovableCoord
	 * @extends eg.Component
	 *
	 * @param {Object} options The option object of the eg.MovableCoord module<ko>eg.MovableCoord 모듈의 옵션 객체</ko>
	 * @param {Array} options.min The minimum value of X and Y coordinates <ko>좌표계의 최솟값</ko>
	 * @param {Number} [options.min.0=0] The X coordinate of the minimum <ko>최소 x좌표</ko>
	 * @param {Number} [options.min.1=0] The Y coordinate of the minimum <ko>최소 y좌표</ko>
	 *
	 * @param {Array} options.max The maximum value of X and Y coordinates <ko>좌표계의 최댓값</ko>
	 * @param {Number} [options.max.0=100] The X coordinate of the maximum<ko>최대 x좌표</ko>
	 * @param {Number} [options.max.1=100] The Y coordinate of the maximum<ko>최대 y좌표</ko>
	 *
	 * @param {Array} options.bounce The size of bouncing area. The coordinates can exceed the coordinate area as much as the bouncing area based on user action. If the coordinates does not exceed the bouncing area when an element is dragged, the coordinates where bouncing effects are applied are retuned back into the coordinate area<ko>바운스 영역의 크기. 사용자의 동작에 따라 좌표가 좌표 영역을 넘어 바운스 영역의 크기만큼 더 이동할 수 있다. 사용자가 끌어다 놓는 동작을 했을 때 좌표가 바운스 영역에 있으면, 바운스 효과가 적용된 좌표가 다시 좌표 영역 안으로 들어온다</ko>
	 * @param {Boolean} [options.bounce.0=10] The size of top area <ko>위쪽 바운스 영역의 크기</ko>
	 * @param {Boolean} [options.bounce.1=10] The size of right area <ko>오른쪽 바운스 영역의 크기</ko>
	 * @param {Boolean} [options.bounce.2=10] The size of bottom area <ko>아래쪽 바운스 영역의 크기</ko>
	 * @param {Boolean} [options.bounce.3=10] The size of left area <ko>왼쪽 바운스 영역의 크기</ko>
	 *
	 * @param {Array} options.margin The size of accessible space outside the coordinate area. If an element is dragged outside the coordinate area and then dropped, the coordinates of the element are returned back into the coordinate area. The size of margins that can be exceeded <ko>−	좌표 영역을 넘어 이동할 수 있는 바깥 영역의 크기. 사용자가 좌표를 바깥 영역까지 끌었다가 놓으면 좌표가 좌표 영역 안으로 들어온다.</ko>
	 * @param {Boolean} [options.margin.0=0] The size of top margin <ko>위쪽 바깥 영역의 크기</ko>
	 * @param {Boolean} [options.margin.1=0] The size of right margin <ko>오른쪽 바깥 영역의 크기</ko>
	 * @param {Boolean} [options.margin.2=0] The size of bottom margin <ko>아래쪽 바깥 영역의 크기</ko>
	 * @param {Boolean} [options.margin.3=0] The size of left margin <ko>왼쪽 바깥 영역의 크기</ko>
	 * @param {Array} options.circular Indicates whether a circular element is available. If it is set to "true" and an element is dragged outside the coordinate area, the element will appear on the other side.<ko>순환 여부. 'true'로 설정한 방향의 좌표 영역 밖으로 엘리먼트가 이동하면 반대 방향에서 엘리먼트가 나타난다</ko>
	 * @param {Boolean} [options.circular.0=false] Indicates whether to circulate to top <ko>위로 순환 여부</ko>
	 * @param {Boolean} [options.circular.1=false] Indicates whether to circulate to right <ko>오른쪽으로 순환 여부</ko>
	 * @param {Boolean} [options.circular.2=false] Indicates whether to circulate to bottom  <ko>아래로 순환 여부</ko>
	 * @param {Boolean} [options.circular.3=false] Indicates whether to circulate to left  <ko>왼쪽으로 순환 여부</ko>
	 *
	 * @param {Function} [options.easing=easing.easeOutCubic] The easing function to apply to an animation <ko>애니메이션에 적용할 easing 함수</ko>
	 * @param {Number} [options.maximumDuration=Infinity] Maximum duration of the animation <ko>가속도에 의해 애니메이션이 동작할 때의 최대 좌표 이동 시간</ko>
	 * @param {Number} [options.deceleration=0.0006] Deceleration of the animation where acceleration is manually enabled by user. A higher value indicates shorter running time. <ko>사용자의 동작으로 가속도가 적용된 애니메이션의 감속도. 값이 높을수록 애니메이션 실행 시간이 짧아진다</ko>
	 * @see HammerJS {@link http://hammerjs.github.io}
	 * @see •	Hammer.JS applies specific CSS properties by default when creating an instance (See {@link http://hammerjs.github.io/jsdoc/Hammer.defaults.cssProps.html}). The eg.MovableCoord module removes all default CSS properties provided by Hammer.JS <ko>Hammer.JS는 인스턴스를 생성할 때 기본으로 특정 CSS 속성을 적용한다(참고: @link{http://hammerjs.github.io/jsdoc/Hammer.defaults.cssProps.html}). 특정한 상황에서는 Hammer.JS의 속성 때문에 사용성에 문제가 있을 수 있다. eg.MovableCoord 모듈은 Hammer.JS의 기본 CSS 속성을 모두 제거했다</ko>
	 *
	 * @codepen {"id":"jPPqeR", "ko":"MovableCoord Cube 예제", "en":"MovableCoord Cube example", "collectionId":"AKpkGW", "height": 403}
	 *
	 * @see Easing Functions Cheat Sheet {@link http://easings.net/}
	 * @see If you want to try a different easing function, use the jQuery easing plugin ({@link http://gsgd.co.uk/sandbox/jquery/easing}) or the jQuery UI easing library ({@link https://jqueryui.com/easing}) <ko>다른 easing 함수를 사용하려면 jQuery easing 플러그인({@link http://gsgd.co.uk/sandbox/jquery/easing})이나, jQuery UI easing 라이브러리({@lin https://jqueryui.com/easing})를 사용한다</ko>
	 *
	 * @support {"ie": "10+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.3+ (except 3.x)"}
	 */
	var MC = ns.MovableCoord = ns.Class.extend(ns.Component, {
		construct: function(options) {
			HM.assign(this.options = {
				min: [0, 0],
				max: [100, 100],
				bounce: [10, 10, 10, 10],
				margin: [0,0,0,0],
				circular: [false, false, false, false],
				easing: function easeOutCubic(x) {
					return 1 - Math.pow(1 - x, 3);
				},
				maximumDuration: Infinity,
				deceleration: 0.0006
			}, options);
			this._reviseOptions();
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
			this._animationEnd = HM.bindFn(this._animationEnd, this);	// for caching
			this._restore = HM.bindFn(this._restore, this);	// for caching
			this._panmove = HM.bindFn(this._panmove, this);	// for caching
			this._panend = HM.bindFn(this._panend, this);	// for caching
		},
		/**
		 * Registers an element to use the eg.MovableCoord module.
		 * @ko eg.MovableCoord 모듈을 사용할 엘리먼트를 등록한다
		 * @method eg.MovableCoord#bind
		 * @param {HTMLElement|String|jQuery} element An element to use the eg.MovableCoord module<ko>−	eg.MovableCoord 모듈을 사용할 엘리먼트</ko>
		 * @param {Object} options The option object of the bind() method <ko>bind() 메서드의 옵션 객체</ko>
		 * @param {Number} [options.direction=eg.MovableCoord.DIRECTION_ALL] Coordinate direction that a user can move<br>- eg.MovableCoord.DIRECTION_ALL: All directions available.<br>- eg.MovableCoord.DIRECTION_HORIZONTAL: Horizontal direction only.<br>- eg.MovableCoord.DIRECTION_VERTICAL: Vertical direction only<ko>사용자의 동작으로 움직일 수 있는 좌표의 방향.<br>- eg.MovableCoord.DIRECTION_ALL: 모든 방향으로 움직일 수 있다.<br>- eg.MovableCoord.DIRECTION_HORIZONTAL: 가로 방향으로만 움직일 수 있다.<br>- eg.MovableCoord.DIRECTION_VERTICAL: 세로 방향으로만 움직일 수 있다.</ko>
		 * @param {Array} options.scale Coordinate scale that a user can move<ko>사용자의 동작으로 이동하는 좌표의 배율</ko>
		 * @param {Number} [options.scale.0=1] X-axis scale <ko>x축 배율</ko>
		 * @param {Number} [options.scale.1=1] Y-axis scale <ko>y축 배율</ko>
		 * @param {Number} [options.thresholdAngle=45] The threshold value that determines whether user action is horizontal or vertical (0~90) <ko>사용자의 동작이 가로 방향인지 세로 방향인지 판단하는 기준 각도(0~90)</ko>
		 * @param {Number} [options.interruptable=true] Indicates whether an animation is interruptible.<br>- true: It can be paused or stopped by user action or the API.<br>- false: It cannot be paused or stopped by user action or the API while it is running.<ko>진행 중인 애니메이션 중지 가능 여부.<br>- true: 사용자의 동작이나 API로 애니메이션을 중지할 수 있다.<br>- false: 애니메이션이 진행 중일 때는 사용자의 동작이나 API가 적용되지 않는다</ko>
		 * @param {Array} [options.inputType] Types of input devices. (default: ["touch", "mouse"])<br>- touch: Touch screen<br>- mouse: Mouse <ko>입력 장치 종류.(기본값: ["touch", "mouse"])<br>- touch: 터치 입력 장치<br>- mouse: 마우스</ko>
		 *
		 * @return {eg.MovableCoord} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
		 */
		bind: function(element, options) {
			var el = this._getEl(element);
			var keyValue = el[MC._KEY];
			var subOptions = {
				direction: MC.DIRECTION_ALL,
				scale: [ 1, 1 ],
				thresholdAngle: 45,
				interruptable: true,
				inputType: [ "touch", "mouse" ]
			};

			HM.assign(subOptions, options);

			var inputClass = this._convertInputType(subOptions.inputType);
			if (!inputClass) {
				return this;
			}

			if (keyValue) {
				this._hammers[keyValue].inst.destroy();
			} else {
				keyValue = Math.round(Math.random() * new Date().getTime());
			}
			this._hammers[keyValue] = {
				inst: this._createHammer(
					el,
					subOptions,
					inputClass
				),
				el: el,
				options: subOptions
			};
			el[MC._KEY] = keyValue;
			return this;
		},

		_createHammer: function(el, subOptions, inputClass) {
			try {
				// create Hammer
				var hammer = new HM.Manager(el, {
						recognizers: [
							[
								HM.Pan, {
									direction: subOptions.direction,
									threshold: 0
								}
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

				return this._attachHammerEvents(hammer, subOptions);
			} catch (e) {}
		},

		_attachHammerEvents: function(hammer, options) {
			return hammer.on("hammer.input", HM.bindFn(function(e) {
					if (e.isFirst) {
						// apply options each
						this._subOptions = options;
						this._status.curHammer = hammer;
						this._panstart(e);
					} else if (e.isFinal) {
						// substitute .on("panend tap", this._panend); Because it(tap, panend) cannot catch vertical(horizontal) movement on HORIZONTAL(VERTICAL) mode.
						this._panend(e);
					}
				}, this))
				.on("panstart panmove", this._panmove);
		},

		_detachHammerEvents: function(hammer) {
			hammer.off("hammer.input panstart panmove panend");
		},

		_convertInputType: function(inputType) {
			var hasTouch = false;
			var hasMouse = false;
			inputType = inputType || [];
			inputType.forEach(function(v) {
				switch (v) {
					case "mouse" : hasMouse = true; break;
					case "touch" : hasTouch = SUPPORT_TOUCH;
				}
			});

			return hasTouch && HM.TouchInput || hasMouse && HM.MouseInput || null;
		},

		/**
		 * Detaches an element using the eg.MovableCoord module.
		 * @ko eg.MovableCoord 모듈을 사용하는 엘리먼트를 해제한다
		 * @method eg.MovableCoord#unbind
		 * @param {HTMLElement|String|jQuery} element An element from which the eg.MovableCoord module is detached<ko>eg.MovableCoord 모듈을 해제할 엘리먼트</ko>
		 * @return {eg.MovableCoord} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
		 */
		unbind: function(element) {
			var el = this._getEl(element);
			var key = el[MC._KEY];
			if (key) {
				this._hammers[key].inst.destroy();
				delete this._hammers[key];
				delete el[MC._KEY];
			}
			return this;
		},

		/**
		 * get a hammer instance from elements using the eg.MovableCoord module.
		 * @ko eg.MovableCoord 모듈을 사용하는 엘리먼트에서 hammer 객체를 얻는다
		 * @method eg.MovableCoord#getHammer
		 * @param {HTMLElement|String|jQuery} element An element from which the eg.MovableCoord module is using<ko>eg.MovableCoord 모듈을 사용하는 엘리먼트</ko>
		 * @return {Hammer|null} An instance of Hammer.JS<ko>Hammer.JS의 인스턴스</ko>
		 */
		getHammer: function(element) {
			var el = this._getEl(element);
			var key = el[MC._KEY];
			if (key && this._hammers[key]) {
				return this._hammers[key].inst;
			} else {
				return null;
			}
		},

		_grab: function() {
			if (this._status.animationParam) {
				this.trigger("animationEnd");
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
		_isOutToOut: function(pos, destPos) {
			var min = this.options.min;
			var max = this.options.max;
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
			 * This event is fired when a user holds an element on the screen of the device.
			 * @ko 사용자가 기기의 화면에 손을 대고 있을 때 발생하는 이벤트
			 * @name eg.MovableCoord#hold
			 * @event
			 * @param {Object} param The object of data to be sent when the event is fired<ko>이벤트가 발생할 때 전달되는 데이터 객체</ko>
			 * @param {Array} param.pos coordinate <ko>좌표 정보</ko>
			 * @param {Number} param.pos.0 The X coordinate<ko>x 좌표</ko>
			 * @param {Number} param.pos.1 The Y coordinate<ko>y 좌표</ko>
			 * @param {Object} param.hammerEvent The event information of Hammer.JS. It returns null if the event is fired through a call to the setTo() or setBy() method.<ko>Hammer.JS의 이벤트 정보. setTo() 메서드나 setBy() 메서드를 호출해 이벤트가 발생했을 때는 'null'을 반환한다.</ko>
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
				var initSlope = this._easing(0.00001) / 0.00001;

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
			if (e.distance === 0 /*e.type === "tap"*/) {
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

				!(direction & MC.DIRECTION_HORIZONTAL) && (vX = 0);
				!(direction & MC.DIRECTION_VERTICAL) && (vY = 0);

				var offset = this._getNextOffsetPos([
					vX * (e.deltaX < 0 ? -1 : 1) * scale[0],
					vY * (e.deltaY < 0 ? -1 : 1) * scale[1]
				]);
				var destPos = [ pos[0] + offset[0], pos[1] + offset[1] ];
				destPos = this._getPointOfIntersection(pos, destPos);
				/**
				 * This event is fired when a user release an element on the screen of the device.
				 * @ko 사용자가 기기의 화면에서 손을 뗐을 때 발생하는 이벤트
				 * @name eg.MovableCoord#release
				 * @event
				 *
				 * @param {Object} param The object of data to be sent when the event is fired<ko>이벤트가 발생할 때 전달되는 데이터 객체</ko>
				 * @param {Array} param.depaPos The coordinates when releasing an element<ko>손을 뗐을 때의 좌표현재 </ko>
				 * @param {Number} param.depaPos.0 The X coordinate <ko> x 좌표</ko>
				 * @param {Number} param.depaPos.1 The Y coordinate <ko> y 좌표</ko>
				 * @param {Array} param.destPos The coordinates to move to after releasing an element<ko>손을 뗀 뒤에 이동할 좌표</ko>
				 * @param {Number} param.destPos.0 The X coordinate <ko>x 좌표</ko>
				 * @param {Number} param.destPos.1 The Y coordinate <ko>y 좌표</ko>
				 * @param {Object} param.hammerEvent The event information of Hammer.JS. It returns null if the event is fired through a call to the setTo() or setBy() method.<ko>Hammer.JS의 이벤트 정보. setTo() 메서드나 setBy() 메서드를 호출해 이벤트가 발생했을 때는 'null'을 반환한다</ko>
				 *
				 */
				this.trigger("release", {
					depaPos: pos.concat(),
					destPos: destPos,
					hammerEvent: e || null
				});

				if (pos[0] !== destPos[0] || pos[1] !== destPos[1]) {
					this._animateTo(destPos, null, e || null);
				} else {
					this._setInterrupt(false);
				}
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
			return [
				Math.min(max[0], Math.max(min[0], destPos[0])),
				Math.min(max[1], Math.max(min[1], destPos[1]))
			];
		},

		_isCircular: function(destPos) {
			var circular = this.options.circular;
			var min = this.options.min;
			var max = this.options.max;
			return (circular[0] && destPos[1] < min[1]) ||
					(circular[1] && destPos[0] > max[0]) ||
					(circular[2] && destPos[1] > max[1]) ||
					(circular[3] && destPos[0] < min[0]);
		},

		_prepareParam: function(absPos, duration, hammerEvent) {
			var pos = this._pos;
			var destPos = this._getPointOfIntersection(pos, absPos);
			destPos = this._isOutToOut(pos, destPos) ? pos : destPos;
			var distance = [
				Math.abs(destPos[0] - pos[0]),
				Math.abs(destPos[1] - pos[1])
			];
			duration = duration == null ? this._getDurationFromPos(distance) : duration;
			duration = this.options.maximumDuration > duration ?
						duration : this.options.maximumDuration;
			return {
				depaPos: pos.concat(),
				destPos: destPos.concat(),
				isBounce: this._isOutside(destPos, this.options.min, this.options.max),
				isCircular: this._isCircular(absPos),
				duration: duration,
				distance: distance,
				hammerEvent: hammerEvent || null,
				done: this._animationEnd
			};
		},

		_restore: function(complete, hammerEvent) {
			var pos = this._pos;
			var min = this.options.min;
			var max = this.options.max;
			this._animate(this._prepareParam([
				Math.min(max[0], Math.max(min[0], pos[0])),
				Math.min(max[1], Math.max(min[1], pos[1]))
			], null, hammerEvent), complete);
		},

		_animationEnd: function() {
			this._status.animationParam = null;
			this._pos = this._getCircularPos([
				Math.round(this._pos[0]),
				Math.round(this._pos[1])
			]);
			this._setInterrupt(false);
			/**
			 * This event is fired when animation ends.
			 * @ko 에니메이션이 끝났을 때 발생한다.
			 * @name eg.MovableCoord#animationEnd
			 * @event
			 */
			this.trigger("animationEnd");
		},

		_animate: function(param, complete) {
			param.startTime = new Date().getTime();
			this._status.animationParam = param;
			if (param.duration) {
				var info = this._status.animationParam;
				var self = this;
				(function loop() {
					self._raf = null;
					if (self._frame(info) >= 1) {
						// deferred.resolve();
						complete();
						return;
					} // animationEnd
					self._raf = ns.requestAnimationFrame(loop);
				})();
			} else {
				this._triggerChange(param.destPos, false);
				complete();
			}
		},

		_animateTo: function(absPos, duration, hammerEvent) {
			var param = this._prepareParam(absPos, duration, hammerEvent);
			var retTrigger = this.trigger("animationStart", param);

			// You can't stop the 'animationStart' event when 'circular' is true.
			if (param.isCircular && !retTrigger) {
				throw new Error(
					"You can't stop the 'animation' event when 'circular' is true."
				);
			}

			if (retTrigger) {
				var self = this;
				var queue = [];
				var dequeue = function() {
					var task = queue.shift();
					task && task.call(this);
				};
				if (param.depaPos[0] !== param.destPos[0] ||
					param.depaPos[1] !== param.destPos[1]) {
					queue.push(function() {
						self._animate(param, dequeue);
					});
				}
				if (this._isOutside(param.destPos, this.options.min, this.options.max)) {
					queue.push(function() {
						self._restore(dequeue, hammerEvent);
					});
				}
				queue.push(function() {
					self._animationEnd();
				});
				dequeue();
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
		_reviseOptions: function() {
			var key;
			var self = this;
			(["bounce", "margin", "circular"]).forEach(function(v) {
				key = self.options[v];
				if (key != null) {
					if (key.constructor === Array) {
						self.options[v] = key.length === 2 ?
							key.concat(key) : key.concat();
					} else if (/string|number|boolean/.test(typeof key)) {
						self.options[v] = [ key, key, key, key ];
					} else {
						self.options[v] = null;
					}
				}
			});
		},

		// trigger 'change' event
		_triggerChange: function(pos, holding, e) {
			/**
			 * This event is fired when coordinate changes.
			 * @ko 좌표가 변경됐을 때 발생하는 이벤트
			 * @name eg.MovableCoord#change
			 * @event
			 *
			 * @param {Object} param The object of data to be sent when the event is fired <ko>이벤트가 발생할 때 전달되는 데이터 객체</ko>
			 * @param {Array} param.pos departure coordinate  <ko>좌표</ko>
			 * @param {Number} param.pos.0 The X coordinate <ko>x 좌표</ko>
			 * @param {Number} param.pos.1 The Y coordinate <ko>y 좌표</ko>
			 * @param {Boolean} param.holding Indicates whether a user holds an element on the screen of the device.<ko>사용자가 기기의 화면을 누르고 있는지 여부</ko>
			 * @param {Object} param.hammerEvent The event information of Hammer.JS. It returns null if the event is fired through a call to the setTo() or setBy() method.<ko>Hammer.JS의 이벤트 정보. setTo() 메서드나 setBy() 메서드를 호출해 이벤트가 발생했을 때는 'null'을 반환한다.</ko>
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
		 * Returns the current position of the logical coordinates.
		 * @ko 논리적 좌표의 현재 위치를 반환한다
		 * @method eg.MovableCoord#get
		 * @return {Array} pos <ko>좌표</ko>
		 * @return {Number} pos.0 The X coordinate <ko>x 좌표</ko>
		 * @return {Number} pos.1 The Y coordinate <ko>y 좌표</ko>
		 */
		get: function() {
			return this._pos.concat();
		},

		/**
		 * Moves an element to specific coordinates.
		 * @ko 좌표를 이동한다.
		 * @method eg.MovableCoord#setTo
		 * @param {Number} x The X coordinate to move to <ko>이동할 x좌표</ko>
		 * @param {Number} y The Y coordinate to move to  <ko>이동할 y좌표</ko>
		 * @param {Number} [duration=0] Duration of the animation (unit: ms) <ko>애니메이션 진행 시간(단위: ms)</ko>
		 * @return {eg.MovableCoord} An instance of a module itself <ko>자신의 인스턴스</ko>
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
				this._animateTo([ x, y ], duration);
			} else {
				this._pos = this._getCircularPos([ x, y ]);
				this._triggerChange(this._pos, false);
				this._setInterrupt(false);
			}
			return this;
		},
		/**
		 * Moves an element from the current coordinates to specific coordinates. The change event is fired when the method is executed.
		 * @ko 현재 좌표를 기준으로 좌표를 이동한다. 메서드가 실행되면 change 이벤트가 발생한다
		 * @method eg.MovableCoord#setBy
		 * @param {Number} x The X coordinate to move to <ko>이동할 x좌표</ko>
		 * @param {Number} y The Y coordinate to move to <ko>이동할 y좌표</ko>
		 * @param {Number} [duration=0] Duration of the animation (unit: ms) <ko>애니메이션 진행 시간(단위: ms)</ko>
		 * @return {eg.MovableCoord} An instance of a module itself <ko>자신의 인스턴스</ko>
		 */
		setBy: function(x, y, duration) {
			return this.setTo(
				x != null ? this._pos[0] + x : this._pos[0],
				y != null ? this._pos[1] + y : this._pos[1],
				duration
			);
		},

		_easing: function(p) {
			return p > 1 ? 1 : this.options.easing(p);
		},

		_setInterrupt: function(prevented) {
			!this._subOptions.interruptable &&
			(this._status.prevented = prevented);
		},

		_getEl: function(el) {
			if (typeof el === "string") {
				return document.querySelector(el);
			} else if (el instanceof jQuery && el.length > 0) {
				return el[0];
			}
			return el;
		},

		/**
		 * Destroys elements, properties, and events used in a module.
		 * @ko 모듈에 사용한 엘리먼트와 속성, 이벤트를 해제한다.
		 * @method eg.MovableCoord#destroy
		 */
		destroy: function() {
			this.off();
			for (var p in this._hammers) {
				this._hammers[p].inst.destroy();
				delete this._hammers[p].el[MC._KEY];
				delete this._hammers[p];
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
	 * A module used to implement flicking interactions. With this module, you can make flicking gestures, which are ways to navigate left and right to move between panels arranged side by side.
	 * @group egjs
	 * @ko 플리킹 UI를 구현하는 모듈. 나란히 배치한 패널을 쓸어 넘겨 다음 패널이나 이전 패널로 이동하는 플리킹 UI를 만들 수 있다.
	 * @class
	 * @name eg.Flicking
	 * @extends eg.Component
	 *
	 * @param {HTMLElement|String|jQuery} element A base element for the eg.Flicking module <ko>eg.Flicking 모듈을 사용할 기준 엘리먼트</ko>
	 * @param {Object} options The option object of the eg.Flicking module<ko>eg.Flicking 모듈의 옵션 객체</ko>
	 * @param {Boolean} [options.hwAccelerable=eg.isHWAccelerable()] Force hardware compositing <ko>하드웨어 가속 사용 여부</ko>
	 * @param {String} [options.prefix=eg-flick] A prefix for class names of the panel elements <ko>패널 엘리먼트의 클래스 이름에 설정할 접두사</ko>
	 * @param {Number} [options.deceleration=0.0006] Deceleration of the animation where acceleration is manually enabled by user. A higher value indicates shorter running time <ko>사용자의 동작으로 가속도가 적용된 애니메이션의 감속도. 값이 높을수록 애니메이션 실행 시간이 짧아진다</ko>
	 * @param {Boolean} [options.horizontal=true] Direction of the panel movement (true: horizontal, false: vertical) <ko>패널 이동 방향 (true 가로방향, false 세로방향)</ko>
	 * @param {Boolean} [options.circular=false] Indicates whether a circular panel is available <ko>패널 순환 여부</ko>
	 * @param {Number|Array} [options.previewPadding=[0,0]] The preview size for the previous or next panel. If direction is set to "horizontal", the preview section will be displayed on the left and right of the panel. If direction is set to "vertical", it will be displayed on the top and bottom of the panel <ko>이전 패널과 다음 패널을 미리 보는 영역의 크기. 패널 이동 방향이 가로 방향이면 패널 왼쪽과 오른쪽에 미리 보는 영역이 나타난다. 패널 이동 방향이 세로 방향이면 패널 위쪽과 아래쪽에 미리 보는 영역이 나타난다</ko>
	 * @param {Number|Array} [options.bounce=[10,10]] −	The size of bouncing area. If a panel is set to "non-circulable", the start and end panels can exceed the base element area and move further as much as the bouncing area. If a panel is dragged to the bouncing area and then dropped, the panel where bouncing effects are applied is retuned back into the base element area. <ko>바운스 영역의 크기. 패널이 순환하지 않도록 설정됐다면 시작 패널과 마지막 패널은 기준 엘리먼트 영역을 넘어 바운스 영역의 크기만큼 더 이동할 수 있다. 패널을 바운스 영역까지 끌었다가 놓으면, 바운스 효과가 적용된 패널이 다시 기준 엘리먼트 영역 안으로 들어온다</ko>
	 * @param {Number} [options.threshold=40] Distance threshold. If the drag exceeds the threshold value, it will be changed to the next panel <ko>다음 패널로 바뀌는 기준 이동 거리. 패널을 기준 이동 거리 이상 끌었다 놓으면 패널이 다음 패널로 바뀐다</ko>
	 * @param {Number} [options.duration=100] Duration of the panel movement (unit: ms) <ko>패널 이동 애니메이션 진행 시간(단위: ms)</ko>
	 * @param {Function} [options.panelEffect=easeOutCubic] The easing function to apply to a panel moving animation <ko>패널 이동 애니메이션에 적용할 easing 함수</ko>
	 * @param {Number} [options.defaultIndex=0] The index number of a panel to be selected upon module initialization <ko>모듈이 초기화될 때 선택할 패널의 인덱스 번호</ko>
	 * @param {Array} [options.inputType] Types of input devices.<br>- touch: A touch screen can be used to move a panel.<br>- mouse: A mouse can be used to move a panel. <ko>입력 장치 종류.<br>- touch: 터치 입력 장치로 패널을 이동할 수 있다.<br>- mouse: 마우스로 패널을 이동할 수 있다.</ko>
	 * @param {Number} [options.thresholdAngle=45] The threshold value that determines whether user action is horizontal or vertical (0~90) <ko>사용자의 동작이 가로 방향인지 세로 방향인지 판단하는 기준 각도(0~90)</ko>
	 * @param {Boolean} [options.adaptiveHeight=false] Set container's height be adaptive according panel's height.<br>(Note: on Android 4.1.x stock browser, has rendering bug which not correctly render height value on panel with single node. To avoid just append another empty node at the end.)<ko>컨테이너 영역이 패널의 높이값에 따라 변경될지 여부<br>(참고: Android 4.1.x 스톡 브라우저에서 단일 노드로 구성된 패널의 높이값 변경이 제대로 렌더링 되지 않는 버그가 있음. 비어있는 노드를 추가하면 해결이 가능하다.)</ko>
	 *
	 * @codepen {"id":"rVOpPK", "ko":"플리킹 UI 기본 예제", "en":"Flicking UI default example", "collectionId":"ArxyLK", "height" : 403}
	 * @support {"ie": "10+", "ch" : "latest", "ff" : "latest",  "sf" : "latest" , "edge" : "latest", "ios" : "7+", "an" : "2.3+ (except 3.x)"}
	 *
	 * @see Easing Functions Cheat Sheet {@link http://easings.net/}
	 * @see If you want to try a different easing function, use the jQuery easing plugin ({@link http://gsgd.co.uk/sandbox/jquery/easing}) or the jQuery UI easing library ({@link https://jqueryui.com/easing}). <ko>다른 easing 함수를 사용하려면 jQuery easing 플러그인({@link http://gsgd.co.uk/sandbox/jquery/easing})이나, jQuery UI easing 라이브러리({@link https://jqueryui.com/easing})를 사용한다</ko>
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
			});
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

			this._setOptions(options);
			this._setConfig($children, _prefix);

			!ns._hasClickBug() && (this._setPointerEvents = $.noop);

			this._build();
			this._bindEvents(true);

			this._applyPanelsCss();
			this._arrangePanels();

			this.options.hwAccelerable && SUPPORT_WILLCHANGE && this._setHint();
			this.options.adaptiveHeight && this._setAdaptiveHeight();

			this._adjustContainerCss("end");
		},

		/**
		 * Set options values
		 * @param {Object} options
		 */
		_setOptions: function(options) {
			var arrVal = {
				previewPadding: [ 0, 0 ],
				bounce: [ 10, 10 ]
			};

			$.extend(this.options = {
				hwAccelerable: ns.isHWAccelerable(),  // check weather hw acceleration is available
				prefix: "eg-flick",         // prefix value of class name
				deceleration: 0.0006,       // deceleration value
				horizontal: true,           // move direction (true == horizontal, false == vertical)
				circular: false,			// circular mode. In this mode at least 3 panels are required.
				previewPadding: arrVal.previewPadding,	// preview padding value in left(up) to right(down) order. In this mode at least 5 panels are required.
				bounce: arrVal.bounce,      // bounce value in left(up) to right(down) order. Works only in non-circular mode.
				threshold: 40,				// the distance pixel threshold value for change panel
				duration: 100,				// duration ms for animation
				panelEffect: $.easing.easeOutCubic,  // $.easing function for panel change animation
				defaultIndex: 0,			// initial panel index to be shown
				inputType: ["touch", "mouse"],  // input type
				thresholdAngle: 45,			// the threshold value that determines whether user action is horizontal or vertical (0~90)
				adaptiveHeight: false		// Set container's height be adaptive according panel's height
			}, options);

			var self = this;
			$.each(arrVal, function(i, v) {
				var val = self.options[i];

				if ($.isNumeric(val)) {
					val = [ val, val ];
				} else if (!$.isArray(val)) {
					val = v;
				}

				self.options[i] = val;
			});
		},

		/**
		 * Set config values
		 * @param {jQuery} $children wrappers' children elements
		 * @param {String} _prefix event prefix
		 */
		_setConfig: function($children, _prefix) {
			var options = this.options;
			var padding = options.previewPadding;

			if ($children.eq(0).hasClass(options.prefix + "-container")) {
				this.$container = $children;
				$children = $children.children();
			}

			// config value
			this._conf = {
				panel: {
					$list: $children,	// panel list
					index: 0,			// dom index used among process
					no: 0,				// panel no used among process
					currIndex: 0,       // current physical dom index
					currNo: 0,          // current logical panel number
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
					lastPos: 0,			// to determine move on holding
					holding: false
				},
				customEvent: {			// for custom events value
					flick: true,
					restore: false,
					restoreCall: false
				},
				origPanelStyle: {		// remember original class and inline style in case of restoration on destroy()
					wrapper: {
						className: this.$wrapper.attr("class") || null,
						style: this.$wrapper.attr("style") || null
					},
					list: $children.map(function(i, v) {
						return {
							className: $(v).attr("class") || null,
							style: $(v).attr("style") || null
						};
					})
				},
				inputEvent: false,		// input event biding status
				useLayerHack: options.hwAccelerable && !SUPPORT_WILLCHANGE,
				dirData: [],			// direction constant value according horizontal or vertical
				indexToMove: 0,
				eventPrefix: _prefix || "",

				// For buggy link highlighting on Android 2.x
				$dummyAnchor: null
			};

			$([["LEFT", "RIGHT"], ["UP", "DOWN"]][+!options.horizontal]).each(
				$.proxy(function (i, v) {
					this._conf.dirData.push(MC["DIRECTION_" + v]);
				}, this));
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
			var bounce = options.bounce;

			this._setPadding(padding, true);
			var sizeValue = this._getDataByDirection([ panel.size, "100%" ]);

			// create container element
			cssValue = "position:relative;z-index:2000;width:100%;height:100%;" +
				(horizontal ? "" : "top:0;");

			if (this.$container) {
				this.$container.attr("style", cssValue);
			} else {
				this.$container = $children.wrapAll(
					"<div class='" + prefix + "-container' style='" + cssValue + "'>"
				).parent();
			}

			// panels' css values
			$children.addClass(prefix + "-panel").css({
				position: "absolute",
				width: sizeValue[0],
				height: sizeValue[1],
				boxSizing: "border-box",
				top: 0,
				left: 0
			});

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
				deceleration: options.deceleration,
				bounce: this._getDataByDirection([ 0, bounce[1], 0, bounce[0] ])
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
			var paddingSum = padding[0] + padding[1];
			var cssValue = {};

			if (paddingSum || !build) {
				cssValue.padding = (horizontal ?
					"0 " + padding.reverse().join("px 0 ") :
					padding.join("px 0 ")) + "px";
			}

			if (build) {
				cssValue.overflow = "hidden";
				cssValue.boxSizing = "border-box";
			}

			!$.isEmptyObject(cssValue) &&
				this.$wrapper.css(cssValue);

			panel.size = this.$wrapper[ horizontal ? "width" : "height" ]();
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
			var baseIndex;

			if (this.options.circular) {
				// if default index is given, then move correspond panel to the first position
				if (index > 0 && index <= lastIndex) {
					this._movePanelPosition(index, true);
				}

				// set first panel's position according physical node length
				baseIndex = this._getBasePositionIndex();
				this._movePanelPosition(baseIndex, false);

				this._setPanelNo({
					no: index,
					currNo: index
				});
			} else {
				// if defaultIndex option is given, then move to that index panel
				if (index > 0 && index <= lastIndex) {
					this._setPanelNo({
						index: index,
						no: index,
						currIndex: index,
						currNo: index
					});

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
			var baseIndex;

			if (this.options.circular) {
				// when arranging panels, set flag to not trigger flick custom event
				conf.customEvent.flick = false;

				// move elements according direction
				if (sort) {
					indexToMove && (touch.direction = dirData[+!Boolean(indexToMove > 0)]);
					this._arrangePanelPosition(touch.direction, indexToMove);
				}

				// set index for base element's position
				baseIndex = this._getBasePositionIndex();

				this._setPanelNo({
					index: baseIndex,
					currIndex: baseIndex
				});

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
						value !== paddingTop && (container.top = "0px");
					}

					this._setTranslate([-coords[+!options.horizontal], 0]);

				} else if (phase === "end") {
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
			if (isDirVal) {
				coord = this._getDataByDirection(coord);
			}

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
			value = value.concat();
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
			return Math.floor(this._conf.panel.count / 2 - 0.1);
		},

		/**
		 * Bind events
		 * @param {Boolean} bind
		 */
		_bindEvents: function (bind) {
			var options = this.options;
			var $wrapper = this.$wrapper;
			var mcInst = this._mcInst;

			if (bind) {
				mcInst.bind($wrapper, {
					scale: this._getDataByDirection([-1, 0]),
					direction: MC["DIRECTION_" +
					(options.horizontal ? "HORIZONTAL" : "VERTICAL")],
					interruptable: false,
					inputType: options.inputType,
					thresholdAngle: options.thresholdAngle
				}).on({
					hold: $.proxy(this._holdHandler, this),
					change: $.proxy(this._changeHandler, this),
					release: $.proxy(this._releaseHandler, this),
					animationStart: $.proxy(this._animationStartHandler, this),
					animationEnd: $.proxy(this._animationEndHandler, this)
				});
			} else {
				mcInst.unbind($wrapper).off();
			}

			this._conf.inputEvent = !!bind;
		},

		/**
		 * 'hold' event handler
		 */
		_holdHandler: function (e) {
			var conf = this._conf;

			conf.touch.holdPos = e.pos;
			conf.touch.holding = true;
			conf.panel.changed = false;

			this._adjustContainerCss("start", e.pos);
		},

		/**
		 * 'change' event handler
		 */
		_changeHandler: function (e) {
			var conf = this._conf;
			var touch = conf.touch;
			var posIndex = +!this.options.horizontal;
			var pos = e.pos[posIndex];
			var holdPos = touch.holdPos[posIndex];
			var direction;
			var eventRes = null;
			var movedPx;

			this._setPointerEvents(e);  // for "click" bug

			/**
			 * This event is fired when panel moves.
			 * @ko 패널이 이동할 때 발생하는 이벤트
			 * @name eg.Flicking#flick
			 * @event
			 * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
			 * @param {String} param.eventType The name of the event<ko>이름명</ko>
			 * @param {Number} param.index Physical index number of the current panel element, which is relative to DOM (@deprecated since 1.3.0)<ko>현재 패널 엘리먼트의 물리적 인덱스 번호. DOM 엘리먼트를 기준으로 하는 인덱스 번호다 (@deprecated since 1.3.0)</ko>
			 * @param {Number} param.no Logical index number of the current panel element, which is relative to the panel content <ko>현재 패널 엘리먼트의 논리적 인덱스 번호. 패널 콘텐츠를 기준으로 하는 인덱스 번호다</ko>
			 * @param {Number} param.direction Direction of the movement (see eg.MovableCoord.DIRECTION_* constant) <ko>이동 방향(eg.MovableCoord.DIRECTION_* constant 참고)</ko>
			 * @param {Array} param.pos Start coordinate <ko>출발점 좌표</ko>
			 * @param {Number} param.pos.0 x-coordinate <ko>x 좌표</ko>
			 * @param {Number} param.pos.1 y-coordinate <ko>y 좌표</ko>
			 * @param {Boolean} param.holding Indicates whether a user holds an element on the screen of the device. <ko>사용자가 기기의 화면을 누르고 있는지 여부</ko>
			 * @param {Number} param.distance Distance moved from then starting point. According the move direction, positive on eg.MovableCoord.DIRECTION_LEFT/UP and negative on eg.MovableCoord.DIRECTION_RIGHT/DOWN <ko>시작점부터 이동된 거리의 값. 이동 방향에 따라 eg.MovableCoord.DIRECTION_LEFT/UP의 경우 양수를 eg.MovableCoord.DIRECTION_RIGHT/DOWN의 경우는 음수를 반환</ko>
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
				direction: direction || touch.direction,
				distance: pos - (holdPos || (touch.holdPos[posIndex] = pos))
			}));

			(eventRes || eventRes === null) && this._setTranslate([ -pos, 0 ]);
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
			touch.holding = false;

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
		 * Set container's height value according to children's height
		 * @param {Number} direction
		 */
		_setAdaptiveHeight: function(direction) {
			var $panel;
			var $first;
			var $children;
			var height;
			var dataName = "data-height";

			$panel = this[ "get" + (
					direction === MC.DIRECTION_LEFT && "Next" ||
					direction === MC.DIRECTION_RIGHT && "Prev" || ""
				) + "Element" ]();

			$first = $panel.find(":first");
			height = $first.attr(dataName);

			if (!height) {
				$children = $panel.children();
				height = ($children.length > 1 ? $panel.css("height", "auto") : $first)
					.outerHeight(true);

				$first.attr(dataName, height);
			}

			this.$wrapper.height(height);
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
			 * This event is fired before an element is restored to its original position when user action is done while the element is not dragged until a certain distance threshold is reached
			 * @ko 다음 패널로 바뀌는 기준 이동 거리만큼 이동하기 전에 사용자의 동작이 끝났을 때 원래 패널로 복원되기 전에 발생하는 이벤트
			 * @name eg.Flicking#beforeRestore
			 * @event
			 * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
			 * @param {String} param.eventType The name of the event <ko>이름명</ko>
			 * @param {Number} param.index Physical index number of the current panel element, which is relative to DOM. (@deprecated since 1.3.0)<ko>현재 패널 엘리먼트의 물리적 인덱스 번호. DOM 엘리먼트를 기준으로 하는 인덱스 번호다. (@deprecated since 1.3.0)</ko>
			 * @param {Number} param.no Logical index number of the current panel element, which is relative to the panel content.<ko>현재 패널 엘리먼트의 논리적 인덱스 번호. 패널 콘텐츠를 기준으로 하는 인덱스 번호다</ko>
			 * @param {Number} param.direction Direction of the movement (see eg.MovableCoord.DIRECTION_* constant) <ko>이동 방향(eg.MovableCoord.DIRECTION_* constant 참고)</ko>
			 * @param {Array} param.depaPos Start coordinate <ko>출발점 좌표</ko>
			 * @param {Number} param.depaPos.0 x-coordinate <ko>x 좌표</ko>
			 * @param {Number} param.depaPos.1 y-coordinate <ko>y 좌표</ko>
			 * @param {Array} param.destPos End coordinate <ko>도착점 좌표</ko>
			 * @param {Number} param.destPos.0 x-coordinate <ko>x 좌표</ko>
			 * @param {Number} param.destPos.1 y-coordinate <ko>y 좌표</ko>
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
			 * This event is fired after an element is restored to its original position when user action is done while the element is not dragged until a certain distance threshold is reached.
			 * @ko 다음 패널로 바뀌는 기준 이동 거리만큼 이동하기 전에 사용자의 동작이 끝났을 때 원래 패널로 복원된 다음 발생하는 이벤트
			 * @name eg.Flicking#restore
			 * @event
			 * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
			 * @param {String} param.eventType The name of the event <ko>이름명</ko>
			 * @param {Number} param.index Physical index number of the current panel element, which is relative to DOM(@deprecated since 1.3.0)<ko>현재 패널 엘리먼트의 물리적 인덱스 번호. DOM 엘리먼트를 기준으로 하는 인덱스 번호다 (@deprecated since 1.3.0)</ko>
			 * @param {Number} param.no Logical index number of the current panel element, which is relative to the panel content. <ko>현재 패널 엘리먼트의 논리적 인덱스 번호. 패널 콘텐츠를 기준으로 하는 인덱스 번호다</ko>
			 * @param {Number} param.direction Direction of the panel move (see eg.MovableCoord.DIRECTION_* constant) <ko>이동 방향(eg.MovableCoord.DIRECTION_* constant 참고)</ko>
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
				/**
				 * This event is fired before flicking starts
				 * @ko 플리킹이 시작하기 전에 발생하는 이벤트
				 * @name eg.Flicking#beforeFlickStart
				 * @event
				 * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
				 * @param {String} param.eventType The name of the event <ko>이름명</ko>
				 * @param {Number} param.index Physical index number of the current panel element, which is relative to DOM. (@deprecated since 1.3.0)<ko>현재 패널 엘리먼트의 물리적 인덱스 번호. DOM 엘리먼트를 기준으로 하는 인덱스 번호다 (@deprecated since 1.3.0)</ko>
				 * @param {Number} param.no Logical index number of the current panel element, which is relative to the panel content.<ko>현재 패널 엘리먼트의 논리적 인덱스 번호. 패널 콘텐츠를 기준으로 하는 인덱스 번호다</ko>
				 * @param {Number} param.direction Direction of the movement (see eg.MovableCoord.DIRECTION_* constant) <ko>−	이동 방향(eg.MovableCoord.DIRECTION_* constant 참고)</ko>
				 * @param {Array} param.depaPos Start coordinate <ko>출발점 좌표</ko>
				 * @param {Number} param.depaPos.0 x-coordinate <ko>x 좌표</ko>
				 * @param {Number} param.depaPos.1 y-coordinate <ko>y 좌표</ko>
				 * @param {Array} param.destPos End coordinate <ko>도착점 좌표</ko>
				 * @param {Number} param.destPos.0 x-coordinate <ko>x 좌표</ko>
				 * @param {Number} param.destPos.1 y-coordinate <ko>y 좌표</ko>
				 */
				if (!this._triggerEvent(EVENTS.beforeFlickStart, pos)) {
					return panel.changed = panel.animating = false;
				} else {
					options.adaptiveHeight && this._setAdaptiveHeight(conf.touch.direction);
				}

				conf.indexToMove === 0 && this._setPanelNo();
			} else if (phase === "end") {
				if (options.circular && panel.changed) {
					this._arrangePanels(true, conf.indexToMove);
				}

				!IS_ANDROID2 && this._setTranslate([-panel.size * panel.index, 0]);
				conf.touch.distance = conf.indexToMove = 0;

				/**
				 * This event is fired after panel moves.
				 * @ko 패널이 이동한 다음 발생하는 이벤트
				 * @name eg.Flicking#flickEnd
				 * @event
				 * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
				 * @param {String} param.eventType The name of the event <ko>이름명</ko>
				 * @param {Number} param.index Physical index number of the current panel element, which is relative to DOM (@deprecated since 1.3.0)<ko>현재 패널 엘리먼트의 물리적 인덱스 번호. DOM 엘리먼트를 기준으로 하는 인덱스 번호다 (@deprecated since 1.3.0)</ko>
				 * @param {Number} param.no Logical index number of the current panel element, which is relative to the panel content. <ko>현재 패널 엘리먼트의 논리적 인덱스 번호. 패널 콘텐츠를 기준으로 하는 인덱스 번호다.</ko>
				 * @param {Number} param.direction Direction of the movemen (see eg.MovableCoord.DIRECTION_* constant) <ko>−	이동 방향(eg.MovableCoord.DIRECTION_* constant 참고</ko>
				 */
				panel.changed && this._triggerEvent(EVENTS.flickEnd);
			}

			!(phase === "start" && pos === undefined) && this._adjustContainerCss(phase);
		},

		/**
		 * Get positive or negative according direction
		 */
		_getNumByDirection: function() {
			var conf = this._conf;
			return conf.touch.direction === conf.dirData[0] ? 1 : -1;
		},

		/**
		 * Revert panel number
		 */
		_revertPanelNo: function() {
			var panel = this._conf.panel;
			var num = this._getNumByDirection();

			var index = panel.currIndex >= 0 ? panel.currIndex : panel.index - num;
			var no = panel.currNo >= 0 ? panel.currNo : panel.no - num;

			this._setPanelNo({
				index: index,
				no: no
			});
		},

		/**
		 * Set the panel number
		 * @param {Object} obj number object
		 */
		_setPanelNo: function (obj) {
			var panel = this._conf.panel;
			var count = panel.origCount - 1;
			var num = this._getNumByDirection();

			if ($.isPlainObject(obj)) {
				$.each(obj, function(i, v) {
					panel[i] = v;
				});

			} else {
				// remember current value
				panel.currIndex = panel.index;
				panel.currNo = panel.no;

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
			coords = this._getDataByDirection(coords);

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
			var options = this.options;
			var mcInst = this._mcInst;
			var isMovable = Math.abs(this._conf.touch.distance) >= options.threshold;
			var max;
			var currPos;

			if (!options.circular && isMovable) {
				max = this._getDataByDirection(mcInst.options.max)[0];
				currPos = this._getDataByDirection(mcInst.get())[0];

				// if current position out of range
				if (currPos < 0 || currPos > max) {
					return false;
				}
			}

			return isMovable;
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

			// pass changed panel no only on 'flickEnd' event
			if (name === EVENTS.flickEnd) {
				panel.currNo = panel.no;
				panel.currIndex = panel.index;
			}

			return this.trigger(conf.eventPrefix + name, $.extend({
				eventType: name,
				index: panel.currIndex,
				no: panel.currNo,
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
			var pos = panel.currIndex;
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
				index = panel.currNo;
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
		 * Returns the index number of the current panel element.
		 * @ko 현재 패널 엘리먼트의 인덱스 번호를 반환한다
		 * @method eg.Flicking#getIndex
		 * @param {Boolean} [physical=false] Types of index numbers<br>- true: Indicates physical index numbers relative to DOM.<br>- false: Indicates logical index numbers relative to the panel content. <ko>−	인덱스 번호의 종류<br>- true: 물리적 인덱스 번호. DOM 엘리먼트를 기준으로 하는 인덱스 번호다.<br>- false: 논리적 인덱스 번호. 패널 콘텐츠를 기준으로 하는 인덱스 번호다.</ko>
		 * @return {Number} Index number of the current panel element <ko>현재 패널의 인덱스 번호</ko>
		 */
		getIndex: function (physical) {
			return this._conf.panel[ physical ? "currIndex" : "currNo" ];
		},

		/**
		 * Returns the reference of the current panel element.
		 * @ko 현재 패널 엘리먼트의 레퍼런스를 반환한다
		 * @method eg.Flicking#getElement
		 * @return {jQuery} Current element <ko>현재 엘리먼트</ko>
		 */
		getElement: function () {
			var panel = this._conf.panel;
			return $(panel.$list[ panel.currIndex ]);
		},

		/**
		 * Returns the reference of the next panel element.
		 * @ko 다음 패널 엘리먼트의 레퍼런스를 반환한다.
		 * @method eg.Flicking#getNextElement
		 * @return {jQuery|null} Next panel element or null if it does not exist.<ko>다음 패널 엘리먼트. 패널이 없으면 'null'을 반환한다.</ko>
		 */
		getNextElement: function () {
			return this._getElement(this._conf.dirData[0], true);
		},

		/**
		 * Returns the index number of the next panel element.
		 * @ko 다음 패널 엘리먼트의 인덱스 번호를 반환한다
		 * @method eg.Flicking#getNextIndex
		 * @param {Boolean} [physical=false] Types of index numbers<br>- true: Indicates physical index numbers relative to DOM.<br>- false: Indicates logical index numbers relative to the panel content. <ko>−	인덱스 번호의 종류<br>- true: 물리적 인덱스 번호. DOM 엘리먼트를 기준으로 하는 인덱스 번호다.<br>- false: 논리적 인덱스 번호. 패널 콘텐츠를 기준으로 하는 인덱스 번호다.</ko>
		 * @return {Number|null} Index number of the next panel element or null if it does not exist. <ko>다음 패널 엘리먼트의 인덱스 번호. 패널이 없으면 'null'을 반환한다</ko>
		 */
		getNextIndex: function (physical) {
			return this._getElement(this._conf.dirData[0], false, physical);
		},

		/**
		 * Returns the references of whole panel elements.
		 * @ko 패널을 구성하는 모든 엘리먼트의 레퍼런스를 반환한다
		 * @method eg.Flicking#getAllElements
		 * @return {jQuery} Whole panel elements <ko>모든 패널 엘리먼트</ko>
		 */
		getAllElements: function () {
			return this._conf.panel.$list;
		},

		/**
		 * Returns the reference of the previous panel element.
		 * @ko 이전 패널 엘리먼트의 레퍼런스를 반환한다.
		 * @method eg.Flicking#getPrevElement
		 * @return {jQuery|null} Previous panel element or null if it does not exist. <ko>이전 패널 엘리먼트. 패널이 없으면 'null'을 반환한다</ko>
		 */
		getPrevElement: function () {
			return this._getElement(this._conf.dirData[1], true);
		},

		/**
		 * Returns the index number of the previous panel element.
		 * @ko 이전 패널 엘리먼트의 인덱스 번호를 반환한다
		 * @method eg.Flicking#getPrevIndex
		 * @param {Boolean} [physical=false] Types of index numbers<br>- true: Indicates physical index numbers relative to DOM.<br>- false: Indicates logical index numbers relative to the panel content. <ko>−	인덱스 번호의 종류<br>- true: 물리적 인덱스 번호. DOM 엘리먼트를 기준으로 하는 인덱스 번호다.<br>- false: 논리적 인덱스 번호. 패널 콘텐츠를 기준으로 하는 인덱스 번호다.</ko>
		 * @return {Number|null} Previous element index value or null if no more element exist<ko>이전 패널 인덱스 번호. 패널이 없는 경우에는 null</ko>
		 */
		getPrevIndex: function (physical) {
			return this._getElement(this._conf.dirData[1], false, physical);
		},

		/**
		 * Returns the total number of whole panel elements.
		 * @ko 전체 패널 엘리먼트의 개수를 반환한다
		 * @method eg.Flicking#getTotalCount
		 * @deprecated since 1.3.0
		 * @param {Boolean} [physical=false] Number of elements relative to (true: DOM, false: panel content)<ko>엘리먼트 개수의 기준(true: DOM 엘리먼트 기준, false: 패널 콘텐츠 기준)</ko>
		 * @return {Number} Total number of whole panel elements <ko>모든 패널 엘리먼트의 개수</ko>
		 */
		getTotalCount: function (physical) {
			return this._conf.panel[ physical ? "count" : "origCount" ];
		},

		/**
		 * Checks whether the animated panel is playing.
		 * @ko 패널 이동 애니메이션이 진행 중인지 확인한다.
		 * @method eg.Flicking#isPlaying
		 * @return {Boolean} Indicates whether the animated panel is playing <ko>패널 이동 애니메이션 진행 중 여부</ko>
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
			var conf = this._conf;
			var panel = conf.panel;
			var options = this.options;

			if (panel.animating || conf.touch.holding) {
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
		 * Moves an element to the next panel.
		 * @ko 다음 패널로 이동한다.
		 * @method eg.Flicking#next
		 * @param {Number} [duration=options.duration] Duration of the panel movement (unit: ms) <ko>패널 이동 애니메이션 진행 시간(단위: ms)</ko>
		 * @return {eg.Flicking} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
		 */
		next: function (duration) {
			return this._movePanel(true, duration);
		},

		/**
		 * Moves an element to the previous panel.
		 * @ko 이전 패널로 이동한다.
		 * @method eg.Flicking#prev
		 * @param {Number} [duration=options.duration] Duration of the panel movement (unit: ms) <ko>패널 이동 애니메이션 진행 시간(단위: ms)</ko>
		 * @return {eg.Flicking} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
		 */
		prev: function (duration) {
			return this._movePanel(false, duration);
		},

		/**
		 * Moves an element to the indicated panel.
		 * @ko 지정한 패널로 이동한다.
		 * @method eg.Flicking#moveTo
		 * @param {Number} no Logical index number of the target panel element, which is relative to the panel content. <ko>이동할 패널 엘리먼트의 논리적 인덱스 번호. 패널 콘텐츠를 기준으로 하는 인덱스 번호다</ko>
		 * @param {Number} [duration=options.duration] Duration of the panel movement (unit: ms) <ko>패널 이동 애니메이션 진행 시간(단위: ms)</ko>
		 * @return {eg.Flicking} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
		 */
		moveTo: function (no, duration) {
			var conf = this._conf;
			var panel = conf.panel;
			var circular = this.options.circular;
			var currentIndex = panel.index;
			var indexToMove;
			var isPositive;

			no = this._getNumValue(no, -1);

			if (no < 0 || no >= panel.origCount || no === panel.no ||
				panel.animating || conf.touch.holding) {
				return this;
			}

			if (circular) {
				indexToMove = no - panel.no;
				isPositive = indexToMove > 0;

				// check for real panel count which can be moved on each sides
				if (Math.abs(indexToMove) > (isPositive ?
					panel.count - (currentIndex + 1) : currentIndex)) {
					indexToMove = indexToMove + (isPositive ? -1 : 1) * panel.count;
				}

				this._setPanelNo({ no: no });
			} else {
				indexToMove = no - currentIndex;
				this._setPanelNo({ index: no, no: no });
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
		 * Updates the size of the panel.
		 * @ko 패널의 크기를 갱신한다
		 * @method eg.Flicking#resize
		 * @return {eg.Flicking} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
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
		 * Restores an element to its original position when it movement stops while the element is not dragged until a certain distance threshold is reached.
		 * @ko 다음 패널로 바뀌기 전에 패널 이동이 멈췄을 때 원래 패널로 복원한다
		 * @method eg.Flicking#restore
		 * @param {Number} [duration=options.duration] Duration of the panel movement (unit: ms) <ko>패널 이동 애니메이션 진행 시간(단위: ms)</ko>
		 * @return {eg.Flicking} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
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
			if (currPos[0] !== panel.currIndex * panel.size) {
				conf.customEvent.restoreCall = true;
				duration = this._getNumValue(duration, this.options.duration);

				this._revertPanelNo();
				destPos = this._getDataByDirection([panel.size * panel.index, 0]);

				this._triggerBeforeRestore({ depaPos: currPos, destPos: destPos });
				this._setMovableCoord("setTo", destPos, true, duration);

				if (!duration) {
					this._adjustContainerCss("end");
					this._triggerRestore();
				}

				// to handle on api call
			} else if (panel.changed) {
				this._revertPanelNo();
				conf.touch.distance = conf.indexToMove = 0;
			}

			return this;
		},

		/**
		 * Set input event biding
		 * @param {Boolean} bind - true: bind, false: unbind
		 * @return {eg.Flicking} instance of itself
		 */
		_setInputEvent: function(bind) {
			var inputEvent = this._conf.inputEvent;

			if (bind ^ inputEvent) {
				this._bindEvents(bind);
			}

			return this;
		},

		/**
		 * Enables input devices.
		 * @ko 입력 장치를 사용할 수 있게 한다
		 * @method eg.Flicking#enableInput
		 * @return {eg.Flicking} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
		 */
		enableInput: function() {
			return this._setInputEvent(true);
		},

		/**
		 * Disables input devices.
		 * @ko 입력 장치를 사용할 수 없게 한다.
		 * @method eg.Flicking#disableInput
		 * @return {eg.Flicking} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
		 */
		disableInput: function() {
			return this._setInputEvent();
		},

		/**
		 * Destroys elements, properties, and events used in a panel.
		 * @ko 패널에 사용한 엘리먼트와 속성, 이벤트를 해제한다
		 * @method eg.Flicking#destroy
		 */
		destroy: function() {
			var conf = this._conf;
			var origPanelStyle = conf.origPanelStyle;
			var wrapper = origPanelStyle.wrapper;
			var list = origPanelStyle.list;

			// unwrap container element and restore original inline style
			this.$wrapper.attr("class", wrapper.className)
				.attr("style", wrapper.style);

			this.$container.children().unwrap().each(function(i, v) {
				var $el = $(v);

				if (i > list.length - 1) {
					return !!$el.remove();
				}

				$el.attr("class", list[i].className)
					.attr("style", list[i].style);
			});

			// unbind events
			this.disableInput();
			this.off();

			// release resources
			for (var x in this) {
				this[x] = null;
			}
		}
	});
});
/**
 * A jQuery plugin available in the eg.Flicking module.
 *
 * @ko eg.Flicking 모듈의 jQuery 플러그인
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
 * A jQuery custom event of the eg.Flicking module. This event is fired before an element is restored to its original position when user action is done while the element is not dragged until a certain distance threshold is reached.
 *
 * @ko eg.Flicking 모듈의 jQuery 커스텀 이벤트. 다음 패널로 바뀌는 기준 이동 거리만큼 이동하기 전에 사용자의 동작이 끝났을 때 원래 패널로 복원되기 전에 발생한다
 * @name jQuery#flicking:beforeRestore
 * @event
 * @example
 $("#mflick").on("flicking:beforeRestore",callback);
 $("#mflick").off("flicking:beforeRestore",callback);
 $("#mflick").trigger("flicking:beforeRestore",callback);
 * @see eg.Flicking#event:beforeRestore
 */
/**
 * A jQuery custom event of the eg.Flicking module, which occurs before the flicking starts.
 *
 * @ko eg.Flicking 모듈의 jQuery 커스텀 이벤트. 플리킹을 시작하기 전에 발생한다
 * @name jQuery#flicking:beforeFlickStart
 * @event
 * @example
 $("#mflick").on("flicking:beforeFlickStart",callback);
 $("#mflick").off("flicking:beforeFlickStart",callback);
 $("#mflick").trigger("flicking:beforeFlickStart",callback);
 * @see eg.Flicking#event:beforeFlickStart
 */
/**
 * A jQuery custom event of the eg.Flicking module. This event is fired when panel moves.
 *
 * @ko eg.Flicking 모듈의 jQuery 커스텀 이벤트. 패널이 이동될 때 발생한다
 * @name jQuery#flicking:flick
 * @event
 * @example
 $("#mflick").on("flicking:flick",callback);
 $("#mflick").off("flicking:flick",callback);
 $("#mflick").trigger("flicking:flick",callback);
 * @see eg.Flicking#event:flick
 */
/**
 * A jQuery custom event of the eg.Flicking module. This event is fired after the panel moves.
 *
 * @ko eg.Flicking 모듈의 jQuery 커스텀 이벤트. 패널이 이동된 뒤 발생한다
 * @name jQuery#flicking:flickEnd
 * @event
 * @example
 $("#mflick").on("flicking:flickEnd",callback);
 $("#mflick").off("flicking:flickEnd",callback);
 $("#mflick").trigger("flicking:flickEnd",callback);
 * @see eg.Flicking#event:flickEnd
 */
/**
 * A jQuery custom event of the eg.Flicking module. This event is fired after an element is restored to its original position when user action is done while the element has not bene dragged until a certain distance threshold is reached.
 *
 * @ko eg.Flicking 모듈의 jQuery 커스텀 이벤트. 다음 패널로 바뀌는 기준 이동 거리만큼 이동하기 전에 사용자의 동작이 끝났을 때 원래 패널로 복원된 다음 발생한다
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
eg.module("infiniteGrid", ["jQuery", eg, window, document], function($, ns, global, doc) {
/**
	 * A module used to arrange card elements including content infinitely on a grid layout. With this module, you can implement a grid-pattern user interface composed of different card elements whose sizes vary. It guarantees performance by maintaining the number of DOMs the module is handling under any circumstance
	 * @group egjs
	 * @ko 콘텐츠가 있는 카드 엘리먼트를 그리드 레이아웃에 무한으로 배치하는 모듈. 다양한 크기의 카드 엘리먼트를 격자 모양으로 배치하는 UI를 만들 수 있다. 카드 엘리먼트의 개수가 계속 늘어나도 모듈이 처리하는 DOM의 개수를 일정하게 유지해 최적의 성능을 보장한다
	 * @class
	 * @name eg.InfiniteGrid
	 * @extends eg.Component
	 *
	 * @param {HTMLElement|String|jQuery} element A base element for a module <ko>모듈을 적용할 기준 엘리먼트</ko>
	 * @param {Object} [options] The option object of the eg.InfiniteGrid module <ko>eg.InfiniteGrid 모듈의 옵션 객체</ko>
	 * @param {String} [options.itemSelector] A selector to select card elements that make up the layout (@deprecated since 1.3.0)<ko>레이아웃을 구성하는 카드 엘리먼트를 선택할 선택자(selector) (@deprecated since 1.3.0)</ko>
	 * @param {Number} [options.count=30] The number of DOMs handled by module. If the count value is greater than zero, the number of DOMs is maintained. If the count value is zero or less than zero, the number of DOMs will increase as card elements are added. <ko>모듈이 유지할 실제 DOM의 개수. count 값이 0보다 크면 DOM 개수를 일정하게 유지한다. count 값이 0 이하면 카드 엘리먼트가 추가될수록 DOM 개수가 계속 증가한다.</ko>
	 * @param {String} [options.defaultGroupKey=null] The default group key configured in a card element contained in the markup upon initialization of a module object <ko>모듈 객체를 초기화할 때 마크업에 있는 카드 엘리먼트에 설정할 그룹 키 </ko>
	 * @param {Boolean} [options.isEqualSize=false] Indicates whether sizes of all card elements are equal to one another. If sizes of card elements to be arranged are all equal and this option is set to "true", the performance of layout arrangement can be improved. <ko>카드 엘리먼트의 크기가 동일한지 여부. 배치될 카드 엘리먼트의 크기가 모두 동일할 때 이 옵션을 'true'로 설정하면 레이아웃 배치 성능을 높일 수 있다</ko>
	 * @param {Number} [options.threshold=300] The threshold size of an event area where card elements are added to a layout.<br>- append event: If the current vertical position of the scroll bar is greater than "the bottom property value of the card element at the top of the layout" plus "the value of the threshold option", the append event will occur.<br>- prepend event: If the current vertical position of the scroll bar is less than "the bottom property value of the card element at the top of the layout" minus "the value of the threshold option", the prepend event will occur. <ko>−	레이아웃에 카드 엘리먼트를 추가하는 이벤트가 발생하는 기준 영역의 크기.<br>- append 이벤트: 현재 스크롤의 y 좌표 값이 '레이아웃의 맨 아래에 있는 카드 엘리먼트의 top 속성의 값 + threshold 옵션의 값'보다 크면 append 이벤트가 발생한다.<br>- prepend 이벤트: 현재 스크롤의 y 좌표 값이 '레이아웃의 맨 위에 있는 카드 엘리먼트의 bottom 속성의 값 - threshold 옵션의 값'보다 작으면 prepend 이벤트가 발생한다</ko>
	 *
	 * @codepen {"id":"zvrbap", "ko":"InfiniteGrid 데모", "en":"InfiniteGrid example", "collectionId":"DPYEww", "height": 403}
	 *  @support {"ie": "8+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.1+ (except 3.x)"}
	 *
	 * @example
		<!-- HTML -->
		<ul id="grid">
			<li class="card">
				<div>test1</div>
			</li>
			<li class="card">
				<div>test2</div>
			</li>
			<li class="card">
				<div>test3</div>
			</li>
			<li class="card">
				<div>test4</div>
			</li>
			<li class="card">
				<div>test5</div>
			</li>
			<li class="card">
				<div>test6</div>
			</li>
		</ul>
		<script>
		var some = new eg.InfiniteGrid("#grid").on("layoutComplete", function(e) {
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
				isEqualSize: false,
				defaultGroupKey: null,
				count: 30,
				threshold: 300
			}, options);

			// if el is jQuery instance, el should change to HTMLElement.
			this.$el = el instanceof $ ? el : $(el);
			this.el = this.$el.get(0);
			this.el.style.position = "relative";
			this._prefix = _prefix || "";
			this._isIos = /iPhone|iPad/.test(global.navigator.userAgent);
			this._isIE10lower = !!(doc.documentMode && doc.documentMode < 10);
			this._appendCols = this._prependCols = [];
			this.$view = $(global);
			this._reset();
			this._refreshViewport();
			if (this.el.children.length > 0) {
				this.items = this._itemize($.makeArray(this.el.children), this.options.defaultGroupKey, true);
				this.layout(this.items, true);
			}

			this._onScroll = $.proxy(this._onScroll, this);
			this._onResize = $.proxy(this._onResize, this);
			this.$view.on("scroll", this._onScroll)
				.on("resize", this._onResize);
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
				if ($.isEmptyObject(this._bottomElement)) {
					this._bottomElement = this.getBottomElement();
					if (this._bottomElement == null) {
						return;
					}
				}
				ele = this._bottomElement;
				rect = ele.getBoundingClientRect();
				if (rect.top <= this._clientHeight + this.options.threshold) {
					/**
					 * This event is fired when a card element must be added at the bottom of a grid layout because there is no card to be displayed on screen when a user scrolls near bottom.
					 * @ko 카드 엘리먼트가 그리드 레이아웃의 아래에 추가돼야 할 때 발생하는 이벤트. 사용자가 아래로 스크롤해서 화면에 표시될 카드가 없을 때 발생한다
					 * @name eg.InfiniteGrid#append
					 * @event
					 *
					 * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
					 * @param {Number} param.scrollTop Current vertical position of the scroll bar<ko>현재 스크롤의 y 좌표 값</ko>
					 */
					this.trigger(this._prefix + EVENTS.append, {
						scrollTop: scrollTop
					});
				}
			} else {
				if (this.isRecycling() && this._removedContent > 0) {
					if ($.isEmptyObject(this._topElement)) {
						this._topElement = this.getTopElement();
						if (this._topElement == null) {
							return;
						}
					}
					ele = this._topElement;
					rect = ele.getBoundingClientRect();
					if (rect.bottom >= -this.options.threshold) {
						/**
						 * This event is fired when a card element must be added at the top of a grid layout because there is no card to be displayed on screen when a user scrolls near top. This event is available only if the isRecycling() method returns true.
						 * @ko 카드가 그리드 레이아웃의 위에 추가돼야 할 때 발생하는 이벤트. 사용자가 위로 스크롤해서 화면에 표시될 카드가 없을 때 발생한다. 이 이벤트는 isRecycling() 메서드의 반환값이 'true'일 때만 발생한다
						 * @name eg.InfiniteGrid#prepend
						 * @event
						 *
						 * @param {Object} param The object of data to be sent to an event<ko>이벤트에 전달되는 데이터 객체</ko>
						 * @param {Number} param.scrollTop Current vertical position of the scroll bar<ko>현재 스크롤의 y 좌표 값</ko>
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
			if (this._resizeTimeout) {
				clearTimeout(this._resizeTimeout);
			}
			var self = this;
			this._resizeTimeout = setTimeout(function() {
				self._refreshViewport();
				(self.$el.innerWidth() !== self._containerWidth) && self.layout(self.items, true);
				self._resizeTimeout = null;
			}, 100);
		},
		_refreshViewport: function() {
			var el = this.$view.get(0);
			if (el) {
				this._clientHeight = $.isWindow(el) ? el.innerHeight : el.clientHeight;
			}
		},
		/**
		 * Returns the current state of a module such as location information. You can use the setStatus() method to restore the information returned through a call to this method.
		 * @ko 카드의 위치 정보 등 모듈의 현재 상태 정보를 반환한다. 이 메서드가 반환한 정보를 저장해 두었다가 setStatus() 메서드로 복원할 수 있다
		 * @method eg.InfiniteGrid#getStatue
		 * @return {Object} State object of the eg.InfiniteGrid module<ko>eg.InfiniteGrid 모듈의 상태 객체</ko>
		 */
		getStatus: function() {
			var data = {};
			var p;
			for (p in this) {
				if (this.hasOwnProperty(p) && /^_/.test(p) &&
					typeof this[p] !== "function" && !(this[p] instanceof Element)) {
					data[p] = this[p];
				}
			}
			return {
				prop: data,
				options: $.extend({}, this.options),
				items: $.map(this.items, function(v) {
					var clone = $.extend({}, v);
					delete clone.el;
					return clone;
				}),
				html: this.el.innerHTML,
				cssText: this.el.style.cssText
			};
		},
		/**
		 * Sets the state of the eg.InfiniteGrid module with the information returned through a call to the getStatue() method.
		 * @ko getStatue() 메서드가 저장한 정보로 eg.InfiniteGrid 모듈의 상태를 설정한다.
		 * @method eg.InfiniteGrid#setStatus
		 * @param {Object} status State object of the eg.InfiniteGrid module <ko>eg.InfiniteGrid 모듈의 상태 객체</ko>
		 * @return {eg.InfiniteGrid} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
		 */
		setStatus: function(status) {
			if (!status || !status.cssText || !status.html ||
				!status.prop || !status.items) {
				return this;
			}
			this.el.style.cssText = status.cssText;
			this.el.innerHTML = status.html;
			$.extend(this, status.prop);
			this._topElement = this._bottomElement = null;
			this.items = $.map(this.el.children, function(v, i) {
				status.items[i].el = v;
				return status.items[i];
			});
			return this;
		},
		/**
		 * Checks whether a card element is being added.
		 * @ko 카드 엘리먼트 추가가 진행 중인지 확인한다
		 * @method eg.InfiniteGrid#isProcessing
		 * @return {Boolean} Indicates whether a card element is being added <ko>카드 엘리먼트 추가 진행 중 여부</ko>
		 */
		isProcessing: function() {
			return this._isProcessing;
		},
		/**
		 * Checks whether the total number of added card elements is greater than the value of the count option. Note that the value of the count option is always greater than zero. If it returns true, the number of DOMs won't increase even though card elements are added; instead of adding a new DOM, existing DOMs are recycled to maintain the number of DOMs.
		 * @ko 추가된 카드 엘리먼트의 전체 개수가 count 옵션의 값보다 큰지 확인한다. 단, count 옵션의 값은 0보다 크다. 'true'가 반환되면 카드 엘리먼트가 더 추가돼도 DOM의 개수를 증가하지 않고 기존 DOM을 재활용(recycle)해 DOM의 개수를 일정하게 유지한다
		 * @method eg.InfiniteGrid#isRecycling
		 * @return {Boolean} Indicates whether the total number of added card elements is greater than the value of the count option. <ko>추가된 카드 엘리먼트의 전체 개수가 count 옵션의 값보다 큰지 여부</ko>
		 */
		isRecycling: function() {
			return (this.options.count > 0) && this._isRecycling;
		},
		/**
		 * Returns the list of group keys which belongs to card elements currently being maintained. You can use the append() or prepend() method to configure group keys so that multiple card elements can be managed at once. If you do not use these methods to configure group keys, it returns undefined as a group key.
		 * @ko 현재 유지하고 있는 카드 엘리먼트의 그룹 키 목록을 반환한다. 여러 개의 카드 엘리먼트를 묶어서 관리할 수 있도록 append() 메서드나 prepend() 메서드에서 그룹 키를 지정할 수 있다. append() 메서드나 prepend() 메서드에서 그룹 키를 지정하지 않았다면 'undefined'가 그룹 키로 반환된다
		 * @method eg.InfiniteGrid#getGroupKeys
		 * @return {Array} List of group keys <ko>그룹 키의 목록</ko>
		 */
		getGroupKeys: function() {
			return $.map(this.items, function(v) {
				return v.groupKey;
			});
		},
		/**
		 * Rearranges a layout.
		 * @ko 레이아웃을 다시 배치한다.
		 * @method eg.InfiniteGrid#layout
		 * @return {eg.InfiniteGrid} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
		 */
		layout: function(items, isRefresh) {
			items = items || this.items;
			isRefresh = typeof isRefresh === "undefined" ? true : isRefresh;
			this._isProcessing = true;
			isRefresh && (items = $.map(items, function(v) {
				v.isAppend = true;
				return v;
			}));
			this._waitResource(items, isRefresh);
			return this;
		},
		_layoutItems: function(items) {
			var self = this;

			// for performance
			$.each(
				$.map(items, function(v) {
					v.position = self._getItemLayoutPosition(v);
					return v;
				}),
				function(i, v) {
					if (v.el) {
						var style = v.el.style;
						style.left = v.position.x + "px";
						style.top = v.position.y + "px";
					}
				});
		},
		/**
		 * Adds a card element at the bottom of a grid layout. This method is available only if the isProcessing() method returns false.
		 * @ko 카드 엘리먼트를 그리드 레이아웃의 아래에 추가한다. isProcessing() 메서드의 반환값이 'false'일 때만 이 메서드를 사용할 수 있다
		 * 이 메소드는 isProcessing()의 반환값이 false일 경우에만 사용 가능하다.
		 * @method eg.InfiniteGrid#append
		 * @param {Array|String|jQuery} elements Array of the card elements to be added <ko>추가할 카드 엘리먼트의 배열</ko>
		 * @param {Number|String} [groupKey] The group key to be configured in a card element. It is set to "undefined" by default.<ko>추가할 카드 엘리먼트에 설정할 그룹 키. 생략하면 값이 'undefined'로 설정된다</ko>
		 * @return {Number} The number of added card elements <ko>추가된 카드 엘리먼트의 개수</ko>
		 */
		append: function($elements, groupKey) {
			if (this._isProcessing || $elements.length === 0) {
				return;
			}

			// convert jQuery instance
			$elements = $($elements);
			this._isProcessing = true;
			if (!this.isRecycling()) {
				this._isRecycling =
				(this.items.length + $elements.length) >= this.options.count;
			}
			this._insert($elements, groupKey, true);
			return $elements.length;
		},
		/**
		 * Adds a card element at the top of a grid layout. This method is available only if the isProcessing() method returns false and the isRecycling() method returns true.
		 * @ko 카드 엘리먼트를 그리드 레이아웃의 위에 추가한다. isProcessing() 메서드의 반환값이 'false'이고, isRecycling() 메서드의 반환값이 'true'일 때만 이 메서드를 사용할 수 있다
		 * @method eg.InfiniteGrid#prepend
		 * @param {Array|String|jQuery} elements Array of the card elements to be added <ko>추가할 카드 엘리먼트 배열</ko>
		 * @param {Number|String} [groupKey] The group key to be configured in a card element. It is set to "undefined" by default.<ko>추가할 카드 엘리먼트에 설정할 그룹 키. 생략하면 값이 'undefined'로 설정된다</ko>
		 * @return {Number} The number of added card elements <ko>추가된 카드 엘리먼트의 개수</ko>
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
		 * Clears added card elements and data.
		 * @ko 추가된 카드 엘리먼트와 데이터를 모두 지운다.
		 * @method eg.InfiniteGrid#clear
		 * @return {eg.InfiniteGrid} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
		 */
		clear: function() {
			this.el.innerHTML = "";
			this.el.style.height = "";
			this._reset();
			return this;
		},

		_getTopItem: function() {
			var item = null;
			var min = Infinity;
			$.each(this._getColItems(false), function(i, v) {
				if (v && v.position.y < min) {
					min = v.position.y;
					item = v;
				}
			});
			return item;
		},

		/**
		 * Returns a card element at the top of a layout.
		 * @ko 레이아웃의 맨 위에 있는 카드 엘리먼트를 반환한다.
		 * @method eg.InfiniteGrid#getTopElement
		 *
		 * @return {HTMLElement} Card element at the top of a layout <ko>레이아웃의 맨 위에 있는 카드 엘리먼트</ko>
		 */
		getTopElement: function() {
			var item = this._getTopItem();
			return item && item.el;
		},

		_getBottomItem: function() {
			var item = null;
			var max = -Infinity;
			$.each(this._getColItems(true), function(i, v) {
				if (v && v.position.y + v.size.height > max) {
					max = v.position.y + v.size.height;
					item = v;
				}
			});
			return item;
		},

		/**
		 * Returns a card element at the bottom of a layout.
		 * @ko 레이아웃의 맨 아래에 있는 카드 엘리먼트를 반환한다.
		 * @method eg.InfiniteGrid#getBottomElement
		 *
		 * @return {HTMLElement} Card element at the bottom of a layout <ko>레이아웃의 맨 아래에 있는 카드 엘리먼트</ko>
		 */
		getBottomElement: function() {
			var item = this._getBottomItem();
			return item && item.el;
		},

		_postLayout: function(items) {
			if (!this._isProcessing || items.length <= 0) {
				return;
			}

			var size = this._getContainerSize();
			this.el.style.height = size.height + "px";

			// refresh element
			this._topElement = this.getTopElement();
			this._bottomElement = this.getBottomElement();

			var distance = 0;
			var isAppend = items[0].isAppend;
			if (!isAppend) {
				this._isFitted = false;
				this._fit(true);
				distance = items.length >= this.items.length ?
					0 : this.items[items.length].position.y;
				if (distance > 0) {
					this._prevScrollTop = this._getScrollTop() + distance;
					this.$view.scrollTop(this._prevScrollTop);
				}
			}

			// reset flags
			this._isProcessing = false;

			/**
			 * This event is fired when layout is successfully arranged through a call to the append(), prepend(), or layout() method.
			 * @ko 레이아웃 배치가 완료됐을 때 발생하는 이벤트. append() 메서드나 prepend() 메서드, layout() 메서드 호출 후 카드의 배치가 완료됐을 때 발생한다
			 * @name eg.InfiniteGrid#layoutComplete
			 * @event
			 *
			 * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
			 * @param {Array} param.target Rearranged card elements<ko>재배치된 카드 엘리먼트들</ko>
			 * @param {Boolean} param.isAppend Checks whether the append() method is used to add a card element. It returns true even though the layoutComplete event is fired after the layout() method is called. <ko>카드 엘리먼트가 append() 메서드로 추가됐는지 확인한다. layout() 메서드가 호출된 후 layoutComplete 이벤트가 발생해도 'true'를 반환한다.</ko>
			 * @param {Number} param.distance Distance the card element at the top of a grid layout has moved after the layoutComplete event is fired. In other words, it is the same as an increased height with a new card element added using the prepend() method <ko>그리드 레이아웃의 맨 위에 있던 카드 엘리먼트가 layoutComplete 이벤트 발생 후 이동한 거리. 즉, prepend() 메서드로 카드 엘리먼트가 추가돼 늘어난 높이다.</ko>
			 * @param {Number} param.croppedCount The number of deleted card elements to maintain the number of DOMs<ko>일정한 DOM 개수를 유지하기 위해, 삭제한 카드 엘리먼트들의 개수</ko>
			 */
			this.trigger(this._prefix + EVENTS.layoutComplete, {
				target: items.concat(),
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
			var elements = $elements.toArray();
			var $cloneElements = $(elements);
			var dummy = -this._clientHeight + "px";
			$.each(elements, function(i, v) {
				v.style.position = "absolute";
				v.style.top = dummy;
			});
			var items = this._itemize(elements, groupKey, isAppend);
			if (isAppend) {
				this.items = this.items.concat(items);
			} else {
				this.items = items.concat(this.items);
				items = items.reverse();
			}
			this.isRecycling() && this._adjustRange(isAppend, $cloneElements);

			this.$el[isAppend ? "append" : "prepend"]($cloneElements);
			this.layout(items, false);
		},
		_waitResource: function(items, isRefresh) {
			var needCheck = this._checkImageLoaded();
			var self = this;
			var callback = function() {
				if (self._isProcessing) {
					if (isRefresh || !self._appendCols.length) {
						$.each(items, function(i, v) {
							v.el.style.position = "absolute";
						});
						self._measureColumns();
					}
					self._layoutItems(items);
					self._postLayout(items);
				}
			};
			if (needCheck.length > 0) {
				this._waitImageLoaded(needCheck, callback);
			} else {
				// convert to async
				setTimeout(function() {
					callback && callback();
				}, 0);
			}
		},
		_adjustRange: function (isTop, $elements) {
			var diff = this.items.length - this.options.count;
			var targets;
			var idx;
			if (diff <= 0 || (idx = this._getDelimiterIndex(isTop, diff)) < 0) {
				return;
			}
			if (isTop) {
				targets = this.items.splice(0, idx);
				this._isFitted = false;
			} else {
				targets = this.items.splice(idx, this.items.length - idx);
			}

			// @todo improve performance
			$.each(targets, function(i, v) {
				idx = $elements.index(v.el);
				if (idx !== -1) {
					$elements.splice(idx, 1);
				} else {
					v.el.parentNode.removeChild(v.el);
				}
			});
			this._removedContent += isTop ? targets.length : -targets.length;
		},
		_getDelimiterIndex: function(isTop, removeCount) {
			var len = this.items.length;
			var i;
			var idx = 0;
			var baseIdx = isTop ? removeCount - 1 : len - removeCount;
			var targetIdx = baseIdx + (isTop ? 1 : -1);
			var groupKey = this.items[baseIdx].groupKey;
			if (groupKey != null && groupKey === this.items[targetIdx].groupKey) {
				if (isTop) {
					for (i = baseIdx; i > 0; i--) {
						if (groupKey !== this.items[i].groupKey) {
							break;
						}
					}
					idx =  i === 0 ? -1 : i + 1;
				} else {
					for (i = baseIdx; i < len; i++) {
						if (groupKey !== this.items[i].groupKey) {
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
			if (this.options.count <= 0) {
				this._fit = function() {
					return false;
				};
				this._isFitted = true;
				return false;
			}

			if (this._isFitted) {
				return false;
			}
			var y = this._updateCols();	// for prepend
			$.each(this.items, function(i, v) {
				v.position.y -= y;
				applyDom && (v.el.style.top = v.position.y + "px");
			});
			this._updateCols(true);	// for append
			var height = this._getContainerSize().height;
			applyDom && (this.el.style.height = height + "px");
			this._isFitted = true;
			return true;
		},

		/**
		* Removes extra space caused by adding card elements.
		* @ko 카드 엘리먼트를 추가한 다음 생긴 빈 공간을 제거한다
		* @method eg.InfiniteGrid#fit
		* @deprecated since version 1.3.0
		* @return {Number} Actual length of space removed (unit: px) <ko>빈 공간이 제거된 실제 길이(단위: px)</ko>
		*/
		fit: function() {
			var item = this._getTopItem();
			var distance = item ? item.position.y : 0;
			this._fit(true);
			return distance;
		},
		_reset: function() {
			this._isProcessing = false;
			this._topElement = null;
			this._bottomElement = null;
			this._isFitted = true;
			this._isRecycling = false;
			this._removedContent = 0;
			this._prevScrollTop = 0;
			this._equalItemSize = 0;
			this._resizeTimeout = null;
			this._resetCols(this._appendCols.length || 0);
			this.items = [];
		},
		_checkImageLoaded: function() {
			return this.$el.find("img").filter(function(k, v) {
				if (v.nodeType && ($.inArray(v.nodeType, [1,9,11]) !== -1)) {
					return !v.complete;
				}
			}).toArray();
		},
		_waitImageLoaded: function(needCheck, callback) {
			var checkCount = needCheck.length;
			var onCheck = function(e) {
				checkCount--;
				$(e.target).off("load error");
				checkCount <= 0 && callback && callback();
			};
			var $el;
			var self = this;
			$.each(needCheck, function(i, v) {
				$el = $(v);

				// for IE10 lower
				if (self._isIE10lower) {
					var url = v.getAttribute("src");
					v.setAttribute("src", "");
					v.setAttribute("src", url);
				}
				$el.on("load error", onCheck);
			});
		},
		_measureColumns: function() {
			this.el.style.width = null;
			this._containerWidth = this.$el.innerWidth();
			this._columnWidth = this._getColumnWidth() || this._containerWidth;
			var cols = this._containerWidth / this._columnWidth;
			var excess = this._columnWidth - this._containerWidth % this._columnWidth;

			// if overshoot is less than a pixel, round up, otherwise floor it
			cols = Math.max(Math[ excess && excess <= 1 ? "round" : "floor" ](cols), 1);

			// reset column Y
			this._resetCols(cols || 0);
		},
		_resetCols: function(count) {
			count = typeof count === "undefined" ? 0 : count;
			var arr = [];
			while (count--) {
				arr.push(0);
			}
			this._appendCols = arr.concat();
			this._prependCols = arr.concat();
		},
		_getContainerSize: function() {
			return {
				height: Math.max.apply(Math, this._appendCols),
				width: this._containerWidth
			};
		},
		_getColumnWidth: function() {
			var el = this.items[0] && this.items[0].el;
			var width = 0;
			if (el) {
				var $el = $(el);
				width = $el.innerWidth();
				if (this.options.isEqualSize) {
					this._equalItemSize = {
						width: width,
						height: $el.innerHeight()
					};
				}
			}
			return width;
		},
		_updateCols: function(isAppend) {
			var col = isAppend ? this._appendCols : this._prependCols;
			var items = this._getColItems(isAppend);
			var base = this._isFitted || isAppend ? 0 : this._getMinY(items);
			var i = 0;
			var len = col.length;
			var item;
			for (; i < len; i++) {
				if (item = items[i]) {
					col[i] = item.position.y + (isAppend ? item.size.height : -base);
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
		_getColIdx: function(item) {
			return parseInt(item.position.x / parseInt(this._columnWidth, 10), 10);
		},
		_getColItems: function(isTail) {
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
		_itemize: function(elements, groupKey, isAppend) {
			return $.map(elements, function(v) {
				return {
					el: v,
					position: {
						x: 0,
						y: 0
					},
					isAppend: typeof isAppend === "undefined" ? true : isAppend,
					groupKey: typeof groupKey === "undefined" ? null : groupKey
				};
			});
		},
		_getItemLayoutPosition: function(item) {
			if (!item.el) {
				return;
			}
			var $el = $(item.el);
			item.size = this._equalItemSize || {
				width: $el.innerWidth(),
				height: $el.innerHeight()
			};
			var isAppend = item.isAppend;
			var cols = isAppend ? this._appendCols : this._prependCols;
			var y = Math[isAppend ? "min" : "max"].apply(Math, cols);
			var shortColIndex;
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
			cols[shortColIndex] = y + (isAppend ? item.size.height : -item.size.height);

			return {
				x: this._columnWidth * shortColIndex,
				y: isAppend ? y : y - item.size.height
			};
		},
		/**
		 * Destroys elements, properties, and events used on a grid layout.
		 * @ko 그리드 레이아웃에 사용한 엘리먼트와 속성, 이벤트를 해제한다
		 * @method eg.InfiniteGrid#destroy
		 */
		destroy: function() {
			this.off();
			this.$view.off("resize", this._onResize)
				.off("scroll", this._onScroll);
			this._reset();
		}
	});
});
/**
 * A jQuery plugin available in the eg.InfiniteGrid module.
 * @ko eg.InfiniteGrid 모듈의 jQuery 플러그인
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
	$("#grid").infiniteGrid();
	// method
	$("#grid").infiniteGrid("option","count","60"); //Set option
	$("#grid").infiniteGrid("instance"); // Return infiniteGrid instance
	$("#grid").infiniteGrid("getBottomElement"); // Get bottom element
	</script>
 * @see eg.InfiniteGrid
 */
/**
 * A jQuery custom event of the eg.InfiniteGrid module. This event is fired when a layout is successfully arranged.
 *
 * @ko eg.InfiniteGrid 모듈의 jQuery 커스텀 이벤트. 레이아웃 배치가 완료됐을 때 발생한다
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
	$("#grid").infiniteGrid();
	// event
	$("#grid").on("infiniteGrid:layoutComplete",callback);
	$("#grid").off("infiniteGrid:layoutComplete",callback);
	$("#grid").trigger("infiniteGrid:layoutComplete",callback);
	</script>
 * @see eg.InfiniteGrid#event:layoutComplete
 */
/**
 * A jQuery custom event of the eg.InfiniteGrid module. This event is fired when a card element must be added at the bottom of a grid layout
 *
 * @ko eg.InfiniteGrid 모듈의 jQuery 커스텀 이벤트. 그리드 레이아웃 아래에 카드 엘리먼트가 추가돼야 할 때 발생한다.
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
	$("#grid").infiniteGrid();
	// event
	$("#grid").on("infiniteGrid:append",callback);
	$("#grid").off("infiniteGrid:append",callback);
	$("#grid").trigger("infiniteGrid:append",callback);
	</script>
 * @see eg.InfiniteGrid#event:append
 */
/**
 * A jQuery custom event of the eg.InfiniteGrid module. This event is fired when a card element must be added at the top of a grid layout
 *
 * @ko eg.InfiniteGrid 모듈의 jQuery 커스텀 이벤트. 그리드 레이아웃 위에 카드 엘리먼트가 추가돼야 할 때 발생한다
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
	$("#grid").infiniteGrid();
	// event
	$("#grid").on("infiniteGrid:prepend",callback);
	$("#grid").off("infiniteGrid:prepend",callback);
	$("#grid").trigger("infiniteGrid:prepend",callback);
	</script>
 * @see eg.InfiniteGrid#event:prepend
 */
