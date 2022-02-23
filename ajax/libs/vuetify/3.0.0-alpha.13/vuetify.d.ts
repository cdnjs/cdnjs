import * as vue from 'vue';
import { Ref, PropType, ComponentInternalInstance, ComputedRef, VNodeChild, nextTick, JSXComponent, Prop, WritableComputedRef, ObjectDirective, DirectiveBinding, ToRefs, App } from 'vue';
import * as vue_router from 'vue-router';
import { RouteLocationRaw } from 'vue-router';

declare type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;
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
interface Colors extends BaseColors, OnColors {
    [key: string]: string;
}
interface InternalThemeDefinition {
    dark: boolean;
    colors: Colors;
    variables: Record<string, string | number>;
}
interface VariationsOptions {
    colors: string[];
    lighten: number;
    darken: number;
}
declare type ThemeDefinition = DeepPartial<InternalThemeDefinition>;
declare type ThemeOptions = false | {
    defaultTheme?: string;
    variations?: false | VariationsOptions;
    themes?: Record<string, ThemeDefinition>;
};
interface ThemeInstance {
    isDisabled: boolean;
    themes: Ref<Record<string, InternalThemeDefinition>>;
    current: Ref<string>;
    themeClasses: Ref<string | undefined>;
    setTheme: (key: string, theme: InternalThemeDefinition) => void;
    getTheme: (key: string) => InternalThemeDefinition;
    styles: Ref<string>;
}
declare function useTheme(): ThemeInstance;

declare const VApp: vue.DefineComponent<{
    theme: StringConstructor;
    overlaps: vue.Prop<string[], string[]>;
    fullHeight: {
        type: vue.PropType<boolean>;
        default: boolean;
    };
}, {
    getLayoutItem: (id: string) => {
        size: number;
        top: number;
        left: number;
        right: number;
        bottom: number;
        id: string;
    } | undefined;
    items: vue.ComputedRef<{
        size: number;
        top: number;
        left: number;
        right: number;
        bottom: number;
        id: string;
    }[]>;
    theme: ThemeInstance;
}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    theme?: unknown;
    overlaps?: unknown;
    fullHeight?: unknown;
} & {
    fullHeight: boolean;
} & {
    theme?: string | undefined;
    overlaps?: string[] | undefined;
}>, {
    fullHeight: boolean;
}>;
declare type VApp = InstanceType<typeof VApp>;

declare const VAppBar: vue.DefineComponent<{
    tag: Omit<{
        type: StringConstructor;
        default: string;
    }, "default" | "type"> & {
        type: PropType<string>;
        default: string;
    };
    name: {
        type: StringConstructor;
    };
    priority: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    absolute: BooleanConstructor;
    rounded: {
        type: (StringConstructor | NumberConstructor | BooleanConstructor)[];
        default: undefined;
    };
    elevation: {
        type: (StringConstructor | NumberConstructor)[];
        validator(v: any): boolean;
    };
    density: {
        type: PropType<"default" | "comfortable" | "compact" | null>;
        default: string;
        validator: (v: any) => boolean;
    };
    border: (StringConstructor | NumberConstructor | BooleanConstructor)[];
    collapse: BooleanConstructor;
    color: StringConstructor;
    flat: BooleanConstructor;
    height: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    extensionHeight: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    floating: BooleanConstructor;
    image: StringConstructor;
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    prominent: BooleanConstructor;
    prominentHeight: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    position: {
        type: PropType<"bottom" | "top">;
        default: string;
        validator: (value: any) => boolean;
    };
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (value: boolean) => true;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    tag?: unknown;
    name?: unknown;
    priority?: unknown;
    absolute?: unknown;
    rounded?: unknown;
    elevation?: unknown;
    density?: unknown;
    border?: unknown;
    collapse?: unknown;
    color?: unknown;
    flat?: unknown;
    height?: unknown;
    extensionHeight?: unknown;
    floating?: unknown;
    image?: unknown;
    modelValue?: unknown;
    prominent?: unknown;
    prominentHeight?: unknown;
    position?: unknown;
} & {
    height: string | number;
    flat: boolean;
    tag: string;
    priority: string | number;
    absolute: boolean;
    position: "bottom" | "top";
    density: "default" | "comfortable" | "compact" | null;
    collapse: boolean;
    extensionHeight: string | number;
    floating: boolean;
    modelValue: boolean;
    prominent: boolean;
    prominentHeight: string | number;
} & {
    name?: string | undefined;
    image?: string | undefined;
    border?: string | number | boolean | undefined;
    elevation?: string | number | undefined;
    rounded?: string | number | boolean | undefined;
    color?: string | undefined;
}> & {
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
}, {
    height: string | number;
    flat: boolean;
    tag: string;
    priority: string | number;
    absolute: boolean;
    position: "bottom" | "top";
    density: "default" | "comfortable" | "compact" | null;
    rounded: string | number | boolean;
    collapse: boolean;
    extensionHeight: string | number;
    floating: boolean;
    modelValue: boolean;
    prominent: boolean;
    prominentHeight: string | number;
}>;
declare type VAppBar = InstanceType<typeof VAppBar>;

declare const VAppBarNavIcon: vue.DefineComponent<{
    icon: {
        type: StringConstructor;
        default: string;
    };
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    icon?: unknown;
} & {
    icon: string;
} & {}>, {
    icon: string;
}>;

declare const VAppBarTitle: vue.DefineComponent<{
    tag: Omit<{
        type: StringConstructor;
        default: string;
    }, "default" | "type"> & {
        type: vue.PropType<string>;
        default: string;
    };
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    tag?: unknown;
} & {
    tag: string;
} & {}>, {
    tag: string;
}>;

declare const allowedTypes: readonly ["success", "info", "warning", "error"];
declare type ContextualType = typeof allowedTypes[number];
declare const VAlert: vue.DefineComponent<{
    color: StringConstructor;
    textColor: StringConstructor;
    variant: Omit<{
        type: PropType<"text" | "outlined" | "plain" | "contained" | "contained-flat" | "contained-text">;
        default: string;
        validator: (v: any) => boolean;
    }, "default" | "type"> & {
        type: PropType<"text" | "outlined" | "plain" | "contained" | "contained-flat" | "contained-text">;
        default: "text" | "outlined" | "plain" | "contained" | "contained-flat" | "contained-text";
    };
    theme: StringConstructor;
    tag: {
        type: StringConstructor;
        default: string;
    };
    rounded: {
        type: (StringConstructor | NumberConstructor | BooleanConstructor)[];
        default: undefined;
    };
    absolute: BooleanConstructor;
    bottom: (StringConstructor | NumberConstructor | BooleanConstructor)[];
    fixed: BooleanConstructor;
    left: (StringConstructor | NumberConstructor | BooleanConstructor)[];
    position: {
        type: PropType<"fixed" | "absolute" | "relative" | "static" | "sticky">;
        validator: (v: any) => boolean;
    };
    right: (StringConstructor | NumberConstructor | BooleanConstructor)[];
    top: (StringConstructor | NumberConstructor | BooleanConstructor)[];
    elevation: {
        type: (StringConstructor | NumberConstructor)[];
        validator(v: any): boolean;
    };
    density: {
        type: PropType<"default" | "comfortable" | "compact" | null>;
        default: string;
        validator: (v: any) => boolean;
    };
    border: {
        type: (StringConstructor | BooleanConstructor)[];
        validator: (val: boolean | string) => boolean;
    };
    borderColor: StringConstructor;
    closable: BooleanConstructor;
    closeIcon: {
        type: StringConstructor;
        default: string;
    };
    closeLabel: {
        type: StringConstructor;
        default: string;
    };
    icon: {
        type: PropType<string | false>;
        default: null;
    };
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    prominent: BooleanConstructor;
    title: StringConstructor;
    text: StringConstructor;
    type: {
        type: PropType<"success" | "warning" | "error" | "info">;
        validator: (val: ContextualType) => boolean;
    };
}, () => false | JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (value: boolean) => true;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    color?: unknown;
    textColor?: unknown;
    variant?: unknown;
    theme?: unknown;
    tag?: unknown;
    rounded?: unknown;
    absolute?: unknown;
    bottom?: unknown;
    fixed?: unknown;
    left?: unknown;
    position?: unknown;
    right?: unknown;
    top?: unknown;
    elevation?: unknown;
    density?: unknown;
    border?: unknown;
    borderColor?: unknown;
    closable?: unknown;
    closeIcon?: unknown;
    closeLabel?: unknown;
    icon?: unknown;
    modelValue?: unknown;
    prominent?: unknown;
    title?: unknown;
    text?: unknown;
    type?: unknown;
} & {
    fixed: boolean;
    tag: string;
    absolute: boolean;
    density: "default" | "comfortable" | "compact" | null;
    modelValue: boolean;
    prominent: boolean;
    icon: string | false;
    variant: "text" | "outlined" | "plain" | "contained" | "contained-flat" | "contained-text";
    closable: boolean;
    closeIcon: string;
    closeLabel: string;
} & {
    left?: string | number | boolean | undefined;
    right?: string | number | boolean | undefined;
    type?: "success" | "warning" | "error" | "info" | undefined;
    theme?: string | undefined;
    title?: string | undefined;
    bottom?: string | number | boolean | undefined;
    top?: string | number | boolean | undefined;
    position?: "fixed" | "absolute" | "relative" | "static" | "sticky" | undefined;
    text?: string | undefined;
    border?: string | boolean | undefined;
    elevation?: string | number | undefined;
    rounded?: string | number | boolean | undefined;
    color?: string | undefined;
    textColor?: string | undefined;
    borderColor?: string | undefined;
}> & {
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
}, {
    fixed: boolean;
    tag: string;
    absolute: boolean;
    density: "default" | "comfortable" | "compact" | null;
    rounded: string | number | boolean;
    modelValue: boolean;
    prominent: boolean;
    icon: string | false;
    variant: "text" | "outlined" | "plain" | "contained" | "contained-flat" | "contained-text";
    closable: boolean;
    closeIcon: string;
    closeLabel: string;
}>;
declare type VAlert = InstanceType<typeof VAlert>;

declare const VAlertTitle: vue.DefineComponent<{
    tag: {
        type: StringConstructor;
        default: string;
    };
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    tag?: unknown;
} & {
    tag: string;
} & {}>, {
    tag: string;
}>;

declare const VAvatar: vue.DefineComponent<{
    tag: {
        type: StringConstructor;
        default: string;
    };
    size: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    rounded: {
        type: (StringConstructor | NumberConstructor | BooleanConstructor)[];
        default: undefined;
    };
    density: {
        type: vue.PropType<"default" | "comfortable" | "compact" | null>;
        default: string;
        validator: (v: any) => boolean;
    };
    color: StringConstructor;
    left: BooleanConstructor;
    right: BooleanConstructor;
    icon: StringConstructor;
    image: StringConstructor;
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    tag?: unknown;
    size?: unknown;
    rounded?: unknown;
    density?: unknown;
    color?: unknown;
    left?: unknown;
    right?: unknown;
    icon?: unknown;
    image?: unknown;
} & {
    left: boolean;
    right: boolean;
    tag: string;
    density: "default" | "comfortable" | "compact" | null;
    size: string | number;
} & {
    image?: string | undefined;
    rounded?: string | number | boolean | undefined;
    color?: string | undefined;
    icon?: string | undefined;
}>, {
    left: boolean;
    right: boolean;
    tag: string;
    density: "default" | "comfortable" | "compact" | null;
    rounded: string | number | boolean;
    size: string | number;
}>;
declare type VAvatar = InstanceType<typeof VAvatar>;

declare const VBadge: vue.DefineComponent<{
    transition: Omit<{
        type: vue.PropType<string | false | (vue.TransitionProps & {
            component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
        })>;
        default: string;
        validator: (val: unknown) => boolean;
    }, "default" | "type"> & {
        type: vue.PropType<string | false | (vue.TransitionProps & {
            component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
        })>;
        default: string | false | (vue.TransitionProps & {
            component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
        });
    };
    tag: {
        type: StringConstructor;
        default: string;
    };
    rounded: {
        type: (StringConstructor | NumberConstructor | BooleanConstructor)[];
        default: undefined;
    };
    bordered: BooleanConstructor;
    color: {
        type: StringConstructor;
        default: string;
    };
    content: StringConstructor;
    dot: BooleanConstructor;
    floating: BooleanConstructor;
    icon: StringConstructor;
    inline: BooleanConstructor;
    label: {
        type: StringConstructor;
        default: string;
    };
    location: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    max: (StringConstructor | NumberConstructor)[];
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    offsetX: (StringConstructor | NumberConstructor)[];
    offsetY: (StringConstructor | NumberConstructor)[];
    textColor: StringConstructor;
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    transition?: unknown;
    tag?: unknown;
    rounded?: unknown;
    bordered?: unknown;
    color?: unknown;
    content?: unknown;
    dot?: unknown;
    floating?: unknown;
    icon?: unknown;
    inline?: unknown;
    label?: unknown;
    location?: unknown;
    max?: unknown;
    modelValue?: unknown;
    offsetX?: unknown;
    offsetY?: unknown;
    textColor?: unknown;
} & {
    tag: string;
    label: string;
    transition: string | false | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    });
    color: string;
    floating: boolean;
    modelValue: boolean;
    inline: boolean;
    dot: boolean;
    bordered: boolean;
    location: string;
} & {
    rounded?: string | number | boolean | undefined;
    content?: string | undefined;
    icon?: string | undefined;
    textColor?: string | undefined;
    max?: string | number | undefined;
    offsetX?: string | number | undefined;
    offsetY?: string | number | undefined;
}>, {
    tag: string;
    label: string;
    transition: string | false | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    });
    rounded: string | number | boolean;
    color: string;
    floating: boolean;
    modelValue: boolean;
    inline: boolean;
    dot: boolean;
    bordered: boolean;
    location: string;
}>;
declare type VBadge = InstanceType<typeof VBadge>;

declare const VBanner: vue.DefineComponent<{
    theme: StringConstructor;
    tag: {
        type: StringConstructor;
        default: string;
    };
    rounded: {
        type: (StringConstructor | NumberConstructor | BooleanConstructor)[];
        default: undefined;
    };
    absolute: BooleanConstructor;
    bottom: (StringConstructor | NumberConstructor | BooleanConstructor)[];
    fixed: BooleanConstructor;
    left: (StringConstructor | NumberConstructor | BooleanConstructor)[];
    position: {
        type: vue.PropType<"fixed" | "absolute" | "relative" | "static" | "sticky">;
        validator: (v: any) => boolean;
    };
    right: (StringConstructor | NumberConstructor | BooleanConstructor)[];
    top: (StringConstructor | NumberConstructor | BooleanConstructor)[];
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
        type: vue.PropType<"default" | "comfortable" | "compact" | null>;
        default: string;
        validator: (v: any) => boolean;
    };
    border: (StringConstructor | NumberConstructor | BooleanConstructor)[];
    avatar: StringConstructor;
    color: StringConstructor;
    icon: StringConstructor;
    lines: {
        type: StringConstructor;
        default: string;
    };
    sticky: BooleanConstructor;
    text: StringConstructor;
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    theme?: unknown;
    tag?: unknown;
    rounded?: unknown;
    absolute?: unknown;
    bottom?: unknown;
    fixed?: unknown;
    left?: unknown;
    position?: unknown;
    right?: unknown;
    top?: unknown;
    elevation?: unknown;
    height?: unknown;
    maxHeight?: unknown;
    maxWidth?: unknown;
    minHeight?: unknown;
    minWidth?: unknown;
    width?: unknown;
    density?: unknown;
    border?: unknown;
    avatar?: unknown;
    color?: unknown;
    icon?: unknown;
    lines?: unknown;
    sticky?: unknown;
    text?: unknown;
} & {
    fixed: boolean;
    tag: string;
    absolute: boolean;
    density: "default" | "comfortable" | "compact" | null;
    sticky: boolean;
    lines: string;
} & {
    width?: string | number | undefined;
    height?: string | number | undefined;
    left?: string | number | boolean | undefined;
    right?: string | number | boolean | undefined;
    theme?: string | undefined;
    bottom?: string | number | boolean | undefined;
    top?: string | number | boolean | undefined;
    position?: "fixed" | "absolute" | "relative" | "static" | "sticky" | undefined;
    text?: string | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
    border?: string | number | boolean | undefined;
    elevation?: string | number | undefined;
    rounded?: string | number | boolean | undefined;
    color?: string | undefined;
    icon?: string | undefined;
    avatar?: string | undefined;
}>, {
    fixed: boolean;
    tag: string;
    absolute: boolean;
    density: "default" | "comfortable" | "compact" | null;
    rounded: string | number | boolean;
    sticky: boolean;
    lines: string;
}>;
declare type VBanner = InstanceType<typeof VBanner>;

declare const VBannerActions: vue.DefineComponent<{
    tag: {
        type: StringConstructor;
        default: string;
    };
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    tag?: unknown;
} & {
    tag: string;
} & {}>, {
    tag: string;
}>;

declare const VBannerAvatar: vue.DefineComponent<{
    tag: {
        type: StringConstructor;
        default: string;
    };
    left: BooleanConstructor;
    right: BooleanConstructor;
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    tag?: unknown;
    left?: unknown;
    right?: unknown;
} & {
    left: boolean;
    right: boolean;
    tag: string;
} & {}>, {
    left: boolean;
    right: boolean;
    tag: string;
}>;

declare const VBannerContent: vue.DefineComponent<{
    tag: {
        type: StringConstructor;
        default: string;
    };
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    tag?: unknown;
} & {
    tag: string;
} & {}>, {
    tag: string;
}>;

declare const VBannerText: vue.DefineComponent<{
    tag: {
        type: StringConstructor;
        default: string;
    };
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    tag?: unknown;
} & {
    tag: string;
} & {}>, {
    tag: string;
}>;

declare const VBottomNavigation: vue.DefineComponent<{
    theme: StringConstructor;
    modelValue: Omit<{
        type: null;
        default: undefined;
    }, "default" | "type"> & {
        type: vue.PropType<any>;
        default: any;
    };
    multiple: BooleanConstructor;
    mandatory: vue.PropType<boolean | "force">;
    max: NumberConstructor;
    selectedClass: {
        type: vue.PropType<string>;
        default: string;
    };
    disabled: BooleanConstructor;
    tag: Omit<{
        type: StringConstructor;
        default: string;
    }, "default" | "type"> & {
        type: vue.PropType<string>;
        default: string;
    };
    name: Omit<{
        type: StringConstructor;
    }, "default" | "type"> & {
        type: vue.PropType<string>;
        default: string;
    };
    priority: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    absolute: BooleanConstructor;
    rounded: {
        type: (StringConstructor | NumberConstructor | BooleanConstructor)[];
        default: undefined;
    };
    elevation: {
        type: (StringConstructor | NumberConstructor)[];
        validator(v: any): boolean;
    };
    density: {
        type: vue.PropType<"default" | "comfortable" | "compact" | null>;
        default: string;
        validator: (v: any) => boolean;
    };
    border: (StringConstructor | NumberConstructor | BooleanConstructor)[];
    bgColor: StringConstructor;
    color: StringConstructor;
    grow: BooleanConstructor;
    mode: {
        type: StringConstructor;
        validator: (v: any) => boolean;
    };
    height: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (value: any) => true;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    theme?: unknown;
    modelValue?: unknown;
    multiple?: unknown;
    mandatory?: unknown;
    max?: unknown;
    selectedClass?: unknown;
    disabled?: unknown;
    tag?: unknown;
    name?: unknown;
    priority?: unknown;
    absolute?: unknown;
    rounded?: unknown;
    elevation?: unknown;
    density?: unknown;
    border?: unknown;
    bgColor?: unknown;
    color?: unknown;
    grow?: unknown;
    mode?: unknown;
    height?: unknown;
} & {
    height: string | number;
    name: string;
    tag: string;
    priority: string | number;
    absolute: boolean;
    density: "default" | "comfortable" | "compact" | null;
    multiple: boolean;
    disabled: boolean;
    selectedClass: string;
    grow: boolean;
} & {
    mode?: string | undefined;
    theme?: string | undefined;
    border?: string | number | boolean | undefined;
    elevation?: string | number | undefined;
    rounded?: string | number | boolean | undefined;
    color?: string | undefined;
    modelValue?: any;
    mandatory?: boolean | "force" | undefined;
    max?: number | undefined;
    bgColor?: string | undefined;
}> & {
    "onUpdate:modelValue"?: ((value: any) => any) | undefined;
}, {
    height: string | number;
    name: string;
    tag: string;
    priority: string | number;
    absolute: boolean;
    density: "default" | "comfortable" | "compact" | null;
    rounded: string | number | boolean;
    modelValue: any;
    multiple: boolean;
    disabled: boolean;
    selectedClass: string;
    grow: boolean;
}>;
declare type VBottomNavigation = InstanceType<typeof VBottomNavigation>;

interface LinkProps {
    href?: string;
    replace?: boolean;
    to?: RouteLocationRaw;
}

declare type BreadcrumbItem = string | (LinkProps & {
    text: string;
});
declare const VBreadcrumbs: vue.DefineComponent<{
    tag: Omit<{
        type: StringConstructor;
        default: string;
    }, "default" | "type"> & {
        type: PropType<string>;
        default: string;
    };
    rounded: {
        type: (StringConstructor | NumberConstructor | BooleanConstructor)[];
        default: undefined;
    };
    density: {
        type: PropType<"default" | "comfortable" | "compact" | null>;
        default: string;
        validator: (v: any) => boolean;
    };
    activeClass: StringConstructor;
    bgColor: StringConstructor;
    color: StringConstructor;
    disabled: BooleanConstructor;
    divider: {
        type: StringConstructor;
        default: string;
    };
    icon: StringConstructor;
    items: {
        type: PropType<BreadcrumbItem[]>;
        default: () => never[];
    };
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    tag?: unknown;
    rounded?: unknown;
    density?: unknown;
    activeClass?: unknown;
    bgColor?: unknown;
    color?: unknown;
    disabled?: unknown;
    divider?: unknown;
    icon?: unknown;
    items?: unknown;
} & {
    tag: string;
    items: BreadcrumbItem[];
    density: "default" | "comfortable" | "compact" | null;
    disabled: boolean;
    divider: string;
} & {
    rounded?: string | number | boolean | undefined;
    color?: string | undefined;
    icon?: string | undefined;
    bgColor?: string | undefined;
    activeClass?: string | undefined;
}>, {
    tag: string;
    items: BreadcrumbItem[];
    density: "default" | "comfortable" | "compact" | null;
    rounded: string | number | boolean;
    disabled: boolean;
    divider: string;
}>;
declare type VBreadcrumbs = InstanceType<typeof VBreadcrumbs>;

declare const VBreadcrumbsItem: vue.DefineComponent<{
    tag: Omit<{
        type: StringConstructor;
        default: string;
    }, "default" | "type"> & {
        type: vue.PropType<string>;
        default: string;
    };
    href: StringConstructor;
    replace: BooleanConstructor;
    to: vue.PropType<vue_router.RouteLocationRaw>;
    active: BooleanConstructor;
    activeClass: StringConstructor;
    activeColor: StringConstructor;
    color: StringConstructor;
    disabled: BooleanConstructor;
    text: StringConstructor;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    tag?: unknown;
    href?: unknown;
    replace?: unknown;
    to?: unknown;
    active?: unknown;
    activeClass?: unknown;
    activeColor?: unknown;
    color?: unknown;
    disabled?: unknown;
    text?: unknown;
} & {
    replace: boolean;
    tag: string;
    active: boolean;
    disabled: boolean;
} & {
    text?: string | undefined;
    color?: string | undefined;
    to?: vue_router.RouteLocationRaw | undefined;
    href?: string | undefined;
    activeClass?: string | undefined;
    activeColor?: string | undefined;
}>, {
    replace: boolean;
    tag: string;
    active: boolean;
    disabled: boolean;
}>;
declare type VBreadcrumbsItem = InstanceType<typeof VBreadcrumbsItem>;

declare const VBreadcrumbsDivider: vue.DefineComponent<{
    tag: {
        type: StringConstructor;
        default: string;
    };
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    tag?: unknown;
} & {
    tag: string;
} & {}>, {
    tag: string;
}>;

declare const VBtn: vue.DefineComponent<{
    color: StringConstructor;
    textColor: StringConstructor;
    variant: Omit<{
        type: vue.PropType<"text" | "outlined" | "plain" | "contained" | "contained-flat" | "contained-text">;
        default: string;
        validator: (v: any) => boolean;
    }, "default" | "type"> & {
        type: vue.PropType<"text" | "outlined" | "plain" | "contained" | "contained-flat" | "contained-text">;
        default: "text" | "outlined" | "plain" | "contained" | "contained-flat" | "contained-text";
    };
    theme: StringConstructor;
    tag: Omit<{
        type: StringConstructor;
        default: string;
    }, "default" | "type"> & {
        type: vue.PropType<string>;
        default: string;
    };
    size: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    href: StringConstructor;
    replace: BooleanConstructor;
    to: vue.PropType<vue_router.RouteLocationRaw>;
    absolute: BooleanConstructor;
    bottom: (StringConstructor | NumberConstructor | BooleanConstructor)[];
    fixed: BooleanConstructor;
    left: (StringConstructor | NumberConstructor | BooleanConstructor)[];
    position: {
        type: vue.PropType<"fixed" | "absolute" | "relative" | "static" | "sticky">;
        validator: (v: any) => boolean;
    };
    right: (StringConstructor | NumberConstructor | BooleanConstructor)[];
    top: (StringConstructor | NumberConstructor | BooleanConstructor)[];
    value: null;
    disabled: BooleanConstructor;
    selectedClass: StringConstructor;
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
        type: vue.PropType<"default" | "comfortable" | "compact" | null>;
        default: string;
        validator: (v: any) => boolean;
    };
    rounded: {
        type: (StringConstructor | NumberConstructor | BooleanConstructor)[];
        default: undefined;
    };
    border: (StringConstructor | NumberConstructor | BooleanConstructor)[];
    flat: BooleanConstructor;
    icon: (StringConstructor | BooleanConstructor)[];
    prependIcon: StringConstructor;
    appendIcon: StringConstructor;
    block: BooleanConstructor;
    stacked: BooleanConstructor;
    ripple: {
        type: BooleanConstructor;
        default: boolean;
    };
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    color?: unknown;
    textColor?: unknown;
    variant?: unknown;
    theme?: unknown;
    tag?: unknown;
    size?: unknown;
    href?: unknown;
    replace?: unknown;
    to?: unknown;
    absolute?: unknown;
    bottom?: unknown;
    fixed?: unknown;
    left?: unknown;
    position?: unknown;
    right?: unknown;
    top?: unknown;
    value?: unknown;
    disabled?: unknown;
    selectedClass?: unknown;
    elevation?: unknown;
    height?: unknown;
    maxHeight?: unknown;
    maxWidth?: unknown;
    minHeight?: unknown;
    minWidth?: unknown;
    width?: unknown;
    density?: unknown;
    rounded?: unknown;
    border?: unknown;
    flat?: unknown;
    icon?: unknown;
    prependIcon?: unknown;
    appendIcon?: unknown;
    block?: unknown;
    stacked?: unknown;
    ripple?: unknown;
} & {
    replace: boolean;
    fixed: boolean;
    flat: boolean;
    tag: string;
    absolute: boolean;
    density: "default" | "comfortable" | "compact" | null;
    size: string | number;
    block: boolean;
    disabled: boolean;
    variant: "text" | "outlined" | "plain" | "contained" | "contained-flat" | "contained-text";
    stacked: boolean;
    ripple: boolean;
} & {
    width?: string | number | undefined;
    height?: string | number | undefined;
    left?: string | number | boolean | undefined;
    right?: string | number | boolean | undefined;
    value?: any;
    theme?: string | undefined;
    bottom?: string | number | boolean | undefined;
    top?: string | number | boolean | undefined;
    position?: "fixed" | "absolute" | "relative" | "static" | "sticky" | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
    border?: string | number | boolean | undefined;
    elevation?: string | number | undefined;
    rounded?: string | number | boolean | undefined;
    color?: string | undefined;
    icon?: string | boolean | undefined;
    textColor?: string | undefined;
    selectedClass?: string | undefined;
    to?: vue_router.RouteLocationRaw | undefined;
    href?: string | undefined;
    prependIcon?: string | undefined;
    appendIcon?: string | undefined;
}>, {
    replace: boolean;
    fixed: boolean;
    flat: boolean;
    tag: string;
    absolute: boolean;
    density: "default" | "comfortable" | "compact" | null;
    rounded: string | number | boolean;
    size: string | number;
    block: boolean;
    disabled: boolean;
    variant: "text" | "outlined" | "plain" | "contained" | "contained-flat" | "contained-text";
    stacked: boolean;
    ripple: boolean;
}>;
declare type VBtn = InstanceType<typeof VBtn>;

declare const VBtnGroup: vue.DefineComponent<{
    color: StringConstructor;
    textColor: StringConstructor;
    variant: {
        type: vue.PropType<"text" | "outlined" | "plain" | "contained" | "contained-flat" | "contained-text">;
        default: string;
        validator: (v: any) => boolean;
    };
    theme: StringConstructor;
    tag: {
        type: StringConstructor;
        default: string;
    };
    rounded: {
        type: (StringConstructor | NumberConstructor | BooleanConstructor)[];
        default: undefined;
    };
    elevation: {
        type: (StringConstructor | NumberConstructor)[];
        validator(v: any): boolean;
    };
    density: {
        type: vue.PropType<"default" | "comfortable" | "compact" | null>;
        default: string;
        validator: (v: any) => boolean;
    };
    border: (StringConstructor | NumberConstructor | BooleanConstructor)[];
    divided: BooleanConstructor;
}, void, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    color?: unknown;
    textColor?: unknown;
    variant?: unknown;
    theme?: unknown;
    tag?: unknown;
    rounded?: unknown;
    elevation?: unknown;
    density?: unknown;
    border?: unknown;
    divided?: unknown;
} & {
    tag: string;
    density: "default" | "comfortable" | "compact" | null;
    variant: "text" | "outlined" | "plain" | "contained" | "contained-flat" | "contained-text";
    divided: boolean;
} & {
    theme?: string | undefined;
    border?: string | number | boolean | undefined;
    elevation?: string | number | undefined;
    rounded?: string | number | boolean | undefined;
    color?: string | undefined;
    textColor?: string | undefined;
}>, {
    tag: string;
    density: "default" | "comfortable" | "compact" | null;
    rounded: string | number | boolean;
    variant: "text" | "outlined" | "plain" | "contained" | "contained-flat" | "contained-text";
    divided: boolean;
}>;

interface GroupItem {
    id: number;
    value: Ref<unknown>;
    disabled: Ref<boolean | undefined>;
}
interface GroupProvide {
    register: (item: GroupItem, cmp: ComponentInternalInstance) => void;
    unregister: (id: number) => void;
    select: (id: number, value: boolean) => void;
    selected: Ref<any[]>;
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
}
interface GroupItemProvide {
    id: number;
    isSelected: Ref<boolean>;
    toggle: () => void;
    select: (value: boolean) => void;
    selectedClass: Ref<string | false | undefined>;
    value: Ref<unknown>;
    disabled: Ref<boolean | undefined>;
    group: GroupProvide;
}

declare type Slot<T extends any[] = any[]> = (...args: T) => VNodeChild;
declare type MakeSlots<T extends Record<string, any[]>> = {
    [K in keyof T]?: Slot<T[K]>;
};

declare function deepEqual(a: any, b: any): boolean;

declare type BtnToggleSlotProps = 'isSelected' | 'select' | 'selected' | 'next' | 'prev';
interface DefaultBtnToggleSlot extends Pick<GroupProvide, BtnToggleSlotProps> {
}
declare const VBtnToggle: {
    new (...args: any[]): {
        $: vue.ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            modelValue: any;
            multiple: boolean;
            disabled: boolean;
            selectedClass: string;
        }> & Omit<Readonly<{
            modelValue?: unknown;
            multiple?: unknown;
            mandatory?: unknown;
            max?: unknown;
            selectedClass?: unknown;
            disabled?: unknown;
            $children?: unknown;
            'v-slots'?: unknown;
        } & {
            multiple: boolean;
            disabled: boolean;
            selectedClass: string;
        } & {
            $children?: vue.VNodeChild | ((args_0: DefaultBtnToggleSlot) => vue.VNodeChild) | {
                default?: ((args_0: DefaultBtnToggleSlot) => vue.VNodeChild) | undefined;
            };
            "v-slots"?: {
                default?: false | ((args_0: DefaultBtnToggleSlot) => vue.VNodeChild) | undefined;
            } | undefined;
            modelValue?: any;
            mandatory?: boolean | "force" | undefined;
            max?: number | undefined;
        }> & {
            "onUpdate:modelValue"?: ((value: any) => any) | undefined;
        } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "modelValue" | "multiple" | "disabled" | "selectedClass">;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            [name: string]: vue.Slot | undefined;
        }>;
        $root: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
        $parent: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
        $emit: (event: "update:modelValue", value: any) => void;
        $el: any;
        $options: vue.ComponentOptionsBase<Readonly<{
            modelValue?: unknown;
            multiple?: unknown;
            mandatory?: unknown;
            max?: unknown;
            selectedClass?: unknown;
            disabled?: unknown;
            $children?: unknown;
            'v-slots'?: unknown;
        } & {
            multiple: boolean;
            disabled: boolean;
            selectedClass: string;
        } & {
            $children?: vue.VNodeChild | ((args_0: DefaultBtnToggleSlot) => vue.VNodeChild) | {
                default?: ((args_0: DefaultBtnToggleSlot) => vue.VNodeChild) | undefined;
            };
            "v-slots"?: {
                default?: false | ((args_0: DefaultBtnToggleSlot) => vue.VNodeChild) | undefined;
            } | undefined;
            modelValue?: any;
            mandatory?: boolean | "force" | undefined;
            max?: number | undefined;
        }> & {
            "onUpdate:modelValue"?: ((value: any) => any) | undefined;
        }, {
            next: () => void;
            prev: () => void;
            select: (id: number, isSelected: boolean) => void;
        }, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
            'update:modelValue': (value: any) => boolean;
        }, string, {
            modelValue: any;
            multiple: boolean;
            disabled: boolean;
            selectedClass: string;
        }> & {
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
            errorCaptured?: (((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void) | ((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void)[]) | undefined;
        };
        $forceUpdate: () => void;
        $nextTick: typeof vue.nextTick;
        $watch(source: string | Function, cb: Function, options?: vue.WatchOptions<boolean> | undefined): vue.WatchStopHandle;
    } & Readonly<{
        modelValue?: unknown;
        multiple?: unknown;
        mandatory?: unknown;
        max?: unknown;
        selectedClass?: unknown;
        disabled?: unknown;
        $children?: unknown;
        'v-slots'?: unknown;
    } & {
        multiple: boolean;
        disabled: boolean;
        selectedClass: string;
    } & {
        $children?: vue.VNodeChild | ((args_0: DefaultBtnToggleSlot) => vue.VNodeChild) | {
            default?: ((args_0: DefaultBtnToggleSlot) => vue.VNodeChild) | undefined;
        };
        "v-slots"?: {
            default?: false | ((args_0: DefaultBtnToggleSlot) => vue.VNodeChild) | undefined;
        } | undefined;
        modelValue?: any;
        mandatory?: boolean | "force" | undefined;
        max?: number | undefined;
    }> & {
        "onUpdate:modelValue"?: ((value: any) => any) | undefined;
    } & vue.ShallowUnwrapRef<{
        next: () => void;
        prev: () => void;
        select: (id: number, isSelected: boolean) => void;
    }> & {} & {} & vue.ComponentCustomProperties;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & vue.ComponentOptionsBase<Readonly<{
    modelValue?: unknown;
    multiple?: unknown;
    mandatory?: unknown;
    max?: unknown;
    selectedClass?: unknown;
    disabled?: unknown;
    $children?: unknown;
    'v-slots'?: unknown;
} & {
    multiple: boolean;
    disabled: boolean;
    selectedClass: string;
} & {
    $children?: vue.VNodeChild | ((args_0: DefaultBtnToggleSlot) => vue.VNodeChild) | {
        default?: ((args_0: DefaultBtnToggleSlot) => vue.VNodeChild) | undefined;
    };
    "v-slots"?: {
        default?: false | ((args_0: DefaultBtnToggleSlot) => vue.VNodeChild) | undefined;
    } | undefined;
    modelValue?: any;
    mandatory?: boolean | "force" | undefined;
    max?: number | undefined;
}> & {
    "onUpdate:modelValue"?: ((value: any) => any) | undefined;
}, {
    next: () => void;
    prev: () => void;
    select: (id: number, isSelected: boolean) => void;
}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (value: any) => boolean;
}, string, {
    modelValue: any;
    multiple: boolean;
    disabled: boolean;
    selectedClass: string;
}> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & (new <T>() => {
    $slots: MakeSlots<{
        default: [DefaultBtnToggleSlot];
    }>;
});

declare const VCard: vue.DefineComponent<{
    color: StringConstructor;
    textColor: StringConstructor;
    variant: Omit<{
        type: vue.PropType<"text" | "outlined" | "plain" | "contained" | "contained-flat" | "contained-text">;
        default: string;
        validator: (v: any) => boolean;
    }, "default" | "type"> & {
        type: vue.PropType<"text" | "outlined" | "plain" | "contained" | "contained-flat" | "contained-text">;
        default: "text" | "outlined" | "plain" | "contained" | "contained-flat" | "contained-text";
    };
    tag: {
        type: StringConstructor;
        default: string;
    };
    href: StringConstructor;
    replace: BooleanConstructor;
    to: vue.PropType<vue_router.RouteLocationRaw>;
    rounded: {
        type: (StringConstructor | NumberConstructor | BooleanConstructor)[];
        default: undefined;
    };
    absolute: BooleanConstructor;
    bottom: (StringConstructor | NumberConstructor | BooleanConstructor)[];
    fixed: BooleanConstructor;
    left: (StringConstructor | NumberConstructor | BooleanConstructor)[];
    position: {
        type: vue.PropType<"fixed" | "absolute" | "relative" | "static" | "sticky">;
        validator: (v: any) => boolean;
    };
    right: (StringConstructor | NumberConstructor | BooleanConstructor)[];
    top: (StringConstructor | NumberConstructor | BooleanConstructor)[];
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
        type: vue.PropType<"default" | "comfortable" | "compact" | null>;
        default: string;
        validator: (v: any) => boolean;
    };
    border: (StringConstructor | NumberConstructor | BooleanConstructor)[];
    theme: StringConstructor;
    appendAvatar: StringConstructor;
    appendIcon: StringConstructor;
    disabled: BooleanConstructor;
    flat: BooleanConstructor;
    hover: BooleanConstructor;
    image: StringConstructor;
    link: BooleanConstructor;
    prependAvatar: StringConstructor;
    prependIcon: StringConstructor;
    ripple: BooleanConstructor;
    subtitle: StringConstructor;
    text: StringConstructor;
    title: StringConstructor;
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    color?: unknown;
    textColor?: unknown;
    variant?: unknown;
    tag?: unknown;
    href?: unknown;
    replace?: unknown;
    to?: unknown;
    rounded?: unknown;
    absolute?: unknown;
    bottom?: unknown;
    fixed?: unknown;
    left?: unknown;
    position?: unknown;
    right?: unknown;
    top?: unknown;
    elevation?: unknown;
    height?: unknown;
    maxHeight?: unknown;
    maxWidth?: unknown;
    minHeight?: unknown;
    minWidth?: unknown;
    width?: unknown;
    density?: unknown;
    border?: unknown;
    theme?: unknown;
    appendAvatar?: unknown;
    appendIcon?: unknown;
    disabled?: unknown;
    flat?: unknown;
    hover?: unknown;
    image?: unknown;
    link?: unknown;
    prependAvatar?: unknown;
    prependIcon?: unknown;
    ripple?: unknown;
    subtitle?: unknown;
    text?: unknown;
    title?: unknown;
} & {
    replace: boolean;
    fixed: boolean;
    link: boolean;
    flat: boolean;
    tag: string;
    absolute: boolean;
    density: "default" | "comfortable" | "compact" | null;
    disabled: boolean;
    variant: "text" | "outlined" | "plain" | "contained" | "contained-flat" | "contained-text";
    ripple: boolean;
    hover: boolean;
} & {
    width?: string | number | undefined;
    height?: string | number | undefined;
    left?: string | number | boolean | undefined;
    right?: string | number | boolean | undefined;
    theme?: string | undefined;
    title?: string | undefined;
    bottom?: string | number | boolean | undefined;
    top?: string | number | boolean | undefined;
    position?: "fixed" | "absolute" | "relative" | "static" | "sticky" | undefined;
    image?: string | undefined;
    text?: string | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
    border?: string | number | boolean | undefined;
    elevation?: string | number | undefined;
    rounded?: string | number | boolean | undefined;
    color?: string | undefined;
    textColor?: string | undefined;
    to?: vue_router.RouteLocationRaw | undefined;
    href?: string | undefined;
    prependIcon?: string | undefined;
    appendIcon?: string | undefined;
    appendAvatar?: string | undefined;
    prependAvatar?: string | undefined;
    subtitle?: string | undefined;
}>, {
    replace: boolean;
    fixed: boolean;
    link: boolean;
    flat: boolean;
    tag: string;
    absolute: boolean;
    density: "default" | "comfortable" | "compact" | null;
    rounded: string | number | boolean;
    disabled: boolean;
    variant: "text" | "outlined" | "plain" | "contained" | "contained-flat" | "contained-text";
    ripple: boolean;
    hover: boolean;
}>;
declare type VCard = InstanceType<typeof VCard>;

declare const VCardActions: vue.DefineComponent<{
    tag: {
        type: StringConstructor;
        default: string;
    };
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    tag?: unknown;
} & {
    tag: string;
} & {}>, {
    tag: string;
}>;

declare const VCardAvatar: vue.DefineComponent<{
    tag: {
        type: StringConstructor;
        default: string;
    };
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    tag?: unknown;
} & {
    tag: string;
} & {}>, {
    tag: string;
}>;

declare const VCardHeader: vue.DefineComponent<{
    tag: {
        type: StringConstructor;
        default: string;
    };
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    tag?: unknown;
} & {
    tag: string;
} & {}>, {
    tag: string;
}>;

declare const VCardHeaderText: vue.DefineComponent<{
    tag: {
        type: StringConstructor;
        default: string;
    };
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    tag?: unknown;
} & {
    tag: string;
} & {}>, {
    tag: string;
}>;

declare const VCardImg: vue.DefineComponent<{
    tag: {
        type: StringConstructor;
        default: string;
    };
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    tag?: unknown;
} & {
    tag: string;
} & {}>, {
    tag: string;
}>;

declare const VCardSubtitle: vue.DefineComponent<{
    tag: {
        type: StringConstructor;
        default: string;
    };
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    tag?: unknown;
} & {
    tag: string;
} & {}>, {
    tag: string;
}>;

declare const VCardText: vue.DefineComponent<{
    tag: {
        type: StringConstructor;
        default: string;
    };
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    tag?: unknown;
} & {
    tag: string;
} & {}>, {
    tag: string;
}>;

declare const VCardTitle: vue.DefineComponent<{
    tag: {
        type: StringConstructor;
        default: string;
    };
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    tag?: unknown;
} & {
    tag: string;
} & {}>, {
    tag: string;
}>;

declare type ValidationResult = string | true;
declare type ValidationRule = ValidationResult | PromiseLike<ValidationResult> | ((value: any) => ValidationResult) | ((value: any) => PromiseLike<ValidationResult>);

declare const VCheckbox: vue.DefineComponent<{
    falseIcon: {
        type: StringConstructor;
        default: string;
    };
    trueIcon: {
        type: StringConstructor;
        default: string;
    };
    density: {
        type: vue.PropType<"default" | "comfortable" | "compact" | null>;
        default: string;
        validator: (v: any) => boolean;
    };
    theme: StringConstructor;
    color: StringConstructor;
    disabled: BooleanConstructor;
    error: BooleanConstructor;
    id: StringConstructor;
    inline: BooleanConstructor;
    label: StringConstructor;
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
    trueValue: null;
    falseValue: null;
    modelValue: null;
    type: StringConstructor;
    value: null;
    valueComparator: {
        type: vue.PropType<typeof deepEqual>;
        default: typeof deepEqual;
    };
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
    appendIcon: StringConstructor;
    prependIcon: StringConstructor;
    hideDetails: vue.PropType<boolean | "auto">;
    messages: {
        type: vue.PropType<string | string[]>;
        default: () => never[];
    };
    direction: {
        type: vue.PropType<"horizontal" | "vertical">;
        default: string;
        validator: (v: any) => boolean;
    };
    indeterminate: BooleanConstructor;
    indeterminateIcon: {
        type: StringConstructor;
        default: string;
    };
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:indeterminate': (val: boolean) => true;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    falseIcon?: unknown;
    trueIcon?: unknown;
    density?: unknown;
    theme?: unknown;
    color?: unknown;
    disabled?: unknown;
    error?: unknown;
    id?: unknown;
    inline?: unknown;
    label?: unknown;
    ripple?: unknown;
    multiple?: unknown;
    name?: unknown;
    readonly?: unknown;
    trueValue?: unknown;
    falseValue?: unknown;
    modelValue?: unknown;
    type?: unknown;
    value?: unknown;
    valueComparator?: unknown;
    errorMessages?: unknown;
    maxErrors?: unknown;
    rules?: unknown;
    appendIcon?: unknown;
    prependIcon?: unknown;
    hideDetails?: unknown;
    messages?: unknown;
    direction?: unknown;
    indeterminate?: unknown;
    indeterminateIcon?: unknown;
} & {
    error: boolean;
    messages: string | string[];
    density: "default" | "comfortable" | "compact" | null;
    inline: boolean;
    multiple: boolean | null;
    disabled: boolean;
    ripple: boolean;
    readonly: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    direction: "horizontal" | "vertical";
    falseIcon: string;
    trueIcon: string;
    valueComparator: typeof deepEqual;
    indeterminate: boolean;
    indeterminateIcon: string;
} & {
    id?: string | undefined;
    name?: string | undefined;
    value?: any;
    type?: string | undefined;
    theme?: string | undefined;
    label?: string | undefined;
    color?: string | undefined;
    modelValue?: any;
    prependIcon?: string | undefined;
    appendIcon?: string | undefined;
    hideDetails?: boolean | "auto" | undefined;
    trueValue?: any;
    falseValue?: any;
}> & {
    "onUpdate:indeterminate"?: ((val: boolean) => any) | undefined;
}, {
    error: boolean;
    messages: string | string[];
    density: "default" | "comfortable" | "compact" | null;
    inline: boolean;
    multiple: boolean | null;
    disabled: boolean;
    ripple: boolean;
    readonly: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    direction: "horizontal" | "vertical";
    falseIcon: string;
    trueIcon: string;
    valueComparator: typeof deepEqual;
    indeterminate: boolean;
    indeterminateIcon: string;
}>;
declare type VCheckbox = InstanceType<typeof VCheckbox>;

declare const VChip: vue.DefineComponent<{
    color: StringConstructor;
    textColor: StringConstructor;
    variant: Omit<{
        type: vue.PropType<"text" | "outlined" | "plain" | "contained" | "contained-flat" | "contained-text">;
        default: string;
        validator: (v: any) => boolean;
    }, "default" | "type"> & {
        type: vue.PropType<"text" | "outlined" | "plain" | "contained" | "contained-flat" | "contained-text">;
        default: "text" | "outlined" | "plain" | "contained" | "contained-flat" | "contained-text";
    };
    theme: StringConstructor;
    tag: Omit<{
        type: StringConstructor;
        default: string;
    }, "default" | "type"> & {
        type: vue.PropType<string>;
        default: string;
    };
    size: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    href: StringConstructor;
    replace: BooleanConstructor;
    to: vue.PropType<vue_router.RouteLocationRaw>;
    rounded: {
        type: (StringConstructor | NumberConstructor | BooleanConstructor)[];
        default: undefined;
    };
    value: null;
    disabled: BooleanConstructor;
    selectedClass: StringConstructor;
    elevation: {
        type: (StringConstructor | NumberConstructor)[];
        validator(v: any): boolean;
    };
    density: {
        type: vue.PropType<"default" | "comfortable" | "compact" | null>;
        default: string;
        validator: (v: any) => boolean;
    };
    border: (StringConstructor | NumberConstructor | BooleanConstructor)[];
    activeClass: StringConstructor;
    appendAvatar: StringConstructor;
    appendIcon: StringConstructor;
    closable: BooleanConstructor;
    closeIcon: {
        type: StringConstructor;
        default: string;
    };
    closeLabel: {
        type: StringConstructor;
        default: string;
    };
    draggable: BooleanConstructor;
    filter: BooleanConstructor;
    filterIcon: {
        type: StringConstructor;
        default: string;
    };
    label: BooleanConstructor;
    link: BooleanConstructor;
    pill: BooleanConstructor;
    prependAvatar: StringConstructor;
    prependIcon: StringConstructor;
    ripple: {
        type: BooleanConstructor;
        default: boolean;
    };
    text: StringConstructor;
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
}, () => false | JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'click:close': (e: Event) => true;
    'update:active': (value: Boolean) => true;
    'update:modelValue': (value: Boolean) => true;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    color?: unknown;
    textColor?: unknown;
    variant?: unknown;
    theme?: unknown;
    tag?: unknown;
    size?: unknown;
    href?: unknown;
    replace?: unknown;
    to?: unknown;
    rounded?: unknown;
    value?: unknown;
    disabled?: unknown;
    selectedClass?: unknown;
    elevation?: unknown;
    density?: unknown;
    border?: unknown;
    activeClass?: unknown;
    appendAvatar?: unknown;
    appendIcon?: unknown;
    closable?: unknown;
    closeIcon?: unknown;
    closeLabel?: unknown;
    draggable?: unknown;
    filter?: unknown;
    filterIcon?: unknown;
    label?: unknown;
    link?: unknown;
    pill?: unknown;
    prependAvatar?: unknown;
    prependIcon?: unknown;
    ripple?: unknown;
    text?: unknown;
    modelValue?: unknown;
} & {
    replace: boolean;
    link: boolean;
    filter: boolean;
    tag: string;
    label: boolean;
    density: "default" | "comfortable" | "compact" | null;
    modelValue: boolean;
    size: string | number;
    disabled: boolean;
    variant: "text" | "outlined" | "plain" | "contained" | "contained-flat" | "contained-text";
    ripple: boolean;
    closable: boolean;
    closeIcon: string;
    closeLabel: string;
    draggable: boolean;
    filterIcon: string;
    pill: boolean;
} & {
    value?: any;
    theme?: string | undefined;
    text?: string | undefined;
    border?: string | number | boolean | undefined;
    elevation?: string | number | undefined;
    rounded?: string | number | boolean | undefined;
    color?: string | undefined;
    textColor?: string | undefined;
    selectedClass?: string | undefined;
    to?: vue_router.RouteLocationRaw | undefined;
    href?: string | undefined;
    prependIcon?: string | undefined;
    appendIcon?: string | undefined;
    activeClass?: string | undefined;
    appendAvatar?: string | undefined;
    prependAvatar?: string | undefined;
}> & {
    "onUpdate:modelValue"?: ((value: Boolean) => any) | undefined;
    "onClick:close"?: ((e: Event) => any) | undefined;
    "onUpdate:active"?: ((value: Boolean) => any) | undefined;
}, {
    replace: boolean;
    link: boolean;
    filter: boolean;
    tag: string;
    label: boolean;
    density: "default" | "comfortable" | "compact" | null;
    rounded: string | number | boolean;
    modelValue: boolean;
    size: string | number;
    disabled: boolean;
    variant: "text" | "outlined" | "plain" | "contained" | "contained-flat" | "contained-text";
    ripple: boolean;
    closable: boolean;
    closeIcon: string;
    closeLabel: string;
    draggable: boolean;
    filterIcon: string;
    pill: boolean;
}>;
declare type VChip = InstanceType<typeof VChip>;

declare const VChipGroup: vue.DefineComponent<{
    color: StringConstructor;
    textColor: StringConstructor;
    variant: Omit<{
        type: PropType<"text" | "outlined" | "plain" | "contained" | "contained-flat" | "contained-text">;
        default: string;
        validator: (v: any) => boolean;
    }, "default" | "type"> & {
        type: PropType<"text" | "outlined" | "plain" | "contained" | "contained-flat" | "contained-text">;
        default: "text" | "outlined" | "plain" | "contained" | "contained-flat" | "contained-text";
    };
    theme: StringConstructor;
    tag: {
        type: StringConstructor;
        default: string;
    };
    modelValue: {
        type: null;
        default: undefined;
    };
    multiple: BooleanConstructor;
    mandatory: PropType<boolean | "force">;
    max: NumberConstructor;
    selectedClass: {
        type: PropType<string>;
        default: string;
    };
    disabled: BooleanConstructor;
    column: BooleanConstructor;
    filter: BooleanConstructor;
    valueComparator: {
        type: PropType<typeof deepEqual>;
        default: typeof deepEqual;
    };
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (value: any) => true;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    color?: unknown;
    textColor?: unknown;
    variant?: unknown;
    theme?: unknown;
    tag?: unknown;
    modelValue?: unknown;
    multiple?: unknown;
    mandatory?: unknown;
    max?: unknown;
    selectedClass?: unknown;
    disabled?: unknown;
    column?: unknown;
    filter?: unknown;
    valueComparator?: unknown;
} & {
    filter: boolean;
    tag: string;
    column: boolean;
    multiple: boolean;
    disabled: boolean;
    variant: "text" | "outlined" | "plain" | "contained" | "contained-flat" | "contained-text";
    selectedClass: string;
    valueComparator: typeof deepEqual;
} & {
    theme?: string | undefined;
    color?: string | undefined;
    modelValue?: any;
    mandatory?: boolean | "force" | undefined;
    textColor?: string | undefined;
    max?: number | undefined;
}> & {
    "onUpdate:modelValue"?: ((value: any) => any) | undefined;
}, {
    filter: boolean;
    tag: string;
    modelValue: any;
    column: boolean;
    multiple: boolean;
    disabled: boolean;
    variant: "text" | "outlined" | "plain" | "contained" | "contained-flat" | "contained-text";
    selectedClass: string;
    valueComparator: typeof deepEqual;
}>;
declare type VChipGroup = InstanceType<typeof VChipGroup>;

declare const VCode: vue.DefineComponent<{
    tag: {
        type: StringConstructor;
        default: string;
    };
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    tag?: unknown;
} & {
    tag: string;
} & {}>, {
    tag: string;
}>;

declare const VCounter: vue.DefineComponent<{
    transition: Omit<{
        type: vue.PropType<string | false | (vue.TransitionProps & {
            component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
        })>;
        default: string;
        validator: (val: unknown) => boolean;
    }, "default" | "type"> & {
        type: vue.PropType<string | false | (vue.TransitionProps & {
            component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
        }) | {
            component: vue.DefineComponent<{
                group: BooleanConstructor;
                hideOnLeave: BooleanConstructor;
                leaveAbsolute: BooleanConstructor;
                mode: {
                    type: StringConstructor;
                    default: string | undefined;
                };
                origin: {
                    type: StringConstructor;
                    default: string;
                };
            }, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
                group?: unknown;
                hideOnLeave?: unknown;
                leaveAbsolute?: unknown;
                mode?: unknown;
                origin?: unknown;
            } & {
                mode: string;
                group: boolean;
                hideOnLeave: boolean;
                leaveAbsolute: boolean;
                origin: string;
            } & {}>, {
                mode: string;
                group: boolean;
                hideOnLeave: boolean;
                leaveAbsolute: boolean;
                origin: string;
            }>;
        }>;
        default: string | false | (vue.TransitionProps & {
            component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
        }) | {
            component: vue.DefineComponent<{
                group: BooleanConstructor;
                hideOnLeave: BooleanConstructor;
                leaveAbsolute: BooleanConstructor;
                mode: {
                    type: StringConstructor;
                    default: string | undefined;
                };
                origin: {
                    type: StringConstructor;
                    default: string;
                };
            }, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
                group?: unknown;
                hideOnLeave?: unknown;
                leaveAbsolute?: unknown;
                mode?: unknown;
                origin?: unknown;
            } & {
                mode: string;
                group: boolean;
                hideOnLeave: boolean;
                leaveAbsolute: boolean;
                origin: string;
            } & {}>, {
                mode: string;
                group: boolean;
                hideOnLeave: boolean;
                leaveAbsolute: boolean;
                origin: string;
            }>;
        };
    };
    active: BooleanConstructor;
    max: (StringConstructor | NumberConstructor)[];
    value: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    transition?: unknown;
    active?: unknown;
    max?: unknown;
    value?: unknown;
} & {
    value: string | number;
    transition: string | false | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    }) | {
        component: vue.DefineComponent<{
            group: BooleanConstructor;
            hideOnLeave: BooleanConstructor;
            leaveAbsolute: BooleanConstructor;
            mode: {
                type: StringConstructor;
                default: string | undefined;
            };
            origin: {
                type: StringConstructor;
                default: string;
            };
        }, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
            group?: unknown;
            hideOnLeave?: unknown;
            leaveAbsolute?: unknown;
            mode?: unknown;
            origin?: unknown;
        } & {
            mode: string;
            group: boolean;
            hideOnLeave: boolean;
            leaveAbsolute: boolean;
            origin: string;
        } & {}>, {
            mode: string;
            group: boolean;
            hideOnLeave: boolean;
            leaveAbsolute: boolean;
            origin: string;
        }>;
    };
    active: boolean;
} & {
    max?: string | number | undefined;
}>, {
    value: string | number;
    transition: string | false | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    }) | {
        component: vue.DefineComponent<{
            group: BooleanConstructor;
            hideOnLeave: BooleanConstructor;
            leaveAbsolute: BooleanConstructor;
            mode: {
                type: StringConstructor;
                default: string | undefined;
            };
            origin: {
                type: StringConstructor;
                default: string;
            };
        }, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
            group?: unknown;
            hideOnLeave?: unknown;
            leaveAbsolute?: unknown;
            mode?: unknown;
            origin?: unknown;
        } & {
            mode: string;
            group: boolean;
            hideOnLeave: boolean;
            leaveAbsolute: boolean;
            origin: string;
        } & {}>, {
            mode: string;
            group: boolean;
            hideOnLeave: boolean;
            leaveAbsolute: boolean;
            origin: string;
        }>;
    };
    active: boolean;
}>;

interface DefaultsInstance {
    [key: string]: undefined | Record<string, unknown>;
    global?: Record<string, unknown>;
}
declare type DefaultsOptions = Partial<DefaultsInstance>;

declare const VDefaultsProvider: vue.DefineComponent<{
    defaults: PropType<Partial<DefaultsInstance>>;
    reset: (StringConstructor | NumberConstructor)[];
    root: BooleanConstructor;
    scoped: BooleanConstructor;
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>[] | undefined, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    defaults?: unknown;
    reset?: unknown;
    root?: unknown;
    scoped?: unknown;
} & {
    scoped: boolean;
    root: boolean;
} & {
    reset?: string | number | undefined;
    defaults?: Partial<DefaultsInstance> | undefined;
}>, {
    scoped: boolean;
    root: boolean;
}>;

interface ScrollStrategyData {
    root: Ref<HTMLElement | undefined>;
    contentEl: Ref<HTMLElement | undefined>;
    activatorEl: Ref<HTMLElement | undefined>;
    isActive: Ref<boolean>;
    updatePosition: Ref<((e: Event) => void) | undefined>;
}

declare const block: readonly ["top", "bottom"];
declare const inline: readonly ["start", "end"];
declare type Tblock = typeof block[number];
declare type Tinline = typeof inline[number];
declare type Anchor = Tblock | Tinline | 'center' | 'center center' | `${Tblock} ${Tinline | 'center'}` | `${Tinline} ${Tblock | 'center'}`;

interface PositionStrategyData {
    contentEl: Ref<HTMLElement | undefined>;
    activatorEl: Ref<HTMLElement | undefined>;
    isActive: Ref<boolean>;
}
declare const positionStrategies: {
    static: typeof staticPositionStrategy;
    connected: typeof connectedPositionStrategy;
};
interface StrategyProps {
    positionStrategy: keyof typeof positionStrategies | ((data: PositionStrategyData, props: StrategyProps, contentStyles: Ref<Record<string, string>>) => undefined | {
        updatePosition: (e: Event) => void;
    });
    anchor: Anchor;
    origin: Anchor | 'auto' | 'overlap';
    offset?: number | string;
    maxHeight?: number | string;
    maxWidth?: number | string;
    minHeight?: number | string;
    minWidth?: number | string;
}
declare function staticPositionStrategy(): void;
declare function connectedPositionStrategy(data: PositionStrategyData, props: StrategyProps, contentStyles: Ref<Record<string, string>>): {
    updatePosition: () => void;
};

declare type OverlaySlots = MakeSlots<{
    default: [{
        isActive: Ref<boolean>;
    }];
    activator: [{
        isActive: boolean;
        props: Record<string, any>;
    }];
}>;
declare const VOverlay: {
    new (...args: any[]): {
        $: vue.ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            anchor: Anchor;
            absolute: boolean;
            transition: string | false | (vue.TransitionProps & {
                component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
            });
            eager: boolean;
            modelValue: boolean;
            contained: boolean;
            origin: "auto" | Anchor | "overlap";
            activatorProps: Record<string, any>;
            openOnClick: boolean;
            openOnHover: boolean;
            openOnFocus: boolean;
            positionStrategy: "static" | "connected" | ((data: PositionStrategyData, props: StrategyProps, contentStyles: Ref<Record<string, string>>) => {
                updatePosition: (e: Event) => void;
            } | undefined);
            scrollStrategy: "close" | "block" | "reposition" | ((data: ScrollStrategyData) => void);
            noClickAnimation: boolean;
            persistent: boolean;
            scrim: string | boolean;
        }> & Omit<Readonly<{
            eager?: unknown;
            transition?: unknown;
            theme?: unknown;
            scrollStrategy?: unknown;
            positionStrategy?: unknown;
            anchor?: unknown;
            origin?: unknown;
            offset?: unknown;
            height?: unknown;
            maxHeight?: unknown;
            maxWidth?: unknown;
            minHeight?: unknown;
            minWidth?: unknown;
            width?: unknown;
            closeDelay?: unknown;
            openDelay?: unknown;
            activator?: unknown;
            activatorProps?: unknown;
            openOnClick?: unknown;
            openOnHover?: unknown;
            openOnFocus?: unknown;
            absolute?: unknown;
            attach?: unknown;
            contained?: unknown;
            contentClass?: unknown;
            noClickAnimation?: unknown;
            modelValue?: unknown;
            persistent?: unknown;
            scrim?: unknown;
            $children?: unknown;
            'v-slots'?: unknown;
        } & {
            anchor: Anchor;
            absolute: boolean;
            transition: string | false | (vue.TransitionProps & {
                component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
            });
            eager: boolean;
            modelValue: boolean;
            contained: boolean;
            origin: "auto" | Anchor | "overlap";
            activatorProps: Record<string, any>;
            openOnHover: boolean;
            positionStrategy: "static" | "connected" | ((data: PositionStrategyData, props: StrategyProps, contentStyles: Ref<Record<string, string>>) => {
                updatePosition: (e: Event) => void;
            } | undefined);
            scrollStrategy: "close" | "block" | "reposition" | ((data: ScrollStrategyData) => void);
            noClickAnimation: boolean;
            persistent: boolean;
            scrim: string | boolean;
        } & {
            width?: string | number | undefined;
            height?: string | number | undefined;
            theme?: string | undefined;
            maxHeight?: string | number | undefined;
            maxWidth?: string | number | undefined;
            minHeight?: string | number | undefined;
            minWidth?: string | number | undefined;
            contentClass?: any;
            $children?: vue.VNodeChild | ((args_0: {
                isActive: Ref<boolean>;
            }) => vue.VNodeChild) | {
                default?: ((args_0: {
                    isActive: Ref<boolean>;
                }) => vue.VNodeChild) | undefined;
                activator?: ((args_0: {
                    isActive: boolean;
                    props: Record<string, any>;
                }) => vue.VNodeChild) | undefined;
            };
            "v-slots"?: {
                default?: false | ((args_0: {
                    isActive: Ref<boolean>;
                }) => vue.VNodeChild) | undefined;
                activator?: false | ((args_0: {
                    isActive: boolean;
                    props: Record<string, any>;
                }) => vue.VNodeChild) | undefined;
            } | undefined;
            closeDelay?: string | number | undefined;
            openDelay?: string | number | undefined;
            activator?: string | Element | vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | undefined;
            openOnClick?: boolean | undefined;
            openOnFocus?: boolean | undefined;
            offset?: string | number | undefined;
            attach?: string | boolean | Element | undefined;
        }> & {
            "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
            "onClick:outside"?: ((e: MouseEvent) => any) | undefined;
        } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "anchor" | "absolute" | "transition" | "eager" | "modelValue" | "contained" | "origin" | "activatorProps" | "openOnClick" | "openOnHover" | "openOnFocus" | "positionStrategy" | "scrollStrategy" | "noClickAnimation" | "persistent" | "scrim">;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            [name: string]: vue.Slot | undefined;
        }>;
        $root: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
        $parent: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
        $emit: ((event: "update:modelValue", value: boolean) => void) & ((event: "click:outside", e: MouseEvent) => void);
        $el: any;
        $options: vue.ComponentOptionsBase<Readonly<{
            eager?: unknown;
            transition?: unknown;
            theme?: unknown;
            scrollStrategy?: unknown;
            positionStrategy?: unknown;
            anchor?: unknown;
            origin?: unknown;
            offset?: unknown;
            height?: unknown;
            maxHeight?: unknown;
            maxWidth?: unknown;
            minHeight?: unknown;
            minWidth?: unknown;
            width?: unknown;
            closeDelay?: unknown;
            openDelay?: unknown;
            activator?: unknown;
            activatorProps?: unknown;
            openOnClick?: unknown;
            openOnHover?: unknown;
            openOnFocus?: unknown;
            absolute?: unknown;
            attach?: unknown;
            contained?: unknown;
            contentClass?: unknown;
            noClickAnimation?: unknown;
            modelValue?: unknown;
            persistent?: unknown;
            scrim?: unknown;
            $children?: unknown;
            'v-slots'?: unknown;
        } & {
            anchor: Anchor;
            absolute: boolean;
            transition: string | false | (vue.TransitionProps & {
                component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
            });
            eager: boolean;
            modelValue: boolean;
            contained: boolean;
            origin: "auto" | Anchor | "overlap";
            activatorProps: Record<string, any>;
            openOnHover: boolean;
            positionStrategy: "static" | "connected" | ((data: PositionStrategyData, props: StrategyProps, contentStyles: Ref<Record<string, string>>) => {
                updatePosition: (e: Event) => void;
            } | undefined);
            scrollStrategy: "close" | "block" | "reposition" | ((data: ScrollStrategyData) => void);
            noClickAnimation: boolean;
            persistent: boolean;
            scrim: string | boolean;
        } & {
            width?: string | number | undefined;
            height?: string | number | undefined;
            theme?: string | undefined;
            maxHeight?: string | number | undefined;
            maxWidth?: string | number | undefined;
            minHeight?: string | number | undefined;
            minWidth?: string | number | undefined;
            contentClass?: any;
            $children?: vue.VNodeChild | ((args_0: {
                isActive: Ref<boolean>;
            }) => vue.VNodeChild) | {
                default?: ((args_0: {
                    isActive: Ref<boolean>;
                }) => vue.VNodeChild) | undefined;
                activator?: ((args_0: {
                    isActive: boolean;
                    props: Record<string, any>;
                }) => vue.VNodeChild) | undefined;
            };
            "v-slots"?: {
                default?: false | ((args_0: {
                    isActive: Ref<boolean>;
                }) => vue.VNodeChild) | undefined;
                activator?: false | ((args_0: {
                    isActive: boolean;
                    props: Record<string, any>;
                }) => vue.VNodeChild) | undefined;
            } | undefined;
            closeDelay?: string | number | undefined;
            openDelay?: string | number | undefined;
            activator?: string | Element | vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | undefined;
            openOnClick?: boolean | undefined;
            openOnFocus?: boolean | undefined;
            offset?: string | number | undefined;
            attach?: string | boolean | Element | undefined;
        }> & {
            "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
            "onClick:outside"?: ((e: MouseEvent) => any) | undefined;
        }, {
            animateClick: () => void;
            contentEl: Ref<HTMLElement | undefined>;
            activatorEl: Ref<HTMLElement | undefined>;
        }, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
            'click:outside': (e: MouseEvent) => boolean;
            'update:modelValue': (value: boolean) => boolean;
        }, string, {
            anchor: Anchor;
            absolute: boolean;
            transition: string | false | (vue.TransitionProps & {
                component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
            });
            eager: boolean;
            modelValue: boolean;
            contained: boolean;
            origin: "auto" | Anchor | "overlap";
            activatorProps: Record<string, any>;
            openOnClick: boolean;
            openOnHover: boolean;
            openOnFocus: boolean;
            positionStrategy: "static" | "connected" | ((data: PositionStrategyData, props: StrategyProps, contentStyles: Ref<Record<string, string>>) => {
                updatePosition: (e: Event) => void;
            } | undefined);
            scrollStrategy: "close" | "block" | "reposition" | ((data: ScrollStrategyData) => void);
            noClickAnimation: boolean;
            persistent: boolean;
            scrim: string | boolean;
        }> & {
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
            errorCaptured?: (((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void) | ((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void)[]) | undefined;
        };
        $forceUpdate: () => void;
        $nextTick: typeof vue.nextTick;
        $watch(source: string | Function, cb: Function, options?: vue.WatchOptions<boolean> | undefined): vue.WatchStopHandle;
    } & Readonly<{
        eager?: unknown;
        transition?: unknown;
        theme?: unknown;
        scrollStrategy?: unknown;
        positionStrategy?: unknown;
        anchor?: unknown;
        origin?: unknown;
        offset?: unknown;
        height?: unknown;
        maxHeight?: unknown;
        maxWidth?: unknown;
        minHeight?: unknown;
        minWidth?: unknown;
        width?: unknown;
        closeDelay?: unknown;
        openDelay?: unknown;
        activator?: unknown;
        activatorProps?: unknown;
        openOnClick?: unknown;
        openOnHover?: unknown;
        openOnFocus?: unknown;
        absolute?: unknown;
        attach?: unknown;
        contained?: unknown;
        contentClass?: unknown;
        noClickAnimation?: unknown;
        modelValue?: unknown;
        persistent?: unknown;
        scrim?: unknown;
        $children?: unknown;
        'v-slots'?: unknown;
    } & {
        anchor: Anchor;
        absolute: boolean;
        transition: string | false | (vue.TransitionProps & {
            component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
        });
        eager: boolean;
        modelValue: boolean;
        contained: boolean;
        origin: "auto" | Anchor | "overlap";
        activatorProps: Record<string, any>;
        openOnHover: boolean;
        positionStrategy: "static" | "connected" | ((data: PositionStrategyData, props: StrategyProps, contentStyles: Ref<Record<string, string>>) => {
            updatePosition: (e: Event) => void;
        } | undefined);
        scrollStrategy: "close" | "block" | "reposition" | ((data: ScrollStrategyData) => void);
        noClickAnimation: boolean;
        persistent: boolean;
        scrim: string | boolean;
    } & {
        width?: string | number | undefined;
        height?: string | number | undefined;
        theme?: string | undefined;
        maxHeight?: string | number | undefined;
        maxWidth?: string | number | undefined;
        minHeight?: string | number | undefined;
        minWidth?: string | number | undefined;
        contentClass?: any;
        $children?: vue.VNodeChild | ((args_0: {
            isActive: Ref<boolean>;
        }) => vue.VNodeChild) | {
            default?: ((args_0: {
                isActive: Ref<boolean>;
            }) => vue.VNodeChild) | undefined;
            activator?: ((args_0: {
                isActive: boolean;
                props: Record<string, any>;
            }) => vue.VNodeChild) | undefined;
        };
        "v-slots"?: {
            default?: false | ((args_0: {
                isActive: Ref<boolean>;
            }) => vue.VNodeChild) | undefined;
            activator?: false | ((args_0: {
                isActive: boolean;
                props: Record<string, any>;
            }) => vue.VNodeChild) | undefined;
        } | undefined;
        closeDelay?: string | number | undefined;
        openDelay?: string | number | undefined;
        activator?: string | Element | vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | undefined;
        openOnClick?: boolean | undefined;
        openOnFocus?: boolean | undefined;
        offset?: string | number | undefined;
        attach?: string | boolean | Element | undefined;
    }> & {
        "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
        "onClick:outside"?: ((e: MouseEvent) => any) | undefined;
    } & vue.ShallowUnwrapRef<{
        animateClick: () => void;
        contentEl: Ref<HTMLElement | undefined>;
        activatorEl: Ref<HTMLElement | undefined>;
    }> & {} & {} & vue.ComponentCustomProperties;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & vue.ComponentOptionsBase<Readonly<{
    eager?: unknown;
    transition?: unknown;
    theme?: unknown;
    scrollStrategy?: unknown;
    positionStrategy?: unknown;
    anchor?: unknown;
    origin?: unknown;
    offset?: unknown;
    height?: unknown;
    maxHeight?: unknown;
    maxWidth?: unknown;
    minHeight?: unknown;
    minWidth?: unknown;
    width?: unknown;
    closeDelay?: unknown;
    openDelay?: unknown;
    activator?: unknown;
    activatorProps?: unknown;
    openOnClick?: unknown;
    openOnHover?: unknown;
    openOnFocus?: unknown;
    absolute?: unknown;
    attach?: unknown;
    contained?: unknown;
    contentClass?: unknown;
    noClickAnimation?: unknown;
    modelValue?: unknown;
    persistent?: unknown;
    scrim?: unknown;
    $children?: unknown;
    'v-slots'?: unknown;
} & {
    anchor: Anchor;
    absolute: boolean;
    transition: string | false | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    });
    eager: boolean;
    modelValue: boolean;
    contained: boolean;
    origin: "auto" | Anchor | "overlap";
    activatorProps: Record<string, any>;
    openOnHover: boolean;
    positionStrategy: "static" | "connected" | ((data: PositionStrategyData, props: StrategyProps, contentStyles: Ref<Record<string, string>>) => {
        updatePosition: (e: Event) => void;
    } | undefined);
    scrollStrategy: "close" | "block" | "reposition" | ((data: ScrollStrategyData) => void);
    noClickAnimation: boolean;
    persistent: boolean;
    scrim: string | boolean;
} & {
    width?: string | number | undefined;
    height?: string | number | undefined;
    theme?: string | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
    contentClass?: any;
    $children?: vue.VNodeChild | ((args_0: {
        isActive: Ref<boolean>;
    }) => vue.VNodeChild) | {
        default?: ((args_0: {
            isActive: Ref<boolean>;
        }) => vue.VNodeChild) | undefined;
        activator?: ((args_0: {
            isActive: boolean;
            props: Record<string, any>;
        }) => vue.VNodeChild) | undefined;
    };
    "v-slots"?: {
        default?: false | ((args_0: {
            isActive: Ref<boolean>;
        }) => vue.VNodeChild) | undefined;
        activator?: false | ((args_0: {
            isActive: boolean;
            props: Record<string, any>;
        }) => vue.VNodeChild) | undefined;
    } | undefined;
    closeDelay?: string | number | undefined;
    openDelay?: string | number | undefined;
    activator?: string | Element | vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | undefined;
    openOnClick?: boolean | undefined;
    openOnFocus?: boolean | undefined;
    offset?: string | number | undefined;
    attach?: string | boolean | Element | undefined;
}> & {
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
    "onClick:outside"?: ((e: MouseEvent) => any) | undefined;
}, {
    animateClick: () => void;
    contentEl: Ref<HTMLElement | undefined>;
    activatorEl: Ref<HTMLElement | undefined>;
}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'click:outside': (e: MouseEvent) => boolean;
    'update:modelValue': (value: boolean) => boolean;
}, string, {
    anchor: Anchor;
    absolute: boolean;
    transition: string | false | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    });
    eager: boolean;
    modelValue: boolean;
    contained: boolean;
    origin: "auto" | Anchor | "overlap";
    activatorProps: Record<string, any>;
    openOnClick: boolean;
    openOnHover: boolean;
    openOnFocus: boolean;
    positionStrategy: "static" | "connected" | ((data: PositionStrategyData, props: StrategyProps, contentStyles: Ref<Record<string, string>>) => {
        updatePosition: (e: Event) => void;
    } | undefined);
    scrollStrategy: "close" | "block" | "reposition" | ((data: ScrollStrategyData) => void);
    noClickAnimation: boolean;
    persistent: boolean;
    scrim: string | boolean;
}> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & (new () => {
    $slots: OverlaySlots;
});
declare type VOverlay = InstanceType<typeof VOverlay>;

declare const VDialog: {
    new (...args: any[]): {
        $: vue.ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            width: string | number;
            transition: string | false | (vue.TransitionProps & {
                component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
            }) | {
                component: vue.DefineComponent<{
                    target: vue.PropType<HTMLElement>;
                }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
                    target?: unknown;
                } & {} & {
                    target?: HTMLElement | undefined;
                }>, {}>;
            };
            modelValue: boolean;
            origin: string;
            fullscreen: boolean;
            scrollable: boolean;
            retainFocus: boolean;
        }> & Omit<Readonly<{
            transition?: unknown;
            height?: unknown;
            maxHeight?: unknown;
            maxWidth?: unknown;
            minHeight?: unknown;
            minWidth?: unknown;
            width?: unknown;
            fullscreen?: unknown;
            origin?: unknown;
            retainFocus?: unknown;
            scrollable?: unknown;
            modelValue?: unknown;
            $children?: unknown;
            'v-slots'?: unknown;
        } & {
            width: string | number;
            transition: string | false | (vue.TransitionProps & {
                component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
            }) | {
                component: vue.DefineComponent<{
                    target: vue.PropType<HTMLElement>;
                }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
                    target?: unknown;
                } & {} & {
                    target?: HTMLElement | undefined;
                }>, {}>;
            };
            modelValue: boolean;
            origin: string;
            fullscreen: boolean;
            scrollable: boolean;
            retainFocus: boolean;
        } & {
            height?: string | number | undefined;
            maxHeight?: string | number | undefined;
            maxWidth?: string | number | undefined;
            minHeight?: string | number | undefined;
            minWidth?: string | number | undefined;
            $children?: vue.VNodeChild | ((args_0: {
                isActive: vue.Ref<boolean>;
            }) => vue.VNodeChild) | {
                default?: ((args_0: {
                    isActive: vue.Ref<boolean>;
                }) => vue.VNodeChild) | undefined;
                activator?: ((args_0: {
                    isActive: boolean;
                    props: Record<string, any>;
                }) => vue.VNodeChild) | undefined;
            };
            "v-slots"?: {
                default?: false | ((args_0: {
                    isActive: vue.Ref<boolean>;
                }) => vue.VNodeChild) | undefined;
                activator?: false | ((args_0: {
                    isActive: boolean;
                    props: Record<string, any>;
                }) => vue.VNodeChild) | undefined;
            } | undefined;
        }> & {
            "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
        } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "width" | "transition" | "modelValue" | "origin" | "fullscreen" | "scrollable" | "retainFocus">;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            [name: string]: vue.Slot | undefined;
        }>;
        $root: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
        $parent: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
        $emit: (event: "update:modelValue", value: boolean) => void;
        $el: any;
        $options: vue.ComponentOptionsBase<Readonly<{
            transition?: unknown;
            height?: unknown;
            maxHeight?: unknown;
            maxWidth?: unknown;
            minHeight?: unknown;
            minWidth?: unknown;
            width?: unknown;
            fullscreen?: unknown;
            origin?: unknown;
            retainFocus?: unknown;
            scrollable?: unknown;
            modelValue?: unknown;
            $children?: unknown;
            'v-slots'?: unknown;
        } & {
            width: string | number;
            transition: string | false | (vue.TransitionProps & {
                component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
            }) | {
                component: vue.DefineComponent<{
                    target: vue.PropType<HTMLElement>;
                }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
                    target?: unknown;
                } & {} & {
                    target?: HTMLElement | undefined;
                }>, {}>;
            };
            modelValue: boolean;
            origin: string;
            fullscreen: boolean;
            scrollable: boolean;
            retainFocus: boolean;
        } & {
            height?: string | number | undefined;
            maxHeight?: string | number | undefined;
            maxWidth?: string | number | undefined;
            minHeight?: string | number | undefined;
            minWidth?: string | number | undefined;
            $children?: vue.VNodeChild | ((args_0: {
                isActive: vue.Ref<boolean>;
            }) => vue.VNodeChild) | {
                default?: ((args_0: {
                    isActive: vue.Ref<boolean>;
                }) => vue.VNodeChild) | undefined;
                activator?: ((args_0: {
                    isActive: boolean;
                    props: Record<string, any>;
                }) => vue.VNodeChild) | undefined;
            };
            "v-slots"?: {
                default?: false | ((args_0: {
                    isActive: vue.Ref<boolean>;
                }) => vue.VNodeChild) | undefined;
                activator?: false | ((args_0: {
                    isActive: boolean;
                    props: Record<string, any>;
                }) => vue.VNodeChild) | undefined;
            } | undefined;
        }> & {
            "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
        }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
            'update:modelValue': (value: boolean) => boolean;
        }, string, {
            width: string | number;
            transition: string | false | (vue.TransitionProps & {
                component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
            }) | {
                component: vue.DefineComponent<{
                    target: vue.PropType<HTMLElement>;
                }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
                    target?: unknown;
                } & {} & {
                    target?: HTMLElement | undefined;
                }>, {}>;
            };
            modelValue: boolean;
            origin: string;
            fullscreen: boolean;
            scrollable: boolean;
            retainFocus: boolean;
        }> & {
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
            errorCaptured?: (((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void) | ((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void)[]) | undefined;
        };
        $forceUpdate: () => void;
        $nextTick: typeof nextTick;
        $watch(source: string | Function, cb: Function, options?: vue.WatchOptions<boolean> | undefined): vue.WatchStopHandle;
    } & Readonly<{
        transition?: unknown;
        height?: unknown;
        maxHeight?: unknown;
        maxWidth?: unknown;
        minHeight?: unknown;
        minWidth?: unknown;
        width?: unknown;
        fullscreen?: unknown;
        origin?: unknown;
        retainFocus?: unknown;
        scrollable?: unknown;
        modelValue?: unknown;
        $children?: unknown;
        'v-slots'?: unknown;
    } & {
        width: string | number;
        transition: string | false | (vue.TransitionProps & {
            component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
        }) | {
            component: vue.DefineComponent<{
                target: vue.PropType<HTMLElement>;
            }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
                target?: unknown;
            } & {} & {
                target?: HTMLElement | undefined;
            }>, {}>;
        };
        modelValue: boolean;
        origin: string;
        fullscreen: boolean;
        scrollable: boolean;
        retainFocus: boolean;
    } & {
        height?: string | number | undefined;
        maxHeight?: string | number | undefined;
        maxWidth?: string | number | undefined;
        minHeight?: string | number | undefined;
        minWidth?: string | number | undefined;
        $children?: vue.VNodeChild | ((args_0: {
            isActive: vue.Ref<boolean>;
        }) => vue.VNodeChild) | {
            default?: ((args_0: {
                isActive: vue.Ref<boolean>;
            }) => vue.VNodeChild) | undefined;
            activator?: ((args_0: {
                isActive: boolean;
                props: Record<string, any>;
            }) => vue.VNodeChild) | undefined;
        };
        "v-slots"?: {
            default?: false | ((args_0: {
                isActive: vue.Ref<boolean>;
            }) => vue.VNodeChild) | undefined;
            activator?: false | ((args_0: {
                isActive: boolean;
                props: Record<string, any>;
            }) => vue.VNodeChild) | undefined;
        } | undefined;
    }> & {
        "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
    } & vue.ShallowUnwrapRef<() => JSX.Element> & {} & {} & vue.ComponentCustomProperties;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & vue.ComponentOptionsBase<Readonly<{
    transition?: unknown;
    height?: unknown;
    maxHeight?: unknown;
    maxWidth?: unknown;
    minHeight?: unknown;
    minWidth?: unknown;
    width?: unknown;
    fullscreen?: unknown;
    origin?: unknown;
    retainFocus?: unknown;
    scrollable?: unknown;
    modelValue?: unknown;
    $children?: unknown;
    'v-slots'?: unknown;
} & {
    width: string | number;
    transition: string | false | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    }) | {
        component: vue.DefineComponent<{
            target: vue.PropType<HTMLElement>;
        }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
            target?: unknown;
        } & {} & {
            target?: HTMLElement | undefined;
        }>, {}>;
    };
    modelValue: boolean;
    origin: string;
    fullscreen: boolean;
    scrollable: boolean;
    retainFocus: boolean;
} & {
    height?: string | number | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
    $children?: vue.VNodeChild | ((args_0: {
        isActive: vue.Ref<boolean>;
    }) => vue.VNodeChild) | {
        default?: ((args_0: {
            isActive: vue.Ref<boolean>;
        }) => vue.VNodeChild) | undefined;
        activator?: ((args_0: {
            isActive: boolean;
            props: Record<string, any>;
        }) => vue.VNodeChild) | undefined;
    };
    "v-slots"?: {
        default?: false | ((args_0: {
            isActive: vue.Ref<boolean>;
        }) => vue.VNodeChild) | undefined;
        activator?: false | ((args_0: {
            isActive: boolean;
            props: Record<string, any>;
        }) => vue.VNodeChild) | undefined;
    } | undefined;
}> & {
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (value: boolean) => boolean;
}, string, {
    width: string | number;
    transition: string | false | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    }) | {
        component: vue.DefineComponent<{
            target: vue.PropType<HTMLElement>;
        }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
            target?: unknown;
        } & {} & {
            target?: HTMLElement | undefined;
        }>, {}>;
    };
    modelValue: boolean;
    origin: string;
    fullscreen: boolean;
    scrollable: boolean;
    retainFocus: boolean;
}> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & (new () => {
    $slots: OverlaySlots;
});
declare type VDialog = InstanceType<typeof VDialog>;

declare const VDivider: vue.DefineComponent<{
    theme: StringConstructor;
    inset: BooleanConstructor;
    length: (StringConstructor | NumberConstructor)[];
    thickness: (StringConstructor | NumberConstructor)[];
    vertical: BooleanConstructor;
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    theme?: unknown;
    inset?: unknown;
    length?: unknown;
    thickness?: unknown;
    vertical?: unknown;
} & {
    inset: boolean;
    vertical: boolean;
} & {
    length?: string | number | undefined;
    theme?: string | undefined;
    thickness?: string | number | undefined;
}>, {
    inset: boolean;
    vertical: boolean;
}>;

declare const VExpansionPanels: vue.DefineComponent<{
    theme: StringConstructor;
    tag: {
        type: StringConstructor;
        default: string;
    };
    modelValue: {
        type: null;
        default: undefined;
    };
    multiple: BooleanConstructor;
    mandatory: PropType<boolean | "force">;
    max: NumberConstructor;
    selectedClass: StringConstructor;
    disabled: BooleanConstructor;
    color: StringConstructor;
    variant: {
        type: PropType<"default" | "inset" | "accordion" | "popout">;
        default: string;
        validator: (v: any) => boolean;
    };
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (val: unknown) => true;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    theme?: unknown;
    tag?: unknown;
    modelValue?: unknown;
    multiple?: unknown;
    mandatory?: unknown;
    max?: unknown;
    selectedClass?: unknown;
    disabled?: unknown;
    color?: unknown;
    variant?: unknown;
} & {
    tag: string;
    multiple: boolean;
    disabled: boolean;
    variant: "default" | "inset" | "accordion" | "popout";
} & {
    theme?: string | undefined;
    color?: string | undefined;
    modelValue?: any;
    mandatory?: boolean | "force" | undefined;
    max?: number | undefined;
    selectedClass?: string | undefined;
}> & {
    "onUpdate:modelValue"?: ((val: unknown) => any) | undefined;
}, {
    tag: string;
    modelValue: any;
    multiple: boolean;
    disabled: boolean;
    variant: "default" | "inset" | "accordion" | "popout";
}>;
declare type VExpansionPanels = InstanceType<typeof VExpansionPanels>;

declare const VExpansionPanel: vue.DefineComponent<{
    color: StringConstructor;
    expandIcon: {
        type: StringConstructor;
        default: string;
    };
    collapseIcon: {
        type: StringConstructor;
        default: string;
    };
    hideActions: BooleanConstructor;
    ripple: {
        type: (ObjectConstructor | BooleanConstructor)[];
        default: boolean;
    };
    tag: {
        type: StringConstructor;
        default: string;
    };
    rounded: {
        type: (StringConstructor | NumberConstructor | BooleanConstructor)[];
        default: undefined;
    };
    eager: BooleanConstructor;
    value: null;
    disabled: BooleanConstructor;
    selectedClass: StringConstructor;
    elevation: {
        type: (StringConstructor | NumberConstructor)[];
        validator(v: any): boolean;
    };
    title: StringConstructor;
    text: StringConstructor;
    bgColor: StringConstructor;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    color?: unknown;
    expandIcon?: unknown;
    collapseIcon?: unknown;
    hideActions?: unknown;
    ripple?: unknown;
    tag?: unknown;
    rounded?: unknown;
    eager?: unknown;
    value?: unknown;
    disabled?: unknown;
    selectedClass?: unknown;
    elevation?: unknown;
    title?: unknown;
    text?: unknown;
    bgColor?: unknown;
} & {
    tag: string;
    eager: boolean;
    disabled: boolean;
    ripple: boolean | Record<string, any>;
    expandIcon: string;
    collapseIcon: string;
    hideActions: boolean;
} & {
    value?: any;
    title?: string | undefined;
    text?: string | undefined;
    elevation?: string | number | undefined;
    rounded?: string | number | boolean | undefined;
    color?: string | undefined;
    selectedClass?: string | undefined;
    bgColor?: string | undefined;
}>, {
    tag: string;
    eager: boolean;
    rounded: string | number | boolean;
    disabled: boolean;
    ripple: boolean | Record<string, any>;
    expandIcon: string;
    collapseIcon: string;
    hideActions: boolean;
}>;
declare type VExpansionPanel = InstanceType<typeof VExpansionPanel>;

declare const VExpansionPanelText: vue.DefineComponent<{
    eager: BooleanConstructor;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    eager?: unknown;
} & {
    eager: boolean;
} & {}>, {
    eager: boolean;
}>;
declare type VExpansionPanelText = InstanceType<typeof VExpansionPanelText>;

declare const VExpansionPanelTitle: vue.DefineComponent<{
    color: StringConstructor;
    expandIcon: {
        type: StringConstructor;
        default: string;
    };
    collapseIcon: {
        type: StringConstructor;
        default: string;
    };
    hideActions: BooleanConstructor;
    ripple: {
        type: (ObjectConstructor | BooleanConstructor)[];
        default: boolean;
    };
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    color?: unknown;
    expandIcon?: unknown;
    collapseIcon?: unknown;
    hideActions?: unknown;
    ripple?: unknown;
} & {
    ripple: boolean | Record<string, any>;
    expandIcon: string;
    collapseIcon: string;
    hideActions: boolean;
} & {
    color?: string | undefined;
}>, {
    ripple: boolean | Record<string, any>;
    expandIcon: string;
    collapseIcon: string;
    hideActions: boolean;
}>;
declare type VExpansionPanelTitle = InstanceType<typeof VExpansionPanelTitle>;

interface VInputSlot {
    id: ComputedRef<string>;
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
declare type VInputSlots = MakeSlots<{
    default: [VInputSlot];
    prepend: [VInputSlot];
    append: [VInputSlot];
    details: [VInputSlot];
}>;
declare const VInput: {
    new (...args: any[]): {
        $: vue.ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            error: boolean;
            messages: string | string[];
            density: "default" | "comfortable" | "compact" | null;
            disabled: boolean;
            readonly: boolean;
            errorMessages: string | string[];
            maxErrors: string | number;
            rules: ValidationRule[];
            direction: "horizontal" | "vertical";
        }> & Omit<Readonly<{
            disabled?: unknown;
            error?: unknown;
            errorMessages?: unknown;
            maxErrors?: unknown;
            name?: unknown;
            readonly?: unknown;
            rules?: unknown;
            modelValue?: unknown;
            density?: unknown;
            id?: unknown;
            appendIcon?: unknown;
            prependIcon?: unknown;
            hideDetails?: unknown;
            messages?: unknown;
            direction?: unknown;
            $children?: unknown;
            'v-slots'?: unknown;
        } & {
            error: boolean;
            messages: string | string[];
            density: "default" | "comfortable" | "compact" | null;
            disabled: boolean;
            readonly: boolean;
            errorMessages: string | string[];
            maxErrors: string | number;
            rules: ValidationRule[];
            direction: "horizontal" | "vertical";
        } & {
            id?: string | undefined;
            name?: string | undefined;
            $children?: vue.VNodeChild | ((args_0: VInputSlot) => vue.VNodeChild) | {
                default?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
                prepend?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
                append?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
                details?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            };
            "v-slots"?: {
                default?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
                prepend?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
                append?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
                details?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            } | undefined;
            modelValue?: any;
            prependIcon?: string | undefined;
            appendIcon?: string | undefined;
            hideDetails?: boolean | "auto" | undefined;
        }> & {
            "onUpdate:modelValue"?: ((val: any) => any) | undefined;
            "onClick:prepend"?: ((e: MouseEvent) => any) | undefined;
            "onClick:append"?: ((e: MouseEvent) => any) | undefined;
        } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "error" | "messages" | "density" | "disabled" | "readonly" | "errorMessages" | "maxErrors" | "rules" | "direction">;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            [name: string]: vue.Slot | undefined;
        }>;
        $root: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
        $parent: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
        $emit: ((event: "update:modelValue", val: any) => void) & ((event: "click:prepend", e: MouseEvent) => void) & ((event: "click:append", e: MouseEvent) => void);
        $el: any;
        $options: vue.ComponentOptionsBase<Readonly<{
            disabled?: unknown;
            error?: unknown;
            errorMessages?: unknown;
            maxErrors?: unknown;
            name?: unknown;
            readonly?: unknown;
            rules?: unknown;
            modelValue?: unknown;
            density?: unknown;
            id?: unknown;
            appendIcon?: unknown;
            prependIcon?: unknown;
            hideDetails?: unknown;
            messages?: unknown;
            direction?: unknown;
            $children?: unknown;
            'v-slots'?: unknown;
        } & {
            error: boolean;
            messages: string | string[];
            density: "default" | "comfortable" | "compact" | null;
            disabled: boolean;
            readonly: boolean;
            errorMessages: string | string[];
            maxErrors: string | number;
            rules: ValidationRule[];
            direction: "horizontal" | "vertical";
        } & {
            id?: string | undefined;
            name?: string | undefined;
            $children?: vue.VNodeChild | ((args_0: VInputSlot) => vue.VNodeChild) | {
                default?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
                prepend?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
                append?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
                details?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            };
            "v-slots"?: {
                default?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
                prepend?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
                append?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
                details?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            } | undefined;
            modelValue?: any;
            prependIcon?: string | undefined;
            appendIcon?: string | undefined;
            hideDetails?: boolean | "auto" | undefined;
        }> & {
            "onUpdate:modelValue"?: ((val: any) => any) | undefined;
            "onClick:prepend"?: ((e: MouseEvent) => any) | undefined;
            "onClick:append"?: ((e: MouseEvent) => any) | undefined;
        }, {
            reset: () => void;
            resetValidation: () => void;
            validate: () => Promise<string[]>;
        }, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
            'click:prepend': (e: MouseEvent) => boolean;
            'click:append': (e: MouseEvent) => boolean;
            'update:modelValue': (val: any) => boolean;
        }, string, {
            error: boolean;
            messages: string | string[];
            density: "default" | "comfortable" | "compact" | null;
            disabled: boolean;
            readonly: boolean;
            errorMessages: string | string[];
            maxErrors: string | number;
            rules: ValidationRule[];
            direction: "horizontal" | "vertical";
        }> & {
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
            errorCaptured?: (((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void) | ((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void)[]) | undefined;
        };
        $forceUpdate: () => void;
        $nextTick: typeof vue.nextTick;
        $watch(source: string | Function, cb: Function, options?: vue.WatchOptions<boolean> | undefined): vue.WatchStopHandle;
    } & Readonly<{
        disabled?: unknown;
        error?: unknown;
        errorMessages?: unknown;
        maxErrors?: unknown;
        name?: unknown;
        readonly?: unknown;
        rules?: unknown;
        modelValue?: unknown;
        density?: unknown;
        id?: unknown;
        appendIcon?: unknown;
        prependIcon?: unknown;
        hideDetails?: unknown;
        messages?: unknown;
        direction?: unknown;
        $children?: unknown;
        'v-slots'?: unknown;
    } & {
        error: boolean;
        messages: string | string[];
        density: "default" | "comfortable" | "compact" | null;
        disabled: boolean;
        readonly: boolean;
        errorMessages: string | string[];
        maxErrors: string | number;
        rules: ValidationRule[];
        direction: "horizontal" | "vertical";
    } & {
        id?: string | undefined;
        name?: string | undefined;
        $children?: vue.VNodeChild | ((args_0: VInputSlot) => vue.VNodeChild) | {
            default?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            prepend?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            append?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            details?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        };
        "v-slots"?: {
            default?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            prepend?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            append?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            details?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        } | undefined;
        modelValue?: any;
        prependIcon?: string | undefined;
        appendIcon?: string | undefined;
        hideDetails?: boolean | "auto" | undefined;
    }> & {
        "onUpdate:modelValue"?: ((val: any) => any) | undefined;
        "onClick:prepend"?: ((e: MouseEvent) => any) | undefined;
        "onClick:append"?: ((e: MouseEvent) => any) | undefined;
    } & vue.ShallowUnwrapRef<{
        reset: () => void;
        resetValidation: () => void;
        validate: () => Promise<string[]>;
    }> & {} & {} & vue.ComponentCustomProperties;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & vue.ComponentOptionsBase<Readonly<{
    disabled?: unknown;
    error?: unknown;
    errorMessages?: unknown;
    maxErrors?: unknown;
    name?: unknown;
    readonly?: unknown;
    rules?: unknown;
    modelValue?: unknown;
    density?: unknown;
    id?: unknown;
    appendIcon?: unknown;
    prependIcon?: unknown;
    hideDetails?: unknown;
    messages?: unknown;
    direction?: unknown;
    $children?: unknown;
    'v-slots'?: unknown;
} & {
    error: boolean;
    messages: string | string[];
    density: "default" | "comfortable" | "compact" | null;
    disabled: boolean;
    readonly: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    direction: "horizontal" | "vertical";
} & {
    id?: string | undefined;
    name?: string | undefined;
    $children?: vue.VNodeChild | ((args_0: VInputSlot) => vue.VNodeChild) | {
        default?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        prepend?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        append?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        details?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    };
    "v-slots"?: {
        default?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        prepend?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        append?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        details?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    } | undefined;
    modelValue?: any;
    prependIcon?: string | undefined;
    appendIcon?: string | undefined;
    hideDetails?: boolean | "auto" | undefined;
}> & {
    "onUpdate:modelValue"?: ((val: any) => any) | undefined;
    "onClick:prepend"?: ((e: MouseEvent) => any) | undefined;
    "onClick:append"?: ((e: MouseEvent) => any) | undefined;
}, {
    reset: () => void;
    resetValidation: () => void;
    validate: () => Promise<string[]>;
}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'click:prepend': (e: MouseEvent) => boolean;
    'click:append': (e: MouseEvent) => boolean;
    'update:modelValue': (val: any) => boolean;
}, string, {
    error: boolean;
    messages: string | string[];
    density: "default" | "comfortable" | "compact" | null;
    disabled: boolean;
    readonly: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    direction: "horizontal" | "vertical";
}> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & (new <T>() => {
    $slots: VInputSlots;
});
declare type VInput = InstanceType<typeof VInput>;

interface LoaderSlotProps {
    color: string | undefined;
    isActive: boolean;
}

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
declare type VFieldSlots = MakeSlots<{
    clear: [];
    prependInner: [DefaultInputSlot & VInputSlot];
    appendInner: [DefaultInputSlot & VInputSlot];
    label: [DefaultInputSlot & VInputSlot];
    loader: [LoaderSlotProps];
    default: [VFieldSlot];
}>;
declare const VField: {
    new (...args: any[]): {
        $: vue.ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            error: boolean;
            reverse: boolean;
            loading: boolean;
            disabled: boolean;
            variant: "filled" | "outlined" | "plain" | "contained" | "underlined";
            focused: boolean;
            clearable: boolean;
            clearIcon: string;
            persistentClear: boolean;
            singleLine: boolean;
        }> & Omit<Readonly<{
            id?: unknown;
            error?: unknown;
            reverse?: unknown;
            theme?: unknown;
            label?: unknown;
            loading?: unknown;
            color?: unknown;
            disabled?: unknown;
            variant?: unknown;
            bgColor?: unknown;
            focused?: unknown;
            appendInnerIcon?: unknown;
            clearable?: unknown;
            clearIcon?: unknown;
            persistentClear?: unknown;
            prependInnerIcon?: unknown;
            singleLine?: unknown;
            $children?: unknown;
            'v-slots'?: unknown;
        } & {
            error: boolean;
            reverse: boolean;
            loading: boolean;
            disabled: boolean;
            variant: "filled" | "outlined" | "plain" | "contained" | "underlined";
            focused: boolean;
            clearable: boolean;
            clearIcon: string;
            persistentClear: boolean;
            singleLine: boolean;
        } & {
            id?: string | undefined;
            theme?: string | undefined;
            label?: string | undefined;
            $children?: vue.VNodeChild | ((args_0: VFieldSlot) => vue.VNodeChild) | {
                clear?: (() => vue.VNodeChild) | undefined;
                prependInner?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
                appendInner?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
                label?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
                loader?: ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
                default?: ((args_0: VFieldSlot) => vue.VNodeChild) | undefined;
            };
            "v-slots"?: {
                clear?: false | (() => vue.VNodeChild) | undefined;
                prependInner?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
                appendInner?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
                label?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
                loader?: false | ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
                default?: false | ((args_0: VFieldSlot) => vue.VNodeChild) | undefined;
            } | undefined;
            color?: string | undefined;
            bgColor?: string | undefined;
            appendInnerIcon?: string | undefined;
            prependInnerIcon?: string | undefined;
        }> & {
            "onUpdate:focused"?: ((focused: boolean) => any) | undefined;
            "onClick:clear"?: ((e: MouseEvent) => any) | undefined;
            "onClick:prepend-inner"?: ((e: MouseEvent) => any) | undefined;
            "onClick:append-inner"?: ((e: MouseEvent) => any) | undefined;
            "onClick:control"?: ((e: MouseEvent) => any) | undefined;
        } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "error" | "reverse" | "loading" | "disabled" | "variant" | "focused" | "clearable" | "clearIcon" | "persistentClear" | "singleLine">;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            [name: string]: vue.Slot | undefined;
        }>;
        $root: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
        $parent: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
        $emit: ((event: "click:clear", e: MouseEvent) => void) & ((event: "click:prepend-inner", e: MouseEvent) => void) & ((event: "click:append-inner", e: MouseEvent) => void) & ((event: "click:control", e: MouseEvent) => void) & ((event: "update:focused", focused: boolean) => void);
        $el: any;
        $options: vue.ComponentOptionsBase<Readonly<{
            id?: unknown;
            error?: unknown;
            reverse?: unknown;
            theme?: unknown;
            label?: unknown;
            loading?: unknown;
            color?: unknown;
            disabled?: unknown;
            variant?: unknown;
            bgColor?: unknown;
            focused?: unknown;
            appendInnerIcon?: unknown;
            clearable?: unknown;
            clearIcon?: unknown;
            persistentClear?: unknown;
            prependInnerIcon?: unknown;
            singleLine?: unknown;
            $children?: unknown;
            'v-slots'?: unknown;
        } & {
            error: boolean;
            reverse: boolean;
            loading: boolean;
            disabled: boolean;
            variant: "filled" | "outlined" | "plain" | "contained" | "underlined";
            focused: boolean;
            clearable: boolean;
            clearIcon: string;
            persistentClear: boolean;
            singleLine: boolean;
        } & {
            id?: string | undefined;
            theme?: string | undefined;
            label?: string | undefined;
            $children?: vue.VNodeChild | ((args_0: VFieldSlot) => vue.VNodeChild) | {
                clear?: (() => vue.VNodeChild) | undefined;
                prependInner?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
                appendInner?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
                label?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
                loader?: ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
                default?: ((args_0: VFieldSlot) => vue.VNodeChild) | undefined;
            };
            "v-slots"?: {
                clear?: false | (() => vue.VNodeChild) | undefined;
                prependInner?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
                appendInner?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
                label?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
                loader?: false | ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
                default?: false | ((args_0: VFieldSlot) => vue.VNodeChild) | undefined;
            } | undefined;
            color?: string | undefined;
            bgColor?: string | undefined;
            appendInnerIcon?: string | undefined;
            prependInnerIcon?: string | undefined;
        }> & {
            "onUpdate:focused"?: ((focused: boolean) => any) | undefined;
            "onClick:clear"?: ((e: MouseEvent) => any) | undefined;
            "onClick:prepend-inner"?: ((e: MouseEvent) => any) | undefined;
            "onClick:append-inner"?: ((e: MouseEvent) => any) | undefined;
            "onClick:control"?: ((e: MouseEvent) => any) | undefined;
        }, {
            controlRef: Ref<HTMLElement | undefined>;
        }, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Omit<{
            'click:clear': (e: MouseEvent) => boolean;
            'click:prepend-inner': (e: MouseEvent) => boolean;
            'click:append-inner': (e: MouseEvent) => boolean;
            'click:control': (e: MouseEvent) => boolean;
            'update:focused': (focused: boolean) => boolean;
            'update:modelValue': (val: any) => boolean;
        }, "update:modelValue" | "modelValue">, string, {
            error: boolean;
            reverse: boolean;
            loading: boolean;
            disabled: boolean;
            variant: "filled" | "outlined" | "plain" | "contained" | "underlined";
            focused: boolean;
            clearable: boolean;
            clearIcon: string;
            persistentClear: boolean;
            singleLine: boolean;
        }> & {
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
            errorCaptured?: (((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void) | ((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void)[]) | undefined;
        };
        $forceUpdate: () => void;
        $nextTick: typeof vue.nextTick;
        $watch(source: string | Function, cb: Function, options?: vue.WatchOptions<boolean> | undefined): vue.WatchStopHandle;
    } & Readonly<{
        id?: unknown;
        error?: unknown;
        reverse?: unknown;
        theme?: unknown;
        label?: unknown;
        loading?: unknown;
        color?: unknown;
        disabled?: unknown;
        variant?: unknown;
        bgColor?: unknown;
        focused?: unknown;
        appendInnerIcon?: unknown;
        clearable?: unknown;
        clearIcon?: unknown;
        persistentClear?: unknown;
        prependInnerIcon?: unknown;
        singleLine?: unknown;
        $children?: unknown;
        'v-slots'?: unknown;
    } & {
        error: boolean;
        reverse: boolean;
        loading: boolean;
        disabled: boolean;
        variant: "filled" | "outlined" | "plain" | "contained" | "underlined";
        focused: boolean;
        clearable: boolean;
        clearIcon: string;
        persistentClear: boolean;
        singleLine: boolean;
    } & {
        id?: string | undefined;
        theme?: string | undefined;
        label?: string | undefined;
        $children?: vue.VNodeChild | ((args_0: VFieldSlot) => vue.VNodeChild) | {
            clear?: (() => vue.VNodeChild) | undefined;
            prependInner?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
            appendInner?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
            label?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
            loader?: ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
            default?: ((args_0: VFieldSlot) => vue.VNodeChild) | undefined;
        };
        "v-slots"?: {
            clear?: false | (() => vue.VNodeChild) | undefined;
            prependInner?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
            appendInner?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
            label?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
            loader?: false | ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
            default?: false | ((args_0: VFieldSlot) => vue.VNodeChild) | undefined;
        } | undefined;
        color?: string | undefined;
        bgColor?: string | undefined;
        appendInnerIcon?: string | undefined;
        prependInnerIcon?: string | undefined;
    }> & {
        "onUpdate:focused"?: ((focused: boolean) => any) | undefined;
        "onClick:clear"?: ((e: MouseEvent) => any) | undefined;
        "onClick:prepend-inner"?: ((e: MouseEvent) => any) | undefined;
        "onClick:append-inner"?: ((e: MouseEvent) => any) | undefined;
        "onClick:control"?: ((e: MouseEvent) => any) | undefined;
    } & vue.ShallowUnwrapRef<{
        controlRef: Ref<HTMLElement | undefined>;
    }> & {} & {} & vue.ComponentCustomProperties;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & vue.ComponentOptionsBase<Readonly<{
    id?: unknown;
    error?: unknown;
    reverse?: unknown;
    theme?: unknown;
    label?: unknown;
    loading?: unknown;
    color?: unknown;
    disabled?: unknown;
    variant?: unknown;
    bgColor?: unknown;
    focused?: unknown;
    appendInnerIcon?: unknown;
    clearable?: unknown;
    clearIcon?: unknown;
    persistentClear?: unknown;
    prependInnerIcon?: unknown;
    singleLine?: unknown;
    $children?: unknown;
    'v-slots'?: unknown;
} & {
    error: boolean;
    reverse: boolean;
    loading: boolean;
    disabled: boolean;
    variant: "filled" | "outlined" | "plain" | "contained" | "underlined";
    focused: boolean;
    clearable: boolean;
    clearIcon: string;
    persistentClear: boolean;
    singleLine: boolean;
} & {
    id?: string | undefined;
    theme?: string | undefined;
    label?: string | undefined;
    $children?: vue.VNodeChild | ((args_0: VFieldSlot) => vue.VNodeChild) | {
        clear?: (() => vue.VNodeChild) | undefined;
        prependInner?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        appendInner?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        label?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        loader?: ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
        default?: ((args_0: VFieldSlot) => vue.VNodeChild) | undefined;
    };
    "v-slots"?: {
        clear?: false | (() => vue.VNodeChild) | undefined;
        prependInner?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        appendInner?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        label?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        loader?: false | ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
        default?: false | ((args_0: VFieldSlot) => vue.VNodeChild) | undefined;
    } | undefined;
    color?: string | undefined;
    bgColor?: string | undefined;
    appendInnerIcon?: string | undefined;
    prependInnerIcon?: string | undefined;
}> & {
    "onUpdate:focused"?: ((focused: boolean) => any) | undefined;
    "onClick:clear"?: ((e: MouseEvent) => any) | undefined;
    "onClick:prepend-inner"?: ((e: MouseEvent) => any) | undefined;
    "onClick:append-inner"?: ((e: MouseEvent) => any) | undefined;
    "onClick:control"?: ((e: MouseEvent) => any) | undefined;
}, {
    controlRef: Ref<HTMLElement | undefined>;
}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Omit<{
    'click:clear': (e: MouseEvent) => boolean;
    'click:prepend-inner': (e: MouseEvent) => boolean;
    'click:append-inner': (e: MouseEvent) => boolean;
    'click:control': (e: MouseEvent) => boolean;
    'update:focused': (focused: boolean) => boolean;
    'update:modelValue': (val: any) => boolean;
}, "update:modelValue" | "modelValue">, string, {
    error: boolean;
    reverse: boolean;
    loading: boolean;
    disabled: boolean;
    variant: "filled" | "outlined" | "plain" | "contained" | "underlined";
    focused: boolean;
    clearable: boolean;
    clearIcon: string;
    persistentClear: boolean;
    singleLine: boolean;
}> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & (new <T>() => {
    $props: {
        modelValue?: T | undefined;
        'onUpdate:modelValue'?: ((val: T) => any) | undefined;
    };
    $slots: VFieldSlots;
});
declare type VField = InstanceType<typeof VField>;

declare const VFieldLabel: vue.DefineComponent<{
    floating: BooleanConstructor;
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    floating?: unknown;
} & {
    floating: boolean;
} & {}>, {
    floating: boolean;
}>;
declare type VFieldLabel = InstanceType<typeof VFieldLabel>;

declare const VFileInput: vue.DefineComponent<{
    loading: BooleanConstructor;
    theme: StringConstructor;
    appendInnerIcon: StringConstructor;
    bgColor: StringConstructor;
    clearable: {
        type: PropType<boolean>;
        default: boolean;
    };
    clearIcon: {
        type: StringConstructor;
        default: string;
    };
    color: StringConstructor;
    label: StringConstructor;
    persistentClear: BooleanConstructor;
    prependInnerIcon: StringConstructor;
    reverse: BooleanConstructor;
    singleLine: BooleanConstructor;
    variant: {
        type: PropType<"filled" | "outlined" | "plain" | "contained" | "underlined">;
        default: string;
        validator: (v: any) => boolean;
    };
    prependIcon: {
        type: StringConstructor;
        default: string;
    };
    modelValue: {
        type: PropType<File[]>;
        default: () => never[];
        validator: (val: any) => boolean;
    };
    disabled: BooleanConstructor;
    error: BooleanConstructor;
    errorMessages: {
        type: PropType<string | string[]>;
        default: () => never[];
    };
    maxErrors: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    name: StringConstructor;
    readonly: BooleanConstructor;
    rules: {
        type: PropType<ValidationRule[]>;
        default: () => never[];
    };
    density: {
        type: PropType<"default" | "comfortable" | "compact" | null>;
        default: string;
        validator: (v: any) => boolean;
    };
    id: StringConstructor;
    appendIcon: StringConstructor;
    hideDetails: PropType<boolean | "auto">;
    messages: {
        type: PropType<string | string[]>;
        default: () => never[];
    };
    direction: {
        type: PropType<"horizontal" | "vertical">;
        default: string;
        validator: (v: any) => boolean;
    };
    chips: BooleanConstructor;
    counter: BooleanConstructor;
    counterSizeString: {
        type: StringConstructor;
        default: string;
    };
    counterString: {
        type: StringConstructor;
        default: string;
    };
    multiple: BooleanConstructor;
    hint: StringConstructor;
    persistentHint: BooleanConstructor;
    placeholder: StringConstructor;
    persistentPlaceholder: BooleanConstructor;
    showSize: {
        type: PropType<boolean | 1000 | 1024>;
        default: boolean;
        validator: (v: boolean | number) => boolean;
    };
}, HTMLInputElement & {
    $: vue.ComponentInternalInstance;
    $data: {};
    $props: Partial<{
        error: boolean;
        messages: string | string[];
        density: "default" | "comfortable" | "compact" | null;
        disabled: boolean;
        readonly: boolean;
        errorMessages: string | string[];
        maxErrors: string | number;
        rules: ValidationRule[];
        direction: "horizontal" | "vertical";
    }> & Omit<Readonly<{
        disabled?: unknown;
        error?: unknown;
        errorMessages?: unknown;
        maxErrors?: unknown;
        name?: unknown;
        readonly?: unknown;
        rules?: unknown;
        modelValue?: unknown;
        density?: unknown;
        id?: unknown;
        appendIcon?: unknown;
        prependIcon?: unknown;
        hideDetails?: unknown;
        messages?: unknown;
        direction?: unknown;
        $children?: unknown;
        'v-slots'?: unknown;
    } & {
        error: boolean;
        messages: string | string[];
        density: "default" | "comfortable" | "compact" | null;
        disabled: boolean;
        readonly: boolean;
        errorMessages: string | string[];
        maxErrors: string | number;
        rules: ValidationRule[];
        direction: "horizontal" | "vertical";
    } & {
        id?: string | undefined;
        name?: string | undefined;
        $children?: vue.VNodeChild | ((args_0: VInputSlot) => vue.VNodeChild) | {
            default?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            prepend?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            append?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            details?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        };
        "v-slots"?: {
            default?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            prepend?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            append?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            details?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        } | undefined;
        modelValue?: any;
        prependIcon?: string | undefined;
        appendIcon?: string | undefined;
        hideDetails?: boolean | "auto" | undefined;
    }> & {
        "onUpdate:modelValue"?: ((val: any) => any) | undefined;
        "onClick:prepend"?: ((e: MouseEvent) => any) | undefined;
        "onClick:append"?: ((e: MouseEvent) => any) | undefined;
    } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "error" | "messages" | "density" | "disabled" | "readonly" | "errorMessages" | "maxErrors" | "rules" | "direction">;
    $attrs: {
        [x: string]: unknown;
    };
    $refs: {
        [x: string]: unknown;
    };
    $slots: Readonly<{
        [name: string]: vue.Slot | undefined;
    }>;
    $root: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
    $parent: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
    $emit: ((event: "update:modelValue", val: any) => void) & ((event: "click:prepend", e: MouseEvent) => void) & ((event: "click:append", e: MouseEvent) => void);
    $el: any;
    $options: vue.ComponentOptionsBase<Readonly<{
        disabled?: unknown;
        error?: unknown;
        errorMessages?: unknown;
        maxErrors?: unknown;
        name?: unknown;
        readonly?: unknown;
        rules?: unknown;
        modelValue?: unknown;
        density?: unknown;
        id?: unknown;
        appendIcon?: unknown;
        prependIcon?: unknown;
        hideDetails?: unknown;
        messages?: unknown;
        direction?: unknown;
        $children?: unknown;
        'v-slots'?: unknown;
    } & {
        error: boolean;
        messages: string | string[];
        density: "default" | "comfortable" | "compact" | null;
        disabled: boolean;
        readonly: boolean;
        errorMessages: string | string[];
        maxErrors: string | number;
        rules: ValidationRule[];
        direction: "horizontal" | "vertical";
    } & {
        id?: string | undefined;
        name?: string | undefined;
        $children?: vue.VNodeChild | ((args_0: VInputSlot) => vue.VNodeChild) | {
            default?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            prepend?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            append?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            details?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        };
        "v-slots"?: {
            default?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            prepend?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            append?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            details?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        } | undefined;
        modelValue?: any;
        prependIcon?: string | undefined;
        appendIcon?: string | undefined;
        hideDetails?: boolean | "auto" | undefined;
    }> & {
        "onUpdate:modelValue"?: ((val: any) => any) | undefined;
        "onClick:prepend"?: ((e: MouseEvent) => any) | undefined;
        "onClick:append"?: ((e: MouseEvent) => any) | undefined;
    }, {
        reset: () => void;
        resetValidation: () => void;
        validate: () => Promise<string[]>;
    }, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
        'click:prepend': (e: MouseEvent) => boolean;
        'click:append': (e: MouseEvent) => boolean;
        'update:modelValue': (val: any) => boolean;
    }, string, {
        error: boolean;
        messages: string | string[];
        density: "default" | "comfortable" | "compact" | null;
        disabled: boolean;
        readonly: boolean;
        errorMessages: string | string[];
        maxErrors: string | number;
        rules: ValidationRule[];
        direction: "horizontal" | "vertical";
    }> & {
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
        errorCaptured?: (((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void) | ((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void)[]) | undefined;
    };
    $forceUpdate: () => void;
    $nextTick: typeof nextTick;
    $watch(source: string | Function, cb: Function, options?: vue.WatchOptions<boolean> | undefined): vue.WatchStopHandle;
} & Readonly<{
    disabled?: unknown;
    error?: unknown;
    errorMessages?: unknown;
    maxErrors?: unknown;
    name?: unknown;
    readonly?: unknown;
    rules?: unknown;
    modelValue?: unknown;
    density?: unknown;
    id?: unknown;
    appendIcon?: unknown;
    prependIcon?: unknown;
    hideDetails?: unknown;
    messages?: unknown;
    direction?: unknown;
    $children?: unknown;
    'v-slots'?: unknown;
} & {
    error: boolean;
    messages: string | string[];
    density: "default" | "comfortable" | "compact" | null;
    disabled: boolean;
    readonly: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    direction: "horizontal" | "vertical";
} & {
    id?: string | undefined;
    name?: string | undefined;
    $children?: vue.VNodeChild | ((args_0: VInputSlot) => vue.VNodeChild) | {
        default?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        prepend?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        append?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        details?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    };
    "v-slots"?: {
        default?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        prepend?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        append?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        details?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    } | undefined;
    modelValue?: any;
    prependIcon?: string | undefined;
    appendIcon?: string | undefined;
    hideDetails?: boolean | "auto" | undefined;
}> & {
    "onUpdate:modelValue"?: ((val: any) => any) | undefined;
    "onClick:prepend"?: ((e: MouseEvent) => any) | undefined;
    "onClick:append"?: ((e: MouseEvent) => any) | undefined;
} & vue.ShallowUnwrapRef<{
    reset: () => void;
    resetValidation: () => void;
    validate: () => Promise<string[]>;
}> & {} & {} & vue.ComponentCustomProperties & {
    $slots: MakeSlots<{
        default: [VInputSlot];
        prepend: [VInputSlot];
        append: [VInputSlot];
        details: [VInputSlot];
    }>;
}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'click:clear': (e: MouseEvent) => true;
    'click:control': (e: MouseEvent) => true;
    'update:modelValue': (files: File[]) => true;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    loading?: unknown;
    theme?: unknown;
    appendInnerIcon?: unknown;
    bgColor?: unknown;
    clearable?: unknown;
    clearIcon?: unknown;
    color?: unknown;
    label?: unknown;
    persistentClear?: unknown;
    prependInnerIcon?: unknown;
    reverse?: unknown;
    singleLine?: unknown;
    variant?: unknown;
    prependIcon?: unknown;
    modelValue?: unknown;
    disabled?: unknown;
    error?: unknown;
    errorMessages?: unknown;
    maxErrors?: unknown;
    name?: unknown;
    readonly?: unknown;
    rules?: unknown;
    density?: unknown;
    id?: unknown;
    appendIcon?: unknown;
    hideDetails?: unknown;
    messages?: unknown;
    direction?: unknown;
    chips?: unknown;
    counter?: unknown;
    counterSizeString?: unknown;
    counterString?: unknown;
    multiple?: unknown;
    hint?: unknown;
    persistentHint?: unknown;
    placeholder?: unknown;
    persistentPlaceholder?: unknown;
    showSize?: unknown;
} & {
    error: boolean;
    reverse: boolean;
    messages: string | string[];
    counter: boolean;
    loading: boolean;
    density: "default" | "comfortable" | "compact" | null;
    modelValue: File[];
    multiple: boolean;
    disabled: boolean;
    variant: "filled" | "outlined" | "plain" | "contained" | "underlined";
    prependIcon: string;
    readonly: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    direction: "horizontal" | "vertical";
    clearable: boolean;
    clearIcon: string;
    persistentClear: boolean;
    singleLine: boolean;
    chips: boolean;
    counterSizeString: string;
    counterString: string;
    persistentHint: boolean;
    persistentPlaceholder: boolean;
    showSize: boolean | 1000 | 1024;
} & {
    id?: string | undefined;
    name?: string | undefined;
    theme?: string | undefined;
    label?: string | undefined;
    placeholder?: string | undefined;
    color?: string | undefined;
    appendIcon?: string | undefined;
    bgColor?: string | undefined;
    hideDetails?: boolean | "auto" | undefined;
    appendInnerIcon?: string | undefined;
    prependInnerIcon?: string | undefined;
    hint?: string | undefined;
}> & {
    "onUpdate:modelValue"?: ((files: File[]) => any) | undefined;
    "onClick:clear"?: ((e: MouseEvent) => any) | undefined;
    "onClick:control"?: ((e: MouseEvent) => any) | undefined;
}, {
    error: boolean;
    reverse: boolean;
    messages: string | string[];
    counter: boolean;
    loading: boolean;
    density: "default" | "comfortable" | "compact" | null;
    modelValue: File[];
    multiple: boolean;
    disabled: boolean;
    variant: "filled" | "outlined" | "plain" | "contained" | "underlined";
    prependIcon: string;
    readonly: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    direction: "horizontal" | "vertical";
    clearable: boolean;
    clearIcon: string;
    persistentClear: boolean;
    singleLine: boolean;
    chips: boolean;
    counterSizeString: string;
    counterString: string;
    persistentHint: boolean;
    persistentPlaceholder: boolean;
    showSize: boolean | 1000 | 1024;
}>;
declare type VFileInput = InstanceType<typeof VFileInput>;

declare const VFooter: vue.DefineComponent<{
    theme: StringConstructor;
    tag: Omit<{
        type: StringConstructor;
        default: string;
    }, "default" | "type"> & {
        type: vue.PropType<string>;
        default: string;
    };
    rounded: {
        type: (StringConstructor | NumberConstructor | BooleanConstructor)[];
        default: undefined;
    };
    absolute: BooleanConstructor;
    bottom: (StringConstructor | NumberConstructor | BooleanConstructor)[];
    fixed: BooleanConstructor;
    left: (StringConstructor | NumberConstructor | BooleanConstructor)[];
    position: {
        type: vue.PropType<"fixed" | "absolute" | "relative" | "static" | "sticky">;
        validator: (v: any) => boolean;
    };
    right: (StringConstructor | NumberConstructor | BooleanConstructor)[];
    top: (StringConstructor | NumberConstructor | BooleanConstructor)[];
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
    border: (StringConstructor | NumberConstructor | BooleanConstructor)[];
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    theme?: unknown;
    tag?: unknown;
    rounded?: unknown;
    absolute?: unknown;
    bottom?: unknown;
    fixed?: unknown;
    left?: unknown;
    position?: unknown;
    right?: unknown;
    top?: unknown;
    elevation?: unknown;
    height?: unknown;
    maxHeight?: unknown;
    maxWidth?: unknown;
    minHeight?: unknown;
    minWidth?: unknown;
    width?: unknown;
    border?: unknown;
} & {
    fixed: boolean;
    tag: string;
    absolute: boolean;
} & {
    width?: string | number | undefined;
    height?: string | number | undefined;
    left?: string | number | boolean | undefined;
    right?: string | number | boolean | undefined;
    theme?: string | undefined;
    bottom?: string | number | boolean | undefined;
    top?: string | number | boolean | undefined;
    position?: "fixed" | "absolute" | "relative" | "static" | "sticky" | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
    border?: string | number | boolean | undefined;
    elevation?: string | number | undefined;
    rounded?: string | number | boolean | undefined;
}>, {
    fixed: boolean;
    tag: string;
    absolute: boolean;
    rounded: string | number | boolean;
}>;

declare const VForm: vue.DefineComponent<{
    disabled: BooleanConstructor;
    fastFail: BooleanConstructor;
    lazyValidation: BooleanConstructor;
    readonly: BooleanConstructor;
    modelValue: {
        type: vue.PropType<boolean | null>;
        default: null;
    };
}, {
    errorMessages: vue.Ref<{
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
    }[]>;
    validate: () => Promise<{
        valid: boolean;
        errorMessages: {
            id: string | number;
            errorMessages: string[];
        }[];
    }>;
    reset: () => void;
    resetValidation: () => void;
}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (val: boolean | null) => true;
    submit: (e: Event) => true;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    disabled?: unknown;
    fastFail?: unknown;
    lazyValidation?: unknown;
    readonly?: unknown;
    modelValue?: unknown;
} & {
    modelValue: boolean | null;
    disabled: boolean;
    fastFail: boolean;
    lazyValidation: boolean;
    readonly: boolean;
} & {}> & {
    onSubmit?: ((e: Event) => any) | undefined;
    "onUpdate:modelValue"?: ((val: boolean | null) => any) | undefined;
}, {
    modelValue: boolean | null;
    disabled: boolean;
    fastFail: boolean;
    lazyValidation: boolean;
    readonly: boolean;
}>;
declare type VForm = InstanceType<typeof VForm>;

declare const VContainer: vue.DefineComponent<{
    tag: {
        type: StringConstructor;
        default: string;
    };
    fluid: {
        type: BooleanConstructor;
        default: boolean;
    };
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    tag?: unknown;
    fluid?: unknown;
} & {
    tag: string;
    fluid: boolean;
} & {}>, {
    tag: string;
    fluid: boolean;
}>;

declare const VCol: vue.DefineComponent<{
    tag: {
        type: StringConstructor;
        default: string;
    };
    alignSelf: {
        type: StringConstructor;
        default: null;
        validator: (str: any) => boolean;
    };
    order: {
        type: (StringConstructor | NumberConstructor)[];
        default: null;
    };
    offset: {
        type: (StringConstructor | NumberConstructor)[];
        default: null;
    };
    cols: {
        type: (StringConstructor | NumberConstructor | BooleanConstructor)[];
        default: boolean;
    };
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    tag?: unknown;
    alignSelf?: unknown;
    order?: unknown;
    offset?: unknown;
    cols?: unknown;
} & {
    tag: string;
    alignSelf: string;
    offset: string | number;
    order: string | number;
    cols: string | number | boolean;
} & {}>, {
    tag: string;
    alignSelf: string;
    offset: string | number;
    order: string | number;
    cols: string | number | boolean;
}>;

declare const VRow: vue.DefineComponent<{
    tag: {
        type: StringConstructor;
        default: string;
    };
    alignContent: {
        type: StringConstructor;
        default: null;
        validator: (str: any) => boolean;
    };
    justify: {
        type: StringConstructor;
        default: null;
        validator: (str: any) => boolean;
    };
    dense: BooleanConstructor;
    noGutters: BooleanConstructor;
    align: {
        type: StringConstructor;
        default: null;
        validator: (str: any) => boolean;
    };
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    tag?: unknown;
    alignContent?: unknown;
    justify?: unknown;
    dense?: unknown;
    noGutters?: unknown;
    align?: unknown;
} & {
    tag: string;
    dense: boolean;
    justify: string;
    alignContent: string;
    align: string;
    noGutters: boolean;
} & {}>, {
    tag: string;
    dense: boolean;
    justify: string;
    alignContent: string;
    align: string;
    noGutters: boolean;
}>;

declare const VSpacer: vue.DefineComponent<{
    tag: {
        type: StringConstructor;
        default: string;
    };
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    tag?: unknown;
} & {
    tag: string;
} & {}>, {
    tag: string;
}>;

declare const VHover: vue.DefineComponent<{
    closeDelay: (StringConstructor | NumberConstructor)[];
    openDelay: (StringConstructor | NumberConstructor)[];
    disabled: BooleanConstructor;
    modelValue: {
        type: BooleanConstructor;
        default: undefined;
    };
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>[] | undefined, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (value: boolean) => true;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    closeDelay?: unknown;
    openDelay?: unknown;
    disabled?: unknown;
    modelValue?: unknown;
} & {
    disabled: boolean;
} & {
    modelValue?: boolean | undefined;
    closeDelay?: string | number | undefined;
    openDelay?: string | number | undefined;
}> & {
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
}, {
    modelValue: boolean;
    disabled: boolean;
}>;

declare type IconValue = string | JSXComponent;
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
    sort: IconValue;
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
    icon: IconValue;
    disabled?: Boolean;
}
declare type IconComponent = JSXComponent<IconProps>;
interface IconSet {
    component: IconComponent;
}
declare type IconOptions = {
    defaultSet: string;
    aliases?: Partial<IconAliases>;
    sets: Record<string, IconSet>;
};
declare const VComponentIcon: vue.DefineComponent<{
    icon: {
        type: PropType<IconValue>;
        required: true;
    };
    tag: {
        type: StringConstructor;
        required: true;
    };
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    icon?: unknown;
    tag?: unknown;
} & {
    tag: string;
    icon: IconValue;
} & {}>, {}>;
declare const VSvgIcon: vue.DefineComponent<{
    icon: {
        type: PropType<IconValue>;
        required: true;
    };
    tag: {
        type: StringConstructor;
        required: true;
    };
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    icon?: unknown;
    tag?: unknown;
} & {
    tag: string;
    icon: IconValue;
} & {}>, {}>;
declare const VLigatureIcon: vue.DefineComponent<{
    icon: {
        type: PropType<IconValue>;
        required: true;
    };
    tag: {
        type: StringConstructor;
        required: true;
    };
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    icon?: unknown;
    tag?: unknown;
} & {
    tag: string;
    icon: IconValue;
} & {}>, {}>;
declare const VClassIcon: vue.DefineComponent<{
    icon: {
        type: PropType<IconValue>;
        required: true;
    };
    tag: {
        type: StringConstructor;
        required: true;
    };
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    icon?: unknown;
    tag?: unknown;
} & {
    tag: string;
    icon: IconValue;
} & {}>, {}>;

declare const VIcon: vue.DefineComponent<{
    theme: StringConstructor;
    tag: Omit<{
        type: StringConstructor;
        default: string;
    }, "default" | "type"> & {
        type: PropType<string>;
        default: string;
    };
    size: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    color: StringConstructor;
    left: BooleanConstructor;
    right: BooleanConstructor;
    icon: {
        type: PropType<IconValue>;
    };
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    theme?: unknown;
    tag?: unknown;
    size?: unknown;
    color?: unknown;
    left?: unknown;
    right?: unknown;
    icon?: unknown;
} & {
    left: boolean;
    right: boolean;
    tag: string;
    size: string | number;
} & {
    theme?: string | undefined;
    color?: string | undefined;
    icon?: IconValue | undefined;
}>, {
    left: boolean;
    right: boolean;
    tag: string;
    size: string | number;
}>;

interface srcObject {
    src?: string;
    srcset?: string;
    lazySrc?: string;
    aspect: number;
}
declare const VImg: vue.DefineComponent<{
    transition: {
        type: PropType<string | false | (vue.TransitionProps & {
            component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
        })>;
        default: string;
        validator: (val: unknown) => boolean;
    };
    aspectRatio: (StringConstructor | NumberConstructor)[];
    alt: StringConstructor;
    cover: BooleanConstructor;
    eager: BooleanConstructor;
    gradient: StringConstructor;
    lazySrc: StringConstructor;
    options: {
        type: PropType<IntersectionObserverInit>;
        default: () => {
            root: undefined;
            rootMargin: undefined;
            threshold: undefined;
        };
    };
    sizes: StringConstructor;
    src: {
        type: PropType<string | srcObject>;
        default: string;
    };
    srcset: StringConstructor;
    width: (StringConstructor | NumberConstructor)[];
}, {
    currentSrc: vue.Ref<string>;
    image: vue.Ref<HTMLImageElement | undefined>;
    state: vue.Ref<"error" | "idle" | "loading" | "loaded">;
    naturalWidth: vue.Ref<number | undefined>;
    naturalHeight: vue.Ref<number | undefined>;
}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, ("error" | "loadstart" | "load")[], "error" | "loadstart" | "load", vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    transition?: unknown;
    aspectRatio?: unknown;
    alt?: unknown;
    cover?: unknown;
    eager?: unknown;
    gradient?: unknown;
    lazySrc?: unknown;
    options?: unknown;
    sizes?: unknown;
    src?: unknown;
    srcset?: unknown;
    width?: unknown;
} & {
    transition: string | false | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    });
    options: IntersectionObserverInit;
    cover: boolean;
    eager: boolean;
    src: string | srcObject;
} & {
    width?: string | number | undefined;
    aspectRatio?: string | number | undefined;
    alt?: string | undefined;
    gradient?: string | undefined;
    lazySrc?: string | undefined;
    sizes?: string | undefined;
    srcset?: string | undefined;
}> & {
    onLoad?: ((...args: any[]) => any) | undefined;
    onError?: ((...args: any[]) => any) | undefined;
    onLoadstart?: ((...args: any[]) => any) | undefined;
}, {
    transition: string | false | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    });
    options: IntersectionObserverInit;
    cover: boolean;
    eager: boolean;
    src: string | srcObject;
}>;
declare type VImg = InstanceType<typeof VImg>;

declare const VItemGroup: vue.DefineComponent<{
    theme: StringConstructor;
    tag: {
        type: StringConstructor;
        default: string;
    };
    modelValue: {
        type: null;
        default: undefined;
    };
    multiple: BooleanConstructor;
    mandatory: vue.PropType<boolean | "force">;
    max: NumberConstructor;
    selectedClass: {
        type: vue.PropType<string>;
        default: string;
    };
    disabled: BooleanConstructor;
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (value: any) => true;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    theme?: unknown;
    tag?: unknown;
    modelValue?: unknown;
    multiple?: unknown;
    mandatory?: unknown;
    max?: unknown;
    selectedClass?: unknown;
    disabled?: unknown;
} & {
    tag: string;
    multiple: boolean;
    disabled: boolean;
    selectedClass: string;
} & {
    theme?: string | undefined;
    modelValue?: any;
    mandatory?: boolean | "force" | undefined;
    max?: number | undefined;
}> & {
    "onUpdate:modelValue"?: ((value: any) => any) | undefined;
}, {
    tag: string;
    modelValue: any;
    multiple: boolean;
    disabled: boolean;
    selectedClass: string;
}>;
declare type VItemGroup = InstanceType<typeof VItemGroup>;

declare const VItem: {
    new (...args: any[]): {
        $: vue.ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            disabled: boolean;
        }> & Omit<Readonly<{
            value?: unknown;
            disabled?: unknown;
            selectedClass?: unknown;
            $children?: unknown;
            'v-slots'?: unknown;
        } & {
            disabled: boolean;
        } & {
            value?: any;
            $children?: vue.VNodeChild | ((args_0: GroupItemProvide) => vue.VNodeChild) | {
                default?: ((args_0: GroupItemProvide) => vue.VNodeChild) | undefined;
            };
            "v-slots"?: {
                default?: false | ((args_0: GroupItemProvide) => vue.VNodeChild) | undefined;
            } | undefined;
            selectedClass?: string | undefined;
        }> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "disabled">;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            [name: string]: vue.Slot | undefined;
        }>;
        $root: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
        $parent: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
        $emit: (event: string, ...args: any[]) => void;
        $el: any;
        $options: vue.ComponentOptionsBase<Readonly<{
            value?: unknown;
            disabled?: unknown;
            selectedClass?: unknown;
            $children?: unknown;
            'v-slots'?: unknown;
        } & {
            disabled: boolean;
        } & {
            value?: any;
            $children?: vue.VNodeChild | ((args_0: GroupItemProvide) => vue.VNodeChild) | {
                default?: ((args_0: GroupItemProvide) => vue.VNodeChild) | undefined;
            };
            "v-slots"?: {
                default?: false | ((args_0: GroupItemProvide) => vue.VNodeChild) | undefined;
            } | undefined;
            selectedClass?: string | undefined;
        }>, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[] | undefined, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, {
            disabled: boolean;
        }> & {
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
            errorCaptured?: (((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void) | ((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void)[]) | undefined;
        };
        $forceUpdate: () => void;
        $nextTick: typeof vue.nextTick;
        $watch(source: string | Function, cb: Function, options?: vue.WatchOptions<boolean> | undefined): vue.WatchStopHandle;
    } & Readonly<{
        value?: unknown;
        disabled?: unknown;
        selectedClass?: unknown;
        $children?: unknown;
        'v-slots'?: unknown;
    } & {
        disabled: boolean;
    } & {
        value?: any;
        $children?: vue.VNodeChild | ((args_0: GroupItemProvide) => vue.VNodeChild) | {
            default?: ((args_0: GroupItemProvide) => vue.VNodeChild) | undefined;
        };
        "v-slots"?: {
            default?: false | ((args_0: GroupItemProvide) => vue.VNodeChild) | undefined;
        } | undefined;
        selectedClass?: string | undefined;
    }> & vue.ShallowUnwrapRef<() => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[] | undefined> & {} & {} & vue.ComponentCustomProperties;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & vue.ComponentOptionsBase<Readonly<{
    value?: unknown;
    disabled?: unknown;
    selectedClass?: unknown;
    $children?: unknown;
    'v-slots'?: unknown;
} & {
    disabled: boolean;
} & {
    value?: any;
    $children?: vue.VNodeChild | ((args_0: GroupItemProvide) => vue.VNodeChild) | {
        default?: ((args_0: GroupItemProvide) => vue.VNodeChild) | undefined;
    };
    "v-slots"?: {
        default?: false | ((args_0: GroupItemProvide) => vue.VNodeChild) | undefined;
    } | undefined;
    selectedClass?: string | undefined;
}>, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>[] | undefined, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, {
    disabled: boolean;
}> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & (new () => {
    $slots: MakeSlots<{
        default: [GroupItemProvide];
    }>;
});
declare type VItem = InstanceType<typeof VItem>;

declare const VKbd: vue.DefineComponent<{
    tag: {
        type: StringConstructor;
        default: string;
    };
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    tag?: unknown;
} & {
    tag: string;
} & {}>, {
    tag: string;
}>;

declare const VLabel: vue.DefineComponent<{
    theme: StringConstructor;
    disabled: BooleanConstructor;
    error: BooleanConstructor;
    text: StringConstructor;
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    theme?: unknown;
    disabled?: unknown;
    error?: unknown;
    text?: unknown;
} & {
    error: boolean;
    disabled: boolean;
} & {
    theme?: string | undefined;
    text?: string | undefined;
}>, {
    error: boolean;
    disabled: boolean;
}>;
declare type VLabel = InstanceType<typeof VLabel>;

declare const VLayout: vue.DefineComponent<{
    overlaps: vue.Prop<string[], string[]>;
    fullHeight: BooleanConstructor;
}, {
    getLayoutItem: (id: string) => {
        size: number;
        top: number;
        left: number;
        right: number;
        bottom: number;
        id: string;
    } | undefined;
    items: vue.ComputedRef<{
        size: number;
        top: number;
        left: number;
        right: number;
        bottom: number;
        id: string;
    }[]>;
}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    overlaps?: unknown;
    fullHeight?: unknown;
} & {
    fullHeight: boolean;
} & {
    overlaps?: string[] | undefined;
}>, {
    fullHeight: boolean;
}>;
declare type VLayout = InstanceType<typeof VLayout>;

declare const VLayoutItem: vue.DefineComponent<{
    name: {
        type: StringConstructor;
    };
    priority: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    absolute: BooleanConstructor;
    position: {
        type: PropType<"left" | "right" | "bottom" | "top">;
        required: true;
    };
    size: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    modelValue: BooleanConstructor;
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    name?: unknown;
    priority?: unknown;
    absolute?: unknown;
    position?: unknown;
    size?: unknown;
    modelValue?: unknown;
} & {
    priority: string | number;
    absolute: boolean;
    position: "left" | "right" | "bottom" | "top";
    modelValue: boolean;
    size: string | number;
} & {
    name?: string | undefined;
}>, {
    priority: string | number;
    absolute: boolean;
    modelValue: boolean;
    size: string | number;
}>;

declare const VLazy: vue.DefineComponent<{
    transition: Omit<{
        type: PropType<string | false | (vue.TransitionProps & {
            component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
        })>;
        default: string;
        validator: (val: unknown) => boolean;
    }, "default" | "type"> & {
        type: PropType<string | false | (vue.TransitionProps & {
            component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
        })>;
        default: string | false | (vue.TransitionProps & {
            component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
        });
    };
    tag: {
        type: StringConstructor;
        default: string;
    };
    height: (StringConstructor | NumberConstructor)[];
    maxHeight: (StringConstructor | NumberConstructor)[];
    maxWidth: (StringConstructor | NumberConstructor)[];
    minHeight: (StringConstructor | NumberConstructor)[];
    minWidth: (StringConstructor | NumberConstructor)[];
    width: (StringConstructor | NumberConstructor)[];
    modelValue: BooleanConstructor;
    options: {
        type: PropType<IntersectionObserverInit>;
        default: () => {
            root: undefined;
            rootMargin: undefined;
            threshold: undefined;
        };
    };
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (value: boolean) => true;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    transition?: unknown;
    tag?: unknown;
    height?: unknown;
    maxHeight?: unknown;
    maxWidth?: unknown;
    minHeight?: unknown;
    minWidth?: unknown;
    width?: unknown;
    modelValue?: unknown;
    options?: unknown;
} & {
    tag: string;
    transition: string | false | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    });
    options: IntersectionObserverInit;
    modelValue: boolean;
} & {
    width?: string | number | undefined;
    height?: string | number | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
}> & {
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
}, {
    tag: string;
    transition: string | false | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    });
    options: IntersectionObserverInit;
    modelValue: boolean;
}>;

declare type SelectStrategyFn = (data: {
    id: string;
    value: boolean;
    selected: Map<string, 'on' | 'off' | 'indeterminate'>;
    children: Map<string, string[]>;
    parents: Map<string, string>;
    event?: Event;
}) => Map<string, 'on' | 'off' | 'indeterminate'>;

declare type OpenStrategyFn = (data: {
    id: string;
    value: boolean;
    opened: Set<string>;
    children: Map<string, string[]>;
    parents: Map<string, string>;
    event?: Event;
}) => Set<string>;

declare type ActiveStrategyFn = (data: {
    id: string;
    value: boolean;
    active: Set<string>;
    children: Map<string, string[]>;
    parents: Map<string, string>;
    event?: Event;
}) => Set<string>;

declare type SelectStrategy = 'single-leaf' | 'leaf' | 'independent' | 'classic' | SelectStrategyFn;
declare type OpenStrategy = 'single' | 'multiple' | OpenStrategyFn;
declare type ActiveStrategy = 'single' | 'multiple' | ActiveStrategyFn;

declare type ListGroupActivatorSlot = {
    props: {
        onClick: (e: Event) => void;
        appendIcon: string;
        class: string;
    };
};
declare const VListGroup: {
    new (...args: any[]): {
        $: vue.ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            tag: string;
            expandIcon: string;
            collapseIcon: string;
        }> & Omit<Readonly<{
            value?: unknown;
            tag?: unknown;
            expandIcon?: unknown;
            collapseIcon?: unknown;
            $children?: unknown;
            'v-slots'?: unknown;
        } & {
            tag: string;
            expandIcon: string;
            collapseIcon: string;
        } & {
            value?: any;
            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                activator?: ((args_0: ListGroupActivatorSlot) => vue.VNodeChild) | undefined;
                default?: (() => vue.VNodeChild) | undefined;
            };
            "v-slots"?: {
                activator?: false | ((args_0: ListGroupActivatorSlot) => vue.VNodeChild) | undefined;
                default?: false | (() => vue.VNodeChild) | undefined;
            } | undefined;
        }> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "tag" | "expandIcon" | "collapseIcon">;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            [name: string]: vue.Slot | undefined;
        }>;
        $root: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
        $parent: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
        $emit: (event: string, ...args: any[]) => void;
        $el: any;
        $options: vue.ComponentOptionsBase<Readonly<{
            value?: unknown;
            tag?: unknown;
            expandIcon?: unknown;
            collapseIcon?: unknown;
            $children?: unknown;
            'v-slots'?: unknown;
        } & {
            tag: string;
            expandIcon: string;
            collapseIcon: string;
        } & {
            value?: any;
            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                activator?: ((args_0: ListGroupActivatorSlot) => vue.VNodeChild) | undefined;
                default?: (() => vue.VNodeChild) | undefined;
            };
            "v-slots"?: {
                activator?: false | ((args_0: ListGroupActivatorSlot) => vue.VNodeChild) | undefined;
                default?: false | (() => vue.VNodeChild) | undefined;
            } | undefined;
        }>, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Omit<Record<string, any>, "items">, string, {
            tag: string;
            expandIcon: string;
            collapseIcon: string;
        }> & {
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
            errorCaptured?: (((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void) | ((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void)[]) | undefined;
        };
        $forceUpdate: () => void;
        $nextTick: typeof vue.nextTick;
        $watch(source: string | Function, cb: Function, options?: vue.WatchOptions<boolean> | undefined): vue.WatchStopHandle;
    } & Readonly<{
        value?: unknown;
        tag?: unknown;
        expandIcon?: unknown;
        collapseIcon?: unknown;
        $children?: unknown;
        'v-slots'?: unknown;
    } & {
        tag: string;
        expandIcon: string;
        collapseIcon: string;
    } & {
        value?: any;
        $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
            activator?: ((args_0: ListGroupActivatorSlot) => vue.VNodeChild) | undefined;
            default?: (() => vue.VNodeChild) | undefined;
        };
        "v-slots"?: {
            activator?: false | ((args_0: ListGroupActivatorSlot) => vue.VNodeChild) | undefined;
            default?: false | (() => vue.VNodeChild) | undefined;
        } | undefined;
    }> & vue.ShallowUnwrapRef<() => JSX.Element> & {} & {} & vue.ComponentCustomProperties;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & vue.ComponentOptionsBase<Readonly<{
    value?: unknown;
    tag?: unknown;
    expandIcon?: unknown;
    collapseIcon?: unknown;
    $children?: unknown;
    'v-slots'?: unknown;
} & {
    tag: string;
    expandIcon: string;
    collapseIcon: string;
} & {
    value?: any;
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        activator?: ((args_0: ListGroupActivatorSlot) => vue.VNodeChild) | undefined;
        default?: (() => vue.VNodeChild) | undefined;
    };
    "v-slots"?: {
        activator?: false | ((args_0: ListGroupActivatorSlot) => vue.VNodeChild) | undefined;
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
}>, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Omit<Record<string, any>, "items">, string, {
    tag: string;
    expandIcon: string;
    collapseIcon: string;
}> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & (new <T extends InternalListItem>() => {
    $props: {
        items?: T[] | undefined;
    };
    $slots: MakeSlots<{
        activator: [ListGroupActivatorSlot];
        default: [];
    }>;
});

declare type InternalListItem = {
    type?: 'item' | 'subheader' | 'divider';
    props?: Record<string, any>;
    children?: InternalListItem[];
};
declare const VList: {
    new (...args: any[]): {
        $: vue.ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            tag: string;
            nav: boolean;
            density: "default" | "comfortable" | "compact" | null;
            rounded: string | number | boolean;
            disabled: boolean;
            lines: string;
            selectStrategy: SelectStrategy | ("single-leaf" & {}) | ("leaf" & {}) | ("independent" & {}) | ("classic" & {});
            openStrategy: OpenStrategy | ("multiple" & {}) | ("single" & {});
            activeStrategy: ActiveStrategy | ("multiple" & {}) | ("single" & {});
        }> & Omit<Readonly<{
            width?: unknown;
            height?: unknown;
            tag?: unknown;
            theme?: unknown;
            nav?: unknown;
            active?: unknown;
            maxHeight?: unknown;
            maxWidth?: unknown;
            minHeight?: unknown;
            minWidth?: unknown;
            border?: unknown;
            density?: unknown;
            elevation?: unknown;
            rounded?: unknown;
            color?: unknown;
            disabled?: unknown;
            selected?: unknown;
            lines?: unknown;
            opened?: unknown;
            selectStrategy?: unknown;
            openStrategy?: unknown;
            activeStrategy?: unknown;
            $children?: unknown;
            'v-slots'?: unknown;
        } & {
            tag: string;
            nav: boolean;
            density: "default" | "comfortable" | "compact" | null;
            disabled: boolean;
            lines: string;
            selectStrategy: SelectStrategy | ("single-leaf" & {}) | ("leaf" & {}) | ("independent" & {}) | ("classic" & {});
            openStrategy: OpenStrategy | ("multiple" & {}) | ("single" & {});
            activeStrategy: ActiveStrategy | ("multiple" & {}) | ("single" & {});
        } & {
            width?: string | number | undefined;
            height?: string | number | undefined;
            theme?: string | undefined;
            active?: string[] | undefined;
            maxHeight?: string | number | undefined;
            maxWidth?: string | number | undefined;
            minHeight?: string | number | undefined;
            minWidth?: string | number | undefined;
            $children?: unknown;
            "v-slots"?: {
                subheader?: false | (() => vue.VNodeChild) | undefined;
                header?: false | ((args_0: ListGroupActivatorSlot) => vue.VNodeChild) | undefined;
                item?: false | ((args_0: unknown) => vue.VNodeChild) | undefined;
            } | undefined;
            border?: string | number | boolean | undefined;
            elevation?: string | number | undefined;
            rounded?: string | number | boolean | undefined;
            color?: string | undefined;
            selected?: string[] | undefined;
            opened?: string[] | undefined;
        }> & {
            "onUpdate:active"?: ((val: string[]) => any) | undefined;
            "onUpdate:selected"?: ((val: string[]) => any) | undefined;
            "onUpdate:opened"?: ((val: string[]) => any) | undefined;
        } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "tag" | "nav" | "density" | "rounded" | "disabled" | "lines" | "selectStrategy" | "openStrategy" | "activeStrategy">;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            [name: string]: vue.Slot | undefined;
        }>;
        $root: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
        $parent: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
        $emit: ((event: "update:active", val: string[]) => void) & ((event: "update:selected", val: string[]) => void) & ((event: "update:opened", val: string[]) => void);
        $el: any;
        $options: vue.ComponentOptionsBase<Readonly<{
            width?: unknown;
            height?: unknown;
            tag?: unknown;
            theme?: unknown;
            nav?: unknown;
            active?: unknown;
            maxHeight?: unknown;
            maxWidth?: unknown;
            minHeight?: unknown;
            minWidth?: unknown;
            border?: unknown;
            density?: unknown;
            elevation?: unknown;
            rounded?: unknown;
            color?: unknown;
            disabled?: unknown;
            selected?: unknown;
            lines?: unknown;
            opened?: unknown;
            selectStrategy?: unknown;
            openStrategy?: unknown;
            activeStrategy?: unknown;
            $children?: unknown;
            'v-slots'?: unknown;
        } & {
            tag: string;
            nav: boolean;
            density: "default" | "comfortable" | "compact" | null;
            disabled: boolean;
            lines: string;
            selectStrategy: SelectStrategy | ("single-leaf" & {}) | ("leaf" & {}) | ("independent" & {}) | ("classic" & {});
            openStrategy: OpenStrategy | ("multiple" & {}) | ("single" & {});
            activeStrategy: ActiveStrategy | ("multiple" & {}) | ("single" & {});
        } & {
            width?: string | number | undefined;
            height?: string | number | undefined;
            theme?: string | undefined;
            active?: string[] | undefined;
            maxHeight?: string | number | undefined;
            maxWidth?: string | number | undefined;
            minHeight?: string | number | undefined;
            minWidth?: string | number | undefined;
            $children?: unknown;
            "v-slots"?: {
                subheader?: false | (() => vue.VNodeChild) | undefined;
                header?: false | ((args_0: ListGroupActivatorSlot) => vue.VNodeChild) | undefined;
                item?: false | ((args_0: unknown) => vue.VNodeChild) | undefined;
            } | undefined;
            border?: string | number | boolean | undefined;
            elevation?: string | number | undefined;
            rounded?: string | number | boolean | undefined;
            color?: string | undefined;
            selected?: string[] | undefined;
            opened?: string[] | undefined;
        }> & {
            "onUpdate:active"?: ((val: string[]) => any) | undefined;
            "onUpdate:selected"?: ((val: string[]) => any) | undefined;
            "onUpdate:opened"?: ((val: string[]) => any) | undefined;
        }, {
            open: (id: string, value: boolean, event?: Event | undefined) => void;
            select: (id: string, value: boolean, event?: Event | undefined) => void;
            activate: (id: string, value: boolean, event?: Event | undefined) => void;
        }, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Omit<{
            'update:selected': (val: string[]) => boolean;
            'update:opened': (val: string[]) => boolean;
            'update:active': (val: string[]) => boolean;
        }, "items">, string, {
            tag: string;
            nav: boolean;
            density: "default" | "comfortable" | "compact" | null;
            rounded: string | number | boolean;
            disabled: boolean;
            lines: string;
            selectStrategy: SelectStrategy | ("single-leaf" & {}) | ("leaf" & {}) | ("independent" & {}) | ("classic" & {});
            openStrategy: OpenStrategy | ("multiple" & {}) | ("single" & {});
            activeStrategy: ActiveStrategy | ("multiple" & {}) | ("single" & {});
        }> & {
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
            errorCaptured?: (((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void) | ((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void)[]) | undefined;
        };
        $forceUpdate: () => void;
        $nextTick: typeof vue.nextTick;
        $watch(source: string | Function, cb: Function, options?: vue.WatchOptions<boolean> | undefined): vue.WatchStopHandle;
    } & Readonly<{
        width?: unknown;
        height?: unknown;
        tag?: unknown;
        theme?: unknown;
        nav?: unknown;
        active?: unknown;
        maxHeight?: unknown;
        maxWidth?: unknown;
        minHeight?: unknown;
        minWidth?: unknown;
        border?: unknown;
        density?: unknown;
        elevation?: unknown;
        rounded?: unknown;
        color?: unknown;
        disabled?: unknown;
        selected?: unknown;
        lines?: unknown;
        opened?: unknown;
        selectStrategy?: unknown;
        openStrategy?: unknown;
        activeStrategy?: unknown;
        $children?: unknown;
        'v-slots'?: unknown;
    } & {
        tag: string;
        nav: boolean;
        density: "default" | "comfortable" | "compact" | null;
        disabled: boolean;
        lines: string;
        selectStrategy: SelectStrategy | ("single-leaf" & {}) | ("leaf" & {}) | ("independent" & {}) | ("classic" & {});
        openStrategy: OpenStrategy | ("multiple" & {}) | ("single" & {});
        activeStrategy: ActiveStrategy | ("multiple" & {}) | ("single" & {});
    } & {
        width?: string | number | undefined;
        height?: string | number | undefined;
        theme?: string | undefined;
        active?: string[] | undefined;
        maxHeight?: string | number | undefined;
        maxWidth?: string | number | undefined;
        minHeight?: string | number | undefined;
        minWidth?: string | number | undefined;
        $children?: unknown;
        "v-slots"?: {
            subheader?: false | (() => vue.VNodeChild) | undefined;
            header?: false | ((args_0: ListGroupActivatorSlot) => vue.VNodeChild) | undefined;
            item?: false | ((args_0: unknown) => vue.VNodeChild) | undefined;
        } | undefined;
        border?: string | number | boolean | undefined;
        elevation?: string | number | undefined;
        rounded?: string | number | boolean | undefined;
        color?: string | undefined;
        selected?: string[] | undefined;
        opened?: string[] | undefined;
    }> & {
        "onUpdate:active"?: ((val: string[]) => any) | undefined;
        "onUpdate:selected"?: ((val: string[]) => any) | undefined;
        "onUpdate:opened"?: ((val: string[]) => any) | undefined;
    } & vue.ShallowUnwrapRef<{
        open: (id: string, value: boolean, event?: Event | undefined) => void;
        select: (id: string, value: boolean, event?: Event | undefined) => void;
        activate: (id: string, value: boolean, event?: Event | undefined) => void;
    }> & {} & {} & vue.ComponentCustomProperties;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & vue.ComponentOptionsBase<Readonly<{
    width?: unknown;
    height?: unknown;
    tag?: unknown;
    theme?: unknown;
    nav?: unknown;
    active?: unknown;
    maxHeight?: unknown;
    maxWidth?: unknown;
    minHeight?: unknown;
    minWidth?: unknown;
    border?: unknown;
    density?: unknown;
    elevation?: unknown;
    rounded?: unknown;
    color?: unknown;
    disabled?: unknown;
    selected?: unknown;
    lines?: unknown;
    opened?: unknown;
    selectStrategy?: unknown;
    openStrategy?: unknown;
    activeStrategy?: unknown;
    $children?: unknown;
    'v-slots'?: unknown;
} & {
    tag: string;
    nav: boolean;
    density: "default" | "comfortable" | "compact" | null;
    disabled: boolean;
    lines: string;
    selectStrategy: SelectStrategy | ("single-leaf" & {}) | ("leaf" & {}) | ("independent" & {}) | ("classic" & {});
    openStrategy: OpenStrategy | ("multiple" & {}) | ("single" & {});
    activeStrategy: ActiveStrategy | ("multiple" & {}) | ("single" & {});
} & {
    width?: string | number | undefined;
    height?: string | number | undefined;
    theme?: string | undefined;
    active?: string[] | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
    $children?: unknown;
    "v-slots"?: {
        subheader?: false | (() => vue.VNodeChild) | undefined;
        header?: false | ((args_0: ListGroupActivatorSlot) => vue.VNodeChild) | undefined;
        item?: false | ((args_0: unknown) => vue.VNodeChild) | undefined;
    } | undefined;
    border?: string | number | boolean | undefined;
    elevation?: string | number | undefined;
    rounded?: string | number | boolean | undefined;
    color?: string | undefined;
    selected?: string[] | undefined;
    opened?: string[] | undefined;
}> & {
    "onUpdate:active"?: ((val: string[]) => any) | undefined;
    "onUpdate:selected"?: ((val: string[]) => any) | undefined;
    "onUpdate:opened"?: ((val: string[]) => any) | undefined;
}, {
    open: (id: string, value: boolean, event?: Event | undefined) => void;
    select: (id: string, value: boolean, event?: Event | undefined) => void;
    activate: (id: string, value: boolean, event?: Event | undefined) => void;
}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Omit<{
    'update:selected': (val: string[]) => boolean;
    'update:opened': (val: string[]) => boolean;
    'update:active': (val: string[]) => boolean;
}, "items">, string, {
    tag: string;
    nav: boolean;
    density: "default" | "comfortable" | "compact" | null;
    rounded: string | number | boolean;
    disabled: boolean;
    lines: string;
    selectStrategy: SelectStrategy | ("single-leaf" & {}) | ("leaf" & {}) | ("independent" & {}) | ("classic" & {});
    openStrategy: OpenStrategy | ("multiple" & {}) | ("single" & {});
    activeStrategy: ActiveStrategy | ("multiple" & {}) | ("single" & {});
}> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & (new <T>() => {
    $props: {
        items?: T[] | undefined;
    };
    $slots: MakeSlots<{
        subheader: [];
        header: [ListGroupActivatorSlot];
        item: [T];
    }>;
});
declare type VList = InstanceType<typeof VList>;

declare const VListSubheader: vue.DefineComponent<{
    tag: {
        type: StringConstructor;
        default: string;
    };
    color: StringConstructor;
    inset: BooleanConstructor;
    sticky: BooleanConstructor;
    text: StringConstructor;
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    tag?: unknown;
    color?: unknown;
    inset?: unknown;
    sticky?: unknown;
    text?: unknown;
} & {
    tag: string;
    inset: boolean;
    sticky: boolean;
} & {
    text?: string | undefined;
    color?: string | undefined;
}>, {
    tag: string;
    inset: boolean;
    sticky: boolean;
}>;

declare const VListImg: vue.DefineComponent<{
    tag: {
        type: StringConstructor;
        default: string;
    };
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    tag?: unknown;
} & {
    tag: string;
} & {}>, {
    tag: string;
}>;

declare type ListItemSlot = {
    isActive: boolean;
    activate: (value: boolean) => void;
    isSelected: boolean;
    select: (value: boolean) => void;
};
declare type ListItemTitleSlot = {
    title?: string;
};
declare type ListItemSubtitleSlot = {
    subtitle?: string;
};
declare const VListItem: {
    new (...args: any[]): {
        $: vue.ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            replace: boolean;
            link: boolean;
            tag: string;
            active: boolean;
            density: "default" | "comfortable" | "compact" | null;
            rounded: string | number | boolean;
            disabled: boolean;
            variant: "text" | "outlined" | "plain" | "contained" | "contained-flat" | "contained-text";
        }> & Omit<Readonly<{
            color?: unknown;
            textColor?: unknown;
            variant?: unknown;
            theme?: unknown;
            tag?: unknown;
            href?: unknown;
            replace?: unknown;
            to?: unknown;
            rounded?: unknown;
            elevation?: unknown;
            height?: unknown;
            maxHeight?: unknown;
            maxWidth?: unknown;
            minHeight?: unknown;
            minWidth?: unknown;
            width?: unknown;
            density?: unknown;
            border?: unknown;
            active?: unknown;
            activeColor?: unknown;
            activeClass?: unknown;
            appendAvatar?: unknown;
            appendIcon?: unknown;
            disabled?: unknown;
            link?: unknown;
            prependAvatar?: unknown;
            prependIcon?: unknown;
            subtitle?: unknown;
            title?: unknown;
            value?: unknown;
            $children?: unknown;
            'v-slots'?: unknown;
        } & {
            replace: boolean;
            link: boolean;
            tag: string;
            active: boolean;
            density: "default" | "comfortable" | "compact" | null;
            disabled: boolean;
            variant: "text" | "outlined" | "plain" | "contained" | "contained-flat" | "contained-text";
        } & {
            width?: string | number | undefined;
            height?: string | number | undefined;
            value?: any;
            theme?: string | undefined;
            title?: string | undefined;
            maxHeight?: string | number | undefined;
            maxWidth?: string | number | undefined;
            minHeight?: string | number | undefined;
            minWidth?: string | number | undefined;
            $children?: vue.VNodeChild | ((args_0: ListItemSlot) => vue.VNodeChild) | {
                prepend?: ((args_0: ListItemSlot) => vue.VNodeChild) | undefined;
                append?: ((args_0: ListItemSlot) => vue.VNodeChild) | undefined;
                default?: ((args_0: ListItemSlot) => vue.VNodeChild) | undefined;
                title?: ((args_0: ListItemTitleSlot) => vue.VNodeChild) | undefined;
                subtitle?: ((args_0: ListItemSubtitleSlot) => vue.VNodeChild) | undefined;
            };
            "v-slots"?: {
                prepend?: false | ((args_0: ListItemSlot) => vue.VNodeChild) | undefined;
                append?: false | ((args_0: ListItemSlot) => vue.VNodeChild) | undefined;
                default?: false | ((args_0: ListItemSlot) => vue.VNodeChild) | undefined;
                title?: false | ((args_0: ListItemTitleSlot) => vue.VNodeChild) | undefined;
                subtitle?: false | ((args_0: ListItemSubtitleSlot) => vue.VNodeChild) | undefined;
            } | undefined;
            border?: string | number | boolean | undefined;
            elevation?: string | number | undefined;
            rounded?: string | number | boolean | undefined;
            color?: string | undefined;
            textColor?: string | undefined;
            to?: vue_router.RouteLocationRaw | undefined;
            href?: string | undefined;
            prependIcon?: string | undefined;
            appendIcon?: string | undefined;
            activeClass?: string | undefined;
            activeColor?: string | undefined;
            appendAvatar?: string | undefined;
            prependAvatar?: string | undefined;
            subtitle?: string | undefined;
        }> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "replace" | "link" | "tag" | "active" | "density" | "rounded" | "disabled" | "variant">;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            [name: string]: vue.Slot | undefined;
        }>;
        $root: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
        $parent: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
        $emit: (event: string, ...args: any[]) => void;
        $el: any;
        $options: vue.ComponentOptionsBase<Readonly<{
            color?: unknown;
            textColor?: unknown;
            variant?: unknown;
            theme?: unknown;
            tag?: unknown;
            href?: unknown;
            replace?: unknown;
            to?: unknown;
            rounded?: unknown;
            elevation?: unknown;
            height?: unknown;
            maxHeight?: unknown;
            maxWidth?: unknown;
            minHeight?: unknown;
            minWidth?: unknown;
            width?: unknown;
            density?: unknown;
            border?: unknown;
            active?: unknown;
            activeColor?: unknown;
            activeClass?: unknown;
            appendAvatar?: unknown;
            appendIcon?: unknown;
            disabled?: unknown;
            link?: unknown;
            prependAvatar?: unknown;
            prependIcon?: unknown;
            subtitle?: unknown;
            title?: unknown;
            value?: unknown;
            $children?: unknown;
            'v-slots'?: unknown;
        } & {
            replace: boolean;
            link: boolean;
            tag: string;
            active: boolean;
            density: "default" | "comfortable" | "compact" | null;
            disabled: boolean;
            variant: "text" | "outlined" | "plain" | "contained" | "contained-flat" | "contained-text";
        } & {
            width?: string | number | undefined;
            height?: string | number | undefined;
            value?: any;
            theme?: string | undefined;
            title?: string | undefined;
            maxHeight?: string | number | undefined;
            maxWidth?: string | number | undefined;
            minHeight?: string | number | undefined;
            minWidth?: string | number | undefined;
            $children?: vue.VNodeChild | ((args_0: ListItemSlot) => vue.VNodeChild) | {
                prepend?: ((args_0: ListItemSlot) => vue.VNodeChild) | undefined;
                append?: ((args_0: ListItemSlot) => vue.VNodeChild) | undefined;
                default?: ((args_0: ListItemSlot) => vue.VNodeChild) | undefined;
                title?: ((args_0: ListItemTitleSlot) => vue.VNodeChild) | undefined;
                subtitle?: ((args_0: ListItemSubtitleSlot) => vue.VNodeChild) | undefined;
            };
            "v-slots"?: {
                prepend?: false | ((args_0: ListItemSlot) => vue.VNodeChild) | undefined;
                append?: false | ((args_0: ListItemSlot) => vue.VNodeChild) | undefined;
                default?: false | ((args_0: ListItemSlot) => vue.VNodeChild) | undefined;
                title?: false | ((args_0: ListItemTitleSlot) => vue.VNodeChild) | undefined;
                subtitle?: false | ((args_0: ListItemSubtitleSlot) => vue.VNodeChild) | undefined;
            } | undefined;
            border?: string | number | boolean | undefined;
            elevation?: string | number | undefined;
            rounded?: string | number | boolean | undefined;
            color?: string | undefined;
            textColor?: string | undefined;
            to?: vue_router.RouteLocationRaw | undefined;
            href?: string | undefined;
            prependIcon?: string | undefined;
            appendIcon?: string | undefined;
            activeClass?: string | undefined;
            activeColor?: string | undefined;
            appendAvatar?: string | undefined;
            prependAvatar?: string | undefined;
            subtitle?: string | undefined;
        }>, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, {
            replace: boolean;
            link: boolean;
            tag: string;
            active: boolean;
            density: "default" | "comfortable" | "compact" | null;
            rounded: string | number | boolean;
            disabled: boolean;
            variant: "text" | "outlined" | "plain" | "contained" | "contained-flat" | "contained-text";
        }> & {
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
            errorCaptured?: (((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void) | ((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void)[]) | undefined;
        };
        $forceUpdate: () => void;
        $nextTick: typeof vue.nextTick;
        $watch(source: string | Function, cb: Function, options?: vue.WatchOptions<boolean> | undefined): vue.WatchStopHandle;
    } & Readonly<{
        color?: unknown;
        textColor?: unknown;
        variant?: unknown;
        theme?: unknown;
        tag?: unknown;
        href?: unknown;
        replace?: unknown;
        to?: unknown;
        rounded?: unknown;
        elevation?: unknown;
        height?: unknown;
        maxHeight?: unknown;
        maxWidth?: unknown;
        minHeight?: unknown;
        minWidth?: unknown;
        width?: unknown;
        density?: unknown;
        border?: unknown;
        active?: unknown;
        activeColor?: unknown;
        activeClass?: unknown;
        appendAvatar?: unknown;
        appendIcon?: unknown;
        disabled?: unknown;
        link?: unknown;
        prependAvatar?: unknown;
        prependIcon?: unknown;
        subtitle?: unknown;
        title?: unknown;
        value?: unknown;
        $children?: unknown;
        'v-slots'?: unknown;
    } & {
        replace: boolean;
        link: boolean;
        tag: string;
        active: boolean;
        density: "default" | "comfortable" | "compact" | null;
        disabled: boolean;
        variant: "text" | "outlined" | "plain" | "contained" | "contained-flat" | "contained-text";
    } & {
        width?: string | number | undefined;
        height?: string | number | undefined;
        value?: any;
        theme?: string | undefined;
        title?: string | undefined;
        maxHeight?: string | number | undefined;
        maxWidth?: string | number | undefined;
        minHeight?: string | number | undefined;
        minWidth?: string | number | undefined;
        $children?: vue.VNodeChild | ((args_0: ListItemSlot) => vue.VNodeChild) | {
            prepend?: ((args_0: ListItemSlot) => vue.VNodeChild) | undefined;
            append?: ((args_0: ListItemSlot) => vue.VNodeChild) | undefined;
            default?: ((args_0: ListItemSlot) => vue.VNodeChild) | undefined;
            title?: ((args_0: ListItemTitleSlot) => vue.VNodeChild) | undefined;
            subtitle?: ((args_0: ListItemSubtitleSlot) => vue.VNodeChild) | undefined;
        };
        "v-slots"?: {
            prepend?: false | ((args_0: ListItemSlot) => vue.VNodeChild) | undefined;
            append?: false | ((args_0: ListItemSlot) => vue.VNodeChild) | undefined;
            default?: false | ((args_0: ListItemSlot) => vue.VNodeChild) | undefined;
            title?: false | ((args_0: ListItemTitleSlot) => vue.VNodeChild) | undefined;
            subtitle?: false | ((args_0: ListItemSubtitleSlot) => vue.VNodeChild) | undefined;
        } | undefined;
        border?: string | number | boolean | undefined;
        elevation?: string | number | undefined;
        rounded?: string | number | boolean | undefined;
        color?: string | undefined;
        textColor?: string | undefined;
        to?: vue_router.RouteLocationRaw | undefined;
        href?: string | undefined;
        prependIcon?: string | undefined;
        appendIcon?: string | undefined;
        activeClass?: string | undefined;
        activeColor?: string | undefined;
        appendAvatar?: string | undefined;
        prependAvatar?: string | undefined;
        subtitle?: string | undefined;
    }> & vue.ShallowUnwrapRef<() => JSX.Element> & {} & {} & vue.ComponentCustomProperties;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & vue.ComponentOptionsBase<Readonly<{
    color?: unknown;
    textColor?: unknown;
    variant?: unknown;
    theme?: unknown;
    tag?: unknown;
    href?: unknown;
    replace?: unknown;
    to?: unknown;
    rounded?: unknown;
    elevation?: unknown;
    height?: unknown;
    maxHeight?: unknown;
    maxWidth?: unknown;
    minHeight?: unknown;
    minWidth?: unknown;
    width?: unknown;
    density?: unknown;
    border?: unknown;
    active?: unknown;
    activeColor?: unknown;
    activeClass?: unknown;
    appendAvatar?: unknown;
    appendIcon?: unknown;
    disabled?: unknown;
    link?: unknown;
    prependAvatar?: unknown;
    prependIcon?: unknown;
    subtitle?: unknown;
    title?: unknown;
    value?: unknown;
    $children?: unknown;
    'v-slots'?: unknown;
} & {
    replace: boolean;
    link: boolean;
    tag: string;
    active: boolean;
    density: "default" | "comfortable" | "compact" | null;
    disabled: boolean;
    variant: "text" | "outlined" | "plain" | "contained" | "contained-flat" | "contained-text";
} & {
    width?: string | number | undefined;
    height?: string | number | undefined;
    value?: any;
    theme?: string | undefined;
    title?: string | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
    $children?: vue.VNodeChild | ((args_0: ListItemSlot) => vue.VNodeChild) | {
        prepend?: ((args_0: ListItemSlot) => vue.VNodeChild) | undefined;
        append?: ((args_0: ListItemSlot) => vue.VNodeChild) | undefined;
        default?: ((args_0: ListItemSlot) => vue.VNodeChild) | undefined;
        title?: ((args_0: ListItemTitleSlot) => vue.VNodeChild) | undefined;
        subtitle?: ((args_0: ListItemSubtitleSlot) => vue.VNodeChild) | undefined;
    };
    "v-slots"?: {
        prepend?: false | ((args_0: ListItemSlot) => vue.VNodeChild) | undefined;
        append?: false | ((args_0: ListItemSlot) => vue.VNodeChild) | undefined;
        default?: false | ((args_0: ListItemSlot) => vue.VNodeChild) | undefined;
        title?: false | ((args_0: ListItemTitleSlot) => vue.VNodeChild) | undefined;
        subtitle?: false | ((args_0: ListItemSubtitleSlot) => vue.VNodeChild) | undefined;
    } | undefined;
    border?: string | number | boolean | undefined;
    elevation?: string | number | undefined;
    rounded?: string | number | boolean | undefined;
    color?: string | undefined;
    textColor?: string | undefined;
    to?: vue_router.RouteLocationRaw | undefined;
    href?: string | undefined;
    prependIcon?: string | undefined;
    appendIcon?: string | undefined;
    activeClass?: string | undefined;
    activeColor?: string | undefined;
    appendAvatar?: string | undefined;
    prependAvatar?: string | undefined;
    subtitle?: string | undefined;
}>, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, {
    replace: boolean;
    link: boolean;
    tag: string;
    active: boolean;
    density: "default" | "comfortable" | "compact" | null;
    rounded: string | number | boolean;
    disabled: boolean;
    variant: "text" | "outlined" | "plain" | "contained" | "contained-flat" | "contained-text";
}> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & (new () => {
    $slots: MakeSlots<{
        prepend: [ListItemSlot];
        append: [ListItemSlot];
        default: [ListItemSlot];
        title: [ListItemTitleSlot];
        subtitle: [ListItemSubtitleSlot];
    }>;
});
declare type VListItem = InstanceType<typeof VListItem>;

declare const VListItemAvatar: vue.DefineComponent<{
    tag: {
        type: StringConstructor;
        default: string;
    };
    left: BooleanConstructor;
    right: BooleanConstructor;
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    tag?: unknown;
    left?: unknown;
    right?: unknown;
} & {
    left: boolean;
    right: boolean;
    tag: string;
} & {}>, {
    left: boolean;
    right: boolean;
    tag: string;
}>;

declare const VListItemHeader: vue.DefineComponent<{
    tag: {
        type: StringConstructor;
        default: string;
    };
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    tag?: unknown;
} & {
    tag: string;
} & {}>, {
    tag: string;
}>;

declare const VListItemMedia: vue.DefineComponent<{
    tag: {
        type: StringConstructor;
        default: string;
    };
    left: BooleanConstructor;
    right: BooleanConstructor;
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    tag?: unknown;
    left?: unknown;
    right?: unknown;
} & {
    left: boolean;
    right: boolean;
    tag: string;
} & {}>, {
    left: boolean;
    right: boolean;
    tag: string;
}>;

declare const VListItemSubtitle: vue.DefineComponent<{
    tag: {
        type: StringConstructor;
        default: string;
    };
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    tag?: unknown;
} & {
    tag: string;
} & {}>, {
    tag: string;
}>;

declare const VListItemTitle: vue.DefineComponent<{
    tag: {
        type: StringConstructor;
        default: string;
    };
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    tag?: unknown;
} & {
    tag: string;
} & {}>, {
    tag: string;
}>;

declare const VLocaleProvider: vue.DefineComponent<{
    locale: StringConstructor;
    fallbackLocale: StringConstructor;
    messages: ObjectConstructor;
    rtl: {
        type: BooleanConstructor;
        default: undefined;
    };
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    locale?: unknown;
    fallbackLocale?: unknown;
    messages?: unknown;
    rtl?: unknown;
} & {} & {
    locale?: string | undefined;
    fallbackLocale?: string | undefined;
    messages?: Record<string, any> | undefined;
    rtl?: boolean | undefined;
}>, {
    rtl: boolean;
}>;

declare const VMain: vue.DefineComponent<{
    tag: Omit<{
        type: StringConstructor;
        default: string;
    }, "default" | "type"> & {
        type: vue.PropType<string>;
        default: string;
    };
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    tag?: unknown;
} & {
    tag: string;
} & {}>, {
    tag: string;
}>;

declare const VMenu: {
    new (...args: any[]): {
        $: vue.ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            transition: string | false | (vue.TransitionProps & {
                component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
            }) | {
                readonly component: vue.DefineComponent<{
                    target: vue.PropType<HTMLElement>;
                }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
                    target?: unknown;
                } & {} & {
                    target?: HTMLElement | undefined;
                }>, {}>;
            };
            modelValue: boolean;
            disableKeys: boolean;
        }> & Omit<Readonly<{
            transition?: unknown;
            disableKeys?: unknown;
            modelValue?: unknown;
            id?: unknown;
            $children?: unknown;
            'v-slots'?: unknown;
        } & {
            transition: string | false | (vue.TransitionProps & {
                component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
            }) | {
                readonly component: vue.DefineComponent<{
                    target: vue.PropType<HTMLElement>;
                }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
                    target?: unknown;
                } & {} & {
                    target?: HTMLElement | undefined;
                }>, {}>;
            };
            modelValue: boolean;
            disableKeys: boolean;
        } & {
            id?: string | undefined;
            $children?: vue.VNodeChild | ((args_0: {
                isActive: vue.Ref<boolean>;
            }) => vue.VNodeChild) | {
                default?: ((args_0: {
                    isActive: vue.Ref<boolean>;
                }) => vue.VNodeChild) | undefined;
                activator?: ((args_0: {
                    isActive: boolean;
                    props: Record<string, any>;
                }) => vue.VNodeChild) | undefined;
            };
            "v-slots"?: {
                default?: false | ((args_0: {
                    isActive: vue.Ref<boolean>;
                }) => vue.VNodeChild) | undefined;
                activator?: false | ((args_0: {
                    isActive: boolean;
                    props: Record<string, any>;
                }) => vue.VNodeChild) | undefined;
            } | undefined;
        }> & {
            "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
        } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "transition" | "modelValue" | "disableKeys">;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            [name: string]: vue.Slot | undefined;
        }>;
        $root: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
        $parent: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
        $emit: (event: "update:modelValue", value: boolean) => void;
        $el: any;
        $options: vue.ComponentOptionsBase<Readonly<{
            transition?: unknown;
            disableKeys?: unknown;
            modelValue?: unknown;
            id?: unknown;
            $children?: unknown;
            'v-slots'?: unknown;
        } & {
            transition: string | false | (vue.TransitionProps & {
                component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
            }) | {
                readonly component: vue.DefineComponent<{
                    target: vue.PropType<HTMLElement>;
                }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
                    target?: unknown;
                } & {} & {
                    target?: HTMLElement | undefined;
                }>, {}>;
            };
            modelValue: boolean;
            disableKeys: boolean;
        } & {
            id?: string | undefined;
            $children?: vue.VNodeChild | ((args_0: {
                isActive: vue.Ref<boolean>;
            }) => vue.VNodeChild) | {
                default?: ((args_0: {
                    isActive: vue.Ref<boolean>;
                }) => vue.VNodeChild) | undefined;
                activator?: ((args_0: {
                    isActive: boolean;
                    props: Record<string, any>;
                }) => vue.VNodeChild) | undefined;
            };
            "v-slots"?: {
                default?: false | ((args_0: {
                    isActive: vue.Ref<boolean>;
                }) => vue.VNodeChild) | undefined;
                activator?: false | ((args_0: {
                    isActive: boolean;
                    props: Record<string, any>;
                }) => vue.VNodeChild) | undefined;
            } | undefined;
        }> & {
            "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
        }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
            'update:modelValue': (value: boolean) => boolean;
        }, string, {
            transition: string | false | (vue.TransitionProps & {
                component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
            }) | {
                readonly component: vue.DefineComponent<{
                    target: vue.PropType<HTMLElement>;
                }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
                    target?: unknown;
                } & {} & {
                    target?: HTMLElement | undefined;
                }>, {}>;
            };
            modelValue: boolean;
            disableKeys: boolean;
        }> & {
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
            errorCaptured?: (((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void) | ((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void)[]) | undefined;
        };
        $forceUpdate: () => void;
        $nextTick: typeof vue.nextTick;
        $watch(source: string | Function, cb: Function, options?: vue.WatchOptions<boolean> | undefined): vue.WatchStopHandle;
    } & Readonly<{
        transition?: unknown;
        disableKeys?: unknown;
        modelValue?: unknown;
        id?: unknown;
        $children?: unknown;
        'v-slots'?: unknown;
    } & {
        transition: string | false | (vue.TransitionProps & {
            component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
        }) | {
            readonly component: vue.DefineComponent<{
                target: vue.PropType<HTMLElement>;
            }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
                target?: unknown;
            } & {} & {
                target?: HTMLElement | undefined;
            }>, {}>;
        };
        modelValue: boolean;
        disableKeys: boolean;
    } & {
        id?: string | undefined;
        $children?: vue.VNodeChild | ((args_0: {
            isActive: vue.Ref<boolean>;
        }) => vue.VNodeChild) | {
            default?: ((args_0: {
                isActive: vue.Ref<boolean>;
            }) => vue.VNodeChild) | undefined;
            activator?: ((args_0: {
                isActive: boolean;
                props: Record<string, any>;
            }) => vue.VNodeChild) | undefined;
        };
        "v-slots"?: {
            default?: false | ((args_0: {
                isActive: vue.Ref<boolean>;
            }) => vue.VNodeChild) | undefined;
            activator?: false | ((args_0: {
                isActive: boolean;
                props: Record<string, any>;
            }) => vue.VNodeChild) | undefined;
        } | undefined;
    }> & {
        "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
    } & vue.ShallowUnwrapRef<() => JSX.Element> & {} & {} & vue.ComponentCustomProperties;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & vue.ComponentOptionsBase<Readonly<{
    transition?: unknown;
    disableKeys?: unknown;
    modelValue?: unknown;
    id?: unknown;
    $children?: unknown;
    'v-slots'?: unknown;
} & {
    transition: string | false | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    }) | {
        readonly component: vue.DefineComponent<{
            target: vue.PropType<HTMLElement>;
        }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
            target?: unknown;
        } & {} & {
            target?: HTMLElement | undefined;
        }>, {}>;
    };
    modelValue: boolean;
    disableKeys: boolean;
} & {
    id?: string | undefined;
    $children?: vue.VNodeChild | ((args_0: {
        isActive: vue.Ref<boolean>;
    }) => vue.VNodeChild) | {
        default?: ((args_0: {
            isActive: vue.Ref<boolean>;
        }) => vue.VNodeChild) | undefined;
        activator?: ((args_0: {
            isActive: boolean;
            props: Record<string, any>;
        }) => vue.VNodeChild) | undefined;
    };
    "v-slots"?: {
        default?: false | ((args_0: {
            isActive: vue.Ref<boolean>;
        }) => vue.VNodeChild) | undefined;
        activator?: false | ((args_0: {
            isActive: boolean;
            props: Record<string, any>;
        }) => vue.VNodeChild) | undefined;
    } | undefined;
}> & {
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (value: boolean) => boolean;
}, string, {
    transition: string | false | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    }) | {
        readonly component: vue.DefineComponent<{
            target: vue.PropType<HTMLElement>;
        }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
            target?: unknown;
        } & {} & {
            target?: HTMLElement | undefined;
        }>, {}>;
    };
    modelValue: boolean;
    disableKeys: boolean;
}> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & (new () => {
    $slots: OverlaySlots;
});
declare type VMenu = InstanceType<typeof VMenu>;

declare const VMessages: vue.DefineComponent<{
    transition: Omit<{
        type: PropType<string | false | (vue.TransitionProps & {
            component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
        })>;
        default: string;
        validator: (val: unknown) => boolean;
    }, "default" | "type"> & {
        type: PropType<string | false | (vue.TransitionProps & {
            component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
        }) | {
            component: vue.DefineComponent<{
                group: BooleanConstructor;
                hideOnLeave: BooleanConstructor;
                leaveAbsolute: BooleanConstructor;
                mode: {
                    type: StringConstructor;
                    default: string | undefined;
                };
                origin: {
                    type: StringConstructor;
                    default: string;
                };
            }, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
                group?: unknown;
                hideOnLeave?: unknown;
                leaveAbsolute?: unknown;
                mode?: unknown;
                origin?: unknown;
            } & {
                mode: string;
                group: boolean;
                hideOnLeave: boolean;
                leaveAbsolute: boolean;
                origin: string;
            } & {}>, {
                mode: string;
                group: boolean;
                hideOnLeave: boolean;
                leaveAbsolute: boolean;
                origin: string;
            }>;
            leaveAbsolute: boolean;
            group: boolean;
        }>;
        default: string | false | (vue.TransitionProps & {
            component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
        }) | {
            component: vue.DefineComponent<{
                group: BooleanConstructor;
                hideOnLeave: BooleanConstructor;
                leaveAbsolute: BooleanConstructor;
                mode: {
                    type: StringConstructor;
                    default: string | undefined;
                };
                origin: {
                    type: StringConstructor;
                    default: string;
                };
            }, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
                group?: unknown;
                hideOnLeave?: unknown;
                leaveAbsolute?: unknown;
                mode?: unknown;
                origin?: unknown;
            } & {
                mode: string;
                group: boolean;
                hideOnLeave: boolean;
                leaveAbsolute: boolean;
                origin: string;
            } & {}>, {
                mode: string;
                group: boolean;
                hideOnLeave: boolean;
                leaveAbsolute: boolean;
                origin: string;
            }>;
            leaveAbsolute: boolean;
            group: boolean;
        };
    };
    active: BooleanConstructor;
    color: StringConstructor;
    messages: {
        type: PropType<string | string[]>;
        default: () => never[];
    };
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    transition?: unknown;
    active?: unknown;
    color?: unknown;
    messages?: unknown;
} & {
    messages: string | string[];
    transition: string | false | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    }) | {
        component: vue.DefineComponent<{
            group: BooleanConstructor;
            hideOnLeave: BooleanConstructor;
            leaveAbsolute: BooleanConstructor;
            mode: {
                type: StringConstructor;
                default: string | undefined;
            };
            origin: {
                type: StringConstructor;
                default: string;
            };
        }, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
            group?: unknown;
            hideOnLeave?: unknown;
            leaveAbsolute?: unknown;
            mode?: unknown;
            origin?: unknown;
        } & {
            mode: string;
            group: boolean;
            hideOnLeave: boolean;
            leaveAbsolute: boolean;
            origin: string;
        } & {}>, {
            mode: string;
            group: boolean;
            hideOnLeave: boolean;
            leaveAbsolute: boolean;
            origin: string;
        }>;
        leaveAbsolute: boolean;
        group: boolean;
    };
    active: boolean;
} & {
    color?: string | undefined;
}>, {
    messages: string | string[];
    transition: string | false | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    }) | {
        component: vue.DefineComponent<{
            group: BooleanConstructor;
            hideOnLeave: BooleanConstructor;
            leaveAbsolute: BooleanConstructor;
            mode: {
                type: StringConstructor;
                default: string | undefined;
            };
            origin: {
                type: StringConstructor;
                default: string;
            };
        }, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
            group?: unknown;
            hideOnLeave?: unknown;
            leaveAbsolute?: unknown;
            mode?: unknown;
            origin?: unknown;
        } & {
            mode: string;
            group: boolean;
            hideOnLeave: boolean;
            leaveAbsolute: boolean;
            origin: string;
        } & {}>, {
            mode: string;
            group: boolean;
            hideOnLeave: boolean;
            leaveAbsolute: boolean;
            origin: string;
        }>;
        leaveAbsolute: boolean;
        group: boolean;
    };
    active: boolean;
}>;

declare const VNavigationDrawer: vue.DefineComponent<{
    theme: StringConstructor;
    tag: Omit<{
        type: StringConstructor;
        default: string;
    }, "default" | "type"> & {
        type: PropType<string>;
        default: string;
    };
    rounded: {
        type: (StringConstructor | NumberConstructor | BooleanConstructor)[];
        default: undefined;
    };
    name: {
        type: StringConstructor;
    };
    priority: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    absolute: BooleanConstructor;
    elevation: {
        type: (StringConstructor | NumberConstructor)[];
        validator(v: any): boolean;
    };
    border: (StringConstructor | NumberConstructor | BooleanConstructor)[];
    color: StringConstructor;
    disableResizeWatcher: BooleanConstructor;
    disableRouteWatcher: BooleanConstructor;
    expandOnHover: BooleanConstructor;
    floating: BooleanConstructor;
    modelValue: {
        type: BooleanConstructor;
        default: null;
    };
    permanent: BooleanConstructor;
    rail: BooleanConstructor;
    railWidth: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    image: StringConstructor;
    temporary: BooleanConstructor;
    touchless: BooleanConstructor;
    width: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    position: {
        type: PropType<"left" | "right" | "bottom">;
        default: string;
        validator: (value: any) => boolean;
    };
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (val: boolean) => true;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    theme?: unknown;
    tag?: unknown;
    rounded?: unknown;
    name?: unknown;
    priority?: unknown;
    absolute?: unknown;
    elevation?: unknown;
    border?: unknown;
    color?: unknown;
    disableResizeWatcher?: unknown;
    disableRouteWatcher?: unknown;
    expandOnHover?: unknown;
    floating?: unknown;
    modelValue?: unknown;
    permanent?: unknown;
    rail?: unknown;
    railWidth?: unknown;
    image?: unknown;
    temporary?: unknown;
    touchless?: unknown;
    width?: unknown;
    position?: unknown;
} & {
    width: string | number;
    tag: string;
    priority: string | number;
    absolute: boolean;
    position: "left" | "right" | "bottom";
    floating: boolean;
    modelValue: boolean;
    touchless: boolean;
    disableResizeWatcher: boolean;
    disableRouteWatcher: boolean;
    expandOnHover: boolean;
    permanent: boolean;
    rail: boolean;
    railWidth: string | number;
    temporary: boolean;
} & {
    name?: string | undefined;
    theme?: string | undefined;
    image?: string | undefined;
    border?: string | number | boolean | undefined;
    elevation?: string | number | undefined;
    rounded?: string | number | boolean | undefined;
    color?: string | undefined;
}> & {
    "onUpdate:modelValue"?: ((val: boolean) => any) | undefined;
}, {
    width: string | number;
    tag: string;
    priority: string | number;
    absolute: boolean;
    position: "left" | "right" | "bottom";
    rounded: string | number | boolean;
    floating: boolean;
    modelValue: boolean;
    touchless: boolean;
    disableResizeWatcher: boolean;
    disableRouteWatcher: boolean;
    expandOnHover: boolean;
    permanent: boolean;
    rail: boolean;
    railWidth: string | number;
    temporary: boolean;
}>;
declare type VNavigationDrawer = InstanceType<typeof VNavigationDrawer>;

declare const VNoSsr: vue.DefineComponent<{}, () => false | vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>[] | undefined, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, vue.EmitsOptions, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{} & {} & {}>, {}>;

declare const VPagination: vue.DefineComponent<{
    color: StringConstructor;
    textColor: StringConstructor;
    variant: Omit<{
        type: vue.PropType<"text" | "outlined" | "plain" | "contained" | "contained-flat" | "contained-text">;
        default: string;
        validator: (v: any) => boolean;
    }, "default" | "type"> & {
        type: vue.PropType<"text" | "outlined" | "plain" | "contained" | "contained-flat" | "contained-text">;
        default: "text" | "outlined" | "plain" | "contained" | "contained-flat" | "contained-text";
    };
    theme: StringConstructor;
    tag: Omit<{
        type: StringConstructor;
        default: string;
    }, "default" | "type"> & {
        type: vue.PropType<string>;
        default: string;
    };
    size: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    elevation: {
        type: (StringConstructor | NumberConstructor)[];
        validator(v: any): boolean;
    };
    density: {
        type: vue.PropType<"default" | "comfortable" | "compact" | null>;
        default: string;
        validator: (v: any) => boolean;
    };
    border: (StringConstructor | NumberConstructor | BooleanConstructor)[];
    rounded: {
        type: (StringConstructor | NumberConstructor | BooleanConstructor)[];
        default: undefined;
    };
    start: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    modelValue: {
        type: NumberConstructor;
        default: (props: any) => any;
    };
    disabled: BooleanConstructor;
    length: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
        validator: (val: number) => boolean;
    };
    totalVisible: (StringConstructor | NumberConstructor)[];
    firstIcon: {
        type: StringConstructor;
        default: string;
    };
    prevIcon: {
        type: StringConstructor;
        default: string;
    };
    nextIcon: {
        type: StringConstructor;
        default: string;
    };
    lastIcon: {
        type: StringConstructor;
        default: string;
    };
    ariaLabel: {
        type: StringConstructor;
        default: string;
    };
    pageAriaLabel: {
        type: StringConstructor;
        default: string;
    };
    currentPageAriaLabel: {
        type: StringConstructor;
        default: string;
    };
    firstAriaLabel: {
        type: StringConstructor;
        default: string;
    };
    previousAriaLabel: {
        type: StringConstructor;
        default: string;
    };
    nextAriaLabel: {
        type: StringConstructor;
        default: string;
    };
    lastAriaLabel: {
        type: StringConstructor;
        default: string;
    };
    ellipsis: {
        type: StringConstructor;
        default: string;
    };
    showFirstLastPage: BooleanConstructor;
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (value: number) => true;
    first: (value: number) => true;
    prev: (value: number) => true;
    next: (value: number) => true;
    last: (value: number) => true;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    color?: unknown;
    textColor?: unknown;
    variant?: unknown;
    theme?: unknown;
    tag?: unknown;
    size?: unknown;
    elevation?: unknown;
    density?: unknown;
    border?: unknown;
    rounded?: unknown;
    start?: unknown;
    modelValue?: unknown;
    disabled?: unknown;
    length?: unknown;
    totalVisible?: unknown;
    firstIcon?: unknown;
    prevIcon?: unknown;
    nextIcon?: unknown;
    lastIcon?: unknown;
    ariaLabel?: unknown;
    pageAriaLabel?: unknown;
    currentPageAriaLabel?: unknown;
    firstAriaLabel?: unknown;
    previousAriaLabel?: unknown;
    nextAriaLabel?: unknown;
    lastAriaLabel?: unknown;
    ellipsis?: unknown;
    showFirstLastPage?: unknown;
} & {
    length: string | number;
    tag: string;
    ariaLabel: string;
    density: "default" | "comfortable" | "compact" | null;
    modelValue: number;
    start: string | number;
    ellipsis: string;
    size: string | number;
    disabled: boolean;
    variant: "text" | "outlined" | "plain" | "contained" | "contained-flat" | "contained-text";
    firstIcon: string;
    prevIcon: string;
    nextIcon: string;
    lastIcon: string;
    pageAriaLabel: string;
    currentPageAriaLabel: string;
    firstAriaLabel: string;
    previousAriaLabel: string;
    nextAriaLabel: string;
    lastAriaLabel: string;
    showFirstLastPage: boolean;
} & {
    theme?: string | undefined;
    border?: string | number | boolean | undefined;
    elevation?: string | number | undefined;
    rounded?: string | number | boolean | undefined;
    color?: string | undefined;
    textColor?: string | undefined;
    totalVisible?: string | number | undefined;
}> & {
    "onUpdate:modelValue"?: ((value: number) => any) | undefined;
    onPrev?: ((value: number) => any) | undefined;
    onNext?: ((value: number) => any) | undefined;
    onFirst?: ((value: number) => any) | undefined;
    onLast?: ((value: number) => any) | undefined;
}, {
    length: string | number;
    tag: string;
    ariaLabel: string;
    density: "default" | "comfortable" | "compact" | null;
    rounded: string | number | boolean;
    modelValue: number;
    start: string | number;
    ellipsis: string;
    size: string | number;
    disabled: boolean;
    variant: "text" | "outlined" | "plain" | "contained" | "contained-flat" | "contained-text";
    firstIcon: string;
    prevIcon: string;
    nextIcon: string;
    lastIcon: string;
    pageAriaLabel: string;
    currentPageAriaLabel: string;
    firstAriaLabel: string;
    previousAriaLabel: string;
    nextAriaLabel: string;
    lastAriaLabel: string;
    showFirstLastPage: boolean;
}>;
declare type VPagination = InstanceType<typeof VPagination>;

declare const VParallax: vue.DefineComponent<{
    scale: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    scale?: unknown;
} & {
    scale: string | number;
} & {}>, {
    scale: string | number;
}>;
declare type VParallax = InstanceType<typeof VParallax>;

declare const VProgressCircular: vue.DefineComponent<{
    theme: StringConstructor;
    tag: Omit<{
        type: StringConstructor;
        default: string;
    }, "default" | "type"> & {
        type: PropType<string>;
        default: string;
    };
    size: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    bgColor: StringConstructor;
    color: StringConstructor;
    indeterminate: PropType<boolean | "disable-shrink">;
    modelValue: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    rotate: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    width: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    theme?: unknown;
    tag?: unknown;
    size?: unknown;
    bgColor?: unknown;
    color?: unknown;
    indeterminate?: unknown;
    modelValue?: unknown;
    rotate?: unknown;
    width?: unknown;
} & {
    width: string | number;
    tag: string;
    modelValue: string | number;
    size: string | number;
    rotate: string | number;
} & {
    theme?: string | undefined;
    color?: string | undefined;
    bgColor?: string | undefined;
    indeterminate?: boolean | "disable-shrink" | undefined;
}>, {
    width: string | number;
    tag: string;
    modelValue: string | number;
    size: string | number;
    rotate: string | number;
}>;

declare const VProgressLinear: vue.DefineComponent<{
    theme: StringConstructor;
    tag: {
        type: StringConstructor;
        default: string;
    };
    rounded: {
        type: (StringConstructor | NumberConstructor | BooleanConstructor)[];
        default: undefined;
    };
    active: {
        type: BooleanConstructor;
        default: boolean;
    };
    bgColor: StringConstructor;
    bgOpacity: (StringConstructor | NumberConstructor)[];
    bufferValue: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    clickable: BooleanConstructor;
    color: StringConstructor;
    height: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    indeterminate: BooleanConstructor;
    max: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    modelValue: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    reverse: BooleanConstructor;
    stream: BooleanConstructor;
    striped: BooleanConstructor;
    roundedBar: BooleanConstructor;
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (value: number) => true;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    theme?: unknown;
    tag?: unknown;
    rounded?: unknown;
    active?: unknown;
    bgColor?: unknown;
    bgOpacity?: unknown;
    bufferValue?: unknown;
    clickable?: unknown;
    color?: unknown;
    height?: unknown;
    indeterminate?: unknown;
    max?: unknown;
    modelValue?: unknown;
    reverse?: unknown;
    stream?: unknown;
    striped?: unknown;
    roundedBar?: unknown;
} & {
    height: string | number;
    reverse: boolean;
    tag: string;
    active: boolean;
    modelValue: string | number;
    max: string | number;
    indeterminate: boolean;
    bufferValue: string | number;
    clickable: boolean;
    stream: boolean;
    striped: boolean;
    roundedBar: boolean;
} & {
    theme?: string | undefined;
    rounded?: string | number | boolean | undefined;
    color?: string | undefined;
    bgColor?: string | undefined;
    bgOpacity?: string | number | undefined;
}> & {
    "onUpdate:modelValue"?: ((value: number) => any) | undefined;
}, {
    height: string | number;
    reverse: boolean;
    tag: string;
    active: boolean;
    rounded: string | number | boolean;
    modelValue: string | number;
    max: string | number;
    indeterminate: boolean;
    bufferValue: string | number;
    clickable: boolean;
    stream: boolean;
    striped: boolean;
    roundedBar: boolean;
}>;

declare const VRadio: vue.DefineComponent<{
    falseIcon: {
        type: StringConstructor;
        default: string;
    };
    trueIcon: {
        type: StringConstructor;
        default: string;
    };
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    falseIcon?: unknown;
    trueIcon?: unknown;
} & {
    falseIcon: string;
    trueIcon: string;
} & {}>, {
    falseIcon: string;
    trueIcon: string;
}>;
declare type VRadio = InstanceType<typeof VRadio>;

declare const VRadioGroup: vue.DefineComponent<{
    trueIcon: {
        type: StringConstructor;
        default: string;
    };
    falseIcon: {
        type: StringConstructor;
        default: string;
    };
    type: {
        type: StringConstructor;
        default: string;
    };
    density: {
        type: vue.PropType<"default" | "comfortable" | "compact" | null>;
        default: string;
        validator: (v: any) => boolean;
    };
    theme: StringConstructor;
    color: StringConstructor;
    disabled: BooleanConstructor;
    error: BooleanConstructor;
    id: StringConstructor;
    inline: BooleanConstructor;
    label: StringConstructor;
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
    trueValue: null;
    falseValue: null;
    modelValue: null;
    value: null;
    valueComparator: {
        type: vue.PropType<typeof deepEqual>;
        default: typeof deepEqual;
    };
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
    appendIcon: StringConstructor;
    prependIcon: StringConstructor;
    hideDetails: vue.PropType<boolean | "auto">;
    messages: {
        type: vue.PropType<string | string[]>;
        default: () => never[];
    };
    direction: {
        type: vue.PropType<"horizontal" | "vertical">;
        default: string;
        validator: (v: any) => boolean;
    };
    height: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    trueIcon?: unknown;
    falseIcon?: unknown;
    type?: unknown;
    density?: unknown;
    theme?: unknown;
    color?: unknown;
    disabled?: unknown;
    error?: unknown;
    id?: unknown;
    inline?: unknown;
    label?: unknown;
    ripple?: unknown;
    multiple?: unknown;
    name?: unknown;
    readonly?: unknown;
    trueValue?: unknown;
    falseValue?: unknown;
    modelValue?: unknown;
    value?: unknown;
    valueComparator?: unknown;
    errorMessages?: unknown;
    maxErrors?: unknown;
    rules?: unknown;
    appendIcon?: unknown;
    prependIcon?: unknown;
    hideDetails?: unknown;
    messages?: unknown;
    direction?: unknown;
    height?: unknown;
} & {
    height: string | number;
    error: boolean;
    messages: string | string[];
    type: string;
    density: "default" | "comfortable" | "compact" | null;
    inline: boolean;
    multiple: boolean | null;
    disabled: boolean;
    ripple: boolean;
    readonly: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    direction: "horizontal" | "vertical";
    falseIcon: string;
    trueIcon: string;
    valueComparator: typeof deepEqual;
} & {
    id?: string | undefined;
    name?: string | undefined;
    value?: any;
    theme?: string | undefined;
    label?: string | undefined;
    color?: string | undefined;
    modelValue?: any;
    prependIcon?: string | undefined;
    appendIcon?: string | undefined;
    hideDetails?: boolean | "auto" | undefined;
    trueValue?: any;
    falseValue?: any;
}>, {
    height: string | number;
    error: boolean;
    messages: string | string[];
    type: string;
    density: "default" | "comfortable" | "compact" | null;
    inline: boolean;
    multiple: boolean | null;
    disabled: boolean;
    ripple: boolean;
    readonly: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    direction: "horizontal" | "vertical";
    falseIcon: string;
    trueIcon: string;
    valueComparator: typeof deepEqual;
}>;

declare const VRangeSlider: vue.DefineComponent<{
    strict: BooleanConstructor;
    modelValue: {
        type: PropType<number[]>;
        default: () => number[];
    };
    elevation: Omit<{
        type: (StringConstructor | NumberConstructor)[];
        validator(v: any): boolean;
    }, "default" | "type"> & {
        type: PropType<string | number>;
        default: string | number;
    };
    rounded: {
        type: (StringConstructor | NumberConstructor | BooleanConstructor)[];
        default: undefined;
    };
    disabled: BooleanConstructor;
    readonly: BooleanConstructor;
    max: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    min: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    step: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    thumbColor: StringConstructor;
    thumbLabel: {
        type: PropType<boolean | "always" | undefined>;
        default: undefined;
        validator: (v: any) => boolean;
    };
    thumbSize: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    showTicks: {
        type: PropType<boolean | "always">;
        default: boolean;
        validator: (v: any) => boolean;
    };
    showTickLabels: {
        type: BooleanConstructor;
        default: boolean;
    };
    ticks: {
        type: PropType<number[] | Record<string, string>>;
    };
    tickSize: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    color: StringConstructor;
    trackColor: StringConstructor;
    trackFillColor: StringConstructor;
    trackSize: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    direction: {
        type: PropType<"horizontal" | "vertical">;
        default: string;
        validator: (v: any) => boolean;
    };
    reverse: BooleanConstructor;
    label: StringConstructor;
    error: BooleanConstructor;
    errorMessages: {
        type: PropType<string | string[]>;
        default: () => never[];
    };
    maxErrors: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    name: StringConstructor;
    rules: {
        type: PropType<ValidationRule[]>;
        default: () => never[];
    };
    density: {
        type: PropType<"default" | "comfortable" | "compact" | null>;
        default: string;
        validator: (v: any) => boolean;
    };
    id: StringConstructor;
    appendIcon: StringConstructor;
    prependIcon: StringConstructor;
    hideDetails: PropType<boolean | "auto">;
    messages: {
        type: PropType<string | string[]>;
        default: () => never[];
    };
    focused: BooleanConstructor;
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:focused': (value: boolean) => true;
    'update:modelValue': (value: [number, number]) => true;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    strict?: unknown;
    modelValue?: unknown;
    elevation?: unknown;
    rounded?: unknown;
    disabled?: unknown;
    readonly?: unknown;
    max?: unknown;
    min?: unknown;
    step?: unknown;
    thumbColor?: unknown;
    thumbLabel?: unknown;
    thumbSize?: unknown;
    showTicks?: unknown;
    showTickLabels?: unknown;
    ticks?: unknown;
    tickSize?: unknown;
    color?: unknown;
    trackColor?: unknown;
    trackFillColor?: unknown;
    trackSize?: unknown;
    direction?: unknown;
    reverse?: unknown;
    label?: unknown;
    error?: unknown;
    errorMessages?: unknown;
    maxErrors?: unknown;
    name?: unknown;
    rules?: unknown;
    density?: unknown;
    id?: unknown;
    appendIcon?: unknown;
    prependIcon?: unknown;
    hideDetails?: unknown;
    messages?: unknown;
    focused?: unknown;
} & {
    error: boolean;
    reverse: boolean;
    messages: string | string[];
    density: "default" | "comfortable" | "compact" | null;
    elevation: string | number;
    modelValue: number[];
    strict: boolean;
    disabled: boolean;
    max: string | number;
    readonly: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    direction: "horizontal" | "vertical";
    focused: boolean;
    min: string | number;
    step: string | number;
    tickSize: string | number;
    showTicks: boolean | "always";
    trackSize: string | number;
    thumbSize: string | number;
    showTickLabels: boolean;
} & {
    id?: string | undefined;
    name?: string | undefined;
    label?: string | undefined;
    rounded?: string | number | boolean | undefined;
    color?: string | undefined;
    prependIcon?: string | undefined;
    appendIcon?: string | undefined;
    hideDetails?: boolean | "auto" | undefined;
    trackColor?: string | undefined;
    trackFillColor?: string | undefined;
    thumbColor?: string | undefined;
    thumbLabel?: boolean | "always" | undefined;
    ticks?: number[] | Record<string, string> | undefined;
}> & {
    "onUpdate:modelValue"?: ((value: [number, number]) => any) | undefined;
    "onUpdate:focused"?: ((value: boolean) => any) | undefined;
}, {
    error: boolean;
    reverse: boolean;
    messages: string | string[];
    density: "default" | "comfortable" | "compact" | null;
    elevation: string | number;
    rounded: string | number | boolean;
    modelValue: number[];
    strict: boolean;
    disabled: boolean;
    max: string | number;
    readonly: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    direction: "horizontal" | "vertical";
    focused: boolean;
    min: string | number;
    step: string | number;
    tickSize: string | number;
    showTicks: boolean | "always";
    trackSize: string | number;
    thumbLabel: boolean | "always" | undefined;
    thumbSize: string | number;
    showTickLabels: boolean;
}>;
declare type VRangeSlider = InstanceType<typeof VRangeSlider>;

declare const VRating: vue.DefineComponent<{
    theme: StringConstructor;
    tag: {
        type: StringConstructor;
        default: string;
    };
    size: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    density: {
        type: vue.PropType<"default" | "comfortable" | "compact" | null>;
        default: string;
        validator: (v: any) => boolean;
    };
    name: StringConstructor;
    itemAriaLabel: {
        type: StringConstructor;
        default: string;
    };
    activeColor: StringConstructor;
    color: StringConstructor;
    clearable: BooleanConstructor;
    disabled: BooleanConstructor;
    emptyIcon: {
        type: StringConstructor;
        default: string;
    };
    fullIcon: {
        type: StringConstructor;
        default: string;
    };
    halfIncrements: BooleanConstructor;
    hover: BooleanConstructor;
    length: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    readonly: BooleanConstructor;
    modelValue: {
        type: NumberConstructor;
        default: number;
    };
    itemLabels: Prop<string[], string[]>;
    itemLabelPosition: {
        type: StringConstructor;
        default: string;
        validator: (v: any) => boolean;
    };
    ripple: BooleanConstructor;
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (value: number) => true;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    theme?: unknown;
    tag?: unknown;
    size?: unknown;
    density?: unknown;
    name?: unknown;
    itemAriaLabel?: unknown;
    activeColor?: unknown;
    color?: unknown;
    clearable?: unknown;
    disabled?: unknown;
    emptyIcon?: unknown;
    fullIcon?: unknown;
    halfIncrements?: unknown;
    hover?: unknown;
    length?: unknown;
    readonly?: unknown;
    modelValue?: unknown;
    itemLabels?: unknown;
    itemLabelPosition?: unknown;
    ripple?: unknown;
} & {
    length: string | number;
    tag: string;
    density: "default" | "comfortable" | "compact" | null;
    modelValue: number;
    size: string | number;
    disabled: boolean;
    ripple: boolean;
    hover: boolean;
    readonly: boolean;
    clearable: boolean;
    itemAriaLabel: string;
    emptyIcon: string;
    fullIcon: string;
    halfIncrements: boolean;
    itemLabelPosition: string;
} & {
    name?: string | undefined;
    theme?: string | undefined;
    color?: string | undefined;
    activeColor?: string | undefined;
    itemLabels?: string[] | undefined;
}> & {
    "onUpdate:modelValue"?: ((value: number) => any) | undefined;
}, {
    length: string | number;
    tag: string;
    density: "default" | "comfortable" | "compact" | null;
    modelValue: number;
    size: string | number;
    disabled: boolean;
    ripple: boolean;
    hover: boolean;
    readonly: boolean;
    clearable: boolean;
    itemAriaLabel: string;
    emptyIcon: string;
    fullIcon: string;
    halfIncrements: boolean;
    itemLabelPosition: string;
}>;
declare type VRating = InstanceType<typeof VRating>;

declare const VResponsive: vue.DefineComponent<{
    height: (StringConstructor | NumberConstructor)[];
    maxHeight: (StringConstructor | NumberConstructor)[];
    maxWidth: (StringConstructor | NumberConstructor)[];
    minHeight: (StringConstructor | NumberConstructor)[];
    minWidth: (StringConstructor | NumberConstructor)[];
    width: (StringConstructor | NumberConstructor)[];
    aspectRatio: (StringConstructor | NumberConstructor)[];
    contentClass: StringConstructor;
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    height?: unknown;
    maxHeight?: unknown;
    maxWidth?: unknown;
    minHeight?: unknown;
    minWidth?: unknown;
    width?: unknown;
    aspectRatio?: unknown;
    contentClass?: unknown;
} & {} & {
    width?: string | number | undefined;
    height?: string | number | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
    aspectRatio?: string | number | undefined;
    contentClass?: string | undefined;
}>, {}>;

declare type FilterFunction = (value: string, query: string, item?: any) => FilterMatch;
declare type FilterKeyFunctions = Record<string, FilterFunction>;
declare type FilterKeys = string | string[];
declare type FilterMatch = number | [number, number] | [number, number][] | boolean;
declare type FilterMode = 'some' | 'every' | 'union' | 'intersection';

declare type SelectItem = string | (string | number)[] | ((item: Record<string, any>, fallback?: any) => any) | (LinkProps & {
    text: string;
});
declare const VSelect: {
    new (...args: any[]): {
        $: vue.ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            noDataText: string;
            items: SelectItem[];
            modelValue: string | number | unknown[];
            multiple: boolean;
            chips: boolean;
            filterMode: FilterMode;
            hideNoData: boolean;
            hideSelected: boolean;
            openOnClear: boolean;
        }> & Omit<Readonly<{
            customFilter?: unknown;
            customKeyFilter?: unknown;
            filterKeys?: unknown;
            filterMode?: unknown;
            chips?: unknown;
            hideNoData?: unknown;
            hideSelected?: unknown;
            items?: unknown;
            modelValue?: unknown;
            multiple?: unknown;
            noDataText?: unknown;
            openOnClear?: unknown;
            $children?: unknown;
            'v-slots'?: unknown;
        } & {
            noDataText: string;
            items: SelectItem[];
            modelValue: string | number | unknown[];
            multiple: boolean;
            chips: boolean;
            filterMode: FilterMode;
            hideNoData: boolean;
            hideSelected: boolean;
            openOnClear: boolean;
        } & {
            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                default?: (() => vue.VNodeChild) | undefined;
                title?: (() => vue.VNodeChild) | undefined;
            };
            "v-slots"?: {
                default?: false | (() => vue.VNodeChild) | undefined;
                title?: false | (() => vue.VNodeChild) | undefined;
            } | undefined;
            customFilter?: FilterFunction | undefined;
            customKeyFilter?: FilterKeyFunctions | undefined;
            filterKeys?: FilterKeys | undefined;
        }> & {
            "onUpdate:modelValue"?: ((val: any) => any) | undefined;
            "onClick:clear"?: ((e: MouseEvent) => any) | undefined;
        } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "noDataText" | "items" | "modelValue" | "multiple" | "chips" | "filterMode" | "hideNoData" | "hideSelected" | "openOnClear">;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            [name: string]: vue.Slot | undefined;
        }>;
        $root: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
        $parent: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
        $emit: ((event: "update:modelValue", val: any) => void) & ((event: "click:clear", e: MouseEvent) => void);
        $el: any;
        $options: vue.ComponentOptionsBase<Readonly<{
            customFilter?: unknown;
            customKeyFilter?: unknown;
            filterKeys?: unknown;
            filterMode?: unknown;
            chips?: unknown;
            hideNoData?: unknown;
            hideSelected?: unknown;
            items?: unknown;
            modelValue?: unknown;
            multiple?: unknown;
            noDataText?: unknown;
            openOnClear?: unknown;
            $children?: unknown;
            'v-slots'?: unknown;
        } & {
            noDataText: string;
            items: SelectItem[];
            modelValue: string | number | unknown[];
            multiple: boolean;
            chips: boolean;
            filterMode: FilterMode;
            hideNoData: boolean;
            hideSelected: boolean;
            openOnClear: boolean;
        } & {
            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                default?: (() => vue.VNodeChild) | undefined;
                title?: (() => vue.VNodeChild) | undefined;
            };
            "v-slots"?: {
                default?: false | (() => vue.VNodeChild) | undefined;
                title?: false | (() => vue.VNodeChild) | undefined;
            } | undefined;
            customFilter?: FilterFunction | undefined;
            customKeyFilter?: FilterKeyFunctions | undefined;
            filterKeys?: FilterKeys | undefined;
        }> & {
            "onUpdate:modelValue"?: ((val: any) => any) | undefined;
            "onClick:clear"?: ((e: MouseEvent) => any) | undefined;
        }, any, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
            'click:clear': (e: MouseEvent) => boolean;
            'update:modelValue': (val: any) => boolean;
        }, string, {
            noDataText: string;
            items: SelectItem[];
            modelValue: string | number | unknown[];
            multiple: boolean;
            chips: boolean;
            filterMode: FilterMode;
            hideNoData: boolean;
            hideSelected: boolean;
            openOnClear: boolean;
        }> & {
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
            errorCaptured?: (((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void) | ((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void)[]) | undefined;
        };
        $forceUpdate: () => void;
        $nextTick: typeof vue.nextTick;
        $watch(source: string | Function, cb: Function, options?: vue.WatchOptions<boolean> | undefined): vue.WatchStopHandle;
    } & Readonly<{
        customFilter?: unknown;
        customKeyFilter?: unknown;
        filterKeys?: unknown;
        filterMode?: unknown;
        chips?: unknown;
        hideNoData?: unknown;
        hideSelected?: unknown;
        items?: unknown;
        modelValue?: unknown;
        multiple?: unknown;
        noDataText?: unknown;
        openOnClear?: unknown;
        $children?: unknown;
        'v-slots'?: unknown;
    } & {
        noDataText: string;
        items: SelectItem[];
        modelValue: string | number | unknown[];
        multiple: boolean;
        chips: boolean;
        filterMode: FilterMode;
        hideNoData: boolean;
        hideSelected: boolean;
        openOnClear: boolean;
    } & {
        $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
            default?: (() => vue.VNodeChild) | undefined;
            title?: (() => vue.VNodeChild) | undefined;
        };
        "v-slots"?: {
            default?: false | (() => vue.VNodeChild) | undefined;
            title?: false | (() => vue.VNodeChild) | undefined;
        } | undefined;
        customFilter?: FilterFunction | undefined;
        customKeyFilter?: FilterKeyFunctions | undefined;
        filterKeys?: FilterKeys | undefined;
    }> & {
        "onUpdate:modelValue"?: ((val: any) => any) | undefined;
        "onClick:clear"?: ((e: MouseEvent) => any) | undefined;
    } & vue.ShallowUnwrapRef<any> & {} & {} & vue.ComponentCustomProperties;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & vue.ComponentOptionsBase<Readonly<{
    customFilter?: unknown;
    customKeyFilter?: unknown;
    filterKeys?: unknown;
    filterMode?: unknown;
    chips?: unknown;
    hideNoData?: unknown;
    hideSelected?: unknown;
    items?: unknown;
    modelValue?: unknown;
    multiple?: unknown;
    noDataText?: unknown;
    openOnClear?: unknown;
    $children?: unknown;
    'v-slots'?: unknown;
} & {
    noDataText: string;
    items: SelectItem[];
    modelValue: string | number | unknown[];
    multiple: boolean;
    chips: boolean;
    filterMode: FilterMode;
    hideNoData: boolean;
    hideSelected: boolean;
    openOnClear: boolean;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
        title?: (() => vue.VNodeChild) | undefined;
    };
    "v-slots"?: {
        default?: false | (() => vue.VNodeChild) | undefined;
        title?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
    customFilter?: FilterFunction | undefined;
    customKeyFilter?: FilterKeyFunctions | undefined;
    filterKeys?: FilterKeys | undefined;
}> & {
    "onUpdate:modelValue"?: ((val: any) => any) | undefined;
    "onClick:clear"?: ((e: MouseEvent) => any) | undefined;
}, any, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'click:clear': (e: MouseEvent) => boolean;
    'update:modelValue': (val: any) => boolean;
}, string, {
    noDataText: string;
    items: SelectItem[];
    modelValue: string | number | unknown[];
    multiple: boolean;
    chips: boolean;
    filterMode: FilterMode;
    hideNoData: boolean;
    hideSelected: boolean;
    openOnClear: boolean;
}> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & (new <T>() => {
    $slots: MakeSlots<{
        default: [];
        title: [];
    }>;
});
declare type VSelect = InstanceType<typeof VSelect>;

declare const VSelectionControlGroup: vue.DefineComponent<{
    disabled: BooleanConstructor;
    id: StringConstructor;
    inline: BooleanConstructor;
    name: StringConstructor;
    falseIcon: StringConstructor;
    trueIcon: StringConstructor;
    multiple: {
        type: PropType<boolean | null>;
        default: null;
    };
    readonly: BooleanConstructor;
    type: StringConstructor;
    modelValue: null;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (val: any) => true;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    disabled?: unknown;
    id?: unknown;
    inline?: unknown;
    name?: unknown;
    falseIcon?: unknown;
    trueIcon?: unknown;
    multiple?: unknown;
    readonly?: unknown;
    type?: unknown;
    modelValue?: unknown;
} & {
    inline: boolean;
    multiple: boolean | null;
    disabled: boolean;
    readonly: boolean;
} & {
    id?: string | undefined;
    name?: string | undefined;
    type?: string | undefined;
    modelValue?: any;
    falseIcon?: string | undefined;
    trueIcon?: string | undefined;
}> & {
    "onUpdate:modelValue"?: ((val: any) => any) | undefined;
}, {
    inline: boolean;
    multiple: boolean | null;
    disabled: boolean;
    readonly: boolean;
}>;
declare type VSelectionControlGroup = InstanceType<typeof VSelectionControlGroup>;

declare type SelectionControlSlot = {
    model: WritableComputedRef<any>;
    isReadonly: ComputedRef<boolean>;
    isDisabled: ComputedRef<boolean>;
    textColorClasses: Ref<string[]>;
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
            error: boolean;
            density: "default" | "comfortable" | "compact" | null;
            inline: boolean;
            multiple: boolean | null;
            disabled: boolean;
            ripple: boolean;
            readonly: boolean;
            valueComparator: typeof deepEqual;
        }> & Omit<Readonly<{
            id?: unknown;
            error?: unknown;
            name?: unknown;
            value?: unknown;
            type?: unknown;
            theme?: unknown;
            label?: unknown;
            density?: unknown;
            color?: unknown;
            inline?: unknown;
            multiple?: unknown;
            disabled?: unknown;
            ripple?: unknown;
            readonly?: unknown;
            falseIcon?: unknown;
            trueIcon?: unknown;
            trueValue?: unknown;
            falseValue?: unknown;
            valueComparator?: unknown;
            $children?: unknown;
            'v-slots'?: unknown;
        } & {
            error: boolean;
            density: "default" | "comfortable" | "compact" | null;
            inline: boolean;
            multiple: boolean | null;
            disabled: boolean;
            ripple: boolean;
            readonly: boolean;
            valueComparator: typeof deepEqual;
        } & {
            id?: string | undefined;
            name?: string | undefined;
            value?: any;
            type?: string | undefined;
            theme?: string | undefined;
            label?: string | undefined;
            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                default?: (() => vue.VNodeChild) | undefined;
                input?: ((args_0: SelectionControlSlot) => vue.VNodeChild) | undefined;
            };
            "v-slots"?: {
                default?: false | (() => vue.VNodeChild) | undefined;
                input?: false | ((args_0: SelectionControlSlot) => vue.VNodeChild) | undefined;
            } | undefined;
            color?: string | undefined;
            falseIcon?: string | undefined;
            trueIcon?: string | undefined;
            trueValue?: any;
            falseValue?: any;
        }> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "error" | "density" | "inline" | "multiple" | "disabled" | "ripple" | "readonly" | "valueComparator">;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            [name: string]: vue.Slot | undefined;
        }>;
        $root: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
        $parent: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
        $emit: (event: string, ...args: any[]) => void;
        $el: any;
        $options: vue.ComponentOptionsBase<Readonly<{
            id?: unknown;
            error?: unknown;
            name?: unknown;
            value?: unknown;
            type?: unknown;
            theme?: unknown;
            label?: unknown;
            density?: unknown;
            color?: unknown;
            inline?: unknown;
            multiple?: unknown;
            disabled?: unknown;
            ripple?: unknown;
            readonly?: unknown;
            falseIcon?: unknown;
            trueIcon?: unknown;
            trueValue?: unknown;
            falseValue?: unknown;
            valueComparator?: unknown;
            $children?: unknown;
            'v-slots'?: unknown;
        } & {
            error: boolean;
            density: "default" | "comfortable" | "compact" | null;
            inline: boolean;
            multiple: boolean | null;
            disabled: boolean;
            ripple: boolean;
            readonly: boolean;
            valueComparator: typeof deepEqual;
        } & {
            id?: string | undefined;
            name?: string | undefined;
            value?: any;
            type?: string | undefined;
            theme?: string | undefined;
            label?: string | undefined;
            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                default?: (() => vue.VNodeChild) | undefined;
                input?: ((args_0: SelectionControlSlot) => vue.VNodeChild) | undefined;
            };
            "v-slots"?: {
                default?: false | (() => vue.VNodeChild) | undefined;
                input?: false | ((args_0: SelectionControlSlot) => vue.VNodeChild) | undefined;
            } | undefined;
            color?: string | undefined;
            falseIcon?: string | undefined;
            trueIcon?: string | undefined;
            trueValue?: any;
            falseValue?: any;
        }>, {
            isFocused: Ref<boolean>;
            input: Ref<HTMLInputElement | undefined>;
        }, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Omit<{
            'update:modelValue': (val: any) => boolean;
        }, "update:modelValue" | "modelValue">, string, {
            error: boolean;
            density: "default" | "comfortable" | "compact" | null;
            inline: boolean;
            multiple: boolean | null;
            disabled: boolean;
            ripple: boolean;
            readonly: boolean;
            valueComparator: typeof deepEqual;
        }> & {
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
            errorCaptured?: (((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void) | ((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void)[]) | undefined;
        };
        $forceUpdate: () => void;
        $nextTick: typeof vue.nextTick;
        $watch(source: string | Function, cb: Function, options?: vue.WatchOptions<boolean> | undefined): vue.WatchStopHandle;
    } & Readonly<{
        id?: unknown;
        error?: unknown;
        name?: unknown;
        value?: unknown;
        type?: unknown;
        theme?: unknown;
        label?: unknown;
        density?: unknown;
        color?: unknown;
        inline?: unknown;
        multiple?: unknown;
        disabled?: unknown;
        ripple?: unknown;
        readonly?: unknown;
        falseIcon?: unknown;
        trueIcon?: unknown;
        trueValue?: unknown;
        falseValue?: unknown;
        valueComparator?: unknown;
        $children?: unknown;
        'v-slots'?: unknown;
    } & {
        error: boolean;
        density: "default" | "comfortable" | "compact" | null;
        inline: boolean;
        multiple: boolean | null;
        disabled: boolean;
        ripple: boolean;
        readonly: boolean;
        valueComparator: typeof deepEqual;
    } & {
        id?: string | undefined;
        name?: string | undefined;
        value?: any;
        type?: string | undefined;
        theme?: string | undefined;
        label?: string | undefined;
        $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
            default?: (() => vue.VNodeChild) | undefined;
            input?: ((args_0: SelectionControlSlot) => vue.VNodeChild) | undefined;
        };
        "v-slots"?: {
            default?: false | (() => vue.VNodeChild) | undefined;
            input?: false | ((args_0: SelectionControlSlot) => vue.VNodeChild) | undefined;
        } | undefined;
        color?: string | undefined;
        falseIcon?: string | undefined;
        trueIcon?: string | undefined;
        trueValue?: any;
        falseValue?: any;
    }> & vue.ShallowUnwrapRef<{
        isFocused: Ref<boolean>;
        input: Ref<HTMLInputElement | undefined>;
    }> & {} & {} & vue.ComponentCustomProperties;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & vue.ComponentOptionsBase<Readonly<{
    id?: unknown;
    error?: unknown;
    name?: unknown;
    value?: unknown;
    type?: unknown;
    theme?: unknown;
    label?: unknown;
    density?: unknown;
    color?: unknown;
    inline?: unknown;
    multiple?: unknown;
    disabled?: unknown;
    ripple?: unknown;
    readonly?: unknown;
    falseIcon?: unknown;
    trueIcon?: unknown;
    trueValue?: unknown;
    falseValue?: unknown;
    valueComparator?: unknown;
    $children?: unknown;
    'v-slots'?: unknown;
} & {
    error: boolean;
    density: "default" | "comfortable" | "compact" | null;
    inline: boolean;
    multiple: boolean | null;
    disabled: boolean;
    ripple: boolean;
    readonly: boolean;
    valueComparator: typeof deepEqual;
} & {
    id?: string | undefined;
    name?: string | undefined;
    value?: any;
    type?: string | undefined;
    theme?: string | undefined;
    label?: string | undefined;
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
        input?: ((args_0: SelectionControlSlot) => vue.VNodeChild) | undefined;
    };
    "v-slots"?: {
        default?: false | (() => vue.VNodeChild) | undefined;
        input?: false | ((args_0: SelectionControlSlot) => vue.VNodeChild) | undefined;
    } | undefined;
    color?: string | undefined;
    falseIcon?: string | undefined;
    trueIcon?: string | undefined;
    trueValue?: any;
    falseValue?: any;
}>, {
    isFocused: Ref<boolean>;
    input: Ref<HTMLInputElement | undefined>;
}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Omit<{
    'update:modelValue': (val: any) => boolean;
}, "update:modelValue" | "modelValue">, string, {
    error: boolean;
    density: "default" | "comfortable" | "compact" | null;
    inline: boolean;
    multiple: boolean | null;
    disabled: boolean;
    ripple: boolean;
    readonly: boolean;
    valueComparator: typeof deepEqual;
}> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & (new <T>() => {
    $props: {
        modelValue?: T | undefined;
        'onUpdate:modelValue'?: ((val: T) => any) | undefined;
    };
    $slots: MakeSlots<{
        default: [];
        input: [SelectionControlSlot];
    }>;
});
declare type VSelectionControl = InstanceType<typeof VSelectionControl>;

declare const VSheet: vue.DefineComponent<{
    theme: StringConstructor;
    tag: {
        type: StringConstructor;
        default: string;
    };
    rounded: {
        type: (StringConstructor | NumberConstructor | BooleanConstructor)[];
        default: undefined;
    };
    absolute: BooleanConstructor;
    bottom: (StringConstructor | NumberConstructor | BooleanConstructor)[];
    fixed: BooleanConstructor;
    left: (StringConstructor | NumberConstructor | BooleanConstructor)[];
    position: {
        type: vue.PropType<"fixed" | "absolute" | "relative" | "static" | "sticky">;
        validator: (v: any) => boolean;
    };
    right: (StringConstructor | NumberConstructor | BooleanConstructor)[];
    top: (StringConstructor | NumberConstructor | BooleanConstructor)[];
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
    border: (StringConstructor | NumberConstructor | BooleanConstructor)[];
    color: {
        type: StringConstructor;
        default: string;
    };
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    theme?: unknown;
    tag?: unknown;
    rounded?: unknown;
    absolute?: unknown;
    bottom?: unknown;
    fixed?: unknown;
    left?: unknown;
    position?: unknown;
    right?: unknown;
    top?: unknown;
    elevation?: unknown;
    height?: unknown;
    maxHeight?: unknown;
    maxWidth?: unknown;
    minHeight?: unknown;
    minWidth?: unknown;
    width?: unknown;
    border?: unknown;
    color?: unknown;
} & {
    fixed: boolean;
    tag: string;
    absolute: boolean;
    color: string;
} & {
    width?: string | number | undefined;
    height?: string | number | undefined;
    left?: string | number | boolean | undefined;
    right?: string | number | boolean | undefined;
    theme?: string | undefined;
    bottom?: string | number | boolean | undefined;
    top?: string | number | boolean | undefined;
    position?: "fixed" | "absolute" | "relative" | "static" | "sticky" | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
    border?: string | number | boolean | undefined;
    elevation?: string | number | undefined;
    rounded?: string | number | boolean | undefined;
}>, {
    fixed: boolean;
    tag: string;
    absolute: boolean;
    rounded: string | number | boolean;
    color: string;
}>;

declare const VSlider: vue.DefineComponent<{
    modelValue: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    disabled: BooleanConstructor;
    error: BooleanConstructor;
    errorMessages: {
        type: vue.PropType<string | string[]>;
        default: () => never[];
    };
    maxErrors: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    name: StringConstructor;
    readonly: BooleanConstructor;
    rules: {
        type: vue.PropType<ValidationRule[]>;
        default: () => never[];
    };
    density: {
        type: vue.PropType<"default" | "comfortable" | "compact" | null>;
        default: string;
        validator: (v: any) => boolean;
    };
    id: StringConstructor;
    appendIcon: StringConstructor;
    prependIcon: StringConstructor;
    hideDetails: vue.PropType<boolean | "auto">;
    messages: {
        type: vue.PropType<string | string[]>;
        default: () => never[];
    };
    direction: {
        type: vue.PropType<"horizontal" | "vertical">;
        default: string;
        validator: (v: any) => boolean;
    };
    elevation: Omit<{
        type: (StringConstructor | NumberConstructor)[];
        validator(v: any): boolean;
    }, "default" | "type"> & {
        type: vue.PropType<string | number>;
        default: string | number;
    };
    rounded: {
        type: (StringConstructor | NumberConstructor | BooleanConstructor)[];
        default: undefined;
    };
    max: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    min: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    step: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    thumbColor: StringConstructor;
    thumbLabel: {
        type: vue.PropType<boolean | "always" | undefined>;
        default: undefined;
        validator: (v: any) => boolean;
    };
    thumbSize: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    showTicks: {
        type: vue.PropType<boolean | "always">;
        default: boolean;
        validator: (v: any) => boolean;
    };
    showTickLabels: {
        type: BooleanConstructor;
        default: boolean;
    };
    ticks: {
        type: vue.PropType<number[] | Record<string, string>>;
    };
    tickSize: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    color: StringConstructor;
    trackColor: StringConstructor;
    trackFillColor: StringConstructor;
    trackSize: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    reverse: BooleanConstructor;
    label: StringConstructor;
    focused: BooleanConstructor;
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:focused': (value: boolean) => true;
    'update:modelValue': (v: number) => true;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    modelValue?: unknown;
    disabled?: unknown;
    error?: unknown;
    errorMessages?: unknown;
    maxErrors?: unknown;
    name?: unknown;
    readonly?: unknown;
    rules?: unknown;
    density?: unknown;
    id?: unknown;
    appendIcon?: unknown;
    prependIcon?: unknown;
    hideDetails?: unknown;
    messages?: unknown;
    direction?: unknown;
    elevation?: unknown;
    rounded?: unknown;
    max?: unknown;
    min?: unknown;
    step?: unknown;
    thumbColor?: unknown;
    thumbLabel?: unknown;
    thumbSize?: unknown;
    showTicks?: unknown;
    showTickLabels?: unknown;
    ticks?: unknown;
    tickSize?: unknown;
    color?: unknown;
    trackColor?: unknown;
    trackFillColor?: unknown;
    trackSize?: unknown;
    reverse?: unknown;
    label?: unknown;
    focused?: unknown;
} & {
    error: boolean;
    reverse: boolean;
    messages: string | string[];
    density: "default" | "comfortable" | "compact" | null;
    elevation: string | number;
    modelValue: string | number;
    disabled: boolean;
    max: string | number;
    readonly: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    direction: "horizontal" | "vertical";
    focused: boolean;
    min: string | number;
    step: string | number;
    tickSize: string | number;
    showTicks: boolean | "always";
    trackSize: string | number;
    thumbSize: string | number;
    showTickLabels: boolean;
} & {
    id?: string | undefined;
    name?: string | undefined;
    label?: string | undefined;
    rounded?: string | number | boolean | undefined;
    color?: string | undefined;
    prependIcon?: string | undefined;
    appendIcon?: string | undefined;
    hideDetails?: boolean | "auto" | undefined;
    trackColor?: string | undefined;
    trackFillColor?: string | undefined;
    thumbColor?: string | undefined;
    thumbLabel?: boolean | "always" | undefined;
    ticks?: number[] | Record<string, string> | undefined;
}> & {
    "onUpdate:modelValue"?: ((v: number) => any) | undefined;
    "onUpdate:focused"?: ((value: boolean) => any) | undefined;
}, {
    error: boolean;
    reverse: boolean;
    messages: string | string[];
    density: "default" | "comfortable" | "compact" | null;
    elevation: string | number;
    rounded: string | number | boolean;
    modelValue: string | number;
    disabled: boolean;
    max: string | number;
    readonly: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    direction: "horizontal" | "vertical";
    focused: boolean;
    min: string | number;
    step: string | number;
    tickSize: string | number;
    showTicks: boolean | "always";
    trackSize: string | number;
    thumbLabel: boolean | "always" | undefined;
    thumbSize: string | number;
    showTickLabels: boolean;
}>;
declare type VSlider = InstanceType<typeof VSlider>;

declare const VSwitch: vue.DefineComponent<{
    density: {
        type: vue.PropType<"default" | "comfortable" | "compact" | null>;
        default: string;
        validator: (v: any) => boolean;
    };
    theme: StringConstructor;
    color: StringConstructor;
    disabled: BooleanConstructor;
    error: BooleanConstructor;
    id: StringConstructor;
    inline: BooleanConstructor;
    label: StringConstructor;
    falseIcon: StringConstructor;
    trueIcon: StringConstructor;
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
    trueValue: null;
    falseValue: null;
    modelValue: null;
    type: StringConstructor;
    value: null;
    valueComparator: {
        type: vue.PropType<typeof deepEqual>;
        default: typeof deepEqual;
    };
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
    appendIcon: StringConstructor;
    prependIcon: StringConstructor;
    hideDetails: vue.PropType<boolean | "auto">;
    messages: {
        type: vue.PropType<string | string[]>;
        default: () => never[];
    };
    direction: {
        type: vue.PropType<"horizontal" | "vertical">;
        default: string;
        validator: (v: any) => boolean;
    };
    loading: BooleanConstructor;
    indeterminate: BooleanConstructor;
    inset: BooleanConstructor;
    flat: BooleanConstructor;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:indeterminate': (val: boolean) => true;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    density?: unknown;
    theme?: unknown;
    color?: unknown;
    disabled?: unknown;
    error?: unknown;
    id?: unknown;
    inline?: unknown;
    label?: unknown;
    falseIcon?: unknown;
    trueIcon?: unknown;
    ripple?: unknown;
    multiple?: unknown;
    name?: unknown;
    readonly?: unknown;
    trueValue?: unknown;
    falseValue?: unknown;
    modelValue?: unknown;
    type?: unknown;
    value?: unknown;
    valueComparator?: unknown;
    errorMessages?: unknown;
    maxErrors?: unknown;
    rules?: unknown;
    appendIcon?: unknown;
    prependIcon?: unknown;
    hideDetails?: unknown;
    messages?: unknown;
    direction?: unknown;
    loading?: unknown;
    indeterminate?: unknown;
    inset?: unknown;
    flat?: unknown;
} & {
    error: boolean;
    flat: boolean;
    messages: string | string[];
    loading: boolean;
    density: "default" | "comfortable" | "compact" | null;
    inset: boolean;
    inline: boolean;
    multiple: boolean | null;
    disabled: boolean;
    ripple: boolean;
    readonly: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    direction: "horizontal" | "vertical";
    valueComparator: typeof deepEqual;
    indeterminate: boolean;
} & {
    id?: string | undefined;
    name?: string | undefined;
    value?: any;
    type?: string | undefined;
    theme?: string | undefined;
    label?: string | undefined;
    color?: string | undefined;
    modelValue?: any;
    prependIcon?: string | undefined;
    appendIcon?: string | undefined;
    hideDetails?: boolean | "auto" | undefined;
    falseIcon?: string | undefined;
    trueIcon?: string | undefined;
    trueValue?: any;
    falseValue?: any;
}> & {
    "onUpdate:indeterminate"?: ((val: boolean) => any) | undefined;
}, {
    error: boolean;
    flat: boolean;
    messages: string | string[];
    loading: boolean;
    density: "default" | "comfortable" | "compact" | null;
    inset: boolean;
    inline: boolean;
    multiple: boolean | null;
    disabled: boolean;
    ripple: boolean;
    readonly: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    direction: "horizontal" | "vertical";
    valueComparator: typeof deepEqual;
    indeterminate: boolean;
}>;
declare type VSwitch = InstanceType<typeof VSwitch>;

declare const VSystemBar: vue.DefineComponent<{
    theme: StringConstructor;
    tag: {
        type: StringConstructor;
        default: string;
    };
    rounded: {
        type: (StringConstructor | NumberConstructor | BooleanConstructor)[];
        default: undefined;
    };
    absolute: BooleanConstructor;
    bottom: (StringConstructor | NumberConstructor | BooleanConstructor)[];
    fixed: BooleanConstructor;
    left: (StringConstructor | NumberConstructor | BooleanConstructor)[];
    position: {
        type: vue.PropType<"fixed" | "absolute" | "relative" | "static" | "sticky">;
        validator: (v: any) => boolean;
    };
    right: (StringConstructor | NumberConstructor | BooleanConstructor)[];
    top: (StringConstructor | NumberConstructor | BooleanConstructor)[];
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
    border: (StringConstructor | NumberConstructor | BooleanConstructor)[];
    lightsOut: BooleanConstructor;
    window: BooleanConstructor;
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    theme?: unknown;
    tag?: unknown;
    rounded?: unknown;
    absolute?: unknown;
    bottom?: unknown;
    fixed?: unknown;
    left?: unknown;
    position?: unknown;
    right?: unknown;
    top?: unknown;
    elevation?: unknown;
    height?: unknown;
    maxHeight?: unknown;
    maxWidth?: unknown;
    minHeight?: unknown;
    minWidth?: unknown;
    width?: unknown;
    border?: unknown;
    lightsOut?: unknown;
    window?: unknown;
} & {
    fixed: boolean;
    tag: string;
    absolute: boolean;
    lightsOut: boolean;
    window: boolean;
} & {
    width?: string | number | undefined;
    height?: string | number | undefined;
    left?: string | number | boolean | undefined;
    right?: string | number | boolean | undefined;
    theme?: string | undefined;
    bottom?: string | number | boolean | undefined;
    top?: string | number | boolean | undefined;
    position?: "fixed" | "absolute" | "relative" | "static" | "sticky" | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
    border?: string | number | boolean | undefined;
    elevation?: string | number | undefined;
    rounded?: string | number | boolean | undefined;
}>, {
    fixed: boolean;
    tag: string;
    absolute: boolean;
    rounded: string | number | boolean;
    lightsOut: boolean;
    window: boolean;
}>;

declare const VTable: vue.DefineComponent<{
    tag: {
        type: StringConstructor;
        default: string;
    };
    theme: StringConstructor;
    density: {
        type: vue.PropType<"default" | "comfortable" | "compact" | null>;
        default: string;
        validator: (v: any) => boolean;
    };
    fixedHeader: BooleanConstructor;
    fixedFooter: BooleanConstructor;
    height: (StringConstructor | NumberConstructor)[];
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    tag?: unknown;
    theme?: unknown;
    density?: unknown;
    fixedHeader?: unknown;
    fixedFooter?: unknown;
    height?: unknown;
} & {
    tag: string;
    density: "default" | "comfortable" | "compact" | null;
    fixedHeader: boolean;
    fixedFooter: boolean;
} & {
    height?: string | number | undefined;
    theme?: string | undefined;
}>, {
    tag: string;
    density: "default" | "comfortable" | "compact" | null;
    fixedHeader: boolean;
    fixedFooter: boolean;
}>;

declare const VTextarea: vue.DefineComponent<{
    loading: BooleanConstructor;
    theme: StringConstructor;
    appendInnerIcon: StringConstructor;
    bgColor: StringConstructor;
    clearable: BooleanConstructor;
    clearIcon: {
        type: StringConstructor;
        default: string;
    };
    color: StringConstructor;
    label: StringConstructor;
    persistentClear: BooleanConstructor;
    prependInnerIcon: StringConstructor;
    reverse: BooleanConstructor;
    singleLine: BooleanConstructor;
    variant: {
        type: PropType<"filled" | "outlined" | "plain" | "contained" | "underlined">;
        default: string;
        validator: (v: any) => boolean;
    };
    disabled: BooleanConstructor;
    error: BooleanConstructor;
    errorMessages: {
        type: PropType<string | string[]>;
        default: () => never[];
    };
    maxErrors: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    name: StringConstructor;
    readonly: BooleanConstructor;
    rules: {
        type: PropType<ValidationRule[]>;
        default: () => never[];
    };
    modelValue: null;
    density: {
        type: PropType<"default" | "comfortable" | "compact" | null>;
        default: string;
        validator: (v: any) => boolean;
    };
    id: StringConstructor;
    appendIcon: StringConstructor;
    prependIcon: StringConstructor;
    hideDetails: PropType<boolean | "auto">;
    messages: {
        type: PropType<string | string[]>;
        default: () => never[];
    };
    direction: {
        type: PropType<"horizontal" | "vertical">;
        default: string;
        validator: (v: any) => boolean;
    };
    autoGrow: BooleanConstructor;
    autofocus: BooleanConstructor;
    counter: PropType<string | number | true>;
    counterValue: PropType<(value: any) => number>;
    hint: StringConstructor;
    persistentHint: BooleanConstructor;
    prefix: StringConstructor;
    placeholder: StringConstructor;
    persistentPlaceholder: BooleanConstructor;
    persistentCounter: BooleanConstructor;
    noResize: BooleanConstructor;
    rows: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
        validator: (v: any) => boolean;
    };
    maxRows: {
        type: (StringConstructor | NumberConstructor)[];
        validator: (v: any) => boolean;
    };
    suffix: StringConstructor;
}, HTMLInputElement & {
    $: vue.ComponentInternalInstance;
    $data: {};
    $props: Partial<{
        error: boolean;
        messages: string | string[];
        density: "default" | "comfortable" | "compact" | null;
        disabled: boolean;
        readonly: boolean;
        errorMessages: string | string[];
        maxErrors: string | number;
        rules: ValidationRule[];
        direction: "horizontal" | "vertical";
    }> & Omit<Readonly<{
        disabled?: unknown;
        error?: unknown;
        errorMessages?: unknown;
        maxErrors?: unknown;
        name?: unknown;
        readonly?: unknown;
        rules?: unknown;
        modelValue?: unknown;
        density?: unknown;
        id?: unknown;
        appendIcon?: unknown;
        prependIcon?: unknown;
        hideDetails?: unknown;
        messages?: unknown;
        direction?: unknown;
        $children?: unknown;
        'v-slots'?: unknown;
    } & {
        error: boolean;
        messages: string | string[];
        density: "default" | "comfortable" | "compact" | null;
        disabled: boolean;
        readonly: boolean;
        errorMessages: string | string[];
        maxErrors: string | number;
        rules: ValidationRule[];
        direction: "horizontal" | "vertical";
    } & {
        id?: string | undefined;
        name?: string | undefined;
        $children?: vue.VNodeChild | ((args_0: VInputSlot) => vue.VNodeChild) | {
            default?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            prepend?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            append?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            details?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        };
        "v-slots"?: {
            default?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            prepend?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            append?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            details?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        } | undefined;
        modelValue?: any;
        prependIcon?: string | undefined;
        appendIcon?: string | undefined;
        hideDetails?: boolean | "auto" | undefined;
    }> & {
        "onUpdate:modelValue"?: ((val: any) => any) | undefined;
        "onClick:prepend"?: ((e: MouseEvent) => any) | undefined;
        "onClick:append"?: ((e: MouseEvent) => any) | undefined;
    } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "error" | "messages" | "density" | "disabled" | "readonly" | "errorMessages" | "maxErrors" | "rules" | "direction">;
    $attrs: {
        [x: string]: unknown;
    };
    $refs: {
        [x: string]: unknown;
    };
    $slots: Readonly<{
        [name: string]: vue.Slot | undefined;
    }>;
    $root: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
    $parent: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
    $emit: ((event: "update:modelValue", val: any) => void) & ((event: "click:prepend", e: MouseEvent) => void) & ((event: "click:append", e: MouseEvent) => void);
    $el: any;
    $options: vue.ComponentOptionsBase<Readonly<{
        disabled?: unknown;
        error?: unknown;
        errorMessages?: unknown;
        maxErrors?: unknown;
        name?: unknown;
        readonly?: unknown;
        rules?: unknown;
        modelValue?: unknown;
        density?: unknown;
        id?: unknown;
        appendIcon?: unknown;
        prependIcon?: unknown;
        hideDetails?: unknown;
        messages?: unknown;
        direction?: unknown;
        $children?: unknown;
        'v-slots'?: unknown;
    } & {
        error: boolean;
        messages: string | string[];
        density: "default" | "comfortable" | "compact" | null;
        disabled: boolean;
        readonly: boolean;
        errorMessages: string | string[];
        maxErrors: string | number;
        rules: ValidationRule[];
        direction: "horizontal" | "vertical";
    } & {
        id?: string | undefined;
        name?: string | undefined;
        $children?: vue.VNodeChild | ((args_0: VInputSlot) => vue.VNodeChild) | {
            default?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            prepend?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            append?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            details?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        };
        "v-slots"?: {
            default?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            prepend?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            append?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            details?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        } | undefined;
        modelValue?: any;
        prependIcon?: string | undefined;
        appendIcon?: string | undefined;
        hideDetails?: boolean | "auto" | undefined;
    }> & {
        "onUpdate:modelValue"?: ((val: any) => any) | undefined;
        "onClick:prepend"?: ((e: MouseEvent) => any) | undefined;
        "onClick:append"?: ((e: MouseEvent) => any) | undefined;
    }, {
        reset: () => void;
        resetValidation: () => void;
        validate: () => Promise<string[]>;
    }, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
        'click:prepend': (e: MouseEvent) => boolean;
        'click:append': (e: MouseEvent) => boolean;
        'update:modelValue': (val: any) => boolean;
    }, string, {
        error: boolean;
        messages: string | string[];
        density: "default" | "comfortable" | "compact" | null;
        disabled: boolean;
        readonly: boolean;
        errorMessages: string | string[];
        maxErrors: string | number;
        rules: ValidationRule[];
        direction: "horizontal" | "vertical";
    }> & {
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
        errorCaptured?: (((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void) | ((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void)[]) | undefined;
    };
    $forceUpdate: () => void;
    $nextTick: typeof nextTick;
    $watch(source: string | Function, cb: Function, options?: vue.WatchOptions<boolean> | undefined): vue.WatchStopHandle;
} & Readonly<{
    disabled?: unknown;
    error?: unknown;
    errorMessages?: unknown;
    maxErrors?: unknown;
    name?: unknown;
    readonly?: unknown;
    rules?: unknown;
    modelValue?: unknown;
    density?: unknown;
    id?: unknown;
    appendIcon?: unknown;
    prependIcon?: unknown;
    hideDetails?: unknown;
    messages?: unknown;
    direction?: unknown;
    $children?: unknown;
    'v-slots'?: unknown;
} & {
    error: boolean;
    messages: string | string[];
    density: "default" | "comfortable" | "compact" | null;
    disabled: boolean;
    readonly: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    direction: "horizontal" | "vertical";
} & {
    id?: string | undefined;
    name?: string | undefined;
    $children?: vue.VNodeChild | ((args_0: VInputSlot) => vue.VNodeChild) | {
        default?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        prepend?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        append?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        details?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    };
    "v-slots"?: {
        default?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        prepend?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        append?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        details?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    } | undefined;
    modelValue?: any;
    prependIcon?: string | undefined;
    appendIcon?: string | undefined;
    hideDetails?: boolean | "auto" | undefined;
}> & {
    "onUpdate:modelValue"?: ((val: any) => any) | undefined;
    "onClick:prepend"?: ((e: MouseEvent) => any) | undefined;
    "onClick:append"?: ((e: MouseEvent) => any) | undefined;
} & vue.ShallowUnwrapRef<{
    reset: () => void;
    resetValidation: () => void;
    validate: () => Promise<string[]>;
}> & {} & {} & vue.ComponentCustomProperties & {
    $slots: MakeSlots<{
        default: [VInputSlot];
        prepend: [VInputSlot];
        append: [VInputSlot];
        details: [VInputSlot];
    }>;
}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'click:clear': (e: MouseEvent) => true;
    'click:control': (e: MouseEvent) => true;
    'update:modelValue': (val: string) => true;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    loading?: unknown;
    theme?: unknown;
    appendInnerIcon?: unknown;
    bgColor?: unknown;
    clearable?: unknown;
    clearIcon?: unknown;
    color?: unknown;
    label?: unknown;
    persistentClear?: unknown;
    prependInnerIcon?: unknown;
    reverse?: unknown;
    singleLine?: unknown;
    variant?: unknown;
    disabled?: unknown;
    error?: unknown;
    errorMessages?: unknown;
    maxErrors?: unknown;
    name?: unknown;
    readonly?: unknown;
    rules?: unknown;
    modelValue?: unknown;
    density?: unknown;
    id?: unknown;
    appendIcon?: unknown;
    prependIcon?: unknown;
    hideDetails?: unknown;
    messages?: unknown;
    direction?: unknown;
    autoGrow?: unknown;
    autofocus?: unknown;
    counter?: unknown;
    counterValue?: unknown;
    hint?: unknown;
    persistentHint?: unknown;
    prefix?: unknown;
    placeholder?: unknown;
    persistentPlaceholder?: unknown;
    persistentCounter?: unknown;
    noResize?: unknown;
    rows?: unknown;
    maxRows?: unknown;
    suffix?: unknown;
} & {
    error: boolean;
    reverse: boolean;
    messages: string | string[];
    loading: boolean;
    density: "default" | "comfortable" | "compact" | null;
    disabled: boolean;
    variant: "filled" | "outlined" | "plain" | "contained" | "underlined";
    readonly: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    direction: "horizontal" | "vertical";
    clearable: boolean;
    clearIcon: string;
    persistentClear: boolean;
    singleLine: boolean;
    persistentHint: boolean;
    persistentPlaceholder: boolean;
    autofocus: boolean;
    persistentCounter: boolean;
    autoGrow: boolean;
    noResize: boolean;
    rows: string | number;
} & {
    id?: string | undefined;
    name?: string | undefined;
    theme?: string | undefined;
    label?: string | undefined;
    counter?: string | number | true | undefined;
    placeholder?: string | undefined;
    color?: string | undefined;
    modelValue?: any;
    prependIcon?: string | undefined;
    appendIcon?: string | undefined;
    bgColor?: string | undefined;
    hideDetails?: boolean | "auto" | undefined;
    appendInnerIcon?: string | undefined;
    prependInnerIcon?: string | undefined;
    hint?: string | undefined;
    prefix?: string | undefined;
    suffix?: string | undefined;
    counterValue?: ((value: any) => number) | undefined;
    maxRows?: string | number | undefined;
}> & {
    "onUpdate:modelValue"?: ((val: string) => any) | undefined;
    "onClick:clear"?: ((e: MouseEvent) => any) | undefined;
    "onClick:control"?: ((e: MouseEvent) => any) | undefined;
}, {
    error: boolean;
    reverse: boolean;
    messages: string | string[];
    loading: boolean;
    density: "default" | "comfortable" | "compact" | null;
    disabled: boolean;
    variant: "filled" | "outlined" | "plain" | "contained" | "underlined";
    readonly: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    direction: "horizontal" | "vertical";
    clearable: boolean;
    clearIcon: string;
    persistentClear: boolean;
    singleLine: boolean;
    persistentHint: boolean;
    persistentPlaceholder: boolean;
    autofocus: boolean;
    persistentCounter: boolean;
    autoGrow: boolean;
    noResize: boolean;
    rows: string | number;
}>;
declare type VTextarea = InstanceType<typeof VTextarea>;

declare const VTextField: {
    new (...args: any[]): {
        $: vue.ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            error: boolean;
            reverse: boolean;
            messages: string | string[];
            type: string;
            loading: boolean;
            density: "default" | "comfortable" | "compact" | null;
            disabled: boolean;
            variant: "filled" | "outlined" | "plain" | "contained" | "underlined";
            readonly: boolean;
            errorMessages: string | string[];
            maxErrors: string | number;
            rules: ValidationRule[];
            direction: "horizontal" | "vertical";
            clearable: boolean;
            clearIcon: string;
            persistentClear: boolean;
            singleLine: boolean;
            persistentHint: boolean;
            persistentPlaceholder: boolean;
            autofocus: boolean;
            persistentCounter: boolean;
        }> & Omit<Readonly<{
            loading?: unknown;
            theme?: unknown;
            appendInnerIcon?: unknown;
            bgColor?: unknown;
            clearable?: unknown;
            clearIcon?: unknown;
            color?: unknown;
            label?: unknown;
            persistentClear?: unknown;
            prependInnerIcon?: unknown;
            reverse?: unknown;
            singleLine?: unknown;
            variant?: unknown;
            disabled?: unknown;
            error?: unknown;
            errorMessages?: unknown;
            maxErrors?: unknown;
            name?: unknown;
            readonly?: unknown;
            rules?: unknown;
            modelValue?: unknown;
            density?: unknown;
            id?: unknown;
            appendIcon?: unknown;
            prependIcon?: unknown;
            hideDetails?: unknown;
            messages?: unknown;
            direction?: unknown;
            autofocus?: unknown;
            counter?: unknown;
            counterValue?: unknown;
            hint?: unknown;
            persistentHint?: unknown;
            prefix?: unknown;
            placeholder?: unknown;
            persistentPlaceholder?: unknown;
            persistentCounter?: unknown;
            suffix?: unknown;
            type?: unknown;
            $children?: unknown;
            'v-slots'?: unknown;
        } & {
            error: boolean;
            reverse: boolean;
            messages: string | string[];
            type: string;
            loading: boolean;
            density: "default" | "comfortable" | "compact" | null;
            disabled: boolean;
            variant: "filled" | "outlined" | "plain" | "contained" | "underlined";
            readonly: boolean;
            errorMessages: string | string[];
            maxErrors: string | number;
            rules: ValidationRule[];
            direction: "horizontal" | "vertical";
            clearable: boolean;
            clearIcon: string;
            persistentClear: boolean;
            singleLine: boolean;
            persistentHint: boolean;
            persistentPlaceholder: boolean;
            autofocus: boolean;
            persistentCounter: boolean;
        } & {
            id?: string | undefined;
            name?: string | undefined;
            theme?: string | undefined;
            label?: string | undefined;
            counter?: string | number | true | undefined;
            $children?: vue.VNodeChild | (((args_0: VInputSlot) => vue.VNodeChild) & ((args_0: VFieldSlot) => vue.VNodeChild)) | {
                default?: (((args_0: VInputSlot) => vue.VNodeChild) & ((args_0: VFieldSlot) => vue.VNodeChild)) | undefined;
                prepend?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
                append?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
                details?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
                clear?: (() => vue.VNodeChild) | undefined;
                prependInner?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
                appendInner?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
                label?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
                loader?: ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
            };
            placeholder?: string | undefined;
            "v-slots"?: {
                default?: false | (((args_0: VInputSlot) => vue.VNodeChild) & ((args_0: VFieldSlot) => vue.VNodeChild)) | undefined;
                prepend?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
                append?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
                details?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
                clear?: false | (() => vue.VNodeChild) | undefined;
                prependInner?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
                appendInner?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
                label?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
                loader?: false | ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
            } | undefined;
            color?: string | undefined;
            modelValue?: any;
            prependIcon?: string | undefined;
            appendIcon?: string | undefined;
            bgColor?: string | undefined;
            hideDetails?: boolean | "auto" | undefined;
            appendInnerIcon?: string | undefined;
            prependInnerIcon?: string | undefined;
            hint?: string | undefined;
            prefix?: string | undefined;
            suffix?: string | undefined;
            counterValue?: ((value: any) => number) | undefined;
        }> & {
            "onUpdate:modelValue"?: ((val: string) => any) | undefined;
            "onClick:prepend"?: ((e: MouseEvent) => any) | undefined;
            "onClick:append"?: ((e: MouseEvent) => any) | undefined;
            "onClick:clear"?: ((e: MouseEvent) => any) | undefined;
            "onClick:prepend-inner"?: ((e: MouseEvent) => any) | undefined;
            "onClick:append-inner"?: ((e: MouseEvent) => any) | undefined;
            "onClick:control"?: ((e: MouseEvent) => any) | undefined;
        } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "error" | "reverse" | "messages" | "type" | "loading" | "density" | "disabled" | "variant" | "readonly" | "errorMessages" | "maxErrors" | "rules" | "direction" | "clearable" | "clearIcon" | "persistentClear" | "singleLine" | "persistentHint" | "persistentPlaceholder" | "autofocus" | "persistentCounter">;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            [name: string]: vue.Slot | undefined;
        }>;
        $root: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
        $parent: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
        $emit: ((event: "update:modelValue", val: string) => void) & ((event: "click:prepend", e: MouseEvent) => void) & ((event: "click:append", e: MouseEvent) => void) & ((event: "click:clear", e: MouseEvent) => void) & ((event: "click:prepend-inner", e: MouseEvent) => void) & ((event: "click:append-inner", e: MouseEvent) => void) & ((event: "click:control", e: MouseEvent) => void);
        $el: any;
        $options: vue.ComponentOptionsBase<Readonly<{
            loading?: unknown;
            theme?: unknown;
            appendInnerIcon?: unknown;
            bgColor?: unknown;
            clearable?: unknown;
            clearIcon?: unknown;
            color?: unknown;
            label?: unknown;
            persistentClear?: unknown;
            prependInnerIcon?: unknown;
            reverse?: unknown;
            singleLine?: unknown;
            variant?: unknown;
            disabled?: unknown;
            error?: unknown;
            errorMessages?: unknown;
            maxErrors?: unknown;
            name?: unknown;
            readonly?: unknown;
            rules?: unknown;
            modelValue?: unknown;
            density?: unknown;
            id?: unknown;
            appendIcon?: unknown;
            prependIcon?: unknown;
            hideDetails?: unknown;
            messages?: unknown;
            direction?: unknown;
            autofocus?: unknown;
            counter?: unknown;
            counterValue?: unknown;
            hint?: unknown;
            persistentHint?: unknown;
            prefix?: unknown;
            placeholder?: unknown;
            persistentPlaceholder?: unknown;
            persistentCounter?: unknown;
            suffix?: unknown;
            type?: unknown;
            $children?: unknown;
            'v-slots'?: unknown;
        } & {
            error: boolean;
            reverse: boolean;
            messages: string | string[];
            type: string;
            loading: boolean;
            density: "default" | "comfortable" | "compact" | null;
            disabled: boolean;
            variant: "filled" | "outlined" | "plain" | "contained" | "underlined";
            readonly: boolean;
            errorMessages: string | string[];
            maxErrors: string | number;
            rules: ValidationRule[];
            direction: "horizontal" | "vertical";
            clearable: boolean;
            clearIcon: string;
            persistentClear: boolean;
            singleLine: boolean;
            persistentHint: boolean;
            persistentPlaceholder: boolean;
            autofocus: boolean;
            persistentCounter: boolean;
        } & {
            id?: string | undefined;
            name?: string | undefined;
            theme?: string | undefined;
            label?: string | undefined;
            counter?: string | number | true | undefined;
            $children?: vue.VNodeChild | (((args_0: VInputSlot) => vue.VNodeChild) & ((args_0: VFieldSlot) => vue.VNodeChild)) | {
                default?: (((args_0: VInputSlot) => vue.VNodeChild) & ((args_0: VFieldSlot) => vue.VNodeChild)) | undefined;
                prepend?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
                append?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
                details?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
                clear?: (() => vue.VNodeChild) | undefined;
                prependInner?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
                appendInner?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
                label?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
                loader?: ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
            };
            placeholder?: string | undefined;
            "v-slots"?: {
                default?: false | (((args_0: VInputSlot) => vue.VNodeChild) & ((args_0: VFieldSlot) => vue.VNodeChild)) | undefined;
                prepend?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
                append?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
                details?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
                clear?: false | (() => vue.VNodeChild) | undefined;
                prependInner?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
                appendInner?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
                label?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
                loader?: false | ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
            } | undefined;
            color?: string | undefined;
            modelValue?: any;
            prependIcon?: string | undefined;
            appendIcon?: string | undefined;
            bgColor?: string | undefined;
            hideDetails?: boolean | "auto" | undefined;
            appendInnerIcon?: string | undefined;
            prependInnerIcon?: string | undefined;
            hint?: string | undefined;
            prefix?: string | undefined;
            suffix?: string | undefined;
            counterValue?: ((value: any) => number) | undefined;
        }> & {
            "onUpdate:modelValue"?: ((val: string) => any) | undefined;
            "onClick:prepend"?: ((e: MouseEvent) => any) | undefined;
            "onClick:append"?: ((e: MouseEvent) => any) | undefined;
            "onClick:clear"?: ((e: MouseEvent) => any) | undefined;
            "onClick:prepend-inner"?: ((e: MouseEvent) => any) | undefined;
            "onClick:append-inner"?: ((e: MouseEvent) => any) | undefined;
            "onClick:control"?: ((e: MouseEvent) => any) | undefined;
        }, HTMLInputElement & {
            $: vue.ComponentInternalInstance;
            $data: {};
            $props: Partial<{
                error: boolean;
                messages: string | string[];
                density: "default" | "comfortable" | "compact" | null;
                disabled: boolean;
                readonly: boolean;
                errorMessages: string | string[];
                maxErrors: string | number;
                rules: ValidationRule[];
                direction: "horizontal" | "vertical";
            }> & Omit<Readonly<{
                disabled?: unknown;
                error?: unknown;
                errorMessages?: unknown;
                maxErrors?: unknown;
                name?: unknown;
                readonly?: unknown;
                rules?: unknown;
                modelValue?: unknown;
                density?: unknown;
                id?: unknown;
                appendIcon?: unknown;
                prependIcon?: unknown;
                hideDetails?: unknown;
                messages?: unknown;
                direction?: unknown;
                $children?: unknown;
                'v-slots'?: unknown;
            } & {
                error: boolean;
                messages: string | string[];
                density: "default" | "comfortable" | "compact" | null;
                disabled: boolean;
                readonly: boolean;
                errorMessages: string | string[];
                maxErrors: string | number;
                rules: ValidationRule[];
                direction: "horizontal" | "vertical";
            } & {
                id?: string | undefined;
                name?: string | undefined;
                $children?: vue.VNodeChild | ((args_0: VInputSlot) => vue.VNodeChild) | {
                    default?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
                    prepend?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
                    append?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
                    details?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
                };
                "v-slots"?: {
                    default?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
                    prepend?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
                    append?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
                    details?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
                } | undefined;
                modelValue?: any;
                prependIcon?: string | undefined;
                appendIcon?: string | undefined;
                hideDetails?: boolean | "auto" | undefined;
            }> & {
                "onUpdate:modelValue"?: ((val: any) => any) | undefined;
                "onClick:prepend"?: ((e: MouseEvent) => any) | undefined;
                "onClick:append"?: ((e: MouseEvent) => any) | undefined;
            } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "error" | "messages" | "density" | "disabled" | "readonly" | "errorMessages" | "maxErrors" | "rules" | "direction">;
            $attrs: {
                [x: string]: unknown;
            };
            $refs: {
                [x: string]: unknown;
            };
            $slots: Readonly<{
                [name: string]: vue.Slot | undefined;
            }>;
            $root: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
            $parent: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
            $emit: ((event: "update:modelValue", val: any) => void) & ((event: "click:prepend", e: MouseEvent) => void) & ((event: "click:append", e: MouseEvent) => void);
            $el: any;
            $options: vue.ComponentOptionsBase<Readonly<{
                disabled?: unknown;
                error?: unknown;
                errorMessages?: unknown;
                maxErrors?: unknown;
                name?: unknown;
                readonly?: unknown;
                rules?: unknown;
                modelValue?: unknown;
                density?: unknown;
                id?: unknown;
                appendIcon?: unknown;
                prependIcon?: unknown;
                hideDetails?: unknown;
                messages?: unknown;
                direction?: unknown;
                $children?: unknown;
                'v-slots'?: unknown;
            } & {
                error: boolean;
                messages: string | string[];
                density: "default" | "comfortable" | "compact" | null;
                disabled: boolean;
                readonly: boolean;
                errorMessages: string | string[];
                maxErrors: string | number;
                rules: ValidationRule[];
                direction: "horizontal" | "vertical";
            } & {
                id?: string | undefined;
                name?: string | undefined;
                $children?: vue.VNodeChild | ((args_0: VInputSlot) => vue.VNodeChild) | {
                    default?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
                    prepend?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
                    append?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
                    details?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
                };
                "v-slots"?: {
                    default?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
                    prepend?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
                    append?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
                    details?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
                } | undefined;
                modelValue?: any;
                prependIcon?: string | undefined;
                appendIcon?: string | undefined;
                hideDetails?: boolean | "auto" | undefined;
            }> & {
                "onUpdate:modelValue"?: ((val: any) => any) | undefined;
                "onClick:prepend"?: ((e: MouseEvent) => any) | undefined;
                "onClick:append"?: ((e: MouseEvent) => any) | undefined;
            }, {
                reset: () => void;
                resetValidation: () => void;
                validate: () => Promise<string[]>;
            }, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
                'click:prepend': (e: MouseEvent) => boolean;
                'click:append': (e: MouseEvent) => boolean;
                'update:modelValue': (val: any) => boolean;
            }, string, {
                error: boolean;
                messages: string | string[];
                density: "default" | "comfortable" | "compact" | null;
                disabled: boolean;
                readonly: boolean;
                errorMessages: string | string[];
                maxErrors: string | number;
                rules: ValidationRule[];
                direction: "horizontal" | "vertical";
            }> & {
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
                errorCaptured?: (((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void) | ((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void)[]) | undefined;
            };
            $forceUpdate: () => void;
            $nextTick: typeof nextTick;
            $watch(source: string | Function, cb: Function, options?: vue.WatchOptions<boolean> | undefined): vue.WatchStopHandle;
        } & Readonly<{
            disabled?: unknown;
            error?: unknown;
            errorMessages?: unknown;
            maxErrors?: unknown;
            name?: unknown;
            readonly?: unknown;
            rules?: unknown;
            modelValue?: unknown;
            density?: unknown;
            id?: unknown;
            appendIcon?: unknown;
            prependIcon?: unknown;
            hideDetails?: unknown;
            messages?: unknown;
            direction?: unknown;
            $children?: unknown;
            'v-slots'?: unknown;
        } & {
            error: boolean;
            messages: string | string[];
            density: "default" | "comfortable" | "compact" | null;
            disabled: boolean;
            readonly: boolean;
            errorMessages: string | string[];
            maxErrors: string | number;
            rules: ValidationRule[];
            direction: "horizontal" | "vertical";
        } & {
            id?: string | undefined;
            name?: string | undefined;
            $children?: vue.VNodeChild | ((args_0: VInputSlot) => vue.VNodeChild) | {
                default?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
                prepend?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
                append?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
                details?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            };
            "v-slots"?: {
                default?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
                prepend?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
                append?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
                details?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            } | undefined;
            modelValue?: any;
            prependIcon?: string | undefined;
            appendIcon?: string | undefined;
            hideDetails?: boolean | "auto" | undefined;
        }> & {
            "onUpdate:modelValue"?: ((val: any) => any) | undefined;
            "onClick:prepend"?: ((e: MouseEvent) => any) | undefined;
            "onClick:append"?: ((e: MouseEvent) => any) | undefined;
        } & vue.ShallowUnwrapRef<{
            reset: () => void;
            resetValidation: () => void;
            validate: () => Promise<string[]>;
        }> & {} & {} & vue.ComponentCustomProperties & {
            $slots: MakeSlots<{
                default: [VInputSlot];
                prepend: [VInputSlot];
                append: [VInputSlot];
                details: [VInputSlot];
            }>;
        }, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
            'click:append': (e: MouseEvent) => boolean;
            'click:append-inner': (e: MouseEvent) => boolean;
            'click:clear': (e: MouseEvent) => boolean;
            'click:control': (e: MouseEvent) => boolean;
            'click:prepend': (e: MouseEvent) => boolean;
            'click:prepend-inner': (e: MouseEvent) => boolean;
            'update:modelValue': (val: string) => boolean;
        }, string, {
            error: boolean;
            reverse: boolean;
            messages: string | string[];
            type: string;
            loading: boolean;
            density: "default" | "comfortable" | "compact" | null;
            disabled: boolean;
            variant: "filled" | "outlined" | "plain" | "contained" | "underlined";
            readonly: boolean;
            errorMessages: string | string[];
            maxErrors: string | number;
            rules: ValidationRule[];
            direction: "horizontal" | "vertical";
            clearable: boolean;
            clearIcon: string;
            persistentClear: boolean;
            singleLine: boolean;
            persistentHint: boolean;
            persistentPlaceholder: boolean;
            autofocus: boolean;
            persistentCounter: boolean;
        }> & {
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
            errorCaptured?: (((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void) | ((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void)[]) | undefined;
        };
        $forceUpdate: () => void;
        $nextTick: typeof nextTick;
        $watch(source: string | Function, cb: Function, options?: vue.WatchOptions<boolean> | undefined): vue.WatchStopHandle;
    } & Readonly<{
        loading?: unknown;
        theme?: unknown;
        appendInnerIcon?: unknown;
        bgColor?: unknown;
        clearable?: unknown;
        clearIcon?: unknown;
        color?: unknown;
        label?: unknown;
        persistentClear?: unknown;
        prependInnerIcon?: unknown;
        reverse?: unknown;
        singleLine?: unknown;
        variant?: unknown;
        disabled?: unknown;
        error?: unknown;
        errorMessages?: unknown;
        maxErrors?: unknown;
        name?: unknown;
        readonly?: unknown;
        rules?: unknown;
        modelValue?: unknown;
        density?: unknown;
        id?: unknown;
        appendIcon?: unknown;
        prependIcon?: unknown;
        hideDetails?: unknown;
        messages?: unknown;
        direction?: unknown;
        autofocus?: unknown;
        counter?: unknown;
        counterValue?: unknown;
        hint?: unknown;
        persistentHint?: unknown;
        prefix?: unknown;
        placeholder?: unknown;
        persistentPlaceholder?: unknown;
        persistentCounter?: unknown;
        suffix?: unknown;
        type?: unknown;
        $children?: unknown;
        'v-slots'?: unknown;
    } & {
        error: boolean;
        reverse: boolean;
        messages: string | string[];
        type: string;
        loading: boolean;
        density: "default" | "comfortable" | "compact" | null;
        disabled: boolean;
        variant: "filled" | "outlined" | "plain" | "contained" | "underlined";
        readonly: boolean;
        errorMessages: string | string[];
        maxErrors: string | number;
        rules: ValidationRule[];
        direction: "horizontal" | "vertical";
        clearable: boolean;
        clearIcon: string;
        persistentClear: boolean;
        singleLine: boolean;
        persistentHint: boolean;
        persistentPlaceholder: boolean;
        autofocus: boolean;
        persistentCounter: boolean;
    } & {
        id?: string | undefined;
        name?: string | undefined;
        theme?: string | undefined;
        label?: string | undefined;
        counter?: string | number | true | undefined;
        $children?: vue.VNodeChild | (((args_0: VInputSlot) => vue.VNodeChild) & ((args_0: VFieldSlot) => vue.VNodeChild)) | {
            default?: (((args_0: VInputSlot) => vue.VNodeChild) & ((args_0: VFieldSlot) => vue.VNodeChild)) | undefined;
            prepend?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            append?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            details?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            clear?: (() => vue.VNodeChild) | undefined;
            prependInner?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
            appendInner?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
            label?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
            loader?: ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
        };
        placeholder?: string | undefined;
        "v-slots"?: {
            default?: false | (((args_0: VInputSlot) => vue.VNodeChild) & ((args_0: VFieldSlot) => vue.VNodeChild)) | undefined;
            prepend?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            append?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            details?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            clear?: false | (() => vue.VNodeChild) | undefined;
            prependInner?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
            appendInner?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
            label?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
            loader?: false | ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
        } | undefined;
        color?: string | undefined;
        modelValue?: any;
        prependIcon?: string | undefined;
        appendIcon?: string | undefined;
        bgColor?: string | undefined;
        hideDetails?: boolean | "auto" | undefined;
        appendInnerIcon?: string | undefined;
        prependInnerIcon?: string | undefined;
        hint?: string | undefined;
        prefix?: string | undefined;
        suffix?: string | undefined;
        counterValue?: ((value: any) => number) | undefined;
    }> & {
        "onUpdate:modelValue"?: ((val: string) => any) | undefined;
        "onClick:prepend"?: ((e: MouseEvent) => any) | undefined;
        "onClick:append"?: ((e: MouseEvent) => any) | undefined;
        "onClick:clear"?: ((e: MouseEvent) => any) | undefined;
        "onClick:prepend-inner"?: ((e: MouseEvent) => any) | undefined;
        "onClick:append-inner"?: ((e: MouseEvent) => any) | undefined;
        "onClick:control"?: ((e: MouseEvent) => any) | undefined;
    } & vue.ShallowUnwrapRef<HTMLInputElement & {
        $: vue.ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            error: boolean;
            messages: string | string[];
            density: "default" | "comfortable" | "compact" | null;
            disabled: boolean;
            readonly: boolean;
            errorMessages: string | string[];
            maxErrors: string | number;
            rules: ValidationRule[];
            direction: "horizontal" | "vertical";
        }> & Omit<Readonly<{
            disabled?: unknown;
            error?: unknown;
            errorMessages?: unknown;
            maxErrors?: unknown;
            name?: unknown;
            readonly?: unknown;
            rules?: unknown;
            modelValue?: unknown;
            density?: unknown;
            id?: unknown;
            appendIcon?: unknown;
            prependIcon?: unknown;
            hideDetails?: unknown;
            messages?: unknown;
            direction?: unknown;
            $children?: unknown;
            'v-slots'?: unknown;
        } & {
            error: boolean;
            messages: string | string[];
            density: "default" | "comfortable" | "compact" | null;
            disabled: boolean;
            readonly: boolean;
            errorMessages: string | string[];
            maxErrors: string | number;
            rules: ValidationRule[];
            direction: "horizontal" | "vertical";
        } & {
            id?: string | undefined;
            name?: string | undefined;
            $children?: vue.VNodeChild | ((args_0: VInputSlot) => vue.VNodeChild) | {
                default?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
                prepend?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
                append?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
                details?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            };
            "v-slots"?: {
                default?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
                prepend?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
                append?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
                details?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            } | undefined;
            modelValue?: any;
            prependIcon?: string | undefined;
            appendIcon?: string | undefined;
            hideDetails?: boolean | "auto" | undefined;
        }> & {
            "onUpdate:modelValue"?: ((val: any) => any) | undefined;
            "onClick:prepend"?: ((e: MouseEvent) => any) | undefined;
            "onClick:append"?: ((e: MouseEvent) => any) | undefined;
        } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "error" | "messages" | "density" | "disabled" | "readonly" | "errorMessages" | "maxErrors" | "rules" | "direction">;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            [name: string]: vue.Slot | undefined;
        }>;
        $root: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
        $parent: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
        $emit: ((event: "update:modelValue", val: any) => void) & ((event: "click:prepend", e: MouseEvent) => void) & ((event: "click:append", e: MouseEvent) => void);
        $el: any;
        $options: vue.ComponentOptionsBase<Readonly<{
            disabled?: unknown;
            error?: unknown;
            errorMessages?: unknown;
            maxErrors?: unknown;
            name?: unknown;
            readonly?: unknown;
            rules?: unknown;
            modelValue?: unknown;
            density?: unknown;
            id?: unknown;
            appendIcon?: unknown;
            prependIcon?: unknown;
            hideDetails?: unknown;
            messages?: unknown;
            direction?: unknown;
            $children?: unknown;
            'v-slots'?: unknown;
        } & {
            error: boolean;
            messages: string | string[];
            density: "default" | "comfortable" | "compact" | null;
            disabled: boolean;
            readonly: boolean;
            errorMessages: string | string[];
            maxErrors: string | number;
            rules: ValidationRule[];
            direction: "horizontal" | "vertical";
        } & {
            id?: string | undefined;
            name?: string | undefined;
            $children?: vue.VNodeChild | ((args_0: VInputSlot) => vue.VNodeChild) | {
                default?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
                prepend?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
                append?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
                details?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            };
            "v-slots"?: {
                default?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
                prepend?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
                append?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
                details?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            } | undefined;
            modelValue?: any;
            prependIcon?: string | undefined;
            appendIcon?: string | undefined;
            hideDetails?: boolean | "auto" | undefined;
        }> & {
            "onUpdate:modelValue"?: ((val: any) => any) | undefined;
            "onClick:prepend"?: ((e: MouseEvent) => any) | undefined;
            "onClick:append"?: ((e: MouseEvent) => any) | undefined;
        }, {
            reset: () => void;
            resetValidation: () => void;
            validate: () => Promise<string[]>;
        }, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
            'click:prepend': (e: MouseEvent) => boolean;
            'click:append': (e: MouseEvent) => boolean;
            'update:modelValue': (val: any) => boolean;
        }, string, {
            error: boolean;
            messages: string | string[];
            density: "default" | "comfortable" | "compact" | null;
            disabled: boolean;
            readonly: boolean;
            errorMessages: string | string[];
            maxErrors: string | number;
            rules: ValidationRule[];
            direction: "horizontal" | "vertical";
        }> & {
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
            errorCaptured?: (((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void) | ((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void)[]) | undefined;
        };
        $forceUpdate: () => void;
        $nextTick: typeof nextTick;
        $watch(source: string | Function, cb: Function, options?: vue.WatchOptions<boolean> | undefined): vue.WatchStopHandle;
    } & Readonly<{
        disabled?: unknown;
        error?: unknown;
        errorMessages?: unknown;
        maxErrors?: unknown;
        name?: unknown;
        readonly?: unknown;
        rules?: unknown;
        modelValue?: unknown;
        density?: unknown;
        id?: unknown;
        appendIcon?: unknown;
        prependIcon?: unknown;
        hideDetails?: unknown;
        messages?: unknown;
        direction?: unknown;
        $children?: unknown;
        'v-slots'?: unknown;
    } & {
        error: boolean;
        messages: string | string[];
        density: "default" | "comfortable" | "compact" | null;
        disabled: boolean;
        readonly: boolean;
        errorMessages: string | string[];
        maxErrors: string | number;
        rules: ValidationRule[];
        direction: "horizontal" | "vertical";
    } & {
        id?: string | undefined;
        name?: string | undefined;
        $children?: vue.VNodeChild | ((args_0: VInputSlot) => vue.VNodeChild) | {
            default?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            prepend?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            append?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            details?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        };
        "v-slots"?: {
            default?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            prepend?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            append?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            details?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        } | undefined;
        modelValue?: any;
        prependIcon?: string | undefined;
        appendIcon?: string | undefined;
        hideDetails?: boolean | "auto" | undefined;
    }> & {
        "onUpdate:modelValue"?: ((val: any) => any) | undefined;
        "onClick:prepend"?: ((e: MouseEvent) => any) | undefined;
        "onClick:append"?: ((e: MouseEvent) => any) | undefined;
    } & vue.ShallowUnwrapRef<{
        reset: () => void;
        resetValidation: () => void;
        validate: () => Promise<string[]>;
    }> & {} & {} & vue.ComponentCustomProperties & {
        $slots: MakeSlots<{
            default: [VInputSlot];
            prepend: [VInputSlot];
            append: [VInputSlot];
            details: [VInputSlot];
        }>;
    }> & {} & {} & vue.ComponentCustomProperties;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & vue.ComponentOptionsBase<Readonly<{
    loading?: unknown;
    theme?: unknown;
    appendInnerIcon?: unknown;
    bgColor?: unknown;
    clearable?: unknown;
    clearIcon?: unknown;
    color?: unknown;
    label?: unknown;
    persistentClear?: unknown;
    prependInnerIcon?: unknown;
    reverse?: unknown;
    singleLine?: unknown;
    variant?: unknown;
    disabled?: unknown;
    error?: unknown;
    errorMessages?: unknown;
    maxErrors?: unknown;
    name?: unknown;
    readonly?: unknown;
    rules?: unknown;
    modelValue?: unknown;
    density?: unknown;
    id?: unknown;
    appendIcon?: unknown;
    prependIcon?: unknown;
    hideDetails?: unknown;
    messages?: unknown;
    direction?: unknown;
    autofocus?: unknown;
    counter?: unknown;
    counterValue?: unknown;
    hint?: unknown;
    persistentHint?: unknown;
    prefix?: unknown;
    placeholder?: unknown;
    persistentPlaceholder?: unknown;
    persistentCounter?: unknown;
    suffix?: unknown;
    type?: unknown;
    $children?: unknown;
    'v-slots'?: unknown;
} & {
    error: boolean;
    reverse: boolean;
    messages: string | string[];
    type: string;
    loading: boolean;
    density: "default" | "comfortable" | "compact" | null;
    disabled: boolean;
    variant: "filled" | "outlined" | "plain" | "contained" | "underlined";
    readonly: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    direction: "horizontal" | "vertical";
    clearable: boolean;
    clearIcon: string;
    persistentClear: boolean;
    singleLine: boolean;
    persistentHint: boolean;
    persistentPlaceholder: boolean;
    autofocus: boolean;
    persistentCounter: boolean;
} & {
    id?: string | undefined;
    name?: string | undefined;
    theme?: string | undefined;
    label?: string | undefined;
    counter?: string | number | true | undefined;
    $children?: vue.VNodeChild | (((args_0: VInputSlot) => vue.VNodeChild) & ((args_0: VFieldSlot) => vue.VNodeChild)) | {
        default?: (((args_0: VInputSlot) => vue.VNodeChild) & ((args_0: VFieldSlot) => vue.VNodeChild)) | undefined;
        prepend?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        append?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        details?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        clear?: (() => vue.VNodeChild) | undefined;
        prependInner?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        appendInner?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        label?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        loader?: ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
    };
    placeholder?: string | undefined;
    "v-slots"?: {
        default?: false | (((args_0: VInputSlot) => vue.VNodeChild) & ((args_0: VFieldSlot) => vue.VNodeChild)) | undefined;
        prepend?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        append?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        details?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        clear?: false | (() => vue.VNodeChild) | undefined;
        prependInner?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        appendInner?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        label?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        loader?: false | ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
    } | undefined;
    color?: string | undefined;
    modelValue?: any;
    prependIcon?: string | undefined;
    appendIcon?: string | undefined;
    bgColor?: string | undefined;
    hideDetails?: boolean | "auto" | undefined;
    appendInnerIcon?: string | undefined;
    prependInnerIcon?: string | undefined;
    hint?: string | undefined;
    prefix?: string | undefined;
    suffix?: string | undefined;
    counterValue?: ((value: any) => number) | undefined;
}> & {
    "onUpdate:modelValue"?: ((val: string) => any) | undefined;
    "onClick:prepend"?: ((e: MouseEvent) => any) | undefined;
    "onClick:append"?: ((e: MouseEvent) => any) | undefined;
    "onClick:clear"?: ((e: MouseEvent) => any) | undefined;
    "onClick:prepend-inner"?: ((e: MouseEvent) => any) | undefined;
    "onClick:append-inner"?: ((e: MouseEvent) => any) | undefined;
    "onClick:control"?: ((e: MouseEvent) => any) | undefined;
}, HTMLInputElement & {
    $: vue.ComponentInternalInstance;
    $data: {};
    $props: Partial<{
        error: boolean;
        messages: string | string[];
        density: "default" | "comfortable" | "compact" | null;
        disabled: boolean;
        readonly: boolean;
        errorMessages: string | string[];
        maxErrors: string | number;
        rules: ValidationRule[];
        direction: "horizontal" | "vertical";
    }> & Omit<Readonly<{
        disabled?: unknown;
        error?: unknown;
        errorMessages?: unknown;
        maxErrors?: unknown;
        name?: unknown;
        readonly?: unknown;
        rules?: unknown;
        modelValue?: unknown;
        density?: unknown;
        id?: unknown;
        appendIcon?: unknown;
        prependIcon?: unknown;
        hideDetails?: unknown;
        messages?: unknown;
        direction?: unknown;
        $children?: unknown;
        'v-slots'?: unknown;
    } & {
        error: boolean;
        messages: string | string[];
        density: "default" | "comfortable" | "compact" | null;
        disabled: boolean;
        readonly: boolean;
        errorMessages: string | string[];
        maxErrors: string | number;
        rules: ValidationRule[];
        direction: "horizontal" | "vertical";
    } & {
        id?: string | undefined;
        name?: string | undefined;
        $children?: vue.VNodeChild | ((args_0: VInputSlot) => vue.VNodeChild) | {
            default?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            prepend?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            append?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            details?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        };
        "v-slots"?: {
            default?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            prepend?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            append?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            details?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        } | undefined;
        modelValue?: any;
        prependIcon?: string | undefined;
        appendIcon?: string | undefined;
        hideDetails?: boolean | "auto" | undefined;
    }> & {
        "onUpdate:modelValue"?: ((val: any) => any) | undefined;
        "onClick:prepend"?: ((e: MouseEvent) => any) | undefined;
        "onClick:append"?: ((e: MouseEvent) => any) | undefined;
    } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "error" | "messages" | "density" | "disabled" | "readonly" | "errorMessages" | "maxErrors" | "rules" | "direction">;
    $attrs: {
        [x: string]: unknown;
    };
    $refs: {
        [x: string]: unknown;
    };
    $slots: Readonly<{
        [name: string]: vue.Slot | undefined;
    }>;
    $root: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
    $parent: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
    $emit: ((event: "update:modelValue", val: any) => void) & ((event: "click:prepend", e: MouseEvent) => void) & ((event: "click:append", e: MouseEvent) => void);
    $el: any;
    $options: vue.ComponentOptionsBase<Readonly<{
        disabled?: unknown;
        error?: unknown;
        errorMessages?: unknown;
        maxErrors?: unknown;
        name?: unknown;
        readonly?: unknown;
        rules?: unknown;
        modelValue?: unknown;
        density?: unknown;
        id?: unknown;
        appendIcon?: unknown;
        prependIcon?: unknown;
        hideDetails?: unknown;
        messages?: unknown;
        direction?: unknown;
        $children?: unknown;
        'v-slots'?: unknown;
    } & {
        error: boolean;
        messages: string | string[];
        density: "default" | "comfortable" | "compact" | null;
        disabled: boolean;
        readonly: boolean;
        errorMessages: string | string[];
        maxErrors: string | number;
        rules: ValidationRule[];
        direction: "horizontal" | "vertical";
    } & {
        id?: string | undefined;
        name?: string | undefined;
        $children?: vue.VNodeChild | ((args_0: VInputSlot) => vue.VNodeChild) | {
            default?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            prepend?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            append?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            details?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        };
        "v-slots"?: {
            default?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            prepend?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            append?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            details?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        } | undefined;
        modelValue?: any;
        prependIcon?: string | undefined;
        appendIcon?: string | undefined;
        hideDetails?: boolean | "auto" | undefined;
    }> & {
        "onUpdate:modelValue"?: ((val: any) => any) | undefined;
        "onClick:prepend"?: ((e: MouseEvent) => any) | undefined;
        "onClick:append"?: ((e: MouseEvent) => any) | undefined;
    }, {
        reset: () => void;
        resetValidation: () => void;
        validate: () => Promise<string[]>;
    }, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
        'click:prepend': (e: MouseEvent) => boolean;
        'click:append': (e: MouseEvent) => boolean;
        'update:modelValue': (val: any) => boolean;
    }, string, {
        error: boolean;
        messages: string | string[];
        density: "default" | "comfortable" | "compact" | null;
        disabled: boolean;
        readonly: boolean;
        errorMessages: string | string[];
        maxErrors: string | number;
        rules: ValidationRule[];
        direction: "horizontal" | "vertical";
    }> & {
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
        errorCaptured?: (((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void) | ((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void)[]) | undefined;
    };
    $forceUpdate: () => void;
    $nextTick: typeof nextTick;
    $watch(source: string | Function, cb: Function, options?: vue.WatchOptions<boolean> | undefined): vue.WatchStopHandle;
} & Readonly<{
    disabled?: unknown;
    error?: unknown;
    errorMessages?: unknown;
    maxErrors?: unknown;
    name?: unknown;
    readonly?: unknown;
    rules?: unknown;
    modelValue?: unknown;
    density?: unknown;
    id?: unknown;
    appendIcon?: unknown;
    prependIcon?: unknown;
    hideDetails?: unknown;
    messages?: unknown;
    direction?: unknown;
    $children?: unknown;
    'v-slots'?: unknown;
} & {
    error: boolean;
    messages: string | string[];
    density: "default" | "comfortable" | "compact" | null;
    disabled: boolean;
    readonly: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    direction: "horizontal" | "vertical";
} & {
    id?: string | undefined;
    name?: string | undefined;
    $children?: vue.VNodeChild | ((args_0: VInputSlot) => vue.VNodeChild) | {
        default?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        prepend?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        append?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        details?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    };
    "v-slots"?: {
        default?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        prepend?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        append?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        details?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
    } | undefined;
    modelValue?: any;
    prependIcon?: string | undefined;
    appendIcon?: string | undefined;
    hideDetails?: boolean | "auto" | undefined;
}> & {
    "onUpdate:modelValue"?: ((val: any) => any) | undefined;
    "onClick:prepend"?: ((e: MouseEvent) => any) | undefined;
    "onClick:append"?: ((e: MouseEvent) => any) | undefined;
} & vue.ShallowUnwrapRef<{
    reset: () => void;
    resetValidation: () => void;
    validate: () => Promise<string[]>;
}> & {} & {} & vue.ComponentCustomProperties & {
    $slots: MakeSlots<{
        default: [VInputSlot];
        prepend: [VInputSlot];
        append: [VInputSlot];
        details: [VInputSlot];
    }>;
}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'click:append': (e: MouseEvent) => boolean;
    'click:append-inner': (e: MouseEvent) => boolean;
    'click:clear': (e: MouseEvent) => boolean;
    'click:control': (e: MouseEvent) => boolean;
    'click:prepend': (e: MouseEvent) => boolean;
    'click:prepend-inner': (e: MouseEvent) => boolean;
    'update:modelValue': (val: string) => boolean;
}, string, {
    error: boolean;
    reverse: boolean;
    messages: string | string[];
    type: string;
    loading: boolean;
    density: "default" | "comfortable" | "compact" | null;
    disabled: boolean;
    variant: "filled" | "outlined" | "plain" | "contained" | "underlined";
    readonly: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    direction: "horizontal" | "vertical";
    clearable: boolean;
    clearIcon: string;
    persistentClear: boolean;
    singleLine: boolean;
    persistentHint: boolean;
    persistentPlaceholder: boolean;
    autofocus: boolean;
    persistentCounter: boolean;
}> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & (new <T>() => {
    $slots: VInputSlots & VFieldSlots;
});
declare type VTextField = InstanceType<typeof VTextField>;

declare const VThemeProvider: vue.DefineComponent<{
    tag: {
        type: StringConstructor;
        default: string;
    };
    theme: StringConstructor;
    withBackground: BooleanConstructor;
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>[] | JSX.Element | undefined, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    tag?: unknown;
    theme?: unknown;
    withBackground?: unknown;
} & {
    tag: string;
    withBackground: boolean;
} & {
    theme?: string | undefined;
}>, {
    tag: string;
    withBackground: boolean;
}>;

declare type TimelineDirection = 'vertical' | 'horizontal';
declare type TimelineSide = 'before' | 'after' | undefined;
declare const VTimeline: vue.DefineComponent<{
    theme: StringConstructor;
    tag: {
        type: StringConstructor;
        default: string;
    };
    density: {
        type: vue.PropType<"default" | "comfortable" | "compact" | null>;
        default: string;
        validator: (v: any) => boolean;
    };
    direction: Prop<TimelineDirection, TimelineDirection>;
    side: Prop<TimelineSide, TimelineSide>;
    lineInset: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    lineThickness: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    lineColor: StringConstructor;
    truncateLine: {
        type: StringConstructor;
        default: string;
        validator: (v: any) => boolean;
    };
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    theme?: unknown;
    tag?: unknown;
    density?: unknown;
    direction?: unknown;
    side?: unknown;
    lineInset?: unknown;
    lineThickness?: unknown;
    lineColor?: unknown;
    truncateLine?: unknown;
} & {
    tag: string;
    density: "default" | "comfortable" | "compact" | null;
    lineInset: string | number;
    lineThickness: string | number;
    truncateLine: string;
} & {
    theme?: string | undefined;
    direction?: TimelineDirection | undefined;
    side?: TimelineSide;
    lineColor?: string | undefined;
}>, {
    tag: string;
    density: "default" | "comfortable" | "compact" | null;
    lineInset: string | number;
    lineThickness: string | number;
    truncateLine: string;
}>;

declare const VTimelineItem: vue.DefineComponent<{
    height: (StringConstructor | NumberConstructor)[];
    maxHeight: (StringConstructor | NumberConstructor)[];
    maxWidth: (StringConstructor | NumberConstructor)[];
    minHeight: (StringConstructor | NumberConstructor)[];
    minWidth: (StringConstructor | NumberConstructor)[];
    width: (StringConstructor | NumberConstructor)[];
    tag: {
        type: StringConstructor;
        default: string;
    };
    size: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    elevation: {
        type: (StringConstructor | NumberConstructor)[];
        validator(v: any): boolean;
    };
    rounded: {
        type: (StringConstructor | NumberConstructor | BooleanConstructor)[];
        default: undefined;
    };
    dotColor: StringConstructor;
    fillDot: BooleanConstructor;
    hideDot: BooleanConstructor;
    hideOpposite: {
        type: BooleanConstructor;
        default: undefined;
    };
    icon: StringConstructor;
    iconColor: StringConstructor;
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    height?: unknown;
    maxHeight?: unknown;
    maxWidth?: unknown;
    minHeight?: unknown;
    minWidth?: unknown;
    width?: unknown;
    tag?: unknown;
    size?: unknown;
    elevation?: unknown;
    rounded?: unknown;
    dotColor?: unknown;
    fillDot?: unknown;
    hideDot?: unknown;
    hideOpposite?: unknown;
    icon?: unknown;
    iconColor?: unknown;
} & {
    tag: string;
    size: string | number;
    hideDot: boolean;
    fillDot: boolean;
} & {
    width?: string | number | undefined;
    height?: string | number | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
    elevation?: string | number | undefined;
    rounded?: string | number | boolean | undefined;
    icon?: string | undefined;
    iconColor?: string | undefined;
    dotColor?: string | undefined;
    hideOpposite?: boolean | undefined;
}>, {
    tag: string;
    rounded: string | number | boolean;
    size: string | number;
    hideDot: boolean;
    fillDot: boolean;
    hideOpposite: boolean;
}>;

declare const VToolbar: {
    new (...args: any[]): {
        $: vue.ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            height: string | number;
            flat: boolean;
            tag: string;
            absolute: boolean;
            density: "default" | "comfortable" | "compact" | "prominent" | null;
            rounded: string | number | boolean;
            collapse: boolean;
            extensionHeight: string | number;
            floating: boolean;
            extended: boolean;
        }> & Omit<Readonly<{
            theme?: unknown;
            tag?: unknown;
            rounded?: unknown;
            elevation?: unknown;
            border?: unknown;
            absolute?: unknown;
            collapse?: unknown;
            color?: unknown;
            density?: unknown;
            extended?: unknown;
            extensionHeight?: unknown;
            flat?: unknown;
            floating?: unknown;
            height?: unknown;
            image?: unknown;
            title?: unknown;
            $children?: unknown;
            'v-slots'?: unknown;
        } & {
            height: string | number;
            flat: boolean;
            tag: string;
            absolute: boolean;
            density: "default" | "comfortable" | "compact" | "prominent" | null;
            collapse: boolean;
            extensionHeight: string | number;
            floating: boolean;
            extended: boolean;
        } & {
            theme?: string | undefined;
            title?: string | undefined;
            image?: string | undefined;
            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                default?: (() => vue.VNodeChild) | undefined;
                image?: ((args_0: {
                    image: string;
                }) => vue.VNodeChild) | undefined;
                prepend?: (() => vue.VNodeChild) | undefined;
                append?: (() => vue.VNodeChild) | undefined;
                title?: (() => vue.VNodeChild) | undefined;
                extension?: (() => vue.VNodeChild) | undefined;
            };
            "v-slots"?: {
                default?: false | (() => vue.VNodeChild) | undefined;
                image?: false | ((args_0: {
                    image: string;
                }) => vue.VNodeChild) | undefined;
                prepend?: false | (() => vue.VNodeChild) | undefined;
                append?: false | (() => vue.VNodeChild) | undefined;
                title?: false | (() => vue.VNodeChild) | undefined;
                extension?: false | (() => vue.VNodeChild) | undefined;
            } | undefined;
            border?: string | number | boolean | undefined;
            elevation?: string | number | undefined;
            rounded?: string | number | boolean | undefined;
            color?: string | undefined;
        }> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "height" | "flat" | "tag" | "absolute" | "density" | "rounded" | "collapse" | "extensionHeight" | "floating" | "extended">;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            [name: string]: vue.Slot | undefined;
        }>;
        $root: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
        $parent: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
        $emit: (event: string, ...args: any[]) => void;
        $el: any;
        $options: vue.ComponentOptionsBase<Readonly<{
            theme?: unknown;
            tag?: unknown;
            rounded?: unknown;
            elevation?: unknown;
            border?: unknown;
            absolute?: unknown;
            collapse?: unknown;
            color?: unknown;
            density?: unknown;
            extended?: unknown;
            extensionHeight?: unknown;
            flat?: unknown;
            floating?: unknown;
            height?: unknown;
            image?: unknown;
            title?: unknown;
            $children?: unknown;
            'v-slots'?: unknown;
        } & {
            height: string | number;
            flat: boolean;
            tag: string;
            absolute: boolean;
            density: "default" | "comfortable" | "compact" | "prominent" | null;
            collapse: boolean;
            extensionHeight: string | number;
            floating: boolean;
            extended: boolean;
        } & {
            theme?: string | undefined;
            title?: string | undefined;
            image?: string | undefined;
            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                default?: (() => vue.VNodeChild) | undefined;
                image?: ((args_0: {
                    image: string;
                }) => vue.VNodeChild) | undefined;
                prepend?: (() => vue.VNodeChild) | undefined;
                append?: (() => vue.VNodeChild) | undefined;
                title?: (() => vue.VNodeChild) | undefined;
                extension?: (() => vue.VNodeChild) | undefined;
            };
            "v-slots"?: {
                default?: false | (() => vue.VNodeChild) | undefined;
                image?: false | ((args_0: {
                    image: string;
                }) => vue.VNodeChild) | undefined;
                prepend?: false | (() => vue.VNodeChild) | undefined;
                append?: false | (() => vue.VNodeChild) | undefined;
                title?: false | (() => vue.VNodeChild) | undefined;
                extension?: false | (() => vue.VNodeChild) | undefined;
            } | undefined;
            border?: string | number | boolean | undefined;
            elevation?: string | number | undefined;
            rounded?: string | number | boolean | undefined;
            color?: string | undefined;
        }>, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, {
            height: string | number;
            flat: boolean;
            tag: string;
            absolute: boolean;
            density: "default" | "comfortable" | "compact" | "prominent" | null;
            rounded: string | number | boolean;
            collapse: boolean;
            extensionHeight: string | number;
            floating: boolean;
            extended: boolean;
        }> & {
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
            errorCaptured?: (((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void) | ((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void)[]) | undefined;
        };
        $forceUpdate: () => void;
        $nextTick: typeof vue.nextTick;
        $watch(source: string | Function, cb: Function, options?: vue.WatchOptions<boolean> | undefined): vue.WatchStopHandle;
    } & Readonly<{
        theme?: unknown;
        tag?: unknown;
        rounded?: unknown;
        elevation?: unknown;
        border?: unknown;
        absolute?: unknown;
        collapse?: unknown;
        color?: unknown;
        density?: unknown;
        extended?: unknown;
        extensionHeight?: unknown;
        flat?: unknown;
        floating?: unknown;
        height?: unknown;
        image?: unknown;
        title?: unknown;
        $children?: unknown;
        'v-slots'?: unknown;
    } & {
        height: string | number;
        flat: boolean;
        tag: string;
        absolute: boolean;
        density: "default" | "comfortable" | "compact" | "prominent" | null;
        collapse: boolean;
        extensionHeight: string | number;
        floating: boolean;
        extended: boolean;
    } & {
        theme?: string | undefined;
        title?: string | undefined;
        image?: string | undefined;
        $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
            default?: (() => vue.VNodeChild) | undefined;
            image?: ((args_0: {
                image: string;
            }) => vue.VNodeChild) | undefined;
            prepend?: (() => vue.VNodeChild) | undefined;
            append?: (() => vue.VNodeChild) | undefined;
            title?: (() => vue.VNodeChild) | undefined;
            extension?: (() => vue.VNodeChild) | undefined;
        };
        "v-slots"?: {
            default?: false | (() => vue.VNodeChild) | undefined;
            image?: false | ((args_0: {
                image: string;
            }) => vue.VNodeChild) | undefined;
            prepend?: false | (() => vue.VNodeChild) | undefined;
            append?: false | (() => vue.VNodeChild) | undefined;
            title?: false | (() => vue.VNodeChild) | undefined;
            extension?: false | (() => vue.VNodeChild) | undefined;
        } | undefined;
        border?: string | number | boolean | undefined;
        elevation?: string | number | undefined;
        rounded?: string | number | boolean | undefined;
        color?: string | undefined;
    }> & vue.ShallowUnwrapRef<{}> & {} & {} & vue.ComponentCustomProperties;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & vue.ComponentOptionsBase<Readonly<{
    theme?: unknown;
    tag?: unknown;
    rounded?: unknown;
    elevation?: unknown;
    border?: unknown;
    absolute?: unknown;
    collapse?: unknown;
    color?: unknown;
    density?: unknown;
    extended?: unknown;
    extensionHeight?: unknown;
    flat?: unknown;
    floating?: unknown;
    height?: unknown;
    image?: unknown;
    title?: unknown;
    $children?: unknown;
    'v-slots'?: unknown;
} & {
    height: string | number;
    flat: boolean;
    tag: string;
    absolute: boolean;
    density: "default" | "comfortable" | "compact" | "prominent" | null;
    collapse: boolean;
    extensionHeight: string | number;
    floating: boolean;
    extended: boolean;
} & {
    theme?: string | undefined;
    title?: string | undefined;
    image?: string | undefined;
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
        image?: ((args_0: {
            image: string;
        }) => vue.VNodeChild) | undefined;
        prepend?: (() => vue.VNodeChild) | undefined;
        append?: (() => vue.VNodeChild) | undefined;
        title?: (() => vue.VNodeChild) | undefined;
        extension?: (() => vue.VNodeChild) | undefined;
    };
    "v-slots"?: {
        default?: false | (() => vue.VNodeChild) | undefined;
        image?: false | ((args_0: {
            image: string;
        }) => vue.VNodeChild) | undefined;
        prepend?: false | (() => vue.VNodeChild) | undefined;
        append?: false | (() => vue.VNodeChild) | undefined;
        title?: false | (() => vue.VNodeChild) | undefined;
        extension?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
    border?: string | number | boolean | undefined;
    elevation?: string | number | undefined;
    rounded?: string | number | boolean | undefined;
    color?: string | undefined;
}>, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, {
    height: string | number;
    flat: boolean;
    tag: string;
    absolute: boolean;
    density: "default" | "comfortable" | "compact" | "prominent" | null;
    rounded: string | number | boolean;
    collapse: boolean;
    extensionHeight: string | number;
    floating: boolean;
    extended: boolean;
}> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & (new () => {
    $slots: MakeSlots<{
        default: [];
        image: [{
            image: string;
        }];
        prepend: [];
        append: [];
        title: [];
        extension: [];
    }>;
});
declare type VToolbar = InstanceType<typeof VToolbar>;

declare const VToolbarTitle: {
    new (...args: any[]): {
        $: vue.ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            tag: string;
        }> & Omit<Readonly<{
            tag?: unknown;
            text?: unknown;
            $children?: unknown;
            'v-slots'?: unknown;
        } & {
            tag: string;
        } & {
            text?: string | undefined;
            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                default?: (() => vue.VNodeChild) | undefined;
                text?: (() => vue.VNodeChild) | undefined;
            };
            "v-slots"?: {
                default?: false | (() => vue.VNodeChild) | undefined;
                text?: false | (() => vue.VNodeChild) | undefined;
            } | undefined;
        }> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "tag">;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            [name: string]: vue.Slot | undefined;
        }>;
        $root: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
        $parent: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
        $emit: (event: string, ...args: any[]) => void;
        $el: any;
        $options: vue.ComponentOptionsBase<Readonly<{
            tag?: unknown;
            text?: unknown;
            $children?: unknown;
            'v-slots'?: unknown;
        } & {
            tag: string;
        } & {
            text?: string | undefined;
            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                default?: (() => vue.VNodeChild) | undefined;
                text?: (() => vue.VNodeChild) | undefined;
            };
            "v-slots"?: {
                default?: false | (() => vue.VNodeChild) | undefined;
                text?: false | (() => vue.VNodeChild) | undefined;
            } | undefined;
        }>, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, {
            tag: string;
        }> & {
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
            errorCaptured?: (((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void) | ((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void)[]) | undefined;
        };
        $forceUpdate: () => void;
        $nextTick: typeof vue.nextTick;
        $watch(source: string | Function, cb: Function, options?: vue.WatchOptions<boolean> | undefined): vue.WatchStopHandle;
    } & Readonly<{
        tag?: unknown;
        text?: unknown;
        $children?: unknown;
        'v-slots'?: unknown;
    } & {
        tag: string;
    } & {
        text?: string | undefined;
        $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
            default?: (() => vue.VNodeChild) | undefined;
            text?: (() => vue.VNodeChild) | undefined;
        };
        "v-slots"?: {
            default?: false | (() => vue.VNodeChild) | undefined;
            text?: false | (() => vue.VNodeChild) | undefined;
        } | undefined;
    }> & vue.ShallowUnwrapRef<{}> & {} & {} & vue.ComponentCustomProperties;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & vue.ComponentOptionsBase<Readonly<{
    tag?: unknown;
    text?: unknown;
    $children?: unknown;
    'v-slots'?: unknown;
} & {
    tag: string;
} & {
    text?: string | undefined;
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
        text?: (() => vue.VNodeChild) | undefined;
    };
    "v-slots"?: {
        default?: false | (() => vue.VNodeChild) | undefined;
        text?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
}>, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, {
    tag: string;
}> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & (new () => {
    $slots: MakeSlots<{
        default: [];
        text: [];
    }>;
});
declare type VToolbarTitle = InstanceType<typeof VToolbarTitle>;

declare const VToolbarItems: vue.DefineComponent<{
    color: StringConstructor;
    textColor: StringConstructor;
    variant: Omit<{
        type: vue.PropType<"text" | "outlined" | "plain" | "contained" | "contained-flat" | "contained-text">;
        default: string;
        validator: (v: any) => boolean;
    }, "default" | "type"> & {
        type: vue.PropType<string>;
        default: string;
    };
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>[] | undefined, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    color?: unknown;
    textColor?: unknown;
    variant?: unknown;
} & {
    variant: string;
} & {
    color?: string | undefined;
    textColor?: string | undefined;
}>, {
    variant: string;
}>;
declare type VToolbarItems = InstanceType<typeof VToolbarItems>;

declare const VTooltip: {
    new (...args: any[]): {
        $: vue.ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            anchor: Anchor;
            transition: string | false | (vue.TransitionProps & {
                component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
            });
            modelValue: boolean;
            origin: "auto" | Anchor | "overlap";
        }> & Omit<Readonly<{
            transition?: unknown;
            id?: unknown;
            modelValue?: unknown;
            text?: unknown;
            anchor?: unknown;
            origin?: unknown;
            $children?: unknown;
            'v-slots'?: unknown;
        } & {
            anchor: Anchor;
            transition: string | false | (vue.TransitionProps & {
                component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
            });
            modelValue: boolean;
            origin: "auto" | Anchor | "overlap";
        } & {
            id?: string | undefined;
            text?: string | undefined;
            $children?: vue.VNodeChild | ((args_0: {
                isActive: vue.Ref<boolean>;
            }) => vue.VNodeChild) | {
                default?: ((args_0: {
                    isActive: vue.Ref<boolean>;
                }) => vue.VNodeChild) | undefined;
                activator?: ((args_0: {
                    isActive: boolean;
                    props: Record<string, any>;
                }) => vue.VNodeChild) | undefined;
            };
            "v-slots"?: {
                default?: false | ((args_0: {
                    isActive: vue.Ref<boolean>;
                }) => vue.VNodeChild) | undefined;
                activator?: false | ((args_0: {
                    isActive: boolean;
                    props: Record<string, any>;
                }) => vue.VNodeChild) | undefined;
            } | undefined;
        }> & {
            "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
        } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "anchor" | "transition" | "modelValue" | "origin">;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            [name: string]: vue.Slot | undefined;
        }>;
        $root: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
        $parent: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
        $emit: (event: "update:modelValue", value: boolean) => void;
        $el: any;
        $options: vue.ComponentOptionsBase<Readonly<{
            transition?: unknown;
            id?: unknown;
            modelValue?: unknown;
            text?: unknown;
            anchor?: unknown;
            origin?: unknown;
            $children?: unknown;
            'v-slots'?: unknown;
        } & {
            anchor: Anchor;
            transition: string | false | (vue.TransitionProps & {
                component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
            });
            modelValue: boolean;
            origin: "auto" | Anchor | "overlap";
        } & {
            id?: string | undefined;
            text?: string | undefined;
            $children?: vue.VNodeChild | ((args_0: {
                isActive: vue.Ref<boolean>;
            }) => vue.VNodeChild) | {
                default?: ((args_0: {
                    isActive: vue.Ref<boolean>;
                }) => vue.VNodeChild) | undefined;
                activator?: ((args_0: {
                    isActive: boolean;
                    props: Record<string, any>;
                }) => vue.VNodeChild) | undefined;
            };
            "v-slots"?: {
                default?: false | ((args_0: {
                    isActive: vue.Ref<boolean>;
                }) => vue.VNodeChild) | undefined;
                activator?: false | ((args_0: {
                    isActive: boolean;
                    props: Record<string, any>;
                }) => vue.VNodeChild) | undefined;
            } | undefined;
        }> & {
            "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
        }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
            'update:modelValue': (value: boolean) => boolean;
        }, string, {
            anchor: Anchor;
            transition: string | false | (vue.TransitionProps & {
                component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
            });
            modelValue: boolean;
            origin: "auto" | Anchor | "overlap";
        }> & {
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
            errorCaptured?: (((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void) | ((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void)[]) | undefined;
        };
        $forceUpdate: () => void;
        $nextTick: typeof vue.nextTick;
        $watch(source: string | Function, cb: Function, options?: vue.WatchOptions<boolean> | undefined): vue.WatchStopHandle;
    } & Readonly<{
        transition?: unknown;
        id?: unknown;
        modelValue?: unknown;
        text?: unknown;
        anchor?: unknown;
        origin?: unknown;
        $children?: unknown;
        'v-slots'?: unknown;
    } & {
        anchor: Anchor;
        transition: string | false | (vue.TransitionProps & {
            component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
        });
        modelValue: boolean;
        origin: "auto" | Anchor | "overlap";
    } & {
        id?: string | undefined;
        text?: string | undefined;
        $children?: vue.VNodeChild | ((args_0: {
            isActive: vue.Ref<boolean>;
        }) => vue.VNodeChild) | {
            default?: ((args_0: {
                isActive: vue.Ref<boolean>;
            }) => vue.VNodeChild) | undefined;
            activator?: ((args_0: {
                isActive: boolean;
                props: Record<string, any>;
            }) => vue.VNodeChild) | undefined;
        };
        "v-slots"?: {
            default?: false | ((args_0: {
                isActive: vue.Ref<boolean>;
            }) => vue.VNodeChild) | undefined;
            activator?: false | ((args_0: {
                isActive: boolean;
                props: Record<string, any>;
            }) => vue.VNodeChild) | undefined;
        } | undefined;
    }> & {
        "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
    } & vue.ShallowUnwrapRef<() => JSX.Element> & {} & {} & vue.ComponentCustomProperties;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & vue.ComponentOptionsBase<Readonly<{
    transition?: unknown;
    id?: unknown;
    modelValue?: unknown;
    text?: unknown;
    anchor?: unknown;
    origin?: unknown;
    $children?: unknown;
    'v-slots'?: unknown;
} & {
    anchor: Anchor;
    transition: string | false | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    });
    modelValue: boolean;
    origin: "auto" | Anchor | "overlap";
} & {
    id?: string | undefined;
    text?: string | undefined;
    $children?: vue.VNodeChild | ((args_0: {
        isActive: vue.Ref<boolean>;
    }) => vue.VNodeChild) | {
        default?: ((args_0: {
            isActive: vue.Ref<boolean>;
        }) => vue.VNodeChild) | undefined;
        activator?: ((args_0: {
            isActive: boolean;
            props: Record<string, any>;
        }) => vue.VNodeChild) | undefined;
    };
    "v-slots"?: {
        default?: false | ((args_0: {
            isActive: vue.Ref<boolean>;
        }) => vue.VNodeChild) | undefined;
        activator?: false | ((args_0: {
            isActive: boolean;
            props: Record<string, any>;
        }) => vue.VNodeChild) | undefined;
    } | undefined;
}> & {
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (value: boolean) => boolean;
}, string, {
    anchor: Anchor;
    transition: string | false | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    });
    modelValue: boolean;
    origin: "auto" | Anchor | "overlap";
}> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & (new () => {
    $slots: OverlaySlots;
});
declare type VTooltip = InstanceType<typeof VTooltip>;

declare const VValidation: vue.DefineComponent<{
    disabled: BooleanConstructor;
    error: BooleanConstructor;
    errorMessages: {
        type: vue.PropType<string | string[]>;
        default: () => never[];
    };
    maxErrors: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    name: StringConstructor;
    readonly: BooleanConstructor;
    rules: {
        type: vue.PropType<ValidationRule[]>;
        default: () => never[];
    };
    modelValue: null;
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>[] | undefined, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (val: any) => true;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    disabled?: unknown;
    error?: unknown;
    errorMessages?: unknown;
    maxErrors?: unknown;
    name?: unknown;
    readonly?: unknown;
    rules?: unknown;
    modelValue?: unknown;
} & {
    error: boolean;
    disabled: boolean;
    readonly: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
} & {
    name?: string | undefined;
    modelValue?: any;
}> & {
    "onUpdate:modelValue"?: ((val: any) => any) | undefined;
}, {
    error: boolean;
    disabled: boolean;
    readonly: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
}>;

interface TouchHandlers {
    start?: (wrapperEvent: {
        originalEvent: TouchEvent;
    } & TouchWrapper) => void;
    end?: (wrapperEvent: {
        originalEvent: TouchEvent;
    } & TouchWrapper) => void;
    move?: (wrapperEvent: {
        originalEvent: TouchEvent;
    } & TouchWrapper) => void;
    left?: (wrapper: TouchWrapper) => void;
    right?: (wrapper: TouchWrapper) => void;
    up?: (wrapper: TouchWrapper) => void;
    down?: (wrapper: TouchWrapper) => void;
}
interface TouchWrapper extends TouchHandlers {
    touchstartX: number;
    touchstartY: number;
    touchmoveX: number;
    touchmoveY: number;
    touchendX: number;
    touchendY: number;
    offsetX: number;
    offsetY: number;
}
declare const Touch: ObjectDirective;

declare const VWindow: vue.DefineComponent<{
    theme: StringConstructor;
    tag: {
        type: StringConstructor;
        default: string;
    };
    continuous: BooleanConstructor;
    nextIcon: {
        type: (StringConstructor | BooleanConstructor)[];
        default: string;
    };
    prevIcon: {
        type: (StringConstructor | BooleanConstructor)[];
        default: string;
    };
    reverse: BooleanConstructor;
    showArrows: {
        type: (StringConstructor | BooleanConstructor)[];
        validator: (v: any) => boolean;
    };
    touch: {
        type: PropType<boolean | TouchHandlers>;
        default: undefined;
    };
    direction: {
        type: StringConstructor;
        default: string;
    };
    modelValue: null;
    disabled: BooleanConstructor;
    selectedClass: {
        type: StringConstructor;
        default: string;
    };
    mandatory: {
        default: "force";
    };
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (v: any) => true;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    theme?: unknown;
    tag?: unknown;
    continuous?: unknown;
    nextIcon?: unknown;
    prevIcon?: unknown;
    reverse?: unknown;
    showArrows?: unknown;
    touch?: unknown;
    direction?: unknown;
    modelValue?: unknown;
    disabled?: unknown;
    selectedClass?: unknown;
    mandatory?: unknown;
} & {
    reverse: boolean;
    tag: string;
    mandatory: "force";
    disabled: boolean;
    selectedClass: string;
    direction: string;
    prevIcon: string | boolean;
    nextIcon: string | boolean;
    continuous: boolean;
} & {
    theme?: string | undefined;
    modelValue?: any;
    touch?: boolean | TouchHandlers | undefined;
    showArrows?: string | boolean | undefined;
}> & {
    "onUpdate:modelValue"?: ((v: any) => any) | undefined;
}, {
    reverse: boolean;
    tag: string;
    mandatory: "force";
    touch: boolean | TouchHandlers;
    disabled: boolean;
    selectedClass: string;
    direction: string;
    prevIcon: string | boolean;
    nextIcon: string | boolean;
    continuous: boolean;
}>;

declare const VWindowItem: vue.DefineComponent<{
    value: null;
    disabled: BooleanConstructor;
    selectedClass: StringConstructor;
    eager: BooleanConstructor;
    reverseTransition: {
        type: (StringConstructor | BooleanConstructor)[];
        default: undefined;
    };
    transition: {
        type: (StringConstructor | BooleanConstructor)[];
        default: undefined;
    };
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    value?: unknown;
    disabled?: unknown;
    selectedClass?: unknown;
    eager?: unknown;
    reverseTransition?: unknown;
    transition?: unknown;
} & {
    eager: boolean;
    disabled: boolean;
} & {
    value?: any;
    transition?: string | boolean | undefined;
    selectedClass?: string | undefined;
    reverseTransition?: string | boolean | undefined;
}>, {
    transition: string | boolean;
    eager: boolean;
    disabled: boolean;
    reverseTransition: string | boolean;
}>;

declare const VDialogTransition: vue.DefineComponent<{
    target: PropType<HTMLElement>;
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    target?: unknown;
} & {} & {
    target?: HTMLElement | undefined;
}>, {}>;

declare const VCarouselTransition: vue.DefineComponent<{
    group: BooleanConstructor;
    hideOnLeave: BooleanConstructor;
    leaveAbsolute: BooleanConstructor;
    mode: {
        type: StringConstructor;
        default: string | undefined;
    };
    origin: {
        type: StringConstructor;
        default: string;
    };
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    group?: unknown;
    hideOnLeave?: unknown;
    leaveAbsolute?: unknown;
    mode?: unknown;
    origin?: unknown;
} & {
    mode: string;
    group: boolean;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
    origin: string;
} & {}>, {
    mode: string;
    group: boolean;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
    origin: string;
}>;
declare const VCarouselReverseTransition: vue.DefineComponent<{
    group: BooleanConstructor;
    hideOnLeave: BooleanConstructor;
    leaveAbsolute: BooleanConstructor;
    mode: {
        type: StringConstructor;
        default: string | undefined;
    };
    origin: {
        type: StringConstructor;
        default: string;
    };
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    group?: unknown;
    hideOnLeave?: unknown;
    leaveAbsolute?: unknown;
    mode?: unknown;
    origin?: unknown;
} & {
    mode: string;
    group: boolean;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
    origin: string;
} & {}>, {
    mode: string;
    group: boolean;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
    origin: string;
}>;
declare const VTabTransition: vue.DefineComponent<{
    group: BooleanConstructor;
    hideOnLeave: BooleanConstructor;
    leaveAbsolute: BooleanConstructor;
    mode: {
        type: StringConstructor;
        default: string | undefined;
    };
    origin: {
        type: StringConstructor;
        default: string;
    };
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    group?: unknown;
    hideOnLeave?: unknown;
    leaveAbsolute?: unknown;
    mode?: unknown;
    origin?: unknown;
} & {
    mode: string;
    group: boolean;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
    origin: string;
} & {}>, {
    mode: string;
    group: boolean;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
    origin: string;
}>;
declare const VTabReverseTransition: vue.DefineComponent<{
    group: BooleanConstructor;
    hideOnLeave: BooleanConstructor;
    leaveAbsolute: BooleanConstructor;
    mode: {
        type: StringConstructor;
        default: string | undefined;
    };
    origin: {
        type: StringConstructor;
        default: string;
    };
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    group?: unknown;
    hideOnLeave?: unknown;
    leaveAbsolute?: unknown;
    mode?: unknown;
    origin?: unknown;
} & {
    mode: string;
    group: boolean;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
    origin: string;
} & {}>, {
    mode: string;
    group: boolean;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
    origin: string;
}>;
declare const VMenuTransition: vue.DefineComponent<{
    group: BooleanConstructor;
    hideOnLeave: BooleanConstructor;
    leaveAbsolute: BooleanConstructor;
    mode: {
        type: StringConstructor;
        default: string | undefined;
    };
    origin: {
        type: StringConstructor;
        default: string;
    };
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    group?: unknown;
    hideOnLeave?: unknown;
    leaveAbsolute?: unknown;
    mode?: unknown;
    origin?: unknown;
} & {
    mode: string;
    group: boolean;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
    origin: string;
} & {}>, {
    mode: string;
    group: boolean;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
    origin: string;
}>;
declare const VFabTransition: vue.DefineComponent<{
    group: BooleanConstructor;
    hideOnLeave: BooleanConstructor;
    leaveAbsolute: BooleanConstructor;
    mode: {
        type: StringConstructor;
        default: string | undefined;
    };
    origin: {
        type: StringConstructor;
        default: string;
    };
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    group?: unknown;
    hideOnLeave?: unknown;
    leaveAbsolute?: unknown;
    mode?: unknown;
    origin?: unknown;
} & {
    mode: string;
    group: boolean;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
    origin: string;
} & {}>, {
    mode: string;
    group: boolean;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
    origin: string;
}>;
declare const VDialogBottomTransition: vue.DefineComponent<{
    group: BooleanConstructor;
    hideOnLeave: BooleanConstructor;
    leaveAbsolute: BooleanConstructor;
    mode: {
        type: StringConstructor;
        default: string | undefined;
    };
    origin: {
        type: StringConstructor;
        default: string;
    };
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    group?: unknown;
    hideOnLeave?: unknown;
    leaveAbsolute?: unknown;
    mode?: unknown;
    origin?: unknown;
} & {
    mode: string;
    group: boolean;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
    origin: string;
} & {}>, {
    mode: string;
    group: boolean;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
    origin: string;
}>;
declare const VDialogTopTransition: vue.DefineComponent<{
    group: BooleanConstructor;
    hideOnLeave: BooleanConstructor;
    leaveAbsolute: BooleanConstructor;
    mode: {
        type: StringConstructor;
        default: string | undefined;
    };
    origin: {
        type: StringConstructor;
        default: string;
    };
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    group?: unknown;
    hideOnLeave?: unknown;
    leaveAbsolute?: unknown;
    mode?: unknown;
    origin?: unknown;
} & {
    mode: string;
    group: boolean;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
    origin: string;
} & {}>, {
    mode: string;
    group: boolean;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
    origin: string;
}>;
declare const VFadeTransition: vue.DefineComponent<{
    group: BooleanConstructor;
    hideOnLeave: BooleanConstructor;
    leaveAbsolute: BooleanConstructor;
    mode: {
        type: StringConstructor;
        default: string | undefined;
    };
    origin: {
        type: StringConstructor;
        default: string;
    };
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    group?: unknown;
    hideOnLeave?: unknown;
    leaveAbsolute?: unknown;
    mode?: unknown;
    origin?: unknown;
} & {
    mode: string;
    group: boolean;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
    origin: string;
} & {}>, {
    mode: string;
    group: boolean;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
    origin: string;
}>;
declare const VScaleTransition: vue.DefineComponent<{
    group: BooleanConstructor;
    hideOnLeave: BooleanConstructor;
    leaveAbsolute: BooleanConstructor;
    mode: {
        type: StringConstructor;
        default: string | undefined;
    };
    origin: {
        type: StringConstructor;
        default: string;
    };
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    group?: unknown;
    hideOnLeave?: unknown;
    leaveAbsolute?: unknown;
    mode?: unknown;
    origin?: unknown;
} & {
    mode: string;
    group: boolean;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
    origin: string;
} & {}>, {
    mode: string;
    group: boolean;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
    origin: string;
}>;
declare const VScrollXTransition: vue.DefineComponent<{
    group: BooleanConstructor;
    hideOnLeave: BooleanConstructor;
    leaveAbsolute: BooleanConstructor;
    mode: {
        type: StringConstructor;
        default: string | undefined;
    };
    origin: {
        type: StringConstructor;
        default: string;
    };
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    group?: unknown;
    hideOnLeave?: unknown;
    leaveAbsolute?: unknown;
    mode?: unknown;
    origin?: unknown;
} & {
    mode: string;
    group: boolean;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
    origin: string;
} & {}>, {
    mode: string;
    group: boolean;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
    origin: string;
}>;
declare const VScrollXReverseTransition: vue.DefineComponent<{
    group: BooleanConstructor;
    hideOnLeave: BooleanConstructor;
    leaveAbsolute: BooleanConstructor;
    mode: {
        type: StringConstructor;
        default: string | undefined;
    };
    origin: {
        type: StringConstructor;
        default: string;
    };
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    group?: unknown;
    hideOnLeave?: unknown;
    leaveAbsolute?: unknown;
    mode?: unknown;
    origin?: unknown;
} & {
    mode: string;
    group: boolean;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
    origin: string;
} & {}>, {
    mode: string;
    group: boolean;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
    origin: string;
}>;
declare const VScrollYTransition: vue.DefineComponent<{
    group: BooleanConstructor;
    hideOnLeave: BooleanConstructor;
    leaveAbsolute: BooleanConstructor;
    mode: {
        type: StringConstructor;
        default: string | undefined;
    };
    origin: {
        type: StringConstructor;
        default: string;
    };
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    group?: unknown;
    hideOnLeave?: unknown;
    leaveAbsolute?: unknown;
    mode?: unknown;
    origin?: unknown;
} & {
    mode: string;
    group: boolean;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
    origin: string;
} & {}>, {
    mode: string;
    group: boolean;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
    origin: string;
}>;
declare const VScrollYReverseTransition: vue.DefineComponent<{
    group: BooleanConstructor;
    hideOnLeave: BooleanConstructor;
    leaveAbsolute: BooleanConstructor;
    mode: {
        type: StringConstructor;
        default: string | undefined;
    };
    origin: {
        type: StringConstructor;
        default: string;
    };
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    group?: unknown;
    hideOnLeave?: unknown;
    leaveAbsolute?: unknown;
    mode?: unknown;
    origin?: unknown;
} & {
    mode: string;
    group: boolean;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
    origin: string;
} & {}>, {
    mode: string;
    group: boolean;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
    origin: string;
}>;
declare const VSlideXTransition: vue.DefineComponent<{
    group: BooleanConstructor;
    hideOnLeave: BooleanConstructor;
    leaveAbsolute: BooleanConstructor;
    mode: {
        type: StringConstructor;
        default: string | undefined;
    };
    origin: {
        type: StringConstructor;
        default: string;
    };
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    group?: unknown;
    hideOnLeave?: unknown;
    leaveAbsolute?: unknown;
    mode?: unknown;
    origin?: unknown;
} & {
    mode: string;
    group: boolean;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
    origin: string;
} & {}>, {
    mode: string;
    group: boolean;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
    origin: string;
}>;
declare const VSlideXReverseTransition: vue.DefineComponent<{
    group: BooleanConstructor;
    hideOnLeave: BooleanConstructor;
    leaveAbsolute: BooleanConstructor;
    mode: {
        type: StringConstructor;
        default: string | undefined;
    };
    origin: {
        type: StringConstructor;
        default: string;
    };
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    group?: unknown;
    hideOnLeave?: unknown;
    leaveAbsolute?: unknown;
    mode?: unknown;
    origin?: unknown;
} & {
    mode: string;
    group: boolean;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
    origin: string;
} & {}>, {
    mode: string;
    group: boolean;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
    origin: string;
}>;
declare const VSlideYTransition: vue.DefineComponent<{
    group: BooleanConstructor;
    hideOnLeave: BooleanConstructor;
    leaveAbsolute: BooleanConstructor;
    mode: {
        type: StringConstructor;
        default: string | undefined;
    };
    origin: {
        type: StringConstructor;
        default: string;
    };
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    group?: unknown;
    hideOnLeave?: unknown;
    leaveAbsolute?: unknown;
    mode?: unknown;
    origin?: unknown;
} & {
    mode: string;
    group: boolean;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
    origin: string;
} & {}>, {
    mode: string;
    group: boolean;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
    origin: string;
}>;
declare const VSlideYReverseTransition: vue.DefineComponent<{
    group: BooleanConstructor;
    hideOnLeave: BooleanConstructor;
    leaveAbsolute: BooleanConstructor;
    mode: {
        type: StringConstructor;
        default: string | undefined;
    };
    origin: {
        type: StringConstructor;
        default: string;
    };
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    group?: unknown;
    hideOnLeave?: unknown;
    leaveAbsolute?: unknown;
    mode?: unknown;
    origin?: unknown;
} & {
    mode: string;
    group: boolean;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
    origin: string;
} & {}>, {
    mode: string;
    group: boolean;
    hideOnLeave: boolean;
    leaveAbsolute: boolean;
    origin: string;
}>;
declare const VExpandTransition: vue.DefineComponent<{
    mode: vue.Prop<"in-out" | "out-in" | "default", "in-out" | "out-in" | "default">;
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    mode?: unknown;
} & {} & {
    mode?: "in-out" | "out-in" | "default" | undefined;
}>, {}>;
declare const VExpandXTransition: vue.DefineComponent<{
    mode: vue.Prop<"in-out" | "out-in" | "default", "in-out" | "out-in" | "default">;
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    mode?: unknown;
} & {} & {
    mode?: "in-out" | "out-in" | "default" | undefined;
}>, {}>;

//# sourceMappingURL=index.d.ts.map

type index_d$1_VApp = VApp;
type index_d$1_VAppBar = VAppBar;
declare const index_d$1_VAppBarNavIcon: typeof VAppBarNavIcon;
declare const index_d$1_VAppBarTitle: typeof VAppBarTitle;
type index_d$1_VAlert = VAlert;
declare const index_d$1_VAlertTitle: typeof VAlertTitle;
type index_d$1_VAvatar = VAvatar;
type index_d$1_VBadge = VBadge;
type index_d$1_VBanner = VBanner;
declare const index_d$1_VBannerActions: typeof VBannerActions;
declare const index_d$1_VBannerAvatar: typeof VBannerAvatar;
declare const index_d$1_VBannerContent: typeof VBannerContent;
declare const index_d$1_VBannerText: typeof VBannerText;
type index_d$1_VBottomNavigation = VBottomNavigation;
type index_d$1_VBreadcrumbs = VBreadcrumbs;
type index_d$1_VBreadcrumbsItem = VBreadcrumbsItem;
declare const index_d$1_VBreadcrumbsDivider: typeof VBreadcrumbsDivider;
type index_d$1_VBtn = VBtn;
declare const index_d$1_VBtnGroup: typeof VBtnGroup;
declare const index_d$1_VBtnToggle: typeof VBtnToggle;
type index_d$1_VCard = VCard;
declare const index_d$1_VCardActions: typeof VCardActions;
declare const index_d$1_VCardAvatar: typeof VCardAvatar;
declare const index_d$1_VCardHeader: typeof VCardHeader;
declare const index_d$1_VCardHeaderText: typeof VCardHeaderText;
declare const index_d$1_VCardImg: typeof VCardImg;
declare const index_d$1_VCardSubtitle: typeof VCardSubtitle;
declare const index_d$1_VCardText: typeof VCardText;
declare const index_d$1_VCardTitle: typeof VCardTitle;
type index_d$1_VCheckbox = VCheckbox;
type index_d$1_VChip = VChip;
type index_d$1_VChipGroup = VChipGroup;
declare const index_d$1_VCode: typeof VCode;
declare const index_d$1_VCounter: typeof VCounter;
declare const index_d$1_VDefaultsProvider: typeof VDefaultsProvider;
type index_d$1_VDialog = VDialog;
declare const index_d$1_VDivider: typeof VDivider;
type index_d$1_VExpansionPanels = VExpansionPanels;
type index_d$1_VExpansionPanel = VExpansionPanel;
type index_d$1_VExpansionPanelText = VExpansionPanelText;
type index_d$1_VExpansionPanelTitle = VExpansionPanelTitle;
type index_d$1_VField = VField;
type index_d$1_VFieldLabel = VFieldLabel;
type index_d$1_VFileInput = VFileInput;
declare const index_d$1_VFooter: typeof VFooter;
type index_d$1_VForm = VForm;
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
type index_d$1_VImg = VImg;
type index_d$1_VInput = VInput;
type index_d$1_VItemGroup = VItemGroup;
type index_d$1_VItem = VItem;
declare const index_d$1_VKbd: typeof VKbd;
type index_d$1_VLabel = VLabel;
type index_d$1_VLayout = VLayout;
declare const index_d$1_VLayoutItem: typeof VLayoutItem;
declare const index_d$1_VLazy: typeof VLazy;
type index_d$1_VList = VList;
declare const index_d$1_VListSubheader: typeof VListSubheader;
declare const index_d$1_VListImg: typeof VListImg;
type index_d$1_VListItem = VListItem;
declare const index_d$1_VListItemAvatar: typeof VListItemAvatar;
declare const index_d$1_VListItemHeader: typeof VListItemHeader;
declare const index_d$1_VListItemMedia: typeof VListItemMedia;
declare const index_d$1_VListItemSubtitle: typeof VListItemSubtitle;
declare const index_d$1_VListItemTitle: typeof VListItemTitle;
declare const index_d$1_VListGroup: typeof VListGroup;
declare const index_d$1_VLocaleProvider: typeof VLocaleProvider;
declare const index_d$1_VMain: typeof VMain;
type index_d$1_VMenu = VMenu;
declare const index_d$1_VMessages: typeof VMessages;
type index_d$1_VNavigationDrawer = VNavigationDrawer;
declare const index_d$1_VNoSsr: typeof VNoSsr;
type index_d$1_VOverlay = VOverlay;
type index_d$1_VPagination = VPagination;
type index_d$1_VParallax = VParallax;
declare const index_d$1_VProgressCircular: typeof VProgressCircular;
declare const index_d$1_VProgressLinear: typeof VProgressLinear;
type index_d$1_VRadio = VRadio;
declare const index_d$1_VRadioGroup: typeof VRadioGroup;
type index_d$1_VRangeSlider = VRangeSlider;
type index_d$1_VRating = VRating;
declare const index_d$1_VResponsive: typeof VResponsive;
type index_d$1_VSelect = VSelect;
type index_d$1_VSelectionControl = VSelectionControl;
type index_d$1_VSelectionControlGroup = VSelectionControlGroup;
declare const index_d$1_VSheet: typeof VSheet;
type index_d$1_VSlider = VSlider;
type index_d$1_VSwitch = VSwitch;
declare const index_d$1_VSystemBar: typeof VSystemBar;
declare const index_d$1_VTable: typeof VTable;
type index_d$1_VTextarea = VTextarea;
type index_d$1_VTextField = VTextField;
declare const index_d$1_VThemeProvider: typeof VThemeProvider;
declare const index_d$1_VTimeline: typeof VTimeline;
declare const index_d$1_VTimelineItem: typeof VTimelineItem;
type index_d$1_VToolbar = VToolbar;
type index_d$1_VToolbarTitle = VToolbarTitle;
type index_d$1_VToolbarItems = VToolbarItems;
type index_d$1_VTooltip = VTooltip;
declare const index_d$1_VValidation: typeof VValidation;
declare const index_d$1_VWindow: typeof VWindow;
declare const index_d$1_VWindowItem: typeof VWindowItem;
declare const index_d$1_VDialogTransition: typeof VDialogTransition;
declare const index_d$1_VCarouselTransition: typeof VCarouselTransition;
declare const index_d$1_VCarouselReverseTransition: typeof VCarouselReverseTransition;
declare const index_d$1_VTabTransition: typeof VTabTransition;
declare const index_d$1_VTabReverseTransition: typeof VTabReverseTransition;
declare const index_d$1_VMenuTransition: typeof VMenuTransition;
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
    index_d$1_VAvatar as VAvatar,
    index_d$1_VBadge as VBadge,
    index_d$1_VBanner as VBanner,
    index_d$1_VBannerActions as VBannerActions,
    index_d$1_VBannerAvatar as VBannerAvatar,
    index_d$1_VBannerContent as VBannerContent,
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
    index_d$1_VCardAvatar as VCardAvatar,
    index_d$1_VCardHeader as VCardHeader,
    index_d$1_VCardHeaderText as VCardHeaderText,
    index_d$1_VCardImg as VCardImg,
    index_d$1_VCardSubtitle as VCardSubtitle,
    index_d$1_VCardText as VCardText,
    index_d$1_VCardTitle as VCardTitle,
    index_d$1_VCheckbox as VCheckbox,
    index_d$1_VChip as VChip,
    index_d$1_VChipGroup as VChipGroup,
    index_d$1_VCode as VCode,
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
    index_d$1_VListSubheader as VListSubheader,
    index_d$1_VListImg as VListImg,
    index_d$1_VListItem as VListItem,
    index_d$1_VListItemAvatar as VListItemAvatar,
    index_d$1_VListItemHeader as VListItemHeader,
    index_d$1_VListItemMedia as VListItemMedia,
    index_d$1_VListItemSubtitle as VListItemSubtitle,
    index_d$1_VListItemTitle as VListItemTitle,
    index_d$1_VListGroup as VListGroup,
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
    index_d$1_VSlider as VSlider,
    index_d$1_VSwitch as VSwitch,
    index_d$1_VSystemBar as VSystemBar,
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
    index_d$1_VCarouselTransition as VCarouselTransition,
    index_d$1_VCarouselReverseTransition as VCarouselReverseTransition,
    index_d$1_VTabTransition as VTabTransition,
    index_d$1_VTabReverseTransition as VTabReverseTransition,
    index_d$1_VMenuTransition as VMenuTransition,
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

declare const Intersect: ObjectDirective<HTMLElement>;

declare const Mutate: ObjectDirective<HTMLElement>;

interface ResizeDirectiveBinding extends Omit<DirectiveBinding, 'modifiers'> {
    value: () => void;
    modifiers?: {
        active?: boolean;
        quiet?: boolean;
    };
}
declare function mounted$1(el: HTMLElement, binding: ResizeDirectiveBinding): void;
declare function unmounted$1(el: HTMLElement, binding: ResizeDirectiveBinding): void;
declare const Resize: {
    mounted: typeof mounted$1;
    unmounted: typeof unmounted$1;
};

declare const Ripple: ObjectDirective;

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

declare type DisplayBreakpoint = keyof DisplayThresholds;
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
    xs: boolean;
    sm: boolean;
    md: boolean;
    lg: boolean;
    xl: boolean;
    xxl: boolean;
    smAndUp: boolean;
    mdAndUp: boolean;
    lgAndUp: boolean;
    xlAndUp: boolean;
    smAndDown: boolean;
    mdAndDown: boolean;
    lgAndDown: boolean;
    xlAndDown: boolean;
    name: DisplayBreakpoint;
    height: number;
    width: number;
    mobile: boolean;
    mobileBreakpoint: number | DisplayBreakpoint;
    platform: DisplayPlatform;
    thresholds: DisplayThresholds;
}
declare function useDisplay(): ToRefs<DisplayInstance>;

interface LocaleMessages {
    [key: string]: LocaleMessages | string;
}
interface LocaleOptions {
    defaultLocale?: string;
    fallbackLocale?: string;
    messages?: LocaleMessages;
}
interface LocaleProps {
    locale?: string;
    fallbackLocale?: string;
    messages?: LocaleMessages;
}
interface LocaleInstance {
    current: Ref<string>;
    fallback: Ref<string>;
    messages: Ref<LocaleMessages>;
    t: (key: string, ...params: unknown[]) => string;
    n: (value: number) => string;
}
interface LocaleAdapter {
    createRoot: (app: App) => LocaleInstance;
    getScope: () => LocaleInstance;
    createScope: (options?: LocaleProps) => LocaleInstance;
}

interface RtlOptions {
    defaultRtl?: boolean;
    rtl?: Record<string, boolean>;
}
interface RtlProps {
    rtl?: boolean;
}
interface RtlInstance {
    isRtl: Ref<boolean>;
    rtl: Record<string, boolean>;
    rtlClasses: Ref<string>;
}
declare function provideRtl(props: RtlProps, localeScope: LocaleInstance): RtlInstance;
declare function useRtl(): RtlInstance;

declare type Position = 'top' | 'left' | 'right' | 'bottom';
declare type LayoutItem = {
    id: string;
    top: number;
    bottom: number;
    left: number;
    right: number;
    size: number;
};
interface LayoutProvide {
    register: (vm: ComponentInternalInstance, options: {
        id: string;
        priority: Ref<number>;
        position: Ref<Position>;
        layoutSize: Ref<number | string>;
        elementSize: Ref<number | string>;
        active: Ref<boolean>;
        disableTransitions?: Ref<boolean>;
        absolute: Ref<boolean | undefined>;
    }) => {
        layoutItemStyles: Ref<Record<string, unknown>>;
        layoutItemScrimStyles: Ref<Record<string, unknown>>;
    };
    unregister: (id: string) => void;
    mainStyles: Ref<Record<string, unknown>>;
    getLayoutItem: (id: string) => LayoutItem | undefined;
    items: Ref<LayoutItem[]>;
    layoutRect: Ref<DOMRectReadOnly | undefined>;
    rootZIndex: Ref<number>;
    overlays: Ref<number[]>;
}
declare function useLayout(): LayoutProvide;

interface VuetifyOptions {
    components?: Record<string, any>;
    directives?: Record<string, any>;
    defaults?: DefaultsOptions;
    display?: DisplayOptions;
    theme?: ThemeOptions;
    icons?: IconOptions;
    locale?: (LocaleOptions & RtlOptions) | (LocaleAdapter & RtlOptions);
}

declare const createVuetify: (options?: VuetifyOptions) => {
    install: (app: vue.App<any>) => void;
};
declare const version: string;

export { DefaultsInstance, DisplayBreakpoint, DisplayInstance, DisplayThresholds, IconAliases, IconOptions, IconProps, IconSet, LocaleAdapter, RtlInstance, ThemeDefinition, ThemeInstance, index_d$1 as components, createVuetify, index_d as directives, provideRtl, useDisplay, useLayout, useRtl, useTheme, version };
