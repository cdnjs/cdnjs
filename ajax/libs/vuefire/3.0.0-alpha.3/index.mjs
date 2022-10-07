import { ref, unref, isVue3, toRef, getCurrentInstance, onBeforeUnmount } from 'vue-demi';
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
  return o && o.onSnapshot;
}
function callOnceWithArg(fn, argFn) {
  let called = false;
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

function createSnapshot(doc) {
  return Object.defineProperty(doc.data() || {}, "id", { value: doc.id });
}
function extractRefs(doc, oldDoc, subs) {
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
      if (ref == null || ref instanceof Date || isTimestamp(ref) || ref.longitude && ref.latitude) {
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

const DEFAULT_OPTIONS = {
  maxRefDepth: 2,
  reset: true,
  serialize: createSnapshot,
  wait: false
};
function unsubscribeAll(subs) {
  for (const sub in subs) {
    subs[sub].unsub();
  }
}
function updateDataFromDocumentSnapshot(options, target, path, snapshot, subs, ops, depth, resolve) {
  const [data, refs] = extractRefs(
    options.serialize(snapshot),
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
  const key = "value";
  if (!options.wait)
    ops.set(target, key, []);
  let arrayRef = ref(options.wait ? [] : target[key]);
  const originalResolve = resolve;
  let isResolved;
  const arraySubs = [];
  const change = {
    added: ({ newIndex, doc }) => {
      arraySubs.splice(newIndex, 0, /* @__PURE__ */ Object.create(null));
      const subs = arraySubs[newIndex];
      const [data, refs] = extractRefs(options.serialize(doc), void 0, subs);
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
      const [data, refs] = extractRefs(options.serialize(doc), oldData, subs);
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
      const docChanges = typeof snapshot.docChanges === "function" ? snapshot.docChanges() : snapshot.docChanges;
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
const ops$1 = {
  set: (target, key, value) => walkSet(target, key, value),
  add: (array, index, data) => array.splice(index, 0, data),
  remove: (array, index) => array.splice(index, 1)
};
function internalBind$1(target, key, source, unbinds, options) {
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
const defaultOptions$1 = {
  bindName: "$rtdbBind",
  unbindName: "$rtdbUnbind",
  serialize: DEFAULT_OPTIONS$1.serialize,
  reset: DEFAULT_OPTIONS$1.reset,
  wait: DEFAULT_OPTIONS$1.wait
};
const rtdbUnbinds = /* @__PURE__ */ new WeakMap();
const rtdbPlugin = function rtdbPlugin2(app, pluginOptions = defaultOptions$1) {
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
    const promise = internalBind$1(target, key, source, unbinds, options);
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
};
function bind$1(target, reference, options) {
  const unbinds = {};
  rtdbUnbinds.set(target, unbinds);
  const promise = internalBind$1(target, "", reference, unbinds, options);
  if (getCurrentInstance()) {
    onBeforeUnmount(() => {
      unbind$1(target, options && options.reset);
    });
  }
  return promise;
}
const unbind$1 = (target, reset) => internalUnbind$1("", rtdbUnbinds.get(target), reset);

const ops = {
  set: (target, key, value) => walkSet(target, key, value),
  add: (array, index, data) => array.splice(index, 0, data),
  remove: (array, index) => array.splice(index, 1)
};
function internalBind(target, docOrCollectionRef, options) {
  let unbind2;
  const promise = new Promise((resolve, reject) => {
    unbind2 = (docOrCollectionRef.type === "document" ? bindDocument : bindCollection)(
      target,
      docOrCollectionRef,
      ops,
      resolve,
      reject,
      options
    );
  });
  return [promise, unbind2];
}
function internalUnbind(key, unbinds, reset) {
  if (unbinds && unbinds[key]) {
    unbinds[key](reset);
    delete unbinds[key];
  }
}
const defaultOptions = {
  bindName: "$bind",
  unbindName: "$unbind",
  serialize: DEFAULT_OPTIONS.serialize,
  reset: DEFAULT_OPTIONS.reset,
  wait: DEFAULT_OPTIONS.wait
};
const firestoreUnbinds = /* @__PURE__ */ new WeakMap();
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
    const [promise, unbind2] = internalBind(
      target,
      docOrCollectionRef,
      options
    );
    unbinds[key] = unbind2;
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
function bind(target, docOrCollectionRef, options) {
  const unbinds = {};
  firestoreUnbinds.set(target, unbinds);
  const [promise, unbind2] = internalBind(
    target,
    docOrCollectionRef,
    options
  );
  if (getCurrentInstance()) {
    onBeforeUnmount(() => {
      unbind2(options && options.reset);
    });
  }
  return promise;
}
const unbind = (target, reset) => internalUnbind("", firestoreUnbinds.get(target), reset);

export { bind as firestoreBind, firestorePlugin, unbind as firestoreUnbind, bind$1 as rtdbBind, rtdbPlugin, unbind$1 as rtdbUnbind };
