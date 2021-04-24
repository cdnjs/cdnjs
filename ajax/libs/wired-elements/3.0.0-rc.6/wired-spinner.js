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
import { ellipse, hachureEllipseFill } from './wired-lib';
import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let WiredSpinner = class WiredSpinner extends WiredBase {
    constructor() {
        super(...arguments);
        this.spinning = false;
        this.duration = 1500;
        this.value = 0;
        this.timerstart = 0;
        this.frame = 0;
    }
    static get styles() {
        return [
            BaseCSS,
            css `
        :host {
          display: inline-block;
          position: relative;
        }
        path {
          stroke: currentColor;
          stroke-opacity: 0.65;
          stroke-width: 1.5;
          fill: none;
        }
        .knob {
          stroke-width: 2.8 !important;
          stroke-opacity: 1;
        }
      `
        ];
    }
    render() {
        return html `<svg></svg>`;
    }
    canvasSize() {
        return [76, 76];
    }
    draw(svg, size) {
        ellipse(svg, size[0] / 2, size[1] / 2, Math.floor(size[0] * 0.8), Math.floor(0.8 * size[1]), this.seed);
        this.knob = hachureEllipseFill(0, 0, 20, 20, this.seed);
        this.knob.classList.add('knob');
        svg.appendChild(this.knob);
        this.updateCursor();
    }
    updateCursor() {
        if (this.knob) {
            const position = [
                Math.round(38 + 25 * Math.cos(this.value * Math.PI * 2)),
                Math.round(38 + 25 * Math.sin(this.value * Math.PI * 2))
            ];
            this.knob.style.transform = `translate3d(${position[0]}px, ${position[1]}px, 0) rotateZ(${Math.round(this.value * 360 * 2)}deg)`;
        }
    }
    updated() {
        super.updated();
        if (this.spinning) {
            this.startSpinner();
        }
        else {
            this.stopSpinner();
        }
    }
    startSpinner() {
        this.stopSpinner();
        this.value = 0;
        this.timerstart = 0;
        this.nextTick();
    }
    stopSpinner() {
        if (this.frame) {
            window.cancelAnimationFrame(this.frame);
            this.frame = 0;
        }
    }
    nextTick() {
        this.frame = window.requestAnimationFrame((t) => this.tick(t));
    }
    tick(t) {
        if (this.spinning) {
            if (!this.timerstart) {
                this.timerstart = t;
            }
            this.value = Math.min(1, (t - this.timerstart) / this.duration);
            this.updateCursor();
            if (this.value >= 1) {
                this.value = 0;
                this.timerstart = 0;
            }
            this.nextTick();
        }
        else {
            this.frame = 0;
        }
    }
};
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], WiredSpinner.prototype, "spinning", void 0);
__decorate([
    property({ type: Number }),
    __metadata("design:type", Object)
], WiredSpinner.prototype, "duration", void 0);
WiredSpinner = __decorate([
    customElement('wired-spinner')
], WiredSpinner);
export { WiredSpinner };
