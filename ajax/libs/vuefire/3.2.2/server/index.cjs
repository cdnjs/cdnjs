'use strict';

const app = require('firebase-admin/app');
const consola = require('consola');
const appCheck$1 = require('firebase-admin/app-check');
const appCheck = require('firebase/app-check');
const vueDemi = require('vue-demi');
const index = require('../shared/vuefire.aabb1729.cjs');
const vue = require('vue');
const auth = require('firebase-admin/auth');
require('firebase/auth');
require('firebase/app');

const vuefireConsola = consola.consola.withTag("vuefire");

const FIREBASE_ADMIN_APP_NAME = "vuefire-admin";
function ensureAdminApp(firebaseAdminOptions, name = FIREBASE_ADMIN_APP_NAME) {
  vuefireConsola.debug(`Checking if admin app "${name}" exists...`);
  if (!app.getApps().find((app) => app.name === name)) {
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
    vuefireConsola.debug("Detected environment variables", {
      FIREBASE_PROJECT_ID,
      FIREBASE_CLIENT_EMAIL,
      FIREBASE_PRIVATE_KEY: FIREBASE_PRIVATE_KEY && "****",
      FIREBASE_CONFIG,
      FUNCTION_NAME,
      GOOGLE_APPLICATION_CREDENTIALS
    });
    if (FIREBASE_CONFIG || FUNCTION_NAME) {
      vuefireConsola.debug(`Using FIREBASE_CONFIG env variable for ${FUNCTION_NAME}`);
      app.initializeApp(void 0, name);
    } else {
      let credential;
      if (GOOGLE_APPLICATION_CREDENTIALS) {
        if (typeof GOOGLE_APPLICATION_CREDENTIALS === "string" && // ensure it's an object
        GOOGLE_APPLICATION_CREDENTIALS[0] === "{") {
          vuefireConsola.debug(
            "Parsing GOOGLE_APPLICATION_CREDENTIALS env variable as JSON"
          );
          const certObject = JSON.parse(GOOGLE_APPLICATION_CREDENTIALS);
          certObject.private_key = certObject.private_key?.replace(/\\n/g, "\n");
          if (!certObject.private_key) {
            throw new Error(
              "private_key is missing in GOOGLE_APPLICATION_CREDENTIALS json"
            );
          }
          credential = app.cert(certObject);
        } else {
          vuefireConsola.debug(
            "using GOOGLE_APPLICATION_CREDENTIALS env variable as a file path"
          );
          credential = app.cert(GOOGLE_APPLICATION_CREDENTIALS);
        }
      } else if (FIREBASE_PRIVATE_KEY) {
        vuefireConsola.debug("Using FIREBASE_PRIVATE_KEY env variable");
        credential = app.cert({
          projectId: FIREBASE_PROJECT_ID,
          clientEmail: FIREBASE_CLIENT_EMAIL,
          // replace `\` and `n` character pairs w/ single `\n` character
          privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
        });
      } else {
        vuefireConsola.debug("Using applicationDefault()");
        credential = app.applicationDefault();
      }
      vuefireConsola.debug(
        `Initializing Admin App "${name}" with options:`,
        firebaseAdminOptions
      );
      app.initializeApp(
        {
          // TODO: is this really going to be used?
          ...firebaseAdminOptions,
          credential
        },
        name
      );
    }
  }
  return app.getApps().find((app) => app.name === name);
}

function VueFireAppCheckServer(app, adminApp, firebaseApp, {
  // default to 1 week
  ttlMillis = 6048e5
} = {}) {
  const providedToken = index.getGlobalScope(firebaseApp, app).run(
    () => vueDemi.ref()
  );
  app.provide(index.AppCheckTokenInjectSymbol, providedToken);
  if (index.AppCheckMap.has(firebaseApp)) {
    vuefireConsola.debug(
      "AppCheck already initialized, skipping server initialization."
    );
    return;
  }
  vuefireConsola.debug(
    `Initializing AppCheck on the server for app "${firebaseApp.name}".`
  );
  let currentToken;
  const appCheck$2 = appCheck.initializeAppCheck(firebaseApp, {
    provider: new appCheck.CustomProvider({
      getToken: () => {
        if (currentToken) {
          vuefireConsola.debug("Using cached AppCheck token on server.");
          return Promise.resolve(currentToken);
        }
        vuefireConsola.debug("Getting Admin AppCheck");
        const adminAppCheck = appCheck$1.getAppCheck(adminApp);
        vuefireConsola.debug(`Creating token for app ${firebaseApp.options.appId}.`);
        return adminAppCheck.createToken(firebaseApp.options.appId, { ttlMillis }).then(({ token, ttlMillis: expireTimeMillis }) => {
          vuefireConsola.debug(
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
          vuefireConsola.error(
            "Error getting AppCheck token from the server:",
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

function isFirebaseError(err) {
  return err != null && "code" in err;
}

const AUTH_COOKIE_NAME = "__session";
function VueFireAuthServer(firebaseApp, app, initialUser) {
  const user = index.getGlobalScope(firebaseApp, app).run(
    () => vue.ref(initialUser)
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
async function decodeSessionCookie(sessionCookie, adminApp) {
  if (sessionCookie) {
    const adminAuth = auth.getAuth(adminApp);
    try {
      vuefireConsola.debug("Verifying session cookie");
      return await adminAuth.verifySessionCookie(
        sessionCookie
        /** checkRevoked */
      );
    } catch (err) {
      if (isFirebaseError(err) && err.code === "auth/id-token-expired") {
        vuefireConsola.info("Token expired, client must revalidate");
      } else {
        vuefireConsola.error("Unknown Error verifying session cookie", err);
      }
    }
  }
  return null;
}
const decodeUserToken = decodeSessionCookie;

const getAdminApp = ensureAdminApp;

exports.AUTH_COOKIE_NAME = AUTH_COOKIE_NAME;
exports.VueFireAppCheckServer = VueFireAppCheckServer;
exports.VueFireAuthServer = VueFireAuthServer;
exports.createServerUser = createServerUser;
exports.decodeSessionCookie = decodeSessionCookie;
exports.decodeUserToken = decodeUserToken;
exports.ensureAdminApp = ensureAdminApp;
exports.getAdminApp = getAdminApp;
exports.isFirebaseError = isFirebaseError;
