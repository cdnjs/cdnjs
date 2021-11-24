import * as vue from 'vue';
import { PropType, Ref, VNode, nextTick, ComputedRef, JSXComponent, Prop, WritableComputedRef, DirectiveBinding, ObjectDirective, ToRefs, App } from 'vue';
import * as vue_router from 'vue-router';
import { RouterLinkOptions } from 'vue-router';

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
    name: Omit<{
        type: StringConstructor;
    }, "default" | "type"> & {
        type: PropType<string>;
        default: string;
    };
    priority: {
        type: NumberConstructor;
        default: number;
    };
    absolute: BooleanConstructor;
    rounded: {
        type: (StringConstructor | NumberConstructor | BooleanConstructor)[];
        default: undefined;
    };
    tile: BooleanConstructor;
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
        type: PropType<"top" | "bottom">;
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
    tile?: unknown;
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
    name: string;
    tag: string;
    priority: number;
    absolute: boolean;
    position: "top" | "bottom";
    density: "default" | "comfortable" | "compact" | null;
    tile: boolean;
    collapse: boolean;
    extensionHeight: string | number;
    floating: boolean;
    modelValue: boolean;
    prominent: boolean;
    prominentHeight: string | number;
} & {
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
    name: string;
    tag: string;
    priority: number;
    absolute: boolean;
    position: "top" | "bottom";
    density: "default" | "comfortable" | "compact" | null;
    rounded: string | number | boolean;
    tile: boolean;
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
    variant: {
        type: PropType<"text" | "contained" | "outlined" | "plain" | "contained-text">;
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
    tile: BooleanConstructor;
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
    sticky: BooleanConstructor;
    text: StringConstructor;
    tip: BooleanConstructor;
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
    tile?: unknown;
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
    sticky?: unknown;
    text?: unknown;
    tip?: unknown;
    type?: unknown;
} & {
    fixed: boolean;
    tag: string;
    absolute: boolean;
    density: "default" | "comfortable" | "compact" | null;
    tile: boolean;
    modelValue: boolean;
    prominent: boolean;
    sticky: boolean;
    icon: string | false;
    variant: "text" | "contained" | "outlined" | "plain" | "contained-text";
    closable: boolean;
    closeIcon: string;
    closeLabel: string;
    tip: boolean;
} & {
    left?: string | number | boolean | undefined;
    right?: string | number | boolean | undefined;
    type?: "success" | "warning" | "error" | "info" | undefined;
    theme?: string | undefined;
    top?: string | number | boolean | undefined;
    bottom?: string | number | boolean | undefined;
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
    tile: boolean;
    modelValue: boolean;
    prominent: boolean;
    sticky: boolean;
    icon: string | false;
    variant: "text" | "contained" | "outlined" | "plain" | "contained-text";
    closable: boolean;
    closeIcon: string;
    closeLabel: string;
    tip: boolean;
}>;
declare type VAlert = InstanceType<typeof VAlert>;

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
    tile: BooleanConstructor;
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
    tile?: unknown;
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
    tile: boolean;
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
    tile: boolean;
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
    tile: BooleanConstructor;
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
    tile?: unknown;
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
    tile: boolean;
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
    offsetX?: string | number | undefined;
    offsetY?: string | number | undefined;
    max?: string | number | undefined;
}>, {
    tag: string;
    label: string;
    transition: string | false | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    });
    rounded: string | number | boolean;
    tile: boolean;
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
    tile: BooleanConstructor;
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
    tile?: unknown;
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
    tile: boolean;
    sticky: boolean;
    lines: string;
} & {
    width?: string | number | undefined;
    height?: string | number | undefined;
    left?: string | number | boolean | undefined;
    right?: string | number | boolean | undefined;
    theme?: string | undefined;
    top?: string | number | boolean | undefined;
    bottom?: string | number | boolean | undefined;
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
    tile: boolean;
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
        type: NumberConstructor;
        default: number;
    };
    absolute: BooleanConstructor;
    rounded: {
        type: (StringConstructor | NumberConstructor | BooleanConstructor)[];
        default: undefined;
    };
    tile: BooleanConstructor;
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
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    mode: {
        type: StringConstructor;
        validator: (v: any) => boolean;
    };
    height: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (value: boolean) => true;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    theme?: unknown;
    tag?: unknown;
    name?: unknown;
    priority?: unknown;
    absolute?: unknown;
    rounded?: unknown;
    tile?: unknown;
    elevation?: unknown;
    density?: unknown;
    border?: unknown;
    bgColor?: unknown;
    color?: unknown;
    grow?: unknown;
    modelValue?: unknown;
    mode?: unknown;
    height?: unknown;
} & {
    height: string | number;
    name: string;
    tag: string;
    priority: number;
    absolute: boolean;
    density: "default" | "comfortable" | "compact" | null;
    tile: boolean;
    modelValue: boolean;
    grow: boolean;
} & {
    mode?: string | undefined;
    theme?: string | undefined;
    border?: string | number | boolean | undefined;
    elevation?: string | number | undefined;
    rounded?: string | number | boolean | undefined;
    color?: string | undefined;
    bgColor?: string | undefined;
}> & {
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
}, {
    height: string | number;
    name: string;
    tag: string;
    priority: number;
    absolute: boolean;
    density: "default" | "comfortable" | "compact" | null;
    rounded: string | number | boolean;
    tile: boolean;
    modelValue: boolean;
    grow: boolean;
}>;
declare type VBottomNavigation = InstanceType<typeof VBottomNavigation>;

interface LinkProps extends Partial<RouterLinkOptions> {
    href?: string;
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
    tile: BooleanConstructor;
    density: {
        type: PropType<"default" | "comfortable" | "compact" | null>;
        default: string;
        validator: (v: any) => boolean;
    };
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
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    tag?: unknown;
    rounded?: unknown;
    tile?: unknown;
    density?: unknown;
    color?: unknown;
    disabled?: unknown;
    divider?: unknown;
    icon?: unknown;
    items?: unknown;
} & {
    tag: string;
    items: BreadcrumbItem[];
    density: "default" | "comfortable" | "compact" | null;
    tile: boolean;
    disabled: boolean;
    divider: string;
} & {
    rounded?: string | number | boolean | undefined;
    color?: string | undefined;
    icon?: string | undefined;
}>, {
    tag: string;
    items: BreadcrumbItem[];
    density: "default" | "comfortable" | "compact" | null;
    rounded: string | number | boolean;
    tile: boolean;
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
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
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
        type: vue.PropType<"text" | "contained" | "outlined" | "plain" | "contained-text">;
        default: string;
        validator: (v: any) => boolean;
    }, "default" | "type"> & {
        type: vue.PropType<"text" | "contained" | "outlined" | "plain" | "contained-text">;
        default: "text" | "contained" | "outlined" | "plain" | "contained-text";
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
    tile: BooleanConstructor;
    border: (StringConstructor | NumberConstructor | BooleanConstructor)[];
    flat: BooleanConstructor;
    icon: (StringConstructor | BooleanConstructor)[];
    prependIcon: StringConstructor;
    appendIcon: StringConstructor;
    block: BooleanConstructor;
    stacked: BooleanConstructor;
    disabled: BooleanConstructor;
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
    elevation?: unknown;
    height?: unknown;
    maxHeight?: unknown;
    maxWidth?: unknown;
    minHeight?: unknown;
    minWidth?: unknown;
    width?: unknown;
    density?: unknown;
    rounded?: unknown;
    tile?: unknown;
    border?: unknown;
    flat?: unknown;
    icon?: unknown;
    prependIcon?: unknown;
    appendIcon?: unknown;
    block?: unknown;
    stacked?: unknown;
    disabled?: unknown;
    ripple?: unknown;
} & {
    replace: boolean;
    fixed: boolean;
    flat: boolean;
    tag: string;
    absolute: boolean;
    density: "default" | "comfortable" | "compact" | null;
    tile: boolean;
    size: string | number;
    block: boolean;
    disabled: boolean;
    variant: "text" | "contained" | "outlined" | "plain" | "contained-text";
    stacked: boolean;
    ripple: boolean;
} & {
    width?: string | number | undefined;
    height?: string | number | undefined;
    left?: string | number | boolean | undefined;
    right?: string | number | boolean | undefined;
    theme?: string | undefined;
    top?: string | number | boolean | undefined;
    bottom?: string | number | boolean | undefined;
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
    to?: vue_router.RouteLocationRaw | undefined;
    href?: string | undefined;
    textColor?: string | undefined;
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
    tile: boolean;
    size: string | number;
    block: boolean;
    disabled: boolean;
    variant: "text" | "contained" | "outlined" | "plain" | "contained-text";
    stacked: boolean;
    ripple: boolean;
}>;
declare type VBtn = InstanceType<typeof VBtn>;

declare const VBtnGroup: vue.DefineComponent<{
    tag: {
        type: StringConstructor;
        default: string;
    };
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    tag?: unknown;
} & {
    tag: string;
} & {}>, {
    tag: string;
}>;

declare const VCard: vue.DefineComponent<{
    color: StringConstructor;
    textColor: StringConstructor;
    variant: Omit<{
        type: vue.PropType<"text" | "contained" | "outlined" | "plain" | "contained-text">;
        default: string;
        validator: (v: any) => boolean;
    }, "default" | "type"> & {
        type: vue.PropType<"text" | "contained" | "outlined" | "plain" | "contained-text">;
        default: "text" | "contained" | "outlined" | "plain" | "contained-text";
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
    tile: BooleanConstructor;
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
    tile?: unknown;
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
    tile: boolean;
    disabled: boolean;
    variant: "text" | "contained" | "outlined" | "plain" | "contained-text";
    ripple: boolean;
    hover: boolean;
} & {
    width?: string | number | undefined;
    height?: string | number | undefined;
    left?: string | number | boolean | undefined;
    right?: string | number | boolean | undefined;
    theme?: string | undefined;
    title?: string | undefined;
    top?: string | number | boolean | undefined;
    bottom?: string | number | boolean | undefined;
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
    to?: vue_router.RouteLocationRaw | undefined;
    href?: string | undefined;
    textColor?: string | undefined;
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
    tile: boolean;
    disabled: boolean;
    variant: "text" | "contained" | "outlined" | "plain" | "contained-text";
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

declare const VCheckbox: vue.DefineComponent<{
    indeterminate: BooleanConstructor;
    indeterminateIcon: {
        type: StringConstructor;
        default: string;
    };
    offIcon: {
        type: StringConstructor;
        default: string;
    };
    onIcon: {
        type: StringConstructor;
        default: string;
    };
    modelValue: null;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:indeterminate': (val: boolean) => true;
    'update:modelValue': (val: any) => true;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    indeterminate?: unknown;
    indeterminateIcon?: unknown;
    offIcon?: unknown;
    onIcon?: unknown;
    modelValue?: unknown;
} & {
    offIcon: string;
    onIcon: string;
    indeterminate: boolean;
    indeterminateIcon: string;
} & {
    modelValue?: any;
}> & {
    "onUpdate:modelValue"?: ((val: any) => any) | undefined;
    "onUpdate:indeterminate"?: ((val: boolean) => any) | undefined;
}, {
    offIcon: string;
    onIcon: string;
    indeterminate: boolean;
    indeterminateIcon: string;
}>;
declare type VCheckbox = InstanceType<typeof VCheckbox>;

declare const VChip: vue.DefineComponent<{
    color: StringConstructor;
    textColor: StringConstructor;
    variant: Omit<{
        type: vue.PropType<"text" | "contained" | "outlined" | "plain" | "contained-text">;
        default: string;
        validator: (v: any) => boolean;
    }, "default" | "type"> & {
        type: vue.PropType<"text" | "contained" | "outlined" | "plain" | "contained-text">;
        default: "text" | "contained" | "outlined" | "plain" | "contained-text";
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
    tile: BooleanConstructor;
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
    disabled: BooleanConstructor;
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
    tile?: unknown;
    elevation?: unknown;
    density?: unknown;
    border?: unknown;
    activeClass?: unknown;
    appendAvatar?: unknown;
    appendIcon?: unknown;
    closable?: unknown;
    closeIcon?: unknown;
    closeLabel?: unknown;
    disabled?: unknown;
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
    tile: boolean;
    modelValue: boolean;
    size: string | number;
    disabled: boolean;
    variant: "text" | "contained" | "outlined" | "plain" | "contained-text";
    ripple: boolean;
    closable: boolean;
    closeIcon: string;
    closeLabel: string;
    draggable: boolean;
    filterIcon: string;
    pill: boolean;
} & {
    theme?: string | undefined;
    text?: string | undefined;
    border?: string | number | boolean | undefined;
    elevation?: string | number | undefined;
    rounded?: string | number | boolean | undefined;
    color?: string | undefined;
    to?: vue_router.RouteLocationRaw | undefined;
    href?: string | undefined;
    textColor?: string | undefined;
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
    tile: boolean;
    modelValue: boolean;
    size: string | number;
    disabled: boolean;
    variant: "text" | "contained" | "outlined" | "plain" | "contained-text";
    ripple: boolean;
    closable: boolean;
    closeIcon: string;
    closeLabel: string;
    draggable: boolean;
    filterIcon: string;
    pill: boolean;
}>;
declare type VChip = InstanceType<typeof VChip>;

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
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>[] | undefined, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    defaults?: unknown;
} & {} & {
    defaults?: Partial<DefaultsInstance> | undefined;
}>, {}>;

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
    positionStrategy: keyof typeof positionStrategies | ((data: PositionStrategyData, props: StrategyProps, contentStyles: Ref<Dictionary<string>>) => undefined | {
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
declare function connectedPositionStrategy(data: PositionStrategyData, props: StrategyProps, contentStyles: Ref<Dictionary<string>>): {
    updatePosition: () => void;
};

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
interface ThemeDefinitionColors extends BaseColors, Partial<OnColors> {
    [key: string]: string | undefined;
}
interface ThemeDefinition {
    dark: boolean;
    colors: ThemeDefinitionColors;
    variables: Record<string, string | number>;
}
interface VariationsOptions {
    colors: string[];
    lighten: number;
    darken: number;
}
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
    setTheme: (key: string, theme: ThemeDefinition) => void;
    getTheme: (key: string) => InternalThemeDefinition;
}
/**
 * Used to either set up and provide a new theme instance, or to pass
 * along the closest available already provided instance.
 */
declare function useTheme(props: {
    theme?: string;
}): ThemeInstance;

declare type Slot<T extends any[] = any[]> = (...args: T) => VNode | VNode[] | undefined;
declare type MakeSlots<T extends Record<string, any[]>> = {
    [K in keyof T]?: Slot<T[K]>;
};

declare function deepEqual(a: any, b: any): boolean;

declare type OverlaySlots = MakeSlots<{
    default: [{
        isActive: Ref<boolean>;
    }];
    activator: [{
        isActive: boolean;
        props: Dictionary<any>;
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
            activatorProps: Dictionary<any>;
            openOnClick: boolean;
            openOnHover: boolean;
            openOnFocus: boolean;
            positionStrategy: "static" | "connected" | ((data: PositionStrategyData, props: StrategyProps, contentStyles: Ref<Dictionary<string>>) => {
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
            activatorProps: Dictionary<any>;
            openOnHover: boolean;
            positionStrategy: "static" | "connected" | ((data: PositionStrategyData, props: StrategyProps, contentStyles: Ref<Dictionary<string>>) => {
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
            "v-slots"?: {
                default?: false | ((args_0: {
                    isActive: Ref<boolean>;
                }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                activator?: false | ((args_0: {
                    isActive: boolean;
                    props: Dictionary<any>;
                }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
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
            activatorProps: Dictionary<any>;
            openOnHover: boolean;
            positionStrategy: "static" | "connected" | ((data: PositionStrategyData, props: StrategyProps, contentStyles: Ref<Dictionary<string>>) => {
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
            "v-slots"?: {
                default?: false | ((args_0: {
                    isActive: Ref<boolean>;
                }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                activator?: false | ((args_0: {
                    isActive: boolean;
                    props: Dictionary<any>;
                }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
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
            activatorProps: Dictionary<any>;
            openOnClick: boolean;
            openOnHover: boolean;
            openOnFocus: boolean;
            positionStrategy: "static" | "connected" | ((data: PositionStrategyData, props: StrategyProps, contentStyles: Ref<Dictionary<string>>) => {
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
        activatorProps: Dictionary<any>;
        openOnHover: boolean;
        positionStrategy: "static" | "connected" | ((data: PositionStrategyData, props: StrategyProps, contentStyles: Ref<Dictionary<string>>) => {
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
        "v-slots"?: {
            default?: false | ((args_0: {
                isActive: Ref<boolean>;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
            activator?: false | ((args_0: {
                isActive: boolean;
                props: Dictionary<any>;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
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
    activatorProps: Dictionary<any>;
    openOnHover: boolean;
    positionStrategy: "static" | "connected" | ((data: PositionStrategyData, props: StrategyProps, contentStyles: Ref<Dictionary<string>>) => {
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
    "v-slots"?: {
        default?: false | ((args_0: {
            isActive: Ref<boolean>;
        }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[] | undefined) | undefined;
        activator?: false | ((args_0: {
            isActive: boolean;
            props: Dictionary<any>;
        }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[] | undefined) | undefined;
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
    activatorProps: Dictionary<any>;
    openOnClick: boolean;
    openOnHover: boolean;
    openOnFocus: boolean;
    positionStrategy: "static" | "connected" | ((data: PositionStrategyData, props: StrategyProps, contentStyles: Ref<Dictionary<string>>) => {
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
            "v-slots"?: {
                default?: false | ((args_0: {
                    isActive: vue.Ref<boolean>;
                }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                activator?: false | ((args_0: {
                    isActive: boolean;
                    props: Dictionary<any>;
                }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
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
            "v-slots"?: {
                default?: false | ((args_0: {
                    isActive: vue.Ref<boolean>;
                }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                activator?: false | ((args_0: {
                    isActive: boolean;
                    props: Dictionary<any>;
                }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
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
        "v-slots"?: {
            default?: false | ((args_0: {
                isActive: vue.Ref<boolean>;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
            activator?: false | ((args_0: {
                isActive: boolean;
                props: Dictionary<any>;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
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
    "v-slots"?: {
        default?: false | ((args_0: {
            isActive: vue.Ref<boolean>;
        }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[] | undefined) | undefined;
        activator?: false | ((args_0: {
            isActive: boolean;
            props: Dictionary<any>;
        }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[] | undefined) | undefined;
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
    modelValue: {
        type: null;
        default: undefined;
    };
    multiple: BooleanConstructor;
    mandatory: PropType<boolean | "force">;
    max: NumberConstructor;
    selectedClass: StringConstructor;
    disabled: BooleanConstructor;
    tag: {
        type: StringConstructor;
        default: string;
    };
    variant: {
        type: PropType<"default" | "inset" | "accordion" | "popout">;
        default: string;
        validator: (v: any) => boolean;
    };
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (val: unknown) => true;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    theme?: unknown;
    modelValue?: unknown;
    multiple?: unknown;
    mandatory?: unknown;
    max?: unknown;
    selectedClass?: unknown;
    disabled?: unknown;
    tag?: unknown;
    variant?: unknown;
} & {
    tag: string;
    multiple: boolean;
    disabled: boolean;
    variant: "default" | "inset" | "accordion" | "popout";
} & {
    theme?: string | undefined;
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
    color: StringConstructor;
    tag: {
        type: StringConstructor;
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
    tile: BooleanConstructor;
    value: {
        type: (ObjectConstructor | StringConstructor | NumberConstructor | BooleanConstructor)[];
        default: undefined;
    };
    disabled: BooleanConstructor;
    selectedClass: StringConstructor;
    eager: BooleanConstructor;
    title: StringConstructor;
    text: StringConstructor;
    bgColor: StringConstructor;
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    expandIcon?: unknown;
    collapseIcon?: unknown;
    hideActions?: unknown;
    ripple?: unknown;
    color?: unknown;
    tag?: unknown;
    elevation?: unknown;
    rounded?: unknown;
    tile?: unknown;
    value?: unknown;
    disabled?: unknown;
    selectedClass?: unknown;
    eager?: unknown;
    title?: unknown;
    text?: unknown;
    bgColor?: unknown;
} & {
    tag: string;
    eager: boolean;
    tile: boolean;
    disabled: boolean;
    ripple: boolean | Record<string, any>;
    expandIcon: string;
    collapseIcon: string;
    hideActions: boolean;
} & {
    value?: string | number | boolean | Record<string, any> | undefined;
    title?: string | undefined;
    text?: string | undefined;
    elevation?: string | number | undefined;
    rounded?: string | number | boolean | undefined;
    color?: string | undefined;
    bgColor?: string | undefined;
    selectedClass?: string | undefined;
}>, {
    value: string | number | boolean | Record<string, any>;
    tag: string;
    eager: boolean;
    rounded: string | number | boolean;
    tile: boolean;
    disabled: boolean;
    ripple: boolean | Record<string, any>;
    expandIcon: string;
    collapseIcon: string;
    hideActions: boolean;
}>;
declare type VExpansionPanel = InstanceType<typeof VExpansionPanel>;

declare const VExpansionPanelText: vue.DefineComponent<{
    eager: BooleanConstructor;
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    eager?: unknown;
} & {
    eager: boolean;
} & {}>, {
    eager: boolean;
}>;

declare const VExpansionPanelTitle: vue.DefineComponent<{
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
    color: StringConstructor;
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    expandIcon?: unknown;
    collapseIcon?: unknown;
    hideActions?: unknown;
    ripple?: unknown;
    color?: unknown;
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

declare type ValidationResult = string | true;
declare type ValidationRule = ValidationResult | PromiseLike<ValidationResult> | ((value: any) => ValidationResult) | ((value: any) => PromiseLike<ValidationResult>);

declare type VInputSlot = {
    isDisabled: ComputedRef<boolean>;
    isReadonly: ComputedRef<boolean>;
    isPristine: Ref<boolean | null>;
    isValid: ComputedRef<boolean | null>;
    isValidating: Ref<boolean>;
    reset: () => void;
    resetValidation: () => void;
    validate: () => void;
};
declare const VInput: {
    new (...args: any[]): {
        $: vue.ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            error: boolean;
            density: "default" | "comfortable" | "compact" | null;
            modelValue: any;
            disabled: boolean;
            readonly: boolean;
            errorMessages: string | string[];
            maxErrors: string | number;
            rules: ValidationRule[];
            focused: boolean;
            messages: string | unknown[];
            persistentHint: boolean;
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
            appendIcon?: unknown;
            prependIcon?: unknown;
            focused?: unknown;
            hideDetails?: unknown;
            hint?: unknown;
            messages?: unknown;
            persistentHint?: unknown;
            'v-slots'?: unknown;
        } & {
            error: boolean;
            density: "default" | "comfortable" | "compact" | null;
            disabled: boolean;
            readonly: boolean;
            errorMessages: string | string[];
            maxErrors: string | number;
            rules: ValidationRule[];
            focused: boolean;
            messages: string | unknown[];
            persistentHint: boolean;
        } & {
            name?: string | undefined;
            "v-slots"?: {
                default?: false | ((args_0: VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                prepend?: false | ((args_0: VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                append?: false | ((args_0: VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                details?: false | ((args_0: VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
            } | undefined;
            modelValue?: any;
            prependIcon?: string | undefined;
            appendIcon?: string | undefined;
            hint?: string | undefined;
            hideDetails?: boolean | "auto" | undefined;
        }> & {
            "onClick:prepend"?: ((e: MouseEvent) => any) | undefined;
            "onClick:append"?: ((e: MouseEvent) => any) | undefined;
        } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "error" | "density" | "modelValue" | "disabled" | "readonly" | "errorMessages" | "maxErrors" | "rules" | "focused" | "messages" | "persistentHint">;
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
        $emit: ((event: "click:prepend", e: MouseEvent) => void) & ((event: "click:append", e: MouseEvent) => void);
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
            appendIcon?: unknown;
            prependIcon?: unknown;
            focused?: unknown;
            hideDetails?: unknown;
            hint?: unknown;
            messages?: unknown;
            persistentHint?: unknown;
            'v-slots'?: unknown;
        } & {
            error: boolean;
            density: "default" | "comfortable" | "compact" | null;
            disabled: boolean;
            readonly: boolean;
            errorMessages: string | string[];
            maxErrors: string | number;
            rules: ValidationRule[];
            focused: boolean;
            messages: string | unknown[];
            persistentHint: boolean;
        } & {
            name?: string | undefined;
            "v-slots"?: {
                default?: false | ((args_0: VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                prepend?: false | ((args_0: VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                append?: false | ((args_0: VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                details?: false | ((args_0: VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
            } | undefined;
            modelValue?: any;
            prependIcon?: string | undefined;
            appendIcon?: string | undefined;
            hint?: string | undefined;
            hideDetails?: boolean | "auto" | undefined;
        }> & {
            "onClick:prepend"?: ((e: MouseEvent) => any) | undefined;
            "onClick:append"?: ((e: MouseEvent) => any) | undefined;
        }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
            'click:prepend': (e: MouseEvent) => boolean;
            'click:append': (e: MouseEvent) => boolean;
        }, string, {
            error: boolean;
            density: "default" | "comfortable" | "compact" | null;
            modelValue: any;
            disabled: boolean;
            readonly: boolean;
            errorMessages: string | string[];
            maxErrors: string | number;
            rules: ValidationRule[];
            focused: boolean;
            messages: string | unknown[];
            persistentHint: boolean;
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
        appendIcon?: unknown;
        prependIcon?: unknown;
        focused?: unknown;
        hideDetails?: unknown;
        hint?: unknown;
        messages?: unknown;
        persistentHint?: unknown;
        'v-slots'?: unknown;
    } & {
        error: boolean;
        density: "default" | "comfortable" | "compact" | null;
        disabled: boolean;
        readonly: boolean;
        errorMessages: string | string[];
        maxErrors: string | number;
        rules: ValidationRule[];
        focused: boolean;
        messages: string | unknown[];
        persistentHint: boolean;
    } & {
        name?: string | undefined;
        "v-slots"?: {
            default?: false | ((args_0: VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
            prepend?: false | ((args_0: VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
            append?: false | ((args_0: VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
            details?: false | ((args_0: VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
        } | undefined;
        modelValue?: any;
        prependIcon?: string | undefined;
        appendIcon?: string | undefined;
        hint?: string | undefined;
        hideDetails?: boolean | "auto" | undefined;
    }> & {
        "onClick:prepend"?: ((e: MouseEvent) => any) | undefined;
        "onClick:append"?: ((e: MouseEvent) => any) | undefined;
    } & vue.ShallowUnwrapRef<() => JSX.Element> & {} & {} & vue.ComponentCustomProperties;
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
    appendIcon?: unknown;
    prependIcon?: unknown;
    focused?: unknown;
    hideDetails?: unknown;
    hint?: unknown;
    messages?: unknown;
    persistentHint?: unknown;
    'v-slots'?: unknown;
} & {
    error: boolean;
    density: "default" | "comfortable" | "compact" | null;
    disabled: boolean;
    readonly: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    focused: boolean;
    messages: string | unknown[];
    persistentHint: boolean;
} & {
    name?: string | undefined;
    "v-slots"?: {
        default?: false | ((args_0: VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[] | undefined) | undefined;
        prepend?: false | ((args_0: VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[] | undefined) | undefined;
        append?: false | ((args_0: VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[] | undefined) | undefined;
        details?: false | ((args_0: VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[] | undefined) | undefined;
    } | undefined;
    modelValue?: any;
    prependIcon?: string | undefined;
    appendIcon?: string | undefined;
    hint?: string | undefined;
    hideDetails?: boolean | "auto" | undefined;
}> & {
    "onClick:prepend"?: ((e: MouseEvent) => any) | undefined;
    "onClick:append"?: ((e: MouseEvent) => any) | undefined;
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'click:prepend': (e: MouseEvent) => boolean;
    'click:append': (e: MouseEvent) => boolean;
}, string, {
    error: boolean;
    density: "default" | "comfortable" | "compact" | null;
    modelValue: any;
    disabled: boolean;
    readonly: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    focused: boolean;
    messages: string | unknown[];
    persistentHint: boolean;
}> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & (new <T>() => {
    $slots: MakeSlots<{
        default: [VInputSlot];
        prepend: [VInputSlot];
        append: [VInputSlot];
        details: [VInputSlot];
    }>;
});
declare type VInput = InstanceType<typeof VInput>;

interface DefaultInputSlot {
    isActive: boolean;
    isDirty: boolean;
    isFocused: boolean;
    inputRef: Ref<HTMLInputElement | undefined>;
    controlRef: Ref<HTMLElement | undefined>;
    focus: () => void;
    blur: () => void;
}
interface VFieldSlot extends DefaultInputSlot, VInputSlot {
    props: Record<string, unknown>;
}
declare const VField: {
    new (...args: any[]): {
        $: vue.ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            error: boolean;
            reverse: boolean;
            loading: boolean;
            density: "default" | "comfortable" | "compact" | null;
            active: boolean;
            disabled: boolean;
            variant: "filled" | "contained" | "outlined" | "plain" | "underlined";
            readonly: boolean;
            errorMessages: string | string[];
            maxErrors: string | number;
            rules: ValidationRule[];
            focused: boolean;
            messages: string | unknown[];
            persistentHint: boolean;
            clearable: boolean;
            clearIcon: string;
            persistentClear: boolean;
            singleLine: boolean;
            dirty: boolean;
        }> & Omit<Readonly<{
            error?: unknown;
            reverse?: unknown;
            name?: unknown;
            theme?: unknown;
            label?: unknown;
            id?: unknown;
            loading?: unknown;
            density?: unknown;
            color?: unknown;
            active?: unknown;
            disabled?: unknown;
            variant?: unknown;
            prependIcon?: unknown;
            appendIcon?: unknown;
            bgColor?: unknown;
            readonly?: unknown;
            errorMessages?: unknown;
            maxErrors?: unknown;
            rules?: unknown;
            focused?: unknown;
            hint?: unknown;
            messages?: unknown;
            persistentHint?: unknown;
            hideDetails?: unknown;
            appendInnerIcon?: unknown;
            clearable?: unknown;
            clearIcon?: unknown;
            persistentClear?: unknown;
            prependInnerIcon?: unknown;
            singleLine?: unknown;
            dirty?: unknown;
            'v-slots'?: unknown;
        } & {
            error: boolean;
            reverse: boolean;
            loading: boolean;
            density: "default" | "comfortable" | "compact" | null;
            active: boolean;
            disabled: boolean;
            variant: "filled" | "contained" | "outlined" | "plain" | "underlined";
            readonly: boolean;
            errorMessages: string | string[];
            maxErrors: string | number;
            rules: ValidationRule[];
            focused: boolean;
            messages: string | unknown[];
            persistentHint: boolean;
            clearable: boolean;
            clearIcon: string;
            persistentClear: boolean;
            singleLine: boolean;
            dirty: boolean;
        } & {
            name?: string | undefined;
            theme?: string | undefined;
            label?: string | undefined;
            id?: string | undefined;
            "v-slots"?: {
                prependInner?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                clear?: false | (() => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                appendInner?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                label?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                prepend?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                append?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                details?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                loader?: false | ((args_0: {
                    color: string | undefined;
                    isActive: boolean;
                }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                default?: false | ((args_0: VFieldSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
            } | undefined;
            color?: string | undefined;
            prependIcon?: string | undefined;
            appendIcon?: string | undefined;
            bgColor?: string | undefined;
            hint?: string | undefined;
            hideDetails?: boolean | "auto" | undefined;
            appendInnerIcon?: string | undefined;
            prependInnerIcon?: string | undefined;
        }> & {
            "onUpdate:active"?: ((active: boolean) => any) | undefined;
            "onClick:clear"?: ((e: Event) => any) | undefined;
            "onClick:prepend-inner"?: ((e: MouseEvent) => any) | undefined;
            "onClick:append-inner"?: ((e: MouseEvent) => any) | undefined;
            "onClick:control"?: ((props: DefaultInputSlot) => any) | undefined;
        } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "error" | "reverse" | "loading" | "density" | "active" | "disabled" | "variant" | "readonly" | "errorMessages" | "maxErrors" | "rules" | "focused" | "messages" | "persistentHint" | "clearable" | "clearIcon" | "persistentClear" | "singleLine" | "dirty">;
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
        $emit: ((event: "update:active", active: boolean) => void) & ((event: "click:clear", e: Event) => void) & ((event: "click:prepend-inner", e: MouseEvent) => void) & ((event: "click:append-inner", e: MouseEvent) => void) & ((event: "click:control", props: DefaultInputSlot) => void);
        $el: any;
        $options: vue.ComponentOptionsBase<Readonly<{
            error?: unknown;
            reverse?: unknown;
            name?: unknown;
            theme?: unknown;
            label?: unknown;
            id?: unknown;
            loading?: unknown;
            density?: unknown;
            color?: unknown;
            active?: unknown;
            disabled?: unknown;
            variant?: unknown;
            prependIcon?: unknown;
            appendIcon?: unknown;
            bgColor?: unknown;
            readonly?: unknown;
            errorMessages?: unknown;
            maxErrors?: unknown;
            rules?: unknown;
            focused?: unknown;
            hint?: unknown;
            messages?: unknown;
            persistentHint?: unknown;
            hideDetails?: unknown;
            appendInnerIcon?: unknown;
            clearable?: unknown;
            clearIcon?: unknown;
            persistentClear?: unknown;
            prependInnerIcon?: unknown;
            singleLine?: unknown;
            dirty?: unknown;
            'v-slots'?: unknown;
        } & {
            error: boolean;
            reverse: boolean;
            loading: boolean;
            density: "default" | "comfortable" | "compact" | null;
            active: boolean;
            disabled: boolean;
            variant: "filled" | "contained" | "outlined" | "plain" | "underlined";
            readonly: boolean;
            errorMessages: string | string[];
            maxErrors: string | number;
            rules: ValidationRule[];
            focused: boolean;
            messages: string | unknown[];
            persistentHint: boolean;
            clearable: boolean;
            clearIcon: string;
            persistentClear: boolean;
            singleLine: boolean;
            dirty: boolean;
        } & {
            name?: string | undefined;
            theme?: string | undefined;
            label?: string | undefined;
            id?: string | undefined;
            "v-slots"?: {
                prependInner?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                clear?: false | (() => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                appendInner?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                label?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                prepend?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                append?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                details?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                loader?: false | ((args_0: {
                    color: string | undefined;
                    isActive: boolean;
                }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                default?: false | ((args_0: VFieldSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
            } | undefined;
            color?: string | undefined;
            prependIcon?: string | undefined;
            appendIcon?: string | undefined;
            bgColor?: string | undefined;
            hint?: string | undefined;
            hideDetails?: boolean | "auto" | undefined;
            appendInnerIcon?: string | undefined;
            prependInnerIcon?: string | undefined;
        }> & {
            "onUpdate:active"?: ((active: boolean) => any) | undefined;
            "onClick:clear"?: ((e: Event) => any) | undefined;
            "onClick:prepend-inner"?: ((e: MouseEvent) => any) | undefined;
            "onClick:append-inner"?: ((e: MouseEvent) => any) | undefined;
            "onClick:control"?: ((props: DefaultInputSlot) => any) | undefined;
        }, {
            inputRef: Ref<HTMLInputElement | undefined>;
            controlRef: Ref<HTMLElement | undefined>;
        }, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Omit<{
            'click:clear': (e: Event) => boolean;
            'click:prepend-inner': (e: MouseEvent) => boolean;
            'click:append-inner': (e: MouseEvent) => boolean;
            'click:control': (props: DefaultInputSlot) => boolean;
            'update:active': (active: boolean) => boolean;
            'update:modelValue': (val: any) => boolean;
        }, "update:modelValue" | "modelValue">, string, {
            error: boolean;
            reverse: boolean;
            loading: boolean;
            density: "default" | "comfortable" | "compact" | null;
            active: boolean;
            disabled: boolean;
            variant: "filled" | "contained" | "outlined" | "plain" | "underlined";
            readonly: boolean;
            errorMessages: string | string[];
            maxErrors: string | number;
            rules: ValidationRule[];
            focused: boolean;
            messages: string | unknown[];
            persistentHint: boolean;
            clearable: boolean;
            clearIcon: string;
            persistentClear: boolean;
            singleLine: boolean;
            dirty: boolean;
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
        error?: unknown;
        reverse?: unknown;
        name?: unknown;
        theme?: unknown;
        label?: unknown;
        id?: unknown;
        loading?: unknown;
        density?: unknown;
        color?: unknown;
        active?: unknown;
        disabled?: unknown;
        variant?: unknown;
        prependIcon?: unknown;
        appendIcon?: unknown;
        bgColor?: unknown;
        readonly?: unknown;
        errorMessages?: unknown;
        maxErrors?: unknown;
        rules?: unknown;
        focused?: unknown;
        hint?: unknown;
        messages?: unknown;
        persistentHint?: unknown;
        hideDetails?: unknown;
        appendInnerIcon?: unknown;
        clearable?: unknown;
        clearIcon?: unknown;
        persistentClear?: unknown;
        prependInnerIcon?: unknown;
        singleLine?: unknown;
        dirty?: unknown;
        'v-slots'?: unknown;
    } & {
        error: boolean;
        reverse: boolean;
        loading: boolean;
        density: "default" | "comfortable" | "compact" | null;
        active: boolean;
        disabled: boolean;
        variant: "filled" | "contained" | "outlined" | "plain" | "underlined";
        readonly: boolean;
        errorMessages: string | string[];
        maxErrors: string | number;
        rules: ValidationRule[];
        focused: boolean;
        messages: string | unknown[];
        persistentHint: boolean;
        clearable: boolean;
        clearIcon: string;
        persistentClear: boolean;
        singleLine: boolean;
        dirty: boolean;
    } & {
        name?: string | undefined;
        theme?: string | undefined;
        label?: string | undefined;
        id?: string | undefined;
        "v-slots"?: {
            prependInner?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
            clear?: false | (() => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
            appendInner?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
            label?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
            prepend?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
            append?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
            details?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
            loader?: false | ((args_0: {
                color: string | undefined;
                isActive: boolean;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
            default?: false | ((args_0: VFieldSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
        } | undefined;
        color?: string | undefined;
        prependIcon?: string | undefined;
        appendIcon?: string | undefined;
        bgColor?: string | undefined;
        hint?: string | undefined;
        hideDetails?: boolean | "auto" | undefined;
        appendInnerIcon?: string | undefined;
        prependInnerIcon?: string | undefined;
    }> & {
        "onUpdate:active"?: ((active: boolean) => any) | undefined;
        "onClick:clear"?: ((e: Event) => any) | undefined;
        "onClick:prepend-inner"?: ((e: MouseEvent) => any) | undefined;
        "onClick:append-inner"?: ((e: MouseEvent) => any) | undefined;
        "onClick:control"?: ((props: DefaultInputSlot) => any) | undefined;
    } & vue.ShallowUnwrapRef<{
        inputRef: Ref<HTMLInputElement | undefined>;
        controlRef: Ref<HTMLElement | undefined>;
    }> & {} & {} & vue.ComponentCustomProperties;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & vue.ComponentOptionsBase<Readonly<{
    error?: unknown;
    reverse?: unknown;
    name?: unknown;
    theme?: unknown;
    label?: unknown;
    id?: unknown;
    loading?: unknown;
    density?: unknown;
    color?: unknown;
    active?: unknown;
    disabled?: unknown;
    variant?: unknown;
    prependIcon?: unknown;
    appendIcon?: unknown;
    bgColor?: unknown;
    readonly?: unknown;
    errorMessages?: unknown;
    maxErrors?: unknown;
    rules?: unknown;
    focused?: unknown;
    hint?: unknown;
    messages?: unknown;
    persistentHint?: unknown;
    hideDetails?: unknown;
    appendInnerIcon?: unknown;
    clearable?: unknown;
    clearIcon?: unknown;
    persistentClear?: unknown;
    prependInnerIcon?: unknown;
    singleLine?: unknown;
    dirty?: unknown;
    'v-slots'?: unknown;
} & {
    error: boolean;
    reverse: boolean;
    loading: boolean;
    density: "default" | "comfortable" | "compact" | null;
    active: boolean;
    disabled: boolean;
    variant: "filled" | "contained" | "outlined" | "plain" | "underlined";
    readonly: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    focused: boolean;
    messages: string | unknown[];
    persistentHint: boolean;
    clearable: boolean;
    clearIcon: string;
    persistentClear: boolean;
    singleLine: boolean;
    dirty: boolean;
} & {
    name?: string | undefined;
    theme?: string | undefined;
    label?: string | undefined;
    id?: string | undefined;
    "v-slots"?: {
        prependInner?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[] | undefined) | undefined;
        clear?: false | (() => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[] | undefined) | undefined;
        appendInner?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[] | undefined) | undefined;
        label?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[] | undefined) | undefined;
        prepend?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[] | undefined) | undefined;
        append?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[] | undefined) | undefined;
        details?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[] | undefined) | undefined;
        loader?: false | ((args_0: {
            color: string | undefined;
            isActive: boolean;
        }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[] | undefined) | undefined;
        default?: false | ((args_0: VFieldSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[] | undefined) | undefined;
    } | undefined;
    color?: string | undefined;
    prependIcon?: string | undefined;
    appendIcon?: string | undefined;
    bgColor?: string | undefined;
    hint?: string | undefined;
    hideDetails?: boolean | "auto" | undefined;
    appendInnerIcon?: string | undefined;
    prependInnerIcon?: string | undefined;
}> & {
    "onUpdate:active"?: ((active: boolean) => any) | undefined;
    "onClick:clear"?: ((e: Event) => any) | undefined;
    "onClick:prepend-inner"?: ((e: MouseEvent) => any) | undefined;
    "onClick:append-inner"?: ((e: MouseEvent) => any) | undefined;
    "onClick:control"?: ((props: DefaultInputSlot) => any) | undefined;
}, {
    inputRef: Ref<HTMLInputElement | undefined>;
    controlRef: Ref<HTMLElement | undefined>;
}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Omit<{
    'click:clear': (e: Event) => boolean;
    'click:prepend-inner': (e: MouseEvent) => boolean;
    'click:append-inner': (e: MouseEvent) => boolean;
    'click:control': (props: DefaultInputSlot) => boolean;
    'update:active': (active: boolean) => boolean;
    'update:modelValue': (val: any) => boolean;
}, "update:modelValue" | "modelValue">, string, {
    error: boolean;
    reverse: boolean;
    loading: boolean;
    density: "default" | "comfortable" | "compact" | null;
    active: boolean;
    disabled: boolean;
    variant: "filled" | "contained" | "outlined" | "plain" | "underlined";
    readonly: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    focused: boolean;
    messages: string | unknown[];
    persistentHint: boolean;
    clearable: boolean;
    clearIcon: string;
    persistentClear: boolean;
    singleLine: boolean;
    dirty: boolean;
}> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & (new <T>() => {
    $props: {
        modelValue?: T | undefined;
        'onUpdate:modelValue'?: ((val: T) => any) | undefined;
    };
    $slots: MakeSlots<{
        prependInner: [DefaultInputSlot & VInputSlot];
        clear: [];
        appendInner: [DefaultInputSlot & VInputSlot];
        label: [DefaultInputSlot & VInputSlot];
        prepend: [DefaultInputSlot & VInputSlot];
        append: [DefaultInputSlot & VInputSlot];
        details: [DefaultInputSlot & VInputSlot];
        loader: [
            {
                color: string | undefined;
                isActive: boolean;
            }
        ];
        default: [VFieldSlot];
    }>;
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
    prependIcon: {
        type: StringConstructor;
        default: string;
    };
    modelValue: {
        type: PropType<File[] | undefined>;
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
    appendIcon: StringConstructor;
    focused: BooleanConstructor;
    hideDetails: PropType<boolean | "auto">;
    hint: StringConstructor;
    messages: {
        type: (ArrayConstructor | StringConstructor)[];
        default: () => never[];
    };
    persistentHint: BooleanConstructor;
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
    id: StringConstructor;
    label: StringConstructor;
    persistentClear: BooleanConstructor;
    prependInnerIcon: StringConstructor;
    reverse: BooleanConstructor;
    singleLine: BooleanConstructor;
    variant: {
        type: PropType<"filled" | "contained" | "outlined" | "plain" | "underlined">;
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
    showSize: {
        type: PropType<boolean | 1000 | 1024>;
        default: boolean;
        validator: (v: boolean | number) => boolean;
    };
}, {
    fieldRef: vue.Ref<({
        $: vue.ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            error: boolean;
            reverse: boolean;
            loading: boolean;
            density: "default" | "comfortable" | "compact" | null;
            active: boolean;
            disabled: boolean;
            variant: "filled" | "contained" | "outlined" | "plain" | "underlined";
            readonly: boolean;
            errorMessages: string | string[];
            maxErrors: string | number;
            rules: ValidationRule[];
            focused: boolean;
            messages: string | unknown[];
            persistentHint: boolean;
            clearable: boolean;
            clearIcon: string;
            persistentClear: boolean;
            singleLine: boolean;
            dirty: boolean;
        }> & Omit<Readonly<{
            error?: unknown;
            reverse?: unknown;
            name?: unknown;
            theme?: unknown;
            label?: unknown;
            id?: unknown;
            loading?: unknown;
            density?: unknown;
            color?: unknown;
            active?: unknown;
            disabled?: unknown;
            variant?: unknown;
            prependIcon?: unknown;
            appendIcon?: unknown;
            bgColor?: unknown;
            readonly?: unknown;
            errorMessages?: unknown;
            maxErrors?: unknown;
            rules?: unknown;
            focused?: unknown;
            hint?: unknown;
            messages?: unknown;
            persistentHint?: unknown;
            hideDetails?: unknown;
            appendInnerIcon?: unknown;
            clearable?: unknown;
            clearIcon?: unknown;
            persistentClear?: unknown;
            prependInnerIcon?: unknown;
            singleLine?: unknown;
            dirty?: unknown;
            'v-slots'?: unknown;
        } & {
            error: boolean;
            reverse: boolean;
            loading: boolean;
            density: "default" | "comfortable" | "compact" | null;
            active: boolean;
            disabled: boolean;
            variant: "filled" | "contained" | "outlined" | "plain" | "underlined";
            readonly: boolean;
            errorMessages: string | string[];
            maxErrors: string | number;
            rules: ValidationRule[];
            focused: boolean;
            messages: string | unknown[];
            persistentHint: boolean;
            clearable: boolean;
            clearIcon: string;
            persistentClear: boolean;
            singleLine: boolean;
            dirty: boolean;
        } & {
            name?: string | undefined;
            theme?: string | undefined;
            label?: string | undefined;
            id?: string | undefined;
            "v-slots"?: {
                prependInner?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                clear?: false | (() => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                appendInner?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                label?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                prepend?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                append?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                details?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                loader?: false | ((args_0: {
                    color: string | undefined;
                    isActive: boolean;
                }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                default?: false | ((args_0: VFieldSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
            } | undefined;
            color?: string | undefined;
            prependIcon?: string | undefined;
            appendIcon?: string | undefined;
            bgColor?: string | undefined;
            hint?: string | undefined;
            hideDetails?: boolean | "auto" | undefined;
            appendInnerIcon?: string | undefined;
            prependInnerIcon?: string | undefined;
        }> & {
            "onUpdate:active"?: ((active: boolean) => any) | undefined;
            "onClick:clear"?: ((e: Event) => any) | undefined;
            "onClick:prepend-inner"?: ((e: MouseEvent) => any) | undefined;
            "onClick:append-inner"?: ((e: MouseEvent) => any) | undefined;
            "onClick:control"?: ((props: DefaultInputSlot) => any) | undefined;
        } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "error" | "reverse" | "loading" | "density" | "active" | "disabled" | "variant" | "readonly" | "errorMessages" | "maxErrors" | "rules" | "focused" | "messages" | "persistentHint" | "clearable" | "clearIcon" | "persistentClear" | "singleLine" | "dirty">;
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
        $emit: ((event: "update:active", active: boolean) => void) & ((event: "click:clear", e: Event) => void) & ((event: "click:prepend-inner", e: MouseEvent) => void) & ((event: "click:append-inner", e: MouseEvent) => void) & ((event: "click:control", props: DefaultInputSlot) => void);
        $el: any;
        $options: vue.ComponentOptionsBase<Readonly<{
            error?: unknown;
            reverse?: unknown;
            name?: unknown;
            theme?: unknown;
            label?: unknown;
            id?: unknown;
            loading?: unknown;
            density?: unknown;
            color?: unknown;
            active?: unknown;
            disabled?: unknown;
            variant?: unknown;
            prependIcon?: unknown;
            appendIcon?: unknown;
            bgColor?: unknown;
            readonly?: unknown;
            errorMessages?: unknown;
            maxErrors?: unknown;
            rules?: unknown;
            focused?: unknown;
            hint?: unknown;
            messages?: unknown;
            persistentHint?: unknown;
            hideDetails?: unknown;
            appendInnerIcon?: unknown;
            clearable?: unknown;
            clearIcon?: unknown;
            persistentClear?: unknown;
            prependInnerIcon?: unknown;
            singleLine?: unknown;
            dirty?: unknown;
            'v-slots'?: unknown;
        } & {
            error: boolean;
            reverse: boolean;
            loading: boolean;
            density: "default" | "comfortable" | "compact" | null;
            active: boolean;
            disabled: boolean;
            variant: "filled" | "contained" | "outlined" | "plain" | "underlined";
            readonly: boolean;
            errorMessages: string | string[];
            maxErrors: string | number;
            rules: ValidationRule[];
            focused: boolean;
            messages: string | unknown[];
            persistentHint: boolean;
            clearable: boolean;
            clearIcon: string;
            persistentClear: boolean;
            singleLine: boolean;
            dirty: boolean;
        } & {
            name?: string | undefined;
            theme?: string | undefined;
            label?: string | undefined;
            id?: string | undefined;
            "v-slots"?: {
                prependInner?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                clear?: false | (() => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                appendInner?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                label?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                prepend?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                append?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                details?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                loader?: false | ((args_0: {
                    color: string | undefined;
                    isActive: boolean;
                }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                default?: false | ((args_0: VFieldSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
            } | undefined;
            color?: string | undefined;
            prependIcon?: string | undefined;
            appendIcon?: string | undefined;
            bgColor?: string | undefined;
            hint?: string | undefined;
            hideDetails?: boolean | "auto" | undefined;
            appendInnerIcon?: string | undefined;
            prependInnerIcon?: string | undefined;
        }> & {
            "onUpdate:active"?: ((active: boolean) => any) | undefined;
            "onClick:clear"?: ((e: Event) => any) | undefined;
            "onClick:prepend-inner"?: ((e: MouseEvent) => any) | undefined;
            "onClick:append-inner"?: ((e: MouseEvent) => any) | undefined;
            "onClick:control"?: ((props: DefaultInputSlot) => any) | undefined;
        }, {
            inputRef: vue.Ref<HTMLInputElement | undefined>;
            controlRef: vue.Ref<HTMLElement | undefined>;
        }, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Omit<{
            'click:clear': (e: Event) => boolean;
            'click:prepend-inner': (e: MouseEvent) => boolean;
            'click:append-inner': (e: MouseEvent) => boolean;
            'click:control': (props: DefaultInputSlot) => boolean;
            'update:active': (active: boolean) => boolean;
            'update:modelValue': (val: any) => boolean;
        }, "update:modelValue" | "modelValue">, string, {
            error: boolean;
            reverse: boolean;
            loading: boolean;
            density: "default" | "comfortable" | "compact" | null;
            active: boolean;
            disabled: boolean;
            variant: "filled" | "contained" | "outlined" | "plain" | "underlined";
            readonly: boolean;
            errorMessages: string | string[];
            maxErrors: string | number;
            rules: ValidationRule[];
            focused: boolean;
            messages: string | unknown[];
            persistentHint: boolean;
            clearable: boolean;
            clearIcon: string;
            persistentClear: boolean;
            singleLine: boolean;
            dirty: boolean;
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
        error?: unknown;
        reverse?: unknown;
        name?: unknown;
        theme?: unknown;
        label?: unknown;
        id?: unknown;
        loading?: unknown;
        density?: unknown;
        color?: unknown;
        active?: unknown;
        disabled?: unknown;
        variant?: unknown;
        prependIcon?: unknown;
        appendIcon?: unknown;
        bgColor?: unknown;
        readonly?: unknown;
        errorMessages?: unknown;
        maxErrors?: unknown;
        rules?: unknown;
        focused?: unknown;
        hint?: unknown;
        messages?: unknown;
        persistentHint?: unknown;
        hideDetails?: unknown;
        appendInnerIcon?: unknown;
        clearable?: unknown;
        clearIcon?: unknown;
        persistentClear?: unknown;
        prependInnerIcon?: unknown;
        singleLine?: unknown;
        dirty?: unknown;
        'v-slots'?: unknown;
    } & {
        error: boolean;
        reverse: boolean;
        loading: boolean;
        density: "default" | "comfortable" | "compact" | null;
        active: boolean;
        disabled: boolean;
        variant: "filled" | "contained" | "outlined" | "plain" | "underlined";
        readonly: boolean;
        errorMessages: string | string[];
        maxErrors: string | number;
        rules: ValidationRule[];
        focused: boolean;
        messages: string | unknown[];
        persistentHint: boolean;
        clearable: boolean;
        clearIcon: string;
        persistentClear: boolean;
        singleLine: boolean;
        dirty: boolean;
    } & {
        name?: string | undefined;
        theme?: string | undefined;
        label?: string | undefined;
        id?: string | undefined;
        "v-slots"?: {
            prependInner?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
            clear?: false | (() => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
            appendInner?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
            label?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
            prepend?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
            append?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
            details?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
            loader?: false | ((args_0: {
                color: string | undefined;
                isActive: boolean;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
            default?: false | ((args_0: VFieldSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
        } | undefined;
        color?: string | undefined;
        prependIcon?: string | undefined;
        appendIcon?: string | undefined;
        bgColor?: string | undefined;
        hint?: string | undefined;
        hideDetails?: boolean | "auto" | undefined;
        appendInnerIcon?: string | undefined;
        prependInnerIcon?: string | undefined;
    }> & {
        "onUpdate:active"?: ((active: boolean) => any) | undefined;
        "onClick:clear"?: ((e: Event) => any) | undefined;
        "onClick:prepend-inner"?: ((e: MouseEvent) => any) | undefined;
        "onClick:append-inner"?: ((e: MouseEvent) => any) | undefined;
        "onClick:control"?: ((props: DefaultInputSlot) => any) | undefined;
    } & vue.ShallowUnwrapRef<{
        inputRef: vue.Ref<HTMLInputElement | undefined>;
        controlRef: vue.Ref<HTMLElement | undefined>;
    }> & {} & {} & vue.ComponentCustomProperties & {
        $props: {
            modelValue?: unknown;
            'onUpdate:modelValue'?: ((val: unknown) => any) | undefined;
        };
        $slots: MakeSlots<{
            prependInner: [DefaultInputSlot & VInputSlot];
            clear: [];
            appendInner: [DefaultInputSlot & VInputSlot];
            label: [DefaultInputSlot & VInputSlot];
            prepend: [DefaultInputSlot & VInputSlot];
            append: [DefaultInputSlot & VInputSlot];
            details: [DefaultInputSlot & VInputSlot];
            loader: [{
                color: string | undefined;
                isActive: boolean;
            }];
            default: [VFieldSlot];
        }>;
    }) | undefined>;
    focus: () => void;
    blur: () => void;
    click: () => void;
}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (files: File[]) => true;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
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
    appendIcon?: unknown;
    focused?: unknown;
    hideDetails?: unknown;
    hint?: unknown;
    messages?: unknown;
    persistentHint?: unknown;
    loading?: unknown;
    theme?: unknown;
    appendInnerIcon?: unknown;
    bgColor?: unknown;
    clearable?: unknown;
    clearIcon?: unknown;
    color?: unknown;
    id?: unknown;
    label?: unknown;
    persistentClear?: unknown;
    prependInnerIcon?: unknown;
    reverse?: unknown;
    singleLine?: unknown;
    variant?: unknown;
    chips?: unknown;
    counter?: unknown;
    counterSizeString?: unknown;
    counterString?: unknown;
    multiple?: unknown;
    showSize?: unknown;
} & {
    error: boolean;
    reverse: boolean;
    counter: boolean;
    loading: boolean;
    density: "default" | "comfortable" | "compact" | null;
    modelValue: File[] | undefined;
    multiple: boolean;
    disabled: boolean;
    variant: "filled" | "contained" | "outlined" | "plain" | "underlined";
    prependIcon: string;
    readonly: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    focused: boolean;
    messages: string | unknown[];
    persistentHint: boolean;
    clearable: boolean;
    clearIcon: string;
    persistentClear: boolean;
    singleLine: boolean;
    chips: boolean;
    counterSizeString: string;
    counterString: string;
    showSize: boolean | 1000 | 1024;
} & {
    name?: string | undefined;
    theme?: string | undefined;
    label?: string | undefined;
    id?: string | undefined;
    color?: string | undefined;
    appendIcon?: string | undefined;
    bgColor?: string | undefined;
    hint?: string | undefined;
    hideDetails?: boolean | "auto" | undefined;
    appendInnerIcon?: string | undefined;
    prependInnerIcon?: string | undefined;
}> & {
    "onUpdate:modelValue"?: ((files: File[]) => any) | undefined;
}, {
    error: boolean;
    reverse: boolean;
    counter: boolean;
    loading: boolean;
    density: "default" | "comfortable" | "compact" | null;
    modelValue: File[] | undefined;
    multiple: boolean;
    disabled: boolean;
    variant: "filled" | "contained" | "outlined" | "plain" | "underlined";
    prependIcon: string;
    readonly: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    focused: boolean;
    messages: string | unknown[];
    persistentHint: boolean;
    clearable: boolean;
    clearIcon: string;
    persistentClear: boolean;
    singleLine: boolean;
    chips: boolean;
    counterSizeString: string;
    counterString: string;
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
    tile: BooleanConstructor;
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
    tile?: unknown;
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
    tile: boolean;
} & {
    width?: string | number | undefined;
    height?: string | number | undefined;
    left?: string | number | boolean | undefined;
    right?: string | number | boolean | undefined;
    theme?: string | undefined;
    top?: string | number | boolean | undefined;
    bottom?: string | number | boolean | undefined;
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
    tile: boolean;
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
    submit: (e: Event) => Promise<void>;
    reset: (e: Event) => Promise<void>;
    resetValidation: () => Promise<void>;
}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (val: boolean | null) => true;
    resetValidation: () => true;
    reset: (e: Event) => true;
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
    onReset?: ((e: Event) => any) | undefined;
    onSubmit?: ((e: Event) => any) | undefined;
    "onUpdate:modelValue"?: ((val: boolean | null) => any) | undefined;
    onResetValidation?: (() => any) | undefined;
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
}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, ("loadstart" | "load" | "error")[], "error" | "loadstart" | "load", vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
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
    options: IntersectionObserverInit;
    transition: string | false | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    });
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
    options: IntersectionObserverInit;
    transition: string | false | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    });
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

declare const VItem: vue.DefineComponent<{
    value: {
        type: (ObjectConstructor | StringConstructor | NumberConstructor | BooleanConstructor)[];
        default: undefined;
    };
    disabled: BooleanConstructor;
    selectedClass: StringConstructor;
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>[] | undefined, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    value?: unknown;
    disabled?: unknown;
    selectedClass?: unknown;
} & {
    disabled: boolean;
} & {
    value?: string | number | boolean | Record<string, any> | undefined;
    selectedClass?: string | undefined;
}>, {
    value: string | number | boolean | Record<string, any>;
    disabled: boolean;
}>;

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
        type: NumberConstructor;
        default: number;
    };
    absolute: BooleanConstructor;
    position: {
        type: PropType<"left" | "right" | "top" | "bottom">;
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
    priority: number;
    absolute: boolean;
    position: "left" | "right" | "top" | "bottom";
    modelValue: boolean;
    size: string | number;
} & {
    name?: string | undefined;
}>, {
    priority: number;
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
    options: IntersectionObserverInit;
    transition: string | false | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    });
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
    options: IntersectionObserverInit;
    transition: string | false | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    });
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

declare type ListGroupHeaderSlot = {
    onClick: (e: Event) => void;
    appendIcon: string;
    class: string;
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
            'v-slots'?: unknown;
        } & {
            tag: string;
            expandIcon: string;
            collapseIcon: string;
        } & {
            value?: any;
            "v-slots"?: {
                header?: false | ((args_0: ListGroupHeaderSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                item?: false | ((args_0: ListItem) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                default?: false | (() => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
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
            'v-slots'?: unknown;
        } & {
            tag: string;
            expandIcon: string;
            collapseIcon: string;
        } & {
            value?: any;
            "v-slots"?: {
                header?: false | ((args_0: ListGroupHeaderSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                item?: false | ((args_0: ListItem) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                default?: false | (() => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
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
        'v-slots'?: unknown;
    } & {
        tag: string;
        expandIcon: string;
        collapseIcon: string;
    } & {
        value?: any;
        "v-slots"?: {
            header?: false | ((args_0: ListGroupHeaderSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
            item?: false | ((args_0: ListItem) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
            default?: false | (() => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
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
    'v-slots'?: unknown;
} & {
    tag: string;
    expandIcon: string;
    collapseIcon: string;
} & {
    value?: any;
    "v-slots"?: {
        header?: false | ((args_0: ListGroupHeaderSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[] | undefined) | undefined;
        item?: false | ((args_0: ListItem) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[] | undefined) | undefined;
        default?: false | (() => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[] | undefined) | undefined;
    } | undefined;
}>, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Omit<Record<string, any>, "items">, string, {
    tag: string;
    expandIcon: string;
    collapseIcon: string;
}> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & (new <T extends ListItem>() => {
    $props: {
        items?: T[] | undefined;
    };
    $slots: MakeSlots<{
        header: [ListGroupHeaderSlot];
        item: [T];
        default: [];
    }>;
});

declare type ListItem = {
    children?: ListItem[];
    value?: string;
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
            tile: boolean;
            disabled: boolean;
            lines: string;
            selectStrategy: SelectStrategy | ("single-leaf" & {}) | ("leaf" & {}) | ("independent" & {}) | ("classic" & {});
            openStrategy: OpenStrategy | ("multiple" & {}) | ("single" & {});
            activeStrategy: ActiveStrategy | ("multiple" & {}) | ("single" & {});
            subheader: string | boolean;
        }> & Omit<Readonly<{
            width?: unknown;
            height?: unknown;
            tag?: unknown;
            theme?: unknown;
            nav?: unknown;
            maxHeight?: unknown;
            maxWidth?: unknown;
            minHeight?: unknown;
            minWidth?: unknown;
            border?: unknown;
            density?: unknown;
            elevation?: unknown;
            rounded?: unknown;
            tile?: unknown;
            color?: unknown;
            active?: unknown;
            disabled?: unknown;
            lines?: unknown;
            selected?: unknown;
            opened?: unknown;
            selectStrategy?: unknown;
            openStrategy?: unknown;
            activeStrategy?: unknown;
            subheader?: unknown;
            'v-slots'?: unknown;
        } & {
            tag: string;
            nav: boolean;
            density: "default" | "comfortable" | "compact" | null;
            tile: boolean;
            disabled: boolean;
            lines: string;
            selectStrategy: SelectStrategy | ("single-leaf" & {}) | ("leaf" & {}) | ("independent" & {}) | ("classic" & {});
            openStrategy: OpenStrategy | ("multiple" & {}) | ("single" & {});
            activeStrategy: ActiveStrategy | ("multiple" & {}) | ("single" & {});
            subheader: string | boolean;
        } & {
            width?: string | number | undefined;
            height?: string | number | undefined;
            theme?: string | undefined;
            maxHeight?: string | number | undefined;
            maxWidth?: string | number | undefined;
            minHeight?: string | number | undefined;
            minWidth?: string | number | undefined;
            "v-slots"?: {
                subheader?: false | (() => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                header?: false | ((args_0: ListGroupHeaderSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                item?: false | ((args_0: unknown) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
            } | undefined;
            border?: string | number | boolean | undefined;
            elevation?: string | number | undefined;
            rounded?: string | number | boolean | undefined;
            color?: string | undefined;
            active?: string[] | undefined;
            selected?: string[] | undefined;
            opened?: string[] | undefined;
        }> & {
            "onUpdate:active"?: ((val: string[]) => any) | undefined;
            "onUpdate:selected"?: ((val: string[]) => any) | undefined;
            "onUpdate:opened"?: ((val: string[]) => any) | undefined;
        } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "tag" | "nav" | "density" | "rounded" | "tile" | "disabled" | "lines" | "selectStrategy" | "openStrategy" | "activeStrategy" | "subheader">;
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
            maxHeight?: unknown;
            maxWidth?: unknown;
            minHeight?: unknown;
            minWidth?: unknown;
            border?: unknown;
            density?: unknown;
            elevation?: unknown;
            rounded?: unknown;
            tile?: unknown;
            color?: unknown;
            active?: unknown;
            disabled?: unknown;
            lines?: unknown;
            selected?: unknown;
            opened?: unknown;
            selectStrategy?: unknown;
            openStrategy?: unknown;
            activeStrategy?: unknown;
            subheader?: unknown;
            'v-slots'?: unknown;
        } & {
            tag: string;
            nav: boolean;
            density: "default" | "comfortable" | "compact" | null;
            tile: boolean;
            disabled: boolean;
            lines: string;
            selectStrategy: SelectStrategy | ("single-leaf" & {}) | ("leaf" & {}) | ("independent" & {}) | ("classic" & {});
            openStrategy: OpenStrategy | ("multiple" & {}) | ("single" & {});
            activeStrategy: ActiveStrategy | ("multiple" & {}) | ("single" & {});
            subheader: string | boolean;
        } & {
            width?: string | number | undefined;
            height?: string | number | undefined;
            theme?: string | undefined;
            maxHeight?: string | number | undefined;
            maxWidth?: string | number | undefined;
            minHeight?: string | number | undefined;
            minWidth?: string | number | undefined;
            "v-slots"?: {
                subheader?: false | (() => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                header?: false | ((args_0: ListGroupHeaderSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                item?: false | ((args_0: unknown) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
            } | undefined;
            border?: string | number | boolean | undefined;
            elevation?: string | number | undefined;
            rounded?: string | number | boolean | undefined;
            color?: string | undefined;
            active?: string[] | undefined;
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
            tile: boolean;
            disabled: boolean;
            lines: string;
            selectStrategy: SelectStrategy | ("single-leaf" & {}) | ("leaf" & {}) | ("independent" & {}) | ("classic" & {});
            openStrategy: OpenStrategy | ("multiple" & {}) | ("single" & {});
            activeStrategy: ActiveStrategy | ("multiple" & {}) | ("single" & {});
            subheader: string | boolean;
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
        maxHeight?: unknown;
        maxWidth?: unknown;
        minHeight?: unknown;
        minWidth?: unknown;
        border?: unknown;
        density?: unknown;
        elevation?: unknown;
        rounded?: unknown;
        tile?: unknown;
        color?: unknown;
        active?: unknown;
        disabled?: unknown;
        lines?: unknown;
        selected?: unknown;
        opened?: unknown;
        selectStrategy?: unknown;
        openStrategy?: unknown;
        activeStrategy?: unknown;
        subheader?: unknown;
        'v-slots'?: unknown;
    } & {
        tag: string;
        nav: boolean;
        density: "default" | "comfortable" | "compact" | null;
        tile: boolean;
        disabled: boolean;
        lines: string;
        selectStrategy: SelectStrategy | ("single-leaf" & {}) | ("leaf" & {}) | ("independent" & {}) | ("classic" & {});
        openStrategy: OpenStrategy | ("multiple" & {}) | ("single" & {});
        activeStrategy: ActiveStrategy | ("multiple" & {}) | ("single" & {});
        subheader: string | boolean;
    } & {
        width?: string | number | undefined;
        height?: string | number | undefined;
        theme?: string | undefined;
        maxHeight?: string | number | undefined;
        maxWidth?: string | number | undefined;
        minHeight?: string | number | undefined;
        minWidth?: string | number | undefined;
        "v-slots"?: {
            subheader?: false | (() => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
            header?: false | ((args_0: ListGroupHeaderSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
            item?: false | ((args_0: unknown) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
        } | undefined;
        border?: string | number | boolean | undefined;
        elevation?: string | number | undefined;
        rounded?: string | number | boolean | undefined;
        color?: string | undefined;
        active?: string[] | undefined;
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
    maxHeight?: unknown;
    maxWidth?: unknown;
    minHeight?: unknown;
    minWidth?: unknown;
    border?: unknown;
    density?: unknown;
    elevation?: unknown;
    rounded?: unknown;
    tile?: unknown;
    color?: unknown;
    active?: unknown;
    disabled?: unknown;
    lines?: unknown;
    selected?: unknown;
    opened?: unknown;
    selectStrategy?: unknown;
    openStrategy?: unknown;
    activeStrategy?: unknown;
    subheader?: unknown;
    'v-slots'?: unknown;
} & {
    tag: string;
    nav: boolean;
    density: "default" | "comfortable" | "compact" | null;
    tile: boolean;
    disabled: boolean;
    lines: string;
    selectStrategy: SelectStrategy | ("single-leaf" & {}) | ("leaf" & {}) | ("independent" & {}) | ("classic" & {});
    openStrategy: OpenStrategy | ("multiple" & {}) | ("single" & {});
    activeStrategy: ActiveStrategy | ("multiple" & {}) | ("single" & {});
    subheader: string | boolean;
} & {
    width?: string | number | undefined;
    height?: string | number | undefined;
    theme?: string | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
    "v-slots"?: {
        subheader?: false | (() => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[] | undefined) | undefined;
        header?: false | ((args_0: ListGroupHeaderSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[] | undefined) | undefined;
        item?: false | ((args_0: unknown) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[] | undefined) | undefined;
    } | undefined;
    border?: string | number | boolean | undefined;
    elevation?: string | number | undefined;
    rounded?: string | number | boolean | undefined;
    color?: string | undefined;
    active?: string[] | undefined;
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
    tile: boolean;
    disabled: boolean;
    lines: string;
    selectStrategy: SelectStrategy | ("single-leaf" & {}) | ("leaf" & {}) | ("independent" & {}) | ("classic" & {});
    openStrategy: OpenStrategy | ("multiple" & {}) | ("single" & {});
    activeStrategy: ActiveStrategy | ("multiple" & {}) | ("single" & {});
    subheader: string | boolean;
}> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & (new <T>() => {
    $props: {
        items?: T[] | undefined;
    };
    $slots: MakeSlots<{
        subheader: [];
        header: [ListGroupHeaderSlot];
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
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    tag?: unknown;
    color?: unknown;
    inset?: unknown;
} & {
    tag: string;
    inset: boolean;
} & {
    color?: string | undefined;
}>, {
    tag: string;
    inset: boolean;
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
declare const VListItem: {
    new (...args: any[]): {
        $: vue.ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            replace: boolean;
            link: boolean;
            tag: string;
            density: "default" | "comfortable" | "compact" | null;
            rounded: string | number | boolean;
            tile: boolean;
            active: boolean;
            disabled: boolean;
            variant: "text" | "contained" | "outlined" | "plain" | "contained-text";
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
            tile?: unknown;
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
            'v-slots'?: unknown;
        } & {
            replace: boolean;
            link: boolean;
            tag: string;
            density: "default" | "comfortable" | "compact" | null;
            tile: boolean;
            active: boolean;
            disabled: boolean;
            variant: "text" | "contained" | "outlined" | "plain" | "contained-text";
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
            "v-slots"?: {
                prepend?: false | ((args_0: ListItemSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                append?: false | ((args_0: ListItemSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                default?: false | ((args_0: ListItemSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                title?: false | (() => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                subtitle?: false | (() => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
            } | undefined;
            border?: string | number | boolean | undefined;
            elevation?: string | number | undefined;
            rounded?: string | number | boolean | undefined;
            color?: string | undefined;
            to?: vue_router.RouteLocationRaw | undefined;
            href?: string | undefined;
            textColor?: string | undefined;
            prependIcon?: string | undefined;
            appendIcon?: string | undefined;
            activeClass?: string | undefined;
            activeColor?: string | undefined;
            appendAvatar?: string | undefined;
            prependAvatar?: string | undefined;
            subtitle?: string | undefined;
        }> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "replace" | "link" | "tag" | "density" | "rounded" | "tile" | "active" | "disabled" | "variant">;
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
            tile?: unknown;
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
            'v-slots'?: unknown;
        } & {
            replace: boolean;
            link: boolean;
            tag: string;
            density: "default" | "comfortable" | "compact" | null;
            tile: boolean;
            active: boolean;
            disabled: boolean;
            variant: "text" | "contained" | "outlined" | "plain" | "contained-text";
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
            "v-slots"?: {
                prepend?: false | ((args_0: ListItemSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                append?: false | ((args_0: ListItemSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                default?: false | ((args_0: ListItemSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                title?: false | (() => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                subtitle?: false | (() => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
            } | undefined;
            border?: string | number | boolean | undefined;
            elevation?: string | number | undefined;
            rounded?: string | number | boolean | undefined;
            color?: string | undefined;
            to?: vue_router.RouteLocationRaw | undefined;
            href?: string | undefined;
            textColor?: string | undefined;
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
            density: "default" | "comfortable" | "compact" | null;
            rounded: string | number | boolean;
            tile: boolean;
            active: boolean;
            disabled: boolean;
            variant: "text" | "contained" | "outlined" | "plain" | "contained-text";
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
        tile?: unknown;
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
        'v-slots'?: unknown;
    } & {
        replace: boolean;
        link: boolean;
        tag: string;
        density: "default" | "comfortable" | "compact" | null;
        tile: boolean;
        active: boolean;
        disabled: boolean;
        variant: "text" | "contained" | "outlined" | "plain" | "contained-text";
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
        "v-slots"?: {
            prepend?: false | ((args_0: ListItemSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
            append?: false | ((args_0: ListItemSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
            default?: false | ((args_0: ListItemSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
            title?: false | (() => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
            subtitle?: false | (() => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
        } | undefined;
        border?: string | number | boolean | undefined;
        elevation?: string | number | undefined;
        rounded?: string | number | boolean | undefined;
        color?: string | undefined;
        to?: vue_router.RouteLocationRaw | undefined;
        href?: string | undefined;
        textColor?: string | undefined;
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
    tile?: unknown;
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
    'v-slots'?: unknown;
} & {
    replace: boolean;
    link: boolean;
    tag: string;
    density: "default" | "comfortable" | "compact" | null;
    tile: boolean;
    active: boolean;
    disabled: boolean;
    variant: "text" | "contained" | "outlined" | "plain" | "contained-text";
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
    "v-slots"?: {
        prepend?: false | ((args_0: ListItemSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[] | undefined) | undefined;
        append?: false | ((args_0: ListItemSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[] | undefined) | undefined;
        default?: false | ((args_0: ListItemSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[] | undefined) | undefined;
        title?: false | (() => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[] | undefined) | undefined;
        subtitle?: false | (() => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[] | undefined) | undefined;
    } | undefined;
    border?: string | number | boolean | undefined;
    elevation?: string | number | undefined;
    rounded?: string | number | boolean | undefined;
    color?: string | undefined;
    to?: vue_router.RouteLocationRaw | undefined;
    href?: string | undefined;
    textColor?: string | undefined;
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
    density: "default" | "comfortable" | "compact" | null;
    rounded: string | number | boolean;
    tile: boolean;
    active: boolean;
    disabled: boolean;
    variant: "text" | "contained" | "outlined" | "plain" | "contained-text";
}> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & (new () => {
    $slots: MakeSlots<{
        prepend: [ListItemSlot];
        append: [ListItemSlot];
        default: [ListItemSlot];
        title: [];
        subtitle: [];
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
    fallbackLocale?: string | undefined;
    rtl?: boolean | undefined;
    messages?: Record<string, any> | undefined;
    locale?: string | undefined;
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
            "v-slots"?: {
                default?: false | ((args_0: {
                    isActive: vue.Ref<boolean>;
                }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                activator?: false | ((args_0: {
                    isActive: boolean;
                    props: Dictionary<any>;
                }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
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
            "v-slots"?: {
                default?: false | ((args_0: {
                    isActive: vue.Ref<boolean>;
                }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                activator?: false | ((args_0: {
                    isActive: boolean;
                    props: Dictionary<any>;
                }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
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
        "v-slots"?: {
            default?: false | ((args_0: {
                isActive: vue.Ref<boolean>;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
            activator?: false | ((args_0: {
                isActive: boolean;
                props: Dictionary<any>;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
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
    "v-slots"?: {
        default?: false | ((args_0: {
            isActive: vue.Ref<boolean>;
        }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[] | undefined) | undefined;
        activator?: false | ((args_0: {
            isActive: boolean;
            props: Dictionary<any>;
        }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[] | undefined) | undefined;
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
            group: boolean;
        };
    };
    active: BooleanConstructor;
    value: {
        type: (ArrayConstructor | StringConstructor)[];
        default: () => never[];
    };
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    transition?: unknown;
    active?: unknown;
    value?: unknown;
} & {
    value: string | unknown[];
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
        group: boolean;
    };
    active: boolean;
} & {}>, {
    value: string | unknown[];
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
    tile: BooleanConstructor;
    name: {
        type: StringConstructor;
    };
    priority: {
        type: NumberConstructor;
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
    tile?: unknown;
    name?: unknown;
    priority?: unknown;
    absolute?: unknown;
    elevation?: unknown;
    border?: unknown;
    color?: unknown;
    disableResizeWatcher?: unknown;
    expandOnHover?: unknown;
    floating?: unknown;
    modelValue?: unknown;
    permanent?: unknown;
    rail?: unknown;
    railWidth?: unknown;
    image?: unknown;
    temporary?: unknown;
    width?: unknown;
    position?: unknown;
} & {
    width: string | number;
    tag: string;
    priority: number;
    absolute: boolean;
    position: "left" | "right" | "bottom";
    tile: boolean;
    floating: boolean;
    modelValue: boolean;
    disableResizeWatcher: boolean;
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
    priority: number;
    absolute: boolean;
    position: "left" | "right" | "bottom";
    rounded: string | number | boolean;
    tile: boolean;
    floating: boolean;
    modelValue: boolean;
    disableResizeWatcher: boolean;
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
        type: vue.PropType<"text" | "contained" | "outlined" | "plain" | "contained-text">;
        default: string;
        validator: (v: any) => boolean;
    }, "default" | "type"> & {
        type: vue.PropType<"text" | "contained" | "outlined" | "plain" | "contained-text">;
        default: "text" | "contained" | "outlined" | "plain" | "contained-text";
    };
    theme: StringConstructor;
    border: (StringConstructor | NumberConstructor | BooleanConstructor)[];
    size: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    rounded: {
        type: (StringConstructor | NumberConstructor | BooleanConstructor)[];
        default: undefined;
    };
    tile: BooleanConstructor;
    density: {
        type: vue.PropType<"default" | "comfortable" | "compact" | null>;
        default: string;
        validator: (v: any) => boolean;
    };
    elevation: {
        type: (StringConstructor | NumberConstructor)[];
        validator(v: any): boolean;
    };
    tag: Omit<{
        type: StringConstructor;
        default: string;
    }, "default" | "type"> & {
        type: vue.PropType<string>;
        default: string;
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
    border?: unknown;
    size?: unknown;
    rounded?: unknown;
    tile?: unknown;
    density?: unknown;
    elevation?: unknown;
    tag?: unknown;
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
    tile: boolean;
    modelValue: number;
    start: string | number;
    ellipsis: string;
    size: string | number;
    disabled: boolean;
    variant: "text" | "contained" | "outlined" | "plain" | "contained-text";
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
    tile: boolean;
    modelValue: number;
    start: string | number;
    ellipsis: string;
    size: string | number;
    disabled: boolean;
    variant: "text" | "contained" | "outlined" | "plain" | "contained-text";
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

declare const VPaginationBtn: vue.DefineComponent<{
    color: StringConstructor;
    textColor: StringConstructor;
    variant: Omit<{
        type: vue.PropType<"text" | "contained" | "outlined" | "plain" | "contained-text">;
        default: string;
        validator: (v: any) => boolean;
    }, "default" | "type"> & {
        type: vue.PropType<"text" | "contained" | "outlined" | "plain" | "contained-text">;
        default: "text" | "contained" | "outlined" | "plain" | "contained-text";
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
    tile: BooleanConstructor;
    border: (StringConstructor | NumberConstructor | BooleanConstructor)[];
    flat: BooleanConstructor;
    icon: (StringConstructor | BooleanConstructor)[];
    prependIcon: StringConstructor;
    appendIcon: StringConstructor;
    block: BooleanConstructor;
    stacked: BooleanConstructor;
    disabled: BooleanConstructor;
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
    elevation?: unknown;
    height?: unknown;
    maxHeight?: unknown;
    maxWidth?: unknown;
    minHeight?: unknown;
    minWidth?: unknown;
    width?: unknown;
    density?: unknown;
    rounded?: unknown;
    tile?: unknown;
    border?: unknown;
    flat?: unknown;
    icon?: unknown;
    prependIcon?: unknown;
    appendIcon?: unknown;
    block?: unknown;
    stacked?: unknown;
    disabled?: unknown;
    ripple?: unknown;
} & {
    replace: boolean;
    fixed: boolean;
    flat: boolean;
    tag: string;
    absolute: boolean;
    density: "default" | "comfortable" | "compact" | null;
    tile: boolean;
    size: string | number;
    block: boolean;
    disabled: boolean;
    variant: "text" | "contained" | "outlined" | "plain" | "contained-text";
    stacked: boolean;
    ripple: boolean;
} & {
    width?: string | number | undefined;
    height?: string | number | undefined;
    left?: string | number | boolean | undefined;
    right?: string | number | boolean | undefined;
    theme?: string | undefined;
    top?: string | number | boolean | undefined;
    bottom?: string | number | boolean | undefined;
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
    to?: vue_router.RouteLocationRaw | undefined;
    href?: string | undefined;
    textColor?: string | undefined;
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
    tile: boolean;
    size: string | number;
    block: boolean;
    disabled: boolean;
    variant: "text" | "contained" | "outlined" | "plain" | "contained-text";
    stacked: boolean;
    ripple: boolean;
}>;

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
    tile: BooleanConstructor;
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
    tile?: unknown;
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
    tile: boolean;
    modelValue: string | number;
    active: boolean;
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
    rounded: string | number | boolean;
    tile: boolean;
    modelValue: string | number;
    active: boolean;
    max: string | number;
    indeterminate: boolean;
    bufferValue: string | number;
    clickable: boolean;
    stream: boolean;
    striped: boolean;
    roundedBar: boolean;
}>;

declare const VRadioGroup: vue.DefineComponent<{
    height: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    label: StringConstructor;
    id: StringConstructor;
    inline: BooleanConstructor;
    onIcon: {
        type: StringConstructor;
        default: string;
    };
    offIcon: {
        type: StringConstructor;
        default: string;
    };
    type: {
        type: StringConstructor;
        default: string;
    };
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    height?: unknown;
    label?: unknown;
    id?: unknown;
    inline?: unknown;
    onIcon?: unknown;
    offIcon?: unknown;
    type?: unknown;
} & {
    height: string | number;
    type: string;
    inline: boolean;
    offIcon: string;
    onIcon: string;
} & {
    label?: string | undefined;
    id?: string | undefined;
}>, {
    height: string | number;
    type: string;
    inline: boolean;
    offIcon: string;
    onIcon: string;
}>;

declare const VRadio: vue.DefineComponent<{
    offIcon: {
        type: StringConstructor;
        default: string;
    };
    onIcon: {
        type: StringConstructor;
        default: string;
    };
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    offIcon?: unknown;
    onIcon?: unknown;
} & {
    offIcon: string;
    onIcon: string;
} & {}>, {
    offIcon: string;
    onIcon: string;
}>;
declare type VRadio = InstanceType<typeof VRadio>;

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

declare const VSelectionControlGroup: vue.DefineComponent<{
    disabled: BooleanConstructor;
    id: StringConstructor;
    inline: BooleanConstructor;
    name: StringConstructor;
    offIcon: StringConstructor;
    onIcon: StringConstructor;
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
    offIcon?: unknown;
    onIcon?: unknown;
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
    name?: string | undefined;
    type?: string | undefined;
    id?: string | undefined;
    modelValue?: any;
    offIcon?: string | undefined;
    onIcon?: string | undefined;
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
            readonly error?: unknown;
            readonly name?: unknown;
            readonly value?: unknown;
            readonly type?: unknown;
            readonly theme?: unknown;
            readonly label?: unknown;
            readonly id?: unknown;
            readonly density?: unknown;
            readonly color?: unknown;
            readonly inline?: unknown;
            readonly multiple?: unknown;
            readonly disabled?: unknown;
            readonly ripple?: unknown;
            readonly readonly?: unknown;
            readonly offIcon?: unknown;
            readonly onIcon?: unknown;
            readonly trueValue?: unknown;
            readonly falseValue?: unknown;
            readonly valueComparator?: unknown;
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
            name?: string | undefined;
            value?: any;
            type?: string | undefined;
            theme?: string | undefined;
            label?: string | undefined;
            id?: string | undefined;
            "v-slots"?: {
                default?: false | (() => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                input?: false | ((args_0: SelectionControlSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
            } | undefined;
            color?: string | undefined;
            offIcon?: string | undefined;
            onIcon?: string | undefined;
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
            readonly error?: unknown;
            readonly name?: unknown;
            readonly value?: unknown;
            readonly type?: unknown;
            readonly theme?: unknown;
            readonly label?: unknown;
            readonly id?: unknown;
            readonly density?: unknown;
            readonly color?: unknown;
            readonly inline?: unknown;
            readonly multiple?: unknown;
            readonly disabled?: unknown;
            readonly ripple?: unknown;
            readonly readonly?: unknown;
            readonly offIcon?: unknown;
            readonly onIcon?: unknown;
            readonly trueValue?: unknown;
            readonly falseValue?: unknown;
            readonly valueComparator?: unknown;
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
            name?: string | undefined;
            value?: any;
            type?: string | undefined;
            theme?: string | undefined;
            label?: string | undefined;
            id?: string | undefined;
            "v-slots"?: {
                default?: false | (() => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                input?: false | ((args_0: SelectionControlSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
            } | undefined;
            color?: string | undefined;
            offIcon?: string | undefined;
            onIcon?: string | undefined;
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
        readonly error?: unknown;
        readonly name?: unknown;
        readonly value?: unknown;
        readonly type?: unknown;
        readonly theme?: unknown;
        readonly label?: unknown;
        readonly id?: unknown;
        readonly density?: unknown;
        readonly color?: unknown;
        readonly inline?: unknown;
        readonly multiple?: unknown;
        readonly disabled?: unknown;
        readonly ripple?: unknown;
        readonly readonly?: unknown;
        readonly offIcon?: unknown;
        readonly onIcon?: unknown;
        readonly trueValue?: unknown;
        readonly falseValue?: unknown;
        readonly valueComparator?: unknown;
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
        name?: string | undefined;
        value?: any;
        type?: string | undefined;
        theme?: string | undefined;
        label?: string | undefined;
        id?: string | undefined;
        "v-slots"?: {
            default?: false | (() => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
            input?: false | ((args_0: SelectionControlSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
        } | undefined;
        color?: string | undefined;
        offIcon?: string | undefined;
        onIcon?: string | undefined;
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
    readonly error?: unknown;
    readonly name?: unknown;
    readonly value?: unknown;
    readonly type?: unknown;
    readonly theme?: unknown;
    readonly label?: unknown;
    readonly id?: unknown;
    readonly density?: unknown;
    readonly color?: unknown;
    readonly inline?: unknown;
    readonly multiple?: unknown;
    readonly disabled?: unknown;
    readonly ripple?: unknown;
    readonly readonly?: unknown;
    readonly offIcon?: unknown;
    readonly onIcon?: unknown;
    readonly trueValue?: unknown;
    readonly falseValue?: unknown;
    readonly valueComparator?: unknown;
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
    name?: string | undefined;
    value?: any;
    type?: string | undefined;
    theme?: string | undefined;
    label?: string | undefined;
    id?: string | undefined;
    "v-slots"?: {
        default?: false | (() => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[] | undefined) | undefined;
        input?: false | ((args_0: SelectionControlSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[] | undefined) | undefined;
    } | undefined;
    color?: string | undefined;
    offIcon?: string | undefined;
    onIcon?: string | undefined;
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
    tile: BooleanConstructor;
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
    tile?: unknown;
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
    tile: boolean;
    color: string;
} & {
    width?: string | number | undefined;
    height?: string | number | undefined;
    left?: string | number | boolean | undefined;
    right?: string | number | boolean | undefined;
    theme?: string | undefined;
    top?: string | number | boolean | undefined;
    bottom?: string | number | boolean | undefined;
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
    tile: boolean;
    color: string;
}>;

declare const VSwitch: vue.DefineComponent<{
    indeterminate: BooleanConstructor;
    inset: BooleanConstructor;
    loading: (StringConstructor | BooleanConstructor)[];
    flat: BooleanConstructor;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:indeterminate': (val: boolean) => true;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    indeterminate?: unknown;
    inset?: unknown;
    loading?: unknown;
    flat?: unknown;
} & {
    flat: boolean;
    inset: boolean;
    indeterminate: boolean;
} & {
    loading?: string | boolean | undefined;
}> & {
    "onUpdate:indeterminate"?: ((val: boolean) => any) | undefined;
}, {
    flat: boolean;
    inset: boolean;
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
    tile: BooleanConstructor;
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
    tile?: unknown;
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
    tile: boolean;
    lightsOut: boolean;
    window: boolean;
} & {
    width?: string | number | undefined;
    height?: string | number | undefined;
    left?: string | number | boolean | undefined;
    right?: string | number | boolean | undefined;
    theme?: string | undefined;
    top?: string | number | boolean | undefined;
    bottom?: string | number | boolean | undefined;
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
    tile: boolean;
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
    modelValue: {
        type: null;
        default: any;
    };
    density: {
        type: PropType<"default" | "comfortable" | "compact" | null>;
        default: string;
        validator: (v: any) => boolean;
    };
    appendIcon: StringConstructor;
    prependIcon: StringConstructor;
    focused: BooleanConstructor;
    hideDetails: PropType<boolean | "auto">;
    hint: StringConstructor;
    messages: {
        type: (ArrayConstructor | StringConstructor)[];
        default: () => never[];
    };
    persistentHint: BooleanConstructor;
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
    id: StringConstructor;
    label: StringConstructor;
    persistentClear: BooleanConstructor;
    prependInnerIcon: StringConstructor;
    reverse: BooleanConstructor;
    singleLine: BooleanConstructor;
    variant: {
        type: PropType<"filled" | "contained" | "outlined" | "plain" | "underlined">;
        default: string;
        validator: (v: any) => boolean;
    };
    autoGrow: BooleanConstructor;
    autofocus: BooleanConstructor;
    counter: PropType<string | number | true>;
    counterValue: PropType<(value: any) => number>;
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
}, {
    fieldRef: vue.Ref<({
        $: vue.ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            error: boolean;
            reverse: boolean;
            loading: boolean;
            density: "default" | "comfortable" | "compact" | null;
            active: boolean;
            disabled: boolean;
            variant: "filled" | "contained" | "outlined" | "plain" | "underlined";
            readonly: boolean;
            errorMessages: string | string[];
            maxErrors: string | number;
            rules: ValidationRule[];
            focused: boolean;
            messages: string | unknown[];
            persistentHint: boolean;
            clearable: boolean;
            clearIcon: string;
            persistentClear: boolean;
            singleLine: boolean;
            dirty: boolean;
        }> & Omit<Readonly<{
            error?: unknown;
            reverse?: unknown;
            name?: unknown;
            theme?: unknown;
            label?: unknown;
            id?: unknown;
            loading?: unknown;
            density?: unknown;
            color?: unknown;
            active?: unknown;
            disabled?: unknown;
            variant?: unknown;
            prependIcon?: unknown;
            appendIcon?: unknown;
            bgColor?: unknown;
            readonly?: unknown;
            errorMessages?: unknown;
            maxErrors?: unknown;
            rules?: unknown;
            focused?: unknown;
            hint?: unknown;
            messages?: unknown;
            persistentHint?: unknown;
            hideDetails?: unknown;
            appendInnerIcon?: unknown;
            clearable?: unknown;
            clearIcon?: unknown;
            persistentClear?: unknown;
            prependInnerIcon?: unknown;
            singleLine?: unknown;
            dirty?: unknown;
            'v-slots'?: unknown;
        } & {
            error: boolean;
            reverse: boolean;
            loading: boolean;
            density: "default" | "comfortable" | "compact" | null;
            active: boolean;
            disabled: boolean;
            variant: "filled" | "contained" | "outlined" | "plain" | "underlined";
            readonly: boolean;
            errorMessages: string | string[];
            maxErrors: string | number;
            rules: ValidationRule[];
            focused: boolean;
            messages: string | unknown[];
            persistentHint: boolean;
            clearable: boolean;
            clearIcon: string;
            persistentClear: boolean;
            singleLine: boolean;
            dirty: boolean;
        } & {
            name?: string | undefined;
            theme?: string | undefined;
            label?: string | undefined;
            id?: string | undefined;
            "v-slots"?: {
                prependInner?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                clear?: false | (() => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                appendInner?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                label?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                prepend?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                append?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                details?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                loader?: false | ((args_0: {
                    color: string | undefined;
                    isActive: boolean;
                }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                default?: false | ((args_0: VFieldSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
            } | undefined;
            color?: string | undefined;
            prependIcon?: string | undefined;
            appendIcon?: string | undefined;
            bgColor?: string | undefined;
            hint?: string | undefined;
            hideDetails?: boolean | "auto" | undefined;
            appendInnerIcon?: string | undefined;
            prependInnerIcon?: string | undefined;
        }> & {
            "onUpdate:active"?: ((active: boolean) => any) | undefined;
            "onClick:clear"?: ((e: Event) => any) | undefined;
            "onClick:prepend-inner"?: ((e: MouseEvent) => any) | undefined;
            "onClick:append-inner"?: ((e: MouseEvent) => any) | undefined;
            "onClick:control"?: ((props: DefaultInputSlot) => any) | undefined;
        } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "error" | "reverse" | "loading" | "density" | "active" | "disabled" | "variant" | "readonly" | "errorMessages" | "maxErrors" | "rules" | "focused" | "messages" | "persistentHint" | "clearable" | "clearIcon" | "persistentClear" | "singleLine" | "dirty">;
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
        $emit: ((event: "update:active", active: boolean) => void) & ((event: "click:clear", e: Event) => void) & ((event: "click:prepend-inner", e: MouseEvent) => void) & ((event: "click:append-inner", e: MouseEvent) => void) & ((event: "click:control", props: DefaultInputSlot) => void);
        $el: any;
        $options: vue.ComponentOptionsBase<Readonly<{
            error?: unknown;
            reverse?: unknown;
            name?: unknown;
            theme?: unknown;
            label?: unknown;
            id?: unknown;
            loading?: unknown;
            density?: unknown;
            color?: unknown;
            active?: unknown;
            disabled?: unknown;
            variant?: unknown;
            prependIcon?: unknown;
            appendIcon?: unknown;
            bgColor?: unknown;
            readonly?: unknown;
            errorMessages?: unknown;
            maxErrors?: unknown;
            rules?: unknown;
            focused?: unknown;
            hint?: unknown;
            messages?: unknown;
            persistentHint?: unknown;
            hideDetails?: unknown;
            appendInnerIcon?: unknown;
            clearable?: unknown;
            clearIcon?: unknown;
            persistentClear?: unknown;
            prependInnerIcon?: unknown;
            singleLine?: unknown;
            dirty?: unknown;
            'v-slots'?: unknown;
        } & {
            error: boolean;
            reverse: boolean;
            loading: boolean;
            density: "default" | "comfortable" | "compact" | null;
            active: boolean;
            disabled: boolean;
            variant: "filled" | "contained" | "outlined" | "plain" | "underlined";
            readonly: boolean;
            errorMessages: string | string[];
            maxErrors: string | number;
            rules: ValidationRule[];
            focused: boolean;
            messages: string | unknown[];
            persistentHint: boolean;
            clearable: boolean;
            clearIcon: string;
            persistentClear: boolean;
            singleLine: boolean;
            dirty: boolean;
        } & {
            name?: string | undefined;
            theme?: string | undefined;
            label?: string | undefined;
            id?: string | undefined;
            "v-slots"?: {
                prependInner?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                clear?: false | (() => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                appendInner?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                label?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                prepend?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                append?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                details?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                loader?: false | ((args_0: {
                    color: string | undefined;
                    isActive: boolean;
                }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                default?: false | ((args_0: VFieldSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
            } | undefined;
            color?: string | undefined;
            prependIcon?: string | undefined;
            appendIcon?: string | undefined;
            bgColor?: string | undefined;
            hint?: string | undefined;
            hideDetails?: boolean | "auto" | undefined;
            appendInnerIcon?: string | undefined;
            prependInnerIcon?: string | undefined;
        }> & {
            "onUpdate:active"?: ((active: boolean) => any) | undefined;
            "onClick:clear"?: ((e: Event) => any) | undefined;
            "onClick:prepend-inner"?: ((e: MouseEvent) => any) | undefined;
            "onClick:append-inner"?: ((e: MouseEvent) => any) | undefined;
            "onClick:control"?: ((props: DefaultInputSlot) => any) | undefined;
        }, {
            inputRef: vue.Ref<HTMLInputElement | undefined>;
            controlRef: vue.Ref<HTMLElement | undefined>;
        }, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Omit<{
            'click:clear': (e: Event) => boolean;
            'click:prepend-inner': (e: MouseEvent) => boolean;
            'click:append-inner': (e: MouseEvent) => boolean;
            'click:control': (props: DefaultInputSlot) => boolean;
            'update:active': (active: boolean) => boolean;
            'update:modelValue': (val: any) => boolean;
        }, "update:modelValue" | "modelValue">, string, {
            error: boolean;
            reverse: boolean;
            loading: boolean;
            density: "default" | "comfortable" | "compact" | null;
            active: boolean;
            disabled: boolean;
            variant: "filled" | "contained" | "outlined" | "plain" | "underlined";
            readonly: boolean;
            errorMessages: string | string[];
            maxErrors: string | number;
            rules: ValidationRule[];
            focused: boolean;
            messages: string | unknown[];
            persistentHint: boolean;
            clearable: boolean;
            clearIcon: string;
            persistentClear: boolean;
            singleLine: boolean;
            dirty: boolean;
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
        error?: unknown;
        reverse?: unknown;
        name?: unknown;
        theme?: unknown;
        label?: unknown;
        id?: unknown;
        loading?: unknown;
        density?: unknown;
        color?: unknown;
        active?: unknown;
        disabled?: unknown;
        variant?: unknown;
        prependIcon?: unknown;
        appendIcon?: unknown;
        bgColor?: unknown;
        readonly?: unknown;
        errorMessages?: unknown;
        maxErrors?: unknown;
        rules?: unknown;
        focused?: unknown;
        hint?: unknown;
        messages?: unknown;
        persistentHint?: unknown;
        hideDetails?: unknown;
        appendInnerIcon?: unknown;
        clearable?: unknown;
        clearIcon?: unknown;
        persistentClear?: unknown;
        prependInnerIcon?: unknown;
        singleLine?: unknown;
        dirty?: unknown;
        'v-slots'?: unknown;
    } & {
        error: boolean;
        reverse: boolean;
        loading: boolean;
        density: "default" | "comfortable" | "compact" | null;
        active: boolean;
        disabled: boolean;
        variant: "filled" | "contained" | "outlined" | "plain" | "underlined";
        readonly: boolean;
        errorMessages: string | string[];
        maxErrors: string | number;
        rules: ValidationRule[];
        focused: boolean;
        messages: string | unknown[];
        persistentHint: boolean;
        clearable: boolean;
        clearIcon: string;
        persistentClear: boolean;
        singleLine: boolean;
        dirty: boolean;
    } & {
        name?: string | undefined;
        theme?: string | undefined;
        label?: string | undefined;
        id?: string | undefined;
        "v-slots"?: {
            prependInner?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
            clear?: false | (() => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
            appendInner?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
            label?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
            prepend?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
            append?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
            details?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
            loader?: false | ((args_0: {
                color: string | undefined;
                isActive: boolean;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
            default?: false | ((args_0: VFieldSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
        } | undefined;
        color?: string | undefined;
        prependIcon?: string | undefined;
        appendIcon?: string | undefined;
        bgColor?: string | undefined;
        hint?: string | undefined;
        hideDetails?: boolean | "auto" | undefined;
        appendInnerIcon?: string | undefined;
        prependInnerIcon?: string | undefined;
    }> & {
        "onUpdate:active"?: ((active: boolean) => any) | undefined;
        "onClick:clear"?: ((e: Event) => any) | undefined;
        "onClick:prepend-inner"?: ((e: MouseEvent) => any) | undefined;
        "onClick:append-inner"?: ((e: MouseEvent) => any) | undefined;
        "onClick:control"?: ((props: DefaultInputSlot) => any) | undefined;
    } & vue.ShallowUnwrapRef<{
        inputRef: vue.Ref<HTMLInputElement | undefined>;
        controlRef: vue.Ref<HTMLElement | undefined>;
    }> & {} & {} & vue.ComponentCustomProperties & {
        $props: {
            modelValue?: unknown;
            'onUpdate:modelValue'?: ((val: unknown) => any) | undefined;
        };
        $slots: MakeSlots<{
            prependInner: [DefaultInputSlot & VInputSlot];
            clear: [];
            appendInner: [DefaultInputSlot & VInputSlot];
            label: [DefaultInputSlot & VInputSlot];
            prepend: [DefaultInputSlot & VInputSlot];
            append: [DefaultInputSlot & VInputSlot];
            details: [DefaultInputSlot & VInputSlot];
            loader: [{
                color: string | undefined;
                isActive: boolean;
            }];
            default: [VFieldSlot];
        }>;
    }) | undefined>;
    focus: () => void;
    blur: () => void;
}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (val: string) => true;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    disabled?: unknown;
    error?: unknown;
    errorMessages?: unknown;
    maxErrors?: unknown;
    name?: unknown;
    readonly?: unknown;
    rules?: unknown;
    modelValue?: unknown;
    density?: unknown;
    appendIcon?: unknown;
    prependIcon?: unknown;
    focused?: unknown;
    hideDetails?: unknown;
    hint?: unknown;
    messages?: unknown;
    persistentHint?: unknown;
    loading?: unknown;
    theme?: unknown;
    appendInnerIcon?: unknown;
    bgColor?: unknown;
    clearable?: unknown;
    clearIcon?: unknown;
    color?: unknown;
    id?: unknown;
    label?: unknown;
    persistentClear?: unknown;
    prependInnerIcon?: unknown;
    reverse?: unknown;
    singleLine?: unknown;
    variant?: unknown;
    autoGrow?: unknown;
    autofocus?: unknown;
    counter?: unknown;
    counterValue?: unknown;
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
    loading: boolean;
    density: "default" | "comfortable" | "compact" | null;
    disabled: boolean;
    variant: "filled" | "contained" | "outlined" | "plain" | "underlined";
    readonly: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    focused: boolean;
    messages: string | unknown[];
    persistentHint: boolean;
    clearable: boolean;
    clearIcon: string;
    persistentClear: boolean;
    singleLine: boolean;
    autoGrow: boolean;
    autofocus: boolean;
    persistentPlaceholder: boolean;
    persistentCounter: boolean;
    noResize: boolean;
    rows: string | number;
} & {
    name?: string | undefined;
    theme?: string | undefined;
    label?: string | undefined;
    id?: string | undefined;
    counter?: string | number | true | undefined;
    placeholder?: string | undefined;
    color?: string | undefined;
    modelValue?: any;
    prependIcon?: string | undefined;
    appendIcon?: string | undefined;
    bgColor?: string | undefined;
    hint?: string | undefined;
    hideDetails?: boolean | "auto" | undefined;
    appendInnerIcon?: string | undefined;
    prependInnerIcon?: string | undefined;
    prefix?: string | undefined;
    maxRows?: string | number | undefined;
    suffix?: string | undefined;
    counterValue?: ((value: any) => number) | undefined;
}> & {
    "onUpdate:modelValue"?: ((val: string) => any) | undefined;
}, {
    error: boolean;
    reverse: boolean;
    loading: boolean;
    density: "default" | "comfortable" | "compact" | null;
    modelValue: any;
    disabled: boolean;
    variant: "filled" | "contained" | "outlined" | "plain" | "underlined";
    readonly: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    focused: boolean;
    messages: string | unknown[];
    persistentHint: boolean;
    clearable: boolean;
    clearIcon: string;
    persistentClear: boolean;
    singleLine: boolean;
    autoGrow: boolean;
    autofocus: boolean;
    persistentPlaceholder: boolean;
    persistentCounter: boolean;
    noResize: boolean;
    rows: string | number;
}>;
declare type VTextarea = InstanceType<typeof VTextarea>;

declare const VTextField: vue.DefineComponent<{
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
    modelValue: {
        type: null;
        default: any;
    };
    density: {
        type: PropType<"default" | "comfortable" | "compact" | null>;
        default: string;
        validator: (v: any) => boolean;
    };
    appendIcon: StringConstructor;
    prependIcon: StringConstructor;
    focused: BooleanConstructor;
    hideDetails: PropType<boolean | "auto">;
    hint: StringConstructor;
    messages: {
        type: (ArrayConstructor | StringConstructor)[];
        default: () => never[];
    };
    persistentHint: BooleanConstructor;
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
    id: StringConstructor;
    label: StringConstructor;
    persistentClear: BooleanConstructor;
    prependInnerIcon: StringConstructor;
    reverse: BooleanConstructor;
    singleLine: BooleanConstructor;
    variant: {
        type: PropType<"filled" | "contained" | "outlined" | "plain" | "underlined">;
        default: string;
        validator: (v: any) => boolean;
    };
    autofocus: BooleanConstructor;
    counter: PropType<string | number | true>;
    counterValue: PropType<(value: any) => number>;
    prefix: StringConstructor;
    placeholder: StringConstructor;
    persistentPlaceholder: BooleanConstructor;
    persistentCounter: BooleanConstructor;
    suffix: StringConstructor;
    type: {
        type: StringConstructor;
        default: string;
    };
}, {
    fieldRef: vue.Ref<({
        $: vue.ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            error: boolean;
            reverse: boolean;
            loading: boolean;
            density: "default" | "comfortable" | "compact" | null;
            active: boolean;
            disabled: boolean;
            variant: "filled" | "contained" | "outlined" | "plain" | "underlined";
            readonly: boolean;
            errorMessages: string | string[];
            maxErrors: string | number;
            rules: ValidationRule[];
            focused: boolean;
            messages: string | unknown[];
            persistentHint: boolean;
            clearable: boolean;
            clearIcon: string;
            persistentClear: boolean;
            singleLine: boolean;
            dirty: boolean;
        }> & Omit<Readonly<{
            error?: unknown;
            reverse?: unknown;
            name?: unknown;
            theme?: unknown;
            label?: unknown;
            id?: unknown;
            loading?: unknown;
            density?: unknown;
            color?: unknown;
            active?: unknown;
            disabled?: unknown;
            variant?: unknown;
            prependIcon?: unknown;
            appendIcon?: unknown;
            bgColor?: unknown;
            readonly?: unknown;
            errorMessages?: unknown;
            maxErrors?: unknown;
            rules?: unknown;
            focused?: unknown;
            hint?: unknown;
            messages?: unknown;
            persistentHint?: unknown;
            hideDetails?: unknown;
            appendInnerIcon?: unknown;
            clearable?: unknown;
            clearIcon?: unknown;
            persistentClear?: unknown;
            prependInnerIcon?: unknown;
            singleLine?: unknown;
            dirty?: unknown;
            'v-slots'?: unknown;
        } & {
            error: boolean;
            reverse: boolean;
            loading: boolean;
            density: "default" | "comfortable" | "compact" | null;
            active: boolean;
            disabled: boolean;
            variant: "filled" | "contained" | "outlined" | "plain" | "underlined";
            readonly: boolean;
            errorMessages: string | string[];
            maxErrors: string | number;
            rules: ValidationRule[];
            focused: boolean;
            messages: string | unknown[];
            persistentHint: boolean;
            clearable: boolean;
            clearIcon: string;
            persistentClear: boolean;
            singleLine: boolean;
            dirty: boolean;
        } & {
            name?: string | undefined;
            theme?: string | undefined;
            label?: string | undefined;
            id?: string | undefined;
            "v-slots"?: {
                prependInner?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                clear?: false | (() => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                appendInner?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                label?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                prepend?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                append?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                details?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                loader?: false | ((args_0: {
                    color: string | undefined;
                    isActive: boolean;
                }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                default?: false | ((args_0: VFieldSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
            } | undefined;
            color?: string | undefined;
            prependIcon?: string | undefined;
            appendIcon?: string | undefined;
            bgColor?: string | undefined;
            hint?: string | undefined;
            hideDetails?: boolean | "auto" | undefined;
            appendInnerIcon?: string | undefined;
            prependInnerIcon?: string | undefined;
        }> & {
            "onUpdate:active"?: ((active: boolean) => any) | undefined;
            "onClick:clear"?: ((e: Event) => any) | undefined;
            "onClick:prepend-inner"?: ((e: MouseEvent) => any) | undefined;
            "onClick:append-inner"?: ((e: MouseEvent) => any) | undefined;
            "onClick:control"?: ((props: DefaultInputSlot) => any) | undefined;
        } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "error" | "reverse" | "loading" | "density" | "active" | "disabled" | "variant" | "readonly" | "errorMessages" | "maxErrors" | "rules" | "focused" | "messages" | "persistentHint" | "clearable" | "clearIcon" | "persistentClear" | "singleLine" | "dirty">;
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
        $emit: ((event: "update:active", active: boolean) => void) & ((event: "click:clear", e: Event) => void) & ((event: "click:prepend-inner", e: MouseEvent) => void) & ((event: "click:append-inner", e: MouseEvent) => void) & ((event: "click:control", props: DefaultInputSlot) => void);
        $el: any;
        $options: vue.ComponentOptionsBase<Readonly<{
            error?: unknown;
            reverse?: unknown;
            name?: unknown;
            theme?: unknown;
            label?: unknown;
            id?: unknown;
            loading?: unknown;
            density?: unknown;
            color?: unknown;
            active?: unknown;
            disabled?: unknown;
            variant?: unknown;
            prependIcon?: unknown;
            appendIcon?: unknown;
            bgColor?: unknown;
            readonly?: unknown;
            errorMessages?: unknown;
            maxErrors?: unknown;
            rules?: unknown;
            focused?: unknown;
            hint?: unknown;
            messages?: unknown;
            persistentHint?: unknown;
            hideDetails?: unknown;
            appendInnerIcon?: unknown;
            clearable?: unknown;
            clearIcon?: unknown;
            persistentClear?: unknown;
            prependInnerIcon?: unknown;
            singleLine?: unknown;
            dirty?: unknown;
            'v-slots'?: unknown;
        } & {
            error: boolean;
            reverse: boolean;
            loading: boolean;
            density: "default" | "comfortable" | "compact" | null;
            active: boolean;
            disabled: boolean;
            variant: "filled" | "contained" | "outlined" | "plain" | "underlined";
            readonly: boolean;
            errorMessages: string | string[];
            maxErrors: string | number;
            rules: ValidationRule[];
            focused: boolean;
            messages: string | unknown[];
            persistentHint: boolean;
            clearable: boolean;
            clearIcon: string;
            persistentClear: boolean;
            singleLine: boolean;
            dirty: boolean;
        } & {
            name?: string | undefined;
            theme?: string | undefined;
            label?: string | undefined;
            id?: string | undefined;
            "v-slots"?: {
                prependInner?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                clear?: false | (() => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                appendInner?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                label?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                prepend?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                append?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                details?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                loader?: false | ((args_0: {
                    color: string | undefined;
                    isActive: boolean;
                }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                default?: false | ((args_0: VFieldSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
            } | undefined;
            color?: string | undefined;
            prependIcon?: string | undefined;
            appendIcon?: string | undefined;
            bgColor?: string | undefined;
            hint?: string | undefined;
            hideDetails?: boolean | "auto" | undefined;
            appendInnerIcon?: string | undefined;
            prependInnerIcon?: string | undefined;
        }> & {
            "onUpdate:active"?: ((active: boolean) => any) | undefined;
            "onClick:clear"?: ((e: Event) => any) | undefined;
            "onClick:prepend-inner"?: ((e: MouseEvent) => any) | undefined;
            "onClick:append-inner"?: ((e: MouseEvent) => any) | undefined;
            "onClick:control"?: ((props: DefaultInputSlot) => any) | undefined;
        }, {
            inputRef: vue.Ref<HTMLInputElement | undefined>;
            controlRef: vue.Ref<HTMLElement | undefined>;
        }, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Omit<{
            'click:clear': (e: Event) => boolean;
            'click:prepend-inner': (e: MouseEvent) => boolean;
            'click:append-inner': (e: MouseEvent) => boolean;
            'click:control': (props: DefaultInputSlot) => boolean;
            'update:active': (active: boolean) => boolean;
            'update:modelValue': (val: any) => boolean;
        }, "update:modelValue" | "modelValue">, string, {
            error: boolean;
            reverse: boolean;
            loading: boolean;
            density: "default" | "comfortable" | "compact" | null;
            active: boolean;
            disabled: boolean;
            variant: "filled" | "contained" | "outlined" | "plain" | "underlined";
            readonly: boolean;
            errorMessages: string | string[];
            maxErrors: string | number;
            rules: ValidationRule[];
            focused: boolean;
            messages: string | unknown[];
            persistentHint: boolean;
            clearable: boolean;
            clearIcon: string;
            persistentClear: boolean;
            singleLine: boolean;
            dirty: boolean;
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
        error?: unknown;
        reverse?: unknown;
        name?: unknown;
        theme?: unknown;
        label?: unknown;
        id?: unknown;
        loading?: unknown;
        density?: unknown;
        color?: unknown;
        active?: unknown;
        disabled?: unknown;
        variant?: unknown;
        prependIcon?: unknown;
        appendIcon?: unknown;
        bgColor?: unknown;
        readonly?: unknown;
        errorMessages?: unknown;
        maxErrors?: unknown;
        rules?: unknown;
        focused?: unknown;
        hint?: unknown;
        messages?: unknown;
        persistentHint?: unknown;
        hideDetails?: unknown;
        appendInnerIcon?: unknown;
        clearable?: unknown;
        clearIcon?: unknown;
        persistentClear?: unknown;
        prependInnerIcon?: unknown;
        singleLine?: unknown;
        dirty?: unknown;
        'v-slots'?: unknown;
    } & {
        error: boolean;
        reverse: boolean;
        loading: boolean;
        density: "default" | "comfortable" | "compact" | null;
        active: boolean;
        disabled: boolean;
        variant: "filled" | "contained" | "outlined" | "plain" | "underlined";
        readonly: boolean;
        errorMessages: string | string[];
        maxErrors: string | number;
        rules: ValidationRule[];
        focused: boolean;
        messages: string | unknown[];
        persistentHint: boolean;
        clearable: boolean;
        clearIcon: string;
        persistentClear: boolean;
        singleLine: boolean;
        dirty: boolean;
    } & {
        name?: string | undefined;
        theme?: string | undefined;
        label?: string | undefined;
        id?: string | undefined;
        "v-slots"?: {
            prependInner?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
            clear?: false | (() => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
            appendInner?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
            label?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
            prepend?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
            append?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
            details?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
            loader?: false | ((args_0: {
                color: string | undefined;
                isActive: boolean;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
            default?: false | ((args_0: VFieldSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
        } | undefined;
        color?: string | undefined;
        prependIcon?: string | undefined;
        appendIcon?: string | undefined;
        bgColor?: string | undefined;
        hint?: string | undefined;
        hideDetails?: boolean | "auto" | undefined;
        appendInnerIcon?: string | undefined;
        prependInnerIcon?: string | undefined;
    }> & {
        "onUpdate:active"?: ((active: boolean) => any) | undefined;
        "onClick:clear"?: ((e: Event) => any) | undefined;
        "onClick:prepend-inner"?: ((e: MouseEvent) => any) | undefined;
        "onClick:append-inner"?: ((e: MouseEvent) => any) | undefined;
        "onClick:control"?: ((props: DefaultInputSlot) => any) | undefined;
    } & vue.ShallowUnwrapRef<{
        inputRef: vue.Ref<HTMLInputElement | undefined>;
        controlRef: vue.Ref<HTMLElement | undefined>;
    }> & {} & {} & vue.ComponentCustomProperties & {
        $props: {
            modelValue?: unknown;
            'onUpdate:modelValue'?: ((val: unknown) => any) | undefined;
        };
        $slots: MakeSlots<{
            prependInner: [DefaultInputSlot & VInputSlot];
            clear: [];
            appendInner: [DefaultInputSlot & VInputSlot];
            label: [DefaultInputSlot & VInputSlot];
            prepend: [DefaultInputSlot & VInputSlot];
            append: [DefaultInputSlot & VInputSlot];
            details: [DefaultInputSlot & VInputSlot];
            loader: [{
                color: string | undefined;
                isActive: boolean;
            }];
            default: [VFieldSlot];
        }>;
    }) | undefined>;
    focus: () => void;
    blur: () => void;
}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (val: string) => true;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    disabled?: unknown;
    error?: unknown;
    errorMessages?: unknown;
    maxErrors?: unknown;
    name?: unknown;
    readonly?: unknown;
    rules?: unknown;
    modelValue?: unknown;
    density?: unknown;
    appendIcon?: unknown;
    prependIcon?: unknown;
    focused?: unknown;
    hideDetails?: unknown;
    hint?: unknown;
    messages?: unknown;
    persistentHint?: unknown;
    loading?: unknown;
    theme?: unknown;
    appendInnerIcon?: unknown;
    bgColor?: unknown;
    clearable?: unknown;
    clearIcon?: unknown;
    color?: unknown;
    id?: unknown;
    label?: unknown;
    persistentClear?: unknown;
    prependInnerIcon?: unknown;
    reverse?: unknown;
    singleLine?: unknown;
    variant?: unknown;
    autofocus?: unknown;
    counter?: unknown;
    counterValue?: unknown;
    prefix?: unknown;
    placeholder?: unknown;
    persistentPlaceholder?: unknown;
    persistentCounter?: unknown;
    suffix?: unknown;
    type?: unknown;
} & {
    error: boolean;
    reverse: boolean;
    type: string;
    loading: boolean;
    density: "default" | "comfortable" | "compact" | null;
    disabled: boolean;
    variant: "filled" | "contained" | "outlined" | "plain" | "underlined";
    readonly: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    focused: boolean;
    messages: string | unknown[];
    persistentHint: boolean;
    clearable: boolean;
    clearIcon: string;
    persistentClear: boolean;
    singleLine: boolean;
    autofocus: boolean;
    persistentPlaceholder: boolean;
    persistentCounter: boolean;
} & {
    name?: string | undefined;
    theme?: string | undefined;
    label?: string | undefined;
    id?: string | undefined;
    counter?: string | number | true | undefined;
    placeholder?: string | undefined;
    color?: string | undefined;
    modelValue?: any;
    prependIcon?: string | undefined;
    appendIcon?: string | undefined;
    bgColor?: string | undefined;
    hint?: string | undefined;
    hideDetails?: boolean | "auto" | undefined;
    appendInnerIcon?: string | undefined;
    prependInnerIcon?: string | undefined;
    prefix?: string | undefined;
    suffix?: string | undefined;
    counterValue?: ((value: any) => number) | undefined;
}> & {
    "onUpdate:modelValue"?: ((val: string) => any) | undefined;
}, {
    error: boolean;
    reverse: boolean;
    type: string;
    loading: boolean;
    density: "default" | "comfortable" | "compact" | null;
    modelValue: any;
    disabled: boolean;
    variant: "filled" | "contained" | "outlined" | "plain" | "underlined";
    readonly: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    focused: boolean;
    messages: string | unknown[];
    persistentHint: boolean;
    clearable: boolean;
    clearIcon: string;
    persistentClear: boolean;
    singleLine: boolean;
    autofocus: boolean;
    persistentPlaceholder: boolean;
    persistentCounter: boolean;
}>;
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
    side?: TimelineSide;
    direction?: TimelineDirection | undefined;
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
    tile: BooleanConstructor;
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
    tile?: unknown;
    dotColor?: unknown;
    fillDot?: unknown;
    hideDot?: unknown;
    hideOpposite?: unknown;
    icon?: unknown;
    iconColor?: unknown;
} & {
    tag: string;
    tile: boolean;
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
    tile: boolean;
    size: string | number;
    hideDot: boolean;
    fillDot: boolean;
    hideOpposite: boolean;
}>;

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
            "v-slots"?: {
                default?: false | ((args_0: {
                    isActive: vue.Ref<boolean>;
                }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                activator?: false | ((args_0: {
                    isActive: boolean;
                    props: Dictionary<any>;
                }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
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
            "v-slots"?: {
                default?: false | ((args_0: {
                    isActive: vue.Ref<boolean>;
                }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
                activator?: false | ((args_0: {
                    isActive: boolean;
                    props: Dictionary<any>;
                }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                    [key: string]: any;
                }>[] | undefined) | undefined;
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
        "v-slots"?: {
            default?: false | ((args_0: {
                isActive: vue.Ref<boolean>;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
            activator?: false | ((args_0: {
                isActive: boolean;
                props: Dictionary<any>;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[] | undefined) | undefined;
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
    "v-slots"?: {
        default?: false | ((args_0: {
            isActive: vue.Ref<boolean>;
        }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[] | undefined) | undefined;
        activator?: false | ((args_0: {
            isActive: boolean;
            props: Dictionary<any>;
        }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }> | vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[] | undefined) | undefined;
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
    modelValue: {
        type: null;
        default: any;
    };
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>[] | undefined, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
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
}>, {
    error: boolean;
    modelValue: any;
    disabled: boolean;
    readonly: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
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
type index_d$1_VAvatar = VAvatar;
type index_d$1_VBadge = VBadge;
type index_d$1_VBanner = VBanner;
declare const index_d$1_VBannerActions: typeof VBannerActions;
declare const index_d$1_VBannerAvatar: typeof VBannerAvatar;
declare const index_d$1_VBannerContent: typeof VBannerContent;
declare const index_d$1_VBannerText: typeof VBannerText;
type index_d$1_VBottomNavigation = VBottomNavigation;
type index_d$1_VBreadcrumbs = VBreadcrumbs;
declare const index_d$1_VBreadcrumbsItem: typeof VBreadcrumbsItem;
declare const index_d$1_VBreadcrumbsDivider: typeof VBreadcrumbsDivider;
type index_d$1_VBtn = VBtn;
declare const index_d$1_VBtnGroup: typeof VBtnGroup;
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
declare const index_d$1_VCode: typeof VCode;
declare const index_d$1_VCounter: typeof VCounter;
declare const index_d$1_VDefaultsProvider: typeof VDefaultsProvider;
type index_d$1_VDialog = VDialog;
declare const index_d$1_VDivider: typeof VDivider;
type index_d$1_VExpansionPanels = VExpansionPanels;
type index_d$1_VExpansionPanel = VExpansionPanel;
declare const index_d$1_VExpansionPanelText: typeof VExpansionPanelText;
declare const index_d$1_VExpansionPanelTitle: typeof VExpansionPanelTitle;
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
declare const index_d$1_VItem: typeof VItem;
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
declare const index_d$1_VPaginationBtn: typeof VPaginationBtn;
type index_d$1_VParallax = VParallax;
declare const index_d$1_VProgressCircular: typeof VProgressCircular;
declare const index_d$1_VProgressLinear: typeof VProgressLinear;
declare const index_d$1_VRadioGroup: typeof VRadioGroup;
type index_d$1_VRadio = VRadio;
type index_d$1_VRating = VRating;
declare const index_d$1_VResponsive: typeof VResponsive;
type index_d$1_VSelectionControl = VSelectionControl;
type index_d$1_VSelectionControlGroup = VSelectionControlGroup;
declare const index_d$1_VSheet: typeof VSheet;
type index_d$1_VSwitch = VSwitch;
declare const index_d$1_VSystemBar: typeof VSystemBar;
declare const index_d$1_VTable: typeof VTable;
type index_d$1_VTextarea = VTextarea;
type index_d$1_VTextField = VTextField;
declare const index_d$1_VThemeProvider: typeof VThemeProvider;
declare const index_d$1_VTimeline: typeof VTimeline;
declare const index_d$1_VTimelineItem: typeof VTimelineItem;
type index_d$1_VTooltip = VTooltip;
declare const index_d$1_VValidation: typeof VValidation;
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
    index_d$1_VPaginationBtn as VPaginationBtn,
    index_d$1_VParallax as VParallax,
    index_d$1_VProgressCircular as VProgressCircular,
    index_d$1_VProgressLinear as VProgressLinear,
    index_d$1_VRadioGroup as VRadioGroup,
    index_d$1_VRadio as VRadio,
    index_d$1_VRating as VRating,
    index_d$1_VResponsive as VResponsive,
    index_d$1_VSelectionControl as VSelectionControl,
    index_d$1_VSelectionControlGroup as VSelectionControlGroup,
    index_d$1_VSheet as VSheet,
    index_d$1_VSwitch as VSwitch,
    index_d$1_VSystemBar as VSystemBar,
    index_d$1_VTable as VTable,
    index_d$1_VTextarea as VTextarea,
    index_d$1_VTextField as VTextField,
    index_d$1_VThemeProvider as VThemeProvider,
    index_d$1_VTimeline as VTimeline,
    index_d$1_VTimelineItem as VTimelineItem,
    index_d$1_VTooltip as VTooltip,
    index_d$1_VValidation as VValidation,
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

declare const Touch: ObjectDirective;

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
    register: (id: string, priority: Ref<number>, position: Ref<Position>, layoutSize: Ref<number | string>, elementSize: Ref<number | string>, active: Ref<boolean>) => Ref<Record<string, unknown>>;
    unregister: (id: string) => void;
    mainStyles: Ref<Record<string, unknown>>;
    getLayoutItem: (id: string) => LayoutItem | undefined;
    items: Ref<LayoutItem[]>;
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

export { DisplayBreakpoint, DisplayInstance, DisplayThresholds, IconAliases, IconProps, IconSet, ThemeDefinition, index_d$1 as components, createVuetify, index_d as directives, provideRtl, useDisplay, useLayout, useRtl, useTheme, version };
