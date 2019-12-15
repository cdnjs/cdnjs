/* Native JavaScript for Bootstrap 3 IE8+ Polyfill
--------------------------------------------*/
(function(){

  // all repeated strings get a single reference
  // document | window | element + corrections
  var Doc = 'Document', doc = document, DOCUMENT = this[Doc] || this.HTMLDocument, // IE8
    WIN = 'Window', win = window, WINDOW =  this.constructor || this[WIN] || Window, // old Safari
    HTMLELEMENT = 'HTMLElement', documentElement = 'documentElement', ELEMENT = Element,

    // classList related
    className = 'className', add = 'add', classList = 'classList', remove = 'remove', contains = 'contains',
    CLASS = 'class', setATTRIBUTE = 'setAttribute', getATTRIBUTE = 'getAttribute',
    
    // object | array related
    prototype = 'prototype', indexOf = 'indexOf', length = 'length', split = 'split', trim = 'trim',

    // event related
    EVENT = 'Event', CustomEvent = 'CustomEvent', IE8EVENTS = '_events', 
    etype = 'type', target = 'target', currentTarget = 'currentTarget', relatedTarget = 'relatedTarget',
    cancelable = 'cancelable', bubbles = 'bubbles', cancelBubble = 'cancelBubble', cancelImmediate = 'cancelImmediate', detail = 'detail',
    addEventListener = 'addEventListener', removeEventListener = 'removeEventListener', dispatchEvent = 'dispatchEvent';

  // Element
  if (!win[HTMLELEMENT]) { win[HTMLELEMENT] = win[ELEMENT]; }

  // Array[prototype][indexOf]
  if (!Array[prototype][indexOf]) {
    Array[prototype][indexOf] = function(searchElement) {
      if (this === undefined || this === null) {
        throw new TypeError(this + ' is not an object');
      }
    
      var  arraylike = this instanceof String ? this[split]('') : this,
        lengthValue = Math.max(Math.min(arraylike[length], 9007199254740991), 0) || 0,
        index = Number(arguments[1]) || 0;
    
      index = (index < 0 ? Math.max(lengthValue + index, 0) : index) - 1;
    
      while (++index < lengthValue) {
        if (index in arraylike && arraylike[index] === searchElement) {
          return index;
        }
      }
    
      return -1;
    };
  }

  if (!String[prototype][trim]) {
    String[prototype][trim] = function () {
      return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    };
  }

  // Element.prototype.classList by thednp
  if( !(classList in ELEMENT[prototype]) ) {
    var ClassLIST = function(elem){
      var classArr = (elem[getATTRIBUTE](CLASS)||'').replace(/^\s+|\s+$/g,'')[split](/\s+/) || [];
          
          // methods
          hasClass = this[contains] = function(classNAME){
            return classArr[indexOf](classNAME) > -1;
          },
          addClass = this[add] = function(classNAME){
            if (!hasClass(classNAME)) {
              classArr.push(classNAME);
              elem[setATTRIBUTE](CLASS, classArr.join(' '));
            }
          },
          removeClass = this[remove] = function(classNAME){
            if (hasClass(classNAME)) {
              classArr.splice(classArr[indexOf](classNAME),1);
              elem[setATTRIBUTE](CLASS, classArr.join(' '));
            }
          },
          toggleClass = this.toggle = function(classNAME){
            if ( hasClass(classNAME) ) { removeClass(classNAME); } 
            else { addClass(classNAME); } 
          };
    }
    Object.defineProperty(ELEMENT[prototype], classList, { get: function () { return new ClassLIST(this); } });
  }

  // Event
  if (!win[EVENT]||!WINDOW[prototype][EVENT]) {
    win[EVENT] = WINDOW[prototype][EVENT] = DOCUMENT[prototype][EVENT] = ELEMENT[prototype][EVENT] = function(type, eventInitDict) {
      if (!type) { throw new Error('Not enough arguments'); }
      var event, 
        bubblesValue = eventInitDict && eventInitDict[bubbles] !== undefined ? eventInitDict[bubbles] : false,
        cancelableValue = eventInitDict && eventInitDict[cancelable] !== undefined ? eventInitDict[cancelable] : false;
      if ( 'createEvent' in doc ) {
        event = doc.createEvent(EVENT);      
        event.initEvent(type, bubblesValue, cancelableValue);
      } else {
        event = doc.createEventObject();
        event[etype] = type;
        event[bubbles] = bubblesValue;
        event[cancelable] = cancelableValue;
      }
      return event;
    };
  }

  // CustomEvent
  if (!(CustomEvent in win) || !(CustomEvent in WINDOW[prototype])) {
    win[CustomEvent] = WINDOW[prototype][CustomEvent] = DOCUMENT[prototype][CustomEvent] = Element[prototype][CustomEvent] = function(type, eventInitDict) {
      if (!type) {
        throw Error('CustomEvent TypeError: An event name must be provided.');
      }
      var event = new Event(type, eventInitDict);
      event[detail] = eventInitDict && eventInitDict[detail] || null;
      return event;
    };
  }

  // addEventListener | removeEventListener
  if (!win[addEventListener]||!WINDOW[prototype][addEventListener]) {
    win[addEventListener] = WINDOW[prototype][addEventListener] = DOCUMENT[prototype][addEventListener] = ELEMENT[prototype][addEventListener] = function() {
      var  element = this,
        type = arguments[0],
        listener = arguments[1];

      if (!element[IE8EVENTS]) {  element[IE8EVENTS] = {}; }

      if (!element[IE8EVENTS][type]) {
        element[IE8EVENTS][type] = function (event) {
          var  list = element[IE8EVENTS][event[etype]].list,
            events = list.slice(),
            index = -1,
            lengthValue = events[length],
            eventElement;

          event.preventDefault = function() {
            if (event[cancelable] !== false) {
              event.returnValue = false;
            }
          };

          event.stopPropagation = function() {
            event[cancelBubble] = true;
          };

          event.stopImmediatePropagation = function() {
            event[cancelBubble] = true;
            event[cancelImmediate] = true;
          };

          event[currentTarget] = element;
          event[relatedTarget] = event[relatedTarget] || event.fromElement || null;
          event[target] = event[target] || event.srcElement || element;
          event.timeStamp = new Date().getTime();

          if (event.clientX) {
            event.pageX = event.clientX + doc[documentElement].scrollLeft;
            event.pageY = event.clientY + doc[documentElement].scrollTop;
          }

          while (++index < lengthValue && !event[cancelImmediate]) {
            if (index in events) {
              eventElement = events[index];

              if (list[indexOf](eventElement) !== -1 && typeof eventElement === 'function') {
                eventElement.call(element, event);
              }
            }
          }
        };

        element[IE8EVENTS][type].list = [];

        if (element.attachEvent) {
          element.attachEvent('on' + type, element[IE8EVENTS][type]);
        }
      }

      element[IE8EVENTS][type].list.push(listener);
    };

    win[removeEventListener] = WINDOW[prototype][removeEventListener] = DOCUMENT[prototype][removeEventListener] = ELEMENT[prototype][removeEventListener] = function() {
      var  element = this,
        type = arguments[0],
        listener = arguments[1],
        index;

      if (element[IE8EVENTS] && element[IE8EVENTS][type] && element[IE8EVENTS][type].list) {
        index = element[IE8EVENTS][type].list[indexOf](listener);

        if (index !== -1) {
          element[IE8EVENTS][type].list.splice(index, 1);

          if (!element[IE8EVENTS][type].list[length]) {
            if (element.detachEvent) {
              element.detachEvent('on' + type, element[IE8EVENTS][type]);
            }
            delete element[IE8EVENTS][type];
          }
        }
      }
    };
  }

  // Event dispatcher
  if (!win[dispatchEvent]||!WINDOW[prototype][dispatchEvent]||!DOCUMENT[prototype][dispatchEvent]||!ELEMENT[prototype][dispatchEvent]) {
    win[dispatchEvent] = WINDOW[prototype][dispatchEvent] = DOCUMENT[prototype][dispatchEvent] = ELEMENT[prototype][dispatchEvent] = function (event) {
      if (!arguments[length]) {
        throw new Error('Not enough arguments');
      }

      if (!event || typeof event[etype] !== 'string') {
        throw new Error('DOM Events Exception 0');
      }

      var element = this, type = event[etype];

      try {
        if (!event[bubbles]) {
          event[cancelBubble] = true;

          var cancelBubbleEvent = function (event) {
            event[cancelBubble] = true;

            (element || win).detachEvent('on' + type, cancelBubbleEvent);
          };

          this.attachEvent('on' + type, cancelBubbleEvent);
        }

        this.fireEvent('on' + type, event);
      } catch (error) {
        event[target] = element;

        do {
          event[currentTarget] = element;

          if (IE8EVENTS in element && typeof element[IE8EVENTS][type] === 'function') {
            element[IE8EVENTS][type].call(element, event);
          }

          if (typeof element['on' + type] === 'function') {
            element['on' + type].call(element, event);
          }

          element = element.nodeType === 9 ? element.parentWindow : element.parentNode;
        } while (element && !event[cancelBubble]);
      }

      return true;
    };
  }
}());