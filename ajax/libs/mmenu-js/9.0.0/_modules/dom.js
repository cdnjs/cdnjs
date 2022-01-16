/**
 * Create an element with classname.
 *
 * @param 	{string}		selector	The nodeName and classnames for the element to create.
 * @return	{HTMLElement}				The created element.
 */
export const create = (selector) => {
    const args = selector.split('.'), elem = document.createElement(args.shift());
    elem.classList.add(...args);
    return elem;
};
/**
 * Find all elements matching the selector.
 * Basically the same as element.querySelectorAll() but it returns an actuall array.
 *
 * @param 	{HTMLElement} 	element Element to search in.
 * @param 	{string}		filter	The filter to match.
 * @return	{array}					Array of elements that match the filter.
 */
export const find = (element, filter) => {
    return filter.length ? [].slice.call(element.querySelectorAll(filter)) : [];
};
/**
 * Find all child elements matching the (optional) selector.
 *
 * @param 	{HTMLElement} 	element Element to search in.
 * @param 	{string}		filter	The filter to match.
 * @return	{array}					Array of child elements that match the filter.
 */
export const children = (element, filter) => {
    const children = Array.prototype.slice.call(element.children);
    return filter
        ? children.filter((child) => child.matches(filter))
        : children;
};
/**
 * Find all text from direct child element.
 *
 * @param 	{HTMLElement} 	element Element to search in.
 * @return	{string}				The text.
 */
export const childText = (element) => {
    return element
        ? [].slice.call(element.childNodes)
            .filter(node => node.nodeType === Node.TEXT_NODE)
            .map(node => node.nodeValue.trim())
            .join(' ')
        : '';
};
/**
 * Find text excluding text from within child elements.
 * @param   {HTMLElement}   element Element to search in.
 * @return  {string}                The text.
 */
export const text = (element) => {
    return Array.prototype.slice
        .call(element.childNodes)
        .filter((child) => child.nodeType == 3)
        .map((child) => child.textContent)
        .join(' ');
};
/**
 * Find all preceding elements matching the selector.
 *
 * @param 	{HTMLElement} 	element Element to start searching from.
 * @param 	{string}		filter	The filter to match.
 * @return	{array}					Array of preceding elements that match the selector.
 */
export const parents = (element, filter) => {
    /** Array of preceding elements that match the selector. */
    let parents = [];
    /** Array of preceding elements that match the selector. */
    let parent = element.parentElement;
    while (parent) {
        parents.push(parent);
        parent = parent.parentElement;
    }
    return filter
        ? parents.filter((parent) => parent.matches(filter))
        : parents;
};
/**
 * Find all previous siblings matching the selecotr.
 *
 * @param 	{HTMLElement} 	element Element to start searching from.
 * @param 	{string}		filter	The filter to match.
 * @return	{array}					Array of previous siblings that match the selector.
 */
export const prevAll = (element, filter) => {
    /** Array of previous siblings that match the selector. */
    let previous = [];
    /** Current element in the loop */
    let current = element.previousElementSibling;
    while (current) {
        if (!filter || current.matches(filter)) {
            previous.push(current);
        }
        current = current.previousElementSibling;
    }
    return previous;
};
/**
 * Get an element offset relative to the document.
 *
 * @param 	{HTMLElement}	 element 			Element to start measuring from.
 * @param 	{string}		 [direction=top] 	Offset top or left.
 * @return	{number}							The element offset relative to the document.
 */
export const offset = (element, direction) => {
    return (element.getBoundingClientRect()[direction] +
        document.body[direction === 'left' ? 'scrollLeft' : 'scrollTop']);
};
/**
 * Filter out non-listitem listitems.
 * @param  {array} listitems 	Elements to filter.
 * @return {array}				The filtered set of listitems.
 */
export const filterLI = (listitems) => {
    return listitems.filter((listitem) => !listitem.matches('.mm-hidden'));
};
/**
 * Find anchors in listitems (excluding anchor that open a sub-panel).
 * @param  {array} 	listitems 	Elements to filter.
 * @return {array}				The found set of anchors.
 */
export const filterLIA = (listitems) => {
    let anchors = [];
    filterLI(listitems).forEach((listitem) => {
        anchors.push(...children(listitem, 'a.mm-listitem__text'));
    });
    return anchors.filter((anchor) => !anchor.matches('.mm-btn--next'));
};
/**
 * Refactor a classname on multiple elements.
 * @param {HTMLElement} element 	Element to refactor.
 * @param {string}		oldClass 	Classname to remove.
 * @param {string}		newClass 	Classname to add.
 */
export const reClass = (element, oldClass, newClass) => {
    if (element.matches('.' + oldClass)) {
        element.classList.add(newClass);
    }
};
