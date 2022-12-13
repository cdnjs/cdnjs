'use strict';

const appCheck = require('firebase-admin/app-check');
const appCheck$1 = require('firebase/app-check');
const vue = require('vue');
const user = require('../shared/vuefire.961c7f41.cjs');
require('vue-demi');
require('firebase/auth');
require('firebase/app');

function VueFireAppCheckServer(adminApp, firebaseApp, {
  ttlMillis = 6048e5
} = {}) {
  const appCheck$2 = appCheck.getAppCheck(adminApp);
  appCheck$1.initializeAppCheck(firebaseApp, {
    provider: new appCheck$1.CustomProvider({
      getToken: () => appCheck$2.createToken(firebaseApp.options.appId, { ttlMillis }).then(({ token, ttlMillis: expireTimeMillis }) => ({
        token,
        expireTimeMillis
      }))
    }),
    isTokenAutoRefreshEnabled: false
  });
}

function VueFireAuthServer(firebaseApp, app, userRecord) {
  const user$1 = user.getGlobalScope(firebaseApp, app).run(
    () => vue.ref(userRecord)
  );
  user.authUserMap.set(firebaseApp, user$1);
  user._setInitialUser(firebaseApp, user$1);
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
