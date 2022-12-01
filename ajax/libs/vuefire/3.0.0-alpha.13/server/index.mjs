import { initializeAppCheck, CustomProvider } from 'firebase/app-check';

function VueFireAppCheckServer(adminApp, firebaseApp, {
  ttlMillis = 6048e5
} = {}) {
  initializeAppCheck(firebaseApp, {
    provider: new CustomProvider({
      getToken: () => adminApp.appCheck().createToken(firebaseApp.options.appId, { ttlMillis }).then(({ token, ttlMillis: expireTimeMillis }) => ({
        token,
        expireTimeMillis
      }))
    }),
    isTokenAutoRefreshEnabled: false
  });
}

export { VueFireAppCheckServer };
