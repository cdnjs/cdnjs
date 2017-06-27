angular.module('app', [])
    .directive('resizable', function() {
        return {
            restrict: 'AE',
            scope: {
                rDirections: "=",
                rCenteredX: "=",
                rCenteredY: "=",
                rFlex: "="
            },
            link: function(scope, element, attr) {

                element.addClass('resizable');

                var style = window.getComputedStyle(element[0], null),
                    w,
                    h,
                    dir = scope.rDirections,
                    vx = scope.rCenteredX ? 2 : 1, // if centered double velocity
                    vy = scope.rCenteredY ? 2 : 1, // if centered double velocity
                    start,
                    dragDir,
                    axis;

                var drag = function(e) {
                    var offset = axis == 'x' ? start - e.clientX : start - e.clientY;
                    switch(dragDir) {
                        case 'top':
                            if(scope.rFlex) { element[0].style.flexBasis = h + (offset * vy) + 'px'; }
                            else {            element[0].style.height = h + (offset * vy) + 'px'; }          
                            break;
                        case 'right':
                            if(scope.rFlex) { element[0].style.flexBasis = w - (offset * vx) + 'px'; }
                            else {            element[0].style.width = w - (offset * vx) + 'px'; }
                            break;
                        case 'bottom':
                            if(scope.rFlex) { element[0].style.flexBasis = h - (offset * vy) + 'px'; }
                            else {            element[0].style.height = h - (offset * vy) + 'px'; }
                            break;
                        case 'left':
                            if(scope.rFlex) { element[0].style.flexBasis = w + (offset * vx) + 'px'; }
                            else {            element[0].style.width = w + (offset * vx) + 'px'; }
                            break;
                    }
                };
                var dragStart = function(e, direction) {
                    dragDir = direction;
                    axis = dragDir == 'left' || dragDir == 'right' ? 'x' : 'y';
                    start = axis == 'x' ? e.clientX : e.clientY;
                    w = parseInt(style.getPropertyValue("width"));
                    h = parseInt(style.getPropertyValue("height"));
                    
                    //prevent transition while dragging
                    element.addClass('no-transition');

                    document.addEventListener('mouseup', function() {
                        document.removeEventListener('mousemove', drag, false);
                        element.removeClass('no-transition');
                    });
                    document.addEventListener('mousemove', drag, false);
                    
                    // Disable highlighting while dragging
                    if(e.stopPropagation) e.stopPropagation();
                    if(e.preventDefault) e.preventDefault();
                    e.cancelBubble = true;
                    e.returnValue = false;
                };

                for(var i=0;i<dir.length;i++) {
                    (function () {
                        var grabber = document.createElement('div'),
                            direction = dir[i];

                        // add class for styling purposes
                        grabber.setAttribute('class', 'rg-' + dir[i]);
                        grabber.innerHTML = '<span></span>';
                        element[0].appendChild(grabber);
                        grabber.ondragstart = function() { return false }
                        grabber.addEventListener('mousedown', function(e) {
                            dragStart(e, direction);
                        }, false);
                    }())
                }

            }
        }
    });