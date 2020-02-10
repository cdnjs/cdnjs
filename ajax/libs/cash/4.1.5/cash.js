/* MIT https://github.com/kenwheeler/cash */
(function(){
"use strict";

var doc = document,
    win = window,
    div = doc.createElement('div'),
    _a = Array.prototype,
    filter = _a.filter,
    indexOf = _a.indexOf,
    map = _a.map,
    push = _a.push,
    reverse = _a.reverse,
    slice = _a.slice,
    some = _a.some,
    splice = _a.splice;
var idRe = /^#[\w-]*$/,
    classRe = /^\.[\w-]*$/,
    htmlRe = /<.+>/,
    tagRe = /^\w+$/; // @require ./variables.ts

function find(selector, context) {
  if (context === void 0) {
    context = doc;
  }

  return !isDocument(context) && !isElement(context) ? [] : classRe.test(selector) ? context.getElementsByClassName(selector.slice(1)) : tagRe.test(selector) ? context.getElementsByTagName(selector) : context.querySelectorAll(selector);
} // @require ./find.ts
// @require ./variables.ts


var Cash =
/** @class */
function () {
  function Cash(selector, context) {
    if (context === void 0) {
      context = doc;
    }

    if (!selector) return;
    if (isCash(selector)) return selector;
    var eles = selector;

    if (isString(selector)) {
      var ctx = isCash(context) ? context[0] : context;
      eles = idRe.test(selector) ? ctx.getElementById(selector.slice(1)) : htmlRe.test(selector) ? parseHTML(selector) : find(selector, ctx);
      if (!eles) return;
    } else if (isFunction(selector)) {
      return this.ready(selector); //FIXME: `fn.ready` is not included in `core`, but it's actually a core functionality
    }

    if (eles.nodeType || eles === win) eles = [eles];
    this.length = eles.length;

    for (var i = 0, l = this.length; i < l; i++) {
      this[i] = eles[i];
    }
  }

  Cash.prototype.init = function (selector, context) {
    return new Cash(selector, context);
  };

  return Cash;
}();

var cash = Cash.prototype.init;
cash.fn = cash.prototype = Cash.prototype; // Ensuring that `cash () instanceof cash`

Cash.prototype.length = 0;
Cash.prototype.splice = splice; // Ensuring a cash collection gets printed as array-like in Chrome's devtools

if (typeof Symbol === 'function') {
  Cash.prototype[Symbol['iterator']] = Array.prototype[Symbol['iterator']];
}

Cash.prototype.get = function (index) {
  if (index === undefined) return slice.call(this);
  return this[index < 0 ? index + this.length : index];
};

Cash.prototype.eq = function (index) {
  return cash(this.get(index));
};

Cash.prototype.first = function () {
  return this.eq(0);
};

Cash.prototype.last = function () {
  return this.eq(-1);
};

Cash.prototype.map = function (callback) {
  return cash(map.call(this, function (ele, i) {
    return callback.call(ele, i, ele);
  }));
};

Cash.prototype.slice = function () {
  return cash(slice.apply(this, arguments));
}; // @require ./cash.ts


var dashAlphaRe = /-([a-z])/g;

function camelCaseReplace(match, letter) {
  return letter.toUpperCase();
}

function camelCase(str) {
  return str.replace(dashAlphaRe, camelCaseReplace);
}

cash.camelCase = camelCase;

function each(arr, callback) {
  for (var i = 0, l = arr.length; i < l; i++) {
    if (callback.call(arr[i], i, arr[i]) === false) break;
  }
}

cash.each = each;

Cash.prototype.each = function (callback) {
  each(this, callback);
  return this;
};

Cash.prototype.removeProp = function (prop) {
  return this.each(function (i, ele) {
    delete ele[prop];
  });
}; // @require ./cash.ts


function extend(target) {
  var objs = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    objs[_i - 1] = arguments[_i];
  }

  var args = arguments,
      length = args.length;

  for (var i = length < 2 ? 0 : 1; i < length; i++) {
    for (var key in args[i]) {
      target[key] = args[i][key];
    }
  }

  return target;
}

Cash.prototype.extend = function (plugins) {
  return extend(cash.fn, plugins);
};

cash.extend = extend;
cash.guid = 1; // @require ./cash.ts

function matches(ele, selector) {
  var matches = ele && (ele['matches'] || ele['webkitMatchesSelector'] || ele['mozMatchesSelector'] || ele['msMatchesSelector'] || ele['oMatchesSelector']);
  return !!matches && matches.call(ele, selector);
}

cash.matches = matches; // @require ./variables.ts

function pluck(arr, prop, deep) {
  var plucked = [];

  for (var i = 0, l = arr.length; i < l; i++) {
    var val_1 = arr[i][prop];

    while (val_1 != null) {
      plucked.push(val_1);
      if (!deep) break;
      val_1 = val_1[prop];
    }
  }

  return plucked;
} // @require ./cash.ts


function isCash(x) {
  return x instanceof Cash;
}

function isWindow(x) {
  return !!x && x === x.window;
}

function isDocument(x) {
  return !!x && x.nodeType === 9;
}

function isElement(x) {
  return !!x && x.nodeType === 1;
}

function isFunction(x) {
  return typeof x === 'function';
}

function isString(x) {
  return typeof x === 'string';
}

function isNumeric(x) {
  return !isNaN(parseFloat(x)) && isFinite(x);
}

var isArray = Array.isArray;
cash.isWindow = isWindow;
cash.isFunction = isFunction;
cash.isString = isString;
cash.isNumeric = isNumeric;
cash.isArray = isArray;

Cash.prototype.prop = function (prop, value) {
  if (!prop) return;

  if (isString(prop)) {
    if (arguments.length < 2) return this[0] && this[0][prop];
    return this.each(function (i, ele) {
      ele[prop] = value;
    });
  }

  for (var key in prop) {
    this.prop(key, prop[key]);
  }

  return this;
}; // @require ./matches.ts
// @require ./type_checking.ts


function getCompareFunction(comparator) {
  return isString(comparator) ? function (i, ele) {
    return matches(ele, comparator);
  } : isFunction(comparator) ? comparator : isCash(comparator) ? function (i, ele) {
    return comparator.is(ele);
  } : function (i, ele) {
    return ele === comparator;
  };
}

Cash.prototype.filter = function (comparator) {
  if (!comparator) return cash();
  var compare = getCompareFunction(comparator);
  return cash(filter.call(this, function (ele, i) {
    return compare.call(ele, i, ele);
  }));
}; // @require collection/filter.ts


function filtered(collection, comparator) {
  return !comparator || !collection.length ? collection : collection.filter(comparator);
} // @require ./type_checking.ts


var splitValuesRe = /\S+/g;

function getSplitValues(str) {
  return isString(str) ? str.match(splitValuesRe) || [] : [];
}

Cash.prototype.hasClass = function (cls) {
  return cls && some.call(this, function (ele) {
    return ele.classList.contains(cls);
  });
};

Cash.prototype.removeAttr = function (attr) {
  var attrs = getSplitValues(attr);
  if (!attrs.length) return this;
  return this.each(function (i, ele) {
    each(attrs, function (i, a) {
      ele.removeAttribute(a);
    });
  });
};

function attr(attr, value) {
  if (!attr) return;

  if (isString(attr)) {
    if (arguments.length < 2) {
      if (!this[0]) return;
      var value_1 = this[0].getAttribute(attr);
      return value_1 === null ? undefined : value_1;
    }

    if (value === undefined) return this;
    if (value === null) return this.removeAttr(attr);
    return this.each(function (i, ele) {
      ele.setAttribute(attr, value);
    });
  }

  for (var key in attr) {
    this.attr(key, attr[key]);
  }

  return this;
}

Cash.prototype.attr = attr;

Cash.prototype.toggleClass = function (cls, force) {
  var classes = getSplitValues(cls),
      isForce = force !== undefined;
  if (!classes.length) return this;
  return this.each(function (i, ele) {
    each(classes, function (i, c) {
      if (isForce) {
        force ? ele.classList.add(c) : ele.classList.remove(c);
      } else {
        ele.classList.toggle(c);
      }
    });
  });
};

Cash.prototype.addClass = function (cls) {
  return this.toggleClass(cls, true);
};

Cash.prototype.removeClass = function (cls) {
  return !arguments.length ? this.attr('class', '') : this.toggleClass(cls, false);
}; // @optional ./add_class.ts
// @optional ./attr.ts
// @optional ./has_class.ts
// @optional ./prop.ts
// @optional ./remove_attr.ts
// @optional ./remove_class.ts
// @optional ./remove_prop.ts
// @optional ./toggle_class.ts
// @require ./cash.ts
// @require ./variables


function unique(arr) {
  return arr.length > 1 ? filter.call(arr, function (item, index, self) {
    return indexOf.call(self, item) === index;
  }) : arr;
}

cash.unique = unique;

Cash.prototype.add = function (selector, context) {
  return cash(unique(this.get().concat(cash(selector, context).get())));
}; // @require core/type_checking.ts
// @require core/variables.ts


function computeStyle(ele, prop, isVariable) {
  if (!isElement(ele) || !prop) return;
  var style = win.getComputedStyle(ele, null);
  return prop ? isVariable ? style.getPropertyValue(prop) || undefined : style[prop] : style;
} // @require ./compute_style.ts


function computeStyleInt(ele, prop) {
  return parseInt(computeStyle(ele, prop), 10) || 0;
}

var cssVariableRe = /^--/; // @require ./variables.ts

function isCSSVariable(prop) {
  return cssVariableRe.test(prop);
} // @require core/camel_case.ts
// @require core/cash.ts
// @require core/each.ts
// @require core/variables.ts
// @require ./is_css_variable.ts


var prefixedProps = {},
    style = div.style,
    vendorsPrefixes = ['webkit', 'moz', 'ms', 'o'];

function getPrefixedProp(prop, isVariable) {
  if (isVariable === void 0) {
    isVariable = isCSSVariable(prop);
  }

  if (isVariable) return prop;

  if (!prefixedProps[prop]) {
    var propCC = camelCase(prop),
        propUC = "" + propCC.charAt(0).toUpperCase() + propCC.slice(1),
        props = (propCC + " " + vendorsPrefixes.join(propUC + " ") + propUC).split(' ');
    each(props, function (i, p) {
      if (p in style) {
        prefixedProps[prop] = p;
        return false;
      }
    });
  }

  return prefixedProps[prop];
}

;
cash.prefixedProp = getPrefixedProp; // @require core/type_checking.ts
// @require ./is_css_variable.ts

var numericProps = {
  animationIterationCount: true,
  columnCount: true,
  flexGrow: true,
  flexShrink: true,
  fontWeight: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  widows: true,
  zIndex: true
};

function getSuffixedValue(prop, value, isVariable) {
  if (isVariable === void 0) {
    isVariable = isCSSVariable(prop);
  }

  return !isVariable && !numericProps[prop] && isNumeric(value) ? value + "px" : value;
}

function css(prop, value) {
  if (isString(prop)) {
    var isVariable_1 = isCSSVariable(prop);
    prop = getPrefixedProp(prop, isVariable_1);
    if (arguments.length < 2) return this[0] && computeStyle(this[0], prop, isVariable_1);
    if (!prop) return this;
    value = getSuffixedValue(prop, value, isVariable_1);
    return this.each(function (i, ele) {
      if (!isElement(ele)) return;

      if (isVariable_1) {
        ele.style.setProperty(prop, value); //TSC
      } else {
        ele.style[prop] = value; //TSC
      }
    });
  }

  for (var key in prop) {
    this.css(key, prop[key]);
  }

  return this;
}

;
Cash.prototype.css = css; // @optional ./css.ts
// @require core/camel_case.ts

function getData(ele, key) {
  var value = ele.dataset ? ele.dataset[key] || ele.dataset[camelCase(key)] : ele.getAttribute("data-" + key);

  try {
    return JSON.parse(value);
  } catch (_a) {}

  return value;
} // @require core/camel_case.ts


function setData(ele, key, value) {
  try {
    value = JSON.stringify(value);
  } catch (_a) {}

  if (ele.dataset) {
    ele.dataset[camelCase(key)] = value;
  } else {
    ele.setAttribute("data-" + key, value);
  }
}

var dataAttributeRe = /^data-(.+)/;

function data(name, value) {
  var _this = this;

  if (!name) {
    if (!this[0]) return;
    var datas_1 = {};
    each(this[0].attributes, function (i, attr) {
      var match = attr.name.match(dataAttributeRe);
      if (!match) return;
      datas_1[match[1]] = _this.data(match[1]);
    });
    return datas_1;
  }

  if (isString(name)) {
    if (value === undefined) return this[0] && getData(this[0], name);
    return this.each(function (i, ele) {
      return setData(ele, name, value);
    });
  }

  for (var key in name) {
    this.data(key, name[key]);
  }

  return this;
}

Cash.prototype.data = data; // @optional ./data.ts
// @require css/helpers/compute_style_int.ts

function getExtraSpace(ele, xAxis) {
  return computeStyleInt(ele, "border" + (xAxis ? 'Left' : 'Top') + "Width") + computeStyleInt(ele, "padding" + (xAxis ? 'Left' : 'Top')) + computeStyleInt(ele, "padding" + (xAxis ? 'Right' : 'Bottom')) + computeStyleInt(ele, "border" + (xAxis ? 'Right' : 'Bottom') + "Width");
}

each(['Width', 'Height'], function (i, prop) {
  Cash.prototype["inner" + prop] = function () {
    if (!this[0]) return;
    if (isWindow(this[0])) return win["inner" + prop];
    return this[0]["client" + prop];
  };
});
each(['width', 'height'], function (index, prop) {
  Cash.prototype[prop] = function (value) {
    if (!this[0]) return value === undefined ? undefined : this;

    if (!arguments.length) {
      if (isWindow(this[0])) return this[0][camelCase("outer-" + prop)];
      return this[0].getBoundingClientRect()[prop] - getExtraSpace(this[0], !index);
    }

    var valueNumber = parseInt(value, 10); //TSC

    return this.each(function (i, ele) {
      if (!isElement(ele)) return;
      var boxSizing = computeStyle(ele, 'boxSizing');
      ele.style[prop] = getSuffixedValue(prop, valueNumber + (boxSizing === 'border-box' ? getExtraSpace(ele, !index) : 0));
    });
  };
});
each(['Width', 'Height'], function (index, prop) {
  Cash.prototype["outer" + prop] = function (includeMargins) {
    if (!this[0]) return;
    if (isWindow(this[0])) return win["outer" + prop];
    return this[0]["offset" + prop] + (includeMargins ? computeStyleInt(this[0], "margin" + (!index ? 'Left' : 'Top')) + computeStyleInt(this[0], "margin" + (!index ? 'Right' : 'Bottom')) : 0);
  };
}); // @optional ./inner.ts
// @optional ./normal.ts
// @optional ./outer.ts
// @require css/helpers/compute_style.ts

var defaultDisplay = {};

function getDefaultDisplay(tagName) {
  if (defaultDisplay[tagName]) return defaultDisplay[tagName];
  var ele = doc.createElement(tagName);
  doc.body.appendChild(ele);
  var display = computeStyle(ele, 'display');
  doc.body.removeChild(ele);
  return defaultDisplay[tagName] = display !== 'none' ? display : 'block';
} // @require css/helpers/compute_style.ts


function isHidden(ele) {
  return computeStyle(ele, 'display') === 'none';
}

Cash.prototype.toggle = function (force) {
  return this.each(function (i, ele) {
    var show = force !== undefined ? force : isHidden(ele);

    if (show) {
      ele.style.display = '';

      if (isHidden(ele)) {
        ele.style.display = getDefaultDisplay(ele.tagName);
      }
    } else {
      ele.style.display = 'none';
    }
  });
};

Cash.prototype.hide = function () {
  return this.toggle(false);
};

Cash.prototype.show = function () {
  return this.toggle(true);
}; // @optional ./hide.ts
// @optional ./show.ts
// @optional ./toggle.ts


function hasNamespaces(ns1, ns2) {
  return !ns2 || !some.call(ns2, function (ns) {
    return ns1.indexOf(ns) < 0;
  });
}

var eventsNamespace = '__cashEvents',
    eventsNamespacesSeparator = '.',
    eventsFocus = {
  focus: 'focusin',
  blur: 'focusout'
},
    eventsHover = {
  mouseenter: 'mouseover',
  mouseleave: 'mouseout'
},
    eventsMouseRe = /^(?:mouse|pointer|contextmenu|drag|drop|click|dblclick)/i; // @require ./variables.ts

function getEventNameBubbling(name) {
  return eventsHover[name] || eventsFocus[name] || name;
} // @require ./variables.ts


function getEventsCache(ele) {
  return ele[eventsNamespace] = ele[eventsNamespace] || {};
} // @require core/guid.ts
// @require events/helpers/get_events_cache.ts


function addEvent(ele, name, namespaces, selector, callback) {
  callback.guid = callback.guid || cash.guid++;
  var eventCache = getEventsCache(ele);
  eventCache[name] = eventCache[name] || [];
  eventCache[name].push([namespaces, selector, callback]);
  ele.addEventListener(name, callback);
} // @require ./variables.ts


function parseEventName(eventName) {
  var parts = eventName.split(eventsNamespacesSeparator);
  return [parts[0], parts.slice(1).sort()]; // [name, namespace[]]
} // @require ./get_events_cache.ts
// @require ./has_namespaces.ts
// @require ./parse_event_name.ts


function removeEvent(ele, name, namespaces, selector, callback) {
  var cache = getEventsCache(ele);

  if (!name) {
    for (name in cache) {
      removeEvent(ele, name, namespaces, selector, callback);
    }

    delete ele[eventsNamespace];
  } else if (cache[name]) {
    cache[name] = cache[name].filter(function (_a) {
      var ns = _a[0],
          sel = _a[1],
          cb = _a[2];
      if (callback && cb.guid !== callback.guid || !hasNamespaces(ns, namespaces) || selector && selector !== sel) return true;
      ele.removeEventListener(name, cb);
    });
  }
}

Cash.prototype.off = function (eventFullName, selector, callback) {
  var _this = this;

  if (eventFullName === undefined) {
    this.each(function (i, ele) {
      return removeEvent(ele);
    });
  } else {
    if (isFunction(selector)) {
      callback = selector;
      selector = '';
    }

    each(getSplitValues(eventFullName), function (i, eventFullName) {
      var _a = parseEventName(getEventNameBubbling(eventFullName)),
          name = _a[0],
          namespaces = _a[1];

      _this.each(function (i, ele) {
        return removeEvent(ele, name, namespaces, selector, callback);
      }); //TSC

    });
  }

  return this;
};

function on(eventFullName, selector, callback, _one) {
  var _this = this;

  if (!isString(eventFullName)) {
    for (var key in eventFullName) {
      this.on(key, selector, eventFullName[key]);
    }

    return this;
  }

  if (isFunction(selector)) {
    callback = selector;
    selector = '';
  }

  each(getSplitValues(eventFullName), function (i, eventFullName) {
    var _a = parseEventName(getEventNameBubbling(eventFullName)),
        name = _a[0],
        namespaces = _a[1];

    _this.each(function (i, ele) {
      var finalCallback = function finalCallback(event) {
        if (event.namespace && !hasNamespaces(namespaces, event.namespace.split(eventsNamespacesSeparator))) return;
        var thisArg = ele;

        if (selector) {
          var target = event.target;

          while (!matches(target, selector)) {
            //TSC
            if (target === ele) return;
            target = target.parentNode;
            if (!target) return;
          }

          thisArg = target;
          event.__delegate = true;
        }

        if (event.__delegate) {
          Object.defineProperty(event, 'currentTarget', {
            configurable: true,
            get: function get() {
              return thisArg;
            }
          });
        }

        var returnValue = callback.call(thisArg, event, event.data); //TSC

        if (_one) {
          removeEvent(ele, name, namespaces, selector, finalCallback); //TSC
        }

        if (returnValue === false) {
          event.preventDefault();
          event.stopPropagation();
        }
      };

      finalCallback.guid = callback['guid'] = callback['guid'] || cash.guid++; //TSC

      addEvent(ele, name, namespaces, selector, finalCallback); //TSC
    });
  });
  return this;
}

Cash.prototype.on = on;

function one(eventFullName, selector, callback) {
  return this.on(eventFullName, selector, callback, true); //TSC
}

;
Cash.prototype.one = one;

Cash.prototype.ready = function (callback) {
  var finalCallback = function finalCallback() {
    return callback(cash);
  };

  if (doc.readyState !== 'loading') {
    setTimeout(finalCallback);
  } else {
    doc.addEventListener('DOMContentLoaded', finalCallback);
  }

  return this;
};

Cash.prototype.trigger = function (eventFullName, data) {
  var evt;

  if (isString(eventFullName)) {
    var _a = parseEventName(eventFullName),
        name_1 = _a[0],
        namespaces = _a[1],
        type = eventsMouseRe.test(name_1) ? 'MouseEvents' : 'HTMLEvents';

    evt = doc.createEvent(type);
    evt.initEvent(name_1, true, true);
    evt.namespace = namespaces.join(eventsNamespacesSeparator);
  } else {
    evt = eventFullName;
  }

  evt.data = data;
  var isEventFocus = evt.type in eventsFocus;
  return this.each(function (i, ele) {
    if (isEventFocus && isFunction(ele[evt.type])) {
      ele[evt.type]();
    } else {
      ele.dispatchEvent(evt);
    }
  });
}; // @optional ./off.ts
// @optional ./on.ts
// @optional ./one.ts
// @optional ./ready.ts
// @optional ./trigger.ts
// @require core/pluck.ts
// @require core/variables.ts


function getValue(ele) {
  if (ele.multiple && ele.options) return pluck(filter.call(ele.options, function (option) {
    return option.selected && !option.disabled && !option.parentNode.disabled;
  }), 'value');
  return ele.value || '';
}

var queryEncodeSpaceRe = /%20/g;

function queryEncode(prop, value) {
  return "&" + encodeURIComponent(prop) + "=" + encodeURIComponent(value).replace(queryEncodeSpaceRe, '+');
} // @require core/cash.ts
// @require core/each.ts
// @require core/type_checking.ts
// @require ./helpers/get_value.ts
// @require ./helpers/query_encode.ts


var skippableRe = /file|reset|submit|button|image/i,
    checkableRe = /radio|checkbox/i;

Cash.prototype.serialize = function () {
  var query = '';
  this.each(function (i, ele) {
    each(ele.elements || [ele], function (i, ele) {
      if (ele.disabled || !ele.name || ele.tagName === 'FIELDSET' || skippableRe.test(ele.type) || checkableRe.test(ele.type) && !ele.checked) return;
      var value = getValue(ele);
      if (value === undefined) return;
      var values = isArray(value) ? value : [value];
      each(values, function (i, value) {
        query += queryEncode(ele.name, value);
      });
    });
  });
  return query.substr(1);
};

function val(value) {
  if (value === undefined) return this[0] && getValue(this[0]);
  return this.each(function (i, ele) {
    if (ele.tagName === 'SELECT') {
      var eleValue_1 = isArray(value) ? value : value === null ? [] : [value];
      each(ele.options, function (i, option) {
        option.selected = eleValue_1.indexOf(option.value) >= 0;
      });
    } else {
      ele.value = value === null ? '' : value;
    }
  });
}

Cash.prototype.val = val;

Cash.prototype.clone = function () {
  return this.map(function (i, ele) {
    return ele.cloneNode(true);
  });
};

Cash.prototype.detach = function () {
  return this.each(function (i, ele) {
    if (ele.parentNode) {
      ele.parentNode.removeChild(ele);
    }
  });
}; // @require ./cash.ts
// @require ./variables.ts
// @require ./type_checking.ts
// @require collection/get.ts
// @require manipulation/detach.ts


var fragmentRe = /^\s*<(\w+)[^>]*>/,
    singleTagRe = /^\s*<(\w+)\s*\/?>(?:<\/\1>)?\s*$/;
var containers;

function initContainers() {
  if (containers) return;
  var table = doc.createElement('table'),
      tr = doc.createElement('tr');
  containers = {
    '*': div,
    tr: doc.createElement('tbody'),
    td: tr,
    th: tr,
    thead: table,
    tbody: table,
    tfoot: table
  };
}

function parseHTML(html) {
  initContainers();
  if (!isString(html)) return [];
  if (singleTagRe.test(html)) return [doc.createElement(RegExp.$1)];
  var fragment = fragmentRe.test(html) && RegExp.$1,
      container = containers[fragment] || containers['*'];
  container.innerHTML = html;
  return cash(container.childNodes).detach().get();
}

cash.parseHTML = parseHTML;

Cash.prototype.empty = function () {
  return this.each(function (i, ele) {
    while (ele.firstChild) {
      ele.removeChild(ele.firstChild);
    }
  });
};

function html(html) {
  if (html === undefined) return this[0] && this[0].innerHTML;
  return this.each(function (i, ele) {
    ele.innerHTML = html;
  });
}

Cash.prototype.html = html;

Cash.prototype.remove = function () {
  return this.detach().off();
};

function text(text) {
  if (text === undefined) return this[0] ? this[0].textContent : '';
  return this.each(function (i, ele) {
    ele.textContent = text;
  });
}

;
Cash.prototype.text = text;

Cash.prototype.unwrap = function () {
  this.parent().each(function (i, ele) {
    var $ele = cash(ele);
    $ele.replaceWith($ele.children());
  });
  return this;
}; // @require core/cash.ts
// @require core/variables.ts


var docEle = doc.documentElement;

Cash.prototype.offset = function () {
  var ele = this[0];
  if (!ele) return;
  var rect = ele.getBoundingClientRect();
  return {
    top: rect.top + win.pageYOffset - docEle.clientTop,
    left: rect.left + win.pageXOffset - docEle.clientLeft
  };
};

Cash.prototype.offsetParent = function () {
  return cash(this[0] && this[0].offsetParent);
};

Cash.prototype.position = function () {
  var ele = this[0];
  if (!ele) return;
  return {
    left: ele.offsetLeft,
    top: ele.offsetTop
  };
};

Cash.prototype.children = function (comparator) {
  var result = [];
  this.each(function (i, ele) {
    push.apply(result, ele.children);
  });
  return filtered(cash(unique(result)), comparator);
};

Cash.prototype.contents = function () {
  var result = [];
  this.each(function (i, ele) {
    push.apply(result, ele.tagName === 'IFRAME' ? [ele.contentDocument] : ele.childNodes);
  });
  return cash(unique(result));
};

Cash.prototype.find = function (selector) {
  var result = [];

  for (var i = 0, l = this.length; i < l; i++) {
    var found = find(selector, this[i]);

    if (found.length) {
      push.apply(result, found);
    }
  }

  return cash(unique(result));
}; // @require collection/filter.ts
// @require traversal/find.ts


var scriptTypeRe = /^$|^module$|\/(?:java|ecma)script/i,
    HTMLCDATARe = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

function evalScripts(node) {
  var collection = cash(node);
  collection.filter('script').add(collection.find('script')).each(function (i, ele) {
    if (!ele.src && scriptTypeRe.test(ele.type)) {
      // The script type is supported
      if (ele.ownerDocument.documentElement.contains(ele)) {
        // The element is attached to the DOM // Using `documentElement` for broader browser support
        eval(ele.textContent.replace(HTMLCDATARe, ''));
      }
    }
  });
} // @require ./eval_scripts.ts


function insertElement(anchor, child, prepend, prependTarget) {
  if (prepend) {
    anchor.insertBefore(child, prependTarget);
  } else {
    anchor.appendChild(child);
  }

  evalScripts(child);
} // @require core/each.ts
// @require core/type_checking.ts
// @require ./insert_element.ts


function insertContent(parent, child, prepend) {
  each(parent, function (index, parentEle) {
    each(child, function (i, childEle) {
      insertElement(parentEle, !index ? childEle : childEle.cloneNode(true), prepend, prepend && parentEle.firstChild);
    });
  });
}

Cash.prototype.append = function () {
  var _this = this;

  each(arguments, function (i, selector) {
    insertContent(_this, cash(selector));
  });
  return this;
};

Cash.prototype.appendTo = function (selector) {
  insertContent(cash(selector), this);
  return this;
};

Cash.prototype.insertAfter = function (selector) {
  var _this = this;

  cash(selector).each(function (index, ele) {
    var parent = ele.parentNode;

    if (parent) {
      _this.each(function (i, e) {
        insertElement(parent, !index ? e : e.cloneNode(true), true, ele.nextSibling);
      });
    }
  });
  return this;
};

Cash.prototype.after = function () {
  var _this = this;

  each(reverse.apply(arguments), function (i, selector) {
    reverse.apply(cash(selector).slice()).insertAfter(_this);
  });
  return this;
};

Cash.prototype.insertBefore = function (selector) {
  var _this = this;

  cash(selector).each(function (index, ele) {
    var parent = ele.parentNode;

    if (parent) {
      _this.each(function (i, e) {
        insertElement(parent, !index ? e : e.cloneNode(true), true, ele);
      });
    }
  });
  return this;
};

Cash.prototype.before = function () {
  var _this = this;

  each(arguments, function (i, selector) {
    cash(selector).insertBefore(_this);
  });
  return this;
};

Cash.prototype.prepend = function () {
  var _this = this;

  each(arguments, function (i, selector) {
    insertContent(_this, cash(selector), true);
  });
  return this;
};

Cash.prototype.prependTo = function (selector) {
  insertContent(cash(selector), reverse.apply(this.slice()), true);
  return this;
};

Cash.prototype.replaceWith = function (selector) {
  return this.before(selector).remove();
};

Cash.prototype.replaceAll = function (selector) {
  cash(selector).replaceWith(this);
  return this;
};

Cash.prototype.wrapAll = function (selector) {
  if (this[0]) {
    var structure = cash(selector);
    this.first().before(structure);
    var wrapper = structure[0];

    while (wrapper.children.length) {
      wrapper = wrapper.firstElementChild;
    }

    this.appendTo(wrapper);
  }

  return this;
};

Cash.prototype.wrap = function (selector) {
  return this.each(function (index, ele) {
    var wrapper = cash(selector)[0];
    cash(ele).wrapAll(!index ? wrapper : wrapper.cloneNode(true));
  });
};

Cash.prototype.wrapInner = function (selector) {
  return this.each(function (i, ele) {
    var $ele = cash(ele),
        contents = $ele.contents();
    contents.length ? contents.wrapAll(selector) : $ele.append(selector);
  });
};

Cash.prototype.has = function (selector) {
  var comparator = isString(selector) ? function (i, ele) {
    return !!find(selector, ele).length;
  } : function (i, ele) {
    return ele.contains(selector);
  };
  return this.filter(comparator);
};

Cash.prototype.is = function (comparator) {
  if (!comparator || !this[0]) return false;
  var compare = getCompareFunction(comparator);
  var check = false;
  this.each(function (i, ele) {
    check = compare.call(ele, i, ele);
    return !check;
  });
  return check;
};

Cash.prototype.next = function (comparator, _all) {
  return filtered(cash(unique(pluck(this, 'nextElementSibling', _all))), comparator);
};

Cash.prototype.nextAll = function (comparator) {
  return this.next(comparator, true);
};

Cash.prototype.not = function (comparator) {
  if (!comparator || !this[0]) return this;
  var compare = getCompareFunction(comparator);
  return this.filter(function (i, ele) {
    return !compare.call(ele, i, ele);
  });
};

Cash.prototype.parent = function (comparator) {
  return filtered(cash(unique(pluck(this, 'parentNode'))), comparator);
};

Cash.prototype.index = function (selector) {
  var child = selector ? cash(selector)[0] : this[0],
      collection = selector ? this : cash(child).parent().children();
  return indexOf.call(collection, child);
};

Cash.prototype.closest = function (comparator) {
  if (!comparator || !this[0]) return cash();
  var filtered = this.filter(comparator);
  if (filtered.length) return filtered;
  return this.parent().closest(comparator);
};

Cash.prototype.parents = function (comparator) {
  return filtered(cash(unique(pluck(this, 'parentElement', true))), comparator);
};

Cash.prototype.prev = function (comparator, _all) {
  return filtered(cash(unique(pluck(this, 'previousElementSibling', _all))), comparator);
};

Cash.prototype.prevAll = function (comparator) {
  return this.prev(comparator, true);
};

Cash.prototype.siblings = function (comparator) {
  var result = [];
  this.each(function (i, ele) {
    push.apply(result, cash(ele).parent().children(function (ci, child) {
      return child !== ele;
    }));
  });
  return filtered(cash(unique(result)), comparator);
}; // @optional ./children.ts
// @optional ./closest.ts
// @optional ./contents.ts
// @optional ./find.ts
// @optional ./has.ts
// @optional ./is.ts
// @optional ./next.ts
// @optional ./not.ts
// @optional ./parent.ts
// @optional ./parents.ts
// @optional ./prev.ts
// @optional ./siblings.ts
// @optional attributes/index.ts
// @optional collection/index.ts
// @optional css/index.ts
// @optional data/index.ts
// @optional dimensions/index.ts
// @optional effects/index.ts
// @optional events/index.ts
// @optional forms/index.ts
// @optional manipulation/index.ts
// @optional offset/index.ts
// @optional traversal/index.ts
// @require core/index.ts
// @priority -100
// @require ./cash.ts
// @require ./variables.ts


if (typeof exports !== 'undefined') {
  // Node.js
  module.exports = cash;
} else {
  // Browser
  win['cash'] = win['$'] = cash;
}
})();