/*!
 * github-buttons v2.18.1
 * (c) 2021 なつき
 * @license BSD-2-Clause
 */
(function () {
  'use strict';

  var document = window.document;

  var location = document.location;

  var Math = window.Math;

  var HTMLElement = window.HTMLElement;

  var XMLHttpRequest = window.XMLHttpRequest;

  var name = "github-buttons";
  var version = "2.18.1";

  var buttonClass = 'github-button';

  var iframeURL = 'https://' + (/* istanbul ignore next */ 'unpkg.com/' + name + '@' + version + '/dist' ) + '/buttons.html';

  var domain = 'github.com';

  var apiBaseURL = 'https://api.' + domain;

  var useXHR = XMLHttpRequest && 'prototype' in XMLHttpRequest && 'withCredentials' in XMLHttpRequest.prototype;

  var useShadowDOM = useXHR && HTMLElement && 'attachShadow' in HTMLElement.prototype && !('prototype' in HTMLElement.prototype.attachShadow);

  var stringify = function (obj, sep, eq, encodeURIComponent) {
    if (sep == null) {
      sep = '&';
    }
    if (eq == null) {
      eq = '=';
    }
    if (encodeURIComponent == null) {
      encodeURIComponent = window.encodeURIComponent;
    }
    var params = [];
    for (var name in obj) {
      var value = obj[name];
      if (value != null) {
        params.push(encodeURIComponent(name) + eq + encodeURIComponent(value));
      }
    }
    return params.join(sep)
  };

  var parse = function (str, sep, eq, decodeURIComponent) {
    if (sep == null) {
      sep = '&';
    }
    if (eq == null) {
      eq = '=';
    }
    if (decodeURIComponent == null) {
      decodeURIComponent = window.decodeURIComponent;
    }
    var obj = {};
    var params = str.split(sep);
    for (var i = 0, len = params.length; i < len; i++) {
      var entry = params[i];
      if (entry !== '') {
        var ref = entry.split(eq);
        obj[decodeURIComponent(ref[0])] = (ref[1] != null ? decodeURIComponent(ref.slice(1).join(eq)) : undefined);
      }
    }
    return obj
  };

  var onEvent = function (target, eventName, func) {
    /* istanbul ignore else: IE lt 9 */
    if (target.addEventListener) {
      target.addEventListener(eventName, func, false);
    } else {
      target.attachEvent('on' + eventName, func);
    }
  };

  var offEvent = function (target, eventName, func) {
    /* istanbul ignore else: IE lt 9 */
    if (target.removeEventListener) {
      target.removeEventListener(eventName, func, false);
    } else {
      target.detachEvent('on' + eventName, func);
    }
  };

  var onceEvent = function (target, eventName, func) {
    var callback = function () {
      offEvent(target, eventName, callback);
      return func.apply(this, arguments)
    };
    onEvent(target, eventName, callback);
  };

  var onceReadyStateChange = /* istanbul ignore next: IE lt 9 */ function (target, regex, func) {
    var eventName = 'readystatechange';
    var callback = function () {
      if (regex.test(target.readyState)) {
        offEvent(target, eventName, callback);
        return func.apply(this, arguments)
      }
    };
    onEvent(target, eventName, callback);
  };

  var createElementInDocument = function (document) {
    return function (tag, props, children) {
      var el = document.createElement(tag);
      if (props != null) {
        for (var prop in props) {
          var val = props[prop];
          if (val != null) {
            if (el[prop] != null) {
              el[prop] = val;
            } else {
              el.setAttribute(prop, val);
            }
          }
        }
      }
      if (children != null) {
        for (var i = 0, len = children.length; i < len; i++) {
          var child = children[i];
          el.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
        }
      }
      return el
    }
  };

  var createElement = createElementInDocument(document);

  var dispatchOnce = function (func) {
    var onceToken;
    return function () {
      if (!onceToken) {
        onceToken = 1;
        func.apply(this, arguments);
      }
    }
  };

  var hasOwnProperty = function (obj, prop) {
    return {}.hasOwnProperty.call(obj, prop)
  };

  var toLowerCase = function (obj) {
    return ('' + obj).toLowerCase()
  };

  var defer = function (func) {
    /* istanbul ignore else */
    if (document.readyState === 'complete' || /* istanbul ignore next: IE lt 11 */ (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
      setTimeout(func);
    } else {
      if (document.addEventListener) {
        var callback = dispatchOnce(func);
        onceEvent(document, 'DOMContentLoaded', callback);
        onceEvent(window, 'load', callback);
      } else {
        onceReadyStateChange(document, /m/, func);
      }
    }
  };

  var buttonsCssText = "body{margin:0}a{text-decoration:none;outline:0}.widget{display:inline-block;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif;font-size:0;line-height:0;white-space:nowrap}.btn,.social-count{position:relative;display:inline-block;display:inline-flex;height:14px;padding:2px 5px;font-size:11px;font-weight:600;line-height:14px;vertical-align:bottom;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background-repeat:repeat-x;background-position:-1px -1px;background-size:110% 110%;border:1px solid}.btn{border-radius:.25em}.btn:not(:last-child){border-radius:.25em 0 0 .25em}.social-count{border-left:0;border-radius:0 .25em .25em 0}.widget-lg .btn,.widget-lg .social-count{height:16px;padding:5px 10px;font-size:12px;line-height:16px}.octicon{display:inline-block;vertical-align:text-top;fill:currentColor;overflow:visible}";

  var light = ".btn{color:#24292e;background-color:#eff3f6;border-color:#cfd3d6;border-color:rgba(27,31,35,.15);background-image:url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg'%3e%3clinearGradient id='o' x2='0' y2='1'%3e%3cstop stop-color='%23fafbfc'/%3e%3cstop offset='90%25' stop-color='%23eff3f6'/%3e%3c/linearGradient%3e%3crect width='100%25' height='100%25' fill='url(%23o)'/%3e%3c/svg%3e\");background-image:-moz-linear-gradient(top, #fafbfc, #eff3f6 90%);background-image:linear-gradient(180deg, #fafbfc, #eff3f6 90%);filter:progid:DXImageTransform.Microsoft.Gradient(startColorstr='#FFFAFBFC', endColorstr='#FFEEF2F5')}:root .btn{filter:none}.btn:focus,.btn:hover{background-color:#e9ebef;background-position:0 -0.5em;border-color:#caccd0;border-color:rgba(27,31,35,.15);background-image:url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg'%3e%3clinearGradient id='o' x2='0' y2='1'%3e%3cstop stop-color='%23f3f4f6'/%3e%3cstop offset='90%25' stop-color='%23e9ebef'/%3e%3c/linearGradient%3e%3crect width='100%25' height='100%25' fill='url(%23o)'/%3e%3c/svg%3e\");background-image:-moz-linear-gradient(top, #f3f4f6, #e9ebef 90%);background-image:linear-gradient(180deg, #f3f4f6, #e9ebef 90%);filter:progid:DXImageTransform.Microsoft.Gradient(startColorstr='#FFF3F4F6', endColorstr='#FFE8EAEE')}:root .btn:focus,:root .btn:hover{filter:none}.btn:active{background-color:#e9ecef;border-color:#cacdd0;border-color:rgba(27,31,35,.15);box-shadow:inset 0 .15em .3em rgba(27,31,35,.15);background-image:none;filter:none}.social-count{color:#24292e;background-color:#fff;border-color:#ddddde;border-color:rgba(27,31,35,.15)}.social-count:focus,.social-count:hover{color:#0366d6}.octicon-heart{color:#ea4aaa}";

  var dark = ".btn{color:#c9d1d9;background-color:#1a1e23;border-color:#30363d;background-image:url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg'%3e%3clinearGradient id='o' x2='0' y2='1'%3e%3cstop stop-color='%2321262d'/%3e%3cstop offset='90%25' stop-color='%231a1e23'/%3e%3c/linearGradient%3e%3crect width='100%25' height='100%25' fill='url(%23o)'/%3e%3c/svg%3e\");background-image:-moz-linear-gradient(top, #21262d, #1a1e23 90%);background-image:linear-gradient(180deg, #21262d, #1a1e23 90%);filter:progid:DXImageTransform.Microsoft.Gradient(startColorstr='#FF21262D', endColorstr='#FF191D22')}:root .btn{filter:none}.btn:focus,.btn:hover{background-color:#292e33;background-position:0 -0.5em;border-color:#8b949e;background-image:url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg'%3e%3clinearGradient id='o' x2='0' y2='1'%3e%3cstop stop-color='%2330363d'/%3e%3cstop offset='90%25' stop-color='%23292e33'/%3e%3c/linearGradient%3e%3crect width='100%25' height='100%25' fill='url(%23o)'/%3e%3c/svg%3e\");background-image:-moz-linear-gradient(top, #30363d, #292e33 90%);background-image:linear-gradient(180deg, #30363d, #292e33 90%);filter:progid:DXImageTransform.Microsoft.Gradient(startColorstr='#FF30363D', endColorstr='#FF282D32')}:root .btn:focus,:root .btn:hover{filter:none}.btn:active{background-color:#161719;border-color:#8b949e;box-shadow:inset 0 .15em .3em rgba(1,4,9,.15);background-image:none;filter:none}.social-count{color:#c9d1d9;background-color:#21262d;border-color:#30363d}.social-count:focus,.social-count:hover{color:#58a6ff}.octicon-heart{color:#bf4b8a}";

  var darkDimmed = ".btn{color:#adbac7;background-color:#30363d;border-color:#444c56;background-image:url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg'%3e%3clinearGradient id='o' x2='0' y2='1'%3e%3cstop stop-color='%23373e47'/%3e%3cstop offset='90%25' stop-color='%2330363d'/%3e%3c/linearGradient%3e%3crect width='100%25' height='100%25' fill='url(%23o)'/%3e%3c/svg%3e\");background-image:-moz-linear-gradient(top, #373e47, #30363d 90%);background-image:linear-gradient(180deg, #373e47, #30363d 90%);filter:progid:DXImageTransform.Microsoft.Gradient(startColorstr='#FF373E47', endColorstr='#FF2F353C')}:root .btn{filter:none}.btn:focus,.btn:hover{background-color:#3c444d;background-position:0 -0.5em;border-color:#768390;background-image:url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg'%3e%3clinearGradient id='o' x2='0' y2='1'%3e%3cstop stop-color='%23444c56'/%3e%3cstop offset='90%25' stop-color='%233c444d'/%3e%3c/linearGradient%3e%3crect width='100%25' height='100%25' fill='url(%23o)'/%3e%3c/svg%3e\");background-image:-moz-linear-gradient(top, #444c56, #3c444d 90%);background-image:linear-gradient(180deg, #444c56, #3c444d 90%);filter:progid:DXImageTransform.Microsoft.Gradient(startColorstr='#FF444C56', endColorstr='#FF3B434C')}:root .btn:focus,:root .btn:hover{filter:none}.btn:active{background-color:#2e3031;border-color:#768390;box-shadow:inset 0 .15em .3em rgba(28,33,40,.15);background-image:none;filter:none}.social-count{color:#adbac7;background-color:#373e47;border-color:#444c56}.social-count:focus,.social-count:hover{color:#539bf5}.octicon-heart{color:#ae4c82}";

  var widgetColorSchemes = {
    light: light,
    dark: dark,
    dark_dimmed: darkDimmed
  };

  var getColorSchemeMediaQuery = function (systemColorScheme, widgetColorScheme) {
    return '@media(prefers-color-scheme:' + systemColorScheme + '){' + widgetColorSchemes[hasOwnProperty(widgetColorSchemes, widgetColorScheme) ? widgetColorScheme : systemColorScheme] + '}'
  };

  var getColorScheme = function (declarations) {
    if (declarations == null) {
      return widgetColorSchemes.light
    }

    if (hasOwnProperty(widgetColorSchemes, declarations)) {
      return widgetColorSchemes[declarations]
    }

    var colorSchemes = parse(declarations, ';', ':', function (str) {
      return str.replace(/^[ \t\n\f\r]+|[ \t\n\f\r]+$/g, '')
    });

    return widgetColorSchemes[hasOwnProperty(widgetColorSchemes, colorSchemes['no-preference']) ? colorSchemes['no-preference'] : 'light'] +
      getColorSchemeMediaQuery('light', colorSchemes.light) +
      getColorSchemeMediaQuery('dark', colorSchemes.dark)
  };

  var data = {
    "comment-discussion": {
      heights: {
        "16": {
          width: 16,
          path: "<path fill-rule=\"evenodd\" d=\"M1.5 2.75a.25.25 0 01.25-.25h8.5a.25.25 0 01.25.25v5.5a.25.25 0 01-.25.25h-3.5a.75.75 0 00-.53.22L3.5 11.44V9.25a.75.75 0 00-.75-.75h-1a.25.25 0 01-.25-.25v-5.5zM1.75 1A1.75 1.75 0 000 2.75v5.5C0 9.216.784 10 1.75 10H2v1.543a1.457 1.457 0 002.487 1.03L7.061 10h3.189A1.75 1.75 0 0012 8.25v-5.5A1.75 1.75 0 0010.25 1h-8.5zM14.5 4.75a.25.25 0 00-.25-.25h-.5a.75.75 0 110-1.5h.5c.966 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0114.25 12H14v1.543a1.457 1.457 0 01-2.487 1.03L9.22 12.28a.75.75 0 111.06-1.06l2.22 2.22v-2.19a.75.75 0 01.75-.75h1a.25.25 0 00.25-.25v-5.5z\"></path>"
        }
      }
    },
    download: {
      heights: {
        "16": {
          width: 16,
          path: "<path fill-rule=\"evenodd\" d=\"M7.47 10.78a.75.75 0 001.06 0l3.75-3.75a.75.75 0 00-1.06-1.06L8.75 8.44V1.75a.75.75 0 00-1.5 0v6.69L4.78 5.97a.75.75 0 00-1.06 1.06l3.75 3.75zM3.75 13a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5z\"></path>"
        }
      }
    },
    eye: {
      heights: {
        "16": {
          width: 16,
          path: "<path fill-rule=\"evenodd\" d=\"M1.679 7.932c.412-.621 1.242-1.75 2.366-2.717C5.175 4.242 6.527 3.5 8 3.5c1.473 0 2.824.742 3.955 1.715 1.124.967 1.954 2.096 2.366 2.717a.119.119 0 010 .136c-.412.621-1.242 1.75-2.366 2.717C10.825 11.758 9.473 12.5 8 12.5c-1.473 0-2.824-.742-3.955-1.715C2.92 9.818 2.09 8.69 1.679 8.068a.119.119 0 010-.136zM8 2c-1.981 0-3.67.992-4.933 2.078C1.797 5.169.88 6.423.43 7.1a1.619 1.619 0 000 1.798c.45.678 1.367 1.932 2.637 3.024C4.329 13.008 6.019 14 8 14c1.981 0 3.67-.992 4.933-2.078 1.27-1.091 2.187-2.345 2.637-3.023a1.619 1.619 0 000-1.798c-.45-.678-1.367-1.932-2.637-3.023C11.671 2.992 9.981 2 8 2zm0 8a2 2 0 100-4 2 2 0 000 4z\"></path>"
        }
      }
    },
    heart: {
      heights: {
        "16": {
          width: 16,
          path: "<path fill-rule=\"evenodd\" d=\"M4.25 2.5c-1.336 0-2.75 1.164-2.75 3 0 2.15 1.58 4.144 3.365 5.682A20.565 20.565 0 008 13.393a20.561 20.561 0 003.135-2.211C12.92 9.644 14.5 7.65 14.5 5.5c0-1.836-1.414-3-2.75-3-1.373 0-2.609.986-3.029 2.456a.75.75 0 01-1.442 0C6.859 3.486 5.623 2.5 4.25 2.5zM8 14.25l-.345.666-.002-.001-.006-.003-.018-.01a7.643 7.643 0 01-.31-.17 22.075 22.075 0 01-3.434-2.414C2.045 10.731 0 8.35 0 5.5 0 2.836 2.086 1 4.25 1 5.797 1 7.153 1.802 8 3.02 8.847 1.802 10.203 1 11.75 1 13.914 1 16 2.836 16 5.5c0 2.85-2.045 5.231-3.885 6.818a22.08 22.08 0 01-3.744 2.584l-.018.01-.006.003h-.002L8 14.25zm0 0l.345.666a.752.752 0 01-.69 0L8 14.25z\"></path>"
        }
      }
    },
    "issue-opened": {
      heights: {
        "16": {
          width: 16,
          path: "<path d=\"M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z\"></path><path fill-rule=\"evenodd\" d=\"M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z\"></path>"
        }
      }
    },
    "mark-github": {
      heights: {
        "16": {
          width: 16,
          path: "<path fill-rule=\"evenodd\" d=\"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z\"></path>"
        }
      }
    },
    "package": {
      heights: {
        "16": {
          width: 16,
          path: "<path fill-rule=\"evenodd\" d=\"M8.878.392a1.75 1.75 0 00-1.756 0l-5.25 3.045A1.75 1.75 0 001 4.951v6.098c0 .624.332 1.2.872 1.514l5.25 3.045a1.75 1.75 0 001.756 0l5.25-3.045c.54-.313.872-.89.872-1.514V4.951c0-.624-.332-1.2-.872-1.514L8.878.392zM7.875 1.69a.25.25 0 01.25 0l4.63 2.685L8 7.133 3.245 4.375l4.63-2.685zM2.5 5.677v5.372c0 .09.047.171.125.216l4.625 2.683V8.432L2.5 5.677zm6.25 8.271l4.625-2.683a.25.25 0 00.125-.216V5.677L8.75 8.432v5.516z\"></path>"
        }
      }
    },
    play: {
      heights: {
        "16": {
          width: 16,
          path: "<path fill-rule=\"evenodd\" d=\"M1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zM8 0a8 8 0 100 16A8 8 0 008 0zM6.379 5.227A.25.25 0 006 5.442v5.117a.25.25 0 00.379.214l4.264-2.559a.25.25 0 000-.428L6.379 5.227z\"></path>"
        }
      }
    },
    "repo-forked": {
      heights: {
        "16": {
          width: 16,
          path: "<path fill-rule=\"evenodd\" d=\"M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z\"></path>"
        }
      }
    },
    "repo-template": {
      heights: {
        "16": {
          width: 16,
          path: "<path fill-rule=\"evenodd\" d=\"M6 .75A.75.75 0 016.75 0h2.5a.75.75 0 010 1.5h-2.5A.75.75 0 016 .75zm5 0a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V1.5h-.75A.75.75 0 0111 .75zM4.992.662a.75.75 0 01-.636.848c-.436.063-.783.41-.846.846a.75.75 0 01-1.485-.212A2.501 2.501 0 014.144.025a.75.75 0 01.848.637zM2.75 4a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 012.75 4zm10.5 0a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zM2.75 8a.75.75 0 01.75.75v.268A1.72 1.72 0 013.75 9h.5a.75.75 0 010 1.5h-.5a.25.25 0 00-.25.25v.75c0 .28.114.532.3.714a.75.75 0 01-1.05 1.072A2.495 2.495 0 012 11.5V8.75A.75.75 0 012.75 8zm10.5 0a.75.75 0 01.75.75v4.5a.75.75 0 01-.75.75h-2.5a.75.75 0 010-1.5h1.75v-2h-.75a.75.75 0 010-1.5h.75v-.25a.75.75 0 01.75-.75zM6 9.75A.75.75 0 016.75 9h2.5a.75.75 0 010 1.5h-2.5A.75.75 0 016 9.75zm-1 2.5v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z\"></path>"
        }
      }
    },
    star: {
      heights: {
        "16": {
          width: 16,
          path: "<path fill-rule=\"evenodd\" d=\"M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z\"></path>"
        }
      }
    }
  };

  var octicon = function (icon, height) {
    icon = toLowerCase(icon).replace(/^octicon-/, '');
    if (!hasOwnProperty(data, icon)) {
      icon = 'mark-github';
    }

    var defaultHeight = height >= 24 && /* istanbul ignore next */ 24 in data[icon].heights ? /* istanbul ignore next */ 24 : 16;

    var svg = data[icon].heights[defaultHeight];

    return '<svg viewBox="0 0 ' + svg.width + ' ' + defaultHeight + '" width="' + (height * svg.width / defaultHeight) + '" height="' + height + '" class="octicon octicon-' + icon + '" aria-hidden="true">' + svg.path + '</svg>'
  };

  var queues = {};

  var fetch = function (url, func) {
    var queue = queues[url] || (queues[url] = []);
    if (queue.push(func) > 1) {
      return
    }

    var callback = dispatchOnce(function () {
      delete queues[url];
      while ((func = queue.shift())) {
        func.apply(null, arguments);
      }
    });

    if (useXHR) {
      var xhr = new XMLHttpRequest();
      onEvent(xhr, 'abort', callback);
      onEvent(xhr, 'error', callback);
      onEvent(xhr, 'load', function () {
        var data;
        try {
          data = JSON.parse(this.responseText);
        } catch (error) {
          callback(error);
          return
        }
        callback(this.status !== 200, data);
      });
      xhr.open('GET', url);
      xhr.send();
    } else {
      var contentWindow = this || window;
      contentWindow._ = function (json) {
        contentWindow._ = null;
        callback(json.meta.status !== 200, json.data);
      };
      var script = createElementInDocument(contentWindow.document)('script', {
        async: true,
        src: url + (url.indexOf('?') !== -1 ? '&' : '?') + 'callback=_'
      });
      var onloadend = /* istanbul ignore next: IE lt 9 */ function () {
        if (contentWindow._) {
          contentWindow._({
            meta: {}
          });
        }
      };
      onEvent(script, 'load', onloadend);
      onEvent(script, 'error', onloadend);
      /* istanbul ignore if: IE lt 9 */
      if (script.readyState) {
        onceReadyStateChange(script, /de|m/, onloadend);
      }
      contentWindow.document.getElementsByTagName('head')[0].appendChild(script);
    }
  };

  var render$1 = function (root, options, func) {
    var createElement = createElementInDocument(root.ownerDocument);

    var style = root.appendChild(createElement('style', {
      type: 'text/css'
    }));

    var cssText = buttonsCssText + getColorScheme(options['data-color-scheme']);

    /* istanbul ignore if: IE lt 9 */
    if (style.styleSheet) {
      style.styleSheet.cssText = cssText;
    } else {
      style.appendChild(root.ownerDocument.createTextNode(cssText));
    }

    var isLarge = toLowerCase(options['data-size']) === 'large';

    var btn = createElement('a', {
      className: 'btn',
      href: options.href,
      rel: 'noopener',
      target: '_blank',
      title: options.title || undefined,
      'aria-label': options['aria-label'] || undefined,
      innerHTML: octicon(options['data-icon'], isLarge ? 16 : 14) + '&nbsp;'
    }, [
      createElement('span', {}, [options['data-text'] || ''])
    ]);

    var widget = root.appendChild(createElement('div', {
      className: 'widget' + (isLarge ? ' widget-lg' : '')
    }, [
      btn
    ]));

    var hostname = btn.hostname.replace(/\.$/, '');
    if (('.' + hostname).substring(hostname.length - domain.length) !== ('.' + domain)) {
      btn.removeAttribute('href');
      func(widget);
      return
    }

    var path = (' /' + btn.pathname).split(/\/+/);
    if (((hostname === domain || hostname === 'gist.' + domain) && path[3] === 'archive') ||
      (hostname === domain && path[3] === 'releases' && (path[4] === 'download' || (path[4] === 'latest' && path[5] === 'download'))) ||
      (hostname === 'codeload.' + domain)) {
      btn.target = '_top';
    }

    if (toLowerCase(options['data-show-count']) !== 'true' ||
      hostname !== domain ||
      path[1] === 'marketplace' ||
      path[1] === 'sponsors' ||
      path[1] === 'orgs' ||
      path[1] === 'users' ||
      path[1] === '-') {
      func(widget);
      return
    }

    var href, property;
    if (!path[2] && path[1]) {
      property = 'followers';
      href = '?tab=followers';
    } else if (!path[3] && path[2]) {
      property = 'stargazers_count';
      href = '/stargazers';
    } else if (!path[4] && path[3] === 'subscription') {
      property = 'subscribers_count';
      href = '/watchers';
    } else if (!path[4] && path[3] === 'fork') {
      property = 'forks_count';
      href = '/network/members';
    } else if (path[3] === 'issues') {
      property = 'open_issues_count';
      href = '/issues';
    } else {
      func(widget);
      return
    }

    var api = path[2] ? '/repos/' + path[1] + '/' + path[2] : '/users/' + path[1];
    fetch.call(this, apiBaseURL + api, function (error, json) {
      if (!error) {
        var data = json[property];
        widget.appendChild(createElement('a', {
          className: 'social-count',
          href: json.html_url + href,
          rel: 'noopener',
          target: '_blank',
          'aria-label': data + ' ' + property.replace(/_count$/, '').replace('_', ' ').slice(0, data < 2 ? -1 : undefined) + ' on GitHub'
        }, [
          ('' + data).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        ]));
      }
      func(widget);
    });
  };

  var parseOptions = function (anchor) {
    var options = {
      href: anchor.href,
      title: anchor.title,
      'aria-label': anchor.getAttribute('aria-label')
    };
    var ref = ['icon', 'color-scheme', 'text', 'size', 'show-count'];
    for (var i = 0, len = ref.length; i < len; i++) {
      var attribute = 'data-' + ref[i];
      options[attribute] = anchor.getAttribute(attribute);
    }
    if (options['data-text'] == null) {
      options['data-text'] = anchor.textContent || anchor.innerText;
    }
    return options
  };

  var devicePixelRatio = window.devicePixelRatio || /* istanbul ignore next */ 1;

  var ceilPixel = function (px) {
    return (devicePixelRatio > 1 ? Math.ceil(Math.round(px * devicePixelRatio) / devicePixelRatio * 2) / 2 : Math.ceil(px)) || 0
  };

  var get = function (el) {
    var width = el.offsetWidth;
    var height = el.offsetHeight;
    if (el.getBoundingClientRect) {
      var boundingClientRect = el.getBoundingClientRect();
      width = Math.max(width, ceilPixel(boundingClientRect.width));
      height = Math.max(height, ceilPixel(boundingClientRect.height));
    }
    return [width, height]
  };

  var set = function (el, size) {
    el.style.width = size[0] + 'px';
    el.style.height = size[1] + 'px';
  };

  var render = function (options, func) {
    if (options == null || func == null) {
      return
    }
    if (options.getAttribute) {
      options = parseOptions(options);
    }
    if (useShadowDOM) {
      var host = createElement('span');
      render$1(host.attachShadow({ mode: 'closed' }), options, function () {
        func(host);
      });
    } else {
      var iframe = createElement('iframe', {
        src: 'javascript:0',
        title: options.title || undefined,
        allowtransparency: true,
        scrolling: 'no',
        frameBorder: 0
      });
      set(iframe, [0, 0]);
      iframe.style.border = 'none';
      var callback = function () {
        var contentWindow = iframe.contentWindow;
        var body;
        try {
          body = contentWindow.document.body;
        } catch (_) /* istanbul ignore next: IE 11 */ {
          document.body.appendChild(iframe.parentNode.removeChild(iframe));
          return
        }
        offEvent(iframe, 'load', callback);
        render$1.call(contentWindow, body, options, function (widget) {
          var size = get(widget);
          iframe.parentNode.removeChild(iframe);
          onceEvent(iframe, 'load', function () {
            set(iframe, size);
          });
          iframe.src = iframeURL + '#' + (iframe.name = stringify(options));
          func(iframe);
        });
      };
      onEvent(iframe, 'load', callback);
      document.body.appendChild(iframe);
    }
  };

  if (location.protocol + '//' + location.host + location.pathname === iframeURL) {
    render$1(document.body, parse(window.name || location.hash.replace(/^#/, '')), function () {});
  } else {
    defer(function () {
      var ref = document.querySelectorAll
        ? document.querySelectorAll('a.' + buttonClass)
        : (function () {
            var results = [];
            var ref = document.getElementsByTagName('a');
            for (var i = 0, len = ref.length; i < len; i++) {
              if ((' ' + ref[i].className + ' ').replace(/[ \t\n\f\r]+/g, ' ').indexOf(' ' + buttonClass + ' ') !== -1) {
                results.push(ref[i]);
              }
            }
            return results
          })();
      for (var i = 0, len = ref.length; i < len; i++) {
        (function (anchor) {
          render(anchor, function (el) {
            anchor.parentNode.replaceChild(el, anchor);
          });
        })(ref[i]);
      }
    });
  }

}());
