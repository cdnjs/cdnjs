'use strict';

const app = require('firebase/app');
const vue = require('vue');
const vueDemi = require('vue-demi');
const database = require('firebase/database');
const firestore = require('firebase/firestore');
const auth = require('firebase/auth');

const _FirebaseAppInjectionKey = Symbol("firebaseApp");
function useFirebaseApp(name) {
  return vue.getCurrentInstance() && vue.inject(
    _FirebaseAppInjectionKey,
    null
  ) || app.getApp(name);
}

const noop = () => {
};
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
function isCollectionRef(o) {
  return isObject(o) && o.type === "collection";
}
function isFirestoreDataReference(source) {
  return isDocumentRef(source) || isCollectionRef(source);
}
function isFirestoreQuery(source) {
  return isObject(source) && source.type === "query";
}
function getDataSourcePath(source) {
  return isFirestoreDataReference(source) ? source.path : isDatabaseReference(source) ? source.toString() : isFirestoreQuery(source) ? null : null;
}
function isDatabaseReference(source) {
  return isObject(source) && "ref" in source;
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

const databasePluginDefaults = {
  bindName: "$rtdbBind",
  unbindName: "$rtdbUnbind"
};
const rtdbUnbinds = /* @__PURE__ */ new WeakMap();
function databasePlugin(app, pluginOptions) {
  const globalOptions = Object.assign({}, databasePluginDefaults, pluginOptions);
  const { bindName, unbindName } = globalOptions;
  const GlobalTarget = vueDemi.isVue3 ? app.config.globalProperties : app.prototype;
  GlobalTarget[unbindName] = function rtdbUnbind(key, reset) {
    internalUnbind$1(key, rtdbUnbinds.get(this), reset);
    delete this.$firebaseRefs[key];
  };
  GlobalTarget[bindName] = function rtdbBind(key, source, userOptions) {
    const options = Object.assign({}, globalOptions, userOptions);
    const target = vue.toRef(this.$data, key);
    if (!rtdbUnbinds.has(this)) {
      rtdbUnbinds.set(this, {});
    }
    const unbinds = rtdbUnbinds.get(this);
    if (unbinds[key]) {
      unbinds[key](options.reset);
    }
    const { promise, unbind } = _useDatabaseRef(source, { target, ...options });
    unbinds[key] = unbind;
    this.$firebaseRefs[key] = source.ref;
    return promise;
  };
  app.mixin({
    beforeCreate() {
      this.$firebaseRefs = /* @__PURE__ */ Object.create(null);
    },
    created() {
      let bindings = this.$options.firebase;
      if (typeof bindings === "function") {
        bindings = bindings.call(this);
      }
      if (!bindings)
        return;
      for (const key in bindings) {
        this[bindName](
          key,
          bindings[key],
          globalOptions
        );
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

function createRecordFromDatabaseSnapshot(snapshot) {
  const value = snapshot.val();
  const res = isObject(value) ? value : Object.defineProperty({}, ".value", { value });
  Object.defineProperty(res, "id", { value: snapshot.key });
  return res;
}
function indexForKey(array, key) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].id === key)
      return i;
  }
  return -1;
}

const DEFAULT_OPTIONS$1 = {
  reset: false,
  serialize: createRecordFromDatabaseSnapshot,
  wait: true
};
function bindAsObject({ target, document, resolve, reject, ops }, extraOptions = DEFAULT_OPTIONS$1) {
  const key = "value";
  const options = Object.assign({}, DEFAULT_OPTIONS$1, extraOptions);
  const unsub = database.onValue(
    document,
    (snapshot) => {
      resolve(snapshot);
      unsub();
    },
    reject
  );
  const listener = database.onValue(
    document,
    (snapshot) => {
      ops.set(target, key, options.serialize(snapshot));
    }
  );
  return (reset) => {
    listener();
    if (reset !== false) {
      const value = typeof reset === "function" ? reset() : null;
      ops.set(target, key, value);
    }
  };
}
function bindAsArray({ target, collection, resolve, reject, ops }, extraOptions = DEFAULT_OPTIONS$1) {
  const options = Object.assign({}, DEFAULT_OPTIONS$1, extraOptions);
  const key = "value";
  if (!options.wait)
    ops.set(target, key, []);
  let arrayRef = vueDemi.ref(options.wait ? [] : target[key]);
  const removeChildAddedListener = database.onChildAdded(
    collection,
    (snapshot, prevKey) => {
      const array = vueDemi.unref(arrayRef);
      const index = prevKey ? indexForKey(array, prevKey) + 1 : 0;
      ops.add(array, index, options.serialize(snapshot));
    }
  );
  const removeChildRemovedListener = database.onChildRemoved(
    collection,
    (snapshot) => {
      const array = vueDemi.unref(arrayRef);
      ops.remove(array, indexForKey(array, snapshot.key));
    }
  );
  const removeChildChangedListener = database.onChildChanged(
    collection,
    (snapshot) => {
      const array = vueDemi.unref(arrayRef);
      ops.set(
        array,
        indexForKey(array, snapshot.key),
        options.serialize(snapshot)
      );
    }
  );
  const removeChildMovedListener = database.onChildMoved(
    collection,
    (snapshot, prevKey) => {
      const array = vueDemi.unref(arrayRef);
      const index = indexForKey(array, snapshot.key);
      const oldRecord = ops.remove(array, index)[0];
      const newIndex = prevKey ? indexForKey(array, prevKey) + 1 : 0;
      ops.add(array, newIndex, oldRecord);
    }
  );
  const removeValueListener = database.onValue(
    collection,
    (data) => {
      const array = vueDemi.unref(arrayRef);
      if (options.wait)
        ops.set(target, key, array);
      resolve(data);
      removeValueListener();
    },
    reject
  );
  return (reset) => {
    removeChildAddedListener();
    removeChildRemovedListener();
    removeChildChangedListener();
    removeChildMovedListener();
    if (reset !== false) {
      const value = typeof reset === "function" ? reset() : [];
      ops.set(target, key, value);
    }
  };
}

const appPendingPromises = /* @__PURE__ */ new WeakMap();
function addPendingPromise(promise, dataSource, ssrKey) {
  const app = useFirebaseApp();
  if (!appPendingPromises.has(app)) {
    appPendingPromises.set(app, /* @__PURE__ */ new Map());
  }
  const pendingPromises = appPendingPromises.get(app);
  ssrKey = getDataSourcePath(dataSource);
  if (ssrKey) {
    pendingPromises.set(ssrKey, promise);
  } else {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[VueFire]: Could not get the path of the data source");
    }
  }
  return ssrKey ? () => pendingPromises.delete(ssrKey) : noop;
}
function usePendingPromises(app) {
  app = app || useFirebaseApp();
  const pendingPromises = appPendingPromises.get(app);
  const p = pendingPromises ? Promise.all(
    Array.from(pendingPromises).map(
      ([key, promise]) => promise.then((data) => [key, data])
    )
  ) : Promise.resolve([]);
  appPendingPromises.delete(app);
  return p;
}

const ops$1 = {
  set: (target, key, value) => walkSet(target, key, value),
  add: (array, index, data) => array.splice(index, 0, data),
  remove: (array, index) => array.splice(index, 1)
};
function _useDatabaseRef(reference, localOptions = {}) {
  const options = Object.assign({}, DEFAULT_OPTIONS$1, localOptions);
  let _unbind;
  const data = options.target || vueDemi.ref(options.initialValue);
  const error = vueDemi.ref();
  const pending = vueDemi.ref(true);
  const promise = vueDemi.shallowRef();
  let isPromiseAdded = false;
  const hasCurrentScope = vueDemi.getCurrentScope();
  let removePendingPromise = noop;
  function bindDatabaseRef() {
    let referenceValue = vueDemi.unref(reference);
    const p = new Promise((resolve, reject) => {
      if (!referenceValue) {
        _unbind = noop;
        return resolve(null);
      }
      if (Array.isArray(data.value)) {
        _unbind = bindAsArray(
          {
            target: data,
            collection: referenceValue,
            resolve,
            reject,
            ops: ops$1
          },
          options
        );
      } else {
        _unbind = bindAsObject(
          {
            target: data,
            document: referenceValue,
            resolve,
            reject,
            ops: ops$1
          },
          options
        );
      }
    });
    if (!isPromiseAdded && referenceValue) {
      removePendingPromise = addPendingPromise(p, referenceValue);
      isPromiseAdded = true;
    }
    promise.value = p;
    p.catch((reason) => {
      error.value = reason;
    }).finally(() => {
      pending.value = false;
    });
  }
  let stopWatcher = noop;
  if (vueDemi.isRef(reference)) {
    stopWatcher = vueDemi.watch(reference, bindDatabaseRef, { immediate: true });
  } else {
    bindDatabaseRef();
  }
  if (hasCurrentScope) {
    vueDemi.onScopeDispose(unbind2);
  }
  function unbind2(reset = options.reset) {
    stopWatcher();
    removePendingPromise();
    _unbind(reset);
  }
  return Object.defineProperties(data, {
    data: { get: () => data },
    error: { get: () => error },
    pending: { get: () => error },
    promise: { get: () => promise },
    unbind: { get: () => unbind2 }
  });
}
function internalUnbind$1(key, unbinds, reset) {
  if (unbinds && unbinds[key]) {
    unbinds[key](reset);
    delete unbinds[key];
  }
}
function useList(reference, options) {
  const data = vueDemi.ref([]);
  return _useDatabaseRef(reference, {
    target: data,
    ...options
  });
}
function useObject(reference, options) {
  const data = vueDemi.ref();
  return _useDatabaseRef(reference, {
    target: data,
    ...options
  });
}
function useDatabase(name) {
  return database.getDatabase(useFirebaseApp(name));
}

const firestoreUnbinds = /* @__PURE__ */ new WeakMap();
const firestorePluginDefaults = {
  bindName: "$firestoreBind",
  unbindName: "$firestoreUnbind"
};
const firestorePlugin = function firestorePlugin2(app, pluginOptions) {
  const globalOptions = Object.assign(
    {},
    firestorePluginDefaults,
    pluginOptions
  );
  const { bindName, unbindName } = globalOptions;
  const GlobalTarget = vueDemi.isVue3 ? app.config.globalProperties : app.prototype;
  GlobalTarget[unbindName] = function firestoreUnbind(key, reset) {
    internalUnbind(key, firestoreUnbinds.get(this), reset);
    delete this.$firestoreRefs[key];
  };
  GlobalTarget[bindName] = function firestoreBind(key, docOrCollectionRef, userOptions) {
    const options = Object.assign({}, globalOptions, userOptions);
    const target = vue.toRef(this.$data, key);
    if (!firestoreUnbinds.has(this)) {
      firestoreUnbinds.set(this, {});
    }
    const unbinds = firestoreUnbinds.get(this);
    if (unbinds[key]) {
      unbinds[key](options.reset);
    }
    const { promise, unbind } = _useFirestoreRef(docOrCollectionRef, {
      target,
      ...options
    });
    unbinds[key] = unbind;
    this.$firestoreRefs[key] = docOrCollectionRef;
    return promise.value;
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

const firestoreDefaultConverter = {
  toFirestore(data) {
    return data;
  },
  fromFirestore(snapshot, options) {
    return snapshot.exists() ? Object.defineProperties(snapshot.data(options), {
      id: {
        value: snapshot.id
      }
    }) : null;
  }
};
function extractRefs(doc, oldDoc, subs) {
  if (!isObject(doc))
    return [doc, {}];
  const dataAndRefs = [
    {},
    {}
  ];
  const subsByPath = Object.keys(subs).reduce((resultSubs, subKey) => {
    const sub = subs[subKey];
    resultSubs[sub.path] = sub.data();
    return resultSubs;
  }, {});
  function recursiveExtract(doc2, oldDoc2, path, result) {
    oldDoc2 = oldDoc2 || {};
    const [data, refs] = result;
    Object.getOwnPropertyNames(doc2).forEach((propertyName) => {
      const descriptor = Object.getOwnPropertyDescriptor(doc2, propertyName);
      if (descriptor && !descriptor.enumerable) {
        Object.defineProperty(data, propertyName, descriptor);
      }
    });
    for (const key in doc2) {
      const ref = doc2[key];
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
  recursiveExtract(doc, oldDoc, "", dataAndRefs);
  return dataAndRefs;
}
function isGeoPoint(value) {
  return isObject(value) && "latitude" in value && "longitude" in value;
}

const DEFAULT_OPTIONS = {
  reset: false,
  wait: true,
  maxRefDepth: 2,
  converter: firestoreDefaultConverter
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
  const unbind = firestore.onSnapshot(ref2, (snapshot) => {
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
function bindCollection(target, collection, ops, resolve, reject, extraOptions) {
  const options = Object.assign({}, DEFAULT_OPTIONS, extraOptions);
  const { snapshotListenOptions, snapshotOptions, wait } = options;
  const key = "value";
  if (!wait)
    ops.set(target, key, []);
  let arrayRef = vueDemi.ref(wait ? [] : target[key]);
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
      ops.add(vueDemi.unref(arrayRef), newIndex, data);
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
      const array = vueDemi.unref(arrayRef);
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
      const array = vueDemi.unref(arrayRef);
      ops.remove(array, oldIndex);
      unsubscribeAll(arraySubs.splice(oldIndex, 1)[0]);
    }
  };
  const stopOnSnapshot = firestore.onSnapshot(
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
                ops.set(target, key, vueDemi.unref(arrayRef));
              }
              originalResolve(vueDemi.unref(arrayRef));
              resolve = noop;
            }
          }
        };
      }
      docChanges.forEach((c) => {
        change[c.type](c);
      });
      if (!docChanges.length) {
        if (options.wait) {
          ops.set(target, key, vueDemi.unref(arrayRef));
        }
        resolve(vueDemi.unref(arrayRef));
      }
    },
    reject
  );
  return (reset) => {
    stopOnSnapshot();
    if (reset !== false) {
      const value = typeof reset === "function" ? reset() : [];
      ops.set(target, key, value);
    }
    arraySubs.forEach(unsubscribeAll);
  };
}
function bindDocument(target, document, ops, resolve, reject, extraOptions) {
  const options = Object.assign({}, DEFAULT_OPTIONS, extraOptions);
  const key = "value";
  const subs = /* @__PURE__ */ Object.create(null);
  resolve = callOnceWithArg(resolve, () => walkGet(target, key));
  const stopOnSnapshot = firestore.onSnapshot(
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
    stopOnSnapshot();
    if (reset !== false) {
      const value = typeof reset === "function" ? reset() : null;
      ops.set(target, key, value);
    }
    unsubscribeAll(subs);
  };
}

const ops = {
  set: (target, key, value) => walkSet(target, key, value),
  add: (array, index, data) => array.splice(index, 0, data),
  remove: (array, index) => array.splice(index, 1)
};
function _useFirestoreRef(docOrCollectionRef, localOptions) {
  let _unbind = noop;
  const options = Object.assign({}, DEFAULT_OPTIONS, localOptions);
  const data = options.target || vueDemi.ref(options.initialValue);
  const pending = vueDemi.ref(true);
  const error = vueDemi.ref();
  const promise = vueDemi.shallowRef();
  let isPromiseAdded = false;
  const hasCurrentScope = vueDemi.getCurrentScope();
  let removePendingPromise = noop;
  function bindFirestoreRef() {
    let docRefValue = vueDemi.unref(docOrCollectionRef);
    const p = new Promise((resolve, reject) => {
      _unbind(options.reset);
      if (!docRefValue) {
        _unbind = noop;
        return resolve(null);
      }
      if (!docRefValue.converter) {
        docRefValue = docRefValue.withConverter(
          options.converter
        );
      }
      _unbind = (isDocumentRef(docRefValue) ? bindDocument : bindCollection)(
        data,
        docRefValue,
        ops,
        resolve,
        reject,
        options
      );
    });
    if (!isPromiseAdded && docRefValue) {
      removePendingPromise = addPendingPromise(p, docRefValue);
      isPromiseAdded = true;
    }
    promise.value = p;
    p.catch((reason) => {
      error.value = reason;
    }).finally(() => {
      pending.value = false;
    });
  }
  let stopWatcher = noop;
  if (vueDemi.isRef(docOrCollectionRef)) {
    stopWatcher = vueDemi.watch(docOrCollectionRef, bindFirestoreRef, {
      immediate: true
    });
  } else {
    bindFirestoreRef();
  }
  if (hasCurrentScope) {
    vueDemi.onScopeDispose(unbind2);
    vueDemi.onServerPrefetch(() => promise.value);
  }
  function unbind2(reset = options.reset) {
    stopWatcher();
    removePendingPromise();
    _unbind(reset);
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
function useCollection(collectionRef, options) {
  return _useFirestoreRef(collectionRef, {
    target: vueDemi.ref([]),
    ...options
  });
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
function useFirestore(name) {
  return firestore.getFirestore(useFirebaseApp(name));
}

const scope = vue.effectScope(true);

const AuthUserInjectSymbol = Symbol("user");
function useCurrentUser() {
  return vue.inject(AuthUserInjectSymbol);
}
function setupOnAuthStateChanged(user, app) {
  const auth$1 = auth.getAuth(app);
  let resolve;
  const isReady = new Promise((_resolve) => {
    resolve = _resolve;
  });
  auth.onIdTokenChanged(auth$1, (userData) => {
    user.value = userData;
    resolve(userData);
  });
  return { isReady };
}

function VueFireAuth(firebaseApp, app) {
  const user = scope.run(() => vue.shallowRef());
  app.provide(AuthUserInjectSymbol, user);
  setupOnAuthStateChanged(user, firebaseApp);
}
function useFirebaseAuth(name) {
  return auth.getAuth(useFirebaseApp(name));
}

function VueFire(app, { firebaseApp, modules: services = [] }) {
  app.provide(_FirebaseAppInjectionKey, firebaseApp);
  for (const firebaseModule of services) {
    app.use(firebaseModule.bind(null, firebaseApp));
  }
}

exports.VueFire = VueFire;
exports.VueFireAuth = VueFireAuth;
exports.databasePlugin = databasePlugin;
exports.firestoreDefaultConverter = firestoreDefaultConverter;
exports.firestorePlugin = firestorePlugin;
exports.useCollection = useCollection;
exports.useCurrentUser = useCurrentUser;
exports.useDatabase = useDatabase;
exports.useDocument = useDocument;
exports.useFirebaseApp = useFirebaseApp;
exports.useFirebaseAuth = useFirebaseAuth;
exports.useFirestore = useFirestore;
exports.useList = useList;
exports.useObject = useObject;
exports.usePendingPromises = usePendingPromises;
