'use strict';

const appCheck$1 = require('firebase-admin/app-check');
const appCheck = require('firebase/app-check');
const vueDemi = require('vue-demi');
const index = require('../shared/vuefire.ab2a0e67.cjs');
const vue = require('vue');
require('firebase/auth');
require('firebase/app');

function VueFireAppCheckServer(app, adminApp, firebaseApp, {
  // default to 1 week
  ttlMillis = 6048e5
} = {}) {
  const token = index.getGlobalScope(firebaseApp, app).run(() => vueDemi.ref());
  app.provide(index.AppCheckTokenInjectSymbol, token);
  console.log("[VueFire]: Initializing AppCheck on the server");
  const appCheck$2 = appCheck.initializeAppCheck(firebaseApp, {
    provider: new appCheck.CustomProvider({
      getToken: () => {
        console.log("[VueFire]: Getting Admin AppCheck");
        const adminAppCheck = appCheck$1.getAppCheck(adminApp);
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
  index.AppCheckMap.set(firebaseApp, appCheck$2);
}

function VueFireAuthServer(firebaseApp, app, userRecord) {
  const user = index.getGlobalScope(firebaseApp, app).run(
    () => vue.ref(userRecord)
  );
  index.authUserMap.set(firebaseApp, user);
  index._setInitialUser(firebaseApp, user);
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

exports.VueFireAppCheckServer = VueFireAppCheckServer;
exports.VueFireAuthServer = VueFireAuthServer;
exports.createServerUser = createServerUser;
