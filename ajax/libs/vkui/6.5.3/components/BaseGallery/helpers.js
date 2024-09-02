export const calcMin = ({ containerWidth = 0, layerWidth = 0, slides = [], viewportOffsetWidth = 0, align, isCenterWithCustomWidth })=>{
    switch(align){
        case 'left':
            return containerWidth - layerWidth;
        case 'right':
            return viewportOffsetWidth - layerWidth;
        case 'center':
            if (isCenterWithCustomWidth && slides.length) {
                const { coordX, width } = slides[slides.length - 1];
                return viewportOffsetWidth / 2 - coordX - width / 2;
            } else {
                return viewportOffsetWidth - (containerWidth - viewportOffsetWidth) / 2 - layerWidth;
            }
    }
    return undefined;
};
export const calcMax = ({ slides = [], viewportOffsetWidth = 0, isCenterWithCustomWidth })=>{
    if (isCenterWithCustomWidth && slides.length) {
        const { width, coordX } = slides[0];
        return viewportOffsetWidth / 2 - coordX - width / 2;
    }
    return 0;
};

//# sourceMappingURL=helpers.js.map