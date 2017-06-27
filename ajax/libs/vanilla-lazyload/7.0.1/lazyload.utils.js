export const isBot = !("onscroll" in window) || /glebot/.test(navigator.userAgent);

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

export const isInsideViewport = function (element, container, threshold) {
    return !isBelowViewport(element, container, threshold) &&
        !isAboveViewport(element, container, threshold) &&
        !isAtRightOfViewport(element, container, threshold) &&
        !isAtLeftOfViewport(element, container, threshold);
};

export const callCallback = function (callback, argument) {
    if (callback) { callback(argument); }
};

/* Creates instance and notifies it through the window element */
const createInstance = function (classObj, options) { 
    let instance = new classObj(options);
    let event = new CustomEvent("LazyLoad::Initialized", { detail: { instance } });
    window.dispatchEvent(event);
};

/* Auto initialization of one or more instances of lazyload, depending on the 
    options passed in (plain object or an array) */
export const autoInitialize = function (classObj, options) { 
    let optsLength = options.length;
    if (!optsLength) {
        // Plain object
        createInstance(classObj, options);
    }
    else {
        // Array of objects
        for (let i = 0; i < optsLength; i++) {
            createInstance(classObj, options[i]);
        }
    }
};

const setSourcesForPicture = function(element, srcsetDataAttribute) {
    const parent = element.parentElement;
    if (parent.tagName !== "PICTURE") {
        return;
    }
    for (let i = 0; i < parent.children.length; i++) {
        let pictureChild = parent.children[i];
        if (pictureChild.tagName === "SOURCE") {
            let sourceSrcset = pictureChild.getAttribute("data-" + srcsetDataAttribute);
            if (sourceSrcset) {
                pictureChild.setAttribute("srcset", sourceSrcset);
            }
        }
    }
};

export const setSources = function(element, srcsetDataAttribute, srcDataAttribute) {
    const tagName = element.tagName;
    const elementSrc = element.getAttribute("data-" + srcDataAttribute);
    if (tagName === "IMG") {
        setSourcesForPicture(element, srcsetDataAttribute);
        const imgSrcset = element.getAttribute("data-" + srcsetDataAttribute);
        if (imgSrcset) { element.setAttribute("srcset", imgSrcset); }
        if (elementSrc) { element.setAttribute("src", elementSrc); }
        return;
    }
    if (tagName === "IFRAME") {
        if (elementSrc) { element.setAttribute("src", elementSrc); }
        return;
    }
    if (elementSrc) { element.style.backgroundImage = "url(" + elementSrc + ")"; }
}