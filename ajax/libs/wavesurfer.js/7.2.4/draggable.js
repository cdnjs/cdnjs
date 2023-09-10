export function makeDraggable(element, onDrag, onStart, onEnd, threshold = 5) {
    let unsub = () => {
        return;
    };
    if (!element)
        return unsub;
    const down = (e) => {
        // Ignore the right mouse button
        if (e.button === 2)
            return;
        e.preventDefault();
        e.stopPropagation();
        let startX = e.clientX;
        let startY = e.clientY;
        let isDragging = false;
        const move = (e) => {
            e.preventDefault();
            e.stopPropagation();
            const x = e.clientX;
            const y = e.clientY;
            if (isDragging || Math.abs(x - startX) >= threshold || Math.abs(y - startY) >= threshold) {
                const { left, top } = element.getBoundingClientRect();
                if (!isDragging) {
                    isDragging = true;
                    onStart === null || onStart === void 0 ? void 0 : onStart(startX - left, startY - top);
                }
                onDrag(x - startX, y - startY, x - left, y - top);
                startX = x;
                startY = y;
            }
        };
        const click = (e) => {
            if (isDragging) {
                e.preventDefault();
                e.stopPropagation();
            }
        };
        const up = () => {
            if (isDragging) {
                onEnd === null || onEnd === void 0 ? void 0 : onEnd();
            }
            unsub();
        };
        document.addEventListener('pointermove', move);
        document.addEventListener('pointerup', up);
        document.addEventListener('pointerleave', up);
        document.addEventListener('click', click, true);
        unsub = () => {
            document.removeEventListener('pointermove', move);
            document.removeEventListener('pointerup', up);
            document.removeEventListener('pointerleave', up);
            setTimeout(() => {
                document.removeEventListener('click', click, true);
            }, 10);
        };
    };
    element.addEventListener('pointerdown', down);
    return () => {
        unsub();
        element.removeEventListener('pointerdown', down);
    };
}
