export default Or;
/**
 * @classdesc
 * Represents a logical `<Or>` operator between two ore more filter conditions.
 * @api
 */
declare class Or extends LogicalNary {
    /**
     * @param {...import("./Filter.js").default} conditions Conditions.
     */
    constructor(...args: import("./Filter.js").default[]);
}
import LogicalNary from "./LogicalNary.js";
//# sourceMappingURL=Or.d.ts.map