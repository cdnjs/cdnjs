// Config
interface ZIndexOptions {
    modal: number;
    overlay: number;
    menu: number;
    tooltip: number;
    toast: number;
}

export type InputStyleType = 'outlined' | 'filled';

export type AppendToType = 'self' | HTMLElement | undefined | null;

interface FilterMatchModeOptions {
    text: any[];
    numeric: any[];
    date: any[];
}

interface APIOptions {
    ripple?: boolean;
    inputStyle?: InputStyleType;
    nonce?: string;
    locale?: string;
    appendTo?: AppendToType;
    cssTransition?: boolean;
    autoZIndex?: boolean;
    zIndex?: ZIndexOptions;
    filterMatchModeOptions?: FilterMatchModeOptions;
    nullSortOrder?: number;
}

declare const PrimeReact: APIOptions;

export default PrimeReact;

// Locale
export declare function locale(locale: string): { locale: string; options: object };
export declare function addLocale(locale: string, options: object): void;
export declare function updateLocaleOption(key: string, value: any, locale: string): void;
export declare function updateLocaleOptions(options: object, locale: string): void;
export declare function localeOption(key: string, locale: string): any;
export declare function localeOptions(locale: string): object;

// Icons
export interface PrimeIconsOptions {
    readonly ALIGN_CENTER: string;
    readonly ALIGN_JUSTIFY: string;
    readonly ALIGN_LEFT: string;
    readonly ALIGN_RIGHT: string;
    readonly AMAZON: string;
    readonly ANDROID: string;
    readonly ANGLE_DOUBLE_DOWN: string;
    readonly ANGLE_DOUBLE_LEFT: string;
    readonly ANGLE_DOUBLE_RIGHT: string;
    readonly ANGLE_DOUBLE_UP: string;
    readonly ANGLE_DOWN: string;
    readonly ANGLE_LEFT: string;
    readonly ANGLE_RIGHT: string;
    readonly ANGLE_UP: string;
    readonly APPLE: string;
    readonly ARROW_CIRCLE_DOWN: string;
    readonly ARROW_CIRCLE_LEFT: string;
    readonly ARROW_CIRCLE_RIGHT: string;
    readonly ARROW_CIRCLE_UP: string;
    readonly ARROW_DOWN: string;
    readonly ARROW_DOWN_LEFT: string;
    readonly ARROW_DOWN_RIGHT: string;
    readonly ARROW_LEFT: string;
    readonly ARROW_RIGHT: string;
    readonly ARROW_UP: string;
    readonly ARROW_UP_LEFT: string;
    readonly ARROW_UP_RIGHT: string;
    readonly ARROW_H: string;
    readonly ARROW_V: string;
    readonly AT: string;
    readonly BACKWARD: string;
    readonly BAN: string;
    readonly BARS: string;
    readonly BELL: string;
    readonly BOLT: string;
    readonly BOOK: string;
    readonly BOOKMARK: string;
    readonly BOOKMARK_FILL: string;
    readonly BOX: string;
    readonly BRIEFCASE: string;
    readonly BUILDING: string;
    readonly CALENDAR: string;
    readonly CALENDAR_MINUS: string;
    readonly CALENDAR_PLUS: string;
    readonly CALENDAR_TIMES: string;
    readonly CAMERA: string;
    readonly CAR: string;
    readonly CARET_DOWN: string;
    readonly CARET_LEFT: string;
    readonly CARET_RIGHT: string;
    readonly CARET_UP: string;
    readonly CHART_BAR: string;
    readonly CHART_LINE: string;
    readonly CHART_PIE: string;
    readonly CHECK: string;
    readonly CHECK_CIRCLE: string;
    readonly CHECK_SQUARE: string;
    readonly CHEVRON_CIRCLE_DOWN: string;
    readonly CHEVRON_CIRCLE_LEFT: string;
    readonly CHEVRON_CIRCLE_RIGHT: string;
    readonly CHEVRON_CIRCLE_UP: string;
    readonly CHEVRON_DOWN: string;
    readonly CHEVRON_LEFT: string;
    readonly CHEVRON_RIGHT: string;
    readonly CHEVRON_UP: string;
    readonly CIRCLE: string;
    readonly CIRCLE_FILL: string;
    readonly CLOCK: string;
    readonly CLONE: string;
    readonly CLOUD: string;
    readonly CLOUD_DOWNLOAD: string;
    readonly CLOUD_UPLOAD: string;
    readonly CODE: string;
    readonly COG: string;
    readonly COMMENT: string;
    readonly COMMENTS: string;
    readonly COMPASS: string;
    readonly COPY: string;
    readonly CREDIT_CARD: string;
    readonly DATABASE: string;
    readonly DESKTOP: string;
    readonly DIRECTIONS: string;
    readonly DIRECTIONS_ALT: string;
    readonly DISCORD: string;
    readonly DOLLAR: string;
    readonly DOWNLOAD: string;
    readonly EJECT: string;
    readonly ELLIPSIS_H: string;
    readonly ELLIPSIS_V: string;
    readonly ENVELOPE: string;
    readonly EURO: string;
    readonly EXCLAMATION_CIRCLE: string;
    readonly EXCLAMATION_TRIANGLE: string;
    readonly EXTERNAL_LINK: string;
    readonly EYE: string;
    readonly EYE_SLASH: string;
    readonly FACEBOOK: string;
    readonly FAST_BACKWARD: string;
    readonly FAST_FORWARD: string;
    readonly FILE: string;
    readonly FILE_EXCEL: string;
    readonly FILE_PDF: string;
    readonly FILTER: string;
    readonly FILTER_FILL: string;
    readonly FILTER_SLASH: string;
    readonly FLAG: string;
    readonly FLAG_FILL: string;
    readonly FOLDER: string;
    readonly FOLDER_OPEN: string;
    readonly FORWARD: string;
    readonly GITHUB: string;
    readonly GLOBE: string;
    readonly GOOGLE: string;
    readonly HASHTAG: string;
    readonly HEART: string;
    readonly HEART_FILL: string;
    readonly HISTORY: string;
    readonly HOME: string;
    readonly ID_CARD: string;
    readonly IMAGE: string;
    readonly IMAGES: string;
    readonly INBOX: string;
    readonly INFO: string;
    readonly INFO_CIRCLE: string;
    readonly INSTAGRAM: string;
    readonly KEY: string;
    readonly LINK: string;
    readonly LINKEDIN: string;
    readonly LIST: string;
    readonly LOCK: string;
    readonly LOCK_OPEN: string;
    readonly MAP: string;
    readonly MAP_MARKER: string;
    readonly MICROSOFT: string;
    readonly MINUS: string;
    readonly MINUS_CIRCLE: string;
    readonly MOBILE: string;
    readonly MONEY_BILL: string;
    readonly MOON: string;
    readonly PALETTE: string;
    readonly PAPERCLIP: string;
    readonly PAUSE: string;
    readonly PAYPAL: string;
    readonly PENCIL: string;
    readonly PERCENTAGE: string;
    readonly PHONE: string;
    readonly PLAY: string;
    readonly PLUS: string;
    readonly PLUS_CIRCLE: string;
    readonly POUND: string;
    readonly POWER_OFF: string;
    readonly PRIME: string;
    readonly PRINT: string;
    readonly QRCODE: string;
    readonly QUESTION: string;
    readonly QUESTION_CIRCLE: string;
    readonly REDDIT: string;
    readonly REFRESH: string;
    readonly REPLAY: string;
    readonly REPLY: string;
    readonly SAVE: string;
    readonly SEARCH: string;
    readonly SEARCH_MINUS: string;
    readonly SEARCH_PLUS: string;
    readonly SEND: string;
    readonly SERVER: string;
    readonly SHARE_ALT: string;
    readonly SHIELD: string;
    readonly SHOPPING_BAG: string;
    readonly SHOPPING_CART: string;
    readonly SIGN_IN: string;
    readonly SIGN_OUT: string;
    readonly SITEMAP: string;
    readonly SLACK: string;
    readonly SLIDERS_H: string;
    readonly SLIDERS_V: string;
    readonly SORT: string;
    readonly SORT_ALPHA_DOWN: string;
    readonly SORT_ALPHA_ALT_DOWN: string;
    readonly SORT_ALPHA_UP: string;
    readonly SORT_ALPHA_ALT_UP: string;
    readonly SORT_ALT: string;
    readonly SORT_ALT_SLASH: string;
    readonly SORT_AMOUNT_DOWN: string;
    readonly SORT_AMOUNT_DOWN_ALT: string;
    readonly SORT_AMOUNT_UP: string;
    readonly SORT_AMOUNT_UP_ALT: string;
    readonly SORT_DOWN: string;
    readonly SORT_NUMERIC_DOWN: string;
    readonly SORT_NUMERIC_ALT_DOWN: string;
    readonly SORT_NUMERIC_UP: string;
    readonly SORT_NUMERIC_ALT_UP: string;
    readonly SORT_UP: string;
    readonly SPINNER: string;
    readonly STAR: string;
    readonly STAR_FILL: string;
    readonly STEP_BACKWARD: string;
    readonly STEP_BACKWARD_ALT: string;
    readonly STEP_FORWARD: string;
    readonly STEP_FORWARD_ALT: string;
    readonly STOP: string;
    readonly STOP_CIRCLE: string;
    readonly SUN: string;
    readonly SYNC: string;
    readonly TABLE: string;
    readonly TABLET: string;
    readonly TAG: string;
    readonly TAGS: string;
    readonly TELEGRAM: string;
    readonly TH_LARGE: string;
    readonly THUMBS_DOWN: string;
    readonly THUMBS_UP: string;
    readonly TICKET: string;
    readonly TIMES: string;
    readonly TIMES_CIRCLE: string;
    readonly TRASH: string;
    readonly TWITTER: string;
    readonly UNDO: string;
    readonly UNLOCK: string;
    readonly UPLOAD: string;
    readonly USER: string;
    readonly USER_EDIT: string;
    readonly USER_MINUS: string;
    readonly USER_PLUS: string;
    readonly USERS: string;
    readonly VIDEO: string;
    readonly VIMEO: string;
    readonly VOLUME_DOWN: string;
    readonly VOLUME_OFF: string;
    readonly VOLUME_UP: string;
    readonly WALLET: string;
    readonly WHATSAPP: string;
    readonly WIFI: string;
    readonly WINDOW_MAXIMIZE: string;
    readonly WINDOW_MINIMIZE: string;
    readonly YOUTUBE: string;
}

export declare const PrimeIcons: PrimeIconsOptions;

// Severity
export declare enum MessageSeverity {
    SUCCESS = 'success',
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error'
}

// Filter
export declare enum FilterMatchMode {
    STARTS_WITH = 'startsWith',
    CONTAINS = 'contains',
    NOT_CONTAINS = 'notContains',
    ENDS_WITH = 'endsWith',
    EQUALS = 'equals',
    NOT_EQUALS = 'notEquals',
    IN = 'in',
    LESS_THAN = 'lt',
    LESS_THAN_OR_EQUAL_TO = 'lte',
    GREATER_THAN = 'gt',
    GREATER_THAN_OR_EQUAL_TO = 'gte',
    BETWEEN = 'between',
    DATE_IS = 'dateIs',
    DATE_IS_NOT = 'dateIsNot',
    DATE_BEFORE = 'dateBefore',
    DATE_AFTER = 'dateAfter',
    CUSTOM = 'custom'
}

export declare enum FilterOperator {
    AND = 'and',
    OR = 'or'
}

export declare enum SortOrder {
    DESC = -1,
    UNSORTED = 0,
    ASC = 1
}

export declare namespace FilterService {
    export function filter(value: any, fields: string[], filterValue: any, filterMatchMode: string, filterLocale?: string): any[];
    export const filters: {
        startsWith(value: any, filter: string, filterLocale?: string): boolean;
        contains(value: any, filter: string, filterLocale?: string): boolean;
        notContains(value: any, filter: string, filterLocale?: string): boolean;
        endsWith(value: any, filter: string, filterLocale?: string): boolean;
        equals(value: any, filter: string, filterLocale?: string): boolean;
        notEquals(value: any, filter: string, filterLocale?: string): boolean;
        in(value: any, filter: string): boolean;
        between(value: any, filter: string): boolean;
        lt(value: any, filter: string): boolean;
        lte(value: any, filter: string): boolean;
        gt(value: any, filter: string): boolean;
        gte(value: any, filter: string): boolean;
        dateIs(value: any, filter: string): boolean;
        dateIsNot(value: any, filter: string): boolean;
        dateBefore(value: any, filter: string): boolean;
        dateAfter(value: any, filter: string): boolean;
    };
    export function register(rule: string, fn: (...arg: any[]) => boolean): void;
}
