/*
 *
 * https://github.com/fatlinesofcode/ngDraggable
 */
angular.module("ngDraggable", [])
        .service('ngDraggable', ['$window', function($window) {

            var isDef = function(val) { return typeof val !== 'undefined'; };

            this.getEventProp = function getEventProp(evt, prop, skipOriginal) {
                if (isDef(evt.touches) && evt.touches[0]) {
                    return evt.touches[0][prop];
                }
                if (isDef(evt[prop])) {
                    return evt[prop];
                }
                if (evt.originalEvent && !skipOriginal) {
                    return this.getEventProp(evt.originalEvent, prop, true);
                }
            };

            this.getPrivOffset = function getPrivOffset(docElem) {
                var box = { top: 0, left: 0 };
                if (isDef(docElem[0].getBoundingClientRect)) {
                    box = docElem[0].getBoundingClientRect();
                }
                return {
                    top: box.top + $window.pageYOffset - docElem[0].clientTop,
                    left: box.left + $window.pageXOffset - docElem[0].clientLeft
                };
            }

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

                    // to identify the element in order to prevent getting superflous events when a single element has both drag and drop directives on it.
                    var _myid = scope.$id; 
                    var _data = null;

                    var _dragEnabled = false;

                    var _pressTimer = null;

                    var onDragSuccessCallback = $parse(attrs.ngDragSuccess) || null;

                    var initialize = function () {
                        element.attr('draggable', 'false'); // prevent native drag
                        toggleListeners(true);
                    };

                    var toggleListeners = function (enable) {
                        if (!enable)return;
                        // add listeners.

                        scope.$on('$destroy', onDestroy);                       
                        scope.$watch(attrs.ngDrag, onEnableChange);                     
                        scope.$watch(attrs.ngCenterAnchor, onCenterAnchor);
                        scope.$watch(attrs.ngDragData, onDragDataChange);
                        element.on(_pressEvents, onpress);
                        if(! _hasTouch && element[0].nodeName.toLowerCase() == "img"){
                            element.on('mousedown', function(){ return false;}); // prevent native drag for images
                        }
                    };
                    var onDestroy = function (enable) {
                        toggleListeners(false);
                    };
                    var onDragDataChange = function (newVal, oldVal) {
                        _data = newVal;
                    };
                    var onEnableChange = function (newVal, oldVal) {
                        _dragEnabled = (newVal);
                    };
                    var onCenterAnchor = function (newVal, oldVal) {
                        if(angular.isDefined(newVal))
                        _centerAnchor = (newVal || 'true');
                    }
                    
                    var isClickableElement = function (evt) {
                        return (
                                angular.isDefined(angular.element(evt.target).attr("ng-click"))
                                || angular.isDefined(angular.element(evt.target).attr("ng-dblclick"))
                                || angular.isDefined(angular.element(evt.target).attr("ng-cancel-drag"))
                                );
                    }
                    /*
                     * When the element is clicked start the drag behaviour
                     * On touch devices as a small delay so as not to prevent native window scrolling
                     */
                    var onpress = function(evt) {
                        if(! _dragEnabled)return;

                        // disable drag on clickable element
                        if (isClickableElement(evt)) {
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

                    }
                    var cancelPress = function() {
                        clearTimeout(_pressTimer);
                        $document.off(_moveEvents, cancelPress);
                        $document.off(_releaseEvents, cancelPress);
                    }
                    var onlongpress = function(evt) {
                        if(! _dragEnabled)return;
                        evt.preventDefault();
                        element.addClass('dragging');
                        offset = ngDraggable.getPrivOffset(element);

                        element.centerX = element[0].offsetWidth / 2;
                        element.centerY = element[0].offsetHeight / 2;    
                        
                        _mx = ngDraggable.getEventProp(evt, 'pageX');
                        _my = ngDraggable.getEventProp(evt, 'pageY');
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
                        $rootScope.$broadcast('draggable:start', {x:_mx, y:_my, tx:_tx, ty:_ty, event:evt, element:element, data:_data});
                    }

                    var onmove = function (evt) {
                        if (!_dragEnabled)return;
                        evt.preventDefault();

                        _mx = ngDraggable.getEventProp(evt, 'pageX');
                        _my = ngDraggable.getEventProp(evt, 'pageY');

                         if (_centerAnchor) {
                             _tx = _mx - element.centerX - $window.pageXOffset;
                             _ty = _my - element.centerY - $window.pageYOffset;
                        } else {
                             _tx = _mx - _mrx - $window.pageXOffset;
                             _ty = _my - _mry - $window.pageYOffset;
                        }

                        moveElement(_tx, _ty);

                        $rootScope.$broadcast('draggable:move', { x: _mx, y: _my, tx: _tx, ty: _ty, event: evt, element: element, data: _data, uid: _myid });
                    }

                    var onrelease = function(evt) {
                        if (!_dragEnabled)
                            return;
                        evt.preventDefault();
                        $rootScope.$broadcast('draggable:end', {x:_mx, y:_my, tx:_tx, ty:_ty, event:evt, element:element, data:_data, callback:onDragComplete, uid: _myid});
                        element.removeClass('dragging');
                        reset();
                        $document.off(_moveEvents, onmove);
                        $document.off(_releaseEvents, onrelease);
                    }

                    var onDragComplete = function(evt) {
                        if (!onDragSuccessCallback )return;

                        scope.$apply(function () {
                            onDragSuccessCallback(scope, {$data: _data, $event: evt});
                        });
                    }

                    var reset = function() {
                        element.css({left:'',top:'', position:'', 'z-index':'', margin: ''});
                    }

                    var moveElement = function (x, y) {
                        element.css({
                            left: (x+'px'), top: (y+'px'), position: 'fixed', 'z-index': 99999
                            //,margin: '0'  don't monkey with the margin, 
                        });
                    }
                    initialize();
                }
            }
        }])

        .directive('ngDrop', ['$parse', '$timeout', '$window', 'ngDraggable', function ($parse, $timeout, $window, ngDraggable) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    scope.value = attrs.ngDrop;

                    var _myid = scope.$id;

                    var _dropEnabled=false;

                    var onDropCallback = $parse(attrs.ngDropSuccess);// || function(){};

                    var initialize = function () {
                        toggleListeners(true);
                    };

                    var toggleListeners = function (enable) {
                        // remove listeners

                        if (!enable)return;
                        // add listeners.
                        attrs.$observe("ngDrop", onEnableChange);
                        scope.$on('$destroy', onDestroy);
                        //scope.$watch(attrs.uiDraggable, onDraggableChange);
                        scope.$on('draggable:start', onDragStart);
                        scope.$on('draggable:move', onDragMove);
                        scope.$on('draggable:end', onDragEnd);
                    };

                    var onDestroy = function (enable) {
                        toggleListeners(false);
                    };
                    var onEnableChange = function (newVal, oldVal) {
                        _dropEnabled=scope.$eval(newVal);
                    }
                    var onDragStart = function(evt, obj) {
                        if(! _dropEnabled)return;
                        isTouching(obj.x,obj.y,obj.element);
                    }
                    var onDragMove = function(evt, obj) {
                        if(! _dropEnabled)return;
                        isTouching(obj.x,obj.y,obj.element);
                    }

                    var onDragEnd = function (evt, obj) {
                        
                        // don't listen to drop events if this is the element being dragged
                        if (!_dropEnabled || _myid === obj.uid)return;
                        if (isTouching(obj.x, obj.y, obj.element)) {
                            // call the ngDraggable ngDragSuccess element callback
                           if(obj.callback){
                                obj.callback(obj);
                            }

                            $timeout(function(){
                                onDropCallback(scope, {$data: obj.data, $event: obj});
                            });
                        }
                        updateDragStyles(false, obj.element);
                    }

                    var isTouching = function(mouseX, mouseY, dragElement) {
                        var touching= hitTest(mouseX, mouseY);
                        updateDragStyles(touching, dragElement);
                        return touching;
                    }

                    var updateDragStyles = function(touching, dragElement) {
                        if(touching){
                            element.addClass('drag-enter');
                            dragElement.addClass('drag-over');
                        }else{
                            element.removeClass('drag-enter');
                            dragElement.removeClass('drag-over');
                        }
                    }

                    var hitTest = function(x, y) {
                        var bounds = ngDraggable.getPrivOffset(element);
                        bounds.right = bounds.left + element[0].offsetWidth;
                        bounds.bottom = bounds.top + element[0].offsetHeight;
                        return  x >= bounds.left
                                && x <= bounds.right
                                && y <= bounds.bottom
                                && y >= bounds.top;
                    }

                    initialize();
                }
            }
        }])
        .directive('ngDragClone', ['$parse', '$timeout', function ($parse, $timeout) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    var img, _allowClone=true;
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
                    }
                    var onDragStart = function(evt, obj, elm) {
                        _allowClone=true
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
                    }
                    var onDragMove = function(evt, obj) {
                        if(_allowClone) {
                            moveElement(obj.tx, obj.ty);
                        }
                    }
                    var onDragEnd = function(evt, obj) {
                        //moveElement(obj.tx,obj.ty);
                        if(_allowClone) {
                            reset();
                        }
                    }

                    var reset = function() {
                        element.css({left:0,top:0, position:'fixed', 'z-index':-1, visibility:'hidden'});
                    }
                    var moveElement = function(x,y) {
                        element.css({
                            left: (x+'px'), top: (y+'px'), position: 'fixed', 'z-index': 99999, 'visibility': 'visible'
                            //,margin: '0'  don't monkey with the margin, 
                        });
                    }

                    var absorbEvent_ = function (event) {
                        var e = event.originalEvent;
                        e.preventDefault && e.preventDefault();
                        e.stopPropagation && e.stopPropagation();
                        e.cancelBubble = true;
                        e.returnValue = false;
                        return false;
                    }

                    initialize();
                }
            }
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
                }

                initialize();
            }
        }
    }])
    .directive('ngCancelDrag', [function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.find('*').attr('ng-cancel-drag', 'ng-cancel-drag');
            }
        }
    }]);
