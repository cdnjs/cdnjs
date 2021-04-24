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
import { line, ellipse } from './wired-lib';
import { css, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
let WiredSlider = class WiredSlider extends WiredBase {
    constructor() {
        super(...arguments);
        this.min = 0;
        this.max = 100;
        this.step = 1;
        this.disabled = false;
        this.canvasWidth = 300;
    }
    static get styles() {
        return [
            BaseCSS,
            css `
      :host {
        display: inline-block;
        position: relative;
        width: 300px;
        box-sizing: border-box;
      }
      :host([disabled]) {
        opacity: 0.45 !important;
        cursor: default;
        pointer-events: none;
        background: rgba(0, 0, 0, 0.07);
        border-radius: 5px;
      }
      input[type=range] {
        width: 100%;
        height: 40px;
        box-sizing: border-box;
        margin: 0;
        -webkit-appearance: none;
        background: transparent;
        outline: none;
        position: relative;
      }
      input[type=range]:focus {
        outline: none;
      }
      input[type=range]::-ms-track {
        width: 100%;
        cursor: pointer;
        background: transparent;
        border-color: transparent;
        color: transparent;
      }
      input[type=range]::-moz-focus-outer {
        outline: none;
        border: 0;
      }
      input[type=range]::-moz-range-thumb {
        border-radius: 50px;
        background: none;
        cursor: pointer;
        border: none;
        margin: 0;
        height: 20px;
        width: 20px;
        line-height: 1;
      }
      input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
        border-radius: 50px;
        background: none;
        cursor: pointer;
        border: none;
        height: 20px;
        width: 20px;
        margin: 0;
        line-height: 1;
      }
      .knob{
        fill: var(--wired-slider-knob-color, rgb(51, 103, 214));
        stroke: var(--wired-slider-knob-color, rgb(51, 103, 214));
      }
      .bar {
        stroke: var(--wired-slider-bar-color, rgb(0, 0, 0));
      }
      input:focus + div svg .knob {
        stroke: var(--wired-slider-knob-outline-color, #000);
        fill-opacity: 0.8;
      }
      `
        ];
    }
    get value() {
        if (this.input) {
            return +this.input.value;
        }
        return this.min;
    }
    set value(v) {
        if (this.input) {
            this.input.value = `${v}`;
        }
        else {
            this.pendingValue = v;
        }
        this.updateThumbPosition();
    }
    firstUpdated() {
        this.value = this.pendingValue || +(this.getAttribute('value') || this.value || this.min);
        delete this.pendingValue;
    }
    render() {
        return html `
    <div id="container">
      <input type="range" 
        min="${this.min}"
        max="${this.max}"
        step="${this.step}"
        ?disabled="${this.disabled}"
        @input="${this.onInput}">
      <div id="overlay">
        <svg></svg>
      </div>
    </div>
    `;
    }
    focus() {
        if (this.input) {
            this.input.focus();
        }
        else {
            super.focus();
        }
    }
    onInput(e) {
        e.stopPropagation();
        this.updateThumbPosition();
        if (this.input) {
            this.fire('change', { value: +this.input.value });
        }
    }
    wiredRender(force = false) {
        super.wiredRender(force);
        this.updateThumbPosition();
    }
    canvasSize() {
        const s = this.getBoundingClientRect();
        return [s.width, s.height];
    }
    draw(svg, size) {
        this.canvasWidth = size[0];
        const midY = Math.round(size[1] / 2);
        line(svg, 0, midY, size[0], midY, this.seed).classList.add('bar');
        this.knob = ellipse(svg, 10, midY, 20, 20, this.seed);
        this.knob.classList.add('knob');
    }
    updateThumbPosition() {
        if (this.input) {
            const value = +this.input.value;
            const delta = Math.max(this.step, this.max - this.min);
            const pct = (value - this.min) / delta;
            if (this.knob) {
                this.knob.style.transform = `translateX(${pct * (this.canvasWidth - 20)}px)`;
            }
        }
    }
};
__decorate([
    property({ type: Number }),
    __metadata("design:type", Object)
], WiredSlider.prototype, "min", void 0);
__decorate([
    property({ type: Number }),
    __metadata("design:type", Object)
], WiredSlider.prototype, "max", void 0);
__decorate([
    property({ type: Number }),
    __metadata("design:type", Object)
], WiredSlider.prototype, "step", void 0);
__decorate([
    property({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], WiredSlider.prototype, "disabled", void 0);
__decorate([
    query('input'),
    __metadata("design:type", HTMLInputElement)
], WiredSlider.prototype, "input", void 0);
WiredSlider = __decorate([
    customElement('wired-slider')
], WiredSlider);
export { WiredSlider };
