import { IconifyIcon } from '@iconify/types';
import { IconifyJSON } from '@iconify/types';
import { IconifyTransformations } from '@iconify/types';

/**
 * Add icon set
 */
export declare function addCollection(data: IconifyJSON, provider?: string): boolean;

/**
 * Add one icon
 */
export declare function addIcon(name: string, data: IconifyIcon): boolean;

/**
 * Get SVG attributes and content from icon + customisations
 *
 * Does not generate style to make it compatible with frameworks that use objects for style, such as React.
 * Instead, it generates 'inline' value. If true, rendering engine should add verticalAlign: -0.125em to icon.
 *
 * Customisations should be normalised by platform specific parser.
 * Result should be converted to <svg> by platform specific parser.
 * Use replaceIDs to generate unique IDs for body.
 */
export declare function buildIcon(icon: IconifyIcon, customisations?: IconifyIconCustomisations_2): IconifyIconBuildResult;

/**
 * Calculate second dimension when only 1 dimension is set
 */
export declare function calculateSize(size: string, ratio: number, precision?: number): string;

export declare function calculateSize(size: number, ratio: number, precision?: number): number;

export declare function calculateSize(size: string | number, ratio: number, precision?: number): string | number;

/**
 * Callback
 */
declare type GetHTMLElement = () => HTMLElement | null;

/**
 * Get full icon
 */
export declare function getIcon(name: string): Required<IconifyIcon> | null;

/**
 * Get version
 */
export declare function getVersion(): string;

/**
 * Check if icon exists
 */
export declare function iconExists(name: string): boolean;

/**
 * Global variable
 */
declare const Iconify: IconifyGlobal;
export default Iconify;

/**
 * Interface for exported builder functions
 */
export declare interface IconifyBuilderFunctions {
    replaceIDs?: (body: string, prefix?: string | (() => string)) => string;
    calculateSize: (size: string | number, ratio: number, precision?: number) => string | number;
    buildIcon: (icon: IconifyIcon, customisations?: IconifyIconCustomisations_2) => IconifyIconBuildResult;
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
    renderSVG: (name: string, customisations?: IconifyIconCustomisations_2) => SVGElement | null;
    renderHTML: (name: string, customisations?: IconifyIconCustomisations_2) => string | null;
    /**
     * Get icon data
     */
    renderIcon: (name: string, customisations?: IconifyIconCustomisations_2) => IconifyIconBuildResult | null;
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
 * Iconify interface
 */
export declare interface IconifyGlobal extends IconifyStorageFunctions, IconifyBuilderFunctions, IconifyCommonFunctions {
}

export { IconifyIcon }

/**
 * Interface for getSVGData() result
 */
export declare interface IconifyIconBuildResult {
    attributes: {
        width?: string;
        height?: string;
        viewBox: string;
    };
    body: string;
}

/**
 * Add inline to customisations
 */
export declare interface IconifyIconCustomisations extends IconifyIconCustomisations_2 {
    inline?: boolean;
}

/**
 * Icon customisations
 */
declare interface IconifyIconCustomisations_2 extends IconifyTransformations, IconifyIconSizeCustomisations {
}

/**
 * Icon name
 */
export declare interface IconifyIconName {
    readonly provider: string;
    readonly prefix: string;
    readonly name: string;
}

/**
 * Icon size
 */
export declare type IconifyIconSize = null | string | number;

/**
 * Dimensions
 */
declare interface IconifyIconSizeCustomisations {
    width?: IconifyIconSize;
    height?: IconifyIconSize;
}

export { IconifyJSON }

/**
 * Icon render mode
 *
 * 'style' = 'bg' or 'mask', depending on icon content
 * 'bg' = add inline style to placeholder using `background`
 * 'mask' = add inline style to placeholder using `mask`
 * 'svg' = <svg>
 */
export declare type IconifyRenderMode = 'style' | 'bg' | 'mask' | 'svg';

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
 * List available icons
 */
export declare function listIcons(provider?: string, prefix?: string): string[];

/**
 * Observe node
 */
export declare function observe(root: HTMLElement, autoRemove?: boolean): ObservedNode;

/**
 * Observed node type
 */
declare interface ObservedNode {
    node: HTMLElement | GetHTMLElement;
    temporary?: boolean;
    observer?: {
        instance?: MutationObserver;
        paused: number;
        pendingScan?: unknown;
    };
}

/**
 * Pause observer
 */
export declare function pauseObserver(root?: HTMLElement): void;

/**
 * Generate SVG as string
 */
export declare function renderHTML(name: string, customisations?: IconifyIconCustomisations_2): string | null;

/**
 * Get rendered icon as object that can be used to create SVG (use replaceIDs on body)
 */
export declare function renderIcon(name: string, customisations?: IconifyIconCustomisations_2): IconifyIconBuildResult | null;

/**
 * Generate SVG element
 */
export declare function renderSVG(name: string, customisations?: IconifyIconCustomisations_2): SVGElement | null;

/**
 * IDs usage:
 *
 * id="{id}"
 * xlink:href="#{id}"
 * url(#{id})
 *
 * From SVG animations:
 *
 * begin="0;{id}.end"
 * begin="{id}.end"
 * begin="{id}.click"
 */
/**
 * Replace IDs in SVG output with unique IDs
 */
export declare function replaceIDs(body: string, prefix?: string | ((id: string) => string)): string;

/**
 * Resume observer
 */
export declare function resumeObserver(root?: HTMLElement): void;

/**
 * Scan DOM
 */
export declare function scan(root?: HTMLElement): void;

/**
 * Remove observed node
 */
export declare function stopObserving(root: HTMLElement): void;

export { }
