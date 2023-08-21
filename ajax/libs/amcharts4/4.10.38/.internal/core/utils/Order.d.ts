/**
 * A collection of functions for ordering.
 */
/**
 * ============================================================================
 * UTILITY FUNCTIONS
 * ============================================================================
 * @hidden
 */
/**
 * Defines values that ordering functions can return.
 */
export declare type Ordering = -1 | 0 | 1;
/**
 * [reverse description]
 *
 * @ignore Exclude from docs
 * @todo Description
 * @param a  [description]
 * @return [description]
 */
export declare function reverse(a: Ordering): Ordering;
/**
 * [or description]
 *
 * @ignore Exclude from docs
 * @todo Description
 * @param a  Item 1
 * @param b  Item 2
 * @return [description]
 */
export declare function or(a: Ordering, b: Ordering): Ordering;
