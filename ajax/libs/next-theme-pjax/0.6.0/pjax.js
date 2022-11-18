var Pjax = (function () {
  'use strict';

  /* global HTMLCollection: true */

  var foreachEls = function(els, fn, context) {
    if (
      els instanceof HTMLCollection ||
      els instanceof NodeList ||
      els instanceof Array
    ) {
      return Array.prototype.forEach.call(els, fn, context);
    }
    // assume simple DOM element
    return fn.call(context, els);
  };

  var forEachEls$2 = foreachEls;

  var on$2 = function(els, events, listener, useCapture) {
    events = typeof events === "string" ? events.split(" ") : events;

    events.forEach(function(e) {
      forEachEls$2(els, function(el) {
        el.addEventListener(e, listener, useCapture);
      });
    });
  };

  var on$1 = on$2;

  var switches$1 = {
    outerHTML: function(oldEl, newEl) {
      oldEl.outerHTML = newEl.outerHTML;
      this.onSwitch();
    },

    innerHTML: function(oldEl, newEl) {
      oldEl.innerHTML = newEl.innerHTML;

      if (newEl.className === "") {
        oldEl.removeAttribute("class");
      } else {
        oldEl.className = newEl.className;
      }

      this.onSwitch();
    },

    switchElementsAlt: function(oldEl, newEl) {
      oldEl.innerHTML = newEl.innerHTML;

      // Copy attributes from the new element to the old one
      if (newEl.hasAttributes()) {
        var attrs = newEl.attributes;
        for (var i = 0; i < attrs.length; i++) {
          oldEl.attributes.setNamedItem(attrs[i].cloneNode());
        }
      }

      this.onSwitch();
    },

    // Equivalent to outerHTML(), but doesn't require switchElementsAlt() for <head> and <body>
    replaceNode: function(oldEl, newEl) {
      oldEl.parentNode.replaceChild(newEl, oldEl);
      this.onSwitch();
    },

    sideBySide: function(oldEl, newEl, options, switchOptions) {
      var forEach = Array.prototype.forEach;
      var elsToRemove = [];
      var elsToAdd = [];
      var fragToAppend = document.createDocumentFragment();
      var animationEventNames =
        "animationend webkitAnimationEnd MSAnimationEnd oanimationend";
      var animatedElsNumber = 0;
      var sexyAnimationEnd = function(e) {
        if (e.target !== e.currentTarget) {
          // end triggered by an animation on a child
          return;
        }

        animatedElsNumber--;
        if (animatedElsNumber <= 0 && elsToRemove) {
          elsToRemove.forEach(function(el) {
            // browsing quickly can make the el
            // already removed by last page update ?
            if (el.parentNode) {
              el.parentNode.removeChild(el);
            }
          });

          elsToAdd.forEach(function(el) {
            el.className = el.className.replace(
              el.getAttribute("data-pjax-classes"),
              ""
            );
            el.removeAttribute("data-pjax-classes");
          });

          elsToAdd = null; // free memory
          elsToRemove = null; // free memory

          // this is to trigger some repaint (example: picturefill)
          this.onSwitch();
        }
      }.bind(this);

      switchOptions = switchOptions || {};

      forEach.call(oldEl.childNodes, function(el) {
        elsToRemove.push(el);
        if (el.classList && !el.classList.contains("js-Pjax-remove")) {
          // for fast switch, clean element that just have been added, & not cleaned yet.
          if (el.hasAttribute("data-pjax-classes")) {
            el.className = el.className.replace(
              el.getAttribute("data-pjax-classes"),
              ""
            );
            el.removeAttribute("data-pjax-classes");
          }
          el.classList.add("js-Pjax-remove");
          if (switchOptions.callbacks && switchOptions.callbacks.removeElement) {
            switchOptions.callbacks.removeElement(el);
          }
          if (switchOptions.classNames) {
            el.className +=
              " " +
              switchOptions.classNames.remove +
              " " +
              (options.backward
                ? switchOptions.classNames.backward
                : switchOptions.classNames.forward);
          }
          animatedElsNumber++;
          on$1(el, animationEventNames, sexyAnimationEnd, true);
        }
      });

      forEach.call(newEl.childNodes, function(el) {
        if (el.classList) {
          var addClasses = "";
          if (switchOptions.classNames) {
            addClasses =
              " js-Pjax-add " +
              switchOptions.classNames.add +
              " " +
              (options.backward
                ? switchOptions.classNames.forward
                : switchOptions.classNames.backward);
          }
          if (switchOptions.callbacks && switchOptions.callbacks.addElement) {
            switchOptions.callbacks.addElement(el);
          }
          el.className += addClasses;
          el.setAttribute("data-pjax-classes", addClasses);
          elsToAdd.push(el);
          fragToAppend.appendChild(el);
          animatedElsNumber++;
          on$1(el, animationEventNames, sexyAnimationEnd, true);
        }
      });

      // pass all className of the parent
      oldEl.className = newEl.className;
      oldEl.appendChild(fragToAppend);
    }
  };

  /* global _gaq: true, ga: true */

  var defaultSwitches = switches$1;

  var parseOptions$1 = function(options) {
    options = options || {};
    options.elements = options.elements || "a[href], form[action]";
    options.selectors = options.selectors || ["title", ".js-Pjax"];
    options.switches = options.switches || {};
    options.switchesOptions = options.switchesOptions || {};
    options.history =
      typeof options.history === "undefined" ? true : options.history;
    options.analytics =
      typeof options.analytics === "function" || options.analytics === false
        ? options.analytics
        : defaultAnalytics;
    options.scrollTo =
      typeof options.scrollTo === "undefined" ? 0 : options.scrollTo;
    options.scrollRestoration =
      typeof options.scrollRestoration !== "undefined"
        ? options.scrollRestoration
        : true;
    options.cacheBust =
      typeof options.cacheBust === "undefined" ? true : options.cacheBust;
    options.debug = options.debug || false;
    options.timeout = options.timeout || 0;
    options.currentUrlFullReload =
      typeof options.currentUrlFullReload === "undefined"
        ? false
        : options.currentUrlFullReload;

    // We can’t replace body.outerHTML or head.outerHTML.
    // It creates a bug where a new body or head are created in the DOM.
    // If you set head.outerHTML, a new body tag is appended, so the DOM has 2 body nodes, and vice versa
    if (!options.switches.head) {
      options.switches.head = defaultSwitches.switchElementsAlt;
    }
    if (!options.switches.body) {
      options.switches.body = defaultSwitches.switchElementsAlt;
    }

    return options;
  };

  /* istanbul ignore next */
  function defaultAnalytics() {
    if (window._gaq) {
      _gaq.push(["_trackPageview"]);
    }
    if (window.ga) {
      ga("send", "pageview", { page: location.pathname, title: document.title });
    }
  }

  var uniqueid = (function() {
    var counter = 0;
    return function() {
      var id = "pjax" + new Date().getTime() + "_" + counter;
      counter++;
      return id;
    };
  })();

  var forEachEls$1 = foreachEls;

  var trigger$1 = function(els, events, opts) {
    events = typeof events === "string" ? events.split(" ") : events;

    events.forEach(function(e) {
      var event;
      event = document.createEvent("HTMLEvents");
      event.initEvent(e, true, true);
      event.eventName = e;
      if (opts) {
        Object.keys(opts).forEach(function(key) {
          event[key] = opts[key];
        });
      }

      forEachEls$1(els, function(el) {
        var domFix = false;
        if (!el.parentNode && el !== document && el !== window) {
          // THANK YOU IE (9/10/11)
          // dispatchEvent doesn't work if the element is not in the DOM
          domFix = true;
          document.body.appendChild(el);
        }
        el.dispatchEvent(event);
        if (domFix) {
          el.parentNode.removeChild(el);
        }
      });
    });
  };

  var clone$1 = function(obj) {
    /* istanbul ignore if */
    if (null === obj || "object" !== typeof obj) {
      return obj;
    }
    var copy = obj.constructor();
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) {
        copy[attr] = obj[attr];
      }
    }
    return copy;
  };

  var contains$1 = function contains(doc, selectors, el) {
    for (var i = 0; i < selectors.length; i++) {
      var selectedEls = doc.querySelectorAll(selectors[i]);
      for (var j = 0; j < selectedEls.length; j++) {
        if (selectedEls[j].contains(el)) {
          return true;
        }
      }
    }

    return false;
  };

  var extend$1 = function(target) {
    if (target == null) {
      return null;
    }

    var to = Object(target);

    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      if (source != null) {
        for (var key in source) {
          // Avoid bugs when hasOwnProperty is shadowed
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            to[key] = source[key];
          }
        }
      }
    }
    return to;
  };

  var log;
  var hasRequiredLog;

  function requireLog () {
  	if (hasRequiredLog) return log;
  	hasRequiredLog = 1;
  	log = function() {
  	  if (this.options.debug && console) {
  	    if (typeof console.log === "function") {
  	      console.log.apply(console, arguments);
  	    }
  	    // IE is weird
  	    else if (console.log) {
  	      console.log(arguments);
  	    }
  	  }
  	};
  	return log;
  }

  var parseElement;
  var hasRequiredParseElement;

  function requireParseElement () {
  	if (hasRequiredParseElement) return parseElement;
  	hasRequiredParseElement = 1;
  	var attrState = "data-pjax-state";

  	parseElement = function(el) {
  	  switch (el.tagName.toLowerCase()) {
  	    case "a":
  	      // only attach link if el does not already have link attached
  	      if (!el.hasAttribute(attrState)) {
  	        this.attachLink(el);
  	      }
  	      break;

  	    case "form":
  	      // only attach link if el does not already have link attached
  	      if (!el.hasAttribute(attrState)) {
  	        this.attachForm(el);
  	      }
  	      break;

  	    default:
  	      throw "Pjax can only be applied on <a> or <form> submit";
  	  }
  	};
  	return parseElement;
  }

  var attachLink;
  var hasRequiredAttachLink;

  function requireAttachLink () {
  	if (hasRequiredAttachLink) return attachLink;
  	hasRequiredAttachLink = 1;
  	var on = on$2;
  	var clone = clone$1;

  	var attrState = "data-pjax-state";

  	var linkAction = function(el, event) {
  	  if (isDefaultPrevented(event)) {
  	    return;
  	  }

  	  // Since loadUrl modifies options and we may add our own modifications below,
  	  // clone it so the changes don't persist
  	  var options = clone(this.options);

  	  var attrValue = checkIfShouldAbort(el, event);
  	  if (attrValue) {
  	    el.setAttribute(attrState, attrValue);
  	    return;
  	  }

  	  event.preventDefault();

  	  // don’t do "nothing" if user try to reload the page by clicking the same link twice
  	  if (
  	    this.options.currentUrlFullReload &&
  	    el.href === window.location.href.split("#")[0]
  	  ) {
  	    el.setAttribute(attrState, "reload");
  	    this.reload();
  	    return;
  	  }

  	  el.setAttribute(attrState, "load");

  	  options.triggerElement = el;
  	  this.loadUrl(el.href, options);
  	};

  	function checkIfShouldAbort(el, event) {
  	  // Don’t break browser special behavior on links (like page in new window)
  	  if (
  	    event.which > 1 ||
  	    event.metaKey ||
  	    event.ctrlKey ||
  	    event.shiftKey ||
  	    event.altKey
  	  ) {
  	    return "modifier";
  	  }

  	  // we do test on href now to prevent unexpected behavior if for some reason
  	  // user have href that can be dynamically updated

  	  // Ignore external links.
  	  if (
  	    el.protocol !== window.location.protocol ||
  	    el.host !== window.location.host
  	  ) {
  	    return "external";
  	  }

  	  // Ignore anchors on the same page (keep native behavior)
  	  if (
  	    el.hash &&
  	    el.href.replace(el.hash, "") ===
  	      window.location.href.replace(location.hash, "")
  	  ) {
  	    return "anchor";
  	  }

  	  // Ignore empty anchor "foo.html#"
  	  if (el.href === window.location.href.split("#")[0] + "#") {
  	    return "anchor-empty";
  	  }
  	}

  	var isDefaultPrevented = function(event) {
  	  return event.defaultPrevented || event.returnValue === false;
  	};

  	attachLink = function(el) {
  	  var that = this;

  	  el.setAttribute(attrState, "");

  	  on(el, "click", function(event) {
  	    linkAction.call(that, el, event);
  	  });

  	  on(
  	    el,
  	    "keyup",
  	    function(event) {
  	      if (event.keyCode === 13) {
  	        linkAction.call(that, el, event);
  	      }
  	    }.bind(this)
  	  );
  	};
  	return attachLink;
  }

  var attachForm;
  var hasRequiredAttachForm;

  function requireAttachForm () {
  	if (hasRequiredAttachForm) return attachForm;
  	hasRequiredAttachForm = 1;
  	var on = on$2;
  	var clone = clone$1;

  	var attrState = "data-pjax-state";

  	var formAction = function(el, event) {
  	  if (isDefaultPrevented(event)) {
  	    return;
  	  }

  	  // Since loadUrl modifies options and we may add our own modifications below,
  	  // clone it so the changes don't persist
  	  var options = clone(this.options);

  	  // Initialize requestOptions
  	  options.requestOptions = {
  	    requestUrl: el.getAttribute("action") || window.location.href,
  	    requestMethod: el.getAttribute("method") || "GET"
  	  };

  	  // create a testable virtual link of the form action
  	  var virtLinkElement = document.createElement("a");
  	  virtLinkElement.setAttribute("href", options.requestOptions.requestUrl);

  	  var attrValue = checkIfShouldAbort(virtLinkElement, options);
  	  if (attrValue) {
  	    el.setAttribute(attrState, attrValue);
  	    return;
  	  }

  	  event.preventDefault();

  	  if (el.enctype === "multipart/form-data") {
  	    options.requestOptions.formData = new FormData(el);
  	  } else {
  	    options.requestOptions.requestParams = parseFormElements(el);
  	  }

  	  el.setAttribute(attrState, "submit");

  	  options.triggerElement = el;
  	  this.loadUrl(virtLinkElement.href, options);
  	};

  	function parseFormElements(el) {
  	  var requestParams = [];
  	  var formElements = el.elements;

  	  for (var i = 0; i < formElements.length; i++) {
  	    var element = formElements[i];
  	    var tagName = element.tagName.toLowerCase();
  	    // jscs:disable disallowImplicitTypeConversion
  	    if (
  	      !!element.name &&
  	      element.attributes !== undefined &&
  	      tagName !== "button"
  	    ) {
  	      // jscs:enable disallowImplicitTypeConversion
  	      var type = element.attributes.type;

  	      if (
  	        !type ||
  	        (type.value !== "checkbox" && type.value !== "radio") ||
  	        element.checked
  	      ) {
  	        // Build array of values to submit
  	        var values = [];

  	        if (tagName === "select") {
  	          var opt;

  	          for (var j = 0; j < element.options.length; j++) {
  	            opt = element.options[j];
  	            if (opt.selected && !opt.disabled) {
  	              values.push(opt.hasAttribute("value") ? opt.value : opt.text);
  	            }
  	          }
  	        } else {
  	          values.push(element.value);
  	        }

  	        for (var k = 0; k < values.length; k++) {
  	          requestParams.push({
  	            name: encodeURIComponent(element.name),
  	            value: encodeURIComponent(values[k])
  	          });
  	        }
  	      }
  	    }
  	  }

  	  return requestParams;
  	}

  	function checkIfShouldAbort(virtLinkElement, options) {
  	  // Ignore external links.
  	  if (
  	    virtLinkElement.protocol !== window.location.protocol ||
  	    virtLinkElement.host !== window.location.host
  	  ) {
  	    return "external";
  	  }

  	  // Ignore click if we are on an anchor on the same page
  	  if (
  	    virtLinkElement.hash &&
  	    virtLinkElement.href.replace(virtLinkElement.hash, "") ===
  	      window.location.href.replace(location.hash, "")
  	  ) {
  	    return "anchor";
  	  }

  	  // Ignore empty anchor "foo.html#"
  	  if (virtLinkElement.href === window.location.href.split("#")[0] + "#") {
  	    return "anchor-empty";
  	  }

  	  // if declared as a full reload, just normally submit the form
  	  if (
  	    options.currentUrlFullReload &&
  	    virtLinkElement.href === window.location.href.split("#")[0]
  	  ) {
  	    return "reload";
  	  }
  	}

  	var isDefaultPrevented = function(event) {
  	  return event.defaultPrevented || event.returnValue === false;
  	};

  	attachForm = function(el) {
  	  var that = this;

  	  el.setAttribute(attrState, "");

  	  on(el, "submit", function(event) {
  	    formAction.call(that, el, event);
  	  });
  	};
  	return attachForm;
  }

  var foreachSelectors;
  var hasRequiredForeachSelectors;

  function requireForeachSelectors () {
  	if (hasRequiredForeachSelectors) return foreachSelectors;
  	hasRequiredForeachSelectors = 1;
  	var forEachEls = foreachEls;

  	foreachSelectors = function(selectors, cb, context, DOMcontext) {
  	  DOMcontext = DOMcontext || document;
  	  selectors.forEach(function(selector) {
  	    forEachEls(DOMcontext.querySelectorAll(selector), cb, context);
  	  });
  	};
  	return foreachSelectors;
  }

  var switchesSelectors;
  var hasRequiredSwitchesSelectors;

  function requireSwitchesSelectors () {
  	if (hasRequiredSwitchesSelectors) return switchesSelectors;
  	hasRequiredSwitchesSelectors = 1;
  	var forEachEls = foreachEls;

  	var defaultSwitches = switches$1;

  	switchesSelectors = function(
  	  switches,
  	  switchesOptions,
  	  selectors,
  	  fromEl,
  	  toEl,
  	  options
  	) {
  	  var switchesQueue = [];

  	  selectors.forEach(function(selector) {
  	    var newEls = fromEl.querySelectorAll(selector);
  	    var oldEls = toEl.querySelectorAll(selector);
  	    if (this.log) {
  	      this.log("Pjax switch", selector, newEls, oldEls);
  	    }
  	    if (newEls.length !== oldEls.length) {
  	      throw "DOM doesn’t look the same on new loaded page: ’" +
  	        selector +
  	        "’ - new " +
  	        newEls.length +
  	        ", old " +
  	        oldEls.length;
  	    }

  	    forEachEls(
  	      newEls,
  	      function(newEl, i) {
  	        var oldEl = oldEls[i];
  	        if (this.log) {
  	          this.log("newEl", newEl, "oldEl", oldEl);
  	        }

  	        var callback = switches[selector]
  	          ? switches[selector].bind(
  	              this,
  	              oldEl,
  	              newEl,
  	              options,
  	              switchesOptions[selector]
  	            )
  	          : defaultSwitches.outerHTML.bind(this, oldEl, newEl, options);

  	        switchesQueue.push(callback);
  	      },
  	      this
  	    );
  	  }, this);

  	  this.state.numPendingSwitches = switchesQueue.length;

  	  switchesQueue.forEach(function(queuedSwitch) {
  	    queuedSwitch();
  	  });
  	};
  	return switchesSelectors;
  }

  var noop;
  var hasRequiredNoop;

  function requireNoop () {
  	if (hasRequiredNoop) return noop;
  	hasRequiredNoop = 1;
  	noop = function() {};
  	return noop;
  }

  var abortRequest;
  var hasRequiredAbortRequest;

  function requireAbortRequest () {
  	if (hasRequiredAbortRequest) return abortRequest;
  	hasRequiredAbortRequest = 1;
  	var noop = requireNoop();

  	abortRequest = function(request) {
  	  if (request && request.readyState < 4) {
  	    request.onreadystatechange = noop;
  	    request.abort();
  	  }
  	};
  	return abortRequest;
  }

  var updateQueryString;
  var hasRequiredUpdateQueryString;

  function requireUpdateQueryString () {
  	if (hasRequiredUpdateQueryString) return updateQueryString;
  	hasRequiredUpdateQueryString = 1;
  	updateQueryString = function(uri, key, value) {
  	  var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  	  var separator = uri.indexOf("?") !== -1 ? "&" : "?";
  	  if (uri.match(re)) {
  	    return uri.replace(re, "$1" + key + "=" + value + "$2");
  	  } else {
  	    return uri + separator + key + "=" + value;
  	  }
  	};
  	return updateQueryString;
  }

  var sendRequest;
  var hasRequiredSendRequest;

  function requireSendRequest () {
  	if (hasRequiredSendRequest) return sendRequest;
  	hasRequiredSendRequest = 1;
  	var updateQueryString = requireUpdateQueryString();

  	sendRequest = function(location, options, callback) {
  	  options = options || {};
  	  var queryString;
  	  var requestOptions = options.requestOptions || {};
  	  var requestMethod = (requestOptions.requestMethod || "GET").toUpperCase();
  	  var requestParams = requestOptions.requestParams || null;
  	  var formData = requestOptions.formData || null;
  	  var requestPayload = null;
  	  var request = new XMLHttpRequest();
  	  var timeout = options.timeout || 0;

  	  request.onreadystatechange = function() {
  	    if (request.readyState === 4) {
  	      if (request.status === 200) {
  	        callback(request.responseText, request, location, options);
  	      } else if (request.status !== 0) {
  	        callback(null, request, location, options);
  	      }
  	    }
  	  };

  	  request.onerror = function(e) {
  	    console.log(e);
  	    callback(null, request, location, options);
  	  };

  	  request.ontimeout = function() {
  	    callback(null, request, location, options);
  	  };

  	  // Prepare the request payload for forms, if available
  	  if (requestParams && requestParams.length) {
  	    // Build query string
  	    queryString = requestParams
  	      .map(function(param) {
  	        return param.name + "=" + param.value;
  	      })
  	      .join("&");

  	    switch (requestMethod) {
  	      case "GET":
  	        // Reset query string to avoid an issue with repeat submissions where checkboxes that were
  	        // previously checked are incorrectly preserved
  	        location = location.split("?")[0];

  	        // Append new query string
  	        location += "?" + queryString;
  	        break;

  	      case "POST":
  	        // Send query string as request payload
  	        requestPayload = queryString;
  	        break;
  	    }
  	  } else if (formData) {
  	    requestPayload = formData;
  	  }

  	  // Add a timestamp as part of the query string if cache busting is enabled
  	  if (options.cacheBust) {
  	    location = updateQueryString(location, "t", Date.now());
  	  }

  	  request.open(requestMethod, location, true);
  	  request.timeout = timeout;
  	  request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  	  request.setRequestHeader("X-PJAX", "true");
  	  request.setRequestHeader(
  	    "X-PJAX-Selectors",
  	    JSON.stringify(options.selectors)
  	  );

  	  // Send the proper header information for POST forms
  	  if (requestPayload && requestMethod === "POST" && !formData) {
  	    request.setRequestHeader(
  	      "Content-Type",
  	      "application/x-www-form-urlencoded"
  	    );
  	  }

  	  request.send(requestPayload);

  	  return request;
  	};
  	return sendRequest;
  }

  var handleResponse;
  var hasRequiredHandleResponse;

  function requireHandleResponse () {
  	if (hasRequiredHandleResponse) return handleResponse;
  	hasRequiredHandleResponse = 1;
  	var clone = clone$1;
  	var newUid = uniqueid;
  	var trigger = trigger$1;

  	handleResponse = function(responseText, request, href, options) {
  	  options = clone(options || this.options);
  	  options.request = request;

  	  // Fail if unable to load HTML via AJAX
  	  if (responseText === false) {
  	    trigger(document, "pjax:complete pjax:error", options);

  	    return;
  	  }

  	  // push scroll position to history
  	  var currentState = window.history.state || {};
  	  window.history.replaceState(
  	    {
  	      url: currentState.url || window.location.href,
  	      title: currentState.title || document.title,
  	      uid: currentState.uid || newUid(),
  	      scrollPos: [
  	        document.documentElement.scrollLeft || document.body.scrollLeft,
  	        document.documentElement.scrollTop || document.body.scrollTop
  	      ]
  	    },
  	    document.title,
  	    window.location.href
  	  );

  	  // Check for redirects
  	  var oldHref = href;
  	  if (request.responseURL) {
  	    if (href !== request.responseURL) {
  	      href = request.responseURL;
  	    }
  	  } else if (request.getResponseHeader("X-PJAX-URL")) {
  	    href = request.getResponseHeader("X-PJAX-URL");
  	  } else if (request.getResponseHeader("X-XHR-Redirected-To")) {
  	    href = request.getResponseHeader("X-XHR-Redirected-To");
  	  }

  	  // Add back the hash if it was removed
  	  var a = document.createElement("a");
  	  a.href = oldHref;
  	  var oldHash = a.hash;
  	  a.href = href;
  	  if (oldHash && !a.hash) {
  	    a.hash = oldHash;
  	    href = a.href;
  	  }

  	  this.state.href = href;
  	  this.state.options = options;

  	  try {
  	    this.loadContent(responseText, options);
  	  } catch (e) {
  	    trigger(document, "pjax:error", options);

  	    if (!this.options.debug) {
  	      if (console && console.error) {
  	        console.error("Pjax switch fail: ", e);
  	      }
  	      return this.latestChance(href);
  	    } else {
  	      throw e;
  	    }
  	  }
  	};
  	return handleResponse;
  }

  // var executeScripts = require("./lib/execute-scripts");  // unused-var
  var forEachEls = foreachEls;
  var parseOptions = parseOptions$1;
  var switches = switches$1;
  var newUid = uniqueid;

  var on = on$2;
  var trigger = trigger$1;

  var clone = clone$1;
  var contains = contains$1;
  var extend = extend$1;

  var Pjax = function(options) {
    this.state = {
      numPendingSwitches: 0,
      href: null,
      options: null
    };

    this.options = parseOptions(options);
    this.log("Pjax options", this.options);

    if (this.options.scrollRestoration && "scrollRestoration" in history) {
      history.scrollRestoration = "manual";
      on(
        window,
        "beforeunload",
        function() {
          history.scrollRestoration = "auto";
        }
      );
    }

    this.maxUid = this.lastUid = newUid();

    this.parseDOM(document);

    on(
      window,
      "popstate",
      function(st) {
        if (st.state) {
          var opt = clone(this.options);
          opt.url = st.state.url;
          opt.title = st.state.title;
          // Since state already exists, prevent it from being pushed again
          opt.history = false;
          opt.scrollPos = st.state.scrollPos;
          if (st.state.uid < this.lastUid) {
            opt.backward = true;
          } else {
            opt.forward = true;
          }
          this.lastUid = st.state.uid;

          // @todo implement history cache here, based on uid
          this.loadUrl(st.state.url, opt);
        }
      }.bind(this)
    );
  };

  Pjax.switches = switches;

  Pjax.prototype = {
    log: requireLog(),

    getElements: function(el) {
      return el.querySelectorAll(this.options.elements);
    },

    parseDOM: function(el) {
      var parseElement = requireParseElement();
      forEachEls(this.getElements(el), parseElement, this);
    },

    refresh: function(el) {
      this.parseDOM(el || document);
    },

    reload: function() {
      window.location.reload();
    },

    attachLink: requireAttachLink(),

    attachForm: requireAttachForm(),

    forEachSelectors: function(cb, context, DOMcontext) {
      return requireForeachSelectors().bind(this)(
        this.options.selectors,
        cb,
        context,
        DOMcontext
      );
    },

    switchSelectors: function(selectors, fromEl, toEl, options) {
      return requireSwitchesSelectors().bind(this)(
        this.options.switches,
        this.options.switchesOptions,
        selectors,
        fromEl,
        toEl,
        options
      );
    },

    latestChance: function(href) {
      window.location = href;
    },

    onSwitch: function() {
      trigger(window, "resize scroll");

      this.state.numPendingSwitches--;

      // debounce calls, so we only run this once after all switches are finished.
      if (this.state.numPendingSwitches === 0) {
        this.afterAllSwitches();
      }
    },

    loadContent: function(html, options) {
      if (typeof html !== "string") {
        trigger(document, "pjax:complete pjax:error", options);

        return;
      }

      var tmpEl = document.implementation.createHTMLDocument("pjax");

      // parse HTML attributes to copy them
      // since we are forced to use documentElement.innerHTML (outerHTML can't be used for <html>)
      var htmlRegex = /<html[^>]+>/gi;
      var htmlAttribsRegex = /\s?[a-z:]+(?:=['"][^'">]+['"])*/gi;
      var matches = html.match(htmlRegex);
      if (matches && matches.length) {
        matches = matches[0].match(htmlAttribsRegex);
        if (matches.length) {
          matches.shift();
          matches.forEach(function(htmlAttrib) {
            var attr = htmlAttrib.trim().split("=");
            if (attr.length === 1) {
              tmpEl.documentElement.setAttribute(attr[0], true);
            } else {
              tmpEl.documentElement.setAttribute(attr[0], attr[1].slice(1, -1));
            }
          });
        }
      }

      tmpEl.documentElement.innerHTML = html;
      this.log(
        "load content",
        tmpEl.documentElement.attributes,
        tmpEl.documentElement.innerHTML.length
      );

      // Clear out any focused controls before inserting new page contents.
      if (
        document.activeElement &&
        contains(document, this.options.selectors, document.activeElement)
      ) {
        try {
          document.activeElement.blur();
        } catch (e) {} // eslint-disable-line no-empty
      }

      this.switchSelectors(this.options.selectors, tmpEl, document, options);
    },

    abortRequest: requireAbortRequest(),

    doRequest: requireSendRequest(),

    handleResponse: requireHandleResponse(),

    loadUrl: function(href, options) {
      options =
        typeof options === "object"
          ? extend({}, this.options, options)
          : clone(this.options);

      this.log("load href", href, options);

      // Abort any previous request
      this.abortRequest(this.request);

      trigger(document, "pjax:send", options);

      // Do the request
      this.request = this.doRequest(
        href,
        options,
        this.handleResponse.bind(this)
      );
    },

    executeScripts: function(elements) {
      elements.forEach(function(element) {
        var code = element.text || element.textContent || element.innerHTML || '';
        var script = document.createElement('script');
        if (element.id) {
          script.id = element.id;
        }
        if (element.className) {
          script.className = element.className;
        }
        if (element.type) {
          script.type = element.type;
        }
        if (element.src) {
          script.src = element.src;
          // Force synchronous loading of peripheral JS.
          script.async = false;
        }
        if (element.dataset.pjax !== undefined) {
          script.dataset.pjax = '';
        }
        if (code !== '') {
          script.appendChild(document.createTextNode(code));
        }
        element.parentNode.replaceChild(script, element);
      });
    },

    afterAllSwitches: function() {
      // FF bug: Won’t autofocus fields that are inserted via JS.
      // This behavior is incorrect. So if theres no current focus, autofocus
      // the last field.
      //
      // http://www.w3.org/html/wg/drafts/html/master/forms.html
      var autofocusEl = Array.prototype.slice
        .call(document.querySelectorAll("[autofocus]"))
        .pop();
      if (autofocusEl && document.activeElement !== autofocusEl) {
        autofocusEl.focus();
      }

      // execute scripts when DOM have been completely updated
      this.options.selectors.forEach(function(selector) {
        forEachEls(document.querySelectorAll(selector), function(el) {
        });
      });

      var state = this.state;

      if (state.options.history) {
        if (!window.history.state) {
          this.lastUid = this.maxUid = newUid();
          window.history.replaceState(
            {
              url: window.location.href,
              title: document.title,
              uid: this.maxUid,
              scrollPos: [0, 0]
            },
            document.title
          );
        }

        // Update browser history
        this.lastUid = this.maxUid = newUid();

        window.history.pushState(
          {
            url: state.href,
            title: state.options.title,
            uid: this.maxUid,
            scrollPos: [0, 0]
          },
          state.options.title,
          state.href
        );
      }

      this.forEachSelectors(function(el) {
        this.parseDOM(el);
      }, this);

      // Fire Events
      trigger(document, "pjax:complete pjax:success", state.options);

      if (typeof state.options.analytics === "function") {
        state.options.analytics();
      }

      if (state.options.history) {
        // First parse url and check for hash to override scroll
        var a = document.createElement("a");
        a.href = this.state.href;
        if (a.hash) {
          var name = a.hash.slice(1);
          name = decodeURIComponent(name);

          var curtop = 0;
          var target =
            document.getElementById(name) || document.getElementsByName(name)[0];
          if (target) {
            // http://stackoverflow.com/questions/8111094/cross-browser-javascript-function-to-find-actual-position-of-an-element-in-page
            if (target.offsetParent) {
              do {
                curtop += target.offsetTop;

                target = target.offsetParent;
              } while (target);
            }
          }
          window.scrollTo(0, curtop);
        } else if (state.options.scrollTo !== false) {
          // Scroll page to top on new page load
          if (state.options.scrollTo.length > 1) {
            window.scrollTo(state.options.scrollTo[0], state.options.scrollTo[1]);
          } else {
            window.scrollTo(0, state.options.scrollTo);
          }
        }
      } else if (state.options.scrollRestoration && state.options.scrollPos) {
        window.scrollTo(state.options.scrollPos[0], state.options.scrollPos[1]);
      }

      this.state = {
        numPendingSwitches: 0,
        href: null,
        options: null
      };
    }
  };

  var pjax = Pjax;

  return pjax;

})();
