'use strict'
var test = require('tap').test;
var fs = require('fs');

// Hackish
GLOBAL.L = {
  Control: {
    extend: function () {}
  },
  Mixin: {
    Events: null
  }
}
eval(fs.readFileSync('control/Permalink.js').toString());


test('L.UrlUtil.queryParse', function (t) {
  var data = [
    ['a=1&b=2',     {'a': '1', 'b': '2'}],
    ['a=1&amp;b=2', {'a': '1', 'b': '2'}],
    ['a=1,2',       {'a': '1,2'}],
    ['a=1%2C2',     {'a': '1,2'}],
    ['a=1%2C2&b=3%7C4', {'a': '1,2', 'b': '3|4'}],
    ['name=Лилль',  {'name': 'Лилль'}],
    ['name=%D0%9B%D0%B8%D0%BB%D0%BB%D1%8C',  {'name': 'Лилль'}],
    ['a=1&name=%D0%9B%D0%B8%D0%BB%D0%BB%D1%8C', {'a': '1', 'name': 'Лилль'}],
  ];
  data.forEach(function (d) {
    t.strictSame(L.UrlUtil.queryParse(d[0]), d[1], 'Parsing '+d[0]);
  });
  t.plan(data.length, 'Check all parsing tests were done');
  t.done();
})

