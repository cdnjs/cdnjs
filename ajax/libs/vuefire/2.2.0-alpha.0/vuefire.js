/*!
  * vuefire v2.2.0-alpha.0
  * (c) 2019 Eduardo San Martin Morote
  * @license MIT
  */
var Vuefire = (function (exports) {
  'use strict';

  /**
   * Walks a path inside an object
   * walkGet({ a: { b: true }}), 'a.b') -> true
   * @param obj
   * @param path
   */
  function walkGet(obj, path) {
      // TODO: development warning when target[key] does not exist
      return path.split('.').reduce(function (target, key) {
          // @ts-ignore
          return target[key];
      }, obj);
  }
  /**
   * Deeply set a property in an object with a string path
   * walkSet({ a: { b: true }}, 'a.b', false)
   * @param obj
   * @param path
   * @param value
   * @returns an array with the element that was replaced or the value that was set
   */
  function walkSet(obj, path, value) {
      // path can be a number
      var keys = ('' + path).split('.');
      var key = keys.pop(); // split will produce at least one element array
      var target = keys.reduce(function (target, key) {
          // TODO: dev errors
          // @ts-ignore
          return target[key];
      }, obj);
      return Array.isArray(target) ? target.splice(Number(key), 1, value) : (target[key] = value);
  }
  /**
   * Checks if a variable is an object
   * @param o
   */
  function isObject(o) {
      return o && typeof o === 'object';
  }
  /**
   * Checks if a variable is a Date
   * @param o
   */
  function isTimestamp(o) {
      return o.toDate;
  }
  /**
   * Checks if a variable is a Firestore Document Reference
   * @param o
   */
  function isDocumentRef(o) {
      return o && o.onSnapshot;
  }
  /**
   * Wraps a function so it gets called only once
   * @param fn Function to be called once
   * @param argFn Function to compute the argument passed to fn
   */
  function callOnceWithArg(fn, argFn) {
      /** @type {boolean | undefined} */
      var called = false;
      return function () {
          if (!called) {
              called = true;
              return fn(argFn());
          }
      };
  }

  /**
   * Convert firebase RTDB snapshot into a bindable data record.
   *
   * @param snapshot
   * @return
   */
  function createRecordFromRTDBSnapshot(snapshot) {
      var value = snapshot.val();
      var res = isObject(value) ? value : Object.defineProperty({}, '.value', { value: value });
      // if (isObject(value)) {
      //   res = value
      // } else {
      //   res = {}
      //   Object.defineProperty(res, '.value', { value })
      // }
      Object.defineProperty(res, '.key', { value: snapshot.key });
      return res;
  }
  /**
   * Find the index for an object with given key.
   *
   * @param array
   * @param key
   * @return the index where the key was found
   */
  function indexForKey(array, key) {
      for (var i = 0; i < array.length; i++) {
          if (array[i]['.key'] === key)
              return i;
      }
      return -1;
  }

  var DEFAULT_OPTIONS = {
      reset: true,
      serialize: createRecordFromRTDBSnapshot,
      wait: false,
  };
  /**
   * Binds a RTDB reference as an object
   * @param param0
   * @param options
   * @returns a function to be called to stop listeninng for changes
   */
  function rtdbBindAsObject(_a, extraOptions) {
      var vm = _a.vm, key = _a.key, document = _a.document, resolve = _a.resolve, reject = _a.reject, ops = _a.ops;
      if (extraOptions === void 0) { extraOptions = DEFAULT_OPTIONS; }
      var options = Object.assign({}, DEFAULT_OPTIONS, extraOptions);
      var listener = document.on('value', function (snapshot) {
          ops.set(vm, key, options.serialize(snapshot));
      }, reject);
      document.once('value', resolve);
      return function (reset) {
          document.off('value', listener);
          if (reset !== false) {
              var value = typeof reset === 'function' ? reset() : null;
              ops.set(vm, key, value);
          }
      };
  }
  /**
   * Binds a RTDB reference or query as an array
   * @param param0
   * @param options
   * @returns a function to be called to stop listeninng for changes
   */
  function rtdbBindAsArray(_a, extraOptions) {
      var vm = _a.vm, key = _a.key, collection = _a.collection, resolve = _a.resolve, reject = _a.reject, ops = _a.ops;
      if (extraOptions === void 0) { extraOptions = DEFAULT_OPTIONS; }
      var options = Object.assign({}, DEFAULT_OPTIONS, extraOptions);
      var array = options.wait ? [] : ops.set(vm, key, []);
      var childAdded = collection.on('child_added', function (snapshot, prevKey) {
          var index = prevKey ? indexForKey(array, prevKey) + 1 : 0;
          ops.add(array, index, options.serialize(snapshot));
      }, reject);
      var childRemoved = collection.on('child_removed', function (snapshot) {
          ops.remove(array, indexForKey(array, snapshot.key));
      }, reject);
      var childChanged = collection.on('child_changed', function (snapshot) {
          ops.set(array, indexForKey(array, snapshot.key), options.serialize(snapshot));
      }, reject);
      var childMoved = collection.on('child_moved', function (snapshot, prevKey) {
          var index = indexForKey(array, snapshot.key);
          var oldRecord = ops.remove(array, index)[0];
          var newIndex = prevKey ? indexForKey(array, prevKey) + 1 : 0;
          ops.add(array, newIndex, oldRecord);
      }, reject);
      collection.once('value', function (data) {
          if (options.wait)
              ops.set(vm, key, array);
          resolve(data);
      });
      return function (reset) {
          collection.off('child_added', childAdded);
          collection.off('child_changed', childChanged);
          collection.off('child_removed', childRemoved);
          collection.off('child_moved', childMoved);
          if (reset !== false) {
              var value = typeof reset === 'function' ? reset() : [];
              ops.set(vm, key, value);
          }
      };
  }

  function createSnapshot(doc) {
      // defaults everything to false, so no need to set
      return Object.defineProperty(doc.data(), 'id', { value: doc.id });
  }
  function extractRefs(doc, oldDoc, path, result) {
      if (oldDoc === void 0) { oldDoc = {}; }
      if (path === void 0) { path = ''; }
      if (result === void 0) { result = [{}, {}]; }
      // must be set here because walkGet can return null or undefined
      oldDoc = oldDoc || {};
      var data = result[0], refs = result[1];
      // TODO: this won't work if the user defines their own defined properties
      // should we do it for every non enumerable property?
      var idDescriptor = Object.getOwnPropertyDescriptor(doc, 'id');
      if (idDescriptor && !idDescriptor.enumerable) {
          Object.defineProperty(data, 'id', idDescriptor);
      }
      var _loop_1 = function (key) {
          var ref = doc[key];
          // if it's a ref
          if (isDocumentRef(ref)) {
              data[key] = oldDoc[key] || ref.path;
              // TODO handle subpathes?
              refs[path + key] = ref;
          }
          else if (Array.isArray(ref)) {
              // TODO handle array
              data[key] = Array(ref.length);
              var oldArray = oldDoc[key] || [];
              // Items that are no longer in the array aren't going to be processed
              var newElements = oldArray.filter(
              // @ts-ignore FIXME:
              function (oldRef) { return ref.indexOf(oldRef) !== -1; });
              extractRefs(ref, newElements, path + key + '.', [data[key], refs]);
          }
          else if (ref == null ||
              // Firestore < 4.13
              ref instanceof Date ||
              isTimestamp(ref) ||
              (ref.longitude && ref.latitude) // GeoPoint
          ) {
              data[key] = ref;
          }
          else if (isObject(ref)) {
              data[key] = {};
              extractRefs(ref, oldDoc[key], path + key + '.', [data[key], refs]);
          }
          else {
              data[key] = ref;
          }
      };
      for (var key in doc) {
          _loop_1(key);
      }
      return result;
  }

  // TODO: do the opposite, use optioal<> only on one function
  var DEFAULT_OPTIONS$1 = {
      maxRefDepth: 2,
      reset: true,
      serialize: createSnapshot,
      wait: false,
  };
  function unsubscribeAll(subs) {
      for (var sub in subs) {
          subs[sub].unsub();
      }
  }
  function updateDataFromDocumentSnapshot(_a, options) {
      var snapshot = _a.snapshot, target = _a.target, path = _a.path, subs = _a.subs, ops = _a.ops, depth = _a.depth, resolve = _a.resolve;
      // TODO: maybe we should options.serialize the snapshot here
      var _b = extractRefs(snapshot, walkGet(target, path)), data = _b[0], refs = _b[1];
      // NOTE use ops
      ops.set(target, path, data);
      // walkSet(target, path, data)
      subscribeToRefs({
          subs: subs,
          refs: refs,
          target: target,
          path: path,
          ops: ops,
          depth: depth,
          resolve: resolve,
      }, options);
  }
  function subscribeToDocument(_a, options) {
      var ref = _a.ref, target = _a.target, path = _a.path, depth = _a.depth, resolve = _a.resolve, ops = _a.ops;
      var subs = Object.create(null);
      var unbind = ref.onSnapshot(function (doc) {
          if (doc.exists) {
              updateDataFromDocumentSnapshot({
                  snapshot: options.serialize(doc),
                  target: target,
                  path: path,
                  ops: ops,
                  subs: subs,
                  depth: depth,
                  resolve: resolve,
              }, options);
          }
          else {
              ops.set(target, path, null);
              resolve(path);
          }
      });
      return function () {
          unbind();
          unsubscribeAll(subs);
      };
  }
  // NOTE not convinced by the naming of subscribeToRefs and subscribeToDocument
  // first one is calling the other on every ref and subscribeToDocument may call
  // updateDataFromDocumentSnapshot which may call subscribeToRefs as well
  function subscribeToRefs(_a, options) {
      var subs = _a.subs, refs = _a.refs, target = _a.target, path = _a.path, depth = _a.depth, ops = _a.ops, resolve = _a.resolve;
      var refKeys = Object.keys(refs);
      var missingKeys = Object.keys(subs).filter(function (refKey) { return refKeys.indexOf(refKey) < 0; });
      // unbind keys that are no longer there
      missingKeys.forEach(function (refKey) {
          subs[refKey].unsub();
          delete subs[refKey];
      });
      if (!refKeys.length || ++depth > options.maxRefDepth)
          return resolve(path);
      var resolvedCount = 0;
      var totalToResolve = refKeys.length;
      var validResolves = Object.create(null);
      function deepResolve(key) {
          if (key in validResolves) {
              if (++resolvedCount >= totalToResolve)
                  resolve(path);
          }
      }
      refKeys.forEach(function (refKey) {
          var sub = subs[refKey];
          var ref = refs[refKey];
          var docPath = path + "." + refKey;
          validResolves[docPath] = true;
          // unsubscribe if bound to a different ref
          if (sub) {
              if (sub.path !== ref.path)
                  sub.unsub();
              // if has already be bound and as we always walk the objects, it will work
              else
                  return;
          }
          subs[refKey] = {
              unsub: subscribeToDocument({
                  ref: ref,
                  target: target,
                  path: docPath,
                  depth: depth,
                  ops: ops,
                  resolve: deepResolve.bind(null, docPath),
              }, options),
              path: ref.path,
          };
      });
  }
  function bindCollection(_a, extraOptions) {
      var vm = _a.vm, key = _a.key, collection = _a.collection, ops = _a.ops, resolve = _a.resolve, reject = _a.reject;
      if (extraOptions === void 0) { extraOptions = DEFAULT_OPTIONS$1; }
      var options = Object.assign({}, DEFAULT_OPTIONS$1, extraOptions); // fill default values
      // TODO support pathes? nested.obj.list (walkSet)
      var array = options.wait ? [] : ops.set(vm, key, []);
      var originalResolve = resolve;
      var isResolved;
      // contain ref subscriptions of objects
      // arraySubs is a mirror of array
      var arraySubs = [];
      var change = {
          added: function (_a) {
              var newIndex = _a.newIndex, doc = _a.doc;
              arraySubs.splice(newIndex, 0, Object.create(null));
              var subs = arraySubs[newIndex];
              var snapshot = options.serialize(doc);
              var _b = extractRefs(snapshot), data = _b[0], refs = _b[1];
              // NOTE use ops
              ops.add(array, newIndex, data);
              // array.splice(newIndex, 0, data)
              subscribeToRefs({
                  refs: refs,
                  subs: subs,
                  target: array,
                  path: newIndex,
                  depth: 0,
                  ops: ops,
                  resolve: resolve.bind(null, doc),
              }, options);
          },
          modified: function (_a) {
              var oldIndex = _a.oldIndex, newIndex = _a.newIndex, doc = _a.doc;
              var subs = arraySubs.splice(oldIndex, 1)[0];
              arraySubs.splice(newIndex, 0, subs);
              // NOTE use ops
              var oldData = ops.remove(array, oldIndex)[0];
              // const oldData = array.splice(oldIndex, 1)[0]
              var snapshot = options.serialize(doc);
              var _b = extractRefs(snapshot, oldData), data = _b[0], refs = _b[1];
              // NOTE use ops
              ops.add(array, newIndex, data);
              // array.splice(newIndex, 0, data)
              subscribeToRefs({
                  refs: refs,
                  subs: subs,
                  ops: ops,
                  target: array,
                  path: newIndex,
                  depth: 0,
                  resolve: resolve,
              }, options);
          },
          removed: function (_a) {
              var oldIndex = _a.oldIndex;
              // NOTE use ops
              ops.remove(array, oldIndex);
              // array.splice(oldIndex, 1)
              unsubscribeAll(arraySubs.splice(oldIndex, 1)[0]);
          },
      };
      var unbind = collection.onSnapshot(function (ref) {
          // console.log('pending', metadata.hasPendingWrites)
          // docs.forEach(d => console.log('doc', d, '\n', 'data', d.data()))
          // NOTE this will only be triggered once and it will be with all the documents
          // from the query appearing as added
          // (https://firebase.google.com/docs/firestore/query-data/listen#view_changes_between_snapshots)
          var docChanges = 
          /* istanbul ignore next */
          typeof ref.docChanges === 'function'
              ? ref.docChanges()
              : /* istanbul ignore next to support firebase < 5*/
                  ref.docChanges;
          if (!isResolved && docChanges.length) {
              // isResolved is only meant to make sure we do the check only once
              isResolved = true;
              var count_1 = 0;
              var expectedItems_1 = docChanges.length;
              var validDocs_1 = Object.create(null);
              for (var i = 0; i < expectedItems_1; i++) {
                  validDocs_1[docChanges[i].doc.id] = true;
              }
              resolve = function (_a) {
                  var id = _a.id;
                  if (id in validDocs_1) {
                      if (++count_1 >= expectedItems_1) {
                          // if wait is true, finally set the array
                          if (options.wait)
                              ops.set(vm, key, array);
                          originalResolve(vm[key]);
                          // reset resolve to noop
                          resolve = function () { };
                      }
                  }
              };
          }
          docChanges.forEach(function (c) {
              change[c.type](c);
          });
          // resolves when array is empty
          // since this can only happen once, there is no need to guard against it
          // being called multiple times
          if (!docChanges.length) {
              if (options.wait)
                  ops.set(vm, key, array);
              resolve();
          }
      }, reject);
      return function (reset) {
          unbind();
          if (reset !== false) {
              var value = typeof reset === 'function' ? reset() : [];
              ops.set(vm, key, value);
          }
          arraySubs.forEach(unsubscribeAll);
      };
  }
  /**
   * Binds a Document to a property of vm
   * @param param0
   * @param extraOptions
   */
  function bindDocument(_a, extraOptions) {
      var vm = _a.vm, key = _a.key, document = _a.document, resolve = _a.resolve, reject = _a.reject, ops = _a.ops;
      if (extraOptions === void 0) { extraOptions = DEFAULT_OPTIONS$1; }
      var options = Object.assign({}, DEFAULT_OPTIONS$1, extraOptions); // fill default values
      // TODO warning check if key exists?
      // const boundRefs = Object.create(null)
      var subs = Object.create(null);
      // bind here the function so it can be resolved anywhere
      // this is specially useful for refs
      // TODO use walkGet?
      resolve = callOnceWithArg(resolve, function () { return vm[key]; });
      var unbind = document.onSnapshot(function (doc) {
          if (doc.exists) {
              updateDataFromDocumentSnapshot({
                  snapshot: options.serialize(doc),
                  target: vm,
                  path: key,
                  subs: subs,
                  ops: ops,
                  depth: 0,
                  resolve: resolve,
              }, options);
          }
          else {
              resolve();
          }
      }, reject);
      return function (reset) {
          unbind();
          if (reset !== false) {
              var value = typeof reset === 'function' ? reset() : null;
              ops.set(vm, key, value);
          }
          unsubscribeAll(subs);
      };
  }

  /**
   * Returns the original reference of a Firebase reference or query across SDK versions.
   *
   * @param {firebase.database.Reference|firebase.database.Query} refOrQuery
   * @return {firebase.database.Reference}
   */
  function getRef(refOrQuery) {
      return refOrQuery.ref;
  }
  var ops = {
      set: function (target, key, value) { return walkSet(target, key, value); },
      add: function (array, index, data) { return array.splice(index, 0, data); },
      remove: function (array, index) { return array.splice(index, 1); },
  };
  function bind(vm, key, source, options) {
      return new Promise(function (resolve, reject) {
          var unbind;
          if (Array.isArray(vm[key])) {
              unbind = rtdbBindAsArray({
                  vm: vm,
                  key: key,
                  collection: source,
                  resolve: resolve,
                  reject: reject,
                  ops: ops,
              }, options);
          }
          else {
              unbind = rtdbBindAsObject({
                  vm: vm,
                  key: key,
                  document: source,
                  resolve: resolve,
                  reject: reject,
                  ops: ops,
              }, options);
          }
          vm._firebaseUnbinds[key] = unbind;
      });
  }
  function unbind(vm, key, reset) {
      vm._firebaseUnbinds[key](reset);
      delete vm._firebaseSources[key];
      delete vm._firebaseUnbinds[key];
  }
  var defaultOptions = {
      bindName: '$rtdbBind',
      unbindName: '$rtdbUnbind',
      serialize: DEFAULT_OPTIONS.serialize,
      reset: DEFAULT_OPTIONS.reset,
      wait: DEFAULT_OPTIONS.wait,
  };
  var rtdbPlugin = function rtdbPlugin(Vue, pluginOptions) {
      if (pluginOptions === void 0) { pluginOptions = defaultOptions; }
      var strategies = Vue.config.optionMergeStrategies;
      strategies.firebase = strategies.provide;
      var globalOptions = Object.assign({}, defaultOptions, pluginOptions);
      var bindName = globalOptions.bindName, unbindName = globalOptions.unbindName;
      Vue.prototype[unbindName] = function rtdbUnbind(key, reset) {
          unbind(this, key, reset);
      };
      // add $rtdbBind and $rtdbUnbind methods
      Vue.prototype[bindName] = function rtdbBind(key, source, userOptions) {
          var options = Object.assign({}, globalOptions, userOptions);
          if (this._firebaseUnbinds[key]) {
              // @ts-ignore
              this[unbindName](key, 
              // if wait, allow overriding with a function or reset, otherwise, force reset to false
              // else pass the reset option
              options.wait ? (typeof options.reset === 'function' ? options.reset : false) : options.reset);
          }
          var promise = bind(this, key, source, options);
          // @ts-ignore
          this._firebaseSources[key] = source;
          // @ts-ignore
          this.$firebaseRefs[key] = getRef(source);
          return promise;
      };
      // handle firebase option
      Vue.mixin({
          beforeCreate: function () {
              this.$firebaseRefs = Object.create(null);
              this._firebaseSources = Object.create(null);
              this._firebaseUnbinds = Object.create(null);
          },
          created: function () {
              var bindings = this.$options.firebase;
              if (typeof bindings === 'function')
                  bindings =
                      // @ts-ignore
                      bindings.call(this);
              if (!bindings)
                  return;
              for (var key in bindings) {
                  // @ts-ignore
                  this[bindName](key, bindings[key], globalOptions);
              }
          },
          beforeDestroy: function () {
              for (var key in this._firebaseUnbinds) {
                  this._firebaseUnbinds[key]();
              }
              // @ts-ignore
              this._firebaseSources = null;
              // @ts-ignore
              this._firebaseUnbinds = null;
              // @ts-ignore
              this.$firebaseRefs = null;
          },
      });
  };

  var ops$1 = {
      set: function (target, key, value) { return walkSet(target, key, value); },
      add: function (array, index, data) { return array.splice(index, 0, data); },
      remove: function (array, index) { return array.splice(index, 1); },
  };
  function bind$1(vm, key, ref, ops, options) {
      return new Promise(function (resolve, reject) {
          var unbind;
          if ('where' in ref) {
              unbind = bindCollection({
                  vm: vm,
                  key: key,
                  ops: ops,
                  collection: ref,
                  resolve: resolve,
                  reject: reject,
              }, options);
          }
          else {
              unbind = bindDocument({
                  vm: vm,
                  key: key,
                  ops: ops,
                  document: ref,
                  resolve: resolve,
                  reject: reject,
              }, options);
          }
          vm._firestoreUnbinds[key] = unbind;
      });
  }
  var defaultOptions$1 = {
      bindName: '$bind',
      unbindName: '$unbind',
      serialize: DEFAULT_OPTIONS$1.serialize,
      reset: DEFAULT_OPTIONS$1.reset,
      wait: DEFAULT_OPTIONS$1.wait,
  };
  var firestorePlugin = function firestorePlugin(Vue, pluginOptions) {
      if (pluginOptions === void 0) { pluginOptions = defaultOptions$1; }
      var strategies = Vue.config.optionMergeStrategies;
      strategies.firestore = strategies.provide;
      var globalOptions = Object.assign({}, defaultOptions$1, pluginOptions);
      var bindName = globalOptions.bindName, unbindName = globalOptions.unbindName;
      Vue.prototype[unbindName] = function firestoreUnbind(key, reset) {
          this._firestoreUnbinds[key](reset);
          delete this._firestoreUnbinds[key];
          delete this.$firestoreRefs[key];
      };
      Vue.prototype[bindName] = function firestoreBind(key, ref, userOptions) {
          var options = Object.assign({}, globalOptions, userOptions);
          if (this._firestoreUnbinds[key]) {
              // @ts-ignore
              this[unbindName](key, 
              // if wait, allow overriding with a function or reset, otherwise, force reset to false
              // else pass the reset option
              options.wait ? (typeof options.reset === 'function' ? options.reset : false) : options.reset);
          }
          var promise = bind$1(this, key, ref, ops$1, options);
          // @ts-ignore
          this.$firestoreRefs[key] = ref;
          return promise;
      };
      Vue.mixin({
          beforeCreate: function () {
              this._firestoreUnbinds = Object.create(null);
              this.$firestoreRefs = Object.create(null);
          },
          created: function () {
              var firestore = this.$options.firestore;
              var refs = typeof firestore === 'function' ? firestore.call(this) : firestore;
              if (!refs)
                  return;
              for (var key in refs) {
                  // @ts-ignore
                  this[bindName](key, refs[key], globalOptions);
              }
          },
          beforeDestroy: function () {
              for (var subKey in this._firestoreUnbinds) {
                  this._firestoreUnbinds[subKey]();
              }
              // @ts-ignore
              this._firestoreUnbinds = null;
              // @ts-ignore
              this.$firestoreRefs = null;
          },
      });
  };

  exports.firestorePlugin = firestorePlugin;
  exports.rtdbPlugin = rtdbPlugin;

  return exports;

}({}));
