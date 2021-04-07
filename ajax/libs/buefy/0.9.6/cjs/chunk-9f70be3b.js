'use strict';

var __chunk_1 = require('./chunk-14c82365.js');
var helpers = require('./helpers.js');

var items = 1;
var sorted = 3;
var Sorted = sorted;
var ProviderParentMixin = (function (itemName) {
  var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var mixin = {
    provide: function provide() {
      return __chunk_1._defineProperty({}, 'b' + itemName, this);
    }
  };

  if (helpers.hasFlag(flags, items)) {
    mixin.data = function () {
      return {
        childItems: []
      };
    };

    mixin.methods = {
      _registerItem: function _registerItem(item) {
        this.childItems.push(item);
      },
      _unregisterItem: function _unregisterItem(item) {
        this.childItems = this.childItems.filter(function (i) {
          return i !== item;
        });
      }
    };

    if (helpers.hasFlag(flags, sorted)) {
      mixin.watch = {
        /**
         * When items are added/removed deep search in the elements default's slot
         * And mark the items with their index
         */
        childItems: function childItems(items) {
          if (items.length > 0 && this.$scopedSlots.default) {
            var tag = items[0].$vnode.tag;
            var index = 0;

            var deepSearch = function deepSearch(children) {
              var _iteratorNormalCompletion = true;
              var _didIteratorError = false;
              var _iteratorError = undefined;

              try {
                var _loop = function _loop() {
                  var child = _step.value;

                  if (child.tag === tag) {
                    // An item with the same tag will for sure be found
                    var it = items.find(function (i) {
                      return i.$vnode === child;
                    });

                    if (it) {
                      it.index = index++;
                    }
                  } else if (child.tag) {
                    var sub = child.componentInstance ? child.componentInstance.$scopedSlots.default ? child.componentInstance.$scopedSlots.default() : child.componentInstance.$children : child.children;

                    if (Array.isArray(sub) && sub.length > 0) {
                      deepSearch(sub.map(function (e) {
                        return e.$vnode;
                      }));
                    }
                  }
                };

                for (var _iterator = children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  _loop();
                }
              } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                  }
                } finally {
                  if (_didIteratorError) {
                    throw _iteratorError;
                  }
                }
              }

              return false;
            };

            deepSearch(this.$scopedSlots.default());
          }
        }
      };
      mixin.computed = {
        /**
         * When items are added/removed sort them according to their position
         */
        sortedItems: function sortedItems() {
          return this.childItems.slice().sort(function (i1, i2) {
            return i1.index - i2.index;
          });
        }
      };
    }
  }

  return mixin;
});

var sorted$1 = 1;
var optional = 2;
var Sorted$1 = sorted$1;
var InjectedChildMixin = (function (parentItemName) {
  var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var mixin = {
    inject: {
      parent: {
        from: 'b' + parentItemName,
        default: false
      }
    },
    created: function created() {
      if (!this.parent) {
        if (!helpers.hasFlag(flags, optional)) {
          this.$destroy();
          throw new Error('You should wrap ' + this.$options.name + ' in a ' + parentItemName);
        }
      } else if (this.parent._registerItem) {
        this.parent._registerItem(this);
      }
    },
    beforeDestroy: function beforeDestroy() {
      if (this.parent && this.parent._unregisterItem) {
        this.parent._unregisterItem(this);
      }
    }
  };

  if (helpers.hasFlag(flags, sorted$1)) {
    mixin.data = function () {
      return {
        index: null
      };
    };
  }

  return mixin;
});

exports.InjectedChildMixin = InjectedChildMixin;
exports.ProviderParentMixin = ProviderParentMixin;
exports.Sorted = Sorted;
exports.Sorted$1 = Sorted$1;
