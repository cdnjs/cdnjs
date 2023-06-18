import WaveSurfer from '../index.js';
import RegionsPlugin from './regions.js';
import TimelinePlugin from './timeline.js';
class MultiTrack {
    tracks;
    options;
    audios = [];
    wavesurfers = [];
    durations = [];
    currentTime = 0;
    maxDuration = 0;
    rendering;
    isDragging = false;
    frameRequest = null;
    static create(tracks, options) {
        return new MultiTrack(tracks, options);
    }
    constructor(tracks, options) {
        this.tracks = tracks.map((track) => ({
            ...track,
            startPosition: track.startPosition || 0,
            peaks: track.peaks || (track.url ? undefined : [new Float32Array()]),
        }));
        this.options = options;
        this.rendering = initRendering(this.tracks, this.options);
        this.initAudios().then((durations) => {
            this.durations = durations;
            const maxDuration = this.tracks.reduce((max, track, index) => {
                return Math.max(max, track.startPosition + durations[index]);
            }, 0);
            this.rendering.setMainWidth(durations, maxDuration);
            this.rendering.addClickHandler((position) => {
                if (this.isDragging)
                    return;
                this.seekTo(position * maxDuration);
            });
            this.maxDuration = maxDuration;
            this.initWavesurfers();
            this.initTimeline();
            this.rendering.containers.forEach((container, index) => {
                const drag = initDragging(container, (delta) => this.onDrag(index, delta), options.rightButtonDrag);
                this.wavesurfers[index].once('destroy', () => {
                    drag?.destroy();
                });
            });
        });
    }
    initAudios() {
        this.audios = this.tracks.map((track) => new Audio(track.url));
        return Promise.all(this.audios.map((audio) => {
            return new Promise((resolve) => {
                if (!audio.src)
                    return resolve(0);
                audio.addEventListener('canplay', () => {
                    resolve(audio.duration);
                }, { once: true });
            });
        }));
    }
    initWavesurfers() {
        const wavesurfers = this.tracks.map((track, index) => {
            // Create a wavesurfer instance
            const ws = WaveSurfer.create({
                ...track.options,
                container: this.rendering.containers[index],
                minPxPerSec: 0,
                media: this.audios[index],
                peaks: track.peaks,
                cursorColor: 'transparent',
                cursorWidth: 0,
                interactive: false,
            });
            const wsRegions = ws.registerPlugin(RegionsPlugin, {
                draggable: false,
                resizable: true,
                dragSelection: false,
            });
            ws.once('decode', () => {
                // Render start and end cues
                if (track.startCue) {
                    const region = wsRegions.add(0, track.startCue, '', 'rgba(0, 0, 0, 0.7)');
                    region.element.firstElementChild?.remove();
                }
                if (track.endCue) {
                    const region = wsRegions.add(track.endCue, track.endCue + this.durations[index], '', 'rgba(0, 0, 0, 0.7)');
                    region.element.lastChild?.remove();
                }
                // Render regions
                if (track.regions) {
                    track.regions.forEach((params) => {
                        const region = wsRegions.add(params.startTime || 0, params.endTime, params.label, params.color);
                        if (!params.startTime) {
                            region.element.firstElementChild?.remove();
                        }
                    });
                }
                // Render markers
                if (track.markers) {
                    track.markers.forEach((marker) => {
                        wsRegions.add(marker.time, marker.time, marker.label, marker.color);
                    });
                }
            });
            return ws;
        });
        this.wavesurfers = wavesurfers;
    }
    initTimeline() {
        this.wavesurfers[0].registerPlugin(TimelinePlugin, {
            duration: this.maxDuration,
            container: this.rendering.containers[0].parentElement,
        });
    }
    updatePosition(time) {
        const precisionSeconds = 0.3;
        this.currentTime = time;
        this.rendering.updateCursor(time / this.maxDuration);
        const isPaused = !this.isPlaying();
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
    onDrag(index, delta) {
        // Prevent click events when dragging
        this.isDragging = true;
        setTimeout(() => (this.isDragging = false), 600);
        const newTime = this.tracks[index].startPosition + delta * this.maxDuration;
        this.onMove(index, newTime);
    }
    onMove(index, newStartPosition) {
        const track = this.tracks[index];
        if (!track.draggable)
            return;
        const mainIndex = this.tracks.findIndex((item) => item.url && !item.draggable);
        const mainTrack = this.tracks[mainIndex];
        const minStart = (mainTrack ? mainTrack.startPosition : 0) - this.durations[index];
        const maxStart = mainTrack ? mainTrack.startPosition + this.durations[mainIndex] : this.maxDuration;
        if (newStartPosition >= minStart && newStartPosition <= maxStart) {
            track.startPosition = newStartPosition;
            this.rendering.setContainerOffsets();
            this.updatePosition(this.currentTime);
            this.options.onTrackPositionUpdate?.(track.id, track.startPosition);
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
                this.updatePosition(position);
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
    seekTo(time) {
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
}
function initRendering(tracks, options) {
    let pxPerSec = 0;
    let durations = [];
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
    const containers = tracks.map((_, index) => {
        const container = document.createElement('div');
        if (options.trackBorderColor && index > 0) {
            const borderDiv = document.createElement('div');
            borderDiv.setAttribute('style', `width: 100%; height: 2px; background-color: ${options.trackBorderColor}`);
            wrapper.appendChild(borderDiv);
        }
        if (options.trackBackground) {
            container.style.background = options.trackBackground;
        }
        wrapper.appendChild(container);
        return container;
    });
    // Set the positions of each container
    const setContainerOffsets = () => {
        containers.forEach((container, i) => {
            const offset = tracks[i].startPosition * pxPerSec;
            container.style.width = `${durations[i] * pxPerSec}px`;
            container.style.transform = `translateX(${offset}px)`;
            if (tracks[i].draggable)
                container.style.cursor = 'move';
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
            const width = pxPerSec * maxDuration;
            wrapper.style.width = `${width}px`;
            setContainerOffsets();
        },
        // Update cursor position
        updateCursor: (position) => {
            cursor.style.left = `${Math.min(100, position * 100)}%`;
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
    });
    // Drag end
    const onMouseUp = (e) => {
        if (dragStart != null) {
            e.stopPropagation();
            dragStart = null;
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
