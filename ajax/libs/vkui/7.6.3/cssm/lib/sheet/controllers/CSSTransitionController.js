export class CSSTransitionController {
    el;
    property;
    constructor(el, property){
        this.el = el;
        this.property = property;
    }
    set(to) {
        this.el.style.setProperty(this.property, `${to}`);
        return this;
    }
    unset() {
        return this.cleanup();
    }
    enableTransition() {
        this.el.style.removeProperty('transition');
        return this;
    }
    disableTransition() {
        this.el.style.setProperty('transition', 'none');
        return this;
    }
    cleanup() {
        this.el.removeEventListener('transitionend', this.handleTransitionEnd);
        this.el.style.removeProperty('transition');
        this.el.style.removeProperty(this.property);
        return this;
    }
    cleanupOnTransitionEnd() {
        this.el.addEventListener('transitionend', this.handleTransitionEnd, {
            once: true
        });
        return this;
    }
    handleTransitionEnd = ()=>{
        this.cleanup();
        return this;
    };
}

//# sourceMappingURL=CSSTransitionController.js.map