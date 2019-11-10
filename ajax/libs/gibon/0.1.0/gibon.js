(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.gibon = factory());
}(this, (function () { 'use strict';

/*!
 * gibon <https://github.com/tunnckoCore/gibon>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (http://i.am.charlike.online)
 * Released under the MIT license.
 */

function gibon (routes, onRoute, onClick, el) {
  onRoute = onRoute || (function onroute (view, state) {
    return view(state)
  });
  onClick = onClick || (function onclick (e, loc) {
    if (e.metaKey || e.shiftKey || e.ctrlKey || e.altKey) {
      return
    }
    var t = e.target;

    while (t && t.localName !== 'a') {
      t = t.parentNode;
    }

    loc = window.location;
    if (t && t.host === loc.host && !t.hasAttribute('data-no-routing')) {
      render(t.pathname);
      e.preventDefault();
    }
  });

  function start (handle) {
    handle = function handle_ () {
      return render(window.location.pathname)
    };

    handle();
    window.addEventListener('onpopstate', handle);
    window.onclick = function onclick__ (e) { onClick(e, render); };
  }

  function render (view, state) {
    view = typeof view === 'string' ? getView(view) : view;
    return (el = onRoute(view, state || {}, el))
  }

  function getView (pathname) {
    pathname = pathname.replace(/^\/+/, '/').replace(/\/+$/, '') || '/';
    window.history.pushState(0, 0, pathname);
    return getRoute(routes, pathname)
  }

  return {
    start: start,
    render: render
  }
}

function getRoute (routes, pathname, _re) {
  if (typeof routes === 'function') {
    return routes
  }

  if (routes[pathname]) {
    return routes[pathname]
  }

  for (var route in routes) {
    _re = regexify(route);
    if (_re.regex.test(pathname)) {
      var params = {};
      pathname.replace(_re.regex, function () {
        for (var i = 1; i < arguments.length - 2; i++) {
          params[_re.keys.shift()] = arguments[i];
        }
        _re.match = 1;
      });

      if (_re.match) {
        return function _view (state, actions) {
          actions = actions || params;
          return routes[route](state, actions, params)
        }
      }
    }
  }
}

function regexify (route, _regex) {
  var keys = [];
  _regex = '^' + route
    .replace(/\//g, '\\/')
    .replace(/:(\w+)/g, function _replace (_, name) {
      keys.push(name);
      return '(\\w+)'
    }) + '$';

  return {
    regex: new RegExp(_regex, 'i'),
    keys: keys
  }
}

return gibon;

})));
