/**
 * This is a mocked/stubbed version of the d3 Selection type. Each of the main functions are all
 * mocked (via vi.fn()) so you can track if they have been called, etc.
 *
 * Note that node() returns a HTML Element with tag 'svg'. It is an empty element (no innerHTML, no children, etc).
 * This potentially allows testing of mermaidAPI render().
 */
export declare class MockedD3 {
    attribs: Map<string, string>;
    id: string | undefined;
    _children: MockedD3[];
    _containingHTMLdoc: Document;
    constructor(givenId?: string);
    /** Helpful utility during development/debugging. This is not a real d3 function */
    listChildren(): string;
    select: import("vitest").Mock<any, any>;
    selectAll: import("vitest").Mock<any, any>;
    append: import("vitest").Mock<any, any>;
    insert: (type: string, beforeSelector?: string, id?: string) => MockedD3;
    attr(attrName: string): undefined | string;
    attr(attrName: string, attrValue: string): MockedD3;
    lower(attrValue?: string): this;
    style(attrValue?: string): this;
    text(attrValue?: string): this;
    node: import("vitest").Mock<any, any>;
    nodes: import("vitest").Mock<any, any>;
    getBBox: () => {
        x: string | number | undefined;
        y: string | number | undefined;
        width: string | number | undefined;
        height: string | number | undefined;
    };
    insertBefore: import("vitest").Mock<any, any>;
    curveBasis: import("vitest").Mock<any, any>;
    curveBasisClosed: import("vitest").Mock<any, any>;
    curveBasisOpen: import("vitest").Mock<any, any>;
    curveLinear: import("vitest").Mock<any, any>;
    curveLinearClosed: import("vitest").Mock<any, any>;
    curveMonotoneX: import("vitest").Mock<any, any>;
    curveMonotoneY: import("vitest").Mock<any, any>;
    curveNatural: import("vitest").Mock<any, any>;
    curveStep: import("vitest").Mock<any, any>;
    curveStepAfter: import("vitest").Mock<any, any>;
    curveStepBefore: import("vitest").Mock<any, any>;
}
