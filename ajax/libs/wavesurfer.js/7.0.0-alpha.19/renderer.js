import EventEmitter from './event-emitter.js';
class Renderer extends EventEmitter {
    options;
    container;
    scrollContainer;
    wrapper;
    canvasWrapper;
    progressWrapper;
    timeout = null;
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
        :host {
          user-select: none;
        }
        :host .scroll {
          overflow-x: auto;
          overflow-y: hidden;
          width: 100%;
          position: relative;
          ${this.options.noScrollbar ? 'scrollbar-color: transparent;' : ''}
        }
        :host ::-webkit-scrollbar {
          display: ${this.options.noScrollbar ? 'none' : 'auto'};
        }
        :host .wrapper {
          position: relative;
          min-width: 100%;
          z-index: 2;
        }
        :host .canvases {
          position: relative;
          height: ${this.options.height}px;
        }
        :host canvas {
          display: block;
          position: absolute;
          top: 0;
          height: ${this.options.height}px;
          image-rendering: pixelated;
        }
        :host .progress {
          pointer-events: none;
          position: absolute;
          z-index: 2;
          top: 0;
          left: 0;
          width: 0;
          height: ${this.options.height}px;
          overflow: hidden;
          box-sizing: border-box;
          border-right-style: solid;
          border-right-width: ${this.options.cursorWidth}px;
          border-right-color: ${this.options.cursorColor || this.options.progressColor};
        }
      </style>

      <div class="scroll">
        <div class="wrapper">
          <div class="canvases"></div>
          <div class="progress"></div>
        </div>
      </div>
    `;
        this.container = div;
        this.scrollContainer = shadow.querySelector('.scroll');
        this.wrapper = shadow.querySelector('.wrapper');
        this.canvasWrapper = shadow.querySelector('.canvases');
        this.progressWrapper = shadow.querySelector('.progress');
        container.appendChild(div);
        this.wrapper.addEventListener('click', (e) => {
            const rect = this.wrapper.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const relativeX = x / rect.width;
            this.emit('click', { relativeX });
        });
    }
    getContainer() {
        return this.scrollContainer;
    }
    getWrapper() {
        return this.wrapper;
    }
    destroy() {
        this.container.remove();
    }
    delay(fn, delayMs = 10) {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        return new Promise((resolve) => {
            this.timeout = setTimeout(() => {
                resolve(fn());
            }, delayMs);
        });
    }
    async renderPeaks(channelData, width, height, pixelRatio) {
        const barWidth = this.options.barWidth != null ? this.options.barWidth * pixelRatio : 1;
        const barGap = this.options.barGap != null ? this.options.barGap * pixelRatio : this.options.barWidth ? barWidth / 2 : 0;
        const barRadius = this.options.barRadius ?? 0;
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
            const canvas = document.createElement('canvas');
            canvas.width = Math.round((width * (end - start)) / len);
            canvas.height = this.options.height;
            canvas.style.width = `${Math.floor(canvas.width / pixelRatio)}px`;
            canvas.style.left = `${Math.floor((start * width) / pixelRatio / len)}px`;
            this.canvasWrapper.appendChild(canvas);
            const ctx = canvas.getContext('2d', {
                desynchronized: true,
            });
            ctx.beginPath();
            ctx.fillStyle = this.options.waveColor;
            // Firefox shim until 2023.04.11
            if (!ctx.roundRect)
                ctx.roundRect = ctx.fillRect;
            for (let i = start; i < end; i++) {
                const barIndex = Math.round((i - start) * barIndexScale);
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
            ctx.fill();
            ctx.closePath();
            // Draw a progress canvas
            const progressCanvas = canvas.cloneNode();
            this.progressWrapper.appendChild(progressCanvas);
            const progressCtx = progressCanvas.getContext('2d', {
                desynchronized: true,
            });
            progressCtx.drawImage(canvas, 0, 0);
            // Set the composition method to draw only where the waveform is drawn
            progressCtx.globalCompositeOperation = 'source-in';
            progressCtx.fillStyle = this.options.progressColor;
            // This rectangle acts as a mask thanks to the composition method
            progressCtx.fillRect(0, 0, canvas.width, canvas.height);
        };
        // Clear the canvas
        this.canvasWrapper.innerHTML = '';
        this.progressWrapper.innerHTML = '';
        // Draw the currently visible part of the waveform
        const { scrollLeft, scrollWidth, clientWidth } = this.scrollContainer;
        const scale = len / scrollWidth;
        const start = Math.floor(scrollLeft * scale);
        const end = Math.ceil(Math.min(scrollWidth, scrollLeft + clientWidth) * scale);
        draw(start, end);
        // Draw the rest of the waveform with a timeout for better performance
        const step = end - start;
        for (let i = end; i < len; i += step) {
            await this.delay(() => {
                draw(i, Math.min(len, i + step));
            });
        }
        for (let i = start - 1; i >= 0; i -= step) {
            await this.delay(() => {
                draw(Math.max(0, i - step), i);
            });
        }
    }
    render(audioData) {
        // Determine the width of the canvas
        const pixelRatio = window.devicePixelRatio || 1;
        const parentWidth = this.options.fillParent ? this.scrollContainer.clientWidth * pixelRatio : 0;
        const scrollWidth = audioData.duration * this.options.minPxPerSec;
        const isScrolling = scrollWidth > parentWidth;
        const width = Math.max(1, isScrolling ? scrollWidth : parentWidth);
        const { height } = this.options;
        // Remember the current cursor position
        const oldCursorPosition = this.progressWrapper.clientWidth;
        this.scrollContainer.style.overflowX = isScrolling ? 'auto' : 'hidden';
        this.wrapper.style.width = `${Math.floor(width / pixelRatio)}px`;
        // Adjust the scroll position so that the cursor stays in the same place
        const newCursortPosition = this.progressWrapper.clientWidth;
        this.scrollContainer.scrollLeft += newCursortPosition - oldCursorPosition;
        // First two channels are used
        const channelData = [audioData.getChannelData(0)];
        if (audioData.numberOfChannels > 1) {
            channelData.push(audioData.getChannelData(1));
        }
        this.renderPeaks(channelData, width, height, pixelRatio);
    }
    zoom(audioData, minPxPerSec) {
        this.options.minPxPerSec = minPxPerSec;
        this.render(audioData);
    }
    renderProgress(progress, autoCenter = false) {
        this.progressWrapper.style.width = `${progress * 100}%`;
        const containerWidth = this.scrollContainer.clientWidth;
        const center = containerWidth / 2;
        const progressWidth = this.progressWrapper.clientWidth;
        const minScroll = autoCenter ? center : containerWidth;
        if (progressWidth > this.scrollContainer.scrollLeft + minScroll) {
            this.scrollContainer.scrollLeft = progressWidth - center;
        }
    }
}
export default Renderer;
