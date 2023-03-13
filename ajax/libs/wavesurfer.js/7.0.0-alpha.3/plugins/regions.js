import BasePlugin from '../base-plugin.js';
const MIN_WIDTH = 10;
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
                const dragEnd = e.clientX - this.container.getBoundingClientRect().left;
                if (dragEnd - this.dragStart >= MIN_WIDTH) {
                    if (!this.createdRegion) {
                        this.renderer.getContainer().style.pointerEvents = 'none';
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
            this.renderer.getContainer().style.pointerEvents = '';
        };
        this.container = this.initContainer();
        const unsubscribeReady = this.wavesurfer.on('ready', () => {
            const wrapper = this.renderer.getContainer();
            wrapper.appendChild(this.container);
            unsubscribeReady();
        });
        this.subscriptions.push(unsubscribeReady);
        const wsContainer = this.renderer.getContainer();
        wsContainer.addEventListener('mousedown', this.handleMouseDown);
        document.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('mouseup', this.handleMouseUp);
    }
    /** Unmounts the regions */
    destroy() {
        var _a;
        this.renderer.getContainer().removeEventListener('mousedown', this.handleMouseDown);
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseup', this.handleMouseUp, true);
        (_a = this.container) === null || _a === void 0 ? void 0 : _a.remove();
        super.destroy();
    }
    initContainer() {
        const div = document.createElement('div');
        div.style.position = 'absolute';
        div.style.top = '0';
        div.style.left = '0';
        div.style.width = '100%';
        div.style.height = '100%';
        div.style.zIndex = '3';
        div.style.pointerEvents = 'none';
        return div;
    }
    createRegionElement(start, end, title = '') {
        const el = document.createElement('div');
        el.style.position = 'absolute';
        el.style.left = `${start}px`;
        el.style.width = `${end - start}px`;
        el.style.height = '100%';
        el.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
        el.style.transition = 'background-color 0.2s ease';
        el.style.cursor = 'move';
        el.style.pointerEvents = 'all';
        el.title = title;
        const leftHandle = document.createElement('div');
        leftHandle.style.position = 'absolute';
        leftHandle.style.left = '0';
        leftHandle.style.width = '6px';
        leftHandle.style.height = '100%';
        leftHandle.style.borderLeft = '2px solid rgba(0, 0, 0, 0.5)';
        leftHandle.style.cursor = 'ew-resize';
        leftHandle.style.pointerEvents = 'all';
        el.appendChild(leftHandle);
        const rightHandle = document.createElement('div');
        rightHandle.style.position = 'absolute';
        rightHandle.style.right = '0';
        rightHandle.style.width = '6px';
        rightHandle.style.height = '100%';
        rightHandle.style.borderRight = '2px solid rgba(0, 0, 0, 0.5)';
        rightHandle.style.cursor = 'ew-resize';
        rightHandle.style.pointerEvents = 'all';
        el.appendChild(rightHandle);
        leftHandle.addEventListener('mousedown', (e) => {
            e.stopPropagation();
            this.modifiedRegion = this.regions.find((r) => r.element === el) || null;
            this.isResizingLeft = true;
            this.isMoving = false;
        });
        rightHandle.addEventListener('mousedown', (e) => {
            e.stopPropagation();
            this.modifiedRegion = this.regions.find((r) => r.element === el) || null;
            this.isResizingLeft = false;
            this.isMoving = false;
        });
        el.addEventListener('mousedown', () => {
            this.modifiedRegion = this.regions.find((r) => r.element === el) || null;
            this.isMoving = true;
        });
        el.addEventListener('click', () => {
            const region = this.regions.find((r) => r.element === el);
            if (region) {
                this.emit('region-clicked', { region });
            }
        });
        this.container.appendChild(el);
        return el;
    }
    createRegion(start, end, title = '') {
        const duration = this.wavesurfer.getDuration();
        const width = this.container.clientWidth;
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
            region.startTime = (start / this.container.clientWidth) * this.wavesurfer.getDuration();
        }
        if (end != null) {
            region.end = end;
            region.element.style.width = `${region.end - region.start}px`;
            region.endTime = (end / this.container.clientWidth) * this.wavesurfer.getDuration();
        }
        this.emit('region-updated', { region });
    }
    moveRegion(region, delta) {
        this.updateRegion(region, region.start + delta, region.end + delta);
    }
    /** Create a region at a given start and end time, with an optional title */
    addRegionAtTime(startTime, endTime, title = '') {
        const duration = this.wavesurfer.getDuration();
        const width = this.container.clientWidth;
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
