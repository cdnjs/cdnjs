/*!
* js-data-firebase
* @version 3.0.0-beta.2 - Homepage <https://github.com/js-data/js-data-firebase>
* @author Jason Dobry <jason.dobry@gmail.com>
* @copyright (c) 2014-2016 Jason Dobry
* @license MIT <https://github.com/js-data/js-data-firebase/blob/master/LICENSE>
*
* @overview firebase adapter for js-data.
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('js-data'), require('firebase')) :
  typeof define === 'function' && define.amd ? define('js-data-firebase', ['exports', 'js-data', 'firebase'], factory) :
  (factory((global.JSDataFirebase = global.JSDataFirebase || {}),global.JSData,global.firebase));
}(this, function (exports,jsData,firebase) { 'use strict';

  firebase = 'default' in firebase ? firebase['default'] : firebase;

  var babelHelpers = {};
  babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };

  babelHelpers.defineProperty = function (obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  };

  babelHelpers.slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  babelHelpers;

  var noop = function noop() {
    var self = this;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var opts = args[args.length - 1];
    self.dbg.apply(self, [opts.op].concat(args));
    return jsData.utils.resolve();
  };

  var noop2 = function noop2() {
    var self = this;

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var opts = args[args.length - 2];
    self.dbg.apply(self, [opts.op].concat(args));
    return jsData.utils.resolve();
  };

  var unique = function unique(array) {
    var seen = {};
    var final = [];
    array.forEach(function (item) {
      if (item in seen) {
        return;
      }
      final.push(item);
      seen[item] = 0;
    });
    return final;
  };

  var withoutRelations = function withoutRelations(mapper, props) {
    return jsData.utils.omit(props, mapper.relationFields || []);
  };

  var DEFAULTS = {
    /**
     * Whether to log debugging information.
     *
     * @name Adapter#debug
     * @type {boolean}
     * @default false
     */
    debug: false,

    /**
     * Whether to return a more detailed response object.
     *
     * @name Adapter#raw
     * @type {boolean}
     * @default false
     */
    raw: false
  };

  /**
   * Abstract class meant to be extended by adapters.
   *
   * @class Adapter
   * @abstract
   * @param {Object} [opts] Configuration opts.
   * @param {boolean} [opts.debug=false] Whether to log debugging information.
   * @param {boolean} [opts.raw=false] Whether to return a more detailed response
   * object.
   */
  function Adapter(opts) {
    var self = this;
    opts || (opts = {});
    jsData.utils.fillIn(opts, DEFAULTS);
    jsData.utils.fillIn(self, opts);
  }

  /**
   * Response object used when `raw` is `true`. May contain other fields in
   * addition to `data`.
   *
   * @class Response
   */
  function Response(data, meta, op) {
    var self = this;
    meta || (meta = {});

    /**
     * Response data.
     *
     * @name Response#data
     * @type {*}
     */
    self.data = data;

    jsData.utils.fillIn(self, meta);

    /**
     * The operation for which the response was created.
     *
     * @name Response#op
     * @type {string}
     */
    self.op = op;
  }

  /**
   * Alternative to ES6 class syntax for extending `Adapter`.
   *
   * @name Adapter.extend
   * @method
   * @param {Object} [instanceProps] Properties that will be added to the
   * prototype of the subclass.
   * @param {Object} [classProps] Properties that will be added as static
   * properties to the subclass itself.
   * @return {Object} Subclass of `Adapter`.
   */
  Adapter.extend = jsData.utils.extend;

  jsData.utils.addHiddenPropsToTarget(Adapter.prototype, {
    /**
     * Lifecycle method method called by <a href="#count__anchor">count</a>.
     *
     * Override this method to add custom behavior for this lifecycle hook.
     *
     * Returning a Promise causes <a href="#count__anchor">count</a> to wait for the Promise to resolve before continuing.
     *
     * If `opts.raw` is `true` then `response` will be a detailed response object, otherwise `response` will be the count.
     *
     * `response` may be modified. You can also re-assign `response` to another value by returning a different value or a Promise that resolves to a different value.
     *
     * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#count__anchor">count</a>.
     *
     * @name Adapter#afterCount
     * @method
     * @param {Object} mapper The `mapper` argument passed to <a href="#count__anchor">count</a>.
     * @param {Object} props The `props` argument passed to <a href="#count__anchor">count</a>.
     * @param {Object} opts The `opts` argument passed to <a href="#count__anchor">count</a>.
     * @property {string} opts.op `afterCount`
     * @param {Object|Response} response Count or {@link Response}, depending on the value of `opts.raw`.
     */
    afterCount: noop2,

    /**
     * Lifecycle method method called by <a href="#create__anchor">create</a>.
     *
     * Override this method to add custom behavior for this lifecycle hook.
     *
     * Returning a Promise causes <a href="#create__anchor">create</a> to wait for the Promise to resolve before continuing.
     *
     * If `opts.raw` is `true` then `response` will be a detailed response object, otherwise `response` will be the created record.
     *
     * `response` may be modified. You can also re-assign `response` to another value by returning a different value or a Promise that resolves to a different value.
     *
     * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#create__anchor">create</a>.
     *
     * @name Adapter#afterCreate
     * @method
     * @param {Object} mapper The `mapper` argument passed to <a href="#create__anchor">create</a>.
     * @param {Object} props The `props` argument passed to <a href="#create__anchor">create</a>.
     * @param {Object} opts The `opts` argument passed to <a href="#create__anchor">create</a>.
     * @property {string} opts.op `afterCreate`
     * @param {Object|Response} response Created record or {@link Response}, depending on the value of `opts.raw`.
     */
    afterCreate: noop2,

    /**
     * Lifecycle method method called by <a href="#createMany__anchor">createMany</a>.
     *
     * Override this method to add custom behavior for this lifecycle hook.
     *
     * Returning a Promise causes <a href="#createMany__anchor">createMany</a> to wait for the Promise to resolve before continuing.
     *
     * If `opts.raw` is `true` then `response` will be a detailed response object, otherwise `response` will be the created records.
     *
     * `response` may be modified. You can also re-assign `response` to another value by returning a different value or a Promise that resolves to a different value.
     *
     * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#createMany__anchor">createMany</a>.
     *
     * @name Adapter#afterCreate
     * @method
     * @param {Object} mapper The `mapper` argument passed to <a href="#createMany__anchor">createMany</a>.
     * @param {Object[]} props The `props` argument passed to <a href="#createMany__anchor">createMany</a>.
     * @param {Object} opts The `opts` argument passed to <a href="#createMany__anchor">createMany</a>.
     * @property {string} opts.op `afterCreateMany`
     * @param {Object[]|Response} response Created records or {@link Response}, depending on the value of `opts.raw`.
     */
    afterCreateMany: noop2,

    /**
     * Lifecycle method method called by <a href="#destroy__anchor">destroy</a>.
     *
     * Override this method to add custom behavior for this lifecycle hook.
     *
     * Returning a Promise causes <a href="#destroy__anchor">destroy</a> to wait for the Promise to resolve before continuing.
     *
     * If `opts.raw` is `true` then `response` will be a detailed response object, otherwise `response` will be `undefined`.
     *
     * `response` may be modified. You can also re-assign `response` to another value by returning a different value or a Promise that resolves to a different value.
     *
     * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#destroy__anchor">destroy</a>.
     *
     * @name Adapter#afterDestroy
     * @method
     * @param {Object} mapper The `mapper` argument passed to <a href="#destroy__anchor">destroy</a>.
     * @param {(string|number)} id The `id` argument passed to <a href="#destroy__anchor">destroy</a>.
     * @param {Object} opts The `opts` argument passed to <a href="#destroy__anchor">destroy</a>.
     * @property {string} opts.op `afterDestroy`
     * @param {undefined|Response} response `undefined` or {@link Response}, depending on the value of `opts.raw`.
     */
    afterDestroy: noop2,

    /**
     * Lifecycle method method called by <a href="#destroyAll__anchor">destroyAll</a>.
     *
     * Override this method to add custom behavior for this lifecycle hook.
     *
     * Returning a Promise causes <a href="#destroyAll__anchor">destroyAll</a> to wait for the Promise to resolve before continuing.
     *
     * If `opts.raw` is `true` then `response` will be a detailed response object, otherwise `response` will be `undefined`.
     *
     * `response` may be modified. You can also re-assign `response` to another value by returning a different value or a Promise that resolves to a different value.
     *
     * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#destroyAll__anchor">destroyAll</a>.
     *
     * @name Adapter#afterDestroyAll
     * @method
     * @param {Object} mapper The `mapper` argument passed to <a href="#destroyAll__anchor">destroyAll</a>.
     * @param {Object} query The `query` argument passed to <a href="#destroyAll__anchor">destroyAll</a>.
     * @param {Object} opts The `opts` argument passed to <a href="#destroyAll__anchor">destroyAll</a>.
     * @property {string} opts.op `afterDestroyAll`
     * @param {undefined|Response} response `undefined` or {@link Response}, depending on the value of `opts.raw`.
     */
    afterDestroyAll: noop2,

    /**
     * Lifecycle method method called by <a href="#find__anchor">find</a>.
     *
     * Override this method to add custom behavior for this lifecycle hook.
     *
     * Returning a Promise causes <a href="#find__anchor">find</a> to wait for the Promise to resolve before continuing.
     *
     * If `opts.raw` is `true` then `response` will be a detailed response object, otherwise `response` will be the found record, if any.
     *
     * `response` may be modified. You can also re-assign `response` to another value by returning a different value or a Promise that resolves to a different value.
     *
     * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#find__anchor">find</a>.
     *
     * @name Adapter#afterFind
     * @method
     * @param {Object} mapper The `mapper` argument passed to <a href="#find__anchor">find</a>.
     * @param {(string|number)} id The `id` argument passed to <a href="#find__anchor">find</a>.
     * @param {Object} opts The `opts` argument passed to <a href="#find__anchor">find</a>.
     * @property {string} opts.op `afterFind`
     * @param {Object|Response} response The found record or {@link Response}, depending on the value of `opts.raw`.
     */
    afterFind: noop2,

    /**
     * Lifecycle method method called by <a href="#findAll__anchor">findAll</a>.
     *
     * Override this method to add custom behavior for this lifecycle hook.
     *
     * Returning a Promise causes <a href="#findAll__anchor">findAll</a> to wait for the Promise to resolve before continuing.
     *
     * If `opts.raw` is `true` then `response` will be a detailed response object, otherwise `response` will be the found records, if any.
     *
     * `response` may be modified. You can also re-assign `response` to another value by returning a different value or a Promise that resolves to a different value.
     *
     * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#findAll__anchor">findAll</a>.
     *
     * @name Adapter#afterFindAll
     * @method
     * @param {Object} mapper The `mapper` argument passed to <a href="#findAll__anchor">findAll</a>.
     * @param {Object} query The `query` argument passed to <a href="#findAll__anchor">findAll</a>.
     * @param {Object} opts The `opts` argument passed to <a href="#findAll__anchor">findAll</a>.
     * @property {string} opts.op `afterFindAll`
     * @param {Object[]|Response} response The found records or {@link Response}, depending on the value of `opts.raw`.
     */
    afterFindAll: noop2,

    /**
     * Lifecycle method method called by <a href="#sum__anchor">sum</a>.
     *
     * Override this method to add custom behavior for this lifecycle hook.
     *
     * Returning a Promise causes <a href="#sum__anchor">sum</a> to wait for the Promise to resolve before continuing.
     *
     * If `opts.raw` is `true` then `response` will be a detailed response object, otherwise `response` will be the sum.
     *
     * `response` may be modified. You can also re-assign `response` to another value by returning a different value or a Promise that resolves to a different value.
     *
     * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#sum__anchor">sum</a>.
     *
     * @name Adapter#afterSum
     * @method
     * @param {Object} mapper The `mapper` argument passed to <a href="#sum__anchor">sum</a>.
     * @param {string} field The `field` argument passed to <a href="#sum__anchor">sum</a>.
     * @param {Object} query The `query` argument passed to <a href="#sum__anchor">sum</a>.
     * @param {Object} opts The `opts` argument passed to <a href="#sum__anchor">sum</a>.
     * @property {string} opts.op `afterSum`
     * @param {Object|Response} response Count or {@link Response}, depending on the value of `opts.raw`.
     */
    afterSum: noop2,

    /**
     * Lifecycle method method called by <a href="#update__anchor">update</a>.
     *
     * Override this method to add custom behavior for this lifecycle hook.
     *
     * Returning a Promise causes <a href="#update__anchor">update</a> to wait for the Promise to resolve before continuing.
     *
     * If `opts.raw` is `true` then `response` will be a detailed response object, otherwise `response` will be the updated record.
     *
     * `response` may be modified. You can also re-assign `response` to another value by returning a different value or a Promise that resolves to a different value.
     *
     * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#update__anchor">update</a>.
     *
     * @name Adapter#afterUpdate
     * @method
     * @param {Object} mapper The `mapper` argument passed to <a href="#update__anchor">update</a>.
     * @param {(string|number)} id The `id` argument passed to <a href="#update__anchor">update</a>.
     * @param {Object} props The `props` argument passed to <a href="#update__anchor">update</a>.
     * @param {Object} opts The `opts` argument passed to <a href="#update__anchor">update</a>.
     * @property {string} opts.op `afterUpdate`
     * @param {Object|Response} response The updated record or {@link Response}, depending on the value of `opts.raw`.
     */
    afterUpdate: noop2,

    /**
     * Lifecycle method method called by <a href="#updateAll__anchor">updateAll</a>.
     *
     * Override this method to add custom behavior for this lifecycle hook.
     *
     * Returning a Promise causes <a href="#updateAll__anchor">updateAll</a> to wait for the Promise to resolve before continuing.
     *
     * If `opts.raw` is `true` then `response` will be a detailed response object, otherwise `response` will be the updated records, if any.
     *
     * `response` may be modified. You can also re-assign `response` to another value by returning a different value or a Promise that resolves to a different value.
     *
     * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#updateAll__anchor">updateAll</a>.
     *
     * @name Adapter#afterUpdateAll
     * @method
     * @param {Object} mapper The `mapper` argument passed to <a href="#updateAll__anchor">updateAll</a>.
     * @param {Object} props The `props` argument passed to <a href="#updateAll__anchor">updateAll</a>.
     * @param {Object} query The `query` argument passed to <a href="#updateAll__anchor">updateAll</a>.
     * @param {Object} opts The `opts` argument passed to <a href="#updateAll__anchor">updateAll</a>.
     * @property {string} opts.op `afterUpdateAll`
     * @param {Object[]|Response} response The updated records or {@link Response}, depending on the value of `opts.raw`.
     */
    afterUpdateAll: noop2,

    /**
     * Lifecycle method method called by <a href="#updateMany__anchor">updateMany</a>.
     *
     * Override this method to add custom behavior for this lifecycle hook.
     *
     * Returning a Promise causes <a href="#updateMany__anchor">updateMany</a> to wait for the Promise to resolve before continuing.
     *
     * If `opts.raw` is `true` then `response` will be a detailed response object, otherwise `response` will be the updated records, if any.
     *
     * `response` may be modified. You can also re-assign `response` to another value by returning a different value or a Promise that resolves to a different value.
     *
     * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#updateMany__anchor">updateMany</a>.
     *
     * @name Adapter#afterUpdateMany
     * @method
     * @param {Object} mapper The `mapper` argument passed to <a href="#updateMany__anchor">updateMany</a>.
     * @param {Object[]} records The `records` argument passed to <a href="#updateMany__anchor">updateMany</a>.
     * @param {Object} opts The `opts` argument passed to <a href="#updateMany__anchor">updateMany</a>.
     * @property {string} opts.op `afterUpdateMany`
     * @param {Object[]|Response} response The updated records or {@link Response}, depending on the value of `opts.raw`.
     */
    afterUpdateMany: noop2,

    /**
     * Lifecycle method method called by <a href="#count__anchor">count</a>.
     *
     * Override this method to add custom behavior for this lifecycle hook.
     *
     * Returning a Promise causes <a href="#count__anchor">count</a> to wait for the Promise to resolve before continuing.
     *
     * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#count__anchor">count</a>.
     *
     * @name Adapter#beforeCount
     * @method
     * @param {Object} mapper The `mapper` argument passed to <a href="#count__anchor">count</a>.
     * @param {Object} query The `query` argument passed to <a href="#count__anchor">count</a>.
     * @param {Object} opts The `opts` argument passed to <a href="#count__anchor">count</a>.
     * @property {string} opts.op `beforeCount`
     */
    beforeCount: noop,

    /**
     * Lifecycle method method called by <a href="#create__anchor">create</a>.
     *
     * Override this method to add custom behavior for this lifecycle hook.
     *
     * Returning a Promise causes <a href="#create__anchor">create</a> to wait for the Promise to resolve before continuing.
     *
     * `props` may be modified. You can also re-assign `props` to another value by returning a different value or a Promise that resolves to a different value.
     *
     * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#create__anchor">create</a>.
     *
     * @name Adapter#beforeCreate
     * @method
     * @param {Object} mapper The `mapper` argument passed to <a href="#create__anchor">create</a>.
     * @param {Object} props The `props` argument passed to <a href="#create__anchor">create</a>.
     * @param {Object} opts The `opts` argument passed to <a href="#create__anchor">create</a>.
     * @property {string} opts.op `beforeCreate`
     */
    beforeCreate: noop,

    /**
     * Lifecycle method method called by <a href="#createMany__anchor">createMany</a>.
     *
     * Override this method to add custom behavior for this lifecycle hook.
     *
     * Returning a Promise causes <a href="#createMany__anchor">createMany</a> to wait for the Promise to resolve before continuing.
     *
     * `props` may be modified. You can also re-assign `props` to another value by returning a different value or a Promise that resolves to a different value.
     *
     * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#createMany__anchor">createMany</a>.
     *
     * @name Adapter#beforeCreateMany
     * @method
     * @param {Object} mapper The `mapper` argument passed to <a href="#createMany__anchor">createMany</a>.
     * @param {Object[]} props The `props` argument passed to <a href="#createMany__anchor">createMany</a>.
     * @param {Object} opts The `opts` argument passed to <a href="#createMany__anchor">createMany</a>.
     * @property {string} opts.op `beforeCreateMany`
     */
    beforeCreateMany: noop,

    /**
     * Lifecycle method method called by <a href="#destroy__anchor">destroy</a>.
     *
     * Override this method to add custom behavior for this lifecycle hook.
     *
     * Returning a Promise causes <a href="#destroy__anchor">destroy</a> to wait for the Promise to resolve before continuing.
     *
     * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#destroy__anchor">destroy</a>.
     *
     * @name Adapter#beforeDestroy
     * @method
     * @param {Object} mapper The `mapper` argument passed to <a href="#destroy__anchor">destroy</a>.
     * @param {(string|number)} id The `id` argument passed to <a href="#destroy__anchor">destroy</a>.
     * @param {Object} opts The `opts` argument passed to <a href="#destroy__anchor">destroy</a>.
     * @property {string} opts.op `beforeDestroy`
     */
    beforeDestroy: noop,

    /**
     * Lifecycle method method called by <a href="#destroyAll__anchor">destroyAll</a>.
     *
     * Override this method to add custom behavior for this lifecycle hook.
     *
     * Returning a Promise causes <a href="#destroyAll__anchor">destroyAll</a> to wait for the Promise to resolve before continuing.
     *
     * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#destroyAll__anchor">destroyAll</a>.
     *
     * @name Adapter#beforeDestroyAll
     * @method
     * @param {Object} mapper The `mapper` argument passed to <a href="#destroyAll__anchor">destroyAll</a>.
     * @param {Object} query The `query` argument passed to <a href="#destroyAll__anchor">destroyAll</a>.
     * @param {Object} opts The `opts` argument passed to <a href="#destroyAll__anchor">destroyAll</a>.
     * @property {string} opts.op `beforeDestroyAll`
     */
    beforeDestroyAll: noop,

    /**
     * Lifecycle method method called by <a href="#find__anchor">find</a>.
     *
     * Override this method to add custom behavior for this lifecycle hook.
     *
     * Returning a Promise causes <a href="#find__anchor">find</a> to wait for the Promise to resolve before continuing.
     *
     * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#find__anchor">find</a>.
     *
     * @name Adapter#beforeFind
     * @method
     * @param {Object} mapper The `mapper` argument passed to <a href="#find__anchor">find</a>.
     * @param {(string|number)} id The `id` argument passed to <a href="#find__anchor">find</a>.
     * @param {Object} opts The `opts` argument passed to <a href="#find__anchor">find</a>.
     * @property {string} opts.op `beforeFind`
     */
    beforeFind: noop,

    /**
     * Lifecycle method method called by <a href="#findAll__anchor">findAll</a>.
     *
     * Override this method to add custom behavior for this lifecycle hook.
     *
     * Returning a Promise causes <a href="#findAll__anchor">findAll</a> to wait for the Promise to resolve before continuing.
     *
     * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#findAll__anchor">findAll</a>.
     *
     * @name Adapter#beforeFindAll
     * @method
     * @param {Object} mapper The `mapper` argument passed to <a href="#findAll__anchor">findAll</a>.
     * @param {Object} query The `query` argument passed to <a href="#findAll__anchor">findAll</a>.
     * @param {Object} opts The `opts` argument passed to <a href="#findAll__anchor">findAll</a>.
     * @property {string} opts.op `beforeFindAll`
     */
    beforeFindAll: noop,

    /**
     * Lifecycle method method called by <a href="#sum__anchor">sum</a>.
     *
     * Override this method to add custom behavior for this lifecycle hook.
     *
     * Returning a Promise causes <a href="#sum__anchor">sum</a> to wait for the Promise to resolve before continuing.
     *
     * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#sum__anchor">sum</a>.
     *
     * @name Adapter#beforeSum
     * @method
     * @param {Object} mapper The `mapper` argument passed to <a href="#sum__anchor">sum</a>.
     * @param {Object} query The `query` argument passed to <a href="#sum__anchor">sum</a>.
     * @param {Object} opts The `opts` argument passed to <a href="#sum__anchor">sum</a>.
     * @property {string} opts.op `beforeSum`
     */
    beforeSum: noop,

    /**
     * Lifecycle method method called by <a href="#update__anchor">update</a>.
     *
     * Override this method to add custom behavior for this lifecycle hook.
     *
     * Returning a Promise causes <a href="#update__anchor">update</a> to wait for the Promise to resolve before continuing.
     *
     * `props` may be modified. You can also re-assign `props` to another value by returning a different value or a Promise that resolves to a different value.
     *
     * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#update__anchor">update</a>.
     *
     * @name Adapter#beforeUpdate
     * @method
     * @param {Object} mapper The `mapper` argument passed to <a href="#update__anchor">update</a>.
     * @param {(string|number)} id The `id` argument passed to <a href="#update__anchor">update</a>.
     * @param {Object} props The `props` argument passed to <a href="#update__anchor">update</a>.
     * @param {Object} opts The `opts` argument passed to <a href="#update__anchor">update</a>.
     * @property {string} opts.op `beforeUpdate`
     */
    beforeUpdate: noop,

    /**
     * Lifecycle method method called by <a href="#updateAll__anchor">updateAll</a>.
     *
     * Override this method to add custom behavior for this lifecycle hook.
     *
     * Returning a Promise causes <a href="#updateAll__anchor">updateAll</a> to wait for the Promise to resolve before continuing.
     *
     * `props` may be modified. You can also re-assign `props` to another value by returning a different value or a Promise that resolves to a different value.
     *
     * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#updateAll__anchor">updateAll</a>.
     *
     * @name Adapter#beforeUpdateAll
     * @method
     * @param {Object} mapper The `mapper` argument passed to <a href="#updateAll__anchor">updateAll</a>.
     * @param {Object} props The `props` argument passed to <a href="#updateAll__anchor">updateAll</a>.
     * @param {Object} query The `query` argument passed to <a href="#updateAll__anchor">updateAll</a>.
     * @param {Object} opts The `opts` argument passed to <a href="#updateAll__anchor">updateAll</a>.
     * @property {string} opts.op `beforeUpdateAll`
     */
    beforeUpdateAll: noop,

    /**
     * Lifecycle method method called by <a href="#updateMany__anchor">updateMany</a>.
     *
     * Override this method to add custom behavior for this lifecycle hook.
     *
     * Returning a Promise causes <a href="#updateMany__anchor">updateMany</a> to wait for the Promise to resolve before continuing.
     *
     * `props` may be modified. You can also re-assign `props` to another value by returning a different value or a Promise that resolves to a different value.
     *
     * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#updateMany__anchor">updateMany</a>.
     *
     * @name Adapter#beforeUpdateMany
     * @method
     * @param {Object} mapper The `mapper` argument passed to <a href="#updateMany__anchor">updateMany</a>.
     * @param {Object[]} props The `props` argument passed to <a href="#updateMany__anchor">updateMany</a>.
     * @param {Object} opts The `opts` argument passed to <a href="#updateMany__anchor">updateMany</a>.
     * @property {string} opts.op `beforeUpdateMany`
     */
    beforeUpdateMany: noop,

    /**
     * Shortcut for `#log('debug'[, arg1[, arg2[, argn]]])`.
     *
     * @name Adapter#dbg
     * @method
     */
    dbg: function dbg() {
      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      this.log.apply(this, ['debug'].concat(args));
    },


    /**
     * Retrieve the number of records that match the selection query. Called by
     * `Mapper#count`.
     *
     * @name Adapter#count
     * @method
     * @param {Object} mapper The mapper.
     * @param {Object} [query] Selection query.
     * @param {Object} [query.where] Filtering criteria.
     * @param {string|Array} [query.orderBy] Sorting criteria.
     * @param {string|Array} [query.sort] Same as `query.sort`.
     * @param {number} [query.limit] Limit results.
     * @param {number} [query.skip] Offset results.
     * @param {number} [query.offset] Same as `query.skip`.
     * @param {Object} [opts] Configuration options.
     * @param {boolean} [opts.raw=false] Whether to return a more detailed
     * response object.
     * @return {Promise}
     */
    count: function count(mapper, query, opts) {
      var self = this;
      var op = void 0;
      query || (query = {});
      opts || (opts = {});

      // beforeCount lifecycle hook
      op = opts.op = 'beforeCount';
      return jsData.utils.resolve(self[op](mapper, query, opts)).then(function () {
        // Allow for re-assignment from lifecycle hook
        op = opts.op = 'count';
        self.dbg(op, mapper, query, opts);
        return jsData.utils.resolve(self._count(mapper, query, opts));
      }).then(function (results) {
        var _results = babelHelpers.slicedToArray(results, 2);

        var data = _results[0];
        var result = _results[1];

        result || (result = {});
        var response = new Response(data, result, op);
        response = self.respond(response, opts);

        // afterCount lifecycle hook
        op = opts.op = 'afterCount';
        return jsData.utils.resolve(self[op](mapper, query, opts, response)).then(function (_response) {
          // Allow for re-assignment from lifecycle hook
          return jsData.utils.isUndefined(_response) ? response : _response;
        });
      });
    },


    /**
     * Create a new record. Called by `Mapper#create`.
     *
     * @name Adapter#create
     * @method
     * @param {Object} mapper The mapper.
     * @param {Object} props The record to be created.
     * @param {Object} [opts] Configuration options.
     * @param {boolean} [opts.raw=false] Whether to return a more detailed
     * response object.
     * @return {Promise}
     */
    create: function create(mapper, props, opts) {
      var self = this;
      var op = void 0;
      props || (props = {});
      opts || (opts = {});

      // beforeCreate lifecycle hook
      op = opts.op = 'beforeCreate';
      return jsData.utils.resolve(self[op](mapper, props, opts)).then(function (_props) {
        // Allow for re-assignment from lifecycle hook
        props = jsData.utils.isUndefined(_props) ? props : _props;
        props = withoutRelations(mapper, props);
        op = opts.op = 'create';
        self.dbg(op, mapper, props, opts);
        return jsData.utils.resolve(self._create(mapper, props, opts));
      }).then(function (results) {
        var _results2 = babelHelpers.slicedToArray(results, 2);

        var data = _results2[0];
        var result = _results2[1];

        result || (result = {});
        var response = new Response(data, result, 'create');
        response.created = data ? 1 : 0;
        response = self.respond(response, opts);

        // afterCreate lifecycle hook
        op = opts.op = 'afterCreate';
        return jsData.utils.resolve(self[op](mapper, props, opts, response)).then(function (_response) {
          // Allow for re-assignment from lifecycle hook
          return jsData.utils.isUndefined(_response) ? response : _response;
        });
      });
    },


    /**
     * Create multiple records in a single batch. Called by `Mapper#createMany`.
     *
     * @name Adapter#createMany
     * @method
     * @param {Object} mapper The mapper.
     * @param {Object} props The records to be created.
     * @param {Object} [opts] Configuration options.
     * @param {boolean} [opts.raw=false] Whether to return a more detailed
     * response object.
     * @return {Promise}
     */
    createMany: function createMany(mapper, props, opts) {
      var self = this;
      var op = void 0;
      props || (props = {});
      opts || (opts = {});

      // beforeCreateMany lifecycle hook
      op = opts.op = 'beforeCreateMany';
      return jsData.utils.resolve(self[op](mapper, props, opts)).then(function (_props) {
        // Allow for re-assignment from lifecycle hook
        props = jsData.utils.isUndefined(_props) ? props : _props;
        props = props.map(function (record) {
          return withoutRelations(mapper, record);
        });
        op = opts.op = 'createMany';
        self.dbg(op, mapper, props, opts);
        return jsData.utils.resolve(self._createMany(mapper, props, opts));
      }).then(function (results) {
        var _results3 = babelHelpers.slicedToArray(results, 2);

        var data = _results3[0];
        var result = _results3[1];

        data || (data = []);
        result || (result = {});
        var response = new Response(data, result, 'createMany');
        response.created = data.length;
        response = self.respond(response, opts);

        // afterCreateMany lifecycle hook
        op = opts.op = 'afterCreateMany';
        return jsData.utils.resolve(self[op](mapper, props, opts, response)).then(function (_response) {
          // Allow for re-assignment from lifecycle hook
          return jsData.utils.isUndefined(_response) ? response : _response;
        });
      });
    },


    /**
     * Destroy the record with the given primary key. Called by
     * `Mapper#destroy`.
     *
     * @name Adapter#destroy
     * @method
     * @param {Object} mapper The mapper.
     * @param {(string|number)} id Primary key of the record to destroy.
     * @param {Object} [opts] Configuration options.
     * @param {boolean} [opts.raw=false] Whether to return a more detailed
     * response object.
     * @return {Promise}
     */
    destroy: function destroy(mapper, id, opts) {
      var self = this;
      var op = void 0;
      opts || (opts = {});

      // beforeDestroy lifecycle hook
      op = opts.op = 'beforeDestroy';
      return jsData.utils.resolve(self[op](mapper, id, opts)).then(function () {
        op = opts.op = 'destroy';
        self.dbg(op, mapper, id, opts);
        return jsData.utils.resolve(self._destroy(mapper, id, opts));
      }).then(function (results) {
        var _results4 = babelHelpers.slicedToArray(results, 2);

        var data = _results4[0];
        var result = _results4[1];

        result || (result = {});
        var response = new Response(data, result, 'destroy');
        response = self.respond(response, opts);

        // afterDestroy lifecycle hook
        op = opts.op = 'afterDestroy';
        return jsData.utils.resolve(self[op](mapper, id, opts, response)).then(function (_response) {
          // Allow for re-assignment from lifecycle hook
          return jsData.utils.isUndefined(_response) ? response : _response;
        });
      });
    },


    /**
     * Destroy the records that match the selection query. Called by
     * `Mapper#destroyAll`.
     *
     * @name Adapter#destroyAll
     * @method
     * @param {Object} mapper the mapper.
     * @param {Object} [query] Selection query.
     * @param {Object} [query.where] Filtering criteria.
     * @param {string|Array} [query.orderBy] Sorting criteria.
     * @param {string|Array} [query.sort] Same as `query.sort`.
     * @param {number} [query.limit] Limit results.
     * @param {number} [query.skip] Offset results.
     * @param {number} [query.offset] Same as `query.skip`.
     * @param {Object} [opts] Configuration options.
     * @param {boolean} [opts.raw=false] Whether to return a more detailed
     * response object.
     * @return {Promise}
     */
    destroyAll: function destroyAll(mapper, query, opts) {
      var self = this;
      var op = void 0;
      query || (query = {});
      opts || (opts = {});

      // beforeDestroyAll lifecycle hook
      op = opts.op = 'beforeDestroyAll';
      return jsData.utils.resolve(self[op](mapper, query, opts)).then(function () {
        op = opts.op = 'destroyAll';
        self.dbg(op, mapper, query, opts);
        return jsData.utils.resolve(self._destroyAll(mapper, query, opts));
      }).then(function (results) {
        var _results5 = babelHelpers.slicedToArray(results, 2);

        var data = _results5[0];
        var result = _results5[1];

        result || (result = {});
        var response = new Response(data, result, 'destroyAll');
        response = self.respond(response, opts);

        // afterDestroyAll lifecycle hook
        op = opts.op = 'afterDestroyAll';
        return jsData.utils.resolve(self[op](mapper, query, opts, response)).then(function (_response) {
          // Allow for re-assignment from lifecycle hook
          return jsData.utils.isUndefined(_response) ? response : _response;
        });
      });
    },


    /**
     * Load a belongsTo relationship.
     *
     * Override with care.
     *
     * @name Adapter#loadBelongsTo
     * @method
     * @return {Promise}
     */
    loadBelongsTo: function loadBelongsTo(mapper, def, records, __opts) {
      var self = this;
      var relationDef = def.getRelation();

      if (jsData.utils.isObject(records) && !jsData.utils.isArray(records)) {
        var _ret = function () {
          var record = records;
          return {
            v: self.find(relationDef, self.makeBelongsToForeignKey(mapper, def, record), __opts).then(function (relatedItem) {
              def.setLocalField(record, relatedItem);
            })
          };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : babelHelpers.typeof(_ret)) === "object") return _ret.v;
      } else {
        var keys = records.map(function (record) {
          return self.makeBelongsToForeignKey(mapper, def, record);
        }).filter(function (key) {
          return key;
        });
        return self.findAll(relationDef, {
          where: babelHelpers.defineProperty({}, relationDef.idAttribute, {
            'in': keys
          })
        }, __opts).then(function (relatedItems) {
          records.forEach(function (record) {
            relatedItems.forEach(function (relatedItem) {
              if (relatedItem[relationDef.idAttribute] === record[def.foreignKey]) {
                def.setLocalField(record, relatedItem);
              }
            });
          });
        });
      }
    },


    /**
     * Retrieve the record with the given primary key. Called by `Mapper#find`.
     *
     * @name Adapter#find
     * @method
     * @param {Object} mapper The mapper.
     * @param {(string|number)} id Primary key of the record to retrieve.
     * @param {Object} [opts] Configuration options.
     * @param {boolean} [opts.raw=false] Whether to return a more detailed
     * response object.
     * @param {string[]} [opts.with=[]] Relations to eager load.
     * @return {Promise}
     */
    find: function find(mapper, id, opts) {
      var self = this;
      var record = void 0,
          op = void 0;
      opts || (opts = {});
      opts.with || (opts.with = []);

      // beforeFind lifecycle hook
      op = opts.op = 'beforeFind';
      return jsData.utils.resolve(self[op](mapper, id, opts)).then(function () {
        op = opts.op = 'find';
        self.dbg(op, mapper, id, opts);
        return jsData.utils.resolve(self._find(mapper, id, opts));
      }).then(function (results) {
        var _results6 = babelHelpers.slicedToArray(results, 1);

        var _record = _results6[0];

        if (!_record) {
          return;
        }
        record = _record;
        var tasks = [];

        jsData.utils.forEachRelation(mapper, opts, function (def, __opts) {
          var task = void 0;
          if (def.foreignKey && (def.type === 'hasOne' || def.type === 'hasMany')) {
            if (def.type === 'hasOne') {
              task = self.loadHasOne(mapper, def, record, __opts);
            } else {
              task = self.loadHasMany(mapper, def, record, __opts);
            }
          } else if (def.type === 'hasMany' && def.localKeys) {
            task = self.loadHasManyLocalKeys(mapper, def, record, __opts);
          } else if (def.type === 'hasMany' && def.foreignKeys) {
            task = self.loadHasManyForeignKeys(mapper, def, record, __opts);
          } else if (def.type === 'belongsTo') {
            task = self.loadBelongsTo(mapper, def, record, __opts);
          }
          if (task) {
            tasks.push(task);
          }
        });

        return Promise.all(tasks);
      }).then(function () {
        var response = new Response(record, {}, 'find');
        response.found = record ? 1 : 0;
        response = self.respond(response, opts);

        // afterFind lifecycle hook
        op = opts.op = 'afterFind';
        return jsData.utils.resolve(self[op](mapper, id, opts, response)).then(function (_response) {
          // Allow for re-assignment from lifecycle hook
          return jsData.utils.isUndefined(_response) ? response : _response;
        });
      });
    },


    /**
     * Retrieve the records that match the selection query.
     *
     * @name Adapter#findAll
     * @method
     * @param {Object} mapper The mapper.
     * @param {Object} [query] Selection query.
     * @param {Object} [query.where] Filtering criteria.
     * @param {string|Array} [query.orderBy] Sorting criteria.
     * @param {string|Array} [query.sort] Same as `query.sort`.
     * @param {number} [query.limit] Limit results.
     * @param {number} [query.skip] Offset results.
     * @param {number} [query.offset] Same as `query.skip`.
     * @param {Object} [opts] Configuration options.
     * @param {boolean} [opts.raw=false] Whether to return a more detailed
     * response object.
     * @param {string[]} [opts.with=[]] Relations to eager load.
     * @return {Promise}
     */
    findAll: function findAll(mapper, query, opts) {
      var self = this;
      opts || (opts = {});
      opts.with || (opts.with = []);

      var records = [];
      var op = void 0;
      var activeWith = opts._activeWith;

      if (jsData.utils.isObject(activeWith)) {
        var activeQuery = activeWith.query || {};
        if (activeWith.replace) {
          query = activeQuery;
        } else {
          jsData.utils.deepFillIn(query, activeQuery);
        }
      }

      // beforeFindAll lifecycle hook
      op = opts.op = 'beforeFindAll';
      return jsData.utils.resolve(self[op](mapper, query, opts)).then(function () {
        op = opts.op = 'findAll';
        self.dbg(op, mapper, query, opts);
        return jsData.utils.resolve(self._findAll(mapper, query, opts));
      }).then(function (results) {
        var _results7 = babelHelpers.slicedToArray(results, 1);

        var _records = _results7[0];

        _records || (_records = []);
        records = _records;
        var tasks = [];
        jsData.utils.forEachRelation(mapper, opts, function (def, __opts) {
          var task = void 0;
          if (def.foreignKey && (def.type === 'hasOne' || def.type === 'hasMany')) {
            if (def.type === 'hasMany') {
              task = self.loadHasMany(mapper, def, records, __opts);
            } else {
              task = self.loadHasOne(mapper, def, records, __opts);
            }
          } else if (def.type === 'hasMany' && def.localKeys) {
            task = self.loadHasManyLocalKeys(mapper, def, records, __opts);
          } else if (def.type === 'hasMany' && def.foreignKeys) {
            task = self.loadHasManyForeignKeys(mapper, def, records, __opts);
          } else if (def.type === 'belongsTo') {
            task = self.loadBelongsTo(mapper, def, records, __opts);
          }
          if (task) {
            tasks.push(task);
          }
        });
        return Promise.all(tasks);
      }).then(function () {
        var response = new Response(records, {}, 'findAll');
        response.found = records.length;
        response = self.respond(response, opts);

        // afterFindAll lifecycle hook
        op = opts.op = 'afterFindAll';
        return jsData.utils.resolve(self[op](mapper, query, opts, response)).then(function (_response) {
          // Allow for re-assignment from lifecycle hook
          return jsData.utils.isUndefined(_response) ? response : _response;
        });
      });
    },


    /**
     * Resolve the value of the specified option based on the given options and
     * this adapter's settings. Override with care.
     *
     * @name Adapter#getOpt
     * @method
     * @param {string} opt The name of the option.
     * @param {Object} [opts] Configuration options.
     * @return {*} The value of the specified option.
     */
    getOpt: function getOpt(opt, opts) {
      opts || (opts = {});
      return jsData.utils.isUndefined(opts[opt]) ? jsData.utils.plainCopy(this[opt]) : jsData.utils.plainCopy(opts[opt]);
    },


    /**
     * Load a hasMany relationship.
     *
     * Override with care.
     *
     * @name Adapter#loadHasMany
     * @method
     * @return {Promise}
     */
    loadHasMany: function loadHasMany(mapper, def, records, __opts) {
      var self = this;
      var singular = false;

      if (jsData.utils.isObject(records) && !jsData.utils.isArray(records)) {
        singular = true;
        records = [records];
      }
      var IDs = records.map(function (record) {
        return self.makeHasManyForeignKey(mapper, def, record);
      });
      var query = {
        where: {}
      };
      var criteria = query.where[def.foreignKey] = {};
      if (singular) {
        // more efficient query when we only have one record
        criteria['=='] = IDs[0];
      } else {
        criteria['in'] = IDs.filter(function (id) {
          return id;
        });
      }
      return self.findAll(def.getRelation(), query, __opts).then(function (relatedItems) {
        records.forEach(function (record) {
          var attached = [];
          // avoid unneccesary iteration when we only have one record
          if (singular) {
            attached = relatedItems;
          } else {
            relatedItems.forEach(function (relatedItem) {
              if (jsData.utils.get(relatedItem, def.foreignKey) === record[mapper.idAttribute]) {
                attached.push(relatedItem);
              }
            });
          }
          def.setLocalField(record, attached);
        });
      });
    },
    loadHasManyLocalKeys: function loadHasManyLocalKeys(mapper, def, records, __opts) {
      var self = this;
      var record = void 0;
      var relatedMapper = def.getRelation();

      if (jsData.utils.isObject(records) && !jsData.utils.isArray(records)) {
        record = records;
      }

      if (record) {
        return self.findAll(relatedMapper, {
          where: babelHelpers.defineProperty({}, relatedMapper.idAttribute, {
            'in': self.makeHasManyLocalKeys(mapper, def, record)
          })
        }, __opts).then(function (relatedItems) {
          def.setLocalField(record, relatedItems);
        });
      } else {
        var _ret2 = function () {
          var localKeys = [];
          records.forEach(function (record) {
            localKeys = localKeys.concat(self.self.makeHasManyLocalKeys(mapper, def, record));
          });
          return {
            v: self.findAll(relatedMapper, {
              where: babelHelpers.defineProperty({}, relatedMapper.idAttribute, {
                'in': unique(localKeys).filter(function (x) {
                  return x;
                })
              })
            }, __opts).then(function (relatedItems) {
              records.forEach(function (item) {
                var attached = [];
                var itemKeys = jsData.utils.get(item, def.localKeys) || [];
                itemKeys = jsData.utils.isArray(itemKeys) ? itemKeys : Object.keys(itemKeys);
                relatedItems.forEach(function (relatedItem) {
                  if (itemKeys && itemKeys.indexOf(relatedItem[relatedMapper.idAttribute]) !== -1) {
                    attached.push(relatedItem);
                  }
                });
                def.setLocalField(item, attached);
              });
              return relatedItems;
            })
          };
        }();

        if ((typeof _ret2 === 'undefined' ? 'undefined' : babelHelpers.typeof(_ret2)) === "object") return _ret2.v;
      }
    },
    loadHasManyForeignKeys: function loadHasManyForeignKeys(mapper, def, records, __opts) {
      var self = this;
      var relatedMapper = def.getRelation();
      var idAttribute = mapper.idAttribute;
      var record = void 0;

      if (jsData.utils.isObject(records) && !jsData.utils.isArray(records)) {
        record = records;
      }

      if (record) {
        return self.findAll(def.getRelation(), {
          where: babelHelpers.defineProperty({}, def.foreignKeys, {
            'contains': self.makeHasManyForeignKeys(mapper, def, record)
          })
        }, __opts).then(function (relatedItems) {
          def.setLocalField(record, relatedItems);
        });
      } else {
        return self.findAll(relatedMapper, {
          where: babelHelpers.defineProperty({}, def.foreignKeys, {
            'isectNotEmpty': records.map(function (record) {
              return self.makeHasManyForeignKeys(mapper, def, record);
            })
          })
        }, __opts).then(function (relatedItems) {
          var foreignKeysField = def.foreignKeys;
          records.forEach(function (record) {
            var _relatedItems = [];
            var id = jsData.utils.get(record, idAttribute);
            relatedItems.forEach(function (relatedItem) {
              var foreignKeys = jsData.utils.get(relatedItems, foreignKeysField) || [];
              if (foreignKeys.indexOf(id) !== -1) {
                _relatedItems.push(relatedItem);
              }
            });
            def.setLocalField(record, _relatedItems);
          });
        });
      }
    },


    /**
     * Load a hasOne relationship.
     *
     * Override with care.
     *
     * @name Adapter#loadHasOne
     * @method
     * @return {Promise}
     */
    loadHasOne: function loadHasOne(mapper, def, records, __opts) {
      if (jsData.utils.isObject(records) && !jsData.utils.isArray(records)) {
        records = [records];
      }
      return this.loadHasMany(mapper, def, records, __opts).then(function () {
        records.forEach(function (record) {
          var relatedData = def.getLocalField(record);
          if (jsData.utils.isArray(relatedData) && relatedData.length) {
            def.setLocalField(record, relatedData[0]);
          }
        });
      });
    },


    /**
     * Logging utility method. Override this method if you want to send log
     * messages to something other than the console.
     *
     * @name Adapter#log
     * @method
     * @param {string} level Log level.
     * @param {...*} values Values to log.
     */
    log: function log(level) {
      for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        args[_key4 - 1] = arguments[_key4];
      }

      if (level && !args.length) {
        args.push(level);
        level = 'debug';
      }
      if (level === 'debug' && !this.debug) {
        return;
      }
      var prefix = level.toUpperCase() + ': (Adapter)';
      if (console[level]) {
        var _console;

        (_console = console)[level].apply(_console, [prefix].concat(args));
      } else {
        var _console2;

        (_console2 = console).log.apply(_console2, [prefix].concat(args));
      }
    },


    /**
     * Return the foreignKey from the given record for the provided relationship.
     *
     * There may be reasons why you may want to override this method, like when
     * the id of the parent doesn't exactly match up to the key on the child.
     *
     * Override with care.
     *
     * @name Adapter#makeHasManyForeignKey
     * @method
     * @return {*}
     */
    makeHasManyForeignKey: function makeHasManyForeignKey(mapper, def, record) {
      return def.getForeignKey(record);
    },


    /**
     * Return the localKeys from the given record for the provided relationship.
     *
     * Override with care.
     *
     * @name Adapter#makeHasManyLocalKeys
     * @method
     * @return {*}
     */
    makeHasManyLocalKeys: function makeHasManyLocalKeys(mapper, def, record) {
      var localKeys = [];
      var itemKeys = jsData.utils.get(record, def.localKeys) || [];
      itemKeys = jsData.utils.isArray(itemKeys) ? itemKeys : Object.keys(itemKeys);
      localKeys = localKeys.concat(itemKeys);
      return unique(localKeys).filter(function (x) {
        return x;
      });
    },


    /**
     * Return the foreignKeys from the given record for the provided relationship.
     *
     * Override with care.
     *
     * @name Adapter#makeHasManyForeignKeys
     * @method
     * @return {*}
     */
    makeHasManyForeignKeys: function makeHasManyForeignKeys(mapper, def, record) {
      return jsData.utils.get(record, mapper.idAttribute);
    },


    /**
     * Return the foreignKey from the given record for the provided relationship.
     *
     * Override with care.
     *
     * @name Adapter#makeBelongsToForeignKey
     * @method
     * @return {*}
     */
    makeBelongsToForeignKey: function makeBelongsToForeignKey(mapper, def, record) {
      return def.getForeignKey(record);
    },


    /**
     * Retrieve sum of the specified field of the records that match the selection
     * query. Called by `Mapper#sum`.
     *
     * @name Adapter#sum
     * @method
     * @param {Object} mapper The mapper.
     * @param {string} field By to sum.
     * @param {Object} [query] Selection query.
     * @param {Object} [query.where] Filtering criteria.
     * @param {string|Array} [query.orderBy] Sorting criteria.
     * @param {string|Array} [query.sort] Same as `query.sort`.
     * @param {number} [query.limit] Limit results.
     * @param {number} [query.skip] Offset results.
     * @param {number} [query.offset] Same as `query.skip`.
     * @param {Object} [opts] Configuration options.
     * @param {boolean} [opts.raw=false] Whether to return a more detailed
     * response object.
     * @return {Promise}
     */
    sum: function sum(mapper, field, query, opts) {
      var self = this;
      var op = void 0;
      if (!jsData.utils.isString(field)) {
        throw new Error('field must be a string!');
      }
      query || (query = {});
      opts || (opts = {});

      // beforeSum lifecycle hook
      op = opts.op = 'beforeSum';
      return jsData.utils.resolve(self[op](mapper, field, query, opts)).then(function () {
        // Allow for re-assignment from lifecycle hook
        op = opts.op = 'sum';
        self.dbg(op, mapper, field, query, opts);
        return jsData.utils.resolve(self._sum(mapper, field, query, opts));
      }).then(function (results) {
        var _results8 = babelHelpers.slicedToArray(results, 2);

        var data = _results8[0];
        var result = _results8[1];

        result || (result = {});
        var response = new Response(data, result, op);
        response = self.respond(response, opts);

        // afterSum lifecycle hook
        op = opts.op = 'afterSum';
        return jsData.utils.resolve(self[op](mapper, field, query, opts, response)).then(function (_response) {
          // Allow for re-assignment from lifecycle hook
          return jsData.utils.isUndefined(_response) ? response : _response;
        });
      });
    },


    /**
     * @name Adapter#respond
     * @method
     * @param {Object} response Response object.
     * @param {Object} opts Configuration options.
     * return {Object} If `opts.raw == true` then return `response`, else return
     * `response.data`.
     */
    respond: function respond(response, opts) {
      return this.getOpt('raw', opts) ? response : response.data;
    },


    /**
     * Apply the given update to the record with the specified primary key. Called
     * by `Mapper#update`.
     *
     * @name Adapter#update
     * @method
     * @param {Object} mapper The mapper.
     * @param {(string|number)} id The primary key of the record to be updated.
     * @param {Object} props The update to apply to the record.
     * @param {Object} [opts] Configuration options.
     * @param {boolean} [opts.raw=false] Whether to return a more detailed
     * response object.
     * @return {Promise}
     */
    update: function update(mapper, id, props, opts) {
      var self = this;
      props || (props = {});
      opts || (opts = {});
      var op = void 0;

      // beforeUpdate lifecycle hook
      op = opts.op = 'beforeUpdate';
      return jsData.utils.resolve(self[op](mapper, id, props, opts)).then(function (_props) {
        // Allow for re-assignment from lifecycle hook
        props = jsData.utils.isUndefined(_props) ? props : _props;
        props = withoutRelations(mapper, props);
        op = opts.op = 'update';
        self.dbg(op, mapper, id, props, opts);
        return jsData.utils.resolve(self._update(mapper, id, props, opts));
      }).then(function (results) {
        var _results9 = babelHelpers.slicedToArray(results, 2);

        var data = _results9[0];
        var result = _results9[1];

        result || (result = {});
        var response = new Response(data, result, 'update');
        response.updated = data ? 1 : 0;
        response = self.respond(response, opts);

        // afterUpdate lifecycle hook
        op = opts.op = 'afterUpdate';
        return jsData.utils.resolve(self[op](mapper, id, props, opts, response)).then(function (_response) {
          // Allow for re-assignment from lifecycle hook
          return jsData.utils.isUndefined(_response) ? response : _response;
        });
      });
    },


    /**
     * Apply the given update to all records that match the selection query.
     * Called by `Mapper#updateAll`.
     *
     * @name Adapter#updateAll
     * @method
     * @param {Object} mapper The mapper.
     * @param {Object} props The update to apply to the selected records.
     * @param {Object} [query] Selection query.
     * @param {Object} [query.where] Filtering criteria.
     * @param {string|Array} [query.orderBy] Sorting criteria.
     * @param {string|Array} [query.sort] Same as `query.sort`.
     * @param {number} [query.limit] Limit results.
     * @param {number} [query.skip] Offset results.
     * @param {number} [query.offset] Same as `query.skip`.
     * @param {Object} [opts] Configuration options.
     * @param {boolean} [opts.raw=false] Whether to return a more detailed
     * response object.
     * @return {Promise}
     */
    updateAll: function updateAll(mapper, props, query, opts) {
      var self = this;
      props || (props = {});
      query || (query = {});
      opts || (opts = {});
      var op = void 0;

      // beforeUpdateAll lifecycle hook
      op = opts.op = 'beforeUpdateAll';
      return jsData.utils.resolve(self[op](mapper, props, query, opts)).then(function (_props) {
        // Allow for re-assignment from lifecycle hook
        props = jsData.utils.isUndefined(_props) ? props : _props;
        props = withoutRelations(mapper, props);
        op = opts.op = 'updateAll';
        self.dbg(op, mapper, props, query, opts);
        return jsData.utils.resolve(self._updateAll(mapper, props, query, opts));
      }).then(function (results) {
        var _results10 = babelHelpers.slicedToArray(results, 2);

        var data = _results10[0];
        var result = _results10[1];

        data || (data = []);
        result || (result = {});
        var response = new Response(data, result, 'updateAll');
        response.updated = data.length;
        response = self.respond(response, opts);

        // afterUpdateAll lifecycle hook
        op = opts.op = 'afterUpdateAll';
        return jsData.utils.resolve(self[op](mapper, props, query, opts, response)).then(function (_response) {
          // Allow for re-assignment from lifecycle hook
          return jsData.utils.isUndefined(_response) ? response : _response;
        });
      });
    },


    /**
     * Update the given records in a single batch. Called by `Mapper#updateMany`.
     *
     * @name Adapter#updateMany
     * @method
     * @param {Object} mapper The mapper.
     * @param {Object[]} records The records to update.
     * @param {Object} [opts] Configuration options.
     * @param {boolean} [opts.raw=false] Whether to return a more detailed
     * response object.
     * @return {Promise}
     */
    updateMany: function updateMany(mapper, records, opts) {
      var self = this;
      records || (records = []);
      opts || (opts = {});
      var op = void 0;
      var idAttribute = mapper.idAttribute;

      records = records.filter(function (record) {
        return jsData.utils.get(record, idAttribute);
      });

      // beforeUpdateMany lifecycle hook
      op = opts.op = 'beforeUpdateMany';
      return jsData.utils.resolve(self[op](mapper, records, opts)).then(function (_records) {
        // Allow for re-assignment from lifecycle hook
        records = jsData.utils.isUndefined(_records) ? records : _records;
        records = records.map(function (record) {
          return withoutRelations(mapper, record);
        });
        op = opts.op = 'updateMany';
        self.dbg(op, mapper, records, opts);
        return jsData.utils.resolve(self._updateMany(mapper, records, opts));
      }).then(function (results) {
        var _results11 = babelHelpers.slicedToArray(results, 2);

        var data = _results11[0];
        var result = _results11[1];

        data || (data = []);
        result || (result = {});
        var response = new Response(data, result, 'updateMany');
        response.updated = data.length;
        response = self.respond(response, opts);

        // afterUpdateMany lifecycle hook
        op = opts.op = 'afterUpdateMany';
        return jsData.utils.resolve(self[op](mapper, records, opts, response)).then(function (_response) {
          // Allow for re-assignment from lifecycle hook
          return jsData.utils.isUndefined(_response) ? response : _response;
        });
      });
    }
  });

  var queue = [];
  var taskInProcess = false;

  function enqueue(task) {
    queue.push(task);
  }

  function dequeue() {
    if (queue.length && !taskInProcess) {
      taskInProcess = true;
      queue[0]();
    }
  }

  function queueTask(task) {
    if (!queue.length) {
      enqueue(task);
      dequeue();
    } else {
      enqueue(task);
    }
  }

  function createTask(fn) {
    return new jsData.utils.Promise(fn).then(function (result) {
      taskInProcess = false;
      queue.shift();
      setTimeout(dequeue, 0);
      return result;
    }, function (err) {
      taskInProcess = false;
      queue.shift();
      setTimeout(dequeue, 0);
      return jsData.utils.reject(err);
    });
  }

  var __super__ = Adapter.prototype;

  /**
   * FirebaseAdapter class.
   *
   * @example <caption>Browser</caption>
   * import {DataStore} from 'js-data'
   * import firebase from 'firebase'
   * import {FirebaseAdapter} from 'js-data-firebase'
   * const store = new DataStore()
   * firebase.initializeApp({
   *   apiKey: 'your-api-key',
   *   databaseURL: 'your-database-url'
   * })
   * const adapter = new FirebaseAdapter({ db: firebase.database() })
   * store.registerAdapter('firebase', adapter, { 'default': true })
   *
   * @example <caption>Node.js</caption>
   * import {Container} from 'js-data'
   * import firebase from 'firebase'
   * import {FirebaseAdapter} from 'js-data-firebase'
   * const store = new Container()
   * firebase.initializeApp({
   *   databaseURL: 'your-database-url',
   *   serviceAccount: 'path/to/keyfile'
   * })
   * const adapter = new FirebaseAdapter({ db: firebase.database() })
   * store.registerAdapter('firebase', adapter, { 'default': true })
   *
   * @class FirebaseAdapter
   * @param {Object} [opts] Configuration opts.
   * @param {Object} [opts.db] See {@link FirebaseAdapter#db}
   * @param {boolean} [opts.debug=false] See {@link Adapter#debug}.
   * @param {boolean} [opts.raw=false] See {@link Adapter#raw}.
   */
  function FirebaseAdapter(opts) {
    jsData.utils.classCallCheck(this, FirebaseAdapter);
    opts || (opts = {});
    Adapter.call(this, opts);

    /**
     * The database instance used by this adapter.
     *
     * @name FirebaseAdapter#db
     * @type {Object}
     * @default firebase.database()
     */
    if (opts.db) {
      this.db = opts.db || firebase.database();
    }
  }

  // Setup prototype inheritance from Adapter
  FirebaseAdapter.prototype = Object.create(Adapter.prototype, {
    constructor: {
      value: FirebaseAdapter,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  Object.defineProperty(FirebaseAdapter, '__super__', {
    configurable: true,
    value: Adapter
  });

  /**
   * Alternative to ES6 class syntax for extending `FirebaseAdapter`.
   *
   * @example <caption>Using the ES2015 class syntax.</caption>
   * class MyFirebaseAdapter extends FirebaseAdapter {...}
   * const adapter = new MyFirebaseAdapter()
   *
   * @example <caption>Using {@link FirebaseAdapter.extend}.</caption>
   * var instanceProps = {...}
   * var classProps = {...}
   *
   * var MyFirebaseAdapter = FirebaseAdapter.extend(instanceProps, classProps)
   * var adapter = new MyFirebaseAdapter()
   *
   * @method FirebaseAdapter.extend
   * @static
   * @param {Object} [instanceProps] Properties that will be added to the
   * prototype of the subclass.
   * @param {Object} [classProps] Properties that will be added as static
   * properties to the subclass itself.
   * @return {Constructor} Subclass of `FirebaseAdapter`.
   */
  FirebaseAdapter.extend = jsData.utils.extend;

  jsData.utils.addHiddenPropsToTarget(FirebaseAdapter.prototype, {
    /**
     * Retrieve the number of records that match the selection query. Internal
     * method used by Adapter#count.
     *
     * @name FirebaseAdapter#_count
     * @method
     * @private
     * @param {Object} mapper The mapper.
     * @param {Object} query Selection query.
     * @param {Object} [opts] Configuration options.
     * @return {Promise}
     */

    _count: function _count(mapper, query, opts) {
      query || (query = {});
      opts || (opts = {});
      return this._findAll(mapper, query, opts).then(function (result) {
        result[0] = result[0].length;
        return result;
      });
    },


    /**
     * Create a new record. Internal method used by Adapter#create.
     *
     * @name FirebaseAdapter#_create
     * @method
     * @private
     * @param {Object} mapper The mapper.
     * @param {Object} props The record to be created.
     * @param {Object} [opts] Configuration options.
     * @return {Promise}
     */
    _create: function _create(mapper, props, opts) {
      props || (props = {});
      opts || (opts = {});
      return this._upsert(mapper, props, opts);
    },
    _upsert: function _upsert(mapper, props, opts) {
      var _this = this;

      var _props = jsData.utils.plainCopy(props);
      opts || (opts = {});

      var id = jsData.utils.get(_props, mapper.idAttribute);
      var collectionRef = this.getRef(mapper, opts);

      var itemRef = void 0;

      if (jsData.utils.isSorN(id)) {
        itemRef = collectionRef.child(id);
      } else {
        itemRef = collectionRef.push();
        jsData.utils.set(_props, mapper.idAttribute, itemRef.key);
      }

      return itemRef.set(_props).then(function () {
        return _this._once(itemRef);
      }).then(function (record) {
        if (!record) {
          throw new Error('Not Found');
        }
        return [record, { ref: itemRef }];
      });
    },
    _upsertBatch: function _upsertBatch(mapper, records, opts) {
      var _this2 = this;

      opts || (opts = {});

      var idAttribute = mapper.idAttribute;
      var refValueCollection = [];
      var collectionRef = this.getRef(mapper, opts);

      // generate path for each
      records.forEach(function (record) {
        var id = jsData.utils.get(record, idAttribute);
        var _props = jsData.utils.plainCopy(record);
        var itemRef = void 0;

        if (jsData.utils.isSorN(id)) {
          itemRef = collectionRef.child(id);
        } else {
          itemRef = collectionRef.push();
          jsData.utils.set(_props, idAttribute, itemRef.key);
        }
        refValueCollection.push({ ref: itemRef, props: _props });
      });

      return this._atomicUpdate(mapper, refValueCollection, opts).then(function () {
        // since UDFs and timestamps can alter values on write, let's get the latest values
        return jsData.utils.Promise.all(refValueCollection.map(function (item) {
          return _this2._once(item.ref);
        }));
      }).then(function (records) {
        // just return the updated records and not the refs?
        return [records, { ref: refValueCollection.map(function (item) {
            return item.ref;
          }) }];
      });
    },
    _once: function _once(ref) {
      return ref.once('value').then(function (dataSnapshot) {
        if (!dataSnapshot.exists()) {
          return null;
        }
        return dataSnapshot.val();
      });
    },
    _atomicUpdate: function _atomicUpdate(mapper, refValueCollection, opts) {
      var _this3 = this;

      // collection of refs and the new value to set at that ref
      // do a deep-path update off the database
      // see https://www.firebase.com/blog/2015-09-24-atomic-writes-and-more.html
      var atomicUpdate = {};
      refValueCollection.forEach(function (item) {
        atomicUpdate[item.ref.toString().replace(_this3.getRef(mapper, opts).toString(), '')] = item.props;
      });
      return this.getRef(mapper, opts).update(atomicUpdate);
    },


    /**
     * Create multiple records in a single batch. Internal method used by
     * Adapter#createMany.
     *
     * @name FirebaseAdapter#_createMany
     * @method
     * @private
     * @param {Object} mapper The mapper.
     * @param {Object} records The records to be created.
     * @param {Object} [opts] Configuration options.
     * @return {Promise}
     */
    _createMany: function _createMany(mapper, records, opts) {
      opts || (opts = {});
      return this._upsertBatch(mapper, records, opts);
    },


    /**
     * Destroy the record with the given primary key. Internal method used by
     * Adapter#destroy.
     *
     * @name FirebaseAdapter#_destroy
     * @method
     * @private
     * @param {Object} mapper The mapper.
     * @param {(string|number)} id Primary key of the record to destroy.
     * @param {Object} [opts] Configuration options.
     * @return {Promise}
     */
    _destroy: function _destroy(mapper, id, opts) {
      opts || (opts = {});
      var ref = this.getRef(mapper, opts).child(id);
      return ref.remove().then(function () {
        return [undefined, { ref: ref }];
      });
    },


    /**
     * Destroy the records that match the selection query. Internal method used by
     * Adapter#destroyAll.
     *
     * @name FirebaseAdapter#_destroyAll
     * @method
     * @private
     * @param {Object} mapper the mapper.
     * @param {Object} [query] Selection query.
     * @param {Object} [opts] Configuration options.
     * @return {Promise}
     */
    _destroyAll: function _destroyAll(mapper, query, opts) {
      var _this4 = this;

      query || (query = {});
      opts || (opts = {});

      return this._findAll(mapper, query).then(function (results) {
        var _results = babelHelpers.slicedToArray(results, 1);

        var records = _results[0];

        var idAttribute = mapper.idAttribute;
        return jsData.utils.Promise.all(records.map(function (record) {
          return _this4._destroy(mapper, jsData.utils.get(record, idAttribute), opts);
        }));
      }).then(function () {
        return [undefined, {}];
      });
    },


    /**
     * Retrieve the record with the given primary key. Internal method used by
     * Adapter#find.
     *
     * @name FirebaseAdapter#_find
     * @method
     * @private
     * @param {Object} mapper The mapper.
     * @param {(string|number)} id Primary key of the record to retrieve.
     * @param {Object} [opts] Configuration options.
     * @return {Promise}
     */
    _find: function _find(mapper, id, opts) {
      opts || (opts = {});
      var itemRef = this.getRef(mapper, opts).child(id);
      return this._once(itemRef).then(function (record) {
        return [record, { ref: itemRef }];
      });
    },

    /**
      * Retrieve the records that match the selection query. Internal method used
      * by Adapter#findAll.
      *
      * @name FirebaseAdapter#_findAll
      * @method
      * @private
      * @param {Object} mapper The mapper.
      * @param {Object} query Selection query.
      * @param {Object} [opts] Configuration options.
      * @return {Promise}
      */
    _findAll: function _findAll(mapper, query, opts) {
      query || (query = {});
      opts || (opts = {});

      var collectionRef = this.getRef(mapper, opts);

      return collectionRef.once('value').then(function (dataSnapshot) {
        var data = dataSnapshot.val();
        if (!data) {
          return [[], { ref: collectionRef }];
        }
        var records = [];
        jsData.utils.forOwn(data, function (value, key) {
          records.push(value);
        });
        var _query = new jsData.Query({
          index: {
            getAll: function getAll() {
              return records;
            }
          }
        });
        return [_query.filter(query).run(), { ref: collectionRef }];
      });
    },


    /**
     * Retrieve the number of records that match the selection query. Internal
     * method used by Adapter#sum.
     *
     * @name FirebaseAdapter#_sum
     * @method
     * @private
     * @param {Object} mapper The mapper.
     * @param {string} field The field to sum.
     * @param {Object} query Selection query.
     * @param {Object} [opts] Configuration options.
     * @return {Promise}
     */
    _sum: function _sum(mapper, field, query, opts) {
      return this._findAll(mapper, query, opts).then(function (result) {
        result[0] = result[0].reduce(function (sum, record) {
          return sum + (jsData.utils.get(record, field) || 0);
        }, 0);
        return result;
      });
    },


    /**
     * Apply the given update to the record with the specified primary key.
     * Internal method used by Adapter#update.
     *
     * @name FirebaseAdapter#_update
     * @method
     * @private
     * @param {Object} mapper The mapper.
     * @param {(string|number)} id The primary key of the record to be updated.
     * @param {Object} props The update to apply to the record.
     * @param {Object} [opts] Configuration options.
     * @return {Promise}
     */
    _update: function _update(mapper, id, props, opts) {
      var _this5 = this;

      props || (props = {});
      opts || (opts = {});

      var itemRef = this.getRef(mapper, opts).child(id);
      return this._once(itemRef).then(function (currentVal) {
        if (!currentVal) {
          throw new Error('Not Found');
        }
        jsData.utils.deepMixIn(currentVal, props);
        return itemRef.set(currentVal);
      }).then(function () {
        return _this5._once(itemRef);
      }).then(function (record) {
        if (!record) {
          throw new Error('Not Found');
        }
        return [record, { ref: itemRef }];
      });
    },


    /**
     * Apply the given update to all records that match the selection query.
     * Internal method used by Adapter#updateAll.
     *
     * @name FirebaseAdapter#_updateAll
     * @method
     * @private
     * @param {Object} mapper The mapper.
     * @param {Object} props The update to apply to the selected records.
     * @param {Object} [query] Selection query.
     * @param {Object} [opts] Configuration options.
     * @return {Promise}
     */
    _updateAll: function _updateAll(mapper, props, query, opts) {
      var _this6 = this;

      opts || (opts = {});
      props || (props = {});
      query || (query = {});

      return this._findAll(mapper, query, opts).then(function (results) {
        var _results2 = babelHelpers.slicedToArray(results, 1);

        var records = _results2[0];

        records.forEach(function (record) {
          return jsData.utils.deepMixIn(record, props);
        });
        return _this6._upsertBatch(mapper, records, opts);
      });
    },


    /**
     * Update the given records in a single batch. Internal method used by
     * Adapter#updateMany.
     *
     * @name FirebaseAdapter#updateMany
     * @method
     * @private
     * @param {Object} mapper The mapper.
     * @param {Object[]} records The records to update.
     * @param {Object} [opts] Configuration options.
     * @return {Promise}
     */
    _updateMany: function _updateMany(mapper, records, opts) {
      opts || (opts = {});
      return this._upsertBatch(mapper, records, opts);
    },
    getRef: function getRef(mapper, opts) {
      opts = opts || {};
      return this.db.ref().child(opts.endpoint || mapper.endpoint || mapper.name);
    },
    create: function create(mapper, props, opts) {
      var _this7 = this;

      return createTask(function (success, failure) {
        queueTask(function () {
          __super__.create.call(_this7, mapper, props, opts).then(success, failure);
        });
      });
    },
    createMany: function createMany(mapper, props, opts) {
      var _this8 = this;

      return createTask(function (success, failure) {
        queueTask(function () {
          __super__.createMany.call(_this8, mapper, props, opts).then(success, failure);
        });
      });
    },
    destroy: function destroy(mapper, id, opts) {
      var _this9 = this;

      return createTask(function (success, failure) {
        queueTask(function () {
          __super__.destroy.call(_this9, mapper, id, opts).then(success, failure);
        });
      });
    },
    destroyAll: function destroyAll(mapper, query, opts) {
      var _this10 = this;

      return createTask(function (success, failure) {
        queueTask(function () {
          __super__.destroyAll.call(_this10, mapper, query, opts).then(success, failure);
        });
      });
    },
    update: function update(mapper, id, props, opts) {
      var _this11 = this;

      return createTask(function (success, failure) {
        queueTask(function () {
          __super__.update.call(_this11, mapper, id, props, opts).then(success, failure);
        });
      });
    },
    updateAll: function updateAll(mapper, props, query, opts) {
      var _this12 = this;

      return createTask(function (success, failure) {
        queueTask(function () {
          __super__.updateAll.call(_this12, mapper, props, query, opts).then(success, failure);
        });
      });
    },
    updateMany: function updateMany(mapper, records, opts) {
      var _this13 = this;

      return createTask(function (success, failure) {
        queueTask(function () {
          __super__.updateMany.call(_this13, mapper, records, opts).then(success, failure);
        });
      });
    }
  });

  /**
   * Details of the current version of the `js-data-firebase` module.
   *
   * @name FirebaseAdapter.version
   * @type {Object}
   * @property {string} version.full The full semver value.
   * @property {number} version.major The major version number.
   * @property {number} version.minor The minor version number.
   * @property {number} version.patch The patch version number.
   * @property {(string|boolean)} version.alpha The alpha version value,
   * otherwise `false` if the current version is not alpha.
   * @property {(string|boolean)} version.beta The beta version value,
   * otherwise `false` if the current version is not beta.
   */

  var version = {
  beta: 2,
  full: '3.0.0-beta.2',
  major: 3,
  minor: 0,
  patch: 0
};

  /**
   * {@link FirebaseAdapter} class.
   *
   * @name module:js-data-firebase.FirebaseAdapter
   * @see FirebaseAdapter
   */

  /**
   * Registered as `js-data-firebase` in NPM and Bower.
   *
   * @example <caption>Script tag</caption>
   * var FirebaseAdapter = window.JSDataFirebase.FirebaseAdapter
   * var adapter = new FirebaseAdapter()
   *
   * @example <caption>CommonJS</caption>
   * var FirebaseAdapter = require('js-data-firebase').FirebaseAdapter
   * var adapter = new FirebaseAdapter()
   *
   * @example <caption>ES2015 Modules</caption>
   * import {FirebaseAdapter} from 'js-data-firebase'
   * const adapter = new FirebaseAdapter()
   *
   * @example <caption>AMD</caption>
   * define('myApp', ['js-data-firebase'], function (JSDataFirebase) {
   *   var FirebaseAdapter = JSDataFirebase.FirebaseAdapter
   *   var adapter = new FirebaseAdapter()
   *
   *   // ...
   * })
   *
   * @module js-data-firebase
   */

  exports.FirebaseAdapter = FirebaseAdapter;
  exports.version = version;

}));
//# sourceMappingURL=js-data-firebase.js.map