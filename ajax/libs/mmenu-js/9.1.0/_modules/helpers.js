/**
 * Deep extend an object with the given defaults.
 * Note that the extended object is not a clone, meaning the original object will also be updated.
 *
 * @param 	{object}	orignl	The object to extend to.
 * @param 	{object}	dfault	The object to extend from.
 * @return	{object}			The extended "orignl" object.
 */
export const extend = (orignl, dfault) => {
    if (type(orignl) != 'object') {
        orignl = {};
    }
    if (type(dfault) != 'object') {
        dfault = {};
    }
    for (let k in dfault) {
        if (!dfault.hasOwnProperty(k)) {
            continue;
        }
        if (typeof orignl[k] == 'undefined') {
            orignl[k] = dfault[k];
        }
        else if (type(orignl[k]) == 'object') {
            extend(orignl[k], dfault[k]);
        }
    }
    return orignl;
};
/**
 * Detect the touch / dragging direction on a touch device.
 *
 * @param   {HTMLElement} surface   The element to monitor for touch events.
 * @return  {object}                Object with "get" function.
 */
export const touchDirection = (surface) => {
    let direction = '';
    let prevPosition = null;
    surface.addEventListener('touchstart', (evnt) => {
        if (evnt.touches.length === 1) {
            direction = '';
            prevPosition = evnt.touches[0].pageY;
        }
    });
    surface.addEventListener('touchend', (evnt) => {
        if (evnt.touches.length === 0) {
            direction = '';
            prevPosition = null;
        }
    });
    surface.addEventListener('touchmove', (evnt) => {
        direction = '';
        if (prevPosition &&
            evnt.touches.length === 1) {
            const currentPosition = evnt.changedTouches[0].pageY;
            if (currentPosition > prevPosition) {
                direction = 'down';
            }
            else if (currentPosition < prevPosition) {
                direction = 'up';
            }
            prevPosition = currentPosition;
        }
    });
    return {
        get: () => direction,
    };
};
/**
 * Get the type of any given variable. Improvement of "typeof".
 *
 * @param 	{any}		variable	The variable.
 * @return	{string}				The type of the variable in lowercase.
 */
export const type = (variable) => {
    return {}.toString
        .call(variable)
        .match(/\s([a-zA-Z]+)/)[1]
        .toLowerCase();
};
/**
 * Get a (page wide) unique ID.
 */
export const uniqueId = () => {
    return `mm-${__id++}`;
};
let __id = 0;
/**
 * Get a prefixed ID from a possibly orifinal ID.
 * @param id The possibly original ID.
 */
export const cloneId = (id) => {
    if (id.slice(0, 9) == 'mm-clone-') {
        return id;
    }
    return `mm-clone-${id}`;
};
/**
 * Get the original ID from a possibly prefixed ID.
 * @param id The possibly prefixed ID.
 */
export const originalId = (id) => {
    if (id.slice(0, 9) == 'mm-clone-') {
        return id.slice(9);
    }
    return id;
};
