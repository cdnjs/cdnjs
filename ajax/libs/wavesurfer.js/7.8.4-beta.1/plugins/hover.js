/**
 * The Hover plugin follows the mouse and shows a timestamp
 */
import BasePlugin from '../base-plugin.js';
import createElement from '../dom.js';
const defaultOptions = {
    lineWidth: 1,
    labelSize: 11,
    formatTimeCallback(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secondsRemainder = Math.floor(seconds) % 60;
        const paddedSeconds = `0${secondsRemainder}`.slice(-2);
        return `${minutes}:${paddedSeconds}`;
    },
};
class HoverPlugin extends BasePlugin {
    options;
    wrapper;
    label;
    unsubscribe = () => undefined;
    constructor(options) {
        super(options || {});
        this.options = Object.assign({}, defaultOptions, options);
        // Create the plugin elements
        this.wrapper = createElement('div', { part: 'hover' });
        this.label = createElement('span', { part: 'hover-label' }, this.wrapper);
    }
    static create(options) {
        return new HoverPlugin(options);
    }
    addUnits(value) {
        const units = typeof value === 'number' ? 'px' : '';
        return `${value}${units}`;
    }
    /** Called by wavesurfer, don't call manually */
    onInit() {
        if (!this.wavesurfer) {
            throw Error('WaveSurfer is not initialized');
        }
        const wsOptions = this.wavesurfer.options;
        const lineColor = this.options.lineColor || wsOptions.cursorColor || wsOptions.progressColor;
        // Vertical line
        Object.assign(this.wrapper.style, {
            position: 'absolute',
            zIndex: 10,
            left: 0,
            top: 0,
            height: '100%',
            pointerEvents: 'none',
            borderLeft: `${this.addUnits(this.options.lineWidth)} solid ${lineColor}`,
            opacity: '0',
            transition: 'opacity .1s ease-in',
        });
        // Timestamp label
        Object.assign(this.label.style, {
            display: 'block',
            backgroundColor: this.options.labelBackground,
            color: this.options.labelColor,
            fontSize: `${this.addUnits(this.options.labelSize)}`,
            transition: 'transform .1s ease-in',
            padding: '2px 3px',
        });
        // Append the wrapper
        const container = this.wavesurfer.getWrapper();
        container.appendChild(this.wrapper);
        // Attach pointer events
        container.addEventListener('pointermove', this.onPointerMove);
        container.addEventListener('pointerleave', this.onPointerLeave);
        container.addEventListener('wheel', this.onPointerMove);
        this.unsubscribe = () => {
            container.removeEventListener('pointermove', this.onPointerMove);
            container.removeEventListener('pointerleave', this.onPointerLeave);
            container.removeEventListener('wheel', this.onPointerLeave);
        };
    }
    onPointerMove = (e) => {
        if (!this.wavesurfer)
            return;
        // Position
        const bbox = this.wavesurfer.getWrapper().getBoundingClientRect();
        const { width } = bbox;
        const offsetX = e.clientX - bbox.left;
        const relX = Math.min(1, Math.max(0, offsetX / width));
        const posX = Math.min(width - this.options.lineWidth - 1, offsetX);
        this.wrapper.style.transform = `translateX(${posX}px)`;
        this.wrapper.style.opacity = '1';
        // Timestamp
        const duration = this.wavesurfer.getDuration() || 0;
        this.label.textContent = this.options.formatTimeCallback(duration * relX);
        const labelWidth = this.label.offsetWidth;
        this.label.style.transform =
            posX + labelWidth > width ? `translateX(-${labelWidth + this.options.lineWidth}px)` : '';
        // Emit a hover event with the relative X position
        this.emit('hover', relX);
    };
    onPointerLeave = () => {
        this.wrapper.style.opacity = '0';
    };
    /** Unmount */
    destroy() {
        super.destroy();
        this.unsubscribe();
        this.wrapper.remove();
    }
}
export default HoverPlugin;
