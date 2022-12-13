import { getAppCheck } from 'firebase-admin/app-check';
import { initializeAppCheck, CustomProvider } from 'firebase/app-check';
import { ref } from 'vue';
import { g as getGlobalScope, a as authUserMap, e as _setInitialUser } from '../shared/vuefire.20dd1d6e.mjs';
import 'vue-demi';
import 'firebase/auth';
import 'firebase/app';

function VueFireAppCheckServer(adminApp, firebaseApp, {
  ttlMillis = 6048e5
} = {}) {
  const appCheck = getAppCheck(adminApp);
  initializeAppCheck(firebaseApp, {
    provider: new CustomProvider({
      getToken: () => appCheck.createToken(firebaseApp.options.appId, { ttlMillis }).then(({ token, ttlMillis: expireTimeMillis }) => ({
        token,
        expireTimeMillis
      }))
    }),
    isTokenAutoRefreshEnabled: false
  });
}

function VueFireAuthServer(firebaseApp, app, userRecord) {
  const user = getGlobalScope(firebaseApp, app).run(
    () => ref(userRecord)
  );
  authUserMap.set(firebaseApp, user);
  _setInitialUser(firebaseApp, user);
}
function createServerUser(userRecord) {
  if (!userRecord)
    return null;
  const user = userRecord.toJSON();
  return {
    ...user,
    tenantId: user.tenantId || null,
    displayName: user.displayName || null,
    photoURL: user.photoURL || null,
    email: user.email || null,
    phoneNumber: user.phoneNumber || null,
    delete: InvalidServerFunction("delete"),
    getIdToken: InvalidServerFunction("getIdToken"),
    getIdTokenResult: InvalidServerFunction("getIdTokenResult"),
    reload: InvalidServerFunction("reload"),
    toJSON: InvalidServerFunction("toJSON"),
    get isAnonymous() {
      return warnInvalidServerGetter("isAnonymous", false);
    },
    get refreshToken() {
      return warnInvalidServerGetter("refreshToken", "");
    },
    get providerId() {
      return warnInvalidServerGetter("providerId", "");
    }
  };
}
function InvalidServerFunction(name) {
  return () => {
    throw new Error(
      `The function User.${name}() is not available on the server.`
    );
  };
}
function warnInvalidServerGetter(name, value) {
  console.warn(
    `The getter User.${name} is not available on the server. It will return ${String(
      value
    )}.`
  );
  return value;
}

export { VueFireAppCheckServer, VueFireAuthServer, createServerUser };
