/*global ko, jQuery*/
(function (factory) {
    if (typeof define === "function" && define.amd) {
        // AMD anonymous module with hard-coded dependency on "knockout"
        define(["knockout", "jquery"], factory);
    } else {
        // <script> tag: use the global `ko` and `jQuery`
        factory(ko, jQuery);
    }
})(function (ko, $) {
    var dropZones = {};
    var eventZones = {};

    function Zone(args) {
        this.init(args);
    }

    Zone.prototype.init = function (args) {
        this.element = args.element;
        this.$element = $(args.element);
        this.data = args.data;
        this.dragEnter = args.dragEnter;
        this.dragOver = args.dragOver;
        this.dragLeave = args.dragLeave;
        this.active = false;
        this.inside = false;
        this.dirty = false;
    };

    Zone.prototype.refreshDomInfo = function () {
        var $element = this.$element;
        var offset = $element.offset();
        this.top = offset.top;
        this.left = offset.left;
        this.width = $element.outerWidth();
        this.height = $element.outerHeight();
    };


    Zone.prototype.isInside = function (x, y) {
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
        if (this.isInside(event.pageX, event.pageY)) {
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
            this.dragLeave(event);
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
            this.$element.toggleClass('drag-over', this.active);
            this.$element.toggleClass('drop-rejected', this.inside && !this.active);
        }
        this.dirty = false;
    };

    function DragElement($element) {
        this.$element = $element;
        this.$element.addClass('drag-element').css({
            position: 'fixed',
            zIndex: 1060
        });
        this.$element.on('selectstart', false);
    }

    DragElement.prototype.updatePosition = function (event) {
        this.$element.offset({
            top: event.pageY,
            left: event.pageX
        });
    };

    DragElement.prototype.remove = function () {
        this.$element.remove();
    };

    function Draggable(args) {
        this.name = args.name;
        this.dragStart = args.dragStart;
        this.dragEnd = args.dragEnd;
        this.data = args.data;
    }

    Draggable.prototype.startDrag = function () {
        if (this.dragStart && this.dragStart(this.data) === false) {
            return false;
        }
    };

    Draggable.prototype.drag = function (event) {
        var that = this;
        var name = this.name;
        var zones = dropZones[name].concat(eventZones[name]);

        zones.forEach(function (zone) {
            zone.refreshDomInfo();
        });

        zones.forEach(function (zone) {
            event.target = zone.element;
            zone.update(event, that.data);
        });

        dropZones[name].forEach(function (zone) {
            zone.updateStyling();
        });
    };

    Draggable.prototype.dropRejected = function () {
        var name = this.name;
        var insideAZone = dropZones[name].some(function (zone) {
            return zone.inside;
        });
        if (!insideAZone) {
            return false;
        }

        var noActiveZone = !dropZones[name].some(function (zone) {
            return zone.active;
        });
        return noActiveZone;
    };

    Draggable.prototype.drop = function (event) {
        var name = this.name;

        var dropZoneElement = $(event.target).closest('.drop-zone');
        var winningDropZone = dropZones[name].filter(function (zone) {
            return zone.active;
        }).filter(function (zone) {
            return zone.$element.is(dropZoneElement);
        })[0];

        dropZones[name].concat(eventZones[name]).forEach(function (zone) {
            zone.leave(event);
        });

        dropZones[name].forEach(function (zone) {
            zone.updateStyling();
        });

        if (this.dragEnd) {
            this.dragEnd(this.data);
        }

        if (winningDropZone && winningDropZone.drop) {
            winningDropZone.drop(this.data);
        }
    };

    function ScrollArea(element) {
        this.element = element;
        this.$element = $(element);
        this.scrollMargin = Math.floor(this.$element.innerHeight() / 10);
        this.offset = this.$element.offset();
        this.innerHeight = this.$element.innerHeight();
        this.scrollDeltaMin = 5;
        this.scrollDeltaMax = 30;
    }

    ScrollArea.prototype.scroll = function (x, y) {
        var topLimit = this.scrollMargin + this.offset.top;
        var speed, scrollDelta;
        if (y < topLimit) {
            speed = (topLimit - y) / this.scrollMargin;
            scrollDelta = speed * (this.scrollDeltaMax - this.scrollDeltaMin) + this.scrollDeltaMin;
            this.element.scrollTop -= scrollDelta;
        }

        var bottomLimit = this.offset.top + this.innerHeight - this.scrollMargin;
        if (y > bottomLimit) {
            speed = (y - bottomLimit) / this.scrollMargin;
            scrollDelta = speed * (this.scrollDeltaMax - this.scrollDeltaMin) + this.scrollDeltaMin;
            this.element.scrollTop += scrollDelta;
        }
    };

    ko.utils.extend(ko.bindingHandlers, {
        dropzone: {
            init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                var options = ko.utils.unwrapObservable(valueAccessor());
                var name = options.name;
                dropZones[name] = dropZones[name] || [];

                $(element).addClass('drop-zone');

                var zone = new DropZone({
                    element: element,
                    data: bindingContext && bindingContext.$data,
                    drop: options.drop,
                    dragEnter: options.dragEnter,
                    dragOver: options.dragOver,
                    dragLeave: options.dragLeave
                });
                dropZones[name].push(zone);

                ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                    zone.leave();
                    dropZones[name].splice(dropZones[name].indexOf(zone), 1);
                });
            }
        },

        dragEvents: {
            init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                var options = ko.utils.unwrapObservable(valueAccessor());
                var name = options.name;
                eventZones[name] = eventZones[name] || [];

                var zone = new Zone({
                    element: element,
                    data: bindingContext && bindingContext.$data,
                    dragEnter: options.dragEnter,
                    dragOver: options.dragOver,
                    dragLeave: options.dragLeave
                });
                eventZones[name].push(zone);

                ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                    zone.leave();
                    eventZones[name].splice(eventZones[name].indexOf(zone), 1);
                });
            }
        },

        dragzone: {
            init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                var options = ko.utils.unwrapObservable(valueAccessor());
                var name = options.name;
                dropZones[name] = dropZones[name] || [];
                eventZones[name] = eventZones[name] || [];

                var data = bindingContext && bindingContext.$data;

                var draggable = new Draggable({
                    name: name,
                    data: data,
                    dragStart: options.dragStart,
                    dragEnd: options.dragEnd
                });

                function createCloneProxyElement() {
                    var dragProxy = $(element).clone().appendTo($(element).parent());
                    dragProxy.css({
                        height: $(element).height(),
                        width: $(element).width(),
                        opacity: 70 / 100,
                        filter: "alpha(opacity=70"
                    });
                    return dragProxy;
                }

                function createTemplateProxyElement() {
                    var dragProxy = $('<div>').appendTo('body');
                    ko.renderTemplate(options.element, bindingContext, {}, dragProxy[0]);
                    return dragProxy;
                }

                $(element).on('selectstart', function (e) {
                    if (!$(e.target).is(':input')) {
                        return false;
                    }
                });

                $(element).addClass('draggable');
                $(element).on('mousedown', function (downEvent) {
                    if (downEvent.which !== 1) {
                        return true;
                    }

                    $(document).on('selectstart.drag', false);

                    function startDragging(startEvent) {
                        $(element).off('mouseup.startdrag click.startdrag mouseleave.startdrag mousemove.startdrag');

                        var dragElement = null;
                        if (!options.element) {
                            dragElement = new DragElement(createCloneProxyElement());
                        }

                        if (draggable.startDrag() === false) {
                            return false;
                        }

                        var $overlay = $('<div class="drag-overlay" unselectable="on">');
                        $overlay.on('selectstart', false);
                        $overlay.appendTo('body');

                        if (options.element) {
                            dragElement = new DragElement(createTemplateProxyElement());
                        }

                        dragElement.updatePosition(downEvent);

                        var dragTimer = null;
                        var dropRejected = false;
                        function drag(event) {
                            draggable.drag(event);
                            if (draggable.dropRejected() !== dropRejected) {
                                $overlay.toggleClass('drop-rejected', draggable.dropRejected());
                                dropRejected = draggable.dropRejected();
                            }
                            dragTimer = setTimeout(function () {
                                drag(event);
                            }, 250);
                        }

                        $overlay.on('mousemove.drag', function (moveEvent) {
                            clearTimeout(dragTimer);
                            dragElement.updatePosition(moveEvent);
                            drag(moveEvent);
                            return false;
                        });

                        $overlay.on('mouseup', function (upEvent) {
                            clearTimeout(dragTimer);
                            dragElement.remove();
                            $overlay.remove();
                            upEvent.target = document.elementFromPoint(upEvent.pageX, upEvent.pageY);
                            draggable.drop(upEvent);

                            $(document).off('selectstart.drag');
                            return false;
                        });
                    }

                    $(element).one('mouseup.startdrag click.startdrag', function (event) {
                        $(element).off('mouseleave.startdrag mousemove.startdrag');
                        $(document).off('selectstart.drag');
                        return true;
                    });

                    $(element).on('mousemove.startdrag', function (event) {
                        if ($(event.target).is(':input')) {
                            return;
                        }

                        var distance = Math.sqrt(Math.pow(downEvent.pageX - event.pageX, 2) +
                                                 Math.pow(downEvent.pageY - event.pageY, 2));
                        if (distance > 10) {
                            startDragging(event);
                        }
                    });

                    $(element).one('mouseleave.startdrag', function (event) {
                        if ($(event.target).is(':input')) {
                            return;
                        }

                        startDragging(event);
                    });

                    return true;
                });

                ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                    $(document).off('selectstart.drag');
                });
            }
        },

        scrollableOnDragOver: {
            // TODO make this binding scroll on the x-axis as well
            init: function (element, valueAccessor, allBindingAccessor) {
                var name = ko.utils.unwrapObservable(valueAccessor());
                var scrollArea = null;
                var x, y;
                var timer;

                function scroll() {
                    scrollArea.scroll(x, y);
                }
                function dragEnter(e) {
                    scrollArea = new ScrollArea(element);
                    timer = setInterval(scroll, 100);
                }

                function dragOver(e) {
                    x = e.pageX;
                    y = e.pageY;
                }

                function dragLeave(e) {
                    clearTimeout(timer);
                }

                ko.bindingHandlers.dragEvents.init(element, function () {
                    return {
                        name: name,
                        dragEnter: dragEnter,
                        dragOver: dragOver,
                        dragLeave: dragLeave
                    };
                });
            }
        }
    });
});
