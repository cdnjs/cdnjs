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
    const DEBUG: boolean;
    const cacheDatabaseInstances: boolean;
    const autoName: boolean;
    const fullIDLSupport: boolean;
    const checkOrigin: boolean;
    const cursorPreloadPackSize: number;
    const UnicodeIDStart: string;
    const UnicodeIDContinue: string;
    const registerSCA: (preset: import("typeson").Preset) => import("typeson").Preset;
    const avoidAutoShim: boolean;
    const win: {
        openDatabase: (name: string, version: string, displayName: string, estimatedSize: number) => any;
    };
    const DEFAULT_DB_SIZE: number;
    const useSQLiteIndexes: boolean;
    const fs: FSApi;
    const addNonIDBGlobals: boolean;
    const replaceNonIDBGlobals: boolean;
    const escapeDatabaseName: (name: string) => string;
    const unescapeDatabaseName: (name: string) => string;
    const databaseCharacterEscapeList: string | false;
    const databaseNameLengthLimit: number | false;
    const escapeNFDForDatabaseNames: boolean;
    const addSQLiteExtension: boolean;
    const memoryDatabase: string;
    const deleteDatabaseFiles: boolean;
    const databaseBasePath: string;
    const sysDatabaseBasePath: string;
    const sqlBusyTimeout: number;
    const sqlTrace: () => void;
    const sqlProfile: () => void;
    const createIndexes: boolean;
}
//# sourceMappingURL=CFG.d.ts.map