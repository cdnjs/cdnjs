var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import EventEmitter from './event-emitter.js';
class Renderer extends EventEmitter {
    constructor(options) {
        super();
        this.timeout = null;
        this.options = options;
        let container = null;
        if (typeof this.options.container === 'string') {
            container = document.querySelector(this.options.container);
        }
        else if (this.options.container instanceof HTMLElement) {
            container = this.options.container;
        }
        if (!container) {
            throw new Error('Container not found');
        }
        const div = document.createElement('div');
        const shadow = div.attachShadow({ mode: 'open' });
        shadow.innerHTML = `
      <style>
        :host {
          user-select: none;
        }
        :host .scroll {
          overflow-x: auto;
          overflow-y: visible;
          width: 100%;
          height: ${this.options.height}px;
          position: relative;
        }
        :host .wrapper {
          position: relative;
          width: fit-content;
          min-width: 100%;
          height: 100%;
          z-index: 2;
        }
        :host canvas {
          display: block;
          height: 100%;
          min-width: 100%;
          image-rendering: pixelated;
        }
        :host .progress {
          position: absolute;
          z-index: 2;
          top: 0;
          left: 0;
          height: 100%;
          pointer-events: none;
          clip-path: inset(100%);
        }
        :host .cursor {
          position: absolute;
          z-index: 3;
          top: 0;
          left: 0;
          height: 100%;
          border-right: 1px solid ${this.options.cursorColor || this.options.progressColor};
          margin-left: -1px;
        }
      </style>

      <div class="scroll">
        <div class="wrapper">
          <canvas></canvas>
          <canvas class="progress"></canvas>
          <div class="cursor"></div>
        </div>
      </div>
    `;
        this.container = div;
        this.scrollContainer = shadow.querySelector('.scroll');
        this.mainCanvas = shadow.querySelector('canvas');
        this.ctx = this.mainCanvas.getContext('2d', { desynchronized: true });
        this.progressCanvas = shadow.querySelector('.progress');
        this.cursor = shadow.querySelector('.cursor');
        container.appendChild(div);
        this.mainCanvas.addEventListener('click', (e) => {
            const rect = this.mainCanvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const relativeX = x / rect.width;
            this.emit('click', { relativeX });
        });
    }
    getContainer() {
        return this.scrollContainer.querySelector('.wrapper');
    }
    destroy() {
        this.container.remove();
    }
    delay(fn, delayMs = 100) {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        return new Promise((resolve) => {
            this.timeout = setTimeout(() => {
                resolve(fn());
            }, delayMs);
        });
    }
    renderPeaks(channelData, width, height) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { devicePixelRatio } = window;
            const { ctx } = this;
            const barWidth = this.options.barWidth != null ? this.options.barWidth * devicePixelRatio : 1;
            const barGap = this.options.barGap != null ? this.options.barGap * devicePixelRatio : this.options.barWidth ? barWidth / 2 : 0;
            const barRadius = (_a = this.options.barRadius) !== null && _a !== void 0 ? _a : 0;
            const leftChannel = channelData[0];
            const len = leftChannel.length;
            const barCount = Math.floor(width / (barWidth + barGap));
            const barIndexScale = barCount / len;
            const halfHeight = height / 2;
            const isMono = channelData.length === 1;
            const rightChannel = isMono ? leftChannel : channelData[1];
            const useNegative = isMono && rightChannel.some((v) => v < 0);
            const draw = (start, end) => {
                let prevX = 0;
                let prevLeft = 0;
                let prevRight = 0;
                ctx.beginPath();
                for (let i = start; i < end; i++) {
                    const barIndex = Math.round(i * barIndexScale);
                    if (barIndex > prevX) {
                        const leftBarHeight = Math.round(prevLeft * halfHeight);
                        const rightBarHeight = Math.round(prevRight * halfHeight);
                        ctx.roundRect(prevX * (barWidth + barGap), halfHeight - leftBarHeight, barWidth, leftBarHeight + rightBarHeight || 1, barRadius);
                        prevX = barIndex;
                        prevLeft = 0;
                        prevRight = 0;
                    }
                    const leftValue = useNegative ? leftChannel[i] : Math.abs(leftChannel[i]);
                    const rightValue = useNegative ? rightChannel[i] : Math.abs(rightChannel[i]);
                    if (leftValue > prevLeft) {
                        prevLeft = leftValue;
                    }
                    // If stereo, both channels are drawn as max values
                    // If mono with negative values, the bottom channel will be the min negative values
                    if (useNegative ? rightValue < -prevRight : rightValue > prevRight) {
                        prevRight = rightValue < 0 ? -rightValue : rightValue;
                    }
                }
                ctx.fillStyle = this.options.waveColor;
                ctx.fill();
                ctx.closePath();
            };
            // Clear the canvas
            ctx.clearRect(0, 0, width, height);
            // Draw the currently visible part of the waveform
            const { scrollLeft, scrollWidth, clientWidth } = this.scrollContainer;
            const scale = len / scrollWidth;
            const start = Math.floor(scrollLeft * scale);
            const end = Math.ceil((scrollLeft + clientWidth) * scale);
            draw(start, end);
            // Draw the progress mask
            this.createProgressMask();
            // Draw the rest of the waveform with a timeout for better performance
            if (start > 0) {
                yield this.delay(() => {
                    draw(0, start);
                });
            }
            if (end < len) {
                yield this.delay(() => {
                    draw(end, len);
                });
            }
            // Redraw the progress mask
            this.delay(() => {
                this.createProgressMask();
            });
        });
    }
    createProgressMask() {
        const progressCtx = this.progressCanvas.getContext('2d', { desynchronized: true });
        // Set the canvas to the same size as the main canvas
        this.progressCanvas.width = this.mainCanvas.width;
        this.progressCanvas.height = this.mainCanvas.height;
        this.progressCanvas.style.width = this.mainCanvas.style.width;
        this.progressCanvas.style.height = this.mainCanvas.style.height;
        // Copy the waveform image to the progress canvas
        // The main canvas itself is used as the source image
        progressCtx.drawImage(this.mainCanvas, 0, 0);
        // Set the composition method to draw only where the waveform is drawn
        progressCtx.globalCompositeOperation = 'source-in';
        progressCtx.fillStyle = this.options.progressColor;
        // This rectangle acts as a mask thanks to the composition method
        progressCtx.fillRect(0, 0, this.progressCanvas.width, this.progressCanvas.height);
    }
    render(audioData) {
        // Determine the width of the canvas
        const { devicePixelRatio } = window;
        const parentWidth = this.options.fillParent ? this.scrollContainer.clientWidth * devicePixelRatio : 0;
        const scrollWidth = audioData.duration * this.options.minPxPerSec;
        const isScrolling = scrollWidth > parentWidth;
        const width = isScrolling ? scrollWidth : parentWidth;
        const { height } = this.options;
        this.mainCanvas.width = width;
        this.mainCanvas.height = height;
        this.mainCanvas.style.width = Math.floor(scrollWidth / devicePixelRatio) + 'px';
        // First two channels are used
        const channelData = [audioData.getChannelData(0)];
        if (audioData.numberOfChannels > 1) {
            channelData.push(audioData.getChannelData(1));
        }
        this.renderPeaks(channelData, width, height);
    }
    zoom(audioData, minPxPerSec) {
        // Remember the current cursor position
        const oldCursorPosition = this.cursor.getBoundingClientRect().left;
        this.options.minPxPerSec = minPxPerSec;
        this.render(audioData);
        // Adjust the scroll position so that the cursor stays in the same place
        const newCursortPosition = this.cursor.getBoundingClientRect().left;
        this.scrollContainer.scrollLeft += newCursortPosition - oldCursorPosition;
    }
    renderProgress(progress, autoCenter = false) {
        this.progressCanvas.style.clipPath = `inset(0 ${100 - progress * 100}% 0 0)`;
        this.cursor.style.left = `${progress * 100}%`;
        if (autoCenter) {
            const center = this.container.clientWidth / 2;
            const fullWidth = this.mainCanvas.clientWidth;
            if (fullWidth * progress >= center) {
                this.scrollContainer.scrollLeft = fullWidth * progress - center;
            }
        }
    }
}
export default Renderer;
