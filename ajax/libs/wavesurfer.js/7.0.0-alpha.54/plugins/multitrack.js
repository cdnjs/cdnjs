/**
 * Multitrack isn't a plugin, but rather a helper class for creating a multitrack audio player.
 * Individual tracks are synced and played together. They can be dragged to set their start position.
 */
import WaveSurfer from '../wavesurfer.js';
import RegionsPlugin from './regions.js';
import TimelinePlugin from './timeline.js';
import EnvelopePlugin from './envelope.js';
import EventEmitter from '../event-emitter.js';
class MultiTrack extends EventEmitter {
    static create(tracks, options) {
        return new MultiTrack(tracks, options);
    }
    constructor(tracks, options) {
        super();
        this.audios = [];
        this.wavesurfers = [];
        this.durations = [];
        this.currentTime = 0;
        this.maxDuration = 0;
        this.isDragging = false;
        this.frameRequest = null;
        this.timer = null;
        this.subscriptions = [];
        this.timeline = null;
        this.tracks = tracks.map((track) => ({
            ...track,
            startPosition: track.startPosition || 0,
            peaks: track.peaks || (track.url ? undefined : [new Float32Array()]),
        }));
        this.options = options;
        this.rendering = initRendering(this.tracks, this.options);
        this.rendering.addDropHandler((trackId) => {
            this.emit('drop', { id: trackId });
        });
        this.initAllAudios().then((durations) => {
            this.initDurations(durations);
            this.initAllWavesurfers();
            this.rendering.containers.forEach((container, index) => {
                const drag = initDragging(container, (delta) => this.onDrag(index, delta), options.rightButtonDrag);
                this.wavesurfers[index].once('destroy', () => drag?.destroy());
            });
            this.rendering.addClickHandler((position) => {
                if (this.isDragging)
                    return;
                this.seekTo(position);
            });
            this.emit('canplay');
        });
    }
    initDurations(durations) {
        this.durations = durations;
        this.maxDuration = this.tracks.reduce((max, track, index) => {
            return Math.max(max, track.startPosition + durations[index]);
        }, 0);
        this.rendering.setMainWidth(durations, this.maxDuration);
    }
    initAudio(track) {
        const audio = new Audio(track.url);
        return new Promise((resolve) => {
            if (!audio.src)
                return resolve(audio);
            audio.addEventListener('loadedmetadata', () => resolve(audio), { once: true });
        });
    }
    async initAllAudios() {
        this.audios = await Promise.all(this.tracks.map((track) => this.initAudio(track)));
        return this.audios.map((a) => (a.src ? a.duration : 0));
    }
    initWavesurfer(track, index) {
        const container = this.rendering.containers[index];
        // Create a wavesurfer instance
        const ws = WaveSurfer.create({
            ...track.options,
            container,
            minPxPerSec: 0,
            media: this.audios[index],
            peaks: track.peaks,
            cursorColor: 'transparent',
            cursorWidth: 0,
            interact: false,
            hideScrollbar: true,
        });
        // Regions and markers
        const wsRegions = RegionsPlugin.create();
        ws.registerPlugin(wsRegions);
        this.subscriptions.push(ws.once('decode', () => {
            // Start and end cues
            if (track.startCue != null || track.endCue != null) {
                const { startCue = 0, endCue = this.durations[index] } = track;
                const startCueRegion = wsRegions.addRegion({
                    start: 0,
                    end: startCue,
                    color: 'rgba(0, 0, 0, 0.7)',
                    drag: false,
                });
                const endCueRegion = wsRegions.addRegion({
                    start: endCue,
                    end: endCue + this.durations[index],
                    color: 'rgba(0, 0, 0, 0.7)',
                    drag: false,
                });
                // Allow resizing only from one side
                startCueRegion.element.firstElementChild?.remove();
                endCueRegion.element.lastChild?.remove();
                // Prevent clicks when dragging
                // Update the start and end cues on resize
                this.subscriptions.push(startCueRegion.on('update-end', () => {
                    track.startCue = startCueRegion.end;
                    this.emit('start-cue-change', { id: track.id, startCue: track.startCue });
                }), endCueRegion.on('update-end', () => {
                    track.endCue = endCueRegion.start;
                    this.emit('end-cue-change', { id: track.id, endCue: track.endCue });
                }));
            }
            // Intro
            if (track.intro) {
                const introRegion = wsRegions.addRegion({
                    start: 0,
                    end: track.intro.endTime,
                    content: track.intro.label,
                    color: this.options.trackBackground,
                    drag: false,
                });
                introRegion.element.querySelector('[data-resize="left"]')?.remove();
                introRegion.element.parentElement.style.mixBlendMode = 'plus-lighter';
                if (track.intro.color) {
                    ;
                    introRegion.element.querySelector('[data-resize="right"]').style.borderColor =
                        track.intro.color;
                }
                this.subscriptions.push(introRegion.on('update-end', () => {
                    this.emit('intro-end-change', { id: track.id, endTime: introRegion.end });
                }));
            }
            // Render markers
            if (track.markers) {
                track.markers.forEach((marker) => {
                    wsRegions.addRegion({
                        start: marker.time,
                        content: marker.label,
                        color: marker.color,
                        resize: false,
                    });
                });
            }
        }));
        // Envelope
        const envelope = ws.registerPlugin(EnvelopePlugin.create({
            ...this.options.envelopeOptions,
            fadeInStart: track.startCue,
            fadeInEnd: track.fadeInEnd,
            fadeOutStart: track.fadeOutStart,
            fadeOutEnd: track.endCue,
            volume: track.volume,
        }));
        this.subscriptions.push(envelope.on('volume-change', (volume) => {
            this.setIsDragging();
            this.emit('volume-change', { id: track.id, volume });
        }), envelope.on('fade-in-change', (time) => {
            this.setIsDragging();
            this.emit('fade-in-change', { id: track.id, fadeInEnd: time });
        }), envelope.on('fade-out-change', (time) => {
            this.setIsDragging();
            this.emit('fade-out-change', { id: track.id, fadeOutStart: time });
        }), this.on('start-cue-change', ({ id, startCue }) => {
            if (id === track.id) {
                envelope.setStartTime(startCue);
            }
        }), this.on('end-cue-change', ({ id, endCue }) => {
            if (id === track.id) {
                envelope.setEndTime(endCue);
            }
        }));
        return ws;
    }
    initAllWavesurfers() {
        const wavesurfers = this.tracks.map((track, index) => {
            return this.initWavesurfer(track, index);
        });
        this.wavesurfers = wavesurfers;
        this.initTimeline();
    }
    initTimeline() {
        if (this.timeline)
            this.timeline.destroy();
        this.timeline = this.wavesurfers[0].registerPlugin(TimelinePlugin.create({
            duration: this.maxDuration,
            container: this.rendering.containers[0].parentElement,
        }));
    }
    updatePosition(time, autoCenter = false) {
        const precisionSeconds = 0.3;
        const isPaused = !this.isPlaying();
        if (time !== this.currentTime) {
            this.currentTime = time;
            this.rendering.updateCursor(time / this.maxDuration, autoCenter);
        }
        // Update the current time of each audio
        this.tracks.forEach((track, index) => {
            const audio = this.audios[index];
            const duration = this.durations[index];
            const newTime = time - track.startPosition;
            if (Math.abs(audio.currentTime - newTime) > precisionSeconds) {
                audio.currentTime = newTime;
            }
            // If the position is out of the track bounds, pause it
            if (isPaused || newTime < 0 || newTime > duration) {
                !audio.paused && audio.pause();
            }
            else if (!isPaused) {
                // If the position is in the track bounds, play it
                audio.paused && audio.play();
            }
            // Unmute if cue is reached
            const newVolume = newTime >= (track.startCue || 0) && newTime < (track.endCue || Infinity) ? 1 : 0;
            if (newVolume !== audio.volume)
                audio.volume = newVolume;
        });
    }
    setIsDragging() {
        // Prevent click events when dragging
        this.isDragging = true;
        if (this.timer)
            clearTimeout(this.timer);
        this.timer = setTimeout(() => (this.isDragging = false), 300);
    }
    onDrag(index, delta) {
        this.setIsDragging();
        const track = this.tracks[index];
        if (!track.draggable)
            return;
        const newStartPosition = track.startPosition + delta * this.maxDuration;
        const mainIndex = this.tracks.findIndex((item) => item.url && !item.draggable);
        const mainTrack = this.tracks[mainIndex];
        const minStart = (mainTrack ? mainTrack.startPosition : 0) - this.durations[index];
        const maxStart = mainTrack ? mainTrack.startPosition + this.durations[mainIndex] : this.maxDuration;
        if (newStartPosition >= minStart && newStartPosition <= maxStart) {
            track.startPosition = newStartPosition;
            this.initDurations(this.durations);
            this.rendering.setContainerOffsets();
            this.updatePosition(this.currentTime);
            this.emit('start-position-change', { id: track.id, startPosition: newStartPosition });
        }
    }
    findCurrentTracks() {
        // Find the audios at the current time
        const indexes = [];
        this.tracks.forEach((track, index) => {
            if (track.url &&
                this.currentTime >= track.startPosition &&
                this.currentTime < track.startPosition + this.durations[index]) {
                indexes.push(index);
            }
        });
        if (indexes.length === 0) {
            const minStartTime = Math.min(...this.tracks.filter((t) => t.url).map((track) => track.startPosition));
            indexes.push(this.tracks.findIndex((track) => track.startPosition === minStartTime));
        }
        return indexes;
    }
    startSync() {
        const onFrame = () => {
            const position = this.audios.reduce((pos, audio, index) => {
                if (!audio.paused) {
                    pos = Math.max(pos, audio.currentTime + this.tracks[index].startPosition);
                }
                return pos;
            }, this.currentTime);
            if (position > this.currentTime) {
                this.updatePosition(position, true);
            }
            this.frameRequest = requestAnimationFrame(onFrame);
        };
        onFrame();
    }
    play() {
        this.startSync();
        const indexes = this.findCurrentTracks();
        indexes.forEach((index) => {
            this.audios[index]?.play();
        });
    }
    pause() {
        this.audios.forEach((audio) => audio.pause());
    }
    isPlaying() {
        return this.audios.some((audio) => !audio.paused);
    }
    getCurrentTime() {
        return this.currentTime;
    }
    /** Position percentage from 0 to 1 */
    seekTo(position) {
        const wasPlaying = this.isPlaying();
        this.updatePosition(position * this.maxDuration);
        if (wasPlaying)
            this.play();
    }
    /** Set time in seconds */
    setTime(time) {
        const wasPlaying = this.isPlaying();
        this.updatePosition(time);
        if (wasPlaying)
            this.play();
    }
    zoom(pxPerSec) {
        this.options.minPxPerSec = pxPerSec;
        this.wavesurfers.forEach((ws, index) => this.tracks[index].url && ws.zoom(pxPerSec));
        this.rendering.setMainWidth(this.durations, this.maxDuration);
        this.rendering.setContainerOffsets();
    }
    addTrack(track) {
        const index = this.tracks.findIndex((t) => t.id === track.id);
        if (index !== -1) {
            this.tracks[index] = track;
            this.initAudio(track).then((audio) => {
                this.audios[index] = audio;
                this.durations[index] = audio.duration;
                this.initDurations(this.durations);
                const container = this.rendering.containers[index];
                container.innerHTML = '';
                this.wavesurfers[index].destroy();
                this.wavesurfers[index] = this.initWavesurfer(track, index);
                const drag = initDragging(container, (delta) => this.onDrag(index, delta), this.options.rightButtonDrag);
                this.wavesurfers[index].once('destroy', () => drag?.destroy());
                this.initTimeline();
                this.emit('canplay');
            });
        }
    }
    destroy() {
        if (this.frameRequest)
            cancelAnimationFrame(this.frameRequest);
        this.rendering.destroy();
        this.audios.forEach((audio) => {
            audio.pause();
            audio.src = '';
        });
        this.wavesurfers.forEach((ws) => {
            ws.destroy();
        });
    }
    // See https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/setSinkId
    setSinkId(sinkId) {
        return Promise.all(this.wavesurfers.map((ws) => ws.setSinkId(sinkId)));
    }
}
function initRendering(tracks, options) {
    let pxPerSec = 0;
    let durations = [];
    let mainWidth = 0;
    // Create a common container for all tracks
    const scroll = document.createElement('div');
    scroll.setAttribute('style', 'width: 100%; overflow-x: scroll; overflow-y: hidden; user-select: none;');
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    scroll.appendChild(wrapper);
    options.container.appendChild(scroll);
    // Create a common cursor
    const cursor = document.createElement('div');
    cursor.setAttribute('style', 'height: 100%; position: absolute; z-index: 10; top: 0; left: 0');
    cursor.style.backgroundColor = options.cursorColor || '#000';
    cursor.style.width = `${options.cursorWidth ?? 1}px`;
    wrapper.appendChild(cursor);
    const { clientWidth } = wrapper;
    // Create containers for each track
    const containers = tracks.map((track, index) => {
        const container = document.createElement('div');
        container.style.position = 'relative';
        if (options.trackBorderColor && index > 0) {
            const borderDiv = document.createElement('div');
            borderDiv.setAttribute('style', `width: 100%; height: 2px; background-color: ${options.trackBorderColor}`);
            wrapper.appendChild(borderDiv);
        }
        if (options.trackBackground && track.url) {
            container.style.background = options.trackBackground;
        }
        // No audio on this track, so make it droppable
        if (!track.url) {
            const dropArea = document.createElement('div');
            dropArea.setAttribute('style', `position: absolute; z-index: 10; left: 10px; top: 10px; right: 10px; bottom: 10px; border: 2px dashed ${options.trackBorderColor};`);
            dropArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropArea.style.background = options.trackBackground || '';
            });
            dropArea.addEventListener('dragleave', (e) => {
                e.preventDefault();
                dropArea.style.background = '';
            });
            dropArea.addEventListener('drop', (e) => {
                e.preventDefault();
                dropArea.style.background = '';
            });
            container.appendChild(dropArea);
        }
        wrapper.appendChild(container);
        return container;
    });
    // Set the positions of each container
    const setContainerOffsets = () => {
        containers.forEach((container, i) => {
            const offset = tracks[i].startPosition * pxPerSec;
            if (durations[i]) {
                container.style.width = `${durations[i] * pxPerSec}px`;
            }
            container.style.transform = `translateX(${offset}px)`;
        });
    };
    return {
        containers,
        // Set the start offset
        setContainerOffsets,
        // Set the container width
        setMainWidth: (trackDurations, maxDuration) => {
            durations = trackDurations;
            pxPerSec = Math.max(options.minPxPerSec || 0, clientWidth / maxDuration);
            mainWidth = pxPerSec * maxDuration;
            wrapper.style.width = `${mainWidth}px`;
            setContainerOffsets();
        },
        // Update cursor position
        updateCursor: (position, autoCenter) => {
            cursor.style.left = `${Math.min(100, position * 100)}%`;
            // Update scroll
            const { clientWidth, scrollLeft } = scroll;
            const center = clientWidth / 2;
            const minScroll = autoCenter ? center : clientWidth;
            const pos = position * mainWidth;
            if (pos > scrollLeft + minScroll || pos < scrollLeft) {
                scroll.scrollLeft = pos - center;
            }
        },
        // Click to seek
        addClickHandler: (onClick) => {
            wrapper.addEventListener('click', (e) => {
                const rect = wrapper.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const position = x / wrapper.offsetWidth;
                onClick(position);
            });
        },
        // Destroy the container
        destroy: () => {
            scroll.remove();
        },
        // Do something on drop
        addDropHandler: (onDrop) => {
            tracks.forEach((track, index) => {
                if (!track.url) {
                    const droppable = containers[index].querySelector('div');
                    droppable?.addEventListener('drop', (e) => {
                        e.preventDefault();
                        onDrop(track.id);
                    });
                }
            });
        },
    };
}
function initDragging(container, onDrag, rightButtonDrag = false) {
    const wrapper = container.parentElement;
    if (!wrapper)
        return;
    // Dragging tracks to set position
    let dragStart = null;
    container.addEventListener('contextmenu', (e) => {
        rightButtonDrag && e.preventDefault();
    });
    // Drag start
    container.addEventListener('mousedown', (e) => {
        if (rightButtonDrag && e.button !== 2)
            return;
        const rect = wrapper.getBoundingClientRect();
        dragStart = e.clientX - rect.left;
        container.style.cursor = 'grabbing';
    });
    // Drag end
    const onMouseUp = (e) => {
        if (dragStart != null) {
            e.stopPropagation();
            dragStart = null;
            container.style.cursor = '';
        }
    };
    // Drag move
    const onMouseMove = (e) => {
        if (dragStart == null)
            return;
        const rect = wrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const diff = x - dragStart;
        if (diff > 1 || diff < -1) {
            dragStart = x;
            onDrag(diff / wrapper.offsetWidth);
        }
    };
    document.body.addEventListener('mouseup', onMouseUp);
    document.body.addEventListener('mousemove', onMouseMove);
    return {
        destroy: () => {
            document.body.removeEventListener('mouseup', onMouseUp);
            document.body.removeEventListener('mousemove', onMouseMove);
        },
    };
}
export default MultiTrack;
