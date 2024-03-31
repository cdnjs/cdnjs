export function makeDraggable(element, onDrag, onStart, onEnd, threshold = 3, mouseButton = 0, touchDelay = 100) {
    if (!element)
        return () => void 0;
    let isPointerDown = false;
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let touchStart = 0;
    let rect;
    const isTouchDevice = matchMedia('(pointer: coarse)').matches;
    const onPointerDown = (e) => {
        if (e.button !== mouseButton)
            return;
        e.stopPropagation();
        isPointerDown = true;
        isDragging = false;
        touchStart = Date.now();
        rect = element.getBoundingClientRect();
        startX = e.clientX - rect.left;
        startY = e.clientY - rect.top;
    };
    const onPointerUp = (e) => {
        isPointerDown = false;
        touchStart = 0;
        if (isDragging) {
            e.preventDefault();
            e.stopPropagation();
            setTimeout(() => {
                isDragging = false;
            }, 300);
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            onEnd === null || onEnd === void 0 ? void 0 : onEnd(x, y);
        }
    };
    const onPointerMove = (e) => {
        if (!isPointerDown)
            return;
        if (isTouchDevice && Date.now() - touchStart < touchDelay)
            return;
        e.preventDefault();
        e.stopPropagation();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const dx = x - startX;
        const dy = y - startY;
        if (isDragging || Math.abs(dx) > threshold || Math.abs(dy) > threshold) {
            if (!isDragging) {
                onStart === null || onStart === void 0 ? void 0 : onStart(startX, startY);
                isDragging = true;
            }
            onDrag(dx, dy, x, y);
            startX = x;
            startY = y;
        }
    };
    const onPointerLeave = (e) => {
        // Listen to events only on the document and not on inner elements
        if (!e.relatedTarget || e.relatedTarget === document.documentElement) {
            onPointerUp(e);
        }
    };
    const onTouchMove = (e) => {
        if (isDragging) {
            e.preventDefault();
        }
    };
    // Prevent clicks after dragging
    const onClick = (e) => {
        if (isDragging) {
            e.stopPropagation();
            e.preventDefault();
        }
    };
    element.addEventListener('pointerdown', onPointerDown);
    element.addEventListener('click', onClick, true);
    document.addEventListener('click', onClick, true);
    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('pointerup', onPointerUp);
    document.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('pointercancel', onPointerUp);
    return () => {
        element.removeEventListener('pointerdown', onPointerDown);
        element.removeEventListener('click', onClick, true);
        document.removeEventListener('click', onClick, true);
        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('touchmove', onTouchMove);
        document.removeEventListener('pointerup', onPointerUp);
        document.removeEventListener('pointerleave', onPointerLeave);
        document.removeEventListener('pointercancel', onPointerUp);
    };
}
