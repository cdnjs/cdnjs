import { getAppCheck } from 'firebase-admin/app-check';
import { initializeAppCheck, CustomProvider } from 'firebase/app-check';
import { ref } from 'vue-demi';
import { m as getGlobalScope, A as AppCheckTokenInjectSymbol, z as AppCheckMap, o as authUserMap, B as _setInitialUser } from '../shared/vuefire.7f889637.mjs';
import { ref as ref$1 } from 'vue';
import 'firebase/auth';
import 'firebase/app';

function VueFireAppCheckServer(app, adminApp, firebaseApp, {
  // default to 1 week
  ttlMillis = 6048e5
} = {}) {
  const token = getGlobalScope(firebaseApp, app).run(() => ref());
  app.provide(AppCheckTokenInjectSymbol, token);
  console.log("[VueFire]: Initializing AppCheck on the server");
  const appCheck = initializeAppCheck(firebaseApp, {
    provider: new CustomProvider({
      getToken: () => {
        console.log("[VueFire]: Getting Admin AppCheck");
        const adminAppCheck = getAppCheck(adminApp);
        console.log(
          `[VueFire]: Getting creating token for app ${firebaseApp.options.appId}.`
        );
        return adminAppCheck.createToken(firebaseApp.options.appId, { ttlMillis }).then(({ token: token2, ttlMillis: expireTimeMillis }) => {
          console.log(
            `[VueFire]: Got AppCheck token from the server: ${token2}`
          );
          return {
            token: token2,
            expireTimeMillis
          };
        }).catch((reason) => {
          console.error(
            "[VueFire]: Error getting AppCheck token from the server:",
            reason
          );
          throw reason;
        });
      }
    }),
    isTokenAutoRefreshEnabled: false
  });
  AppCheckMap.set(firebaseApp, appCheck);
}

function VueFireAuthServer(firebaseApp, app, userRecord) {
  const user = getGlobalScope(firebaseApp, app).run(
    () => ref$1(userRecord)
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
    // these seem to be type mismatches within firebase source code
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
