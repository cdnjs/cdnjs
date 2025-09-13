(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('inferno'), require('stream')) :
    typeof define === 'function' && define.amd ? define(['exports', 'inferno', 'stream'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.Inferno = global.Inferno || {}, global.Inferno.Server = global.Inferno.Server || {}), global.Inferno, global.stream));
})(this, (function (exports, inferno, stream) { 'use strict';

    var ERROR_MSG = 'a runtime error occured! Use Inferno in development environment to find the error.';
    var isArray = Array.isArray;
    function isStringOrNumber(o) {
      var type = typeof o;
      return type === 'string' || type === 'number';
    }
    function isNullOrUndef(o) {
      return o === void 0 || o === null;
    }
    function isInvalid(o) {
      return o === null || o === false || o === true || o === void 0;
    }
    function isFunction(o) {
      return typeof o === 'function';
    }
    function isString(o) {
      return typeof o === 'string';
    }
    function isNumber(o) {
      return typeof o === 'number';
    }
    function isNull(o) {
      return o === null;
    }
    function isUndefined(o) {
      return o === void 0;
    }
    function throwError(message) {
      if (!message) {
        message = ERROR_MSG;
      }
      throw new Error("Inferno Error: " + message);
    }

    function parseStyleAsString(styles) {
      if (isString(styles)) {
        return styles;
      } else {
        var renderedString = '';
        for (var styleName in styles) {
          var value = styles[styleName];
          if (isStringOrNumber(value)) {
            renderedString += styleName + ":" + value + ";";
          }
        }
        return renderedString;
      }
    }
    function renderStyleAttribute(styles) {
      var stylesString = parseStyleAsString(styles);
      if (stylesString) {
        return " style=\"" + stylesString + "\"";
      }
      return '';
    }

    function _extends$4() { return _extends$4 = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$4.apply(null, arguments); }
    var rxUnescaped = /["'&<>]/;
    function escapeText(text) {
      /* Much faster when there is no unescaped characters */
      if (!rxUnescaped.test(text)) {
        return text;
      }
      var result = '';
      var escape = '';
      var start = 0;
      var i = 0;
      for (; i < text.length; ++i) {
        switch (text.charCodeAt(i)) {
          case 34:
            // "
            escape = '&quot;';
            break;
          case 39:
            // '
            escape = '&#039;';
            break;
          case 38:
            // &
            escape = '&amp;';
            break;
          case 60:
            // <
            escape = '&lt;';
            break;
          case 62:
            // >
            escape = '&gt;';
            break;
          default:
            continue;
        }
        if (i > start) {
          result += text.slice(start, i);
        }
        result += escape;
        start = i + 1;
      }
      return result + text.slice(start, i);
    }
    var ATTRIBUTE_NAME_START_CHAR = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD";
    var ATTRIBUTE_NAME_CHAR = ATTRIBUTE_NAME_START_CHAR + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040";
    var VALID_ATTRIBUTE_NAME_REGEX = new RegExp(
    // eslint-disable-next-line no-misleading-character-class
    '^[' + ATTRIBUTE_NAME_START_CHAR + '][' + ATTRIBUTE_NAME_CHAR + ']*$');
    var illegalAttributeNameCache = {};
    var validatedAttributeNameCache = {};
    function isAttributeNameSafe(attributeName) {
      if (validatedAttributeNameCache[attributeName] !== void 0) {
        return true;
      }
      if (illegalAttributeNameCache[attributeName] !== void 0) {
        return false;
      }
      if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName)) {
        validatedAttributeNameCache[attributeName] = true;
        return true;
      }
      illegalAttributeNameCache[attributeName] = true;
      {
        console.log('Invalid attribute name: ' + attributeName);
      }
      return false;
    }
    var voidElements = new Set(['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
    function createDerivedState(instance, nextProps, state) {
      if (instance.constructor.getDerivedStateFromProps) {
        return _extends$4({}, state, instance.constructor.getDerivedStateFromProps(nextProps, state));
      }
      return state;
    }
    function renderFunctionalComponent(vNode, context) {
      var props = vNode.props || inferno.EMPTY_OBJ;
      return vNode.flags & 32768 /* VNodeFlags.ForwardRef */ ? vNode.type.render(props, vNode.ref, context) : vNode.type(props, context);
    }

    function _extends$3() { return _extends$3 = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$3.apply(null, arguments); }
    function renderVNodeToString(vNode, parent, context) {
      var flags = vNode.flags;
      var type = vNode.type;
      var props = vNode.props || inferno.EMPTY_OBJ;
      var children = vNode.children;
      if ((flags & 14 /* VNodeFlags.Component */) !== 0) {
        var isClass = flags & 4 /* VNodeFlags.ComponentClass */;
        if (isClass) {
          var instance = new type(props, context);
          var hasNewAPI = Boolean(type.getDerivedStateFromProps);
          instance.$BS = false;
          instance.$SSR = true;
          var childContext;
          if (isFunction(instance.getChildContext)) {
            childContext = instance.getChildContext();
          }
          if (isNullOrUndef(childContext)) {
            childContext = context;
          } else {
            childContext = _extends$3({}, context, childContext);
          }
          if (instance.props === inferno.EMPTY_OBJ) {
            instance.props = props;
          }
          instance.context = context;
          if (!hasNewAPI && isFunction(instance.componentWillMount)) {
            instance.$BR = true;
            instance.componentWillMount();
            instance.$BR = false;
            var pending = instance.$PS;
            if (pending) {
              var state = instance.state;
              if (state === null) {
                instance.state = pending;
              } else {
                for (var key in pending) {
                  state[key] = pending[key];
                }
              }
              instance.$PSS = false;
              instance.$PS = null;
            }
          }
          if (hasNewAPI) {
            instance.state = createDerivedState(instance, props, instance.state);
          }
          var renderOutput = instance.render(props, instance.state, instance.context);
          // In case render returns invalid stuff
          if (isInvalid(renderOutput)) {
            return '<!--!-->';
          }
          if (isString(renderOutput)) {
            return escapeText(renderOutput);
          }
          if (isNumber(renderOutput)) {
            return renderOutput + '';
          }
          return renderVNodeToString(renderOutput, vNode, childContext);
        } else {
          var _renderOutput = renderFunctionalComponent(vNode, context);
          if (isInvalid(_renderOutput)) {
            return '<!--!-->';
          }
          if (isString(_renderOutput)) {
            return escapeText(_renderOutput);
          }
          if (isNumber(_renderOutput)) {
            return _renderOutput + '';
          }
          return renderVNodeToString(_renderOutput, vNode, context);
        }
      } else if ((flags & 481 /* VNodeFlags.Element */) !== 0) {
        var renderedString = "<" + type;
        var html;
        var isVoidElement = voidElements.has(type);
        var className = vNode.className;
        if (isString(className)) {
          renderedString += " class=\"" + escapeText(className) + "\"";
        } else if (isNumber(className)) {
          renderedString += " class=\"" + className + "\"";
        }
        if (!isNull(props)) {
          for (var prop in props) {
            var value = props[prop];
            switch (prop) {
              case 'dangerouslySetInnerHTML':
                html = value.__html;
                break;
              case 'style':
                if (!isNullOrUndef(props.style)) {
                  renderedString += renderStyleAttribute(props.style);
                }
                break;
              case 'children':
              case 'className':
                // Ignore
                break;
              case 'defaultValue':
                // Use default values if normal values are not present
                if (!props.value) {
                  renderedString += " value=\"" + (isString(value) ? escapeText(value) : value) + "\"";
                }
                break;
              case 'defaultChecked':
                // Use default values if normal values are not present
                if (!props.checked && value) {
                  renderedString += " checked=\"" + value + "\"";
                }
                break;
              default:
                if (isAttributeNameSafe(prop)) {
                  if (isString(value)) {
                    renderedString += " " + prop + "=\"" + escapeText(value) + "\"";
                  } else if (isNumber(value)) {
                    renderedString += " " + prop + "=\"" + value + "\"";
                  } else if (value === true) {
                    renderedString += " " + prop;
                  }
                }
                break;
            }
          }
          if (type === 'option' && typeof props.value !== 'undefined' && props.value === parent.props.value) {
            // Parent value sets children value
            renderedString += " selected";
          }
        }
        if (isVoidElement) {
          renderedString += ">";
        } else {
          renderedString += ">";
          var childFlags = vNode.childFlags;
          if (childFlags === 2 /* ChildFlags.HasVNodeChildren */) {
            renderedString += renderVNodeToString(children, vNode, context);
          } else if (childFlags & 12 /* ChildFlags.MultipleChildren */) {
            for (var i = 0, len = children.length; i < len; ++i) {
              renderedString += renderVNodeToString(children[i], vNode, context);
            }
          } else if (childFlags === 16 /* ChildFlags.HasTextChildren */) {
            renderedString += children === '' ? ' ' : escapeText(children);
          } else if (html) {
            renderedString += html;
          }
          if (!isVoidElement) {
            renderedString += "</" + type + ">";
          }
        }
        if (String(type).match(/[\s\n/='"\0<>]/)) {
          throw renderedString;
        }
        return renderedString;
      } else if ((flags & 16 /* VNodeFlags.Text */) !== 0) {
        return children === '' ? ' ' : escapeText(children);
      } else if (isArray(vNode) || (flags & 8192 /* VNodeFlags.Fragment */) !== 0) {
        var _childFlags = vNode.childFlags;
        if (_childFlags === 2 /* ChildFlags.HasVNodeChildren */ || isArray(vNode) && vNode.length === 0) {
          return '<!--!-->';
        } else if (_childFlags & 12 /* ChildFlags.MultipleChildren */ || isArray(vNode)) {
          var tmpNodes = isArray(vNode) ? vNode : children;
          var _renderedString = '';
          for (var _i = 0, _len = tmpNodes.length; _i < _len; ++_i) {
            _renderedString += renderVNodeToString(tmpNodes[_i], vNode, context);
          }
          return _renderedString;
        }
      } else {
        {
          if (typeof vNode === 'object') {
            throwError("renderToString() received an object that's not a valid VNode, you should stringify it first. Object: \"" + JSON.stringify(vNode) + "\".");
          } else {
            throwError("renderToString() expects a valid VNode, instead it received an object with the type \"" + typeof vNode + "\".");
          }
        }
        throwError();
      }
      return '';
    }
    function renderToString(input) {
      return renderVNodeToString(input, {}, {});
    }

    function _extends$2() { return _extends$2 = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$2.apply(null, arguments); }
    function mergePendingState(componentInstance) {
      var pendingState = componentInstance.$PS;
      if (pendingState) {
        var state = componentInstance.state;
        if (state === null) {
          componentInstance.state = pendingState;
        } else {
          componentInstance.state = _extends$2({}, state, pendingState);
        }
        componentInstance.$PS = null;
      }
      componentInstance.$BR = false;
    }

    function _extends$1() { return _extends$1 = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$1.apply(null, arguments); }
    function _inheritsLoose$1(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf$1(t, o); }
    function _setPrototypeOf$1(t, e) { return _setPrototypeOf$1 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf$1(t, e); }
    var RenderQueueStream = /*#__PURE__*/function (_Readable) {
      function RenderQueueStream(initNode) {
        var _this;
        _this = _Readable.call(this) || this;
        _this.collector = [Infinity];
        // Infinity marks the end of the stream
        _this.promises = [];
        _this.pushQueue = _this.pushQueue.bind(_this);
        if (initNode) {
          _this.renderVNodeToQueue(initNode, null, null);
        }
        return _this;
      }
      _inheritsLoose$1(RenderQueueStream, _Readable);
      var _proto = RenderQueueStream.prototype;
      _proto._read = function _read() {
        setTimeout(this.pushQueue, 0);
      };
      _proto.addToQueue = function addToQueue(node, position) {
        // Positioning defined, stack it
        if (!isNullOrUndef(position)) {
          var lastSlot = this.promises[position].length - 1;
          // Combine as array or push into promise collector
          if (typeof this.promises[position][lastSlot] === 'string' && typeof node === 'string') {
            this.promises[position][lastSlot] += node;
          } else {
            this.promises[position].push(node);
          }
          // Collector is empty push to stream
        } else if (typeof node === 'string' && this.collector.length - 1 === 0) {
          this.push(node);
          // Last element in collector and incoming are same then concat
        } else if (typeof node === 'string' && typeof this.collector[this.collector.length - 2] === 'string') {
          this.collector[this.collector.length - 2] += node;
          // Push the element to collector (before Infinity)
        } else {
          this.collector.splice(-1, 0, node);
        }
      };
      _proto.pushQueue = function pushQueue() {
        var _this2 = this;
        var chunk = this.collector[0];
        // Output strings directly
        if (typeof chunk === 'string') {
          this.push(chunk);
          this.collector.shift();
          // For fulfilled promises, merge into collector
        } else if (!!chunk && (typeof chunk === 'object' || isFunction(chunk)) && isFunction(chunk.then)) {
          chunk.then(function (index) {
            var _this2$collector;
            (_this2$collector = _this2.collector).splice.apply(_this2$collector, [0, 1].concat(_this2.promises[index]));
            _this2.promises[index] = null;
            setTimeout(_this2.pushQueue, 0);
          });
          this.collector[0] = null;
          // End of content
        } else if (chunk === Infinity) {
          this.emit('end');
        }
      };
      _proto.renderVNodeToQueue = function renderVNodeToQueue(vNode, context, position) {
        var _this3 = this;
        var flags = vNode.flags;
        var type = vNode.type;
        var props = vNode.props || inferno.EMPTY_OBJ;
        var children = vNode.children;
        // Handles a component render
        if ((flags & 14 /* VNodeFlags.Component */) > 0) {
          var isClass = flags & 4 /* VNodeFlags.ComponentClass */;
          // Render the
          if (isClass) {
            var instance = new type(props, context);
            var hasNewAPI = Boolean(type.getDerivedStateFromProps);
            instance.$BS = false;
            instance.$SSR = true;
            var childContext;
            if (!isUndefined(instance.getChildContext)) {
              childContext = instance.getChildContext();
            }
            if (!isNullOrUndef(childContext)) {
              context = _extends$1({}, context, childContext);
            }
            if (instance.props === inferno.EMPTY_OBJ) {
              instance.props = props;
            }
            instance.context = context;
            // Trigger lifecycle hook
            if (!hasNewAPI && isFunction(instance.componentWillMount)) {
              instance.$BR = true;
              instance.componentWillMount();
              mergePendingState(instance);
            }
            // Trigger extra promise-based lifecycle hook
            if (isFunction(instance.getInitialProps)) {
              var initialProps = instance.getInitialProps(instance.props, instance.context);
              if (initialProps) {
                if (Promise.resolve(initialProps) === initialProps) {
                  var promisePosition = this.promises.push([]) - 1;
                  this.addToQueue(initialProps.then(function (dataForContext) {
                    if (typeof dataForContext === 'object') {
                      instance.props = _extends$1({}, instance.props, dataForContext);
                    }
                    var renderOut = instance.render(instance.props, instance.state, instance.context);
                    if (isInvalid(renderOut)) {
                      _this3.addToQueue('<!--!-->', promisePosition);
                    } else if (isString(renderOut)) {
                      _this3.addToQueue(escapeText(renderOut), promisePosition);
                    } else if (isNumber(renderOut)) {
                      _this3.addToQueue(renderOut + '', promisePosition);
                    } else {
                      _this3.renderVNodeToQueue(renderOut, instance.context, promisePosition);
                    }
                    setTimeout(_this3.pushQueue, 0);
                    return promisePosition;
                  }), position);
                  return;
                } else {
                  instance.props = _extends$1({}, instance.props, initialProps);
                }
              }
            }
            if (hasNewAPI) {
              instance.state = createDerivedState(instance, props, instance.state);
            }
            var renderOutput = instance.render(instance.props, instance.state, instance.context);
            if (isInvalid(renderOutput)) {
              this.addToQueue('<!--!-->', position);
            } else if (isString(renderOutput)) {
              this.addToQueue(escapeText(renderOutput), position);
            } else if (isNumber(renderOutput)) {
              this.addToQueue(renderOutput + '', position);
            } else {
              this.renderVNodeToQueue(renderOutput, context, position);
            }
          } else {
            var _renderOutput = renderFunctionalComponent(vNode, context);
            if (isInvalid(_renderOutput)) {
              this.addToQueue('<!--!-->', position);
            } else if (isString(_renderOutput)) {
              this.addToQueue(escapeText(_renderOutput), position);
            } else if (isNumber(_renderOutput)) {
              this.addToQueue(_renderOutput + '', position);
            } else {
              this.renderVNodeToQueue(_renderOutput, context, position);
            }
          }
          // If an element
        } else if ((flags & 481 /* VNodeFlags.Element */) > 0) {
          var renderedString = "<" + type;
          var html;
          var isVoidElement = voidElements.has(type);
          var className = vNode.className;
          if (isString(className)) {
            renderedString += " class=\"" + escapeText(className) + "\"";
          } else if (isNumber(className)) {
            renderedString += " class=\"" + className + "\"";
          }
          if (!isNull(props)) {
            for (var prop in props) {
              var value = props[prop];
              switch (prop) {
                case 'dangerouslySetInnerHTML':
                  html = value.__html;
                  break;
                case 'style':
                  if (!isNullOrUndef(props.style)) {
                    renderedString += renderStyleAttribute(props.style);
                  }
                  break;
                case 'children':
                case 'className':
                  // Ignore
                  break;
                case 'defaultValue':
                  // Use default values if normal values are not present
                  if (!props.value) {
                    renderedString += " value=\"" + (isString(value) ? escapeText(value) : value) + "\"";
                  }
                  break;
                case 'defaultChecked':
                  // Use default values if normal values are not present
                  if (!props.checked) {
                    renderedString += " checked=\"" + value + "\"";
                  }
                  break;
                default:
                  if (isAttributeNameSafe(prop)) {
                    if (isString(value)) {
                      renderedString += " " + prop + "=\"" + escapeText(value) + "\"";
                    } else if (isNumber(value)) {
                      renderedString += " " + prop + "=\"" + value + "\"";
                    } else if (value === true) {
                      renderedString += " " + prop;
                    }
                  }
                  break;
              }
            }
          }
          renderedString += ">";
          if (String(type).match(/[\s\n/='"\0<>]/)) {
            throw renderedString;
          }
          // Voided element, push directly to queue
          if (isVoidElement) {
            this.addToQueue(renderedString, position);
            // Regular element with content
          } else {
            // Element has children, build them in
            var childFlags = vNode.childFlags;
            if (childFlags === 2 /* ChildFlags.HasVNodeChildren */) {
              this.addToQueue(renderedString, position);
              this.renderVNodeToQueue(children, context, position);
              this.addToQueue('</' + type + '>', position);
              return;
            } else if (childFlags === 16 /* ChildFlags.HasTextChildren */) {
              this.addToQueue(renderedString, position);
              this.addToQueue(children === '' ? ' ' : escapeText(children + ''), position);
              this.addToQueue('</' + type + '>', position);
              return;
            } else if (childFlags & 12 /* ChildFlags.MultipleChildren */) {
              this.addToQueue(renderedString, position);
              for (var i = 0, len = children.length; i < len; ++i) {
                this.renderVNodeToQueue(children[i], context, position);
              }
              this.addToQueue('</' + type + '>', position);
              return;
            }
            if (html) {
              this.addToQueue(renderedString + html + '</' + type + '>', position);
              return;
            }
            // Close element if it's not void
            if (!isVoidElement) {
              this.addToQueue(renderedString + '</' + type + '>', position);
            }
          }
          // Push text directly to queue
        } else if ((flags & 16 /* VNodeFlags.Text */) > 0) {
          this.addToQueue(children === '' ? ' ' : escapeText(children), position);
          // Handle fragments and arrays
        } else if (isArray(vNode) || (flags & 8192 /* VNodeFlags.Fragment */) !== 0) {
          var _childFlags = vNode.childFlags;
          if (_childFlags === 2 /* ChildFlags.HasVNodeChildren */ || isArray(vNode) && vNode.length === 0) {
            this.addToQueue('<!--!-->', position);
          } else if (_childFlags & 12 /* ChildFlags.MultipleChildren */ || isArray(vNode)) {
            var tmpChildren = isArray(vNode) ? vNode : vNode.children;
            for (var _i = 0, _len = tmpChildren.length; _i < _len; ++_i) {
              this.renderVNodeToQueue(tmpChildren[_i], context, position);
            }
          }
          // Handle errors
        } else {
          {
            if (typeof vNode === 'object') {
              throwError("renderToString() received an object that's not a valid VNode, you should stringify it first. Object: \"" + JSON.stringify(vNode) + "\".");
            } else {
              throwError("renderToString() expects a valid VNode, instead it received an object with the type \"" + typeof vNode + "\".");
            }
          }
          throwError();
        }
      };
      return RenderQueueStream;
    }(stream.Readable);
    function streamQueueAsString(node) {
      return new RenderQueueStream(node);
    }

    function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
    function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = false, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = true, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), true), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
    function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
    function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
    function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
    function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
    function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
    var resolvedPromise = Promise.resolve();
    var RenderStream = /*#__PURE__*/function (_Readable) {
      function RenderStream(initNode) {
        var _this;
        _this = _Readable.call(this) || this;
        _this.initNode = void 0;
        _this.started = false;
        _this.initNode = initNode;
        return _this;
      }
      _inheritsLoose(RenderStream, _Readable);
      var _proto = RenderStream.prototype;
      _proto._read = function _read() {
        var _this2 = this;
        if (this.started) {
          return;
        }
        this.started = true;
        resolvedPromise.then(function () {
          return _this2.renderNode(_this2.initNode, null);
        }).then(function () {
          _this2.push(null);
        })["catch"](function (err) {
          _this2.emit('error', err);
        });
      };
      _proto.renderNode = function renderNode(vNode, context) {
        var flags = vNode.flags;
        if ((flags & 14 /* VNodeFlags.Component */) > 0) {
          return this.renderComponent(vNode, context, flags & 4 /* VNodeFlags.ComponentClass */);
        }
        if ((flags & 481 /* VNodeFlags.Element */) > 0) {
          return this.renderElement(vNode, context);
        }
        if (isArray(vNode) || (flags & 8192 /* VNodeFlags.Fragment */) !== 0) {
          return this.renderArrayOrFragment(vNode, context);
        }
        this.renderText(vNode);
      };
      _proto.renderArrayOrFragment = function renderArrayOrFragment(vNode, context) {
        var _this3 = this;
        var childFlags = vNode.childFlags;
        if (childFlags === 2 /* ChildFlags.HasVNodeChildren */ || isArray(vNode) && vNode.length === 0) {
          return this.push('<!--!-->');
        } else if (childFlags & 12 /* ChildFlags.MultipleChildren */ || isArray(vNode)) {
          var children = isArray(vNode) ? vNode : vNode.children;
          return children.reduce(/*#__PURE__*/function () {
            var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(p, child) {
              return _regenerator().w(function (_context2) {
                while (1) switch (_context2.n) {
                  case 0:
                    _context2.n = 1;
                    return p.then(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
                      return _regenerator().w(function (_context) {
                        while (1) switch (_context.n) {
                          case 0:
                            _context.n = 1;
                            return Promise.resolve(_this3.renderNode(child, context)).then(function () {
                              return !!(child.flags & 16 /* VNodeFlags.Text */);
                            });
                          case 1:
                            return _context.a(2, _context.v);
                        }
                      }, _callee);
                    })));
                  case 1:
                    return _context2.a(2, _context2.v);
                }
              }, _callee2);
            }));
            return function (_x, _x2) {
              return _ref.apply(this, arguments);
            };
          }(), Promise.resolve(false));
        }
      };
      _proto.renderComponent = function renderComponent(vComponent, context, isClass) {
        var _this4 = this;
        var type = vComponent.type;
        var props = vComponent.props;
        if (!isClass) {
          var renderOutput = renderFunctionalComponent(vComponent, context);
          if (isInvalid(renderOutput)) {
            return this.push('<!--!-->');
          }
          if (isString(renderOutput)) {
            return this.push(escapeText(renderOutput));
          }
          if (isNumber(renderOutput)) {
            return this.push(renderOutput + '');
          }
          return this.renderNode(renderOutput, context);
        }
        var instance = new type(props, context);
        var hasNewAPI = Boolean(type.getDerivedStateFromProps);
        instance.$BS = false;
        instance.$SSR = true;
        var childContext;
        if (isFunction(instance.getChildContext)) {
          childContext = instance.getChildContext();
        }
        if (!isNullOrUndef(childContext)) {
          context = _extends({}, context, childContext);
        }
        instance.context = context;
        instance.$BR = true;
        return Promise.resolve(!hasNewAPI && (instance.componentWillMount == null ? void 0 : instance.componentWillMount())).then(function () {
          mergePendingState(instance);
          if (hasNewAPI) {
            instance.state = createDerivedState(instance, props, instance.state);
          }
          var renderOutput = instance.render(instance.props, instance.state, instance.context);
          if (isInvalid(renderOutput)) {
            return _this4.push('<!--!-->');
          }
          if (isString(renderOutput)) {
            return _this4.push(escapeText(renderOutput));
          }
          if (isNumber(renderOutput)) {
            return _this4.push(renderOutput + '');
          }
          return _this4.renderNode(renderOutput, context);
        });
      };
      _proto.renderChildren = function renderChildren(children, context, childFlags) {
        var _this5 = this;
        if (childFlags === 2 /* ChildFlags.HasVNodeChildren */) {
          return this.renderNode(children, context);
        }
        if (childFlags === 16 /* ChildFlags.HasTextChildren */) {
          return this.push(children === '' ? ' ' : escapeText(children + ''));
        }
        if (childFlags & 12 /* ChildFlags.MultipleChildren */) {
          return children.reduce(/*#__PURE__*/function () {
            var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(p, child) {
              return _regenerator().w(function (_context4) {
                while (1) switch (_context4.n) {
                  case 0:
                    _context4.n = 1;
                    return p.then(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
                      return _regenerator().w(function (_context3) {
                        while (1) switch (_context3.n) {
                          case 0:
                            _context3.n = 1;
                            return Promise.resolve(_this5.renderNode(child, context)).then(function () {
                              return !!(child.flags & 16 /* VNodeFlags.Text */);
                            });
                          case 1:
                            return _context3.a(2, _context3.v);
                        }
                      }, _callee3);
                    })));
                  case 1:
                    return _context4.a(2, _context4.v);
                }
              }, _callee4);
            }));
            return function (_x3, _x4) {
              return _ref3.apply(this, arguments);
            };
          }(), Promise.resolve(false));
        }
      };
      _proto.renderText = function renderText(vNode) {
        this.push(vNode.children === '' ? ' ' : escapeText(vNode.children));
      };
      _proto.renderElement = function renderElement(vNode, context) {
        var _this6 = this;
        var type = vNode.type;
        var props = vNode.props;
        var renderedString = "<" + type;
        var html;
        var isVoidElement = voidElements.has(type);
        var className = vNode.className;
        if (isString(className)) {
          renderedString += " class=\"" + escapeText(className) + "\"";
        } else if (isNumber(className)) {
          renderedString += " class=\"" + className + "\"";
        }
        if (!isNull(props)) {
          for (var prop in props) {
            var value = props[prop];
            switch (prop) {
              case 'dangerouslySetInnerHTML':
                html = value.__html;
                break;
              case 'style':
                if (!isNullOrUndef(props.style)) {
                  renderedString += renderStyleAttribute(props.style);
                }
                break;
              case 'children':
              case 'className':
                // Ignore
                break;
              case 'defaultValue':
                // Use default values if normal values are not present
                if (!props.value) {
                  renderedString += " value=\"" + (isString(value) ? escapeText(value) : value) + "\"";
                }
                break;
              case 'defaultChecked':
                // Use default values if normal values are not present
                if (!props.checked && value) {
                  renderedString += " checked=\"" + value + "\"";
                }
                break;
              default:
                if (isAttributeNameSafe(prop)) {
                  if (isString(value)) {
                    renderedString += " " + prop + "=\"" + escapeText(value) + "\"";
                  } else if (isNumber(value)) {
                    renderedString += " " + prop + "=\"" + value + "\"";
                  } else if (value === true) {
                    renderedString += " " + prop;
                  }
                  break;
                }
            }
          }
        }
        renderedString += ">";
        this.push(renderedString);
        if (String(type).match(/[\s\n/='"\0<>]/)) {
          throw renderedString;
        }
        if (isVoidElement) {
          return;
        } else {
          if (html) {
            this.push(html);
            this.push("</" + type + ">");
            return;
          }
        }
        var childFlags = vNode.childFlags;
        if (childFlags === 1 /* ChildFlags.HasInvalidChildren */) {
          this.push("</" + type + ">");
          return;
        }
        return Promise.resolve(this.renderChildren(vNode.children, context, childFlags)).then(function () {
          _this6.push("</" + type + ">");
        });
      };
      return RenderStream;
    }(stream.Readable);
    function streamAsString(node) {
      return new RenderStream(node);
    }

    exports.RenderQueueStream = RenderQueueStream;
    exports.RenderStream = RenderStream;
    exports.renderToStaticMarkup = renderToString;
    exports.renderToString = renderToString;
    exports.streamAsStaticMarkup = streamAsString;
    exports.streamAsString = streamAsString;
    exports.streamQueueAsStaticMarkup = streamQueueAsString;
    exports.streamQueueAsString = streamQueueAsString;

}));
