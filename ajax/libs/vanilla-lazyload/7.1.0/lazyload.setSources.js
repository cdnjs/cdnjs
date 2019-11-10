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

export default function(element, srcsetDataAttribute, srcDataAttribute) {
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
};