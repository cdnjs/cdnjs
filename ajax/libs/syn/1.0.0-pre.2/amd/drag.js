/*syn@1.0.0-pre.1#drag*/
define([
    'require',
    'exports',
    'module',
    './synthetic',
    './drag.support'
], function (require, exports, module) {
    var syn = require('./synthetic');
    require('./drag.support');
    syn.helpers.extend(syn, {
        move: function (from, options) {
            var win = syn.helpers.getWindow(from);
            var sourceCoordinates = convertOption(options.from || from, win, from);
            var destinationCoordinates = convertOption(options.to || options, win, from);
            if (options.adjust !== false) {
                adjust(sourceCoordinates, destinationCoordinates, win);
            }
            return pointerMoves({
                start: sourceCoordinates,
                end: destinationCoordinates,
                duration: options.duration || 500,
                startingState: elementFromPoint(sourceCoordinates, win),
                win,
                triggerPointerMove: triggerBasicPointerMove
            });
        },
        drag: function (from, options, callback) {
            var win = syn.helpers.getWindow(from);
            var sourceCoordinates = convertOption(options.from || from, win, from);
            var destinationCoordinates = convertOption(options.to || options, win, from);
            if (options.adjust !== false) {
                adjust(sourceCoordinates, destinationCoordinates, win);
            }
            if (from.draggable) {
                return html5DragAndDrop(win, sourceCoordinates, destinationCoordinates, options.duration || 500);
            } else {
                return pointerDragAndDrop(win, sourceCoordinates, destinationCoordinates, options.duration || 500);
            }
        }
    });
    syn.helpers.extend(syn.events.types, {
        dragstart: {
            options: {
                bubbles: false,
                cancelable: false
            },
            create: createDragEvent
        },
        drag: {
            options: {
                bubbles: true,
                cancelable: true
            },
            create: createDragEvent
        },
        dragenter: {
            options: {
                bubbles: true,
                cancelable: true
            },
            create: createDragEvent
        },
        dragover: {
            options: {
                bubbles: true,
                cancelable: true
            },
            create: createDragEvent
        },
        dragleave: {
            options: {
                bubbles: true,
                cancelable: false
            },
            create: createDragEvent
        },
        drop: {
            options: {
                bubbles: true,
                cancelable: true,
                buttons: 1
            },
            create: createDragEvent
        },
        dragend: {
            options: {
                bubbles: true,
                cancelable: false
            },
            create: createDragEvent
        }
    });
    async function pointerDragAndDrop(win, fromPoint, toPoint, duration = 500) {
        if (syn.support.pointerEvents) {
            createEventAtPoint('pointerover', fromPoint, win);
            createEventAtPoint('pointerenter', fromPoint, win);
        }
        createEventAtPoint('mouseover', fromPoint, win);
        createEventAtPoint('mouseenter', fromPoint, win);
        if (syn.support.pointerEvents) {
            createEventAtPoint('pointermove', fromPoint, win);
        }
        createEventAtPoint('mousemove', fromPoint, win);
        if (syn.support.pointerEvents) {
            createEventAtPoint('pointerdown', fromPoint, win);
        }
        if (syn.support.touchEvents) {
            createEventAtPoint('touchstart', fromPoint, win);
        }
        createEventAtPoint('mousedown', fromPoint, win);
        await pointerMoves({
            start: fromPoint,
            end: toPoint,
            duration,
            startingState: elementFromPoint(fromPoint, win),
            win,
            triggerPointerMove: triggerBasicPointerMove
        });
        if (syn.support.pointerEvents) {
            createEventAtPoint('pointerup', toPoint, win);
        }
        if (syn.support.touchEvents) {
            createEventAtPoint('touchend', toPoint, win);
        }
        createEventAtPoint('mouseup', toPoint, win);
        if (syn.support.pointerEvents) {
            createEventAtPoint('pointerleave', toPoint, win);
        }
        createEventAtPoint('mouseleave', toPoint, win);
    }
    function triggerBasicPointerMove(point, last, win) {
        var el = elementFromPoint(point, win);
        if (last !== el && el && last) {
            console.log('STATE CHANGE!');
            var options = syn.helpers.extend({}, point);
            options.relatedTarget = el;
            if (syn.support.pointerEvents) {
                syn.trigger(last, 'pointerout', options);
                syn.trigger(last, 'pointerleave', options);
            }
            syn.trigger(last, 'mouseout', options);
            syn.trigger(last, 'mouseleave', options);
            options.relatedTarget = last;
            if (syn.support.pointerEvents) {
                syn.trigger(el, 'pointerover', options);
                syn.trigger(el, 'pointerenter', options);
            }
            syn.trigger(el, 'mouseover', options);
            syn.trigger(el, 'mouseenter', options);
        }
        if (syn.support.pointerEvents) {
            syn.trigger(el || win, 'pointermove', point);
        }
        if (syn.support.touchEvents) {
            syn.trigger(el || win, 'touchmove', point);
        }
        syn.trigger(el || win, 'mousemove', point);
        return el;
    }
    let dragAndDropTransferObject = null;
    async function html5DragAndDrop(focusWindow, fromPoint, toPoint, duration = 500) {
        dragAndDropTransferObject = createDataTransferObject();
        createEventAtPoint('mouseover', fromPoint, focusWindow);
        createEventAtPoint('mouseenter', fromPoint, focusWindow);
        createEventAtPoint('mousemove', fromPoint, focusWindow);
        createEventAtPoint('mousedown', fromPoint, focusWindow);
        createEventAtPoint('dragstart', fromPoint, focusWindow);
        createEventAtPoint('drag', fromPoint, focusWindow);
        createEventAtPoint('dragenter', fromPoint, focusWindow);
        createEventAtPoint('dragover', fromPoint, focusWindow);
        await pointerMoves({
            start: fromPoint,
            end: toPoint,
            duration,
            startingState: fromPoint,
            win: focusWindow,
            triggerPointerMove: function (newPoint, previousPoint, win) {
                var thisElement = elementFromPoint(newPoint, focusWindow);
                var previousElement = elementFromPoint(previousPoint, focusWindow);
                var options = syn.helpers.extend({}, newPoint);
                if (thisElement !== previousElement) {
                    options.relatedTarget = thisElement;
                    createEventAtPoint('dragleave', options, focusWindow);
                    options.relatedTarget = previousElement;
                    createEventAtPoint('dragenter', options, focusWindow);
                }
                createEventAtPoint('dragover', options, focusWindow);
                return newPoint;
            }
        });
        createEventAtPoint('dragleave', toPoint, focusWindow);
        createEventAtPoint('dragend', toPoint, focusWindow);
        createEventAtPoint('mouseout', toPoint, focusWindow);
        createEventAtPoint('mouseleave', toPoint, focusWindow);
        createEventAtPoint('drop', toPoint, focusWindow);
        createEventAtPoint('dragend', toPoint, focusWindow);
        createEventAtPoint('mouseover', toPoint, focusWindow);
        createEventAtPoint('mouseenter', toPoint, focusWindow);
        createEventAtPoint('mousemove', toPoint, focusWindow);
        createEventAtPoint('mouseout', toPoint, focusWindow);
        createEventAtPoint('mouseleave', toPoint, focusWindow);
    }
    function pointerMoves({start, end, duration, startingState, win, triggerPointerMove}) {
        return new Promise(resolve => {
            var startTime = new Date();
            var distX = end.clientX - start.clientX;
            var distY = end.clientY - start.clientY;
            var currentState = startingState;
            var cursor = win.document.createElement('div');
            var calls = 0;
            var move;
            move = function onmove() {
                var now = new Date();
                var scrollOffset = syn.helpers.scrollOffset(win);
                var fraction = (calls === 0 ? 0 : now - startTime) / duration;
                var newPoint = {
                    clientX: distX * fraction + start.clientX,
                    clientY: distY * fraction + start.clientY
                };
                calls++;
                if (fraction < 1) {
                    syn.helpers.extend(cursor.style, {
                        left: newPoint.clientX + scrollOffset.left + 2 + 'px',
                        top: newPoint.clientY + scrollOffset.top + 2 + 'px'
                    });
                    currentState = triggerPointerMove(newPoint, currentState, win);
                    syn.helpers.schedule(onmove, 15);
                } else {
                    triggerPointerMove(end, currentState, win);
                    win.document.body.removeChild(cursor);
                    resolve();
                }
            };
            syn.helpers.extend(cursor.style, {
                height: '5px',
                width: '5px',
                backgroundColor: 'red',
                position: 'absolute',
                zIndex: 19999,
                fontSize: '1px'
            });
            win.document.body.appendChild(cursor);
            move();
        });
    }
    function createEventAtPoint(event, point, win) {
        var el = elementFromPoint(point, win);
        syn.trigger(el || win, event, point);
        return el;
    }
    function center(el) {
        return syn.helpers.addOffset({}, el);
    }
    function convertOption(option, win, from) {
        var page = /(\d+)[x ](\d+)/, client = /(\d+)X(\d+)/, relative = /([+-]\d+)[xX ]([+-]\d+)/, parts;
        if (typeof option === 'string' && relative.test(option) && from) {
            var cent = center(from);
            parts = option.match(relative);
            option = {
                pageX: cent.pageX + parseInt(parts[1]),
                pageY: cent.pageY + parseInt(parts[2])
            };
        }
        if (typeof option === 'string' && page.test(option)) {
            parts = option.match(page);
            option = {
                pageX: parseInt(parts[1]),
                pageY: parseInt(parts[2])
            };
        }
        if (typeof option === 'string' && client.test(option)) {
            parts = option.match(client);
            option = {
                clientX: parseInt(parts[1]),
                clientY: parseInt(parts[2])
            };
        }
        if (typeof option === 'string') {
            option = win.document.querySelector(option);
        }
        if (option.nodeName) {
            option = center(option);
        }
        if (option.pageX != null) {
            var off = syn.helpers.scrollOffset(win);
            option = {
                clientX: option.pageX - off.left,
                clientY: option.pageY - off.top
            };
        }
        return option;
    }
    function adjust(from, to, win) {
        if (from.clientY < 0) {
            var off = syn.helpers.scrollOffset(win);
            var top = off.top + from.clientY - 100, diff = top - off.top;
            if (top > 0) {
            } else {
                top = 0;
                diff = -off.top;
            }
            from.clientY = from.clientY - diff;
            to.clientY = to.clientY - diff;
            syn.helpers.scrollOffset(win, {
                top: top,
                left: off.left
            });
        }
    }
    ;
    function createDragEvent(eventName, options, element) {
        var dragEvent = syn.events.kinds.mouse.create(eventName, options, element);
        dragEvent.dataTransfer = dragAndDropTransferObject;
        return syn.dispatch(dragEvent, element, eventName, false);
    }
    function elementFromPoint(point, win) {
        var clientX = point.clientX;
        var clientY = point.clientY;
        if (point == null) {
            return null;
        }
        if (syn.support.elementFromPage) {
            var off = syn.helpers.scrollOffset(win);
            clientX = clientX + off.left;
            clientY = clientY + off.top;
        }
        return win.document.elementFromPoint(Math.round(clientX), Math.round(clientY));
    }
    function createDataTransferObject() {
        var dataTransfer = {
            dropEffect: 'none',
            effectAllowed: 'uninitialized',
            files: [],
            items: [],
            types: [],
            data: [],
            setData: function (dataFlavor, value) {
                var tempdata = {};
                tempdata.dataFlavor = dataFlavor;
                tempdata.val = value;
                this.data.push(tempdata);
            },
            getData: function (dataFlavor) {
                for (var i = 0; i < this.data.length; i++) {
                    var tempdata = this.data[i];
                    if (tempdata.dataFlavor === dataFlavor) {
                        return tempdata.val;
                    }
                }
            }
        };
        return dataTransfer;
    }
});