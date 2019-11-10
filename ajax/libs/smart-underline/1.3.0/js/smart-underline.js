(function() {
  var destroy, getBackgroundColor, getBackgroundColorNode, getLinkColor, init, isTransparent, linkColorAttrName, linkContainerIdAttrName, linkLargeAttrName, linkSmallAttrName, performanceTimes, selectionColor, styleNode, time, uniqueLinkContainerID;

  window.SmartUnderline = {
    init: function() {},
    destroy: function() {}
  };

  if (!(window['getComputedStyle'] && document.documentElement.getAttribute)) {
    return;
  }

  selectionColor = '#b4d5fe';

  linkColorAttrName = 'data-smart-underline-link-color';

  linkSmallAttrName = 'data-smart-underline-link-small';

  linkLargeAttrName = 'data-smart-underline-link-large';

  linkContainerIdAttrName = 'data-smart-underline-container-id';

  performanceTimes = [];

  time = function() {
    return +(new Date);
  };

  uniqueLinkContainerID = (function() {
    var id;
    id = 0;
    return function() {
      return id += 1;
    };
  })();

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

  init = function(options) {
    var backgroundColor, color, container, fontSize, id, link, linkColors, linkContainers, linkLargeSelector, linkSelector, linkSmallSelector, links, startTime, style, styles, _i, _j, _len, _len1, _ref;
    startTime = time();
    links = document.querySelectorAll("" + (options.location ? options.location + ' ' : '') + "a");
    if (!links.length) {
      return;
    }
    linkContainers = {};
    for (_i = 0, _len = links.length; _i < _len; _i++) {
      link = links[_i];
      style = getComputedStyle(link);
      fontSize = parseFloat(style.fontSize);
      if (style.textDecoration === 'underline' && style.display === 'inline' && fontSize >= 8) {
        container = getBackgroundColorNode(link);
        if (container) {
          link.setAttribute(linkColorAttrName, getLinkColor(link));
          if (fontSize <= 14) {
            link.setAttribute(linkSmallAttrName, '');
          }
          if (fontSize >= 20) {
            link.setAttribute(linkLargeAttrName, '');
          }
          id = container.getAttribute(linkContainerIdAttrName);
          if (id) {
            linkContainers[id].links.push(link);
          } else {
            id = uniqueLinkContainerID();
            container.setAttribute(linkContainerIdAttrName, id);
            linkContainers[id] = {
              container: container,
              links: [link]
            };
          }
        }
      }
    }
    styles = '';
    for (id in linkContainers) {
      container = linkContainers[id];
      linkColors = {};
      _ref = container.links;
      for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
        link = _ref[_j];
        linkColors[getLinkColor(link)] = true;
      }
      backgroundColor = getBackgroundColor(container.container);
      for (color in linkColors) {
        linkSelector = "[" + linkContainerIdAttrName + "=\"" + id + "\"] a[" + linkColorAttrName + "=\"" + color + "\"]";
        linkSmallSelector = "" + linkSelector + "[" + linkSmallAttrName + "]";
        linkLargeSelector = "" + linkSelector + "[" + linkLargeAttrName + "]";
        styles += "" + linkSelector + ", " + linkSelector + ":visited {\n  color: " + color + ";\n  text-decoration: none !important;\n  text-shadow: 0.03em 0 " + backgroundColor + ", -0.03em 0 " + backgroundColor + ", 0 0.03em " + backgroundColor + ", 0 -0.03em " + backgroundColor + ", 0.06em 0 " + backgroundColor + ", -0.06em 0 " + backgroundColor + ", 0.09em 0 " + backgroundColor + ", -0.09em 0 " + backgroundColor + ", 0.12em 0 " + backgroundColor + ", -0.12em 0 " + backgroundColor + ", 0.15em 0 " + backgroundColor + ", -0.15em 0 " + backgroundColor + ";\n  background-color: transparent;\n  background-image: -webkit-linear-gradient(" + backgroundColor + ", " + backgroundColor + "), -webkit-linear-gradient(" + backgroundColor + ", " + backgroundColor + "), -webkit-linear-gradient(" + color + ", " + color + ");\n  background-image: -moz-linear-gradient(" + backgroundColor + ", " + backgroundColor + "), -moz-linear-gradient(" + backgroundColor + ", " + backgroundColor + "), -moz-linear-gradient(" + color + ", " + color + ");\n  background-image: -o-linear-gradient(" + backgroundColor + ", " + backgroundColor + "), -o-linear-gradient(" + backgroundColor + ", " + backgroundColor + "), -o-linear-gradient(" + color + ", " + color + ");\n  background-image: -ms-linear-gradient(" + backgroundColor + ", " + backgroundColor + "), -ms-linear-gradient(" + backgroundColor + ", " + backgroundColor + "), -ms-linear-gradient(" + color + ", " + color + ");\n  background-image: linear-gradient(" + backgroundColor + ", " + backgroundColor + "), linear-gradient(" + backgroundColor + ", " + backgroundColor + "), linear-gradient(" + color + ", " + color + ");\n  -webkit-background-size: 0.05em 1px, 0.05em 1px, 1px 1px;\n  -moz-background-size: 0.05em 1px, 0.05em 1px, 1px 1px;\n  background-size: 0.05em 1px, 0.05em 1px, 1px 1px;\n  background-repeat: no-repeat, no-repeat, repeat-x;\n  background-position: 0% 90%, 100% 90%, 0% 90%;\n}\n\n" + linkSmallSelector + " {\n  background-position: 0% 96%, 100% 96%, 0% 96%;\n}\n\n" + linkLargeSelector + " {\n  background-position: 0% 87%, 100% 87%, 0% 87%;\n}\n\n" + linkSelector + "::selection {\n  text-shadow: 0.03em 0 " + selectionColor + ", -0.03em 0 " + selectionColor + ", 0 0.03em " + selectionColor + ", 0 -0.03em " + selectionColor + ", 0.06em 0 " + selectionColor + ", -0.06em 0 " + selectionColor + ", 0.09em 0 " + selectionColor + ", -0.09em 0 " + selectionColor + ", 0.12em 0 " + selectionColor + ", -0.12em 0 " + selectionColor + ", 0.15em 0 " + selectionColor + ", -0.15em 0 " + selectionColor + ";\n  background: " + selectionColor + ";\n}\n\n" + linkSelector + "::-moz-selection {\n  text-shadow: 0.03em 0 " + selectionColor + ", -0.03em 0 " + selectionColor + ", 0 0.03em " + selectionColor + ", 0 -0.03em " + selectionColor + ", 0.06em 0 " + selectionColor + ", -0.06em 0 " + selectionColor + ", 0.09em 0 " + selectionColor + ", -0.09em 0 " + selectionColor + ", 0.12em 0 " + selectionColor + ", -0.12em 0 " + selectionColor + ", 0.15em 0 " + selectionColor + ", -0.15em 0 " + selectionColor + ";\n  background: " + selectionColor + ";\n}";
      }
    }
    styleNode.innerHTML = styles;
    document.body.appendChild(styleNode);
    return performanceTimes.push(time() - startTime);
  };

  destroy = function() {
    var attribute, _i, _len, _ref, _ref1, _results;
    if ((_ref = styleNode.parentNode) != null) {
      _ref.removeChild(styleNode);
    }
    _ref1 = [linkColorAttrName, linkSmallAttrName, linkLargeAttrName, linkContainerIdAttrName];
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
