/* ========================================================================
 * Phonon: core.js v0.0.1
 * http://phonon.quarkdev.com
 * ========================================================================
 * Licensed under MIT (http://phonon.quarkdev.com)
 * ======================================================================== */

'use strict';

;(function(window, undefined) {

	var phonon = {};
	var readyCallbacks = [];

	/**
	 * Called when Phonon is ready
	 * Used in navigator.js
	 */
	phonon.onReady = function(callback) {
		readyCallbacks.push(callback);
	};

	/**
	 * Dispatches all the ready events
	 */
	phonon.dispatchGlobalReady = function() {
	    var i = readyCallbacks.length - 1;
	    for (; i >= 0; i--) {
	      readyCallbacks[i]();
	    }
	    
	    // Release memory
	    readyCallbacks = [];
	    phonon.dispatchGlobalReady = undefined;
	}

	/**
	 * CustomEvent polyfill
     * IE 9+, Android 4
	*/
	;(function () {
		function CustomEvent ( event, params ) {
			params = params || { bubbles: false, cancelable: false, detail: undefined };
			var evt = document.createEvent( 'CustomEvent' );
			evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
			return evt;
		}

		CustomEvent.prototype = window.Event.prototype;

		window.CustomEvent = CustomEvent;
	})();
phonon.device = (function () {

    /**
     * Device detection
     * Source: http://jsfiddle.net/ChristianL/AVyND/
     */

    // browser
    var nVer = navigator.appVersion;
    var ua = navigator.userAgent;

    // system
    var os = '-';

    var clientStrings = [
        {s:'Windows 10', r:/(Windows 10.0|Windows NT 10.0)/},
        {s:'Windows 8.1', r:/(Windows 8.1|Windows NT 6.3)/},
        {s:'Windows 8', r:/(Windows 8|Windows NT 6.2)/},
        {s:'Windows 7', r:/(Windows 7|Windows NT 6.1)/},
        {s:'Windows Vista', r:/Windows NT 6.0/},
        {s:'Windows Server 2003', r:/Windows NT 5.2/},
        {s:'Windows XP', r:/(Windows NT 5.1|Windows XP)/},
        {s:'Windows 2000', r:/(Windows NT 5.0|Windows 2000)/},
        {s:'Windows ME', r:/(Win 9x 4.90|Windows ME)/},
        {s:'Windows 98', r:/(Windows 98|Win98)/},
        {s:'Windows 95', r:/(Windows 95|Win95|Windows_95)/},
        {s:'Windows NT 4.0', r:/(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
        {s:'Windows CE', r:/Windows CE/},
        {s:'Windows 3.11', r:/Win16/},
        {s:'Android', r:/Android/},
        {s:'Open BSD', r:/OpenBSD/},
        {s:'Sun OS', r:/SunOS/},
        {s:'Linux', r:/(Linux|X11)/},
        {s:'iOS', r:/(iPhone|iPad|iPod)/},
        {s:'Mac OS X', r:/Mac OS X/},
        {s:'Mac OS', r:/(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
        {s:'QNX', r:/QNX/},
        {s:'UNIX', r:/UNIX/},
        {s:'BeOS', r:/BeOS/},
        {s:'OS/2', r:/OS\/2/},
        {s:'Search Bot', r:/(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
    ];
    for (var id in clientStrings) {
        var cs = clientStrings[id];
        if (cs.r.test(ua)) {
            os = cs.s;
            break;
        }
    }

    var osVersion = '-';

    if (/Windows/.test(os)) {
        osVersion = /Windows (.*)/.exec(os)[1];
        os = 'Windows';
    }

    switch (os) {
        case 'Mac OS X':
            osVersion = /Mac OS X (10[\.\_\d]+)/.exec(ua)[1];
            break;

        case 'Android':
            osVersion = /Android ([\.\_\d]+)/.exec(ua)[1];
            break;

        case 'iOS':
            osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
            osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
            break;
    }


    return {
        os: os,
        osVersion: osVersion
    };

})();
phonon.browser = (function () {

    /**
     * Browser detection
     * Source: http://jsfiddle.net/ChristianL/AVyND/
     */

    var ua = navigator.userAgent;
    var browser = navigator.appName;
    var version = '' + parseFloat(navigator.appVersion);
    var majorVersion = parseInt(navigator.appVersion, 10);
    var nameOffset, verOffset, ix;

    // Opera
    if ((verOffset = ua.indexOf('Opera')) != -1) {
        browser = 'Opera';
        version = ua.substring(verOffset + 6);
        if ((verOffset = ua.indexOf('Version')) != -1) {
            version = ua.substring(verOffset + 8);
        }
    }
    // Opera Next
    if ((verOffset = ua.indexOf('OPR')) != -1) {
        browser = 'Opera';
        version = ua.substring(verOffset + 4);
    }
    // MSIE
    else if ((verOffset = ua.indexOf('MSIE')) != -1) {
        browser = 'Microsoft Internet Explorer';
        version = ua.substring(verOffset + 5);
    }
    // Chrome
    else if ((verOffset = ua.indexOf('Chrome')) != -1) {
        browser = 'Chrome';
        version = ua.substring(verOffset + 7);
    }
    // Safari
    else if ((verOffset = ua.indexOf('Safari')) != -1) {
        browser = 'Safari';
        version = ua.substring(verOffset + 7);
        if ((verOffset = ua.indexOf('Version')) != -1) {
            version = ua.substring(verOffset + 8);
        }
    }
    // Firefox
    else if ((verOffset = ua.indexOf('Firefox')) != -1) {
        browser = 'Firefox';
        version = ua.substring(verOffset + 8);
    }
    // MSIE 11+
    else if (ua.indexOf('Trident/') != -1) {
        browser = 'Microsoft Internet Explorer';
        version = ua.substring(ua.indexOf('rv:') + 3);
    }
    // Other browsers
    else if ((nameOffset = ua.lastIndexOf(' ') + 1) < (verOffset = ua.lastIndexOf('/'))) {
        browser = ua.substring(nameOffset, verOffset);
        version = ua.substring(verOffset + 1);
        if (browser.toLowerCase() == browser.toUpperCase()) {
            browser = navigator.appName;
        }
    }
    // trim the version string
    if ((ix = version.indexOf(';')) != -1) version = version.substring(0, ix);
    if ((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix);
    if ((ix = version.indexOf(')')) != -1) version = version.substring(0, ix);

    majorVersion = parseInt('' + version, 10);
    if (isNaN(majorVersion)) {
        version = '' + parseFloat(navigator.appVersion);
        majorVersion = parseInt(navigator.appVersion, 10);
    }

    return {
        name: browser,
        version: version
    };

})();
phonon.ajax = (function () {

	/**
	 * Creates the XMLHttpRequest Object
	 * @param {boolean} useCrossDomain
	 * @return {XMLHttpRequest | Null}
	 * @private
	 */
	var createXhr = function (useCrossDomain) {
		var xhr = null;
		try  {
			xhr = new XMLHttpRequest();
			if ('withCredentials' in xhr && useCrossDomain) {
				xhr.withCredentials = true;
			}
		} catch (e) {
			console.error(e);
		}

		return xhr;
	};

    /**
     * Parses the API response in JSON format
     * @param {String} responseText
     * @return {JSONObject}
     * @private
     */
    var toJSON = function(responseText) {
        var response = null;
        try  {
            response = JSON.parse(responseText);
        } catch (e) {
            response = null;
        }
        return response;
    };

    /**
     * Transforms an object to a string
     * @param {Object} data
     */
    var objToString = function(data) {
		var strData = '';
		var key;

		for(key in data) {
			strData += key + '=' + data[key] + '&';
		}

		var last = strData.lastIndexOf('&');
		if(last !== -1) {
			data = strData.substring(0, last);
		}
		return strData;
    };

    /**
     * Executes an Ajax request
     * @param {Object} opts
     */
	return function(opts) {

		var method = opts.method;
		var url = opts.url;
		var crossDomain = (typeof opts.crossDomain === 'boolean' ? opts.crossDomain : false);
		var contentType = opts.contentType;
		var dataType = opts.dataType;
		var data = opts.data;
		var timeout = opts.timeout;
		var success = opts.success;
		var error = opts.error;
		var headers = opts.headers;

        if(typeof method !== 'string') throw new TypeError('method must be a string');
        if(typeof url !== 'string') throw new TypeError('url must be a string');
        if(typeof data === 'object') data = contentType==="application/json"?JSON.stringify(data):objToString(data);
        if(typeof success !== 'function') throw new TypeError('success must be a function');

        var xhr = createXhr(crossDomain);
        var flagError = 'NO_INTERNET_ACCESS';

        if(xhr) {

            xhr.open(method, url, true);

            if(typeof contentType === 'string') {
            	xhr.setRequestHeader('Content-type', contentType);
            }
            if(dataType === 'xml') {
                if(xhr.overrideMimeType) xhr.overrideMimeType('application/xml; charset=utf-8');
            }

						if(typeof headers === 'object') {
							var key;
							for(key in headers) {
								xhr.setRequestHeader(key, headers[key]);
							}
						}

            xhr.onreadystatechange = function(event) {

                if (xhr.readyState === 4) {

										var res = null;

										if(dataType === 'json') {
											res = toJSON(xhr.responseText);
											if(res === null) {
												flagError = 'JSON_MALFORMED';
											}
										} else if(dataType === 'xml') {
											res = xhr.responseXML;
										} else {
											res = xhr.responseText;
										}

										var status = xhr.status.toString();

										// Success 2xx
                    if (status[0] === '2') {

											success(res, xhr);

                    } else {

                        // error
                        if (typeof error === 'function') {
                            window.setTimeout(function() {
                                error(res, flagError, xhr);
                            }, 1);
                        }
                    }

                    xhr = null;
                }
            };

            if (typeof timeout === 'number') {
                xhr.timeout = timeout;
                xhr.ontimeout = function () {
                    flagError = 'TIMEOUT_EXCEEDED';
                };
            }
            xhr.send(data);

        } else {
            if (typeof error === 'function') {
                flagError = 'XMLHTTPREQUEST_UNAVAILABLE';
                error(flagError);
            }
        }

        return {
        	cancel: function() {
        		flagError = 'REQUEST_CANCELED';
        		if(xhr) xhr.abort();
        	}
        };
	};
})();

phonon.event = (function () {

    /**
     * Events
     * [1] touch enabled boolean
     * [2] start, move, end and tap events
     * [3] transitionEnd and animationEnd polyfill
     */

	// Use available events
	// mousecancel does not exists
    var availableEvents = ['mousedown', 'mousemove', 'mouseup'];

    // Check if touch is enabled
    var hasTouch = false;
    if(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
        hasTouch = true;
		availableEvents = ['touchstart', 'touchmove', 'touchend', 'touchcancel'];
    }

    if (window.navigator.pointerEnabled) {
        availableEvents = ['pointerdown', 'pointermove', 'pointerup', 'pointercancel'];
    } else if (window.navigator.msPointerEnabled) {
        availableEvents = ['MSPointerDown', 'MSPointerMove', 'MSPointerUp', 'MSPointerCancel'];
    }

    var api = {};

    api.hasTouch = hasTouch;

    api.start = availableEvents[0];
    api.move = availableEvents[1];
    api.end = availableEvents[2];
	api.cancel = typeof availableEvents[3] === 'undefined' ? null : availableEvents[3];

    api.tap = 'tap';

    /**
     * Animation/Transition event polyfill
    */
    var el = document.createElement('div');
    var transitions = [
        { name: 'transition', end: 'transitionend' } ,
        { name: 'MozTransition', end: 'transitionend' },
        { name: 'msTransition', end: 'msTransitionEnd' },
        { name: 'WebkitTransition', end: 'webkitTransitionEnd' }
    ];
    var animations = [
        { name: 'animation', end: 'animationend' } ,
        { name: 'MozAnimation', end: 'animationend' },
        { name: 'msAnimation', end: 'msAnimationEnd' },
        { name: 'WebkitAnimation', end: 'webkitAnimationEnd' }
    ];

    var transitionEnd = null;
    var animationEnd = null;

    var i = transitions.length - 1;
    for (i in transitions) {
        if (el.style[transitions[i].name] !== undefined) {
            transitionEnd = transitions[i].end;
            break;
        }
    }

    var j = animations.length - 1;
    for (j in animations) {
        if (el.style[animations[j].name] !== undefined) {
            animationEnd = animations[j].end;
            break;
        }
    }

    // fix bug on Android 4.1
    var osV = phonon.device.osVersion;
    if(osV.length > 2) {
        osV = phonon.device.osVersion.substring(0,3);
    }

    if(phonon.device.os.toLowerCase() === 'android' && osV === '4.1') {
        transitionEnd = 'webkitTransitionEnd';
        animationEnd = 'webkitAnimationEnd';
    }

    api.transitionEnd = transitionEnd;
    api.animationEnd = animationEnd;

    var tapEls = [];

    var TapElement = (function () {

        function TapElement(el, callback) {
            this.el = el;
            this.callback = callback;
            this.moved = false;
            this.startX = 0;
            this.startY = 0;

            this.el.addEventListener(api.start, this, false);
        }

        TapElement.prototype.start = function(e) {

            this.el.addEventListener(api.move, this, false);
            this.el.addEventListener(api.end, this, false);

            this.moved = false;

            this.startX = e.clientX || e.touches[0].clientX;
            this.startY = e.clientY || e.touches[0].clientY;
        };

        TapElement.prototype.move = function(e) {

			var moveX = e.clientX || e.touches[0].clientX;
            var moveY = e.clientY || e.touches[0].clientY;

            //if finger moves more than 10px flag to cancel
            if (Math.abs(moveX - this.startX) > 10 || Math.abs(moveY - this.startY) > 10) {
                this.moved = true;
            }
        };

        TapElement.prototype.end = function(e) {

			this.el.removeEventListener(api.move, this, false);
            this.el.removeEventListener(api.end, this, false);

			if (api.cancel !== null) this.el.removeEventListener(api.cancel, this, false);

            if (!this.moved) {
                this.callback(e);
            }
        };

        TapElement.prototype.cancel = function() {
            this.moved = false;
            this.startX = 0;
            this.startY = 0;
        };

        TapElement.prototype.off = function() {
            this.el.removeEventListener(api.start, this, false);
            this.el.removeEventListener(api.move, this, false);
            this.el.removeEventListener(api.end, this, false);
			if(api.cancel !== null) this.el.removeEventListener(api.cancel, this, false);
        };

        TapElement.prototype.handleEvent = function(e) {
            switch (e.type) {
                case api.start: this.start(e); break;
                case api.move: this.move(e); break;
                case api.end: this.end(e); break;
                case api.cancel: this.cancel(e); break; // api.cancel can be null
            }
        };

        return TapElement;
    })();

    phonon.on = function(el, eventName, callback, useCapture) {

        if(eventName === api.tap) {
            var tap = new TapElement(el, callback);
            tapEls.push(tap);
            return;
        }

        if(el.addEventListener) {
            el.addEventListener(eventName, callback, useCapture);
        } else if(el.attachEvent) {
            el.attachEvent('on' + eventName, callback, useCapture);
        }
    };

    window.on = document.on = HTMLElement.prototype.on = function(type, listener, useCapture) {
        phonon.on(this, type, listener, useCapture);
    };

    phonon.off = function(el, eventName, callback, useCapture) {

        if(eventName === api.tap) {

            for (var i = tapEls.length - 1; i >= 0; i--) {
                if(tapEls[i].el === el) {
                    tapEls[i].off();
                    tapEls.splice(i, 1);
                    break;
                }
            }
            return;
        }

        if(el.removeEventListener) {
            el.removeEventListener(eventName, callback, useCapture);
        } else if(el.attachEvent) {
            el.detachEvent('on' + eventName, callback, useCapture);
        }
    };

    window.off = document.off = HTMLElement.prototype.off = function(type, listener, useCapture) {
        phonon.off(this, type, listener, useCapture);
    };

    return api;

})();

phonon.tagManager = (function () {

	if(typeof riot === 'undefined') {
		return;
	}

	var tags = [];

	var addTag = function(tag, name) {
	    tag[0].tagName = name;
	    tags.push(tag[0]);
	};

	var getAll = function() {
		return tags;
	};

	var trigger = function(pageName, eventName, eventParams) {

		var arr = [];
		var i = tags.length - 1;

		for (; i >= 0; i--) {
			if(tags[i].tagName === pageName) {
				arr.push(eventName);
				var conc = arr.concat(eventParams);
				tags[i].trigger.apply(this, conc);
				break;
			}
		}
	};

	return {
		addTag: addTag,
		getAll: getAll,
		trigger: trigger
	};

})();
	// init
	phonon.options = function(options) {

		var useI18n = false;
		if(typeof options.i18n === 'object' && options.i18n !== null) {
			phonon.i18n(options.i18n);
			useI18n = true;
		}

		options.navigator.useI18n = useI18n;
		phonon.navigator(options.navigator);
	};

	/**
	 * Shortcuts for dialog
	 */
	phonon.alert = function(text, title, cancelable, textOk) {
		return phonon.dialog().alert(text, title, cancelable, textOk);
	};

	phonon.confirm = function(text, title, cancelable, textOk, textCancel) {
		return phonon.dialog().confirm(text, title, cancelable, textOk, textCancel);
	};

	phonon.prompt = function(text, title, cancelable, textOk, textCancel) {
		return phonon.dialog().prompt(text, title, cancelable, textOk, textCancel);
	};

	phonon.indicator = function(title, cancelable) {
		return phonon.dialog().indicator(title, cancelable);
	};

	/**
	* Changes the language and updates tags
	* @param {String} locale
	*/
	phonon.updateLocale = function(locale) {

		var riotEnabled = (typeof riot !== 'undefined' ? true : false);

		phonon.i18n().setPreference(locale).getAll(function(json) {

			if(riotEnabled) {

				var virtualDom = phonon.tagManager.getAll();
				var i = virtualDom.length - 1;
				for (; i >= 0; i--) {
					virtualDom[i].i18n = json;
				}

				// Global update
				riot.update();

			} else {
				phonon.i18n().bind();
			}
		});
	};

	
	window.phonon = phonon

	if(typeof exports === 'object') {
		module.exports = phonon;
	} else if(typeof define === 'function' && define.amd) {
		define(function() { return window.phonon = phonon });
	}


}(typeof window !== 'undefined' ? window : this));
/* ========================================================================
 * Phonon: i18n.js v0.2.1
 * http://phonon.quarkdev.com
 * ========================================================================
 * Licensed under MIT (http://phonon.quarkdev.com)
 * ======================================================================== */

;(function (window, document) {

    var jsonCache = null;

    var opts = {
        localeFallback: null,
        localePreferred: window.navigator.userLanguage || window.navigator.language,
        directory: './',
        initCalled: false
    };

    /**
     * Checks if the given argument is a DOM element
     * @param {DOMObject} o the argument to test
     * @return true if the object is a DOM element, false otherwise
     * @private
     */
    var isElement = function (o) {
        return (typeof Node === 'object' ? o instanceof Node : o && typeof o === 'object' && typeof o.nodeType === 'number' && typeof o.nodeName === 'string');
    };

    /**
     * Binds some text to the given DOM element
     * @param {DOMObject} el
     * @param {String} text
     * @private
     */
    var setText = function (el, text) {
        if(!('textContent' in el)) {
            el.innerText = text;
        } else {
            el.textContent = text;
        }
    };

    /**
     * Binds the value to the given DOM element
     * @param {DOMObject} el
     * @param {String} text
     * @private
     */
    var setValue = function (el, text) {
        el.value = text;
    };

    /**
     * Binds the placeholder to the given DOM element
     * @param {DOMObject} el
     * @param {String} text
     * @private
     */
    var setPlaceholder = function (el, text) {
        el.setAttribute('placeholder', text);
    };

    /**
     * Reads data-i18n attributes and set JSON values 
     * @param {Array} elements
     * @param {JSON} json
     * @private
     */
    var computeNodes = function (elements, json) {

        var i = elements.length - 1;

        for (; i >= 0; i--) {
            var el = elements[i];
            var data = el.getAttribute('data-i18n').trim();
            var r = /(?:\s|^)(\w+):\s*(.*?)(?=\s+\w+:|$)/g, m;

            while (m = r.exec(data)) {
                var key = m[1].trim();
                var value = m[2].trim().replace(',', '');
                if (json[value] !== undefined) {
                    if (key === 'text') {
                        setText(el, json[value]);
                    } else if (key === 'value') {
                        setValue(el, json[value]);
                    } else if (key === 'placeholder') {
                        setPlaceholder(el, json[value]);
                    } else {
                        throw new Error('The property: ' + key + ' is unknown');
                    }
                } else {
                    console.error('The value: ' + value + ' does not exist in the JSON file');
                }
            }
        }
    };


    /**
     * Public API
     */

    var api = {};

    /**
     * @param {Object} options
     * @public
     */
    function init(options) {
        if (opts.initCalled) {
            throw new Error('The i18n module has already been instantiated');
        }

        if(typeof options.directory === 'string') {
            options.directory = ( (options.directory.indexOf('/', options.directory.length - '/'.length) !== -1) ? options.directory : options.directory + '/');
        }

        var prop;
        for (prop in options) {
            opts[prop] = options[prop];
        }

        opts.initCalled = true;
    }
    api.init = init;

    /**
     * Reads JSON data
     * @param {Function} callback
     */
    function getAll(callback) {
        if (!opts.initCalled) {
            throw new Error('Please, initialize The i18n module using the init method');
        }
        if (typeof callback !== 'function') {
            throw new Error('callback must be a function');
        }

        if(jsonCache !== null) {
            callback(jsonCache);
            return;
        }

        var xhr = new XMLHttpRequest();

        var locale = opts.localePreferred ? opts.localePreferred : opts.localeFallback;

        xhr.open('GET', opts.directory + locale + '.json', true);
        if(xhr.overrideMimeType) xhr.overrideMimeType('application/json; charset=utf-8');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {

                    jsonCache = JSON.parse(xhr.responseText);
                    callback(JSON.parse(xhr.responseText));

                } else {

                    if(opts.localePreferred) {

                        // The preferred locale is not available
                        opts.localePreferred = null;

                        console.log('The language [' + locale + '] is not available, loading ' + opts.localeFallback);

                        getAll(function (json) {
                            jsonCache = json;
                            callback(json);
                        });
                    } else {
                        throw new Error('The default locale ['+opts.directory+opts.localeFallback+'.json] file is not found');
                    }
                }
            }
        };
        xhr.send('');
    }
    api.getAll = getAll;

    /**
     * Gets a value in the JSON file with a key or many keys (array)
     * @param {String | Array} key
     * @param {Function} callback
     */
    function get(key, callback) {
        if (typeof key !== 'string' && !(key instanceof Array)) {
            throw new Error('key must be a string or an array');
        }

        var isArray = (key instanceof Array ? true : false);

        if(jsonCache !== null) {
            if(!isArray) {
                callback(jsonCache[key]);
            } else {

                var l = key.length, i = l - 1, obj = {};

                for (; i >= 0; i--) {
                    obj[key[i]] = jsonCache[key[i]];
                }
                callback(obj);
            }
            return;
        }

        getAll(function(json) {
            if(!isArray) {
                callback(json[key]);
            } else {

                var l = key.length, i = l - 1, obj = {};

                for (; i >= 0; i--) {
                    obj[key[i]] = json[key[i]];
                }
                callback(obj);
            }
        });
    }
    api.get = get;

    /**
     * Binds the HTML Object with JSON data
     * @param {DOMObject} el (optional) if el is not set, the document will be binded
     * @param {Function} callback (optional)
     */
    function bind(el, callback) {
        var element = el || document;
        var callbackFunction = callback;

        if (arguments.length === 1) {
            if (typeof el === 'function') {
                element = document;
                callbackFunction = el;
            }
        }

        if (!isElement(element)) {
            throw new TypeError('Not valid element object ' + element);
        }

        var elements = element.querySelectorAll('[data-i18n]');

        if(jsonCache === null) {

            getAll(function (json) {

                computeNodes(elements, json);
                if (typeof callbackFunction === 'function') callbackFunction();
            });
        } else {
            computeNodes(elements, jsonCache);
            if (typeof callbackFunction === 'function') callbackFunction();
        }
    }
    api.bind = bind;

    /**
     * Sets the preferred language
     * @param {String} l the new language
     */
    function setPreference(preference) {
        if (typeof preference !== 'string') {
            throw new Error('The language must be a string');
        }
        opts.localePreferred = preference;
        // reset the cache
        jsonCache = null;

        return api;
    }
    api.setPreference = setPreference;

    /**
     * Returns the preferred language
     * @return {String}
     */
    function getPreference() {
        return opts.localePreferred;
    }
    api.getPreference = getPreference;

    /**
     * Returns the browser language
     * @return {String}
     */
    function getLocale() {
        return window.navigator.userLanguage || window.navigator.language;
    }
    api.getLocale = getLocale;


    phonon.i18n = function (opts) {

        if(typeof opts === 'object') {
            init(opts);
        }

        return {
            getAll: function (callback) {
                getAll(callback);
                return this;
            },
            get: function (key, callback) {
                get(key, callback);
                return this;
            },
            bind: function (el, callback) {
                bind(el, callback);
                return this;
            },
            setPreference: function (preference) {
                setPreference(preference);
                return this;
            },
            getPreference: function () {
                return getPreference();
            },
            getLocale: function () {
                return getLocale();
            }
        };
    };

}(window, document));
/* ========================================================================
 * Phonon: navigator.js v1.2
 * http://phonon.quarkdev.com
 * ========================================================================
 * Licensed under MIT (http://phonon.quarkdev.com)
 * ======================================================================== */
;(function (window, riot, phonon) {

  'use strict';

  var pages = [];
  var pageHistory = [];
  var started = false;
  var onActiveTransition = false;

  var currentPage = null;
  var previousPage = null;

  var forward = true;
  var safeLink = false;

  var riotEnabled = (riot === undefined ? false : true);

  var opts = {
    defaultPage: null,
    hashPrefix: '!',
    animatePages: true,
    templateRootDirectory: '',
    useI18n: true,
    enableBrowserBackButton: false,
    useHash: true
  };

  /**
   * "Encapsulated" class
   * The activity takes care of creating a window for you in which you can place your UI with.
   * An activity is based on several window states that we call the activitiy life cycle.
   */
  var Activity = (function () {

    /**
     * @constructor
	 * @param {Object} scope
     */
    function Activity(scope) {
		if(typeof scope === 'object') {
			var handler;
			for(handler in scope) {
				if(this[handler] !== undefined && this[handler] !== 'constructor') {
					this[handler + 'Callback'] = scope[handler];
				}
			}
		}
	}

    /**
     *
     * @param {Function} callback
     */
    Activity.prototype.onCreate = function (callback) {
      this.onCreateCallback = callback;
    };

    /**
     * onReady is called after onCreate and for each page refresh (optional)
     * @param {Function} callback
     */
    Activity.prototype.onReady = function (callback) {
      this.onReadyCallback = callback;
    };

    /**
     * Called when the user leaves the page
     * @param {Function} callback
     */
    Activity.prototype.onClose = function (callback) {
      this.onCloseCallback = function (self) {
        callback(self);
      };
    };

    /**
     * Called when the page is completely hidden
     * @param {Function} callback
     */
    Activity.prototype.onHidden = function (callback) {
      this.onHiddenCallback = callback;
    };

    /**
     * Called when the page transition is finished
     * @param {Function} callback
     */
    Activity.prototype.onTransitionEnd = function (callback) {
      this.onTransitionEndCallback = callback;
    };

    /**
     * Called when the page hash changes
     * @param {Function} callback
     */
    Activity.prototype.onHashChanged = function (callback) {
      this.onHashChangedCallback = function (req) {
        callback.apply(this, req);
      };
    };

    Activity.prototype.onTabChanged = function (callback) {
      this.onTabChangedCallback = function (tabNumber) {
        callback(tabNumber);
      };
    };

    return Activity;
  })();

  /**
   * Retrieves the page object
   * @param {String} pageName
   */
  var getPageObject = function(pageName) {

    var i = pages.length - 1;

    for (; i >= 0; i--) {
      if(pages[i].name === pageName) {
        return pages[i];
      }
    }
    return null;
  };

  function DOMEval(code) {

	  var script = document.createElement('script');

	  script.text = code;
	  document.head.appendChild( script ).parentNode.removeChild( script );
  }

  /**
   * Retrives the DOM element for a given page
   * @param {String} pageName
   */
  var getPageEl = function(pageName) {

    var pages = document.querySelectorAll('[data-page]');
    var i = pages.length - 1;
    var elPage = null;

    for (; i >= 0; i--) {
      if(pages[i].tagName.toLowerCase() === pageName) {
        elPage = pages[i];
        break;
      }
    }
    return elPage;
  };

  function forwardAnimation() {

    if(opts.animatePages) {
      var previousPageEl = this;

      previousPageEl.classList.remove('page-sliding');
      previousPageEl.classList.remove('left');
      previousPageEl.off(phonon.event.animationEnd, forwardAnimation, false);

      previousPageEl.classList.remove('app-active');
    }
    callTransitionEnd(currentPage);
    callHiddenCallback(previousPage);

    onActiveTransition = false;
  }

  function previousAnimation() {

    if(opts.animatePages) {
      var previousPageEl = this;

      previousPageEl.classList.remove('page-sliding');
      previousPageEl.classList.remove('right');
      previousPageEl.off(phonon.event.animationEnd, previousAnimation, false);

      previousPageEl.classList.remove('app-active');
    }

    callTransitionEnd(currentPage);
    callHiddenCallback(previousPage);

    onActiveTransition = false;
  }

  function dispatchEvent(eventName, pageName, parameters) {

	  var eventInitDict = {
          detail: { page: pageName },
          bubbles: true,
          cancelable: true
      };

	  if(typeof parameters !== 'undefined') {
		  eventInitDict.detail.req = parameters
	  }

	  var event = new window.CustomEvent(eventName, eventInitDict);

	  document.dispatchEvent(event);
  }

  function callCreate(pageName) {

    if(riotEnabled) {
      // Call the "create" event in VM
      phonon.tagManager.trigger(pageName, 'create');
    }

    /*
     * dispatch the event before calling the activity's callback
     * so that UI components are ready to use
     * issue #52 is related to this
    */
	dispatchEvent('pagecreated', pageName)

	var page = getPageObject(pageName);

    // Call the onCreate callback
    if(page.activity instanceof Activity && typeof page.activity.onCreateCallback === 'function') {
      page.activity.onCreateCallback();
    }

  }

  function callReady(pageName) {

	var page = getPageObject(pageName);

    window.setTimeout(function() {

      if(riotEnabled) {
        // Call the "ready" event in VM
        phonon.tagManager.trigger(pageName, 'ready');
      }

      // Dispatch the global event pageopened
	  dispatchEvent('pageopened', pageName)

      // Call the onReady callback
      if(page.activity instanceof Activity && typeof page.activity.onReadyCallback === 'function') {
        page.activity.onReadyCallback();
      }

    }, page.readyDelay);
  }

  function callTransitionEnd(pageName) {
    if(riotEnabled) {
      phonon.tagManager.trigger(pageName, 'transitionend');
    }

	dispatchEvent('pagetransitionend', pageName)

    var page = getPageObject(pageName);

    // Call the onTransitionEnd callback
    if(page.activity instanceof Activity && typeof page.activity.onTransitionEndCallback === 'function') {
      page.activity.onTransitionEndCallback();
    }
  }

  function callHiddenCallback(pageName) {

    if(riotEnabled) {
      phonon.tagManager.trigger(pageName, 'hidden');
    }

	dispatchEvent('pagehidden', pageName)

    var page = getPageObject(pageName);

    // Call the onHidden callback
    if(page.activity instanceof Activity && typeof page.activity.onHiddenCallback === 'function') {
      page.activity.onHiddenCallback();
    }
  }

  function callTabChanged(pageName, tabNumber) {

    if(riotEnabled) {
      phonon.tagManager.trigger(pageName, 'tabchanged', tabNumber);
    }

	dispatchEvent('pagetabchanged', pageName)

    var page = getPageObject(pageName);

    // Call the onTabChanged callback
    if(page.activity instanceof Activity && typeof page.activity.onTabChangedCallback === 'function') {
      page.activity.onTabChangedCallback(tabNumber);
    }
  }

  function callClose(pageName, nextPageName, hash) {

    function close() {

	  dispatchEvent('pageclosed', pageName)

      var currentHash = window.location.hash.split('#')[1];

      if(currentHash === hash || !opts.useHash) {
        onRoute(hash);
      } else {
        window.location.hash = hash;
      }
    }

    // cancel the page transition
    if(isComponentVisible()) return;

    var page = getPageObject(pageName);

    // close the page directly
    if(!page.async) {
      close(true);
      return;
    }

    var api = {close: close};

    if(riotEnabled) {
      phonon.tagManager.trigger(pageName, 'close', api);
    }

    // Call the onclose callback
    if(page.activity instanceof Activity && typeof page.activity.onCloseCallback === 'function') {
      page.activity.onCloseCallback(api);
    } else {
      if(!riotEnabled) {
        throw new Error('The page ' + page.name + ' prevents close, but its callback (onClose) is undefined');
      }
    }
  }

  function callHash(pageName, params) {

    if(typeof params === 'undefined') return;

    if(riotEnabled) {
      phonon.tagManager.trigger(pageName, 'hashchanged', params);
    }

	dispatchEvent('pagehash', pageName, params)

    var page = getPageObject(pageName);

    // Call the onHashChanged callback
    if(page.activity instanceof Activity && typeof page.activity.onHashChangedCallback === 'function') {
      page.activity.onHashChangedCallback(params);
    }
  }

  function callCallback(callbackName, options) {
    if(callbackName === 'tabchanged') {
      callTabChanged(options.page, options.tabNumber);
    }
  }

  function mount(pageName, fn) {

    if(riotEnabled) {

      riot.compile(function() {

        if(opts.useI18n) {
          phonon.i18n().getAll(function(json) {
            phonon.tagManager.addTag(riot.mount(pageName, {i18n: json}), pageName);
            fn();
          });
        } else {
          phonon.tagManager.addTag(riot.mount(pageName, {i18n: null}), pageName);
          fn();
        }
      });
    }

    if(!riotEnabled) {

      var page = getPageObject(pageName);

      if(page.content !== null) {

        loadContent(page.content, function(template) {

          var elPage = getPageEl(pageName);

          var virtualDiv = document.createElement('div');
          virtualDiv.innerHTML = template;

          var virtualElPage = virtualDiv.querySelector(pageName);

          if(virtualElPage === null) {
            throw new Error('Error with ' + page.content + ' : the template for ' + pageName + ' must start with the parent node <' + pageName + ' class="app-page">');
          }
          var attrs = virtualElPage.attributes;

          var i = attrs.length - 1;

          for (; i >= 0; i--) {
            var attr = attrs.item(i);
            if(attr.nodeName !== 'class' && attr.nodeValue !== 'app-page') elPage.setAttribute(attr.nodeName, attr.nodeValue);
          }


		  var evalJs = function(element) {
			  var s = element.getElementsByTagName('script');
			  for(var i=0; i < s.length; i++) {
				  DOMEval(s[i].innerHTML);
			  }
		  };

          if(opts.useI18n) {
            phonon.i18n().bind(virtualElPage, function() {
              elPage.innerHTML = virtualElPage.innerHTML;
			  evalJs(virtualDiv);

              fn();
            });
          } else {
            elPage.innerHTML = virtualElPage.innerHTML;
			evalJs(virtualDiv);
            fn();
          }

        });
      } else {
        fn();
      }
    }
  }

  function loadContent(url, fn) {
    var req = new XMLHttpRequest();
    if(req.overrideMimeType) req.overrideMimeType('text/html; charset=utf-8');
    req.onreadystatechange = function() {
      if(req.readyState === 4 && (req.status === 200 || !req.status && req.responseText.length)) {
        fn(req.responseText, opts, url);
      }
    };
    req.open('GET', opts.templateRootDirectory + url, true);
    req.send('');
  }

  function createPage(pageName, properties) {
	properties = typeof properties === 'object' ? properties : {};

	var newPage = {
		name: pageName,
		mounted: false,
		async: false,
		activity: null,
		content: null,
		readyDelay: 1
	};

	var prop;
	for(prop in properties) {
		newPage[prop] = properties[prop];
	}

	return newPage;
  }

  function createOrUpdatePage(pageName, properties) {
	  properties = typeof properties === 'object' ? properties : {};

	  var page = getPageObject(pageName);
	  if(page === null) {
		  return pages.push(createPage(pageName, properties));
	  }

	  var prop;
	  for(prop in properties) {
		  page[prop] = properties[prop];
	  }

	  return true;
  }

  /**
   * Checks if a "front" UI component is active
   * Returns true if an UI component is active, false otherwise
   * @return {Boolean}
   */
  function isComponentVisible() {

    // close active dialogs, popovers, panels and side-panels
    if(typeof phonon.dialog !== 'undefined' && phonon.dialog().closeActive()) return true;
    if(typeof phonon.popover !== 'undefined' && phonon.popover().closeActive()) return true;
    if(typeof phonon.panel !== 'undefined' && phonon.panel().closeActive()) return true;
    if(typeof phonon.sidePanel !== 'undefined' && phonon.sidePanel().closeActive()) return true;

    return false;
  }

  function getLastPage() {
    var page = {page: opts.defaultPage, params: ''};
    if(pageHistory.length > 0) {

      var inddex = -1;
      var i = pageHistory.length - 1;

      for (; i >= 0; i--) {
        if(pageHistory[i].page === currentPage) {
          inddex = i - 1;
          break;
        }
      }

      if(inddex > -1) {
        page = pageHistory[inddex];
        pageHistory.slice(inddex, 1);
      }
    }
    return page;
  }

  function navigationListener(evt) {

    /*
     * user interactions are safed (with or without data-navigation | href)
     * the goal is to prevent the backward button if enableBrowserBackButton = false
     */
    safeLink = true;

    var target = evt.target;
    var nav = null;
    var validHref = false;
    var params = '';

    for (; target && target !== document; target = target.parentNode) {
      var dataNav = target.getAttribute('data-navigation');
      if(typeof target.href !== 'undefined' && target.href.indexOf('#!') !== -1) {
        validHref = true;
        break;
      }
      if(dataNav) {
        nav = dataNav;
        break;
      }
    }

    if(validHref && opts.useHash) {

      // onRoute will be called
      return;
    }

    if(nav === null && !validHref) {
      return;
    }

    var page = opts.defaultPage;

    if(nav !== null) {
      if(nav === '$previous-page') {
        var pObj = getLastPage();
        page = pObj.page;
        params = pObj.params;
      } else {
        page = nav;
      }

    } else {

      // regex
      var match = target.href.match('/#' + opts.hashPrefix + '([A-Za-z0-9\-\.]+)?(.*)/');
      if(match) {
        page = match[1];
        params = match[2];
      }
    }

    var hash = opts.hashPrefix + page;

    if(params !== '') {
      hash = hash + '/' + params;
      hash = hash.replace('//', '/');
    }

    callClose(currentPage, page, hash);
  }

  function startTransition(previousPage, pageName) {

    var previousPageEl = getPageEl(previousPage);
    var elCurrentPage = getPageEl(pageName);

    elCurrentPage.classList.add('app-active');

    if(opts.animatePages) {
      previousPageEl.classList.add('page-sliding');

      if(forward) {
        previousPageEl.classList.add( 'left' );
        previousPageEl.on(phonon.event.animationEnd, forwardAnimation, false);
      } else {
        previousPageEl.classList.add( 'right' );
        previousPageEl.on(phonon.event.animationEnd, previousAnimation, false);
      }
    } else {

      previousPageEl.classList.remove('app-active');

      if(forward) {
        forwardAnimation();
      } else {
        previousAnimation();
      }
    }

    // Scroll to top
    var contents = elCurrentPage.querySelectorAll('.content');
    var i = contents.length - 1;
    for (; i >= 0; i--) {
      var content = contents[i];
      if(content !== null && content.scrollTop !== 0) {
          content.scrollTop = 0;
      }
    }

    // delete history if the current page is the default page
    if(pageName === opts.defaultPage) {
      pageHistory = [];
    }
  }

  /**
   * Calls page events (onCreate, onReady) after
   * the page is actually ready (set its template)
   * @param {String} pageName
   * @param {Function} callback
   */
  function onBeforeTransition(pageName, callback) {

    if(onActiveTransition) {
      if(typeof callback === 'function') {
        return callback();
      }
    }

    var page = getPageObject(pageName);

    if(started) {

      onActiveTransition = true;

      previousPage = currentPage;
      currentPage = pageName;
    }

    if(!page.mounted) {

      mount(page.name, function() {

        page.mounted = true;

        callCreate(pageName);
        callReady(pageName);

        // Call global-ready callbacks once
        if(!started) phonon.dispatchGlobalReady();

        if(started) startTransition(previousPage, pageName);

        if(!started) {

          started = true;

          var el = getPageEl(pageName);
          if(!el.classList.contains('app-active')) {
            el.classList.add('app-active');
          }
        }

        // call the callback after the mount
        if(typeof callback === 'function') {
          callback();
        }
      });
    } else {

      callReady(pageName);
      startTransition(previousPage, pageName);

      // call the callback directly
      if(typeof callback === 'function') {
        callback();
      }
    }
  }

  function init(options) {
    if(typeof options.templateRootDirectory === 'string' && options.templateRootDirectory !== '') {
      options.templateRootDirectory = ( (options.templateRootDirectory.indexOf('/', options.templateRootDirectory.length - '/'.length) !== -1) ? options.templateRootDirectory : options.templateRootDirectory + '/');
    }
    if(typeof options.hashPrefix === 'object') options.hashPrefix = '';

    var prop;
    for(prop in options) {
      opts[prop] = options[prop];
    }

    // navigation listeners are accepted (safe)
    if(opts.enableBrowserBackButton) safeLink = true;

    // Add page nodes
    var pages = document.querySelectorAll('[data-page]');
    var i = pages.length - 1;
    for (; i >= 0; i--) {

      var page = pages[i];

      // add the page class
      if(!page.classList.contains('app-page')) {
        page.classList.add('app-page');
      }

      createOrUpdatePage( page.tagName.toLowerCase() );
    }
  }

  function start() {
    if(started) {
      throw new Error('The app has been already started');
    }

    // android, ios or browser
    var osName = phonon.device.os.toLowerCase();
    var osClass = 'web';

    if(osName === 'android') {
      osClass = 'android';
    } else if(osName === 'ios') {
      osClass = 'ios';
    }

    if(!document.body.classList.contains(osClass)) {
      document.body.classList.add(osClass);
    }

    onRoute();
  }

  function changePage(pageName, pageParams) {

    var currentPageObject = getPageObject(currentPage);
    var pageObject = getPageObject(pageName);

    if(pageObject) {

      var hash = (typeof pageParams === 'string' ? opts.hashPrefix + pageObject.name + '/' + pageParams : opts.hashPrefix + pageObject.name);

      if(currentPageObject.async) {
        callClose(currentPage, pageObject.name, hash);
      } else {
        var parsed = window.location.hash.split('/');
        if(parsed[0].indexOf(pageObject.name) === -1 && opts.useHash) {
          window.location.hash = hash;
        }
      }
    } else {
      throw new Error('The following page: ' + pageName + ' does not exists');
    }
  }

  /**
   * @param {String | HashEvent} virtualHash
   */
  function onRoute(virtualHash) {

    var hash = (typeof virtualHash === 'string' ? virtualHash : window.location.href.split('#')[1] || '');

    var pageName;

    var parsed = hash.split('/');
    var params = parsed.slice(1, parsed.length);
    var page = parsed[0];

    // angular hash system
    var withSlash = opts.hashPrefix.indexOf('/');
    if(withSlash !== -1) {
      page = (typeof parsed[1] === 'undefined' ? '' : parsed[1]);
      params = parsed.slice(2, parsed.length);
      pageName = page.substring(withSlash+1, page.length);
    } else {
      // default hash system
      pageName = page.substring(opts.hashPrefix.length, page.length);
    }


    var pageObject = getPageObject(pageName);

    /*
     * if we get an invalid URL,
     * then we start the default page
     */
    if(!started && !pageObject) {

      // fallback default page
      currentPage = opts.defaultPage;

      pageObject = getPageObject(opts.defaultPage);

      /*
       * updates the URL if necessary
       */
      if(opts.useHash) {

        // the onRoute will be called again
        window.location.hash = opts.hashPrefix + opts.defaultPage;
        return;
      }
    } else if(!started && pageObject) {
      // update default value
      currentPage = pageObject.name;
    }

    if(pageObject) {

      /*
       * [1] change page only if changePage() is called programatically
       * [2] back button: if UI components are visible like dialogs, cancel the page transition
       * [3] the back button can be the physical button on Android or the browser's back button
       */

      isComponentVisible();

      if(pageObject.name === currentPage && started) {
        callHash(pageObject.name, params);
        return;
      }

      if(started && !safeLink) {
        return;
      }

      var inArray = false;
      var i = pageHistory.length - 1;

      for (; i >= 0; i--) {
        if(pageHistory[i].page === pageObject.name) {
          inArray = true;
          break;
        }
      }

      if(pageHistory.length > 0) {
        if(pageObject.name === opts.defaultPage) {
          forward = false;
        }
      } else {
        forward = true;
      }

      if(pageHistory.length > 1 && pageHistory[pageHistory.length - 2].page === pageObject.name) {
        forward = false;
      }

      if(!inArray) {
        var strParams = params.join('/');
        pageHistory.push( {page: pageObject.name, params: strParams} );
      }

      /*
       * Page Scope is called once before calling callbacks
       * since v1.0.8, we call the page scope here when the page is not yet mounted
       * because before this version, the onCreate callback was called before the onHash callback
       * since v1.0.2 the order has changed => the onHash callback is called before page callbacks (onCreate, etc.)
       * see issues: #16, #31 and #38
       */
      if(typeof pageObject.callback === 'function' && !pageObject.mounted) {
        pageObject.callback(pageObject.activity);
      }

      if(!pageObject.mounted) {

        onBeforeTransition(pageObject.name, function() {
          callHash(pageObject.name, params);
        });

      } else {

        onBeforeTransition(pageObject.name);
        callHash(pageObject.name, params);
      }

      if(!opts.enableBrowserBackButton) safeLink = false;
    }
  }

  /**
   * One listener to navigate through the app pages
   */
  document.on('tap', navigationListener);

  /*
   * we do not call onRoute() directly because it is used in callClose
   * in order to prevent the back button on navigator:
   * the hash changes, but it is refused by this module (not trusted behavior)
   * so we need to call this function with a "virtual hash" as argument
   */
  if(opts.useHash) window.on('hashchange', onRoute);

  document.on('backbutton', function() {
    var last = getLastPage();
    callClose(currentPage, last.page, opts.hashPrefix + last.page + '/' + last.params);
  });


  phonon.navigator = function(options) {

    if(typeof options === 'object') {
      init(options);
    }

    return {
      currentPage: currentPage,
      previousPage: previousPage,
      start: start,
      changePage: function(pageName, pageParams) {
        safeLink = true;

        /*
         * wait the end of front components animations like dialogs, panels, etc before changing the page
         * [1] avoid several animations at the same time
         * [2] it is more logical to see them disappearing before the page changes
         */

        var wait = (isComponentVisible() ? 400 : 1);

        window.setTimeout(function() {
          changePage(pageName, pageParams);
        }, wait);
      },
      on: function(options, callback) {
        if(typeof options.page !== 'string') {
          throw new Error('Page name must be a string');
        }
        if(typeof options.preventClose !== 'undefined' && typeof options.preventClose !== 'boolean') {
          throw new Error('preventClose option must be a boolean');
        }
        if(typeof options.readyDelay !== 'undefined' && typeof options.readyDelay !== 'number') {
          throw new Error('readyDelay option must be a number');
        }

		// vuejs, riotjs support
        var page = getPageObject(options.page);
		var exists = page === null ? false : true;
		if(!exists) {
          page = createPage(options.page);
		}

		if(typeof callback === 'function' || typeof callback === 'object') {
		  page.activity = new Activity(callback);
	  	} else {
		  page.activity = null;
	  	}

		page.callback = callback;
		page.async = (typeof options.preventClose === 'boolean' ? options.preventClose : false);
		page.content = (typeof options.content === 'string' ? options.content : null);
		page.readyDelay = (typeof options.readyDelay === 'number' ? options.readyDelay : 1);

		createOrUpdatePage(options.page.toLowerCase(), page);
	  },
      callCallback: callCallback
    };
  };

})(typeof window !== 'undefined' ? window : this, typeof riot !== 'undefined' ? riot : undefined, phonon);
