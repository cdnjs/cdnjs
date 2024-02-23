'use strict';

const auth = require('firebase/auth');
const vueDemi = require('vue-demi');
const appCheck = require('firebase/app-check');
const app = require('firebase/app');

const _FirebaseAppInjectionKey = Symbol("firebaseApp");
function useFirebaseApp(name) {
  return vueDemi.getCurrentInstance() && vueDemi.inject(
    _FirebaseAppInjectionKey,
    // avoid the inject not found warning
    null
  ) || app.getApp(name);
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
  const instance = vueDemi.getCurrentInstance();
  return !!(vueDemi.isVue2 ? instance && // @ts-expect-error: Vue 2 only API
  instance.proxy.$isServer : vueDemi.inject(ssrContextKey, 0));
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
    const scope = vueDemi.effectScope(true);
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
  return vueDemi.computed(() => currentUser.value !== void 0);
}
function updateCurrentUserProfile(profile) {
  return getCurrentUser().then((user) => {
    if (user) {
      return auth.updateProfile(user, profile).then(() => user.reload());
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
function setupOnAuthStateChanged(user, auth$1) {
  auth.onIdTokenChanged(auth$1, (userData) => {
    const userOrPromise = _getCurrentUserState();
    user.value = userData;
    if (Array.isArray(userOrPromise)) {
      userOrPromise[1](user);
    }
  });
}

const AppCheckTokenInjectSymbol = Symbol("app-check-token");
function useAppCheckToken() {
  return vueDemi.inject(AppCheckTokenInjectSymbol);
}
function VueFireAppCheck(options) {
  return (firebaseApp, app) => {
    if (!isClient)
      return;
    const token = getGlobalScope(firebaseApp, app).run(() => vueDemi.ref());
    app.provide(AppCheckTokenInjectSymbol, token);
    if (options.debug) {
      self.FIREBASE_APPCHECK_DEBUG_TOKEN = options.debug;
    }
    const appCheck$1 = appCheck.initializeAppCheck(firebaseApp, options);
    appCheck.onTokenChanged(appCheck$1, (newToken) => {
      token.value = newToken.token;
    });
    AppCheckMap.set(firebaseApp, appCheck$1);
  };
}
const AppCheckMap = /* @__PURE__ */ new WeakMap();
function useAppCheck(name) {
  return AppCheckMap.get(useFirebaseApp(name));
}

exports.AppCheckMap = AppCheckMap;
exports.AppCheckTokenInjectSymbol = AppCheckTokenInjectSymbol;
exports.VueFireAppCheck = VueFireAppCheck;
exports._FirebaseAppInjectionKey = _FirebaseAppInjectionKey;
exports._setInitialUser = _setInitialUser;
exports.authUserMap = authUserMap;
exports.callOnceWithArg = callOnceWithArg;
exports.checkWrittenTarget = checkWrittenTarget;
exports.getCurrentUser = getCurrentUser;
exports.getGlobalScope = getGlobalScope;
exports.isClient = isClient;
exports.isDatabaseReference = isDatabaseReference;
exports.isDocumentRef = isDocumentRef;
exports.isFirestoreDataReference = isFirestoreDataReference;
exports.isFirestoreQuery = isFirestoreQuery;
exports.isObject = isObject;
exports.isPOJO = isPOJO;
exports.isStorageReference = isStorageReference;
exports.noop = noop;
exports.setupOnAuthStateChanged = setupOnAuthStateChanged;
exports.updateCurrentUserProfile = updateCurrentUserProfile;
exports.useAppCheck = useAppCheck;
exports.useAppCheckToken = useAppCheckToken;
exports.useCurrentUser = useCurrentUser;
exports.useFirebaseApp = useFirebaseApp;
exports.useIsCurrentUserLoaded = useIsCurrentUserLoaded;
exports.useIsSSR = useIsSSR;
exports.walkGet = walkGet;
exports.walkSet = walkSet;
