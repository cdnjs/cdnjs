'use strict';

const appCheck$1 = require('firebase-admin/app-check');
const appCheck = require('firebase/app-check');
const vueDemi = require('vue-demi');
const index = require('../shared/vuefire.3ad3af86.cjs');
const vue = require('vue');
require('firebase/auth');
require('firebase/app');

function VueFireAppCheckServer(app, adminApp, firebaseApp, {
  ttlMillis = 6048e5
} = {}) {
  const token = index.getGlobalScope(firebaseApp, app).run(() => vueDemi.ref());
  app.provide(index.AppCheckTokenInjectSymbol, token);
  const appCheck$2 = appCheck.initializeAppCheck(firebaseApp, {
    provider: new appCheck.CustomProvider({
      getToken: () => appCheck$1.getAppCheck(adminApp).createToken(firebaseApp.options.appId, { ttlMillis }).then(({ token: token2, ttlMillis: expireTimeMillis }) => ({
        token: token2,
        expireTimeMillis
      }))
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
