(function() {
  var rxFactory,
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  rxFactory = function(_, _str, $) {
    var DepArray, DepCell, DepMap, DepMgr, Ev, FakeObsCell, FakeSrcCell, IndexedArray, IndexedDepArray, IndexedMappedDepArray, MappedDepArray, ObsArray, ObsCell, ObsMap, ObsMapEntryCell, RawHtml, Recorder, SrcArray, SrcCell, SrcMap, SrcMapEntryCell, asyncBind, bind, depMgr, ev, events, firstWhere, flatten, lagBind, mkAtts, mkMap, mktag, mkuid, nextUid, nthWhere, permToSplices, popKey, postLagBind, prop, propSet, props, recorder, rx, rxt, setDynProp, setProp, specialAttrs, sum, tag, tags, _fn, _i, _len, _ref, _ref1, _ref2, _ref3, _ref4,
      _this = this;

    rx = {};
    nextUid = 0;
    mkuid = function() {
      return nextUid += 1;
    };
    popKey = function(x, k) {
      var v;

      if (!(k in x)) {
        throw new Error('object has no key ' + k);
      }
      v = x[k];
      delete x[k];
      return v;
    };
    nthWhere = function(xs, n, f) {
      var i, x, _i, _len;

      for (i = _i = 0, _len = xs.length; _i < _len; i = ++_i) {
        x = xs[i];
        if (f(x) && (n -= 1) < 0) {
          return [x, i];
        }
      }
      return [null, -1];
    };
    firstWhere = function(xs, f) {
      return nthWhere(xs, 0, f);
    };
    mkMap = function(xs) {
      var k, map, v, _i, _len, _ref;

      if (xs == null) {
        xs = [];
      }
      map = Object.create != null ? Object.create(null) : {};
      if (_.isArray(xs)) {
        for (_i = 0, _len = xs.length; _i < _len; _i++) {
          _ref = xs[_i], k = _ref[0], v = _ref[1];
          map[k] = v;
        }
      } else {
        for (k in xs) {
          v = xs[k];
          map[k] = v;
        }
      }
      return map;
    };
    sum = function(xs) {
      var n, x, _i, _len;

      n = 0;
      for (_i = 0, _len = xs.length; _i < _len; _i++) {
        x = xs[_i];
        n += x;
      }
      return n;
    };
    DepMgr = rx.DepMgr = (function() {
      function DepMgr() {
        this.uid2src = {};
        this.buffering = 0;
        this.buffer = [];
      }

      DepMgr.prototype.sub = function(uid, src) {
        return this.uid2src[uid] = src;
      };

      DepMgr.prototype.unsub = function(uid) {
        return popKey(this.uid2src, uid);
      };

      DepMgr.prototype.transaction = function(f) {
        var b, res, _i, _len, _ref;

        this.buffering += 1;
        try {
          res = f();
        } finally {
          this.buffering -= 1;
          if (this.buffering === 0) {
            _ref = this.buffer;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              b = _ref[_i];
              b();
            }
            this.buffer = [];
          }
        }
        return res;
      };

      return DepMgr;

    })();
    rx._depMgr = depMgr = new DepMgr();
    Ev = rx.Ev = (function() {
      function Ev(inits) {
        this.inits = inits;
        this.subs = mkMap();
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
        var listener, uid, _ref, _results,
          _this = this;

        if (depMgr.buffering) {
          return depMgr.buffer.push(function() {
            return _this.pub(data);
          });
        } else {
          _ref = this.subs;
          _results = [];
          for (uid in _ref) {
            listener = _ref[uid];
            _results.push(listener(data));
          }
          return _results;
        }
      };

      Ev.prototype.unsub = function(uid) {
        popKey(this.subs, uid);
        return depMgr.unsub(uid, this);
      };

      Ev.prototype.scoped = function(listener, context) {
        var uid;

        uid = this.sub(listener);
        try {
          return context();
        } finally {
          this.unsub(uid);
        }
      };

      return Ev;

    })();
    rx.skipFirst = function(f) {
      var first;

      first = true;
      return function() {
        var args;

        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        if (first) {
          return first = false;
        } else {
          return f.apply(null, args);
        }
      };
    };
    Recorder = rx.Recorder = (function() {
      function Recorder() {
        this.stack = [];
        this.isMutating = false;
        this.isIgnoring = false;
        this.onMutationWarning = new Ev();
      }

      Recorder.prototype.record = function(dep, f) {
        var wasIgnoring, wasMutating;

        if (this.stack.length > 0 && !this.isMutating) {
          _(this.stack).last().addNestedBind(dep);
        }
        this.stack.push(dep);
        wasMutating = this.isMutating;
        this.isMutating = false;
        wasIgnoring = this.isIgnoring;
        this.isIgnoring = false;
        try {
          return f();
        } finally {
          this.isIgnoring = wasIgnoring;
          this.isMutating = wasMutating;
          this.stack.pop();
        }
      };

      Recorder.prototype.sub = function(sub) {
        var handle, topCell;

        if (this.stack.length > 0 && !this.isIgnoring) {
          topCell = _(this.stack).last();
          return handle = sub(topCell);
        }
      };

      Recorder.prototype.addCleanup = function(cleanup) {
        if (this.stack.length > 0) {
          return _(this.stack).last().addCleanup(cleanup);
        }
      };

      Recorder.prototype.mutating = function(f) {
        var wasMutating;

        if (this.stack.length > 0) {
          console.warn('Mutation to observable detected during a bind context');
          this.onMutationWarning.pub(null);
        }
        wasMutating = this.isMutating;
        this.isMutating = true;
        try {
          return f();
        } finally {
          this.isMutating = wasMutating;
        }
      };

      Recorder.prototype.ignoring = function(f) {
        var wasIgnoring;

        wasIgnoring = this.isIgnoring;
        this.isIgnoring = true;
        try {
          return f();
        } finally {
          this.isIgnoring = wasIgnoring;
        }
      };

      return Recorder;

    })();
    rx._recorder = recorder = new Recorder();
    rx.asyncBind = asyncBind = function(init, f) {
      var dep;

      dep = new DepCell(f, init);
      dep.refresh();
      return dep;
    };
    rx.bind = bind = function(f) {
      return asyncBind(null, function() {
        return this.done(this.record(f));
      });
    };
    rx.lagBind = lagBind = function(lag, init, f) {
      var timeout;

      timeout = null;
      return asyncBind(init, function() {
        var _this = this;

        if (timeout != null) {
          clearTimeout(timeout);
        }
        return timeout = setTimeout(function() {
          return _this.done(_this.record(f));
        }, lag);
      });
    };
    rx.postLagBind = postLagBind = function(init, f) {
      var timeout;

      timeout = null;
      return asyncBind(init, function() {
        var ms, val, _ref,
          _this = this;

        _ref = this.record(f), val = _ref.val, ms = _ref.ms;
        if (timeout != null) {
          clearTimeout(timeout);
        }
        return timeout = setTimeout((function() {
          return _this.done(val);
        }), ms);
      });
    };
    rx.snap = function(f) {
      return recorder.ignoring(f);
    };
    rx.onDispose = function(cleanup) {
      return recorder.addCleanup(cleanup);
    };
    rx.autoSub = function(ev, listener) {
      var subid;

      subid = ev.sub(listener);
      rx.onDispose(function() {
        return ev.unsub(subid);
      });
      return subid;
    };
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
          return rx.autoSub(_this.onSet, function() {
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
        var _this = this;

        return recorder.mutating(function() {
          var old;

          if (_this.x !== x) {
            old = _this.x;
            _this.x = x;
            _this.onSet.pub([old, x]);
            return old;
          }
        });
      };

      return SrcCell;

    })(ObsCell);
    DepCell = rx.DepCell = (function(_super) {
      __extends(DepCell, _super);

      function DepCell(body, init) {
        this.body = body;
        DepCell.__super__.constructor.call(this, init != null ? init : null);
        this.refreshing = false;
        this.nestedBinds = [];
        this.cleanups = [];
      }

      DepCell.prototype.refresh = function() {
        var env, isSynchronous, old, realDone, syncResult,
          _this = this;

        if (!this.refreshing) {
          old = this.x;
          realDone = function(x) {
            _this.x = x;
            return _this.onSet.pub([old, _this.x]);
          };
          ({
            recorded: false
          });
          syncResult = null;
          isSynchronous = false;
          env = {
            record: function(f) {
              var recorded, res;

              if (!_this.refreshing) {
                _this.disconnect();
                if (recorded) {
                  throw new Error('this refresh has already recorded its dependencies');
                }
                _this.refreshing = true;
                recorded = true;
                try {
                  res = recorder.record(_this, function() {
                    return f.call(env);
                  });
                } finally {
                  _this.refreshing = false;
                }
                if (isSynchronous) {
                  realDone(syncResult);
                }
                return res;
              }
            },
            done: function(x) {
              if (old !== x) {
                if (_this.refreshing) {
                  isSynchronous = true;
                  return syncResult = x;
                } else {
                  return realDone(x);
                }
              }
            }
          };
          return this.body.call(env);
        }
      };

      DepCell.prototype.disconnect = function() {
        var cleanup, nestedBind, _i, _j, _len, _len1, _ref1, _ref2;

        _ref1 = this.cleanups;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          cleanup = _ref1[_i];
          cleanup();
        }
        _ref2 = this.nestedBinds;
        for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
          nestedBind = _ref2[_j];
          nestedBind.disconnect();
        }
        this.nestedBinds = [];
        return this.cleanups = [];
      };

      DepCell.prototype.addNestedBind = function(nestedBind) {
        return this.nestedBinds.push(nestedBind);
      };

      DepCell.prototype.addCleanup = function(cleanup) {
        return this.cleanups.push(cleanup);
      };

      return DepCell;

    })(ObsCell);
    ObsArray = rx.ObsArray = (function() {
      function ObsArray(xs, diff) {
        var _this = this;

        this.xs = xs != null ? xs : [];
        this.diff = diff != null ? diff : rx.basicDiff();
        this.onChange = new Ev(function() {
          return [[0, [], _this.xs]];
        });
        this.indexed_ = null;
      }

      ObsArray.prototype.all = function() {
        var _this = this;

        recorder.sub(function(target) {
          return rx.autoSub(_this.onChange, function() {
            return target.refresh();
          });
        });
        return _.clone(this.xs);
      };

      ObsArray.prototype.raw = function() {
        var _this = this;

        recorder.sub(function(target) {
          return rx.autoSub(_this.onChange, function() {
            return target.refresh();
          });
        });
        return this.xs;
      };

      ObsArray.prototype.at = function(i) {
        var _this = this;

        recorder.sub(function(target) {
          return rx.autoSub(_this.onChange, function(_arg) {
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
          return rx.autoSub(_this.onChange, function(_arg) {
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
        rx.autoSub(this.onChange, function(_arg) {
          var added, index, removed;

          index = _arg[0], removed = _arg[1], added = _arg[2];
          return ys.realSplice(index, removed.length, added.map(f));
        });
        return ys;
      };

      ObsArray.prototype.indexed = function() {
        var _this = this;

        if (this.indexed_ == null) {
          this.indexed_ = new IndexedDepArray();
          rx.autoSub(this.onChange, function(_arg) {
            var added, index, removed;

            index = _arg[0], removed = _arg[1], added = _arg[2];
            return _this.indexed_.realSplice(index, removed.length, added);
          });
        }
        return this.indexed_;
      };

      ObsArray.prototype.concat = function(that) {
        return rx.concat(this, that);
      };

      ObsArray.prototype.realSplice = function(index, count, additions) {
        var removed;

        removed = this.xs.splice.apply(this.xs, [index, count].concat(additions));
        return this.onChange.pub([index, removed, additions]);
      };

      ObsArray.prototype._update = function(val, diff) {
        var additions, count, fullSplice, index, old, splice, splices, x, _i, _len, _ref1, _results;

        if (diff == null) {
          diff = this.diff;
        }
        old = this.xs;
        fullSplice = [0, old.length, val];
        x = null;
        splices = diff != null ? (_ref1 = permToSplices(old.length, val, diff(old, val))) != null ? _ref1 : [fullSplice] : [fullSplice];
        _results = [];
        for (_i = 0, _len = splices.length; _i < _len; _i++) {
          splice = splices[_i];
          index = splice[0], count = splice[1], additions = splice[2];
          _results.push(this.realSplice(index, count, additions));
        }
        return _results;
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
        var _this = this;

        return recorder.mutating(function() {
          return _this.realSplice(index, count, additions);
        });
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
        var i;

        i = _(this.raw()).indexOf(x);
        if (i >= 0) {
          return this.removeAt(i);
        }
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

      SrcArray.prototype.update = function(xs) {
        var _this = this;

        return recorder.mutating(function() {
          return _this._update(xs);
        });
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
    IndexedDepArray = rx.IndexedDepArray = (function(_super) {
      __extends(IndexedDepArray, _super);

      function IndexedDepArray(xs, diff) {
        var i, x,
          _this = this;

        if (xs == null) {
          xs = [];
        }
        IndexedDepArray.__super__.constructor.call(this, xs, diff);
        this.is = (function() {
          var _i, _len, _ref3, _results;

          _ref3 = this.xs;
          _results = [];
          for (i = _i = 0, _len = _ref3.length; _i < _len; i = ++_i) {
            x = _ref3[i];
            _results.push(rx.cell(i));
          }
          return _results;
        }).call(this);
        this.onChange = new Ev(function() {
          return [[0, [], _.zip(_this.xs, _this.is)]];
        });
      }

      IndexedDepArray.prototype.map = function(f) {
        var ys;

        ys = new IndexedMappedDepArray();
        rx.autoSub(this.onChange, function(_arg) {
          var a, added, i, index, removed;

          index = _arg[0], removed = _arg[1], added = _arg[2];
          return ys.realSplice(index, removed.length, (function() {
            var _i, _len, _ref3, _results;

            _results = [];
            for (_i = 0, _len = added.length; _i < _len; _i++) {
              _ref3 = added[_i], a = _ref3[0], i = _ref3[1];
              _results.push(f(a, i));
            }
            return _results;
          })());
        });
        return ys;
      };

      IndexedDepArray.prototype.realSplice = function(index, count, additions) {
        var i, newIs, offset, removed, _i, _len, _ref3, _ref4, _ref5;

        removed = (_ref3 = this.xs).splice.apply(_ref3, [index, count].concat(__slice.call(additions)));
        _ref4 = this.is.slice(index + count);
        for (offset = _i = 0, _len = _ref4.length; _i < _len; offset = ++_i) {
          i = _ref4[offset];
          i.set(index + additions.length + offset);
        }
        newIs = (function() {
          var _j, _ref5, _results;

          _results = [];
          for (i = _j = 0, _ref5 = additions.length; 0 <= _ref5 ? _j < _ref5 : _j > _ref5; i = 0 <= _ref5 ? ++_j : --_j) {
            _results.push(rx.cell(index + i));
          }
          return _results;
        })();
        (_ref5 = this.is).splice.apply(_ref5, [index, count].concat(__slice.call(newIs)));
        return this.onChange.pub([index, removed, _.zip(additions, newIs)]);
      };

      return IndexedDepArray;

    })(ObsArray);
    IndexedMappedDepArray = rx.IndexedMappedDepArray = (function(_super) {
      __extends(IndexedMappedDepArray, _super);

      function IndexedMappedDepArray() {
        _ref3 = IndexedMappedDepArray.__super__.constructor.apply(this, arguments);
        return _ref3;
      }

      return IndexedMappedDepArray;

    })(IndexedDepArray);
    DepArray = rx.DepArray = (function(_super) {
      __extends(DepArray, _super);

      function DepArray(f, diff) {
        var _this = this;

        this.f = f;
        DepArray.__super__.constructor.call(this, [], diff);
        rx.autoSub((bind(function() {
          return _this.f();
        })).onSet, function(_arg) {
          var old, val;

          old = _arg[0], val = _arg[1];
          return _this._update(val);
        });
      }

      return DepArray;

    })(ObsArray);
    IndexedArray = rx.IndexedArray = (function(_super) {
      __extends(IndexedArray, _super);

      function IndexedArray(xs) {
        this.xs = xs;
      }

      IndexedArray.prototype.map = function(f) {
        var ys;

        ys = new MappedDepArray();
        rx.autoSub(this.xs.onChange, function(_arg) {
          var added, index, removed;

          index = _arg[0], removed = _arg[1], added = _arg[2];
          return ys.realSplice(index, removed.length, added.map(f));
        });
        return ys;
      };

      return IndexedArray;

    })(DepArray);
    rx.concat = function() {
      var repLens, xs, xss, ys;

      xss = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      ys = new MappedDepArray();
      repLens = (function() {
        var _i, _len, _results;

        _results = [];
        for (_i = 0, _len = xss.length; _i < _len; _i++) {
          xs = xss[_i];
          _results.push(0);
        }
        return _results;
      })();
      xss.map(function(xs, i) {
        return rx.autoSub(xs.onChange, function(_arg) {
          var added, index, removed, xsOffset;

          index = _arg[0], removed = _arg[1], added = _arg[2];
          xsOffset = sum(repLens.slice(0, i));
          repLens[i] += added.length - removed.length;
          return ys.realSplice(xsOffset + index, removed.length, added);
        });
      });
      return ys;
    };
    FakeSrcCell = rx.FakeSrcCell = (function(_super) {
      __extends(FakeSrcCell, _super);

      function FakeSrcCell(_getter, _setter) {
        this._getter = _getter;
        this._setter = _setter;
      }

      FakeSrcCell.prototype.get = function() {
        return this._getter();
      };

      FakeSrcCell.prototype.set = function(x) {
        return this._setter(x);
      };

      return FakeSrcCell;

    })(SrcCell);
    FakeObsCell = rx.FakeObsCell = (function(_super) {
      __extends(FakeObsCell, _super);

      function FakeObsCell(_getter) {
        this._getter = _getter;
      }

      FakeObsCell.prototype.get = function() {
        return this._getter();
      };

      return FakeObsCell;

    })(ObsCell);
    SrcMapEntryCell = rx.MapEntryCell = (function(_super) {
      __extends(MapEntryCell, _super);

      function MapEntryCell(_map, _key) {
        this._map = _map;
        this._key = _key;
      }

      MapEntryCell.prototype.get = function() {
        return this._map.get(this._key);
      };

      MapEntryCell.prototype.set = function(x) {
        return this._map.put(this._key, x);
      };

      return MapEntryCell;

    })(FakeSrcCell);
    ObsMapEntryCell = rx.ObsMapEntryCell = (function(_super) {
      __extends(ObsMapEntryCell, _super);

      function ObsMapEntryCell(_map, _key) {
        this._map = _map;
        this._key = _key;
      }

      ObsMapEntryCell.prototype.get = function() {
        return this._map.get(this._key);
      };

      return ObsMapEntryCell;

    })(FakeObsCell);
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
          return rx.autoSub(_this.onAdd, function(_arg) {
            var subkey, val;

            subkey = _arg[0], val = _arg[1];
            if (key === subkey) {
              return target.refresh();
            }
          });
        });
        recorder.sub(function(target) {
          return rx.autoSub(_this.onChange, function(_arg) {
            var old, subkey, val;

            subkey = _arg[0], old = _arg[1], val = _arg[2];
            if (key === subkey) {
              return target.refresh();
            }
          });
        });
        recorder.sub(function(target) {
          return rx.autoSub(_this.onRemove, function(_arg) {
            var old, subkey;

            subkey = _arg[0], old = _arg[1];
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
          return rx.autoSub(_this.onAdd, function() {
            return target.refresh();
          });
        });
        recorder.sub(function(target) {
          return rx.autoSub(_this.onChange, function() {
            return target.refresh();
          });
        });
        recorder.sub(function(target) {
          return rx.autoSub(_this.onRemove, function() {
            return target.refresh();
          });
        });
        return _.clone(this.x);
      };

      ObsMap.prototype.realPut = function(key, val) {
        var old;

        if (key in this.x) {
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

      ObsMap.prototype.cell = function(key) {
        return new ObsMapEntryCell(this, key);
      };

      return ObsMap;

    })();
    SrcMap = rx.SrcMap = (function(_super) {
      __extends(SrcMap, _super);

      function SrcMap() {
        _ref4 = SrcMap.__super__.constructor.apply(this, arguments);
        return _ref4;
      }

      SrcMap.prototype.put = function(key, val) {
        var _this = this;

        return recorder.mutating(function() {
          return _this.realPut(key, val);
        });
      };

      SrcMap.prototype.remove = function(key) {
        var _this = this;

        return recorder.mutating(function() {
          return _this.realRemove(key);
        });
      };

      SrcMap.prototype.cell = function(key) {
        return new SrcMapEntryCell(this, key);
      };

      return SrcMap;

    })(ObsMap);
    DepMap = rx.DepMap = (function(_super) {
      __extends(DepMap, _super);

      function DepMap(f) {
        this.f = f;
        DepMap.__super__.constructor.call(this);
        rx.autoSub(new DepCell(this.f).onSet, function(_arg) {
          var k, old, v, val, _results;

          old = _arg[0], val = _arg[1];
          for (k in old) {
            v = old[k];
            if (!(k in val)) {
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
    rx.liftSpec = function(obj) {
      var name, type, val;

      return _.object((function() {
        var _i, _len, _ref5, _results;

        _ref5 = Object.getOwnPropertyNames(obj);
        _results = [];
        for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
          name = _ref5[_i];
          val = obj[name];
          if ((val != null) && (val instanceof rx.ObsMap || val instanceof rx.ObsCell || val instanceof rx.ObsArray)) {
            continue;
          }
          type = _.isFunction(val) ? null : _.isArray(val) ? 'array' : 'cell';
          _results.push([
            name, {
              type: type,
              val: val
            }
          ]);
        }
        return _results;
      })());
    };
    rx.lift = function(x, fieldspec) {
      var name, spec;

      if (fieldspec == null) {
        fieldspec = rx.liftSpec(x);
      }
      for (name in fieldspec) {
        spec = fieldspec[name];
        x[name] = (function() {
          switch (spec.type) {
            case 'cell':
              return rx.cell(x[name]);
            case 'array':
              return rx.array(x[name]);
            case 'map':
              return rx.map(x[name]);
            default:
              return x[name];
          }
        })();
      }
      return x;
    };
    rx.unlift = function(x) {
      var k, v;

      return _.object((function() {
        var _results;

        _results = [];
        for (k in x) {
          v = x[k];
          _results.push([k, v instanceof rx.ObsCell ? v.get() : v instanceof rx.ObsArray ? v.all() : v]);
        }
        return _results;
      })());
    };
    rx.reactify = function(obj, fieldspec) {
      var arr, methName, name, spec;

      if (_.isArray(obj)) {
        arr = rx.array(_.clone(obj));
        Object.defineProperties(obj, _.object((function() {
          var _i, _len, _ref5, _results;

          _ref5 = _.functions(arr);
          _results = [];
          for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
            methName = _ref5[_i];
            if (methName !== 'length') {
              _results.push((function(methName) {
                var meth, newMeth, spec;

                meth = obj[methName];
                newMeth = function() {
                  var args, res, _ref6;

                  args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
                  if (meth != null) {
                    res = meth.call.apply(meth, [obj].concat(__slice.call(args)));
                  }
                  (_ref6 = arr[methName]).call.apply(_ref6, [arr].concat(__slice.call(args)));
                  return res;
                };
                spec = {
                  configurable: true,
                  enumerable: false,
                  value: newMeth,
                  writable: true
                };
                return [methName, spec];
              })(methName));
            }
          }
          return _results;
        })()));
        return obj;
      } else {
        return Object.defineProperties(obj, _.object((function() {
          var _results;

          _results = [];
          for (name in fieldspec) {
            spec = fieldspec[name];
            _results.push((function(name, spec) {
              var desc, obs, view, _ref5, _ref6;

              desc = null;
              switch (spec.type) {
                case 'cell':
                  obs = rx.cell((_ref5 = spec.val) != null ? _ref5 : null);
                  desc = {
                    configurable: true,
                    enumerable: true,
                    get: function() {
                      return obs.get();
                    },
                    set: function(x) {
                      return obs.set(x);
                    }
                  };
                  break;
                case 'array':
                  view = rx.reactify((_ref6 = spec.val) != null ? _ref6 : []);
                  desc = {
                    configurable: true,
                    enumerable: true,
                    get: function() {
                      view.raw();
                      return view;
                    },
                    set: function(x) {
                      view.splice.apply(view, [0, view.length].concat(__slice.call(x)));
                      return view;
                    }
                  };
                  break;
                default:
                  throw new Error("Unknown observable type: " + type);
              }
              return [name, desc];
            })(name, spec));
          }
          return _results;
        })()));
      }
    };
    rx.autoReactify = function(obj) {
      var name, type, val;

      return rx.reactify(obj, _.object((function() {
        var _i, _len, _ref5, _results;

        _ref5 = Object.getOwnPropertyNames(obj);
        _results = [];
        for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
          name = _ref5[_i];
          val = obj[name];
          if (val instanceof ObsMap || val instanceof ObsCell || val instanceof ObsArray) {
            continue;
          }
          type = _.isFunction(val) ? null : _.isArray(val) ? 'array' : 'cell';
          _results.push([
            name, {
              type: type,
              val: val
            }
          ]);
        }
        return _results;
      })()));
    };
    _.extend(rx, {
      cell: function(x) {
        return new SrcCell(x);
      },
      array: function(xs, diff) {
        return new SrcArray(xs, diff);
      },
      map: function(x) {
        return new SrcMap(x);
      }
    });
    rx.flatten = function(xs) {
      return new DepArray(function() {
        var x;

        return _((function() {
          var _i, _len, _results;

          _results = [];
          for (_i = 0, _len = xs.length; _i < _len; _i++) {
            x = xs[_i];
            if (x instanceof ObsArray) {
              _results.push(x.raw());
            } else if (x instanceof ObsCell) {
              _results.push(x.get());
            } else {
              _results.push(x);
            }
          }
          return _results;
        })()).chain().flatten(true).filter(function(x) {
          return x != null;
        }).value();
      });
    };
    flatten = function(xss) {
      var xs;

      xs = _.flatten(xss);
      return rx.cellToArray(bind(function() {
        return _.flatten(xss);
      }));
    };
    rx.cellToArray = function(cell, diff) {
      return new DepArray((function() {
        return cell.get();
      }), diff);
    };
    rx.basicDiff = function(key) {
      if (key == null) {
        key = rx.smartUidify;
      }
      return function(oldXs, newXs) {
        var i, oldKeys, x, _i, _len, _ref5, _results;

        oldKeys = mkMap((function() {
          var _i, _len, _results;

          _results = [];
          for (i = _i = 0, _len = oldXs.length; _i < _len; i = ++_i) {
            x = oldXs[i];
            _results.push([key(x), i]);
          }
          return _results;
        })());
        _results = [];
        for (_i = 0, _len = newXs.length; _i < _len; _i++) {
          x = newXs[_i];
          _results.push((_ref5 = oldKeys[key(x)]) != null ? _ref5 : -1);
        }
        return _results;
      };
    };
    rx.uidify = function(x) {
      var _ref5;

      return (_ref5 = x.__rxUid) != null ? _ref5 : (Object.defineProperty(x, '__rxUid', {
        enumerable: false,
        value: mkuid()
      })).__rxUid;
    };
    rx.smartUidify = function(x) {
      if (_.isObject(x)) {
        return rx.uidify(x);
      } else {
        return JSON.stringify(x);
      }
    };
    permToSplices = function(oldLength, newXs, perm) {
      var cur, i, last, refs, splice, splices;

      refs = (function() {
        var _i, _len, _results;

        _results = [];
        for (_i = 0, _len = perm.length; _i < _len; _i++) {
          i = perm[_i];
          if (i >= 0) {
            _results.push(i);
          }
        }
        return _results;
      })();
      if (_.some((function() {
        var _i, _ref5, _results;

        _results = [];
        for (i = _i = 0, _ref5 = refs.length - 1; 0 <= _ref5 ? _i < _ref5 : _i > _ref5; i = 0 <= _ref5 ? ++_i : --_i) {
          _results.push(refs[i + 1] - refs[i] <= 0);
        }
        return _results;
      })())) {
        return null;
      }
      splices = [];
      last = -1;
      i = 0;
      while (i < perm.length) {
        while (i < perm.length && perm[i] === last + 1) {
          last += 1;
          i += 1;
        }
        splice = {
          index: i,
          count: 0,
          additions: []
        };
        while (i < perm.length && perm[i] === -1) {
          splice.additions.push(newXs[i]);
          i += 1;
        }
        cur = i === perm.length ? oldLength : perm[i];
        splice.count = cur - (last + 1);
        if (splice.count > 0 || splice.additions.length > 0) {
          splices.push([splice.index, splice.count, splice.additions]);
        }
        last = cur;
        i += 1;
      }
      return splices;
    };
    rx.transaction = function(f) {
      return depMgr.transaction(f);
    };
    if ($ != null) {
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
              throw new Error('Unknown reactive property type');
          }
        }).call(this);
      };
      rxt = {};
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
      props = ['async', 'autofocus', 'checked', 'location', 'multiple', 'readOnly', 'selected', 'selectedIndex', 'tagName', 'nodeName', 'nodeType', 'ownerDocument', 'defaultChecked', 'defaultSelected'];
      propSet = _.object((function() {
        var _j, _len1, _results;

        _results = [];
        for (_j = 0, _len1 = props.length; _j < _len1; _j++) {
          prop = props[_j];
          _results.push([prop, null]);
        }
        return _results;
      })());
      setProp = function(elt, prop, val) {
        if (prop === 'value') {
          return elt.val(val);
        } else if (prop in propSet) {
          return elt.prop(prop, val);
        } else {
          return elt.attr(prop, val);
        }
      };
      setDynProp = function(elt, prop, val, xform) {
        if (xform == null) {
          xform = _.identity;
        }
        if (val instanceof ObsCell) {
          return rx.autoSub(val.onSet, function(_arg) {
            var n, o;

            o = _arg[0], n = _arg[1];
            return setProp(elt, prop, xform(n));
          });
        } else {
          return setProp(elt, prop, xform(val));
        }
      };
      rxt.mkAtts = mkAtts = function(attstr) {
        return (function(atts) {
          var cls, match;

          match = attstr.match(/[#](\w+)/);
          if (match) {
            atts.id = match[1];
          }
          atts["class"] = ((function() {
            var _j, _len1, _ref5, _results;

            _ref5 = attstr.match(/\.\w+/g);
            _results = [];
            for (_j = 0, _len1 = _ref5.length; _j < _len1; _j++) {
              cls = _ref5[_j];
              _results.push(cls.replace(/^\./, ''));
            }
            return _results;
          })()).join(' ');
          return atts;
        })({});
      };
      rxt.mktag = mktag = function(tag) {
        return function(arg1, arg2) {
          var attrs, contents, elt, key, name, toNodes, updateContents, value, _ref5, _ref6;

          _ref5 = (arg1 == null) && (arg2 == null) ? [{}, null] : arg1 instanceof Object && (arg2 != null) ? [arg1, arg2] : _.isString(arg1) && (arg2 != null) ? [mkAtts(arg1), arg2] : (arg2 == null) && _.isString(arg1) || arg1 instanceof Element || arg1 instanceof RawHtml || arg1 instanceof $ || _.isArray(arg1) || arg1 instanceof ObsCell || arg1 instanceof ObsArray ? [{}, arg1] : [arg1, null], attrs = _ref5[0], contents = _ref5[1];
          elt = $("<" + tag + "/>");
          _ref6 = _.omit(attrs, _.keys(specialAttrs));
          for (name in _ref6) {
            value = _ref6[name];
            setDynProp(elt, name, value);
          }
          if (contents != null) {
            toNodes = function(contents) {
              var child, parsed, _j, _len1, _results;

              _results = [];
              for (_j = 0, _len1 = contents.length; _j < _len1; _j++) {
                child = contents[_j];
                if (_.isString(child)) {
                  _results.push(document.createTextNode(child));
                } else if (child instanceof Element) {
                  _results.push(child);
                } else if (child instanceof RawHtml) {
                  parsed = $(child.html);
                  if (parsed.length !== 1) {
                    throw new Error('RawHtml must wrap a single element');
                  }
                  _results.push(parsed[0]);
                } else if (child instanceof $) {
                  if (child.length !== 1) {
                    throw new Error('jQuery object must wrap a single element');
                  }
                  _results.push(child[0]);
                } else {
                  throw new Error("Unknown element type in array: " + child.constructor.name + " (must be string, Element, RawHtml, or jQuery objects)");
                }
              }
              return _results;
            };
            updateContents = function(contents) {
              var covers, hasWidth, left, node, nodes, top;

              elt.html('');
              if (_.isArray(contents)) {
                nodes = toNodes(contents);
                elt.append(nodes);
                if (false) {
                  hasWidth = function(node) {
                    var e;

                    try {
                      return ($(node).width() != null) !== 0;
                    } catch (_error) {
                      e = _error;
                      return false;
                    }
                  };
                  covers = (function() {
                    var _j, _len1, _ref7, _ref8, _results;

                    _ref7 = nodes != null ? nodes : [];
                    _results = [];
                    for (_j = 0, _len1 = _ref7.length; _j < _len1; _j++) {
                      node = _ref7[_j];
                      if (!(hasWidth(node))) {
                        continue;
                      }
                      _ref8 = $(node).offset(), left = _ref8.left, top = _ref8.top;
                      _results.push($('<div/>').appendTo($('body').first()).addClass('updated-element').offset({
                        top: top,
                        left: left
                      }).width($(node).width()).height($(node).height()));
                    }
                    return _results;
                  })();
                  return setTimeout((function() {
                    var cover, _j, _len1, _results;

                    _results = [];
                    for (_j = 0, _len1 = covers.length; _j < _len1; _j++) {
                      cover = covers[_j];
                      _results.push($(cover).remove());
                    }
                    return _results;
                  }), 2000);
                }
              } else if (_.isString(contents) || contents instanceof Element || contents instanceof RawHtml || contents instanceof $) {
                return updateContents([contents]);
              } else {
                throw new Error("Unknown type for element contents: " + contents.constructor.name + " (accepted types: string, Element, RawHtml, jQuery object of single element, or array of the aforementioned)");
              }
            };
            if (contents instanceof ObsArray) {
              rx.autoSub(contents.onChange, function(_arg) {
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
              rx.autoSub(contents.onSet, function(_arg) {
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
      rxt.cast = function(opts, types) {
        var key, newval, value;

        return _.object((function() {
          var _results;

          _results = [];
          for (key in opts) {
            value = opts[key];
            newval = (function() {
              switch (types[key]) {
                case 'array':
                  if (value instanceof rx.ObsArray) {
                    return value;
                  } else if (_.isArray(value)) {
                    return new rx.DepArray(function() {
                      return value;
                    });
                  } else if (value instanceof rx.ObsCell) {
                    return new rx.DepArray(function() {
                      return value.get();
                    });
                  } else {
                    throw new Error('Cannot cast to array: ' + value.constructor.name);
                  }
                  break;
                case 'cell':
                  if (value instanceof rx.ObsCell) {
                    return value;
                  } else {
                    return bind(function() {
                      return value;
                    });
                  }
                  break;
                default:
                  return value;
              }
            })();
            _results.push([key, newval]);
          }
          return _results;
        })());
      };
      rxt.cssify = function(map) {
        var k, v;

        return ((function() {
          var _results;

          _results = [];
          for (k in map) {
            v = map[k];
            if (v != null) {
              _results.push("" + (_.str.dasherize(k)) + ": " + (_.isNumber(v) ? v + 'px' : v) + ";");
            }
          }
          return _results;
        })()).join(' ');
      };
      specialAttrs.style = function(elt, value) {
        return setDynProp(elt, 'style', value, function(val) {
          if (_.isString(val)) {
            return val;
          } else {
            return rxt.cssify(val);
          }
        });
      };
      rxt.smushClasses = function(xs) {
        return _(xs).chain().flatten().compact().value().join(' ').replace(/\s+/, ' ').trim();
      };
      specialAttrs["class"] = function(elt, value) {
        return setDynProp(elt, 'class', value, function(val) {
          if (_.isString(val)) {
            return val;
          } else {
            return rxt.smushClasses(val);
          }
        });
      };
    }
    rx.rxt = rxt;
    return rx;
  };

  (function(root, factory, deps) {
    var rx, _, _str;

    if ((typeof define !== "undefined" && define !== null ? define.amd : void 0) != null) {
      return define(deps, factory);
    } else if ((typeof module !== "undefined" && module !== null ? module.exports : void 0) != null) {
      _ = require('underscore');
      _str = require('underscore.string');
      rx = factory(_, _str);
      return module.exports = rx;
    } else if ((root._ != null) && (root.$ != null)) {
      return root.rx = factory(root._, void 0, root.$);
    } else {
      throw "Dependencies are not met for reactive: _ and $ not found";
    }
  })(this, rxFactory, ['underscore', 'underscore.string', 'jquery']);

}).call(this);
