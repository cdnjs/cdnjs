import { canUseDOM } from './dom';
export function animate({ duration, timing, draw, animationQueue = [] }) {
    if (!canUseDOM) {
        return;
    }
    let start;
    requestAnimationFrame(function animate(time) {
        if (!start) {
            start = time;
        }
        let timeFraction = Math.min((time - start) / duration, 1);
        const progress = timing(timeFraction);
        draw(progress);
        if (timeFraction < 1) {
            requestAnimationFrame(animate);
            return;
        }
        animationQueue.shift();
        if (animationQueue.length > 0) {
            animationQueue[0]();
        }
    });
}

//# sourceMappingURL=animate.js.map