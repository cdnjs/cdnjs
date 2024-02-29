declare class Theme {
    private values;
    constructor(values?: Map<string, string>);
    add(key: string, value: string): void;
    get(themeKeys: ThemeKey[]): string | null;
    entries(): IterableIterator<[string, string]>;
    clearNamespace(namespace: string): void;
    resolveKey(candidateValue: string, themeKeys: ThemeKey[]): string | null;
    resolve(candidateValue: string, themeKeys: ThemeKey[]): string | null;
    resolveWith(candidateValue: string, themeKeys: ThemeKey[], nestedKeys?: `--${string}`[]): [string, Record<string, string>] | null;
    namespace(namespace: string): Map<string | null, string>;
}
type ThemeKey = '--accent-color' | '--animate' | '--aspect-ratio' | '--backdrop-blur' | '--backdrop-brightness' | '--backdrop-contrast' | '--backdrop-grayscale' | '--backdrop-hue-rotate' | '--backdrop-invert' | '--backdrop-opacity' | '--backdrop-saturate' | '--backdrop-sepia' | '--background-color' | '--background-image' | '--blur' | '--border-color' | '--border-spacing' | '--border-width' | '--box-shadow-color' | '--breakpoint' | '--brightness' | '--caret-color' | '--color' | '--columns' | '--contrast' | '--cursor' | '--default-border-width' | '--divide-width' | '--divide-color' | '--drop-shadow' | '--fill' | '--flex-basis' | '--font-family' | '--font-size' | '--font-weight' | '--gap' | '--gradient-color-stop-positions' | '--grayscale' | '--grid-auto-columns' | '--grid-auto-rows' | '--grid-column' | '--grid-column-end' | '--grid-column-start' | '--grid-row' | '--grid-row-end' | '--grid-row-start' | '--grid-template-columns' | '--grid-template-rows' | '--height' | '--hue-rotate' | '--inset' | '--invert' | '--letter-spacing' | '--line-height' | '--line-clamp' | '--list-style-image' | '--list-style-type' | '--margin' | '--max-height' | '--max-width' | '--min-height' | '--min-width' | '--object-position' | '--opacity' | '--order' | '--outline-color' | '--outline-width' | '--outline-offset' | '--padding' | '--placeholder-color' | '--radius' | '--ring-color' | '--ring-offset-color' | '--ring-offset-width' | '--ring-width' | '--rotate' | '--saturate' | '--scale' | '--scroll-margin' | '--scroll-padding' | '--sepia' | '--shadow' | '--size' | '--skew' | '--space' | '--spacing' | '--stroke' | '--stroke-width' | '--text-color' | '--text-decoration-color' | '--text-decoration-thickness' | '--text-indent' | '--text-underline-offset' | '--transform-origin' | '--transition-delay' | '--transition-duration' | '--transition-property' | '--transition-timing-function' | '--translate' | '--width' | '--z-index';

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
 * E.g.:
 *
 * - `[&_p]`
 */
{
    kind: 'arbitrary';
    selector: string;
}
/**
 * Static variants are variants that don't take any arguments.
 *
 * E.g.:
 *
 * - `hover`
 */
 | {
    kind: 'static';
    root: string;
}
/**
 * Functional variants are variants that take an argument. The argument is
 * either a named variant value or an arbitrary variant value.
 *
 * E.g.:
 *
 * - `aria-disabled`
 * - `aria-[disabled]`
 */
 | {
    kind: 'functional';
    root: string;
    value: ArbitraryVariantValue | NamedVariantValue;
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
};
type Candidate = {
    kind: 'arbitrary';
    property: string;
    value: string;
    variants: Variant[];
    important: boolean;
} | {
    kind: 'named';
    root: string;
    value: ArbitraryUtilityValue | NamedUtilityValue | null;
    modifier: ArbitraryModifier | NamedModifier | null;
    variants: Variant[];
    negative: boolean;
    important: boolean;
};

type UtilityFn = (value: Extract<Candidate, {
    kind: 'named';
}>) => AstNode[] | undefined;

type VariantFn<T extends Variant['kind']> = (rule: Rule, variant: Extract<Variant, {
    kind: T;
}>) => null | void;
type CompareFn = (a: Variant, z: Variant) => number;
declare class Variants {
    private compareFns;
    private variants;
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
    static(name: string, applyFn: VariantFn<'static'>): void;
    functional(name: string, applyFn: VariantFn<'functional'>): void;
    compound(name: string, applyFn: VariantFn<'compound'>): void;
    group(fn: () => void, compareFn?: CompareFn): void;
    has(name: string): boolean;
    get(name: string): VariantFn<any> | undefined;
    kind(name: string): "arbitrary" | "static" | "functional" | "compound";
    compare(a: Variant | null, z: Variant | null): number;
    keys(): IterableIterator<string>;
    private set;
    private nextOrder;
}

type DesignSystem = {
    theme: Theme;
    utilities: Map<string, UtilityFn>;
    variants: Variants;
    getClassOrder(classes: string[]): [string, bigint | null][];
};

declare function optimizeCss(input: string): string;
declare function compile(css: string, rawCandidates: string[]): string;
declare function loadDesignSystem(css: string): DesignSystem;

export { compile, loadDesignSystem, optimizeCss };
