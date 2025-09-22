declare function start(opts?: StartOpts): void;
interface StartOpts {
    urlRerouteOnly?: boolean;
}

declare function ensureJQuerySupport(jQuery?: any): void;
declare global {
    interface Window {
        jQuery?: any;
        $?: any;
    }
}

declare enum AppOrParcelStatus {
    NOT_LOADED = "NOT_LOADED",
    LOADING_SOURCE_CODE = "LOADING_SOURCE_CODE",
    NOT_INITIALIZED = "NOT_INITIALIZED",
    INITIALIZING = "INITIALIZING",
    NOT_MOUNTED = "NOT_MOUNTED",
    MOUNTING = "MOUNTING",
    MOUNTED = "MOUNTED",
    UPDATING = "UPDATING",
    UNMOUNTING = "UNMOUNTING",
    UNLOADING = "UNLOADING",
    LOAD_ERROR = "LOAD_ERROR",
    SKIP_BECAUSE_BROKEN = "SKIP_BECAUSE_BROKEN"
}
interface InternalApplication {
    name: string;
    activeWhen: ActivityFn;
    loadApp: LoadApp;
    status: AppOrParcelStatus;
    loadErrorTime: number;
    parcels: ParcelMap;
    customProps?: CustomProps;
    timeouts?: AppOrParcelTimeouts;
    devtools: AppDevtools;
}
interface AppDevtools {
    overlays: {
        options: OverlayOptions;
        selectors: string[];
    };
}
interface OverlayOptions {
    color?: string;
    background?: string;
    classes?: string[];
    height?: string;
    left?: string;
    position?: string;
    top?: string;
    width?: string;
    zIndex?: string | number;
    textColor?: string;
    textBlocks?: string[];
}

interface CustomProps {
    [str: string]: any;
    [num: number]: any;
}
interface ParcelCustomProps extends CustomProps {
    domElement: HTMLElement;
}
type CustomPropsFn<ExtraProps extends CustomProps = CustomProps> = (name: string, location: Location) => ExtraProps;
type AppProps = {
    name: string;
    mountParcel(parcelConfig: ParcelConfig, customProps: ParcelProps & CustomProps): Parcel;
};
type ParcelConfig<ExtraProps = CustomProps> = ParcelConfigObject<ExtraProps> | (() => Promise<ParcelConfigObject<ExtraProps>>);
type ParcelProps = {
    domElement: HTMLElement;
};
type ParcelConfigObject<ExtraProps = CustomProps> = {
    name?: string;
    timeouts?: AppOrParcelTimeouts;
} & LifeCycles<ExtraProps>;
type LifeCycleFn<ExtraProps> = (config: ExtraProps & AppProps) => Promise<any>;
type LifeCycles<ExtraProps = {}> = {
    init?: LifeCycleFn<ExtraProps> | Array<LifeCycleFn<ExtraProps>>;
    mount: LifeCycleFn<ExtraProps> | Array<LifeCycleFn<ExtraProps>>;
    unmount: LifeCycleFn<ExtraProps> | Array<LifeCycleFn<ExtraProps>>;
    update?: LifeCycleFn<ExtraProps> | Array<LifeCycleFn<ExtraProps>>;
    unload?: LifeCycleFn<ExtraProps> | Array<LifeCycleFn<ExtraProps>>;
    devtools?: AppDevtools;
    timeouts?: AppOrParcelTimeouts;
};
type Parcel<ExtraProps = CustomProps> = {
    mount(): Promise<null>;
    unmount(): Promise<null>;
    update?(customProps: ExtraProps): Promise<any>;
    getStatus(): AppOrParcelStatus;
    loadPromise: Promise<null>;
    initPromise: Promise<null>;
    mountPromise: Promise<null>;
    unmountPromise: Promise<null>;
    _parcel: InternalParcel;
};
interface ParcelMap {
    [parcelId: number]: InternalParcel;
}
interface InternalParcel {
    id: number;
    name: string;
    init: LifeCycles["init"];
    mount: LifeCycles["mount"];
    unmount: LifeCycles["unmount"];
    update: LifeCycles["update"];
    parcels: ParcelMap;
    status: AppOrParcelStatus;
    customProps: CustomProps;
    parentName: string;
    unmountThisParcel(): Promise<AppOrParcel>;
    currentTask: Promise<LoadedAppOrParcel>;
    timeouts: AppOrParcelTimeouts;
}
type AppOrParcel = InternalApplication | InternalParcel;
interface Loaded extends LifeCycles {
    loadPromise?: Promise<LoadedApp | InternalApplication>;
}
type LoadedAppOrParcel = (InternalApplication & Loaded) | (InternalParcel & Loaded);
type LoadedApp = InternalApplication & Loaded;
type Application<ExtraProps = {}> = LifeCycles<ExtraProps> | LoadApp<ExtraProps>;
type LoadApp<ExtraProps = {}> = (config: ExtraProps & AppProps) => Promise<LifeCycles<ExtraProps>>;
interface SingleSpaLocation {
    pathname: URL["pathname"];
    hash?: URL["hash"];
    search?: string;
}
type ActivityFn = (location: SingleSpaLocation) => boolean;
type Activity = ActivityFn | string | (ActivityFn | string)[];
type RegisterApplicationConfig<ExtraProps extends CustomProps = {}> = {
    name: string;
    app: Application<ExtraProps>;
    activeWhen: Activity;
    customProps?: ExtraProps | CustomPropsFn<ExtraProps>;
};

interface AppOrParcelTimeouts {
    init: Timeout;
    mount: Timeout;
    unmount: Timeout;
    unload: Timeout;
    update: Timeout;
}
interface Timeout {
    millis: number;
    dieOnTimeout: boolean;
    warningMillis: number;
}
declare function setInitMaxTime(time: number, dieOnTimeout: boolean, warningMillis: number): void;
declare function setMountMaxTime(time: number, dieOnTimeout: boolean, warningMillis: number): void;
declare function setUnmountMaxTime(time: number, dieOnTimeout: boolean, warningMillis: number): void;
declare function setUnloadMaxTime(time: number, dieOnTimeout: boolean, warningMillis: number): void;

declare function getMountedApps(): string[];
declare function getAppNames(): string[];
declare function getRawAppData(): InternalApplication[];
declare function getAppStatus(appName: any): AppOrParcelStatus | null;
declare function registerApplication<ExtraProps extends CustomProps = {}>(RegisterApplicationConfig: any): void;
declare function registerApplication<ExtraProps extends CustomProps = {}>(appName: string, app: Application, activeWhen: Activity, customProps: ExtraProps | CustomPropsFn<ExtraProps>): void;
declare function checkActivityFunctions(location?: SingleSpaLocation): string[];
declare function unregisterApplication(appName: string): Promise<void>;
declare function unloadApplication(appName: string, opts?: {
    waitForUnmount: boolean;
}): Promise<void>;
declare function pathToActiveWhen(path: string, exactMatch?: boolean): ActivityFn;

type NavigateArg = string | HTMLAnchorElement | MouseEvent;
declare function navigateToUrl(obj: NavigateArg): void;
declare function patchHistoryApi(opts?: StartOpts): void;

type EventArguments = [HashChangeEvent | PopStateEvent];
interface WaitingPromises {
    resolve(value: unknown): void;
    reject(value: unknown): void;
    eventArguments?: [HashChangeEvent | PopStateEvent];
}
declare function triggerAppChange(): Promise<string[]>;
declare function reroute(pendingPromises?: WaitingPromises[], eventArguments?: EventArguments, silentNavigation?: boolean): Promise<string[]>;

type SingleSpaError = Error & {
    appOrParcelName: string;
};
type ErrorHandler = (err: SingleSpaError) => any;
declare function addErrorHandler(handler: any): void;
declare function removeErrorHandler(handler: any): boolean;

declare function mountRootParcel(config: ParcelConfig, customProps: CustomProps): any;

declare function toLoadPromise(app: InternalApplication | LoadedApp): Promise<LoadedApp | InternalApplication>;

declare function toInitPromise(appOrParcel: LoadedAppOrParcel, hardFail?: boolean): Promise<LoadedAppOrParcel>;

interface ProfileEntry {
    type: "application" | "parcel" | "routing";
    name: string;
    kind: "init" | "load" | "mount" | "unload" | "unmount" | "update" | "loadApps" | "silentNavigation" | "browserNavigation" | "triggerAppChange";
    operationSucceeded: boolean;
    start: number;
    end: number;
}
declare function getProfilerData(): ProfileEntry[];

declare const _default: {
    getRawAppData: typeof getRawAppData;
    reroute: typeof reroute;
    NOT_LOADED: AppOrParcelStatus;
    toLoadPromise: typeof toLoadPromise;
    toBootstrapPromise: typeof toInitPromise;
    unregisterApplication: typeof unregisterApplication;
    getProfilerData: typeof getProfilerData;
};

declare global {
    interface Window {
        __SINGLE_SPA_DEVTOOLS__: {
            exposedMethods: typeof _default;
        };
    }
}

export { type Activity, type ActivityFn, AppOrParcelStatus, type AppProps, type Application, type CustomProps, type CustomPropsFn, type ErrorHandler, type LifeCycleFn, type LifeCycles, type LoadApp, type Parcel, type ParcelConfig, type ParcelConfigObject, type ParcelCustomProps, type RegisterApplicationConfig, type SingleSpaError, type StartOpts, addErrorHandler, checkActivityFunctions, ensureJQuerySupport, getAppNames, getAppStatus, getMountedApps, mountRootParcel, navigateToUrl, patchHistoryApi, pathToActiveWhen, registerApplication, removeErrorHandler, setInitMaxTime, setMountMaxTime, setUnloadMaxTime, setUnmountMaxTime, start, triggerAppChange, unloadApplication, unregisterApplication };
