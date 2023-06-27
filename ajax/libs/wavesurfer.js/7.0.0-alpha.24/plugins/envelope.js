import BasePlugin from '../base-plugin.js';
const defaultOptions = {
    startTime: 0,
    endTime: 0,
    fadeInEnd: 0,
    fadeOutStart: 0,
    lineWidth: 4,
    lineColor: 'rgba(0, 0, 255, 0.5)',
    dragPointSize: 10,
    dragPointFill: 'rgba(255, 255, 255, 0.8)',
    dragPointStroke: 'rgba(255, 255, 255, 0.8)',
};
class EnvelopePlugin extends BasePlugin {
    options;
    svg = null;
    audioContext = null;
    gainNode = null;
    volume = 1;
    isFadingIn = false;
    isFadingOut = false;
    constructor(options) {
        super(options);
        this.options = Object.assign({}, defaultOptions, options);
        this.options.lineColor = this.options.lineColor || defaultOptions.lineColor;
        this.options.dragPointFill = this.options.dragPointFill || defaultOptions.dragPointFill;
        this.options.dragPointStroke = this.options.dragPointStroke || defaultOptions.dragPointStroke;
        this.volume = this.options.volume ?? 1;
    }
    static create(options) {
        return new EnvelopePlugin(options);
    }
    init(params) {
        super.init(params);
        if (!this.wavesurfer) {
            throw Error('WaveSurfer is not initialized');
        }
        this.subscriptions.push(this.wavesurfer.once('decode', ({ duration }) => {
            this.options.startTime = this.options.startTime || 0;
            this.options.endTime = this.options.endTime || duration;
            this.options.fadeInEnd = this.options.fadeInEnd || this.options.startTime;
            this.options.fadeOutStart = this.options.fadeOutStart || this.options.endTime;
            this.initWebAudio();
            this.initSvg();
            this.initFadeEffects();
        }));
        let delay;
        this.subscriptions.push(this.wavesurfer.on('zoom', () => {
            if (delay)
                clearTimeout(delay);
            delay = setTimeout(() => {
                this.svg?.remove();
                this.initSvg();
            }, 100);
        }));
    }
    makeDraggable(draggable, onDrag) {
        draggable.addEventListener('mousedown', (e) => {
            let x = e.clientX;
            let y = e.clientY;
            const wasInteractive = this.wavesurfer?.options.interact || true;
            let delay;
            // Make the wavesurfer ignore clicks when we're dragging
            this.wavesurfer?.toggleInteractive(false);
            const move = (e) => {
                const dx = e.clientX - x;
                const dy = e.clientY - y;
                x = e.clientX;
                y = e.clientY;
                onDrag(dx, dy);
            };
            const up = () => {
                document.removeEventListener('mousemove', move);
                document.removeEventListener('mouseup', up);
                // Restore interactive state
                if (delay)
                    clearTimeout(delay);
                delay = setTimeout(() => {
                    this.wavesurfer?.toggleInteractive(wasInteractive);
                }, 100);
            };
            document.addEventListener('mousemove', move);
            document.addEventListener('mouseup', up);
            e.preventDefault();
            e.stopPropagation();
        });
    }
    renderPolyline() {
        if (!this.svg || !this.wrapper || !this.wavesurfer)
            return;
        const polyline = this.svg.querySelector('polyline');
        const points = polyline.points;
        const top = points.getItem(1).y;
        const width = this.wrapper.clientWidth;
        const duration = this.wavesurfer.getDuration();
        points.getItem(0).x = (this.options.startTime / duration) * width;
        points.getItem(3).x = (this.options.endTime / duration) * width;
        const line = this.svg.querySelector('line');
        line.setAttribute('x1', points.getItem(1).x.toString());
        line.setAttribute('x2', points.getItem(2).x.toString());
        line.setAttribute('y1', top.toString());
        line.setAttribute('y2', top.toString());
        const circles = this.svg.querySelectorAll('circle');
        for (let i = 0; i < circles.length; i++) {
            const circle = circles[i];
            const point = polyline.points.getItem(i + 1);
            circle.setAttribute('cx', point.x.toString());
            circle.setAttribute('cy', top.toString());
        }
    }
    initSvg() {
        if (!this.wrapper || !this.wavesurfer)
            return;
        const width = this.wrapper.clientWidth;
        const height = this.wrapper.clientHeight;
        const duration = this.wavesurfer.getDuration();
        // SVG element
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
        svg.setAttribute('preserveAspectRatio', 'none');
        svg.setAttribute('style', 'position: absolute; left: 0; top: 0; z-index: 4; pointer-events: none;');
        this.svg = svg;
        // A polyline representing the envelope
        const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
        polyline.setAttribute('points', '0,0 0,0 0,0 0,0');
        polyline.setAttribute('stroke', this.options.lineColor);
        polyline.setAttribute('stroke-width', this.options.lineWidth);
        polyline.setAttribute('fill', 'none');
        polyline.setAttribute('style', 'pointer-events: none');
        svg.appendChild(polyline);
        // Draggable top line
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('stroke', 'none');
        line.setAttribute('stroke-width', (this.options.lineWidth * 3).toString());
        line.setAttribute('style', 'cursor: ns-resize; pointer-events: all;');
        svg.appendChild(line);
        const points = polyline.points;
        const offset = this.options.dragPointSize / 2;
        const top = height - this.volume * height + offset;
        points.getItem(0).x = (this.options.startTime / duration) * width;
        points.getItem(0).y = height;
        points.getItem(1).x = (this.options.fadeInEnd / duration) * width;
        points.getItem(1).y = top;
        points.getItem(2).x = (this.options.fadeOutStart / duration) * width;
        points.getItem(2).y = top;
        points.getItem(3).x = (this.options.endTime / duration) * width;
        points.getItem(3).y = height;
        // Drag points
        const dragPoints = [1, 2];
        dragPoints.forEach(() => {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('r', (this.options.dragPointSize / 2).toString());
            circle.setAttribute('fill', this.options.dragPointFill);
            circle.setAttribute('stroke', this.options.dragPointStroke || this.options.dragPointFill);
            circle.setAttribute('stroke-width', '2');
            circle.setAttribute('style', 'cursor: ew-resize; pointer-events: all;');
            svg.appendChild(circle);
        });
        this.wrapper.appendChild(svg);
        // Initial polyline
        this.renderPolyline();
        // On top line drag
        const onDragY = (dy) => {
            const newTop = points.getItem(1).y + dy - offset;
            if (newTop < -0.5 || newTop > height)
                return;
            points.getItem(1).y = newTop + offset;
            points.getItem(2).y = newTop + offset;
            this.renderPolyline();
            const newVolume = Math.min(1, Math.max(0, (height - newTop) / height));
            this.onVolumeChange(newVolume);
            this.renderPolyline();
        };
        // On points drag
        const onDragX = (dx, dy, index) => {
            const point = polyline.points.getItem(index);
            const newX = point.x + dx;
            const newTime = (newX / width) * duration;
            if ((index === 1 && newTime > this.options.fadeOutStart) || newTime < this.options.startTime)
                return;
            if ((index === 2 && newTime < this.options.fadeInEnd) || newTime > this.options.endTime)
                return;
            point.x = newX;
            if (index === 1) {
                this.options.fadeInEnd = newTime;
                this.emit('fade-in-change', { time: newTime });
            }
            else if (index === 2) {
                this.options.fadeOutStart = newTime;
                this.emit('fade-out-change', { time: newTime });
            }
            // Also allow dragging points vertically
            if (dy > 1 || dy < -1) {
                onDragY(dy);
            }
            else {
                this.renderPolyline();
            }
        };
        // Draggable top line of the polyline
        this.makeDraggable(line, (_, dy) => onDragY(dy));
        // Make each point draggable
        const draggables = svg.querySelectorAll('circle');
        for (let i = 0; i < draggables.length; i++) {
            const index = i + 1;
            this.makeDraggable(draggables[i], (dx, dy) => onDragX(dx, dy, index));
        }
    }
    destroy() {
        this.svg?.remove();
        super.destroy();
    }
    initWebAudio() {
        const audio = this.wavesurfer?.getMediaElement();
        if (!audio)
            return null;
        this.volume = this.options.volume ?? audio.volume;
        // Create an AudioContext
        const audioContext = new window.AudioContext();
        // Create a GainNode for controlling the volume
        this.gainNode = audioContext.createGain();
        this.gainNode.gain.value = this.volume;
        // Create a MediaElementAudioSourceNode using the audio element
        const source = audioContext.createMediaElementSource(audio);
        // Connect the source to the GainNode, and the GainNode to the destination (speakers)
        source.connect(this.gainNode);
        this.gainNode.connect(audioContext.destination);
        this.audioContext = audioContext;
    }
    naturalVolume(value) {
        const minValue = 0.0001;
        const maxValue = 1;
        const exponent = 3; // Adjust the exponent to change the curve of the volume control
        const interpolatedValue = minValue + (maxValue - minValue) * Math.pow(value, exponent);
        return interpolatedValue;
    }
    onVolumeChange(volume) {
        volume = this.naturalVolume(volume);
        this.volume = volume;
        this.emit('volume-change', { volume });
        if (!this.gainNode)
            return;
        this.gainNode.gain.value = volume;
    }
    initFadeEffects() {
        if (!this.audioContext || !this.wavesurfer)
            return;
        const unsub = this.wavesurfer.on('timeupdate', ({ currentTime }) => {
            if (!this.audioContext || !this.gainNode)
                return;
            if (!this.wavesurfer?.isPlaying())
                return;
            if (this.audioContext.state === 'suspended') {
                this.audioContext.resume();
            }
            // Fade in
            if (!this.isFadingIn && currentTime >= this.options.startTime && currentTime <= this.options.fadeInEnd) {
                this.isFadingIn = true;
                // Set the initial gain (volume) to 0 (silent)
                this.gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
                // Set the target gain (volume) to 1 (full volume) over N seconds
                this.gainNode.gain.linearRampToValueAtTime(this.volume, this.audioContext.currentTime + (this.options.fadeInEnd - currentTime));
                return;
            }
            // Fade out
            if (!this.isFadingOut && currentTime >= this.options.fadeOutStart && currentTime <= this.options.endTime) {
                this.isFadingOut = true;
                // Set the target gain (volume) to 0 (silent) over N seconds
                this.gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + (this.options.endTime - currentTime));
                return;
            }
            // Reset fade in/out
            let cancelRamp = false;
            if (this.isFadingIn && (currentTime < this.options.startTime || currentTime > this.options.fadeInEnd)) {
                this.isFadingIn = false;
                cancelRamp = true;
            }
            if (this.isFadingOut && (currentTime < this.options.fadeOutStart || currentTime >= this.options.endTime)) {
                this.isFadingOut = false;
                cancelRamp = true;
            }
            if (cancelRamp) {
                this.gainNode.gain.cancelScheduledValues(this.audioContext.currentTime);
                this.gainNode.gain.value = this.volume;
            }
        });
        this.subscriptions.push(unsub);
    }
    getCurrentVolume() {
        return this.gainNode ? this.gainNode.gain.value : this.volume;
    }
    setStartTime(time) {
        this.options.startTime = time;
        this.renderPolyline();
    }
    setEndTime(time) {
        this.options.endTime = time;
        this.renderPolyline();
    }
}
export default EnvelopePlugin;
