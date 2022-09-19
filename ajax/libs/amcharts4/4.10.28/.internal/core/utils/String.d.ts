/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Ordering } from "./Order";
/**
 * ============================================================================
 * COMPARING FUNCTIONS
 * ============================================================================
 * @hidden
 */
/**
 * Comparing function used for ordering.
 *
 * @ignore Exclude from docs
 * @todo Use localeCompare
 * @param a  Item 1
 * @param b  Item 2
 * @return Result
 */
export declare function order(a: string, b: string): Ordering;
/**
 * ============================================================================
 * OTHER FUNCTIONS
 * ============================================================================
 * @hidden
 */
/**
 * Repeats a `string` number of times as set in `amount`.
 *
 * @ignore Exclude from docs
 * @todo Make this faster
 * @param string  Source string
 * @param amount  Number of times to repeat string
 * @return New string
 */
export declare function repeat(string: string, amount: number): string;
/**
 * Generates a random string `characters` length.
 *
 * @param chars  Number of characters
 * @return Random string
 */
export declare function random(chars: number): string;
