import { getAppCheck } from 'firebase-admin/app-check';
import { initializeAppCheck, CustomProvider } from 'firebase/app-check';

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

export { VueFireAppCheckServer };
