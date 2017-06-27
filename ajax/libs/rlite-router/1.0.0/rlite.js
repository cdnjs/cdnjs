function Rlite() {
  var routes = {},
      decode = decodeURIComponent;

  return {
    add: function(route, handler) {
      var pieces = route.toLowerCase().split('/'),
          rules = routes;

      for (var i = 0; i < pieces.length; ++i) {
        var piece = pieces[i],
            name = piece[0] == ':' ? ':' : piece;

        rules = rules[name] || (rules[name] = {});

        if (name == ':') {
          rules['@name'] = piece.slice(1);
        }
      }

      rules['@'] = handler;
    },

    run: function(url) {
      if (url !== '') {
        url = url.replace('/?', '?');
        url[0] == '/' && (url = url.slice(1));
        url.slice(-1) == '/' && (url = url.slice(0, -1));
      }

      var rules = routes,
          querySplit = url.split('?'),
          pieces = querySplit[0].split('/'),
          params = {};

      // Parse the non-query portion of the URL...
      for (var i = 0; i < pieces.length && rules; ++i) {
        var piece = decode(pieces[i]),
            rule = rules[piece.toLowerCase()];

        if (!rule && (rule = rules[':'])) {
          params[rule['@name']] = piece;
        }

        rules = rule;
      }

      (function parseQuery(q) {
        var query = q.split('&');

        for (var i = 0; i < query.length; ++i) {
          var nameValue = query[i].split('=');

          nameValue.length > 1 && (params[nameValue[0]] = decode(nameValue[1]));
        }
      })(querySplit.length > 1 ? querySplit[1] : '');

      if (rules && rules['@']) {
        rules['@']({
          url: url,
          params: params
        });
        return true;
      }

      return false;
    }
  };
}

(function (root, factory) {
  var define = root.define,
      module = root.module;

  if (define && define.amd) {
    define([], factory);
  } else if (module && module.exports) {
    module.exports = factory();
  }
}(this, function () { return Rlite; }));
