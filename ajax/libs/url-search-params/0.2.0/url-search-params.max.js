/*!
Copyright (C) 2015 by WebReflection

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
var URLSearchParams = URLSearchParams || (function () {
'use strict';

function encode(str) {
  return encodeURIComponent(str).replace(find, replacer);
}

function decode(str) {
  return decodeURIComponent(str.replace(plus, ' '));
}

function URLSearchParams(query) {
  this[secret] = Object.create(null);
  if (!query) return;
  for (var
    index, value,
    pairs = (query || '').split('&'),
    i = 0,
    length = pairs.length; i < length; i++
  ) {
    value = pairs[i];
    index = value.indexOf('=');
    if (-1 < index) {
      this.append(
        decode(value.slice(0, index)),
        decode(value.slice(index + 1))
      );
    }
  }
}

var
  URLSearchParamsProto = URLSearchParams.prototype,
  find = /[!'\(\)~]|%20|%00/g,
  plus = /\+/g,
  replace = {
    '!': '%21',
    "'": '%27',
    '(': '%28',
    ')': '%29',
    '~': '%7E',
    '%20': '+',
    '%00': '\x00'
  },
  replacer = function (match) {
    return replace[match];
  },
  secret = '__URLSearchParams__:' + Math.random()
;

URLSearchParamsProto.append = function append(name, value) {
  var dict = this[secret];
  if (name in dict) {
    dict[name].push('' + value);
  } else {
    dict[name] = ['' + value];
  }
};

URLSearchParamsProto.delete = function del(name) {
  delete this[secret][name];
};

URLSearchParamsProto.get = function get(name) {
  var dict = this[secret];
  return name in dict ? dict[name][0] : null;
};

URLSearchParamsProto.getAll = function getAll(name) {
  var dict = this[secret];
  return name in dict ? dict[name].slice(0) : [];
};

URLSearchParamsProto.has = function has(name) {
  return name in this[secret];
};

URLSearchParamsProto.set = function set(name, value) {
  this[secret][name] = ['' + value];
};

URLSearchParamsProto.toJSON = function toJSON() {
  return {};
};

URLSearchParamsProto.toString = function toString() {
  var dict = this[secret], query = [], i, key, name, value;
  for (key in dict) {
    name = encode(key);
    for (
      i = 0,
      value = dict[key];
      i < value.length; i++
    ) {
      query.push(name + '=' + encode(value[i]));
    }
  }
  return query.join('&');
};
var
  HTMLAE = HTMLAnchorElement,
  HTMLAEProto = HTMLAE.prototype,
  dP = Object.defineProperty,
  gOPD = Object.getOwnPropertyDescriptor,
  searchParams = gOPD(HTMLAEProto, 'searchParams'),
  href = gOPD(HTMLAEProto, 'href'),
  search = gOPD(HTMLAEProto, 'search'),
  polluteSearchParams = (function () {
    /*jshint validthis:true */
    function append(name, value) {
      URLSearchParamsProto.append.call(this, name, value);
      name = this.toString();
      search.set.call(this._a, name ? ('?' + name) : '');
    }
    function del(name) {
      URLSearchParamsProto.delete.call(this, name);
      name = this.toString();
      search.set.call(this._a, name ? ('?' + name) : '');
    }
    function set(name, value) {
      URLSearchParamsProto.set.call(this, name, value);
      name = this.toString();
      search.set.call(this._a, name ? ('?' + name) : '');
    }
    return function (sp, a) {
      sp.append = append;
      sp.delete = del;
      sp.set = set;
      return dP(sp, '_a', {
        configurable: true,
        writable: true,
        value: a
      });
    };
  }()),
  createSearchParams = function (a, sp) {
    dP(
      a, '_searchParams', {
        configurable: true,
        writable: true,
        value: polluteSearchParams(sp, a)
      }
    );
    return sp;
  },
  updateSearchParams = function (sp) {
    var append = sp.append;
    sp.append = URLSearchParamsProto.append;
    URLSearchParams.call(sp, sp._a.search.slice(1));
    sp.append = append;
  },
  verifySearchParams = function (obj) {
    if (!(obj instanceof HTMLAE)) throw new TypeError(
      "'searchParams' accessed on an object that " +
      "does not implement interface HTMLAnchorElement."
    );
  }
;

if (!searchParams && search) {
  Object.defineProperties(
    HTMLAEProto,
    {
      href: {
        get: function () {
          return href.get.call(this);
        },
        set: function (value) {
          var sp = this._searchParams;
          href.set.call(this, value);
          if (sp) updateSearchParams(sp);
        }
      },
      search: {
        get: function () {
          return search.get.call(this);
        },
        set: function (value) {
          var sp = this._searchParams;
          search.set.call(this, value);
          if (sp) updateSearchParams(sp);
        }
      },
      searchParams: {
        get: function () {
          verifySearchParams(this);
          return this._searchParams || createSearchParams(
            this,
            new URLSearchParams(this.search.slice(1))
          );
        },
        set: function (sp) {
          verifySearchParams(this);
          createSearchParams(this, sp);
        }
      }
    }
  );
}


/*

function spUpdate(a) {
  var
    search = this.toString(),
    password = a.password,
    username = a.username
  ;
  a.href = ''.concat(
    a.protocol, '//',
    username,
    password ? (':' + password) : '',
    username ? '@' : '',
    a.host,
    a.pathname,
    search ? ('?' + search) : '',
    a.hash
  );
}

*/

return URLSearchParams;
}());