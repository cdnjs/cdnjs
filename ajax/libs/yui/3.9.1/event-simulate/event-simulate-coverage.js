if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/event-simulate/event-simulate.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/event-simulate/event-simulate.js",
    code: []
};
_yuitest_coverage["build/event-simulate/event-simulate.js"].code=["YUI.add('event-simulate', function (Y, NAME) {","","(function() {","/**"," * Simulate user interaction by generating native DOM events."," *"," * @module event-simulate"," * @requires event"," */","","//shortcuts","var L   = Y.Lang,","    isFunction  = L.isFunction,","    isString    = L.isString,","    isBoolean   = L.isBoolean,","    isObject    = L.isObject,","    isNumber    = L.isNumber,","","    //mouse events supported","    mouseEvents = {","        click:      1,","        dblclick:   1,","        mouseover:  1,","        mouseout:   1,","        mousedown:  1,","        mouseup:    1,","        mousemove:  1,","        contextmenu:1","    },","","    msPointerEvents = {","        MSPointerOver:  1,","        MSPointerOut:   1,","        MSPointerDown:  1,","        MSPointerUp:    1,","        MSPointerMove:  1","    },","","    //key events supported","    keyEvents   = {","        keydown:    1,","        keyup:      1,","        keypress:   1","    },","","    //HTML events supported","    uiEvents  = {","        submit:     1,","        blur:       1,","        change:     1,","        focus:      1,","        resize:     1,","        scroll:     1,","        select:     1","    },","","    //events that bubble by default","    bubbleEvents = {","        scroll:     1,","        resize:     1,","        reset:      1,","        submit:     1,","        change:     1,","        select:     1,","        error:      1,","        abort:      1","    },","    ","    //touch events supported","    touchEvents = {","        touchstart: 1,","        touchmove: 1,","        touchend: 1, ","        touchcancel: 1","    },","    ","    gestureEvents = {","        gesturestart: 1,","        gesturechange: 1,","        gestureend: 1","    };","","//all key, mouse and touch events bubble","Y.mix(bubbleEvents, mouseEvents);","Y.mix(bubbleEvents, keyEvents);","Y.mix(bubbleEvents, touchEvents);","","/*"," * Note: Intentionally not for YUIDoc generation."," * Simulates a key event using the given event information to populate"," * the generated event object. This method does browser-equalizing"," * calculations to account for differences in the DOM and IE event models"," * as well as different browser quirks. Note: keydown causes Safari 2.x to"," * crash."," * @method simulateKeyEvent"," * @private"," * @static"," * @param {HTMLElement} target The target of the given event."," * @param {String} type The type of event to fire. This can be any one of"," *      the following: keyup, keydown, and keypress."," * @param {Boolean} bubbles (Optional) Indicates if the event can be"," *      bubbled up. DOM Level 3 specifies that all key events bubble by"," *      default. The default is true."," * @param {Boolean} cancelable (Optional) Indicates if the event can be"," *      canceled using preventDefault(). DOM Level 3 specifies that all"," *      key events can be cancelled. The default"," *      is true."," * @param {Window} view (Optional) The view containing the target. This is"," *      typically the window object. The default is window."," * @param {Boolean} ctrlKey (Optional) Indicates if one of the CTRL keys"," *      is pressed while the event is firing. The default is false."," * @param {Boolean} altKey (Optional) Indicates if one of the ALT keys"," *      is pressed while the event is firing. The default is false."," * @param {Boolean} shiftKey (Optional) Indicates if one of the SHIFT keys"," *      is pressed while the event is firing. The default is false."," * @param {Boolean} metaKey (Optional) Indicates if one of the META keys"," *      is pressed while the event is firing. The default is false."," * @param {int} keyCode (Optional) The code for the key that is in use."," *      The default is 0."," * @param {int} charCode (Optional) The Unicode code for the character"," *      associated with the key being used. The default is 0."," */","function simulateKeyEvent(target /*:HTMLElement*/, type /*:String*/,","                             bubbles /*:Boolean*/,  cancelable /*:Boolean*/,","                             view /*:Window*/,","                             ctrlKey /*:Boolean*/,    altKey /*:Boolean*/,","                             shiftKey /*:Boolean*/,   metaKey /*:Boolean*/,","                             keyCode /*:int*/,        charCode /*:int*/) /*:Void*/","{","    //check target","    if (!target){","        Y.error(\"simulateKeyEvent(): Invalid target.\");","    }","","    //check event type","    if (isString(type)){","        type = type.toLowerCase();","        switch(type){","            case \"textevent\": //DOM Level 3","                type = \"keypress\";","                break;","            case \"keyup\":","            case \"keydown\":","            case \"keypress\":","                break;","            default:","                Y.error(\"simulateKeyEvent(): Event type '\" + type + \"' not supported.\");","        }","    } else {","        Y.error(\"simulateKeyEvent(): Event type must be a string.\");","    }","","    //setup default values","    if (!isBoolean(bubbles)){","        bubbles = true; //all key events bubble","    }","    if (!isBoolean(cancelable)){","        cancelable = true; //all key events can be cancelled","    }","    if (!isObject(view)){","        view = Y.config.win; //view is typically window","    }","    if (!isBoolean(ctrlKey)){","        ctrlKey = false;","    }","    if (!isBoolean(altKey)){","        altKey = false;","    }","    if (!isBoolean(shiftKey)){","        shiftKey = false;","    }","    if (!isBoolean(metaKey)){","        metaKey = false;","    }","    if (!isNumber(keyCode)){","        keyCode = 0;","    }","    if (!isNumber(charCode)){","        charCode = 0;","    }","","    //try to create a mouse event","    var customEvent /*:MouseEvent*/ = null;","","    //check for DOM-compliant browsers first","    if (isFunction(Y.config.doc.createEvent)){","","        try {","","            //try to create key event","            customEvent = Y.config.doc.createEvent(\"KeyEvents\");","","            /*","             * Interesting problem: Firefox implemented a non-standard","             * version of initKeyEvent() based on DOM Level 2 specs.","             * Key event was removed from DOM Level 2 and re-introduced","             * in DOM Level 3 with a different interface. Firefox is the","             * only browser with any implementation of Key Events, so for","             * now, assume it's Firefox if the above line doesn't error.","             */","            // @TODO: Decipher between Firefox's implementation and a correct one.","            customEvent.initKeyEvent(type, bubbles, cancelable, view, ctrlKey,","                altKey, shiftKey, metaKey, keyCode, charCode);","","        } catch (ex /*:Error*/){","","            /*","             * If it got here, that means key events aren't officially supported.","             * Safari/WebKit is a real problem now. WebKit 522 won't let you","             * set keyCode, charCode, or other properties if you use a","             * UIEvent, so we first must try to create a generic event. The","             * fun part is that this will throw an error on Safari 2.x. The","             * end result is that we need another try...catch statement just to","             * deal with this mess.","             */","            try {","","                //try to create generic event - will fail in Safari 2.x","                customEvent = Y.config.doc.createEvent(\"Events\");","","            } catch (uierror /*:Error*/){","","                //the above failed, so create a UIEvent for Safari 2.x","                customEvent = Y.config.doc.createEvent(\"UIEvents\");","","            } finally {","","                customEvent.initEvent(type, bubbles, cancelable);","","                //initialize","                customEvent.view = view;","                customEvent.altKey = altKey;","                customEvent.ctrlKey = ctrlKey;","                customEvent.shiftKey = shiftKey;","                customEvent.metaKey = metaKey;","                customEvent.keyCode = keyCode;","                customEvent.charCode = charCode;","","            }","","        }","","        //fire the event","        target.dispatchEvent(customEvent);","","    } else if (isObject(Y.config.doc.createEventObject)){ //IE","","        //create an IE event object","        customEvent = Y.config.doc.createEventObject();","","        //assign available properties","        customEvent.bubbles = bubbles;","        customEvent.cancelable = cancelable;","        customEvent.view = view;","        customEvent.ctrlKey = ctrlKey;","        customEvent.altKey = altKey;","        customEvent.shiftKey = shiftKey;","        customEvent.metaKey = metaKey;","","        /*","         * IE doesn't support charCode explicitly. CharCode should","         * take precedence over any keyCode value for accurate","         * representation.","         */","        customEvent.keyCode = (charCode > 0) ? charCode : keyCode;","","        //fire the event","        target.fireEvent(\"on\" + type, customEvent);","","    } else {","        Y.error(\"simulateKeyEvent(): No event simulation framework present.\");","    }","}","","/*"," * Note: Intentionally not for YUIDoc generation."," * Simulates a mouse event using the given event information to populate"," * the generated event object. This method does browser-equalizing"," * calculations to account for differences in the DOM and IE event models"," * as well as different browser quirks."," * @method simulateMouseEvent"," * @private"," * @static"," * @param {HTMLElement} target The target of the given event."," * @param {String} type The type of event to fire. This can be any one of"," *      the following: click, dblclick, mousedown, mouseup, mouseout,"," *      mouseover, and mousemove."," * @param {Boolean} bubbles (Optional) Indicates if the event can be"," *      bubbled up. DOM Level 2 specifies that all mouse events bubble by"," *      default. The default is true."," * @param {Boolean} cancelable (Optional) Indicates if the event can be"," *      canceled using preventDefault(). DOM Level 2 specifies that all"," *      mouse events except mousemove can be cancelled. The default"," *      is true for all events except mousemove, for which the default"," *      is false."," * @param {Window} view (Optional) The view containing the target. This is"," *      typically the window object. The default is window."," * @param {int} detail (Optional) The number of times the mouse button has"," *      been used. The default value is 1."," * @param {int} screenX (Optional) The x-coordinate on the screen at which"," *      point the event occured. The default is 0."," * @param {int} screenY (Optional) The y-coordinate on the screen at which"," *      point the event occured. The default is 0."," * @param {int} clientX (Optional) The x-coordinate on the client at which"," *      point the event occured. The default is 0."," * @param {int} clientY (Optional) The y-coordinate on the client at which"," *      point the event occured. The default is 0."," * @param {Boolean} ctrlKey (Optional) Indicates if one of the CTRL keys"," *      is pressed while the event is firing. The default is false."," * @param {Boolean} altKey (Optional) Indicates if one of the ALT keys"," *      is pressed while the event is firing. The default is false."," * @param {Boolean} shiftKey (Optional) Indicates if one of the SHIFT keys"," *      is pressed while the event is firing. The default is false."," * @param {Boolean} metaKey (Optional) Indicates if one of the META keys"," *      is pressed while the event is firing. The default is false."," * @param {int} button (Optional) The button being pressed while the event"," *      is executing. The value should be 0 for the primary mouse button"," *      (typically the left button), 1 for the terciary mouse button"," *      (typically the middle button), and 2 for the secondary mouse button"," *      (typically the right button). The default is 0."," * @param {HTMLElement} relatedTarget (Optional) For mouseout events,"," *      this is the element that the mouse has moved to. For mouseover"," *      events, this is the element that the mouse has moved from. This"," *      argument is ignored for all other events. The default is null."," */","function simulateMouseEvent(target /*:HTMLElement*/, type /*:String*/,","                               bubbles /*:Boolean*/,  cancelable /*:Boolean*/,","                               view /*:Window*/,        detail /*:int*/,","                               screenX /*:int*/,        screenY /*:int*/,","                               clientX /*:int*/,        clientY /*:int*/,","                               ctrlKey /*:Boolean*/,    altKey /*:Boolean*/,","                               shiftKey /*:Boolean*/,   metaKey /*:Boolean*/,","                               button /*:int*/,         relatedTarget /*:HTMLElement*/) /*:Void*/","{","    //check target","    if (!target){","        Y.error(\"simulateMouseEvent(): Invalid target.\");","    }","","    ","    if (isString(type)){","","        //make sure it's a supported mouse event or an msPointerEvent. ","        if (!mouseEvents[type.toLowerCase()] && !msPointerEvents[type]){","            Y.error(\"simulateMouseEvent(): Event type '\" + type + \"' not supported.\");","        }","    } ","    else {","        Y.error(\"simulateMouseEvent(): Event type must be a string.\");","    }","","    //setup default values","    if (!isBoolean(bubbles)){","        bubbles = true; //all mouse events bubble","    }","    if (!isBoolean(cancelable)){","        cancelable = (type !== \"mousemove\"); //mousemove is the only one that can't be cancelled","    }","    if (!isObject(view)){","        view = Y.config.win; //view is typically window","    }","    if (!isNumber(detail)){","        detail = 1;  //number of mouse clicks must be at least one","    }","    if (!isNumber(screenX)){","        screenX = 0;","    }","    if (!isNumber(screenY)){","        screenY = 0;","    }","    if (!isNumber(clientX)){","        clientX = 0;","    }","    if (!isNumber(clientY)){","        clientY = 0;","    }","    if (!isBoolean(ctrlKey)){","        ctrlKey = false;","    }","    if (!isBoolean(altKey)){","        altKey = false;","    }","    if (!isBoolean(shiftKey)){","        shiftKey = false;","    }","    if (!isBoolean(metaKey)){","        metaKey = false;","    }","    if (!isNumber(button)){","        button = 0;","    }","","    relatedTarget = relatedTarget || null;","","    //try to create a mouse event","    var customEvent /*:MouseEvent*/ = null;","","    //check for DOM-compliant browsers first","    if (isFunction(Y.config.doc.createEvent)){","","        customEvent = Y.config.doc.createEvent(\"MouseEvents\");","","        //Safari 2.x (WebKit 418) still doesn't implement initMouseEvent()","        if (customEvent.initMouseEvent){","            customEvent.initMouseEvent(type, bubbles, cancelable, view, detail,","                                 screenX, screenY, clientX, clientY,","                                 ctrlKey, altKey, shiftKey, metaKey,","                                 button, relatedTarget);","        } else { //Safari","","            //the closest thing available in Safari 2.x is UIEvents","            customEvent = Y.config.doc.createEvent(\"UIEvents\");","            customEvent.initEvent(type, bubbles, cancelable);","            customEvent.view = view;","            customEvent.detail = detail;","            customEvent.screenX = screenX;","            customEvent.screenY = screenY;","            customEvent.clientX = clientX;","            customEvent.clientY = clientY;","            customEvent.ctrlKey = ctrlKey;","            customEvent.altKey = altKey;","            customEvent.metaKey = metaKey;","            customEvent.shiftKey = shiftKey;","            customEvent.button = button;","            customEvent.relatedTarget = relatedTarget;","        }","","        /*","         * Check to see if relatedTarget has been assigned. Firefox","         * versions less than 2.0 don't allow it to be assigned via","         * initMouseEvent() and the property is readonly after event","         * creation, so in order to keep YAHOO.util.getRelatedTarget()","         * working, assign to the IE proprietary toElement property","         * for mouseout event and fromElement property for mouseover","         * event.","         */","        if (relatedTarget && !customEvent.relatedTarget){","            if (type === \"mouseout\"){","                customEvent.toElement = relatedTarget;","            } else if (type === \"mouseover\"){","                customEvent.fromElement = relatedTarget;","            }","        }","","        //fire the event","        target.dispatchEvent(customEvent);","","    } else if (isObject(Y.config.doc.createEventObject)){ //IE","","        //create an IE event object","        customEvent = Y.config.doc.createEventObject();","","        //assign available properties","        customEvent.bubbles = bubbles;","        customEvent.cancelable = cancelable;","        customEvent.view = view;","        customEvent.detail = detail;","        customEvent.screenX = screenX;","        customEvent.screenY = screenY;","        customEvent.clientX = clientX;","        customEvent.clientY = clientY;","        customEvent.ctrlKey = ctrlKey;","        customEvent.altKey = altKey;","        customEvent.metaKey = metaKey;","        customEvent.shiftKey = shiftKey;","","        //fix button property for IE's wacky implementation","        switch(button){","            case 0:","                customEvent.button = 1;","                break;","            case 1:","                customEvent.button = 4;","                break;","            case 2:","                //leave as is","                break;","            default:","                customEvent.button = 0;","        }","","        /*","         * Have to use relatedTarget because IE won't allow assignment","         * to toElement or fromElement on generic events. This keeps","         * YAHOO.util.customEvent.getRelatedTarget() functional.","         */","        customEvent.relatedTarget = relatedTarget;","","        //fire the event","        target.fireEvent(\"on\" + type, customEvent);","","    } else {","        Y.error(\"simulateMouseEvent(): No event simulation framework present.\");","    }","}","","/*"," * Note: Intentionally not for YUIDoc generation."," * Simulates a UI event using the given event information to populate"," * the generated event object. This method does browser-equalizing"," * calculations to account for differences in the DOM and IE event models"," * as well as different browser quirks."," * @method simulateHTMLEvent"," * @private"," * @static"," * @param {HTMLElement} target The target of the given event."," * @param {String} type The type of event to fire. This can be any one of"," *      the following: click, dblclick, mousedown, mouseup, mouseout,"," *      mouseover, and mousemove."," * @param {Boolean} bubbles (Optional) Indicates if the event can be"," *      bubbled up. DOM Level 2 specifies that all mouse events bubble by"," *      default. The default is true."," * @param {Boolean} cancelable (Optional) Indicates if the event can be"," *      canceled using preventDefault(). DOM Level 2 specifies that all"," *      mouse events except mousemove can be cancelled. The default"," *      is true for all events except mousemove, for which the default"," *      is false."," * @param {Window} view (Optional) The view containing the target. This is"," *      typically the window object. The default is window."," * @param {int} detail (Optional) The number of times the mouse button has"," *      been used. The default value is 1."," */","function simulateUIEvent(target /*:HTMLElement*/, type /*:String*/,","                               bubbles /*:Boolean*/,  cancelable /*:Boolean*/,","                               view /*:Window*/,        detail /*:int*/) /*:Void*/","{","","    //check target","    if (!target){","        Y.error(\"simulateUIEvent(): Invalid target.\");","    }","","    //check event type","    if (isString(type)){","        type = type.toLowerCase();","","        //make sure it's a supported mouse event","        if (!uiEvents[type]){","            Y.error(\"simulateUIEvent(): Event type '\" + type + \"' not supported.\");","        }","    } else {","        Y.error(\"simulateUIEvent(): Event type must be a string.\");","    }","","    //try to create a mouse event","    var customEvent = null;","","","    //setup default values","    if (!isBoolean(bubbles)){","        bubbles = (type in bubbleEvents);  //not all events bubble","    }","    if (!isBoolean(cancelable)){","        cancelable = (type === \"submit\"); //submit is the only one that can be cancelled","    }","    if (!isObject(view)){","        view = Y.config.win; //view is typically window","    }","    if (!isNumber(detail)){","        detail = 1;  //usually not used but defaulted to this","    }","","    //check for DOM-compliant browsers first","    if (isFunction(Y.config.doc.createEvent)){","","        //just a generic UI Event object is needed","        customEvent = Y.config.doc.createEvent(\"UIEvents\");","        customEvent.initUIEvent(type, bubbles, cancelable, view, detail);","","        //fire the event","        target.dispatchEvent(customEvent);","","    } else if (isObject(Y.config.doc.createEventObject)){ //IE","","        //create an IE event object","        customEvent = Y.config.doc.createEventObject();","","        //assign available properties","        customEvent.bubbles = bubbles;","        customEvent.cancelable = cancelable;","        customEvent.view = view;","        customEvent.detail = detail;","","        //fire the event","        target.fireEvent(\"on\" + type, customEvent);","","    } else {","        Y.error(\"simulateUIEvent(): No event simulation framework present.\");","    }","}","","/*"," * (iOS only) This is for creating native DOM gesture events which only iOS"," * v2.0+ is supporting."," * "," * @method simulateGestureEvent"," * @private"," * @param {HTMLElement} target The target of the given event."," * @param {String} type The type of event to fire. This can be any one of"," *      the following: touchstart, touchmove, touchend, touchcancel."," * @param {Boolean} bubbles (Optional) Indicates if the event can be"," *      bubbled up. DOM Level 2 specifies that all mouse events bubble by"," *      default. The default is true."," * @param {Boolean} cancelable (Optional) Indicates if the event can be"," *      canceled using preventDefault(). DOM Level 2 specifies that all"," *      touch events except touchcancel can be cancelled. The default"," *      is true for all events except touchcancel, for which the default"," *      is false."," * @param {Window} view (Optional) The view containing the target. This is"," *      typically the window object. The default is window."," * @param {int} detail (Optional) Specifies some detail information about "," *      the event depending on the type of event."," * @param {int} screenX (Optional) The x-coordinate on the screen at which"," *      point the event occured. The default is 0."," * @param {int} screenY (Optional) The y-coordinate on the screen at which"," *      point the event occured. The default is 0."," * @param {int} clientX (Optional) The x-coordinate on the client at which"," *      point the event occured. The default is 0."," * @param {int} clientY (Optional) The y-coordinate on the client at which"," *      point the event occured. The default is 0."," * @param {Boolean} ctrlKey (Optional) Indicates if one of the CTRL keys"," *      is pressed while the event is firing. The default is false."," * @param {Boolean} altKey (Optional) Indicates if one of the ALT keys"," *      is pressed while the event is firing. The default is false."," * @param {Boolean} shiftKey (Optional) Indicates if one of the SHIFT keys"," *      is pressed while the event is firing. The default is false."," * @param {Boolean} metaKey (Optional) Indicates if one of the META keys"," *      is pressed while the event is firing. The default is false. "," * @param {float} scale (iOS v2+ only) The distance between two fingers "," *      since the start of an event as a multiplier of the initial distance. "," *      The default value is 1.0."," * @param {float} rotation (iOS v2+ only) The delta rotation since the start "," *      of an event, in degrees, where clockwise is positive and "," *      counter-clockwise is negative. The default value is 0.0.   "," */","function simulateGestureEvent(target, type,","    bubbles,            // boolean","    cancelable,         // boolean","    view,               // DOMWindow","    detail,             // long","    screenX, screenY,   // long","    clientX, clientY,   // long","    ctrlKey, altKey, shiftKey, metaKey, // boolean","    scale,              // float","    rotation            // float",") {","    var customEvent;","","    if(!Y.UA.ios || Y.UA.ios<2.0) {","        Y.error(\"simulateGestureEvent(): Native gesture DOM eventframe is not available in this platform.\");","    }","","    // check taget    ","    if (!target){","        Y.error(\"simulateGestureEvent(): Invalid target.\");","    }","","    //check event type","    if (Y.Lang.isString(type)) {","        type = type.toLowerCase();","","        //make sure it's a supported touch event","        if (!gestureEvents[type]){","            Y.error(\"simulateTouchEvent(): Event type '\" + type + \"' not supported.\");","        }","    } else {","        Y.error(\"simulateGestureEvent(): Event type must be a string.\");","    }","","    // setup default values","    if (!Y.Lang.isBoolean(bubbles)) { bubbles = true; } // bubble by default","    if (!Y.Lang.isBoolean(cancelable)) { cancelable = true; } ","    if (!Y.Lang.isObject(view))     { view = Y.config.win; }","    if (!Y.Lang.isNumber(detail))   { detail = 2; }     // usually not used.","    if (!Y.Lang.isNumber(screenX))  { screenX = 0; }","    if (!Y.Lang.isNumber(screenY))  { screenY = 0; }","    if (!Y.Lang.isNumber(clientX))  { clientX = 0; }","    if (!Y.Lang.isNumber(clientY))  { clientY = 0; }","    if (!Y.Lang.isBoolean(ctrlKey)) { ctrlKey = false; }","    if (!Y.Lang.isBoolean(altKey))  { altKey = false; }","    if (!Y.Lang.isBoolean(shiftKey)){ shiftKey = false; }","    if (!Y.Lang.isBoolean(metaKey)) { metaKey = false; }","","    if (!Y.Lang.isNumber(scale)){ scale = 1.0; }","    if (!Y.Lang.isNumber(rotation)){ rotation = 0.0; }","","    customEvent = Y.config.doc.createEvent(\"GestureEvent\");","","    customEvent.initGestureEvent(type, bubbles, cancelable, view, detail,","        screenX, screenY, clientX, clientY,","        ctrlKey, altKey, shiftKey, metaKey,","        target, scale, rotation);","","    target.dispatchEvent(customEvent);","}","","","/*"," * @method simulateTouchEvent"," * @private"," * @param {HTMLElement} target The target of the given event."," * @param {String} type The type of event to fire. This can be any one of"," *      the following: touchstart, touchmove, touchend, touchcancel."," * @param {Boolean} bubbles (Optional) Indicates if the event can be"," *      bubbled up. DOM Level 2 specifies that all mouse events bubble by"," *      default. The default is true."," * @param {Boolean} cancelable (Optional) Indicates if the event can be"," *      canceled using preventDefault(). DOM Level 2 specifies that all"," *      touch events except touchcancel can be cancelled. The default"," *      is true for all events except touchcancel, for which the default"," *      is false."," * @param {Window} view (Optional) The view containing the target. This is"," *      typically the window object. The default is window."," * @param {int} detail (Optional) Specifies some detail information about "," *      the event depending on the type of event."," * @param {int} screenX (Optional) The x-coordinate on the screen at which"," *      point the event occured. The default is 0."," * @param {int} screenY (Optional) The y-coordinate on the screen at which"," *      point the event occured. The default is 0."," * @param {int} clientX (Optional) The x-coordinate on the client at which"," *      point the event occured. The default is 0."," * @param {int} clientY (Optional) The y-coordinate on the client at which"," *      point the event occured. The default is 0."," * @param {Boolean} ctrlKey (Optional) Indicates if one of the CTRL keys"," *      is pressed while the event is firing. The default is false."," * @param {Boolean} altKey (Optional) Indicates if one of the ALT keys"," *      is pressed while the event is firing. The default is false."," * @param {Boolean} shiftKey (Optional) Indicates if one of the SHIFT keys"," *      is pressed while the event is firing. The default is false."," * @param {Boolean} metaKey (Optional) Indicates if one of the META keys"," *      is pressed while the event is firing. The default is false. "," * @param {TouchList} touches A collection of Touch objects representing "," *      all touches associated with this event."," * @param {TouchList} targetTouches A collection of Touch objects "," *      representing all touches associated with this target."," * @param {TouchList} changedTouches A collection of Touch objects "," *      representing all touches that changed in this event."," * @param {float} scale (iOS v2+ only) The distance between two fingers "," *      since the start of an event as a multiplier of the initial distance. "," *      The default value is 1.0."," * @param {float} rotation (iOS v2+ only) The delta rotation since the start "," *      of an event, in degrees, where clockwise is positive and "," *      counter-clockwise is negative. The default value is 0.0.   "," */","function simulateTouchEvent(target, type,","    bubbles,            // boolean","    cancelable,         // boolean","    view,               // DOMWindow","    detail,             // long","    screenX, screenY,   // long","    clientX, clientY,   // long","    ctrlKey, altKey, shiftKey, metaKey, // boolean","    touches,            // TouchList","    targetTouches,      // TouchList","    changedTouches,     // TouchList","    scale,              // float","    rotation            // float",") {","","    var customEvent;","","    // check taget    ","    if (!target){","        Y.error(\"simulateTouchEvent(): Invalid target.\");","    }","","    //check event type","    if (Y.Lang.isString(type)) {","        type = type.toLowerCase();","","        //make sure it's a supported touch event","        if (!touchEvents[type]){","            Y.error(\"simulateTouchEvent(): Event type '\" + type + \"' not supported.\");","        }","    } else {","        Y.error(\"simulateTouchEvent(): Event type must be a string.\");","    }","","    // note that the caller is responsible to pass appropriate touch objects.","    // check touch objects","    // Android(even 4.0) doesn't define TouchList yet","    /*if(type === 'touchstart' || type === 'touchmove') {","        if(!touches instanceof TouchList) {","            Y.error('simulateTouchEvent(): Invalid touches. It must be a TouchList');","        } else {","            if(touches.length === 0) {","                Y.error('simulateTouchEvent(): No touch object found.');","            }","        }","    } else if(type === 'touchend') {","        if(!changedTouches instanceof TouchList) {","            Y.error('simulateTouchEvent(): Invalid touches. It must be a TouchList');","        } else {","            if(changedTouches.length === 0) {","                Y.error('simulateTouchEvent(): No touch object found.');","            }","        }","    }*/","","    if(type === 'touchstart' || type === 'touchmove') {","        if(touches.length === 0) {","            Y.error('simulateTouchEvent(): No touch object in touches');","        }","    } else if(type === 'touchend') {","        if(changedTouches.length === 0) {","            Y.error('simulateTouchEvent(): No touch object in changedTouches');","        }","    }","","    // setup default values","    if (!Y.Lang.isBoolean(bubbles)) { bubbles = true; } // bubble by default.","    if (!Y.Lang.isBoolean(cancelable)) { ","        cancelable = (type !== \"touchcancel\"); // touchcancel is not cancelled ","    } ","    if (!Y.Lang.isObject(view))     { view = Y.config.win; }","    if (!Y.Lang.isNumber(detail))   { detail = 1; } // usually not used. defaulted to # of touch objects.","    if (!Y.Lang.isNumber(screenX))  { screenX = 0; }","    if (!Y.Lang.isNumber(screenY))  { screenY = 0; }","    if (!Y.Lang.isNumber(clientX))  { clientX = 0; }","    if (!Y.Lang.isNumber(clientY))  { clientY = 0; }","    if (!Y.Lang.isBoolean(ctrlKey)) { ctrlKey = false; }","    if (!Y.Lang.isBoolean(altKey))  { altKey = false; }","    if (!Y.Lang.isBoolean(shiftKey)){ shiftKey = false; }","    if (!Y.Lang.isBoolean(metaKey)) { metaKey = false; }","    if (!Y.Lang.isNumber(scale))    { scale = 1.0; }","    if (!Y.Lang.isNumber(rotation)) { rotation = 0.0; }","","","    //check for DOM-compliant browsers first","    if (Y.Lang.isFunction(Y.config.doc.createEvent)) {","        if (Y.UA.android) {","            /*","                * Couldn't find android start version that supports touch event. ","                * Assumed supported(btw APIs broken till icecream sandwitch) ","                * from the beginning.","            */","            if(Y.UA.android < 4.0) {","                /*","                    * Touch APIs are broken in androids older than 4.0. We will use ","                    * simulated touch apis for these versions. ","                    * App developer still can listen for touch events. This events","                    * will be dispatched with touch event types.","                    * ","                    * (Note) Used target for the relatedTarget. Need to verify if","                    * it has a side effect.","                */","                customEvent = Y.config.doc.createEvent(\"MouseEvents\");","                customEvent.initMouseEvent(type, bubbles, cancelable, view, detail, ","                    screenX, screenY, clientX, clientY,","                    ctrlKey, altKey, shiftKey, metaKey,","                    0, target);","","                customEvent.touches = touches;","                customEvent.targetTouches = targetTouches;","                customEvent.changedTouches = changedTouches;","            } else {","                customEvent = Y.config.doc.createEvent(\"TouchEvent\");","","                // Andoroid isn't compliant W3C initTouchEvent method signature.","                customEvent.initTouchEvent(touches, targetTouches, changedTouches,","                    type, view,","                    screenX, screenY, clientX, clientY,","                    ctrlKey, altKey, shiftKey, metaKey);","            }","        } else if (Y.UA.ios) {","            if(Y.UA.ios >= 2.0) {","                customEvent = Y.config.doc.createEvent(\"TouchEvent\");","","                // Available iOS 2.0 and later","                customEvent.initTouchEvent(type, bubbles, cancelable, view, detail,","                    screenX, screenY, clientX, clientY,","                    ctrlKey, altKey, shiftKey, metaKey,","                    touches, targetTouches, changedTouches,","                    scale, rotation);","            } else {","                Y.error('simulateTouchEvent(): No touch event simulation framework present for iOS, '+Y.UA.ios+'.');","            }","        } else {","            Y.error('simulateTouchEvent(): Not supported agent yet, '+Y.UA.userAgent);","        }","","        //fire the event","        target.dispatchEvent(customEvent);","    //} else if (Y.Lang.isObject(doc.createEventObject)){ // Windows Mobile/IE, support later ","    } else {","        Y.error('simulateTouchEvent(): No event simulation framework present.');","    }","}","","/**"," * Simulates the event or gesture with the given name on a target."," * @param {HTMLElement} target The DOM element that's the target of the event."," * @param {String} type The type of event or name of the supported gesture to simulate "," *      (i.e., \"click\", \"doubletap\", \"flick\")."," * @param {Object} options (Optional) Extra options to copy onto the event object. "," *      For gestures, options are used to refine the gesture behavior."," * @return {void}"," * @for Event"," * @method simulate"," * @static"," */","Y.Event.simulate = function(target, type, options){","","    options = options || {};","","    if (mouseEvents[type] || msPointerEvents[type]){","        simulateMouseEvent(target, type, options.bubbles,","            options.cancelable, options.view, options.detail, options.screenX,","            options.screenY, options.clientX, options.clientY, options.ctrlKey,","            options.altKey, options.shiftKey, options.metaKey, options.button,","            options.relatedTarget);","    } else if (keyEvents[type]){","        simulateKeyEvent(target, type, options.bubbles,","            options.cancelable, options.view, options.ctrlKey,","            options.altKey, options.shiftKey, options.metaKey,","            options.keyCode, options.charCode);","    } else if (uiEvents[type]){","        simulateUIEvent(target, type, options.bubbles,","            options.cancelable, options.view, options.detail);","            ","    // touch low-level event simulation        ","    } else if (touchEvents[type]) {","        if((Y.config.win && (\"ontouchstart\" in Y.config.win)) && !(Y.UA.phantomjs) && !(Y.UA.chrome && Y.UA.chrome < 6)) {","            simulateTouchEvent(target, type, ","                options.bubbles, options.cancelable, options.view, options.detail, ","                options.screenX, options.screenY, options.clientX, options.clientY, ","                options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, ","                options.touches, options.targetTouches, options.changedTouches,","                options.scale, options.rotation);","        } else {","            Y.error(\"simulate(): Event '\" + type + \"' can't be simulated. Use gesture-simulate module instead.\");","        }","","    // ios gesture low-level event simulation (iOS v2+ only)        ","    } else if(Y.UA.ios && Y.UA.ios >= 2.0 && gestureEvents[type]) {","        simulateGestureEvent(target, type, ","            options.bubbles, options.cancelable, options.view, options.detail, ","            options.screenX, options.screenY, options.clientX, options.clientY, ","            options.ctrlKey, options.altKey, options.shiftKey, options.metaKey,","            options.scale, options.rotation);","    ","    // anything else","    } else {","        Y.error(\"simulate(): Event '\" + type + \"' can't be simulated.\");","    }","};","","","})();","","","","}, '@VERSION@', {\"requires\": [\"event-base\"]});"];
_yuitest_coverage["build/event-simulate/event-simulate.js"].lines = {"1":0,"3":0,"12":0,"84":0,"85":0,"86":0,"123":0,"131":0,"132":0,"136":0,"137":0,"138":0,"140":0,"141":0,"145":0,"147":0,"150":0,"154":0,"155":0,"157":0,"158":0,"160":0,"161":0,"163":0,"164":0,"166":0,"167":0,"169":0,"170":0,"172":0,"173":0,"175":0,"176":0,"178":0,"179":0,"183":0,"186":0,"188":0,"191":0,"202":0,"216":0,"219":0,"224":0,"228":0,"231":0,"232":0,"233":0,"234":0,"235":0,"236":0,"237":0,"244":0,"246":0,"249":0,"252":0,"253":0,"254":0,"255":0,"256":0,"257":0,"258":0,"265":0,"268":0,"271":0,"326":0,"336":0,"337":0,"341":0,"344":0,"345":0,"349":0,"353":0,"354":0,"356":0,"357":0,"359":0,"360":0,"362":0,"363":0,"365":0,"366":0,"368":0,"369":0,"371":0,"372":0,"374":0,"375":0,"377":0,"378":0,"380":0,"381":0,"383":0,"384":0,"386":0,"387":0,"389":0,"390":0,"393":0,"396":0,"399":0,"401":0,"404":0,"405":0,"412":0,"413":0,"414":0,"415":0,"416":0,"417":0,"418":0,"419":0,"420":0,"421":0,"422":0,"423":0,"424":0,"425":0,"437":0,"438":0,"439":0,"440":0,"441":0,"446":0,"448":0,"451":0,"454":0,"455":0,"456":0,"457":0,"458":0,"459":0,"460":0,"461":0,"462":0,"463":0,"464":0,"465":0,"468":0,"470":0,"471":0,"473":0,"474":0,"477":0,"479":0,"487":0,"490":0,"493":0,"523":0,"529":0,"530":0,"534":0,"535":0,"538":0,"539":0,"542":0,"546":0,"550":0,"551":0,"553":0,"554":0,"556":0,"557":0,"559":0,"560":0,"564":0,"567":0,"568":0,"571":0,"573":0,"576":0,"579":0,"580":0,"581":0,"582":0,"585":0,"588":0,"636":0,"647":0,"649":0,"650":0,"654":0,"655":0,"659":0,"660":0,"663":0,"664":0,"667":0,"671":0,"672":0,"673":0,"674":0,"675":0,"676":0,"677":0,"678":0,"679":0,"680":0,"681":0,"682":0,"684":0,"685":0,"687":0,"689":0,"694":0,"745":0,"760":0,"763":0,"764":0,"768":0,"769":0,"772":0,"773":0,"776":0,"800":0,"801":0,"802":0,"804":0,"805":0,"806":0,"811":0,"812":0,"813":0,"815":0,"816":0,"817":0,"818":0,"819":0,"820":0,"821":0,"822":0,"823":0,"824":0,"825":0,"826":0,"830":0,"831":0,"837":0,"847":0,"848":0,"853":0,"854":0,"855":0,"857":0,"860":0,"865":0,"866":0,"867":0,"870":0,"876":0,"879":0,"883":0,"886":0,"902":0,"904":0,"906":0,"907":0,"912":0,"913":0,"917":0,"918":0,"922":0,"923":0,"924":0,"931":0,"935":0,"936":0,"944":0};
_yuitest_coverage["build/event-simulate/event-simulate.js"].functions = {"simulateKeyEvent:123":0,"simulateMouseEvent:326":0,"simulateUIEvent:523":0,"simulateGestureEvent:636":0,"simulateTouchEvent:745":0,"simulate:902":0,"(anonymous 2):3":0,"(anonymous 1):1":0};
_yuitest_coverage["build/event-simulate/event-simulate.js"].coveredLines = 267;
_yuitest_coverage["build/event-simulate/event-simulate.js"].coveredFunctions = 8;
_yuitest_coverline("build/event-simulate/event-simulate.js", 1);
YUI.add('event-simulate', function (Y, NAME) {

_yuitest_coverfunc("build/event-simulate/event-simulate.js", "(anonymous 1)", 1);
_yuitest_coverline("build/event-simulate/event-simulate.js", 3);
(function() {
/**
 * Simulate user interaction by generating native DOM events.
 *
 * @module event-simulate
 * @requires event
 */

//shortcuts
_yuitest_coverfunc("build/event-simulate/event-simulate.js", "(anonymous 2)", 3);
_yuitest_coverline("build/event-simulate/event-simulate.js", 12);
var L   = Y.Lang,
    isFunction  = L.isFunction,
    isString    = L.isString,
    isBoolean   = L.isBoolean,
    isObject    = L.isObject,
    isNumber    = L.isNumber,

    //mouse events supported
    mouseEvents = {
        click:      1,
        dblclick:   1,
        mouseover:  1,
        mouseout:   1,
        mousedown:  1,
        mouseup:    1,
        mousemove:  1,
        contextmenu:1
    },

    msPointerEvents = {
        MSPointerOver:  1,
        MSPointerOut:   1,
        MSPointerDown:  1,
        MSPointerUp:    1,
        MSPointerMove:  1
    },

    //key events supported
    keyEvents   = {
        keydown:    1,
        keyup:      1,
        keypress:   1
    },

    //HTML events supported
    uiEvents  = {
        submit:     1,
        blur:       1,
        change:     1,
        focus:      1,
        resize:     1,
        scroll:     1,
        select:     1
    },

    //events that bubble by default
    bubbleEvents = {
        scroll:     1,
        resize:     1,
        reset:      1,
        submit:     1,
        change:     1,
        select:     1,
        error:      1,
        abort:      1
    },
    
    //touch events supported
    touchEvents = {
        touchstart: 1,
        touchmove: 1,
        touchend: 1, 
        touchcancel: 1
    },
    
    gestureEvents = {
        gesturestart: 1,
        gesturechange: 1,
        gestureend: 1
    };

//all key, mouse and touch events bubble
_yuitest_coverline("build/event-simulate/event-simulate.js", 84);
Y.mix(bubbleEvents, mouseEvents);
_yuitest_coverline("build/event-simulate/event-simulate.js", 85);
Y.mix(bubbleEvents, keyEvents);
_yuitest_coverline("build/event-simulate/event-simulate.js", 86);
Y.mix(bubbleEvents, touchEvents);

/*
 * Note: Intentionally not for YUIDoc generation.
 * Simulates a key event using the given event information to populate
 * the generated event object. This method does browser-equalizing
 * calculations to account for differences in the DOM and IE event models
 * as well as different browser quirks. Note: keydown causes Safari 2.x to
 * crash.
 * @method simulateKeyEvent
 * @private
 * @static
 * @param {HTMLElement} target The target of the given event.
 * @param {String} type The type of event to fire. This can be any one of
 *      the following: keyup, keydown, and keypress.
 * @param {Boolean} bubbles (Optional) Indicates if the event can be
 *      bubbled up. DOM Level 3 specifies that all key events bubble by
 *      default. The default is true.
 * @param {Boolean} cancelable (Optional) Indicates if the event can be
 *      canceled using preventDefault(). DOM Level 3 specifies that all
 *      key events can be cancelled. The default
 *      is true.
 * @param {Window} view (Optional) The view containing the target. This is
 *      typically the window object. The default is window.
 * @param {Boolean} ctrlKey (Optional) Indicates if one of the CTRL keys
 *      is pressed while the event is firing. The default is false.
 * @param {Boolean} altKey (Optional) Indicates if one of the ALT keys
 *      is pressed while the event is firing. The default is false.
 * @param {Boolean} shiftKey (Optional) Indicates if one of the SHIFT keys
 *      is pressed while the event is firing. The default is false.
 * @param {Boolean} metaKey (Optional) Indicates if one of the META keys
 *      is pressed while the event is firing. The default is false.
 * @param {int} keyCode (Optional) The code for the key that is in use.
 *      The default is 0.
 * @param {int} charCode (Optional) The Unicode code for the character
 *      associated with the key being used. The default is 0.
 */
_yuitest_coverline("build/event-simulate/event-simulate.js", 123);
function simulateKeyEvent(target /*:HTMLElement*/, type /*:String*/,
                             bubbles /*:Boolean*/,  cancelable /*:Boolean*/,
                             view /*:Window*/,
                             ctrlKey /*:Boolean*/,    altKey /*:Boolean*/,
                             shiftKey /*:Boolean*/,   metaKey /*:Boolean*/,
                             keyCode /*:int*/,        charCode /*:int*/) /*:Void*/
{
    //check target
    _yuitest_coverfunc("build/event-simulate/event-simulate.js", "simulateKeyEvent", 123);
_yuitest_coverline("build/event-simulate/event-simulate.js", 131);
if (!target){
        _yuitest_coverline("build/event-simulate/event-simulate.js", 132);
Y.error("simulateKeyEvent(): Invalid target.");
    }

    //check event type
    _yuitest_coverline("build/event-simulate/event-simulate.js", 136);
if (isString(type)){
        _yuitest_coverline("build/event-simulate/event-simulate.js", 137);
type = type.toLowerCase();
        _yuitest_coverline("build/event-simulate/event-simulate.js", 138);
switch(type){
            case "textevent": //DOM Level 3
                _yuitest_coverline("build/event-simulate/event-simulate.js", 140);
type = "keypress";
                _yuitest_coverline("build/event-simulate/event-simulate.js", 141);
break;
            case "keyup":
            case "keydown":
            case "keypress":
                _yuitest_coverline("build/event-simulate/event-simulate.js", 145);
break;
            default:
                _yuitest_coverline("build/event-simulate/event-simulate.js", 147);
Y.error("simulateKeyEvent(): Event type '" + type + "' not supported.");
        }
    } else {
        _yuitest_coverline("build/event-simulate/event-simulate.js", 150);
Y.error("simulateKeyEvent(): Event type must be a string.");
    }

    //setup default values
    _yuitest_coverline("build/event-simulate/event-simulate.js", 154);
if (!isBoolean(bubbles)){
        _yuitest_coverline("build/event-simulate/event-simulate.js", 155);
bubbles = true; //all key events bubble
    }
    _yuitest_coverline("build/event-simulate/event-simulate.js", 157);
if (!isBoolean(cancelable)){
        _yuitest_coverline("build/event-simulate/event-simulate.js", 158);
cancelable = true; //all key events can be cancelled
    }
    _yuitest_coverline("build/event-simulate/event-simulate.js", 160);
if (!isObject(view)){
        _yuitest_coverline("build/event-simulate/event-simulate.js", 161);
view = Y.config.win; //view is typically window
    }
    _yuitest_coverline("build/event-simulate/event-simulate.js", 163);
if (!isBoolean(ctrlKey)){
        _yuitest_coverline("build/event-simulate/event-simulate.js", 164);
ctrlKey = false;
    }
    _yuitest_coverline("build/event-simulate/event-simulate.js", 166);
if (!isBoolean(altKey)){
        _yuitest_coverline("build/event-simulate/event-simulate.js", 167);
altKey = false;
    }
    _yuitest_coverline("build/event-simulate/event-simulate.js", 169);
if (!isBoolean(shiftKey)){
        _yuitest_coverline("build/event-simulate/event-simulate.js", 170);
shiftKey = false;
    }
    _yuitest_coverline("build/event-simulate/event-simulate.js", 172);
if (!isBoolean(metaKey)){
        _yuitest_coverline("build/event-simulate/event-simulate.js", 173);
metaKey = false;
    }
    _yuitest_coverline("build/event-simulate/event-simulate.js", 175);
if (!isNumber(keyCode)){
        _yuitest_coverline("build/event-simulate/event-simulate.js", 176);
keyCode = 0;
    }
    _yuitest_coverline("build/event-simulate/event-simulate.js", 178);
if (!isNumber(charCode)){
        _yuitest_coverline("build/event-simulate/event-simulate.js", 179);
charCode = 0;
    }

    //try to create a mouse event
    _yuitest_coverline("build/event-simulate/event-simulate.js", 183);
var customEvent /*:MouseEvent*/ = null;

    //check for DOM-compliant browsers first
    _yuitest_coverline("build/event-simulate/event-simulate.js", 186);
if (isFunction(Y.config.doc.createEvent)){

        _yuitest_coverline("build/event-simulate/event-simulate.js", 188);
try {

            //try to create key event
            _yuitest_coverline("build/event-simulate/event-simulate.js", 191);
customEvent = Y.config.doc.createEvent("KeyEvents");

            /*
             * Interesting problem: Firefox implemented a non-standard
             * version of initKeyEvent() based on DOM Level 2 specs.
             * Key event was removed from DOM Level 2 and re-introduced
             * in DOM Level 3 with a different interface. Firefox is the
             * only browser with any implementation of Key Events, so for
             * now, assume it's Firefox if the above line doesn't error.
             */
            // @TODO: Decipher between Firefox's implementation and a correct one.
            _yuitest_coverline("build/event-simulate/event-simulate.js", 202);
customEvent.initKeyEvent(type, bubbles, cancelable, view, ctrlKey,
                altKey, shiftKey, metaKey, keyCode, charCode);

        } catch (ex /*:Error*/){

            /*
             * If it got here, that means key events aren't officially supported.
             * Safari/WebKit is a real problem now. WebKit 522 won't let you
             * set keyCode, charCode, or other properties if you use a
             * UIEvent, so we first must try to create a generic event. The
             * fun part is that this will throw an error on Safari 2.x. The
             * end result is that we need another try...catch statement just to
             * deal with this mess.
             */
            _yuitest_coverline("build/event-simulate/event-simulate.js", 216);
try {

                //try to create generic event - will fail in Safari 2.x
                _yuitest_coverline("build/event-simulate/event-simulate.js", 219);
customEvent = Y.config.doc.createEvent("Events");

            } catch (uierror /*:Error*/){

                //the above failed, so create a UIEvent for Safari 2.x
                _yuitest_coverline("build/event-simulate/event-simulate.js", 224);
customEvent = Y.config.doc.createEvent("UIEvents");

            } finally {

                _yuitest_coverline("build/event-simulate/event-simulate.js", 228);
customEvent.initEvent(type, bubbles, cancelable);

                //initialize
                _yuitest_coverline("build/event-simulate/event-simulate.js", 231);
customEvent.view = view;
                _yuitest_coverline("build/event-simulate/event-simulate.js", 232);
customEvent.altKey = altKey;
                _yuitest_coverline("build/event-simulate/event-simulate.js", 233);
customEvent.ctrlKey = ctrlKey;
                _yuitest_coverline("build/event-simulate/event-simulate.js", 234);
customEvent.shiftKey = shiftKey;
                _yuitest_coverline("build/event-simulate/event-simulate.js", 235);
customEvent.metaKey = metaKey;
                _yuitest_coverline("build/event-simulate/event-simulate.js", 236);
customEvent.keyCode = keyCode;
                _yuitest_coverline("build/event-simulate/event-simulate.js", 237);
customEvent.charCode = charCode;

            }

        }

        //fire the event
        _yuitest_coverline("build/event-simulate/event-simulate.js", 244);
target.dispatchEvent(customEvent);

    } else {_yuitest_coverline("build/event-simulate/event-simulate.js", 246);
if (isObject(Y.config.doc.createEventObject)){ //IE

        //create an IE event object
        _yuitest_coverline("build/event-simulate/event-simulate.js", 249);
customEvent = Y.config.doc.createEventObject();

        //assign available properties
        _yuitest_coverline("build/event-simulate/event-simulate.js", 252);
customEvent.bubbles = bubbles;
        _yuitest_coverline("build/event-simulate/event-simulate.js", 253);
customEvent.cancelable = cancelable;
        _yuitest_coverline("build/event-simulate/event-simulate.js", 254);
customEvent.view = view;
        _yuitest_coverline("build/event-simulate/event-simulate.js", 255);
customEvent.ctrlKey = ctrlKey;
        _yuitest_coverline("build/event-simulate/event-simulate.js", 256);
customEvent.altKey = altKey;
        _yuitest_coverline("build/event-simulate/event-simulate.js", 257);
customEvent.shiftKey = shiftKey;
        _yuitest_coverline("build/event-simulate/event-simulate.js", 258);
customEvent.metaKey = metaKey;

        /*
         * IE doesn't support charCode explicitly. CharCode should
         * take precedence over any keyCode value for accurate
         * representation.
         */
        _yuitest_coverline("build/event-simulate/event-simulate.js", 265);
customEvent.keyCode = (charCode > 0) ? charCode : keyCode;

        //fire the event
        _yuitest_coverline("build/event-simulate/event-simulate.js", 268);
target.fireEvent("on" + type, customEvent);

    } else {
        _yuitest_coverline("build/event-simulate/event-simulate.js", 271);
Y.error("simulateKeyEvent(): No event simulation framework present.");
    }}
}

/*
 * Note: Intentionally not for YUIDoc generation.
 * Simulates a mouse event using the given event information to populate
 * the generated event object. This method does browser-equalizing
 * calculations to account for differences in the DOM and IE event models
 * as well as different browser quirks.
 * @method simulateMouseEvent
 * @private
 * @static
 * @param {HTMLElement} target The target of the given event.
 * @param {String} type The type of event to fire. This can be any one of
 *      the following: click, dblclick, mousedown, mouseup, mouseout,
 *      mouseover, and mousemove.
 * @param {Boolean} bubbles (Optional) Indicates if the event can be
 *      bubbled up. DOM Level 2 specifies that all mouse events bubble by
 *      default. The default is true.
 * @param {Boolean} cancelable (Optional) Indicates if the event can be
 *      canceled using preventDefault(). DOM Level 2 specifies that all
 *      mouse events except mousemove can be cancelled. The default
 *      is true for all events except mousemove, for which the default
 *      is false.
 * @param {Window} view (Optional) The view containing the target. This is
 *      typically the window object. The default is window.
 * @param {int} detail (Optional) The number of times the mouse button has
 *      been used. The default value is 1.
 * @param {int} screenX (Optional) The x-coordinate on the screen at which
 *      point the event occured. The default is 0.
 * @param {int} screenY (Optional) The y-coordinate on the screen at which
 *      point the event occured. The default is 0.
 * @param {int} clientX (Optional) The x-coordinate on the client at which
 *      point the event occured. The default is 0.
 * @param {int} clientY (Optional) The y-coordinate on the client at which
 *      point the event occured. The default is 0.
 * @param {Boolean} ctrlKey (Optional) Indicates if one of the CTRL keys
 *      is pressed while the event is firing. The default is false.
 * @param {Boolean} altKey (Optional) Indicates if one of the ALT keys
 *      is pressed while the event is firing. The default is false.
 * @param {Boolean} shiftKey (Optional) Indicates if one of the SHIFT keys
 *      is pressed while the event is firing. The default is false.
 * @param {Boolean} metaKey (Optional) Indicates if one of the META keys
 *      is pressed while the event is firing. The default is false.
 * @param {int} button (Optional) The button being pressed while the event
 *      is executing. The value should be 0 for the primary mouse button
 *      (typically the left button), 1 for the terciary mouse button
 *      (typically the middle button), and 2 for the secondary mouse button
 *      (typically the right button). The default is 0.
 * @param {HTMLElement} relatedTarget (Optional) For mouseout events,
 *      this is the element that the mouse has moved to. For mouseover
 *      events, this is the element that the mouse has moved from. This
 *      argument is ignored for all other events. The default is null.
 */
_yuitest_coverline("build/event-simulate/event-simulate.js", 326);
function simulateMouseEvent(target /*:HTMLElement*/, type /*:String*/,
                               bubbles /*:Boolean*/,  cancelable /*:Boolean*/,
                               view /*:Window*/,        detail /*:int*/,
                               screenX /*:int*/,        screenY /*:int*/,
                               clientX /*:int*/,        clientY /*:int*/,
                               ctrlKey /*:Boolean*/,    altKey /*:Boolean*/,
                               shiftKey /*:Boolean*/,   metaKey /*:Boolean*/,
                               button /*:int*/,         relatedTarget /*:HTMLElement*/) /*:Void*/
{
    //check target
    _yuitest_coverfunc("build/event-simulate/event-simulate.js", "simulateMouseEvent", 326);
_yuitest_coverline("build/event-simulate/event-simulate.js", 336);
if (!target){
        _yuitest_coverline("build/event-simulate/event-simulate.js", 337);
Y.error("simulateMouseEvent(): Invalid target.");
    }

    
    _yuitest_coverline("build/event-simulate/event-simulate.js", 341);
if (isString(type)){

        //make sure it's a supported mouse event or an msPointerEvent. 
        _yuitest_coverline("build/event-simulate/event-simulate.js", 344);
if (!mouseEvents[type.toLowerCase()] && !msPointerEvents[type]){
            _yuitest_coverline("build/event-simulate/event-simulate.js", 345);
Y.error("simulateMouseEvent(): Event type '" + type + "' not supported.");
        }
    } 
    else {
        _yuitest_coverline("build/event-simulate/event-simulate.js", 349);
Y.error("simulateMouseEvent(): Event type must be a string.");
    }

    //setup default values
    _yuitest_coverline("build/event-simulate/event-simulate.js", 353);
if (!isBoolean(bubbles)){
        _yuitest_coverline("build/event-simulate/event-simulate.js", 354);
bubbles = true; //all mouse events bubble
    }
    _yuitest_coverline("build/event-simulate/event-simulate.js", 356);
if (!isBoolean(cancelable)){
        _yuitest_coverline("build/event-simulate/event-simulate.js", 357);
cancelable = (type !== "mousemove"); //mousemove is the only one that can't be cancelled
    }
    _yuitest_coverline("build/event-simulate/event-simulate.js", 359);
if (!isObject(view)){
        _yuitest_coverline("build/event-simulate/event-simulate.js", 360);
view = Y.config.win; //view is typically window
    }
    _yuitest_coverline("build/event-simulate/event-simulate.js", 362);
if (!isNumber(detail)){
        _yuitest_coverline("build/event-simulate/event-simulate.js", 363);
detail = 1;  //number of mouse clicks must be at least one
    }
    _yuitest_coverline("build/event-simulate/event-simulate.js", 365);
if (!isNumber(screenX)){
        _yuitest_coverline("build/event-simulate/event-simulate.js", 366);
screenX = 0;
    }
    _yuitest_coverline("build/event-simulate/event-simulate.js", 368);
if (!isNumber(screenY)){
        _yuitest_coverline("build/event-simulate/event-simulate.js", 369);
screenY = 0;
    }
    _yuitest_coverline("build/event-simulate/event-simulate.js", 371);
if (!isNumber(clientX)){
        _yuitest_coverline("build/event-simulate/event-simulate.js", 372);
clientX = 0;
    }
    _yuitest_coverline("build/event-simulate/event-simulate.js", 374);
if (!isNumber(clientY)){
        _yuitest_coverline("build/event-simulate/event-simulate.js", 375);
clientY = 0;
    }
    _yuitest_coverline("build/event-simulate/event-simulate.js", 377);
if (!isBoolean(ctrlKey)){
        _yuitest_coverline("build/event-simulate/event-simulate.js", 378);
ctrlKey = false;
    }
    _yuitest_coverline("build/event-simulate/event-simulate.js", 380);
if (!isBoolean(altKey)){
        _yuitest_coverline("build/event-simulate/event-simulate.js", 381);
altKey = false;
    }
    _yuitest_coverline("build/event-simulate/event-simulate.js", 383);
if (!isBoolean(shiftKey)){
        _yuitest_coverline("build/event-simulate/event-simulate.js", 384);
shiftKey = false;
    }
    _yuitest_coverline("build/event-simulate/event-simulate.js", 386);
if (!isBoolean(metaKey)){
        _yuitest_coverline("build/event-simulate/event-simulate.js", 387);
metaKey = false;
    }
    _yuitest_coverline("build/event-simulate/event-simulate.js", 389);
if (!isNumber(button)){
        _yuitest_coverline("build/event-simulate/event-simulate.js", 390);
button = 0;
    }

    _yuitest_coverline("build/event-simulate/event-simulate.js", 393);
relatedTarget = relatedTarget || null;

    //try to create a mouse event
    _yuitest_coverline("build/event-simulate/event-simulate.js", 396);
var customEvent /*:MouseEvent*/ = null;

    //check for DOM-compliant browsers first
    _yuitest_coverline("build/event-simulate/event-simulate.js", 399);
if (isFunction(Y.config.doc.createEvent)){

        _yuitest_coverline("build/event-simulate/event-simulate.js", 401);
customEvent = Y.config.doc.createEvent("MouseEvents");

        //Safari 2.x (WebKit 418) still doesn't implement initMouseEvent()
        _yuitest_coverline("build/event-simulate/event-simulate.js", 404);
if (customEvent.initMouseEvent){
            _yuitest_coverline("build/event-simulate/event-simulate.js", 405);
customEvent.initMouseEvent(type, bubbles, cancelable, view, detail,
                                 screenX, screenY, clientX, clientY,
                                 ctrlKey, altKey, shiftKey, metaKey,
                                 button, relatedTarget);
        } else { //Safari

            //the closest thing available in Safari 2.x is UIEvents
            _yuitest_coverline("build/event-simulate/event-simulate.js", 412);
customEvent = Y.config.doc.createEvent("UIEvents");
            _yuitest_coverline("build/event-simulate/event-simulate.js", 413);
customEvent.initEvent(type, bubbles, cancelable);
            _yuitest_coverline("build/event-simulate/event-simulate.js", 414);
customEvent.view = view;
            _yuitest_coverline("build/event-simulate/event-simulate.js", 415);
customEvent.detail = detail;
            _yuitest_coverline("build/event-simulate/event-simulate.js", 416);
customEvent.screenX = screenX;
            _yuitest_coverline("build/event-simulate/event-simulate.js", 417);
customEvent.screenY = screenY;
            _yuitest_coverline("build/event-simulate/event-simulate.js", 418);
customEvent.clientX = clientX;
            _yuitest_coverline("build/event-simulate/event-simulate.js", 419);
customEvent.clientY = clientY;
            _yuitest_coverline("build/event-simulate/event-simulate.js", 420);
customEvent.ctrlKey = ctrlKey;
            _yuitest_coverline("build/event-simulate/event-simulate.js", 421);
customEvent.altKey = altKey;
            _yuitest_coverline("build/event-simulate/event-simulate.js", 422);
customEvent.metaKey = metaKey;
            _yuitest_coverline("build/event-simulate/event-simulate.js", 423);
customEvent.shiftKey = shiftKey;
            _yuitest_coverline("build/event-simulate/event-simulate.js", 424);
customEvent.button = button;
            _yuitest_coverline("build/event-simulate/event-simulate.js", 425);
customEvent.relatedTarget = relatedTarget;
        }

        /*
         * Check to see if relatedTarget has been assigned. Firefox
         * versions less than 2.0 don't allow it to be assigned via
         * initMouseEvent() and the property is readonly after event
         * creation, so in order to keep YAHOO.util.getRelatedTarget()
         * working, assign to the IE proprietary toElement property
         * for mouseout event and fromElement property for mouseover
         * event.
         */
        _yuitest_coverline("build/event-simulate/event-simulate.js", 437);
if (relatedTarget && !customEvent.relatedTarget){
            _yuitest_coverline("build/event-simulate/event-simulate.js", 438);
if (type === "mouseout"){
                _yuitest_coverline("build/event-simulate/event-simulate.js", 439);
customEvent.toElement = relatedTarget;
            } else {_yuitest_coverline("build/event-simulate/event-simulate.js", 440);
if (type === "mouseover"){
                _yuitest_coverline("build/event-simulate/event-simulate.js", 441);
customEvent.fromElement = relatedTarget;
            }}
        }

        //fire the event
        _yuitest_coverline("build/event-simulate/event-simulate.js", 446);
target.dispatchEvent(customEvent);

    } else {_yuitest_coverline("build/event-simulate/event-simulate.js", 448);
if (isObject(Y.config.doc.createEventObject)){ //IE

        //create an IE event object
        _yuitest_coverline("build/event-simulate/event-simulate.js", 451);
customEvent = Y.config.doc.createEventObject();

        //assign available properties
        _yuitest_coverline("build/event-simulate/event-simulate.js", 454);
customEvent.bubbles = bubbles;
        _yuitest_coverline("build/event-simulate/event-simulate.js", 455);
customEvent.cancelable = cancelable;
        _yuitest_coverline("build/event-simulate/event-simulate.js", 456);
customEvent.view = view;
        _yuitest_coverline("build/event-simulate/event-simulate.js", 457);
customEvent.detail = detail;
        _yuitest_coverline("build/event-simulate/event-simulate.js", 458);
customEvent.screenX = screenX;
        _yuitest_coverline("build/event-simulate/event-simulate.js", 459);
customEvent.screenY = screenY;
        _yuitest_coverline("build/event-simulate/event-simulate.js", 460);
customEvent.clientX = clientX;
        _yuitest_coverline("build/event-simulate/event-simulate.js", 461);
customEvent.clientY = clientY;
        _yuitest_coverline("build/event-simulate/event-simulate.js", 462);
customEvent.ctrlKey = ctrlKey;
        _yuitest_coverline("build/event-simulate/event-simulate.js", 463);
customEvent.altKey = altKey;
        _yuitest_coverline("build/event-simulate/event-simulate.js", 464);
customEvent.metaKey = metaKey;
        _yuitest_coverline("build/event-simulate/event-simulate.js", 465);
customEvent.shiftKey = shiftKey;

        //fix button property for IE's wacky implementation
        _yuitest_coverline("build/event-simulate/event-simulate.js", 468);
switch(button){
            case 0:
                _yuitest_coverline("build/event-simulate/event-simulate.js", 470);
customEvent.button = 1;
                _yuitest_coverline("build/event-simulate/event-simulate.js", 471);
break;
            case 1:
                _yuitest_coverline("build/event-simulate/event-simulate.js", 473);
customEvent.button = 4;
                _yuitest_coverline("build/event-simulate/event-simulate.js", 474);
break;
            case 2:
                //leave as is
                _yuitest_coverline("build/event-simulate/event-simulate.js", 477);
break;
            default:
                _yuitest_coverline("build/event-simulate/event-simulate.js", 479);
customEvent.button = 0;
        }

        /*
         * Have to use relatedTarget because IE won't allow assignment
         * to toElement or fromElement on generic events. This keeps
         * YAHOO.util.customEvent.getRelatedTarget() functional.
         */
        _yuitest_coverline("build/event-simulate/event-simulate.js", 487);
customEvent.relatedTarget = relatedTarget;

        //fire the event
        _yuitest_coverline("build/event-simulate/event-simulate.js", 490);
target.fireEvent("on" + type, customEvent);

    } else {
        _yuitest_coverline("build/event-simulate/event-simulate.js", 493);
Y.error("simulateMouseEvent(): No event simulation framework present.");
    }}
}

/*
 * Note: Intentionally not for YUIDoc generation.
 * Simulates a UI event using the given event information to populate
 * the generated event object. This method does browser-equalizing
 * calculations to account for differences in the DOM and IE event models
 * as well as different browser quirks.
 * @method simulateHTMLEvent
 * @private
 * @static
 * @param {HTMLElement} target The target of the given event.
 * @param {String} type The type of event to fire. This can be any one of
 *      the following: click, dblclick, mousedown, mouseup, mouseout,
 *      mouseover, and mousemove.
 * @param {Boolean} bubbles (Optional) Indicates if the event can be
 *      bubbled up. DOM Level 2 specifies that all mouse events bubble by
 *      default. The default is true.
 * @param {Boolean} cancelable (Optional) Indicates if the event can be
 *      canceled using preventDefault(). DOM Level 2 specifies that all
 *      mouse events except mousemove can be cancelled. The default
 *      is true for all events except mousemove, for which the default
 *      is false.
 * @param {Window} view (Optional) The view containing the target. This is
 *      typically the window object. The default is window.
 * @param {int} detail (Optional) The number of times the mouse button has
 *      been used. The default value is 1.
 */
_yuitest_coverline("build/event-simulate/event-simulate.js", 523);
function simulateUIEvent(target /*:HTMLElement*/, type /*:String*/,
                               bubbles /*:Boolean*/,  cancelable /*:Boolean*/,
                               view /*:Window*/,        detail /*:int*/) /*:Void*/
{

    //check target
    _yuitest_coverfunc("build/event-simulate/event-simulate.js", "simulateUIEvent", 523);
_yuitest_coverline("build/event-simulate/event-simulate.js", 529);
if (!target){
        _yuitest_coverline("build/event-simulate/event-simulate.js", 530);
Y.error("simulateUIEvent(): Invalid target.");
    }

    //check event type
    _yuitest_coverline("build/event-simulate/event-simulate.js", 534);
if (isString(type)){
        _yuitest_coverline("build/event-simulate/event-simulate.js", 535);
type = type.toLowerCase();

        //make sure it's a supported mouse event
        _yuitest_coverline("build/event-simulate/event-simulate.js", 538);
if (!uiEvents[type]){
            _yuitest_coverline("build/event-simulate/event-simulate.js", 539);
Y.error("simulateUIEvent(): Event type '" + type + "' not supported.");
        }
    } else {
        _yuitest_coverline("build/event-simulate/event-simulate.js", 542);
Y.error("simulateUIEvent(): Event type must be a string.");
    }

    //try to create a mouse event
    _yuitest_coverline("build/event-simulate/event-simulate.js", 546);
var customEvent = null;


    //setup default values
    _yuitest_coverline("build/event-simulate/event-simulate.js", 550);
if (!isBoolean(bubbles)){
        _yuitest_coverline("build/event-simulate/event-simulate.js", 551);
bubbles = (type in bubbleEvents);  //not all events bubble
    }
    _yuitest_coverline("build/event-simulate/event-simulate.js", 553);
if (!isBoolean(cancelable)){
        _yuitest_coverline("build/event-simulate/event-simulate.js", 554);
cancelable = (type === "submit"); //submit is the only one that can be cancelled
    }
    _yuitest_coverline("build/event-simulate/event-simulate.js", 556);
if (!isObject(view)){
        _yuitest_coverline("build/event-simulate/event-simulate.js", 557);
view = Y.config.win; //view is typically window
    }
    _yuitest_coverline("build/event-simulate/event-simulate.js", 559);
if (!isNumber(detail)){
        _yuitest_coverline("build/event-simulate/event-simulate.js", 560);
detail = 1;  //usually not used but defaulted to this
    }

    //check for DOM-compliant browsers first
    _yuitest_coverline("build/event-simulate/event-simulate.js", 564);
if (isFunction(Y.config.doc.createEvent)){

        //just a generic UI Event object is needed
        _yuitest_coverline("build/event-simulate/event-simulate.js", 567);
customEvent = Y.config.doc.createEvent("UIEvents");
        _yuitest_coverline("build/event-simulate/event-simulate.js", 568);
customEvent.initUIEvent(type, bubbles, cancelable, view, detail);

        //fire the event
        _yuitest_coverline("build/event-simulate/event-simulate.js", 571);
target.dispatchEvent(customEvent);

    } else {_yuitest_coverline("build/event-simulate/event-simulate.js", 573);
if (isObject(Y.config.doc.createEventObject)){ //IE

        //create an IE event object
        _yuitest_coverline("build/event-simulate/event-simulate.js", 576);
customEvent = Y.config.doc.createEventObject();

        //assign available properties
        _yuitest_coverline("build/event-simulate/event-simulate.js", 579);
customEvent.bubbles = bubbles;
        _yuitest_coverline("build/event-simulate/event-simulate.js", 580);
customEvent.cancelable = cancelable;
        _yuitest_coverline("build/event-simulate/event-simulate.js", 581);
customEvent.view = view;
        _yuitest_coverline("build/event-simulate/event-simulate.js", 582);
customEvent.detail = detail;

        //fire the event
        _yuitest_coverline("build/event-simulate/event-simulate.js", 585);
target.fireEvent("on" + type, customEvent);

    } else {
        _yuitest_coverline("build/event-simulate/event-simulate.js", 588);
Y.error("simulateUIEvent(): No event simulation framework present.");
    }}
}

/*
 * (iOS only) This is for creating native DOM gesture events which only iOS
 * v2.0+ is supporting.
 * 
 * @method simulateGestureEvent
 * @private
 * @param {HTMLElement} target The target of the given event.
 * @param {String} type The type of event to fire. This can be any one of
 *      the following: touchstart, touchmove, touchend, touchcancel.
 * @param {Boolean} bubbles (Optional) Indicates if the event can be
 *      bubbled up. DOM Level 2 specifies that all mouse events bubble by
 *      default. The default is true.
 * @param {Boolean} cancelable (Optional) Indicates if the event can be
 *      canceled using preventDefault(). DOM Level 2 specifies that all
 *      touch events except touchcancel can be cancelled. The default
 *      is true for all events except touchcancel, for which the default
 *      is false.
 * @param {Window} view (Optional) The view containing the target. This is
 *      typically the window object. The default is window.
 * @param {int} detail (Optional) Specifies some detail information about 
 *      the event depending on the type of event.
 * @param {int} screenX (Optional) The x-coordinate on the screen at which
 *      point the event occured. The default is 0.
 * @param {int} screenY (Optional) The y-coordinate on the screen at which
 *      point the event occured. The default is 0.
 * @param {int} clientX (Optional) The x-coordinate on the client at which
 *      point the event occured. The default is 0.
 * @param {int} clientY (Optional) The y-coordinate on the client at which
 *      point the event occured. The default is 0.
 * @param {Boolean} ctrlKey (Optional) Indicates if one of the CTRL keys
 *      is pressed while the event is firing. The default is false.
 * @param {Boolean} altKey (Optional) Indicates if one of the ALT keys
 *      is pressed while the event is firing. The default is false.
 * @param {Boolean} shiftKey (Optional) Indicates if one of the SHIFT keys
 *      is pressed while the event is firing. The default is false.
 * @param {Boolean} metaKey (Optional) Indicates if one of the META keys
 *      is pressed while the event is firing. The default is false. 
 * @param {float} scale (iOS v2+ only) The distance between two fingers 
 *      since the start of an event as a multiplier of the initial distance. 
 *      The default value is 1.0.
 * @param {float} rotation (iOS v2+ only) The delta rotation since the start 
 *      of an event, in degrees, where clockwise is positive and 
 *      counter-clockwise is negative. The default value is 0.0.   
 */
_yuitest_coverline("build/event-simulate/event-simulate.js", 636);
function simulateGestureEvent(target, type,
    bubbles,            // boolean
    cancelable,         // boolean
    view,               // DOMWindow
    detail,             // long
    screenX, screenY,   // long
    clientX, clientY,   // long
    ctrlKey, altKey, shiftKey, metaKey, // boolean
    scale,              // float
    rotation            // float
) {
    _yuitest_coverfunc("build/event-simulate/event-simulate.js", "simulateGestureEvent", 636);
_yuitest_coverline("build/event-simulate/event-simulate.js", 647);
var customEvent;

    _yuitest_coverline("build/event-simulate/event-simulate.js", 649);
if(!Y.UA.ios || Y.UA.ios<2.0) {
        _yuitest_coverline("build/event-simulate/event-simulate.js", 650);
Y.error("simulateGestureEvent(): Native gesture DOM eventframe is not available in this platform.");
    }

    // check taget    
    _yuitest_coverline("build/event-simulate/event-simulate.js", 654);
if (!target){
        _yuitest_coverline("build/event-simulate/event-simulate.js", 655);
Y.error("simulateGestureEvent(): Invalid target.");
    }

    //check event type
    _yuitest_coverline("build/event-simulate/event-simulate.js", 659);
if (Y.Lang.isString(type)) {
        _yuitest_coverline("build/event-simulate/event-simulate.js", 660);
type = type.toLowerCase();

        //make sure it's a supported touch event
        _yuitest_coverline("build/event-simulate/event-simulate.js", 663);
if (!gestureEvents[type]){
            _yuitest_coverline("build/event-simulate/event-simulate.js", 664);
Y.error("simulateTouchEvent(): Event type '" + type + "' not supported.");
        }
    } else {
        _yuitest_coverline("build/event-simulate/event-simulate.js", 667);
Y.error("simulateGestureEvent(): Event type must be a string.");
    }

    // setup default values
    _yuitest_coverline("build/event-simulate/event-simulate.js", 671);
if (!Y.Lang.isBoolean(bubbles)) { bubbles = true; } // bubble by default
    _yuitest_coverline("build/event-simulate/event-simulate.js", 672);
if (!Y.Lang.isBoolean(cancelable)) { cancelable = true; } 
    _yuitest_coverline("build/event-simulate/event-simulate.js", 673);
if (!Y.Lang.isObject(view))     { view = Y.config.win; }
    _yuitest_coverline("build/event-simulate/event-simulate.js", 674);
if (!Y.Lang.isNumber(detail))   { detail = 2; }     // usually not used.
    _yuitest_coverline("build/event-simulate/event-simulate.js", 675);
if (!Y.Lang.isNumber(screenX))  { screenX = 0; }
    _yuitest_coverline("build/event-simulate/event-simulate.js", 676);
if (!Y.Lang.isNumber(screenY))  { screenY = 0; }
    _yuitest_coverline("build/event-simulate/event-simulate.js", 677);
if (!Y.Lang.isNumber(clientX))  { clientX = 0; }
    _yuitest_coverline("build/event-simulate/event-simulate.js", 678);
if (!Y.Lang.isNumber(clientY))  { clientY = 0; }
    _yuitest_coverline("build/event-simulate/event-simulate.js", 679);
if (!Y.Lang.isBoolean(ctrlKey)) { ctrlKey = false; }
    _yuitest_coverline("build/event-simulate/event-simulate.js", 680);
if (!Y.Lang.isBoolean(altKey))  { altKey = false; }
    _yuitest_coverline("build/event-simulate/event-simulate.js", 681);
if (!Y.Lang.isBoolean(shiftKey)){ shiftKey = false; }
    _yuitest_coverline("build/event-simulate/event-simulate.js", 682);
if (!Y.Lang.isBoolean(metaKey)) { metaKey = false; }

    _yuitest_coverline("build/event-simulate/event-simulate.js", 684);
if (!Y.Lang.isNumber(scale)){ scale = 1.0; }
    _yuitest_coverline("build/event-simulate/event-simulate.js", 685);
if (!Y.Lang.isNumber(rotation)){ rotation = 0.0; }

    _yuitest_coverline("build/event-simulate/event-simulate.js", 687);
customEvent = Y.config.doc.createEvent("GestureEvent");

    _yuitest_coverline("build/event-simulate/event-simulate.js", 689);
customEvent.initGestureEvent(type, bubbles, cancelable, view, detail,
        screenX, screenY, clientX, clientY,
        ctrlKey, altKey, shiftKey, metaKey,
        target, scale, rotation);

    _yuitest_coverline("build/event-simulate/event-simulate.js", 694);
target.dispatchEvent(customEvent);
}


/*
 * @method simulateTouchEvent
 * @private
 * @param {HTMLElement} target The target of the given event.
 * @param {String} type The type of event to fire. This can be any one of
 *      the following: touchstart, touchmove, touchend, touchcancel.
 * @param {Boolean} bubbles (Optional) Indicates if the event can be
 *      bubbled up. DOM Level 2 specifies that all mouse events bubble by
 *      default. The default is true.
 * @param {Boolean} cancelable (Optional) Indicates if the event can be
 *      canceled using preventDefault(). DOM Level 2 specifies that all
 *      touch events except touchcancel can be cancelled. The default
 *      is true for all events except touchcancel, for which the default
 *      is false.
 * @param {Window} view (Optional) The view containing the target. This is
 *      typically the window object. The default is window.
 * @param {int} detail (Optional) Specifies some detail information about 
 *      the event depending on the type of event.
 * @param {int} screenX (Optional) The x-coordinate on the screen at which
 *      point the event occured. The default is 0.
 * @param {int} screenY (Optional) The y-coordinate on the screen at which
 *      point the event occured. The default is 0.
 * @param {int} clientX (Optional) The x-coordinate on the client at which
 *      point the event occured. The default is 0.
 * @param {int} clientY (Optional) The y-coordinate on the client at which
 *      point the event occured. The default is 0.
 * @param {Boolean} ctrlKey (Optional) Indicates if one of the CTRL keys
 *      is pressed while the event is firing. The default is false.
 * @param {Boolean} altKey (Optional) Indicates if one of the ALT keys
 *      is pressed while the event is firing. The default is false.
 * @param {Boolean} shiftKey (Optional) Indicates if one of the SHIFT keys
 *      is pressed while the event is firing. The default is false.
 * @param {Boolean} metaKey (Optional) Indicates if one of the META keys
 *      is pressed while the event is firing. The default is false. 
 * @param {TouchList} touches A collection of Touch objects representing 
 *      all touches associated with this event.
 * @param {TouchList} targetTouches A collection of Touch objects 
 *      representing all touches associated with this target.
 * @param {TouchList} changedTouches A collection of Touch objects 
 *      representing all touches that changed in this event.
 * @param {float} scale (iOS v2+ only) The distance between two fingers 
 *      since the start of an event as a multiplier of the initial distance. 
 *      The default value is 1.0.
 * @param {float} rotation (iOS v2+ only) The delta rotation since the start 
 *      of an event, in degrees, where clockwise is positive and 
 *      counter-clockwise is negative. The default value is 0.0.   
 */
_yuitest_coverline("build/event-simulate/event-simulate.js", 745);
function simulateTouchEvent(target, type,
    bubbles,            // boolean
    cancelable,         // boolean
    view,               // DOMWindow
    detail,             // long
    screenX, screenY,   // long
    clientX, clientY,   // long
    ctrlKey, altKey, shiftKey, metaKey, // boolean
    touches,            // TouchList
    targetTouches,      // TouchList
    changedTouches,     // TouchList
    scale,              // float
    rotation            // float
) {

    _yuitest_coverfunc("build/event-simulate/event-simulate.js", "simulateTouchEvent", 745);
_yuitest_coverline("build/event-simulate/event-simulate.js", 760);
var customEvent;

    // check taget    
    _yuitest_coverline("build/event-simulate/event-simulate.js", 763);
if (!target){
        _yuitest_coverline("build/event-simulate/event-simulate.js", 764);
Y.error("simulateTouchEvent(): Invalid target.");
    }

    //check event type
    _yuitest_coverline("build/event-simulate/event-simulate.js", 768);
if (Y.Lang.isString(type)) {
        _yuitest_coverline("build/event-simulate/event-simulate.js", 769);
type = type.toLowerCase();

        //make sure it's a supported touch event
        _yuitest_coverline("build/event-simulate/event-simulate.js", 772);
if (!touchEvents[type]){
            _yuitest_coverline("build/event-simulate/event-simulate.js", 773);
Y.error("simulateTouchEvent(): Event type '" + type + "' not supported.");
        }
    } else {
        _yuitest_coverline("build/event-simulate/event-simulate.js", 776);
Y.error("simulateTouchEvent(): Event type must be a string.");
    }

    // note that the caller is responsible to pass appropriate touch objects.
    // check touch objects
    // Android(even 4.0) doesn't define TouchList yet
    /*if(type === 'touchstart' || type === 'touchmove') {
        if(!touches instanceof TouchList) {
            Y.error('simulateTouchEvent(): Invalid touches. It must be a TouchList');
        } else {
            if(touches.length === 0) {
                Y.error('simulateTouchEvent(): No touch object found.');
            }
        }
    } else if(type === 'touchend') {
        if(!changedTouches instanceof TouchList) {
            Y.error('simulateTouchEvent(): Invalid touches. It must be a TouchList');
        } else {
            if(changedTouches.length === 0) {
                Y.error('simulateTouchEvent(): No touch object found.');
            }
        }
    }*/

    _yuitest_coverline("build/event-simulate/event-simulate.js", 800);
if(type === 'touchstart' || type === 'touchmove') {
        _yuitest_coverline("build/event-simulate/event-simulate.js", 801);
if(touches.length === 0) {
            _yuitest_coverline("build/event-simulate/event-simulate.js", 802);
Y.error('simulateTouchEvent(): No touch object in touches');
        }
    } else {_yuitest_coverline("build/event-simulate/event-simulate.js", 804);
if(type === 'touchend') {
        _yuitest_coverline("build/event-simulate/event-simulate.js", 805);
if(changedTouches.length === 0) {
            _yuitest_coverline("build/event-simulate/event-simulate.js", 806);
Y.error('simulateTouchEvent(): No touch object in changedTouches');
        }
    }}

    // setup default values
    _yuitest_coverline("build/event-simulate/event-simulate.js", 811);
if (!Y.Lang.isBoolean(bubbles)) { bubbles = true; } // bubble by default.
    _yuitest_coverline("build/event-simulate/event-simulate.js", 812);
if (!Y.Lang.isBoolean(cancelable)) { 
        _yuitest_coverline("build/event-simulate/event-simulate.js", 813);
cancelable = (type !== "touchcancel"); // touchcancel is not cancelled 
    } 
    _yuitest_coverline("build/event-simulate/event-simulate.js", 815);
if (!Y.Lang.isObject(view))     { view = Y.config.win; }
    _yuitest_coverline("build/event-simulate/event-simulate.js", 816);
if (!Y.Lang.isNumber(detail))   { detail = 1; } // usually not used. defaulted to # of touch objects.
    _yuitest_coverline("build/event-simulate/event-simulate.js", 817);
if (!Y.Lang.isNumber(screenX))  { screenX = 0; }
    _yuitest_coverline("build/event-simulate/event-simulate.js", 818);
if (!Y.Lang.isNumber(screenY))  { screenY = 0; }
    _yuitest_coverline("build/event-simulate/event-simulate.js", 819);
if (!Y.Lang.isNumber(clientX))  { clientX = 0; }
    _yuitest_coverline("build/event-simulate/event-simulate.js", 820);
if (!Y.Lang.isNumber(clientY))  { clientY = 0; }
    _yuitest_coverline("build/event-simulate/event-simulate.js", 821);
if (!Y.Lang.isBoolean(ctrlKey)) { ctrlKey = false; }
    _yuitest_coverline("build/event-simulate/event-simulate.js", 822);
if (!Y.Lang.isBoolean(altKey))  { altKey = false; }
    _yuitest_coverline("build/event-simulate/event-simulate.js", 823);
if (!Y.Lang.isBoolean(shiftKey)){ shiftKey = false; }
    _yuitest_coverline("build/event-simulate/event-simulate.js", 824);
if (!Y.Lang.isBoolean(metaKey)) { metaKey = false; }
    _yuitest_coverline("build/event-simulate/event-simulate.js", 825);
if (!Y.Lang.isNumber(scale))    { scale = 1.0; }
    _yuitest_coverline("build/event-simulate/event-simulate.js", 826);
if (!Y.Lang.isNumber(rotation)) { rotation = 0.0; }


    //check for DOM-compliant browsers first
    _yuitest_coverline("build/event-simulate/event-simulate.js", 830);
if (Y.Lang.isFunction(Y.config.doc.createEvent)) {
        _yuitest_coverline("build/event-simulate/event-simulate.js", 831);
if (Y.UA.android) {
            /*
                * Couldn't find android start version that supports touch event. 
                * Assumed supported(btw APIs broken till icecream sandwitch) 
                * from the beginning.
            */
            _yuitest_coverline("build/event-simulate/event-simulate.js", 837);
if(Y.UA.android < 4.0) {
                /*
                    * Touch APIs are broken in androids older than 4.0. We will use 
                    * simulated touch apis for these versions. 
                    * App developer still can listen for touch events. This events
                    * will be dispatched with touch event types.
                    * 
                    * (Note) Used target for the relatedTarget. Need to verify if
                    * it has a side effect.
                */
                _yuitest_coverline("build/event-simulate/event-simulate.js", 847);
customEvent = Y.config.doc.createEvent("MouseEvents");
                _yuitest_coverline("build/event-simulate/event-simulate.js", 848);
customEvent.initMouseEvent(type, bubbles, cancelable, view, detail, 
                    screenX, screenY, clientX, clientY,
                    ctrlKey, altKey, shiftKey, metaKey,
                    0, target);

                _yuitest_coverline("build/event-simulate/event-simulate.js", 853);
customEvent.touches = touches;
                _yuitest_coverline("build/event-simulate/event-simulate.js", 854);
customEvent.targetTouches = targetTouches;
                _yuitest_coverline("build/event-simulate/event-simulate.js", 855);
customEvent.changedTouches = changedTouches;
            } else {
                _yuitest_coverline("build/event-simulate/event-simulate.js", 857);
customEvent = Y.config.doc.createEvent("TouchEvent");

                // Andoroid isn't compliant W3C initTouchEvent method signature.
                _yuitest_coverline("build/event-simulate/event-simulate.js", 860);
customEvent.initTouchEvent(touches, targetTouches, changedTouches,
                    type, view,
                    screenX, screenY, clientX, clientY,
                    ctrlKey, altKey, shiftKey, metaKey);
            }
        } else {_yuitest_coverline("build/event-simulate/event-simulate.js", 865);
if (Y.UA.ios) {
            _yuitest_coverline("build/event-simulate/event-simulate.js", 866);
if(Y.UA.ios >= 2.0) {
                _yuitest_coverline("build/event-simulate/event-simulate.js", 867);
customEvent = Y.config.doc.createEvent("TouchEvent");

                // Available iOS 2.0 and later
                _yuitest_coverline("build/event-simulate/event-simulate.js", 870);
customEvent.initTouchEvent(type, bubbles, cancelable, view, detail,
                    screenX, screenY, clientX, clientY,
                    ctrlKey, altKey, shiftKey, metaKey,
                    touches, targetTouches, changedTouches,
                    scale, rotation);
            } else {
                _yuitest_coverline("build/event-simulate/event-simulate.js", 876);
Y.error('simulateTouchEvent(): No touch event simulation framework present for iOS, '+Y.UA.ios+'.');
            }
        } else {
            _yuitest_coverline("build/event-simulate/event-simulate.js", 879);
Y.error('simulateTouchEvent(): Not supported agent yet, '+Y.UA.userAgent);
        }}

        //fire the event
        _yuitest_coverline("build/event-simulate/event-simulate.js", 883);
target.dispatchEvent(customEvent);
    //} else if (Y.Lang.isObject(doc.createEventObject)){ // Windows Mobile/IE, support later 
    } else {
        _yuitest_coverline("build/event-simulate/event-simulate.js", 886);
Y.error('simulateTouchEvent(): No event simulation framework present.');
    }
}

/**
 * Simulates the event or gesture with the given name on a target.
 * @param {HTMLElement} target The DOM element that's the target of the event.
 * @param {String} type The type of event or name of the supported gesture to simulate 
 *      (i.e., "click", "doubletap", "flick").
 * @param {Object} options (Optional) Extra options to copy onto the event object. 
 *      For gestures, options are used to refine the gesture behavior.
 * @return {void}
 * @for Event
 * @method simulate
 * @static
 */
_yuitest_coverline("build/event-simulate/event-simulate.js", 902);
Y.Event.simulate = function(target, type, options){

    _yuitest_coverfunc("build/event-simulate/event-simulate.js", "simulate", 902);
_yuitest_coverline("build/event-simulate/event-simulate.js", 904);
options = options || {};

    _yuitest_coverline("build/event-simulate/event-simulate.js", 906);
if (mouseEvents[type] || msPointerEvents[type]){
        _yuitest_coverline("build/event-simulate/event-simulate.js", 907);
simulateMouseEvent(target, type, options.bubbles,
            options.cancelable, options.view, options.detail, options.screenX,
            options.screenY, options.clientX, options.clientY, options.ctrlKey,
            options.altKey, options.shiftKey, options.metaKey, options.button,
            options.relatedTarget);
    } else {_yuitest_coverline("build/event-simulate/event-simulate.js", 912);
if (keyEvents[type]){
        _yuitest_coverline("build/event-simulate/event-simulate.js", 913);
simulateKeyEvent(target, type, options.bubbles,
            options.cancelable, options.view, options.ctrlKey,
            options.altKey, options.shiftKey, options.metaKey,
            options.keyCode, options.charCode);
    } else {_yuitest_coverline("build/event-simulate/event-simulate.js", 917);
if (uiEvents[type]){
        _yuitest_coverline("build/event-simulate/event-simulate.js", 918);
simulateUIEvent(target, type, options.bubbles,
            options.cancelable, options.view, options.detail);
            
    // touch low-level event simulation        
    } else {_yuitest_coverline("build/event-simulate/event-simulate.js", 922);
if (touchEvents[type]) {
        _yuitest_coverline("build/event-simulate/event-simulate.js", 923);
if((Y.config.win && ("ontouchstart" in Y.config.win)) && !(Y.UA.phantomjs) && !(Y.UA.chrome && Y.UA.chrome < 6)) {
            _yuitest_coverline("build/event-simulate/event-simulate.js", 924);
simulateTouchEvent(target, type, 
                options.bubbles, options.cancelable, options.view, options.detail, 
                options.screenX, options.screenY, options.clientX, options.clientY, 
                options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, 
                options.touches, options.targetTouches, options.changedTouches,
                options.scale, options.rotation);
        } else {
            _yuitest_coverline("build/event-simulate/event-simulate.js", 931);
Y.error("simulate(): Event '" + type + "' can't be simulated. Use gesture-simulate module instead.");
        }

    // ios gesture low-level event simulation (iOS v2+ only)        
    } else {_yuitest_coverline("build/event-simulate/event-simulate.js", 935);
if(Y.UA.ios && Y.UA.ios >= 2.0 && gestureEvents[type]) {
        _yuitest_coverline("build/event-simulate/event-simulate.js", 936);
simulateGestureEvent(target, type, 
            options.bubbles, options.cancelable, options.view, options.detail, 
            options.screenX, options.screenY, options.clientX, options.clientY, 
            options.ctrlKey, options.altKey, options.shiftKey, options.metaKey,
            options.scale, options.rotation);
    
    // anything else
    } else {
        _yuitest_coverline("build/event-simulate/event-simulate.js", 944);
Y.error("simulate(): Event '" + type + "' can't be simulated.");
    }}}}}
};


})();



}, '@VERSION@', {"requires": ["event-base"]});
