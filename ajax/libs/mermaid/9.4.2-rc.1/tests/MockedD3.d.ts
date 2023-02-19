/**
 * This is a mocked/stubbed version of the d3 Selection type. Each of the main functions are all
 * mocked (via vi.fn()) so you can track if they have been called, etc.
 *
 * Note that node() returns a HTML Element with tag 'svg'. It is an empty element (no innerHTML, no children, etc).
 * This potentially allows testing of mermaidAPI render().
 */
export declare class MockedD3 {
    attribs: Map<string, string | null>;
    id: string | undefined;
    _children: MockedD3[];
    _containingHTMLdoc: Document;
    constructor(givenId?: string);
    /** Helpful utility during development/debugging. This is not a real d3 function */
    listChildren(): string;
    select: import("@vitest/spy/dist/index").Mock<any[], any>;
    selectAll: import("@vitest/spy/dist/index").Mock<any[], any>;
    append: import("@vitest/spy/dist/index").Mock<any[], any>;
    insert: (type: string, beforeSelector?: string, id?: string) => MockedD3;
    attr(attrName: string): null | undefined | string | number;
    lower(attrValue?: string): this;
    style(attrValue?: string): this;
    text(attrValue?: string): this;
    node: import("@vitest/spy/dist/index").Mock<any[], any>;
    nodes: import("@vitest/spy/dist/index").Mock<any[], any>;
    getBBox: () => {
        x: string | number | null | undefined;
        y: string | number | null | undefined;
        width: string | number | null | undefined;
        height: string | number | null | undefined;
    };
    insertBefore: import("@vitest/spy/dist/index").Mock<any[], any>;
    curveBasis: import("@vitest/spy/dist/index").Mock<any[], any>;
    curveBasisClosed: import("@vitest/spy/dist/index").Mock<any[], any>;
    curveBasisOpen: import("@vitest/spy/dist/index").Mock<any[], any>;
    curveLinear: import("@vitest/spy/dist/index").Mock<any[], any>;
    curveLinearClosed: import("@vitest/spy/dist/index").Mock<any[], any>;
    curveMonotoneX: import("@vitest/spy/dist/index").Mock<any[], any>;
    curveMonotoneY: import("@vitest/spy/dist/index").Mock<any[], any>;
    curveNatural: import("@vitest/spy/dist/index").Mock<any[], any>;
    curveStep: import("@vitest/spy/dist/index").Mock<any[], any>;
    curveStepAfter: import("@vitest/spy/dist/index").Mock<any[], any>;
    curveStepBefore: import("@vitest/spy/dist/index").Mock<any[], any>;
}
