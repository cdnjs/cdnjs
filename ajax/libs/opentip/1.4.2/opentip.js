/**
 ** More info at http://www.opentip.org
 **
 ** Copyright (c) 2009, Matias Meno
 ** Graphics by Tjandra Mayerhold
 **
 ** Permission is hereby granted, free of charge, to any person obtaining a copy
 ** of this software and associated documentation files (the "Software"), to deal
 ** in the Software without restriction, including without limitation the rights
 ** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 ** copies of the Software, and to permit persons to whom the Software is
 ** furnished to do so, subject to the following conditions:
 **
 ** The above copyright notice and this permission notice shall be included in
 ** all copies or substantial portions of the Software.
 **
 ** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 ** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 ** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 ** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 ** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 ** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 ** THE SOFTWARE.
 **
 **/


/**
 ** Usage:
 **
 ** <div onmouseover="javascript:Tips.add(this, event, 'Content', { options });"></div>
 **
 ** or externally:
 **
 ** $('elementId').addTip('Content', { options });
 **
 ** For a full documentation, please visit http://www.opentip.org/documentation
 **/



/**
 * Namespace and helper functions for opentips.
 */
var Opentip = {

  Version: '1.4.2',
  REQUIRED_PROTOTYPE_VERSION: '1.6.0',
  REQUIRED_SCRIPTACULOUS_VERSION: '1.8.0',
  STICKS_OUT_TOP: 1,
  STICKS_OUT_BOTTOM: 2,
  STICKS_OUT_LEFT: 1,
  STICKS_OUT_RIGHT: 2,
  cached: {},
  debugging: false,
  load: function() {
    function getComparableVersion(version) {var v = version.split('.');return parseInt(v[0])*100000 + parseInt(v[1])*1000 + parseInt(v[2]);}
    if((typeof Prototype === 'undefined') || (typeof Element === 'undefined') || (typeof Element.Methods === 'undefined') || (getComparableVersion(Prototype.Version) < getComparableVersion(Opentip.REQUIRED_PROTOTYPE_VERSION))) {throw("Opentip requires the Prototype JavaScript framework >= " + Opentip.REQUIRED_PROTOTYPE_VERSION);}

    Opentip.useCss3Transitions = Opentip.supports('transition');
    Opentip.useScriptaculousTransitions = ! Opentip.useCss3Transitions;

    if (Opentip.useCss3Transitions) Opentip.debug('Using CSS3 transitions.');

    if((typeof Scriptaculous === 'undefined') || (typeof Effect === 'undefined') || (getComparableVersion(Scriptaculous.Version) < getComparableVersion(Opentip.REQUIRED_SCRIPTACULOUS_VERSION))) {
      Opentip.debug('No scriptaculous available. Disabling scriptaculous transitions.');
      Opentip.useScriptaculousTransitions = false;
    }
  },
  debug: function() {if (this.debugging && typeof console !== 'undefined' && typeof console.debug !== 'undefined') console.debug.apply(console, arguments);},
  IEVersion: function() {
    if (typeof Opentip.cached.IEVersion !== 'undefined') return Opentip.cached.IEVersion;
    if (Prototype.Browser.IE) {
      var version = navigator.userAgent.match('MSIE ([\\d.]+)');
      var IEVersion = version ? (parseFloat(version[1])) : false;
    }
    else IEVersion = false;
    Opentip.cached.IEVersion = IEVersion;
    return IEVersion;
  },
  objectIsEvent: function(obj) {
    // There must be a better way of doing this.
    return (typeof(obj) == 'object' && obj.type && obj.screenX);
  },
  useIFrame: function() {return Opentip.IEVersion() ? (Opentip.IEVersion() <= 6) : false;},
  lastTipId: 1,
  lastZIndex: 100,
  documentIsLoaded: false,
  postponeCreation: function(createFunction) {
    if (Opentip.documentIsLoaded || !Opentip.IEVersion()) createFunction();
    else {
      Event.observe(window, 'load', createFunction); // Sorry IE users but... well: get another browser!
    }
  },

  // Mimics scriptaculous Builder.node behaviour
  element: function(tagName, attributes, children) {
    if (Object.isArray(attributes) || Object.isString(attributes) || Object.isElement(attributes)) {
      children = attributes;
      attributes = null;
    }

    var element = new Element(tagName, attributes || {});

    // This is a prototype 1.6 bug, that doesn't apply the className to IE8 elements.
    // Thanks to Alexander Shakhnovsky for finding the bug, and pinpointing the problem.
    if(attributes && attributes['className']) {
      attributes['className'].split(' ').each(function(class_name){element.addClassName(class_name);});
    }

    if (children) {
      if (Object.isArray(children)) {
        children.each(function(child) {
          element.insert({bottom: child});
        });
      }
      else {
        element.insert({bottom: children});
      }
    }
    return element;
  },

  // In the future every position attribute will go through this method.
  sanitizePosition: function(arrayPosition) {
    var position;
    if (Object.isArray(arrayPosition)) {
      var positionString = '';
      if (arrayPosition[0] == 'center') {
        positionString = arrayPosition[1];
      }
      else if (arrayPosition[1] == 'middle') {
        positionString = arrayPosition[0];
      }
      else {
        positionString = arrayPosition[1] + arrayPosition[0].capitalize();
      }
      if (Opentip.position[positionString] === undefined) throw 'Unknown position: ' + positionString;
      position = Opentip.position[positionString];
    }
    else if (Object.isString(arrayPosition)) {
      if (Opentip.position[arrayPosition] === undefined) throw 'Unknown position: ' + arrayPosition;
      position = Opentip.position[arrayPosition];
    }
    return parseInt(position);
  },


  /* Browser support testing */
  vendors: 'Khtml Ms O Moz Webkit'.split(' '),
  testDiv: document.createElement('div'),
  supports: function(prop) {
    if ( prop in Opentip.testDiv.style ) return true;

    prop = prop.ot_ucfirst();

    return Opentip.vendors.any(function(vendor) {
      return vendor + prop in Opentip.testDiv.style;
    });
  }
};

String.prototype.ot_ucfirst = function() {
    return this.replace(/^\w/, function(val) {return val.toUpperCase();});
  };

Opentip.load();





/**
 * The standard style.
 */

Opentip.styles = {
  standard: {
    // This style contains all default values for other styles.
    // POSITION : [ 'left|right|center', 'top|bottom|middle' ]
    // COORDINATE : [ XVALUE, YVALUE ] (integers)
    title: null,
    className: 'standard', // The class name to be used in the stylesheet
    stem: false, // false (no stem)   ||   true (stem at tipJoint position)   ||   POSITION (for stems in other directions)
    delay: null, // float (in seconds - if null, the default is used: 0.2 for mouseover, 0 for click)
    hideDelay: 0.1, // --
    fixed: false, // If target is not null, elements are always fixed.
    showOn: 'mouseover', // string (the observe string of the trigger element, eg: click, mouseover, etc..)   ||   'creation' (the tooltip will show when being created)   ||   null if you want to handle it yourself.
    hideTrigger: 'trigger', // 'trigger' | 'tip' | 'target' | 'closeButton' | ELEMENT | ELEMENT_ID
    hideOn: null, // string (event eg: click)   ||   null (let Opentip decide)
    offset: [ 0, 0 ], // COORDINATE
    containInViewport: true, // Whether the targetJoint/tipJoint should be changed if the tooltip is not in the viewport anymore.
    autoOffset: true, // If set to true, offsets are calculated automatically to position the tooltip. (pixels are added if there are stems for example)
    showEffect: 'appear', // scriptaculous or CSS3 (in opentip.css) effect
    fallbackShowEffect: 'appear', // At tip creation, this effect will override the showEffect, if useScriptaculousTransitions == true, and the showEffect does not exist.
    hideEffect: 'fade',
    fallbackHideEffect: 'appear',
    showEffectDuration: 0.3,
    hideEffectDuration: 0.2,
    stemSize: 8, // integer
    tipJoint: [ 'left', 'top' ], // POSITION
    target: null, // null (no target, opentip uses mouse as target)   ||   true (target is the triggerElement)   ||   elementId|element (for another element)
    targetJoint: null, // POSITION (Ignored if target == null)   ||   null (targetJoint is the opposite of tipJoint)
    ajax: false, // Ajax options. eg: { url: 'yourUrl.html', options: { ajaxOptions... } } or { options: { ajaxOptions } /* This will use the href of the A element the tooltip is attached to */ }
    group: null, // You can group opentips together. So when a tooltip shows, it looks if there are others in the same group, and hides them.
    escapeHtml: false,
    style: null
  },
  slick: {
    className: 'slick',
    stem: true
  },
  rounded: {
    className: 'rounded',
    stem: true
  },
  glass: {
    className: 'glass'
  }
};
Opentip.defaultStyle = 'standard'; // Change this to the style name you want your tooltips to have.



Opentip.position = {
  top: 0,
  topRight: 1,
  right: 2,
  bottomRight: 3,
  bottom: 4,
  bottomLeft: 5,
  left: 6,
  topLeft: 7
};



/**
 * On document load
 */
Event.observe(window, Opentip.IEVersion() ? 'load' : 'dom:loaded', function() {
  Opentip.documentIsLoaded = true;


  var htmlOptionNames = [];
  for (var i in Opentip.styles.standard) {
    htmlOptionNames.push(i.underscore().dasherize());
  }

  // Go through all elements, and look for elements that have inline element
  // opentip definitions.
  $$('[ot]').each(function(element) {
    var options = {};
    element = $(element);

    var content = element.readAttribute('ot');

    if (content === '' || content === 'true' || content === 'yes') {
      content = element.readAttribute('title');
      element.title = '';
    }


    content || (content = '');

    htmlOptionNames.each(function(optionName) {
      var optionValue;
      if (optionValue = element.readAttribute('ot-' + optionName)) {
        try {
          // See if it's a JSON string.
          optionValue = optionValue.gsub("'", '"').evalJSON();
        }
        catch (err) {
          // Well, it's not.
        }

        options[optionName.camelize()] = optionValue;
      }
    });

    element.addTip(content, options);
  });
});






var Tips = {
  list: [],
  append: function(tip) {this.list.push(tip);},
  remove: function(element) {
    if (!element.element) var tip = this.list.find(function(t) {return t.triggerElement === element});
    else var tip = this.list.find(function(t) {return t === element});
    if (tip) {
      tip.deactivate();
      tip.destroyAllElements();
      this.list = this.list.without(tip);
    }
  },
  add: function(element) {
    if (element._opentipAddedTips) {
      /* TODO: Now it just returns the first found... try to find the correct one. */
      var tip = this.list.find(function(t) {return (t.triggerElement === element);});
      if (tip.options.showOn == 'creation') tip.show();
      tip.debug('Using an existing opentip.');
      return;
    } else setTimeout(function() {element._opentipAddedTips = true;}, 1); // I added a timeout, so that tooltips, defined in an onmouseover or onclick event, will show.

    Opentip.debug('Creating new opentip');

    var tipArguments = [];

    $A(arguments).each(function(arg, idx) {
      if (idx == 1 && !Opentip.objectIsEvent(arg)) tipArguments.push(null);
      tipArguments.push(arg);
    });


    // Creating the tooltip object, but not yet activating it, or creating the container elements.
    var tooltip = new TipClass(tipArguments[0], tipArguments[1], tipArguments[2], tipArguments[3], tipArguments[4]);

    this.append(tooltip);

    var self = this;
    var createTip = function() {
      tooltip.create(tipArguments[1]); // Passing the event.
    }

    Opentip.postponeCreation(createTip);

    return tooltip;
  },
  hideGroup: function(groupName) {
    this.list.findAll(function(t) {return (t.options.group == groupName);}).invoke('doHide');
  },
  abortShowingGroup: function(groupName) {
    this.list.findAll(function(t) {return (t.options.group == groupName);}).invoke('abortShowing');
  }
};

var Tip = function() { return Tips.add.apply(Tips, arguments); };

Element.addMethods({
  addTip: function(element) {
    element = $(element);
    Tips.add.apply(Tips, arguments);
    return element;
  },
  setCss3Style: function(element) {
    element = $(element);
    var style = {};
    for (var propertyName in arguments[1]) {
      var css3PropertyName = propertyName.ot_ucfirst();
      var css3PropertyValue = arguments[1][propertyName];
      Opentip.vendors.each(function(vendor) {
        style[vendor + css3PropertyName] = css3PropertyValue;
        element.setStyle(style);
      });
    }
    return element;
  }
});


var TipClass = Class.create({
  debug: function() {
    var newArguments = Array.from(arguments);
    newArguments.unshift('ID:', this.id, '|');
    Opentip.debug.apply(Opentip, newArguments);
  },
  initialize: function(element, evt) {
    this.id = Opentip.lastTipId ++;

    element = $(element);

    this.triggerElement = element;

    this.loaded  = false; // for ajax
    this.loading = false; // for ajax

    this.visible = false;
    this.waitingToShow = false;
    this.waitingToHide = false;

    this.lastPosition = {left: 0, top: 0};
    this.dimensions   = [ 100, 50 ]; // Just some initial values.

    var options = {};
    this.content = '';

    if      (typeof(arguments[2]) == 'object') {options = Object.clone(arguments[2]);}
    else if (typeof(arguments[3]) == 'object') {this.setContent(arguments[2]);options = Object.clone(arguments[3]);}
    else if (typeof(arguments[4]) == 'object') {this.setContent(arguments[2]);options = Object.clone(arguments[4]);options.title = arguments[3];}
    else {
      if (Object.isString(arguments[2]) || Object.isFunction(arguments[2])) this.setContent(arguments[2]);
      if (Object.isString(arguments[3])) options.title = arguments[3];
    }

    // Use the type of the html event (eg: onclick="") if called in an event.
    if (!options.showOn && evt) options.showOn = evt.type;

    // If the url of an Ajax request is not set, get it from the link it's attached to.
    if (options.ajax && !options.ajax.url) {
      if (this.triggerElement.tagName.toLowerCase() == 'a') {
        if (typeof(options.ajax) != 'object') options.ajax = { };
        options.ajax.url = this.triggerElement.href;
      } else {options.ajax = false;}
    }

    // If the event is 'click', no point in following a link
    if (options.showOn == 'click' && this.triggerElement.tagName.toLowerCase() == 'a') {if (evt) {evt.stop();}this.triggerElement.observe('click', function(e) {e.stop();});}


    options.style || (options.style = Opentip.defaultStyle);

    var styleOptions = Object.extend({ }, Opentip.styles.standard); // Copy all standard options.
    if (options.style != 'standard') Object.extend(styleOptions, Opentip.styles[options.style]);

    options = Object.extend(styleOptions, options);


    options.target && (options.fixed = true);


    if (options.stem === true) options.stem = options.tipJoint;
    if (options.target === true) options.target = this.triggerElement;
    else if (options.target) options.target = $(options.target);


    this.currentStemPosition = options.stem;


    if (options.delay === null) {
      if (options.showOn == 'mouseover') options.delay = 0.2;
      else options.delay = 0
    }

    if (Opentip.useScriptaculousTransitions) {
      if (options.showEffect && ! Effect[options.showEffect.ot_ucfirst()]) {
        this.debug('Using fallback show effect "' + options.fallbackShowEffect + '" instead of "' + options.showEffect + '"');
        options.showEffect = options.fallbackShowEffect;
      }
      if (options.hideEffect && ! Effect[options.hideEffect.ot_ucfirst()]) {
        this.debug('Using fallback hide effect "' + options.fallbackHideEffect + '" instead of "' + options.hideEffect + '"');
        options.hideEffect = options.fallbackHideEffect;
      }
    }

    if (options.targetJoint == null) {
      options.targetJoint = [];
      options.targetJoint[0] = options.tipJoint[0] == 'left' ? 'right' : (options.tipJoint[0] == 'right' ? 'left' : 'center');
      options.targetJoint[1] = options.tipJoint[1] == 'top' ? 'bottom' : (options.tipJoint[1] == 'bottom' ? 'top' : 'middle');
    }

    this.options = options;

    this.options.showTriggerElementsWhenHidden = [];

    if (this.options.showOn && this.options.showOn != 'creation') {
      this.options.showTriggerElementsWhenHidden.push({element: this.triggerElement, event: this.options.showOn});
    }

    this.options.showTriggerElementsWhenVisible = [];


    this.options.hideTriggerElements = [];
  },
  /**
   * This builds the container, and sets the correct hide trigger.
   * Since it's a problem for IE to create elements when the page is not fully
   * loaded, this function has to be posponed until the website is fully loaded.
   *
   * This function also activates the tooltip.
  **/
  create: function(evt) {
    this.buildContainer();

    if (this.options.hideTrigger) {
      var hideOnEvent = null;
      var hideTriggerElement = null;
      switch (this.options.hideTrigger) {
        case 'trigger':
          hideOnEvent = this.options.hideOn ? this.options.hideOn : 'mouseout';
          hideTriggerElement = this.triggerElement;
          break;
        case 'tip':
          hideOnEvent = this.options.hideOn ? this.options.hideOn : 'mouseover';
          hideTriggerElement = this.container;
          break;
        case 'target':
          hideOnEvent = this.options.hideOn ? this.options.hideOn : 'mouseover';
          hideTriggerElement = this.options.target;
          break;
        case 'closeButton':break;
        default:
          hideOnEvent = this.options.hideOn ? this.options.hideOn : 'mouseover';
          hideTriggerElement = $(this.options.hideTrigger);
          break;
      }
      if (hideTriggerElement) {
        this.options.hideTriggerElements.push({element: hideTriggerElement, event: hideOnEvent});
        if (hideOnEvent == 'mouseout') {
          // When the hide trigger is mouseout, we have to attach a mouseover trigger to that element, so the tooltip doesn't disappear when
          // hovering child elements. (Hovering children fires a mouseout mouseover event)
          this.options.showTriggerElementsWhenVisible.push({element: hideTriggerElement, event: 'mouseover'});
        }
      }
    }

    this.activate();

    if (evt || this.options.showOn == 'creation') this.show(evt);
  },
  activate: function() {
    this.bound = {};
    this.bound.doShow   = this.doShow.bindAsEventListener(this);
    this.bound.show     = this.show.bindAsEventListener(this);
    this.bound.doHide   = this.doHide.bindAsEventListener(this);
    this.bound.hide     = this.hide.bindAsEventListener(this);
    this.bound.position = this.position.bindAsEventListener(this);

    if (this.options.showEffect || this.options.hideEffect) this.queue = {limit: 1, position: 'end', scope: this.container.identify()};

    // The order is important here! Do not reverse.
    this.setupObserversForReallyHiddenTip();
    this.setupObserversForHiddenTip();
  },
  deactivate: function() {
    this.debug('Deactivating tooltip.');
    this.doHide();
    this.setupObserversForReallyHiddenTip();
  },
  buildContainer: function() {
    this.container = $(Opentip.element('div', {className: 'ot-container ot-completely-hidden style-' + this.options.className + (this.options.ajax ? ' ot-loading' : '') + (this.options.fixed ? ' ot-fixed' : '')}));
    if (Opentip.useCss3Transitions) {
      this.container.setCss3Style({'transitionDuration': '0s'}); // To make sure the initial state doesn't fade

      this.container.addClassName('ot-css3');
      if (this.options.showEffect) {
        this.container.addClassName('ot-show-' + this.options.showEffect);
      }
      if (this.options.hideEffect) {
        this.container.addClassName('ot-hide-' + this.options.hideEffect);
      }
    }
    if (Opentip.useScriptaculousTransitions) this.container.setStyle({display: 'none'});
  },
  buildElements: function() {
    var stemCanvas;
    var closeButtonCanvas;
    if (this.options.stem) {
      var stemOffset = '-' + this.options.stemSize + 'px';
      this.container.appendChild(Opentip.element('div', {className: 'stem-container ' + this.options.stem[0] + ' ' + this.options.stem[1]}, stemCanvas = Opentip.element('canvas', {className: 'stem'})));
    }
    var self = this;
    var content = [];
    var headerContent = [];
    if (this.options.title) headerContent.push(Opentip.element('div', {className: 'title'}, this.options.title));

    content.push(Opentip.element('div', {className: 'header'}, headerContent));
    content.push($(Opentip.element('div', {className: 'content'}))); // Will be updated by updateElementContent()
    if (this.options.ajax) {content.push($(Opentip.element('div', {className: 'loadingIndication'}, Opentip.element('span', 'Loading...'))));}
    this.tooltipElement = $(Opentip.element('div', {className: 'opentip'}, content));

    this.container.appendChild(this.tooltipElement);

    var buttons = this.container.appendChild(Opentip.element('div', {className: 'ot-buttons'}));
    var drawCloseButton = false;
    if (this.options.hideTrigger == 'closeButton') {
      buttons.appendChild(Opentip.element('a', {href: 'javascript:undefined', className: 'close'}, closeButtonCanvas = Opentip.element('canvas', { className: 'canvas' })));
      // The canvas has to have a className assigned, because IE < 9 doesn't know the element, and won't assign any css to it.
      drawCloseButton = true;
    }

    if (Opentip.useIFrame()) this.iFrameElement = this.container.appendChild($(Opentip.element('iframe', {className: 'opentipIFrame', src: 'javascript:false;'})).setStyle({display: 'none', zIndex: 100}).setOpacity(0));

    document.body.appendChild(this.container);

    if (typeof G_vmlCanvasManager !== "undefined") {
      if (stemCanvas) G_vmlCanvasManager.initElement(stemCanvas);
      if (closeButtonCanvas) G_vmlCanvasManager.initElement(closeButtonCanvas);
    }

    if (drawCloseButton) this.drawCloseButton();
  },
  drawCloseButton: function() {
    var canvasElement = this.container.down('.ot-buttons canvas');
    var containerElement = this.container.down('.ot-buttons .close');
    var size = parseInt(containerElement.getStyle('width')) || 20; // Opera 10 has a bug here.. it seems to never get the width right.

    var crossColor = canvasElement.getStyle('color');
    if ( ! crossColor || crossColor == 'transparent')  crossColor = 'white';

    var backgroundColor = canvasElement.getStyle('backgroundColor');
    if ( ! backgroundColor || backgroundColor == 'transparent') backgroundColor = 'rgba(0, 0, 0, 0.2)';
    canvasElement.setStyle({backgroundColor: 'transparent'});

    canvasElement.width = size;
    canvasElement.height = size;

    var ctx = canvasElement.getContext('2d');

    ctx.clearRect (0, 0, size, size);

    ctx.beginPath();

    var padding = size / 2.95;
    ctx.fillStyle = backgroundColor;
    ctx.lineWidth = size / 5.26;
    ctx.strokeStyle = crossColor;
    ctx.lineCap = 'round';

    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2, false);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(size - padding, size - padding);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(size - padding, padding);
    ctx.lineTo(padding, size - padding);
    ctx.stroke();

  },
  /**
   * Sets the content of the tooltip.
   * This can be a function or a string. The function will be executed, and the
   * result used as new content of the tooltip.
   *
   * If the tooltip is visible, this function calls updateElementContent()
  **/
  setContent: function(content) {
    this.content = content;
    if (this.visible) this.updateElementContent();
  },
  /**
   * Actually updates the html element with the content.
   * This function also evaluates the content function, if content is a function.
  **/
  updateElementContent: function() {
    var contentDiv = this.container.down('.content');
    if (contentDiv) {

     if (Object.isFunction(this.content)) {
       this.debug('Executing content function.');
       this.content = this.content(this);
     }

     contentDiv.update(this.options.escapeHtml ? this.content.escapeHTML() : this.content);
    }
    this.storeAndFixDimensions();
  },
  storeAndFixDimensions: function() {
    this.container.setStyle({width: 'auto', left: '0px', top: '0px'});
    this.dimensions = this.container.getDimensions();
    this.container.setStyle({width: this.dimensions.width + 'px', left: this.lastPosition.left + 'px', top: this.lastPosition.top + 'px'});
  },
  destroyAllElements: function() {if (this.container) this.container.remove();},
  clearShowTimeout: function() {window.clearTimeout(this.timeoutId);},
  clearHideTimeout: function() {window.clearTimeout(this.hideTimeoutId);},
  clearTimeouts: function() {
    window.clearTimeout(this.visibilityStateTimeoutId);
    this.clearShowTimeout();
    this.clearHideTimeout();
  },
  /** Gets called only when doShow() is called, not when show() is called **/
  setupObserversForReallyVisibleTip: function() {
    this.options.showTriggerElementsWhenVisible.each(function(pair) {$(pair.element).observe(pair.event, this.bound.show);}, this);
  },
  /** Gets only called when show() is called. show() might not really result in showing the tooltip, because there may
      be another trigger that calls hide() directly after. **/
  setupObserversForVisibleTip: function() {
    this.options.hideTriggerElements.each(function(pair) {$(pair.element).observe(pair.event, this.bound.hide);}, this);
    this.options.showTriggerElementsWhenHidden.each(function(pair) {$(pair.element).stopObserving(pair.event, this.bound.show);}, this);
    Event.observe(document.onresize ? document : window, "resize", this.bound.position);
    Event.observe(window, "scroll", this.bound.position);
  },
  /** Gets called only when doHide() is called. */
  setupObserversForReallyHiddenTip: function() {
    this.options.showTriggerElementsWhenVisible.each(function(pair) {$(pair.element).stopObserving(pair.event, this.bound.show);}, this);
  },
  /** Gets called everytime hide() is called. See setupObserversForVisibleTip for more info **/
  setupObserversForHiddenTip: function() {
    this.options.showTriggerElementsWhenHidden.each(function(pair) {$(pair.element).observe(pair.event, this.bound.show);}, this);
    this.options.hideTriggerElements.each(function(pair) {$(pair.element).stopObserving(pair.event, this.bound.hide);}, this);
    Event.stopObserving(document.onresize ? document : window, "resize", this.bound.position);
    Event.stopObserving(window, "scroll", this.bound.position);
  },
  /**
   * The show function only schedules the tooltip to show. (If there is a delay, this function will generate the timer)
   * The actual function to show the tooltip is doShow().
   **/
  show: function(evt) {
    this.abortHiding();
    if (this.visible) return;

    this.debug('Showing in ' + this.options.delay + 's.');

    if (this.options.group) Tips.abortShowingGroup(this.options.group);

    this.waitingToShow = true;

    // Even though it is not yet visible, I already attach the observers, so the tooltip won't show if a hideEvent is triggered.
    this.setupObserversForVisibleTip();

    // So the tooltip is positioned as soon as it shows.
    this.followMousePosition();
    this.position(evt);

    if (!this.options.delay) this.bound.doShow(evt);
    else this.timeoutId = this.bound.doShow.delay(this.options.delay);
  },
  // If the tip is waiting to show (and only then), this will abort it.
  abortShowing: function() {
    if (this.waitingToShow) {
      this.debug('Aborting showing.');
      this.clearTimeouts();
      this.stopFollowingMousePosition();
      this.waitingToShow = false;
      this.setupObserversForHiddenTip();
    }
  },
  /**
   * Actually shows the tooltip. This function is called when any possible delay has expired.
   **/
  doShow: function() {
    this.clearTimeouts();
    if (this.visible) return;

    // Thanks to Torsten Saam for this enhancement.
    if ( ! this.triggerElementExists()) { this.deactivate(); return; }

    this.debug('Showing!');

    if (this.options.group) Tips.hideGroup(this.options.group);


    this.visible = true;
    this.waitingToShow = false;

    if (!this.tooltipElement) this.buildElements();
    this.updateElementContent();

    if (this.options.ajax && !this.loaded) {this.loadAjax();}

    this.searchAndActivateHideButtons();

    this.ensureElement();
    this.container.setStyle({zIndex: Opentip.lastZIndex += 1});

    // The order is important here! Do not reverse.
    this.setupObserversForReallyVisibleTip();
    this.setupObserversForVisibleTip();

    if (Opentip.useScriptaculousTransitions) {
      if (this.options.showEffect || this.options.hideEffect) this.cancelEffects();

      if (!this.options.showEffect || !this.container[this.options.showEffect]) this.container.show();
      else this.container[this.options.showEffect]({duration: this.options.showEffectDuration, queue: this.queue, afterFinish: this.afterShowEffect.bind(this)});
      if (Opentip.useIFrame()) this.iFrameElement.show();
    }

    this.position();

    this.container.removeClassName('ot-hidden').addClassName('ot-becoming-visible');


    /**
     * The next lines may seem a bit weird. I ran into some bizarre opera problems
     * while implementing the switch of the different states.
     *
     * This is what's happening here:
     *
     * I wanted to just remove ot-completely-hidden, and add ot-becoming-visible
     * (so the tip has the style it should have when it appears) and then switch
     * ot-becoming-visible with ot-visible so the transition can take place.
     * I then setup a timer to set ot-completely-visible when appropriate.
     *
     * I ran into problems with opera, which showed the tip for a frame because
     * apparently the -o-transforms are slower then just setting display: none
     * (or something...)
     *
     * So I have to 1) set ot-becoming-visible first, so the tip has the appropriate
     * CSS definitions set, 2) defer the removal of ot-completely-hidden, so it's
     * not invisible anymore, and 3) defer the rest of the process (setting ot-visible
     * and stuff) so the transition takes place.
     */

    var startShowEffect = function() {
      if (Opentip.useCss3Transitions) {
        this.container.setCss3Style({'transitionDuration': this.options.showEffectDuration + 's'});
      }

      this.container.removeClassName('ot-becoming-visible').addClassName('ot-visible');
      if (this.options.showEffect && this.options.showEffectDuration) {
        this.visibilityStateTimeoutId = (function() {this.removeClassName('ot-visible').addClassName('ot-completely-visible');}).bind(this.container).delay(this.options.showEffectDuration);
      }
      else {
        this.container.removeClassName('ot-visible').addClassName('ot-completely-visible');
      }

      this.activateFirstInput();
    };


    (function() {
      this.container.removeClassName('ot-completely-hidden');
      (startShowEffect).bind(this).defer(); // Has to be deferred, so the div has the class ot-becoming-visible.
    }).bind(this).defer();



  },
  loadAjax: function() {
    if (this.loading) return;
    this.loading = true;
    this.container.addClassName('ot-loading');

    this.debug('Loading content from ' + this.options.ajax.url + '.');

    new Ajax.Request(this.options.ajax.url,
      Object.extend({
       onComplete: function() {
         this.container.removeClassName('ot-loading');
         this.loaded = true;
         this.loading = false;
         this.updateElementContent();
         this.searchAndActivateHideButtons();
         this.activateFirstInput();
         this.position();
       }.bind(this),
       onSuccess: function(transport) {
         this.debug('Loading successfull.');
         this.content = transport.responseText;
       }.bind(this),
       onFailure: function() {
         this.debug('There was a problem downloading the file.');
         this.options.escapeHtml = false;
         this.content = '<a class="close">There was a problem downloading the content.</a>';
       }.bind(this)}, this.options.ajax.options || {}));
  },
  afterShowEffect: function() {
    this.activateFirstInput();
    this.position();
  },
  activateFirstInput: function() {
    // TODO: check if there is a simple way of finding EITHER an input OR a textarea.
    var input = this.container.down('input');
    var textarea = this.container.down('textarea');
    if (input) {input.focus();}
    else if (textarea) textarea.focus();
  },
  searchAndActivateHideButtons: function() {
    if (this.options.hideTrigger == 'closeButton' || !this.options.hideTrigger) {
      this.options.hideTriggerElements = [];
      this.container.select('.close').each(function(el) {
        this.options.hideTriggerElements.push({element: el, event: 'click'});
      }, this);
      if (this.visible) this.setupObserversForVisibleTip();
    }
  },
  hide: function(afterFinish) {
    this.abortShowing();
    if (!this.visible) return;

    this.debug('Hiding in ' + this.options.hideDelay + 's.');

    this.waitingToHide = true;

    // We start observing even though it is not yet hidden, so the tooltip does not disappear when a showEvent is triggered.
    this.setupObserversForHiddenTip();

    this.hideTimeoutId = this.bound.doHide.delay(this.options.hideDelay, afterFinish); // hide has to be delayed because when hovering children a mouseout is registered.
  },
  abortHiding: function() {
    if (this.waitingToHide) {
      this.debug('Aborting hiding.');
      this.clearTimeouts();
      this.waitingToHide = false;
      this.setupObserversForVisibleTip();
    }
  },
  doHide: function(afterFinish) {
    this.clearTimeouts();
    if (!this.visible) return;

    this.debug('Hiding!');

    this.visible = false;

    this.waitingToHide = false;

    this.deactivateElementEnsurance();

    // The order is important here! Do not reverse.
    this.setupObserversForReallyHiddenTip();
    this.setupObserversForHiddenTip();

    if (!this.options.fixed) this.stopFollowingMousePosition();

    if (Opentip.useScriptaculousTransitions) {
      if (this.options.showEffect || this.options.hideEffect) this.cancelEffects();

      if (!this.options.hideEffect || !this.container[this.options.hideEffect]) this.container.hide();
      else {
        var effectOptions = {duration: this.options.hideEffectDuration, queue: this.queue};
        if(afterFinish && Object.isFunction(afterFinish)) effectOptions.afterFinish = afterFinish;
        this.container[this.options.hideEffect](effectOptions);
      }
      if (Opentip.useIFrame()) this.iFrameElement.hide();
    }

    if (Opentip.useCss3Transitions) {
      this.container.setCss3Style({'transitionDuration': this.options.hideEffectDuration + 's'});
    }

   this.container.removeClassName('ot-visible').removeClassName('ot-completely-visible').addClassName('ot-hidden');
   if (this.options.hideEffect && this.options.hideEffectDuration) {
     this.visibilityStateTimeoutId = (function() {
       this.setCss3Style({'transitionDuration': '0s'});
       this.removeClassName('ot-hidden').addClassName('ot-completely-hidden');
     }).bind(this.container).delay(this.options.showEffectDuration);
   }
   else {
     this.container.removeClassName('ot-hidden').addClassName('ot-completely-hidden');
   }

  },
  cancelEffects: function() {Effect.Queues.get(this.queue.scope).invoke('cancel');},
  followMousePosition:        function() {if (!this.options.fixed) $(document.body).observe('mousemove', this.bound.position);},
  stopFollowingMousePosition: function() {if (!this.options.fixed) $(document.body).stopObserving('mousemove', this.bound.position);},
  positionsEqual: function(position1, position2) {
    return (position1.left == position2.left && position1.top == position2.top);
  },
  position: function(evt) {
    var evt = evt || this.lastEvt;

    this.currentStemPosition = this.options.stem; // This gets reset by ensureViewportContainment if necessary.
    var position = this.ensureViewportContainment(evt, this.getPosition(evt));
    if (this.positionsEqual(position, this.lastPosition)) {
      this.positionStem();
      return;
    }

    this.lastPosition = position;
    if (position) {
      var style = {'left': position.left + 'px', 'top': position.top + 'px'};
      this.container.setStyle(style);
      if (Opentip.useIFrame() && this.iFrameElement) {
        this.iFrameElement.setStyle({width: this.container.getWidth() + 'px', height: this.container.getHeight() + 'px'});
      }

      /**
       * Following is a redraw fix, because I noticed some drawing errors in some browsers when tooltips where overlapping.
       */
      var container = this.container;
      (function() {
        container.style.visibility = "hidden"; // I chose visibility instead of display so that I don't interfere with appear/disappear effects.
        var redrawFix = container.offsetHeight;
        container.style.visibility = "visible";
      }).defer();
    }
    this.positionStem();
  },
  getPosition: function(evt, tipJ, trgJ, stem) {
    var tipJ = tipJ || this.options.tipJoint;
    var trgJ = trgJ || this.options.targetJoint;

    var position = {};

    if (this.options.target) {
      var tmp = this.options.target.cumulativeOffset();
      position.left = tmp[0];
      position.top = tmp[1];
      if (trgJ[0] == 'right')  {
        // For wrapping inline elements, left + width does not give the right border, because left is where
        // the element started, not its most left position.
        if (typeof this.options.target.getBoundingClientRect != 'undefined') {
          position.left = this.options.target.getBoundingClientRect().right + $(document.viewport).getScrollOffsets().left;
        }
        else {
          position.left = position.left + this.options.target.getWidth();
        }
      }
      else if (trgJ[0] == 'center') {position.left += Math.round(this.options.target.getWidth() / 2);}
      if      (trgJ[1] == 'bottom') {position.top += this.options.target.getHeight();}
      else if (trgJ[1] == 'middle') {position.top += Math.round(this.options.target.getHeight() / 2);}
    } else {
      if (!evt) return; // No event passed, so returning.
      this.lastEvt = evt;
      position.left = Event.pointerX(evt);
      position.top = Event.pointerY(evt);
    }

    if (this.options.autoOffset) {
      var stemSize = this.options.stem ? this.options.stemSize : 0;
      var offsetDistance = (stemSize && this.options.fixed) ? 2 : 10; // If there is as stem offsets dont need to be that big if fixed.
      var additionalHorizontal = (tipJ[1] == 'middle' && !this.options.fixed) ? 15 : 0;
      var additionalVertical   = (tipJ[0] == 'center' && !this.options.fixed) ? 15 : 0;
      if      (tipJ[0] == 'right')  position.left -= offsetDistance + additionalHorizontal;
      else if (tipJ[0] == 'left')   position.left += offsetDistance + additionalHorizontal;
      if      (tipJ[1] == 'bottom') position.top -= offsetDistance + additionalVertical;
      else if (tipJ[1] == 'top')    position.top += offsetDistance + additionalVertical;

      if (stemSize) {
        var stem = stem || this.options.stem;
        if      (stem[0] == 'right')  position.left -= stemSize;
        else if (stem[0] == 'left')   position.left += stemSize;
        if      (stem[1] == 'bottom') position.top -= stemSize;
        else if (stem[1] == 'top')    position.top += stemSize;
      }
    }
    position.left += this.options.offset[0];
    position.top += this.options.offset[1];

    if (tipJ[0] == 'right')  {position.left -= this.container.getWidth();}
    if (tipJ[0] == 'center') {position.left -= Math.round(this.container.getWidth()/2);}
    if (tipJ[1] == 'bottom') {position.top -= this.container.getHeight();}
    if (tipJ[1] == 'middle') {position.top -= Math.round(this.container.getHeight()/2);}

    return position;
  },
  ensureViewportContainment: function(evt, position) {
    // Sometimes the element is theoretically visible, but an effect is not yet showing it.
    // So the calculation of the offsets is incorrect sometimes, which results in faulty repositioning.
    if (!this.visible) return position;

    var sticksOut = [ this.sticksOutX(position), this.sticksOutY(position) ];
    if (!sticksOut[0] && !sticksOut[1]) return position;

    var tipJ = this.options.tipJoint.clone();
    var trgJ = this.options.targetJoint.clone();

    var viewportScrollOffset = $(document.viewport).getScrollOffsets();
    var dimensions = this.dimensions;
    var viewportOffset = {left: position.left - viewportScrollOffset.left, top: position.top - viewportScrollOffset.top};
    var viewportDimensions = document.viewport.getDimensions();
    var reposition = false;

    if (viewportDimensions.width >= dimensions.width) {
      if (viewportOffset.left < 0) {
        reposition = true;
        tipJ[0] = 'left';
        if (this.options.target && trgJ[0] == 'left') {trgJ[0] = 'right';}
      }
      else if (viewportOffset.left + dimensions.width > viewportDimensions.width) {
        reposition = true;
        tipJ[0] = 'right';
        if (this.options.target && trgJ[0] == 'right') {trgJ[0] = 'left';}
      }
    }

    if (viewportDimensions.height >= dimensions.height) {
      if (viewportOffset.top < 0) {
        reposition = true;
        tipJ[1] = 'top';
        if (this.options.target && trgJ[1] == 'top') {trgJ[1] = 'bottom';}
      }
      else if (viewportOffset.top + dimensions.height > viewportDimensions.height) {
        reposition = true;
        tipJ[1] = 'bottom';
        if (this.options.target && trgJ[1] == 'bottom') {trgJ[1] = 'top';}
      }
    }
    if (reposition) {
      var newPosition = this.getPosition(evt, tipJ, trgJ, tipJ);
      var newSticksOut = [ this.sticksOutX(newPosition), this.sticksOutY(newPosition) ];
      var revertedCount = 0;
      for (var i = 0; i <=1; i ++) {
        if (newSticksOut[i] && newSticksOut[i] != sticksOut[i]) {
          // The tooltip changed sides, but now is sticking out the other side of the window.
          // If its still sticking out, but on the same side, it's ok. At least, it sticks out less.
          revertedCount ++;
          tipJ[i] = this.options.tipJoint[i];
          if (this.options.target) {trgJ[i] = this.options.targetJoint[i];}
        }
      }
      if (revertedCount < 2) {
        this.currentStemPosition = tipJ;
        return this.getPosition(evt, tipJ, trgJ, tipJ);
      }
    }
    return position;
  },
  sticksOut: function(position) {
    return this.sticksOutX(position) || this.sticksOutY(position);
  },
  /**
   * return 1 for left 2 for right
   */
  sticksOutX: function(position) {
    var viewportScrollOffset = $(document.viewport).getScrollOffsets();
    var viewportOffset = {left: position.left - viewportScrollOffset.left, top: position.top - viewportScrollOffset.top};
    if (viewportOffset.left < 0) return Opentip.STICKS_OUT_LEFT;
    if (viewportOffset.left + this.dimensions.width > document.viewport.getDimensions().width) {return Opentip.STICKS_OUT_RIGHT;}
  },
  /**
   * return 1 for top 2 for bottom
   */
  sticksOutY: function(position) {
    var viewportScrollOffset = $(document.viewport).getScrollOffsets();
    var viewportOffset = {left: position.left - viewportScrollOffset.left, top: position.top - viewportScrollOffset.top};
    if (viewportOffset.top < 0) return Opentip.STICKS_OUT_TOP;
    if (viewportOffset.top + this.dimensions.height > document.viewport.getDimensions().height) return Opentip.STICKS_OUT_BOTTOM;
  },
  getStemCanvas: function() {
    return this.container.down('.stem');
  },
  stemPositionsEqual: function(position1, position2) {
    return (position1 && position2 && position1[0] == position2[0] && position1[1] == position2[1]);
  },
  positionStem: function() {
    // Position stem
    if (this.options.stem) {

      var canvasElement = this.getStemCanvas();

      if (canvasElement && !this.stemPositionsEqual(this.lastStemPosition, this.currentStemPosition)) {

        this.debug('Setting stem style');

        this.lastStemPosition = this.currentStemPosition;

        var stemPosition = Opentip.sanitizePosition(this.currentStemPosition);
        var stemSize = this.options.stemSize;

        var rotationRad = stemPosition * Math.PI / 4; // Every number means 45deg

        var baseThikness = Math.round(stemSize * 1.5);

        var realDim = {w: baseThikness, h: stemSize};

        var isCorner = false;
        if (stemPosition % 2 == 1) {
          // Corner
          isCorner = true;
          var additionalWidth = Math.round(0.707106781 * baseThikness); // 0.707106781 == sqrt(2) / 2 to calculate the adjacent leg of the triangle
          realDim = {w: stemSize + additionalWidth, h: stemSize + additionalWidth};
        }

        var drawDim = Object.clone(realDim); // The drawDim is so that I can draw without takin the rotation into calculation

        if (stemPosition == Opentip.position.left || stemPosition == Opentip.position.right) {
          // The canvas has to be rotated
          realDim.h = drawDim.w;
          realDim.w = drawDim.h;
        }


        var stemColor = canvasElement.getStyle('color') || 'black';


        canvasElement.width = realDim.w;
        canvasElement.height = realDim.h;

        // Now draw the stem.
        var ctx = canvasElement.getContext('2d');

        ctx.clearRect (0, 0, canvasElement.width, canvasElement.height);
        ctx.beginPath();

        ctx.fillStyle = stemColor;

        ctx.save();

        ctx.translate(realDim.w / 2, realDim.h / 2);
        var rotations = Math.floor(stemPosition / 2);
        ctx.rotate(rotations * Math.PI / 2);
        if (realDim.w == drawDim.w) { // This is a real hack because I don't know how to reset to 0,0
          ctx.translate(-realDim.w / 2, -realDim.h / 2);
        }
        else {
          ctx.translate(-realDim.h / 2, -realDim.w / 2);
        }

        if (isCorner) {
          ctx.moveTo(additionalWidth, drawDim.h);
          ctx.lineTo(drawDim.w, 0);
          ctx.lineTo(0, drawDim.h - additionalWidth);
        }
        else {
          ctx.moveTo(drawDim.w / 2 - baseThikness / 2, drawDim.h);
          ctx.lineTo(drawDim.w / 2, 0);
          ctx.lineTo(drawDim.w / 2 + baseThikness / 2, drawDim.h);
        }
        ctx.fill();
        ctx.restore();


        var style = {width: realDim.w + 'px', height: realDim.h + 'px', left: '', right: '', top: '', bottom: ''};

        switch (stemPosition) {
          case Opentip.position.top:
            style.top = - realDim.h + 'px';
            style.left = - Math.round(realDim.w / 2) + 'px';
            break;
          case Opentip.position.right:
            style.top = - Math.round(realDim.h / 2) + 'px';
            style.left = 0;
            break;
          case Opentip.position.bottom:
            style.top = 0;
            style.left = - Math.round(realDim.w / 2) + 'px';
            break;
          case Opentip.position.left:
            style.top = - Math.round(realDim.h / 2) + 'px';
            style.left = - realDim.w + 'px';
            break;
          case Opentip.position.topRight:
            style.top = - stemSize + 'px';
            style.left = - additionalWidth + 'px';
            break;
          case Opentip.position.bottomRight:
            style.top = - additionalWidth + 'px';
            style.left = - additionalWidth + 'px';
            break;
          case Opentip.position.bottomLeft:
            style.top = - additionalWidth + 'px';
            style.left = - stemSize + 'px';
            break;
          case Opentip.position.topLeft:
            style.top = - stemSize + 'px';
            style.left = - stemSize + 'px';
            break;
          default:
            throw 'Unknown stem position: ' + stemPosition;
        }

        canvasElement.setStyle(style);

        var stemContainer = canvasElement.up('.stem-container');
        stemContainer.removeClassName('left').removeClassName('right').removeClassName('center').removeClassName('top').removeClassName('bottom').removeClassName('middle');

        switch (stemPosition) {
          case Opentip.position.top: case Opentip.position.topLeft: case Opentip.position.topRight:
            stemContainer.addClassName('top');
            break;
          case Opentip.position.bottom: case Opentip.position.bottomLeft: case Opentip.position.bottomRight:
            stemContainer.addClassName('bottom');
            break;
          default:
            stemContainer.addClassName('middle');
            break;
        }
        switch (stemPosition) {
          case Opentip.position.left: case Opentip.position.topLeft: case Opentip.position.bottomLeft:
            stemContainer.addClassName('left');
            break;
          case Opentip.position.right: case Opentip.position.topRight: case Opentip.position.bottomRight:
            stemContainer.addClassName('right');
            break;
          default:
            stemContainer.addClassName('center');
            break;
        }

      }

    }
  },
  triggerElementExists: function(element) {
    return this.triggerElement.parentNode && this.triggerElement.visible() && this.triggerElement.descendantOf(document.body);
  },
  ensureElementInterval: 1000, // In milliseconds, how often opentip should check for the existance of the element
  ensureElement: function() { // Regularely checks if the element is still in the dom.
    this.deactivateElementEnsurance();
    if ( ! this.triggerElementExists()) {this.deactivate();}
    this.ensureElementTimeoutId = setTimeout(this.ensureElement.bind(this), this.ensureElementInterval);
  },
  deactivateElementEnsurance: function() {clearTimeout(this.ensureElementTimeoutId);}
});
