var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { WiredBase, BaseCSS } from './wired-base';
import { line } from './wired-lib';
import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let WiredDivider = class WiredDivider extends WiredBase {
    constructor() {
        super(...arguments);
        this.elevation = 1;
        this.roAttached = false;
    }
    static get styles() {
        return [
            BaseCSS,
            css `
        :host {
          display: block;
          position: relative;
        }
      `
        ];
    }
    render() {
        return html `<svg></svg>`;
    }
    canvasSize() {
        const size = this.getBoundingClientRect();
        const elev = Math.min(Math.max(1, this.elevation), 5);
        return [size.width, elev * 6];
    }
    draw(svg, size) {
        const elev = Math.min(Math.max(1, this.elevation), 5);
        for (let i = 0; i < elev; i++) {
            line(svg, 0, (i * 6) + 3, size[0], (i * 6) + 3, this.seed);
        }
    }
    updated() {
        super.updated();
        this.attachResizeListener();
    }
    disconnectedCallback() {
        this.detachResizeListener();
    }
    attachResizeListener() {
        if (!this.roAttached) {
            if (this.resizeObserver) {
                this.resizeObserver.observe(this);
            }
            else if (!this.windowResizeHandler) {
                this.windowResizeHandler = () => this.wiredRender();
                window.addEventListener('resize', this.windowResizeHandler, { passive: true });
            }
            this.roAttached = true;
        }
    }
    detachResizeListener() {
        if (this.resizeObserver) {
            this.resizeObserver.unobserve(this);
        }
        if (this.windowResizeHandler) {
            window.removeEventListener('resize', this.windowResizeHandler);
        }
        this.roAttached = false;
    }
};
__decorate([
    property({ type: Number }),
    __metadata("design:type", Object)
], WiredDivider.prototype, "elevation", void 0);
WiredDivider = __decorate([
    customElement('wired-divider')
], WiredDivider);
export { WiredDivider };
