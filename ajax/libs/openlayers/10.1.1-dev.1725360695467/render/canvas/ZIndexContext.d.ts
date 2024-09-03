export default ZIndexContext;
export type ZIndexContextProxy = CanvasRenderingContext2D & {
    globalAlpha: any;
};
/** @typedef {CanvasRenderingContext2D & {globalAlpha: any}} ZIndexContextProxy */
/**
 * @extends {CanvasRenderingContext2D}
 */
declare class ZIndexContext {
    /**
     * @private
     * @type {Array<Array<*>>}
     */
    private instructions_;
    /**
     * @type {number}
     */
    zIndex: number;
    /**
     * @private
     * @type {number}
     */
    private offset_;
    /**
     * @private
     * @type {ZIndexContextProxy}
     */
    private context_;
    /**
     * @private
     * @param {...*} args Args.
     * @return {ZIndexContext} This.
     */
    private pushMethodArgs_;
    /**
     * Push a function that renders to the context directly.
     * @param {function(CanvasRenderingContext2D): void} render Function.
     */
    pushFunction(render: (arg0: CanvasRenderingContext2D) => void): void;
    /**
     * Get a proxy for CanvasRenderingContext2D which does not support getting state
     * (e.g. `context.globalAlpha`, which will return `undefined`). To set state, if it relies on a
     * previous state (e.g. `context.globalAlpha = context.globalAlpha / 2`), set a function,
     * e.g. `context.globalAlpha = (context) => context.globalAlpha / 2`.
     * @return {ZIndexContextProxy} Context.
     */
    getContext(): ZIndexContextProxy;
    /**
     * @param {CanvasRenderingContext2D} context Context.
     */
    draw(context: CanvasRenderingContext2D): void;
    clear(): void;
    /**
     * Offsets the zIndex by the highest current zIndex. Useful for rendering multiple worlds or tiles, to
     * avoid conflicting context.clip() or context.save()/restore() calls.
     */
    offset(): void;
}
//# sourceMappingURL=ZIndexContext.d.ts.map