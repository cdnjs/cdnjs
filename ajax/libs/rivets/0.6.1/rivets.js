// Rivets.js
// version: 0.6.1
// author: Michael Richards
// license: MIT
(function() {
  var KeypathObserver, Rivets,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Rivets = {
    binders: {},
    components: {},
    formatters: {},
    adapters: {},
    config: {
      prefix: 'rv',
      templateDelimiters: ['{', '}'],
      rootInterface: '.',
      preloadData: true,
      handler: function(context, ev, binding) {
        return this.call(context, ev, binding.view.models);
      }
    }
  };

  Rivets.Util = {
    bindEvent: function(el, event, handler) {
      if (window.jQuery != null) {
        el = jQuery(el);
        if (el.on != null) {
          return el.on(event, handler);
        } else {
          return el.bind(event, handler);
        }
      } else if (window.addEventListener != null) {
        return el.addEventListener(event, handler, false);
      } else {
        event = 'on' + event;
        return el.attachEvent(event, handler);
      }
    },
    unbindEvent: function(el, event, handler) {
      if (window.jQuery != null) {
        el = jQuery(el);
        if (el.off != null) {
          return el.off(event, handler);
        } else {
          return el.unbind(event, handler);
        }
      } else if (window.removeEventListener != null) {
        return el.removeEventListener(event, handler, false);
      } else {
        event = 'on' + event;
        return el.detachEvent(event, handler);
      }
    },
    getInputValue: function(el) {
      var o, _i, _len, _results;
      if (window.jQuery != null) {
        el = jQuery(el);
        switch (el[0].type) {
          case 'checkbox':
            return el.is(':checked');
          default:
            return el.val();
        }
      } else {
        switch (el.type) {
          case 'checkbox':
            return el.checked;
          case 'select-multiple':
            _results = [];
            for (_i = 0, _len = el.length; _i < _len; _i++) {
              o = el[_i];
              if (o.selected) {
                _results.push(o.value);
              }
            }
            return _results;
            break;
          default:
            return el.value;
        }
      }
    }
  };

  Rivets.View = (function() {
    function View(els, models, options) {
      var k, option, v, _base, _i, _len, _ref, _ref1, _ref2;
      this.els = els;
      this.models = models;
      this.options = options != null ? options : {};
      this.update = __bind(this.update, this);
      this.publish = __bind(this.publish, this);
      this.sync = __bind(this.sync, this);
      this.unbind = __bind(this.unbind, this);
      this.bind = __bind(this.bind, this);
      this.select = __bind(this.select, this);
      this.build = __bind(this.build, this);
      this.componentRegExp = __bind(this.componentRegExp, this);
      this.bindingRegExp = __bind(this.bindingRegExp, this);
      if (!(this.els.jquery || this.els instanceof Array)) {
        this.els = [this.els];
      }
      _ref = ['config', 'binders', 'formatters', 'adapters'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        option = _ref[_i];
        this[option] = {};
        if (this.options[option]) {
          _ref1 = this.options[option];
          for (k in _ref1) {
            v = _ref1[k];
            this[option][k] = v;
          }
        }
        _ref2 = Rivets[option];
        for (k in _ref2) {
          v = _ref2[k];
          if ((_base = this[option])[k] == null) {
            _base[k] = v;
          }
        }
      }
      this.build();
    }

    View.prototype.bindingRegExp = function() {
      return new RegExp("^" + this.config.prefix + "-");
    };

    View.prototype.componentRegExp = function() {
      return new RegExp("^" + (this.config.prefix.toUpperCase()) + "-");
    };

    View.prototype.build = function() {
      var bindingRegExp, buildBinding, componentRegExp, el, parse, skipNodes, _i, _len, _ref,
        _this = this;
      this.bindings = [];
      skipNodes = [];
      bindingRegExp = this.bindingRegExp();
      componentRegExp = this.componentRegExp();
      buildBinding = function(binding, node, type, declaration) {
        var context, ctx, dependencies, keypath, options, pipe, pipes;
        options = {};
        pipes = (function() {
          var _i, _len, _ref, _results;
          _ref = declaration.split('|');
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            pipe = _ref[_i];
            _results.push(pipe.trim());
          }
          return _results;
        })();
        context = (function() {
          var _i, _len, _ref, _results;
          _ref = pipes.shift().split('<');
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            ctx = _ref[_i];
            _results.push(ctx.trim());
          }
          return _results;
        })();
        keypath = context.shift();
        options.formatters = pipes;
        if (dependencies = context.shift()) {
          options.dependencies = dependencies.split(/\s+/);
        }
        return _this.bindings.push(new Rivets[binding](_this, node, type, keypath, options));
      };
      parse = function(node) {
        var attribute, attributes, binder, childNode, delimiters, identifier, n, parser, regexp, text, token, tokens, type, value, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _ref, _ref1, _ref2, _ref3, _ref4, _results;
        if (__indexOf.call(skipNodes, node) < 0) {
          if (node.nodeType === Node.TEXT_NODE) {
            parser = Rivets.TextTemplateParser;
            if (delimiters = _this.config.templateDelimiters) {
              if ((tokens = parser.parse(node.data, delimiters)).length) {
                if (!(tokens.length === 1 && tokens[0].type === parser.types.text)) {
                  for (_i = 0, _len = tokens.length; _i < _len; _i++) {
                    token = tokens[_i];
                    text = document.createTextNode(token.value);
                    node.parentNode.insertBefore(text, node);
                    if (token.type === 1) {
                      buildBinding('TextBinding', text, null, token.value);
                    }
                  }
                  node.parentNode.removeChild(node);
                }
              }
            }
          } else if (componentRegExp.test(node.tagName)) {
            type = node.tagName.replace(componentRegExp, '').toLowerCase();
            _this.bindings.push(new Rivets.ComponentBinding(_this, node, type));
          } else if (node.attributes != null) {
            _ref = node.attributes;
            for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
              attribute = _ref[_j];
              if (bindingRegExp.test(attribute.name)) {
                type = attribute.name.replace(bindingRegExp, '');
                if (!(binder = _this.binders[type])) {
                  _ref1 = _this.binders;
                  for (identifier in _ref1) {
                    value = _ref1[identifier];
                    if (identifier !== '*' && identifier.indexOf('*') !== -1) {
                      regexp = new RegExp("^" + (identifier.replace('*', '.+')) + "$");
                      if (regexp.test(type)) {
                        binder = value;
                      }
                    }
                  }
                }
                binder || (binder = _this.binders['*']);
                if (binder.block) {
                  _ref2 = node.childNodes;
                  for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
                    n = _ref2[_k];
                    skipNodes.push(n);
                  }
                  attributes = [attribute];
                }
              }
            }
            _ref3 = attributes || node.attributes;
            for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {
              attribute = _ref3[_l];
              if (bindingRegExp.test(attribute.name)) {
                type = attribute.name.replace(bindingRegExp, '');
                buildBinding('Binding', node, type, attribute.value);
              }
            }
          }
          _ref4 = (function() {
            var _len4, _n, _ref4, _results1;
            _ref4 = node.childNodes;
            _results1 = [];
            for (_n = 0, _len4 = _ref4.length; _n < _len4; _n++) {
              n = _ref4[_n];
              _results1.push(n);
            }
            return _results1;
          })();
          _results = [];
          for (_m = 0, _len4 = _ref4.length; _m < _len4; _m++) {
            childNode = _ref4[_m];
            _results.push(parse(childNode));
          }
          return _results;
        }
      };
      _ref = this.els;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        el = _ref[_i];
        parse(el);
      }
    };

    View.prototype.select = function(fn) {
      var binding, _i, _len, _ref, _results;
      _ref = this.bindings;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        binding = _ref[_i];
        if (fn(binding)) {
          _results.push(binding);
        }
      }
      return _results;
    };

    View.prototype.bind = function() {
      var binding, _i, _len, _ref, _results;
      _ref = this.bindings;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        binding = _ref[_i];
        _results.push(binding.bind());
      }
      return _results;
    };

    View.prototype.unbind = function() {
      var binding, _i, _len, _ref, _results;
      _ref = this.bindings;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        binding = _ref[_i];
        _results.push(binding.unbind());
      }
      return _results;
    };

    View.prototype.sync = function() {
      var binding, _i, _len, _ref, _results;
      _ref = this.bindings;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        binding = _ref[_i];
        _results.push(binding.sync());
      }
      return _results;
    };

    View.prototype.publish = function() {
      var binding, _i, _len, _ref, _results;
      _ref = this.select(function(b) {
        return b.binder.publishes;
      });
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        binding = _ref[_i];
        _results.push(binding.publish());
      }
      return _results;
    };

    View.prototype.update = function(models) {
      var binding, key, model, _i, _len, _ref, _results;
      if (models == null) {
        models = {};
      }
      for (key in models) {
        model = models[key];
        this.models[key] = model;
      }
      _ref = this.bindings;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        binding = _ref[_i];
        _results.push(binding.update(models));
      }
      return _results;
    };

    return View;

  })();

  Rivets.Binding = (function() {
    function Binding(view, el, type, keypath, options) {
      this.view = view;
      this.el = el;
      this.type = type;
      this.keypath = keypath;
      this.options = options != null ? options : {};
      this.update = __bind(this.update, this);
      this.unbind = __bind(this.unbind, this);
      this.bind = __bind(this.bind, this);
      this.publish = __bind(this.publish, this);
      this.sync = __bind(this.sync, this);
      this.set = __bind(this.set, this);
      this.eventHandler = __bind(this.eventHandler, this);
      this.formattedValue = __bind(this.formattedValue, this);
      this.setObserver = __bind(this.setObserver, this);
      this.setBinder = __bind(this.setBinder, this);
      this.formatters = this.options.formatters || [];
      this.dependencies = [];
      this.setBinder();
      this.setObserver();
    }

    Binding.prototype.setBinder = function() {
      var identifier, regexp, value, _ref;
      if (!(this.binder = this.view.binders[this.type])) {
        _ref = this.view.binders;
        for (identifier in _ref) {
          value = _ref[identifier];
          if (identifier !== '*' && identifier.indexOf('*') !== -1) {
            regexp = new RegExp("^" + (identifier.replace('*', '.+')) + "$");
            if (regexp.test(this.type)) {
              this.binder = value;
              this.args = new RegExp("^" + (identifier.replace('*', '(.+)')) + "$").exec(this.type);
              this.args.shift();
            }
          }
        }
      }
      this.binder || (this.binder = this.view.binders['*']);
      if (this.binder instanceof Function) {
        return this.binder = {
          routine: this.binder
        };
      }
    };

    Binding.prototype.setObserver = function() {
      var _this = this;
      this.observer = new KeypathObserver(this.view, this.view.models, this.keypath, function(obs) {
        if (_this.key) {
          _this.unbind(true);
        }
        _this.model = obs.target;
        if (_this.key) {
          _this.bind(true);
        }
        return _this.sync();
      });
      this.key = this.observer.key;
      return this.model = this.observer.target;
    };

    Binding.prototype.formattedValue = function(value) {
      var args, formatter, id, _i, _len, _ref;
      _ref = this.formatters;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        formatter = _ref[_i];
        args = formatter.split(/\s+/);
        id = args.shift();
        formatter = this.view.formatters[id];
        if ((formatter != null ? formatter.read : void 0) instanceof Function) {
          value = formatter.read.apply(formatter, [value].concat(__slice.call(args)));
        } else if (formatter instanceof Function) {
          value = formatter.apply(null, [value].concat(__slice.call(args)));
        }
      }
      return value;
    };

    Binding.prototype.eventHandler = function(fn) {
      var binding, handler;
      handler = (binding = this).view.config.handler;
      return function(ev) {
        return handler.call(fn, this, ev, binding);
      };
    };

    Binding.prototype.set = function(value) {
      var _ref;
      value = value instanceof Function && !this.binder["function"] ? this.formattedValue(value.call(this.model)) : this.formattedValue(value);
      return (_ref = this.binder.routine) != null ? _ref.call(this, this.el, value) : void 0;
    };

    Binding.prototype.sync = function() {
      return this.set(this.key ? this.view.adapters[this.key["interface"]].read(this.model, this.key.path) : this.model);
    };

    Binding.prototype.publish = function() {
      var args, formatter, id, value, _i, _len, _ref, _ref1, _ref2;
      value = Rivets.Util.getInputValue(this.el);
      _ref = this.formatters.slice(0).reverse();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        formatter = _ref[_i];
        args = formatter.split(/\s+/);
        id = args.shift();
        if ((_ref1 = this.view.formatters[id]) != null ? _ref1.publish : void 0) {
          value = (_ref2 = this.view.formatters[id]).publish.apply(_ref2, [value].concat(__slice.call(args)));
        }
      }
      return this.view.adapters[this.key["interface"]].publish(this.model, this.key.path, value);
    };

    Binding.prototype.bind = function(silent) {
      var dependency, key, observer, _i, _len, _ref, _ref1, _ref2, _results,
        _this = this;
      if (silent == null) {
        silent = false;
      }
      if (!silent) {
        if ((_ref = this.binder.bind) != null) {
          _ref.call(this, this.el);
        }
      }
      if (this.key) {
        this.view.adapters[this.key["interface"]].subscribe(this.model, this.key.path, this.sync);
      }
      if (!silent ? this.view.config.preloadData : void 0) {
        this.sync();
      }
      if ((_ref1 = this.options.dependencies) != null ? _ref1.length : void 0) {
        _ref2 = this.options.dependencies;
        _results = [];
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          dependency = _ref2[_i];
          observer = new KeypathObserver(this.view, this.model, dependency, function(obs, prev) {
            var key;
            key = obs.key;
            _this.view.adapters[key["interface"]].unsubscribe(prev, key.path, _this.sync);
            _this.view.adapters[key["interface"]].subscribe(obs.target, key.path, _this.sync);
            return _this.sync();
          });
          key = observer.key;
          this.view.adapters[key["interface"]].subscribe(observer.target, key.path, this.sync);
          _results.push(this.dependencies.push(observer));
        }
        return _results;
      }
    };

    Binding.prototype.unbind = function(silent) {
      var key, obs, _i, _len, _ref, _ref1;
      if (silent == null) {
        silent = false;
      }
      if (!silent) {
        if ((_ref = this.binder.unbind) != null) {
          _ref.call(this, this.el);
        }
      }
      if (this.key) {
        this.view.adapters[this.key["interface"]].unsubscribe(this.model, this.key.path, this.sync);
      }
      if (this.dependencies.length) {
        _ref1 = this.dependencies;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          obs = _ref1[_i];
          key = obs.key;
          this.view.adapters[key["interface"]].unsubscribe(obs.target, key.path, this.sync);
        }
        return this.dependencies = [];
      }
    };

    Binding.prototype.update = function(models) {
      var _ref;
      if (models == null) {
        models = {};
      }
      return (_ref = this.binder.update) != null ? _ref.call(this, models) : void 0;
    };

    return Binding;

  })();

  Rivets.ComponentBinding = (function(_super) {
    __extends(ComponentBinding, _super);

    function ComponentBinding(view, el, type) {
      var attribute, _i, _len, _ref, _ref1;
      this.view = view;
      this.el = el;
      this.type = type;
      this.unbind = __bind(this.unbind, this);
      this.bind = __bind(this.bind, this);
      this.update = __bind(this.update, this);
      this.locals = __bind(this.locals, this);
      this.component = Rivets.components[this.type];
      this.attributes = {};
      this.inflections = {};
      _ref = this.el.attributes || [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        attribute = _ref[_i];
        if (_ref1 = attribute.name, __indexOf.call(this.component.attributes, _ref1) >= 0) {
          this.attributes[attribute.name] = attribute.value;
        } else {
          this.inflections[attribute.name] = attribute.value;
        }
      }
    }

    ComponentBinding.prototype.sync = function() {};

    ComponentBinding.prototype.locals = function(models) {
      var inverse, key, model, path, result, _i, _len, _ref, _ref1;
      if (models == null) {
        models = this.view.models;
      }
      result = {};
      _ref = this.inflections;
      for (key in _ref) {
        inverse = _ref[key];
        _ref1 = inverse.split('.');
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          path = _ref1[_i];
          result[key] = (result[key] || models)[path];
        }
      }
      for (key in models) {
        model = models[key];
        if (result[key] == null) {
          result[key] = model;
        }
      }
      return result;
    };

    ComponentBinding.prototype.update = function(models) {
      var _ref;
      return (_ref = this.componentView) != null ? _ref.update(this.locals(models)) : void 0;
    };

    ComponentBinding.prototype.bind = function() {
      var el, _ref;
      if (this.componentView != null) {
        return (_ref = this.componentView) != null ? _ref.bind() : void 0;
      } else {
        el = this.component.build.call(this.attributes);
        (this.componentView = new Rivets.View(el, this.locals(), this.view.options)).bind();
        return this.el.parentNode.replaceChild(el, this.el);
      }
    };

    ComponentBinding.prototype.unbind = function() {
      var _ref;
      return (_ref = this.componentView) != null ? _ref.unbind() : void 0;
    };

    return ComponentBinding;

  })(Rivets.Binding);

  Rivets.TextBinding = (function(_super) {
    __extends(TextBinding, _super);

    function TextBinding(view, el, type, keypath, options) {
      this.view = view;
      this.el = el;
      this.type = type;
      this.keypath = keypath;
      this.options = options != null ? options : {};
      this.sync = __bind(this.sync, this);
      this.formatters = this.options.formatters || [];
      this.dependencies = [];
      this.setObserver();
    }

    TextBinding.prototype.binder = {
      routine: function(node, value) {
        return node.data = value != null ? value : '';
      }
    };

    TextBinding.prototype.sync = function() {
      return TextBinding.__super__.sync.apply(this, arguments);
    };

    return TextBinding;

  })(Rivets.Binding);

  Rivets.KeypathParser = (function() {
    function KeypathParser() {}

    KeypathParser.parse = function(keypath, interfaces, root) {
      var char, current, index, tokens;
      tokens = [];
      current = {
        "interface": root,
        path: ''
      };
      for (index in keypath) {
        char = keypath[index];
        if (__indexOf.call(interfaces, char) >= 0) {
          tokens.push(current);
          current = {
            "interface": char,
            path: ''
          };
        } else {
          current.path += char;
        }
      }
      tokens.push(current);
      return tokens;
    };

    return KeypathParser;

  })();

  Rivets.TextTemplateParser = (function() {
    function TextTemplateParser() {}

    TextTemplateParser.types = {
      text: 0,
      binding: 1
    };

    TextTemplateParser.parse = function(template, delimiters) {
      var delimiterOffset, index, lastIndex, lastToken, length, substring, tokens, value;
      tokens = [];
      length = template.length;
      delimiterOffset = delimiters[1].length;
      index = 0;
      lastIndex = 0;
      while (lastIndex < length) {
        index = template.indexOf(delimiters[0], lastIndex);
        if (index < 0) {
          tokens.push({
            type: this.types.text,
            value: template.slice(lastIndex)
          });
          break;
        } else {
          if (index > 0 && lastIndex < index) {
            tokens.push({
              type: this.types.text,
              value: template.slice(lastIndex, index)
            });
          }
          lastIndex = index + 2;
          index = template.indexOf(delimiters[1], lastIndex);
          if (index < 0) {
            substring = template.slice(lastIndex - 2);
            lastToken = tokens[tokens.length - 1];
            if ((lastToken != null ? lastToken.type : void 0) === this.types.text) {
              lastToken.value += substring;
            } else {
              tokens.push({
                type: this.types.text,
                value: substring
              });
            }
            break;
          }
          value = template.slice(lastIndex, index).trim();
          tokens.push({
            type: this.types.binding,
            value: value
          });
          lastIndex = index + delimiterOffset;
        }
      }
      return tokens;
    };

    return TextTemplateParser;

  })();

  KeypathObserver = (function() {
    function KeypathObserver(view, model, keypath, callback) {
      this.view = view;
      this.model = model;
      this.keypath = keypath;
      this.callback = callback;
      this.realize = __bind(this.realize, this);
      this.update = __bind(this.update, this);
      this.parse = __bind(this.parse, this);
      this.parse();
      this.objectPath = [];
      this.target = this.realize();
    }

    KeypathObserver.prototype.parse = function() {
      var interfaces, k, path, root, v, _ref;
      interfaces = (function() {
        var _ref, _results;
        _ref = this.view.adapters;
        _results = [];
        for (k in _ref) {
          v = _ref[k];
          _results.push(k);
        }
        return _results;
      }).call(this);
      if (_ref = this.keypath[0], __indexOf.call(interfaces, _ref) >= 0) {
        root = this.keypath[0];
        path = this.keypath.substr(1);
      } else {
        root = this.view.config.rootInterface;
        path = this.keypath;
      }
      this.tokens = Rivets.KeypathParser.parse(path, interfaces, root);
      return this.key = this.tokens.pop();
    };

    KeypathObserver.prototype.update = function() {
      var next, prev;
      if ((next = this.realize()) !== this.target) {
        prev = this.target;
        this.target = next;
        return this.callback(this, prev);
      }
    };

    KeypathObserver.prototype.realize = function() {
      var current, index, prev, token, _i, _len, _ref;
      current = this.model;
      _ref = this.tokens;
      for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
        token = _ref[index];
        if (this.objectPath[index] != null) {
          if (current !== (prev = this.objectPath[index])) {
            this.view.adapters[token["interface"]].unsubscribe(prev, token.path, this.update);
            this.view.adapters[token["interface"]].subscribe(current, token.path, this.update);
            this.objectPath[index] = current;
          }
        } else {
          this.view.adapters[token["interface"]].subscribe(current, token.path, this.update);
          this.objectPath[index] = current;
        }
        current = this.view.adapters[token["interface"]].read(current, token.path);
      }
      return current;
    };

    return KeypathObserver;

  })();

  Rivets.binders.enabled = function(el, value) {
    return el.disabled = !value;
  };

  Rivets.binders.disabled = function(el, value) {
    return el.disabled = !!value;
  };

  Rivets.binders.checked = {
    publishes: true,
    bind: function(el) {
      return Rivets.Util.bindEvent(el, 'change', this.publish);
    },
    unbind: function(el) {
      return Rivets.Util.unbindEvent(el, 'change', this.publish);
    },
    routine: function(el, value) {
      var _ref;
      if (el.type === 'radio') {
        return el.checked = ((_ref = el.value) != null ? _ref.toString() : void 0) === (value != null ? value.toString() : void 0);
      } else {
        return el.checked = !!value;
      }
    }
  };

  Rivets.binders.unchecked = {
    publishes: true,
    bind: function(el) {
      return Rivets.Util.bindEvent(el, 'change', this.publish);
    },
    unbind: function(el) {
      return Rivets.Util.unbindEvent(el, 'change', this.publish);
    },
    routine: function(el, value) {
      var _ref;
      if (el.type === 'radio') {
        return el.checked = ((_ref = el.value) != null ? _ref.toString() : void 0) !== (value != null ? value.toString() : void 0);
      } else {
        return el.checked = !value;
      }
    }
  };

  Rivets.binders.show = function(el, value) {
    return el.style.display = value ? '' : 'none';
  };

  Rivets.binders.hide = function(el, value) {
    return el.style.display = value ? 'none' : '';
  };

  Rivets.binders.html = function(el, value) {
    return el.innerHTML = value != null ? value : '';
  };

  Rivets.binders.value = {
    publishes: true,
    bind: function(el) {
      return Rivets.Util.bindEvent(el, 'change', this.publish);
    },
    unbind: function(el) {
      return Rivets.Util.unbindEvent(el, 'change', this.publish);
    },
    routine: function(el, value) {
      var o, _i, _len, _ref, _ref1, _ref2, _results;
      if (window.jQuery != null) {
        el = jQuery(el);
        if ((value != null ? value.toString() : void 0) !== ((_ref = el.val()) != null ? _ref.toString() : void 0)) {
          return el.val(value != null ? value : '');
        }
      } else {
        if (el.type === 'select-multiple') {
          if (value != null) {
            _results = [];
            for (_i = 0, _len = el.length; _i < _len; _i++) {
              o = el[_i];
              _results.push(o.selected = (_ref1 = o.value, __indexOf.call(value, _ref1) >= 0));
            }
            return _results;
          }
        } else if ((value != null ? value.toString() : void 0) !== ((_ref2 = el.value) != null ? _ref2.toString() : void 0)) {
          return el.value = value != null ? value : '';
        }
      }
    }
  };

  Rivets.binders.text = function(el, value) {
    if (el.innerText != null) {
      return el.innerText = value != null ? value : '';
    } else {
      return el.textContent = value != null ? value : '';
    }
  };

  Rivets.binders["if"] = {
    block: true,
    bind: function(el) {
      var attr, declaration;
      if (this.marker == null) {
        attr = [this.view.config.prefix, this.type].join('-').replace('--', '-');
        declaration = el.getAttribute(attr);
        this.marker = document.createComment(" rivets: " + this.type + " " + declaration + " ");
        el.removeAttribute(attr);
        el.parentNode.insertBefore(this.marker, el);
        return el.parentNode.removeChild(el);
      }
    },
    unbind: function() {
      var _ref;
      return (_ref = this.nested) != null ? _ref.unbind() : void 0;
    },
    routine: function(el, value) {
      var key, model, models, options, _ref;
      if (!!value === (this.nested == null)) {
        if (value) {
          models = {};
          _ref = this.view.models;
          for (key in _ref) {
            model = _ref[key];
            models[key] = model;
          }
          options = {
            binders: this.view.options.binders,
            formatters: this.view.options.formatters,
            adapters: this.view.options.adapters,
            config: this.view.options.config
          };
          (this.nested = new Rivets.View(el, models, options)).bind();
          return this.marker.parentNode.insertBefore(el, this.marker.nextSibling);
        } else {
          el.parentNode.removeChild(el);
          this.nested.unbind();
          return delete this.nested;
        }
      }
    },
    update: function(models) {
      var _ref;
      return (_ref = this.nested) != null ? _ref.update(models) : void 0;
    }
  };

  Rivets.binders.unless = {
    block: true,
    bind: function(el) {
      return Rivets.binders["if"].bind.call(this, el);
    },
    unbind: function() {
      return Rivets.binders["if"].unbind.call(this);
    },
    routine: function(el, value) {
      return Rivets.binders["if"].routine.call(this, el, !value);
    },
    update: function(models) {
      return Rivets.binders["if"].update.call(this, models);
    }
  };

  Rivets.binders['on-*'] = {
    "function": true,
    unbind: function(el) {
      if (this.handler) {
        return Rivets.Util.unbindEvent(el, this.args[0], this.handler);
      }
    },
    routine: function(el, value) {
      if (this.handler) {
        Rivets.Util.unbindEvent(el, this.args[0], this.handler);
      }
      return Rivets.Util.bindEvent(el, this.args[0], this.handler = this.eventHandler(value));
    }
  };

  Rivets.binders['each-*'] = {
    block: true,
    bind: function(el) {
      var attr;
      if (this.marker == null) {
        attr = [this.view.config.prefix, this.type].join('-').replace('--', '-');
        this.marker = document.createComment(" rivets: " + this.type + " ");
        this.iterated = [];
        el.removeAttribute(attr);
        el.parentNode.insertBefore(this.marker, el);
        return el.parentNode.removeChild(el);
      }
    },
    unbind: function(el) {
      var view, _i, _len, _ref, _results;
      if (this.iterated != null) {
        _ref = this.iterated;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          view = _ref[_i];
          _results.push(view.unbind());
        }
        return _results;
      }
    },
    routine: function(el, collection) {
      var binding, data, i, index, k, key, model, modelName, options, previous, template, v, view, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2, _ref3, _results;
      modelName = this.args[0];
      collection = collection || [];
      if (this.iterated.length > collection.length) {
        _ref = Array(this.iterated.length - collection.length);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          i = _ref[_i];
          view = this.iterated.pop();
          view.unbind();
          this.marker.parentNode.removeChild(view.els[0]);
        }
      }
      for (index = _j = 0, _len1 = collection.length; _j < _len1; index = ++_j) {
        model = collection[index];
        data = {};
        data[modelName] = model;
        if (this.iterated[index] == null) {
          _ref1 = this.view.models;
          for (key in _ref1) {
            model = _ref1[key];
            if (data[key] == null) {
              data[key] = model;
            }
          }
          previous = this.iterated.length ? this.iterated[this.iterated.length - 1].els[0] : this.marker;
          options = {
            binders: this.view.options.binders,
            formatters: this.view.options.formatters,
            adapters: this.view.options.adapters,
            config: {}
          };
          _ref2 = this.view.options.config;
          for (k in _ref2) {
            v = _ref2[k];
            options.config[k] = v;
          }
          options.config.preloadData = true;
          template = el.cloneNode(true);
          view = new Rivets.View(template, data, options);
          view.bind();
          this.iterated.push(view);
          this.marker.parentNode.insertBefore(template, previous.nextSibling);
        } else if (this.iterated[index].models[modelName] !== model) {
          this.iterated[index].update(data);
        }
      }
      if (el.nodeName === 'OPTION') {
        _ref3 = this.view.bindings;
        _results = [];
        for (_k = 0, _len2 = _ref3.length; _k < _len2; _k++) {
          binding = _ref3[_k];
          if (binding.el === this.marker.parentNode && binding.type === 'value') {
            _results.push(binding.sync());
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      }
    },
    update: function(models) {
      var data, key, model, view, _i, _len, _ref, _results;
      data = {};
      for (key in models) {
        model = models[key];
        if (key !== this.args[0]) {
          data[key] = model;
        }
      }
      _ref = this.iterated;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        view = _ref[_i];
        _results.push(view.update(data));
      }
      return _results;
    }
  };

  Rivets.binders['class-*'] = function(el, value) {
    var elClass;
    elClass = " " + el.className + " ";
    if (!value === (elClass.indexOf(" " + this.args[0] + " ") !== -1)) {
      return el.className = value ? "" + el.className + " " + this.args[0] : elClass.replace(" " + this.args[0] + " ", ' ').trim();
    }
  };

  Rivets.binders['*'] = function(el, value) {
    if (value) {
      return el.setAttribute(this.type, value);
    } else {
      return el.removeAttribute(this.type);
    }
  };

  Rivets.adapters['.'] = {
    id: '_rv',
    counter: 0,
    weakmap: {},
    weakReference: function(obj) {
      var id;
      if (obj[this.id] == null) {
        id = this.counter++;
        this.weakmap[id] = {
          callbacks: {}
        };
        Object.defineProperty(obj, this.id, {
          value: id
        });
      }
      return this.weakmap[obj[this.id]];
    },
    stubFunction: function(obj, fn) {
      var map, original, weakmap;
      original = obj[fn];
      map = this.weakReference(obj);
      weakmap = this.weakmap;
      return obj[fn] = function() {
        var callback, k, r, response, _i, _len, _ref, _ref1, _ref2, _ref3;
        response = original.apply(obj, arguments);
        _ref = map.pointers;
        for (r in _ref) {
          k = _ref[r];
          _ref3 = (_ref1 = (_ref2 = weakmap[r]) != null ? _ref2.callbacks[k] : void 0) != null ? _ref1 : [];
          for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
            callback = _ref3[_i];
            callback();
          }
        }
        return response;
      };
    },
    observeMutations: function(obj, ref, keypath) {
      var fn, functions, map, _base, _i, _len;
      if (Array.isArray(obj)) {
        map = this.weakReference(obj);
        if (map.pointers == null) {
          map.pointers = {};
          functions = ['push', 'pop', 'shift', 'unshift', 'sort', 'reverse', 'splice'];
          for (_i = 0, _len = functions.length; _i < _len; _i++) {
            fn = functions[_i];
            this.stubFunction(obj, fn);
          }
        }
        if ((_base = map.pointers)[ref] == null) {
          _base[ref] = [];
        }
        if (__indexOf.call(map.pointers[ref], keypath) < 0) {
          return map.pointers[ref].push(keypath);
        }
      }
    },
    unobserveMutations: function(obj, ref, keypath) {
      var keypaths, _ref;
      if (Array.isArray(obj && (obj[this.id] != null))) {
        if (keypaths = (_ref = this.weakReference(obj).pointers) != null ? _ref[ref] : void 0) {
          return keypaths.splice(keypaths.indexOf(keypath), 1);
        }
      }
    },
    subscribe: function(obj, keypath, callback) {
      var callbacks, value,
        _this = this;
      callbacks = this.weakReference(obj).callbacks;
      if (callbacks[keypath] == null) {
        callbacks[keypath] = [];
        value = obj[keypath];
        Object.defineProperty(obj, keypath, {
          get: function() {
            return value;
          },
          set: function(newValue) {
            var _i, _len, _ref;
            if (newValue !== value) {
              value = newValue;
              _ref = callbacks[keypath];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                callback = _ref[_i];
                callback();
              }
              return _this.observeMutations(newValue, obj[_this.id], keypath);
            }
          }
        });
      }
      if (__indexOf.call(callbacks[keypath], callback) < 0) {
        callbacks[keypath].push(callback);
      }
      return this.observeMutations(obj[keypath], obj[this.id], keypath);
    },
    unsubscribe: function(obj, keypath, callback) {
      var callbacks;
      callbacks = this.weakmap[obj[this.id]].callbacks[keypath];
      callbacks.splice(callbacks.indexOf(callback), 1);
      return this.unobserveMutations(obj[keypath], obj[this.id], keypath);
    },
    read: function(obj, keypath) {
      return obj[keypath];
    },
    publish: function(obj, keypath, value) {
      return obj[keypath] = value;
    }
  };

  Rivets.factory = function(exports) {
    exports._ = Rivets;
    exports.binders = Rivets.binders;
    exports.components = Rivets.components;
    exports.formatters = Rivets.formatters;
    exports.adapters = Rivets.adapters;
    exports.config = Rivets.config;
    exports.configure = function(options) {
      var property, value;
      if (options == null) {
        options = {};
      }
      for (property in options) {
        value = options[property];
        Rivets.config[property] = value;
      }
    };
    return exports.bind = function(el, models, options) {
      var view;
      if (models == null) {
        models = {};
      }
      if (options == null) {
        options = {};
      }
      view = new Rivets.View(el, models, options);
      view.bind();
      return view;
    };
  };

  if (typeof exports === 'object') {
    Rivets.factory(exports);
  } else if (typeof define === 'function' && define.amd) {
    define(['exports'], function(exports) {
      Rivets.factory(this.rivets = exports);
      return exports;
    });
  } else {
    Rivets.factory(this.rivets = {});
  }

}).call(this);
