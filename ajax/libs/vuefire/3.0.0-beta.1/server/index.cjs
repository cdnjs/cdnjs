'use strict';

const appCheck = require('firebase-admin/app-check');
const appCheck$1 = require('firebase/app-check');

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

exports.VueFireAppCheckServer = VueFireAppCheckServer;
