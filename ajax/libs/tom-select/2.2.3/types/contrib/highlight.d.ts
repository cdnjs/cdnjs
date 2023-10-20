/**
 * highlight v3 | MIT license | Johann Burkard <jb@eaio.com>
 * Highlights arbitrary terms in a node.
 *
 * - Modified by Marshal <beatgates@gmail.com> 2011-6-24 (added regex)
 * - Modified by Brian Reavis <brian@thirdroute.com> 2012-8-27 (cleanup)
 */
export declare const highlight: (element: HTMLElement, regex: string | RegExp) => void;
/**
 * removeHighlight fn copied from highlight v5 and
 * edited to remove with(), pass js strict mode, and use without jquery
 */
export declare const removeHighlight: (el: HTMLElement) => void;
