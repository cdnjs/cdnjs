/** @internal @deprecated To be removed */
export class TransitionIndicator {
    constructor() {
        this._element = document.createElement('div');
        this._element.classList.add("lm_transition_indicator" /* TransitionIndicator */);
        document.body.appendChild(this._element);
        this._toElement = null;
        this._fromDimensions = null;
        this._totalAnimationDuration = 200;
        this._animationStartTime = null;
    }
    destroy() {
        this._element.remove();
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    transitionElements(fromElement, toElement) {
        /**
         * TODO - This is not quite as cool as expected. Review.
         */
        return;
        // this._toElement = toElement;
        // this._animationStartTime = now();
        // this._fromDimensions = this._measure(fromElement);
        // this._fromDimensions.opacity = 0.8;
        // this._element.show().css(this._fromDimensions);
        // animFrame(fnBind(this._nextAnimationFrame, this));
    }
    nextAnimationFrame() {
        // if (this._toElement === null || this._fromDimensions === null || this._animationStartTime === null) {
        //     throw new UnexpectedNullError('TINAFTD97115');
        // } else {
        //     const toDimensions = this.measure(this._toElement);
        //     const animationProgress = (now() - this._animationStartTime) / this._totalAnimationDuration;
        //     const currentFrameStyles = {};
        //     const cssProperty;
        //     if (animationProgress >= 1) {
        //         this._element.style.display = 'none';
        //         return;
        //     }
        //     toDimensions.opacity = 0;
        //     for (const cssProperty in this._fromDimensions) {
        //         currentFrameStyles[cssProperty] = this._fromDimensions[cssProperty] +
        //             (toDimensions[cssProperty] - this._fromDimensions[cssProperty]) *
        //             animationProgress;
        //     }
        //     this._element.css(currentFrameStyles);
        //     animFrame(fnBind(this._nextAnimationFrame, this));
        // }
    }
    measure(element) {
        const rect = element.getBoundingClientRect();
        return {
            left: rect.left,
            top: rect.top,
            width: element.offsetWidth,
            height: element.offsetHeight,
        };
    }
}
//# sourceMappingURL=transition-indicator.js.map