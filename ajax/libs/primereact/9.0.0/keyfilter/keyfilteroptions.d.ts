/**
 *
 * This module contains common options and types of components that use KeyFilter.
 *
 * @module keyfilter
 *
 */

/**
 * Defines the type of keyfilter property in components.
 *
 * @see {@link inputtext}
 * @see {@link password}
 * ...
 */
export type KeyFilterType = 'pint' | 'int' | 'pnum' | 'money' | 'num' | 'hex' | 'email' | 'alpha' | 'alphanum' | RegExp;
