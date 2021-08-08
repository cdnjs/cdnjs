/**
 * A collection of functions for ordering.
 */
/**
 * [reverse description]
 *
 * @ignore Exclude from docs
 * @todo Description
 * @param a  [description]
 * @return [description]
 */
export function reverse(a) {
    switch (a) {
        case 0:
            return 0;
        case -1:
            return 1;
        case 1:
            return -1;
    }
}
/**
 * [or description]
 *
 * @ignore Exclude from docs
 * @todo Description
 * @param a  Item 1
 * @param b  Item 2
 * @return [description]
 */
export function or(a, b) {
    if (a === 0) {
        return b;
    }
    else {
        return a;
    }
}
//# sourceMappingURL=Order.js.map