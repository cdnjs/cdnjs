(function() {
  var rxFactory,
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  rxFactory = function(_, $) {
    var DepArray, DepCell, DepMap, DepMgr, Ev, FakeObsCell, FakeSrcCell, IndexedArray, IndexedDepArray, IndexedMappedDepArray, MappedDepArray, ObsArray, ObsCell, ObsMap, ObsMapEntryCell, RawHtml, Recorder, SrcArray, SrcCell, SrcMap, SrcMapEntryCell, asyncBind, bind, depMgr, ev, events, firstWhere, flatten, flattenHelper, lagBind, mkAtts, mkMap, mktag, mkuid, nextUid, normalizeTagArgs, nthWhere, permToSplices, popKey, postLagBind, promiseBind, prop, propSet, props, recorder, rx, rxt, setDynProp, setProp, specialAttrs, sum, svg_events, svg_tags, tag, tags, toNodes, updateContents, updateSVGContents, _fn, _i, _len;
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
        var listener, uid, _ref, _results;
        if (depMgr.buffering) {
          return depMgr.buffer.push((function(_this) {
            return function() {
              return _this.pub(data);
            };
          })(this));
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
    rx.promiseBind = promiseBind = function(init, f) {
      return asyncBind(init, function() {
        return this.record(f).done((function(_this) {
          return function(res) {
            return _this.done(res);
          };
        })(this));
      });
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
        if (timeout != null) {
          clearTimeout(timeout);
        }
        return timeout = setTimeout((function(_this) {
          return function() {
            return _this.done(_this.record(f));
          };
        })(this), lag);
      });
    };
    rx.postLagBind = postLagBind = function(init, f) {
      var timeout;
      timeout = null;
      return asyncBind(init, function() {
        var ms, val, _ref;
        _ref = this.record(f), val = _ref.val, ms = _ref.ms;
        if (timeout != null) {
          clearTimeout(timeout);
        }
        return timeout = setTimeout(((function(_this) {
          return function() {
            return _this.done(val);
          };
        })(this)), ms);
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
        var _ref;
        this.x = x;
        this.x = (_ref = this.x) != null ? _ref : null;
        this.onSet = new Ev((function(_this) {
          return function() {
            return [[null, _this.x]];
          };
        })(this));
      }

      ObsCell.prototype.get = function() {
        recorder.sub((function(_this) {
          return function(target) {
            return rx.autoSub(_this.onSet, function() {
              return target.refresh();
            });
          };
        })(this));
        return this.x;
      };

      return ObsCell;

    })();
    SrcCell = rx.SrcCell = (function(_super) {
      __extends(SrcCell, _super);

      function SrcCell() {
        return SrcCell.__super__.constructor.apply(this, arguments);
      }

      SrcCell.prototype.set = function(x) {
        return recorder.mutating((function(_this) {
          return function() {
            var old;
            if (_this.x !== x) {
              old = _this.x;
              _this.x = x;
              _this.onSet.pub([old, x]);
              return old;
            }
          };
        })(this));
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
        var env, isSynchronous, old, realDone, recorded, syncResult;
        if (!this.refreshing) {
          old = this.x;
          realDone = (function(_this) {
            return function(x) {
              _this.x = x;
              return _this.onSet.pub([old, _this.x]);
            };
          })(this);
          recorded = false;
          syncResult = null;
          isSynchronous = false;
          env = {
            record: (function(_this) {
              return function(f) {
                var res;
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
              };
            })(this),
            done: (function(_this) {
              return function(x) {
                if (old !== x) {
                  if (_this.refreshing) {
                    isSynchronous = true;
                    return syncResult = x;
                  } else {
                    return realDone(x);
                  }
                }
              };
            })(this)
          };
          return this.body.call(env);
        }
      };

      DepCell.prototype.disconnect = function() {
        var cleanup, nestedBind, _i, _j, _len, _len1, _ref, _ref1;
        _ref = this.cleanups;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          cleanup = _ref[_i];
          cleanup();
        }
        _ref1 = this.nestedBinds;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          nestedBind = _ref1[_j];
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
      function ObsArray(cells, diff) {
        this.cells = cells != null ? cells : [];
        this.diff = diff != null ? diff : rx.basicDiff();
        this.onChange = new Ev((function(_this) {
          return function() {
            return [
              [
                0, [], rx.snap(function() {
                  var x0, _i, _len, _ref, _results;
                  _ref = _this.cells;
                  _results = [];
                  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    x0 = _ref[_i];
                    _results.push(x0.get());
                  }
                  return _results;
                })
              ]
            ];
          };
        })(this));
        this.onChangeCells = new Ev((function(_this) {
          return function() {
            return [[0, [], _this.cells]];
          };
        })(this));
        this.indexed_ = null;
      }

      ObsArray.prototype.all = function() {
        var x1, _i, _len, _ref, _results;
        recorder.sub((function(_this) {
          return function(target) {
            return rx.autoSub(_this.onChange, function() {
              return target.refresh();
            });
          };
        })(this));
        _ref = this.cells;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          x1 = _ref[_i];
          _results.push(x1.get());
        }
        return _results;
      };

      ObsArray.prototype.raw = function() {
        return this.all();
      };

      ObsArray.prototype.rawCells = function() {
        return this.cells;
      };

      ObsArray.prototype.at = function(i) {
        recorder.sub((function(_this) {
          return function(target) {
            return rx.autoSub(_this.onChange, function(_arg) {
              var added, index, removed;
              index = _arg[0], removed = _arg[1], added = _arg[2];
              if (index === i) {
                return target.refresh();
              }
            });
          };
        })(this));
        return this.cells[i].get();
      };

      ObsArray.prototype.length = function() {
        recorder.sub((function(_this) {
          return function(target) {
            return rx.autoSub(_this.onChangeCells, function(_arg) {
              var added, index, removed;
              index = _arg[0], removed = _arg[1], added = _arg[2];
              if (removed.length !== added.length) {
                return target.refresh();
              }
            });
          };
        })(this));
        return this.cells.length;
      };

      ObsArray.prototype.map = function(f) {
        var ys;
        ys = new MappedDepArray();
        rx.autoSub(this.onChangeCells, (function(_this) {
          return function(_arg) {
            var added, cell, index, newCells, removed, _i, _len, _ref;
            index = _arg[0], removed = _arg[1], added = _arg[2];
            _ref = ys.cells.slice(index, index + removed.length);
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              cell = _ref[_i];
              cell.disconnect();
            }
            newCells = added.map(function(item) {
              return cell = bind(function() {
                return f(item.get());
              });
            });
            return ys.realSpliceCells(index, removed.length, newCells);
          };
        })(this));
        return ys;
      };

      ObsArray.prototype.indexed = function() {
        if (this.indexed_ == null) {
          this.indexed_ = new IndexedDepArray();
          rx.autoSub(this.onChangeCells, (function(_this) {
            return function(_arg) {
              var added, index, removed;
              index = _arg[0], removed = _arg[1], added = _arg[2];
              return _this.indexed_.realSpliceCells(index, removed.length, added);
            };
          })(this));
        }
        return this.indexed_;
      };

      ObsArray.prototype.concat = function(that) {
        return rx.concat(this, that);
      };

      ObsArray.prototype.realSpliceCells = function(index, count, additions) {
        var addedElems, removed, removedElems;
        removed = this.cells.splice.apply(this.cells, [index, count].concat(additions));
        removedElems = rx.snap(function() {
          var x2, _i, _len, _results;
          _results = [];
          for (_i = 0, _len = removed.length; _i < _len; _i++) {
            x2 = removed[_i];
            _results.push(x2.get());
          }
          return _results;
        });
        addedElems = rx.snap(function() {
          var x3, _i, _len, _results;
          _results = [];
          for (_i = 0, _len = additions.length; _i < _len; _i++) {
            x3 = additions[_i];
            _results.push(x3.get());
          }
          return _results;
        });
        this.onChangeCells.pub([index, removed, additions]);
        return this.onChange.pub([index, removedElems, addedElems]);
      };

      ObsArray.prototype.realSplice = function(index, count, additions) {
        return this.realSpliceCells(index, count, additions.map(rx.cell));
      };

      ObsArray.prototype._update = function(val, diff) {
        var additions, count, fullSplice, index, old, splice, splices, x, _i, _len, _ref, _results;
        if (diff == null) {
          diff = this.diff;
        }
        old = rx.snap((function(_this) {
          return function() {
            var x, _i, _len, _ref, _results;
            _ref = _this.cells;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              x = _ref[_i];
              _results.push(x.get());
            }
            return _results;
          };
        })(this));
        fullSplice = [0, old.length, val];
        x = null;
        splices = diff != null ? (_ref = permToSplices(old.length, val, diff(old, val))) != null ? _ref : [fullSplice] : [fullSplice];
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
        return SrcArray.__super__.constructor.apply(this, arguments);
      }

      SrcArray.prototype.spliceArray = function(index, count, additions) {
        return recorder.mutating((function(_this) {
          return function() {
            return _this.realSplice(index, count, additions);
          };
        })(this));
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
        return recorder.mutating((function(_this) {
          return function() {
            return _this._update(xs);
          };
        })(this));
      };

      return SrcArray;

    })(ObsArray);
    MappedDepArray = rx.MappedDepArray = (function(_super) {
      __extends(MappedDepArray, _super);

      function MappedDepArray() {
        return MappedDepArray.__super__.constructor.apply(this, arguments);
      }

      return MappedDepArray;

    })(ObsArray);
    IndexedDepArray = rx.IndexedDepArray = (function(_super) {
      __extends(IndexedDepArray, _super);

      function IndexedDepArray(xs, diff) {
        var i, x;
        if (xs == null) {
          xs = [];
        }
        IndexedDepArray.__super__.constructor.call(this, xs, diff);
        this.is = (function() {
          var _i, _len, _ref, _results;
          _ref = this.cells;
          _results = [];
          for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
            x = _ref[i];
            _results.push(rx.cell(i));
          }
          return _results;
        }).call(this);
        this.onChangeCells = new Ev((function(_this) {
          return function() {
            return [[0, [], _.zip(_this.cells, _this.is)]];
          };
        })(this));
        this.onChange = new Ev((function(_this) {
          return function() {
            return [
              [
                0, [], _.zip(rx.snap(function() {
                  return _this.all();
                }), _this.is)
              ]
            ];
          };
        })(this));
      }

      IndexedDepArray.prototype.map = function(f) {
        var ys;
        ys = new MappedDepArray();
        rx.autoSub(this.onChangeCells, (function(_this) {
          return function(_arg) {
            var added, cell, icell, index, item, newCells, removed, _i, _len, _ref;
            index = _arg[0], removed = _arg[1], added = _arg[2];
            _ref = ys.cells.slice(index, index + removed.length);
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              cell = _ref[_i];
              cell.disconnect();
            }
            newCells = (function() {
              var _j, _len1, _ref1, _results;
              _results = [];
              for (_j = 0, _len1 = added.length; _j < _len1; _j++) {
                _ref1 = added[_j], item = _ref1[0], icell = _ref1[1];
                _results.push(cell = bind(function() {
                  return f(item.get(), icell);
                }));
              }
              return _results;
            })();
            return ys.realSpliceCells(index, removed.length, newCells);
          };
        })(this));
        return ys;
      };

      IndexedDepArray.prototype.realSpliceCells = function(index, count, additions) {
        var addedElems, i, newIs, offset, removed, removedElems, _i, _len, _ref, _ref1;
        removed = this.cells.splice.apply(this.cells, [index, count].concat(additions));
        removedElems = rx.snap(function() {
          var x2, _i, _len, _results;
          _results = [];
          for (_i = 0, _len = removed.length; _i < _len; _i++) {
            x2 = removed[_i];
            _results.push(x2.get());
          }
          return _results;
        });
        _ref = this.is.slice(index + count);
        for (offset = _i = 0, _len = _ref.length; _i < _len; offset = ++_i) {
          i = _ref[offset];
          i.set(index + additions.length + offset);
        }
        newIs = (function() {
          var _j, _ref1, _results;
          _results = [];
          for (i = _j = 0, _ref1 = additions.length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
            _results.push(rx.cell(index + i));
          }
          return _results;
        })();
        (_ref1 = this.is).splice.apply(_ref1, [index, count].concat(__slice.call(newIs)));
        addedElems = rx.snap(function() {
          var x3, _j, _len1, _results;
          _results = [];
          for (_j = 0, _len1 = additions.length; _j < _len1; _j++) {
            x3 = additions[_j];
            _results.push(x3.get());
          }
          return _results;
        });
        this.onChangeCells.pub([index, removed, _.zip(additions, newIs)]);
        return this.onChange.pub([index, removedElems, _.zip(addedElems, newIs)]);
      };

      return IndexedDepArray;

    })(ObsArray);
    IndexedMappedDepArray = rx.IndexedMappedDepArray = (function(_super) {
      __extends(IndexedMappedDepArray, _super);

      function IndexedMappedDepArray() {
        return IndexedMappedDepArray.__super__.constructor.apply(this, arguments);
      }

      return IndexedMappedDepArray;

    })(IndexedDepArray);
    DepArray = rx.DepArray = (function(_super) {
      __extends(DepArray, _super);

      function DepArray(f, diff) {
        this.f = f;
        DepArray.__super__.constructor.call(this, [], diff);
        rx.autoSub((bind((function(_this) {
          return function() {
            return _this.f();
          };
        })(this))).onSet, (function(_this) {
          return function(_arg) {
            var old, val;
            old = _arg[0], val = _arg[1];
            return _this._update(val);
          };
        })(this));
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
        this.x = x != null ? x : {};
        this.onAdd = new Ev((function(_this) {
          return function() {
            return _this.x;
          };
        })(this));
        this.onRemove = new Ev();
        this.onChange = new Ev();
      }

      ObsMap.prototype.get = function(key) {
        recorder.sub((function(_this) {
          return function(target) {
            return rx.autoSub(_this.onAdd, function(additions) {
              if (key in additions) {
                return target.refresh();
              }
            });
          };
        })(this));
        recorder.sub((function(_this) {
          return function(target) {
            return rx.autoSub(_this.onChange, function(changes) {
              if (key in changes) {
                return target.refresh();
              }
            });
          };
        })(this));
        recorder.sub((function(_this) {
          return function(target) {
            return rx.autoSub(_this.onRemove, function(removals) {
              if (key in removals) {
                return target.refresh();
              }
            });
          };
        })(this));
        return this.x[key];
      };

      ObsMap.prototype.has = function(key) {
        return this.x[key] != null;
      };

      ObsMap.prototype.all = function() {
        recorder.sub((function(_this) {
          return function(target) {
            return rx.autoSub(_this.onAdd, function() {
              return target.refresh();
            });
          };
        })(this));
        recorder.sub((function(_this) {
          return function(target) {
            return rx.autoSub(_this.onChange, function() {
              return target.refresh();
            });
          };
        })(this));
        recorder.sub((function(_this) {
          return function(target) {
            return rx.autoSub(_this.onRemove, function() {
              return target.refresh();
            });
          };
        })(this));
        return _.clone(this.x);
      };

      ObsMap.prototype.realPut = function(key, val) {
        var old;
        if (key in this.x) {
          old = this.x[key];
          this.x[key] = val;
          this.onChange.pub(_.object([[key, [old, val]]]));
          return old;
        } else {
          this.x[key] = val;
          this.onAdd.pub(_.object([[key, val]]));
          return void 0;
        }
      };

      ObsMap.prototype.realRemove = function(key) {
        var val;
        val = popKey(this.x, key);
        this.onRemove.pub(_.object([[key, val]]));
        return val;
      };

      ObsMap.prototype.cell = function(key) {
        return new ObsMapEntryCell(this, key);
      };

      ObsMap.prototype._update = function(other) {
        var additions, changes, removals;
        removals = _.chain(this.x).keys().difference(_.keys(other)).map((function(_this) {
          return function(k) {
            return [k, popKey(_this.x, k)];
          };
        })(this)).object().value();
        additions = _.chain(other).keys().difference(_.keys(this.x)).map((function(_this) {
          return function(k) {
            var val;
            val = other[k];
            _this.x[k] = val;
            return [k, val];
          };
        })(this)).object().value();
        changes = _.chain(other).pairs().filter((function(_this) {
          return function(_arg) {
            var k, val;
            k = _arg[0], val = _arg[1];
            return k in _this.x && _this.x[k] !== val;
          };
        })(this)).map((function(_this) {
          return function(_arg) {
            var k, old, val;
            k = _arg[0], val = _arg[1];
            old = _this.x[k];
            _this.x[k] = val;
            return [k, [old, val]];
          };
        })(this)).object().value();
        if (_.keys(removals).length) {
          this.onRemove.pub(removals);
        }
        if (_.keys(additions).length) {
          this.onAdd.pub(additions);
        }
        if (_.keys(changes).length) {
          return this.onChange.pub(changes);
        }
      };

      return ObsMap;

    })();
    SrcMap = rx.SrcMap = (function(_super) {
      __extends(SrcMap, _super);

      function SrcMap() {
        return SrcMap.__super__.constructor.apply(this, arguments);
      }

      SrcMap.prototype.put = function(key, val) {
        return recorder.mutating((function(_this) {
          return function() {
            return _this.realPut(key, val);
          };
        })(this));
      };

      SrcMap.prototype.remove = function(key) {
        return recorder.mutating((function(_this) {
          return function() {
            return _this.realRemove(key);
          };
        })(this));
      };

      SrcMap.prototype.cell = function(key) {
        return new SrcMapEntryCell(this, key);
      };

      SrcMap.prototype.update = function(x) {
        return recorder.mutating((function(_this) {
          return function() {
            return _this._update(x);
          };
        })(this));
      };

      return SrcMap;

    })(ObsMap);
    DepMap = rx.DepMap = (function(_super) {
      __extends(DepMap, _super);

      function DepMap(f) {
        var c;
        this.f = f;
        DepMap.__super__.constructor.call(this);
        c = new DepCell(this.f);
        c.refresh();
        rx.autoSub(c.onSet, (function(_this) {
          return function(_arg) {
            var old, val;
            old = _arg[0], val = _arg[1];
            return _this._update(val);
          };
        })(this));
      }

      return DepMap;

    })(ObsMap);
    rx.liftSpec = function(obj) {
      var name, type, val;
      return _.object((function() {
        var _i, _len, _ref, _results;
        _ref = Object.getOwnPropertyNames(obj);
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          name = _ref[_i];
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
      var c, name, spec;
      if (fieldspec == null) {
        fieldspec = rx.liftSpec(x);
      }
      for (name in fieldspec) {
        spec = fieldspec[name];
        if (!_.some((function() {
          var _i, _len, _ref, _results;
          _ref = [ObsCell, ObsArray, ObsMap];
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            c = _ref[_i];
            _results.push(x[name] instanceof c);
          }
          return _results;
        })())) {
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
          var _i, _len, _ref, _results;
          _ref = _.functions(arr);
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            methName = _ref[_i];
            if (methName !== 'length') {
              _results.push((function(methName) {
                var meth, newMeth, spec;
                meth = obj[methName];
                newMeth = function() {
                  var args, res, _ref1;
                  args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
                  if (meth != null) {
                    res = meth.call.apply(meth, [obj].concat(__slice.call(args)));
                  }
                  (_ref1 = arr[methName]).call.apply(_ref1, [arr].concat(__slice.call(args)));
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
              var desc, obs, view, _ref, _ref1;
              desc = null;
              switch (spec.type) {
                case 'cell':
                  obs = rx.cell((_ref = spec.val) != null ? _ref : null);
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
                  view = rx.reactify((_ref1 = spec.val) != null ? _ref1 : []);
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
        var _i, _len, _ref, _results;
        _ref = Object.getOwnPropertyNames(obj);
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          name = _ref[_i];
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
        return new SrcArray((xs != null ? xs : []).map(rx.cell), diff);
      },
      map: function(x) {
        return new SrcMap(x);
      }
    });
    rx.flatten = function(xs) {
      return rx.cellToArray(bind(function() {
        var xsArray;
        xsArray = rxt.cast(xs, 'array');
        if (!xsArray.length()) {
          return [];
        }
        return _.chain(xsArray.all()).map(flattenHelper).flatten().filter(function(x) {
          return x != null;
        }).value();
      }));
    };
    flattenHelper = function(x) {
      if (x instanceof ObsArray) {
        return flattenHelper(x.raw());
      } else if (x instanceof ObsCell) {
        return flattenHelper(x.get());
      } else if (_.isArray(x)) {
        return x.map(function(x_k) {
          return flattenHelper(x_k);
        });
      } else {
        return x;
      }
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
    rx.cellToMap = function(cell) {
      return new rx.DepMap(function() {
        return this.done(this.record(function() {
          return cell.get();
        }));
      });
    };
    rx.basicDiff = function(key) {
      if (key == null) {
        key = rx.smartUidify;
      }
      return function(oldXs, newXs) {
        var i, oldKeys, x, _i, _len, _ref, _results;
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
          _results.push((_ref = oldKeys[key(x)]) != null ? _ref : -1);
        }
        return _results;
      };
    };
    rx.uidify = function(x) {
      var _ref;
      return (_ref = x.__rxUid) != null ? _ref : (Object.defineProperty(x, '__rxUid', {
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
      if (!newXs.length) {
        return null;
      }
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
        var _i, _ref, _results;
        _results = [];
        for (i = _i = 0, _ref = refs.length - 1; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
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
              this.change((function(_this) {
                return function() {
                  return val.set(_this.val());
                };
              })(this));
              this.on('input', (function(_this) {
                return function() {
                  return val.set(_this.val());
                };
              })(this));
              return val;
            case 'checked':
              checked = rx.cell(this.is(':checked'));
              this.change((function(_this) {
                return function() {
                  return checked.set(_this.is(':checked'));
                };
              })(this));
              return checked;
            default:
              throw new Error('Unknown reactive property type');
          }
        }).call(this);
      };
      rxt = {};
      rxt.events = {};
      rxt.events.enabled = false;
      rxt.events.onElementChildrenChanged = new Ev();
      rxt.events.onElementAttrsChanged = new Ev();
      RawHtml = rxt.RawHtml = (function() {
        function RawHtml(html) {
          this.html = html;
        }

        return RawHtml;

      })();
      events = ["blur", "change", "click", "dblclick", "error", "focus", "focusin", "focusout", "hover", "keydown", "keypress", "keyup", "load", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseout", "mouseover", "mouseup", "ready", "resize", "scroll", "select", "submit", "toggle", "unload"];
      svg_events = ["click"];
      specialAttrs = rxt.specialAttrs = {
        init: function(elt, fn) {
          return fn.call(elt);
        }
      };
      _fn = function(ev) {
        return specialAttrs[ev] = function(elt, fn) {
          if (elt instanceof SVGElement && __indexOf.call(svg_events, ev) >= 0) {
            return elt.addEventListener(ev, fn);
          } else {
            return elt[ev](function(e) {
              return fn.call(elt, e);
            });
          }
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
        if (elt instanceof SVGElement) {
          return elt.setAttribute(prop, val);
        } else if (prop === 'value') {
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
            setProp(elt, prop, xform(n));
            if (rxt.events.enabled) {
              return rxt.events.onElementAttrsChanged.pub({
                $element: elt,
                attr: prop
              });
            }
          });
        } else {
          return setProp(elt, prop, xform(val));
        }
      };
      mkAtts = function(attstr) {
        return (function(atts) {
          var classes, cls, id;
          id = attstr.match(/[#](\w+)/);
          if (id) {
            atts.id = id[1];
          }
          classes = attstr.match(/\.\w+/g);
          if (classes) {
            atts["class"] = ((function() {
              var _j, _len1, _results;
              _results = [];
              for (_j = 0, _len1 = classes.length; _j < _len1; _j++) {
                cls = classes[_j];
                _results.push(cls.replace(/^\./, ''));
              }
              return _results;
            })()).join(' ');
          }
          return atts;
        })({});
      };
      normalizeTagArgs = function(arg1, arg2) {
        if ((arg1 == null) && (arg2 == null)) {
          return [{}, null];
        } else if (arg1 instanceof Object && (arg2 != null)) {
          return [arg1, arg2];
        } else if (_.isString(arg1) && (arg2 != null)) {
          return [mkAtts(arg1), arg2];
        } else if ((arg2 == null) && _.isString(arg1) || _.isNumber(arg1) || arg1 instanceof Element || arg1 instanceof SVGElement || arg1 instanceof RawHtml || arg1 instanceof $ || _.isArray(arg1) || arg1 instanceof ObsCell || arg1 instanceof ObsArray) {
          return [{}, arg1];
        } else {
          return [arg1, null];
        }
      };
      toNodes = function(contents) {
        var child, parsed, _j, _len1, _results;
        _results = [];
        for (_j = 0, _len1 = contents.length; _j < _len1; _j++) {
          child = contents[_j];
          if (child != null) {
            if (_.isString(child) || _.isNumber(child)) {
              _results.push(document.createTextNode(child));
            } else if (child instanceof Element || child instanceof SVGElement) {
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
              throw new Error("Unknown element type in array: " + child.constructor.name + " (must be string, number, Element, RawHtml, or jQuery objects)");
            }
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      };
      updateContents = function(elt, contents) {
        var covers, hasWidth, left, node, nodes, top;
        if (elt.html) {
          elt.html('');
        }
        if (contents == null) {

        } else if (_.isArray(contents)) {
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
              var _j, _len1, _ref, _ref1, _results;
              _ref = nodes != null ? nodes : [];
              _results = [];
              for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
                node = _ref[_j];
                if (!(hasWidth(node))) {
                  continue;
                }
                _ref1 = $(node).offset(), left = _ref1.left, top = _ref1.top;
                _results.push($('<div/>').appendTo($('body').first()).addClass('updated-element').offset({
                  top: top,
                  left: left
                }).width($(node).width()).height($(node).height()));
              }
              return _results;
            })();
            setTimeout((function() {
              var cover, _j, _len1, _results;
              _results = [];
              for (_j = 0, _len1 = covers.length; _j < _len1; _j++) {
                cover = covers[_j];
                _results.push($(cover).remove());
              }
              return _results;
            }), 2000);
          }
          return nodes;
        } else if (_.isString(contents) || _.isNumber(contents) || contents instanceof Element || contents instanceof SVGElement || contents instanceof RawHtml || contents instanceof $) {
          return updateContents(elt, [contents]);
        } else {
          throw new Error("Unknown type for element contents: " + contents.constructor.name + " (accepted types: string, number, Element, RawHtml, jQuery object of single element, or array of the aforementioned)");
        }
      };
      rxt.mktag = mktag = function(tag) {
        return function(arg1, arg2) {
          var attrs, contents, elt, key, name, value, _ref, _ref1;
          _ref = normalizeTagArgs(arg1, arg2), attrs = _ref[0], contents = _ref[1];
          elt = $("<" + tag + "/>");
          _ref1 = _.omit(attrs, _.keys(specialAttrs));
          for (name in _ref1) {
            value = _ref1[name];
            setDynProp(elt, name, value);
          }
          if (contents != null) {
            if (contents instanceof ObsArray) {
              rx.autoSub(contents.indexed().onChangeCells, function(_arg) {
                var added, cell, icell, index, removed, toAdd, _j, _len1, _ref2, _results;
                index = _arg[0], removed = _arg[1], added = _arg[2];
                elt.contents().slice(index, index + removed.length).remove();
                toAdd = toNodes(added.map(function(_arg1) {
                  var cell, icell;
                  cell = _arg1[0], icell = _arg1[1];
                  return rx.snap(function() {
                    return cell.get();
                  });
                }));
                if (index === elt.contents().length) {
                  elt.append(toAdd);
                } else {
                  elt.contents().eq(index).before(toAdd);
                }
                if (rxt.events.enabled && (removed.length || toAdd.length)) {
                  rxt.events.onElementChildrenChanged.pub({
                    $element: elt,
                    type: "childrenUpdated",
                    added: toAdd,
                    removed: toNodes(removed.map(function(cell) {
                      return rx.snap(function() {
                        return cell.get();
                      });
                    }))
                  });
                }
                _results = [];
                for (_j = 0, _len1 = added.length; _j < _len1; _j++) {
                  _ref2 = added[_j], cell = _ref2[0], icell = _ref2[1];
                  _results.push((function(cell, icell) {
                    return rx.autoSub(cell.onSet, rx.skipFirst(function(_arg1) {
                      var ival, old, val;
                      old = _arg1[0], val = _arg1[1];
                      ival = rx.snap(function() {
                        return icell.get();
                      });
                      toAdd = toNodes([val]);
                      elt.contents().eq(ival).replaceWith(toAdd);
                      if (rxt.events.enabled) {
                        return rxt.events.onElementChildrenChanged.pub({
                          $element: elt,
                          type: "childrenUpdated",
                          updated: toAdd
                        });
                      }
                    }));
                  })(cell, icell));
                }
                return _results;
              });
            } else if (contents instanceof ObsCell) {
              rx.autoSub(contents.onSet, function(_arg) {
                var old, val;
                old = _arg[0], val = _arg[1];
                updateContents(elt, val);
                if (rxt.events.enabled) {
                  return rxt.events.onElementChildrenChanged.pub({
                    $element: elt,
                    type: "rerendered"
                  });
                }
              });
            } else {
              updateContents(elt, contents);
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
      svg_tags = ['a', 'altglyph', 'altglyphdef', 'altglyphitem', 'animate', 'animatecolor', 'animatemotion', 'animatetransform', 'circle', 'clippath', 'color-profile', 'cursor', 'defs', 'desc', 'ellipse', 'feblend', 'fecolormatrix', 'fecomponenttransfer', 'fecomposite', 'feconvolvematrix', 'fediffuselighting', 'fedisplacementmap', 'fedistantlight', 'feflood', 'fefunca', 'fefuncb', 'fefuncg', 'fefuncr', 'fegaussianblur', 'feimage', 'femerge', 'femergenode', 'femorphology', 'feoffset', 'fepointlight', 'fespecularlighting', 'fespotlight', 'fetile', 'feturbulence', 'filter', 'font', 'font-face', 'font-face-format', 'font-face-name', 'font-face-src', 'font-face-uri', 'foreignobject', 'g', 'glyph', 'glyphref', 'hkern', 'image', 'line', 'lineargradient', 'marker', 'mask', 'metadata', 'missing-glyph', 'mpath', 'path', 'pattern', 'polygon', 'polyline', 'radialgradient', 'rect', 'script', 'set', 'stop', 'style', 'svg', 'switch', 'symbol', 'text', 'textpath', 'title', 'tref', 'tspan', 'use', 'view', 'vkern'];
      updateSVGContents = function(elt, contents) {
        var node, toAdd, _j, _len1, _results;
        while (elt.firstChild) {
          elt.removeChild(elt.firstChild);
        }
        if (_.isArray(contents)) {
          toAdd = toNodes(contents);
          _results = [];
          for (_j = 0, _len1 = toAdd.length; _j < _len1; _j++) {
            node = toAdd[_j];
            _results.push(elt.appendChild(node));
          }
          return _results;
        } else if (_.isString(contents) || contents instanceof SVGElement) {
          return updateSVGContents(elt, [contents]);
        } else {
          console.error('updateSVGContents', elt, contents);
          throw "Must wrap contents " + contents + " as array or string";
        }
      };
      rxt.svg_mktag = mktag = function(tag) {
        return function(arg1, arg2) {
          var attrs, contents, elt, first, key, name, value, _ref, _ref1;
          _ref = normalizeTagArgs(arg1, arg2), attrs = _ref[0], contents = _ref[1];
          elt = document.createElementNS('http://www.w3.org/2000/svg', tag);
          _ref1 = _.omit(attrs, _.keys(specialAttrs));
          for (name in _ref1) {
            value = _ref1[name];
            setDynProp(elt, name, value);
          }
          if (contents != null) {
            if (contents instanceof ObsArray) {
              contents.onChange.sub(function(_arg) {
                var added, i, index, node, removed, toAdd, _j, _k, _l, _len1, _len2, _ref2, _results, _results1;
                index = _arg[0], removed = _arg[1], added = _arg[2];
                for (i = _j = 0, _ref2 = removed.length; 0 <= _ref2 ? _j < _ref2 : _j > _ref2; i = 0 <= _ref2 ? ++_j : --_j) {
                  elt.removeChild(elt.childNodes[index]);
                }
                toAdd = toNodes(added);
                if (index === elt.childNodes.length) {
                  _results = [];
                  for (_k = 0, _len1 = toAdd.length; _k < _len1; _k++) {
                    node = toAdd[_k];
                    _results.push(elt.appendChild(node));
                  }
                  return _results;
                } else {
                  _results1 = [];
                  for (_l = 0, _len2 = toAdd.length; _l < _len2; _l++) {
                    node = toAdd[_l];
                    _results1.push(elt.childNodes[index].insertBefore(node));
                  }
                  return _results1;
                }
              });
            } else if (contents instanceof ObsCell) {
              first = contents.x[0];
              contents.onSet.sub(function(_arg) {
                var old, val;
                old = _arg[0], val = _arg[1];
                return updateSVGContents(elt, val);
              });
            } else {
              updateSVGContents(elt, contents);
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
      rxt.tags = _.object((function() {
        var _j, _len1, _results;
        _results = [];
        for (_j = 0, _len1 = tags.length; _j < _len1; _j++) {
          tag = tags[_j];
          _results.push([tag, rxt.mktag(tag)]);
        }
        return _results;
      })());
      rxt.svg_tags = _.object((function() {
        var _j, _len1, _results;
        _results = [];
        for (_j = 0, _len1 = svg_tags.length; _j < _len1; _j++) {
          tag = svg_tags[_j];
          _results.push([tag, rxt.svg_mktag(tag)]);
        }
        return _results;
      })());
      rxt.rawHtml = function(html) {
        return new RawHtml(html);
      };
      rxt.importTags = (function(_this) {
        return function(x) {
          return _(x != null ? x : _this).extend(rxt.tags);
        };
      })(this);
      rxt.cast = function(value, type) {
        var key, opts, types;
        if (type == null) {
          type = "cell";
        }
        if (_.isString(type)) {
          switch (type) {
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
        } else {
          opts = value;
          types = type;
          return _.object((function() {
            var _results;
            _results = [];
            for (key in opts) {
              value = opts[key];
              _results.push([key, types[key] ? rxt.cast(value, types[key]) : value]);
            }
            return _results;
          })());
        }
      };
      rxt.trim = $.trim;
      rxt.dasherize = function(str) {
        return rxt.trim(str).replace(/([A-Z])/g, '-$1').replace(/[-_\s]+/g, '-').toLowerCase();
      };
      rxt.cssify = function(map) {
        var k, v;
        console.warn('cssify is deprecated; set the `style` property directly to a JSON object.');
        return ((function() {
          var _results;
          _results = [];
          for (k in map) {
            v = map[k];
            if (v != null) {
              _results.push("" + (rxt.dasherize(k)) + ": " + (_.isNumber(v) ? v + 'px' : v) + ";");
            }
          }
          return _results;
        })()).join(' ');
      };
      specialAttrs.style = function(elt, value) {
        var isCell;
        isCell = value instanceof ObsCell;
        return rx.autoSub(rxt.cast(value).onSet, function(_arg) {
          var n, o;
          o = _arg[0], n = _arg[1];
          if ((n == null) || _.isString(n)) {
            setProp(elt, 'style', n);
          } else {
            elt.removeAttr('style').css(n);
          }
          if (isCell && rxt.events.enabled) {
            return rxt.events.onElementAttrsChanged.pub({
              $element: elt,
              attr: "style"
            });
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

  (function(root, factory) {
    var $, deps, is_browser, rx, _;
    deps = ['underscore'];
    if (is_browser = typeof window !== 'undefined') {
      deps.push('jquery');
    }
    if ((typeof define !== "undefined" && define !== null ? define.amd : void 0) != null) {
      return define(deps, factory);
    } else if ((typeof module !== "undefined" && module !== null ? module.exports : void 0) != null) {
      $ = is_browser ? require('jquery') : void 0;
      _ = require('underscore');
      rx = factory(_, $);
      return module.exports = rx;
    } else if ((root._ != null) && (root.$ != null)) {
      return root.rx = factory(root._, root.$);
    } else {
      throw "Dependencies are not met for reactive: _ and $ not found";
    }
  })(this, rxFactory);

}).call(this);

//# sourceMappingURL=reactive.js.map
