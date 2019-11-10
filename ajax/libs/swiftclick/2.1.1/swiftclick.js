/*
 * @license MIT License (see license.txt)
 */

'use strict';

function SwiftClick (contextEl)
{
    // if SwiftClick has already been initialised on this element then return the instance that's already in the Dictionary.
    if (typeof SwiftClick.swiftDictionary[contextEl] !== 'undefined') return SwiftClick.swiftDictionary[contextEl];

    // add this instance of SwiftClick to the dictionary using the contextEl as the key.
    SwiftClick.swiftDictionary[contextEl] = this;

    this.options =
    {
        elements: {a:'a', div:'div', span:'span', button:'button'},
        minTouchDrift: 4,
        maxTouchDrift: 16,
        useCssParser: false
    };

    var _self                           = this;
    var _swiftContextEl                 = contextEl;
    var _swiftContextElOriginalClick    = _swiftContextEl.onclick;
    var _currentlyTrackingTouch         = false;
    var _touchStartPoint                = {x:0, y:0};
    var _scrollStartPoint               = {x:0, y:0};
    var _clickedAlready                 = false;


    // SwiftClick is only initialised if both touch and orientationchange are supported.
    if ('onorientationchange' in window && 'ontouchstart' in window)
    {
        init();
    }

    function init ()
    {
        // check if the swift el already has a click handler and if so hijack it so it get's fired after SwiftClick's, instead of beforehand.
        if (typeof _swiftContextElOriginalClick === 'function')
        {
            _swiftContextEl.addEventListener('click', hijackedSwiftElClickHandler, false);
            _swiftContextEl.onclick = null;
        }

        _swiftContextEl.addEventListener('touchstart', touchStartHandler, false);
        _swiftContextEl.addEventListener('click', clickHandler, true);
    }

    function hijackedSwiftElClickHandler (event)
    {
        _swiftContextElOriginalClick(event);
    }

    function touchStartHandler (event)
    {
        var targetEl = event.target;
        var nodeName = targetEl.nodeName.toLowerCase();
        var touch = event.changedTouches[0];

        // don't synthesize an event if the node is not an acceptable type (the type isn't in the dictionary).
        if (typeof _self.options.elements[nodeName] === 'undefined')
        {
            return true;
        }

        // don't synthesize an event if we are already tracking an element.
        if (_currentlyTrackingTouch)
        {
            return true;
        }

        // check parents for 'swiftclick-ignore' class name.
        if (_self.options.useCssParser && checkIfElementShouldBeIgnored(targetEl))
        {
            _clickedAlready = false;
            return true;
        }

        event.stopPropagation();

        _currentlyTrackingTouch = true;

        // store touchstart positions so we can check for changes later (within touchend handler).
        _touchStartPoint.x = touch.pageX;
        _touchStartPoint.y = touch.pageY;
        _scrollStartPoint = getScrollPoint();

        // only add the 'touchend' listener now that we know the element should be tracked.
        targetEl.removeEventListener('touchend', touchEndHandler, false);
        targetEl.addEventListener('touchend', touchEndHandler, false);

        targetEl.removeEventListener('touchcancel', touchCancelHandler, false);
        targetEl.addEventListener('touchcancel', touchCancelHandler, false);
    }

    function touchEndHandler (event)
    {
        var targetEl = event.target;
        var touchend = event.changedTouches[0];

        targetEl.removeEventListener('touchend', touchEndHandler, false);
        
        _currentlyTrackingTouch = false;

        // don't synthesize a click event if the touchpoint position has drifted significantly, as the user is not trying to click.
        if (hasTouchDriftedTooFar(touchend))
        {
            return true;
        }

        // prevent default actions and create a synthetic click event before returning false.
        event.stopPropagation();
        event.preventDefault();

        _clickedAlready = false;

        targetEl.focus();
        synthesizeClickEvent(targetEl, touchend);

        // return false in order to surpress the regular click event.
        return false;
    }

    function touchCancelHandler(event) {
        event.target.removeEventListener('touchcancel', touchCancelHandler, false);

        _currentlyTrackingTouch = false;
    }

    function clickHandler (event)
    {
        var targetEl = event.target;
        var nodeName = targetEl.nodeName.toLowerCase();

        if (typeof _self.options.elements[nodeName] !== 'undefined')
        {
            if (_clickedAlready)
            {
                _clickedAlready = false;

                event.stopPropagation();
                event.preventDefault();
                return false;
            }

            _clickedAlready = true;
        }
    }

    function synthesizeClickEvent (el, touchend)
    {
        var clickEvent = document.createEvent('MouseEvents');
        clickEvent.initMouseEvent('click', true, true, window, 1, touchend.screenX, touchend.screenY, touchend.clientX, touchend.clientY, false, false, false, false, 0, null);
        
        el.dispatchEvent(clickEvent);
    }

    function getScrollPoint ()
    {
        var scrollPoint =
        {
            x : window.pageXOffset ||
                document.body.scrollLeft ||
                document.documentElement.scrollLeft ||
                0,
            y : window.pageYOffset ||
                document.body.scrollTop ||
                document.documentElement.scrollTop ||
                0
        };

        return scrollPoint;
    }

    function checkIfElementShouldBeIgnored (el)
    {
        var classToIgnore = 'swiftclick-ignore';
        var classToForceClick = 'swiftclick-force';
        var parentEl = el.parentNode;
        var shouldIgnoreElement = false;
        
        // ignore the target el and return early if it has the 'swiftclick-ignore' class.
        if (hasClass(el, classToIgnore))
        {
            return true;
        }

        // don't ignore the target el and return early if it has the 'swiftclick-force' class.
        if (hasClass(el, classToForceClick))
        {
            return shouldIgnoreElement;
        }

        // the topmost element has been reached.
        if (parentEl === null)
        {
            return shouldIgnoreElement;
        }

        // ignore the target el if one of its parents has the 'swiftclick-ignore' class.
        while (parentEl)
        {
            if (hasClass(parentEl, classToIgnore))
            {
                parentEl = null;
                shouldIgnoreElement = true;
            }
            else
            {
                parentEl = parentEl.parentNode;
            }
        }

        return shouldIgnoreElement;
    }

    function hasTouchDriftedTooFar (touchend)
    {
        var maxDrift = _self.options.maxTouchDrift;
        var scrollPoint = getScrollPoint();

        return  Math.abs(touchend.pageX - _touchStartPoint.x) > maxDrift ||
                Math.abs(touchend.pageY - _touchStartPoint.y) > maxDrift ||
                Math.abs(scrollPoint.x - _scrollStartPoint.x) > maxDrift ||
                Math.abs(scrollPoint.y - _scrollStartPoint.y) > maxDrift;
    }

    function hasClass (el, className) {

        var classExists = typeof el.className !== 'undefined' ? (' ' + el.className + ' ').indexOf(' ' + className + ' ') > -1 : false;

        return classExists;
    }
}

SwiftClick.swiftDictionary = {};

SwiftClick.prototype.setMaxTouchDrift = function (maxTouchDrift)
{
    if (typeof maxTouchDrift !== 'number')
    {
        throw new TypeError ('expected "maxTouchDrift" to be of type "number"');
    }

    if (maxTouchDrift < this.options.minTouchDrift)
    {
        maxTouchDrift = this.options.minTouchDrift;
    }

    this.options.maxTouchDrift = maxTouchDrift;
};

// add an array of node names (strings) for which swift clicks should be synthesized.
SwiftClick.prototype.addNodeNamesToTrack = function (nodeNamesArray)
{
    var i = 0;
    var length = nodeNamesArray.length;
    var currentNodeName;

    for (i; i < length; i++)
    {
        if (typeof nodeNamesArray[i] !== 'string')
        {
            throw new TypeError ('all values within the "nodeNames" array must be of type "string"');
        }

        currentNodeName = nodeNamesArray[i].toLowerCase();
        this.options.elements[currentNodeName] = currentNodeName;
    }
};

SwiftClick.prototype.replaceNodeNamesToTrack = function (nodeNamesArray)
{
    this.options.elements = {};
    this.addNodeNamesToTrack(nodeNamesArray);
};

SwiftClick.prototype.useCssParser = function (useParser)
{
    this.options.useCssParser = useParser;
};

// use a basic implementation of the composition pattern in order to create new instances of SwiftClick.
SwiftClick.attach = function (contextEl)
{
    // if SwiftClick has already been initialised on this element then return the instance that's already in the Dictionary.
    if (typeof SwiftClick.swiftDictionary[contextEl] !== 'undefined')
    {
        return SwiftClick.swiftDictionary[contextEl];
    }

    return new SwiftClick(contextEl);
};


// check for AMD/Module support, otherwise define SwiftClick as a global variable.
if (typeof define !== 'undefined' && define.amd)
{
    // AMD. Register as an anonymous module.
    define (function()
    {
        return SwiftClick;
    });

}
else if (typeof module !== 'undefined' && module.exports)
{
    module.exports = SwiftClick;
}
else
{
    window.SwiftClick = SwiftClick;
}