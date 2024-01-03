import { FirebaseApp } from 'firebase/app';
import * as vue_demi from 'vue-demi';
import { MaybeRefOrGetter, App, Ref } from 'vue-demi';
import * as firebase_database from 'firebase/database';
import { DataSnapshot, DatabaseReference, Query } from 'firebase/database';
import { _ as _RefWithState, a as _Simplify, b as _DataSourceOptions, R as ResetOption, c as _Nullable, d as _FirestoreDataSource } from './shared/vuefire.cc4a8ea4.cjs';
import * as firebase_firestore from 'firebase/firestore';
import { SnapshotOptions, SnapshotListenOptions, FirestoreDataConverter, DocumentData, FirestoreError, CollectionReference, Query as Query$1, DocumentReference, Timestamp, GeoPoint } from 'firebase/firestore';
import * as firebase_auth from 'firebase/auth';
import { User, Dependencies, Auth } from 'firebase/auth';
import { AppCheckOptions, AppCheck } from 'firebase/app-check';
import * as firebase_storage from 'firebase/storage';
import { StorageReference, FullMetadata, SettableMetadata, UploadTaskSnapshot, UploadTask, StorageError, UploadMetadata } from 'firebase/storage';

/**
 * Convert firebase Database snapshot of a ref **that exists** into a bindable data record.
 *
 * @param snapshot
 * @return
 */
declare function createRecordFromDatabaseSnapshot(snapshot: DataSnapshot): VueDatabaseDocumentData<unknown>;
interface DatabaseSnapshotSerializer<T = unknown> {
    (snapshot: DataSnapshot): VueDatabaseDocumentData<T>;
}
interface _RefDatabase<T> extends _RefWithState<T, Error> {
}
/**
 * Type used by default by the `serialize` option.
 */
type VueDatabaseDocumentData<T = unknown> = null | (T & {
    /**
     * id of the document
     */
    readonly id: string;
});
/**
 * Same as VueDatabaseDocumentData but for a query.
 */
type VueDatabaseQueryData<T = unknown> = Array<_Simplify<NonNullable<VueDatabaseDocumentData<T>>>>;

/**
 * Global option type when binding one database reference
 * @internal
 */
interface _DatabaseRefOptions<DataT = unknown> extends _DataSourceOptions<DataT> {
    /**
     * Function to transform snapshots into data. **Make sure to reuse the original serializer to add the object `id`**.
     * See https://vuefire.vuejs.org/guide/global-options.html
     */
    serialize?: DatabaseSnapshotSerializer;
}
/**
 * Global defaults type override options for all database bindings. This type remove make some optional values required.
 * @internal
 */
interface _DatabaseRefOptionsWithDefaults extends _DatabaseRefOptions<unknown> {
    /**
     * @defaultValue `false`
     */
    reset: ResetOption;
    /**
     * @defaultValue `true`
     */
    wait: boolean;
    serialize: DatabaseSnapshotSerializer;
}
declare const DEFAULT_OPTIONS$1: _DatabaseRefOptionsWithDefaults;

/**
 * Options when calling `useDatabaseList()` and `useDatabaseObject()`.
 */
interface UseDatabaseRefOptions<DataT = unknown> extends _DatabaseRefOptions<DataT> {
}

type UseListOptions<DataT = unknown> = UseDatabaseRefOptions<DataT>;
/**
 * Creates a reactive variable connected to the database as an array. Each element in the array will contain an `id`
 * property. Note that if you override the `serialize` option, it should **also set an `id` property** in order for this
 * to work.
 *
 * @param reference - Reference or query to the database
 * @param options - optional options
 */
declare function useDatabaseList<T = unknown>(reference: MaybeRefOrGetter<_Nullable<DatabaseReference | Query>>, options?: UseListOptions<T>): _RefDatabase<VueDatabaseQueryData<T>>;
/**
 * @deprecated use `useDatabaseList()` instead
 */
declare const useList: typeof useDatabaseList;
type UseObjectOptions<DataT = unknown> = UseDatabaseRefOptions<DataT>;
/**
 * Creates a reactive variable connected to the database as an object. If the reference is a primitive, it will be
 * converted to an object containing a `$value` property with the primitive value and an `id` property with the
 * reference's key.
 *
 * @param reference - Reference or query to the database
 * @param options - optional options
 */
declare function useDatabaseObject<T = unknown>(reference: MaybeRefOrGetter<_Nullable<DatabaseReference>>, options?: UseObjectOptions<T>): _RefDatabase<VueDatabaseDocumentData<T> | undefined>;
/**
 * @deprecated use `useDatabaseObject()` instead
 */
declare const useObject: typeof useDatabaseObject;
/**
 * Retrieves the Database instance.
 *
 * @param name - name of the application
 * @returns the Database instance
 */
declare function useDatabase(name?: string): firebase_database.Database;

/**
 * Options when binding a Firestore document or collection.
 */
interface FirestoreRefOptions<TData = unknown> extends _DataSourceOptions<TData> {
    /**
     * The maximum depth to bind nested refs. A nested ref that isn't bound will stay as the ref path while a bound ref
     * will contain the same data as if the ref was bound directly.
     */
    maxRefDepth?: number;
    /**
     * @inheritDoc {SnapshotOptions}
     */
    snapshotOptions?: SnapshotOptions;
    /**
     * @inheritDoc {SnapshotListenOptions}
     */
    snapshotListenOptions?: SnapshotListenOptions;
    /**
     * Default Firestore converter to use with snapshots.
     */
    converter?: FirestoreDataConverter<unknown>;
}
/**
 * Type of the global options for firestore refs. Some values cannot be `undefined`.
 * @internal
 */
interface _FirestoreRefOptionsWithDefaults extends FirestoreRefOptions {
    /**
     * @defaultValue `false`
     */
    reset: ResetOption;
    /**
     * @defaultValue `true`
     */
    wait: boolean;
    /**
     * @defaultValue `2`
     */
    maxRefDepth: number;
    /**
     * Default Firestore converter to use with snapshots. Make sure to reuse the original serializer to add the object id.
     * See https://vuefire.vuejs.org/guide/global-options.html
     */
    converter: FirestoreDataConverter<unknown>;
    /**
     * @defaultValue `{ serverTimestamps: 'estimate' }` to avoid `null` values
     */
    snapshotOptions: SnapshotOptions;
}
/**
 * Global default options
 */
declare const DEFAULT_OPTIONS: _FirestoreRefOptionsWithDefaults;

interface _UseFirestoreRefOptions<TData = unknown> extends FirestoreRefOptions<TData> {
    /**
     * @deprecated: use `.withConverter()` instead
     */
    converter?: FirestoreDataConverter<unknown>;
}
/**
 * Infers the type from a firestore reference. If it is not a reference, it returns the type as is.
 *
 * @internal
 */
type _InferReferenceType<R> = R extends CollectionReference<infer T> | Query$1<infer T> | DocumentReference<infer T> ? T : R;
/**
 * Type used by default by the `firestoreDefaultConverter`.
 */
type VueFirestoreDocumentData<T = DocumentData> = null | (T & {
    /**
     * id of the document
     */
    readonly id: string;
});
type VueFirestoreQueryData<T = DocumentData> = Array<_Simplify<NonNullable<VueFirestoreDocumentData<T>>>>;
/**
 * @internal
 */
interface _RefFirestore<T> extends _RefWithState<T, FirestoreError> {
}

interface UseCollectionOptions<TData = unknown> extends _UseFirestoreRefOptions<TData> {
}

/**
 * Creates a reactive collection (usually an array) of documents from a collection ref or a query from Firestore. Extracts the type of the
 * query or converter.
 *
 * @param collectionRef - query or collection
 * @param options - optional options
 */
declare function useCollection<R extends CollectionReference<unknown> | Query$1<unknown>>(collectionRef: MaybeRefOrGetter<_Nullable<R>>, options?: UseCollectionOptions<_InferReferenceType<R>[]>): _RefFirestore<_InferReferenceType<R>[]>;
/**
 * Creates a reactive collection (usually an array) of documents from a collection ref or a query from Firestore.
 * Accepts a generic to **enforce the type** of the returned Ref. Note you can (and probably should) use
 * `.withConverter()` to have stricter type safe version of a collection reference.
 *
 * @param collectionRef - query or collection
 * @param options - optional options
 */
declare function useCollection<T>(collectionRef: MaybeRefOrGetter<_Nullable<CollectionReference<unknown> | Query$1<unknown>>>, options?: UseCollectionOptions<T[]>): _RefFirestore<VueFirestoreQueryData<T>>;
interface UseDocumentOptions<TData = unknown> extends _UseFirestoreRefOptions<TData> {
}
/**
 * Creates a reactive document from a document ref from Firestore. Automatically extracts the type of the converter or
 * the document.
 *
 * @param documentRef - document reference
 * @param options - optional options
 */
declare function useDocument<R extends DocumentReference<unknown>>(documentRef: MaybeRefOrGetter<_Nullable<R>>, options?: UseDocumentOptions<_InferReferenceType<R>>): _RefFirestore<_InferReferenceType<R> | undefined>;
/**
 * Creates a reactive collection (usually an array) of documents from a collection ref or a query from Firestore.
 * Accepts a generic to **enforce the type** of the returned Ref. Note you can (and probably should) use
 * `.withConverter()` to have stricter type safe version of a collection reference.
 *
 * @param documentRef - query or collection
 * @param options - optional options
 */
declare function useDocument<T>(documentRef: MaybeRefOrGetter<_Nullable<DocumentReference>>, options?: UseDocumentOptions<T>): _RefFirestore<VueFirestoreDocumentData<T> | undefined>;
/**
 * Retrieves the Firestore instance.
 *
 * @param name - name of the application
 * @returns the Firestore instance
 */
declare function useFirestore(name?: string): firebase_firestore.Firestore;

/**
 * Default converter for Firestore data. Can be overridden globally by setting `globalFirestoreOptions.converter`.
 */
declare const firestoreDefaultConverter: FirestoreDataConverter<VueFirestoreDocumentData>;
/**
 * Custom stringifier for [devalue](https://github.com/Rich-Harris/devalue) to support Firestore Timestamp and GeoPoint
 * on SSR.
 */
declare const devalueCustomStringifiers: {
    TimeStamp: (data: unknown) => false | {
        seconds: number;
        nanoseconds: number;
    };
    GeoPoint: (data: unknown) => false | {
        latitude: number;
        longitude: number;
    };
};
/**
 * Custom parsers for [devalue](https://github.com/Rich-Harris/devalue) to support Firestore Timestamp and GeoPoint on
 * SSR.
 */
declare const devalueCustomParsers: {
    TimeStamp: (data: ReturnType<Timestamp['toJSON']>) => Timestamp;
    GeoPoint: (data: ReturnType<GeoPoint['toJSON']>) => GeoPoint;
};

/**
 * Options for the Firebase Database Plugin that enables the Options API such as `$databaseBind` and `$databaseUnbind`.
 */
interface DatabasePluginOptions extends _DatabaseRefOptions {
    /**
     * @deprecated: was largely unused and not very useful. Please open an issue with use cases if you need this.
     */
    bindName?: string;
    /**
     * @deprecated: was largely unused and not very useful. Please open an issue with use cases if you need this.
     */
    unbindName?: string;
}
type VueFirebaseObject = Record<string, Query | DatabaseReference>;
type FirebaseOption = VueFirebaseObject | (() => VueFirebaseObject);
/**
 * Install this plugin if you want to add `$databaseBind` and `$databaseUnbind` functions. Note this plugin is only necessary if
 * you use the Options API. If you **exclusively use the Composition API** (e.g. `useDatabaseObject()` and `useDatabaseList()`), you
 * should not add it.
 *
 * @deprecated Use `VueFire` and `VueFireDatabaseOptionsAPI` with the `modules` option instead.
 *
 * @param app
 * @param pluginOptions
 */
declare function databasePlugin(app: App, pluginOptions?: DatabasePluginOptions, firebaseApp?: FirebaseApp): void;
/**
 * VueFire Database Module to be added to the `VueFire` Vue plugin options. If you **exclusively use the Composition
 * API** (e.g. `useDatabaseObject()` and `useDatabaseList()`), you should not add it.
 *
 * @example
 *
 * ```ts
 * import { createApp } from 'vue'
 * import { VueFire, VueFireDatabaseOptionsAPI } from 'vuefire'
 *
 * const app = createApp(App)
 * app.use(VueFire, {
 *   modules: [VueFireDatabaseOptionsAPI()],
 * })
 * ```
 */
declare function VueFireDatabaseOptionsAPI(pluginOptions?: DatabasePluginOptions): (firebaseApp: FirebaseApp, app: App) => void;
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        /**
         * Binds a reference
         *
         * @param name
         * @param reference
         * @param options
         */
        $databaseBind(name: string, reference: DatabaseReference | Query, options?: _DatabaseRefOptions): Promise<DataSnapshot>;
        /**
         * {@inheritDoc ComponentCustomProperties.$databaseBind}
         * @deprecated Use `$databaseBind` instead.
         */
        $rtdbBind(name: string, reference: DatabaseReference | Query, options?: _DatabaseRefOptions): Promise<DataSnapshot>;
        /**
         * Unbinds a bound reference
         */
        $databaseUnbind: (name: string, reset?: ResetOption) => void;
        /**
         * {@inheritDoc ComponentCustomProperties.$databaseUnbind}
         * @deprecated Use `$databaseUnbind` instead.
         */
        $rtdbUnbind: (name: string, reset?: ResetOption) => void;
        /**
         * Bound database references
         */
        $firebaseRefs: Readonly<Record<string, DatabaseReference>>;
    }
    interface ComponentCustomOptions {
        /**
         * Calls `$databaseBind` at created
         */
        firebase?: FirebaseOption;
    }
}

type VueFirestoreObject = Record<string, _FirestoreDataSource>;
type FirestoreOption = VueFirestoreObject | (() => VueFirestoreObject);
/**
 * Options for the Firebase Database Plugin that enables the Options API such as `$firestoreBind` and
 * `$firestoreUnbind`.
 */
interface FirestorePluginOptions extends FirestoreRefOptions {
    /**
     * @deprecated: was largely unused and not very useful. Please open an issue with use cases if you need this.
     */
    bindName?: string;
    /**
     * @deprecated: was largely unused and not very useful. Please open an issue with use cases if you need this.
     */
    unbindName?: string;
}
/**
 * Install this plugin to add `$firestoreBind` and `$firestoreUnbind` functions. Note this plugin is not necessary if
 * you exclusively use the Composition API (`useDocument()` and `useCollection()`).
 * @deprecated Use `VueFire` and `VueFireFirestoreOptionsAPI` with the `modules` option instead.b
 *
 * @param app
 * @param pluginOptions
 */
declare const firestorePlugin: (app: App, pluginOptions?: FirestorePluginOptions, firebaseApp?: FirebaseApp) => void;
/**
 * VueFire Firestore Module to be added to the `VueFire` Vue plugin options.
 *
 * @example
 *
 * ```ts
 * import { createApp } from 'vue'
 * import { VueFire, VueFireFirestoreOptionsAPI } from 'vuefire'
 *
 * const app = createApp(App)
 * app.use(VueFire, {
 *   modules: [VueFireFirestoreOptionsAPI()],
 * })
 * ```
 */
declare function VueFireFirestoreOptionsAPI(pluginOptions?: FirestorePluginOptions): (firebaseApp: FirebaseApp, app: App) => void;
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        /**
         * Binds a reference
         *
         * @param name
         * @param reference
         * @param options
         */
        $firestoreBind<T = DocumentData>(name: string, reference: Query$1<T> | CollectionReference<T>, options?: FirestoreRefOptions): Promise<T[]>;
        $firestoreBind<T = DocumentData>(name: string, reference: DocumentReference<T>, options?: FirestoreRefOptions): Promise<T>;
        /**
         * Unbinds a bound reference
         */
        $firestoreUnbind: (name: string, reset?: ResetOption) => void;
        /**
         * Bound firestore references
         */
        $firestoreRefs: Readonly<Record<string, DocumentReference<unknown> | CollectionReference<unknown>>>;
    }
    interface ComponentCustomOptions {
        /**
         * Calls `$firestoreBind` before mounting the component
         */
        firestore?: FirestoreOption;
    }
}

/**
 * Gets the firebase app instance.
 *
 * @param name - optional firebase app name
 * @returns the firebase app
 */
declare function useFirebaseApp(name?: string): FirebaseApp;

/**
 * Returns a reactive variable of the currently authenticated user in the firebase app. The ref is null if no user is
 * authenticated or when the user logs out. The ref is undefined until the user is initially loaded.
 * @param name - name of the application
 */
declare function useCurrentUser(name?: string): Ref<_Nullable<User>>;
/**
 * Helper that returns a computed boolean that becomes `true` as soon as the current user is no longer `undefined`. Note
 * this doesn't ensure the user is logged in, only if the initial signing process has run.
 *
 * @param name - name of the application
 */
declare function useIsCurrentUserLoaded(name?: string): vue_demi.ComputedRef<boolean>;
/**
 * Updates the current user profile and updates the current user state. This function internally calls `updateProfile()`
 * from 'firebase/auth' and then updates the current user state.
 *
 * @param profile - the new profile information
 */
declare function updateCurrentUserProfile(profile: {
    displayName?: _Nullable<string>;
    photoURL?: _Nullable<string>;
}): Promise<void>;
/**
 * Returns a promise that resolves the current user once the user is loaded. Must be called after the firebase app is
 * initialized.
 * @param name - name of the firebase application
 */
declare function getCurrentUser(name?: string): Promise<_Nullable<User>>;

/**
 * Options for VueFire Auth module.
 */
interface VueFireAuthOptions {
    /**
     * Initial value of the user. Used during SSR.
     */
    initialUser?: _Nullable<User>;
    /**
     * Options to pass to `initializeAuth()`.
     */
    dependencies: Dependencies;
}
/**
 * VueFire Auth Module to be added to the `VueFire` Vue plugin options. This calls the `VueFireAuthWithDependencies()`
 * with **all** the dependencies, increasing bundle size. Consider using `VueFireAuthWithDependencies()` instead to
 * better control the bundle size.
 *
 * @see https://firebase.google.com/docs/auth/web/custom-dependencies
 *
 * @example
 *
 *```ts
 *import { createApp } from 'vue'
 *import { VueFire, VueFireAuth } from 'vuefire'
 *
 *const app = createApp(App)
 *app.use(VueFire, {
 *  modules: [VueFireAuth()],
 *})
 *```
 *
 * @param initialUser - initial value of the user. used for SSR
 */
declare function VueFireAuth(initialUser?: _Nullable<User>): VueFireModule;
/**
 * Key to be used to inject the auth instance into components. It allows avoiding to call `getAuth()`, which isn't tree
 * shakable.
 * @internal
 */
declare const _VueFireAuthKey: unique symbol;
/**
 * Options for VueFire Auth module when passing the auth instance directly.
 */
interface VueFireAuthOptionsFromAuth extends Pick<VueFireAuthOptions, 'initialUser'> {
    /**
     * Auth instance to use.
     */
    auth: Auth;
}
/**
 * VueFire Auth Module to be added to the `VueFire` Vue plugin options. It accepts an auth instance rather than the
 * dependencies. It allows manually calling emulators and other advanced use cases. Prefer using
 * `VueFireAuthWithDependencies()` and `VueFireAuth()` for most use cases.
 *
 * @param options - auth instance and initial user
 */
declare function VueFireAuthOptionsFromAuth({ auth, initialUser, }: VueFireAuthOptionsFromAuth): VueFireModule;
/**
 * VueFire Auth Module to be added to the `VueFire` Vue plugin options. It accepts dependencies to pass to
 * `initializeAuth()` to better control the bundle size.
 *
 * @param options - user and options to pass to `initializeAuth()`.
 */
declare function VueFireAuthWithDependencies({ dependencies, initialUser, }: VueFireAuthOptions): VueFireModule;
/**
 * initializes auth for both the server and client.
 * @internal
 */
declare function _VueFireAuthInit(firebaseApp: FirebaseApp, app: App, initialUser: _Nullable<User>, dependencies?: Dependencies, auth?: Auth): readonly [vue_demi.Ref<{
    readonly emailVerified: boolean;
    readonly isAnonymous: boolean;
    readonly metadata: {
        readonly creationTime?: string | undefined;
        readonly lastSignInTime?: string | undefined;
    };
    readonly providerData: {
        readonly displayName: string | null;
        readonly email: string | null;
        readonly phoneNumber: string | null;
        readonly photoURL: string | null;
        readonly providerId: string;
        readonly uid: string;
    }[];
    readonly refreshToken: string;
    readonly tenantId: string | null;
    delete: () => Promise<void>;
    getIdToken: (forceRefresh?: boolean | undefined) => Promise<string>;
    getIdTokenResult: (forceRefresh?: boolean | undefined) => Promise<firebase_auth.IdTokenResult>;
    reload: () => Promise<void>;
    toJSON: () => object;
    readonly displayName: string | null;
    readonly email: string | null;
    readonly phoneNumber: string | null;
    readonly photoURL: string | null;
    readonly providerId: string;
    readonly uid: string;
} | null | undefined>, Auth];
/**
 * Retrieves the Firebase Auth instance. **Returns `null` on the server**. When using this function on the client in
 * TypeScript, you can force the type with `useFirebaseAuth()!`.
 *
 * @returns the Auth instance
 */
declare function useFirebaseAuth(): Auth | null;

/**
 * Allows awaiting for all pending data sources. Useful to wait for SSR
 *
 * @param app - the firebase app
 * @returns - a Promise that resolves with an array of all the resolved pending promises
 */
declare function usePendingPromises(app?: FirebaseApp): Promise<(readonly [string, unknown])[]>;

interface SSRStore {
    f: Record<string, unknown>;
    r: Record<string, unknown>;
    s: Record<string, string>;
    u: Record<string, unknown>;
}
/**
 * Allows getting the initial state set during SSR on the client.
 *
 * @param initialState - the initial state to set for the firebase app during SSR. Pass undefined to not set it
 * @param firebaseApp - the firebase app to get the initial state for
 * @returns the initial states for the current firebaseApp
 */
declare function useSSRInitialState(initialState: SSRStore | undefined, firebaseApp: FirebaseApp): SSRStore;

/**
 * The current app-check token as a `Ref`. Note this ref is always undefined on the server.
 */
declare function useAppCheckToken(): Ref<string | undefined>;
interface VueFireAppCheckOptions extends AppCheckOptions {
    /**
     * Setups the debug token global. See https://firebase.google.com/docs/app-check/web/debug-provider. Note you should
     * set to false in production (or not set it at all). It can be set to a string to force a specific debug token.
     */
    debug?: boolean | string;
}
/**
 * VueFire AppCheck Module to be added to the `VueFire` Vue plugin options. This module **is client only** and shouldn't be added on server.
 *
 * @example
 *
 * ```ts
 * import { createApp } from 'vue'
 * import { VueFire, VueFireAppCheck } from 'vuefire'
 *
 * const app = createApp(App)
 * app.use(VueFire, {
 *   modules: [VueFireAppCheck()],
 * })
 * ```
 */
declare function VueFireAppCheck(options: VueFireAppCheckOptions): (firebaseApp: FirebaseApp, app: App) => void;
/**
 * Retrieves the Firebase App Check instance.
 *
 * @param name - name of the application
 */
declare function useAppCheck(name?: string): AppCheck;

/**
 * Retrieves the Storage instance.
 *
 * @param name - name of the application
 * @returns the Database instance
 */
declare function useFirebaseStorage(name?: string): firebase_storage.FirebaseStorage;
/**
 * Retrieves a reactive download URL of a `StorageReference`. Updates automatically if the `StorageReference` changes.
 *
 * @param storageRef - StorageReference
 */
declare function useStorageFileUrl(storageRef: MaybeRefOrGetter<_Nullable<StorageReference>>): {
    url: vue_demi.Ref<string | null | undefined>;
    refresh: () => Promise<string | null>;
    promise: vue_demi.ShallowRef<Promise<string | null>>;
};
/**
 * Returns a reactive version of the metadata of a `StorageReference`. Updates automatically if the `StorageReference`
 * changes.
 *
 * @param storageRef - StorageReference
 */
declare function useStorageFileMetadata(storageRef: MaybeRefOrGetter<_Nullable<StorageReference>>): {
    metadata: vue_demi.ShallowRef<FullMetadata | null | undefined>;
    update: (newMetadata: SettableMetadata) => Promise<FullMetadata | null>;
    refresh: () => Promise<FullMetadata | null>;
    promise: vue_demi.ShallowRef<Promise<FullMetadata | null>>;
};
/**
 * Reactive information (url, metadata) of a `StorageReference`. Allows updating and deleting the storage object.
 *
 * @param storageRef - StorageReference
 */
declare function useStorageFile(storageRef: MaybeRefOrGetter<_Nullable<StorageReference>>): {
    url: vue_demi.Ref<string | null | undefined>;
    metadata: vue_demi.ShallowRef<FullMetadata | null | undefined>;
    snapshot: vue_demi.ShallowRef<UploadTaskSnapshot | null | undefined>;
    uploadTask: vue_demi.ShallowRef<UploadTask | null | undefined>;
    uploadError: vue_demi.ShallowRef<StorageError | null | undefined>;
    uploadProgress: vue_demi.ComputedRef<number | null>;
    upload: (newData: Blob | Uint8Array | ArrayBuffer, newMetadata?: UploadMetadata) => Promise<unknown> | undefined;
    updateMetadata: (newMetadata: SettableMetadata) => Promise<FullMetadata | null>;
    refresh: () => Promise<[string | null, FullMetadata | null]>;
};
/**
 * @deprecated use `useFirebaseStorage()` instead
 */
declare const useStorage: typeof useFirebaseStorage;
/**
 * @deprecated use `useStorageFileUrl()` instead
 */
declare const useStorageUrl: typeof useStorageFileUrl;
/**
 * @deprecated use `useStorageFileMetadata()` instead
 */
declare const useStorageMetadata: typeof useStorageFileMetadata;
/**
 * @deprecated use `useStorageFile()` instead
 */
declare const useStorageObject: typeof useStorageFile;

/**
 * @module vuefire
 */

/**
 * Options for VueFire Vue plugin.
 */
interface VueFireOptions {
    /**
     * The firebase app used by VueFire and associated with the different modules.
     */
    firebaseApp: FirebaseApp;
    /**
     * Array of VueFire modules that should be added to the application. e.g. `[VueFireAuth, VueFireDatabase]`. Remember
     * to import them from `vuefire`.
     */
    modules?: VueFireModule[];
}
/**
 * A VueFire module that can be passed to the VueFire Vue plugin in the `modules` option.
 */
interface VueFireModule {
    (firebaseApp: FirebaseApp, app: App): void;
}
/**
 * VueFire Vue plugin.
 */
declare function VueFire(app: App, { firebaseApp, modules }: VueFireOptions): void;

export { type DatabasePluginOptions, type DatabaseSnapshotSerializer, type FirebaseOption, type FirestoreOption, type FirestorePluginOptions, type UseCollectionOptions, type UseDatabaseRefOptions, type UseDocumentOptions, type UseListOptions, type UseObjectOptions, type VueDatabaseDocumentData, type VueDatabaseQueryData, VueFire, VueFireAppCheck, type VueFireAppCheckOptions, VueFireAuth, type VueFireAuthOptions, VueFireAuthOptionsFromAuth, VueFireAuthWithDependencies, VueFireDatabaseOptionsAPI, VueFireFirestoreOptionsAPI, type VueFireModule, type VueFireOptions, type VueFirebaseObject, type VueFirestoreDocumentData, type VueFirestoreObject, type VueFirestoreQueryData, type _RefDatabase, type _RefFirestore, _VueFireAuthInit, _VueFireAuthKey, createRecordFromDatabaseSnapshot as databaseDefaultSerializer, databasePlugin, devalueCustomParsers, devalueCustomStringifiers, firestoreDefaultConverter, firestorePlugin, getCurrentUser, DEFAULT_OPTIONS$1 as globalDatabaseOptions, DEFAULT_OPTIONS as globalFirestoreOptions, databasePlugin as rtdbPlugin, updateCurrentUserProfile, useAppCheck, useAppCheckToken, useCollection, useCurrentUser, useDatabase, useDatabaseList, useDatabaseObject, useDocument, useFirebaseApp, useFirebaseAuth, useFirebaseStorage, useFirestore, useIsCurrentUserLoaded, useList, useObject, usePendingPromises, useSSRInitialState, useStorage, useStorageFile, useStorageFileMetadata, useStorageFileUrl, useStorageMetadata, useStorageObject, useStorageUrl };
