function Rlite() {
  var routes = {};

  var self = {
    add: function(route, handler) {
      var pieces = route.split('/'),
          rules = routes;

      for (var i = 0; i < pieces.length; ++i) {
        var piece = pieces[i],
            name = piece.length && piece.charAt(0) == ':' ? ':' : piece;

        if (!rules[name]) {
          rules = (rules[name] = {});

          if (name == ':') {
            rules['@name'] = piece.slice(1);
          }
        } else {
          rules = rules[name];
        }
      }

      rules['@'] = handler;
    },

    run: function(url) {
      if (url && url.length) {
        url = url.replace('/?', '?');
        url.charAt(0) == '/' && (url = url.slice(1));
        url.length && url.slice(-1) == '/' && (url = url.slice(0, -1));
      }

      var rules = routes,
          querySplit = url.split('?', 2),
          pieces = querySplit[0].split('/', 50),
          params = {};

      (function parseUrl() {
        for (var i = 0; i < pieces.length && rules; ++i) {
          var piece = pieces[i],
              rule = rules[piece.toLowerCase()];

          if (!rule && (rule = rules[':'])) {
            params[rule['@name']] = piece;
          }

          rules = rule;
        }
      })();

      (function parseQuery(q) {
        var query = q.split('&', 50);

        for (var i = 0; i < query.length; ++i) {
          var nameValue = query[i].split('=', 2);

          nameValue.length == 2 && (params[nameValue[0]] = nameValue[1]);
        }
      })(querySplit.length == 2 ? querySplit[1] : '');

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

  return self;
}
