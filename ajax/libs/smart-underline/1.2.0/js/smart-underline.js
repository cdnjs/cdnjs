(function() {
  var getBackgroundColor, getBackgroundColorNode, getLinkColor, init, isTransparent, linkColorDataAttributeName, linkContainerIdDataAttributeName, linkLargeDataAttributeName, linkSmallDataAttributeName, selectionColor, styleEl, uniqueLinkContainerID;

  window.SmartUnderline = {
    init: function() {},
    destroy: function() {}
  };

  if (!(window['getComputedStyle'] && document.documentElement.getAttribute)) {
    return;
  }

  selectionColor = '#b4d5fe';

  linkColorDataAttributeName = 'data-smart-underline-link-color';

  linkSmallDataAttributeName = 'data-smart-underline-link-small';

  linkLargeDataAttributeName = 'data-smart-underline-link-large';

  linkContainerIdDataAttributeName = 'data-smart-underline-container-id';

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

  styleEl = document.createElement('style');

  init = function(options) {
    var backgroundColor, color, container, fontSize, id, link, linkColors, linkContainers, linkLargeSelector, linkSelector, linkSmallSelector, links, style, styles, _i, _j, _len, _len1, _ref;
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
          link.setAttribute(linkColorDataAttributeName, getLinkColor(link));
          if (fontSize <= 14) {
            link.setAttribute(linkSmallDataAttributeName, '');
          }
          if (fontSize >= 20) {
            link.setAttribute(linkLargeDataAttributeName, '');
          }
          id = container.getAttribute(linkContainerIdDataAttributeName);
          if (id) {
            linkContainers[id].links.push(link);
          } else {
            id = uniqueLinkContainerID();
            container.setAttribute(linkContainerIdDataAttributeName, id);
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
        linkSelector = "[" + linkContainerIdDataAttributeName + "=\"" + id + "\"] a[" + linkColorDataAttributeName + "=\"" + color + "\"]";
        linkSmallSelector = "" + linkSelector + "[" + linkSmallDataAttributeName + "]";
        linkLargeSelector = "" + linkSelector + "[" + linkLargeDataAttributeName + "]";
        styles += "" + linkSelector + ", " + linkSelector + ":visited {\n  color: " + color + ";\n  text-decoration: none !important;\n  text-shadow: 0.03em 0 " + backgroundColor + ", -0.03em 0 " + backgroundColor + ", 0 0.03em " + backgroundColor + ", 0 -0.03em " + backgroundColor + ", 0.06em 0 " + backgroundColor + ", -0.06em 0 " + backgroundColor + ", 0.09em 0 " + backgroundColor + ", -0.09em 0 " + backgroundColor + ", 0.12em 0 " + backgroundColor + ", -0.12em 0 " + backgroundColor + ", 0.15em 0 " + backgroundColor + ", -0.15em 0 " + backgroundColor + ";\n  background-color: transparent;\n  background-image: -webkit-linear-gradient(" + backgroundColor + ", " + backgroundColor + "), -webkit-linear-gradient(" + backgroundColor + ", " + backgroundColor + "), -webkit-linear-gradient(" + color + ", " + color + ");\n  background-image: -moz-linear-gradient(" + backgroundColor + ", " + backgroundColor + "), -moz-linear-gradient(" + backgroundColor + ", " + backgroundColor + "), -moz-linear-gradient(" + color + ", " + color + ");\n  background-image: -o-linear-gradient(" + backgroundColor + ", " + backgroundColor + "), -o-linear-gradient(" + backgroundColor + ", " + backgroundColor + "), -o-linear-gradient(" + color + ", " + color + ");\n  background-image: -ms-linear-gradient(" + backgroundColor + ", " + backgroundColor + "), -ms-linear-gradient(" + backgroundColor + ", " + backgroundColor + "), -ms-linear-gradient(" + color + ", " + color + ");\n  background-image: linear-gradient(" + backgroundColor + ", " + backgroundColor + "), linear-gradient(" + backgroundColor + ", " + backgroundColor + "), linear-gradient(" + color + ", " + color + ");\n  -webkit-background-size: 0.05em 1px, 0.05em 1px, 1px 1px;\n  -moz-background-size: 0.05em 1px, 0.05em 1px, 1px 1px;\n  background-size: 0.05em 1px, 0.05em 1px, 1px 1px;\n  background-repeat: no-repeat, no-repeat, repeat-x;\n  background-position: 0% 90%, 100% 90%, 0% 90%;\n}\n\n" + linkSmallSelector + " {\n  background-position: 0% 96%, 100% 96%, 0% 96%;\n}\n\n" + linkLargeSelector + " {\n  background-position: 0% 87%, 100% 87%, 0% 87%;\n}\n\n" + linkSelector + "::selection {\n  text-shadow: 0.03em 0 " + selectionColor + ", -0.03em 0 " + selectionColor + ", 0 0.03em " + selectionColor + ", 0 -0.03em " + selectionColor + ", 0.06em 0 " + selectionColor + ", -0.06em 0 " + selectionColor + ", 0.09em 0 " + selectionColor + ", -0.09em 0 " + selectionColor + ", 0.12em 0 " + selectionColor + ", -0.12em 0 " + selectionColor + ", 0.15em 0 " + selectionColor + ", -0.15em 0 " + selectionColor + ";\n  background: " + selectionColor + ";\n}\n\n" + linkSelector + "::-moz-selection {\n  text-shadow: 0.03em 0 " + selectionColor + ", -0.03em 0 " + selectionColor + ", 0 0.03em " + selectionColor + ", 0 -0.03em " + selectionColor + ", 0.06em 0 " + selectionColor + ", -0.06em 0 " + selectionColor + ", 0.09em 0 " + selectionColor + ", -0.09em 0 " + selectionColor + ", 0.12em 0 " + selectionColor + ", -0.12em 0 " + selectionColor + ", 0.15em 0 " + selectionColor + ", -0.15em 0 " + selectionColor + ";\n  background: " + selectionColor + ";\n}";
      }
    }
    styleEl.innerHTML = styles;
    return document.body.appendChild(styleEl);
  };

  window.SmartUnderline = {
    init: function(options) {
      if (options == null) {
        options = {};
      }
      if (document.readyState === 'loading') {
        return window.addEventListener('DOMContentLoaded', init.bind(null, options));
      } else {
        return init(options);
      }
    },
    destroy: function() {
      var _ref;
      return (_ref = styleEl.parentNode) != null ? _ref.removeChild(styleEl) : void 0;
    }
  };

}).call(this);
