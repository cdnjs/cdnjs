/*
 * JSFace Object Oriented Programming Library - Ready plugin
 * https://github.com/tnhu/jsface
 *
 * Copyright (c) 2009-2012 Tan Nhu
 * Licensed under MIT license (https://github.com/tnhu/jsface/blob/master/LICENSE.txt)
 */
(function(context) {
  var jsface        = context.jsface || require("./jsface"),
      Class         = jsface.Class,
      functionOrNil = jsface.functionOrNil,
      readyFns      = [],
      readyCount    = 0;

  Class.plugins.$ready = function invoke(clazz, parent, api, loop) {
    var r       = api.$ready,
        len     = parent ? parent.length : 0,
        count   = len,
        _super  = len && parent[0].$super,
        pa, i, entry;

    // find and invoke $ready from parent(s)
    while (len--) {
      for (i = 0; i < readyCount; i++) {
        entry = readyFns[i];
        pa    = parent[len];

        if (pa === entry[0]) {
          entry[1].call(pa, clazz, parent, api);
          count--;
        }

        if ( !count) { break; }
      }
    }

    // call $ready from grandparent(s), if any
    if (_super) {
      invoke(clazz, [ _super ], api, true);
    }

    // in an environment where there are a lot of class creating/removing (rarely)
    // this implementation might cause a leak (saving pointers to clazz and $ready)
    if ( !loop && functionOrNil(r)) {
      r.call(clazz, clazz, parent, api);  // invoke ready from current class
      readyFns.push([ clazz,  r ]);
      readyCount++;
    }
  };
})(this);
