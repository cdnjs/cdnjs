function isIndentSizeConstant(indent) {
    return indent === '2xs' || indent === 'xs' || indent === 's' || indent === 'm' || indent === 'l' || indent === 'xl' || indent === '2xl' || indent === '3xl' || indent === '4xl';
}
function calculateIndent(indent) {
    if (isIndentSizeConstant(indent)) {
        return;
    }
    return typeof indent === 'string' ? indent : `${indent}px`;
}
export const resolveIndent = (indent, cssProperty, classNames)=>{
    if (!indent) {
        return [
            undefined,
            undefined
        ];
    }
    const calculatedIndent = calculateIndent(indent);
    if (calculatedIndent) {
        return [
            {
                [cssProperty]: calculatedIndent
            },
            undefined
        ];
    }
    return [
        undefined,
        classNames[indent]
    ];
};
export const mutableRemoveElement = (arr, element)=>{
    arr.splice(arr.indexOf(element), 1);
};

//# sourceMappingURL=helpers.js.map