/**
 * Regions are visual overlays on the waveform that can be used to mark segments of audio.
 * Regions can be clicked on, dragged and resized.
 * You can set the color and content of each region, as well as their HTML content.
 */
import BasePlugin from '../base-plugin.js';
import { makeDraggable } from '../draggable.js';
import EventEmitter from '../event-emitter.js';
class SingleRegion extends EventEmitter {
    constructor(params, totalDuration) {
        var _a, _b, _c, _d, _e, _f;
        super();
        this.totalDuration = totalDuration;
        this.minLength = 0;
        this.maxLength = Infinity;
        this.id = params.id || `region-${Math.random().toString(32).slice(2)}`;
        this.start = params.start;
        this.end = (_a = params.end) !== null && _a !== void 0 ? _a : params.start;
        this.drag = (_b = params.drag) !== null && _b !== void 0 ? _b : true;
        this.resize = (_c = params.resize) !== null && _c !== void 0 ? _c : true;
        this.color = (_d = params.color) !== null && _d !== void 0 ? _d : 'rgba(0, 0, 0, 0.1)';
        this.minLength = (_e = params.minLength) !== null && _e !== void 0 ? _e : this.minLength;
        this.maxLength = (_f = params.maxLength) !== null && _f !== void 0 ? _f : this.maxLength;
        this.element = this.initElement(params.content);
        this.renderPosition();
        this.initMouseEvents();
    }
    initElement(content) {
        const element = document.createElement('div');
        const isMarker = this.start === this.end;
        element.setAttribute('part', `${isMarker ? 'marker' : 'region'} ${this.id}`);
        element.setAttribute('style', `
      position: absolute;
      height: 100%;
      background-color: ${isMarker ? 'none' : this.color};
      border-left: ${isMarker ? '2px solid ' + this.color : 'none'};
      border-radius: 2px;
      box-sizing: border-box;
      transition: background-color 0.2s ease;
      cursor: ${this.drag ? 'grab' : 'default'};
      pointer-events: all;
    `);
        // Init content
        if (content) {
            if (typeof content === 'string') {
                this.content = document.createElement('div');
                this.content.style.padding = `0.2em ${isMarker ? 0.2 : 0.4}em`;
                this.content.textContent = content;
            }
            else {
                this.content = content;
            }
            this.content.setAttribute('part', 'region-content');
            element.appendChild(this.content);
        }
        // Add resize handles
        if (!isMarker) {
            const leftHandle = document.createElement('div');
            leftHandle.setAttribute('data-resize', 'left');
            leftHandle.setAttribute('style', `
        position: absolute;
        z-index: 2;
        width: 6px;
        height: 100%;
        top: 0;
        left: 0;
        border-left: 2px solid rgba(0, 0, 0, 0.5);
        border-radius: 2px 0 0 2px;
        cursor: ${this.resize ? 'ew-resize' : 'default'};
        word-break: keep-all;
      `);
            leftHandle.setAttribute('part', 'region-handle region-handle-left');
            const rightHandle = leftHandle.cloneNode();
            rightHandle.setAttribute('data-resize', 'right');
            rightHandle.style.left = '';
            rightHandle.style.right = '0';
            rightHandle.style.borderRight = rightHandle.style.borderLeft;
            rightHandle.style.borderLeft = '';
            rightHandle.style.borderRadius = '0 2px 2px 0';
            rightHandle.setAttribute('part', 'region-handle region-handle-right');
            element.appendChild(leftHandle);
            element.appendChild(rightHandle);
        }
        return element;
    }
    renderPosition() {
        const start = this.start / this.totalDuration;
        const end = (this.totalDuration - this.end) / this.totalDuration;
        this.element.style.left = `${start * 100}%`;
        this.element.style.right = `${end * 100}%`;
    }
    initMouseEvents() {
        const { element } = this;
        if (!element)
            return;
        element.addEventListener('click', (e) => this.emit('click', e));
        element.addEventListener('mouseenter', (e) => this.emit('over', e));
        element.addEventListener('mouseleave', (e) => this.emit('leave', e));
        element.addEventListener('dblclick', (e) => this.emit('dblclick', e));
        // Drag
        makeDraggable(element, (dx) => this.onMove(dx), () => this.onStartMoving(), () => this.onEndMoving());
        // Resize
        const resizeThreshold = 1;
        makeDraggable(element.querySelector('[data-resize="left"]'), (dx) => this.onResize(dx, 'start'), () => null, () => this.onEndResizing(), resizeThreshold);
        makeDraggable(element.querySelector('[data-resize="right"]'), (dx) => this.onResize(dx, 'end'), () => null, () => this.onEndResizing(), resizeThreshold);
    }
    onStartMoving() {
        if (!this.drag)
            return;
        this.element.style.cursor = 'grabbing';
    }
    onEndMoving() {
        if (!this.drag)
            return;
        this.element.style.cursor = 'grab';
        this.emit('update-end');
    }
    _onUpdate(dx, side) {
        if (!this.element.parentElement)
            return;
        const deltaSeconds = (dx / this.element.parentElement.clientWidth) * this.totalDuration;
        const newStart = !side || side === 'start' ? this.start + deltaSeconds : this.start;
        const newEnd = !side || side === 'end' ? this.end + deltaSeconds : this.end;
        const length = newEnd - newStart;
        if (newStart >= 0 &&
            newEnd <= this.totalDuration &&
            newStart <= newEnd &&
            length >= this.minLength &&
            length <= this.maxLength) {
            this.start = newStart;
            this.end = newEnd;
            this.renderPosition();
            this.emit('update');
        }
    }
    onMove(dx) {
        if (!this.drag)
            return;
        this._onUpdate(dx);
    }
    onResize(dx, side) {
        if (!this.resize)
            return;
        this._onUpdate(dx, side);
    }
    onEndResizing() {
        if (!this.resize)
            return;
        this.emit('update-end');
    }
    _setTotalDuration(totalDuration) {
        this.totalDuration = totalDuration;
        this.renderPosition();
    }
    /** Play the region from start to end */
    play() {
        this.emit('play');
    }
    /** Update the region's options */
    setOptions(options) {
        var _a, _b;
        if (options.color) {
            this.color = options.color;
            this.element.style.backgroundColor = this.color;
        }
        if (options.drag !== undefined) {
            this.drag = options.drag;
            this.element.style.cursor = this.drag ? 'grab' : 'default';
        }
        if (options.resize !== undefined) {
            this.resize = options.resize;
            this.element.querySelectorAll('[data-resize]').forEach((handle) => {
                ;
                handle.style.cursor = this.resize ? 'ew-resize' : 'default';
            });
        }
        if (options.start !== undefined || options.end !== undefined) {
            this.start = (_a = options.start) !== null && _a !== void 0 ? _a : this.start;
            this.end = (_b = options.end) !== null && _b !== void 0 ? _b : this.end;
            this.renderPosition();
        }
    }
    /** Remove the region */
    remove() {
        this.emit('remove');
        this.element.remove();
        // This violates the type but we want to clean up the DOM reference
        // w/o having to have a nullable type of the element
        this.element = null;
    }
}
class RegionsPlugin extends BasePlugin {
    /** Create an instance of RegionsPlugin */
    constructor(options) {
        super(options);
        this.regions = [];
        this.regionsContainer = this.initRegionsContainer();
    }
    /** Create an instance of RegionsPlugin */
    static create(options) {
        return new RegionsPlugin(options);
    }
    /** Called by wavesurfer, don't call manually */
    onInit() {
        if (!this.wavesurfer) {
            throw Error('WaveSurfer is not initialized');
        }
        this.wavesurfer.getWrapper().appendChild(this.regionsContainer);
        // Detect when a region is being played
        let activeRegion = null;
        this.subscriptions.push(this.wavesurfer.on('timeupdate', (currentTime) => {
            const playedRegion = this.regions.find((region) => region.start <= currentTime && region.end >= currentTime);
            if (activeRegion && activeRegion !== playedRegion) {
                this.emit('region-out', activeRegion);
                activeRegion = null;
            }
            if (playedRegion && playedRegion !== activeRegion) {
                activeRegion = playedRegion;
                this.emit('region-in', playedRegion);
            }
        }));
    }
    initRegionsContainer() {
        const div = document.createElement('div');
        div.setAttribute('style', `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 3;
      pointer-events: none;
    `);
        return div;
    }
    /** Get all created regions */
    getRegions() {
        return this.regions;
    }
    avoidOverlapping(region) {
        if (!region.content)
            return;
        // Check that the label doesn't overlap with other labels
        // If it does, push it down until it doesn't
        const div = region.content;
        const labelLeft = div.getBoundingClientRect().left;
        const labelWidth = region.element.scrollWidth;
        const overlap = this.regions
            .filter((reg) => {
            if (reg === region || !reg.content)
                return false;
            const left = reg.content.getBoundingClientRect().left;
            const width = reg.element.scrollWidth;
            return labelLeft < left + width && left < labelLeft + labelWidth;
        })
            .map((reg) => { var _a; return ((_a = reg.content) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect().height) || 0; })
            .reduce((sum, val) => sum + val, 0);
        div.style.marginTop = `${overlap}px`;
    }
    saveRegion(region) {
        this.regionsContainer.appendChild(region.element);
        this.avoidOverlapping(region);
        this.regions.push(region);
        this.emit('region-created', region);
        const regionSubscriptions = [
            region.on('update-end', () => {
                this.avoidOverlapping(region);
                this.emit('region-updated', region);
            }),
            region.on('play', () => {
                var _a, _b;
                (_a = this.wavesurfer) === null || _a === void 0 ? void 0 : _a.play();
                (_b = this.wavesurfer) === null || _b === void 0 ? void 0 : _b.setTime(region.start);
            }),
            region.on('click', (e) => {
                this.emit('region-clicked', region, e);
            }),
            region.on('dblclick', (e) => {
                this.emit('region-double-clicked', region, e);
            }),
            // Remove the region from the list when it's removed
            region.once('remove', () => {
                regionSubscriptions.forEach((unsubscribe) => unsubscribe());
                this.regions = this.regions.filter((reg) => reg !== region);
            }),
        ];
        this.subscriptions.push(...regionSubscriptions);
    }
    /** Create a region with given parameters */
    addRegion(options) {
        if (!this.wavesurfer) {
            throw Error('WaveSurfer is not initialized');
        }
        const duration = this.wavesurfer.getDuration();
        const region = new SingleRegion(options, duration);
        if (!duration) {
            this.subscriptions.push(this.wavesurfer.once('ready', (duration) => {
                region._setTotalDuration(duration);
                this.saveRegion(region);
            }));
        }
        else {
            this.saveRegion(region);
        }
        return region;
    }
    /**
     * Enable creation of regions by dragging on an empty space on the waveform.
     * Returns a function to disable the drag selection.
     */
    enableDragSelection(options) {
        var _a, _b;
        const wrapper = (_b = (_a = this.wavesurfer) === null || _a === void 0 ? void 0 : _a.getWrapper()) === null || _b === void 0 ? void 0 : _b.querySelector('div');
        if (!wrapper)
            return () => undefined;
        const initialSize = 5;
        let region = null;
        let startX = 0;
        return makeDraggable(wrapper, 
        // On drag move
        (dx, _dy, x) => {
            if (region) {
                // Update the end position of the region
                // If we're dragging to the left, we need to update the start instead
                region._onUpdate(dx, x > startX ? 'end' : 'start');
            }
        }, 
        // On drag start
        (x) => {
            startX = x;
            if (!this.wavesurfer)
                return;
            const duration = this.wavesurfer.getDuration();
            const width = this.wavesurfer.getWrapper().clientWidth;
            // Calculate the start time of the region
            const start = (x / width) * duration;
            // Give the region a small initial size
            const end = ((x + initialSize) / width) * duration;
            // Create a region but don't save it until the drag ends
            region = new SingleRegion(Object.assign(Object.assign({}, options), { start,
                end }), duration);
            // Just add it to the DOM for now
            this.regionsContainer.appendChild(region.element);
        }, 
        // On drag end
        () => {
            if (region) {
                this.saveRegion(region);
                region = null;
            }
        });
    }
    /** Remove all regions */
    clearRegions() {
        this.regions.forEach((region) => region.remove());
    }
    /** Destroy the plugin and clean up */
    destroy() {
        this.clearRegions();
        super.destroy();
    }
}
export default RegionsPlugin;
