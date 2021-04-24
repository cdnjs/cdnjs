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
import { rectangle, hachureFill } from './wired-lib';
import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let WiredProgress = class WiredProgress extends WiredBase {
    constructor() {
        super(...arguments);
        this.value = 0;
        this.min = 0;
        this.max = 100;
        this.percentage = false;
    }
    static get styles() {
        return [
            BaseCSS,
            css `
      :host {
        display: inline-block;
        position: relative;
        width: 400px;
        height: 42px;
        font-family: sans-serif;
      }
      .labelContainer {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .progressLabel {
        color: var(--wired-progress-label-color, #000);
        font-size: var(--wired-progress-font-size, 14px);
        background: var(--wired-progress-label-background, rgba(255,255,255,0.9));
        padding: 2px 6px;
        border-radius: 4px;
        letter-spacing: 1.25px;
      }
      path.progbox {
        stroke: var(--wired-progress-color, rgba(0, 0, 200, 0.8));
        stroke-width: 2.75;
        fill: none;
      }
      .overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
      }
      `
        ];
    }
    render() {
        return html `
    <div id="overlay" class="overlay">
      <svg></svg>
    </div>
    <div class="overlay labelContainer">
      <div class="progressLabel">${this.getProgressLabel()}</div>
    </div>
    `;
    }
    getProgressLabel() {
        if (this.percentage) {
            if (this.max === this.min) {
                return '%';
            }
            else {
                const pct = Math.floor(((this.value - this.min) / (this.max - this.min)) * 100);
                return (pct + '%');
            }
        }
        else {
            return ('' + this.value);
        }
    }
    wiredRender(force = false) {
        super.wiredRender(force);
        this.refreshProgressFill();
    }
    canvasSize() {
        const s = this.getBoundingClientRect();
        return [s.width, s.height];
    }
    draw(svg, size) {
        rectangle(svg, 2, 2, size[0] - 2, size[1] - 2, this.seed);
    }
    refreshProgressFill() {
        if (this.progBox) {
            if (this.progBox.parentElement) {
                this.progBox.parentElement.removeChild(this.progBox);
            }
            this.progBox = undefined;
        }
        if (this.svg) {
            let pct = 0;
            const s = this.getBoundingClientRect();
            if (this.max > this.min) {
                pct = (this.value - this.min) / (this.max - this.min);
                const progWidth = s.width * Math.max(0, Math.min(pct, 100));
                this.progBox = hachureFill([
                    [0, 0],
                    [progWidth, 0],
                    [progWidth, s.height],
                    [0, s.height]
                ], this.seed);
                this.svg.appendChild(this.progBox);
                this.progBox.classList.add('progbox');
            }
        }
    }
};
__decorate([
    property({ type: Number }),
    __metadata("design:type", Object)
], WiredProgress.prototype, "value", void 0);
__decorate([
    property({ type: Number }),
    __metadata("design:type", Object)
], WiredProgress.prototype, "min", void 0);
__decorate([
    property({ type: Number }),
    __metadata("design:type", Object)
], WiredProgress.prototype, "max", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], WiredProgress.prototype, "percentage", void 0);
WiredProgress = __decorate([
    customElement('wired-progress')
], WiredProgress);
export { WiredProgress };
