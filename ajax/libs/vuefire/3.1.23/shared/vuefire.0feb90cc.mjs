import { updateProfile, onIdTokenChanged } from 'firebase/auth';
import { getCurrentInstance, inject, isVue2, effectScope, computed, ref } from 'vue-demi';
import { initializeAppCheck, onTokenChanged } from 'firebase/app-check';
import { getApp } from 'firebase/app';

const _FirebaseAppInjectionKey = Symbol("firebaseApp");
function useFirebaseApp(name) {
  return getCurrentInstance() && inject(
    _FirebaseAppInjectionKey,
    // avoid the inject not found warning
    null
  ) || getApp(name);
}

const noop = () => {
};
const isClient = typeof window !== "undefined";
function walkGet(obj, path) {
  return path.split(".").reduce((target, key) => target && target[key], obj);
}
function walkSet(obj, path, value) {
  const keys = ("" + path).split(".");
  const key = keys.pop();
  const target = keys.reduce(
    (target2, key2) => (
      // @ts-expect-error: FIXME: maybe
      target2 && target2[key2]
    ),
    obj
  );
  if (target == null)
    return;
  return Array.isArray(target) ? target.splice(Number(key), 1, value) : (
    // @ts-expect-error: FIXME: maybe
    target[key] = //
    value
  );
}
function isObject(o) {
  return !!o && typeof o === "object";
}
const ObjectPrototype = Object.prototype;
function isPOJO(obj) {
  return isObject(obj) && Object.getPrototypeOf(obj) === ObjectPrototype;
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
function isDatabaseReference(source) {
  return isObject(source) && "ref" in source;
}
function isStorageReference(source) {
  return isObject(source) && typeof source.bucket === "string";
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
const ssrContextKey = Symbol.for("v-scx");
function useIsSSR() {
  const instance = getCurrentInstance();
  return !!(isVue2 ? instance && // @ts-expect-error: Vue 2 only API
  instance.proxy.$isServer : inject(ssrContextKey, 0));
}
function checkWrittenTarget(data, fnName) {
  if (Object.getOwnPropertyDescriptor(data, "data")?.get?.() === data) {
    console.warn(`[VueFire] the passed "options.target" is already the returned value of "${fnName}". If you want to subscribe to a different data source, pass a reactive variable to "${fnName}" instead:
https://vuefire.vuejs.org/guide/realtime-data.html#declarative-realtime-data
This will FAIL in production.`);
    return true;
  }
  return false;
}

const scopeMap = /* @__PURE__ */ new WeakMap();
function getGlobalScope(firebaseApp, app) {
  if (!scopeMap.has(firebaseApp)) {
    const scope = effectScope(true);
    scopeMap.set(firebaseApp, scope);
    const { unmount } = app;
    app.unmount = () => {
      unmount.call(app);
      scope.stop();
      scopeMap.delete(firebaseApp);
    };
  }
  return scopeMap.get(firebaseApp);
}

const authUserMap = /* @__PURE__ */ new WeakMap();
function useCurrentUser(name) {
  if (process.env.NODE_ENV !== "production" && !authUserMap.has(useFirebaseApp(name))) {
    throw new Error(
      `[VueFire] useCurrentUser() called before the VueFireAuth module was added to the VueFire plugin. This will fail in production.`
    );
  }
  return authUserMap.get(useFirebaseApp(name));
}
function useIsCurrentUserLoaded(name) {
  const currentUser = useCurrentUser(name);
  return computed(() => currentUser.value !== void 0);
}
function updateCurrentUserProfile(profile) {
  return getCurrentUser().then((user) => {
    if (user) {
      return updateProfile(user, profile).then(() => user.reload());
    }
  });
}
const initialUserMap = /* @__PURE__ */ new WeakMap();
function _setInitialUser(firebaseApp, user) {
  initialUserMap.set(firebaseApp, user);
}
function _getCurrentUserState(name) {
  const firebaseApp = useFirebaseApp(name);
  if (!initialUserMap.has(firebaseApp)) {
    let resolve;
    const promise = new Promise((_resolve) => {
      resolve = _resolve;
    });
    const userState = [
      promise,
      (user) => {
        initialUserMap.set(firebaseApp, user);
        resolve(user.value);
      }
    ];
    initialUserMap.set(firebaseApp, userState);
  }
  return initialUserMap.get(firebaseApp);
}
function getCurrentUser(name) {
  const userOrPromise = _getCurrentUserState(name);
  return Array.isArray(userOrPromise) ? userOrPromise[0] : Promise.resolve(userOrPromise.value);
}
function setupOnAuthStateChanged(user, auth) {
  onIdTokenChanged(auth, (userData) => {
    const userOrPromise = _getCurrentUserState();
    user.value = userData;
    if (Array.isArray(userOrPromise)) {
      userOrPromise[1](user);
    }
  });
}

const AppCheckTokenInjectSymbol = Symbol("app-check-token");
function useAppCheckToken() {
  return inject(AppCheckTokenInjectSymbol);
}
function VueFireAppCheck(options) {
  return (firebaseApp, app) => {
    if (!isClient)
      return;
    const token = getGlobalScope(firebaseApp, app).run(() => ref());
    app.provide(AppCheckTokenInjectSymbol, token);
    if (options.debug) {
      self.FIREBASE_APPCHECK_DEBUG_TOKEN = options.debug;
    }
    const appCheck = initializeAppCheck(firebaseApp, options);
    onTokenChanged(appCheck, (newToken) => {
      token.value = newToken.token;
    });
    AppCheckMap.set(firebaseApp, appCheck);
  };
}
const AppCheckMap = /* @__PURE__ */ new WeakMap();
function useAppCheck(name) {
  return AppCheckMap.get(useFirebaseApp(name));
}

export { AppCheckTokenInjectSymbol as A, VueFireAppCheck as V, _FirebaseAppInjectionKey as _, isFirestoreQuery as a, isDatabaseReference as b, isStorageReference as c, isObject as d, checkWrittenTarget as e, useIsSSR as f, isPOJO as g, isDocumentRef as h, isFirestoreDataReference as i, callOnceWithArg as j, walkSet as k, getGlobalScope as l, authUserMap as m, noop as n, isClient as o, useCurrentUser as p, useIsCurrentUserLoaded as q, getCurrentUser as r, setupOnAuthStateChanged as s, updateCurrentUserProfile as t, useFirebaseApp as u, useAppCheckToken as v, walkGet as w, useAppCheck as x, AppCheckMap as y, _setInitialUser as z };
