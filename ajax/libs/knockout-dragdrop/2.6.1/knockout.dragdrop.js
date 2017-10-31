/*global ko*/
// Github repository: https://github.com/One-com/knockout-dragdrop
// License: standard 3-clause BSD license https://raw.github.com/One-com/knockout-dragdrop/master/LICENSE

(function (factory) {
    if (typeof define === "function" && define.amd) {
        // AMD anonymous module with hard-coded dependency on "knockout"
        define(["knockout"], factory);
    } else if (typeof module === 'object' && module.exports) {
        // CommonJS or Node: hard-coded dependency on "knockout"
        module.exports = factory(require("knockout"));
    } else {
        // <script> tag: use the global `ko`
        factory(ko);
    }
})(function (ko) {
    var dropZones = {};
    var eventZones = {};

    var forEach = ko.utils.arrayForEach;
    var first = ko.utils.arrayFirst;
    var filter = ko.utils.arrayFilter;

    var touchSupport = 'ontouchstart' in document.documentElement;

    var dragging = false;

    function extend(out) {
        out = out || {};

        for (var i = 1; i < arguments.length; i++) {
            if (!arguments[i]) {
                continue;
            }

            for (var key in arguments[i]) {
                if (arguments[i].hasOwnProperty(key)) {
                    out[key] = arguments[i][key];
                }
            }
        }

        return out;
    }

    function toggleClass(element, className, addOrRemove) {
        var classes = element.className.split(' ');
        var existingIndex = classes.indexOf(className);
        if (existingIndex >= 0 && !addOrRemove) {
            classes.splice(existingIndex, 1);
        }
        if (existingIndex < 0 && addOrRemove) {
            classes.push(className);
        }
        element.className = classes.join(' ');
    }

    function matches(element, selector) {
        if (!element.tagName) {
            return null;
        }
        var docEl = document.documentElement;
        var match = docEl.matches || docEl.matchesSelector || docEl.webkitMatchesSelector || docEl.mozMatchesSelector || docEl.msMatchesSelector || docEl.oMatchesSelector;
        return match.call(element, selector);
    }

    function getClosest(element, selector) {
        do {
            if (matches(element, selector)) {
                return element;
            }
            element = element.parentNode;
        } while (element);
        return null;
    }

    function Zone(args) {
        this.init(args);
    }

    function getEventCoord(event, axis) {
        if (event.type.indexOf('touch') >= 0) {
            // if multi touch this will be the first touch
            return event.changedTouches[0][axis];
        } else {
            return event[axis];
        }
    }

    Zone.prototype.init = function (args) {
        this.element = args.element;
        this.data = args.data;
        this.dragEnter = args.dragEnter;
        this.dragOver = args.dragOver;
        this.dragLeave = args.dragLeave;
        this.active = false;
        this.inside = false;
        this.dirty = false;
    };

    Zone.prototype.refreshDomInfo = function () {
        this.hidden = this.element.style.display === 'none';
        if (!this.hidden) {
            var rect = this.element.getBoundingClientRect();
            this.top = rect.top + window.pageYOffset - document.documentElement.clientTop;
            this.left = rect.left + window.pageXOffset - document.documentElement.clientLeft;
            this.width = rect.width;
            this.height = rect.height;
        }
    };

    Zone.prototype.isInside = function (x, y) {
        if (this.hidden) {
            return false;
        }

        if (x < this.left || y < this.top) {
            return false;
        }

        if (this.left + this.width < x) {
            return false;
        }

        if (this.top + this.height < y) {
            return false;
        }
        return true;
    };

    Zone.prototype.update = function (event, data) {
        if (this.isInside(getEventCoord(event, 'pageX'), getEventCoord(event, 'pageY'))) {
            if (!this.inside) {
                this.enter(event, data);
            }

            if (this.dragOver) {
                this.dragOver(event, data, this.data);
            }
        } else {
            this.leave(event);
        }
    };

    Zone.prototype.enter = function (event, data) {
        this.inside = true;
        if (this.dragEnter) {
            this.active = this.dragEnter(event, data, this.data) !== false;
        } else {
            this.active = true;
        }
        this.dirty = true;
    };

    Zone.prototype.leave = function (event) {
        if (event) {
            event.target = this.element;
        }

        if (this.inside && this.dragLeave) {
            this.dragLeave(event, this.data);
        }
        this.active = false;
        this.inside = false;
        this.dirty = true;
    };

    function DropZone(args) {
        this.init(args);
        this.drop = function (data) {
            args.drop(data, args.data);
        };
    }
    DropZone.prototype = Zone.prototype;

    DropZone.prototype.updateStyling = function () {
        if (this.dirty) {
            toggleClass(this.element, 'drag-over', this.active);
            toggleClass(this.element, 'drop-rejected', this.inside && !this.active);
        }
        this.dirty = false;
    };

    function DragElement(element) {
        this.element = element;
        toggleClass(this.element, 'drag-element', true);
        this.element.style.position = 'fixed';
        this.element.style.zIndex = 9998;
        this.element.addEventListener('selectstart', function () { return false; }, true);
    }

    DragElement.prototype.updatePosition = function (event) {
        this.element.style.top = (event.pageY - window.pageYOffset) + 'px';
        this.element.style.left = (event.pageX - window.pageXOffset) + 'px';
        this.element.style.top = (getEventCoord(event, 'pageY') - window.pageYOffset) + 'px';
        this.element.style.left = (getEventCoord(event, 'pageX') - window.pageXOffset) + 'px';
    };

    DragElement.prototype.remove = function () {
        ko.removeNode(this.element);
    };

    function Draggable(args) {
        this.element = args.element;
        this.name = args.name;
        this.dragStart = args.dragStart;
        this.dragEnd = args.dragEnd;
        this.data = args.data;
    }

    Draggable.prototype.startDrag = function (event) {
        if (this.dragStart && this.dragStart(this.data, event) === false) {
            return false;
        }
        toggleClass(document.body, 'drag-active', true);
    };

    Draggable.prototype.drag = function (event) {
        var that = this;
        var name = this.name;
        var zones = dropZones[name].concat(eventZones[name]);

        forEach(zones, function (zone) {
            zone.refreshDomInfo();
        });

        forEach(zones, function (zone) {
            event.target = zone.element;
            zone.update(event, that.data);
        });

        forEach(dropZones[name], function (zone) {
            zone.updateStyling();
        });
    };

    Draggable.prototype.dropRejected = function () {
        var name = this.name;
        var insideAZone = first(dropZones[name], function (zone) {
            return zone.inside;
        });
        if (!insideAZone) {
            return true;
        }
        var noActiveZone = !first(dropZones[name], function (zone) {
            return zone.active;
        });
        return noActiveZone;
    };

    Draggable.prototype.cancelDrag = function (event) {
        if (this.dragEnd) {
            this.dragEnd(this.data, event);
        }
        toggleClass(document.body, 'drag-active', false);
    };

    Draggable.prototype.drop = function (event) {
        var name = this.name;

        var dropZoneElement = getClosest(event.target, '.drop-zone');
        var activeZones = filter(dropZones[name], function (zone) {
            return zone.active;
        });
        var winningDropZone = filter(activeZones, function (zone) {
            return zone.element === dropZoneElement;
        })[0];

        forEach(dropZones[name].concat(eventZones[name]), function (zone) {
            zone.leave(event);
        });

        forEach(dropZones[name], function (zone) {
            zone.updateStyling();
        });

        if (winningDropZone && winningDropZone.drop) {
            winningDropZone.drop(this.data);
        }

        if (this.dragEnd) {
            this.dragEnd(this.data, event);
        }
        toggleClass(document.body, 'drag-active', false);
    };

    function ScrollArea(element, delay) {
        var rect = element.getBoundingClientRect();
        this.element = element;
        this.scrollMarginHeight = Math.floor(rect.height / 10);
        this.scrollMarginWidth = Math.floor(rect.width / 10);
        this.offset = {
            'top': rect.top + window.pageYOffset - document.documentElement.clientTop,
            'left': rect.left + window.pageXOffset - document.documentElement.clientLeft
        };
        this.innerHeight = rect.height;
        this.innerWidth = rect.width;
        this.scrollDeltaMin = 5;
        this.scrollDeltaMax = 30;
        this.delay = delay || 0;
        this.inZone = 'center';
        this.scrolling = false;
    }

    ScrollArea.prototype.scroll = function (x, y) {
        this.x = x;
        this.y = y;
        this.topLimit = this.scrollMarginHeight + this.offset.top;
        this.bottomLimit = this.offset.top + this.innerHeight - this.scrollMarginHeight;
        this.leftLimit = this.scrollMarginWidth + this.offset.left;
        this.rightLimit = this.offset.left + this.innerWidth - this.scrollMarginWidth;

        var activeZone = '';
        if (y < this.topLimit) {
            activeZone += 'top';
        } else if (y > this.bottomLimit) {
            activeZone += 'bottom';
        }
        if (x < this.leftLimit) {
            activeZone += 'left';
        } else if (x > this.rightLimit) {
            activeZone += 'right';
        }
        if (activeZone === '') {
            activeZone = 'center';
        }

        this.updateZone(activeZone);
    };

    ScrollArea.prototype.enter = function (zone) {
        var that = this;
        this.delayTimer = setTimeout(function () {
            that.scrolling = true;
        }, this.delay);
    };

    ScrollArea.prototype.leave = function (zone) {
        this.scrolling = false;
        clearTimeout(this.delayTimer);
    };

    ScrollArea.prototype.over = function (zone) {
        var speed, scrollDelta = function (speed) {
            return speed * (this.scrollDeltaMax - this.scrollDeltaMin) + this.scrollDeltaMin;
        }.bind(this);
        if (this.scrolling) {
            if (zone.indexOf('top') !== -1) {
                speed = (this.topLimit - this.y) / this.scrollMarginHeight;
                this.element.scrollTop -= scrollDelta(speed);
            } else if (zone.indexOf('bottom') !== -1) {
                speed = (this.y - this.bottomLimit) / this.scrollMarginHeight;
                this.element.scrollTop += scrollDelta(speed);
            }
            if (zone.indexOf('left') !== -1) {
                speed = (this.leftLimit - this.x) / this.scrollMarginWidth;
                this.element.scrollLeft -= scrollDelta(speed);
            } else if (zone.indexOf('right') !== -1) {
                speed = (this.x - this.rightLimit) / this.scrollMarginWidth;
                this.element.scrollLeft += scrollDelta(speed);
            }
        }
    };

    ScrollArea.prototype.updateZone = function (zone) {
        if (this.zone !== zone) {
            this.leave(this.zone);
            this.enter(zone);
        }
        this.zone = zone;
        this.over(zone);
    };

    function getAcceptedDragZones(options) {
        if (options.accepts) {
            return [].concat(options.accepts);
        } else if (options.name) {
            // options.name is deprecated
            return [options.name];
        } else {
            throw new Error('A drop zone must specify the drag zones it accepts');
        }
    }

    ko.utils.extend(ko.bindingHandlers, {
        dropZone: {
            init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                var options = ko.utils.unwrapObservable(valueAccessor());
                var accepts = getAcceptedDragZones(options);

                toggleClass(element, 'drop-zone', true);

                var data = options.data ||
                    (bindingContext && bindingContext.$data);

                var zone = new DropZone({
                    element: element,
                    data: data,
                    drop: options.drop,
                    dragEnter: options.dragEnter,
                    dragOver: options.dragOver,
                    dragLeave: options.dragLeave
                });

                accepts.forEach(function (zoneName) {
                    dropZones[zoneName] = dropZones[zoneName] || [];
                    dropZones[zoneName].push(zone);
                });

                ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                    zone.leave();
                    accepts.forEach(function (zoneName) {
                        dropZones[zoneName].splice(dropZones[zoneName].indexOf(zone), 1);
                    });
                });
            }
        },

        dragEvents: {
            init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                var options = ko.utils.unwrapObservable(valueAccessor());
                var accepts = getAcceptedDragZones(options);

                var data = options.data ||
                    (bindingContext && bindingContext.$data);

                var zone = new Zone({
                    element: element,
                    data: data,
                    dragEnter: options.dragEnter,
                    dragOver: options.dragOver,
                    dragLeave: options.dragLeave
                });

                accepts.forEach(function (zoneName) {
                    eventZones[zoneName] = eventZones[zoneName] || [];
                    eventZones[zoneName].push(zone);
                });

                ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                    zone.leave();
                    accepts.forEach(function (zoneName) {
                        eventZones[zoneName].splice(eventZones[zoneName].indexOf(zone), 1);
                    });
                });
            }
        },

        dragZone: {
            init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                var options = ko.utils.unwrapObservable(valueAccessor());
                var name = options.name;
                var dragDistance = typeof options.dragDistance === 'number' ? options.dragDistance : 10;
                dropZones[name] = dropZones[name] || [];
                eventZones[name] = eventZones[name] || [];
                if (!name || typeof name !== 'string') {
                    throw new Error('A drag zone must specify a name');
                }

                if (options.disabled) {
                    return;
                }


                var data = options.data ||
                    (bindingContext && bindingContext.$data);

                var draggable = new Draggable({
                    element: element,
                    name: name,
                    data: data,
                    dragStart: options.dragStart,
                    dragEnd: options.dragEnd
                });

                if (typeof options.longTapDelay === 'undefined') {
                    options.longTapDelay = 500;
                }

                function createCloneProxyElement() {
                    var dragProxy = element.cloneNode(true);
                    element.parentNode.appendChild(dragProxy);
                    var style = window.getComputedStyle(element, null);
                    dragProxy.style.height = style.getPropertyValue('height');
                    dragProxy.style.width = style.getPropertyValue('width');
                    dragProxy.style.opacity = 70 / 100;
                    dragProxy.style.filter = 'alpha(opacity=70)';
                    return dragProxy;
                }

                function createTemplateProxyElement() {
                    var dragProxy = document.createElement('div');
                    document.body.appendChild(dragProxy);
                    var innerBindingContext = ('data' in options) ?
                        bindingContext.createChildContext(options.data) :
                        bindingContext;
                    ko.renderTemplate(options.element, innerBindingContext, {}, dragProxy);
                    return dragProxy;
                }

                function onSelectStartDrag(event) {
                    event.preventDefault();
                    event.stopPropagation();
                }

                element.addEventListener('selectstart', function (event) {
                    if (!event.target.tagName || event.target.tagName.toLowerCase() !== 'input' && event.target.tagName.toLowerCase() !== 'textarea') {
                        event.preventDefault();
                        event.stopPropagation();
                        return false;
                    }
                    return true;
                }, true);

                toggleClass(element, 'draggable', true);
                function beginEvent(downEvent) {
                    if (downEvent.button > 0) {
                        return true;
                    }

                    document.addEventListener('selectstart', onSelectStartDrag, true);

                    function startDragging(startEvent) {
                        document.removeEventListener('mouseup', onMouseUpStartDrag, true);
                        document.removeEventListener('touchend', onMouseUpStartDrag, true);
                        document.removeEventListener('click', onMouseUpStartDrag, true);
                        document.removeEventListener('mousemove', onMouseMoveStartDrag, true);
                        document.removeEventListener('touchmove', onTouchMoveStartDrag, true);

                        if (dragging) {
                            return true;
                        }

                        if (draggable.startDrag(downEvent) === false) {
                            startEvent.preventDefault();
                            startEvent.stopPropagation();
                            return false;
                        }

                        dragging = true;

                        var dragElement = null;
                        if (typeof options.element === 'undefined') {
                            dragElement = new DragElement(createCloneProxyElement());
                        }

                        var overlay = document.createElement('div');
                        overlay.className = 'drag-overlay';
                        overlay.setAttribute('unselectable', 'on');
                        overlay.style.zIndex = 9999;
                        overlay.style.position = 'fixed';
                        overlay.style.top = 0;
                        overlay.style.left = 0;
                        overlay.style.right = 0;
                        overlay.style.bottom = 0;
                        overlay.style.cursor = 'move';
                        overlay.style.backgroundColor = 'white';
                        overlay.style.opacity = 0;
                        overlay.style.filter = 'alpha(opacity=0)';
                        overlay.style.userSelect = 'none';
                        overlay.style.webkitUserSelect = 'none';
                        overlay.style.MozUserSelect = 'none';
                        overlay.style.msUserSelect = 'none';
                        overlay.style.OUserSelect = 'none';

                        overlay.addEventListener('selectstart', onSelectStartDrag);
                        document.body.appendChild(overlay);

                        if (options.element) {
                            dragElement = new DragElement(createTemplateProxyElement());
                        }

                        if (dragElement) {
                            dragElement.updatePosition(downEvent);
                        }

                        var dragTimer = null;
                        var dropRejected = false;
                        function drag(event) {
                            draggable.drag(event);
                            var draggableDropRejected = draggable.dropRejected();
                            if (draggableDropRejected !== dropRejected) {
                                toggleClass(overlay, 'drop-rejected', draggableDropRejected);
                                overlay.style.cursor = draggableDropRejected ? 'no-drop' : 'move';
                                dropRejected = draggableDropRejected;
                            }
                            dragTimer = setTimeout(function () {
                                drag(event);
                            }, 100);
                        }

                        function cancelDrag(e) {
                            dragging = false;
                            clearTimeout(touchDragTimer);
                            clearTimeout(dragTimer);
                            if (dragElement) {
                                dragElement.remove();
                            }
                            overlay.parentNode.removeChild(overlay);
                            draggable.cancelDrag(e);

                            //cleanup the touch events because they are on the document not the overlay
                            document.removeEventListener('touchmove', dragHandler);
                            document.removeEventListener('touchend', finishEvent);

                            e.preventDefault();
                            e.stopPropagation();
                            return true;
                        }

                        function dragHandler(moveEvent) {
                            if (moveEvent.button > 0) {
                                return cancelDrag(moveEvent);
                            }

                            clearTimeout(dragTimer);
                            if (dragElement) {
                                dragElement.updatePosition(moveEvent);
                            }
                            drag(moveEvent);
                            moveEvent.preventDefault();
                            moveEvent.stopPropagation();
                            return false;
                        }

                        if (!touchSupport) {
                            overlay.addEventListener('mousedown', cancelDrag);
                        }
                        overlay.addEventListener('mousemove', dragHandler);
                        document.addEventListener('touchmove', dragHandler);

                        function finishEvent(upEvent) {
                            dragging = false;
                            clearTimeout(touchDragTimer);
                            clearTimeout(dragTimer);
                            if (dragElement) {
                                dragElement.remove();
                            }
                            overlay.parentNode.removeChild(overlay);
                            var cloneEvent = extend({}, upEvent);
                            cloneEvent.target = document.elementFromPoint(
                                getEventCoord(upEvent, 'clientX'),
                                getEventCoord(upEvent, 'clientY')
                            );
                            draggable.drop(cloneEvent);

                            document.removeEventListener('selectstart', onSelectStartDrag, true);
                            //cleanup the touch events because they are on the document not the overlay
                            document.removeEventListener('touchmove', dragHandler);
                            document.removeEventListener('touchend', finishEvent);

                            upEvent.preventDefault();
                            upEvent.stopPropagation();
                            return false;
                        }
                        overlay.addEventListener('mouseup', finishEvent);
                        document.addEventListener('touchend', finishEvent);
                    }

                    function onMouseUpStartDrag(event) {
                        document.removeEventListener('mouseup', onMouseUpStartDrag, true);
                        document.removeEventListener('touchend', onMouseUpStartDrag, true);
                        document.removeEventListener('click', onMouseUpStartDrag, true);
                        document.removeEventListener('mousemove', onMouseMoveStartDrag, true);
                        document.removeEventListener('touchmove', onTouchMoveStartDrag, true);
                        document.removeEventListener('selectstart', onSelectStartDrag, true);
                        return true;
                    }
                    document.addEventListener('mouseup', onMouseUpStartDrag, true);
                    document.addEventListener('touchend', onMouseUpStartDrag, true);
                    document.addEventListener('click', onMouseUpStartDrag, true);

                    function onMouseMoveStartDrag(event) {
                        if (event.target.tagName && event.target.tagName.toLowerCase() === 'input') {
                            return true;
                        }
                        var xDifference = getEventCoord(downEvent, 'pageX') - getEventCoord(event, 'pageX'),
                            yDifference = getEventCoord(downEvent, 'pageY') - getEventCoord(event, 'pageY'),
                            distance = Math.sqrt(Math.pow(xDifference, 2) +
                                                 Math.pow(yDifference, 2));
                        if (distance > dragDistance) {
                            startDragging(event);
                        }
                        event.preventDefault();
                        event.stopPropagation();
                        return false;
                    }

                    var touchDragTimer;
                    if (downEvent.type === 'touchstart') {
                        touchDragTimer = setTimeout(function () {
                            startDragging(downEvent);
                        }, ko.unwrap(options.longTapDelay));

                        element.addEventListener('touchend', function () {
                            clearTimeout(touchDragTimer);
                        });
                    }

                    function onTouchMoveStartDrag(event) {
                        if (event.target.tagName && event.target.tagName.toLowerCase() === 'input') {
                            return true;
                        }

                        var xDifference = getEventCoord(downEvent, 'pageX') - getEventCoord(event, 'pageX'),
                            yDifference = getEventCoord(downEvent, 'pageY') - getEventCoord(event, 'pageY'),
                            distance = Math.sqrt(Math.pow(xDifference, 2) +
                                                 Math.pow(yDifference, 2));
                        if (distance > dragDistance) {
                            clearTimeout(touchDragTimer);
                        }
                    }

                    document.addEventListener('mousemove', onMouseMoveStartDrag, true);
                    document.addEventListener('touchmove', onTouchMoveStartDrag, true);

                    return true;
                }
                element.addEventListener('mousedown', beginEvent);
                element.addEventListener('touchstart', beginEvent);

                ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                    document.removeEventListener('selectstart', onSelectStartDrag, true);
                });
            }
        },

        scrollableOnDragOver: {
            init: function (element, valueAccessor, allBindingAccessor) {
                var options = ko.utils.unwrapObservable(valueAccessor());
                if (typeof options === 'string' || Array.isArray(options)) {
                    options = { accepts: options };
                }
                options.delay = options.delay || 0;
                var accepts = getAcceptedDragZones(options);

                var scrollArea = null;
                var x, y;
                var scrollInterval;

                function scroll() {
                    scrollArea.scroll(x, y);
                }
                function dragEnter(e) {
                    scrollArea = new ScrollArea(element, options.delay);
                    scrollInterval = setInterval(scroll, 100);
                }

                function dragOver(e) {
                    x = getEventCoord(e, 'pageX');
                    y = getEventCoord(e, 'pageY');
                }

                function dragLeave(e) {
                    clearInterval(scrollInterval);
                }

                ko.bindingHandlers.dragEvents.init(element, function () {
                    return {
                        accepts: accepts,
                        dragEnter: dragEnter,
                        dragOver: dragOver,
                        dragLeave: dragLeave
                    };
                });
            }
        }
    });
});
