import { _ as _define_property } from "@swc/helpers/_/_define_property";
export class CSSTransitionController {
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
    constructor(el, property){
        _define_property(this, "el", void 0);
        _define_property(this, "property", void 0);
        _define_property(this, "handleTransitionEnd", ()=>{
            this.cleanup();
            return this;
        });
        this.el = el;
        this.property = property;
    }
}

//# sourceMappingURL=CSSTransitionController.js.map