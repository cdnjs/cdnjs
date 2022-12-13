import { getCurrentInstance, inject, effectScope } from 'vue-demi';
import { updateProfile, getAuth, onIdTokenChanged } from 'firebase/auth';
import { getApp } from 'firebase/app';

const _FirebaseAppInjectionKey = Symbol("firebaseApp");
function useFirebaseApp(name) {
  return getCurrentInstance() && inject(
    _FirebaseAppInjectionKey,
    null
  ) || getApp(name);
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
function setupOnAuthStateChanged(user, app) {
  const auth = getAuth(app);
  onIdTokenChanged(auth, (userData) => {
    const userOrPromise = _getCurrentUserState();
    user.value = userData;
    if (Array.isArray(userOrPromise)) {
      userOrPromise[1](user);
    }
  });
}

export { _FirebaseAppInjectionKey as _, authUserMap as a, useCurrentUser as b, getCurrentUser as c, updateCurrentUserProfile as d, _setInitialUser as e, getGlobalScope as g, setupOnAuthStateChanged as s, useFirebaseApp as u };
