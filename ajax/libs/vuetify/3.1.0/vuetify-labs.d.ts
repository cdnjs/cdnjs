import * as vue from 'vue';
import { PropType } from 'vue';

declare type SelectItemKey = boolean | string | (string | number)[] | ((item: Record<string, any>, fallback?: any) => any);

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

declare type DataTableCompareFunction<T = any> = (a: T, b: T) => number;
declare type DataTableHeader = {
    key: string;
    value?: SelectItemKey;
    title: string;
    colspan?: number;
    rowspan?: number;
    fixed?: boolean;
    align?: 'start' | 'end';
    width?: number;
    minWidth?: string;
    maxWidth?: string;
    sortable?: boolean;
    sort?: DataTableCompareFunction;
};
declare type DataTableItem = InternalItem & {
    type: 'item';
    columns: Record<string, unknown>;
};
declare type GroupHeaderItem = {
    type: 'group-header';
    id: string;
    key: string;
    value: string;
    depth: number;
    items: (GroupHeaderItem | DataTableItem)[];
};
declare type InternalDataTableItem = DataTableItem | GroupHeaderItem;

declare type SortItem = {
    key: string;
    order?: boolean | 'asc' | 'desc';
};

/**
 * - match without highlight
 * - single match (index), length already known
 * - single match (start, end)
 * - multiple matches (start, end), probably shouldn't overlap
 */
declare type FilterMatch = boolean | number | [number, number] | [number, number][];
declare type FilterFunction = (value: string, query: string, item?: any) => FilterMatch;
declare type FilterKeyFunctions = Record<string, FilterFunction>;
declare type FilterKeys = string | string[];
declare type FilterMode = 'some' | 'every' | 'union' | 'intersection';

declare const VDataTable: vue.DefineComponent<{
    customFilter: vue.PropType<FilterFunction>;
    customKeyFilter: vue.PropType<FilterKeyFunctions>;
    filterKeys: vue.PropType<FilterKeys>;
    filterMode: {
        type: vue.PropType<FilterMode>;
        default: string;
    };
    noFilter: BooleanConstructor;
    page: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    itemsPerPage: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    sortBy: {
        type: vue.PropType<SortItem[]>;
        default: () => never[];
    };
    multiSort: BooleanConstructor;
    mustSort: BooleanConstructor;
    showSelect: BooleanConstructor;
    modelValue: {
        type: vue.PropType<any[]>;
        default: () => never[];
    };
    groupBy: {
        type: vue.PropType<SortItem[]>;
        default: () => never[];
    };
    expandOnClick: BooleanConstructor;
    showExpand: BooleanConstructor;
    expanded: {
        type: vue.PropType<string[]>;
        default: () => never[];
    };
    hideNoData: BooleanConstructor;
    noDataText: {
        type: StringConstructor;
        default: string;
    };
    height: (StringConstructor | NumberConstructor)[];
    width: (StringConstructor | NumberConstructor)[];
    fixedHeader: BooleanConstructor;
    fixedFooter: BooleanConstructor;
    headers: {
        type: vue.PropType<DataTableHeader[] | DataTableHeader[][]>;
        default: () => never[];
    };
    items: {
        type: vue.PropType<any[]>;
        default: () => never[];
    };
    itemTitle: {
        type: vue.PropType<SelectItemKey>;
        default: string;
    };
    itemValue: Omit<{
        type: vue.PropType<SelectItemKey>;
        default: string;
    }, "type" | "default"> & {
        type: vue.PropType<SelectItemKey>;
        default: SelectItemKey;
    };
    itemChildren: {
        type: vue.PropType<SelectItemKey>;
        default: string;
    };
    itemProps: {
        type: vue.PropType<SelectItemKey>;
        default: string;
    };
    returnObject: BooleanConstructor;
    search: StringConstructor;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (value: any[]) => true;
    'update:page': (value: number) => true;
    'update:itemsPerPage': (value: number) => true;
    'update:sortBy': (value: any) => true;
    'update:options': (value: any) => true;
    'update:groupBy': (value: any) => true;
    'update:expanded': (value: any) => true;
    'click:row': (event: Event, value: {
        item: DataTableItem;
    }) => true;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{
    customFilter: vue.PropType<FilterFunction>;
    customKeyFilter: vue.PropType<FilterKeyFunctions>;
    filterKeys: vue.PropType<FilterKeys>;
    filterMode: {
        type: vue.PropType<FilterMode>;
        default: string;
    };
    noFilter: BooleanConstructor;
    page: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    itemsPerPage: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    sortBy: {
        type: vue.PropType<SortItem[]>;
        default: () => never[];
    };
    multiSort: BooleanConstructor;
    mustSort: BooleanConstructor;
    showSelect: BooleanConstructor;
    modelValue: {
        type: vue.PropType<any[]>;
        default: () => never[];
    };
    groupBy: {
        type: vue.PropType<SortItem[]>;
        default: () => never[];
    };
    expandOnClick: BooleanConstructor;
    showExpand: BooleanConstructor;
    expanded: {
        type: vue.PropType<string[]>;
        default: () => never[];
    };
    hideNoData: BooleanConstructor;
    noDataText: {
        type: StringConstructor;
        default: string;
    };
    height: (StringConstructor | NumberConstructor)[];
    width: (StringConstructor | NumberConstructor)[];
    fixedHeader: BooleanConstructor;
    fixedFooter: BooleanConstructor;
    headers: {
        type: vue.PropType<DataTableHeader[] | DataTableHeader[][]>;
        default: () => never[];
    };
    items: {
        type: vue.PropType<any[]>;
        default: () => never[];
    };
    itemTitle: {
        type: vue.PropType<SelectItemKey>;
        default: string;
    };
    itemValue: Omit<{
        type: vue.PropType<SelectItemKey>;
        default: string;
    }, "type" | "default"> & {
        type: vue.PropType<SelectItemKey>;
        default: SelectItemKey;
    };
    itemChildren: {
        type: vue.PropType<SelectItemKey>;
        default: string;
    };
    itemProps: {
        type: vue.PropType<SelectItemKey>;
        default: string;
    };
    returnObject: BooleanConstructor;
    search: StringConstructor;
}>> & {
    "onUpdate:modelValue"?: ((value: any[]) => any) | undefined;
    "onUpdate:sortBy"?: ((value: any) => any) | undefined;
    "onUpdate:expanded"?: ((value: any) => any) | undefined;
    "onClick:row"?: ((event: Event, value: {
        item: DataTableItem;
    }) => any) | undefined;
    "onUpdate:page"?: ((value: number) => any) | undefined;
    "onUpdate:itemsPerPage"?: ((value: number) => any) | undefined;
    "onUpdate:options"?: ((value: any) => any) | undefined;
    "onUpdate:groupBy"?: ((value: any) => any) | undefined;
}, {
    expanded: string[];
    page: string | number;
    headers: DataTableHeader[] | DataTableHeader[][];
    noDataText: string;
    sortBy: SortItem[];
    items: any[];
    modelValue: any[];
    itemTitle: SelectItemKey;
    itemValue: SelectItemKey;
    itemChildren: SelectItemKey;
    itemProps: SelectItemKey;
    returnObject: boolean;
    hideNoData: boolean;
    filterMode: FilterMode;
    noFilter: boolean;
    fixedHeader: boolean;
    fixedFooter: boolean;
    multiSort: boolean;
    mustSort: boolean;
    groupBy: SortItem[];
    showSelect: boolean;
    expandOnClick: boolean;
    showExpand: boolean;
    itemsPerPage: string | number;
}>;
declare type VDataTable = InstanceType<typeof VDataTable>;

declare const VDataTableRows: vue.DefineComponent<{
    loading: (StringConstructor | BooleanConstructor)[];
    loadingText: {
        type: StringConstructor;
        default: string;
    };
    hideNoData: BooleanConstructor;
    items: {
        type: PropType<InternalDataTableItem[]>;
        default: () => never[];
    };
    noDataText: {
        type: StringConstructor;
        default: string;
    };
    rowHeight: NumberConstructor;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'click:row': (event: Event, value: {
        item: DataTableItem;
    }) => true;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{
    loading: (StringConstructor | BooleanConstructor)[];
    loadingText: {
        type: StringConstructor;
        default: string;
    };
    hideNoData: BooleanConstructor;
    items: {
        type: PropType<InternalDataTableItem[]>;
        default: () => never[];
    };
    noDataText: {
        type: StringConstructor;
        default: string;
    };
    rowHeight: NumberConstructor;
}>> & {
    "onClick:row"?: ((event: Event, value: {
        item: DataTableItem;
    }) => any) | undefined;
}, {
    noDataText: string;
    loadingText: string;
    items: InternalDataTableItem[];
    hideNoData: boolean;
}>;
declare type VDataTableRows = InstanceType<typeof VDataTableRows>;

declare const VDataTableRow: vue.DefineComponent<{
    item: PropType<DataTableItem>;
}, void, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{
    item: PropType<DataTableItem>;
}>>, {}>;
declare type VDataTableRow = InstanceType<typeof VDataTableRow>;

declare const VDataTableVirtual: vue.DefineComponent<{
    customFilter: vue.PropType<FilterFunction>;
    customKeyFilter: vue.PropType<FilterKeyFunctions>;
    filterKeys: vue.PropType<FilterKeys>;
    filterMode: {
        type: vue.PropType<FilterMode>;
        default: string;
    };
    noFilter: BooleanConstructor;
    visibleItems: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    itemHeight: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    sortBy: {
        type: vue.PropType<SortItem[]>;
        default: () => never[];
    };
    multiSort: BooleanConstructor;
    mustSort: BooleanConstructor;
    showSelect: BooleanConstructor;
    modelValue: {
        type: vue.PropType<any[]>;
        default: () => never[];
    };
    items: {
        type: vue.PropType<any[]>;
        default: () => never[];
    };
    itemTitle: {
        type: vue.PropType<SelectItemKey>;
        default: string;
    };
    itemValue: Omit<{
        type: vue.PropType<SelectItemKey>;
        default: string;
    }, "type" | "default"> & {
        type: vue.PropType<SelectItemKey>;
        default: SelectItemKey;
    };
    itemChildren: {
        type: vue.PropType<SelectItemKey>;
        default: string;
    };
    itemProps: {
        type: vue.PropType<SelectItemKey>;
        default: string;
    };
    returnObject: BooleanConstructor;
    headers: {
        type: vue.PropType<DataTableHeader[] | DataTableHeader[][]>;
        default: () => never[];
    };
    expandOnClick: BooleanConstructor;
    showExpand: BooleanConstructor;
    expanded: {
        type: vue.PropType<string[]>;
        default: () => never[];
    };
    groupBy: {
        type: vue.PropType<SortItem[]>;
        default: () => never[];
    };
    hideNoData: BooleanConstructor;
    noDataText: {
        type: StringConstructor;
        default: string;
    };
    height: (StringConstructor | NumberConstructor)[];
    width: (StringConstructor | NumberConstructor)[];
    fixedHeader: BooleanConstructor;
    fixedFooter: BooleanConstructor;
    search: StringConstructor;
}, void, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (value: any[]) => true;
    'update:sortBy': (value: any) => true;
    'update:options': (value: any) => true;
    'update:groupBy': (value: any) => true;
    'update:expanded': (value: any) => true;
    'click:row': (event: Event, value: {
        item: DataTableItem;
    }) => true;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{
    customFilter: vue.PropType<FilterFunction>;
    customKeyFilter: vue.PropType<FilterKeyFunctions>;
    filterKeys: vue.PropType<FilterKeys>;
    filterMode: {
        type: vue.PropType<FilterMode>;
        default: string;
    };
    noFilter: BooleanConstructor;
    visibleItems: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    itemHeight: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    sortBy: {
        type: vue.PropType<SortItem[]>;
        default: () => never[];
    };
    multiSort: BooleanConstructor;
    mustSort: BooleanConstructor;
    showSelect: BooleanConstructor;
    modelValue: {
        type: vue.PropType<any[]>;
        default: () => never[];
    };
    items: {
        type: vue.PropType<any[]>;
        default: () => never[];
    };
    itemTitle: {
        type: vue.PropType<SelectItemKey>;
        default: string;
    };
    itemValue: Omit<{
        type: vue.PropType<SelectItemKey>;
        default: string;
    }, "type" | "default"> & {
        type: vue.PropType<SelectItemKey>;
        default: SelectItemKey;
    };
    itemChildren: {
        type: vue.PropType<SelectItemKey>;
        default: string;
    };
    itemProps: {
        type: vue.PropType<SelectItemKey>;
        default: string;
    };
    returnObject: BooleanConstructor;
    headers: {
        type: vue.PropType<DataTableHeader[] | DataTableHeader[][]>;
        default: () => never[];
    };
    expandOnClick: BooleanConstructor;
    showExpand: BooleanConstructor;
    expanded: {
        type: vue.PropType<string[]>;
        default: () => never[];
    };
    groupBy: {
        type: vue.PropType<SortItem[]>;
        default: () => never[];
    };
    hideNoData: BooleanConstructor;
    noDataText: {
        type: StringConstructor;
        default: string;
    };
    height: (StringConstructor | NumberConstructor)[];
    width: (StringConstructor | NumberConstructor)[];
    fixedHeader: BooleanConstructor;
    fixedFooter: BooleanConstructor;
    search: StringConstructor;
}>> & {
    "onUpdate:modelValue"?: ((value: any[]) => any) | undefined;
    "onUpdate:sortBy"?: ((value: any) => any) | undefined;
    "onUpdate:expanded"?: ((value: any) => any) | undefined;
    "onClick:row"?: ((event: Event, value: {
        item: DataTableItem;
    }) => any) | undefined;
    "onUpdate:options"?: ((value: any) => any) | undefined;
    "onUpdate:groupBy"?: ((value: any) => any) | undefined;
}, {
    expanded: string[];
    headers: DataTableHeader[] | DataTableHeader[][];
    noDataText: string;
    sortBy: SortItem[];
    items: any[];
    modelValue: any[];
    itemTitle: SelectItemKey;
    itemValue: SelectItemKey;
    itemChildren: SelectItemKey;
    itemProps: SelectItemKey;
    returnObject: boolean;
    hideNoData: boolean;
    filterMode: FilterMode;
    noFilter: boolean;
    fixedHeader: boolean;
    fixedFooter: boolean;
    multiSort: boolean;
    mustSort: boolean;
    groupBy: SortItem[];
    showSelect: boolean;
    expandOnClick: boolean;
    showExpand: boolean;
    visibleItems: string | number;
    itemHeight: string | number;
}>;
declare type VDataTableVirtual = InstanceType<typeof VDataTableVirtual>;

declare const VDataTableServer: vue.DefineComponent<{
    page: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    itemsPerPage: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    sortBy: {
        type: vue.PropType<SortItem[]>;
        default: () => never[];
    };
    multiSort: BooleanConstructor;
    mustSort: BooleanConstructor;
    showSelect: BooleanConstructor;
    modelValue: {
        type: vue.PropType<any[]>;
        default: () => never[];
    };
    items: {
        type: vue.PropType<any[]>;
        default: () => never[];
    };
    itemTitle: {
        type: vue.PropType<SelectItemKey>;
        default: string;
    };
    itemValue: Omit<{
        type: vue.PropType<SelectItemKey>;
        default: string;
    }, "type" | "default"> & {
        type: vue.PropType<SelectItemKey>;
        default: SelectItemKey;
    };
    itemChildren: {
        type: vue.PropType<SelectItemKey>;
        default: string;
    };
    itemProps: {
        type: vue.PropType<SelectItemKey>;
        default: string;
    };
    returnObject: BooleanConstructor;
    headers: {
        type: vue.PropType<DataTableHeader[] | DataTableHeader[][]>;
        default: () => never[];
    };
    expandOnClick: BooleanConstructor;
    showExpand: BooleanConstructor;
    expanded: {
        type: vue.PropType<string[]>;
        default: () => never[];
    };
    hideNoData: BooleanConstructor;
    noDataText: {
        type: StringConstructor;
        default: string;
    };
    height: (StringConstructor | NumberConstructor)[];
    width: (StringConstructor | NumberConstructor)[];
    fixedHeader: BooleanConstructor;
    fixedFooter: BooleanConstructor;
    color: StringConstructor;
    loading: (StringConstructor | BooleanConstructor)[];
    loadingText: {
        type: StringConstructor;
        default: string;
    };
    itemsLength: (StringConstructor | NumberConstructor)[];
}, void, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (value: any[]) => true;
    'update:page': (page: number) => true;
    'update:itemsPerPage': (page: number) => true;
    'update:sortBy': (sortBy: any) => true;
    'update:options': (options: any) => true;
    'update:expanded': (options: any) => true;
    'click:row': (event: Event, value: {
        item: DataTableItem;
    }) => true;
}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{
    page: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    itemsPerPage: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    sortBy: {
        type: vue.PropType<SortItem[]>;
        default: () => never[];
    };
    multiSort: BooleanConstructor;
    mustSort: BooleanConstructor;
    showSelect: BooleanConstructor;
    modelValue: {
        type: vue.PropType<any[]>;
        default: () => never[];
    };
    items: {
        type: vue.PropType<any[]>;
        default: () => never[];
    };
    itemTitle: {
        type: vue.PropType<SelectItemKey>;
        default: string;
    };
    itemValue: Omit<{
        type: vue.PropType<SelectItemKey>;
        default: string;
    }, "type" | "default"> & {
        type: vue.PropType<SelectItemKey>;
        default: SelectItemKey;
    };
    itemChildren: {
        type: vue.PropType<SelectItemKey>;
        default: string;
    };
    itemProps: {
        type: vue.PropType<SelectItemKey>;
        default: string;
    };
    returnObject: BooleanConstructor;
    headers: {
        type: vue.PropType<DataTableHeader[] | DataTableHeader[][]>;
        default: () => never[];
    };
    expandOnClick: BooleanConstructor;
    showExpand: BooleanConstructor;
    expanded: {
        type: vue.PropType<string[]>;
        default: () => never[];
    };
    hideNoData: BooleanConstructor;
    noDataText: {
        type: StringConstructor;
        default: string;
    };
    height: (StringConstructor | NumberConstructor)[];
    width: (StringConstructor | NumberConstructor)[];
    fixedHeader: BooleanConstructor;
    fixedFooter: BooleanConstructor;
    color: StringConstructor;
    loading: (StringConstructor | BooleanConstructor)[];
    loadingText: {
        type: StringConstructor;
        default: string;
    };
    itemsLength: (StringConstructor | NumberConstructor)[];
}>> & {
    "onUpdate:modelValue"?: ((value: any[]) => any) | undefined;
    "onUpdate:sortBy"?: ((sortBy: any) => any) | undefined;
    "onUpdate:expanded"?: ((options: any) => any) | undefined;
    "onClick:row"?: ((event: Event, value: {
        item: DataTableItem;
    }) => any) | undefined;
    "onUpdate:page"?: ((page: number) => any) | undefined;
    "onUpdate:itemsPerPage"?: ((page: number) => any) | undefined;
    "onUpdate:options"?: ((options: any) => any) | undefined;
}, {
    expanded: string[];
    page: string | number;
    headers: DataTableHeader[] | DataTableHeader[][];
    noDataText: string;
    loadingText: string;
    sortBy: SortItem[];
    items: any[];
    modelValue: any[];
    itemTitle: SelectItemKey;
    itemValue: SelectItemKey;
    itemChildren: SelectItemKey;
    itemProps: SelectItemKey;
    returnObject: boolean;
    hideNoData: boolean;
    fixedHeader: boolean;
    fixedFooter: boolean;
    multiSort: boolean;
    mustSort: boolean;
    showSelect: boolean;
    expandOnClick: boolean;
    showExpand: boolean;
    itemsPerPage: string | number;
}>;
declare type VDataTableServer = InstanceType<typeof VDataTableServer>;

interface VVirtualScrollSlot<T> {
    item: T;
    index: number;
}
declare const VVirtualScroll: {
    new (...args: any[]): {
        $: vue.ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            visibleItems: string | number;
            itemKey: string;
        }> & Omit<Readonly<vue.ExtractPropTypes<Omit<{
            height: (StringConstructor | NumberConstructor)[];
            maxHeight: (StringConstructor | NumberConstructor)[];
            maxWidth: (StringConstructor | NumberConstructor)[];
            minHeight: (StringConstructor | NumberConstructor)[];
            minWidth: (StringConstructor | NumberConstructor)[];
            width: (StringConstructor | NumberConstructor)[];
            items: {
                type: ArrayConstructor;
                default: () => never[];
            };
            itemKey: {
                type: StringConstructor;
                default: string;
            };
            itemHeight: (StringConstructor | NumberConstructor)[];
            visibleItems: {
                type: (StringConstructor | NumberConstructor)[];
                default: number;
            };
        }, "$children" | "items" | "v-slots" | "v-slot:default">>> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "visibleItems" | "itemKey">;
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
        $options: vue.ComponentOptionsBase<Readonly<vue.ExtractPropTypes<Omit<{
            height: (StringConstructor | NumberConstructor)[];
            maxHeight: (StringConstructor | NumberConstructor)[];
            maxWidth: (StringConstructor | NumberConstructor)[];
            minHeight: (StringConstructor | NumberConstructor)[];
            minWidth: (StringConstructor | NumberConstructor)[];
            width: (StringConstructor | NumberConstructor)[];
            items: {
                type: ArrayConstructor;
                default: () => never[];
            };
            itemKey: {
                type: StringConstructor;
                default: string;
            };
            itemHeight: (StringConstructor | NumberConstructor)[];
            visibleItems: {
                type: (StringConstructor | NumberConstructor)[];
                default: number;
            };
        }, "$children" | "items" | "v-slots" | "v-slot:default">>>, void, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Omit<Record<string, any>, "$children" | "items" | "v-slots" | "v-slot:default">, string, {
            visibleItems: string | number;
            itemKey: string;
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
    } & Readonly<vue.ExtractPropTypes<Omit<{
        height: (StringConstructor | NumberConstructor)[];
        maxHeight: (StringConstructor | NumberConstructor)[];
        maxWidth: (StringConstructor | NumberConstructor)[];
        minHeight: (StringConstructor | NumberConstructor)[];
        minWidth: (StringConstructor | NumberConstructor)[];
        width: (StringConstructor | NumberConstructor)[];
        items: {
            type: ArrayConstructor;
            default: () => never[];
        };
        itemKey: {
            type: StringConstructor;
            default: string;
        };
        itemHeight: (StringConstructor | NumberConstructor)[];
        visibleItems: {
            type: (StringConstructor | NumberConstructor)[];
            default: number;
        };
    }, "$children" | "items" | "v-slots" | "v-slot:default">>> & vue.ShallowUnwrapRef<{}> & {} & vue.ComponentCustomProperties;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & vue.ComponentOptionsBase<Readonly<vue.ExtractPropTypes<Omit<{
    height: (StringConstructor | NumberConstructor)[];
    maxHeight: (StringConstructor | NumberConstructor)[];
    maxWidth: (StringConstructor | NumberConstructor)[];
    minHeight: (StringConstructor | NumberConstructor)[];
    minWidth: (StringConstructor | NumberConstructor)[];
    width: (StringConstructor | NumberConstructor)[];
    items: {
        type: ArrayConstructor;
        default: () => never[];
    };
    itemKey: {
        type: StringConstructor;
        default: string;
    };
    itemHeight: (StringConstructor | NumberConstructor)[];
    visibleItems: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
}, "$children" | "items" | "v-slots" | "v-slot:default">>>, void, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Omit<Record<string, any>, "$children" | "items" | "v-slots" | "v-slot:default">, string, {
    visibleItems: string | number;
    itemKey: string;
}> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & (new <T>() => {
    $props: {
        items: readonly T[];
    } & {
        $children?: vue.VNodeChild | {
            default?: ((args_0: VVirtualScrollSlot<T>) => vue.VNodeChild) | undefined;
        } | ((args_0: VVirtualScrollSlot<T>) => vue.VNodeChild);
        'v-slots'?: {
            default?: false | ((args_0: VVirtualScrollSlot<T>) => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:default"?: false | ((args_0: VVirtualScrollSlot<T>) => vue.VNodeChild) | undefined;
    };
});
declare type VVirtualScroll = InstanceType<typeof VVirtualScroll>;

//# sourceMappingURL=components.d.ts.map

declare const components_d_VDataTable: typeof VDataTable;
declare const components_d_VDataTableRows: typeof VDataTableRows;
declare const components_d_VDataTableRow: typeof VDataTableRow;
declare const components_d_VDataTableVirtual: typeof VDataTableVirtual;
declare const components_d_VDataTableServer: typeof VDataTableServer;
declare const components_d_VVirtualScroll: typeof VVirtualScroll;
declare namespace components_d {
  export {
    components_d_VDataTable as VDataTable,
    components_d_VDataTableRows as VDataTableRows,
    components_d_VDataTableRow as VDataTableRow,
    components_d_VDataTableVirtual as VDataTableVirtual,
    components_d_VDataTableServer as VDataTableServer,
    components_d_VVirtualScroll as VVirtualScroll,
  };
}

export { components_d as components };
