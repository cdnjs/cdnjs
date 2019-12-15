/*!
 * vuefire v2.0.0-alpha.0
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

function extractRefs (doc) {
  return Object.keys(doc).reduce(function (tot, key) {
    var ref = doc[key];
    if (typeof ref.isEqual === 'function') {
      tot[0][key] = null;
      // TODO handle subpathes?
      tot[1][key] = ref;
    } else {
      // TODO recursive check
      tot[0][key] = ref;
    }
    return tot
  }, [{}, {}])
}

function bindCollection (ref) {
  var vm = ref.vm;
  var key = ref.key;
  var collection = ref.collection;

  // TODO wait to get all data
  var array = vm[key] = [];

  var change = {
    added: function (ref) {
      var newIndex = ref.newIndex;
      var doc = ref.doc;

      array.splice(newIndex, 0, createSnapshot(doc));
    },
    modified: function (ref) {
      var oldIndex = ref.oldIndex;
      var newIndex = ref.newIndex;
      var doc = ref.doc;

      array.splice(oldIndex, 1);
      array.splice(newIndex, 0, createSnapshot(doc));
    },
    removed: function (ref) {
      var oldIndex = ref.oldIndex;

      array.splice(oldIndex, 1);
    }
  };

  return collection.onSnapshot(function (ref) {
    var docChanges = ref.docChanges;

    // console.log('pending', metadata.hasPendingWrites)
    // docs.forEach(d => console.log('doc', d, '\n', 'data', d.data()))
    docChanges.forEach(function (c) {
      // console.log(c)
      change[c.type](c);
    });
  }, function (err) {
    console.log('onSnapshot ERR', err);
  })
}

function bindDocument (ref) {
  var vm = ref.vm;
  var key = ref.key;
  var document = ref.document;

  // TODO warning check if key exists?
  // TODO create boundRefs object
  // const boundRefs = Object.create(null)

  return document.onSnapshot(function (doc) {
    // TODO test doc.exist
    // console.log('doc data', doc)
    // TODO extract refs
    var ref = extractRefs(createSnapshot(doc));
    var data = ref[0];
    vm[key] = data;
    // TODO bind refs
    // const d = doc.data()
    // if (!boundRefs[d.path]) {
    //   console.log('bound ref', d.path)
    //   boundRefs[d.path] = d.onSnapshot((doc) => {
    //     console.log('ref snap', doc)
    //   }, err => console.log('onSnapshot ref ERR', err))
    // }
  }, function (err) {
    console.log('onSnapshot ERR', err);
  })

  // TODO return a custom unbind function that unbind all refs
}

function bind (ref$1) {
  var vm = ref$1.vm;
  var key = ref$1.key;
  var ref = ref$1.ref;

  var unbind;
  if (ref.add) {
    unbind = bindCollection({
      vm: vm,
      key: key,
      collection: ref
    });
  } else {
    unbind = bindDocument({
      vm: vm,
      key: key,
      document: ref
    });
  }
  vm._firestoreUnbinds[key] = unbind;
}

function install (Vue, options) {
  Vue.mixin({
    created: function created () {
      var this$1 = this;

      var ref = this.$options;
      var firestore = ref.firestore;
      this._firestoreUnbinds = Object.create(null);
      this.$firestoreRefs = Object.create(null);
      if (!firestore) { return }
      Object.keys(firestore).forEach(function (key) {
        this$1.$bind(key, firestore[key]);
      });
    },

    beforeDestroy: function beforeDestroy () {
      Object.values(this._firestoreUnbinds).forEach(function (unbind) {
        unbind();
      });
      this._firestoreUnbinds = null;
      this.$firestoreRefs = null;
    }
  });

  // TODO test if $bind exist and warns
  Vue.prototype.$bind = function (key, ref) {
    bind({
      vm: this,
      key: key,
      ref: ref
    });
    this.$firestoreRefs[key] = ref;
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
