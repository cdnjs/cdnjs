import EventEmitter from './event-emitter.js';
class Renderer extends EventEmitter {
    constructor(options) {
        super();
        this.timeouts = [];
        this.isScrolling = false;
        this.audioData = null;
        this.resizeObserver = null;
        this.isDragging = false;
        this.options = options;
        let container;
        if (typeof options.container === 'string') {
            container = document.querySelector(options.container);
        }
        else if (options.container instanceof HTMLElement) {
            container = options.container;
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
        this.cursor = shadow.querySelector('.cursor');
        this.initEvents();
    }
    initEvents() {
        // Add a click listener
        this.wrapper.addEventListener('click', (e) => {
            const rect = this.wrapper.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const relativeX = x / rect.width;
            this.emit('click', relativeX);
        });
        // Drag
        this.initDrag();
        // Add a scroll listener
        this.scrollContainer.addEventListener('scroll', () => {
            const { scrollLeft, scrollWidth, clientWidth } = this.scrollContainer;
            const startX = scrollLeft / scrollWidth;
            const endX = (scrollLeft + clientWidth) / scrollWidth;
            this.emit('scroll', startX, endX);
        });
        // Re-render the waveform on container resize
        const delay = this.createDelay(100);
        this.resizeObserver = new ResizeObserver(() => {
            delay(() => this.reRender());
        });
        this.resizeObserver.observe(this.scrollContainer);
    }
    initDrag() {
        this.wrapper.addEventListener('mousedown', (e) => {
            const minDx = 5;
            const x = e.clientX;
            const move = (e) => {
                const diff = Math.abs(e.clientX - x);
                if (diff >= minDx) {
                    this.isDragging = true;
                    const rect = this.wrapper.getBoundingClientRect();
                    this.emit('drag', Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)));
                }
            };
            const up = () => {
                document.removeEventListener('mousemove', move);
                document.removeEventListener('mouseup', up);
                this.isDragging = false;
            };
            document.addEventListener('mousemove', move);
            document.addEventListener('mouseup', up);
        });
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
          min-height: ${this.options.height}px;
        }
        :host .canvases > div {
          position: relative;
        }
        :host canvas {
          display: block;
          position: absolute;
          top: 0;
          image-rendering: pixelated;
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
        }
        :host .progress > div {
          position: relative;
        }
        :host .cursor {
          pointer-events: none;
          position: absolute;
          z-index: 5;
          top: 0;
          left: 0;
          height: 100%;
          border-radius: 2px;
        }
      </style>

      <div class="scroll" part="scroll">
        <div class="wrapper">
          <div class="canvases"></div>
          <div class="progress"></div>
          <div class="cursor" part="cursor"></div>
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
    getWrapper() {
        return this.wrapper;
    }
    getScroll() {
        return this.scrollContainer.scrollLeft;
    }
    destroy() {
        this.container.remove();
        this.resizeObserver?.disconnect();
    }
    createDelay(delayMs = 10) {
        const context = {};
        this.timeouts.push(context);
        return (callback) => {
            context.timeout && clearTimeout(context.timeout);
            context.timeout = setTimeout(callback, delayMs);
        };
    }
    // Convert array of color values to linear gradient
    convertColorValues(color) {
        if (!Array.isArray(color))
            return color || '';
        if (color.length < 2)
            return color.length === 1 ? color[0] : '';
        const canvasElement = document.createElement('canvas');
        const ctx = canvasElement.getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 0, canvasElement.height);
        const colorStopPercentage = 1 / (color.length - 1);
        color.forEach((color, index) => {
            const offset = index * colorStopPercentage;
            gradient.addColorStop(offset, color);
        });
        return gradient;
    }
    renderSingleCanvas(channelData, options, width, start, end, canvasContainer, progressContainer) {
        const pixelRatio = window.devicePixelRatio || 1;
        const height = options.height || 0;
        const barWidth = options.barWidth != null && !isNaN(options.barWidth) ? options.barWidth * pixelRatio : 1;
        const barGap = options.barGap != null && !isNaN(options.barGap)
            ? options.barGap * pixelRatio
            : options.barWidth
                ? barWidth / 2
                : 0;
        const barRadius = options.barRadius || 0;
        const barScale = options.barHeight || 1;
        const isMono = channelData.length === 1;
        const leftChannel = channelData[0];
        const rightChannel = isMono ? leftChannel : channelData[1];
        const useNegative = isMono && rightChannel.some((v) => v < 0);
        const length = leftChannel.length;
        const barCount = Math.floor(width / (barWidth + barGap));
        const barIndexScale = barCount / length;
        const halfHeight = height / 2;
        let prevX = 0;
        let prevLeft = 0;
        let prevRight = 0;
        const canvas = document.createElement('canvas');
        canvas.width = Math.round((width * (end - start)) / length);
        canvas.height = height;
        canvas.style.width = `${Math.floor(canvas.width / pixelRatio)}px`;
        canvas.style.height = `${options.height}px`;
        canvas.style.left = `${Math.floor((start * width) / pixelRatio / length)}px`;
        canvasContainer.appendChild(canvas);
        const ctx = canvas.getContext('2d', {
            desynchronized: true,
        });
        ctx.beginPath();
        ctx.fillStyle = this.convertColorValues(options.waveColor);
        // Firefox shim until 2023.04.11
        if (!ctx.roundRect)
            ctx.roundRect = ctx.fillRect;
        for (let i = start; i < end; i++) {
            const barIndex = Math.round((i - start) * barIndexScale);
            if (barIndex > prevX) {
                const leftBarHeight = Math.round(prevLeft * halfHeight * barScale);
                const rightBarHeight = Math.round(prevRight * halfHeight * barScale);
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
        progressContainer.appendChild(progressCanvas);
        const progressCtx = progressCanvas.getContext('2d', {
            desynchronized: true,
        });
        if (canvas.width > 0 && canvas.height > 0) {
            progressCtx.drawImage(canvas, 0, 0);
        }
        // Set the composition method to draw only where the waveform is drawn
        progressCtx.globalCompositeOperation = 'source-in';
        progressCtx.fillStyle = this.convertColorValues(options.progressColor);
        // This rectangle acts as a mask thanks to the composition method
        progressCtx.fillRect(0, 0, canvas.width, canvas.height);
    }
    renderWaveform(channelData, options, width) {
        // A container for canvases
        const canvasContainer = document.createElement('div');
        canvasContainer.style.height = `${options.height}px`;
        this.canvasWrapper.appendChild(canvasContainer);
        // A container for progress canvases
        const progressContainer = canvasContainer.cloneNode();
        this.progressWrapper.appendChild(progressContainer);
        // Determine the currently visible part of the waveform
        const { scrollLeft, scrollWidth, clientWidth } = this.scrollContainer;
        const len = channelData[0].length;
        const scale = len / scrollWidth;
        const viewportWidth = Math.min(Renderer.MAX_CANVAS_WIDTH, clientWidth);
        const start = Math.floor(Math.abs(scrollLeft) * scale);
        const end = Math.ceil(start + viewportWidth * scale);
        const viewportLen = end - start;
        // Draw a portion of the waveform from start peak to end peak
        const draw = (start, end) => {
            this.renderSingleCanvas(channelData, options, width, Math.max(0, start), Math.min(end, len), canvasContainer, progressContainer);
        };
        // Draw the waveform in viewport chunks, each with a delay
        const headDelay = this.createDelay();
        const tailDelay = this.createDelay();
        const renderHead = (fromIndex, toIndex) => {
            draw(fromIndex, toIndex);
            if (fromIndex > 0) {
                headDelay(() => {
                    renderHead(fromIndex - viewportLen, toIndex - viewportLen);
                });
            }
        };
        const renderTail = (fromIndex, toIndex) => {
            draw(fromIndex, toIndex);
            if (toIndex < len) {
                tailDelay(() => {
                    renderTail(fromIndex + viewportLen, toIndex + viewportLen);
                });
            }
        };
        renderHead(start, end);
        if (end < len) {
            renderTail(end, end + viewportLen);
        }
    }
    render(audioData) {
        // Clear previous timeouts
        this.timeouts.forEach((context) => context.timeout && clearTimeout(context.timeout));
        this.timeouts = [];
        // Determine the width of the waveform
        const pixelRatio = window.devicePixelRatio || 1;
        const parentWidth = this.scrollContainer.clientWidth;
        const scrollWidth = Math.ceil(audioData.duration * (this.options.minPxPerSec || 0));
        // Whether the container should scroll
        this.isScrolling = scrollWidth > parentWidth;
        const useParentWidth = this.options.fillParent && !this.isScrolling;
        // Width and height of the waveform in pixels
        const width = (useParentWidth ? parentWidth : scrollWidth) * pixelRatio;
        // Set the width of the wrapper
        this.wrapper.style.width = useParentWidth ? '100%' : `${scrollWidth}px`;
        // Set additional styles
        this.scrollContainer.style.overflowX = this.isScrolling ? 'auto' : 'hidden';
        this.scrollContainer.classList.toggle('noScrollbar', !!this.options.hideScrollbar);
        this.cursor.style.backgroundColor = `${this.options.cursorColor || this.options.progressColor}`;
        this.cursor.style.width = `${this.options.cursorWidth}px`;
        // Clear the canvases
        this.canvasWrapper.innerHTML = '';
        this.progressWrapper.innerHTML = '';
        // Render the waveform
        if (this.options.splitChannels) {
            // Render a waveform for each channel
            for (let i = 0; i < audioData.numberOfChannels; i++) {
                const options = { ...this.options, ...this.options.splitChannels[i] };
                this.renderWaveform([audioData.getChannelData(i)], options, width);
            }
        }
        else {
            // Render a single waveform for the first two channels (left and right)
            const channels = [audioData.getChannelData(0)];
            if (audioData.numberOfChannels > 1)
                channels.push(audioData.getChannelData(1));
            this.renderWaveform(channels, this.options, width);
        }
        this.audioData = audioData;
        this.emit('render');
    }
    reRender() {
        // Return if the waveform has not been rendered yet
        if (!this.audioData)
            return;
        // Remember the current cursor position
        const oldCursorPosition = this.progressWrapper.clientWidth;
        // Set the new zoom level and re-render the waveform
        this.render(this.audioData);
        // Adjust the scroll position so that the cursor stays in the same place
        const newCursortPosition = this.progressWrapper.clientWidth;
        this.scrollContainer.scrollLeft += newCursortPosition - oldCursorPosition;
    }
    zoom(minPxPerSec) {
        this.options.minPxPerSec = minPxPerSec;
        this.reRender();
    }
    scrollIntoView(progress, isPlaying = false) {
        const { clientWidth, scrollLeft, scrollWidth } = this.scrollContainer;
        const progressWidth = scrollWidth * progress;
        const center = clientWidth / 2;
        const minScroll = isPlaying && this.options.autoCenter && !this.isDragging ? center : clientWidth;
        if (progressWidth > scrollLeft + minScroll || progressWidth < scrollLeft) {
            // Scroll to the center
            if (this.options.autoCenter && !this.isDragging) {
                // If the cursor is in viewport but not centered, scroll to the center slowly
                const minDiff = center / 20;
                if (progressWidth - (scrollLeft + center) >= minDiff && progressWidth < scrollLeft + clientWidth) {
                    this.scrollContainer.scrollLeft += minDiff;
                }
                else {
                    // Otherwise, scroll to the center immediately
                    this.scrollContainer.scrollLeft = progressWidth - center;
                }
            }
            else if (this.isDragging) {
                // Scroll just a little bit to allow for some space between the cursor and the edge
                const gap = 10;
                this.scrollContainer.scrollLeft =
                    progressWidth < scrollLeft ? progressWidth - gap : progressWidth - clientWidth + gap;
            }
            else {
                // Scroll to the beginning
                this.scrollContainer.scrollLeft = progressWidth;
            }
        }
        // Emit the scroll event
        {
            const { scrollLeft } = this.scrollContainer;
            const startX = scrollLeft / scrollWidth;
            const endX = (scrollLeft + clientWidth) / scrollWidth;
            this.emit('scroll', startX, endX);
        }
    }
    renderProgress(progress, isPlaying) {
        if (isNaN(progress))
            return;
        this.progressWrapper.style.width = `${progress * 100}%`;
        this.cursor.style.left = `${progress * 100}%`;
        this.cursor.style.marginLeft = Math.round(progress * 100) === 100 ? `-${this.options.cursorWidth}px` : '';
        if (this.isScrolling && this.options.autoScroll) {
            this.scrollIntoView(progress, isPlaying);
        }
    }
}
Renderer.MAX_CANVAS_WIDTH = 4000;
export default Renderer;
