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
function URLSearchParams(query) {
  for (var
    name, value, pair,
    pairs = (query || '').split('&'),
    i = 0,
    length = pairs.length; i < length; i++
  ) {
    pair = pairs[i].split('=');
    this.append(
      decodeURIComponent(pair[0]),
      decodeURIComponent(pair[1] || '')
    );
  }
}

URLSearchParams.prototype.append = function append(name, value) {
  this[name] = this.has(name) ?
    [].concat(this[name], '' + value) :
    '' + value;
};

URLSearchParams.prototype.delete = function del(name) {
  delete this[name];
};

URLSearchParams.prototype.get = function get(name) {
  var value = this[name];
  return this.has(name) ?
    (typeof value === 'string' ? value : value[0]) :
    null;
};

URLSearchParams.prototype.getAll = function getAll(name) {
  var value = this[name];
  return this.has(name) ?
    (typeof value === 'string' ? [value] : value) :
    [];
};

URLSearchParams.prototype.has = URLSearchParams.prototype.hasOwnProperty;

URLSearchParams.prototype.set = function set(name, value) {
  this[name] = '' + value;
};

URLSearchParams.prototype.toJSON = function toJSON() {
  return {};
};

URLSearchParams.prototype.toString = function toString() {
  var query = [], i, name, value;
  for (name in this) {
    if (this.has(name)) {
      name = encodeURIComponent(name);
      for (
        i = 0,
        value = [].concat(this[name]);
        i < value.length; i++
      ) {
        query.push(name + '=' + encodeURIComponent(value[i]));
      }
    }
  }
  return query.join('&');
};
return URLSearchParams;
}());