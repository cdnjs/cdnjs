import { i as isFirestoreDataReference, a as isFirestoreQuery, b as isDatabaseReference, c as isStorageReference, n as noop, u as useFirebaseApp, d as isObject, e as checkWrittenTarget, f as useIsSSR, g as isPOJO, h as isDocumentRef, w as walkGet, j as callOnceWithArg, k as walkSet, l as getGlobalScope, s as setupOnAuthStateChanged, m as authUserMap, o as isClient, _ as _FirebaseAppInjectionKey } from './shared/vuefire.0feb90cc.mjs';
export { V as VueFireAppCheck, r as getCurrentUser, t as updateCurrentUserProfile, x as useAppCheck, v as useAppCheckToken, p as useCurrentUser, q as useIsCurrentUserLoaded } from './shared/vuefire.0feb90cc.mjs';
import { toValue, ref, shallowRef, getCurrentScope, isRef, watch, onScopeDispose, getCurrentInstance, onServerPrefetch, isVue3, toRef, effectScope, inject, computed } from 'vue-demi';
import { get, onValue, onChildAdded, onChildRemoved, onChildChanged, onChildMoved, getDatabase } from 'firebase/database';
import { Timestamp, GeoPoint, getDocs, onSnapshot, getDoc, getFirestore } from 'firebase/firestore';
import { initializeAuth, browserPopupRedirectResolver, indexedDBLocalPersistence, browserLocalPersistence, browserSessionPersistence } from 'firebase/auth';
import { getStorage, getDownloadURL, getMetadata, updateMetadata, uploadBytesResumable } from 'firebase/storage';
import 'firebase/app-check';
import 'firebase/app';

const _initialStatesMap = /* @__PURE__ */ new WeakMap();
function useSSRInitialState(initialState, firebaseApp) {
  if (!_initialStatesMap.has(firebaseApp)) {
    _initialStatesMap.set(
      firebaseApp,
      initialState || { f: {}, r: {}, s: {}, u: {} }
    );
  }
  return _initialStatesMap.get(firebaseApp);
}
function getInitialValue(dataSource, ssrKey, fallbackValue, firebaseApp) {
  if (!dataSource)
    return fallbackValue;
  const [sourceType, path] = getDataSourceInfo(dataSource);
  if (!sourceType)
    return fallbackValue;
  const initialState = useSSRInitialState(void 0, firebaseApp)[sourceType] || {};
  const key = ssrKey || path;
  return key && key in initialState ? initialState[key] : fallbackValue;
}
function deferInitialValueSetup(dataSource, ssrKey, promise, firebaseApp) {
  if (!dataSource)
    return;
  const [sourceType, path] = getDataSourceInfo(dataSource);
  if (!sourceType)
    return;
  const initialState = useSSRInitialState(
    void 0,
    firebaseApp
  )[sourceType];
  const key = ssrKey || path;
  if (key) {
    promise.then((value) => {
      initialState[key] = value;
    }).catch(noop);
    return key;
  }
}
function getDataSourceInfo(dataSource) {
  return isFirestoreDataReference(dataSource) || isFirestoreQuery(dataSource) ? ["f", dataSource.path] : isDatabaseReference(dataSource) ? ["r", dataSource.toString()] : isStorageReference(dataSource) ? ["s", dataSource.toString()] : [];
}

const appPendingPromises = /* @__PURE__ */ new WeakMap();
function addPendingPromise(promise, dataSource, ssrKey) {
  const app = useFirebaseApp();
  if (!appPendingPromises.has(app)) {
    appPendingPromises.set(app, /* @__PURE__ */ new Map());
  }
  const pendingPromises = appPendingPromises.get(app);
  const key = deferInitialValueSetup(dataSource, ssrKey, promise, app);
  if (key) {
    pendingPromises.set(key, promise);
  } else {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[VueFire SSR]: Could not get the path of the data source");
    }
  }
  return key ? () => pendingPromises.delete(key) : noop;
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

function createRecordFromDatabaseSnapshot(snapshot) {
  if (!snapshot.exists())
    return null;
  const value = snapshot.val();
  return isObject(value) ? Object.defineProperty(value, "id", {
    // allow destructuring without interfering without using the `id` property
    value: snapshot.key
  }) : {
    // if the value is a primitive we can just return a regular object, it's easier to debug
    // @ts-expect-error: $value doesn't exist
    $value: value,
    id: snapshot.key
  };
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
function bindAsObject(target, document, resolve, reject, extraOptions) {
  const options = Object.assign({}, DEFAULT_OPTIONS$1, extraOptions);
  let unsubscribe = noop;
  function onValueCallback(snapshot) {
    const value = options.serialize(snapshot);
    target.value = value;
    resolve(value);
  }
  if (options.once) {
    get(document).then(onValueCallback).catch(reject);
  } else {
    unsubscribe = onValue(document, onValueCallback, reject);
  }
  return (reset) => {
    unsubscribe();
    if (reset) {
      const value = typeof reset === "function" ? reset() : null;
      target.value = value;
    }
  };
}
function bindAsArray(target, collection, resolve, reject, extraOptions) {
  const options = Object.assign({}, DEFAULT_OPTIONS$1, extraOptions);
  let arrayRef = options.wait ? [] : target;
  if (!options.wait) {
    target.value = [];
  }
  let removeChildAddedListener = noop;
  let removeChildChangedListener = noop;
  let removeChildRemovedListener = noop;
  let removeChildMovedListener = noop;
  let removeValueListener = noop;
  if (options.once) {
    get(collection).then((data) => {
      const array = [];
      data.forEach((snapshot) => {
        array.push(options.serialize(snapshot));
      });
      resolve(target.value = array);
    }).catch(reject);
  } else {
    removeChildAddedListener = onChildAdded(
      collection,
      (snapshot, prevKey) => {
        const array = toValue(arrayRef);
        const index = prevKey ? indexForKey(array, prevKey) + 1 : 0;
        array.splice(index, 0, options.serialize(snapshot));
      },
      reject
    );
    removeChildRemovedListener = onChildRemoved(
      collection,
      (snapshot) => {
        const array = toValue(arrayRef);
        array.splice(indexForKey(array, snapshot.key), 1);
      },
      reject
    );
    removeChildChangedListener = onChildChanged(
      collection,
      (snapshot) => {
        const array = toValue(arrayRef);
        array.splice(
          indexForKey(array, snapshot.key),
          1,
          // cannot be null because it exists
          options.serialize(snapshot)
        );
      },
      reject
    );
    removeChildMovedListener = onChildMoved(
      collection,
      (snapshot, prevKey) => {
        const array = toValue(arrayRef);
        const index = indexForKey(array, snapshot.key);
        const oldRecord = array.splice(index, 1)[0];
        const newIndex = prevKey ? indexForKey(array, prevKey) + 1 : 0;
        array.splice(newIndex, 0, oldRecord);
      },
      reject
    );
    removeValueListener = onValue(
      collection,
      () => {
        const array = toValue(arrayRef);
        if (options.wait) {
          target.value = array;
          arrayRef = target;
        }
        resolve(array);
        removeValueListener();
      },
      reject
    );
  }
  return (reset) => {
    removeValueListener();
    removeChildAddedListener();
    removeChildRemovedListener();
    removeChildChangedListener();
    removeChildMovedListener();
    if (reset) {
      const value = typeof reset === "function" ? reset() : [];
      target.value = value;
    }
  };
}

function _useDatabaseRef(reference, localOptions = {}, isList = false) {
  let unbind = noop;
  const options = Object.assign({}, DEFAULT_OPTIONS$1, localOptions);
  const initialSourceValue = toValue(reference);
  const data = options.target || ref();
  if (process.env.NODE_ENV !== "production") {
    if (options.target && checkWrittenTarget(data, "useDatabaseObject()/useDatabaseList()")) {
      return data;
    }
  }
  const isSSR = useIsSSR();
  if (isSSR) {
    options.once = true;
  }
  const initialValue = getInitialValue(
    initialSourceValue,
    options.ssrKey,
    data.value,
    useFirebaseApp()
  );
  data.value = initialValue;
  const hasInitialValue = isList ? (initialValue || []).length > 0 : initialValue !== void 0;
  let shouldStartAsPending = !hasInitialValue;
  const error = ref();
  const pending = ref(false);
  const promise = shallowRef();
  const hasCurrentScope = getCurrentScope();
  let removePendingPromise = noop;
  function bindDatabaseRef() {
    const referenceValue = toValue(reference);
    const newPromise = new Promise((resolve, reject) => {
      unbind(options.reset);
      if (!referenceValue) {
        unbind = noop;
        return resolve(null);
      }
      pending.value = shouldStartAsPending;
      shouldStartAsPending = true;
      if (Array.isArray(data.value)) {
        unbind = bindAsArray(
          data,
          referenceValue,
          resolve,
          reject,
          options
        );
      } else {
        unbind = bindAsObject(data, referenceValue, resolve, reject, options);
      }
    }).catch((reason) => {
      if (promise.value === newPromise) {
        error.value = reason;
      }
      throw reason;
    }).finally(() => {
      if (promise.value === newPromise) {
        pending.value = false;
      }
    });
    promise.value = newPromise;
  }
  let stopWatcher = noop;
  if (isRef(reference) || typeof reference === "function") {
    stopWatcher = watch(reference, bindDatabaseRef);
  }
  bindDatabaseRef();
  if (initialSourceValue) {
    removePendingPromise = addPendingPromise(
      promise.value,
      initialSourceValue,
      options.ssrKey
    );
  }
  if (hasCurrentScope) {
    onScopeDispose(stop);
    if (getCurrentInstance()) {
      onServerPrefetch(() => promise.value);
    }
  }
  function stop(reset = options.reset) {
    stopWatcher();
    removePendingPromise();
    unbind(reset);
  }
  return Object.defineProperties(data, {
    // allow destructuring without interfering with the ref itself
    data: { get: () => data },
    error: { get: () => error },
    pending: { get: () => pending },
    promise: { get: () => promise },
    stop: { get: () => stop }
  });
}

function useDatabaseList(reference, options) {
  const data = ref([]);
  return _useDatabaseRef(
    reference,
    {
      target: data,
      ...options
    },
    true
  );
}
const useList = useDatabaseList;
function useDatabaseObject(reference, options) {
  const data = ref();
  return _useDatabaseRef(reference, {
    target: data,
    ...options
  });
}
const useObject = useDatabaseObject;
function useDatabase(name) {
  return getDatabase(useFirebaseApp(name));
}

const firestoreDefaultConverter = {
  toFirestore(data) {
    return data;
  },
  fromFirestore(snapshot, options) {
    return snapshot.exists() ? Object.defineProperties(snapshot.data(options), {
      id: { value: snapshot.id }
      // TODO: check if worth adding or should be through an option
      // It could also be an example in the docs about converters
      // $meta: {
      //   value: snapshot.metadata,
      // },
      // $ref: { get: () => snapshot.ref },
    }) : null;
  }
};
function extractRefs(doc, oldDoc, subs, options) {
  if (!isPOJO(doc))
    return [doc, {}];
  const dataAndRefs = [
    {},
    {}
  ];
  const subsByPath = Object.keys(subs).reduce(
    (resultSubs, subKey) => {
      const sub = subs[subKey];
      resultSubs[sub.path] = sub.data();
      return resultSubs;
    },
    {}
  );
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
      if (
        // primitives
        ref == null || // TODO: check and remove
        // Firestore < 4.13
        ref instanceof Date || ref instanceof Timestamp || ref instanceof GeoPoint
      ) {
        data[key] = ref;
      } else if (isDocumentRef(ref)) {
        const refSubKey = path + key;
        data[key] = // if the ref was already bound, keep the same object
        // otherwise set the path as a string so it can be bound later
        // https://github.com/vuejs/vuefire/issues/831
        // https://github.com/vuejs/vuefire/pull/1223
        refSubKey in subs ? oldDoc2[key] : ref.path;
        refs[refSubKey] = ref.converter ? ref : ref.withConverter(
          options.converter
        );
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
const devalueCustomStringifiers = {
  TimeStamp: (data) => data instanceof Timestamp && data.toJSON(),
  GeoPoint: (data) => data instanceof GeoPoint && data.toJSON()
};
const devalueCustomParsers = {
  TimeStamp: (data) => new Timestamp(data.seconds, data.nanoseconds),
  GeoPoint: (data) => new GeoPoint(data.latitude, data.longitude)
};

const DEFAULT_OPTIONS = {
  reset: false,
  wait: true,
  maxRefDepth: 2,
  converter: firestoreDefaultConverter,
  snapshotOptions: { serverTimestamps: "estimate" }
};
function unsubscribeAll(subs) {
  for (const sub in subs) {
    subs[sub].unsub();
  }
}
function updateDataFromDocumentSnapshot(options, target, path, snapshot, subs, ops, depth, resolve, reject) {
  const [data, refs] = extractRefs(
    // Pass snapshot options
    // @ts-expect-error: FIXME: use better types
    snapshot.data(options.snapshotOptions),
    walkGet(target, path),
    subs,
    options
  );
  ops.set(target, path, data);
  subscribeToRefs(
    options,
    target,
    path,
    subs,
    refs,
    ops,
    depth,
    resolve,
    reject
  );
}
function subscribeToDocument({
  ref: ref2,
  target,
  path,
  depth,
  resolve,
  reject,
  ops
}, options) {
  const subs = /* @__PURE__ */ Object.create(null);
  let unbind = noop;
  if (options.once) {
    getDoc(ref2).then((snapshot) => {
      if (snapshot.exists()) {
        updateDataFromDocumentSnapshot(
          options,
          target,
          path,
          snapshot,
          subs,
          ops,
          depth,
          resolve,
          reject
        );
      } else {
        ops.set(target, path, null);
        resolve();
      }
    }).catch(reject);
  } else {
    unbind = onSnapshot(
      ref2,
      (snapshot) => {
        if (snapshot.exists()) {
          updateDataFromDocumentSnapshot(
            options,
            target,
            path,
            snapshot,
            subs,
            ops,
            depth,
            resolve,
            reject
          );
        } else {
          ops.set(target, path, null);
          resolve();
        }
      },
      reject
    );
  }
  return () => {
    unbind();
    unsubscribeAll(subs);
  };
}
function subscribeToRefs(options, target, path, subs, refs, ops, depth, resolve, reject) {
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
          resolve: deepResolve.bind(null, docPath),
          reject
        },
        options
      ),
      path: ref2.path
    };
  });
}
function bindCollection(target, collection, ops, resolve, reject, extraOptions) {
  const options = Object.assign({}, DEFAULT_OPTIONS, extraOptions);
  const { snapshotListenOptions, snapshotOptions, wait, once } = options;
  const key = "value";
  let arrayRef = ref(wait ? [] : target.value);
  if (!wait)
    ops.set(target, key, []);
  const originalResolve = resolve;
  let isResolved;
  let stopOnSnapshot = noop;
  const arraySubs = [];
  const change = {
    added: ({ newIndex, doc }) => {
      arraySubs.splice(newIndex, 0, /* @__PURE__ */ Object.create(null));
      const subs = arraySubs[newIndex];
      const [data, refs] = extractRefs(
        // @ts-expect-error: FIXME: wrong cast, needs better types
        doc.data(snapshotOptions),
        void 0,
        subs,
        options
      );
      ops.add(toValue(arrayRef), newIndex, data);
      subscribeToRefs(
        options,
        arrayRef,
        `${key}.${newIndex}`,
        subs,
        refs,
        ops,
        0,
        resolve.bind(null, doc),
        reject
      );
    },
    modified: ({ oldIndex, newIndex, doc }) => {
      const array = toValue(arrayRef);
      const subs = arraySubs[oldIndex];
      const oldData = array[oldIndex];
      const [data, refs] = extractRefs(
        // @ts-expect-error: FIXME: Better types
        doc.data(snapshotOptions),
        oldData,
        subs,
        options
      );
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
        resolve,
        reject
      );
    },
    removed: ({ oldIndex }) => {
      const array = toValue(arrayRef);
      ops.remove(array, oldIndex);
      unsubscribeAll(arraySubs.splice(oldIndex, 1)[0]);
    }
  };
  function onSnapshotCallback(snapshot) {
    const docChanges = snapshot.docChanges(snapshotListenOptions);
    if (!isResolved && docChanges.length) {
      isResolved = true;
      let count = 0;
      const expectedItems = docChanges.length;
      const validDocs = /* @__PURE__ */ Object.create(null);
      for (let i = 0; i < expectedItems; i++) {
        validDocs[docChanges[i].doc.id] = true;
      }
      resolve = (data) => {
        if (data && data.id in validDocs) {
          if (++count >= expectedItems) {
            if (wait) {
              ops.set(target, key, toValue(arrayRef));
              arrayRef = target;
            }
            originalResolve(toValue(arrayRef));
            resolve = noop;
          }
        }
      };
    }
    docChanges.forEach((c) => {
      change[c.type](c);
    });
    if (!docChanges.length) {
      if (wait) {
        ops.set(target, key, toValue(arrayRef));
        arrayRef = target;
      }
      resolve(toValue(arrayRef));
    }
  }
  if (once) {
    getDocs(collection).then(onSnapshotCallback).catch(reject);
  } else {
    stopOnSnapshot = onSnapshot(collection, onSnapshotCallback, reject);
  }
  return (reset) => {
    stopOnSnapshot();
    if (reset) {
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
  let stopOnSnapshot = noop;
  function onSnapshotCallback(snapshot) {
    if (snapshot.exists()) {
      updateDataFromDocumentSnapshot(
        options,
        target,
        key,
        snapshot,
        subs,
        ops,
        0,
        resolve,
        reject
      );
    } else {
      ops.set(target, key, null);
      resolve(null);
    }
  }
  if (options.once) {
    getDoc(document).then(onSnapshotCallback).catch(reject);
  } else {
    stopOnSnapshot = onSnapshot(document, onSnapshotCallback, reject);
  }
  return (reset) => {
    stopOnSnapshot();
    if (reset) {
      const value = typeof reset === "function" ? reset() : null;
      ops.set(target, key, value);
    }
    unsubscribeAll(subs);
  };
}

const NO_INITIAL_VALUE = Symbol();
function _useFirestoreRef(docOrCollectionRef, localOptions) {
  let unbind = noop;
  const options = Object.assign({}, DEFAULT_OPTIONS, localOptions);
  const initialSourceValue = toValue(docOrCollectionRef);
  const data = options.target || ref();
  if (process.env.NODE_ENV !== "production") {
    if (options.target && checkWrittenTarget(data, "useDocument()/useCollection()")) {
      return data;
    }
  }
  if (useIsSSR()) {
    options.once = true;
  }
  const initialValue = getInitialValue(
    initialSourceValue,
    options.ssrKey,
    NO_INITIAL_VALUE,
    useFirebaseApp()
  );
  const hasInitialValue = initialValue !== NO_INITIAL_VALUE;
  if (hasInitialValue) {
    data.value = initialValue;
  }
  let shouldStartAsPending = !hasInitialValue;
  const pending = ref(false);
  const error = ref();
  const promise = shallowRef();
  const hasCurrentScope = getCurrentScope();
  let removePendingPromise = noop;
  function bindFirestoreRef() {
    let docRefValue = toValue(docOrCollectionRef);
    const newPromise = new Promise((resolve, reject) => {
      unbind(options.reset);
      if (!docRefValue) {
        unbind = noop;
        return resolve(null);
      }
      pending.value = shouldStartAsPending;
      shouldStartAsPending = true;
      if (!docRefValue.converter) {
        docRefValue = docRefValue.withConverter(
          // @ts-expect-error: seems like a ts error
          options.converter
        );
      }
      unbind = (isDocumentRef(docRefValue) ? bindDocument : bindCollection)(
        // @ts-expect-error: cannot type with the ternary
        data,
        docRefValue,
        ops,
        resolve,
        reject,
        options
      );
    }).catch((reason) => {
      if (promise.value === newPromise) {
        error.value = reason;
      }
      return Promise.reject(reason);
    }).finally(() => {
      if (promise.value === newPromise) {
        pending.value = false;
      }
    });
    promise.value = newPromise;
  }
  let stopWatcher = noop;
  if (isRef(docOrCollectionRef) || typeof docOrCollectionRef === "function") {
    stopWatcher = watch(docOrCollectionRef, bindFirestoreRef);
  }
  bindFirestoreRef();
  if (initialSourceValue) {
    removePendingPromise = addPendingPromise(
      promise.value,
      initialSourceValue,
      options.ssrKey
    );
  }
  if (getCurrentInstance()) {
    onServerPrefetch(() => promise.value);
  }
  if (hasCurrentScope) {
    onScopeDispose(stop);
  }
  function stop(reset = options.reset) {
    stopWatcher();
    removePendingPromise();
    unbind(reset);
  }
  return Object.defineProperties(data, {
    error: { get: () => error },
    data: { get: () => data },
    pending: { get: () => pending },
    promise: { get: () => promise },
    stop: { get: () => stop }
  });
}
const ops = {
  set: (target, key, value) => walkSet(target, key, value),
  add: (array, index, data) => array.splice(index, 0, data),
  remove: (array, index) => array.splice(index, 1)
};

function useCollection(collectionRef, options) {
  return _useFirestoreRef(collectionRef, {
    target: ref([]),
    ...options
  });
}
function useDocument(documentRef, options) {
  return _useFirestoreRef(documentRef, options);
}
function useFirestore(name) {
  return getFirestore(useFirebaseApp(name));
}

const databaseUnbinds = /* @__PURE__ */ new WeakMap();
function internalUnbind$1(key, unbinds, reset) {
  if (unbinds && unbinds[key]) {
    unbinds[key](reset);
    delete unbinds[key];
  }
}

const databasePluginDefaults = {
  bindName: "$databaseBind",
  unbindName: "$databaseUnbind"
};
function databasePlugin(app, pluginOptions, firebaseApp) {
  const globalOptions = Object.assign({}, databasePluginDefaults, pluginOptions);
  const { bindName, unbindName } = globalOptions;
  const GlobalTarget = isVue3 ? app.config.globalProperties : app.prototype;
  GlobalTarget[unbindName] = function databaseUnbind(key, reset) {
    internalUnbind$1(key, databaseUnbinds.get(this), reset);
    delete this.$firebaseRefs[key];
  };
  GlobalTarget[bindName] = function databaseBind(key, source, userOptions) {
    const options = Object.assign({}, globalOptions, userOptions);
    const target = toRef(this.$data, key);
    if (!databaseUnbinds.has(this)) {
      databaseUnbinds.set(this, {});
    }
    const unbinds = databaseUnbinds.get(this);
    if (unbinds[key]) {
      unbinds[key](options.reset);
    }
    if (pluginOptions) {
      if (!pluginOptions.bindName) {
        GlobalTarget["$rtdbBind"] = GlobalTarget[bindName];
      }
      if (!pluginOptions.unbindName) {
        GlobalTarget["$rtdbUnbind"] = GlobalTarget[unbindName];
      }
    }
    const scope = getGlobalScope(firebaseApp || useFirebaseApp(), app).run(
      () => effectScope()
    );
    const { promise, stop: _unbind } = app.runWithContext(
      () => scope.run(() => _useDatabaseRef(source, { target, ...options }))
    );
    const unbind = (reset) => {
      _unbind(reset);
      scope.stop();
    };
    unbinds[key] = unbind;
    this.$firebaseRefs[key] = source.ref;
    return promise.value;
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
          // ts
          key,
          bindings[key],
          globalOptions
        );
      }
    },
    beforeUnmount() {
      const unbinds = databaseUnbinds.get(this);
      if (unbinds) {
        for (const key in unbinds) {
          unbinds[key]();
        }
      }
      this.$firebaseRefs = null;
    }
  });
}
function VueFireDatabaseOptionsAPI(pluginOptions) {
  return (firebaseApp, app) => {
    return databasePlugin(app, pluginOptions, firebaseApp);
  };
}

const firestoreUnbinds = /* @__PURE__ */ new WeakMap();
function internalUnbind(key, unbinds, reset) {
  if (unbinds && unbinds[key]) {
    unbinds[key](reset);
    delete unbinds[key];
  }
}

const firestorePluginDefaults = {
  bindName: "$firestoreBind",
  unbindName: "$firestoreUnbind"
};
const firestorePlugin = function firestorePlugin2(app, pluginOptions, firebaseApp) {
  const globalOptions = Object.assign(
    {},
    firestorePluginDefaults,
    pluginOptions
  );
  const { bindName, unbindName } = globalOptions;
  const GlobalTarget = isVue3 ? app.config.globalProperties : app.prototype;
  GlobalTarget[unbindName] = function firestoreUnbind(key, reset) {
    internalUnbind(key, firestoreUnbinds.get(this), reset);
    delete this.$firestoreRefs[key];
  };
  GlobalTarget[bindName] = function firestoreBind(key, docOrCollectionRef, userOptions) {
    const options = Object.assign({}, globalOptions, userOptions);
    const target = toRef(this.$data, key);
    if (!firestoreUnbinds.has(this)) {
      firestoreUnbinds.set(this, {});
    }
    const unbinds = firestoreUnbinds.get(this);
    if (unbinds[key]) {
      unbinds[key](options.reset);
    }
    const scope = getGlobalScope(firebaseApp || useFirebaseApp(), app).run(
      () => effectScope()
    );
    const { promise, stop: _unbind } = app.runWithContext(
      () => scope.run(
        () => _useFirestoreRef(docOrCollectionRef, {
          target,
          ...options
        })
      )
    );
    const unbind = (reset) => {
      _unbind(reset);
      scope.stop();
    };
    unbinds[key] = unbind;
    this.$firestoreRefs[key] = // ts
    docOrCollectionRef;
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
          // @ts-expect-error: FIXME: there is probably a wrong type in global properties
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
function VueFireFirestoreOptionsAPI(pluginOptions) {
  return (firebaseApp, app) => {
    return firestorePlugin(app, pluginOptions, firebaseApp);
  };
}

function VueFireAuth(initialUser) {
  return VueFireAuthWithDependencies({
    initialUser,
    dependencies: {
      popupRedirectResolver: browserPopupRedirectResolver,
      persistence: [
        indexedDBLocalPersistence,
        browserLocalPersistence,
        browserSessionPersistence
      ]
    }
  });
}
const _VueFireAuthKey = Symbol("VueFireAuth");
function VueFireAuthOptionsFromAuth({
  auth,
  initialUser
}) {
  return (firebaseApp, app) => {
    const [user, _auth] = _VueFireAuthInit(
      firebaseApp,
      app,
      initialUser,
      void 0,
      auth
    );
    setupOnAuthStateChanged(user, _auth);
  };
}
function VueFireAuthWithDependencies({
  dependencies,
  initialUser
}) {
  return (firebaseApp, app) => {
    const [user, auth] = _VueFireAuthInit(
      firebaseApp,
      app,
      initialUser,
      dependencies
    );
    setupOnAuthStateChanged(user, auth);
  };
}
function _VueFireAuthInit(firebaseApp, app, initialUser, dependencies, auth = initializeAuth(firebaseApp, dependencies)) {
  const user = getGlobalScope(firebaseApp, app).run(
    () => ref(initialUser)
  );
  authUserMap.set(firebaseApp, user);
  app.provide(_VueFireAuthKey, auth);
  return [user, auth];
}
function useFirebaseAuth(name) {
  if (process.env.NODE_ENV !== "production" && name != null) {
    console.warn(
      `[VueFire] useFirebaseAuth() no longer accepts a name parameter to enable tree shaking. If you have multiple applications, you must use "getAuth(firebaseApp)" or "getAuth(useFirebaseApp(name))" instead.`
    );
  }
  return isClient ? inject(_VueFireAuthKey) : null;
}

function useFirebaseStorage(name) {
  return getStorage(useFirebaseApp(name));
}
function useStorageFileUrl(storageRef) {
  const initialSourceValue = toValue(storageRef);
  const url = ref();
  url.value = getInitialValue(
    initialSourceValue,
    void 0,
    url.value,
    useFirebaseApp()
  );
  const promise = shallowRef(Promise.resolve(null));
  let removePendingPromise = noop;
  function refresh() {
    const storageSource = toValue(storageRef);
    if (storageSource) {
      promise.value = getDownloadURL(storageSource).then((downloadUrl) => url.value = downloadUrl).catch(() => null);
    } else {
      promise.value = Promise.resolve(url.value = null);
    }
    return promise.value;
  }
  refresh();
  if (isRef(storageRef) || typeof storageRef === "function") {
    watch(storageRef, refresh);
  }
  if (initialSourceValue) {
    removePendingPromise = addPendingPromise(promise.value, initialSourceValue);
  }
  if (getCurrentScope()) {
    onScopeDispose(removePendingPromise);
  }
  if (getCurrentInstance()) {
    onServerPrefetch(() => promise.value);
  }
  return { url, refresh, promise };
}
function useStorageFileMetadata(storageRef) {
  const initialSourceValue = toValue(storageRef);
  const metadata = shallowRef();
  if (initialSourceValue) {
    metadata.value = getInitialValue(
      initialSourceValue,
      // 'm ' is a prefix to differentiate from urls since both are stored in the same object
      "m " + initialSourceValue.toString(),
      metadata.value,
      useFirebaseApp()
    );
  }
  const promise = shallowRef(
    Promise.resolve(null)
  );
  let removePendingPromise = noop;
  function refresh() {
    const storageSource = toValue(storageRef);
    if (storageSource) {
      promise.value = getMetadata(storageSource).then((data) => metadata.value = data).catch(() => null);
    } else {
      promise.value = Promise.resolve(metadata.value = null);
    }
    return promise.value;
  }
  function update(newMetadata) {
    const storageSource = toValue(storageRef);
    if (storageSource) {
      promise.value = updateMetadata(storageSource, newMetadata).then(
        (newData) => {
          return metadata.value = newData;
        }
      );
    } else if (process.env.NODE_ENV !== "production") {
      console.warn('[VueFire]: "update()" called with no storage source.');
    }
    return promise.value;
  }
  refresh();
  if (isRef(storageRef)) {
    watch(storageRef, refresh);
  }
  if (initialSourceValue) {
    removePendingPromise = addPendingPromise(promise.value, initialSourceValue);
  }
  if (getCurrentScope()) {
    onScopeDispose(removePendingPromise);
  }
  if (getCurrentInstance()) {
    onServerPrefetch(() => promise.value);
  }
  return { metadata, update, refresh, promise };
}
function useStorageFile(storageRef) {
  const { url, refresh: refreshUrl } = useStorageFileUrl(storageRef);
  const {
    metadata,
    update: updateMetadata2,
    refresh: refreshMetadata
  } = useStorageFileMetadata(storageRef);
  const uploadTask = shallowRef();
  const snapshot = shallowRef();
  const uploadError = shallowRef();
  const uploadProgress = computed(() => {
    const snap = toValue(snapshot);
    return snap ? snap.bytesTransferred / snap.totalBytes : null;
  });
  let unsub = noop;
  function upload(newData, newMetadata) {
    const storageSource = toValue(storageRef);
    const currentTask = toValue(uploadTask);
    if (currentTask) {
      currentTask.cancel();
    }
    uploadError.value = null;
    snapshot.value = null;
    uploadTask.value = null;
    url.value = null;
    metadata.value = null;
    unsub();
    if (storageSource) {
      const newTask = uploadBytesResumable(storageSource, newData, newMetadata);
      uploadTask.value = newTask;
      snapshot.value = newTask.snapshot;
      unsub = newTask.on("state_changed", (newSnapshot) => {
        snapshot.value = newSnapshot;
      });
      return newTask.then((finalSnapshot) => {
        metadata.value = finalSnapshot.metadata;
        refreshUrl();
      }).catch((err) => {
        uploadError.value = err;
        return Promise.reject(err);
      }).finally(() => {
        unsub();
        uploadTask.value = null;
      });
    }
  }
  function refresh() {
    return Promise.all([refreshUrl(), refreshMetadata()]);
  }
  if (isRef(storageRef) || typeof storageRef === "function") {
    watch(storageRef, (storageSource) => {
      if (!storageSource) {
        if (uploadTask.value) {
          unsub();
          uploadTask.value.cancel();
        }
        uploadTask.value = null;
        snapshot.value = null;
      }
      refresh();
    });
  }
  if (getCurrentScope()) {
    onScopeDispose(unsub);
  }
  return {
    url,
    metadata,
    snapshot,
    uploadTask,
    uploadError,
    uploadProgress,
    upload,
    updateMetadata: updateMetadata2,
    refresh
    // promise,
  };
}
const useStorage = useFirebaseStorage;
const useStorageUrl = useStorageFileUrl;
const useStorageMetadata = useStorageFileMetadata;
const useStorageObject = useStorageFile;

function VueFire(app, { firebaseApp, modules = [] }) {
  app.provide(_FirebaseAppInjectionKey, firebaseApp);
  for (const firebaseModule of modules) {
    firebaseModule(firebaseApp, app);
  }
}

export { VueFire, VueFireAuth, VueFireAuthOptionsFromAuth, VueFireAuthWithDependencies, VueFireDatabaseOptionsAPI, VueFireFirestoreOptionsAPI, _VueFireAuthInit, _VueFireAuthKey, createRecordFromDatabaseSnapshot as databaseDefaultSerializer, databasePlugin, devalueCustomParsers, devalueCustomStringifiers, firestoreDefaultConverter, firestorePlugin, DEFAULT_OPTIONS$1 as globalDatabaseOptions, DEFAULT_OPTIONS as globalFirestoreOptions, databasePlugin as rtdbPlugin, useCollection, useDatabase, useDatabaseList, useDatabaseObject, useDocument, useFirebaseApp, useFirebaseAuth, useFirebaseStorage, useFirestore, useList, useObject, usePendingPromises, useSSRInitialState, useStorage, useStorageFile, useStorageFileMetadata, useStorageFileUrl, useStorageMetadata, useStorageObject, useStorageUrl };
