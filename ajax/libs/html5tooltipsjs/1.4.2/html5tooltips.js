/**
* html5tooltips.js
* Tooltips with smooth 3D animation.
* https://github.com/ytiurin/html5tooltipsjs
*
* Yevhen Tiurin <yevhentiurin@gmail.com>
* The MIT License (MIT)
* https://github.com/ytiurin/html5tooltipsjs/raw/master/LICENSE
*
* Contributors:
* nomiad https://github.com/nomiad
* Friedel Ziegelmayer https://github.com/Dignifiedquire
* Arend van Beelen jr. https://github.com/arendjr
* Peter Richmond https://github.com/Peripheral1994
* Bruno Wego https://github.com/brunowego
* Kahmali Rose https://github.com/kahmali
*
* Sep 1, 2015
**/

(function() {

var tt, tModels, options, activeElements, untieTooltips, safeTModels,

html5tooltipsPredefined = {
  animateFunction: {
    fadeIn: "fadein",
    foldIn: "foldin",
    foldOut: "foldout",
    roll: "roll",
    scaleIn: "scalein",
    slideIn: "slidein",
    spin: "spin"
  },

  color: {
    "daffodil": {r: 255, g: 230, b: 23},
    "daisy": {r: 250, g: 211, b: 28},
    "mustard": {r: 253, g: 183, b: 23},
    "citrus zest": {r: 250, g: 170, b: 33},
    "pumpkin": {r: 241, g: 117, b: 63},
    "tangerine": {r: 237, g: 87, b: 36},
    "salmon": {r: 240, g: 70, b: 57},
    "persimmon": {r: 234, g: 40, b: 48},
    "rouge": {r: 188, g: 35, b: 38},
    "scarlet": {r: 140, g: 12, b: 3},
    "hot pink": {r: 229, g: 24, b: 93},
    "princess": {r: 243, g: 132, b: 174},
    "petal": {r: 250, g: 198, b: 210},
    "lilac": {r: 178, g: 150, b: 199},
    "lavender": {r: 123, g: 103, b: 174},
    "violet": {r: 95, g: 53, b: 119},
    "cloud": {r: 195, g: 222, b: 241},
    "dream": {r: 85, g: 190, b: 237},
    "gulf": {r: 49, g: 168, b: 224},
    "turquoise": {r: 35, g: 138, b: 204},
    "sky": {r: 13, g: 96, b: 174},
    "indigo": {r: 20, g: 59, b: 134},
    "navy": {r: 0, g: 27, b: 74},
    "sea foam": {r: 125, g: 205, b: 194},
    "teal": {r: 0, g: 168, b: 168},
    "peacock": {r: 18, g: 149, b: 159},
    "ceadon": {r: 193, g: 209, b: 138},
    "olive": {r: 121, g: 145, b: 85},
    "bamboo": {r: 128, g: 188, b: 66},
    "grass": {r: 74, g: 160, b: 63},
    "kelly": {r: 22, g: 136, b: 74},
    "forrest": {r: 0, g: 63, b: 46},
    "chocolate": {r: 56, g: 30, b: 17},
    "terra cotta": {r: 192, g: 92, b: 32},
    "camel": {r: 191, g: 155, b: 107},
    "linen": {r: 233, g: 212, b: 167},
    "stone": {r: 231, g: 230, b: 225},
    "smoke": {r: 207, g: 208, b: 210},
    "steel": {r: 138, g: 139, b: 143},
    "slate": {r: 119, g: 133, b: 144},
    "charcoal": {r: 71, g: 77, b: 77},
    "black": {r: 5, g: 6, b: 8},
    "white": {r: 255, g: 255, b: 255},
    "metalic silver": {r: 152, g: 162, b: 171},
    "metalic gold": {r: 159, g: 135, b: 89},
    "metalic copper": {r: 140, g: 102, b: 65}
  },

  stickTo: {
    bottom: "bottom",
    left: "left",
    right: "right",
    top: "top"
  }
},

typeTooltipModel = {
  animateDuration: 300,
  animateFunction: html5tooltipsPredefined.animateFunction.fadeIn,
  color: null,
  contentText: "",
  contentMore: "",
  delay: 500,
  disableAnimation: false,
  stickTo: html5tooltipsPredefined.stickTo.bottom,
  stickDistance: 10,
  targetElements: [],
  targetSelector: "",
  targetXPath: "",
  maxWidth: null
},

defaultOptions = {
  animateDuration: null,
  animateFunction: null,
  color: null,
  HTMLTemplate: null,
  delay: null,
  disableAnimation: null,
  stickTo: null,
  maxWidth: null
},

template = {
  HTML: [
    "<div class='html5tooltip' style='box-sizing:border-box;position:fixed;'>",
      "<div class='html5tooltip-box'>",
        "<div class='html5tooltip-text'></div>",
        "<div class='html5tooltip-more' style='overflow:hidden;'>",
          "<div class='html5tooltip-text'></div>",
        "</div>",
      "</div>",
    "</div>"
  ].join(""),

  hookClasses: {
    tooltip: 'html5tooltip',
    tooltipBox: 'html5tooltip-box',
    tooltipText: 'html5tooltip-text',
    tooltipMore: 'html5tooltip-more',
    tooltipMoreText: 'html5tooltip-text'
  }
};

function getElementsByXPath(xpath, context)
{
  var nodes = [];

  try {
    var result = document.evaluate(xpath, (context || document), null,
      XPathResult.ANY_TYPE, null);

    for (var item = result.iterateNext(); item; item = result.iterateNext())
      nodes.push(item);
  }
  catch (exc)
  {
    // Invalid xpath expressions make their way here sometimes. If that happens,
    // we still want to return an empty set without an exception.
  }

  return nodes;
}

function getElementsBySelector(selector, context)
{
  var nodes = [];

  try {
    nodes = Array.prototype.slice.call((context || document).querySelectorAll(selector));
  }
  catch (exc) {}

  return nodes;
}

function getElementsByAttribute(attr, context)
{
  var nodeList = (context || document).getElementsByTagName('*'),
    nodes = [];

  for (var i = 0, node; node = nodeList[i]; i++) {
    if ( node.getAttribute(attr) )
      nodes.push(node);
  }

  return nodes;
}

function extend(targetObj)
{
  for (var i = 1; i < arguments.length; i++) {
    if (typeof arguments[i] === "object") {
      for (var property in arguments[i]) {
        if (arguments[i].hasOwnProperty(property)) {
          targetObj[property] = arguments[i][property];
        }
      }
    }
  }

  return targetObj;
}

function Tooltip()
{
  var ttElement, ttModel, targetElement, elBox, elText, elMore, elMoreText;

  function animateElementClass(el, updateHandler)
  {
    if (!ttModel.disableAnimation) {
      // getBoundingClientRect refreshes element render box
      el.getBoundingClientRect();
      el.classList.add("animating");
      updateHandler&&updateHandler();
      setTimeout(function() { el.classList.remove("animating"); }, ttModel.animateDuration);
    }
    else
      updateHandler();
  }

  function applyAnimationClass(el, fromClass, toClass, updateHandler)
  {
    if (!ttModel.disableAnimation) {
      el.classList.add(fromClass);

      // getBoundingClientRect refreshes element render box
      el.getBoundingClientRect();

      el.classList.add("animating");
      el.classList.remove(fromClass);
      el.classList.add(toClass);

      if (updateHandler)
        updateHandler();

      setTimeout(function() {
        el.classList.remove("animating");
        el.classList.remove(toClass);
      }, ttModel.animateDuration);
    }
    else
      if (updateHandler)
        updateHandler();
  }

  function destroy()
  {
    document.removeChild(ttElement);
  }

  function hideAll()
  {
    if (ttElement.style.visibility !== 'collapse')
      ttElement.style.visibility = 'collapse';
      ttElement.style.left = '-9999px';
      ttElement.style.top = '-9999px';

    if (elMore.style.display !== 'none') {
      elMore.style.display = 'none';
      elMore.style.visibility = 'collapse';
      elMore.style.height = 'auto';
    }

    return this;
  }

  function init()
  {
    var tmplNode = document.createElement("div");
    tmplNode.innerHTML = options.HTMLTemplate ? options.HTMLTemplate : template.HTML;
    ttElement = tmplNode.firstChild;

    elBox = ttElement.getElementsByClassName(template.hookClasses.tooltipBox)[0];
    elText = ttElement.getElementsByClassName(template.hookClasses.tooltipText)[0];
    elMore = ttElement.getElementsByClassName(template.hookClasses.tooltipMore)[0];
    elMoreText = elMore.getElementsByClassName(template.hookClasses.tooltipMoreText)[0];

    hideAll();

    ttModel = extend({}, typeTooltipModel);
  }

  function model(userTTModel)
  {
    if (!userTTModel)
      return ttModel;

    if (ttModel !== userTTModel) {
      ttModel = extend({}, typeTooltipModel, userTTModel);
      updateModel();
    }

    return this;
  }

  function showBrief()
  {
    if (ttElement.style.visibility !== 'visible') {
      ttElement.style.visibility = 'visible';

      updatePos();

      applyAnimationClass(elBox, ttModel.animateFunction + "-from",
        ttModel.animateFunction + "-to");
    }

    return this;
  }

  function showAll()
  {
    if (ttElement.style.visibility !== 'visible') {
      ttElement.style.visibility = 'visible';

      applyAnimationClass(elBox, ttModel.animateFunction + "-from",
        ttModel.animateFunction + "-to");

      if (ttModel.contentMore) {
        elMore.style.display = 'block';
        elMore.style.visibility = 'visible';
      }

      updatePos();
    }
    else if (elMore.style.display !== 'block' && ttModel.contentMore) {
      elMore.style.display = 'block';

      animateElementClass(ttElement);
      updatePos();

      var h = elMore.getBoundingClientRect().height;
      elMore.style.visibility = 'visible';
      elMore.style.height = '0px';

      // animate more content
      animateElementClass(elMore, function() {
        elMore.style.height = h > 0 ? h + 'px' : "auto";
      });
    }

    return this;
  }

  function target(userTargetElement)
  {
    if (!userTargetElement)
      return targetElement;

    if (targetElement !== userTargetElement) {
      targetElement = userTargetElement;
    }

    return this;
  }

  function updatePos()
  {
    var targetRect, ttRect;

    if (!targetElement)
      return;

    // update width
    ttElement.style.width = "auto";
    ttRect = ttElement.getBoundingClientRect();

    var maxWidth = parseInt(ttModel.maxWidth) || options.maxWidth;
    if (maxWidth)
      ttElement.style.width = ttRect.width > maxWidth ? maxWidth + "px" : "auto";

    // position depend on target and tt width
    targetRect = targetElement.getBoundingClientRect();
    ttRect = ttElement.getBoundingClientRect();

    switch (ttModel.stickTo) {
      case html5tooltipsPredefined.stickTo.bottom:
        ttElement.style.left = targetRect.left + parseInt((targetRect.width - ttRect.width) / 2) + "px";
        ttElement.style.top = targetRect.top + targetRect.height + parseInt(ttModel.stickDistance) + "px";
        break;

      case html5tooltipsPredefined.stickTo.left:
        ttElement.style.left = targetRect.left - ttRect.width - parseInt(ttModel.stickDistance) + "px";
        ttElement.style.top = targetRect.top + (targetRect.height - ttRect.height) / 2 + "px";
        break;

      case html5tooltipsPredefined.stickTo.right:
        ttElement.style.left = targetRect.left + targetRect.width + parseInt(ttModel.stickDistance) + "px";
        ttElement.style.top = targetRect.top + (targetRect.height - ttRect.height) / 2 + "px";
        break;

      case html5tooltipsPredefined.stickTo.top:
        ttElement.style.left = targetRect.left + (targetRect.width - ttRect.width) / 2 + "px";
        ttElement.style.top = targetRect.top - ttRect.height - parseInt(ttModel.stickDistance) + "px";
        break;
    }
  }

  function updateModel()
  {
    elText.innerHTML = ttModel.contentText ? ttModel.contentText : "";
    elMoreText.innerHTML = ttModel.contentMore ? ttModel.contentMore : "";

    // update animation
    ttModel.animateDuration = options.animateDuration ? options.animateDuration : ttModel.animateDuration;
    ttModel.animateFunction = options.animateFunction ? options.animateFunction : ttModel.animateFunction;
    ttModel.disableAnimation = options.disableAnimation ? options.disableAnimation : ttModel.disableAnimation;

    // update color
    ttModel.color = options.color ? options.color : ttModel.color;
    if (html5tooltipsPredefined.color[ttModel.color]) {
      ttModel.color = html5tooltipsPredefined.color[ttModel.color];
      ttModel.color = "rgb(" + ttModel.color.r + ", " + ttModel.color.g + ", " + ttModel.color.b + ")";
    }
    elBox.style.backgroundColor = ttModel.color||'';

    // update pointer
    ttElement.className = template.hookClasses.tooltip + "-" + ttModel.stickTo;

    if (document.body && ttElement.parentNode !== document.body)
      document.body.appendChild(ttElement);
  }

  init();

  return {
    destroy: destroy,
    hideAll: hideAll,
    model: model,
    showAll: showAll,
    showBrief: showBrief,
    target: target,
    updatePos: updatePos
  };
}

function pickDocumentDataTargets()
{
  var pickedElements = getElementsByAttribute("data-tooltip");
  tModels=safeTModels.slice();

  pickedElements.forEach(function(elTarget) {
    var tm = {
      contentText: elTarget.getAttribute("data-tooltip"),
      targetElements: [elTarget]
    };

    if (elTarget.getAttribute("data-tooltip-animate-function") !== null)
      tm.animateFunction = elTarget.getAttribute("data-tooltip-animate-function");

    if (elTarget.getAttribute("data-tooltip-color") !== null)
      tm.color = elTarget.getAttribute("data-tooltip-color");

    if (elTarget.getAttribute("data-tooltip-delay") !== null)
      tm.delay = elTarget.getAttribute("data-tooltip-delay");

    if (elTarget.getAttribute("data-tooltip-more") !== null)
      tm.contentMore = elTarget.getAttribute("data-tooltip-more");

    if (elTarget.getAttribute("data-tooltip-stickto") !== null)
      tm.stickTo = elTarget.getAttribute("data-tooltip-stickto");

    if (elTarget.getAttribute("data-tooltip-maxwidth") !== null)
      tm.maxWidth = elTarget.getAttribute("data-tooltip-maxwidth");

    tModels.push(extend({}, typeTooltipModel, tm));
  });
}

function tieTooltips()
{
  var destrStack=[];

  tModels.forEach(function(tModel, i) {

    function targetMousemove()
    {
      if (activeElements.hovered === this || activeElements.focused !== null)
        return;

      activeElements.hovered = this;
      tt.target(this).model(tModel);

      setTimeout(function() {
        if (activeElements.hovered === this)
          tt.showBrief();
      }.bind(this), tModel.delay);
    }

    function targetMouseout()
    {
      activeElements.hovered = null;

      if (activeElements.focused !== null)
        return;

      tt.hideAll();
    }

    function targetFocus()
    {
      if (["INPUT", "TEXTAREA"].indexOf(this.tagName) === -1 &&
        this.getAttribute("contenteditable") === null)
        return;

      activeElements.focused = this;

      tt.target(this).model(tModel);
      tt.showAll();
    }

    function targetBlur()
    {
      activeElements.focused = null;
      tt.hideAll();
    }

    tModels[i] = tModel = extend({}, typeTooltipModel, tModel);

    if (!tModel.targetElements.length && tModel.targetSelector)
      tModel.targetElements = getElementsBySelector(tModel.targetSelector);

    if (!tModel.targetElements.length && tModel.targetXPath)
      tModel.targetElements = getElementsByXPath(tModel.targetXPath);

    tModel.targetElements.forEach(function(el) {
      destrStack.push(function(){
        el.removeEventListener("mouseenter",targetMousemove);
        el.removeEventListener("mouseleave",targetMouseout);
        el.removeEventListener("focus",targetFocus);
        el.removeEventListener("blur",targetBlur);
      });

      el.addEventListener("mouseenter",targetMousemove);
      el.addEventListener("mouseleave",targetMouseout);
      el.addEventListener("focus",targetFocus);
      el.addEventListener("blur",targetBlur);
    });
  });

  return function(){
    for(var i=destrStack.length;i--;)
      destrStack[i]();
  }
}

function init()
{
  if (!tt) {
    options = {};
    tt = Tooltip();
    safeTModels=[];
    tModels = [];
  }

  activeElements = {
    focused: null,
    hovered: null
  };
}

var html5tooltipsGlobal=function(userTModels, userOptions)
{
  if (userTModels.length)
    // merge arrays
    Array.prototype.push.apply(safeTModels, userTModels);

  else if (typeof userTModels === "object")
    safeTModels.push(userTModels);

  options = userOptions ? extend({}, userOptions) : options;

  Array.prototype.push.apply(tModels,safeTModels);
  untieTooltips&&untieTooltips();
  untieTooltips=tieTooltips();
};

var html5tooltipsModule=function(userTModels, userOptions)
{
  init();
  html5tooltipsGlobal(userTModels, userOptions);
};

//Provides html property reading for AMD and CommonJS
html5tooltipsModule.autoinit=function(){
  init();
  html5tooltipsModule.refresh();
};

html5tooltipsGlobal.refresh=
html5tooltipsModule.refresh=function(){
  pickDocumentDataTargets();
  untieTooltips&&untieTooltips();
  untieTooltips=tieTooltips();
};

function documentReadyHandler()
{
  document.removeEventListener("DOMContentLoaded", documentReadyHandler, false);
  window.removeEventListener("load", documentReadyHandler, false);

  pickDocumentDataTargets();
  untieTooltips&&untieTooltips();
  untieTooltips=tieTooltips();
}

if (typeof exports === "object" && exports &&
    typeof module === "object" && module && module.exports === exports) {
  // CommonJS (Browserify)
  module.exports = html5tooltipsModule;
} else if (window.define) {
  // AMD
  define(function () {
    return html5tooltipsModule;
  });

} else {
  // global object
  init();

  if (document.readyState === "complete") {
    documentReadyHandler();

  } else {
    document.addEventListener("DOMContentLoaded", documentReadyHandler, false);
    window.addEventListener( "load", documentReadyHandler, false );
  }

  if (window.html5tooltips === undefined) {
    window.html5tooltipsPredefined = html5tooltipsPredefined;
    window.html5tooltips = html5tooltipsGlobal;
  }
}

window.addEventListener("scroll", function()
{
  tt.updatePos();
}, false );

})();
