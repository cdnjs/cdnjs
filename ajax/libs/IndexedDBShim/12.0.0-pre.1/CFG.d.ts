export default CFG;
/**
 * <T>
 */
export type ValueOf<T> = T[keyof T];
export type FSApi = {
    unlink: (path: string, cb: import('fs').NoParamCallback) => void;
};
export type ConfigValues = {
    DEBUG: boolean;
    cacheDatabaseInstances: boolean;
    autoName: boolean;
    fullIDLSupport: boolean;
    checkOrigin: boolean;
    cursorPreloadPackSize: number;
    UnicodeIDStart: string;
    UnicodeIDContinue: string;
    registerSCA: (preset: import('typeson').Preset) => import('typeson').Preset;
    avoidAutoShim: boolean;
    win: {
        openDatabase: (name: string, version: string, displayName: string, estimatedSize: number) => any;
    };
    DEFAULT_DB_SIZE: number;
    useSQLiteIndexes: boolean;
    fs: FSApi;
    addNonIDBGlobals: boolean;
    replaceNonIDBGlobals: boolean;
    escapeDatabaseName: (name: string) => string;
    unescapeDatabaseName: (name: string) => string;
    databaseCharacterEscapeList: string | false;
    databaseNameLengthLimit: number | false;
    escapeNFDForDatabaseNames: boolean;
    addSQLiteExtension: boolean;
    memoryDatabase: string;
    deleteDatabaseFiles: boolean;
    databaseBasePath: string;
    sysDatabaseBasePath: string;
    sqlBusyTimeout: number;
    sqlTrace: () => void;
    sqlProfile: () => void;
    createIndexes: boolean;
};
export type ConfigValue = ValueOf<ConfigValues>;
export type KeyofConfigValues = keyof ConfigValues;
export type Config = KeyofConfigValues[];
declare namespace CFG {
    let DEBUG: boolean;
    let cacheDatabaseInstances: boolean;
    let autoName: boolean;
    let fullIDLSupport: boolean;
    let checkOrigin: boolean;
    let cursorPreloadPackSize: number;
    let UnicodeIDStart: string;
    let UnicodeIDContinue: string;
    let registerSCA: (preset: import("typeson").Preset) => import("typeson").Preset;
    let avoidAutoShim: boolean;
    let win: {
        openDatabase: (name: string, version: string, displayName: string, estimatedSize: number) => any;
    };
    let DEFAULT_DB_SIZE: number;
    let useSQLiteIndexes: boolean;
    let fs: FSApi;
    let addNonIDBGlobals: boolean;
    let replaceNonIDBGlobals: boolean;
    let escapeDatabaseName: (name: string) => string;
    let unescapeDatabaseName: (name: string) => string;
    let databaseCharacterEscapeList: string | false;
    let databaseNameLengthLimit: number | false;
    let escapeNFDForDatabaseNames: boolean;
    let addSQLiteExtension: boolean;
    let memoryDatabase: string;
    let deleteDatabaseFiles: boolean;
    let databaseBasePath: string;
    let sysDatabaseBasePath: string;
    let sqlBusyTimeout: number;
    let sqlTrace: () => void;
    let sqlProfile: () => void;
    let createIndexes: boolean;
}
//# sourceMappingURL=CFG.d.ts.map