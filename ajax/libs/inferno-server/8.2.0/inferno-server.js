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
    function combineFrom(first, second) {
      var out = {};
      if (first) {
        for (var key in first) {
          out[key] = first[key];
        }
      }
      if (second) {
        for (var _key in second) {
          out[_key] = second[_key];
        }
      }
      return out;
    }

    function renderStylesToString(styles) {
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

    var rxUnescaped = new RegExp(/["'&<>]/);
    function escapeText(text) {
      /* Much faster when there is no unescaped characters */
      if (!rxUnescaped.test(text)) {
        return text;
      }
      var result = '';
      var escape = '';
      var start = 0;
      var i;
      for (i = 0; i < text.length; ++i) {
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
    var VALID_ATTRIBUTE_NAME_REGEX = new RegExp('^[' + ATTRIBUTE_NAME_START_CHAR + '][' + ATTRIBUTE_NAME_CHAR + ']*$');
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
        // tslint:disable-next-line:no-console
        console.log('Invalid attribute name: ' + attributeName);
      }
      return false;
    }
    var voidElements = new Set(['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
    function createDerivedState(instance, nextProps, state) {
      if (instance.constructor.getDerivedStateFromProps) {
        return combineFrom(state, instance.constructor.getDerivedStateFromProps(nextProps, state));
      }
      return state;
    }
    function renderFunctionalComponent(vNode, context) {
      var props = vNode.props || inferno.EMPTY_OBJ;
      return vNode.flags & 32768 /* VNodeFlags.ForwardRef */ ? vNode.type.render(props, vNode.ref, context) : vNode.type(props, context);
    }

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
            childContext = combineFrom(context, childContext);
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
                  renderedString += " style=\"" + renderStylesToString(props.style) + "\"";
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
        if (String(type).match(/[\s\n\/='"\0<>]/)) {
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

    function mergePendingState(componentInstance) {
      var pendingState = componentInstance.$PS;
      if (pendingState) {
        var state = componentInstance.state;
        if (state === null) {
          componentInstance.state = pendingState;
        } else {
          for (var key in pendingState) {
            state[key] = pendingState[key];
          }
        }
        componentInstance.$PS = null;
      }
      componentInstance.$BR = false;
    }

    function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
    function _inheritsLoose$1(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf$1(subClass, superClass); }
    function _setPrototypeOf$1(o, p) { _setPrototypeOf$1 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$1(o, p); }
    var RenderQueueStream = /*#__PURE__*/function (_Readable) {
      _inheritsLoose$1(RenderQueueStream, _Readable);
      function RenderQueueStream(initNode) {
        var _this;
        _this = _Readable.call(this) || this;
        _this.collector = [Infinity];
        // Infinity marks the end of the stream
        _this.promises = [];
        _this.pushQueue = _this.pushQueue.bind(_assertThisInitialized(_this));
        if (initNode) {
          _this.renderVNodeToQueue(initNode, null, null);
        }
        return _this;
      }
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
        var chunk = this.collector[0];
        // Output strings directly
        if (typeof chunk === 'string') {
          this.push(chunk);
          this.collector.shift();
          // For fulfilled promises, merge into collector
        } else if (!!chunk && (typeof chunk === 'object' || isFunction(chunk)) && isFunction(chunk.then)) {
          var self = this;
          chunk.then(function (index) {
            var _self$collector;
            (_self$collector = self.collector).splice.apply(_self$collector, [0, 1].concat(self.promises[index]));
            self.promises[index] = null;
            setTimeout(self.pushQueue, 0);
          });
          this.collector[0] = null;
          // End of content
        } else if (chunk === Infinity) {
          this.emit('end');
        }
      };
      _proto.renderVNodeToQueue = function renderVNodeToQueue(vNode, context, position) {
        var _this2 = this;
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
              context = combineFrom(context, childContext);
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
                      instance.props = combineFrom(instance.props, dataForContext);
                    }
                    var renderOut = instance.render(instance.props, instance.state, instance.context);
                    if (isInvalid(renderOut)) {
                      _this2.addToQueue('<!--!-->', promisePosition);
                    } else if (isString(renderOut)) {
                      _this2.addToQueue(escapeText(renderOut), promisePosition);
                    } else if (isNumber(renderOut)) {
                      _this2.addToQueue(renderOut + '', promisePosition);
                    } else {
                      _this2.renderVNodeToQueue(renderOut, instance.context, promisePosition);
                    }
                    setTimeout(_this2.pushQueue, 0);
                    return promisePosition;
                  }), position);
                  return;
                } else {
                  instance.props = combineFrom(instance.props, initialProps);
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
                    renderedString += " style=\"" + renderStylesToString(props.style) + "\"";
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
          if (String(type).match(/[\s\n\/='"\0<>]/)) {
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
            return;
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

    function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
    function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
    var resolvedPromise = Promise.resolve();
    var RenderStream = /*#__PURE__*/function (_Readable) {
      _inheritsLoose(RenderStream, _Readable);
      function RenderStream(initNode) {
        var _this;
        _this = _Readable.call(this) || this;
        _this.initNode = void 0;
        _this.started = false;
        _this.initNode = initNode;
        return _this;
      }
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
        return this.renderText(vNode);
      };
      _proto.renderArrayOrFragment = function renderArrayOrFragment(vNode, context) {
        var _this3 = this;
        var childFlags = vNode.childFlags;
        if (childFlags === 2 /* ChildFlags.HasVNodeChildren */ || isArray(vNode) && vNode.length === 0) {
          return this.push('<!--!-->');
        } else if (childFlags & 12 /* ChildFlags.MultipleChildren */ || isArray(vNode)) {
          var children = isArray(vNode) ? vNode : vNode.children;
          return children.reduce(function (p, child) {
            return p.then(function () {
              return Promise.resolve(_this3.renderNode(child, context)).then(function () {
                return !!(child.flags & 16 /* VNodeFlags.Text */);
              });
            });
          }, Promise.resolve(false));
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
          context = combineFrom(context, childContext);
        }
        instance.context = context;
        instance.$BR = true;
        return Promise.resolve(!hasNewAPI && instance.componentWillMount && instance.componentWillMount()).then(function () {
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
          return children.reduce(function (p, child) {
            return p.then(function () {
              return Promise.resolve(_this5.renderNode(child, context)).then(function () {
                return !!(child.flags & 16 /* VNodeFlags.Text */);
              });
            });
          }, Promise.resolve(false));
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
                  renderedString += " style=\"" + renderStylesToString(props.style) + "\"";
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
                  break;
                }
            }
          }
        }
        renderedString += ">";
        this.push(renderedString);
        if (String(type).match(/[\s\n\/='"\0<>]/)) {
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
