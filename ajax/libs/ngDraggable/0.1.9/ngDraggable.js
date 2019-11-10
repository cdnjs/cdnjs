/*
 *
 * https://github.com/fatlinesofcode/ngDraggable
 */
angular.module("ngDraggable", [])
    .service('ngDraggable', [function() {


        var scope = this;
        scope.inputEvent = function(event) {
            if (angular.isDefined(event.touches)) {
                return event.touches[0];
            }
            //Checking both is not redundent. If only check if touches isDefined, angularjs isDefnied will return error and stop the remaining scripty if event.originalEvent is not defined.
            else if (angular.isDefined(event.originalEvent) && angular.isDefined(event.originalEvent.touches)) {
                return event.originalEvent.touches[0];
            }
            return event;
        };

    }])
    .directive('ngDrag', ['$rootScope', '$parse', '$document', '$window', 'ngDraggable', function ($rootScope, $parse, $document, $window, ngDraggable) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.value = attrs.ngDrag;
                var offset,_centerAnchor=false,_mx,_my,_tx,_ty,_mrx,_mry;
                var _hasTouch = ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;
                var _pressEvents = 'touchstart mousedown';
                var _moveEvents = 'touchmove mousemove';
                var _releaseEvents = 'touchend mouseup';
                var _dragHandle;

                // to identify the element in order to prevent getting superflous events when a single element has both drag and drop directives on it.
                var _myid = scope.$id;
                var _data = null;

                var _dragOffset = null;

                var _dragEnabled = false;

                var _pressTimer = null;

                var onDragStartCallback = $parse(attrs.ngDragStart) || null;
                var onDragStopCallback = $parse(attrs.ngDragStop) || null;
                var onDragSuccessCallback = $parse(attrs.ngDragSuccess) || null;
                var allowTransform = angular.isDefined(attrs.allowTransform) ? scope.$eval(attrs.allowTransform) : true;

                var getDragData = $parse(attrs.ngDragData);

                // deregistration function for mouse move events in $rootScope triggered by jqLite trigger handler
                var _deregisterRootMoveListener = angular.noop;

                var initialize = function () {
                    element.attr('draggable', 'false'); // prevent native drag
                    // check to see if drag handle(s) was specified
                    // if querySelectorAll is available, we use this instead of find
                    // as JQLite find is limited to tagnames
                    if (element[0].querySelectorAll) {
                        var dragHandles = angular.element(element[0].querySelectorAll('[ng-drag-handle]'));
                    } else {
                        var dragHandles = element.find('[ng-drag-handle]');
                    }
                    if (dragHandles.length) {
                        _dragHandle = dragHandles;
                    }
                    toggleListeners(true);
                };

                var toggleListeners = function (enable) {
                    if (!enable)return;
                    // add listeners.

                    scope.$on('$destroy', onDestroy);
                    scope.$watch(attrs.ngDrag, onEnableChange);
                    scope.$watch(attrs.ngCenterAnchor, onCenterAnchor);
                    // wire up touch events
                    if (_dragHandle) {
                        // handle(s) specified, use those to initiate drag
                        _dragHandle.on(_pressEvents, onpress);
                    } else {
                        // no handle(s) specified, use the element as the handle
                        element.on(_pressEvents, onpress);
                    }
                    if(! _hasTouch && element[0].nodeName.toLowerCase() == "img"){
                        element.on('mousedown', function(){ return false;}); // prevent native drag for images
                    }
                };
                var onDestroy = function (enable) {
                    toggleListeners(false);
                };
                var onEnableChange = function (newVal, oldVal) {
                    _dragEnabled = (newVal);
                };
                var onCenterAnchor = function (newVal, oldVal) {
                    if(angular.isDefined(newVal))
                        _centerAnchor = (newVal || 'true');
                };

                var isClickableElement = function (evt) {
                    return (
                        angular.isDefined(angular.element(evt.target).attr("ng-cancel-drag"))
                    );
                };
                /*
                 * When the element is clicked start the drag behaviour
                 * On touch devices as a small delay so as not to prevent native window scrolling
                 */
                var onpress = function(evt) {
                    if(! _dragEnabled)return;

                    if (isClickableElement(evt)) {
                        return;
                    }

                    if (evt.type == "mousedown" && evt.button != 0) {
                        // Do not start dragging on right-click
                        return;
                    }

                    if(_hasTouch){
                        cancelPress();
                        _pressTimer = setTimeout(function(){
                            cancelPress();
                            onlongpress(evt);
                        },100);
                        $document.on(_moveEvents, cancelPress);
                        $document.on(_releaseEvents, cancelPress);
                    }else{
                        onlongpress(evt);
                    }

                };

                var cancelPress = function() {
                    clearTimeout(_pressTimer);
                    $document.off(_moveEvents, cancelPress);
                    $document.off(_releaseEvents, cancelPress);
                };

                var onlongpress = function(evt) {
                    if(! _dragEnabled)return;
                    evt.preventDefault();

                    offset = element[0].getBoundingClientRect();
                    if(allowTransform)
                        _dragOffset = offset;
                    else{
                        _dragOffset = {left:document.body.scrollLeft, top:document.body.scrollTop};
                    }


                    element.centerX = element[0].offsetWidth / 2;
                    element.centerY = element[0].offsetHeight / 2;

                    _mx = ngDraggable.inputEvent(evt).pageX;//ngDraggable.getEventProp(evt, 'pageX');
                    _my = ngDraggable.inputEvent(evt).pageY;//ngDraggable.getEventProp(evt, 'pageY');
                    _mrx = _mx - offset.left;
                    _mry = _my - offset.top;
                    if (_centerAnchor) {
                        _tx = _mx - element.centerX - $window.pageXOffset;
                        _ty = _my - element.centerY - $window.pageYOffset;
                    } else {
                        _tx = _mx - _mrx - $window.pageXOffset;
                        _ty = _my - _mry - $window.pageYOffset;
                    }

                    $document.on(_moveEvents, onmove);
                    $document.on(_releaseEvents, onrelease);
                    // This event is used to receive manually triggered mouse move events
                    // jqLite unfortunately only supports triggerHandler(...)
                    // See http://api.jquery.com/triggerHandler/
                    // _deregisterRootMoveListener = $rootScope.$on('draggable:_triggerHandlerMove', onmove);
                    _deregisterRootMoveListener = $rootScope.$on('draggable:_triggerHandlerMove', function(event, origEvent) {
                        onmove(origEvent);
                    });
                };

                var onmove = function (evt) {
                    if (!_dragEnabled)return;
                    evt.preventDefault();

                    if (!element.hasClass('dragging')) {
                        _data = getDragData(scope);
                        element.addClass('dragging');
                        $rootScope.$broadcast('draggable:start', {x:_mx, y:_my, tx:_tx, ty:_ty, event:evt, element:element, data:_data});

                        if (onDragStartCallback ){
                            scope.$apply(function () {
                                onDragStartCallback(scope, {$data: _data, $event: evt});
                            });
                        }
                    }

                    _mx = ngDraggable.inputEvent(evt).pageX;//ngDraggable.getEventProp(evt, 'pageX');
                    _my = ngDraggable.inputEvent(evt).pageY;//ngDraggable.getEventProp(evt, 'pageY');

                    if (_centerAnchor) {
                        _tx = _mx - element.centerX - _dragOffset.left;
                        _ty = _my - element.centerY - _dragOffset.top;
                    } else {
                        _tx = _mx - _mrx - _dragOffset.left;
                        _ty = _my - _mry - _dragOffset.top;
                    }

                    moveElement(_tx, _ty);

                    $rootScope.$broadcast('draggable:move', { x: _mx, y: _my, tx: _tx, ty: _ty, event: evt, element: element, data: _data, uid: _myid, dragOffset: _dragOffset });
                };

                var onrelease = function(evt) {
                    if (!_dragEnabled)
                        return;
                    evt.preventDefault();
                    $rootScope.$broadcast('draggable:end', {x:_mx, y:_my, tx:_tx, ty:_ty, event:evt, element:element, data:_data, callback:onDragComplete, uid: _myid});
                    element.removeClass('dragging');
                    element.parent().find('.drag-enter').removeClass('drag-enter');
                    reset();
                    $document.off(_moveEvents, onmove);
                    $document.off(_releaseEvents, onrelease);

                    if (onDragStopCallback ){
                        scope.$apply(function () {
                            onDragStopCallback(scope, {$data: _data, $event: evt});
                        });
                    }

                    _deregisterRootMoveListener();
                };

                var onDragComplete = function(evt) {


                    if (!onDragSuccessCallback )return;

                    scope.$apply(function () {
                        onDragSuccessCallback(scope, {$data: _data, $event: evt});
                    });
                };

                var reset = function() {
                    if(allowTransform)
                        element.css({transform:'', 'z-index':'', '-webkit-transform':'', '-ms-transform':''});
                    else
                        element.css({'position':'',top:'',left:''});
                };

                var moveElement = function (x, y) {
                    if(allowTransform) {
                        element.css({
                            transform: 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, ' + x + ', ' + y + ', 0, 1)',
                            'z-index': 99999,
                            '-webkit-transform': 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, ' + x + ', ' + y + ', 0, 1)',
                            '-ms-transform': 'matrix(1, 0, 0, 1, ' + x + ', ' + y + ')'
                        });
                    }else{
                        element.css({'left':x+'px','top':y+'px', 'position':'fixed'});
                    }
                };
                initialize();
            }
        };
    }])

    .directive('ngDrop', ['$parse', '$timeout', '$window', '$document', 'ngDraggable', function ($parse, $timeout, $window, $document, ngDraggable) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.value = attrs.ngDrop;
                scope.isTouching = false;

                var _lastDropTouch=null;

                var _myid = scope.$id;

                var _dropEnabled=false;

                var onDropCallback = $parse(attrs.ngDropSuccess);// || function(){};

                var onDragStartCallback = $parse(attrs.ngDragStart);
                var onDragStopCallback = $parse(attrs.ngDragStop);
                var onDragMoveCallback = $parse(attrs.ngDragMove);

                var initialize = function () {
                    toggleListeners(true);
                };

                var toggleListeners = function (enable) {
                    // remove listeners

                    if (!enable)return;
                    // add listeners.
                    scope.$watch(attrs.ngDrop, onEnableChange);
                    scope.$on('$destroy', onDestroy);
                    scope.$on('draggable:start', onDragStart);
                    scope.$on('draggable:move', onDragMove);
                    scope.$on('draggable:end', onDragEnd);
                };

                var onDestroy = function (enable) {
                    toggleListeners(false);
                };
                var onEnableChange = function (newVal, oldVal) {
                    _dropEnabled=newVal;
                };
                var onDragStart = function(evt, obj) {
                    if(! _dropEnabled)return;
                    isTouching(obj.x,obj.y,obj.element);

                    if (attrs.ngDragStart) {
                        $timeout(function(){
                            onDragStartCallback(scope, {$data: obj.data, $event: obj});
                        });
                    }
                };
                var onDragMove = function(evt, obj) {
                    if(! _dropEnabled)return;
                    isTouching(obj.x,obj.y,obj.element);

                    if (attrs.ngDragMove) {
                        $timeout(function(){
                            onDragMoveCallback(scope, {$data: obj.data, $event: obj});
                        });
                    }
                };

                var onDragEnd = function (evt, obj) {

                    // don't listen to drop events if this is the element being dragged
                    // only update the styles and return
                    if (!_dropEnabled || _myid === obj.uid) {
                        updateDragStyles(false, obj.element);
                        return;
                    }
                    if (isTouching(obj.x, obj.y, obj.element)) {
                        // call the ngDraggable ngDragSuccess element callback
                        if(obj.callback){
                            obj.callback(obj);
                        }

                        if (attrs.ngDropSuccess) {
                            $timeout(function(){
                                onDropCallback(scope, {$data: obj.data, $event: obj, $target: scope.$eval(scope.value)});
                            });
                        }
                    }

                    if (attrs.ngDragStop) {
                        $timeout(function(){
                            onDragStopCallback(scope, {$data: obj.data, $event: obj});
                        });
                    }

                    updateDragStyles(false, obj.element);
                };

                var isTouching = function(mouseX, mouseY, dragElement) {
                    var touching= hitTest(mouseX, mouseY);
                    scope.isTouching = touching;
                    if(touching){
                        _lastDropTouch = element;
                    }
                    updateDragStyles(touching, dragElement);
                    return touching;
                };

                var updateDragStyles = function(touching, dragElement) {
                    if(touching){
                        element.addClass('drag-enter');
                        dragElement.addClass('drag-over');
                    }else if(_lastDropTouch == element){
                        _lastDropTouch=null;
                        element.removeClass('drag-enter');
                        dragElement.removeClass('drag-over');
                    }
                };

                var hitTest = function(x, y) {
                    var bounds = element[0].getBoundingClientRect();// ngDraggable.getPrivOffset(element);
                    x -= $document[0].body.scrollLeft + $document[0].documentElement.scrollLeft;
                    y -= $document[0].body.scrollTop + $document[0].documentElement.scrollTop;
                    return  x >= bounds.left
                        && x <= bounds.right
                        && y <= bounds.bottom
                        && y >= bounds.top;
                };

                initialize();
            }
        };
    }])
    .directive('ngDragClone', ['$parse', '$timeout', 'ngDraggable', function ($parse, $timeout, ngDraggable) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var img, _allowClone=true;
                var _dragOffset = null;
                scope.clonedData = {};
                var initialize = function () {

                    img = element.find('img');
                    element.attr('draggable', 'false');
                    img.attr('draggable', 'false');
                    reset();
                    toggleListeners(true);
                };


                var toggleListeners = function (enable) {
                    // remove listeners

                    if (!enable)return;
                    // add listeners.
                    scope.$on('draggable:start', onDragStart);
                    scope.$on('draggable:move', onDragMove);
                    scope.$on('draggable:end', onDragEnd);
                    preventContextMenu();

                };
                var preventContextMenu = function() {
                    //  element.off('mousedown touchstart touchmove touchend touchcancel', absorbEvent_);
                    img.off('mousedown touchstart touchmove touchend touchcancel', absorbEvent_);
                    //  element.on('mousedown touchstart touchmove touchend touchcancel', absorbEvent_);
                    img.on('mousedown touchstart touchmove touchend touchcancel', absorbEvent_);
                };
                var onDragStart = function(evt, obj, elm) {
                    _allowClone=true;
                    if(angular.isDefined(obj.data.allowClone)){
                        _allowClone=obj.data.allowClone;
                    }
                    if(_allowClone) {
                        scope.$apply(function () {
                            scope.clonedData = obj.data;
                        });
                        element.css('width', obj.element[0].offsetWidth);
                        element.css('height', obj.element[0].offsetHeight);

                        moveElement(obj.tx, obj.ty);
                    }

                };
                var onDragMove = function(evt, obj) {
                    if(_allowClone) {

                        _tx = obj.tx + obj.dragOffset.left;
                        _ty = obj.ty + obj.dragOffset.top;

                        moveElement(_tx, _ty);
                    }
                };
                var onDragEnd = function(evt, obj) {
                    //moveElement(obj.tx,obj.ty);
                    if(_allowClone) {
                        reset();
                    }
                };

                var reset = function() {
                    element.css({left:0,top:0, position:'fixed', 'z-index':-1, visibility:'hidden'});
                };
                var moveElement = function(x,y) {
                    element.css({
                        transform: 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, '+x+', '+y+', 0, 1)', 'z-index': 99999, 'visibility': 'visible',
                        '-webkit-transform': 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, '+x+', '+y+', 0, 1)',
                        '-ms-transform': 'matrix(1, 0, 0, 1, '+x+', '+y+')'
                        //,margin: '0'  don't monkey with the margin,
                    });
                };

                var absorbEvent_ = function (event) {
                    var e = event;//.originalEvent;
                    e.preventDefault && e.preventDefault();
                    e.stopPropagation && e.stopPropagation();
                    e.cancelBubble = true;
                    e.returnValue = false;
                    return false;
                };

                initialize();
            }
        };
    }])
    .directive('ngPreventDrag', ['$parse', '$timeout', function ($parse, $timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var initialize = function () {

                    element.attr('draggable', 'false');
                    toggleListeners(true);
                };


                var toggleListeners = function (enable) {
                    // remove listeners

                    if (!enable)return;
                    // add listeners.
                    element.on('mousedown touchstart touchmove touchend touchcancel', absorbEvent_);
                };


                var absorbEvent_ = function (event) {
                    var e = event.originalEvent;
                    e.preventDefault && e.preventDefault();
                    e.stopPropagation && e.stopPropagation();
                    e.cancelBubble = true;
                    e.returnValue = false;
                    return false;
                };

                initialize();
            }
        };
    }])
    .directive('ngCancelDrag', [function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.find('*').attr('ng-cancel-drag', 'ng-cancel-drag');
            }
        };
    }])
    .directive('ngDragScroll', ['$window', '$interval', '$timeout', '$document', '$rootScope', function($window, $interval, $timeout, $document, $rootScope) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var intervalPromise = null;
                var lastMouseEvent = null;

                var config = {
                    verticalScroll: attrs.verticalScroll || true,
                    horizontalScroll: attrs.horizontalScroll || true,
                    activationDistance: attrs.activationDistance || 75,
                    scrollDistance: attrs.scrollDistance || 15
                };


                var reqAnimFrame = (function() {
                    return window.requestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        window.oRequestAnimationFrame ||
                        window.msRequestAnimationFrame ||
                        function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {
                            window.setTimeout(callback, 1000 / 60);
                        };
                })();

                var animationIsOn = false;
                var createInterval = function() {
                    animationIsOn = true;

                    function nextFrame(callback) {
                        var args = Array.prototype.slice.call(arguments);
                        if(animationIsOn) {
                            reqAnimFrame(function () {
                                $rootScope.$apply(function () {
                                    callback.apply(null, args);
                                    nextFrame(callback);
                                });
                            })
                        }
                    }

                    nextFrame(function() {
                        if (!lastMouseEvent) return;

                        var viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
                        var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

                        var scrollX = 0;
                        var scrollY = 0;

                        if (config.horizontalScroll) {
                            // If horizontal scrolling is active.
                            if (lastMouseEvent.clientX < config.activationDistance) {
                                // If the mouse is on the left of the viewport within the activation distance.
                                scrollX = -config.scrollDistance;
                            }
                            else if (lastMouseEvent.clientX > viewportWidth - config.activationDistance) {
                                // If the mouse is on the right of the viewport within the activation distance.
                                scrollX = config.scrollDistance;
                            }
                        }

                        if (config.verticalScroll) {
                            // If vertical scrolling is active.
                            if (lastMouseEvent.clientY < config.activationDistance) {
                                // If the mouse is on the top of the viewport within the activation distance.
                                scrollY = -config.scrollDistance;
                            }
                            else if (lastMouseEvent.clientY > viewportHeight - config.activationDistance) {
                                // If the mouse is on the bottom of the viewport within the activation distance.
                                scrollY = config.scrollDistance;
                            }
                        }



                        if (scrollX !== 0 || scrollY !== 0) {
                            // Record the current scroll position.
                            var currentScrollLeft = ($window.pageXOffset || $document[0].documentElement.scrollLeft);
                            var currentScrollTop = ($window.pageYOffset || $document[0].documentElement.scrollTop);

                            // Remove the transformation from the element, scroll the window by the scroll distance
                            // record how far we scrolled, then reapply the element transformation.
                            var elementTransform = element.css('transform');
                            element.css('transform', 'initial');

                            $window.scrollBy(scrollX, scrollY);

                            var horizontalScrollAmount = ($window.pageXOffset || $document[0].documentElement.scrollLeft) - currentScrollLeft;
                            var verticalScrollAmount =  ($window.pageYOffset || $document[0].documentElement.scrollTop) - currentScrollTop;

                            element.css('transform', elementTransform);

                            lastMouseEvent.pageX += horizontalScrollAmount;
                            lastMouseEvent.pageY += verticalScrollAmount;

                            $rootScope.$emit('draggable:_triggerHandlerMove', lastMouseEvent);
                        }

                    });
                };

                var clearInterval = function() {
                    animationIsOn = false;
                };

                scope.$on('draggable:start', function(event, obj) {
                    // Ignore this event if it's not for this element.
                    if (obj.element[0] !== element[0]) return;

                    if (!animationIsOn) createInterval();
                });

                scope.$on('draggable:end', function(event, obj) {
                    // Ignore this event if it's not for this element.
                    if (obj.element[0] !== element[0]) return;

                    if (animationIsOn) clearInterval();
                });

                scope.$on('draggable:move', function(event, obj) {
                    // Ignore this event if it's not for this element.
                    if (obj.element[0] !== element[0]) return;

                    lastMouseEvent = obj.event;
                });
            }
        };
    }]);
