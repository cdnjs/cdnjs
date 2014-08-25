// resources (26):
//  [function] ../../src/basis/data/dataset.js -> d.js
//  [function] library.js -> 0.js
//  [function] ../../src/basis/l10n.js -> 2.js
//  [function] ../../src/basis/event.js -> 3.js
//  [function] ../../src/basis/data.js -> 4.js
//  [function] ../../src/basis/dom/wrapper.js -> 5.js
//  [function] ../../src/basis/template.js -> 6.js
//  [function] ../../src/basis/template/html.js -> 7.js
//  [function] ../../src/basis/dom/event.js -> 8.js
//  [function] ../../src/basis/template/htmlfgen.js -> 9.js
//  [function] ../../src/basis/dragdrop.js -> a.js
//  [function] ../../src/basis/dom/computedStyle.js -> b.js
//  [function] ../../src/basis/layout.js -> c.js
//  [function] ../../src/basis/ui.js -> 1.js
//  [function] ../../src/basis/data/value.js -> e.js
//  [function] ../../src/basis/data/index.js -> f.js
//  [function] ../../src/basis/data/object.js -> g.js
//  [function] ../../src/basis/entity.js -> h.js
//  [function] ../../src/basis/net/jsonp.js -> i.js
//  [function] ../../src/basis/net.js -> j.js
//  [function] ../../src/basis/net/service.js -> k.js
//  [function] ../../src/basis/net/ajax.js -> l.js
//  [function] ../../src/basis/ua.js -> m.js
//  [function] ../../src/basis/net/action.js -> n.js
//  [function] ../../src/basis/router.js -> o.js
//  [function] ../../src/basis/app.js -> p.js
//
// filelist (1): 
//   library.js
(function(){
"use strict";

var __namespace_map__ = {"0.js":"library","1.js":"basis.ui","2.js":"basis.l10n","3.js":"basis.event","4.js":"basis.data","5.js":"basis.dom.wrapper","6.js":"basis.template","7.js":"basis.template.html","8.js":"basis.dom.event","9.js":"basis.template.htmlfgen","a.js":"basis.dragdrop","b.js":"basis.dom.computedStyle","c.js":"basis.layout","d.js":"basis.data.dataset","e.js":"basis.data.value","f.js":"basis.data.index","g.js":"basis.data.object","h.js":"basis.entity","i.js":"basis.net.jsonp","j.js":"basis.net","k.js":"basis.net.service","l.js":"basis.net.ajax","m.js":"basis.ua","n.js":"basis.net.action","o.js":"basis.router","p.js":"basis.app"};
var library;

var __resources__ = {
  "d.js": function(exports, module, basis, global, __filename, __dirname, require, resource) {
    basis.require("./3.js");
    basis.require("./4.js");
    var namespace = this.path;
    var Class = basis.Class;
    var oneFunctionProperty = Class.oneFunctionProperty;
    var extend = basis.object.extend;
    var values = basis.object.values;
    var getter = basis.getter;
    var $self = basis.fn.$self;
    var $true = basis.fn.$true;
    var $false = basis.fn.$false;
    var $undef = basis.fn.$undef;
    var arrayFrom = basis.array.from;
    var createEvent = basis.event.create;
    var SUBSCRIPTION = basis.data.SUBSCRIPTION;
    var DataObject = basis.data.Object;
    var KeyObjectMap = basis.data.KeyObjectMap;
    var ReadOnlyDataset = basis.data.ReadOnlyDataset;
    var Dataset = basis.data.Dataset;
    var DatasetWrapper = basis.data.DatasetWrapper;
    var setAccumulateState = Dataset.setAccumulateState;
    SUBSCRIPTION.add("SOURCE", {
      sourceChanged: function(object, oldSource) {
        if (oldSource) SUBSCRIPTION.unlink("source", object, oldSource);
        if (object.source) SUBSCRIPTION.link("source", object, object.source);
      },
      sourcesChanged: function(object, delta) {
        var array;
        if (array = delta.inserted) for (var i = 0, item; item = array[i]; i++) SUBSCRIPTION.link("source", object, array[i]);
        if (array = delta.deleted) for (var i = 0, item; item = array[i]; i++) SUBSCRIPTION.unlink("source", object, array[i]);
      }
    }, function(action, object) {
      var sources = object.sources || (object.source ? [ object.source ] : []);
      for (var i = 0, source; source = sources[i++]; ) action("source", object, source);
    });
    SUBSCRIPTION.addProperty("minuend");
    SUBSCRIPTION.addProperty("subtrahend");
    function getDelta(inserted, deleted) {
      var delta = {};
      var result;
      if (inserted && inserted.length) result = delta.inserted = inserted;
      if (deleted && deleted.length) result = delta.deleted = deleted;
      if (result) return delta;
    }
    function createRuleEvents(fn, events) {
      return function createRuleEventsExtend(events) {
        if (!events) return null;
        if (events.__extend__) return events;
        if (typeof events != "string" && !Array.isArray(events)) events = null;
        return extend(basis.event.createHandler(events, fn), {
          __extend__: createRuleEventsExtend
        });
      }(events);
    }
    function createKeyMap(config, keyGetter, ItemClass, SubsetClass) {
      return new KeyObjectMap(extend({
        keyGetter: keyGetter,
        itemClass: ItemClass,
        create: function(key, object) {
          var datasetWrapper = KeyObjectMap.prototype.create.call(this, key, object);
          datasetWrapper.ruleValue = key;
          datasetWrapper.setDataset(new SubsetClass({
            ruleValue: key
          }));
          return datasetWrapper;
        }
      }, config));
    }
    var MERGE_DATASET_HANDLER = {
      itemsChanged: function(source, delta) {
        var memberMap = this.members_;
        var updated = {};
        var object;
        var objectId;
        if (delta.inserted) {
          for (var i = 0; object = delta.inserted[i]; i++) {
            objectId = object.basisObjectId;
            if (memberMap[objectId]) {
              memberMap[objectId].count++;
            } else {
              memberMap[objectId] = {
                count: 1,
                object: object
              };
            }
            updated[objectId] = memberMap[objectId];
          }
        }
        if (delta.deleted) {
          for (var i = 0; object = delta.deleted[i]; i++) {
            objectId = object.basisObjectId;
            updated[objectId] = memberMap[objectId];
            memberMap[objectId].count--;
          }
        }
        this.applyRule(updated);
      }
    };
    var Merge = Class(ReadOnlyDataset, {
      className: namespace + ".Merge",
      subscribeTo: SUBSCRIPTION.SOURCE,
      emit_sourcesChanged: createEvent("sourcesChanged", "delta"),
      sources: null,
      sourceValues_: null,
      sourcesMap_: null,
      sourceDelta_: null,
      rule: function(count, sourceCount) {
        return count > 0;
      },
      emit_ruleChanged: createEvent("ruleChanged", "oldRule"),
      listen: {
        source: MERGE_DATASET_HANDLER,
        sourceValue: {
          destroy: function(sender) {
            this.removeSource(sender);
          }
        }
      },
      init: function() {
        ReadOnlyDataset.prototype.init.call(this);
        var sources = this.sources;
        this.sources = [];
        this.sourcesMap_ = {};
        this.sourceValues_ = [];
        if (sources) this.setSources(sources);
      },
      setRule: function(rule) {
        rule = getter(rule || Merge.UNION);
        if (this.rule !== rule) {
          var oldRule = this.rule;
          this.rule = rule;
          this.emit_ruleChanged(oldRule);
          return this.applyRule();
        }
      },
      applyRule: function(scope) {
        var memberMap = this.members_;
        var rule = this.rule;
        var sourceCount = this.sources.length;
        var inserted = [];
        var deleted = [];
        var memberCounter;
        var isMember;
        var delta;
        if (!scope) scope = memberMap;
        for (var objectId in scope) {
          memberCounter = memberMap[objectId];
          isMember = sourceCount && memberCounter.count && rule(memberCounter.count, sourceCount);
          if (isMember != objectId in this.items_) {
            if (isMember) inserted.push(memberCounter.object); else deleted.push(memberCounter.object);
          }
          if (memberCounter.count == 0) delete memberMap[objectId];
        }
        if (delta = getDelta(inserted, deleted)) this.emit_itemsChanged(delta);
        return delta;
      },
      addDataset_: function(dataset) {
        this.sources.push(dataset);
        if (this.listen.source) dataset.addHandler(this.listen.source, this);
        var memberMap = this.members_;
        for (var objectId in dataset.items_) {
          if (memberMap[objectId]) {
            memberMap[objectId].count++;
          } else {
            memberMap[objectId] = {
              count: 1,
              object: dataset.items_[objectId]
            };
          }
        }
        return true;
      },
      removeDataset_: function(dataset) {
        basis.array.remove(this.sources, dataset);
        if (this.listen.source) dataset.removeHandler(this.listen.source, this);
        var memberMap = this.members_;
        for (var objectId in dataset.items_) memberMap[objectId].count--;
      },
      updateDataset_: function(source) {
        var merge = this.owner;
        var sourcesMap_ = merge.sourcesMap_;
        var dataset = basis.data.resolveDataset(this, merge.updateDataset_, source, "adapter");
        var inserted;
        var deleted;
        var delta;
        if (this.dataset === dataset) return;
        if (dataset) {
          var count = (sourcesMap_[dataset.basisObjectId] || 0) + 1;
          sourcesMap_[dataset.basisObjectId] = count;
          if (count == 1) {
            merge.addDataset_(dataset);
            inserted = [ dataset ];
          }
        }
        if (this.dataset) {
          var count = (sourcesMap_[this.dataset.basisObjectId] || 0) - 1;
          sourcesMap_[this.dataset.basisObjectId] = count;
          if (count == 0) {
            merge.removeDataset_(this.dataset);
            deleted = [ this.dataset ];
          }
        }
        this.dataset = dataset;
        merge.applyRule();
        if (delta = getDelta(inserted, deleted)) {
          var setSourcesTransaction = merge.sourceDelta_;
          if (setSourcesTransaction) {
            if (delta.inserted) delta.inserted.forEach(function(source) {
              if (!basis.array.remove(this.deleted, source)) basis.array.add(this.inserted, source);
            }, setSourcesTransaction);
            if (delta.deleted) delta.deleted.forEach(function(source) {
              if (!basis.array.remove(this.inserted, source)) basis.array.add(this.deleted, source);
            }, setSourcesTransaction);
          } else {
            merge.emit_sourcesChanged(delta);
          }
        }
        return delta;
      },
      getSourceValues: function() {
        return this.sourceValues_.map(function(item) {
          return item.source;
        });
      },
      addSource: function(source) {
        if (!source || typeof source != "object" && typeof source != "function") {
          basis.dev.warn(this.constructor.className + ".addSource: value should be a dataset instance or to be able to resolve in dataset");
          return;
        }
        if (this.hasSource(source)) {
          basis.dev.warn(this.constructor.className + ".addSource: value is already in source list");
          return;
        }
        var sourceInfo = {
          owner: this,
          source: source,
          adapter: null,
          dataset: null
        };
        this.sourceValues_.push(sourceInfo);
        this.updateDataset_.call(sourceInfo, source);
        if (this.listen.sourceValue && source instanceof basis.event.Emitter) source.addHandler(this.listen.sourceValue, this);
      },
      removeSource: function(source) {
        for (var i = 0, sourceInfo; sourceInfo = this.sourceValues_[i]; i++) if (sourceInfo.source === source) {
          if (this.listen.sourceValue && source instanceof basis.event.Emitter) source.removeHandler(this.listen.sourceValue, this);
          this.updateDataset_.call(sourceInfo, null);
          this.sourceValues_.splice(i, 1);
          return;
        }
        basis.dev.warn(this.constructor.className + ".removeSource: source value isn't found in source list");
      },
      hasSource: function(source) {
        for (var i = 0, sourceInfo; sourceInfo = this.sourceValues_[i]; i++) if (sourceInfo.source === source) return true;
        return false;
      },
      setSources: function(sources) {
        var exists = this.sourceValues_.map(function(sourceInfo) {
          return sourceInfo.source;
        });
        var inserted = [];
        var deleted = [];
        var delta;
        if (!sources) sources = [];
        this.sourceDelta_ = {
          inserted: inserted,
          deleted: deleted
        };
        for (var i = 0; i < sources.length; i++) {
          var source = sources[i];
          if (!basis.array.remove(exists, source)) this.addSource(source);
        }
        exists.forEach(this.removeSource, this);
        this.sourceDelta_ = null;
        if (delta = getDelta(inserted, deleted)) this.emit_sourcesChanged(delta);
        return delta;
      },
      destroy: function() {
        this.setSources();
        ReadOnlyDataset.prototype.destroy.call(this);
        this.sourceValues_ = null;
        this.sourcesMap_ = null;
        this.sourceDelta_ = null;
        this.sources = null;
      }
    });
    Merge.UNION = Merge.prototype.rule;
    Merge.INTERSECTION = function(count, sourceCount) {
      return count == sourceCount;
    };
    Merge.DIFFERENCE = function(count, sourceCount) {
      return count == 1;
    };
    Merge.MORE_THAN_ONE_INCLUDE = function(count, sourceCount) {
      return sourceCount == 1 || count > 1;
    };
    Merge.AT_LEAST_ONE_EXCLUDE = function(count, sourceCount) {
      return sourceCount == 1 || count < sourceCount;
    };
    var datasetAbsentFilter = function(item) {
      return !this.has(item);
    };
    var SUBTRACTDATASET_MINUEND_HANDLER = {
      itemsChanged: function(dataset, delta) {
        if (!this.subtrahend) return;
        var newDelta = getDelta(delta.inserted && delta.inserted.filter(datasetAbsentFilter, this.subtrahend), delta.deleted && delta.deleted.filter(this.has, this));
        if (newDelta) this.emit_itemsChanged(newDelta);
      },
      destroy: function() {
        if (!this.minuendAdapter_) this.setMinuend(null);
      }
    };
    var SUBTRACTDATASET_SUBTRAHEND_HANDLER = {
      itemsChanged: function(dataset, delta) {
        if (!this.minuend) return;
        var newDelta = getDelta(delta.deleted && delta.deleted.filter(this.minuend.has, this.minuend), delta.inserted && delta.inserted.filter(this.has, this));
        if (newDelta) this.emit_itemsChanged(newDelta);
      },
      destroy: function() {
        if (!this.subtrahendAdapter_) this.setSubtrahend(null);
      }
    };
    var Subtract = Class(ReadOnlyDataset, {
      className: namespace + ".Subtract",
      subscribeTo: SUBSCRIPTION.MINUEND + SUBSCRIPTION.SUBTRAHEND,
      minuend: null,
      minuendAdapter_: null,
      emit_minuendChanged: createEvent("minuendChanged", "oldMinuend"),
      subtrahend: null,
      subtrahendAdapter_: null,
      emit_subtrahendChanged: createEvent("subtrahendChanged", "oldSubtrahend"),
      listen: {
        minuend: SUBTRACTDATASET_MINUEND_HANDLER,
        subtrahend: SUBTRACTDATASET_SUBTRAHEND_HANDLER
      },
      init: function() {
        ReadOnlyDataset.prototype.init.call(this);
        var minuend = this.minuend;
        var subtrahend = this.subtrahend;
        this.minuend = null;
        this.subtrahend = null;
        if (minuend || subtrahend) this.setOperands(minuend, subtrahend);
      },
      setOperands: function(minuend, subtrahend) {
        var delta;
        var operandsChanged = false;
        minuend = basis.data.resolveDataset(this, this.setMinuend, minuend, "minuendAdapter_");
        subtrahend = basis.data.resolveDataset(this, this.setSubtrahend, subtrahend, "subtrahendAdapter_");
        var oldMinuend = this.minuend;
        var oldSubtrahend = this.subtrahend;
        if (oldMinuend !== minuend) {
          operandsChanged = true;
          this.minuend = minuend;
          var listenHandler = this.listen.minuend;
          if (listenHandler) {
            if (oldMinuend) oldMinuend.removeHandler(listenHandler, this);
            if (minuend) minuend.addHandler(listenHandler, this);
          }
          this.emit_minuendChanged(oldMinuend);
        }
        if (oldSubtrahend !== subtrahend) {
          operandsChanged = true;
          this.subtrahend = subtrahend;
          var listenHandler = this.listen.subtrahend;
          if (listenHandler) {
            if (oldSubtrahend) oldSubtrahend.removeHandler(listenHandler, this);
            if (subtrahend) subtrahend.addHandler(listenHandler, this);
          }
          this.emit_subtrahendChanged(oldSubtrahend);
        }
        if (!operandsChanged) return false;
        if (!minuend || !subtrahend) {
          if (this.itemCount) this.emit_itemsChanged(delta = {
            deleted: this.getItems()
          });
        } else {
          var deleted = [];
          var inserted = [];
          for (var key in this.items_) if (!minuend.items_[key] || subtrahend.items_[key]) deleted.push(this.items_[key]);
          for (var key in minuend.items_) if (!this.items_[key] && !subtrahend.items_[key]) inserted.push(minuend.items_[key]);
          if (delta = getDelta(inserted, deleted)) this.emit_itemsChanged(delta);
        }
        return delta;
      },
      setMinuend: function(minuend) {
        return this.setOperands(minuend, this.subtrahendAdapter_ ? this.subtrahendAdapter_.source : this.subtrahend);
      },
      setSubtrahend: function(subtrahend) {
        return this.setOperands(this.minuendAdapter_ ? this.minuendAdapter_.source : this.minuend, subtrahend);
      },
      destroy: function() {
        this.setOperands();
        ReadOnlyDataset.prototype.destroy.call(this);
      }
    });
    var SourceDataset = Class(ReadOnlyDataset, {
      className: namespace + ".SourceDataset",
      subscribeTo: SUBSCRIPTION.SOURCE,
      source: null,
      emit_sourceChanged: createEvent("sourceChanged", "oldSource"),
      sourceAdapter_: null,
      sourceMap_: null,
      listen: {
        source: {
          destroy: function() {
            if (!this.sourceAdapter_) this.setSource();
          }
        }
      },
      init: function() {
        this.sourceMap_ = {};
        ReadOnlyDataset.prototype.init.call(this);
        var source = this.source;
        if (source) {
          this.source = null;
          this.setSource(source);
        }
      },
      setSource: function(source) {
        source = basis.data.resolveDataset(this, this.setSource, source, "sourceAdapter_");
        if (this.source !== source) {
          var oldSource = this.source;
          var listenHandler = this.listen.source;
          this.source = source;
          if (listenHandler) {
            var itemsChangedHandler = listenHandler.itemsChanged;
            setAccumulateState(true);
            if (oldSource) {
              oldSource.removeHandler(listenHandler, this);
              if (itemsChangedHandler) itemsChangedHandler.call(this, oldSource, {
                deleted: oldSource.getItems()
              });
            }
            if (source) {
              source.addHandler(listenHandler, this);
              if (itemsChangedHandler) itemsChangedHandler.call(this, source, {
                inserted: source.getItems()
              });
            }
            setAccumulateState(false);
          }
          this.emit_sourceChanged(oldSource);
        }
      },
      destroy: function() {
        this.setSource();
        ReadOnlyDataset.prototype.destroy.call(this);
        this.sourceMap_ = null;
      }
    });
    var MAPFILTER_SOURCEOBJECT_UPDATE = function(sourceObject) {
      var newMember = this.map ? this.map(sourceObject) : object;
      if (newMember instanceof DataObject == false || this.filter(newMember)) newMember = null;
      var sourceMap = this.sourceMap_[sourceObject.basisObjectId];
      var curMember = sourceMap.member;
      if (curMember !== newMember) {
        var memberMap = this.members_;
        var delta;
        var inserted;
        var deleted;
        sourceMap.member = newMember;
        if (curMember) {
          var curMemberId = curMember.basisObjectId;
          if (this.removeMemberRef) this.removeMemberRef(curMember, sourceObject);
          if (--memberMap[curMemberId] == 0) {
            delete memberMap[curMemberId];
            deleted = [ curMember ];
          }
        }
        if (newMember) {
          var newMemberId = newMember.basisObjectId;
          if (this.addMemberRef) this.addMemberRef(newMember, sourceObject);
          if (memberMap[newMemberId]) {
            memberMap[newMemberId]++;
          } else {
            memberMap[newMemberId] = 1;
            inserted = [ newMember ];
          }
        }
        if (delta = getDelta(inserted, deleted)) this.emit_itemsChanged(delta);
      }
    };
    var MAPFILTER_SOURCE_HANDLER = {
      itemsChanged: function(source, delta) {
        var sourceMap = this.sourceMap_;
        var memberMap = this.members_;
        var inserted = [];
        var deleted = [];
        var sourceObject;
        var sourceObjectId;
        var member;
        var updateHandler = this.ruleEvents;
        setAccumulateState(true);
        if (delta.inserted) {
          for (var i = 0; sourceObject = delta.inserted[i]; i++) {
            member = this.map ? this.map(sourceObject) : sourceObject;
            if (member instanceof DataObject == false || this.filter(member)) member = null;
            if (updateHandler) sourceObject.addHandler(updateHandler, this);
            sourceMap[sourceObject.basisObjectId] = {
              sourceObject: sourceObject,
              member: member
            };
            if (member) {
              var memberId = member.basisObjectId;
              if (memberMap[memberId]) {
                memberMap[memberId]++;
              } else {
                memberMap[memberId] = 1;
                inserted.push(member);
              }
              if (this.addMemberRef) this.addMemberRef(member, sourceObject);
            }
          }
        }
        if (delta.deleted) {
          for (var i = 0; sourceObject = delta.deleted[i]; i++) {
            sourceObjectId = sourceObject.basisObjectId;
            member = sourceMap[sourceObjectId].member;
            if (updateHandler) sourceObject.removeHandler(updateHandler, this);
            delete sourceMap[sourceObjectId];
            if (member) {
              var memberId = member.basisObjectId;
              if (--memberMap[memberId] == 0) {
                delete memberMap[memberId];
                deleted.push(member);
              }
              if (this.removeMemberRef) this.removeMemberRef(member, sourceObject);
            }
          }
        }
        setAccumulateState(false);
        if (delta = getDelta(inserted, deleted)) this.emit_itemsChanged(delta);
      }
    };
    var MapFilter = Class(SourceDataset, {
      className: namespace + ".MapFilter",
      map: $self,
      filter: $false,
      rule: getter($true),
      emit_ruleChanged: createEvent("ruleChanged", "oldRule"),
      ruleEvents: createRuleEvents(MAPFILTER_SOURCEOBJECT_UPDATE, "update"),
      addMemberRef: null,
      removeMemberRef: null,
      listen: {
        source: MAPFILTER_SOURCE_HANDLER
      },
      setMap: function(map) {
        if (typeof map != "function") map = $self;
        if (this.map !== map) {
          this.map = map;
          return this.applyRule();
        }
      },
      setFilter: function(filter) {
        if (typeof filter != "function") filter = $false;
        if (this.filter !== filter) {
          this.filter = filter;
          return this.applyRule();
        }
      },
      setRule: function(rule) {
        rule = getter(rule || $true);
        if (this.rule !== rule) {
          var oldRule = this.rule;
          this.rule = rule;
          this.emit_ruleChanged(oldRule);
          return this.applyRule();
        }
      },
      applyRule: function() {
        var sourceMap = this.sourceMap_;
        var memberMap = this.members_;
        var curMember;
        var newMember;
        var curMemberId;
        var newMemberId;
        var sourceObject;
        var sourceObjectInfo;
        var inserted = [];
        var deleted = [];
        var delta;
        for (var sourceObjectId in sourceMap) {
          sourceObjectInfo = sourceMap[sourceObjectId];
          sourceObject = sourceObjectInfo.sourceObject;
          curMember = sourceObjectInfo.member;
          newMember = this.map ? this.map(sourceObject) : sourceObject;
          if (newMember instanceof DataObject == false || this.filter(newMember)) newMember = null;
          if (curMember != newMember) {
            sourceObjectInfo.member = newMember;
            if (curMember) {
              curMemberId = curMember.basisObjectId;
              if (this.removeMemberRef) this.removeMemberRef(curMember, sourceObject);
              memberMap[curMemberId]--;
            }
            if (newMember) {
              newMemberId = newMember.basisObjectId;
              if (this.addMemberRef) this.addMemberRef(newMember, sourceObject);
              if (newMemberId in memberMap) {
                memberMap[newMemberId]++;
              } else {
                memberMap[newMemberId] = 1;
                inserted.push(newMember);
              }
            }
          }
        }
        for (curMemberId in this.items_) if (memberMap[curMemberId] == 0) {
          delete memberMap[curMemberId];
          deleted.push(this.items_[curMemberId]);
        }
        if (delta = getDelta(inserted, deleted)) this.emit_itemsChanged(delta);
        return delta;
      }
    });
    var Filter = Class(MapFilter, {
      className: namespace + ".Filter",
      filter: function(object) {
        return !this.rule(object);
      }
    });
    var Split = Class(MapFilter, {
      className: namespace + ".Split",
      subsetClass: ReadOnlyDataset,
      subsetWrapperClass: DatasetWrapper,
      keyMap: null,
      map: function(sourceObject) {
        return this.keyMap.resolve(sourceObject);
      },
      rule: getter($undef),
      setRule: function(rule) {
        rule = getter(rule || $undef);
        if (this.rule !== rule) {
          var oldRule = this.rule;
          this.rule = rule;
          this.keyMap.keyGetter = rule;
          this.emit_ruleChanged(oldRule);
          return this.applyRule();
        }
      },
      addMemberRef: function(wrapper, sourceObject) {
        wrapper.dataset.emit_itemsChanged({
          inserted: [ sourceObject ]
        });
      },
      removeMemberRef: function(wrapper, sourceObject) {
        wrapper.dataset.emit_itemsChanged({
          deleted: [ sourceObject ]
        });
      },
      init: function() {
        if (!this.keyMap || this.keyMap instanceof KeyObjectMap == false) this.keyMap = createKeyMap(this.keyMap, this.rule, this.subsetWrapperClass, this.subsetClass);
        MapFilter.prototype.init.call(this);
      },
      getSubset: function(data, autocreate) {
        return this.keyMap.get(data, autocreate);
      },
      destroy: function() {
        MapFilter.prototype.destroy.call(this);
        this.keyMap.destroy();
        this.keyMap = null;
      }
    });
    function binarySearchPos(array, map) {
      if (!array.length) return 0;
      var value = map.value;
      var id = map.object.basisObjectId;
      var cmpValue;
      var cmpId;
      var pos;
      var item;
      var l = 0;
      var r = array.length - 1;
      do {
        pos = l + r >> 1;
        item = array[pos];
        cmpValue = item.value;
        if (value < cmpValue) r = pos - 1; else if (value > cmpValue) l = pos + 1; else {
          cmpId = item.object.basisObjectId;
          if (id < cmpId) r = pos - 1; else if (id > cmpId) l = pos + 1; else return pos;
        }
      } while (l <= r);
      return pos + (cmpValue == value ? cmpId < id : cmpValue < value);
    }
    var SLICE_SOURCEOBJECT_UPDATE = function(sourceObject) {
      var sourceObjectInfo = this.sourceMap_[sourceObject.basisObjectId];
      var newValue = this.rule(sourceObject);
      var index = this.index_;
      if (newValue !== sourceObjectInfo.value) {
        var pos = binarySearchPos(index, sourceObjectInfo);
        var prev = index[pos - 1];
        var next = index[pos + 1];
        sourceObjectInfo.value = newValue;
        if (prev && (prev.value > newValue || prev.value == newValue && prev.object.basisObjectId > sourceObjectInfo.object.basisObjectId) || next && (next.value < newValue || next.value == newValue && next.object.basisObjectId < sourceObjectInfo.object.basisObjectId)) {
          index.splice(pos, 1);
          index.splice(binarySearchPos(index, sourceObjectInfo), 0, sourceObjectInfo);
          this.applyRule();
        }
      }
    };
    function sliceIndexSort(a, b) {
      return +(a.value > b.value) || -(a.value < b.value) || a.object.basisObjectId - b.object.basisObjectId;
    }
    var SLICE_SOURCE_HANDLER = {
      itemsChanged: function(source, delta) {
        var sourceMap = this.sourceMap_;
        var index = this.index_;
        var updateHandler = this.ruleEvents;
        var dropIndex = false;
        var buildIndex = false;
        var sourceObjectInfo;
        var inserted = delta.inserted;
        var deleted = delta.deleted;
        if (deleted) {
          if (deleted.length > index.length - deleted.length) {
            dropIndex = true;
            buildIndex = deleted.length != index.length;
            index.length = 0;
          }
          for (var i = 0, sourceObject; sourceObject = deleted[i]; i++) {
            if (!dropIndex) {
              sourceObjectInfo = sourceMap[sourceObject.basisObjectId];
              index.splice(binarySearchPos(index, sourceObjectInfo), 1);
            }
            delete sourceMap[sourceObject.basisObjectId];
            if (updateHandler) sourceObject.removeHandler(updateHandler, this);
          }
          if (buildIndex) for (var key in sourceMap) {
            sourceObjectInfo = sourceMap[key];
            index.splice(binarySearchPos(index, sourceObjectInfo), 0, sourceObjectInfo);
          }
        }
        if (inserted) {
          buildIndex = !index.length;
          for (var i = 0, sourceObject; sourceObject = inserted[i]; i++) {
            sourceObjectInfo = {
              object: sourceObject,
              value: this.rule(sourceObject)
            };
            sourceMap[sourceObject.basisObjectId] = sourceObjectInfo;
            if (!buildIndex) index.splice(binarySearchPos(index, sourceObjectInfo), 0, sourceObjectInfo); else index.push(sourceObjectInfo);
            if (updateHandler) sourceObject.addHandler(updateHandler, this);
          }
          if (buildIndex) index.sort(sliceIndexSort);
        }
        this.applyRule();
      }
    };
    var Slice = Class(SourceDataset, {
      className: namespace + ".Slice",
      rule: getter($true),
      emit_ruleChanged: createEvent("ruleChanged", "oldRule", "oldOrderDesc"),
      ruleEvents: createRuleEvents(SLICE_SOURCEOBJECT_UPDATE, "update"),
      index_: null,
      orderDesc: false,
      offset: 0,
      limit: 10,
      listen: {
        source: SLICE_SOURCE_HANDLER
      },
      emit_rangeChanged: createEvent("rangeChanged", "oldOffset", "oldLimit"),
      init: function() {
        this.index_ = [];
        SourceDataset.prototype.init.call(this);
      },
      setRange: function(offset, limit) {
        var oldOffset = this.offset;
        var oldLimit = this.limit;
        var delta = false;
        if (oldOffset != offset || oldLimit != limit) {
          this.offset = offset;
          this.limit = limit;
          delta = this.applyRule();
          this.emit_rangeChanged(oldOffset, oldLimit);
        }
        return delta;
      },
      setOffset: function(offset) {
        return this.setRange(offset, this.limit);
      },
      setLimit: function(limit) {
        return this.setRange(this.offset, limit);
      },
      setRule: function(rule, orderDesc) {
        rule = getter(rule || $true);
        orderDesc = !!orderDesc;
        if (this.rule != rule || this.orderDesc != orderDesc) {
          var oldRule = this.rule;
          var oldOrderDesc = this.orderDesc;
          if (this.rule != rule) {
            var index = this.index_;
            for (var i = 0; i < index.length; i++) index[i].value = rule(index[i].object);
            index.sort(sliceIndexSort);
            this.rule = rule;
          }
          this.orderDesc = orderDesc;
          this.rule = rule;
          this.emit_ruleChanged(oldRule, oldOrderDesc);
          return this.applyRule();
        }
      },
      applyRule: function() {
        var start = this.offset;
        var end = start + this.limit;
        if (this.orderDesc) {
          start = this.index_.length - end;
          end = start + this.limit;
        }
        var curSet = basis.object.slice(this.members_);
        var newSet = this.index_.slice(Math.max(0, start), Math.max(0, end));
        var inserted = [];
        var delta;
        for (var i = 0, item; item = newSet[i]; i++) {
          var objectId = item.object.basisObjectId;
          if (curSet[objectId]) delete curSet[objectId]; else {
            inserted.push(item.object);
            this.members_[objectId] = item.object;
          }
        }
        for (var objectId in curSet) delete this.members_[objectId];
        if (delta = getDelta(inserted, values(curSet))) this.emit_itemsChanged(delta);
        return delta;
      },
      destroy: function() {
        SourceDataset.prototype.destroy.call(this);
        this.index_ = null;
      }
    });
    var CLOUD_SOURCEOBJECT_UPDATE = function(sourceObject) {
      var sourceMap = this.sourceMap_;
      var memberMap = this.members_;
      var sourceObjectId = sourceObject.basisObjectId;
      var oldList = sourceMap[sourceObjectId].list;
      var newList = sourceMap[sourceObjectId].list = {};
      var list = this.rule(sourceObject);
      var delta;
      var inserted = [];
      var deleted = [];
      var subset;
      if (Array.isArray(list)) for (var j = 0; j < list.length; j++) {
        subset = this.keyMap.get(list[j], true);
        if (subset && !subset.has(sourceObject)) {
          subsetId = subset.basisObjectId;
          newList[subsetId] = subset;
          if (!oldList[subsetId]) {
            subset.dataset.emit_itemsChanged({
              inserted: [ sourceObject ]
            });
            if (!memberMap[subsetId]) {
              inserted.push(subset);
              memberMap[subsetId] = 1;
            } else memberMap[subsetId]++;
          }
        }
      }
      for (var subsetId in oldList) if (!newList[subsetId]) {
        var subset = oldList[subsetId];
        subset.dataset.emit_itemsChanged({
          deleted: [ sourceObject ]
        });
        if (!--memberMap[subsetId]) {
          delete memberMap[subsetId];
          deleted.push(subset);
        }
      }
      if (delta = getDelta(inserted, deleted)) this.emit_itemsChanged(delta);
    };
    var CLOUD_SOURCE_HANDLER = {
      itemsChanged: function(dataset, delta) {
        var sourceMap = this.sourceMap_;
        var memberMap = this.members_;
        var updateHandler = this.ruleEvents;
        var array;
        var subset;
        var subsetId;
        var inserted = [];
        var deleted = [];
        setAccumulateState(true);
        if (array = delta.inserted) for (var i = 0, sourceObject; sourceObject = array[i]; i++) {
          var list = this.rule(sourceObject);
          var sourceObjectInfo = {
            object: sourceObject,
            list: {}
          };
          sourceMap[sourceObject.basisObjectId] = sourceObjectInfo;
          if (Array.isArray(list)) for (var j = 0, dupFilter = {}; j < list.length; j++) {
            subset = this.keyMap.get(list[j], true);
            if (subset && !dupFilter[subset.basisObjectId]) {
              subsetId = subset.basisObjectId;
              dupFilter[subsetId] = true;
              sourceObjectInfo.list[subsetId] = subset;
              subset.dataset.emit_itemsChanged({
                inserted: [ sourceObject ]
              });
              if (!memberMap[subsetId]) {
                inserted.push(subset);
                memberMap[subsetId] = 1;
              } else memberMap[subsetId]++;
            }
          }
          if (updateHandler) sourceObject.addHandler(updateHandler, this);
        }
        if (array = delta.deleted) for (var i = 0, sourceObject; sourceObject = array[i]; i++) {
          var sourceObjectId = sourceObject.basisObjectId;
          var list = sourceMap[sourceObjectId].list;
          delete sourceMap[sourceObjectId];
          for (var subsetId in list) {
            subset = list[subsetId];
            subset.dataset.emit_itemsChanged({
              deleted: [ sourceObject ]
            });
            if (!--memberMap[subsetId]) {
              delete memberMap[subsetId];
              deleted.push(subset);
            }
          }
          if (updateHandler) sourceObject.removeHandler(updateHandler, this);
        }
        setAccumulateState(false);
        if (delta = getDelta(inserted, deleted)) this.emit_itemsChanged(delta);
      }
    };
    var Cloud = Class(SourceDataset, {
      className: namespace + ".Cloud",
      subsetClass: ReadOnlyDataset,
      subsetWrapperClass: DatasetWrapper,
      rule: getter($undef),
      ruleEvents: createRuleEvents(CLOUD_SOURCEOBJECT_UPDATE, "update"),
      keyMap: null,
      map: $self,
      listen: {
        source: CLOUD_SOURCE_HANDLER
      },
      init: function() {
        if (!this.keyMap || this.keyMap instanceof KeyObjectMap == false) this.keyMap = createKeyMap(this.keyMap, this.rule, this.subsetWrapperClass, this.subsetClass);
        SourceDataset.prototype.init.call(this);
      },
      getSubset: function(data, autocreate) {
        return this.keyMap.get(data, autocreate);
      },
      destroy: function() {
        SourceDataset.prototype.destroy.call(this);
        this.keyMap.destroy();
        this.keyMap = null;
      }
    });
    var EXTRACT_SOURCEOBJECT_UPDATE = function(sourceObject) {
      var sourceObjectInfo = this.sourceMap_[sourceObject.basisObjectId];
      var newValue = this.rule(sourceObject) || null;
      var oldValue = sourceObjectInfo.value;
      var inserted;
      var deleted;
      var delta;
      if (newValue === oldValue) return;
      if (newValue instanceof DataObject || newValue instanceof ReadOnlyDataset) inserted = addToExtract(this, newValue, sourceObject);
      if (oldValue) deleted = removeFromExtract(this, oldValue, sourceObject);
      sourceObjectInfo.value = newValue;
      if (delta = getDelta(inserted, deleted)) this.emit_itemsChanged(delta);
    };
    var EXTRACT_DATASET_ITEMSCHANGED = function(dataset, delta) {
      var inserted = delta.inserted;
      var deleted = delta.deleted;
      var delta;
      if (inserted) inserted = addToExtract(this, inserted, dataset);
      if (deleted) deleted = removeFromExtract(this, deleted, dataset);
      if (delta = getDelta(inserted, deleted)) this.emit_itemsChanged(delta);
    };
    var EXTRACT_DATASET_HANDLER = {
      itemsChanged: EXTRACT_DATASET_ITEMSCHANGED,
      destroy: function(dataset) {
        var sourceMap = this.sourceMap_;
        for (var cursor = sourceMap[dataset.basisObjectId]; cursor = cursor.ref; ) sourceMap[cursor.object.basisObjectId].value = null;
        delete sourceMap[dataset.basisObjectId];
      }
    };
    function hasExtractSourceRef(extract, object, marker) {
      var sourceObjectInfo = extract.sourceMap_[object.basisObjectId];
      if (sourceObjectInfo && sourceObjectInfo.visited !== marker) {
        for (var cursor = sourceObjectInfo; cursor = cursor.ref; ) if (cursor.object === extract.source) return true;
        sourceObjectInfo.visited = marker;
        for (var cursor = sourceObjectInfo; cursor = cursor.ref; ) if (hasExtractSourceRef(extract, cursor.object, marker || {})) return true;
      }
    }
    function addToExtract(extract, items, ref) {
      var sourceMap = extract.sourceMap_;
      var members = extract.members_;
      var queue = arrayFrom(items);
      var inserted = [];
      for (var i = 0; i < queue.length; i++) {
        var item = queue[i];
        var sourceObjectId = item.basisObjectId;
        if (!sourceObjectId) {
          ref = item.ref;
          item = item.object;
          sourceObjectId = item.basisObjectId;
        }
        var sourceObjectInfo = sourceMap[sourceObjectId];
        if (sourceObjectInfo) {
          sourceObjectInfo.ref = {
            object: ref,
            ref: sourceObjectInfo.ref
          };
        } else {
          sourceObjectInfo = sourceMap[sourceObjectId] = {
            source: item,
            ref: {
              object: ref,
              ref: null
            },
            visited: null,
            value: null
          };
          if (item instanceof DataObject) {
            var value = extract.rule(item) || null;
            if (value instanceof DataObject || value instanceof ReadOnlyDataset) {
              sourceObjectInfo.value = value;
              queue.push({
                object: value,
                ref: item
              });
            }
            members[sourceObjectId] = sourceObjectInfo;
            inserted.push(item);
            if (extract.ruleEvents) item.addHandler(extract.ruleEvents, extract);
          } else {
            item.addHandler(EXTRACT_DATASET_HANDLER, extract);
            for (var j = 0, datasetItems = item.getItems(); j < datasetItems.length; j++) queue.push({
              object: datasetItems[j],
              ref: item
            });
          }
        }
      }
      return inserted;
    }
    function removeFromExtract(extract, items, ref) {
      var sourceMap = extract.sourceMap_;
      var members = extract.members_;
      var queue = arrayFrom(items);
      var deleted = [];
      for (var i = 0; i < queue.length; i++) {
        var item = queue[i];
        var sourceObjectId = item.basisObjectId;
        if (!sourceObjectId) {
          ref = item.ref;
          item = item.object;
          sourceObjectId = item.basisObjectId;
        }
        var sourceObjectInfo = sourceMap[sourceObjectId];
        var sourceObjectValue = sourceObjectInfo.value;
        for (var cursor = sourceObjectInfo, prevCursor = sourceObjectInfo; cursor = cursor.ref; ) {
          if (cursor.object === ref) {
            prevCursor.ref = cursor.ref;
            break;
          }
          prevCursor = cursor;
        }
        if (!sourceObjectInfo.ref) {
          if (item instanceof DataObject) {
            delete members[sourceObjectId];
            deleted.push(item);
            if (extract.ruleEvents) item.removeHandler(extract.ruleEvents, extract);
            if (sourceObjectValue) queue.push({
              object: sourceObjectValue,
              ref: item
            });
          } else {
            item.removeHandler(EXTRACT_DATASET_HANDLER, extract);
            for (var j = 0, datasetItems = item.getItems(); j < datasetItems.length; j++) queue.push({
              object: datasetItems[j],
              ref: item
            });
          }
          delete sourceMap[sourceObjectId];
        } else {
          if (sourceObjectValue && !hasExtractSourceRef(extract, item)) {
            sourceObjectInfo.value = null;
            queue.push({
              object: sourceObjectValue,
              ref: item
            });
          }
        }
      }
      return deleted;
    }
    var Extract = SourceDataset.subclass({
      className: namespace + ".Extract",
      rule: getter($undef),
      emit_ruleChanged: createEvent("ruleChanged", "oldRule"),
      ruleEvents: createRuleEvents(EXTRACT_SOURCEOBJECT_UPDATE, "update"),
      listen: {
        source: {
          itemsChanged: EXTRACT_DATASET_ITEMSCHANGED
        }
      },
      setRule: function(rule) {
        rule = getter(rule || $undef);
        if (this.rule !== rule) {
          var oldRule = this.rule;
          this.rule = rule;
          this.emit_ruleChanged(oldRule);
          return this.applyRule();
        }
      },
      applyRule: function() {
        var insertedMap = {};
        var deletedMap = {};
        var array;
        var delta;
        for (var key in this.sourceMap_) {
          var sourceObjectInfo = this.sourceMap_[key];
          var sourceObject = sourceObjectInfo.source;
          if (sourceObject instanceof DataObject) {
            var newValue = this.rule(sourceObject) || null;
            var oldValue = sourceObjectInfo.value;
            if (newValue === oldValue) continue;
            if (newValue instanceof DataObject || newValue instanceof ReadOnlyDataset) {
              var inserted = addToExtract(this, newValue, sourceObject);
              for (var i = 0; i < inserted.length; i++) {
                var item = inserted[i];
                var id = item.basisObjectId;
                if (deletedMap[id]) delete deletedMap[id]; else insertedMap[id] = item;
              }
            }
            if (oldValue) {
              var deleted = removeFromExtract(this, oldValue, sourceObject);
              for (var i = 0; i < deleted.length; i++) {
                var item = deleted[i];
                var id = item.basisObjectId;
                if (insertedMap[id]) delete insertedMap[id]; else deletedMap[id] = item;
              }
            }
            sourceObjectInfo.value = newValue;
          }
        }
        if (delta = getDelta(values(insertedMap), values(deletedMap))) this.emit_itemsChanged(delta);
        return delta;
      }
    });
    module.exports = {
      getDelta: getDelta,
      createRuleEvents: createRuleEvents,
      Merge: Merge,
      Subtract: Subtract,
      SourceDataset: SourceDataset,
      MapFilter: MapFilter,
      Filter: Filter,
      Split: Split,
      Extract: Extract,
      Slice: Slice,
      Cloud: Cloud
    };
  },
  "0.js": function(exports, module, basis, global, __filename, __dirname, require, resource) {
    basis.require("./1.js");
    basis.require("./a.js");
    basis.require("./d.js");
    basis.require("./e.js");
    basis.require("./f.js");
    basis.require("./g.js");
    basis.require("./h.js");
    basis.require("./i.js");
    basis.require("./k.js");
    basis.require("./n.js");
    basis.require("./o.js");
    basis.require("./p.js");
    global["basis"] = basis;
  },
  "2.js": function(exports, module, basis, global, __filename, __dirname, require, resource) {
    basis.require("./3.js");
    var namespace = this.path;
    var Class = basis.Class;
    var Emitter = basis.event.Emitter;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    basis.resource.extensions[".l10n"] = function(content, url) {
      return resolveDictionary(url).update(basis.resource.extensions[".json"](content, url));
    };
    function ownKeys(object) {
      var result = [];
      for (var key in object) if (hasOwnProperty.call(object, key)) result.push(key);
      return result;
    }
    var tokenIndex = [];
    var tokenComputeFn = {};
    var tokenComputes = {};
    var updateToken = basis.Token.prototype.set;
    var ComputeToken = Class(basis.Token, {
      className: namespace + ".ComputeToken",
      init: function(value, token) {
        token.computeTokens[this.basisObjectId] = this;
        this.token = token;
        basis.Token.prototype.init.call(this, value);
      },
      get: function() {
        var key = this.token.type == "plural" ? cultures[currentCulture].plural(this.value) : this.value;
        return this.token.dictionary.getValue(this.token.name + "." + key);
      },
      toString: function() {
        return this.get();
      },
      destroy: function() {
        delete this.token.computeTokens[this.basisObjectId];
        this.token = null;
        basis.Token.prototype.destroy.call(this);
      }
    });
    var Token = Class(basis.Token, {
      className: namespace + ".Token",
      index: NaN,
      dictionary: null,
      name: "",
      type: "default",
      computeTokens: null,
      init: function(dictionary, tokenName, type, value) {
        basis.Token.prototype.init.call(this, value);
        this.index = tokenIndex.push(this) - 1;
        this.name = tokenName;
        this.dictionary = dictionary;
        this.computeTokens = {};
        if (type) this.setType(type); else this.apply();
      },
      toString: function() {
        return this.get();
      },
      apply: function() {
        for (var key in this.computeTokens) this.computeTokens[key].apply();
        basis.Token.prototype.apply.call(this);
      },
      set: function() {
        basis.dev.warn("basis.l10n: Value for l10n token can't be set directly, but through dictionary update only");
      },
      setType: function(type) {
        if (type != "plural" && (!basis.l10n.enableMarkup || type != "markup")) type = "default";
        if (this.type != type) {
          this.type = type;
          this.apply();
        }
      },
      compute: function(events, getter) {
        if (arguments.length == 1) {
          getter = events;
          events = "";
        }
        getter = basis.getter(getter);
        events = String(events).trim().split(/\s+|\s*,\s*/).sort();
        var tokenId = this.basisObjectId;
        var enumId = events.concat(tokenId, getter[basis.getter.ID]).join("_");
        if (tokenComputeFn[enumId]) return tokenComputeFn[enumId];
        var token = this;
        var objectTokenMap = {};
        var updateValue = function(object) {
          updateToken.call(this, getter(object));
        };
        var handler = {
          destroy: function(object) {
            delete objectTokenMap[object.basisObjectId];
            this.destroy();
          }
        };
        for (var i = 0, eventName; eventName = events[i]; i++) if (eventName != "destroy") handler[eventName] = updateValue;
        return tokenComputeFn[enumId] = function(object) {
          if (object instanceof Emitter == false) throw "basis.l10n.Token#compute: object must be an instanceof Emitter";
          var objectId = object.basisObjectId;
          var computeToken = objectTokenMap[objectId];
          if (!computeToken) {
            computeToken = objectTokenMap[objectId] = new ComputeToken(getter(object), token);
            object.addHandler(handler, computeToken);
          }
          return computeToken;
        };
      },
      computeToken: function(value) {
        return new ComputeToken(value, this);
      },
      token: function(name) {
        if (this.type == "plural") name = cultures[currentCulture].plural(name);
        if (this.dictionary) return this.dictionary.token(this.name + "." + name);
      },
      destroy: function() {
        for (var key in this.computeTokens) this.computeTokens[key].destroy();
        this.computeTokens = null;
        this.value = null;
        basis.Token.prototype.destroy.call(this);
      }
    });
    function resolveToken(path) {
      if (path.charAt(0) == "#") {
        return tokenIndex[parseInt(path.substr(1), 36)];
      } else {
        var parts = path.match(/^(.+?)@(.+)$/);
        if (parts) return resolveDictionary(basis.path.resolve(parts[2])).token(parts[1]);
        basis.dev.warn("basis.l10n.token accepts token references in format `token.path@path/to/dict.l10n` only");
      }
    }
    var dictionaries = [];
    var dictionaryByUrl = {};
    var createDictionaryNotifier = new basis.Token;
    function walkTokens(dictionary, culture, tokens, path) {
      var cultureValues = dictionary.cultureValues[culture];
      path = path ? path + "." : "";
      for (var name in tokens) if (hasOwnProperty.call(tokens, name)) {
        var tokenName = path + name;
        var tokenValue = tokens[name];
        cultureValues[tokenName] = tokenValue;
        if (tokenValue && (typeof tokenValue == "object" || Array.isArray(tokenValue))) walkTokens(dictionary, culture, tokenValue, tokenName);
      }
    }
    var Dictionary = Class(null, {
      className: namespace + ".Dictionary",
      tokens: null,
      types: null,
      cultureValues: null,
      index: NaN,
      resource: null,
      init: function(content) {
        this.tokens = {};
        this.types = {};
        this.cultureValues = {};
        this.index = dictionaries.push(this) - 1;
        if (basis.resource.isResource(content)) {
          var resource = content;
          this.resource = resource;
          if (!dictionaryByUrl[resource.url]) {
            dictionaryByUrl[resource.url] = this;
            createDictionaryNotifier.set(resource.url);
          }
          resource.fetch();
        } else {
          basis.dev.warn("Use object as content of dictionary is experimental and not production-ready");
          this.update(content || {});
        }
      },
      update: function(data) {
        if (!data) data = {};
        this.cultureValues = {};
        for (var culture in data) if (!/^_|_$/.test(culture)) {
          this.cultureValues[culture] = {};
          walkTokens(this, culture, data[culture]);
        }
        this.types = data._meta && data._meta.type || {};
        for (var key in this.tokens) this.tokens[key].setType(this.types[key]);
        this.syncValues();
        return this;
      },
      syncValues: function() {
        for (var tokenName in this.tokens) updateToken.call(this.tokens[tokenName], this.getValue(tokenName));
      },
      getValue: function(tokenName) {
        var fallback = cultureFallback[currentCulture] || [];
        for (var i = 0, cultureName; cultureName = fallback[i]; i++) {
          var cultureValues = this.cultureValues[cultureName];
          if (cultureValues && tokenName in cultureValues) return cultureValues[tokenName];
        }
      },
      getCultureValue: function(culture, tokenName) {
        return this.cultureValues[culture] && this.cultureValues[culture][tokenName];
      },
      token: function(tokenName) {
        var token = this.tokens[tokenName];
        if (!token) {
          token = this.tokens[tokenName] = new Token(this, tokenName, this.types[tokenName], this.getValue(tokenName));
        }
        return token;
      },
      destroy: function() {
        this.tokens = null;
        this.cultureValues = null;
        basis.array.remove(dictionaries, this);
        if (this.resource) {
          delete dictionaryByUrl[this.resource.url];
          this.resource = null;
        }
      }
    });
    function resolveDictionary(source) {
      var dictionary;
      if (typeof source == "string") {
        var location = source;
        var extname = basis.path.extname(location);
        if (extname != ".l10n") location = basis.path.dirname(location) + "/" + basis.path.basename(location, extname) + ".l10n";
        source = basis.resource(location);
      }
      if (basis.resource.isResource(source)) dictionary = dictionaryByUrl[source.url];
      return dictionary || new Dictionary(source);
    }
    function getDictionaries() {
      return dictionaries.slice(0);
    }
    var cultureList = [];
    var currentCulture = null;
    var cultures = {};
    var cultureFallback = {};
    var pluralFormsMap = {};
    var pluralForms = [ [ 1, function(n) {
      return 0;
    } ], [ 2, function(n) {
      return n == 1 || n % 10 == 1 ? 0 : 1;
    } ], [ 2, function(n) {
      return n == 0 ? 0 : 1;
    } ], [ 2, function(n) {
      return n == 1 ? 0 : 1;
    } ], [ 2, function(n) {
      return n == 0 || n == 1 ? 0 : 1;
    } ], [ 2, function(n) {
      return n % 10 != 1 || n % 100 == 11 ? 1 : 0;
    } ], [ 3, function(n) {
      return n == 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
    } ], [ 3, function(n) {
      return n % 10 == 1 && n % 100 != 11 ? 0 : n != 0 ? 1 : 2;
    } ], [ 3, function(n) {
      return n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
    } ], [ 3, function(n) {
      return n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
    } ], [ 3, function(n) {
      return n == 0 ? 0 : n == 1 ? 1 : 2;
    } ], [ 3, function(n) {
      return n == 1 ? 0 : n == 0 || n % 100 > 0 && n % 100 < 20 ? 1 : 2;
    } ], [ 3, function(n) {
      return n == 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
    } ], [ 3, function(n) {
      return n == 1 ? 0 : n >= 2 && n <= 4 ? 1 : 2;
    } ], [ 4, function(n) {
      return n == 1 ? 0 : n == 2 ? 1 : n != 8 && n != 11 ? 2 : 3;
    } ], [ 4, function(n) {
      return n == 1 ? 0 : n == 2 ? 1 : n == 3 ? 2 : 3;
    } ], [ 4, function(n) {
      return n % 100 == 1 ? 1 : n % 100 == 2 ? 2 : n % 100 == 3 || n % 100 == 4 ? 3 : 0;
    } ], [ 4, function(n) {
      return n == 1 ? 0 : n == 0 || n % 100 > 1 && n % 100 < 11 ? 1 : n % 100 > 10 && n % 100 < 20 ? 2 : 3;
    } ], [ 4, function(n) {
      return n == 1 || n == 11 ? 0 : n == 2 || n == 12 ? 1 : n > 2 && n < 20 ? 2 : 3;
    } ], [ 5, function(n) {
      return n == 1 ? 0 : n == 2 ? 1 : n < 7 ? 2 : n < 11 ? 3 : 4;
    } ], [ 6, function(n) {
      return n == 0 ? 0 : n == 1 ? 1 : n == 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5;
    } ] ];
    [ "ay bo cgg dz fa id ja jbo ka kk km ko ky lo ms my sah su th tt ug vi wo zh", "mk", "jv", "af an ast az bg bn brx ca da de doi el en eo es es-AR et eu ff fi fo fur fy gl gu ha he hi hne hu hy ia it kn ku lb mai ml mn mni mr nah nap nb ne nl nn no nso or pa pap pms ps pt rm rw sat sco sd se si so son sq sv sw ta te tk ur yo", "ach ak am arn br fil fr gun ln mfe mg mi oc pt-BR tg ti tr uz wa zh", "is", "csb", "lv", "lt", "be bs hr ru sr uk", "mnk", "ro", "pl", "cs sk", "cy", "kw", "sl", "mt", "gd", "ga", "ar" ].forEach(function(langs, idx) {
      langs.split(" ").forEach(function(lang) {
        pluralFormsMap[lang] = this;
      }, pluralForms[idx]);
    });
    var Culture = basis.Class(null, {
      className: namespace + ".Culture",
      name: "",
      pluralForm: null,
      init: function(name, pluralForm) {
        this.name = name;
        if (!cultures[name]) cultures[name] = this;
        this.pluralForm = pluralForm || pluralFormsMap[name] || pluralFormsMap[name.split("-")[0]] || pluralForms[0];
      },
      plural: function(value) {
        return Number(this.pluralForm[1](Math.abs(parseInt(value, 10))));
      }
    });
    function resolveCulture(name, pluralForm) {
      if (name && !cultures[name]) cultures[name] = new Culture(name, pluralForm);
      return cultures[name || currentCulture];
    }
    basis.object.extend(resolveCulture, new basis.Token);
    resolveCulture.set = setCulture;
    function getCulture() {
      return currentCulture;
    }
    function setCulture(culture) {
      if (!culture) return;
      if (currentCulture != culture) {
        if (cultureList.indexOf(culture) == -1) {
          basis.dev.warn("basis.l10n.setCulture: culture `" + culture + "` not in the list, the culture isn't changed");
          return;
        }
        currentCulture = culture;
        for (var i = 0, dictionary; dictionary = dictionaries[i]; i++) dictionary.syncValues();
        basis.Token.prototype.set.call(resolveCulture, culture);
      }
    }
    function getCultureList() {
      return cultureList.slice(0);
    }
    function setCultureList(list) {
      if (typeof list == "string") list = list.trim().split(" ");
      if (!list.length) {
        basis.dev.warn("basis.l10n.setCultureList: culture list can't be empty, the culture list isn't changed");
        return;
      }
      var cultures = {};
      var cultureRow;
      var baseCulture;
      cultureFallback = {};
      for (var i = 0, culture, cultureName; culture = list[i]; i++) {
        cultureRow = culture.split("/");
        if (cultureRow.length > 2) {
          basis.dev.warn("basis.l10n.setCultureList: only one fallback culture can be set for certain culture, try to set `" + culture + "`; other cultures except first one was ignored");
          cultureRow = cultureRow.slice(0, 2);
        }
        cultureName = cultureRow[0];
        if (!baseCulture) baseCulture = cultureName;
        cultures[cultureName] = resolveCulture(cultureName);
        cultureFallback[cultureName] = cultureRow;
      }
      for (var cultureName in cultureFallback) {
        cultureFallback[cultureName] = basis.array.flatten(cultureFallback[cultureName].map(function(name) {
          return cultureFallback[name];
        })).concat(baseCulture).filter(function(item, idx, array) {
          return !idx || array.lastIndexOf(item, idx - 1) == -1;
        });
      }
      cultureList = basis.object.keys(cultures);
      if (currentCulture in cultures == false) setCulture(baseCulture);
    }
    function onCultureChange(fn, context, fire) {
      resolveCulture.attach(fn, context);
      if (fire) fn.call(context, currentCulture);
    }
    setCultureList("en-US");
    setCulture("en-US");
    module.exports = {
      ComputeToken: ComputeToken,
      Token: Token,
      token: resolveToken,
      Dictionary: Dictionary,
      dictionary: resolveDictionary,
      getDictionaries: getDictionaries,
      addCreateDictionaryHandler: createDictionaryNotifier.attach.bind(createDictionaryNotifier),
      removeCreateDictionaryHandler: createDictionaryNotifier.detach.bind(createDictionaryNotifier),
      Culture: Culture,
      culture: resolveCulture,
      getCulture: getCulture,
      setCulture: setCulture,
      getCultureList: getCultureList,
      setCultureList: setCultureList,
      pluralForms: pluralForms,
      onCultureChange: onCultureChange
    };
  },
  "3.js": function(exports, module, basis, global, __filename, __dirname, require, resource) {
    var namespace = this.path;
    var Class = basis.Class;
    var extend = basis.object.extend;
    var slice = Array.prototype.slice;
    var NULL_HANDLER = {};
    var events = {};
    var warnOnDestroy = function() {
      basis.dev.warn("Object had been destroyed before. Destroy method must not be called more than once.");
    };
    function createDispatcher(eventName) {
      var eventFunction = events[eventName];
      if (!eventFunction) {
        eventFunction = function() {
          var cursor = this;
          var args;
          var fn;
          while (cursor = cursor.handler) {
            fn = cursor.callbacks[eventName];
            if (typeof fn == "function") {
              if (!args) {
                args = [ this ];
                for (var i = 0; i < arguments.length; i++) args.push(arguments[i]);
              }
              fn.apply(cursor.context || this, args);
            }
            fn = cursor.callbacks["*"];
            if (typeof fn == "function") {
              if (!args) {
                args = [ this ];
                for (var i = 0; i < arguments.length; i++) args.push(arguments[i]);
              }
              fn.call(cursor.context || this, {
                sender: this,
                type: eventName,
                args: args
              });
            }
          }
          if (this.debug_emit) {
            args = [];
            for (var i = 0; i < arguments.length; i++) args.push(arguments[i]);
            this.debug_emit({
              sender: this,
              type: eventName,
              args: args
            });
          }
        };
        eventFunction = (new Function("slice", 'return {"' + namespace + ".events." + eventName + '":\n\n      ' + "function(" + slice.call(arguments, 1).join(", ") + "){" + eventFunction.toString().replace(/\beventName\b/g, '"' + eventName + '"').replace(/^function[^(]*\(\)[^{]*\{|\}$/g, "") + "}" + '\n\n}["' + namespace + ".events." + eventName + '"];'))(slice);
        events[eventName] = eventFunction;
      }
      return eventFunction;
    }
    function createHandler(events, eventCallback) {
      var handler = {
        events: []
      };
      if (events) {
        events = String(events).trim().split(/\s+|\s*,\s*/).sort();
        handler = {
          events: events
        };
        for (var i = 0, eventName; eventName = events[i]; i++) if (eventName != "destroy") handler[eventName] = eventCallback;
      }
      return handler;
    }
    var Emitter = Class(null, {
      className: namespace + ".Emitter",
      extendConstructor_: true,
      handler: null,
      emit_destroy: createDispatcher("destroy"),
      listen: Class.nestedExtendProperty(),
      debug_handlers: function() {
        var result = [];
        var cursor = this;
        while (cursor = cursor.handler) result.push([ cursor.callbacks, cursor.context ]);
        return result;
      },
      debug_emit: null,
      init: function() {
        if (this.handler && !this.handler.callbacks) this.handler = {
          callbacks: this.handler,
          context: this,
          handler: null
        };
      },
      addHandler: function(callbacks, context) {
        if (!callbacks) basis.dev.warn(namespace + ".Emitter#addHandler: callbacks is not an object (", callbacks, ")");
        context = context || this;
        var cursor = this;
        while (cursor = cursor.handler) {
          if (cursor.callbacks === callbacks && cursor.context === context) {
            basis.dev.warn(namespace + ".Emitter#addHandler: add duplicate event callbacks", callbacks, "to Emitter instance:", this);
            break;
          }
        }
        this.handler = {
          callbacks: callbacks,
          context: context,
          handler: this.handler
        };
      },
      removeHandler: function(callbacks, context) {
        var cursor = this;
        var prev;
        context = context || this;
        while (prev = cursor, cursor = cursor.handler) if (cursor.callbacks === callbacks && cursor.context === context) {
          cursor.callbacks = NULL_HANDLER;
          prev.handler = cursor.handler;
          return;
        }
        basis.dev.warn(namespace + ".Emitter#removeHandler: no handler removed");
      },
      destroy: function() {
        this.destroy = warnOnDestroy;
        this.emit_destroy();
        this.handler = null;
      }
    });
    module.exports = {
      create: createDispatcher,
      createHandler: createHandler,
      events: events,
      Emitter: Emitter
    };
  },
  "4.js": function(exports, module, basis, global, __filename, __dirname, require, resource) {
    basis.require("./3.js");
    var namespace = this.path;
    var Class = basis.Class;
    var sliceArray = Array.prototype.slice;
    var values = basis.object.values;
    var $self = basis.fn.$self;
    var Emitter = basis.event.Emitter;
    var createEvent = basis.event.create;
    var events = basis.event.events;
    var NULL_OBJECT = {};
    var EMPTY_ARRAY = [];
    var STATE_EXISTS = {};
    var STATE = {
      priority: [],
      values: {},
      add: function(state, order) {
        var name = state;
        var value = state.toLowerCase();
        STATE[name] = value;
        STATE_EXISTS[value] = name;
        this.values[value] = name;
        if (order) order = this.priority.indexOf(order); else order = -1;
        if (order == -1) this.priority.push(value); else this.priority.splice(order, 0, value);
      },
      getList: function() {
        return values(STATE_EXISTS);
      }
    };
    STATE.add("READY");
    STATE.add("DEPRECATED");
    STATE.add("UNDEFINED");
    STATE.add("ERROR");
    STATE.add("PROCESSING");
    var subscriptionConfig = {};
    var subscriptionSeed = 1;
    var SUBSCRIPTION = {
      NONE: 0,
      ALL: 0,
      link: function(type, from, to) {
        var subscriberId = type + from.basisObjectId;
        var subscribers = to.subscribers_;
        if (!subscribers) subscribers = to.subscribers_ = {};
        if (!subscribers[subscriberId]) {
          subscribers[subscriberId] = from;
          var count = to.subscriberCount += 1;
          if (count == 1) to.emit_subscribersChanged(+1);
        } else {
          basis.dev.warn("Attempt to add duplicate subscription");
        }
      },
      unlink: function(type, from, to) {
        var subscriberId = type + from.basisObjectId;
        var subscribers = to.subscribers_;
        if (subscribers && subscribers[subscriberId]) {
          delete subscribers[subscriberId];
          var count = to.subscriberCount -= 1;
          if (count == 0) {
            to.emit_subscribersChanged(-1);
            to.subscribers_ = null;
          }
        } else {
          basis.dev.warn("Trying remove non-exists subscription");
        }
      },
      add: function(name, handler, action) {
        subscriptionConfig[subscriptionSeed] = {
          handler: handler,
          action: action
        };
        SUBSCRIPTION[name] = subscriptionSeed;
        SUBSCRIPTION.ALL |= subscriptionSeed;
        subscriptionSeed <<= 1;
      },
      addProperty: function(propertyName, eventName) {
        var handler = {};
        handler[eventName || propertyName + "Changed"] = function(object, oldValue) {
          if (oldValue instanceof AbstractData) SUBSCRIPTION.unlink(propertyName, object, oldValue);
          if (object[propertyName] instanceof AbstractData) SUBSCRIPTION.link(propertyName, object, object[propertyName]);
        };
        this.add(propertyName.toUpperCase(), handler, function(fn, object) {
          if (object[propertyName]) fn(propertyName, object, object[propertyName]);
        });
      }
    };
    var maskConfig = {};
    function mixFunctions(fnA, fnB) {
      return function() {
        fnA.apply(this, arguments);
        fnB.apply(this, arguments);
      };
    }
    function getMaskConfig(mask) {
      var config = maskConfig[mask];
      if (!config) {
        var actions = [];
        var handler = {};
        var idx = 1;
        config = maskConfig[mask] = {
          actions: actions,
          handler: handler
        };
        while (mask) {
          if (mask & 1) {
            var cfg = subscriptionConfig[idx];
            actions.push(cfg.action);
            for (var key in cfg.handler) handler[key] = handler[key] ? mixFunctions(handler[key], cfg.handler[key]) : cfg.handler[key];
          }
          idx <<= 1;
          mask >>= 1;
        }
      }
      return config;
    }
    function addSub(object, mask) {
      var config = getMaskConfig(mask);
      for (var i = 0, action; action = config.actions[i]; i++) action(SUBSCRIPTION.link, object);
      object.addHandler(config.handler);
    }
    function remSub(object, mask) {
      var config = getMaskConfig(mask);
      for (var i = 0, action; action = config.actions[i++]; ) action(SUBSCRIPTION.unlink, object);
      object.removeHandler(config.handler);
    }
    SUBSCRIPTION.addProperty("delegate");
    SUBSCRIPTION.addProperty("target");
    SUBSCRIPTION.addProperty("dataset");
    SUBSCRIPTION.addProperty("value", "change");
    var AbstractData = Class(Emitter, {
      className: namespace + ".AbstractData",
      state: STATE.UNDEFINED,
      emit_stateChanged: createEvent("stateChanged", "oldState"),
      active: false,
      emit_activeChanged: createEvent("activeChanged"),
      subscribeTo: SUBSCRIPTION.NONE,
      subscriberCount: 0,
      subscribers_: null,
      emit_subscribersChanged: createEvent("subscribersChanged", "delta"),
      syncEvents: Class.oneFunctionProperty(function() {
        if (this.isSyncRequired()) this.syncAction();
      }, {
        stateChanged: true,
        subscribersChanged: true
      }),
      syncAction: null,
      init: function() {
        Emitter.prototype.init.call(this);
        if (this.active) this.addHandler(getMaskConfig(this.subscribeTo).handler);
        var syncAction = this.syncAction;
        if (syncAction) {
          this.syncAction = null;
          this.setSyncAction(syncAction);
        }
      },
      setState: function(state, data) {
        var stateCode = String(state);
        if (!STATE_EXISTS[stateCode]) throw new Error("Wrong state value");
        if (this.state != stateCode || this.state.data != data) {
          var oldState = this.state;
          this.state = Object(stateCode);
          this.state.data = data;
          this.emit_stateChanged(oldState);
          return true;
        }
        return false;
      },
      deprecate: function() {
        if (this.state != STATE.PROCESSING) this.setState(STATE.DEPRECATED);
      },
      setActive: function(isActive) {
        isActive = !!isActive;
        if (this.active != isActive) {
          this.active = isActive;
          this.emit_activeChanged();
          if (isActive) addSub(this, this.subscribeTo); else remSub(this, this.subscribeTo);
          return true;
        }
        return false;
      },
      setSubscription: function(subscriptionType) {
        var curSubscriptionType = this.subscribeTo;
        var newSubscriptionType = subscriptionType & SUBSCRIPTION.ALL;
        var delta = curSubscriptionType ^ newSubscriptionType;
        if (delta) {
          this.subscribeTo = newSubscriptionType;
          if (this.active) {
            var curConfig = getMaskConfig(curSubscriptionType);
            var newConfig = getMaskConfig(newSubscriptionType);
            this.removeHandler(curConfig.handler);
            this.addHandler(newConfig.handler);
            var idx = 1;
            while (delta) {
              if (delta & 1) {
                var cfg = subscriptionConfig[idx];
                if (curSubscriptionType & idx) cfg.action(SUBSCRIPTION.unlink, this); else cfg.action(SUBSCRIPTION.link, this);
              }
              idx <<= 1;
              delta >>= 1;
            }
          }
          return true;
        }
        return false;
      },
      isSyncRequired: function() {
        return this.subscriberCount > 0 && (this.state == STATE.UNDEFINED || this.state == STATE.DEPRECATED);
      },
      setSyncAction: function(syncAction) {
        var oldAction = this.syncAction;
        if (typeof syncAction != "function") syncAction = null;
        this.syncAction = syncAction;
        if (syncAction) {
          if (!oldAction) this.addHandler(this.syncEvents);
          if (this.isSyncRequired()) this.syncAction();
        } else {
          if (oldAction) this.removeHandler(this.syncEvents);
        }
      },
      destroy: function() {
        Emitter.prototype.destroy.call(this);
        if (this.active) {
          var config = getMaskConfig(this.subscribeTo);
          for (var i = 0, action; action = config.actions[i]; i++) action(SUBSCRIPTION.unlink, this);
        }
        this.state = STATE.UNDEFINED;
      }
    });
    var GETTER_ID = basis.getter.ID;
    var VALUE_EMMITER_HANDLER = {
      destroy: function(object) {
        this.value.unlink(object, this.fn);
      }
    };
    var VALUE_EMMITER_DESTROY_HANDLER = {
      destroy: function(object) {
        this.set(null);
      }
    };
    var computeFunctions = {};
    var valueSetters = {};
    var valueSyncToken = function(value) {
      this.set(this.fn(value));
    };
    var Value = Class(AbstractData, {
      className: namespace + ".Value",
      subscribeTo: SUBSCRIPTION.VALUE,
      emit_change: createEvent("change", "oldValue") && function(oldValue) {
        events.change.call(this, oldValue);
        var cursor = this;
        while (cursor = cursor.links_) cursor.fn.call(cursor.context, this.value, oldValue);
      },
      value: null,
      initValue: null,
      proxy: null,
      locked: 0,
      lockedValue_: null,
      links_: null,
      setNullOnEmitterDestroy: true,
      bindingBridge: {
        attach: function(host, callback, context) {
          host.link(context, callback, true);
        },
        detach: function(host, callback, context) {
          host.unlink(context, callback);
        },
        get: function(host) {
          return host.value;
        }
      },
      init: function() {
        AbstractData.prototype.init.call(this);
        if (this.proxy) this.value = this.proxy(this.value);
        if (this.setNullOnEmitterDestroy && this.value instanceof Emitter) this.value.addHandler(VALUE_EMMITER_DESTROY_HANDLER, this);
        this.initValue = this.value;
      },
      set: function(value) {
        var oldValue = this.value;
        var newValue = this.proxy ? this.proxy(value) : value;
        var changed = newValue !== oldValue;
        if (changed) {
          if (this.setNullOnEmitterDestroy) {
            if (oldValue instanceof Emitter) oldValue.removeHandler(VALUE_EMMITER_DESTROY_HANDLER, this);
            if (newValue instanceof Emitter) newValue.addHandler(VALUE_EMMITER_DESTROY_HANDLER, this);
          }
          this.value = newValue;
          if (!this.locked) this.emit_change(oldValue);
        }
        return changed;
      },
      reset: function() {
        this.set(this.initValue);
      },
      isLocked: function() {
        return this.locked > 0;
      },
      lock: function() {
        this.locked++;
        if (this.locked == 1) this.lockedValue_ = this.value;
      },
      unlock: function() {
        if (this.locked) {
          this.locked--;
          if (!this.locked) {
            var lockedValue = this.lockedValue_;
            this.lockedValue_ = null;
            if (this.value !== lockedValue) this.emit_change(lockedValue);
          }
        }
      },
      compute: function(events, fn) {
        if (!fn) {
          fn = events;
          events = null;
        }
        if (!fn) fn = $self;
        var hostValue = this;
        var handler = basis.event.createHandler(events, function(object) {
          this.set(fn(object, hostValue.value));
        });
        var fnId = fn[GETTER_ID] || String(fn);
        var getComputeTokenId = handler.events.concat(fnId, this.basisObjectId).join("_");
        var getComputeToken = computeFunctions[getComputeTokenId];
        if (!getComputeToken) {
          var tokenMap = {};
          handler.destroy = function(object) {
            delete tokenMap[object.basisObjectId];
            this.destroy();
          };
          this.addHandler({
            change: function() {
              for (var key in tokenMap) {
                var pair = tokenMap[key];
                pair.token.set(fn(pair.object, this.value));
              }
            },
            destroy: function() {
              for (var key in tokenMap) {
                var pair = tokenMap[key];
                pair.object.removeHandler(handler, pair.token);
                pair.token.destroy();
              }
              tokenMap = null;
              hostValue = null;
            }
          });
          getComputeToken = computeFunctions[getComputeTokenId] = function(object) {
            if (object instanceof basis.event.Emitter == false) basis.dev.warn("basis.data.Value#compute: object should be an instanceof basis.event.Emitter");
            var objectId = object.basisObjectId;
            var pair = tokenMap[objectId];
            var value = fn(object, hostValue.value);
            if (!pair) {
              var token = new basis.Token(value);
              object.addHandler(handler, token);
              pair = tokenMap[objectId] = {
                token: token,
                object: object
              };
            } else {
              pair.token.set(value);
            }
            return pair.token;
          };
          getComputeToken.deferred = function() {
            return function(object) {
              return getComputeToken(object).deferred();
            };
          };
        }
        return getComputeToken;
      },
      as: function(fn, deferred) {
        if (!fn) fn = $self;
        if (this.links_) {
          var cursor = this;
          var fnId = fn[GETTER_ID] || String(fn);
          while (cursor = cursor.links_) {
            var context = cursor.context;
            if (context instanceof basis.Token && (context.fn[GETTER_ID] || String(context.fn)) == fnId) return deferred ? context.deferred() : context;
          }
        }
        var token = new basis.Token;
        token.fn = fn;
        this.link(token, valueSyncToken);
        return deferred ? token.deferred() : token;
      },
      deferred: function(fn) {
        return this.as(fn, true);
      },
      link: function(context, fn, noApply) {
        if (typeof fn != "function") {
          var property = String(fn);
          fn = valueSetters[property];
          if (!fn) fn = valueSetters[property] = function(value) {
            this[property] = value;
          };
        }
        var cursor = this;
        while (cursor = cursor.links_) if (cursor.context === context && cursor.fn === fn) {
          basis.dev.warn(this.constructor.className + "#attach: Duplicate link pair context-fn");
          break;
        }
        this.links_ = {
          value: this,
          context: context,
          fn: fn,
          links_: this.links_
        };
        if (context instanceof Emitter) context.addHandler(VALUE_EMMITER_HANDLER, this.links_);
        if (!noApply) fn.call(context, this.value);
        return context;
      },
      unlink: function(context, fn) {
        var cursor = this;
        var prev;
        while (prev = cursor, cursor = cursor.links_) if (cursor.context === context && (!fn || cursor.fn === fn)) {
          cursor.fn = basis.fn.$undef;
          prev.links_ = cursor.links_;
          if (cursor.context instanceof Emitter) cursor.context.removeHandler(VALUE_EMMITER_HANDLER, cursor);
        }
      },
      destroy: function() {
        AbstractData.prototype.destroy.call(this);
        if (this.setNullOnEmitterDestroy && this.value instanceof Emitter) this.value.removeHandler(VALUE_EMMITER_DESTROY_HANDLER, this);
        var cursor = this;
        while (cursor = cursor.links_) if (cursor.context instanceof Emitter) cursor.context.removeHandler(VALUE_EMMITER_HANDLER, cursor);
        this.proxy = null;
        this.initValue = null;
        this.value = null;
        this.lockedValue_ = null;
        this.links_ = null;
      }
    });
    var valueFromMap = {};
    var valueFromSetProxy = function(object) {
      Value.prototype.set.call(this, object);
    };
    Value.from = function(obj, events, getter) {
      var result;
      if (!obj) return null;
      if (obj instanceof Emitter) {
        if (!getter) {
          getter = events;
          events = null;
        }
        if (!getter) getter = $self;
        var handler = basis.event.createHandler(events, valueFromSetProxy);
        var getterId = getter[GETTER_ID] || String(getter);
        var id = handler.events.concat(getterId, obj.basisObjectId).join("_");
        result = valueFromMap[id];
        if (!result) {
          result = valueFromMap[id] = new Value({
            value: obj,
            proxy: basis.getter(getter),
            set: basis.fn.$undef,
            handler: {
              destroy: function() {
                valueFromMap[id] = null;
                obj.removeHandler(handler, this);
              }
            }
          });
          handler.destroy = function(sender) {
            valueFromMap[id] = null;
            this.destroy();
          };
          obj.addHandler(handler, result);
        }
      }
      if (!result) {
        var id = obj.basisObjectId;
        var bindingBridge = obj.bindingBridge;
        if (id && bindingBridge) {
          result = valueFromMap[id];
          if (!result) {
            result = valueFromMap[id] = new Value({
              value: bindingBridge.get(obj)
            });
            bindingBridge.attach(obj, result.set, result);
          }
        }
      }
      if (!result) throw "Bad object type";
      return result;
    };
    Value.factory = function(events, getter) {
      return function(object) {
        return Value.from(object, events, getter);
      };
    };
    var INIT_DATA = {};
    function isConnected(a, b) {
      while (b && b !== a && b !== b.delegate) b = b.delegate;
      return b === a;
    }
    function applyDelegateChanges(object, oldRoot, oldTarget) {
      var delegate = object.delegate;
      if (delegate) {
        object.root = delegate.root;
        object.target = delegate.target;
        object.data = delegate.data;
        object.state = delegate.state;
      }
      if (object.root !== oldRoot) {
        var rootListenHandler = object.listen.root;
        if (rootListenHandler) {
          if (oldRoot && oldRoot !== object) oldRoot.removeHandler(rootListenHandler, object);
          if (object.root && object.root !== object) object.root.addHandler(rootListenHandler, object);
        }
        object.emit_rootChanged(oldRoot);
      }
      if (object.target !== oldTarget) {
        var targetListenHandler = object.listen.target;
        if (targetListenHandler) {
          if (oldTarget && oldTarget !== object) oldTarget.removeHandler(targetListenHandler, object);
          if (object.target && object.target !== object) object.target.addHandler(targetListenHandler, object);
        }
        object.emit_targetChanged(oldTarget);
      }
      var cursor = object.delegates_;
      while (cursor) {
        if (cursor.delegate) applyDelegateChanges(cursor.delegate, oldRoot, oldTarget);
        cursor = cursor.next;
      }
    }
    var DataObject = Class(AbstractData, {
      className: namespace + ".Object",
      subscribeTo: SUBSCRIPTION.DELEGATE + SUBSCRIPTION.TARGET,
      data: null,
      emit_update: createEvent("update", "delta") && function(delta) {
        var cursor = this.delegates_;
        events.update.call(this, delta);
        while (cursor) {
          if (cursor.delegate) cursor.delegate.emit_update(delta);
          cursor = cursor.next;
        }
      },
      emit_stateChanged: function(oldState) {
        var cursor = this.delegates_;
        AbstractData.prototype.emit_stateChanged.call(this, oldState);
        while (cursor) {
          if (cursor.delegate) {
            cursor.delegate.state = this.state;
            cursor.delegate.emit_stateChanged(oldState);
          }
          cursor = cursor.next;
        }
      },
      delegate: null,
      delegateAdapter_: null,
      delegates_: null,
      debug_delegates: function() {
        var cursor = this.delegates_;
        var result = [];
        while (cursor) {
          result.push(cursor.delegate);
          cursor = cursor.next;
        }
        return result;
      },
      emit_delegateChanged: createEvent("delegateChanged", "oldDelegate"),
      target: null,
      emit_targetChanged: createEvent("targetChanged", "oldTarget"),
      root: null,
      emit_rootChanged: createEvent("rootChanged", "oldRoot"),
      init: function() {
        this.root = this;
        AbstractData.prototype.init.call(this);
        var delegate = this.delegate;
        var data = this.data;
        if (delegate) {
          this.delegate = null;
          this.target = null;
          this.data = INIT_DATA;
          this.setDelegate(delegate);
          if (this.data === INIT_DATA) this.data = data || {};
        } else {
          if (!data) this.data = {};
          if (this.target !== null) this.target = this;
        }
      },
      setSyncAction: function(syncAction) {
        if (syncAction && this.delegate) basis.dev.warn(this.constructor.syncAction + " instance has a delegate and syncAction - it may produce conflics with data & state");
        AbstractData.prototype.setSyncAction.call(this, syncAction);
      },
      setDelegate: function(newDelegate) {
        newDelegate = resolveObject(this, this.setDelegate, newDelegate, "delegateAdapter_");
        if (newDelegate && newDelegate instanceof DataObject) {
          if (newDelegate.delegate && isConnected(this, newDelegate)) {
            basis.dev.warn("New delegate has already connected to object. Delegate assignment has been ignored.", this, newDelegate);
            return false;
          }
        } else {
          newDelegate = null;
        }
        if (this.delegate !== newDelegate) {
          var oldState = this.state;
          var oldData = this.data;
          var oldDelegate = this.delegate;
          var oldTarget = this.target;
          var oldRoot = this.root;
          var delegateListenHandler = this.listen.delegate;
          var dataChanged = false;
          var delta;
          if (oldDelegate) {
            if (delegateListenHandler) oldDelegate.removeHandler(delegateListenHandler, this);
            var cursor = oldDelegate.delegates_;
            var prev = oldDelegate;
            while (cursor) {
              if (cursor.delegate === this) {
                cursor.delegate = null;
                if (prev === oldDelegate) oldDelegate.delegates_ = cursor.next; else prev.next = cursor.next;
                break;
              }
              prev = cursor;
              cursor = cursor.next;
            }
          }
          if (newDelegate) {
            this.delegate = newDelegate;
            if (delegateListenHandler) newDelegate.addHandler(delegateListenHandler, this);
            newDelegate.delegates_ = {
              delegate: this,
              next: newDelegate.delegates_
            };
            if (this.data !== INIT_DATA) {
              delta = {};
              for (var key in newDelegate.data) if (key in oldData === false) {
                dataChanged = true;
                delta[key] = undefined;
              }
              for (var key in oldData) if (oldData[key] !== newDelegate.data[key]) {
                dataChanged = true;
                delta[key] = oldData[key];
              }
            }
          } else {
            this.delegate = null;
            this.target = null;
            this.root = this;
            this.data = {};
            for (var key in oldData) this.data[key] = oldData[key];
          }
          applyDelegateChanges(this, oldRoot, oldTarget);
          if (dataChanged) this.emit_update(delta);
          if (delta && oldState !== this.state && (String(oldState) != this.state || oldState.data !== this.state.data)) this.emit_stateChanged(oldState);
          this.emit_delegateChanged(oldDelegate);
          return true;
        }
        return false;
      },
      setState: function(state, data) {
        if (this.delegate) return this.root.setState(state, data); else return AbstractData.prototype.setState.call(this, state, data);
      },
      update: function(data) {
        if (this.delegate) return this.root.update(data);
        if (data) {
          var delta = {};
          var changed = false;
          for (var prop in data) if (this.data[prop] !== data[prop]) {
            changed = true;
            delta[prop] = this.data[prop];
            this.data[prop] = data[prop];
          }
          if (changed) {
            this.emit_update(delta);
            return delta;
          }
        }
        return false;
      },
      destroy: function() {
        AbstractData.prototype.destroy.call(this);
        var cursor = this.delegates_;
        this.delegates_ = null;
        while (cursor) {
          cursor.delegate.setDelegate();
          cursor = cursor.next;
        }
        if (this.delegate) this.setDelegate();
        this.data = NULL_OBJECT;
        this.root = null;
        this.target = null;
      }
    });
    var Slot = Class(DataObject, {
      className: namespace + ".Slot"
    });
    var KEYOBJECTMAP_MEMBER_HANDLER = {
      destroy: function() {
        delete this.map[this.id];
      }
    };
    var KeyObjectMap = Class(AbstractData, {
      className: namespace + ".KeyObjectMap",
      itemClass: DataObject,
      keyGetter: $self,
      autoDestroyMembers: true,
      map_: null,
      extendConstructor_: true,
      init: function() {
        this.map_ = {};
        AbstractData.prototype.init.call(this);
      },
      resolve: function(object) {
        return this.get(this.keyGetter(object), object);
      },
      create: function(key, object) {
        var itemConfig;
        if (key instanceof DataObject) itemConfig = {
          delegate: key
        }; else itemConfig = {
          data: {
            id: key,
            title: key
          }
        };
        return new this.itemClass(itemConfig);
      },
      get: function(key, autocreate) {
        var itemId = key instanceof DataObject ? key.basisObjectId : key;
        var itemInfo = this.map_[itemId];
        if (!itemInfo && autocreate) {
          itemInfo = this.map_[itemId] = {
            map: this.map_,
            id: itemId,
            item: this.create(key, autocreate)
          };
          itemInfo.item.addHandler(KEYOBJECTMAP_MEMBER_HANDLER, itemInfo);
        }
        if (itemInfo) return itemInfo.item;
      },
      destroy: function() {
        AbstractData.prototype.destroy.call(this);
        var map = this.map_;
        this.map_ = null;
        for (var itemId in map) {
          var itemInfo = map[itemId];
          if (this.autoDestroyMembers) itemInfo.item.destroy(); else itemInfo.item.removeHandler(KEYOBJECTMAP_MEMBER_HANDLER, itemInfo);
        }
      }
    });
    function getDelta(inserted, deleted) {
      var delta = {};
      var result;
      if (inserted && inserted.length) result = delta.inserted = inserted;
      if (deleted && deleted.length) result = delta.deleted = deleted;
      if (result) return delta;
    }
    function getDatasetDelta(a, b) {
      if (!a || !a.itemCount) {
        if (b && b.itemCount) return {
          inserted: b.getItems()
        };
      } else {
        if (!b || !b.itemCount) {
          if (a.itemCount) return {
            deleted: a.getItems()
          };
        } else {
          var inserted = [];
          var deleted = [];
          for (var key in a.items_) {
            var item = a.items_[key];
            if (item.basisObjectId in b.items_ == false) deleted.push(item);
          }
          for (var key in b.items_) {
            var item = b.items_[key];
            if (item.basisObjectId in a.items_ == false) inserted.push(item);
          }
          return getDelta(inserted, deleted);
        }
      }
    }
    var DatasetWrapper = Class(DataObject, {
      className: namespace + ".DatasetWrapper",
      subscribeTo: DataObject.prototype.subscribeTo + SUBSCRIPTION.DATASET,
      listen: {
        dataset: {
          itemsChanged: function(dataset, delta) {
            this.itemCount = dataset.itemCount;
            this.emit_itemsChanged(delta);
          },
          destroy: function() {
            this.setDataset();
          }
        }
      },
      dataset: null,
      datasetAdapter_: null,
      emit_datasetChanged: createEvent("datasetChanged", "oldDataset"),
      emit_itemsChanged: createEvent("itemsChanged", "delta"),
      init: function() {
        DataObject.prototype.init.call(this);
        var dataset = this.dataset;
        if (dataset) {
          this.dataset = null;
          this.setDataset(dataset);
        }
      },
      setDataset: function(dataset) {
        dataset = resolveDataset(this, this.setDataset, dataset, "datasetAdapter_");
        if (this.dataset !== dataset) {
          var listenHandler = this.listen.dataset;
          var oldDataset = this.dataset;
          var delta;
          if (listenHandler) {
            if (oldDataset) oldDataset.removeHandler(listenHandler, this);
            if (dataset) dataset.addHandler(listenHandler, this);
          }
          this.itemCount = dataset ? dataset.itemCount : 0;
          if (delta = getDatasetDelta(oldDataset, dataset)) this.emit_itemsChanged(delta);
          this.dataset = dataset;
          this.emit_datasetChanged(oldDataset);
        }
      },
      has: function(object) {
        return this.dataset ? this.dataset.has(object) : null;
      },
      getItems: function() {
        return this.dataset ? this.dataset.getItems() : [];
      },
      pick: function() {
        return this.dataset ? this.dataset.pick() : null;
      },
      top: function(count) {
        return this.dataset ? this.dataset.top(count) : [];
      },
      forEach: function(fn) {
        if (this.dataset) return this.dataset.forEach(fn);
      },
      destroy: function() {
        if (this.dataset || this.datasetAdapter_) this.setDataset();
        DataObject.prototype.destroy.call(this);
      }
    });
    var ReadOnlyDataset = Class(AbstractData, {
      className: namespace + ".ReadOnlyDataset",
      itemCount: 0,
      items_: null,
      members_: null,
      cache_: null,
      emit_itemsChanged: createEvent("itemsChanged", "delta") && function(delta) {
        var items;
        var insertCount = 0;
        var deleteCount = 0;
        var object;
        if (items = delta.inserted) {
          while (object = items[insertCount]) {
            this.items_[object.basisObjectId] = object;
            insertCount++;
          }
        }
        if (items = delta.deleted) {
          while (object = items[deleteCount]) {
            delete this.items_[object.basisObjectId];
            deleteCount++;
          }
        }
        this.itemCount += insertCount - deleteCount;
        this.cache_ = insertCount == this.itemCount ? delta.inserted : null;
        events.itemsChanged.call(this, delta);
      },
      init: function() {
        AbstractData.prototype.init.call(this);
        this.members_ = {};
        this.items_ = {};
      },
      has: function(object) {
        return !!(object && this.items_[object.basisObjectId]);
      },
      getItems: function() {
        if (!this.cache_) this.cache_ = values(this.items_);
        return this.cache_;
      },
      getValues: function(getter) {
        return this.getItems().map(basis.getter(getter || $self));
      },
      pick: function() {
        for (var objectId in this.items_) return this.items_[objectId];
        return null;
      },
      top: function(count) {
        var result = [];
        if (count) for (var objectId in this.items_) if (result.push(this.items_[objectId]) >= count) break;
        return result;
      },
      forEach: function(fn) {
        var items = this.getItems();
        for (var i = 0; i < items.length; i++) fn(items[i]);
      },
      destroy: function() {
        AbstractData.prototype.destroy.call(this);
        this.cache_ = EMPTY_ARRAY;
        this.itemCount = 0;
        this.members_ = null;
        this.items_ = null;
      }
    });
    var Dataset = Class(ReadOnlyDataset, {
      className: namespace + ".Dataset",
      listen: {
        item: {
          destroy: function(object) {
            this.remove([ object ]);
          }
        }
      },
      init: function() {
        ReadOnlyDataset.prototype.init.call(this);
        var items = this.items;
        if (items) {
          this.items = null;
          this.set(items);
        }
      },
      add: function(items) {
        var memberMap = this.members_;
        var listenHandler = this.listen.item;
        var inserted = [];
        var delta;
        if (items && !Array.isArray(items)) items = [ items ];
        for (var i = 0; i < items.length; i++) {
          var object = items[i];
          if (object instanceof DataObject) {
            var objectId = object.basisObjectId;
            if (!memberMap[objectId]) {
              memberMap[objectId] = object;
              if (listenHandler) object.addHandler(listenHandler, this);
              inserted.push(object);
            }
          } else {
            basis.dev.warn("Wrong data type: value should be an instance of basis.data.Object");
          }
        }
        if (inserted.length) {
          this.emit_itemsChanged(delta = {
            inserted: inserted
          });
        }
        return delta;
      },
      remove: function(items) {
        var memberMap = this.members_;
        var listenHandler = this.listen.item;
        var deleted = [];
        var delta;
        if (items && !Array.isArray(items)) items = [ items ];
        for (var i = 0; i < items.length; i++) {
          var object = items[i];
          if (object instanceof DataObject) {
            var objectId = object.basisObjectId;
            if (memberMap[objectId]) {
              if (listenHandler) object.removeHandler(listenHandler, this);
              delete memberMap[objectId];
              deleted.push(object);
            }
          } else {
            basis.dev.warn("Wrong data type: value should be an instance of basis.data.Object");
          }
        }
        if (deleted.length) {
          this.emit_itemsChanged(delta = {
            deleted: deleted
          });
        }
        return delta;
      },
      set: function(items) {
        if (!this.itemCount) return this.add(items);
        if (!items || !items.length) return this.clear();
        var memberMap = this.members_;
        var listenHandler = this.listen.item;
        var exists = {};
        var deleted = [];
        var inserted = [];
        var object;
        var objectId;
        var delta;
        for (var i = 0; i < items.length; i++) {
          object = items[i];
          if (object instanceof DataObject) {
            objectId = object.basisObjectId;
            exists[objectId] = object;
            if (!memberMap[objectId]) {
              memberMap[objectId] = object;
              if (listenHandler) object.addHandler(listenHandler, this);
              inserted.push(object);
            }
          } else {
            basis.dev.warn("Wrong data type: value should be an instance of basis.data.Object");
          }
        }
        for (var objectId in memberMap) {
          if (!exists[objectId]) {
            object = memberMap[objectId];
            if (listenHandler) object.removeHandler(listenHandler, this);
            delete memberMap[objectId];
            deleted.push(object);
          }
        }
        if (delta = getDelta(inserted, deleted)) this.emit_itemsChanged(delta);
        return delta;
      },
      sync: function(items) {
        var delta = this.set(items) || {};
        var deleted = delta.deleted;
        Dataset.setAccumulateState(true);
        if (deleted) for (var i = 0, object; object = deleted[i]; i++) object.destroy();
        Dataset.setAccumulateState(false);
        return delta.inserted;
      },
      clear: function() {
        var deleted = this.getItems();
        var listenHandler = this.listen.item;
        var delta;
        if (deleted.length) {
          if (listenHandler) for (var i = 0; i < deleted.length; i++) deleted[i].removeHandler(listenHandler, this);
          this.emit_itemsChanged(delta = {
            deleted: deleted
          });
          this.members_ = {};
        }
        return delta;
      },
      destroy: function() {
        this.clear();
        ReadOnlyDataset.prototype.destroy.call(this);
      }
    });
    var ResolveAdapter = function(context, fn, source, handler) {
      this.context = context;
      this.fn = fn;
      this.source = source;
      this.handler = handler;
    };
    ResolveAdapter.prototype = {
      context: null,
      fn: null,
      source: null,
      handler: null,
      next: null,
      attach: function() {
        this.source.addHandler(this.handler, this);
      },
      detach: function() {
        this.source.removeHandler(this.handler, this);
      },
      proxy: function() {
        this.fn.call(this.context, this.source);
      }
    };
    var BBResolveAdapter = function() {
      ResolveAdapter.apply(this, arguments);
    };
    BBResolveAdapter.prototype = new ResolveAdapter;
    BBResolveAdapter.prototype.attach = function() {
      this.source.bindingBridge.attach(this.source, this.handler, this);
    };
    BBResolveAdapter.prototype.detach = function() {
      this.source.bindingBridge.detach(this.source, this.handler, this);
    };
    var TOKEN_ADAPTER_HANDLER = function() {
      this.fn.call(this.context, this.source);
    };
    var DATASETWRAPPER_ADAPTER_HANDLER = {
      datasetChanged: function() {
        this.fn.call(this.context, this.source);
      },
      destroy: function() {
        this.fn.call(this.context, null);
      }
    };
    var VALUE_ADAPTER_HANDLER = {
      change: function() {
        this.fn.call(this.context, this.source);
      },
      destroy: function() {
        this.fn.call(this.context, null);
      }
    };
    function resolveDataset(context, fn, source, property) {
      var oldAdapter = context[property] || null;
      var newAdapter = null;
      if (typeof source == "function") source = source.call(context, context);
      if (source) {
        if (source instanceof DatasetWrapper) {
          newAdapter = new ResolveAdapter(context, fn, source, DATASETWRAPPER_ADAPTER_HANDLER);
          source = source.dataset;
        } else if (source instanceof Value) {
          newAdapter = new ResolveAdapter(context, fn, source, VALUE_ADAPTER_HANDLER);
          source = resolveDataset(newAdapter, newAdapter.proxy, source.value, "next");
        } else if (source.bindingBridge) {
          newAdapter = new BBResolveAdapter(context, fn, source, TOKEN_ADAPTER_HANDLER);
          source = resolveDataset(newAdapter, newAdapter.proxy, source.value, "next");
        }
      }
      if (source instanceof ReadOnlyDataset == false) source = null;
      if (property && oldAdapter !== newAdapter) {
        if (oldAdapter) {
          oldAdapter.detach();
          if (oldAdapter.next) resolveDataset(oldAdapter, null, null, "next");
        }
        if (newAdapter) newAdapter.attach();
        context[property] = newAdapter;
      }
      return source;
    }
    function resolveObject(context, fn, source, property) {
      var oldAdapter = context[property] || null;
      var newAdapter = null;
      if (typeof source == "function") source = source.call(context, context);
      if (source) {
        if (source instanceof Value) {
          newAdapter = new ResolveAdapter(context, fn, source, VALUE_ADAPTER_HANDLER);
          source = resolveObject(newAdapter, newAdapter.proxy, source.value, "next");
        } else if (source.bindingBridge) {
          newAdapter = new BBResolveAdapter(context, fn, source, TOKEN_ADAPTER_HANDLER);
          source = resolveObject(newAdapter, newAdapter.proxy, source.value, "next");
        }
      }
      if (source instanceof DataObject == false) source = null;
      if (property && oldAdapter !== newAdapter) {
        if (oldAdapter) {
          oldAdapter.detach();
          if (oldAdapter.next) resolveObject(oldAdapter, null, null, "next");
        }
        if (newAdapter) newAdapter.attach();
        context[property] = newAdapter;
      }
      return source;
    }
    Dataset.setAccumulateState = function() {
      var proto = ReadOnlyDataset.prototype;
      var eventCache = {};
      var setStateCount = 0;
      var urgentTimer;
      var realEvent;
      function flushCache(cache) {
        var dataset = cache.dataset;
        realEvent.call(dataset, cache);
      }
      function flushAllDataset() {
        var eventCacheCopy = eventCache;
        eventCache = {};
        for (var datasetId in eventCacheCopy) {
          var entry = eventCacheCopy[datasetId];
          if (entry) flushCache(entry);
        }
      }
      function storeDatasetDelta(delta) {
        var dataset = this;
        var datasetId = dataset.basisObjectId;
        var inserted = delta.inserted;
        var deleted = delta.deleted;
        var cache = eventCache[datasetId];
        if (inserted && deleted || cache && cache.mixed) {
          if (cache) {
            eventCache[datasetId] = null;
            flushCache(cache);
          }
          realEvent.call(dataset, delta);
          return;
        }
        if (cache) {
          var mode = inserted ? "inserted" : "deleted";
          var array = cache[mode];
          if (!array) {
            var inCacheMode = inserted ? "deleted" : "inserted";
            var inCache = cache[inCacheMode];
            var inCacheMap = {};
            var deltaItems = inserted || deleted;
            var newInCacheItems = [];
            var inCacheRemoves = 0;
            for (var i = 0; i < inCache.length; i++) inCacheMap[inCache[i].basisObjectId] = i;
            for (var i = 0; i < deltaItems.length; i++) {
              var id = deltaItems[i].basisObjectId;
              if (id in inCacheMap == false) {
                newInCacheItems.push(deltaItems[i]);
              } else {
                if (!inCacheRemoves) inCache = sliceArray.call(inCache);
                inCacheRemoves++;
                inCache[inCacheMap[id]] = null;
              }
            }
            if (inCacheRemoves) {
              if (inCacheRemoves < inCache.length) {
                inCache = inCache.filter(Boolean);
              } else {
                inCache = null;
              }
              cache[inCacheMode] = inCache;
            }
            if (!newInCacheItems.length) {
              newInCacheItems = null;
              if (!inCache) eventCache[datasetId] = null;
            } else {
              cache[mode] = newInCacheItems;
              if (inCache) cache.mixed = true;
            }
          } else array.push.apply(array, inserted || deleted);
          return;
        }
        eventCache[datasetId] = {
          inserted: inserted,
          deleted: deleted,
          dataset: dataset,
          mixed: false
        };
      }
      function urgentFlush() {
        urgentTimer = null;
        if (setStateCount) {
          basis.dev.warn("(debug) Urgent flush dataset changes");
          setStateCount = 0;
          setAccumulateStateOff();
        }
      }
      function setAccumulateStateOff() {
        proto.emit_itemsChanged = realEvent;
        flushAllDataset();
      }
      return function(state) {
        if (state) {
          if (setStateCount == 0) {
            realEvent = proto.emit_itemsChanged;
            proto.emit_itemsChanged = storeDatasetDelta;
            if (!urgentTimer) urgentTimer = basis.setImmediate(urgentFlush);
          }
          setStateCount++;
        } else {
          setStateCount -= setStateCount > 0;
          if (setStateCount == 0) setAccumulateStateOff();
        }
      };
    }();
    function wrapData(data) {
      if (Array.isArray(data)) return data.map(function(item) {
        return {
          data: item
        };
      }); else return {
        data: data
      };
    }
    function wrapObject(data) {
      if (!data || data.constructor !== Object) data = {
        value: data
      };
      return new DataObject({
        data: data
      });
    }
    function wrap(value, retObject) {
      var wrapper = retObject ? wrapObject : wrapData;
      return Array.isArray(value) ? value.map(wrapper) : wrapper(value);
    }
    module.exports = {
      STATE: STATE,
      SUBSCRIPTION: SUBSCRIPTION,
      AbstractData: AbstractData,
      Value: Value,
      Object: DataObject,
      Slot: Slot,
      KeyObjectMap: KeyObjectMap,
      ReadOnlyDataset: ReadOnlyDataset,
      Dataset: Dataset,
      DatasetWrapper: DatasetWrapper,
      isConnected: isConnected,
      getDatasetDelta: getDatasetDelta,
      ResolveAdapter: ResolveAdapter,
      resolveDataset: resolveDataset,
      resolveObject: resolveObject,
      wrapData: wrapData,
      wrapObject: wrapObject,
      wrap: wrap
    };
  },
  "5.js": function(exports, module, basis, global, __filename, __dirname, require, resource) {
    basis.require("./3.js");
    basis.require("./4.js");
    var namespace = this.path;
    var Class = basis.Class;
    var complete = basis.object.complete;
    var arrayFrom = basis.array;
    var arrayRemove = basis.array.remove;
    var $undef = basis.fn.$undef;
    var getter = basis.getter;
    var nullGetter = basis.fn.nullGetter;
    var oneFunctionProperty = Class.oneFunctionProperty;
    var createEvent = basis.event.create;
    var events = basis.event.events;
    var SUBSCRIPTION = basis.data.SUBSCRIPTION;
    var STATE = basis.data.STATE;
    var AbstractData = basis.data.AbstractData;
    var DataObject = basis.data.Object;
    var ReadOnlyDataset = basis.data.ReadOnlyDataset;
    var Dataset = basis.data.Dataset;
    var DatasetWrapper = basis.data.DatasetWrapper;
    var EXCEPTION_CANT_INSERT = namespace + ": Node can't be inserted at specified point in hierarchy";
    var EXCEPTION_NODE_NOT_FOUND = namespace + ": Node was not found";
    var EXCEPTION_BAD_CHILD_CLASS = namespace + ": Child node has wrong class";
    var EXCEPTION_NULL_CHILD = namespace + ": Child node is null";
    var EXCEPTION_DATASOURCE_CONFLICT = namespace + ": Operation is not allowed because node is under dataSource control";
    var EXCEPTION_DATASOURCEADAPTER_CONFLICT = namespace + ": Operation is not allowed because node is under dataSource adapter control";
    var EXCEPTION_PARENTNODE_OWNER_CONFLICT = namespace + ": Node can't has owner and parentNode";
    var EXCEPTION_NO_CHILDCLASS = namespace + ": Node can't has children and dataSource as childClass isn't specified";
    var DELEGATE = {
      ANY: true,
      NONE: false,
      PARENT: "parent",
      OWNER: "owner"
    };
    var childNodesDatasetMap = {};
    function warnOnDataSourceItemNodeDestoy() {
      basis.dev.warn(namespace + ": node can't be destroyed as representing dataSource item, destroy delegate item or remove it from dataSource first");
    }
    function warnOnAutoSatelliteOwnerChange() {
      basis.dev.warn(namespace + ": satellite can't change owner as it auto-satellite");
    }
    function warnOnAutoSatelliteDestoy() {
      basis.dev.warn(namespace + ": satellite can't be destroyed as it auto-create satellite, and could be destroyed on owner destroy");
    }
    function lockDataSourceItemNode(node) {
      node.setDelegate = basis.fn.$undef;
      node.destroy = warnOnDataSourceItemNodeDestoy;
    }
    function unlockDataSourceItemNode(node) {
      var proto = node.constructor.prototype;
      node.setDelegate = proto.setDelegate;
      node.destroy = proto.destroy;
    }
    function sortingSearch(node) {
      return node.sortingValue || 0;
    }
    function sortAsc(a, b) {
      a = a.sortingValue || 0;
      b = b.sortingValue || 0;
      return +(a > b) || -(a < b);
    }
    function sortDesc(a, b) {
      a = a.sortingValue || 0;
      b = b.sortingValue || 0;
      return -(a > b) || +(a < b);
    }
    function sortChildNodes(obj) {
      return obj.childNodes.sort(obj.sortingDesc ? sortDesc : sortAsc);
    }
    function binarySearchPos(array, value, getter_, desc) {
      if (!array.length) return 0;
      desc = !!desc;
      var pos;
      var compareValue;
      var l = 0;
      var r = array.length - 1;
      do {
        pos = l + r >> 1;
        compareValue = getter_(array[pos]);
        if (desc ? value > compareValue : value < compareValue) r = pos - 1; else if (desc ? value < compareValue : value > compareValue) l = pos + 1; else return value == compareValue ? pos : 0;
      } while (l <= r);
      return pos + (compareValue < value ^ desc);
    }
    function updateNodeContextSelection(root, oldSelection, newSelection, rootUpdate, ignoreRootSelection) {
      if (oldSelection === newSelection) return;
      var nextNode;
      var cursor = root;
      var selected = [];
      if (rootUpdate) {
        root.contextSelection = newSelection;
        if (root.selected) selected.push(root);
      }
      while (cursor) {
        nextNode = !cursor.selection || ignoreRootSelection && cursor === root ? cursor.firstChild : null;
        if (nextNode && nextNode.contextSelection !== oldSelection) throw "Try change wrong context selection";
        while (!nextNode) {
          if (cursor === root) {
            if (selected.length) {
              if (oldSelection) oldSelection.remove(selected);
              if (newSelection) newSelection.add(selected);
            }
            return;
          }
          nextNode = cursor.nextSibling;
          if (!nextNode) cursor = cursor.parentNode;
        }
        cursor = nextNode;
        if (cursor.selected) selected.push(cursor);
        cursor.contextSelection = newSelection;
      }
    }
    function updateNodeDisableContext(node, disabled) {
      if (node.contextDisabled != disabled) {
        node.contextDisabled = disabled;
        if (node.disabled) return;
        if (disabled) node.emit_disable(); else node.emit_enable();
      }
    }
    SUBSCRIPTION.addProperty("owner");
    SUBSCRIPTION.addProperty("dataSource");
    function processSatelliteConfig(value) {
      if (!value) return null;
      if (value.isSatelliteConfig) return value;
      if (value instanceof AbstractNode) return value;
      if (Class.isClass(value)) value = {
        instanceOf: value
      };
      if (value && value.constructor === Object) {
        var handlerRequired = false;
        var config = {
          isSatelliteConfig: true
        };
        var instanceClass;
        for (var key in value) switch (key) {
          case "instance":
            if (value[key] instanceof AbstractNode) config[key] = value[key]; else {
              basis.dev.warn(namespace + ": `instance` value in satellite config must be an instance of basis.dom.wrapper.AbstractNode");
            }
            break;
          case "instanceOf":
            if (Class.isClass(value[key]) && value[key].isSubclassOf(AbstractNode)) instanceClass = value[key]; else {
              basis.dev.warn(namespace + ": `instanceOf` value in satellite config must be a subclass of basis.dom.wrapper.AbstractNode");
            }
            break;
          case "existsIf":
          case "delegate":
          case "dataSource":
            handlerRequired = true;
            config[key] = getter(value[key]);
            break;
          case "config":
            config[key] = value[key];
            break;
        }
        if (!config.instance) config.instanceOf = instanceClass || AbstractNode; else {
          if (instanceClass) basis.dev.warn(namespace + ": `instanceOf` can't be set with `instance` value in satellite config, value ignored");
        }
        if (handlerRequired) {
          var events = "events" in value ? value.events : "update";
          if (Array.isArray(events)) events = events.join(" ");
          if (typeof events == "string") {
            var handler = {};
            events = events.split(/\s+/);
            for (var i = 0, eventName; eventName = events[i]; i++) {
              handler[eventName] = SATELLITE_UPDATE;
              config.handler = handler;
            }
          }
        }
        return config;
      }
      return null;
    }
    function applySatellites(node, satellites) {
      for (var name in satellites) if (satellites[name] && typeof satellites[name] == "object") node.setSatellite(name, satellites[name]);
    }
    var NULL_SATELLITE = Class.customExtendProperty({}, function(result, extend) {
      for (var name in extend) result[name] = processSatelliteConfig(extend[name]);
    });
    var SATELLITE_UPDATE = function(owner) {
      var name = this.name;
      var config = this.config;
      var exists = !config.existsIf || config.existsIf(owner);
      var satellite = owner.satellite[name];
      if (exists) {
        if (satellite) {
          if (config.delegate) satellite.setDelegate(config.delegate(owner));
          if (config.dataSource) satellite.setDataSource(config.dataSource(owner));
        } else {
          satellite = config.instance;
          if (!satellite) {
            var listenHandler;
            var satelliteConfig = (typeof config.config == "function" ? config.config(owner) : config.config) || {};
            satelliteConfig.owner = owner;
            if (config.delegate) {
              satelliteConfig.autoDelegate = false;
              satelliteConfig.delegate = config.delegate(owner);
            }
            if (config.dataSource) satelliteConfig.dataSource = config.dataSource(owner);
            satellite = new config.instanceOf(satelliteConfig);
            satellite.destroy = warnOnAutoSatelliteDestoy;
            if (listenHandler = owner.listen.satellite) satellite.addHandler(listenHandler, owner);
            if (listenHandler = owner.listen["satellite:" + name]) satellite.addHandler(listenHandler, owner);
          } else {
            if (config.delegate) satellite.setDelegate(config.delegate(owner));
            if (config.dataSource) satellite.setDataSource(config.dataSource(owner));
          }
          owner.satellite.__auto__[name].instance = satellite;
          owner.setSatellite(name, satellite, true);
        }
      } else {
        if (satellite) {
          if (config.instance) {
            if (config.delegate) satellite.setDelegate();
            if (config.dataSource) satellite.setDataSource();
          }
          owner.satellite.__auto__[name].instance = null;
          owner.setSatellite(name, null, true);
        }
      }
    };
    var AUTO_SATELLITE_INSTANCE_HANDLER = {
      destroy: function() {
        this.owner.setSatellite(this.name, null);
      }
    };
    var AbstractNode = Class(DataObject, {
      className: namespace + ".AbstractNode",
      subscribeTo: DataObject.prototype.subscribeTo + SUBSCRIPTION.DATASOURCE,
      isSyncRequired: function() {
        return this.state == STATE.UNDEFINED || this.state == STATE.DEPRECATED;
      },
      syncEvents: {
        activeChanged: false
      },
      emit_update: function(delta) {
        DataObject.prototype.emit_update.call(this, delta);
        var parentNode = this.parentNode;
        if (parentNode) {
          if (parentNode.matchFunction) this.match(parentNode.matchFunction);
          parentNode.insertBefore(this, this.nextSibling);
        }
      },
      listen: {
        owner: {
          destroy: function() {
            if (!this.ownerSatelliteName) this.setOwner();
          }
        }
      },
      autoDelegate: DELEGATE.NONE,
      name: null,
      childNodes: null,
      emit_childNodesModified: createEvent("childNodesModified", "delta") && function(delta) {
        events.childNodesModified.call(this, delta);
        var listen = this.listen.childNode;
        var array;
        if (listen) {
          if (array = delta.inserted) for (var i = 0, child; child = array[i]; i++) child.addHandler(listen, this);
          if (array = delta.deleted) for (var i = 0, child; child = array[i]; i++) child.removeHandler(listen, this);
        }
      },
      childNodesState: STATE.UNDEFINED,
      emit_childNodesStateChanged: createEvent("childNodesStateChanged", "oldState"),
      childClass: AbstractNode,
      dataSource: null,
      emit_dataSourceChanged: createEvent("dataSourceChanged", "oldDataSource"),
      dataSourceAdapter_: null,
      dataSourceMap_: null,
      destroyDataSourceMember: true,
      parentNode: null,
      nextSibling: null,
      previousSibling: null,
      firstChild: null,
      lastChild: null,
      sorting: nullGetter,
      sortingDesc: false,
      emit_sortingChanged: createEvent("sortingChanged", "oldSorting", "oldSortingDesc"),
      groupingClass: null,
      grouping: null,
      emit_groupingChanged: createEvent("groupingChanged", "oldGrouping"),
      groupNode: null,
      groupId: NaN,
      satellite: NULL_SATELLITE,
      ownerSatelliteName: null,
      emit_satelliteChanged: createEvent("satelliteChanged", "name", "oldSatellite"),
      owner: null,
      emit_ownerChanged: createEvent("ownerChanged", "oldOwner"),
      init: function() {
        DataObject.prototype.init.call(this);
        var childNodes = this.childNodes;
        var dataSource = this.dataSource;
        if (childNodes) this.childNodes = null;
        if (dataSource) this.dataSource = null;
        var grouping = this.grouping;
        if (grouping) {
          this.grouping = null;
          this.setGrouping(grouping);
        }
        if (this.childClass) {
          this.childNodes = [];
          if (dataSource) {
            this.setDataSource(dataSource);
          } else {
            if (childNodes) this.setChildNodes(childNodes);
          }
        }
        var satellites = this.satellite;
        if (satellites !== NULL_SATELLITE) {
          this.satellite = NULL_SATELLITE;
          applySatellites(this, satellites);
        }
        var owner = this.owner;
        if (owner) {
          this.owner = null;
          this.setOwner(owner);
        }
      },
      setChildNodesState: function(state, data) {
        var stateCode = String(state);
        var oldState = this.childNodesState;
        if (!STATE.values[stateCode]) throw new Error("Wrong state value");
        if (oldState != stateCode || oldState.data != data) {
          this.childNodesState = Object(stateCode);
          this.childNodesState.data = data;
          this.emit_childNodesStateChanged(oldState);
        }
      },
      appendChild: function(newChild) {},
      insertBefore: function(newChild, refChild) {},
      removeChild: function(oldChild) {},
      replaceChild: function(newChild, oldChild) {},
      clear: function(alive) {},
      setChildNodes: function(nodes) {},
      setGrouping: function(grouping, alive) {},
      setSorting: function(sorting, desc) {},
      setDataSource: function(dataSource) {},
      setOwner: function(owner) {
        if (!owner || owner instanceof AbstractNode == false) owner = null;
        if (owner && this.parentNode) throw EXCEPTION_PARENTNODE_OWNER_CONFLICT;
        var oldOwner = this.owner;
        if (oldOwner !== owner) {
          var listenHandler = this.listen.owner;
          if (oldOwner) {
            if (this.ownerSatelliteName && oldOwner.satellite.__auto__ && this.ownerSatelliteName in oldOwner.satellite.__auto__) {
              basis.dev.warn(namespace + ": auto-satellite can't change it's owner");
              return;
            }
            if (listenHandler) oldOwner.removeHandler(listenHandler, this);
            if (this.ownerSatelliteName) {
              this.owner = null;
              oldOwner.setSatellite(this.ownerSatelliteName, null);
            }
          }
          if (owner && listenHandler) owner.addHandler(listenHandler, this);
          this.owner = owner;
          this.emit_ownerChanged(oldOwner);
          if (this.autoDelegate == DELEGATE.OWNER || this.autoDelegate === DELEGATE.ANY) this.setDelegate(owner);
        }
      },
      setSatellite: function(name, satellite, autoSet) {
        var oldSatellite = this.satellite[name] || null;
        var auto = this.satellite.__auto__;
        var autoConfig = auto && auto[name];
        var preserveAuto = autoSet && autoConfig;
        if (preserveAuto) {
          satellite = autoConfig.instance;
          if (autoConfig.config.instance) {
            if (satellite) delete autoConfig.config.instance.setOwner;
          }
        } else {
          satellite = processSatelliteConfig(satellite);
          if (satellite && satellite.owner && auto && satellite.ownerSatelliteName && auto[satellite.ownerSatelliteName]) {
            basis.dev.warn(namespace + ": auto-create satellite can't change name inside owner");
            return;
          }
          if (autoConfig) {
            delete auto[name];
            if (autoConfig.config.instance) autoConfig.config.instance.removeHandler(AUTO_SATELLITE_INSTANCE_HANDLER, autoConfig);
            if (autoConfig.config.handler) this.removeHandler(autoConfig.config.handler, autoConfig);
          }
        }
        if (oldSatellite !== satellite) {
          var satelliteListen = this.listen.satellite;
          var satellitePersonalListen = this.listen["satellite:" + name];
          var destroySatellite;
          if (oldSatellite) {
            delete this.satellite[name];
            oldSatellite.ownerSatelliteName = null;
            if (autoConfig && oldSatellite.destroy === warnOnAutoSatelliteDestoy) {
              destroySatellite = oldSatellite;
            } else {
              if (satelliteListen) oldSatellite.removeHandler(satelliteListen, this);
              if (satellitePersonalListen) oldSatellite.removeHandler(satellitePersonalListen, this);
              oldSatellite.setOwner(null);
            }
            if (preserveAuto && !satellite && autoConfig.config.instance) autoConfig.config.instance.setOwner = warnOnAutoSatelliteOwnerChange;
          }
          if (satellite) {
            if (satellite instanceof AbstractNode == false) {
              var autoConfig = {
                owner: this,
                name: name,
                config: satellite,
                instance: null
              };
              if (satellite.handler) this.addHandler(satellite.handler, autoConfig);
              if (satellite.instance) {
                satellite.instance.addHandler(AUTO_SATELLITE_INSTANCE_HANDLER, autoConfig);
                satellite.instance.setOwner = warnOnAutoSatelliteOwnerChange;
              }
              if (!auto) {
                if (this.satellite === NULL_SATELLITE) this.satellite = {};
                auto = this.satellite.__auto__ = {};
              }
              auto[name] = autoConfig;
              SATELLITE_UPDATE.call(autoConfig, this);
              if (!autoConfig.instance && oldSatellite) this.emit_satelliteChanged(name, oldSatellite);
              if (destroySatellite) {
                delete destroySatellite.destroy;
                destroySatellite.destroy();
              }
              return;
            }
            if (satellite.owner !== this) {
              if (autoConfig && autoConfig.config.delegate) {
                var autoDelegate = satellite.autoDelegate;
                satellite.autoDelegate = false;
                satellite.setOwner(this);
                satellite.autoDelegate = autoDelegate;
              } else satellite.setOwner(this);
              if (satellite.owner !== this) return;
              if (satelliteListen) satellite.addHandler(satelliteListen, this);
              if (satellitePersonalListen) satellite.addHandler(satellitePersonalListen, this);
            } else {
              if (satellite.ownerSatelliteName) {
                delete this.satellite[satellite.ownerSatelliteName];
                this.emit_satelliteChanged(satellite.ownerSatelliteName, satellite);
              }
            }
            if (this.satellite == NULL_SATELLITE) this.satellite = {};
            this.satellite[name] = satellite;
            satellite.ownerSatelliteName = name;
          }
          this.emit_satelliteChanged(name, oldSatellite);
          if (destroySatellite) {
            delete destroySatellite.destroy;
            destroySatellite.destroy();
          }
        }
      },
      getChildNodesDataset: function() {
        return childNodesDatasetMap[this.basisObjectId] || new ChildNodesDataset({
          sourceNode: this
        });
      },
      destroy: function() {
        DataObject.prototype.destroy.call(this);
        if (this.dataSource || this.dataSourceAdapter_) {
          this.setDataSource();
        } else {
          if (this.firstChild) this.clear();
        }
        if (this.parentNode) this.parentNode.removeChild(this);
        if (this.grouping) {
          this.grouping.setOwner();
          this.grouping = null;
        }
        if (this.owner) this.setOwner();
        var satellites = this.satellite;
        if (satellites !== NULL_SATELLITE) {
          var auto = satellites.__auto__;
          delete satellites.__auto__;
          for (var name in auto) if (auto[name].config.instance && !auto[name].instance) auto[name].config.instance.destroy();
          for (var name in satellites) {
            var satellite = satellites[name];
            satellite.owner = null;
            satellite.ownerSatelliteName = null;
            if (satellite.destroy === warnOnAutoSatelliteDestoy) delete satellite.destroy;
            satellite.destroy();
          }
          this.satellite = null;
        }
        this.childNodes = null;
        this.parentNode = null;
        this.previousSibling = null;
        this.nextSibling = null;
        this.firstChild = null;
        this.lastChild = null;
      }
    });
    var PartitionNode = Class(AbstractNode, {
      className: namespace + ".PartitionNode",
      autoDestroyIfEmpty: false,
      nodes: null,
      first: null,
      last: null,
      init: function() {
        this.nodes = [];
        AbstractNode.prototype.init.call(this);
      },
      insert: function(newNode, refNode) {
        var nodes = this.nodes;
        var pos = refNode ? nodes.indexOf(refNode) : -1;
        if (pos == -1) {
          nodes.push(newNode);
          this.last = newNode;
        } else nodes.splice(pos, 0, newNode);
        this.first = nodes[0];
        newNode.groupNode = this;
        this.emit_childNodesModified({
          inserted: [ newNode ]
        });
      },
      remove: function(oldNode) {
        var nodes = this.nodes;
        if (arrayRemove(nodes, oldNode)) {
          this.first = nodes[0] || null;
          this.last = nodes[nodes.length - 1] || null;
          oldNode.groupNode = null;
          this.emit_childNodesModified({
            deleted: [ oldNode ]
          });
        }
        if (!this.first && this.autoDestroyIfEmpty) this.destroy();
      },
      clear: function() {
        if (!this.first) return;
        var nodes = this.nodes;
        for (var i = nodes.length; i-- > 0; ) nodes[i].groupNode = null;
        this.nodes = [];
        this.first = null;
        this.last = null;
        this.emit_childNodesModified({
          deleted: nodes
        });
        if (this.autoDestroyIfEmpty) this.destroy();
      },
      destroy: function() {
        AbstractNode.prototype.destroy.call(this);
        this.nodes = null;
        this.first = null;
        this.last = null;
      }
    });
    var DOMMIXIN_DATASOURCE_HANDLER = {
      itemsChanged: function(dataSource, delta) {
        var newDelta = {};
        var deleted = [];
        if (delta.deleted) {
          newDelta.deleted = deleted;
          if (this.childNodes.length == delta.deleted.length) {
            deleted = arrayFrom(this.childNodes);
            for (var i = 0, child; child = deleted[i]; i++) unlockDataSourceItemNode(child);
            var tmp = this.dataSource;
            this.dataSource = null;
            this.clear(true);
            this.dataSource = tmp;
            this.dataSourceMap_ = {};
          } else {
            for (var i = 0, item; item = delta.deleted[i]; i++) {
              var delegateId = item.basisObjectId;
              var oldChild = this.dataSourceMap_[delegateId];
              unlockDataSourceItemNode(oldChild);
              delete this.dataSourceMap_[delegateId];
              this.removeChild(oldChild);
              deleted.push(oldChild);
            }
          }
        }
        if (delta.inserted) {
          newDelta.inserted = [];
          for (var i = 0, item; item = delta.inserted[i]; i++) {
            var newChild = createChildByFactory(this, {
              delegate: item
            });
            lockDataSourceItemNode(newChild);
            this.dataSourceMap_[item.basisObjectId] = newChild;
            newDelta.inserted.push(newChild);
            if (this.firstChild) this.insertBefore(newChild);
          }
        }
        if (!this.firstChild) this.setChildNodes(newDelta.inserted); else this.emit_childNodesModified(newDelta);
        if (this.destroyDataSourceMember && deleted.length) for (var i = 0, item; item = deleted[i]; i++) item.destroy();
      },
      stateChanged: function(dataSource) {
        this.setChildNodesState(dataSource.state, dataSource.state.data);
      },
      destroy: function(dataSource) {
        if (!this.dataSourceAdapter_) this.setDataSource();
      }
    };
    var MIXIN_DATASOURCE_WRAPPER_HANDLER = {
      datasetChanged: function(wrapper) {
        this.setDataSource(wrapper);
      },
      destroy: function() {
        this.setDataSource();
      }
    };
    function fastChildNodesOrder(node, order) {
      var lastIndex = order.length - 1;
      node.childNodes = order;
      node.firstChild = order[0] || null;
      node.lastChild = order[lastIndex] || null;
      for (var orderNode, i = lastIndex; orderNode = order[i]; i--) {
        orderNode.nextSibling = order[i + 1] || null;
        orderNode.previousSibling = order[i - 1] || null;
        node.insertBefore(orderNode, orderNode.nextSibling);
      }
    }
    function fastChildNodesGroupOrder(node, order) {
      for (var i = 0, child; child = order[i]; i++) child.groupNode.nodes.push(child);
      order.length = 0;
      for (var group = node.grouping.nullGroup; group; group = group.nextSibling) {
        var nodes = group.nodes;
        group.first = nodes[0] || null;
        group.last = nodes[nodes.length - 1] || null;
        order.push.apply(order, nodes);
        group.emit_childNodesModified({
          inserted: nodes
        });
      }
      return order;
    }
    function createChildByFactory(node, config) {
      var child;
      if (typeof node.childFactory == "function") {
        child = node.childFactory(config);
        if (child instanceof node.childClass) return child;
      }
      if (!child) throw EXCEPTION_NULL_CHILD;
      basis.dev.warn(EXCEPTION_BAD_CHILD_CLASS + " (expected " + (node.childClass && node.childClass.className) + " but " + (child && child.constructor && child.constructor.className) + ")");
      throw EXCEPTION_BAD_CHILD_CLASS;
    }
    var DomMixin = {
      childClass: AbstractNode,
      childFactory: null,
      listen: {
        dataSource: DOMMIXIN_DATASOURCE_HANDLER
      },
      getChild: function(value, getter) {
        return basis.array.search(this.childNodes, value, getter);
      },
      getChildByName: function(name) {
        return this.getChild(name, "name");
      },
      appendChild: function(newChild) {
        return this.insertBefore(newChild);
      },
      insertBefore: function(newChild, refChild) {
        if (!this.childClass) throw EXCEPTION_NO_CHILDCLASS;
        if (newChild.firstChild) {
          var cursor = this;
          while (cursor = cursor.parentNode) {
            if (cursor === newChild) throw EXCEPTION_CANT_INSERT;
          }
        }
        var isChildClassInstance = newChild && newChild instanceof this.childClass;
        if (this.dataSource) {
          if (!isChildClassInstance || !newChild.delegate || this.dataSourceMap_[newChild.delegate.basisObjectId] !== newChild) throw EXCEPTION_DATASOURCE_CONFLICT;
        } else {
          if (this.dataSourceAdapter_) throw EXCEPTION_DATASOURCEADAPTER_CONFLICT;
        }
        if (!isChildClassInstance) newChild = createChildByFactory(this, newChild instanceof DataObject ? {
          delegate: newChild
        } : newChild);
        if (newChild.owner) throw EXCEPTION_PARENTNODE_OWNER_CONFLICT;
        var isInside = newChild.parentNode === this;
        var childNodes = this.childNodes;
        var grouping = this.grouping;
        var groupNodes;
        var currentNewChildGroup = newChild.groupNode;
        var group = null;
        var sorting = this.sorting;
        var sortingDesc;
        var correctSortPos = false;
        var newChildValue;
        var pos = -1;
        var nextSibling;
        var prevSibling;
        if (isInside) {
          nextSibling = newChild.nextSibling;
          prevSibling = newChild.previousSibling;
        }
        if (sorting !== nullGetter) {
          refChild = null;
          sortingDesc = this.sortingDesc;
          newChildValue = sorting(newChild) || 0;
          if (isInside) {
            if (newChildValue === newChild.sortingValue) {
              correctSortPos = true;
            } else {
              if ((!nextSibling || (sortingDesc ? nextSibling.sortingValue <= newChildValue : nextSibling.sortingValue >= newChildValue)) && (!prevSibling || (sortingDesc ? prevSibling.sortingValue >= newChildValue : prevSibling.sortingValue <= newChildValue))) {
                newChild.sortingValue = newChildValue;
                correctSortPos = true;
              }
            }
          }
        }
        if (grouping) {
          var cursor;
          group = grouping.getGroupNode(newChild, true);
          groupNodes = group.nodes;
          if (currentNewChildGroup === group) if (correctSortPos || sorting === nullGetter && nextSibling === refChild) return newChild;
          if (sorting !== nullGetter) {
            if (currentNewChildGroup === group && correctSortPos) {
              if (nextSibling && nextSibling.groupNode === group) pos = groupNodes.indexOf(nextSibling); else pos = groupNodes.length;
            } else {
              pos = binarySearchPos(groupNodes, newChildValue, sortingSearch, sortingDesc);
              newChild.sortingValue = newChildValue;
            }
          } else {
            if (refChild && refChild.groupNode === group) pos = groupNodes.indexOf(refChild); else pos = groupNodes.length;
          }
          if (pos < groupNodes.length) {
            refChild = groupNodes[pos];
          } else {
            if (group.last) {
              refChild = group.last.nextSibling;
            } else {
              cursor = group;
              refChild = null;
              while (cursor = cursor.nextSibling) if (refChild = cursor.first) break;
            }
          }
          if (newChild === refChild || isInside && nextSibling === refChild) {
            if (currentNewChildGroup !== group) {
              if (currentNewChildGroup) currentNewChildGroup.remove(newChild);
              group.insert(newChild, refChild);
            }
            return newChild;
          }
          pos = -1;
        } else {
          if (sorting !== nullGetter) {
            if (correctSortPos) return newChild;
            pos = binarySearchPos(childNodes, newChildValue, sortingSearch, sortingDesc);
            refChild = childNodes[pos];
            newChild.sortingValue = newChildValue;
            if (newChild === refChild || isInside && nextSibling === refChild) return newChild;
          } else {
            if (refChild && refChild.parentNode !== this) throw EXCEPTION_NODE_NOT_FOUND;
            if (isInside) {
              if (nextSibling === refChild) return newChild;
              if (newChild === refChild) throw EXCEPTION_CANT_INSERT;
            }
          }
        }
        if (isInside) {
          if (nextSibling) {
            nextSibling.previousSibling = prevSibling;
            newChild.nextSibling = null;
          } else this.lastChild = prevSibling;
          if (prevSibling) {
            prevSibling.nextSibling = nextSibling;
            newChild.previousSibling = null;
          } else this.firstChild = nextSibling;
          if (pos == -1) arrayRemove(childNodes, newChild); else {
            var oldPos = childNodes.indexOf(newChild);
            childNodes.splice(oldPos, 1);
            pos -= oldPos < pos;
          }
          if (currentNewChildGroup) {
            currentNewChildGroup.remove(newChild);
            currentNewChildGroup = null;
          }
        } else {
          if (newChild.parentNode) newChild.parentNode.removeChild(newChild);
        }
        if (currentNewChildGroup != group) group.insert(newChild, refChild);
        if (refChild) {
          if (pos == -1) pos = childNodes.indexOf(refChild);
          if (pos == -1) throw EXCEPTION_NODE_NOT_FOUND;
          newChild.nextSibling = refChild;
          childNodes.splice(pos, 0, newChild);
        } else {
          pos = childNodes.length;
          childNodes.push(newChild);
          refChild = {
            previousSibling: this.lastChild
          };
          this.lastChild = newChild;
        }
        newChild.parentNode = this;
        newChild.previousSibling = refChild.previousSibling;
        if (pos == 0) this.firstChild = newChild; else refChild.previousSibling.nextSibling = newChild;
        refChild.previousSibling = newChild;
        if (!isInside) {
          updateNodeContextSelection(newChild, newChild.contextSelection, this.selection || this.contextSelection, true);
          updateNodeDisableContext(newChild, this.disabled || this.contextDisabled);
          if ((newChild.underMatch_ || this.matchFunction) && newChild.match) newChild.match(this.matchFunction);
          if (newChild.autoDelegate == DELEGATE.PARENT || newChild.autoDelegate === DELEGATE.ANY) newChild.setDelegate(this);
          if (!this.dataSource) this.emit_childNodesModified({
            inserted: [ newChild ]
          });
          if (newChild.listen.parentNode) this.addHandler(newChild.listen.parentNode, newChild);
        }
        return newChild;
      },
      removeChild: function(oldChild) {
        if (!oldChild || oldChild.parentNode !== this) throw EXCEPTION_NODE_NOT_FOUND;
        if (oldChild instanceof this.childClass == false) throw EXCEPTION_BAD_CHILD_CLASS;
        if (this.dataSource) {
          if (this.dataSource.has(oldChild.delegate)) throw EXCEPTION_DATASOURCE_CONFLICT;
        } else {
          if (this.dataSourceAdapter_) throw EXCEPTION_DATASOURCEADAPTER_CONFLICT;
        }
        var pos = this.childNodes.indexOf(oldChild);
        if (pos == -1) throw EXCEPTION_NODE_NOT_FOUND;
        this.childNodes.splice(pos, 1);
        oldChild.parentNode = null;
        if (oldChild.nextSibling) oldChild.nextSibling.previousSibling = oldChild.previousSibling; else this.lastChild = oldChild.previousSibling;
        if (oldChild.previousSibling) oldChild.previousSibling.nextSibling = oldChild.nextSibling; else this.firstChild = oldChild.nextSibling;
        oldChild.nextSibling = null;
        oldChild.previousSibling = null;
        if (oldChild.listen.parentNode) this.removeHandler(oldChild.listen.parentNode, oldChild);
        updateNodeContextSelection(oldChild, oldChild.contextSelection, null, true);
        if (oldChild.groupNode) oldChild.groupNode.remove(oldChild);
        if (!this.dataSource) this.emit_childNodesModified({
          deleted: [ oldChild ]
        });
        if (oldChild.autoDelegate == DELEGATE.PARENT || oldChild.autoDelegate === DELEGATE.ANY) oldChild.setDelegate();
        return oldChild;
      },
      replaceChild: function(newChild, oldChild) {
        if (this.dataSource) throw EXCEPTION_DATASOURCE_CONFLICT;
        if (this.dataSourceAdapter_) throw EXCEPTION_DATASOURCEADAPTER_CONFLICT;
        if (oldChild == null || oldChild.parentNode !== this) throw EXCEPTION_NODE_NOT_FOUND;
        this.insertBefore(newChild, oldChild);
        return this.removeChild(oldChild);
      },
      clear: function(alive) {
        if (this.dataSource && this.dataSource.itemCount) throw EXCEPTION_DATASOURCE_CONFLICT;
        if (!this.firstChild) return;
        if (alive) updateNodeContextSelection(this, this.selection || this.contextSelection, null, false, true);
        var childNodes = this.childNodes;
        this.firstChild = null;
        this.lastChild = null;
        this.childNodes = [];
        this.emit_childNodesModified({
          deleted: childNodes
        });
        for (var i = childNodes.length; i-- > 0; ) {
          var child = childNodes[i];
          if (child.listen.parentNode) child.parentNode.removeHandler(child.listen.parentNode, child);
          child.parentNode = null;
          child.groupNode = null;
          if (alive) {
            child.nextSibling = null;
            child.previousSibling = null;
            if (child.autoDelegate == DELEGATE.PARENT || child.autoDelegate === DELEGATE.ANY) child.setDelegate();
          } else child.destroy();
        }
        if (this.grouping) {
          for (var childNodes = this.grouping.childNodes, i = childNodes.length - 1, group; group = childNodes[i]; i--) group.clear();
        }
      },
      setChildNodes: function(newChildNodes, keepAlive) {
        if (!this.dataSource && !this.dataSourceAdapter_) this.clear(keepAlive);
        if (newChildNodes) {
          if ("length" in newChildNodes == false) newChildNodes = [ newChildNodes ];
          if (newChildNodes.length) {
            var tmp = this.emit_childNodesModified;
            this.emit_childNodesModified = $undef;
            for (var i = 0, len = newChildNodes.length; i < len; i++) this.insertBefore(newChildNodes[i]);
            this.emit_childNodesModified = tmp;
            this.emit_childNodesModified({
              inserted: this.childNodes
            });
          }
        }
      },
      setDataSource: function(dataSource) {
        if (!this.childClass) throw EXCEPTION_NO_CHILDCLASS;
        dataSource = basis.data.resolveDataset(this, this.setDataSource, dataSource, "dataSourceAdapter_");
        if (this.dataSource !== dataSource) {
          var oldDataSource = this.dataSource;
          var listenHandler = this.listen.dataSource;
          if (oldDataSource) {
            this.dataSourceMap_ = null;
            this.dataSource = null;
            if (listenHandler) oldDataSource.removeHandler(listenHandler, this);
          }
          if (this.firstChild) {
            if (oldDataSource) for (var i = 0, child; child = this.childNodes[i]; i++) unlockDataSourceItemNode(child);
            this.clear();
          }
          this.dataSource = dataSource;
          if (dataSource) {
            this.dataSourceMap_ = {};
            this.setChildNodesState(dataSource.state, dataSource.state.data);
            if (listenHandler) {
              dataSource.addHandler(listenHandler, this);
              if (dataSource.itemCount && listenHandler.itemsChanged) {
                listenHandler.itemsChanged.call(this, dataSource, {
                  inserted: dataSource.getItems()
                });
              }
            }
          } else {
            this.setChildNodesState(STATE.UNDEFINED);
          }
          this.emit_dataSourceChanged(oldDataSource);
        }
      },
      setGrouping: function(grouping, alive) {
        if (typeof grouping == "function" || typeof grouping == "string") grouping = {
          rule: grouping
        };
        if (grouping instanceof GroupingNode == false) {
          grouping = grouping && typeof grouping == "object" ? new this.groupingClass(grouping) : null;
        }
        if (this.grouping !== grouping) {
          var oldGrouping = this.grouping;
          var order;
          if (oldGrouping) {
            this.grouping = null;
            if (!grouping) {
              if (this.firstChild) {
                if (this.sorting !== nullGetter) order = sortChildNodes(this); else order = this.childNodes;
                oldGrouping.nullGroup.clear();
                var groups = oldGrouping.childNodes.slice(0);
                for (var i = 0; i < groups.length; i++) groups[i].clear();
                fastChildNodesOrder(this, order);
              }
            }
            oldGrouping.setOwner();
          }
          if (grouping) {
            this.grouping = grouping;
            grouping.setOwner(this);
            if (this.firstChild) {
              if (this.sorting !== nullGetter) order = sortChildNodes(this); else order = this.childNodes;
              for (var i = 0, child; child = order[i]; i++) child.groupNode = this.grouping.getGroupNode(child, true);
              order = fastChildNodesGroupOrder(this, order);
              fastChildNodesOrder(this, order);
            }
          }
          this.emit_groupingChanged(oldGrouping);
        }
      },
      setSorting: function(sorting, sortingDesc) {
        sorting = getter(sorting);
        sortingDesc = !!sortingDesc;
        if (this.sorting !== sorting || this.sortingDesc != !!sortingDesc) {
          var oldSorting = this.sorting;
          var oldSortingDesc = this.sortingDesc;
          this.sorting = sorting;
          this.sortingDesc = !!sortingDesc;
          if (sorting !== nullGetter && this.firstChild) {
            var order = [];
            var nodes;
            for (var node = this.firstChild; node; node = node.nextSibling) node.sortingValue = sorting(node) || 0;
            if (this.grouping) {
              for (var group = this.grouping.nullGroup; group; group = group.nextSibling) {
                nodes = group.nodes = sortChildNodes({
                  childNodes: group.nodes,
                  sortingDesc: this.sortingDesc
                });
                group.first = nodes[0] || null;
                group.last = nodes[nodes.length - 1] || null;
                order.push.apply(order, nodes);
              }
            } else {
              order = sortChildNodes(this);
            }
            fastChildNodesOrder(this, order);
          }
          this.emit_sortingChanged(oldSorting, oldSortingDesc);
        }
      },
      setMatchFunction: function(matchFunction) {
        if (this.matchFunction != matchFunction) {
          var oldMatchFunction = this.matchFunction;
          this.matchFunction = matchFunction;
          for (var node = this.lastChild; node; node = node.previousSibling) node.match(matchFunction);
          this.emit_matchFunctionChanged(oldMatchFunction);
        }
      }
    };
    var Node = Class(AbstractNode, DomMixin, {
      className: namespace + ".Node",
      emit_enable: createEvent("enable") && function() {
        for (var child = this.firstChild; child; child = child.nextSibling) updateNodeDisableContext(child, false);
        events.enable.call(this);
      },
      emit_disable: createEvent("disable") && function() {
        for (var child = this.firstChild; child; child = child.nextSibling) updateNodeDisableContext(child, true);
        events.disable.call(this);
      },
      emit_satelliteChanged: function(name, oldSatellite) {
        AbstractNode.prototype.emit_satelliteChanged.call(this, name, oldSatellite);
        if (this.satellite[name] instanceof Node) updateNodeDisableContext(this.satellite[name], this.disabled || this.contextDisabled);
      },
      emit_select: createEvent("select"),
      emit_unselect: createEvent("unselect"),
      emit_match: createEvent("match"),
      emit_unmatch: createEvent("unmatch"),
      emit_matchFunctionChanged: createEvent("matchFunctionChanged", "oldMatchFunction"),
      selectable: true,
      selected: false,
      selection: null,
      contextSelection: null,
      matchFunction: null,
      matched: true,
      disabled: false,
      contextDisabled: false,
      listen: {
        owner: {
          enable: function() {
            updateNodeDisableContext(this, false);
          },
          disable: function() {
            updateNodeDisableContext(this, true);
          }
        }
      },
      init: function() {
        if (this.selection) {
          if (this.selection instanceof ReadOnlyDataset == false) this.selection = new Selection(this.selection);
          if (this.listen.selection) this.selection.addHandler(this.listen.selection, this);
        }
        AbstractNode.prototype.init.call(this);
        if (this.disabled) this.emit_disable();
        if (this.selected) {
          this.selected = false;
          this.select(true);
        }
      },
      setSelection: function(selection) {
        if (this.selection !== selection) {
          updateNodeContextSelection(this, this.selection || this.contextSelection, selection || this.contextSelection, false, true);
          if (this.selection && this.listen.selection) this.selection.removeHandler(this.listen.selection, this);
          this.selection = selection;
          if (selection && this.listen.selection) selection.addHandler(this.listen.selection, this);
          return true;
        }
      },
      select: function(multiple) {
        var selected = this.selected;
        var selection = this.contextSelection;
        if (selection) {
          if (!multiple) {
            if (this.selectable) selection.set([ this ]);
          } else {
            if (selected) selection.remove([ this ]); else selection.add([ this ]);
          }
        } else if (!selected && this.selectable) {
          this.selected = true;
          this.emit_select();
        }
        return this.selected != selected;
      },
      unselect: function() {
        var selected = this.selected;
        if (selected) {
          var selection = this.contextSelection;
          if (selection) selection.remove([ this ]); else {
            this.selected = false;
            this.emit_unselect();
          }
        }
        return this.selected != selected;
      },
      setSelected: function(selected, multiple) {
        return selected ? this.select(multiple) : this.unselect();
      },
      enable: function() {
        var disabled = this.disabled;
        if (disabled) {
          this.disabled = false;
          if (!this.contextDisabled) this.emit_enable();
        }
        return this.disabled != disabled;
      },
      disable: function() {
        var disabled = this.disabled;
        if (!disabled) {
          this.disabled = true;
          if (!this.contextDisabled) this.emit_disable();
        }
        return this.disabled != disabled;
      },
      setDisabled: function(disabled) {
        return disabled ? this.disable() : this.enable();
      },
      isDisabled: function() {
        return this.disabled || this.contextDisabled;
      },
      match: function(func) {
        if (typeof func != "function") func = null;
        if (this.underMatch_ && !func) this.underMatch_(this, true);
        this.underMatch_ = func;
        var matched = !func || func(this);
        if (this.matched != matched) {
          this.matched = matched;
          if (matched) this.emit_match(); else this.emit_unmatch();
        }
      },
      destroy: function() {
        this.unselect();
        this.contextSelection = null;
        if (this.selection) this.setSelection();
        AbstractNode.prototype.destroy.call(this);
      }
    });
    var GroupingNode = Class(AbstractNode, DomMixin, {
      className: namespace + ".GroupingNode",
      emit_childNodesModified: function(delta) {
        events.childNodesModified.call(this, delta);
        this.nullGroup.nextSibling = this.firstChild;
        var array;
        if (array = delta.inserted) {
          for (var i = 0, child; child = array[i++]; ) {
            child.groupId_ = child.delegate ? child.delegate.basisObjectId : child.data.id;
            this.map_[child.groupId_] = child;
          }
          if (this.dataSource && this.nullGroup.first) {
            var parentNode = this.owner;
            var nodes = arrayFrom(this.nullGroup.nodes);
            for (var i = nodes.length; i-- > 0; ) parentNode.insertBefore(nodes[i], nodes[i].nextSibling);
          }
        }
      },
      emit_ownerChanged: function(oldOwner) {
        if (oldOwner && oldOwner.grouping === this) oldOwner.setGrouping(null, true);
        if (this.owner && this.owner.grouping !== this) this.owner.setGrouping(this);
        events.ownerChanged.call(this, oldOwner);
        if (!this.owner && this.autoDestroyWithNoOwner) this.destroy();
      },
      map_: null,
      nullGroup: null,
      autoDestroyWithNoOwner: true,
      autoDestroyEmptyGroups: true,
      rule: nullGetter,
      childClass: PartitionNode,
      childFactory: function(config) {
        return new this.childClass(complete({
          autoDestroyIfEmpty: this.dataSource ? false : this.autoDestroyEmptyGroups
        }, config));
      },
      init: function() {
        this.map_ = {};
        this.nullGroup = new PartitionNode;
        AbstractNode.prototype.init.call(this);
      },
      getGroupNode: function(node, autocreate) {
        var groupRef = this.rule(node);
        var isDelegate = groupRef instanceof DataObject;
        var group = this.map_[isDelegate ? groupRef.basisObjectId : groupRef];
        if (this.dataSource) autocreate = false;
        if (!group && autocreate) {
          group = this.appendChild(isDelegate ? groupRef : {
            data: {
              id: groupRef,
              title: groupRef
            }
          });
        }
        return group || this.nullGroup;
      },
      setDataSource: function(dataSource) {
        var curDataSource = this.dataSource;
        DomMixin.setDataSource.call(this, dataSource);
        var owner = this.owner;
        if (owner && this.dataSource !== curDataSource) {
          var nodes = arrayFrom(owner.childNodes);
          for (var i = nodes.length - 1; i >= 0; i--) owner.insertBefore(nodes[i], nodes[i + 1]);
        }
      },
      insertBefore: function(newChild, refChild) {
        newChild = DomMixin.insertBefore.call(this, newChild, refChild);
        var firstNode = newChild.first;
        if (firstNode) {
          var parent = firstNode.parentNode;
          var lastNode = newChild.last;
          var beforePrev;
          var beforeNext;
          var afterPrev;
          var afterNext = null;
          var cursor = newChild;
          while (cursor = cursor.nextSibling) {
            if (afterNext = cursor.first) break;
          }
          afterPrev = afterNext ? afterNext.previousSibling : parent.lastChild;
          beforePrev = firstNode.previousSibling;
          beforeNext = lastNode.nextSibling;
          if (beforeNext !== afterNext) {
            var parentChildNodes = parent.childNodes;
            var nodes = newChild.nodes;
            var nodesCount = nodes.length;
            if (beforePrev) beforePrev.nextSibling = beforeNext;
            if (beforeNext) beforeNext.previousSibling = beforePrev;
            if (afterPrev) afterPrev.nextSibling = firstNode;
            if (afterNext) afterNext.previousSibling = lastNode;
            firstNode.previousSibling = afterPrev;
            lastNode.nextSibling = afterNext;
            var firstPos = parentChildNodes.indexOf(firstNode);
            var afterNextPos = afterNext ? parentChildNodes.indexOf(afterNext) : parentChildNodes.length;
            if (afterNextPos > firstPos) afterNextPos -= nodesCount;
            parentChildNodes.splice(firstPos, nodesCount);
            parentChildNodes.splice.apply(parentChildNodes, [ afterNextPos, 0 ].concat(nodes));
            if (!afterPrev || !beforePrev) parent.firstChild = parentChildNodes[0];
            if (!afterNext || !beforeNext) parent.lastChild = parentChildNodes[parentChildNodes.length - 1];
            if (firstNode instanceof PartitionNode) for (var i = nodesCount, insertBefore = afterNext; i-- > 0; ) {
              parent.insertBefore(nodes[i], insertBefore);
              insertBefore = nodes[i];
            }
          }
        }
        return newChild;
      },
      removeChild: function(oldChild) {
        if (oldChild = DomMixin.removeChild.call(this, oldChild)) {
          delete this.map_[oldChild.groupId_];
          for (var i = 0, node; node = oldChild.nodes[i]; i++) node.parentNode.insertBefore(node);
        }
        return oldChild;
      },
      clear: function(alive) {
        var nodes = [];
        var getGroupNode = this.getGroupNode;
        var nullGroup = this.nullGroup;
        this.getGroupNode = function() {
          return nullGroup;
        };
        for (var group = this.firstChild; group; group = group.nextSibling) nodes.push.apply(nodes, group.nodes);
        for (var i = 0, child; child = nodes[i]; i++) child.parentNode.insertBefore(child);
        this.getGroupNode = getGroupNode;
        DomMixin.clear.call(this, alive);
        this.map_ = {};
      },
      destroy: function() {
        this.autoDestroyWithNoOwner = false;
        AbstractNode.prototype.destroy.call(this);
        this.nullGroup.destroy();
        this.nullGroup = null;
        this.map_ = null;
      }
    });
    AbstractNode.prototype.groupingClass = GroupingNode;
    var CHILDNODESDATASET_HANDLER = {
      childNodesModified: function(sender, delta) {
        var memberMap = this.members_;
        var newDelta = {};
        var node;
        var insertCount = 0;
        var deleteCount = 0;
        var inserted = delta.inserted;
        var deleted = delta.deleted;
        if (inserted && inserted.length) {
          newDelta.inserted = inserted;
          while (node = inserted[insertCount]) {
            memberMap[node.basisObjectId] = node;
            insertCount++;
          }
        }
        if (deleted && deleted.length) {
          newDelta.deleted = deleted;
          while (node = deleted[deleteCount]) {
            delete memberMap[node.basisObjectId];
            deleteCount++;
          }
        }
        if (insertCount || deleteCount) this.emit_itemsChanged(newDelta);
      },
      destroy: function() {
        this.destroy();
      }
    };
    var ChildNodesDataset = Class(ReadOnlyDataset, {
      className: namespace + ".ChildNodesDataset",
      sourceNode: null,
      init: function() {
        ReadOnlyDataset.prototype.init.call(this);
        var sourceNode = this.sourceNode;
        childNodesDatasetMap[sourceNode.basisObjectId] = this;
        if (sourceNode.firstChild) CHILDNODESDATASET_HANDLER.childNodesModified.call(this, sourceNode, {
          inserted: sourceNode.childNodes
        });
        sourceNode.addHandler(CHILDNODESDATASET_HANDLER, this);
      },
      destroy: function() {
        this.sourceNode.removeHandler(CHILDNODESDATASET_HANDLER, this);
        delete childNodesDatasetMap[this.sourceNode.basisObjectId];
        ReadOnlyDataset.prototype.destroy.call(this);
      }
    });
    var Selection = Class(Dataset, {
      className: namespace + ".Selection",
      multiple: false,
      emit_itemsChanged: function(delta) {
        Dataset.prototype.emit_itemsChanged.call(this, delta);
        if (delta.inserted) {
          for (var i = 0, node; node = delta.inserted[i]; i++) {
            if (!node.selected) {
              node.selected = true;
              node.emit_select();
            }
          }
        }
        if (delta.deleted) {
          for (var i = 0, node; node = delta.deleted[i]; i++) {
            if (node.selected) {
              node.selected = false;
              node.emit_unselect();
            }
          }
        }
      },
      add: function(nodes) {
        if (!this.multiple) {
          if (this.itemCount) return this.set(nodes); else nodes = [ nodes[0] ];
        }
        var items = [];
        for (var i = 0, node; node = nodes[i]; i++) {
          if (node.contextSelection == this && node.selectable) items.push(node);
        }
        return Dataset.prototype.add.call(this, items);
      },
      set: function(nodes) {
        var items = [];
        for (var i = 0, node; node = nodes[i]; i++) {
          if (node.contextSelection == this && node.selectable) items.push(node);
        }
        if (!this.multiple) items.splice(1);
        return Dataset.prototype.set.call(this, items);
      }
    });
    module.exports = {
      DELEGATE: DELEGATE,
      AbstractNode: AbstractNode,
      Node: Node,
      GroupingNode: GroupingNode,
      PartitionNode: PartitionNode,
      ChildNodesDataset: ChildNodesDataset,
      Selection: Selection,
      nullSelection: new ReadOnlyDataset
    };
  },
  "6.js": function(exports, module, basis, global, __filename, __dirname, require, resource) {
    basis.require("./2.js");
    var namespace = this.path;
    var Class = basis.Class;
    var cleaner = basis.cleaner;
    var path = basis.path;
    var arraySearch = basis.array.search;
    var arrayAdd = basis.array.add;
    var arrayRemove = basis.array.remove;
    var templateList = [];
    var tmplFilesMap = {};
    var DECLARATION_VERSION = 2;
    var TYPE_ELEMENT = 1;
    var TYPE_ATTRIBUTE = 2;
    var TYPE_ATTRIBUTE_CLASS = 4;
    var TYPE_ATTRIBUTE_STYLE = 5;
    var TYPE_ATTRIBUTE_EVENT = 6;
    var TYPE_TEXT = 3;
    var TYPE_COMMENT = 8;
    var TOKEN_TYPE = 0;
    var TOKEN_BINDINGS = 1;
    var TOKEN_REFS = 2;
    var ATTR_NAME = 3;
    var ATTR_VALUE = 4;
    var ATTR_EVENT_RX = /^event-(.+)$/;
    var ATTR_NAME_BY_TYPE = {
      4: "class",
      5: "style"
    };
    var ATTR_TYPE_BY_NAME = {
      "class": TYPE_ATTRIBUTE_CLASS,
      style: TYPE_ATTRIBUTE_STYLE
    };
    var ATTR_VALUE_INDEX = {
      2: ATTR_VALUE,
      4: ATTR_VALUE - 1,
      5: ATTR_VALUE - 1,
      6: 2
    };
    var ELEMENT_NAME = 3;
    var ELEMENT_ATTRS = 4;
    var ELEMENT_CHILDS = 5;
    var TEXT_VALUE = 3;
    var COMMENT_VALUE = 3;
    var SYNTAX_ERROR = "Invalid or unsupported syntax";
    var TEXT = /((?:.|[\r\n])*?)(\{(?:l10n:([a-zA-Z_][a-zA-Z0-9_\-]*(?:\.[a-zA-Z_][a-zA-Z0-9_\-]*)*(?:\.\{[a-zA-Z_][a-zA-Z0-9_\-]*\})?)\})?|<(\/|!--(\s*\{)?)?|$)/g;
    var TAG_NAME = /([a-z_][a-z0-9\-_]*)(:|\{|\s*(\/?>)?)/ig;
    var ATTRIBUTE_NAME_OR_END = /([a-z_][a-z0-9_\-]*)(:|\{|=|\s*)|(\/?>)/ig;
    var COMMENT = /(.|[\r\n])*?-->/g;
    var CLOSE_TAG = /([a-z_][a-z0-9_\-]*(?::[a-z_][a-z0-9_\-]*)?)>/ig;
    var REFERENCE = /([a-z_][a-z0-9_]*)(\||\}\s*)/ig;
    var ATTRIBUTE_VALUE = /"((?:(\\")|[^"])*?)"\s*/g;
    var BREAK_TAG_PARSE = /^/g;
    var SINGLETON_TAG = /^(area|base|br|col|command|embed|hr|img|input|link|meta|param|source)$/i;
    var TAG_IGNORE_CONTENT = {
      text: /((?:.|[\r\n])*?)(?:<\/b:text>|$)/g,
      style: /((?:.|[\r\n])*?)(?:<\/b:style>|$)/g
    };
    var quoteUnescape = /\\"/g;
    var tokenize = function(source) {
      var result = [];
      var tagStack = [];
      var lastTag = {
        childs: result
      };
      var sourceText;
      var token;
      var bufferPos;
      var startPos;
      var parseTag = false;
      var textStateEndPos = 0;
      var textEndPos;
      var state = TEXT;
      var pos = 0;
      var m;
      source = source.trim();
      result.warns = [];
      while (pos < source.length || state != TEXT) {
        state.lastIndex = pos;
        startPos = pos;
        m = state.exec(source);
        if (!m || m.index !== pos) {
          if (state == REFERENCE && token && token.type == TYPE_COMMENT) {
            state = COMMENT;
            continue;
          }
          if (parseTag) lastTag = tagStack.pop();
          if (token) lastTag.childs.pop();
          if (token = lastTag.childs.pop()) {
            if (token.type == TYPE_TEXT && !token.refs) textStateEndPos -= "len" in token ? token.len : token.value.length; else lastTag.childs.push(token);
          }
          parseTag = false;
          state = TEXT;
          continue;
        }
        pos = state.lastIndex;
        switch (state) {
          case TEXT:
            textEndPos = startPos + m[1].length;
            if (textStateEndPos != textEndPos) {
              sourceText = textStateEndPos == startPos ? m[1] : source.substring(textStateEndPos, textEndPos);
              token = sourceText.replace(/\s*(\r\n?|\n\r?)\s*/g, "");
              if (token) lastTag.childs.push({
                type: TYPE_TEXT,
                len: sourceText.length,
                value: token
              });
            }
            textStateEndPos = textEndPos;
            if (m[3]) {
              lastTag.childs.push({
                type: TYPE_TEXT,
                refs: [ "l10n:" + m[3] ],
                value: "{l10n:" + m[3] + "}"
              });
            } else if (m[2] == "{") {
              bufferPos = pos - 1;
              lastTag.childs.push(token = {
                type: TYPE_TEXT
              });
              state = REFERENCE;
            } else if (m[4]) {
              if (m[4] == "/") {
                token = null;
                state = CLOSE_TAG;
              } else {
                lastTag.childs.push(token = {
                  type: TYPE_COMMENT
                });
                if (m[5]) {
                  bufferPos = pos - m[5].length;
                  state = REFERENCE;
                } else {
                  bufferPos = pos;
                  state = COMMENT;
                }
              }
            } else if (m[2]) {
              parseTag = true;
              tagStack.push(lastTag);
              lastTag.childs.push(token = {
                type: TYPE_ELEMENT,
                attrs: [],
                childs: []
              });
              lastTag = token;
              state = TAG_NAME;
            }
            break;
          case CLOSE_TAG:
            if (m[1] !== (lastTag.prefix ? lastTag.prefix + ":" : "") + lastTag.name) {
              lastTag.childs.push({
                type: TYPE_TEXT,
                value: "</" + m[0]
              });
            } else lastTag = tagStack.pop();
            state = TEXT;
            break;
          case TAG_NAME:
          case ATTRIBUTE_NAME_OR_END:
            if (m[2] == ":") {
              if (token.prefix) state = BREAK_TAG_PARSE; else token.prefix = m[1];
              break;
            }
            if (m[1]) {
              token.name = m[1];
              if (token.type == TYPE_ATTRIBUTE) lastTag.attrs.push(token);
            }
            if (m[2] == "{") {
              if (token.type == TYPE_ELEMENT) state = REFERENCE; else state = BREAK_TAG_PARSE;
              break;
            }
            if (m[3]) {
              parseTag = false;
              if (m[3] == "/>" || !lastTag.prefix && SINGLETON_TAG.test(lastTag.name)) {
                if (m[3] != "/>") result.warns.push("Tag <" + lastTag.name + "> doesn't closed explicit (use `/>` as tag ending)");
                lastTag = tagStack.pop();
              } else {
                if (lastTag.prefix == "b" && lastTag.name in TAG_IGNORE_CONTENT) {
                  state = TAG_IGNORE_CONTENT[lastTag.name];
                  break;
                }
              }
              state = TEXT;
              break;
            }
            if (m[2] == "=") {
              state = ATTRIBUTE_VALUE;
              break;
            }
            token = {
              type: TYPE_ATTRIBUTE
            };
            state = ATTRIBUTE_NAME_OR_END;
            break;
          case COMMENT:
            token.value = source.substring(bufferPos, pos - 3);
            state = TEXT;
            break;
          case REFERENCE:
            if (token.refs) token.refs.push(m[1]); else token.refs = [ m[1] ];
            if (m[2] != "|") {
              if (token.type == TYPE_TEXT) {
                pos -= m[2].length - 1;
                token.value = source.substring(bufferPos, pos);
                state = TEXT;
              } else if (token.type == TYPE_COMMENT) {
                state = COMMENT;
              } else if (token.type == TYPE_ATTRIBUTE && source[pos] == "=") {
                pos++;
                state = ATTRIBUTE_VALUE;
              } else {
                token = {
                  type: TYPE_ATTRIBUTE
                };
                state = ATTRIBUTE_NAME_OR_END;
              }
            }
            break;
          case ATTRIBUTE_VALUE:
            token.value = m[1].replace(quoteUnescape, '"');
            token = {
              type: TYPE_ATTRIBUTE
            };
            state = ATTRIBUTE_NAME_OR_END;
            break;
          case TAG_IGNORE_CONTENT.text:
          case TAG_IGNORE_CONTENT.style:
            lastTag.childs.push({
              type: TYPE_TEXT,
              value: m[1]
            });
            lastTag = tagStack.pop();
            state = TEXT;
            break;
          default:
            throw "Parser bug";
        }
        if (state == TEXT) textStateEndPos = pos;
      }
      if (textStateEndPos != pos) lastTag.childs.push({
        type: TYPE_TEXT,
        value: source.substring(textStateEndPos, pos)
      });
      if (lastTag.name) result.warns.push("No close tag for <" + lastTag.name + ">");
      if (!result.warns.length) delete result.warns;
      result.templateTokens = true;
      return result;
    };
    var tokenTemplate = {};
    var L10nProxyToken = basis.Token.subclass({
      className: namespace + ".L10nProxyToken",
      token: null,
      url: "",
      init: function(token) {
        this.url = token.dictionary.resource.url + ":" + token.name;
        this.token = token;
        this.set();
        token.attach(this.set, this);
      },
      set: function() {
        return basis.Token.prototype.set.call(this, this.token.type == "markup" ? processMarkup(this.token.value, this.token.name + "@" + this.token.dictionary.resource.url) : "");
      },
      destroy: function() {
        basis.Token.prototype.destroy.call(this);
        this.token = null;
      }
    });
    function processMarkup(value, id) {
      return '<span class="basisjs-markup" data-basisjs-l10n="' + id + '">' + String(value) + "</span>";
    }
    function getL10nTemplate(token) {
      if (typeof token == "string") token = basis.l10n.token(token);
      if (!token) return null;
      var id = token.basisObjectId;
      var template = tokenTemplate[id];
      if (!template) template = tokenTemplate[id] = new Template(new L10nProxyToken(token));
      return template;
    }
    function genIsolateMarker() {
      return "i" + basis.genUID() + "__";
    }
    function isolateCss(css, prefix) {
      function addMatch(prefix) {
        if (i > lastMatchPos) {
          result.push((prefix || "") + css.substring(lastMatchPos, i));
          lastMatchPos = i;
        }
      }
      var result = [];
      var sym = css.split("");
      var len = sym.length;
      var lastMatchPos = 0;
      var blockScope = false;
      var strSym;
      if (!prefix) prefix = genIsolateMarker();
      for (var i = 0; i < len; i++) {
        switch (sym[i]) {
          case "'":
          case '"':
            strSym = sym[i];
            while (++i < len) {
              if (sym[i] == "\\") i++; else if (sym[i] == strSym) {
                i++;
                break;
              }
            }
            break;
          case "/":
            if (sym[i + 1] == "*") {
              i++;
              while (++i < len) if (sym[i] == "*" && sym[i + 1] == "/") {
                i += 2;
                break;
              }
            }
            break;
          case "{":
            blockScope = true;
            break;
          case "}":
            blockScope = false;
            break;
          case ".":
            if (!blockScope) {
              i++;
              addMatch();
              while (++i < len) if (!/[a-z0-9\-\_]/.test(sym[i])) {
                addMatch(prefix);
                i -= 1;
                break;
              }
            }
            break;
        }
      }
      addMatch();
      return result.join("");
    }
    var makeDeclaration = function() {
      var IDENT = /^[a-z_][a-z0-9_\-]*$/i;
      var CLASS_ATTR_PARTS = /(\S+)/g;
      var CLASS_ATTR_BINDING = /^((?:[a-z_][a-z0-9_\-]*)?(?::(?:[a-z_][a-z0-9_\-]*)?)?)\{((anim:)?[a-z_][a-z0-9_\-]*)\}$/i;
      var STYLE_ATTR_PARTS = /\s*[^:]+?\s*:(?:\(.*?\)|".*?"|'.*?'|[^;]+?)+(?:;|$)/gi;
      var STYLE_PROPERTY = /\s*([^:]+?)\s*:((?:\(.*?\)|".*?"|'.*?'|[^;]+?)+);?$/i;
      var STYLE_ATTR_BINDING = /\{([a-z_][a-z0-9_]*)\}/i;
      var ATTR_BINDING = /\{([a-z_][a-z0-9_]*|l10n:[a-z_][a-z0-9_]*(?:\.[a-z_][a-z0-9_]*)*(?:\.\{[a-z_][a-z0-9_]*\})?)\}/i;
      var NAMED_CHARACTER_REF = /&([a-z]+|#[0-9]+|#x[0-9a-f]{1,4});?/gi;
      var tokenMap = basis.NODE_ENV ? __nodejsRequire("./template/htmlentity.json") : {};
      var tokenElement = !basis.NODE_ENV ? document.createElement("div") : null;
      var includeStack = [];
      var styleNamespaceIsolate = {};
      function name(token) {
        return (token.prefix ? token.prefix + ":" : "") + token.name;
      }
      function namedCharReplace(m, token) {
        if (!tokenMap[token]) {
          if (token.charAt(0) == "#") {
            tokenMap[token] = String.fromCharCode(token.charAt(1) == "x" || token.charAt(1) == "X" ? parseInt(token.substr(2), 16) : token.substr(1));
          } else {
            if (tokenElement) {
              tokenElement.innerHTML = m;
              tokenMap[token] = tokenElement.firstChild ? tokenElement.firstChild.nodeValue : m;
            }
          }
        }
        return tokenMap[token] || m;
      }
      function untoken(value) {
        return value.replace(NAMED_CHARACTER_REF, namedCharReplace);
      }
      function refList(token) {
        var array = token.refs;
        if (!array || !array.length) return 0;
        return array;
      }
      function buildAttrExpression(parts) {
        var bindName;
        var names = [];
        var expression = [];
        var map = {};
        for (var j = 0; j < parts.length; j++) if (j % 2) {
          bindName = parts[j];
          if (!map[bindName]) {
            map[bindName] = names.length;
            names.push(bindName);
          }
          expression.push(map[bindName]);
        } else {
          if (parts[j]) expression.push(untoken(parts[j]));
        }
        return [ names, expression ];
      }
      function processAttr(name, value) {
        var bindings = 0;
        var parts;
        var m;
        if (value) {
          switch (name) {
            case "class":
              if (parts = value.match(CLASS_ATTR_PARTS)) {
                var newValue = [];
                bindings = [];
                for (var j = 0, part; part = parts[j]; j++) {
                  if (m = part.match(CLASS_ATTR_BINDING)) bindings.push([ m[1] || "", m[2] ]); else newValue.push(part);
                }
                value = newValue.join(" ");
              }
              break;
            case "style":
              var props = [];
              bindings = [];
              if (parts = value.match(STYLE_ATTR_PARTS)) {
                for (var j = 0, part; part = parts[j]; j++) {
                  var m = part.match(STYLE_PROPERTY);
                  var propertyName = m[1];
                  var value = m[2].trim();
                  var valueParts = value.split(STYLE_ATTR_BINDING);
                  if (valueParts.length > 1) {
                    var expr = buildAttrExpression(valueParts);
                    expr.push(propertyName);
                    bindings.push(expr);
                  } else props.push(propertyName + ": " + untoken(value));
                }
              } else {
                if (/\S/.test(value)) basis.dev.warn("Bad value for style attribute (value ignored):", value);
              }
              value = props.join("; ");
              if (value) value += ";";
              break;
            default:
              parts = value.split(ATTR_BINDING);
              if (parts.length > 1) bindings = buildAttrExpression(parts); else value = untoken(value);
          }
        }
        if (bindings && !bindings.length) bindings = 0;
        return {
          binding: bindings,
          value: value,
          type: ATTR_TYPE_BY_NAME[name] || 2
        };
      }
      function attrs(token, declToken, optimizeSize) {
        var attrs = token.attrs;
        var result = [];
        var styleAttr;
        var display;
        var m;
        for (var i = 0, attr; attr = attrs[i]; i++) {
          if (attr.prefix == "b") {
            switch (attr.name) {
              case "ref":
                var refs = (attr.value || "").trim().split(/\s+/);
                for (var j = 0; j < refs.length; j++) addTokenRef(declToken, refs[j]);
                break;
              case "show":
              case "hide":
                display = attr;
                break;
            }
            continue;
          }
          if (m = attr.name.match(ATTR_EVENT_RX)) {
            result.push(m[1] == attr.value ? [ TYPE_ATTRIBUTE_EVENT, m[1] ] : [ TYPE_ATTRIBUTE_EVENT, m[1], attr.value ]);
            continue;
          }
          var parsed = processAttr(attr.name, attr.value);
          var item = [ parsed.type, parsed.binding, refList(attr) ];
          if (parsed.type == 2) item.push(name(attr));
          if (parsed.value && (!optimizeSize || !parsed.binding || parsed.type != 2)) item.push(parsed.value);
          if (parsed.type == TYPE_ATTRIBUTE_STYLE) styleAttr = item;
          result.push(item);
        }
        if (display) {
          if (!styleAttr) {
            styleAttr = [ TYPE_ATTRIBUTE_STYLE, 0, 0 ];
            result.push(styleAttr);
          }
          if (!styleAttr[1]) styleAttr[1] = [];
          var displayExpr = buildAttrExpression((display.value || display.name).split(ATTR_BINDING));
          if (displayExpr[0].length - displayExpr[1].length) {
            styleAttr[3] = (styleAttr[3] ? styleAttr[3] + "; " : "") + (display.name == "show" ^ display.value === "" ? "" : "display: none");
          } else {
            if (display.name == "show") styleAttr[3] = (styleAttr[3] ? styleAttr[3] + "; " : "") + "display: none";
            styleAttr[1].push(displayExpr.concat("display", display.name));
          }
        }
        return result.length ? result : 0;
      }
      function addTokenRef(token, refName) {
        if (!token[TOKEN_REFS]) token[TOKEN_REFS] = [];
        arrayAdd(token[TOKEN_REFS], refName);
        if (refName != "element") token[TOKEN_BINDINGS] = token[TOKEN_REFS].length == 1 ? refName : 0;
      }
      function removeTokenRef(token, refName) {
        var idx = token[TOKEN_REFS].indexOf(refName);
        if (idx != -1) {
          var indexBinding = token[TOKEN_BINDINGS] && typeof token[TOKEN_BINDINGS] == "number";
          token[TOKEN_REFS].splice(idx, 1);
          if (indexBinding) if (idx == token[TOKEN_BINDINGS] - 1) token[TOKEN_BINDINGS] = refName;
          if (!token[TOKEN_REFS].length) token[TOKEN_REFS] = 0; else {
            if (indexBinding) token[TOKEN_BINDINGS] -= idx < token[TOKEN_BINDINGS] - 1;
          }
        }
      }
      function tokenAttrs(token) {
        var result = {};
        if (token.attrs) for (var i = 0, attr; attr = token.attrs[i]; i++) result[name(attr)] = attr.value;
        return result;
      }
      function addUnique(array, items) {
        for (var i = 0; i < items.length; i++) arrayAdd(array, items[i]);
      }
      function addStyles(array, items, prefix) {
        for (var i = 0, item; item = items[i]; i++) if (item[1] !== styleNamespaceIsolate) item[1] = prefix + item[1];
        array.unshift.apply(array, items);
      }
      function addStyle(template, token, src, isolatePrefix) {
        var url;
        if (src) {
          if (!/^(\.\/|\.\.|\/)/.test(src)) basis.dev.warn("Bad usage: <b:" + token.name + ' src="' + src + '"/>.\nFilenames should starts with `./`, `..` or `/`. Otherwise it will treats as special reference in next minor release.');
          url = path.resolve(template.baseURI + src);
        } else {
          var text = token.childs[0];
          url = basis.resource.virtual("css", text ? text.value : "", template.sourceUrl).url;
        }
        template.resources.push([ url, isolatePrefix ]);
        return url;
      }
      function process(tokens, template, options, context) {
        function modifyAttr(token, name, action) {
          var attrs = tokenAttrs(token);
          if (name) attrs.name = name;
          if (!attrs.name) {
            template.warns.push("Instruction <b:" + token.name + "> has no attribute name");
            return;
          }
          if (!IDENT.test(attrs.name)) {
            template.warns.push("Bad attribute name `" + attrs.name + "`");
            return;
          }
          var includedToken = tokenRefMap[attrs.ref || "element"];
          if (includedToken) {
            if (includedToken.token[TOKEN_TYPE] == TYPE_ELEMENT) {
              var itAttrs = includedToken.token;
              var isEvent = attrs.name.match(ATTR_EVENT_RX);
              var itType = isEvent ? TYPE_ATTRIBUTE_EVENT : ATTR_TYPE_BY_NAME[attrs.name] || TYPE_ATTRIBUTE;
              var valueIdx = ATTR_VALUE_INDEX[itType] || ATTR_VALUE;
              var itAttrToken = itAttrs && arraySearch(itAttrs, attrs.name, function(token) {
                if (token[TOKEN_TYPE] == TYPE_ATTRIBUTE_EVENT) return "event-" + token[1];
                return ATTR_NAME_BY_TYPE[token[TOKEN_TYPE]] || token[ATTR_NAME];
              }, ELEMENT_ATTRS);
              if (!itAttrToken && action != "remove") {
                if (isEvent) {
                  itAttrToken = [ itType, isEvent[1] ];
                } else {
                  itAttrToken = [ itType, 0, 0, itType == TYPE_ATTRIBUTE ? attrs.name : "" ];
                  if (itType == TYPE_ATTRIBUTE) itAttrToken.push("");
                }
                if (!itAttrs) {
                  itAttrs = [];
                  includedToken.token.push(itAttrs);
                }
                itAttrs.push(itAttrToken);
              }
              var classOrStyle = attrs.name == "class" || attrs.name == "style";
              switch (action) {
                case "set":
                  if (itAttrToken[TOKEN_TYPE] == TYPE_ATTRIBUTE_EVENT) {
                    if (attrs.value == isEvent[1]) itAttrToken.length = 2; else itAttrToken[valueIdx] = attrs.value;
                    return;
                  }
                  var parsed = processAttr(attrs.name, attrs.value);
                  itAttrToken[TOKEN_BINDINGS] = parsed.binding;
                  if (!options.optimizeSize || !itAttrToken[TOKEN_BINDINGS] || classOrStyle) itAttrToken[valueIdx] = parsed.value || ""; else itAttrToken.length = valueIdx;
                  if (classOrStyle) if (!itAttrToken[TOKEN_BINDINGS] && !itAttrToken[valueIdx]) {
                    arrayRemove(itAttrs, itAttrToken);
                    return;
                  }
                  break;
                case "append":
                  var parsed = processAttr(attrs.name, attrs.value);
                  if (!isEvent) {
                    if (parsed.binding) {
                      var attrBindings = itAttrToken[TOKEN_BINDINGS];
                      if (attrBindings) {
                        switch (attrs.name) {
                          case "style":
                            var oldBindingMap = {};
                            for (var i = 0, oldBinding; oldBinding = attrBindings[i]; i++) oldBindingMap[oldBinding[2]] = i;
                            for (var i = 0, newBinding; newBinding = parsed.binding[i]; i++) if (newBinding[2] in oldBindingMap) attrBindings[oldBindingMap[newBinding[2]]] = newBinding; else attrBindings.push(newBinding);
                            break;
                          case "class":
                            attrBindings.push.apply(attrBindings, parsed.binding);
                            break;
                          default:
                            parsed.binding[0].forEach(function(name) {
                              arrayAdd(this, name);
                            }, attrBindings[0]);
                            for (var i = 0; i < parsed.binding[1].length; i++) {
                              var value = parsed.binding[1][i];
                              if (typeof value == "number") value = attrBindings[0].indexOf(parsed.binding[0][value]);
                              attrBindings[1].push(value);
                            }
                        }
                      } else {
                        itAttrToken[TOKEN_BINDINGS] = parsed.binding;
                        if (!classOrStyle) itAttrToken[TOKEN_BINDINGS][1].unshift(itAttrToken[valueIdx]);
                      }
                    } else {
                      if (!classOrStyle && itAttrToken[TOKEN_BINDINGS]) itAttrToken[TOKEN_BINDINGS][1].push(attrs.value);
                    }
                  }
                  if (parsed.value) itAttrToken[valueIdx] = (itAttrToken[valueIdx] || "") + (itAttrToken[valueIdx] && (isEvent || classOrStyle) ? " " : "") + parsed.value;
                  if (classOrStyle) if (!itAttrToken[TOKEN_BINDINGS] && !itAttrToken[valueIdx]) {
                    arrayRemove(itAttrs, itAttrToken);
                    return;
                  }
                  break;
                case "remove":
                  if (itAttrToken) arrayRemove(itAttrs, itAttrToken);
                  break;
              }
            } else {
              template.warns.push("Attribute modificator is not reference to element token (reference name: " + (attrs.ref || "element") + ")");
            }
          }
        }
        var result = [];
        for (var i = 0, token, item; token = tokens[i]; i++) {
          var refs = refList(token);
          var bindings = refs && refs.length == 1 ? refs[0] : 0;
          switch (token.type) {
            case TYPE_ELEMENT:
              if (token.prefix == "b") {
                var elAttrs = tokenAttrs(token);
                switch (token.name) {
                  case "style":
                    var styleNamespace = elAttrs.namespace || elAttrs.ns;
                    var styleIsolate = styleNamespace ? styleNamespaceIsolate : context && context.isolate || "";
                    var src = addStyle(template, token, elAttrs.src, styleIsolate);
                    if (styleNamespace) {
                      if (src in styleNamespaceIsolate == false) styleNamespaceIsolate[src] = genIsolateMarker();
                      template.styleNSPrefix[styleNamespace] = styleNamespaceIsolate[src];
                    }
                    break;
                  case "isolate":
                    if (!template.isolate) template.isolate = elAttrs.prefix || options.isolate || genIsolateMarker(); else basis.dev.warn("<b:isolate> is set already to `" + template.isolate + "`");
                    break;
                  case "l10n":
                    if (template.l10nResolved) template.warns.push("<b:l10n> must be declared before any `l10n:` token (instruction ignored)");
                    if (elAttrs.src) {
                      if (!/^(\.\/|\.\.|\/)/.test(elAttrs.src)) basis.dev.warn("Bad usage: <b:" + token.name + ' src="' + elAttrs.src + '"/>.\nFilenames should starts with `./`, `..` or `/`. Otherwise it will treats as special reference in next minor release.');
                      template.dictURI = path.resolve(template.baseURI, elAttrs.src);
                    }
                    break;
                  case "define":
                    if ("name" in elAttrs && !template.defines[elAttrs.name]) {
                      switch (elAttrs.type) {
                        case "bool":
                          template.defines[elAttrs.name] = [ elAttrs["default"] == "true" ? 1 : 0 ];
                          break;
                        case "enum":
                          var values = elAttrs.values ? elAttrs.values.trim().split(" ") : [];
                          template.defines[elAttrs.name] = [ values.indexOf(elAttrs["default"]) + 1, values ];
                          break;
                        default:
                          template.warns.push("Bad define type `" + elAttrs.type + "` for " + elAttrs.name);
                      }
                    }
                    break;
                  case "text":
                    var text = token.childs[0];
                    tokens[i--] = basis.object.extend(text, {
                      refs: (elAttrs.ref || "").trim().split(/\s+/),
                      value: "notrim" in elAttrs ? text.value : text.value.replace(/^\s*[\r\n]+|[\r\n]\s*$/g, "")
                    });
                    break;
                  case "include":
                    var templateSrc = elAttrs.src;
                    if (templateSrc) {
                      var isTemplateRef = /^#\d+$/.test(templateSrc);
                      var isDocumentIdRef = /^id:/.test(templateSrc);
                      var url = isTemplateRef ? templateSrc.substr(1) : templateSrc;
                      var resource;
                      if (isTemplateRef) {
                        resource = templateList[url];
                      } else if (isDocumentIdRef) {
                        resource = resolveSourceByDocumentId(url.substr(3));
                      } else if (/^[a-z0-9\.]+$/i.test(url) && !/\.tmpl$/.test(url)) {
                        resource = getSourceByPath(url);
                      } else {
                        if (!/^(\.\/|\.\.|\/)/.test(url)) basis.dev.warn('Bad usage: <b:include src="' + url + '"/>.\nFilenames should starts with `./`, `..` or `/`. Otherwise it will treats as special reference in next minor release.');
                        resource = basis.resource(path.resolve(template.baseURI + url));
                      }
                      if (!resource) {
                        template.warns.push('<b:include src="' + templateSrc + '"> is not resolved, instruction ignored');
                        basis.dev.warn('<b:include src="' + templateSrc + '"> is not resolved, instruction ignored');
                        continue;
                      }
                      if (includeStack.indexOf(resource) == -1) {
                        var isolatePrefix = "isolate" in elAttrs ? elAttrs.isolate || genIsolateMarker() : "";
                        var decl;
                        if (!isDocumentIdRef) arrayAdd(template.deps, resource);
                        if (isTemplateRef) {
                          if (resource.source.bindingBridge) arrayAdd(template.deps, resource.source);
                          decl = getDeclFromSource(resource.source, resource.baseURI, true, options);
                        } else {
                          decl = getDeclFromSource(resource, resource.url ? path.dirname(resource.url) + "/" : "", true, options);
                        }
                        if (decl.resources && "no-style" in elAttrs == false) addStyles(template.resources, decl.resources, isolatePrefix);
                        if (decl.deps) addUnique(template.deps, decl.deps);
                        if (decl.l10n) addUnique(template.l10n, decl.l10n);
                        var tokenRefMap = normalizeRefs(decl.tokens);
                        var instructions = (token.childs || []).slice();
                        var styleNSPrefixMap = basis.object.slice(decl.styleNSPrefix);
                        if (elAttrs["class"]) instructions.push({
                          type: TYPE_ELEMENT,
                          prefix: "b",
                          name: "append-class",
                          attrs: [ {
                            type: TYPE_ATTRIBUTE,
                            name: "value",
                            value: elAttrs["class"]
                          } ]
                        });
                        if (elAttrs.id) instructions.push({
                          type: TYPE_ELEMENT,
                          prefix: "b",
                          name: "set-attr",
                          attrs: [ {
                            type: TYPE_ATTRIBUTE,
                            name: "name",
                            value: "id"
                          }, {
                            type: TYPE_ATTRIBUTE,
                            name: "value",
                            value: elAttrs.id
                          } ]
                        });
                        if (elAttrs.ref) if (tokenRefMap.element) elAttrs.ref.trim().split(/\s+/).map(function(refName) {
                          addTokenRef(tokenRefMap.element.token, refName);
                        });
                        for (var j = 0, child; child = instructions[j]; j++) {
                          if (child.type == TYPE_ELEMENT && child.prefix == "b") {
                            switch (child.name) {
                              case "style":
                                var childAttrs = tokenAttrs(child);
                                var styleNamespace = childAttrs.namespace || childAttrs.ns;
                                var styleIsolate = styleNamespace ? styleNamespaceIsolate : isolatePrefix;
                                var src = addStyle(template, child, childAttrs.src, styleIsolate);
                                if (styleNamespace) {
                                  if (src in styleNamespaceIsolate == false) styleNamespaceIsolate[src] = genIsolateMarker();
                                  styleNSPrefixMap[styleNamespace] = styleNamespaceIsolate[src];
                                }
                                break;
                              case "replace":
                              case "remove":
                              case "before":
                              case "after":
                                var replaceOrRemove = child.name == "replace" || child.name == "remove";
                                var childAttrs = tokenAttrs(child);
                                var ref = "ref" in childAttrs || !replaceOrRemove ? childAttrs.ref : "element";
                                var tokenRef = ref && tokenRefMap[ref];
                                if (tokenRef) {
                                  var pos = tokenRef.owner.indexOf(tokenRef.token);
                                  if (pos != -1) {
                                    var args = [ pos + (child.name == "after"), replaceOrRemove ];
                                    if (child.name != "remove") args = args.concat(process(child.childs, template, options) || []);
                                    tokenRef.owner.splice.apply(tokenRef.owner, args);
                                  }
                                }
                                break;
                              case "prepend":
                              case "append":
                                var childAttrs = tokenAttrs(child);
                                var ref = "ref" in childAttrs ? childAttrs.ref : "element";
                                var tokenRef = ref && tokenRefMap[ref];
                                var token = tokenRef && tokenRef.token;
                                if (token && token[TOKEN_TYPE] == TYPE_ELEMENT) {
                                  var childs = process(child.childs, template, options) || [];
                                  if (child.name == "prepend") token.splice.apply(token, [ ELEMENT_ATTRS, 0 ].concat(childs)); else token.push.apply(token, childs);
                                }
                                break;
                              case "attr":
                              case "set-attr":
                                modifyAttr(child, false, "set");
                                break;
                              case "append-attr":
                                modifyAttr(child, false, "append");
                                break;
                              case "remove-attr":
                                modifyAttr(child, false, "remove");
                                break;
                              case "class":
                              case "append-class":
                                modifyAttr(child, "class", "append");
                                break;
                              case "set-class":
                                modifyAttr(child, "class", "set");
                                break;
                              case "remove-class":
                                modifyAttr(child, "class", "remove");
                                break;
                              case "add-ref":
                                var childAttrs = tokenAttrs(child);
                                var ref = "ref" in childAttrs ? childAttrs.ref : "element";
                                var tokenRef = ref && tokenRefMap[ref];
                                var token = tokenRef && tokenRef.token;
                                if (token && childAttrs.name) addTokenRef(token, childAttrs.name);
                                break;
                              case "remove-ref":
                                var childAttrs = tokenAttrs(child);
                                var ref = "ref" in childAttrs ? childAttrs.ref : "element";
                                var tokenRef = ref && tokenRefMap[ref];
                                var token = tokenRef && tokenRef.token;
                                if (token) removeTokenRef(token, childAttrs.name || childAttrs.ref);
                                break;
                              default:
                                template.warns.push("Unknown instruction tag <b:" + child.name + ">");
                            }
                          } else decl.tokens.push.apply(decl.tokens, process([ child ], template, options) || []);
                        }
                        if (tokenRefMap.element) removeTokenRef(tokenRefMap.element.token, "element");
                        basis.object.complete(template.styleNSPrefix, styleNSPrefixMap);
                        if (isolatePrefix) isolateTokens(decl.tokens, isolatePrefix); else if (decl.isolate && !template.isolate) template.isolate = options.isolate || genIsolateMarker();
                        result.push.apply(result, decl.tokens);
                      } else {
                        var stack = includeStack.slice(includeStack.indexOf(resource) || 0).concat(resource).map(function(res) {
                          if (res instanceof Template) res = res.source;
                          if (res instanceof L10nProxyToken) return "{l10n:" + res.token.name + "@" + res.token.dictionary.resource.url + "}";
                          return res.url || "[inline template]";
                        });
                        template.warns.push("Recursion: ", stack.join(" -> "));
                        basis.dev.warn("Recursion in template: ", stack.join(" -> "));
                      }
                    }
                    break;
                }
                continue;
              }
              item = [ 1, bindings, refs, name(token) ];
              item.push.apply(item, attrs(token, item, options.optimizeSize) || []);
              item.push.apply(item, process(token.childs, template, options) || []);
              break;
            case TYPE_TEXT:
              if (refs && refs.length == 2 && arraySearch(refs, "element")) bindings = refs[+!refs.lastSearchIndex];
              if (bindings) {
                var l10nBinding = absl10n(bindings, template.dictURI);
                var parts = l10nBinding.split(/[:@\{]/);
                if (parts[0] == "l10n" && parts.length == 3) {
                  if (!parts[2]) {
                    arrayRemove(refs, bindings);
                    if (refs.length == 0) refs = null;
                    bindings = 0;
                    token.value = token.value.replace(/\}$/, "@undefined}");
                  } else {
                    var l10nId = parts.slice(1).join("@");
                    var l10nToken = basis.l10n.token(l10nId);
                    var l10nTemplate = getL10nTemplate(l10nToken);
                    template.l10nResolved = true;
                    if (l10nTemplate && l10nToken.type == "markup") {
                      tokens[i--] = tokenize('<b:include src="#' + l10nTemplate.templateId + '"/>')[0];
                      continue;
                    } else arrayAdd(template.l10n, l10nId);
                  }
                }
              }
              item = [ 3, bindings, refs ];
              if (!refs || token.value != "{" + refs.join("|") + "}") item.push(untoken(token.value));
              break;
            case TYPE_COMMENT:
              if (options.optimizeSize && !bindings && !refs) continue;
              item = [ 8, bindings, refs ];
              if (!options.optimizeSize) if (!refs || token.value != "{" + refs.join("|") + "}") item.push(untoken(token.value));
              break;
          }
          while (item[item.length - 1] === 0) item.pop();
          result.push(item);
        }
        return result.length ? result : 0;
      }
      function absl10n(value, dictURI) {
        if (typeof value != "string") return value;
        var parts = value.split(":");
        if (parts.length == 2 && parts[0] == "l10n" && parts[1].indexOf("@") == -1) parts[1] = parts[1] + "@" + dictURI;
        return parts.join(":");
      }
      function normalizeRefs(tokens, dictURI, map, stIdx) {
        if (!map) map = {};
        for (var i = stIdx || 0, token; token = tokens[i]; i++) {
          if (token[TOKEN_TYPE] == TYPE_ATTRIBUTE_EVENT) continue;
          var refs = token[TOKEN_REFS];
          if (refs) {
            for (var j = refs.length - 1, refName; refName = refs[j]; j--) {
              if (refName.indexOf(":") != -1) {
                removeTokenRef(token, refName);
                continue;
              }
              if (map[refName]) removeTokenRef(map[refName].token, refName);
              if (token[TOKEN_BINDINGS] == refName) token[TOKEN_BINDINGS] = j + 1;
              map[refName] = {
                owner: tokens,
                token: token
              };
            }
          }
          switch (token[TOKEN_TYPE]) {
            case TYPE_TEXT:
              token[TOKEN_BINDINGS] = absl10n(token[TOKEN_BINDINGS], dictURI);
              break;
            case TYPE_ATTRIBUTE:
              if (token[TOKEN_BINDINGS]) {
                var array = token[TOKEN_BINDINGS][0];
                for (var j = 0; j < array.length; j++) array[j] = absl10n(array[j], dictURI);
              }
              break;
            case TYPE_ELEMENT:
              normalizeRefs(token, dictURI, map, ELEMENT_ATTRS);
              break;
          }
        }
        return map;
      }
      function applyDefines(tokens, template, options, stIdx) {
        var unpredictable = 0;
        for (var i = stIdx || 0, token; token = tokens[i]; i++) {
          var tokenType = token[TOKEN_TYPE];
          if (tokenType == TYPE_ELEMENT) unpredictable += applyDefines(token, template, options, ELEMENT_ATTRS);
          if (tokenType == TYPE_ATTRIBUTE_CLASS || tokenType == TYPE_ATTRIBUTE && token[ATTR_NAME] == "class") {
            var bindings = token[TOKEN_BINDINGS];
            var valueIdx = ATTR_VALUE_INDEX[tokenType];
            if (bindings) {
              var newAttrValue = (token[valueIdx] || "").trim().split(" ");
              for (var k = 0, bind; bind = bindings[k]; k++) {
                if (bind.length > 2) continue;
                var bindName = bind[1].split(":").pop();
                var bindDef = template.defines[bindName];
                if (bindDef) {
                  bind.push.apply(bind, bindDef);
                  bindDef.used = true;
                  if (bindDef[0]) {
                    if (bindDef.length == 1) arrayAdd(newAttrValue, bind[0] + bindName); else arrayAdd(newAttrValue, bind[0] + bindDef[1][bindDef[0] - 1]);
                  }
                } else {
                  template.warns.push("Unpredictable value `" + bindName + "` in class binding: " + bind[0] + "{" + bind[1] + "}");
                  unpredictable++;
                }
              }
              token[valueIdx] = newAttrValue.join(" ");
              if (options.optimizeSize && !token[valueIdx]) token.length = valueIdx;
            }
          }
        }
        return unpredictable;
      }
      function isolateTokens(tokens, isolate, template, stIdx) {
        function processName(name) {
          var parts = name.split(":");
          if (parts.length == 1) return isolate + parts[0];
          if (!template) return name;
          if (!parts[0]) return parts[1];
          if (parts[0] in template.styleNSPrefix == false) {
            template.warns.push("Namespace `" + parts[0] + "` is not defined in template, no prefix added");
            return name;
          }
          return template.styleNSPrefix[parts[0]] + parts[1];
        }
        for (var i = stIdx || 0, token; token = tokens[i]; i++) {
          var tokenType = token[TOKEN_TYPE];
          if (tokenType == TYPE_ELEMENT) isolateTokens(token, isolate, template, ELEMENT_ATTRS);
          if (tokenType == TYPE_ATTRIBUTE_CLASS || tokenType == TYPE_ATTRIBUTE && token[ATTR_NAME] == "class") {
            var bindings = token[TOKEN_BINDINGS];
            var valueIndex = ATTR_VALUE_INDEX[tokenType];
            if (token[valueIndex]) token[valueIndex] = token[valueIndex].split(/\s+/).map(processName).join(" ");
            if (bindings) for (var k = 0, bind; bind = bindings[k]; k++) bind[0] = processName(bind[0]);
          }
        }
      }
      return function makeDeclaration(source, baseURI, options, sourceUrl, sourceOrigin) {
        options = options || {};
        var warns = [];
        var source_;
        var result = {
          sourceUrl: sourceUrl,
          baseURI: baseURI || "",
          tokens: null,
          resources: [],
          styleNSPrefix: {},
          deps: [],
          l10n: [],
          defines: {},
          unpredictable: true,
          warns: warns,
          isolate: false
        };
        result.dictURI = sourceUrl ? basis.path.resolve(sourceUrl) : baseURI || "";
        if (result.dictURI) {
          var extname = basis.path.extname(result.dictURI);
          if (extname && extname != ".l10n") result.dictURI = result.dictURI.substr(0, result.dictURI.length - extname.length) + ".l10n";
        }
        if (!source.templateTokens) {
          source_ = source;
          source = tokenize(String(source));
        }
        if (source.warns) warns.push.apply(warns, source.warns);
        includeStack.push(sourceOrigin !== true && sourceOrigin || {});
        result.tokens = process(source, result, options);
        includeStack.pop();
        if (!result.tokens) result.tokens = [ [ 3, 0, 0, "" ] ];
        if (source_) result.tokens.source_ = source_;
        addTokenRef(result.tokens[0], "element");
        normalizeRefs(result.tokens, result.dictURI);
        result.unpredictable = !!applyDefines(result.tokens, result, options);
        if (/^[^a-z]/i.test(result.isolate)) basis.dev.error("basis.template: isolation prefix `" + result.isolate + "` should not starts with symbol other than letter, otherwise it leads to incorrect css class names and broken styles");
        if (includeStack.length == 0) {
          isolateTokens(result.tokens, result.isolate || "", result);
          if (result.isolate) for (var i = 0, item; item = result.resources[i]; i++) if (item[1] !== styleNamespaceIsolate) item[1] = result.isolate + item[1];
          result.resources = result.resources.filter(function(item, idx, array) {
            return !basis.array.search(array, String(item), String, idx + 1);
          }).map(function(item) {
            var url = item[0];
            var isolate = item[1];
            if (isolate === styleNamespaceIsolate) isolate = styleNamespaceIsolate[url];
            if (!isolate) return url;
            var resource = basis.resource.virtual("css", "").ready(function(cssResource) {
              sourceResource();
              basis.object.extend(cssResource, {
                url: url + "?isolate-prefix=" + isolate,
                baseURI: basis.path.dirname(url) + "/"
              });
            });
            var sourceResource = basis.resource(url).ready(function(cssResource) {
              var cssText = isolateCss(cssResource.cssText || "", isolate);
              if (typeof btoa == "function") cssText += "\n/*# sourceMappingURL=data:application/json;base64," + btoa('{"version":3,"sources":["' + basis.path.origin + url + '"],' + '"mappings":"AAAA' + basis.string.repeat(";AACA", cssText.split("\n").length) + '"}') + " */";
              resource.update(cssText);
            });
            return resource.url;
          });
        }
        for (var key in result.defines) if (!result.defines[key].used) warns.push("Unused define for " + key);
        delete result.defines;
        delete result.l10nResolved;
        if (!warns.length) result.warns = false;
        return result;
      };
    }();
    function startUseResource(uri) {
      var resource = basis.resource(uri).fetch();
      if (typeof resource.startUse == "function") resource.startUse();
    }
    function stopUseResource(uri) {
      var resource = basis.resource(uri).fetch();
      if (typeof resource.stopUse == "function") resource.stopUse();
    }
    function templateSourceUpdate() {
      if (this.destroyBuilder) buildTemplate.call(this);
      for (var i = 0, attach; attach = this.attaches_[i]; i++) attach.handler.call(attach.context);
    }
    function cloneDecl(array) {
      var result = [];
      if (array.source_) result.source_ = array.source_;
      for (var i = 0; i < array.length; i++) result.push(Array.isArray(array[i]) ? cloneDecl(array[i]) : array[i]);
      return result;
    }
    function getDeclFromSource(source, baseURI, clone, options) {
      var result = source;
      var sourceUrl;
      if (typeof result == "function") {
        baseURI = "baseURI" in source ? source.baseURI : baseURI;
        sourceUrl = "url" in source ? source.url : sourceUrl;
        result = result();
      }
      if (result instanceof basis.Token) {
        baseURI = "baseURI" in source ? source.baseURI : baseURI;
        sourceUrl = "url" in source ? source.url : sourceUrl;
        result = result.get();
      }
      if (Array.isArray(result)) {
        if (clone) result = cloneDecl(result);
        result = {
          tokens: result
        };
      } else {
        if (typeof result != "object" || !Array.isArray(result.tokens)) result = String(result);
      }
      if (typeof result == "string") result = makeDeclaration(result, baseURI, options, sourceUrl, source);
      return result;
    }
    function l10nHandler(value) {
      if (this.type != "markup" && this.token.type == "markup") {
        buildTemplate.call(this.template);
      }
    }
    function buildTemplate() {
      var decl = getDeclFromSource(this.source, this.baseURI, false, {
        isolate: this.getIsolatePrefix()
      });
      var destroyBuilder = this.destroyBuilder;
      var funcs = this.builder(decl.tokens, this);
      var deps = this.deps_;
      var l10n = this.l10n_;
      if (deps) {
        this.deps_ = null;
        for (var i = 0, dep; dep = deps[i]; i++) dep.bindingBridge.detach(dep, buildTemplate, this);
      }
      if (l10n) for (var i = 0, item; item = l10n[i]; i++) item.token.bindingBridge.detach(item.token, l10nHandler, item);
      if (decl.deps && decl.deps.length) {
        deps = decl.deps;
        this.deps_ = deps;
        for (var i = 0, dep; dep = deps[i]; i++) dep.bindingBridge.attach(dep, buildTemplate, this);
      }
      if (decl.l10n) {
        l10n = decl.l10n;
        this.l10n_ = {};
        for (var i = 0, key; key = l10n[i]; i++) {
          var l10nToken = basis.l10n.token(key);
          l10nToken.bindingBridge.attach(l10nToken, l10nHandler, this.l10n_[key] = {
            template: this,
            token: l10nToken,
            type: l10nToken.type
          });
        }
      }
      this.createInstance = funcs.createInstance;
      this.clearInstance = funcs.destroyInstance;
      this.getBinding = function() {
        return {
          names: funcs.keys
        };
      };
      this.destroyBuilder = funcs.destroy;
      this.instances_ = funcs.instances_;
      this.decl_ = decl;
      var declResources = decl.resources && decl.resources.length > 0 ? decl.resources : null;
      if (declResources) for (var i = 0, res; res = declResources[i]; i++) startUseResource(res);
      if (this.resources) for (var i = 0, res; res = this.resources[i]; i++) stopUseResource(res);
      this.resources = declResources;
      if (destroyBuilder) destroyBuilder(true);
    }
    var sourceByDocumentIdResolvers = {};
    function getTemplateByDocumentId(id) {
      var resolver = resolveSourceByDocumentId(id);
      if (resolver.template) return resolver.template;
      var host = document.getElementById(id);
      var source = "";
      if (host && host.tagName == "SCRIPT" && host.type == "text/basis-template") source = host.textContent || host.text; else if (!host) basis.dev.warn("Template script element with id `" + id + "` not found"); else basis.dev.warn('Template should be declared in <script type="text/basis-template"> element (id `' + sourceId + "`)");
      return resolver.template = new Template(source);
    }
    function resolveSourceByDocumentId(sourceId) {
      var resolver = sourceByDocumentIdResolvers[sourceId];
      if (!resolver) {
        resolver = sourceByDocumentIdResolvers[sourceId] = function() {
          return getTemplateByDocumentId(sourceId).source;
        };
        resolver.id = sourceId;
        resolver.url = '<script id="' + sourceId + '"/>';
      }
      return resolver;
    }
    var Template = Class(null, {
      className: namespace + ".Template",
      __extend__: function(value) {
        if (value instanceof Template) return value;
        if (value instanceof TemplateSwitchConfig) return new TemplateSwitcher(value);
        return new Template(value);
      },
      source: "",
      baseURI: "",
      init: function(source) {
        if (templateList.length == 4096) throw "Too many templates (maximum 4096)";
        this.attaches_ = [];
        this.setSource(source || "");
        this.templateId = templateList.push(this) - 1;
      },
      bindingBridge: {
        attach: function(template, handler, context) {
          for (var i = 0, listener; listener = template.attaches_[i]; i++) if (listener.handler == handler && listener.context == context) return;
          template.attaches_.push({
            handler: handler,
            context: context
          });
        },
        detach: function(template, handler, context) {
          for (var i = 0, listener; listener = template.attaches_[i]; i++) if (listener.handler == handler && listener.context == context) {
            template.attaches_.splice(i, 1);
            return;
          }
        },
        get: function() {}
      },
      createInstance: function(object, actionCallback, updateCallback, bindings, bindingInterface) {
        buildTemplate.call(this);
        return this.createInstance(object, actionCallback, updateCallback, bindings, bindingInterface);
      },
      clearInstance: function(tmpl) {},
      getIsolatePrefix: function() {
        return "i" + this.templateId + "__";
      },
      getBinding: function(bindings) {
        buildTemplate.call(this);
        return this.getBinding(bindings);
      },
      setSource: function(source) {
        var oldSource = this.source;
        if (oldSource != source) {
          if (typeof source == "string") {
            var m = source.match(/^([a-z]+):/);
            if (m) {
              var prefix = m[1];
              source = source.substr(m[0].length);
              switch (prefix) {
                case "file":
                  source = basis.resource(source);
                  break;
                case "id":
                  source = resolveSourceByDocumentId(source);
                  break;
                case "tokens":
                  source = basis.string.toObject(source);
                  source.isDecl = true;
                  break;
                case "raw":
                  break;
                case "path":
                  source = getSourceByPath(source);
                  break;
                default:
                  basis.dev.warn(namespace + ".Template.setSource: Unknown prefix " + prefix + " for template source was ingnored.");
              }
            }
          }
          if (oldSource && oldSource.bindingBridge) {
            var tmplList = oldSource.url && tmplFilesMap[oldSource.url];
            if (tmplList) {
              arrayRemove(tmplList, this);
              if (!tmplList.length) delete tmplFilesMap[oldSource.url];
            }
            this.baseURI = "";
            this.source.bindingBridge.detach(oldSource, templateSourceUpdate, this);
          }
          if (source && source.bindingBridge) {
            if (source.url) {
              this.baseURI = path.dirname(source.url) + "/";
              if (!tmplFilesMap[source.url]) tmplFilesMap[source.url] = [];
              arrayAdd(tmplFilesMap[source.url], this);
            }
            source.bindingBridge.attach(source, templateSourceUpdate, this);
          }
          this.source = source;
          templateSourceUpdate.call(this);
        }
      },
      destroy: function() {
        if (this.destroyBuilder) this.destroyBuilder();
        this.attaches_ = null;
        this.createInstance = null;
        this.getBinding = null;
        this.resources = null;
        this.source = null;
        this.instances_ = null;
        this.decl_ = null;
      }
    });
    var TemplateSwitchConfig = function(config) {
      basis.object.extend(this, config);
    };
    var TemplateSwitcher = basis.Class(null, {
      className: namespace + ".TemplateSwitcher",
      ruleRet_: null,
      templates_: null,
      templateClass: Template,
      ruleEvents: null,
      rule: String,
      init: function(config) {
        this.ruleRet_ = [];
        this.templates_ = [];
        this.rule = config.rule;
        var events = config.events;
        if (events && events.length) {
          this.ruleEvents = {};
          for (var i = 0, eventName; eventName = events[i]; i++) this.ruleEvents[eventName] = true;
        }
        cleaner.add(this);
      },
      resolve: function(object) {
        var ret = this.rule(object);
        var idx = this.ruleRet_.indexOf(ret);
        if (idx == -1) {
          this.ruleRet_.push(ret);
          idx = this.templates_.push(new this.templateClass(ret)) - 1;
        }
        return this.templates_[idx];
      },
      destroy: function() {
        this.rule = null;
        this.templates_ = null;
        this.ruleRet_ = null;
      }
    });
    function switcher(events, rule) {
      var args = basis.array(arguments);
      var rule = args.pop();
      return new TemplateSwitchConfig({
        rule: rule,
        events: args.join(" ").trim().split(/\s+/)
      });
    }
    var Theme = Class(null, {
      className: namespace + ".Theme",
      get: getSourceByPath
    });
    var SourceWrapper = Class(basis.Token, {
      className: namespace + ".SourceWrapper",
      path: "",
      url: "",
      baseURI: "",
      init: function(value, path) {
        this.path = path;
        basis.Token.prototype.init.call(this, "");
      },
      get: function() {
        return this.value && this.value.bindingBridge ? this.value.bindingBridge.get(this.value) : this.value;
      },
      set: function() {
        var content = getThemeSource(currentThemeName, this.path);
        if (this.value != content) {
          if (this.value && this.value.bindingBridge) this.value.bindingBridge.detach(this.value, SourceWrapper.prototype.apply, this);
          this.value = content;
          this.url = content && content.url || "";
          this.baseURI = (typeof content == "object" || typeof content == "function") && "baseURI" in content ? content.baseURI : path.dirname(this.url) + "/";
          if (this.value && this.value.bindingBridge) this.value.bindingBridge.attach(this.value, SourceWrapper.prototype.apply, this);
          this.apply();
        }
      },
      destroy: function() {
        this.url = null;
        this.baseURI = null;
        if (this.value && this.value.bindingBridge) this.value.bindingBridge.detach(this.value, this.apply, this);
        basis.Token.prototype.destroy.call(this);
      }
    });
    function getSourceByPath() {
      var path = basis.array(arguments).join(".");
      var source = sourceByPath[path];
      if (!source) {
        source = new SourceWrapper("", path);
        sourceByPath[path] = source;
      }
      return source;
    }
    function normalize(list) {
      var used = {};
      var result = [];
      for (var i = 0; i < list.length; i++) if (!used[list[i]]) {
        used[list[i]] = true;
        result.push(list[i]);
      }
      return result;
    }
    function extendFallback(themeName, list) {
      var result = [];
      result.source = normalize(list).join("/");
      var used = {
        base: true
      };
      for (var i = 0; i < list.length; i++) {
        var name = list[i] || "base";
        if (name == themeName || used[name]) continue;
        var theme = getTheme(name);
        used[name] = true;
        result.push(name);
        list.splice.apply(list, [ i + 1, 0 ].concat(themes[name].fallback));
      }
      result.unshift(themeName);
      if (themeName != "base") result.push("base");
      result.value = result.join("/");
      return result;
    }
    function getThemeSource(name, path) {
      var sourceList = themes[name].sourcesList;
      for (var i = 0, map; map = sourceList[i]; i++) if (map.hasOwnProperty(path)) return map[path];
      return "";
    }
    function themeHasEffect(themeName) {
      return themes[currentThemeName].fallback.indexOf(themeName) != -1;
    }
    function syncCurrentThemePath(path) {
      getSourceByPath(path).set();
    }
    function syncCurrentTheme(changed) {
      basis.dev.log("re-apply templates");
      for (var path in sourceByPath) syncCurrentThemePath(path);
    }
    function getTheme(name) {
      if (!name) name = "base";
      if (themes[name]) return themes[name].theme;
      if (!/^([a-z0-9\_\-]+)$/.test(name)) throw "Bad name for theme - " + name;
      var sources = {};
      var sourceList = [ sources ];
      var themeInterface = new Theme;
      themes[name] = {
        theme: themeInterface,
        sources: sources,
        sourcesList: sourceList,
        fallback: []
      };
      var addSource = function(path, source) {
        if (path in sources == false) {
          sources[path] = source;
          if (themeHasEffect(name)) syncCurrentThemePath(path);
        } else basis.dev.warn("Template path `" + path + "` is already defined for theme `" + name + "` (definition ignored).");
        return getSourceByPath(path);
      };
      basis.object.extend(themeInterface, {
        name: name,
        fallback: function(value) {
          if (themeInterface !== baseTheme && arguments.length > 0) {
            var newFallback = typeof value == "string" ? value.split("/") : [];
            var changed = {};
            newFallback = extendFallback(name, newFallback);
            if (themes[name].fallback.source != newFallback.source) {
              themes[name].fallback.source = newFallback.source;
              basis.dev.log("fallback changed");
              for (var themeName in themes) {
                var curFallback = themes[themeName].fallback;
                var newFallback = extendFallback(themeName, (curFallback.source || "").split("/"));
                if (newFallback.value != curFallback.value) {
                  changed[themeName] = true;
                  themes[themeName].fallback = newFallback;
                  var sourceList = themes[themeName].sourcesList;
                  sourceList.length = newFallback.length;
                  for (var i = 0; i < sourceList.length; i++) sourceList[i] = themes[newFallback[i]].sources;
                }
              }
            }
            var currentFallback = themes[currentThemeName].fallback;
            for (var themeName in changed) {
              if (themeHasEffect(themeName)) {
                syncCurrentTheme();
                break;
              }
            }
          }
          var result = themes[name].fallback.slice(1);
          result.source = themes[name].fallback.source;
          return result;
        },
        define: function(what, wherewith) {
          if (typeof what == "function") what = what();
          if (typeof what == "string") {
            if (typeof wherewith == "object") {
              var namespace = what;
              var dictionary = wherewith;
              var result = {};
              for (var key in dictionary) if (dictionary.hasOwnProperty(key)) result[key] = addSource(namespace + "." + key, dictionary[key]);
              return result;
            } else {
              if (arguments.length == 1) {
                return getSourceByPath(what);
              } else {
                return addSource(what, wherewith);
              }
            }
          } else {
            if (typeof what == "object") {
              var dictionary = what;
              for (var path in dictionary) if (dictionary.hasOwnProperty(path)) addSource(path, dictionary[path]);
              return themeInterface;
            } else {
              basis.dev.warn("Wrong first argument for basis.template.Theme#define");
            }
          }
        },
        apply: function() {
          if (name != currentThemeName) {
            currentThemeName = name;
            syncCurrentTheme();
            for (var i = 0, handler; handler = themeChangeHandlers[i]; i++) handler.fn.call(handler.context, name);
            basis.dev.info("Template theme switched to `" + name + "`");
          }
          return themeInterface;
        },
        getSource: function(path, withFallback) {
          return withFallback ? getThemeSource(name, path) : sources[path];
        },
        drop: function(path) {
          if (sources.hasOwnProperty(path)) {
            delete sources[path];
            if (themeHasEffect(name)) syncCurrentThemePath(path);
          }
        }
      });
      themes[name].fallback = extendFallback(name, []);
      sourceList.push(themes.base.sources);
      return themeInterface;
    }
    var themes = {};
    var sourceByPath = {};
    var baseTheme = getTheme();
    var currentThemeName = "base";
    var themeChangeHandlers = [];
    function onThemeChange(fn, context, fire) {
      themeChangeHandlers.push({
        fn: fn,
        context: context
      });
      if (fire) fn.call(context, currentThemeName);
    }
    cleaner.add({
      destroy: function() {
        for (var path in sourceByPath) sourceByPath[path].destroy();
        themes = null;
        sourceByPath = null;
        for (var i = 0, template; template = templateList[i]; i++) template.destroy();
        templateList = null;
      }
    });
    module.exports = {
      DECLARATION_VERSION: DECLARATION_VERSION,
      TYPE_ELEMENT: TYPE_ELEMENT,
      TYPE_ATTRIBUTE: TYPE_ATTRIBUTE,
      TYPE_ATTRIBUTE_CLASS: TYPE_ATTRIBUTE_CLASS,
      TYPE_ATTRIBUTE_STYLE: TYPE_ATTRIBUTE_STYLE,
      TYPE_ATTRIBUTE_EVENT: TYPE_ATTRIBUTE_EVENT,
      TYPE_TEXT: TYPE_TEXT,
      TYPE_COMMENT: TYPE_COMMENT,
      TOKEN_TYPE: TOKEN_TYPE,
      TOKEN_BINDINGS: TOKEN_BINDINGS,
      TOKEN_REFS: TOKEN_REFS,
      ATTR_NAME: ATTR_NAME,
      ATTR_VALUE: ATTR_VALUE,
      ATTR_NAME_BY_TYPE: ATTR_NAME_BY_TYPE,
      ELEMENT_NAME: ELEMENT_NAME,
      ELEMENT_ATTRS: ELEMENT_ATTRS,
      ELEMENT_CHILDS: ELEMENT_CHILDS,
      TEXT_VALUE: TEXT_VALUE,
      COMMENT_VALUE: COMMENT_VALUE,
      L10nProxyToken: L10nProxyToken,
      TemplateSwitchConfig: TemplateSwitchConfig,
      TemplateSwitcher: TemplateSwitcher,
      Template: Template,
      SourceWrapper: SourceWrapper,
      switcher: switcher,
      tokenize: tokenize,
      isolateCss: isolateCss,
      getDeclFromSource: getDeclFromSource,
      makeDeclaration: makeDeclaration,
      getL10nTemplate: getL10nTemplate,
      Theme: Theme,
      theme: getTheme,
      getThemeList: function() {
        return basis.object.keys(themes);
      },
      currentTheme: function() {
        return themes[currentThemeName].theme;
      },
      setTheme: function(name) {
        return getTheme(name).apply();
      },
      onThemeChange: onThemeChange,
      define: baseTheme.define,
      get: getSourceByPath,
      getPathList: function() {
        return basis.object.keys(sourceByPath);
      }
    };
  },
  "7.js": function(exports, module, basis, global, __filename, __dirname, require, resource) {
    basis.require("./8.js");
    basis.require("./2.js");
    basis.require("./6.js");
    basis.require("./9.js");
    var namespace = this.path;
    var document = global.document;
    var domEvent = basis.dom.event;
    var arrayFrom = basis.array.from;
    var camelize = basis.string.camelize;
    var l10nToken = basis.l10n.token;
    var getFunctions = basis.template.htmlfgen.getFunctions;
    var TemplateSwitchConfig = basis.template.TemplateSwitchConfig;
    var TemplateSwitcher = basis.template.TemplateSwitcher;
    var Template = basis.template.Template;
    var TYPE_ELEMENT = basis.template.TYPE_ELEMENT;
    var TYPE_ATTRIBUTE = basis.template.TYPE_ATTRIBUTE;
    var TYPE_TEXT = basis.template.TYPE_TEXT;
    var TYPE_COMMENT = basis.template.TYPE_COMMENT;
    var TOKEN_TYPE = basis.template.TOKEN_TYPE;
    var TOKEN_BINDINGS = basis.template.TOKEN_BINDINGS;
    var TOKEN_REFS = basis.template.TOKEN_REFS;
    var ATTR_NAME = basis.template.ATTR_NAME;
    var ATTR_VALUE = basis.template.ATTR_VALUE;
    var ATTR_NAME_BY_TYPE = basis.template.ATTR_NAME_BY_TYPE;
    var ELEMENT_NAME = basis.template.ELEMENT_NAME;
    var TEXT_VALUE = basis.template.TEXT_VALUE;
    var COMMENT_VALUE = basis.template.COMMENT_VALUE;
    var eventAttr = /^event-(.+)+/;
    var basisTemplateIdMarker = "basisTemplateId_" + basis.genUID();
    var tmplEventListeners = {};
    var templates = {};
    var namespaceURI = {
      svg: "http://www.w3.org/2000/svg"
    };
    var afterEventAction = {};
    var insideElementEvent = {};
    var MOUSE_ENTER_LEAVE_SUPPORT = "onmouseenter" in document.documentElement;
    var CAPTURE_FALLBACK = !document.addEventListener && "__basisTemplate" + parseInt(1e9 * Math.random());
    if (CAPTURE_FALLBACK) global[CAPTURE_FALLBACK] = function(eventName, event) {
      domEvent.fireEvent(document, eventName);
      event.returnValue = true;
      var listener = tmplEventListeners[eventName];
      if (listener) listener(new domEvent.Event(event));
    };
    var CLONE_NORMALIZATION_TEXT_BUG = function() {
      var element = document.createElement("div");
      element.appendChild(document.createTextNode("a"));
      element.appendChild(document.createTextNode("a"));
      return element.cloneNode(true).childNodes.length == 1;
    }();
    var SET_CLASS_ATTRIBUTE_BUG = function() {
      var element = document.createElement("div");
      element.setAttribute("class", "a");
      return !element.className;
    }();
    var SET_STYLE_ATTRIBUTE_BUG = function() {
      var element = document.createElement("div");
      element.setAttribute("style", "position:absolute");
      return element.style.position != "absolute";
    }();
    var IS_SET_STYLE_SAFE = !!function() {
      try {
        return document.documentElement.style.color = "x";
      } catch (e) {}
    }();
    if (typeof Node != "undefined" && !Node.prototype.contains) Node.prototype.contains = function(child) {
      return !!(this.compareDocumentPosition(child) & 16);
    };
    var l10nTemplates = {};
    function getL10nTemplate(token) {
      var template = basis.template.getL10nTemplate(token);
      var id = template.templateId;
      var htmlTemplate = l10nTemplates[id];
      if (!htmlTemplate) htmlTemplate = l10nTemplates[id] = new HtmlTemplate(template.source);
      return htmlTemplate;
    }
    function createEventHandler(attrName) {
      return function(event) {
        if (event.type == "click" && event.which == 3) return;
        var bubble = insideElementEvent[event.type] || event.type != "mouseenter" && event.type != "mouseleave";
        var attrCursor = event.sender;
        var attr;
        while (attrCursor) {
          attr = attrCursor.getAttribute && attrCursor.getAttribute(attrName);
          if (!bubble || typeof attr == "string") break;
          attrCursor = attrCursor.parentNode;
        }
        if (typeof attr == "string") {
          var cursor = attrCursor;
          var actionTarget = cursor;
          var refId;
          var tmplRef;
          if (insideElementEvent[event.type]) {
            var relTarget = event.relatedTarget;
            if (relTarget && (cursor === relTarget || cursor.contains(relTarget))) cursor = null;
          }
          while (cursor) {
            refId = cursor[basisTemplateIdMarker];
            if (typeof refId == "number") {
              if (tmplRef = resolveInstanceById(refId)) break;
            }
            cursor = cursor.parentNode;
          }
          if (tmplRef && tmplRef.action) {
            var actions = attr.trim().split(/\s+/);
            event.actionTarget = actionTarget;
            for (var i = 0, actionName; actionName = actions[i++]; ) switch (actionName) {
              case "prevent-default":
                event.preventDefault();
                break;
              case "stop-propagation":
                event.stopPropagation();
                break;
              default:
                tmplRef.action.call(tmplRef.context, actionName, event);
            }
          }
        }
        if (event.type in afterEventAction) afterEventAction[event.type](event, attrCursor);
      };
    }
    var buildHtml = function(tokens, parent) {
      function emulateEvent(origEventName, emulEventName) {
        regEventHandler(emulEventName);
        insideElementEvent[origEventName] = true;
        afterEventAction[emulEventName] = function(event) {
          event = new domEvent.Event(event);
          event.type = origEventName;
          tmplEventListeners[origEventName](event);
        };
        afterEventAction[origEventName] = function(event, cursor) {
          cursor = cursor && cursor.parentNode;
          if (cursor) {
            event = new domEvent.Event(event);
            event.type = origEventName;
            event.sender = cursor;
            tmplEventListeners[origEventName](event);
          }
        };
      }
      function regEventHandler(eventName) {
        if (!tmplEventListeners[eventName]) {
          tmplEventListeners[eventName] = createEventHandler("event-" + eventName);
          if (!CAPTURE_FALLBACK) {
            if (!MOUSE_ENTER_LEAVE_SUPPORT && eventName == "mouseenter") return emulateEvent(eventName, "mouseover");
            if (!MOUSE_ENTER_LEAVE_SUPPORT && eventName == "mouseleave") return emulateEvent(eventName, "mouseout");
            for (var i = 0, names = domEvent.browserEvents(eventName), browserEventName; browserEventName = names[i]; i++) domEvent.addGlobalHandler(browserEventName, tmplEventListeners[eventName]);
          }
        }
      }
      function setEventAttribute(eventName, actions) {
        regEventHandler(eventName);
        if (CAPTURE_FALLBACK) result.setAttribute("on" + eventName, CAPTURE_FALLBACK + '("' + eventName + '",event)');
        result.setAttribute("event-" + eventName, actions);
      }
      function setAttribute(name, value) {
        if (SET_CLASS_ATTRIBUTE_BUG && name == "class") name = "className";
        if (SET_STYLE_ATTRIBUTE_BUG && name == "style") return result.style.cssText = value;
        result.setAttribute(name, value);
      }
      var result = parent || document.createDocumentFragment();
      for (var i = parent ? 4 : 0, token; token = tokens[i]; i++) {
        switch (token[TOKEN_TYPE]) {
          case TYPE_ELEMENT:
            var tagName = token[ELEMENT_NAME];
            var parts = tagName.split(/:/);
            var element = parts.length > 1 ? document.createElementNS(namespaceURI[parts[0]], tagName) : document.createElement(tagName);
            buildHtml(token, element);
            result.appendChild(element);
            break;
          case TYPE_ATTRIBUTE:
            var attrName = token[ATTR_NAME];
            var attrValue = token[ATTR_VALUE];
            var eventName = attrName.replace(/^event-/, "");
            if (eventName != attrName) {
              setEventAttribute(eventName, attrValue);
            } else {
              if (attrName != "class" && attrName != "style" ? !token[TOKEN_BINDINGS] : attrValue) setAttribute(attrName, attrValue || "");
            }
            break;
          case 4:
          case 5:
            var attrValue = token[ATTR_VALUE - 1];
            if (attrValue) setAttribute(ATTR_NAME_BY_TYPE[token[TOKEN_TYPE]], attrValue);
            break;
          case 6:
            setEventAttribute(token[1], token[2] || token[1]);
            break;
          case TYPE_COMMENT:
            result.appendChild(document.createComment(token[COMMENT_VALUE] || (token[TOKEN_REFS] ? "{" + token[TOKEN_REFS].join("|") + "}" : "")));
            break;
          case TYPE_TEXT:
            if (CLONE_NORMALIZATION_TEXT_BUG && i && tokens[i - 1][TOKEN_TYPE] == TYPE_TEXT) result.appendChild(document.createComment(""));
            result.appendChild(document.createTextNode(token[TEXT_VALUE] || (token[TOKEN_REFS] ? "{" + token[TOKEN_REFS].join("|") + "}" : "") || (token[TOKEN_BINDINGS] ? "{" + token[TOKEN_BINDINGS] + "}" : "")));
            break;
        }
      }
      if (!parent && tokens.length == 1) result = result.firstChild;
      return result;
    };
    function resolveTemplateById(refId) {
      var templateId = refId & 4095;
      var object = templates[templateId];
      return object && object.template;
    }
    function resolveInstanceById(refId) {
      var templateId = refId & 4095;
      var instanceId = refId >> 12;
      var object = templates[templateId];
      return object && object.instances[instanceId];
    }
    function resolveObjectById(refId) {
      var templateRef = resolveInstanceById(refId);
      return templateRef && templateRef.context;
    }
    function resolveTmplById(refId) {
      var templateRef = resolveInstanceById(refId);
      return templateRef && templateRef.tmpl;
    }
    function getDebugInfoById(refId) {
      var templateRef = resolveInstanceById(refId);
      return templateRef && templateRef.debug && templateRef.debug();
    }
    var builder = function() {
      var WHITESPACE = /\s+/;
      var W3C_DOM_NODE_SUPPORTED = typeof Node == "function" && document instanceof Node;
      var CLASSLIST_SUPPORTED = global.DOMTokenList && document && document.documentElement.classList instanceof global.DOMTokenList;
      var bind_node = W3C_DOM_NODE_SUPPORTED ? function(domRef, oldNode, newValue) {
        var newNode = newValue && newValue instanceof Node ? newValue : domRef;
        if (newNode !== oldNode) oldNode.parentNode.replaceChild(newNode, oldNode);
        return newNode;
      } : function(domRef, oldNode, newValue) {
        var newNode = newValue && typeof newValue == "object" ? newValue : domRef;
        if (newNode !== oldNode) {
          try {
            oldNode.parentNode.replaceChild(newNode, oldNode);
          } catch (e) {
            newNode = domRef;
            if (oldNode !== newNode) oldNode.parentNode.replaceChild(newNode, oldNode);
          }
        }
        return newNode;
      };
      var bind_element = function(domRef, oldNode, newValue) {
        var newNode = bind_node(domRef, oldNode, newValue);
        if (newNode === domRef && typeof newValue == "string") domRef.innerHTML = newValue;
        return newNode;
      };
      var bind_comment = bind_node;
      var bind_textNode = function(domRef, oldNode, newValue) {
        var newNode = bind_node(domRef, oldNode, newValue);
        if (newNode === domRef) domRef.nodeValue = newValue;
        return newNode;
      };
      var bind_attrClass = CLASSLIST_SUPPORTED ? function(domRef, oldClass, newValue, prefix, anim) {
        var newClass = newValue ? prefix + newValue : "";
        if (newClass != oldClass) {
          if (oldClass) domRef.classList.remove(oldClass);
          if (newClass) {
            domRef.classList.add(newClass);
            if (anim) {
              domRef.classList.add(newClass + "-anim");
              basis.nextTick(function() {
                domRef.classList.remove(newClass + "-anim");
              });
            }
          }
        }
        return newClass;
      } : function(domRef, oldClass, newValue, prefix, anim) {
        var newClass = newValue ? prefix + newValue : "";
        if (newClass != oldClass) {
          var className = domRef.className;
          var classNameIsObject = typeof className != "string";
          var classList;
          if (classNameIsObject) className = className.baseVal;
          classList = className.split(WHITESPACE);
          if (oldClass) basis.array.remove(classList, oldClass);
          if (newClass) {
            classList.push(newClass);
            if (anim) {
              basis.array.add(classList, newClass + "-anim");
              basis.nextTick(function() {
                var classList = (classNameIsObject ? domRef.className.baseVal : domRef.className).split(WHITESPACE);
                basis.array.remove(classList, newClass + "-anim");
                if (classNameIsObject) domRef.className.baseVal = classList.join(" "); else domRef.className = classList.join(" ");
              });
            }
          }
          if (classNameIsObject) domRef.className.baseVal = classList.join(" "); else domRef.className = classList.join(" ");
        }
        return newClass;
      };
      var bind_attrStyle = IS_SET_STYLE_SAFE ? function(domRef, propertyName, oldValue, newValue) {
        if (oldValue !== newValue) domRef.style[camelize(propertyName)] = newValue;
        return newValue;
      } : function(domRef, propertyName, oldValue, newValue) {
        if (oldValue !== newValue) {
          try {
            domRef.style[camelize(propertyName)] = newValue;
          } catch (e) {}
        }
        return newValue;
      };
      var bind_attr = function(domRef, attrName, oldValue, newValue) {
        if (oldValue !== newValue) {
          if (newValue) domRef.setAttribute(attrName, newValue); else domRef.removeAttribute(attrName);
        }
        return newValue;
      };
      function updateAttach() {
        this.set(this.name, this.value);
      }
      function resolveValue(bindingName, value, Attaches) {
        var bridge = value && value.bindingBridge;
        var oldAttach = this.attaches && this.attaches[bindingName];
        var tmpl = null;
        if (bridge || oldAttach) {
          if (bridge) {
            if (!oldAttach || value !== oldAttach.value) {
              if (oldAttach) {
                if (oldAttach.tmpl) {
                  oldAttach.tmpl.element.toString = null;
                  getL10nTemplate(oldAttach.value).clearInstance(oldAttach.tmpl);
                }
                oldAttach.value.bindingBridge.detach(oldAttach.value, updateAttach, oldAttach);
              }
              if (value.type == "markup" && value instanceof basis.l10n.Token) {
                var template = getL10nTemplate(value);
                var context = this.context;
                var bindings = this.bindings;
                var bindingInterface = this.bindingInterface;
                tmpl = template.createInstance(context, null, function onRebuild() {
                  tmpl = newAttach.tmpl = template.createInstance(context, null, onRebuild, bindings, bindingInterface);
                  tmpl.element.toString = function() {
                    return value.value;
                  };
                  updateAttach.call(newAttach);
                }, bindings, bindingInterface);
                tmpl.element.toString = function() {
                  return value.value;
                };
              }
              if (!this.attaches) this.attaches = new Attaches;
              var newAttach = this.attaches[bindingName] = {
                name: bindingName,
                value: value,
                tmpl: tmpl,
                set: this.tmpl.set
              };
              bridge.attach(value, updateAttach, newAttach);
            } else tmpl = value && value.type == "markup" ? oldAttach.tmpl : null;
            if (tmpl) return tmpl.element;
            value = bridge.get(value);
          } else {
            if (oldAttach) {
              if (oldAttach.tmpl) {
                oldAttach.tmpl.element.toString = null;
                getL10nTemplate(oldAttach.value).clearInstance(oldAttach.tmpl);
              }
              oldAttach.value.bindingBridge.detach(oldAttach.value, updateAttach, oldAttach);
              this.attaches[bindingName] = null;
            }
          }
        }
        return value;
      }
      function createBindingUpdater(names, getters) {
        var name1 = names[0];
        var name2 = names[1];
        var getter1 = getters[name1];
        var getter2 = getters[name2];
        switch (names.length) {
          case 1:
            return function bindingUpdater1(object) {
              this(name1, getter1(object));
            };
          case 2:
            return function bindingUpdater2(object) {
              this(name1, getter1(object));
              this(name2, getter2(object));
            };
          default:
            var getters_ = names.map(function(name) {
              return getters[name];
            });
            return function bindingUpdaterN(object) {
              for (var i = 0; i < names.length; i++) this(names[i], getters_[i](object));
            };
        }
      }
      function makeHandler(events, getters) {
        for (var name in events) events[name] = createBindingUpdater(events[name], getters);
        return name ? events : null;
      }
      function createBindingFunction(keys) {
        var bindingCache = {};
        return function getBinding(bindings, obj, set, bindingInterface) {
          if (!bindings) return {};
          var cacheId = "bindingId" in bindings ? bindings.bindingId : null;
          if (!cacheId) basis.dev.warn("basis.template.Template.getBinding: bindings has no bindingId property, cache is not used");
          var result = bindingCache[cacheId];
          if (!result) {
            var names = [];
            var getters = {};
            var events = {};
            for (var i = 0, bindingName; bindingName = keys[i]; i++) {
              var binding = bindings[bindingName];
              var getter = binding && binding.getter;
              if (getter) {
                getters[bindingName] = getter;
                names.push(bindingName);
                if (binding.events) {
                  var eventList = String(binding.events).trim().split(/\s+|\s*,\s*/);
                  for (var j = 0, eventName; eventName = eventList[j]; j++) {
                    if (events[eventName]) events[eventName].push(bindingName); else events[eventName] = [ bindingName ];
                  }
                }
              }
            }
            result = {
              names: names,
              sync: createBindingUpdater(names, getters),
              handler: makeHandler(events, getters)
            };
            if (cacheId) bindingCache[cacheId] = result;
          }
          if (obj && set) result.sync.call(set, obj);
          if (!bindingInterface) return;
          if (result.handler) bindingInterface.attach(obj, result.handler, set);
          return result.handler;
        };
      }
      var tools = {
        bind_textNode: bind_textNode,
        bind_node: bind_node,
        bind_element: bind_element,
        bind_comment: bind_comment,
        bind_attr: bind_attr,
        bind_attrClass: bind_attrClass,
        bind_attrStyle: bind_attrStyle,
        resolve: resolveValue,
        l10nToken: l10nToken,
        createBindingFunction: createBindingFunction
      };
      return function(tokens) {
        var fn = getFunctions(tokens, true, this.source.url, tokens.source_, !CLONE_NORMALIZATION_TEXT_BUG, basisTemplateIdMarker);
        var createInstance;
        var instances = {};
        var l10nMap = {};
        var l10nLinks = [];
        var seed = 0;
        var proto = buildHtml(tokens);
        var id = this.templateId;
        templates[id] = {
          template: this,
          instances: instances
        };
        if (fn.createL10nSync) {
          var l10nProtoSync = fn.createL10nSync(proto, l10nMap, bind_attr, CLONE_NORMALIZATION_TEXT_BUG);
          for (var i = 0, key; key = fn.l10nKeys[i]; i++) l10nProtoSync(key, l10nToken(key).value);
          if (fn.l10nKeys) for (var i = 0, key; key = fn.l10nKeys[i]; i++) {
            var link = {
              path: key,
              token: l10nToken(key),
              handler: function(value) {
                l10nProtoSync(this.path, value);
                for (var key in instances) instances[key].tmpl.set(this.path, value);
              }
            };
            link.token.attach(link.handler, link);
            l10nLinks.push(link);
            link = null;
          }
        }
        createInstance = fn.createInstance(id, instances, proto, tools, l10nMap, CLONE_NORMALIZATION_TEXT_BUG);
        return {
          createInstance: function(obj, onAction, onRebuild, bindings, bindingInterface) {
            var instanceId = seed++;
            var instance = createInstance(instanceId, obj, onAction, onRebuild, bindings, bindingInterface);
            instances[instanceId] = instance;
            return instance.tmpl;
          },
          destroyInstance: function(tmpl) {
            var instanceId = tmpl.templateId_;
            var instance = instances[instanceId];
            if (instance) {
              if (instance.handler) instance.bindingInterface.detach(instance.context, instance.handler, instance.tmpl.set);
              for (var key in instance.attaches) resolveValue.call(instance, key, null);
              delete instances[instanceId];
            }
          },
          keys: fn.keys,
          instances_: instances,
          destroy: function(rebuild) {
            for (var i = 0, link; link = l10nLinks[i]; i++) link.token.detach(link.handler, link);
            for (var key in instances) {
              var instance = instances[key];
              if (rebuild && instance.rebuild) instance.rebuild.call(instance.context);
              if (!rebuild || key in instances) {
                if (instance.handler) instance.bindingInterface.detach(instance.context, instance.handler, instance.tmpl.set);
                for (var key in instance.attaches) resolveValue.call(key, null);
              }
            }
            if (templates[id] && templates[id].instances === instances) delete templates[id];
            fn = null;
            proto = null;
            l10nMap = null;
            l10nLinks = null;
            l10nProtoSync = null;
            instances = null;
          }
        };
      };
    }();
    var HtmlTemplate = Template.subclass({
      className: namespace + ".Template",
      __extend__: function(value) {
        if (value instanceof HtmlTemplate) return value;
        if (value instanceof TemplateSwitchConfig) return new HtmlTemplateSwitcher(value);
        return new HtmlTemplate(value);
      },
      builder: builder
    });
    var HtmlTemplateSwitcher = TemplateSwitcher.subclass({
      className: namespace + ".TemplateSwitcher",
      templateClass: HtmlTemplate
    });
    module.exports = {
      marker: basisTemplateIdMarker,
      Template: HtmlTemplate,
      TemplateSwitcher: HtmlTemplateSwitcher
    };
    basis.template.extend({
      getDebugInfoById: getDebugInfoById,
      buildHtml: buildHtml,
      resolveTemplateById: resolveTemplateById,
      resolveObjectById: resolveObjectById,
      resolveTmplById: resolveTmplById
    });
  },
  "8.js": function(exports, module, basis, global, __filename, __dirname, require, resource) {
    var namespace = this.path;
    var document = global.document;
    var $null = basis.fn.$null;
    var arrayFrom = basis.array.from;
    var W3CSUPPORT = !!document.addEventListener;
    var EVENT_HOLDER = "__basisEvents";
    var KEY = {
      BACKSPACE: 8,
      TAB: 9,
      CTRL_ENTER: 10,
      ENTER: 13,
      SHIFT: 16,
      CTRL: 17,
      ALT: 18,
      ESC: 27,
      ESCAPE: 27,
      SPACE: 32,
      PAGEUP: 33,
      PAGEDOWN: 34,
      END: 35,
      HOME: 36,
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      DOWN: 40,
      INSERT: 45,
      DELETE: 46,
      F1: 112,
      F2: 113,
      F3: 114,
      F4: 115,
      F5: 116,
      F6: 117,
      F7: 118,
      F8: 119,
      F9: 120,
      F10: 121,
      F11: 122,
      F12: 123
    };
    var MOUSE_LEFT = {
      VALUE: 1,
      BIT: 1
    };
    var MOUSE_MIDDLE = {
      VALUE: 2,
      BIT: 4
    };
    var MOUSE_RIGHT = {
      VALUE: 3,
      BIT: 2
    };
    var BROWSER_EVENTS = {
      mousewheel: [ "mousewheel", "DOMMouseScroll" ]
    };
    function browserEvents(eventName) {
      return BROWSER_EVENTS[eventName] || [ eventName ];
    }
    var Event = basis.Class(null, {
      className: namespace + ".Event",
      KEY: KEY,
      init: function(event) {
        event = wrap(event);
        for (var name in event) if (name != "returnValue" && name != "keyLocation" && name != "layerX" && name != "layerY") if (typeof event[name] != "function" && name in this == false) this[name] = event[name];
        var target = sender(event);
        basis.object.extend(this, {
          event_: event,
          sender: target,
          target: target,
          key: key(event),
          charCode: charCode(event),
          mouseLeft: mouseButton(event, MOUSE_LEFT),
          mouseMiddle: mouseButton(event, MOUSE_MIDDLE),
          mouseRight: mouseButton(event, MOUSE_RIGHT),
          mouseX: mouseX(event),
          mouseY: mouseY(event),
          wheelDelta: wheelDelta(event)
        });
      },
      stopBubble: function() {
        cancelBubble(this.event_);
      },
      stopPropagation: function() {
        cancelBubble(this.event_);
      },
      preventDefault: function() {
        cancelDefault(this.event_);
      },
      die: function() {
        this.stopBubble();
        this.preventDefault();
      }
    });
    function wrap(event) {
      return event instanceof Event ? event.event_ : event || global.event;
    }
    function getNode(ref) {
      return typeof ref == "string" ? document.getElementById(ref) : ref;
    }
    function sender(event) {
      var target = event.target || event.srcElement || document;
      return target.nodeType == 3 ? target.parentNode : target;
    }
    function cancelBubble(event) {
      if (event.stopPropagation) event.stopPropagation(); else event.cancelBubble = true;
    }
    function cancelDefault(event) {
      if (event.preventDefault) event.preventDefault(); else event.returnValue = false;
    }
    function kill(event, node) {
      node = getNode(node);
      if (node) addHandler(node, event, kill); else {
        cancelDefault(event);
        cancelBubble(event);
      }
    }
    function key(event) {
      return event.keyCode || event.which || 0;
    }
    function charCode(event) {
      return event.charCode || event.keyCode || 0;
    }
    function mouseButton(event, button) {
      if (typeof event.which == "number") return event.which == button.VALUE; else return !!(event.button & button.BIT);
    }
    function mouseX(event) {
      if (event.changedTouches) return event.changedTouches[0].pageX; else if ("pageX" in event) return event.pageX; else return "clientX" in event ? event.clientX + (document.compatMode == "CSS1Compat" ? document.documentElement.scrollLeft : document.body.scrollLeft) : 0;
    }
    function mouseY(event) {
      if (event.changedTouches) return event.changedTouches[0].pageY; else if ("pageY" in event) return event.pageY; else return "clientY" in event ? event.clientY + (document.compatMode == "CSS1Compat" ? document.documentElement.scrollTop : document.body.scrollTop) : 0;
    }
    function wheelDelta(event) {
      var delta = 0;
      if ("wheelDelta" in event) delta = event.wheelDelta; else if (event.type == "DOMMouseScroll") delta = -event.detail;
      return delta && delta / Math.abs(delta);
    }
    var globalHandlers = {};
    var captureHandlers = {};
    var noCaptureScheme = !W3CSUPPORT;
    function observeGlobalEvents(event) {
      var handlers = arrayFrom(globalHandlers[event.type]);
      var captureHandler = captureHandlers[event.type];
      var wrappedEvent = new Event(event);
      if (captureHandler) {
        captureHandler.handler.call(captureHandler.thisObject, wrappedEvent);
        kill(event);
        return;
      }
      if (handlers) {
        for (var i = handlers.length; i-- > 0; ) {
          var handlerObject = handlers[i];
          handlerObject.handler.call(handlerObject.thisObject, wrappedEvent);
        }
      }
    }
    function captureEvent(eventType, handler, thisObject) {
      if (captureHandlers[eventType]) releaseEvent(eventType);
      addGlobalHandler(eventType, handler, thisObject);
      captureHandlers[eventType] = {
        handler: handler,
        thisObject: thisObject
      };
    }
    function releaseEvent(eventType) {
      var handlerObject = captureHandlers[eventType];
      if (handlerObject) {
        removeGlobalHandler(eventType, handlerObject.handler, handlerObject.thisObject);
        delete captureHandlers[eventType];
      }
    }
    function addGlobalHandler(eventType, handler, thisObject) {
      var handlers = globalHandlers[eventType];
      if (handlers) {
        for (var i = 0, item; item = handlers[i]; i++) if (item.handler === handler && item.thisObject === thisObject) return;
      } else {
        if (noCaptureScheme) addHandler(document, eventType, $null); else document.addEventListener(eventType, observeGlobalEvents, true);
        handlers = globalHandlers[eventType] = [];
      }
      handlers.push({
        handler: handler,
        thisObject: thisObject
      });
    }
    function removeGlobalHandler(eventType, handler, thisObject) {
      var handlers = globalHandlers[eventType];
      if (handlers) {
        for (var i = 0, item; item = handlers[i]; i++) {
          if (item.handler === handler && item.thisObject === thisObject) {
            handlers.splice(i, 1);
            if (!handlers.length) {
              delete globalHandlers[eventType];
              if (noCaptureScheme) removeHandler(document, eventType, $null); else document.removeEventListener(eventType, observeGlobalEvents, true);
            }
            return;
          }
        }
      }
    }
    function addHandler(node, eventType, handler, thisObject) {
      node = getNode(node);
      if (!node) throw "basis.event.addHandler: can't attach event listener to undefined";
      if (typeof handler != "function") throw "basis.event.addHandler: handler is not a function";
      if (!node[EVENT_HOLDER]) node[EVENT_HOLDER] = {};
      var handlerObject = {
        handler: handler,
        thisObject: thisObject
      };
      var handlers = node[EVENT_HOLDER];
      var eventTypeHandlers = handlers[eventType];
      if (!eventTypeHandlers) {
        eventTypeHandlers = handlers[eventType] = [ handlerObject ];
        eventTypeHandlers.fireEvent = function(event) {
          event = wrap(event);
          if (noCaptureScheme && event && globalHandlers[eventType]) {
            if (typeof event.returnValue == "undefined") {
              observeGlobalEvents(event);
              if (event.cancelBubble === true) return;
              if (typeof event.returnValue == "undefined") event.returnValue = true;
            }
          }
          for (var i = 0, wrappedEvent = new Event(event), item; item = eventTypeHandlers[i++]; ) item.handler.call(item.thisObject, wrappedEvent);
        };
        if (W3CSUPPORT) node.addEventListener(eventType, eventTypeHandlers.fireEvent, false); else node.attachEvent("on" + eventType, eventTypeHandlers.fireEvent);
      } else {
        for (var i = 0, item; item = eventTypeHandlers[i]; i++) if (item.handler === handler && item.thisObject === thisObject) return;
        eventTypeHandlers.push(handlerObject);
      }
    }
    function addHandlers(node, handlers, thisObject) {
      node = getNode(node);
      for (var eventType in handlers) addHandler(node, eventType, handlers[eventType], thisObject);
    }
    function removeHandler(node, eventType, handler, thisObject) {
      node = getNode(node);
      var handlers = node[EVENT_HOLDER];
      if (handlers) {
        var eventTypeHandlers = handlers[eventType];
        if (eventTypeHandlers) {
          for (var i = 0, item; item = eventTypeHandlers[i]; i++) {
            if (item.handler === handler && item.thisObject === thisObject) {
              eventTypeHandlers.splice(i, 1);
              if (!eventTypeHandlers.length) clearHandlers(node, eventType);
              return;
            }
          }
        }
      }
    }
    function clearHandlers(node, eventType) {
      node = getNode(node);
      var handlers = node[EVENT_HOLDER];
      if (handlers) {
        if (typeof eventType != "string") {
          for (eventType in handlers) clearHandlers(node, eventType);
        } else {
          var eventTypeHandlers = handlers[eventType];
          if (eventTypeHandlers) {
            if (node.removeEventListener) node.removeEventListener(eventType, eventTypeHandlers.fireEvent, false); else node.detachEvent("on" + eventType, eventTypeHandlers.fireEvent);
            delete handlers[eventType];
          }
        }
      }
    }
    function fireEvent(node, eventType, event) {
      node = getNode(node);
      var handlers = node[EVENT_HOLDER];
      if (handlers && handlers[eventType]) handlers[eventType].fireEvent(event);
    }
    function onUnload(handler, thisObject) {
      addHandler(global, "unload", handler, thisObject);
    }
    var tagNameEventMap = {};
    function getEventInfo(eventName, tagName) {
      if (!tagName) tagName = "div";
      var id = tagName + "-" + eventName;
      if (tagNameEventMap[id]) return tagNameEventMap[id]; else {
        var supported = false;
        var bubble = false;
        if (!W3CSUPPORT) {
          var onevent = "on" + eventName;
          var host = document.createElement("div");
          var target = host.appendChild(document.createElement(tagName));
          host[onevent] = function() {
            bubble = true;
          };
          try {
            target.fireEvent(onevent);
            supported = true;
          } catch (e) {}
        }
        return tagNameEventMap[id] = {
          supported: supported,
          bubble: bubble
        };
      }
    }
    function wrapEventFunction(fn) {
      return function(event, arg) {
        return fn(wrap(event), arg);
      };
    }
    module.exports = {
      W3CSUPPORT: W3CSUPPORT,
      browserEvents: browserEvents,
      getEventInfo: getEventInfo,
      KEY: KEY,
      MOUSE_LEFT: MOUSE_LEFT,
      MOUSE_RIGHT: MOUSE_RIGHT,
      MOUSE_MIDDLE: MOUSE_MIDDLE,
      Event: Event,
      sender: wrapEventFunction(sender),
      cancelBubble: wrapEventFunction(cancelBubble),
      cancelDefault: wrapEventFunction(cancelDefault),
      kill: wrapEventFunction(kill),
      key: wrapEventFunction(key),
      charCode: wrapEventFunction(charCode),
      mouseButton: wrapEventFunction(mouseButton),
      mouseX: wrapEventFunction(mouseX),
      mouseY: wrapEventFunction(mouseY),
      wheelDelta: wrapEventFunction(wheelDelta),
      addGlobalHandler: addGlobalHandler,
      removeGlobalHandler: removeGlobalHandler,
      captureEvent: captureEvent,
      releaseEvent: releaseEvent,
      addHandler: addHandler,
      addHandlers: addHandlers,
      removeHandler: removeHandler,
      clearHandlers: clearHandlers,
      fireEvent: fireEvent,
      onUnload: onUnload,
      wrap: wrap
    };
  },
  "9.js": function(exports, module, basis, global, __filename, __dirname, require, resource) {
    basis.require("./6.js");
    var TYPE_ELEMENT = basis.template.TYPE_ELEMENT;
    var TYPE_ATTRIBUTE = basis.template.TYPE_ATTRIBUTE;
    var TYPE_TEXT = basis.template.TYPE_TEXT;
    var TYPE_COMMENT = basis.template.TYPE_COMMENT;
    var TOKEN_TYPE = basis.template.TOKEN_TYPE;
    var TOKEN_BINDINGS = basis.template.TOKEN_BINDINGS;
    var TOKEN_REFS = basis.template.TOKEN_REFS;
    var ATTR_NAME = basis.template.ATTR_NAME;
    var ATTR_NAME_BY_TYPE = basis.template.ATTR_NAME_BY_TYPE;
    var ELEMENT_NAME = basis.template.ELEMENT_NAME;
    var ELEMENT_ATTRS = basis.template.ELEMENT_ATTRS;
    var ELEMENT_CHILDS = basis.template.ELEMENT_CHILDS;
    var TEXT_VALUE = basis.template.TEXT_VALUE;
    var COMMENT_VALUE = basis.template.COMMENT_VALUE;
    var tmplFunctions = {};
    var inlineSeed = 1;
    var buildPathes = function() {
      var PATH_REF_NAME = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
      var pathList;
      var refList;
      var bindingList;
      var markedElementList;
      var rootPath;
      var attrExprId;
      function putRefs(refs, pathIdx) {
        for (var i = 0, refName; refName = refs[i]; i++) if (refName.indexOf(":") == -1) refList.push(refName + ":" + pathIdx);
      }
      function putPath(path) {
        var len = pathList.length;
        var pathRef = PATH_REF_NAME[len] || "r" + len;
        pathList.push(pathRef + "=" + path);
        return pathRef;
      }
      function putBinding(binding) {
        bindingList.push(binding);
      }
      function processTokens(tokens, path, noTextBug, templateMarker) {
        var localPath;
        var refs;
        var myRef;
        var explicitRef;
        var bindings;
        for (var i = 0, cp = 0, closeText = 0, token; token = tokens[i]; i++, cp++, explicitRef = false) {
          if (!i) localPath = path + ".firstChild"; else {
            if (!tokens[i + 1]) localPath = path + ".lastChild"; else {
              if (token[TOKEN_TYPE] == tokens[i - 1][TOKEN_TYPE] && token[TOKEN_TYPE] == TYPE_TEXT) closeText++;
              localPath = path + ".childNodes[" + (noTextBug ? cp : cp + (closeText ? " + " + closeText + " * TEXT_BUG" : "")) + "]";
            }
          }
          if (refs = token[TOKEN_REFS]) {
            explicitRef = true;
            localPath = putPath(localPath);
            putRefs(refs, localPath);
          }
          if (token[TOKEN_BINDINGS]) {
            if (token[TOKEN_BINDINGS] && typeof token[TOKEN_BINDINGS] == "number") token[TOKEN_BINDINGS] = token[TOKEN_REFS][token[TOKEN_BINDINGS] - 1];
            if (!explicitRef) {
              explicitRef = true;
              localPath = putPath(localPath);
            }
            putBinding([ token[TOKEN_TYPE], localPath, token[TOKEN_BINDINGS] ]);
          }
          if (token[TOKEN_TYPE] == TYPE_ELEMENT) {
            myRef = -1;
            if (path == rootPath) markedElementList.push(localPath + "." + templateMarker);
            if (!explicitRef) {
              localPath = putPath(localPath);
              myRef = pathList.length;
            }
            var attrs = [];
            var children = [];
            for (var j = ELEMENT_ATTRS, t; t = token[j]; j++) if (t[TOKEN_TYPE] == TYPE_ELEMENT || t[TOKEN_TYPE] == TYPE_TEXT || t[TOKEN_TYPE] == TYPE_COMMENT) children.push(t); else attrs.push(t);
            for (var j = 0, attr; attr = attrs[j]; j++) {
              if (attr[TOKEN_TYPE] == 6) continue;
              var attrName = ATTR_NAME_BY_TYPE[attr[TOKEN_TYPE]] || attr[ATTR_NAME];
              if (refs = attr[TOKEN_REFS]) {
                explicitRef = true;
                putRefs(refs, putPath(localPath + '.getAttributeNode("' + attrName + '")'));
              }
              if (bindings = attr[TOKEN_BINDINGS]) {
                explicitRef = true;
                switch (attrName) {
                  case "class":
                    for (var k = 0, binding; binding = bindings[k]; k++) putBinding([ 2, localPath, binding[1], attrName, binding[0] ].concat(binding.slice(2)));
                    break;
                  case "style":
                    for (var k = 0, property; property = bindings[k]; k++) {
                      attrExprId++;
                      for (var m = 0, bindName; bindName = property[0][m]; m++) putBinding([ 2, localPath, bindName, attrName, property[0], property[1], property[2], property[3], attrExprId ]);
                    }
                    break;
                  default:
                    attrExprId++;
                    for (var k = 0, bindName; bindName = bindings[0][k]; k++) putBinding([ 2, localPath, bindName, attrName, bindings[0], bindings[1], token[ELEMENT_NAME], attrExprId ]);
                }
              }
            }
            if (children.length) processTokens(children, localPath, noTextBug);
            if (!explicitRef && myRef == pathList.length) pathList.pop();
          }
        }
      }
      return function(tokens, path, noTextBug, templateMarker) {
        pathList = [];
        refList = [];
        bindingList = [];
        markedElementList = [];
        rootPath = path || "_";
        attrExprId = 0;
        processTokens(tokens, rootPath, noTextBug, templateMarker);
        return {
          path: pathList,
          ref: refList,
          binding: bindingList,
          markedElementList: markedElementList
        };
      };
    }();
    var buildBindings = function() {
      var L10N_BINDING = /\.\{([a-zA-Z_][a-zA-Z0-9_\-]*)\}/;
      var SPECIAL_ATTR_MAP = {
        disabled: "*",
        checked: [ "input" ],
        indeterminate: [ "input" ],
        value: [ "input", "textarea", "select" ],
        minlength: [ "input" ],
        maxlength: [ "input" ],
        readonly: [ "input" ],
        selected: [ "option" ],
        multiple: [ "select" ]
      };
      var SPECIAL_ATTR_SINGLE = {
        disabled: true,
        checked: true,
        selected: true,
        readonly: true,
        multiple: true,
        indeterminate: true
      };
      var bindFunctions = {
        1: "bind_element",
        3: "bind_textNode",
        8: "bind_comment"
      };
      function buildAttrExpression(binding, special, l10n) {
        var expression = [];
        var symbols = binding[5];
        var dictionary = binding[4];
        var exprVar;
        var colonPos;
        for (var j = 0; j < symbols.length; j++) {
          if (typeof symbols[j] == "string") expression.push('"' + symbols[j].replace(/"/g, '\\"') + '"'); else {
            exprVar = dictionary[symbols[j]];
            colonPos = exprVar.indexOf(":");
            if (colonPos == -1) {
              expression.push(special == "l10n" ? '"{' + exprVar + '}"' : special == "bool" ? "(__" + exprVar + '||"")' : "__" + exprVar);
            } else {
              var bindingName = null;
              var l10nPath = exprVar.substr(colonPos + 1).replace(L10N_BINDING, function(m, name) {
                bindingName = name;
                return "";
              });
              if (bindingName) expression.push(l10n[exprVar.substr(colonPos + 1)]); else expression.push('__l10n["' + l10nPath + '"]');
            }
          }
        }
        if (expression.length == 1) expression.push('""');
        return expression.join("+");
      }
      return function(bindings) {
        function putBindCode(type) {
          toolsUsed[type] = true;
          bindCode.push(bindVar + "=" + type + "(" + basis.array(arguments, 1) + ");");
        }
        var bindMap = {};
        var bindCode;
        var bindVar;
        var varList = [];
        var result = [];
        var varName;
        var l10nMap;
        var l10nCompute = [];
        var l10nBindings = {};
        var l10nBindSeed = 1;
        var specialAttr;
        var attrExprId;
        var attrExprMap = {};
        var debugList = [];
        var toolsUsed = {
          resolve: true
        };
        for (var i = 0, binding; binding = bindings[i]; i++) {
          var bindType = binding[0];
          var domRef = binding[1];
          var bindName = binding[2];
          if ([ "get", "set", "templateId_" ].indexOf(bindName) != -1) {
            basis.dev.warn("binding name `" + bindName + "` is prohibited, binding ignored");
            continue;
          }
          var namePart = bindName.split(":");
          var anim = namePart[0] == "anim";
          if (anim) bindName = namePart[1];
          bindCode = bindMap[bindName];
          bindVar = "_" + i;
          varName = "__" + bindName;
          if (namePart[0] == "l10n" && namePart[1]) {
            var l10nFullPath = namePart[1];
            var l10nBinding = null;
            var l10nName = l10nFullPath.replace(L10N_BINDING, function(m, name) {
              l10nBinding = name;
              return "";
            });
            if (l10nBinding) {
              if (l10nFullPath in l10nBindings == false) {
                varName = "$l10n_" + l10nBindSeed++;
                l10nBindings[l10nFullPath] = varName;
                l10nCompute.push('set("' + varName + '",' + varName + ")");
                varList.push(varName + '=tools.l10nToken("' + l10nName + '").computeToken()');
                bindCode = bindMap[l10nBinding];
                if (!bindCode) {
                  bindCode = bindMap[l10nBinding] = [];
                  varList.push("__" + l10nBinding);
                }
                bindCode.push(varName + ".set(__" + l10nBinding + ");");
              }
              bindName = l10nBindings[l10nFullPath];
              bindVar = "_" + i;
              varName = "__" + bindName;
              bindCode = bindMap[bindName];
              if (!bindCode) {
                bindCode = bindMap[bindName] = [];
                varList.push(varName);
              }
              if (bindType == TYPE_TEXT) {
                debugList.push("{" + [ 'binding:"' + bindName + '"', "dom:" + domRef, "val:" + bindVar, 'attachment:instance.attaches&&instance.attaches["' + bindName + '"]&&instance.attaches["' + bindName + '"].value' ] + "}");
                varList.push(bindVar + "=" + domRef);
                putBindCode(bindFunctions[bindType], domRef, bindVar, "value");
              } else {
                attrName = '"' + binding[ATTR_NAME] + '"';
                debugList.push("{" + [ 'binding:"' + l10nFullPath + '"', "dom:" + domRef, "attr:" + attrName, "val:" + bindVar, 'attachment:instance.attaches&&instance.attaches["' + bindName + '"]&&instance.attaches["' + bindName + '"].value' ] + "}");
                varList.push(bindVar);
                putBindCode("bind_attr", domRef, attrName, bindVar, buildAttrExpression(binding, false, l10nBindings));
              }
              continue;
            }
            if (!l10nMap) l10nMap = {};
            if (!bindMap[l10nName]) {
              bindMap[l10nName] = [];
              l10nMap[l10nName] = [];
            }
            bindCode = bindMap[l10nName];
            bindCode.l10n = true;
            if (bindType == TYPE_TEXT) {
              debugList.push("{" + [ 'binding:"' + l10nFullPath + '"', "dom:" + domRef, 'val:__l10n["' + l10nName + '"]', 'attachment:l10nToken("' + l10nName + '")' ] + "}");
              toolsUsed.l10nToken = true;
              l10nMap[l10nName].push(domRef + ".nodeValue=value;");
              bindCode.push(domRef + '.nodeValue=__l10n["' + l10nName + '"]' + (l10nBinding ? "[__" + l10nBinding + "]" : "") + ";");
              continue;
            } else {
              l10nMap[l10nName].push("bind_attr(" + [ domRef, '"' + binding[ATTR_NAME] + '"', "NaN", buildAttrExpression(binding, "l10n", l10nBindings) ] + ");");
            }
          }
          if (!bindCode) {
            bindCode = bindMap[bindName] = [];
            varList.push(varName);
          }
          if (bindType != TYPE_ATTRIBUTE) {
            debugList.push("{" + [ 'binding:"' + bindName + '"', "dom:" + domRef, "val:" + (bindCode.nodeBind ? varName : bindVar), "updates:$$" + bindName, 'attachment:instance.attaches&&instance.attaches["' + bindName + '"]&&instance.attaches["' + bindName + '"].value' ] + "}");
            if (!bindCode.nodeBind) {
              varList.push(bindVar + "=" + domRef);
              putBindCode(bindFunctions[bindType], domRef, bindVar, "value");
              bindCode.nodeBind = bindVar;
            } else {
              switch (bindType) {
                case TYPE_ELEMENT:
                  putBindCode(bindFunctions[bindType], domRef, domRef, "value!==null?String(value):null");
                  break;
                case TYPE_TEXT:
                  bindCode.push(domRef + ".nodeValue=value;");
                  break;
              }
            }
          } else {
            var attrName = binding[ATTR_NAME];
            switch (attrName) {
              case "class":
                var defaultExpr = "";
                var valueExpr = "value";
                var prefix = binding[4];
                var bindingLength = binding.length;
                if (bindingLength >= 6) {
                  if (bindingLength == 6 || typeof binding[6] == "string") {
                    if (bindingLength == 6) {
                      valueExpr = 'value?"' + bindName + '":""';
                      if (binding[5]) defaultExpr = prefix + bindName;
                    } else {
                      prefix = "";
                      valueExpr = 'value?"' + binding[6] + '":""';
                      if (binding[5]) defaultExpr = binding[6];
                    }
                  } else {
                    if (!binding[6].length) continue;
                    if (bindingLength == 7) {
                      valueExpr = binding[6].map(function(val) {
                        return 'value=="' + val + '"';
                      }).join("||") + '?value:""';
                      if (binding[5]) defaultExpr = prefix + binding[6][binding[5] - 1];
                    } else {
                      prefix = "";
                      valueExpr = binding[6].map(function(val, idx) {
                        return 'value=="' + val + '"?"' + this[idx] + '"';
                      }, binding[7]).join(":") + ':""';
                      if (binding[5]) defaultExpr = binding[7][binding[5] - 1];
                    }
                  }
                } else {
                  valueExpr = 'typeof value=="string"||typeof value=="number"?value:(value?"' + bindName + '":"")';
                }
                varList.push(bindVar + '="' + defaultExpr + '"');
                putBindCode("bind_attrClass", domRef, bindVar, valueExpr, '"' + prefix + '"', anim);
                break;
              case "style":
                var expr = buildAttrExpression(binding, false, l10nBindings);
                attrExprId = binding[8];
                if (!attrExprMap[attrExprId]) {
                  attrExprMap[attrExprId] = bindVar;
                  varList.push(bindVar + "=" + (binding[7] == "hide" ? '""' : '"none"'));
                }
                if (binding[7]) expr = expr.replace(/\+""$/, "") + (binding[7] == "hide" ? '?"none":""' : '?"":"none"');
                bindVar = attrExprMap[attrExprId];
                putBindCode("bind_attrStyle", domRef, '"' + binding[6] + '"', bindVar, expr);
                break;
              default:
                specialAttr = SPECIAL_ATTR_MAP[attrName];
                attrExprId = binding[7];
                if (!attrExprMap[attrExprId]) {
                  varList.push(bindVar + "=" + buildAttrExpression(binding, "l10n", l10nBindings));
                  attrExprMap[attrExprId] = bindVar;
                }
                bindVar = attrExprMap[attrExprId];
                putBindCode("bind_attr", domRef, '"' + attrName + '"', bindVar, specialAttr && SPECIAL_ATTR_SINGLE[attrName] ? buildAttrExpression(binding, "bool", l10nBindings) + '?"' + attrName + '":""' : buildAttrExpression(binding, false, l10nBindings));
                if (specialAttr && (specialAttr == "*" || specialAttr.indexOf(binding[6].toLowerCase()) != -1)) bindCode.push("if(" + domRef + "." + attrName + "!=" + bindVar + ")" + domRef + "." + attrName + "=" + (SPECIAL_ATTR_SINGLE[attrName] ? "!!" + bindVar : bindVar) + ";");
            }
            debugList.push("{" + [ 'binding:"' + bindName + '"', "dom:" + domRef, 'attr:"' + attrName + '"', "val:" + bindVar, 'attachment:instance.attaches&&instance.attaches["' + bindName + '"]&&instance.attaches["' + bindName + '"].value' ] + "}");
          }
        }
        result.push(";function set(bindName,value){" + 'if(typeof bindName!="string")');
        for (var bindName in bindMap) if (bindMap[bindName].nodeBind) {
          result.push("if(bindName===" + bindMap[bindName].nodeBind + ")" + 'bindName="' + bindName + '";' + "else ");
        }
        result.push("return;");
        result.push("value=resolve.call(instance,bindName,value,Attaches);" + "switch(bindName){");
        for (var bindName in bindMap) {
          if (bindName.indexOf("@") == -1) varList.push("$$" + bindName + "=0");
          result.push('case"' + bindName + '":' + (bindMap[bindName].l10n ? bindMap[bindName].join("") : "if(__" + bindName + "!==value)" + "{" + "$$" + bindName + "++;" + "__" + bindName + "=value;" + bindMap[bindName].join("") + "}") + "break;");
        }
        result.push("}}");
        var toolsVarList = [];
        for (var key in toolsUsed) toolsVarList.push(key + "=tools." + key);
        return {
          debugList: debugList,
          keys: basis.object.keys(bindMap).filter(function(key) {
            return key.indexOf("@") == -1;
          }),
          tools: toolsVarList,
          vars: varList,
          set: result.join(""),
          l10n: l10nMap,
          l10nCompute: l10nCompute
        };
      };
    }();
    function compileFunction(args, body) {
      try {
        return new Function(args, body);
      } catch (e) {
        basis.dev.error("Can't build template function: " + e + "\n", "function(" + args + "){\n" + body + "\n}");
      }
    }
    var getFunctions = function(tokens, debug, uri, source, noTextBug, templateMarker) {
      var fn = tmplFunctions[uri && basis.path.relative(uri)];
      if (fn) return fn;
      var paths = buildPathes(tokens, "_", noTextBug, templateMarker);
      var bindings = buildBindings(paths.binding);
      var objectRefs = paths.markedElementList.join("=");
      var createInstance;
      var fnBody;
      var result = {
        keys: bindings.keys,
        l10nKeys: basis.object.keys(bindings.l10n)
      };
      if (tokens.length == 1) paths.path[0] = "a=_";
      if (!uri) uri = basis.path.baseURI + "inline_template" + inlineSeed++ + ".tmpl";
      if (bindings.l10n) {
        var code = [];
        for (var key in bindings.l10n) code.push('case"' + key + '":' + 'if(value==null)value="{' + key + '}";' + "__l10n[token]=value;" + bindings.l10n[key].join("") + "break;");
        result.createL10nSync = compileFunction([ "_", "__l10n", "bind_attr", "TEXT_BUG" ], (source ? "\n// " + source.split(/\r\n?|\n\r?/).join("\n// ") + "\n\n" : "") + "var " + paths.path + ";" + "return function(token, value){" + "switch(token){" + code.join("") + "}" + "}" + "\n\n//# sourceURL=" + basis.path.origin + uri + "_l10n");
      }
      result.createInstance = compileFunction([ "tid", "map", "proto", "tools", "__l10n", "TEXT_BUG" ], (source ? "\n// " + source.split(/\r\n?|\n\r?/).join("\n// ") + "\n\n" : "") + "var getBindings=tools.createBindingFunction([" + bindings.keys.map(function(key) {
        return '"' + key + '"';
      }) + "])," + (bindings.tools.length ? bindings.tools + "," : "") + "Attaches=function(){};" + "Attaches.prototype={" + bindings.keys.map(function(key) {
        return key + ":null";
      }) + "};" + "return function createInstance_(id,obj,onAction,onRebuild,bindings,bindingInterface){" + "var _=proto.cloneNode(true)," + paths.path.concat(bindings.vars) + "," + "instance={" + "context:obj," + "action:onAction," + "rebuild:onRebuild," + (debug ? "debug:function debug(){return[" + bindings.debugList + "]}," : "") + "handler:null," + "bindings:bindings," + "bindingInterface:bindingInterface," + "attaches:null," + "tmpl:{" + [ paths.ref, "templateId_:id", "set:set" ] + "}" + "}" + (objectRefs ? ";if(obj||onAction)" + objectRefs + "=(id<<12)|tid" : "") + bindings.set + ";if(bindings)instance.handler=getBindings(bindings,obj,set,bindingInterface)" + ";" + bindings.l10nCompute + ";return instance" + "}" + "\n\n//# sourceURL=" + basis.path.origin + uri);
      return result;
    };
    module.exports = {
      getFunctions: getFunctions
    };
  },
  "a.js": function(exports, module, basis, global, __filename, __dirname, require, resource) {
    basis.require("./3.js");
    basis.require("./8.js");
    basis.require("./b.js");
    basis.require("./c.js");
    var namespace = this.path;
    var document = global.document;
    var cleaner = basis.cleaner;
    var Event = basis.dom.event;
    var addGlobalHandler = Event.addGlobalHandler;
    var removeGlobalHandler = Event.removeGlobalHandler;
    var Emitter = basis.event.Emitter;
    var createEvent = basis.event.create;
    var getComputedStyle = basis.dom.computedStyle.get;
    var getOffsetParent = basis.layout.getOffsetParent;
    var getBoundingRect = basis.layout.getBoundingRect;
    var getViewportRect = basis.layout.getViewportRect;
    var SELECTSTART_SUPPORTED = Event.getEventInfo("selectstart").supported;
    var dragging;
    var dragElement;
    var dragData;
    function resolveElement(value) {
      return typeof value == "string" ? document.getElementById(value) : value;
    }
    function startDrag(event) {
      if (dragElement || this.ignoreTarget(event.sender, event)) return;
      var viewport = getViewportRect(event.sender);
      if (event.mouseX < viewport.left || event.mouseX > viewport.right || event.mouseY < viewport.top || event.mouseY > viewport.bottom) return;
      dragElement = this;
      dragData = {
        initX: event.mouseX,
        initY: event.mouseY,
        deltaX: 0,
        minDeltaX: -Infinity,
        maxDeltaX: Infinity,
        deltaY: 0,
        minDeltaY: -Infinity,
        maxDeltaY: Infinity
      };
      addGlobalHandler("mousemove", onDrag);
      addGlobalHandler("mouseup", stopDrag);
      addGlobalHandler("mousedown", stopDrag);
      if (SELECTSTART_SUPPORTED) addGlobalHandler("selectstart", Event.kill);
      event.preventDefault();
      this.prepareDrag(dragData, event);
    }
    function onDrag(event) {
      var deltaX = event.mouseX - dragData.initX;
      var deltaY = event.mouseY - dragData.initY;
      if (!dragging) {
        if (!dragElement.startRule(deltaX, deltaY)) return;
        dragging = true;
        dragElement.emit_start(dragData, event);
      }
      if (dragElement.axisX) dragData.deltaX = dragElement.axisXproxy(basis.number.fit(deltaX, dragData.minDeltaX, dragData.maxDeltaX));
      if (dragElement.axisY) dragData.deltaY = dragElement.axisYproxy(basis.number.fit(deltaY, dragData.minDeltaY, dragData.maxDeltaY));
      dragElement.emit_drag(dragData, event);
    }
    function stopDrag(event) {
      removeGlobalHandler("mousemove", onDrag);
      removeGlobalHandler("mouseup", stopDrag);
      removeGlobalHandler("mousedown", stopDrag);
      if (SELECTSTART_SUPPORTED) removeGlobalHandler("selectstart", Event.kill);
      var element = dragElement;
      var data = dragData;
      dragElement = null;
      dragData = null;
      if (dragging) {
        dragging = false;
        element.emit_over(data, event);
      }
      event.die();
    }
    var DragDropElement = Emitter.subclass({
      className: namespace + ".DragDropElement",
      element: null,
      trigger: null,
      baseElement: null,
      axisX: true,
      axisY: true,
      axisXproxy: basis.fn.$self,
      axisYproxy: basis.fn.$self,
      prepareDrag: basis.fn.$undef,
      startRule: basis.fn.$true,
      ignoreTarget: function(target, event) {
        return /^(INPUT|TEXTAREA|SELECT|BUTTON)$/.test(target.tagName);
      },
      emit_start: createEvent("start"),
      emit_drag: createEvent("drag"),
      emit_over: createEvent("over"),
      init: function() {
        Emitter.prototype.init.call(this);
        var element = this.element;
        var trigger = this.trigger;
        this.element = null;
        this.trigger = null;
        this.setElement(element, trigger);
        this.setBase(this.baseElement);
        cleaner.add(this);
      },
      setElement: function(element, trigger) {
        this.element = resolveElement(element);
        trigger = resolveElement(trigger) || this.element;
        if (this.trigger !== trigger) {
          if (this.trigger) Event.removeHandler(this.trigger, "mousedown", startDrag, this);
          this.trigger = trigger;
          if (this.trigger) Event.addHandler(this.trigger, "mousedown", startDrag, this);
        }
      },
      setBase: function(baseElement) {
        this.baseElement = resolveElement(baseElement);
      },
      getBase: function() {
        return this.baseElement || (document.compatMode == "CSS1Compat" ? document.documentElement : document.body);
      },
      isDragging: function() {
        return dragElement === this;
      },
      start: function(event) {
        if (!this.isDragging()) startDrag.call(this, event);
      },
      stop: function() {
        if (this.isDragging()) stopDrag();
      },
      destroy: function() {
        this.stop();
        cleaner.remove(this);
        Emitter.prototype.destroy.call(this);
        this.setElement();
        this.setBase();
      }
    });
    var DeltaWriter = basis.Class(null, {
      className: namespace + ".DeltaWriter",
      property: null,
      invert: false,
      format: basis.fn.$self,
      init: function(element) {
        if (typeof this.property == "function") this.property = this.property(element);
        if (typeof this.invert == "function") this.invert = this.invert(this.property);
        this.value = this.read(element);
      },
      read: function() {
        return element[this.property];
      },
      write: function(element, formattedValue) {
        element[this.property] = formattedValue;
      },
      applyDelta: function(element, delta) {
        if (this.invert) delta = -delta;
        this.write(element, this.format(this.value + delta, delta));
      }
    });
    var StyleDeltaWriter = DeltaWriter.subclass({
      className: namespace + ".StyleDeltaWriter",
      format: function(value, delta) {
        return value + "px";
      },
      read: function(element) {
        return parseFloat(getComputedStyle(element, this.property)) || 0;
      },
      write: function(element, formattedValue) {
        element.style[this.property] = formattedValue;
      }
    });
    var StylePositionX = StyleDeltaWriter.subclass({
      property: function(element) {
        return getComputedStyle(element, "left") == "auto" && getComputedStyle(element, "right") != "auto" ? "right" : "left";
      },
      invert: function(property) {
        return property == "right";
      }
    });
    var StylePositionY = StyleDeltaWriter.subclass({
      property: function(element) {
        return getComputedStyle(element, "top") == "auto" && getComputedStyle(element, "bottom") != "auto" ? "bottom" : "top";
      },
      invert: function(property) {
        return property == "bottom";
      }
    });
    var MoveableElement = DragDropElement.subclass({
      className: namespace + ".MoveableElement",
      fixTop: true,
      fixRight: true,
      fixBottom: true,
      fixLeft: true,
      axisX: StylePositionX,
      axisY: StylePositionY,
      emit_start: function(dragData, event) {
        var element = this.element;
        if (element) {
          var viewport = getViewportRect(this.getBase());
          var box = getBoundingRect(element);
          dragData.element = element;
          if (this.axisX) {
            dragData.axisX = new this.axisX(element);
            if (this.fixLeft) dragData.minDeltaX = viewport.left - box.left;
            if (this.fixRight) dragData.maxDeltaX = viewport.right - box.right;
          }
          if (this.axisY) {
            dragData.axisY = new this.axisY(element);
            if (this.fixTop) dragData.minDeltaY = viewport.top - box.top;
            if (this.fixBottom) dragData.maxDeltaY = viewport.bottom - box.bottom;
          }
        }
        DragDropElement.prototype.emit_start.call(this, dragData, event);
      },
      emit_drag: function(dragData, event) {
        if (!dragData.element) return;
        if (dragData.axisX) dragData.axisX.applyDelta(dragData.element, dragData.deltaX);
        if (dragData.axisY) dragData.axisY.applyDelta(dragData.element, dragData.deltaY);
        DragDropElement.prototype.emit_drag.call(this, dragData, event);
      }
    });
    module.exports = {
      DragDropElement: DragDropElement,
      MoveableElement: MoveableElement,
      DeltaWriter: DeltaWriter,
      StyleDeltaWriter: StyleDeltaWriter
    };
  },
  "b.js": function(exports, module, basis, global, __filename, __dirname, require, resource) {
    var document = global.document;
    var computedStyle;
    if ("getComputedStyle" in global) {
      var GETCOMPUTEDSTYLE_BUGGY = {
        top: true,
        bottom: true,
        left: true,
        right: true,
        height: true,
        width: true
      };
      var testForBuggyProperties = basis.fn.runOnce(function() {
        var testElement = document.createElement("div");
        testElement.setAttribute("style", "position:absolute;top:auto!important");
        basis.doc.body.add(testElement);
        if (global.getComputedStyle(testElement).top == "auto") GETCOMPUTEDSTYLE_BUGGY = {};
        basis.doc.remove(testElement);
      });
      computedStyle = function(element, styleProp) {
        var style = global.getComputedStyle(element);
        var res;
        if (style) {
          if (styleProp in GETCOMPUTEDSTYLE_BUGGY) testForBuggyProperties();
          if (GETCOMPUTEDSTYLE_BUGGY[styleProp] && style.position != "static") {
            var display = element.style.display;
            element.style.display = "none";
            res = style.getPropertyValue(styleProp);
            element.style.display = display;
          } else {
            res = style.getPropertyValue(styleProp);
          }
          return res;
        }
      };
    } else {
      var VALUE_UNIT = /^-?(\d*\.)?\d+([a-z]+|%)?$/i;
      var IS_PIXEL = /\dpx$/i;
      var getPixelValue = function(element, value) {
        if (IS_PIXEL.test(value)) return parseInt(value, 10) + "px";
        var style = element.style;
        var runtimeStyle = element.runtimeStyle;
        var left = style.left;
        var runtimeLeft = runtimeStyle.left;
        runtimeStyle.left = element.currentStyle.left;
        style.left = value || 0;
        value = style.pixelLeft;
        style.left = left;
        runtimeStyle.left = runtimeLeft;
        return value + "px";
      };
      computedStyle = function(element, styleProp) {
        var style = element.currentStyle;
        if (style) {
          var value = style[styleProp == "float" ? "styleFloat" : basis.string.camelize(styleProp)];
          var unit = (value || "").match(VALUE_UNIT);
          if (unit && unit[2] && unit[2] != "px") value = getPixelValue(element, value);
          return value;
        }
      };
    }
    module.exports = {
      get: computedStyle
    };
  },
  "c.js": function(exports, module, basis, global, __filename, __dirname, require, resource) {
    basis.require("./b.js");
    var namespace = this.path;
    var document = global.document;
    var documentElement = document.documentElement;
    var computedStyle = basis.dom.computedStyle.get;
    function getOffsetParent(node) {
      var offsetParent = node.offsetParent || documentElement;
      while (offsetParent && offsetParent !== documentElement && computedStyle(offsetParent, "position") == "static") offsetParent = offsetParent.offsetParent;
      return offsetParent || documentElement;
    }
    function getOffset(element) {
      var top = 0;
      var left = 0;
      if (element && element.getBoundingClientRect) {
        var relRect = element.getBoundingClientRect();
        left = -relRect.left;
        top = -relRect.top;
      } else {
        if (document.compatMode == "CSS1Compat") {
          top = global.pageYOffset || documentElement.scrollTop;
          left = global.pageXOffset || documentElement.scrollLeft;
        } else {
          var body = document.body;
          if (element !== body) {
            top = body.scrollTop - body.clientTop;
            left = body.scrollLeft - body.clientLeft;
          }
        }
      }
      return {
        x: left,
        y: top
      };
    }
    function getTopLeftPoint(element, relElement) {
      var left = 0;
      var top = 0;
      if (element && element.getBoundingClientRect) {
        var box = element.getBoundingClientRect();
        var offset = getOffset(relElement);
        top = box.top + offset.y;
        left = box.left + offset.x;
      }
      return {
        top: top,
        left: left
      };
    }
    function getBoundingRect(element, relElement) {
      var top = 0;
      var left = 0;
      var right = 0;
      var bottom = 0;
      if (element && element.getBoundingClientRect) {
        var rect = element.getBoundingClientRect();
        var offset = getOffset(relElement);
        top = rect.top + offset.y;
        left = rect.left + offset.x;
        right = rect.right + offset.x;
        bottom = rect.bottom + offset.y;
      }
      return {
        top: top,
        left: left,
        right: right,
        bottom: bottom,
        width: right - left,
        height: bottom - top
      };
    }
    function getViewportRect(element, relElement) {
      var point = getTopLeftPoint(element, relElement);
      var top = point.top + element.clientTop;
      var left = point.left + element.clientLeft;
      var width = element.clientWidth;
      var height = element.clientHeight;
      return {
        top: top,
        left: left,
        bottom: top + height,
        right: left + width,
        width: width,
        height: height
      };
    }
    module.exports = {
      getOffsetParent: getOffsetParent,
      getTopLeftPoint: getTopLeftPoint,
      getBoundingRect: getBoundingRect,
      getViewportRect: getViewportRect
    };
  },
  "1.js": function(exports, module, basis, global, __filename, __dirname, require, resource) {
    basis.require("./2.js");
    basis.require("./4.js");
    basis.require("./5.js");
    basis.require("./6.js");
    basis.require("./7.js");
    var namespace = this.path;
    var document = global.document;
    var Class = basis.Class;
    var createEvent = basis.event.create;
    var HtmlTemplate = basis.template.html.Template;
    var htmlTemplateIdMarker = basis.template.html.marker;
    var TemplateSwitcher = basis.template.TemplateSwitcher;
    var DWNode = basis.dom.wrapper.Node;
    var DWPartitionNode = basis.dom.wrapper.PartitionNode;
    var DWGroupingNode = basis.dom.wrapper.GroupingNode;
    var instances = {};
    var notifier = new basis.Token;
    var bindingSeed = 1;
    var unknownEventBindingCheck = {};
    function extendBinding(binding, extension) {
      binding.bindingId = bindingSeed++;
      for (var key in extension) {
        var def = null;
        var value = extension[key];
        if (Node && value instanceof Node || basis.resource.isResource(value)) {
          def = {
            events: "satelliteChanged",
            getter: function(key, satellite) {
              var resource = typeof satellite == "function" ? satellite : null;
              var init = function(node) {
                init = false;
                if (resource) {
                  satellite = resource();
                  if (satellite instanceof Node == false) return;
                  resource = null;
                }
                node.setSatellite(key, satellite);
                if (node.satellite[key] !== satellite) basis.dev.warn("basis.ui.binding: implicit satellite `" + key + "` attach to owner failed");
              };
              return function(node) {
                if (init) init(node);
                return resource || (node.satellite[key] ? node.satellite[key].element : null);
              };
            }(key, value)
          };
        } else {
          if (value) {
            if (typeof value == "string") value = BINDING_PRESET.process(key, value); else if (value.bindingBridge) value = basis.fn.$const(value);
            if (typeof value != "object") {
              def = {
                getter: typeof value == "function" ? value : basis.getter(value)
              };
            } else if (Array.isArray(value)) {
              def = {
                events: value[0],
                getter: basis.getter(value[1])
              };
            } else {
              def = {
                events: value.events,
                getter: basis.getter(value.getter)
              };
            }
          }
        }
        binding[key] = def;
      }
    }
    var BINDING_PRESET = function() {
      var presets = {};
      var prefixRegExp = /^([a-z_][a-z0-9_]*):(.*)/i;
      return {
        add: function(prefix, func) {
          if (!presets[prefix]) {
            presets[prefix] = func;
          } else {
            basis.dev.warn("Preset `" + prefix + "` already exists, new definition ignored");
          }
        },
        process: function(key, value) {
          var preset;
          var m = value.match(prefixRegExp);
          if (m) {
            preset = presets[m[1]];
            value = m[2] || key;
          }
          return preset ? preset(value) : value;
        }
      };
    }();
    BINDING_PRESET.add("data", function(path) {
      return {
        events: "update",
        getter: "data." + path
      };
    });
    BINDING_PRESET.add("satellite", function(satelliteName) {
      return {
        events: "satelliteChanged",
        getter: function(node) {
          return node.satellite[satelliteName] ? node.satellite[satelliteName].element : null;
        }
      };
    });
    var TEMPLATE_BINDING = Class.customExtendProperty({
      state: {
        events: "stateChanged",
        getter: function(node) {
          return String(node.state);
        }
      },
      childNodesState: {
        events: "childNodesStateChanged",
        getter: function(node) {
          return String(node.childNodesState);
        }
      },
      childCount: {
        events: "childNodesModified",
        getter: function(node) {
          return node.childNodes ? node.childNodes.length : 0;
        }
      },
      hasChildren: {
        events: "childNodesModified",
        getter: function(node) {
          return !!node.firstChild;
        }
      },
      empty: {
        events: "childNodesModified",
        getter: function(node) {
          return !node.firstChild;
        }
      }
    }, extendBinding);
    var BINDING_TEMPLATE_INTERFACE = {
      attach: function(object, handler, context) {
        object.addHandler(handler, context);
      },
      detach: function(object, handler, context) {
        object.removeHandler(handler, context);
      }
    };
    var TEMPLATE_ACTION = Class.extensibleProperty({
      select: function(event) {
        if (this.isDisabled()) return;
        if (this.contextSelection && this.contextSelection.multiple) this.select(event.ctrlKey || event.metaKey); else this.select();
      }
    });
    var TEMPLATE_SWITCHER_HANDLER = {
      "*": function(event) {
        var switcher = this.templateSwitcher_;
        if (switcher && switcher.ruleEvents && switcher.ruleEvents[event.type]) this.setTemplate(switcher.resolve(this));
      }
    };
    var TEMPLATE = new HtmlTemplate("<div/>");
    var fragments = [];
    function getDocumentFragment() {
      return fragments.pop() || document.createDocumentFragment();
    }
    function reinsertPartitionNodes(partition) {
      var nodes = partition.nodes;
      if (nodes) for (var i = nodes.length - 1, child; child = nodes[i]; i--) child.parentNode.insertBefore(child, child.nextSibling);
    }
    var focusTimer;
    var TemplateMixin = function(super_) {
      return {
        template: TEMPLATE,
        emit_templateChanged: createEvent("templateChanged"),
        templateSwitcher_: null,
        binding: TEMPLATE_BINDING,
        action: TEMPLATE_ACTION,
        tmpl: null,
        element: null,
        childNodesElement: null,
        init: function() {
          this.element = this.childNodesElement = getDocumentFragment();
          super_.init.call(this);
        },
        postInit: function() {
          super_.postInit.call(this);
          var template = this.template;
          if (template) {
            var nodeDocumentFragment = this.element;
            var bindingId = this.constructor.basisClassId_ + "_" + this.binding.bindingId;
            if (bindingId in unknownEventBindingCheck == false) {
              unknownEventBindingCheck[bindingId] = true;
              for (var bindName in this.binding) {
                var events = this.binding[bindName] && this.binding[bindName].events;
                if (events) {
                  events = String(events).trim().split(/\s+|\s*,\s*/);
                  for (var i = 0, eventName; eventName = events[i]; i++) if ("emit_" + eventName in this == false) basis.dev.warn("basis.ui: binding `" + bindName + "` has unknown event `" + eventName + "` for " + this.constructor.className);
                }
              }
            }
            this.template = null;
            this.setTemplate(template);
            fragments.push(nodeDocumentFragment);
            if (this.container) {
              this.container.appendChild(this.element);
              this.container = null;
            }
          }
          instances[this.basisObjectId] = this;
          notifier.set({
            action: "create",
            instance: this
          });
        },
        templateSync: function() {
          var oldElement = this.element;
          var oldTmpl = this.tmpl;
          var tmpl = this.template.createInstance(this, this.templateAction, this.templateSync, this.binding, BINDING_TEMPLATE_INTERFACE);
          var noChildNodesElement;
          if (tmpl.childNodesHere) {
            tmpl.childNodesElement = tmpl.childNodesHere.parentNode;
            tmpl.childNodesElement.insertPoint = tmpl.childNodesHere;
          }
          this.tmpl = tmpl;
          this.element = tmpl.element;
          this.childNodesElement = tmpl.childNodesElement || tmpl.element;
          noChildNodesElement = this.childNodesElement.nodeType != 1;
          if (noChildNodesElement) this.childNodesElement = document.createDocumentFragment();
          if (noChildNodesElement) this.noChildNodesElement_ = true; else delete this.noChildNodesElement_;
          if (this.grouping) {
            this.grouping.syncDomRefs();
            var cursor = this;
            while (cursor.grouping) cursor = cursor.grouping;
            var topGrouping = cursor;
            for (var groupNode = topGrouping.lastChild; groupNode; groupNode = groupNode.previousSibling) {
              if (groupNode instanceof PartitionNode) topGrouping.insertBefore(groupNode, groupNode.nextSibling); else reinsertPartitionNodes(groupNode);
            }
            reinsertPartitionNodes(topGrouping.nullGroup);
          } else {
            for (var child = this.lastChild; child; child = child.previousSibling) this.insertBefore(child, child.nextSibling);
          }
          if (this instanceof PartitionNode) reinsertPartitionNodes(this);
          if (oldElement && oldElement !== this.element && oldElement.nodeType != 11) {
            var parentNode = oldElement && oldElement.parentNode;
            if (parentNode) {
              if (this.owner && this.owner.tmpl) this.owner.tmpl.set(oldElement, this.element);
              if (this.element.parentNode !== parentNode) parentNode.replaceChild(this.element, oldElement);
            }
          }
          if (oldTmpl) this.emit_templateChanged();
        },
        setTemplate: function(template) {
          var curSwitcher = this.templateSwitcher_;
          var switcher;
          if (template instanceof TemplateSwitcher) {
            switcher = template;
            template = switcher.resolve(this);
          }
          if (template instanceof HtmlTemplate == false) template = null;
          if (!template) {
            basis.dev.warn("basis.ui.Node#setTemplate: set null to template possible only on node destroy");
            return;
          }
          if (switcher) {
            this.templateSwitcher_ = switcher;
            if (!curSwitcher) this.addHandler(TEMPLATE_SWITCHER_HANDLER, this);
          }
          if (curSwitcher && curSwitcher.resolve(this) !== template) {
            this.templateSwitcher_ = null;
            this.removeHandler(TEMPLATE_SWITCHER_HANDLER, this);
          }
          var oldTmpl = this.tmpl;
          var oldTemplate = this.template;
          if (oldTemplate !== template) {
            this.template = template;
            this.templateSync();
            if (oldTemplate) oldTemplate.clearInstance(oldTmpl);
          }
        },
        updateBind: function(bindName) {
          var binding = this.binding[bindName];
          var getter = binding && binding.getter;
          if (getter && this.tmpl) this.tmpl.set(bindName, getter(this));
        },
        templateAction: function(actionName, event) {
          var action = this.action[actionName];
          if (action) action.call(this, event);
          if (!action) basis.dev.warn("template call `" + actionName + "` action, but it isn't defined in action list");
        },
        focus: function(select) {
          var focusElement = this.tmpl ? this.tmpl.focus || this.element : null;
          if (focusElement) {
            if (focusTimer) focusTimer = basis.clearImmediate(focusTimer);
            focusTimer = basis.setImmediate(function() {
              try {
                focusElement.focus();
                if (select) focusElement.select();
              } catch (e) {}
            });
          }
        },
        blur: function() {
          var focusElement = this.tmpl ? this.tmpl.focus || this.element : null;
          if (focusElement) try {
            focusElement.blur();
          } catch (e) {}
        },
        destroy: function() {
          delete instances[this.basisObjectId];
          notifier.set({
            action: "destroy",
            instance: this
          });
          var template = this.template;
          var element = this.element;
          if (this.templateSwitcher_) {
            this.templateSwitcher_ = null;
            this.removeHandler(TEMPLATE_SWITCHER_HANDLER, this);
          }
          template.clearInstance(this.tmpl);
          super_.destroy.call(this);
          this.tmpl = null;
          this.element = null;
          this.childNodesElement = null;
          var parentNode = element && element.parentNode;
          if (parentNode && parentNode.nodeType == 1) parentNode.removeChild(element);
        }
      };
    };
    var ContainerTemplateMixin = function(super_) {
      return {
        insertBefore: function(newChild, refChild) {
          if (this.noChildNodesElement_) {
            delete this.noChildNodesElement_;
            basis.dev.warn("basis.ui: Template has no childNodesElement container, but insertBefore method called; probably it's a bug");
          }
          newChild = super_.insertBefore.call(this, newChild, refChild);
          var target = newChild.groupNode || this;
          var container = target.childNodesElement || this.childNodesElement;
          var nextSibling = newChild.nextSibling;
          var insertPoint = nextSibling && nextSibling.element.parentNode == container ? nextSibling.element : null;
          var childElement = newChild.element;
          var refNode = insertPoint || container.insertPoint || null;
          if (childElement.parentNode !== container || childElement.nextSibling !== refNode) container.insertBefore(childElement, refNode);
          return newChild;
        },
        removeChild: function(oldChild) {
          super_.removeChild.call(this, oldChild);
          var element = oldChild.element;
          var parent = element.parentNode;
          if (parent) parent.removeChild(element);
          return oldChild;
        },
        clear: function(alive) {
          if (alive) {
            var node = this.firstChild;
            while (node) {
              var element = node.element;
              var parent = element.parentNode;
              if (parent) parent.removeChild(element);
              node = node.nextSibling;
            }
          }
          super_.clear.call(this, alive);
        },
        setChildNodes: function(childNodes, keepAlive) {
          if (this.noChildNodesElement_) {
            delete this.noChildNodesElement_;
            basis.dev.warn("basis.ui: Template has no childNodesElement container, but setChildNodes method called; probably it's a bug");
          }
          var domFragment = document.createDocumentFragment();
          var target = this.grouping || this;
          var container = target.childNodesElement;
          target.childNodesElement = domFragment;
          super_.setChildNodes.call(this, childNodes, keepAlive);
          container.insertBefore(domFragment, container.insertPoint || null);
          target.childNodesElement = container;
        }
      };
    };
    var PartitionNode = Class(DWPartitionNode, TemplateMixin, {
      className: namespace + ".PartitionNode",
      binding: {
        title: "data:"
      }
    });
    var GroupingNode = Class(DWGroupingNode, ContainerTemplateMixin, {
      className: namespace + ".GroupingNode",
      childClass: PartitionNode,
      groupingClass: Class.SELF,
      element: null,
      childNodesElement: null,
      emit_ownerChanged: function(oldOwner) {
        this.syncDomRefs();
        DWGroupingNode.prototype.emit_ownerChanged.call(this, oldOwner);
      },
      init: function() {
        this.element = this.childNodesElement = document.createDocumentFragment();
        DWGroupingNode.prototype.init.call(this);
        instances[this.basisObjectId] = this;
        notifier.set({
          action: "create",
          instance: this
        });
      },
      syncDomRefs: function() {
        var cursor = this;
        var owner = this.owner;
        var element = null;
        if (owner) element = owner.tmpl && owner.tmpl.groupsElement || owner.childNodesElement;
        do {
          cursor.element = cursor.childNodesElement = element;
        } while (cursor = cursor.grouping);
      },
      destroy: function() {
        delete instances[this.basisObjectId];
        notifier.set({
          action: "destroy",
          instance: this
        });
        DWGroupingNode.prototype.destroy.call(this);
        this.element = null;
        this.childNodesElement = null;
      }
    });
    var Node = Class(DWNode, TemplateMixin, ContainerTemplateMixin, {
      className: namespace + ".Node",
      binding: {
        selected: {
          events: "select unselect",
          getter: function(node) {
            return node.selected;
          }
        },
        unselected: {
          events: "select unselect",
          getter: function(node) {
            return !node.selected;
          }
        },
        disabled: {
          events: "disable enable",
          getter: function(node) {
            return node.isDisabled();
          }
        },
        enabled: {
          events: "disable enable",
          getter: function(node) {
            return !node.isDisabled();
          }
        }
      },
      childClass: Class.SELF,
      childFactory: function(config) {
        return new this.childClass(config);
      },
      groupingClass: GroupingNode
    });
    var ShadowNodeList = Node.subclass({
      className: namespace + ".ShadowNodeList",
      emit_ownerChanged: function(oldOwner) {
        Node.prototype.emit_ownerChanged.call(this, oldOwner);
        this.setDataSource(this.owner && this.owner.getChildNodesDataset());
      },
      getChildNodesElement: function(owner) {
        return owner.childNodesElement;
      },
      listen: {
        owner: {
          templateChanged: function() {
            this.childNodes.forEach(function(child) {
              this.appendChild(child.element);
            }, this.getChildNodesElement(this.owner) || this.owner.element);
          }
        }
      },
      childClass: {
        className: namespace + ".ShadowNode",
        getElement: function(node) {
          return node.element;
        },
        templateSync: function() {
          Node.prototype.templateSync.call(this);
          var newElement = this.getElement(this.delegate);
          if (newElement) {
            newElement[htmlTemplateIdMarker] = this.delegate.element[htmlTemplateIdMarker];
            this.element = newElement;
          }
        },
        listen: {
          delegate: {
            templateChanged: function() {
              var oldElement = this.element;
              var oldElementParent = oldElement.parentNode;
              var newElement = this.getElement(this.delegate);
              if (newElement) newElement[htmlTemplateIdMarker] = this.delegate.element[htmlTemplateIdMarker];
              this.element = newElement || this.tmpl.element;
              if (oldElementParent) oldElementParent.replaceChild(this.element, oldElement);
            }
          }
        }
      }
    });
    module.exports = {
      debug_notifier: notifier,
      debug_getInstances: function() {
        return basis.object.values(instances);
      },
      BINDING_PRESET: BINDING_PRESET,
      Node: Node,
      PartitionNode: PartitionNode,
      GroupingNode: GroupingNode,
      ShadowNodeList: ShadowNodeList,
      ShadowNode: ShadowNodeList.prototype.childClass
    };
  },
  "e.js": function(exports, module, basis, global, __filename, __dirname, require, resource) {
    basis.require("./3.js");
    basis.require("./4.js");
    var namespace = this.path;
    var getter = basis.getter;
    var cleaner = basis.cleaner;
    var Emitter = basis.event.Emitter;
    var AbstractData = basis.data.AbstractData;
    var Value = basis.data.Value;
    var STATE = basis.data.STATE;
    var Property = Value.subclass({
      className: namespace + ".Property",
      extendConstructor_: false,
      init: function(initValue, handler, proxy) {
        this.value = initValue;
        this.handler = handler;
        this.proxy = proxy;
        Value.prototype.init.call(this);
      }
    });
    var OBJECTSET_STATE_PRIORITY = STATE.priority;
    var OBJECTSET_HANDLER = {
      stateChanged: function() {
        this.fire(false, true);
      },
      update: function() {
        this.fire(true);
      },
      change: function() {
        this.fire(true);
      },
      destroy: function(object) {
        this.remove(object);
      }
    };
    var ObjectSet = Value.subclass({
      className: namespace + ".ObjectSet",
      objects: null,
      value: 0,
      valueChanged_: false,
      calculateValue: function() {
        return this.value + 1;
      },
      calculateOnInit: false,
      statePriority: OBJECTSET_STATE_PRIORITY,
      stateChanged_: true,
      timer_: false,
      init: function() {
        Value.prototype.init.call(this);
        var objects = this.objects;
        this.objects = [];
        if (objects && Array.isArray(objects)) {
          this.lock();
          this.add.apply(this, objects);
          this.unlock();
        }
        this.valueChanged_ = this.stateChanged_ = !!this.calculateOnInit;
        this.update();
      },
      add: function() {
        for (var i = 0, len = arguments.length; i < len; i++) {
          var object = arguments[i];
          if (object instanceof AbstractData) {
            if (basis.array.add(this.objects, object)) object.addHandler(OBJECTSET_HANDLER, this);
          } else throw this.constructor.className + "#add: Instance of AbstractData required";
        }
        this.fire(true, true);
      },
      remove: function(object) {
        if (basis.array.remove(this.objects, object)) object.removeHandler(OBJECTSET_HANDLER, this);
        this.fire(true, true);
      },
      clear: function() {
        for (var i = 0, object; object = this.objects[i]; i++) object.removeHandler(OBJECTSET_HANDLER, this);
        this.objects.length = 0;
        this.fire(true, true);
      },
      fire: function(valueChanged, stateChanged) {
        if (!this.locked) {
          this.valueChanged_ = this.valueChanged_ || !!valueChanged;
          this.stateChanged_ = this.stateChanged_ || !!stateChanged;
          if (!this.timer_ && (this.valueChanged_ || this.stateChanged_)) this.timer_ = basis.setImmediate(this.update.bind(this));
        }
      },
      lock: function() {
        this.locked = true;
      },
      unlock: function() {
        this.locked = false;
      },
      update: function() {
        var valueChanged = this.valueChanged_;
        var stateChanged = this.stateChanged_;
        this.valueChanged_ = false;
        this.stateChanged_ = false;
        this.timer_ = basis.clearImmediate(this.timer_);
        if (!cleaner.globalDestroy) {
          if (valueChanged) this.set(this.calculateValue());
          if (stateChanged) {
            var len = this.objects.length;
            if (!len) this.setState(STATE.UNDEFINED); else {
              var maxWeight = -2;
              var curObject;
              for (var i = 0; i < len; i++) {
                var object = this.objects[i];
                var weight = this.statePriority.indexOf(String(object.state));
                if (weight > maxWeight) {
                  curObject = object;
                  maxWeight = weight;
                }
              }
              if (curObject) this.setState(curObject.state, curObject.state.data);
            }
          }
        }
      },
      destroy: function() {
        this.lock();
        this.clear();
        if (this.timer_) basis.clearImmediate(this.timer_);
        Value.prototype.destroy.call(this);
      }
    });
    var Expression = Property.subclass({
      className: namespace + ".Expression",
      init: function(args, calc) {
        Value.prototype.init.call(this);
        var args = basis.array(arguments);
        var calc = args.pop();
        if (typeof calc != "function") {
          basis.dev.warn(this.constructor.className + ": last argument of constructor must be a function");
          calc = basis.fn.$undef;
        }
        if (args.length == 1) {
          args[0].link(this, function(value) {
            this.set(calc.call(this, value));
          });
        }
        if (args.length > 1) {
          var changeWatcher = new ObjectSet({
            objects: args,
            calculateOnInit: true,
            calculateValue: function() {
              return calc.apply(this, args.map(function(item) {
                return item.value;
              }));
            }
          });
          changeWatcher.link(this, this.set);
          this.addHandler({
            destroy: function() {
              if (!cleaner.globalDestroy) changeWatcher.destroy();
            }
          });
        }
      }
    });
    module.exports = {
      Property: Property,
      ObjectSet: ObjectSet,
      Expression: Expression
    };
  },
  "f.js": function(exports, module, basis, global, __filename, __dirname, require, resource) {
    basis.require("./4.js");
    basis.require("./d.js");
    basis.require("./e.js");
    var namespace = this.path;
    var Class = basis.Class;
    var DataObject = basis.data.Object;
    var KeyObjectMap = basis.data.KeyObjectMap;
    var ReadOnlyDataset = basis.data.ReadOnlyDataset;
    var DatasetWrapper = basis.data.DatasetWrapper;
    var Value = basis.data.Value;
    var MapFilter = basis.data.dataset.MapFilter;
    function binarySearchPos(array, value) {
      if (!array.length) return 0;
      var pos;
      var cmpValue;
      var l = 0;
      var r = array.length - 1;
      do {
        pos = l + r >> 1;
        cmpValue = array[pos] || 0;
        if (value < cmpValue) r = pos - 1; else if (value > cmpValue) l = pos + 1; else return value == cmpValue ? pos : 0;
      } while (l <= r);
      return pos + (cmpValue < value);
    }
    var Index = Class(Value, {
      className: namespace + ".Index",
      autoDestroy: true,
      indexCache_: null,
      valueGetter: basis.fn.$null,
      updateEvents: {},
      value: 0,
      setNullOnEmitterDestroy: false,
      init: function() {
        this.indexCache_ = {};
        Value.prototype.init.call(this);
      },
      add_: function(value) {},
      remove_: function(value) {},
      update_: function(newValue, oldValue) {},
      normalize: function(value) {
        return Number(value) || 0;
      },
      destroy: function() {
        Value.prototype.destroy.call(this);
        this.indexCache_ = null;
      }
    });
    var Sum = Class(Index, {
      className: namespace + ".Sum",
      add_: function(value) {
        this.value += value;
      },
      remove_: function(value) {
        this.value -= value;
      },
      update_: function(newValue, oldValue) {
        this.set(this.value - oldValue + newValue);
      }
    });
    var Count = Class(Index, {
      className: namespace + ".Count",
      valueGetter: basis.fn.$true,
      add_: function(value) {
        this.value += value;
      },
      remove_: function(value) {
        this.value -= value;
      },
      normalize: function(value) {
        return !!value;
      },
      update_: function(newValue, oldValue) {
        this.set(this.value - !!oldValue + !!newValue);
      }
    });
    var Avg = Class(Index, {
      className: namespace + ".Avg",
      sum_: 0,
      count_: 0,
      add_: function(value) {
        this.sum_ += value;
        this.count_ += 1;
        this.value = this.sum_ / this.count_;
      },
      remove_: function(value) {
        this.sum_ -= value;
        this.count_ -= 1;
        this.value = this.count_ ? this.sum_ / this.count_ : 0;
      },
      update_: function(newValue, oldValue) {
        this.sum_ += newValue - oldValue;
        this.set(this.sum_ / this.count_);
      }
    });
    var VectorIndex = Class(Index, {
      className: namespace + ".VectorIndex",
      vectorGetter: basis.fn.$null,
      vector_: null,
      value: undefined,
      init: function() {
        this.vector_ = [];
        Index.prototype.init.call(this);
      },
      add_: function(value) {
        if (value !== null) {
          this.vector_.splice(binarySearchPos(this.vector_, value), 0, value);
          this.value = this.vectorGetter(this.vector_);
        }
      },
      remove_: function(value) {
        if (value !== null) {
          this.vector_.splice(binarySearchPos(this.vector_, value), 1);
          this.value = this.vectorGetter(this.vector_);
        }
      },
      update_: function(newValue, oldValue) {
        if (oldValue !== null) this.vector_.splice(binarySearchPos(this.vector_, oldValue), 1);
        if (newValue !== null) this.vector_.splice(binarySearchPos(this.vector_, newValue), 0, newValue);
        this.set(this.vectorGetter(this.vector_));
      },
      normalize: function(value) {
        return typeof value == "string" || typeof value == "number" ? value : null;
      },
      destroy: function() {
        Index.prototype.destroy.call(this);
        this.vector_ = null;
      }
    });
    var Min = Class(VectorIndex, {
      className: namespace + ".Min",
      vectorGetter: function(vector) {
        return vector[0];
      }
    });
    var Max = Class(VectorIndex, {
      className: namespace + ".Max",
      vectorGetter: function(vector) {
        return vector[vector.length - 1];
      }
    });
    var Distinct = Class(Index, {
      className: namespace + ".Distinct",
      map_: null,
      init: function() {
        this.map_ = {};
        Index.prototype.init.call(this);
      },
      add_: function(value) {
        if (!this.map_.hasOwnProperty(value)) this.map_[value] = 0;
        if (++this.map_[value] == 1) this.value += 1;
      },
      remove_: function(value) {
        if (--this.map_[value] == 0) this.value -= 1;
      },
      update_: function(newValue, oldValue) {
        var delta = 0;
        if (!this.map_.hasOwnProperty(newValue)) this.map_[newValue] = 0;
        if (++this.map_[newValue] == 1) delta += 1;
        if (--this.map_[oldValue] == 0) delta -= 1;
        if (delta) this.set(this.value + delta);
      },
      normalize: String,
      destroy: function() {
        Index.prototype.destroy.call(this);
        this.map_ = null;
      }
    });
    var indexConstructors_ = {};
    var DATASET_INDEX_HANDLER = {
      destroy: function(object) {
        removeDatasetIndex(this, object);
      }
    };
    function IndexConstructor() {}
    function getIndexConstructor(BaseClass, getter, events) {
      if (!Class.isClass(BaseClass) || !BaseClass.isSubclassOf(Index)) throw "Wrong class for index constructor";
      getter = basis.getter(getter);
      events = events || "update";
      if (typeof events != "string") throw "Events must be a event names space separated string";
      events = events.trim().split(" ").sort();
      var indexId = [ BaseClass.basisClassId_, getter[basis.getter.ID], events ].join("_");
      var indexConstructor = indexConstructors_[indexId];
      if (indexConstructor) return indexConstructor.owner;
      var events_ = {};
      for (var i = 0; i < events.length; i++) events_[events[i]] = true;
      indexConstructor = new IndexConstructor;
      indexConstructors_[indexId] = {
        owner: indexConstructor,
        indexClass: BaseClass.subclass({
          indexId: indexId,
          updateEvents: events_,
          valueGetter: getter
        })
      };
      indexConstructor.indexId = indexId;
      return indexConstructor;
    }
    var createIndexConstructor = function(IndexClass, defGetter) {
      return function(events, getter) {
        var dataset;
        if (events instanceof ReadOnlyDataset || events instanceof DatasetWrapper) {
          dataset = events;
          events = getter;
          getter = arguments[2];
        }
        if (!getter) {
          getter = events;
          events = "";
        }
        var indexConstructor = getIndexConstructor(IndexClass, getter || defGetter, events);
        if (dataset) return getDatasetIndex(dataset, indexConstructor); else return indexConstructor;
      };
    };
    var count = createIndexConstructor(Count, basis.fn.$true);
    var sum = createIndexConstructor(Sum);
    var avg = createIndexConstructor(Avg);
    var min = createIndexConstructor(Min);
    var max = createIndexConstructor(Max);
    var distinct = createIndexConstructor(Distinct);
    function applyIndexDelta(index, inserted, deleted) {
      var indexCache = index.indexCache_;
      var objectId;
      index.lock();
      if (inserted) for (var i = 0, object; object = inserted[i++]; ) {
        var newValue = index.normalize(index.valueGetter(object));
        indexCache[object.basisObjectId] = newValue;
        index.add_(newValue);
      }
      if (deleted) for (var i = 0, object; object = deleted[i++]; ) {
        objectId = object.basisObjectId;
        index.remove_(indexCache[objectId]);
        delete indexCache[objectId];
      }
      index.unlock();
    }
    var ITEM_INDEX_HANDLER = {
      "*": function(event) {
        var oldValue;
        var newValue;
        var index;
        var eventType = event.type;
        var object = event.sender;
        var objectId = object.basisObjectId;
        var indexes = datasetIndexes[this.basisObjectId];
        for (var indexId in indexes) {
          index = indexes[indexId];
          if (index.updateEvents[eventType]) {
            oldValue = index.indexCache_[objectId];
            newValue = index.normalize(index.valueGetter(object));
            if (newValue !== oldValue) {
              index.update_(newValue, oldValue);
              index.indexCache_[objectId] = newValue;
            }
          }
        }
      }
    };
    var DATASET_WITH_INDEX_HANDLER = {
      itemsChanged: function(object, delta) {
        var array;
        if (array = delta.inserted) for (var i = array.length; i-- > 0; ) array[i].addHandler(ITEM_INDEX_HANDLER, this);
        if (array = delta.deleted) for (var i = array.length; i-- > 0; ) array[i].removeHandler(ITEM_INDEX_HANDLER, this);
        var indexes = datasetIndexes[this.basisObjectId];
        for (var indexId in indexes) applyIndexDelta(indexes[indexId], delta.inserted, delta.deleted);
      },
      destroy: function() {
        var indexes = datasetIndexes[this.basisObjectId];
        for (var indexId in indexes) removeDatasetIndex(this, indexes[indexId]);
      }
    };
    var datasetIndexes = {};
    function getDatasetIndex(dataset, indexConstructor) {
      if (indexConstructor instanceof IndexConstructor == false) throw "indexConstructor must be an instance of IndexConstructor";
      var datasetId = dataset.basisObjectId;
      var indexes = datasetIndexes[datasetId];
      if (!indexes) {
        indexes = datasetIndexes[datasetId] = {};
        dataset.addHandler(DATASET_WITH_INDEX_HANDLER);
        DATASET_WITH_INDEX_HANDLER.itemsChanged.call(dataset, dataset, {
          inserted: dataset.getItems()
        });
      }
      var indexId = indexConstructor.indexId;
      var index = indexes[indexId];
      if (!index) {
        indexConstructor = indexConstructors_[indexId];
        if (!indexConstructor) throw "Wrong index constructor";
        index = new indexConstructor.indexClass;
        index.addHandler(DATASET_INDEX_HANDLER, dataset);
        indexes[indexId] = index;
        applyIndexDelta(index, dataset.getItems());
      }
      return index;
    }
    function removeDatasetIndex(dataset, index) {
      var indexes = datasetIndexes[dataset.basisObjectId];
      if (indexes && indexes[index.indexId]) {
        delete indexes[index.indexId];
        index.removeHandler(DATASET_INDEX_HANDLER, dataset);
        for (var key in indexes) return;
        dataset.removeHandler(DATASET_WITH_INDEX_HANDLER);
        DATASET_WITH_INDEX_HANDLER.itemsChanged.call(dataset, dataset, {
          deleted: dataset.getItems()
        });
        delete datasetIndexes[dataset.basisObjectId];
      }
    }
    var CalcIndexPreset = Class(null, {
      className: namespace + ".CalcIndexPreset",
      extendConstructor_: true,
      indexes: {},
      calc: basis.fn.$null
    });
    var calcIndexPresetSeed = 1;
    function getUniqueCalcIndexId() {
      return "calc-index-preset-" + basis.number.lead(calcIndexPresetSeed++, 8);
    }
    function percentOfRange(events, getter) {
      var minIndex = "min_" + getUniqueCalcIndexId();
      var maxIndex = "max_" + getUniqueCalcIndexId();
      var indexes = {};
      indexes[minIndex] = min(events, getter);
      indexes[maxIndex] = max(events, getter);
      getter = basis.getter(getter || events);
      var calc = function(data, index, object) {
        return (getter(object) - index[minIndex]) / (index[maxIndex] - index[minIndex]);
      };
      return calc.preset = new CalcIndexPreset({
        indexes: indexes,
        calc: calc
      });
    }
    function percentOfMax(events, getter) {
      var maxIndex = "max_" + getUniqueCalcIndexId();
      var indexes = {};
      indexes[maxIndex] = max(events, getter);
      getter = basis.getter(getter || events);
      var calc = function(data, index, object) {
        return getter(object) / index[maxIndex];
      };
      return calc.preset = new CalcIndexPreset({
        indexes: indexes,
        calc: calc
      });
    }
    function percentOfSum(getter, events) {
      var sumIndex = "sum_" + getUniqueCalcIndexId();
      var indexes = {};
      indexes[sumIndex] = sum(events, getter);
      getter = basis.getter(getter || events);
      var calc = function(data, index, object) {
        return getter(object) / index[sumIndex];
      };
      return calc.preset = new CalcIndexPreset({
        indexes: indexes,
        calc: calc
      });
    }
    var IndexMap = Class(MapFilter, {
      className: namespace + ".IndexMap",
      calcs: null,
      indexes: null,
      indexes_: null,
      indexesBind_: null,
      timer_: undefined,
      indexUpdated: null,
      indexValues: null,
      memberSourceMap: null,
      keyMap: null,
      map: function(item) {
        return this.keyMap.get(item, true);
      },
      addMemberRef: function(member, sourceObject) {
        this.memberSourceMap[member.basisObjectId] = sourceObject.basisObjectId;
        if (this.listen.member) member.addHandler(this.listen.member, this);
        this.sourceMap_[sourceObject.basisObjectId].updated = true;
        if (member.subscriberCount > 0) this.calcMember(member);
      },
      removeMemberRef: function(member, sourceObject) {
        delete this.memberSourceMap[member.basisObjectId];
        if (this.listen.member) member.removeHandler(this.listen.member, this);
      },
      emit_sourceChanged: function(oldSource) {
        MapFilter.prototype.emit_sourceChanged.call(this, oldSource);
        for (var indexName in this.indexes_) {
          var index = this.indexes_[indexName];
          if (oldSource) {
            this.removeIndex(indexName);
            removeDatasetIndex(oldSource, this.indexes[indexName]);
          }
          if (this.source) this.addIndex(indexName, getDatasetIndex(this.source, index));
        }
      },
      listen: {
        index: {
          change: function(sender) {
            var indexMap = this.indexMap;
            indexMap.indexValues[this.key] = sender.value;
            indexMap.indexUpdated = true;
            indexMap.recalcRequest();
          }
        },
        member: {
          subscribersChanged: function(object, delta) {
            if (object.subscriberCount > 0) this.calcMember(object);
          }
        }
      },
      ruleEvents: basis.data.dataset.createRuleEvents(function(sender, delta) {
        MapFilter.prototype.ruleEvents.update.call(this, sender, delta);
        this.sourceMap_[sender.basisObjectId].updated = true;
        this.recalcRequest();
      }, "update"),
      init: function() {
        this.recalc = this.recalc.bind(this);
        this.indexUpdated = false;
        this.indexesBind_ = {};
        this.memberSourceMap = {};
        var indexes = this.indexes;
        this.indexes = {};
        this.indexes_ = {};
        this.indexValues = {};
        var calcs = this.calcs;
        this.calcs = {};
        if (!this.keyMap || this.keyMap instanceof KeyObjectMap == false) this.keyMap = new KeyObjectMap(basis.object.complete({
          create: function(key, config) {
            return new this.itemClass(config);
          }
        }, this.keyMap));
        MapFilter.prototype.init.call(this);
        basis.object.iterate(indexes, this.addIndex, this);
        basis.object.iterate(calcs, this.addCalc, this);
      },
      addIndex: function(key, index) {
        if (!this.indexes[key]) {
          if (index instanceof IndexConstructor) {
            if (!this.indexes_[key]) {
              this.indexes_[key] = index;
              index = this.source ? getDatasetIndex(this.source, index) : null;
            } else {
              basis.dev.warn("Index `" + key + "` already exists");
              return;
            }
          }
          if (index instanceof Index) {
            this.indexValues[key] = index.value;
            this.indexes[key] = index;
            this.indexesBind_[key] = {
              key: key,
              indexMap: this
            };
            var listenHandler = this.listen.index;
            if (listenHandler) {
              index.addHandler(listenHandler, this.indexesBind_[key]);
              if (listenHandler.change) listenHandler.change.call(this.indexesBind_[key], index, index.value);
            }
          } else {
            basis.dev.warn("Index should be instance of `basis.data.index.Index`");
          }
        } else {
          basis.dev.warn("Index `" + key + "` already exists");
        }
      },
      removeIndex: function(key) {
        if (this.indexes_[key] || this.indexes[key]) {
          if (this.indexes[key] && this.listen.index) this.indexes[key].removeHandler(this.listen.index, this.indexesBind_[key]);
          delete this.indexValues[key];
          delete this.indexesBind_[key];
          delete this.indexes[key];
          delete this.indexes_[key];
        }
      },
      addCalc: function(name, calcCfg) {
        if (calcCfg instanceof CalcIndexPreset) {
          this.calcs[name] = calcCfg.calc;
          for (var indexName in calcCfg.indexes) this.addIndex(indexName, calcCfg.indexes[indexName]);
        } else this.calcs[name] = calcCfg;
        this.recalcRequest();
      },
      removeCalc: function(name) {
        var calcCfg = this.calcs[name];
        if (calcCfg && calcCfg.preset instanceof CalcIndexPreset) {
          var indexes = calcCfg.preset.indexes;
          for (var indexName in indexes) this.removeIndex(indexName, indexes[indexName]);
        }
        delete this.calcs[name];
      },
      lock: function() {
        for (var indexId in this.indexes) this.indexes[indexId].lock();
      },
      unlock: function() {
        for (var indexId in this.indexes) this.indexes[indexId].unlock();
      },
      recalcRequest: function() {
        if (!this.timer_) this.timer_ = basis.setImmediate(this.recalc);
      },
      recalc: function() {
        for (var idx in this.items_) this.calcMember(this.items_[idx]);
        this.indexUpdated = false;
        this.timer_ = basis.clearImmediate(this.timer_);
      },
      calcMember: function(member) {
        var sourceObject = this.sourceMap_[this.memberSourceMap[member.basisObjectId]];
        if (member.subscriberCount && (sourceObject.updated || this.indexUpdated)) {
          sourceObject.updated = false;
          var data = {};
          var newValue;
          var oldValue;
          var update;
          for (var calcName in this.calcs) {
            newValue = this.calcs[calcName](sourceObject.sourceObject.data, this.indexValues, sourceObject.sourceObject);
            oldValue = member.data[calcName];
            if (member.data[calcName] !== newValue && (typeof newValue != "number" || typeof oldValue != "number" || !isNaN(newValue) || !isNaN(oldValue))) {
              data[calcName] = newValue;
              update = true;
            }
          }
          if (update) member.update(data);
        }
      },
      getMember: function(sourceObject) {
        return this.keyMap.get(sourceObject, true);
      },
      destroy: function() {
        this.keyMap.destroy();
        this.keyMap = null;
        for (var indexName in this.indexes) this.removeIndex(indexName);
        MapFilter.prototype.destroy.call(this);
        this.timer_ = basis.clearImmediate(this.timer_);
        this.calcs = null;
        this.indexes = null;
        this.indexes_ = null;
        this.indexValues = null;
        this.memberSourceMap = null;
        this.indexesBind_ = null;
      }
    });
    module.exports = {
      IndexConstructor: IndexConstructor,
      createIndexConstructor: createIndexConstructor,
      getDatasetIndex: getDatasetIndex,
      removeDatasetIndex: removeDatasetIndex,
      Index: Index,
      Count: Count,
      Sum: Sum,
      Avg: Avg,
      VectorIndex: VectorIndex,
      Min: Min,
      Max: Max,
      Distinct: Distinct,
      count: count,
      sum: sum,
      avg: avg,
      max: max,
      min: min,
      distinct: distinct,
      CalcIndexPreset: CalcIndexPreset,
      percentOfRange: percentOfRange,
      percentOfMax: percentOfMax,
      percentOfSum: percentOfSum,
      IndexMap: IndexMap
    };
  },
  "g.js": function(exports, module, basis, global, __filename, __dirname, require, resource) {
    basis.require("./4.js");
    var namespace = this.path;
    var DataObject = basis.data.Object;
    function generateGetData(nameMap) {
      return new Function("data", "return {" + basis.object.iterate(nameMap, function(ownName, sourceName) {
        ownName = ownName.replace(/"/g, '\\"');
        sourceName = sourceName.replace(/"/g, '\\"');
        return '"' + ownName + '": data["' + sourceName + '"]';
      }) + "}");
    }
    var MERGE_SOURCE_HANDLER = {
      update: function(sender, senderDelta) {
        var fields = this.host.fields;
        var data = {};
        if (this.name == fields.defaultSource) {
          for (var key in senderDelta) if (key in fields.fieldSource == false) data[key] = sender.data[key];
        } else {
          for (var key in senderDelta) {
            var mergeKey = fields.fromNames[this.name][key];
            if (mergeKey && this.host.fields.fieldSource[mergeKey] == this.name) data[mergeKey] = sender.data[key];
          }
        }
        for (var key in data) return this.host.update(data);
      },
      destroy: function() {
        this.host.setSource(this.name, null);
      }
    };
    var fieldsExtend = function(fields) {
      var sources = {};
      var toNames = {};
      var fromNames = {};
      var result = {
        defaultSource: false,
        fieldSource: {},
        toNames: toNames,
        fromNames: fromNames,
        sources: sources,
        __extend__: fieldsExtend
      };
      if (fields["*"]) result.defaultSource = fields["*"];
      for (var field in fields) {
        var def = fields[field].split(":");
        var sourceName = def.shift();
        var sourceField = def.length ? def.join(":") : field;
        if (sourceName == result.defaultSource) {
          if (field != "*") basis.dev.warn("basis.data.object.Merge: source `" + sourceName + "` has already defined for any field (star rule), definition this source for `" + field + "` field is superfluous (ignored).");
          continue;
        }
        if (sourceName == "-" && sourceField != field) {
          basis.dev.warn("basis.data.object.Merge: custom field name can't be used for own properties, definition `" + field + ': "' + fields[field] + '"` ignored.');
          continue;
        }
        if (!toNames[sourceName]) {
          toNames[sourceName] = {};
          fromNames[sourceName] = {};
        }
        toNames[sourceName][field] = sourceField;
        fromNames[sourceName][sourceField] = field;
        result.fieldSource[field] = sourceName;
      }
      for (var sourceName in toNames) sources[sourceName] = generateGetData(toNames[sourceName]);
      if (result.defaultSource) sources[result.defaultSource] = function(data) {
        var res = {};
        for (var key in data) if (key in result.fieldSource == false) res[key] = data[key];
        return res;
      };
      return result;
    };
    var Merge = DataObject.subclass({
      className: namespace + ".Merge",
      emit_sourceChanged: basis.event.create("sourceChanged", "name", "oldSource"),
      fields: fieldsExtend({
        "*": "-"
      }),
      sources: null,
      sourcesContext_: null,
      delta_: null,
      init: function() {
        var data = this.data;
        var sources = this.sources;
        if (this.delegate) basis.dev.warn(this.constructor.className + " can't has a delegate");
        this.data = {};
        this.delegate = null;
        DataObject.prototype.init.call(this);
        for (var key in data) {
          var name = this.fields.fieldSource[key] || this.fields.defaultSource;
          if (name == "-") this.data[key] = data[key];
        }
        this.sources = {};
        this.sourcesContext_ = {};
        if (sources) this.setSources(sources);
      },
      update: function(data) {
        if (this.delta_) {
          for (var key in data) {
            var sourceName = this.fields.fieldSource[key] || this.fields.defaultSource;
            if (!sourceName) {
              basis.dev.warn("Unknown source for field `" + key + "`");
              continue;
            }
            var sourceKey = sourceName != this.fields.defaultSource ? this.fields.toNames[sourceName][key] : key;
            var value = this.sources[sourceName].data[sourceKey];
            if (value !== this.data[key]) {
              if (key in this.delta_ == false) {
                this.delta_[key] = this.data[key];
              } else {
                if (this.delta_[key] === value) delete this.delta_[key];
              }
              this.data[key] = value;
            }
          }
          return;
        }
        var sourceDelta;
        var delta = {};
        this.delta_ = delta;
        for (var key in data) {
          var sourceName = this.fields.fieldSource[key] || this.fields.defaultSource;
          if (!sourceName) {
            basis.dev.warn("Unknown source for field `" + key + "`");
            continue;
          }
          if (sourceName == "-") {
            delta[key] = this.data[key];
            this.data[key] = data[key];
            continue;
          }
          if (this.sources[sourceName]) {
            var sourceKey = sourceName != this.fields.defaultSource ? this.fields.toNames[sourceName][key] : key;
            if (this.sources[sourceName].data[sourceKey] !== data[key]) {
              if (!sourceDelta) sourceDelta = {};
              if (sourceName in sourceDelta == false) sourceDelta[sourceName] = {};
              sourceDelta[sourceName][sourceKey] = data[key];
            } else {
              if (this.data[key] !== data[key]) {
                delta[key] = this.data[key];
                this.data[key] = data[key];
              }
            }
          }
        }
        if (sourceDelta) for (var sourceName in sourceDelta) this.sources[sourceName].update(sourceDelta[sourceName]);
        this.delta_ = null;
        for (var key in delta) {
          this.emit_update(delta);
          return delta;
        }
        return false;
      },
      setDelegate: function() {
        basis.dev.warn(namespace + ".Merge can't has a delegate");
      },
      setSource: function(name, source) {
        var oldSource = this.sources[name];
        if (name in this.fields.sources == false) {
          basis.dev.warn("basis.data.object.Merge#setSource: can't set source with name `" + name + "` as not specified by fields configuration");
          return;
        }
        if (name == "-") return;
        if (source instanceof DataObject == false) source = null;
        if (oldSource !== source) {
          var listenHandler = this.listen["source:" + name];
          if (oldSource) {
            if (listenHandler) oldSource.removeHandler(listenHandler, this);
            oldSource.removeHandler(MERGE_SOURCE_HANDLER, this.sourcesContext_[name]);
          }
          this.sources[name] = source;
          if (source) {
            if (name in this.sourcesContext_ == false) this.sourcesContext_[name] = {
              host: this,
              name: name
            };
            source.addHandler(MERGE_SOURCE_HANDLER, this.sourcesContext_[name]);
            if (listenHandler) source.addHandler(listenHandler, this);
            this.update(this.fields.sources[name](source.data));
          }
          this.emit_sourceChanged(name, oldSource);
        }
      },
      setSources: function(sources) {
        if (!sources) sources = {};
        for (var name in this.fields.sources) this.setSource(name, sources[name]);
        for (var name in sources) if (name in this.fields.sources == false) basis.dev.warn("basis.data.object.Merge#setSource: can't set source with name `" + name + "` as not specified by fields configuration");
      },
      destroy: function() {
        this.setSources();
        this.sources = null;
        this.sourcesContext_ = null;
        DataObject.prototype.destroy.call(this);
      }
    });
    module.exports = {
      Merge: Merge
    };
  },
  "h.js": function(exports, module, basis, global, __filename, __dirname, require, resource) {
    basis.require("./3.js");
    basis.require("./4.js");
    basis.require("./d.js");
    var namespace = this.path;
    var Class = basis.Class;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var keys = basis.object.keys;
    var extend = basis.object.extend;
    var complete = basis.object.complete;
    var $self = basis.fn.$self;
    var getter = basis.getter;
    var arrayFrom = basis.array.from;
    var Emitter = basis.event.Emitter;
    var createEvent = basis.event.create;
    var DataObject = basis.data.Object;
    var Slot = basis.data.Slot;
    var Dataset = basis.data.Dataset;
    var Filter = basis.data.dataset.Filter;
    var Split = basis.data.dataset.Split;
    var NULL_INFO = {};
    var entityTypes = [];
    var isKeyType = {
      string: true,
      number: true
    };
    var NumericId = function(value) {
      return isNaN(value) ? null : Number(value);
    };
    var NumberId = function(value) {
      return isNaN(value) ? null : Number(value);
    };
    var IntId = function(value) {
      return isNaN(value) ? null : parseInt(value, 10);
    };
    var StringId = function(value) {
      return value == null ? null : String(value);
    };
    var untitledNames = {};
    function getUntitledName(name) {
      untitledNames[name] = untitledNames[name] || 0;
      return name + untitledNames[name]++;
    }
    var namedTypes = {};
    var namedIndexes = {};
    var deferredTypeDef = {};
    var TYPE_DEFINITION_PLACEHOLDER = function TYPE_DEFINITION_PLACEHOLDER() {};
    function resolveType(typeName, type) {
      var list = deferredTypeDef[typeName];
      if (list) {
        for (var i = 0, def; def = list[i]; i++) {
          var typeHost = def[0];
          var fieldName = def[1];
          typeHost[fieldName] = type;
        }
        delete deferredTypeDef[typeName];
      }
      namedTypes[typeName] = type;
    }
    function getTypeByName(typeName, typeHost, field) {
      if (namedTypes[typeName]) return namedTypes[typeName];
      var list = deferredTypeDef[typeName];
      if (!list) list = deferredTypeDef[typeName] = [];
      list.push([ typeHost, field ]);
      return function(value, oldValue) {
        var Type = namedTypes[typeName];
        if (Type) return Type(value, oldValue);
        if (arguments.length) basis.dev.warn(namespace + ": type `" + typeName + "` is not defined for " + field + ", but function called");
      };
    }
    function validateScheme() {
      for (var typeName in deferredTypeDef) basis.dev.warn(namespace + ": type `" + typeName + "` is not defined, but used by " + deferredTypeDef[typeName].length + " type(s)");
    }
    var Index = Class(null, {
      className: namespace + ".Index",
      items: null,
      init: function(fn) {
        this.items = {};
      },
      get: function(value, checkType) {
        var item = hasOwnProperty.call(this.items, value) && this.items[value];
        if (item && (!checkType || item.entityType === checkType)) return item;
      },
      add: function(value, newItem) {
        if (newItem) {
          var curItem = this.get(value);
          if (!curItem) {
            this.items[value] = newItem;
            return true;
          }
          if (curItem !== newItem) throw "basis.entity: Value `" + value + "` for index is already occupied";
        }
      },
      remove: function(value, item) {
        if (this.items[value] === item) {
          delete this.items[value];
          return true;
        }
      },
      destroy: function() {
        this.items = null;
      }
    });
    function CalculateField() {
      var names = arrayFrom(arguments);
      var calcFn = names.pop();
      var foo = names[0];
      var bar = names[1];
      var baz = names[2];
      var result;
      if (typeof calcFn != "function") throw "Last argument for calculate field constructor must be a function";
      switch (names.length) {
        case 0:
          result = function() {
            return calcFn();
          };
          break;
        case 1:
          result = function(delta, data, oldValue) {
            if (foo in delta) return calcFn(data[foo]);
            return oldValue;
          };
          break;
        case 2:
          result = function(delta, data, oldValue) {
            if (foo in delta || bar in delta) return calcFn(data[foo], data[bar]);
            return oldValue;
          };
          break;
        case 3:
          result = function(delta, data, oldValue) {
            if (foo in delta || bar in delta || baz in delta) return calcFn(data[foo], data[bar], data[baz]);
            return oldValue;
          };
          break;
        default:
          result = function(delta, data, oldValue) {
            var changed = false;
            var args = [];
            for (var i = 0, name; name = names[i]; i++) {
              changed = changed || name in delta;
              args.push(data[name]);
            }
            if (changed) return calcFn.apply(null, args);
            return oldValue;
          };
      }
      result = Function("calcFn", "names", "return " + result.toString().replace(/(foo|bar|baz)/g, function(m, w) {
        return '"' + names[w == "foo" ? 0 : w == "bar" ? 1 : 2] + '"';
      }).replace(/\[\"([^"]+)\"\]/g, ".$1"))(calcFn, names);
      result.args = names;
      result.calc = result;
      return result;
    }
    function ConcatStringField(name) {
      if (arguments.length == 1) return function(delta, data, oldValue) {
        if (name in delta) return data[name] != null ? String(data[name]) : null;
        return oldValue;
      };
      return CalculateField.apply(null, arrayFrom(arguments).concat(function() {
        for (var i = arguments.length - 1; i >= 0; i--) if (arguments[i] == null) return null;
        return Array.prototype.join.call(arguments, "-");
      }));
    }
    var ENTITYSET_WRAP_METHOD = function(superClass, method) {
      return function(data) {
        return superClass.prototype[method].call(this, data && data.map(this.wrapper));
      };
    };
    var ENTITYSET_INIT_METHOD = function(superClass, name) {
      return function() {
        if (!this.name) this.name = getUntitledName(name);
        superClass.prototype.init.call(this);
      };
    };
    var ENTITYSET_SYNC_METHOD = function(superClass) {
      return function(data) {
        var destroyItems = basis.object.slice(this.items_);
        var inserted = [];
        var deleted = [];
        if (data) {
          Dataset.setAccumulateState(true);
          for (var i = 0; i < data.length; i++) {
            var entity = this.wrapper(data[i]);
            if (entity) destroyItems[entity.basisObjectId] = false;
          }
          Dataset.setAccumulateState(false);
        }
        for (var key in this.items_) if (key in destroyItems == false) inserted.push(this.items_[key]);
        for (var key in destroyItems) if (destroyItems[key]) deleted.push(destroyItems[key]);
        if (deleted.length && this.wrapper.all) this.wrapper.all.emit_itemsChanged({
          deleted: deleted
        });
        Dataset.setAccumulateState(true);
        for (var i = 0; i < deleted.length; i++) deleted[i].destroy();
        Dataset.setAccumulateState(false);
        return inserted.length ? inserted : null;
      };
    };
    var EntitySet = Class(Dataset, {
      className: namespace + ".EntitySet",
      name: null,
      wrapper: $self,
      init: ENTITYSET_INIT_METHOD(Dataset, "EntitySet"),
      sync: ENTITYSET_SYNC_METHOD(Dataset),
      set: ENTITYSET_WRAP_METHOD(Dataset, "set"),
      add: ENTITYSET_WRAP_METHOD(Dataset, "add"),
      remove: ENTITYSET_WRAP_METHOD(Dataset, "remove"),
      destroy: function() {
        Dataset.prototype.destroy.call(this);
        this.wrapper = null;
      }
    });
    var ReadOnlyEntitySet = Class(EntitySet, {
      className: namespace + ".ReadOnlyEntitySet",
      set: basis.fn.$false,
      add: basis.fn.$false,
      remove: basis.fn.$false,
      clear: basis.fn.$false
    });
    var EntityCollection = Class(Filter, {
      className: namespace + ".EntityCollection",
      name: null,
      init: ENTITYSET_INIT_METHOD(Filter, "EntityCollection"),
      sync: ENTITYSET_SYNC_METHOD(Filter)
    });
    var EntityGrouping = Class(Split, {
      className: namespace + ".EntityGrouping",
      name: null,
      subsetClass: ReadOnlyEntitySet,
      init: ENTITYSET_INIT_METHOD(Split, "EntityGrouping"),
      sync: ENTITYSET_SYNC_METHOD(Split),
      getSubset: function(object, autocreate) {
        var group = Split.prototype.getSubset.call(this, object, autocreate);
        if (group && group.dataset) group.dataset.wrapper = this.wrapper;
        return group;
      }
    });
    var EntitySetWrapper = function(wrapper, name) {
      if (this instanceof EntitySetWrapper) {
        if (!wrapper) wrapper = $self;
        if (!name || namedTypes[name]) {
          if (namedTypes[name]) basis.dev.warn(namespace + ": Duplicate entity set type name `" + this.name + "`, name ignored");
          name = getUntitledName("UntitledEntitySetType");
        }
        var entitySetType = new EntitySetConstructor({
          entitySetClass: {
            className: namespace + ".EntitySet(" + (typeof wrapper == "string" ? wrapper : (wrapper.type || wrapper).name || "UnknownType") + ")",
            name: "Set of {" + (typeof wrapper == "string" ? wrapper : (wrapper.type || wrapper).name || "UnknownType") + "}",
            wrapper: wrapper
          }
        });
        var EntitySetClass = entitySetType.entitySetClass;
        var result = function(data, entitySet) {
          if (data != null) {
            if (entitySet instanceof EntitySet == false) entitySet = entitySetType.createEntitySet();
            entitySet.set(data instanceof Dataset ? data.getItems() : arrayFrom(data));
            return entitySet;
          } else return null;
        };
        if (typeof wrapper == "string") EntitySetClass.prototype.wrapper = getTypeByName(wrapper, EntitySetClass.prototype, "wrapper");
        resolveType(name, result);
        extend(result, {
          type: entitySetType,
          typeName: name,
          toString: function() {
            return name + "()";
          },
          reader: function(data) {
            if (Array.isArray(data)) {
              var wrapper = EntitySetClass.prototype.wrapper;
              return data.map(wrapper.reader || wrapper);
            }
            return data;
          },
          extendClass: function(source) {
            EntitySetClass.extend.call(EntitySetClass, source);
            return result;
          },
          extendReader: function(extReader) {
            var reader = result.reader;
            result.reader = function(data) {
              if (Array.isArray(data)) extReader(data);
              return reader(data);
            };
            return result;
          },
          entitySetType: entitySetType,
          extend: function() {
            basis.dev.warn("basis.entity: EntitySetType.extend() is deprecated, use EntitySetType.extendClass() instead.");
            return EntitySetClass.extend.apply(EntitySetClass, arguments);
          }
        });
        if (Object.defineProperty) Object.defineProperty(result, "entitySetType", {
          get: function() {
            basis.dev.warn("basis.entity: EntitySetType.entitySetType is deprecated, use EntitySetType.type instead.");
            return entitySetType;
          }
        });
        return result;
      }
    };
    EntitySetWrapper.className = namespace + ".EntitySetWrapper";
    var EntitySetConstructor = Class(null, {
      className: namespace + ".EntitySetConstructor",
      entitySetClass: EntitySet,
      extendConstructor_: true,
      createEntitySet: function() {
        return new this.entitySetClass;
      }
    });
    var EntityTypeWrapper = function(config) {
      if (this instanceof EntityTypeWrapper) {
        var result;
        if (config.singleton) result = function(data) {
          var entity = entityType.get();
          if (entity) {
            if (data) entity.update(data);
          } else entity = new EntityClass(data || {});
          return entity;
        }; else result = function(data, entity) {
          if (data != null) {
            if (!entity || entity.entityType !== entityType) entity = null;
            if (data === entity || data.entityType === entityType) return data;
            var idValue;
            var idField = entityType.idField;
            if (isKeyType[typeof data]) {
              if (!idField) {
                if (entityType.compositeKey) basis.dev.warn("basis.entity: Entity type `" + entityType.name + "` wrapper was invoked with " + typeof data + " value as index, but entity type index is composite and consists of [" + keys(entityType.idFields).join(", ") + "] fields"); else basis.dev.warn("basis.entity: Entity type `" + entityType.name + "` wrapper was invoked with " + typeof data + " value as index, but entity type has no index");
                return;
              }
              if (entity = entityType.index.get(data, entityType)) return entity;
              idValue = data;
              data = {};
              data[idField] = idValue;
            } else {
              if (entityType.compositeKey) idValue = entityType.compositeKey(data, data);
              if (idValue != null) entity = entityType.index.get(idValue, entityType);
            }
            if (entity && entity.entityType === entityType) entity.update(data); else entity = new EntityClass(data);
            return entity;
          }
        };
        var entityType = new EntityTypeConstructor(config || {}, result);
        var EntityClass = entityType.entityClass;
        var name = entityType.name;
        resolveType(name, result);
        extend(result, {
          all: entityType.all,
          type: entityType,
          typeName: name,
          toString: function() {
            return name + "()";
          },
          get: function(data) {
            return entityType.get(data);
          },
          getSlot: function(id, defaults) {
            return entityType.getSlot(id, defaults);
          },
          reader: function(data) {
            return entityType.reader(data);
          },
          extendClass: function(source) {
            EntityClass.extend.call(EntityClass, source);
            return result;
          },
          extendReader: function(extReader) {
            var reader = result.reader;
            result.reader = function(data) {
              if (data && typeof data == "object") extReader(data);
              return reader(data);
            };
            return result;
          },
          entityType: entityType,
          extend: function() {
            basis.dev.warn("basis.entity: EntityType.extend() is deprecated, use EntityType.extendClass() instead.");
            return EntityClass.extend.apply(EntityClass, arguments);
          }
        });
        if (Object.defineProperty) Object.defineProperty(result, "entityType", {
          get: function() {
            basis.dev.warn("basis.entity: EntityType.entityType is deprecated, use EntityType.type instead.");
            return entityType;
          }
        });
        return result;
      }
    };
    EntityTypeWrapper.className = namespace + ".EntityTypeWrapper";
    var fieldDestroyHandlers = {};
    var dataBuilderFactory = {};
    var calcFieldWrapper = function(value, oldValue) {
      basis.dev.warn("Calculate fields are readonly");
      return oldValue;
    };
    function getDataBuilder(defaults, fields) {
      var args = [ "has" ];
      var values = [ hasOwnProperty ];
      var obj = [];
      for (var key in defaults) if (hasOwnProperty.call(defaults, key)) {
        var name = "v" + obj.length;
        var fname = "f" + obj.length;
        var value = defaults[key];
        args.push(name, fname);
        values.push(value, fields[key]);
        obj.push('"' + key + '":' + 'has.call(data,"' + key + '")' + "?" + fname + '(data["' + key + '"],' + name + ")" + ":" + name + (typeof value == "function" ? "(data)" : ""));
      }
      var code = obj.sort().join(",");
      var fn = dataBuilderFactory[code];
      if (!fn) fn = dataBuilderFactory[code] = new Function(args, "return function(data){" + "return {" + code + "};" + "};");
      return fn.apply(null, values);
    }
    function arrayField(newArray, oldArray) {
      if (!Array.isArray(newArray)) return null;
      if (!Array.isArray(oldArray) || newArray.length != oldArray.length) return newArray || null;
      for (var i = 0; i < newArray.length; i++) if (newArray[i] !== oldArray[i]) return newArray;
      return oldArray;
    }
    var fromISOString = function() {
      function fastDateParse(y, m, d, h, i, s, ms) {
        var date = new Date(y, m - 1, d, h || 0, 0, s || 0, ms ? ms.substr(0, 3) : 0);
        date.setMinutes((i || 0) - tz - date.getTimezoneOffset());
        return date;
      }
      var tz;
      return function(isoDateString) {
        tz = 0;
        return fastDateParse.apply(null, String(isoDateString || "").replace(reIsoTimezoneDesignator, function(m, pre, h, i) {
          tz = i ? h * 60 + i * 1 : h * 1;
          return pre;
        }).split(reIsoStringSplit));
      };
    }();
    function dateField(value, oldValue) {
      if (typeof value == "string") return fromISOString(value);
      if (typeof value == "number") return new Date(value);
      if (value == null) return null;
      if (value && value.constructor === Date) return value;
      basis.dev.warn("basis.entity: Bad value for Date field, value ignored");
      return oldValue;
    }
    function addField(entityType, name, config) {
      entityType.aliases[name] = name;
      if (typeof config == "string" || Array.isArray(config) || typeof config == "function" && config.calc !== config) {
        config = {
          type: config
        };
      } else {
        config = config ? basis.object.slice(config) : {};
      }
      if ("type" in config) {
        if (typeof config.type == "string") config.type = getTypeByName(config.type, entityType.fields, name);
        if (Array.isArray(config.type)) {
          var values = config.type.slice();
          if (!values.length) basis.dev.warn("Empty array set as type definition for " + entityType.name + "#field." + name + ", is it a bug?");
          if (values.length == 1) {
            config.type = basis.fn.$const(values[0]);
            config.defValue = values[0];
          } else {
            config.type = function(value, oldValue) {
              var exists = values.indexOf(value) != -1;
              if (!exists) basis.dev.warn("Set value that not in list for " + entityType.name + "#field." + name + " (new value ignored).\nVariants:", values, "\nIgnored value:", value);
              return exists ? value : oldValue;
            };
            config.defValue = values.indexOf(config.defValue) != -1 ? config.defValue : values[0];
          }
        }
        if (config.type === Array) config.type = arrayField;
        if (config.type === Date) config.type = dateField;
        if (typeof config.type != "function") {
          basis.dev.warn("EntityType " + entityType.name + ": Field wrapper for `" + name + "` field is not a function. Field wrapper has been ignored. Wrapper: ", config.type);
          config.type = null;
        }
      }
      var wrapper = config.type || $self;
      if (config.id || config.index || [ NumericId, NumberId, IntId, StringId ].indexOf(wrapper) != -1) entityType.idFields[name] = config;
      if (config.calc) {
        addCalcField(entityType, name, config.calc);
        entityType.fields[name] = calcFieldWrapper;
      } else entityType.fields[name] = wrapper;
      entityType.defaults[name] = "defValue" in config ? config.defValue : wrapper();
      if (!fieldDestroyHandlers[name]) fieldDestroyHandlers[name] = {
        destroy: function() {
          this.set(name, null);
        }
      };
    }
    function addFieldAlias(entityType, alias, name) {
      if (name in entityType.fields == false) {
        basis.dev.warn("Can't add alias `" + alias + "` for non-exists field `" + name + "`");
        return;
      }
      if (alias in entityType.aliases) {
        basis.dev.warn("Alias `" + alias + "` already exists");
        return;
      }
      entityType.aliases[alias] = name;
    }
    function addCalcField(entityType, name, wrapper) {
      if (!entityType.calcs) entityType.calcs = [];
      var calcs = entityType.calcs;
      var deps = entityType.deps;
      var calcArgs = wrapper.args || [];
      var calcConfig = {
        args: calcArgs,
        wrapper: wrapper
      };
      var before = entityType.calcs.length;
      var after = 0;
      if (calcArgs) for (var i = 0, calc; calc = calcs[i]; i++) if (calcArgs.indexOf(calc.key) != -1) after = i + 1;
      if (name) {
        calcConfig.key = name;
        for (var i = 0, calc; calc = calcs[i]; i++) if (calc.args.indexOf(name) != -1) {
          before = i;
          break;
        }
        if (after > before) {
          basis.dev.warn("Can't add calculate field `" + name + "`, because recursion");
          return;
        }
        deps[name] = calcArgs.reduce(function(res, ref) {
          var items = deps[ref] || [ ref ];
          for (var i = 0; i < items.length; i++) basis.array.add(res, items[i]);
          return res;
        }, []);
        for (var ref in deps) {
          var idx = deps[ref].indexOf(name);
          if (idx != -1) Array.prototype.splice.apply(deps[ref], [ idx, 1 ].concat(deps[name]));
        }
      } else {
        before = after;
      }
      calcs.splice(Math.min(before, after), 0, calcConfig);
    }
    function getFieldGetter(name) {
      return function(real) {
        if (real && this.modified && name in this.modified) return this.modified[name];
        return this.data[name];
      };
    }
    function getFieldSetter(name) {
      return function(value, rollback) {
        return this.set(name, value, rollback);
      };
    }
    var EntityTypeConstructor = Class(null, {
      className: namespace + ".EntityType",
      wrapper: null,
      all: null,
      fields: null,
      idField: null,
      idFields: null,
      defaults: null,
      aliases: null,
      slots: null,
      singleton: false,
      index: null,
      indexes: null,
      entityClass: null,
      init: function(config, wrapper) {
        this.name = config.name;
        if (!this.name || namedTypes[this.name]) {
          if (namedTypes[this.name]) basis.dev.warn(namespace + ": Duplicate type name `" + this.name + "`, name ignored");
          this.name = getUntitledName("UntitledEntityType");
        }
        this.fields = {};
        this.deps = {};
        this.idFields = {};
        this.defaults = {};
        this.aliases = {};
        this.slots = {};
        var index = config.index;
        if (index) {
          if (index instanceof Index) this.index = index; else basis.dev.warn("index must be instanceof basis.entity.Index");
        }
        this.wrapper = wrapper;
        if ("all" in config == false || config.all || config.singleton) this.all = new ReadOnlyEntitySet(basis.object.complete({
          wrapper: wrapper
        }, config.all));
        this.singleton = !!config.singleton;
        if (this.singleton) {
          var singletonInstance;
          this.get = function() {
            return singletonInstance;
          };
          this.all.addHandler({
            itemsChanged: function(sender, delta) {
              singletonInstance = delta.inserted ? delta.inserted[0] : null;
            }
          }, this);
        }
        for (var key in config.fields) addField(this, key, config.fields[key]);
        for (var key in config.aliases) addFieldAlias(this, key, config.aliases[key]);
        if (config.constrains) config.constrains.forEach(function(item) {
          addCalcField(this, null, item);
        }, this);
        var idFields = keys(this.idFields);
        var indexes = {};
        if (idFields.length) {
          for (var field in this.idFields) {
            var fieldCfg = this.idFields[field];
            var index = fieldCfg.index;
            var indexDescriptor;
            if (!index || index instanceof Index == false) {
              if (typeof index == "string") {
                if (index in namedIndexes == false) namedIndexes[index] = new Index;
                index = namedIndexes[index];
              } else {
                if (!this.index) this.index = new Index;
                index = this.index;
              }
            }
            indexDescriptor = indexes[index.basisObjectId];
            if (!indexDescriptor) indexDescriptor = indexes[index.basisObjectId] = {
              index: index,
              fields: []
            };
            indexDescriptor.fields.push(field);
            this.idFields[field] = indexDescriptor;
          }
          if (this.index && this.index.basisObjectId in indexes == false) {
            basis.dev.warn("basis.entity: entity index is not used for any field, index ignored");
            this.index = null;
          }
          for (var id in indexes) {
            var indexDescriptor = indexes[id];
            indexDescriptor.property = "__id__" + id;
            indexDescriptor.compositeKey = ConcatStringField.apply(null, indexDescriptor.fields);
            if (indexDescriptor.fields.length == 1) indexDescriptor.idField = indexDescriptor.fields[0];
          }
          var indexesKeys = keys(indexes);
          var primaryIndex = indexes[this.index ? this.index.basisObjectId : indexesKeys[0]];
          this.index = primaryIndex.index;
          this.idField = primaryIndex.idField;
          this.compositeKey = primaryIndex.compositeKey;
          this.idProperty = primaryIndex.property;
          this.indexes = indexes;
        } else {
          if (this.index) {
            basis.dev.warn("basis.entity: entity has no any id field, index ignored");
            this.index = null;
          }
        }
        var initDelta = {};
        for (var key in this.defaults) initDelta[key] = undefined;
        this.entityClass = createEntityClass(this, this.all, this.fields, this.slots);
        this.entityClass.extend({
          entityType: this,
          type: wrapper,
          typeName: this.name,
          state: config.state || this.entityClass.prototype.state,
          generateData: getDataBuilder(this.defaults, this.fields),
          initDelta: initDelta
        });
        for (var name in this.fields) {
          this.entityClass.prototype["get_" + name] = getFieldGetter(name);
          if (this.fields[name] !== calcFieldWrapper) this.entityClass.prototype["set_" + name] = getFieldSetter(name);
        }
        entityTypes.push(this);
      },
      reader: function(data) {
        var result = {};
        if (isKeyType[typeof data]) return this.idField ? data : null;
        if (!data || data == null) return null;
        for (var key in data) {
          var fieldKey = this.aliases[key];
          if (fieldKey) {
            var reader = this.fields[fieldKey].reader;
            result[fieldKey] = reader ? reader(data[key]) : data[key];
          }
        }
        return result;
      },
      get: function(entityOrData) {
        var id = this.getId(entityOrData);
        if (this.index && id != null) return this.index.get(id, this);
      },
      getId: function(entityOrData) {
        if (this.compositeKey && entityOrData != null) {
          if (isKeyType[typeof entityOrData]) return entityOrData;
          if (entityOrData && entityOrData.entityType === this) return entityOrData[this.idProperty];
          if (entityOrData instanceof DataObject) entityOrData = entityOrData.data;
          if (this.compositeKey) return this.compositeKey(entityOrData, entityOrData);
        }
      },
      getSlot: function(data) {
        var id = this.getId(data);
        if (id != null) {
          var slot = hasOwnProperty.call(this.slots, id) && this.slots[id];
          if (!slot) {
            if (isKeyType[typeof data]) {
              var tmp = {};
              if (this.idField) tmp[this.idField] = data;
              data = tmp;
            }
            slot = this.slots[id] = new Slot({
              delegate: this.get(id) || null,
              data: data
            });
          }
          return slot;
        }
      }
    });
    function entityWarn(entity, message) {
      basis.dev.warn("[basis.entity " + entity.entityType.name + "#" + entity.basisObjectId + "] " + message, entity);
    }
    var BaseEntity = Class(DataObject, {
      className: namespace + ".BaseEntity",
      target: true,
      setDelegate: function() {},
      extendConstructor_: false,
      fieldHandlers_: null,
      modified: null,
      emit_rollbackUpdate: createEvent("rollbackUpdate")
    });
    var createEntityClass = function(entityType, all, fields, slots) {
      function calc(entity, delta, rollbackDelta) {
        var calcs = entityType.calcs;
        var data = entity.data;
        var updated = false;
        try {
          if (calcs) {
            for (var i = 0, calc; calc = calcs[i]; i++) {
              var key = calc.key;
              var oldValue = data[key];
              var newValue = calc.wrapper(delta, data, oldValue);
              if (key && newValue !== oldValue) {
                delta[key] = oldValue;
                data[key] = newValue;
                updated = true;
              }
            }
          }
          for (var id in entityType.indexes) {
            var indexDescriptor = entityType.indexes[id];
            var curId = entity[indexDescriptor.property];
            var newId = curId;
            if (indexDescriptor.compositeKey) newId = indexDescriptor.compositeKey(delta, data, curId);
            if (newId !== curId) {
              updateIndex(indexDescriptor.index, entity, curId, newId);
              entity[indexDescriptor.property] = newId;
            }
          }
          return updated;
        } catch (e) {
          entityWarn(entity, "(rollback changes) Exception on field calcs: " + (e && e.message || e));
          for (var key in delta) entity.data[key] = delta[key];
          if (rollbackDelta && !entity.modified) entity.modified = rollbackDelta;
        }
      }
      function updateIndex(index, entity, curValue, newValue) {
        if (newValue != null) {
          index.add(newValue, entity);
          if (hasOwnProperty.call(slots, newValue)) slots[newValue].setDelegate(entity);
        }
        if (curValue != null) {
          index.remove(curValue, entity);
          if (hasOwnProperty.call(slots, curValue)) slots[curValue].setDelegate();
        }
      }
      return Class(BaseEntity, {
        className: entityType.name,
        init: function(data) {
          this.delegate = null;
          this.data = this.generateData(data);
          BaseEntity.prototype.init.call(this);
          for (var key in data) if (key in fields == false) entityWarn(this, 'Field "' + key + '" is not defined, value has been ignored.');
          var value;
          for (var key in this.data) {
            value = this.data[key];
            if (value && value !== this && value instanceof Emitter) {
              value.addHandler(fieldDestroyHandlers[key], this);
              if (!this.fieldHandlers_) this.fieldHandlers_ = {};
              this.fieldHandlers_[key] = true;
            }
          }
          calc(this, this.initDelta);
          if (all) all.emit_itemsChanged({
            inserted: [ this ]
          });
        },
        toString: function() {
          return "[object " + this.constructor.className + "(" + this.entityType.name + ")]";
        },
        getId: function() {
          return this[entityType.idProperty];
        },
        get: function(key, real) {
          if (real && this.modified && key in this.modified) return this.modified[key];
          return this.data[key];
        },
        set: function(key, value, rollback, silent_) {
          var valueWrapper = fields[key];
          if (!valueWrapper) {
            entityWarn(this, 'Field "' + key + '" is not defined, value has been ignored.');
            return false;
          }
          var result;
          var rollbackData = this.modified;
          if (valueWrapper === arrayField && rollbackData && key in rollbackData) value = arrayField(value, rollbackData[key]);
          var newValue = valueWrapper(value, this.data[key]);
          var curValue = this.data[key];
          var valueChanged = newValue !== curValue && (!newValue || !curValue || newValue.constructor !== Date || curValue.constructor !== Date || +newValue !== +curValue);
          if (valueChanged) updateField : {
            result = {};
            if (!entityType.idFields[key]) {
              if (rollback) {
                if (!rollbackData) this.modified = rollbackData = {};
                if (key in rollbackData === false) {
                  result.rollback = {
                    key: key,
                    value: undefined
                  };
                  rollbackData[key] = curValue;
                } else {
                  if (rollbackData[key] === newValue) {
                    result.rollback = {
                      key: key,
                      value: newValue
                    };
                    delete rollbackData[key];
                    if (!keys(rollbackData).length) this.modified = null;
                  }
                }
              } else {
                if (rollbackData && key in rollbackData) {
                  if (rollbackData[key] !== newValue) {
                    result.rollback = {
                      key: key,
                      value: rollbackData[key]
                    };
                    rollbackData[key] = newValue;
                    break updateField;
                  } else return false;
                }
              }
            }
            this.data[key] = newValue;
            if (this.fieldHandlers_ && this.fieldHandlers_[key]) {
              curValue.removeHandler(fieldDestroyHandlers[key], this);
              this.fieldHandlers_[key] = false;
            }
            if (newValue && newValue !== this && newValue instanceof Emitter) {
              newValue.addHandler(fieldDestroyHandlers[key], this);
              if (!this.fieldHandlers_) this.fieldHandlers_ = {};
              this.fieldHandlers_[key] = true;
            }
            result.key = key;
            result.value = curValue;
            result.delta = {};
            result.delta[key] = curValue;
          } else {
            if (!rollback && rollbackData && key in rollbackData) {
              result = {
                rollback: {
                  key: key,
                  value: rollbackData[key]
                }
              };
              delete rollbackData[key];
              if (!keys(rollbackData).length) this.modified = null;
            }
          }
          if (!silent_ && result) {
            var update = result.key;
            var delta = result.delta || {};
            var rollbackDelta;
            if (result.rollback) {
              rollbackDelta = {};
              rollbackDelta[result.rollback.key] = result.rollback.value;
            }
            if (calc(this, delta, rollbackDelta)) update = true;
            if (update) {
              this.emit_update(delta);
              result.delta = delta;
            }
            if (rollbackDelta) this.emit_rollbackUpdate(rollbackDelta);
          }
          return result || false;
        },
        update: function(data, rollback) {
          var update = false;
          var delta = {};
          if (data) {
            var rollbackDelta;
            var setResult;
            for (var key in data) {
              if (setResult = this.set(key, data[key], rollback, true)) {
                if (setResult.key) {
                  update = true;
                  delta[setResult.key] = setResult.value;
                }
                if (setResult.rollback) {
                  if (!rollbackDelta) rollbackDelta = {};
                  rollbackDelta[setResult.rollback.key] = setResult.rollback.value;
                }
              }
            }
            if (calc(this, delta, rollbackDelta)) update = true;
            if (update) this.emit_update(delta);
            if (rollbackDelta) this.emit_rollbackUpdate(rollbackDelta);
          }
          return update ? delta : false;
        },
        generateData: function() {
          return {};
        },
        reset: function() {
          this.update(this.generateData({}));
        },
        clear: function() {
          var data = {};
          for (var key in this.data) data[key] = undefined;
          return this.update(data);
        },
        commit: function(data) {
          var rollbackData = this.modified;
          this.modified = null;
          if (data) this.update(data);
          if (rollbackData) this.emit_rollbackUpdate(rollbackData);
        },
        rollback: function(keys) {
          var rollbackData = this.modified;
          if (rollbackData && keys) {
            if (!Array.isArray(keys)) keys = [ keys ];
            rollbackData = basis.object.slice(rollbackData, keys.reduce(function(res, item) {
              return res.concat(entityType.deps[item] || item);
            }, []));
          }
          this.update(rollbackData, true);
        },
        destroy: function() {
          if (this.fieldHandlers_) {
            for (var key in this.fieldHandlers_) if (this.fieldHandlers_[key]) this.data[key].removeHandler(fieldDestroyHandlers[key], this);
            this.fieldHandlers_ = null;
          }
          for (var key in entityType.indexes) {
            var indexDescriptor = entityType.indexes[key];
            var id = this[indexDescriptor.property];
            if (id != null) updateIndex(indexDescriptor.index, this, id, null);
          }
          if (all && all.has(this)) all.emit_itemsChanged({
            deleted: [ this ]
          });
          DataObject.prototype.destroy.call(this);
          this.data = NULL_INFO;
          this.modified = null;
        }
      });
    };
    function isEntity(value) {
      return value && value instanceof BaseEntity;
    }
    function createType(configOrName, fields) {
      if (this instanceof createType) basis.dev.warn("`new` operator was used with basis.entity.createType, it's a mistake");
      var config = configOrName || {};
      if (typeof configOrName == "string") {
        config = {
          name: config,
          fields: fields || {}
        };
      } else {
        if (fields) config = basis.object.merge(config, {
          fields: fields
        });
      }
      return new EntityTypeWrapper(config);
    }
    function createSetType(nameOrWrapper, wrapper) {
      if (this instanceof createSetType) basis.dev.warn("`new` operator was used with basis.entity.createSetType, it's a mistake");
      return arguments.length > 1 ? new EntitySetWrapper(wrapper, nameOrWrapper) : new EntitySetWrapper(nameOrWrapper);
    }
    module.exports = {
      isEntity: isEntity,
      createType: createType,
      createSetType: createSetType,
      validate: validateScheme,
      getTypeByName: function(typeName) {
        return namedTypes[typeName];
      },
      getIndexByName: function(name) {
        return namedIndexes[name];
      },
      get: function(typeName, value) {
        var Type = namedTypes[typeName];
        if (Type) return Type.get(value);
      },
      resolve: function(typeName, value) {
        var Type = namedTypes[typeName];
        if (Type) return Type(value);
      },
      getByIndex: function(indexName, id) {
        if (indexName in namedIndexes) return namedIndexes[indexName].get(id); else basis.dev.warn("basis.entity: index with name `" + indexName + "` doesn't exists");
      },
      NumericId: NumericId,
      NumberId: NumberId,
      IntId: IntId,
      StringId: StringId,
      Index: Index,
      CalculateField: CalculateField,
      ConcatStringField: ConcatStringField,
      calc: CalculateField,
      EntityType: EntityTypeWrapper,
      Entity: createEntityClass,
      BaseEntity: BaseEntity,
      EntitySetType: EntitySetWrapper,
      EntitySet: EntitySet,
      ReadOnlyEntitySet: ReadOnlyEntitySet,
      Collection: EntityCollection,
      Grouping: EntityGrouping
    };
  },
  "i.js": function(exports, module, basis, global, __filename, __dirname, require, resource) {
    basis.require("./j.js");
    basis.require("./4.js");
    var namespace = this.path;
    var document = global.document;
    var escapeValue = global.encodeURIComponent;
    var extend = basis.object.extend;
    var objectSlice = basis.object.slice;
    var objectMerge = basis.object.merge;
    var createTransportEvent = basis.net.createTransportEvent;
    var createRequestEvent = basis.net.createRequestEvent;
    var AbstractRequest = basis.net.AbstractRequest;
    var AbstractTransport = basis.net.AbstractTransport;
    var STATE = basis.data.STATE;
    var STATE_UNSENT = 0;
    var STATE_OPENED = 1;
    var STATE_LOADING = 3;
    var STATE_DONE = 4;
    var callbackData = {};
    function getCallback() {
      var name = "basisjsJsonpCallback" + parseInt(Math.random() * 1e11);
      global[name] = function(data) {
        callbackData[name] = data;
      };
      return name;
    }
    function fetchCallbackData(name) {
      var data = callbackData[name];
      delete callbackData[name];
      return data;
    }
    function releaseCallback(name) {
      delete callbackData[name];
      delete global[name];
    }
    function readyStateChangeHandler(readyState, abort) {
      var newState;
      var newStateData;
      var error = false;
      if (typeof readyState != "number") {
        if (!readyState || this.script !== readyState.target) return;
        error = readyState && readyState.type == "error";
        readyState = error || !this.script.readyState || /loaded|complete/.test(this.script.readyState) ? STATE_DONE : STATE_LOADING;
      }
      if (readyState == this.prevReadyState_) return;
      this.prevReadyState_ = readyState;
      this.emit_readyStateChanged(readyState);
      if (readyState == STATE_DONE) {
        this.clearTimeout();
        this.script.onload = this.script.onerror = this.script.onreadystatechange = null;
        if (this.script.parentNode) this.script.parentNode.removeChild(this.script);
        this.script = null;
        if (abort) {
          this.emit_abort();
          newState = this.stateOnAbort;
        } else {
          this.processResponse();
          if (this.isSuccessful() && !error) {
            newState = STATE.READY;
            this.emit_success(this.getResponseData());
          } else {
            newState = STATE.ERROR;
            newStateData = this.getResponseError();
            this.emit_failure(newStateData);
          }
        }
        this.emit_complete(this);
        var callback = this.callback;
        if (abort) {
          setTimeout(global[callback] = function() {
            releaseCallback(callback);
          }, 5 * 60 * 1e3);
        } else {
          releaseCallback(callback);
        }
      } else newState = STATE.PROCESSING;
      this.setState(newState, newStateData);
    }
    var Request = AbstractRequest.subclass({
      className: namespace + ".Request",
      timeout: 3e4,
      timer_: null,
      emit_readyStateChanged: createRequestEvent("readyStateChanged"),
      isIdle: function() {
        return !this.script;
      },
      isSuccessful: function() {
        return this.data.status == 200;
      },
      processResponse: function() {
        if (this.callback in callbackData) this.update({
          contentType: "application/javascript",
          data: fetchCallbackData(this.callback),
          status: 200
        });
      },
      getResponseData: function() {
        return this.data.data;
      },
      getResponseError: function() {
        return {
          code: "ERROR",
          msg: "ERROR"
        };
      },
      prepare: basis.fn.$true,
      prepareRequestData: function(requestData) {
        var params = [];
        var url = requestData.url;
        requestData = objectSlice(requestData);
        this.callback = getCallback();
        for (var key in requestData.params) {
          var value = requestData.params[key];
          if (value == null || value.toString() == null) continue;
          params.push(escapeValue(key) + "=" + escapeValue(value.toString()));
        }
        params.push(escapeValue(requestData.callbackParam) + "=" + escapeValue(this.callback));
        params = params.join("&");
        if (requestData.routerParams) url = url.replace(/:([a-z\_\-][a-z0-9\_\-]+)/gi, function(m, key) {
          if (key in requestData.routerParams) return requestData.routerParams[key]; else return m;
        });
        if (params) url += (url.indexOf("?") == -1 ? "?" : "&") + params;
        requestData.requestUrl = url;
        return requestData;
      },
      doRequest: function() {
        this.send(this.prepareRequestData(this.requestData));
      },
      send: function(requestData) {
        if (!document) throw "JSONP is not supported for current environment";
        var head = document.head || document.getElementByName("head")[0] || document.documentElement;
        var script = document.createElement("script");
        this.update({
          data: undefined,
          status: "",
          error: ""
        });
        this.script = script;
        script.async = true;
        script.src = requestData.requestUrl;
        script.charset = requestData.encoding;
        script.onload = script.onerror = script.onreadystatechange = readyStateChangeHandler.bind(this);
        this.prevReadyState_ = -1;
        this.emit_start();
        readyStateChangeHandler.call(this, STATE_UNSENT);
        this.setTimeout(this.timeout);
        head.appendChild(this.script);
      },
      repeat: function() {
        if (this.requestData) {
          this.abort();
          this.doRequest();
        }
      },
      abort: function() {
        if (!this.isIdle()) {
          this.clearTimeout();
          readyStateChangeHandler.call(this, STATE_DONE, true);
        }
      },
      setTimeout: function(timeout) {
        this.timer_ = setTimeout(this.timeoutAbort.bind(this), timeout);
      },
      clearTimeout: function() {
        if (this.timer_) this.timer_ = clearTimeout(this.timer_);
      },
      timeoutAbort: function() {
        this.update({
          error: {
            code: "TIMEOUT_ERROR",
            message: "Timeout error"
          }
        });
        this.emit_timeout(this);
        this.abort();
      },
      destroy: function() {
        this.abort();
        AbstractRequest.prototype.destroy.call(this);
      }
    });
    var Transport = AbstractTransport.subclass({
      className: namespace + ".Transport",
      requestClass: Request,
      emit_readyStateChanged: createRequestEvent("readyStateChanged"),
      encoding: null,
      params: null,
      callbackParam: "callback",
      init: function() {
        AbstractTransport.prototype.init.call(this);
        this.params = objectSlice(this.params);
      },
      setParam: function(name, value) {
        this.params[name] = value;
      },
      setParams: function(params) {
        this.clearParams();
        for (var key in params) this.setParam(key, params[key]);
      },
      removeParam: function(name) {
        delete this.params[name];
      },
      clearParams: function() {
        for (var key in this.params) delete this.params[key];
      },
      prepareRequestData: function(requestData) {
        var url = requestData.url || this.url;
        if (!url) throw new Error("URL is not defined");
        extend(requestData, {
          url: url,
          encoding: requestData.encoding || this.encoding,
          params: objectMerge(this.params, requestData.params),
          routerParams: requestData.routerParams,
          callbackParam: requestData.callbackParam || this.callbackParam,
          influence: requestData.influence
        });
        return requestData;
      }
    });
    module.exports = {
      Request: Request,
      Transport: Transport,
      request: function(config, successCallback, failureCallback) {
        if (typeof config == "string") config = {
          url: config
        };
        var transport = new Transport(config);
        transport.addHandler({
          success: successCallback && function(sender, req, data) {
            successCallback(data);
          },
          failure: failureCallback && function(sender, req, error) {
            failureCallback(error);
          },
          complete: function() {
            basis.nextTick(function() {
              transport.destroy();
            });
          }
        });
        transport.request();
      }
    };
  },
  "j.js": function(exports, module, basis, global, __filename, __dirname, require, resource) {
    basis.require("./3.js");
    basis.require("./4.js");
    var namespace = this.path;
    var extend = basis.object.extend;
    var arrayFrom = basis.array.from;
    var objectSlice = basis.object.slice;
    var objectMerge = basis.object.merge;
    var createEvent = basis.event.create;
    var STATE = basis.data.STATE;
    var DataObject = basis.data.Object;
    var Emitter = basis.event.Emitter;
    function createTransportEvent(eventName) {
      var event = createEvent(eventName);
      return function transportEvent() {
        event.apply(transportDispatcher, arguments);
        if (this.service) event.apply(this.service, arguments);
        event.apply(this, arguments);
      };
    }
    function createRequestEvent(eventName) {
      var event = createEvent(eventName);
      return function requestEvent() {
        var args = [ this ].concat(arrayFrom(arguments));
        event.apply(transportDispatcher, args);
        if (this.transport) this.transport["emit_" + eventName].apply(this.transport, args);
        event.apply(this, arguments);
      };
    }
    var inprogressTransports = [];
    var transportDispatcher = new Emitter({
      abort: function() {
        var result = arrayFrom(inprogressTransports);
        for (var i = 0; i < result.length; i++) result[i].abort();
        return result;
      },
      handler: {
        start: function(request) {
          basis.array.add(inprogressTransports, request.transport);
        },
        complete: function(request) {
          basis.array.remove(inprogressTransports, request.transport);
        }
      }
    });
    var AbstractRequest = DataObject.subclass({
      className: namespace + ".AbstractRequest",
      influence: null,
      initData: null,
      requestData: null,
      transport: null,
      stateOnAbort: STATE.UNDEFINED,
      emit_start: createRequestEvent("start"),
      emit_timeout: createRequestEvent("timeout"),
      emit_abort: createRequestEvent("abort"),
      emit_success: createRequestEvent("success"),
      emit_failure: createRequestEvent("failure"),
      emit_complete: createRequestEvent("complete"),
      emit_stateChanged: function(oldState) {
        DataObject.prototype.emit_stateChanged.call(this, oldState);
        if (this.influence) for (var i = 0; i < this.influence.length; i++) this.influence[i].setState(this.state, this.state.data);
      },
      init: function() {
        DataObject.prototype.init.call(this);
        this.influence = [];
      },
      setInfluence: function(influence) {
        this.influence = arrayFrom(influence);
      },
      clearInfluence: function() {
        this.influence = null;
      },
      doRequest: basis.fn.$undef,
      getResponseData: basis.fn.$undef,
      destroy: function() {
        DataObject.prototype.destroy.call(this);
        this.initData = null;
        this.requestData = null;
        this.clearInfluence();
      }
    });
    var TRANSPORT_REQUEST_HANDLER = {
      start: function(sender, request) {
        basis.array.add(this.inprogressRequests, request);
      },
      complete: function(sender, request) {
        basis.array.remove(this.inprogressRequests, request);
      }
    };
    var TRANSPORT_POOL_LIMIT_HANDLER = {
      complete: function() {
        var nextRequest = this.requestQueue.shift();
        if (nextRequest) {
          basis.nextTick(function() {
            nextRequest.doRequest();
          });
        }
      }
    };
    var AbstractTransport = Emitter.subclass({
      className: namespace + ".AbstractTransport",
      requestClass: AbstractRequest,
      requests: null,
      poolLimit: null,
      poolHashGetter: basis.fn.$true,
      emit_start: createTransportEvent("start"),
      emit_timeout: createTransportEvent("timeout"),
      emit_abort: createTransportEvent("abort"),
      emit_success: createTransportEvent("success"),
      emit_failure: createTransportEvent("failure"),
      emit_complete: createTransportEvent("complete"),
      init: function() {
        this.requests = {};
        this.requestQueue = [];
        this.inprogressRequests = [];
        Emitter.prototype.init.call(this);
        this.addHandler(TRANSPORT_REQUEST_HANDLER, this);
        if (this.poolLimit) this.addHandler(TRANSPORT_POOL_LIMIT_HANDLER, this);
      },
      getRequestByHash: function(requestHashId) {
        var request = this.requests[requestHashId];
        if (!request) {
          for (var id in this.requests) if (this.requests[id].isIdle() && this.requestQueue.indexOf(this.requests[id]) == -1) {
            request = this.requests[id];
            delete this.requests[id];
            break;
          }
          if (!request) request = new this.requestClass({
            transport: this
          });
          this.requests[requestHashId] = request;
        }
        return request;
      },
      prepare: basis.fn.$true,
      prepareRequestData: basis.fn.$self,
      request: function(config) {
        if (!this.prepare()) return;
        var requestData = objectSlice(config);
        var requestHashId = this.poolHashGetter(this.prepareRequestData(requestData));
        var request = this.getRequestByHash(requestHashId, true);
        if (request.initData) request.abort();
        request.initData = requestData;
        request.requestData = requestData;
        request.setInfluence(requestData.influence || this.influence);
        if (this.poolLimit && this.inprogressRequests.length >= this.poolLimit) {
          this.requestQueue.push(request);
          request.setState(STATE.PROCESSING);
        } else request.doRequest();
        return request;
      },
      abort: function() {
        for (var i = 0, request; request = this.inprogressRequests[i]; i++) request.abort();
        for (var i = 0, request; request = this.requestQueue[i]; i++) request.setState(STATE.ERROR);
        this.inprogressRequests = [];
        this.requestQueue = [];
      },
      stop: function() {
        if (!this.stopped) {
          this.stoppedRequests = this.inprogressRequests.concat(this.requestQueue);
          this.abort();
          this.stopped = true;
        }
      },
      resume: function() {
        if (this.stoppedRequests) {
          for (var i = 0, request; request = this.stoppedRequests[i]; i++) request.transport.request(request.initData);
          this.stoppedRequests = null;
        }
        this.stopped = false;
      },
      destroy: function() {
        for (var i in this.requests) this.requests[i].destroy();
        this.requests = {};
        this.inprogressRequests = null;
        this.requestQueue = null;
        this.stoppedRequests = null;
        Emitter.prototype.destroy.call(this);
      }
    });
    module.exports = {
      createTransportEvent: createTransportEvent,
      createRequestEvent: createRequestEvent,
      transportDispatcher: transportDispatcher,
      AbstractRequest: AbstractRequest,
      AbstractTransport: AbstractTransport
    };
  },
  "k.js": function(exports, module, basis, global, __filename, __dirname, require, resource) {
    basis.require("./3.js");
    basis.require("./l.js");
    basis.require("./n.js");
    var namespace = this.path;
    var createEvent = basis.event.create;
    var createAction = basis.net.action.create;
    var Emitter = basis.event.Emitter;
    var AjaxTransport = basis.net.ajax.Transport;
    var SERVICE_HANDLER = {
      start: function(service, request) {
        basis.array.add(this.inprogressTransports, request.transport);
      },
      complete: function(service, request) {
        basis.array.remove(this.inprogressTransports, request.transport);
      }
    };
    var Service = Emitter.subclass({
      className: namespace + ".Service",
      inprogressTransports: null,
      transportClass: AjaxTransport,
      emit_sessionOpen: createEvent("sessionOpen"),
      emit_sessionClose: createEvent("sessionClose"),
      emit_sessionFreeze: createEvent("sessionFreeze"),
      emit_sessionUnfreeze: createEvent("sessionUnfreeze"),
      isSecure: false,
      prepare: basis.fn.$true,
      signature: basis.fn.$undef,
      isSessionExpiredError: basis.fn.$false,
      init: function() {
        if (this.requestClass) basis.dev.warn(namespace + ".Service#requestClass is not supported; set requestClass via transportClass");
        Emitter.prototype.init.call(this);
        this.inprogressTransports = [];
        var TransportClass = this.transportClass;
        this.transportClass = TransportClass.subclass({
          service: this,
          needSignature: this.isSecure,
          emit_failure: function(request, error) {
            TransportClass.prototype.emit_failure.call(this, request, error);
            if (this.needSignature && this.service.isSessionExpiredError(request)) {
              this.service.freeze();
              this.service.stoppedTransports.push(this);
              this.stop();
            }
          },
          request: function(requestData) {
            if (!this.service.prepare(this, requestData)) return;
            if (this.needSignature && !this.service.sign(this)) return;
            return TransportClass.prototype.request.call(this, requestData);
          }
        });
        this.addHandler(SERVICE_HANDLER);
      },
      sign: function(transport) {
        if (this.sessionKey) {
          this.signature(transport, this.sessionData);
          return true;
        } else {
          basis.dev.warn("Request ignored. Service have no session key");
        }
      },
      openSession: function(sessionKey, sessionData) {
        this.sessionKey = sessionKey;
        this.sessionData = sessionData;
        this.unfreeze();
        this.emit_sessionOpen();
      },
      closeSession: function() {
        this.freeze();
        this.emit_sessionClose();
      },
      freeze: function() {
        if (!this.sessionKey) return;
        this.sessionKey = null;
        this.sessionData = null;
        this.stoppedTransports = this.inprogressTransports.filter(function(transport) {
          return transport.needSignature;
        });
        for (var i = 0, transport; transport = this.inprogressTransports[i]; i++) transport.stop();
        this.emit_sessionFreeze();
      },
      unfreeze: function() {
        if (this.stoppedTransports) for (var i = 0, transport; transport = this.stoppedTransports[i]; i++) transport.resume();
        this.emit_sessionUnfreeze();
      },
      createTransport: function(config) {
        return new this.transportClass(config);
      },
      createAction: function(config) {
        return createAction(basis.object.complete({
          service: this
        }, config));
      },
      destroy: function() {
        this.inprogressTransports = null;
        this.stoppedTransports = null;
        this.sessionKey = null;
        this.sessionData = null;
        Emitter.prototype.destroy.call(this);
      }
    });
    module.exports = {
      Service: Service
    };
  },
  "l.js": function(exports, module, basis, global, __filename, __dirname, require, resource) {
    basis.require("./m.js");
    basis.require("./j.js");
    basis.require("./4.js");
    var namespace = this.path;
    var ua = basis.ua;
    var escapeValue = global.encodeURIComponent;
    var FormData = global.FormData;
    var extend = basis.object.extend;
    var objectSlice = basis.object.slice;
    var objectMerge = basis.object.merge;
    var createTransportEvent = basis.net.createTransportEvent;
    var createRequestEvent = basis.net.createRequestEvent;
    var AbstractRequest = basis.net.AbstractRequest;
    var AbstractTransport = basis.net.AbstractTransport;
    var STATE_UNSENT = 0;
    var STATE_OPENED = 1;
    var STATE_HEADERS_RECEIVED = 2;
    var STATE_LOADING = 3;
    var STATE_DONE = 4;
    var STATE = basis.data.STATE;
    var METHODS = "HEAD GET POST PUT PATCH DELETE TRACE LINK UNLINK CONNECT".split(" ");
    var IS_POST_REGEXP = /POST/i;
    var IS_METHOD_WITH_BODY = /^(POST|PUT|PATCH|LINK|UNLINK)$/i;
    var XHRSupport = "native";
    var createXmlHttpRequest = function() {
      if ("XMLHttpRequest" in global) return function() {
        return new XMLHttpRequest;
      };
      var ActiveXObject = global.ActiveXObject;
      if (ActiveXObject) {
        var progID = [ "MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP" ];
        for (var i = 0; XHRSupport = progID[i]; i++) try {
          if (new ActiveXObject(XHRSupport)) return function() {
            return new ActiveXObject(XHRSupport);
          };
        } catch (e) {}
      }
      throw new Error(XHRSupport = "XMLHttpRequest is not supported!");
    }();
    function setRequestHeaders(xhr, requestData) {
      var headers = {};
      if (IS_METHOD_WITH_BODY.test(requestData.method)) {
        if (!FormData || requestData.postBody instanceof FormData == false) headers["Content-Type"] = requestData.contentType + (requestData.encoding ? ";charset=" + requestData.encoding : "");
      } else {
        if (ua.test("ie")) {
          headers["If-Modified-Since"] = "Thu, 01 Jan 1970 00:00:00 GMT";
        }
      }
      basis.object.iterate(extend(headers, requestData.headers), function(key, value) {
        if (value != null && typeof value != "function") this.setRequestHeader(key, value);
      }, xhr);
    }
    function setResponseType(xhr, requestData) {
      if (requestData.responseType && requestData.asynchronous && "responseType" in xhr) try {
        xhr.responseType = requestData.responseType;
      } catch (e) {
        basis.dev.warn("Can't set resposeType `" + requestData.responseType + "` to XMLHttpRequest", requestData);
      }
    }
    function safeJsonParse(content, url) {
      try {
        return basis.json.parse(content);
      } catch (e) {
        basis.dev.warn("basis.net.ajax: Can't parse JSON from " + url, {
          url: url,
          content: content
        });
      }
    }
    function readyStateChangeHandler(readyState) {
      var xhr = this.xhr;
      var newState;
      var newStateData;
      var aborted;
      this.sendDelayTimer_ = clearTimeout(this.sendDelayTimer_);
      if (!xhr) return;
      if (typeof readyState != "number") readyState = xhr.readyState;
      if (readyState == this.prevReadyState_) return;
      this.prevReadyState_ = readyState;
      if (this.debug) basis.dev.log("State: (" + readyState + ") " + [ "UNSENT", "OPENED", "HEADERS_RECEIVED", "LOADING", "DONE" ][readyState]);
      this.emit_readyStateChanged(readyState);
      if (readyState == STATE_DONE) {
        this.clearTimeout();
        xhr.onreadystatechange = basis.fn.$undef;
        aborted = xhr.status == 0;
        if (!aborted && !xhr.responseType) aborted = typeof xhr.responseText == "unknown" || !xhr.responseText && !xhr.getAllResponseHeaders();
        if (aborted) {
          this.emit_abort();
          newState = this.stateOnAbort;
        } else {
          this.processResponse();
          if (this.isSuccessful()) {
            newState = STATE.READY;
            this.emit_success(this.getResponseData());
          } else {
            newState = STATE.ERROR;
            newStateData = this.getResponseError();
            if (!newStateData && this.data.error) {
              basis.dev.warn("Request#getResponseError should not update request data, but returns error data. Please, fix your method implementation, as data updating is deprecated behaviour.");
              newStateData = this.data.error;
            }
            this.emit_failure(newStateData);
          }
        }
        this.emit_complete(this);
      } else newState = STATE.PROCESSING;
      this.setState(newState, newStateData);
    }
    var Request = AbstractRequest.subclass({
      className: namespace + ".Request",
      requestStartTime: 0,
      timeout: 3e4,
      timer_: null,
      sendDelay: null,
      sendDelayTimer_: null,
      lastRequestUrl_: null,
      debug: false,
      emit_readyStateChanged: createRequestEvent("readyStateChanged"),
      init: function() {
        AbstractRequest.prototype.init.call(this);
        this.xhr = createXmlHttpRequest();
      },
      isIdle: function() {
        return this.xhr.readyState == STATE_DONE || this.xhr.readyState == STATE_UNSENT;
      },
      isSuccessful: function() {
        var status = this.xhr.status;
        return status >= 200 && status < 300 || status == 304;
      },
      processResponse: function() {
        this.update({
          contentType: this.xhr.getResponseHeader("content-type"),
          status: this.xhr.status
        });
      },
      getResponseData: function() {
        var xhr = this.xhr;
        if (!xhr.responseType) if (this.responseType == "json" || /^application\/json/i.test(this.data.contentType)) return safeJsonParse(xhr.responseText, this.lastRequestUrl_);
        if ("response" in xhr) return xhr.response;
        return xhr.responseText;
      },
      processErrorResponse: function() {
        basis.dev.warn(namespace + ".Request#processErrorResponse is deprecated now, use Request#getResponseError instead");
        return this.getResponseError();
      },
      getResponseError: function() {
        return {
          code: "SERVER_ERROR",
          msg: !this.responseType ? this.xhr.responseText : this.xhr.response || this.xhr.statusText || "Error"
        };
      },
      prepare: basis.fn.$true,
      prepareRequestData: function(requestData) {
        var params = [];
        var url = requestData.url;
        requestData = objectSlice(requestData);
        for (var key in requestData.params) {
          var value = requestData.params[key];
          if (value == null || value.toString() == null) continue;
          params.push(escapeValue(key) + "=" + escapeValue(value.toString()));
        }
        params = params.join("&");
        if (!requestData.postBody && IS_METHOD_WITH_BODY.test(requestData.method)) {
          requestData.postBody = params || "";
          params = "";
        }
        if (requestData.routerParams) url = url.replace(/:([a-z\_\-][a-z0-9\_\-]+)/gi, function(m, key) {
          if (key in requestData.routerParams) return requestData.routerParams[key]; else return m;
        });
        if (params) url += (url.indexOf("?") == -1 ? "?" : "&") + params;
        requestData.requestUrl = url;
        return requestData;
      },
      doRequest: function() {
        this.send(this.prepareRequestData(this.requestData));
      },
      send: function(requestData) {
        this.update({
          contentType: "",
          status: ""
        });
        if (ua.test("gecko1.8.1-") && requestData.asynchronous) this.xhr = createXmlHttpRequest();
        this.emit_start();
        var xhr = this.xhr;
        this.prevReadyState_ = -1;
        xhr.onreadystatechange = readyStateChangeHandler.bind(this);
        if (!requestData.asynchronous) readyStateChangeHandler.call(this, STATE_UNSENT);
        xhr.open(requestData.method, requestData.requestUrl, requestData.asynchronous);
        this.lastRequestUrl_ = requestData.requestUrl;
        setResponseType(xhr, requestData);
        this.responseType = requestData.responseType || "";
        setRequestHeaders(xhr, requestData);
        this.setTimeout(this.timeout);
        var postBody = requestData.postBody;
        if (IS_METHOD_WITH_BODY.test(requestData.method) && ua.test("ie9-")) {
          if (typeof postBody == "object" && typeof postBody.documentElement != "undefined" && typeof postBody.xml == "string") postBody = postBody.xml; else if (typeof postBody == "string") postBody = postBody.replace(/\r/g, ""); else if (postBody == null || postBody == "") postBody = "[No data]";
        }
        if (this.sendDelay) {
          if (this.sendDelayTimer_) this.sendDelayTimer_ = clearTimeout(this.sendDelayTimer_);
          this.sendDelayTimer_ = setTimeout(function() {
            this.sendDelayTimer_ = null;
            if (this.xhr === xhr && xhr.readyState == STATE_OPENED) xhr.send(postBody);
          }.bind(this), this.sendDelay);
        } else xhr.send(postBody);
        if (this.debug) basis.dev.log("Request over, waiting for response");
        return true;
      },
      repeat: function() {
        if (this.requestData) {
          this.abort();
          this.doRequest();
        }
      },
      abort: function() {
        if (!this.isIdle()) {
          this.clearTimeout();
          this.xhr.abort();
          if (this.xhr.readyState != STATE_DONE && this.xhr.readyState != STATE_UNSENT) readyStateChangeHandler.call(this, STATE_DONE);
        }
      },
      setTimeout: function(timeout) {
        if (!this.xhr.asynchronous) return;
        if ("ontimeout" in this.xhr) {
          this.xhr.timeout = timeout;
          this.xhr.ontimeout = this.timeoutAbort.bind(this);
        } else this.timer_ = setTimeout(this.timeoutAbort.bind(this), timeout);
      },
      clearTimeout: function() {
        if (this.timer_) this.timer_ = clearTimeout(this.timer_);
      },
      timeoutAbort: function() {
        this.update({
          error: {
            code: "TIMEOUT_ERROR",
            message: "Timeout error"
          }
        });
        this.emit_timeout(this);
        this.abort();
      },
      destroy: function() {
        this.abort();
        this.xhr = null;
        AbstractRequest.prototype.destroy.call(this);
      }
    });
    var Transport = AbstractTransport.subclass({
      className: namespace + ".Transport",
      requestClass: Request,
      emit_readyStateChanged: createTransportEvent("readyStateChanged"),
      asynchronous: true,
      method: "GET",
      contentType: "application/x-www-form-urlencoded",
      encoding: null,
      requestHeaders: basis.Class.extensibleProperty(),
      responseType: "",
      params: null,
      routerParams: null,
      url: "",
      postBody: null,
      init: function() {
        AbstractTransport.prototype.init.call(this);
        this.params = objectSlice(this.params);
        this.routerParams = objectSlice(this.routerParams);
      },
      setParam: function(name, value) {
        this.params[name] = value;
      },
      setParams: function(params) {
        this.clearParams();
        for (var key in params) this.setParam(key, params[key]);
      },
      removeParam: function(name) {
        delete this.params[name];
      },
      clearParams: function() {
        for (var key in this.params) delete this.params[key];
      },
      prepareRequestData: function(requestData) {
        if (!requestData.url && !this.url) throw new Error("URL is not defined");
        extend(requestData, {
          headers: objectMerge(this.requestHeaders, requestData.headers),
          params: objectMerge(this.params, requestData.params),
          routerParams: objectMerge(this.routerParams, requestData.routerParams)
        });
        basis.object.complete(requestData, {
          asynchronous: this.asynchronous,
          url: this.url,
          method: this.method,
          contentType: this.contentType,
          encoding: this.encoding,
          postBody: this.postBody,
          responseType: this.responseType
        });
        return requestData;
      }
    });
    module.exports = {
      Request: Request,
      Transport: Transport,
      request: function(config, successCallback, failureCallback) {
        if (typeof config == "string") config = {
          url: config,
          asynchronous: !!(successCallback || failureCallback)
        };
        var transport = new Transport(config);
        transport.addHandler({
          success: successCallback && function(sender, req, data) {
            successCallback(data);
          },
          failure: failureCallback && function(sender, req, error) {
            failureCallback(error);
          },
          complete: function() {
            basis.nextTick(function() {
              transport.destroy();
            });
          }
        });
        var req = transport.request();
        if (!req.requestData.asynchronous) return req.getResponseData();
      }
    };
  },
  "m.js": function(exports, module, basis, global, __filename, __dirname, require, resource) {
    var namespace = this.path;
    var document = global.document;
    var userAgent = global.navigator && global.navigator.userAgent || "";
    var opera = global.opera;
    var versions = {};
    var answers = {};
    var browserName = "unknown";
    var browserPrettyName = "unknown";
    var browserNames = {
      MSIE: [ "Internet Explorer", "msie", "ie" ],
      Gecko: [ "Gecko", "gecko" ],
      Safari: [ "Safari", "safari" ],
      "iPhone OS": [ "iPhone", "iphone" ],
      AdobeAir: [ "AdobeAir", "air" ],
      AppleWebKit: [ "WebKit" ],
      Chrome: [ "Chrome", "chrome" ],
      FireFox: [ "FireFox", "firefox", "ff" ],
      Iceweasel: [ "FireFox", "firefox", "ff" ],
      Shiretoko: [ "FireFox", "firefox", "ff" ],
      Opera: [ "Opera", "opera" ]
    };
    for (var name in browserNames) {
      if (name == "MSIE" && opera) continue;
      if (name == "Safari" && /chrome/i.test(userAgent)) continue;
      if (name == "AppleWebKit" && /iphone/i.test(userAgent)) continue;
      if (userAgent.match(new RegExp(name + "." + "(\\d+(\\.\\d+)*)", "i"))) {
        var names = browserNames[name];
        var version = opera && typeof opera.version == "function" ? opera.version() : RegExp.$1;
        var verNumber = versionToInt(version);
        browserName = names[0] + verNumber;
        browserPrettyName = names[0] + " " + version;
        for (var j = 0; j < names.length; j++) versions[names[j].toLowerCase()] = verNumber;
      }
    }
    function versionToInt(version) {
      var base = 1e6;
      var part = String(version).split(".");
      for (var i = 0, result = 0; i < 4 && i < part.length; i++, base /= 100) result += part[i] * base;
      return result;
    }
    function testBrowser(browserName) {
      var forTest = browserName.toLowerCase();
      if (forTest in answers) return answers[forTest];
      var m = forTest.match(/^([a-z]+)(([\d\.]+)([+-=]?))?$/i);
      if (m) {
        answers[forTest] = false;
        var name = m[1].toLowerCase();
        var version = versionToInt(m[3]);
        var operation = m[4] || "=";
        var cmpVersion = versions[name];
        if (cmpVersion) return answers[forTest] = !version || operation == "=" && cmpVersion == version || operation == "+" && cmpVersion >= version || operation == "-" && cmpVersion < version;
      } else {
        basis.dev.warn("Bad browser version description in Browser.test() function: " + forTest);
      }
      return false;
    }
    var cookies = {
      set: function(name, value, expire, path, domain) {
        document.cookie = name + "=" + (value == null ? "" : escape(value)) + ";path=" + (path || (location.pathname.indexOf("/") == 0 ? "" : "/") + location.pathname) + (expire ? ";expires=" + (new Date(Date.now() + expire * 1e3)).toGMTString() : "") + (domain ? ";domain=" + domain : "");
      },
      get: function(name) {
        var m = document.cookie.match(new RegExp("(^|;)\\s*" + name + "\\s*=\\s*(.*?)\\s*(;|$)"));
        return m && unescape(m[2]);
      },
      remove: function(name, path, domain) {
        document.cookie = name + "=;expires=" + (new Date(0)).toGMTString() + ";path=" + (path || (location.pathname.indexOf("/") == 0 ? "" : "/") + location.pathname) + (domain ? ";domain=" + domain : "");
      }
    };
    module.exports = {
      prettyName: browserPrettyName,
      is: testBrowser,
      test: function() {
        return basis.array(arguments).some(testBrowser);
      },
      cookies: cookies
    };
  },
  "n.js": function(exports, module, basis, global, __filename, __dirname, require, resource) {
    basis.require("./4.js");
    basis.require("./l.js");
    var STATE_UNDEFINED = basis.data.STATE.UNDEFINED;
    var STATE_READY = basis.data.STATE.READY;
    var STATE_PROCESSING = basis.data.STATE.PROCESSING;
    var STATE_ERROR = basis.data.STATE.ERROR;
    var nothingToDo = function() {};
    var CALLBACK_HANDLER = {
      start: function(transport, request) {
        var origin = request.requestData.origin;
        this.start.call(request.requestData.origin);
        if (origin.state != STATE_PROCESSING) origin.setState(STATE_PROCESSING);
      },
      success: function(transport, request, data) {
        var origin = request.requestData.origin;
        this.success.call(origin, data);
        if (origin.state == STATE_PROCESSING) origin.setState(STATE_READY);
      },
      failure: function(transport, request, error) {
        var origin = request.requestData.origin;
        this.failure.call(origin, error);
        if (origin.state == STATE_PROCESSING) origin.setState(STATE_ERROR, error);
      },
      abort: function(transport, request) {
        var origin = request.requestData.origin;
        this.abort.call(origin);
        if (origin.state == STATE_PROCESSING) origin.setState(STATE_UNDEFINED);
      },
      complete: function(transport, request) {
        this.complete.call(request.requestData.origin);
      }
    };
    var DEFAULT_CALLBACK = {
      start: nothingToDo,
      success: nothingToDo,
      failure: nothingToDo,
      abort: nothingToDo,
      complete: nothingToDo
    };
    function resolveTransport(config) {
      if (config.transport) return config.transport;
      if (config.service) return config.service.createTransport(config);
      if (config.createTransport) return config.createTransport(config);
      return new basis.net.ajax.Transport(config);
    }
    function createAction(config) {
      config = basis.object.extend({
        prepare: nothingToDo,
        request: nothingToDo
      }, config);
      var fn = basis.object.splice(config, [ "prepare", "request" ]);
      var callback = basis.object.merge(DEFAULT_CALLBACK, basis.object.splice(config, [ "start", "success", "failure", "abort", "complete" ]));
      var getTransport = basis.fn.lazyInit(function() {
        var transport = resolveTransport(config);
        transport.addHandler(CALLBACK_HANDLER, callback);
        return transport;
      });
      return function action() {
        if (this.state != STATE_PROCESSING) {
          fn.prepare.apply(this, arguments);
          this.request = getTransport().request(basis.object.complete({
            origin: this
          }, fn.request.apply(this, arguments)));
        } else {
          basis.dev.warn(this + " has not ready state. Operation aborted");
        }
      };
    }
    module.exports = {
      create: createAction
    };
  },
  "o.js": function(exports, module, basis, global, __filename, __dirname, require, resource) {
    basis.require("./8.js");
    var namespace = this.path;
    var ns = basis.namespace(String(namespace));
    var location = global.location;
    var document = global.document;
    var docMode = document.documentMode;
    var eventSupport = "onhashchange" in global && (docMode === undefined || docMode > 7);
    var CHECK_INTERVAL = 50;
    var arrayFrom = basis.array.from;
    var routes = {};
    var matched = {};
    var started = false;
    var currentPath;
    var timer;
    function pathToRegExp(route) {
      var value = String(route || "");
      function findWord(offset) {
        return value.substr(offset).match(/^\w+/);
      }
      function parse(offset, stopChar) {
        var result = "";
        var res;
        for (var i = offset; i < value.length; i++) {
          var c = value.charAt(i);
          switch (c) {
            case stopChar:
              return {
                result: result,
                offset: i
              };
            case "\\":
              result += "\\" + value.charAt(++i);
              break;
            case "|":
              result += stopChar != ")" ? "\\|" : "|";
              break;
            case "(":
              if (res = parse(i + 1, ")")) {
                i = res.offset;
                result += "(?:" + res.result + ")?";
              } else {
                result += "\\(";
              }
              break;
            case ":":
              if (res = findWord(i + 1)) {
                i += res[0].length;
                result += "([^/]+)";
              } else {
                result += ":";
              }
              break;
            case "*":
              if (res = findWord(i + 1)) {
                i += res[0].length;
                result += "(.*?)";
              } else {
                result += "\\*";
              }
              break;
            default:
              result += basis.string.forRegExp(c);
          }
        }
        return stopChar ? null : result;
      }
      return new RegExp("^" + parse(0) + "$", "i");
    }
    function startWatch() {
      if (eventSupport) basis.dom.event.addHandler(global, "hashchange", checkUrl); else timer = setInterval(checkUrl, CHECK_INTERVAL);
    }
    function stopWatch() {
      if (eventSupport) basis.dom.event.removeHandler(global, "hashchange", checkUrl); else clearInterval(timer);
    }
    function start() {
      if (!started) {
        startWatch();
        started = true;
        if (ns.debug) basis.dev.log(namespace + " started");
        checkUrl();
      }
    }
    function stop() {
      if (started) {
        stopWatch();
        started = false;
        if (ns.debug) basis.dev.log(namespace + " stopped");
      }
    }
    function checkUrl() {
      var newPath = location.hash.substr(1) || "";
      if (newPath != currentPath) {
        var inserted = [];
        var deleted = [];
        var log = [];
        currentPath = newPath;
        for (var path in routes) {
          var route = routes[path];
          var match = newPath.match(route.regexp);
          if (match) {
            if (!matched[path]) inserted.push(route);
            matched[path] = match;
          } else {
            if (matched[path]) {
              deleted.push(route);
              delete matched[path];
            }
          }
        }
        for (var i = 0, route; route = deleted[i]; i++) {
          var callbacks = arrayFrom(route.callbacks);
          for (var j = 0, item; item = callbacks[j]; j++) if (item.callback.leave) {
            item.callback.leave.call(item.context);
            log.push("\n", {
              type: "leave",
              path: route.source,
              cb: item,
              route: route
            });
          }
        }
        for (var i = 0, route; route = inserted[i]; i++) {
          var callbacks = arrayFrom(route.callbacks);
          for (var j = 0, item; item = callbacks[j]; j++) if (item.callback.enter) {
            item.callback.enter.call(item.context);
            log.push("\n", {
              type: "enter",
              path: route.source,
              cb: item,
              route: route
            });
          }
        }
        for (var path in matched) {
          var route = routes[path];
          var args = arrayFrom(matched[path], 1);
          var callbacks = arrayFrom(route.callbacks);
          for (var i = 0, item; item = callbacks[i]; i++) if (item.callback.match) {
            item.callback.match.apply(item.context, args);
            log.push("\n", {
              type: "match",
              path: route.source,
              cb: item,
              route: route,
              args: args
            });
          }
        }
        if (ns.debug) basis.dev.info.apply(basis.dev, [ namespace + ': hash changed to "' + newPath + '"' ].concat(log.length ? log : "<no matches>"));
      }
    }
    function add(path, callback, context) {
      var route = routes[path];
      var config;
      if (!route) {
        route = routes[path] = {
          source: path,
          callbacks: [],
          regexp: Object.prototype.toString.call(path) != "[object RegExp]" ? pathToRegExp(path) : path
        };
        if (typeof currentPath == "string") {
          var match = currentPath.match(route.regexp);
          if (match) matched[path] = match;
        }
      }
      config = {
        cb_: callback,
        context: context,
        callback: typeof callback != "function" ? callback || {} : {
          match: callback
        }
      };
      route.callbacks.push(config);
      if (path in matched) {
        if (config.callback.enter) config.callback.enter.call(context);
        if (config.callback.match) config.callback.match.apply(context, arrayFrom(matched[path], 1));
      }
    }
    function remove(path, callback, context) {
      var route = routes[path];
      if (route) {
        var idx = -1;
        for (var i = 0, cb; cb = route.callbacks[i]; i++) if (cb.cb_ === callback && cb.context === context) {
          route.callbacks.splice(i, 1);
          if (!route.callbacks.length) {
            delete routes[path];
            delete matched[path];
          }
          break;
        }
      }
    }
    function navigate(path, replace) {
      if (replace) location.replace(location.pathname + "#" + path); else location.hash = path;
      if (started) checkUrl();
    }
    module.exports = {
      debug: false,
      add: add,
      remove: remove,
      stop: stop,
      start: start,
      checkUrl: checkUrl,
      navigate: navigate
    };
  },
  "p.js": function(exports, module, basis, global, __filename, __dirname, require, resource) {
    var document = global.document || {
      title: "unknown"
    };
    var appTitle = document.title;
    var appInit = basis.fn.$undef;
    var appInjectPoint;
    var appEl;
    function updateTitle(value) {
      document.title = value;
    }
    function resolveNode(ref) {
      return typeof ref == "string" ? document.getElementById(ref) : ref;
    }
    function replaceNode(oldChild, newChild) {
      oldChild.parentNode.replaceChild(newChild, oldChild);
    }
    var createApp = basis.fn.lazyInit(function(config) {
      var readyHandlers = [];
      var inited = false;
      var app = {
        inited: false,
        setTitle: function(title) {
          if (title != appTitle) {
            if (appTitle instanceof basis.Token) appTitle.detach(updateTitle);
            if (title instanceof basis.Token) {
              title.attach(updateTitle);
              updateTitle(title.get());
            } else updateTitle(title);
            appTitle = title;
          }
        },
        setElement: function(el) {
          var newAppEl = resolveNode(el);
          if (appEl == newAppEl) return;
          if (appEl) {
            replaceNode(appEl, newAppEl);
            return;
          } else appEl = newAppEl;
          if (!appInjectPoint) appInjectPoint = {
            type: "append",
            node: document.body
          };
          var node = resolveNode(appInjectPoint.node);
          if (!node) return;
          if (appInjectPoint.type == "append") node.appendChild(appEl); else replaceNode(node, appEl);
        },
        ready: function(fn, context) {
          if (inited) fn.call(context, app); else readyHandlers.push({
            fn: fn,
            context: context
          });
        }
      };
      for (var key in config) {
        var value = config[key];
        switch (key) {
          case "title":
            app.setTitle(value);
            break;
          case "container":
            appInjectPoint = {
              type: "append",
              node: value
            };
            break;
          case "replace":
            appInjectPoint = {
              type: "replace",
              node: value
            };
            break;
          case "element":
            appEl = value;
            break;
          case "init":
            appInit = typeof value == "function" ? value : appInit;
            break;
          default:
            basis.dev.warn("Unknown config property `" + key + "` for app, value:", value);
        }
      }
      basis.ready(function() {
        var insertEl = appEl;
        var initResult = appInit.call(app);
        if (initResult) {
          if (initResult.element) insertEl = initResult.element; else insertEl = initResult;
        }
        appEl = null;
        app.setElement(insertEl);
        inited = true;
        app.inited = true;
        var handler;
        while (handler = readyHandlers.shift()) handler.fn.call(handler.context, app);
      });
      return app;
    });
    module.exports = {
      create: createApp
    };
  }
};

(function createBasisInstance(global, __basisFilename, __config) {
  "use strict";
  var VERSION = "1.3.2";
  var document = global.document;
  var toString = Object.prototype.toString;
  function genUID(len) {
    function base36(val) {
      return Math.round(val).toString(36);
    }
    var result = base36(10 + 25 * Math.random());
    if (!len) len = 16;
    while (result.length < len) result += base36(new Date * Math.random());
    return result.substr(0, len);
  }
  function extend(dest, source) {
    for (var key in source) dest[key] = source[key];
    return dest;
  }
  function complete(dest, source) {
    for (var key in source) if (key in dest == false) dest[key] = source[key];
    return dest;
  }
  function keys(object) {
    var result = [];
    for (var key in object) result.push(key);
    return result;
  }
  function values(object) {
    var result = [];
    for (var key in object) result.push(object[key]);
    return result;
  }
  function slice(source, keys) {
    var result = {};
    if (!keys) return extend(result, source);
    for (var i = 0, key; key = keys[i++]; ) if (key in source) result[key] = source[key];
    return result;
  }
  function splice(source, keys) {
    var result = {};
    if (!keys) return extend(result, source);
    for (var i = 0, key; key = keys[i++]; ) if (key in source) {
      result[key] = source[key];
      delete source[key];
    }
    return result;
  }
  function merge() {
    return arrayFrom(arguments).reduce(extend, {});
  }
  function iterate(object, callback, thisObject) {
    var result = [];
    for (var key in object) result.push(callback.call(thisObject, key, object[key]));
    return result;
  }
  function $undefined(value) {
    return value == undefined;
  }
  function $defined(value) {
    return value != undefined;
  }
  function $isNull(value) {
    return value == null || value == undefined;
  }
  function $isNotNull(value) {
    return value != null && value != undefined;
  }
  function $isSame(value) {
    return value === this;
  }
  function $isNotSame(value) {
    return value !== this;
  }
  function $self(value) {
    return value;
  }
  function $const(value) {
    return function() {
      return value;
    };
  }
  function $false() {
    return false;
  }
  function $true() {
    return true;
  }
  function $null() {
    return null;
  }
  function $undef() {}
  var getter = function() {
    var ID = "basisGetterId" + genUID() + "_";
    var modificatorSeed = 1;
    var simplePath = /^[a-z$_][a-z$_0-9]*(\.[a-z$_][a-z$_0-9]*)*$/i;
    var getterMap = [];
    var pathCache = {};
    var modCache = {};
    function buildFunction(path) {
      if (simplePath.test(path)) {
        var parts = path.split(".");
        var foo = parts[0];
        var bar = parts[1];
        var baz = parts[2];
        var fn;
        switch (parts.length) {
          case 1:
            fn = function(object) {
              return object != null ? object[foo] : object;
            };
            break;
          case 2:
            fn = function(object) {
              return object != null ? object[foo][bar] : object;
            };
            break;
          case 3:
            fn = function(object) {
              return object != null ? object[foo][bar][baz] : object;
            };
            break;
          default:
            fn = function(object) {
              if (object != null) {
                object = object[foo][bar][baz];
                for (var i = 3, key; key = parts[i]; i++) object = object[key];
              }
              return object;
            };
        }
        fn = Function("parts", "return " + fn.toString().replace(/(foo|bar|baz)/g, function(m, w) {
          return '"' + parts[w == "foo" ? 0 : w == "bar" ? 1 : 2] + '"';
        }).replace(/\[\"([^"]+)\"\]/g, ".$1"))(parts);
        return fn;
      }
      return new Function("object", "return object != null ? object." + path + " : object");
    }
    var getterFn = function(path, modificator) {
      var func;
      var result;
      var getterId;
      if (!path || path === nullGetter) return nullGetter;
      if (typeof path == "function") {
        getterId = path[ID];
        if (getterId) {
          func = getterMap[Math.abs(getterId) - 1];
        } else {
          func = function(object) {
            return path(object);
          };
          func.base = path;
          func.__extend__ = getter;
          getterId = getterMap.push(func);
          path[ID] = -getterId;
          func[ID] = getterId;
        }
      } else {
        func = pathCache[path];
        if (func) {
          getterId = func[ID];
        } else {
          func = buildFunction(path);
          func.base = path;
          func.__extend__ = getter;
          getterId = getterMap.push(func);
          func[ID] = getterId;
          pathCache[path] = func;
        }
      }
      var modType = modificator != null && typeof modificator;
      if (!modType) return func;
      var modList = modCache[getterId];
      var modId;
      if (modType == "string") modId = modType + modificator; else if (modType == "function") modId = modificator.basisModId_; else if (modType != "object") {
        consoleMethods.warn("basis.getter: wrong modificator type, modificator not used, path: ", path, ", modificator:", modificator);
        return func;
      }
      if (modId && modList && modList[modId]) return modList[modId];
      if (typeof func.base == "function") func = func.base;
      switch (modType) {
        case "string":
          result = function(object) {
            return stringFunctions.format(modificator, func(object));
          };
          break;
        case "function":
          if (!modId) {
            modId = modType + modificatorSeed++;
            modificator.basisModId_ = modId;
          }
          result = function(object) {
            return modificator(func(object));
          };
          break;
        default:
          result = function(object) {
            return modificator[func(object)];
          };
      }
      result.base = func.base || func;
      result.__extend__ = getter;
      if (modId) {
        if (!modList) {
          modList = {};
          modCache[getterId] = modList;
        }
        modList[modId] = result;
        result.mod = modificator;
        result[ID] = getterMap.push(result);
      } else {}
      return result;
    };
    getterFn.ID = ID;
    return getterFn;
  }();
  var nullGetter = extend(function() {}, {
    __extend__: getter
  });
  function wrapper(key) {
    return function(value) {
      var result = {};
      result[key] = value;
      return result;
    };
  }
  function lazyInit(init, thisObject) {
    var inited = 0;
    var self;
    var data;
    return self = function() {
      if (!(inited++)) {
        self.inited = true;
        self.data = data = init.apply(thisObject || this, arguments);
        if (typeof data == "undefined") consoleMethods.warn("lazyInit function returns nothing:\n" + init);
      }
      return data;
    };
  }
  function lazyInitAndRun(init, run, thisObject) {
    var inited = 0;
    var self;
    var data;
    return self = function() {
      if (!(inited++)) {
        self.inited = true;
        self.data = data = init.call(thisObject || this);
        if (typeof data == "undefined") consoleMethods.warn("lazyInitAndRun function returns nothing:\n" + init);
      }
      run.apply(data, arguments);
      return data;
    };
  }
  function runOnce(run, thisObject) {
    var fired = 0;
    return function() {
      if (!(fired++)) return run.apply(thisObject || this, arguments);
    };
  }
  var consoleMethods = function() {
    var methods = {
      log: $undef,
      info: $undef,
      warn: $undef,
      error: $undef
    };
    if (typeof console != "undefined") iterate(methods, function(methodName) {
      methods[methodName] = "bind" in Function.prototype && typeof console[methodName] == "function" ? Function.prototype.bind.call(console[methodName], console) : function() {
        Function.prototype.apply.call(console[methodName], console, arguments);
      };
    });
    return methods;
  }();
  var setImmediate = global.setImmediate || global.msSetImmediate;
  var clearImmediate = global.clearImmediate || global.msSetImmediate;
  if (setImmediate) setImmediate = setImmediate.bind(global);
  if (clearImmediate) clearImmediate = clearImmediate.bind(global);
  if (!setImmediate) (function() {
    var MESSAGE_NAME = "basisjs.setImmediate";
    var runTask = function() {
      var taskById = {};
      var taskId = 1;
      setImmediate = function(fn) {
        if (typeof fn != "function") {
          consoleMethods.warn("basis.setImmediate() and basis.nextTick() accept functions only (call ignored)");
          return;
        }
        taskById[++taskId] = {
          fn: fn,
          args: arrayFrom(arguments, 1)
        };
        addToQueue(taskId);
        return taskId;
      };
      clearImmediate = function(id) {
        delete taskById[id];
      };
      return function(id) {
        var task = taskById[id];
        if (task) {
          delete taskById[id];
          return task.fn.apply(undefined, task.args);
        }
      };
    }();
    var addToQueue = function(taskId) {
      setTimeout(function() {
        runTask(taskId);
      }, 0);
    };
    if (global.process && typeof process.nextTick == "function") {
      addToQueue = function(taskId) {
        process.nextTick(function() {
          runTask(taskId);
        });
      };
    } else {
      if (global.MessageChannel) {
        var channel = new global.MessageChannel;
        channel.port1.onmessage = function(event) {
          var taskId = event.data;
          runTask(taskId);
        };
        addToQueue = function(taskId) {
          channel.port2.postMessage(taskId);
        };
      } else {
        var postMessageSupported = global.postMessage && !global.importScripts;
        if (postMessageSupported) {
          var oldOnMessage = global.onmessage;
          global.onmessage = function() {
            postMessageSupported = false;
          };
          global.postMessage("", "*");
          global.onmessage = oldOnMessage;
        }
        if (postMessageSupported) {
          var setImmediateHandler = function(event) {
            if (event && event.source == global) {
              var taskId = String(event.data).split(MESSAGE_NAME)[1];
              if (taskId) runTask(taskId);
            }
          };
          if (global.addEventListener) global.addEventListener("message", setImmediateHandler, true); else global.attachEvent("onmessage", setImmediateHandler);
          addToQueue = function(taskId) {
            global.postMessage(MESSAGE_NAME + taskId, "*");
          };
        } else {
          var createScript = function() {
            return document.createElement("script");
          };
          if (document && "onreadystatechange" in createScript()) {
            var defaultAddToQueue = addToQueue;
            addToQueue = function beforeHeadReady(taskId) {
              if (typeof documentInterface != "undefined") {
                addToQueue = defaultAddToQueue;
                documentInterface.head.ready(function() {
                  addToQueue = function(taskId) {
                    var scriptEl = createScript();
                    scriptEl.onreadystatechange = function() {
                      scriptEl.onreadystatechange = null;
                      documentInterface.remove(scriptEl);
                      scriptEl = null;
                      runTask(taskId);
                    };
                    documentInterface.head.add(scriptEl);
                  };
                });
              }
              if (addToQueue === beforeHeadReady) defaultAddToQueue(taskId); else addToQueue(taskId);
            };
          }
        }
      }
    }
  })();
  var NODE_ENV = typeof process == "object" && toString.call(process) == "[object process]";
  var pathUtils = function() {
    var ABSOLUTE_RX = /^([^\/]+:|\/)/;
    var PROTOCOL_RX = /^[a-zA-Z0-9\-]+:\/?/;
    var ORIGIN_RX = /^(?:[a-zA-Z0-9\-]+:)?\/\/[^\/]+\/?/;
    var SEARCH_HASH_RX = /[\?#].*$/;
    var baseURI;
    var origin;
    var utils;
    if (NODE_ENV) {
      var path = (process.basisjsBaseURI || require("path").resolve(".")).replace(/\\/g, "/");
      baseURI = path.replace(/^[^\/]*/, "");
      origin = path.replace(/\/.*/, "");
    } else {
      baseURI = location.pathname.replace(/[^\/]+$/, "");
      origin = location.protocol + "//" + location.host;
    }
    utils = {
      baseURI: baseURI,
      origin: origin,
      normalize: function(path) {
        path = (path || "").replace(PROTOCOL_RX, "/").replace(ORIGIN_RX, "/").replace(SEARCH_HASH_RX, "");
        var result = [];
        var parts = path.split("/");
        for (var i = 0; i < parts.length; i++) {
          if (parts[i] == "..") {
            if (result.length > 1 || result[0]) result.pop();
          } else {
            if ((parts[i] || !i) && parts[i] != ".") result.push(parts[i]);
          }
        }
        return result.join("/") || (path[0] === "/" ? "/" : "");
      },
      dirname: function(path) {
        var result = utils.normalize(path);
        return result.replace(/\/([^\/]*)$|^[^\/]+$/, "") || (result[0] == "/" ? "/" : ".");
      },
      extname: function(path) {
        var ext = utils.normalize(path).match(/[^\/](\.[^\/\.]*)$/);
        return ext ? ext[1] : "";
      },
      basename: function(path, ext) {
        var filename = utils.normalize(path).match(/[^\\\/]*$/);
        filename = filename ? filename[0] : "";
        if (ext == utils.extname(filename)) filename = filename.substring(0, filename.length - ext.length);
        return filename;
      },
      resolve: function(from, to) {
        var args = arrayFrom(arguments).reverse();
        var path = [];
        var absoluteFound = false;
        for (var i = 0; !absoluteFound && i < args.length; i++) if (typeof args[i] == "string") {
          path.unshift(args[i]);
          absoluteFound = ABSOLUTE_RX.test(args[i]);
        }
        if (!absoluteFound) path.unshift(baseURI == "/" ? "" : baseURI);
        return utils.normalize(path.join("/"));
      },
      relative: function(from, to) {
        if (typeof to != "string") {
          to = from;
          from = baseURI;
        }
        from = utils.normalize(from);
        to = utils.normalize(to);
        if (from[0] == "/" && to[0] != "/") return from;
        if (to[0] == "/" && from[0] != "/") return to;
        var base = from.replace(/^\/$/, "").split(/\//);
        var path = to.replace(/^\/$/, "").split(/\//);
        var result = [];
        var i = 0;
        while (path[i] == base[i] && typeof base[i] == "string") i++;
        for (var j = base.length - i; j > 0; j--) result.push("..");
        return result.concat(path.slice(i).filter(Boolean)).join("/");
      }
    };
    return utils;
  }();
  var basisFilename = __basisFilename || "";
  var config = __config || {
    noConflict: true,
    modules: {},
    autoload: [ "./0.js" ]
  };
  function fetchConfig() {
    var config = __config;
    if (!config) {
      if (NODE_ENV) {
        basisFilename = __filename.replace(/\\/g, "/");
      } else {
        var scripts = document.scripts;
        for (var i = 0, scriptEl; scriptEl = scripts[i]; i++) {
          var configAttrValue = scriptEl.hasAttribute("basis-config") ? scriptEl.getAttribute("basis-config") : scriptEl.getAttribute("data-basis-config");
          scriptEl.removeAttribute("basis-config");
          scriptEl.removeAttribute("data-basis-config");
          if (configAttrValue !== null) {
            basisFilename = pathUtils.normalize(scriptEl.src);
            try {
              config = Function("return{" + configAttrValue + "}")();
            } catch (e) {
              consoleMethods.error("basis-config: basis.js config parse fault: " + e);
            }
            break;
          }
        }
      }
    }
    return processConfig(config);
  }
  function processConfig(config, verbose) {
    config = slice(config);
    if ("extProto" in config) consoleMethods.warn("basis-config: `extProto` option in basis-config is not support anymore");
    if ("path" in config) consoleMethods.warn("basis-config: `path` option in basis-config is deprecated, use `modules` instead");
    var autoload = [];
    var modules = merge(config.path, config.modules, {
      basis: basisFilename
    });
    config.modules = {};
    if (config.autoload) {
      var m = String(config.autoload).match(/^((?:[^\/]*\/)*)([a-z$_][a-z0-9$_]*)((?:\.[a-z$_][a-z0-9$_]*)*)$/i);
      if (m) {
        modules[m[2]] = {
          autoload: true,
          filename: m[1] + m[2] + (m[3] || ".js")
        };
      } else {
        consoleMethods.warn("basis-config: wrong `autoload` value (setting ignored): " + config.autoload);
      }
      delete config.autoload;
    }
    for (var name in modules) {
      var module = modules[name];
      if (typeof module == "string") module = {
        filename: module.replace(/\/$/, "/" + name + ".js")
      };
      var filename = module.filename;
      var path = module.path;
      if (filename && !path) {
        filename = pathUtils.resolve(filename);
        path = filename.substr(0, filename.length - pathUtils.extname(filename).length);
        filename = "../" + pathUtils.basename(filename);
      }
      path = pathUtils.resolve(path);
      if (!filename && path) {
        filename = pathUtils.basename(path);
        path = pathUtils.dirname(path);
      }
      if (!pathUtils.extname(filename)) filename += ".js";
      filename = pathUtils.resolve(path, filename);
      config.modules[name] = {
        path: path,
        filename: filename
      };
      if (module.autoload) {
        config.autoload = autoload;
        autoload.push(name);
      }
    }
    return config;
  }
  var Class = function() {
    var instanceSeed = {
      id: 1
    };
    var classSeed = 1;
    var classes = [];
    var SELF = {};
    function isClass(object) {
      return typeof object == "function" && !!object.basisClassId_;
    }
    function isSubclassOf(superClass) {
      var cursor = this;
      while (cursor && cursor !== superClass) cursor = cursor.superClass_;
      return cursor === superClass;
    }
    function devVerboseName(name, args, fn) {
      return (new Function(keys(args), 'return {"' + name + '": ' + fn + '\n}["' + name + '"]')).apply(null, values(args));
    }
    var TOSTRING_BUG = function() {
      for (var key in {
        toString: 1
      }) return false;
      return true;
    }();
    function createClass(SuperClass, extensions) {
      var classId = classSeed++;
      if (typeof SuperClass != "function") SuperClass = BaseClass;
      var className = "";
      for (var i = 1, extension; extension = arguments[i]; i++) if (typeof extension != "function" && extension.className) className = extension.className;
      if (!className) className = SuperClass.className + "._Class" + classId;
      var NewClassProto = function() {};
      NewClassProto = devVerboseName(className, {}, NewClassProto);
      NewClassProto.prototype = SuperClass.prototype;
      var newProto = new NewClassProto;
      var newClassProps = {
        className: className,
        basisClassId_: classId,
        superClass_: SuperClass,
        extendConstructor_: !!SuperClass.extendConstructor_,
        isSubclassOf: isSubclassOf,
        subclass: function() {
          return createClass.apply(null, [ newClass ].concat(arrayFrom(arguments)));
        },
        extend: extendClass,
        __extend__: function(value) {
          if (value && value !== SELF && (typeof value == "object" || typeof value == "function" && !isClass(value))) return BaseClass.create.call(null, newClass, value); else return value;
        },
        prototype: newProto
      };
      for (var i = 1, extension; extension = arguments[i]; i++) newClassProps.extend(extension);
      if (newProto.init !== BaseClass.prototype.init && !/^function[^(]*\(\)/.test(newProto.init) && newClassProps.extendConstructor_) consoleMethods.warn("probably wrong extendConstructor_ value for " + newClassProps.className);
      var newClass = newClassProps.extendConstructor_ ? function(extend) {
        this.basisObjectId = instanceSeed.id++;
        var prop;
        for (var key in extend) {
          prop = this[key];
          this[key] = prop && prop.__extend__ ? prop.__extend__(extend[key]) : extend[key];
        }
        this.init();
        this.postInit();
      } : function() {
        this.basisObjectId = instanceSeed.id++;
        this.init.apply(this, arguments);
        this.postInit();
      };
      newClass = devVerboseName(className, {
        instanceSeed: instanceSeed
      }, newClass);
      newProto.constructor = newClass;
      for (var key in newProto) if (newProto[key] === SELF) newProto[key] = newClass;
      extend(newClass, newClassProps);
      classes.push(newClass);
      return newClass;
    }
    function extendClass(source) {
      var proto = this.prototype;
      if (typeof source == "function" && !isClass(source)) source = source(this.superClass_.prototype, slice(proto));
      if (source.prototype) source = source.prototype;
      for (var key in source) {
        var value = source[key];
        var protoValue = proto[key];
        if (key == "className" || key == "extendConstructor_") this[key] = value; else {
          if (protoValue && protoValue.__extend__) proto[key] = protoValue.__extend__(value); else {
            proto[key] = value;
          }
        }
      }
      if (TOSTRING_BUG && source[key = "toString"] !== toString) proto[key] = source[key];
      return this;
    }
    var BaseClass = extend(createClass, {
      className: "basis.Class",
      extendConstructor_: false,
      prototype: {
        basisObjectId: 0,
        constructor: null,
        init: function() {},
        postInit: function() {},
        toString: function() {
          return "[object " + (this.constructor || this).className + "]";
        },
        destroy: function() {
          for (var prop in this) if (hasOwnProperty.call(this, prop)) this[prop] = null;
          this.destroy = $undef;
        }
      }
    });
    var customExtendProperty = function(extension, fn, devName) {
      return {
        __extend__: function(extension) {
          if (!extension) return extension;
          if (extension && extension.__extend__) return extension;
          var Base = function() {};
          Base = devVerboseName(devName || "customExtendProperty", {}, Base);
          Base.prototype = this;
          var result = new Base;
          fn(result, extension);
          return result;
        }
      }.__extend__(extension || {});
    };
    var extensibleProperty = function(extension) {
      return customExtendProperty(extension, extend, "extensibleProperty");
    };
    var nestedExtendProperty = function(extension) {
      return customExtendProperty(extension, function(result, extension) {
        for (var key in extension) {
          var value = result[key];
          result[key] = value && value.__extend__ ? value.__extend__(extension[key]) : extensibleProperty(extension[key]);
        }
      }, "nestedExtendProperty");
    };
    var oneFunctionProperty = function(fn, keys) {
      var create = function(keys) {
        var result = {
          __extend__: create
        };
        if (keys) {
          if (keys.__extend__) return keys;
          var Cls = devVerboseName("oneFunctionProperty", {}, function() {});
          result = new Cls;
          result.__extend__ = create;
          for (var key in keys) if (keys[key]) result[key] = fn;
        }
        return result;
      };
      return create(keys || {});
    };
    return extend(BaseClass, {
      all_: classes,
      SELF: SELF,
      create: createClass,
      isClass: isClass,
      customExtendProperty: customExtendProperty,
      extensibleProperty: extensibleProperty,
      nestedExtendProperty: nestedExtendProperty,
      oneFunctionProperty: oneFunctionProperty
    });
  }();
  var Token = Class(null, {
    className: "basis.Token",
    value: null,
    handler: null,
    deferredToken: null,
    bindingBridge: {
      attach: function(host, fn, context) {
        host.attach(fn, context);
      },
      detach: function(host, fn, context) {
        host.detach(fn, context);
      },
      get: function(host) {
        return host.get();
      }
    },
    init: function(value) {
      this.value = value;
    },
    get: function() {
      return this.value;
    },
    set: function(value) {
      if (this.value !== value) {
        this.value = value;
        this.apply();
      }
    },
    attach: function(fn, context) {
      var cursor = this;
      while (cursor = cursor.handler) if (cursor.fn === fn && cursor.context === context) consoleMethods.warn("basis.Token#attach: duplicate fn & context pair");
      this.handler = {
        fn: fn,
        context: context,
        handler: this.handler
      };
    },
    detach: function(fn, context) {
      var cursor = this;
      var prev;
      while (prev = cursor, cursor = cursor.handler) if (cursor.fn === fn && cursor.context === context) {
        cursor.fn = $undef;
        prev.handler = cursor.handler;
        return;
      }
      consoleMethods.warn("basis.Token#detach: fn & context pair not found, nothing was removed");
    },
    apply: function() {
      var value = this.get();
      var cursor = this;
      while (cursor = cursor.handler) cursor.fn.call(cursor.context, value);
    },
    deferred: function() {
      var token = this.deferredToken;
      if (!token) {
        token = this.deferredToken = new DeferredToken(this.value);
        this.attach(token.set, token);
      }
      return token;
    },
    destroy: function() {
      if (this.deferredToken) {
        this.deferredToken.destroy();
        this.deferredToken = null;
      }
      this.handler = null;
      this.value = null;
      this.attach = $undef;
      this.detach = $undef;
    }
  });
  var awaitToApply = function() {
    var tokens = {};
    var timer;
    function applyTokens() {
      var list = tokens;
      tokens = {};
      timer = null;
      for (var key in list) list[key].apply();
    }
    return function(token) {
      if (token.basisObjectId in tokens) return;
      tokens[token.basisObjectId] = token;
      if (!timer) setImmediate(applyTokens);
    };
  }();
  var DeferredToken = Token.subclass({
    className: "basis.DeferredToken",
    set: function(value) {
      if (this.value !== value) {
        this.value = value;
        awaitToApply(this);
      }
    },
    deferred: function() {
      return this;
    }
  });
  var resources = {};
  var resourceContentCache = {};
  var resourcePatch = {};
  var virtualResourceSeed = 1;
  var resourceResolvingStack = [];
  var requires;
  (function() {
    var map = typeof __resources__ != "undefined" ? __resources__ : null;
    if (map) {
      for (var key in map) resourceContentCache[pathUtils.resolve(key)] = map[key];
    }
  })();
  function applyResourcePatches(resource) {
    var patches = resourcePatch[resource.url];
    if (patches) for (var i = 0; i < patches.length; i++) {
      consoleMethods.info("Apply patch for " + resource.url);
      patches[i](resource.get(), resource.url);
    }
  }
  var getResourceContent = function(url, ignoreCache) {
    if (ignoreCache || !resourceContentCache.hasOwnProperty(url)) {
      var resourceContent = "";
      if (!NODE_ENV) {
        var req = new XMLHttpRequest;
        req.open("GET", url, false);
        req.setRequestHeader("If-Modified-Since", (new Date(0)).toGMTString());
        req.setRequestHeader("X-Basis-Resource", 1);
        req.send("");
        if (req.status >= 200 && req.status < 400) resourceContent = req.responseText; else {
          consoleMethods.error("basis.resource: Unable to load " + url + " (status code " + req.status + ")");
        }
      } else {
        try {
          resourceContent = process.basisjsReadFile ? process.basisjsReadFile(url) : require("fs").readFileSync(url, "utf-8");
        } catch (e) {
          consoleMethods.error("basis.resource: Unable to load " + url, e);
        }
      }
      resourceContentCache[url] = resourceContent;
    }
    return resourceContentCache[url];
  };
  var createResource = function(resourceUrl, content) {
    var contentType = pathUtils.extname(resourceUrl);
    var contentWrapper = getResource.extensions[contentType];
    var isVirtual = arguments.length > 1;
    var resolved = false;
    var wrapped = false;
    var wrappedContent;
    if (isVirtual) resourceUrl += "#virtual";
    var resource = function() {
      if (resolved) return content;
      var urlContent = isVirtual ? content : getResourceContent(resourceUrl);
      var idx = resourceResolvingStack.indexOf(resourceUrl);
      if (idx != -1) consoleMethods.warn("basis.resource recursion:", resourceResolvingStack.slice(idx).concat(resourceUrl).map(pathUtils.relative, pathUtils).join(" -> "));
      resourceResolvingStack.push(resourceUrl);
      if (contentWrapper) {
        if (!wrapped) {
          wrapped = true;
          content = contentWrapper(urlContent, resourceUrl);
          wrappedContent = urlContent;
        }
      } else {
        content = urlContent;
      }
      resolved = true;
      applyResourcePatches(resource);
      resource.apply();
      resourceResolvingStack.pop();
      return content;
    };
    extend(resource, extend(new Token, {
      url: resourceUrl,
      type: contentType,
      virtual: isVirtual,
      fetch: function() {
        return resource();
      },
      toString: function() {
        return "[basis.resource " + resourceUrl + "]";
      },
      isResolved: function() {
        return resolved;
      },
      hasChanges: function() {
        return contentWrapper ? resourceContentCache[resourceUrl] !== wrappedContent : false;
      },
      update: function(newContent) {
        if (!resolved || isVirtual || newContent != resourceContentCache[resourceUrl]) {
          if (!isVirtual) resourceContentCache[resourceUrl] = newContent;
          if (contentWrapper) {
            if (!wrapped && isVirtual) content = newContent;
            if (wrapped && !contentWrapper.permanent) {
              content = contentWrapper(newContent, resourceUrl, content);
              applyResourcePatches(resource);
              resource.apply();
            }
          } else {
            content = newContent;
            resolved = true;
            applyResourcePatches(resource);
            resource.apply();
          }
        }
      },
      reload: function() {
        if (isVirtual) return;
        var oldContent = resourceContentCache[resourceUrl];
        var newContent = getResourceContent(resourceUrl, true);
        if (newContent != oldContent) {
          resolved = false;
          resource.update(newContent);
        }
      },
      get: function(source) {
        if (isVirtual) if (source) return contentWrapper ? wrappedContent : content;
        return source ? getResourceContent(resourceUrl) : resource();
      },
      ready: function(fn, context) {
        if (resolved) {
          fn.call(context, resource());
          if (contentWrapper && contentWrapper.permanent) return;
        }
        resource.attach(fn, context);
        return resource;
      }
    }));
    resources[resourceUrl] = resource;
    return resource;
  };
  var getResource = function(resourceUrl) {
    var resource = resources[resourceUrl];
    if (resource) return resource;
    if (!/^(\.\/|\.\.|\/)/.test(resourceUrl)) consoleMethods.warn("Bad usage: basis.resource('" + resourceUrl + "').\nFilenames should starts with `./`, `..` or `/`. Otherwise it will treats as special reference in next minor release.");
    resourceUrl = pathUtils.resolve(resourceUrl);
    resource = resources[resourceUrl];
    return resource || createResource(resourceUrl);
  };
  extend(getResource, {
    isResource: function(value) {
      return value ? resources[value.url] === value : false;
    },
    isResolved: function(resourceUrl) {
      var resource = getResource.get(resourceUrl);
      return resource ? resource.isResolved() : false;
    },
    exists: function(resourceUrl) {
      if (!/^(\.\/|\.\.|\/)/.test(resourceUrl)) consoleMethods.warn("Bad usage: basis.resource.exists('" + resourceUrl + "').\nFilenames should starts with `./`, `..` or `/`. Otherwise it will treats as special reference in next minor release.");
      return resources.hasOwnProperty(pathUtils.resolve(resourceUrl));
    },
    get: function(resourceUrl) {
      if (!/^(\.\/|\.\.|\/)/.test(resourceUrl)) consoleMethods.warn("Bad usage: basis.resource.get('" + resourceUrl + "').\nFilenames should starts with `./`, `..` or `/`. Otherwise it will treats as special reference in next minor release.");
      resourceUrl = pathUtils.resolve(resourceUrl);
      if (!getResource.exists(resourceUrl)) return null;
      return getResource(resourceUrl);
    },
    getFiles: function(cache) {
      return keys(cache ? resourceContentCache : resources).map(pathUtils.relative);
    },
    virtual: function(type, content, ownerUrl) {
      return createResource((ownerUrl ? ownerUrl + ":" : pathUtils.normalize(pathUtils.baseURI == "/" ? "" : pathUtils.baseURI) + "/") + "virtual-resource" + virtualResourceSeed++ + "." + type, content);
    },
    extensions: {
      ".js": extend(function(content, filename) {
        var namespace = filename2namespace[filename];
        if (!namespace) {
          var implicitNamespace = true;
          var resolvedFilename = pathUtils.dirname(filename) + "/" + pathUtils.basename(filename, pathUtils.extname(filename));
          for (var ns in nsRootPath) {
            var path = nsRootPath[ns] + ns + "/";
            if (resolvedFilename.substr(0, path.length) == path) {
              implicitNamespace = false;
              resolvedFilename = resolvedFilename.substr(nsRootPath[ns].length);
              break;
            }
          }
          namespace = resolvedFilename.replace(/\./g, "_").replace(/^\//g, "").replace(/\//g, ".");
          if (implicitNamespace) namespace = "implicit." + namespace;
        }
        if (requires) arrayFunctions.add(requires, namespace);
        if (!namespaces[namespace]) {
          var ns = getNamespace(namespace);
          var savedRequires = requires;
          requires = [];
          ns.exports = runScriptInContext({
            path: ns.path,
            exports: ns.exports
          }, filename, content).exports;
          if (ns.exports && ns.exports.constructor === Object) complete(ns, ns.exports);
          ns.filename_ = filename;
          ns.source_ = content;
          ns.requires_ = requires;
          requires = savedRequires;
        }
        return namespaces[namespace].exports;
      }, {
        permanent: true
      }),
      ".css": function(content, url, cssResource) {
        if (!cssResource) cssResource = new CssResource(url);
        cssResource.updateCssText(content);
        return cssResource;
      },
      ".json": function(content, url) {
        if (typeof content == "object") return content;
        var result;
        try {
          content = String(content);
          result = basis.json.parse(content);
        } catch (e) {
          consoleMethods.warn("basis.resource: Can't parse JSON from " + url, {
            url: url,
            content: content
          });
        }
        return result || null;
      }
    }
  });
  function compileFunction(sourceURL, args, body) {
    try {
      return new Function(args, body + "\n\n//# sourceURL=" + pathUtils.origin + sourceURL);
    } catch (e) {
      if (document && "line" in e == false && "addEventListener" in global) {
        global.addEventListener("error", function onerror(event) {
          if (event.filename == pathUtils.origin + sourceURL) {
            global.removeEventListener("error", onerror);
            consoleMethods.error("Compilation error at " + event.filename + ":" + event.lineno + ": " + e);
            event.preventDefault();
          }
        });
        var script = document.createElement("script");
        script.src = sourceURL;
        script.async = false;
        document.head.appendChild(script);
        document.head.removeChild(script);
      }
      consoleMethods.error("Compilation error at " + sourceURL + ("line" in e ? ":" + (e.line - 1) : "") + ": " + e);
    }
  }
  var runScriptInContext = function(context, sourceURL, sourceCode) {
    var baseURL = pathUtils.dirname(sourceURL) + "/";
    var compiledSourceCode = sourceCode;
    if (!context.exports) context.exports = {};
    if (typeof compiledSourceCode != "function") compiledSourceCode = compileFunction(sourceURL, [ "exports", "module", "basis", "global", "__filename", "__dirname", "resource", "require" ], '"use strict";\n' + sourceCode);
    if (typeof compiledSourceCode == "function") compiledSourceCode.call(context.exports, context.exports, context, basis, global, sourceURL, baseURL, function(relativePath) {
      if (!/^(\.\/|\.\.|\/)/.test(relativePath)) consoleMethods.warn("Bad usage: resource('" + relativePath + "').\nFilenames should starts with `./`, `..` or `/`. Otherwise it will treats as special reference in next minor release.");
      return getResource(pathUtils.resolve(baseURL, relativePath));
    }, function(relativePath, base) {
      return requireNamespace(relativePath, base || baseURL);
    });
    return context;
  };
  var namespaces = {};
  var namespace2filename = {};
  var filename2namespace = {};
  var nsRootPath = {};
  iterate(config.modules, function(name, module) {
    nsRootPath[name] = module.path + "/";
    namespace2filename[name] = module.filename;
    filename2namespace[module.filename] = name;
  });
  (function(map) {
    var map = typeof __namespace_map__ != "undefined" ? __namespace_map__ : null;
    if (map) {
      for (var key in map) {
        var filename = pathUtils.resolve(key);
        var namespace = map[key];
        filename2namespace[filename] = namespace;
        namespace2filename[namespace] = filename;
      }
    }
  })();
  var Namespace = Class(null, {
    className: "basis.Namespace",
    init: function(name) {
      this.name = name;
      this.exports = {
        path: this.name
      };
    },
    toString: function() {
      return "[basis.namespace " + this.path + "]";
    },
    extend: function(names) {
      extend(this.exports, names);
      return complete(this, names);
    }
  });
  function resolveNSFilename(namespace) {
    if (namespace in namespace2filename == false) {
      var parts = namespace.split(".");
      var namespaceRoot = parts.shift();
      var filename = parts.join("/") + ".js";
      if (namespaceRoot in nsRootPath == false) nsRootPath[namespaceRoot] = pathUtils.baseURI + namespaceRoot + "/";
      if (namespaceRoot == namespace) filename = nsRootPath[namespaceRoot].replace(/\/$/, "") + ".js"; else filename = nsRootPath[namespaceRoot] + filename;
      namespace2filename[namespace] = filename;
      filename2namespace[filename] = namespace;
    }
    return namespace2filename[namespace];
  }
  function getRootNamespace(name) {
    var namespace = namespaces[name];
    if (!namespace) {
      namespace = namespaces[name] = new Namespace(name);
      namespace.namespaces_ = {};
      namespace.namespaces_[name] = namespace;
      if (!config.noConflict) global[name] = namespace;
    }
    if (name == "library" && !library) library = namespaces[name];
    return namespace;
  }
  function getNamespace(path) {
    path = path.split(".");
    var rootNs = getRootNamespace(path[0]);
    var cursor = rootNs;
    for (var i = 1, name; name = path[i]; i++) {
      if (!cursor[name]) {
        var nspath = path.slice(0, i + 1).join(".");
        cursor[name] = new Namespace(nspath);
        rootNs.namespaces_[nspath] = cursor[name];
      }
      cursor = cursor[name];
    }
    namespaces[path.join(".")] = cursor;
    return cursor;
  }
  var requireNamespace = function() {
    if (NODE_ENV) {
      var moduleProto = module.constructor.prototype;
      return function(filename, dirname) {
        if (!/[^a-z0-9_\.]/i.test(filename) || pathUtils.extname(filename) == ".js") {
          var _compile = moduleProto._compile;
          var namespace = getNamespace(filename);
          moduleProto._compile = function(content, filename) {
            this.basis = basis;
            content = "var __nodejsRequire = require;\n" + "var basis = module.basis;\n" + 'var resource = function(filename){ return basis.resource(__dirname + "/" + filename) };\n' + "var require = function(filename, baseURI){ return basis.require(filename, baseURI || __dirname) };\n" + content;
            _compile.call(extend(this, namespace), content, filename);
          };
          var exports = require(__dirname + "/" + filename.replace(/\./g, "/"));
          namespace.exports = exports;
          if (exports && exports.constructor === Object) complete(namespace, exports);
          moduleProto._compile = _compile;
          return exports;
        } else {
          filename = pathUtils.resolve(dirname, filename);
          return require(filename);
        }
      };
    } else {
      return function(filename, dirname) {
        if (!/[^a-z0-9_\.]/i.test(filename) && pathUtils.extname(filename) != ".js") {
          filename = resolveNSFilename(filename);
        } else {
          if (!/^(\.\/|\.\.|\/)/.test(filename)) consoleMethods.warn("Bad usage: require('" + filename + "').\nFilenames should starts with `./`, `..` or `/`. Otherwise it will treats as special reference in next minor release.");
          filename = pathUtils.resolve(dirname, filename);
        }
        return getResource(filename).fetch();
      };
    }
  }();
  function patch(filename, patchFn) {
    if (!/[^a-z0-9_\.]/i.test(filename) && pathUtils.extname(filename) != ".js") {
      filename = resolveNSFilename(filename);
    } else {
      if (!/^(\.\/|\.\.|\/)/.test(filename)) consoleMethods.warn("Bad usage: basis.patch('" + filename + "').\nFilenames should starts with `./`, `..` or `/`. Otherwise it will treats as special reference in next minor release.");
      filename = pathUtils.resolve(filename);
    }
    if (!resourcePatch[filename]) resourcePatch[filename] = [ patchFn ]; else resourcePatch[filename].push(patchFn);
    var resource = getResource.get(filename);
    if (resource && resource.isResolved()) patchFn(resource.get(), resource.url);
  }
  complete(Function.prototype, {
    bind: function(thisObject) {
      var fn = this;
      var params = arrayFrom(arguments, 1);
      return params.length ? function() {
        return fn.apply(thisObject, params.concat.apply(params, arguments));
      } : function() {
        return fn.apply(thisObject, arguments);
      };
    }
  });
  complete(Array, {
    isArray: function(value) {
      return toString.call(value) === "[object Array]";
    }
  });
  function arrayFrom(object, offset) {
    if (object != null) {
      var len = object.length;
      if (typeof len == "undefined" || toString.call(object) == "[object Function]") return [ object ];
      if (!offset) offset = 0;
      if (len - offset > 0) {
        for (var result = [], k = 0, i = offset; i < len; ) result[k++] = object[i++];
        return result;
      }
    }
    return [];
  }
  function createArray(length, fillValue, thisObject) {
    var result = [];
    var isFunc = typeof fillValue == "function";
    for (var i = 0; i < length; i++) result[i] = isFunc ? fillValue.call(thisObject, i, result) : fillValue;
    return result;
  }
  complete(Array.prototype, {
    indexOf: function(searchElement, offset) {
      offset = parseInt(offset, 10) || 0;
      if (offset < 0) return -1;
      for (; offset < this.length; offset++) if (this[offset] === searchElement) return offset;
      return -1;
    },
    lastIndexOf: function(searchElement, offset) {
      var len = this.length;
      offset = parseInt(offset, 10);
      if (isNaN(offset) || offset >= len) offset = len - 1; else offset = (offset + len) % len;
      for (; offset >= 0; offset--) if (this[offset] === searchElement) return offset;
      return -1;
    },
    forEach: function(callback, thisObject) {
      for (var i = 0, len = this.length; i < len; i++) if (i in this) callback.call(thisObject, this[i], i, this);
    },
    every: function(callback, thisObject) {
      for (var i = 0, len = this.length; i < len; i++) if (i in this && !callback.call(thisObject, this[i], i, this)) return false;
      return true;
    },
    some: function(callback, thisObject) {
      for (var i = 0, len = this.length; i < len; i++) if (i in this && callback.call(thisObject, this[i], i, this)) return true;
      return false;
    },
    filter: function(callback, thisObject) {
      var result = [];
      for (var i = 0, len = this.length; i < len; i++) if (i in this && callback.call(thisObject, this[i], i, this)) result.push(this[i]);
      return result;
    },
    map: function(callback, thisObject) {
      var result = [];
      for (var i = 0, len = this.length; i < len; i++) if (i in this) result[i] = callback.call(thisObject, this[i], i, this);
      return result;
    },
    reduce: function(callback, initialValue) {
      var len = this.length;
      var argsLen = arguments.length;
      if (len == 0 && argsLen == 1) throw new TypeError;
      var result;
      var inited = 0;
      if (argsLen > 1) {
        result = initialValue;
        inited = 1;
      }
      for (var i = 0; i < len; i++) if (i in this) if (inited++) result = callback.call(null, result, this[i], i, this); else result = this[i];
      return result;
    }
  });
  var arrayFunctions = {
    from: arrayFrom,
    create: createArray,
    flatten: function(this_) {
      return this_.concat.apply([], this_);
    },
    repeat: function(this_, count) {
      return arrayFunctions.flatten(createArray(parseInt(count, 10) || 0, this_));
    },
    search: function(this_, value, getter_, offset) {
      this_.lastSearchIndex = -1;
      getter_ = getter(getter_ || $self);
      for (var index = parseInt(offset, 10) || 0, len = this_.length; index < len; index++) if (getter_(this_[index]) === value) return this_[this_.lastSearchIndex = index];
    },
    lastSearch: function(this_, value, getter_, offset) {
      this_.lastSearchIndex = -1;
      getter_ = getter(getter_ || $self);
      var len = this_.length;
      var index = isNaN(offset) || offset == null ? len : parseInt(offset, 10);
      for (var i = index > len ? len : index; i-- > 0; ) if (getter_(this_[i]) === value) return this_[this_.lastSearchIndex = i];
    },
    add: function(this_, value) {
      return this_.indexOf(value) == -1 && !!this_.push(value);
    },
    remove: function(this_, value) {
      var index = this_.indexOf(value);
      return index != -1 && !!this_.splice(index, 1);
    },
    has: function(this_, value) {
      return this_.indexOf(value) != -1;
    },
    sortAsObject: function() {
      consoleMethods.warn("basis.array.sortAsObject is deprecated, use basis.array.sort instead");
      return arrayFunctions.sort.apply(this, arguments);
    },
    sort: function(this_, getter_, comparator, desc) {
      getter_ = getter(getter_);
      desc = desc ? -1 : 1;
      return this_.map(function(item, index) {
        return {
          i: index,
          v: getter_(item)
        };
      }).sort(comparator || function(a, b) {
        return desc * (a.v > b.v || -(a.v < b.v) || (a.i > b.i ? 1 : -1));
      }).map(function(item) {
        return this[item.i];
      }, this_);
    }
  };
  if (![ 1, 2 ].splice(1).length) {
    var nativeArraySplice = Array.prototype.splice;
    Array.prototype.splice = function() {
      var params = arrayFrom(arguments);
      if (params.length < 2) params[1] = this.length;
      return nativeArraySplice.apply(this, params);
    };
  }
  var ESCAPE_FOR_REGEXP = /([\/\\\(\)\[\]\?\{\}\|\*\+\-\.\^\$])/g;
  var FORMAT_REGEXP = /\{([a-z\d_]+)(?::([\.0])(\d+)|:(\?))?\}/gi;
  complete(String, {
    toLowerCase: function(value) {
      return String(value).toLowerCase();
    },
    toUpperCase: function(value) {
      return String(value).toUpperCase();
    },
    trim: function(value) {
      return String(value).trim();
    },
    trimLeft: function(value) {
      return String(value).trimLeft();
    },
    trimRight: function(value) {
      return String(value).trimRight();
    }
  });
  complete(String.prototype, {
    trimLeft: function() {
      return this.replace(/^\s+/, "");
    },
    trimRight: function() {
      return this.replace(/\s+$/, "");
    },
    trim: function() {
      return this.trimLeft().trimRight();
    }
  });
  var stringFunctions = {
    toObject: function(this_, rethrow) {
      try {
        return (new Function("return 0," + this_))();
      } catch (e) {
        if (rethrow) throw e;
      }
    },
    repeat: function(this_, count) {
      return (new Array(parseInt(count, 10) + 1 || 0)).join(this_);
    },
    qw: function(this_) {
      var trimmed = this_.trim();
      return trimmed ? trimmed.split(/\s+/) : [];
    },
    forRegExp: function(this_) {
      return this_.replace(ESCAPE_FOR_REGEXP, "\\$1");
    },
    format: function(this_, first) {
      var data = arrayFrom(arguments, 1);
      if (typeof first == "object") extend(data, first);
      return this_.replace(FORMAT_REGEXP, function(m, key, numFormat, num, noNull) {
        var value = key in data ? data[key] : noNull ? "" : m;
        if (numFormat && !isNaN(value)) {
          value = Number(value);
          return numFormat == "." ? value.toFixed(num) : numberFunctions.lead(value, num);
        }
        return value;
      });
    },
    capitalize: function(this_) {
      return this_.charAt(0).toUpperCase() + this_.substr(1).toLowerCase();
    },
    camelize: function(this_) {
      return this_.replace(/-(.)/g, function(m, chr) {
        return chr.toUpperCase();
      });
    },
    dasherize: function(this_) {
      return this_.replace(/[A-Z]/g, function(m) {
        return "-" + m.toLowerCase();
      });
    },
    isEmpty: function(value) {
      return value == null || String(value) == "";
    },
    isNotEmpty: function(value) {
      return value != null && String(value) != "";
    }
  };
  if ("|||".split(/\|/).length + "|||".split(/(\|)/).length != 11) {
    var nativeStringSplit = String.prototype.split;
    String.prototype.split = function(pattern, count) {
      if (!pattern || pattern instanceof RegExp == false || pattern.source == "") return nativeStringSplit.apply(this, arguments);
      var result = [];
      var pos = 0;
      var match;
      if (!pattern.global) pattern = new RegExp(pattern.source, /\/([mi]*)$/.exec(pattern)[1] + "g");
      while (match = pattern.exec(this)) {
        match[0] = this.substring(pos, match.index);
        result.push.apply(result, match);
        pos = pattern.lastIndex;
      }
      result.push(this.substr(pos));
      return result;
    };
  }
  if ("12".substr(-1) != "2") {
    var nativeStringSubstr = String.prototype.substr;
    String.prototype.substr = function(start, end) {
      return nativeStringSubstr.call(this, start < 0 ? Math.max(0, this.length + start) : start, end);
    };
  }
  var numberFunctions = {
    fit: function(this_, min, max) {
      if (!isNaN(min) && this_ < min) return Number(min);
      if (!isNaN(max) && this_ > max) return Number(max);
      return this_;
    },
    lead: function(this_, len, leadChar) {
      return String(this_).replace(/\d+/, function(number) {
        return (len -= number.length - 1) > 1 ? (new Array(len)).join(leadChar || 0) + number : number;
      });
    },
    group: function(this_, len, splitter) {
      return String(this_).replace(/\d+/, function(number) {
        return number.replace(/\d/g, function(m, pos) {
          return !pos + (number.length - pos) % (len || 3) ? m : (splitter || " ") + m;
        });
      });
    },
    format: function(this_, prec, gs, prefix, postfix, comma) {
      var res = this_.toFixed(prec);
      if (gs || comma) res = res.replace(/(\d+)(\.?)/, function(m, number, c) {
        return (gs ? basis.number.group(Number(number), 3, gs) : number) + (c ? comma || c : "");
      });
      if (prefix) res = res.replace(/^-?/, "$&" + (prefix || ""));
      return res + (postfix || "");
    }
  };
  complete(Date, {
    now: function() {
      return Number(new Date);
    }
  });
  var ready = function() {
    function isReady() {
      return document.readyState == "complete" && !!document.body;
    }
    var fired = !document || isReady();
    var deferredHandler;
    function runReadyHandler(handler) {
      handler.callback.call(handler.context);
    }
    function fireHandlers() {
      if (isReady()) if (!(fired++)) while (deferredHandler) {
        runReadyHandler(deferredHandler);
        deferredHandler = deferredHandler.next;
      }
    }
    function doScrollCheck() {
      try {
        document.documentElement.doScroll("left");
        fireHandlers();
      } catch (e) {
        setTimeout(doScrollCheck, 1);
      }
    }
    if (!fired) {
      if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", fireHandlers, false);
        global.addEventListener("load", fireHandlers, false);
      } else {
        document.attachEvent("onreadystatechange", fireHandlers);
        global.attachEvent("onload", fireHandlers);
        try {
          if (!global.frameElement && document.documentElement.doScroll) doScrollCheck();
        } catch (e) {}
      }
    }
    return function(callback, context) {
      if (!fired) {
        deferredHandler = {
          callback: callback,
          context: context,
          next: deferredHandler
        };
      } else runReadyHandler({
        callback: callback,
        context: context
      });
    };
  }();
  var documentInterface = function() {
    var timer;
    var reference = {};
    var callbacks = {
      head: [],
      body: []
    };
    function getParent(name) {
      if (document && !reference[name]) {
        reference[name] = document[name] || document.getElementsByTagName(name)[0];
        if (reference[name]) {
          var items = callbacks[name];
          delete callbacks[name];
          for (var i = 0, cb; cb = items[i]; i++) cb[0].call(cb[1], reference[name]);
        }
      }
      return reference[name];
    }
    function add() {
      var name = this[0];
      var node = this[1];
      var ref = this[2];
      remove(node);
      var parent = getParent(name);
      if (parent) {
        if (ref === true) ref = parent.firstChild;
        if (!ref || ref.parentNode !== parent) ref = null;
        parent.insertBefore(node, ref);
      } else callbacks[name].push([ add, [ name, node, ref ] ]);
    }
    function docReady(name, fn, context) {
      if (callbacks[name]) callbacks[name].push([ fn, context ]); else fn.call(context, reference[name]);
    }
    function remove(node) {
      for (var key in callbacks) {
        var entry = arrayFunctions.search(callbacks[key], node, function(item) {
          return item[1] && item[1][1];
        });
        if (entry) arrayFunctions.remove(callbacks[key], entry);
      }
      if (node && node.parentNode && node.parentNode.nodeType == 1) node.parentNode.removeChild(node);
    }
    function checkParents() {
      if (timer && getParent("head") && getParent("body")) timer = clearInterval(timer);
    }
    if (document && (!getParent("head") || !getParent("body"))) {
      timer = setInterval(checkParents, 5);
      ready(checkParents);
    }
    return {
      head: {
        ready: function(fn, context) {
          docReady("head", fn, context);
        },
        add: function(node, ref) {
          add.call([ "head", node, ref ]);
        }
      },
      body: {
        ready: function(fn, context) {
          docReady("body", fn, context);
        },
        add: function(node, ref) {
          add.call([ "body", node, ref ]);
        }
      },
      remove: remove
    };
  }();
  var cleaner = function() {
    var objects = [];
    function destroy(log) {
      var logDestroy = log && typeof log == "boolean";
      result.globalDestroy = true;
      result.add = $undef;
      result.remove = $undef;
      var object;
      while (object = objects.pop()) {
        if (typeof object.destroy == "function") {
          try {
            if (logDestroy) consoleMethods.log("destroy", "[" + String(object.className) + "]", object);
            object.destroy();
          } catch (e) {
            consoleMethods.warn(String(object), e);
          }
        } else {
          for (var prop in object) object[prop] = null;
        }
      }
      objects.length = 0;
    }
    if ("attachEvent" in global) global.attachEvent("onunload", destroy); else if ("addEventListener" in global) global.addEventListener("unload", destroy, false); else return {
      add: $undef,
      remove: $undef
    };
    var result = {
      add: function(object) {
        if (object != null) objects.push(object);
      },
      remove: function(object) {
        arrayFunctions.remove(objects, object);
      }
    };
    result.destroy_ = destroy;
    result.objects_ = objects;
    return result;
  }();
  var CssResource = function() {
    var STYLE_APPEND_BUGGY = function() {
      try {
        return !document.createElement("style").appendChild(document.createTextNode(""));
      } catch (e) {
        return true;
      }
    }();
    var baseEl = document && document.createElement("base");
    function setBase(baseURI) {
      baseEl.setAttribute("href", baseURI);
      documentInterface.head.add(baseEl, true);
    }
    function restoreBase() {
      baseEl.setAttribute("href", location.href);
      documentInterface.remove(baseEl);
    }
    function injectStyleToHead() {
      setBase(this.baseURI);
      if (!this.element) {
        this.element = document.createElement("style");
        if (!STYLE_APPEND_BUGGY) this.element.appendChild(document.createTextNode(""));
        this.element.setAttribute("src", this.url);
      }
      documentInterface.head.add(this.element);
      this.syncCssText();
      restoreBase();
    }
    return Class(null, {
      className: "basis.CssResource",
      inUse: 0,
      url: "",
      baseURI: "",
      cssText: undefined,
      element: null,
      init: function(url) {
        this.url = url;
        this.baseURI = pathUtils.dirname(url) + "/";
      },
      updateCssText: function(cssText) {
        if (this.cssText != cssText) {
          this.cssText = cssText;
          if (this.inUse && this.element) {
            setBase(this.baseURI);
            this.syncCssText();
            restoreBase();
          }
        }
      },
      syncCssText: STYLE_APPEND_BUGGY ? function() {
        this.element.styleSheet.cssText = this.cssText;
      } : function() {
        var cssText = this.cssText;
        cssText += "\n/*# sourceURL=" + pathUtils.origin + this.url + " */";
        this.element.firstChild.nodeValue = cssText;
      },
      startUse: function() {
        if (!this.inUse) documentInterface.head.ready(injectStyleToHead, this);
        this.inUse += 1;
      },
      stopUse: function() {
        if (this.inUse) {
          this.inUse -= 1;
          if (!this.inUse && this.element) documentInterface.remove(this.element);
        }
      },
      destroy: function() {
        if (this.element) documentInterface.remove(this.element);
        this.element = null;
        this.cssText = null;
      }
    });
  }();
  var basis = getNamespace("basis").extend({
    filename_: basisFilename,
    processConfig: processConfig,
    version: VERSION,
    NODE_ENV: NODE_ENV,
    config: config,
    createSandbox: function(config) {
      return createBasisInstance(global, basisFilename, complete({
        noConflict: true
      }, config));
    },
    resolveNSFilename: resolveNSFilename,
    patch: patch,
    namespace: getNamespace,
    require: requireNamespace,
    resource: getResource,
    asset: function(url) {
      return url;
    },
    setImmediate: setImmediate,
    clearImmediate: clearImmediate,
    nextTick: function() {
      setImmediate.apply(null, arguments);
    },
    Class: Class,
    Token: Token,
    DeferredToken: DeferredToken,
    genUID: genUID,
    getter: getter,
    ready: ready,
    cleaner: cleaner,
    console: consoleMethods,
    path: pathUtils,
    doc: documentInterface,
    object: {
      extend: extend,
      complete: complete,
      keys: keys,
      values: values,
      slice: slice,
      splice: splice,
      merge: merge,
      iterate: iterate
    },
    fn: {
      $undefined: $undefined,
      $defined: $defined,
      $isNull: $isNull,
      $isNotNull: $isNotNull,
      $isSame: $isSame,
      $isNotSame: $isNotSame,
      $self: $self,
      $const: $const,
      $false: $false,
      $true: $true,
      $null: $null,
      $undef: $undef,
      getter: getter,
      nullGetter: nullGetter,
      wrapper: wrapper,
      lazyInit: lazyInit,
      lazyInitAndRun: lazyInitAndRun,
      runOnce: runOnce
    },
    array: extend(arrayFrom, arrayFunctions),
    string: stringFunctions,
    number: numberFunctions,
    bool: {
      invert: function(value) {
        return !value;
      }
    },
    json: {
      parse: typeof JSON != "undefined" ? JSON.parse : function(str) {
        return stringFunctions.toObject(str, true);
      }
    }
  });
  getNamespace("basis.dev").extend(consoleMethods);
  if (config.autoload) config.autoload.forEach(function(name) {
    requireNamespace(name);
  });
  return basis;
})(this);
}).call(this);