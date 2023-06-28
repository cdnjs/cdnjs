import EventEmitter from './event-emitter.js';
class Renderer extends EventEmitter {
    constructor(params, options) {
        super();
        this.options = {
            height: 0,
        };
        this.timeout = null;
        this.isScrolling = false;
        this.channelData = null;
        this.duration = null;
        this.resizeObserver = null;
        this.options = { ...options };
        let container = null;
        if (typeof params.container === 'string') {
            container = document.querySelector(params.container);
        }
        else if (params.container instanceof HTMLElement) {
            container = params.container;
        }
        if (!container) {
            throw new Error('Container not found');
        }
        const [div, shadow] = this.initHtml();
        container.appendChild(div);
        this.container = div;
        this.scrollContainer = shadow.querySelector('.scroll');
        this.wrapper = shadow.querySelector('.wrapper');
        this.canvasWrapper = shadow.querySelector('.canvases');
        this.progressWrapper = shadow.querySelector('.progress');
        // Set a click handler
        this.wrapper.addEventListener('click', (e) => {
            const rect = this.wrapper.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const relativeX = x / rect.width;
            this.emit('click', relativeX);
        });
        // Re-render the waveform on container resize
        this.resizeObserver = new ResizeObserver(() => {
            this.delay(() => this.reRender(), 100);
        });
        this.resizeObserver.observe(this.scrollContainer);
    }
    initHtml() {
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
        }
        :host .noScrollbar {
          scrollbar-color: transparent;
          scrollbar-width: none;
        }
        :host .noScrollbar::-webkit-scrollbar {
          display: none;
          -webkit-appearance: none;
        }
        :host .wrapper {
          position: relative;
          overflow: visible;
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
          image-rendering: pixelated;
          height: ${this.options.height}px;
        }
        :host .progress {
          pointer-events: none;
          position: absolute;
          z-index: 2;
          top: 0;
          left: 0;
          width: 0;
          height: 100%;
          overflow: hidden;
          box-sizing: border-box;
        }
      </style>

      <div class="scroll">
        <div class="wrapper">
          <div class="canvases"></div>
          <div class="progress"></div>
        </div>
      </div>
    `;
        return [div, shadow];
    }
    setOptions(options) {
        this.options = options;
        // Re-render the waveform
        this.reRender();
    }
    getContainer() {
        return this.scrollContainer;
    }
    getWrapper() {
        return this.wrapper;
    }
    destroy() {
        this.container.remove();
        this.resizeObserver?.disconnect();
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
        const scaleY = this.options.barHeight ?? 1;
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
            canvas.style.height = `${this.options.height}px`;
            canvas.style.left = `${Math.floor((start * width) / pixelRatio / len)}px`;
            this.canvasWrapper.appendChild(canvas);
            const ctx = canvas.getContext('2d', {
                desynchronized: true,
            });
            ctx.beginPath();
            ctx.fillStyle = this.options.waveColor ?? '';
            // Firefox shim until 2023.04.11
            if (!ctx.roundRect)
                ctx.roundRect = ctx.fillRect;
            for (let i = start; i < end; i++) {
                const barIndex = Math.round((i - start) * barIndexScale);
                if (barIndex > prevX) {
                    const leftBarHeight = Math.round(prevLeft * halfHeight * scaleY);
                    const rightBarHeight = Math.round(prevRight * halfHeight * scaleY);
                    ctx.roundRect(prevX * (barWidth + barGap), halfHeight - leftBarHeight, barWidth, leftBarHeight + (rightBarHeight || 1), barRadius);
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
            if (canvas.width > 0 && canvas.height > 0) {
                progressCtx.drawImage(canvas, 0, 0);
            }
            // Set the composition method to draw only where the waveform is drawn
            progressCtx.globalCompositeOperation = 'source-in';
            progressCtx.fillStyle = this.options.progressColor ?? '';
            // This rectangle acts as a mask thanks to the composition method
            progressCtx.fillRect(0, 0, canvas.width, canvas.height);
        };
        // Clear the canvas
        this.canvasWrapper.innerHTML = '';
        this.progressWrapper.innerHTML = '';
        // Determine the currently visible part of the waveform
        const { scrollLeft, scrollWidth, clientWidth } = this.scrollContainer;
        const scale = len / scrollWidth;
        let viewportWidth = Math.min(Renderer.MAX_CANVAS_WIDTH, clientWidth);
        viewportWidth -= viewportWidth % ((barWidth + barGap) / pixelRatio);
        const start = Math.floor(Math.abs(scrollLeft) * scale);
        const end = Math.ceil(start + viewportWidth * scale);
        // Draw the visible portion of the waveform
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
    render(channelData, duration) {
        // Determine the width of the waveform
        const pixelRatio = window.devicePixelRatio || 1;
        const parentWidth = this.scrollContainer.clientWidth;
        const scrollWidth = Math.ceil(duration * (this.options.minPxPerSec || 0));
        // Whether the container should scroll
        this.isScrolling = scrollWidth > parentWidth;
        const useParentWidth = this.options.fillParent && !this.isScrolling;
        // Width and height of the waveform in pixels
        const width = (useParentWidth ? parentWidth : scrollWidth) * pixelRatio;
        const { height } = this.options;
        // Set the width of the wrapper
        this.wrapper.style.width = useParentWidth ? '100%' : `${scrollWidth}px`;
        // Set additional styles
        this.scrollContainer.style.overflowX = this.isScrolling ? 'auto' : 'hidden';
        this.scrollContainer.classList.toggle('noScrollbar', !!this.options.hideScrollbar);
        this.progressWrapper.style.borderRightStyle = 'solid';
        this.progressWrapper.style.borderRightColor = `${this.options.cursorColor || this.options.progressColor}`;
        this.progressWrapper.style.borderRightWidth = `${this.options.cursorWidth}px`;
        this.canvasWrapper.style.height = `${this.options.height}px`;
        // Render the waveform
        this.renderPeaks(channelData, width, height, pixelRatio);
        this.channelData = channelData;
        this.duration = duration;
    }
    reRender() {
        // Return if the waveform has not been rendered yet
        if (!this.channelData || !this.duration)
            return;
        // Remember the current cursor position
        const oldCursorPosition = this.progressWrapper.clientWidth;
        // Set the new zoom level and re-render the waveform
        this.render(this.channelData, this.duration);
        // Adjust the scroll position so that the cursor stays in the same place
        const newCursortPosition = this.progressWrapper.clientWidth;
        this.scrollContainer.scrollLeft += newCursortPosition - oldCursorPosition;
    }
    zoom(minPxPerSec) {
        this.options.minPxPerSec = minPxPerSec;
        this.reRender();
    }
    renderProgress(progress, autoCenter = false) {
        if (isNaN(progress))
            return;
        this.progressWrapper.style.width = `${progress * 100}%`;
        if (this.isScrolling && this.options.autoCenter) {
            const { clientWidth, scrollLeft, scrollWidth } = this.scrollContainer;
            const progressWidth = scrollWidth * progress;
            const center = clientWidth / 2;
            const minScroll = autoCenter ? center : clientWidth;
            const minDiff = center / 20;
            if (progressWidth > scrollLeft + minScroll || progressWidth < scrollLeft) {
                // If the cursor is in viewport but not centered, scroll to the center slowly
                if (progressWidth - (scrollLeft + center) >= minDiff && progressWidth < scrollLeft + clientWidth) {
                    this.scrollContainer.scrollLeft += minDiff;
                }
                else {
                    // Otherwise, scroll to the center immediately
                    this.scrollContainer.scrollLeft = progressWidth - center;
                }
            }
        }
    }
}
Renderer.MAX_CANVAS_WIDTH = 4000;
export default Renderer;
