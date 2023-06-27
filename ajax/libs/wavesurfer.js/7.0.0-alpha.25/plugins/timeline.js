import BasePlugin from '../base-plugin.js';
const defaultOptions = {
    height: 20,
};
class TimelinePlugin extends BasePlugin {
    timelineWrapper;
    options;
    constructor(options) {
        super(options);
        this.options = Object.assign({}, defaultOptions, options);
        this.timelineWrapper = this.initTimelineWrapper();
    }
    static create(options) {
        return new TimelinePlugin(options);
    }
    init(params) {
        super.init(params);
        if (!this.wavesurfer || !this.wrapper) {
            throw Error('WaveSurfer is not initialized');
        }
        const container = this.options.container ?? this.wrapper;
        container.appendChild(this.timelineWrapper);
        if (this.options.duration) {
            this.initTimeline(this.options.duration);
        }
        else {
            this.subscriptions.push(this.wavesurfer.on('decode', ({ duration }) => {
                this.initTimeline(duration);
            }));
        }
    }
    /** Unmount */
    destroy() {
        this.timelineWrapper.remove();
        super.destroy();
    }
    initTimelineWrapper() {
        return document.createElement('div');
    }
    formatTime(seconds) {
        if (seconds / 60 > 1) {
            // calculate minutes and seconds from seconds count
            const minutes = Math.round(seconds / 60);
            seconds = Math.round(seconds % 60);
            const paddedSeconds = `${seconds < 10 ? '0' : ''}${seconds}`;
            return `${minutes}:${paddedSeconds}`;
        }
        const rounded = Math.round(seconds * 1000) / 1000;
        return `${rounded}`;
    }
    // Return how many seconds should be between each notch
    defaultTimeInterval(pxPerSec) {
        if (pxPerSec >= 25) {
            return 1;
        }
        else if (pxPerSec * 5 >= 25) {
            return 5;
        }
        else if (pxPerSec * 15 >= 25) {
            return 15;
        }
        return Math.ceil(0.5 / pxPerSec) * 60;
    }
    // Return the cadence of notches that get labels in the primary color.
    defaultPrimaryLabelInterval(pxPerSec) {
        if (pxPerSec >= 25) {
            return 10;
        }
        else if (pxPerSec * 5 >= 25) {
            return 6;
        }
        else if (pxPerSec * 15 >= 25) {
            return 4;
        }
        return 4;
    }
    // Return the cadence of notches that get labels in the secondary color.
    defaultSecondaryLabelInterval(pxPerSec) {
        if (pxPerSec >= 25) {
            return 5;
        }
        else if (pxPerSec * 5 >= 25) {
            return 2;
        }
        else if (pxPerSec * 15 >= 25) {
            return 2;
        }
        return 2;
    }
    initTimeline(duration) {
        const width = Math.round(this.timelineWrapper.scrollWidth * devicePixelRatio);
        const pxPerSec = width / duration;
        const timeInterval = this.options.timeInterval ?? this.defaultTimeInterval(pxPerSec);
        const primaryLabelInterval = this.options.primaryLabelInterval ?? this.defaultPrimaryLabelInterval(pxPerSec);
        const secondaryLabelInterval = this.options.secondaryLabelInterval ?? this.defaultSecondaryLabelInterval(pxPerSec);
        const timeline = document.createElement('div');
        timeline.setAttribute('style', `
      height: ${this.options.height}px;
      overflow: hidden;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      font-size: ${this.options.height / 2}px;
      white-space: nowrap;
    `);
        const notchEl = document.createElement('div');
        notchEl.setAttribute('style', `
      width: 1px;
      height: 50%;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      overflow: visible;
      border-left: 1px solid currentColor;
      opacity: 0.25;
    `);
        for (let i = 0; i < duration; i += timeInterval) {
            const notch = notchEl.cloneNode();
            const isPrimary = i % primaryLabelInterval === 0;
            const isSecondary = i % secondaryLabelInterval === 0;
            if (isPrimary || isSecondary) {
                notch.style.height = '100%';
                notch.style.textIndent = '3px';
                notch.textContent = this.formatTime(i);
                if (isPrimary)
                    notch.style.opacity = '1';
            }
            timeline.appendChild(notch);
        }
        this.timelineWrapper.appendChild(timeline);
        this.emit('ready');
    }
}
export default TimelinePlugin;
