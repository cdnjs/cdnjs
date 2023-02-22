import * as vue from 'vue';
import { Ref, DeepReadonly, PropType, JSXComponent, CSSProperties, ComputedRef, EffectScope, nextTick, ComponentInternalInstance, ExtractPropTypes, WritableComputedRef, UnwrapRef, DirectiveBinding } from 'vue';
// @ts-ignore
import * as vue_router from 'vue-router';
// @ts-ignore
import { RouteLocationRaw } from 'vue-router';

interface LocaleMessages {
    [key: string]: LocaleMessages | string;
}
interface LocaleOptions {
    messages?: LocaleMessages;
    locale?: string;
    fallback?: string;
    adapter?: LocaleInstance;
}
interface LocaleInstance {
    name: string;
    messages: Ref<LocaleMessages>;
    current: Ref<string>;
    fallback: Ref<string>;
    t: (key: string, ...params: unknown[]) => string;
    n: (value: number) => string;
    provide: (props: LocaleOptions) => LocaleInstance;
}
declare function useLocale(): LocaleInstance & RtlInstance;
interface RtlOptions {
    rtl?: Record<string, boolean>;
}
interface RtlInstance {
    isRtl: Ref<boolean>;
    rtl: Ref<Record<string, boolean>>;
    rtlClasses: Ref<string>;
}
declare function useRtl(): {
    isRtl: Ref<boolean>;
    rtlClasses: Ref<string>;
};

type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;
type ThemeOptions = false | {
    cspNonce?: string;
    defaultTheme?: string;
    variations?: false | VariationsOptions;
    themes?: Record<string, ThemeDefinition>;
};
type ThemeDefinition = DeepPartial<InternalThemeDefinition>;
interface VariationsOptions {
    colors: string[];
    lighten: number;
    darken: number;
}
interface InternalThemeDefinition {
    dark: boolean;
    colors: Colors;
    variables: Record<string, string | number>;
}
interface Colors extends BaseColors, OnColors {
    [key: string]: string;
}
interface BaseColors {
    background: string;
    surface: string;
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
    info: string;
}
interface OnColors {
    'on-background': string;
    'on-surface': string;
    'on-primary': string;
    'on-secondary': string;
    'on-success': string;
    'on-warning': string;
    'on-error': string;
    'on-info': string;
}
interface ThemeInstance {
    readonly isDisabled: boolean;
    readonly themes: Ref<Record<string, InternalThemeDefinition>>;
    readonly name: Readonly<Ref<string>>;
    readonly current: DeepReadonly<Ref<InternalThemeDefinition>>;
    readonly computedThemes: DeepReadonly<Ref<Record<string, InternalThemeDefinition>>>;
    readonly themeClasses: Readonly<Ref<string | undefined>>;
    readonly styles: Readonly<Ref<string>>;
    readonly global: {
        readonly name: Ref<string>;
        readonly current: DeepReadonly<Ref<InternalThemeDefinition>>;
    };
}
declare function useTheme(): ThemeInstance;

type DisplayBreakpoint = keyof DisplayThresholds;
interface DisplayThresholds {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
}
interface DisplayOptions {
    mobileBreakpoint?: number | DisplayBreakpoint;
    thresholds?: Partial<DisplayThresholds>;
}
interface DisplayPlatform {
    android: boolean;
    ios: boolean;
    cordova: boolean;
    electron: boolean;
    chrome: boolean;
    edge: boolean;
    firefox: boolean;
    opera: boolean;
    win: boolean;
    mac: boolean;
    linux: boolean;
    touch: boolean;
    ssr: boolean;
}
interface DisplayInstance {
    xs: Ref<boolean>;
    sm: Ref<boolean>;
    md: Ref<boolean>;
    lg: Ref<boolean>;
    xl: Ref<boolean>;
    xxl: Ref<boolean>;
    smAndUp: Ref<boolean>;
    mdAndUp: Ref<boolean>;
    lgAndUp: Ref<boolean>;
    xlAndUp: Ref<boolean>;
    smAndDown: Ref<boolean>;
    mdAndDown: Ref<boolean>;
    lgAndDown: Ref<boolean>;
    xlAndDown: Ref<boolean>;
    name: Ref<DisplayBreakpoint>;
    height: Ref<number>;
    width: Ref<number>;
    mobile: Ref<boolean>;
    mobileBreakpoint: Ref<number | DisplayBreakpoint>;
    platform: Ref<DisplayPlatform>;
    thresholds: Ref<DisplayThresholds>;
    update(): void;
}
declare function useDisplay(): DisplayInstance;

declare const block: readonly ["top", "bottom"];
declare const inline: readonly ["start", "end", "left", "right"];
type Tblock = typeof block[number];
type Tinline = typeof inline[number];
type Anchor = Tblock | Tinline | 'center' | 'center center' | `${Tblock} ${Tinline | 'center'}` | `${Tinline} ${Tblock | 'center'}`;

declare class Box {
    x: number;
    y: number;
    width: number;
    height: number;
    constructor({ x, y, width, height }: {
        x: number;
        y: number;
        width: number;
        height: number;
    });
    get top(): number;
    get bottom(): number;
    get left(): number;
    get right(): number;
}

declare function deepEqual(a: any, b: any): boolean;
type SelectItemKey = boolean | string | (string | number)[] | ((item: Record<string, any>, fallback?: any) => any);
type EventProp<T = (...args: any[]) => any> = T | T[];
declare const EventProp: PropType<EventProp<(...args: any[]) => any>>;

type DefaultsInstance = undefined | {
    [key: string]: undefined | Record<string, unknown>;
    global?: Record<string, unknown>;
};
type DefaultsOptions = Partial<DefaultsInstance>;

type IconValue = string | JSXComponent;
declare const IconValue: PropType<IconValue>;
interface IconAliases {
    [name: string]: IconValue;
    complete: IconValue;
    cancel: IconValue;
    close: IconValue;
    delete: IconValue;
    clear: IconValue;
    success: IconValue;
    info: IconValue;
    warning: IconValue;
    error: IconValue;
    prev: IconValue;
    next: IconValue;
    checkboxOn: IconValue;
    checkboxOff: IconValue;
    checkboxIndeterminate: IconValue;
    delimiter: IconValue;
    sortAsc: IconValue;
    sortDesc: IconValue;
    expand: IconValue;
    menu: IconValue;
    subgroup: IconValue;
    dropdown: IconValue;
    radioOn: IconValue;
    radioOff: IconValue;
    edit: IconValue;
    ratingEmpty: IconValue;
    ratingFull: IconValue;
    ratingHalf: IconValue;
    loading: IconValue;
    first: IconValue;
    last: IconValue;
    unfold: IconValue;
    file: IconValue;
    plus: IconValue;
    minus: IconValue;
}
interface IconProps {
    tag: string;
    icon?: IconValue;
    disabled?: Boolean;
}
type IconComponent = JSXComponent<IconProps>;
interface IconSet {
    component: IconComponent;
}
type IconOptions = {
    defaultSet: string;
    aliases?: Partial<IconAliases>;
    sets: Record<string, IconSet>;
};
declare const VComponentIcon: vue.DefineComponent<{
    tag: string;
} & {
    icon?: IconValue | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    tag: string;
} & {
    icon?: IconValue | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {}>;
type VComponentIcon = InstanceType<typeof VComponentIcon>;
declare const VSvgIcon: vue.DefineComponent<{
    icon: {
        type: PropType<IconValue>;
    };
    tag: {
        type: StringConstructor;
        required: true;
    };
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{
    icon: {
        type: PropType<IconValue>;
    };
    tag: {
        type: StringConstructor;
        required: true;
    };
}>>, {}>;
type VSvgIcon = InstanceType<typeof VSvgIcon>;
declare const VLigatureIcon: vue.DefineComponent<{
    icon: {
        type: PropType<IconValue>;
    };
    tag: {
        type: StringConstructor;
        required: true;
    };
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{
    icon: {
        type: PropType<IconValue>;
    };
    tag: {
        type: StringConstructor;
        required: true;
    };
}>>, {}>;
type VLigatureIcon = InstanceType<typeof VLigatureIcon>;
declare const VClassIcon: vue.DefineComponent<{
    icon: {
        type: PropType<IconValue>;
    };
    tag: {
        type: StringConstructor;
        required: true;
    };
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{
    icon: {
        type: PropType<IconValue>;
    };
    tag: {
        type: StringConstructor;
        required: true;
    };
}>>, {}>;
type VClassIcon = InstanceType<typeof VClassIcon>;

type Position = 'top' | 'left' | 'right' | 'bottom';
interface Layer {
    top: number;
    bottom: number;
    left: number;
    right: number;
}
interface LayoutItem extends Layer {
    id: string;
    size: number;
    position: Position;
}
declare function useLayout(): {
    getLayoutItem: (id: string) => LayoutItem | undefined;
    mainRect: Ref<Layer>;
    mainStyles: Ref<CSSProperties>;
};

type ValidationResult = string | boolean;
type ValidationRule = ValidationResult | PromiseLike<ValidationResult> | ((value: any) => ValidationResult) | ((value: any) => PromiseLike<ValidationResult>);

interface FieldValidationResult {
    id: number | string;
    errorMessages: string[];
}
interface FormValidationResult {
    valid: boolean;
    errors: FieldValidationResult[];
}
interface SubmitEventPromise extends SubmitEvent, Promise<FormValidationResult> {
}

interface VuetifyOptions {
    aliases?: Record<string, any>;
    blueprint?: Blueprint;
    components?: Record<string, any>;
    directives?: Record<string, any>;
    defaults?: DefaultsOptions;
    display?: DisplayOptions;
    theme?: ThemeOptions;
    icons?: IconOptions;
    locale?: LocaleOptions & RtlOptions;
    ssr?: boolean;
}
interface Blueprint extends Omit<VuetifyOptions, 'blueprint'> {
}

declare const VApp: vue.DefineComponent<{
    fullHeight: boolean;
} & {
    theme?: string | undefined;
    overlaps?: string[] | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    getLayoutItem: (id: string) => {
        size: number;
        position: "left" | "top" | "bottom" | "right";
        top: number;
        bottom: number;
        left: number;
        right: number;
        id: string;
    } | undefined;
    items: vue.ComputedRef<{
        size: number;
        position: "left" | "top" | "bottom" | "right";
        top: number;
        bottom: number;
        left: number;
        right: number;
        id: string;
    }[]>;
    theme: ThemeInstance;
}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    fullHeight: boolean;
} & {
    theme?: string | undefined;
    overlaps?: string[] | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    fullHeight: boolean;
}>;
type VApp = InstanceType<typeof VApp>;

type Density$1 = null | 'prominent' | 'default' | 'comfortable' | 'compact';
declare const VToolbar: vue.DefineComponent<{
    flat: boolean;
    absolute: boolean;
    height: string | number;
    tag: string;
    collapse: boolean;
    density: Density$1;
    extended: boolean;
    extensionHeight: string | number;
    floating: boolean;
} & {
    border?: string | number | boolean | undefined;
    color?: string | undefined;
    title?: string | undefined;
    image?: string | undefined;
    elevation?: string | number | undefined;
    theme?: string | undefined;
    rounded?: string | number | boolean | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: (() => vue.VNodeChild) | undefined;
        image?: (() => vue.VNodeChild) | undefined;
        prepend?: (() => vue.VNodeChild) | undefined;
        append?: (() => vue.VNodeChild) | undefined;
        title?: (() => vue.VNodeChild) | undefined;
        extension?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
        image?: false | (() => vue.VNodeChild) | undefined;
        prepend?: false | (() => vue.VNodeChild) | undefined;
        append?: false | (() => vue.VNodeChild) | undefined;
        title?: false | (() => vue.VNodeChild) | undefined;
        extension?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:image"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:prepend"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:append"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:title"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:extension"?: false | (() => vue.VNodeChild) | undefined;
}, {
    contentHeight: vue.ComputedRef<number>;
    extensionHeight: vue.ComputedRef<number>;
}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    flat: boolean;
    absolute: boolean;
    height: string | number;
    tag: string;
    collapse: boolean;
    density: Density$1;
    extended: boolean;
    extensionHeight: string | number;
    floating: boolean;
} & {
    border?: string | number | boolean | undefined;
    color?: string | undefined;
    title?: string | undefined;
    image?: string | undefined;
    elevation?: string | number | undefined;
    theme?: string | undefined;
    rounded?: string | number | boolean | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: (() => vue.VNodeChild) | undefined;
        image?: (() => vue.VNodeChild) | undefined;
        prepend?: (() => vue.VNodeChild) | undefined;
        append?: (() => vue.VNodeChild) | undefined;
        title?: (() => vue.VNodeChild) | undefined;
        extension?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
        image?: false | (() => vue.VNodeChild) | undefined;
        prepend?: false | (() => vue.VNodeChild) | undefined;
        append?: false | (() => vue.VNodeChild) | undefined;
        title?: false | (() => vue.VNodeChild) | undefined;
        extension?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:image"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:prepend"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:append"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:title"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:extension"?: false | (() => vue.VNodeChild) | undefined;
}, {
    flat: boolean;
    absolute: boolean;
    height: string | number;
    tag: string;
    collapse: boolean;
    rounded: string | number | boolean;
    density: Density$1;
    extended: boolean;
    extensionHeight: string | number;
    floating: boolean;
}>;
type VToolbar = InstanceType<typeof VToolbar>;

declare const VAppBar: vue.DefineComponent<{
    flat: boolean;
    absolute: boolean;
    location: "top" | "bottom";
    height: string | number;
    order: string | number;
    tag: string;
    collapse: boolean;
    density: Density$1;
    extended: boolean;
    extensionHeight: string | number;
    floating: boolean;
    modelValue: boolean;
} & {
    name?: string | undefined;
    border?: string | number | boolean | undefined;
    color?: string | undefined;
    title?: string | undefined;
    image?: string | undefined;
    elevation?: string | number | undefined;
    theme?: string | undefined;
    rounded?: string | number | boolean | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: (() => vue.VNodeChild) | undefined;
        image?: (() => vue.VNodeChild) | undefined;
        prepend?: (() => vue.VNodeChild) | undefined;
        append?: (() => vue.VNodeChild) | undefined;
        title?: (() => vue.VNodeChild) | undefined;
        extension?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
        image?: false | (() => vue.VNodeChild) | undefined;
        prepend?: false | (() => vue.VNodeChild) | undefined;
        append?: false | (() => vue.VNodeChild) | undefined;
        title?: false | (() => vue.VNodeChild) | undefined;
        extension?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:image"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:prepend"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:append"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:title"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:extension"?: false | (() => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (value: boolean) => boolean;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    flat: boolean;
    absolute: boolean;
    location: "top" | "bottom";
    height: string | number;
    order: string | number;
    tag: string;
    collapse: boolean;
    density: Density$1;
    extended: boolean;
    extensionHeight: string | number;
    floating: boolean;
    modelValue: boolean;
} & {
    name?: string | undefined;
    border?: string | number | boolean | undefined;
    color?: string | undefined;
    title?: string | undefined;
    image?: string | undefined;
    elevation?: string | number | undefined;
    theme?: string | undefined;
    rounded?: string | number | boolean | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: (() => vue.VNodeChild) | undefined;
        image?: (() => vue.VNodeChild) | undefined;
        prepend?: (() => vue.VNodeChild) | undefined;
        append?: (() => vue.VNodeChild) | undefined;
        title?: (() => vue.VNodeChild) | undefined;
        extension?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
        image?: false | (() => vue.VNodeChild) | undefined;
        prepend?: false | (() => vue.VNodeChild) | undefined;
        append?: false | (() => vue.VNodeChild) | undefined;
        title?: false | (() => vue.VNodeChild) | undefined;
        extension?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:image"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:prepend"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:append"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:title"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:extension"?: false | (() => vue.VNodeChild) | undefined;
} & {
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
}, {
    flat: boolean;
    absolute: boolean;
    location: "top" | "bottom";
    height: string | number;
    order: string | number;
    tag: string;
    collapse: boolean;
    rounded: string | number | boolean;
    density: Density$1;
    extended: boolean;
    extensionHeight: string | number;
    floating: boolean;
    modelValue: boolean;
}>;
type VAppBar = InstanceType<typeof VAppBar>;

declare const VAppBarNavIcon: vue.DefineComponent<{
    icon: IconValue;
} & {} & {
    $children?: {} | vue.VNodeChild | {
        default?: (() => vue.VNodeChild) | undefined;
        prepend?: (() => vue.VNodeChild) | undefined;
        append?: (() => vue.VNodeChild) | undefined;
        loader?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
        prepend?: false | (() => vue.VNodeChild) | undefined;
        append?: false | (() => vue.VNodeChild) | undefined;
        loader?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:prepend"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:append"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:loader"?: false | (() => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    icon: IconValue;
} & {} & {
    $children?: {} | vue.VNodeChild | {
        default?: (() => vue.VNodeChild) | undefined;
        prepend?: (() => vue.VNodeChild) | undefined;
        append?: (() => vue.VNodeChild) | undefined;
        loader?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
        prepend?: false | (() => vue.VNodeChild) | undefined;
        append?: false | (() => vue.VNodeChild) | undefined;
        loader?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:prepend"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:append"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:loader"?: false | (() => vue.VNodeChild) | undefined;
}, {
    icon: IconValue;
}>;
type VAppBarNavIcon = InstanceType<typeof VAppBarNavIcon>;

declare const VAppBarTitle: vue.DefineComponent<{
    tag: string;
} & {
    text?: string | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: (() => vue.VNodeChild) | undefined;
        text?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
        text?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:text"?: false | (() => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    tag: string;
} & {
    text?: string | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: (() => vue.VNodeChild) | undefined;
        text?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
        text?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:text"?: false | (() => vue.VNodeChild) | undefined;
}, {
    tag: string;
}>;
type VAppBarTitle = InstanceType<typeof VAppBarTitle>;

type Density = null | 'default' | 'comfortable' | 'compact';

declare const VAlert: vue.DefineComponent<{
    tag: string;
    icon: false | IconValue;
    prominent: boolean;
    density: Density;
    variant: NonNullable<"flat" | "text" | "elevated" | "tonal" | "outlined" | "plain">;
    modelValue: boolean;
    closable: boolean;
    closeIcon: IconValue;
    closeLabel: string;
} & {
    type?: "error" | "success" | "warning" | "info" | undefined;
    location?: Anchor | undefined;
    height?: string | number | undefined;
    width?: string | number | undefined;
    border?: boolean | "end" | "start" | "top" | "bottom" | undefined;
    borderColor?: string | undefined;
    color?: string | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
    position?: "fixed" | "absolute" | "static" | "relative" | "sticky" | undefined;
    title?: string | undefined;
    text?: string | undefined;
    elevation?: string | number | undefined;
    theme?: string | undefined;
    rounded?: string | number | boolean | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: (() => vue.VNodeChild) | undefined;
        prepend?: (() => vue.VNodeChild) | undefined;
        title?: (() => vue.VNodeChild) | undefined;
        text?: (() => vue.VNodeChild) | undefined;
        append?: (() => vue.VNodeChild) | undefined;
        close?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
        prepend?: false | (() => vue.VNodeChild) | undefined;
        title?: false | (() => vue.VNodeChild) | undefined;
        text?: false | (() => vue.VNodeChild) | undefined;
        append?: false | (() => vue.VNodeChild) | undefined;
        close?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:prepend"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:title"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:text"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:append"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:close"?: false | (() => vue.VNodeChild) | undefined;
}, () => false | JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (value: boolean) => true;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    tag: string;
    icon: false | IconValue;
    prominent: boolean;
    density: Density;
    variant: NonNullable<"flat" | "text" | "elevated" | "tonal" | "outlined" | "plain">;
    modelValue: boolean;
    closable: boolean;
    closeIcon: IconValue;
    closeLabel: string;
} & {
    type?: "error" | "success" | "warning" | "info" | undefined;
    location?: Anchor | undefined;
    height?: string | number | undefined;
    width?: string | number | undefined;
    border?: boolean | "end" | "start" | "top" | "bottom" | undefined;
    borderColor?: string | undefined;
    color?: string | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
    position?: "fixed" | "absolute" | "static" | "relative" | "sticky" | undefined;
    title?: string | undefined;
    text?: string | undefined;
    elevation?: string | number | undefined;
    theme?: string | undefined;
    rounded?: string | number | boolean | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: (() => vue.VNodeChild) | undefined;
        prepend?: (() => vue.VNodeChild) | undefined;
        title?: (() => vue.VNodeChild) | undefined;
        text?: (() => vue.VNodeChild) | undefined;
        append?: (() => vue.VNodeChild) | undefined;
        close?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
        prepend?: false | (() => vue.VNodeChild) | undefined;
        title?: false | (() => vue.VNodeChild) | undefined;
        text?: false | (() => vue.VNodeChild) | undefined;
        append?: false | (() => vue.VNodeChild) | undefined;
        close?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:prepend"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:title"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:text"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:append"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:close"?: false | (() => vue.VNodeChild) | undefined;
} & {
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
}, {
    tag: string;
    icon: false | IconValue;
    rounded: string | number | boolean;
    prominent: boolean;
    density: Density;
    variant: NonNullable<"flat" | "text" | "elevated" | "tonal" | "outlined" | "plain">;
    modelValue: boolean;
    closable: boolean;
    closeIcon: IconValue;
    closeLabel: string;
}>;
type VAlert = InstanceType<typeof VAlert>;

declare const VAlertTitle: vue.DefineComponent<{
    tag: string;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    tag: string;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    tag: string;
}>;
type VAlertTitle = InstanceType<typeof VAlertTitle>;

interface LoaderSlotProps {
    color: string | undefined;
    isActive: boolean;
}

interface VInputSlot {
    id: ComputedRef<string>;
    messagesId: ComputedRef<string>;
    isDirty: ComputedRef<boolean>;
    isDisabled: ComputedRef<boolean>;
    isReadonly: ComputedRef<boolean>;
    isPristine: Ref<boolean>;
    isValid: ComputedRef<boolean | null>;
    isValidating: Ref<boolean>;
    reset: () => void;
    resetValidation: () => void;
    validate: () => void;
}
declare const VInput: vue.DefineComponent<{
    error: boolean;
    direction: "horizontal" | "vertical";
    disabled: boolean;
    readonly: boolean;
    messages: string | string[];
    density: Density;
    focused: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
} & {
    id?: string | undefined;
    name?: string | undefined;
    label?: string | undefined;
    modelValue?: any;
    prependIcon?: IconValue | undefined;
    appendIcon?: IconValue | undefined;
    'onClick:append'?: EventProp<(...args: any[]) => any> | undefined;
    'onClick:prepend'?: EventProp<(...args: any[]) => any> | undefined;
    validateOn?: "input" | "blur" | "submit" | undefined;
    validationValue?: any;
    hideDetails?: boolean | "auto" | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        prepend?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        append?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        details?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        prepend?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        append?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        details?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:prepend"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:append"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:details"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
}, {
    reset: () => void;
    resetValidation: () => void;
    validate: () => Promise<string[]>;
}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (val: any) => true;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    error: boolean;
    direction: "horizontal" | "vertical";
    disabled: boolean;
    readonly: boolean;
    messages: string | string[];
    density: Density;
    focused: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
} & {
    id?: string | undefined;
    name?: string | undefined;
    label?: string | undefined;
    modelValue?: any;
    prependIcon?: IconValue | undefined;
    appendIcon?: IconValue | undefined;
    'onClick:append'?: EventProp<(...args: any[]) => any> | undefined;
    'onClick:prepend'?: EventProp<(...args: any[]) => any> | undefined;
    validateOn?: "input" | "blur" | "submit" | undefined;
    validationValue?: any;
    hideDetails?: boolean | "auto" | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        prepend?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        append?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        details?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        prepend?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        append?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        details?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:prepend"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:append"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:details"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
} & {
    "onUpdate:modelValue"?: ((val: any) => any) | undefined;
}, {
    error: boolean;
    direction: "horizontal" | "vertical";
    disabled: boolean;
    readonly: boolean;
    messages: string | string[];
    density: Density;
    focused: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
}>;
type VInput = InstanceType<typeof VInput>;

interface DefaultInputSlot {
    isActive: Ref<boolean>;
    isFocused: Ref<boolean>;
    controlRef: Ref<HTMLElement | undefined>;
    focus: () => void;
    blur: () => void;
}
interface VFieldSlot extends DefaultInputSlot {
    props: Record<string, unknown>;
}
declare const VField: {
    new (...args: any[]): {
        $: vue.ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            reverse: boolean;
            error: boolean;
            active: boolean;
            disabled: boolean;
            variant: "filled" | "outlined" | "plain" | "underlined" | "solo";
            clearIcon: IconValue;
            focused: boolean;
            clearable: boolean;
            dirty: boolean;
            persistentClear: boolean;
            singleLine: boolean;
        }> & Omit<Readonly<vue.ExtractPropTypes<Omit<{
            loading: (StringConstructor | BooleanConstructor)[];
            theme: StringConstructor;
            appendInnerIcon: PropType<IconValue>;
            bgColor: StringConstructor;
            clearable: BooleanConstructor;
            clearIcon: {
                type: PropType<IconValue>;
                default: string;
            };
            active: BooleanConstructor;
            color: StringConstructor;
            dirty: BooleanConstructor;
            disabled: BooleanConstructor;
            error: BooleanConstructor;
            label: StringConstructor;
            persistentClear: BooleanConstructor;
            prependInnerIcon: PropType<IconValue>;
            reverse: BooleanConstructor;
            singleLine: BooleanConstructor;
            variant: {
                type: PropType<"filled" | "outlined" | "plain" | "underlined" | "solo">;
                default: string;
                validator: (v: any) => boolean;
            };
            'onClick:clear': PropType<EventProp<(...args: any[]) => any>>;
            'onClick:appendInner': PropType<EventProp<(...args: any[]) => any>>;
            'onClick:prependInner': PropType<EventProp<(...args: any[]) => any>>;
            focused: BooleanConstructor;
            id: StringConstructor;
        }, "$children" | "v-slot:default" | "v-slots" | "modelValue" | "onUpdate:modelValue" | "v-slot:loader" | "v-slot:clear" | "v-slot:label" | "v-slot:prepend-inner" | "v-slot:append-inner">>> & {
            "onUpdate:focused"?: ((focused: boolean) => any) | undefined;
        } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "reverse" | "error" | "active" | "disabled" | "variant" | "clearIcon" | "focused" | "clearable" | "dirty" | "persistentClear" | "singleLine">;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            [name: string]: vue.Slot | undefined;
        }>;
        $root: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null;
        $parent: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null;
        $emit: (event: "update:focused", focused: boolean) => void;
        $el: any;
        $options: vue.ComponentOptionsBase<Readonly<vue.ExtractPropTypes<Omit<{
            loading: (StringConstructor | BooleanConstructor)[];
            theme: StringConstructor;
            appendInnerIcon: PropType<IconValue>;
            bgColor: StringConstructor;
            clearable: BooleanConstructor;
            clearIcon: {
                type: PropType<IconValue>;
                default: string;
            };
            active: BooleanConstructor;
            color: StringConstructor;
            dirty: BooleanConstructor;
            disabled: BooleanConstructor;
            error: BooleanConstructor;
            label: StringConstructor;
            persistentClear: BooleanConstructor;
            prependInnerIcon: PropType<IconValue>;
            reverse: BooleanConstructor;
            singleLine: BooleanConstructor;
            variant: {
                type: PropType<"filled" | "outlined" | "plain" | "underlined" | "solo">;
                default: string;
                validator: (v: any) => boolean;
            };
            'onClick:clear': PropType<EventProp<(...args: any[]) => any>>;
            'onClick:appendInner': PropType<EventProp<(...args: any[]) => any>>;
            'onClick:prependInner': PropType<EventProp<(...args: any[]) => any>>;
            focused: BooleanConstructor;
            id: StringConstructor;
        }, "$children" | "v-slot:default" | "v-slots" | "modelValue" | "onUpdate:modelValue" | "v-slot:loader" | "v-slot:clear" | "v-slot:label" | "v-slot:prepend-inner" | "v-slot:append-inner">>> & {
            "onUpdate:focused"?: ((focused: boolean) => any) | undefined;
        }, {
            controlRef: Ref<HTMLElement | undefined>;
        }, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Omit<{
            'update:focused': (focused: boolean) => true;
            'update:modelValue': (val: any) => true;
        }, "$children" | "v-slot:default" | "v-slots" | "modelValue" | "update:modelValue" | "v-slot:loader" | "v-slot:clear" | "v-slot:label" | "v-slot:prepend-inner" | "v-slot:append-inner">, string, {
            reverse: boolean;
            error: boolean;
            active: boolean;
            disabled: boolean;
            variant: "filled" | "outlined" | "plain" | "underlined" | "solo";
            clearIcon: IconValue;
            focused: boolean;
            clearable: boolean;
            dirty: boolean;
            persistentClear: boolean;
            singleLine: boolean;
        }, {}, string> & {
            beforeCreate?: ((() => void) | (() => void)[]) | undefined;
            created?: ((() => void) | (() => void)[]) | undefined;
            beforeMount?: ((() => void) | (() => void)[]) | undefined;
            mounted?: ((() => void) | (() => void)[]) | undefined;
            beforeUpdate?: ((() => void) | (() => void)[]) | undefined;
            updated?: ((() => void) | (() => void)[]) | undefined;
            activated?: ((() => void) | (() => void)[]) | undefined;
            deactivated?: ((() => void) | (() => void)[]) | undefined;
            beforeDestroy?: ((() => void) | (() => void)[]) | undefined;
            beforeUnmount?: ((() => void) | (() => void)[]) | undefined;
            destroyed?: ((() => void) | (() => void)[]) | undefined;
            unmounted?: ((() => void) | (() => void)[]) | undefined;
            renderTracked?: (((e: vue.DebuggerEvent) => void) | ((e: vue.DebuggerEvent) => void)[]) | undefined;
            renderTriggered?: (((e: vue.DebuggerEvent) => void) | ((e: vue.DebuggerEvent) => void)[]) | undefined;
            errorCaptured?: (((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null, info: string) => boolean | void) | ((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null, info: string) => boolean | void)[]) | undefined;
        };
        $forceUpdate: () => void;
        $nextTick: typeof vue.nextTick;
        $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (args_0: R, args_1: R) => any : (...args: any) => any, options?: vue.WatchOptions<boolean> | undefined): vue.WatchStopHandle;
    } & Readonly<vue.ExtractPropTypes<Omit<{
        loading: (StringConstructor | BooleanConstructor)[];
        theme: StringConstructor;
        appendInnerIcon: PropType<IconValue>;
        bgColor: StringConstructor;
        clearable: BooleanConstructor;
        clearIcon: {
            type: PropType<IconValue>;
            default: string;
        };
        active: BooleanConstructor;
        color: StringConstructor;
        dirty: BooleanConstructor;
        disabled: BooleanConstructor;
        error: BooleanConstructor;
        label: StringConstructor;
        persistentClear: BooleanConstructor;
        prependInnerIcon: PropType<IconValue>;
        reverse: BooleanConstructor;
        singleLine: BooleanConstructor;
        variant: {
            type: PropType<"filled" | "outlined" | "plain" | "underlined" | "solo">;
            default: string;
            validator: (v: any) => boolean;
        };
        'onClick:clear': PropType<EventProp<(...args: any[]) => any>>;
        'onClick:appendInner': PropType<EventProp<(...args: any[]) => any>>;
        'onClick:prependInner': PropType<EventProp<(...args: any[]) => any>>;
        focused: BooleanConstructor;
        id: StringConstructor;
    }, "$children" | "v-slot:default" | "v-slots" | "modelValue" | "onUpdate:modelValue" | "v-slot:loader" | "v-slot:clear" | "v-slot:label" | "v-slot:prepend-inner" | "v-slot:append-inner">>> & {
        "onUpdate:focused"?: ((focused: boolean) => any) | undefined;
    } & vue.ShallowUnwrapRef<{
        controlRef: Ref<HTMLElement | undefined>;
    }> & {} & vue.ComponentCustomProperties & {};
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & vue.ComponentOptionsBase<Readonly<vue.ExtractPropTypes<Omit<{
    loading: (StringConstructor | BooleanConstructor)[];
    theme: StringConstructor;
    appendInnerIcon: PropType<IconValue>;
    bgColor: StringConstructor;
    clearable: BooleanConstructor;
    clearIcon: {
        type: PropType<IconValue>;
        default: string;
    };
    active: BooleanConstructor;
    color: StringConstructor;
    dirty: BooleanConstructor;
    disabled: BooleanConstructor;
    error: BooleanConstructor;
    label: StringConstructor;
    persistentClear: BooleanConstructor;
    prependInnerIcon: PropType<IconValue>;
    reverse: BooleanConstructor;
    singleLine: BooleanConstructor;
    variant: {
        type: PropType<"filled" | "outlined" | "plain" | "underlined" | "solo">;
        default: string;
        validator: (v: any) => boolean;
    };
    'onClick:clear': PropType<EventProp<(...args: any[]) => any>>;
    'onClick:appendInner': PropType<EventProp<(...args: any[]) => any>>;
    'onClick:prependInner': PropType<EventProp<(...args: any[]) => any>>;
    focused: BooleanConstructor;
    id: StringConstructor;
}, "$children" | "v-slot:default" | "v-slots" | "modelValue" | "onUpdate:modelValue" | "v-slot:loader" | "v-slot:clear" | "v-slot:label" | "v-slot:prepend-inner" | "v-slot:append-inner">>> & {
    "onUpdate:focused"?: ((focused: boolean) => any) | undefined;
}, {
    controlRef: Ref<HTMLElement | undefined>;
}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Omit<{
    'update:focused': (focused: boolean) => true;
    'update:modelValue': (val: any) => true;
}, "$children" | "v-slot:default" | "v-slots" | "modelValue" | "update:modelValue" | "v-slot:loader" | "v-slot:clear" | "v-slot:label" | "v-slot:prepend-inner" | "v-slot:append-inner">, string, {
    reverse: boolean;
    error: boolean;
    active: boolean;
    disabled: boolean;
    variant: "filled" | "outlined" | "plain" | "underlined" | "solo";
    clearIcon: IconValue;
    focused: boolean;
    clearable: boolean;
    dirty: boolean;
    persistentClear: boolean;
    singleLine: boolean;
}, {}, string> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & (new <T_1>() => {
    $props: {
        modelValue?: T_1 | undefined;
        'onUpdate:modelValue'?: ((val: T_1) => any) | undefined;
    } & {
        $children?: {} | vue.VNodeChild | {
            clear?: (() => vue.VNodeChild) | undefined;
            'prepend-inner'?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
            'append-inner'?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
            label?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
            loader?: ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
            default?: ((args_0: VFieldSlot) => vue.VNodeChild) | undefined;
        };
        'v-slots'?: {
            clear?: false | (() => vue.VNodeChild) | undefined;
            'prepend-inner'?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
            'append-inner'?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
            label?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
            loader?: false | ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
            default?: false | ((args_0: VFieldSlot) => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:clear"?: false | (() => vue.VNodeChild) | undefined;
        "v-slot:prepend-inner"?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:append-inner"?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:label"?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:loader"?: false | ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
        "v-slot:default"?: false | ((args_0: VFieldSlot) => vue.VNodeChild) | undefined;
    };
});
type VField = InstanceType<typeof VField>;

interface ScrollStrategyData {
    root: Ref<HTMLElement | undefined>;
    contentEl: Ref<HTMLElement | undefined>;
    activatorEl: Ref<HTMLElement | undefined>;
    isActive: Ref<boolean>;
    updateLocation: Ref<((e: Event) => void) | undefined>;
}
type ScrollStrategyFn = (data: ScrollStrategyData, props: StrategyProps$1, scope: EffectScope) => void;
declare const scrollStrategies: {
    none: null;
    close: typeof closeScrollStrategy;
    block: typeof blockScrollStrategy;
    reposition: typeof repositionScrollStrategy;
};
interface StrategyProps$1 {
    scrollStrategy: keyof typeof scrollStrategies | ScrollStrategyFn;
    contained: boolean | undefined;
}
declare function closeScrollStrategy(data: ScrollStrategyData): void;
declare function blockScrollStrategy(data: ScrollStrategyData, props: StrategyProps$1): void;
declare function repositionScrollStrategy(data: ScrollStrategyData, props: StrategyProps$1, scope: EffectScope): void;

interface LocationStrategyData {
    contentEl: Ref<HTMLElement | undefined>;
    activatorEl: Ref<HTMLElement | undefined>;
    isActive: Ref<boolean>;
    isRtl: Ref<boolean>;
}
type LocationStrategyFn = (data: LocationStrategyData, props: StrategyProps, contentStyles: Ref<Record<string, string>>) => undefined | {
    updateLocation: (e: Event) => void;
};
declare const locationStrategies: {
    static: typeof staticLocationStrategy;
    connected: typeof connectedLocationStrategy;
};
interface StrategyProps {
    locationStrategy: keyof typeof locationStrategies | LocationStrategyFn;
    location: Anchor;
    origin: Anchor | 'auto' | 'overlap';
    offset?: number | string | number[];
    maxHeight?: number | string;
    maxWidth?: number | string;
    minHeight?: number | string;
    minWidth?: number | string;
}
declare function staticLocationStrategy(): void;
declare function connectedLocationStrategy(data: LocationStrategyData, props: StrategyProps, contentStyles: Ref<Record<string, string>>): {
    updateLocation: () => {
        available: {
            x: number;
            y: number;
        };
        contentBox: Box;
    } | undefined;
};

interface InternalItem<T = any> {
    title: string;
    value: any;
    props: {
        [key: string]: any;
        title: string;
        value: any;
    };
    children?: InternalItem<T>[];
    raw: T;
}

/**
 * - match without highlight
 * - single match (index), length already known
 * - single match (start, end)
 * - multiple matches (start, end), probably shouldn't overlap
 */
type FilterMatch = boolean | number | [number, number] | [number, number][];
type FilterFunction = (value: string, query: string, item?: any) => FilterMatch;
type FilterKeyFunctions = Record<string, FilterFunction>;
type FilterKeys = string | string[];
type FilterMode = 'some' | 'every' | 'union' | 'intersection';

type Primitive$2 = string | number | boolean | symbol;
type Val$2<T, ReturnObject extends boolean> = T extends Primitive$2 ? T : (ReturnObject extends true ? T : any);
type Value$2<T, ReturnObject extends boolean, Multiple extends boolean> = Multiple extends true ? readonly Val$2<T, ReturnObject>[] : Val$2<T, ReturnObject>;
declare const VAutocomplete: {
    new (...args: any[]): {
        $: vue.ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            reverse: boolean;
            type: string;
            error: boolean;
            active: boolean;
            direction: "horizontal" | "vertical";
            transition: NonNullable<string | boolean | (vue.TransitionProps & {
                component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
            })>;
            menu: boolean;
            autofocus: boolean;
            eager: boolean;
            disabled: boolean;
            readonly: boolean;
            noDataText: string;
            messages: string | string[];
            density: Density;
            variant: "filled" | "outlined" | "plain" | "underlined" | "solo";
            clearIcon: IconValue;
            focused: boolean;
            errorMessages: string | string[];
            maxErrors: string | number;
            rules: ValidationRule[];
            clearable: boolean;
            persistentClear: boolean;
            singleLine: boolean;
            persistentHint: boolean;
            persistentPlaceholder: boolean;
            persistentCounter: boolean;
            valueComparator: typeof deepEqual;
            itemTitle: SelectItemKey;
            itemValue: SelectItemKey;
            itemChildren: NonNullable<SelectItemKey>;
            itemProps: SelectItemKey;
            chips: boolean;
            closableChips: boolean;
            hideNoData: boolean;
            hideSelected: boolean;
            menuIcon: IconValue;
            openOnClear: boolean;
            filterMode: FilterMode;
            noFilter: boolean;
            filterKeys: NonNullable<FilterKeys>;
        }> & Omit<Readonly<vue.ExtractPropTypes<Omit<{
            transition: Omit<{
                type: vue.PropType<string | boolean | (vue.TransitionProps & {
                    component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
                })>;
                default: string;
                validator: (val: unknown) => boolean;
            }, "type" | "default"> & {
                type: vue.PropType<NonNullable<string | boolean | (vue.TransitionProps & {
                    component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
                })>>;
                default: NonNullable<string | boolean | (vue.TransitionProps & {
                    component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
                })>;
            };
            reverse: BooleanConstructor;
            type: {
                type: StringConstructor;
                default: string;
            };
            error: BooleanConstructor;
            id: StringConstructor;
            active: BooleanConstructor;
            name: StringConstructor;
            color: StringConstructor;
            direction: {
                type: vue.PropType<"horizontal" | "vertical">;
                default: string;
                validator: (v: any) => boolean;
            };
            loading: (StringConstructor | BooleanConstructor)[];
            label: StringConstructor;
            prefix: StringConstructor;
            autofocus: BooleanConstructor;
            disabled: BooleanConstructor;
            readonly: BooleanConstructor;
            placeholder: StringConstructor;
            theme: StringConstructor;
            counter: vue.PropType<string | number | true>;
            messages: {
                type: vue.PropType<string | string[]>;
                default: () => never[];
            };
            density: {
                type: vue.PropType<Density>;
                default: string;
                validator: (v: any) => boolean;
            };
            variant: {
                type: vue.PropType<"filled" | "outlined" | "plain" | "underlined" | "solo">;
                default: string;
                validator: (v: any) => boolean;
            };
            modelValue: {
                type: vue.PropType<any>;
                default: any;
            };
            bgColor: StringConstructor;
            prependIcon: vue.PropType<IconValue>;
            appendIcon: vue.PropType<IconValue>;
            clearIcon: {
                type: vue.PropType<IconValue>;
                default: string;
            };
            prependInnerIcon: vue.PropType<IconValue>;
            'onClick:clear': vue.PropType<EventProp<(...args: any[]) => any>>;
            'onClick:append': vue.PropType<EventProp<(...args: any[]) => any>>;
            'onClick:prepend': vue.PropType<EventProp<(...args: any[]) => any>>;
            'onClick:appendInner': vue.PropType<EventProp<(...args: any[]) => any>>;
            'onClick:prependInner': vue.PropType<EventProp<(...args: any[]) => any>>;
            focused: BooleanConstructor;
            validateOn: vue.PropType<"input" | "blur" | "submit" | undefined>;
            errorMessages: {
                type: vue.PropType<string | string[]>;
                default: () => never[];
            };
            maxErrors: {
                type: (StringConstructor | NumberConstructor)[];
                default: number;
            };
            rules: {
                type: vue.PropType<ValidationRule[]>;
                default: () => never[];
            };
            hideDetails: vue.PropType<boolean | "auto">;
            clearable: BooleanConstructor;
            persistentClear: BooleanConstructor;
            singleLine: BooleanConstructor;
            hint: StringConstructor;
            persistentHint: BooleanConstructor;
            persistentPlaceholder: BooleanConstructor;
            persistentCounter: BooleanConstructor;
            suffix: StringConstructor;
            counterValue: vue.PropType<(value: any) => number>;
            items: {
                type: vue.PropType<any[]>;
                default: () => never[];
            };
            itemTitle: {
                type: vue.PropType<SelectItemKey>;
                default: string;
            };
            itemValue: {
                type: vue.PropType<SelectItemKey>;
                default: string;
            };
            itemChildren: Omit<{
                type: vue.PropType<SelectItemKey>;
                default: string;
            }, "type" | "default"> & {
                type: vue.PropType<NonNullable<SelectItemKey>>;
                default: NonNullable<SelectItemKey>;
            };
            itemProps: {
                type: vue.PropType<SelectItemKey>;
                default: string;
            };
            returnObject: BooleanConstructor;
            chips: BooleanConstructor;
            closableChips: BooleanConstructor;
            eager: BooleanConstructor;
            hideNoData: BooleanConstructor;
            hideSelected: BooleanConstructor;
            menu: BooleanConstructor;
            menuIcon: {
                type: vue.PropType<IconValue>;
                default: string;
            };
            menuProps: {
                type: vue.PropType<Partial<{
                    location: Anchor;
                    origin: "auto" | Anchor | "overlap";
                    transition: NonNullable<string | boolean | (vue.TransitionProps & {
                        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
                    })> | {
                        component: vue.DefineComponent<{} & {
                            target?: HTMLElement | undefined;
                        } & {
                            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                                default?: (() => vue.VNodeChild) | undefined;
                            };
                            'v-slots'?: {
                                default?: false | (() => vue.VNodeChild) | undefined;
                            } | undefined;
                        } & {
                            "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                        }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {} & {
                            target?: HTMLElement | undefined;
                        } & {
                            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                                default?: (() => vue.VNodeChild) | undefined;
                            };
                            'v-slots'?: {
                                default?: false | (() => vue.VNodeChild) | undefined;
                            } | undefined;
                        } & {
                            "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                        }, {}>;
                    };
                    zIndex: string | number;
                    eager: boolean;
                    disabled: boolean;
                    modelValue: boolean;
                    closeDelay: NonNullable<string | number>;
                    openDelay: NonNullable<string | number>;
                    activatorProps: Record<string, any>;
                    openOnClick: boolean;
                    openOnHover: boolean;
                    openOnFocus: boolean;
                    closeOnContentClick: boolean;
                    locationStrategy: NonNullable<"connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
                        updateLocation: (e: Event) => void;
                    } | undefined)>;
                    scrollStrategy: NonNullable<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition">;
                    closeOnBack: boolean;
                    contained: boolean;
                    noClickAnimation: boolean;
                    persistent: boolean;
                    scrim: NonNullable<string | boolean>;
                }> & Omit<{
                    location: Anchor;
                    origin: "auto" | Anchor | "overlap";
                    transition: NonNullable<string | boolean | (vue.TransitionProps & {
                        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
                    })> | {
                        component: vue.DefineComponent<{} & {
                            target?: HTMLElement | undefined;
                        } & {
                            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                                default?: (() => vue.VNodeChild) | undefined;
                            };
                            'v-slots'?: {
                                default?: false | (() => vue.VNodeChild) | undefined;
                            } | undefined;
                        } & {
                            "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                        }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {} & {
                            target?: HTMLElement | undefined;
                        } & {
                            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                                default?: (() => vue.VNodeChild) | undefined;
                            };
                            'v-slots'?: {
                                default?: false | (() => vue.VNodeChild) | undefined;
                            } | undefined;
                        } & {
                            "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                        }, {}>;
                    };
                    zIndex: string | number;
                    eager: boolean;
                    disabled: boolean;
                    modelValue: boolean;
                    closeDelay: NonNullable<string | number>;
                    openDelay: NonNullable<string | number>;
                    activatorProps: Record<string, any>;
                    openOnHover: boolean;
                    closeOnContentClick: boolean;
                    locationStrategy: NonNullable<"connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
                        updateLocation: (e: Event) => void;
                    } | undefined)>;
                    scrollStrategy: NonNullable<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition">;
                    closeOnBack: boolean;
                    contained: boolean;
                    noClickAnimation: boolean;
                    persistent: boolean;
                    scrim: NonNullable<string | boolean>;
                } & {
                    offset?: string | number | number[] | undefined;
                    id?: string | undefined;
                    height?: string | number | undefined;
                    width?: string | number | undefined;
                    maxHeight?: string | number | undefined;
                    maxWidth?: string | number | undefined;
                    minHeight?: string | number | undefined;
                    minWidth?: string | number | undefined;
                    theme?: string | undefined;
                    contentClass?: any;
                    activator?: string | Element | vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | undefined;
                    openOnClick?: boolean | undefined;
                    openOnFocus?: boolean | undefined;
                    contentProps?: any;
                    attach?: string | boolean | Element | undefined;
                } & {
                    $children?: {} | vue.VNodeChild | {
                        default?: ((args_0: {
                            isActive: vue.Ref<boolean>;
                        }) => vue.VNodeChild) | undefined;
                        activator?: ((args_0: {
                            isActive: boolean;
                            props: Record<string, any>;
                        }) => vue.VNodeChild) | undefined;
                    };
                    'v-slots'?: {
                        default?: false | ((args_0: {
                            isActive: vue.Ref<boolean>;
                        }) => vue.VNodeChild) | undefined;
                        activator?: false | ((args_0: {
                            isActive: boolean;
                            props: Record<string, any>;
                        }) => vue.VNodeChild) | undefined;
                    } | undefined;
                } & {
                    "v-slot:default"?: false | ((args_0: {
                        isActive: vue.Ref<boolean>;
                    }) => vue.VNodeChild) | undefined;
                    "v-slot:activator"?: false | ((args_0: {
                        isActive: boolean;
                        props: Record<string, any>;
                    }) => vue.VNodeChild) | undefined;
                } & {
                    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
                } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "location" | "origin" | "transition" | "zIndex" | "eager" | "disabled" | "modelValue" | "closeDelay" | "openDelay" | "activatorProps" | "openOnClick" | "openOnHover" | "openOnFocus" | "closeOnContentClick" | "locationStrategy" | "scrollStrategy" | "closeOnBack" | "contained" | "noClickAnimation" | "persistent" | "scrim">>;
            };
            multiple: BooleanConstructor;
            noDataText: {
                type: StringConstructor;
                default: string;
            };
            openOnClear: BooleanConstructor;
            valueComparator: {
                type: vue.PropType<typeof deepEqual>;
                default: typeof deepEqual;
            };
            customFilter: vue.PropType<FilterFunction>;
            customKeyFilter: vue.PropType<FilterKeyFunctions>;
            filterKeys: {
                type: vue.PropType<NonNullable<FilterKeys>>;
                default: NonNullable<FilterKeys>;
            };
            filterMode: {
                type: vue.PropType<FilterMode>;
                default: string;
            };
            noFilter: BooleanConstructor;
            search: StringConstructor;
        }, "multiple" | "$children" | "items" | "v-slots" | "v-slot:append" | "v-slot:prepend" | "modelValue" | "onUpdate:modelValue" | "v-slot:loader" | "v-slot:details" | "v-slot:clear" | "v-slot:label" | "v-slot:prepend-inner" | "v-slot:append-inner" | "v-slot:item" | "returnObject" | "v-slot:chip" | "v-slot:selection" | "v-slot:prepend-item" | "v-slot:append-item" | "v-slot:no-data">>> & {
            "onUpdate:menu"?: ((val: boolean) => any) | undefined;
            "onUpdate:search"?: ((val: any) => any) | undefined;
        } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "reverse" | "type" | "error" | "active" | "direction" | "transition" | "menu" | "autofocus" | "eager" | "disabled" | "readonly" | "noDataText" | "messages" | "density" | "variant" | "clearIcon" | "focused" | "errorMessages" | "maxErrors" | "rules" | "clearable" | "persistentClear" | "singleLine" | "persistentHint" | "persistentPlaceholder" | "persistentCounter" | "valueComparator" | "itemTitle" | "itemValue" | "itemChildren" | "itemProps" | "chips" | "closableChips" | "hideNoData" | "hideSelected" | "menuIcon" | "openOnClear" | "filterMode" | "noFilter" | "filterKeys">;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            [name: string]: vue.Slot | undefined;
        }>;
        $root: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null;
        $parent: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null;
        $emit: ((event: "update:menu", val: boolean) => void) & ((event: "update:search", val: any) => void);
        $el: any;
        $options: vue.ComponentOptionsBase<Readonly<vue.ExtractPropTypes<Omit<{
            transition: Omit<{
                type: vue.PropType<string | boolean | (vue.TransitionProps & {
                    component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
                })>;
                default: string;
                validator: (val: unknown) => boolean;
            }, "type" | "default"> & {
                type: vue.PropType<NonNullable<string | boolean | (vue.TransitionProps & {
                    component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
                })>>;
                default: NonNullable<string | boolean | (vue.TransitionProps & {
                    component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
                })>;
            };
            reverse: BooleanConstructor;
            type: {
                type: StringConstructor;
                default: string;
            };
            error: BooleanConstructor;
            id: StringConstructor;
            active: BooleanConstructor;
            name: StringConstructor;
            color: StringConstructor;
            direction: {
                type: vue.PropType<"horizontal" | "vertical">;
                default: string;
                validator: (v: any) => boolean;
            };
            loading: (StringConstructor | BooleanConstructor)[];
            label: StringConstructor;
            prefix: StringConstructor;
            autofocus: BooleanConstructor;
            disabled: BooleanConstructor;
            readonly: BooleanConstructor;
            placeholder: StringConstructor;
            theme: StringConstructor;
            counter: vue.PropType<string | number | true>;
            messages: {
                type: vue.PropType<string | string[]>;
                default: () => never[];
            };
            density: {
                type: vue.PropType<Density>;
                default: string;
                validator: (v: any) => boolean;
            };
            variant: {
                type: vue.PropType<"filled" | "outlined" | "plain" | "underlined" | "solo">;
                default: string;
                validator: (v: any) => boolean;
            };
            modelValue: {
                type: vue.PropType<any>;
                default: any;
            };
            bgColor: StringConstructor;
            prependIcon: vue.PropType<IconValue>;
            appendIcon: vue.PropType<IconValue>;
            clearIcon: {
                type: vue.PropType<IconValue>;
                default: string;
            };
            prependInnerIcon: vue.PropType<IconValue>;
            'onClick:clear': vue.PropType<EventProp<(...args: any[]) => any>>;
            'onClick:append': vue.PropType<EventProp<(...args: any[]) => any>>;
            'onClick:prepend': vue.PropType<EventProp<(...args: any[]) => any>>;
            'onClick:appendInner': vue.PropType<EventProp<(...args: any[]) => any>>;
            'onClick:prependInner': vue.PropType<EventProp<(...args: any[]) => any>>;
            focused: BooleanConstructor;
            validateOn: vue.PropType<"input" | "blur" | "submit" | undefined>;
            errorMessages: {
                type: vue.PropType<string | string[]>;
                default: () => never[];
            };
            maxErrors: {
                type: (StringConstructor | NumberConstructor)[];
                default: number;
            };
            rules: {
                type: vue.PropType<ValidationRule[]>;
                default: () => never[];
            };
            hideDetails: vue.PropType<boolean | "auto">;
            clearable: BooleanConstructor;
            persistentClear: BooleanConstructor;
            singleLine: BooleanConstructor;
            hint: StringConstructor;
            persistentHint: BooleanConstructor;
            persistentPlaceholder: BooleanConstructor;
            persistentCounter: BooleanConstructor;
            suffix: StringConstructor;
            counterValue: vue.PropType<(value: any) => number>;
            items: {
                type: vue.PropType<any[]>;
                default: () => never[];
            };
            itemTitle: {
                type: vue.PropType<SelectItemKey>;
                default: string;
            };
            itemValue: {
                type: vue.PropType<SelectItemKey>;
                default: string;
            };
            itemChildren: Omit<{
                type: vue.PropType<SelectItemKey>;
                default: string;
            }, "type" | "default"> & {
                type: vue.PropType<NonNullable<SelectItemKey>>;
                default: NonNullable<SelectItemKey>;
            };
            itemProps: {
                type: vue.PropType<SelectItemKey>;
                default: string;
            };
            returnObject: BooleanConstructor;
            chips: BooleanConstructor;
            closableChips: BooleanConstructor;
            eager: BooleanConstructor;
            hideNoData: BooleanConstructor;
            hideSelected: BooleanConstructor;
            menu: BooleanConstructor;
            menuIcon: {
                type: vue.PropType<IconValue>;
                default: string;
            };
            menuProps: {
                type: vue.PropType<Partial<{
                    location: Anchor;
                    origin: "auto" | Anchor | "overlap";
                    transition: NonNullable<string | boolean | (vue.TransitionProps & {
                        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
                    })> | {
                        component: vue.DefineComponent<{} & {
                            target?: HTMLElement | undefined;
                        } & {
                            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                                default?: (() => vue.VNodeChild) | undefined;
                            };
                            'v-slots'?: {
                                default?: false | (() => vue.VNodeChild) | undefined;
                            } | undefined;
                        } & {
                            "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                        }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {} & {
                            target?: HTMLElement | undefined;
                        } & {
                            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                                default?: (() => vue.VNodeChild) | undefined;
                            };
                            'v-slots'?: {
                                default?: false | (() => vue.VNodeChild) | undefined;
                            } | undefined;
                        } & {
                            "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                        }, {}>;
                    };
                    zIndex: string | number;
                    eager: boolean;
                    disabled: boolean;
                    modelValue: boolean;
                    closeDelay: NonNullable<string | number>;
                    openDelay: NonNullable<string | number>;
                    activatorProps: Record<string, any>;
                    openOnClick: boolean;
                    openOnHover: boolean;
                    openOnFocus: boolean;
                    closeOnContentClick: boolean;
                    locationStrategy: NonNullable<"connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
                        updateLocation: (e: Event) => void;
                    } | undefined)>;
                    scrollStrategy: NonNullable<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition">;
                    closeOnBack: boolean;
                    contained: boolean;
                    noClickAnimation: boolean;
                    persistent: boolean;
                    scrim: NonNullable<string | boolean>;
                }> & Omit<{
                    location: Anchor;
                    origin: "auto" | Anchor | "overlap";
                    transition: NonNullable<string | boolean | (vue.TransitionProps & {
                        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
                    })> | {
                        component: vue.DefineComponent<{} & {
                            target?: HTMLElement | undefined;
                        } & {
                            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                                default?: (() => vue.VNodeChild) | undefined;
                            };
                            'v-slots'?: {
                                default?: false | (() => vue.VNodeChild) | undefined;
                            } | undefined;
                        } & {
                            "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                        }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {} & {
                            target?: HTMLElement | undefined;
                        } & {
                            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                                default?: (() => vue.VNodeChild) | undefined;
                            };
                            'v-slots'?: {
                                default?: false | (() => vue.VNodeChild) | undefined;
                            } | undefined;
                        } & {
                            "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                        }, {}>;
                    };
                    zIndex: string | number;
                    eager: boolean;
                    disabled: boolean;
                    modelValue: boolean;
                    closeDelay: NonNullable<string | number>;
                    openDelay: NonNullable<string | number>;
                    activatorProps: Record<string, any>;
                    openOnHover: boolean;
                    closeOnContentClick: boolean;
                    locationStrategy: NonNullable<"connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
                        updateLocation: (e: Event) => void;
                    } | undefined)>;
                    scrollStrategy: NonNullable<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition">;
                    closeOnBack: boolean;
                    contained: boolean;
                    noClickAnimation: boolean;
                    persistent: boolean;
                    scrim: NonNullable<string | boolean>;
                } & {
                    offset?: string | number | number[] | undefined;
                    id?: string | undefined;
                    height?: string | number | undefined;
                    width?: string | number | undefined;
                    maxHeight?: string | number | undefined;
                    maxWidth?: string | number | undefined;
                    minHeight?: string | number | undefined;
                    minWidth?: string | number | undefined;
                    theme?: string | undefined;
                    contentClass?: any;
                    activator?: string | Element | vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | undefined;
                    openOnClick?: boolean | undefined;
                    openOnFocus?: boolean | undefined;
                    contentProps?: any;
                    attach?: string | boolean | Element | undefined;
                } & {
                    $children?: {} | vue.VNodeChild | {
                        default?: ((args_0: {
                            isActive: vue.Ref<boolean>;
                        }) => vue.VNodeChild) | undefined;
                        activator?: ((args_0: {
                            isActive: boolean;
                            props: Record<string, any>;
                        }) => vue.VNodeChild) | undefined;
                    };
                    'v-slots'?: {
                        default?: false | ((args_0: {
                            isActive: vue.Ref<boolean>;
                        }) => vue.VNodeChild) | undefined;
                        activator?: false | ((args_0: {
                            isActive: boolean;
                            props: Record<string, any>;
                        }) => vue.VNodeChild) | undefined;
                    } | undefined;
                } & {
                    "v-slot:default"?: false | ((args_0: {
                        isActive: vue.Ref<boolean>;
                    }) => vue.VNodeChild) | undefined;
                    "v-slot:activator"?: false | ((args_0: {
                        isActive: boolean;
                        props: Record<string, any>;
                    }) => vue.VNodeChild) | undefined;
                } & {
                    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
                } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "location" | "origin" | "transition" | "zIndex" | "eager" | "disabled" | "modelValue" | "closeDelay" | "openDelay" | "activatorProps" | "openOnClick" | "openOnHover" | "openOnFocus" | "closeOnContentClick" | "locationStrategy" | "scrollStrategy" | "closeOnBack" | "contained" | "noClickAnimation" | "persistent" | "scrim">>;
            };
            multiple: BooleanConstructor;
            noDataText: {
                type: StringConstructor;
                default: string;
            };
            openOnClear: BooleanConstructor;
            valueComparator: {
                type: vue.PropType<typeof deepEqual>;
                default: typeof deepEqual;
            };
            customFilter: vue.PropType<FilterFunction>;
            customKeyFilter: vue.PropType<FilterKeyFunctions>;
            filterKeys: {
                type: vue.PropType<NonNullable<FilterKeys>>;
                default: NonNullable<FilterKeys>;
            };
            filterMode: {
                type: vue.PropType<FilterMode>;
                default: string;
            };
            noFilter: BooleanConstructor;
            search: StringConstructor;
        }, "multiple" | "$children" | "items" | "v-slots" | "v-slot:append" | "v-slot:prepend" | "modelValue" | "onUpdate:modelValue" | "v-slot:loader" | "v-slot:details" | "v-slot:clear" | "v-slot:label" | "v-slot:prepend-inner" | "v-slot:append-inner" | "v-slot:item" | "returnObject" | "v-slot:chip" | "v-slot:selection" | "v-slot:prepend-item" | "v-slot:append-item" | "v-slot:no-data">>> & {
            "onUpdate:menu"?: ((val: boolean) => any) | undefined;
            "onUpdate:search"?: ((val: any) => any) | undefined;
        }, {
            isFocused: vue.Ref<boolean>;
            isPristine: vue.Ref<boolean>;
            menu: vue.WritableComputedRef<boolean>;
            search: vue.Ref<string | undefined> & {
                readonly externalValue: string | undefined;
            };
            filteredItems: vue.Ref<InternalItem<any>[]>;
            select: (item: InternalItem) => void;
        } & Omit<any, string | number | symbol>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Omit<{
            'update:search': (val: any) => true;
            'update:modelValue': (val: any) => boolean;
            'update:menu': (val: boolean) => true;
        }, "multiple" | "$children" | "items" | "v-slots" | "v-slot:append" | "v-slot:prepend" | "modelValue" | "update:modelValue" | "v-slot:loader" | "v-slot:details" | "v-slot:clear" | "v-slot:label" | "v-slot:prepend-inner" | "v-slot:append-inner" | "v-slot:item" | "returnObject" | "v-slot:chip" | "v-slot:selection" | "v-slot:prepend-item" | "v-slot:append-item" | "v-slot:no-data">, string, {
            reverse: boolean;
            type: string;
            error: boolean;
            active: boolean;
            direction: "horizontal" | "vertical";
            transition: NonNullable<string | boolean | (vue.TransitionProps & {
                component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
            })>;
            menu: boolean;
            autofocus: boolean;
            eager: boolean;
            disabled: boolean;
            readonly: boolean;
            noDataText: string;
            messages: string | string[];
            density: Density;
            variant: "filled" | "outlined" | "plain" | "underlined" | "solo";
            clearIcon: IconValue;
            focused: boolean;
            errorMessages: string | string[];
            maxErrors: string | number;
            rules: ValidationRule[];
            clearable: boolean;
            persistentClear: boolean;
            singleLine: boolean;
            persistentHint: boolean;
            persistentPlaceholder: boolean;
            persistentCounter: boolean;
            valueComparator: typeof deepEqual;
            itemTitle: SelectItemKey;
            itemValue: SelectItemKey;
            itemChildren: NonNullable<SelectItemKey>;
            itemProps: SelectItemKey;
            chips: boolean;
            closableChips: boolean;
            hideNoData: boolean;
            hideSelected: boolean;
            menuIcon: IconValue;
            openOnClear: boolean;
            filterMode: FilterMode;
            noFilter: boolean;
            filterKeys: NonNullable<FilterKeys>;
        }, {}, string> & {
            beforeCreate?: ((() => void) | (() => void)[]) | undefined;
            created?: ((() => void) | (() => void)[]) | undefined;
            beforeMount?: ((() => void) | (() => void)[]) | undefined;
            mounted?: ((() => void) | (() => void)[]) | undefined;
            beforeUpdate?: ((() => void) | (() => void)[]) | undefined;
            updated?: ((() => void) | (() => void)[]) | undefined;
            activated?: ((() => void) | (() => void)[]) | undefined;
            deactivated?: ((() => void) | (() => void)[]) | undefined;
            beforeDestroy?: ((() => void) | (() => void)[]) | undefined;
            beforeUnmount?: ((() => void) | (() => void)[]) | undefined;
            destroyed?: ((() => void) | (() => void)[]) | undefined;
            unmounted?: ((() => void) | (() => void)[]) | undefined;
            renderTracked?: (((e: vue.DebuggerEvent) => void) | ((e: vue.DebuggerEvent) => void)[]) | undefined;
            renderTriggered?: (((e: vue.DebuggerEvent) => void) | ((e: vue.DebuggerEvent) => void)[]) | undefined;
            errorCaptured?: (((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null, info: string) => boolean | void) | ((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null, info: string) => boolean | void)[]) | undefined;
        };
        $forceUpdate: () => void;
        $nextTick: typeof nextTick;
        $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (args_0: R, args_1: R) => any : (...args: any) => any, options?: vue.WatchOptions<boolean> | undefined): vue.WatchStopHandle;
    } & Readonly<vue.ExtractPropTypes<Omit<{
        transition: Omit<{
            type: vue.PropType<string | boolean | (vue.TransitionProps & {
                component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
            })>;
            default: string;
            validator: (val: unknown) => boolean;
        }, "type" | "default"> & {
            type: vue.PropType<NonNullable<string | boolean | (vue.TransitionProps & {
                component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
            })>>;
            default: NonNullable<string | boolean | (vue.TransitionProps & {
                component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
            })>;
        };
        reverse: BooleanConstructor;
        type: {
            type: StringConstructor;
            default: string;
        };
        error: BooleanConstructor;
        id: StringConstructor;
        active: BooleanConstructor;
        name: StringConstructor;
        color: StringConstructor;
        direction: {
            type: vue.PropType<"horizontal" | "vertical">;
            default: string;
            validator: (v: any) => boolean;
        };
        loading: (StringConstructor | BooleanConstructor)[];
        label: StringConstructor;
        prefix: StringConstructor;
        autofocus: BooleanConstructor;
        disabled: BooleanConstructor;
        readonly: BooleanConstructor;
        placeholder: StringConstructor;
        theme: StringConstructor;
        counter: vue.PropType<string | number | true>;
        messages: {
            type: vue.PropType<string | string[]>;
            default: () => never[];
        };
        density: {
            type: vue.PropType<Density>;
            default: string;
            validator: (v: any) => boolean;
        };
        variant: {
            type: vue.PropType<"filled" | "outlined" | "plain" | "underlined" | "solo">;
            default: string;
            validator: (v: any) => boolean;
        };
        modelValue: {
            type: vue.PropType<any>;
            default: any;
        };
        bgColor: StringConstructor;
        prependIcon: vue.PropType<IconValue>;
        appendIcon: vue.PropType<IconValue>;
        clearIcon: {
            type: vue.PropType<IconValue>;
            default: string;
        };
        prependInnerIcon: vue.PropType<IconValue>;
        'onClick:clear': vue.PropType<EventProp<(...args: any[]) => any>>;
        'onClick:append': vue.PropType<EventProp<(...args: any[]) => any>>;
        'onClick:prepend': vue.PropType<EventProp<(...args: any[]) => any>>;
        'onClick:appendInner': vue.PropType<EventProp<(...args: any[]) => any>>;
        'onClick:prependInner': vue.PropType<EventProp<(...args: any[]) => any>>;
        focused: BooleanConstructor;
        validateOn: vue.PropType<"input" | "blur" | "submit" | undefined>;
        errorMessages: {
            type: vue.PropType<string | string[]>;
            default: () => never[];
        };
        maxErrors: {
            type: (StringConstructor | NumberConstructor)[];
            default: number;
        };
        rules: {
            type: vue.PropType<ValidationRule[]>;
            default: () => never[];
        };
        hideDetails: vue.PropType<boolean | "auto">;
        clearable: BooleanConstructor;
        persistentClear: BooleanConstructor;
        singleLine: BooleanConstructor;
        hint: StringConstructor;
        persistentHint: BooleanConstructor;
        persistentPlaceholder: BooleanConstructor;
        persistentCounter: BooleanConstructor;
        suffix: StringConstructor;
        counterValue: vue.PropType<(value: any) => number>;
        items: {
            type: vue.PropType<any[]>;
            default: () => never[];
        };
        itemTitle: {
            type: vue.PropType<SelectItemKey>;
            default: string;
        };
        itemValue: {
            type: vue.PropType<SelectItemKey>;
            default: string;
        };
        itemChildren: Omit<{
            type: vue.PropType<SelectItemKey>;
            default: string;
        }, "type" | "default"> & {
            type: vue.PropType<NonNullable<SelectItemKey>>;
            default: NonNullable<SelectItemKey>;
        };
        itemProps: {
            type: vue.PropType<SelectItemKey>;
            default: string;
        };
        returnObject: BooleanConstructor;
        chips: BooleanConstructor;
        closableChips: BooleanConstructor;
        eager: BooleanConstructor;
        hideNoData: BooleanConstructor;
        hideSelected: BooleanConstructor;
        menu: BooleanConstructor;
        menuIcon: {
            type: vue.PropType<IconValue>;
            default: string;
        };
        menuProps: {
            type: vue.PropType<Partial<{
                location: Anchor;
                origin: "auto" | Anchor | "overlap";
                transition: NonNullable<string | boolean | (vue.TransitionProps & {
                    component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
                })> | {
                    component: vue.DefineComponent<{} & {
                        target?: HTMLElement | undefined;
                    } & {
                        $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                            default?: (() => vue.VNodeChild) | undefined;
                        };
                        'v-slots'?: {
                            default?: false | (() => vue.VNodeChild) | undefined;
                        } | undefined;
                    } & {
                        "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                    }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {} & {
                        target?: HTMLElement | undefined;
                    } & {
                        $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                            default?: (() => vue.VNodeChild) | undefined;
                        };
                        'v-slots'?: {
                            default?: false | (() => vue.VNodeChild) | undefined;
                        } | undefined;
                    } & {
                        "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                    }, {}>;
                };
                zIndex: string | number;
                eager: boolean;
                disabled: boolean;
                modelValue: boolean;
                closeDelay: NonNullable<string | number>;
                openDelay: NonNullable<string | number>;
                activatorProps: Record<string, any>;
                openOnClick: boolean;
                openOnHover: boolean;
                openOnFocus: boolean;
                closeOnContentClick: boolean;
                locationStrategy: NonNullable<"connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
                    updateLocation: (e: Event) => void;
                } | undefined)>;
                scrollStrategy: NonNullable<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition">;
                closeOnBack: boolean;
                contained: boolean;
                noClickAnimation: boolean;
                persistent: boolean;
                scrim: NonNullable<string | boolean>;
            }> & Omit<{
                location: Anchor;
                origin: "auto" | Anchor | "overlap";
                transition: NonNullable<string | boolean | (vue.TransitionProps & {
                    component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
                })> | {
                    component: vue.DefineComponent<{} & {
                        target?: HTMLElement | undefined;
                    } & {
                        $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                            default?: (() => vue.VNodeChild) | undefined;
                        };
                        'v-slots'?: {
                            default?: false | (() => vue.VNodeChild) | undefined;
                        } | undefined;
                    } & {
                        "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                    }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {} & {
                        target?: HTMLElement | undefined;
                    } & {
                        $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                            default?: (() => vue.VNodeChild) | undefined;
                        };
                        'v-slots'?: {
                            default?: false | (() => vue.VNodeChild) | undefined;
                        } | undefined;
                    } & {
                        "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                    }, {}>;
                };
                zIndex: string | number;
                eager: boolean;
                disabled: boolean;
                modelValue: boolean;
                closeDelay: NonNullable<string | number>;
                openDelay: NonNullable<string | number>;
                activatorProps: Record<string, any>;
                openOnHover: boolean;
                closeOnContentClick: boolean;
                locationStrategy: NonNullable<"connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
                    updateLocation: (e: Event) => void;
                } | undefined)>;
                scrollStrategy: NonNullable<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition">;
                closeOnBack: boolean;
                contained: boolean;
                noClickAnimation: boolean;
                persistent: boolean;
                scrim: NonNullable<string | boolean>;
            } & {
                offset?: string | number | number[] | undefined;
                id?: string | undefined;
                height?: string | number | undefined;
                width?: string | number | undefined;
                maxHeight?: string | number | undefined;
                maxWidth?: string | number | undefined;
                minHeight?: string | number | undefined;
                minWidth?: string | number | undefined;
                theme?: string | undefined;
                contentClass?: any;
                activator?: string | Element | vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | undefined;
                openOnClick?: boolean | undefined;
                openOnFocus?: boolean | undefined;
                contentProps?: any;
                attach?: string | boolean | Element | undefined;
            } & {
                $children?: {} | vue.VNodeChild | {
                    default?: ((args_0: {
                        isActive: vue.Ref<boolean>;
                    }) => vue.VNodeChild) | undefined;
                    activator?: ((args_0: {
                        isActive: boolean;
                        props: Record<string, any>;
                    }) => vue.VNodeChild) | undefined;
                };
                'v-slots'?: {
                    default?: false | ((args_0: {
                        isActive: vue.Ref<boolean>;
                    }) => vue.VNodeChild) | undefined;
                    activator?: false | ((args_0: {
                        isActive: boolean;
                        props: Record<string, any>;
                    }) => vue.VNodeChild) | undefined;
                } | undefined;
            } & {
                "v-slot:default"?: false | ((args_0: {
                    isActive: vue.Ref<boolean>;
                }) => vue.VNodeChild) | undefined;
                "v-slot:activator"?: false | ((args_0: {
                    isActive: boolean;
                    props: Record<string, any>;
                }) => vue.VNodeChild) | undefined;
            } & {
                "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
            } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "location" | "origin" | "transition" | "zIndex" | "eager" | "disabled" | "modelValue" | "closeDelay" | "openDelay" | "activatorProps" | "openOnClick" | "openOnHover" | "openOnFocus" | "closeOnContentClick" | "locationStrategy" | "scrollStrategy" | "closeOnBack" | "contained" | "noClickAnimation" | "persistent" | "scrim">>;
        };
        multiple: BooleanConstructor;
        noDataText: {
            type: StringConstructor;
            default: string;
        };
        openOnClear: BooleanConstructor;
        valueComparator: {
            type: vue.PropType<typeof deepEqual>;
            default: typeof deepEqual;
        };
        customFilter: vue.PropType<FilterFunction>;
        customKeyFilter: vue.PropType<FilterKeyFunctions>;
        filterKeys: {
            type: vue.PropType<NonNullable<FilterKeys>>;
            default: NonNullable<FilterKeys>;
        };
        filterMode: {
            type: vue.PropType<FilterMode>;
            default: string;
        };
        noFilter: BooleanConstructor;
        search: StringConstructor;
    }, "multiple" | "$children" | "items" | "v-slots" | "v-slot:append" | "v-slot:prepend" | "modelValue" | "onUpdate:modelValue" | "v-slot:loader" | "v-slot:details" | "v-slot:clear" | "v-slot:label" | "v-slot:prepend-inner" | "v-slot:append-inner" | "v-slot:item" | "returnObject" | "v-slot:chip" | "v-slot:selection" | "v-slot:prepend-item" | "v-slot:append-item" | "v-slot:no-data">>> & {
        "onUpdate:menu"?: ((val: boolean) => any) | undefined;
        "onUpdate:search"?: ((val: any) => any) | undefined;
    } & vue.ShallowUnwrapRef<{
        isFocused: vue.Ref<boolean>;
        isPristine: vue.Ref<boolean>;
        menu: vue.WritableComputedRef<boolean>;
        search: vue.Ref<string | undefined> & {
            readonly externalValue: string | undefined;
        };
        filteredItems: vue.Ref<InternalItem<any>[]>;
        select: (item: InternalItem) => void;
    } & Omit<any, string | number | symbol>> & {} & vue.ComponentCustomProperties & {};
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & vue.ComponentOptionsBase<Readonly<vue.ExtractPropTypes<Omit<{
    transition: Omit<{
        type: vue.PropType<string | boolean | (vue.TransitionProps & {
            component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
        })>;
        default: string;
        validator: (val: unknown) => boolean;
    }, "type" | "default"> & {
        type: vue.PropType<NonNullable<string | boolean | (vue.TransitionProps & {
            component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
        })>>;
        default: NonNullable<string | boolean | (vue.TransitionProps & {
            component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
        })>;
    };
    reverse: BooleanConstructor;
    type: {
        type: StringConstructor;
        default: string;
    };
    error: BooleanConstructor;
    id: StringConstructor;
    active: BooleanConstructor;
    name: StringConstructor;
    color: StringConstructor;
    direction: {
        type: vue.PropType<"horizontal" | "vertical">;
        default: string;
        validator: (v: any) => boolean;
    };
    loading: (StringConstructor | BooleanConstructor)[];
    label: StringConstructor;
    prefix: StringConstructor;
    autofocus: BooleanConstructor;
    disabled: BooleanConstructor;
    readonly: BooleanConstructor;
    placeholder: StringConstructor;
    theme: StringConstructor;
    counter: vue.PropType<string | number | true>;
    messages: {
        type: vue.PropType<string | string[]>;
        default: () => never[];
    };
    density: {
        type: vue.PropType<Density>;
        default: string;
        validator: (v: any) => boolean;
    };
    variant: {
        type: vue.PropType<"filled" | "outlined" | "plain" | "underlined" | "solo">;
        default: string;
        validator: (v: any) => boolean;
    };
    modelValue: {
        type: vue.PropType<any>;
        default: any;
    };
    bgColor: StringConstructor;
    prependIcon: vue.PropType<IconValue>;
    appendIcon: vue.PropType<IconValue>;
    clearIcon: {
        type: vue.PropType<IconValue>;
        default: string;
    };
    prependInnerIcon: vue.PropType<IconValue>;
    'onClick:clear': vue.PropType<EventProp<(...args: any[]) => any>>;
    'onClick:append': vue.PropType<EventProp<(...args: any[]) => any>>;
    'onClick:prepend': vue.PropType<EventProp<(...args: any[]) => any>>;
    'onClick:appendInner': vue.PropType<EventProp<(...args: any[]) => any>>;
    'onClick:prependInner': vue.PropType<EventProp<(...args: any[]) => any>>;
    focused: BooleanConstructor;
    validateOn: vue.PropType<"input" | "blur" | "submit" | undefined>;
    errorMessages: {
        type: vue.PropType<string | string[]>;
        default: () => never[];
    };
    maxErrors: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    rules: {
        type: vue.PropType<ValidationRule[]>;
        default: () => never[];
    };
    hideDetails: vue.PropType<boolean | "auto">;
    clearable: BooleanConstructor;
    persistentClear: BooleanConstructor;
    singleLine: BooleanConstructor;
    hint: StringConstructor;
    persistentHint: BooleanConstructor;
    persistentPlaceholder: BooleanConstructor;
    persistentCounter: BooleanConstructor;
    suffix: StringConstructor;
    counterValue: vue.PropType<(value: any) => number>;
    items: {
        type: vue.PropType<any[]>;
        default: () => never[];
    };
    itemTitle: {
        type: vue.PropType<SelectItemKey>;
        default: string;
    };
    itemValue: {
        type: vue.PropType<SelectItemKey>;
        default: string;
    };
    itemChildren: Omit<{
        type: vue.PropType<SelectItemKey>;
        default: string;
    }, "type" | "default"> & {
        type: vue.PropType<NonNullable<SelectItemKey>>;
        default: NonNullable<SelectItemKey>;
    };
    itemProps: {
        type: vue.PropType<SelectItemKey>;
        default: string;
    };
    returnObject: BooleanConstructor;
    chips: BooleanConstructor;
    closableChips: BooleanConstructor;
    eager: BooleanConstructor;
    hideNoData: BooleanConstructor;
    hideSelected: BooleanConstructor;
    menu: BooleanConstructor;
    menuIcon: {
        type: vue.PropType<IconValue>;
        default: string;
    };
    menuProps: {
        type: vue.PropType<Partial<{
            location: Anchor;
            origin: "auto" | Anchor | "overlap";
            transition: NonNullable<string | boolean | (vue.TransitionProps & {
                component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
            })> | {
                component: vue.DefineComponent<{} & {
                    target?: HTMLElement | undefined;
                } & {
                    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                        default?: (() => vue.VNodeChild) | undefined;
                    };
                    'v-slots'?: {
                        default?: false | (() => vue.VNodeChild) | undefined;
                    } | undefined;
                } & {
                    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {} & {
                    target?: HTMLElement | undefined;
                } & {
                    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                        default?: (() => vue.VNodeChild) | undefined;
                    };
                    'v-slots'?: {
                        default?: false | (() => vue.VNodeChild) | undefined;
                    } | undefined;
                } & {
                    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                }, {}>;
            };
            zIndex: string | number;
            eager: boolean;
            disabled: boolean;
            modelValue: boolean;
            closeDelay: NonNullable<string | number>;
            openDelay: NonNullable<string | number>;
            activatorProps: Record<string, any>;
            openOnClick: boolean;
            openOnHover: boolean;
            openOnFocus: boolean;
            closeOnContentClick: boolean;
            locationStrategy: NonNullable<"connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
                updateLocation: (e: Event) => void;
            } | undefined)>;
            scrollStrategy: NonNullable<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition">;
            closeOnBack: boolean;
            contained: boolean;
            noClickAnimation: boolean;
            persistent: boolean;
            scrim: NonNullable<string | boolean>;
        }> & Omit<{
            location: Anchor;
            origin: "auto" | Anchor | "overlap";
            transition: NonNullable<string | boolean | (vue.TransitionProps & {
                component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
            })> | {
                component: vue.DefineComponent<{} & {
                    target?: HTMLElement | undefined;
                } & {
                    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                        default?: (() => vue.VNodeChild) | undefined;
                    };
                    'v-slots'?: {
                        default?: false | (() => vue.VNodeChild) | undefined;
                    } | undefined;
                } & {
                    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {} & {
                    target?: HTMLElement | undefined;
                } & {
                    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                        default?: (() => vue.VNodeChild) | undefined;
                    };
                    'v-slots'?: {
                        default?: false | (() => vue.VNodeChild) | undefined;
                    } | undefined;
                } & {
                    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                }, {}>;
            };
            zIndex: string | number;
            eager: boolean;
            disabled: boolean;
            modelValue: boolean;
            closeDelay: NonNullable<string | number>;
            openDelay: NonNullable<string | number>;
            activatorProps: Record<string, any>;
            openOnHover: boolean;
            closeOnContentClick: boolean;
            locationStrategy: NonNullable<"connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
                updateLocation: (e: Event) => void;
            } | undefined)>;
            scrollStrategy: NonNullable<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition">;
            closeOnBack: boolean;
            contained: boolean;
            noClickAnimation: boolean;
            persistent: boolean;
            scrim: NonNullable<string | boolean>;
        } & {
            offset?: string | number | number[] | undefined;
            id?: string | undefined;
            height?: string | number | undefined;
            width?: string | number | undefined;
            maxHeight?: string | number | undefined;
            maxWidth?: string | number | undefined;
            minHeight?: string | number | undefined;
            minWidth?: string | number | undefined;
            theme?: string | undefined;
            contentClass?: any;
            activator?: string | Element | vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | undefined;
            openOnClick?: boolean | undefined;
            openOnFocus?: boolean | undefined;
            contentProps?: any;
            attach?: string | boolean | Element | undefined;
        } & {
            $children?: {} | vue.VNodeChild | {
                default?: ((args_0: {
                    isActive: vue.Ref<boolean>;
                }) => vue.VNodeChild) | undefined;
                activator?: ((args_0: {
                    isActive: boolean;
                    props: Record<string, any>;
                }) => vue.VNodeChild) | undefined;
            };
            'v-slots'?: {
                default?: false | ((args_0: {
                    isActive: vue.Ref<boolean>;
                }) => vue.VNodeChild) | undefined;
                activator?: false | ((args_0: {
                    isActive: boolean;
                    props: Record<string, any>;
                }) => vue.VNodeChild) | undefined;
            } | undefined;
        } & {
            "v-slot:default"?: false | ((args_0: {
                isActive: vue.Ref<boolean>;
            }) => vue.VNodeChild) | undefined;
            "v-slot:activator"?: false | ((args_0: {
                isActive: boolean;
                props: Record<string, any>;
            }) => vue.VNodeChild) | undefined;
        } & {
            "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
        } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "location" | "origin" | "transition" | "zIndex" | "eager" | "disabled" | "modelValue" | "closeDelay" | "openDelay" | "activatorProps" | "openOnClick" | "openOnHover" | "openOnFocus" | "closeOnContentClick" | "locationStrategy" | "scrollStrategy" | "closeOnBack" | "contained" | "noClickAnimation" | "persistent" | "scrim">>;
    };
    multiple: BooleanConstructor;
    noDataText: {
        type: StringConstructor;
        default: string;
    };
    openOnClear: BooleanConstructor;
    valueComparator: {
        type: vue.PropType<typeof deepEqual>;
        default: typeof deepEqual;
    };
    customFilter: vue.PropType<FilterFunction>;
    customKeyFilter: vue.PropType<FilterKeyFunctions>;
    filterKeys: {
        type: vue.PropType<NonNullable<FilterKeys>>;
        default: NonNullable<FilterKeys>;
    };
    filterMode: {
        type: vue.PropType<FilterMode>;
        default: string;
    };
    noFilter: BooleanConstructor;
    search: StringConstructor;
}, "multiple" | "$children" | "items" | "v-slots" | "v-slot:append" | "v-slot:prepend" | "modelValue" | "onUpdate:modelValue" | "v-slot:loader" | "v-slot:details" | "v-slot:clear" | "v-slot:label" | "v-slot:prepend-inner" | "v-slot:append-inner" | "v-slot:item" | "returnObject" | "v-slot:chip" | "v-slot:selection" | "v-slot:prepend-item" | "v-slot:append-item" | "v-slot:no-data">>> & {
    "onUpdate:menu"?: ((val: boolean) => any) | undefined;
    "onUpdate:search"?: ((val: any) => any) | undefined;
}, {
    isFocused: vue.Ref<boolean>;
    isPristine: vue.Ref<boolean>;
    menu: vue.WritableComputedRef<boolean>;
    search: vue.Ref<string | undefined> & {
        readonly externalValue: string | undefined;
    };
    filteredItems: vue.Ref<InternalItem<any>[]>;
    select: (item: InternalItem) => void;
} & Omit<any, string | number | symbol>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Omit<{
    'update:search': (val: any) => true;
    'update:modelValue': (val: any) => boolean;
    'update:menu': (val: boolean) => true;
}, "multiple" | "$children" | "items" | "v-slots" | "v-slot:append" | "v-slot:prepend" | "modelValue" | "update:modelValue" | "v-slot:loader" | "v-slot:details" | "v-slot:clear" | "v-slot:label" | "v-slot:prepend-inner" | "v-slot:append-inner" | "v-slot:item" | "returnObject" | "v-slot:chip" | "v-slot:selection" | "v-slot:prepend-item" | "v-slot:append-item" | "v-slot:no-data">, string, {
    reverse: boolean;
    type: string;
    error: boolean;
    active: boolean;
    direction: "horizontal" | "vertical";
    transition: NonNullable<string | boolean | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    })>;
    menu: boolean;
    autofocus: boolean;
    eager: boolean;
    disabled: boolean;
    readonly: boolean;
    noDataText: string;
    messages: string | string[];
    density: Density;
    variant: "filled" | "outlined" | "plain" | "underlined" | "solo";
    clearIcon: IconValue;
    focused: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    clearable: boolean;
    persistentClear: boolean;
    singleLine: boolean;
    persistentHint: boolean;
    persistentPlaceholder: boolean;
    persistentCounter: boolean;
    valueComparator: typeof deepEqual;
    itemTitle: SelectItemKey;
    itemValue: SelectItemKey;
    itemChildren: NonNullable<SelectItemKey>;
    itemProps: SelectItemKey;
    chips: boolean;
    closableChips: boolean;
    hideNoData: boolean;
    hideSelected: boolean;
    menuIcon: IconValue;
    openOnClear: boolean;
    filterMode: FilterMode;
    noFilter: boolean;
    filterKeys: NonNullable<FilterKeys>;
}, {}, string> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & (new <T_1, ReturnObject extends boolean = false, Multiple extends boolean = false, V extends Value$2<T_1, ReturnObject, Multiple> = Value$2<T_1, ReturnObject, Multiple>>() => {
    $props: {
        items?: readonly T_1[] | undefined;
        returnObject?: ReturnObject | undefined;
        multiple?: Multiple | undefined;
        modelValue?: V | undefined;
        'onUpdate:modelValue'?: ((val: V) => void) | undefined;
    } & {
        $children?: {} | vue.VNodeChild | {
            clear?: (() => vue.VNodeChild) | undefined;
            details?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            label?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
            append?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            prepend?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            loader?: ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
            'prepend-inner'?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
            'append-inner'?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
            item?: ((args_0: {
                item: InternalItem<T_1>;
                index: number;
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            chip?: ((args_0: {
                item: InternalItem<T_1>;
                index: number;
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            selection?: ((args_0: {
                item: InternalItem<T_1>;
                index: number;
            }) => vue.VNodeChild) | undefined;
            'prepend-item'?: (() => vue.VNodeChild) | undefined;
            'append-item'?: (() => vue.VNodeChild) | undefined;
            'no-data'?: (() => vue.VNodeChild) | undefined;
        };
        'v-slots'?: {
            clear?: false | (() => vue.VNodeChild) | undefined;
            details?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            label?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
            append?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            prepend?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            loader?: false | ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
            'prepend-inner'?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
            'append-inner'?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
            item?: false | ((args_0: {
                item: InternalItem<T_1>;
                index: number;
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            chip?: false | ((args_0: {
                item: InternalItem<T_1>;
                index: number;
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            selection?: false | ((args_0: {
                item: InternalItem<T_1>;
                index: number;
            }) => vue.VNodeChild) | undefined;
            'prepend-item'?: false | (() => vue.VNodeChild) | undefined;
            'append-item'?: false | (() => vue.VNodeChild) | undefined;
            'no-data'?: false | (() => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:clear"?: false | (() => vue.VNodeChild) | undefined;
        "v-slot:details"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:label"?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:append"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:prepend"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:loader"?: false | ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
        "v-slot:prepend-inner"?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:append-inner"?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:item"?: false | ((args_0: {
            item: InternalItem<T_1>;
            index: number;
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        "v-slot:chip"?: false | ((args_0: {
            item: InternalItem<T_1>;
            index: number;
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        "v-slot:selection"?: false | ((args_0: {
            item: InternalItem<T_1>;
            index: number;
        }) => vue.VNodeChild) | undefined;
        "v-slot:prepend-item"?: false | (() => vue.VNodeChild) | undefined;
        "v-slot:append-item"?: false | (() => vue.VNodeChild) | undefined;
        "v-slot:no-data"?: false | (() => vue.VNodeChild) | undefined;
    };
});
type VAutocomplete = InstanceType<typeof VAutocomplete>;

declare const VAvatar: vue.DefineComponent<{
    end: boolean;
    start: boolean;
    size: string | number;
    tag: string;
    density: Density;
    variant: NonNullable<"flat" | "text" | "elevated" | "tonal" | "outlined" | "plain">;
} & {
    color?: string | undefined;
    image?: string | undefined;
    icon?: IconValue | undefined;
    theme?: string | undefined;
    rounded?: string | number | boolean | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    end: boolean;
    start: boolean;
    size: string | number;
    tag: string;
    density: Density;
    variant: NonNullable<"flat" | "text" | "elevated" | "tonal" | "outlined" | "plain">;
} & {
    color?: string | undefined;
    image?: string | undefined;
    icon?: IconValue | undefined;
    theme?: string | undefined;
    rounded?: string | number | boolean | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    end: boolean;
    start: boolean;
    size: string | number;
    tag: string;
    rounded: string | number | boolean;
    density: Density;
    variant: NonNullable<"flat" | "text" | "elevated" | "tonal" | "outlined" | "plain">;
}>;
type VAvatar = InstanceType<typeof VAvatar>;

declare const VBadge: vue.DefineComponent<{
    inline: boolean;
    location: NonNullable<Anchor>;
    transition: NonNullable<string | boolean | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    })>;
    label: string;
    tag: string;
    dot: boolean;
    floating: boolean;
    modelValue: boolean;
    bordered: boolean;
} & {
    max?: string | number | undefined;
    color?: string | undefined;
    content?: string | number | undefined;
    icon?: IconValue | undefined;
    theme?: string | undefined;
    rounded?: string | number | boolean | undefined;
    offsetX?: string | number | undefined;
    offsetY?: string | number | undefined;
    textColor?: string | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: (() => vue.VNodeChild) | undefined;
        badge?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
        badge?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:badge"?: false | (() => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    inline: boolean;
    location: NonNullable<Anchor>;
    transition: NonNullable<string | boolean | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    })>;
    label: string;
    tag: string;
    dot: boolean;
    floating: boolean;
    modelValue: boolean;
    bordered: boolean;
} & {
    max?: string | number | undefined;
    color?: string | undefined;
    content?: string | number | undefined;
    icon?: IconValue | undefined;
    theme?: string | undefined;
    rounded?: string | number | boolean | undefined;
    offsetX?: string | number | undefined;
    offsetY?: string | number | undefined;
    textColor?: string | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: (() => vue.VNodeChild) | undefined;
        badge?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
        badge?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:badge"?: false | (() => vue.VNodeChild) | undefined;
}, {
    inline: boolean;
    location: NonNullable<Anchor>;
    transition: NonNullable<string | boolean | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    })>;
    label: string;
    tag: string;
    dot: boolean;
    rounded: string | number | boolean;
    floating: boolean;
    modelValue: boolean;
    bordered: boolean;
}>;
type VBadge = InstanceType<typeof VBadge>;

declare const VBanner: vue.DefineComponent<{
    tag: string;
    sticky: boolean;
    density: Density;
    stacked: boolean;
} & {
    location?: Anchor | undefined;
    height?: string | number | undefined;
    width?: string | number | undefined;
    border?: string | number | boolean | undefined;
    color?: string | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
    position?: "fixed" | "absolute" | "static" | "relative" | "sticky" | undefined;
    text?: string | undefined;
    icon?: IconValue | undefined;
    elevation?: string | number | undefined;
    theme?: string | undefined;
    rounded?: string | number | boolean | undefined;
    lines?: "one" | "two" | "three" | undefined;
    avatar?: string | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: (() => vue.VNodeChild) | undefined;
        prepend?: (() => vue.VNodeChild) | undefined;
        text?: (() => vue.VNodeChild) | undefined;
        actions?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
        prepend?: false | (() => vue.VNodeChild) | undefined;
        text?: false | (() => vue.VNodeChild) | undefined;
        actions?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:prepend"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:text"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:actions"?: false | (() => vue.VNodeChild) | undefined;
}, void, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    tag: string;
    sticky: boolean;
    density: Density;
    stacked: boolean;
} & {
    location?: Anchor | undefined;
    height?: string | number | undefined;
    width?: string | number | undefined;
    border?: string | number | boolean | undefined;
    color?: string | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
    position?: "fixed" | "absolute" | "static" | "relative" | "sticky" | undefined;
    text?: string | undefined;
    icon?: IconValue | undefined;
    elevation?: string | number | undefined;
    theme?: string | undefined;
    rounded?: string | number | boolean | undefined;
    lines?: "one" | "two" | "three" | undefined;
    avatar?: string | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: (() => vue.VNodeChild) | undefined;
        prepend?: (() => vue.VNodeChild) | undefined;
        text?: (() => vue.VNodeChild) | undefined;
        actions?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
        prepend?: false | (() => vue.VNodeChild) | undefined;
        text?: false | (() => vue.VNodeChild) | undefined;
        actions?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:prepend"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:text"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:actions"?: false | (() => vue.VNodeChild) | undefined;
}, {
    tag: string;
    sticky: boolean;
    rounded: string | number | boolean;
    density: Density;
    stacked: boolean;
}>;
type VBanner = InstanceType<typeof VBanner>;

declare const VBannerActions: vue.DefineComponent<{} & {
    color?: string | undefined;
    density?: string | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {} & {
    color?: string | undefined;
    density?: string | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {}>;
type VBannerActions = InstanceType<typeof VBannerActions>;

declare const VBannerText: vue.DefineComponent<{
    tag: string;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    tag: string;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    tag: string;
}>;
type VBannerText = InstanceType<typeof VBannerText>;

declare const VBottomNavigation: vue.DefineComponent<{
    absolute: boolean;
    height: string | number;
    active: boolean;
    name: string;
    order: string | number;
    disabled: boolean;
    multiple: boolean;
    tag: string;
    density: Density;
    selectedClass: string;
    grow: boolean;
} & {
    max?: number | undefined;
    border?: string | number | boolean | undefined;
    color?: string | undefined;
    mode?: string | undefined;
    mandatory?: boolean | "force" | undefined;
    elevation?: string | number | undefined;
    theme?: string | undefined;
    rounded?: string | number | boolean | undefined;
    modelValue?: any;
    bgColor?: string | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (value: any) => boolean;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    absolute: boolean;
    height: string | number;
    active: boolean;
    name: string;
    order: string | number;
    disabled: boolean;
    multiple: boolean;
    tag: string;
    density: Density;
    selectedClass: string;
    grow: boolean;
} & {
    max?: number | undefined;
    border?: string | number | boolean | undefined;
    color?: string | undefined;
    mode?: string | undefined;
    mandatory?: boolean | "force" | undefined;
    elevation?: string | number | undefined;
    theme?: string | undefined;
    rounded?: string | number | boolean | undefined;
    modelValue?: any;
    bgColor?: string | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
} & {
    "onUpdate:modelValue"?: ((value: any) => any) | undefined;
}, {
    absolute: boolean;
    height: string | number;
    active: boolean;
    name: string;
    order: string | number;
    disabled: boolean;
    multiple: boolean;
    tag: string;
    rounded: string | number | boolean;
    density: Density;
    modelValue: any;
    selectedClass: string;
    grow: boolean;
}>;
type VBottomNavigation = InstanceType<typeof VBottomNavigation>;

interface LinkProps {
    href: string | undefined;
    replace: boolean | undefined;
    to: RouteLocationRaw | undefined;
    exact: boolean | undefined;
}

type BreadcrumbItem = string | (LinkProps & {
    text: string;
    disabled?: boolean;
});
declare const VBreadcrumbs: {
    new (...args: any[]): {
        $: vue.ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            disabled: boolean;
            tag: string;
            rounded: string | number | boolean;
            density: Density;
            divider: string;
        }> & Omit<Readonly<vue.ExtractPropTypes<Omit<{
            tag: Omit<{
                type: StringConstructor;
                default: string;
            }, "type" | "default"> & {
                type: PropType<string>;
                default: string;
            };
            rounded: {
                type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
                default: undefined;
            };
            density: {
                type: PropType<Density>;
                default: string;
                validator: (v: any) => boolean;
            };
            activeClass: StringConstructor;
            activeColor: StringConstructor;
            bgColor: StringConstructor;
            color: StringConstructor;
            disabled: BooleanConstructor;
            divider: {
                type: StringConstructor;
                default: string;
            };
            icon: PropType<IconValue>;
            items: {
                type: PropType<BreadcrumbItem[]>;
                default: () => never[];
            };
        }, "$children" | "v-slot:default" | "items" | "v-slots" | "v-slot:title" | "v-slot:prepend" | "v-slot:divider">>> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "disabled" | "tag" | "rounded" | "density" | "divider">;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            [name: string]: vue.Slot | undefined;
        }>;
        $root: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null;
        $parent: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null;
        $emit: (event: string, ...args: any[]) => void;
        $el: any;
        $options: vue.ComponentOptionsBase<Readonly<vue.ExtractPropTypes<Omit<{
            tag: Omit<{
                type: StringConstructor;
                default: string;
            }, "type" | "default"> & {
                type: PropType<string>;
                default: string;
            };
            rounded: {
                type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
                default: undefined;
            };
            density: {
                type: PropType<Density>;
                default: string;
                validator: (v: any) => boolean;
            };
            activeClass: StringConstructor;
            activeColor: StringConstructor;
            bgColor: StringConstructor;
            color: StringConstructor;
            disabled: BooleanConstructor;
            divider: {
                type: StringConstructor;
                default: string;
            };
            icon: PropType<IconValue>;
            items: {
                type: PropType<BreadcrumbItem[]>;
                default: () => never[];
            };
        }, "$children" | "v-slot:default" | "items" | "v-slots" | "v-slot:title" | "v-slot:prepend" | "v-slot:divider">>>, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Omit<Record<string, any>, "$children" | "v-slot:default" | "items" | "v-slots" | "v-slot:title" | "v-slot:prepend" | "v-slot:divider">, string, {
            disabled: boolean;
            tag: string;
            rounded: string | number | boolean;
            density: Density;
            divider: string;
        }, {}, string> & {
            beforeCreate?: ((() => void) | (() => void)[]) | undefined;
            created?: ((() => void) | (() => void)[]) | undefined;
            beforeMount?: ((() => void) | (() => void)[]) | undefined;
            mounted?: ((() => void) | (() => void)[]) | undefined;
            beforeUpdate?: ((() => void) | (() => void)[]) | undefined;
            updated?: ((() => void) | (() => void)[]) | undefined;
            activated?: ((() => void) | (() => void)[]) | undefined;
            deactivated?: ((() => void) | (() => void)[]) | undefined;
            beforeDestroy?: ((() => void) | (() => void)[]) | undefined;
            beforeUnmount?: ((() => void) | (() => void)[]) | undefined;
            destroyed?: ((() => void) | (() => void)[]) | undefined;
            unmounted?: ((() => void) | (() => void)[]) | undefined;
            renderTracked?: (((e: vue.DebuggerEvent) => void) | ((e: vue.DebuggerEvent) => void)[]) | undefined;
            renderTriggered?: (((e: vue.DebuggerEvent) => void) | ((e: vue.DebuggerEvent) => void)[]) | undefined;
            errorCaptured?: (((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null, info: string) => boolean | void) | ((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null, info: string) => boolean | void)[]) | undefined;
        };
        $forceUpdate: () => void;
        $nextTick: typeof vue.nextTick;
        $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (args_0: R, args_1: R) => any : (...args: any) => any, options?: vue.WatchOptions<boolean> | undefined): vue.WatchStopHandle;
    } & Readonly<vue.ExtractPropTypes<Omit<{
        tag: Omit<{
            type: StringConstructor;
            default: string;
        }, "type" | "default"> & {
            type: PropType<string>;
            default: string;
        };
        rounded: {
            type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
            default: undefined;
        };
        density: {
            type: PropType<Density>;
            default: string;
            validator: (v: any) => boolean;
        };
        activeClass: StringConstructor;
        activeColor: StringConstructor;
        bgColor: StringConstructor;
        color: StringConstructor;
        disabled: BooleanConstructor;
        divider: {
            type: StringConstructor;
            default: string;
        };
        icon: PropType<IconValue>;
        items: {
            type: PropType<BreadcrumbItem[]>;
            default: () => never[];
        };
    }, "$children" | "v-slot:default" | "items" | "v-slots" | "v-slot:title" | "v-slot:prepend" | "v-slot:divider">>> & vue.ShallowUnwrapRef<{}> & {} & vue.ComponentCustomProperties & {};
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & vue.ComponentOptionsBase<Readonly<vue.ExtractPropTypes<Omit<{
    tag: Omit<{
        type: StringConstructor;
        default: string;
    }, "type" | "default"> & {
        type: PropType<string>;
        default: string;
    };
    rounded: {
        type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
        default: undefined;
    };
    density: {
        type: PropType<Density>;
        default: string;
        validator: (v: any) => boolean;
    };
    activeClass: StringConstructor;
    activeColor: StringConstructor;
    bgColor: StringConstructor;
    color: StringConstructor;
    disabled: BooleanConstructor;
    divider: {
        type: StringConstructor;
        default: string;
    };
    icon: PropType<IconValue>;
    items: {
        type: PropType<BreadcrumbItem[]>;
        default: () => never[];
    };
}, "$children" | "v-slot:default" | "items" | "v-slots" | "v-slot:title" | "v-slot:prepend" | "v-slot:divider">>>, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Omit<Record<string, any>, "$children" | "v-slot:default" | "items" | "v-slots" | "v-slot:title" | "v-slot:prepend" | "v-slot:divider">, string, {
    disabled: boolean;
    tag: string;
    rounded: string | number | boolean;
    density: Density;
    divider: string;
}, {}, string> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & (new <T_1>() => {
    $props: {
        items?: T_1[] | undefined;
    } & {
        $children?: {} | vue.VNodeChild | {
            prepend?: (() => vue.VNodeChild) | undefined;
            title?: ((args_0: {
                item: T_1;
                index: number;
            }) => vue.VNodeChild) | undefined;
            divider?: ((args_0: {
                item: T_1;
                index: number;
            }) => vue.VNodeChild) | undefined;
            default?: (() => vue.VNodeChild) | undefined;
        };
        'v-slots'?: {
            prepend?: false | (() => vue.VNodeChild) | undefined;
            title?: false | ((args_0: {
                item: T_1;
                index: number;
            }) => vue.VNodeChild) | undefined;
            divider?: false | ((args_0: {
                item: T_1;
                index: number;
            }) => vue.VNodeChild) | undefined;
            default?: false | (() => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:prepend"?: false | (() => vue.VNodeChild) | undefined;
        "v-slot:title"?: false | ((args_0: {
            item: T_1;
            index: number;
        }) => vue.VNodeChild) | undefined;
        "v-slot:divider"?: false | ((args_0: {
            item: T_1;
            index: number;
        }) => vue.VNodeChild) | undefined;
        "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    };
});
type VBreadcrumbs = InstanceType<typeof VBreadcrumbs>;

declare const VBreadcrumbsItem: vue.DefineComponent<{
    replace: boolean;
    exact: boolean;
    active: boolean;
    disabled: boolean;
    tag: string;
} & {
    color?: string | undefined;
    title?: string | undefined;
    href?: string | undefined;
    to?: vue_router.RouteLocationRaw | undefined;
    activeClass?: string | undefined;
    activeColor?: string | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    replace: boolean;
    exact: boolean;
    active: boolean;
    disabled: boolean;
    tag: string;
} & {
    color?: string | undefined;
    title?: string | undefined;
    href?: string | undefined;
    to?: vue_router.RouteLocationRaw | undefined;
    activeClass?: string | undefined;
    activeColor?: string | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    replace: boolean;
    exact: boolean;
    active: boolean;
    disabled: boolean;
    tag: string;
}>;
type VBreadcrumbsItem = InstanceType<typeof VBreadcrumbsItem>;

declare const VBreadcrumbsDivider: vue.DefineComponent<{} & {
    divider?: string | number | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {} & {
    divider?: string | number | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {}>;

declare const VBtn: vue.DefineComponent<{
    symbol: any;
    replace: boolean;
    flat: boolean;
    exact: boolean;
    block: boolean;
    disabled: boolean;
    size: string | number;
    tag: string;
    density: Density;
    variant: NonNullable<"flat" | "text" | "elevated" | "tonal" | "outlined" | "plain">;
    stacked: boolean;
    ripple: boolean;
} & {
    location?: Anchor | undefined;
    height?: string | number | undefined;
    width?: string | number | undefined;
    active?: boolean | undefined;
    border?: string | number | boolean | undefined;
    color?: string | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
    position?: "fixed" | "absolute" | "static" | "relative" | "sticky" | undefined;
    value?: any;
    loading?: string | boolean | undefined;
    icon?: boolean | IconValue | undefined;
    href?: string | undefined;
    elevation?: string | number | undefined;
    to?: vue_router.RouteLocationRaw | undefined;
    theme?: string | undefined;
    rounded?: string | number | boolean | undefined;
    selectedClass?: string | undefined;
    prependIcon?: IconValue | undefined;
    appendIcon?: IconValue | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: (() => vue.VNodeChild) | undefined;
        prepend?: (() => vue.VNodeChild) | undefined;
        append?: (() => vue.VNodeChild) | undefined;
        loader?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
        prepend?: false | (() => vue.VNodeChild) | undefined;
        append?: false | (() => vue.VNodeChild) | undefined;
        loader?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:prepend"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:append"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:loader"?: false | (() => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'group:selected': (val: {
        value: boolean;
    }) => boolean;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    symbol: any;
    replace: boolean;
    flat: boolean;
    exact: boolean;
    block: boolean;
    disabled: boolean;
    size: string | number;
    tag: string;
    density: Density;
    variant: NonNullable<"flat" | "text" | "elevated" | "tonal" | "outlined" | "plain">;
    stacked: boolean;
    ripple: boolean;
} & {
    location?: Anchor | undefined;
    height?: string | number | undefined;
    width?: string | number | undefined;
    active?: boolean | undefined;
    border?: string | number | boolean | undefined;
    color?: string | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
    position?: "fixed" | "absolute" | "static" | "relative" | "sticky" | undefined;
    value?: any;
    loading?: string | boolean | undefined;
    icon?: boolean | IconValue | undefined;
    href?: string | undefined;
    elevation?: string | number | undefined;
    to?: vue_router.RouteLocationRaw | undefined;
    theme?: string | undefined;
    rounded?: string | number | boolean | undefined;
    selectedClass?: string | undefined;
    prependIcon?: IconValue | undefined;
    appendIcon?: IconValue | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: (() => vue.VNodeChild) | undefined;
        prepend?: (() => vue.VNodeChild) | undefined;
        append?: (() => vue.VNodeChild) | undefined;
        loader?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
        prepend?: false | (() => vue.VNodeChild) | undefined;
        append?: false | (() => vue.VNodeChild) | undefined;
        loader?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:prepend"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:append"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:loader"?: false | (() => vue.VNodeChild) | undefined;
} & {
    "onGroup:selected"?: ((val: {
        value: boolean;
    }) => any) | undefined;
}, {
    symbol: any;
    replace: boolean;
    flat: boolean;
    exact: boolean;
    active: boolean;
    block: boolean;
    disabled: boolean;
    size: string | number;
    tag: string;
    rounded: string | number | boolean;
    density: Density;
    variant: NonNullable<"flat" | "text" | "elevated" | "tonal" | "outlined" | "plain">;
    stacked: boolean;
    ripple: boolean;
}>;
type VBtn = InstanceType<typeof VBtn>;

declare const VBtnGroup: vue.DefineComponent<{
    tag: string;
    density: Density;
    variant: "flat" | "text" | "elevated" | "tonal" | "outlined" | "plain";
    divided: boolean;
} & {
    border?: string | number | boolean | undefined;
    color?: string | undefined;
    elevation?: string | number | undefined;
    theme?: string | undefined;
    rounded?: string | number | boolean | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, void, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    tag: string;
    density: Density;
    variant: "flat" | "text" | "elevated" | "tonal" | "outlined" | "plain";
    divided: boolean;
} & {
    border?: string | number | boolean | undefined;
    color?: string | undefined;
    elevation?: string | number | undefined;
    theme?: string | undefined;
    rounded?: string | number | boolean | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    tag: string;
    rounded: string | number | boolean;
    density: Density;
    variant: "flat" | "text" | "elevated" | "tonal" | "outlined" | "plain";
    divided: boolean;
}>;
type VBtnGroup = InstanceType<typeof VBtnGroup>;

interface GroupItem {
    id: number;
    value: Ref<unknown>;
    disabled: Ref<boolean | undefined>;
}
interface GroupProvide {
    register: (item: GroupItem, cmp: ComponentInternalInstance) => void;
    unregister: (id: number) => void;
    select: (id: number, value: boolean) => void;
    selected: Ref<Readonly<number[]>>;
    isSelected: (id: number) => boolean;
    prev: () => void;
    next: () => void;
    selectedClass: Ref<string | undefined>;
    items: ComputedRef<{
        id: number;
        value: unknown;
        disabled: boolean | undefined;
    }[]>;
    disabled: Ref<boolean | undefined>;
    getItemIndex: (value: unknown) => number;
}
interface GroupItemProvide {
    id: number;
    isSelected: Ref<boolean>;
    toggle: () => void;
    select: (value: boolean) => void;
    selectedClass: Ref<(string | undefined)[] | false>;
    value: Ref<unknown>;
    disabled: Ref<boolean | undefined>;
    group: GroupProvide;
}

type BtnToggleSlotProps = 'isSelected' | 'select' | 'selected' | 'next' | 'prev';
interface DefaultBtnToggleSlot extends Pick<GroupProvide, BtnToggleSlotProps> {
}
declare const VBtnToggle: vue.DefineComponent<{
    disabled: boolean;
    multiple: boolean;
    tag: string;
    density: Density;
    variant: "flat" | "text" | "elevated" | "tonal" | "outlined" | "plain";
    divided: boolean;
} & {
    max?: number | undefined;
    border?: string | number | boolean | undefined;
    color?: string | undefined;
    mandatory?: boolean | "force" | undefined;
    elevation?: string | number | undefined;
    theme?: string | undefined;
    rounded?: string | number | boolean | undefined;
    modelValue?: any;
    selectedClass?: string | undefined;
} & {
    $children?: vue.VNodeChild | ((args_0: DefaultBtnToggleSlot) => vue.VNodeChild) | {
        default?: ((args_0: DefaultBtnToggleSlot) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | ((args_0: DefaultBtnToggleSlot) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | ((args_0: DefaultBtnToggleSlot) => vue.VNodeChild) | undefined;
}, {
    next: () => void;
    prev: () => void;
    select: (id: number, value: boolean) => void;
}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (value: any) => boolean;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    disabled: boolean;
    multiple: boolean;
    tag: string;
    density: Density;
    variant: "flat" | "text" | "elevated" | "tonal" | "outlined" | "plain";
    divided: boolean;
} & {
    max?: number | undefined;
    border?: string | number | boolean | undefined;
    color?: string | undefined;
    mandatory?: boolean | "force" | undefined;
    elevation?: string | number | undefined;
    theme?: string | undefined;
    rounded?: string | number | boolean | undefined;
    modelValue?: any;
    selectedClass?: string | undefined;
} & {
    $children?: vue.VNodeChild | ((args_0: DefaultBtnToggleSlot) => vue.VNodeChild) | {
        default?: ((args_0: DefaultBtnToggleSlot) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | ((args_0: DefaultBtnToggleSlot) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | ((args_0: DefaultBtnToggleSlot) => vue.VNodeChild) | undefined;
} & {
    "onUpdate:modelValue"?: ((value: any) => any) | undefined;
}, {
    disabled: boolean;
    multiple: boolean;
    tag: string;
    rounded: string | number | boolean;
    density: Density;
    variant: "flat" | "text" | "elevated" | "tonal" | "outlined" | "plain";
    modelValue: any;
    divided: boolean;
}>;
type VBtnToggle = InstanceType<typeof VBtnToggle>;

declare const VCard: vue.DefineComponent<{
    replace: boolean;
    flat: boolean;
    exact: boolean;
    disabled: boolean;
    tag: string;
    density: Density;
    variant: NonNullable<"flat" | "text" | "elevated" | "tonal" | "outlined" | "plain">;
    ripple: boolean;
    hover: boolean;
} & {
    link?: boolean | undefined;
    location?: Anchor | undefined;
    height?: string | number | undefined;
    width?: string | number | undefined;
    border?: string | number | boolean | undefined;
    color?: string | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
    position?: "fixed" | "absolute" | "static" | "relative" | "sticky" | undefined;
    loading?: string | boolean | undefined;
    title?: string | undefined;
    image?: string | undefined;
    text?: string | undefined;
    href?: string | undefined;
    elevation?: string | number | undefined;
    to?: vue_router.RouteLocationRaw | undefined;
    theme?: string | undefined;
    rounded?: string | number | boolean | undefined;
    prependIcon?: IconValue | undefined;
    appendIcon?: IconValue | undefined;
    appendAvatar?: string | undefined;
    prependAvatar?: string | undefined;
    subtitle?: string | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: (() => vue.VNodeChild) | undefined;
        actions?: (() => vue.VNodeChild) | undefined;
        title?: (() => vue.VNodeChild) | undefined;
        subtitle?: (() => vue.VNodeChild) | undefined;
        text?: (() => vue.VNodeChild) | undefined;
        loader?: (() => vue.VNodeChild) | undefined;
        image?: (() => vue.VNodeChild) | undefined;
        prepend?: (() => vue.VNodeChild) | undefined;
        append?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
        actions?: false | (() => vue.VNodeChild) | undefined;
        title?: false | (() => vue.VNodeChild) | undefined;
        subtitle?: false | (() => vue.VNodeChild) | undefined;
        text?: false | (() => vue.VNodeChild) | undefined;
        loader?: false | (() => vue.VNodeChild) | undefined;
        image?: false | (() => vue.VNodeChild) | undefined;
        prepend?: false | (() => vue.VNodeChild) | undefined;
        append?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:actions"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:title"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:subtitle"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:text"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:loader"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:image"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:prepend"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:append"?: false | (() => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    replace: boolean;
    flat: boolean;
    exact: boolean;
    disabled: boolean;
    tag: string;
    density: Density;
    variant: NonNullable<"flat" | "text" | "elevated" | "tonal" | "outlined" | "plain">;
    ripple: boolean;
    hover: boolean;
} & {
    link?: boolean | undefined;
    location?: Anchor | undefined;
    height?: string | number | undefined;
    width?: string | number | undefined;
    border?: string | number | boolean | undefined;
    color?: string | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
    position?: "fixed" | "absolute" | "static" | "relative" | "sticky" | undefined;
    loading?: string | boolean | undefined;
    title?: string | undefined;
    image?: string | undefined;
    text?: string | undefined;
    href?: string | undefined;
    elevation?: string | number | undefined;
    to?: vue_router.RouteLocationRaw | undefined;
    theme?: string | undefined;
    rounded?: string | number | boolean | undefined;
    prependIcon?: IconValue | undefined;
    appendIcon?: IconValue | undefined;
    appendAvatar?: string | undefined;
    prependAvatar?: string | undefined;
    subtitle?: string | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: (() => vue.VNodeChild) | undefined;
        actions?: (() => vue.VNodeChild) | undefined;
        title?: (() => vue.VNodeChild) | undefined;
        subtitle?: (() => vue.VNodeChild) | undefined;
        text?: (() => vue.VNodeChild) | undefined;
        loader?: (() => vue.VNodeChild) | undefined;
        image?: (() => vue.VNodeChild) | undefined;
        prepend?: (() => vue.VNodeChild) | undefined;
        append?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
        actions?: false | (() => vue.VNodeChild) | undefined;
        title?: false | (() => vue.VNodeChild) | undefined;
        subtitle?: false | (() => vue.VNodeChild) | undefined;
        text?: false | (() => vue.VNodeChild) | undefined;
        loader?: false | (() => vue.VNodeChild) | undefined;
        image?: false | (() => vue.VNodeChild) | undefined;
        prepend?: false | (() => vue.VNodeChild) | undefined;
        append?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:actions"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:title"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:subtitle"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:text"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:loader"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:image"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:prepend"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:append"?: false | (() => vue.VNodeChild) | undefined;
}, {
    replace: boolean;
    link: boolean;
    flat: boolean;
    exact: boolean;
    disabled: boolean;
    tag: string;
    rounded: string | number | boolean;
    density: Density;
    variant: NonNullable<"flat" | "text" | "elevated" | "tonal" | "outlined" | "plain">;
    ripple: boolean;
    hover: boolean;
}>;
type VCard = InstanceType<typeof VCard>;

declare const VCardActions: vue.DefineComponent<{
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}>, {}>;
type VCardActions = InstanceType<typeof VCardActions>;

declare const VCardItem: vue.DefineComponent<{
    density: Density;
} & {
    title?: string | undefined;
    prependIcon?: IconValue | undefined;
    appendIcon?: IconValue | undefined;
    appendAvatar?: string | undefined;
    prependAvatar?: string | undefined;
    subtitle?: string | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: (() => vue.VNodeChild) | undefined;
        prepend?: (() => vue.VNodeChild) | undefined;
        append?: (() => vue.VNodeChild) | undefined;
        title?: (() => vue.VNodeChild) | undefined;
        subtitle?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
        prepend?: false | (() => vue.VNodeChild) | undefined;
        append?: false | (() => vue.VNodeChild) | undefined;
        title?: false | (() => vue.VNodeChild) | undefined;
        subtitle?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:prepend"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:append"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:title"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:subtitle"?: false | (() => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    density: Density;
} & {
    title?: string | undefined;
    prependIcon?: IconValue | undefined;
    appendIcon?: IconValue | undefined;
    appendAvatar?: string | undefined;
    prependAvatar?: string | undefined;
    subtitle?: string | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: (() => vue.VNodeChild) | undefined;
        prepend?: (() => vue.VNodeChild) | undefined;
        append?: (() => vue.VNodeChild) | undefined;
        title?: (() => vue.VNodeChild) | undefined;
        subtitle?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
        prepend?: false | (() => vue.VNodeChild) | undefined;
        append?: false | (() => vue.VNodeChild) | undefined;
        title?: false | (() => vue.VNodeChild) | undefined;
        subtitle?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:prepend"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:append"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:title"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:subtitle"?: false | (() => vue.VNodeChild) | undefined;
}, {
    density: Density;
}>;
type VCardItem = InstanceType<typeof VCardItem>;

declare const VCardSubtitle: vue.DefineComponent<{
    tag: string;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    tag: string;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    tag: string;
}>;
type VCardSubtitle = InstanceType<typeof VCardSubtitle>;

declare const VCardText: vue.DefineComponent<{
    tag: string;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    tag: string;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    tag: string;
}>;
type VCardText = InstanceType<typeof VCardText>;

declare const VCardTitle: vue.DefineComponent<{
    tag: string;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    tag: string;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    tag: string;
}>;
type VCardTitle = InstanceType<typeof VCardTitle>;

declare const VCarousel: vue.DefineComponent<{
    interval: string | number;
    height: string | number;
    showArrows: string | boolean;
    cycle: boolean;
    hideDelimiters: boolean;
    hideDelimiterBackground: boolean;
    delimiterIcon: IconValue;
} & {
    progress?: string | boolean | undefined;
    color?: string | undefined;
    modelValue?: any;
    verticalDelimiters?: boolean | "left" | "right" | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: ((args_0: {
            group: GroupProvide;
        }) => vue.VNodeChild) | undefined;
        additional?: ((args_0: {
            group: GroupProvide;
        }) => vue.VNodeChild) | undefined;
        prev?: ((args_0: {
            props: {
                icon: IconValue;
                class: string;
                onClick: () => void;
                ariaLabel: string;
            };
        }) => vue.VNodeChild) | undefined;
        next?: ((args_0: {
            props: {
                icon: IconValue;
                class: string;
                onClick: () => void;
                ariaLabel: string;
            };
        }) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | ((args_0: {
            group: GroupProvide;
        }) => vue.VNodeChild) | undefined;
        additional?: false | ((args_0: {
            group: GroupProvide;
        }) => vue.VNodeChild) | undefined;
        prev?: false | ((args_0: {
            props: {
                icon: IconValue;
                class: string;
                onClick: () => void;
                ariaLabel: string;
            };
        }) => vue.VNodeChild) | undefined;
        next?: false | ((args_0: {
            props: {
                icon: IconValue;
                class: string;
                onClick: () => void;
                ariaLabel: string;
            };
        }) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | ((args_0: {
        group: GroupProvide;
    }) => vue.VNodeChild) | undefined;
    "v-slot:additional"?: false | ((args_0: {
        group: GroupProvide;
    }) => vue.VNodeChild) | undefined;
    "v-slot:prev"?: false | ((args_0: {
        props: {
            icon: IconValue;
            class: string;
            onClick: () => void;
            ariaLabel: string;
        };
    }) => vue.VNodeChild) | undefined;
    "v-slot:next"?: false | ((args_0: {
        props: {
            icon: IconValue;
            class: string;
            onClick: () => void;
            ariaLabel: string;
        };
    }) => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (val: any) => boolean;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    interval: string | number;
    height: string | number;
    showArrows: string | boolean;
    cycle: boolean;
    hideDelimiters: boolean;
    hideDelimiterBackground: boolean;
    delimiterIcon: IconValue;
} & {
    progress?: string | boolean | undefined;
    color?: string | undefined;
    modelValue?: any;
    verticalDelimiters?: boolean | "left" | "right" | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: ((args_0: {
            group: GroupProvide;
        }) => vue.VNodeChild) | undefined;
        additional?: ((args_0: {
            group: GroupProvide;
        }) => vue.VNodeChild) | undefined;
        prev?: ((args_0: {
            props: {
                icon: IconValue;
                class: string;
                onClick: () => void;
                ariaLabel: string;
            };
        }) => vue.VNodeChild) | undefined;
        next?: ((args_0: {
            props: {
                icon: IconValue;
                class: string;
                onClick: () => void;
                ariaLabel: string;
            };
        }) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | ((args_0: {
            group: GroupProvide;
        }) => vue.VNodeChild) | undefined;
        additional?: false | ((args_0: {
            group: GroupProvide;
        }) => vue.VNodeChild) | undefined;
        prev?: false | ((args_0: {
            props: {
                icon: IconValue;
                class: string;
                onClick: () => void;
                ariaLabel: string;
            };
        }) => vue.VNodeChild) | undefined;
        next?: false | ((args_0: {
            props: {
                icon: IconValue;
                class: string;
                onClick: () => void;
                ariaLabel: string;
            };
        }) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | ((args_0: {
        group: GroupProvide;
    }) => vue.VNodeChild) | undefined;
    "v-slot:additional"?: false | ((args_0: {
        group: GroupProvide;
    }) => vue.VNodeChild) | undefined;
    "v-slot:prev"?: false | ((args_0: {
        props: {
            icon: IconValue;
            class: string;
            onClick: () => void;
            ariaLabel: string;
        };
    }) => vue.VNodeChild) | undefined;
    "v-slot:next"?: false | ((args_0: {
        props: {
            icon: IconValue;
            class: string;
            onClick: () => void;
            ariaLabel: string;
        };
    }) => vue.VNodeChild) | undefined;
} & {
    "onUpdate:modelValue"?: ((val: any) => any) | undefined;
}, {
    interval: string | number;
    height: string | number;
    showArrows: string | boolean;
    cycle: boolean;
    hideDelimiters: boolean;
    hideDelimiterBackground: boolean;
    delimiterIcon: IconValue;
}>;
type VCarousel = InstanceType<typeof VCarousel>;

declare const VCarouselItem: vue.DefineComponent<{} & {
    value?: any;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: (() => vue.VNodeChild) | undefined;
        placeholder?: (() => vue.VNodeChild) | undefined;
        error?: (() => vue.VNodeChild) | undefined;
        sources?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
        placeholder?: false | (() => vue.VNodeChild) | undefined;
        error?: false | (() => vue.VNodeChild) | undefined;
        sources?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:placeholder"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:error"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:sources"?: false | (() => vue.VNodeChild) | undefined;
}, void, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {} & {
    value?: any;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: (() => vue.VNodeChild) | undefined;
        placeholder?: (() => vue.VNodeChild) | undefined;
        error?: (() => vue.VNodeChild) | undefined;
        sources?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
        placeholder?: false | (() => vue.VNodeChild) | undefined;
        error?: false | (() => vue.VNodeChild) | undefined;
        sources?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:placeholder"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:error"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:sources"?: false | (() => vue.VNodeChild) | undefined;
}, {}>;
type VCarouselItem = InstanceType<typeof VCarouselItem>;

declare const VSelectionControlGroup: vue.DefineComponent<{
    inline: boolean;
    error: boolean;
    disabled: boolean;
    multiple: boolean | null;
    readonly: boolean;
    density: Density;
    ripple: boolean;
    valueComparator: typeof deepEqual;
    defaultsTarget: string;
} & {
    type?: string | undefined;
    id?: string | undefined;
    name?: string | undefined;
    color?: string | undefined;
    theme?: string | undefined;
    modelValue?: any;
    falseIcon?: IconValue | undefined;
    trueIcon?: IconValue | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (val: any) => boolean;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    inline: boolean;
    error: boolean;
    disabled: boolean;
    multiple: boolean | null;
    readonly: boolean;
    density: Density;
    ripple: boolean;
    valueComparator: typeof deepEqual;
    defaultsTarget: string;
} & {
    type?: string | undefined;
    id?: string | undefined;
    name?: string | undefined;
    color?: string | undefined;
    theme?: string | undefined;
    modelValue?: any;
    falseIcon?: IconValue | undefined;
    trueIcon?: IconValue | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
} & {
    "onUpdate:modelValue"?: ((val: any) => any) | undefined;
}, {
    inline: boolean;
    error: boolean;
    disabled: boolean;
    multiple: boolean | null;
    readonly: boolean;
    density: Density;
    ripple: boolean;
    valueComparator: typeof deepEqual;
    defaultsTarget: string;
}>;
type VSelectionControlGroup = InstanceType<typeof VSelectionControlGroup>;

type SelectionControlSlot = {
    model: WritableComputedRef<any>;
    textColorClasses: Ref<string[]>;
    textColorStyles: Ref<CSSProperties>;
    props: {
        onBlur: (e: Event) => void;
        onFocus: (e: FocusEvent) => void;
        id: string;
    };
};
declare const VSelectionControl: {
    new (...args: any[]): {
        $: vue.ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            inline: boolean;
            error: boolean;
            disabled: boolean;
            multiple: boolean | null;
            readonly: boolean;
            density: Density;
            ripple: boolean;
            valueComparator: typeof deepEqual;
        }> & Omit<Readonly<ExtractPropTypes<Omit<{
            density: {
                type: vue.PropType<Density>;
                default: string;
                validator: (v: any) => boolean;
            };
            theme: StringConstructor;
            color: StringConstructor;
            disabled: BooleanConstructor;
            error: BooleanConstructor;
            id: StringConstructor;
            inline: BooleanConstructor;
            falseIcon: vue.PropType<IconValue>;
            trueIcon: vue.PropType<IconValue>;
            ripple: {
                type: BooleanConstructor;
                default: boolean;
            };
            multiple: {
                type: vue.PropType<boolean | null>;
                default: null;
            };
            name: StringConstructor;
            readonly: BooleanConstructor;
            modelValue: null;
            type: StringConstructor;
            valueComparator: {
                type: vue.PropType<typeof deepEqual>;
                default: typeof deepEqual;
            };
            label: StringConstructor;
            trueValue: null;
            falseValue: null;
            value: null;
        }, "$children" | "v-slot:default" | "v-slots" | "modelValue" | "onUpdate:modelValue" | "v-slot:label" | "v-slot:input">>> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "inline" | "error" | "disabled" | "multiple" | "readonly" | "density" | "ripple" | "valueComparator">;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            [name: string]: vue.Slot | undefined;
        }>;
        $root: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null;
        $parent: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null;
        $emit: (event: string, ...args: any[]) => void;
        $el: any;
        $options: vue.ComponentOptionsBase<Readonly<ExtractPropTypes<Omit<{
            density: {
                type: vue.PropType<Density>;
                default: string;
                validator: (v: any) => boolean;
            };
            theme: StringConstructor;
            color: StringConstructor;
            disabled: BooleanConstructor;
            error: BooleanConstructor;
            id: StringConstructor;
            inline: BooleanConstructor;
            falseIcon: vue.PropType<IconValue>;
            trueIcon: vue.PropType<IconValue>;
            ripple: {
                type: BooleanConstructor;
                default: boolean;
            };
            multiple: {
                type: vue.PropType<boolean | null>;
                default: null;
            };
            name: StringConstructor;
            readonly: BooleanConstructor;
            modelValue: null;
            type: StringConstructor;
            valueComparator: {
                type: vue.PropType<typeof deepEqual>;
                default: typeof deepEqual;
            };
            label: StringConstructor;
            trueValue: null;
            falseValue: null;
            value: null;
        }, "$children" | "v-slot:default" | "v-slots" | "modelValue" | "onUpdate:modelValue" | "v-slot:label" | "v-slot:input">>>, {
            isFocused: Ref<boolean>;
            input: Ref<HTMLInputElement | undefined>;
        }, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Omit<{
            'update:modelValue': (val: any) => boolean;
        }, "$children" | "v-slot:default" | "v-slots" | "modelValue" | "update:modelValue" | "v-slot:label" | "v-slot:input">, string, {
            inline: boolean;
            error: boolean;
            disabled: boolean;
            multiple: boolean | null;
            readonly: boolean;
            density: Density;
            ripple: boolean;
            valueComparator: typeof deepEqual;
        }, {}, string> & {
            beforeCreate?: ((() => void) | (() => void)[]) | undefined;
            created?: ((() => void) | (() => void)[]) | undefined;
            beforeMount?: ((() => void) | (() => void)[]) | undefined;
            mounted?: ((() => void) | (() => void)[]) | undefined;
            beforeUpdate?: ((() => void) | (() => void)[]) | undefined;
            updated?: ((() => void) | (() => void)[]) | undefined;
            activated?: ((() => void) | (() => void)[]) | undefined;
            deactivated?: ((() => void) | (() => void)[]) | undefined;
            beforeDestroy?: ((() => void) | (() => void)[]) | undefined;
            beforeUnmount?: ((() => void) | (() => void)[]) | undefined;
            destroyed?: ((() => void) | (() => void)[]) | undefined;
            unmounted?: ((() => void) | (() => void)[]) | undefined;
            renderTracked?: (((e: vue.DebuggerEvent) => void) | ((e: vue.DebuggerEvent) => void)[]) | undefined;
            renderTriggered?: (((e: vue.DebuggerEvent) => void) | ((e: vue.DebuggerEvent) => void)[]) | undefined;
            errorCaptured?: (((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null, info: string) => boolean | void) | ((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null, info: string) => boolean | void)[]) | undefined;
        };
        $forceUpdate: () => void;
        $nextTick: typeof nextTick;
        $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (args_0: R, args_1: R) => any : (...args: any) => any, options?: vue.WatchOptions<boolean> | undefined): vue.WatchStopHandle;
    } & Readonly<ExtractPropTypes<Omit<{
        density: {
            type: vue.PropType<Density>;
            default: string;
            validator: (v: any) => boolean;
        };
        theme: StringConstructor;
        color: StringConstructor;
        disabled: BooleanConstructor;
        error: BooleanConstructor;
        id: StringConstructor;
        inline: BooleanConstructor;
        falseIcon: vue.PropType<IconValue>;
        trueIcon: vue.PropType<IconValue>;
        ripple: {
            type: BooleanConstructor;
            default: boolean;
        };
        multiple: {
            type: vue.PropType<boolean | null>;
            default: null;
        };
        name: StringConstructor;
        readonly: BooleanConstructor;
        modelValue: null;
        type: StringConstructor;
        valueComparator: {
            type: vue.PropType<typeof deepEqual>;
            default: typeof deepEqual;
        };
        label: StringConstructor;
        trueValue: null;
        falseValue: null;
        value: null;
    }, "$children" | "v-slot:default" | "v-slots" | "modelValue" | "onUpdate:modelValue" | "v-slot:label" | "v-slot:input">>> & vue.ShallowUnwrapRef<{
        isFocused: Ref<boolean>;
        input: Ref<HTMLInputElement | undefined>;
    }> & {} & vue.ComponentCustomProperties & {};
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & vue.ComponentOptionsBase<Readonly<ExtractPropTypes<Omit<{
    density: {
        type: vue.PropType<Density>;
        default: string;
        validator: (v: any) => boolean;
    };
    theme: StringConstructor;
    color: StringConstructor;
    disabled: BooleanConstructor;
    error: BooleanConstructor;
    id: StringConstructor;
    inline: BooleanConstructor;
    falseIcon: vue.PropType<IconValue>;
    trueIcon: vue.PropType<IconValue>;
    ripple: {
        type: BooleanConstructor;
        default: boolean;
    };
    multiple: {
        type: vue.PropType<boolean | null>;
        default: null;
    };
    name: StringConstructor;
    readonly: BooleanConstructor;
    modelValue: null;
    type: StringConstructor;
    valueComparator: {
        type: vue.PropType<typeof deepEqual>;
        default: typeof deepEqual;
    };
    label: StringConstructor;
    trueValue: null;
    falseValue: null;
    value: null;
}, "$children" | "v-slot:default" | "v-slots" | "modelValue" | "onUpdate:modelValue" | "v-slot:label" | "v-slot:input">>>, {
    isFocused: Ref<boolean>;
    input: Ref<HTMLInputElement | undefined>;
}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Omit<{
    'update:modelValue': (val: any) => boolean;
}, "$children" | "v-slot:default" | "v-slots" | "modelValue" | "update:modelValue" | "v-slot:label" | "v-slot:input">, string, {
    inline: boolean;
    error: boolean;
    disabled: boolean;
    multiple: boolean | null;
    readonly: boolean;
    density: Density;
    ripple: boolean;
    valueComparator: typeof deepEqual;
}, {}, string> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & (new <T_1>() => {
    $props: {
        modelValue?: T_1 | undefined;
        'onUpdate:modelValue'?: ((val: T_1) => any) | undefined;
    } & {
        $children?: {} | vue.VNodeChild | {
            default?: (() => vue.VNodeChild) | undefined;
            label?: ((args_0: {
                label: string | undefined;
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            input?: ((args_0: SelectionControlSlot) => vue.VNodeChild) | undefined;
        };
        'v-slots'?: {
            default?: false | (() => vue.VNodeChild) | undefined;
            label?: false | ((args_0: {
                label: string | undefined;
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            input?: false | ((args_0: SelectionControlSlot) => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
        "v-slot:label"?: false | ((args_0: {
            label: string | undefined;
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        "v-slot:input"?: false | ((args_0: SelectionControlSlot) => vue.VNodeChild) | undefined;
    };
});
type VSelectionControl = InstanceType<typeof VSelectionControl>;

declare const VCheckbox: vue.DefineComponent<{
    inline: boolean;
    error: boolean;
    direction: "horizontal" | "vertical";
    disabled: boolean;
    multiple: boolean | null;
    readonly: boolean;
    indeterminate: boolean;
    messages: string | string[];
    density: Density;
    ripple: boolean;
    focused: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    falseIcon: NonNullable<IconValue>;
    trueIcon: NonNullable<IconValue>;
    valueComparator: typeof deepEqual;
    indeterminateIcon: IconValue;
} & {
    type?: string | undefined;
    id?: string | undefined;
    name?: string | undefined;
    color?: string | undefined;
    value?: any;
    label?: string | undefined;
    theme?: string | undefined;
    modelValue?: any;
    prependIcon?: IconValue | undefined;
    appendIcon?: IconValue | undefined;
    'onClick:append'?: EventProp<(...args: any[]) => any> | undefined;
    'onClick:prepend'?: EventProp<(...args: any[]) => any> | undefined;
    validateOn?: "input" | "blur" | "submit" | undefined;
    validationValue?: any;
    hideDetails?: boolean | "auto" | undefined;
    trueValue?: any;
    falseValue?: any;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: (((args_0: VInputSlot) => vue.VNodeChild) & (() => vue.VNodeChild)) | undefined;
        prepend?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        append?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        details?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        label?: ((args_0: {
            label: string | undefined;
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        input?: ((args_0: SelectionControlSlot) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (((args_0: VInputSlot) => vue.VNodeChild) & (() => vue.VNodeChild)) | undefined;
        prepend?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        append?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        details?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        label?: false | ((args_0: {
            label: string | undefined;
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        input?: false | ((args_0: SelectionControlSlot) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (((args_0: VInputSlot) => vue.VNodeChild) & (() => vue.VNodeChild)) | undefined;
    "v-slot:prepend"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:append"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:details"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:label"?: false | ((args_0: {
        label: string | undefined;
        props: Record<string, unknown>;
    }) => vue.VNodeChild) | undefined;
    "v-slot:input"?: false | ((args_0: SelectionControlSlot) => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:focused': (focused: boolean) => boolean;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    inline: boolean;
    error: boolean;
    direction: "horizontal" | "vertical";
    disabled: boolean;
    multiple: boolean | null;
    readonly: boolean;
    indeterminate: boolean;
    messages: string | string[];
    density: Density;
    ripple: boolean;
    focused: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    falseIcon: NonNullable<IconValue>;
    trueIcon: NonNullable<IconValue>;
    valueComparator: typeof deepEqual;
    indeterminateIcon: IconValue;
} & {
    type?: string | undefined;
    id?: string | undefined;
    name?: string | undefined;
    color?: string | undefined;
    value?: any;
    label?: string | undefined;
    theme?: string | undefined;
    modelValue?: any;
    prependIcon?: IconValue | undefined;
    appendIcon?: IconValue | undefined;
    'onClick:append'?: EventProp<(...args: any[]) => any> | undefined;
    'onClick:prepend'?: EventProp<(...args: any[]) => any> | undefined;
    validateOn?: "input" | "blur" | "submit" | undefined;
    validationValue?: any;
    hideDetails?: boolean | "auto" | undefined;
    trueValue?: any;
    falseValue?: any;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: (((args_0: VInputSlot) => vue.VNodeChild) & (() => vue.VNodeChild)) | undefined;
        prepend?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        append?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        details?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        label?: ((args_0: {
            label: string | undefined;
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        input?: ((args_0: SelectionControlSlot) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (((args_0: VInputSlot) => vue.VNodeChild) & (() => vue.VNodeChild)) | undefined;
        prepend?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        append?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        details?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        label?: false | ((args_0: {
            label: string | undefined;
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        input?: false | ((args_0: SelectionControlSlot) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (((args_0: VInputSlot) => vue.VNodeChild) & (() => vue.VNodeChild)) | undefined;
    "v-slot:prepend"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:append"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:details"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:label"?: false | ((args_0: {
        label: string | undefined;
        props: Record<string, unknown>;
    }) => vue.VNodeChild) | undefined;
    "v-slot:input"?: false | ((args_0: SelectionControlSlot) => vue.VNodeChild) | undefined;
} & {
    "onUpdate:focused"?: ((focused: boolean) => any) | undefined;
}, {
    inline: boolean;
    error: boolean;
    direction: "horizontal" | "vertical";
    disabled: boolean;
    multiple: boolean | null;
    readonly: boolean;
    indeterminate: boolean;
    messages: string | string[];
    density: Density;
    ripple: boolean;
    focused: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    falseIcon: NonNullable<IconValue>;
    trueIcon: NonNullable<IconValue>;
    valueComparator: typeof deepEqual;
    indeterminateIcon: IconValue;
}>;
type VCheckbox = InstanceType<typeof VCheckbox>;

declare const VCheckboxBtn: vue.DefineComponent<{
    inline: boolean;
    error: boolean;
    disabled: boolean;
    multiple: boolean | null;
    readonly: boolean;
    indeterminate: boolean;
    density: Density;
    ripple: boolean;
    falseIcon: NonNullable<IconValue>;
    trueIcon: NonNullable<IconValue>;
    valueComparator: typeof deepEqual;
    indeterminateIcon: IconValue;
} & {
    type?: string | undefined;
    id?: string | undefined;
    name?: string | undefined;
    color?: string | undefined;
    value?: any;
    label?: string | undefined;
    theme?: string | undefined;
    modelValue?: any;
    trueValue?: any;
    falseValue?: any;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: (() => vue.VNodeChild) | undefined;
        label?: ((args_0: {
            label: string | undefined;
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        input?: ((args_0: SelectionControlSlot) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
        label?: false | ((args_0: {
            label: string | undefined;
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        input?: false | ((args_0: SelectionControlSlot) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:label"?: false | ((args_0: {
        label: string | undefined;
        props: Record<string, unknown>;
    }) => vue.VNodeChild) | undefined;
    "v-slot:input"?: false | ((args_0: SelectionControlSlot) => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (value: any) => boolean;
    'update:indeterminate': (val: boolean) => boolean;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    inline: boolean;
    error: boolean;
    disabled: boolean;
    multiple: boolean | null;
    readonly: boolean;
    indeterminate: boolean;
    density: Density;
    ripple: boolean;
    falseIcon: NonNullable<IconValue>;
    trueIcon: NonNullable<IconValue>;
    valueComparator: typeof deepEqual;
    indeterminateIcon: IconValue;
} & {
    type?: string | undefined;
    id?: string | undefined;
    name?: string | undefined;
    color?: string | undefined;
    value?: any;
    label?: string | undefined;
    theme?: string | undefined;
    modelValue?: any;
    trueValue?: any;
    falseValue?: any;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: (() => vue.VNodeChild) | undefined;
        label?: ((args_0: {
            label: string | undefined;
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        input?: ((args_0: SelectionControlSlot) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
        label?: false | ((args_0: {
            label: string | undefined;
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        input?: false | ((args_0: SelectionControlSlot) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:label"?: false | ((args_0: {
        label: string | undefined;
        props: Record<string, unknown>;
    }) => vue.VNodeChild) | undefined;
    "v-slot:input"?: false | ((args_0: SelectionControlSlot) => vue.VNodeChild) | undefined;
} & {
    "onUpdate:modelValue"?: ((value: any) => any) | undefined;
    "onUpdate:indeterminate"?: ((val: boolean) => any) | undefined;
}, {
    inline: boolean;
    error: boolean;
    disabled: boolean;
    multiple: boolean | null;
    readonly: boolean;
    indeterminate: boolean;
    density: Density;
    ripple: boolean;
    falseIcon: NonNullable<IconValue>;
    trueIcon: NonNullable<IconValue>;
    valueComparator: typeof deepEqual;
    indeterminateIcon: IconValue;
}>;
type VCheckboxBtn = InstanceType<typeof VCheckboxBtn>;

declare const VChip: vue.DefineComponent<{
    replace: boolean;
    filter: boolean;
    exact: boolean;
    label: boolean;
    draggable: boolean;
    disabled: boolean;
    size: string | number;
    tag: string;
    density: Density;
    variant: NonNullable<"flat" | "text" | "elevated" | "tonal" | "outlined" | "plain">;
    modelValue: boolean;
    ripple: boolean;
    closable: boolean;
    closeIcon: IconValue;
    closeLabel: string;
    pill: boolean;
    filterIcon: string;
} & {
    link?: boolean | undefined;
    border?: string | number | boolean | undefined;
    color?: string | undefined;
    value?: any;
    text?: string | undefined;
    onClick?: EventProp<(...args: any[]) => any> | undefined;
    onClickOnce?: EventProp<(...args: any[]) => any> | undefined;
    href?: string | undefined;
    elevation?: string | number | undefined;
    to?: vue_router.RouteLocationRaw | undefined;
    theme?: string | undefined;
    rounded?: string | number | boolean | undefined;
    selectedClass?: string | undefined;
    prependIcon?: IconValue | undefined;
    appendIcon?: IconValue | undefined;
    activeClass?: string | undefined;
    appendAvatar?: string | undefined;
    prependAvatar?: string | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: (() => vue.VNodeChild) | undefined;
        label?: (() => vue.VNodeChild) | undefined;
        prepend?: (() => vue.VNodeChild) | undefined;
        append?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
        label?: false | (() => vue.VNodeChild) | undefined;
        prepend?: false | (() => vue.VNodeChild) | undefined;
        append?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:label"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:prepend"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:append"?: false | (() => vue.VNodeChild) | undefined;
}, () => false | JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'click:close': (e: Event) => true;
    'update:modelValue': (value: boolean) => true;
    'group:selected': (val: {
        value: boolean;
    }) => true;
    click: (e: MouseEvent | KeyboardEvent) => true;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    replace: boolean;
    filter: boolean;
    exact: boolean;
    label: boolean;
    draggable: boolean;
    disabled: boolean;
    size: string | number;
    tag: string;
    density: Density;
    variant: NonNullable<"flat" | "text" | "elevated" | "tonal" | "outlined" | "plain">;
    modelValue: boolean;
    ripple: boolean;
    closable: boolean;
    closeIcon: IconValue;
    closeLabel: string;
    pill: boolean;
    filterIcon: string;
} & {
    link?: boolean | undefined;
    border?: string | number | boolean | undefined;
    color?: string | undefined;
    value?: any;
    text?: string | undefined;
    onClick?: EventProp<(...args: any[]) => any> | undefined;
    onClickOnce?: EventProp<(...args: any[]) => any> | undefined;
    href?: string | undefined;
    elevation?: string | number | undefined;
    to?: vue_router.RouteLocationRaw | undefined;
    theme?: string | undefined;
    rounded?: string | number | boolean | undefined;
    selectedClass?: string | undefined;
    prependIcon?: IconValue | undefined;
    appendIcon?: IconValue | undefined;
    activeClass?: string | undefined;
    appendAvatar?: string | undefined;
    prependAvatar?: string | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: (() => vue.VNodeChild) | undefined;
        label?: (() => vue.VNodeChild) | undefined;
        prepend?: (() => vue.VNodeChild) | undefined;
        append?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
        label?: false | (() => vue.VNodeChild) | undefined;
        prepend?: false | (() => vue.VNodeChild) | undefined;
        append?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:label"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:prepend"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:append"?: false | (() => vue.VNodeChild) | undefined;
} & {
    onClick?: ((e: MouseEvent | KeyboardEvent) => any) | undefined;
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
    "onGroup:selected"?: ((val: {
        value: boolean;
    }) => any) | undefined;
    "onClick:close"?: ((e: Event) => any) | undefined;
}, {
    replace: boolean;
    link: boolean;
    filter: boolean;
    exact: boolean;
    label: boolean;
    draggable: boolean;
    disabled: boolean;
    size: string | number;
    tag: string;
    rounded: string | number | boolean;
    density: Density;
    variant: NonNullable<"flat" | "text" | "elevated" | "tonal" | "outlined" | "plain">;
    modelValue: boolean;
    ripple: boolean;
    closable: boolean;
    closeIcon: IconValue;
    closeLabel: string;
    pill: boolean;
    filterIcon: string;
}>;
type VChip = InstanceType<typeof VChip>;

declare const VChipGroup: vue.DefineComponent<{
    filter: boolean;
    disabled: boolean;
    multiple: boolean;
    tag: string;
    column: boolean;
    variant: NonNullable<"flat" | "text" | "elevated" | "tonal" | "outlined" | "plain">;
    selectedClass: string;
    valueComparator: typeof deepEqual;
} & {
    max?: number | undefined;
    color?: string | undefined;
    mandatory?: boolean | "force" | undefined;
    theme?: string | undefined;
    modelValue?: any;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (value: any) => boolean;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    filter: boolean;
    disabled: boolean;
    multiple: boolean;
    tag: string;
    column: boolean;
    variant: NonNullable<"flat" | "text" | "elevated" | "tonal" | "outlined" | "plain">;
    selectedClass: string;
    valueComparator: typeof deepEqual;
} & {
    max?: number | undefined;
    color?: string | undefined;
    mandatory?: boolean | "force" | undefined;
    theme?: string | undefined;
    modelValue?: any;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
} & {
    "onUpdate:modelValue"?: ((value: any) => any) | undefined;
}, {
    filter: boolean;
    disabled: boolean;
    multiple: boolean;
    tag: string;
    column: boolean;
    variant: NonNullable<"flat" | "text" | "elevated" | "tonal" | "outlined" | "plain">;
    modelValue: any;
    selectedClass: string;
    valueComparator: typeof deepEqual;
}>;
type VChipGroup = InstanceType<typeof VChipGroup>;

declare const VCode: vue.DefineComponent<{
    tag: string;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    tag: string;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    tag: string;
}>;
type VCode = InstanceType<typeof VCode>;

declare const VColorPicker: vue.DefineComponent<{
    theme: StringConstructor;
    rounded: {
        type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
        default: undefined;
    };
    elevation: {
        type: (StringConstructor | NumberConstructor)[];
        validator(v: any): boolean;
    };
    canvasHeight: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    disabled: BooleanConstructor;
    dotSize: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    hideCanvas: BooleanConstructor;
    hideSliders: BooleanConstructor;
    hideInputs: BooleanConstructor;
    mode: {
        type: StringConstructor;
        default: string;
        validator: (v: string) => boolean;
    };
    modes: {
        type: PropType<string[]>;
        default: () => string[];
        validator: (v: any) => boolean;
    };
    showSwatches: BooleanConstructor;
    swatches: PropType<string[][]>;
    swatchesMaxHeight: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    modelValue: {
        type: PropType<string | Record<string, unknown> | null | undefined>;
    };
    width: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (color: any) => true;
    'update:mode': (mode: string) => true;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{
    theme: StringConstructor;
    rounded: {
        type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
        default: undefined;
    };
    elevation: {
        type: (StringConstructor | NumberConstructor)[];
        validator(v: any): boolean;
    };
    canvasHeight: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    disabled: BooleanConstructor;
    dotSize: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    hideCanvas: BooleanConstructor;
    hideSliders: BooleanConstructor;
    hideInputs: BooleanConstructor;
    mode: {
        type: StringConstructor;
        default: string;
        validator: (v: string) => boolean;
    };
    modes: {
        type: PropType<string[]>;
        default: () => string[];
        validator: (v: any) => boolean;
    };
    showSwatches: BooleanConstructor;
    swatches: PropType<string[][]>;
    swatchesMaxHeight: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    modelValue: {
        type: PropType<string | Record<string, unknown> | null | undefined>;
    };
    width: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
}>> & {
    "onUpdate:modelValue"?: ((color: any) => any) | undefined;
    "onUpdate:mode"?: ((mode: string) => any) | undefined;
}, {
    width: string | number;
    disabled: boolean;
    mode: string;
    rounded: string | number | boolean;
    dotSize: string | number;
    modes: string[];
    canvasHeight: string | number;
    hideCanvas: boolean;
    hideSliders: boolean;
    hideInputs: boolean;
    showSwatches: boolean;
    swatchesMaxHeight: string | number;
}>;
type VColorPicker = InstanceType<typeof VColorPicker>;

type Primitive$1 = string | number | boolean | symbol;
type Val$1<T, ReturnObject extends boolean> = string | (T extends Primitive$1 ? T : (ReturnObject extends true ? T : any));
type Value$1<T, ReturnObject extends boolean, Multiple extends boolean> = Multiple extends true ? readonly Val$1<T, ReturnObject>[] : Val$1<T, ReturnObject>;
declare const VCombobox: {
    new (...args: any[]): {
        $: vue.ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            reverse: boolean;
            type: string;
            error: boolean;
            active: boolean;
            direction: "horizontal" | "vertical";
            transition: NonNullable<string | boolean | (vue.TransitionProps & {
                component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
            })>;
            menu: boolean;
            autofocus: boolean;
            eager: boolean;
            disabled: boolean;
            readonly: boolean;
            noDataText: string;
            messages: string | string[];
            density: Density;
            variant: "filled" | "outlined" | "plain" | "underlined" | "solo";
            clearIcon: IconValue;
            focused: boolean;
            errorMessages: string | string[];
            maxErrors: string | number;
            rules: ValidationRule[];
            clearable: boolean;
            persistentClear: boolean;
            singleLine: boolean;
            persistentHint: boolean;
            persistentPlaceholder: boolean;
            persistentCounter: boolean;
            valueComparator: typeof deepEqual;
            itemTitle: SelectItemKey;
            itemValue: SelectItemKey;
            itemChildren: NonNullable<SelectItemKey>;
            itemProps: SelectItemKey;
            chips: boolean;
            closableChips: boolean;
            hideNoData: boolean;
            hideSelected: boolean;
            menuIcon: IconValue;
            openOnClear: boolean;
            filterMode: FilterMode;
            noFilter: boolean;
            filterKeys: NonNullable<FilterKeys>;
        }> & Omit<Readonly<vue.ExtractPropTypes<Omit<{
            transition: Omit<{
                type: PropType<string | boolean | (vue.TransitionProps & {
                    component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
                })>;
                default: string;
                validator: (val: unknown) => boolean;
            }, "type" | "default"> & {
                type: PropType<NonNullable<string | boolean | (vue.TransitionProps & {
                    component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
                })>>;
                default: NonNullable<string | boolean | (vue.TransitionProps & {
                    component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
                })>;
            };
            reverse: BooleanConstructor;
            type: {
                type: StringConstructor;
                default: string;
            };
            error: BooleanConstructor;
            id: StringConstructor;
            active: BooleanConstructor;
            name: StringConstructor;
            color: StringConstructor;
            direction: {
                type: PropType<"horizontal" | "vertical">;
                default: string;
                validator: (v: any) => boolean;
            };
            loading: (StringConstructor | BooleanConstructor)[];
            label: StringConstructor;
            prefix: StringConstructor;
            autofocus: BooleanConstructor;
            disabled: BooleanConstructor;
            readonly: BooleanConstructor;
            placeholder: StringConstructor;
            theme: StringConstructor;
            counter: PropType<string | number | true>;
            messages: {
                type: PropType<string | string[]>;
                default: () => never[];
            };
            density: {
                type: PropType<Density>;
                default: string;
                validator: (v: any) => boolean;
            };
            variant: {
                type: PropType<"filled" | "outlined" | "plain" | "underlined" | "solo">;
                default: string;
                validator: (v: any) => boolean;
            };
            modelValue: {
                type: PropType<any>;
                default: any;
            };
            bgColor: StringConstructor;
            prependIcon: PropType<IconValue>;
            appendIcon: PropType<IconValue>;
            clearIcon: {
                type: PropType<IconValue>;
                default: string;
            };
            prependInnerIcon: PropType<IconValue>;
            'onClick:clear': PropType<EventProp<(...args: any[]) => any>>;
            'onClick:append': PropType<EventProp<(...args: any[]) => any>>;
            'onClick:prepend': PropType<EventProp<(...args: any[]) => any>>;
            'onClick:appendInner': PropType<EventProp<(...args: any[]) => any>>;
            'onClick:prependInner': PropType<EventProp<(...args: any[]) => any>>;
            focused: BooleanConstructor;
            validateOn: PropType<"input" | "blur" | "submit" | undefined>;
            errorMessages: {
                type: PropType<string | string[]>;
                default: () => never[];
            };
            maxErrors: {
                type: (StringConstructor | NumberConstructor)[];
                default: number;
            };
            rules: {
                type: PropType<ValidationRule[]>;
                default: () => never[];
            };
            hideDetails: PropType<boolean | "auto">;
            clearable: BooleanConstructor;
            persistentClear: BooleanConstructor;
            singleLine: BooleanConstructor;
            hint: StringConstructor;
            persistentHint: BooleanConstructor;
            persistentPlaceholder: BooleanConstructor;
            persistentCounter: BooleanConstructor;
            suffix: StringConstructor;
            counterValue: PropType<(value: any) => number>;
            items: {
                type: PropType<any[]>;
                default: () => never[];
            };
            itemTitle: {
                type: PropType<SelectItemKey>;
                default: string;
            };
            itemValue: {
                type: PropType<SelectItemKey>;
                default: string;
            };
            itemChildren: Omit<{
                type: PropType<SelectItemKey>;
                default: string;
            }, "type" | "default"> & {
                type: PropType<NonNullable<SelectItemKey>>;
                default: NonNullable<SelectItemKey>;
            };
            itemProps: {
                type: PropType<SelectItemKey>;
                default: string;
            };
            returnObject: {
                type: PropType<boolean>;
                default: boolean;
            };
            chips: BooleanConstructor;
            closableChips: BooleanConstructor;
            eager: BooleanConstructor;
            hideNoData: {
                type: PropType<boolean>;
                default: boolean;
            };
            hideSelected: BooleanConstructor;
            menu: BooleanConstructor;
            menuIcon: {
                type: PropType<IconValue>;
                default: string;
            };
            menuProps: {
                type: PropType<Partial<{
                    location: Anchor;
                    origin: "auto" | Anchor | "overlap";
                    transition: NonNullable<string | boolean | (vue.TransitionProps & {
                        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
                    })> | {
                        component: vue.DefineComponent<{} & {
                            target?: HTMLElement | undefined;
                        } & {
                            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                                default?: (() => vue.VNodeChild) | undefined;
                            };
                            'v-slots'?: {
                                default?: false | (() => vue.VNodeChild) | undefined;
                            } | undefined;
                        } & {
                            "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                        }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {} & {
                            target?: HTMLElement | undefined;
                        } & {
                            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                                default?: (() => vue.VNodeChild) | undefined;
                            };
                            'v-slots'?: {
                                default?: false | (() => vue.VNodeChild) | undefined;
                            } | undefined;
                        } & {
                            "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                        }, {}>;
                    };
                    zIndex: string | number;
                    eager: boolean;
                    disabled: boolean;
                    modelValue: boolean;
                    closeDelay: NonNullable<string | number>;
                    openDelay: NonNullable<string | number>;
                    activatorProps: Record<string, any>;
                    openOnClick: boolean;
                    openOnHover: boolean;
                    openOnFocus: boolean;
                    closeOnContentClick: boolean;
                    locationStrategy: NonNullable<"connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
                        updateLocation: (e: Event) => void;
                    } | undefined)>;
                    scrollStrategy: NonNullable<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition">;
                    closeOnBack: boolean;
                    contained: boolean;
                    noClickAnimation: boolean;
                    persistent: boolean;
                    scrim: NonNullable<string | boolean>;
                }> & Omit<{
                    location: Anchor;
                    origin: "auto" | Anchor | "overlap";
                    transition: NonNullable<string | boolean | (vue.TransitionProps & {
                        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
                    })> | {
                        component: vue.DefineComponent<{} & {
                            target?: HTMLElement | undefined;
                        } & {
                            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                                default?: (() => vue.VNodeChild) | undefined;
                            };
                            'v-slots'?: {
                                default?: false | (() => vue.VNodeChild) | undefined;
                            } | undefined;
                        } & {
                            "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                        }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {} & {
                            target?: HTMLElement | undefined;
                        } & {
                            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                                default?: (() => vue.VNodeChild) | undefined;
                            };
                            'v-slots'?: {
                                default?: false | (() => vue.VNodeChild) | undefined;
                            } | undefined;
                        } & {
                            "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                        }, {}>;
                    };
                    zIndex: string | number;
                    eager: boolean;
                    disabled: boolean;
                    modelValue: boolean;
                    closeDelay: NonNullable<string | number>;
                    openDelay: NonNullable<string | number>;
                    activatorProps: Record<string, any>;
                    openOnHover: boolean;
                    closeOnContentClick: boolean;
                    locationStrategy: NonNullable<"connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
                        updateLocation: (e: Event) => void;
                    } | undefined)>;
                    scrollStrategy: NonNullable<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition">;
                    closeOnBack: boolean;
                    contained: boolean;
                    noClickAnimation: boolean;
                    persistent: boolean;
                    scrim: NonNullable<string | boolean>;
                } & {
                    offset?: string | number | number[] | undefined;
                    id?: string | undefined;
                    height?: string | number | undefined;
                    width?: string | number | undefined;
                    maxHeight?: string | number | undefined;
                    maxWidth?: string | number | undefined;
                    minHeight?: string | number | undefined;
                    minWidth?: string | number | undefined;
                    theme?: string | undefined;
                    contentClass?: any;
                    activator?: string | Element | vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | undefined;
                    openOnClick?: boolean | undefined;
                    openOnFocus?: boolean | undefined;
                    contentProps?: any;
                    attach?: string | boolean | Element | undefined;
                } & {
                    $children?: {} | vue.VNodeChild | {
                        default?: ((args_0: {
                            isActive: vue.Ref<boolean>;
                        }) => vue.VNodeChild) | undefined;
                        activator?: ((args_0: {
                            isActive: boolean;
                            props: Record<string, any>;
                        }) => vue.VNodeChild) | undefined;
                    };
                    'v-slots'?: {
                        default?: false | ((args_0: {
                            isActive: vue.Ref<boolean>;
                        }) => vue.VNodeChild) | undefined;
                        activator?: false | ((args_0: {
                            isActive: boolean;
                            props: Record<string, any>;
                        }) => vue.VNodeChild) | undefined;
                    } | undefined;
                } & {
                    "v-slot:default"?: false | ((args_0: {
                        isActive: vue.Ref<boolean>;
                    }) => vue.VNodeChild) | undefined;
                    "v-slot:activator"?: false | ((args_0: {
                        isActive: boolean;
                        props: Record<string, any>;
                    }) => vue.VNodeChild) | undefined;
                } & {
                    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
                } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "location" | "origin" | "transition" | "zIndex" | "eager" | "disabled" | "modelValue" | "closeDelay" | "openDelay" | "activatorProps" | "openOnClick" | "openOnHover" | "openOnFocus" | "closeOnContentClick" | "locationStrategy" | "scrollStrategy" | "closeOnBack" | "contained" | "noClickAnimation" | "persistent" | "scrim">>;
            };
            multiple: BooleanConstructor;
            noDataText: {
                type: StringConstructor;
                default: string;
            };
            openOnClear: BooleanConstructor;
            valueComparator: {
                type: PropType<typeof deepEqual>;
                default: typeof deepEqual;
            };
            customFilter: PropType<FilterFunction>;
            customKeyFilter: PropType<FilterKeyFunctions>;
            filterKeys: {
                type: PropType<NonNullable<FilterKeys>>;
                default: NonNullable<FilterKeys>;
            };
            filterMode: {
                type: PropType<FilterMode>;
                default: string;
            };
            noFilter: BooleanConstructor;
            delimiters: PropType<string[]>;
        }, "multiple" | "$children" | "items" | "v-slots" | "v-slot:append" | "v-slot:prepend" | "modelValue" | "onUpdate:modelValue" | "v-slot:loader" | "v-slot:details" | "v-slot:clear" | "v-slot:label" | "v-slot:prepend-inner" | "v-slot:append-inner" | "v-slot:item" | "returnObject" | "v-slot:chip" | "v-slot:selection" | "v-slot:prepend-item" | "v-slot:append-item" | "v-slot:no-data">>> & {
            "onUpdate:menu"?: ((val: boolean) => any) | undefined;
            "onUpdate:search"?: ((val: string) => any) | undefined;
        } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "reverse" | "type" | "error" | "active" | "direction" | "transition" | "menu" | "autofocus" | "eager" | "disabled" | "readonly" | "noDataText" | "messages" | "density" | "variant" | "clearIcon" | "focused" | "errorMessages" | "maxErrors" | "rules" | "clearable" | "persistentClear" | "singleLine" | "persistentHint" | "persistentPlaceholder" | "persistentCounter" | "valueComparator" | "itemTitle" | "itemValue" | "itemChildren" | "itemProps" | "chips" | "closableChips" | "hideNoData" | "hideSelected" | "menuIcon" | "openOnClear" | "filterMode" | "noFilter" | "filterKeys">;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            [name: string]: vue.Slot | undefined;
        }>;
        $root: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null;
        $parent: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null;
        $emit: ((event: "update:menu", val: boolean) => void) & ((event: "update:search", val: string) => void);
        $el: any;
        $options: vue.ComponentOptionsBase<Readonly<vue.ExtractPropTypes<Omit<{
            transition: Omit<{
                type: PropType<string | boolean | (vue.TransitionProps & {
                    component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
                })>;
                default: string;
                validator: (val: unknown) => boolean;
            }, "type" | "default"> & {
                type: PropType<NonNullable<string | boolean | (vue.TransitionProps & {
                    component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
                })>>;
                default: NonNullable<string | boolean | (vue.TransitionProps & {
                    component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
                })>;
            };
            reverse: BooleanConstructor;
            type: {
                type: StringConstructor;
                default: string;
            };
            error: BooleanConstructor;
            id: StringConstructor;
            active: BooleanConstructor;
            name: StringConstructor;
            color: StringConstructor;
            direction: {
                type: PropType<"horizontal" | "vertical">;
                default: string;
                validator: (v: any) => boolean;
            };
            loading: (StringConstructor | BooleanConstructor)[];
            label: StringConstructor;
            prefix: StringConstructor;
            autofocus: BooleanConstructor;
            disabled: BooleanConstructor;
            readonly: BooleanConstructor;
            placeholder: StringConstructor;
            theme: StringConstructor;
            counter: PropType<string | number | true>;
            messages: {
                type: PropType<string | string[]>;
                default: () => never[];
            };
            density: {
                type: PropType<Density>;
                default: string;
                validator: (v: any) => boolean;
            };
            variant: {
                type: PropType<"filled" | "outlined" | "plain" | "underlined" | "solo">;
                default: string;
                validator: (v: any) => boolean;
            };
            modelValue: {
                type: PropType<any>;
                default: any;
            };
            bgColor: StringConstructor;
            prependIcon: PropType<IconValue>;
            appendIcon: PropType<IconValue>;
            clearIcon: {
                type: PropType<IconValue>;
                default: string;
            };
            prependInnerIcon: PropType<IconValue>;
            'onClick:clear': PropType<EventProp<(...args: any[]) => any>>;
            'onClick:append': PropType<EventProp<(...args: any[]) => any>>;
            'onClick:prepend': PropType<EventProp<(...args: any[]) => any>>;
            'onClick:appendInner': PropType<EventProp<(...args: any[]) => any>>;
            'onClick:prependInner': PropType<EventProp<(...args: any[]) => any>>;
            focused: BooleanConstructor;
            validateOn: PropType<"input" | "blur" | "submit" | undefined>;
            errorMessages: {
                type: PropType<string | string[]>;
                default: () => never[];
            };
            maxErrors: {
                type: (StringConstructor | NumberConstructor)[];
                default: number;
            };
            rules: {
                type: PropType<ValidationRule[]>;
                default: () => never[];
            };
            hideDetails: PropType<boolean | "auto">;
            clearable: BooleanConstructor;
            persistentClear: BooleanConstructor;
            singleLine: BooleanConstructor;
            hint: StringConstructor;
            persistentHint: BooleanConstructor;
            persistentPlaceholder: BooleanConstructor;
            persistentCounter: BooleanConstructor;
            suffix: StringConstructor;
            counterValue: PropType<(value: any) => number>;
            items: {
                type: PropType<any[]>;
                default: () => never[];
            };
            itemTitle: {
                type: PropType<SelectItemKey>;
                default: string;
            };
            itemValue: {
                type: PropType<SelectItemKey>;
                default: string;
            };
            itemChildren: Omit<{
                type: PropType<SelectItemKey>;
                default: string;
            }, "type" | "default"> & {
                type: PropType<NonNullable<SelectItemKey>>;
                default: NonNullable<SelectItemKey>;
            };
            itemProps: {
                type: PropType<SelectItemKey>;
                default: string;
            };
            returnObject: {
                type: PropType<boolean>;
                default: boolean;
            };
            chips: BooleanConstructor;
            closableChips: BooleanConstructor;
            eager: BooleanConstructor;
            hideNoData: {
                type: PropType<boolean>;
                default: boolean;
            };
            hideSelected: BooleanConstructor;
            menu: BooleanConstructor;
            menuIcon: {
                type: PropType<IconValue>;
                default: string;
            };
            menuProps: {
                type: PropType<Partial<{
                    location: Anchor;
                    origin: "auto" | Anchor | "overlap";
                    transition: NonNullable<string | boolean | (vue.TransitionProps & {
                        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
                    })> | {
                        component: vue.DefineComponent<{} & {
                            target?: HTMLElement | undefined;
                        } & {
                            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                                default?: (() => vue.VNodeChild) | undefined;
                            };
                            'v-slots'?: {
                                default?: false | (() => vue.VNodeChild) | undefined;
                            } | undefined;
                        } & {
                            "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                        }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {} & {
                            target?: HTMLElement | undefined;
                        } & {
                            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                                default?: (() => vue.VNodeChild) | undefined;
                            };
                            'v-slots'?: {
                                default?: false | (() => vue.VNodeChild) | undefined;
                            } | undefined;
                        } & {
                            "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                        }, {}>;
                    };
                    zIndex: string | number;
                    eager: boolean;
                    disabled: boolean;
                    modelValue: boolean;
                    closeDelay: NonNullable<string | number>;
                    openDelay: NonNullable<string | number>;
                    activatorProps: Record<string, any>;
                    openOnClick: boolean;
                    openOnHover: boolean;
                    openOnFocus: boolean;
                    closeOnContentClick: boolean;
                    locationStrategy: NonNullable<"connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
                        updateLocation: (e: Event) => void;
                    } | undefined)>;
                    scrollStrategy: NonNullable<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition">;
                    closeOnBack: boolean;
                    contained: boolean;
                    noClickAnimation: boolean;
                    persistent: boolean;
                    scrim: NonNullable<string | boolean>;
                }> & Omit<{
                    location: Anchor;
                    origin: "auto" | Anchor | "overlap";
                    transition: NonNullable<string | boolean | (vue.TransitionProps & {
                        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
                    })> | {
                        component: vue.DefineComponent<{} & {
                            target?: HTMLElement | undefined;
                        } & {
                            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                                default?: (() => vue.VNodeChild) | undefined;
                            };
                            'v-slots'?: {
                                default?: false | (() => vue.VNodeChild) | undefined;
                            } | undefined;
                        } & {
                            "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                        }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {} & {
                            target?: HTMLElement | undefined;
                        } & {
                            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                                default?: (() => vue.VNodeChild) | undefined;
                            };
                            'v-slots'?: {
                                default?: false | (() => vue.VNodeChild) | undefined;
                            } | undefined;
                        } & {
                            "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                        }, {}>;
                    };
                    zIndex: string | number;
                    eager: boolean;
                    disabled: boolean;
                    modelValue: boolean;
                    closeDelay: NonNullable<string | number>;
                    openDelay: NonNullable<string | number>;
                    activatorProps: Record<string, any>;
                    openOnHover: boolean;
                    closeOnContentClick: boolean;
                    locationStrategy: NonNullable<"connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
                        updateLocation: (e: Event) => void;
                    } | undefined)>;
                    scrollStrategy: NonNullable<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition">;
                    closeOnBack: boolean;
                    contained: boolean;
                    noClickAnimation: boolean;
                    persistent: boolean;
                    scrim: NonNullable<string | boolean>;
                } & {
                    offset?: string | number | number[] | undefined;
                    id?: string | undefined;
                    height?: string | number | undefined;
                    width?: string | number | undefined;
                    maxHeight?: string | number | undefined;
                    maxWidth?: string | number | undefined;
                    minHeight?: string | number | undefined;
                    minWidth?: string | number | undefined;
                    theme?: string | undefined;
                    contentClass?: any;
                    activator?: string | Element | vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | undefined;
                    openOnClick?: boolean | undefined;
                    openOnFocus?: boolean | undefined;
                    contentProps?: any;
                    attach?: string | boolean | Element | undefined;
                } & {
                    $children?: {} | vue.VNodeChild | {
                        default?: ((args_0: {
                            isActive: vue.Ref<boolean>;
                        }) => vue.VNodeChild) | undefined;
                        activator?: ((args_0: {
                            isActive: boolean;
                            props: Record<string, any>;
                        }) => vue.VNodeChild) | undefined;
                    };
                    'v-slots'?: {
                        default?: false | ((args_0: {
                            isActive: vue.Ref<boolean>;
                        }) => vue.VNodeChild) | undefined;
                        activator?: false | ((args_0: {
                            isActive: boolean;
                            props: Record<string, any>;
                        }) => vue.VNodeChild) | undefined;
                    } | undefined;
                } & {
                    "v-slot:default"?: false | ((args_0: {
                        isActive: vue.Ref<boolean>;
                    }) => vue.VNodeChild) | undefined;
                    "v-slot:activator"?: false | ((args_0: {
                        isActive: boolean;
                        props: Record<string, any>;
                    }) => vue.VNodeChild) | undefined;
                } & {
                    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
                } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "location" | "origin" | "transition" | "zIndex" | "eager" | "disabled" | "modelValue" | "closeDelay" | "openDelay" | "activatorProps" | "openOnClick" | "openOnHover" | "openOnFocus" | "closeOnContentClick" | "locationStrategy" | "scrollStrategy" | "closeOnBack" | "contained" | "noClickAnimation" | "persistent" | "scrim">>;
            };
            multiple: BooleanConstructor;
            noDataText: {
                type: StringConstructor;
                default: string;
            };
            openOnClear: BooleanConstructor;
            valueComparator: {
                type: PropType<typeof deepEqual>;
                default: typeof deepEqual;
            };
            customFilter: PropType<FilterFunction>;
            customKeyFilter: PropType<FilterKeyFunctions>;
            filterKeys: {
                type: PropType<NonNullable<FilterKeys>>;
                default: NonNullable<FilterKeys>;
            };
            filterMode: {
                type: PropType<FilterMode>;
                default: string;
            };
            noFilter: BooleanConstructor;
            delimiters: PropType<string[]>;
        }, "multiple" | "$children" | "items" | "v-slots" | "v-slot:append" | "v-slot:prepend" | "modelValue" | "onUpdate:modelValue" | "v-slot:loader" | "v-slot:details" | "v-slot:clear" | "v-slot:label" | "v-slot:prepend-inner" | "v-slot:append-inner" | "v-slot:item" | "returnObject" | "v-slot:chip" | "v-slot:selection" | "v-slot:prepend-item" | "v-slot:append-item" | "v-slot:no-data">>> & {
            "onUpdate:menu"?: ((val: boolean) => any) | undefined;
            "onUpdate:search"?: ((val: string) => any) | undefined;
        }, {
            isFocused: vue.Ref<boolean>;
            isPristine: vue.Ref<boolean>;
            menu: vue.WritableComputedRef<boolean>;
            search: vue.WritableComputedRef<string>;
            selectionIndex: vue.Ref<number>;
            filteredItems: vue.Ref<InternalItem<any>[]>;
            select: (item: InternalItem) => void;
        } & Omit<any, string | number | symbol>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Omit<{
            'update:modelValue': (val: any) => true;
            'update:search': (val: string) => true;
            'update:menu': (val: boolean) => true;
        }, "multiple" | "$children" | "items" | "v-slots" | "v-slot:append" | "v-slot:prepend" | "modelValue" | "update:modelValue" | "v-slot:loader" | "v-slot:details" | "v-slot:clear" | "v-slot:label" | "v-slot:prepend-inner" | "v-slot:append-inner" | "v-slot:item" | "returnObject" | "v-slot:chip" | "v-slot:selection" | "v-slot:prepend-item" | "v-slot:append-item" | "v-slot:no-data">, string, {
            reverse: boolean;
            type: string;
            error: boolean;
            active: boolean;
            direction: "horizontal" | "vertical";
            transition: NonNullable<string | boolean | (vue.TransitionProps & {
                component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
            })>;
            menu: boolean;
            autofocus: boolean;
            eager: boolean;
            disabled: boolean;
            readonly: boolean;
            noDataText: string;
            messages: string | string[];
            density: Density;
            variant: "filled" | "outlined" | "plain" | "underlined" | "solo";
            clearIcon: IconValue;
            focused: boolean;
            errorMessages: string | string[];
            maxErrors: string | number;
            rules: ValidationRule[];
            clearable: boolean;
            persistentClear: boolean;
            singleLine: boolean;
            persistentHint: boolean;
            persistentPlaceholder: boolean;
            persistentCounter: boolean;
            valueComparator: typeof deepEqual;
            itemTitle: SelectItemKey;
            itemValue: SelectItemKey;
            itemChildren: NonNullable<SelectItemKey>;
            itemProps: SelectItemKey;
            chips: boolean;
            closableChips: boolean;
            hideNoData: boolean;
            hideSelected: boolean;
            menuIcon: IconValue;
            openOnClear: boolean;
            filterMode: FilterMode;
            noFilter: boolean;
            filterKeys: NonNullable<FilterKeys>;
        }, {}, string> & {
            beforeCreate?: ((() => void) | (() => void)[]) | undefined;
            created?: ((() => void) | (() => void)[]) | undefined;
            beforeMount?: ((() => void) | (() => void)[]) | undefined;
            mounted?: ((() => void) | (() => void)[]) | undefined;
            beforeUpdate?: ((() => void) | (() => void)[]) | undefined;
            updated?: ((() => void) | (() => void)[]) | undefined;
            activated?: ((() => void) | (() => void)[]) | undefined;
            deactivated?: ((() => void) | (() => void)[]) | undefined;
            beforeDestroy?: ((() => void) | (() => void)[]) | undefined;
            beforeUnmount?: ((() => void) | (() => void)[]) | undefined;
            destroyed?: ((() => void) | (() => void)[]) | undefined;
            unmounted?: ((() => void) | (() => void)[]) | undefined;
            renderTracked?: (((e: vue.DebuggerEvent) => void) | ((e: vue.DebuggerEvent) => void)[]) | undefined;
            renderTriggered?: (((e: vue.DebuggerEvent) => void) | ((e: vue.DebuggerEvent) => void)[]) | undefined;
            errorCaptured?: (((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null, info: string) => boolean | void) | ((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null, info: string) => boolean | void)[]) | undefined;
        };
        $forceUpdate: () => void;
        $nextTick: typeof nextTick;
        $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (args_0: R, args_1: R) => any : (...args: any) => any, options?: vue.WatchOptions<boolean> | undefined): vue.WatchStopHandle;
    } & Readonly<vue.ExtractPropTypes<Omit<{
        transition: Omit<{
            type: PropType<string | boolean | (vue.TransitionProps & {
                component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
            })>;
            default: string;
            validator: (val: unknown) => boolean;
        }, "type" | "default"> & {
            type: PropType<NonNullable<string | boolean | (vue.TransitionProps & {
                component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
            })>>;
            default: NonNullable<string | boolean | (vue.TransitionProps & {
                component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
            })>;
        };
        reverse: BooleanConstructor;
        type: {
            type: StringConstructor;
            default: string;
        };
        error: BooleanConstructor;
        id: StringConstructor;
        active: BooleanConstructor;
        name: StringConstructor;
        color: StringConstructor;
        direction: {
            type: PropType<"horizontal" | "vertical">;
            default: string;
            validator: (v: any) => boolean;
        };
        loading: (StringConstructor | BooleanConstructor)[];
        label: StringConstructor;
        prefix: StringConstructor;
        autofocus: BooleanConstructor;
        disabled: BooleanConstructor;
        readonly: BooleanConstructor;
        placeholder: StringConstructor;
        theme: StringConstructor;
        counter: PropType<string | number | true>;
        messages: {
            type: PropType<string | string[]>;
            default: () => never[];
        };
        density: {
            type: PropType<Density>;
            default: string;
            validator: (v: any) => boolean;
        };
        variant: {
            type: PropType<"filled" | "outlined" | "plain" | "underlined" | "solo">;
            default: string;
            validator: (v: any) => boolean;
        };
        modelValue: {
            type: PropType<any>;
            default: any;
        };
        bgColor: StringConstructor;
        prependIcon: PropType<IconValue>;
        appendIcon: PropType<IconValue>;
        clearIcon: {
            type: PropType<IconValue>;
            default: string;
        };
        prependInnerIcon: PropType<IconValue>;
        'onClick:clear': PropType<EventProp<(...args: any[]) => any>>;
        'onClick:append': PropType<EventProp<(...args: any[]) => any>>;
        'onClick:prepend': PropType<EventProp<(...args: any[]) => any>>;
        'onClick:appendInner': PropType<EventProp<(...args: any[]) => any>>;
        'onClick:prependInner': PropType<EventProp<(...args: any[]) => any>>;
        focused: BooleanConstructor;
        validateOn: PropType<"input" | "blur" | "submit" | undefined>;
        errorMessages: {
            type: PropType<string | string[]>;
            default: () => never[];
        };
        maxErrors: {
            type: (StringConstructor | NumberConstructor)[];
            default: number;
        };
        rules: {
            type: PropType<ValidationRule[]>;
            default: () => never[];
        };
        hideDetails: PropType<boolean | "auto">;
        clearable: BooleanConstructor;
        persistentClear: BooleanConstructor;
        singleLine: BooleanConstructor;
        hint: StringConstructor;
        persistentHint: BooleanConstructor;
        persistentPlaceholder: BooleanConstructor;
        persistentCounter: BooleanConstructor;
        suffix: StringConstructor;
        counterValue: PropType<(value: any) => number>;
        items: {
            type: PropType<any[]>;
            default: () => never[];
        };
        itemTitle: {
            type: PropType<SelectItemKey>;
            default: string;
        };
        itemValue: {
            type: PropType<SelectItemKey>;
            default: string;
        };
        itemChildren: Omit<{
            type: PropType<SelectItemKey>;
            default: string;
        }, "type" | "default"> & {
            type: PropType<NonNullable<SelectItemKey>>;
            default: NonNullable<SelectItemKey>;
        };
        itemProps: {
            type: PropType<SelectItemKey>;
            default: string;
        };
        returnObject: {
            type: PropType<boolean>;
            default: boolean;
        };
        chips: BooleanConstructor;
        closableChips: BooleanConstructor;
        eager: BooleanConstructor;
        hideNoData: {
            type: PropType<boolean>;
            default: boolean;
        };
        hideSelected: BooleanConstructor;
        menu: BooleanConstructor;
        menuIcon: {
            type: PropType<IconValue>;
            default: string;
        };
        menuProps: {
            type: PropType<Partial<{
                location: Anchor;
                origin: "auto" | Anchor | "overlap";
                transition: NonNullable<string | boolean | (vue.TransitionProps & {
                    component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
                })> | {
                    component: vue.DefineComponent<{} & {
                        target?: HTMLElement | undefined;
                    } & {
                        $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                            default?: (() => vue.VNodeChild) | undefined;
                        };
                        'v-slots'?: {
                            default?: false | (() => vue.VNodeChild) | undefined;
                        } | undefined;
                    } & {
                        "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                    }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {} & {
                        target?: HTMLElement | undefined;
                    } & {
                        $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                            default?: (() => vue.VNodeChild) | undefined;
                        };
                        'v-slots'?: {
                            default?: false | (() => vue.VNodeChild) | undefined;
                        } | undefined;
                    } & {
                        "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                    }, {}>;
                };
                zIndex: string | number;
                eager: boolean;
                disabled: boolean;
                modelValue: boolean;
                closeDelay: NonNullable<string | number>;
                openDelay: NonNullable<string | number>;
                activatorProps: Record<string, any>;
                openOnClick: boolean;
                openOnHover: boolean;
                openOnFocus: boolean;
                closeOnContentClick: boolean;
                locationStrategy: NonNullable<"connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
                    updateLocation: (e: Event) => void;
                } | undefined)>;
                scrollStrategy: NonNullable<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition">;
                closeOnBack: boolean;
                contained: boolean;
                noClickAnimation: boolean;
                persistent: boolean;
                scrim: NonNullable<string | boolean>;
            }> & Omit<{
                location: Anchor;
                origin: "auto" | Anchor | "overlap";
                transition: NonNullable<string | boolean | (vue.TransitionProps & {
                    component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
                })> | {
                    component: vue.DefineComponent<{} & {
                        target?: HTMLElement | undefined;
                    } & {
                        $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                            default?: (() => vue.VNodeChild) | undefined;
                        };
                        'v-slots'?: {
                            default?: false | (() => vue.VNodeChild) | undefined;
                        } | undefined;
                    } & {
                        "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                    }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {} & {
                        target?: HTMLElement | undefined;
                    } & {
                        $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                            default?: (() => vue.VNodeChild) | undefined;
                        };
                        'v-slots'?: {
                            default?: false | (() => vue.VNodeChild) | undefined;
                        } | undefined;
                    } & {
                        "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                    }, {}>;
                };
                zIndex: string | number;
                eager: boolean;
                disabled: boolean;
                modelValue: boolean;
                closeDelay: NonNullable<string | number>;
                openDelay: NonNullable<string | number>;
                activatorProps: Record<string, any>;
                openOnHover: boolean;
                closeOnContentClick: boolean;
                locationStrategy: NonNullable<"connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
                    updateLocation: (e: Event) => void;
                } | undefined)>;
                scrollStrategy: NonNullable<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition">;
                closeOnBack: boolean;
                contained: boolean;
                noClickAnimation: boolean;
                persistent: boolean;
                scrim: NonNullable<string | boolean>;
            } & {
                offset?: string | number | number[] | undefined;
                id?: string | undefined;
                height?: string | number | undefined;
                width?: string | number | undefined;
                maxHeight?: string | number | undefined;
                maxWidth?: string | number | undefined;
                minHeight?: string | number | undefined;
                minWidth?: string | number | undefined;
                theme?: string | undefined;
                contentClass?: any;
                activator?: string | Element | vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | undefined;
                openOnClick?: boolean | undefined;
                openOnFocus?: boolean | undefined;
                contentProps?: any;
                attach?: string | boolean | Element | undefined;
            } & {
                $children?: {} | vue.VNodeChild | {
                    default?: ((args_0: {
                        isActive: vue.Ref<boolean>;
                    }) => vue.VNodeChild) | undefined;
                    activator?: ((args_0: {
                        isActive: boolean;
                        props: Record<string, any>;
                    }) => vue.VNodeChild) | undefined;
                };
                'v-slots'?: {
                    default?: false | ((args_0: {
                        isActive: vue.Ref<boolean>;
                    }) => vue.VNodeChild) | undefined;
                    activator?: false | ((args_0: {
                        isActive: boolean;
                        props: Record<string, any>;
                    }) => vue.VNodeChild) | undefined;
                } | undefined;
            } & {
                "v-slot:default"?: false | ((args_0: {
                    isActive: vue.Ref<boolean>;
                }) => vue.VNodeChild) | undefined;
                "v-slot:activator"?: false | ((args_0: {
                    isActive: boolean;
                    props: Record<string, any>;
                }) => vue.VNodeChild) | undefined;
            } & {
                "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
            } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "location" | "origin" | "transition" | "zIndex" | "eager" | "disabled" | "modelValue" | "closeDelay" | "openDelay" | "activatorProps" | "openOnClick" | "openOnHover" | "openOnFocus" | "closeOnContentClick" | "locationStrategy" | "scrollStrategy" | "closeOnBack" | "contained" | "noClickAnimation" | "persistent" | "scrim">>;
        };
        multiple: BooleanConstructor;
        noDataText: {
            type: StringConstructor;
            default: string;
        };
        openOnClear: BooleanConstructor;
        valueComparator: {
            type: PropType<typeof deepEqual>;
            default: typeof deepEqual;
        };
        customFilter: PropType<FilterFunction>;
        customKeyFilter: PropType<FilterKeyFunctions>;
        filterKeys: {
            type: PropType<NonNullable<FilterKeys>>;
            default: NonNullable<FilterKeys>;
        };
        filterMode: {
            type: PropType<FilterMode>;
            default: string;
        };
        noFilter: BooleanConstructor;
        delimiters: PropType<string[]>;
    }, "multiple" | "$children" | "items" | "v-slots" | "v-slot:append" | "v-slot:prepend" | "modelValue" | "onUpdate:modelValue" | "v-slot:loader" | "v-slot:details" | "v-slot:clear" | "v-slot:label" | "v-slot:prepend-inner" | "v-slot:append-inner" | "v-slot:item" | "returnObject" | "v-slot:chip" | "v-slot:selection" | "v-slot:prepend-item" | "v-slot:append-item" | "v-slot:no-data">>> & {
        "onUpdate:menu"?: ((val: boolean) => any) | undefined;
        "onUpdate:search"?: ((val: string) => any) | undefined;
    } & vue.ShallowUnwrapRef<{
        isFocused: vue.Ref<boolean>;
        isPristine: vue.Ref<boolean>;
        menu: vue.WritableComputedRef<boolean>;
        search: vue.WritableComputedRef<string>;
        selectionIndex: vue.Ref<number>;
        filteredItems: vue.Ref<InternalItem<any>[]>;
        select: (item: InternalItem) => void;
    } & Omit<any, string | number | symbol>> & {} & vue.ComponentCustomProperties & {};
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & vue.ComponentOptionsBase<Readonly<vue.ExtractPropTypes<Omit<{
    transition: Omit<{
        type: PropType<string | boolean | (vue.TransitionProps & {
            component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
        })>;
        default: string;
        validator: (val: unknown) => boolean;
    }, "type" | "default"> & {
        type: PropType<NonNullable<string | boolean | (vue.TransitionProps & {
            component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
        })>>;
        default: NonNullable<string | boolean | (vue.TransitionProps & {
            component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
        })>;
    };
    reverse: BooleanConstructor;
    type: {
        type: StringConstructor;
        default: string;
    };
    error: BooleanConstructor;
    id: StringConstructor;
    active: BooleanConstructor;
    name: StringConstructor;
    color: StringConstructor;
    direction: {
        type: PropType<"horizontal" | "vertical">;
        default: string;
        validator: (v: any) => boolean;
    };
    loading: (StringConstructor | BooleanConstructor)[];
    label: StringConstructor;
    prefix: StringConstructor;
    autofocus: BooleanConstructor;
    disabled: BooleanConstructor;
    readonly: BooleanConstructor;
    placeholder: StringConstructor;
    theme: StringConstructor;
    counter: PropType<string | number | true>;
    messages: {
        type: PropType<string | string[]>;
        default: () => never[];
    };
    density: {
        type: PropType<Density>;
        default: string;
        validator: (v: any) => boolean;
    };
    variant: {
        type: PropType<"filled" | "outlined" | "plain" | "underlined" | "solo">;
        default: string;
        validator: (v: any) => boolean;
    };
    modelValue: {
        type: PropType<any>;
        default: any;
    };
    bgColor: StringConstructor;
    prependIcon: PropType<IconValue>;
    appendIcon: PropType<IconValue>;
    clearIcon: {
        type: PropType<IconValue>;
        default: string;
    };
    prependInnerIcon: PropType<IconValue>;
    'onClick:clear': PropType<EventProp<(...args: any[]) => any>>;
    'onClick:append': PropType<EventProp<(...args: any[]) => any>>;
    'onClick:prepend': PropType<EventProp<(...args: any[]) => any>>;
    'onClick:appendInner': PropType<EventProp<(...args: any[]) => any>>;
    'onClick:prependInner': PropType<EventProp<(...args: any[]) => any>>;
    focused: BooleanConstructor;
    validateOn: PropType<"input" | "blur" | "submit" | undefined>;
    errorMessages: {
        type: PropType<string | string[]>;
        default: () => never[];
    };
    maxErrors: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    rules: {
        type: PropType<ValidationRule[]>;
        default: () => never[];
    };
    hideDetails: PropType<boolean | "auto">;
    clearable: BooleanConstructor;
    persistentClear: BooleanConstructor;
    singleLine: BooleanConstructor;
    hint: StringConstructor;
    persistentHint: BooleanConstructor;
    persistentPlaceholder: BooleanConstructor;
    persistentCounter: BooleanConstructor;
    suffix: StringConstructor;
    counterValue: PropType<(value: any) => number>;
    items: {
        type: PropType<any[]>;
        default: () => never[];
    };
    itemTitle: {
        type: PropType<SelectItemKey>;
        default: string;
    };
    itemValue: {
        type: PropType<SelectItemKey>;
        default: string;
    };
    itemChildren: Omit<{
        type: PropType<SelectItemKey>;
        default: string;
    }, "type" | "default"> & {
        type: PropType<NonNullable<SelectItemKey>>;
        default: NonNullable<SelectItemKey>;
    };
    itemProps: {
        type: PropType<SelectItemKey>;
        default: string;
    };
    returnObject: {
        type: PropType<boolean>;
        default: boolean;
    };
    chips: BooleanConstructor;
    closableChips: BooleanConstructor;
    eager: BooleanConstructor;
    hideNoData: {
        type: PropType<boolean>;
        default: boolean;
    };
    hideSelected: BooleanConstructor;
    menu: BooleanConstructor;
    menuIcon: {
        type: PropType<IconValue>;
        default: string;
    };
    menuProps: {
        type: PropType<Partial<{
            location: Anchor;
            origin: "auto" | Anchor | "overlap";
            transition: NonNullable<string | boolean | (vue.TransitionProps & {
                component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
            })> | {
                component: vue.DefineComponent<{} & {
                    target?: HTMLElement | undefined;
                } & {
                    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                        default?: (() => vue.VNodeChild) | undefined;
                    };
                    'v-slots'?: {
                        default?: false | (() => vue.VNodeChild) | undefined;
                    } | undefined;
                } & {
                    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {} & {
                    target?: HTMLElement | undefined;
                } & {
                    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                        default?: (() => vue.VNodeChild) | undefined;
                    };
                    'v-slots'?: {
                        default?: false | (() => vue.VNodeChild) | undefined;
                    } | undefined;
                } & {
                    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                }, {}>;
            };
            zIndex: string | number;
            eager: boolean;
            disabled: boolean;
            modelValue: boolean;
            closeDelay: NonNullable<string | number>;
            openDelay: NonNullable<string | number>;
            activatorProps: Record<string, any>;
            openOnClick: boolean;
            openOnHover: boolean;
            openOnFocus: boolean;
            closeOnContentClick: boolean;
            locationStrategy: NonNullable<"connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
                updateLocation: (e: Event) => void;
            } | undefined)>;
            scrollStrategy: NonNullable<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition">;
            closeOnBack: boolean;
            contained: boolean;
            noClickAnimation: boolean;
            persistent: boolean;
            scrim: NonNullable<string | boolean>;
        }> & Omit<{
            location: Anchor;
            origin: "auto" | Anchor | "overlap";
            transition: NonNullable<string | boolean | (vue.TransitionProps & {
                component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
            })> | {
                component: vue.DefineComponent<{} & {
                    target?: HTMLElement | undefined;
                } & {
                    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                        default?: (() => vue.VNodeChild) | undefined;
                    };
                    'v-slots'?: {
                        default?: false | (() => vue.VNodeChild) | undefined;
                    } | undefined;
                } & {
                    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {} & {
                    target?: HTMLElement | undefined;
                } & {
                    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                        default?: (() => vue.VNodeChild) | undefined;
                    };
                    'v-slots'?: {
                        default?: false | (() => vue.VNodeChild) | undefined;
                    } | undefined;
                } & {
                    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                }, {}>;
            };
            zIndex: string | number;
            eager: boolean;
            disabled: boolean;
            modelValue: boolean;
            closeDelay: NonNullable<string | number>;
            openDelay: NonNullable<string | number>;
            activatorProps: Record<string, any>;
            openOnHover: boolean;
            closeOnContentClick: boolean;
            locationStrategy: NonNullable<"connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
                updateLocation: (e: Event) => void;
            } | undefined)>;
            scrollStrategy: NonNullable<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition">;
            closeOnBack: boolean;
            contained: boolean;
            noClickAnimation: boolean;
            persistent: boolean;
            scrim: NonNullable<string | boolean>;
        } & {
            offset?: string | number | number[] | undefined;
            id?: string | undefined;
            height?: string | number | undefined;
            width?: string | number | undefined;
            maxHeight?: string | number | undefined;
            maxWidth?: string | number | undefined;
            minHeight?: string | number | undefined;
            minWidth?: string | number | undefined;
            theme?: string | undefined;
            contentClass?: any;
            activator?: string | Element | vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | undefined;
            openOnClick?: boolean | undefined;
            openOnFocus?: boolean | undefined;
            contentProps?: any;
            attach?: string | boolean | Element | undefined;
        } & {
            $children?: {} | vue.VNodeChild | {
                default?: ((args_0: {
                    isActive: vue.Ref<boolean>;
                }) => vue.VNodeChild) | undefined;
                activator?: ((args_0: {
                    isActive: boolean;
                    props: Record<string, any>;
                }) => vue.VNodeChild) | undefined;
            };
            'v-slots'?: {
                default?: false | ((args_0: {
                    isActive: vue.Ref<boolean>;
                }) => vue.VNodeChild) | undefined;
                activator?: false | ((args_0: {
                    isActive: boolean;
                    props: Record<string, any>;
                }) => vue.VNodeChild) | undefined;
            } | undefined;
        } & {
            "v-slot:default"?: false | ((args_0: {
                isActive: vue.Ref<boolean>;
            }) => vue.VNodeChild) | undefined;
            "v-slot:activator"?: false | ((args_0: {
                isActive: boolean;
                props: Record<string, any>;
            }) => vue.VNodeChild) | undefined;
        } & {
            "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
        } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "location" | "origin" | "transition" | "zIndex" | "eager" | "disabled" | "modelValue" | "closeDelay" | "openDelay" | "activatorProps" | "openOnClick" | "openOnHover" | "openOnFocus" | "closeOnContentClick" | "locationStrategy" | "scrollStrategy" | "closeOnBack" | "contained" | "noClickAnimation" | "persistent" | "scrim">>;
    };
    multiple: BooleanConstructor;
    noDataText: {
        type: StringConstructor;
        default: string;
    };
    openOnClear: BooleanConstructor;
    valueComparator: {
        type: PropType<typeof deepEqual>;
        default: typeof deepEqual;
    };
    customFilter: PropType<FilterFunction>;
    customKeyFilter: PropType<FilterKeyFunctions>;
    filterKeys: {
        type: PropType<NonNullable<FilterKeys>>;
        default: NonNullable<FilterKeys>;
    };
    filterMode: {
        type: PropType<FilterMode>;
        default: string;
    };
    noFilter: BooleanConstructor;
    delimiters: PropType<string[]>;
}, "multiple" | "$children" | "items" | "v-slots" | "v-slot:append" | "v-slot:prepend" | "modelValue" | "onUpdate:modelValue" | "v-slot:loader" | "v-slot:details" | "v-slot:clear" | "v-slot:label" | "v-slot:prepend-inner" | "v-slot:append-inner" | "v-slot:item" | "returnObject" | "v-slot:chip" | "v-slot:selection" | "v-slot:prepend-item" | "v-slot:append-item" | "v-slot:no-data">>> & {
    "onUpdate:menu"?: ((val: boolean) => any) | undefined;
    "onUpdate:search"?: ((val: string) => any) | undefined;
}, {
    isFocused: vue.Ref<boolean>;
    isPristine: vue.Ref<boolean>;
    menu: vue.WritableComputedRef<boolean>;
    search: vue.WritableComputedRef<string>;
    selectionIndex: vue.Ref<number>;
    filteredItems: vue.Ref<InternalItem<any>[]>;
    select: (item: InternalItem) => void;
} & Omit<any, string | number | symbol>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Omit<{
    'update:modelValue': (val: any) => true;
    'update:search': (val: string) => true;
    'update:menu': (val: boolean) => true;
}, "multiple" | "$children" | "items" | "v-slots" | "v-slot:append" | "v-slot:prepend" | "modelValue" | "update:modelValue" | "v-slot:loader" | "v-slot:details" | "v-slot:clear" | "v-slot:label" | "v-slot:prepend-inner" | "v-slot:append-inner" | "v-slot:item" | "returnObject" | "v-slot:chip" | "v-slot:selection" | "v-slot:prepend-item" | "v-slot:append-item" | "v-slot:no-data">, string, {
    reverse: boolean;
    type: string;
    error: boolean;
    active: boolean;
    direction: "horizontal" | "vertical";
    transition: NonNullable<string | boolean | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    })>;
    menu: boolean;
    autofocus: boolean;
    eager: boolean;
    disabled: boolean;
    readonly: boolean;
    noDataText: string;
    messages: string | string[];
    density: Density;
    variant: "filled" | "outlined" | "plain" | "underlined" | "solo";
    clearIcon: IconValue;
    focused: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    clearable: boolean;
    persistentClear: boolean;
    singleLine: boolean;
    persistentHint: boolean;
    persistentPlaceholder: boolean;
    persistentCounter: boolean;
    valueComparator: typeof deepEqual;
    itemTitle: SelectItemKey;
    itemValue: SelectItemKey;
    itemChildren: NonNullable<SelectItemKey>;
    itemProps: SelectItemKey;
    chips: boolean;
    closableChips: boolean;
    hideNoData: boolean;
    hideSelected: boolean;
    menuIcon: IconValue;
    openOnClear: boolean;
    filterMode: FilterMode;
    noFilter: boolean;
    filterKeys: NonNullable<FilterKeys>;
}, {}, string> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & (new <T_1, ReturnObject extends boolean = true, Multiple extends boolean = false, V extends Value$1<T_1, ReturnObject, Multiple> = Value$1<T_1, ReturnObject, Multiple>>() => {
    $props: {
        items?: readonly T_1[] | undefined;
        returnObject?: ReturnObject | undefined;
        multiple?: Multiple | undefined;
        modelValue?: V | undefined;
        'onUpdate:modelValue'?: ((val: V) => void) | undefined;
    } & {
        $children?: {} | vue.VNodeChild | {
            clear?: (() => vue.VNodeChild) | undefined;
            details?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            label?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
            append?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            prepend?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            loader?: ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
            'prepend-inner'?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
            'append-inner'?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
            item?: ((args_0: {
                item: InternalItem<T_1>;
                index: number;
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            chip?: ((args_0: {
                item: InternalItem<T_1>;
                index: number;
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            selection?: ((args_0: {
                item: InternalItem<T_1>;
                index: number;
            }) => vue.VNodeChild) | undefined;
            'prepend-item'?: (() => vue.VNodeChild) | undefined;
            'append-item'?: (() => vue.VNodeChild) | undefined;
            'no-data'?: (() => vue.VNodeChild) | undefined;
        };
        'v-slots'?: {
            clear?: false | (() => vue.VNodeChild) | undefined;
            details?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            label?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
            append?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            prepend?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            loader?: false | ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
            'prepend-inner'?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
            'append-inner'?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
            item?: false | ((args_0: {
                item: InternalItem<T_1>;
                index: number;
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            chip?: false | ((args_0: {
                item: InternalItem<T_1>;
                index: number;
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            selection?: false | ((args_0: {
                item: InternalItem<T_1>;
                index: number;
            }) => vue.VNodeChild) | undefined;
            'prepend-item'?: false | (() => vue.VNodeChild) | undefined;
            'append-item'?: false | (() => vue.VNodeChild) | undefined;
            'no-data'?: false | (() => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:clear"?: false | (() => vue.VNodeChild) | undefined;
        "v-slot:details"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:label"?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:append"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:prepend"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:loader"?: false | ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
        "v-slot:prepend-inner"?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:append-inner"?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:item"?: false | ((args_0: {
            item: InternalItem<T_1>;
            index: number;
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        "v-slot:chip"?: false | ((args_0: {
            item: InternalItem<T_1>;
            index: number;
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        "v-slot:selection"?: false | ((args_0: {
            item: InternalItem<T_1>;
            index: number;
        }) => vue.VNodeChild) | undefined;
        "v-slot:prepend-item"?: false | (() => vue.VNodeChild) | undefined;
        "v-slot:append-item"?: false | (() => vue.VNodeChild) | undefined;
        "v-slot:no-data"?: false | (() => vue.VNodeChild) | undefined;
    };
});
type VCombobox = InstanceType<typeof VCombobox>;

declare const VCounter: vue.DefineComponent<{
    active: boolean;
    transition: NonNullable<string | boolean | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    })> | {
        component: vue.DefineComponent<{
            origin: string;
            group: boolean;
            mode: string;
            hideOnLeave: boolean;
            leaveAbsolute: boolean;
        } & {} & {
            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                default?: (() => vue.VNodeChild) | undefined;
            };
            'v-slots'?: {
                default?: false | (() => vue.VNodeChild) | undefined;
            } | undefined;
        } & {
            "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
        }, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
            origin: string;
            group: boolean;
            mode: string;
            hideOnLeave: boolean;
            leaveAbsolute: boolean;
        } & {} & {
            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                default?: (() => vue.VNodeChild) | undefined;
            };
            'v-slots'?: {
                default?: false | (() => vue.VNodeChild) | undefined;
            } | undefined;
        } & {
            "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
        }, {
            origin: string;
            group: boolean;
            mode: string;
            hideOnLeave: boolean;
            leaveAbsolute: boolean;
        }>;
    };
    value: string | number;
} & {
    max?: string | number | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    active: boolean;
    transition: NonNullable<string | boolean | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    })> | {
        component: vue.DefineComponent<{
            origin: string;
            group: boolean;
            mode: string;
            hideOnLeave: boolean;
            leaveAbsolute: boolean;
        } & {} & {
            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                default?: (() => vue.VNodeChild) | undefined;
            };
            'v-slots'?: {
                default?: false | (() => vue.VNodeChild) | undefined;
            } | undefined;
        } & {
            "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
        }, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
            origin: string;
            group: boolean;
            mode: string;
            hideOnLeave: boolean;
            leaveAbsolute: boolean;
        } & {} & {
            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                default?: (() => vue.VNodeChild) | undefined;
            };
            'v-slots'?: {
                default?: false | (() => vue.VNodeChild) | undefined;
            } | undefined;
        } & {
            "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
        }, {
            origin: string;
            group: boolean;
            mode: string;
            hideOnLeave: boolean;
            leaveAbsolute: boolean;
        }>;
    };
    value: string | number;
} & {
    max?: string | number | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    active: boolean;
    transition: NonNullable<string | boolean | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    })> | {
        component: vue.DefineComponent<{
            origin: string;
            group: boolean;
            mode: string;
            hideOnLeave: boolean;
            leaveAbsolute: boolean;
        } & {} & {
            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                default?: (() => vue.VNodeChild) | undefined;
            };
            'v-slots'?: {
                default?: false | (() => vue.VNodeChild) | undefined;
            } | undefined;
        } & {
            "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
        }, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
            origin: string;
            group: boolean;
            mode: string;
            hideOnLeave: boolean;
            leaveAbsolute: boolean;
        } & {} & {
            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                default?: (() => vue.VNodeChild) | undefined;
            };
            'v-slots'?: {
                default?: false | (() => vue.VNodeChild) | undefined;
            } | undefined;
        } & {
            "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
        }, {
            origin: string;
            group: boolean;
            mode: string;
            hideOnLeave: boolean;
            leaveAbsolute: boolean;
        }>;
    };
    value: string | number;
}>;
type VCounter = InstanceType<typeof VCounter>;

declare const VDefaultsProvider: vue.DefineComponent<{
    root: boolean;
    scoped: boolean;
} & {
    reset?: string | number | undefined;
    defaults?: DefaultsOptions;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>[] | undefined, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    root: boolean;
    scoped: boolean;
} & {
    reset?: string | number | undefined;
    defaults?: DefaultsOptions;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    root: boolean;
    scoped: boolean;
}>;
type VDefaultsProvider = InstanceType<typeof VDefaultsProvider>;

declare const VDialog: vue.DefineComponent<{
    absolute: boolean;
    location: Anchor;
    origin: NonNullable<"auto" | Anchor | "overlap">;
    transition: NonNullable<string | boolean | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    })> | {
        component: vue.DefineComponent<{} & {
            target?: HTMLElement | undefined;
        } & {
            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                default?: (() => vue.VNodeChild) | undefined;
            };
            'v-slots'?: {
                default?: false | (() => vue.VNodeChild) | undefined;
            } | undefined;
        } & {
            "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
        }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {} & {
            target?: HTMLElement | undefined;
        } & {
            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                default?: (() => vue.VNodeChild) | undefined;
            };
            'v-slots'?: {
                default?: false | (() => vue.VNodeChild) | undefined;
            } | undefined;
        } & {
            "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
        }, {}>;
    };
    zIndex: NonNullable<string | number>;
    eager: boolean;
    disabled: boolean;
    modelValue: boolean;
    activatorProps: Record<string, any>;
    openOnHover: boolean;
    closeOnContentClick: boolean;
    locationStrategy: "connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
        updateLocation: (e: Event) => void;
    } | undefined);
    scrollStrategy: NonNullable<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition">;
    closeOnBack: boolean;
    contained: boolean;
    noClickAnimation: boolean;
    persistent: boolean;
    scrim: string | boolean;
    fullscreen: boolean;
    scrollable: boolean;
    retainFocus: boolean;
} & {
    offset?: string | number | number[] | undefined;
    height?: string | number | undefined;
    width?: string | number | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
    theme?: string | undefined;
    contentClass?: any;
    activator?: string | Element | vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | undefined;
    closeDelay?: string | number | undefined;
    openDelay?: string | number | undefined;
    openOnClick?: boolean | undefined;
    openOnFocus?: boolean | undefined;
    contentProps?: any;
    attach?: string | boolean | Element | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: ((args_0: {
            isActive: vue.Ref<boolean>;
        }) => vue.VNodeChild) | undefined;
        activator?: ((args_0: {
            isActive: boolean;
            props: Record<string, any>;
        }) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | ((args_0: {
            isActive: vue.Ref<boolean>;
        }) => vue.VNodeChild) | undefined;
        activator?: false | ((args_0: {
            isActive: boolean;
            props: Record<string, any>;
        }) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | ((args_0: {
        isActive: vue.Ref<boolean>;
    }) => vue.VNodeChild) | undefined;
    "v-slot:activator"?: false | ((args_0: {
        isActive: boolean;
        props: Record<string, any>;
    }) => vue.VNodeChild) | undefined;
}, Omit<Omit<{
    $: vue.ComponentInternalInstance;
    $data: {};
    $props: Partial<{
        absolute: boolean;
        location: Anchor;
        origin: "auto" | Anchor | "overlap";
        transition: string | boolean | (vue.TransitionProps & {
            component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
        });
        zIndex: string | number;
        eager: boolean;
        disabled: boolean;
        modelValue: boolean;
        activatorProps: Record<string, any>;
        openOnClick: boolean;
        openOnHover: boolean;
        openOnFocus: boolean;
        closeOnContentClick: boolean;
        locationStrategy: "connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
            updateLocation: (e: Event) => void;
        } | undefined);
        scrollStrategy: "none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition";
        closeOnBack: boolean;
        contained: boolean;
        noClickAnimation: boolean;
        persistent: boolean;
        scrim: string | boolean;
        _disableGlobalStack: boolean;
    }> & Omit<{
        absolute: boolean;
        location: Anchor;
        origin: "auto" | Anchor | "overlap";
        transition: string | boolean | (vue.TransitionProps & {
            component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
        });
        zIndex: string | number;
        eager: boolean;
        disabled: boolean;
        modelValue: boolean;
        activatorProps: Record<string, any>;
        openOnHover: boolean;
        closeOnContentClick: boolean;
        locationStrategy: "connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
            updateLocation: (e: Event) => void;
        } | undefined);
        scrollStrategy: "none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition";
        closeOnBack: boolean;
        contained: boolean;
        noClickAnimation: boolean;
        persistent: boolean;
        scrim: string | boolean;
        _disableGlobalStack: boolean;
    } & {
        offset?: string | number | number[] | undefined;
        height?: string | number | undefined;
        width?: string | number | undefined;
        maxHeight?: string | number | undefined;
        maxWidth?: string | number | undefined;
        minHeight?: string | number | undefined;
        minWidth?: string | number | undefined;
        theme?: string | undefined;
        contentClass?: any;
        activator?: string | Element | vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | undefined;
        closeDelay?: string | number | undefined;
        openDelay?: string | number | undefined;
        openOnClick?: boolean | undefined;
        openOnFocus?: boolean | undefined;
        contentProps?: any;
        attach?: string | boolean | Element | undefined;
    } & {
        $children?: {} | vue.VNodeChild | {
            default?: ((args_0: {
                isActive: vue.Ref<boolean>;
            }) => vue.VNodeChild) | undefined;
            activator?: ((args_0: {
                isActive: boolean;
                props: Record<string, any>;
            }) => vue.VNodeChild) | undefined;
        };
        'v-slots'?: {
            default?: false | ((args_0: {
                isActive: vue.Ref<boolean>;
            }) => vue.VNodeChild) | undefined;
            activator?: false | ((args_0: {
                isActive: boolean;
                props: Record<string, any>;
            }) => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:default"?: false | ((args_0: {
            isActive: vue.Ref<boolean>;
        }) => vue.VNodeChild) | undefined;
        "v-slot:activator"?: false | ((args_0: {
            isActive: boolean;
            props: Record<string, any>;
        }) => vue.VNodeChild) | undefined;
    } & {
        onAfterLeave?: (() => any) | undefined;
        "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
        "onClick:outside"?: ((e: MouseEvent) => any) | undefined;
    } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "absolute" | "location" | "origin" | "transition" | "zIndex" | "eager" | "disabled" | "modelValue" | "activatorProps" | "openOnClick" | "openOnHover" | "openOnFocus" | "closeOnContentClick" | "locationStrategy" | "scrollStrategy" | "closeOnBack" | "contained" | "noClickAnimation" | "persistent" | "scrim" | "_disableGlobalStack">;
    $attrs: {
        [x: string]: unknown;
    };
    $refs: {
        [x: string]: unknown;
    };
    $slots: Readonly<{
        [name: string]: vue.Slot | undefined;
    }>;
    $root: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null;
    $parent: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null;
    $emit: ((event: "update:modelValue", value: boolean) => void) & ((event: "click:outside", e: MouseEvent) => void) & ((event: "afterLeave") => void);
    $el: any;
    $options: vue.ComponentOptionsBase<{
        absolute: boolean;
        location: Anchor;
        origin: "auto" | Anchor | "overlap";
        transition: string | boolean | (vue.TransitionProps & {
            component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
        });
        zIndex: string | number;
        eager: boolean;
        disabled: boolean;
        modelValue: boolean;
        activatorProps: Record<string, any>;
        openOnHover: boolean;
        closeOnContentClick: boolean;
        locationStrategy: "connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
            updateLocation: (e: Event) => void;
        } | undefined);
        scrollStrategy: "none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition";
        closeOnBack: boolean;
        contained: boolean;
        noClickAnimation: boolean;
        persistent: boolean;
        scrim: string | boolean;
        _disableGlobalStack: boolean;
    } & {
        offset?: string | number | number[] | undefined;
        height?: string | number | undefined;
        width?: string | number | undefined;
        maxHeight?: string | number | undefined;
        maxWidth?: string | number | undefined;
        minHeight?: string | number | undefined;
        minWidth?: string | number | undefined;
        theme?: string | undefined;
        contentClass?: any;
        activator?: string | Element | vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | undefined;
        closeDelay?: string | number | undefined;
        openDelay?: string | number | undefined;
        openOnClick?: boolean | undefined;
        openOnFocus?: boolean | undefined;
        contentProps?: any;
        attach?: string | boolean | Element | undefined;
    } & {
        $children?: {} | vue.VNodeChild | {
            default?: ((args_0: {
                isActive: vue.Ref<boolean>;
            }) => vue.VNodeChild) | undefined;
            activator?: ((args_0: {
                isActive: boolean;
                props: Record<string, any>;
            }) => vue.VNodeChild) | undefined;
        };
        'v-slots'?: {
            default?: false | ((args_0: {
                isActive: vue.Ref<boolean>;
            }) => vue.VNodeChild) | undefined;
            activator?: false | ((args_0: {
                isActive: boolean;
                props: Record<string, any>;
            }) => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:default"?: false | ((args_0: {
            isActive: vue.Ref<boolean>;
        }) => vue.VNodeChild) | undefined;
        "v-slot:activator"?: false | ((args_0: {
            isActive: boolean;
            props: Record<string, any>;
        }) => vue.VNodeChild) | undefined;
    } & {
        onAfterLeave?: (() => any) | undefined;
        "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
        "onClick:outside"?: ((e: MouseEvent) => any) | undefined;
    }, {
        activatorEl: vue.Ref<HTMLElement | undefined>;
        animateClick: () => void;
        contentEl: vue.Ref<HTMLElement | undefined>;
        globalTop: Readonly<vue.Ref<boolean>>;
        localTop: vue.ComputedRef<boolean>;
        updateLocation: vue.Ref<((e: Event) => void) | undefined>;
    }, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
        'click:outside': (e: MouseEvent) => true;
        'update:modelValue': (value: boolean) => true;
        afterLeave: () => true;
    }, string, {
        absolute: boolean;
        location: Anchor;
        origin: "auto" | Anchor | "overlap";
        transition: string | boolean | (vue.TransitionProps & {
            component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
        });
        zIndex: string | number;
        eager: boolean;
        disabled: boolean;
        modelValue: boolean;
        activatorProps: Record<string, any>;
        openOnClick: boolean;
        openOnHover: boolean;
        openOnFocus: boolean;
        closeOnContentClick: boolean;
        locationStrategy: "connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
            updateLocation: (e: Event) => void;
        } | undefined);
        scrollStrategy: "none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition";
        closeOnBack: boolean;
        contained: boolean;
        noClickAnimation: boolean;
        persistent: boolean;
        scrim: string | boolean;
        _disableGlobalStack: boolean;
    }, {}, string> & {
        beforeCreate?: ((() => void) | (() => void)[]) | undefined;
        created?: ((() => void) | (() => void)[]) | undefined;
        beforeMount?: ((() => void) | (() => void)[]) | undefined;
        mounted?: ((() => void) | (() => void)[]) | undefined;
        beforeUpdate?: ((() => void) | (() => void)[]) | undefined;
        updated?: ((() => void) | (() => void)[]) | undefined;
        activated?: ((() => void) | (() => void)[]) | undefined;
        deactivated?: ((() => void) | (() => void)[]) | undefined;
        beforeDestroy?: ((() => void) | (() => void)[]) | undefined;
        beforeUnmount?: ((() => void) | (() => void)[]) | undefined;
        destroyed?: ((() => void) | (() => void)[]) | undefined;
        unmounted?: ((() => void) | (() => void)[]) | undefined;
        renderTracked?: (((e: vue.DebuggerEvent) => void) | ((e: vue.DebuggerEvent) => void)[]) | undefined;
        renderTriggered?: (((e: vue.DebuggerEvent) => void) | ((e: vue.DebuggerEvent) => void)[]) | undefined;
        errorCaptured?: (((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null, info: string) => boolean | void) | ((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null, info: string) => boolean | void)[]) | undefined;
    };
    $forceUpdate: () => void;
    $nextTick: typeof nextTick;
    $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (args_0: R, args_1: R) => any : (...args: any) => any, options?: vue.WatchOptions<boolean> | undefined): vue.WatchStopHandle;
} & {
    absolute: boolean;
    location: Anchor;
    origin: "auto" | Anchor | "overlap";
    transition: string | boolean | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    });
    zIndex: string | number;
    eager: boolean;
    disabled: boolean;
    modelValue: boolean;
    activatorProps: Record<string, any>;
    openOnHover: boolean;
    closeOnContentClick: boolean;
    locationStrategy: "connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
        updateLocation: (e: Event) => void;
    } | undefined);
    scrollStrategy: "none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition";
    closeOnBack: boolean;
    contained: boolean;
    noClickAnimation: boolean;
    persistent: boolean;
    scrim: string | boolean;
    _disableGlobalStack: boolean;
} & {
    offset?: string | number | number[] | undefined;
    height?: string | number | undefined;
    width?: string | number | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
    theme?: string | undefined;
    contentClass?: any;
    activator?: string | Element | vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | undefined;
    closeDelay?: string | number | undefined;
    openDelay?: string | number | undefined;
    openOnClick?: boolean | undefined;
    openOnFocus?: boolean | undefined;
    contentProps?: any;
    attach?: string | boolean | Element | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: ((args_0: {
            isActive: vue.Ref<boolean>;
        }) => vue.VNodeChild) | undefined;
        activator?: ((args_0: {
            isActive: boolean;
            props: Record<string, any>;
        }) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | ((args_0: {
            isActive: vue.Ref<boolean>;
        }) => vue.VNodeChild) | undefined;
        activator?: false | ((args_0: {
            isActive: boolean;
            props: Record<string, any>;
        }) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | ((args_0: {
        isActive: vue.Ref<boolean>;
    }) => vue.VNodeChild) | undefined;
    "v-slot:activator"?: false | ((args_0: {
        isActive: boolean;
        props: Record<string, any>;
    }) => vue.VNodeChild) | undefined;
} & {
    onAfterLeave?: (() => any) | undefined;
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
    "onClick:outside"?: ((e: MouseEvent) => any) | undefined;
} & vue.ShallowUnwrapRef<{
    activatorEl: vue.Ref<HTMLElement | undefined>;
    animateClick: () => void;
    contentEl: vue.Ref<HTMLElement | undefined>;
    globalTop: Readonly<vue.Ref<boolean>>;
    localTop: vue.ComputedRef<boolean>;
    updateLocation: vue.Ref<((e: Event) => void) | undefined>;
}> & {} & vue.ComponentCustomProperties & {}, "offset" | "height" | "width" | "maxHeight" | "maxWidth" | "minHeight" | "minWidth" | "onAfterLeave" | "$children" | "theme" | "v-slot:default" | "v-slots" | "contentClass" | keyof vue.VNodeProps | keyof vue.AllowedComponentProps | "onUpdate:modelValue" | "activator" | "v-slot:activator" | "closeDelay" | "openDelay" | "contentProps" | "attach" | "onClick:outside" | ("absolute" | "location" | "origin" | "transition" | "zIndex" | "eager" | "disabled" | "modelValue" | "activatorProps" | "openOnClick" | "openOnHover" | "openOnFocus" | "closeOnContentClick" | "locationStrategy" | "scrollStrategy" | "closeOnBack" | "contained" | "noClickAnimation" | "persistent" | "scrim" | "_disableGlobalStack")>, `$${any}`>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (value: boolean) => boolean;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    absolute: boolean;
    location: Anchor;
    origin: NonNullable<"auto" | Anchor | "overlap">;
    transition: NonNullable<string | boolean | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    })> | {
        component: vue.DefineComponent<{} & {
            target?: HTMLElement | undefined;
        } & {
            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                default?: (() => vue.VNodeChild) | undefined;
            };
            'v-slots'?: {
                default?: false | (() => vue.VNodeChild) | undefined;
            } | undefined;
        } & {
            "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
        }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {} & {
            target?: HTMLElement | undefined;
        } & {
            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                default?: (() => vue.VNodeChild) | undefined;
            };
            'v-slots'?: {
                default?: false | (() => vue.VNodeChild) | undefined;
            } | undefined;
        } & {
            "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
        }, {}>;
    };
    zIndex: NonNullable<string | number>;
    eager: boolean;
    disabled: boolean;
    modelValue: boolean;
    activatorProps: Record<string, any>;
    openOnHover: boolean;
    closeOnContentClick: boolean;
    locationStrategy: "connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
        updateLocation: (e: Event) => void;
    } | undefined);
    scrollStrategy: NonNullable<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition">;
    closeOnBack: boolean;
    contained: boolean;
    noClickAnimation: boolean;
    persistent: boolean;
    scrim: string | boolean;
    fullscreen: boolean;
    scrollable: boolean;
    retainFocus: boolean;
} & {
    offset?: string | number | number[] | undefined;
    height?: string | number | undefined;
    width?: string | number | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
    theme?: string | undefined;
    contentClass?: any;
    activator?: string | Element | vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | undefined;
    closeDelay?: string | number | undefined;
    openDelay?: string | number | undefined;
    openOnClick?: boolean | undefined;
    openOnFocus?: boolean | undefined;
    contentProps?: any;
    attach?: string | boolean | Element | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: ((args_0: {
            isActive: vue.Ref<boolean>;
        }) => vue.VNodeChild) | undefined;
        activator?: ((args_0: {
            isActive: boolean;
            props: Record<string, any>;
        }) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | ((args_0: {
            isActive: vue.Ref<boolean>;
        }) => vue.VNodeChild) | undefined;
        activator?: false | ((args_0: {
            isActive: boolean;
            props: Record<string, any>;
        }) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | ((args_0: {
        isActive: vue.Ref<boolean>;
    }) => vue.VNodeChild) | undefined;
    "v-slot:activator"?: false | ((args_0: {
        isActive: boolean;
        props: Record<string, any>;
    }) => vue.VNodeChild) | undefined;
} & {
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
}, {
    absolute: boolean;
    location: Anchor;
    origin: NonNullable<"auto" | Anchor | "overlap">;
    transition: NonNullable<string | boolean | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    })> | {
        component: vue.DefineComponent<{} & {
            target?: HTMLElement | undefined;
        } & {
            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                default?: (() => vue.VNodeChild) | undefined;
            };
            'v-slots'?: {
                default?: false | (() => vue.VNodeChild) | undefined;
            } | undefined;
        } & {
            "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
        }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {} & {
            target?: HTMLElement | undefined;
        } & {
            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                default?: (() => vue.VNodeChild) | undefined;
            };
            'v-slots'?: {
                default?: false | (() => vue.VNodeChild) | undefined;
            } | undefined;
        } & {
            "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
        }, {}>;
    };
    zIndex: NonNullable<string | number>;
    eager: boolean;
    disabled: boolean;
    modelValue: boolean;
    activatorProps: Record<string, any>;
    openOnClick: boolean;
    openOnHover: boolean;
    openOnFocus: boolean;
    closeOnContentClick: boolean;
    locationStrategy: "connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
        updateLocation: (e: Event) => void;
    } | undefined);
    scrollStrategy: NonNullable<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition">;
    closeOnBack: boolean;
    contained: boolean;
    noClickAnimation: boolean;
    persistent: boolean;
    scrim: string | boolean;
    fullscreen: boolean;
    scrollable: boolean;
    retainFocus: boolean;
}>;
type VDialog = InstanceType<typeof VDialog>;

declare const VDivider: vue.DefineComponent<{
    inset: boolean;
    vertical: boolean;
} & {
    length?: string | number | undefined;
    color?: string | undefined;
    theme?: string | undefined;
    thickness?: string | number | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    inset: boolean;
    vertical: boolean;
} & {
    length?: string | number | undefined;
    color?: string | undefined;
    theme?: string | undefined;
    thickness?: string | number | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    inset: boolean;
    vertical: boolean;
}>;
type VDivider = InstanceType<typeof VDivider>;

declare const VExpansionPanels: vue.DefineComponent<{
    disabled: boolean;
    multiple: boolean;
    readonly: boolean;
    tag: string;
    variant: "default" | "inset" | "accordion" | "popout";
} & {
    max?: number | undefined;
    color?: string | undefined;
    mandatory?: boolean | "force" | undefined;
    theme?: string | undefined;
    modelValue?: any;
    selectedClass?: string | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (val: unknown) => boolean;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    disabled: boolean;
    multiple: boolean;
    readonly: boolean;
    tag: string;
    variant: "default" | "inset" | "accordion" | "popout";
} & {
    max?: number | undefined;
    color?: string | undefined;
    mandatory?: boolean | "force" | undefined;
    theme?: string | undefined;
    modelValue?: any;
    selectedClass?: string | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
} & {
    "onUpdate:modelValue"?: ((val: unknown) => any) | undefined;
}, {
    disabled: boolean;
    multiple: boolean;
    readonly: boolean;
    tag: string;
    variant: "default" | "inset" | "accordion" | "popout";
    modelValue: any;
}>;
type VExpansionPanels = InstanceType<typeof VExpansionPanels>;

declare const VExpansionPanel: vue.DefineComponent<{
    eager: boolean;
    disabled: boolean;
    readonly: boolean;
    tag: string;
    ripple: boolean | Record<string, any>;
    collapseIcon: IconValue;
    expandIcon: IconValue;
    hideActions: boolean;
} & {
    color?: string | undefined;
    value?: any;
    title?: string | undefined;
    text?: string | undefined;
    elevation?: string | number | undefined;
    rounded?: string | number | boolean | undefined;
    selectedClass?: string | undefined;
    bgColor?: string | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: (() => vue.VNodeChild) | undefined;
        title?: (() => vue.VNodeChild) | undefined;
        text?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
        title?: false | (() => vue.VNodeChild) | undefined;
        text?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:title"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:text"?: false | (() => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'group:selected': (val: {
        value: boolean;
    }) => boolean;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    eager: boolean;
    disabled: boolean;
    readonly: boolean;
    tag: string;
    ripple: boolean | Record<string, any>;
    collapseIcon: IconValue;
    expandIcon: IconValue;
    hideActions: boolean;
} & {
    color?: string | undefined;
    value?: any;
    title?: string | undefined;
    text?: string | undefined;
    elevation?: string | number | undefined;
    rounded?: string | number | boolean | undefined;
    selectedClass?: string | undefined;
    bgColor?: string | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: (() => vue.VNodeChild) | undefined;
        title?: (() => vue.VNodeChild) | undefined;
        text?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
        title?: false | (() => vue.VNodeChild) | undefined;
        text?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:title"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:text"?: false | (() => vue.VNodeChild) | undefined;
} & {
    "onGroup:selected"?: ((val: {
        value: boolean;
    }) => any) | undefined;
}, {
    eager: boolean;
    disabled: boolean;
    readonly: boolean;
    tag: string;
    rounded: string | number | boolean;
    ripple: boolean | Record<string, any>;
    collapseIcon: IconValue;
    expandIcon: IconValue;
    hideActions: boolean;
}>;
type VExpansionPanel = InstanceType<typeof VExpansionPanel>;

declare const VExpansionPanelText: vue.DefineComponent<{
    eager: boolean;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    eager: boolean;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    eager: boolean;
}>;
type VExpansionPanelText = InstanceType<typeof VExpansionPanelText>;

declare const VExpansionPanelTitle: vue.DefineComponent<{
    readonly: boolean;
    ripple: boolean | Record<string, any>;
    collapseIcon: IconValue;
    expandIcon: IconValue;
    hideActions: boolean;
} & {
    color?: string | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: (() => vue.VNodeChild) | undefined;
        actions?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
        actions?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:actions"?: false | (() => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    readonly: boolean;
    ripple: boolean | Record<string, any>;
    collapseIcon: IconValue;
    expandIcon: IconValue;
    hideActions: boolean;
} & {
    color?: string | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: (() => vue.VNodeChild) | undefined;
        actions?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
        actions?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:actions"?: false | (() => vue.VNodeChild) | undefined;
}, {
    readonly: boolean;
    ripple: boolean | Record<string, any>;
    collapseIcon: IconValue;
    expandIcon: IconValue;
    hideActions: boolean;
}>;
type VExpansionPanelTitle = InstanceType<typeof VExpansionPanelTitle>;

declare const VFieldLabel: vue.DefineComponent<{
    floating: boolean;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    floating: boolean;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    floating: boolean;
}>;
type VFieldLabel = InstanceType<typeof VFieldLabel>;

declare const VFileInput: vue.DefineComponent<{
    reverse: boolean;
    error: boolean;
    active: boolean;
    direction: "horizontal" | "vertical";
    disabled: boolean;
    multiple: boolean;
    readonly: boolean;
    counter: boolean;
    messages: string | string[];
    density: Density;
    variant: "filled" | "outlined" | "plain" | "underlined" | "solo";
    modelValue: File[];
    prependIcon: NonNullable<IconValue>;
    clearIcon: IconValue;
    focused: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    clearable: boolean;
    dirty: boolean;
    persistentClear: boolean;
    singleLine: boolean;
    persistentHint: boolean;
    chips: boolean;
    counterSizeString: string;
    counterString: string;
    showSize: boolean | 1000 | 1024;
} & {
    id?: string | undefined;
    name?: string | undefined;
    color?: string | undefined;
    loading?: string | boolean | undefined;
    label?: string | undefined;
    placeholder?: string | undefined;
    theme?: string | undefined;
    bgColor?: string | undefined;
    appendIcon?: IconValue | undefined;
    appendInnerIcon?: IconValue | undefined;
    prependInnerIcon?: IconValue | undefined;
    'onClick:clear'?: EventProp<(...args: any[]) => any> | undefined;
    'onClick:append'?: EventProp<(...args: any[]) => any> | undefined;
    'onClick:prepend'?: EventProp<(...args: any[]) => any> | undefined;
    'onClick:appendInner'?: EventProp<(...args: any[]) => any> | undefined;
    'onClick:prependInner'?: EventProp<(...args: any[]) => any> | undefined;
    validateOn?: "input" | "blur" | "submit" | undefined;
    validationValue?: any;
    hideDetails?: boolean | "auto" | undefined;
    hint?: string | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: (((args_0: VInputSlot) => vue.VNodeChild) & ((args_0: VFieldSlot) => vue.VNodeChild)) | undefined;
        prepend?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        append?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        details?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        clear?: (() => vue.VNodeChild) | undefined;
        'prepend-inner'?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        'append-inner'?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        label?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        loader?: ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
        counter?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (((args_0: VInputSlot) => vue.VNodeChild) & ((args_0: VFieldSlot) => vue.VNodeChild)) | undefined;
        prepend?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        append?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        details?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        clear?: false | (() => vue.VNodeChild) | undefined;
        'prepend-inner'?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        'append-inner'?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        label?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        loader?: false | ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
        counter?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (((args_0: VInputSlot) => vue.VNodeChild) & ((args_0: VFieldSlot) => vue.VNodeChild)) | undefined;
    "v-slot:prepend"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:append"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:details"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:clear"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:prepend-inner"?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:append-inner"?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:label"?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:loader"?: false | ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
    "v-slot:counter"?: false | (() => vue.VNodeChild) | undefined;
}, Omit<Omit<{
    $: vue.ComponentInternalInstance;
    $data: {};
    $props: Partial<{
        error: boolean;
        direction: "horizontal" | "vertical";
        disabled: boolean;
        readonly: boolean;
        messages: string | string[];
        density: Density;
        focused: boolean;
        errorMessages: string | string[];
        maxErrors: string | number;
        rules: ValidationRule[];
    }> & Omit<{
        error: boolean;
        direction: "horizontal" | "vertical";
        disabled: boolean;
        readonly: boolean;
        messages: string | string[];
        density: Density;
        focused: boolean;
        errorMessages: string | string[];
        maxErrors: string | number;
        rules: ValidationRule[];
    } & {
        id?: string | undefined;
        name?: string | undefined;
        label?: string | undefined;
        modelValue?: any;
        prependIcon?: IconValue | undefined;
        appendIcon?: IconValue | undefined;
        'onClick:append'?: EventProp<(...args: any[]) => any> | undefined;
        'onClick:prepend'?: EventProp<(...args: any[]) => any> | undefined;
        validateOn?: "input" | "blur" | "submit" | undefined;
        validationValue?: any;
        hideDetails?: boolean | "auto" | undefined;
    } & {
        $children?: {} | vue.VNodeChild | {
            default?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            prepend?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            append?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            details?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        };
        'v-slots'?: {
            default?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            prepend?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            append?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            details?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:default"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:prepend"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:append"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:details"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    } & {
        "onUpdate:modelValue"?: ((val: any) => any) | undefined;
    } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "error" | "direction" | "disabled" | "readonly" | "messages" | "density" | "focused" | "errorMessages" | "maxErrors" | "rules">;
    $attrs: {
        [x: string]: unknown;
    };
    $refs: {
        [x: string]: unknown;
    };
    $slots: Readonly<{
        [name: string]: vue.Slot | undefined;
    }>;
    $root: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null;
    $parent: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null;
    $emit: (event: "update:modelValue", val: any) => void;
    $el: any;
    $options: vue.ComponentOptionsBase<{
        error: boolean;
        direction: "horizontal" | "vertical";
        disabled: boolean;
        readonly: boolean;
        messages: string | string[];
        density: Density;
        focused: boolean;
        errorMessages: string | string[];
        maxErrors: string | number;
        rules: ValidationRule[];
    } & {
        id?: string | undefined;
        name?: string | undefined;
        label?: string | undefined;
        modelValue?: any;
        prependIcon?: IconValue | undefined;
        appendIcon?: IconValue | undefined;
        'onClick:append'?: EventProp<(...args: any[]) => any> | undefined;
        'onClick:prepend'?: EventProp<(...args: any[]) => any> | undefined;
        validateOn?: "input" | "blur" | "submit" | undefined;
        validationValue?: any;
        hideDetails?: boolean | "auto" | undefined;
    } & {
        $children?: {} | vue.VNodeChild | {
            default?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            prepend?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            append?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            details?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        };
        'v-slots'?: {
            default?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            prepend?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            append?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            details?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:default"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:prepend"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:append"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:details"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    } & {
        "onUpdate:modelValue"?: ((val: any) => any) | undefined;
    }, {
        reset: () => void;
        resetValidation: () => void;
        validate: () => Promise<string[]>;
    }, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
        'update:modelValue': (val: any) => true;
    }, string, {
        error: boolean;
        direction: "horizontal" | "vertical";
        disabled: boolean;
        readonly: boolean;
        messages: string | string[];
        density: Density;
        focused: boolean;
        errorMessages: string | string[];
        maxErrors: string | number;
        rules: ValidationRule[];
    }, {}, string> & {
        beforeCreate?: ((() => void) | (() => void)[]) | undefined;
        created?: ((() => void) | (() => void)[]) | undefined;
        beforeMount?: ((() => void) | (() => void)[]) | undefined;
        mounted?: ((() => void) | (() => void)[]) | undefined;
        beforeUpdate?: ((() => void) | (() => void)[]) | undefined;
        updated?: ((() => void) | (() => void)[]) | undefined;
        activated?: ((() => void) | (() => void)[]) | undefined;
        deactivated?: ((() => void) | (() => void)[]) | undefined;
        beforeDestroy?: ((() => void) | (() => void)[]) | undefined;
        beforeUnmount?: ((() => void) | (() => void)[]) | undefined;
        destroyed?: ((() => void) | (() => void)[]) | undefined;
        unmounted?: ((() => void) | (() => void)[]) | undefined;
        renderTracked?: (((e: vue.DebuggerEvent) => void) | ((e: vue.DebuggerEvent) => void)[]) | undefined;
        renderTriggered?: (((e: vue.DebuggerEvent) => void) | ((e: vue.DebuggerEvent) => void)[]) | undefined;
        errorCaptured?: (((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null, info: string) => boolean | void) | ((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null, info: string) => boolean | void)[]) | undefined;
    };
    $forceUpdate: () => void;
    $nextTick: typeof nextTick;
    $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (args_0: R, args_1: R) => any : (...args: any) => any, options?: vue.WatchOptions<boolean> | undefined): vue.WatchStopHandle;
} & {
    error: boolean;
    direction: "horizontal" | "vertical";
    disabled: boolean;
    readonly: boolean;
    messages: string | string[];
    density: Density;
    focused: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
} & {
    id?: string | undefined;
    name?: string | undefined;
    label?: string | undefined;
    modelValue?: any;
    prependIcon?: IconValue | undefined;
    appendIcon?: IconValue | undefined;
    'onClick:append'?: EventProp<(...args: any[]) => any> | undefined;
    'onClick:prepend'?: EventProp<(...args: any[]) => any> | undefined;
    validateOn?: "input" | "blur" | "submit" | undefined;
    validationValue?: any;
    hideDetails?: boolean | "auto" | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        prepend?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        append?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        details?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        prepend?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        append?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        details?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:prepend"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:append"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:details"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
} & {
    "onUpdate:modelValue"?: ((val: any) => any) | undefined;
} & vue.ShallowUnwrapRef<{
    reset: () => void;
    resetValidation: () => void;
    validate: () => Promise<string[]>;
}> & {} & vue.ComponentCustomProperties & {}, "id" | "name" | "label" | "$children" | "v-slot:default" | "v-slots" | keyof vue.VNodeProps | keyof vue.AllowedComponentProps | "v-slot:append" | "v-slot:prepend" | "modelValue" | "onUpdate:modelValue" | "prependIcon" | "appendIcon" | "onClick:append" | "onClick:prepend" | "validateOn" | "validationValue" | "hideDetails" | ("error" | "direction" | "disabled" | "readonly" | "messages" | "density" | "focused" | "errorMessages" | "maxErrors" | "rules") | "v-slot:details">, `$${any}`>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'click:control': (e: MouseEvent) => true;
    'mousedown:control': (e: MouseEvent) => true;
    'update:modelValue': (files: File[]) => true;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    reverse: boolean;
    error: boolean;
    active: boolean;
    direction: "horizontal" | "vertical";
    disabled: boolean;
    multiple: boolean;
    readonly: boolean;
    counter: boolean;
    messages: string | string[];
    density: Density;
    variant: "filled" | "outlined" | "plain" | "underlined" | "solo";
    modelValue: File[];
    prependIcon: NonNullable<IconValue>;
    clearIcon: IconValue;
    focused: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    clearable: boolean;
    dirty: boolean;
    persistentClear: boolean;
    singleLine: boolean;
    persistentHint: boolean;
    chips: boolean;
    counterSizeString: string;
    counterString: string;
    showSize: boolean | 1000 | 1024;
} & {
    id?: string | undefined;
    name?: string | undefined;
    color?: string | undefined;
    loading?: string | boolean | undefined;
    label?: string | undefined;
    placeholder?: string | undefined;
    theme?: string | undefined;
    bgColor?: string | undefined;
    appendIcon?: IconValue | undefined;
    appendInnerIcon?: IconValue | undefined;
    prependInnerIcon?: IconValue | undefined;
    'onClick:clear'?: EventProp<(...args: any[]) => any> | undefined;
    'onClick:append'?: EventProp<(...args: any[]) => any> | undefined;
    'onClick:prepend'?: EventProp<(...args: any[]) => any> | undefined;
    'onClick:appendInner'?: EventProp<(...args: any[]) => any> | undefined;
    'onClick:prependInner'?: EventProp<(...args: any[]) => any> | undefined;
    validateOn?: "input" | "blur" | "submit" | undefined;
    validationValue?: any;
    hideDetails?: boolean | "auto" | undefined;
    hint?: string | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: (((args_0: VInputSlot) => vue.VNodeChild) & ((args_0: VFieldSlot) => vue.VNodeChild)) | undefined;
        prepend?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        append?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        details?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        clear?: (() => vue.VNodeChild) | undefined;
        'prepend-inner'?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        'append-inner'?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        label?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        loader?: ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
        counter?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (((args_0: VInputSlot) => vue.VNodeChild) & ((args_0: VFieldSlot) => vue.VNodeChild)) | undefined;
        prepend?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        append?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        details?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        clear?: false | (() => vue.VNodeChild) | undefined;
        'prepend-inner'?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        'append-inner'?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        label?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        loader?: false | ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
        counter?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (((args_0: VInputSlot) => vue.VNodeChild) & ((args_0: VFieldSlot) => vue.VNodeChild)) | undefined;
    "v-slot:prepend"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:append"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:details"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:clear"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:prepend-inner"?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:append-inner"?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:label"?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:loader"?: false | ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
    "v-slot:counter"?: false | (() => vue.VNodeChild) | undefined;
} & {
    "onUpdate:modelValue"?: ((files: File[]) => any) | undefined;
    "onClick:control"?: ((e: MouseEvent) => any) | undefined;
    "onMousedown:control"?: ((e: MouseEvent) => any) | undefined;
}, {
    reverse: boolean;
    error: boolean;
    active: boolean;
    direction: "horizontal" | "vertical";
    disabled: boolean;
    multiple: boolean;
    readonly: boolean;
    counter: boolean;
    messages: string | string[];
    density: Density;
    variant: "filled" | "outlined" | "plain" | "underlined" | "solo";
    modelValue: File[];
    prependIcon: NonNullable<IconValue>;
    clearIcon: IconValue;
    focused: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    clearable: boolean;
    dirty: boolean;
    persistentClear: boolean;
    singleLine: boolean;
    persistentHint: boolean;
    chips: boolean;
    counterSizeString: string;
    counterString: string;
    showSize: boolean | 1000 | 1024;
}>;
type VFileInput = InstanceType<typeof VFileInput>;

declare const VFooter: vue.DefineComponent<{
    absolute: boolean;
    height: string | number;
    order: string | number;
    tag: string;
    app: boolean;
} & {
    name?: string | undefined;
    border?: string | number | boolean | undefined;
    color?: string | undefined;
    elevation?: string | number | undefined;
    theme?: string | undefined;
    rounded?: string | number | boolean | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    absolute: boolean;
    height: string | number;
    order: string | number;
    tag: string;
    app: boolean;
} & {
    name?: string | undefined;
    border?: string | number | boolean | undefined;
    color?: string | undefined;
    elevation?: string | number | undefined;
    theme?: string | undefined;
    rounded?: string | number | boolean | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    absolute: boolean;
    height: string | number;
    order: string | number;
    tag: string;
    app: boolean;
    rounded: string | number | boolean;
}>;
type VFooter = InstanceType<typeof VFooter>;

declare const VForm: vue.DefineComponent<{
    disabled: boolean;
    readonly: boolean;
    modelValue: boolean | null;
    validateOn: "input" | "blur" | "submit" | undefined;
    fastFail: boolean;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    errors: vue.Ref<{
        id: string | number;
        errorMessages: string[];
    }[]>;
    isDisabled: vue.ComputedRef<boolean>;
    isReadonly: vue.ComputedRef<boolean>;
    isValidating: vue.Ref<boolean>;
    items: vue.Ref<{
        id: string | number;
        validate: () => Promise<string[]>;
        reset: () => void;
        resetValidation: () => void;
        isValid: boolean | null;
        errorMessages: string[];
    }[]>;
    validate: () => Promise<{
        valid: boolean;
        errors: {
            id: string | number;
            errorMessages: string[];
        }[];
    }>;
    reset: () => void;
    resetValidation: () => void;
}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (val: boolean | null) => true;
    submit: (e: SubmitEventPromise) => true;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    disabled: boolean;
    readonly: boolean;
    modelValue: boolean | null;
    validateOn: "input" | "blur" | "submit" | undefined;
    fastFail: boolean;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
} & {
    onSubmit?: ((e: SubmitEventPromise) => any) | undefined;
    "onUpdate:modelValue"?: ((val: boolean | null) => any) | undefined;
}, {
    disabled: boolean;
    readonly: boolean;
    modelValue: boolean | null;
    validateOn: "input" | "blur" | "submit" | undefined;
    fastFail: boolean;
}>;
type VForm = InstanceType<typeof VForm>;

declare const VContainer: vue.DefineComponent<{
    tag: string;
    fluid: boolean;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    tag: string;
    fluid: boolean;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    tag: string;
    fluid: boolean;
}>;
type VContainer = InstanceType<typeof VContainer>;

declare const VCol: vue.DefineComponent<{
    offset: string | number;
    alignSelf: "auto" | "center" | "end" | "start" | "stretch" | "baseline";
    order: string | number;
    tag: string;
    cols: string | number | boolean;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    offset: string | number;
    alignSelf: "auto" | "center" | "end" | "start" | "stretch" | "baseline";
    order: string | number;
    tag: string;
    cols: string | number | boolean;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    offset: string | number;
    alignSelf: "auto" | "center" | "end" | "start" | "stretch" | "baseline";
    order: string | number;
    tag: string;
    cols: string | number | boolean;
}>;
type VCol = InstanceType<typeof VCol>;

declare const VRow: vue.DefineComponent<{
    alignContent: "center" | "end" | "start" | "space-around" | "space-between" | "space-evenly" | "stretch";
    tag: string;
    dense: boolean;
    justify: "center" | "end" | "start" | "space-around" | "space-between" | "space-evenly" | "stretch";
    align: "center" | "end" | "start" | "stretch" | "baseline";
    noGutters: boolean;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    alignContent: "center" | "end" | "start" | "space-around" | "space-between" | "space-evenly" | "stretch";
    tag: string;
    dense: boolean;
    justify: "center" | "end" | "start" | "space-around" | "space-between" | "space-evenly" | "stretch";
    align: "center" | "end" | "start" | "stretch" | "baseline";
    noGutters: boolean;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    alignContent: "center" | "end" | "start" | "space-around" | "space-between" | "space-evenly" | "stretch";
    tag: string;
    dense: boolean;
    justify: "center" | "end" | "start" | "space-around" | "space-between" | "space-evenly" | "stretch";
    align: "center" | "end" | "start" | "stretch" | "baseline";
    noGutters: boolean;
}>;
type VRow = InstanceType<typeof VRow>;

declare const VSpacer: vue.DefineComponent<{
    tag: string;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    tag: string;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    tag: string;
}>;
type VSpacer = InstanceType<typeof VSpacer>;

declare const VHover: vue.DefineComponent<{
    disabled: boolean;
} & {
    modelValue?: boolean | undefined;
    closeDelay?: string | number | undefined;
    openDelay?: string | number | undefined;
} & {
    $children?: vue.VNodeChild | ((args_0: {
        isHovering: boolean;
        props: Record<string, unknown>;
    }) => vue.VNodeChild) | {
        default?: ((args_0: {
            isHovering: boolean;
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | ((args_0: {
            isHovering: boolean;
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | ((args_0: {
        isHovering: boolean;
        props: Record<string, unknown>;
    }) => vue.VNodeChild) | undefined;
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>[] | undefined, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (value: boolean) => true;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    disabled: boolean;
} & {
    modelValue?: boolean | undefined;
    closeDelay?: string | number | undefined;
    openDelay?: string | number | undefined;
} & {
    $children?: vue.VNodeChild | ((args_0: {
        isHovering: boolean;
        props: Record<string, unknown>;
    }) => vue.VNodeChild) | {
        default?: ((args_0: {
            isHovering: boolean;
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | ((args_0: {
            isHovering: boolean;
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | ((args_0: {
        isHovering: boolean;
        props: Record<string, unknown>;
    }) => vue.VNodeChild) | undefined;
} & {
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
}, {
    disabled: boolean;
    modelValue: boolean;
}>;
type VHover = InstanceType<typeof VHover>;

declare const VIcon: vue.DefineComponent<{
    end: boolean;
    start: boolean;
    size: string | number;
    tag: string;
} & {
    color?: string | undefined;
    icon?: IconValue | undefined;
    theme?: string | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    end: boolean;
    start: boolean;
    size: string | number;
    tag: string;
} & {
    color?: string | undefined;
    icon?: IconValue | undefined;
    theme?: string | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    end: boolean;
    start: boolean;
    size: string | number;
    tag: string;
}>;
type VIcon = InstanceType<typeof VIcon>;

interface srcObject {
    src?: string;
    srcset?: string;
    lazySrc?: string;
    aspect: number;
}
declare const VImg: vue.DefineComponent<{
    transition: string | boolean | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    });
    eager: boolean;
    options: IntersectionObserverInit;
    cover: boolean;
    src: string | srcObject;
} & {
    width?: string | number | undefined;
    aspectRatio?: string | number | undefined;
    alt?: string | undefined;
    sizes?: string | undefined;
    srcset?: string | undefined;
    gradient?: string | undefined;
    lazySrc?: string | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: (() => vue.VNodeChild) | undefined;
        placeholder?: (() => vue.VNodeChild) | undefined;
        error?: (() => vue.VNodeChild) | undefined;
        sources?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
        placeholder?: false | (() => vue.VNodeChild) | undefined;
        error?: false | (() => vue.VNodeChild) | undefined;
        sources?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:placeholder"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:error"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:sources"?: false | (() => vue.VNodeChild) | undefined;
}, {
    currentSrc: vue.Ref<string>;
    image: vue.Ref<HTMLImageElement | undefined>;
    state: vue.Ref<"error" | "loaded" | "idle" | "loading">;
    naturalWidth: vue.Ref<number | undefined>;
    naturalHeight: vue.Ref<number | undefined>;
}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    loadstart: (event: string | undefined) => true;
    load: (event: string | undefined) => true;
    error: (event: string | undefined) => true;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    transition: string | boolean | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    });
    eager: boolean;
    options: IntersectionObserverInit;
    cover: boolean;
    src: string | srcObject;
} & {
    width?: string | number | undefined;
    aspectRatio?: string | number | undefined;
    alt?: string | undefined;
    sizes?: string | undefined;
    srcset?: string | undefined;
    gradient?: string | undefined;
    lazySrc?: string | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: (() => vue.VNodeChild) | undefined;
        placeholder?: (() => vue.VNodeChild) | undefined;
        error?: (() => vue.VNodeChild) | undefined;
        sources?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
        placeholder?: false | (() => vue.VNodeChild) | undefined;
        error?: false | (() => vue.VNodeChild) | undefined;
        sources?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:placeholder"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:error"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:sources"?: false | (() => vue.VNodeChild) | undefined;
} & {
    onError?: ((event: string | undefined) => any) | undefined;
    onLoad?: ((event: string | undefined) => any) | undefined;
    onLoadstart?: ((event: string | undefined) => any) | undefined;
}, {
    transition: string | boolean | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    });
    eager: boolean;
    options: IntersectionObserverInit;
    cover: boolean;
    src: string | srcObject;
}>;
type VImg = InstanceType<typeof VImg>;

declare const VItemGroup: vue.DefineComponent<{
    disabled: boolean;
    multiple: boolean;
    tag: string;
    selectedClass: string;
} & {
    max?: number | undefined;
    mandatory?: boolean | "force" | undefined;
    theme?: string | undefined;
    modelValue?: any;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (value: any) => boolean;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    disabled: boolean;
    multiple: boolean;
    tag: string;
    selectedClass: string;
} & {
    max?: number | undefined;
    mandatory?: boolean | "force" | undefined;
    theme?: string | undefined;
    modelValue?: any;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
} & {
    "onUpdate:modelValue"?: ((value: any) => any) | undefined;
}, {
    disabled: boolean;
    multiple: boolean;
    tag: string;
    modelValue: any;
    selectedClass: string;
}>;
type VItemGroup = InstanceType<typeof VItemGroup>;

declare const VItem: vue.DefineComponent<{
    disabled: boolean;
} & {
    value?: any;
    selectedClass?: string | undefined;
} & {
    $children?: vue.VNodeChild | ((args_0: GroupItemProvide) => vue.VNodeChild) | {
        default?: ((args_0: GroupItemProvide) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | ((args_0: GroupItemProvide) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | ((args_0: GroupItemProvide) => vue.VNodeChild) | undefined;
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>[] | undefined, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'group:selected': (val: {
        value: boolean;
    }) => true;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    disabled: boolean;
} & {
    value?: any;
    selectedClass?: string | undefined;
} & {
    $children?: vue.VNodeChild | ((args_0: GroupItemProvide) => vue.VNodeChild) | {
        default?: ((args_0: GroupItemProvide) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | ((args_0: GroupItemProvide) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | ((args_0: GroupItemProvide) => vue.VNodeChild) | undefined;
} & {
    "onGroup:selected"?: ((val: {
        value: boolean;
    }) => any) | undefined;
}, {
    disabled: boolean;
}>;
type VItem = InstanceType<typeof VItem>;

declare const VKbd: vue.DefineComponent<{
    tag: string;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    tag: string;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    tag: string;
}>;
type VKbd = InstanceType<typeof VKbd>;

declare const VLabel: vue.DefineComponent<{
    clickable: boolean;
} & {
    text?: string | undefined;
    theme?: string | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    clickable: boolean;
} & {
    text?: string | undefined;
    theme?: string | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    clickable: boolean;
}>;
type VLabel = InstanceType<typeof VLabel>;

declare const VLayout: vue.DefineComponent<{
    fullHeight: boolean;
} & {
    overlaps?: string[] | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    getLayoutItem: (id: string) => {
        size: number;
        position: "left" | "top" | "bottom" | "right";
        top: number;
        bottom: number;
        left: number;
        right: number;
        id: string;
    } | undefined;
    items: vue.ComputedRef<{
        size: number;
        position: "left" | "top" | "bottom" | "right";
        top: number;
        bottom: number;
        left: number;
        right: number;
        id: string;
    }[]>;
}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    fullHeight: boolean;
} & {
    overlaps?: string[] | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    fullHeight: boolean;
}>;
type VLayout = InstanceType<typeof VLayout>;

declare const VLayoutItem: vue.DefineComponent<{
    absolute: boolean;
    order: string | number;
    position: "left" | "top" | "bottom" | "right";
    size: string | number;
    modelValue: boolean;
} & {
    name?: string | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    absolute: boolean;
    order: string | number;
    position: "left" | "top" | "bottom" | "right";
    size: string | number;
    modelValue: boolean;
} & {
    name?: string | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    absolute: boolean;
    order: string | number;
    size: string | number;
    modelValue: boolean;
}>;
type VLayoutItem = InstanceType<typeof VLayoutItem>;

declare const VLazy: vue.DefineComponent<{
    transition: NonNullable<string | boolean | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    })>;
    options: IntersectionObserverInit;
    tag: string;
    modelValue: boolean;
} & {
    height?: string | number | undefined;
    width?: string | number | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (value: boolean) => boolean;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    transition: NonNullable<string | boolean | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    })>;
    options: IntersectionObserverInit;
    tag: string;
    modelValue: boolean;
} & {
    height?: string | number | undefined;
    width?: string | number | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
} & {
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
}, {
    transition: NonNullable<string | boolean | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    })>;
    options: IntersectionObserverInit;
    tag: string;
    modelValue: boolean;
}>;
type VLazy = InstanceType<typeof VLazy>;

type SelectStrategyFn = (data: {
    id: unknown;
    value: boolean;
    selected: Map<unknown, 'on' | 'off' | 'indeterminate'>;
    children: Map<unknown, unknown[]>;
    parents: Map<unknown, unknown>;
    event?: Event;
}) => Map<unknown, 'on' | 'off' | 'indeterminate'>;

type OpenStrategyFn = (data: {
    id: unknown;
    value: boolean;
    opened: Set<unknown>;
    children: Map<unknown, unknown[]>;
    parents: Map<unknown, unknown>;
    event?: Event;
}) => Set<unknown>;
type OpenSelectStrategyFn = (data: {
    id: unknown;
    value: boolean;
    opened: Set<unknown>;
    selected: Map<unknown, 'on' | 'off' | 'indeterminate'>;
    children: Map<unknown, unknown[]>;
    parents: Map<unknown, unknown>;
    event?: Event;
}) => Set<unknown> | null;
type OpenStrategy = {
    open: OpenStrategyFn;
    select: OpenSelectStrategyFn;
};

type SelectStrategy = 'single-leaf' | 'leaf' | 'independent' | 'single-independent' | 'classic' | SelectStrategyFn;
type OpenStrategyProp = 'single' | 'multiple' | 'list' | OpenStrategy;

declare const VList: {
    new (...args: any[]): {
        $: vue.ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            nav: boolean;
            disabled: boolean;
            tag: string;
            mandatory: boolean;
            rounded: string | number | boolean;
            density: Density;
            variant: NonNullable<"flat" | "text" | "elevated" | "tonal" | "outlined" | "plain">;
            selectStrategy: NonNullable<SelectStrategy>;
            openStrategy: NonNullable<OpenStrategyProp>;
            lines: false | "one" | "two" | "three";
            itemTitle: SelectItemKey;
            itemValue: SelectItemKey;
            itemChildren: SelectItemKey;
            itemProps: SelectItemKey;
            returnObject: boolean;
            itemType: string;
        }> & Omit<Readonly<vue.ExtractPropTypes<Omit<{
            color: StringConstructor;
            variant: Omit<{
                type: PropType<"flat" | "text" | "elevated" | "tonal" | "outlined" | "plain">;
                default: string;
                validator: (v: any) => boolean;
            }, "type" | "default"> & {
                type: PropType<NonNullable<"flat" | "text" | "elevated" | "tonal" | "outlined" | "plain">>;
                default: NonNullable<"flat" | "text" | "elevated" | "tonal" | "outlined" | "plain">;
            };
            theme: StringConstructor;
            tag: {
                type: StringConstructor;
                default: string;
            };
            rounded: {
                type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
                default: undefined;
            };
            items: {
                type: PropType<any[]>;
                default: () => never[];
            };
            itemTitle: {
                type: PropType<SelectItemKey>;
                default: string;
            };
            itemValue: {
                type: PropType<SelectItemKey>;
                default: string;
            };
            itemChildren: {
                type: PropType<SelectItemKey>;
                default: string;
            };
            itemProps: {
                type: PropType<SelectItemKey>;
                default: string;
            };
            returnObject: BooleanConstructor;
            itemType: {
                type: StringConstructor;
                default: string;
            };
            elevation: {
                type: (StringConstructor | NumberConstructor)[];
                validator(v: any): boolean;
            };
            height: (StringConstructor | NumberConstructor)[];
            maxHeight: (StringConstructor | NumberConstructor)[];
            maxWidth: (StringConstructor | NumberConstructor)[];
            minHeight: (StringConstructor | NumberConstructor)[];
            minWidth: (StringConstructor | NumberConstructor)[];
            width: (StringConstructor | NumberConstructor)[];
            density: {
                type: PropType<Density>;
                default: string;
                validator: (v: any) => boolean;
            };
            border: (StringConstructor | BooleanConstructor | NumberConstructor)[];
            selectStrategy: {
                type: PropType<NonNullable<SelectStrategy>>;
                default: NonNullable<SelectStrategy>;
            };
            openStrategy: {
                type: PropType<NonNullable<OpenStrategyProp>>;
                default: NonNullable<OpenStrategyProp>;
            };
            opened: PropType<unknown[]>;
            selected: PropType<unknown[]>;
            mandatory: BooleanConstructor;
            activeColor: StringConstructor;
            activeClass: StringConstructor;
            bgColor: StringConstructor;
            disabled: BooleanConstructor;
            lines: {
                type: PropType<false | "one" | "two" | "three">;
                default: string;
            };
            nav: BooleanConstructor;
        }, "$children" | "items" | "v-slots" | "v-slot:item" | "v-slot:header" | "v-slot:subheader">>> & {
            "onUpdate:selected"?: ((val: unknown[]) => any) | undefined;
            "onUpdate:opened"?: ((val: unknown[]) => any) | undefined;
            "onClick:open"?: ((value: {
                id: unknown;
                value: boolean;
                path: unknown[];
            }) => any) | undefined;
            "onClick:select"?: ((value: {
                id: unknown;
                value: boolean;
                path: unknown[];
            }) => any) | undefined;
        } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "nav" | "disabled" | "tag" | "mandatory" | "rounded" | "density" | "variant" | "selectStrategy" | "openStrategy" | "lines" | "itemTitle" | "itemValue" | "itemChildren" | "itemProps" | "returnObject" | "itemType">;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            [name: string]: vue.Slot | undefined;
        }>;
        $root: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null;
        $parent: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null;
        $emit: ((event: "click:open", value: {
            id: unknown;
            value: boolean;
            path: unknown[];
        }) => void) & ((event: "click:select", value: {
            id: unknown;
            value: boolean;
            path: unknown[];
        }) => void) & ((event: "update:selected", val: unknown[]) => void) & ((event: "update:opened", val: unknown[]) => void);
        $el: any;
        $options: vue.ComponentOptionsBase<Readonly<vue.ExtractPropTypes<Omit<{
            color: StringConstructor;
            variant: Omit<{
                type: PropType<"flat" | "text" | "elevated" | "tonal" | "outlined" | "plain">;
                default: string;
                validator: (v: any) => boolean;
            }, "type" | "default"> & {
                type: PropType<NonNullable<"flat" | "text" | "elevated" | "tonal" | "outlined" | "plain">>;
                default: NonNullable<"flat" | "text" | "elevated" | "tonal" | "outlined" | "plain">;
            };
            theme: StringConstructor;
            tag: {
                type: StringConstructor;
                default: string;
            };
            rounded: {
                type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
                default: undefined;
            };
            items: {
                type: PropType<any[]>;
                default: () => never[];
            };
            itemTitle: {
                type: PropType<SelectItemKey>;
                default: string;
            };
            itemValue: {
                type: PropType<SelectItemKey>;
                default: string;
            };
            itemChildren: {
                type: PropType<SelectItemKey>;
                default: string;
            };
            itemProps: {
                type: PropType<SelectItemKey>;
                default: string;
            };
            returnObject: BooleanConstructor;
            itemType: {
                type: StringConstructor;
                default: string;
            };
            elevation: {
                type: (StringConstructor | NumberConstructor)[];
                validator(v: any): boolean;
            };
            height: (StringConstructor | NumberConstructor)[];
            maxHeight: (StringConstructor | NumberConstructor)[];
            maxWidth: (StringConstructor | NumberConstructor)[];
            minHeight: (StringConstructor | NumberConstructor)[];
            minWidth: (StringConstructor | NumberConstructor)[];
            width: (StringConstructor | NumberConstructor)[];
            density: {
                type: PropType<Density>;
                default: string;
                validator: (v: any) => boolean;
            };
            border: (StringConstructor | BooleanConstructor | NumberConstructor)[];
            selectStrategy: {
                type: PropType<NonNullable<SelectStrategy>>;
                default: NonNullable<SelectStrategy>;
            };
            openStrategy: {
                type: PropType<NonNullable<OpenStrategyProp>>;
                default: NonNullable<OpenStrategyProp>;
            };
            opened: PropType<unknown[]>;
            selected: PropType<unknown[]>;
            mandatory: BooleanConstructor;
            activeColor: StringConstructor;
            activeClass: StringConstructor;
            bgColor: StringConstructor;
            disabled: BooleanConstructor;
            lines: {
                type: PropType<false | "one" | "two" | "three">;
                default: string;
            };
            nav: BooleanConstructor;
        }, "$children" | "items" | "v-slots" | "v-slot:item" | "v-slot:header" | "v-slot:subheader">>> & {
            "onUpdate:selected"?: ((val: unknown[]) => any) | undefined;
            "onUpdate:opened"?: ((val: unknown[]) => any) | undefined;
            "onClick:open"?: ((value: {
                id: unknown;
                value: boolean;
                path: unknown[];
            }) => any) | undefined;
            "onClick:select"?: ((value: {
                id: unknown;
                value: boolean;
                path: unknown[];
            }) => any) | undefined;
        }, {
            open: (id: unknown, value: boolean, event?: Event | undefined) => void;
            select: (id: unknown, value: boolean, event?: Event | undefined) => void;
            focus: (location?: 'next' | 'prev' | 'first' | 'last') => void;
        }, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Omit<{
            'update:selected': (val: unknown[]) => boolean;
            'update:opened': (val: unknown[]) => boolean;
            'click:open': (value: {
                id: unknown;
                value: boolean;
                path: unknown[];
            }) => boolean;
            'click:select': (value: {
                id: unknown;
                value: boolean;
                path: unknown[];
            }) => boolean;
        }, "$children" | "items" | "v-slots" | "v-slot:item" | "v-slot:header" | "v-slot:subheader">, string, {
            nav: boolean;
            disabled: boolean;
            tag: string;
            mandatory: boolean;
            rounded: string | number | boolean;
            density: Density;
            variant: NonNullable<"flat" | "text" | "elevated" | "tonal" | "outlined" | "plain">;
            selectStrategy: NonNullable<SelectStrategy>;
            openStrategy: NonNullable<OpenStrategyProp>;
            lines: false | "one" | "two" | "three";
            itemTitle: SelectItemKey;
            itemValue: SelectItemKey;
            itemChildren: SelectItemKey;
            itemProps: SelectItemKey;
            returnObject: boolean;
            itemType: string;
        }, {}, string> & {
            beforeCreate?: ((() => void) | (() => void)[]) | undefined;
            created?: ((() => void) | (() => void)[]) | undefined;
            beforeMount?: ((() => void) | (() => void)[]) | undefined;
            mounted?: ((() => void) | (() => void)[]) | undefined;
            beforeUpdate?: ((() => void) | (() => void)[]) | undefined;
            updated?: ((() => void) | (() => void)[]) | undefined;
            activated?: ((() => void) | (() => void)[]) | undefined;
            deactivated?: ((() => void) | (() => void)[]) | undefined;
            beforeDestroy?: ((() => void) | (() => void)[]) | undefined;
            beforeUnmount?: ((() => void) | (() => void)[]) | undefined;
            destroyed?: ((() => void) | (() => void)[]) | undefined;
            unmounted?: ((() => void) | (() => void)[]) | undefined;
            renderTracked?: (((e: vue.DebuggerEvent) => void) | ((e: vue.DebuggerEvent) => void)[]) | undefined;
            renderTriggered?: (((e: vue.DebuggerEvent) => void) | ((e: vue.DebuggerEvent) => void)[]) | undefined;
            errorCaptured?: (((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null, info: string) => boolean | void) | ((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null, info: string) => boolean | void)[]) | undefined;
        };
        $forceUpdate: () => void;
        $nextTick: typeof vue.nextTick;
        $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (args_0: R, args_1: R) => any : (...args: any) => any, options?: vue.WatchOptions<boolean> | undefined): vue.WatchStopHandle;
    } & Readonly<vue.ExtractPropTypes<Omit<{
        color: StringConstructor;
        variant: Omit<{
            type: PropType<"flat" | "text" | "elevated" | "tonal" | "outlined" | "plain">;
            default: string;
            validator: (v: any) => boolean;
        }, "type" | "default"> & {
            type: PropType<NonNullable<"flat" | "text" | "elevated" | "tonal" | "outlined" | "plain">>;
            default: NonNullable<"flat" | "text" | "elevated" | "tonal" | "outlined" | "plain">;
        };
        theme: StringConstructor;
        tag: {
            type: StringConstructor;
            default: string;
        };
        rounded: {
            type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
            default: undefined;
        };
        items: {
            type: PropType<any[]>;
            default: () => never[];
        };
        itemTitle: {
            type: PropType<SelectItemKey>;
            default: string;
        };
        itemValue: {
            type: PropType<SelectItemKey>;
            default: string;
        };
        itemChildren: {
            type: PropType<SelectItemKey>;
            default: string;
        };
        itemProps: {
            type: PropType<SelectItemKey>;
            default: string;
        };
        returnObject: BooleanConstructor;
        itemType: {
            type: StringConstructor;
            default: string;
        };
        elevation: {
            type: (StringConstructor | NumberConstructor)[];
            validator(v: any): boolean;
        };
        height: (StringConstructor | NumberConstructor)[];
        maxHeight: (StringConstructor | NumberConstructor)[];
        maxWidth: (StringConstructor | NumberConstructor)[];
        minHeight: (StringConstructor | NumberConstructor)[];
        minWidth: (StringConstructor | NumberConstructor)[];
        width: (StringConstructor | NumberConstructor)[];
        density: {
            type: PropType<Density>;
            default: string;
            validator: (v: any) => boolean;
        };
        border: (StringConstructor | BooleanConstructor | NumberConstructor)[];
        selectStrategy: {
            type: PropType<NonNullable<SelectStrategy>>;
            default: NonNullable<SelectStrategy>;
        };
        openStrategy: {
            type: PropType<NonNullable<OpenStrategyProp>>;
            default: NonNullable<OpenStrategyProp>;
        };
        opened: PropType<unknown[]>;
        selected: PropType<unknown[]>;
        mandatory: BooleanConstructor;
        activeColor: StringConstructor;
        activeClass: StringConstructor;
        bgColor: StringConstructor;
        disabled: BooleanConstructor;
        lines: {
            type: PropType<false | "one" | "two" | "three">;
            default: string;
        };
        nav: BooleanConstructor;
    }, "$children" | "items" | "v-slots" | "v-slot:item" | "v-slot:header" | "v-slot:subheader">>> & {
        "onUpdate:selected"?: ((val: unknown[]) => any) | undefined;
        "onUpdate:opened"?: ((val: unknown[]) => any) | undefined;
        "onClick:open"?: ((value: {
            id: unknown;
            value: boolean;
            path: unknown[];
        }) => any) | undefined;
        "onClick:select"?: ((value: {
            id: unknown;
            value: boolean;
            path: unknown[];
        }) => any) | undefined;
    } & vue.ShallowUnwrapRef<{
        open: (id: unknown, value: boolean, event?: Event | undefined) => void;
        select: (id: unknown, value: boolean, event?: Event | undefined) => void;
        focus: (location?: 'next' | 'prev' | 'first' | 'last') => void;
    }> & {} & vue.ComponentCustomProperties & {};
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & vue.ComponentOptionsBase<Readonly<vue.ExtractPropTypes<Omit<{
    color: StringConstructor;
    variant: Omit<{
        type: PropType<"flat" | "text" | "elevated" | "tonal" | "outlined" | "plain">;
        default: string;
        validator: (v: any) => boolean;
    }, "type" | "default"> & {
        type: PropType<NonNullable<"flat" | "text" | "elevated" | "tonal" | "outlined" | "plain">>;
        default: NonNullable<"flat" | "text" | "elevated" | "tonal" | "outlined" | "plain">;
    };
    theme: StringConstructor;
    tag: {
        type: StringConstructor;
        default: string;
    };
    rounded: {
        type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
        default: undefined;
    };
    items: {
        type: PropType<any[]>;
        default: () => never[];
    };
    itemTitle: {
        type: PropType<SelectItemKey>;
        default: string;
    };
    itemValue: {
        type: PropType<SelectItemKey>;
        default: string;
    };
    itemChildren: {
        type: PropType<SelectItemKey>;
        default: string;
    };
    itemProps: {
        type: PropType<SelectItemKey>;
        default: string;
    };
    returnObject: BooleanConstructor;
    itemType: {
        type: StringConstructor;
        default: string;
    };
    elevation: {
        type: (StringConstructor | NumberConstructor)[];
        validator(v: any): boolean;
    };
    height: (StringConstructor | NumberConstructor)[];
    maxHeight: (StringConstructor | NumberConstructor)[];
    maxWidth: (StringConstructor | NumberConstructor)[];
    minHeight: (StringConstructor | NumberConstructor)[];
    minWidth: (StringConstructor | NumberConstructor)[];
    width: (StringConstructor | NumberConstructor)[];
    density: {
        type: PropType<Density>;
        default: string;
        validator: (v: any) => boolean;
    };
    border: (StringConstructor | BooleanConstructor | NumberConstructor)[];
    selectStrategy: {
        type: PropType<NonNullable<SelectStrategy>>;
        default: NonNullable<SelectStrategy>;
    };
    openStrategy: {
        type: PropType<NonNullable<OpenStrategyProp>>;
        default: NonNullable<OpenStrategyProp>;
    };
    opened: PropType<unknown[]>;
    selected: PropType<unknown[]>;
    mandatory: BooleanConstructor;
    activeColor: StringConstructor;
    activeClass: StringConstructor;
    bgColor: StringConstructor;
    disabled: BooleanConstructor;
    lines: {
        type: PropType<false | "one" | "two" | "three">;
        default: string;
    };
    nav: BooleanConstructor;
}, "$children" | "items" | "v-slots" | "v-slot:item" | "v-slot:header" | "v-slot:subheader">>> & {
    "onUpdate:selected"?: ((val: unknown[]) => any) | undefined;
    "onUpdate:opened"?: ((val: unknown[]) => any) | undefined;
    "onClick:open"?: ((value: {
        id: unknown;
        value: boolean;
        path: unknown[];
    }) => any) | undefined;
    "onClick:select"?: ((value: {
        id: unknown;
        value: boolean;
        path: unknown[];
    }) => any) | undefined;
}, {
    open: (id: unknown, value: boolean, event?: Event | undefined) => void;
    select: (id: unknown, value: boolean, event?: Event | undefined) => void;
    focus: (location?: 'next' | 'prev' | 'first' | 'last') => void;
}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Omit<{
    'update:selected': (val: unknown[]) => boolean;
    'update:opened': (val: unknown[]) => boolean;
    'click:open': (value: {
        id: unknown;
        value: boolean;
        path: unknown[];
    }) => boolean;
    'click:select': (value: {
        id: unknown;
        value: boolean;
        path: unknown[];
    }) => boolean;
}, "$children" | "items" | "v-slots" | "v-slot:item" | "v-slot:header" | "v-slot:subheader">, string, {
    nav: boolean;
    disabled: boolean;
    tag: string;
    mandatory: boolean;
    rounded: string | number | boolean;
    density: Density;
    variant: NonNullable<"flat" | "text" | "elevated" | "tonal" | "outlined" | "plain">;
    selectStrategy: NonNullable<SelectStrategy>;
    openStrategy: NonNullable<OpenStrategyProp>;
    lines: false | "one" | "two" | "three";
    itemTitle: SelectItemKey;
    itemValue: SelectItemKey;
    itemChildren: SelectItemKey;
    itemProps: SelectItemKey;
    returnObject: boolean;
    itemType: string;
}, {}, string> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & (new <T_1>() => {
    $props: {
        items?: T_1[] | undefined;
    } & {
        $children?: {} | vue.VNodeChild | {
            subheader?: (() => vue.VNodeChild) | undefined;
            header?: ((args_0: {
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            item?: ((args_0: T_1) => vue.VNodeChild) | undefined;
        };
        'v-slots'?: {
            subheader?: false | (() => vue.VNodeChild) | undefined;
            header?: false | ((args_0: {
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            item?: false | ((args_0: T_1) => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:subheader"?: false | (() => vue.VNodeChild) | undefined;
        "v-slot:header"?: false | ((args_0: {
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        "v-slot:item"?: false | ((args_0: T_1) => vue.VNodeChild) | undefined;
    };
});
type VList = InstanceType<typeof VList>;

declare const VListGroup: vue.DefineComponent<{
    tag: string;
    subgroup: boolean;
    collapseIcon: IconValue;
    expandIcon: IconValue;
    fluid: boolean;
} & {
    color?: string | undefined;
    value?: any;
    title?: string | undefined;
    prependIcon?: IconValue | undefined;
    appendIcon?: IconValue | undefined;
    activeColor?: string | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: (() => vue.VNodeChild) | undefined;
        activator?: ((args_0: {
            isOpen: boolean;
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
        activator?: false | ((args_0: {
            isOpen: boolean;
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:activator"?: false | ((args_0: {
        isOpen: boolean;
        props: Record<string, unknown>;
    }) => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    tag: string;
    subgroup: boolean;
    collapseIcon: IconValue;
    expandIcon: IconValue;
    fluid: boolean;
} & {
    color?: string | undefined;
    value?: any;
    title?: string | undefined;
    prependIcon?: IconValue | undefined;
    appendIcon?: IconValue | undefined;
    activeColor?: string | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: (() => vue.VNodeChild) | undefined;
        activator?: ((args_0: {
            isOpen: boolean;
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
        activator?: false | ((args_0: {
            isOpen: boolean;
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:activator"?: false | ((args_0: {
        isOpen: boolean;
        props: Record<string, unknown>;
    }) => vue.VNodeChild) | undefined;
}, {
    tag: string;
    subgroup: boolean;
    collapseIcon: IconValue;
    expandIcon: IconValue;
    fluid: boolean;
}>;
type VListGroup = InstanceType<typeof VListGroup>;

declare const VListImg: vue.DefineComponent<{
    tag: string;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    tag: string;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    tag: string;
}>;
type VListImg = InstanceType<typeof VListImg>;

type ListItemSlot = {
    isActive: boolean;
    activate: (value: boolean) => void;
    isSelected: boolean;
    select: (value: boolean) => void;
};
type ListItemTitleSlot = {
    title?: string;
};
type ListItemSubtitleSlot = {
    subtitle?: string;
};
declare const VListItem: vue.DefineComponent<{
    replace: boolean;
    exact: boolean;
    nav: boolean;
    disabled: boolean;
    tag: string;
    density: Density;
    variant: NonNullable<"flat" | "text" | "elevated" | "tonal" | "outlined" | "plain">;
    ripple: boolean;
} & {
    link?: boolean | undefined;
    height?: string | number | undefined;
    width?: string | number | undefined;
    active?: boolean | undefined;
    border?: string | number | boolean | undefined;
    color?: string | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
    value?: any;
    title?: string | number | boolean | undefined;
    onClick?: EventProp<(...args: any[]) => any> | undefined;
    onClickOnce?: EventProp<(...args: any[]) => any> | undefined;
    href?: string | undefined;
    elevation?: string | number | undefined;
    to?: vue_router.RouteLocationRaw | undefined;
    theme?: string | undefined;
    rounded?: string | number | boolean | undefined;
    prependIcon?: IconValue | undefined;
    appendIcon?: IconValue | undefined;
    activeClass?: string | undefined;
    appendAvatar?: string | undefined;
    prependAvatar?: string | undefined;
    activeColor?: string | undefined;
    subtitle?: string | number | boolean | undefined;
    lines?: "one" | "two" | "three" | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        prepend?: ((args_0: ListItemSlot) => vue.VNodeChild) | undefined;
        append?: ((args_0: ListItemSlot) => vue.VNodeChild) | undefined;
        default?: ((args_0: ListItemSlot) => vue.VNodeChild) | undefined;
        title?: ((args_0: ListItemTitleSlot) => vue.VNodeChild) | undefined;
        subtitle?: ((args_0: ListItemSubtitleSlot) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        prepend?: false | ((args_0: ListItemSlot) => vue.VNodeChild) | undefined;
        append?: false | ((args_0: ListItemSlot) => vue.VNodeChild) | undefined;
        default?: false | ((args_0: ListItemSlot) => vue.VNodeChild) | undefined;
        title?: false | ((args_0: ListItemTitleSlot) => vue.VNodeChild) | undefined;
        subtitle?: false | ((args_0: ListItemSubtitleSlot) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:prepend"?: false | ((args_0: ListItemSlot) => vue.VNodeChild) | undefined;
    "v-slot:append"?: false | ((args_0: ListItemSlot) => vue.VNodeChild) | undefined;
    "v-slot:default"?: false | ((args_0: ListItemSlot) => vue.VNodeChild) | undefined;
    "v-slot:title"?: false | ((args_0: ListItemTitleSlot) => vue.VNodeChild) | undefined;
    "v-slot:subtitle"?: false | ((args_0: ListItemSubtitleSlot) => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    click: (e: MouseEvent | KeyboardEvent) => true;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    replace: boolean;
    exact: boolean;
    nav: boolean;
    disabled: boolean;
    tag: string;
    density: Density;
    variant: NonNullable<"flat" | "text" | "elevated" | "tonal" | "outlined" | "plain">;
    ripple: boolean;
} & {
    link?: boolean | undefined;
    height?: string | number | undefined;
    width?: string | number | undefined;
    active?: boolean | undefined;
    border?: string | number | boolean | undefined;
    color?: string | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
    value?: any;
    title?: string | number | boolean | undefined;
    onClick?: EventProp<(...args: any[]) => any> | undefined;
    onClickOnce?: EventProp<(...args: any[]) => any> | undefined;
    href?: string | undefined;
    elevation?: string | number | undefined;
    to?: vue_router.RouteLocationRaw | undefined;
    theme?: string | undefined;
    rounded?: string | number | boolean | undefined;
    prependIcon?: IconValue | undefined;
    appendIcon?: IconValue | undefined;
    activeClass?: string | undefined;
    appendAvatar?: string | undefined;
    prependAvatar?: string | undefined;
    activeColor?: string | undefined;
    subtitle?: string | number | boolean | undefined;
    lines?: "one" | "two" | "three" | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        prepend?: ((args_0: ListItemSlot) => vue.VNodeChild) | undefined;
        append?: ((args_0: ListItemSlot) => vue.VNodeChild) | undefined;
        default?: ((args_0: ListItemSlot) => vue.VNodeChild) | undefined;
        title?: ((args_0: ListItemTitleSlot) => vue.VNodeChild) | undefined;
        subtitle?: ((args_0: ListItemSubtitleSlot) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        prepend?: false | ((args_0: ListItemSlot) => vue.VNodeChild) | undefined;
        append?: false | ((args_0: ListItemSlot) => vue.VNodeChild) | undefined;
        default?: false | ((args_0: ListItemSlot) => vue.VNodeChild) | undefined;
        title?: false | ((args_0: ListItemTitleSlot) => vue.VNodeChild) | undefined;
        subtitle?: false | ((args_0: ListItemSubtitleSlot) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:prepend"?: false | ((args_0: ListItemSlot) => vue.VNodeChild) | undefined;
    "v-slot:append"?: false | ((args_0: ListItemSlot) => vue.VNodeChild) | undefined;
    "v-slot:default"?: false | ((args_0: ListItemSlot) => vue.VNodeChild) | undefined;
    "v-slot:title"?: false | ((args_0: ListItemTitleSlot) => vue.VNodeChild) | undefined;
    "v-slot:subtitle"?: false | ((args_0: ListItemSubtitleSlot) => vue.VNodeChild) | undefined;
} & {
    onClick?: ((e: MouseEvent | KeyboardEvent) => any) | undefined;
}, {
    replace: boolean;
    link: boolean;
    exact: boolean;
    active: boolean;
    nav: boolean;
    disabled: boolean;
    tag: string;
    rounded: string | number | boolean;
    density: Density;
    variant: NonNullable<"flat" | "text" | "elevated" | "tonal" | "outlined" | "plain">;
    ripple: boolean;
}>;
type VListItem = InstanceType<typeof VListItem>;

declare const VListItemAction: vue.DefineComponent<{
    end: boolean;
    start: boolean;
    tag: string;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    end: boolean;
    start: boolean;
    tag: string;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    end: boolean;
    start: boolean;
    tag: string;
}>;
type VListItemAction = InstanceType<typeof VListItemAction>;

declare const VListItemMedia: vue.DefineComponent<{
    end: boolean;
    start: boolean;
    tag: string;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    end: boolean;
    start: boolean;
    tag: string;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    end: boolean;
    start: boolean;
    tag: string;
}>;
type VListItemMedia = InstanceType<typeof VListItemMedia>;

declare const VListItemSubtitle: vue.DefineComponent<{
    tag: string;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    tag: string;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    tag: string;
}>;
type VListItemSubtitle = InstanceType<typeof VListItemSubtitle>;

declare const VListItemTitle: vue.DefineComponent<{
    tag: string;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    tag: string;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    tag: string;
}>;
type VListItemTitle = InstanceType<typeof VListItemTitle>;

declare const VListSubheader: vue.DefineComponent<{
    inset: boolean;
    tag: string;
    sticky: boolean;
} & {
    color?: string | undefined;
    title?: string | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    inset: boolean;
    tag: string;
    sticky: boolean;
} & {
    color?: string | undefined;
    title?: string | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    inset: boolean;
    tag: string;
    sticky: boolean;
}>;
type VListSubheader = InstanceType<typeof VListSubheader>;

declare const VLocaleProvider: vue.DefineComponent<{} & {
    rtl?: boolean | undefined;
    locale?: string | undefined;
    messages?: Record<string, any> | undefined;
    fallbackLocale?: string | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {} & {
    rtl?: boolean | undefined;
    locale?: string | undefined;
    messages?: Record<string, any> | undefined;
    fallbackLocale?: string | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    rtl: boolean;
}>;
type VLocaleProvider = InstanceType<typeof VLocaleProvider>;

declare const VMain: vue.DefineComponent<{
    tag: string;
    scrollable: boolean;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    tag: string;
    scrollable: boolean;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    tag: string;
    scrollable: boolean;
}>;
type VMain = InstanceType<typeof VMain>;

declare const VMenu: vue.DefineComponent<{
    location: Anchor;
    origin: "auto" | Anchor | "overlap";
    transition: NonNullable<string | boolean | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    })> | {
        component: vue.DefineComponent<{} & {
            target?: HTMLElement | undefined;
        } & {
            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                default?: (() => vue.VNodeChild) | undefined;
            };
            'v-slots'?: {
                default?: false | (() => vue.VNodeChild) | undefined;
            } | undefined;
        } & {
            "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
        }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {} & {
            target?: HTMLElement | undefined;
        } & {
            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                default?: (() => vue.VNodeChild) | undefined;
            };
            'v-slots'?: {
                default?: false | (() => vue.VNodeChild) | undefined;
            } | undefined;
        } & {
            "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
        }, {}>;
    };
    zIndex: string | number;
    eager: boolean;
    disabled: boolean;
    modelValue: boolean;
    closeDelay: NonNullable<string | number>;
    openDelay: NonNullable<string | number>;
    activatorProps: Record<string, any>;
    openOnHover: boolean;
    closeOnContentClick: boolean;
    locationStrategy: NonNullable<"connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
        updateLocation: (e: Event) => void;
    } | undefined)>;
    scrollStrategy: NonNullable<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition">;
    closeOnBack: boolean;
    contained: boolean;
    noClickAnimation: boolean;
    persistent: boolean;
    scrim: NonNullable<string | boolean>;
} & {
    offset?: string | number | number[] | undefined;
    id?: string | undefined;
    height?: string | number | undefined;
    width?: string | number | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
    theme?: string | undefined;
    contentClass?: any;
    activator?: string | Element | vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | undefined;
    openOnClick?: boolean | undefined;
    openOnFocus?: boolean | undefined;
    contentProps?: any;
    attach?: string | boolean | Element | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: ((args_0: {
            isActive: vue.Ref<boolean>;
        }) => vue.VNodeChild) | undefined;
        activator?: ((args_0: {
            isActive: boolean;
            props: Record<string, any>;
        }) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | ((args_0: {
            isActive: vue.Ref<boolean>;
        }) => vue.VNodeChild) | undefined;
        activator?: false | ((args_0: {
            isActive: boolean;
            props: Record<string, any>;
        }) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | ((args_0: {
        isActive: vue.Ref<boolean>;
    }) => vue.VNodeChild) | undefined;
    "v-slot:activator"?: false | ((args_0: {
        isActive: boolean;
        props: Record<string, any>;
    }) => vue.VNodeChild) | undefined;
}, {
    id: vue.ComputedRef<string>;
    ΨopenChildren: vue.Ref<number>;
} & Omit<Omit<{
    $: vue.ComponentInternalInstance;
    $data: {};
    $props: Partial<{
        absolute: boolean;
        location: Anchor;
        origin: "auto" | Anchor | "overlap";
        transition: string | boolean | (vue.TransitionProps & {
            component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
        });
        zIndex: string | number;
        eager: boolean;
        disabled: boolean;
        modelValue: boolean;
        activatorProps: Record<string, any>;
        openOnClick: boolean;
        openOnHover: boolean;
        openOnFocus: boolean;
        closeOnContentClick: boolean;
        locationStrategy: "connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
            updateLocation: (e: Event) => void;
        } | undefined);
        scrollStrategy: "none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition";
        closeOnBack: boolean;
        contained: boolean;
        noClickAnimation: boolean;
        persistent: boolean;
        scrim: string | boolean;
        _disableGlobalStack: boolean;
    }> & Omit<{
        absolute: boolean;
        location: Anchor;
        origin: "auto" | Anchor | "overlap";
        transition: string | boolean | (vue.TransitionProps & {
            component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
        });
        zIndex: string | number;
        eager: boolean;
        disabled: boolean;
        modelValue: boolean;
        activatorProps: Record<string, any>;
        openOnHover: boolean;
        closeOnContentClick: boolean;
        locationStrategy: "connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
            updateLocation: (e: Event) => void;
        } | undefined);
        scrollStrategy: "none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition";
        closeOnBack: boolean;
        contained: boolean;
        noClickAnimation: boolean;
        persistent: boolean;
        scrim: string | boolean;
        _disableGlobalStack: boolean;
    } & {
        offset?: string | number | number[] | undefined;
        height?: string | number | undefined;
        width?: string | number | undefined;
        maxHeight?: string | number | undefined;
        maxWidth?: string | number | undefined;
        minHeight?: string | number | undefined;
        minWidth?: string | number | undefined;
        theme?: string | undefined;
        contentClass?: any;
        activator?: string | Element | vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | undefined;
        closeDelay?: string | number | undefined;
        openDelay?: string | number | undefined;
        openOnClick?: boolean | undefined;
        openOnFocus?: boolean | undefined;
        contentProps?: any;
        attach?: string | boolean | Element | undefined;
    } & {
        $children?: {} | vue.VNodeChild | {
            default?: ((args_0: {
                isActive: vue.Ref<boolean>;
            }) => vue.VNodeChild) | undefined;
            activator?: ((args_0: {
                isActive: boolean;
                props: Record<string, any>;
            }) => vue.VNodeChild) | undefined;
        };
        'v-slots'?: {
            default?: false | ((args_0: {
                isActive: vue.Ref<boolean>;
            }) => vue.VNodeChild) | undefined;
            activator?: false | ((args_0: {
                isActive: boolean;
                props: Record<string, any>;
            }) => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:default"?: false | ((args_0: {
            isActive: vue.Ref<boolean>;
        }) => vue.VNodeChild) | undefined;
        "v-slot:activator"?: false | ((args_0: {
            isActive: boolean;
            props: Record<string, any>;
        }) => vue.VNodeChild) | undefined;
    } & {
        onAfterLeave?: (() => any) | undefined;
        "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
        "onClick:outside"?: ((e: MouseEvent) => any) | undefined;
    } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "absolute" | "location" | "origin" | "transition" | "zIndex" | "eager" | "disabled" | "modelValue" | "activatorProps" | "openOnClick" | "openOnHover" | "openOnFocus" | "closeOnContentClick" | "locationStrategy" | "scrollStrategy" | "closeOnBack" | "contained" | "noClickAnimation" | "persistent" | "scrim" | "_disableGlobalStack">;
    $attrs: {
        [x: string]: unknown;
    };
    $refs: {
        [x: string]: unknown;
    };
    $slots: Readonly<{
        [name: string]: vue.Slot | undefined;
    }>;
    $root: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null;
    $parent: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null;
    $emit: ((event: "update:modelValue", value: boolean) => void) & ((event: "click:outside", e: MouseEvent) => void) & ((event: "afterLeave") => void);
    $el: any;
    $options: vue.ComponentOptionsBase<{
        absolute: boolean;
        location: Anchor;
        origin: "auto" | Anchor | "overlap";
        transition: string | boolean | (vue.TransitionProps & {
            component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
        });
        zIndex: string | number;
        eager: boolean;
        disabled: boolean;
        modelValue: boolean;
        activatorProps: Record<string, any>;
        openOnHover: boolean;
        closeOnContentClick: boolean;
        locationStrategy: "connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
            updateLocation: (e: Event) => void;
        } | undefined);
        scrollStrategy: "none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition";
        closeOnBack: boolean;
        contained: boolean;
        noClickAnimation: boolean;
        persistent: boolean;
        scrim: string | boolean;
        _disableGlobalStack: boolean;
    } & {
        offset?: string | number | number[] | undefined;
        height?: string | number | undefined;
        width?: string | number | undefined;
        maxHeight?: string | number | undefined;
        maxWidth?: string | number | undefined;
        minHeight?: string | number | undefined;
        minWidth?: string | number | undefined;
        theme?: string | undefined;
        contentClass?: any;
        activator?: string | Element | vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | undefined;
        closeDelay?: string | number | undefined;
        openDelay?: string | number | undefined;
        openOnClick?: boolean | undefined;
        openOnFocus?: boolean | undefined;
        contentProps?: any;
        attach?: string | boolean | Element | undefined;
    } & {
        $children?: {} | vue.VNodeChild | {
            default?: ((args_0: {
                isActive: vue.Ref<boolean>;
            }) => vue.VNodeChild) | undefined;
            activator?: ((args_0: {
                isActive: boolean;
                props: Record<string, any>;
            }) => vue.VNodeChild) | undefined;
        };
        'v-slots'?: {
            default?: false | ((args_0: {
                isActive: vue.Ref<boolean>;
            }) => vue.VNodeChild) | undefined;
            activator?: false | ((args_0: {
                isActive: boolean;
                props: Record<string, any>;
            }) => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:default"?: false | ((args_0: {
            isActive: vue.Ref<boolean>;
        }) => vue.VNodeChild) | undefined;
        "v-slot:activator"?: false | ((args_0: {
            isActive: boolean;
            props: Record<string, any>;
        }) => vue.VNodeChild) | undefined;
    } & {
        onAfterLeave?: (() => any) | undefined;
        "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
        "onClick:outside"?: ((e: MouseEvent) => any) | undefined;
    }, {
        activatorEl: vue.Ref<HTMLElement | undefined>;
        animateClick: () => void;
        contentEl: vue.Ref<HTMLElement | undefined>;
        globalTop: Readonly<vue.Ref<boolean>>;
        localTop: vue.ComputedRef<boolean>;
        updateLocation: vue.Ref<((e: Event) => void) | undefined>;
    }, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
        'click:outside': (e: MouseEvent) => true;
        'update:modelValue': (value: boolean) => true;
        afterLeave: () => true;
    }, string, {
        absolute: boolean;
        location: Anchor;
        origin: "auto" | Anchor | "overlap";
        transition: string | boolean | (vue.TransitionProps & {
            component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
        });
        zIndex: string | number;
        eager: boolean;
        disabled: boolean;
        modelValue: boolean;
        activatorProps: Record<string, any>;
        openOnClick: boolean;
        openOnHover: boolean;
        openOnFocus: boolean;
        closeOnContentClick: boolean;
        locationStrategy: "connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
            updateLocation: (e: Event) => void;
        } | undefined);
        scrollStrategy: "none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition";
        closeOnBack: boolean;
        contained: boolean;
        noClickAnimation: boolean;
        persistent: boolean;
        scrim: string | boolean;
        _disableGlobalStack: boolean;
    }, {}, string> & {
        beforeCreate?: ((() => void) | (() => void)[]) | undefined;
        created?: ((() => void) | (() => void)[]) | undefined;
        beforeMount?: ((() => void) | (() => void)[]) | undefined;
        mounted?: ((() => void) | (() => void)[]) | undefined;
        beforeUpdate?: ((() => void) | (() => void)[]) | undefined;
        updated?: ((() => void) | (() => void)[]) | undefined;
        activated?: ((() => void) | (() => void)[]) | undefined;
        deactivated?: ((() => void) | (() => void)[]) | undefined;
        beforeDestroy?: ((() => void) | (() => void)[]) | undefined;
        beforeUnmount?: ((() => void) | (() => void)[]) | undefined;
        destroyed?: ((() => void) | (() => void)[]) | undefined;
        unmounted?: ((() => void) | (() => void)[]) | undefined;
        renderTracked?: (((e: vue.DebuggerEvent) => void) | ((e: vue.DebuggerEvent) => void)[]) | undefined;
        renderTriggered?: (((e: vue.DebuggerEvent) => void) | ((e: vue.DebuggerEvent) => void)[]) | undefined;
        errorCaptured?: (((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null, info: string) => boolean | void) | ((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null, info: string) => boolean | void)[]) | undefined;
    };
    $forceUpdate: () => void;
    $nextTick: typeof vue.nextTick;
    $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (args_0: R, args_1: R) => any : (...args: any) => any, options?: vue.WatchOptions<boolean> | undefined): vue.WatchStopHandle;
} & {
    absolute: boolean;
    location: Anchor;
    origin: "auto" | Anchor | "overlap";
    transition: string | boolean | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    });
    zIndex: string | number;
    eager: boolean;
    disabled: boolean;
    modelValue: boolean;
    activatorProps: Record<string, any>;
    openOnHover: boolean;
    closeOnContentClick: boolean;
    locationStrategy: "connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
        updateLocation: (e: Event) => void;
    } | undefined);
    scrollStrategy: "none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition";
    closeOnBack: boolean;
    contained: boolean;
    noClickAnimation: boolean;
    persistent: boolean;
    scrim: string | boolean;
    _disableGlobalStack: boolean;
} & {
    offset?: string | number | number[] | undefined;
    height?: string | number | undefined;
    width?: string | number | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
    theme?: string | undefined;
    contentClass?: any;
    activator?: string | Element | vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | undefined;
    closeDelay?: string | number | undefined;
    openDelay?: string | number | undefined;
    openOnClick?: boolean | undefined;
    openOnFocus?: boolean | undefined;
    contentProps?: any;
    attach?: string | boolean | Element | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: ((args_0: {
            isActive: vue.Ref<boolean>;
        }) => vue.VNodeChild) | undefined;
        activator?: ((args_0: {
            isActive: boolean;
            props: Record<string, any>;
        }) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | ((args_0: {
            isActive: vue.Ref<boolean>;
        }) => vue.VNodeChild) | undefined;
        activator?: false | ((args_0: {
            isActive: boolean;
            props: Record<string, any>;
        }) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | ((args_0: {
        isActive: vue.Ref<boolean>;
    }) => vue.VNodeChild) | undefined;
    "v-slot:activator"?: false | ((args_0: {
        isActive: boolean;
        props: Record<string, any>;
    }) => vue.VNodeChild) | undefined;
} & {
    onAfterLeave?: (() => any) | undefined;
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
    "onClick:outside"?: ((e: MouseEvent) => any) | undefined;
} & vue.ShallowUnwrapRef<{
    activatorEl: vue.Ref<HTMLElement | undefined>;
    animateClick: () => void;
    contentEl: vue.Ref<HTMLElement | undefined>;
    globalTop: Readonly<vue.Ref<boolean>>;
    localTop: vue.ComputedRef<boolean>;
    updateLocation: vue.Ref<((e: Event) => void) | undefined>;
}> & {} & vue.ComponentCustomProperties & {}, "offset" | "height" | "width" | "maxHeight" | "maxWidth" | "minHeight" | "minWidth" | "onAfterLeave" | "$children" | "theme" | "v-slot:default" | "v-slots" | "contentClass" | keyof vue.VNodeProps | keyof vue.AllowedComponentProps | "onUpdate:modelValue" | "activator" | "v-slot:activator" | "closeDelay" | "openDelay" | "contentProps" | "attach" | "onClick:outside" | ("absolute" | "location" | "origin" | "transition" | "zIndex" | "eager" | "disabled" | "modelValue" | "activatorProps" | "openOnClick" | "openOnHover" | "openOnFocus" | "closeOnContentClick" | "locationStrategy" | "scrollStrategy" | "closeOnBack" | "contained" | "noClickAnimation" | "persistent" | "scrim" | "_disableGlobalStack")>, `$${any}`>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (value: boolean) => boolean;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    location: Anchor;
    origin: "auto" | Anchor | "overlap";
    transition: NonNullable<string | boolean | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    })> | {
        component: vue.DefineComponent<{} & {
            target?: HTMLElement | undefined;
        } & {
            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                default?: (() => vue.VNodeChild) | undefined;
            };
            'v-slots'?: {
                default?: false | (() => vue.VNodeChild) | undefined;
            } | undefined;
        } & {
            "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
        }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {} & {
            target?: HTMLElement | undefined;
        } & {
            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                default?: (() => vue.VNodeChild) | undefined;
            };
            'v-slots'?: {
                default?: false | (() => vue.VNodeChild) | undefined;
            } | undefined;
        } & {
            "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
        }, {}>;
    };
    zIndex: string | number;
    eager: boolean;
    disabled: boolean;
    modelValue: boolean;
    closeDelay: NonNullable<string | number>;
    openDelay: NonNullable<string | number>;
    activatorProps: Record<string, any>;
    openOnHover: boolean;
    closeOnContentClick: boolean;
    locationStrategy: NonNullable<"connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
        updateLocation: (e: Event) => void;
    } | undefined)>;
    scrollStrategy: NonNullable<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition">;
    closeOnBack: boolean;
    contained: boolean;
    noClickAnimation: boolean;
    persistent: boolean;
    scrim: NonNullable<string | boolean>;
} & {
    offset?: string | number | number[] | undefined;
    id?: string | undefined;
    height?: string | number | undefined;
    width?: string | number | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
    theme?: string | undefined;
    contentClass?: any;
    activator?: string | Element | vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | undefined;
    openOnClick?: boolean | undefined;
    openOnFocus?: boolean | undefined;
    contentProps?: any;
    attach?: string | boolean | Element | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: ((args_0: {
            isActive: vue.Ref<boolean>;
        }) => vue.VNodeChild) | undefined;
        activator?: ((args_0: {
            isActive: boolean;
            props: Record<string, any>;
        }) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | ((args_0: {
            isActive: vue.Ref<boolean>;
        }) => vue.VNodeChild) | undefined;
        activator?: false | ((args_0: {
            isActive: boolean;
            props: Record<string, any>;
        }) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | ((args_0: {
        isActive: vue.Ref<boolean>;
    }) => vue.VNodeChild) | undefined;
    "v-slot:activator"?: false | ((args_0: {
        isActive: boolean;
        props: Record<string, any>;
    }) => vue.VNodeChild) | undefined;
} & {
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
}, {
    location: Anchor;
    origin: "auto" | Anchor | "overlap";
    transition: NonNullable<string | boolean | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    })> | {
        component: vue.DefineComponent<{} & {
            target?: HTMLElement | undefined;
        } & {
            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                default?: (() => vue.VNodeChild) | undefined;
            };
            'v-slots'?: {
                default?: false | (() => vue.VNodeChild) | undefined;
            } | undefined;
        } & {
            "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
        }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {} & {
            target?: HTMLElement | undefined;
        } & {
            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                default?: (() => vue.VNodeChild) | undefined;
            };
            'v-slots'?: {
                default?: false | (() => vue.VNodeChild) | undefined;
            } | undefined;
        } & {
            "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
        }, {}>;
    };
    zIndex: string | number;
    eager: boolean;
    disabled: boolean;
    modelValue: boolean;
    closeDelay: NonNullable<string | number>;
    openDelay: NonNullable<string | number>;
    activatorProps: Record<string, any>;
    openOnClick: boolean;
    openOnHover: boolean;
    openOnFocus: boolean;
    closeOnContentClick: boolean;
    locationStrategy: NonNullable<"connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
        updateLocation: (e: Event) => void;
    } | undefined)>;
    scrollStrategy: NonNullable<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition">;
    closeOnBack: boolean;
    contained: boolean;
    noClickAnimation: boolean;
    persistent: boolean;
    scrim: NonNullable<string | boolean>;
}>;
type VMenu = InstanceType<typeof VMenu>;

type VMessageSlot = {
    message: string;
};
declare const VMessages: vue.DefineComponent<{
    active: boolean;
    transition: {
        component: vue.DefineComponent<{
            origin: string;
            group: boolean;
            mode: string;
            hideOnLeave: boolean;
            leaveAbsolute: boolean;
        } & {} & {
            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                default?: (() => vue.VNodeChild) | undefined;
            };
            'v-slots'?: {
                default?: false | (() => vue.VNodeChild) | undefined;
            } | undefined;
        } & {
            "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
        }, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
            origin: string;
            group: boolean;
            mode: string;
            hideOnLeave: boolean;
            leaveAbsolute: boolean;
        } & {} & {
            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                default?: (() => vue.VNodeChild) | undefined;
            };
            'v-slots'?: {
                default?: false | (() => vue.VNodeChild) | undefined;
            } | undefined;
        } & {
            "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
        }, {
            origin: string;
            group: boolean;
            mode: string;
            hideOnLeave: boolean;
            leaveAbsolute: boolean;
        }>;
        leaveAbsolute: boolean;
        group: boolean;
    } | NonNullable<string | boolean | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    })>;
    messages: string | string[];
} & {
    color?: string | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        message?: ((args_0: VMessageSlot) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        message?: false | ((args_0: VMessageSlot) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:message"?: false | ((args_0: VMessageSlot) => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    active: boolean;
    transition: {
        component: vue.DefineComponent<{
            origin: string;
            group: boolean;
            mode: string;
            hideOnLeave: boolean;
            leaveAbsolute: boolean;
        } & {} & {
            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                default?: (() => vue.VNodeChild) | undefined;
            };
            'v-slots'?: {
                default?: false | (() => vue.VNodeChild) | undefined;
            } | undefined;
        } & {
            "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
        }, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
            origin: string;
            group: boolean;
            mode: string;
            hideOnLeave: boolean;
            leaveAbsolute: boolean;
        } & {} & {
            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                default?: (() => vue.VNodeChild) | undefined;
            };
            'v-slots'?: {
                default?: false | (() => vue.VNodeChild) | undefined;
            } | undefined;
        } & {
            "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
        }, {
            origin: string;
            group: boolean;
            mode: string;
            hideOnLeave: boolean;
            leaveAbsolute: boolean;
        }>;
        leaveAbsolute: boolean;
        group: boolean;
    } | NonNullable<string | boolean | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    })>;
    messages: string | string[];
} & {
    color?: string | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        message?: ((args_0: VMessageSlot) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        message?: false | ((args_0: VMessageSlot) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:message"?: false | ((args_0: VMessageSlot) => vue.VNodeChild) | undefined;
}, {
    active: boolean;
    transition: {
        component: vue.DefineComponent<{
            origin: string;
            group: boolean;
            mode: string;
            hideOnLeave: boolean;
            leaveAbsolute: boolean;
        } & {} & {
            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                default?: (() => vue.VNodeChild) | undefined;
            };
            'v-slots'?: {
                default?: false | (() => vue.VNodeChild) | undefined;
            } | undefined;
        } & {
            "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
        }, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
            origin: string;
            group: boolean;
            mode: string;
            hideOnLeave: boolean;
            leaveAbsolute: boolean;
        } & {} & {
            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                default?: (() => vue.VNodeChild) | undefined;
            };
            'v-slots'?: {
                default?: false | (() => vue.VNodeChild) | undefined;
            } | undefined;
        } & {
            "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
        }, {
            origin: string;
            group: boolean;
            mode: string;
            hideOnLeave: boolean;
            leaveAbsolute: boolean;
        }>;
        leaveAbsolute: boolean;
        group: boolean;
    } | NonNullable<string | boolean | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    })>;
    messages: string | string[];
}>;
type VMessages = InstanceType<typeof VMessages>;

type VNavigationDrawerImageSlot = {
    image: string;
};
declare const VNavigationDrawer: vue.DefineComponent<{
    absolute: boolean;
    location: "end" | "start" | "left" | "top" | "bottom" | "right";
    width: string | number;
    order: string | number;
    temporary: boolean;
    tag: string;
    sticky: boolean;
    floating: boolean;
    modelValue: boolean | null;
    scrim: string | boolean;
    touchless: boolean;
    disableResizeWatcher: boolean;
    disableRouteWatcher: boolean;
    expandOnHover: boolean;
    permanent: boolean;
    rail: boolean | null;
    railWidth: string | number;
} & {
    name?: string | undefined;
    border?: string | number | boolean | undefined;
    color?: string | undefined;
    image?: string | undefined;
    elevation?: string | number | undefined;
    theme?: string | undefined;
    rounded?: string | number | boolean | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: (() => vue.VNodeChild) | undefined;
        prepend?: (() => vue.VNodeChild) | undefined;
        append?: (() => vue.VNodeChild) | undefined;
        image?: ((args_0: VNavigationDrawerImageSlot) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
        prepend?: false | (() => vue.VNodeChild) | undefined;
        append?: false | (() => vue.VNodeChild) | undefined;
        image?: false | ((args_0: VNavigationDrawerImageSlot) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:prepend"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:append"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:image"?: false | ((args_0: VNavigationDrawerImageSlot) => vue.VNodeChild) | undefined;
}, {
    isStuck: vue.Ref<boolean | "top" | "bottom">;
}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (val: boolean) => true;
    'update:rail': (val: boolean) => true;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    absolute: boolean;
    location: "end" | "start" | "left" | "top" | "bottom" | "right";
    width: string | number;
    order: string | number;
    temporary: boolean;
    tag: string;
    sticky: boolean;
    floating: boolean;
    modelValue: boolean | null;
    scrim: string | boolean;
    touchless: boolean;
    disableResizeWatcher: boolean;
    disableRouteWatcher: boolean;
    expandOnHover: boolean;
    permanent: boolean;
    rail: boolean | null;
    railWidth: string | number;
} & {
    name?: string | undefined;
    border?: string | number | boolean | undefined;
    color?: string | undefined;
    image?: string | undefined;
    elevation?: string | number | undefined;
    theme?: string | undefined;
    rounded?: string | number | boolean | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: (() => vue.VNodeChild) | undefined;
        prepend?: (() => vue.VNodeChild) | undefined;
        append?: (() => vue.VNodeChild) | undefined;
        image?: ((args_0: VNavigationDrawerImageSlot) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
        prepend?: false | (() => vue.VNodeChild) | undefined;
        append?: false | (() => vue.VNodeChild) | undefined;
        image?: false | ((args_0: VNavigationDrawerImageSlot) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:prepend"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:append"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:image"?: false | ((args_0: VNavigationDrawerImageSlot) => vue.VNodeChild) | undefined;
} & {
    "onUpdate:modelValue"?: ((val: boolean) => any) | undefined;
    "onUpdate:rail"?: ((val: boolean) => any) | undefined;
}, {
    absolute: boolean;
    location: "end" | "start" | "left" | "top" | "bottom" | "right";
    width: string | number;
    order: string | number;
    temporary: boolean;
    tag: string;
    sticky: boolean;
    rounded: string | number | boolean;
    floating: boolean;
    modelValue: boolean | null;
    scrim: string | boolean;
    touchless: boolean;
    disableResizeWatcher: boolean;
    disableRouteWatcher: boolean;
    expandOnHover: boolean;
    permanent: boolean;
    rail: boolean | null;
    railWidth: string | number;
}>;
type VNavigationDrawer = InstanceType<typeof VNavigationDrawer>;

declare const VNoSsr: vue.DefineComponent<{
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}>, {}>;
type VNoSsr = InstanceType<typeof VNoSsr>;

declare const VOverlay: vue.DefineComponent<{
    absolute: boolean;
    location: Anchor;
    origin: "auto" | Anchor | "overlap";
    transition: string | boolean | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    });
    zIndex: string | number;
    eager: boolean;
    disabled: boolean;
    modelValue: boolean;
    activatorProps: Record<string, any>;
    openOnHover: boolean;
    closeOnContentClick: boolean;
    locationStrategy: "connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: Ref<Record<string, string>>) => {
        updateLocation: (e: Event) => void;
    } | undefined);
    scrollStrategy: "none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition";
    closeOnBack: boolean;
    contained: boolean;
    noClickAnimation: boolean;
    persistent: boolean;
    scrim: string | boolean;
    _disableGlobalStack: boolean;
} & {
    offset?: string | number | number[] | undefined;
    height?: string | number | undefined;
    width?: string | number | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
    theme?: string | undefined;
    contentClass?: any;
    activator?: string | Element | vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | undefined;
    closeDelay?: string | number | undefined;
    openDelay?: string | number | undefined;
    openOnClick?: boolean | undefined;
    openOnFocus?: boolean | undefined;
    contentProps?: any;
    attach?: string | boolean | Element | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: ((args_0: {
            isActive: Ref<boolean>;
        }) => vue.VNodeChild) | undefined;
        activator?: ((args_0: {
            isActive: boolean;
            props: Record<string, any>;
        }) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | ((args_0: {
            isActive: Ref<boolean>;
        }) => vue.VNodeChild) | undefined;
        activator?: false | ((args_0: {
            isActive: boolean;
            props: Record<string, any>;
        }) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | ((args_0: {
        isActive: Ref<boolean>;
    }) => vue.VNodeChild) | undefined;
    "v-slot:activator"?: false | ((args_0: {
        isActive: boolean;
        props: Record<string, any>;
    }) => vue.VNodeChild) | undefined;
}, {
    activatorEl: Ref<HTMLElement | undefined>;
    animateClick: () => void;
    contentEl: Ref<HTMLElement | undefined>;
    globalTop: Readonly<Ref<boolean>>;
    localTop: vue.ComputedRef<boolean>;
    updateLocation: Ref<((e: Event) => void) | undefined>;
}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'click:outside': (e: MouseEvent) => true;
    'update:modelValue': (value: boolean) => true;
    afterLeave: () => true;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    absolute: boolean;
    location: Anchor;
    origin: "auto" | Anchor | "overlap";
    transition: string | boolean | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    });
    zIndex: string | number;
    eager: boolean;
    disabled: boolean;
    modelValue: boolean;
    activatorProps: Record<string, any>;
    openOnHover: boolean;
    closeOnContentClick: boolean;
    locationStrategy: "connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: Ref<Record<string, string>>) => {
        updateLocation: (e: Event) => void;
    } | undefined);
    scrollStrategy: "none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition";
    closeOnBack: boolean;
    contained: boolean;
    noClickAnimation: boolean;
    persistent: boolean;
    scrim: string | boolean;
    _disableGlobalStack: boolean;
} & {
    offset?: string | number | number[] | undefined;
    height?: string | number | undefined;
    width?: string | number | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
    theme?: string | undefined;
    contentClass?: any;
    activator?: string | Element | vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | undefined;
    closeDelay?: string | number | undefined;
    openDelay?: string | number | undefined;
    openOnClick?: boolean | undefined;
    openOnFocus?: boolean | undefined;
    contentProps?: any;
    attach?: string | boolean | Element | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: ((args_0: {
            isActive: Ref<boolean>;
        }) => vue.VNodeChild) | undefined;
        activator?: ((args_0: {
            isActive: boolean;
            props: Record<string, any>;
        }) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | ((args_0: {
            isActive: Ref<boolean>;
        }) => vue.VNodeChild) | undefined;
        activator?: false | ((args_0: {
            isActive: boolean;
            props: Record<string, any>;
        }) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | ((args_0: {
        isActive: Ref<boolean>;
    }) => vue.VNodeChild) | undefined;
    "v-slot:activator"?: false | ((args_0: {
        isActive: boolean;
        props: Record<string, any>;
    }) => vue.VNodeChild) | undefined;
} & {
    onAfterLeave?: (() => any) | undefined;
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
    "onClick:outside"?: ((e: MouseEvent) => any) | undefined;
}, {
    absolute: boolean;
    location: Anchor;
    origin: "auto" | Anchor | "overlap";
    transition: string | boolean | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    });
    zIndex: string | number;
    eager: boolean;
    disabled: boolean;
    modelValue: boolean;
    activatorProps: Record<string, any>;
    openOnClick: boolean;
    openOnHover: boolean;
    openOnFocus: boolean;
    closeOnContentClick: boolean;
    locationStrategy: "connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: Ref<Record<string, string>>) => {
        updateLocation: (e: Event) => void;
    } | undefined);
    scrollStrategy: "none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition";
    closeOnBack: boolean;
    contained: boolean;
    noClickAnimation: boolean;
    persistent: boolean;
    scrim: string | boolean;
    _disableGlobalStack: boolean;
}>;
type VOverlay = InstanceType<typeof VOverlay>;

declare const VPagination: vue.DefineComponent<{
    length: string | number;
    start: string | number;
    ariaLabel: string;
    disabled: boolean;
    size: string | number;
    tag: string;
    ellipsis: string;
    density: Density;
    variant: NonNullable<"flat" | "text" | "elevated" | "tonal" | "outlined" | "plain">;
    modelValue: number;
    nextIcon: IconValue;
    prevIcon: IconValue;
    showFirstLastPage: boolean;
    firstIcon: IconValue;
    lastIcon: IconValue;
    pageAriaLabel: string;
    currentPageAriaLabel: string;
    firstAriaLabel: string;
    previousAriaLabel: string;
    nextAriaLabel: string;
    lastAriaLabel: string;
} & {
    border?: string | number | boolean | undefined;
    color?: string | undefined;
    elevation?: string | number | undefined;
    theme?: string | undefined;
    rounded?: string | number | boolean | undefined;
    activeColor?: string | undefined;
    totalVisible?: string | number | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        item?: (() => vue.VNodeChild) | undefined;
        first?: (() => vue.VNodeChild) | undefined;
        next?: (() => vue.VNodeChild) | undefined;
        prev?: (() => vue.VNodeChild) | undefined;
        last?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        item?: false | (() => vue.VNodeChild) | undefined;
        first?: false | (() => vue.VNodeChild) | undefined;
        next?: false | (() => vue.VNodeChild) | undefined;
        prev?: false | (() => vue.VNodeChild) | undefined;
        last?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:item"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:first"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:next"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:prev"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:last"?: false | (() => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (value: number) => true;
    first: (value: number) => true;
    prev: (value: number) => true;
    next: (value: number) => true;
    last: (value: number) => true;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    length: string | number;
    start: string | number;
    ariaLabel: string;
    disabled: boolean;
    size: string | number;
    tag: string;
    ellipsis: string;
    density: Density;
    variant: NonNullable<"flat" | "text" | "elevated" | "tonal" | "outlined" | "plain">;
    modelValue: number;
    nextIcon: IconValue;
    prevIcon: IconValue;
    showFirstLastPage: boolean;
    firstIcon: IconValue;
    lastIcon: IconValue;
    pageAriaLabel: string;
    currentPageAriaLabel: string;
    firstAriaLabel: string;
    previousAriaLabel: string;
    nextAriaLabel: string;
    lastAriaLabel: string;
} & {
    border?: string | number | boolean | undefined;
    color?: string | undefined;
    elevation?: string | number | undefined;
    theme?: string | undefined;
    rounded?: string | number | boolean | undefined;
    activeColor?: string | undefined;
    totalVisible?: string | number | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        item?: (() => vue.VNodeChild) | undefined;
        first?: (() => vue.VNodeChild) | undefined;
        next?: (() => vue.VNodeChild) | undefined;
        prev?: (() => vue.VNodeChild) | undefined;
        last?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        item?: false | (() => vue.VNodeChild) | undefined;
        first?: false | (() => vue.VNodeChild) | undefined;
        next?: false | (() => vue.VNodeChild) | undefined;
        prev?: false | (() => vue.VNodeChild) | undefined;
        last?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:item"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:first"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:next"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:prev"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:last"?: false | (() => vue.VNodeChild) | undefined;
} & {
    "onUpdate:modelValue"?: ((value: number) => any) | undefined;
    onNext?: ((value: number) => any) | undefined;
    onPrev?: ((value: number) => any) | undefined;
    onFirst?: ((value: number) => any) | undefined;
    onLast?: ((value: number) => any) | undefined;
}, {
    length: string | number;
    start: string | number;
    ariaLabel: string;
    disabled: boolean;
    size: string | number;
    tag: string;
    ellipsis: string;
    rounded: string | number | boolean;
    density: Density;
    variant: NonNullable<"flat" | "text" | "elevated" | "tonal" | "outlined" | "plain">;
    modelValue: number;
    nextIcon: IconValue;
    prevIcon: IconValue;
    showFirstLastPage: boolean;
    firstIcon: IconValue;
    lastIcon: IconValue;
    pageAriaLabel: string;
    currentPageAriaLabel: string;
    firstAriaLabel: string;
    previousAriaLabel: string;
    nextAriaLabel: string;
    lastAriaLabel: string;
}>;
type VPagination = InstanceType<typeof VPagination>;

declare const VParallax: vue.DefineComponent<{
    scale: string | number;
} & {} & {
    $children?: {} | vue.VNodeChild | {
        default?: (() => vue.VNodeChild) | undefined;
        placeholder?: (() => vue.VNodeChild) | undefined;
        error?: (() => vue.VNodeChild) | undefined;
        sources?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
        placeholder?: false | (() => vue.VNodeChild) | undefined;
        error?: false | (() => vue.VNodeChild) | undefined;
        sources?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:placeholder"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:error"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:sources"?: false | (() => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    scale: string | number;
} & {} & {
    $children?: {} | vue.VNodeChild | {
        default?: (() => vue.VNodeChild) | undefined;
        placeholder?: (() => vue.VNodeChild) | undefined;
        error?: (() => vue.VNodeChild) | undefined;
        sources?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
        placeholder?: false | (() => vue.VNodeChild) | undefined;
        error?: false | (() => vue.VNodeChild) | undefined;
        sources?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:placeholder"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:error"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:sources"?: false | (() => vue.VNodeChild) | undefined;
}, {
    scale: string | number;
}>;
type VParallax = InstanceType<typeof VParallax>;

declare const VProgressCircular: vue.DefineComponent<{
    width: string | number;
    rotate: string | number;
    size: string | number;
    tag: string;
    modelValue: string | number;
} & {
    color?: string | undefined;
    indeterminate?: boolean | "disable-shrink" | undefined;
    theme?: string | undefined;
    bgColor?: string | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    width: string | number;
    rotate: string | number;
    size: string | number;
    tag: string;
    modelValue: string | number;
} & {
    color?: string | undefined;
    indeterminate?: boolean | "disable-shrink" | undefined;
    theme?: string | undefined;
    bgColor?: string | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    width: string | number;
    rotate: string | number;
    size: string | number;
    tag: string;
    modelValue: string | number;
}>;
type VProgressCircular = InstanceType<typeof VProgressCircular>;

declare const VProgressLinear: vue.DefineComponent<{
    reverse: boolean;
    max: string | number;
    absolute: boolean;
    location: NonNullable<Anchor>;
    height: string | number;
    active: boolean;
    tag: string;
    indeterminate: boolean;
    modelValue: string | number;
    clickable: boolean;
    stream: boolean;
    striped: boolean;
    roundedBar: boolean;
    bufferValue: string | number;
} & {
    color?: string | undefined;
    theme?: string | undefined;
    rounded?: string | number | boolean | undefined;
    bgColor?: string | undefined;
    bgOpacity?: string | number | undefined;
} & {
    $children?: vue.VNodeChild | ((args_0: {
        value: number;
        buffer: number;
    }) => vue.VNodeChild) | {
        default?: ((args_0: {
            value: number;
            buffer: number;
        }) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | ((args_0: {
            value: number;
            buffer: number;
        }) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | ((args_0: {
        value: number;
        buffer: number;
    }) => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (value: number) => boolean;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    reverse: boolean;
    max: string | number;
    absolute: boolean;
    location: NonNullable<Anchor>;
    height: string | number;
    active: boolean;
    tag: string;
    indeterminate: boolean;
    modelValue: string | number;
    clickable: boolean;
    stream: boolean;
    striped: boolean;
    roundedBar: boolean;
    bufferValue: string | number;
} & {
    color?: string | undefined;
    theme?: string | undefined;
    rounded?: string | number | boolean | undefined;
    bgColor?: string | undefined;
    bgOpacity?: string | number | undefined;
} & {
    $children?: vue.VNodeChild | ((args_0: {
        value: number;
        buffer: number;
    }) => vue.VNodeChild) | {
        default?: ((args_0: {
            value: number;
            buffer: number;
        }) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | ((args_0: {
            value: number;
            buffer: number;
        }) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | ((args_0: {
        value: number;
        buffer: number;
    }) => vue.VNodeChild) | undefined;
} & {
    "onUpdate:modelValue"?: ((value: number) => any) | undefined;
}, {
    reverse: boolean;
    max: string | number;
    absolute: boolean;
    location: NonNullable<Anchor>;
    height: string | number;
    active: boolean;
    tag: string;
    indeterminate: boolean;
    rounded: string | number | boolean;
    modelValue: string | number;
    clickable: boolean;
    stream: boolean;
    striped: boolean;
    roundedBar: boolean;
    bufferValue: string | number;
}>;
type VProgressLinear = InstanceType<typeof VProgressLinear>;

declare const VRadio: vue.DefineComponent<{
    inline: boolean;
    error: boolean;
    disabled: boolean;
    multiple: boolean | null;
    readonly: boolean;
    density: Density;
    ripple: boolean;
    falseIcon: NonNullable<IconValue>;
    trueIcon: NonNullable<IconValue>;
    valueComparator: typeof deepEqual;
} & {
    type?: string | undefined;
    id?: string | undefined;
    name?: string | undefined;
    color?: string | undefined;
    value?: any;
    label?: string | undefined;
    theme?: string | undefined;
    modelValue?: any;
    trueValue?: any;
    falseValue?: any;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: (() => vue.VNodeChild) | undefined;
        label?: ((args_0: {
            label: string | undefined;
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        input?: ((args_0: SelectionControlSlot) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
        label?: false | ((args_0: {
            label: string | undefined;
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        input?: false | ((args_0: SelectionControlSlot) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:label"?: false | ((args_0: {
        label: string | undefined;
        props: Record<string, unknown>;
    }) => vue.VNodeChild) | undefined;
    "v-slot:input"?: false | ((args_0: SelectionControlSlot) => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    inline: boolean;
    error: boolean;
    disabled: boolean;
    multiple: boolean | null;
    readonly: boolean;
    density: Density;
    ripple: boolean;
    falseIcon: NonNullable<IconValue>;
    trueIcon: NonNullable<IconValue>;
    valueComparator: typeof deepEqual;
} & {
    type?: string | undefined;
    id?: string | undefined;
    name?: string | undefined;
    color?: string | undefined;
    value?: any;
    label?: string | undefined;
    theme?: string | undefined;
    modelValue?: any;
    trueValue?: any;
    falseValue?: any;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: (() => vue.VNodeChild) | undefined;
        label?: ((args_0: {
            label: string | undefined;
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        input?: ((args_0: SelectionControlSlot) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
        label?: false | ((args_0: {
            label: string | undefined;
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        input?: false | ((args_0: SelectionControlSlot) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:label"?: false | ((args_0: {
        label: string | undefined;
        props: Record<string, unknown>;
    }) => vue.VNodeChild) | undefined;
    "v-slot:input"?: false | ((args_0: SelectionControlSlot) => vue.VNodeChild) | undefined;
}, {
    inline: boolean;
    error: boolean;
    disabled: boolean;
    multiple: boolean | null;
    readonly: boolean;
    density: Density;
    ripple: boolean;
    falseIcon: NonNullable<IconValue>;
    trueIcon: NonNullable<IconValue>;
    valueComparator: typeof deepEqual;
}>;
type VRadio = InstanceType<typeof VRadio>;

declare const VRadioGroup: vue.DefineComponent<{
    type: string;
    inline: boolean;
    error: boolean;
    height: string | number;
    direction: "horizontal" | "vertical";
    disabled: boolean;
    readonly: boolean;
    messages: string | string[];
    density: Density;
    ripple: boolean;
    focused: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    falseIcon: IconValue;
    trueIcon: IconValue;
    valueComparator: typeof deepEqual;
} & {
    id?: string | undefined;
    name?: string | undefined;
    color?: string | undefined;
    label?: string | undefined;
    theme?: string | undefined;
    modelValue?: any;
    prependIcon?: IconValue | undefined;
    appendIcon?: IconValue | undefined;
    'onClick:append'?: EventProp<(...args: any[]) => any> | undefined;
    'onClick:prepend'?: EventProp<(...args: any[]) => any> | undefined;
    validateOn?: "input" | "blur" | "submit" | undefined;
    validationValue?: any;
    hideDetails?: boolean | "auto" | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: (((args_0: VInputSlot) => vue.VNodeChild) & (() => vue.VNodeChild)) | undefined;
        prepend?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        append?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        details?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        label?: ((args_0: {
            label: string | undefined;
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        input?: ((args_0: SelectionControlSlot) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (((args_0: VInputSlot) => vue.VNodeChild) & (() => vue.VNodeChild)) | undefined;
        prepend?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        append?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        details?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        label?: false | ((args_0: {
            label: string | undefined;
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        input?: false | ((args_0: SelectionControlSlot) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (((args_0: VInputSlot) => vue.VNodeChild) & (() => vue.VNodeChild)) | undefined;
    "v-slot:prepend"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:append"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:details"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:label"?: false | ((args_0: {
        label: string | undefined;
        props: Record<string, unknown>;
    }) => vue.VNodeChild) | undefined;
    "v-slot:input"?: false | ((args_0: SelectionControlSlot) => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (val: any) => boolean;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    type: string;
    inline: boolean;
    error: boolean;
    height: string | number;
    direction: "horizontal" | "vertical";
    disabled: boolean;
    readonly: boolean;
    messages: string | string[];
    density: Density;
    ripple: boolean;
    focused: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    falseIcon: IconValue;
    trueIcon: IconValue;
    valueComparator: typeof deepEqual;
} & {
    id?: string | undefined;
    name?: string | undefined;
    color?: string | undefined;
    label?: string | undefined;
    theme?: string | undefined;
    modelValue?: any;
    prependIcon?: IconValue | undefined;
    appendIcon?: IconValue | undefined;
    'onClick:append'?: EventProp<(...args: any[]) => any> | undefined;
    'onClick:prepend'?: EventProp<(...args: any[]) => any> | undefined;
    validateOn?: "input" | "blur" | "submit" | undefined;
    validationValue?: any;
    hideDetails?: boolean | "auto" | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: (((args_0: VInputSlot) => vue.VNodeChild) & (() => vue.VNodeChild)) | undefined;
        prepend?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        append?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        details?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        label?: ((args_0: {
            label: string | undefined;
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        input?: ((args_0: SelectionControlSlot) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (((args_0: VInputSlot) => vue.VNodeChild) & (() => vue.VNodeChild)) | undefined;
        prepend?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        append?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        details?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        label?: false | ((args_0: {
            label: string | undefined;
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        input?: false | ((args_0: SelectionControlSlot) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (((args_0: VInputSlot) => vue.VNodeChild) & (() => vue.VNodeChild)) | undefined;
    "v-slot:prepend"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:append"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:details"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:label"?: false | ((args_0: {
        label: string | undefined;
        props: Record<string, unknown>;
    }) => vue.VNodeChild) | undefined;
    "v-slot:input"?: false | ((args_0: SelectionControlSlot) => vue.VNodeChild) | undefined;
} & {
    "onUpdate:modelValue"?: ((val: any) => any) | undefined;
}, {
    type: string;
    inline: boolean;
    error: boolean;
    height: string | number;
    direction: "horizontal" | "vertical";
    disabled: boolean;
    readonly: boolean;
    messages: string | string[];
    density: Density;
    ripple: boolean;
    focused: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    falseIcon: IconValue;
    trueIcon: IconValue;
    valueComparator: typeof deepEqual;
}>;
type VRadioGroup = InstanceType<typeof VRadioGroup>;

declare const VRangeSlider: vue.DefineComponent<{
    reverse: boolean;
    max: string | number;
    error: boolean;
    strict: boolean;
    direction: "horizontal" | "vertical";
    disabled: boolean;
    readonly: boolean;
    step: string | number;
    min: string | number;
    elevation: NonNullable<string | number>;
    messages: string | string[];
    density: Density;
    modelValue: number[];
    focused: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    showTicks: boolean | "always";
    tickSize: string | number;
    trackSize: string | number;
    thumbSize: string | number;
} & {
    id?: string | undefined;
    name?: string | undefined;
    color?: string | undefined;
    label?: string | undefined;
    rounded?: string | number | boolean | undefined;
    prependIcon?: IconValue | undefined;
    appendIcon?: IconValue | undefined;
    'onClick:append'?: EventProp<(...args: any[]) => any> | undefined;
    'onClick:prepend'?: EventProp<(...args: any[]) => any> | undefined;
    validateOn?: "input" | "blur" | "submit" | undefined;
    validationValue?: any;
    hideDetails?: boolean | "auto" | undefined;
    trackColor?: string | undefined;
    trackFillColor?: string | undefined;
    thumbColor?: string | undefined;
    thumbLabel?: boolean | "always" | undefined;
    ticks?: number[] | Record<number, string> | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        prepend?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        append?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        details?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        'tick-label'?: (() => vue.VNodeChild) | undefined;
        'thumb-label'?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        prepend?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        append?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        details?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        'tick-label'?: false | (() => vue.VNodeChild) | undefined;
        'thumb-label'?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:prepend"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:append"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:details"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:tick-label"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:thumb-label"?: false | (() => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:focused': (value: boolean) => boolean;
    'update:modelValue': (value: [number, number]) => boolean;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    reverse: boolean;
    max: string | number;
    error: boolean;
    strict: boolean;
    direction: "horizontal" | "vertical";
    disabled: boolean;
    readonly: boolean;
    step: string | number;
    min: string | number;
    elevation: NonNullable<string | number>;
    messages: string | string[];
    density: Density;
    modelValue: number[];
    focused: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    showTicks: boolean | "always";
    tickSize: string | number;
    trackSize: string | number;
    thumbSize: string | number;
} & {
    id?: string | undefined;
    name?: string | undefined;
    color?: string | undefined;
    label?: string | undefined;
    rounded?: string | number | boolean | undefined;
    prependIcon?: IconValue | undefined;
    appendIcon?: IconValue | undefined;
    'onClick:append'?: EventProp<(...args: any[]) => any> | undefined;
    'onClick:prepend'?: EventProp<(...args: any[]) => any> | undefined;
    validateOn?: "input" | "blur" | "submit" | undefined;
    validationValue?: any;
    hideDetails?: boolean | "auto" | undefined;
    trackColor?: string | undefined;
    trackFillColor?: string | undefined;
    thumbColor?: string | undefined;
    thumbLabel?: boolean | "always" | undefined;
    ticks?: number[] | Record<number, string> | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        prepend?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        append?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        details?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        'tick-label'?: (() => vue.VNodeChild) | undefined;
        'thumb-label'?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        prepend?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        append?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        details?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        'tick-label'?: false | (() => vue.VNodeChild) | undefined;
        'thumb-label'?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:prepend"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:append"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:details"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:tick-label"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:thumb-label"?: false | (() => vue.VNodeChild) | undefined;
} & {
    "onUpdate:modelValue"?: ((value: [number, number]) => any) | undefined;
    "onUpdate:focused"?: ((value: boolean) => any) | undefined;
}, {
    reverse: boolean;
    max: string | number;
    error: boolean;
    strict: boolean;
    direction: "horizontal" | "vertical";
    disabled: boolean;
    readonly: boolean;
    step: string | number;
    min: string | number;
    elevation: NonNullable<string | number>;
    messages: string | string[];
    rounded: string | number | boolean;
    density: Density;
    modelValue: number[];
    focused: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    showTicks: boolean | "always";
    tickSize: string | number;
    trackSize: string | number;
    thumbLabel: boolean | "always" | undefined;
    thumbSize: string | number;
}>;
type VRangeSlider = InstanceType<typeof VRangeSlider>;

type VRatingItemSlot = {
    value: number;
    index: number;
    isFilled: boolean;
    isHovered: boolean;
    icon: IconValue;
    color?: string;
    props: Record<string, unknown>;
};
type VRatingItemLabelSlot = {
    value: number;
    index: number;
    label?: string;
};
declare const VRating: vue.DefineComponent<{
    length: string | number;
    disabled: boolean;
    size: string | number;
    readonly: boolean;
    tag: string;
    density: Density;
    modelValue: string | number;
    ripple: boolean;
    clearable: boolean;
    hover: boolean;
    halfIncrements: boolean;
    itemAriaLabel: string;
    emptyIcon: IconValue;
    fullIcon: IconValue;
    itemLabelPosition: string;
} & {
    name?: string | undefined;
    color?: string | undefined;
    theme?: string | undefined;
    activeColor?: string | undefined;
    itemLabels?: string[] | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        item?: ((args_0: VRatingItemSlot) => vue.VNodeChild) | undefined;
        'item-label'?: ((args_0: VRatingItemLabelSlot) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        item?: false | ((args_0: VRatingItemSlot) => vue.VNodeChild) | undefined;
        'item-label'?: false | ((args_0: VRatingItemLabelSlot) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:item"?: false | ((args_0: VRatingItemSlot) => vue.VNodeChild) | undefined;
    "v-slot:item-label"?: false | ((args_0: VRatingItemLabelSlot) => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (value: number | string) => boolean;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    length: string | number;
    disabled: boolean;
    size: string | number;
    readonly: boolean;
    tag: string;
    density: Density;
    modelValue: string | number;
    ripple: boolean;
    clearable: boolean;
    hover: boolean;
    halfIncrements: boolean;
    itemAriaLabel: string;
    emptyIcon: IconValue;
    fullIcon: IconValue;
    itemLabelPosition: string;
} & {
    name?: string | undefined;
    color?: string | undefined;
    theme?: string | undefined;
    activeColor?: string | undefined;
    itemLabels?: string[] | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        item?: ((args_0: VRatingItemSlot) => vue.VNodeChild) | undefined;
        'item-label'?: ((args_0: VRatingItemLabelSlot) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        item?: false | ((args_0: VRatingItemSlot) => vue.VNodeChild) | undefined;
        'item-label'?: false | ((args_0: VRatingItemLabelSlot) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:item"?: false | ((args_0: VRatingItemSlot) => vue.VNodeChild) | undefined;
    "v-slot:item-label"?: false | ((args_0: VRatingItemLabelSlot) => vue.VNodeChild) | undefined;
} & {
    "onUpdate:modelValue"?: ((value: string | number) => any) | undefined;
}, {
    length: string | number;
    disabled: boolean;
    size: string | number;
    readonly: boolean;
    tag: string;
    density: Density;
    modelValue: string | number;
    ripple: boolean;
    clearable: boolean;
    hover: boolean;
    halfIncrements: boolean;
    itemAriaLabel: string;
    emptyIcon: IconValue;
    fullIcon: IconValue;
    itemLabelPosition: string;
}>;
type VRating = InstanceType<typeof VRating>;

declare const VResponsive: vue.DefineComponent<{} & {
    height?: string | number | undefined;
    width?: string | number | undefined;
    aspectRatio?: string | number | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
    contentClass?: string | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: (() => vue.VNodeChild) | undefined;
        additional?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
        additional?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:additional"?: false | (() => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {} & {
    height?: string | number | undefined;
    width?: string | number | undefined;
    aspectRatio?: string | number | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
    contentClass?: string | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: (() => vue.VNodeChild) | undefined;
        additional?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
        additional?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:additional"?: false | (() => vue.VNodeChild) | undefined;
}, {}>;
type VResponsive = InstanceType<typeof VResponsive>;

type Primitive = string | number | boolean | symbol;
type Val<T, ReturnObject extends boolean> = T extends Primitive ? T : (ReturnObject extends true ? T : any);
type Value<T, ReturnObject extends boolean, Multiple extends boolean> = Multiple extends true ? readonly Val<T, ReturnObject>[] : Val<T, ReturnObject>;
declare const VSelect: {
    new (...args: any[]): {
        $: vue.ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            reverse: boolean;
            type: string;
            error: boolean;
            active: boolean;
            direction: "horizontal" | "vertical";
            transition: NonNullable<string | boolean | (vue.TransitionProps & {
                component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
            })> | {
                component: vue.DefineComponent<{} & {
                    target?: HTMLElement | undefined;
                } & {
                    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                        default?: (() => vue.VNodeChild) | undefined;
                    };
                    'v-slots'?: {
                        default?: false | (() => vue.VNodeChild) | undefined;
                    } | undefined;
                } & {
                    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {} & {
                    target?: HTMLElement | undefined;
                } & {
                    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                        default?: (() => vue.VNodeChild) | undefined;
                    };
                    'v-slots'?: {
                        default?: false | (() => vue.VNodeChild) | undefined;
                    } | undefined;
                } & {
                    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                }, {}>;
            };
            menu: boolean;
            autofocus: boolean;
            eager: boolean;
            disabled: boolean;
            readonly: boolean;
            noDataText: string;
            messages: string | string[];
            density: Density;
            variant: "filled" | "outlined" | "plain" | "underlined" | "solo";
            clearIcon: IconValue;
            focused: boolean;
            errorMessages: string | string[];
            maxErrors: string | number;
            rules: ValidationRule[];
            clearable: boolean;
            persistentClear: boolean;
            singleLine: boolean;
            persistentHint: boolean;
            persistentPlaceholder: boolean;
            persistentCounter: boolean;
            valueComparator: typeof deepEqual;
            itemTitle: SelectItemKey;
            itemValue: SelectItemKey;
            itemChildren: NonNullable<SelectItemKey>;
            itemProps: SelectItemKey;
            chips: boolean;
            closableChips: boolean;
            hideNoData: boolean;
            hideSelected: boolean;
            menuIcon: IconValue;
            openOnClear: boolean;
        }> & Omit<Readonly<vue.ExtractPropTypes<Omit<{
            transition: Omit<{
                type: PropType<string | boolean | (vue.TransitionProps & {
                    component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
                })>;
                default: string;
                validator: (val: unknown) => boolean;
            }, "type" | "default"> & {
                type: PropType<NonNullable<string | boolean | (vue.TransitionProps & {
                    component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
                })> | {
                    component: vue.DefineComponent<{} & {
                        target?: HTMLElement | undefined;
                    } & {
                        $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                            default?: (() => vue.VNodeChild) | undefined;
                        };
                        'v-slots'?: {
                            default?: false | (() => vue.VNodeChild) | undefined;
                        } | undefined;
                    } & {
                        "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                    }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {} & {
                        target?: HTMLElement | undefined;
                    } & {
                        $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                            default?: (() => vue.VNodeChild) | undefined;
                        };
                        'v-slots'?: {
                            default?: false | (() => vue.VNodeChild) | undefined;
                        } | undefined;
                    } & {
                        "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                    }, {}>;
                }>;
                default: NonNullable<string | boolean | (vue.TransitionProps & {
                    component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
                })> | {
                    component: vue.DefineComponent<{} & {
                        target?: HTMLElement | undefined;
                    } & {
                        $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                            default?: (() => vue.VNodeChild) | undefined;
                        };
                        'v-slots'?: {
                            default?: false | (() => vue.VNodeChild) | undefined;
                        } | undefined;
                    } & {
                        "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                    }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {} & {
                        target?: HTMLElement | undefined;
                    } & {
                        $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                            default?: (() => vue.VNodeChild) | undefined;
                        };
                        'v-slots'?: {
                            default?: false | (() => vue.VNodeChild) | undefined;
                        } | undefined;
                    } & {
                        "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                    }, {}>;
                };
            };
            reverse: BooleanConstructor;
            type: {
                type: StringConstructor;
                default: string;
            };
            error: BooleanConstructor;
            id: StringConstructor;
            active: BooleanConstructor;
            name: StringConstructor;
            color: StringConstructor;
            direction: {
                type: PropType<"horizontal" | "vertical">;
                default: string;
                validator: (v: any) => boolean;
            };
            loading: (StringConstructor | BooleanConstructor)[];
            label: StringConstructor;
            prefix: StringConstructor;
            autofocus: BooleanConstructor;
            disabled: BooleanConstructor;
            readonly: BooleanConstructor;
            placeholder: StringConstructor;
            theme: StringConstructor;
            counter: PropType<string | number | true>;
            messages: {
                type: PropType<string | string[]>;
                default: () => never[];
            };
            density: {
                type: PropType<Density>;
                default: string;
                validator: (v: any) => boolean;
            };
            variant: {
                type: PropType<"filled" | "outlined" | "plain" | "underlined" | "solo">;
                default: string;
                validator: (v: any) => boolean;
            };
            modelValue: {
                type: PropType<any>;
                default: any;
            };
            bgColor: StringConstructor;
            prependIcon: PropType<IconValue>;
            appendIcon: PropType<IconValue>;
            clearIcon: {
                type: PropType<IconValue>;
                default: string;
            };
            prependInnerIcon: PropType<IconValue>;
            'onClick:clear': PropType<EventProp<(...args: any[]) => any>>;
            'onClick:append': PropType<EventProp<(...args: any[]) => any>>;
            'onClick:prepend': PropType<EventProp<(...args: any[]) => any>>;
            'onClick:appendInner': PropType<EventProp<(...args: any[]) => any>>;
            'onClick:prependInner': PropType<EventProp<(...args: any[]) => any>>;
            focused: BooleanConstructor;
            validateOn: PropType<"input" | "blur" | "submit" | undefined>;
            errorMessages: {
                type: PropType<string | string[]>;
                default: () => never[];
            };
            maxErrors: {
                type: (StringConstructor | NumberConstructor)[];
                default: number;
            };
            rules: {
                type: PropType<ValidationRule[]>;
                default: () => never[];
            };
            hideDetails: PropType<boolean | "auto">;
            clearable: BooleanConstructor;
            persistentClear: BooleanConstructor;
            singleLine: BooleanConstructor;
            hint: StringConstructor;
            persistentHint: BooleanConstructor;
            persistentPlaceholder: BooleanConstructor;
            persistentCounter: BooleanConstructor;
            suffix: StringConstructor;
            counterValue: PropType<(value: any) => number>;
            items: {
                type: PropType<any[]>;
                default: () => never[];
            };
            itemTitle: {
                type: PropType<SelectItemKey>;
                default: string;
            };
            itemValue: {
                type: PropType<SelectItemKey>;
                default: string;
            };
            itemChildren: Omit<{
                type: PropType<SelectItemKey>;
                default: string;
            }, "type" | "default"> & {
                type: PropType<NonNullable<SelectItemKey>>;
                default: NonNullable<SelectItemKey>;
            };
            itemProps: {
                type: PropType<SelectItemKey>;
                default: string;
            };
            returnObject: BooleanConstructor;
            chips: BooleanConstructor;
            closableChips: BooleanConstructor;
            eager: BooleanConstructor;
            hideNoData: BooleanConstructor;
            hideSelected: BooleanConstructor;
            menu: BooleanConstructor;
            menuIcon: {
                type: PropType<IconValue>;
                default: string;
            };
            menuProps: {
                type: PropType<Partial<{
                    location: Anchor;
                    origin: "auto" | Anchor | "overlap";
                    transition: NonNullable<string | boolean | (vue.TransitionProps & {
                        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
                    })> | {
                        component: vue.DefineComponent<{} & {
                            target?: HTMLElement | undefined;
                        } & {
                            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                                default?: (() => vue.VNodeChild) | undefined;
                            };
                            'v-slots'?: {
                                default?: false | (() => vue.VNodeChild) | undefined;
                            } | undefined;
                        } & {
                            "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                        }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {} & {
                            target?: HTMLElement | undefined;
                        } & {
                            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                                default?: (() => vue.VNodeChild) | undefined;
                            };
                            'v-slots'?: {
                                default?: false | (() => vue.VNodeChild) | undefined;
                            } | undefined;
                        } & {
                            "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                        }, {}>;
                    };
                    zIndex: string | number;
                    eager: boolean;
                    disabled: boolean;
                    modelValue: boolean;
                    closeDelay: NonNullable<string | number>;
                    openDelay: NonNullable<string | number>;
                    activatorProps: Record<string, any>;
                    openOnClick: boolean;
                    openOnHover: boolean;
                    openOnFocus: boolean;
                    closeOnContentClick: boolean;
                    locationStrategy: NonNullable<"connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
                        updateLocation: (e: Event) => void;
                    } | undefined)>;
                    scrollStrategy: NonNullable<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition">;
                    closeOnBack: boolean;
                    contained: boolean;
                    noClickAnimation: boolean;
                    persistent: boolean;
                    scrim: NonNullable<string | boolean>;
                }> & Omit<{
                    location: Anchor;
                    origin: "auto" | Anchor | "overlap";
                    transition: NonNullable<string | boolean | (vue.TransitionProps & {
                        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
                    })> | {
                        component: vue.DefineComponent<{} & {
                            target?: HTMLElement | undefined;
                        } & {
                            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                                default?: (() => vue.VNodeChild) | undefined;
                            };
                            'v-slots'?: {
                                default?: false | (() => vue.VNodeChild) | undefined;
                            } | undefined;
                        } & {
                            "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                        }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {} & {
                            target?: HTMLElement | undefined;
                        } & {
                            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                                default?: (() => vue.VNodeChild) | undefined;
                            };
                            'v-slots'?: {
                                default?: false | (() => vue.VNodeChild) | undefined;
                            } | undefined;
                        } & {
                            "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                        }, {}>;
                    };
                    zIndex: string | number;
                    eager: boolean;
                    disabled: boolean;
                    modelValue: boolean;
                    closeDelay: NonNullable<string | number>;
                    openDelay: NonNullable<string | number>;
                    activatorProps: Record<string, any>;
                    openOnHover: boolean;
                    closeOnContentClick: boolean;
                    locationStrategy: NonNullable<"connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
                        updateLocation: (e: Event) => void;
                    } | undefined)>;
                    scrollStrategy: NonNullable<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition">;
                    closeOnBack: boolean;
                    contained: boolean;
                    noClickAnimation: boolean;
                    persistent: boolean;
                    scrim: NonNullable<string | boolean>;
                } & {
                    offset?: string | number | number[] | undefined;
                    id?: string | undefined;
                    height?: string | number | undefined;
                    width?: string | number | undefined;
                    maxHeight?: string | number | undefined;
                    maxWidth?: string | number | undefined;
                    minHeight?: string | number | undefined;
                    minWidth?: string | number | undefined;
                    theme?: string | undefined;
                    contentClass?: any;
                    activator?: string | Element | vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | undefined;
                    openOnClick?: boolean | undefined;
                    openOnFocus?: boolean | undefined;
                    contentProps?: any;
                    attach?: string | boolean | Element | undefined;
                } & {
                    $children?: {} | vue.VNodeChild | {
                        default?: ((args_0: {
                            isActive: vue.Ref<boolean>;
                        }) => vue.VNodeChild) | undefined;
                        activator?: ((args_0: {
                            isActive: boolean;
                            props: Record<string, any>;
                        }) => vue.VNodeChild) | undefined;
                    };
                    'v-slots'?: {
                        default?: false | ((args_0: {
                            isActive: vue.Ref<boolean>;
                        }) => vue.VNodeChild) | undefined;
                        activator?: false | ((args_0: {
                            isActive: boolean;
                            props: Record<string, any>;
                        }) => vue.VNodeChild) | undefined;
                    } | undefined;
                } & {
                    "v-slot:default"?: false | ((args_0: {
                        isActive: vue.Ref<boolean>;
                    }) => vue.VNodeChild) | undefined;
                    "v-slot:activator"?: false | ((args_0: {
                        isActive: boolean;
                        props: Record<string, any>;
                    }) => vue.VNodeChild) | undefined;
                } & {
                    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
                } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "location" | "origin" | "transition" | "zIndex" | "eager" | "disabled" | "modelValue" | "closeDelay" | "openDelay" | "activatorProps" | "openOnClick" | "openOnHover" | "openOnFocus" | "closeOnContentClick" | "locationStrategy" | "scrollStrategy" | "closeOnBack" | "contained" | "noClickAnimation" | "persistent" | "scrim">>;
            };
            multiple: BooleanConstructor;
            noDataText: {
                type: StringConstructor;
                default: string;
            };
            openOnClear: BooleanConstructor;
            valueComparator: {
                type: PropType<typeof deepEqual>;
                default: typeof deepEqual;
            };
        }, "multiple" | "$children" | "items" | "v-slots" | "v-slot:append" | "v-slot:prepend" | "modelValue" | "onUpdate:modelValue" | "v-slot:loader" | "v-slot:details" | "v-slot:clear" | "v-slot:label" | "v-slot:prepend-inner" | "v-slot:append-inner" | "v-slot:item" | "returnObject" | "v-slot:chip" | "v-slot:selection" | "v-slot:prepend-item" | "v-slot:append-item" | "v-slot:no-data">>> & {
            "onUpdate:menu"?: ((val: boolean) => any) | undefined;
        } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "reverse" | "type" | "error" | "active" | "direction" | "transition" | "menu" | "autofocus" | "eager" | "disabled" | "readonly" | "noDataText" | "messages" | "density" | "variant" | "clearIcon" | "focused" | "errorMessages" | "maxErrors" | "rules" | "clearable" | "persistentClear" | "singleLine" | "persistentHint" | "persistentPlaceholder" | "persistentCounter" | "valueComparator" | "itemTitle" | "itemValue" | "itemChildren" | "itemProps" | "chips" | "closableChips" | "hideNoData" | "hideSelected" | "menuIcon" | "openOnClear">;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            [name: string]: vue.Slot | undefined;
        }>;
        $root: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null;
        $parent: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null;
        $emit: (event: "update:menu", val: boolean) => void;
        $el: any;
        $options: vue.ComponentOptionsBase<Readonly<vue.ExtractPropTypes<Omit<{
            transition: Omit<{
                type: PropType<string | boolean | (vue.TransitionProps & {
                    component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
                })>;
                default: string;
                validator: (val: unknown) => boolean;
            }, "type" | "default"> & {
                type: PropType<NonNullable<string | boolean | (vue.TransitionProps & {
                    component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
                })> | {
                    component: vue.DefineComponent<{} & {
                        target?: HTMLElement | undefined;
                    } & {
                        $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                            default?: (() => vue.VNodeChild) | undefined;
                        };
                        'v-slots'?: {
                            default?: false | (() => vue.VNodeChild) | undefined;
                        } | undefined;
                    } & {
                        "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                    }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {} & {
                        target?: HTMLElement | undefined;
                    } & {
                        $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                            default?: (() => vue.VNodeChild) | undefined;
                        };
                        'v-slots'?: {
                            default?: false | (() => vue.VNodeChild) | undefined;
                        } | undefined;
                    } & {
                        "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                    }, {}>;
                }>;
                default: NonNullable<string | boolean | (vue.TransitionProps & {
                    component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
                })> | {
                    component: vue.DefineComponent<{} & {
                        target?: HTMLElement | undefined;
                    } & {
                        $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                            default?: (() => vue.VNodeChild) | undefined;
                        };
                        'v-slots'?: {
                            default?: false | (() => vue.VNodeChild) | undefined;
                        } | undefined;
                    } & {
                        "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                    }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {} & {
                        target?: HTMLElement | undefined;
                    } & {
                        $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                            default?: (() => vue.VNodeChild) | undefined;
                        };
                        'v-slots'?: {
                            default?: false | (() => vue.VNodeChild) | undefined;
                        } | undefined;
                    } & {
                        "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                    }, {}>;
                };
            };
            reverse: BooleanConstructor;
            type: {
                type: StringConstructor;
                default: string;
            };
            error: BooleanConstructor;
            id: StringConstructor;
            active: BooleanConstructor;
            name: StringConstructor;
            color: StringConstructor;
            direction: {
                type: PropType<"horizontal" | "vertical">;
                default: string;
                validator: (v: any) => boolean;
            };
            loading: (StringConstructor | BooleanConstructor)[];
            label: StringConstructor;
            prefix: StringConstructor;
            autofocus: BooleanConstructor;
            disabled: BooleanConstructor;
            readonly: BooleanConstructor;
            placeholder: StringConstructor;
            theme: StringConstructor;
            counter: PropType<string | number | true>;
            messages: {
                type: PropType<string | string[]>;
                default: () => never[];
            };
            density: {
                type: PropType<Density>;
                default: string;
                validator: (v: any) => boolean;
            };
            variant: {
                type: PropType<"filled" | "outlined" | "plain" | "underlined" | "solo">;
                default: string;
                validator: (v: any) => boolean;
            };
            modelValue: {
                type: PropType<any>;
                default: any;
            };
            bgColor: StringConstructor;
            prependIcon: PropType<IconValue>;
            appendIcon: PropType<IconValue>;
            clearIcon: {
                type: PropType<IconValue>;
                default: string;
            };
            prependInnerIcon: PropType<IconValue>;
            'onClick:clear': PropType<EventProp<(...args: any[]) => any>>;
            'onClick:append': PropType<EventProp<(...args: any[]) => any>>;
            'onClick:prepend': PropType<EventProp<(...args: any[]) => any>>;
            'onClick:appendInner': PropType<EventProp<(...args: any[]) => any>>;
            'onClick:prependInner': PropType<EventProp<(...args: any[]) => any>>;
            focused: BooleanConstructor;
            validateOn: PropType<"input" | "blur" | "submit" | undefined>;
            errorMessages: {
                type: PropType<string | string[]>;
                default: () => never[];
            };
            maxErrors: {
                type: (StringConstructor | NumberConstructor)[];
                default: number;
            };
            rules: {
                type: PropType<ValidationRule[]>;
                default: () => never[];
            };
            hideDetails: PropType<boolean | "auto">;
            clearable: BooleanConstructor;
            persistentClear: BooleanConstructor;
            singleLine: BooleanConstructor;
            hint: StringConstructor;
            persistentHint: BooleanConstructor;
            persistentPlaceholder: BooleanConstructor;
            persistentCounter: BooleanConstructor;
            suffix: StringConstructor;
            counterValue: PropType<(value: any) => number>;
            items: {
                type: PropType<any[]>;
                default: () => never[];
            };
            itemTitle: {
                type: PropType<SelectItemKey>;
                default: string;
            };
            itemValue: {
                type: PropType<SelectItemKey>;
                default: string;
            };
            itemChildren: Omit<{
                type: PropType<SelectItemKey>;
                default: string;
            }, "type" | "default"> & {
                type: PropType<NonNullable<SelectItemKey>>;
                default: NonNullable<SelectItemKey>;
            };
            itemProps: {
                type: PropType<SelectItemKey>;
                default: string;
            };
            returnObject: BooleanConstructor;
            chips: BooleanConstructor;
            closableChips: BooleanConstructor;
            eager: BooleanConstructor;
            hideNoData: BooleanConstructor;
            hideSelected: BooleanConstructor;
            menu: BooleanConstructor;
            menuIcon: {
                type: PropType<IconValue>;
                default: string;
            };
            menuProps: {
                type: PropType<Partial<{
                    location: Anchor;
                    origin: "auto" | Anchor | "overlap";
                    transition: NonNullable<string | boolean | (vue.TransitionProps & {
                        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
                    })> | {
                        component: vue.DefineComponent<{} & {
                            target?: HTMLElement | undefined;
                        } & {
                            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                                default?: (() => vue.VNodeChild) | undefined;
                            };
                            'v-slots'?: {
                                default?: false | (() => vue.VNodeChild) | undefined;
                            } | undefined;
                        } & {
                            "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                        }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {} & {
                            target?: HTMLElement | undefined;
                        } & {
                            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                                default?: (() => vue.VNodeChild) | undefined;
                            };
                            'v-slots'?: {
                                default?: false | (() => vue.VNodeChild) | undefined;
                            } | undefined;
                        } & {
                            "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                        }, {}>;
                    };
                    zIndex: string | number;
                    eager: boolean;
                    disabled: boolean;
                    modelValue: boolean;
                    closeDelay: NonNullable<string | number>;
                    openDelay: NonNullable<string | number>;
                    activatorProps: Record<string, any>;
                    openOnClick: boolean;
                    openOnHover: boolean;
                    openOnFocus: boolean;
                    closeOnContentClick: boolean;
                    locationStrategy: NonNullable<"connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
                        updateLocation: (e: Event) => void;
                    } | undefined)>;
                    scrollStrategy: NonNullable<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition">;
                    closeOnBack: boolean;
                    contained: boolean;
                    noClickAnimation: boolean;
                    persistent: boolean;
                    scrim: NonNullable<string | boolean>;
                }> & Omit<{
                    location: Anchor;
                    origin: "auto" | Anchor | "overlap";
                    transition: NonNullable<string | boolean | (vue.TransitionProps & {
                        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
                    })> | {
                        component: vue.DefineComponent<{} & {
                            target?: HTMLElement | undefined;
                        } & {
                            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                                default?: (() => vue.VNodeChild) | undefined;
                            };
                            'v-slots'?: {
                                default?: false | (() => vue.VNodeChild) | undefined;
                            } | undefined;
                        } & {
                            "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                        }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {} & {
                            target?: HTMLElement | undefined;
                        } & {
                            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                                default?: (() => vue.VNodeChild) | undefined;
                            };
                            'v-slots'?: {
                                default?: false | (() => vue.VNodeChild) | undefined;
                            } | undefined;
                        } & {
                            "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                        }, {}>;
                    };
                    zIndex: string | number;
                    eager: boolean;
                    disabled: boolean;
                    modelValue: boolean;
                    closeDelay: NonNullable<string | number>;
                    openDelay: NonNullable<string | number>;
                    activatorProps: Record<string, any>;
                    openOnHover: boolean;
                    closeOnContentClick: boolean;
                    locationStrategy: NonNullable<"connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
                        updateLocation: (e: Event) => void;
                    } | undefined)>;
                    scrollStrategy: NonNullable<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition">;
                    closeOnBack: boolean;
                    contained: boolean;
                    noClickAnimation: boolean;
                    persistent: boolean;
                    scrim: NonNullable<string | boolean>;
                } & {
                    offset?: string | number | number[] | undefined;
                    id?: string | undefined;
                    height?: string | number | undefined;
                    width?: string | number | undefined;
                    maxHeight?: string | number | undefined;
                    maxWidth?: string | number | undefined;
                    minHeight?: string | number | undefined;
                    minWidth?: string | number | undefined;
                    theme?: string | undefined;
                    contentClass?: any;
                    activator?: string | Element | vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | undefined;
                    openOnClick?: boolean | undefined;
                    openOnFocus?: boolean | undefined;
                    contentProps?: any;
                    attach?: string | boolean | Element | undefined;
                } & {
                    $children?: {} | vue.VNodeChild | {
                        default?: ((args_0: {
                            isActive: vue.Ref<boolean>;
                        }) => vue.VNodeChild) | undefined;
                        activator?: ((args_0: {
                            isActive: boolean;
                            props: Record<string, any>;
                        }) => vue.VNodeChild) | undefined;
                    };
                    'v-slots'?: {
                        default?: false | ((args_0: {
                            isActive: vue.Ref<boolean>;
                        }) => vue.VNodeChild) | undefined;
                        activator?: false | ((args_0: {
                            isActive: boolean;
                            props: Record<string, any>;
                        }) => vue.VNodeChild) | undefined;
                    } | undefined;
                } & {
                    "v-slot:default"?: false | ((args_0: {
                        isActive: vue.Ref<boolean>;
                    }) => vue.VNodeChild) | undefined;
                    "v-slot:activator"?: false | ((args_0: {
                        isActive: boolean;
                        props: Record<string, any>;
                    }) => vue.VNodeChild) | undefined;
                } & {
                    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
                } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "location" | "origin" | "transition" | "zIndex" | "eager" | "disabled" | "modelValue" | "closeDelay" | "openDelay" | "activatorProps" | "openOnClick" | "openOnHover" | "openOnFocus" | "closeOnContentClick" | "locationStrategy" | "scrollStrategy" | "closeOnBack" | "contained" | "noClickAnimation" | "persistent" | "scrim">>;
            };
            multiple: BooleanConstructor;
            noDataText: {
                type: StringConstructor;
                default: string;
            };
            openOnClear: BooleanConstructor;
            valueComparator: {
                type: PropType<typeof deepEqual>;
                default: typeof deepEqual;
            };
        }, "multiple" | "$children" | "items" | "v-slots" | "v-slot:append" | "v-slot:prepend" | "modelValue" | "onUpdate:modelValue" | "v-slot:loader" | "v-slot:details" | "v-slot:clear" | "v-slot:label" | "v-slot:prepend-inner" | "v-slot:append-inner" | "v-slot:item" | "returnObject" | "v-slot:chip" | "v-slot:selection" | "v-slot:prepend-item" | "v-slot:append-item" | "v-slot:no-data">>> & {
            "onUpdate:menu"?: ((val: boolean) => any) | undefined;
        }, {
            menu: vue.WritableComputedRef<boolean>;
            select: (item: InternalItem) => void;
        } & Omit<any, string | number | symbol>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Omit<{
            'update:modelValue': (val: any) => boolean;
            'update:menu': (val: boolean) => true;
        }, "multiple" | "$children" | "items" | "v-slots" | "v-slot:append" | "v-slot:prepend" | "modelValue" | "update:modelValue" | "v-slot:loader" | "v-slot:details" | "v-slot:clear" | "v-slot:label" | "v-slot:prepend-inner" | "v-slot:append-inner" | "v-slot:item" | "returnObject" | "v-slot:chip" | "v-slot:selection" | "v-slot:prepend-item" | "v-slot:append-item" | "v-slot:no-data">, string, {
            reverse: boolean;
            type: string;
            error: boolean;
            active: boolean;
            direction: "horizontal" | "vertical";
            transition: NonNullable<string | boolean | (vue.TransitionProps & {
                component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
            })> | {
                component: vue.DefineComponent<{} & {
                    target?: HTMLElement | undefined;
                } & {
                    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                        default?: (() => vue.VNodeChild) | undefined;
                    };
                    'v-slots'?: {
                        default?: false | (() => vue.VNodeChild) | undefined;
                    } | undefined;
                } & {
                    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {} & {
                    target?: HTMLElement | undefined;
                } & {
                    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                        default?: (() => vue.VNodeChild) | undefined;
                    };
                    'v-slots'?: {
                        default?: false | (() => vue.VNodeChild) | undefined;
                    } | undefined;
                } & {
                    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                }, {}>;
            };
            menu: boolean;
            autofocus: boolean;
            eager: boolean;
            disabled: boolean;
            readonly: boolean;
            noDataText: string;
            messages: string | string[];
            density: Density;
            variant: "filled" | "outlined" | "plain" | "underlined" | "solo";
            clearIcon: IconValue;
            focused: boolean;
            errorMessages: string | string[];
            maxErrors: string | number;
            rules: ValidationRule[];
            clearable: boolean;
            persistentClear: boolean;
            singleLine: boolean;
            persistentHint: boolean;
            persistentPlaceholder: boolean;
            persistentCounter: boolean;
            valueComparator: typeof deepEqual;
            itemTitle: SelectItemKey;
            itemValue: SelectItemKey;
            itemChildren: NonNullable<SelectItemKey>;
            itemProps: SelectItemKey;
            chips: boolean;
            closableChips: boolean;
            hideNoData: boolean;
            hideSelected: boolean;
            menuIcon: IconValue;
            openOnClear: boolean;
        }, {}, string> & {
            beforeCreate?: ((() => void) | (() => void)[]) | undefined;
            created?: ((() => void) | (() => void)[]) | undefined;
            beforeMount?: ((() => void) | (() => void)[]) | undefined;
            mounted?: ((() => void) | (() => void)[]) | undefined;
            beforeUpdate?: ((() => void) | (() => void)[]) | undefined;
            updated?: ((() => void) | (() => void)[]) | undefined;
            activated?: ((() => void) | (() => void)[]) | undefined;
            deactivated?: ((() => void) | (() => void)[]) | undefined;
            beforeDestroy?: ((() => void) | (() => void)[]) | undefined;
            beforeUnmount?: ((() => void) | (() => void)[]) | undefined;
            destroyed?: ((() => void) | (() => void)[]) | undefined;
            unmounted?: ((() => void) | (() => void)[]) | undefined;
            renderTracked?: (((e: vue.DebuggerEvent) => void) | ((e: vue.DebuggerEvent) => void)[]) | undefined;
            renderTriggered?: (((e: vue.DebuggerEvent) => void) | ((e: vue.DebuggerEvent) => void)[]) | undefined;
            errorCaptured?: (((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null, info: string) => boolean | void) | ((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null, info: string) => boolean | void)[]) | undefined;
        };
        $forceUpdate: () => void;
        $nextTick: typeof vue.nextTick;
        $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (args_0: R, args_1: R) => any : (...args: any) => any, options?: vue.WatchOptions<boolean> | undefined): vue.WatchStopHandle;
    } & Readonly<vue.ExtractPropTypes<Omit<{
        transition: Omit<{
            type: PropType<string | boolean | (vue.TransitionProps & {
                component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
            })>;
            default: string;
            validator: (val: unknown) => boolean;
        }, "type" | "default"> & {
            type: PropType<NonNullable<string | boolean | (vue.TransitionProps & {
                component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
            })> | {
                component: vue.DefineComponent<{} & {
                    target?: HTMLElement | undefined;
                } & {
                    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                        default?: (() => vue.VNodeChild) | undefined;
                    };
                    'v-slots'?: {
                        default?: false | (() => vue.VNodeChild) | undefined;
                    } | undefined;
                } & {
                    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {} & {
                    target?: HTMLElement | undefined;
                } & {
                    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                        default?: (() => vue.VNodeChild) | undefined;
                    };
                    'v-slots'?: {
                        default?: false | (() => vue.VNodeChild) | undefined;
                    } | undefined;
                } & {
                    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                }, {}>;
            }>;
            default: NonNullable<string | boolean | (vue.TransitionProps & {
                component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
            })> | {
                component: vue.DefineComponent<{} & {
                    target?: HTMLElement | undefined;
                } & {
                    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                        default?: (() => vue.VNodeChild) | undefined;
                    };
                    'v-slots'?: {
                        default?: false | (() => vue.VNodeChild) | undefined;
                    } | undefined;
                } & {
                    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {} & {
                    target?: HTMLElement | undefined;
                } & {
                    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                        default?: (() => vue.VNodeChild) | undefined;
                    };
                    'v-slots'?: {
                        default?: false | (() => vue.VNodeChild) | undefined;
                    } | undefined;
                } & {
                    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                }, {}>;
            };
        };
        reverse: BooleanConstructor;
        type: {
            type: StringConstructor;
            default: string;
        };
        error: BooleanConstructor;
        id: StringConstructor;
        active: BooleanConstructor;
        name: StringConstructor;
        color: StringConstructor;
        direction: {
            type: PropType<"horizontal" | "vertical">;
            default: string;
            validator: (v: any) => boolean;
        };
        loading: (StringConstructor | BooleanConstructor)[];
        label: StringConstructor;
        prefix: StringConstructor;
        autofocus: BooleanConstructor;
        disabled: BooleanConstructor;
        readonly: BooleanConstructor;
        placeholder: StringConstructor;
        theme: StringConstructor;
        counter: PropType<string | number | true>;
        messages: {
            type: PropType<string | string[]>;
            default: () => never[];
        };
        density: {
            type: PropType<Density>;
            default: string;
            validator: (v: any) => boolean;
        };
        variant: {
            type: PropType<"filled" | "outlined" | "plain" | "underlined" | "solo">;
            default: string;
            validator: (v: any) => boolean;
        };
        modelValue: {
            type: PropType<any>;
            default: any;
        };
        bgColor: StringConstructor;
        prependIcon: PropType<IconValue>;
        appendIcon: PropType<IconValue>;
        clearIcon: {
            type: PropType<IconValue>;
            default: string;
        };
        prependInnerIcon: PropType<IconValue>;
        'onClick:clear': PropType<EventProp<(...args: any[]) => any>>;
        'onClick:append': PropType<EventProp<(...args: any[]) => any>>;
        'onClick:prepend': PropType<EventProp<(...args: any[]) => any>>;
        'onClick:appendInner': PropType<EventProp<(...args: any[]) => any>>;
        'onClick:prependInner': PropType<EventProp<(...args: any[]) => any>>;
        focused: BooleanConstructor;
        validateOn: PropType<"input" | "blur" | "submit" | undefined>;
        errorMessages: {
            type: PropType<string | string[]>;
            default: () => never[];
        };
        maxErrors: {
            type: (StringConstructor | NumberConstructor)[];
            default: number;
        };
        rules: {
            type: PropType<ValidationRule[]>;
            default: () => never[];
        };
        hideDetails: PropType<boolean | "auto">;
        clearable: BooleanConstructor;
        persistentClear: BooleanConstructor;
        singleLine: BooleanConstructor;
        hint: StringConstructor;
        persistentHint: BooleanConstructor;
        persistentPlaceholder: BooleanConstructor;
        persistentCounter: BooleanConstructor;
        suffix: StringConstructor;
        counterValue: PropType<(value: any) => number>;
        items: {
            type: PropType<any[]>;
            default: () => never[];
        };
        itemTitle: {
            type: PropType<SelectItemKey>;
            default: string;
        };
        itemValue: {
            type: PropType<SelectItemKey>;
            default: string;
        };
        itemChildren: Omit<{
            type: PropType<SelectItemKey>;
            default: string;
        }, "type" | "default"> & {
            type: PropType<NonNullable<SelectItemKey>>;
            default: NonNullable<SelectItemKey>;
        };
        itemProps: {
            type: PropType<SelectItemKey>;
            default: string;
        };
        returnObject: BooleanConstructor;
        chips: BooleanConstructor;
        closableChips: BooleanConstructor;
        eager: BooleanConstructor;
        hideNoData: BooleanConstructor;
        hideSelected: BooleanConstructor;
        menu: BooleanConstructor;
        menuIcon: {
            type: PropType<IconValue>;
            default: string;
        };
        menuProps: {
            type: PropType<Partial<{
                location: Anchor;
                origin: "auto" | Anchor | "overlap";
                transition: NonNullable<string | boolean | (vue.TransitionProps & {
                    component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
                })> | {
                    component: vue.DefineComponent<{} & {
                        target?: HTMLElement | undefined;
                    } & {
                        $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                            default?: (() => vue.VNodeChild) | undefined;
                        };
                        'v-slots'?: {
                            default?: false | (() => vue.VNodeChild) | undefined;
                        } | undefined;
                    } & {
                        "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                    }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {} & {
                        target?: HTMLElement | undefined;
                    } & {
                        $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                            default?: (() => vue.VNodeChild) | undefined;
                        };
                        'v-slots'?: {
                            default?: false | (() => vue.VNodeChild) | undefined;
                        } | undefined;
                    } & {
                        "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                    }, {}>;
                };
                zIndex: string | number;
                eager: boolean;
                disabled: boolean;
                modelValue: boolean;
                closeDelay: NonNullable<string | number>;
                openDelay: NonNullable<string | number>;
                activatorProps: Record<string, any>;
                openOnClick: boolean;
                openOnHover: boolean;
                openOnFocus: boolean;
                closeOnContentClick: boolean;
                locationStrategy: NonNullable<"connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
                    updateLocation: (e: Event) => void;
                } | undefined)>;
                scrollStrategy: NonNullable<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition">;
                closeOnBack: boolean;
                contained: boolean;
                noClickAnimation: boolean;
                persistent: boolean;
                scrim: NonNullable<string | boolean>;
            }> & Omit<{
                location: Anchor;
                origin: "auto" | Anchor | "overlap";
                transition: NonNullable<string | boolean | (vue.TransitionProps & {
                    component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
                })> | {
                    component: vue.DefineComponent<{} & {
                        target?: HTMLElement | undefined;
                    } & {
                        $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                            default?: (() => vue.VNodeChild) | undefined;
                        };
                        'v-slots'?: {
                            default?: false | (() => vue.VNodeChild) | undefined;
                        } | undefined;
                    } & {
                        "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                    }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {} & {
                        target?: HTMLElement | undefined;
                    } & {
                        $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                            default?: (() => vue.VNodeChild) | undefined;
                        };
                        'v-slots'?: {
                            default?: false | (() => vue.VNodeChild) | undefined;
                        } | undefined;
                    } & {
                        "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                    }, {}>;
                };
                zIndex: string | number;
                eager: boolean;
                disabled: boolean;
                modelValue: boolean;
                closeDelay: NonNullable<string | number>;
                openDelay: NonNullable<string | number>;
                activatorProps: Record<string, any>;
                openOnHover: boolean;
                closeOnContentClick: boolean;
                locationStrategy: NonNullable<"connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
                    updateLocation: (e: Event) => void;
                } | undefined)>;
                scrollStrategy: NonNullable<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition">;
                closeOnBack: boolean;
                contained: boolean;
                noClickAnimation: boolean;
                persistent: boolean;
                scrim: NonNullable<string | boolean>;
            } & {
                offset?: string | number | number[] | undefined;
                id?: string | undefined;
                height?: string | number | undefined;
                width?: string | number | undefined;
                maxHeight?: string | number | undefined;
                maxWidth?: string | number | undefined;
                minHeight?: string | number | undefined;
                minWidth?: string | number | undefined;
                theme?: string | undefined;
                contentClass?: any;
                activator?: string | Element | vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | undefined;
                openOnClick?: boolean | undefined;
                openOnFocus?: boolean | undefined;
                contentProps?: any;
                attach?: string | boolean | Element | undefined;
            } & {
                $children?: {} | vue.VNodeChild | {
                    default?: ((args_0: {
                        isActive: vue.Ref<boolean>;
                    }) => vue.VNodeChild) | undefined;
                    activator?: ((args_0: {
                        isActive: boolean;
                        props: Record<string, any>;
                    }) => vue.VNodeChild) | undefined;
                };
                'v-slots'?: {
                    default?: false | ((args_0: {
                        isActive: vue.Ref<boolean>;
                    }) => vue.VNodeChild) | undefined;
                    activator?: false | ((args_0: {
                        isActive: boolean;
                        props: Record<string, any>;
                    }) => vue.VNodeChild) | undefined;
                } | undefined;
            } & {
                "v-slot:default"?: false | ((args_0: {
                    isActive: vue.Ref<boolean>;
                }) => vue.VNodeChild) | undefined;
                "v-slot:activator"?: false | ((args_0: {
                    isActive: boolean;
                    props: Record<string, any>;
                }) => vue.VNodeChild) | undefined;
            } & {
                "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
            } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "location" | "origin" | "transition" | "zIndex" | "eager" | "disabled" | "modelValue" | "closeDelay" | "openDelay" | "activatorProps" | "openOnClick" | "openOnHover" | "openOnFocus" | "closeOnContentClick" | "locationStrategy" | "scrollStrategy" | "closeOnBack" | "contained" | "noClickAnimation" | "persistent" | "scrim">>;
        };
        multiple: BooleanConstructor;
        noDataText: {
            type: StringConstructor;
            default: string;
        };
        openOnClear: BooleanConstructor;
        valueComparator: {
            type: PropType<typeof deepEqual>;
            default: typeof deepEqual;
        };
    }, "multiple" | "$children" | "items" | "v-slots" | "v-slot:append" | "v-slot:prepend" | "modelValue" | "onUpdate:modelValue" | "v-slot:loader" | "v-slot:details" | "v-slot:clear" | "v-slot:label" | "v-slot:prepend-inner" | "v-slot:append-inner" | "v-slot:item" | "returnObject" | "v-slot:chip" | "v-slot:selection" | "v-slot:prepend-item" | "v-slot:append-item" | "v-slot:no-data">>> & {
        "onUpdate:menu"?: ((val: boolean) => any) | undefined;
    } & vue.ShallowUnwrapRef<{
        menu: vue.WritableComputedRef<boolean>;
        select: (item: InternalItem) => void;
    } & Omit<any, string | number | symbol>> & {} & vue.ComponentCustomProperties & {};
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & vue.ComponentOptionsBase<Readonly<vue.ExtractPropTypes<Omit<{
    transition: Omit<{
        type: PropType<string | boolean | (vue.TransitionProps & {
            component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
        })>;
        default: string;
        validator: (val: unknown) => boolean;
    }, "type" | "default"> & {
        type: PropType<NonNullable<string | boolean | (vue.TransitionProps & {
            component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
        })> | {
            component: vue.DefineComponent<{} & {
                target?: HTMLElement | undefined;
            } & {
                $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                    default?: (() => vue.VNodeChild) | undefined;
                };
                'v-slots'?: {
                    default?: false | (() => vue.VNodeChild) | undefined;
                } | undefined;
            } & {
                "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
            }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {} & {
                target?: HTMLElement | undefined;
            } & {
                $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                    default?: (() => vue.VNodeChild) | undefined;
                };
                'v-slots'?: {
                    default?: false | (() => vue.VNodeChild) | undefined;
                } | undefined;
            } & {
                "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
            }, {}>;
        }>;
        default: NonNullable<string | boolean | (vue.TransitionProps & {
            component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
        })> | {
            component: vue.DefineComponent<{} & {
                target?: HTMLElement | undefined;
            } & {
                $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                    default?: (() => vue.VNodeChild) | undefined;
                };
                'v-slots'?: {
                    default?: false | (() => vue.VNodeChild) | undefined;
                } | undefined;
            } & {
                "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
            }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {} & {
                target?: HTMLElement | undefined;
            } & {
                $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                    default?: (() => vue.VNodeChild) | undefined;
                };
                'v-slots'?: {
                    default?: false | (() => vue.VNodeChild) | undefined;
                } | undefined;
            } & {
                "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
            }, {}>;
        };
    };
    reverse: BooleanConstructor;
    type: {
        type: StringConstructor;
        default: string;
    };
    error: BooleanConstructor;
    id: StringConstructor;
    active: BooleanConstructor;
    name: StringConstructor;
    color: StringConstructor;
    direction: {
        type: PropType<"horizontal" | "vertical">;
        default: string;
        validator: (v: any) => boolean;
    };
    loading: (StringConstructor | BooleanConstructor)[];
    label: StringConstructor;
    prefix: StringConstructor;
    autofocus: BooleanConstructor;
    disabled: BooleanConstructor;
    readonly: BooleanConstructor;
    placeholder: StringConstructor;
    theme: StringConstructor;
    counter: PropType<string | number | true>;
    messages: {
        type: PropType<string | string[]>;
        default: () => never[];
    };
    density: {
        type: PropType<Density>;
        default: string;
        validator: (v: any) => boolean;
    };
    variant: {
        type: PropType<"filled" | "outlined" | "plain" | "underlined" | "solo">;
        default: string;
        validator: (v: any) => boolean;
    };
    modelValue: {
        type: PropType<any>;
        default: any;
    };
    bgColor: StringConstructor;
    prependIcon: PropType<IconValue>;
    appendIcon: PropType<IconValue>;
    clearIcon: {
        type: PropType<IconValue>;
        default: string;
    };
    prependInnerIcon: PropType<IconValue>;
    'onClick:clear': PropType<EventProp<(...args: any[]) => any>>;
    'onClick:append': PropType<EventProp<(...args: any[]) => any>>;
    'onClick:prepend': PropType<EventProp<(...args: any[]) => any>>;
    'onClick:appendInner': PropType<EventProp<(...args: any[]) => any>>;
    'onClick:prependInner': PropType<EventProp<(...args: any[]) => any>>;
    focused: BooleanConstructor;
    validateOn: PropType<"input" | "blur" | "submit" | undefined>;
    errorMessages: {
        type: PropType<string | string[]>;
        default: () => never[];
    };
    maxErrors: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    rules: {
        type: PropType<ValidationRule[]>;
        default: () => never[];
    };
    hideDetails: PropType<boolean | "auto">;
    clearable: BooleanConstructor;
    persistentClear: BooleanConstructor;
    singleLine: BooleanConstructor;
    hint: StringConstructor;
    persistentHint: BooleanConstructor;
    persistentPlaceholder: BooleanConstructor;
    persistentCounter: BooleanConstructor;
    suffix: StringConstructor;
    counterValue: PropType<(value: any) => number>;
    items: {
        type: PropType<any[]>;
        default: () => never[];
    };
    itemTitle: {
        type: PropType<SelectItemKey>;
        default: string;
    };
    itemValue: {
        type: PropType<SelectItemKey>;
        default: string;
    };
    itemChildren: Omit<{
        type: PropType<SelectItemKey>;
        default: string;
    }, "type" | "default"> & {
        type: PropType<NonNullable<SelectItemKey>>;
        default: NonNullable<SelectItemKey>;
    };
    itemProps: {
        type: PropType<SelectItemKey>;
        default: string;
    };
    returnObject: BooleanConstructor;
    chips: BooleanConstructor;
    closableChips: BooleanConstructor;
    eager: BooleanConstructor;
    hideNoData: BooleanConstructor;
    hideSelected: BooleanConstructor;
    menu: BooleanConstructor;
    menuIcon: {
        type: PropType<IconValue>;
        default: string;
    };
    menuProps: {
        type: PropType<Partial<{
            location: Anchor;
            origin: "auto" | Anchor | "overlap";
            transition: NonNullable<string | boolean | (vue.TransitionProps & {
                component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
            })> | {
                component: vue.DefineComponent<{} & {
                    target?: HTMLElement | undefined;
                } & {
                    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                        default?: (() => vue.VNodeChild) | undefined;
                    };
                    'v-slots'?: {
                        default?: false | (() => vue.VNodeChild) | undefined;
                    } | undefined;
                } & {
                    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {} & {
                    target?: HTMLElement | undefined;
                } & {
                    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                        default?: (() => vue.VNodeChild) | undefined;
                    };
                    'v-slots'?: {
                        default?: false | (() => vue.VNodeChild) | undefined;
                    } | undefined;
                } & {
                    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                }, {}>;
            };
            zIndex: string | number;
            eager: boolean;
            disabled: boolean;
            modelValue: boolean;
            closeDelay: NonNullable<string | number>;
            openDelay: NonNullable<string | number>;
            activatorProps: Record<string, any>;
            openOnClick: boolean;
            openOnHover: boolean;
            openOnFocus: boolean;
            closeOnContentClick: boolean;
            locationStrategy: NonNullable<"connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
                updateLocation: (e: Event) => void;
            } | undefined)>;
            scrollStrategy: NonNullable<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition">;
            closeOnBack: boolean;
            contained: boolean;
            noClickAnimation: boolean;
            persistent: boolean;
            scrim: NonNullable<string | boolean>;
        }> & Omit<{
            location: Anchor;
            origin: "auto" | Anchor | "overlap";
            transition: NonNullable<string | boolean | (vue.TransitionProps & {
                component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
            })> | {
                component: vue.DefineComponent<{} & {
                    target?: HTMLElement | undefined;
                } & {
                    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                        default?: (() => vue.VNodeChild) | undefined;
                    };
                    'v-slots'?: {
                        default?: false | (() => vue.VNodeChild) | undefined;
                    } | undefined;
                } & {
                    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {} & {
                    target?: HTMLElement | undefined;
                } & {
                    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                        default?: (() => vue.VNodeChild) | undefined;
                    };
                    'v-slots'?: {
                        default?: false | (() => vue.VNodeChild) | undefined;
                    } | undefined;
                } & {
                    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
                }, {}>;
            };
            zIndex: string | number;
            eager: boolean;
            disabled: boolean;
            modelValue: boolean;
            closeDelay: NonNullable<string | number>;
            openDelay: NonNullable<string | number>;
            activatorProps: Record<string, any>;
            openOnHover: boolean;
            closeOnContentClick: boolean;
            locationStrategy: NonNullable<"connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
                updateLocation: (e: Event) => void;
            } | undefined)>;
            scrollStrategy: NonNullable<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition">;
            closeOnBack: boolean;
            contained: boolean;
            noClickAnimation: boolean;
            persistent: boolean;
            scrim: NonNullable<string | boolean>;
        } & {
            offset?: string | number | number[] | undefined;
            id?: string | undefined;
            height?: string | number | undefined;
            width?: string | number | undefined;
            maxHeight?: string | number | undefined;
            maxWidth?: string | number | undefined;
            minHeight?: string | number | undefined;
            minWidth?: string | number | undefined;
            theme?: string | undefined;
            contentClass?: any;
            activator?: string | Element | vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | undefined;
            openOnClick?: boolean | undefined;
            openOnFocus?: boolean | undefined;
            contentProps?: any;
            attach?: string | boolean | Element | undefined;
        } & {
            $children?: {} | vue.VNodeChild | {
                default?: ((args_0: {
                    isActive: vue.Ref<boolean>;
                }) => vue.VNodeChild) | undefined;
                activator?: ((args_0: {
                    isActive: boolean;
                    props: Record<string, any>;
                }) => vue.VNodeChild) | undefined;
            };
            'v-slots'?: {
                default?: false | ((args_0: {
                    isActive: vue.Ref<boolean>;
                }) => vue.VNodeChild) | undefined;
                activator?: false | ((args_0: {
                    isActive: boolean;
                    props: Record<string, any>;
                }) => vue.VNodeChild) | undefined;
            } | undefined;
        } & {
            "v-slot:default"?: false | ((args_0: {
                isActive: vue.Ref<boolean>;
            }) => vue.VNodeChild) | undefined;
            "v-slot:activator"?: false | ((args_0: {
                isActive: boolean;
                props: Record<string, any>;
            }) => vue.VNodeChild) | undefined;
        } & {
            "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
        } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "location" | "origin" | "transition" | "zIndex" | "eager" | "disabled" | "modelValue" | "closeDelay" | "openDelay" | "activatorProps" | "openOnClick" | "openOnHover" | "openOnFocus" | "closeOnContentClick" | "locationStrategy" | "scrollStrategy" | "closeOnBack" | "contained" | "noClickAnimation" | "persistent" | "scrim">>;
    };
    multiple: BooleanConstructor;
    noDataText: {
        type: StringConstructor;
        default: string;
    };
    openOnClear: BooleanConstructor;
    valueComparator: {
        type: PropType<typeof deepEqual>;
        default: typeof deepEqual;
    };
}, "multiple" | "$children" | "items" | "v-slots" | "v-slot:append" | "v-slot:prepend" | "modelValue" | "onUpdate:modelValue" | "v-slot:loader" | "v-slot:details" | "v-slot:clear" | "v-slot:label" | "v-slot:prepend-inner" | "v-slot:append-inner" | "v-slot:item" | "returnObject" | "v-slot:chip" | "v-slot:selection" | "v-slot:prepend-item" | "v-slot:append-item" | "v-slot:no-data">>> & {
    "onUpdate:menu"?: ((val: boolean) => any) | undefined;
}, {
    menu: vue.WritableComputedRef<boolean>;
    select: (item: InternalItem) => void;
} & Omit<any, string | number | symbol>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Omit<{
    'update:modelValue': (val: any) => boolean;
    'update:menu': (val: boolean) => true;
}, "multiple" | "$children" | "items" | "v-slots" | "v-slot:append" | "v-slot:prepend" | "modelValue" | "update:modelValue" | "v-slot:loader" | "v-slot:details" | "v-slot:clear" | "v-slot:label" | "v-slot:prepend-inner" | "v-slot:append-inner" | "v-slot:item" | "returnObject" | "v-slot:chip" | "v-slot:selection" | "v-slot:prepend-item" | "v-slot:append-item" | "v-slot:no-data">, string, {
    reverse: boolean;
    type: string;
    error: boolean;
    active: boolean;
    direction: "horizontal" | "vertical";
    transition: NonNullable<string | boolean | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    })> | {
        component: vue.DefineComponent<{} & {
            target?: HTMLElement | undefined;
        } & {
            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                default?: (() => vue.VNodeChild) | undefined;
            };
            'v-slots'?: {
                default?: false | (() => vue.VNodeChild) | undefined;
            } | undefined;
        } & {
            "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
        }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {} & {
            target?: HTMLElement | undefined;
        } & {
            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                default?: (() => vue.VNodeChild) | undefined;
            };
            'v-slots'?: {
                default?: false | (() => vue.VNodeChild) | undefined;
            } | undefined;
        } & {
            "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
        }, {}>;
    };
    menu: boolean;
    autofocus: boolean;
    eager: boolean;
    disabled: boolean;
    readonly: boolean;
    noDataText: string;
    messages: string | string[];
    density: Density;
    variant: "filled" | "outlined" | "plain" | "underlined" | "solo";
    clearIcon: IconValue;
    focused: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    clearable: boolean;
    persistentClear: boolean;
    singleLine: boolean;
    persistentHint: boolean;
    persistentPlaceholder: boolean;
    persistentCounter: boolean;
    valueComparator: typeof deepEqual;
    itemTitle: SelectItemKey;
    itemValue: SelectItemKey;
    itemChildren: NonNullable<SelectItemKey>;
    itemProps: SelectItemKey;
    chips: boolean;
    closableChips: boolean;
    hideNoData: boolean;
    hideSelected: boolean;
    menuIcon: IconValue;
    openOnClear: boolean;
}, {}, string> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & (new <T_1, ReturnObject extends boolean = false, Multiple extends boolean = false, V extends Value<T_1, ReturnObject, Multiple> = Value<T_1, ReturnObject, Multiple>>() => {
    $props: {
        items?: readonly T_1[] | undefined;
        returnObject?: ReturnObject | undefined;
        multiple?: Multiple | undefined;
        modelValue?: V | undefined;
        'onUpdate:modelValue'?: ((val: V) => void) | undefined;
    } & {
        $children?: {} | vue.VNodeChild | {
            clear?: (() => vue.VNodeChild) | undefined;
            details?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            label?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
            append?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            prepend?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            loader?: ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
            'prepend-inner'?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
            'append-inner'?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
            item?: ((args_0: {
                item: InternalItem<T_1>;
                index: number;
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            chip?: ((args_0: {
                item: InternalItem<T_1>;
                index: number;
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            selection?: ((args_0: {
                item: InternalItem<T_1>;
                index: number;
            }) => vue.VNodeChild) | undefined;
            'prepend-item'?: (() => vue.VNodeChild) | undefined;
            'append-item'?: (() => vue.VNodeChild) | undefined;
            'no-data'?: (() => vue.VNodeChild) | undefined;
        };
        'v-slots'?: {
            clear?: false | (() => vue.VNodeChild) | undefined;
            details?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            label?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
            append?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            prepend?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            loader?: false | ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
            'prepend-inner'?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
            'append-inner'?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
            item?: false | ((args_0: {
                item: InternalItem<T_1>;
                index: number;
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            chip?: false | ((args_0: {
                item: InternalItem<T_1>;
                index: number;
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            selection?: false | ((args_0: {
                item: InternalItem<T_1>;
                index: number;
            }) => vue.VNodeChild) | undefined;
            'prepend-item'?: false | (() => vue.VNodeChild) | undefined;
            'append-item'?: false | (() => vue.VNodeChild) | undefined;
            'no-data'?: false | (() => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:clear"?: false | (() => vue.VNodeChild) | undefined;
        "v-slot:details"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:label"?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:append"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:prepend"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:loader"?: false | ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
        "v-slot:prepend-inner"?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:append-inner"?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:item"?: false | ((args_0: {
            item: InternalItem<T_1>;
            index: number;
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        "v-slot:chip"?: false | ((args_0: {
            item: InternalItem<T_1>;
            index: number;
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        "v-slot:selection"?: false | ((args_0: {
            item: InternalItem<T_1>;
            index: number;
        }) => vue.VNodeChild) | undefined;
        "v-slot:prepend-item"?: false | (() => vue.VNodeChild) | undefined;
        "v-slot:append-item"?: false | (() => vue.VNodeChild) | undefined;
        "v-slot:no-data"?: false | (() => vue.VNodeChild) | undefined;
    };
});
type VSelect = InstanceType<typeof VSelect>;

declare const VSheet: vue.DefineComponent<{
    tag: string;
} & {
    location?: Anchor | undefined;
    height?: string | number | undefined;
    width?: string | number | undefined;
    border?: string | number | boolean | undefined;
    color?: string | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
    position?: "fixed" | "absolute" | "static" | "relative" | "sticky" | undefined;
    elevation?: string | number | undefined;
    theme?: string | undefined;
    rounded?: string | number | boolean | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    tag: string;
} & {
    location?: Anchor | undefined;
    height?: string | number | undefined;
    width?: string | number | undefined;
    border?: string | number | boolean | undefined;
    color?: string | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
    position?: "fixed" | "absolute" | "static" | "relative" | "sticky" | undefined;
    elevation?: string | number | undefined;
    theme?: string | undefined;
    rounded?: string | number | boolean | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    tag: string;
    rounded: string | number | boolean;
}>;
type VSheet = InstanceType<typeof VSheet>;

interface SlideGroupSlot {
    next: GroupProvide['next'];
    prev: GroupProvide['prev'];
    select: GroupProvide['select'];
    isSelected: GroupProvide['isSelected'];
}
declare const VSlideGroup: vue.DefineComponent<{
    symbol: any;
    direction: string;
    disabled: boolean;
    multiple: boolean;
    tag: string;
    selectedClass: string;
    nextIcon: IconValue;
    prevIcon: IconValue;
    centerActive: boolean;
} & {
    max?: number | undefined;
    mandatory?: boolean | "force" | undefined;
    modelValue?: any;
    showArrows?: string | boolean | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: ((args_0: SlideGroupSlot) => vue.VNodeChild) | undefined;
        prev?: ((args_0: SlideGroupSlot) => vue.VNodeChild) | undefined;
        next?: ((args_0: SlideGroupSlot) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | ((args_0: SlideGroupSlot) => vue.VNodeChild) | undefined;
        prev?: false | ((args_0: SlideGroupSlot) => vue.VNodeChild) | undefined;
        next?: false | ((args_0: SlideGroupSlot) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | ((args_0: SlideGroupSlot) => vue.VNodeChild) | undefined;
    "v-slot:prev"?: false | ((args_0: SlideGroupSlot) => vue.VNodeChild) | undefined;
    "v-slot:next"?: false | ((args_0: SlideGroupSlot) => vue.VNodeChild) | undefined;
}, {
    selected: vue.Ref<readonly number[]>;
    scrollTo: (location: 'prev' | 'next') => void;
    scrollOffset: vue.Ref<number>;
    focus: (location?: 'next' | 'prev' | 'first' | 'last') => void;
}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (value: any) => boolean;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    symbol: any;
    direction: string;
    disabled: boolean;
    multiple: boolean;
    tag: string;
    selectedClass: string;
    nextIcon: IconValue;
    prevIcon: IconValue;
    centerActive: boolean;
} & {
    max?: number | undefined;
    mandatory?: boolean | "force" | undefined;
    modelValue?: any;
    showArrows?: string | boolean | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: ((args_0: SlideGroupSlot) => vue.VNodeChild) | undefined;
        prev?: ((args_0: SlideGroupSlot) => vue.VNodeChild) | undefined;
        next?: ((args_0: SlideGroupSlot) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | ((args_0: SlideGroupSlot) => vue.VNodeChild) | undefined;
        prev?: false | ((args_0: SlideGroupSlot) => vue.VNodeChild) | undefined;
        next?: false | ((args_0: SlideGroupSlot) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | ((args_0: SlideGroupSlot) => vue.VNodeChild) | undefined;
    "v-slot:prev"?: false | ((args_0: SlideGroupSlot) => vue.VNodeChild) | undefined;
    "v-slot:next"?: false | ((args_0: SlideGroupSlot) => vue.VNodeChild) | undefined;
} & {
    "onUpdate:modelValue"?: ((value: any) => any) | undefined;
}, {
    symbol: any;
    direction: string;
    disabled: boolean;
    multiple: boolean;
    tag: string;
    modelValue: any;
    selectedClass: string;
    nextIcon: IconValue;
    prevIcon: IconValue;
    centerActive: boolean;
}>;
type VSlideGroup = InstanceType<typeof VSlideGroup>;

declare const VSlideGroupItem: vue.DefineComponent<{
    disabled: boolean;
} & {
    value?: any;
    selectedClass?: string | undefined;
} & {
    $children?: vue.VNodeChild | ((args_0: {
        isSelected: UnwrapRef<GroupItemProvide['isSelected']>;
        select: GroupItemProvide['select'];
        toggle: GroupItemProvide['toggle'];
        selectedClass: UnwrapRef<GroupItemProvide['selectedClass']>;
    }) => vue.VNodeChild) | {
        default?: ((args_0: {
            isSelected: UnwrapRef<GroupItemProvide['isSelected']>;
            select: GroupItemProvide['select'];
            toggle: GroupItemProvide['toggle'];
            selectedClass: UnwrapRef<GroupItemProvide['selectedClass']>;
        }) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | ((args_0: {
            isSelected: UnwrapRef<GroupItemProvide['isSelected']>;
            select: GroupItemProvide['select'];
            toggle: GroupItemProvide['toggle'];
            selectedClass: UnwrapRef<GroupItemProvide['selectedClass']>;
        }) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | ((args_0: {
        isSelected: UnwrapRef<GroupItemProvide['isSelected']>;
        select: GroupItemProvide['select'];
        toggle: GroupItemProvide['toggle'];
        selectedClass: UnwrapRef<GroupItemProvide['selectedClass']>;
    }) => vue.VNodeChild) | undefined;
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>[] | undefined, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'group:selected': (val: {
        value: boolean;
    }) => true;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    disabled: boolean;
} & {
    value?: any;
    selectedClass?: string | undefined;
} & {
    $children?: vue.VNodeChild | ((args_0: {
        isSelected: UnwrapRef<GroupItemProvide['isSelected']>;
        select: GroupItemProvide['select'];
        toggle: GroupItemProvide['toggle'];
        selectedClass: UnwrapRef<GroupItemProvide['selectedClass']>;
    }) => vue.VNodeChild) | {
        default?: ((args_0: {
            isSelected: UnwrapRef<GroupItemProvide['isSelected']>;
            select: GroupItemProvide['select'];
            toggle: GroupItemProvide['toggle'];
            selectedClass: UnwrapRef<GroupItemProvide['selectedClass']>;
        }) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | ((args_0: {
            isSelected: UnwrapRef<GroupItemProvide['isSelected']>;
            select: GroupItemProvide['select'];
            toggle: GroupItemProvide['toggle'];
            selectedClass: UnwrapRef<GroupItemProvide['selectedClass']>;
        }) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | ((args_0: {
        isSelected: UnwrapRef<GroupItemProvide['isSelected']>;
        select: GroupItemProvide['select'];
        toggle: GroupItemProvide['toggle'];
        selectedClass: UnwrapRef<GroupItemProvide['selectedClass']>;
    }) => vue.VNodeChild) | undefined;
} & {
    "onGroup:selected"?: ((val: {
        value: boolean;
    }) => any) | undefined;
}, {
    disabled: boolean;
}>;
type VSlideGroupItem = InstanceType<typeof VSlideGroupItem>;

declare const VSlider: vue.DefineComponent<{
    reverse: boolean;
    max: string | number;
    error: boolean;
    direction: "horizontal" | "vertical";
    disabled: boolean;
    readonly: boolean;
    step: string | number;
    min: string | number;
    elevation: NonNullable<string | number>;
    messages: string | string[];
    density: Density;
    modelValue: string | number;
    focused: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    showTicks: boolean | "always";
    tickSize: string | number;
    trackSize: string | number;
    thumbSize: string | number;
} & {
    id?: string | undefined;
    name?: string | undefined;
    color?: string | undefined;
    label?: string | undefined;
    rounded?: string | number | boolean | undefined;
    prependIcon?: IconValue | undefined;
    appendIcon?: IconValue | undefined;
    'onClick:append'?: EventProp<(...args: any[]) => any> | undefined;
    'onClick:prepend'?: EventProp<(...args: any[]) => any> | undefined;
    validateOn?: "input" | "blur" | "submit" | undefined;
    validationValue?: any;
    hideDetails?: boolean | "auto" | undefined;
    trackColor?: string | undefined;
    trackFillColor?: string | undefined;
    thumbColor?: string | undefined;
    thumbLabel?: boolean | "always" | undefined;
    ticks?: number[] | Record<number, string> | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        prepend?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        append?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        details?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        'tick-label'?: (() => vue.VNodeChild) | undefined;
        'thumb-label'?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        prepend?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        append?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        details?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        'tick-label'?: false | (() => vue.VNodeChild) | undefined;
        'thumb-label'?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:prepend"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:append"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:details"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:tick-label"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:thumb-label"?: false | (() => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:focused': (value: boolean) => boolean;
    'update:modelValue': (v: number) => boolean;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    reverse: boolean;
    max: string | number;
    error: boolean;
    direction: "horizontal" | "vertical";
    disabled: boolean;
    readonly: boolean;
    step: string | number;
    min: string | number;
    elevation: NonNullable<string | number>;
    messages: string | string[];
    density: Density;
    modelValue: string | number;
    focused: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    showTicks: boolean | "always";
    tickSize: string | number;
    trackSize: string | number;
    thumbSize: string | number;
} & {
    id?: string | undefined;
    name?: string | undefined;
    color?: string | undefined;
    label?: string | undefined;
    rounded?: string | number | boolean | undefined;
    prependIcon?: IconValue | undefined;
    appendIcon?: IconValue | undefined;
    'onClick:append'?: EventProp<(...args: any[]) => any> | undefined;
    'onClick:prepend'?: EventProp<(...args: any[]) => any> | undefined;
    validateOn?: "input" | "blur" | "submit" | undefined;
    validationValue?: any;
    hideDetails?: boolean | "auto" | undefined;
    trackColor?: string | undefined;
    trackFillColor?: string | undefined;
    thumbColor?: string | undefined;
    thumbLabel?: boolean | "always" | undefined;
    ticks?: number[] | Record<number, string> | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        prepend?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        append?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        details?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        'tick-label'?: (() => vue.VNodeChild) | undefined;
        'thumb-label'?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        prepend?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        append?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        details?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        'tick-label'?: false | (() => vue.VNodeChild) | undefined;
        'thumb-label'?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:prepend"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:append"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:details"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:tick-label"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:thumb-label"?: false | (() => vue.VNodeChild) | undefined;
} & {
    "onUpdate:modelValue"?: ((v: number) => any) | undefined;
    "onUpdate:focused"?: ((value: boolean) => any) | undefined;
}, {
    reverse: boolean;
    max: string | number;
    error: boolean;
    direction: "horizontal" | "vertical";
    disabled: boolean;
    readonly: boolean;
    step: string | number;
    min: string | number;
    elevation: NonNullable<string | number>;
    messages: string | string[];
    rounded: string | number | boolean;
    density: Density;
    modelValue: string | number;
    focused: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    showTicks: boolean | "always";
    tickSize: string | number;
    trackSize: string | number;
    thumbLabel: boolean | "always" | undefined;
    thumbSize: string | number;
}>;
type VSlider = InstanceType<typeof VSlider>;

declare const VSnackbar: vue.DefineComponent<{
    absolute: boolean;
    location: Anchor;
    origin: "auto" | Anchor | "overlap";
    transition: NonNullable<string | boolean | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    })>;
    zIndex: string | number;
    eager: boolean;
    disabled: boolean;
    timeout: string | number;
    vertical: boolean;
    variant: "flat" | "text" | "elevated" | "tonal" | "outlined" | "plain";
    modelValue: boolean;
    activatorProps: Record<string, any>;
    openOnHover: boolean;
    closeOnContentClick: boolean;
    locationStrategy: "connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
        updateLocation: (e: Event) => void;
    } | undefined);
    closeOnBack: boolean;
    contained: boolean;
    multiLine: boolean;
} & {
    offset?: string | number | number[] | undefined;
    height?: string | number | undefined;
    width?: string | number | undefined;
    color?: string | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
    position?: "fixed" | "absolute" | "static" | "relative" | "sticky" | undefined;
    theme?: string | undefined;
    contentClass?: any;
    rounded?: string | number | boolean | undefined;
    activator?: string | Element | vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | undefined;
    closeDelay?: string | number | undefined;
    openDelay?: string | number | undefined;
    openOnClick?: boolean | undefined;
    openOnFocus?: boolean | undefined;
    contentProps?: any;
    attach?: string | boolean | Element | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        activator?: ((args_0: {
            isActive: boolean;
            props: Record<string, any>;
        }) => vue.VNodeChild) | undefined;
        default?: (() => vue.VNodeChild) | undefined;
        actions?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        activator?: false | ((args_0: {
            isActive: boolean;
            props: Record<string, any>;
        }) => vue.VNodeChild) | undefined;
        default?: false | (() => vue.VNodeChild) | undefined;
        actions?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:activator"?: false | ((args_0: {
        isActive: boolean;
        props: Record<string, any>;
    }) => vue.VNodeChild) | undefined;
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:actions"?: false | (() => vue.VNodeChild) | undefined;
}, Omit<Omit<{
    $: vue.ComponentInternalInstance;
    $data: {};
    $props: Partial<{
        absolute: boolean;
        location: Anchor;
        origin: "auto" | Anchor | "overlap";
        transition: string | boolean | (vue.TransitionProps & {
            component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
        });
        zIndex: string | number;
        eager: boolean;
        disabled: boolean;
        modelValue: boolean;
        activatorProps: Record<string, any>;
        openOnClick: boolean;
        openOnHover: boolean;
        openOnFocus: boolean;
        closeOnContentClick: boolean;
        locationStrategy: "connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
            updateLocation: (e: Event) => void;
        } | undefined);
        scrollStrategy: "none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition";
        closeOnBack: boolean;
        contained: boolean;
        noClickAnimation: boolean;
        persistent: boolean;
        scrim: string | boolean;
        _disableGlobalStack: boolean;
    }> & Omit<{
        absolute: boolean;
        location: Anchor;
        origin: "auto" | Anchor | "overlap";
        transition: string | boolean | (vue.TransitionProps & {
            component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
        });
        zIndex: string | number;
        eager: boolean;
        disabled: boolean;
        modelValue: boolean;
        activatorProps: Record<string, any>;
        openOnHover: boolean;
        closeOnContentClick: boolean;
        locationStrategy: "connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
            updateLocation: (e: Event) => void;
        } | undefined);
        scrollStrategy: "none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition";
        closeOnBack: boolean;
        contained: boolean;
        noClickAnimation: boolean;
        persistent: boolean;
        scrim: string | boolean;
        _disableGlobalStack: boolean;
    } & {
        offset?: string | number | number[] | undefined;
        height?: string | number | undefined;
        width?: string | number | undefined;
        maxHeight?: string | number | undefined;
        maxWidth?: string | number | undefined;
        minHeight?: string | number | undefined;
        minWidth?: string | number | undefined;
        theme?: string | undefined;
        contentClass?: any;
        activator?: string | Element | vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | undefined;
        closeDelay?: string | number | undefined;
        openDelay?: string | number | undefined;
        openOnClick?: boolean | undefined;
        openOnFocus?: boolean | undefined;
        contentProps?: any;
        attach?: string | boolean | Element | undefined;
    } & {
        $children?: {} | vue.VNodeChild | {
            default?: ((args_0: {
                isActive: vue.Ref<boolean>;
            }) => vue.VNodeChild) | undefined;
            activator?: ((args_0: {
                isActive: boolean;
                props: Record<string, any>;
            }) => vue.VNodeChild) | undefined;
        };
        'v-slots'?: {
            default?: false | ((args_0: {
                isActive: vue.Ref<boolean>;
            }) => vue.VNodeChild) | undefined;
            activator?: false | ((args_0: {
                isActive: boolean;
                props: Record<string, any>;
            }) => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:default"?: false | ((args_0: {
            isActive: vue.Ref<boolean>;
        }) => vue.VNodeChild) | undefined;
        "v-slot:activator"?: false | ((args_0: {
            isActive: boolean;
            props: Record<string, any>;
        }) => vue.VNodeChild) | undefined;
    } & {
        onAfterLeave?: (() => any) | undefined;
        "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
        "onClick:outside"?: ((e: MouseEvent) => any) | undefined;
    } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "absolute" | "location" | "origin" | "transition" | "zIndex" | "eager" | "disabled" | "modelValue" | "activatorProps" | "openOnClick" | "openOnHover" | "openOnFocus" | "closeOnContentClick" | "locationStrategy" | "scrollStrategy" | "closeOnBack" | "contained" | "noClickAnimation" | "persistent" | "scrim" | "_disableGlobalStack">;
    $attrs: {
        [x: string]: unknown;
    };
    $refs: {
        [x: string]: unknown;
    };
    $slots: Readonly<{
        [name: string]: vue.Slot | undefined;
    }>;
    $root: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null;
    $parent: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null;
    $emit: ((event: "update:modelValue", value: boolean) => void) & ((event: "click:outside", e: MouseEvent) => void) & ((event: "afterLeave") => void);
    $el: any;
    $options: vue.ComponentOptionsBase<{
        absolute: boolean;
        location: Anchor;
        origin: "auto" | Anchor | "overlap";
        transition: string | boolean | (vue.TransitionProps & {
            component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
        });
        zIndex: string | number;
        eager: boolean;
        disabled: boolean;
        modelValue: boolean;
        activatorProps: Record<string, any>;
        openOnHover: boolean;
        closeOnContentClick: boolean;
        locationStrategy: "connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
            updateLocation: (e: Event) => void;
        } | undefined);
        scrollStrategy: "none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition";
        closeOnBack: boolean;
        contained: boolean;
        noClickAnimation: boolean;
        persistent: boolean;
        scrim: string | boolean;
        _disableGlobalStack: boolean;
    } & {
        offset?: string | number | number[] | undefined;
        height?: string | number | undefined;
        width?: string | number | undefined;
        maxHeight?: string | number | undefined;
        maxWidth?: string | number | undefined;
        minHeight?: string | number | undefined;
        minWidth?: string | number | undefined;
        theme?: string | undefined;
        contentClass?: any;
        activator?: string | Element | vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | undefined;
        closeDelay?: string | number | undefined;
        openDelay?: string | number | undefined;
        openOnClick?: boolean | undefined;
        openOnFocus?: boolean | undefined;
        contentProps?: any;
        attach?: string | boolean | Element | undefined;
    } & {
        $children?: {} | vue.VNodeChild | {
            default?: ((args_0: {
                isActive: vue.Ref<boolean>;
            }) => vue.VNodeChild) | undefined;
            activator?: ((args_0: {
                isActive: boolean;
                props: Record<string, any>;
            }) => vue.VNodeChild) | undefined;
        };
        'v-slots'?: {
            default?: false | ((args_0: {
                isActive: vue.Ref<boolean>;
            }) => vue.VNodeChild) | undefined;
            activator?: false | ((args_0: {
                isActive: boolean;
                props: Record<string, any>;
            }) => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:default"?: false | ((args_0: {
            isActive: vue.Ref<boolean>;
        }) => vue.VNodeChild) | undefined;
        "v-slot:activator"?: false | ((args_0: {
            isActive: boolean;
            props: Record<string, any>;
        }) => vue.VNodeChild) | undefined;
    } & {
        onAfterLeave?: (() => any) | undefined;
        "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
        "onClick:outside"?: ((e: MouseEvent) => any) | undefined;
    }, {
        activatorEl: vue.Ref<HTMLElement | undefined>;
        animateClick: () => void;
        contentEl: vue.Ref<HTMLElement | undefined>;
        globalTop: Readonly<vue.Ref<boolean>>;
        localTop: vue.ComputedRef<boolean>;
        updateLocation: vue.Ref<((e: Event) => void) | undefined>;
    }, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
        'click:outside': (e: MouseEvent) => true;
        'update:modelValue': (value: boolean) => true;
        afterLeave: () => true;
    }, string, {
        absolute: boolean;
        location: Anchor;
        origin: "auto" | Anchor | "overlap";
        transition: string | boolean | (vue.TransitionProps & {
            component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
        });
        zIndex: string | number;
        eager: boolean;
        disabled: boolean;
        modelValue: boolean;
        activatorProps: Record<string, any>;
        openOnClick: boolean;
        openOnHover: boolean;
        openOnFocus: boolean;
        closeOnContentClick: boolean;
        locationStrategy: "connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
            updateLocation: (e: Event) => void;
        } | undefined);
        scrollStrategy: "none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition";
        closeOnBack: boolean;
        contained: boolean;
        noClickAnimation: boolean;
        persistent: boolean;
        scrim: string | boolean;
        _disableGlobalStack: boolean;
    }, {}, string> & {
        beforeCreate?: ((() => void) | (() => void)[]) | undefined;
        created?: ((() => void) | (() => void)[]) | undefined;
        beforeMount?: ((() => void) | (() => void)[]) | undefined;
        mounted?: ((() => void) | (() => void)[]) | undefined;
        beforeUpdate?: ((() => void) | (() => void)[]) | undefined;
        updated?: ((() => void) | (() => void)[]) | undefined;
        activated?: ((() => void) | (() => void)[]) | undefined;
        deactivated?: ((() => void) | (() => void)[]) | undefined;
        beforeDestroy?: ((() => void) | (() => void)[]) | undefined;
        beforeUnmount?: ((() => void) | (() => void)[]) | undefined;
        destroyed?: ((() => void) | (() => void)[]) | undefined;
        unmounted?: ((() => void) | (() => void)[]) | undefined;
        renderTracked?: (((e: vue.DebuggerEvent) => void) | ((e: vue.DebuggerEvent) => void)[]) | undefined;
        renderTriggered?: (((e: vue.DebuggerEvent) => void) | ((e: vue.DebuggerEvent) => void)[]) | undefined;
        errorCaptured?: (((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null, info: string) => boolean | void) | ((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null, info: string) => boolean | void)[]) | undefined;
    };
    $forceUpdate: () => void;
    $nextTick: typeof vue.nextTick;
    $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (args_0: R, args_1: R) => any : (...args: any) => any, options?: vue.WatchOptions<boolean> | undefined): vue.WatchStopHandle;
} & {
    absolute: boolean;
    location: Anchor;
    origin: "auto" | Anchor | "overlap";
    transition: string | boolean | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    });
    zIndex: string | number;
    eager: boolean;
    disabled: boolean;
    modelValue: boolean;
    activatorProps: Record<string, any>;
    openOnHover: boolean;
    closeOnContentClick: boolean;
    locationStrategy: "connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
        updateLocation: (e: Event) => void;
    } | undefined);
    scrollStrategy: "none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition";
    closeOnBack: boolean;
    contained: boolean;
    noClickAnimation: boolean;
    persistent: boolean;
    scrim: string | boolean;
    _disableGlobalStack: boolean;
} & {
    offset?: string | number | number[] | undefined;
    height?: string | number | undefined;
    width?: string | number | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
    theme?: string | undefined;
    contentClass?: any;
    activator?: string | Element | vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | undefined;
    closeDelay?: string | number | undefined;
    openDelay?: string | number | undefined;
    openOnClick?: boolean | undefined;
    openOnFocus?: boolean | undefined;
    contentProps?: any;
    attach?: string | boolean | Element | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: ((args_0: {
            isActive: vue.Ref<boolean>;
        }) => vue.VNodeChild) | undefined;
        activator?: ((args_0: {
            isActive: boolean;
            props: Record<string, any>;
        }) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | ((args_0: {
            isActive: vue.Ref<boolean>;
        }) => vue.VNodeChild) | undefined;
        activator?: false | ((args_0: {
            isActive: boolean;
            props: Record<string, any>;
        }) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | ((args_0: {
        isActive: vue.Ref<boolean>;
    }) => vue.VNodeChild) | undefined;
    "v-slot:activator"?: false | ((args_0: {
        isActive: boolean;
        props: Record<string, any>;
    }) => vue.VNodeChild) | undefined;
} & {
    onAfterLeave?: (() => any) | undefined;
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
    "onClick:outside"?: ((e: MouseEvent) => any) | undefined;
} & vue.ShallowUnwrapRef<{
    activatorEl: vue.Ref<HTMLElement | undefined>;
    animateClick: () => void;
    contentEl: vue.Ref<HTMLElement | undefined>;
    globalTop: Readonly<vue.Ref<boolean>>;
    localTop: vue.ComputedRef<boolean>;
    updateLocation: vue.Ref<((e: Event) => void) | undefined>;
}> & {} & vue.ComponentCustomProperties & {}, "offset" | "height" | "width" | "maxHeight" | "maxWidth" | "minHeight" | "minWidth" | "onAfterLeave" | "$children" | "theme" | "v-slot:default" | "v-slots" | "contentClass" | keyof vue.VNodeProps | keyof vue.AllowedComponentProps | "onUpdate:modelValue" | "activator" | "v-slot:activator" | "closeDelay" | "openDelay" | "contentProps" | "attach" | "onClick:outside" | ("absolute" | "location" | "origin" | "transition" | "zIndex" | "eager" | "disabled" | "modelValue" | "activatorProps" | "openOnClick" | "openOnHover" | "openOnFocus" | "closeOnContentClick" | "locationStrategy" | "scrollStrategy" | "closeOnBack" | "contained" | "noClickAnimation" | "persistent" | "scrim" | "_disableGlobalStack")>, `$${any}`>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (v: boolean) => boolean;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    absolute: boolean;
    location: Anchor;
    origin: "auto" | Anchor | "overlap";
    transition: NonNullable<string | boolean | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    })>;
    zIndex: string | number;
    eager: boolean;
    disabled: boolean;
    timeout: string | number;
    vertical: boolean;
    variant: "flat" | "text" | "elevated" | "tonal" | "outlined" | "plain";
    modelValue: boolean;
    activatorProps: Record<string, any>;
    openOnHover: boolean;
    closeOnContentClick: boolean;
    locationStrategy: "connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
        updateLocation: (e: Event) => void;
    } | undefined);
    closeOnBack: boolean;
    contained: boolean;
    multiLine: boolean;
} & {
    offset?: string | number | number[] | undefined;
    height?: string | number | undefined;
    width?: string | number | undefined;
    color?: string | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
    position?: "fixed" | "absolute" | "static" | "relative" | "sticky" | undefined;
    theme?: string | undefined;
    contentClass?: any;
    rounded?: string | number | boolean | undefined;
    activator?: string | Element | vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | undefined;
    closeDelay?: string | number | undefined;
    openDelay?: string | number | undefined;
    openOnClick?: boolean | undefined;
    openOnFocus?: boolean | undefined;
    contentProps?: any;
    attach?: string | boolean | Element | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        activator?: ((args_0: {
            isActive: boolean;
            props: Record<string, any>;
        }) => vue.VNodeChild) | undefined;
        default?: (() => vue.VNodeChild) | undefined;
        actions?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        activator?: false | ((args_0: {
            isActive: boolean;
            props: Record<string, any>;
        }) => vue.VNodeChild) | undefined;
        default?: false | (() => vue.VNodeChild) | undefined;
        actions?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:activator"?: false | ((args_0: {
        isActive: boolean;
        props: Record<string, any>;
    }) => vue.VNodeChild) | undefined;
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:actions"?: false | (() => vue.VNodeChild) | undefined;
} & {
    "onUpdate:modelValue"?: ((v: boolean) => any) | undefined;
}, {
    absolute: boolean;
    location: Anchor;
    origin: "auto" | Anchor | "overlap";
    transition: NonNullable<string | boolean | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    })>;
    zIndex: string | number;
    eager: boolean;
    disabled: boolean;
    timeout: string | number;
    vertical: boolean;
    rounded: string | number | boolean;
    variant: "flat" | "text" | "elevated" | "tonal" | "outlined" | "plain";
    modelValue: boolean;
    activatorProps: Record<string, any>;
    openOnClick: boolean;
    openOnHover: boolean;
    openOnFocus: boolean;
    closeOnContentClick: boolean;
    locationStrategy: "connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
        updateLocation: (e: Event) => void;
    } | undefined);
    closeOnBack: boolean;
    contained: boolean;
    multiLine: boolean;
}>;
type VSnackbar = InstanceType<typeof VSnackbar>;

declare const VSwitch: vue.DefineComponent<{
    flat: boolean;
    inline: boolean;
    error: boolean;
    direction: "horizontal" | "vertical";
    inset: boolean;
    loading: string | boolean;
    disabled: boolean;
    multiple: boolean | null;
    readonly: boolean;
    indeterminate: boolean;
    messages: string | string[];
    density: Density;
    ripple: boolean;
    focused: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    valueComparator: typeof deepEqual;
} & {
    type?: string | undefined;
    id?: string | undefined;
    name?: string | undefined;
    color?: string | undefined;
    value?: any;
    label?: string | undefined;
    theme?: string | undefined;
    modelValue?: any;
    prependIcon?: IconValue | undefined;
    appendIcon?: IconValue | undefined;
    'onClick:append'?: EventProp<(...args: any[]) => any> | undefined;
    'onClick:prepend'?: EventProp<(...args: any[]) => any> | undefined;
    validateOn?: "input" | "blur" | "submit" | undefined;
    validationValue?: any;
    hideDetails?: boolean | "auto" | undefined;
    falseIcon?: IconValue | undefined;
    trueIcon?: IconValue | undefined;
    trueValue?: any;
    falseValue?: any;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: (((args_0: VInputSlot) => vue.VNodeChild) & (() => vue.VNodeChild)) | undefined;
        prepend?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        append?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        details?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        label?: ((args_0: {
            label: string | undefined;
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        input?: ((args_0: SelectionControlSlot) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (((args_0: VInputSlot) => vue.VNodeChild) & (() => vue.VNodeChild)) | undefined;
        prepend?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        append?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        details?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        label?: false | ((args_0: {
            label: string | undefined;
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        input?: false | ((args_0: SelectionControlSlot) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (((args_0: VInputSlot) => vue.VNodeChild) & (() => vue.VNodeChild)) | undefined;
    "v-slot:prepend"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:append"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:details"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:label"?: false | ((args_0: {
        label: string | undefined;
        props: Record<string, unknown>;
    }) => vue.VNodeChild) | undefined;
    "v-slot:input"?: false | ((args_0: SelectionControlSlot) => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:focused': (focused: boolean) => boolean;
    'update:modelValue': () => boolean;
    'update:indeterminate': (val: boolean) => boolean;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    flat: boolean;
    inline: boolean;
    error: boolean;
    direction: "horizontal" | "vertical";
    inset: boolean;
    loading: string | boolean;
    disabled: boolean;
    multiple: boolean | null;
    readonly: boolean;
    indeterminate: boolean;
    messages: string | string[];
    density: Density;
    ripple: boolean;
    focused: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    valueComparator: typeof deepEqual;
} & {
    type?: string | undefined;
    id?: string | undefined;
    name?: string | undefined;
    color?: string | undefined;
    value?: any;
    label?: string | undefined;
    theme?: string | undefined;
    modelValue?: any;
    prependIcon?: IconValue | undefined;
    appendIcon?: IconValue | undefined;
    'onClick:append'?: EventProp<(...args: any[]) => any> | undefined;
    'onClick:prepend'?: EventProp<(...args: any[]) => any> | undefined;
    validateOn?: "input" | "blur" | "submit" | undefined;
    validationValue?: any;
    hideDetails?: boolean | "auto" | undefined;
    falseIcon?: IconValue | undefined;
    trueIcon?: IconValue | undefined;
    trueValue?: any;
    falseValue?: any;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: (((args_0: VInputSlot) => vue.VNodeChild) & (() => vue.VNodeChild)) | undefined;
        prepend?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        append?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        details?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        label?: ((args_0: {
            label: string | undefined;
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        input?: ((args_0: SelectionControlSlot) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (((args_0: VInputSlot) => vue.VNodeChild) & (() => vue.VNodeChild)) | undefined;
        prepend?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        append?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        details?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        label?: false | ((args_0: {
            label: string | undefined;
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        input?: false | ((args_0: SelectionControlSlot) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (((args_0: VInputSlot) => vue.VNodeChild) & (() => vue.VNodeChild)) | undefined;
    "v-slot:prepend"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:append"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:details"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:label"?: false | ((args_0: {
        label: string | undefined;
        props: Record<string, unknown>;
    }) => vue.VNodeChild) | undefined;
    "v-slot:input"?: false | ((args_0: SelectionControlSlot) => vue.VNodeChild) | undefined;
} & {
    "onUpdate:modelValue"?: (() => any) | undefined;
    "onUpdate:focused"?: ((focused: boolean) => any) | undefined;
    "onUpdate:indeterminate"?: ((val: boolean) => any) | undefined;
}, {
    flat: boolean;
    inline: boolean;
    error: boolean;
    direction: "horizontal" | "vertical";
    inset: boolean;
    loading: string | boolean;
    disabled: boolean;
    multiple: boolean | null;
    readonly: boolean;
    indeterminate: boolean;
    messages: string | string[];
    density: Density;
    ripple: boolean;
    focused: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    valueComparator: typeof deepEqual;
}>;
type VSwitch = InstanceType<typeof VSwitch>;

declare const VSystemBar: vue.DefineComponent<{
    window: boolean;
    absolute: boolean;
    order: string | number;
    tag: string;
} & {
    height?: string | number | undefined;
    name?: string | undefined;
    color?: string | undefined;
    elevation?: string | number | undefined;
    theme?: string | undefined;
    rounded?: string | number | boolean | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    window: boolean;
    absolute: boolean;
    order: string | number;
    tag: string;
} & {
    height?: string | number | undefined;
    name?: string | undefined;
    color?: string | undefined;
    elevation?: string | number | undefined;
    theme?: string | undefined;
    rounded?: string | number | boolean | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    window: boolean;
    absolute: boolean;
    order: string | number;
    tag: string;
    rounded: string | number | boolean;
}>;
type VSystemBar = InstanceType<typeof VSystemBar>;

type TabItem = string | Record<string, any>;
declare const VTabs: vue.DefineComponent<{
    direction: "horizontal" | "vertical";
    tag: string;
    mandatory: boolean | "force";
    items: TabItem[];
    density: Density;
    stacked: boolean;
    grow: boolean;
    hideSlider: boolean;
    fixedTabs: boolean;
    alignTabs: "center" | "end" | "start" | "title";
} & {
    height?: string | number | undefined;
    color?: string | undefined;
    modelValue?: any;
    bgColor?: string | undefined;
    sliderColor?: string | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (v: unknown) => boolean;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    direction: "horizontal" | "vertical";
    tag: string;
    mandatory: boolean | "force";
    items: TabItem[];
    density: Density;
    stacked: boolean;
    grow: boolean;
    hideSlider: boolean;
    fixedTabs: boolean;
    alignTabs: "center" | "end" | "start" | "title";
} & {
    height?: string | number | undefined;
    color?: string | undefined;
    modelValue?: any;
    bgColor?: string | undefined;
    sliderColor?: string | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
} & {
    "onUpdate:modelValue"?: ((v: unknown) => any) | undefined;
}, {
    height: string | number;
    direction: "horizontal" | "vertical";
    tag: string;
    mandatory: boolean | "force";
    items: TabItem[];
    density: Density;
    stacked: boolean;
    grow: boolean;
    hideSlider: boolean;
    fixedTabs: boolean;
    alignTabs: "center" | "end" | "start" | "title";
}>;
type VTabs = InstanceType<typeof VTabs>;

declare const VTab: vue.DefineComponent<{
    replace: boolean;
    fixed: boolean;
    exact: boolean;
    direction: "horizontal" | "vertical";
    disabled: boolean;
    tag: string;
    selectedClass: string;
    stacked: boolean;
    ripple: boolean;
    hideSlider: boolean;
} & {
    color?: string | undefined;
    value?: any;
    title?: string | undefined;
    icon?: boolean | IconValue | undefined;
    href?: string | undefined;
    to?: vue_router.RouteLocationRaw | undefined;
    theme?: string | undefined;
    prependIcon?: IconValue | undefined;
    appendIcon?: IconValue | undefined;
    sliderColor?: string | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    replace: boolean;
    fixed: boolean;
    exact: boolean;
    direction: "horizontal" | "vertical";
    disabled: boolean;
    tag: string;
    selectedClass: string;
    stacked: boolean;
    ripple: boolean;
    hideSlider: boolean;
} & {
    color?: string | undefined;
    value?: any;
    title?: string | undefined;
    icon?: boolean | IconValue | undefined;
    href?: string | undefined;
    to?: vue_router.RouteLocationRaw | undefined;
    theme?: string | undefined;
    prependIcon?: IconValue | undefined;
    appendIcon?: IconValue | undefined;
    sliderColor?: string | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    replace: boolean;
    fixed: boolean;
    exact: boolean;
    direction: "horizontal" | "vertical";
    disabled: boolean;
    tag: string;
    selectedClass: string;
    stacked: boolean;
    ripple: boolean;
    hideSlider: boolean;
}>;
type VTab = InstanceType<typeof VTab>;

declare const VTable: vue.DefineComponent<{
    tag: string;
    density: Density;
    hover: boolean;
    fixedHeader: boolean;
    fixedFooter: boolean;
} & {
    height?: string | number | undefined;
    theme?: string | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: (() => vue.VNodeChild) | undefined;
        top?: (() => vue.VNodeChild) | undefined;
        bottom?: (() => vue.VNodeChild) | undefined;
        wrapper?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
        top?: false | (() => vue.VNodeChild) | undefined;
        bottom?: false | (() => vue.VNodeChild) | undefined;
        wrapper?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:top"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:bottom"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:wrapper"?: false | (() => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    tag: string;
    density: Density;
    hover: boolean;
    fixedHeader: boolean;
    fixedFooter: boolean;
} & {
    height?: string | number | undefined;
    theme?: string | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: (() => vue.VNodeChild) | undefined;
        top?: (() => vue.VNodeChild) | undefined;
        bottom?: (() => vue.VNodeChild) | undefined;
        wrapper?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
        top?: false | (() => vue.VNodeChild) | undefined;
        bottom?: false | (() => vue.VNodeChild) | undefined;
        wrapper?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:top"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:bottom"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:wrapper"?: false | (() => vue.VNodeChild) | undefined;
}, {
    tag: string;
    density: Density;
    hover: boolean;
    fixedHeader: boolean;
    fixedFooter: boolean;
}>;
type VTable = InstanceType<typeof VTable>;

declare const VTextarea: vue.DefineComponent<{
    reverse: boolean;
    error: boolean;
    active: boolean;
    direction: "horizontal" | "vertical";
    autofocus: boolean;
    disabled: boolean;
    readonly: boolean;
    messages: string | string[];
    density: Density;
    variant: "filled" | "outlined" | "plain" | "underlined" | "solo";
    clearIcon: IconValue;
    focused: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    clearable: boolean;
    dirty: boolean;
    persistentClear: boolean;
    singleLine: boolean;
    persistentHint: boolean;
    persistentPlaceholder: boolean;
    persistentCounter: boolean;
    autoGrow: boolean;
    noResize: boolean;
    rows: string | number;
} & {
    id?: string | undefined;
    name?: string | undefined;
    color?: string | undefined;
    loading?: string | boolean | undefined;
    label?: string | undefined;
    prefix?: string | undefined;
    placeholder?: string | undefined;
    theme?: string | undefined;
    counter?: string | number | true | undefined;
    modelValue?: any;
    bgColor?: string | undefined;
    prependIcon?: IconValue | undefined;
    appendIcon?: IconValue | undefined;
    appendInnerIcon?: IconValue | undefined;
    prependInnerIcon?: IconValue | undefined;
    'onClick:clear'?: EventProp<(...args: any[]) => any> | undefined;
    'onClick:append'?: EventProp<(...args: any[]) => any> | undefined;
    'onClick:prepend'?: EventProp<(...args: any[]) => any> | undefined;
    'onClick:appendInner'?: EventProp<(...args: any[]) => any> | undefined;
    'onClick:prependInner'?: EventProp<(...args: any[]) => any> | undefined;
    validateOn?: "input" | "blur" | "submit" | undefined;
    validationValue?: any;
    hideDetails?: boolean | "auto" | undefined;
    hint?: string | undefined;
    suffix?: string | undefined;
    counterValue?: ((value: any) => number) | undefined;
    maxRows?: string | number | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        clear?: (() => vue.VNodeChild) | undefined;
        details?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        label?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        append?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        prepend?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        loader?: ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
        'prepend-inner'?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        'append-inner'?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        clear?: false | (() => vue.VNodeChild) | undefined;
        details?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        label?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        append?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        prepend?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        loader?: false | ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
        'prepend-inner'?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        'append-inner'?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:clear"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:details"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:label"?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:append"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:prepend"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:loader"?: false | ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
    "v-slot:prepend-inner"?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:append-inner"?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
}, Omit<Omit<{
    $: vue.ComponentInternalInstance;
    $data: {};
    $props: Partial<{
        error: boolean;
        direction: "horizontal" | "vertical";
        disabled: boolean;
        readonly: boolean;
        messages: string | string[];
        density: Density;
        focused: boolean;
        errorMessages: string | string[];
        maxErrors: string | number;
        rules: ValidationRule[];
    }> & Omit<{
        error: boolean;
        direction: "horizontal" | "vertical";
        disabled: boolean;
        readonly: boolean;
        messages: string | string[];
        density: Density;
        focused: boolean;
        errorMessages: string | string[];
        maxErrors: string | number;
        rules: ValidationRule[];
    } & {
        id?: string | undefined;
        name?: string | undefined;
        label?: string | undefined;
        modelValue?: any;
        prependIcon?: IconValue | undefined;
        appendIcon?: IconValue | undefined;
        'onClick:append'?: EventProp<(...args: any[]) => any> | undefined;
        'onClick:prepend'?: EventProp<(...args: any[]) => any> | undefined;
        validateOn?: "input" | "blur" | "submit" | undefined;
        validationValue?: any;
        hideDetails?: boolean | "auto" | undefined;
    } & {
        $children?: {} | vue.VNodeChild | {
            default?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            prepend?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            append?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            details?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        };
        'v-slots'?: {
            default?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            prepend?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            append?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            details?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:default"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:prepend"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:append"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:details"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    } & {
        "onUpdate:modelValue"?: ((val: any) => any) | undefined;
    } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "error" | "direction" | "disabled" | "readonly" | "messages" | "density" | "focused" | "errorMessages" | "maxErrors" | "rules">;
    $attrs: {
        [x: string]: unknown;
    };
    $refs: {
        [x: string]: unknown;
    };
    $slots: Readonly<{
        [name: string]: vue.Slot | undefined;
    }>;
    $root: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null;
    $parent: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null;
    $emit: (event: "update:modelValue", val: any) => void;
    $el: any;
    $options: vue.ComponentOptionsBase<{
        error: boolean;
        direction: "horizontal" | "vertical";
        disabled: boolean;
        readonly: boolean;
        messages: string | string[];
        density: Density;
        focused: boolean;
        errorMessages: string | string[];
        maxErrors: string | number;
        rules: ValidationRule[];
    } & {
        id?: string | undefined;
        name?: string | undefined;
        label?: string | undefined;
        modelValue?: any;
        prependIcon?: IconValue | undefined;
        appendIcon?: IconValue | undefined;
        'onClick:append'?: EventProp<(...args: any[]) => any> | undefined;
        'onClick:prepend'?: EventProp<(...args: any[]) => any> | undefined;
        validateOn?: "input" | "blur" | "submit" | undefined;
        validationValue?: any;
        hideDetails?: boolean | "auto" | undefined;
    } & {
        $children?: {} | vue.VNodeChild | {
            default?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            prepend?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            append?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            details?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        };
        'v-slots'?: {
            default?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            prepend?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            append?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            details?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:default"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:prepend"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:append"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:details"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    } & {
        "onUpdate:modelValue"?: ((val: any) => any) | undefined;
    }, {
        reset: () => void;
        resetValidation: () => void;
        validate: () => Promise<string[]>;
    }, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
        'update:modelValue': (val: any) => true;
    }, string, {
        error: boolean;
        direction: "horizontal" | "vertical";
        disabled: boolean;
        readonly: boolean;
        messages: string | string[];
        density: Density;
        focused: boolean;
        errorMessages: string | string[];
        maxErrors: string | number;
        rules: ValidationRule[];
    }, {}, string> & {
        beforeCreate?: ((() => void) | (() => void)[]) | undefined;
        created?: ((() => void) | (() => void)[]) | undefined;
        beforeMount?: ((() => void) | (() => void)[]) | undefined;
        mounted?: ((() => void) | (() => void)[]) | undefined;
        beforeUpdate?: ((() => void) | (() => void)[]) | undefined;
        updated?: ((() => void) | (() => void)[]) | undefined;
        activated?: ((() => void) | (() => void)[]) | undefined;
        deactivated?: ((() => void) | (() => void)[]) | undefined;
        beforeDestroy?: ((() => void) | (() => void)[]) | undefined;
        beforeUnmount?: ((() => void) | (() => void)[]) | undefined;
        destroyed?: ((() => void) | (() => void)[]) | undefined;
        unmounted?: ((() => void) | (() => void)[]) | undefined;
        renderTracked?: (((e: vue.DebuggerEvent) => void) | ((e: vue.DebuggerEvent) => void)[]) | undefined;
        renderTriggered?: (((e: vue.DebuggerEvent) => void) | ((e: vue.DebuggerEvent) => void)[]) | undefined;
        errorCaptured?: (((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null, info: string) => boolean | void) | ((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null, info: string) => boolean | void)[]) | undefined;
    };
    $forceUpdate: () => void;
    $nextTick: typeof nextTick;
    $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (args_0: R, args_1: R) => any : (...args: any) => any, options?: vue.WatchOptions<boolean> | undefined): vue.WatchStopHandle;
} & {
    error: boolean;
    direction: "horizontal" | "vertical";
    disabled: boolean;
    readonly: boolean;
    messages: string | string[];
    density: Density;
    focused: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
} & {
    id?: string | undefined;
    name?: string | undefined;
    label?: string | undefined;
    modelValue?: any;
    prependIcon?: IconValue | undefined;
    appendIcon?: IconValue | undefined;
    'onClick:append'?: EventProp<(...args: any[]) => any> | undefined;
    'onClick:prepend'?: EventProp<(...args: any[]) => any> | undefined;
    validateOn?: "input" | "blur" | "submit" | undefined;
    validationValue?: any;
    hideDetails?: boolean | "auto" | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        prepend?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        append?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        details?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        prepend?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        append?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        details?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:prepend"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:append"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:details"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
} & {
    "onUpdate:modelValue"?: ((val: any) => any) | undefined;
} & vue.ShallowUnwrapRef<{
    reset: () => void;
    resetValidation: () => void;
    validate: () => Promise<string[]>;
}> & {} & vue.ComponentCustomProperties & {}, "id" | "name" | "label" | "$children" | "v-slot:default" | "v-slots" | keyof vue.VNodeProps | keyof vue.AllowedComponentProps | "v-slot:append" | "v-slot:prepend" | "modelValue" | "onUpdate:modelValue" | "prependIcon" | "appendIcon" | "onClick:append" | "onClick:prepend" | "validateOn" | "validationValue" | "hideDetails" | ("error" | "direction" | "disabled" | "readonly" | "messages" | "density" | "focused" | "errorMessages" | "maxErrors" | "rules") | "v-slot:details">, `$${any}`>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'click:control': (e: MouseEvent) => true;
    'mousedown:control': (e: MouseEvent) => true;
    'update:focused': (focused: boolean) => true;
    'update:modelValue': (val: string) => true;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    reverse: boolean;
    error: boolean;
    active: boolean;
    direction: "horizontal" | "vertical";
    autofocus: boolean;
    disabled: boolean;
    readonly: boolean;
    messages: string | string[];
    density: Density;
    variant: "filled" | "outlined" | "plain" | "underlined" | "solo";
    clearIcon: IconValue;
    focused: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    clearable: boolean;
    dirty: boolean;
    persistentClear: boolean;
    singleLine: boolean;
    persistentHint: boolean;
    persistentPlaceholder: boolean;
    persistentCounter: boolean;
    autoGrow: boolean;
    noResize: boolean;
    rows: string | number;
} & {
    id?: string | undefined;
    name?: string | undefined;
    color?: string | undefined;
    loading?: string | boolean | undefined;
    label?: string | undefined;
    prefix?: string | undefined;
    placeholder?: string | undefined;
    theme?: string | undefined;
    counter?: string | number | true | undefined;
    modelValue?: any;
    bgColor?: string | undefined;
    prependIcon?: IconValue | undefined;
    appendIcon?: IconValue | undefined;
    appendInnerIcon?: IconValue | undefined;
    prependInnerIcon?: IconValue | undefined;
    'onClick:clear'?: EventProp<(...args: any[]) => any> | undefined;
    'onClick:append'?: EventProp<(...args: any[]) => any> | undefined;
    'onClick:prepend'?: EventProp<(...args: any[]) => any> | undefined;
    'onClick:appendInner'?: EventProp<(...args: any[]) => any> | undefined;
    'onClick:prependInner'?: EventProp<(...args: any[]) => any> | undefined;
    validateOn?: "input" | "blur" | "submit" | undefined;
    validationValue?: any;
    hideDetails?: boolean | "auto" | undefined;
    hint?: string | undefined;
    suffix?: string | undefined;
    counterValue?: ((value: any) => number) | undefined;
    maxRows?: string | number | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        clear?: (() => vue.VNodeChild) | undefined;
        details?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        label?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        append?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        prepend?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        loader?: ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
        'prepend-inner'?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        'append-inner'?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        clear?: false | (() => vue.VNodeChild) | undefined;
        details?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        label?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        append?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        prepend?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        loader?: false | ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
        'prepend-inner'?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        'append-inner'?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:clear"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:details"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:label"?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:append"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:prepend"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:loader"?: false | ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
    "v-slot:prepend-inner"?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:append-inner"?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
} & {
    "onUpdate:modelValue"?: ((val: string) => any) | undefined;
    "onUpdate:focused"?: ((focused: boolean) => any) | undefined;
    "onClick:control"?: ((e: MouseEvent) => any) | undefined;
    "onMousedown:control"?: ((e: MouseEvent) => any) | undefined;
}, {
    reverse: boolean;
    error: boolean;
    active: boolean;
    direction: "horizontal" | "vertical";
    autofocus: boolean;
    disabled: boolean;
    readonly: boolean;
    messages: string | string[];
    density: Density;
    variant: "filled" | "outlined" | "plain" | "underlined" | "solo";
    clearIcon: IconValue;
    focused: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    clearable: boolean;
    dirty: boolean;
    persistentClear: boolean;
    singleLine: boolean;
    persistentHint: boolean;
    persistentPlaceholder: boolean;
    persistentCounter: boolean;
    autoGrow: boolean;
    noResize: boolean;
    rows: string | number;
}>;
type VTextarea = InstanceType<typeof VTextarea>;

declare const VTextField: vue.DefineComponent<{
    reverse: boolean;
    type: string;
    error: boolean;
    active: boolean;
    direction: "horizontal" | "vertical";
    autofocus: boolean;
    disabled: boolean;
    readonly: boolean;
    messages: string | string[];
    density: Density;
    variant: "filled" | "outlined" | "plain" | "underlined" | "solo";
    clearIcon: IconValue;
    focused: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    clearable: boolean;
    dirty: boolean;
    persistentClear: boolean;
    singleLine: boolean;
    persistentHint: boolean;
    persistentPlaceholder: boolean;
    persistentCounter: boolean;
} & {
    id?: string | undefined;
    name?: string | undefined;
    color?: string | undefined;
    loading?: string | boolean | undefined;
    label?: string | undefined;
    prefix?: string | undefined;
    placeholder?: string | undefined;
    theme?: string | undefined;
    counter?: string | number | true | undefined;
    modelValue?: any;
    bgColor?: string | undefined;
    prependIcon?: IconValue | undefined;
    appendIcon?: IconValue | undefined;
    appendInnerIcon?: IconValue | undefined;
    prependInnerIcon?: IconValue | undefined;
    'onClick:clear'?: EventProp<(...args: any[]) => any> | undefined;
    'onClick:append'?: EventProp<(...args: any[]) => any> | undefined;
    'onClick:prepend'?: EventProp<(...args: any[]) => any> | undefined;
    'onClick:appendInner'?: EventProp<(...args: any[]) => any> | undefined;
    'onClick:prependInner'?: EventProp<(...args: any[]) => any> | undefined;
    validateOn?: "input" | "blur" | "submit" | undefined;
    validationValue?: any;
    hideDetails?: boolean | "auto" | undefined;
    hint?: string | undefined;
    suffix?: string | undefined;
    counterValue?: ((value: any) => number) | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        clear?: (() => vue.VNodeChild) | undefined;
        details?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        label?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        append?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        prepend?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        loader?: ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
        'prepend-inner'?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        'append-inner'?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        clear?: false | (() => vue.VNodeChild) | undefined;
        details?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        label?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        append?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        prepend?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        loader?: false | ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
        'prepend-inner'?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        'append-inner'?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:clear"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:details"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:label"?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:append"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:prepend"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:loader"?: false | ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
    "v-slot:prepend-inner"?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:append-inner"?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, Omit<Omit<{
    $: vue.ComponentInternalInstance;
    $data: {};
    $props: Partial<{
        error: boolean;
        direction: "horizontal" | "vertical";
        disabled: boolean;
        readonly: boolean;
        messages: string | string[];
        density: Density;
        focused: boolean;
        errorMessages: string | string[];
        maxErrors: string | number;
        rules: ValidationRule[];
    }> & Omit<{
        error: boolean;
        direction: "horizontal" | "vertical";
        disabled: boolean;
        readonly: boolean;
        messages: string | string[];
        density: Density;
        focused: boolean;
        errorMessages: string | string[];
        maxErrors: string | number;
        rules: ValidationRule[];
    } & {
        id?: string | undefined;
        name?: string | undefined;
        label?: string | undefined;
        modelValue?: any;
        prependIcon?: IconValue | undefined;
        appendIcon?: IconValue | undefined;
        'onClick:append'?: EventProp<(...args: any[]) => any> | undefined;
        'onClick:prepend'?: EventProp<(...args: any[]) => any> | undefined;
        validateOn?: "input" | "blur" | "submit" | undefined;
        validationValue?: any;
        hideDetails?: boolean | "auto" | undefined;
    } & {
        $children?: {} | vue.VNodeChild | {
            default?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            prepend?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            append?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            details?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        };
        'v-slots'?: {
            default?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            prepend?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            append?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            details?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:default"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:prepend"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:append"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:details"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    } & {
        "onUpdate:modelValue"?: ((val: any) => any) | undefined;
    } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "error" | "direction" | "disabled" | "readonly" | "messages" | "density" | "focused" | "errorMessages" | "maxErrors" | "rules">;
    $attrs: {
        [x: string]: unknown;
    };
    $refs: {
        [x: string]: unknown;
    };
    $slots: Readonly<{
        [name: string]: vue.Slot | undefined;
    }>;
    $root: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null;
    $parent: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null;
    $emit: (event: "update:modelValue", val: any) => void;
    $el: any;
    $options: vue.ComponentOptionsBase<{
        error: boolean;
        direction: "horizontal" | "vertical";
        disabled: boolean;
        readonly: boolean;
        messages: string | string[];
        density: Density;
        focused: boolean;
        errorMessages: string | string[];
        maxErrors: string | number;
        rules: ValidationRule[];
    } & {
        id?: string | undefined;
        name?: string | undefined;
        label?: string | undefined;
        modelValue?: any;
        prependIcon?: IconValue | undefined;
        appendIcon?: IconValue | undefined;
        'onClick:append'?: EventProp<(...args: any[]) => any> | undefined;
        'onClick:prepend'?: EventProp<(...args: any[]) => any> | undefined;
        validateOn?: "input" | "blur" | "submit" | undefined;
        validationValue?: any;
        hideDetails?: boolean | "auto" | undefined;
    } & {
        $children?: {} | vue.VNodeChild | {
            default?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            prepend?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            append?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            details?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        };
        'v-slots'?: {
            default?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            prepend?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            append?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            details?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:default"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:prepend"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:append"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:details"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    } & {
        "onUpdate:modelValue"?: ((val: any) => any) | undefined;
    }, {
        reset: () => void;
        resetValidation: () => void;
        validate: () => Promise<string[]>;
    }, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
        'update:modelValue': (val: any) => true;
    }, string, {
        error: boolean;
        direction: "horizontal" | "vertical";
        disabled: boolean;
        readonly: boolean;
        messages: string | string[];
        density: Density;
        focused: boolean;
        errorMessages: string | string[];
        maxErrors: string | number;
        rules: ValidationRule[];
    }, {}, string> & {
        beforeCreate?: ((() => void) | (() => void)[]) | undefined;
        created?: ((() => void) | (() => void)[]) | undefined;
        beforeMount?: ((() => void) | (() => void)[]) | undefined;
        mounted?: ((() => void) | (() => void)[]) | undefined;
        beforeUpdate?: ((() => void) | (() => void)[]) | undefined;
        updated?: ((() => void) | (() => void)[]) | undefined;
        activated?: ((() => void) | (() => void)[]) | undefined;
        deactivated?: ((() => void) | (() => void)[]) | undefined;
        beforeDestroy?: ((() => void) | (() => void)[]) | undefined;
        beforeUnmount?: ((() => void) | (() => void)[]) | undefined;
        destroyed?: ((() => void) | (() => void)[]) | undefined;
        unmounted?: ((() => void) | (() => void)[]) | undefined;
        renderTracked?: (((e: vue.DebuggerEvent) => void) | ((e: vue.DebuggerEvent) => void)[]) | undefined;
        renderTriggered?: (((e: vue.DebuggerEvent) => void) | ((e: vue.DebuggerEvent) => void)[]) | undefined;
        errorCaptured?: (((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null, info: string) => boolean | void) | ((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null, info: string) => boolean | void)[]) | undefined;
    };
    $forceUpdate: () => void;
    $nextTick: typeof nextTick;
    $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (args_0: R, args_1: R) => any : (...args: any) => any, options?: vue.WatchOptions<boolean> | undefined): vue.WatchStopHandle;
} & {
    error: boolean;
    direction: "horizontal" | "vertical";
    disabled: boolean;
    readonly: boolean;
    messages: string | string[];
    density: Density;
    focused: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
} & {
    id?: string | undefined;
    name?: string | undefined;
    label?: string | undefined;
    modelValue?: any;
    prependIcon?: IconValue | undefined;
    appendIcon?: IconValue | undefined;
    'onClick:append'?: EventProp<(...args: any[]) => any> | undefined;
    'onClick:prepend'?: EventProp<(...args: any[]) => any> | undefined;
    validateOn?: "input" | "blur" | "submit" | undefined;
    validationValue?: any;
    hideDetails?: boolean | "auto" | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        prepend?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        append?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        details?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        prepend?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        append?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        details?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:prepend"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:append"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:details"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
} & {
    "onUpdate:modelValue"?: ((val: any) => any) | undefined;
} & vue.ShallowUnwrapRef<{
    reset: () => void;
    resetValidation: () => void;
    validate: () => Promise<string[]>;
}> & {} & vue.ComponentCustomProperties & {}, "id" | "name" | "label" | "$children" | "v-slot:default" | "v-slots" | keyof vue.VNodeProps | keyof vue.AllowedComponentProps | "v-slot:append" | "v-slot:prepend" | "modelValue" | "onUpdate:modelValue" | "prependIcon" | "appendIcon" | "onClick:append" | "onClick:prepend" | "validateOn" | "validationValue" | "hideDetails" | ("error" | "direction" | "disabled" | "readonly" | "messages" | "density" | "focused" | "errorMessages" | "maxErrors" | "rules") | "v-slot:details">, `$${any}`> & Omit<Omit<{
    $: vue.ComponentInternalInstance;
    $data: {};
    $props: Partial<{
        reverse: boolean;
        error: boolean;
        active: boolean;
        disabled: boolean;
        variant: "filled" | "outlined" | "plain" | "underlined" | "solo";
        clearIcon: IconValue;
        focused: boolean;
        clearable: boolean;
        dirty: boolean;
        persistentClear: boolean;
        singleLine: boolean;
    }> & Omit<Readonly<ExtractPropTypes<Omit<{
        loading: (StringConstructor | BooleanConstructor)[];
        theme: StringConstructor;
        appendInnerIcon: PropType<IconValue>;
        bgColor: StringConstructor;
        clearable: BooleanConstructor;
        clearIcon: {
            type: PropType<IconValue>;
            default: string;
        };
        active: BooleanConstructor;
        color: StringConstructor;
        dirty: BooleanConstructor;
        disabled: BooleanConstructor;
        error: BooleanConstructor;
        label: StringConstructor;
        persistentClear: BooleanConstructor;
        prependInnerIcon: PropType<IconValue>;
        reverse: BooleanConstructor;
        singleLine: BooleanConstructor;
        variant: {
            type: PropType<"filled" | "outlined" | "plain" | "underlined" | "solo">;
            default: string;
            validator: (v: any) => boolean;
        };
        'onClick:clear': PropType<EventProp<(...args: any[]) => any>>;
        'onClick:appendInner': PropType<EventProp<(...args: any[]) => any>>;
        'onClick:prependInner': PropType<EventProp<(...args: any[]) => any>>;
        focused: BooleanConstructor;
        id: StringConstructor;
    }, "$children" | "v-slot:default" | "v-slots" | "modelValue" | "onUpdate:modelValue" | "v-slot:loader" | "v-slot:clear" | "v-slot:label" | "v-slot:prepend-inner" | "v-slot:append-inner">>> & {
        "onUpdate:focused"?: ((focused: boolean) => any) | undefined;
    } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "reverse" | "error" | "active" | "disabled" | "variant" | "clearIcon" | "focused" | "clearable" | "dirty" | "persistentClear" | "singleLine">;
    $attrs: {
        [x: string]: unknown;
    };
    $refs: {
        [x: string]: unknown;
    };
    $slots: Readonly<{
        [name: string]: vue.Slot | undefined;
    }>;
    $root: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null;
    $parent: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null;
    $emit: (event: "update:focused", focused: boolean) => void;
    $el: any;
    $options: vue.ComponentOptionsBase<Readonly<ExtractPropTypes<Omit<{
        loading: (StringConstructor | BooleanConstructor)[];
        theme: StringConstructor;
        appendInnerIcon: PropType<IconValue>;
        bgColor: StringConstructor;
        clearable: BooleanConstructor;
        clearIcon: {
            type: PropType<IconValue>;
            default: string;
        };
        active: BooleanConstructor;
        color: StringConstructor;
        dirty: BooleanConstructor;
        disabled: BooleanConstructor;
        error: BooleanConstructor;
        label: StringConstructor;
        persistentClear: BooleanConstructor;
        prependInnerIcon: PropType<IconValue>;
        reverse: BooleanConstructor;
        singleLine: BooleanConstructor;
        variant: {
            type: PropType<"filled" | "outlined" | "plain" | "underlined" | "solo">;
            default: string;
            validator: (v: any) => boolean;
        };
        'onClick:clear': PropType<EventProp<(...args: any[]) => any>>;
        'onClick:appendInner': PropType<EventProp<(...args: any[]) => any>>;
        'onClick:prependInner': PropType<EventProp<(...args: any[]) => any>>;
        focused: BooleanConstructor;
        id: StringConstructor;
    }, "$children" | "v-slot:default" | "v-slots" | "modelValue" | "onUpdate:modelValue" | "v-slot:loader" | "v-slot:clear" | "v-slot:label" | "v-slot:prepend-inner" | "v-slot:append-inner">>> & {
        "onUpdate:focused"?: ((focused: boolean) => any) | undefined;
    }, {
        controlRef: vue.Ref<HTMLElement | undefined>;
    }, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Omit<{
        'update:focused': (focused: boolean) => true;
        'update:modelValue': (val: any) => true;
    }, "$children" | "v-slot:default" | "v-slots" | "modelValue" | "update:modelValue" | "v-slot:loader" | "v-slot:clear" | "v-slot:label" | "v-slot:prepend-inner" | "v-slot:append-inner">, string, {
        reverse: boolean;
        error: boolean;
        active: boolean;
        disabled: boolean;
        variant: "filled" | "outlined" | "plain" | "underlined" | "solo";
        clearIcon: IconValue;
        focused: boolean;
        clearable: boolean;
        dirty: boolean;
        persistentClear: boolean;
        singleLine: boolean;
    }, {}, string> & {
        beforeCreate?: ((() => void) | (() => void)[]) | undefined;
        created?: ((() => void) | (() => void)[]) | undefined;
        beforeMount?: ((() => void) | (() => void)[]) | undefined;
        mounted?: ((() => void) | (() => void)[]) | undefined;
        beforeUpdate?: ((() => void) | (() => void)[]) | undefined;
        updated?: ((() => void) | (() => void)[]) | undefined;
        activated?: ((() => void) | (() => void)[]) | undefined;
        deactivated?: ((() => void) | (() => void)[]) | undefined;
        beforeDestroy?: ((() => void) | (() => void)[]) | undefined;
        beforeUnmount?: ((() => void) | (() => void)[]) | undefined;
        destroyed?: ((() => void) | (() => void)[]) | undefined;
        unmounted?: ((() => void) | (() => void)[]) | undefined;
        renderTracked?: (((e: vue.DebuggerEvent) => void) | ((e: vue.DebuggerEvent) => void)[]) | undefined;
        renderTriggered?: (((e: vue.DebuggerEvent) => void) | ((e: vue.DebuggerEvent) => void)[]) | undefined;
        errorCaptured?: (((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null, info: string) => boolean | void) | ((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null, info: string) => boolean | void)[]) | undefined;
    };
    $forceUpdate: () => void;
    $nextTick: typeof nextTick;
    $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (args_0: R, args_1: R) => any : (...args: any) => any, options?: vue.WatchOptions<boolean> | undefined): vue.WatchStopHandle;
} & Readonly<ExtractPropTypes<Omit<{
    loading: (StringConstructor | BooleanConstructor)[];
    theme: StringConstructor;
    appendInnerIcon: PropType<IconValue>;
    bgColor: StringConstructor;
    clearable: BooleanConstructor;
    clearIcon: {
        type: PropType<IconValue>;
        default: string;
    };
    active: BooleanConstructor;
    color: StringConstructor;
    dirty: BooleanConstructor;
    disabled: BooleanConstructor;
    error: BooleanConstructor;
    label: StringConstructor;
    persistentClear: BooleanConstructor;
    prependInnerIcon: PropType<IconValue>;
    reverse: BooleanConstructor;
    singleLine: BooleanConstructor;
    variant: {
        type: PropType<"filled" | "outlined" | "plain" | "underlined" | "solo">;
        default: string;
        validator: (v: any) => boolean;
    };
    'onClick:clear': PropType<EventProp<(...args: any[]) => any>>;
    'onClick:appendInner': PropType<EventProp<(...args: any[]) => any>>;
    'onClick:prependInner': PropType<EventProp<(...args: any[]) => any>>;
    focused: BooleanConstructor;
    id: StringConstructor;
}, "$children" | "v-slot:default" | "v-slots" | "modelValue" | "onUpdate:modelValue" | "v-slot:loader" | "v-slot:clear" | "v-slot:label" | "v-slot:prepend-inner" | "v-slot:append-inner">>> & {
    "onUpdate:focused"?: ((focused: boolean) => any) | undefined;
} & vue.ShallowUnwrapRef<{
    controlRef: vue.Ref<HTMLElement | undefined>;
}> & {} & vue.ComponentCustomProperties & {} & {
    $props: {
        modelValue?: unknown;
        'onUpdate:modelValue'?: ((val: unknown) => any) | undefined;
    } & {
        $children?: {} | vue.VNodeChild | {
            clear?: (() => vue.VNodeChild) | undefined;
            'prepend-inner'?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
            'append-inner'?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
            label?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
            loader?: ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
            default?: ((args_0: VFieldSlot) => vue.VNodeChild) | undefined;
        };
        'v-slots'?: {
            clear?: false | (() => vue.VNodeChild) | undefined;
            'prepend-inner'?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
            'append-inner'?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
            label?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
            loader?: false | ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
            default?: false | ((args_0: VFieldSlot) => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:clear"?: false | (() => vue.VNodeChild) | undefined;
        "v-slot:prepend-inner"?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:append-inner"?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:label"?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:loader"?: false | ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
        "v-slot:default"?: false | ((args_0: VFieldSlot) => vue.VNodeChild) | undefined;
    };
}, "id" | "color" | "loading" | "label" | "$children" | "theme" | "v-slot:default" | "v-slots" | keyof vue.VNodeProps | keyof vue.AllowedComponentProps | "modelValue" | "onUpdate:modelValue" | "bgColor" | "v-slot:loader" | "appendInnerIcon" | "prependInnerIcon" | "onClick:clear" | "onClick:appendInner" | "onClick:prependInner" | "onUpdate:focused" | "v-slot:clear" | "v-slot:label" | "v-slot:prepend-inner" | "v-slot:append-inner" | ("reverse" | "error" | "active" | "disabled" | "variant" | "clearIcon" | "focused" | "clearable" | "dirty" | "persistentClear" | "singleLine")>, `$${any}`>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'click:control': (e: MouseEvent) => true;
    'mousedown:control': (e: MouseEvent) => true;
    'update:focused': (focused: boolean) => true;
    'update:modelValue': (val: string) => true;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    reverse: boolean;
    type: string;
    error: boolean;
    active: boolean;
    direction: "horizontal" | "vertical";
    autofocus: boolean;
    disabled: boolean;
    readonly: boolean;
    messages: string | string[];
    density: Density;
    variant: "filled" | "outlined" | "plain" | "underlined" | "solo";
    clearIcon: IconValue;
    focused: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    clearable: boolean;
    dirty: boolean;
    persistentClear: boolean;
    singleLine: boolean;
    persistentHint: boolean;
    persistentPlaceholder: boolean;
    persistentCounter: boolean;
} & {
    id?: string | undefined;
    name?: string | undefined;
    color?: string | undefined;
    loading?: string | boolean | undefined;
    label?: string | undefined;
    prefix?: string | undefined;
    placeholder?: string | undefined;
    theme?: string | undefined;
    counter?: string | number | true | undefined;
    modelValue?: any;
    bgColor?: string | undefined;
    prependIcon?: IconValue | undefined;
    appendIcon?: IconValue | undefined;
    appendInnerIcon?: IconValue | undefined;
    prependInnerIcon?: IconValue | undefined;
    'onClick:clear'?: EventProp<(...args: any[]) => any> | undefined;
    'onClick:append'?: EventProp<(...args: any[]) => any> | undefined;
    'onClick:prepend'?: EventProp<(...args: any[]) => any> | undefined;
    'onClick:appendInner'?: EventProp<(...args: any[]) => any> | undefined;
    'onClick:prependInner'?: EventProp<(...args: any[]) => any> | undefined;
    validateOn?: "input" | "blur" | "submit" | undefined;
    validationValue?: any;
    hideDetails?: boolean | "auto" | undefined;
    hint?: string | undefined;
    suffix?: string | undefined;
    counterValue?: ((value: any) => number) | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        clear?: (() => vue.VNodeChild) | undefined;
        details?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        label?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        append?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        prepend?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        loader?: ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
        'prepend-inner'?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        'append-inner'?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        clear?: false | (() => vue.VNodeChild) | undefined;
        details?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        label?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        append?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        prepend?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        loader?: false | ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
        'prepend-inner'?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        'append-inner'?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:clear"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:details"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:label"?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:append"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:prepend"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:loader"?: false | ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
    "v-slot:prepend-inner"?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:append-inner"?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
} & {
    "onUpdate:modelValue"?: ((val: string) => any) | undefined;
    "onUpdate:focused"?: ((focused: boolean) => any) | undefined;
    "onClick:control"?: ((e: MouseEvent) => any) | undefined;
    "onMousedown:control"?: ((e: MouseEvent) => any) | undefined;
}, {
    reverse: boolean;
    type: string;
    error: boolean;
    active: boolean;
    direction: "horizontal" | "vertical";
    autofocus: boolean;
    disabled: boolean;
    readonly: boolean;
    messages: string | string[];
    density: Density;
    variant: "filled" | "outlined" | "plain" | "underlined" | "solo";
    clearIcon: IconValue;
    focused: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    clearable: boolean;
    dirty: boolean;
    persistentClear: boolean;
    singleLine: boolean;
    persistentHint: boolean;
    persistentPlaceholder: boolean;
    persistentCounter: boolean;
}>;
type VTextField = InstanceType<typeof VTextField>;

declare const VThemeProvider: vue.DefineComponent<{
    tag: string;
    withBackground: boolean;
} & {
    theme?: string | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>[] | JSX.Element | undefined, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    tag: string;
    withBackground: boolean;
} & {
    theme?: string | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    tag: string;
    withBackground: boolean;
}>;
type VThemeProvider = InstanceType<typeof VThemeProvider>;

type TimelineDirection = 'vertical' | 'horizontal';
type TimelineSide = 'start' | 'end' | undefined;
type TimelineAlign = 'center' | 'start';
type TimelineTruncateLine = 'start' | 'end' | 'both' | undefined;
declare const VTimeline: vue.DefineComponent<{
    tag: string;
    justify: string;
    density: Density;
    lineInset: string | number;
    lineThickness: string | number;
} & {
    direction?: TimelineDirection | undefined;
    align?: TimelineAlign | undefined;
    side?: TimelineSide;
    theme?: string | undefined;
    lineColor?: string | undefined;
    truncateLine?: TimelineTruncateLine;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    tag: string;
    justify: string;
    density: Density;
    lineInset: string | number;
    lineThickness: string | number;
} & {
    direction?: TimelineDirection | undefined;
    align?: TimelineAlign | undefined;
    side?: TimelineSide;
    theme?: string | undefined;
    lineColor?: string | undefined;
    truncateLine?: TimelineTruncateLine;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    tag: string;
    justify: string;
    density: Density;
    lineInset: string | number;
    lineThickness: string | number;
}>;
type VTimeline = InstanceType<typeof VTimeline>;

declare const VTimelineItem: vue.DefineComponent<{
    size: string | number;
    tag: string;
    fillDot: boolean;
    hideDot: boolean;
} & {
    height?: string | number | undefined;
    width?: string | number | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
    icon?: IconValue | undefined;
    elevation?: string | number | undefined;
    rounded?: string | number | boolean | undefined;
    density?: "default" | "compact" | undefined;
    lineInset?: string | number | undefined;
    dotColor?: string | undefined;
    iconColor?: string | undefined;
    hideOpposite?: boolean | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: (() => vue.VNodeChild) | undefined;
        icon?: (() => vue.VNodeChild) | undefined;
        opposite?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
        icon?: false | (() => vue.VNodeChild) | undefined;
        opposite?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:icon"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:opposite"?: false | (() => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    size: string | number;
    tag: string;
    fillDot: boolean;
    hideDot: boolean;
} & {
    height?: string | number | undefined;
    width?: string | number | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
    icon?: IconValue | undefined;
    elevation?: string | number | undefined;
    rounded?: string | number | boolean | undefined;
    density?: "default" | "compact" | undefined;
    lineInset?: string | number | undefined;
    dotColor?: string | undefined;
    iconColor?: string | undefined;
    hideOpposite?: boolean | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: (() => vue.VNodeChild) | undefined;
        icon?: (() => vue.VNodeChild) | undefined;
        opposite?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
        icon?: false | (() => vue.VNodeChild) | undefined;
        opposite?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:icon"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:opposite"?: false | (() => vue.VNodeChild) | undefined;
}, {
    size: string | number;
    tag: string;
    rounded: string | number | boolean;
    fillDot: boolean;
    hideDot: boolean;
    hideOpposite: boolean;
}>;
type VTimelineItem = InstanceType<typeof VTimelineItem>;

declare const VToolbarTitle: vue.DefineComponent<{
    tag: string;
} & {
    text?: string | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: (() => vue.VNodeChild) | undefined;
        text?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
        text?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:text"?: false | (() => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    tag: string;
} & {
    text?: string | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: (() => vue.VNodeChild) | undefined;
        text?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
        text?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:text"?: false | (() => vue.VNodeChild) | undefined;
}, {
    tag: string;
}>;
type VToolbarTitle = InstanceType<typeof VToolbarTitle>;

declare const VToolbarItems: vue.DefineComponent<{
    variant: string;
} & {
    color?: string | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    variant: string;
} & {
    color?: string | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    variant: string;
}>;
type VToolbarItems = InstanceType<typeof VToolbarItems>;

declare const VTooltip: vue.DefineComponent<{
    offset: NonNullable<string | number | number[] | undefined>;
    location: NonNullable<Anchor>;
    origin: NonNullable<"auto" | Anchor | "overlap">;
    minWidth: NonNullable<string | number>;
    transition: NonNullable<string | boolean | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    })>;
    zIndex: string | number;
    disabled: boolean;
    modelValue: boolean;
    activatorProps: Record<string, any>;
    openOnClick: boolean;
    openOnHover: boolean;
    closeOnContentClick: boolean;
    locationStrategy: NonNullable<"connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
        updateLocation: (e: Event) => void;
    } | undefined)>;
    scrollStrategy: NonNullable<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition">;
    closeOnBack: boolean;
    contained: boolean;
    noClickAnimation: boolean;
    scrim: NonNullable<string | boolean>;
} & {
    id?: string | undefined;
    height?: string | number | undefined;
    width?: string | number | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    text?: string | undefined;
    theme?: string | undefined;
    contentClass?: any;
    activator?: string | Element | vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | undefined;
    closeDelay?: string | number | undefined;
    openDelay?: string | number | undefined;
    openOnFocus?: boolean | undefined;
    contentProps?: any;
    attach?: string | boolean | Element | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: ((args_0: {
            isActive: vue.Ref<boolean>;
        }) => vue.VNodeChild) | undefined;
        activator?: ((args_0: {
            isActive: boolean;
            props: Record<string, any>;
        }) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | ((args_0: {
            isActive: vue.Ref<boolean>;
        }) => vue.VNodeChild) | undefined;
        activator?: false | ((args_0: {
            isActive: boolean;
            props: Record<string, any>;
        }) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | ((args_0: {
        isActive: vue.Ref<boolean>;
    }) => vue.VNodeChild) | undefined;
    "v-slot:activator"?: false | ((args_0: {
        isActive: boolean;
        props: Record<string, any>;
    }) => vue.VNodeChild) | undefined;
}, Omit<Omit<{
    $: vue.ComponentInternalInstance;
    $data: {};
    $props: Partial<{
        absolute: boolean;
        location: Anchor;
        origin: "auto" | Anchor | "overlap";
        transition: string | boolean | (vue.TransitionProps & {
            component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
        });
        zIndex: string | number;
        eager: boolean;
        disabled: boolean;
        modelValue: boolean;
        activatorProps: Record<string, any>;
        openOnClick: boolean;
        openOnHover: boolean;
        openOnFocus: boolean;
        closeOnContentClick: boolean;
        locationStrategy: "connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
            updateLocation: (e: Event) => void;
        } | undefined);
        scrollStrategy: "none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition";
        closeOnBack: boolean;
        contained: boolean;
        noClickAnimation: boolean;
        persistent: boolean;
        scrim: string | boolean;
        _disableGlobalStack: boolean;
    }> & Omit<{
        absolute: boolean;
        location: Anchor;
        origin: "auto" | Anchor | "overlap";
        transition: string | boolean | (vue.TransitionProps & {
            component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
        });
        zIndex: string | number;
        eager: boolean;
        disabled: boolean;
        modelValue: boolean;
        activatorProps: Record<string, any>;
        openOnHover: boolean;
        closeOnContentClick: boolean;
        locationStrategy: "connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
            updateLocation: (e: Event) => void;
        } | undefined);
        scrollStrategy: "none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition";
        closeOnBack: boolean;
        contained: boolean;
        noClickAnimation: boolean;
        persistent: boolean;
        scrim: string | boolean;
        _disableGlobalStack: boolean;
    } & {
        offset?: string | number | number[] | undefined;
        height?: string | number | undefined;
        width?: string | number | undefined;
        maxHeight?: string | number | undefined;
        maxWidth?: string | number | undefined;
        minHeight?: string | number | undefined;
        minWidth?: string | number | undefined;
        theme?: string | undefined;
        contentClass?: any;
        activator?: string | Element | vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | undefined;
        closeDelay?: string | number | undefined;
        openDelay?: string | number | undefined;
        openOnClick?: boolean | undefined;
        openOnFocus?: boolean | undefined;
        contentProps?: any;
        attach?: string | boolean | Element | undefined;
    } & {
        $children?: {} | vue.VNodeChild | {
            default?: ((args_0: {
                isActive: vue.Ref<boolean>;
            }) => vue.VNodeChild) | undefined;
            activator?: ((args_0: {
                isActive: boolean;
                props: Record<string, any>;
            }) => vue.VNodeChild) | undefined;
        };
        'v-slots'?: {
            default?: false | ((args_0: {
                isActive: vue.Ref<boolean>;
            }) => vue.VNodeChild) | undefined;
            activator?: false | ((args_0: {
                isActive: boolean;
                props: Record<string, any>;
            }) => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:default"?: false | ((args_0: {
            isActive: vue.Ref<boolean>;
        }) => vue.VNodeChild) | undefined;
        "v-slot:activator"?: false | ((args_0: {
            isActive: boolean;
            props: Record<string, any>;
        }) => vue.VNodeChild) | undefined;
    } & {
        onAfterLeave?: (() => any) | undefined;
        "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
        "onClick:outside"?: ((e: MouseEvent) => any) | undefined;
    } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "absolute" | "location" | "origin" | "transition" | "zIndex" | "eager" | "disabled" | "modelValue" | "activatorProps" | "openOnClick" | "openOnHover" | "openOnFocus" | "closeOnContentClick" | "locationStrategy" | "scrollStrategy" | "closeOnBack" | "contained" | "noClickAnimation" | "persistent" | "scrim" | "_disableGlobalStack">;
    $attrs: {
        [x: string]: unknown;
    };
    $refs: {
        [x: string]: unknown;
    };
    $slots: Readonly<{
        [name: string]: vue.Slot | undefined;
    }>;
    $root: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null;
    $parent: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null;
    $emit: ((event: "update:modelValue", value: boolean) => void) & ((event: "click:outside", e: MouseEvent) => void) & ((event: "afterLeave") => void);
    $el: any;
    $options: vue.ComponentOptionsBase<{
        absolute: boolean;
        location: Anchor;
        origin: "auto" | Anchor | "overlap";
        transition: string | boolean | (vue.TransitionProps & {
            component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
        });
        zIndex: string | number;
        eager: boolean;
        disabled: boolean;
        modelValue: boolean;
        activatorProps: Record<string, any>;
        openOnHover: boolean;
        closeOnContentClick: boolean;
        locationStrategy: "connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
            updateLocation: (e: Event) => void;
        } | undefined);
        scrollStrategy: "none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition";
        closeOnBack: boolean;
        contained: boolean;
        noClickAnimation: boolean;
        persistent: boolean;
        scrim: string | boolean;
        _disableGlobalStack: boolean;
    } & {
        offset?: string | number | number[] | undefined;
        height?: string | number | undefined;
        width?: string | number | undefined;
        maxHeight?: string | number | undefined;
        maxWidth?: string | number | undefined;
        minHeight?: string | number | undefined;
        minWidth?: string | number | undefined;
        theme?: string | undefined;
        contentClass?: any;
        activator?: string | Element | vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | undefined;
        closeDelay?: string | number | undefined;
        openDelay?: string | number | undefined;
        openOnClick?: boolean | undefined;
        openOnFocus?: boolean | undefined;
        contentProps?: any;
        attach?: string | boolean | Element | undefined;
    } & {
        $children?: {} | vue.VNodeChild | {
            default?: ((args_0: {
                isActive: vue.Ref<boolean>;
            }) => vue.VNodeChild) | undefined;
            activator?: ((args_0: {
                isActive: boolean;
                props: Record<string, any>;
            }) => vue.VNodeChild) | undefined;
        };
        'v-slots'?: {
            default?: false | ((args_0: {
                isActive: vue.Ref<boolean>;
            }) => vue.VNodeChild) | undefined;
            activator?: false | ((args_0: {
                isActive: boolean;
                props: Record<string, any>;
            }) => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:default"?: false | ((args_0: {
            isActive: vue.Ref<boolean>;
        }) => vue.VNodeChild) | undefined;
        "v-slot:activator"?: false | ((args_0: {
            isActive: boolean;
            props: Record<string, any>;
        }) => vue.VNodeChild) | undefined;
    } & {
        onAfterLeave?: (() => any) | undefined;
        "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
        "onClick:outside"?: ((e: MouseEvent) => any) | undefined;
    }, {
        activatorEl: vue.Ref<HTMLElement | undefined>;
        animateClick: () => void;
        contentEl: vue.Ref<HTMLElement | undefined>;
        globalTop: Readonly<vue.Ref<boolean>>;
        localTop: vue.ComputedRef<boolean>;
        updateLocation: vue.Ref<((e: Event) => void) | undefined>;
    }, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
        'click:outside': (e: MouseEvent) => true;
        'update:modelValue': (value: boolean) => true;
        afterLeave: () => true;
    }, string, {
        absolute: boolean;
        location: Anchor;
        origin: "auto" | Anchor | "overlap";
        transition: string | boolean | (vue.TransitionProps & {
            component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
        });
        zIndex: string | number;
        eager: boolean;
        disabled: boolean;
        modelValue: boolean;
        activatorProps: Record<string, any>;
        openOnClick: boolean;
        openOnHover: boolean;
        openOnFocus: boolean;
        closeOnContentClick: boolean;
        locationStrategy: "connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
            updateLocation: (e: Event) => void;
        } | undefined);
        scrollStrategy: "none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition";
        closeOnBack: boolean;
        contained: boolean;
        noClickAnimation: boolean;
        persistent: boolean;
        scrim: string | boolean;
        _disableGlobalStack: boolean;
    }, {}, string> & {
        beforeCreate?: ((() => void) | (() => void)[]) | undefined;
        created?: ((() => void) | (() => void)[]) | undefined;
        beforeMount?: ((() => void) | (() => void)[]) | undefined;
        mounted?: ((() => void) | (() => void)[]) | undefined;
        beforeUpdate?: ((() => void) | (() => void)[]) | undefined;
        updated?: ((() => void) | (() => void)[]) | undefined;
        activated?: ((() => void) | (() => void)[]) | undefined;
        deactivated?: ((() => void) | (() => void)[]) | undefined;
        beforeDestroy?: ((() => void) | (() => void)[]) | undefined;
        beforeUnmount?: ((() => void) | (() => void)[]) | undefined;
        destroyed?: ((() => void) | (() => void)[]) | undefined;
        unmounted?: ((() => void) | (() => void)[]) | undefined;
        renderTracked?: (((e: vue.DebuggerEvent) => void) | ((e: vue.DebuggerEvent) => void)[]) | undefined;
        renderTriggered?: (((e: vue.DebuggerEvent) => void) | ((e: vue.DebuggerEvent) => void)[]) | undefined;
        errorCaptured?: (((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null, info: string) => boolean | void) | ((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null, info: string) => boolean | void)[]) | undefined;
    };
    $forceUpdate: () => void;
    $nextTick: typeof vue.nextTick;
    $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (args_0: R, args_1: R) => any : (...args: any) => any, options?: vue.WatchOptions<boolean> | undefined): vue.WatchStopHandle;
} & {
    absolute: boolean;
    location: Anchor;
    origin: "auto" | Anchor | "overlap";
    transition: string | boolean | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    });
    zIndex: string | number;
    eager: boolean;
    disabled: boolean;
    modelValue: boolean;
    activatorProps: Record<string, any>;
    openOnHover: boolean;
    closeOnContentClick: boolean;
    locationStrategy: "connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
        updateLocation: (e: Event) => void;
    } | undefined);
    scrollStrategy: "none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition";
    closeOnBack: boolean;
    contained: boolean;
    noClickAnimation: boolean;
    persistent: boolean;
    scrim: string | boolean;
    _disableGlobalStack: boolean;
} & {
    offset?: string | number | number[] | undefined;
    height?: string | number | undefined;
    width?: string | number | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
    theme?: string | undefined;
    contentClass?: any;
    activator?: string | Element | vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | undefined;
    closeDelay?: string | number | undefined;
    openDelay?: string | number | undefined;
    openOnClick?: boolean | undefined;
    openOnFocus?: boolean | undefined;
    contentProps?: any;
    attach?: string | boolean | Element | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: ((args_0: {
            isActive: vue.Ref<boolean>;
        }) => vue.VNodeChild) | undefined;
        activator?: ((args_0: {
            isActive: boolean;
            props: Record<string, any>;
        }) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | ((args_0: {
            isActive: vue.Ref<boolean>;
        }) => vue.VNodeChild) | undefined;
        activator?: false | ((args_0: {
            isActive: boolean;
            props: Record<string, any>;
        }) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | ((args_0: {
        isActive: vue.Ref<boolean>;
    }) => vue.VNodeChild) | undefined;
    "v-slot:activator"?: false | ((args_0: {
        isActive: boolean;
        props: Record<string, any>;
    }) => vue.VNodeChild) | undefined;
} & {
    onAfterLeave?: (() => any) | undefined;
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
    "onClick:outside"?: ((e: MouseEvent) => any) | undefined;
} & vue.ShallowUnwrapRef<{
    activatorEl: vue.Ref<HTMLElement | undefined>;
    animateClick: () => void;
    contentEl: vue.Ref<HTMLElement | undefined>;
    globalTop: Readonly<vue.Ref<boolean>>;
    localTop: vue.ComputedRef<boolean>;
    updateLocation: vue.Ref<((e: Event) => void) | undefined>;
}> & {} & vue.ComponentCustomProperties & {}, "offset" | "height" | "width" | "maxHeight" | "maxWidth" | "minHeight" | "minWidth" | "onAfterLeave" | "$children" | "theme" | "v-slot:default" | "v-slots" | "contentClass" | keyof vue.VNodeProps | keyof vue.AllowedComponentProps | "onUpdate:modelValue" | "activator" | "v-slot:activator" | "closeDelay" | "openDelay" | "contentProps" | "attach" | "onClick:outside" | ("absolute" | "location" | "origin" | "transition" | "zIndex" | "eager" | "disabled" | "modelValue" | "activatorProps" | "openOnClick" | "openOnHover" | "openOnFocus" | "closeOnContentClick" | "locationStrategy" | "scrollStrategy" | "closeOnBack" | "contained" | "noClickAnimation" | "persistent" | "scrim" | "_disableGlobalStack")>, `$${any}`>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (value: boolean) => boolean;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    offset: NonNullable<string | number | number[] | undefined>;
    location: NonNullable<Anchor>;
    origin: NonNullable<"auto" | Anchor | "overlap">;
    minWidth: NonNullable<string | number>;
    transition: NonNullable<string | boolean | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    })>;
    zIndex: string | number;
    disabled: boolean;
    modelValue: boolean;
    activatorProps: Record<string, any>;
    openOnClick: boolean;
    openOnHover: boolean;
    closeOnContentClick: boolean;
    locationStrategy: NonNullable<"connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
        updateLocation: (e: Event) => void;
    } | undefined)>;
    scrollStrategy: NonNullable<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition">;
    closeOnBack: boolean;
    contained: boolean;
    noClickAnimation: boolean;
    scrim: NonNullable<string | boolean>;
} & {
    id?: string | undefined;
    height?: string | number | undefined;
    width?: string | number | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    text?: string | undefined;
    theme?: string | undefined;
    contentClass?: any;
    activator?: string | Element | vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | undefined;
    closeDelay?: string | number | undefined;
    openDelay?: string | number | undefined;
    openOnFocus?: boolean | undefined;
    contentProps?: any;
    attach?: string | boolean | Element | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: ((args_0: {
            isActive: vue.Ref<boolean>;
        }) => vue.VNodeChild) | undefined;
        activator?: ((args_0: {
            isActive: boolean;
            props: Record<string, any>;
        }) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | ((args_0: {
            isActive: vue.Ref<boolean>;
        }) => vue.VNodeChild) | undefined;
        activator?: false | ((args_0: {
            isActive: boolean;
            props: Record<string, any>;
        }) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | ((args_0: {
        isActive: vue.Ref<boolean>;
    }) => vue.VNodeChild) | undefined;
    "v-slot:activator"?: false | ((args_0: {
        isActive: boolean;
        props: Record<string, any>;
    }) => vue.VNodeChild) | undefined;
} & {
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
}, {
    offset: NonNullable<string | number | number[] | undefined>;
    location: NonNullable<Anchor>;
    origin: NonNullable<"auto" | Anchor | "overlap">;
    minWidth: NonNullable<string | number>;
    transition: NonNullable<string | boolean | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    })>;
    zIndex: string | number;
    disabled: boolean;
    modelValue: boolean;
    activatorProps: Record<string, any>;
    openOnClick: boolean;
    openOnHover: boolean;
    openOnFocus: boolean;
    closeOnContentClick: boolean;
    locationStrategy: NonNullable<"connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
        updateLocation: (e: Event) => void;
    } | undefined)>;
    scrollStrategy: NonNullable<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition">;
    closeOnBack: boolean;
    contained: boolean;
    noClickAnimation: boolean;
    scrim: NonNullable<string | boolean>;
}>;
type VTooltip = InstanceType<typeof VTooltip>;

declare const VValidation: vue.DefineComponent<{
    error: boolean;
    disabled: boolean;
    readonly: boolean;
    focused: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
} & {
    name?: string | undefined;
    label?: string | undefined;
    modelValue?: any;
    validateOn?: "input" | "blur" | "submit" | undefined;
    validationValue?: any;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>[] | undefined, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (val: any) => boolean;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    error: boolean;
    disabled: boolean;
    readonly: boolean;
    focused: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
} & {
    name?: string | undefined;
    label?: string | undefined;
    modelValue?: any;
    validateOn?: "input" | "blur" | "submit" | undefined;
    validationValue?: any;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
} & {
    "onUpdate:modelValue"?: ((val: any) => any) | undefined;
}, {
    error: boolean;
    disabled: boolean;
    readonly: boolean;
    focused: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
}>;
type VValidation = InstanceType<typeof VValidation>;

interface TouchHandlers {
    start?: (wrapperEvent: {
        originalEvent: TouchEvent;
    } & TouchData) => void;
    end?: (wrapperEvent: {
        originalEvent: TouchEvent;
    } & TouchData) => void;
    move?: (wrapperEvent: {
        originalEvent: TouchEvent;
    } & TouchData) => void;
    left?: (wrapper: TouchData) => void;
    right?: (wrapper: TouchData) => void;
    up?: (wrapper: TouchData) => void;
    down?: (wrapper: TouchData) => void;
}
interface TouchData {
    touchstartX: number;
    touchstartY: number;
    touchmoveX: number;
    touchmoveY: number;
    touchendX: number;
    touchendY: number;
    offsetX: number;
    offsetY: number;
}
interface TouchValue extends TouchHandlers {
    parent?: boolean;
    options?: AddEventListenerOptions;
}
interface TouchDirectiveBinding extends Omit<DirectiveBinding, 'value'> {
    value?: TouchValue;
}
declare function mounted$5(el: HTMLElement, binding: TouchDirectiveBinding): void;
declare function unmounted$5(el: HTMLElement, binding: TouchDirectiveBinding): void;
declare const Touch: {
    mounted: typeof mounted$5;
    unmounted: typeof unmounted$5;
};

type ControlProps = {
    icon: IconValue;
    class: string;
    onClick: () => void;
    ariaLabel: string;
};
declare const VWindow: vue.DefineComponent<{
    reverse: boolean;
    direction: string;
    disabled: boolean;
    tag: string;
    mandatory: "force";
    selectedClass: string;
    continuous: boolean;
    nextIcon: IconValue;
    prevIcon: IconValue;
} & {
    touch?: boolean | TouchHandlers | undefined;
    theme?: string | undefined;
    modelValue?: any;
    showArrows?: string | boolean | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: ((args_0: {
            group: GroupProvide;
        }) => vue.VNodeChild) | undefined;
        additional?: ((args_0: {
            group: GroupProvide;
        }) => vue.VNodeChild) | undefined;
        prev?: ((args_0: {
            props: ControlProps;
        }) => vue.VNodeChild) | undefined;
        next?: ((args_0: {
            props: ControlProps;
        }) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | ((args_0: {
            group: GroupProvide;
        }) => vue.VNodeChild) | undefined;
        additional?: false | ((args_0: {
            group: GroupProvide;
        }) => vue.VNodeChild) | undefined;
        prev?: false | ((args_0: {
            props: ControlProps;
        }) => vue.VNodeChild) | undefined;
        next?: false | ((args_0: {
            props: ControlProps;
        }) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | ((args_0: {
        group: GroupProvide;
    }) => vue.VNodeChild) | undefined;
    "v-slot:additional"?: false | ((args_0: {
        group: GroupProvide;
    }) => vue.VNodeChild) | undefined;
    "v-slot:prev"?: false | ((args_0: {
        props: ControlProps;
    }) => vue.VNodeChild) | undefined;
    "v-slot:next"?: false | ((args_0: {
        props: ControlProps;
    }) => vue.VNodeChild) | undefined;
}, {
    group: GroupProvide;
}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (v: any) => boolean;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    reverse: boolean;
    direction: string;
    disabled: boolean;
    tag: string;
    mandatory: "force";
    selectedClass: string;
    continuous: boolean;
    nextIcon: IconValue;
    prevIcon: IconValue;
} & {
    touch?: boolean | TouchHandlers | undefined;
    theme?: string | undefined;
    modelValue?: any;
    showArrows?: string | boolean | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        default?: ((args_0: {
            group: GroupProvide;
        }) => vue.VNodeChild) | undefined;
        additional?: ((args_0: {
            group: GroupProvide;
        }) => vue.VNodeChild) | undefined;
        prev?: ((args_0: {
            props: ControlProps;
        }) => vue.VNodeChild) | undefined;
        next?: ((args_0: {
            props: ControlProps;
        }) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | ((args_0: {
            group: GroupProvide;
        }) => vue.VNodeChild) | undefined;
        additional?: false | ((args_0: {
            group: GroupProvide;
        }) => vue.VNodeChild) | undefined;
        prev?: false | ((args_0: {
            props: ControlProps;
        }) => vue.VNodeChild) | undefined;
        next?: false | ((args_0: {
            props: ControlProps;
        }) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | ((args_0: {
        group: GroupProvide;
    }) => vue.VNodeChild) | undefined;
    "v-slot:additional"?: false | ((args_0: {
        group: GroupProvide;
    }) => vue.VNodeChild) | undefined;
    "v-slot:prev"?: false | ((args_0: {
        props: ControlProps;
    }) => vue.VNodeChild) | undefined;
    "v-slot:next"?: false | ((args_0: {
        props: ControlProps;
    }) => vue.VNodeChild) | undefined;
} & {
    "onUpdate:modelValue"?: ((v: any) => any) | undefined;
}, {
    reverse: boolean;
    direction: string;
    disabled: boolean;
    tag: string;
    mandatory: "force";
    touch: boolean | TouchHandlers;
    selectedClass: string;
    continuous: boolean;
    nextIcon: IconValue;
    prevIcon: IconValue;
}>;
type VWindow = InstanceType<typeof VWindow>;

declare const VWindowItem: vue.DefineComponent<{
    eager: boolean;
    disabled: boolean;
} & {
    transition?: string | boolean | undefined;
    value?: any;
    selectedClass?: string | undefined;
    reverseTransition?: string | boolean | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'group:selected': (val: {
        value: boolean;
    }) => boolean;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    eager: boolean;
    disabled: boolean;
} & {
    transition?: string | boolean | undefined;
    value?: any;
    selectedClass?: string | undefined;
    reverseTransition?: string | boolean | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
} & {
    "onGroup:selected"?: ((val: {
        value: boolean;
    }) => any) | undefined;
}, {
    transition: string | boolean;
    eager: boolean;
    disabled: boolean;
    reverseTransition: string | boolean;
}>;
type VWindowItem = InstanceType<typeof VWindowItem>;

declare const VDialogTransition: vue.DefineComponent<{} & {
    target?: HTMLElement | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {} & {
    target?: HTMLElement | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {}>;
type VDialogTransition = InstanceType<typeof VDialogTransition>;

declare const VFabTransition: vue.DefineComponent<{
    origin: string;
    group: boolean;
    mode: string;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    origin: string;
    group: boolean;
    mode: string;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    origin: string;
    group: boolean;
    mode: string;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
}>;
type VFabTransition = InstanceType<typeof VFabTransition>;
declare const VDialogBottomTransition: vue.DefineComponent<{
    origin: string;
    group: boolean;
    mode: string;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    origin: string;
    group: boolean;
    mode: string;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    origin: string;
    group: boolean;
    mode: string;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
}>;
type VDialogBottomTransition = InstanceType<typeof VDialogBottomTransition>;
declare const VDialogTopTransition: vue.DefineComponent<{
    origin: string;
    group: boolean;
    mode: string;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    origin: string;
    group: boolean;
    mode: string;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    origin: string;
    group: boolean;
    mode: string;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
}>;
type VDialogTopTransition = InstanceType<typeof VDialogTopTransition>;
declare const VFadeTransition: vue.DefineComponent<{
    origin: string;
    group: boolean;
    mode: string;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    origin: string;
    group: boolean;
    mode: string;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    origin: string;
    group: boolean;
    mode: string;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
}>;
type VFadeTransition = InstanceType<typeof VFadeTransition>;
declare const VScaleTransition: vue.DefineComponent<{
    origin: string;
    group: boolean;
    mode: string;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    origin: string;
    group: boolean;
    mode: string;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    origin: string;
    group: boolean;
    mode: string;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
}>;
type VScaleTransition = InstanceType<typeof VScaleTransition>;
declare const VScrollXTransition: vue.DefineComponent<{
    origin: string;
    group: boolean;
    mode: string;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    origin: string;
    group: boolean;
    mode: string;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    origin: string;
    group: boolean;
    mode: string;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
}>;
type VScrollXTransition = InstanceType<typeof VScrollXTransition>;
declare const VScrollXReverseTransition: vue.DefineComponent<{
    origin: string;
    group: boolean;
    mode: string;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    origin: string;
    group: boolean;
    mode: string;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    origin: string;
    group: boolean;
    mode: string;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
}>;
type VScrollXReverseTransition = InstanceType<typeof VScrollXReverseTransition>;
declare const VScrollYTransition: vue.DefineComponent<{
    origin: string;
    group: boolean;
    mode: string;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    origin: string;
    group: boolean;
    mode: string;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    origin: string;
    group: boolean;
    mode: string;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
}>;
type VScrollYTransition = InstanceType<typeof VScrollYTransition>;
declare const VScrollYReverseTransition: vue.DefineComponent<{
    origin: string;
    group: boolean;
    mode: string;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    origin: string;
    group: boolean;
    mode: string;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    origin: string;
    group: boolean;
    mode: string;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
}>;
type VScrollYReverseTransition = InstanceType<typeof VScrollYReverseTransition>;
declare const VSlideXTransition: vue.DefineComponent<{
    origin: string;
    group: boolean;
    mode: string;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    origin: string;
    group: boolean;
    mode: string;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    origin: string;
    group: boolean;
    mode: string;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
}>;
type VSlideXTransition = InstanceType<typeof VSlideXTransition>;
declare const VSlideXReverseTransition: vue.DefineComponent<{
    origin: string;
    group: boolean;
    mode: string;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    origin: string;
    group: boolean;
    mode: string;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    origin: string;
    group: boolean;
    mode: string;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
}>;
type VSlideXReverseTransition = InstanceType<typeof VSlideXReverseTransition>;
declare const VSlideYTransition: vue.DefineComponent<{
    origin: string;
    group: boolean;
    mode: string;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    origin: string;
    group: boolean;
    mode: string;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    origin: string;
    group: boolean;
    mode: string;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
}>;
type VSlideYTransition = InstanceType<typeof VSlideYTransition>;
declare const VSlideYReverseTransition: vue.DefineComponent<{
    origin: string;
    group: boolean;
    mode: string;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    origin: string;
    group: boolean;
    mode: string;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    origin: string;
    group: boolean;
    mode: string;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
}>;
type VSlideYReverseTransition = InstanceType<typeof VSlideYReverseTransition>;
declare const VExpandTransition: vue.DefineComponent<{
    mode: "default" | "in-out" | "out-in";
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    mode: "default" | "in-out" | "out-in";
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    mode: "default" | "in-out" | "out-in";
}>;
type VExpandTransition = InstanceType<typeof VExpandTransition>;
declare const VExpandXTransition: vue.DefineComponent<{
    mode: "default" | "in-out" | "out-in";
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, {
    mode: "default" | "in-out" | "out-in";
} & {} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    mode: "default" | "in-out" | "out-in";
}>;
type VExpandXTransition = InstanceType<typeof VExpandXTransition>;

//# sourceMappingURL=index.d.ts.map

declare const index_d$1_VApp: typeof VApp;
declare const index_d$1_VAppBar: typeof VAppBar;
declare const index_d$1_VAppBarNavIcon: typeof VAppBarNavIcon;
declare const index_d$1_VAppBarTitle: typeof VAppBarTitle;
declare const index_d$1_VAlert: typeof VAlert;
declare const index_d$1_VAlertTitle: typeof VAlertTitle;
declare const index_d$1_VAutocomplete: typeof VAutocomplete;
declare const index_d$1_VAvatar: typeof VAvatar;
declare const index_d$1_VBadge: typeof VBadge;
declare const index_d$1_VBanner: typeof VBanner;
declare const index_d$1_VBannerActions: typeof VBannerActions;
declare const index_d$1_VBannerText: typeof VBannerText;
declare const index_d$1_VBottomNavigation: typeof VBottomNavigation;
declare const index_d$1_VBreadcrumbs: typeof VBreadcrumbs;
declare const index_d$1_VBreadcrumbsItem: typeof VBreadcrumbsItem;
declare const index_d$1_VBreadcrumbsDivider: typeof VBreadcrumbsDivider;
declare const index_d$1_VBtn: typeof VBtn;
declare const index_d$1_VBtnGroup: typeof VBtnGroup;
declare const index_d$1_VBtnToggle: typeof VBtnToggle;
declare const index_d$1_VCard: typeof VCard;
declare const index_d$1_VCardActions: typeof VCardActions;
declare const index_d$1_VCardItem: typeof VCardItem;
declare const index_d$1_VCardSubtitle: typeof VCardSubtitle;
declare const index_d$1_VCardText: typeof VCardText;
declare const index_d$1_VCardTitle: typeof VCardTitle;
declare const index_d$1_VCarousel: typeof VCarousel;
declare const index_d$1_VCarouselItem: typeof VCarouselItem;
declare const index_d$1_VCheckbox: typeof VCheckbox;
declare const index_d$1_VCheckboxBtn: typeof VCheckboxBtn;
declare const index_d$1_VChip: typeof VChip;
declare const index_d$1_VChipGroup: typeof VChipGroup;
declare const index_d$1_VCode: typeof VCode;
declare const index_d$1_VColorPicker: typeof VColorPicker;
declare const index_d$1_VCombobox: typeof VCombobox;
declare const index_d$1_VCounter: typeof VCounter;
declare const index_d$1_VDefaultsProvider: typeof VDefaultsProvider;
declare const index_d$1_VDialog: typeof VDialog;
declare const index_d$1_VDivider: typeof VDivider;
declare const index_d$1_VExpansionPanels: typeof VExpansionPanels;
declare const index_d$1_VExpansionPanel: typeof VExpansionPanel;
declare const index_d$1_VExpansionPanelText: typeof VExpansionPanelText;
declare const index_d$1_VExpansionPanelTitle: typeof VExpansionPanelTitle;
declare const index_d$1_VField: typeof VField;
declare const index_d$1_VFieldLabel: typeof VFieldLabel;
declare const index_d$1_VFileInput: typeof VFileInput;
declare const index_d$1_VFooter: typeof VFooter;
declare const index_d$1_VForm: typeof VForm;
declare const index_d$1_VContainer: typeof VContainer;
declare const index_d$1_VCol: typeof VCol;
declare const index_d$1_VRow: typeof VRow;
declare const index_d$1_VSpacer: typeof VSpacer;
declare const index_d$1_VHover: typeof VHover;
declare const index_d$1_VIcon: typeof VIcon;
declare const index_d$1_VComponentIcon: typeof VComponentIcon;
declare const index_d$1_VSvgIcon: typeof VSvgIcon;
declare const index_d$1_VLigatureIcon: typeof VLigatureIcon;
declare const index_d$1_VClassIcon: typeof VClassIcon;
declare const index_d$1_VImg: typeof VImg;
declare const index_d$1_VInput: typeof VInput;
declare const index_d$1_VItemGroup: typeof VItemGroup;
declare const index_d$1_VItem: typeof VItem;
declare const index_d$1_VKbd: typeof VKbd;
declare const index_d$1_VLabel: typeof VLabel;
declare const index_d$1_VLayout: typeof VLayout;
declare const index_d$1_VLayoutItem: typeof VLayoutItem;
declare const index_d$1_VLazy: typeof VLazy;
declare const index_d$1_VList: typeof VList;
declare const index_d$1_VListGroup: typeof VListGroup;
declare const index_d$1_VListImg: typeof VListImg;
declare const index_d$1_VListItem: typeof VListItem;
declare const index_d$1_VListItemAction: typeof VListItemAction;
declare const index_d$1_VListItemMedia: typeof VListItemMedia;
declare const index_d$1_VListItemSubtitle: typeof VListItemSubtitle;
declare const index_d$1_VListItemTitle: typeof VListItemTitle;
declare const index_d$1_VListSubheader: typeof VListSubheader;
declare const index_d$1_VLocaleProvider: typeof VLocaleProvider;
declare const index_d$1_VMain: typeof VMain;
declare const index_d$1_VMenu: typeof VMenu;
declare const index_d$1_VMessages: typeof VMessages;
declare const index_d$1_VNavigationDrawer: typeof VNavigationDrawer;
declare const index_d$1_VNoSsr: typeof VNoSsr;
declare const index_d$1_VOverlay: typeof VOverlay;
declare const index_d$1_VPagination: typeof VPagination;
declare const index_d$1_VParallax: typeof VParallax;
declare const index_d$1_VProgressCircular: typeof VProgressCircular;
declare const index_d$1_VProgressLinear: typeof VProgressLinear;
declare const index_d$1_VRadio: typeof VRadio;
declare const index_d$1_VRadioGroup: typeof VRadioGroup;
declare const index_d$1_VRangeSlider: typeof VRangeSlider;
declare const index_d$1_VRating: typeof VRating;
declare const index_d$1_VResponsive: typeof VResponsive;
declare const index_d$1_VSelect: typeof VSelect;
declare const index_d$1_VSelectionControl: typeof VSelectionControl;
declare const index_d$1_VSelectionControlGroup: typeof VSelectionControlGroup;
declare const index_d$1_VSheet: typeof VSheet;
declare const index_d$1_VSlideGroup: typeof VSlideGroup;
declare const index_d$1_VSlideGroupItem: typeof VSlideGroupItem;
declare const index_d$1_VSlider: typeof VSlider;
declare const index_d$1_VSnackbar: typeof VSnackbar;
declare const index_d$1_VSwitch: typeof VSwitch;
declare const index_d$1_VSystemBar: typeof VSystemBar;
declare const index_d$1_VTabs: typeof VTabs;
declare const index_d$1_VTab: typeof VTab;
declare const index_d$1_VTable: typeof VTable;
declare const index_d$1_VTextarea: typeof VTextarea;
declare const index_d$1_VTextField: typeof VTextField;
declare const index_d$1_VThemeProvider: typeof VThemeProvider;
declare const index_d$1_VTimeline: typeof VTimeline;
declare const index_d$1_VTimelineItem: typeof VTimelineItem;
declare const index_d$1_VToolbar: typeof VToolbar;
declare const index_d$1_VToolbarTitle: typeof VToolbarTitle;
declare const index_d$1_VToolbarItems: typeof VToolbarItems;
declare const index_d$1_VTooltip: typeof VTooltip;
declare const index_d$1_VValidation: typeof VValidation;
declare const index_d$1_VWindow: typeof VWindow;
declare const index_d$1_VWindowItem: typeof VWindowItem;
declare const index_d$1_VDialogTransition: typeof VDialogTransition;
declare const index_d$1_VFabTransition: typeof VFabTransition;
declare const index_d$1_VDialogBottomTransition: typeof VDialogBottomTransition;
declare const index_d$1_VDialogTopTransition: typeof VDialogTopTransition;
declare const index_d$1_VFadeTransition: typeof VFadeTransition;
declare const index_d$1_VScaleTransition: typeof VScaleTransition;
declare const index_d$1_VScrollXTransition: typeof VScrollXTransition;
declare const index_d$1_VScrollXReverseTransition: typeof VScrollXReverseTransition;
declare const index_d$1_VScrollYTransition: typeof VScrollYTransition;
declare const index_d$1_VScrollYReverseTransition: typeof VScrollYReverseTransition;
declare const index_d$1_VSlideXTransition: typeof VSlideXTransition;
declare const index_d$1_VSlideXReverseTransition: typeof VSlideXReverseTransition;
declare const index_d$1_VSlideYTransition: typeof VSlideYTransition;
declare const index_d$1_VSlideYReverseTransition: typeof VSlideYReverseTransition;
declare const index_d$1_VExpandTransition: typeof VExpandTransition;
declare const index_d$1_VExpandXTransition: typeof VExpandXTransition;
declare namespace index_d$1 {
  export {
    index_d$1_VApp as VApp,
    index_d$1_VAppBar as VAppBar,
    index_d$1_VAppBarNavIcon as VAppBarNavIcon,
    index_d$1_VAppBarTitle as VAppBarTitle,
    index_d$1_VAlert as VAlert,
    index_d$1_VAlertTitle as VAlertTitle,
    index_d$1_VAutocomplete as VAutocomplete,
    index_d$1_VAvatar as VAvatar,
    index_d$1_VBadge as VBadge,
    index_d$1_VBanner as VBanner,
    index_d$1_VBannerActions as VBannerActions,
    index_d$1_VBannerText as VBannerText,
    index_d$1_VBottomNavigation as VBottomNavigation,
    index_d$1_VBreadcrumbs as VBreadcrumbs,
    index_d$1_VBreadcrumbsItem as VBreadcrumbsItem,
    index_d$1_VBreadcrumbsDivider as VBreadcrumbsDivider,
    index_d$1_VBtn as VBtn,
    index_d$1_VBtnGroup as VBtnGroup,
    index_d$1_VBtnToggle as VBtnToggle,
    index_d$1_VCard as VCard,
    index_d$1_VCardActions as VCardActions,
    index_d$1_VCardItem as VCardItem,
    index_d$1_VCardSubtitle as VCardSubtitle,
    index_d$1_VCardText as VCardText,
    index_d$1_VCardTitle as VCardTitle,
    index_d$1_VCarousel as VCarousel,
    index_d$1_VCarouselItem as VCarouselItem,
    index_d$1_VCheckbox as VCheckbox,
    index_d$1_VCheckboxBtn as VCheckboxBtn,
    index_d$1_VChip as VChip,
    index_d$1_VChipGroup as VChipGroup,
    index_d$1_VCode as VCode,
    index_d$1_VColorPicker as VColorPicker,
    index_d$1_VCombobox as VCombobox,
    index_d$1_VCounter as VCounter,
    index_d$1_VDefaultsProvider as VDefaultsProvider,
    index_d$1_VDialog as VDialog,
    index_d$1_VDivider as VDivider,
    index_d$1_VExpansionPanels as VExpansionPanels,
    index_d$1_VExpansionPanel as VExpansionPanel,
    index_d$1_VExpansionPanelText as VExpansionPanelText,
    index_d$1_VExpansionPanelTitle as VExpansionPanelTitle,
    index_d$1_VField as VField,
    index_d$1_VFieldLabel as VFieldLabel,
    index_d$1_VFileInput as VFileInput,
    index_d$1_VFooter as VFooter,
    index_d$1_VForm as VForm,
    index_d$1_VContainer as VContainer,
    index_d$1_VCol as VCol,
    index_d$1_VRow as VRow,
    index_d$1_VSpacer as VSpacer,
    index_d$1_VHover as VHover,
    index_d$1_VIcon as VIcon,
    index_d$1_VComponentIcon as VComponentIcon,
    index_d$1_VSvgIcon as VSvgIcon,
    index_d$1_VLigatureIcon as VLigatureIcon,
    index_d$1_VClassIcon as VClassIcon,
    index_d$1_VImg as VImg,
    index_d$1_VInput as VInput,
    index_d$1_VItemGroup as VItemGroup,
    index_d$1_VItem as VItem,
    index_d$1_VKbd as VKbd,
    index_d$1_VLabel as VLabel,
    index_d$1_VLayout as VLayout,
    index_d$1_VLayoutItem as VLayoutItem,
    index_d$1_VLazy as VLazy,
    index_d$1_VList as VList,
    index_d$1_VListGroup as VListGroup,
    index_d$1_VListImg as VListImg,
    index_d$1_VListItem as VListItem,
    index_d$1_VListItemAction as VListItemAction,
    index_d$1_VListItemMedia as VListItemMedia,
    index_d$1_VListItemSubtitle as VListItemSubtitle,
    index_d$1_VListItemTitle as VListItemTitle,
    index_d$1_VListSubheader as VListSubheader,
    index_d$1_VLocaleProvider as VLocaleProvider,
    index_d$1_VMain as VMain,
    index_d$1_VMenu as VMenu,
    index_d$1_VMessages as VMessages,
    index_d$1_VNavigationDrawer as VNavigationDrawer,
    index_d$1_VNoSsr as VNoSsr,
    index_d$1_VOverlay as VOverlay,
    index_d$1_VPagination as VPagination,
    index_d$1_VParallax as VParallax,
    index_d$1_VProgressCircular as VProgressCircular,
    index_d$1_VProgressLinear as VProgressLinear,
    index_d$1_VRadio as VRadio,
    index_d$1_VRadioGroup as VRadioGroup,
    index_d$1_VRangeSlider as VRangeSlider,
    index_d$1_VRating as VRating,
    index_d$1_VResponsive as VResponsive,
    index_d$1_VSelect as VSelect,
    index_d$1_VSelectionControl as VSelectionControl,
    index_d$1_VSelectionControlGroup as VSelectionControlGroup,
    index_d$1_VSheet as VSheet,
    index_d$1_VSlideGroup as VSlideGroup,
    index_d$1_VSlideGroupItem as VSlideGroupItem,
    index_d$1_VSlider as VSlider,
    index_d$1_VSnackbar as VSnackbar,
    index_d$1_VSwitch as VSwitch,
    index_d$1_VSystemBar as VSystemBar,
    index_d$1_VTabs as VTabs,
    index_d$1_VTab as VTab,
    index_d$1_VTable as VTable,
    index_d$1_VTextarea as VTextarea,
    index_d$1_VTextField as VTextField,
    index_d$1_VThemeProvider as VThemeProvider,
    index_d$1_VTimeline as VTimeline,
    index_d$1_VTimelineItem as VTimelineItem,
    index_d$1_VToolbar as VToolbar,
    index_d$1_VToolbarTitle as VToolbarTitle,
    index_d$1_VToolbarItems as VToolbarItems,
    index_d$1_VTooltip as VTooltip,
    index_d$1_VValidation as VValidation,
    index_d$1_VWindow as VWindow,
    index_d$1_VWindowItem as VWindowItem,
    index_d$1_VDialogTransition as VDialogTransition,
    index_d$1_VFabTransition as VFabTransition,
    index_d$1_VDialogBottomTransition as VDialogBottomTransition,
    index_d$1_VDialogTopTransition as VDialogTopTransition,
    index_d$1_VFadeTransition as VFadeTransition,
    index_d$1_VScaleTransition as VScaleTransition,
    index_d$1_VScrollXTransition as VScrollXTransition,
    index_d$1_VScrollXReverseTransition as VScrollXReverseTransition,
    index_d$1_VScrollYTransition as VScrollYTransition,
    index_d$1_VScrollYReverseTransition as VScrollYReverseTransition,
    index_d$1_VSlideXTransition as VSlideXTransition,
    index_d$1_VSlideXReverseTransition as VSlideXReverseTransition,
    index_d$1_VSlideYTransition as VSlideYTransition,
    index_d$1_VSlideYReverseTransition as VSlideYReverseTransition,
    index_d$1_VExpandTransition as VExpandTransition,
    index_d$1_VExpandXTransition as VExpandXTransition,
  };
}

interface ClickOutsideBindingArgs {
    handler: (e: MouseEvent) => void;
    closeConditional?: (e: Event) => boolean;
    include?: () => HTMLElement[];
}
interface ClickOutsideDirectiveBinding extends DirectiveBinding {
    value: ((e: MouseEvent) => void) | ClickOutsideBindingArgs;
}
declare const ClickOutside: {
    mounted(el: HTMLElement, binding: ClickOutsideDirectiveBinding): void;
    unmounted(el: HTMLElement, binding: ClickOutsideDirectiveBinding): void;
};

type ObserveHandler = (isIntersecting: boolean, entries: IntersectionObserverEntry[], observer: IntersectionObserver) => void;
interface ObserveDirectiveBinding extends Omit<DirectiveBinding, 'modifiers' | 'value'> {
    value?: ObserveHandler | {
        handler: ObserveHandler;
        options?: IntersectionObserverInit;
    };
    modifiers: {
        once?: boolean;
        quiet?: boolean;
    };
}
declare function mounted$4(el: HTMLElement, binding: ObserveDirectiveBinding): void;
declare function unmounted$4(el: HTMLElement, binding: ObserveDirectiveBinding): void;
declare const Intersect: {
    mounted: typeof mounted$4;
    unmounted: typeof unmounted$4;
};

interface MutationOptions {
    attr?: boolean;
    char?: boolean;
    child?: boolean;
    sub?: boolean;
    once?: boolean;
    immediate?: boolean;
}

interface MutationDirectiveBinding extends Omit<DirectiveBinding, 'modifiers' | 'value'> {
    value: MutationCallback | {
        handler: MutationCallback;
        options?: MutationObserverInit;
    };
    modifiers: MutationOptions;
}
declare function mounted$3(el: HTMLElement, binding: MutationDirectiveBinding): void;
declare function unmounted$3(el: HTMLElement, binding: MutationDirectiveBinding): void;
declare const Mutate: {
    mounted: typeof mounted$3;
    unmounted: typeof unmounted$3;
};

interface ResizeDirectiveBinding extends Omit<DirectiveBinding, 'modifiers'> {
    value: () => void;
    modifiers?: {
        active?: boolean;
        quiet?: boolean;
    };
}
declare function mounted$2(el: HTMLElement, binding: ResizeDirectiveBinding): void;
declare function unmounted$2(el: HTMLElement, binding: ResizeDirectiveBinding): void;
declare const Resize: {
    mounted: typeof mounted$2;
    unmounted: typeof unmounted$2;
};

interface RippleDirectiveBinding extends Omit<DirectiveBinding, 'modifiers' | 'value'> {
    value?: boolean | {
        class: string;
    };
    modifiers: {
        center?: boolean;
        circle?: boolean;
        stop?: boolean;
    };
}
declare function mounted$1(el: HTMLElement, binding: RippleDirectiveBinding): void;
declare function unmounted$1(el: HTMLElement): void;
declare function updated$1(el: HTMLElement, binding: RippleDirectiveBinding): void;
declare const Ripple: {
    mounted: typeof mounted$1;
    unmounted: typeof unmounted$1;
    updated: typeof updated$1;
};

interface ScrollDirectiveBinding extends Omit<DirectiveBinding, 'modifiers'> {
    value: EventListener | {
        handler: EventListener;
        options?: AddEventListenerOptions;
    } | EventListenerObject & {
        options?: AddEventListenerOptions;
    };
    modifiers?: {
        self?: boolean;
    };
}
declare function mounted(el: HTMLElement, binding: ScrollDirectiveBinding): void;
declare function unmounted(el: HTMLElement, binding: ScrollDirectiveBinding): void;
declare function updated(el: HTMLElement, binding: ScrollDirectiveBinding): void;
declare const Scroll: {
    mounted: typeof mounted;
    unmounted: typeof unmounted;
    updated: typeof updated;
};

//# sourceMappingURL=index.d.ts.map

declare const index_d_ClickOutside: typeof ClickOutside;
declare const index_d_Intersect: typeof Intersect;
declare const index_d_Mutate: typeof Mutate;
declare const index_d_Resize: typeof Resize;
declare const index_d_Ripple: typeof Ripple;
declare const index_d_Scroll: typeof Scroll;
declare const index_d_Touch: typeof Touch;
declare namespace index_d {
  export {
    index_d_ClickOutside as ClickOutside,
    index_d_Intersect as Intersect,
    index_d_Mutate as Mutate,
    index_d_Resize as Resize,
    index_d_Ripple as Ripple,
    index_d_Scroll as Scroll,
    index_d_Touch as Touch,
  };
}

declare const createVuetify: {
    (options?: VuetifyOptions): {
        install: (app: vue.App<any>) => void;
        defaults: vue.Ref<DefaultsInstance>;
        display: DisplayInstance;
        theme: ThemeInstance & {
            install: (app: vue.App<any>) => void;
        };
        icons: Record<string, any>;
        locale: {
            isRtl: vue.Ref<boolean>;
            rtl: vue.Ref<Record<string, boolean>>;
            rtlClasses: vue.Ref<string>;
            name: string;
            messages: vue.Ref<LocaleMessages>;
            current: vue.Ref<string>;
            fallback: vue.Ref<string>;
            t: (key: string, ...params: unknown[]) => string;
            n: (value: number) => string;
            provide: (props: LocaleOptions) => LocaleInstance;
        };
    };
    version: string;
};
declare const version: string;

export { DefaultsInstance, DisplayBreakpoint, DisplayInstance, DisplayThresholds, IconAliases, IconOptions, IconProps, IconSet, LocaleInstance, LocaleMessages, LocaleOptions, RtlInstance, RtlOptions, SubmitEventPromise, ThemeDefinition, ThemeInstance, index_d$1 as components, createVuetify, index_d as directives, useDisplay, useLayout, useLocale, useRtl, useTheme, version };

import type { ComponentPublicInstance, FunctionalComponent, UnwrapNestedRefs } from 'vue'


declare global {
  namespace JSX {
    interface ElementChildrenAttribute {
      $children: {}
    }
  }
}

declare module 'vue' {
  export type JSXComponent<Props = any> = { new (): ComponentPublicInstance<Props> } | FunctionalComponent<Props>
}

declare module '@vue/runtime-dom' {
  export interface HTMLAttributes {
    $children?: VNodeChild
  }
  export interface SVGAttributes {
    $children?: VNodeChild
  }
}

declare module '@vue/runtime-core' {
  interface Vuetify {
    defaults: DefaultsInstance
    display: UnwrapNestedRefs<DisplayInstance>
    theme: UnwrapNestedRefs<ThemeInstance>
    icons: IconOptions
    locale: UnwrapNestedRefs<LocaleInstance & RtlInstance>
  }

  export interface ComponentCustomProperties {
    $vuetify: Vuetify
  }

  export interface GlobalComponents {
    VDefaultsProvider: typeof import('vuetify/components')['VDefaultsProvider']
    VForm: typeof import('vuetify/components')['VForm']
    VContainer: typeof import('vuetify/components')['VContainer']
    VCol: typeof import('vuetify/components')['VCol']
    VRow: typeof import('vuetify/components')['VRow']
    VSpacer: typeof import('vuetify/components')['VSpacer']
    VHover: typeof import('vuetify/components')['VHover']
    VLayout: typeof import('vuetify/components')['VLayout']
    VLayoutItem: typeof import('vuetify/components')['VLayoutItem']
    VLazy: typeof import('vuetify/components')['VLazy']
    VLocaleProvider: typeof import('vuetify/components')['VLocaleProvider']
    VNoSsr: typeof import('vuetify/components')['VNoSsr']
    VParallax: typeof import('vuetify/components')['VParallax']
    VRadio: typeof import('vuetify/components')['VRadio']
    VRangeSlider: typeof import('vuetify/components')['VRangeSlider']
    VResponsive: typeof import('vuetify/components')['VResponsive']
    VThemeProvider: typeof import('vuetify/components')['VThemeProvider']
    VValidation: typeof import('vuetify/components')['VValidation']
    VFabTransition: typeof import('vuetify/components')['VFabTransition']
    VDialogBottomTransition: typeof import('vuetify/components')['VDialogBottomTransition']
    VDialogTopTransition: typeof import('vuetify/components')['VDialogTopTransition']
    VFadeTransition: typeof import('vuetify/components')['VFadeTransition']
    VScaleTransition: typeof import('vuetify/components')['VScaleTransition']
    VScrollXTransition: typeof import('vuetify/components')['VScrollXTransition']
    VScrollXReverseTransition: typeof import('vuetify/components')['VScrollXReverseTransition']
    VScrollYTransition: typeof import('vuetify/components')['VScrollYTransition']
    VScrollYReverseTransition: typeof import('vuetify/components')['VScrollYReverseTransition']
    VSlideXTransition: typeof import('vuetify/components')['VSlideXTransition']
    VSlideXReverseTransition: typeof import('vuetify/components')['VSlideXReverseTransition']
    VSlideYTransition: typeof import('vuetify/components')['VSlideYTransition']
    VSlideYReverseTransition: typeof import('vuetify/components')['VSlideYReverseTransition']
    VExpandTransition: typeof import('vuetify/components')['VExpandTransition']
    VExpandXTransition: typeof import('vuetify/components')['VExpandXTransition']
    VDialogTransition: typeof import('vuetify/components')['VDialogTransition']
    VApp: typeof import('vuetify/components')['VApp']
    VAppBar: typeof import('vuetify/components')['VAppBar']
    VAppBarNavIcon: typeof import('vuetify/components')['VAppBarNavIcon']
    VAppBarTitle: typeof import('vuetify/components')['VAppBarTitle']
    VAlert: typeof import('vuetify/components')['VAlert']
    VAlertTitle: typeof import('vuetify/components')['VAlertTitle']
    VAutocomplete: typeof import('vuetify/components')['VAutocomplete']
    VAvatar: typeof import('vuetify/components')['VAvatar']
    VBadge: typeof import('vuetify/components')['VBadge']
    VBanner: typeof import('vuetify/components')['VBanner']
    VBannerActions: typeof import('vuetify/components')['VBannerActions']
    VBannerText: typeof import('vuetify/components')['VBannerText']
    VBottomNavigation: typeof import('vuetify/components')['VBottomNavigation']
    VBreadcrumbs: typeof import('vuetify/components')['VBreadcrumbs']
    VBreadcrumbsItem: typeof import('vuetify/components')['VBreadcrumbsItem']
    VBreadcrumbsDivider: typeof import('vuetify/components')['VBreadcrumbsDivider']
    VBtn: typeof import('vuetify/components')['VBtn']
    VBtnGroup: typeof import('vuetify/components')['VBtnGroup']
    VBtnToggle: typeof import('vuetify/components')['VBtnToggle']
    VCard: typeof import('vuetify/components')['VCard']
    VCardActions: typeof import('vuetify/components')['VCardActions']
    VCardItem: typeof import('vuetify/components')['VCardItem']
    VCardSubtitle: typeof import('vuetify/components')['VCardSubtitle']
    VCardText: typeof import('vuetify/components')['VCardText']
    VCardTitle: typeof import('vuetify/components')['VCardTitle']
    VCarousel: typeof import('vuetify/components')['VCarousel']
    VCarouselItem: typeof import('vuetify/components')['VCarouselItem']
    VCheckbox: typeof import('vuetify/components')['VCheckbox']
    VCheckboxBtn: typeof import('vuetify/components')['VCheckboxBtn']
    VChip: typeof import('vuetify/components')['VChip']
    VChipGroup: typeof import('vuetify/components')['VChipGroup']
    VCode: typeof import('vuetify/components')['VCode']
    VColorPicker: typeof import('vuetify/components')['VColorPicker']
    VCombobox: typeof import('vuetify/components')['VCombobox']
    VCounter: typeof import('vuetify/components')['VCounter']
    VDialog: typeof import('vuetify/components')['VDialog']
    VDivider: typeof import('vuetify/components')['VDivider']
    VExpansionPanels: typeof import('vuetify/components')['VExpansionPanels']
    VExpansionPanel: typeof import('vuetify/components')['VExpansionPanel']
    VExpansionPanelText: typeof import('vuetify/components')['VExpansionPanelText']
    VExpansionPanelTitle: typeof import('vuetify/components')['VExpansionPanelTitle']
    VField: typeof import('vuetify/components')['VField']
    VFieldLabel: typeof import('vuetify/components')['VFieldLabel']
    VFileInput: typeof import('vuetify/components')['VFileInput']
    VFooter: typeof import('vuetify/components')['VFooter']
    VIcon: typeof import('vuetify/components')['VIcon']
    VComponentIcon: typeof import('vuetify/components')['VComponentIcon']
    VSvgIcon: typeof import('vuetify/components')['VSvgIcon']
    VLigatureIcon: typeof import('vuetify/components')['VLigatureIcon']
    VClassIcon: typeof import('vuetify/components')['VClassIcon']
    VImg: typeof import('vuetify/components')['VImg']
    VInput: typeof import('vuetify/components')['VInput']
    VItemGroup: typeof import('vuetify/components')['VItemGroup']
    VItem: typeof import('vuetify/components')['VItem']
    VKbd: typeof import('vuetify/components')['VKbd']
    VLabel: typeof import('vuetify/components')['VLabel']
    VList: typeof import('vuetify/components')['VList']
    VListGroup: typeof import('vuetify/components')['VListGroup']
    VListImg: typeof import('vuetify/components')['VListImg']
    VListItem: typeof import('vuetify/components')['VListItem']
    VListItemAction: typeof import('vuetify/components')['VListItemAction']
    VListItemMedia: typeof import('vuetify/components')['VListItemMedia']
    VListItemSubtitle: typeof import('vuetify/components')['VListItemSubtitle']
    VListItemTitle: typeof import('vuetify/components')['VListItemTitle']
    VListSubheader: typeof import('vuetify/components')['VListSubheader']
    VMain: typeof import('vuetify/components')['VMain']
    VMenu: typeof import('vuetify/components')['VMenu']
    VMessages: typeof import('vuetify/components')['VMessages']
    VNavigationDrawer: typeof import('vuetify/components')['VNavigationDrawer']
    VOverlay: typeof import('vuetify/components')['VOverlay']
    VPagination: typeof import('vuetify/components')['VPagination']
    VProgressCircular: typeof import('vuetify/components')['VProgressCircular']
    VProgressLinear: typeof import('vuetify/components')['VProgressLinear']
    VRadioGroup: typeof import('vuetify/components')['VRadioGroup']
    VRating: typeof import('vuetify/components')['VRating']
    VSelect: typeof import('vuetify/components')['VSelect']
    VSelectionControl: typeof import('vuetify/components')['VSelectionControl']
    VSelectionControlGroup: typeof import('vuetify/components')['VSelectionControlGroup']
    VSheet: typeof import('vuetify/components')['VSheet']
    VSlideGroup: typeof import('vuetify/components')['VSlideGroup']
    VSlideGroupItem: typeof import('vuetify/components')['VSlideGroupItem']
    VSlider: typeof import('vuetify/components')['VSlider']
    VSnackbar: typeof import('vuetify/components')['VSnackbar']
    VSwitch: typeof import('vuetify/components')['VSwitch']
    VSystemBar: typeof import('vuetify/components')['VSystemBar']
    VTabs: typeof import('vuetify/components')['VTabs']
    VTab: typeof import('vuetify/components')['VTab']
    VTable: typeof import('vuetify/components')['VTable']
    VTextarea: typeof import('vuetify/components')['VTextarea']
    VTextField: typeof import('vuetify/components')['VTextField']
    VTimeline: typeof import('vuetify/components')['VTimeline']
    VTimelineItem: typeof import('vuetify/components')['VTimelineItem']
    VToolbar: typeof import('vuetify/components')['VToolbar']
    VToolbarTitle: typeof import('vuetify/components')['VToolbarTitle']
    VToolbarItems: typeof import('vuetify/components')['VToolbarItems']
    VTooltip: typeof import('vuetify/components')['VTooltip']
    VWindow: typeof import('vuetify/components')['VWindow']
    VWindowItem: typeof import('vuetify/components')['VWindowItem']
  }
}
