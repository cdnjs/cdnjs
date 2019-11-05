import DragEvents from '../../_modules/dragevents/index';
import * as DOM from '../../_modules/dom';
import * as events from '../../_modules/eventlisteners';
import * as media from '../../_modules/matchmedia';
/** Instance of the DragEvents class. */
var dragInstance = null;
/** THe node that can be dragged. */
var dragNode = null;
/** How far the page (or menu) can be dragged. */
var maxDistance = 0;
export default function (page) {
    var _this = this;
    /** Variables that vary for each menu position (top, right, bottom, left. front, back). */
    var vars = {};
    /** Whether or not the page or menu is actually being moved. */
    var moving = false;
    /**
     * Add the dragging events.
     */
    var addEvents = function () {
        if (dragNode) {
            //  Prepare the page or menu to be moved.
            events.on(dragNode, 'dragStart', function (evnt) {
                if (evnt['detail'].direction == vars.direction) {
                    moving = true;
                    //  Class prevents interaction with the page.
                    _this.node.wrpr.classList.add('mm-wrapper_dragging');
                    //  Prepare the menu to be opened.
                    _this._openSetup();
                    _this.trigger('open:start');
                    //  Get the maximum distance to move out the page or menu.
                    maxDistance = _this.node.menu[vars.axis == 'x' ? 'clientWidth' : 'clientHeight'];
                }
            });
            //  Move the page or menu when dragging.
            events.on(dragNode, 'dragMove', function (evnt) {
                if (evnt['detail'].axis == vars.axis) {
                    if (moving) {
                        var distance = evnt['detail']['distance' + vars.axis.toUpperCase()];
                        switch (vars.position) {
                            case 'right':
                            case 'bottom':
                                distance = Math.min(Math.max(distance, -maxDistance), 0);
                                break;
                            default:
                                distance = Math.max(Math.min(distance, maxDistance), 0);
                        }
                        //  Deviate for position front (the menu starts out of view).
                        if (vars.zposition == 'front') {
                            switch (vars.position) {
                                case 'right':
                                case 'bottom':
                                    distance += maxDistance;
                                    break;
                                default:
                                    distance -= maxDistance;
                                    break;
                            }
                        }
                        vars.slideOutNodes.forEach(function (node) {
                            node.style['transform'] =
                                'translate' +
                                    vars.axis.toUpperCase() +
                                    '(' +
                                    distance +
                                    'px)';
                        });
                    }
                }
            });
            //  Stop the page or menu from being moved.
            events.on(dragNode, 'dragEnd', function (evnt) {
                if (evnt['detail'].axis == vars.axis) {
                    if (moving) {
                        moving = false;
                        _this.node.wrpr.classList.remove('mm-wrapper_dragging');
                        vars.slideOutNodes.forEach(function (node) {
                            node.style['transform'] = '';
                        });
                        //  Determine if the menu should open or close.
                        var open_1 = Math.abs(evnt['detail']['distance' + vars.axis.toUpperCase()]) >=
                            maxDistance * 0.75;
                        if (!open_1) {
                            var movement = evnt['detail']['movement' + vars.axis.toUpperCase()];
                            switch (vars.position) {
                                case 'right':
                                case 'bottom':
                                    open_1 = movement <= 0;
                                    break;
                                default:
                                    open_1 = movement >= 0;
                                    break;
                            }
                        }
                        if (open_1) {
                            _this._openStart();
                        }
                        else {
                            _this.close();
                        }
                    }
                }
            });
        }
    };
    /**
     * Remove the dragging events.
     */
    var removeEvents = function () {
        if (dragNode) {
            events.off(dragNode, 'dragStart');
            events.off(dragNode, 'dragMove');
            events.off(dragNode, 'dragEnd');
        }
    };
    var addMatchMedia = function () {
        var queries = Object.keys(_this.opts.extensions);
        if (queries.length) {
            //  A media query that'll match if any of the other media query matches:
            //    set the defaults if it doesn't match.
            media.add(queries.join(', '), function () { }, function () {
                vars = getPositionVars(vars, [], _this.node.menu);
            });
            //  The other media queries.
            queries.forEach(function (query) {
                media.add(query, function () {
                    vars = getPositionVars(vars, _this.opts.extensions[query], _this.node.menu);
                }, function () { });
            });
            //  No extensions, just use the defaults.
        }
        else {
            vars = getPositionVars(vars, [], _this.node.menu);
        }
    };
    //  Remove events from previous "page"
    removeEvents();
    //  Store new "page"
    dragNode = page;
    //  Initialize the drag events.
    dragInstance = new DragEvents(dragNode);
    addMatchMedia();
    addMatchMedia = function () { };
    addEvents();
}
var getPositionVars = function (vars, extensions, menu) {
    //  Default position and z-position.
    vars.position = 'left';
    vars.zposition = 'back';
    //  Find position.
    ['right', 'top', 'bottom'].forEach(function (pos) {
        if (extensions.indexOf('position-' + pos) > -1) {
            vars.position = pos;
        }
    });
    //  Find z-position.
    ['front', 'top', 'bottom'].forEach(function (pos) {
        if (extensions.indexOf('position-' + pos) > -1) {
            vars.zposition = 'front';
        }
    });
    //  Set the area where the dragging can start.
    dragInstance.area = {
        top: vars.position == 'bottom' ? '75%' : 0,
        right: vars.position == 'left' ? '75%' : 0,
        bottom: vars.position == 'top' ? '75%' : 0,
        left: vars.position == 'right' ? '75%' : 0
    };
    //  What side of the menu to measure (width or height).
    //  What axis to drag the menu along (x or y).
    switch (vars.position) {
        case 'top':
        case 'bottom':
            vars.axis = 'y';
            break;
        default:
            vars.axis = 'x';
    }
    //  What direction to drag in.
    switch (vars.position) {
        case 'top':
            vars.direction = 'Down';
            break;
        case 'right':
            vars.direction = 'Left';
            break;
        case 'bottom':
            vars.direction = 'Up';
            break;
        default:
            vars.direction = 'Right';
    }
    //  What nodes to slide out while dragging.
    switch (vars.zposition) {
        case 'front':
            vars.slideOutNodes = [menu];
            break;
        default:
            vars.slideOutNodes = DOM.find(document.body, '.mm-slideout');
    }
    return vars;
};
