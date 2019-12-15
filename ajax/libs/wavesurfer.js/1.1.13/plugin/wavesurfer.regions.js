(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define(["./../wavesurfer"], function (a0) {
      return (factory(a0));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("wavesurfer.js"));
  } else {
    factory(WaveSurfer);
  }
}(this, function (WaveSurfer) {

'use strict';

/* Regions manager */
WaveSurfer.Regions = {
    init: function (wavesurfer) {
        this.wavesurfer = wavesurfer;
        this.wrapper = this.wavesurfer.drawer.wrapper;

        /* Id-based hash of regions. */
        this.list = {};
    },

    /* Add a region. */
    add: function (params) {
        var region = Object.create(WaveSurfer.Region);
        region.init(params, this.wavesurfer);

        this.list[region.id] = region;

        region.on('remove', (function () {
            delete this.list[region.id];
        }).bind(this));

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
        var touchId;
        var slop = params.slop || 2;
        var pxMove = 0;

        var eventDown = function (e) {
            if (e.touches && e.touches.length > 1) { return; }
            touchId = e.targetTouches ? e.targetTouches[0].identifier : null;

            drag = true;
            start = my.wavesurfer.drawer.handleEvent(e, true);
            region = null;
        };
        this.wrapper.addEventListener('mousedown', eventDown);
        this.wrapper.addEventListener('touchstart', eventDown);
        this.on('disable-drag-selection', function() {
            my.wrapper.removeEventListener('touchstart', eventDown);
            my.wrapper.removeEventListener('mousedown', eventDown);
        });

        var eventUp = function (e) {
            if (e.touches && e.touches.length > 1) { return; }

            drag = false;
            pxMove = 0;

            if (region) {
                region.fireEvent('update-end', e);
                my.wavesurfer.fireEvent('region-update-end', region, e);
            }

            region = null;
        };
        this.wrapper.addEventListener('mouseup', eventUp);
        this.wrapper.addEventListener('touchend', eventUp);
        this.on('disable-drag-selection', function() {
            my.wrapper.removeEventListener('touchend', eventUp);
            my.wrapper.removeEventListener('mouseup', eventUp);
        });

        var eventMove = function (e) {
            if (!drag) { return; }
            if (++pxMove <= slop) { return; }

            if (e.touches && e.touches.length > 1) { return; }
            if (e.targetTouches && e.targetTouches[0].identifier != touchId) { return; }

            if (!region) {
                region = my.add(params || {});
            }

            var duration = my.wavesurfer.getDuration();
            var end = my.wavesurfer.drawer.handleEvent(e);
            region.update({
                start: Math.min(end * duration, start * duration),
                end: Math.max(end * duration, start * duration)
            });
        };
        this.wrapper.addEventListener('mousemove', eventMove);
        this.wrapper.addEventListener('touchmove', eventMove);
        this.on('disable-drag-selection', function() {
            my.wrapper.removeEventListener('touchmove', eventMove);
            my.wrapper.removeEventListener('mousemove', eventMove);
        });
    },

    disableDragSelection: function () {
        this.fireEvent('disable-drag-selection');
    }
};

WaveSurfer.util.extend(WaveSurfer.Regions, WaveSurfer.Observer);

WaveSurfer.Region = {
    /* Helper function to assign CSS styles. */
    style: WaveSurfer.Drawer.style,

    init: function (params, wavesurfer) {
        this.wavesurfer = wavesurfer;
        this.wrapper = wavesurfer.drawer.wrapper;

        this.id = params.id == null ? WaveSurfer.util.getId() : params.id;
        this.start = Number(params.start) || 0;
        this.end = params.end == null ?
            // small marker-like region
            this.start + (4 / this.wrapper.scrollWidth) * this.wavesurfer.getDuration() :
            Number(params.end);
        this.resize = params.resize === undefined ? true : Boolean(params.resize);
        this.drag = params.drag === undefined ? true : Boolean(params.drag);
        this.loop = Boolean(params.loop);
        this.color = params.color || 'rgba(0, 0, 0, 0.1)';
        this.data = params.data || {};
        this.attributes = params.attributes || {};

        this.maxLength = params.maxLength;
        this.minLength = params.minLength;

        this.bindInOut();
        this.render();
        this.wavesurfer.on('zoom', this.updateRender.bind(this));
        this.wavesurfer.fireEvent('region-created', this);

    },

    /* Update region params. */
    update: function (params) {
        if (null != params.start) {
            this.start = Number(params.start);
        }
        if (null != params.end) {
            this.end = Number(params.end);
        }
        if (null != params.loop) {
            this.loop = Boolean(params.loop);
        }
        if (null != params.color) {
            this.color = params.color;
        }
        if (null != params.data) {
            this.data = params.data;
        }
        if (null != params.resize) {
            this.resize = Boolean(params.resize);
        }
        if (null != params.drag) {
            this.drag = Boolean(params.drag);
        }
        if (null != params.maxLength) {
            this.maxLength = Number(params.maxLength);
        }
        if (null != params.minLength) {
            this.minLength = Number(params.minLength);
        }
        if (null != params.attributes) {
            this.attributes = params.attributes;
        }

        this.updateRender();
        this.fireEvent('update');
        this.wavesurfer.fireEvent('region-updated', this);
    },

    /* Remove a single region. */
    remove: function () {
        if (this.element) {
            this.wrapper.removeChild(this.element);
            this.element = null;
            this.fireEvent('remove');
            this.wavesurfer.un('zoom', this.updateRender.bind(this));
            this.wavesurfer.fireEvent('region-removed', this);
        }
    },

    /* Play the audio region. */
    play: function () {
        this.wavesurfer.play(this.start, this.end);
        this.fireEvent('play');
        this.wavesurfer.fireEvent('region-play', this);
    },

    /* Play the region in loop. */
    playLoop: function () {
        this.play();
        this.once('out', this.playLoop.bind(this));
    },

    /* Render a region as a DOM element. */
    render: function () {
        var regionEl = document.createElement('region');
        regionEl.className = 'wavesurfer-region';
        regionEl.title = this.formatTime(this.start, this.end);
        regionEl.setAttribute('data-id', this.id);

        for (var attrname in this.attributes) {
            regionEl.setAttribute('data-region-' + attrname, this.attributes[attrname]);
        }

        var width = this.wrapper.scrollWidth;
        this.style(regionEl, {
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
                width: '1%',
                maxWidth: '4px',
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

    formatTime: function (start, end) {
        return (start == end ? [ start ] : [ start, end ]).map(function (time) {
            return [
                Math.floor((time % 3600) / 60), // minutes
                ('00' + Math.floor(time % 60)).slice(-2) // seconds
            ].join(':');
        }).join('-');
    },

    /* Update element's position, width, color. */
    updateRender: function (pxPerSec) {
        var dur = this.wavesurfer.getDuration();
        var width;
        if (pxPerSec) {
            width = Math.round(this.wavesurfer.getDuration() * pxPerSec);
        }
        else {
            width = this.wrapper.scrollWidth;
        }

        if (this.start < 0) {
          this.start = 0;
          this.end = this.end - this.start;
        }
        if (this.end > dur) {
          this.end = dur;
          this.start = dur - (this.end - this.start);
        }

        if (this.minLength != null) {
            this.end = Math.max(this.start + this.minLength, this.end);
        }

        if (this.maxLength != null) {
            this.end = Math.min(this.start + this.maxLength, this.end);
        }

        if (this.element != null) {
            this.style(this.element, {
                left: ~~(this.start / dur * width) + 'px',
                width: ~~((this.end - this.start) / dur * width) + 'px',
                backgroundColor: this.color,
                cursor: this.drag ? 'move' : 'default'
            });

            for (var attrname in this.attributes) {
                this.element.setAttribute('data-region-' + attrname, this.attributes[attrname]);
            }

            this.element.title = this.formatTime(this.start, this.end);
        }
    },

    /* Bind audio events. */
    bindInOut: function () {
        var my = this;

        my.firedIn = false;
        my.firedOut = false;

        var onProcess = function (time) {
            if (!my.firedOut && my.firedIn && (my.start >= Math.round(time * 100) / 100 || my.end <= Math.round(time * 100) / 100)) {
                my.firedOut = true;
                my.firedIn = false;
                my.fireEvent('out');
                my.wavesurfer.fireEvent('region-out', my);
            }
            if (!my.firedIn && my.start <= time && my.end > time) {
                my.firedIn = true;
                my.firedOut = false;
                my.fireEvent('in');
                my.wavesurfer.fireEvent('region-in', my);
            }
        };

        this.wavesurfer.backend.on('audioprocess', onProcess);

        this.on('remove', function () {
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

        this.element.addEventListener('mouseenter', function (e) {
            my.fireEvent('mouseenter', e);
            my.wavesurfer.fireEvent('region-mouseenter', my, e);
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
            var touchId;

            var onDown = function (e) {
                if (e.touches && e.touches.length > 1) { return; }
                touchId = e.targetTouches ? e.targetTouches[0].identifier : null;

                e.stopPropagation();
                startTime = my.wavesurfer.drawer.handleEvent(e, true) * duration;

                if (e.target.tagName.toLowerCase() == 'handle') {
                    if (e.target.classList.contains('wavesurfer-handle-start')) {
                        resize = 'start';
                    } else {
                        resize = 'end';
                    }
                } else {
                    drag = true;
                    resize = false;
                }
            };
            var onUp = function (e) {
                if (e.touches && e.touches.length > 1) { return; }

                if (drag || resize) {
                    drag = false;
                    resize = false;

                    my.fireEvent('update-end', e);
                    my.wavesurfer.fireEvent('region-update-end', my, e);
                }
            };
            var onMove = function (e) {
                if (e.touches && e.touches.length > 1) { return; }
                if (e.targetTouches && e.targetTouches[0].identifier != touchId) { return; }

                if (drag || resize) {
                    var time = my.wavesurfer.drawer.handleEvent(e) * duration;
                    var delta = time - startTime;
                    startTime = time;

                    // Drag
                    if (my.drag && drag) {
                        my.onDrag(delta);
                    }

                    // Resize
                    if (my.resize && resize) {
                        my.onResize(delta, resize);
                    }
                }
            };

            my.element.addEventListener('mousedown', onDown);
            my.element.addEventListener('touchstart', onDown);

            my.wrapper.addEventListener('mousemove', onMove);
            my.wrapper.addEventListener('touchmove', onMove);

            document.body.addEventListener('mouseup', onUp);
            document.body.addEventListener('touchend', onUp);

            my.on('remove', function () {
                document.body.removeEventListener('mouseup', onUp);
                document.body.removeEventListener('touchend', onUp);
                my.wrapper.removeEventListener('mousemove', onMove);
                my.wrapper.removeEventListener('touchmove', onMove);
            });

            my.wavesurfer.on('destroy', function () {
                document.body.removeEventListener('mouseup', onUp);
                document.body.removeEventListener('touchend', onUp);
            });
        }());
    },

    onDrag: function (delta) {
        var maxEnd = this.wavesurfer.getDuration();
        if ((this.end + delta) > maxEnd || (this.start + delta) < 0) {
            return;
        }

        this.update({
            start: this.start + delta,
            end: this.end + delta
        });
    },

    onResize: function (delta, direction) {
        if (direction == 'start') {
            this.update({
                start: Math.min(this.start + delta, this.end),
                end: Math.max(this.start + delta, this.end)
            });
        } else {
            this.update({
                start: Math.min(this.end + delta, this.start),
                end: Math.max(this.end + delta, this.start)
            });
        }
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

WaveSurfer.disableDragSelection = function () {
    this.regions.disableDragSelection();
};


}));
