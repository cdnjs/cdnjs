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
import { customElement, property, query } from 'lit/decorators.js';
let WiredLink = class WiredLink extends WiredBase {
    constructor() {
        super(...arguments);
        this.elevation = 1;
    }
    static get styles() {
        return [
            BaseCSS,
            css `
        :host {
          display: inline-block;
          position: relative;
        }
        a, a:hover, a:visited {
          color: inherit;
          outline: none;
          display: inline-block;
          white-space: nowrap;
          text-decoration: none;
          border: none;
        }
        path {
          stroke: var(--wired-link-decoration-color, blue);
          stroke-opacity: 0.45;
        }
        a:focus path {
          stroke-opacity: 1;
        }
      `
        ];
    }
    render() {
        return html `
    <a href="${this.href}" target="${this.target || ''}">
      <slot></slot>
      <div id="overlay"><svg></svg></div>
    </a>
    `;
    }
    focus() {
        if (this.anchor) {
            this.anchor.focus();
        }
        else {
            super.focus();
        }
    }
    canvasSize() {
        if (this.anchor) {
            const size = this.anchor.getBoundingClientRect();
            const elev = Math.min(Math.max(1, this.elevation), 5);
            const w = size.width;
            const h = size.height + ((elev - 1) * 2);
            return [w, h];
        }
        return this.lastSize;
    }
    draw(svg, size) {
        const elev = Math.min(Math.max(1, this.elevation), 5);
        const s = {
            width: size[0],
            height: size[1] - ((elev - 1) * 2)
        };
        for (let i = 0; i < elev; i++) {
            line(svg, 0, s.height + (i * 2) - 2, s.width, s.height + (i * 2) - 2, this.seed);
            line(svg, 0, s.height + (i * 2) - 2, s.width, s.height + (i * 2) - 2, this.seed);
        }
    }
};
__decorate([
    property({ type: Number }),
    __metadata("design:type", Object)
], WiredLink.prototype, "elevation", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], WiredLink.prototype, "href", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], WiredLink.prototype, "target", void 0);
__decorate([
    query('a'),
    __metadata("design:type", HTMLAnchorElement)
], WiredLink.prototype, "anchor", void 0);
WiredLink = __decorate([
    customElement('wired-link')
], WiredLink);
export { WiredLink };
