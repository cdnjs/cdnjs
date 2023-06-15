export default And;
/**
 * @classdesc
 * Represents a logical `<And>` operator between two or more filter conditions.
 *
 * @abstract
 */
declare class And extends LogicalNary {
    /**
     * @param {...import("./Filter.js").default} conditions Conditions.
     */
    constructor(...args: import("./Filter.js").default[]);
}
import LogicalNary from "./LogicalNary.js";
//# sourceMappingURL=And.d.ts.map