export default CFG;
/**
 * <T>
 */
export type ValueOf<T> = T[keyof T];
export type FSApi = {
    unlink: (path: string, cb: import("fs").NoParamCallback) => void;
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
    registerSCA: (preset: import("typeson").Preset) => import("typeson").Preset;
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
declare const CFG: ConfigValues;
//# sourceMappingURL=CFG.d.ts.map