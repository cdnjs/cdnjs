window.requestAnimFrame = (function() {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

window.cancelRequestAnimFrame = (function() {
  return (
    window.cancelAnimationFrame ||
    window.webkitCancelRequestAnimationFrame ||
    window.mozCancelRequestAnimationFrame ||
    window.oCancelRequestAnimationFrame ||
    window.msCancelRequestAnimationFrame ||
    clearTimeout
  );
})();

var Intense = (function() {
  "use strict";

  var KEYCODE_ESC = 27;

  // Track both the current and destination mouse coordinates
  // Destination coordinates are non-eased actual mouse coordinates
  var mouse = { xCurr: 0, yCurr: 0, xDest: 0, yDest: 0 };

  var horizontalOrientation = true;
  var invertInteractionDirection = false;

  // Holds the animation frame id.
  var looper;

  // Single image
  var image;

  // Current position of scrolly element
  var lastPosition,
    currentPosition = 0;

  var sourceDimensions, target;
  var targetDimensions = { w: 0, h: 0 };

  var container;
  var containerDimensions = { w: 0, h: 0 };
  var overflowArea = { x: 0, y: 0 };

  // Overflow variable before screen is locked.
  var overflowValue;

  var active = false;

  /* -------------------------
  /*          UTILS
  /* -------------------------*/

  // Soft object augmentation
  function extend(target, source) {
    for (var key in source) if (!(key in target)) target[key] = source[key];

    return target;
  }

  // Applys a dict of css properties to an element
  function applyProperties(target, properties) {
    for (var key in properties) {
      target.style[key] = properties[key];
    }
  }

  // Returns whether target a vertical or horizontal fit in the page.
  // As well as the right fitting width/height of the image.
  function getFit(source) {
    var heightRatio = window.innerHeight / source.h;

    if (source.w * heightRatio > window.innerWidth) {
      return {
        w: source.w * heightRatio,
        h: source.h * heightRatio,
        fit: true
      };
    } else {
      var widthRatio = window.innerWidth / source.w;
      return { w: source.w * widthRatio, h: source.h * widthRatio, fit: false };
    }
  }

  /* -------------------------
  /*          APP
  /* -------------------------*/

  function startTracking(passedElements) {
    var i;

    // If passed an array of elements, assign tracking to all.
    if (passedElements.length) {
      // Loop and assign
      for (i = 0; i < passedElements.length; i++) {
        track(passedElements[i]);
      }
    } else {
      track(passedElements);
    }
  }

  function track(element) {
    // Element needs a src at minumun.
    if (element.getAttribute("data-image") || element.src || element.href) {
      element.addEventListener(
        "click",
        function(e) {
          if (element.tagName === "A") {
            e.preventDefault();
          }
          if (!active) {
            init(this);
          }
        },
        false
      );
    }
  }

  function start() {
    loop();
  }

  function stop() {
    cancelRequestAnimFrame(looper);
  }

  function loop() {
    looper = requestAnimFrame(loop);
    positionTarget();
  }

  // Lock scroll on the document body.
  function lockBody() {
    overflowValue = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }

  // Unlock scroll on the document body.
  function unlockBody() {
    document.body.style.overflow = overflowValue;
  }

  function setState(element, newClassName) {
    if (element) {
      element.className = element.className.replace("intense--loading", "");
      element.className = element.className.replace("intense--viewing", "");
      element.className += " " + newClassName;
    } else {
      // Remove element with class .view
      var elems = document.querySelectorAll(".intense--viewing");
      [].forEach.call(elems, function(el) {
        el.className = el.className.replace("intense--viewing", "").trim();
      });
    }
  }

  function createViewer(title, caption) {
    /*
       *  Container
       */
    var containerProperties = {
      backgroundColor: "rgba(0,0,0,0.8)",
      width: "100%",
      height: "100%",
      position: "fixed",
      top: "0px",
      left: "0px",
      overflow: "hidden",
      zIndex: "999999",
      margin: "0px",
      webkitTransition: "opacity 150ms cubic-bezier( 0, 0, .26, 1 )",
      MozTransition: "opacity 150ms cubic-bezier( 0, 0, .26, 1 )",
      transition: "opacity 150ms cubic-bezier( 0, 0, .26, 1 )",
      webkitBackfaceVisibility: "hidden",
      opacity: "0"
    };
    container = document.createElement("figure");
    container.appendChild(target);
    applyProperties(container, containerProperties);

    var imageProperties = {
      cursor:
        'url( "data:image/png;base64,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" ) 25 25, no-drop'
    };
    applyProperties(target, imageProperties);

    /*
       *  Caption Container
       */
    var captionContainerProperties = {
      fontFamily: 'Georgia, Times, "Times New Roman", serif',
      position: "fixed",
      bottom: "0px",
      left: "0px",
      padding: "20px",
      color: "#fff",
      wordSpacing: "0.2px",
      webkitFontSmoothing: "antialiased",
      textShadow: "-1px 0px 1px rgba(0,0,0,0.4)"
    };
    var captionContainer = document.createElement("figcaption");
    applyProperties(captionContainer, captionContainerProperties);

    /*
       *  Caption Title
       */
    if (title) {
      var captionTitleProperties = {
        margin: "0px",
        padding: "0px",
        fontWeight: "normal",
        fontSize: "40px",
        letterSpacing: "0.5px",
        lineHeight: "35px",
        textAlign: "left"
      };
      var captionTitle = document.createElement("h1");
      applyProperties(captionTitle, captionTitleProperties);
      captionTitle.innerHTML = title;
      captionContainer.appendChild(captionTitle);
    }

    if (caption) {
      var captionTextProperties = {
        margin: "0px",
        padding: "0px",
        fontWeight: "normal",
        fontSize: "20px",
        letterSpacing: "0.1px",
        maxWidth: "500px",
        textAlign: "left",
        background: "none",
        marginTop: "5px"
      };
      var captionText = document.createElement("h2");
      applyProperties(captionText, captionTextProperties);
      captionText.innerHTML = caption;
      captionContainer.appendChild(captionText);
    }

    container.appendChild(captionContainer);

    setDimensions();

    mouse.xCurr = mouse.xDest = window.innerWidth / 2;
    mouse.yCurr = mouse.yDest = window.innerHeight / 2;

    document.body.appendChild(container);
    setTimeout(function() {
      container.style["opacity"] = "1";
    }, 10);
  }

  function removeViewer() {
    unlockBody();
    unbindEvents();
    stop();
    document.body.removeChild(container);
    active = false;
    setState(false);
  }

  function setDimensions() {
    // Manually set height to stop bug where
    var imageDimensions = getFit(sourceDimensions);
    target.width = imageDimensions.w;
    target.height = imageDimensions.h;
    horizontalOrientation = imageDimensions.fit;

    targetDimensions = { w: target.width, h: target.height };
    containerDimensions = { w: window.innerWidth, h: window.innerHeight };
    overflowArea = {
      x: containerDimensions.w - targetDimensions.w,
      y: containerDimensions.h - targetDimensions.h
    };
  }

  function init(element) {
    setState(element, "intense--loading");
    var imageSource =
      element.getAttribute("data-image") || element.src || element.href;
    var title = element.getAttribute("data-title") || element.title;
    var caption = element.getAttribute("data-caption");

    // Clear old onload message
    if (image) {
      image.onload = null;
    }

    image = new Image();
    image.onload = function() {
      sourceDimensions = { w: image.width, h: image.height }; // Save original dimensions for later.
      target = this;
      createViewer(title, caption);
      lockBody();
      bindEvents();
      loop();

      setState(element, "intense--viewing");
    };

    image.src = imageSource;
  }

  function bindEvents() {
    container.addEventListener("mousemove", onMouseMove, false);
    container.addEventListener("touchmove", onTouchMove, false);
    window.addEventListener("resize", setDimensions, false);
    window.addEventListener("keyup", onKeyUp, false);
    target.addEventListener("click", removeViewer, false);
  }

  function unbindEvents() {
    container.removeEventListener("mousemove", onMouseMove, false);
    container.removeEventListener("touchmove", onTouchMove, false);
    window.removeEventListener("resize", setDimensions, false);
    window.removeEventListener("keyup", onKeyUp, false);
    target.removeEventListener("click", removeViewer, false);
  }

  function onMouseMove(event) {
    mouse.xDest = event.clientX;
    mouse.yDest = event.clientY;
  }

  function onTouchMove(event) {
    event.preventDefault(); // Needed to keep this event firing.
    mouse.xDest = window.innerWidth - event.touches[0].clientX;
    mouse.yDest = window.innerHeight - event.touches[0].clientY;
  }

  // Exit on excape key pressed;
  function onKeyUp(event) {
    event.preventDefault();
    if (event.keyCode === KEYCODE_ESC) {
      removeViewer();
    }
  }

  function positionTarget() {
    mouse.xCurr += (mouse.xDest - mouse.xCurr) * 0.05;
    mouse.yCurr += (mouse.yDest - mouse.yCurr) * 0.05;

    if (horizontalOrientation === true) {
      // HORIZONTAL SCANNING
      currentPosition += mouse.xCurr - currentPosition;
      if (mouse.xCurr !== lastPosition) {
        var position = parseFloat(
          calcPosition(currentPosition, containerDimensions.w)
        );
        position = overflowArea.x * position;
        target.style["webkitTransform"] = "translate(" + position + "px, 0px)";
        target.style["MozTransform"] = "translate(" + position + "px, 0px)";
        target.style["msTransform"] = "translate(" + position + "px, 0px)";
        lastPosition = mouse.xCurr;
      }
    } else if (horizontalOrientation === false) {
      // VERTICAL SCANNING
      currentPosition += mouse.yCurr - currentPosition;
      if (mouse.yCurr !== lastPosition) {
        var position = parseFloat(
          calcPosition(currentPosition, containerDimensions.h)
        );
        position = overflowArea.y * position;
        target.style["webkitTransform"] = "translate( 0px, " + position + "px)";
        target.style["MozTransform"] = "translate( 0px, " + position + "px)";
        target.style["msTransform"] = "translate( 0px, " + position + "px)";
        lastPosition = mouse.yCurr;
      }
    }

    function calcPosition(current, total) {
      return invertInteractionDirection
        ? (total - current) / total
        : current / total;
    }
  }

  function config(options) {
    if ("invertInteractionDirection" in options)
      invertInteractionDirection = options.invertInteractionDirection;
  }

  function main(element, configOptions) {
    // Parse arguments
    if (!element) {
      throw "You need to pass an element!";
    }

    // If they have a config, use it!
    if (configOptions) {
      config(configOptions);
    }

    startTracking(element);
  }

  return extend(main, {
    resize: setDimensions,
    start: start,
    stop: stop,
    config: config
  });
})();

if (typeof module !== "undefined" && module.exports) {
  module.exports = Intense;
}
