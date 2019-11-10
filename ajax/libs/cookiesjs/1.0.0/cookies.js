var cookies = function (data, opt) {
  function defaults (obj, defs) {
    obj = obj || {};
    for (var key in defs) {
      if (obj[key] === undefined) {
        obj[key] = defs[key];
      }
    }
    return obj;
  }

  defaults(cookies, {
    expires: 365 * 24 * 3600,
    path: '/',
    secure: window.location.protocol === 'https:',
    json: true,
    encode: function (val) {
      return encodeURIComponent(val);
    },
    decode: function (val) {
      return decodeURIComponent(val);
    }
  });

  opt = defaults(opt, cookies);

  function expires (time) {
    var expires = new Date();
    expires.setTime(expires.getTime() + (time * 1000));
    return expires.toUTCString();
  }

  if (typeof data === 'string') {
    var value = document.cookie.split(/;\s*/)
      .map(opt.decode).map(function (part) { return part.split('='); })
      .reduce(function (parts, part) {
        parts[part[0]] = part[1];
        return parts;
      }, {})[data];
    if (!opt.json) return value;
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  }

  for (var key in data) {
    var expired = data[key] === undefined || data[key] === null;
    var encoded = opt.encode(JSON.stringify(data[key]));
    if (expired) encoded = '';
    var res = opt.encode(key) + '=' + encoded +
      ';expires=' + expires(expired ? -10000 : opt.expires) +
      ';path=' + opt.path +
      (opt.domain ? (';domain=' + opt.domain) : '') +
      (opt.secure ? ';secure' : '');
    if (opt.test) opt.test(res);
    document.cookie = res;
  }
  return cookies;
};
