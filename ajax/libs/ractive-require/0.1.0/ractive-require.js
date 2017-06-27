/*! Ractive-Require (0.1.0). (C) 2015 Xavier Boubert. MIT @license: en.wikipedia.org/wiki/MIT_License */
(function() {
  // Source: https://github.com/ractivejs/ractive-load/blob/master/src/utils/get.js
  // Author: Rich-Harris (https://github.com/Rich-Harris)

  'use strict';

  var getHtml;

  // Test for XHR to see if we're in a browser...
  if (typeof XMLHttpRequest !== 'undefined') {
    getHtml = function(url) {
      return new window.Ractive.Promise(function(fulfil, reject) {
        var xhr, onload, loaded;

        xhr = new XMLHttpRequest();
        xhr.open('GET', url);

        onload = function() {
          if ((xhr.readyState !== 4) || loaded) {
            return;
          }

          fulfil(xhr.responseText);
          loaded = true;
        };

        xhr.onload = xhr.onreadystatechange = onload;
        xhr.onerror = reject;
        xhr.send();

        if (xhr.readyState === 4) {
          onload();
        }
      });
    };
  }

  // ...or in node.js
  else {
    getHtml = function(url) {
      return new window.Ractive.Promise(function(fulfil, reject) {
        require('fs').readFile(url, function(err, result) {
          if (err) {
            return reject(err);
          }

          fulfil(result.toString());
        });
      });
    };
  }

  window.Ractive.getHtml = getHtml;

})();

(function() {
  'use strict';

  var _controllers = {};

  window.Ractive.controller = function(name, controller) {
    _controllers[name] = _controllers[name] || [];

    if (typeof controller == 'function') {
      _controllers[name].push(controller);
    }
  };

  function _callControllers(controllers, Component, data, el, config, i) {
    i = i || 0;

    if (i < controllers.length) {
      controllers[i](Component, data, el, config, function() {
        _callControllers(controllers, Component, data, el, config, ++i);
      });
    }
  }

  window.Ractive.fireController = function(name, Component, data, el, config) {
    if (_controllers[name]) {
      _callControllers(_controllers[name], Component, data, el, config);
    }
  };

})();

(function() {
  'use strict';

  function _requirePartial(rvPartial, callback) {
    var src = rvPartial.getAttribute('src') || false,
        target = rvPartial.getAttribute('target');

    if (!target) {
      return callback(false);
    }

    if (src) {
      window.Ractive.getHtml(src)
        .then(function(template) {
          template = _applyAbsolutePath(template, src);

          callback(target, template);
        });

      return;
    }

    callback(target, rvPartial.innerHTML);
  }

  function _fetchPartials(element, parent) {
    return new window.Ractive.Promise(function(fulfil) {
      var partials = {},
          rvPartials = element.querySelectorAll('rv-partial'),
          count = rvPartials.length,
          partialName;

      for (partialName in parent.partials) {
        partials[partialName] = parent.partials[partialName];
      }

      if (!count) {
        return fulfil(partials);
      }

      Array.prototype.map.call(rvPartials, function(rvPartial) {
        _requirePartial(rvPartial, function(target, template) {
          if (target) {
            partials[target] = template;
          }

          --count;
          if (count < 1) {
            fulfil(partials);
          }
        });
      });
    });
  }

  function _fetchData(element, parent) {
    var data = {},
        attr,
        name;

    for (var i = 0; i < element.attributes.length; i++) {
      attr = element.attributes[i];
      if (attr.name.indexOf('data-bind-') === 0) {
        name = attr.name.substr(10, attr.name.length - 10);
        data[name] = parent.get(attr.value);
      }
      else if (attr.name.indexOf('data-') === 0) {
        name = attr.name.substr(5, attr.name.length - 5);
        data[name] = attr.value;
      }
    }

    return data;
  }

  function _applyAbsolutePath(template, src) {
    var newSrc = src.split('/');

    return template.replace(/(rv\-require|rv\-partial).?src="(.*?)"/g, function(match, tag, elementSrc) {
      newSrc.pop();
      newSrc.push(elementSrc);

      return match.replace(/src="(.*?)"/, 'src="' + newSrc.join('/') + '"');
    });
  }

  function _requireElement(parent, element, callback, forceNoScript, forceNoCSS) {
    forceNoScript = forceNoScript || false;

    var src = element.getAttribute('src'),
        name = element.getAttribute('name'),
        noScript = forceNoScript || element.getAttribute('no-script') == 'true',
        noCSS = forceNoCSS || element.getAttribute('no-css') == 'true';

    if (!src) {
      throw new Error('nv-require needs to have a "src" attrbute');
    }

    if (!name) {
      throw new Error('nv-require needs to have a "name" attrbute');
    }

    element.setAttribute('loaded', 'true');

    if (!window.Ractive.templates[name]) {

      if (!noScript) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src + '.js';
        script.onload = function() {
          _requireElement(parent, element, callback, true, noCSS);
        };
        document.getElementsByTagName('head')[0].appendChild(script);

        return;
      }

      if (!noCSS) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = src + '.css';
        link.onload = function() {
          _requireElement(parent, element, callback, noScript, true);
        };
        document.getElementsByTagName('head')[0].appendChild(link);

        return;
      }

      window.Ractive.getHtml(src + '.html')
        .then(function(template) {
          template = _applyAbsolutePath(template, src);

          window.Ractive.templates[name] = template;

          _requireElement(parent, element, callback);
        });

      return;
    }

    var template = window.Ractive.templates[name],
        data = _fetchData(element, parent);

    _fetchPartials(element, parent)
      .then(function(partials) {

        element.innerHTML = '';

        window.Ractive.fireController(name, function Component(config) {
          config = config || {};

          config.el = config.el || element;
          config.template = config.template || template;
          if (config.partials) {
            var partial;

            for (partial in config.partials) {
              partials[partial] = config.partials[partial];
            }
          }
          config.partials = partials;
          config.parentRequire = parent;

          var ractive = new window.Ractive(config);

          ractive.on('teardown', function() {
            ractive.parentRequire = null;

            var i;

            if (parent && parent.childrenRequire) {
              for (i = 0; i < parent.childrenRequire.length; i++) {
                if (parent.childrenRequire[i] === ractive) {
                  parent.childrenRequire.splice(i, 1);
                  break;
                }
              }
            }

            if (ractive.childrenRequire) {
              for (i = ractive.childrenRequire.length - 1; i >= 0; i--) {
                ractive.childrenRequire[i].teardown();
              }
            }
          });

          ractive.childrenRequire = [];
          parent.childrenRequire.push(ractive);

          return ractive;
        }, data, element, {
          template: template,
          partials: partials
        });

        if (callback) {
          callback();
        }
      });
  }

  function _inScope(element, parent) {
    if (element.parentNode != parent) {
      if (element.parentNode.tagName.toLowerCase() == 'rv-require') {
        return false;
      }

      return _inScope(element.parentNode, parent);
    }

    return true;
  }

  window.Ractive.templates = window.Ractive.templates || {};

  window.Ractive.prototype.require = function(name) {
    name = name || null;

    var _this = this;

    this.childrenRequire = this.childrenRequire || [];

    return new window.Ractive.Promise(function(fulfil) {

      var elements = name ?
            _this.findAll('rv-require[src][ondemand="' + name + '"]:not([loaded="true"])') :
            _this.findAll('rv-require[src]:not([loaded="true"]):not([ondemand])'),
          count = elements.length;

      if (count < 1) {
        return fulfil();
      }

      elements.forEach(function(element) {

        if (_inScope(element, _this.el)) {
          _requireElement(_this, element, function() {
            --count;
            if (count < 1) {
              fulfil();
            }
          });
        }
      });

    });
  };

})();
