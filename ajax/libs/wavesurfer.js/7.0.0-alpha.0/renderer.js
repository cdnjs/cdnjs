import EventEmitter from './event-emitter.js';
class Renderer extends EventEmitter {
    constructor(options) {
        super();
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
        :host .scroll {
          overflow-x: auto;
          overflow-y: visible;
          user-select: none;
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
          border-right: 1px solid ${this.options.progressColor};
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
        this.shadowRoot = shadow;
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
    destroy() {
        this.container.remove();
    }
    renderLinePeaks(channelData, width, height) {
        const { ctx } = this;
        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        ctx.moveTo(0, height / 2);
        // Channel 0 is left, 1 is right
        const leftChannel = channelData[0];
        const isMono = channelData.length === 1;
        const rightChannel = isMono ? leftChannel : channelData[1];
        // Draw left channel in the top half of the canvas
        let prevX = -1;
        let prevY = 0;
        for (let i = 0, len = leftChannel.length; i < len; i++) {
            const x = Math.round((i / leftChannel.length) * width);
            const y = Math.round(((1 - leftChannel[i]) * height) / 2);
            if (x !== prevX || y > prevY) {
                ctx.lineTo(x, y);
                prevX = x;
                prevY = y;
            }
        }
        // Draw right channel in the bottom half of the canvas
        prevX = -1;
        prevY = 0;
        for (let i = rightChannel.length - 1; i >= 0; i--) {
            const x = Math.round((i / rightChannel.length) * width);
            const y = Math.round(((1 + rightChannel[i]) * height) / 2);
            if (x !== prevX || (isMono ? y < -prevY : y > prevY)) {
                ctx.lineTo(x, y);
                prevX = x;
                prevY = y;
            }
        }
        ctx.strokeStyle = ctx.fillStyle = this.options.waveColor;
        ctx.stroke();
        ctx.fill();
    }
    renderBarPeaks(channelData, width, height) {
        var _a, _b;
        const { devicePixelRatio } = window;
        const { ctx } = this;
        ctx.clearRect(0, 0, width, height);
        const barWidthOption = this.options.barWidth || 1;
        const barWidth = barWidthOption * devicePixelRatio;
        const barGap = ((_a = this.options.barGap) !== null && _a !== void 0 ? _a : barWidthOption / 2) * devicePixelRatio;
        const barRadius = (_b = this.options.barRadius) !== null && _b !== void 0 ? _b : 0;
        const leftChannel = channelData[0];
        const isMono = channelData.length === 1;
        const rightChannel = isMono ? leftChannel : channelData[1];
        const barCount = Math.floor(width / (barWidth + barGap));
        const leftChannelBars = new Float32Array(barCount);
        const rightChannelBars = new Float32Array(barCount);
        const barIndexScale = barCount / leftChannel.length;
        const leftChannelLength = leftChannel.length;
        for (let i = 0; i < leftChannelLength; i++) {
            const barIndex = Math.round(i * barIndexScale);
            leftChannelBars[barIndex] = Math.max(leftChannelBars[barIndex], leftChannel[i]);
            rightChannelBars[barIndex] = (isMono ? Math.min : Math.max)(rightChannelBars[barIndex], rightChannel[i]);
        }
        ctx.beginPath();
        for (let i = 0; i < barCount; i++) {
            const leftBarHeight = Math.max(1, Math.round((leftChannelBars[i] * height) / 2));
            const rightBarHeight = Math.max(1, Math.round(Math.abs(rightChannelBars[i] * height) / 2));
            ctx.roundRect(i * (barWidth + barGap), height / 2 - leftBarHeight, barWidth, leftBarHeight + rightBarHeight, barRadius);
        }
        ctx.fillStyle = this.options.waveColor;
        ctx.fill();
    }
    render(channelData, duration, minPxPerSec = this.options.minPxPerSec) {
        const { devicePixelRatio } = window;
        const width = Math.max(this.container.clientWidth * devicePixelRatio, duration * minPxPerSec);
        const { height } = this.options;
        this.mainCanvas.width = width;
        this.mainCanvas.height = height;
        this.mainCanvas.style.width = Math.round(width / devicePixelRatio) + 'px';
        const renderingFn = this.options.barWidth ? this.renderBarPeaks : this.renderLinePeaks;
        renderingFn.call(this, channelData, width, height);
        this.createProgressMask();
    }
    createProgressMask() {
        const progressCtx = this.progressCanvas.getContext('2d', { desynchronized: true });
        if (!progressCtx) {
            throw new Error('Failed to get canvas context');
        }
        this.progressCanvas.width = this.mainCanvas.width;
        this.progressCanvas.height = this.mainCanvas.height;
        this.progressCanvas.style.width = this.mainCanvas.style.width;
        this.progressCanvas.style.height = this.mainCanvas.style.height;
        progressCtx.drawImage(this.mainCanvas, 0, 0);
        progressCtx.globalCompositeOperation = 'source-in';
        progressCtx.fillStyle = this.options.progressColor;
        progressCtx.fillRect(0, 0, this.progressCanvas.width, this.progressCanvas.height);
    }
    renderProgress(progress, autoCenter = false) {
        this.progressCanvas.style.clipPath = `inset(0 ${100 - progress * 100}% 0 0)`;
        this.cursor.style.left = `${progress * 100}%`;
        if (autoCenter) {
            const center = this.container.clientWidth / 2;
            const fullWidth = this.mainCanvas.clientWidth;
            if (fullWidth * progress >= center) {
                this.container.scrollLeft = fullWidth * progress - center;
            }
        }
    }
    getContainer() {
        return this.shadowRoot.querySelector('.scroll');
    }
}
export default Renderer;
