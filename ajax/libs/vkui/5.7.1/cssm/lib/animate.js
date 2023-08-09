import { canUseDOM } from './dom';
export function animate({ duration, timing, draw }) {
    if (!canUseDOM) {
        return;
    }
    const start = performance.now();
    requestAnimationFrame(function animate(time) {
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) {
            timeFraction = 1;
        }
        const progress = timing(timeFraction);
        draw(progress);
        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }
    });
}

//# sourceMappingURL=animate.js.map