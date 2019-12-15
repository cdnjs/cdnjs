/** Collection of callback functions for media querys. */
var listeners = {};
/**
 * Bind functions to a matchMedia listener (subscriber).
 *
 * @param {string|number} 	query 	Media query to match or number for min-width.
 * @param {function} 		yes 	Function to invoke when the media query matches.
 * @param {function} 		no 		Function to invoke when the media query doesn't match.
 */
export function add(query, yes, no) {
    if (typeof query == 'number') {
        query = '(min-width: ' + query + 'px)';
    }
    listeners[query] = listeners[query] || [];
    listeners[query].push({ yes, no });
}
/**
 * Initialize the matchMedia listener.
 */
export function watch() {
    for (let query in listeners) {
        let mqlist = window.matchMedia(query);
        fire(query, mqlist);
        mqlist.onchange = evnt => {
            fire(query, mqlist);
        };
    }
}
/**
 * Invoke the "yes" or "no" function for a matchMedia listener (publisher).
 *
 * @param {string} 			query 	Media query to check for.
 * @param {MediaQueryList} 	mqlist 	Media query list to check with.
 */
export function fire(query, mqlist) {
    var fn = mqlist.matches ? 'yes' : 'no';
    for (let m = 0; m < listeners[query].length; m++) {
        listeners[query][m][fn]();
    }
}
