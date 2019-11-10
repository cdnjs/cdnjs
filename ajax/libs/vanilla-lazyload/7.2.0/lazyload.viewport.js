const getTopOffset = function (element) {
    return element.getBoundingClientRect().top + window.pageYOffset - element.ownerDocument.documentElement.clientTop;
};

const isBelowViewport = function (element, container, threshold) {
    const fold = (container === window) ?
        window.innerHeight + window.pageYOffset :
        getTopOffset(container) + container.offsetHeight;
    return fold <= getTopOffset(element) - threshold;
};

const getLeftOffset = function (element) {
    return element.getBoundingClientRect().left + window.pageXOffset - element.ownerDocument.documentElement.clientLeft;
};

const isAtRightOfViewport = function (element, container, threshold) {
    const documentWidth = window.innerWidth;
    const fold = (container === window) ?
        documentWidth + window.pageXOffset :
        getLeftOffset(container) + documentWidth;
    return fold <= getLeftOffset(element) - threshold;
};

const isAboveViewport = function (element, container, threshold) {
    const fold = (container === window) ? window.pageYOffset : getTopOffset(container);
    return fold >= getTopOffset(element) + threshold + element.offsetHeight;
};

const isAtLeftOfViewport = function (element, container, threshold) {
    const fold = (container === window) ? window.pageXOffset : getLeftOffset(container);
    return fold >= getLeftOffset(element) + threshold + element.offsetWidth;
};

export default function (element, container, threshold) {
    return !isBelowViewport(element, container, threshold) &&
        !isAboveViewport(element, container, threshold) &&
        !isAtRightOfViewport(element, container, threshold) &&
        !isAtLeftOfViewport(element, container, threshold);
};