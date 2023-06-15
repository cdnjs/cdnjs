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
                this.dragStart = e.clientX - this.container.getBoundingClientRect().left;
            }
        };
        this.handleMouseMove = (e) => {
            const dragEnd = e.clientX - this.container.getBoundingClientRect().left;
            if (this.modifiedRegion && this.isMoving) {
                this.moveRegion(this.modifiedRegion, dragEnd - this.dragStart);
                this.dragStart = dragEnd;
                return;
            }
            if (this.modifiedRegion) {
                this.updateRegion(this.modifiedRegion, this.isResizingLeft ? dragEnd : undefined, this.isResizingLeft ? undefined : dragEnd);
                return;
            }
            if (!isNaN(this.dragStart)) {
                const dragEnd = e.clientX - this.wrapper.getBoundingClientRect().left;
                if (dragEnd - this.dragStart >= MIN_WIDTH) {
                    if (!this.createdRegion) {
                        this.container.style.pointerEvents = 'none';
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
            this.container.style.pointerEvents = '';
        };
        this.options = Object.assign(Object.assign({}, defaultOptions), options);
        this.wrapper = this.initWrapper();
        const unsubscribe = this.wavesurfer.on('decode', () => {
            this.container.appendChild(this.wrapper);
            unsubscribe();
        });
        this.subscriptions.push(unsubscribe);
        this.container.addEventListener('mousedown', this.handleMouseDown);
        document.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('mouseup', this.handleMouseUp);
    }
    /** Unmounts the regions */
    destroy() {
        this.container.removeEventListener('mousedown', this.handleMouseDown);
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseup', this.handleMouseUp, true);
        this.wrapper.remove();
        super.destroy();
    }
    initWrapper() {
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
            borderLeft: '2px solid rgba(0, 0, 0, 0.5)',
            borderRight: noWidth ? '' : '2px solid rgba(0, 0, 0, 0.5)',
            transition: 'background-color 0.2s ease',
            cursor: this.options.draggable ? 'move' : '',
            pointerEvents: 'all',
            padding: '0.2em',
        });
        div.textContent = title;
        const leftHandle = el('div', {
            position: 'absolute',
            left: '0',
            width: '6px',
            height: '100%',
            cursor: this.options.resizable ? 'ew-resize' : '',
            pointerEvents: 'all',
        });
        div.appendChild(leftHandle);
        const rightHandle = leftHandle.cloneNode();
        style(rightHandle, {
            left: '',
            right: '0',
            borderLeft: '',
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
        this.wrapper.appendChild(div);
        return div;
    }
    createRegion(start, end, title = '') {
        const duration = this.wavesurfer.getDuration();
        const width = this.wrapper.clientWidth;
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
        const width = this.wrapper.clientWidth;
        if (start != null) {
            start = Math.max(0, Math.min(start, width));
            region.start = start;
            region.element.style.left = `${region.start}px`;
            region.startTime = (start / this.wrapper.clientWidth) * this.wavesurfer.getDuration();
        }
        if (end != null) {
            end = Math.max(0, Math.min(end, width));
            region.end = end;
            region.element.style.width = `${region.end - region.start}px`;
            region.endTime = (end / this.wrapper.clientWidth) * this.wavesurfer.getDuration();
        }
        this.emit('region-updated', { region });
    }
    moveRegion(region, delta) {
        this.updateRegion(region, region.start + delta, region.end + delta);
    }
    /** Create a region at a given start and end time, with an optional title */
    add(startTime, endTime, title = '') {
        const duration = this.wavesurfer.getDuration();
        const width = this.wrapper.clientWidth;
        const start = (startTime / duration) * width;
        const end = (endTime / duration) * width;
        const region = this.createRegion(start, end, title);
        this.addRegion(region);
        return region;
    }
    /** Set the background color of a region */
    setRegionColor(region, color) {
        region.element.style[region.startTime === region.endTime ? 'borderColor' : 'backgroundColor'] = color;
    }
}
export default RegionsPlugin;
