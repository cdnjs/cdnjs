/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 *
 * Version: 5.0.6 (2019-05-22)
 */
(function () {
var media = (function () {
    'use strict';

    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

    var typeOf = function (x) {
      if (x === null)
        return 'null';
      var t = typeof x;
      if (t === 'object' && Array.prototype.isPrototypeOf(x))
        return 'array';
      if (t === 'object' && String.prototype.isPrototypeOf(x))
        return 'string';
      return t;
    };
    var isType = function (type) {
      return function (value) {
        return typeOf(value) === type;
      };
    };
    var isString = isType('string');
    var isFunction = isType('function');

    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var shallow = function (old, nu) {
      return nu;
    };
    var baseMerge = function (merger) {
      return function () {
        var objects = new Array(arguments.length);
        for (var i = 0; i < objects.length; i++)
          objects[i] = arguments[i];
        if (objects.length === 0)
          throw new Error('Can\'t merge zero objects');
        var ret = {};
        for (var j = 0; j < objects.length; j++) {
          var curObject = objects[j];
          for (var key in curObject)
            if (hasOwnProperty.call(curObject, key)) {
              ret[key] = merger(ret[key], curObject[key]);
            }
        }
        return ret;
      };
    };
    var merge = baseMerge(shallow);

    var constant = function (value) {
      return function () {
        return value;
      };
    };
    var never = constant(false);
    var always = constant(true);

    var never$1 = never;
    var always$1 = always;
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
      var noop = function () {
      };
      var nul = function () {
        return null;
      };
      var undef = function () {
        return undefined;
      };
      var me = {
        fold: function (n, s) {
          return n();
        },
        is: never$1,
        isSome: never$1,
        isNone: always$1,
        getOr: id,
        getOrThunk: call,
        getOrDie: function (msg) {
          throw new Error(msg || 'error: getOrDie called on none.');
        },
        getOrNull: nul,
        getOrUndefined: undef,
        or: id,
        orThunk: call,
        map: none,
        ap: none,
        each: noop,
        bind: none,
        flatten: none,
        exists: never$1,
        forall: always$1,
        filter: none,
        equals: eq,
        equals_: eq,
        toArray: function () {
          return [];
        },
        toString: constant('none()')
      };
      if (Object.freeze)
        Object.freeze(me);
      return me;
    }();
    var some = function (a) {
      var constant_a = function () {
        return a;
      };
      var self = function () {
        return me;
      };
      var map = function (f) {
        return some(f(a));
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
        isSome: always$1,
        isNone: never$1,
        getOr: constant_a,
        getOrThunk: constant_a,
        getOrDie: constant_a,
        getOrNull: constant_a,
        getOrUndefined: constant_a,
        or: self,
        orThunk: self,
        map: map,
        ap: function (optfab) {
          return optfab.fold(none, function (fab) {
            return some(fab(a));
          });
        },
        each: function (f) {
          f(a);
        },
        bind: bind,
        flatten: constant_a,
        exists: bind,
        forall: bind,
        filter: function (f) {
          return f(a) ? me : NONE;
        },
        equals: function (o) {
          return o.is(a);
        },
        equals_: function (o, elementEq) {
          return o.fold(never$1, function (b) {
            return elementEq(a, b);
          });
        },
        toArray: function () {
          return [a];
        },
        toString: function () {
          return 'some(' + a + ')';
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

    var hasOwnProperty$1 = Object.hasOwnProperty;
    var get = function (obj, key) {
      return has(obj, key) ? Option.from(obj[key]) : Option.none();
    };
    var has = function (obj, key) {
      return hasOwnProperty$1.call(obj, key);
    };

    var each = function (xs, f) {
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        f(x, i, xs);
      }
    };
    var push = Array.prototype.push;
    var flatten = function (xs) {
      var r = [];
      for (var i = 0, len = xs.length; i < len; ++i) {
        if (!Array.prototype.isPrototypeOf(xs[i]))
          throw new Error('Arr.flatten item ' + i + ' was not an array, input: ' + xs);
        push.apply(r, xs[i]);
      }
      return r;
    };
    var slice = Array.prototype.slice;
    var from$1 = isFunction(Array.from) ? Array.from : function (x) {
      return slice.call(x);
    };

    var global$1 = tinymce.util.Tools.resolve('tinymce.util.Tools');

    var getScripts = function (editor) {
      return editor.getParam('media_scripts');
    };
    var getAudioTemplateCallback = function (editor) {
      return editor.getParam('audio_template_callback');
    };
    var getVideoTemplateCallback = function (editor) {
      return editor.getParam('video_template_callback');
    };
    var hasLiveEmbeds = function (editor) {
      return editor.getParam('media_live_embeds', true);
    };
    var shouldFilterHtml = function (editor) {
      return editor.getParam('media_filter_html', true);
    };
    var getUrlResolver = function (editor) {
      return editor.getParam('media_url_resolver');
    };
    var hasAltSource = function (editor) {
      return editor.getParam('media_alt_source', true);
    };
    var hasPoster = function (editor) {
      return editor.getParam('media_poster', true);
    };
    var hasDimensions = function (editor) {
      return editor.getParam('media_dimensions', true);
    };
    var Settings = {
      getScripts: getScripts,
      getAudioTemplateCallback: getAudioTemplateCallback,
      getVideoTemplateCallback: getVideoTemplateCallback,
      hasLiveEmbeds: hasLiveEmbeds,
      shouldFilterHtml: shouldFilterHtml,
      getUrlResolver: getUrlResolver,
      hasAltSource: hasAltSource,
      hasPoster: hasPoster,
      hasDimensions: hasDimensions
    };

    var global$2 = tinymce.util.Tools.resolve('tinymce.html.SaxParser');

    var global$3 = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');

    var getVideoScriptMatch = function (prefixes, src) {
      if (prefixes) {
        for (var i = 0; i < prefixes.length; i++) {
          if (src.indexOf(prefixes[i].filter) !== -1) {
            return prefixes[i];
          }
        }
      }
    };
    var VideoScript = { getVideoScriptMatch: getVideoScriptMatch };

    var trimPx = function (value) {
      return value.replace(/px$/, '');
    };
    var addPx = function (value) {
      return /^[0-9.]+$/.test(value) ? value + 'px' : value;
    };
    var getSize = function (name) {
      return function (elm) {
        return elm ? trimPx(elm.style[name]) : '';
      };
    };
    var setSize = function (name) {
      return function (elm, value) {
        if (elm) {
          elm.style[name] = addPx(value);
        }
      };
    };
    var Size = {
      getMaxWidth: getSize('maxWidth'),
      getMaxHeight: getSize('maxHeight'),
      setMaxWidth: setSize('maxWidth'),
      setMaxHeight: setSize('maxHeight')
    };

    var DOM = global$3.DOM;
    var getEphoxEmbedIri = function (elm) {
      return DOM.getAttrib(elm, 'data-ephox-embed-iri');
    };
    var isEphoxEmbed = function (html) {
      var fragment = DOM.createFragment(html);
      return getEphoxEmbedIri(fragment.firstChild) !== '';
    };
    var htmlToDataSax = function (prefixes, html) {
      var data = {};
      global$2({
        validate: false,
        allow_conditional_comments: true,
        start: function (name, attrs) {
          if (!data.source1 && name === 'param') {
            data.source1 = attrs.map.movie;
          }
          if (name === 'iframe' || name === 'object' || name === 'embed' || name === 'video' || name === 'audio') {
            if (!data.type) {
              data.type = name;
            }
            data = global$1.extend(attrs.map, data);
          }
          if (name === 'script') {
            var videoScript = VideoScript.getVideoScriptMatch(prefixes, attrs.map.src);
            if (!videoScript) {
              return;
            }
            data = {
              type: 'script',
              source1: attrs.map.src,
              width: videoScript.width,
              height: videoScript.height
            };
          }
          if (name === 'source') {
            if (!data.source1) {
              data.source1 = attrs.map.src;
            } else if (!data.source2) {
              data.source2 = attrs.map.src;
            }
          }
          if (name === 'img' && !data.poster) {
            data.poster = attrs.map.src;
          }
        }
      }).parse(html);
      data.source1 = data.source1 || data.src || data.data;
      data.source2 = data.source2 || '';
      data.poster = data.poster || '';
      return data;
    };
    var ephoxEmbedHtmlToData = function (html) {
      var fragment = DOM.createFragment(html);
      var div = fragment.firstChild;
      return {
        type: 'ephox-embed-iri',
        source1: getEphoxEmbedIri(div),
        source2: '',
        poster: '',
        width: Size.getMaxWidth(div),
        height: Size.getMaxHeight(div)
      };
    };
    var htmlToData = function (prefixes, html) {
      return isEphoxEmbed(html) ? ephoxEmbedHtmlToData(html) : htmlToDataSax(prefixes, html);
    };
    var HtmlToData = { htmlToData: htmlToData };

    var global$4 = tinymce.util.Tools.resolve('tinymce.util.Promise');

    var guess = function (url) {
      var mimes = {
        mp3: 'audio/mpeg',
        wav: 'audio/wav',
        mp4: 'video/mp4',
        webm: 'video/webm',
        ogg: 'video/ogg',
        swf: 'application/x-shockwave-flash'
      };
      var fileEnd = url.toLowerCase().split('.').pop();
      var mime = mimes[fileEnd];
      return mime ? mime : '';
    };
    var Mime = { guess: guess };

    var global$5 = tinymce.util.Tools.resolve('tinymce.html.Writer');

    var global$6 = tinymce.util.Tools.resolve('tinymce.html.Schema');

    var DOM$1 = global$3.DOM;
    var setAttributes = function (attrs, updatedAttrs) {
      var name;
      var i;
      var value;
      var attr;
      for (name in updatedAttrs) {
        value = '' + updatedAttrs[name];
        if (attrs.map[name]) {
          i = attrs.length;
          while (i--) {
            attr = attrs[i];
            if (attr.name === name) {
              if (value) {
                attrs.map[name] = value;
                attr.value = value;
              } else {
                delete attrs.map[name];
                attrs.splice(i, 1);
              }
            }
          }
        } else if (value) {
          attrs.push({
            name: name,
            value: value
          });
          attrs.map[name] = value;
        }
      }
    };
    var normalizeHtml = function (html) {
      var writer = global$5();
      var parser = global$2(writer);
      parser.parse(html);
      return writer.getContent();
    };
    var updateHtmlSax = function (html, data, updateAll) {
      var writer = global$5();
      var sourceCount = 0;
      var hasImage;
      global$2({
        validate: false,
        allow_conditional_comments: true,
        comment: function (text) {
          writer.comment(text);
        },
        cdata: function (text) {
          writer.cdata(text);
        },
        text: function (text, raw) {
          writer.text(text, raw);
        },
        start: function (name, attrs, empty) {
          switch (name) {
          case 'video':
          case 'object':
          case 'embed':
          case 'img':
          case 'iframe':
            if (data.height !== undefined && data.width !== undefined) {
              setAttributes(attrs, {
                width: data.width,
                height: data.height
              });
            }
            break;
          }
          if (updateAll) {
            switch (name) {
            case 'video':
              setAttributes(attrs, {
                poster: data.poster,
                src: ''
              });
              if (data.source2) {
                setAttributes(attrs, { src: '' });
              }
              break;
            case 'iframe':
              setAttributes(attrs, { src: data.source1 });
              break;
            case 'source':
              sourceCount++;
              if (sourceCount <= 2) {
                setAttributes(attrs, {
                  src: data['source' + sourceCount],
                  type: data['source' + sourceCount + 'mime']
                });
                if (!data['source' + sourceCount]) {
                  return;
                }
              }
              break;
            case 'img':
              if (!data.poster) {
                return;
              }
              hasImage = true;
              break;
            }
          }
          writer.start(name, attrs, empty);
        },
        end: function (name) {
          if (name === 'video' && updateAll) {
            for (var index = 1; index <= 2; index++) {
              if (data['source' + index]) {
                var attrs = [];
                attrs.map = {};
                if (sourceCount < index) {
                  setAttributes(attrs, {
                    src: data['source' + index],
                    type: data['source' + index + 'mime']
                  });
                  writer.start('source', attrs, true);
                }
              }
            }
          }
          if (data.poster && name === 'object' && updateAll && !hasImage) {
            var imgAttrs = [];
            imgAttrs.map = {};
            setAttributes(imgAttrs, {
              src: data.poster,
              width: data.width,
              height: data.height
            });
            writer.start('img', imgAttrs, true);
          }
          writer.end(name);
        }
      }, global$6({})).parse(html);
      return writer.getContent();
    };
    var isEphoxEmbed$1 = function (html) {
      var fragment = DOM$1.createFragment(html);
      return DOM$1.getAttrib(fragment.firstChild, 'data-ephox-embed-iri') !== '';
    };
    var updateEphoxEmbed = function (html, data) {
      var fragment = DOM$1.createFragment(html);
      var div = fragment.firstChild;
      Size.setMaxWidth(div, data.width);
      Size.setMaxHeight(div, data.height);
      return normalizeHtml(div.outerHTML);
    };
    var updateHtml = function (html, data, updateAll) {
      return isEphoxEmbed$1(html) ? updateEphoxEmbed(html, data) : updateHtmlSax(html, data, updateAll);
    };
    var UpdateHtml = { updateHtml: updateHtml };

    var urlPatterns = [
      {
        regex: /youtu\.be\/([\w\-_\?&=.]+)/i,
        type: 'iframe',
        w: 560,
        h: 314,
        url: '//www.youtube.com/embed/$1',
        allowFullscreen: true
      },
      {
        regex: /youtube\.com(.+)v=([^&]+)(&([a-z0-9&=\-_]+))?/i,
        type: 'iframe',
        w: 560,
        h: 314,
        url: '//www.youtube.com/embed/$2?$4',
        allowFullscreen: true
      },
      {
        regex: /youtube.com\/embed\/([a-z0-9\?&=\-_]+)/i,
        type: 'iframe',
        w: 560,
        h: 314,
        url: '//www.youtube.com/embed/$1',
        allowFullscreen: true
      },
      {
        regex: /vimeo\.com\/([0-9]+)/,
        type: 'iframe',
        w: 425,
        h: 350,
        url: '//player.vimeo.com/video/$1?title=0&byline=0&portrait=0&color=8dc7dc',
        allowFullscreen: true
      },
      {
        regex: /vimeo\.com\/(.*)\/([0-9]+)/,
        type: 'iframe',
        w: 425,
        h: 350,
        url: '//player.vimeo.com/video/$2?title=0&amp;byline=0',
        allowFullscreen: true
      },
      {
        regex: /maps\.google\.([a-z]{2,3})\/maps\/(.+)msid=(.+)/,
        type: 'iframe',
        w: 425,
        h: 350,
        url: '//maps.google.com/maps/ms?msid=$2&output=embed"',
        allowFullscreen: false
      },
      {
        regex: /dailymotion\.com\/video\/([^_]+)/,
        type: 'iframe',
        w: 480,
        h: 270,
        url: '//www.dailymotion.com/embed/video/$1',
        allowFullscreen: true
      },
      {
        regex: /dai\.ly\/([^_]+)/,
        type: 'iframe',
        w: 480,
        h: 270,
        url: '//www.dailymotion.com/embed/video/$1',
        allowFullscreen: true
      }
    ];
    var getUrl = function (pattern, url) {
      var match = pattern.regex.exec(url);
      var newUrl = pattern.url;
      var _loop_1 = function (i) {
        newUrl = newUrl.replace('$' + i, function () {
          return match[i] ? match[i] : '';
        });
      };
      for (var i = 0; i < match.length; i++) {
        _loop_1(i);
      }
      return newUrl.replace(/\?$/, '');
    };
    var matchPattern = function (url) {
      var pattern = urlPatterns.filter(function (pattern) {
        return pattern.regex.test(url);
      });
      if (pattern.length > 0) {
        return global$1.extend({}, pattern[0], { url: getUrl(pattern[0], url) });
      } else {
        return null;
      }
    };

    var getIframeHtml = function (data) {
      var allowFullscreen = data.allowFullscreen ? ' allowFullscreen="1"' : '';
      return '<iframe src="' + data.source1 + '" width="' + data.width + '" height="' + data.height + '"' + allowFullscreen + '></iframe>';
    };
    var getFlashHtml = function (data) {
      var html = '<object data="' + data.source1 + '" width="' + data.width + '" height="' + data.height + '" type="application/x-shockwave-flash">';
      if (data.poster) {
        html += '<img src="' + data.poster + '" width="' + data.width + '" height="' + data.height + '" />';
      }
      html += '</object>';
      return html;
    };
    var getAudioHtml = function (data, audioTemplateCallback) {
      if (audioTemplateCallback) {
        return audioTemplateCallback(data);
      } else {
        return '<audio controls="controls" src="' + data.source1 + '">' + (data.source2 ? '\n<source src="' + data.source2 + '"' + (data.source2mime ? ' type="' + data.source2mime + '"' : '') + ' />\n' : '') + '</audio>';
      }
    };
    var getVideoHtml = function (data, videoTemplateCallback) {
      if (videoTemplateCallback) {
        return videoTemplateCallback(data);
      } else {
        return '<video width="' + data.width + '" height="' + data.height + '"' + (data.poster ? ' poster="' + data.poster + '"' : '') + ' controls="controls">\n' + '<source src="' + data.source1 + '"' + (data.source1mime ? ' type="' + data.source1mime + '"' : '') + ' />\n' + (data.source2 ? '<source src="' + data.source2 + '"' + (data.source2mime ? ' type="' + data.source2mime + '"' : '') + ' />\n' : '') + '</video>';
      }
    };
    var getScriptHtml = function (data) {
      return '<script src="' + data.source1 + '"></script>';
    };
    var dataToHtml = function (editor, dataIn) {
      var data = global$1.extend({}, dataIn);
      if (!data.source1) {
        global$1.extend(data, HtmlToData.htmlToData(Settings.getScripts(editor), data.embed));
        if (!data.source1) {
          return '';
        }
      }
      if (!data.source2) {
        data.source2 = '';
      }
      if (!data.poster) {
        data.poster = '';
      }
      data.source1 = editor.convertURL(data.source1, 'source');
      data.source2 = editor.convertURL(data.source2, 'source');
      data.source1mime = Mime.guess(data.source1);
      data.source2mime = Mime.guess(data.source2);
      data.poster = editor.convertURL(data.poster, 'poster');
      var pattern = matchPattern(data.source1);
      if (pattern) {
        data.source1 = pattern.url;
        data.type = pattern.type;
        data.allowFullscreen = pattern.allowFullscreen;
        data.width = data.width || pattern.w;
        data.height = data.height || pattern.h;
      }
      if (data.embed) {
        return UpdateHtml.updateHtml(data.embed, data, true);
      } else {
        var videoScript = VideoScript.getVideoScriptMatch(Settings.getScripts(editor), data.source1);
        if (videoScript) {
          data.type = 'script';
          data.width = videoScript.width;
          data.height = videoScript.height;
        }
        var audioTemplateCallback = Settings.getAudioTemplateCallback(editor);
        var videoTemplateCallback = Settings.getVideoTemplateCallback(editor);
        data.width = data.width || 300;
        data.height = data.height || 150;
        global$1.each(data, function (value, key) {
          data[key] = editor.dom.encode('' + value);
        });
        if (data.type === 'iframe') {
          return getIframeHtml(data);
        } else if (data.source1mime === 'application/x-shockwave-flash') {
          return getFlashHtml(data);
        } else if (data.source1mime.indexOf('audio') !== -1) {
          return getAudioHtml(data, audioTemplateCallback);
        } else if (data.type === 'script') {
          return getScriptHtml(data);
        } else {
          return getVideoHtml(data, videoTemplateCallback);
        }
      }
    };
    var DataToHtml = { dataToHtml: dataToHtml };

    var cache = {};
    var embedPromise = function (data, dataToHtml, handler) {
      return new global$4(function (res, rej) {
        var wrappedResolve = function (response) {
          if (response.html) {
            cache[data.source1] = response;
          }
          return res({
            url: data.source1,
            html: response.html ? response.html : dataToHtml(data)
          });
        };
        if (cache[data.source1]) {
          wrappedResolve(cache[data.source1]);
        } else {
          handler({ url: data.source1 }, wrappedResolve, rej);
        }
      });
    };
    var defaultPromise = function (data, dataToHtml) {
      return new global$4(function (res) {
        res({
          html: dataToHtml(data),
          url: data.source1
        });
      });
    };
    var loadedData = function (editor) {
      return function (data) {
        return DataToHtml.dataToHtml(editor, data);
      };
    };
    var getEmbedHtml = function (editor, data) {
      var embedHandler = Settings.getUrlResolver(editor);
      return embedHandler ? embedPromise(data, loadedData(editor), embedHandler) : defaultPromise(data, loadedData(editor));
    };
    var isCached = function (url) {
      return cache.hasOwnProperty(url);
    };
    var Service = {
      getEmbedHtml: getEmbedHtml,
      isCached: isCached
    };

    var unwrap = function (data) {
      return merge(data, {
        source1: data.source1.value,
        source2: get(data, 'source2').bind(function (source2) {
          return get(source2, 'value');
        }).getOr(''),
        poster: get(data, 'poster').bind(function (poster) {
          return get(poster, 'value');
        }).getOr('')
      });
    };
    var wrap = function (data) {
      return merge(data, {
        source1: { value: get(data, 'source1').getOr('') },
        source2: { value: get(data, 'source2').getOr('') },
        poster: { value: get(data, 'poster').getOr('') }
      });
    };
    var handleError = function (editor) {
      return function (error) {
        var errorMessage = error && error.msg ? 'Media embed handler error: ' + error.msg : 'Media embed handler threw unknown error.';
        editor.notificationManager.open({
          type: 'error',
          text: errorMessage
        });
      };
    };
    var snippetToData = function (editor, embedSnippet) {
      return global$1.extend({}, HtmlToData.htmlToData(Settings.getScripts(editor), embedSnippet));
    };
    var getEditorData = function (editor) {
      var element = editor.selection.getNode();
      var dataEmbed = element.getAttribute('data-ephox-embed-iri');
      if (dataEmbed) {
        return {
          source1: dataEmbed,
          width: Size.getMaxWidth(element),
          height: Size.getMaxHeight(element)
        };
      }
      return element.getAttribute('data-mce-object') ? HtmlToData.htmlToData(Settings.getScripts(editor), editor.serializer.serialize(element, { selection: true })) : {};
    };
    var getSource = function (editor) {
      var elm = editor.selection.getNode();
      return elm.getAttribute('data-mce-object') || elm.getAttribute('data-ephox-embed-iri') ? editor.selection.getContent() : '';
    };
    var addEmbedHtml = function (win, editor) {
      return function (response) {
        if (isString(response.url) && response.url.trim().length > 0) {
          var html = response.html;
          var snippetData_1 = snippetToData(editor, html);
          var nuData_1 = {
            source1: response.url,
            embed: html
          };
          each([
            'width',
            'height'
          ], function (prop) {
            get(snippetData_1, prop).each(function (value) {
              var dimensions = nuData_1.dimensions || {};
              dimensions[prop] = value;
              nuData_1.dimensions = dimensions;
            });
          });
          win.setData(wrap(nuData_1));
        }
      };
    };
    var selectPlaceholder = function (editor, beforeObjects) {
      var i;
      var y;
      var afterObjects = editor.dom.select('img[data-mce-object]');
      for (i = 0; i < beforeObjects.length; i++) {
        for (y = afterObjects.length - 1; y >= 0; y--) {
          if (beforeObjects[i] === afterObjects[y]) {
            afterObjects.splice(y, 1);
          }
        }
      }
      editor.selection.select(afterObjects[0]);
    };
    var handleInsert = function (editor, html) {
      var beforeObjects = editor.dom.select('img[data-mce-object]');
      editor.insertContent(html);
      selectPlaceholder(editor, beforeObjects);
      editor.nodeChanged();
    };
    var submitForm = function (data, editor) {
      data.embed = UpdateHtml.updateHtml(data.embed, data);
      if (data.embed && Service.isCached(data.source1)) {
        handleInsert(editor, data.embed);
      } else {
        Service.getEmbedHtml(editor, data).then(function (response) {
          handleInsert(editor, response.html);
        }).catch(handleError(editor));
      }
    };
    var showDialog = function (editor) {
      var editorData = getEditorData(editor);
      var defaultData = {
        source1: '',
        source2: '',
        embed: getSource(editor),
        poster: '',
        dimensions: {
          height: editorData.height ? editorData.height : '',
          width: editorData.width ? editorData.width : ''
        }
      };
      var initialData = wrap(merge(defaultData, editorData));
      var getSourceData = function (api) {
        var data = unwrap(api.getData());
        return Settings.hasDimensions(editor) ? merge(data, {
          width: data.dimensions.width,
          height: data.dimensions.height
        }) : data;
      };
      var handleSource1 = function (api) {
        var serviceData = getSourceData(api);
        Service.getEmbedHtml(editor, serviceData).then(addEmbedHtml(win, editor)).catch(handleError(editor));
      };
      var handleEmbed = function (api) {
        var data = unwrap(api.getData());
        var dataFromEmbed = snippetToData(editor, data.embed);
        dataFromEmbed.dimensions = {
          width: dataFromEmbed.width ? dataFromEmbed.width : data.dimensions.width,
          height: dataFromEmbed.height ? dataFromEmbed.height : data.dimensions.height
        };
        api.setData(wrap(dataFromEmbed));
      };
      var mediaInput = [{
          name: 'source1',
          type: 'urlinput',
          filetype: 'media',
          label: 'Source'
        }];
      var sizeInput = !Settings.hasDimensions(editor) ? [] : [{
          type: 'sizeinput',
          name: 'dimensions',
          label: 'Constrain proportions',
          constrain: true
        }];
      var generalTab = {
        title: 'General',
        items: flatten([
          mediaInput,
          sizeInput
        ])
      };
      var embedTextarea = {
        type: 'textarea',
        name: 'embed',
        label: 'Paste your embed code below:'
      };
      var embedTab = {
        title: 'Embed',
        items: [embedTextarea]
      };
      var advancedFormItems = [];
      if (Settings.hasAltSource(editor)) {
        advancedFormItems.push({
          name: 'source2',
          type: 'urlinput',
          filetype: 'media',
          label: 'Alternative source URL'
        });
      }
      if (Settings.hasPoster(editor)) {
        advancedFormItems.push({
          name: 'poster',
          type: 'urlinput',
          filetype: 'image',
          label: 'Media poster (Image URL)'
        });
      }
      var advancedTab = {
        title: 'Advanced',
        items: advancedFormItems
      };
      var tabs = [
        generalTab,
        embedTab
      ];
      if (advancedFormItems.length > 0) {
        tabs.push(advancedTab);
      }
      var body = {
        type: 'tabpanel',
        tabs: tabs
      };
      var win = editor.windowManager.open({
        title: 'Insert/Edit Media',
        size: 'normal',
        body: body,
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
        onSubmit: function (api) {
          var serviceData = getSourceData(api);
          submitForm(serviceData, editor);
          api.close();
        },
        onChange: function (api, detail) {
          switch (detail.name) {
          case 'source1':
            handleSource1(api);
            break;
          case 'embed':
            handleEmbed(api);
            break;
          default:
            break;
          }
        },
        initialData: initialData
      });
    };
    var Dialog = { showDialog: showDialog };

    var get$1 = function (editor) {
      var showDialog = function () {
        Dialog.showDialog(editor);
      };
      return { showDialog: showDialog };
    };
    var Api = { get: get$1 };

    var register = function (editor) {
      var showDialog = function () {
        Dialog.showDialog(editor);
      };
      editor.addCommand('mceMedia', showDialog);
    };
    var Commands = { register: register };

    var global$7 = tinymce.util.Tools.resolve('tinymce.html.Node');

    var global$8 = tinymce.util.Tools.resolve('tinymce.Env');

    var sanitize = function (editor, html) {
      if (Settings.shouldFilterHtml(editor) === false) {
        return html;
      }
      var writer = global$5();
      var blocked;
      global$2({
        validate: false,
        allow_conditional_comments: false,
        comment: function (text) {
          writer.comment(text);
        },
        cdata: function (text) {
          writer.cdata(text);
        },
        text: function (text, raw) {
          writer.text(text, raw);
        },
        start: function (name, attrs, empty) {
          blocked = true;
          if (name === 'script' || name === 'noscript') {
            return;
          }
          for (var i = 0; i < attrs.length; i++) {
            if (attrs[i].name.indexOf('on') === 0) {
              return;
            }
            if (attrs[i].name === 'style') {
              attrs[i].value = editor.dom.serializeStyle(editor.dom.parseStyle(attrs[i].value), name);
            }
          }
          writer.start(name, attrs, empty);
          blocked = false;
        },
        end: function (name) {
          if (blocked) {
            return;
          }
          writer.end(name);
        }
      }, global$6({})).parse(html);
      return writer.getContent();
    };
    var Sanitize = { sanitize: sanitize };

    var createPlaceholderNode = function (editor, node) {
      var placeHolder;
      var name = node.name;
      placeHolder = new global$7('img', 1);
      placeHolder.shortEnded = true;
      retainAttributesAndInnerHtml(editor, node, placeHolder);
      placeHolder.attr({
        'width': node.attr('width') || '300',
        'height': node.attr('height') || (name === 'audio' ? '30' : '150'),
        'style': node.attr('style'),
        'src': global$8.transparentSrc,
        'data-mce-object': name,
        'class': 'mce-object mce-object-' + name
      });
      return placeHolder;
    };
    var createPreviewIframeNode = function (editor, node) {
      var previewWrapper;
      var previewNode;
      var shimNode;
      var name = node.name;
      previewWrapper = new global$7('span', 1);
      previewWrapper.attr({
        'contentEditable': 'false',
        'style': node.attr('style'),
        'data-mce-object': name,
        'class': 'mce-preview-object mce-object-' + name
      });
      retainAttributesAndInnerHtml(editor, node, previewWrapper);
      previewNode = new global$7(name, 1);
      previewNode.attr({
        src: node.attr('src'),
        allowfullscreen: node.attr('allowfullscreen'),
        style: node.attr('style'),
        class: node.attr('class'),
        width: node.attr('width'),
        height: node.attr('height'),
        frameborder: '0'
      });
      shimNode = new global$7('span', 1);
      shimNode.attr('class', 'mce-shim');
      previewWrapper.append(previewNode);
      previewWrapper.append(shimNode);
      return previewWrapper;
    };
    var retainAttributesAndInnerHtml = function (editor, sourceNode, targetNode) {
      var attrName;
      var attrValue;
      var attribs;
      var ai;
      var innerHtml;
      attribs = sourceNode.attributes;
      ai = attribs.length;
      while (ai--) {
        attrName = attribs[ai].name;
        attrValue = attribs[ai].value;
        if (attrName !== 'width' && attrName !== 'height' && attrName !== 'style') {
          if (attrName === 'data' || attrName === 'src') {
            attrValue = editor.convertURL(attrValue, attrName);
          }
          targetNode.attr('data-mce-p-' + attrName, attrValue);
        }
      }
      innerHtml = sourceNode.firstChild && sourceNode.firstChild.value;
      if (innerHtml) {
        targetNode.attr('data-mce-html', escape(Sanitize.sanitize(editor, innerHtml)));
        targetNode.firstChild = null;
      }
    };
    var isPageEmbedWrapper = function (node) {
      var nodeClass = node.attr('class');
      return nodeClass && /\btiny-pageembed\b/.test(nodeClass);
    };
    var isWithinEmbedWrapper = function (node) {
      while (node = node.parent) {
        if (node.attr('data-ephox-embed-iri') || isPageEmbedWrapper(node)) {
          return true;
        }
      }
      return false;
    };
    var placeHolderConverter = function (editor) {
      return function (nodes) {
        var i = nodes.length;
        var node;
        var videoScript;
        while (i--) {
          node = nodes[i];
          if (!node.parent) {
            continue;
          }
          if (node.parent.attr('data-mce-object')) {
            continue;
          }
          if (node.name === 'script') {
            videoScript = VideoScript.getVideoScriptMatch(Settings.getScripts(editor), node.attr('src'));
            if (!videoScript) {
              continue;
            }
          }
          if (videoScript) {
            if (videoScript.width) {
              node.attr('width', videoScript.width.toString());
            }
            if (videoScript.height) {
              node.attr('height', videoScript.height.toString());
            }
          }
          if (node.name === 'iframe' && Settings.hasLiveEmbeds(editor) && global$8.ceFalse) {
            if (!isWithinEmbedWrapper(node)) {
              node.replace(createPreviewIframeNode(editor, node));
            }
          } else {
            if (!isWithinEmbedWrapper(node)) {
              node.replace(createPlaceholderNode(editor, node));
            }
          }
        }
      };
    };
    var Nodes = {
      createPreviewIframeNode: createPreviewIframeNode,
      createPlaceholderNode: createPlaceholderNode,
      placeHolderConverter: placeHolderConverter
    };

    var setup = function (editor) {
      editor.on('preInit', function () {
        var specialElements = editor.schema.getSpecialElements();
        global$1.each('video audio iframe object'.split(' '), function (name) {
          specialElements[name] = new RegExp('</' + name + '[^>]*>', 'gi');
        });
        var boolAttrs = editor.schema.getBoolAttrs();
        global$1.each('webkitallowfullscreen mozallowfullscreen allowfullscreen'.split(' '), function (name) {
          boolAttrs[name] = {};
        });
        editor.parser.addNodeFilter('iframe,video,audio,object,embed,script', Nodes.placeHolderConverter(editor));
        editor.serializer.addAttributeFilter('data-mce-object', function (nodes, name) {
          var i = nodes.length;
          var node;
          var realElm;
          var ai;
          var attribs;
          var innerHtml;
          var innerNode;
          var realElmName;
          var className;
          while (i--) {
            node = nodes[i];
            if (!node.parent) {
              continue;
            }
            realElmName = node.attr(name);
            realElm = new global$7(realElmName, 1);
            if (realElmName !== 'audio' && realElmName !== 'script') {
              className = node.attr('class');
              if (className && className.indexOf('mce-preview-object') !== -1) {
                realElm.attr({
                  width: node.firstChild.attr('width'),
                  height: node.firstChild.attr('height')
                });
              } else {
                realElm.attr({
                  width: node.attr('width'),
                  height: node.attr('height')
                });
              }
            }
            realElm.attr({ style: node.attr('style') });
            attribs = node.attributes;
            ai = attribs.length;
            while (ai--) {
              var attrName = attribs[ai].name;
              if (attrName.indexOf('data-mce-p-') === 0) {
                realElm.attr(attrName.substr(11), attribs[ai].value);
              }
            }
            if (realElmName === 'script') {
              realElm.attr('type', 'text/javascript');
            }
            innerHtml = node.attr('data-mce-html');
            if (innerHtml) {
              innerNode = new global$7('#text', 3);
              innerNode.raw = true;
              innerNode.value = Sanitize.sanitize(editor, unescape(innerHtml));
              realElm.append(innerNode);
            }
            node.replace(realElm);
          }
        });
      });
      editor.on('SetContent', function () {
        editor.$('span.mce-preview-object').each(function (index, elm) {
          var $elm = editor.$(elm);
          if ($elm.find('span.mce-shim', elm).length === 0) {
            $elm.append('<span class="mce-shim"></span>');
          }
        });
      });
    };
    var FilterContent = { setup: setup };

    var setup$1 = function (editor) {
      editor.on('ResolveName', function (e) {
        var name;
        if (e.target.nodeType === 1 && (name = e.target.getAttribute('data-mce-object'))) {
          e.name = name;
        }
      });
    };
    var ResolveName = { setup: setup$1 };

    var setup$2 = function (editor) {
      editor.on('click keyup', function () {
        var selectedNode = editor.selection.getNode();
        if (selectedNode && editor.dom.hasClass(selectedNode, 'mce-preview-object')) {
          if (editor.dom.getAttrib(selectedNode, 'data-mce-selected')) {
            selectedNode.setAttribute('data-mce-selected', '2');
          }
        }
      });
      editor.on('ObjectSelected', function (e) {
        var objectType = e.target.getAttribute('data-mce-object');
        if (objectType === 'audio' || objectType === 'script') {
          e.preventDefault();
        }
      });
      editor.on('ObjectResized', function (e) {
        var target = e.target;
        var html;
        if (target.getAttribute('data-mce-object')) {
          html = target.getAttribute('data-mce-html');
          if (html) {
            html = unescape(html);
            target.setAttribute('data-mce-html', escape(UpdateHtml.updateHtml(html, {
              width: e.width,
              height: e.height
            })));
          }
        }
      });
    };
    var Selection = { setup: setup$2 };

    var stateSelectorAdapter = function (editor, selector) {
      return function (buttonApi) {
        return editor.selection.selectorChangedWithUnbind(selector.join(','), buttonApi.setActive).unbind;
      };
    };
    var register$1 = function (editor) {
      editor.ui.registry.addToggleButton('media', {
        tooltip: 'Insert/edit media',
        icon: 'embed',
        onAction: function () {
          editor.execCommand('mceMedia');
        },
        onSetup: stateSelectorAdapter(editor, [
          'img[data-mce-object]',
          'span[data-mce-object]',
          'div[data-ephox-embed-iri]'
        ])
      });
      editor.ui.registry.addMenuItem('media', {
        icon: 'embed',
        text: 'Media...',
        onAction: function () {
          editor.execCommand('mceMedia');
        }
      });
    };
    var Buttons = { register: register$1 };

    global.add('media', function (editor) {
      Commands.register(editor);
      Buttons.register(editor);
      ResolveName.setup(editor);
      FilterContent.setup(editor);
      Selection.setup(editor);
      return Api.get(editor);
    });
    function Plugin () {
    }

    return Plugin;

}());
})();
