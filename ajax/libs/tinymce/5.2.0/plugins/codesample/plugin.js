/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 *
 * Version: 5.2.0 (2020-02-13)
 */
(function (domGlobals) {
    'use strict';

    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

    var noop = function () {
    };
    var constant = function (value) {
      return function () {
        return value;
      };
    };
    var never = constant(false);
    var always = constant(true);

    var none = function () {
      return NONE;
    };
    var NONE = function () {
      var eq = function (o) {
        return o.isNone();
      };
      var call = function (thunk) {
        return thunk();
      };
      var id = function (n) {
        return n;
      };
      var me = {
        fold: function (n, s) {
          return n();
        },
        is: never,
        isSome: never,
        isNone: always,
        getOr: id,
        getOrThunk: call,
        getOrDie: function (msg) {
          throw new Error(msg || 'error: getOrDie called on none.');
        },
        getOrNull: constant(null),
        getOrUndefined: constant(undefined),
        or: id,
        orThunk: call,
        map: none,
        each: noop,
        bind: none,
        exists: never,
        forall: always,
        filter: none,
        equals: eq,
        equals_: eq,
        toArray: function () {
          return [];
        },
        toString: constant('none()')
      };
      if (Object.freeze) {
        Object.freeze(me);
      }
      return me;
    }();
    var some = function (a) {
      var constant_a = constant(a);
      var self = function () {
        return me;
      };
      var bind = function (f) {
        return f(a);
      };
      var me = {
        fold: function (n, s) {
          return s(a);
        },
        is: function (v) {
          return a === v;
        },
        isSome: always,
        isNone: never,
        getOr: constant_a,
        getOrThunk: constant_a,
        getOrDie: constant_a,
        getOrNull: constant_a,
        getOrUndefined: constant_a,
        or: self,
        orThunk: self,
        map: function (f) {
          return some(f(a));
        },
        each: function (f) {
          f(a);
        },
        bind: bind,
        exists: bind,
        forall: bind,
        filter: function (f) {
          return f(a) ? me : NONE;
        },
        toArray: function () {
          return [a];
        },
        toString: function () {
          return 'some(' + a + ')';
        },
        equals: function (o) {
          return o.is(a);
        },
        equals_: function (o, elementEq) {
          return o.fold(never, function (b) {
            return elementEq(a, b);
          });
        }
      };
      return me;
    };
    var from = function (value) {
      return value === null || value === undefined ? NONE : some(value);
    };
    var Option = {
      some: some,
      none: none,
      from: from
    };

    var global$1 = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');

    function isCodeSample(elm) {
      return elm && elm.nodeName === 'PRE' && elm.className.indexOf('language-') !== -1;
    }
    function trimArg(predicateFn) {
      return function (arg1, arg2) {
        return predicateFn(arg2);
      };
    }
    var Utils = {
      isCodeSample: isCodeSample,
      trimArg: trimArg
    };

    var Global = typeof domGlobals.window !== 'undefined' ? domGlobals.window : Function('return this;')();

    var exports$1 = {}, module = { exports: exports$1 }, global$2 = {};
    (function (define, exports, module, require) {
      var oldprism = window.Prism;
      window.Prism = { manual: true };
      (function (f) {
        if (typeof exports === 'object' && typeof module !== 'undefined') {
          module.exports = f();
        } else if (typeof define === 'function' && define.amd) {
          define([], f);
        } else {
          var g;
          if (typeof window !== 'undefined') {
            g = window;
          } else if (typeof global$2 !== 'undefined') {
            g = global$2;
          } else if (typeof self !== 'undefined') {
            g = self;
          } else {
            g = this;
          }
          g.EphoxContactWrapper = f();
        }
      }(function () {
        return function () {
          function r(e, n, t) {
            function o(i, f) {
              if (!n[i]) {
                if (!e[i]) {
                  var c = 'function' == typeof require && require;
                  if (!f && c)
                    return c(i, !0);
                  if (u)
                    return u(i, !0);
                  var a = new Error('Cannot find module \'' + i + '\'');
                  throw a.code = 'MODULE_NOT_FOUND', a;
                }
                var p = n[i] = { exports: {} };
                e[i][0].call(p.exports, function (r) {
                  var n = e[i][1][r];
                  return o(n || r);
                }, p, p.exports, r, e, n, t);
              }
              return n[i].exports;
            }
            for (var u = 'function' == typeof require && require, i = 0; i < t.length; i++)
              o(t[i]);
            return o;
          }
          return r;
        }()({
          1: [
            function (require, module, exports) {
              Prism.languages.c = Prism.languages.extend('clike', {
                'class-name': {
                  pattern: /(\b(?:enum|struct)\s+)\w+/,
                  lookbehind: true
                },
                'keyword': /\b(?:_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/,
                'operator': />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?/,
                'number': /(?:\b0x(?:[\da-f]+\.?[\da-f]*|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?)[ful]*/i
              });
              Prism.languages.insertBefore('c', 'string', {
                'macro': {
                  pattern: /(^\s*)#\s*[a-z]+(?:[^\r\n\\]|\\(?:\r\n|[\s\S]))*/im,
                  lookbehind: true,
                  alias: 'property',
                  inside: {
                    'string': {
                      pattern: /(#\s*include\s*)(?:<.+?>|("|')(?:\\?.)+?\2)/,
                      lookbehind: true
                    },
                    'directive': {
                      pattern: /(#\s*)\b(?:define|defined|elif|else|endif|error|ifdef|ifndef|if|import|include|line|pragma|undef|using)\b/,
                      lookbehind: true,
                      alias: 'keyword'
                    }
                  }
                },
                'constant': /\b(?:__FILE__|__LINE__|__DATE__|__TIME__|__TIMESTAMP__|__func__|EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|stdin|stdout|stderr)\b/
              });
              delete Prism.languages.c['boolean'];
            },
            {}
          ],
          2: [
            function (require, module, exports) {
              Prism.languages.clike = {
                'comment': [
                  {
                    pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
                    lookbehind: true
                  },
                  {
                    pattern: /(^|[^\\:])\/\/.*/,
                    lookbehind: true,
                    greedy: true
                  }
                ],
                'string': {
                  pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
                  greedy: true
                },
                'class-name': {
                  pattern: /(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,
                  lookbehind: true,
                  inside: { 'punctuation': /[.\\]/ }
                },
                'keyword': /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
                'boolean': /\b(?:true|false)\b/,
                'function': /\w+(?=\()/,
                'number': /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
                'operator': /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
                'punctuation': /[{}[\];(),.:]/
              };
            },
            {}
          ],
          3: [
            function (require, module, exports) {
              (function (global) {
                var _self = typeof window !== 'undefined' ? window : typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope ? self : {};
                var Prism = function (_self) {
                  var lang = /\blang(?:uage)?-([\w-]+)\b/i;
                  var uniqueId = 0;
                  var _ = {
                    manual: _self.Prism && _self.Prism.manual,
                    disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,
                    util: {
                      encode: function (tokens) {
                        if (tokens instanceof Token) {
                          return new Token(tokens.type, _.util.encode(tokens.content), tokens.alias);
                        } else if (Array.isArray(tokens)) {
                          return tokens.map(_.util.encode);
                        } else {
                          return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
                        }
                      },
                      type: function (o) {
                        return Object.prototype.toString.call(o).slice(8, -1);
                      },
                      objId: function (obj) {
                        if (!obj['__id']) {
                          Object.defineProperty(obj, '__id', { value: ++uniqueId });
                        }
                        return obj['__id'];
                      },
                      clone: function deepClone(o, visited) {
                        var clone, id, type = _.util.type(o);
                        visited = visited || {};
                        switch (type) {
                        case 'Object':
                          id = _.util.objId(o);
                          if (visited[id]) {
                            return visited[id];
                          }
                          clone = {};
                          visited[id] = clone;
                          for (var key in o) {
                            if (o.hasOwnProperty(key)) {
                              clone[key] = deepClone(o[key], visited);
                            }
                          }
                          return clone;
                        case 'Array':
                          id = _.util.objId(o);
                          if (visited[id]) {
                            return visited[id];
                          }
                          clone = [];
                          visited[id] = clone;
                          o.forEach(function (v, i) {
                            clone[i] = deepClone(v, visited);
                          });
                          return clone;
                        default:
                          return o;
                        }
                      },
                      getLanguage: function (element) {
                        while (element && !lang.test(element.className)) {
                          element = element.parentElement;
                        }
                        if (element) {
                          return (element.className.match(lang) || [
                            ,
                            'none'
                          ])[1].toLowerCase();
                        }
                        return 'none';
                      },
                      currentScript: function () {
                        if (typeof document === 'undefined') {
                          return null;
                        }
                        if ('currentScript' in document) {
                          return document.currentScript;
                        }
                        try {
                          throw new Error();
                        } catch (err) {
                          var src = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(err.stack) || [])[1];
                          if (src) {
                            var scripts = document.getElementsByTagName('script');
                            for (var i in scripts) {
                              if (scripts[i].src == src) {
                                return scripts[i];
                              }
                            }
                          }
                          return null;
                        }
                      }
                    },
                    languages: {
                      extend: function (id, redef) {
                        var lang = _.util.clone(_.languages[id]);
                        for (var key in redef) {
                          lang[key] = redef[key];
                        }
                        return lang;
                      },
                      insertBefore: function (inside, before, insert, root) {
                        root = root || _.languages;
                        var grammar = root[inside];
                        var ret = {};
                        for (var token in grammar) {
                          if (grammar.hasOwnProperty(token)) {
                            if (token == before) {
                              for (var newToken in insert) {
                                if (insert.hasOwnProperty(newToken)) {
                                  ret[newToken] = insert[newToken];
                                }
                              }
                            }
                            if (!insert.hasOwnProperty(token)) {
                              ret[token] = grammar[token];
                            }
                          }
                        }
                        var old = root[inside];
                        root[inside] = ret;
                        _.languages.DFS(_.languages, function (key, value) {
                          if (value === old && key != inside) {
                            this[key] = ret;
                          }
                        });
                        return ret;
                      },
                      DFS: function DFS(o, callback, type, visited) {
                        visited = visited || {};
                        var objId = _.util.objId;
                        for (var i in o) {
                          if (o.hasOwnProperty(i)) {
                            callback.call(o, i, o[i], type || i);
                            var property = o[i], propertyType = _.util.type(property);
                            if (propertyType === 'Object' && !visited[objId(property)]) {
                              visited[objId(property)] = true;
                              DFS(property, callback, null, visited);
                            } else if (propertyType === 'Array' && !visited[objId(property)]) {
                              visited[objId(property)] = true;
                              DFS(property, callback, i, visited);
                            }
                          }
                        }
                      }
                    },
                    plugins: {},
                    highlightAll: function (async, callback) {
                      _.highlightAllUnder(document, async, callback);
                    },
                    highlightAllUnder: function (container, async, callback) {
                      var env = {
                        callback: callback,
                        container: container,
                        selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
                      };
                      _.hooks.run('before-highlightall', env);
                      env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector));
                      _.hooks.run('before-all-elements-highlight', env);
                      for (var i = 0, element; element = env.elements[i++];) {
                        _.highlightElement(element, async === true, env.callback);
                      }
                    },
                    highlightElement: function (element, async, callback) {
                      var language = _.util.getLanguage(element);
                      var grammar = _.languages[language];
                      element.className = element.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
                      var parent = element.parentNode;
                      if (parent && parent.nodeName.toLowerCase() === 'pre') {
                        parent.className = parent.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
                      }
                      var code = element.textContent;
                      var env = {
                        element: element,
                        language: language,
                        grammar: grammar,
                        code: code
                      };
                      function insertHighlightedCode(highlightedCode) {
                        env.highlightedCode = highlightedCode;
                        _.hooks.run('before-insert', env);
                        env.element.innerHTML = env.highlightedCode;
                        _.hooks.run('after-highlight', env);
                        _.hooks.run('complete', env);
                        callback && callback.call(env.element);
                      }
                      _.hooks.run('before-sanity-check', env);
                      if (!env.code) {
                        _.hooks.run('complete', env);
                        callback && callback.call(env.element);
                        return;
                      }
                      _.hooks.run('before-highlight', env);
                      if (!env.grammar) {
                        insertHighlightedCode(_.util.encode(env.code));
                        return;
                      }
                      if (async && _self.Worker) {
                        var worker = new Worker(_.filename);
                        worker.onmessage = function (evt) {
                          insertHighlightedCode(evt.data);
                        };
                        worker.postMessage(JSON.stringify({
                          language: env.language,
                          code: env.code,
                          immediateClose: true
                        }));
                      } else {
                        insertHighlightedCode(_.highlight(env.code, env.grammar, env.language));
                      }
                    },
                    highlight: function (text, grammar, language) {
                      var env = {
                        code: text,
                        grammar: grammar,
                        language: language
                      };
                      _.hooks.run('before-tokenize', env);
                      env.tokens = _.tokenize(env.code, env.grammar);
                      _.hooks.run('after-tokenize', env);
                      return Token.stringify(_.util.encode(env.tokens), env.language);
                    },
                    matchGrammar: function (text, strarr, grammar, index, startPos, oneshot, target) {
                      for (var token in grammar) {
                        if (!grammar.hasOwnProperty(token) || !grammar[token]) {
                          continue;
                        }
                        var patterns = grammar[token];
                        patterns = Array.isArray(patterns) ? patterns : [patterns];
                        for (var j = 0; j < patterns.length; ++j) {
                          if (target && target == token + ',' + j) {
                            return;
                          }
                          var pattern = patterns[j], inside = pattern.inside, lookbehind = !!pattern.lookbehind, greedy = !!pattern.greedy, lookbehindLength = 0, alias = pattern.alias;
                          if (greedy && !pattern.pattern.global) {
                            var flags = pattern.pattern.toString().match(/[imsuy]*$/)[0];
                            pattern.pattern = RegExp(pattern.pattern.source, flags + 'g');
                          }
                          pattern = pattern.pattern || pattern;
                          for (var i = index, pos = startPos; i < strarr.length; pos += strarr[i].length, ++i) {
                            var str = strarr[i];
                            if (strarr.length > text.length) {
                              return;
                            }
                            if (str instanceof Token) {
                              continue;
                            }
                            if (greedy && i != strarr.length - 1) {
                              pattern.lastIndex = pos;
                              var match = pattern.exec(text);
                              if (!match) {
                                break;
                              }
                              var from = match.index + (lookbehind && match[1] ? match[1].length : 0), to = match.index + match[0].length, k = i, p = pos;
                              for (var len = strarr.length; k < len && (p < to || !strarr[k].type && !strarr[k - 1].greedy); ++k) {
                                p += strarr[k].length;
                                if (from >= p) {
                                  ++i;
                                  pos = p;
                                }
                              }
                              if (strarr[i] instanceof Token) {
                                continue;
                              }
                              delNum = k - i;
                              str = text.slice(pos, p);
                              match.index -= pos;
                            } else {
                              pattern.lastIndex = 0;
                              var match = pattern.exec(str), delNum = 1;
                            }
                            if (!match) {
                              if (oneshot) {
                                break;
                              }
                              continue;
                            }
                            if (lookbehind) {
                              lookbehindLength = match[1] ? match[1].length : 0;
                            }
                            var from = match.index + lookbehindLength, match = match[0].slice(lookbehindLength), to = from + match.length, before = str.slice(0, from), after = str.slice(to);
                            var args = [
                              i,
                              delNum
                            ];
                            if (before) {
                              ++i;
                              pos += before.length;
                              args.push(before);
                            }
                            var wrapped = new Token(token, inside ? _.tokenize(match, inside) : match, alias, match, greedy);
                            args.push(wrapped);
                            if (after) {
                              args.push(after);
                            }
                            Array.prototype.splice.apply(strarr, args);
                            if (delNum != 1)
                              _.matchGrammar(text, strarr, grammar, i, pos, true, token + ',' + j);
                            if (oneshot)
                              break;
                          }
                        }
                      }
                    },
                    tokenize: function (text, grammar) {
                      var strarr = [text];
                      var rest = grammar.rest;
                      if (rest) {
                        for (var token in rest) {
                          grammar[token] = rest[token];
                        }
                        delete grammar.rest;
                      }
                      _.matchGrammar(text, strarr, grammar, 0, 0, false);
                      return strarr;
                    },
                    hooks: {
                      all: {},
                      add: function (name, callback) {
                        var hooks = _.hooks.all;
                        hooks[name] = hooks[name] || [];
                        hooks[name].push(callback);
                      },
                      run: function (name, env) {
                        var callbacks = _.hooks.all[name];
                        if (!callbacks || !callbacks.length) {
                          return;
                        }
                        for (var i = 0, callback; callback = callbacks[i++];) {
                          callback(env);
                        }
                      }
                    },
                    Token: Token
                  };
                  _self.Prism = _;
                  function Token(type, content, alias, matchedStr, greedy) {
                    this.type = type;
                    this.content = content;
                    this.alias = alias;
                    this.length = (matchedStr || '').length | 0;
                    this.greedy = !!greedy;
                  }
                  Token.stringify = function (o, language) {
                    if (typeof o == 'string') {
                      return o;
                    }
                    if (Array.isArray(o)) {
                      return o.map(function (element) {
                        return Token.stringify(element, language);
                      }).join('');
                    }
                    var env = {
                      type: o.type,
                      content: Token.stringify(o.content, language),
                      tag: 'span',
                      classes: [
                        'token',
                        o.type
                      ],
                      attributes: {},
                      language: language
                    };
                    if (o.alias) {
                      var aliases = Array.isArray(o.alias) ? o.alias : [o.alias];
                      Array.prototype.push.apply(env.classes, aliases);
                    }
                    _.hooks.run('wrap', env);
                    var attributes = Object.keys(env.attributes).map(function (name) {
                      return name + '="' + (env.attributes[name] || '').replace(/"/g, '&quot;') + '"';
                    }).join(' ');
                    return '<' + env.tag + ' class="' + env.classes.join(' ') + '"' + (attributes ? ' ' + attributes : '') + '>' + env.content + '</' + env.tag + '>';
                  };
                  if (!_self.document) {
                    if (!_self.addEventListener) {
                      return _;
                    }
                    if (!_.disableWorkerMessageHandler) {
                      _self.addEventListener('message', function (evt) {
                        var message = JSON.parse(evt.data), lang = message.language, code = message.code, immediateClose = message.immediateClose;
                        _self.postMessage(_.highlight(code, _.languages[lang], lang));
                        if (immediateClose) {
                          _self.close();
                        }
                      }, false);
                    }
                    return _;
                  }
                  var script = _.util.currentScript();
                  if (script) {
                    _.filename = script.src;
                    if (script.hasAttribute('data-manual')) {
                      _.manual = true;
                    }
                  }
                  if (!_.manual) {
                    var highlightAutomaticallyCallback = function () {
                      if (!_.manual) {
                        _.highlightAll();
                      }
                    };
                    var readyState = document.readyState;
                    if (readyState === 'loading' || readyState === 'interactive' && script && script.defer) {
                      document.addEventListener('DOMContentLoaded', highlightAutomaticallyCallback);
                    } else {
                      if (window.requestAnimationFrame) {
                        window.requestAnimationFrame(highlightAutomaticallyCallback);
                      } else {
                        window.setTimeout(highlightAutomaticallyCallback, 16);
                      }
                    }
                  }
                  return _;
                }(_self);
                if (typeof module !== 'undefined' && module.exports) {
                  module.exports = Prism;
                }
                if (typeof global !== 'undefined') {
                  global.Prism = Prism;
                }
              }.call(this, typeof global$2 !== 'undefined' ? global$2 : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : {}));
            },
            {}
          ],
          4: [
            function (require, module, exports) {
              Prism.languages.cpp = Prism.languages.extend('c', {
                'class-name': {
                  pattern: /(\b(?:class|enum|struct)\s+)\w+/,
                  lookbehind: true
                },
                'keyword': /\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|class|compl|const|constexpr|const_cast|continue|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|float|for|friend|goto|if|inline|int|int8_t|int16_t|int32_t|int64_t|uint8_t|uint16_t|uint32_t|uint64_t|long|mutable|namespace|new|noexcept|nullptr|operator|private|protected|public|register|reinterpret_cast|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/,
                'number': {
                  pattern: /(?:\b0b[01']+|\b0x(?:[\da-f']+\.?[\da-f']*|\.[\da-f']+)(?:p[+-]?[\d']+)?|(?:\b[\d']+\.?[\d']*|\B\.[\d']+)(?:e[+-]?[\d']+)?)[ful]*/i,
                  greedy: true
                },
                'operator': />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?|\b(?:and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/,
                'boolean': /\b(?:true|false)\b/
              });
              Prism.languages.insertBefore('cpp', 'string', {
                'raw-string': {
                  pattern: /R"([^()\\ ]{0,16})\([\s\S]*?\)\1"/,
                  alias: 'string',
                  greedy: true
                }
              });
            },
            {}
          ],
          5: [
            function (require, module, exports) {
              Prism.languages.csharp = Prism.languages.extend('clike', {
                'keyword': /\b(?:abstract|add|alias|as|ascending|async|await|base|bool|break|byte|case|catch|char|checked|class|const|continue|decimal|default|delegate|descending|do|double|dynamic|else|enum|event|explicit|extern|false|finally|fixed|float|for|foreach|from|get|global|goto|group|if|implicit|in|int|interface|internal|into|is|join|let|lock|long|namespace|new|null|object|operator|orderby|out|override|params|partial|private|protected|public|readonly|ref|remove|return|sbyte|sealed|select|set|short|sizeof|stackalloc|static|string|struct|switch|this|throw|true|try|typeof|uint|ulong|unchecked|unsafe|ushort|using|value|var|virtual|void|volatile|where|while|yield)\b/,
                'string': [
                  {
                    pattern: /@("|')(?:\1\1|\\[\s\S]|(?!\1)[^\\])*\1/,
                    greedy: true
                  },
                  {
                    pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*?\1/,
                    greedy: true
                  }
                ],
                'class-name': [
                  {
                    pattern: /\b[A-Z]\w*(?:\.\w+)*\b(?=\s+\w+)/,
                    inside: { punctuation: /\./ }
                  },
                  {
                    pattern: /(\[)[A-Z]\w*(?:\.\w+)*\b/,
                    lookbehind: true,
                    inside: { punctuation: /\./ }
                  },
                  {
                    pattern: /(\b(?:class|interface)\s+[A-Z]\w*(?:\.\w+)*\s*:\s*)[A-Z]\w*(?:\.\w+)*\b/,
                    lookbehind: true,
                    inside: { punctuation: /\./ }
                  },
                  {
                    pattern: /((?:\b(?:class|interface|new)\s+)|(?:catch\s+\())[A-Z]\w*(?:\.\w+)*\b/,
                    lookbehind: true,
                    inside: { punctuation: /\./ }
                  }
                ],
                'number': /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)f?/i,
                'operator': />>=?|<<=?|[-=]>|([-+&|?])\1|~|[-+*/%&|^!=<>]=?/,
                'punctuation': /\?\.?|::|[{}[\];(),.:]/
              });
              Prism.languages.insertBefore('csharp', 'class-name', {
                'generic-method': {
                  pattern: /\w+\s*<[^>\r\n]+?>\s*(?=\()/,
                  inside: {
                    function: /^\w+/,
                    'class-name': {
                      pattern: /\b[A-Z]\w*(?:\.\w+)*\b/,
                      inside: { punctuation: /\./ }
                    },
                    keyword: Prism.languages.csharp.keyword,
                    punctuation: /[<>(),.:]/
                  }
                },
                'preprocessor': {
                  pattern: /(^\s*)#.*/m,
                  lookbehind: true,
                  alias: 'property',
                  inside: {
                    'directive': {
                      pattern: /(\s*#)\b(?:define|elif|else|endif|endregion|error|if|line|pragma|region|undef|warning)\b/,
                      lookbehind: true,
                      alias: 'keyword'
                    }
                  }
                }
              });
              Prism.languages.dotnet = Prism.languages.cs = Prism.languages.csharp;
            },
            {}
          ],
          6: [
            function (require, module, exports) {
              (function (Prism) {
                var string = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
                Prism.languages.css = {
                  'comment': /\/\*[\s\S]*?\*\//,
                  'atrule': {
                    pattern: /@[\w-]+[\s\S]*?(?:;|(?=\s*\{))/,
                    inside: { 'rule': /@[\w-]+/ }
                  },
                  'url': {
                    pattern: RegExp('url\\((?:' + string.source + '|[^\n\r()]*)\\)', 'i'),
                    inside: {
                      'function': /^url/i,
                      'punctuation': /^\(|\)$/
                    }
                  },
                  'selector': RegExp('[^{}\\s](?:[^{};"\']|' + string.source + ')*?(?=\\s*\\{)'),
                  'string': {
                    pattern: string,
                    greedy: true
                  },
                  'property': /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
                  'important': /!important\b/i,
                  'function': /[-a-z0-9]+(?=\()/i,
                  'punctuation': /[(){};:,]/
                };
                Prism.languages.css['atrule'].inside.rest = Prism.languages.css;
                var markup = Prism.languages.markup;
                if (markup) {
                  markup.tag.addInlined('style', 'css');
                  Prism.languages.insertBefore('inside', 'attr-value', {
                    'style-attr': {
                      pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
                      inside: {
                        'attr-name': {
                          pattern: /^\s*style/i,
                          inside: markup.tag.inside
                        },
                        'punctuation': /^\s*=\s*['"]|['"]\s*$/,
                        'attr-value': {
                          pattern: /.+/i,
                          inside: Prism.languages.css
                        }
                      },
                      alias: 'language-css'
                    }
                  }, markup.tag);
                }
              }(Prism));
            },
            {}
          ],
          7: [
            function (require, module, exports) {
              (function (Prism) {
                var keywords = /\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|null|open|opens|package|private|protected|provides|public|requires|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|to|transient|transitive|try|uses|var|void|volatile|while|with|yield)\b/;
                var className = /\b[A-Z](?:\w*[a-z]\w*)?\b/;
                Prism.languages.java = Prism.languages.extend('clike', {
                  'class-name': [
                    className,
                    /\b[A-Z]\w*(?=\s+\w+\s*[;,=())])/
                  ],
                  'keyword': keywords,
                  'function': [
                    Prism.languages.clike.function,
                    {
                      pattern: /(\:\:)[a-z_]\w*/,
                      lookbehind: true
                    }
                  ],
                  'number': /\b0b[01][01_]*L?\b|\b0x[\da-f_]*\.?[\da-f_p+-]+\b|(?:\b\d[\d_]*\.?[\d_]*|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfl]?/i,
                  'operator': {
                    pattern: /(^|[^.])(?:<<=?|>>>?=?|->|--|\+\+|&&|\|\||::|[?:~]|[-+*/%&|^!=<>]=?)/m,
                    lookbehind: true
                  }
                });
                Prism.languages.insertBefore('java', 'string', {
                  'triple-quoted-string': {
                    pattern: /"""[ \t]*[\r\n](?:(?:"|"")?(?:\\.|[^"\\]))*"""/,
                    greedy: true,
                    alias: 'string'
                  }
                });
                Prism.languages.insertBefore('java', 'class-name', {
                  'annotation': {
                    alias: 'punctuation',
                    pattern: /(^|[^.])@\w+/,
                    lookbehind: true
                  },
                  'namespace': {
                    pattern: /(\b(?:exports|import(?:\s+static)?|module|open|opens|package|provides|requires|to|transitive|uses|with)\s+)[a-z]\w*(?:\.[a-z]\w*)+/,
                    lookbehind: true,
                    inside: { 'punctuation': /\./ }
                  },
                  'generics': {
                    pattern: /<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<[\w\s,.&?]*>)*>)*>)*>/,
                    inside: {
                      'class-name': className,
                      'keyword': keywords,
                      'punctuation': /[<>(),.:]/,
                      'operator': /[?&|]/
                    }
                  }
                });
              }(Prism));
            },
            {}
          ],
          8: [
            function (require, module, exports) {
              Prism.languages.javascript = Prism.languages.extend('clike', {
                'class-name': [
                  Prism.languages.clike['class-name'],
                  {
                    pattern: /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,
                    lookbehind: true
                  }
                ],
                'keyword': [
                  {
                    pattern: /((?:^|})\s*)(?:catch|finally)\b/,
                    lookbehind: true
                  },
                  {
                    pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
                    lookbehind: true
                  }
                ],
                'number': /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
                'function': /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
                'operator': /--|\+\+|\*\*=?|=>|&&|\|\||[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?[.?]?|[~:]/
              });
              Prism.languages.javascript['class-name'][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/;
              Prism.languages.insertBefore('javascript', 'keyword', {
                'regex': {
                  pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=(?:\s|\/\*[\s\S]*?\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
                  lookbehind: true,
                  greedy: true
                },
                'function-variable': {
                  pattern: /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/,
                  alias: 'function'
                },
                'parameter': [
                  {
                    pattern: /(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/,
                    lookbehind: true,
                    inside: Prism.languages.javascript
                  },
                  {
                    pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i,
                    inside: Prism.languages.javascript
                  },
                  {
                    pattern: /(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/,
                    lookbehind: true,
                    inside: Prism.languages.javascript
                  },
                  {
                    pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/,
                    lookbehind: true,
                    inside: Prism.languages.javascript
                  }
                ],
                'constant': /\b[A-Z](?:[A-Z_]|\dx?)*\b/
              });
              Prism.languages.insertBefore('javascript', 'string', {
                'template-string': {
                  pattern: /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,
                  greedy: true,
                  inside: {
                    'template-punctuation': {
                      pattern: /^`|`$/,
                      alias: 'string'
                    },
                    'interpolation': {
                      pattern: /((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,
                      lookbehind: true,
                      inside: {
                        'interpolation-punctuation': {
                          pattern: /^\${|}$/,
                          alias: 'punctuation'
                        },
                        rest: Prism.languages.javascript
                      }
                    },
                    'string': /[\s\S]+/
                  }
                }
              });
              if (Prism.languages.markup) {
                Prism.languages.markup.tag.addInlined('script', 'javascript');
              }
              Prism.languages.js = Prism.languages.javascript;
            },
            {}
          ],
          9: [
            function (require, module, exports) {
              (function (Prism) {
                function getPlaceholder(language, index) {
                  return '___' + language.toUpperCase() + index + '___';
                }
                Object.defineProperties(Prism.languages['markup-templating'] = {}, {
                  buildPlaceholders: {
                    value: function (env, language, placeholderPattern, replaceFilter) {
                      if (env.language !== language) {
                        return;
                      }
                      var tokenStack = env.tokenStack = [];
                      env.code = env.code.replace(placeholderPattern, function (match) {
                        if (typeof replaceFilter === 'function' && !replaceFilter(match)) {
                          return match;
                        }
                        var i = tokenStack.length;
                        var placeholder;
                        while (env.code.indexOf(placeholder = getPlaceholder(language, i)) !== -1)
                          ++i;
                        tokenStack[i] = match;
                        return placeholder;
                      });
                      env.grammar = Prism.languages.markup;
                    }
                  },
                  tokenizePlaceholders: {
                    value: function (env, language) {
                      if (env.language !== language || !env.tokenStack) {
                        return;
                      }
                      env.grammar = Prism.languages[language];
                      var j = 0;
                      var keys = Object.keys(env.tokenStack);
                      function walkTokens(tokens) {
                        for (var i = 0; i < tokens.length; i++) {
                          if (j >= keys.length) {
                            break;
                          }
                          var token = tokens[i];
                          if (typeof token === 'string' || token.content && typeof token.content === 'string') {
                            var k = keys[j];
                            var t = env.tokenStack[k];
                            var s = typeof token === 'string' ? token : token.content;
                            var placeholder = getPlaceholder(language, k);
                            var index = s.indexOf(placeholder);
                            if (index > -1) {
                              ++j;
                              var before = s.substring(0, index);
                              var middle = new Prism.Token(language, Prism.tokenize(t, env.grammar), 'language-' + language, t);
                              var after = s.substring(index + placeholder.length);
                              var replacement = [];
                              if (before) {
                                replacement.push.apply(replacement, walkTokens([before]));
                              }
                              replacement.push(middle);
                              if (after) {
                                replacement.push.apply(replacement, walkTokens([after]));
                              }
                              if (typeof token === 'string') {
                                tokens.splice.apply(tokens, [
                                  i,
                                  1
                                ].concat(replacement));
                              } else {
                                token.content = replacement;
                              }
                            }
                          } else if (token.content) {
                            walkTokens(token.content);
                          }
                        }
                        return tokens;
                      }
                      walkTokens(env.tokens);
                    }
                  }
                });
              }(Prism));
            },
            {}
          ],
          10: [
            function (require, module, exports) {
              Prism.languages.markup = {
                'comment': /<!--[\s\S]*?-->/,
                'prolog': /<\?[\s\S]+?\?>/,
                'doctype': {
                  pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:(?!<!--)[^"'\]]|"[^"]*"|'[^']*'|<!--[\s\S]*?-->)*\]\s*)?>/i,
                  greedy: true
                },
                'cdata': /<!\[CDATA\[[\s\S]*?]]>/i,
                'tag': {
                  pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/i,
                  greedy: true,
                  inside: {
                    'tag': {
                      pattern: /^<\/?[^\s>\/]+/i,
                      inside: {
                        'punctuation': /^<\/?/,
                        'namespace': /^[^\s>\/:]+:/
                      }
                    },
                    'attr-value': {
                      pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/i,
                      inside: {
                        'punctuation': [
                          /^=/,
                          {
                            pattern: /^(\s*)["']|["']$/,
                            lookbehind: true
                          }
                        ]
                      }
                    },
                    'punctuation': /\/?>/,
                    'attr-name': {
                      pattern: /[^\s>\/]+/,
                      inside: { 'namespace': /^[^\s>\/:]+:/ }
                    }
                  }
                },
                'entity': /&#?[\da-z]{1,8};/i
              };
              Prism.languages.markup['tag'].inside['attr-value'].inside['entity'] = Prism.languages.markup['entity'];
              Prism.hooks.add('wrap', function (env) {
                if (env.type === 'entity') {
                  env.attributes['title'] = env.content.replace(/&amp;/, '&');
                }
              });
              Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
                value: function addInlined(tagName, lang) {
                  var includedCdataInside = {};
                  includedCdataInside['language-' + lang] = {
                    pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
                    lookbehind: true,
                    inside: Prism.languages[lang]
                  };
                  includedCdataInside['cdata'] = /^<!\[CDATA\[|\]\]>$/i;
                  var inside = {
                    'included-cdata': {
                      pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
                      inside: includedCdataInside
                    }
                  };
                  inside['language-' + lang] = {
                    pattern: /[\s\S]+/,
                    inside: Prism.languages[lang]
                  };
                  var def = {};
                  def[tagName] = {
                    pattern: RegExp(/(<__[\s\S]*?>)(?:<!\[CDATA\[[\s\S]*?\]\]>\s*|[\s\S])*?(?=<\/__>)/.source.replace(/__/g, tagName), 'i'),
                    lookbehind: true,
                    greedy: true,
                    inside: inside
                  };
                  Prism.languages.insertBefore('markup', 'cdata', def);
                }
              });
              Prism.languages.xml = Prism.languages.extend('markup', {});
              Prism.languages.html = Prism.languages.markup;
              Prism.languages.mathml = Prism.languages.markup;
              Prism.languages.svg = Prism.languages.markup;
            },
            {}
          ],
          11: [
            function (require, module, exports) {
              (function (Prism) {
                Prism.languages.php = Prism.languages.extend('clike', {
                  'keyword': /\b(?:__halt_compiler|abstract|and|array|as|break|callable|case|catch|class|clone|const|continue|declare|default|die|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|eval|exit|extends|final|finally|for|foreach|function|global|goto|if|implements|include|include_once|instanceof|insteadof|interface|isset|list|namespace|new|or|parent|print|private|protected|public|require|require_once|return|static|switch|throw|trait|try|unset|use|var|while|xor|yield)\b/i,
                  'boolean': {
                    pattern: /\b(?:false|true)\b/i,
                    alias: 'constant'
                  },
                  'constant': [
                    /\b[A-Z_][A-Z0-9_]*\b/,
                    /\b(?:null)\b/i
                  ],
                  'comment': {
                    pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
                    lookbehind: true
                  }
                });
                Prism.languages.insertBefore('php', 'string', {
                  'shell-comment': {
                    pattern: /(^|[^\\])#.*/,
                    lookbehind: true,
                    alias: 'comment'
                  }
                });
                Prism.languages.insertBefore('php', 'comment', {
                  'delimiter': {
                    pattern: /\?>$|^<\?(?:php(?=\s)|=)?/i,
                    alias: 'important'
                  }
                });
                Prism.languages.insertBefore('php', 'keyword', {
                  'variable': /\$+(?:\w+\b|(?={))/i,
                  'package': {
                    pattern: /(\\|namespace\s+|use\s+)[\w\\]+/,
                    lookbehind: true,
                    inside: { punctuation: /\\/ }
                  }
                });
                Prism.languages.insertBefore('php', 'operator', {
                  'property': {
                    pattern: /(->)[\w]+/,
                    lookbehind: true
                  }
                });
                var string_interpolation = {
                  pattern: /{\$(?:{(?:{[^{}]+}|[^{}]+)}|[^{}])+}|(^|[^\\{])\$+(?:\w+(?:\[.+?]|->\w+)*)/,
                  lookbehind: true,
                  inside: Prism.languages.php
                };
                Prism.languages.insertBefore('php', 'string', {
                  'nowdoc-string': {
                    pattern: /<<<'([^']+)'(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?\1;/,
                    greedy: true,
                    alias: 'string',
                    inside: {
                      'delimiter': {
                        pattern: /^<<<'[^']+'|[a-z_]\w*;$/i,
                        alias: 'symbol',
                        inside: { 'punctuation': /^<<<'?|[';]$/ }
                      }
                    }
                  },
                  'heredoc-string': {
                    pattern: /<<<(?:"([^"]+)"(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?\1;|([a-z_]\w*)(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?\2;)/i,
                    greedy: true,
                    alias: 'string',
                    inside: {
                      'delimiter': {
                        pattern: /^<<<(?:"[^"]+"|[a-z_]\w*)|[a-z_]\w*;$/i,
                        alias: 'symbol',
                        inside: { 'punctuation': /^<<<"?|[";]$/ }
                      },
                      'interpolation': string_interpolation
                    }
                  },
                  'single-quoted-string': {
                    pattern: /'(?:\\[\s\S]|[^\\'])*'/,
                    greedy: true,
                    alias: 'string'
                  },
                  'double-quoted-string': {
                    pattern: /"(?:\\[\s\S]|[^\\"])*"/,
                    greedy: true,
                    alias: 'string',
                    inside: { 'interpolation': string_interpolation }
                  }
                });
                delete Prism.languages.php['string'];
                Prism.hooks.add('before-tokenize', function (env) {
                  if (!/<\?/.test(env.code)) {
                    return;
                  }
                  var phpPattern = /<\?(?:[^"'/#]|\/(?![*/])|("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|(?:\/\/|#)(?:[^?\n\r]|\?(?!>))*(?=$|\?>|[\r\n])|\/\*[\s\S]*?(?:\*\/|$))*?(?:\?>|$)/ig;
                  Prism.languages['markup-templating'].buildPlaceholders(env, 'php', phpPattern);
                });
                Prism.hooks.add('after-tokenize', function (env) {
                  Prism.languages['markup-templating'].tokenizePlaceholders(env, 'php');
                });
              }(Prism));
            },
            {}
          ],
          12: [
            function (require, module, exports) {
              Prism.languages.python = {
                'comment': {
                  pattern: /(^|[^\\])#.*/,
                  lookbehind: true
                },
                'string-interpolation': {
                  pattern: /(?:f|rf|fr)(?:("""|''')[\s\S]+?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,
                  greedy: true,
                  inside: {
                    'interpolation': {
                      pattern: /((?:^|[^{])(?:{{)*){(?!{)(?:[^{}]|{(?!{)(?:[^{}]|{(?!{)(?:[^{}])+})+})+}/,
                      lookbehind: true,
                      inside: {
                        'format-spec': {
                          pattern: /(:)[^:(){}]+(?=}$)/,
                          lookbehind: true
                        },
                        'conversion-option': {
                          pattern: /![sra](?=[:}]$)/,
                          alias: 'punctuation'
                        },
                        rest: null
                      }
                    },
                    'string': /[\s\S]+/
                  }
                },
                'triple-quoted-string': {
                  pattern: /(?:[rub]|rb|br)?("""|''')[\s\S]+?\1/i,
                  greedy: true,
                  alias: 'string'
                },
                'string': {
                  pattern: /(?:[rub]|rb|br)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,
                  greedy: true
                },
                'function': {
                  pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,
                  lookbehind: true
                },
                'class-name': {
                  pattern: /(\bclass\s+)\w+/i,
                  lookbehind: true
                },
                'decorator': {
                  pattern: /(^\s*)@\w+(?:\.\w+)*/im,
                  lookbehind: true,
                  alias: [
                    'annotation',
                    'punctuation'
                  ],
                  inside: { 'punctuation': /\./ }
                },
                'keyword': /\b(?:and|as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,
                'builtin': /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
                'boolean': /\b(?:True|False|None)\b/,
                'number': /(?:\b(?=\d)|\B(?=\.))(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*\.?\d*|\.\d+)(?:e[+-]?\d+)?j?\b/i,
                'operator': /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
                'punctuation': /[{}[\];(),.:]/
              };
              Prism.languages.python['string-interpolation'].inside['interpolation'].inside.rest = Prism.languages.python;
              Prism.languages.py = Prism.languages.python;
            },
            {}
          ],
          13: [
            function (require, module, exports) {
              (function (Prism) {
                Prism.languages.ruby = Prism.languages.extend('clike', {
                  'comment': [
                    /#.*/,
                    {
                      pattern: /^=begin\s[\s\S]*?^=end/m,
                      greedy: true
                    }
                  ],
                  'class-name': {
                    pattern: /(\b(?:class)\s+|\bcatch\s+\()[\w.\\]+/i,
                    lookbehind: true,
                    inside: { 'punctuation': /[.\\]/ }
                  },
                  'keyword': /\b(?:alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|extend|for|if|in|include|module|new|next|nil|not|or|prepend|protected|private|public|raise|redo|require|rescue|retry|return|self|super|then|throw|undef|unless|until|when|while|yield)\b/
                });
                var interpolation = {
                  pattern: /#\{[^}]+\}/,
                  inside: {
                    'delimiter': {
                      pattern: /^#\{|\}$/,
                      alias: 'tag'
                    },
                    rest: Prism.languages.ruby
                  }
                };
                delete Prism.languages.ruby.function;
                Prism.languages.insertBefore('ruby', 'keyword', {
                  'regex': [
                    {
                      pattern: /%r([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1[gim]{0,3}/,
                      greedy: true,
                      inside: { 'interpolation': interpolation }
                    },
                    {
                      pattern: /%r\((?:[^()\\]|\\[\s\S])*\)[gim]{0,3}/,
                      greedy: true,
                      inside: { 'interpolation': interpolation }
                    },
                    {
                      pattern: /%r\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}[gim]{0,3}/,
                      greedy: true,
                      inside: { 'interpolation': interpolation }
                    },
                    {
                      pattern: /%r\[(?:[^\[\]\\]|\\[\s\S])*\][gim]{0,3}/,
                      greedy: true,
                      inside: { 'interpolation': interpolation }
                    },
                    {
                      pattern: /%r<(?:[^<>\\]|\\[\s\S])*>[gim]{0,3}/,
                      greedy: true,
                      inside: { 'interpolation': interpolation }
                    },
                    {
                      pattern: /(^|[^/])\/(?!\/)(?:\[.+?]|\\.|[^/\\\r\n])+\/[gim]{0,3}(?=\s*(?:$|[\r\n,.;})]))/,
                      lookbehind: true,
                      greedy: true
                    }
                  ],
                  'variable': /[@$]+[a-zA-Z_]\w*(?:[?!]|\b)/,
                  'symbol': {
                    pattern: /(^|[^:]):[a-zA-Z_]\w*(?:[?!]|\b)/,
                    lookbehind: true
                  },
                  'method-definition': {
                    pattern: /(\bdef\s+)[\w.]+/,
                    lookbehind: true,
                    inside: {
                      'function': /\w+$/,
                      rest: Prism.languages.ruby
                    }
                  }
                });
                Prism.languages.insertBefore('ruby', 'number', {
                  'builtin': /\b(?:Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|Fixnum|Float|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/,
                  'constant': /\b[A-Z]\w*(?:[?!]|\b)/
                });
                Prism.languages.ruby.string = [
                  {
                    pattern: /%[qQiIwWxs]?([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1/,
                    greedy: true,
                    inside: { 'interpolation': interpolation }
                  },
                  {
                    pattern: /%[qQiIwWxs]?\((?:[^()\\]|\\[\s\S])*\)/,
                    greedy: true,
                    inside: { 'interpolation': interpolation }
                  },
                  {
                    pattern: /%[qQiIwWxs]?\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}/,
                    greedy: true,
                    inside: { 'interpolation': interpolation }
                  },
                  {
                    pattern: /%[qQiIwWxs]?\[(?:[^\[\]\\]|\\[\s\S])*\]/,
                    greedy: true,
                    inside: { 'interpolation': interpolation }
                  },
                  {
                    pattern: /%[qQiIwWxs]?<(?:[^<>\\]|\\[\s\S])*>/,
                    greedy: true,
                    inside: { 'interpolation': interpolation }
                  },
                  {
                    pattern: /("|')(?:#\{[^}]+\}|\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
                    greedy: true,
                    inside: { 'interpolation': interpolation }
                  }
                ];
                Prism.languages.rb = Prism.languages.ruby;
              }(Prism));
            },
            {}
          ],
          14: [
            function (require, module, exports) {
              var Prism = require('prismjs/components/prism-core');
              require('prismjs/components/prism-clike');
              require('prismjs/components/prism-markup-templating');
              require('prismjs/components/prism-c');
              require('prismjs/components/prism-cpp');
              require('prismjs/components/prism-csharp');
              require('prismjs/components/prism-css');
              require('prismjs/components/prism-java');
              require('prismjs/components/prism-javascript');
              require('prismjs/components/prism-markup');
              require('prismjs/components/prism-php');
              require('prismjs/components/prism-python');
              require('prismjs/components/prism-ruby');
              module.exports = { boltExport: Prism };
            },
            {
              'prismjs/components/prism-c': 1,
              'prismjs/components/prism-clike': 2,
              'prismjs/components/prism-core': 3,
              'prismjs/components/prism-cpp': 4,
              'prismjs/components/prism-csharp': 5,
              'prismjs/components/prism-css': 6,
              'prismjs/components/prism-java': 7,
              'prismjs/components/prism-javascript': 8,
              'prismjs/components/prism-markup': 10,
              'prismjs/components/prism-markup-templating': 9,
              'prismjs/components/prism-php': 11,
              'prismjs/components/prism-python': 12,
              'prismjs/components/prism-ruby': 13
            }
          ]
        }, {}, [14])(14);
      }));
      var prism = window.Prism;
      window.Prism = oldprism;
      return prism;
    }(undefined, exports$1, module, undefined));
    var Prism$1 = module.exports.boltExport;

    var getLanguages = function (editor) {
      return editor.getParam('codesample_languages');
    };
    var useGlobalPrismJS = function (editor) {
      return editor.getParam('codesample_global_prismjs', false, 'boolean');
    };
    var Settings = {
      getLanguages: getLanguages,
      useGlobalPrismJS: useGlobalPrismJS
    };

    var get = function (editor) {
      return Global.Prism && Settings.useGlobalPrismJS(editor) ? Global.Prism : Prism$1;
    };
    var Prism$2 = { get: get };

    var getSelectedCodeSample = function (editor) {
      var node = editor.selection ? editor.selection.getNode() : null;
      if (Utils.isCodeSample(node)) {
        return Option.some(node);
      }
      return Option.none();
    };
    var insertCodeSample = function (editor, language, code) {
      editor.undoManager.transact(function () {
        var node = getSelectedCodeSample(editor);
        code = global$1.DOM.encode(code);
        return node.fold(function () {
          editor.insertContent('<pre id="__new" class="language-' + language + '">' + code + '</pre>');
          editor.selection.select(editor.$('#__new').removeAttr('id')[0]);
        }, function (n) {
          editor.dom.setAttrib(n, 'class', 'language-' + language);
          n.innerHTML = code;
          Prism$2.get(editor).highlightElement(n);
          editor.selection.select(n);
        });
      });
    };
    var getCurrentCode = function (editor) {
      var node = getSelectedCodeSample(editor);
      return node.fold(function () {
        return '';
      }, function (n) {
        return n.textContent;
      });
    };
    var CodeSample = {
      getSelectedCodeSample: getSelectedCodeSample,
      insertCodeSample: insertCodeSample,
      getCurrentCode: getCurrentCode
    };

    var getLanguages$1 = function (editor) {
      var defaultLanguages = [
        {
          text: 'HTML/XML',
          value: 'markup'
        },
        {
          text: 'JavaScript',
          value: 'javascript'
        },
        {
          text: 'CSS',
          value: 'css'
        },
        {
          text: 'PHP',
          value: 'php'
        },
        {
          text: 'Ruby',
          value: 'ruby'
        },
        {
          text: 'Python',
          value: 'python'
        },
        {
          text: 'Java',
          value: 'java'
        },
        {
          text: 'C',
          value: 'c'
        },
        {
          text: 'C#',
          value: 'csharp'
        },
        {
          text: 'C++',
          value: 'cpp'
        }
      ];
      var customLanguages = Settings.getLanguages(editor);
      return customLanguages ? customLanguages : defaultLanguages;
    };
    var getCurrentLanguage = function (editor, fallback) {
      var node = CodeSample.getSelectedCodeSample(editor);
      return node.fold(function () {
        return fallback;
      }, function (n) {
        var matches = n.className.match(/language-(\w+)/);
        return matches ? matches[1] : fallback;
      });
    };
    var Languages = {
      getLanguages: getLanguages$1,
      getCurrentLanguage: getCurrentLanguage
    };

    var typeOf = function (x) {
      if (x === null) {
        return 'null';
      }
      var t = typeof x;
      if (t === 'object' && (Array.prototype.isPrototypeOf(x) || x.constructor && x.constructor.name === 'Array')) {
        return 'array';
      }
      if (t === 'object' && (String.prototype.isPrototypeOf(x) || x.constructor && x.constructor.name === 'String')) {
        return 'string';
      }
      return t;
    };
    var isType = function (type) {
      return function (value) {
        return typeOf(value) === type;
      };
    };
    var isFunction = isType('function');

    var nativeSlice = Array.prototype.slice;
    var head = function (xs) {
      return xs.length === 0 ? Option.none() : Option.some(xs[0]);
    };
    var from$1 = isFunction(Array.from) ? Array.from : function (x) {
      return nativeSlice.call(x);
    };

    var open = function (editor) {
      var languages = Languages.getLanguages(editor);
      var defaultLanguage = head(languages).fold(function () {
        return '';
      }, function (l) {
        return l.value;
      });
      var currentLanguage = Languages.getCurrentLanguage(editor, defaultLanguage);
      var currentCode = CodeSample.getCurrentCode(editor);
      editor.windowManager.open({
        title: 'Insert/Edit Code Sample',
        size: 'large',
        body: {
          type: 'panel',
          items: [
            {
              type: 'selectbox',
              name: 'language',
              label: 'Language',
              items: languages
            },
            {
              type: 'textarea',
              name: 'code',
              label: 'Code view'
            }
          ]
        },
        buttons: [
          {
            type: 'cancel',
            name: 'cancel',
            text: 'Cancel'
          },
          {
            type: 'submit',
            name: 'save',
            text: 'Save',
            primary: true
          }
        ],
        initialData: {
          language: currentLanguage,
          code: currentCode
        },
        onSubmit: function (api) {
          var data = api.getData();
          CodeSample.insertCodeSample(editor, data.language, data.code);
          api.close();
        }
      });
    };
    var Dialog = { open: open };

    var register = function (editor) {
      editor.addCommand('codesample', function () {
        var node = editor.selection.getNode();
        if (editor.selection.isCollapsed() || Utils.isCodeSample(node)) {
          Dialog.open(editor);
        } else {
          editor.formatter.toggle('code');
        }
      });
    };
    var Commands = { register: register };

    var setup = function (editor) {
      var $ = editor.$;
      editor.on('PreProcess', function (e) {
        $('pre[contenteditable=false]', e.node).filter(Utils.trimArg(Utils.isCodeSample)).each(function (idx, elm) {
          var $elm = $(elm), code = elm.textContent;
          $elm.attr('class', $.trim($elm.attr('class')));
          $elm.removeAttr('contentEditable');
          $elm.empty().append($('<code></code>').each(function () {
            this.textContent = code;
          }));
        });
      });
      editor.on('SetContent', function () {
        var unprocessedCodeSamples = $('pre').filter(Utils.trimArg(Utils.isCodeSample)).filter(function (idx, elm) {
          return elm.contentEditable !== 'false';
        });
        if (unprocessedCodeSamples.length) {
          editor.undoManager.transact(function () {
            unprocessedCodeSamples.each(function (idx, elm) {
              $(elm).find('br').each(function (idx, elm) {
                elm.parentNode.replaceChild(editor.getDoc().createTextNode('\n'), elm);
              });
              elm.contentEditable = 'false';
              elm.innerHTML = editor.dom.encode(elm.textContent);
              Prism$2.get(editor).highlightElement(elm);
              elm.className = $.trim(elm.className);
            });
          });
        }
      });
    };
    var FilterContent = { setup: setup };

    var isCodeSampleSelection = function (editor) {
      var node = editor.selection.getStart();
      return editor.dom.is(node, 'pre[class*="language-"]');
    };
    var register$1 = function (editor) {
      editor.ui.registry.addToggleButton('codesample', {
        icon: 'code-sample',
        tooltip: 'Insert/edit code sample',
        onAction: function () {
          return Dialog.open(editor);
        },
        onSetup: function (api) {
          var nodeChangeHandler = function () {
            api.setActive(isCodeSampleSelection(editor));
          };
          editor.on('NodeChange', nodeChangeHandler);
          return function () {
            return editor.off('NodeChange', nodeChangeHandler);
          };
        }
      });
      editor.ui.registry.addMenuItem('codesample', {
        text: 'Code sample...',
        icon: 'code-sample',
        onAction: function () {
          return Dialog.open(editor);
        }
      });
    };
    var Buttons = { register: register$1 };

    function Plugin () {
      global.add('codesample', function (editor) {
        FilterContent.setup(editor);
        Buttons.register(editor);
        Commands.register(editor);
        editor.on('dblclick', function (ev) {
          if (Utils.isCodeSample(ev.target)) {
            Dialog.open(editor);
          }
        });
      });
    }

    Plugin();

}(window));
