export function makeDraggable(element, onDrag, onStart, onEnd, threshold = 5) {
    if (!element)
        return () => void 0;
    let unsubscribeDocument = () => void 0;
    const onPointerDown = (event) => {
        if (event.button !== 0)
            return;
        let startX = event.clientX;
        let startY = event.clientY;
        let isDragging = false;
        const onPointerMove = (event) => {
            const x = event.clientX;
            const y = event.clientY;
            const dx = x - startX;
            const dy = y - startY;
            startX = x;
            startY = y;
            if (isDragging || Math.abs(dx) > threshold || Math.abs(dy) > threshold) {
                const rect = element.getBoundingClientRect();
                const { left, top } = rect;
                if (!isDragging) {
                    onStart === null || onStart === void 0 ? void 0 : onStart(startX - left, startY - top);
                    isDragging = true;
                }
                onDrag(dx, dy, x - left, y - top);
            }
        };
        const onPointerUp = () => {
            if (isDragging) {
                isDragging = false;
                onEnd === null || onEnd === void 0 ? void 0 : onEnd();
            }
            unsubscribeDocument();
        };
        const onClick = (event) => {
            event.stopPropagation();
            event.preventDefault();
        };
        const onTouchMove = (event) => {
            if (isDragging) {
                event.preventDefault();
            }
        };
        document.addEventListener('pointermove', onPointerMove);
        document.addEventListener('pointerup', onPointerUp);
        document.addEventListener('pointercancel', onPointerUp);
        document.addEventListener('touchmove', onTouchMove, { passive: false });
        element.addEventListener('click', onClick, { capture: true });
        unsubscribeDocument = () => {
            document.removeEventListener('pointermove', onPointerMove);
            document.removeEventListener('pointerup', onPointerUp);
            document.removeEventListener('pointercancel', onPointerUp);
            document.removeEventListener('touchmove', onTouchMove);
            element.removeEventListener('click', onClick, { capture: true });
        };
    };
    element.addEventListener('pointerdown', onPointerDown);
    return () => {
        unsubscribeDocument();
        element.removeEventListener('pointerdown', onPointerDown);
    };
}
