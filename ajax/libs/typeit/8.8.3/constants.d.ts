import { CursorOptions, Options } from "./types";
export declare const DATA_ATTRIBUTE = "data-typeit-id";
export declare const CURSOR_CLASS = "ti-cursor";
export declare const START = "START";
export declare const END = "END";
export declare const DEFAULT_STATUSES: {
    started: boolean;
    completed: boolean;
    frozen: boolean;
    destroyed: boolean;
};
export declare const DEFAULT_OPTIONS: Options & {
    cursor: Required<CursorOptions>;
};
export declare const PLACEHOLDER_CSS = "[data-typeit-id]:before {content: '.'; display: inline-block; width: 0; visibility: hidden;}";
