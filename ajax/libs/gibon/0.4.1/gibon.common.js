'use strict';

/*!
 * gibon <https://github.com/tunnckoCore/gibon>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (https://i.am.charlike.online)
 * Released under the MIT license.
 */

// `el` placeholder
function gibon (routes, onRoute, onClick, el) {
  onRoute = onRoute || ((view, state) => view(state));
  onClick = onClick || defaultOnClick;

  function defaultOnClick (e, loc) {
    // `loc` is placeholder
    if (e.metaKey || e.shiftKey || e.ctrlKey || e.altKey) {
      return
    }
    var t = e.target;

    while (t && t.localName !== 'a') {
      t = t.parentNode;
    }

    loc = window.location;
    if (t && t.host === loc.host && !t.hasAttribute('data-no-routing')) {
      render(t.pathname, {}, true);
      e.preventDefault();
    }
  }

  // `handle` is placeholder
  function start (handle) {
    handle = () => render(window.location.pathname);

    handle();
    window.addEventListener('onpopstate', handle);
    window.onclick = (e) => onClick(e, render);
  }

  function render (view, state) {
    view = typeof view === 'string' ? getView(view) : view;
    return (el = onRoute(view, state, el))
  }

  function getView (pathname) {
    pathname = pathname || '/';
    window.history.pushState(0, 0, pathname);
    return getRoute(routes, pathname)
  }

  return {
    start,
    render
  }
}

// `_re` and `_route` are placeholders
function getRoute (routes, pathname, _re, _route) {
  if (typeof routes === 'function') {
    return routes
  }

  if (routes[pathname]) {
    return routes[pathname]
  }

  for (_route in routes) {
    _re = regexify(_route);
    if (_re.regex.test(pathname)) {
      let params = {};
      pathname.replace(_re.regex, function (args) {
        args = arguments;
        for (var i = 1; i < args.length - 2; i++) {
          params[_re.keys.shift()] = args[i];
        }
        _re.match = 1;
      });

      if (_re.match) {
        return (state, actions) => {
          actions = actions || params;
          return routes[_route](state, actions, params)
        }
      }
    }
  }
}

function regexify (route, _regex) {
  const keys = [];
  _regex =
    '^' +
    route.replace(/\//g, '\\/').replace(/:(\w+)/g, (_, name) => {
      keys.push(name);
      return '(\\w+)'
    }) +
    '$';

  return {
    regex: new RegExp(_regex, 'i'),
    keys
  }
}

module.exports = gibon;
