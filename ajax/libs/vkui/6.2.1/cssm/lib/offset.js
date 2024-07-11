export function getOffsetRect(elem) {
    const box = elem?.getBoundingClientRect();
    return {
        top: box?.top,
        left: box?.left,
        width: elem?.offsetWidth,
        height: elem?.offsetHeight
    };
}

//# sourceMappingURL=offset.js.map