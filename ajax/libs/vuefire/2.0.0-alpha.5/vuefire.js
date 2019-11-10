/*!
 * vuefire v2.0.0-alpha.5
 * (c) 2017 Eduardo San Martin Morote
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.Vuefire = {})));
}(this, (function (exports) { 'use strict';

function createSnapshot (doc) {
  // defaults everything to false, so no need to set
  return Object.defineProperty(doc.data(), 'id', {
    value: doc.id
  })
}

function isObject (o) {
  return o && typeof o === 'object'
}

function extractRefs (doc, oldDoc, path, result) {
  if ( path === void 0 ) path = '';
  if ( result === void 0 ) result = [{}, {}];

  // must be set here because walkGet can return null or undefined
  oldDoc = oldDoc || {};
  var idDescriptor = Object.getOwnPropertyDescriptor(doc, 'id');
  if (idDescriptor && !idDescriptor.enumerable) {
    Object.defineProperty(result[0], 'id', idDescriptor);
  }
  return Object.keys(doc).reduce(function (tot, key) {
    var ref = doc[key];
    // if it's a ref
    if (typeof ref.isEqual === 'function') {
      tot[0][key] = oldDoc[key] || ref.path;
      // TODO handle subpathes?
      tot[1][path + key] = ref;
    } else if (Array.isArray(ref)) {
      // TODO handle array
      tot[0][key] = Array(ref.length).fill(null);
      extractRefs(ref, oldDoc[key], path + key + '.', [tot[0][key], tot[1]]);
    } else if (isObject(ref)) {
      tot[0][key] = {};
      extractRefs(ref, oldDoc[key], path + key + '.', [tot[0][key], tot[1]]);
    } else {
      tot[0][key] = ref;
    }
    return tot
  }, result)
}

function callOnceWithArg (fn, argFn) {
  var called;
  return function () {
    if (!called) {
      called = true;
      return fn(argFn())
    }
  }
}

function walkGet (obj, path) {
  return path.split('.').reduce(function (target, key) { return target[key]; }, obj)
}

function walkSet (obj, path, value) {
  // path can be a number
  var keys = ('' + path).split('.');
  var key = keys.pop();
  var target = keys.reduce(function (target, key) { return target[key]; }, obj);
  // global isFinite is different from Number.isFinite
  // it convert values to numbers
  if (isFinite(key)) { target.splice(key, 1, value); }
  else { target[key] = value; }
}

function unsubscribeAll (subs) {
  for (var sub in subs) {
    subs[sub].unsub();
  }
}

// NOTE not convinced by the naming of subscribeToRefs and subscribeToDocument
// first one is calling the other on every ref and subscribeToDocument may call
// updateDataFromDocumentSnapshot which may call subscribeToRefs as well
function subscribeToRefs (ref) {
  var subs = ref.subs;
  var refs = ref.refs;
  var target = ref.target;
  var path = ref.path;
  var data = ref.data;
  var depth = ref.depth;
  var resolve = ref.resolve;

  var refKeys = Object.keys(refs);
  var missingKeys = Object.keys(subs).filter(function (refKey) { return refKeys.indexOf(refKey) < 0; });
  // unbind keys that are no longer there
  missingKeys.forEach(function (refKey) {
    subs[refKey].unsub();
    delete subs[refKey];
  });
  if (!refKeys.length) { return resolve(path) }
  // TODO max depth param, default to 1?
  if (++depth > 3) { throw new Error('more than 5 nested refs') }

  var resolvedCount = 0;
  var totalToResolve = refKeys.length;
  var validResolves = Object.create(null);
  function deepResolve (key) {
    if (key in validResolves) {
      if (++resolvedCount >= totalToResolve) { resolve(path); }
    }
  }

  refKeys.forEach(function (refKey) {
    var sub = subs[refKey];
    var ref = refs[refKey];
    var docPath = path + "." + refKey;

    validResolves[docPath] = true;

    // unsubscribe if bound to a different ref
    if (sub) {
      if (sub.path !== ref.path) { sub.unsub(); }
      // if has already be bound and as we always walk the objects, it will work
      else { return }
    }

    subs[refKey] = {
      unsub: subscribeToDocument({
        ref: ref,
        target: target,
        path: docPath,
        depth: depth,
        resolve: deepResolve.bind(null, docPath)
      }),
      path: ref.path
    };
  });
}

function bindCollection (ref) {
  var vm = ref.vm;
  var key = ref.key;
  var collection = ref.collection;
  var resolve = ref.resolve;
  var reject = ref.reject;

  // TODO support pathes? nested.obj.list (walkSet)
  var array = vm[key] = [];
  var originalResolve = resolve;
  var isResolved;

  // contain ref subscriptions of objects
  // arraySubs is a mirror of array
  var arraySubs = [];

  var change = {
    added: function (ref) {
      var newIndex = ref.newIndex;
      var doc = ref.doc;

      arraySubs.splice(newIndex, 0, Object.create(null));
      var subs = arraySubs[newIndex];
      var snapshot = createSnapshot(doc);
      var ref$1 = extractRefs(snapshot);
      var data = ref$1[0];
      var refs = ref$1[1];
      array.splice(newIndex, 0, data);
      subscribeToRefs({
        data: data,
        refs: refs,
        subs: subs,
        target: array,
        path: newIndex,
        depth: 0,
        resolve: resolve.bind(null, doc)
      });
    },
    modified: function (ref) {
      var oldIndex = ref.oldIndex;
      var newIndex = ref.newIndex;
      var doc = ref.doc;

      var subs = arraySubs.splice(oldIndex, 1)[0];
      arraySubs.splice(newIndex, 0, subs);
      var oldData = array.splice(oldIndex, 1)[0];
      var snapshot = createSnapshot(doc);
      var ref$1 = extractRefs(snapshot, oldData);
      var data = ref$1[0];
      var refs = ref$1[1];
      array.splice(newIndex, 0, data);
      subscribeToRefs({
        data: data,
        refs: refs,
        subs: subs,
        target: array,
        path: newIndex,
        depth: 0,
        resolve: resolve
      });
    },
    removed: function (ref) {
      var oldIndex = ref.oldIndex;

      array.splice(oldIndex, 1);
      unsubscribeAll(arraySubs.splice(oldIndex, 1)[0]);
    }
  };

  var unbind = collection.onSnapshot(function (ref) {
    var docChanges = ref.docChanges;

    // console.log('pending', metadata.hasPendingWrites)
    // docs.forEach(d => console.log('doc', d, '\n', 'data', d.data()))
    // NOTE this will only be triggered once and it will be with all the documents
    // from the query appearing as added
    // (https://firebase.google.com/docs/firestore/query-data/listen#view_changes_between_snapshots)
    if (!isResolved && docChanges.length) {
      // isResolved is only meant to make sure we do the check only once
      isResolved = true;
      var count = 0;
      var expectedItems = docChanges.length;
      var validDocs = docChanges.reduce(function (dict, ref) {
        var doc = ref.doc;

        dict[doc.id] = false;
        return dict
      }, Object.create(null));
      resolve = function (ref) {
        var id = ref.id;

        if (id in validDocs) {
          if (++count >= expectedItems) {
            originalResolve(vm[key]);
            // reset resolve to noop
            resolve = function (_) {};
          }
        }
      };
    }
    docChanges.forEach(function (c) {
      // console.log(c)
      change[c.type](c);
    });

    // resolves when array is empty
    if (!docChanges.length) { resolve(); }
  }, reject);

  return function () {
    unbind();
    arraySubs.forEach(unsubscribeAll);
  }
}

function updateDataFromDocumentSnapshot (ref) {
  var snapshot = ref.snapshot;
  var target = ref.target;
  var path = ref.path;
  var subs = ref.subs;
  var depth = ref.depth; if ( depth === void 0 ) depth = 0;
  var resolve = ref.resolve;

  var ref$1 = extractRefs(snapshot, walkGet(target, path));
  var data = ref$1[0];
  var refs = ref$1[1];
  walkSet(target, path, data);
  subscribeToRefs({
    data: data,
    subs: subs,
    refs: refs,
    target: target,
    path: path,
    depth: depth,
    resolve: resolve
  });
}

function subscribeToDocument (ref$1) {
  var ref = ref$1.ref;
  var target = ref$1.target;
  var path = ref$1.path;
  var depth = ref$1.depth;
  var resolve = ref$1.resolve;

  var subs = Object.create(null);
  var unbind = ref.onSnapshot(function (doc) {
    if (doc.exists) {
      updateDataFromDocumentSnapshot({
        snapshot: createSnapshot(doc),
        target: target,
        path: path,
        subs: subs,
        depth: depth,
        resolve: resolve
      });
    } else {
      walkSet(target, path, null);
      resolve(path);
    }
  });

  return function () {
    unbind();
    unsubscribeAll(subs);
  }
}

function bindDocument (ref) {
  var vm = ref.vm;
  var key = ref.key;
  var document = ref.document;
  var resolve = ref.resolve;
  var reject = ref.reject;

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
        snapshot: createSnapshot(doc),
        target: vm,
        path: key,
        subs: subs,
        resolve: resolve
      });
    } else {
      resolve();
    }
  }, reject);

  return function () {
    unbind();
    unsubscribeAll(subs);
  }
}

function bind (ref$1) {
  var vm = ref$1.vm;
  var key = ref$1.key;
  var ref = ref$1.ref;

  return new Promise(function (resolve, reject) {
    var unbind;
    if (ref.where) {
      unbind = bindCollection({
        vm: vm,
        key: key,
        collection: ref,
        resolve: resolve,
        reject: reject
      });
    } else {
      unbind = bindDocument({
        vm: vm,
        key: key,
        document: ref,
        resolve: resolve,
        reject: reject
      });
    }
    vm._firestoreUnbinds[key] = unbind;
  })
}

function install (Vue, options) {
  var strategies = Vue.config.optionMergeStrategies;
  strategies.firestore = strategies.provide;

  Vue.mixin({
    created: function created () {
      var this$1 = this;

      var ref = this.$options;
      var firestore = ref.firestore;
      this._firestoreUnbinds = Object.create(null);
      this.$firestoreRefs = Object.create(null);
      var options = typeof firestore === 'function'
        ? firestore.call(this)
        : firestore;
      if (!options) { return }
      Object.keys(options).forEach(function (key) {
        this$1.$bind(key, options[key]);
      });
    },

    beforeDestroy: function beforeDestroy () {
      var this$1 = this;

      for (var subKey in this$1._firestoreUnbinds) {
        this$1._firestoreUnbinds[subKey]();
      }
      this._firestoreUnbinds = null;
      this.$firestoreRefs = null;
    }
  });

  // TODO test if $bind exist and warns
  Vue.prototype.$bind = function (key, ref) {
    if (this._firestoreUnbinds[key]) {
      this.$unbind(key);
    }
    var promise = bind({
      vm: this,
      key: key,
      ref: ref
    });
    this.$firestoreRefs[key] = ref;
    return promise
  };

  Vue.prototype.$unbind = function (key) {
    this._firestoreUnbinds[key]();
    delete this._firestoreUnbinds[key];
    delete this.$firestoreRefs[key];
  };
}

exports['default'] = install;

Object.defineProperty(exports, '__esModule', { value: true });

})));
