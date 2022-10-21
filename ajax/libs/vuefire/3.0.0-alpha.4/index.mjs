import { ref, unref, isVue3, getCurrentScope, onScopeDispose } from 'vue-demi';
import { toRef } from 'vue';
import { onValue, off, onChildAdded, onChildRemoved, onChildChanged, onChildMoved } from 'firebase/database';
import { onSnapshot } from 'firebase/firestore';

function walkGet(obj, path) {
  return path.split(".").reduce((target, key) => target[key], obj);
}
function walkSet(obj, path, value) {
  const keys = ("" + path).split(".");
  const key = keys.pop();
  const target = keys.reduce(
    (target2, key2) => target2[key2],
    obj
  );
  return Array.isArray(target) ? target.splice(Number(key), 1, value) : target[key] = value;
}
function isObject(o) {
  return o && typeof o === "object";
}
function isTimestamp(o) {
  return o.toDate;
}
function isDocumentRef(o) {
  return isObject(o) && o.type === "document";
}
function callOnceWithArg(fn, argFn) {
  let called;
  return () => {
    if (!called) {
      called = true;
      return fn(argFn());
    }
  };
}

function createRecordFromRTDBSnapshot(snapshot) {
  const value = snapshot.val();
  const res = isObject(value) ? value : Object.defineProperty({}, ".value", { value });
  Object.defineProperty(res, ".key", { value: snapshot.key });
  return res;
}
function indexForKey(array, key) {
  for (let i = 0; i < array.length; i++) {
    if (array[i][".key"] === key)
      return i;
  }
  return -1;
}

const DEFAULT_OPTIONS$1 = {
  reset: true,
  serialize: createRecordFromRTDBSnapshot,
  wait: false
};
function rtdbBindAsObject({ target, document, resolve, reject, ops }, extraOptions = DEFAULT_OPTIONS$1) {
  const key = "value";
  const options = Object.assign({}, DEFAULT_OPTIONS$1, extraOptions);
  const listener = onValue(
    document,
    (snapshot) => {
      ops.set(target, key, options.serialize(snapshot));
    }
  );
  const unsub = onValue(
    document,
    (snapshot) => {
      resolve(snapshot);
      unsub();
    },
    reject
  );
  return (reset) => {
    off(document, "value", listener);
    if (reset !== false) {
      const value = typeof reset === "function" ? reset() : null;
      ops.set(target, key, value);
    }
  };
}
function rtdbBindAsArray({ target, collection, resolve, reject, ops }, extraOptions = DEFAULT_OPTIONS$1) {
  const options = Object.assign({}, DEFAULT_OPTIONS$1, extraOptions);
  const key = "value";
  if (!options.wait)
    ops.set(target, key, []);
  let arrayRef = ref(options.wait ? [] : target[key]);
  const childAdded = onChildAdded(
    collection,
    (snapshot, prevKey) => {
      const array = unref(arrayRef);
      const index = prevKey ? indexForKey(array, prevKey) + 1 : 0;
      ops.add(array, index, options.serialize(snapshot));
    }
  );
  const childRemoved = onChildRemoved(
    collection,
    (snapshot) => {
      const array = unref(arrayRef);
      ops.remove(array, indexForKey(array, snapshot.key));
    }
  );
  const childChanged = onChildChanged(
    collection,
    (snapshot) => {
      const array = unref(arrayRef);
      ops.set(
        array,
        indexForKey(array, snapshot.key),
        options.serialize(snapshot)
      );
    }
  );
  const childMoved = onChildMoved(
    collection,
    (snapshot, prevKey) => {
      const array = unref(arrayRef);
      const index = indexForKey(array, snapshot.key);
      const oldRecord = ops.remove(array, index)[0];
      const newIndex = prevKey ? indexForKey(array, prevKey) + 1 : 0;
      ops.add(array, newIndex, oldRecord);
    }
  );
  const unsub = onValue(
    collection,
    (data) => {
      const array = unref(arrayRef);
      if (options.wait)
        ops.set(target, key, array);
      resolve(data);
      unsub();
    },
    reject
  );
  return (reset) => {
    off(collection, "child_added", childAdded);
    off(collection, "child_removed", childRemoved);
    off(collection, "child_changed", childChanged);
    off(collection, "child_moved", childMoved);
    if (reset !== false) {
      const value = typeof reset === "function" ? reset() : [];
      ops.set(target, key, value);
    }
  };
}

const firestoreDefaultConverter = {
  toFirestore(data) {
    return data;
  },
  fromFirestore(snapshot, options) {
    return snapshot.exists() ? Object.defineProperties(snapshot.data(options), {
      id: {
        value: () => snapshot.id
      }
    }) : null;
  }
};
function extractRefs(doc2, oldDoc, subs) {
  if (!isObject(doc2))
    return [doc2, {}];
  const dataAndRefs = [
    {},
    {}
  ];
  const subsByPath = Object.keys(subs).reduce((resultSubs, subKey) => {
    const sub = subs[subKey];
    resultSubs[sub.path] = sub.data();
    return resultSubs;
  }, {});
  function recursiveExtract(doc3, oldDoc2, path, result) {
    oldDoc2 = oldDoc2 || {};
    const [data, refs] = result;
    Object.getOwnPropertyNames(doc3).forEach((propertyName) => {
      const descriptor = Object.getOwnPropertyDescriptor(doc3, propertyName);
      if (descriptor && !descriptor.enumerable) {
        Object.defineProperty(data, propertyName, descriptor);
      }
    });
    for (const key in doc3) {
      const ref = doc3[key];
      if (ref == null || ref instanceof Date || isTimestamp(ref) || isGeoPoint(ref)) {
        data[key] = ref;
      } else if (isDocumentRef(ref)) {
        data[key] = typeof oldDoc2 === "object" && key in oldDoc2 && typeof oldDoc2[key] != "string" ? oldDoc2[key] : ref.path;
        refs[path + key] = ref;
      } else if (Array.isArray(ref)) {
        data[key] = Array(ref.length);
        for (let i = 0; i < ref.length; i++) {
          const newRef = ref[i];
          if (newRef && newRef.path in subsByPath)
            data[key][i] = subsByPath[newRef.path];
        }
        recursiveExtract(ref, oldDoc2[key] || data[key], path + key + ".", [
          data[key],
          refs
        ]);
      } else if (isObject(ref)) {
        data[key] = {};
        recursiveExtract(ref, oldDoc2[key], path + key + ".", [data[key], refs]);
      } else {
        data[key] = ref;
      }
    }
  }
  recursiveExtract(doc2, oldDoc, "", dataAndRefs);
  return dataAndRefs;
}
function isGeoPoint(value) {
  return isObject(value) && "latitude" in value && "longitude" in value;
}

const DEFAULT_OPTIONS = {
  maxRefDepth: 2,
  reset: true,
  converter: firestoreDefaultConverter,
  wait: false
};
function unsubscribeAll(subs) {
  for (const sub in subs) {
    subs[sub].unsub();
  }
}
function updateDataFromDocumentSnapshot(options, target, path, snapshot, subs, ops, depth, resolve) {
  const [data, refs] = extractRefs(
    snapshot.data(),
    walkGet(target, path),
    subs
  );
  ops.set(target, path, data);
  subscribeToRefs(options, target, path, subs, refs, ops, depth, resolve);
}
function subscribeToDocument({ ref: ref2, target, path, depth, resolve, ops }, options) {
  const subs = /* @__PURE__ */ Object.create(null);
  const unbind = onSnapshot(ref2, (snapshot) => {
    if (snapshot.exists()) {
      updateDataFromDocumentSnapshot(
        options,
        target,
        path,
        snapshot,
        subs,
        ops,
        depth,
        resolve
      );
    } else {
      ops.set(target, path, null);
      resolve();
    }
  });
  return () => {
    unbind();
    unsubscribeAll(subs);
  };
}
function subscribeToRefs(options, target, path, subs, refs, ops, depth, resolve) {
  const refKeys = Object.keys(refs);
  const missingKeys = Object.keys(subs).filter(
    (refKey) => refKeys.indexOf(refKey) < 0
  );
  missingKeys.forEach((refKey) => {
    subs[refKey].unsub();
    delete subs[refKey];
  });
  if (!refKeys.length || ++depth > options.maxRefDepth)
    return resolve(path);
  let resolvedCount = 0;
  const totalToResolve = refKeys.length;
  const validResolves = /* @__PURE__ */ Object.create(null);
  function deepResolve(key) {
    if (key in validResolves) {
      if (++resolvedCount >= totalToResolve)
        resolve(path);
    }
  }
  refKeys.forEach((refKey) => {
    const sub = subs[refKey];
    const ref2 = refs[refKey];
    const docPath = `${path}.${refKey}`;
    validResolves[docPath] = true;
    if (sub) {
      if (sub.path !== ref2.path)
        sub.unsub();
      else
        return;
    }
    subs[refKey] = {
      data: () => walkGet(target, docPath),
      unsub: subscribeToDocument(
        {
          ref: ref2,
          target,
          path: docPath,
          depth,
          ops,
          resolve: deepResolve.bind(null, docPath)
        },
        options
      ),
      path: ref2.path
    };
  });
}
function bindCollection(target, collection, ops, resolve, reject, extraOptions = DEFAULT_OPTIONS) {
  const options = Object.assign({}, DEFAULT_OPTIONS, extraOptions);
  const { snapshotListenOptions, snapshotOptions, wait } = options;
  if (!collection.converter) {
    collection = collection.withConverter(
      options.converter
    );
  }
  const key = "value";
  if (!wait)
    ops.set(target, key, []);
  let arrayRef = ref(wait ? [] : target[key]);
  const originalResolve = resolve;
  let isResolved;
  const arraySubs = [];
  const change = {
    added: ({ newIndex, doc }) => {
      arraySubs.splice(newIndex, 0, /* @__PURE__ */ Object.create(null));
      const subs = arraySubs[newIndex];
      const [data, refs] = extractRefs(
        doc.data(snapshotOptions),
        void 0,
        subs
      );
      ops.add(unref(arrayRef), newIndex, data);
      subscribeToRefs(
        options,
        arrayRef,
        `${key}.${newIndex}`,
        subs,
        refs,
        ops,
        0,
        resolve.bind(null, doc)
      );
    },
    modified: ({ oldIndex, newIndex, doc }) => {
      const array = unref(arrayRef);
      const subs = arraySubs[oldIndex];
      const oldData = array[oldIndex];
      const [data, refs] = extractRefs(doc.data(snapshotOptions), oldData, subs);
      arraySubs.splice(newIndex, 0, subs);
      ops.remove(array, oldIndex);
      ops.add(array, newIndex, data);
      subscribeToRefs(
        options,
        arrayRef,
        `${key}.${newIndex}`,
        subs,
        refs,
        ops,
        0,
        resolve
      );
    },
    removed: ({ oldIndex }) => {
      const array = unref(arrayRef);
      ops.remove(array, oldIndex);
      unsubscribeAll(arraySubs.splice(oldIndex, 1)[0]);
    }
  };
  const unbind = onSnapshot(
    collection,
    (snapshot) => {
      const docChanges = snapshot.docChanges(snapshotListenOptions);
      if (!isResolved && docChanges.length) {
        isResolved = true;
        let count = 0;
        const expectedItems = docChanges.length;
        const validDocs = /* @__PURE__ */ Object.create(null);
        for (let i = 0; i < expectedItems; i++) {
          validDocs[docChanges[i].doc.id] = true;
        }
        resolve = ({ id }) => {
          if (id in validDocs) {
            if (++count >= expectedItems) {
              if (options.wait) {
                ops.set(target, key, unref(arrayRef));
              }
              originalResolve(unref(arrayRef));
              resolve = () => {
              };
            }
          }
        };
      }
      docChanges.forEach((c) => {
        change[c.type](c);
      });
      if (!docChanges.length) {
        if (options.wait) {
          ops.set(target, key, unref(arrayRef));
        }
        resolve(unref(arrayRef));
      }
    },
    reject
  );
  return (reset) => {
    unbind();
    if (reset !== false) {
      const value = typeof reset === "function" ? reset() : [];
      ops.set(target, key, value);
    }
    arraySubs.forEach(unsubscribeAll);
  };
}
function bindDocument(target, document, ops, resolve, reject, extraOptions = DEFAULT_OPTIONS) {
  const options = Object.assign({}, DEFAULT_OPTIONS, extraOptions);
  const key = "value";
  const subs = /* @__PURE__ */ Object.create(null);
  resolve = callOnceWithArg(resolve, () => walkGet(target, key));
  const unbind = onSnapshot(
    document,
    (snapshot) => {
      if (snapshot.exists()) {
        updateDataFromDocumentSnapshot(
          options,
          target,
          key,
          snapshot,
          subs,
          ops,
          0,
          resolve
        );
      } else {
        ops.set(target, key, null);
        resolve(null);
      }
    },
    reject
  );
  return (reset) => {
    unbind();
    if (reset !== false) {
      const value = typeof reset === "function" ? reset() : null;
      ops.set(target, key, value);
    }
    unsubscribeAll(subs);
  };
}

function getRef(refOrQuery) {
  return refOrQuery.ref;
}
const defaultOptions$1 = {
  bindName: "$rtdbBind",
  unbindName: "$rtdbUnbind",
  serialize: DEFAULT_OPTIONS$1.serialize,
  reset: DEFAULT_OPTIONS$1.reset,
  wait: DEFAULT_OPTIONS$1.wait
};
const rtdbUnbinds = /* @__PURE__ */ new WeakMap();
function databasePlugin(app, pluginOptions = defaultOptions$1) {
  const globalOptions = Object.assign({}, defaultOptions$1, pluginOptions);
  const { bindName, unbindName } = globalOptions;
  const GlobalTarget = isVue3 ? app.config.globalProperties : app.prototype;
  GlobalTarget[unbindName] = function rtdbUnbind(key, reset) {
    internalUnbind$1(key, rtdbUnbinds.get(this), reset);
    delete this.$firebaseRefs[key];
  };
  GlobalTarget[bindName] = function rtdbBind(key, source, userOptions) {
    const options = Object.assign({}, globalOptions, userOptions);
    const target = toRef(this.$data, key);
    let unbinds = rtdbUnbinds.get(this);
    if (unbinds) {
      if (unbinds[key]) {
        unbinds[key](
          options.wait ? typeof options.reset === "function" ? options.reset : false : options.reset
        );
      }
    } else {
      rtdbUnbinds.set(this, unbinds = {});
    }
    const promise = internalBind(target, key, source, unbinds, options);
    this.$firebaseRefs[key] = getRef(source);
    return promise;
  };
  app.mixin({
    beforeCreate() {
      this.$firebaseRefs = /* @__PURE__ */ Object.create(null);
    },
    created() {
      let bindings = this.$options.firebase;
      if (typeof bindings === "function")
        bindings = bindings.call(this);
      if (!bindings)
        return;
      for (const key in bindings) {
        this[bindName](key, bindings[key], globalOptions);
      }
    },
    beforeUnmount() {
      const unbinds = rtdbUnbinds.get(this);
      if (unbinds) {
        for (const key in unbinds) {
          unbinds[key]();
        }
      }
      this.$firebaseRefs = null;
    }
  });
}

const ops$1 = {
  set: (target, key, value) => walkSet(target, key, value),
  add: (array, index, data) => array.splice(index, 0, data),
  remove: (array, index) => array.splice(index, 1)
};
function internalBind(target, key, source, unbinds, options) {
  return new Promise((resolve, reject) => {
    let unbind2;
    if (Array.isArray(target.value)) {
      unbind2 = rtdbBindAsArray(
        {
          target,
          collection: source,
          resolve,
          reject,
          ops: ops$1
        },
        options
      );
    } else {
      unbind2 = rtdbBindAsObject(
        {
          target,
          document: source,
          resolve,
          reject,
          ops: ops$1
        },
        options
      );
    }
    unbinds[key] = unbind2;
  });
}
function internalUnbind$1(key, unbinds, reset) {
  if (unbinds && unbinds[key]) {
    unbinds[key](reset);
    delete unbinds[key];
  }
}
function useList(reference, options) {
  const unbinds = {};
  const data = ref([]);
  const error = ref();
  const pending = ref(true);
  rtdbUnbinds.set(data, unbinds);
  const promise = internalBind(data, "", reference, unbinds, options);
  promise.catch((reason) => {
    error.value = reason;
  }).finally(() => {
    pending.value = false;
  });
  if (getCurrentScope()) {
    onScopeDispose(() => {
      unbind(data, options && options.reset);
    });
  }
  return Object.defineProperties(
    data,
    {
      data: { get: () => data },
      error: { get: () => error },
      pending: { get: () => error },
      promise: { get: () => promise }
    }
  );
}
function useObject(reference, options) {
  const unbinds = {};
  const data = ref();
  const error = ref();
  const pending = ref(true);
  rtdbUnbinds.set(data, unbinds);
  const promise = internalBind(data, "", reference, unbinds, options);
  promise.catch((reason) => {
    error.value = reason;
  }).finally(() => {
    pending.value = false;
  });
  if (getCurrentScope()) {
    onScopeDispose(() => {
      unbind(data, options && options.reset);
    });
  }
  return Object.defineProperties(
    data,
    {
      data: { get: () => data },
      error: { get: () => error },
      pending: { get: () => error },
      promise: { get: () => promise }
    }
  );
}
const unbind = (target, reset) => internalUnbind$1("", rtdbUnbinds.get(target), reset);

const firestoreUnbinds = /* @__PURE__ */ new WeakMap();
const defaultOptions = {
  bindName: "$firestoreBind",
  unbindName: "$firestoreUnbind",
  converter: DEFAULT_OPTIONS.converter,
  reset: DEFAULT_OPTIONS.reset,
  wait: DEFAULT_OPTIONS.wait
};
const firestorePlugin = function firestorePlugin2(app, pluginOptions = defaultOptions) {
  const globalOptions = Object.assign({}, defaultOptions, pluginOptions);
  const { bindName, unbindName } = globalOptions;
  const GlobalTarget = isVue3 ? app.config.globalProperties : app.prototype;
  GlobalTarget[unbindName] = function firestoreUnbind(key, reset) {
    internalUnbind(key, firestoreUnbinds.get(this), reset);
    delete this.$firestoreRefs[key];
  };
  GlobalTarget[bindName] = function firestoreBind(key, docOrCollectionRef, userOptions) {
    const options = Object.assign({}, globalOptions, userOptions);
    const target = toRef(this.$data, key);
    let unbinds = firestoreUnbinds.get(this);
    if (unbinds) {
      if (unbinds[key]) {
        unbinds[key](
          options.wait ? typeof options.reset === "function" ? options.reset : false : options.reset
        );
      }
    } else {
      firestoreUnbinds.set(this, unbinds = {});
    }
    const { promise, unbind } = _useFirestoreRef(docOrCollectionRef, {
      target,
      ...options
    });
    unbinds[key] = unbind;
    this.$firestoreRefs[key] = docOrCollectionRef;
    return promise;
  };
  app.mixin({
    beforeCreate() {
      this.$firestoreRefs = /* @__PURE__ */ Object.create(null);
    },
    created() {
      const { firestore } = this.$options;
      const refs = typeof firestore === "function" ? firestore.call(this) : firestore;
      if (!refs)
        return;
      for (const key in refs) {
        this[bindName](
          key,
          refs[key],
          globalOptions
        );
      }
    },
    beforeUnmount() {
      const unbinds = firestoreUnbinds.get(this);
      if (unbinds) {
        for (const subKey in unbinds) {
          unbinds[subKey]();
        }
      }
      this.$firestoreRefs = null;
    }
  });
};

const ops = {
  set: (target, key, value) => walkSet(target, key, value),
  add: (array, index, data) => array.splice(index, 0, data),
  remove: (array, index) => array.splice(index, 1)
};
function _useFirestoreRef(docOrCollectionRef, options = {}) {
  let unbind2;
  const data = options.target || ref(options.initialValue);
  const pending = ref(true);
  const error = ref();
  const unbinds = {};
  firestoreUnbinds.set(data, unbinds);
  const promise = new Promise((resolve, reject) => {
    unbind2 = (isDocumentRef(docOrCollectionRef) ? bindDocument : bindCollection)(
      data,
      docOrCollectionRef,
      ops,
      resolve,
      reject,
      options
    );
  });
  promise.catch((reason) => {
    error.value = reason;
  }).finally(() => {
    pending.value = false;
  });
  if (getCurrentScope()) {
    pendingPromises.add(promise);
    onScopeDispose(() => {
      pendingPromises.delete(promise);
      unbind2();
    });
  }
  Object.defineProperties(data, {
    error: {
      get: () => error
    },
    data: {
      get: () => data
    },
    pending: {
      get: () => pending
    },
    promise: {
      get: () => promise
    },
    unbind: {
      get: () => unbind2
    }
  });
  return data;
}
const pendingPromises = /* @__PURE__ */ new Set();
function useCollection(collectionRef, options) {
  return _useFirestoreRef(collectionRef, options);
}
function useDocument(documentRef, options) {
  return _useFirestoreRef(documentRef, options);
}
function internalUnbind(key, unbinds, reset) {
  if (unbinds && unbinds[key]) {
    unbinds[key](reset);
    delete unbinds[key];
  }
}

export { databasePlugin, firestorePlugin, useCollection, useDocument, useList, useObject };
