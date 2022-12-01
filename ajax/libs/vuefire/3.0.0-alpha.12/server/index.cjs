'use strict';

const appCheck = require('firebase/app-check');

function VueFireAppCheckServer(adminApp, appId, {
  ttlMillis = 6048e5
} = {}) {
  appCheck.initializeAppCheck(void 0, {
    provider: new appCheck.CustomProvider({
      getToken: () => adminApp.appCheck().createToken(appId, { ttlMillis }).then(({ token, ttlMillis: expireTimeMillis }) => ({
        token,
        expireTimeMillis
      }))
    }),
    isTokenAutoRefreshEnabled: false
  });
}

exports.VueFireAppCheckServer = VueFireAppCheckServer;
