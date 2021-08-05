(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('chart.js')) :
  typeof define === 'function' && define.amd ? define(['exports', 'chart.js'], factory) :
  (global = global || self, factory(global.ChartHierarchical = {}, global.Chart));
}(this, (function (exports, chart_js) { 'use strict';

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _createForOfIteratorHelper(o) {
    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
      if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) {
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var it,
        normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = o[Symbol.iterator]();
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  /**
   * builds up recursivly the label tree
   * @param {string|ILabelNode} label
   * @param {ILabelNode|null} parent
   * @returns the node itself
   */
  function asNode(label, parent) {
    var node = Object.assign({
      label: '',
      children: [],
      expand: false,
      level: parent ? parent.level + 1 : 0,
      center: NaN,
      width: 0,
      hidden: false,
      major: !parent // for ticks

    }, typeof label === 'string' ? {
      label: label
    } : label);
    node.children = node.children.map(function (d) {
      return asNode(d, node);
    });
    return node;
  }
  /**
   * pushses a node into the given flat array and updates the index information to avoid parent links
   *
   * @param {ILabelNode} node
   * @param {number} i relative index of this node to its parent
   * @param {ILabelNode[]} flat flat array to push
   * @param {ILabelNode|null} parent
   */

  function push(node, i, flat, parent) {
    node.relIndex = i;
    node.index = flat.length; // absolute index

    node.parent = parent ? parent.index : -1; // node is hidden if parent is visible or not expanded

    node.hidden = Boolean(parent ? parent.expand === false || node.expand : node.expand);
    flat.push(node);
    node.children.forEach(function (d, j) {
      return push(d, j, flat, node);
    });
  }
  /**
   * converts the given labels to a flat array of linked nodes
   * @param {Partial<ILabelNode>|string} labels
   */


  function toNodes(labels) {
    var nodes = labels.map(function (d) {
      return asNode(d);
    });
    var flat = [];
    nodes.forEach(function (d, i) {
      return push(d, i, flat);
    });
    return flat;
  }
  /**
   * computes the parents (including itself) of the given node
   * @param {ILabelNode} node
   * @param {ILabelNode[]} flat flatArray for lookup
   */

  function parentsOf(node, flat) {
    var parents = [node];

    while (parents[0].parent >= 0) {
      parents.unshift(flat[parents[0].parent]);
    }

    return parents;
  }
  /**
   * computes the right most grand child of expanded nodes
   * @param {ILabelNode} node
   */

  function rightMost(node) {
    if (!node.expand || node.children.length === 0) {
      return node;
    }

    return rightMost(node.children[node.children.length - 1]);
  }
  /**
   * based on the visibility of the nodes computes the last node in the same level that is visible also considering expanded children
   * @param {ILabelNode} node
   * @param {ILabelNode[]} flat flatArray for lookup
   */


  function lastOfLevel(node, flat) {
    if (node.parent > -1) {
      var parent = flat[node.parent];
      return rightMost(parent.children[parent.children.length - 1]);
    } // top level search last top level sibling


    var sibling = flat.slice().reverse().find(function (d) {
      return d.parent === -1;
    });
    return rightMost(sibling);
  }
  /**
   * traverses the tree in pre order logic
   * @param {ILabelNode} node
   * @param {(node: ILabelNode) => void | false} visit return false to skip the traversal of children
   */

  function preOrderTraversal(node, visit) {
    var goDeep = visit(node);

    if (goDeep !== false) {
      var _iterator = _createForOfIteratorHelper(node.children),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var child = _step.value;
          preOrderTraversal(child, visit);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }
  /**
   * resolves for the given label node its value node
   * @param {ILabelNode} label
   * @param {ILabelNode[]} flat
   * @param {(IValueNode|any)[]} dataTree
   */

  function resolve(label, flat, dataTree) {
    var parents = parentsOf(label, flat);
    var dataItem = {
      children: dataTree
    };
    var dataParents = parents.map(function (p) {
      dataItem = dataItem && !(typeof dataItem === 'number' && isNaN(dataItem)) && dataItem.children ? dataItem.children[p.relIndex] : NaN;
      return dataItem;
    });
    var value = dataParents[dataParents.length - 1]; // convert to value

    if (typeof value !== 'number' && Object.hasOwnProperty.call(value, 'value')) {
      return value.value;
    }

    return value;
  }
  /**
   * counts the number of nodes that are visible when the given node is expanded
   * @param {ILabelNode} node
   */

  function countExpanded(node) {
    if (!node.expand) {
      return 1;
    }

    return node.children.reduce(function (acc, d) {
      return acc + countExpanded(d);
    }, 0);
  }
  function flatChildren(node, flat) {
    if (node.children.length === 0) {
      return [];
    }

    var firstChild = node.children[0];

    if (node.parent >= 0 && node.relIndex < flat[node.parent].children.length - 1) {
      // not the last child and have parent, fast track using sibling
      var _nextSibling = flat[node.parent].children[node.relIndex + 1];
      return flat.slice(firstChild.index, _nextSibling.index);
    } // find sibling or next in the hierarchy up


    var nextSibling = flat.slice(firstChild.index + 1).find(function (d) {
      return d.level < node.level || d.parent === node.parent && d.relIndex === node.relIndex + 1;
    });

    if (nextSibling) {
      return flat.slice(firstChild.index, nextSibling.index);
    } // no sibling found = till end


    return flat.slice(firstChild.index);
  }
  function determineVisible(flat) {
    var focus = flat.find(function (d) {
      return d.expand === 'focus';
    });

    if (focus) {
      return flat.slice(focus.index + 1).filter(function (d) {
        return !d.hidden && parentsOf(d, flat).includes(focus);
      });
    } // the real labels are the one not hidden in the tree


    return flat.filter(function (d) {
      return !d.hidden;
    });
  }
  /**
   *
   * @param {ILabelNode} node
   * @param {ILabelNode[]} flat
   * @param {Set<ILabelNode>} visibles
   */

  function spanLogic(node, flat, visibles) {
    if (node.children.length === 0 || !node.expand) {
      return false;
    }

    var firstChild = node.children[0];
    var lastChild = node.children[node.children.length - 1];
    var flatSubTree = flatChildren(node, flat);
    var leftVisible = flatSubTree.find(function (d) {
      return visibles.has(d);
    });
    var rightVisible = flatSubTree.slice().reverse().find(function (d) {
      return visibles.has(d);
    });

    if (!leftVisible || !rightVisible) {
      return false;
    }

    var leftParents = parentsOf(leftVisible, flat);
    var rightParents = parentsOf(rightVisible, flat); // is the left visible one also a child of my first child = whole starting range is visible?

    var leftFirstVisible = leftParents[node.level + 1] === firstChild; // is the right visible one also my last child = whole end range is visible?

    var rightLastVisible = rightParents[node.level + 1] === lastChild;
    var hasCollapseBox = leftFirstVisible && node.expand !== 'focus';
    var hasFocusBox = leftFirstVisible && rightLastVisible && node.children.length > 1; // the next visible after the left one

    var nextVisible = flat.slice(leftVisible.index + 1, rightVisible.index + 1).find(function (d) {
      return visibles.has(d);
    });
    var groupLabelCenter = !nextVisible ? leftVisible.center : (leftVisible.center + nextVisible.center) / 2;
    return {
      hasCollapseBox: hasCollapseBox,
      hasFocusBox: hasFocusBox,
      leftVisible: leftVisible,
      rightVisible: rightVisible,
      groupLabelCenter: groupLabelCenter,
      leftFirstVisible: leftFirstVisible,
      rightLastVisible: rightLastVisible
    };
  }

  var defaultConfig = Object.assign({}, chart_js.scaleService.getScaleDefaults('category'), {
    /**
     * reduce the space between items at level X by this factor
     */
    levelPercentage: 0.75,

    /**
     * additional attributes to copy, e.g. backgroundColor
     * object where the key is the attribute and the value the default value if not explicity specified in the label tree
     */
    attributes: {},

    /**
     * top/left padding for showing the hierarchy marker
     */
    padding: 25,

    /**
     * position of the hierarchy label
     * possible values: 'below', 'above', null to disable
     */
    hierarchyLabelPosition: 'below',

    /**
     * size of the box to draw
     */
    hierarchyBoxSize: 14,

    /**
     * distance between two hierarhy indicators
     */
    hierarchyBoxLineHeight: 30,

    /**
     * color of the line indicator hierarchy children
     */
    hierarchySpanColor: 'gray',

    /**
     * storke width of the line
     */
    hierarchySpanWidth: 2,

    /**
     * color of the box to toggle collapse/expand
     */
    hierarchyBoxColor: 'gray',

    /**
     * stroke width of the toggle box
     */
    hierarchyBoxWidth: 1
  });
  var HierarchicalScale = chart_js.Scale.extend({
    determineDataLimits: function determineDataLimits() {
      var data = this.chart.data;
      var labels = this.options.labels || (this.isHorizontal() ? data.xLabels : data.yLabels) || data.labels; // labels are already prepared by the plugin just use them as ticks

      this._nodes = labels.slice(); // not really used

      this.minIndex = 0;
      this.maxIndex = this._nodes.length;
      this.min = this._nodes[this.minIndex];
      this.max = this._nodes[this.maxIndex]; // this.options.barThickness = 'flex';
    },
    buildTicks: function buildTicks() {
      var hor = this.isHorizontal();
      var total = hor ? this.width : this.height;

      var nodes = this._nodes.slice(this.minIndex, this.maxIndex);

      var flat = this.chart.data.flatLabels;

      if (nodes.length === 0) {
        this.ticks = [];
        return this.ticks;
      } // optimize such that the distance between two points on the same level is same
      // creaiing a grouping effect of nodes


      var ratio = this.options.levelPercentage; // max 5 levels for now

      var ratios = [1, Math.pow(ratio, 1), Math.pow(ratio, 2), Math.pow(ratio, 3), Math.pow(ratio, 4)];
      var distances = [];
      var prev = nodes[0];
      var prevParents = parentsOf(prev, flat);
      distances.push(0.5); // half top level distance before and after

      for (var i = 1; i < nodes.length; ++i) {
        var n = nodes[i];
        var parents = parentsOf(n, flat);

        if (prev.parent === n.parent) {
          // same parent -> can use the level distance
          distances.push(ratios[n.level]);
        } else {
          // differnt level -> use the distance of the common parent
          // find level of common parent
          var common = 0;

          while (parents[common] === prevParents[common]) {
            common++;
          }

          distances.push(ratios[common]);
        }

        prev = n;
        prevParents = parents;
      }

      distances.push(0.5);
      var distance = distances.reduce(function (acc, s) {
        return acc + s;
      }, 0);
      var factor = total / distance;
      var offset = distances[0] * factor;
      nodes.forEach(function (node, i) {
        var previous = distances[i] * factor;
        var next = distances[i + 1] * factor;
        node.center = offset;
        offset += next;
        node.width = Math.min(next, previous) / 2;
      });
      this.ticks = nodes.map(function (d) {
        return Object.assign({}, d);
      }); // copy since mutated during auto skip

      return this.ticks;
    },
    convertTicksToLabels: function convertTicksToLabels(ticks) {
      return ticks.map(function (d) {
        return d.label;
      });
    },
    getLabelForIndex: function getLabelForIndex(index, datasetIndex) {
      var data = this.chart.data;
      var isHorizontal = this.isHorizontal();

      if (data.yLabels && !isHorizontal) {
        return this.getRightValue(data.datasets[datasetIndex].data[index]);
      }

      return this._nodes[index - this.minIndex].label;
    },
    // Used to get data value locations.  Value can either be an index or a numerical value
    getPixelForValue: function getPixelForValue(value, index) {
      // If value is a data object, then index is the index in the data array,
      // not the index of the scale. We need to change that.
      {
        var valueCategory;

        if (value !== undefined && value !== null) {
          valueCategory = this.isHorizontal() ? value.x : value.y;
        }

        if (valueCategory !== undefined || value !== undefined && isNaN(index)) {
          value = valueCategory || value;

          var idx = this._nodes.findIndex(function (d) {
            return d.label === value;
          });

          index = idx !== -1 ? idx : index;
        }
      }
      return this._centerBase(index);
    },
    getPixelForTick: function getPixelForTick(index) {
      if (index === 1 && this._nodes.length === 1) {
        // cornercase in chartjs to determine tick with, hard coded 1
        return this._nodes[0].width;
      }

      return this._centerBase(index + this.minIndex);
    },
    _centerBase: function _centerBase(index) {
      var centerTick = this.options.offset;
      var base = this.isHorizontal() ? this.left : this.top;
      var node = this._nodes[index];

      if (node == null) {
        return base;
      }

      var nodeCenter = node.center != null ? node.center : 0;
      var nodeWidth = node.width != null ? node.width : 0;
      return base + nodeCenter - (centerTick ? 0 : nodeWidth / 2);
    },
    getValueForPixel: function getValueForPixel(pixel) {
      return this._nodes.findIndex(function (d) {
        return pixel >= d.center - d.width / 2 && pixel <= d.center + d.width / 2;
      });
    },
    getBasePixel: function getBasePixel() {
      return this.bottom;
    }
  });
  chart_js.scaleService.registerScaleType('hierarchical', HierarchicalScale, defaultConfig);

  function parseFontOptions(options) {
    var valueOrDefault = chart_js.helpers.valueOrDefault;
    var globalDefaults = chart_js.defaults.global;
    var size = valueOrDefault(options.fontSize, globalDefaults.defaultFontSize);
    var style = valueOrDefault(options.fontStyle, globalDefaults.defaultFontStyle);
    var family = valueOrDefault(options.fontFamily, globalDefaults.defaultFontFamily);
    return {
      size: size,
      style: style,
      family: family,
      font: chart_js.helpers.fontString(size, style, family)
    };
  }

  function generateCode(labels) {
    // label, expand, children
    var code = '';

    var encode = function encode(label) {
      if (typeof label === 'string') {
        code += label;
        return;
      }

      code += "(l=".concat(label.label, ",e=").concat(label.expand, ",c=[");
      (label.children || []).forEach(encode);
      code += '])';
    };

    labels.forEach(encode);
    return code;
  }

  var HierarchicalPlugin = {
    id: 'hierarchical',
    _isValidScaleType: function _isValidScaleType(chart, scale) {
      var scales = chart.config.options.scales;

      if (!Object.hasOwnProperty.call(scales, scale)) {
        return false;
      }

      if (!Array.isArray(scales[scale])) {
        return false;
      }

      return Object.hasOwnProperty.call(scales[scale][0], 'type');
    },

    /**
     * checks whether this plugin needs to be enabled based on whether one is a hierarchical axis
     */
    _enabled: function _enabled(chart) {
      if (!Object.hasOwnProperty.call(chart.config.options, 'scales')) {
        return null;
      }

      if (this._isValidScaleType(chart, 'xAxes') && chart.config.options.scales.xAxes[0].type === 'hierarchical') {
        return 'x';
      }

      if (this._isValidScaleType(chart, 'yAxes') && chart.config.options.scales.yAxes[0].type === 'hierarchical') {
        return 'y';
      }

      return null;
    },

    /**
     * checks whether the data has been changed by the user and all caches are invalid
     * @param {*} chart
     */
    _check: function _check(chart) {
      if (chart.data.labels && chart.data._verify === generateCode(chart.data.labels)) {
        return;
      } // convert labels to nodes


      var flat = chart.data.flatLabels = toNodes(chart.data.labels);
      chart.data.rootNodes = flat.filter(function (d) {
        return d.parent === -1;
      });
      var labels = chart.data.labels = determineVisible(flat);
      chart.data.labels = labels;

      this._updateVerifyCode(chart); // convert the data tree to the flat visible counterpart


      chart.data.datasets.forEach(function (dataset) {
        if (dataset.tree == null) {
          dataset.tree = dataset.data.slice();
        }

        dataset.data = labels.map(function (l) {
          return resolve(l, flat, dataset.tree);
        });
      });

      this._updateAttributes(chart);
    },

    /**
     * a verify code is used to recognize when the user changes the data
     * @param {*} chart
     */
    _updateVerifyCode: function _updateVerifyCode(chart) {
      chart.data._verify = generateCode(chart.data.labels);
    },

    /**
     * updates the attributes according to config, similar to data sync
     */
    _updateAttributes: function _updateAttributes(chart) {
      var scale = this._findScale(chart);

      if (!scale) {
        return;
      }

      var attributes = scale.options.attributes;
      var nodes = chart.data.labels;
      var flat = chart.data.flatLabels;
      Object.keys(attributes).forEach(function (attr) {
        chart.data.datasets.forEach(function (d) {
          var v = nodes.map(function (n) {
            while (n) {
              if (Object.hasOwnProperty.call(n, attr)) {
                return n[attr];
              } // walk up the hierarchy


              n = n.parent >= 0 ? flat[n.parent] : null;
            }

            return attributes[attr]; // default value
          }); // check if all values are the same, if so replace with a single value

          d[attr] = v.length >= 1 && v.every(function (vi) {
            return vi === v[0];
          }) ? v[0] : v;
        });
      });
    },
    _findScale: function _findScale(chart) {
      var scales = Object.keys(chart.scales).map(function (d) {
        return chart.scales[d];
      });
      return scales.find(function (d) {
        return d.type === 'hierarchical';
      });
    },
    beforeUpdate: function beforeUpdate(chart) {
      if (!this._enabled(chart)) {
        return;
      }

      this._check(chart);
    },

    /**
     * draw the hierarchy indicators
     */
    beforeDatasetsDraw: function beforeDatasetsDraw(chart) {
      if (!this._enabled(chart)) {
        return;
      }

      var scale = this._findScale(chart);

      var flat = chart.data.flatLabels;
      var visible = chart.data.labels;
      var roots = chart.data.rootNodes;
      var visibles = new Set(visible);
      var ctx = chart.ctx;
      var hor = scale.isHorizontal();
      var boxSize = scale.options.hierarchyBoxSize;
      var boxSize05 = boxSize * 0.5;
      var boxSize01 = boxSize * 0.1;
      var boxRow = scale.options.hierarchyBoxLineHeight;
      var boxColor = scale.options.hierarchyBoxColor;
      var boxWidth = scale.options.hierarchyBoxWidth;
      var boxSpanColor = scale.options.hierarchySpanColor;
      var boxSpanWidth = scale.options.hierarchySpanWidth;
      var renderLabel = scale.options.hierarchyLabelPosition;
      var scaleLabel = scale.options.scaleLabel;
      var scaleLabelFontColor = chart_js.helpers.valueOrDefault(scaleLabel.fontColor, chart_js.defaults.global.defaultFontColor);
      var scaleLabelFont = parseFontOptions(scaleLabel);
      ctx.save();
      ctx.strokeStyle = boxColor;
      ctx.lineWidth = boxWidth;
      ctx.fillStyle = scaleLabelFontColor; // render in correct color

      ctx.font = scaleLabelFont.font;

      var renderHorLevel = function renderHorLevel(node) {
        if (node.children.length === 0) {
          return false;
        }

        var offset = node.level * boxRow;

        if (!node.expand) {
          if (visibles.has(node)) {
            // expand button
            ctx.strokeRect(node.center - boxSize05, offset + 0, boxSize, boxSize);
            ctx.fillRect(node.center - boxSize05 + 2, offset + boxSize05 - 1, boxSize - 4, 2);
            ctx.fillRect(node.center - 1, offset + 2, 2, boxSize - 4);
          }

          return false;
        }

        var r = spanLogic(node, flat, visibles);

        if (!r) {
          return false;
        }

        var hasFocusBox = r.hasFocusBox,
            hasCollapseBox = r.hasCollapseBox,
            leftVisible = r.leftVisible,
            rightVisible = r.rightVisible,
            leftFirstVisible = r.leftFirstVisible,
            rightLastVisible = r.rightLastVisible,
            groupLabelCenter = r.groupLabelCenter; // render group label

        if (renderLabel === 'below') {
          ctx.fillText(node.label, groupLabelCenter, offset + boxSize);
        } else if (renderLabel === 'above') {
          ctx.fillText(node.label, groupLabelCenter, offset - boxSize);
        }

        if (hasCollapseBox) {
          // collapse button
          ctx.strokeRect(leftVisible.center - boxSize05, offset + 0, boxSize, boxSize);
          ctx.fillRect(leftVisible.center - boxSize05 + 2, offset + boxSize05 - 1, boxSize - 4, 2);
        }

        if (hasFocusBox) {
          // focus button
          ctx.strokeRect(rightVisible.center - boxSize05, offset + 0, boxSize, boxSize);
          ctx.fillRect(rightVisible.center - 2, offset + boxSize05 - 2, 4, 4);
        }

        if (leftVisible !== rightVisible) {
          // helper span line
          ctx.strokeStyle = boxSpanColor;
          ctx.lineWidth = boxSpanWidth;
          ctx.beginPath();

          if (hasCollapseBox) {
            // stitch to box
            ctx.moveTo(leftVisible.center + boxSize05, offset + boxSize05);
          } else if (leftFirstVisible) {
            // add starting group hint
            ctx.moveTo(leftVisible.center, offset + boxSize01);
            ctx.lineTo(leftVisible.center, offset + boxSize05);
          } else {
            // just a line
            ctx.moveTo(leftVisible.center, offset + boxSize05);
          }

          if (hasFocusBox) {
            ctx.lineTo(rightVisible.center - boxSize05, offset + boxSize05);
          } else if (rightLastVisible) {
            ctx.lineTo(rightVisible.center, offset + boxSize05);
            ctx.lineTo(rightVisible.center, offset + boxSize01);
          } else {
            ctx.lineTo(rightVisible.center, offset + boxSize05);
          }

          ctx.stroke();
          ctx.strokeStyle = boxColor;
          ctx.lineWidth = boxWidth;
        }

        return true;
      };

      var renderVertLevel = function renderVertLevel(node) {
        if (node.children.length === 0) {
          return false;
        }

        var offset = node.level * boxRow * -1;

        if (!node.expand) {
          if (visibles.has(node)) {
            ctx.strokeRect(offset - boxSize, node.center - boxSize05, boxSize, boxSize);
            ctx.fillRect(offset - boxSize + 2, node.center - 1, boxSize - 4, 2);
            ctx.fillRect(offset - boxSize05 - 1, node.center - boxSize05 + 2, 2, boxSize - 4);
          }

          return false;
        }

        var r = spanLogic(node, flat, visibles);

        if (!r) {
          return false;
        }

        var hasFocusBox = r.hasFocusBox,
            hasCollapseBox = r.hasCollapseBox,
            leftVisible = r.leftVisible,
            rightVisible = r.rightVisible,
            leftFirstVisible = r.leftFirstVisible,
            rightLastVisible = r.rightLastVisible,
            groupLabelCenter = r.groupLabelCenter; // render group label

        ctx.fillText(node.label, offset - boxSize, groupLabelCenter);

        if (hasCollapseBox) {
          // collapse button
          ctx.strokeRect(offset - boxSize, leftVisible.center - boxSize05, boxSize, boxSize);
          ctx.fillRect(offset - boxSize + 2, leftVisible.center - 1, boxSize - 4, 2);
        }

        if (hasFocusBox) {
          // focus
          ctx.strokeRect(offset - boxSize, rightVisible.center - boxSize05, boxSize, boxSize);
          ctx.fillRect(offset - boxSize05 - 2, rightVisible.center - 2, 4, 4);
        }

        if (leftVisible !== rightVisible) {
          // helper span line
          ctx.strokeStyle = boxSpanColor;
          ctx.lineWidth = boxSpanWidth;
          ctx.beginPath();

          if (hasCollapseBox) {
            // stitch to box
            ctx.moveTo(offset - boxSize05, leftVisible.center + boxSize05);
          } else if (leftFirstVisible) {
            // add starting group hint
            ctx.moveTo(offset - boxSize01, leftVisible.center);
            ctx.lineTo(offset - boxSize05, leftVisible.center);
          } else {
            // just a line
            ctx.lineTo(offset - boxSize05, leftVisible.center);
          }

          if (hasFocusBox) {
            ctx.lineTo(offset - boxSize05, rightVisible.center - boxSize05);
          } else if (rightLastVisible) {
            ctx.lineTo(offset - boxSize05, rightVisible.center - boxSize05);
            ctx.lineTo(offset - boxSize01, rightVisible.center - boxSize05);
          } else {
            ctx.lineTo(offset - boxSize05, rightVisible.center);
          }

          ctx.stroke();
          ctx.strokeStyle = boxColor;
          ctx.lineWidth = boxWidth;
        }

        return true;
      };

      if (hor) {
        ctx.textAlign = 'center';
        ctx.textBaseline = renderLabel === 'above' ? 'bottom' : 'top';
        ctx.translate(scale.left, scale.top + scale.options.padding);
        roots.forEach(function (n) {
          return preOrderTraversal(n, renderHorLevel);
        });
      } else {
        ctx.textAlign = 'right';
        ctx.textBaseline = 'center';
        ctx.translate(scale.left - scale.options.padding, scale.top);
        roots.forEach(function (n) {
          return preOrderTraversal(n, renderVertLevel);
        });
      }

      ctx.restore();
    },
    _postDataUpdate: function _postDataUpdate(chart) {
      this._updateVerifyCode(chart);

      this._updateAttributes(chart);

      chart.update();
    },
    _expandCollapse: function _expandCollapse(chart, index, count, toAdd) {
      var labels = chart.data.labels;
      var flatLabels = chart.data.flatLabels;
      var data = chart.data.datasets; // use splice since Chart.js is tracking the array using this method to have a proper animation

      var removed = labels.splice.apply(labels, [index, count].concat(toAdd));
      removed.forEach(function (d) {
        d.hidden = true;
      });
      toAdd.forEach(function (d) {
        d.hidden = false;
      }); // update since line doesn't call it by itself

      this._findScale(chart).determineDataLimits();

      data.forEach(function (dataset) {
        var toAddData = toAdd.map(function (d) {
          return resolve(d, flatLabels, dataset.tree);
        });
        dataset.data.splice.apply(dataset.data, [index, count].concat(toAddData));
      });
    },
    _collapse: function _collapse(chart, index, parent) {
      var count = countExpanded(parent); // collapse sub structures, too

      parent.children.forEach(function (c) {
        return preOrderTraversal(c, function (d) {
          d.expand = false;
        });
      });

      this._expandCollapse(chart, index, count, [parent]);

      parent.expand = false;

      this._postDataUpdate(chart);
    },
    _expand: function _expand(chart, index, node) {
      this._expandCollapse(chart, index, 1, node.children);

      node.expand = true;

      this._postDataUpdate(chart);
    },
    _zoomIn: function _zoomIn(chart, lastIndex, parent, flat) {
      var count = countExpanded(parent); // reset others

      flat.forEach(function (d) {
        if (d.expand === 'focus') {
          d.expand = true;
        }
      });
      parent.expand = 'focus';
      var index = lastIndex - count + 1;
      var labels = chart.data.labels;
      labels.splice(lastIndex + 1, labels.length);
      labels.splice(0, index); // update since line doesn't call it by itself

      this._findScale(chart).determineDataLimits();

      var data = chart.data.datasets;
      data.forEach(function (dataset) {
        dataset.data.splice(lastIndex + 1, dataset.data.length);
        dataset.data.splice(0, index);
      });

      this._postDataUpdate(chart);
    },
    _zoomOut: function _zoomOut(chart, parent) {
      var labels = chart.data.labels;
      var flatLabels = chart.data.flatLabels;
      parent.expand = true;
      var nextLabels = flatLabels.filter(function (d) {
        return !d.hidden;
      });
      var index = nextLabels.indexOf(labels[0]);
      var count = labels.length;
      labels.splice.apply(labels, [labels.length, 0].concat(nextLabels.slice(index + count)));
      labels.splice.apply(labels, [0, 0].concat(nextLabels.slice(0, index))); // update since line doesn't call it by itself

      this._findScale(chart).determineDataLimits();

      var data = chart.data.datasets;
      data.forEach(function (dataset) {
        var toAddBefore = nextLabels.slice(0, index).map(function (d) {
          return resolve(d, flatLabels, dataset.tree);
        });
        var toAddAfter = nextLabels.slice(index + count).map(function (d) {
          return resolve(d, flatLabels, dataset.tree);
        });
        dataset.data.splice.apply(dataset.data, [dataset.data.length, 0].concat(toAddAfter));
        dataset.data.splice.apply(dataset.data, [0, 0].concat(toAddBefore));
      });

      this._postDataUpdate(chart);
    },
    _resolveElement: function _resolveElement(event, chart, scale) {
      var hor = scale.isHorizontal();
      var offset = hor ? scale.top + scale.options.padding : scale.left - scale.options.padding;

      if (hor && event.y <= offset || !hor && event.x > offset) {
        return null;
      }

      var elem = chart.getElementsAtEventForMode(event, 'index', {
        axis: hor ? 'x' : 'y'
      })[0];

      if (!elem) {
        return null;
      }

      return {
        offset: offset,
        index: elem._index
      };
    },
    _handleClickEvents: function _handleClickEvents(chart, event, elem, offsetDelta, inRange) {
      var offset = elem.offset;
      var index = elem.index;
      var flat = chart.data.flatLabels;
      var label = chart.data.labels[index];
      var parents = parentsOf(label, flat);

      for (var i = 1; i < parents.length; ++i, offset += offsetDelta) {
        if (!inRange(offset)) {
          continue;
        }

        var node = parents[i];
        var isParentOfFirstChild = node.children[0] === parents[i + 1] || i === parents.length - 1;
        var parent = flat[node.parent]; // first child of expanded parent

        if (isParentOfFirstChild && node.relIndex === 0 && parent.expand === true) {
          this._collapse(chart, index, parent);

          return;
        }

        var isLastChildOfParent = lastOfLevel(node, flat) === label; // leaf = current node
        // last index of focussed parent

        if (isLastChildOfParent && parent.expand === 'focus') {
          this._zoomOut(chart, parent);

          return;
        } // last index of expanded parent


        if (isLastChildOfParent && parent.expand === true && flatChildren(parent, flat).every(function (d) {
          return d.expand !== 'focus';
        })) {
          this._zoomIn(chart, index, parent, flat);

          return;
        }
      }

      if (label.children.length > 0 && inRange(offset)) {
        // expand
        this._expand(chart, index, label);

        return;
      }
    },
    beforeEvent: function beforeEvent(chart, event) {
      if (event.type !== 'click' || !this._enabled(chart)) {
        return;
      }

      var scale = this._findScale(chart);

      var hor = scale.isHorizontal();

      var elem = this._resolveElement(event, chart, scale);

      if (!elem) {
        return;
      }

      var boxRow = scale.options.hierarchyBoxLineHeight;
      var inRange = hor ? function (o) {
        return event.y >= o && event.y <= o + boxRow;
      } : function (o) {
        return event.x <= o && event.x >= o - boxRow;
      };
      var offsetDelta = hor ? boxRow : -boxRow;

      this._handleClickEvents(chart, event, elem, offsetDelta, inRange);
    }
  };
  chart_js.pluginService.register(HierarchicalPlugin);

  exports.HierarchialPlugin = HierarchicalPlugin;
  exports.HierarchialScale = HierarchicalScale;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
