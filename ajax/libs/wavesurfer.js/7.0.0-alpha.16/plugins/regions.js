import BasePlugin from '../base-plugin.js';
const MIN_WIDTH = 10;
const defaultOptions = {
    dragSelection: true,
    draggable: true,
    resizable: true,
};
const style = (element, styles) => {
    for (const key in styles) {
        element.style[key] = styles[key] || '';
    }
};
const el = (tagName, css) => {
    const element = document.createElement(tagName);
    style(element, css);
    return element;
};
class RegionsPlugin extends BasePlugin {
    /** Create an instance of RegionsPlugin */
    constructor(params, options) {
        super(params, options);
        this.dragStart = NaN;
        this.regions = [];
        this.createdRegion = null;
        this.modifiedRegion = null;
        this.isResizingLeft = false;
        this.isMoving = false;
        this.handleMouseDown = (e) => {
            if (this.options.draggable || this.options.resizable || this.options.dragSelection) {
                this.dragStart = e.clientX - this.wrapper.getBoundingClientRect().left;
            }
        };
        this.handleMouseMove = (e) => {
            const dragEnd = e.clientX - this.wrapper.getBoundingClientRect().left;
            if (this.options.draggable && this.modifiedRegion && this.isMoving) {
                this.moveRegion(this.modifiedRegion, dragEnd - this.dragStart);
                this.dragStart = dragEnd;
                return;
            }
            if (this.options.resizable && this.modifiedRegion) {
                this.updateRegion(this.modifiedRegion, this.isResizingLeft ? dragEnd : undefined, this.isResizingLeft ? undefined : dragEnd);
                return;
            }
            if (this.options.dragSelection && !isNaN(this.dragStart)) {
                const dragEnd = e.clientX - this.regionsContainer.getBoundingClientRect().left;
                if (dragEnd - this.dragStart >= MIN_WIDTH) {
                    if (!this.createdRegion) {
                        this.wrapper.style.pointerEvents = 'none';
                        this.createdRegion = this.createRegion(this.dragStart, dragEnd);
                    }
                    else {
                        this.updateRegion(this.createdRegion, this.dragStart, dragEnd);
                    }
                }
            }
        };
        this.handleMouseUp = () => {
            if (this.createdRegion) {
                this.addRegion(this.createdRegion);
                this.createdRegion = null;
            }
            this.modifiedRegion = null;
            this.isMoving = false;
            this.dragStart = NaN;
            this.wrapper.style.pointerEvents = '';
        };
        this.options = Object.assign({}, defaultOptions, options);
        this.regionsContainer = this.initRegionsContainer();
        const unsubscribe = this.wavesurfer.once('decode', () => {
            this.wrapper.appendChild(this.regionsContainer);
        });
        this.subscriptions.push(unsubscribe);
        this.wrapper.addEventListener('mousedown', this.handleMouseDown);
        document.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('mouseup', this.handleMouseUp);
    }
    /** Unmount */
    destroy() {
        this.wrapper.removeEventListener('mousedown', this.handleMouseDown);
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseup', this.handleMouseUp, true);
        this.regionsContainer.remove();
        super.destroy();
    }
    initRegionsContainer() {
        return el('div', {
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            zIndex: '3',
            pointerEvents: 'none',
        });
    }
    createRegionElement(start, end, title = '') {
        const noWidth = start === end;
        const div = el('div', {
            position: 'absolute',
            left: `${start}px`,
            width: `${end - start}px`,
            height: '100%',
            backgroundColor: noWidth ? '' : 'rgba(0, 0, 0, 0.1)',
            borderRadius: '2px',
            boxSizing: 'border-box',
            borderLeft: noWidth ? '2px solid rgba(0, 0, 0, 0.5)' : '',
            transition: 'background-color 0.2s ease',
            cursor: this.options.draggable ? 'move' : '',
            pointerEvents: 'all',
            whiteSpace: noWidth ? 'nowrap' : '',
            padding: '0.2em',
        });
        div.textContent = title;
        const leftHandle = el('div', {
            position: 'absolute',
            left: '0',
            top: '0',
            width: '6px',
            height: '100%',
            cursor: this.options.resizable ? 'ew-resize' : '',
            pointerEvents: 'all',
            borderLeft: noWidth ? '' : '2px solid rgba(0, 0, 0, 0.5)',
            borderRadius: '2px 0 0 2px',
        });
        div.appendChild(leftHandle);
        const rightHandle = leftHandle.cloneNode();
        style(rightHandle, {
            left: '',
            right: '0',
            borderLeft: '',
            borderRight: noWidth ? '' : '2px solid rgba(0, 0, 0, 0.5)',
            borderRadius: '0 2px 2px 0',
        });
        div.appendChild(rightHandle);
        leftHandle.addEventListener('mousedown', (e) => {
            if (!this.options.resizable)
                return;
            e.stopPropagation();
            this.modifiedRegion = this.regions.find((r) => r.element === div) || null;
            this.isResizingLeft = true;
            this.isMoving = false;
        });
        rightHandle.addEventListener('mousedown', (e) => {
            if (!this.options.resizable)
                return;
            e.stopPropagation();
            this.modifiedRegion = this.regions.find((r) => r.element === div) || null;
            this.isResizingLeft = false;
            this.isMoving = false;
        });
        div.addEventListener('mousedown', () => {
            if (!this.options.draggable)
                return;
            this.modifiedRegion = this.regions.find((r) => r.element === div) || null;
            this.isMoving = true;
        });
        div.addEventListener('click', () => {
            const region = this.regions.find((r) => r.element === div);
            if (region) {
                this.emit('region-clicked', { region });
            }
        });
        this.regionsContainer.appendChild(div);
        return div;
    }
    createRegion(start, end, title = '') {
        const duration = this.wavesurfer.getDuration();
        const width = this.regionsContainer.clientWidth;
        start = Math.max(0, Math.min(start, width - 1));
        end = Math.max(0, Math.min(end, width - 1));
        return {
            element: this.createRegionElement(start, end, title),
            start,
            end,
            startTime: (start / width) * duration,
            endTime: (end / width) * duration,
            title,
        };
    }
    addRegion(region) {
        this.regions.push(region);
        this.emit('region-created', { region });
    }
    updateRegion(region, start, end) {
        const width = this.regionsContainer.clientWidth;
        if (start != null) {
            start = Math.max(0, Math.min(start, width));
            region.start = start;
            region.element.style.left = `${region.start}px`;
            region.element.style.width = `${region.end - region.start}px`;
            region.startTime = (start / this.regionsContainer.clientWidth) * this.wavesurfer.getDuration();
        }
        if (end != null) {
            end = Math.max(0, Math.min(end, width));
            region.end = end;
            region.element.style.width = `${region.end - region.start}px`;
            region.endTime = (end / this.regionsContainer.clientWidth) * this.wavesurfer.getDuration();
        }
        this.emit('region-updated', { region });
    }
    moveRegion(region, delta) {
        this.updateRegion(region, region.start + delta, region.end + delta);
    }
    /** Create a region at a given start and end time, with an optional title */
    add(startTime, endTime, title = '', color = '') {
        const duration = this.wavesurfer.getDuration();
        const width = this.regionsContainer.clientWidth;
        const start = (startTime / duration) * width;
        const end = (endTime / duration) * width;
        const region = this.createRegion(start, end, title);
        this.addRegion(region);
        if (color)
            this.setRegionColor(region, color);
        return region;
    }
    /** Set the background color of a region */
    setRegionColor(region, color) {
        region.element.style[region.startTime === region.endTime ? 'borderColor' : 'backgroundColor'] = color;
    }
}
export default RegionsPlugin;
