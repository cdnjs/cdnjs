import BasePlugin from '../base-plugin.js';
const MIN_WIDTH = 10;
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
    constructor(params) {
        super(params);
        this.dragStart = NaN;
        this.regions = [];
        this.createdRegion = null;
        this.modifiedRegion = null;
        this.isResizingLeft = false;
        this.isMoving = false;
        this.handleMouseDown = (e) => {
            this.dragStart = e.clientX - this.container.getBoundingClientRect().left;
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
        const div = el('div', {
            position: 'absolute',
            left: `${start}px`,
            width: `${end - start}px`,
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.2s ease',
            cursor: 'move',
            pointerEvents: 'all',
        });
        div.title = title;
        const leftHandle = el('div', {
            position: 'absolute',
            left: '0',
            width: '6px',
            height: '100%',
            borderLeft: '2px solid rgba(0, 0, 0, 0.5)',
            borderRadius: '2px 0 0 2px',
            cursor: 'ew-resize',
            pointerEvents: 'all',
        });
        div.appendChild(leftHandle);
        const rightHandle = leftHandle.cloneNode();
        style(rightHandle, {
            left: '',
            right: '0',
            borderLeft: '',
            borderRight: '2px solid rgba(0, 0, 0, 0.5)',
            borderRadius: '0 2px 2px 0',
        });
        div.appendChild(rightHandle);
        leftHandle.addEventListener('mousedown', (e) => {
            e.stopPropagation();
            this.modifiedRegion = this.regions.find((r) => r.element === div) || null;
            this.isResizingLeft = true;
            this.isMoving = false;
        });
        rightHandle.addEventListener('mousedown', (e) => {
            e.stopPropagation();
            this.modifiedRegion = this.regions.find((r) => r.element === div) || null;
            this.isResizingLeft = false;
            this.isMoving = false;
        });
        div.addEventListener('mousedown', () => {
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
        if (start != null) {
            region.start = start !== null && start !== void 0 ? start : region.start;
            region.element.style.left = `${region.start}px`;
            region.startTime = (start / this.wrapper.clientWidth) * this.wavesurfer.getDuration();
        }
        if (end != null) {
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
        region.element.style.backgroundColor = color;
    }
}
export default RegionsPlugin;
