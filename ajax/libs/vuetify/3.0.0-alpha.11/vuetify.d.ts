import * as vue from 'vue';
import { PropType, Ref, JSXComponent, Prop, DirectiveBinding, ObjectDirective, ToRefs, App } from 'vue';
import * as vue_router from 'vue-router';
import { RouterLinkOptions } from 'vue-router';

declare const _default$1c: vue.DefineComponent<{
    theme: StringConstructor;
    overlaps: vue.Prop<string[], string[]>;
    fullHeight: {
        type: vue.PropType<boolean>;
        default: boolean;
    };
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    theme?: unknown;
    overlaps?: unknown;
    fullHeight?: unknown;
} & {
    fullHeight: boolean;
} & {
    theme?: string | undefined;
    overlaps?: string[] | undefined;
}> & {}, {
    fullHeight: boolean;
}>;
//# sourceMappingURL=VApp.d.ts.map

declare const _default$1b: vue.DefineComponent<{
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
    tag: string;
    flat: boolean;
    height: string | number;
    name: string;
    position: "top" | "bottom";
    density: "default" | "comfortable" | "compact" | null;
    tile: boolean;
    priority: number;
    absolute: boolean;
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
    tag: string;
    flat: boolean;
    height: string | number;
    name: string;
    position: "top" | "bottom";
    density: "default" | "comfortable" | "compact" | null;
    rounded: string | number | boolean;
    tile: boolean;
    priority: number;
    absolute: boolean;
    collapse: boolean;
    extensionHeight: string | number;
    floating: boolean;
    modelValue: boolean;
    prominent: boolean;
    prominentHeight: string | number;
}>;
//# sourceMappingURL=VAppBar.d.ts.map

declare const _default$1a: vue.DefineComponent<{
    icon: {
        type: StringConstructor;
        default: string;
    };
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    icon?: unknown;
} & {
    icon: string;
} & {}> & {}, {
    icon: string;
}>;
//# sourceMappingURL=VAppBarNavIcon.d.ts.map

declare const _default$19: vue.DefineComponent<{
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
} & {}> & {}, {
    tag: string;
}>;
//# sourceMappingURL=VAppBarTitle.d.ts.map

declare const allowedTypes: readonly ["success", "info", "warning", "error"];
declare type ContextualType = typeof allowedTypes[number];
declare const _default$18: vue.DefineComponent<{
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
        type: PropType<"fixed" | "relative" | "absolute" | "static" | "sticky">;
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
    density: "default" | "comfortable" | "compact" | null;
    tile: boolean;
    absolute: boolean;
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
    type?: "success" | "warning" | "error" | "info" | undefined;
    theme?: string | undefined;
    top?: string | number | boolean | undefined;
    left?: string | number | boolean | undefined;
    right?: string | number | boolean | undefined;
    bottom?: string | number | boolean | undefined;
    text?: string | undefined;
    position?: "fixed" | "relative" | "absolute" | "static" | "sticky" | undefined;
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
    density: "default" | "comfortable" | "compact" | null;
    rounded: string | number | boolean;
    tile: boolean;
    absolute: boolean;
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

declare const _default$17: vue.DefineComponent<{
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
    tag: string;
    left: boolean;
    right: boolean;
    density: "default" | "comfortable" | "compact" | null;
    tile: boolean;
    size: string | number;
} & {
    image?: string | undefined;
    rounded?: string | number | boolean | undefined;
    color?: string | undefined;
    icon?: string | undefined;
}> & {}, {
    tag: string;
    left: boolean;
    right: boolean;
    density: "default" | "comfortable" | "compact" | null;
    rounded: string | number | boolean;
    tile: boolean;
    size: string | number;
}>;
//# sourceMappingURL=VAvatar.d.ts.map

declare const _default$16: vue.DefineComponent<{
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
    max?: string | number | undefined;
    offsetX?: string | number | undefined;
    offsetY?: string | number | undefined;
}> & {}, {
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
//# sourceMappingURL=VBadge.d.ts.map

declare const _default$15: vue.DefineComponent<{
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
        type: vue.PropType<"fixed" | "relative" | "absolute" | "static" | "sticky">;
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
    density: "default" | "comfortable" | "compact" | null;
    tile: boolean;
    absolute: boolean;
    sticky: boolean;
    lines: string;
} & {
    theme?: string | undefined;
    top?: string | number | boolean | undefined;
    left?: string | number | boolean | undefined;
    right?: string | number | boolean | undefined;
    bottom?: string | number | boolean | undefined;
    text?: string | undefined;
    height?: string | number | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
    width?: string | number | undefined;
    position?: "fixed" | "relative" | "absolute" | "static" | "sticky" | undefined;
    border?: string | number | boolean | undefined;
    elevation?: string | number | undefined;
    rounded?: string | number | boolean | undefined;
    color?: string | undefined;
    icon?: string | undefined;
    avatar?: string | undefined;
}> & {}, {
    fixed: boolean;
    tag: string;
    density: "default" | "comfortable" | "compact" | null;
    rounded: string | number | boolean;
    tile: boolean;
    absolute: boolean;
    sticky: boolean;
    lines: string;
}>;
//# sourceMappingURL=VBanner.d.ts.map

declare const _default$14: vue.DefineComponent<{
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
} & {}> & {}, {
    tag: string;
}>;
//# sourceMappingURL=VBannerActions.d.ts.map

declare const _default$13: vue.DefineComponent<{
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
    tag: string;
    left: boolean;
    right: boolean;
} & {}> & {}, {
    tag: string;
    left: boolean;
    right: boolean;
}>;
//# sourceMappingURL=VBannerAvatar.d.ts.map

declare const _default$12: vue.DefineComponent<{
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
} & {}> & {}, {
    tag: string;
}>;
//# sourceMappingURL=VBannerContent.d.ts.map

declare const _default$11: vue.DefineComponent<{
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
} & {}> & {}, {
    tag: string;
}>;
//# sourceMappingURL=VBannerText.d.ts.map

declare const _default$10: vue.DefineComponent<{
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
    tag: string;
    height: string | number;
    name: string;
    density: "default" | "comfortable" | "compact" | null;
    tile: boolean;
    priority: number;
    absolute: boolean;
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
    tag: string;
    height: string | number;
    name: string;
    density: "default" | "comfortable" | "compact" | null;
    rounded: string | number | boolean;
    tile: boolean;
    priority: number;
    absolute: boolean;
    modelValue: boolean;
    grow: boolean;
}>;
//# sourceMappingURL=VBottomNavigation.d.ts.map

interface LinkProps extends Partial<RouterLinkOptions> {
    href?: string;
}

declare type BreadcrumbItem = string | (LinkProps & {
    text: string;
});
declare const _default$$: vue.DefineComponent<{
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
    density: "default" | "comfortable" | "compact" | null;
    tile: boolean;
    disabled: boolean;
    divider: string;
    items: BreadcrumbItem[];
} & {
    rounded?: string | number | boolean | undefined;
    color?: string | undefined;
    icon?: string | undefined;
}> & {}, {
    tag: string;
    density: "default" | "comfortable" | "compact" | null;
    rounded: string | number | boolean;
    tile: boolean;
    disabled: boolean;
    divider: string;
    items: BreadcrumbItem[];
}>;

declare const _default$_: vue.DefineComponent<{
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
}> & {}, {
    replace: boolean;
    tag: string;
    active: boolean;
    disabled: boolean;
}>;
//# sourceMappingURL=VBreadcrumbsItem.d.ts.map

declare const _default$Z: vue.DefineComponent<{
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
} & {}> & {}, {
    tag: string;
}>;
//# sourceMappingURL=VBreadcrumbsDivider.d.ts.map

declare const _default$Y: vue.DefineComponent<{
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
        type: vue.PropType<"fixed" | "relative" | "absolute" | "static" | "sticky">;
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
    tag: string;
    flat: boolean;
    density: "default" | "comfortable" | "compact" | null;
    tile: boolean;
    absolute: boolean;
    size: string | number;
    block: boolean;
    disabled: boolean;
    variant: "text" | "contained" | "outlined" | "plain" | "contained-text";
    stacked: boolean;
    ripple: boolean;
} & {
    theme?: string | undefined;
    top?: string | number | boolean | undefined;
    left?: string | number | boolean | undefined;
    right?: string | number | boolean | undefined;
    bottom?: string | number | boolean | undefined;
    height?: string | number | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
    width?: string | number | undefined;
    position?: "fixed" | "relative" | "absolute" | "static" | "sticky" | undefined;
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
}> & {}, {
    replace: boolean;
    fixed: boolean;
    tag: string;
    flat: boolean;
    density: "default" | "comfortable" | "compact" | null;
    rounded: string | number | boolean;
    tile: boolean;
    absolute: boolean;
    size: string | number;
    block: boolean;
    disabled: boolean;
    variant: "text" | "contained" | "outlined" | "plain" | "contained-text";
    stacked: boolean;
    ripple: boolean;
}>;
//# sourceMappingURL=VBtn.d.ts.map

declare const _default$X: vue.DefineComponent<{
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
        type: vue.PropType<"fixed" | "relative" | "absolute" | "static" | "sticky">;
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
    tag: string;
    flat: boolean;
    density: "default" | "comfortable" | "compact" | null;
    tile: boolean;
    absolute: boolean;
    disabled: boolean;
    variant: "text" | "contained" | "outlined" | "plain" | "contained-text";
    ripple: boolean;
    hover: boolean;
} & {
    theme?: string | undefined;
    title?: string | undefined;
    top?: string | number | boolean | undefined;
    left?: string | number | boolean | undefined;
    right?: string | number | boolean | undefined;
    bottom?: string | number | boolean | undefined;
    image?: string | undefined;
    text?: string | undefined;
    height?: string | number | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
    width?: string | number | undefined;
    position?: "fixed" | "relative" | "absolute" | "static" | "sticky" | undefined;
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
}> & {}, {
    replace: boolean;
    fixed: boolean;
    link: boolean;
    tag: string;
    flat: boolean;
    density: "default" | "comfortable" | "compact" | null;
    rounded: string | number | boolean;
    tile: boolean;
    absolute: boolean;
    disabled: boolean;
    variant: "text" | "contained" | "outlined" | "plain" | "contained-text";
    ripple: boolean;
    hover: boolean;
}>;
//# sourceMappingURL=VCard.d.ts.map

declare const _default$W: vue.DefineComponent<{
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
} & {}> & {}, {
    tag: string;
}>;
//# sourceMappingURL=VCardActions.d.ts.map

declare const _default$V: vue.DefineComponent<{
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
} & {}> & {}, {
    tag: string;
}>;
//# sourceMappingURL=VCardAvatar.d.ts.map

declare const _default$U: vue.DefineComponent<{
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
} & {}> & {}, {
    tag: string;
}>;
//# sourceMappingURL=VCardHeader.d.ts.map

declare const _default$T: vue.DefineComponent<{
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
} & {}> & {}, {
    tag: string;
}>;
//# sourceMappingURL=VCardHeaderText.d.ts.map

declare const _default$S: vue.DefineComponent<{
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
} & {}> & {}, {
    tag: string;
}>;
//# sourceMappingURL=VCardImg.d.ts.map

declare const _default$R: vue.DefineComponent<{
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
} & {}> & {}, {
    tag: string;
}>;
//# sourceMappingURL=VCardSubtitle.d.ts.map

declare const _default$Q: vue.DefineComponent<{
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
} & {}> & {}, {
    tag: string;
}>;
//# sourceMappingURL=VCardText.d.ts.map

declare const _default$P: vue.DefineComponent<{
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
} & {}> & {}, {
    tag: string;
}>;
//# sourceMappingURL=VCardTitle.d.ts.map

declare const _default$O: vue.DefineComponent<{
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
    modelValue?: unknown;
} & {
    replace: boolean;
    link: boolean;
    tag: string;
    filter: boolean;
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
    tag: string;
    filter: boolean;
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
//# sourceMappingURL=VChip.d.ts.map

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
} & {}> & {}, {
    tag: string;
}>;

declare const VCounter: vue.DefineComponent<{
    max: (StringConstructor | NumberConstructor)[];
    value: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    max?: unknown;
    value?: unknown;
} & {
    value: string | number;
} & {
    max?: string | number | undefined;
}> & {}, {
    value: string | number;
}>;

interface DefaultsInstance {
    [key: string]: undefined | Record<string, unknown>;
    global?: Record<string, unknown>;
}
declare type DefaultsOptions = Partial<DefaultsInstance>;

declare const _default$N: vue.DefineComponent<{
    defaults: PropType<Partial<DefaultsInstance>>;
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>[] | undefined, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    defaults?: unknown;
} & {} & {
    defaults?: Partial<DefaultsInstance> | undefined;
}> & {}, {}>;
//# sourceMappingURL=VDefaultsProvider.d.ts.map

declare const _default$M: vue.DefineComponent<{
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
                target: vue.PropType<HTMLElement>;
            }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
                target?: unknown;
            } & {} & {
                target?: HTMLElement | undefined;
            }> & {}, {}>;
        }>;
        default: string | false | (vue.TransitionProps & {
            component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
        }) | {
            component: vue.DefineComponent<{
                target: vue.PropType<HTMLElement>;
            }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
                target?: unknown;
            } & {} & {
                target?: HTMLElement | undefined;
            }> & {}, {}>;
        };
    };
    height: (StringConstructor | NumberConstructor)[];
    maxHeight: (StringConstructor | NumberConstructor)[];
    maxWidth: (StringConstructor | NumberConstructor)[];
    minHeight: (StringConstructor | NumberConstructor)[];
    minWidth: (StringConstructor | NumberConstructor)[];
    width: {
        type: vue.PropType<string | number>;
        default: string | number;
    };
    fullscreen: BooleanConstructor;
    origin: {
        type: StringConstructor;
        default: string;
    };
    retainFocus: {
        type: BooleanConstructor;
        default: boolean;
    };
    scrollable: BooleanConstructor;
    modelValue: BooleanConstructor;
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (value: boolean) => true;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
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
        }> & {}, {}>;
    };
    modelValue: boolean;
    origin: string;
    fullscreen: boolean;
    retainFocus: boolean;
    scrollable: boolean;
} & {
    height?: string | number | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
}> & {
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
}, {
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
        }> & {}, {}>;
    };
    modelValue: boolean;
    origin: string;
    fullscreen: boolean;
    retainFocus: boolean;
    scrollable: boolean;
}>;
//# sourceMappingURL=VDialog.d.ts.map

declare const _default$L: vue.DefineComponent<{
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
}> & {}, {
    inset: boolean;
    vertical: boolean;
}>;
//# sourceMappingURL=VDivider.d.ts.map

declare const _default$K: vue.DefineComponent<{
    theme: StringConstructor;
    modelValue: {
        type: (ArrayConstructor | ObjectConstructor | StringConstructor | NumberConstructor | BooleanConstructor)[];
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
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
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
    modelValue?: undefined;
    mandatory?: boolean | "force" | undefined;
    max?: number | undefined;
    selectedClass?: string | undefined;
}> & {}, {
    tag: string;
    modelValue: undefined;
    multiple: boolean;
    disabled: boolean;
    variant: "default" | "inset" | "accordion" | "popout";
}>;

declare const _default$J: vue.DefineComponent<{
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
    ripple: boolean;
    expandIcon: string;
    collapseIcon: string;
    hideActions: boolean;
} & {
    value?: undefined;
    title?: string | undefined;
    text?: string | undefined;
    elevation?: string | number | undefined;
    rounded?: string | number | boolean | undefined;
    color?: string | undefined;
    bgColor?: string | undefined;
    selectedClass?: string | undefined;
}> & {}, {
    tag: string;
    value: undefined;
    eager: boolean;
    rounded: string | number | boolean;
    tile: boolean;
    disabled: boolean;
    ripple: boolean;
    expandIcon: string;
    collapseIcon: string;
    hideActions: boolean;
}>;
//# sourceMappingURL=VExpansionPanel.d.ts.map

declare const _default$I: vue.DefineComponent<{
    eager: BooleanConstructor;
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    eager?: unknown;
} & {
    eager: boolean;
} & {}> & {}, {
    eager: boolean;
}>;
//# sourceMappingURL=VExpansionPanelText.d.ts.map

declare const _default$H: vue.DefineComponent<{
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
    ripple: boolean;
    expandIcon: string;
    collapseIcon: string;
    hideActions: boolean;
} & {
    color?: string | undefined;
}> & {}, {
    ripple: boolean;
    expandIcon: string;
    collapseIcon: string;
    hideActions: boolean;
}>;

interface DefaultInputSlot {
    isActive: boolean;
    isDirty: boolean;
    isFocused: boolean;
    controlRef: Ref<HTMLElement | undefined>;
    inputRef: Ref<HTMLInputElement | undefined>;
    focus: () => void;
    blur: () => void;
}
declare const VField: vue.DefineComponent<{
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
    theme: StringConstructor;
    disabled: BooleanConstructor;
    appendInnerIcon: StringConstructor;
    bgColor: StringConstructor;
    clearable: BooleanConstructor;
    clearIcon: {
        type: StringConstructor;
        default: string;
    };
    color: StringConstructor;
    hideDetails: PropType<boolean | "auto">;
    hint: StringConstructor;
    id: StringConstructor;
    label: StringConstructor;
    loading: BooleanConstructor;
    persistentHint: BooleanConstructor;
    prependInnerIcon: StringConstructor;
    reverse: BooleanConstructor;
    singleLine: BooleanConstructor;
    variant: {
        type: PropType<"filled" | "contained" | "outlined" | "plain" | "underlined">;
        default: string;
        validator: (v: any) => boolean;
    };
    active: BooleanConstructor;
    dirty: BooleanConstructor;
}, {
    inputRef: Ref<HTMLInputElement | undefined>;
    controlRef: Ref<HTMLElement | undefined>;
}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'click:clear': (e: Event) => any;
    'click:prepend-inner': (e: MouseEvent) => any;
    'click:append-inner': (e: MouseEvent) => any;
    'click:control': (props: DefaultInputSlot) => any;
    'update:active': (active: boolean) => any;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    transition?: unknown;
    theme?: unknown;
    disabled?: unknown;
    appendInnerIcon?: unknown;
    bgColor?: unknown;
    clearable?: unknown;
    clearIcon?: unknown;
    color?: unknown;
    hideDetails?: unknown;
    hint?: unknown;
    id?: unknown;
    label?: unknown;
    loading?: unknown;
    persistentHint?: unknown;
    prependInnerIcon?: unknown;
    reverse?: unknown;
    singleLine?: unknown;
    variant?: unknown;
    active?: unknown;
    dirty?: unknown;
} & {
    transition: string | false | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    });
    reverse: boolean;
    loading: boolean;
    active: boolean;
    disabled: boolean;
    variant: "filled" | "contained" | "outlined" | "plain" | "underlined";
    clearable: boolean;
    clearIcon: string;
    persistentHint: boolean;
    singleLine: boolean;
    dirty: boolean;
} & {
    theme?: string | undefined;
    label?: string | undefined;
    id?: string | undefined;
    color?: string | undefined;
    bgColor?: string | undefined;
    appendInnerIcon?: string | undefined;
    hideDetails?: boolean | "auto" | undefined;
    hint?: string | undefined;
    prependInnerIcon?: string | undefined;
}> & {
    "onUpdate:active"?: ((active: boolean) => any) | undefined;
    "onClick:clear"?: ((e: Event) => any) | undefined;
    "onClick:prepend-inner"?: ((e: MouseEvent) => any) | undefined;
    "onClick:append-inner"?: ((e: MouseEvent) => any) | undefined;
    "onClick:control"?: ((props: DefaultInputSlot) => any) | undefined;
}, {
    transition: string | false | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    });
    reverse: boolean;
    loading: boolean;
    active: boolean;
    disabled: boolean;
    variant: "filled" | "contained" | "outlined" | "plain" | "underlined";
    clearable: boolean;
    clearIcon: string;
    persistentHint: boolean;
    singleLine: boolean;
    dirty: boolean;
}>;
declare type VField = InstanceType<typeof VField>;

declare const _default$G: vue.DefineComponent<{
    theme: StringConstructor;
    floating: BooleanConstructor;
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    theme?: unknown;
    floating?: unknown;
} & {
    floating: boolean;
} & {
    theme?: string | undefined;
}> & {}, {
    floating: boolean;
}>;
//# sourceMappingURL=VFieldLabel.d.ts.map

declare const _default$F: vue.DefineComponent<{
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
    theme: StringConstructor;
    disabled: BooleanConstructor;
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
    hideDetails: PropType<boolean | "auto">;
    hint: StringConstructor;
    id: StringConstructor;
    label: StringConstructor;
    loading: BooleanConstructor;
    persistentHint: BooleanConstructor;
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
    prependIcon: {
        type: StringConstructor;
        default: string;
    };
    showSize: {
        type: PropType<boolean | 1000 | 1024>;
        default: boolean;
        validator: (v: boolean | number) => boolean;
    };
    modelValue: {
        type: PropType<File[] | undefined>;
        default: () => never[];
        validator: (val: any) => boolean;
    };
}, {
    fieldRef: vue.Ref<({
        $: vue.ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            transition: string | false | (vue.TransitionProps & {
                component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
            });
            reverse: boolean;
            loading: boolean;
            active: boolean;
            disabled: boolean;
            variant: "filled" | "contained" | "outlined" | "plain" | "underlined";
            clearable: boolean;
            clearIcon: string;
            persistentHint: boolean;
            singleLine: boolean;
            dirty: boolean;
        }> & Omit<Readonly<{
            transition?: unknown;
            theme?: unknown;
            disabled?: unknown;
            appendInnerIcon?: unknown;
            bgColor?: unknown;
            clearable?: unknown;
            clearIcon?: unknown;
            color?: unknown;
            hideDetails?: unknown;
            hint?: unknown;
            id?: unknown;
            label?: unknown;
            loading?: unknown;
            persistentHint?: unknown;
            prependInnerIcon?: unknown;
            reverse?: unknown;
            singleLine?: unknown;
            variant?: unknown;
            active?: unknown;
            dirty?: unknown;
        } & {
            transition: string | false | (vue.TransitionProps & {
                component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
            });
            reverse: boolean;
            loading: boolean;
            active: boolean;
            disabled: boolean;
            variant: "filled" | "contained" | "outlined" | "plain" | "underlined";
            clearable: boolean;
            clearIcon: string;
            persistentHint: boolean;
            singleLine: boolean;
            dirty: boolean;
        } & {
            theme?: string | undefined;
            label?: string | undefined;
            id?: string | undefined;
            color?: string | undefined;
            bgColor?: string | undefined;
            appendInnerIcon?: string | undefined;
            hideDetails?: boolean | "auto" | undefined;
            hint?: string | undefined;
            prependInnerIcon?: string | undefined;
        }> & {
            "onUpdate:active"?: ((active: boolean) => any) | undefined;
            "onClick:clear"?: ((e: Event) => any) | undefined;
            "onClick:prepend-inner"?: ((e: MouseEvent) => any) | undefined;
            "onClick:append-inner"?: ((e: MouseEvent) => any) | undefined;
            "onClick:control"?: ((props: DefaultInputSlot) => any) | undefined;
        } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "transition" | "reverse" | "loading" | "active" | "disabled" | "variant" | "clearable" | "clearIcon" | "persistentHint" | "singleLine" | "dirty">;
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
            transition?: unknown;
            theme?: unknown;
            disabled?: unknown;
            appendInnerIcon?: unknown;
            bgColor?: unknown;
            clearable?: unknown;
            clearIcon?: unknown;
            color?: unknown;
            hideDetails?: unknown;
            hint?: unknown;
            id?: unknown;
            label?: unknown;
            loading?: unknown;
            persistentHint?: unknown;
            prependInnerIcon?: unknown;
            reverse?: unknown;
            singleLine?: unknown;
            variant?: unknown;
            active?: unknown;
            dirty?: unknown;
        } & {
            transition: string | false | (vue.TransitionProps & {
                component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
            });
            reverse: boolean;
            loading: boolean;
            active: boolean;
            disabled: boolean;
            variant: "filled" | "contained" | "outlined" | "plain" | "underlined";
            clearable: boolean;
            clearIcon: string;
            persistentHint: boolean;
            singleLine: boolean;
            dirty: boolean;
        } & {
            theme?: string | undefined;
            label?: string | undefined;
            id?: string | undefined;
            color?: string | undefined;
            bgColor?: string | undefined;
            appendInnerIcon?: string | undefined;
            hideDetails?: boolean | "auto" | undefined;
            hint?: string | undefined;
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
        }, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
            'click:clear': (e: Event) => any;
            'click:prepend-inner': (e: MouseEvent) => any;
            'click:append-inner': (e: MouseEvent) => any;
            'click:control': (props: DefaultInputSlot) => any;
            'update:active': (active: boolean) => any;
        }, string, {
            transition: string | false | (vue.TransitionProps & {
                component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
            });
            reverse: boolean;
            loading: boolean;
            active: boolean;
            disabled: boolean;
            variant: "filled" | "contained" | "outlined" | "plain" | "underlined";
            clearable: boolean;
            clearIcon: string;
            persistentHint: boolean;
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
        transition?: unknown;
        theme?: unknown;
        disabled?: unknown;
        appendInnerIcon?: unknown;
        bgColor?: unknown;
        clearable?: unknown;
        clearIcon?: unknown;
        color?: unknown;
        hideDetails?: unknown;
        hint?: unknown;
        id?: unknown;
        label?: unknown;
        loading?: unknown;
        persistentHint?: unknown;
        prependInnerIcon?: unknown;
        reverse?: unknown;
        singleLine?: unknown;
        variant?: unknown;
        active?: unknown;
        dirty?: unknown;
    } & {
        transition: string | false | (vue.TransitionProps & {
            component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
        });
        reverse: boolean;
        loading: boolean;
        active: boolean;
        disabled: boolean;
        variant: "filled" | "contained" | "outlined" | "plain" | "underlined";
        clearable: boolean;
        clearIcon: string;
        persistentHint: boolean;
        singleLine: boolean;
        dirty: boolean;
    } & {
        theme?: string | undefined;
        label?: string | undefined;
        id?: string | undefined;
        color?: string | undefined;
        bgColor?: string | undefined;
        appendInnerIcon?: string | undefined;
        hideDetails?: boolean | "auto" | undefined;
        hint?: string | undefined;
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
    }> & {} & {} & vue.ComponentCustomProperties) | undefined>;
    focus: () => void;
    blur: () => void;
    click: () => void;
}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (files: File[]) => true;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    transition?: unknown;
    theme?: unknown;
    disabled?: unknown;
    appendInnerIcon?: unknown;
    bgColor?: unknown;
    clearable?: unknown;
    clearIcon?: unknown;
    color?: unknown;
    hideDetails?: unknown;
    hint?: unknown;
    id?: unknown;
    label?: unknown;
    loading?: unknown;
    persistentHint?: unknown;
    prependInnerIcon?: unknown;
    reverse?: unknown;
    singleLine?: unknown;
    variant?: unknown;
    chips?: unknown;
    counter?: unknown;
    counterSizeString?: unknown;
    counterString?: unknown;
    multiple?: unknown;
    prependIcon?: unknown;
    showSize?: unknown;
    modelValue?: unknown;
} & {
    transition: string | false | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    });
    reverse: boolean;
    loading: boolean;
    modelValue: File[] | undefined;
    multiple: boolean;
    disabled: boolean;
    variant: "filled" | "contained" | "outlined" | "plain" | "underlined";
    prependIcon: string;
    clearable: boolean;
    clearIcon: string;
    persistentHint: boolean;
    singleLine: boolean;
    chips: boolean;
    counter: boolean;
    counterSizeString: string;
    counterString: string;
    showSize: boolean | 1000 | 1024;
} & {
    theme?: string | undefined;
    label?: string | undefined;
    id?: string | undefined;
    color?: string | undefined;
    bgColor?: string | undefined;
    appendInnerIcon?: string | undefined;
    hideDetails?: boolean | "auto" | undefined;
    hint?: string | undefined;
    prependInnerIcon?: string | undefined;
}> & {
    "onUpdate:modelValue"?: ((files: File[]) => any) | undefined;
}, {
    transition: string | false | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    });
    reverse: boolean;
    loading: boolean;
    modelValue: File[] | undefined;
    multiple: boolean;
    disabled: boolean;
    variant: "filled" | "contained" | "outlined" | "plain" | "underlined";
    prependIcon: string;
    clearable: boolean;
    clearIcon: string;
    persistentHint: boolean;
    singleLine: boolean;
    chips: boolean;
    counter: boolean;
    counterSizeString: string;
    counterString: string;
    showSize: boolean | 1000 | 1024;
}>;
//# sourceMappingURL=VFileInput.d.ts.map

declare const _default$E: vue.DefineComponent<{
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
        type: vue.PropType<"fixed" | "relative" | "absolute" | "static" | "sticky">;
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
    tile: boolean;
    absolute: boolean;
} & {
    theme?: string | undefined;
    top?: string | number | boolean | undefined;
    left?: string | number | boolean | undefined;
    right?: string | number | boolean | undefined;
    bottom?: string | number | boolean | undefined;
    height?: string | number | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
    width?: string | number | undefined;
    position?: "fixed" | "relative" | "absolute" | "static" | "sticky" | undefined;
    border?: string | number | boolean | undefined;
    elevation?: string | number | undefined;
    rounded?: string | number | boolean | undefined;
}> & {}, {
    fixed: boolean;
    tag: string;
    rounded: string | number | boolean;
    tile: boolean;
    absolute: boolean;
}>;
//# sourceMappingURL=VFooter.d.ts.map

declare const _default$D: vue.DefineComponent<{
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
} & {}> & {}, {
    tag: string;
    fluid: boolean;
}>;
//# sourceMappingURL=VContainer.d.ts.map

declare const _default$C: vue.DefineComponent<{
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
    offset: string | number;
    order: string | number;
    alignSelf: string;
    cols: string | number | boolean;
} & {}> & {}, {
    tag: string;
    offset: string | number;
    order: string | number;
    alignSelf: string;
    cols: string | number | boolean;
}>;
//# sourceMappingURL=VCol.d.ts.map

declare const _default$B: vue.DefineComponent<{
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
    align: string;
    alignContent: string;
    noGutters: boolean;
} & {}> & {}, {
    tag: string;
    dense: boolean;
    justify: string;
    align: string;
    alignContent: string;
    noGutters: boolean;
}>;
//# sourceMappingURL=VRow.d.ts.map

declare const _default$A: vue.DefineComponent<{
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
} & {}> & {}, {
    tag: string;
}>;
//# sourceMappingURL=VSpacer.d.ts.map

declare const _default$z: vue.DefineComponent<{
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
//# sourceMappingURL=VHover.d.ts.map

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
} & {}> & {}, {}>;
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
} & {}> & {}, {}>;
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
} & {}> & {}, {}>;
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
} & {}> & {}, {}>;

declare const _default$y: vue.DefineComponent<{
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
    tag: string;
    left: boolean;
    right: boolean;
    size: string | number;
} & {
    color?: string | undefined;
    icon?: IconValue | undefined;
}> & {}, {
    tag: string;
    left: boolean;
    right: boolean;
    size: string | number;
}>;
//# sourceMappingURL=VIcon.d.ts.map

interface srcObject {
    src?: string;
    srcset?: string;
    lazySrc?: string;
    aspect: number;
}
declare const _default$x: vue.DefineComponent<{
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
    lazySrc: StringConstructor;
    options: {
        type: PropType<IntersectionObserverInit>;
        default: () => {
            root: undefined;
            rootMargin: undefined;
            threshold: undefined;
        };
    };
    position: {
        type: StringConstructor;
        default: string;
    };
    sizes: StringConstructor;
    src: {
        type: PropType<string | srcObject>;
        default: string;
    };
    srcset: StringConstructor;
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
    lazySrc?: unknown;
    options?: unknown;
    position?: unknown;
    sizes?: unknown;
    src?: unknown;
    srcset?: unknown;
} & {
    options: IntersectionObserverInit;
    transition: string | false | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    });
    cover: boolean;
    eager: boolean;
    position: string;
    src: string | srcObject;
} & {
    aspectRatio?: string | number | undefined;
    alt?: string | undefined;
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
    position: string;
    src: string | srcObject;
}>;

declare const VInput: vue.DefineComponent<{
    density: {
        type: vue.PropType<"default" | "comfortable" | "compact" | null>;
        default: string;
        validator: (v: any) => boolean;
    };
    appendIcon: StringConstructor;
    prependIcon: StringConstructor;
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'click:prepend': (e: MouseEvent) => true;
    'click:append': (e: MouseEvent) => true;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    density?: unknown;
    appendIcon?: unknown;
    prependIcon?: unknown;
} & {
    density: "default" | "comfortable" | "compact" | null;
} & {
    prependIcon?: string | undefined;
    appendIcon?: string | undefined;
}> & {
    "onClick:prepend"?: ((e: MouseEvent) => any) | undefined;
    "onClick:append"?: ((e: MouseEvent) => any) | undefined;
}, {
    density: "default" | "comfortable" | "compact" | null;
}>;
declare type VInput = InstanceType<typeof VInput>;

declare const _default$w: vue.DefineComponent<{
    theme: StringConstructor;
    tag: {
        type: StringConstructor;
        default: string;
    };
    modelValue: {
        type: (ArrayConstructor | ObjectConstructor | StringConstructor | NumberConstructor | BooleanConstructor)[];
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
    modelValue?: undefined;
    mandatory?: boolean | "force" | undefined;
    max?: number | undefined;
}> & {
    "onUpdate:modelValue"?: ((value: any) => any) | undefined;
}, {
    tag: string;
    modelValue: undefined;
    multiple: boolean;
    disabled: boolean;
    selectedClass: string;
}>;

declare const _default$v: vue.DefineComponent<{
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
    value?: undefined;
    selectedClass?: string | undefined;
}> & {}, {
    value: undefined;
    disabled: boolean;
}>;
//# sourceMappingURL=VItem.d.ts.map

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
} & {}> & {}, {
    tag: string;
}>;

declare const _default$u: vue.DefineComponent<{
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
}> & {}, {
    fullHeight: boolean;
}>;
//# sourceMappingURL=VLayout.d.ts.map

declare const _default$t: vue.DefineComponent<{
    name: {
        type: StringConstructor;
    };
    priority: {
        type: NumberConstructor;
        default: number;
    };
    absolute: BooleanConstructor;
    position: {
        type: PropType<"top" | "left" | "right" | "bottom">;
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
    position: "top" | "left" | "right" | "bottom";
    priority: number;
    absolute: boolean;
    modelValue: boolean;
    size: string | number;
} & {
    name?: string | undefined;
}> & {}, {
    priority: number;
    absolute: boolean;
    modelValue: boolean;
    size: string | number;
}>;
//# sourceMappingURL=VLayoutItem.d.ts.map

declare const _default$s: vue.DefineComponent<{
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
    height?: string | number | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
    width?: string | number | undefined;
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
//# sourceMappingURL=VLazy.d.ts.map

declare const _default$r: vue.DefineComponent<{
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
    color: StringConstructor;
    disabled: BooleanConstructor;
    lines: {
        type: StringConstructor;
        default: string;
    };
    nav: BooleanConstructor;
    subheader: {
        type: (StringConstructor | BooleanConstructor)[];
        default: boolean;
    };
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    theme?: unknown;
    tag?: unknown;
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
    color?: unknown;
    disabled?: unknown;
    lines?: unknown;
    nav?: unknown;
    subheader?: unknown;
} & {
    tag: string;
    nav: boolean;
    density: "default" | "comfortable" | "compact" | null;
    tile: boolean;
    disabled: boolean;
    lines: string;
    subheader: string | boolean;
} & {
    theme?: string | undefined;
    height?: string | number | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
    width?: string | number | undefined;
    border?: string | number | boolean | undefined;
    elevation?: string | number | undefined;
    rounded?: string | number | boolean | undefined;
    color?: string | undefined;
}> & {}, {
    tag: string;
    nav: boolean;
    density: "default" | "comfortable" | "compact" | null;
    rounded: string | number | boolean;
    tile: boolean;
    disabled: boolean;
    lines: string;
    subheader: string | boolean;
}>;
//# sourceMappingURL=VList.d.ts.map

declare const _default$q: vue.DefineComponent<{
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
}> & {}, {
    tag: string;
    inset: boolean;
}>;
//# sourceMappingURL=VListSubheader.d.ts.map

declare const _default$p: vue.DefineComponent<{
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
} & {}> & {}, {
    tag: string;
}>;
//# sourceMappingURL=VListImg.d.ts.map

declare const _default$o: vue.DefineComponent<{
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
    active: BooleanConstructor;
    activeColor: StringConstructor;
    activeClass: StringConstructor;
    appendAvatar: StringConstructor;
    appendIcon: StringConstructor;
    disabled: BooleanConstructor;
    link: BooleanConstructor;
    prependAvatar: StringConstructor;
    prependIcon: StringConstructor;
    subtitle: StringConstructor;
    title: StringConstructor;
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
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
    theme?: string | undefined;
    title?: string | undefined;
    height?: string | number | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
    width?: string | number | undefined;
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
}> & {}, {
    replace: boolean;
    link: boolean;
    tag: string;
    density: "default" | "comfortable" | "compact" | null;
    rounded: string | number | boolean;
    tile: boolean;
    active: boolean;
    disabled: boolean;
    variant: "text" | "contained" | "outlined" | "plain" | "contained-text";
}>;
//# sourceMappingURL=VListItem.d.ts.map

declare const _default$n: vue.DefineComponent<{
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
    tag: string;
    left: boolean;
    right: boolean;
} & {}> & {}, {
    tag: string;
    left: boolean;
    right: boolean;
}>;
//# sourceMappingURL=VListItemAvatar.d.ts.map

declare const _default$m: vue.DefineComponent<{
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
} & {}> & {}, {
    tag: string;
}>;
//# sourceMappingURL=VListItemHeader.d.ts.map

declare const _default$l: vue.DefineComponent<{
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
    tag: string;
    left: boolean;
    right: boolean;
} & {}> & {}, {
    tag: string;
    left: boolean;
    right: boolean;
}>;
//# sourceMappingURL=VListItemMedia.d.ts.map

declare const _default$k: vue.DefineComponent<{
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
} & {}> & {}, {
    tag: string;
}>;
//# sourceMappingURL=VListItemSubtitle.d.ts.map

declare const _default$j: vue.DefineComponent<{
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
} & {}> & {}, {
    tag: string;
}>;
//# sourceMappingURL=VListItemTitle.d.ts.map

declare const _default$i: vue.DefineComponent<{
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
    rtl?: boolean | undefined;
    locale?: string | undefined;
    fallbackLocale?: string | undefined;
    messages?: Record<string, any> | undefined;
}> & {}, {
    rtl: boolean;
}>;
//# sourceMappingURL=VLocaleProvider.d.ts.map

declare const _default$h: vue.DefineComponent<{
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
} & {}> & {}, {
    tag: string;
}>;
//# sourceMappingURL=VMain.d.ts.map

declare const _default$g: vue.DefineComponent<{
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
            readonly component: vue.DefineComponent<{
                target: vue.PropType<HTMLElement>;
            }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
                target?: unknown;
            } & {} & {
                target?: HTMLElement | undefined;
            }> & {}, {}>;
        }>;
        default: string | false | (vue.TransitionProps & {
            component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
        }) | {
            readonly component: vue.DefineComponent<{
                target: vue.PropType<HTMLElement>;
            }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
                target?: unknown;
            } & {} & {
                target?: HTMLElement | undefined;
            }> & {}, {}>;
        };
    };
    disableKeys: BooleanConstructor;
    modelValue: BooleanConstructor;
    id: StringConstructor;
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (value: boolean) => true;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    transition?: unknown;
    disableKeys?: unknown;
    modelValue?: unknown;
    id?: unknown;
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
        }> & {}, {}>;
    };
    modelValue: boolean;
    disableKeys: boolean;
} & {
    id?: string | undefined;
}> & {
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
}, {
    transition: string | false | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    }) | {
        readonly component: vue.DefineComponent<{
            target: vue.PropType<HTMLElement>;
        }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
            target?: unknown;
        } & {} & {
            target?: HTMLElement | undefined;
        }> & {}, {}>;
    };
    modelValue: boolean;
    disableKeys: boolean;
}>;
//# sourceMappingURL=VMenu.d.ts.map

declare const _default$f: vue.DefineComponent<{
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
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
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
    tag: string;
    width: string | number;
    position: "left" | "right" | "bottom";
    tile: boolean;
    priority: number;
    absolute: boolean;
    floating: boolean;
    modelValue: boolean;
    disableResizeWatcher: boolean;
    expandOnHover: boolean;
    permanent: boolean;
    rail: boolean;
    railWidth: string | number;
    temporary: boolean;
} & {
    theme?: string | undefined;
    image?: string | undefined;
    name?: string | undefined;
    border?: string | number | boolean | undefined;
    elevation?: string | number | undefined;
    rounded?: string | number | boolean | undefined;
    color?: string | undefined;
}> & {}, {
    tag: string;
    width: string | number;
    position: "left" | "right" | "bottom";
    rounded: string | number | boolean;
    tile: boolean;
    priority: number;
    absolute: boolean;
    floating: boolean;
    modelValue: boolean;
    disableResizeWatcher: boolean;
    expandOnHover: boolean;
    permanent: boolean;
    rail: boolean;
    railWidth: string | number;
    temporary: boolean;
}>;
//# sourceMappingURL=VNavigationDrawer.d.ts.map

declare const _default$e: vue.DefineComponent<{}, () => false | vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>[] | undefined, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, vue.EmitsOptions, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{} & {} & {}> & ({} | {}), {}>;
//# sourceMappingURL=VNoSsr.d.ts.map

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

interface ScrollStrategyData {
    contentEl: Ref<HTMLElement | undefined>;
    activatorEl: Ref<HTMLElement | undefined>;
    isActive: Ref<boolean>;
    updatePosition: Ref<((e: Event) => void) | undefined>;
}

declare const _default$d: vue.DefineComponent<{
    eager: BooleanConstructor;
    transition: {
        type: PropType<string | false | (vue.TransitionProps & {
            component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
        })>;
        default: string;
        validator: (val: unknown) => boolean;
    };
    theme: StringConstructor;
    scrollStrategy: {
        type: PropType<"block" | "close" | "reposition" | ((data: ScrollStrategyData) => void)>;
        default: string;
        validator: (val: any) => boolean;
    };
    positionStrategy: {
        type: PropType<"static" | "connected" | ((data: PositionStrategyData, props: StrategyProps, contentStyles: vue.Ref<Dictionary<string>>) => {
            updatePosition: (e: Event) => void;
        } | undefined)>;
        default: string;
        validator: (val: any) => boolean;
    };
    anchor: {
        type: PropType<Anchor>;
        default: string;
    };
    origin: {
        type: PropType<"auto" | Anchor | "overlap">;
        default: string;
    };
    offset: (StringConstructor | NumberConstructor)[];
    height: (StringConstructor | NumberConstructor)[];
    maxHeight: (StringConstructor | NumberConstructor)[];
    maxWidth: (StringConstructor | NumberConstructor)[];
    minHeight: (StringConstructor | NumberConstructor)[];
    minWidth: (StringConstructor | NumberConstructor)[];
    width: (StringConstructor | NumberConstructor)[];
    closeDelay: (StringConstructor | NumberConstructor)[];
    openDelay: (StringConstructor | NumberConstructor)[];
    activator: PropType<string | Element | vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | undefined>;
    activatorProps: {
        type: PropType<Dictionary<any>>;
        default: () => {};
    };
    openOnClick: {
        type: BooleanConstructor;
        default: undefined;
    };
    openOnHover: BooleanConstructor;
    openOnFocus: {
        type: BooleanConstructor;
        default: undefined;
    };
    absolute: BooleanConstructor;
    attach: {
        type: PropType<string | boolean | Element>;
        default: string;
    };
    contentClass: null;
    noClickAnimation: BooleanConstructor;
    modelValue: BooleanConstructor;
    persistent: BooleanConstructor;
    scrim: {
        type: (StringConstructor | BooleanConstructor)[];
        default: boolean;
    };
}, {
    animateClick: () => void;
    contentEl: vue.Ref<HTMLElement | undefined>;
    activatorEl: vue.Ref<HTMLElement | undefined>;
}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'click:outside': (e: MouseEvent) => true;
    'update:modelValue': (value: boolean) => true;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
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
    contentClass?: unknown;
    noClickAnimation?: unknown;
    modelValue?: unknown;
    persistent?: unknown;
    scrim?: unknown;
} & {
    anchor: Anchor;
    transition: string | false | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    });
    eager: boolean;
    absolute: boolean;
    modelValue: boolean;
    origin: "auto" | Anchor | "overlap";
    activatorProps: Dictionary<any>;
    positionStrategy: "static" | "connected" | ((data: PositionStrategyData, props: StrategyProps, contentStyles: vue.Ref<Dictionary<string>>) => {
        updatePosition: (e: Event) => void;
    } | undefined);
    scrollStrategy: "block" | "close" | "reposition" | ((data: ScrollStrategyData) => void);
    openOnHover: boolean;
    attach: string | boolean | Element;
    noClickAnimation: boolean;
    persistent: boolean;
    scrim: string | boolean;
} & {
    theme?: string | undefined;
    height?: string | number | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
    width?: string | number | undefined;
    contentClass?: any;
    closeDelay?: string | number | undefined;
    openDelay?: string | number | undefined;
    activator?: string | Element | vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | undefined;
    offset?: string | number | undefined;
    openOnClick?: boolean | undefined;
    openOnFocus?: boolean | undefined;
}> & {
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
    "onClick:outside"?: ((e: MouseEvent) => any) | undefined;
}, {
    anchor: Anchor;
    transition: string | false | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    });
    eager: boolean;
    absolute: boolean;
    modelValue: boolean;
    origin: "auto" | Anchor | "overlap";
    activatorProps: Dictionary<any>;
    positionStrategy: "static" | "connected" | ((data: PositionStrategyData, props: StrategyProps, contentStyles: vue.Ref<Dictionary<string>>) => {
        updatePosition: (e: Event) => void;
    } | undefined);
    scrollStrategy: "block" | "close" | "reposition" | ((data: ScrollStrategyData) => void);
    openOnClick: boolean;
    openOnHover: boolean;
    openOnFocus: boolean;
    attach: string | boolean | Element;
    noClickAnimation: boolean;
    persistent: boolean;
    scrim: string | boolean;
}>;
//# sourceMappingURL=VOverlay.d.ts.map

declare const _default$c: vue.DefineComponent<{
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
    ariaLabel: string;
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
    onFirst?: ((value: number) => any) | undefined;
    onLast?: ((value: number) => any) | undefined;
    onPrev?: ((value: number) => any) | undefined;
    onNext?: ((value: number) => any) | undefined;
}, {
    length: string | number;
    tag: string;
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
    ariaLabel: string;
    pageAriaLabel: string;
    currentPageAriaLabel: string;
    firstAriaLabel: string;
    previousAriaLabel: string;
    nextAriaLabel: string;
    lastAriaLabel: string;
    showFirstLastPage: boolean;
}>;
//# sourceMappingURL=VPagination.d.ts.map

declare const _default$b: vue.DefineComponent<Readonly<{
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
    tag: string;
    flat: boolean;
    density: "default" | "comfortable" | "compact" | null;
    tile: boolean;
    absolute: boolean;
    size: string | number;
    block: boolean;
    disabled: boolean;
    variant: "text" | "contained" | "outlined" | "plain" | "contained-text";
    stacked: boolean;
    ripple: boolean;
} & {
    theme?: string | undefined;
    top?: string | number | boolean | undefined;
    left?: string | number | boolean | undefined;
    right?: string | number | boolean | undefined;
    bottom?: string | number | boolean | undefined;
    height?: string | number | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
    width?: string | number | undefined;
    position?: "fixed" | "relative" | "absolute" | "static" | "sticky" | undefined;
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
}> & {}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, any, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    readonly color?: unknown;
    readonly textColor?: unknown;
    readonly variant?: unknown;
    readonly theme?: unknown;
    readonly tag?: unknown;
    readonly size?: unknown;
    readonly href?: unknown;
    readonly replace?: unknown;
    readonly to?: unknown;
    readonly absolute?: unknown;
    readonly bottom?: unknown;
    readonly fixed?: unknown;
    readonly left?: unknown;
    readonly position?: unknown;
    readonly right?: unknown;
    readonly top?: unknown;
    readonly elevation?: unknown;
    readonly height?: unknown;
    readonly maxHeight?: unknown;
    readonly maxWidth?: unknown;
    readonly minHeight?: unknown;
    readonly minWidth?: unknown;
    readonly width?: unknown;
    readonly density?: unknown;
    readonly rounded?: unknown;
    readonly tile?: unknown;
    readonly border?: unknown;
    readonly flat?: unknown;
    readonly icon?: unknown;
    readonly prependIcon?: unknown;
    readonly appendIcon?: unknown;
    readonly block?: unknown;
    readonly stacked?: unknown;
    readonly disabled?: unknown;
    readonly ripple?: unknown;
} & {} & {}> & {}, {}>;
//# sourceMappingURL=VPaginationBtn.d.ts.map

declare const _default$a: vue.DefineComponent<{
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
    tag: string;
    width: string | number;
    modelValue: string | number;
    size: string | number;
    rotate: string | number;
} & {
    theme?: string | undefined;
    color?: string | undefined;
    bgColor?: string | undefined;
    indeterminate?: boolean | "disable-shrink" | undefined;
}> & {}, {
    tag: string;
    width: string | number;
    modelValue: string | number;
    size: string | number;
    rotate: string | number;
}>;
//# sourceMappingURL=VProgressCircular.d.ts.map

declare const _default$9: vue.DefineComponent<{
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
    tag: string;
    height: string | number;
    reverse: boolean;
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
    tag: string;
    height: string | number;
    reverse: boolean;
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
//# sourceMappingURL=VProgressLinear.d.ts.map

declare const _default$8: vue.DefineComponent<{
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
    clearable: boolean;
    itemAriaLabel: string;
    emptyIcon: string;
    fullIcon: string;
    halfIncrements: boolean;
    readonly: boolean;
    itemLabelPosition: string;
} & {
    theme?: string | undefined;
    name?: string | undefined;
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
    clearable: boolean;
    itemAriaLabel: string;
    emptyIcon: string;
    fullIcon: string;
    halfIncrements: boolean;
    readonly: boolean;
    itemLabelPosition: string;
}>;
//# sourceMappingURL=VRating.d.ts.map

declare const _default$7: vue.DefineComponent<{
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
    height?: string | number | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
    width?: string | number | undefined;
    aspectRatio?: string | number | undefined;
    contentClass?: string | undefined;
}> & {}, {}>;

declare const _default$6: vue.DefineComponent<{
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
        type: vue.PropType<"fixed" | "relative" | "absolute" | "static" | "sticky">;
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
    tile: boolean;
    absolute: boolean;
    color: string;
} & {
    theme?: string | undefined;
    top?: string | number | boolean | undefined;
    left?: string | number | boolean | undefined;
    right?: string | number | boolean | undefined;
    bottom?: string | number | boolean | undefined;
    height?: string | number | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
    width?: string | number | undefined;
    position?: "fixed" | "relative" | "absolute" | "static" | "sticky" | undefined;
    border?: string | number | boolean | undefined;
    elevation?: string | number | undefined;
    rounded?: string | number | boolean | undefined;
}> & {}, {
    fixed: boolean;
    tag: string;
    rounded: string | number | boolean;
    tile: boolean;
    absolute: boolean;
    color: string;
}>;
//# sourceMappingURL=VSheet.d.ts.map

declare const _default$5: vue.DefineComponent<{
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
        type: vue.PropType<"fixed" | "relative" | "absolute" | "static" | "sticky">;
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
    tile: boolean;
    absolute: boolean;
    window: boolean;
    lightsOut: boolean;
} & {
    theme?: string | undefined;
    top?: string | number | boolean | undefined;
    left?: string | number | boolean | undefined;
    right?: string | number | boolean | undefined;
    bottom?: string | number | boolean | undefined;
    height?: string | number | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
    width?: string | number | undefined;
    position?: "fixed" | "relative" | "absolute" | "static" | "sticky" | undefined;
    border?: string | number | boolean | undefined;
    elevation?: string | number | undefined;
    rounded?: string | number | boolean | undefined;
}> & {}, {
    fixed: boolean;
    tag: string;
    rounded: string | number | boolean;
    tile: boolean;
    absolute: boolean;
    window: boolean;
    lightsOut: boolean;
}>;
//# sourceMappingURL=VSystemBar.d.ts.map

declare const VTextField: vue.DefineComponent<{
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
    theme: StringConstructor;
    disabled: BooleanConstructor;
    appendInnerIcon: StringConstructor;
    bgColor: StringConstructor;
    clearable: BooleanConstructor;
    clearIcon: {
        type: StringConstructor;
        default: string;
    };
    color: StringConstructor;
    hideDetails: PropType<boolean | "auto">;
    hint: StringConstructor;
    id: StringConstructor;
    label: StringConstructor;
    loading: BooleanConstructor;
    persistentHint: BooleanConstructor;
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
    suffix: StringConstructor;
    type: {
        type: StringConstructor;
        default: string;
    };
    modelValue: StringConstructor;
}, {
    fieldRef: vue.Ref<({
        $: vue.ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            transition: string | false | (vue.TransitionProps & {
                component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
            });
            reverse: boolean;
            loading: boolean;
            active: boolean;
            disabled: boolean;
            variant: "filled" | "contained" | "outlined" | "plain" | "underlined";
            clearable: boolean;
            clearIcon: string;
            persistentHint: boolean;
            singleLine: boolean;
            dirty: boolean;
        }> & Omit<Readonly<{
            transition?: unknown;
            theme?: unknown;
            disabled?: unknown;
            appendInnerIcon?: unknown;
            bgColor?: unknown;
            clearable?: unknown;
            clearIcon?: unknown;
            color?: unknown;
            hideDetails?: unknown;
            hint?: unknown;
            id?: unknown;
            label?: unknown;
            loading?: unknown;
            persistentHint?: unknown;
            prependInnerIcon?: unknown;
            reverse?: unknown;
            singleLine?: unknown;
            variant?: unknown;
            active?: unknown;
            dirty?: unknown;
        } & {
            transition: string | false | (vue.TransitionProps & {
                component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
            });
            reverse: boolean;
            loading: boolean;
            active: boolean;
            disabled: boolean;
            variant: "filled" | "contained" | "outlined" | "plain" | "underlined";
            clearable: boolean;
            clearIcon: string;
            persistentHint: boolean;
            singleLine: boolean;
            dirty: boolean;
        } & {
            theme?: string | undefined;
            label?: string | undefined;
            id?: string | undefined;
            color?: string | undefined;
            bgColor?: string | undefined;
            appendInnerIcon?: string | undefined;
            hideDetails?: boolean | "auto" | undefined;
            hint?: string | undefined;
            prependInnerIcon?: string | undefined;
        }> & {
            "onUpdate:active"?: ((active: boolean) => any) | undefined;
            "onClick:clear"?: ((e: Event) => any) | undefined;
            "onClick:prepend-inner"?: ((e: MouseEvent) => any) | undefined;
            "onClick:append-inner"?: ((e: MouseEvent) => any) | undefined;
            "onClick:control"?: ((props: DefaultInputSlot) => any) | undefined;
        } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "transition" | "reverse" | "loading" | "active" | "disabled" | "variant" | "clearable" | "clearIcon" | "persistentHint" | "singleLine" | "dirty">;
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
            transition?: unknown;
            theme?: unknown;
            disabled?: unknown;
            appendInnerIcon?: unknown;
            bgColor?: unknown;
            clearable?: unknown;
            clearIcon?: unknown;
            color?: unknown;
            hideDetails?: unknown;
            hint?: unknown;
            id?: unknown;
            label?: unknown;
            loading?: unknown;
            persistentHint?: unknown;
            prependInnerIcon?: unknown;
            reverse?: unknown;
            singleLine?: unknown;
            variant?: unknown;
            active?: unknown;
            dirty?: unknown;
        } & {
            transition: string | false | (vue.TransitionProps & {
                component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
            });
            reverse: boolean;
            loading: boolean;
            active: boolean;
            disabled: boolean;
            variant: "filled" | "contained" | "outlined" | "plain" | "underlined";
            clearable: boolean;
            clearIcon: string;
            persistentHint: boolean;
            singleLine: boolean;
            dirty: boolean;
        } & {
            theme?: string | undefined;
            label?: string | undefined;
            id?: string | undefined;
            color?: string | undefined;
            bgColor?: string | undefined;
            appendInnerIcon?: string | undefined;
            hideDetails?: boolean | "auto" | undefined;
            hint?: string | undefined;
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
        }, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
            'click:clear': (e: Event) => any;
            'click:prepend-inner': (e: MouseEvent) => any;
            'click:append-inner': (e: MouseEvent) => any;
            'click:control': (props: DefaultInputSlot) => any;
            'update:active': (active: boolean) => any;
        }, string, {
            transition: string | false | (vue.TransitionProps & {
                component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
            });
            reverse: boolean;
            loading: boolean;
            active: boolean;
            disabled: boolean;
            variant: "filled" | "contained" | "outlined" | "plain" | "underlined";
            clearable: boolean;
            clearIcon: string;
            persistentHint: boolean;
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
        transition?: unknown;
        theme?: unknown;
        disabled?: unknown;
        appendInnerIcon?: unknown;
        bgColor?: unknown;
        clearable?: unknown;
        clearIcon?: unknown;
        color?: unknown;
        hideDetails?: unknown;
        hint?: unknown;
        id?: unknown;
        label?: unknown;
        loading?: unknown;
        persistentHint?: unknown;
        prependInnerIcon?: unknown;
        reverse?: unknown;
        singleLine?: unknown;
        variant?: unknown;
        active?: unknown;
        dirty?: unknown;
    } & {
        transition: string | false | (vue.TransitionProps & {
            component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
        });
        reverse: boolean;
        loading: boolean;
        active: boolean;
        disabled: boolean;
        variant: "filled" | "contained" | "outlined" | "plain" | "underlined";
        clearable: boolean;
        clearIcon: string;
        persistentHint: boolean;
        singleLine: boolean;
        dirty: boolean;
    } & {
        theme?: string | undefined;
        label?: string | undefined;
        id?: string | undefined;
        color?: string | undefined;
        bgColor?: string | undefined;
        appendInnerIcon?: string | undefined;
        hideDetails?: boolean | "auto" | undefined;
        hint?: string | undefined;
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
    }> & {} & {} & vue.ComponentCustomProperties) | undefined>;
    focus: () => void;
    blur: () => void;
}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (val: string) => any;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    transition?: unknown;
    theme?: unknown;
    disabled?: unknown;
    appendInnerIcon?: unknown;
    bgColor?: unknown;
    clearable?: unknown;
    clearIcon?: unknown;
    color?: unknown;
    hideDetails?: unknown;
    hint?: unknown;
    id?: unknown;
    label?: unknown;
    loading?: unknown;
    persistentHint?: unknown;
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
    suffix?: unknown;
    type?: unknown;
    modelValue?: unknown;
} & {
    type: string;
    transition: string | false | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    });
    reverse: boolean;
    loading: boolean;
    disabled: boolean;
    variant: "filled" | "contained" | "outlined" | "plain" | "underlined";
    clearable: boolean;
    clearIcon: string;
    persistentHint: boolean;
    singleLine: boolean;
    autofocus: boolean;
    persistentPlaceholder: boolean;
} & {
    theme?: string | undefined;
    label?: string | undefined;
    id?: string | undefined;
    color?: string | undefined;
    modelValue?: string | undefined;
    bgColor?: string | undefined;
    appendInnerIcon?: string | undefined;
    hideDetails?: boolean | "auto" | undefined;
    hint?: string | undefined;
    prependInnerIcon?: string | undefined;
    counter?: string | number | true | undefined;
    counterValue?: ((value: any) => number) | undefined;
    prefix?: string | undefined;
    placeholder?: string | undefined;
    suffix?: string | undefined;
}> & {
    "onUpdate:modelValue"?: ((val: string) => any) | undefined;
}, {
    type: string;
    transition: string | false | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    });
    reverse: boolean;
    loading: boolean;
    disabled: boolean;
    variant: "filled" | "contained" | "outlined" | "plain" | "underlined";
    clearable: boolean;
    clearIcon: string;
    persistentHint: boolean;
    singleLine: boolean;
    autofocus: boolean;
    persistentPlaceholder: boolean;
}>;

declare const _default$4: vue.DefineComponent<{
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
}> & {}, {
    tag: string;
    withBackground: boolean;
}>;
//# sourceMappingURL=VThemeProvider.d.ts.map

declare type TimelineDirection = 'vertical' | 'horizontal';
declare type TimelineSide = 'before' | 'after' | undefined;
declare const _default$3: vue.DefineComponent<{
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
}> & {}, {
    tag: string;
    density: "default" | "comfortable" | "compact" | null;
    lineInset: string | number;
    lineThickness: string | number;
    truncateLine: string;
}>;

declare const _default$2: vue.DefineComponent<{
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
    height?: string | number | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
    width?: string | number | undefined;
    elevation?: string | number | undefined;
    rounded?: string | number | boolean | undefined;
    icon?: string | undefined;
    iconColor?: string | undefined;
    dotColor?: string | undefined;
    hideOpposite?: boolean | undefined;
}> & {}, {
    tag: string;
    rounded: string | number | boolean;
    tile: boolean;
    size: string | number;
    hideDot: boolean;
    fillDot: boolean;
    hideOpposite: boolean;
}>;
//# sourceMappingURL=VTimelineItem.d.ts.map

declare const _default$1: vue.DefineComponent<{
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
    id: StringConstructor;
    modelValue: BooleanConstructor;
    text: StringConstructor;
    anchor: {
        type: PropType<Anchor>;
        default: string;
    };
    origin: {
        type: PropType<"auto" | Anchor | "overlap">;
        default: string;
    };
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (value: boolean) => true;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    transition?: unknown;
    id?: unknown;
    modelValue?: unknown;
    text?: unknown;
    anchor?: unknown;
    origin?: unknown;
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
}> & {
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
}, {
    anchor: Anchor;
    transition: string | false | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    });
    modelValue: boolean;
    origin: "auto" | Anchor | "overlap";
}>;
//# sourceMappingURL=VTooltip.d.ts.map

declare const _default: vue.DefineComponent<{
    target: PropType<HTMLElement>;
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    target?: unknown;
} & {} & {
    target?: HTMLElement | undefined;
}> & {}, {}>;
//# sourceMappingURL=dialog-transition.d.ts.map

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
} & {}> & {}, {
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
} & {}> & {}, {
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
} & {}> & {}, {
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
} & {}> & {}, {
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
} & {}> & {}, {
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
} & {}> & {}, {
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
} & {}> & {}, {
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
} & {}> & {}, {
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
} & {}> & {}, {
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
} & {}> & {}, {
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
} & {}> & {}, {
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
} & {}> & {}, {
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
} & {}> & {}, {
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
} & {}> & {}, {
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
} & {}> & {}, {
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
} & {}> & {}, {
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
} & {}> & {}, {
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
} & {}> & {}, {
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
}> & {}, {}>;
declare const VExpandXTransition: vue.DefineComponent<{
    mode: vue.Prop<"in-out" | "out-in" | "default", "in-out" | "out-in" | "default">;
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    mode?: unknown;
} & {} & {
    mode?: "in-out" | "out-in" | "default" | undefined;
}> & {}, {}>;

//# sourceMappingURL=index.d.ts.map

declare const index_d$1_VCode: typeof VCode;
declare const index_d$1_VCounter: typeof VCounter;
type index_d$1_VField = VField;
declare const index_d$1_VComponentIcon: typeof VComponentIcon;
declare const index_d$1_VSvgIcon: typeof VSvgIcon;
declare const index_d$1_VLigatureIcon: typeof VLigatureIcon;
declare const index_d$1_VClassIcon: typeof VClassIcon;
type index_d$1_VInput = VInput;
declare const index_d$1_VKbd: typeof VKbd;
declare const index_d$1_VTextField: typeof VTextField;
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
    _default$1c as VApp,
    _default$1b as VAppBar,
    _default$1a as VAppBarNavIcon,
    _default$19 as VAppBarTitle,
    _default$18 as VAlert,
    _default$17 as VAvatar,
    _default$16 as VBadge,
    _default$15 as VBanner,
    _default$14 as VBannerActions,
    _default$13 as VBannerAvatar,
    _default$12 as VBannerContent,
    _default$11 as VBannerText,
    _default$10 as VBottomNavigation,
    _default$$ as VBreadcrumbs,
    _default$_ as VBreadcrumbsItem,
    _default$Z as VBreadcrumbsDivider,
    _default$Y as VBtn,
    _default$X as VCard,
    _default$W as VCardActions,
    _default$V as VCardAvatar,
    _default$U as VCardHeader,
    _default$T as VCardHeaderText,
    _default$S as VCardImg,
    _default$T as VCardItem,
    _default$R as VCardSubtitle,
    _default$Q as VCardText,
    _default$P as VCardTitle,
    _default$O as VChip,
    index_d$1_VCode as VCode,
    index_d$1_VCounter as VCounter,
    _default$N as VDefaultsProvider,
    _default$M as VDialog,
    _default$L as VDivider,
    _default$K as VExpansionPanels,
    _default$J as VExpansionPanel,
    _default$I as VExpansionPanelText,
    _default$H as VExpansionPanelTitle,
    index_d$1_VField as VField,
    _default$G as VFieldLabel,
    _default$F as VFileInput,
    _default$E as VFooter,
    _default$D as VContainer,
    _default$C as VCol,
    _default$B as VRow,
    _default$A as VSpacer,
    _default$z as VHover,
    _default$y as VIcon,
    index_d$1_VComponentIcon as VComponentIcon,
    index_d$1_VSvgIcon as VSvgIcon,
    index_d$1_VLigatureIcon as VLigatureIcon,
    index_d$1_VClassIcon as VClassIcon,
    _default$x as VImg,
    index_d$1_VInput as VInput,
    _default$w as VItemGroup,
    _default$v as VItem,
    index_d$1_VKbd as VKbd,
    _default$u as VLayout,
    _default$t as VLayoutItem,
    _default$s as VLazy,
    _default$r as VList,
    _default$q as VListSubheader,
    _default$p as VListImg,
    _default$o as VListItem,
    _default$n as VListItemAvatar,
    _default$m as VListItemHeader,
    _default$l as VListItemMedia,
    _default$k as VListItemSubtitle,
    _default$j as VListItemTitle,
    _default$i as VLocaleProvider,
    _default$h as VMain,
    _default$g as VMenu,
    _default$f as VNavigationDrawer,
    _default$e as VNoSsr,
    _default$d as VOverlay,
    _default$c as VPagination,
    _default$b as VPaginationBtn,
    _default$a as VProgressCircular,
    _default$9 as VProgressLinear,
    _default$8 as VRating,
    _default$7 as VResponsive,
    _default$6 as VSheet,
    _default$5 as VSystemBar,
    index_d$1_VTextField as VTextField,
    _default$4 as VThemeProvider,
    _default$3 as VTimeline,
    _default$2 as VTimelineItem,
    _default$1 as VTooltip,
    _default as VDialogTransition,
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
    unmounted(el: HTMLElement): void;
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
declare function unmounted$1(el: HTMLElement): void;
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
declare function unmounted(el: HTMLElement): void;
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

export { DisplayBreakpoint, DisplayInstance, DisplayThresholds, IconAliases, IconProps, IconSet, ThemeDefinition, index_d$1 as components, createVuetify, index_d as directives, provideRtl, useDisplay, useRtl, useTheme, version };
