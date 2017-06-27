;(function(__root) {
/*
	Matreshka Magic v1.9.1 (2016-05-21), the part of Matreshka project 
	JavaScript Framework by Andrey Gubanov
	Released under the MIT license
	More info: http://matreshka.io/#magic
*/
var matreshka_dir_core_var_core, matreshka_dir_core_util_common, matreshka_dir_core_var_map, matreshka_dir_core_bindings_binders, matreshka_dir_core_dom_lib_bquery, matreshka_dir_core_dom_lib_dollar_lib, matreshka_dir_core_dom_lib_used_lib, matreshka_dir_core_initmk, matreshka_dir_core_definespecial, matreshka_dir_core_util_define, matreshka_dir_core_util_linkprops, matreshka_dir_core_util_mediate, matreshka_dir_core_get_set_remove, matreshka_dir_core_bindings_bindnode, matreshka_dir_core_bindings_unbindnode, matreshka_dir_core_bindings_parsebindings, matreshka_dir_core_bindings_getnodes, matreshka_dir_core_var_domevtreg, matreshka_dir_core_events_trigger, matreshka_dir_core_events_on, matreshka_dir_core_events_off, matreshka_dir_core_var_specialevtreg, matreshka_dir_core_events_addlistener, matreshka_dir_core_events_removelistener, matreshka_dir_core_events_delegatelistener, matreshka_dir_core_events_undelegatelistener, matreshka_dir_core_events_domevents, matreshka_dir_core_events_adddomlistener, matreshka_dir_core_events_removedomlistener, matreshka_dir_core_events_once, matreshka_dir_core_events_ondebounce, matreshka_magic;
matreshka_dir_core_var_core = {};
matreshka_dir_core_util_common = function (core) {
  var extend = function (o1, o2) {
      var i, j;
      if (o1) {
        for (i = 1; i < arguments.length; i++) {
          o2 = arguments[i];
          if (o2) {
            for (j in o2) {
              if (o2.hasOwnProperty(j)) {
                o1[j] = o2[j];
              }
            }
          }
        }
      }
      return o1;
    }, util = {
      extend: extend,
      trim: function (s) {
        return s.trim ? s.trim() : s.replace(/^\s+|\s+$/g, '');
      },
      randomString: function () {
        return (new Date().getTime() - new Date(2013, 4, 3).getTime()).toString(36) + Math.floor(Math.random() * 1679616).toString(36);
      },
      toArray: function (object, start) {
        var array = [], l = object.length, i;
        start = start || 0;
        for (i = start; i < l; i++) {
          array[i - start] = object[i];
        }
        return array;
      },
      debounce: function (f, d, thisArg) {
        var timeout;
        if (typeof d !== 'number') {
          thisArg = d;
          d = 0;
        }
        return function () {
          var args = arguments, ctx = this;
          clearTimeout(timeout);
          timeout = setTimeout(function () {
            f.apply(thisArg || ctx, args);
          }, d || 0);
        };
      },
      each: function (o, f, thisArg) {
        if (!o)
          return;
        if (o.isMK && typeof o.each == 'function') {
          o.each(f, thisArg);
        } else if ('length' in o) {
          [].forEach.call(o, f, thisArg);
        } else {
          for (var i in o) {
            if (o.hasOwnProperty(i)) {
              f.call(thisArg, o[i], i, o);
            }
          }
        }
        return o;
      },
      deepFind: function (obj, path) {
        var paths = typeof path == 'string' ? path.split('.') : path, current = obj, i;
        for (i = 0; i < paths.length; ++i) {
          if (typeof current[paths[i]] == 'undefined') {
            return undefined;
          } else {
            current = current[paths[i]];
          }
        }
        return current;
      },
      noop: function () {
      },
      orderBy: function (arr, keys, orders) {
        var defaultOrder = 'asc', newArr, length, i, commonOrder;
        if ('length' in arr && typeof arr == 'object') {
          if (!(orders instanceof Array)) {
            commonOrder = orders || defaultOrder;
          }
          length = arr.length;
          newArr = Array(length);
          for (i = 0; i < length; i++) {
            newArr[i] = arr[i];
          }
          if (!keys)
            return newArr;
          keys = keys instanceof Array ? keys : [keys];
          return newArr.sort(function (a, b) {
            var length = keys.length, i, order, key;
            if (a && b) {
              for (i = 0; i < length; i++) {
                key = keys[i];
                order = (commonOrder || orders[i]) != 'desc' ? -1 : 1;
                if (a[key] > b[key]) {
                  return -order;
                } else if (a[key] < b[key]) {
                  return order;
                }
              }
            }
            return 0;
          });
        } else {
          return [];
        }
      }
    };
  function PseudoMap() {
  }
  extend(PseudoMap.prototype, {
    get: function (obj) {
      return obj.matreshkaData;
    },
    set: function (obj, data) {
      Object.defineProperty(obj, 'matreshkaData', {
        value: data,
        enumerable: false,
        writable: false,
        configurable: false
      });
    },
    has: function (obj) {
      return 'matreshkaData' in obj;
    }
  });
  util.PseudoMap = PseudoMap;
  extend(core, util);
  return util;
}(matreshka_dir_core_var_core);
matreshka_dir_core_var_map = function (util) {
  var mkId = 'mk-' + util.randomString();
  return typeof WeakMap == 'undefined' ? new util.PseudoMap() : new WeakMap();
}(matreshka_dir_core_util_common);
matreshka_dir_core_bindings_binders = function (core) {
  var readFiles = function (files, readAs, callback) {
      var length = files.length, i = 0, filesArray = core.toArray(files), file;
      if (readAs) {
        filesArray.forEach(function (file) {
          var reader = new FileReader();
          reader.onloadend = function (evt) {
            file.readerResult = reader.result;
            if (++i == length) {
              callback(filesArray);
            }
          };
          reader[readAs](file);
        });
      } else {
        callback(filesArray);
      }
    }, getReadAs = function (readAs) {
      /* istanbul ignore if  */
      if (typeof FileReader == 'undefined') {
        throw Error('FileReader is not supported by this browser');
      }
      if (readAs) {
        readAs = 'readAs' + readAs[0].toUpperCase() + readAs.slice(1);
        if (!FileReader.prototype[readAs]) {
          throw Error(readAs + ' is not supported by FileReader');
        }
      }
      return readAs;
    }, binders;
  core.binders = binders = {
    innerHTML: function () {
      return {
        on: 'input',
        getValue: function () {
          return this.innerHTML;
        },
        setValue: function (v) {
          this.innerHTML = v + '';
        }
      };
    },
    innerText: function () {
      return {
        on: 'input',
        getValue: function () {
          return this.textContent;
        },
        setValue: function (v) {
          this.textContent = v + '';
        }
      };
    },
    className: function (className) {
      var not = className.indexOf('!') === 0;
      if (not) {
        className = className.replace('!', '');
      }
      return {
        on: null,
        getValue: function () {
          var _this = this, contains = _this.classList ? _this.classList.contains(className) : hasClass(_this, className);
          return not ? !contains : !!contains;
        },
        setValue: function (v) {
          var _this = this, add = not ? !v : !!v;
          _this.classList ? _this.classList[add ? 'add' : 'remove'](className) : add ? addClass(_this, className) : removeClass(_this, className);
        }
      };
      // @IE9
      // thanks to Iliya Kantor
      function addClass(o, c) {
        var re = new RegExp('(^|\\s)' + c + '(\\s|$)', 'g');
        if (re.test(o.className))
          return;
        o.className = (o.className + ' ' + c).replace(/\s+/g, ' ').replace(/(^ | $)/g, '');
      }
      function removeClass(o, c) {
        var re = new RegExp('(^|\\s)' + c + '(\\s|$)', 'g');
        o.className = o.className.replace(re, '$1').replace(/\s+/g, ' ').replace(/(^ | $)/g, '');
      }
      function hasClass(o, c) {
        return new RegExp('(\\s|^)' + c + '(\\s|$)').test(o.className);
      }
    },
    property: function (propertyName) {
      return {
        on: null,
        getValue: function () {
          return this[propertyName];
        },
        setValue: function (v) {
          // in case when you're trying to set read-only property
          try {
            this[propertyName] = v;
          } catch (e) {
          }
        }
      };
    },
    attribute: function (attributeName) {
      return {
        on: null,
        getValue: function () {
          return this.getAttribute(attributeName);
        },
        setValue: function (v) {
          this.setAttribute(attributeName, v);
        }
      };
    },
    dataset: function (prop) {
      // replace namesLikeThis with names-like-this
      function toDashed(name) {
        return 'data-' + name.replace(/([A-Z])/g, function (u) {
          return '-' + u.toLowerCase();
        });
      }
      return {
        on: null,
        getValue: function () {
          var _this = this;
          return _this.dataset ? _this.dataset[prop] : _this.getAttribute(toDashed(prop));
        },
        setValue: function (v) {
          var _this = this;
          if (_this.dataset) {
            _this.dataset[prop] = v;
          } else {
            _this.setAttribute(toDashed(prop), v);
          }
        }
      };
    },
    textarea: function () {
      return binders.input('text');
    },
    progress: function () {
      return binders.input();
    },
    input: function (type, options) {
      var on;
      switch (type) {
      case 'checkbox':
        return {
          on: 'click keyup',
          getValue: function () {
            return this.checked;
          },
          setValue: function (v) {
            this.checked = v;
          }
        };
      case 'radio':
        return {
          on: 'click keyup',
          getValue: function () {
            return this.value;
          },
          setValue: function (v) {
            this.checked = typeof v != 'undefined' && this.value == v;
          }
        };
      case 'submit':
      case 'button':
      case 'image':
      case 'reset':
        return {};
      case 'hidden':
        on = null;
        break;
      case 'file':
        on = 'change';
        break;
      /*
      case 'text':
      case 'password':
      case 'date':
      case 'datetime':
      case 'datetime-local':
      case 'month':
      case 'time':
      case 'week':
      case 'range':
      case 'color':
      case 'search':
      case 'email':
      case 'tel':
      case 'url':
                  case 'file':
      case 'number':  */
      default:
        // other future (HTML6+) inputs
        on = 'input';
      }
      return {
        on: on,
        getValue: function () {
          return this.value;
        },
        setValue: function (v) {
          this.value = v;
        }
      };
    },
    output: function () {
      return {
        on: null,
        getValue: function () {
          var _this = this;
          return _this.value || _this.textContent;
        },
        setValue: function (v) {
          var _this = this;
          _this['form' in _this ? 'value' : 'textContent'] = v === null ? '' : v + '';
        }
      };
    },
    select: function (multiple) {
      var i;
      if (multiple) {
        return {
          on: 'change',
          getValue: function () {
            var i = 0, options = this.options, result = [];
            for (; options.length > i; i++) {
              if (options[i].selected) {
                result.push(options[i].value);
              }
            }
            return result;
          },
          setValue: function (v) {
            v = typeof v == 'string' ? [v] : v;
            for (i = this.options.length - 1; i >= 0; i--) {
              this.options[i].selected = ~v.indexOf(this.options[i].value);
            }
          }
        };
      } else {
        return {
          on: 'change',
          getValue: function () {
            return this.value;
          },
          setValue: function (v) {
            var _this = this, options;
            _this.value = v;
            if (!v) {
              options = _this.options;
              for (i = options.length - 1; i >= 0; i--) {
                if (!options[i].value) {
                  options[i].selected = true;
                }
              }
            }
          }
        };
      }
    },
    display: function (value) {
      value = typeof value == 'undefined' ? true : value;
      return {
        on: null,
        getValue: function () {
          var _this = this, v = _this.style.display || (window.getComputedStyle ? getComputedStyle(_this, null).getPropertyValue('display') : _this.currentStyle.display), none = v == 'none';
          return value ? !none : !!none;
        },
        setValue: function (v) {
          this.style.display = value ? v ? '' : 'none' : v ? 'none' : '';
        }
      };
    },
    style: function (property) {
      return {
        on: null,
        getValue: function () {
          var _this = this;
          return _this.style[property] || getComputedStyle(_this, null).getPropertyValue(property);
        },
        setValue: function (v) {
          this.style[property] = v;
        }
      };
    },
    file: function (readAs) {
      readAs = getReadAs(readAs);
      return {
        on: function (callback) {
          this.addEventListener('change', function () {
            var files = this.files;
            if (files.length) {
              readFiles(files, readAs, callback);
            } else {
              callback([]);
            }
          });
        },
        getValue: function (evt) {
          var files = evt.domEvent || [];
          return this.multiple ? files : files[0] || null;
        },
        setValue: null
      };
    },
    dropFiles: function (readAs) {
      readAs = getReadAs(readAs);
      return {
        on: function (callback) {
          this.addEventListener('drop', function (evt) {
            evt.preventDefault();
            var files = evt.dataTransfer.files;
            if (files.length) {
              readFiles(files, readAs, callback);
            } else {
              callback([]);
            }
          });
          this.addEventListener('dragover', function (evt) {
            evt.preventDefault();
            evt.dataTransfer.dropEffect = 'copy';
          });
        },
        getValue: function (o) {
          return o.domEvent || [];
        },
        setValue: null
      };
    },
    dragOver: function () {
      return {
        on: 'dragover dragenter dragleave dragend drop',
        getValue: function (evt) {
          var eventType = evt.domEvent && evt.domEvent.type;
          return eventType == 'dragover' || eventType == 'dragenter';
        },
        setValue: null
      };
    }
  };
  binders.visibility = binders.display;
  binders.html = binders.innerHTML;
  binders.text = binders.innerText;
  binders.prop = binders.property;
  binders.attr = binders.attribute;
  return binders;
}(matreshka_dir_core_var_core);
matreshka_dir_core_dom_lib_bquery = function () {
  /* istanbul ignore if  */
  if (typeof window == 'undefined') {
    return;
  }
  var s_classList = 'classList', nsReg = /\.(.+)/, allEvents = {}, nodeIndex = 0, fn = [];
  function $b(s, context) {
    return new $b.i(s, context);
  }
  $b.i = function (s, context) {
    var result, l, i;
    if (s) {
      if (s.nodeType || s == window) {
        result = [s];
      } else if (typeof s == 'string') {
        if (/</.test(s)) {
          result = $b.parseHTML(s);
        } else {
          if (context) {
            if (context = $b(context)[0]) {
              result = context.querySelectorAll(s);
            }
          } else {
            result = document.querySelectorAll(s);
          }
        }
      } else if (s instanceof Function) {
        // typeof nodeList returns "function" in old WebKit
        if (document.readyState == 'loading') {
          document.addEventListener('DOMContentLoaded', s);
        } else {
          s();
        }
      } else {
        result = s;
      }
    }
    l = result && result.length;
    if (l) {
      for (i = 0; i < l; i++) {
        this.push(result[i]);
      }
    }
  };
  $b.fn = $b.i.fn = $b.i.prototype = fn;
  $b.extend = function (obj) {
    var k = arguments, i, j, l;
    for (i = 1; i < k.length; i++) {
      if (l = k[i]) {
        for (j in l) {
          obj[j] = l[j];
        }
      }
    }
    return obj;
  };
  $b.extend(fn, {
    is: function (s) {
      var node = this[0];
      return node ? (node.matches || node.webkitMatchesSelector || node.mozMatchesSelector || node.msMatchesSelector || node.oMatchesSelector).call(node, s) : false;
    },
    on: function (names, selector, handler) {
      var _this = this, delegate, name, namespace, node, nodeID, events, event, exist, i, j, k;
      if (typeof selector == 'function') {
        handler = selector;
        selector = null;
      }
      if (selector) {
        delegate = function (evt) {
          var randomID = 'x' + String(Math.random()).split('.')[1], node = this, scopeSelector, is;
          node.setAttribute(randomID, randomID);
          scopeSelector = '[' + randomID + '="' + randomID + '"] ';
          is = selector.split(',').map(function (sel) {
            return scopeSelector + sel + ',' + scopeSelector + sel + ' *';
          }).join(',');
          if ($b(evt.target).is(is)) {
            handler.call(node, evt);
          }
          node.removeAttribute(randomID);
        };
      }
      names = names.split(/\s/);
      for (i = 0; i < names.length; i++) {
        name = names[i].split(nsReg);
        namespace = name[1];
        name = name[0];
        for (j = 0; j < _this.length; j++) {
          node = _this[j];
          nodeID = node.b$ = node.b$ || ++nodeIndex, events = allEvents[name + nodeID] = allEvents[name + nodeID] || [], exist = false;
          for (k = 0; k < events.length; k++) {
            event = events[k];
            if (handler == event.handler && (!selector || selector == event.selector)) {
              exist = true;
              break;
            }
          }
          if (!exist) {
            events.push({
              delegate: delegate,
              handler: handler,
              namespace: namespace,
              selector: selector
            });
            node.addEventListener(name, delegate || handler, false);
          }
        }
      }
      return _this;
    },
    off: function (names, selector, handler) {
      var _this = this, name, namespace, node, events, event, i, j, k;
      if (typeof selector == 'function') {
        handler = selector;
        selector = null;
      }
      names = names.split(/\s/);
      for (i = 0; i < names.length; i++) {
        name = names[i].split(nsReg);
        namespace = name[1];
        name = name[0];
        for (j = 0; j < _this.length; j++) {
          node = _this[j];
          events = allEvents[name + node.b$];
          if (events) {
            for (k = 0; k < events.length; k++) {
              event = events[k];
              if ((!handler || handler == event.handler || handler == event.delegate) && (!namespace || namespace == event.namespace) && (!selector || selector == event.selector)) {
                node.removeEventListener(name, event.delegate || event.handler);
                events.splice(k--, 1);
              }
            }
          } else {
            if (!namespace && !selector) {
              node.removeEventListener(name, handler);
            }
          }
        }
      }
      return _this;
    },
    add: function (s) {
      var result = $b(this), map = {}, nodeID, node, i;
      s = $b(s);
      for (i = 0; i < result.length; i++) {
        node = result[i];
        nodeID = node.b$ = node.b$ || ++nodeIndex;
        map[nodeID] = 1;
      }
      for (i = 0; i < s.length; i++) {
        node = s[i];
        nodeID = node.b$ = node.b$ || ++nodeIndex;
        if (!map[nodeID]) {
          map[nodeID] = 1;
          result.push(node);
        }
      }
      return result;
    },
    not: function (s) {
      var result = $b(this), index, i;
      s = $b(s);
      for (i = 0; i < s.length; i++) {
        if (~(index = result.indexOf(s[i]))) {
          result.splice(index, 1);
        }
      }
      return result;
    },
    find: function (s) {
      var result = $b();
      this.forEach(function (item) {
        result = result.add($b(s, item));
      });
      return result;
    }
  });
  // simple html parser
  $b.parseHTML = function (html) {
    var node = document.createElement('div'),
      // wrapMap is taken from jQuery
      wrapMap = {
        option: [
          1,
          '<select multiple=\'multiple\'>',
          '</select>'
        ],
        legend: [
          1,
          '<fieldset>',
          '</fieldset>'
        ],
        thead: [
          1,
          '<table>',
          '</table>'
        ],
        tr: [
          2,
          '<table><tbody>',
          '</tbody></table>'
        ],
        td: [
          3,
          '<table><tbody><tr>',
          '</tr></tbody></table>'
        ],
        col: [
          2,
          '<table><tbody></tbody><colgroup>',
          '</colgroup></table>'
        ],
        area: [
          1,
          '<map>',
          '</map>'
        ],
        _: [
          0,
          '',
          ''
        ]
      }, wrapper, i, ex;
    html = html.replace(/^\s+|\s+$/g, '');
    wrapMap.optgroup = wrapMap.option;
    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
    wrapMap.th = wrapMap.td;
    ex = /<([\w:]+)/.exec(html);
    wrapper = ex && wrapMap[ex[1]] || wrapMap._;
    node.innerHTML = wrapper[1] + html + wrapper[2];
    i = wrapper[0];
    while (i--) {
      node = node.children[0];
    }
    return $b(node.childNodes);
  };
  $b.create = function create(tagName, props) {
    var el, i, j, prop;
    if (typeof tagName == 'object') {
      props = tagName;
      tagName = props.tagName;
    }
    el = document.createElement(tagName);
    if (props)
      for (i in props) {
        prop = props[i];
        if (i == 'attributes' && typeof prop == 'object') {
          for (j in prop)
            if (prop.hasOwnProperty(j)) {
              el.setAttribute(j, prop[j]);
            }
        } else if (i == 'tagName') {
          continue;
        } else if (i == 'children' && prop) {
          for (j = 0; j < prop.length; j++) {
            el.appendChild(create(prop[j]));
          }
        } else if (typeof el[i] == 'object' && el[i] !== null && typeof props == 'object') {
          for (j in prop)
            if (prop.hasOwnProperty(j)) {
              el[i][j] = prop[j];
            }
        } else {
          el[i] = prop;
        }
      }
    return el;
  };
  $b.one = function (s, context) {
    return $b(s, context)[0] || null;
  };
  return $b;
}();
matreshka_dir_core_dom_lib_dollar_lib = function ($b) {
  /* istanbul ignore if  */
  if (typeof window == 'undefined') {
    return;
  }
  var neededMethods = 'on off is add not find'.split(/\s/), dollar = typeof window.$ == 'function' ? window.$ : null, useDollar = true, fn, i;
  if (dollar) {
    fn = dollar.fn || dollar.prototype;
    for (i = 0; i < neededMethods.length; i++) {
      if (!fn[neededMethods[i]]) {
        useDollar = false;
        break;
      }
    }
    if (useDollar && !dollar.parseHTML) {
      dollar.parseHTML = $b.parseHTML;
    }
  } else {
    useDollar = false;
  }
  return useDollar ? dollar : $b;
}(matreshka_dir_core_dom_lib_bquery);
matreshka_dir_core_dom_lib_used_lib = function (core, $b, $) {
  core.$ = $ || noop;
  core.$b = core.balalaika = core.bQuery = core.bquery = $b || noop;
  core.useAs$ = function (_$) {
    return core.$ = this.$ = $ = _$;
  };
  /* istanbul ignore next */
  // used as DOM library placeholder in non-browser environment (eg nodejs)
  function noop() {
    return [];
  }
}(matreshka_dir_core_var_core, matreshka_dir_core_dom_lib_bquery, matreshka_dir_core_dom_lib_dollar_lib);
matreshka_dir_core_initmk = function (core, map) {
  var initMK = core.initMK = function (object) {
    if (!map.has(object)) {
      map.set(object, {
        events: {},
        special: {},
        id: 'mk' + Math.random()
      });
    }
    return object;
  };
  return function (object) {
    object._initMK ? object._initMK() : initMK(object);
    return object;
  };
}(matreshka_dir_core_var_core, matreshka_dir_core_var_map);
matreshka_dir_core_definespecial = function (core, map) {
  core._defineSpecial = function (object, key, noAccessors) {
    /* istanbul ignore if  */
    if (!object || typeof object != 'object' || !map.has(object))
      return object;
    var objectData = map.get(object), specialProps = objectData.special[key];
    if (!specialProps) {
      specialProps = objectData.special[key] = {
        $nodes: core.$(),
        value: object[key],
        getter: null,
        setter: null,
        mediator: null
      };
      if (!noAccessors && key != 'sandbox') {
        Object.defineProperty(object, key, {
          configurable: true,
          enumerable: true,
          get: function () {
            return specialProps.getter ? specialProps.getter.call(object) : specialProps.value;
          },
          set: function (v) {
            specialProps.setter ? specialProps.setter.call(object, v) : core.set(object, key, v, { fromSetter: true });
          }
        });
      }
    }
    return specialProps;
  };
}(matreshka_dir_core_var_core, matreshka_dir_core_var_map);
matreshka_dir_core_util_define = function (core, initMK) {
  var _define, defineGetter, defineSetter;
  _define = core.define = function (object, key, descriptor) {
    /* istanbul ignore if  */
    if (!object || typeof object != 'object')
      return object;
    var i;
    if (typeof key == 'object') {
      for (i in key) {
        _define(object, i, key[i]);
      }
      return object;
    }
    Object.defineProperty(object, key, descriptor);
    return object;
  };
  defineGetter = core.defineGetter = function (object, key, getter) {
    /* istanbul ignore if  */
    if (!object || typeof object != 'object')
      return object;
    initMK(object);
    var i, special;
    if (typeof key == 'object') {
      for (i in key)
        if (key.hasOwnProperty(i)) {
          defineGetter(object, i, key[i]);
        }
      return object;
    }
    special = core._defineSpecial(object, key);
    special.getter = function () {
      return getter.call(object, {
        value: special.value,
        key: key,
        self: object
      });
    };
    return object;
  };
  defineSetter = core.defineSetter = function (object, key, setter) {
    /* istanbul ignore if  */
    if (!object || typeof object != 'object')
      return object;
    initMK(object);
    var i;
    if (typeof key == 'object') {
      for (i in key)
        if (key.hasOwnProperty(i)) {
          defineSetter(object, i, key[i]);
        }
      return object;
    }
    core._defineSpecial(object, key).setter = function (v) {
      return setter.call(object, v, {
        value: v,
        key: key,
        self: object
      });
    };
    return object;
  };
}(matreshka_dir_core_var_core, matreshka_dir_core_initmk);
matreshka_dir_core_util_linkprops = function (core, map, initMK, util) {
  var linkProps = core.linkProps = function (object, key, keys, getter, evtOptions) {
    /* istanbul ignore if  */
    if (!object || typeof object != 'object')
      return object;
    initMK(object);
    var optionsType = typeof evtOptions, objectData = map.get(object), _this, _key, _keys, i, j, path, t, setOnInit, onChange;
    onChange = function (evt) {
      var values = [], _protect = evt._protect;
      if (!_protect) {
        _protect = evt._protect = evt._protect || {};
        for (i in evtOptions) {
          evt[i] = evtOptions[i];
        }
      }
      if (!(key + objectData.id in _protect)) {
        if (typeof keys[0] == 'object') {
          for (i = 0; i < keys.length; i += 2) {
            _this = keys[i];
            _keys = typeof keys[i + 1] == 'string' ? keys[i + 1].split(/\s/) : keys[i + 1];
            for (j = 0; j < _keys.length; j++) {
              values.push(util.deepFind(_this, _keys[j]));
            }
          }
        } else {
          for (i = 0; i < keys.length; i++) {
            _key = keys[i];
            _this = object;
            values.push(util.deepFind(_this, _key));
          }
        }
        _protect[evt.key + objectData.id] = 1;
        core._defineSpecial(object, key, evtOptions.hideProperty);
        core.set(object, key, getter.apply(object, values), evt);
      }
    };
    keys = typeof keys == 'string' ? keys.split(/\s+/) : keys;
    // backward compability for setOnInit
    if (optionsType == 'boolean') {
      setOnInit = evtOptions;
    }
    if (optionsType != 'object') {
      evtOptions = {};
    }
    if (optionsType == 'boolean') {
      evtOptions.setOnInit = setOnInit;
    }
    evtOptions.fromDependency = true;
    getter = getter || function (value) {
      return value;
    };
    function getEvtName(path) {
      var evtName, sliceIndex;
      if (path.length > 1) {
        sliceIndex = path.length - 1;
        evtName = path.slice(0, sliceIndex).join('.') + '@' + '_rundependencies:' + path[sliceIndex];
      } else {
        evtName = '_rundependencies:' + path;
      }
      return evtName;
    }
    onChange = evtOptions.debounce ? util.debounce(onChange) : onChange;
    // TODO refactor this shi..
    if (typeof keys[0] == 'object') {
      for (i = 0; i < keys.length; i += 2) {
        _this = initMK(keys[i]);
        _keys = typeof keys[i + 1] == 'string' ? keys[i + 1].split(/\s/) : keys[i + 1];
        for (j = 0; j < _keys.length; j++) {
          path = _keys[j].split('.');
          core[path.length > 1 ? 'on' : '_fastAddListener'](_this, getEvtName(path), onChange);
        }
      }
    } else {
      for (i = 0; i < keys.length; i++) {
        _key = keys[i];
        _this = object;
        path = _key.split('.');
        core[path.length > 1 ? 'on' : '_fastAddListener'](_this, getEvtName(path), onChange);
      }
    }
    evtOptions.setOnInit !== false && onChange.call(typeof keys[0] == 'object' ? keys[0] : object, { key: typeof keys[0] == 'object' ? keys[1] : keys[0] });
    return object;
  };
}(matreshka_dir_core_var_core, matreshka_dir_core_var_map, matreshka_dir_core_initmk, matreshka_dir_core_util_common);
matreshka_dir_core_util_mediate = function (core, initMK) {
  var mediate = core.mediate = function (object, keys, mediator) {
    /* istanbul ignore if  */
    if (!object || typeof object != 'object')
      return object;
    initMK(object);
    var type = typeof keys, i, special;
    if (type == 'object' && !(keys instanceof Array)) {
      for (i in keys) {
        if (keys.hasOwnProperty(i)) {
          core.mediate(object, i, keys[i]);
        }
      }
      return object;
    }
    keys = type == 'string' ? keys.split(/\s/) : keys;
    for (i = 0; i < keys.length; i++)
      (function (key) {
        special = core._defineSpecial(object, key);
        special.mediator = function (v) {
          return mediator.call(object, v, special.value, key, object);
        };
        core.set(object, key, special.mediator(special.value), { fromMediator: true });
      }(keys[i]));
    return object;
  };
  var setClassFor = core.setClassFor = function (object, keys, Class, updateFunction) {
    if (!object || typeof object != 'object')
      return object;
    initMK(object);
    var type = typeof keys, i;
    if (type == 'object' && !(keys instanceof Array)) {
      for (i in keys)
        if (keys.hasOwnProperty(i)) {
          core.setClassFor(object, i, keys[i], Class);
        }
      return object;
    }
    keys = type == 'string' ? keys.split(/\s/) : keys;
    updateFunction = updateFunction || function (instance, data) {
      var i, keys, removeKeys;
      if (instance.isMKArray) {
        instance.recreate(data);
      } else if (instance.isMKObject) {
        keys = instance.keys();
        removeKeys = [];
        for (i = 0; i < keys.length; i++) {
          if (!(keys[i] in data)) {
            removeKeys.push(keys[i]);
          }
        }
        instance.jset(data).removeDataKeys(removeKeys);
      } else {
        for (i in data) {
          if (data.hasOwnProperty(i)) {
            instance[i] = data[i];
          }
        }
      }
    };
    for (i = 0; i < keys.length; i++) {
      core.mediate(object, keys[i], function (v, prevVal, key) {
        var result;
        if (prevVal && (prevVal.instanceOf ? prevVal.instanceOf(Class) : prevVal instanceof Class)) {
          updateFunction.call(object, prevVal, v, key);
          result = prevVal;
        } else {
          result = new Class(v, object, key);
        }
        return result;
      });
    }
    return object;
  };
}(matreshka_dir_core_var_core, matreshka_dir_core_initmk);
matreshka_dir_core_get_set_remove = function (core, map) {
  var set;
  core.get = function (object, key) {
    return object && object[key];
  };
  // set method is the most often used method
  // we need to optimize it as good as possible
  set = core.set = function (object, key, v, evt) {
    /* istanbul ignore if  */
    if (!object || typeof object != 'object')
      return object;
    var type = typeof key, _isNaN = Number.isNaN || function (value) {
        return typeof value == 'number' && isNaN(value);
      }, objectData, special, events, prevVal, newV, i, _evt, isChanged, triggerChange;
    if (type == 'undefined')
      return object;
    if (type == 'object') {
      for (i in key) {
        if (key.hasOwnProperty(i)) {
          set(object, i, key[i], v);
        }
      }
      return object;
    }
    objectData = map.get(object);
    if (!objectData || !objectData.special[key]) {
      object[key] = v;
      return object;
    }
    special = objectData.special[key];
    events = objectData.events;
    prevVal = special.value;
    if (special.mediator && v !== prevVal && (!evt || !evt.skipMediator && !evt.fromMediator)) {
      newV = special.mediator(v, prevVal, key, object);
    } else {
      newV = v;
    }
    isChanged = newV !== prevVal;
    _evt = {
      originalEvent: evt,
      value: newV,
      previousValue: prevVal,
      key: key,
      node: special.$nodes[0] || null,
      $nodes: special.$nodes,
      self: object,
      isChanged: isChanged
    };
    if (evt && typeof evt == 'object') {
      for (i in evt) {
        _evt[i] = _evt[i] || evt[i];
      }
    }
    triggerChange = (isChanged || _evt.force) && !_evt.silent;
    if (triggerChange) {
      events['beforechange:' + key] && core._fastTrigger(object, 'beforechange:' + key, _evt);
      events.beforechange && core._fastTrigger(object, 'beforechange', _evt);
    }
    special.value = newV;
    if (isChanged || _evt.force || _evt.forceHTML || newV !== v && !_isNaN(newV)) {
      if (!_evt.silentHTML) {
        events['_runbindings:' + key] && core._fastTrigger(object, '_runbindings:' + key, _evt);
      }
    }
    if (triggerChange) {
      events['change:' + key] && core._fastTrigger(object, 'change:' + key, _evt);
      events.change && core._fastTrigger(object, 'change', _evt);
    }
    if ((isChanged || _evt.force) && !_evt.skipLinks) {
      events['_rundependencies:' + key] && core._fastTrigger(object, '_rundependencies:' + key, _evt);
    }
    return object;
  };
  core.remove = function (object, key, evt) {
    /* istanbul ignore if  */
    if (!object || typeof object != 'object' || typeof key !== 'string')
      return object;
    var keys = key.split(/\s+/), _evt = { keys: keys }, objectData = map.get(object), exists, i;
    if (evt && typeof evt == 'object') {
      for (i in evt) {
        _evt[i] = evt[i];
      }
    }
    for (i = 0; i < keys.length; i++) {
      key = keys[i];
      exists = key in object;
      if (exists) {
        _evt.key = key;
        _evt.value = object[key];
        delete object[key];
        if (objectData) {
          core.unbindNode(object, key);
          core.off(object, 'change:' + key + ' beforechange:' + key + ' _runbindings:' + key + ' _rundependencies:' + key);
          delete objectData.special[key];
          if (!_evt.silent) {
            core._fastTrigger(object, 'delete', _evt);
            core._fastTrigger(object, 'delete:' + key, _evt);
          }
        }
      }
    }
    return object;
  };
}(matreshka_dir_core_var_core, matreshka_dir_core_var_map);
matreshka_dir_core_bindings_bindnode = function (core, map, initMK, util) {
  var defaultBinders, lookForBinder;
  defaultBinders = core.defaultBinders = [function (node) {
      var tagName = node.tagName, binders = core.binders, b;
      if (tagName == 'INPUT') {
        b = binders.input(node.type);
      } else if (tagName == 'TEXTAREA') {
        b = binders.textarea();
      } else if (tagName == 'SELECT') {
        b = binders.select(node.multiple);
      } else if (tagName == 'PROGRESS') {
        b = binders.progress();
      } else if (tagName == 'OUTPUT') {
        b = binders.output();
      }
      return b;
    }];
  lookForBinder = core.lookForBinder = function (node) {
    var result, ep = defaultBinders, i;
    for (i = 0; i < ep.length; i++) {
      if (result = ep[i].call(node, node)) {
        return result;
      }
    }
  };
  core.bindOptionalNode = function (object, key, node, binder, evt) {
    if (typeof key == 'object') {
      /*
      * this.bindNode({ key: $() }, { on: 'evt' }, { silent: true });
      */
      bindNode(object, key, node, binder, true);
    } else {
      bindNode(object, key, node, binder, evt, true);
    }
    return object;
  };
  var bindSandbox = core.bindSandbox = function (object, node, evt) {
    var $nodes = core.$(node), _evt, special, i;
    initMK(object);
    if (!$nodes.length) {
      throw Error('Binding error: node is missing for "sandbox".' + (typeof node == 'string' ? ' The selector is "' + node + '"' : ''));
    }
    special = core._defineSpecial(object, 'sandbox');
    special.$nodes = special.$nodes.length ? special.$nodes.add($nodes) : $nodes;
    if (object.isMK) {
      object.$sandbox = $nodes;
      object.sandbox = $nodes[0];
      object.$nodes.sandbox = special.$nodes;
      object.nodes.sandbox = special.$nodes[0];
    }
    if (!evt || !evt.silent) {
      _evt = {
        key: 'sandbox',
        $nodes: $nodes,
        node: $nodes[0] || null
      };
      if (evt) {
        for (i in evt) {
          _evt[i] = evt[i];
        }
      }
      core._fastTrigger(object, 'bind:sandbox', _evt);
      core._fastTrigger(object, 'bind', _evt);
    }
    return object;
  };
  var bindNode = core.bindNode = function (object, key, node, binder, evt, optional) {
    /* istanbul ignore if  */
    if (!object || typeof object != 'object')
      return object;
    if (key == 'sandbox') {
      return bindSandbox(object, node, evt, optional);
    }
    initMK(object);
    var objectData = map.get(object), win = typeof window != 'undefined' ? window : null, $nodes, keys, i, special, path, listenKey, changeHandler, _evt;
    /*
     * this.bindNode([['key', $(), {on:'evt'}], [{key: $(), {on: 'evt'}}]], { silent: true });
     */
    if (key instanceof Array) {
      for (i = 0; i < key.length; i++) {
        bindNode(object, key[i][0], key[i][1], key[i][2] || evt, node);
      }
      return object;
    }
    /*
     * this.bindNode('key1 key2', node, binder, { silent: true });
     */
    if (typeof key == 'string' && ~key.indexOf(' ')) {
      keys = key.split(/\s+/);
      if (keys.length > 1) {
        for (i = 0; i < keys.length; i++) {
          bindNode(object, keys[i], node, binder, evt, optional);
        }
        return object;
      }
    }
    /*
     * this.bindNode({ key: $() }, { on: 'evt' }, { silent: true });
     */
    if (typeof key == 'object') {
      for (i in key) {
        if (key.hasOwnProperty(i)) {
          bindNode(object, i, key[i], node, binder, evt);
        }
      }
      return object;
    }
    /*
     * this.bindNode('key', [ node, binder ], { silent: true });
     */
    // node !== win is the most uncommon bugfix ever. Don't ask what does it mean.
    // This is about iframes, CORS and deprecated DOM API.
    if (node && node.length == 2 && node !== win && !node[1].nodeName && (node[1].setValue || node[1].getValue)) {
      return bindNode(object, key, node[0], node[1], binder, optional);
    }
    $nodes = core._getNodes(object, node);
    if (!$nodes.length) {
      if (optional) {
        return object;
      } else {
        throw Error('Binding error: node is missing for "' + key + '".' + (typeof node == 'string' ? ' The selector is "' + node + '"' : ''));
      }
    }
    if ((!evt || evt.deep !== false) && ~key.indexOf('.')) {
      path = key.split('.');
      changeHandler = function (evt) {
        evt = evt && evt.originalEvent;
        var target = evt && evt.value, i;
        if (!target) {
          target = object;
          for (i = 0; i < path.length - 1; i++) {
            target = target[path[i]];
          }
        }
        bindNode(target, path[path.length - 1], $nodes, binder, evt, optional);
        if (evt && evt.previousValue) {
          core.unbindNode(evt.previousValue, path[path.length - 1], $nodes);
        }
      };
      core._delegateListener(object, path.slice(0, path.length - 2).join('.'), 'change:' + path[path.length - 2], changeHandler);
      changeHandler();
      return object;
    }
    evt = evt || {};
    special = core._defineSpecial(object, key);
    special.$nodes = special.$nodes.length ? special.$nodes.add($nodes) : $nodes;
    if (object.isMK) {
      object.$nodes[key] = special.$nodes;
      object.nodes[key] = special.$nodes[0];
    }
    for (i = 0; i < $nodes.length; i++) {
      initBinding(object, objectData, key, $nodes, i, binder, evt, special);
    }
    if (!evt.silent) {
      _evt = {
        key: key,
        $nodes: $nodes,
        node: $nodes[0] || null
      };
      for (i in evt) {
        _evt[i] = evt[i];
      }
      core._fastTrigger(object, 'bind:' + key, _evt);
      core._fastTrigger(object, 'bind', _evt);
    }
    return object;
  };
  function initBinding(object, objectData, key, $nodes, index, binder, evt, special) {
    var options = {
        self: object,
        key: key,
        $nodes: $nodes,
        node: $nodes[0]
      }, node = $nodes[index], isUndefined = typeof special.value == 'undefined', _binder, _evt, foundBinder, _options, i, domEvt, mkHandler, val;
    if (binder === null) {
      _binder = {};
    } else {
      foundBinder = lookForBinder(node);
      if (foundBinder) {
        if (binder) {
          for (i in binder) {
            foundBinder[i] = binder[i];
          }
        }
        _binder = foundBinder;
      } else {
        _binder = binder || {};
      }
    }
    if (_binder.initialize) {
      _options = { value: special.value };
      for (i in options) {
        _options[i] = options[i];
      }
      _binder.initialize.call(node, _options);
    }
    if (_binder.getValue && (isUndefined && evt.assignDefaultValue !== false || evt.assignDefaultValue === true)) {
      _evt = { fromNode: true };
      for (i in evt) {
        _evt[i] = evt[i];
      }
      val = _binder.getValue.call(node, options);
      isUndefined = typeof val == 'undefined';
      core.set(object, key, val, _evt);
    }
    if (_binder.setValue) {
      mkHandler = function (evt) {
        var v = objectData.special[key].value,
          // dirty hack for this one https://github.com/matreshkajs/matreshka/issues/19
          _v = evt && typeof evt.onChangeValue == 'string' && typeof v == 'number' ? v + '' : v, i;
        if (evt && evt.changedNode == node && evt.onChangeValue == _v && evt.binder == _binder)
          return;
        _options = { value: v };
        for (i in options) {
          _options[i] = options[i];
        }
        _binder.setValue.call(node, v, _options);
      };
      if (evt.debounce) {
        mkHandler = util.debounce(mkHandler);
      }
      core._fastAddListener(object, '_runbindings:' + key, mkHandler, null, { node: node });
      !isUndefined && mkHandler();
    }
    if (_binder.getValue && _binder.on) {
      domEvt = {
        node: node,
        on: _binder.on,
        instance: object,
        key: key,
        mkHandler: mkHandler,
        handler: function (evt) {
          if (domEvt.removed)
            return;
          var oldvalue = object[key], value, j, _options = {
              value: oldvalue,
              domEvent: evt,
              originalEvent: evt.originalEvent || evt,
              preventDefault: function () {
                evt.preventDefault();
              },
              stopPropagation: function () {
                evt.stopPropagation();
              },
              which: evt.which,
              target: evt.target
            };
          // hasOwnProperty is not required there
          for (j in options) {
            _options[j] = options[j];
          }
          value = _binder.getValue.call(node, _options);
          if (value !== oldvalue) {
            core.set(object, key, value, {
              fromNode: true,
              changedNode: node,
              onChangeValue: value,
              binder: _binder
            });
          }
        }
      };
      core.domEvents.add(domEvt);
    }
  }
}(matreshka_dir_core_var_core, matreshka_dir_core_var_map, matreshka_dir_core_initmk, matreshka_dir_core_util_common);
matreshka_dir_core_bindings_unbindnode = function (core, map, initMK) {
  var unbindNode = core.unbindNode = function (object, key, node, evt) {
    /* istanbul ignore if  */
    if (!object || typeof object != 'object')
      return object;
    initMK(object);
    var type = typeof key, objectData = map.get(object), special = objectData.special[key], $nodes, keys, i, indexOfDot, path, listenKey, _evt;
    if (key instanceof Array) {
      for (i = 0; i < key.length; i++) {
        evt = node;
        unbindNode(object, key[i][0], key[i][1] || evt, evt);
      }
      return object;
    }
    if (type == 'string') {
      keys = key.split(/\s/);
      if (keys.length > 1) {
        for (i = 0; i < keys.length; i++) {
          unbindNode(object, keys[i], node, evt);
        }
        return object;
      }
      indexOfDot = key.indexOf('.');
      if (~indexOfDot) {
        path = key.split('.');
        var target = object;
        for (i = 0; i < path.length - 1; i++) {
          target = target[path[i]];
        }
        core._undelegateListener(object, path.slice(0, path.length - 2), 'change:' + path[path.length - 2]);
        unbindNode(target, path[path.length - 1], node, evt);
        return object;
      }
    }
    if (key === null) {
      for (key in objectData.special) {
        if (objectData.special.hasOwnProperty(key)) {
          unbindNode(object, key, node, evt);
        }
      }
      return object;
    } else if (type == 'object') {
      for (i in key)
        if (key.hasOwnProperty(i)) {
          unbindNode(object, i, key[i], node);
        }
      return object;
    } else if (!node) {
      if (special && special.$nodes) {
        return unbindNode(object, key, special.$nodes, evt);
      } else {
        return object;
      }
    } else if (node.length == 2 && !node[1].nodeName && (node[1].setValue || node[1].getValue || node[1].on)) {
      // It actually ignores binder. With such a syntax you can assign definite binders to some variable and then easily delete all at once using
      return unbindNode(object, key, node[0], evt);
    } else if (!special) {
      return object;
    }
    $nodes = core._getNodes(object, node);
    for (i = 0; i < $nodes.length; i++) {
      core.domEvents.remove({
        key: key,
        node: $nodes[i],
        instance: object
      });
      special.$nodes = special.$nodes.not($nodes[i]);
      (function (node) {
        core._removeListener(object, '_runbindings:' + key, null, null, {
          node: node,
          howToRemove: function (onData, offData) {
            return onData.node == offData.node;
          }
        });
      }($nodes[i]));
    }
    if (object.isMK) {
      object.$nodes[key] = special.$nodes;
      object.nodes[key] = special.$nodes[0] || null;
      if (key == 'sandbox') {
        object.sandbox = special.$nodes[0] || null;
        object.$sandbox = special.$nodes;
      }
    }
    if (!evt || !evt.silent) {
      _evt = {
        key: key,
        $nodes: $nodes,
        node: $nodes[0] || null
      };
      for (i in evt) {
        _evt[i] = evt[i];
      }
      core._fastTrigger(object, 'unbind:' + key, _evt);
      core._fastTrigger(object, 'unbind', _evt);
    }
    return object;
  };
}(matreshka_dir_core_var_core, matreshka_dir_core_var_map, matreshka_dir_core_initmk);
matreshka_dir_core_bindings_parsebindings = function (core, map, initMK, util) {
  core.parserBrackets = {
    left: '{{',
    right: '}}'
  };
  var parseBindings = core.parseBindings = function (object, nodes) {
    var objectData, $ = core.$, brackets = core.parserBrackets, leftBracket = brackets.left, rightBracket = brackets.right, escLeftBracket = leftBracket.replace(/(\[|\(|\?)/g, '\\$1'), escRightBracket = rightBracket.replace(/(\]|\)|\?)/g, '\\$1'), bindingsReg = new RegExp(escLeftBracket + '(.+?)' + escRightBracket, 'g'), strictBindingsReg = new RegExp('^' + escLeftBracket + '(.+?)' + escRightBracket + '$', 'g');
    /* istanbul ignore if  */
    if (!object || typeof object != 'object')
      return $();
    initMK(object);
    objectData = map.get(object);
    if (typeof nodes == 'string') {
      if (!~nodes.indexOf('<')) {
        nodes = core._getNodes(object, nodes);
      } else {
        if (!~nodes.indexOf(leftBracket)) {
          return $.parseHTML(nodes.replace(/^\s+|\s+$/g, ''));
        } else {
          nodes = $.parseHTML(nodes.replace(/^\s+|\s+$/g, ''));
        }
      }
    } else if (!nodes) {
      nodes = objectData && objectData.special && objectData.special.sandbox && objectData.special.sandbox.$nodes;
      if (!nodes || !nodes.length) {
        return object;
      }
    } else {
      nodes = $(nodes);
    }
    var all = [], k = 0, childNodes, i, j, node, bindHTMLKey, atts, attr, attrValue, attrName, keys, key, binder, previous, textContent, childNode, body, matched;
    function initLink(key, keys, attrValue) {
      var regs = {}, i;
      for (i = 0; i < keys.length; i++) {
        regs[keys[i]] = new RegExp(escLeftBracket + keys[i] + escRightBracket, 'g');
      }
      core.linkProps(object, key, keys, function () {
        var v = attrValue, i;
        for (i = 0; i < keys.length; i++) {
          v = v.replace(regs[keys[i]], arguments[i]);
        }
        return v;
      }, {
        hideProperty: true,
        setOnInit: true
      });
    }
    for (i = 0; i < nodes.length; i++) {
      node = nodes[i];
      // we need 2 if's for old firefoxes
      if (node.outerHTML) {
        // this is for firefox too
        if (!~node.outerHTML.indexOf(leftBracket) && !~node.outerHTML.indexOf(encodeURI(leftBracket))) {
          continue;
        }
      }
      childNodes = node.getElementsByTagName('*');
      for (j = 0; j < childNodes.length; j++) {
        all[k++] = childNodes[j];
      }
      all[k++] = node;
    }
    if (!all.length) {
      return $();
    }
    for (j = 0; j < all.length; j++) {
      node = all[j];
      if (node.tagName != 'TEXTAREA') {
        for (i = 0; i < node.childNodes.length; i++) {
          childNode = node.childNodes[i];
          if (childNode.nodeType == 3 && ~childNode.nodeValue.indexOf(leftBracket)) {
            textContent = childNode.nodeValue.replace(bindingsReg, '<span mk-html="$1"></span>');
            insertHTML(node, childNode, textContent);
            node.removeChild(childNode);
          }
        }
      }
    }
    for (i = 0; i < nodes.length; i++) {
      childNodes = nodes[i].querySelectorAll('[mk-html]');
      for (j = 0; j < childNodes.length; j++) {
        all[k++] = childNodes[j];
      }
    }
    for (i = 0; i < all.length; i++) {
      node = all[i];
      bindHTMLKey = node.getAttribute('mk-html');
      if (bindHTMLKey) {
        node.removeAttribute('mk-html');
        core.bindNode(object, bindHTMLKey, node, {
          setValue: function (v) {
            this.innerHTML = v;
          }
        });
      }
      atts = node.attributes;
      for (j = 0; j < atts.length; j++) {
        attr = atts[j];
        attrValue = attr.value;
        attrName = attr.name;
        matched = attrValue.match(bindingsReg);
        if (matched) {
          keys = matched.map(function (key) {
            return key.replace(bindingsReg, '$1');
          });
          if (keys.length == 1 && strictBindingsReg.test(attrValue)) {
            key = keys[0];
          } else {
            key = core.randomString();
            initLink(key, keys, attrValue);
          }
          if ((attrName == 'value' && node.type != 'checkbox' && node.type != 'radio' || attrName == 'checked' && (node.type == 'checkbox' || node.type == 'radio')) && core.lookForBinder(node)) {
            node.setAttribute(attrName, '');
            core.bindNode(object, key, node);
          } else {
            core.bindNode(object, key, node, core.binders.attr(attrName));
          }
        }
      }
    }
    return nodes;
  };
  function insertHTML(node, childNode, html) {
    var previous = childNode.previousSibling, body;
    try {
      if (previous) {
        previous.insertAdjacentHTML('afterend', html);
      } else {
        node.insertAdjacentHTML('afterbegin', html);
      }
    } catch (e) {
      // in case user uses very old webkit-based browser
      /* istanbul ignore next */
      body = document.body;
      /* istanbul ignore next */
      if (previous) {
        body.appendChild(previous);
        previous.insertAdjacentHTML('afterend', html);
        body.removeChild(previous);
      } else {
        body.appendChild(node);
        node.insertAdjacentHTML('afterbegin', html);
        body.removeChild(node);
      }
    }
  }
}(matreshka_dir_core_var_core, matreshka_dir_core_var_map, matreshka_dir_core_initmk, matreshka_dir_core_util_common);
matreshka_dir_core_bindings_getnodes = function (core, map, initMK, util) {
  var selectAll, boundAll, bound;
  /**
  * @private
  * @summary selectNodes selects nodes match to custom selectors such as :sandbox and :bound(KEY)
  */
  function selectNodes(object, selectors) {
    var objectData = map.get(object), $ = core.$, result = $(), execResult, $bound, node, selector, i, j, random, subSelector, key, selected;
    if (!object || typeof object != 'object' || !objectData)
      return result;
    // replacing :sandbox to :bound(sandbox)
    selectors = selectors.split(',');
    for (i = 0; i < selectors.length; i++) {
      selector = selectors[i];
      if (execResult = /\s*:bound\(([^(]*)\)\s*([\S\s]*)\s*|\s*:sandbox\s*([\S\s]*)\s*/.exec(selector)) {
        key = execResult[3] !== undefined ? 'sandbox' : execResult[1];
        subSelector = execResult[3] !== undefined ? execResult[3] : execResult[2];
        // getting KEY from :bound(KEY)
        $bound = objectData.special[key] && objectData.special[key].$nodes;
        if (!$bound || !$bound.length) {
          continue;
        }
        // if native selector passed after :bound(KEY) is not empty string
        // for example ":bound(KEY) .my-selector"
        if (subSelector) {
          // if native selector contains children selector
          // for example ":bound(KEY) > .my-selector"
          if (subSelector.indexOf('>') === 0) {
            // selecting children
            for (j = 0; j < $bound.length; j++) {
              node = $bound[j];
              random = 'm' + core.randomString();
              node.setAttribute(random, random);
              selected = node.querySelectorAll('[' + random + '="' + random + '"]' + subSelector);
              result = result.add(util.toArray(selected));
              node.removeAttribute(random);
            }
          } else {
            // if native selector doesn't contain children selector
            result = result.add($bound.find(subSelector));
          }
        } else {
          // if native selector is empty string
          result = result.add($bound);
        }  // if it's native selector
      } else {
        result = result.add(selector);
      }
    }
    return result;
  }
  selectAll = core.selectAll = function (object, s) {
    var $sandbox, objectData = map.get(object);
    if (!objectData || typeof s != 'string')
      return core.$();
    if (/:sandbox|:bound\(([^(]*)\)/.test(s)) {
      return selectNodes(object, s);
    } else {
      $sandbox = objectData.special;
      $sandbox = $sandbox && $sandbox.sandbox && $sandbox.sandbox.$nodes;
      return $sandbox && $sandbox.find(s);
    }
  }, core.select = function (object, s) {
    var sandbox, objectData = map.get(object);
    if (!objectData || typeof s != 'string')
      return null;
    if (/:sandbox|:bound\(([^(]*)\)/.test(s)) {
      return selectNodes(object, s)[0] || null;
    } else {
      sandbox = objectData.special;
      sandbox = sandbox && sandbox.sandbox && sandbox.sandbox.$nodes && sandbox.sandbox.$nodes[0];
      return sandbox && sandbox.querySelector(s);
    }
  };
  boundAll = core.boundAll = function (object, key) {
    var $ = core.$, objectData = map.get(object), special, keys, $nodes, i;
    if (!objectData)
      return $();
    if (key && ~key.indexOf('.')) {
      keys = key.split('.');
      key = keys.splice(-1)[0];
      return boundAll(util.deepFind(object, keys), key);
    }
    initMK(object);
    special = objectData.special, key = !key ? 'sandbox' : key;
    keys = typeof key == 'string' ? key.split(/\s+/) : key;
    if (keys.length <= 1) {
      return keys[0] in special ? special[keys[0]].$nodes : $();
    } else {
      $nodes = $();
      for (i = 0; i < keys.length; i++) {
        $nodes = $nodes.add(special[keys[i]].$nodes);
      }
      return $nodes;
    }
  };
  core.$bound = function (object, key) {
    return boundAll(object, key);
  };
  bound = core.bound = function (object, key) {
    var objectData = map.get(object), special, keys, i;
    if (!objectData)
      return null;
    if (key && ~key.indexOf('.')) {
      keys = key.split('.');
      key = keys.splice(-1)[0];
      return bound(util.deepFind(object, keys), key);
    }
    initMK(object);
    special = objectData.special;
    key = !key ? 'sandbox' : key;
    keys = typeof key == 'string' ? key.split(/\s+/) : key;
    if (keys.length <= 1) {
      return keys[0] in special ? special[keys[0]].$nodes[0] || null : null;
    } else {
      for (i = 0; i < keys.length; i++) {
        if (keys[i] in special && special[keys[i]].$nodes.length) {
          return special[keys[i]].$nodes[0];
        }
      }
    }
    return null;
  };
  core._getNodes = function (object, s) {
    return typeof s == 'string' && !/</.test(s) && /:sandbox|:bound\(([^(]*)\)/.test(s) ? selectNodes(object, s) : core.$(s);
  };
}(matreshka_dir_core_var_core, matreshka_dir_core_var_map, matreshka_dir_core_initmk, matreshka_dir_core_util_common);
matreshka_dir_core_var_domevtreg = /([^\:\:]+)(::([^\(\)]+)?(\((.*)\))?)?/;
matreshka_dir_core_events_trigger = function (core, map, utils, domEvtReg) {
  var triggerDOMEvent = function (el, name, args) {
    var doc = document, event;
    if (doc.createEvent) {
      /* istanbul ignore next */
      event = doc.createEvent('Event');
      event.initEvent(name, true, true);
      event.mkArgs = args;
      el.dispatchEvent(event);
    } else if (typeof Event != 'undefined') {
      event = new Event(name, {
        bubbles: true,
        cancelable: true
      });
      event.mkArgs = args;
      el.dispatchEvent(event);
    } else {
      /* istanbul ignore next */
      throw Error('Cannot trigger DOM event');
    }
    return event;
  };
  core.trigger = function (object, names) {
    /* istanbul ignore if  */
    if (!object || typeof object != 'object')
      return object;
    var objectData = map.get(object), allEvents = objectData && objectData.events, args, i, j, l, events, ev, name, executed, nodes, _nodes, selector;
    if (names && allEvents) {
      args = utils.toArray(arguments, 2);
      names = names.split(/\s/);
      for (i = 0; i < names.length; i++) {
        name = names[i];
        if (~name.indexOf('::')) {
          executed = domEvtReg.exec(name);
          nodes = objectData.special[executed[3] || 'sandbox'];
          nodes = nodes && nodes.$nodes;
          _nodes = core.$();
          selector = executed[5];
          if (selector) {
            for (j = 0; j < nodes.length; j++) {
              _nodes = _nodes.add(nodes.find(selector));
            }
          } else {
            _nodes = nodes;
          }
          for (j = 0; j < _nodes.length; j++) {
            triggerDOMEvent(_nodes[i], executed[1], args);
          }
        } else {
          events = allEvents[name];
          if (events) {
            j = -1, l = events.length;
            while (++j < l)
              (ev = events[j]).callback.apply(ev.ctx, args);
          }
        }
      }
    }
    return object;
  };
  core._fastTrigger = function (object, name, evt) {
    var events = map.get(object).events[name], i, l, ev;
    if (events) {
      i = -1, l = events.length;
      while (++i < l)
        (ev = events[i]).callback.call(ev.ctx, evt);
    }
  };
}(matreshka_dir_core_var_core, matreshka_dir_core_var_map, matreshka_dir_core_util_common, matreshka_dir_core_var_domevtreg);
matreshka_dir_core_events_on = function (core, initMK, util) {
  var on = core.on = function (object, names, callback, triggerOnInit, context, evtData) {
    /* istanbul ignore if  */
    if (!object || typeof object != 'object')
      return object;
    initMK(object);
    var t, i, name, path, lastIndexOfET;
    // if event-callback object is passed to the function
    if (typeof names == 'object' && !(names instanceof Array)) {
      for (i in names) {
        if (names.hasOwnProperty(i)) {
          on(object, i, names[i], callback, triggerOnInit);
        }
      }
      return object;
    }
    // callback is required
    if (!callback)
      throw Error('callback is not a function for event(s) "' + names + '"');
    names = names instanceof Array ? names : util.trim(names).replace(/\s+/g, ' ')  // single spaces only
.split(/\s(?![^(]*\))/g)  // split by spaces
;
    // allow to flip triggerOnInit and context
    if (typeof triggerOnInit != 'boolean' && typeof triggerOnInit != 'undefined') {
      t = context;
      context = triggerOnInit;
      triggerOnInit = t;
    }
    for (i = 0; i < names.length; i++) {
      name = names[i];
      // index of @
      lastIndexOfET = name.lastIndexOf('@');
      if (~lastIndexOfET) {
        path = name.slice(0, lastIndexOfET);
        // fallback for older apps
        if (!path) {
          path = '*';
        } else if (~path.indexOf('@')) {
          path = path.replace(/([^@]*)@/g, function ($0, key) {
            return (key || '*') + '.';
          }).replace(/\.$/, '.*') || '*';
        }
        name = name.slice(lastIndexOfET + 1);
        core._delegateListener(object, path, name, callback, context || object, evtData);
      } else {
        core._addListener(object, name, callback, context, evtData);
      }
    }
    // trigger after event is initialized
    if (triggerOnInit === true) {
      callback.call(context || object, { triggeredOnInit: true });
    }
    return object;
  };
}(matreshka_dir_core_var_core, matreshka_dir_core_initmk, matreshka_dir_core_util_common);
matreshka_dir_core_events_off = function (core, initMK, util, map) {
  var off = core.off = function (object, names, callback, context) {
    /* istanbul ignore if  */
    if (!object || typeof object != 'object')
      return object;
    var objectData = map.get(object), i, path, lastIndexOfET, name;
    if (!objectData)
      return object;
    // if event-callback object is passed to the function
    if (typeof names == 'object' && !(names instanceof Array)) {
      for (i in names)
        if (names.hasOwnProperty(i)) {
          off(object, i, names[i], callback);
        }
      return object;
    }
    if (!names && !callback && !context) {
      objectData.events = {};
      return object;
    }
    names = util.trim(names).replace(/\s+/g, ' ')  // single spaces only
.split(/\s(?![^(]*\))/g);
    if (typeof object != 'object') {
      return object;
    }
    for (i = 0; i < names.length; i++) {
      name = names[i];
      // index of @
      lastIndexOfET = name.lastIndexOf('@');
      if (~lastIndexOfET) {
        path = name.slice(0, lastIndexOfET);
        name = name.slice(lastIndexOfET + 1).replace(/@/g, '.');
        core._undelegateListener(object, path, name, callback, context);
      } else {
        core._removeListener(object, name, callback, context);
      }
    }
    return object;
  };
}(matreshka_dir_core_var_core, matreshka_dir_core_initmk, matreshka_dir_core_util_common, matreshka_dir_core_var_map);
matreshka_dir_core_var_specialevtreg = /_rundependencies:|_runbindings:|change:/;
matreshka_dir_core_events_addlistener = function (core, initMK, map, specialEvtReg, domEvtReg) {
  var _addListener;
  core._fastAddListener = function (object, name, callback, context, evtData) {
    var allEvents = map.get(object).events, events = allEvents[name] || (allEvents[name] = []);
    events.push({
      callback: callback,
      context: context,
      ctx: context || object,
      name: name,
      node: evtData && evtData.node
    });
    if (specialEvtReg.test(name)) {
      // define needed accessors for KEY
      core._defineSpecial(object, name.replace(specialEvtReg, ''));
    }
    return object;
  };
  _addListener = core._addListener = function (object, name, callback, context, evtData) {
    /* istanbul ignore if  */
    if (!object || typeof object != 'object')
      return false;
    initMK(object);
    var ctx = context || object, allEvents = map.get(object).events, events = allEvents[name] || (allEvents[name] = []), l = events.length, defaultEvtData = {
        callback: callback,
        //_callback: callback._callback || callback,
        context: context,
        ctx: ctx,
        //howToRemove: null,
        name: name
      }, i, ev, _evtData, executed;
    for (i = 0; i < l; i++) {
      ev = events[i];
      if ((ev.callback == callback || ev.callback == callback._callback) && ev.context == context) {
        return false;
      }
    }
    if (evtData) {
      _evtData = {};
      for (i in evtData) {
        _evtData[i] = evtData[i];
      }
      for (i in defaultEvtData) {
        _evtData[i] = defaultEvtData[i];
      }
    } else {
      _evtData = defaultEvtData;
    }
    events.push(_evtData);
    executed = domEvtReg.exec(name);
    if (executed && executed[2]) {
      core._addDOMListener(object, executed[3] || 'sandbox', executed[1], executed[5], callback, ctx, _evtData);
    } else if (specialEvtReg.test(name)) {
      // define needed accessors for KEY
      core._defineSpecial(object, name.replace(specialEvtReg, ''));
    }
    core._fastTrigger(object, 'addevent:' + name, _evtData);
    core._fastTrigger(object, 'addevent', _evtData);
    return true;
  };
}(matreshka_dir_core_var_core, matreshka_dir_core_initmk, matreshka_dir_core_var_map, matreshka_dir_core_var_specialevtreg, matreshka_dir_core_var_domevtreg);
matreshka_dir_core_events_removelistener = function (core, map) {
  var domEvtNameRegExp = /([^\:\:]+)(::([^\(\)]+)(\((.*)\))?)?/;
  core._removeListener = function (object, name, callback, context, evtData) {
    /* istanbul ignore if  */
    if (!object || typeof object != 'object')
      return object;
    var objectData = map.get(object), j = 0, l, events, retain, evt, i, executed, howToRemove, removeEvtData;
    if (!objectData)
      return object;
    events = objectData.events[name] || [];
    retain = objectData.events[name] = [];
    l = events.length;
    evtData = evtData || {};
    executed = domEvtNameRegExp.exec(name);
    if (executed && executed[2]) {
      core._removeDOMListener(object, executed[3], executed[1], executed[5], callback, context);
    } else {
      for (i = 0; i < l; i++) {
        evt = events[i];
        howToRemove = evt.howToRemove || evtData.howToRemove;
        if (howToRemove ? !howToRemove(evt, evtData) : callback && (callback !== evt.callback && callback._callback !== evt.callback) || context && context !== evt.context) {
          retain[j++] = evt;
        } else {
          removeEvtData = {
            name: name,
            callback: evt.callback,
            context: evt.context
          };
          core._fastTrigger(object, 'removeevent:' + name, removeEvtData);
          core._fastTrigger(object, 'removeevent', removeEvtData);
        }
      }
      if (!retain.length) {
        delete objectData.events[name];
      }
    }
    return object;
  };
}(matreshka_dir_core_var_core, matreshka_dir_core_var_map);
matreshka_dir_core_events_delegatelistener = function (core, initMK, map, specialEvtReg) {
  var _delegateListener = core._delegateListener = function (object, path, name, callback, context, evtData) {
    /* istanbul ignore if  */
    if (!object || typeof object != 'object')
      return object;
    initMK(object);
    var objectData = map.get(object), executed = /([^\.]+)\.(.*)/.exec(path), f, firstKey = executed ? executed[1] : path, changeKey, obj;
    path = executed ? executed[2] : '';
    evtData = evtData || {};
    if (firstKey) {
      if (firstKey == '*') {
        if (object.isMKArray) {
          f = function (evt) {
            (evt && evt.added ? evt.added : object).forEach(function (item) {
              item && _delegateListener(item, path, name, callback, context, evtData);
            });
          };
          f._callback = callback;
          core._addListener(object, 'add', f, context, evtData);
          f();
        } else if (object.isMKObject) {
          f = function (evt) {
            var target = object[evt.key];
            if (target && evt && evt.key in objectData.keys) {
              _delegateListener(target, path, name, callback, context, evtData);
            }
          };
          object.each(function (item) {
            _delegateListener(item, path, name, callback, context, evtData);
          });
          f._callback = callback;
          core._addListener(object, 'change', f, context, evtData);
        }  /* else {
           	throw Error('"*" events are only allowed for MK.Array and MK.Object');
           }*/
      } else {
        f = function (evt) {
          if (evt && evt._silent)
            return;
          var target = object[firstKey], changeKey, triggerChange = true, i, changeEvents;
          evtData.path = path;
          evtData.previousValue = evt && evt.previousValue || evtData.previousValue && evtData.previousValue[firstKey];
          if (evt && evt.previousValue && map.has(evt.previousValue)) {
            core._undelegateListener(evt.previousValue, path, name, callback, context, evtData);
          }
          if (typeof target == 'object' && target) {
            _delegateListener(target, path, name, callback, context, evtData);
          }
          if (specialEvtReg.test(name)) {
            changeKey = name.replace(specialEvtReg, '');
            if (!path && evtData.previousValue && evtData.previousValue[changeKey] !== target[changeKey]) {
              changeEvents = map.get(evtData.previousValue).events[name];
              if (changeEvents) {
                for (i = 0; i < changeEvents.length; i++) {
                  if (changeEvents[i].path === path) {
                    triggerChange = false;
                  }
                }
              }
              if (triggerChange) {
                core.set(target, changeKey, target[changeKey], {
                  force: true,
                  previousValue: evtData.previousValue[changeKey],
                  previousObject: evtData.previousValue,
                  _silent: true
                });
              }
            }
          }
        };
        f._callback = callback;
        core._addListener(object, 'change:' + firstKey, f, context, evtData);
        f();
      }
    } else {
      core._addListener(object, name, callback, context, evtData);
    }
  };
}(matreshka_dir_core_var_core, matreshka_dir_core_initmk, matreshka_dir_core_var_map, matreshka_dir_core_var_specialevtreg);
matreshka_dir_core_events_undelegatelistener = function (core, map) {
  var _undelegateListener = core._undelegateListener = function (object, path, name, callback, context, evtData) {
    /* istanbul ignore if  */
    if (!object || typeof object != 'object')
      return object;
    var executed = /([^\.]+)\.(.*)/.exec(path), firstKey = executed ? executed[1] : path, p = path, objectData = map.get(object), events, i;
    path = executed ? executed[2] : '';
    if (firstKey) {
      if (firstKey == '*') {
        if (object.isMKArray) {
          if (callback) {
            _undelegateListener(object, path, 'add', callback, context, evtData);
          } else {
            events = objectData.events.add || [];
            for (i = 0; i < events.length; i++) {
              if (events[i].path == p) {
                _undelegateListener(object, path, 'add', events[i].callback);
              }
            }
          }
          object.forEach(function (item) {
            item && _undelegateListener(item, path, name, callback, context);
          });
        } else if (object.isMKObject) {
          if (callback) {
            _undelegateListener(object, path, 'change', callback, context);
          } else {
            events = objectData.events.change || [];
            for (i = 0; i < events.length; i++) {
              if (events[i].path == p) {
                _undelegateListener(object, path, 'change', events[i].callback);
              }
            }
          }
          object.each(function (item) {
            item && _undelegateListener(item, path, name, callback, context);
          });
        }
      } else {
        if (callback) {
          core._removeListener(object, 'change:' + firstKey, callback, context, evtData);
        } else {
          events = objectData.events['change:' + firstKey] || [];
          for (i = 0; i < events.length; i++) {
            if (events[i].path == p) {
              core._removeListener(object, 'change:' + firstKey, events[i].callback);
            }
          }
        }
        if (typeof object[firstKey] == 'object') {
          _undelegateListener(object[firstKey], path, name, callback, context, evtData);
        }
      }
    } else {
      core._removeListener(object, name, callback, context, evtData);
    }
  };
}(matreshka_dir_core_var_core, matreshka_dir_core_var_map);
matreshka_dir_core_events_domevents = function (core, map) {
  var list = {};
  /**
  * @private
  * @since 0.0.4
  * @todo optimize
  * @summary This object is used to map DOM nodes and their DOM events
  */
  core.domEvents = {
    // adds events to the map
    add: function (o) {
      var $ = core.$, objectData = map.get(o.instance);
      if (o.node) {
        if (typeof o.on == 'function') {
          o.on.call(o.node, o.handler);
        } else {
          $(o.node).on(o.on.split(/\s+/).join('.mk ') + '.mk', o.handler);
        }
      }
      (list[objectData.id] = list[objectData.id] || []).push(o);
    },
    // removes events from the map
    remove: function (o) {
      var objectData = map.get(o.instance), evts = list[objectData.id], $ = core.$, evt, i;
      if (!evts)
        return;
      for (i = 0; i < evts.length; i++) {
        evt = evts[i];
        if (evt.node !== o.node)
          continue;
        // remove Matreshka event
        evt.mkHandler && core._removeListener(o.instance, '_runbindings:' + o.key, evt.mkHandler);
        // remove DOM event
        if (typeof evt.on == 'string') {
          $(o.node).off(evt.on + '.mk', evt.handler);
        }
        evt.removed = true;
        list[objectData.id].splice(i--, 1);
      }
    }
  };
}(matreshka_dir_core_var_core, matreshka_dir_core_var_map);
matreshka_dir_core_events_adddomlistener = function (core, initMK, map) {
  core._addDOMListener = function (object, key, domEvtName, selector, callback, context, evtData) {
    /* istanbul ignore if  */
    if (!object || typeof object != 'object')
      return object;
    initMK(object);
    selector = selector || null;
    evtData = evtData || {};
    var objectData = map.get(object), domEvtHandler = function (domEvt) {
        var node = this, $ = core.$, $nodes = $(node), mkArgs = domEvt.originalEvent ? domEvt.originalEvent.mkArgs : domEvt.mkArgs, evt = {
            self: object,
            node: node,
            $nodes: $nodes,
            key: key,
            domEvent: domEvt,
            originalEvent: domEvt.originalEvent || domEvt,
            preventDefault: function () {
              domEvt.preventDefault();
            },
            stopPropagation: function () {
              domEvt.stopPropagation();
            },
            which: domEvt.which,
            target: domEvt.target
          }, randomID, is;
        callback.apply(context, mkArgs ? mkArgs : [evt]);
      }, fullEvtName = domEvtName + '.' + objectData.id + key, bindHandler = function (evt) {
        evt && evt.$nodes && evt.$nodes.on(fullEvtName, selector, domEvtHandler);
      }, unbindHandler = function (evt) {
        evt && evt.$nodes && evt.$nodes.off(fullEvtName, selector, domEvtHandler);
      };
    domEvtHandler._callback = callback;
    core._defineSpecial(object, key);
    bindHandler._callback = unbindHandler._callback = callback;
    if (core._addListener(object, 'bind:' + key, bindHandler, context, evtData) && core._addListener(object, 'unbind:' + key, unbindHandler, context, evtData)) {
      bindHandler({ $nodes: objectData.special[key] && objectData.special[key].$nodes });
    }
    return object;
  };
}(matreshka_dir_core_var_core, matreshka_dir_core_initmk, matreshka_dir_core_var_map);
matreshka_dir_core_events_removedomlistener = function (core, map) {
  core._removeDOMListener = function (object, key, domEvtName, selector, callback, context, evtData) {
    /* istanbul ignore if  */
    if (!object || typeof object != 'object')
      return object;
    var objectData = map.get(object);
    if (!objectData)
      return object;
    selector = selector || null;
    evtData = evtData || {};
    if (key && objectData.special[key]) {
      objectData.special[key].$nodes.off(domEvtName + '.' + objectData.id + key, selector, callback);
      core._removeListener(object, 'bind:' + key, callback, context, evtData);
      core._removeListener(object, 'unbind:' + key, callback, context, evtData);
    }
    return object;
  };
}(matreshka_dir_core_var_core, matreshka_dir_core_var_map);
matreshka_dir_core_events_once = function (core, initMK) {
  var once = core.once = function (object, names, callback, context, evtData) {
    var i;
    /* istanbul ignore if  */
    if (!object || typeof object != 'object')
      return object;
    if (typeof names == 'object') {
      for (i in names)
        if (names.hasOwnProperty(i)) {
          once(object, i, names[i], callback, context);
        }
      return object;
    }
    if (!callback)
      throw Error('callback is not function for event "' + names + '"');
    initMK(object);
    names = names.split(/\s+/);
    for (i = 0; i < names.length; i++) {
      (function (name) {
        var once = function (func) {
          var ran = false, memo;
          return function () {
            if (ran)
              return memo;
            ran = true;
            memo = func.apply(this, arguments);
            func = null;
            return memo;
          };
        }(callback);
        once._callback = callback;
        core.on(object, name, once, context);
      }(names[i]));
    }
    return object;
  };
}(matreshka_dir_core_var_core, matreshka_dir_core_initmk);
matreshka_dir_core_events_ondebounce = function (core, initMK, util) {
  var onDebounce = core.onDebounce = function (object, names, callback, debounceDelay, triggerOnInit, context, evtData) {
    /* istanbul ignore if  */
    if (!object || typeof object != 'object')
      return object;
    var cbc, i;
    if (typeof names == 'object') {
      for (i in names)
        if (names.hasOwnProperty(i)) {
          onDebounce(object, i, names[i], callback, debounceDelay, triggerOnInit, context);
        }
      return object;
    }
    // flip args
    if (typeof debounceDelay != 'number') {
      evtData = context;
      context = triggerOnInit;
      triggerOnInit = debounceDelay;
      debounceDelay = 0;
    }
    cbc = util.debounce(callback, debounceDelay);
    // set reference to real callback for .off method
    cbc._callback = callback;
    return core.on(object, names, cbc, triggerOnInit, context, evtData);
  };
}(matreshka_dir_core_var_core, matreshka_dir_core_initmk, matreshka_dir_core_util_common);
matreshka_magic = function (core, map) {
  core.map = map;
  return core;
}(matreshka_dir_core_var_core, matreshka_dir_core_var_map);
 matreshka_magic.version="1.9.1";									(function () {
			// hack for systemjs builder
			var d = "define";
			// I don't know how to define modules with no dependencies (since we use AMDClean)
			// so I have to hack it, unfortunatelly
			if (typeof __root != 'undefined') {
				/* global matreshka, balalaika, matreshka_magic, xclass, __root */
				if (typeof define == 'function' && define.amd) {
					if (__root[d]) {
						__root[d]('matreshka-magic', function() {
							return matreshka_magic;
						});
					}
					define(function() {
						return matreshka_magic;
					});
				} else if (typeof exports == "object") {
					module.exports = matreshka_magic;
				} else {
					__root.magic = __root.MatreshkaMagic = matreshka_magic;
				}
			}
		})()								})(typeof window != "undefined" ? window : Function("return this")());