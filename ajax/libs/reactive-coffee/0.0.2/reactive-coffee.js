(function() {
  var DepArray, DepCell, DepMgr, Depmap, Ev, MappedDepArray, ObsArray, ObsCell, ObsMap, RawHtml, Recorder, SrcArray, SrcCell, SrcMap, bind, depMgr, ev, events, lagBind, mkMap, mktag, mkuid, nextUid, popKey, recorder, rx, rxt, specialAttrs, tag, tags, _fn, _i, _len, _ref, _ref1, _ref2, _ref3,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    _this = this;

  if (typeof exports === 'undefined') {
    this.rx = rx = {};
  } else {
    rx = exports;
  }

  nextUid = 0;

  mkuid = function() {
    return nextUid += 1;
  };

  popKey = function(x, k) {
    var v;

    if (!k in x) {
      throw 'object has no key ' + k;
    }
    v = x[k];
    delete x[k];
    return v;
  };

  mkMap = function() {
    return Object.create(null);
  };

  Recorder = rx.Recorder = (function() {
    function Recorder() {
      this.stack = [];
    }

    Recorder.prototype.start = function(dep) {
      return this.stack.push(dep);
    };

    Recorder.prototype.stop = function() {
      return this.stack.pop();
    };

    Recorder.prototype.sub = function(sub) {
      var handle, topCell;

      if (this.stack.length > 0) {
        topCell = _(this.stack).last();
        handle = sub(topCell);
        return topCell.addSub(handle);
      }
    };

    Recorder.prototype.warnMutate = function() {
      if (this.stack.length > 0) {
        return console.warn('Mutation to observable detected during a bind context');
      }
    };

    return Recorder;

  })();

  recorder = new Recorder();

  rx.bind = bind = function(f) {
    var dep;

    dep = rx.depCell(f);
    dep.refresh();
    return dep;
  };

  rx.lagBind = lagBind = function(init, f) {
    var dep;

    dep = rx.lagDepCell(f, init);
    dep.refresh();
    return dep;
  };

  DepMgr = rx.DepMgr = (function() {
    function DepMgr() {
      this.uid2src = {};
    }

    DepMgr.prototype.sub = function(uid, src) {
      return this.uid2src[uid] = src;
    };

    DepMgr.prototype.unsub = function(uid) {
      this.uid2src[uid].unsub(uid);
      return popKey(this.uid2src, uid);
    };

    return DepMgr;

  })();

  depMgr = new DepMgr();

  Ev = rx.Ev = (function() {
    function Ev(inits) {
      this.inits = inits;
      this.subs = [];
    }

    Ev.prototype.sub = function(listener) {
      var init, uid, _i, _len, _ref;

      uid = mkuid();
      if (this.inits != null) {
        _ref = this.inits();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          init = _ref[_i];
          listener(init);
        }
      }
      this.subs[uid] = listener;
      depMgr.sub(uid, this);
      return uid;
    };

    Ev.prototype.pub = function(data) {
      var listener, uid, _ref, _results;

      _ref = this.subs;
      _results = [];
      for (uid in _ref) {
        listener = _ref[uid];
        _results.push(listener(data));
      }
      return _results;
    };

    Ev.prototype.unsub = function(uid) {
      return popKey(this.subs, uid);
    };

    return Ev;

  })();

  ObsCell = rx.ObsCell = (function() {
    function ObsCell(x) {
      var _ref,
        _this = this;

      this.x = x;
      this.x = (_ref = this.x) != null ? _ref : null;
      this.onSet = new Ev(function() {
        return [[null, _this.x]];
      });
    }

    ObsCell.prototype.get = function() {
      var _this = this;

      recorder.sub(function(target) {
        return _this.onSet.sub(function() {
          return target.refresh();
        });
      });
      return this.x;
    };

    return ObsCell;

  })();

  SrcCell = rx.SrcCell = (function(_super) {
    __extends(SrcCell, _super);

    function SrcCell() {
      _ref = SrcCell.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    SrcCell.prototype.set = function(x) {
      var old;

      recorder.warnMutate();
      old = this.x;
      this.x = x;
      this.onSet.pub([old, x]);
      return old;
    };

    return SrcCell;

  })(ObsCell);

  DepCell = rx.DepCell = (function(_super) {
    __extends(DepCell, _super);

    function DepCell(body, init, lag) {
      this.body = body;
      DepCell.__super__.constructor.call(this, init != null ? init : null);
      this.subs = [];
      this.refreshing = false;
      this.lag = lag != null ? lag : false;
      this.timeout = null;
    }

    DepCell.prototype.refresh = function() {
      var realRefresh,
        _this = this;

      realRefresh = function() {
        var old, subUid, _i, _len, _ref1;

        if (!_this.refreshing) {
          old = _this.x;
          _ref1 = _this.subs;
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            subUid = _ref1[_i];
            depMgr.unsub(subUid);
          }
          _this.subs = [];
          recorder.start(_this);
          _this.refreshing = true;
          try {
            _this.x = _this.body();
          } finally {
            _this.refreshing = false;
            recorder.stop();
          }
          return _this.onSet.pub([old, _this.x]);
        }
      };
      if (!this.refreshing) {
        if (this.lag) {
          if (this.timeout != null) {
            clearTimeout(this.timeout);
          }
          console.log('setting timeout');
          return this.timeout = setTimeout(realRefresh, 500);
        } else {
          return realRefresh();
        }
      }
    };

    DepCell.prototype.addSub = function(subUid) {
      return this.subs.push(subUid);
    };

    return DepCell;

  })(ObsCell);

  ObsArray = rx.ObsArray = (function() {
    function ObsArray(xs) {
      var _ref1,
        _this = this;

      this.xs = xs;
      this.xs = (_ref1 = this.xs) != null ? _ref1 : [];
      this.onChange = new Ev(function() {
        return [[0, [], _this.xs]];
      });
    }

    ObsArray.prototype.all = function() {
      var _this = this;

      recorder.sub(function(target) {
        return _this.onChange.sub(function() {
          return target.refresh();
        });
      });
      return this.xs;
    };

    ObsArray.prototype.at = function(i) {
      var _this = this;

      recorder.sub(function(target) {
        return _this.onChange.sub(function(_arg) {
          var added, index, removed;

          index = _arg[0], removed = _arg[1], added = _arg[2];
          if (index === i) {
            return target.refresh();
          }
        });
      });
      return this.xs[i];
    };

    ObsArray.prototype.length = function() {
      var _this = this;

      recorder.sub(function(target) {
        return _this.onChange.sub(function(_arg) {
          var added, index, removed;

          index = _arg[0], removed = _arg[1], added = _arg[2];
          if (removed.length !== added.length) {
            return target.refresh();
          }
        });
      });
      return this.xs.length;
    };

    ObsArray.prototype.map = function(f) {
      var ys;

      ys = new MappedDepArray();
      this.onChange.sub(function(_arg) {
        var added, index, removed;

        index = _arg[0], removed = _arg[1], added = _arg[2];
        return ys.realSplice(index, removed.length, added.map(f));
      });
      return ys;
    };

    ObsArray.prototype.realSplice = function(index, count, additions) {
      var removed;

      removed = this.xs.splice.apply(this.xs, [index, count].concat(additions));
      return this.onChange.pub([index, removed, additions]);
    };

    return ObsArray;

  })();

  SrcArray = rx.SrcArray = (function(_super) {
    __extends(SrcArray, _super);

    function SrcArray() {
      _ref1 = SrcArray.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    SrcArray.prototype.spliceArray = function(index, count, additions) {
      recorder.warnMutate();
      return this.realSplice(index, count, additions);
    };

    SrcArray.prototype.splice = function() {
      var additions, count, index;

      index = arguments[0], count = arguments[1], additions = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
      return this.spliceArray(index, count, additions);
    };

    SrcArray.prototype.insert = function(x, index) {
      return this.splice(index, 0, x);
    };

    SrcArray.prototype.remove = function(x) {
      return this.removeAt(_(this.all()).indexOf(x));
    };

    SrcArray.prototype.removeAt = function(index) {
      return this.splice(index, 1);
    };

    SrcArray.prototype.push = function(x) {
      return this.splice(this.length(), 0, x);
    };

    SrcArray.prototype.put = function(i, x) {
      return this.splice(i, 1, x);
    };

    SrcArray.prototype.replace = function(xs) {
      return this.spliceArray(0, this.length(), xs);
    };

    return SrcArray;

  })(ObsArray);

  MappedDepArray = rx.MappedDepArray = (function(_super) {
    __extends(MappedDepArray, _super);

    function MappedDepArray() {
      _ref2 = MappedDepArray.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    return MappedDepArray;

  })(ObsArray);

  DepArray = rx.DepArray = (function(_super) {
    __extends(DepArray, _super);

    function DepArray(f) {
      this.f = f;
      DepArray.__super__.constructor.call(this);
      new DepCell(this.f).onSet.sub(function(_arg) {
        var additions, count, index, old, val, _i, _ref3, _ref4, _results;

        old = _arg[0], val = _arg[1];
        _ref4 = firstWhere((function() {
          _results = [];
          for (var _i = 0, _ref3 = Math.min(old.length, val.length); 0 <= _ref3 ? _i <= _ref3 : _i >= _ref3; 0 <= _ref3 ? _i++ : _i--){ _results.push(_i); }
          return _results;
        }).apply(this), function(i) {
          return old[i] !== val[i];
        }), index = _ref4[0], index = _ref4[1];
        if (index > -1) {
          count = old.length - index;
          additions = val.slice(index);
          return this.realSplice(index, count, additions);
        }
      });
    }

    return DepArray;

  })(ObsArray);

  ObsMap = rx.ObsMap = (function() {
    function ObsMap(x) {
      var _this = this;

      this.x = x != null ? x : {};
      this.onAdd = new Ev(function() {
        var k, v, _results;

        _results = [];
        for (k in x) {
          v = x[k];
          _results.push([k, v]);
        }
        return _results;
      });
      this.onRemove = new Ev();
      this.onChange = new Ev();
    }

    ObsMap.prototype.get = function(key) {
      var _this = this;

      recorder.sub(function(target) {
        return _this.onChange.sub(function(_arg) {
          var old, subkey, val;

          subkey = _arg[0], old = _arg[1], val = _arg[2];
          if (key === subkey) {
            return target.refresh();
          }
        });
      });
      return this.x[key];
    };

    ObsMap.prototype.all = function() {
      var _this = this;

      recorder.sub(function(target) {
        return _this.onChange.sub(function() {
          return target.refresh();
        });
      });
      return _.clone(this.x);
    };

    ObsMap.prototype.realPut = function(key, val) {
      var old;

      if (__indexOf.call(this.x, key) >= 0) {
        old = this.x[key];
        this.x[key] = val;
        this.onChange.pub([key, old, val]);
        return old;
      } else {
        this.x[key] = val;
        this.onAdd.pub([key, val]);
        return void 0;
      }
    };

    ObsMap.prototype.realRemove = function(key) {
      var val;

      val = popKey(this.x, key);
      this.onRemove.pub([key, val]);
      return val;
    };

    return ObsMap;

  })();

  SrcMap = rx.SrcMap = (function(_super) {
    __extends(SrcMap, _super);

    function SrcMap() {
      _ref3 = SrcMap.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    SrcMap.prototype.put = function(key, val) {
      recorder.warnMutate();
      return this.realPut(key, val);
    };

    SrcMap.prototype.remove = function(key) {
      recorder.warnMutate();
      return this.realRemove(key);
    };

    return SrcMap;

  })(ObsMap);

  Depmap = rx.DepMap = (function(_super) {
    __extends(DepMap, _super);

    function DepMap(f) {
      this.f = f;
      DepMap.__super__.constructor.call(this);
      new DepCell(this.f).onSet.sub(function(_arg) {
        var k, old, v, val, _results;

        old = _arg[0], val = _arg[1];
        for (k in old) {
          v = old[k];
          if (!k in val) {
            this.realRemove(k);
          }
        }
        _results = [];
        for (k in val) {
          v = val[k];
          if (this.x[k] !== v) {
            _results.push(this.realPut(k, v));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      });
    }

    return DepMap;

  })(ObsMap);

  _.extend(rx, {
    cell: function(x) {
      return new SrcCell(x);
    },
    array: function(xs) {
      return new SrcArray(xs);
    },
    map: function(x) {
      return new SrcMap(x);
    },
    depCell: function(f) {
      return new DepCell(f);
    },
    lagDepCell: function(f, init) {
      return new DepCell(f, init, true);
    },
    depMap: function(f) {
      return new DepMap(f);
    },
    depArray: function(f) {
      return new DepArray(f);
    }
  });

  $.fn.rx = function(prop) {
    var checked, focused, map, val;

    map = this.data('rx-map');
    if (map == null) {
      this.data('rx-map', map = mkMap());
    }
    if (prop in map) {
      return map[prop];
    }
    return map[prop] = (function() {
      var _this = this;

      switch (prop) {
        case 'focused':
          focused = rx.cell(this.is(':focus'));
          this.focus(function() {
            return focused.set(true);
          });
          this.blur(function() {
            return focused.set(false);
          });
          return focused;
        case 'val':
          val = rx.cell(this.val());
          this.change(function() {
            return val.set(_this.val());
          });
          this.on('input', function() {
            return val.set(_this.val());
          });
          return val;
        case 'checked':
          checked = rx.cell(this.is(':checked'));
          this.change(function() {
            return checked.set(_this.is(':checked'));
          });
          return checked;
        default:
          throw 'Unknown reactive property type';
      }
    }).call(this);
  };

  if (typeof exports === 'undefined') {
    this.rxt = rxt = {};
  } else {
    rxt = exports;
  }

  RawHtml = rxt.RawHtml = (function() {
    function RawHtml(html) {
      this.html = html;
    }

    return RawHtml;

  })();

  events = ["blur", "change", "click", "dblclick", "error", "focus", "focusin", "focusout", "hover", "keydown", "keypress", "keyup", "load", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseout", "mouseover", "mouseup", "ready", "resize", "scroll", "select", "submit", "toggle", "unload"];

  specialAttrs = rxt.specialAttrs = {
    init: function(elt, fn) {
      return fn.call(elt);
    }
  };

  _fn = function(ev) {
    return specialAttrs[ev] = function(elt, fn) {
      return elt[ev](function(e) {
        return fn.call(elt, e);
      });
    };
  };
  for (_i = 0, _len = events.length; _i < _len; _i++) {
    ev = events[_i];
    _fn(ev);
  }

  rxt.mktag = mktag = function(tag) {
    return function(arg1, arg2) {
      var attrs, contents, elt, key, name, toNodes, updateContents, value, _ref4, _ref5;

      _ref4 = (arg1 == null) && (arg2 == null) ? [{}, null] : arg2 != null ? [arg1, arg2] : _.isString(arg1) || arg1 instanceof RawHtml || _.isArray(arg1) || arg1 instanceof ObsCell || arg1 instanceof ObsArray ? [{}, arg1] : [arg1, null], attrs = _ref4[0], contents = _ref4[1];
      elt = $("<" + tag + "/>");
      _ref5 = _.omit(attrs, _.keys(specialAttrs));
      for (name in _ref5) {
        value = _ref5[name];
        if (value instanceof ObsCell) {
          (function(name) {
            return value.onSet.sub(function(_arg) {
              var old, val;

              old = _arg[0], val = _arg[1];
              return elt.attr(name, val);
            });
          })(name);
        } else {
          elt.attr(name, value);
        }
      }
      if (contents != null) {
        toNodes = function(contents) {
          var child, parsed, _j, _len1, _results;

          _results = [];
          for (_j = 0, _len1 = contents.length; _j < _len1; _j++) {
            child = contents[_j];
            if (_.isString(child)) {
              _results.push(document.createTextNode(child));
            } else if (child instanceof RawHtml) {
              parsed = $(child.html);
              if (parsed.length) {
                throw 'Cannot insert RawHtml of multiple elements';
              }
              _results.push(parsed[0]);
            } else if (child instanceof $) {
              _results.push(child[0]);
            } else {
              throw 'Unknown element type in array: ' + child.constructor.name;
            }
          }
          return _results;
        };
        updateContents = function(contents) {
          elt.html('');
          if (_.isArray(contents)) {
            return elt.append(toNodes(contents));
          } else if (_.isString(contents) || contents instanceof RawHtml) {
            return updateContents([contents]);
          } else {
            throw 'Unknown type for contents: ' + contents.constructor.name;
          }
        };
        if (contents instanceof ObsArray) {
          contents.onChange.sub(function(_arg) {
            var added, index, removed, toAdd;

            index = _arg[0], removed = _arg[1], added = _arg[2];
            elt.contents().slice(index, index + removed.length).remove();
            toAdd = toNodes(added);
            if (index === elt.contents().length) {
              return elt.append(toAdd);
            } else {
              return elt.contents().eq(index).before(toAdd);
            }
          });
        } else if (contents instanceof ObsCell) {
          contents.onSet.sub(function(_arg) {
            var old, val;

            old = _arg[0], val = _arg[1];
            return updateContents(val);
          });
        } else {
          updateContents(contents);
        }
      }
      for (key in attrs) {
        if (key in specialAttrs) {
          specialAttrs[key](elt, attrs[key], attrs, contents);
        }
      }
      return elt;
    };
  };

  tags = ['html', 'head', 'title', 'base', 'link', 'meta', 'style', 'script', 'noscript', 'body', 'body', 'section', 'nav', 'article', 'aside', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h1', 'h6', 'header', 'footer', 'address', 'main', 'main', 'p', 'hr', 'pre', 'blockquote', 'ol', 'ul', 'li', 'dl', 'dt', 'dd', 'dd', 'figure', 'figcaption', 'div', 'a', 'em', 'strong', 'small', 's', 'cite', 'q', 'dfn', 'abbr', 'data', 'time', 'code', 'var', 'samp', 'kbd', 'sub', 'sup', 'i', 'b', 'u', 'mark', 'ruby', 'rt', 'rp', 'bdi', 'bdo', 'span', 'br', 'wbr', 'ins', 'del', 'img', 'iframe', 'embed', 'object', 'param', 'object', 'video', 'audio', 'source', 'video', 'audio', 'track', 'video', 'audio', 'canvas', 'map', 'area', 'area', 'map', 'svg', 'math', 'table', 'caption', 'colgroup', 'col', 'tbody', 'thead', 'tfoot', 'tr', 'td', 'th', 'form', 'fieldset', 'legend', 'fieldset', 'label', 'input', 'button', 'select', 'datalist', 'optgroup', 'option', 'select', 'datalist', 'textarea', 'keygen', 'output', 'progress', 'meter', 'details', 'summary', 'details', 'menuitem', 'menu'];

  rxt.tags = _.object((function() {
    var _j, _len1, _results;

    _results = [];
    for (_j = 0, _len1 = tags.length; _j < _len1; _j++) {
      tag = tags[_j];
      _results.push([tag, rxt.mktag(tag)]);
    }
    return _results;
  })());

  rxt.rawHtml = function(html) {
    return new RawHtml(html);
  };

  rxt.importTags = function(x) {
    return _(x != null ? x : _this).extend(rxt.tags);
  };

}).call(this);
