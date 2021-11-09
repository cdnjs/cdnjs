
/**
 * Icon with optional parameters that are provided by API and affect only search
 */
declare interface APIIconAttributes {
	// True if icon is hidden.
	// Used in icon sets to keep icons that no longer exist, but should still be accessible
	// from API, preventing websites from breaking when icon is removed by developer.
	hidden?: boolean;
}

/**
 * Params for sendQuery()
 */
declare interface APIQueryParams {
    provider: string;
    prefix: string;
    icons: string[];
}

declare interface ExtendedIconifyAlias extends IconifyAlias, APIIconAttributes {}

declare interface ExtendedIconifyIcon extends IconifyIcon, APIIconAttributes {}

/**
 * Function to filter item
 */
declare interface FilterCallback {
    (item: GetQueryStatus): boolean;
}

/**
 * Signature for getAPIConfig
 */
export declare type GetAPIConfig = (provider: string) => IconifyAPIConfig | undefined;

/**
 * Callback to track status
 */
declare type GetQueryStatus = () => QueryStatus;

/**
 * Global variable
 */
declare const Iconify: IconifyGlobal;
export default Iconify;

/**
 * Alias.
 */
declare interface IconifyAlias extends IconifyOptional {
	// Parent icon index without prefix, required.
	parent: string;

	// IconifyOptional properties.
	// Alias should have only properties that it overrides.
	// Transformations are merged, not overridden. See IconifyTransformations comments.
}

/**
 * "aliases" field of JSON file.
 */
declare interface IconifyAliases {
	// Index is name of icon, without prefix. Value is ExtendedIconifyAlias object.
	[index: string]: ExtendedIconifyAlias;
}

/**
 * API config
 */
export declare interface IconifyAPIConfig extends RedundancyConfig {
    path: string;
    maxURL: number;
}

/**
 * Iconify API functions
 */
export declare interface IconifyAPIFunctions {
    /**
     * Load icons
     */
    loadIcons: (icons: (IconifyIconName | string)[], callback?: IconifyIconLoaderCallback) => IconifyIconLoaderAbort;
    /**
     * Add API provider
     */
    addAPIProvider: (provider: string, customConfig: Partial<IconifyAPIConfig>) => boolean;
}

/**
 * Exposed internal functions
 *
 * Used by plug-ins, such as Icon Finder
 *
 * Important: any changes published in a release must be backwards compatible.
 */
export declare interface IconifyAPIInternalFunctions {
    /**
     * Get internal API data, used by Icon Finder
     */
    getAPI: (provider: string) => IconifyAPIInternalStorage | undefined;
    /**
     * Get API config, used by custom modules
     */
    getAPIConfig: GetAPIConfig;
    /**
     * Set API module
     */
    setAPIModule: (provider: string, item: IconifyAPIModule) => void;
    /**
     * Optional setFetch (should be imported from ./modules/fetch if fetch is used)
     *
     * Used to set custom fetch function, such as one provided by cross-fetch, making fetch usable on server
     */
    setFetch?: (item: typeof fetch) => void;
}

export declare interface IconifyAPIInternalStorage {
    config: IconifyAPIConfig;
    redundancy: Redundancy;
}

/**
 * API modules
 */
export declare interface IconifyAPIModule {
    prepare: IconifyAPIPrepareQuery;
    send: IconifyAPISendQuery;
}

/**
 * Functions to implement in module
 */
export declare type IconifyAPIPrepareQuery = (provider: string, prefix: string, icons: string[]) => APIQueryParams[];

export declare type IconifyAPISendQuery = (host: string, params: APIQueryParams, status: PendingQueryItem) => void;

/**
 * Interface for exported functions
 */
export declare interface IconifyBrowserCacheFunctions {
    enableCache: (storage: IconifyBrowserCacheType) => void;
    disableCache: (storage: IconifyBrowserCacheType) => void;
}

/**
 * Cache types
 */
export declare type IconifyBrowserCacheType = 'local' | 'session' | 'all';

/**
 * Interface for exported builder functions
 */
export declare interface IconifyBuilderFunctions {
    replaceIDs: (body: string, prefix?: string | (() => string)) => string;
    calculateSize: (size: string | number, ratio: number, precision?: number) => string | number;
    buildIcon: (icon: IconifyIcon, customisations: IconifyIconCustomisations) => IconifyIconBuildResult;
}

/**
 * Icon categories
 */
declare interface IconifyCategories {
	// Index is category title, such as "Weather".
	// Value is array of icons that belong to that category.
	// Each icon can belong to multiple categories or no categories.
	[index: string]: string[];
}

/**
 * Characters used in font.
 */
declare interface IconifyChars {
	// Index is character, such as "f000".
	// Value is icon name.
	[index: string]: string;
}

/**
 * Iconify interface
 */
declare interface IconifyCommonFunctions {
    /**
     * Get version
     */
    getVersion: () => string;
    /**
     * Render icons
     */
    renderSVG: (name: string, customisations: IconifyIconCustomisations) => SVGElement | null;
    renderHTML: (name: string, customisations: IconifyIconCustomisations) => string | null;
    /**
     * Get icon data
     */
    renderIcon: (name: string, customisations: IconifyIconCustomisations) => IconifyIconBuildResult | null;
    /**
     * Scan DOM
     */
    scan: (root?: HTMLElement) => void;
    /**
     * Add root node
     */
    observe: (root: HTMLElement) => void;
    /**
     * Remove root node
     */
    stopObserving: (root: HTMLElement) => void;
    /**
     * Pause observer
     */
    pauseObserver: (root?: HTMLElement) => void;
    /**
     * Resume observer
     */
    resumeObserver: (root?: HTMLElement) => void;
}

/**
 * Icon dimensions.
 *
 * Used in:
 *  icon (as is)
 *  alias (overwrite icon's properties)
 *  root of JSON file (default values)
 */
declare interface IconifyDimenisons {
	// Left position of viewBox.
	// Defaults to 0.
	left?: number;

	// Top position of viewBox.
	// Defaults to 0.
	top?: number;

	// Width of viewBox.
	// Defaults to 16.
	width?: number;

	// Height of viewBox.
	// Defaults to 16.
	height?: number;
}

/**
 * Iconify interface
 */
export declare interface IconifyGlobal extends IconifyStorageFunctions, IconifyBuilderFunctions, IconifyCommonFunctions, IconifyBrowserCacheFunctions, IconifyAPIFunctions {
    _api: IconifyAPIInternalFunctions;
}

/**
 * Icon alignment
 */
export declare type IconifyHorizontalIconAlignment = 'left' | 'center' | 'right';

/**
 * Icon.
 */
export declare interface IconifyIcon extends IconifyOptional {
	// Icon body: <path d="..." />, required.
	body: string;

	// IconifyOptional properties.
	// If property is missing in JSON file, look in root object for default value.
}

/**
 * Interface for getSVGData() result
 */
export declare interface IconifyIconBuildResult {
    attributes: {
        width: string;
        height: string;
        preserveAspectRatio: string;
        viewBox: string;
    };
    body: string;
    inline?: boolean;
}

/**
 * Icon customisations
 */
export declare interface IconifyIconCustomisations {
    inline?: boolean;
    width?: IconifyIconSize;
    height?: IconifyIconSize;
    hAlign?: IconifyHorizontalIconAlignment;
    vAlign?: IconifyVerticalIconAlignment;
    slice?: boolean;
    hFlip?: boolean;
    vFlip?: boolean;
    rotate?: number;
}

/**
 * Function to abort loading (usually just removes callback because loading is already in progress)
 */
export declare type IconifyIconLoaderAbort = () => void;

/**
 * Loader callback
 *
 * Provides list of icons that have been loaded
 */
export declare type IconifyIconLoaderCallback = (loaded: IconifyIconName[], missing: IconifyIconName[], pending: IconifyIconName[], unsubscribe: IconifyIconLoaderAbort) => void;

/**
 * Icon name
 */
export declare interface IconifyIconName {
    readonly provider: string;
    readonly prefix: string;
    readonly name: string;
}

/**
 * "icons" field of JSON file.
 */
declare interface IconifyIcons {
	// Index is name of icon, without prefix. Value is ExtendedIconifyIcon object.
	[index: string]: ExtendedIconifyIcon;
}

/**
 * Icon size
 */
export declare type IconifyIconSize = null | string | number;

/**
 * Icon set information block.
 */
declare interface IconifyInfo {
	// Icon set name.
	name: string;

	// Total number of icons.
	total?: number;

	// Version string.
	version?: string;

	// Author information.
	author: {
		// Author name.
		name: string;

		// Link to author's website or icon set website.
		url?: string;
	};

	// License
	license: {
		// Human readable license.
		title: string;

		// SPDX license identifier.
		spdx?: string;

		// License URL.
		url?: string;
	};

	// Array of icons that should be used for samples in icon sets list.
	samples: string[];

	// Icon grid: number or array of numbers.
	height?: number | number[];

	// Display height for samples: 16 - 24
	displayHeight?: number;

	// Category on Iconify collections list.
	category?: string;

	// Palette status. True if icons have predefined color scheme, false if icons use currentColor.
	// Icon set should not mix icons with and without palette to simplify search.
	palette: boolean;
}

/**
 * JSON structure.
 *
 * All optional values can exist in root of JSON file, used as defaults.
 */
export declare interface IconifyJSON extends IconifyOptional, IconifyMetaData {
	// Prefix for icons in JSON file, required.
	prefix: string;

	// API provider, optional.
	provider?: string;

	// List of icons, required.
	icons: IconifyIcons;

	// Optional aliases.
	aliases?: IconifyAliases;

	// Optional list of missing icons. Returned by Iconify API when querying for icons that do not exist.
	not_found?: string[];

	// IconifyOptional properties that are used as default values for icons when icon is missing value.
	// If property exists in both icon and root, use value from icon.
	// This is used to reduce duplication.
}

/**
 * Meta data stored in JSON file, used for browsing icon set.
 */
declare interface IconifyMetaData {
	// Icon set information block. Used for public icon sets, can be skipped for private icon sets.
	info?: IconifyInfo;

	// Characters used in font. Used for searching by character for icon sets imported from font, exporting icon set to font.
	chars?: IconifyChars;

	// Categories. Used for filtering icons.
	categories?: IconifyCategories;

	// Optional themes (old format).
	themes?: LegacyIconifyThemes;

	// Optional themes (new format). Key is prefix or suffix, value is title.
	prefixes?: Record<string, string>;
	suffixes?: Record<string, string>;
}

/**
 * Combination of dimensions and transformations.
 */
declare interface IconifyOptional
	extends IconifyDimenisons,
		IconifyTransformations {
	//
}

/**
 * Interface for exported storage functions
 */
export declare interface IconifyStorageFunctions {
    /**
     * Check if icon exists
     */
    iconExists: (name: string) => boolean;
    /**
     * Get icon data with all properties
     */
    getIcon: (name: string) => Required<IconifyIcon> | null;
    /**
     * List all available icons
     */
    listIcons: (provider?: string, prefix?: string) => string[];
    /**
     * Add icon to storage
     */
    addIcon: (name: string, data: IconifyIcon) => boolean;
    /**
     * Add icon set to storage
     */
    addCollection: (data: IconifyJSON, provider?: string) => boolean;
}

/**
 * Icon transformations.
 *
 * Used in:
 *  icon (as is)
 *  alias (merged with icon's properties)
 *  root of JSON file (default values)
 */
declare interface IconifyTransformations {
	// Number of 90 degrees rotations.
	// 0 = 0, 1 = 90deg and so on.
	// Defaults to 0.
	// When merged (such as alias + icon), result is icon.rotation + alias.rotation.
	rotate?: number;

	// Horizontal flip.
	// Defaults to false.
	// When merged, result is icon.hFlip !== alias.hFlip
	hFlip?: boolean;

	// Vertical flip. (see hFlip comments)
	vFlip?: boolean;
}

export declare type IconifyVerticalIconAlignment = 'top' | 'middle' | 'bottom';

/**
 * Optional themes, old format.
 *
 * Deprecated because format is unnecessary complicated. Key is meaningless, suffixes and prefixes are mixed together.
 */
declare interface LegacyIconifyThemes {
	// Key is unique string.
	[index: string]: {
		// Theme title.
		title: string;

		// Icon prefix or suffix, including dash. All icons that start with prefix and end with suffix belong to theme.
		prefix?: string; // Example: 'baseline-'
		suffix?: string; // Example: '-filled'
	};
}

export declare type PartialIconifyAPIConfig = Partial<IconifyAPIConfig>;

/**
 * Item in pending items list
 */
declare interface PendingQueryItem {
    readonly getQueryStatus: GetQueryStatus;
    status: QueryItemStatus;
    readonly resource: RedundancyResource;
    readonly done: QueryDoneCallback;
    abort?: QueryAbortCallback;
}

/**
 * Callback for "abort" pending item.
 */
declare type QueryAbortCallback = () => void;

/**
 * Callback
 *
 * If error is present, something went wrong and data is undefined. If error is undefined, data is set.
 */
declare type QueryDoneCallback = (data?: unknown, error?: unknown) => void;

/**
 * Execution status
 */
declare type QueryItemStatus = 'pending' | 'completed' | 'aborted' | 'failed';

/**
 * Function to send to item to send query
 */
declare type QueryModuleCallback = (resource: RedundancyResource, payload: QueryPayload, queryItem: PendingQueryItem) => void;

/**
 * Custom payload
 */
declare type QueryPayload = unknown;

/**
 * Status for query
 */
declare interface QueryStatus {
    readonly abort: () => void;
    readonly subscribe: (callback?: QueryDoneCallback, overwrite?: boolean) => void;
    readonly payload: QueryPayload;
    status: QueryItemStatus;
    startTime: number;
    queriesSent: number;
    queriesPending: number;
}

/**
 * Redundancy instance
 */
declare interface Redundancy {
    query: (payload: unknown, queryCallback: QueryModuleCallback, doneCallback?: QueryDoneCallback) => GetQueryStatus;
    find: (callback: FilterCallback) => GetQueryStatus | null;
    setIndex: (index: number) => void;
    getIndex: () => number;
    cleanup: () => void;
}

/**
 * Configuration object
 */
declare interface RedundancyConfig {
    resources: RedundancyResource[];
    index: number;
    timeout: number | TimeoutCallback;
    rotate: number | RotationTimeoutCallback;
    random: boolean;
    dataAfterTimeout: boolean;
}

/**
 * Resource to rotate (usually hostname or partial URL)
 */
declare type RedundancyResource = unknown;

/**
 * Callback for "rotate" configuration property.
 * Returns number of milliseconds to wait before trying next resource.
 */
declare interface RotationTimeoutCallback {
    (queriesSent: number, // Number of queries sent, starts with 1 for timeout after first resource
    startTime: number): number;
}

/**
 * Callback for "timeout" configuration property.
 * Returns number of milliseconds to wait before failing query, while there are pending resources.
 */
declare interface TimeoutCallback {
    (startTime: number): number;
}

export { }
