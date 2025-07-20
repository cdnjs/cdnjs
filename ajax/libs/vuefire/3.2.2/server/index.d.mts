import * as firebase_admin_app from 'firebase-admin/app';
import { AppOptions, App as App$1 } from 'firebase-admin/app';
import { FirebaseApp } from 'firebase/app';
import { App } from 'vue-demi';
import { User } from 'firebase/auth';
import { UserRecord, DecodedIdToken } from 'firebase-admin/auth';
import { App as App$2 } from 'vue';
import { c as _Nullable } from '../shared/vuefire.cc4a8ea4.mjs';
import { FirebaseError } from 'firebase-admin';
import 'firebase/firestore';

/**
 * Setups a Firebase Admin App or reuses it
 *
 * @param firebaseAdminOptions - options to pass to the admin app
 * @param name - name of the app
 * @experimental this is experimental and may change in the future
 */
declare function ensureAdminApp(firebaseAdminOptions?: Omit<AppOptions, 'credential'>, name?: string): firebase_admin_app.App;

/**
 * Adds AppCheck using the Firebase Admin SDK. This is necessary on the Server if you have configured AppCheck on the
 * client.
 *
 * @param adminApp - firebase-admin app
 * @param firebaseApp - firebase/app initializeApp()
 * @param param2 options
 */
declare function VueFireAppCheckServer(app: App, adminApp: App$1, firebaseApp: FirebaseApp, { ttlMillis, }?: {
    ttlMillis?: number;
}): void;

declare const AUTH_COOKIE_NAME = "__session";
/**
 * Initializes the auth related data on the server.
 * @experimental This API is experimental and may change in future releases.
 */
declare function VueFireAuthServer(firebaseApp: FirebaseApp, app: App$2<unknown>, initialUser: _Nullable<User>): void;
/**
 * Creates a user object that is compatible with the client but will throw errors when its functions are used as they
 * shouldn't be called within in the server.
 *
 * @param userRecord - user data from firebase-admin
 */
declare function createServerUser(userRecord: _Nullable<UserRecord>): _Nullable<User>;
/**
 * Verifies a cookie token and returns the corresponding decoded token or null if the token is invalid or inexistent.
 * This token contains the user's uid.
 *
 * @param sessionCookie - token parsed from the cookie
 * @param adminApp - Firebase Admin App
 */
declare function decodeSessionCookie(sessionCookie: string | undefined, adminApp: App$1): Promise<DecodedIdToken | null>;
/**
 * @deprecated Use `decodeSessionCookie` instead.
 */
declare const decodeUserToken: typeof decodeSessionCookie;

/**
 * Ensure that the error is a FirebaseError
 *
 * @param err - error to check
 */
declare function isFirebaseError(err: any): err is FirebaseError;

/**
 * @deprecated use `ensureAdminApp` instead.
 */
declare const getAdminApp: typeof ensureAdminApp;

export { AUTH_COOKIE_NAME, VueFireAppCheckServer, VueFireAuthServer, createServerUser, decodeSessionCookie, decodeUserToken, ensureAdminApp, getAdminApp, isFirebaseError };
