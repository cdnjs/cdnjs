"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CustomResizeObserver", {
    enumerable: true,
    get: function() {
        return CustomResizeObserver;
    }
});
const _define_property = require("@swc/helpers/_/_define_property");
const defaultIframeStyles = {
    position: 'absolute',
    left: '0',
    top: '0',
    zIndex: '-1',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    opacity: '0'
};
class CustomResizeObserver {
    observe(element) {
        if (isPositioned(element)) {
            return this.observeUsingIframe(element);
        }
        return this.observeUsingMutationObserver(element);
    }
    appendToTheDOM() {
        for (let record of this.records){
            record.target.appendChild(record.iframe);
        }
        for (let record of this.records){
            if (record.iframe.contentWindow) {
                record.iframe.contentWindow.addEventListener('resize', this.updateFunction);
            }
        }
    }
    observeUsingIframe(element) {
        const iframe = element.ownerDocument.createElement('iframe');
        iframe.src = 'javascript:void(0)';
        iframe.ariaHidden = 'true';
        iframe.tabIndex = -1;
        Object.assign(iframe.style, defaultIframeStyles);
        this.records.push({
            target: element,
            iframe
        });
    }
    observeUsingMutationObserver(element) {
        if (!this.mutationObserverFallback) {
            this.mutationObserverFallback = new MutationObserver(this.updateFunction);
        }
        this.mutationObserverFallback.observe(element, {
            childList: true,
            subtree: true
        });
    }
    disconnect() {
        this.records.map(({ target, iframe })=>{
            if (iframe.contentWindow) {
                iframe.contentWindow.removeEventListener('resize', this.updateFunction);
            }
            target.removeChild(iframe);
        });
        this.records = [];
        if (this.mutationObserverFallback) {
            this.mutationObserverFallback.disconnect();
        }
        this.mutationObserverFallback = null;
    }
    constructor(updateFunction){
        _define_property._(this, "updateFunction", void 0);
        _define_property._(this, "records", void 0);
        _define_property._(this, "mutationObserverFallback", void 0);
        this.updateFunction = updateFunction;
        this.records = [];
        this.mutationObserverFallback = null;
        this.updateFunction = updateFunction;
    }
}
function isPositioned(element) {
    return getComputedStyle(element).position !== 'static';
}

//# sourceMappingURL=customResizeObserver.js.map