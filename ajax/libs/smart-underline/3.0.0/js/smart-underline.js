(function() {
  var PHI, backgroundPositionYCache, calculateBaselineYRatio, calculateTextHighestY, calculateTypeMetrics, clearCanvas, containerIdAttrName, containsAnyNonInlineElements, containsInvalidElements, countParentContainers, destroy, getBackgroundColor, getBackgroundColorNode, getLinkColor, getUnderlineBackgroundPositionY, hasValidLinkContent, init, initLink, initLinkOnHover, isTransparent, linkAlwysAttrName, linkBgPosAttrName, linkColorAttrName, linkContainers, linkHoverAttrName, linkLargeAttrName, linkSmallAttrName, performanceTimes, renderStyles, selectionColor, sortContainersForCSSPrecendence, styleNode, time, uniqueLinkContainerID;

  window.SmartUnderline = {
    init: function() {},
    destroy: function() {}
  };

  if (!(window['getComputedStyle'] && document.documentElement.getAttribute)) {
    return;
  }

  PHI = 1.618034;

  selectionColor = '#b4d5fe';

  linkColorAttrName = 'data-smart-underline-link-color';

  linkSmallAttrName = 'data-smart-underline-link-small';

  linkLargeAttrName = 'data-smart-underline-link-large';

  linkAlwysAttrName = 'data-smart-underline-link-always';

  linkBgPosAttrName = 'data-smart-underline-link-background-position';

  linkHoverAttrName = 'data-smart-underline-link-hover';

  containerIdAttrName = 'data-smart-underline-container-id';

  performanceTimes = [];

  time = function() {
    return +(new Date);
  };

  linkContainers = {};

  uniqueLinkContainerID = (function() {
    var id;
    id = 0;
    return function() {
      return id += 1;
    };
  })();

  clearCanvas = function(canvas, context) {
    return context.clearRect(0, 0, canvas.width, canvas.height);
  };

  calculateTextHighestY = function(text, canvas, context) {
    var alpha, highestY, pixelData, r, textWidth, x, y, _i, _j, _ref;
    clearCanvas(canvas, context);
    context.fillStyle = 'red';
    textWidth = context.measureText(text).width;
    context.fillText(text, 0, 0);
    highestY = void 0;
    for (x = _i = 0; 0 <= textWidth ? _i <= textWidth : _i >= textWidth; x = 0 <= textWidth ? ++_i : --_i) {
      for (y = _j = 0, _ref = canvas.height; 0 <= _ref ? _j <= _ref : _j >= _ref; y = 0 <= _ref ? ++_j : --_j) {
        pixelData = context.getImageData(x, y, x + 1, y + 1);
        r = pixelData.data[0];
        alpha = pixelData.data[3];
        if (r === 255 && alpha > 50) {
          if (!highestY) {
            highestY = y;
          }
          if (y > highestY) {
            highestY = y;
          }
        }
      }
    }
    clearCanvas(canvas, context);
    return highestY;
  };

  calculateTypeMetrics = function(computedStyle) {
    var baselineY, canvas, context, descenderHeight, gLowestPixel;
    canvas = document.createElement('canvas');
    context = canvas.getContext('2d');
    canvas.height = canvas.width = 2 * parseInt(computedStyle.fontSize, 10);
    context.textBaseline = 'top';
    context.textAlign = 'start';
    context.fontStretch = 1;
    context.angle = 0;
    context.font = "" + computedStyle.fontVariant + " " + computedStyle.fontStyle + " " + computedStyle.fontWeight + " " + computedStyle.fontSize + "/" + computedStyle.lineHeight + " " + computedStyle.fontFamily;
    baselineY = calculateTextHighestY('I', canvas, context);
    gLowestPixel = calculateTextHighestY('g', canvas, context);
    descenderHeight = gLowestPixel - baselineY;
    return {
      baselineY: baselineY,
      descenderHeight: descenderHeight
    };
  };

  calculateBaselineYRatio = function(node) {
    var baselinePositionY, baselineYRatio, height, large, largeRect, small, smallRect, test;
    test = document.createElement('div');
    test.style.display = 'block';
    test.style.position = 'absolute';
    test.style.bottom = 0;
    test.style.right = 0;
    test.style.width = 0;
    test.style.height = 0;
    test.style.margin = 0;
    test.style.padding = 0;
    test.style.visibility = 'hidden';
    test.style.overflow = 'hidden';
    small = document.createElement('span');
    large = document.createElement('span');
    small.style.display = 'inline';
    large.style.display = 'inline';
    small.style.fontSize = '0px';
    large.style.fontSize = '2000px';
    small.innerHTML = 'X';
    large.innerHTML = 'X';
    test.appendChild(small);
    test.appendChild(large);
    node.appendChild(test);
    smallRect = small.getBoundingClientRect();
    largeRect = large.getBoundingClientRect();
    node.removeChild(test);
    baselinePositionY = smallRect.top - largeRect.top;
    height = largeRect.height;
    return baselineYRatio = Math.abs(baselinePositionY / height);
  };

  backgroundPositionYCache = {};

  getUnderlineBackgroundPositionY = function(node) {
    var adjustment, backgroundPositionY, backgroundPositionYPercent, baselineY, baselineYRatio, cache, cacheKey, clientRects, computedStyle, descenderHeight, descenderY, fontSizeInt, minimumCloseness, textHeight, _ref;
    computedStyle = getComputedStyle(node);
    cacheKey = "font:" + computedStyle.fontFamily + "size:" + computedStyle.fontSize + "weight:" + computedStyle.fontWeight;
    cache = backgroundPositionYCache[cacheKey];
    if (cache) {
      return cache;
    }
    _ref = calculateTypeMetrics(computedStyle), baselineY = _ref.baselineY, descenderHeight = _ref.descenderHeight;
    clientRects = node.getClientRects();
    if (!(clientRects != null ? clientRects.length : void 0)) {
      return;
    }
    adjustment = 1;
    textHeight = clientRects[0].height - adjustment;
    if (-1 < navigator.userAgent.toLowerCase().indexOf('firefox')) {
      adjustment = .98;
      baselineYRatio = calculateBaselineYRatio(node);
      baselineY = baselineYRatio * textHeight * adjustment;
    }
    descenderY = baselineY + descenderHeight;
    fontSizeInt = parseInt(computedStyle.fontSize, 10);
    minimumCloseness = 3;
    backgroundPositionY = baselineY + Math.max(minimumCloseness, descenderHeight / PHI);
    if (descenderHeight === 4) {
      backgroundPositionY = descenderY - 1;
    }
    if (descenderHeight === 3) {
      backgroundPositionY = descenderY;
    }
    backgroundPositionYPercent = Math.round(100 * backgroundPositionY / textHeight);
    if (descenderHeight > 2 && fontSizeInt > 10 && backgroundPositionYPercent <= 100) {
      backgroundPositionYCache[cacheKey] = backgroundPositionYPercent;
      return backgroundPositionYPercent;
    }
  };

  isTransparent = function(color) {
    var alpha, rgbaAlphaMatch;
    if (color === 'transparent' || color === 'rgba(0, 0, 0, 0)') {
      return true;
    }
    rgbaAlphaMatch = color.match(/^rgba\(.*,(.+)\)/i);
    if ((rgbaAlphaMatch != null ? rgbaAlphaMatch.length : void 0) === 2) {
      alpha = parseFloat(rgbaAlphaMatch[1]);
      if (alpha < .0001) {
        return true;
      }
    }
    return false;
  };

  getBackgroundColorNode = function(node) {
    var backgroundColor, computedStyle, parentNode, reachedRootNode;
    computedStyle = getComputedStyle(node);
    backgroundColor = computedStyle.backgroundColor;
    parentNode = node.parentNode;
    reachedRootNode = !parentNode || parentNode === document.documentElement || parentNode === node;
    if (computedStyle.backgroundImage !== 'none') {
      return null;
    }
    if (isTransparent(backgroundColor)) {
      if (reachedRootNode) {
        return node.parentNode || node;
      } else {
        return getBackgroundColorNode(parentNode);
      }
    } else {
      return node;
    }
  };

  hasValidLinkContent = function(node) {
    return containsInvalidElements(node) || containsAnyNonInlineElements(node);
  };

  containsInvalidElements = function(node) {
    var child, _i, _len, _ref, _ref1, _ref2;
    _ref = node.children;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      child = _ref[_i];
      if ((_ref1 = (_ref2 = child.tagName) != null ? _ref2.toLowerCase() : void 0) === 'img' || _ref1 === 'video' || _ref1 === 'canvas' || _ref1 === 'embed' || _ref1 === 'object' || _ref1 === 'iframe') {
        return true;
      }
      return containsInvalidElements(child);
    }
    return false;
  };

  containsAnyNonInlineElements = function(node) {
    var child, style, _i, _len, _ref;
    _ref = node.children;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      child = _ref[_i];
      style = getComputedStyle(child);
      if (style.display !== 'inline') {
        return true;
      }
      return containsAnyNonInlineElements(child);
    }
    return false;
  };

  getBackgroundColor = function(node) {
    var backgroundColor;
    backgroundColor = getComputedStyle(node).backgroundColor;
    if (node === document.documentElement && isTransparent(backgroundColor)) {
      return 'rgb(255, 255, 255)';
    } else {
      return backgroundColor;
    }
  };

  getLinkColor = function(node) {
    return getComputedStyle(node).color;
  };

  styleNode = document.createElement('style');

  countParentContainers = function(node, count) {
    var parentNode, reachedRootNode;
    if (count == null) {
      count = 0;
    }
    parentNode = node.parentNode;
    reachedRootNode = !parentNode || parentNode === document || parentNode === node;
    if (reachedRootNode) {
      return count;
    } else {
      if (parentNode.hasAttribute(containerIdAttrName)) {
        count += 1;
      }
      return count + countParentContainers(parentNode);
    }
  };

  sortContainersForCSSPrecendence = function(containers) {
    var container, id, sorted;
    sorted = [];
    for (id in containers) {
      container = containers[id];
      container.depth = countParentContainers(container.container);
      sorted.push(container);
    }
    sorted.sort(function(a, b) {
      if (a.depth < b.depth) {
        return -1;
      }
      if (a.depth > b.depth) {
        return 1;
      }
      return 0;
    });
    return sorted;
  };

  initLink = function(link) {
    var backgroundPositionY, container, fontSize, id, style;
    style = getComputedStyle(link);
    fontSize = parseFloat(style.fontSize);
    if (style.textDecoration === 'underline' && style.display === 'inline' && fontSize >= 10 && !hasValidLinkContent(link)) {
      container = getBackgroundColorNode(link);
      if (container) {
        backgroundPositionY = getUnderlineBackgroundPositionY(link);
        if (backgroundPositionY) {
          link.setAttribute(linkColorAttrName, getLinkColor(link));
          link.setAttribute(linkBgPosAttrName, backgroundPositionY);
          id = container.getAttribute(containerIdAttrName);
          if (id) {
            linkContainers[id].links.push(link);
          } else {
            id = uniqueLinkContainerID();
            container.setAttribute(containerIdAttrName, id);
            linkContainers[id] = {
              id: id,
              container: container,
              links: [link]
            };
          }
          return true;
        }
      }
    }
    return false;
  };

  renderStyles = function() {
    var backgroundColor, backgroundPositionY, color, container, containersWithPrecedence, link, linkBackgroundPositionYs, linkColors, linkSelector, styles, _i, _j, _len, _len1, _ref;
    styles = '';
    containersWithPrecedence = sortContainersForCSSPrecendence(linkContainers);
    linkBackgroundPositionYs = {};
    for (_i = 0, _len = containersWithPrecedence.length; _i < _len; _i++) {
      container = containersWithPrecedence[_i];
      linkColors = {};
      _ref = container.links;
      for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
        link = _ref[_j];
        linkColors[getLinkColor(link)] = true;
        linkBackgroundPositionYs[getUnderlineBackgroundPositionY(link)] = true;
      }
      backgroundColor = getBackgroundColor(container.container);
      for (color in linkColors) {
        linkSelector = function(modifier) {
          if (modifier == null) {
            modifier = '';
          }
          return "[" + containerIdAttrName + "=\"" + container.id + "\"] a[" + linkColorAttrName + "=\"" + color + "\"][" + linkAlwysAttrName + "]" + modifier + ",\n[" + containerIdAttrName + "=\"" + container.id + "\"] a[" + linkColorAttrName + "=\"" + color + "\"][" + linkHoverAttrName + "]" + modifier + ":hover";
        };
        styles += "" + (linkSelector()) + ", " + (linkSelector(':visited')) + " {\n  color: " + color + ";\n  text-decoration: none !important;\n  text-shadow: 0.03em 0 " + backgroundColor + ", -0.03em 0 " + backgroundColor + ", 0 0.03em " + backgroundColor + ", 0 -0.03em " + backgroundColor + ", 0.06em 0 " + backgroundColor + ", -0.06em 0 " + backgroundColor + ", 0.09em 0 " + backgroundColor + ", -0.09em 0 " + backgroundColor + ", 0.12em 0 " + backgroundColor + ", -0.12em 0 " + backgroundColor + ", 0.15em 0 " + backgroundColor + ", -0.15em 0 " + backgroundColor + ";\n  background-color: transparent;\n  background-image: -webkit-linear-gradient(" + backgroundColor + ", " + backgroundColor + "), -webkit-linear-gradient(" + backgroundColor + ", " + backgroundColor + "), -webkit-linear-gradient(" + color + ", " + color + ");\n  background-image: -moz-linear-gradient(" + backgroundColor + ", " + backgroundColor + "), -moz-linear-gradient(" + backgroundColor + ", " + backgroundColor + "), -moz-linear-gradient(" + color + ", " + color + ");\n  background-image: -o-linear-gradient(" + backgroundColor + ", " + backgroundColor + "), -o-linear-gradient(" + backgroundColor + ", " + backgroundColor + "), -o-linear-gradient(" + color + ", " + color + ");\n  background-image: -ms-linear-gradient(" + backgroundColor + ", " + backgroundColor + "), -ms-linear-gradient(" + backgroundColor + ", " + backgroundColor + "), -ms-linear-gradient(" + color + ", " + color + ");\n  background-image: linear-gradient(" + backgroundColor + ", " + backgroundColor + "), linear-gradient(" + backgroundColor + ", " + backgroundColor + "), linear-gradient(" + color + ", " + color + ");\n  -webkit-background-size: 0.05em 1px, 0.05em 1px, 1px 1px;\n  -moz-background-size: 0.05em 1px, 0.05em 1px, 1px 1px;\n  background-size: 0.05em 1px, 0.05em 1px, 1px 1px;\n  background-repeat: no-repeat, no-repeat, repeat-x;\n}\n\n" + (linkSelector('::selection')) + " {\n  text-shadow: 0.03em 0 " + selectionColor + ", -0.03em 0 " + selectionColor + ", 0 0.03em " + selectionColor + ", 0 -0.03em " + selectionColor + ", 0.06em 0 " + selectionColor + ", -0.06em 0 " + selectionColor + ", 0.09em 0 " + selectionColor + ", -0.09em 0 " + selectionColor + ", 0.12em 0 " + selectionColor + ", -0.12em 0 " + selectionColor + ", 0.15em 0 " + selectionColor + ", -0.15em 0 " + selectionColor + ";\n  background: " + selectionColor + ";\n}\n\n" + (linkSelector('::-moz-selection')) + " {\n  text-shadow: 0.03em 0 " + selectionColor + ", -0.03em 0 " + selectionColor + ", 0 0.03em " + selectionColor + ", 0 -0.03em " + selectionColor + ", 0.06em 0 " + selectionColor + ", -0.06em 0 " + selectionColor + ", 0.09em 0 " + selectionColor + ", -0.09em 0 " + selectionColor + ", 0.12em 0 " + selectionColor + ", -0.12em 0 " + selectionColor + ", 0.15em 0 " + selectionColor + ", -0.15em 0 " + selectionColor + ";\n  background: " + selectionColor + ";\n}";
      }
    }
    for (backgroundPositionY in linkBackgroundPositionYs) {
      styles += "a[" + linkBgPosAttrName + "=\"" + backgroundPositionY + "\"] {\n  background-position: 0% " + backgroundPositionY + "%, 100% " + backgroundPositionY + "%, 0% " + backgroundPositionY + "%;\n}";
    }
    return styleNode.innerHTML = styles;
  };

  initLinkOnHover = function() {
    var alreadyMadeSmart, link, madeSmart;
    link = this;
    alreadyMadeSmart = link.hasAttribute(linkHoverAttrName);
    if (!alreadyMadeSmart) {
      madeSmart = initLink(link);
      if (madeSmart) {
        link.setAttribute(linkHoverAttrName, '');
        return renderStyles();
      }
    }
  };

  init = function(options) {
    var link, links, madeSmart, startTime, _i, _len;
    startTime = time();
    links = document.querySelectorAll("" + (options.location ? options.location + ' ' : '') + "a");
    if (!links.length) {
      return;
    }
    linkContainers = {};
    for (_i = 0, _len = links.length; _i < _len; _i++) {
      link = links[_i];
      madeSmart = initLink(link);
      if (madeSmart) {
        link.setAttribute(linkAlwysAttrName, '');
      } else {
        link.removeEventListener('mouseover', initLinkOnHover);
        link.addEventListener('mouseover', initLinkOnHover);
      }
    }
    renderStyles();
    document.body.appendChild(styleNode);
    return performanceTimes.push(time() - startTime);
  };

  destroy = function() {
    var attribute, _i, _len, _ref, _ref1, _results;
    if ((_ref = styleNode.parentNode) != null) {
      _ref.removeChild(styleNode);
    }
    Array.prototype.forEach.call(document.querySelectorAll("[" + linkHoverAttrName + "]"), function(node) {
      return node.removeEventListener(initLinkOnHover);
    });
    _ref1 = [linkColorAttrName, linkSmallAttrName, linkLargeAttrName, linkAlwysAttrName, linkHoverAttrName, containerIdAttrName];
    _results = [];
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      attribute = _ref1[_i];
      _results.push(Array.prototype.forEach.call(document.querySelectorAll("[" + attribute + "]"), function(node) {
        return node.removeAttribute(attribute);
      }));
    }
    return _results;
  };

  window.SmartUnderline = {
    init: function(options) {
      if (options == null) {
        options = {};
      }
      if (document.readyState === 'loading') {
        window.addEventListener('DOMContentLoaded', function() {
          return init(options);
        });
        return window.addEventListener('load', function() {
          destroy();
          return init(options);
        });
      } else {
        destroy();
        return init(options);
      }
    },
    destroy: function() {
      return destroy();
    },
    performanceTimes: function() {
      return performanceTimes;
    }
  };

}).call(this);
