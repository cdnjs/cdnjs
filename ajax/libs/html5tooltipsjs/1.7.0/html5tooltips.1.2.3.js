/**
* html5tooltips.js 1.2.3
* Light and clean tooltips with CSS3 animation.
* https://github.com/ytiurin/html5tooltipsjs
*
* Yevhen Tiurin <yevhentiurin@gmail.com>
* The MIT License (MIT)
* http://opensource.org/licenses/MIT
*
* May 14, 2014
**/

(function() {

var tt, tModels, options, activeElements,

html5tooltipsPredefined = {
  animateFunction: {
    fadeIn: "fadein",
    foldIn: "foldin",
    foldOut: "foldout",
    slideIn: "roll",
    slideIn: "slidein",
    slideIn: "spin"
  },

  color: {
    daffodil: {r: 255, g: 230, b: 23, a: 0.95},
    daisy: {r: 250, g: 211, b: 28, a: 0.95},
    mustard: {r: 253, g: 183, b: 23, a: 0.95},
    citrusZest: {r: 250, g: 170, b: 33, a: 0.95},
    pumpkin: {r: 241, g: 117, b: 63, a: 0.95},
    tangerine: {r: 237, g: 87, b: 36, a: 0.95},
    salmon: {r: 240, g: 70, b: 57, a: 0.95},
    persimmon: {r: 234, g: 40, b: 48, a: 0.95},
    rouge: {r: 188, g: 35, b: 38, a: 0.95},
    scarlet: {r: 140, g: 12, b: 3, a: 0.95},
    hotPink: {r: 229, g: 24, b: 93, a: 0.95},
    princess: {r: 243, g: 132, b: 174, a: 0.95},
    petal: {r: 250, g: 198, b: 210, a: 0.95},
    lilac: {r: 178, g: 150, b: 199, a: 0.95},
    lavender: {r: 123, g: 103, b: 174, a: 0.95},
    violet: {r: 95, g: 53, b: 119, a: 0.95},
    cloud: {r: 195, g: 222, b: 241, a: 0.95},
    dream: {r: 85, g: 190, b: 237, a: 0.95},
    gulf: {r: 49, g: 168, b: 224, a: 0.95},
    turquoise: {r: 35, g: 138, b: 204, a: 0.95},
    sky: {r: 13, g: 96, b: 174, a: 0.95},
    indigo: {r: 20, g: 59, b: 134, a: 0.95},
    navy: {r: 0, g: 27, b: 74, a: 0.95},
    seaFoam: {r: 125, g: 205, b: 194, a: 0.95},
    teal: {r: 0, g: 168, b: 168, a: 0.95},
    peacock: {r: 18, g: 149, b: 159, a: 0.95},
    ceadon: {r: 193, g: 209, b: 138, a: 0.95},
    olive: {r: 121, g: 145, b: 85, a: 0.95},
    bamboo: {r: 128, g: 188, b: 66, a: 0.95},
    grass: {r: 74, g: 160, b: 63, a: 0.95},
    kelly: {r: 22, g: 136, b: 74, a: 0.95},
    forrest: {r: 0, g: 63, b: 46, a: 0.95},
    chocolate: {r: 56, g: 30, b: 17, a: 0.95},
    terraCotta: {r: 192, g: 92, b: 32, a: 0.95},
    camel: {r: 191, g: 155, b: 107, a: 0.95},
    linen: {r: 233, g: 212, b: 167, a: 0.95},
    stone: {r: 231, g: 230, b: 225, a: 0.95},
    smoke: {r: 207, g: 208, b: 210, a: 0.95},
    steel: {r: 138, g: 139, b: 143, a: 0.95},
    slate: {r: 119, g: 133, b: 144, a: 0.95},
    charcoal: {r: 71, g: 77, b: 77, a: 0.95},
    black: {r: 5, g: 6, b: 8, a: 0.95},
    white: {r: 255, g: 255, b: 255, a: 0.95},
    metalicSilver: {r: 152, g: 162, b: 171, a: 0.95},
    metalicGold: {r: 159, g: 135, b: 89, a: 0.95},
    metalicCopper: {r: 140, g: 102, b: 65, a: 0.95}
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
  color: html5tooltipsPredefined.color.black,
  contentText: "",
  contentMore: "",
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
          "<div class='html5tooltip-hr'></div>",
          "<div class='html5tooltip-text'></div>",
        "</div>",
        "<div class='html5tooltip-pointer'><div class='html5tooltip-po'></div><div class='html5tooltip-pi'></div></div>",
      "</div>",
    "</div>"
  ].join(""),

  hookClasses: {
    tooltip: 'html5tooltip',
    tooltipBox: 'html5tooltip-box',
    tooltipText: 'html5tooltip-text',
    tooltipMore: 'html5tooltip-more',
    tooltipMoreText: 'html5tooltip-text',
    tooltipPointer: 'html5tooltip-pointer'
  }
};

function toArray(obj)
{
  return Array.prototype.slice.call(obj);
}

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
    nodes = toArray((context || document).querySelectorAll(selector));
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
  var ttElement, ttModel, targetElement, elBox, elText, elMore, elMoreText, elPointer;

  function animateElementClass(el, updateHandler)
  {
    if (!ttModel.disableAnimation) {
      // magic fix: refresh the animation queue
      el.offsetWidth = el.offsetWidth;
      el.classList.add("animating");
      updateHandler();
      setTimeout(function() { el.classList.remove("animating"); }, ttModel.animateDuration);
    }
    else
      updateHandler();
  }

  function applyAnimationClass(el, fromClass, toClass, updateHandler)
  {
    if (!ttModel.disableAnimation) {
      el.classList.add(fromClass);

      // magic fix: refresh the animation queue
      el.offsetWidth = el.offsetWidth;
      
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
    elPointer = ttElement.getElementsByClassName(template.hookClasses.tooltipPointer)[0];

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

      updateTooltipPos();

      // animate pointer
      animateElementClass(elPointer, updatePointerPos);

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
    updateTooltipPos();
    updatePointerPos();    
  }

  function updatePointerPos()
  {
    var ttRect;

    if (!targetElement)
      return;

    // position depend on target and tt width
    ttRect = ttElement.getBoundingClientRect();
    pointerRect = elPointer.getBoundingClientRect();

    switch (ttModel.stickTo) {
      case html5tooltipsPredefined.stickTo.bottom:
        elPointer.style.left = parseInt((ttRect.width - pointerRect.width) / 2) + "px";
        elPointer.style.top = -1 * pointerRect.height + "px";
        break;

      case html5tooltipsPredefined.stickTo.left:
        elPointer.style.left = ttRect.width - 2 + "px";
        elPointer.style.top = parseInt((ttRect.height - pointerRect.height) / 2) + "px";
        break;

      case html5tooltipsPredefined.stickTo.right:
        elPointer.style.left = -1 * pointerRect.width + 1 + "px";
        elPointer.style.top = parseInt((ttRect.height - pointerRect.height) / 2) + "px";
        break;

      case html5tooltipsPredefined.stickTo.top:
        elPointer.style.left = parseInt((ttRect.width - pointerRect.width) / 2) + "px";
        elPointer.style.top = ttRect.height - 2 + "px";
        break;
    }
  }

  function updateTooltipPos()
  {
    var targetRect, ttRect;

    if (!targetElement)
      return;

    // update width
    ttElement.style.width = "auto";
    ttRect = ttElement.getBoundingClientRect();

    var maxWidth = ttModel.maxWidth || options.maxWidth;
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
      ttModel.color = "rgba(" + ttModel.color.r + ", " + ttModel.color.g + ", " + ttModel.color.b + ", " + ttModel.color.a + ")";
    }
    elBox.style.backgroundColor = ttModel.color;
    elPointer.style.borderColor = ttModel.color;

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

  pickedElements.forEach(function(elTarget) {
    var tm = {
      contentText: elTarget.getAttribute("data-tooltip"),
      targetElements: [elTarget]
    };

    if (elTarget.getAttribute("data-tooltip-animate-function") !== null)
      tm.animateFunction = elTarget.getAttribute("data-tooltip-animate-function");

    if (elTarget.getAttribute("data-tooltip-color") !== null)
      tm.color = elTarget.getAttribute("data-tooltip-color");

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
  tModels.forEach(function(tModel, i) {
    tModel = extend({}, typeTooltipModel, tModel);

    if (!tModel.targetElements.length && tModel.targetSelector)
      tModel.targetElements = getElementsBySelector(tModel.targetSelector);

    if (!tModel.targetElements.length && tModel.targetXPath)
      tModel.targetElements = getElementsByXPath(tModel.targetXPath);

    tModel.targetElements.forEach(function(el) {
      el.addEventListener("mouseover", function() {
        var hoverTarget = this;

        if (activeElements.hovered === hoverTarget || activeElements.focused !== null)
          return;

        activeElements.hovered = hoverTarget;
        tt.target(this).model(tModel);

        setTimeout(function() {
          if (activeElements.hovered === hoverTarget)
            tt.showBrief();
        }, 300);
      });

      el.addEventListener("mouseout", function() {
        activeElements.hovered = null;

        if (activeElements.focused !== null)
          return;

        tt.hideAll();
      });

      el.addEventListener("focus", function() {
        if (["INPUT", "TEXTAREA"].indexOf(this.tagName) === -1 &&
          this.getAttribute("contenteditable") === null)
          return;

        activeElements.focused = this;

        tt.target(this).model(tModel);
        tt.showAll();
      });

      el.addEventListener("blur", function() {
        activeElements.focused = null;
        tt.hideAll();
      });
    });

    tModels[i] = tModel;
  });
}

function init()
{
  if (!tt) {
    options = {};
    tt = Tooltip();
    tModels = [];
  }

  activeElements = {
    focused: null,
    hovered: null
  };
}

function html5tooltipsGlobal(userTModels, userOptions)
{
  if (userTModels.length)
    // merge arrays
    Array.prototype.push.apply(tModels, userTModels);

  else if (typeof userTModels === "object")
    tModels.push(userTModels);

  options = userOptions ? extend({}, userOptions) : options;

  tieTooltips();
}

function html5tooltipsAMD(userTModels, userOptions)
{
  init();

  html5tooltipsGlobal(userTModels, userOptions);
}

function documentReadyHandler()
{
  document.removeEventListener("DOMContentLoaded", documentReadyHandler, false);
  window.removeEventListener("load", documentReadyHandler, false);
  
  pickDocumentDataTargets();
  tieTooltips();
}

if (window.define) {
  // AMD
  define("html5tooltips", function () {
    return html5tooltipsAMD;
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