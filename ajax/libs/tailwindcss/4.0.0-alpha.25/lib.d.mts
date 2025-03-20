import { U as UserConfig, P as Plugin } from './types-D_qOw1fc.mjs';
import { V as Variant, C as Candidate } from './resolve-config-CaMNEFdQ.mjs';

type Rule = {
    kind: 'rule';
    selector: string;
    nodes: AstNode[];
};
type Declaration = {
    kind: 'declaration';
    property: string;
    value: string | undefined;
    important: boolean;
};
type Comment = {
    kind: 'comment';
    value: string;
};
type Context = {
    kind: 'context';
    context: Record<string, string>;
    nodes: AstNode[];
};
type AstNode = Rule | Declaration | Comment | Context;

declare const enum ThemeOptions {
    NONE = 0,
    INLINE = 1,
    REFERENCE = 2,
    DEFAULT = 4
}
declare class Theme {
    #private;
    private values;
    constructor(values?: Map<string, {
        value: string;
        options: number;
    }>);
    add(key: string, value: string, options?: ThemeOptions): void;
    keysInNamespaces(themeKeys: ThemeKey[]): string[];
    get(themeKeys: ThemeKey[]): string | null;
    hasDefault(key: string): boolean;
    getOptions(key: string): number;
    entries(): IterableIterator<[string, {
        value: string;
        options: number;
    }]>;
    resolve(candidateValue: string | null, themeKeys: ThemeKey[]): string | null;
    resolveValue(candidateValue: string | null, themeKeys: ThemeKey[]): string | null;
    resolveWith(candidateValue: string, themeKeys: ThemeKey[], nestedKeys?: `--${string}`[]): [string, Record<string, string>] | null;
    namespace(namespace: string): Map<string | null, string>;
}
type ThemeKey = `--${string}`;

type VariantFn<T extends Variant['kind']> = (rule: Rule, variant: Extract<Variant, {
    kind: T;
}>) => null | void;
type CompareFn = (a: Variant, z: Variant) => number;
declare class Variants {
    compareFns: Map<number, CompareFn>;
    variants: Map<string, {
        kind: Variant["kind"];
        order: number;
        applyFn: VariantFn<any>;
        compounds: boolean;
    }>;
    private completions;
    /**
     * Registering a group of variants should result in the same sort number for
     * all the variants. This is to ensure that the variants are applied in the
     * correct order.
     */
    private groupOrder;
    /**
     * Keep track of the last sort order instead of using the size of the map to
     * avoid unnecessarily skipping order numbers.
     */
    private lastOrder;
    static(name: string, applyFn: VariantFn<'static'>, { compounds, order }?: {
        compounds?: boolean;
        order?: number;
    }): void;
    fromAst(name: string, ast: AstNode[]): void;
    functional(name: string, applyFn: VariantFn<'functional'>, { compounds, order }?: {
        compounds?: boolean;
        order?: number;
    }): void;
    compound(name: string, applyFn: VariantFn<'compound'>, { compounds, order }?: {
        compounds?: boolean;
        order?: number;
    }): void;
    group(fn: () => void, compareFn?: CompareFn): void;
    has(name: string): boolean;
    get(name: string): {
        kind: Variant["kind"];
        order: number;
        applyFn: VariantFn<any>;
        compounds: boolean;
    } | undefined;
    kind(name: string): "static" | "arbitrary" | "functional" | "compound";
    compounds(name: string): boolean;
    suggest(name: string, suggestions: () => string[]): void;
    getCompletions(name: string): string[];
    compare(a: Variant | null, z: Variant | null): number;
    keys(): IterableIterator<string>;
    entries(): IterableIterator<[string, {
        kind: Variant["kind"];
        order: number;
        applyFn: VariantFn<any>;
        compounds: boolean;
    }]>;
    private set;
    private nextOrder;
}

declare function compileAstNodes(candidate: Candidate, designSystem: DesignSystem): {
    node: AstNode;
    propertySort: number[];
}[];

interface ClassMetadata {
    modifiers: string[];
}
type ClassEntry = [string, ClassMetadata];
interface SelectorOptions {
    modifier?: string;
    value?: string;
}
interface VariantEntry {
    name: string;
    isArbitrary: boolean;
    values: string[];
    hasDash: boolean;
    selectors: (options: SelectorOptions) => string[];
}

type CompileFn<T extends Candidate['kind']> = (value: Extract<Candidate, {
    kind: T;
}>) => AstNode[] | undefined | null;
interface SuggestionGroup {
    supportsNegative?: boolean;
    values: (string | null)[];
    modifiers: string[];
}
type UtilityOptions = {
    types: string[];
};
type Utility = {
    kind: 'static' | 'functional';
    compileFn: CompileFn<any>;
    options?: UtilityOptions;
};
declare class Utilities {
    private utilities;
    private completions;
    static(name: string, compileFn: CompileFn<'static'>): void;
    functional(name: string, compileFn: CompileFn<'functional'>, options?: UtilityOptions): void;
    has(name: string, kind: 'static' | 'functional'): boolean;
    get(name: string): Utility[];
    getCompletions(name: string): SuggestionGroup[];
    suggest(name: string, groups: () => SuggestionGroup[]): void;
    keys(kind: 'static' | 'functional'): string[];
}

type DesignSystem = {
    theme: Theme;
    utilities: Utilities;
    variants: Variants;
    getClassOrder(classes: string[]): [string, bigint | null][];
    getClassList(): ClassEntry[];
    getVariants(): VariantEntry[];
    parseCandidate(candidate: string): Candidate[];
    parseVariant(variant: string): Variant | null;
    compileAstNodes(candidate: Candidate): ReturnType<typeof compileAstNodes>;
    getVariantOrder(): Map<Variant, number>;
    resolveThemeValue(path: string): string | undefined;
    candidatesToCss(classes: string[]): (string | null)[];
};

type Config = UserConfig;
type CompileOptions = {
    base?: string;
    loadModule?: (id: string, base: string, resourceHint: 'plugin' | 'config') => Promise<{
        module: Plugin | Config;
        base: string;
    }>;
    loadStylesheet?: (id: string, base: string) => Promise<{
        content: string;
        base: string;
    }>;
};
declare function compile(css: string, opts?: CompileOptions): Promise<{
    globs: {
        base: string;
        pattern: string;
    }[];
    build(candidates: string[]): string;
}>;
declare function __unstable__loadDesignSystem(css: string, opts?: CompileOptions): Promise<DesignSystem>;
declare function postcssPluginWarning(): void;

export { type Config, __unstable__loadDesignSystem, compile, postcssPluginWarning as default };
