import { getAppCheck } from 'firebase-admin/app-check';
import { initializeAppCheck, CustomProvider } from 'firebase/app-check';
import { ref } from 'vue-demi';
import { m as getGlobalScope, A as AppCheckTokenInjectSymbol, z as AppCheckMap, o as authUserMap, B as _setInitialUser } from '../shared/vuefire.9aba3ce1.mjs';
import { ref as ref$1 } from 'vue';
import { getAuth } from 'firebase-admin/auth';
import { getApps, initializeApp, cert, applicationDefault } from 'firebase-admin/app';
import 'firebase/auth';
import 'firebase/app';

function log(...args) {
  const [typeOrLog, ...rest] = args;
  if (isLogType(typeOrLog)) {
    console[typeOrLog]("[vuefire]:", ...rest);
  } else {
    console.log("[vuefire]:", ...args);
  }
}
function isLogType(logType) {
  return logType === "debug" || logType === "info" || logType === "warn" || logType === "error" || logType === "trace";
}

function VueFireAppCheckServer(app, adminApp, firebaseApp, {
  // default to 1 week
  ttlMillis = 6048e5
} = {}) {
  const providedToken = getGlobalScope(firebaseApp, app).run(
    () => ref()
  );
  app.provide(AppCheckTokenInjectSymbol, providedToken);
  if (AppCheckMap.has(firebaseApp)) {
    log("info", "AppCheck already initialized, skipping server initialization.");
    return;
  }
  console.log("[VueFire]: Initializing AppCheck on the server");
  let currentToken;
  const appCheck = initializeAppCheck(firebaseApp, {
    provider: new CustomProvider({
      getToken: () => {
        if (currentToken) {
          log("info", "Using cached AppCheck token on server.");
          return Promise.resolve(currentToken);
        }
        log("info", "Getting Admin AppCheck");
        const adminAppCheck = getAppCheck(adminApp);
        log("info", `Creating token for app ${firebaseApp.options.appId}.`);
        return adminAppCheck.createToken(firebaseApp.options.appId, { ttlMillis }).then(({ token, ttlMillis: expireTimeMillis }) => {
          log(
            "info",
            `Got AppCheck token from the server, expires in ${expireTimeMillis}ms.`
          );
          setTimeout(() => {
            currentToken = void 0;
          }, expireTimeMillis);
          currentToken = {
            token,
            expireTimeMillis
          };
          return currentToken;
        }).catch((reason) => {
          log(
            "error",
            "Error getting AppCheck token from the server:",
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

function isFirebaseError(err) {
  return err != null && "code" in err;
}

const AUTH_COOKIE_NAME = "__session";
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
async function decodeSessionCookie(sessionCookie, adminApp) {
  if (sessionCookie) {
    const adminAuth = getAuth(adminApp);
    try {
      return await adminAuth.verifySessionCookie(
        sessionCookie
        /** checkRevoked */
      );
    } catch (err) {
      if (isFirebaseError(err) && err.code === "auth/id-token-expired") {
        log("info", "Token expired, client must revalidate");
      } else {
        log("error", "Unknown Error verifying session cookie -", err);
      }
    }
  }
  return null;
}
const decodeUserToken = decodeSessionCookie;

const FIREBASE_ADMIN_APP_NAME = "vuefire-admin";
function getAdminApp(firebaseAdminOptions, name = FIREBASE_ADMIN_APP_NAME) {
  log("debug", `\u{1F4AD} Getting admin app "${name}`);
  if (!getApps().find((app) => app.name === name)) {
    log("debug", `\u{1F536} Initializing admin app "${name}"`);
    const {
      // these can be set by the user on other platforms
      FIREBASE_PROJECT_ID,
      FIREBASE_CLIENT_EMAIL,
      FIREBASE_PRIVATE_KEY,
      // set on firebase cloud functions
      FIREBASE_CONFIG,
      // in cloud functions, we can auto initialize
      FUNCTION_NAME,
      GOOGLE_APPLICATION_CREDENTIALS
    } = process.env;
    log("debug", "Detected environment variables", {
      FIREBASE_PROJECT_ID,
      FIREBASE_CLIENT_EMAIL,
      FIREBASE_PRIVATE_KEY: FIREBASE_PRIVATE_KEY && "****",
      FIREBASE_CONFIG,
      FUNCTION_NAME,
      GOOGLE_APPLICATION_CREDENTIALS
    });
    if (FIREBASE_CONFIG || FUNCTION_NAME) {
      log("debug", `using FIREBASE_CONFIG env variable for ${FUNCTION_NAME}`);
      initializeApp(void 0, name);
    } else {
      let credential;
      if (GOOGLE_APPLICATION_CREDENTIALS) {
        if (typeof GOOGLE_APPLICATION_CREDENTIALS === "string" && // ensure it's an object
        GOOGLE_APPLICATION_CREDENTIALS[0] === "{") {
          log(
            "debug",
            "Parsing GOOGLE_APPLICATION_CREDENTIALS env variable as JSON"
          );
          const certObject = JSON.parse(GOOGLE_APPLICATION_CREDENTIALS);
          certObject.private_key = certObject.private_key?.replace(/\\n/g, "\n");
          if (!certObject.private_key) {
            throw new Error(
              "private_key is missing in GOOGLE_APPLICATION_CREDENTIALS json"
            );
          }
          credential = cert(certObject);
        } else {
          log(
            "debug",
            "using GOOGLE_APPLICATION_CREDENTIALS env variable as a file path"
          );
          credential = cert(GOOGLE_APPLICATION_CREDENTIALS);
        }
      } else if (FIREBASE_PRIVATE_KEY) {
        log("debug", "using FIREBASE_PRIVATE_KEY env variable");
        credential = cert({
          projectId: FIREBASE_PROJECT_ID,
          clientEmail: FIREBASE_CLIENT_EMAIL,
          // replace `\` and `n` character pairs w/ single `\n` character
          privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
        });
      } else {
        log("debug", "using applicationDefault()");
        credential = applicationDefault();
      }
      initializeApp(
        {
          // TODO: is this really going to be used?
          ...firebaseAdminOptions,
          credential
        },
        name
      );
    }
  }
  return getApps().find((app) => app.name === name);
}

export { AUTH_COOKIE_NAME, VueFireAppCheckServer, VueFireAuthServer, createServerUser, decodeSessionCookie, decodeUserToken, getAdminApp, isFirebaseError };
