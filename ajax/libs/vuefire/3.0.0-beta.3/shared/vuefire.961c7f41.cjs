'use strict';

const vueDemi = require('vue-demi');
const auth = require('firebase/auth');
const app = require('firebase/app');

const _FirebaseAppInjectionKey = Symbol("firebaseApp");
function useFirebaseApp(name) {
  return vueDemi.getCurrentInstance() && vueDemi.inject(
    _FirebaseAppInjectionKey,
    null
  ) || app.getApp(name);
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
function setupOnAuthStateChanged(user, app) {
  const auth$1 = auth.getAuth(app);
  auth.onIdTokenChanged(auth$1, (userData) => {
    const userOrPromise = _getCurrentUserState();
    user.value = userData;
    if (Array.isArray(userOrPromise)) {
      userOrPromise[1](user);
    }
  });
}

exports._FirebaseAppInjectionKey = _FirebaseAppInjectionKey;
exports._setInitialUser = _setInitialUser;
exports.authUserMap = authUserMap;
exports.getCurrentUser = getCurrentUser;
exports.getGlobalScope = getGlobalScope;
exports.setupOnAuthStateChanged = setupOnAuthStateChanged;
exports.updateCurrentUserProfile = updateCurrentUserProfile;
exports.useCurrentUser = useCurrentUser;
exports.useFirebaseApp = useFirebaseApp;
