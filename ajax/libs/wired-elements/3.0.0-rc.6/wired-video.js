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
import { customElement, property, query } from 'lit/decorators.js';
import { WiredProgress } from './wired-progress.js';
import { WiredSlider } from './wired-slider';
import './wired-icon-button.js';
let WiredVideo = class WiredVideo extends WiredBase {
    constructor() {
        super();
        this.src = '';
        this.autoplay = false;
        this.loop = false;
        this.muted = false;
        this.playsinline = false;
        this.playing = false;
        this.timeDisplay = '';
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
          line-height: 1;
          padding: 3px 3px 68px;
          --wired-progress-color: var(--wired-video-highlight-color, rgb(51, 103, 214));
          --wired-slider-knob-color: var(--wired-video-highlight-color, rgb(51, 103, 214));
        }
        video {
          display: block;
          box-sizing: border-box;
          max-width: 100%;
          max-height: 100%;
        }
        path {
          stroke-width: 1;
        }
        #controls {
          position: absolute;
          pointer-events: auto;
          left: 0;
          bottom: 0;
          width: 100%;
          box-sizing: border-box;
          height: 70px;
        }
        .layout.horizontal {
          display: -ms-flexbox;
          display: -webkit-flex;
          display: flex;
          -ms-flex-direction: row;
          -webkit-flex-direction: row;
          flex-direction: row;
          -ms-flex-align: center;
          -webkit-align-items: center;
          align-items: center;
          padding: 5px 10px;
        }
        .flex {
          -ms-flex: 1 1 0.000000001px;
          -webkit-flex: 1;
          flex: 1;
          -webkit-flex-basis: 0.000000001px;
          flex-basis: 0.000000001px;
        }
        wired-progress {
          display: block;
          width: 100%;
          box-sizing: border-box;
          height: 20px;
          --wired-progress-label-color: transparent;
          --wired-progress-label-background: transparent;
        }
        wired-icon-button span {
          font-size: 16px;
          line-height: 16px;
          width: 16px;
          height: 16px;
          padding: 0px;
          font-family: sans-serif;
          display: inline-block;
        }
        #timeDisplay {
          padding: 0 20px 0 8px;
          font-size: 13px;
        }
        wired-slider {
          display: block;
          max-width: 200px;
          margin: 0 6px 0 auto;
        }
      `
        ];
    }
    render() {
        return html `
    <video 
      .autoplay="${this.autoplay}"
      .loop="${this.loop}"
      .muted="${this.muted}"
      .playsinline="${this.playsinline}"
      src="${this.src}"
      @play="${() => this.playing = true}"
      @pause="${() => this.playing = false}"
      @canplay="${this.canPlay}"
      @timeupdate="${this.updateTime}">
    </video>
    <div id="overlay">
      <svg></svg>
    </div>
    <div id="controls">
      <wired-progress></wired-progress>
      <div class="horizontal layout center">
        <wired-icon-button @click="${this.togglePause}">
          <span>${this.playing ? '||' : '▶'}</span>
        </wired-icon-button>
        <div id="timeDisplay">${this.timeDisplay}</div>
        <div class="flex">
          <wired-slider @change="${this.volumeChange}"></wired-slider>
        </div>
        <div style="width: 24px; height: 24px;">
          <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g><path style="stroke: none; fill: currentColor;" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></g></svg>
        </div>
      </div>
    </div>
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
    wiredRender() {
        super.wiredRender();
        if (this.progressBar) {
            this.progressBar.wiredRender(true);
        }
    }
    canvasSize() {
        const s = this.getBoundingClientRect();
        return [s.width, s.height];
    }
    draw(svg, size) {
        rectangle(svg, 2, 2, size[0] - 4, size[1] - 4, this.seed);
    }
    updateTime() {
        if (this.video && this.progressBar) {
            this.progressBar.value = this.video.duration ? Math.round((this.video.currentTime / this.video.duration) * 100) : 0;
            this.timeDisplay = `${this.getTimeDisplay(this.video.currentTime)} / ${this.getTimeDisplay(this.video.duration)}`;
        }
    }
    getTimeDisplay(time) {
        const mins = Math.floor(time / 60);
        const secs = Math.round(time - (mins * 60));
        return `${mins}:${secs}`;
    }
    togglePause() {
        if (this.video) {
            if (this.playing) {
                this.video.pause();
            }
            else {
                this.video.play();
            }
        }
    }
    volumeChange() {
        if (this.video && this.slider) {
            this.video.volume = this.slider.value / 100;
        }
    }
    canPlay() {
        if (this.slider && this.video) {
            this.slider.value = this.video.volume * 100;
        }
    }
};
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], WiredVideo.prototype, "src", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], WiredVideo.prototype, "autoplay", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], WiredVideo.prototype, "loop", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], WiredVideo.prototype, "muted", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], WiredVideo.prototype, "playsinline", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], WiredVideo.prototype, "playing", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], WiredVideo.prototype, "timeDisplay", void 0);
__decorate([
    query('wired-progress'),
    __metadata("design:type", WiredProgress)
], WiredVideo.prototype, "progressBar", void 0);
__decorate([
    query('wired-slider'),
    __metadata("design:type", WiredSlider)
], WiredVideo.prototype, "slider", void 0);
__decorate([
    query('video'),
    __metadata("design:type", HTMLVideoElement)
], WiredVideo.prototype, "video", void 0);
WiredVideo = __decorate([
    customElement('wired-video'),
    __metadata("design:paramtypes", [])
], WiredVideo);
export { WiredVideo };
