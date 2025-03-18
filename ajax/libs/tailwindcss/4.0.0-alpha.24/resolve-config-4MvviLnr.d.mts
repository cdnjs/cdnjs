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
type AstNode = Rule | Declaration | Comment;

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
    private compareFns;
    private variants;
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
    static(name: string, applyFn: VariantFn<'static'>, { compounds }?: {
        compounds?: boolean;
    }): void;
    fromAst(name: string, ast: AstNode[]): void;
    functional(name: string, applyFn: VariantFn<'functional'>, { compounds }?: {
        compounds?: boolean;
    }): void;
    compound(name: string, applyFn: VariantFn<'compound'>, { compounds }?: {
        compounds?: boolean;
    }): void;
    group(fn: () => void, compareFn?: CompareFn): void;
    has(name: string): boolean;
    get(name: string): {
        kind: Variant["kind"];
        order: number;
        applyFn: VariantFn<any>;
        compounds: boolean;
    } | undefined;
    kind(name: string): "static" | "functional" | "arbitrary" | "compound";
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
    candidatesToCss(classes: string[]): (string | null)[];
    getClassOrder(classes: string[]): [string, bigint | null][];
    getClassList(): ClassEntry[];
    getVariants(): VariantEntry[];
    parseCandidate(candidate: string): Candidate[];
    parseVariant(variant: string): ReturnType<typeof parseVariant>;
    compileAstNodes(candidate: Candidate): ReturnType<typeof compileAstNodes>;
    getUsedVariants(): ReturnType<typeof parseVariant>[];
    resolveThemeValue(path: string): string | undefined;
};

type ArbitraryUtilityValue = {
    kind: 'arbitrary';
    /**
     * bg-[color:--my-color]
     *     ^^^^^
     */
    dataType: string | null;
    /**
     * bg-[#0088cc]
     *     ^^^^^^^
     * bg-[--my_variable]
     * var(^^^^^^^^^^^^^)
     */
    value: string;
    /**
     * bg-[--my_variable]
     *     ^^^^^^^^^^^^^
     */
    dashedIdent: string | null;
};
type NamedUtilityValue = {
    kind: 'named';
    /**
     * bg-red-500
     *    ^^^^^^^
     *
     * w-1/2
     *   ^
     */
    value: string;
    /**
     * w-1/2
     *   ^^^
     */
    fraction: string | null;
};
type ArbitraryModifier = {
    kind: 'arbitrary';
    /**
     * bg-red-500/[50%]
     *             ^^^
     */
    value: string;
    /**
     * bg-red-500/[--my_variable]
     *             ^^^^^^^^^^^^^
     */
    dashedIdent: string | null;
};
type NamedModifier = {
    kind: 'named';
    /**
     * bg-red-500/50
     *            ^^
     */
    value: string;
};
type ArbitraryVariantValue = {
    kind: 'arbitrary';
    value: string;
};
type NamedVariantValue = {
    kind: 'named';
    value: string;
};
type Variant = 
/**
 * Arbitrary variants are variants that take a selector and generate a variant
 * on the fly.
 *
 * E.g.: `[&_p]`
 */
{
    kind: 'arbitrary';
    selector: string;
    compounds: boolean;
    relative: boolean;
}
/**
 * Static variants are variants that don't take any arguments.
 *
 * E.g.: `hover`
 */
 | {
    kind: 'static';
    root: string;
    compounds: boolean;
}
/**
 * Functional variants are variants that can take an argument. The argument is
 * either a named variant value or an arbitrary variant value.
 *
 * E.g.:
 *
 * - `aria-disabled`
 * - `aria-[disabled]`
 * - `@container-size`          -> @container, with named value `size`
 * - `@container-[inline-size]` -> @container, with arbitrary variant value `inline-size`
 * - `@container`               -> @container, with no value
 */
 | {
    kind: 'functional';
    root: string;
    value: ArbitraryVariantValue | NamedVariantValue | null;
    modifier: ArbitraryModifier | NamedModifier | null;
    compounds: boolean;
}
/**
 * Compound variants are variants that take another variant as an argument.
 *
 * E.g.:
 *
 * - `has-[&_p]`
 * - `group-*`
 * - `peer-*`
 */
 | {
    kind: 'compound';
    root: string;
    modifier: ArbitraryModifier | NamedModifier | null;
    variant: Variant;
    compounds: boolean;
};
type Candidate = 
/**
 * Arbitrary candidates are candidates that register utilities on the fly with
 * a property and a value.
 *
 * E.g.:
 *
 * - `[color:red]`
 * - `[color:red]/50`
 * - `[color:red]/50!`
 */
{
    kind: 'arbitrary';
    property: string;
    value: string;
    modifier: ArbitraryModifier | NamedModifier | null;
    variants: Variant[];
    important: boolean;
    raw: string;
}
/**
 * Static candidates are candidates that don't take any arguments.
 *
 * E.g.:
 *
 * - `underline`
 * - `flex`
 */
 | {
    kind: 'static';
    root: string;
    variants: Variant[];
    negative: boolean;
    important: boolean;
    raw: string;
}
/**
 * Functional candidates are candidates that can take an argument.
 *
 * E.g.:
 *
 * - `bg-red-500`
 * - `bg-[#0088cc]`
 * - `w-1/2`
 */
 | {
    kind: 'functional';
    root: string;
    value: ArbitraryUtilityValue | NamedUtilityValue | null;
    modifier: ArbitraryModifier | NamedModifier | null;
    variants: Variant[];
    negative: boolean;
    important: boolean;
    raw: string;
};
declare function parseVariant(variant: string, designSystem: DesignSystem): Variant | null;

interface PluginUtils {
    theme(keypath: string, defaultValue?: any): any;
}

export type { DesignSystem as D, NamedUtilityValue as N, PluginUtils as P };
