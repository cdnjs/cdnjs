/**
* html5tooltips.js
* Light and clean tooltips.
* https://github.com/yevhentiurin/html5tooltipsjs
*
* Yevhen Tiurin <yevhentiurin@gmail.com>
* The MIT License (MIT)
* http://opensource.org/licenses/MIT
*
* April 19, 2014
**/

(function() {

var tt, tModels, options, activeElements,

typeTooltipModel = {
  animateDuration: 300,
  contentText: "",
  contentMore: "",
  disableAnimation: false,
  stickTo: "bottom",
  stickDistance: 10,
  targetElements: [],
  targetSelector: "",
  targetXPath: "",
  maxWidth: null
},

defaultOptions = {
  animateDuration: 300,
  HTMLTemplate: null,
  disableAnimation: null,
  stickTo: null,
  maxWidth: null
},

template = {
  HTML: [
    "<div class='html5tooltip' style='box-sizing:border-box;position:fixed;'>",
      "<div class='html5tooltip-text'></div>",
      "<div class='html5tooltip-more' style='overflow:hidden;'>",
        "<div class='html5tooltip-hr'></div>",
        "<div class='html5tooltip-text'></div>",
      "</div>",
      "<div class='html5tooltip-pointer'><div class='html5tooltip-po'></div><div class='html5tooltip-pi'></div></div>",
    "</div>"
  ].join(""),

  hookClasses: {
    tooltip: 'html5tooltip',
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
  var ttElement, ttModel, targetElement, elText, elMore, elMoreText, elPointer;

  function animateElementClass(el, updateHandler)
  {
    if (!ttModel.disableAnimation) {
      // magic fix: refresh the animation queue
      el.offsetWidth = el.offsetWidth;
      el.classList.add("animated");
      updateHandler();
      setTimeout(function() { el.classList.remove("animated"); }, ttModel.animateDuration);
    }
    else
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
      ttElement.style.opacity = '0';
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

      animateElementClass(ttElement, function() {
        ttElement.style.opacity = '1';
      });
    }

    updatePos();

    return this;
  }

  function showAll()
  {
    if (ttElement.style.visibility !== 'visible') {
      ttElement.style.visibility = 'visible';
      
      animateElementClass(ttElement, function() {
        ttElement.style.opacity = '1';
      }); 

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
      case "bottom":
        elPointer.style.left = parseInt((ttRect.width - pointerRect.width) / 2) + "px";
        elPointer.style.top = -1 * pointerRect.height - 1 + "px";
        break;

      case "left":
        elPointer.style.left = ttRect.width - 3 + "px";
        elPointer.style.top = parseInt((ttRect.height - pointerRect.height) / 2) + "px";
        break;

      case "right":
        elPointer.style.left = -1 * pointerRect.width + "px";
        elPointer.style.top = parseInt((ttRect.height - pointerRect.height) / 2) + "px";
        break;

      case "top":
        elPointer.style.left = parseInt((ttRect.width - pointerRect.width) / 2) + "px";
        elPointer.style.top = ttRect.height - 3 + "px";
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
      case "bottom":
        ttElement.style.left = targetRect.left + parseInt((targetRect.width - ttRect.width) / 2) + "px";
        ttElement.style.top = targetRect.top + targetRect.height + parseInt(ttModel.stickDistance) + "px";
        break;

      case "left":
        ttElement.style.left = targetRect.left - ttRect.width - parseInt(ttModel.stickDistance) + "px";
        ttElement.style.top = targetRect.top + (targetRect.height - ttRect.height) / 2 + "px";
        break;

      case "right":
        ttElement.style.left = targetRect.left + targetRect.width + parseInt(ttModel.stickDistance) + "px";
        ttElement.style.top = targetRect.top + (targetRect.height - ttRect.height) / 2 + "px";
        break;

      case "top":
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
    ttModel.disableAnimation = options.disableAnimation ? options.disableAnimation : ttModel.disableAnimation;

    // update pointer
    elPointer.className = template.hookClasses.tooltipPointer + "-" + ttModel.stickTo;

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
  var pickedElements = getElementsByAttribute("data-tooltip-text");

  pickedElements.forEach(function(elTarget) {
    tModels.push(extend({}, typeTooltipModel, {
      contentText: elTarget.getAttribute("data-tooltip-text"),
      contentMore: elTarget.getAttribute("data-tooltip-more"),
      targetElements: [elTarget]
    }));
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

  if (window.html5tooltips === undefined)
    window.html5tooltips = html5tooltipsGlobal;
}

window.addEventListener("scroll", function()
{
  tt.updatePos();
}, false );

})();