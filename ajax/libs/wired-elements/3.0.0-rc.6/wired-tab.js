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
import { rectangle } from './wired-lib';
import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './wired-item.js';
let WiredTab = class WiredTab extends WiredBase {
    constructor() {
        super();
        this.name = '';
        this.label = '';
        if (window.ResizeObserver) {
            this.resizeObserver = new window.ResizeObserver(() => {
                if (this.svg) {
                    this.wiredRender();
                }
            });
        }
    }
    static get styles() {
        return [
            BaseCSS,
            css `
        :host {
          display: inline-block;
          position: relative;
          padding: 10px;
        }
      `
        ];
    }
    render() {
        return html `
    <div>
      <slot @slotchange="${this.wiredRender}"></slot>
    </div>
    <div id="overlay"><svg></svg></div>
    `;
    }
    updated() {
        super.updated();
        this.attachResizeListener();
    }
    disconnectedCallback() {
        this.detachResizeListener();
    }
    attachResizeListener() {
        if (this.resizeObserver && this.resizeObserver.observe) {
            this.resizeObserver.observe(this);
        }
        else if (!this.windowResizeHandler) {
            this.windowResizeHandler = () => this.wiredRender();
            window.addEventListener('resize', this.windowResizeHandler, { passive: true });
        }
    }
    detachResizeListener() {
        if (this.resizeObserver && this.resizeObserver.unobserve) {
            this.resizeObserver.unobserve(this);
        }
        if (this.windowResizeHandler) {
            window.removeEventListener('resize', this.windowResizeHandler);
        }
    }
    canvasSize() {
        const s = this.getBoundingClientRect();
        return [s.width, s.height];
    }
    draw(svg, s) {
        rectangle(svg, 2, 2, s[0] - 4, s[1] - 4, this.seed);
    }
};
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], WiredTab.prototype, "name", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], WiredTab.prototype, "label", void 0);
WiredTab = __decorate([
    customElement('wired-tab'),
    __metadata("design:paramtypes", [])
], WiredTab);
export { WiredTab };
