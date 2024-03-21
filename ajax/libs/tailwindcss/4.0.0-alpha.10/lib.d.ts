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
};
declare function parseCandidate(input: string, designSystem: DesignSystem): Candidate | null;
declare function parseVariant(variant: string, designSystem: DesignSystem): Variant | null;

type Rule = {
    kind: 'rule';
    selector: string;
    nodes: AstNode[];
};
type Declaration = {
    kind: 'declaration';
    property: string;
    value: string;
    important: boolean;
};
type Comment = {
    kind: 'comment';
    value: string;
};
type AstNode = Rule | Declaration | Comment;

declare class Theme {
    #private;
    private values;
    constructor(values?: Map<string, {
        value: string;
        isReference: boolean;
    }>);
    add(key: string, value: string, isReference?: boolean): void;
    keysInNamespaces(themeKeys: ThemeKey[]): string[];
    get(themeKeys: ThemeKey[]): string | null;
    entries(): IterableIterator<[string, {
        value: string;
        isReference: boolean;
    }]>;
    resolve(candidateValue: string, themeKeys: ThemeKey[]): string | null;
    resolveValue(candidateValue: string, themeKeys: ThemeKey[]): string | null;
    resolveWith(candidateValue: string, themeKeys: ThemeKey[], nestedKeys?: `--${string}`[]): [string, Record<string, string>] | null;
    namespace(namespace: string): Map<string | null, string>;
}
type ThemeKey = '--accent-color' | '--animate' | '--aspect-ratio' | '--backdrop-blur' | '--backdrop-brightness' | '--backdrop-contrast' | '--backdrop-grayscale' | '--backdrop-hue-rotate' | '--backdrop-invert' | '--backdrop-opacity' | '--backdrop-saturate' | '--backdrop-sepia' | '--background-color' | '--background-image' | '--blur' | '--border-color' | '--border-spacing' | '--border-width' | '--box-shadow-color' | '--breakpoint' | '--brightness' | '--caret-color' | '--color' | '--columns' | '--contrast' | '--cursor' | '--default-border-width' | '--default-ring-color' | '--default-ring-width' | '--default-transition-timing-function' | '--default-transition-duration' | '--divide-width' | '--divide-color' | '--drop-shadow' | '--fill' | '--flex-basis' | '--font-family' | '--font-size' | '--font-weight' | '--gap' | '--gradient-color-stop-positions' | '--grayscale' | '--grid-auto-columns' | '--grid-auto-rows' | '--grid-column' | '--grid-column-end' | '--grid-column-start' | '--grid-row' | '--grid-row-end' | '--grid-row-start' | '--grid-template-columns' | '--grid-template-rows' | '--height' | '--hue-rotate' | '--inset' | '--inset-shadow' | '--invert' | '--letter-spacing' | '--line-height' | '--line-clamp' | '--list-style-image' | '--list-style-type' | '--margin' | '--max-height' | '--max-width' | '--min-height' | '--min-width' | '--object-position' | '--opacity' | '--order' | '--outline-color' | '--outline-width' | '--outline-offset' | '--padding' | '--placeholder-color' | '--perspective' | '--perspective-origin' | '--radius' | '--ring-color' | '--ring-offset-color' | '--ring-offset-width' | '--ring-width' | '--rotate' | '--saturate' | '--scale' | '--scroll-margin' | '--scroll-padding' | '--sepia' | '--shadow' | '--size' | '--skew' | '--space' | '--spacing' | '--stroke' | '--stroke-width' | '--text-color' | '--text-decoration-color' | '--text-decoration-thickness' | '--text-indent' | '--text-underline-offset' | '--transform-origin' | '--transition-delay' | '--transition-duration' | '--transition-property' | '--transition-timing-function' | '--translate' | '--width' | '--z-index';

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
    functional(name: string, applyFn: VariantFn<'functional'>, { compounds }?: {
        compounds?: boolean;
    }): void;
    compound(name: string, applyFn: VariantFn<'compound'>, { compounds }?: {
        compounds?: boolean;
    }): void;
    group(fn: () => void, compareFn?: CompareFn): void;
    has(name: string): boolean;
    get(name: string): {
        kind: "arbitrary" | "static" | "functional" | "compound";
        order: number;
        applyFn: VariantFn<any>;
        compounds: boolean;
    } | undefined;
    kind(name: string): "arbitrary" | "static" | "functional" | "compound";
    compounds(name: string): boolean;
    suggest(name: string, suggestions: () => string[]): void;
    getCompletions(name: string): string[];
    compare(a: Variant | null, z: Variant | null): number;
    keys(): IterableIterator<string>;
    entries(): IterableIterator<[string, {
        kind: "arbitrary" | "static" | "functional" | "compound";
        order: number;
        applyFn: VariantFn<any>;
        compounds: boolean;
    }]>;
    private set;
    private nextOrder;
}

declare function compileAstNodes(rawCandidate: string, designSystem: DesignSystem): {
    node: Rule;
    propertySort: number[];
} | null;

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
}>) => AstNode[] | undefined;
interface SuggestionGroup {
    supportsNegative?: boolean;
    values: (string | null)[];
    modifiers: string[];
}
declare class Utilities {
    private utilities;
    private completions;
    static(name: string, compileFn: CompileFn<'static'>): void;
    functional(name: string, compileFn: CompileFn<'functional'>): void;
    arbitrary(compileFn: CompileFn<'arbitrary'>): void;
    has(name: string): boolean;
    get(name: string | symbol): {
        kind: "arbitrary" | "static" | "functional";
        compileFn: CompileFn<any>;
    } | undefined;
    kind(name: string): "arbitrary" | "static" | "functional";
    getCompletions(name: string): SuggestionGroup[];
    suggest(name: string, groups: () => SuggestionGroup[]): void;
    keys(): IterableIterator<string | symbol>;
    entries(): IterableIterator<[string | symbol, {
        kind: "arbitrary" | "static" | "functional";
        compileFn: CompileFn<any>;
    }]>;
    getArbitrary(): CompileFn<any>;
    private set;
}

type DesignSystem = {
    theme: Theme;
    utilities: Utilities;
    variants: Variants;
    candidatesToCss(classes: string[]): (string | null)[];
    getClassOrder(classes: string[]): [string, bigint | null][];
    getClassList(): ClassEntry[];
    getVariants(): VariantEntry[];
    parseCandidate(candidate: string): ReturnType<typeof parseCandidate>;
    parseVariant(variant: string): ReturnType<typeof parseVariant>;
    compileAstNodes(candidate: string): ReturnType<typeof compileAstNodes>;
    getUsedVariants(): ReturnType<typeof parseVariant>[];
};

declare function compile(css: string): {
    build(candidates: string[]): string;
};
declare function __unstable__loadDesignSystem(css: string): DesignSystem;

export { __unstable__loadDesignSystem, compile };
