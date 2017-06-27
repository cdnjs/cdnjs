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

            this.startX = (e.touches ? e.touches[0].clientX : e.clientX);
            this.startY = (e.touches ? e.touches[0].clientY : e.clientY);
        };

        TapElement.prototype.move = function(e) {

			var moveX = (e.touches ? e.touches[0].clientX : e.clientX);
            var moveY = (e.touches ? e.touches[0].clientY : e.clientY);

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

/* ========================================================================
* Phonon: accordion.js v0.0.1
* http://phonon.quarkdev.com
* ========================================================================
* Licensed under MIT (http://phonon.quarkdev.com)
* ======================================================================== */
;(function (window) {

	'use strict';

	/**
	 * Show the accordion content
	 * @param {DOMNode} defaultTarget
	 * @param {DOMNode} accordionContent
	 */
	function show(defaultTarget, accordionContent) {

		var height = accordionContent.offsetHeight;
		accordionContent.style.maxHeight = '0px';

		window.setTimeout(function() {

			var onShow = function() {

				accordionContent.off(phonon.event.transitionEnd, onShow);

				var icon = defaultTarget.parentNode.querySelector('.icon-expand-more');

				if(icon) {
					icon.classList.remove('icon-expand-more');
					icon.classList.add('icon-expand-less');
				}

			};

			accordionContent.on(phonon.event.transitionEnd, onShow);

			accordionContent.style.maxHeight = height + 'px';
			accordionContent.classList.add('accordion-active');

		}, 100);
	}

	/**
	 * Hide the accordion content
	 * @param {DOMNode} defaultTarget
	 * @param {DOMNode} accordionContent
	 */
		function hide(defaultTarget, accordionContent) {

		var onHide = function() {

			accordionContent.classList.remove('accordion-active');
			accordionContent.style.maxHeight = 'none';

			var icon = defaultTarget.parentNode.querySelector('.icon-expand-less');

			if(icon) {
				icon.classList.remove('icon-expand-less');
				icon.classList.add('icon-expand-more');
			}

			accordionContent.off(phonon.event.transitionEnd, onHide);
		};

		accordionContent.style.maxHeight = '0px';
		accordionContent.on(phonon.event.transitionEnd, onHide);
	}

	// fix #96
	function getAccordion(target) {

		for (; target && target !== document; target = target.parentNode) {
			if(target.nextElementSibling && target.nextElementSibling.classList.contains('accordion-content')) {
				return {defaultTarget: target, accordionContent: target.nextElementSibling}
			}
		}

		return null
	}

	function onPage(evt) {

		var target = getAccordion(evt.target)
		if(target === null) return

		if(target.accordionContent.classList.contains('accordion-active')) {
			hide(target.defaultTarget, target.accordionContent);
		} else {
			show(target.defaultTarget, target.accordionContent);
		}
	}

	/*
	 * Attachs event once
	 */
	document.on('pagecreated', function(evt) {

		var page = document.querySelector(evt.detail.page);

		if(page.querySelector('.accordion-content')) {
			page.on('tap', onPage);
		}
	});

	document.on('pageclosed', function(evt) {

		var page = document.querySelector(evt.detail.page);
		var accordionLists = page.querySelectorAll('.accordion-active');
		var l = accordionLists.length;
		var i = 0;

		for (; i < accordionLists.length; i++) {
			var fakeDefaultTarget = accordionLists[i].previousElementSibling;
			onPage({target: fakeDefaultTarget});
		}
	});

}(typeof window !== 'undefined' ? window : this));

/**
* Simple, lightweight, usable local autocomplete library for modern browsers
* Because there weren’t enough autocomplete scripts in the world? Because I’m completely insane and have NIH syndrome? Probably both. :P
* @author Lea Verou http://leaverou.github.io/awesomplete
* MIT license
*/

(function () {

	var _ = function (input, o) {
		var me = this;

		// Setup

		this.input = $(input);
		this.input.setAttribute("autocomplete", "off");
		this.input.setAttribute("aria-autocomplete", "list");

		o = o || {};

		configure.call(this, {
			minChars: 2,
			maxItems: 10,
			autoFirst: false,
			filter: _.FILTER_CONTAINS,
			sort: _.SORT_BYLENGTH,
			item: function (text, input) {
				var html = input === '' ? text : text.replace(RegExp($.regExpEscape(input.trim()), "gi"), "<mark>$&</mark>");
				return $.create("li", {
					innerHTML: html,
					"aria-selected": "false"
				});
			},
			replace: function (text) {
				this.input.value = text;
			}
		}, o);

		this.index = -1;

		// Create necessary elements

		this.container = $.create("div", {
			className: "awesomplete",
			around: input
		});

		// @phonon add class list
		this.ul = $.create("ul", {
			className: "list",
			hidden: "hidden",
			inside: this.container
		});

		this.status = $.create("span", {
			className: "visually-hidden",
			role: "status",
			"aria-live": "assertive",
			"aria-relevant": "additions",
			inside: this.container
		});

		// Bind events

		$.bind(this.input, {
			"input": this.evaluate.bind(this),
			"blur": this.close.bind(this),
			"keydown": function(evt) {
				var c = evt.keyCode;

				// If the dropdown `ul` is in view, then act on keydown for the following keys:
				// Enter / Esc / Up / Down
				if(me.opened) {
					if (c === 13 && me.selected) { // Enter
						evt.preventDefault();
						me.select();
					}
					else if (c === 27) { // Esc
						me.close();
					}
					else if (c === 38 || c === 40) { // Down/Up arrow
						evt.preventDefault();
						me[c === 38? "previous" : "next"]();
					}
				}
			}
		});

		$.bind(this.input.form, {"submit": this.close.bind(this)});

		$.bind(this.ul, {"mousedown": function(evt) {
			var li = evt.target;

			if (li !== this) {

				while (li && !/li/i.test(li.nodeName)) {
					li = li.parentNode;
				}

				if (li && evt.button === 0) {  // Only select on left click
					me.select(li, evt);
				}
			}
		}});

		if (this.input.hasAttribute("list")) {
			this.list = "#" + this.input.getAttribute("list");
			this.input.removeAttribute("list");
		}
		else {
			this.list = this.input.getAttribute("data-list") || o.list || [];
		}

		_.all.push(this);
	};

	_.prototype = {
		set list(list) {
			if (Array.isArray(list)) {
				this._list = list;
			}
			else if (typeof list === "string" && list.indexOf(",") > -1) {
				this._list = list.split(/\s*,\s*/);
			}
			else { // Element or CSS selector
				list = $(list);

				if (list && list.children) {
					this._list = slice.apply(list.children).map(function (el) {
						return el.textContent.trim();
					});
				}
			}

			if (document.activeElement === this.input) {
				this.evaluate();
			}
		},

		get selected() {
			return this.index > -1;
		},

		get opened() {
			return this.ul && this.ul.getAttribute("hidden") == null;
		},

		close: function () {
			this.ul.setAttribute("hidden", "");
			this.index = -1;

			$.fire(this.input, "awesomplete-close");
		},

		open: function () {
			this.ul.removeAttribute("hidden");

			if (this.autoFirst && this.index === -1) {
				this.goto(0);
			}

			$.fire(this.input, "awesomplete-open");
		},

		next: function () {
			var count = this.ul.children.length;

			this.goto(this.index < count - 1? this.index + 1 : -1);
		},

		previous: function () {
			var count = this.ul.children.length;

			this.goto(this.selected? this.index - 1 : count - 1);
		},

		// Should not be used, highlights specific item without any checks!
		goto: function (i) {
			var lis = this.ul.children;

			if (this.selected) {
				lis[this.index].setAttribute("aria-selected", "false");
			}

			this.index = i;

			if (i > -1 && lis.length > 0) {
				lis[i].setAttribute("aria-selected", "true");
				this.status.textContent = lis[i].textContent;
			}

			$.fire(this.input, "awesomplete-highlight");
		},

		select: function (selected, originalEvent) {
			selected = selected || this.ul.children[this.index];

			if (selected) {
				var prevented;

				$.fire(this.input, "awesomplete-select", {
					text: selected.textContent,
					preventDefault: function () {
						prevented = true;
					},
					originalEvent: originalEvent
				});

				if (!prevented) {
					this.replace(selected.textContent);
					this.close();
					$.fire(this.input, "awesomplete-selectcomplete");
				}
			}
		},

		evaluate: function() {
			var me = this;
			var value = this.input.value;

			if (value.length >= this.minChars && this._list.length > 0) {
				this.index = -1;
				// Populate list with options that match
				this.ul.innerHTML = "";

				this._list
				.filter(function(item) {
					return me.filter(item, value);
				})
				.sort(this.sort)
				.every(function(text, i) {
					me.ul.appendChild(me.item(text, value));

					return i < me.maxItems - 1;
				});

				if (this.ul.children.length === 0) {
					this.close();
				} else {
					this.open();
				}
			}
			else {
				this.close();
			}
		}
	};

	// Static methods/properties

	_.all = [];

	_.FILTER_CONTAINS = function (text, input) {
		return RegExp($.regExpEscape(input.trim()), "i").test(text);
	};

	_.FILTER_STARTSWITH = function (text, input) {
		return RegExp("^" + $.regExpEscape(input.trim()), "i").test(text);
	};

	_.SORT_BYLENGTH = function (a, b) {
		if (a.length !== b.length) {
			return a.length - b.length;
		}

		return a < b? -1 : 1;
	};

	// Private functions

	function configure(properties, o) {
		for (var i in properties) {
			var initial = properties[i],
			attrValue = this.input.getAttribute("data-" + i.toLowerCase());

			if (typeof initial === "number") {
				this[i] = parseInt(attrValue);
			}
			else if (initial === false) { // Boolean options must be false by default anyway
				this[i] = attrValue !== null;
			}
			else if (initial instanceof Function) {
				this[i] = null;
			}
			else {
				this[i] = attrValue;
			}

			if (!this[i] && this[i] !== 0) {
				this[i] = (i in o)? o[i] : initial;
			}
		}
	}

	// Helpers

	var slice = Array.prototype.slice;

	function $(expr, con) {
		return typeof expr === "string"? (con || document).querySelector(expr) : expr || null;
	}

	function $$(expr, con) {
		return slice.call((con || document).querySelectorAll(expr));
	}

	$.create = function(tag, o) {
		var element = document.createElement(tag);

		for (var i in o) {
			var val = o[i];

			if (i === "inside") {
				$(val).appendChild(element);
			}
			else if (i === "around") {
				var ref = $(val);
				ref.parentNode.insertBefore(element, ref);
				element.appendChild(ref);
			}
			else if (i in element) {
				element[i] = val;
			}
			else {
				element.setAttribute(i, val);
			}
		}

		return element;
	};

	$.bind = function(element, o) {
		if (element) {
			for (var event in o) {
				var callback = o[event];

				event.split(/\s+/).forEach(function (event) {
					element.addEventListener(event, callback);
				});
			}
		}
	};

	$.fire = function(target, type, properties) {
		var evt = document.createEvent("HTMLEvents");

		evt.initEvent(type, true, true );

		for (var j in properties) {
			evt[j] = properties[j];
		}

		target.dispatchEvent(evt);
	};

	$.regExpEscape = function (s) {
		return s.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
	}

	// Initialization

	function init() {
		$$("input.awesomplete").forEach(function (input) {
			new _(input);
		});
	}

	// Are we in a browser? Check for Document constructor
	if (typeof Document !== "undefined") {
		// DOM already loaded?
		if (document.readyState !== "loading") {
			init();
		}
		else {
			// Wait for it
			document.addEventListener("DOMContentLoaded", init);
		}
	}

	_.$ = $;
	_.$$ = $$;

	// Make sure to export Awesomplete on self when in a browser
	if (typeof self !== "undefined") {
		self.Awesomplete = _;
	}

	// Expose Awesomplete as a CJS module
	if (typeof module === "object" && module.exports) {
		module.exports = _;
	}

	return _;

}());





/* ========================================================================
* Phonon: autocomplete.js v0.1.0
* http://phonon.quarkdev.com
* ========================================================================
* Licensed under MIT (http://phonon.quarkdev.com)
* ======================================================================== */
;(function (window, phonon) {

	'use strict';

	/**
	* For every mounted page, initizalize autocomplete
	*/

	phonon.autocomplete = function( input, object ){
		new Awesomplete( input, object );
	};


}(typeof window !== 'undefined' ? window : this, window.phonon || {}));

/* ========================================================================
 * Phonon: dialogs.js v0.0.6
 * http://phonon.quarkdev.com
 * ========================================================================
 * Licensed under MIT (http://phonon.quarkdev.com)
 * ======================================================================== */
;(function (window, phonon) {

	'use strict';

	var lastTrigger = false;
	var dialogs = [];

	function addCancelCallback(dialog, cancelCallback) {
		for (var i = 0; i < dialogs.length; i++) {
			if(dialogs[i].dialog === dialog) {
				dialogs[i].cancelCallback = cancelCallback;
				break;
			}
		}
	}

	var createBackdrop = function (id) {
		var backdrop = document.createElement('div');
		backdrop.setAttribute('data-id', id);
		backdrop.classList.add('backdrop-dialog');
		return backdrop;
	};

	var findTrigger = function (target) {
		var triggers = document.querySelectorAll('[data-dialog-id], [data-dialog-close]'), i;
		for (; target && target !== document; target = target.parentNode) {
			for (i = triggers.length; i--;) {
				if (triggers[i] === target) {
					return target;
				}
			}
		}
	};

	var getDialog = function (event) {
		var dialogToggle = findTrigger(event.target);
		if (dialogToggle) {
			var dialogId = dialogToggle.getAttribute('data-dialog-id');
			if(dialogId) {
				return document.querySelector('#'+dialogId);
			} else {
				return findDialog(event.target);
			}
		}
	};

	var findDialog = function (target) {
		var dialogs = document.querySelectorAll('.dialog'), i;

		for (; target && target !== document; target = target.parentNode) {
			for (i = dialogs.length; i--;) {
				if (dialogs[i] === target && target.classList.contains('active')) {
					return target;
				}
			}
		}
	};

	var findDialogObject = function(id) {

		var i = dialogs.length - 1;
		for (; i >= 0; i--) {
			if(dialogs[i].dialog.id === id) {
				var d = dialogs[i];
				d.index = i;
				return d;
			}
		}
		return false;
	};

	var buildDialog = function (type, text, title, cancelable, textOk, textCancel) {
		text = (typeof text === 'string' ? '<p>' + text + '</p>' : '');
		var noTitle = typeof title;
		title = (noTitle === 'string' ? title : type);
		cancelable = (typeof cancelable === 'boolean' ? cancelable : true);
		textOk = (typeof textOk === 'string' ? textOk : 'Ok');
		textCancel = (typeof textCancel === 'string' ? textCancel : 'Cancel');

		var id = 'auto-gen-' + type;

		var div = document.createElement('div');
		div.setAttribute('class', 'dialog');
		div.setAttribute('data-cancelable', cancelable);
		div.id = id;

		var nodeTitle = (noTitle === undefined ? '' : '<h3>'+title+'</h3>');
		var btnCancel = '<li><a class="btn btn-flat btn-cancel" data-dialog-close="true">' + textCancel + '</a></li>';
		var input = '';
		var indicator = '';

		if(type === 'alert') {
			btnCancel = '';
		} else if(type === 'prompt') {
			input = '<input type="text" placeholder="Value">';
		} else if(type === 'indicator') {
			text = '';
			indicator = '<div class="circle-progress active padded-bottom"><div class="spinner"></div></div>';
		}

		var actions = (type === 'indicator' ? '' : '<ul class="buttons">' +
			btnCancel +
			'<li><a class="btn btn-flat primary btn-confirm" data-dialog-close="true">' + textOk + '</a></li>' +
		'</ul>');

		var alert = '<div class="content">' +
			'<div class="padded-full">' +
				nodeTitle +
				text +
				input +
				indicator +
			'</div>'+
		'</div>' + actions;

		div.innerHTML = alert;

		document.body.appendChild(div);

		return div;
	};


	document.on(phonon.event.start, function (evt) {

		if(dialogs.length > 0) {
			var previous = dialogs[dialogs.length - 1], p = findDialog(evt.target);

			if (!p) {
				if(previous.dialog.getAttribute('data-cancelable') !== 'false') {

					// close the previous active dialog
					close(previous.dialog);

					// call the cancel callback
					if(typeof previous.cancelCallback === 'function') previous.cancelCallback();
				}
			}

			if (p && p !== previous.dialog) {
				// Case where there are two active dialogs
				if (p.id !== previous.dialog.id) {
					close(previous.dialog);
				}
			}
		}
	});

	document.on('tap', function(evt) {

		var trigger = findTrigger(evt.target), dialog = null;

		if (trigger) {
			dialog = getDialog(evt);

			lastTrigger = trigger;

			if(dialog) {

				if(dialog.classList.contains('active')) {
					close(dialog);
				} else {
					open(dialog);
				}
			}
		}
	});

	document.on('keypress', function(evt) {

		if(dialogs.length > 0) {

			if(evt.which == 13 || evt.keyCode == 13) {
				var previous = dialogs[dialogs.length - 1];
				close(previous.dialog);

				return false;
			}
		}

		return true;
	});

	function onHide() {

		var obj = findDialogObject(this.getAttribute('data-id'));
		var backdrop = obj.backdrop;

		backdrop.classList.remove('fadeout');
		document.body.removeChild(backdrop);

		var dialog = obj.dialog;
		dialog.style.visibility = 'hidden';
		dialog.classList.remove('close');

		dialogs.splice(obj.index, 1);

		this.off(phonon.event.transitionEnd, onHide, false);
	}

	function center (target) {

		var computedStyle = getComputedStyle(target),
		width = computedStyle.width,
		height = computedStyle.height;

		width = width.slice(0, width.length - 2);
		height = height.slice(0, height.length - 2);

		var top = (window.innerHeight / 2) - (height / 2);
		target.style.top = top + 'px';
	}

	function open (dialog) {

		dialog.style.visibility = 'visible';

		if(!dialog.classList.contains('active')) {

			center(dialog);

			dialog.classList.add('active');

			var preloader = dialog.querySelector('.circle-progress');

			if(preloader) phonon.preloader(preloader).show();

			var backdrop = createBackdrop(dialog.id);
			dialogs.push( {dialog: dialog, backdrop: backdrop} );

			document.body.appendChild(backdrop);
		}
	}

	function close(dialog) {

		if(dialog.classList.contains('active')) {

			dialog.classList.remove('active');
			dialog.classList.add('close');

			var preloader = dialog.querySelector('.circle-progress');
			if(preloader) phonon.preloader(preloader).hide();

			var obj = findDialogObject(dialog.id);

			var backdrop = obj.backdrop;

			backdrop.on(phonon.event.transitionEnd, onHide, false);

			// fix issue #62
			window.setTimeout(function() {
				backdrop.classList.add('fadeout');
			}, 1);
		}
	}

	function on(dialog, eventName, callback) {

		var fireEvent = function() {

			var input = dialog.querySelector('input');
			var inputValue = undefined;
			if(input) {
				inputValue = input.value;
			}

			callback(inputValue);
			this.off('tap', fireEvent);
		};

		if(eventName === 'confirm') {
			var btnConfirm = dialog.querySelector('.btn-confirm');
			if(btnConfirm) {
				btnConfirm.on('tap', fireEvent);
			}
		} else {

			// keep cancel callback for backdrop taps
			addCancelCallback(dialog, callback);

			var btnCancel = dialog.querySelector('.btn-cancel');
			if(btnCancel) {
				btnCancel.on('tap', fireEvent);
			}
		}
	}

	phonon.dialog = function(el) {

		if(typeof el === 'undefined') {

			return {
				closeActive: function() {
					var closable = (dialogs.length > 0 ? true : false);

					if(closable) {

						var dialog = dialogs[dialogs.length - 1].dialog;
						if(dialog.getAttribute('data-cancelable') !== 'false') {
							close(dialog);
						}
					}
					return closable;
				},
				alert: function(text, title, cancelable, textOk) {
					var dialog = buildDialog('alert', text, title, cancelable, textOk);
					open(dialog);
					return {
						on: function(eventName, callback) {
							on(dialog, eventName, callback);
						}
					};
				},
				confirm: function(text, title, cancelable, textOk, textCancel) {
					var dialog = buildDialog('confirm', text, title, cancelable, textOk, textCancel);
					open(dialog);
					return {
						on: function(eventName, callback) {
							on(dialog, eventName, callback);
						}
					};
				},
				prompt: function(text, title, cancelable, textOk, textCancel) {
					var dialog = buildDialog('prompt', text, title, cancelable, textOk, textCancel);
					open(dialog);
					return {
						on: function(eventName, callback) {
							on(dialog, eventName, callback);
						}
					};
				},
				indicator: function(title, cancelable) {
					var dialog = buildDialog('indicator', '', title, cancelable);
					open(dialog);
					return {
						on: function(eventName, callback) {
							on(dialog, eventName, callback);
							return this;
						},
						open: function() {
							open(dialog);
							return this;
						},
						close: function() {
							close(dialog);
							return this;
						}
					};
				}
			}
		}

		var dialog = (typeof el === 'string' ? document.querySelector(el) : el);
		if(dialog === null) {
			throw new Error('The following element ' + el + ' does not exists');
		}

		return {
			open: function() {
				open(dialog);
				return this;
			},
			close: function() {
				close(dialog);
				return this;
			},
			on: function(eventName, callback) {
				on(dialog, eventName, callback);
				return this;
			},
			isActive: function() {
				return (dialog.classList.contains('active') ? true : false);
			}
		};
	};

	window.phonon = phonon;

	if(typeof exports === 'object') {
		module.exports = phonon.dialog;
	} else if(typeof define === 'function' && define.amd) {
		define(function() { return phonon.dialog });
	}

}(typeof window !== 'undefined' ? window : this, window.phonon || {}));

/* ========================================================================
 * Phonon: floating-actions.js v0.0.5
 * http://phonon.quarkdev.com
 * ========================================================================
 * Licensed under MIT (http://phonon.quarkdev.com)
 * ======================================================================== */
;(function (window, phonon) {

	'use strict';
	
	var lastPosition = 0;
	var lastContentHeight = 0;

	var onContentScroll = function (evt) {
		evt = evt.originalEvent || evt;
		var pageContent = evt.target;

		lastContentHeight = pageContent.offsetHeight;

		var actions = document.querySelectorAll('.app-active .floating-action');
		if (!actions) return;

		var size = actions.length, i = size - 1;
		for (; i >= 0; i--) {
			var action = actions[i];
		
			if(lastPosition > pageContent.scrollTop) {
				if(!action.classList.contains('active')) {
					action.classList.add('active');
				}
			} else {
				if(action.classList.contains('active')) {
					action.classList.remove('active');
				}
			}
		}

		lastPosition = pageContent.scrollTop;
	};

    var isElement = function (o) {
        return (typeof Node === 'object' ? o instanceof Node : o && typeof o === 'object' && typeof o.nodeType === 'number' && typeof o.nodeName === 'string');
    };

    /**
     * Event listener for a floating action
     * @param {DOMElement} page
    */
	function listenTo(page) {
		if(isElement(page)) {
			var c = page.querySelector('.content');
			if(c) {
				c.on('scroll', onContentScroll, false);
			} else {
				console.error('The given page does not contain any .content node');
			}
		} else {
			throw new Error('The page must be a DOMElement not a ' + typeof page);
		}
	}

	document.on('pagecreated', function(evt) {
		var flas = document.querySelectorAll(evt.detail.page + ' .floating-action'), i = flas.length - 1;
		for (; i >= 0; i--) {

			var pages = document.querySelectorAll('.app-page');
			var j = pages.length - 1;
			for (; j >= 0; j--) {
				var page = pages[j];
				if(page.tagName.toLowerCase() === evt.detail.page) {
					listenTo(page);
					break;
				}
			}
		}
	});

}(typeof window !== 'undefined' ? window : this, window.phonon || {}));
/* ========================================================================
 * Phonon: forms.js v0.0.1
 * http://phonon.quarkdev.com
 * ========================================================================
 * Licensed under MIT (http://phonon.quarkdev.com)
 * ======================================================================== */
;(function (window) {

	'use strict';

	function addListener(inputEl) {
		inputEl.on('focus', onInputFocus);
		inputEl.on('blur', onInputBlur);
	}

	function onInputFocus(evt) {
		evt.target.parentNode.classList.add('input-filled');
	}

	function onInputBlur(evt) {
		if(evt.target.value.trim() === '') {
			evt.target.parentNode.classList.remove('input-filled');
		}
	}

	function isInputFilled(input) {
		if(input.value.trim() !== '' && !input.parentNode.classList.contains('input-filled')) {
			input.parentNode.classList.add('input-filled');
		}
	}

	/*
	 * Attachs events once
	 */
	document.on('pagecreated', function(evt) {
		var page = document.querySelector(evt.detail.page);
		var inputs = page.querySelectorAll('input.with-label'), i = inputs.length - 1;
		for (; i >= 0; i--) {
			addListener(inputs[i]);

			/*
			 * Do this once at start also, otherwise pre-populated inputs
			 * will have labels directly overlapping on top of the input value on page load.
			*/
			isInputFilled(inputs[i]);
		}
	});

	/*
	 * Checks if inputs are filled
	 */
	document.on('pageopened', function(evt) {
		var page = document.querySelector(evt.detail.page);
		var inputs = page.querySelectorAll('input.with-label'), i = inputs.length - 1;
		for (; i >= 0; i--) {
			isInputFilled(inputs[i]);
		}
	});

}(typeof window !== 'undefined' ? window : this));

/* ========================================================================
* Phonon: notifications.js v0.0.2
* http://phonon.quarkdev.com
* ========================================================================
* Licensed under MIT (http://phonon.quarkdev.com)
* ======================================================================== */
;(function (window, phonon) {

	'use strict'

	var notifs = []

	function onShow() {

		var self = this

		var timeout = self.getAttribute('data-timeout')
		if(timeout) {

			if(isNaN(parseInt(timeout))) {
				console.error('Attribute data-timeout must be a number')
			} else {

				var progress = self.querySelector('.progress')

				if(progress) {

					if(!progress.classList.contains('active')) {
						progress.classList.add('active')
					}

					var progressBar = progress.querySelector('.determinate')

					progressBar.style.width = '0'
					progressBar.style.transitionDuration = timeout + 'ms'

					window.setTimeout(function() {
						progressBar.style.width = '100%'
					}, 1)
				}

				window.setTimeout(function() {
					hide(self);
				}, parseInt(timeout));
			}
		}

		self.off(phonon.event.transitionEnd, onShow, false)
	}

	function onHide() {

		var self = this

		// reset
		self.style.zIndex = 28

		var height = self.clientHeight

		// for the notif
		self.style.webkitTransform = 'translateY('+height+'px)'
		self.style.MozTransform = 'translateY('+height+'px)'
		self.style.msTransform = 'translateY('+height+'px)'
		self.style.OTransform = 'translateY('+height+'px)'
		self.style.transform = 'translateY('+height+'px)'

		var index = getIndex(self)
		if(index >= 0) notifs.splice(index, 1)

		// for others
		var i = notifs.length - 1
		for(; i >= 0; i--) {
			var valueUpdated = (i * height)
			notifs[i].style.webkitTransform = 'translateY(-'+valueUpdated+'px)'
			notifs[i].style.MozTransform = 'translateY(-'+valueUpdated+'px)'
			notifs[i].style.msTransform = 'translateY(-'+valueUpdated+'px)'
			notifs[i].style.OTransform = 'translateY(-'+valueUpdated+'px)'
			notifs[i].style.transform = 'translateY(-'+valueUpdated+'px)'
		}

		var progressBar = self.querySelector('.determinate')
		if(progressBar) {
			progressBar.style.width = '0'
			progressBar.style.transitionDuration = '0ms'
		}

		self.off(phonon.event.transitionEnd, onHide, false)

		if(self.getAttribute('data-autodestroy') === 'true') {
			window.setTimeout(function() {
				document.body.removeChild(self)
			}, 500)
		}
	}

	function getIndex(notif) {
		var i = notifs.length - 1
		for (; i >= 0; i--) {
			if(notifs[i] === notif) {
				return i
			}
		}
		return -1
	}

	var getNotification = function(target) {
		for (; target && target !== document; target = target.parentNode) {
			if(target.classList.contains('notification')) {
				return target
			}
		}
	};

	var generateId = function() {
		var text = ""
		var possible = "abcdefghijklmnopqrstuvwxyz"
		var i = 0
		for(; i < 8; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length))
		}
		return text
	}

	var buildNotif = function(text, timeout, showButton, cancelButton) {
		if(typeof text !== 'string') text = ''
		timeout = (typeof timeout === 'number' ? timeout : 5000)
		cancelButton = (typeof cancelButton === 'string' ? cancelButton : 'CANCEL')

		var progress = '<div class="progress"><div class="determinate"></div></div>'
		var btn = (showButton === true ? '<button class="btn pull-right" data-hide-notif="true">' + cancelButton + '</button>' : '')

		var div = document.createElement('div')
		div.setAttribute('class', 'notification')
		div.setAttribute('data-autodestroy', 'true')
		if(timeout) div.setAttribute('data-timeout', timeout)
		div.id = generateId()

		div.innerHTML = progress + btn + text

		document.body.appendChild(div)

		return document.querySelector('#' + div.id)
	};

	document.on('tap', function(evt) {

		var target = evt.target

		if(target.getAttribute('data-hide-notif') === 'true') {
			var notification = getNotification(target)
			if(notification) hide(notification)
		}
	});

	/*
	* Public API
	*/

	function show(notification) {

		if (notification.classList.contains('show')) return false

		window.setTimeout(function() {
			notification.classList.add('show')
		}, 1)

		// Fix animation
		notification.style.zIndex = (28 + notifs.length)

		// Fix space
		var value = 0
		if(notifs.length > 0) {
			var lastNotif = notifs[notifs.length - 1]
			value = (notifs.length * lastNotif.clientHeight)
		}

		notification.style.webkitTransform = 'translateY(-'+value+'px)'
		notification.style.MozTransform = 'translateY(-'+value+'px)'
		notification.style.msTransform = 'translateY(-'+value+'px)'
		notification.style.OTransform = 'translateY(-'+value+'px)'
		notification.style.transform = 'translateY(-'+value+'px)'

		notifs.push(notification)

		// push floating actions
		var fla = document.querySelector('.app-active .floating-action')
		if(fla) {
			fla.style.webkitTransform = 'translateY(-48px)'
			fla.style.MozTransform = 'translateY(-48px)'
			fla.style.msTransform = 'translateY(-48px)'
			fla.style.OTransform = 'translateY(-48px)'
			fla.style.transform = 'translateY(-48px)'
		}

		notification.on(phonon.event.transitionEnd, onShow, false)
	}

	function hide(notification) {
		if(notification.classList.contains('show')) {

			notification.classList.remove('show')

			notification.on(phonon.event.transitionEnd, onHide, false)

			// put floating actions back in their place
			var fla = document.querySelector('.app-active .floating-action')
			if(fla) {
				fla.style.webkitTransform = 'translateY(0)'
				fla.style.MozTransform = 'translateY(0)'
				fla.style.msTransform = 'translateY(0)'
				fla.style.OTransform = 'translateY(0)'
				fla.style.transform = 'translateY(0)'
			}
		}
	}

	phonon.notif = function(el, timeout, showButton) {

		if(arguments.length > 1) {
			// el is text
			return show(buildNotif(el, timeout, showButton))
		}

		var notif = (typeof el === 'string' ? document.querySelector(el) : el)
		if(notif === null) {
			throw new Error('The notification with ID ' + el + ' does not exist')
		}

		return {
			show: function () {
				show(notif)
			},
			hide: function () {
				hide(notif)
			}
		}
	}

	window.phonon = phonon

	if(typeof exports === 'object') {
		module.exports = phonon.notif
	} else if(typeof define === 'function' && define.amd) {
		define(function() { return phonon.notif })
	}

}(typeof window !== 'undefined' ? window : this, window.phonon || {}));

/* ========================================================================
* Phonon: panels.js v0.1.3
* http://phonon.quarkdev.com
* ========================================================================
* Licensed under MIT (http://phonon.quarkdev.com)
* ======================================================================== */
;(function (window, document, phonon, undefined) {

	'use strict'

	var _activeObjects = []

	var createBackdrop = function (id) {
		var backdrop = document.createElement('div')
		backdrop.classList.add('backdrop-panel')
		backdrop.setAttribute('data-backdrop-for', id)
		return backdrop
	}

	var findTrigger = function (target) {
		var triggers = document.querySelectorAll('[data-panel-id], [data-panel-close]'), i
		for (; target && target !== document; target = target.parentNode) {
			for (i = triggers.length; i--;) {
				if (triggers[i] === target) {
					return target
				}
			}
		}
	}

	var getPanel = function (event) {
		var panelToggle = findTrigger(event.target)
		if (panelToggle) {
			var panelId = panelToggle.getAttribute('data-panel-id')
			if(panelId) {
				return document.querySelector('#'+panelId)
			} else {
				return findDOMPanel(event.target)
			}
		}
	}

	var findObject = function(panelId) {
		var length = _activeObjects.length
		var i = 0
		for (; i < length; i++) {
			if(_activeObjects[i].panel.getAttribute('id') === panelId) {
				var found = _activeObjects[i]
				found.index = i
				return found
			}
		}
		return null
	}

	var findDOMPanel = function (target) {
		var panels = document.querySelectorAll('.panel, .panel-full'), i

		for (; target && target !== document; target = target.parentNode) {
			for (i = panels.length; i--;) {
				if (panels[i] === target && target.classList.contains('active')) {
					return target
				}
			}
		}
	}

	/**
	* Used to find an opened dialog
	* in front of a panel
	* @todo clean this
	*/
	var onDialog = function (target) {
		for (; target && target !== document; target = target.parentNode) {
			if (target.classList.contains('dialog') || target.classList.contains('backdrop-dialog')) {
				return true;
			}
		}
		return false;
	};

	document.on(phonon.event.start, function (evt) {
		evt = evt.originalEvent || evt;

		// don't close panels if notifications are pressed
		if(evt.target.classList.contains('notification') || evt.parentNode && evt.target.parentNode.classList.contains('notification')) return
		// don't close panels if a dialog is opened
		if(onDialog(evt.target)) return;

		if(_activeObjects.length > 0) {
			var previousPanel = _activeObjects[_activeObjects.length - 1].panel, p = findDOMPanel(evt.target);

			if (!p) {
				close(previousPanel);
			}

			if (p && p !== previousPanel) {
				// Case where there are two active panels
				if (p.id !== previousPanel.id) {
					close(previousPanel);
				}
			}
		}
	});

	document.on(phonon.event.tap, function (evt) {

		// don't close panels if notifications are pressed
		if(evt.target.classList.contains('notification') || evt.parentNode && evt.target.parentNode.classList.contains('notification')) return
		// don't close panels if a dialog is opened
		if(onDialog(evt.target)) return;

		var trigger = findTrigger(evt.target), panel = null;

		if (trigger) {
			panel = getPanel(evt);

			if(panel) {
				panel.classList.contains('active') ? close(panel) : open(panel);
			}
		}

		panel = findDOMPanel(evt.target);

		if(!panel && !trigger) {
			if(_activeObjects.length > 0) {
				var previousPanel = _activeObjects[_activeObjects.length - 1].panel, p = findDOMPanel(evt.target);
				close(previousPanel);
			}
		}
	});

	function onHide() {

		document.body.removeChild(this);

		var object = findObject(this.getAttribute('data-backdrop-for'))

		_activeObjects.splice(object.index, 1)

		this.off(phonon.event.transitionEnd, onHide, false);
	}

	/**
	* Public API
	*/

	function open (panel) {
		panel.style.visibility = 'visible';

		if(!panel.classList.contains('active')) {
			panel.classList.add('active');
			var backdrop = createBackdrop(panel.getAttribute('id'));

			document.body.appendChild(backdrop);

			_activeObjects.push({panel: panel, backdrop: backdrop});
		}
	}

	function close (panel) {

		if(panel.classList.contains('active')) {

			panel.classList.remove('active');
			panel.classList.add('panel-closing');

			var closePanel = function () {
				panel.classList.remove('panel-closing');
				panel.off(phonon.event.transitionEnd, closePanel);
			};

			panel.on(phonon.event.transitionEnd, closePanel);

			var pObject = findObject(panel.getAttribute('id'))

			if(pObject) {
				pObject.backdrop.classList.add('fadeout');
				pObject.backdrop.on(phonon.event.transitionEnd, onHide, false);
			}

		}
	}

	phonon.panel = function (el) {
		if(typeof el === 'undefined') {
			return {
				closeActive: function() {
					var closable = (_activeObjects.length > 0 ? true : false);
					if(closable) {
						close(_activeObjects[_activeObjects.length - 1].panel);
					}
					return closable;
				}
			}
		}

		var panel = (typeof el === 'string' ? document.querySelector(el) : el);
		if(panel === null) {
			throw new Error('The panel with ID ' + el + ' does not exist');
		}

		return {
			open: function () {
				open(panel);
			},
			close: function () {
				close(panel);
			}
		};
	};

	window.phonon = phonon;

	if(typeof exports === 'object') {
		module.exports = phonon.panel;
	} else if(typeof define === 'function' && define.amd) {
		define(function() { return phonon.panel });
	}

}(window, document, window.phonon || {}));

/* ========================================================================
 * Phonon: popovers.js v0.0.5
 * http://phonon.quarkdev.com
 * ========================================================================
 * Licensed under MIT (http://phonon.quarkdev.com)
 * ======================================================================== */
;(function (window, phonon) {

  'use strict';

  var touchMove = false;
  var previousPopover = null;
  var isOpened = false;
  var backdrop = document.createElement('div');
  backdrop.classList.add('backdrop-popover');

  var findTrigger = function (target) {

    var res = { target : null, id: null, direction : null };

    for (; target && target !== document; target = target.parentNode) {

      var id = target.getAttribute('data-popover-id');

      if(id !== null) {

        res.target = target;
        res.id = id;
        res.direction = 'left';

        if(!target.classList.contains('title') && target.classList.contains('pull-left')) {
          res.direction = 'left'; // button with pull-left
        } else if(!target.classList.contains('title') && target.parentNode.classList.contains('pull-left')) {
          res.direction = 'left'; // button with parent pull-left
        } else if(target.classList.contains('title') && target.classList.contains('pull-left')) {
          res.direction = 'title-left'; // title with pull-left
        } else if(target.parentNode && target.parentNode.classList.contains('pull-left') && target.classList.contains('title')) {
          res.direction = 'title-left'; // title with parent pull-left
        } else if(target.classList.contains('pull-right')) {
          res.direction = 'right'; // button with pull-right
        } else if(target.parentNode && target.parentNode.classList.contains('pull-right')) {
          res.direction = 'right'; // button with parent pull-right
        } else if(target.classList.contains('center')) {
          res.direction = 'title'; // title with center
        } else if(target.parentNode && target.parentNode.classList.contains('center')) {
          res.direction = 'title'; // title with parent center
        } else {
          res.direction = 'button';
        }

        break;
      }
    }
    return res;
  };

  var findPopover = function (target) {
    var popovers = document.querySelectorAll('.popover');
    var i;
    for (; target && target !== document; target = target.parentNode) {
      for (i = popovers.length; i--;) {
        if (popovers[i] === target && target.classList.contains('active')) {
          return target;
        }
      }
    }
  };

  var onItem = function(target) {
    for (; target && target !== document; target = target.parentNode) {
      if(target === previousPopover) {
        return true;
      }
    }
    return false;
  };

  document.on(phonon.event.start, function (e) {
    e = e.originalEvent || e;

    var p = findPopover(e.target);

    if (!p && isOpened) {
      close(previousPopover);
    }
    touchMove = false;
  });

  document.on(phonon.event.move, function (e) {
    e = e.originalEvent || e;
    touchMove = true;
  });

  document.on(phonon.event.end, function (evt) {

    var target = evt.target, trigger = findTrigger(target);

    if (trigger.target) {

      var popover = document.querySelector('#'+trigger.id);

      if(popover) {

        if(popover.classList.contains('active') && !touchMove) {
          close(popover);
        } else {
          open(popover, trigger.direction);
        }
      }
    }

    // fix
    if(target.parentNode === null) {
      return;
    }

    if(onItem(target) && !touchMove) {

      close(previousPopover);

      evt = new CustomEvent('itemchanged', {
        detail: { item: target.textContent, target: evt.target },
        bubbles: true,
        cancelable: true
      });

      var triggers = document.querySelectorAll('[data-popover-id="'+ previousPopover.id +'"]');
      var i = triggers.length - 1;

      for (; i >= 0; i--) {
        var trigger = triggers[i];
        if(trigger.getAttribute('data-autobind') === 'true') {

          if(!('textContent' in trigger)) {
              trigger.innerText = target.innerText;
          } else {
              trigger.textContent = target.textContent;
          }
        }
      }

      previousPopover.dispatchEvent(evt);
    }
  });

  function onHide() {

    var page = document.querySelector('.app-active');
    if(page.querySelector('div.backdrop-popover') !== null) {
      page.removeChild(backdrop);
    }
    previousPopover.style.visibility = 'hidden';
    previousPopover = null;
  }

  /**
   * Public API
  */

  function open (popover, direction) {
    if(direction === undefined) {
      direction = 'left';
    }

    isOpened = true;

    popover.style.visibility = 'visible';

    // Reset the scroll state
    popover.querySelector('ul').scrollTop = 0;

    previousPopover = popover;
    if(!popover.classList.contains('active')) {

      var page = document.querySelector('.app-page.app-active');
      var pageStyle = page.currentStyle || window.getComputedStyle(page);

      if(direction === 'title' || direction === 'title-left') {

        var hb = page.querySelector('.header-bar');
        popover.style.top = hb.offsetHeight + 'px';

        if(direction === 'title') {
          popover.style.left = (((hb.clientWidth/2 + parseInt(pageStyle.marginLeft))) - (popover.clientWidth/2)) + 'px';
        } else {
          popover.style.left = (16 + parseInt(pageStyle.marginLeft)) + 'px';
        }
      } else if(direction === 'left' || direction === 'right') {

        popover.style.top = '12px';

        if(direction === 'left') {
          popover.style.left = (16 + parseInt(pageStyle.marginLeft)) + 'px';
        } else {
          popover.style.left = 'auto';
          popover.style.right = '16px';
        }
      } else {

        var trigger = document.querySelector('.btn-popover[data-popover-id="'+ popover.id +'"]');
        var rect = trigger.getBoundingClientRect();

        popover.style.width = trigger.clientWidth + 'px';
        popover.style.top = rect.top + 'px';
        popover.style.left = rect.left + 'px';
      }

      if(!popover.classList.contains('active')) {
        popover.classList.add('active');
      }

      page.appendChild(backdrop);
    }
  }

  function close (popover) {
    isOpened = false;
    previousPopover = popover;

    if(popover.classList.contains('active')) {
      popover.classList.toggle('active');

      window.setTimeout(function() {
        onHide();
      }, 250);
    }
  }

  phonon.popover = function (el) {
    if(typeof el === 'undefined') {
      return {
        closeActive: function() {
          var closable = (previousPopover ? true : false);
          if(closable) {
            close(previousPopover);
          }
          return closable;
        }
      }
    }

    var popover = (typeof el === 'string' ? document.querySelector(el) : el);
    if(popover === null) {
      throw new Error('The popover with ID ' + el + ' does not exist');
    }

    return {
      open: function () {
        open(popover);
      },
      close: function () {
        close(popover);
      }
    };
  };

  window.phonon = phonon;

  if(typeof exports === 'object') {
    module.exports = phonon.popover;
  } else if(typeof define === 'function' && define.amd) {
    define(function() { return phonon.popover });
  }

}(typeof window !== 'undefined' ? window : this, window.phonon || {}));

/* ========================================================================
 * Phonon: preloaders.js v0.0.5
 * http://phonon.quarkdev.com
 * ========================================================================
 * Licensed under MIT (http://phonon.quarkdev.com)
 * ======================================================================== */
;(function (window, phonon) {

	'use strict';

	function show (preloader) {

		if(!preloader.classList.contains('active')) {
			preloader.style.visibility = 'visible';
			preloader.classList.add('active');
		}
	}

	function onHide() {
		this.style.visibility = 'hidden';
		this.off(phonon.event.transitionEnd, onHide);
	}

	/**
	 * @param {DOMElement | String} el
	*/
	function hide (preloader) {

		if(preloader.classList.contains('active')) {
			preloader.classList.remove('active');
			preloader.on(phonon.event.transitionEnd, onHide);
		}
	}


	phonon.preloader = function (el) {
		var preloader = (typeof el === 'string' ? document.querySelector(el) : el);
		if(preloader === null) {
			throw new Error('The preloader with ID ' + el + ' does not exist');
		}

		return {
			show: function () {
				show(preloader);
			},
			hide: function () {
				hide(preloader);
			}
		};
	};

	window.phonon = phonon;

	if(typeof exports === 'object') {
		module.exports = phonon.preloader;
	} else if(typeof define === 'function' && define.amd) {
		define(function() { return phonon.preloader });
	}

}(typeof window !== 'undefined' ? window : this, window.phonon || {}));
/*
 * Snap.js
 *
 * Copyright 2013, Jacob Kelley - http://jakiestfu.com/
 * Released under the MIT Licence
 * http://opensource.org/licenses/MIT
 *
 * Github:  http://github.com/jakiestfu/Snap.js/
 * Version: 1.9.3
 */
/*jslint browser: true*/
/*global define, module, ender*/
(function(win, doc) {

    'use strict';

    var backdrop = null;

    var Snap = Snap || function(userOpts) {
        var settings = {
            element: null,
            dragger: null,
            disable: 'none',
            addBodyClasses: true,
            hyperextensible: true,
            resistance: 0.5,
            flickThreshold: 50,
            transitionSpeed: 0.3,
            easing: 'ease',
            maxPosition: 266,
            minPosition: -266,
            tapToClose: true,
            touchToDrag: true,
            slideIntent: 40, // degrees
            minDragDistance: 5
        },
        cache = {
            simpleStates: {
                opening: null,
                towards: null,
                hyperExtending: null,
                halfway: null,
                flick: null,
                translation: {
                    absolute: 0,
                    relative: 0,
                    sinceDirectionChange: 0,
                    percentage: 0
                }
            }
        },
        eventList = {},
        utils = {
            hasTouch: ('ontouchstart' in doc.documentElement || win.navigator.msPointerEnabled),
            eventType: function(action) {
                var eventTypes = {
                        down: (utils.hasTouch ? 'touchstart' : 'mousedown'),
                        move: (utils.hasTouch ? 'touchmove' : 'mousemove'),
                        up: (utils.hasTouch ? 'touchend' : 'mouseup'),
                        out: (utils.hasTouch ? 'touchcancel' : 'mouseout')
                    };
                return eventTypes[action];
            },
            page: function(t, e){
                return (utils.hasTouch && e.touches.length && e.touches[0]) ? e.touches[0]['page'+t] : e['page'+t];
            },
            klass: {
                has: function(el, name){
                    return (el.className).indexOf(name) !== -1;
                },
                add: function(el, name){
                    if(!utils.klass.has(el, name) && settings.addBodyClasses){
                        el.className += " "+name;
                    }
                },
                remove: function(el, name){
                    if(settings.addBodyClasses){
                        el.className = (el.className).replace(name, "").replace(/^\s+|\s+$/g, '');
                    }
                }
            },
            dispatchEvent: function(type) {
                if (typeof eventList[type] === 'function') {
                    return eventList[type].call();
                }
            },
            // @phonon
            createBackdrop: function() {
                if(!backdrop) {

                    var bd = document.createElement('div');
                    bd.classList.add('backdrop-panel');
                    backdrop = bd;

                    document.querySelector('.app-active').appendChild(backdrop);
                }
            },
            removeBackdrop: function() {

                if(backdrop) {

                    // Set backdrop to null immediately
                    var _backdrop = backdrop;
                    backdrop = null;

                    // query the current page in case of page navigation with a side panel link
                    var page = document.querySelector('.app-active');

                    var closed = function () {
                        _backdrop.classList.remove('fadeout');
                        page.removeChild(_backdrop);
                        _backdrop.off(phonon.event.transitionEnd, closed);
                    };

                    _backdrop.classList.add('fadeout');
                    _backdrop.on(phonon.event.transitionEnd, closed);
                }
            },
            vendor: function(){
                var tmp = doc.createElement("div"),
                    prefixes = 'webkit Moz O ms'.split(' '),
                    i;
                for (i in prefixes) {
                    if (typeof tmp.style[prefixes[i] + 'Transition'] !== 'undefined') {
                        return prefixes[i];
                    }
                }
            },
            transitionCallback: function(){
                return (cache.vendor==='Moz' || cache.vendor==='ms') ? 'transitionend' : cache.vendor+'TransitionEnd';
            },
            canTransform: function(){
                return typeof settings.element.style[cache.vendor+'Transform'] !== 'undefined';
            },
            deepExtend: function(destination, source) {
                var property;
                for (property in source) {
                    if (source[property] && source[property].constructor && source[property].constructor === Object) {
                        destination[property] = destination[property] || {};
                        utils.deepExtend(destination[property], source[property]);
                    } else {
                        destination[property] = source[property];
                    }
                }
                return destination;
            },
            angleOfDrag: function(x, y) {
                var degrees, theta;
                // Calc Theta
                theta = Math.atan2(-(cache.startDragY - y), (cache.startDragX - x));
                if (theta < 0) {
                    theta += 2 * Math.PI;
                }
                // Calc Degrees
                degrees = Math.floor(theta * (180 / Math.PI) - 180);
                if (degrees < 0 && degrees > -180) {
                    degrees = 360 - Math.abs(degrees);
                }
                return Math.abs(degrees);
            },
            events: {
                addEvent: function addEvent(element, eventName, func) {
                    if (element.addEventListener) {
                        return element.addEventListener(eventName, func, false);
                    } else if (element.attachEvent) {
                        return element.attachEvent("on" + eventName, func);
                    }
                },
                removeEvent: function addEvent(element, eventName, func) {
                    if (element.addEventListener) {
                        return element.removeEventListener(eventName, func, false);
                    } else if (element.attachEvent) {
                        return element.detachEvent("on" + eventName, func);
                    }
                },
                prevent: function(e) {
                    if (e.preventDefault) {
                        e.preventDefault();
                    } else {
                        e.returnValue = false;
                    }
                }
            },
            parentUntil: function(el, attr) {
                var isStr = typeof attr === 'string';
                while (el.parentNode) {
                    if (isStr && el.getAttribute && el.getAttribute(attr)){
                        return el;
                    } else if(!isStr && el === attr){
                        return el;
                    }
                    el = el.parentNode;
                }
                return null;
            }
        },
        action = {
            translate: {
                get: {
                    matrix: function(index) {

                        if( !utils.canTransform() ){
                            return parseInt(settings.element.style.left, 10);
                        } else {
                            var matrix = win.getComputedStyle(settings.element)[cache.vendor+'Transform'].match(/\((.*)\)/),
                                ieOffset = 8;
                            if (matrix) {
                                matrix = matrix[1].split(',');
                                if(matrix.length===16){
                                    index+=ieOffset;
                                }
                                return parseInt(matrix[index], 10);
                            }
                            return 0;
                        }
                    }
                },
                easeCallback: function(){
                    settings.element.style[cache.vendor+'Transition'] = '';
                    cache.translation = action.translate.get.matrix(4);
                    cache.easing = false;
                    clearInterval(cache.animatingInterval);

                    if(cache.easingTo===0){
                        utils.klass.remove(doc.body, 'snapjs-right');
                        utils.klass.remove(doc.body, 'snapjs-left');
                    }

                    utils.dispatchEvent('animated');
                    utils.events.removeEvent(settings.element, utils.transitionCallback(), action.translate.easeCallback);
                },
                easeTo: function(n) {

                    // @phonon
                    if(n === 0) {
                        utils.removeBackdrop();
                    }

                    if( !utils.canTransform() ){
                        cache.translation = n;
                        action.translate.x(n);
                    } else {
                        cache.easing = true;
                        cache.easingTo = n;

                        settings.element.style[cache.vendor+'Transition'] = 'all ' + settings.transitionSpeed + 's ' + settings.easing;

                        cache.animatingInterval = setInterval(function() {
                            utils.dispatchEvent('animating');
                        }, 1);

                        utils.events.addEvent(settings.element, utils.transitionCallback(), action.translate.easeCallback);
                        action.translate.x(n);
                    }
                    if(n===0){
                           settings.element.style[cache.vendor+'Transform'] = '';
                       }
                },
                x: function(n) {
                    if( (settings.disable==='left' && n>0) ||
                        (settings.disable==='right' && n<0)
                    ){ return; }

                    if( !settings.hyperextensible ){
                        if( n===settings.maxPosition || n>settings.maxPosition ){
                            n=settings.maxPosition;
                        } else if( n===settings.minPosition || n<settings.minPosition ){
                            n=settings.minPosition;
                        }
                    }

                    n = parseInt(n, 10);
                    if(isNaN(n)){
                        n = 0;
                    }

                    if( utils.canTransform() ){
                        var theTranslate = 'translate3d(' + n + 'px, 0,0)';
                        settings.element.style[cache.vendor+'Transform'] = theTranslate;
                    } else {
                        settings.element.style.width = (win.innerWidth || doc.documentElement.clientWidth)+'px';

                        settings.element.style.left = n+'px';
                        settings.element.style.right = '';
                    }
                }
            },
            drag: {
                listen: function() {
                    cache.translation = 0;
                    cache.easing = false;
                    utils.events.addEvent(settings.element, utils.eventType('down'), action.drag.startDrag);
                    utils.events.addEvent(settings.element, utils.eventType('move'), action.drag.dragging);
                    utils.events.addEvent(settings.element, utils.eventType('up'), action.drag.endDrag);
                },
                stopListening: function() {
                    utils.events.removeEvent(settings.element, utils.eventType('down'), action.drag.startDrag);
                    utils.events.removeEvent(settings.element, utils.eventType('move'), action.drag.dragging);
                    utils.events.removeEvent(settings.element, utils.eventType('up'), action.drag.endDrag);
                },
                startDrag: function(e) {
                    // No drag on ignored elements
                    var target = e.target ? e.target : e.srcElement,
                        ignoreParent = utils.parentUntil(target, 'data-snap-ignore');

                    if (ignoreParent) {
                        utils.dispatchEvent('ignore');
                        return;
                    }


                    if(settings.dragger){
                        var dragParent = utils.parentUntil(target, settings.dragger);

                        // Only use dragger if we're in a closed state
                        if( !dragParent &&
                            (cache.translation !== settings.minPosition &&
                            cache.translation !== settings.maxPosition
                        )){
                            return;
                        }
                    }

                    utils.dispatchEvent('start');
                    settings.element.style[cache.vendor+'Transition'] = '';
                    cache.isDragging = true;
                    cache.hasIntent = null;
                    cache.intentChecked = false;
                    cache.startDragX = utils.page('X', e);
                    cache.startDragY = utils.page('Y', e);
                    cache.dragWatchers = {
                        current: 0,
                        last: 0,
                        hold: 0,
                        state: ''
                    };
                    cache.simpleStates = {
                        opening: null,
                        towards: null,
                        hyperExtending: null,
                        halfway: null,
                        flick: null,
                        translation: {
                            absolute: 0,
                            relative: 0,
                            sinceDirectionChange: 0,
                            percentage: 0
                        }
                    };
                },
                dragging: function(e) {

                    if (cache.isDragging && settings.touchToDrag) {

                        var thePageX = utils.page('X', e),
                            thePageY = utils.page('Y', e),
                            translated = cache.translation,
                            absoluteTranslation = action.translate.get.matrix(4),
                            whileDragX = thePageX - cache.startDragX,
                            openingLeft = absoluteTranslation > 0,
                            translateTo = whileDragX,
                            diff;

                        // Shown no intent already
                        if((cache.intentChecked && !cache.hasIntent)){
                            return;
                        }

                        if(settings.addBodyClasses){
                            if((absoluteTranslation)>0){
                                utils.klass.add(doc.body, 'snapjs-left');
                                utils.klass.remove(doc.body, 'snapjs-right');
                            } else if((absoluteTranslation)<0){
                                utils.klass.add(doc.body, 'snapjs-right');
                                utils.klass.remove(doc.body, 'snapjs-left');
                            }
                        }

                        if (cache.hasIntent === false || cache.hasIntent === null) {
                            var deg = utils.angleOfDrag(thePageX, thePageY),
                                inRightRange = (deg >= 0 && deg <= settings.slideIntent) || (deg <= 360 && deg > (360 - settings.slideIntent)),
                                inLeftRange = (deg >= 180 && deg <= (180 + settings.slideIntent)) || (deg <= 180 && deg >= (180 - settings.slideIntent));
                            if (!inLeftRange && !inRightRange) {
                                cache.hasIntent = false;
                            } else {
                                cache.hasIntent = true;
                            }
                            cache.intentChecked = true;
                        }

                        if (
                            (settings.minDragDistance>=Math.abs(thePageX-cache.startDragX)) || // Has user met minimum drag distance?
                            (cache.hasIntent === false)
                        ) {
                            return;
                        }

                        utils.events.prevent(e);
                        utils.dispatchEvent('drag');

                        cache.dragWatchers.current = thePageX;
                        // Determine which direction we are going
                        if (cache.dragWatchers.last > thePageX) {
                            if (cache.dragWatchers.state !== 'left') {
                                cache.dragWatchers.state = 'left';
                                cache.dragWatchers.hold = thePageX;
                            }
                            cache.dragWatchers.last = thePageX;
                        } else if (cache.dragWatchers.last < thePageX) {
                            if (cache.dragWatchers.state !== 'right') {
                                cache.dragWatchers.state = 'right';
                                cache.dragWatchers.hold = thePageX;
                            }
                            cache.dragWatchers.last = thePageX;
                        }
                        if (openingLeft) {
                            // Pulling too far to the right
                            if (settings.maxPosition < absoluteTranslation) {
                                diff = (absoluteTranslation - settings.maxPosition) * settings.resistance;
                                translateTo = whileDragX - diff;
                            }
                            cache.simpleStates = {
                                opening: 'left',
                                towards: cache.dragWatchers.state,
                                hyperExtending: settings.maxPosition < absoluteTranslation,
                                halfway: absoluteTranslation > (settings.maxPosition / 2),
                                flick: Math.abs(cache.dragWatchers.current - cache.dragWatchers.hold) > settings.flickThreshold,
                                translation: {
                                    absolute: absoluteTranslation,
                                    relative: whileDragX,
                                    sinceDirectionChange: (cache.dragWatchers.current - cache.dragWatchers.hold),
                                    percentage: (absoluteTranslation/settings.maxPosition)*100
                                }
                            };
                        } else {
                            // Pulling too far to the left
                            if (settings.minPosition > absoluteTranslation) {
                                diff = (absoluteTranslation - settings.minPosition) * settings.resistance;
                                translateTo = whileDragX - diff;
                            }
                            cache.simpleStates = {
                                opening: 'right',
                                towards: cache.dragWatchers.state,
                                hyperExtending: settings.minPosition > absoluteTranslation,
                                halfway: absoluteTranslation < (settings.minPosition / 2),
                                flick: Math.abs(cache.dragWatchers.current - cache.dragWatchers.hold) > settings.flickThreshold,
                                translation: {
                                    absolute: absoluteTranslation,
                                    relative: whileDragX,
                                    sinceDirectionChange: (cache.dragWatchers.current - cache.dragWatchers.hold),
                                    percentage: (absoluteTranslation/settings.minPosition)*100
                                }
                            };
                        }
                        action.translate.x(translateTo + translated);
                    }

                    // @phonon
                    if(translateTo > 5) {
                        utils.createBackdrop();
                    }

                },
                endDrag: function(e) {
                    if (cache.isDragging) {
                        utils.dispatchEvent('end');
                        var translated = action.translate.get.matrix(4);

                        // Tap Close
                        if (cache.dragWatchers.current === 0 && translated !== 0 && settings.tapToClose) {
                            utils.dispatchEvent('close');
                            utils.events.prevent(e);
                            action.translate.easeTo(0);
                            cache.isDragging = false;
                            cache.startDragX = 0;
                            return;
                        }

                        // Revealing Left
                        if (cache.simpleStates.opening === 'left') {
                            // Halfway, Flicking, or Too Far Out
                            if ((cache.simpleStates.halfway || cache.simpleStates.hyperExtending || cache.simpleStates.flick)) {
                                if (cache.simpleStates.flick && cache.simpleStates.towards === 'left') { // Flicking Closed
                                    action.translate.easeTo(0);
                                } else if (
                                    (cache.simpleStates.flick && cache.simpleStates.towards === 'right') || // Flicking Open OR
                                    (cache.simpleStates.halfway || cache.simpleStates.hyperExtending) // At least halfway open OR hyperextending
                                ) {
                                    action.translate.easeTo(settings.maxPosition); // Open Left
                                }
                            } else {
                                action.translate.easeTo(0); // Close Left
                            }

                            // Revealing Right
                        } else if (cache.simpleStates.opening === 'right') {
                            // Halfway, Flicking, or Too Far Out
                            if ((cache.simpleStates.halfway || cache.simpleStates.hyperExtending || cache.simpleStates.flick)) {
                                if (cache.simpleStates.flick && cache.simpleStates.towards === 'right') { // Flicking Closed
                                    action.translate.easeTo(0);
                                } else if (
                                    (cache.simpleStates.flick && cache.simpleStates.towards === 'left') || // Flicking Open OR
                                    (cache.simpleStates.halfway || cache.simpleStates.hyperExtending) // At least halfway open OR hyperextending
                                ) {
                                    action.translate.easeTo(settings.minPosition); // Open Right
                                }
                            } else {
                                action.translate.easeTo(0); // Close Right
                            }
                        }

                        cache.isDragging = false;
                        cache.startDragX = utils.page('X', e);
                    }
                }
            }
        },
        init = function(opts) {
            if (opts.element) {
                utils.deepExtend(settings, opts);
                cache.vendor = utils.vendor();
                action.drag.listen();
            }
        };
        /*
         * Public
         */
        this.open = function(side) {

            // @phonon
            utils.createBackdrop();

            utils.dispatchEvent('open');
            utils.klass.remove(doc.body, 'snapjs-expand-left');
            utils.klass.remove(doc.body, 'snapjs-expand-right');

            if (side === 'left') {
                cache.simpleStates.opening = 'left';
                cache.simpleStates.towards = 'right';
                utils.klass.add(doc.body, 'snapjs-left');
                utils.klass.remove(doc.body, 'snapjs-right');
                action.translate.easeTo(settings.maxPosition);
            } else if (side === 'right') {
                cache.simpleStates.opening = 'right';
                cache.simpleStates.towards = 'left';
                utils.klass.remove(doc.body, 'snapjs-left');
                utils.klass.add(doc.body, 'snapjs-right');
                action.translate.easeTo(settings.minPosition);
            }
        };
        this.close = function() {
            utils.dispatchEvent('close');
            action.translate.easeTo(0);
        };
        this.expand = function(side){
            var to = win.innerWidth || doc.documentElement.clientWidth;

            if(side==='left'){
                utils.dispatchEvent('expandLeft');
                utils.klass.add(doc.body, 'snapjs-expand-left');
                utils.klass.remove(doc.body, 'snapjs-expand-right');
            } else {
                utils.dispatchEvent('expandRight');
                utils.klass.add(doc.body, 'snapjs-expand-right');
                utils.klass.remove(doc.body, 'snapjs-expand-left');
                to *= -1;
            }
            action.translate.easeTo(to);
        };

        this.on = function(evt, fn) {
            eventList[evt] = fn;
            return this;
        };
        this.off = function(evt) {
            if (eventList[evt]) {
                eventList[evt] = false;
            }
        };

        this.enable = function() {
            utils.dispatchEvent('enable');
            action.drag.listen();
        };
        this.disable = function() {
            utils.dispatchEvent('disable');
            action.drag.stopListening();
        };

        this.settings = function(opts){
            utils.deepExtend(settings, opts);
        };

        this.state = function() {
            var state,
                fromLeft = action.translate.get.matrix(4);
            if (fromLeft === settings.maxPosition) {
                state = 'left';
            } else if (fromLeft === settings.minPosition) {
                state = 'right';
            } else {
                state = 'closed';
            }
            return {
                state: state,
                info: cache.simpleStates
            };
        };
        init(userOpts);
    };
    if ((typeof module !== 'undefined') && module.exports) {
        module.exports = Snap;
    }
    if (typeof ender === 'undefined') {
        this.Snap = Snap;
    }
    if ((typeof define === "function") && define.amd) {
        define("snap", [], function() {
            return Snap;
        });
    }


}).call(this, window, document);


/* ========================================================================
 * Phonon: side-panels.js v0.0.1
 * http://phonon.quarkdev.com
 * ========================================================================
 * Licensed under MIT (http://phonon.quarkdev.com)
 * ======================================================================== */
;(function (window, phonon) {

    'use strict';

    var isPhone = matchMedia('only screen and (min-width: 641px)').matches ? false : true;
    var sidePanels = [];
    var sidePanelActive = null;

    function findSidebar(id) {

        var i = sidePanels.length - 1;

        for (; i >= 0; i--) {
            if(sidePanels[i].el.id === id) {
                return sidePanels[i];
            }
        }
    }

    /**
     * Render the sidebar of the current page
    */
    function render(evt) {

        var currentPage = (typeof evt !== 'undefined' ? evt.detail.page : phonon.navigator().currentPage);
        var pageEl = document.querySelector(currentPage);
        var tabs = pageEl.querySelector('[data-tab-contents="true"]');

        var i = sidePanels.length - 1;

        for (; i >= 0; i--) {

            var sb = sidePanels[i];

            var page = sb.el.getAttribute('data-page');
            var exposeAside = sb.el.getAttribute('data-expose-aside');

            if(page !== currentPage) {

                sb.el.style.display = 'none';
                sb.el.style.visibility = 'hidden';

            } else {

                sb.el.style.display = 'block';
                sb.el.style.visibility = 'visible';

                // If tabs are present, disable drag, then setup
                if(tabs) {
                    sidePanels[i].snapper.disable();
                }

                // Expose side bar
                if(exposeAside === 'left' || exposeAside === 'right') {
                    if(!pageEl.classList.contains('expose-aside-' + exposeAside)) {
                        pageEl.classList.add('expose-aside-' + exposeAside);
                    }
                }

                // On tablet, the sidebar is draggable only if it is not exposed on a side
                if(!isPhone) {
                    if(!tabs && exposeAside !== 'left' && exposeAside !== 'right') {
                        sb.snapper.settings( {touchToDrag: true} );
                        sb.snapper.enable();
                    } else {
                        sb.snapper.settings( {touchToDrag: false} );
                        sb.snapper.disable();
                    }
                }

                // On phone, the sidebar is draggable only if tabs are not present
                if(!tabs && isPhone) {
                    sb.snapper.settings( {touchToDrag: true} );
                    sb.snapper.enable();
                }
            }
        }
    }

    /**
     * When the window is resized, update the width of sidebars
    */
    function resize() {

        var oldValue = isPhone;
        isPhone = matchMedia('only screen and (min-width: 641px)').matches ? false : true;

        if(oldValue !== isPhone) {

            // Update the min/max position for drag
            window.setTimeout(function() {

                var i = sidePanels.length - 1;
                for (; i >= 0; i--) {

                    var sb = sidePanels[i];
                    sb.snapper.settings({
                        maxPosition: sb.el.clientWidth,
                        minPosition: -(sb.el.clientWidth)
                    });
                }

            }, 500);

            // finaly update settings
            render();
        }
    }

    phonon.onReady(function() {

        var spEls = document.querySelectorAll('.side-panel');
        var i = spEls.length - 1;

        for (; i >= 0; i--) {

            var el = spEls[i];
            var disable = el.getAttribute('data-disable');
            var page = el.getAttribute('data-page');
            var pageEl = document.querySelector(page);

            // Options
            var options = {
                element: pageEl,
                disable: (disable === null ? 'none' : disable),
                hyperextensible: false,
                touchToDrag: false,
                maxPosition: el.clientWidth,
                minPosition: -(el.clientWidth)
            };

            var snapper = new Snap(options);
            sidePanels.push({snapper: snapper, el: el, direction: (el.classList.contains('side-panel-left') ? 'left' : 'right')});
        }
    });

    function open(sb) {
        sidePanelActive = sb;
        sb.snapper.open(sb.direction);
        document.on(phonon.event.end, onBackdrop);
    }

    function close(sb) {
        sb.snapper.close();
        sidePanelActive = null;
        document.off(phonon.event.end, onBackdrop);
    }

    function onSidebar(target) {
        var isSidebar = false;
        for (; target && target !== document; target = target.parentNode) {
            if (target.classList.contains('side-panel')) {
                isSidebar = true;
                break;
            }
        }
        return isSidebar;
    }

    document.on(phonon.event.tap, function(evt) {

        var target = evt.target;
        var sidebarId = target.getAttribute('data-side-panel-id');
        var sidebarClose = target.getAttribute('data-side-panel-close');

        if(sidebarClose === 'true') {
            if(sidePanelActive) close(sidePanelActive);
            return;
        }

        if(sidebarId !== null) {

            var sb = findSidebar(sidebarId);

            if(sb) {

                var data = sb.snapper.state();

                // /!\ if not exposed
                var exposeAside = sb.el.getAttribute('data-expose-aside');

                // Toggle
                if(data.state === 'closed') {
                    if(exposeAside !== 'left' && exposeAside !== 'right' || isPhone) open(sb);
                } else {
                    if(exposeAside !== 'left' && exposeAside !== 'right' || isPhone) close(sb);
                }
            }
        }
    });

    var onBackdrop = function(evt) {

        var target = evt.target;
        var onSidebar = false;

        if(sidePanelActive === null) return;

        for (; target && target !== document; target = target.parentNode) {
            if (target.classList.contains('side-panel')) {
                onSidebar = true;
                break;
            }
        }

        if(sidePanelActive && !onSidebar) {
            close(sidePanelActive);
            sidePanelActive = null;
        }
    };

    phonon.sidePanel = function() {

        return {
            closeActive: function() {

                var currentPage = phonon.navigator().currentPage;
                var i = sidePanels.length - 1;

                for (; i >= 0; i--) {

                    var sb = sidePanels[i];
                    var page = sb.el.getAttribute('data-page');
                    var exposeAside = sb.el.getAttribute('data-expose-aside');

                    if(page === currentPage) {

                        var data = sb.snapper.state();

                        if(data.state !== 'closed') {
                            if(isPhone) {
                                close(sb);
                                return true;
                            }
                            if(!isPhone && exposeAside !== 'left' && exposeAside !== 'right') {
                                close(sb);
                                return true;
                            }
                        }

                        return false;
                    }
                }
                return false;
            }
        };
    }

    window.on('resize', resize);
    document.on('pageopened', render);

}(typeof window !== 'undefined' ? window : this, window.phonon || {}));

/*!
 * ---------------------------- DRAGEND JS -------------------------------------
 *
 * Version: 0.2.0
 * https://github.com/Stereobit/dragend
 * Copyright (c) 2014 Tobias Otte, t@stereob.it
 *
 * Licensed under MIT-style license:
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

 ;(function( window ) {
  "use strict";

  // help the minifier
  var doc = document,
      win = window;

  function init( $ ) {

    // Welcome To dragend JS
    // =====================
    //
    // dragend.js is a touch ready, full responsive, content swipe script. It has no dependencies
    // It also can, but don't has to, used as a jQuery
    // (https://github.com/jquery/jquery/) plugin.
    //
    // The current version is 0.2.0
    //
    // Usage
    // =====================
    //
    // To activate dragend JS just call the function on a jQuery element
    //
    // $("#swipe-container").dragend();
    //
    // You could rather pass in a options object or a string to bump on of the
    // following behaviors: "up", "down", "left", "right" for swiping in one of
    // these directions, "page" with the page number as second argument to go to a
    // explicit page and without any value to go to the first page
    //
    // Settings
    // =====================
    //
    // You can use the following options:
    //
    // * pageClass: classname selector for all elments that should provide a page
    // * direction: "horizontal" or "vertical"
    // * minDragDistance: minuimum distance (in pixel) the user has to drag
    //   to trigger swip
    // * scribe: pixel value for a possible scribe
    // * onSwipeStart: callback function before the animation
    // * onSwipeEnd: callback function after the animation
    // * onDragStart: called on drag start
    // * onDrag: callback on drag
    // * onDragEnd: callback on dragend
    // * borderBetweenPages: if you need space between pages add a pixel value
    // * duration
    // * stopPropagation
    // * afterInitialize called after the pages are size
    // * preventDrag if want to prevent user interactions and only swipe manualy

    var

      // Default setting
      defaultSettings = {
        pageClass          : "dragend-page",
        direction          : "horizontal",
        minDragDistance    : "40",
        onSwipeStart       : noop,
        onSwipeEnd         : noop,
        onDragStart        : noop,
        onDrag             : noop,
        onDragEnd          : noop,
        afterInitialize    : noop,
        keyboardNavigation : false,
        stopPropagation    : false,
        itemsInPage        : 1,
        scribe             : 0,
        borderBetweenPages : 0,
        duration           : 300,
        preventDrag        : false
      },

      isTouch = 'ontouchstart' in win,

      startEvent = isTouch ? 'touchstart' : 'mousedown',
      moveEvent = isTouch ? 'touchmove' : 'mousemove',
      endEvent = isTouch ? 'touchend' : 'mouseup',

      keycodes = {
        37: "left",
        38: "up",
        39: "right",
        40: "down"
      },

      errors = {
        pages: "No pages found"
      },

      containerStyles = {
        overflow: "hidden",
        padding : 0
      },

      supports = (function() {
         var div = doc.createElement('div'),
             vendors = 'Khtml Ms O Moz Webkit'.split(' '),
             len = vendors.length;

         return function( prop ) {
            if ( prop in div.style ) return true;

            prop = prop.replace(/^[a-z]/, function(val) {
               return val.toUpperCase();
            });

            while( len-- ) {
               if ( vendors[len] + prop in div.style ) {
                  return true;
               }
            }
            return false;
         };
      })(),

      supportTransform = supports('transform');

    function noop() {}

    function falseFn() {
      return false;
    }

    function setStyles( element, styles ) {

      var property,
          value;

      for ( property in styles ) {

        if ( styles.hasOwnProperty(property) ) {
          value = styles[property];

          switch ( property ) {
            case "height":
            case "width":
            case "marginLeft":
            case "marginTop":
              value += "px";
          }

          element.style[property] = value;

        }

      }

      return element;

    }

    function extend( destination, source ) {

      var property;

      for ( property in source ) {
        destination[property] = source[property];
      }

      return destination;

    }

    function proxy( fn, context ) {

      return function() {
        return fn.apply( context, Array.prototype.slice.call(arguments) );
      };

    }

    function getElementsByClassName( className, root ) {
      var elements;

      if ( $ ) {
        elements = $(root).find("." + className);
      } else {
        elements = Array.prototype.slice.call(root.getElementsByClassName( className ));
      }

      return elements;
    }

    function animate( element, propery, to, speed, callback ) {
      var propertyObj = {};

      propertyObj[propery] = to;

      if ($) {
        $(element).animate(propertyObj, speed, callback);
      } else {
        setStyles(element, propertyObj);
      }

    }

    /**
     * Returns an object containing the co-ordinates for the event, normalising for touch / non-touch.
     * @param {Object} event
     * @returns {Object}
     */
    function getCoords(event) {
      // touch move and touch end have different touch data
      var touches = event.touches,
          data = touches && touches.length ? touches : event.changedTouches;

      return {
        x: isTouch ? data[0].pageX : event.pageX,
        y: isTouch ? data[0].pageY : event.pageY
      };
    }

    function Dragend( container, settings ) {
      var defaultSettingsCopy = extend( {}, defaultSettings );

      this.settings      = extend( defaultSettingsCopy, settings );
      this.container     = container;
      this.pageContainer = doc.createElement( "div" );
      this.scrollBorder  = { x: 0, y: 0 };
      this.page          = 0;
      this.preventScroll = false;
      this.pageCssProperties = {
        margin: 0
      };

      // bind events
      this._onStart = proxy( this._onStart, this );
      this._onMove = proxy( this._onMove, this );
      this._onEnd = proxy( this._onEnd, this );
      this._onKeydown = proxy( this._onKeydown, this );
      this._sizePages = proxy( this._sizePages, this );
      this._afterScrollTransform = proxy(this._afterScrollTransform, this);

      while (container.firstChild)
        this.pageContainer.appendChild(container.firstChild);

      container.appendChild(this.pageContainer);

      this._scroll = supportTransform ? this._scrollWithTransform : this._scrollWithoutTransform;
      this._animateScroll = supportTransform ? this._animateScrollWithTransform : this._animateScrollWithoutTransform;

      // Initialization

      setStyles(container, containerStyles);

      // Give the DOM some time to update ...
      setTimeout( proxy(function() {
          this.updateInstance( settings );
          if (!this.settings.preventDrag) {
            this._observe();
          }
          this.settings.afterInitialize.call(this);
      }, this), 10 );

    }

    function addEventListener(container, event, callback) {
      if ($) {
        $(container).on(event, callback);
      } else {
        container.addEventListener(event, callback, false);
      }
    }

    function removeEventListener(container, event, callback) {
      if ($) {
        $(container).off(event, callback);
      } else {
        container.removeEventListener(event, callback, false);
      }
    }

    function has3d() {
        if (!window.getComputedStyle) {
            return false;
        }

        var el = document.createElement('p'),
            has3d,
            transforms = {
                'webkitTransform':'-webkit-transform',
                'OTransform':'-o-transform',
                'msTransform':'-ms-transform',
                'MozTransform':'-moz-transform',
                'transform':'transform'
            };

        // Add it to the body to get the computed style.
        document.body.insertBefore(el, null);

        for (var t in transforms) {
            if (el.style[t] !== undefined) {
                el.style[t] = "translate3d(1px,1px,1px)";
                has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
            }
        }

        document.body.removeChild(el);

        return (has3d !== undefined && has3d.length > 0 && has3d !== "none");
    }

    extend(Dragend.prototype, {

      // Private functions
      // =================

      // ### Overscroll lookup table
      //
      // Checks if its the last or first page to slow down the scrolling if so
      //
      // Takes:
      // Drag event

      _checkOverscroll: function( direction, x, y ) {
        var coordinates = {
          x: x,
          y: y,
          overscroll: true
        };

        switch ( direction ) {

          case "right":
            if ( !this.scrollBorder.x ) {
              coordinates.x = Math.round((x - this.scrollBorder.x) / 5 );
              return coordinates;
            }
            break;

          case "left":
            if ( (this.pagesCount - 1) * this.pageDimentions.width <= this.scrollBorder.x ) {
              coordinates.x = Math.round( - ((Math.ceil(this.pagesCount) - 1) * (this.pageDimentions.width + this.settings.borderBetweenPages)) + x / 5 );
              return coordinates;
            }
            break;

          case "down":
            if ( !this.scrollBorder.y ) {
              coordinates.y = Math.round( (y - this.scrollBorder.y) / 5 );
              return coordinates;
            }
            break;

          case "up":
            if ( (this.pagesCount - 1) * this.pageDimentions.height <= this.scrollBorder.y ) {
              coordinates.y = Math.round( - ((Math.ceil(this.pagesCount) - 1) * (this.pageDimentions.height + this.settings.borderBetweenPages)) + y / 5 );
              return coordinates;
            }
            break;
        }

        return {
          x: x - this.scrollBorder.x,
          y: y - this.scrollBorder.y,
          overscroll: false
        };
      },

      // @phonon
      _xDown: 0,
      _yDown: 0,

      // Observe
      //
      // Sets the observers for drag, resize and key events

      _observe: function() {

        addEventListener(this.container, startEvent, this._onStart);
        this.container.onselectstart = falseFn;
        this.container.ondragstart = falseFn;

        if ( this.settings.keyboardNavigation ) {
          addEventListener(doc.body, "keydown", this._onKeydown);
        }

        addEventListener(win, "resize", this._sizePages);

      },


      _onStart: function(event) {

        event = event.originalEvent || event;

        if (this.settings.stopPropagation) {
          event.stopPropagation();
        }

        // @phonon
        this._xDown = (event.touches ? event.touches[0].clientX : event.clientX);
        this._yDown = (event.touches ? event.touches[0].clientY : event.clientY);

        addEventListener(doc.body, moveEvent, this._onMove);
        addEventListener(doc.body, endEvent, this._onEnd);

        this.startCoords = getCoords(event);

        this.settings.onDragStart.call( this, event );

      },

      _onMove: function( event ) {

        event = event.originalEvent || event;

        // ensure swiping with one touch and not pinching
        if ( event.touches && event.touches.length > 1 || event.scale && event.scale !== 1) return;

        // @phonon ensure vertical scrolling works
        var xUp = (event.touches ? event.touches[0].clientX : event.clientX);
        var yUp = (event.touches ? event.touches[0].clientY : event.clientY);

        var xDiff = this._xDown - xUp;
        var yDiff = this._yDown - yUp;

        // @phonon: prevent default only if it is a horizontal swipe fix #43
        if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
          event.preventDefault();
          if (this.settings.stopPropagation) {
            event.stopPropagation();
          }
        }

        var parsedEvent = this._parseEvent(event),
            coordinates = this._checkOverscroll( parsedEvent.direction , - parsedEvent.distanceX, - parsedEvent.distanceY );

        // @phonon => disable extensible tab content
        if(this.page === 0 && parsedEvent.direction === 'right') {
          return;
        }

        if((this.page + 1) === this.pagesCount && parsedEvent.direction === 'left') {
          return;
        }

        this.settings.onDrag.call( this, this.activeElement, parsedEvent, coordinates.overscroll, event );

        if ( !this.preventScroll ) {
          this._scroll( coordinates );
        }
      },

      _onEnd: function( event ) {

        event = event.originalEvent || event;

        if (this.settings.stopPropagation) {
          event.stopPropagation();
        }

        var parsedEvent = this._parseEvent(event);

        this.startCoords = { x: 0, y: 0 };

        if ( Math.abs(parsedEvent.distanceX) > this.settings.minDragDistance || Math.abs(parsedEvent.distanceY) > this.settings.minDragDistance) {
          this.swipe( parsedEvent.direction );
        } else if (parsedEvent.distanceX > 0 || parsedEvent.distanceX > 0) {
          this._scrollToPage();
        }

        this.settings.onDragEnd.call( this, this.container, this.activeElement, this.page, event );

        removeEventListener(doc.body, moveEvent, this._onMove);
        removeEventListener(doc.body, endEvent, this._onEnd);

      },

      _parseEvent: function( event ) {
        var coords = getCoords(event),
            x = this.startCoords.x - coords.x,
            y = this.startCoords.y - coords.y;

        return this._addDistanceValues( x, y );
      },

      _addDistanceValues: function( x, y ) {
        var eventData = {
          distanceX: 0,
          distanceY: 0
        };

        if ( this.settings.direction === "horizontal" ) {
          eventData.distanceX = x;
          eventData.direction = x > 0 ? "left" : "right";
        } else {
          eventData.distanceY = y;
          eventData.direction = y > 0 ? "up" : "down";
        }

        return eventData;
      },

      _onKeydown: function( event ) {
        var direction = keycodes[event.keyCode];

        if ( direction ) {
          this._scrollToPage(direction);
        }
      },

      _setHorizontalContainerCssValues: function() {
        extend( this.pageCssProperties, {
          "cssFloat" : "left",
          "overflowY": "auto",
          "overflowX": "hidden",
          "padding"  : 0,
          "display"  : "block"
        });

        setStyles(this.pageContainer, {
          "overflow"                   : "hidden",
          "width"                      : (this.pageDimentions.width + this.settings.borderBetweenPages) * this.pagesCount,
          "boxSizing"                  : "content-box",
          "-webkit-backface-visibility": "hidden",
          "-webkit-perspective"        : 1000,
          "margin"                     : 0,
          "padding"                    : 0
        });
      },

      _setVerticalContainerCssValues: function() {
        extend( this.pageCssProperties, {
          "overflow": "hidden",
          "padding" : 0,
          "display" : "block"
        });

        setStyles(this.pageContainer, {
          "padding-bottom"              : this.settings.scribe,
          "boxSizing"                   : "content-box",
          "-webkit-backface-visibility" : "hidden",
          "-webkit-perspective"         : 1000,
          "margin"                      : 0
        });
      },

      setContainerCssValues: function(){
        if ( this.settings.direction === "horizontal") {
            this._setHorizontalContainerCssValues();
        } else {
            this._setVerticalContainerCssValues();
        }
      },

      // ### Calculate page dimentions
      //
      // Updates the page dimentions values

      _setPageDimentions: function() {
        var width  = this.container.offsetWidth,
            height = this.container.offsetHeight;

        if ( this.settings.direction === "horizontal" ) {
          width = width - parseInt( this.settings.scribe, 10 );
        } else {
          height = height - parseInt( this.settings.scribe, 10 );
        }

        this.pageDimentions = {
          width : width,
          height: height
        };

      },

      // ### Size pages

      _sizePages: function() {

        var pagesCount = this.pages.length;

        this._setPageDimentions();

        this.setContainerCssValues();

        if ( this.settings.direction === "horizontal" ) {
          extend( this.pageCssProperties, {
            height: this.pageDimentions.height,
            width : this.pageDimentions.width / this.settings.itemsInPage
          });
        } else {
          extend( this.pageCssProperties, {
            height: this.pageDimentions.height / this.settings.itemsInPage,
            width : this.pageDimentions.width
          });
        }

        for (var i = 0; i < pagesCount; i++) {
          setStyles(this.pages[i], this.pageCssProperties);
        }

        this._jumpToPage( "page", this.page );

      },

      // ### Callculate new page
      //
      // Update global values for specific swipe action
      //
      // Takes direction and, if specific page is used the pagenumber

      _calcNewPage: function( direction, pageNumber ) {

        var borderBetweenPages = this.settings.borderBetweenPages,
            height = this.pageDimentions.height,
            width = this.pageDimentions.width,
            page = this.page;

        switch ( direction ) {
          case "up":
            if ( page < this.pagesCount - 1 ) {
              this.scrollBorder.y = this.scrollBorder.y + height + borderBetweenPages;
              this.page++;
            }
            break;

          case "down":
            if ( page > 0 ) {
              this.scrollBorder.y = this.scrollBorder.y - height - borderBetweenPages;
              this.page--;
            }
            break;

          case "left":
            if ( page < this.pagesCount - 1 ) {
              this.scrollBorder.x = this.scrollBorder.x + width + borderBetweenPages;
              this.page++;
            }
            break;

          case "right":
            if ( page > 0 ) {
              this.scrollBorder.x = this.scrollBorder.x - width - borderBetweenPages;
              this.page--;
            }
            break;

          case "page":
            switch ( this.settings.direction ) {
              case "horizontal":
                this.scrollBorder.x = (width + borderBetweenPages) * pageNumber;
                break;

              case "vertical":
                this.scrollBorder.y = (height + borderBetweenPages) * pageNumber;
                break;
            }
            this.page = pageNumber;
            break;

          default:
            this.scrollBorder.y = 0;
            this.scrollBorder.x = 0;
            this.page           = 0;
            break;
        }
      },

      // ### On swipe end
      //
      // Function called after the scroll animation ended

      _onSwipeEnd: function() {
        this.preventScroll = false;

        this.activeElement = this.pages[this.page * this.settings.itemsInPage];

        // Call onSwipeEnd callback function
        this.settings.onSwipeEnd.call( this, this.container, this.activeElement, this.page);
      },

      // Jump to page
      //
      // Jumps without a animantion to specific page. The page number is only
      // necessary for the specific page direction
      //
      // Takes:
      // Direction and pagenumber

      _jumpToPage: function( options, pageNumber ) {

        if ( options ) {
          this._calcNewPage( options, pageNumber );
        }

        this._scroll({
          x: - this.scrollBorder.x,
          y: - this.scrollBorder.y
        });
      },

      // Scroll to page
      //
      // Scrolls with a animantion to specific page. The page number is only necessary
      // for the specific page direction
      //
      // Takes:
      // Direction and pagenumber

      _scrollToPage: function( options, pageNumber ) {
        this.preventScroll = true;

        if ( options ) this._calcNewPage( options, pageNumber );

        this._animateScroll();
      },

      // ### Scroll translate
      //
      // Animation when translate is supported
      //
      // Takes:
      // x and y values to go with

      _scrollWithTransform: function ( coordinates ) {

        var style;

        if (has3d()) {
          style = this.settings.direction === "horizontal" ?
              "translate3d(" + coordinates.x + "px, 0, 0)" :
              "translate3d(0, " + coordinates.y + "px, 0)";

        } else {
          style = this.settings.direction === "horizontal" ?
              "translateX(" + coordinates.x + "px)" :
              "translateY(" + coordinates.y + "px)";
        }

        setStyles( this.pageContainer, {
          "-webkit-transform": style,
          "-moz-transform": style,
          "-ms-transform": style,
          "-o-transform": style,
          "transform": style
        });

      },

      // ### Animated scroll with translate support

      _animateScrollWithTransform: function() {

        var style = "transform " + this.settings.duration + "ms ease-out",
            container = this.container,
            afterScrollTransform = this._afterScrollTransform;

        setStyles( this.pageContainer, {
          "-webkit-transition": "-webkit-" + style,
          "-moz-transition": "-moz-" + style,
          "-ms-transition": "-ms-" + style,
          "-o-transition": "-o-" + style,
          "transition": style
        });

        this._scroll({
          x: - this.scrollBorder.x,
          y: - this.scrollBorder.y
        });

        addEventListener(this.container, "webkitTransitionEnd", afterScrollTransform);
        addEventListener(this.container, "oTransitionEnd", afterScrollTransform);
        addEventListener(this.container, "transitionend", afterScrollTransform);
        addEventListener(this.container, "transitionEnd", afterScrollTransform);

      },

      _afterScrollTransform: function() {

        var container = this.container,
            afterScrollTransform = this._afterScrollTransform;

        this._onSwipeEnd();

        removeEventListener(container, "webkitTransitionEnd", afterScrollTransform);
        removeEventListener(container, "oTransitionEnd", afterScrollTransform);
        removeEventListener(container, "transitionend", afterScrollTransform);
        removeEventListener(container, "transitionEnd", afterScrollTransform);

        setStyles( this.pageContainer, {
          "-webkit-transition": "",
          "-moz-transition": "",
          "-ms-transition": "",
          "-o-transition": "",
          "transition": ""
        });

      },

      // ### Scroll fallback
      //
      // Animation lookup table  when translate isn't supported
      //
      // Takes:
      // x and y values to go with

      _scrollWithoutTransform: function( coordinates ) {
        var styles = this.settings.direction === "horizontal" ? { "marginLeft": coordinates.x } : { "marginTop": coordinates.y };

        setStyles(this.pageContainer, styles);
      },

      // ### Animated scroll without translate support

      _animateScrollWithoutTransform: function() {
        var property = this.settings.direction === "horizontal" ? "marginLeft" : "marginTop",
            value = this.settings.direction === "horizontal" ? - this.scrollBorder.x : - this.scrollBorder.y;

        animate( this.pageContainer, property, value, this.settings.duration, proxy( this._onSwipeEnd, this ));

      },

      // Public functions
      // ================

      swipe: function( direction ) {
        // Call onSwipeStart callback function
        this.settings.onSwipeStart.call( this, this.container, this.activeElement, this.page );
        this._scrollToPage( direction );
      },

      updateInstance: function( settings ) {

        settings = settings || {};

        if ( typeof settings === "object" ) extend( this.settings, settings );

        this.pages = getElementsByClassName(this.settings.pageClass, this.pageContainer);

        if (this.pages.length) {
          this.pagesCount = this.pages.length / this.settings.itemsInPage;
        } else {
          throw new Error(errors.pages);
        }

        this.activeElement = this.pages[this.page * this.settings.itemsInPage];
        this._sizePages();

        if ( this.settings.jumpToPage ) {
          this.jumpToPage( settings.jumpToPage );
          delete this.settings.jumpToPage;
        }

        if ( this.settings.scrollToPage ) {
          this.scrollToPage( this.settings.scrollToPage );
          delete this.settings.scrollToPage;
        }

        if (this.settings.destroy) {
          this.destroy();
          delete this.settings.destroy;
        }

      },

      destroy: function() {

        var container = this.container;

        removeEventListener(container, startEvent);
        removeEventListener(container, moveEvent);
        removeEventListener(container, endEvent);
        removeEventListener(doc.body, "keydown", this._onKeydown);
        removeEventListener(win, "resize", this._sizePages);

        container.removeAttribute("style");

        for (var i = 0; i < this.pages.length; i++) {
          this.pages[i].removeAttribute("style");
        }

        container.innerHTML = this.pageContainer.innerHTML;

      },

      scrollToPage: function( page ) {
        this._scrollToPage( "page", page - 1);
      },

      jumpToPage: function( page ) {
        this._jumpToPage( "page", page - 1);
      }
    });

    if ( $ ) {

        // Register jQuery plugin
        $.fn.dragend = function( settings ) {

          settings = settings || {};

          this.each(function() {
            var instance = $(this).data( "dragend" );

            // check if instance already created
            if ( instance ) {
              instance.updateInstance( settings );
            } else {
              instance = new Dragend( this, settings );
              $(this).data( "dragend", instance );
            }

            // check if should trigger swipe
            if ( typeof settings === "string" ) instance.swipe( settings );

          });

          // jQuery functions should always return the instance
          return this;
        };

    }

    return Dragend;

  }

  if ( typeof define == 'function' && typeof define.amd == 'object' && define.amd ) {
      define(function() {
        return init( win.jQuery || win.Zepto );
      });
  } else {
      win.Dragend = init( win.jQuery || win.Zepto );
  }

})( window );



/* ========================================================================
 * Phonon: tabs.js v0.1.0
 * http://phonon.quarkdev.com
 * ========================================================================
 * Licensed under MIT (http://phonon.quarkdev.com)
 * ======================================================================== */
;(function (window, phonon) {

	'use strict';

	var tabs = [];

	/**
	 * When the page is mounted
	 * setup tabs if they are present
	 */
	function checkForTabs(evt) {

	    var currentPage = evt.detail.page;
	    var pageEl = document.querySelector(currentPage);
	    var tabsEl = pageEl.querySelector('[data-tab-contents="true"]');

	    if(tabsEl) {
	        setupTabs(currentPage, pageEl, tabsEl);
	    }
	}

	/**
	 * Updates the tab indicator
	 */
	function updateIndicator(pageName, tabNumber) {

	    var i = tabs.length - 1;
	    for (; i >= 0; i--) {
	        if(tabs[i].page === pageName) {

            if(tabs[i].currentTab !== tabNumber) {
                tabs[i].currentTab = tabNumber;

                // event
                phonon.navigator().callCallback('tabchanged', {page: pageName, tabNumber: tabNumber});
            }

            var tabIndicator = document.querySelector(pageName).querySelector('.tab-indicator');

            if(tabIndicator) {
              var zeroTabNumber = tabNumber - 1;

              // indicator
              tabIndicator.style.webkitTransform = 'translateX('+zeroTabNumber+'00%)';
              tabIndicator.style.MozTransform = 'translateX('+zeroTabNumber+'00%)';
              tabIndicator.style.msTransform = 'translateX('+zeroTabNumber+'00%)';
              tabIndicator.style.OTransform = 'translateX('+zeroTabNumber+'00%)';
              tabIndicator.style.transform = 'translateX('+zeroTabNumber+'00%)';
            }

        	  // update tab content
            tabs[i].dragend.scrollToPage(tabNumber);

	        	break;
	        }
	    }
	}

	/**
	 * Setup tabs for a given page
	 * @param {String} pageName
	 * @param {DOMElement} pageEl
	 * @param {DOMElement} tabsEl
	 */
	function setupTabs(pageName, pageEl, tabsEl) {

	    var tabItems = pageEl.querySelectorAll('.tab-items a');
	    var tabIndicator = pageEl.querySelector('.tab-indicator');
	    var preventDrag = (tabsEl.getAttribute('data-disable-swipe') === 'true' ? true : false);

      var currentTab = parseInt(tabsEl.getAttribute('data-tab-default'));
      if(isNaN(currentTab) || currentTab > tabItems.length) {
        currentTab = 1;
      }

	    tabIndicator.style.width = (100/tabItems.length) + '%';

	    var options = {
	        direction: 'horizontal',
	        preventDrag: preventDrag,
	        duration: 200,
	        pageClass: 'tab-content',
	        onDragEnd: function(el, parsedEvent, tabNumber) {

	            // Real page number starting at 1
	            tabNumber = tabNumber + 1;

	            updateIndicator(pageName, tabNumber);
	        }
	    };

	    tabs.push( {page: pageName, dragend: new Dragend(tabsEl, options), currentTab: currentTab} );

      // Dragend gives "10ms" for the DOM update
      window.setTimeout(function() {
        updateIndicator(pageName, currentTab);
      }, 10);
	}

	/**
	 * Changes the tab indicator
	 * @param {String} pageName
	 * @param {Number} tabNumber
	 */
	var setCurrentTab = function(pageName, tabNumber) {
		if(typeof pageName !== 'string') {
			throw new Error('The first argument must be a string, ' + typeof tabNumber + ' given');
		}
		if(typeof tabNumber !== 'number') {
			throw new Error('The second argument must be a number, ' + typeof tabNumber + ' given');
		}

		updateIndicator(pageName, tabNumber);
	};

	/**
	 * For every mounted page, initizalize tabs
	 */
	document.on('pagecreated', checkForTabs);

	phonon.tab = function() {
		return {
			setCurrentTab: setCurrentTab
		};
	};

  /**
   * On Tab Listener
   * @param {Event} evt
   */
	function onTab(evt) {

		var target = evt.target;
		var onTabItem = null;

	    for (; target && target !== document; target = target.parentNode) {
	        if (target.classList.contains('tab-item')) {
	            onTabItem = target;
	            break;
	        }
	    }

		if(onTabItem) {

			var tabContainer = onTabItem.parentNode.parentNode;
			var tabItems = tabContainer.querySelectorAll('.tab-items a');
			var tabBar = tabContainer.querySelector('.tab-indicator');

			var position = 0;
			var l = tabItems.length;

			for (; position < l; position++) {
				if(onTabItem === tabItems[position]) break;
			}

			var progress = position + '00';

			tabBar.style.webkitTransform = 'translateX('+progress+'%)';
			tabBar.style.MozTransform = 'translateX('+progress+'%)';
			tabBar.style.msTransform = 'translateX('+progress+'%)';
			tabBar.style.OTransform = 'translateX('+progress+'%)';
			tabBar.style.transform = 'translateX('+progress+'%)';

			// Update content
			var currentPage = phonon.navigator().currentPage;
			setCurrentTab(currentPage, (position+1));
		}
	}

	document.on('tap', onTab);

}(typeof window !== 'undefined' ? window : this, window.phonon || {}));
