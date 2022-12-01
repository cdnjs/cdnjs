'use strict';

const appCheck = require('firebase/app-check');

function VueFireAppCheckServer(adminApp, firebaseApp, {
  ttlMillis = 6048e5
} = {}) {
  appCheck.initializeAppCheck(firebaseApp, {
    provider: new appCheck.CustomProvider({
      getToken: () => adminApp.appCheck().createToken(firebaseApp.options.appId, { ttlMillis }).then(({ token, ttlMillis: expireTimeMillis }) => ({
        token,
        expireTimeMillis
      }))
    }),
    isTokenAutoRefreshEnabled: false
  });
}

exports.VueFireAppCheckServer = VueFireAppCheckServer;
