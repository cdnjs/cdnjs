import { initializeAppCheck, CustomProvider } from 'firebase/app-check';

function VueFireAppCheckServer(adminApp, appId, {
  ttlMillis = 6048e5
} = {}) {
  initializeAppCheck(void 0, {
    provider: new CustomProvider({
      getToken: () => adminApp.appCheck().createToken(appId, { ttlMillis }).then(({ token, ttlMillis: expireTimeMillis }) => ({
        token,
        expireTimeMillis
      }))
    }),
    isTokenAutoRefreshEnabled: false
  });
}

export { VueFireAppCheckServer };
