'use strict';

/* Regions manager */
WaveSurfer.Regions = {
    init: function (wavesurfer) {
        this.wavesurfer = wavesurfer;
        this.wrapper = this.wavesurfer.drawer.wrapper;

        /* Id-based hash of regions. */
        this.list = {};
    },

    /* Remove a region. */
    add: function (params) {
        var my = this;
        var region = Object.create(WaveSurfer.Region);
        region.init(params, this.wavesurfer);
        this.list[region.id] = region;

        region.on('remove', function () {
            delete my.list[region.id];
        });

        return region;
    },

    /* Remove all regions. */
    clear: function () {
        Object.keys(this.list).forEach(function (id) {
            this.list[id].remove();
        }, this);
    },

    enableDragSelection: function (params) {
        var my = this;
        var drag;
        var start;
        var region;

        this.wrapper.addEventListener('mousedown', function (e) {
            drag = true;
            start = my.wavesurfer.drawer.handleEvent(e);
            region = null;
        });
        this.wrapper.addEventListener('mouseup', function () {
            drag = false;
            region = null;
        });
        this.wrapper.addEventListener('mousemove', function (e) {
            if (!drag) { return; }

            if (!region) {
                region = my.add(params || {});
            }

            var duration = my.wavesurfer.getDuration();
            var end = my.wavesurfer.drawer.handleEvent(e);
            region.update({
                start: Math.min(end * duration, start * duration),
                end: Math.max(end * duration, start * duration)
            });
        });
    }
};

WaveSurfer.Region = {
    /* Helper function to assign CSS styles. */
    style: WaveSurfer.Drawer.style,

    init: function (params, wavesurfer) {
        this.wavesurfer = wavesurfer;
        this.wrapper = wavesurfer.drawer.wrapper;

        this.id = WaveSurfer.util.getId();
        this.start = params.start || 0;
        this.end = params.end == null ?
            // small marker-like region
            params.start + (4 / this.wrapper.scrollWidth) * this.wavesurfer.getDuration() :
            params.end;
        this.resize = params.resize === undefined ? true : !!params.resize;
        this.drag = params.drag === undefined ? true : !!params.drag;
        this.loop = !!params.loop;
        this.color = params.color || 'rgba(0, 0, 0, 0.1)';

        this.bindInOut();
        this.render();

        this.wavesurfer.fireEvent('region-created', this);
    },

    /* Update region params. */
    update: function (params) {
        if (null != params.start) {
            this.start = params.start;
        }
        if (null != params.end) {
            this.end = params.end;
        }
        if (null != params.loop) {
            this.color = params.loop;
        }
        if (null != params.color) {
            this.color = params.color;
        }
        this.updateRender();
        this.fireEvent('update');
        this.wavesurfer.fireEvent('region-updated', this);
    },

    /* Remove a single region. */
    remove: function (region) {
        if (this.element) {
            this.wrapper.removeChild(this.element);
            this.element = null;
            this.fireEvent('remove');
            this.wavesurfer.fireEvent('region-removed', this);
        }
    },

    /* Play the audio region. */
    play: function () {
        this.wavesurfer.play(this.start, this.end + 0.01);
    },

    /* Render a region as a DOM element. */
    render: function () {
        var regionEl = document.createElement('region');
        regionEl.className = 'wavesurfer-region';

        var width = this.wrapper.scrollWidth;
        this.style(regionEl, {
            cursor: 'move',
            position: 'absolute',
            zIndex: 2,
            height: '100%',
            top: '0px'
        });

        /* Resize handles */
        if (this.resize) {
            var handleLeft = regionEl.appendChild(document.createElement('handle'));
            var handleRight = regionEl.appendChild(document.createElement('handle'));
            handleLeft.className = 'wavesurfer-handle wavesurfer-handle-start';
            handleRight.className = 'wavesurfer-handle wavesurfer-handle-end';
            var css = {
                cursor: 'col-resize',
                position: 'absolute',
                left: '0px',
                top: '0px',
                width: '4px',
                height: '100%'
            };
            this.style(handleLeft, css);
            this.style(handleRight, css);
            this.style(handleRight, {
                left: '100%'
            });
        }

        this.element = this.wrapper.appendChild(regionEl);
        this.updateRender();
        this.bindEvents(regionEl);
    },

    /* Update element's position, width, color. */
    updateRender: function () {
        var dur = this.wavesurfer.getDuration();
        var width = this.wrapper.scrollWidth;
        this.style(this.element, {
            left: ~~(this.start / dur * width) + 'px',
            width: ~~((this.end / dur - this.start / dur) * width) + 'px',
            backgroundColor: this.color
        });
    },

    /* Bind audio events. */
    bindInOut: function () {
        var my = this;

        var onPlay = function () {
            my.firedIn = false;
            my.firedOut = false;
        };

        var onProcess = function (time) {
            if (!my.firedIn && my.start <= time && my.end >= time) {
                my.firedIn = true;
                my.fireEvent('in');
                my.wavesurfer.fireEvent('region-in', my);
            }
            if (!my.firedOut && my.firedIn && my.end < time) {
                my.firedOut = true;
                my.fireEvent('out');
                my.wavesurfer.fireEvent('region-out', my);
            }
        };

        this.wavesurfer.backend.on('play', onPlay);
        this.wavesurfer.backend.on('audioprocess', onProcess);

        this.on('remove', function () {
            my.wavesurfer.backend.un('play', onPlay);
            my.wavesurfer.backend.un('audioprocess', onProcess);
        });

        /* Loop playback. */
        this.on('out', function () {
            if (my.loop) {
                my.wavesurfer.play(my.start);
            }
        });
    },

    /* Bind DOM events. */
    bindEvents: function () {
        var my = this;

        this.element.addEventListener('mouseover', function (e) {
            my.fireEvent('mouseover', e);
            my.wavesurfer.fireEvent('region-mouseover', my, e);
        });

        this.element.addEventListener('mouseleave', function (e) {
            my.fireEvent('mouseleave', e);
            my.wavesurfer.fireEvent('region-mouseleave', my, e);
        });

        this.element.addEventListener('click', function (e) {
            e.preventDefault();
            my.fireEvent('click', e);
            my.wavesurfer.fireEvent('region-click', my, e);
        });

        this.element.addEventListener('dblclick', function (e) {
            e.stopPropagation();
            e.preventDefault();
            my.fireEvent('dblclick', e);
            my.wavesurfer.fireEvent('region-dblclick', my, e);
        });

        /* Drag or resize on mousemove. */
        (this.drag || this.resize) && (function () {
            var duration = my.wavesurfer.getDuration();
            var drag;
            var resize;
            var startTime;

            var onDown = function (e) {
                e.stopPropagation();
                startTime = my.wavesurfer.drawer.handleEvent(e) * duration;

                if (e.target.tagName.toLowerCase() == 'handle') {
                    if (e.target.classList.contains('wavesurfer-handle-start')) {
                        resize = 'start';
                    } else {
                        resize = 'end';
                    }
                } else {
                    drag = true;
                }
            };
            var onUp = function (e) {
                if (drag || resize) {
                    drag = false;
                    resize = false;
                    e.stopPropagation();
                    e.preventDefault();
                }
            };
            var onMove = function (e) {
                if (drag || resize) {
                    var time = my.wavesurfer.drawer.handleEvent(e) * duration;
                    var delta = time - startTime;
                    startTime = time;

                    // Drag
                    if (my.drag && drag) {
                        my.update({
                            start: my.start + delta,
                            end: my.end + delta
                        });
                    }

                    // Resize
                    if (my.resize && resize) {
                        if (resize == 'start') {
                            my.update({
                                start: Math.min(my.start + delta, my.end),
                                end: Math.max(my.start + delta, my.end)
                            });
                        } else {
                            my.update({
                                start: Math.min(my.end + delta, my.start),
                                end: Math.max(my.end + delta, my.start)
                            });
                        }
                    }
                }
            };

            my.element.addEventListener('mousedown', onDown);
            my.wrapper.addEventListener('mouseup', onUp);
            my.wrapper.addEventListener('mousemove', onMove);

            my.on('remove', function () {
                my.wrapper.removeEventListener('mouseup', onUp);
                my.wrapper.removeEventListener('mousemove', onMove);
            });
        }());
    }
};

WaveSurfer.util.extend(WaveSurfer.Region, WaveSurfer.Observer);


/* Augment WaveSurfer with region methods. */
WaveSurfer.initRegions = function () {
    if (!this.regions) {
        this.regions = Object.create(WaveSurfer.Regions);
        this.regions.init(this);
    }
};

WaveSurfer.addRegion = function (options) {
    this.initRegions();
    return this.regions.add(options);
};

WaveSurfer.clearRegions = function () {
    this.regions && this.regions.clear();
};

WaveSurfer.enableDragSelection = function (options) {
    this.initRegions();
    this.regions.enableDragSelection(options);
};
