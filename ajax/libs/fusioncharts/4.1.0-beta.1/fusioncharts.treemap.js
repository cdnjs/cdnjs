
(function (factory) {
  if (typeof module === 'object' && typeof module.exports !== "undefined") {
      module.exports = factory;
  } else {
      factory();
  }
}(function () {
"use strict";
(self["webpackChunkFusionCharts"] = self["webpackChunkFusionCharts"] || []).push([[12],{

/***/ 1608:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _lib = __webpack_require__(274);

var _schedular = __webpack_require__(286);

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }] */
var UNDEF,
    DRILLUP = 'drillup',
    HIDDEN_STR = 'hidden',
    VISIBLE_STR = 'visible',
    NONE = 'none',
    CLICK_STR = 'click',
    CLICKEDSTATE = 'ClickedState',
    VISIBLEROOT = 'VisibileRoot',
    DATAPLOTCLICK = 'dataplotclick',
    DATAPLOTROLLOVER = 'dataplotrollover',
    DATAPLOTROLLOUT = 'dataplotrollout',
    HOVER = 'hover',
    DRILLDOWN = 'drilldown',
    BOTH = 'both',
    LEFT = 'left',
    NO = 'no',
    RIGHT = 'right',
    STACKED_STR = 'stacked',
    id = 1,
    afAPICreator = function afAPICreator(afAPI, containerManager) {
  var iterator, maxDepth, visibleRoot, visibilityController, context;
  /**
    * AbstractTreeMaker is kind of an abstract class that converts fusioncharts configuration to tree.
    * This can directly be used and initialized  if no ordering is required. If any particular ordering
    * is needed, it is the subclass needs to implement order function.
    */

  var AbstractTreeMaker = /*#__PURE__*/function () {
    /**
     * constructor
     * @param {Object}   node                 root node of the configuration. This would be root of the returned tree as well
     * @param {boolean}  bucketIterationMode  whether bucket is needed or not
     * @param {Function} cleansingFn          cleansing fn
     */
    function AbstractTreeMaker(node, bucketIterationMode, cleansingFn) {
      this.node = node;
      this.bucket = bucketIterationMode ? new Bucket() : UNDEF;
      this.cleansingFn = cleansingFn;
    }
    /**
      * Create the tree from configuration.
      * @return {TreeNode} - newly created tree
      */


    var _proto = AbstractTreeMaker.prototype;

    _proto.get = function get() {
      var orderFn = this.order,
          bucket = this.bucket,
          cleansingFn = this.cleansingFn;
      /**
        * Recursively prepare the tree from the configuration.
        * @param {number}   level    - The depth of the current root element.
        * @param {TreeNode} root     - The current base root in the full tree trversal.
        */

      return function rec(root, level) {
        var pNewNode,
            index,
            children,
            childNode,
            newNode,
            notMetaKeys = ['label', 'value', 'data', 'svalue'],
            // eslint-disable-line good-practices/no-single-usage-variable
        key;

        if (root) {
          // If root node is present add in the existing tree.
          // This also acts as a break condition of recursion.
          pNewNode = new TreeNode((0, _lib.parseUnsafeString)(root.label), cleansingFn(root.value), cleansingFn(root.svalue));
          children = root.data || [];

          if (children.length === 0 && bucket) {
            bucket.addInBucket(pNewNode);
          } // sets the depth information in the 'meta' object for the Tree node element.


          pNewNode.setDepth(level); // Support for set label attributes. All the set label attributes are stored in meta object.

          for (key in root) {
            // label, value and data is non-meta attribute
            if (notMetaKeys.indexOf(key) !== -1) {
              continue;
            }

            pNewNode.setMeta(key, root[key]);
          }
        }

        if (orderFn) {
          // For ordered treemaps. If the subclass give implementation of orderFn
          children = orderFn(children);
        }

        for (index = 0; index < children.length; index++) {
          childNode = children[index]; // Recursively iterate to complete the tree along with the incremental level information.

          newNode = rec(childNode, level + 1);
          pNewNode.addChild(newNode);
        }

        return pNewNode;
      }(this.node, 0); // The depth for the initial global node remains '0'.
    }
    /**
      * Get the  bucket formation created by ordering and grouping the leaf nodes. This can be accessed if the
      * legend is enabled.
      * @return {Bucket} - The bucket of leaf nodes
      */
    ;

    _proto.getBucket = function getBucket() {
      return this.bucket;
    }
    /**
     * return maximum level of tree
     * @return {number} maximum level of tree
     */
    ;

    AbstractTreeMaker.getMaxDepth = function getMaxDepth() {
      return maxDepth;
    };

    return AbstractTreeMaker;
  }();
  /**
   * set maximum level of tree
   * @param {number} value maximum level of tree
   * @return {number} maximum level of tree
   */


  function setMaxDepth(value) {
    return maxDepth = value;
  }
  /**
    * Iterates through the tree. This provides two basic traversal of tree. This iteration happens on-demand.
    * Hence faster.
    * 1. Breath-first
    * 2. depth-first
    * @param  {TreeNode} rootNode       - Root node from where the traversal to be started
    * @param  {Object}   controlOptions -
    * @return {Object}                  - Object containg standard API for breadth-first-traversal  and depth-first-traversal
    */


  iterator = function iterator(rootNode, controlOptions) {
    var it = {},
        exception = controlOptions && controlOptions.exception,
        df,
        bf;
    /**
      * Provides control to implement iterator in case the user wants have more than one iterator
      * without waiting for the one to get exhausted.
      */

    var Iterable = /*#__PURE__*/function () {
      /**
       * constructor
       * @param {Object}  iterAPI - Iteration APIs [bf or df]
       */
      function Iterable(iterAPI) {
        this.iterAPI = iterAPI;
      }
      /**
       * Initialize all the traversing algorithm.
       * @param {TreeNode}  rootNode - node from where iteration will initiated
       * @return {Object}          - new DF or BF algorithm
       */


      var _proto2 = Iterable.prototype;

      _proto2.initWith = function initWith(rootNode) {
        // eslint-disable-line
        return this.iterAPI(rootNode);
      };

      return Iterable;
    }();
    /*
      * Depth first (df) iteration API.
      * This exposes two functions
      * next() - gives the next df node. If all nodes are iterated, the pointer is exhausted,
      * it returns undefined
      * reset() - reset the whole system to the initial state
      * Here the iteration happens without saving the states separately. It is on demand. Means,
      * the moment next is called, the callee node and immediate the children are only allocated.
      *
      * If there is a tree like this
      * A -|
      *    |--- B --|
      *    |        | --- B1
      *    |        | --- B2
      *    |
      *    |--- C --|
      *    |        | --- C1
      *    |        | --- C2
      *    |        | --- C3
      *    |
      *    |--- D
      *
      * It creates array like the following
      * init -  | A |
      * next() - | B | C | D | and returns A
      * next() - | B1 | B2 | C | D | and returns B (because B has children we place the children in front)
      * next() - | B2 | C | D | and returns B1 (because B1 doesn't have children, we just returns it)
      * reset() - | A |
      */


    it.df = function (node) {
      var nextNode = node,
          dfArr = [],
          next,
          reset,
          isExhausted = false; // eslint-disable-line good-practices/no-single-usage-variable
      // initial stage, start with the root node

      dfArr.push(nextNode);
      /*
        * Apply depth first and returns the next node
        * @param maxDepth{Number | undefined} - If there is a hardcoded maxDepth specified, beyond that depth
          of the tree,its children information is not fetched.
        * @return {TreeNode | undefined} - if the complete tree is iterated returns undefined
        */

      next = function next(maxDepth) {
        // eslint-disable-line
        var children, fNode, len;

        if (isExhausted) {
          // tree iteration complete, return undefined
          return;
        } // returns the front node of the array


        fNode = dfArr.shift();

        if (exception && fNode === exception) {
          fNode = dfArr.shift();

          if (!fNode) {
            isExhausted = true;
            return;
          }
        } // If maxdepth is defined, no children information is fetched for the node.


        children = maxDepth !== UNDEF ? fNode.getDepth() >= maxDepth ? [] : fNode.getChildren() : fNode.getChildren();
        len = children && children.length || 0; // eslint-disable-line good-practices/no-single-usage-variable

        if (len) {
          // place the children at the front of the array
          [].unshift.apply(dfArr, children);
        }

        if (dfArr.length === 0) {
          // Sets the exhaustion flag if the array is empty so that during the next iteration
          // the iterator returns undefined
          isExhausted = true;
        }

        return fNode;
      };
      /*
        * Reset the state of the iterator. Every iterator instance needs to reset its state
        * once it is done traversing. The caller will be responsible for this call.
        */


      reset = function reset() {
        // Go back to initial state
        isExhausted = false;
        nextNode = node; // eslint-disable-line good-practices/no-single-usage-variable

        dfArr.length = 0;
        dfArr.push(nextNode);
      };

      return {
        next: next,
        reset: reset
      };
    };
    /*
      * Breadth first (bf) iteration API.
      * This exposes two functions
      * next() - gives the next df node. If all nodes are iterated, the pointer is exhausted,
      * it returns undefined
      * reset() - reset the whole system to the initial state
      * Here the iteration happens without saving the states separately. It is on demand. Means,
      * the moment next is called, the callee node and immediate the children are only allocated.
      *
      * If there is a tree like this
      * A -|
      *    |--- B --|
      *    |        | --- B1
      *    |        | --- B2
      *    |
      *    |--- C --|
      *    |        | --- C1
      *    |        | --- C2
      *    |        | --- C3
      *    |
      *    | --- D
      *
      * It creates array like the following
      * init -  | A |
      * next() - | B | C | D | and returns A
      * next() - | C | D | B1 | B2 | and returns B (because B has children we place the children in last)
      * next() - | D | B1 | B2 | C1 | C2 | C3 | and returns C (because C has children
      * we place the children in last)
      * next() - | B1 | B2 | C1 | C2 | C3 | and returns D (because D doesn't have children, we just returns it)
      * next() - | B2 | C1 | C2 | C3 | and returns B1 (because B1 doesn't have children, we just returns it)
      * next() - | C1 | C2 | C3 | and returns B2 (because B2 doesn't have children, we just returns it)
      * next() - | C2 | C3 | and returns C1 (because C1 doesn't have children, we just returns it)
      * next() - | C3 | and returns C2 (because C2 doesn't have children, we just returns it)
      * next() - | | and returns C3 (because C3 doesn't have children, we just returns it)
      * reset() - | A |
      */
    // eslint-disable-next-line good-practices/no-function-dependency


    it.bf = function (node) {
      var nextNode = node,
          bfArr = [],
          next,
          nextBatch,
          reset,
          bfBatchArray = [],
          isExhausted = false; // initial stage, start with the root node

      bfArr.push(nextNode);
      bfBatchArray.push(nextNode);
      /*
        * Apply breadth first and returns the next node
        * @return {TreeNode | undefined} - if the complete tree is iterated returns undefined
        */

      next = function next() {
        var children, fNode, len;

        if (isExhausted) {
          return;
        }

        fNode = bfArr.shift();
        children = fNode.getChildren();
        len = children && children.length || 0; // eslint-disable-line good-practices/no-single-usage-variable

        if (len) {
          // Stores all the node of the same level
          [].push.apply(bfArr, children);
        }

        if (bfArr.length === 0) {
          isExhausted = true;
        }

        return fNode;
      };
      /*
        * Custom function to return all the nodes of level by level
        * @return {Array.<TreeNode>} - if the complete tree is iterated returns undefined
        */


      nextBatch = function nextBatch() {
        var children, fNode, len;

        if (isExhausted) {
          return;
        }

        fNode = bfBatchArray.shift(); // eslint-disable-line good-practices/no-single-usage-variable

        children = fNode.getChildren();
        len = children && children.length || 0; // eslint-disable-line good-practices/no-single-usage-variable

        if (len) {
          [].push.apply(bfBatchArray, children);
        }

        if (bfArr.length === 0) {
          isExhausted = true;
        }

        return children;
      };
      /*
        * Reset the state of the iterator. Every iterator instance needs to reset its state
        * once it is done traversing. The caller will be responsible for this call.
        */


      reset = function reset() {
        isExhausted = false;
        nextNode = node; // eslint-disable-line good-practices/no-single-usage-variable

        bfArr.length = 0;
        bfArr.push(nextNode);
      };

      return {
        next: next,
        nextBatch: nextBatch,
        reset: reset
      };
    }; // Everytime iterator is called, this creates new depth first algorithm API


    df = new Iterable(it.df).initWith(rootNode); // eslint-disable-line good-practices/no-single-usage-variable

    bf = new Iterable(it.bf).initWith(rootNode); // eslint-disable-line good-practices/no-single-usage-variable

    return {
      df: df,
      bf: bf
    };
  };
  /**
    * Initialization operation to be performed before measuring space for label display.
    * This takes one time information that is applied over all the text emasurement operation.
    * @param  {Object} padding      - provides x and y padding of the label.
    * @param  {number} lineHeightVal   - line height of text
    * @param  {Object} attrs        - attributes
    * @return {Function}            - a function that calculates and return the configuration to draw the text
    */


  function initConfigurationForlabel(padding, lineHeightVal, attrs) {
    var lineHeight = lineHeightVal,
        padX = padding.x,
        // eslint-disable-line good-practices/no-single-usage-variable
    padY = padding.y,
        // eslint-disable-line good-practices/no-single-usage-variable
    halfLineHeight = lineHeight / 2,
        // eslint-disable-line good-practices/no-single-usage-variable
    titleHideFlag = attrs.showParent ? 0 : 1,
        // eslint-disable-line good-practices/no-single-usage-variable
    showChildLabels = attrs.showChildLabels; // eslint-disable-line good-practices/no-single-usage-variable

    /**
      * Calculate the measurement of text.
      * @param  {TreeNode} node        - node for which the label to be plotted
      * @param  {Object}   rect        - bounding rectangle of node.
      * @param  {boolean}  forcedLabel -
      * @return {Object}               - the configuration object to draw the text and additional attribute primarily where
      *                                  the visibility is maintained
      */

    return function (node, rect, forcedLabel) {
      var // label,
      isLeaf = false,
          textCalConf = {
        x: UNDEF,
        y: UNDEF,
        width: UNDEF,
        height: UNDEF
      },
          conf = {},
          rectShiftY = 0,
          // eslint-disable-line good-practices/no-single-usage-variable
      textAttr = {},
          // eslint-disable-line good-practices/no-single-usage-variable
      highlightAttr = {},
          visibility,
          availableHeight,
          meta;
      meta = node.meta;

      if (!node) {
        return;
      }

      if (!node.isLeaf(maxDepth)) {
        // Detect the child nodes and set a flag
        isLeaf = true;
      }

      conf.label = node.getLabel();
      textCalConf.width = rect.width - 2 * padX; // Places it horizontally in the middle

      textCalConf.x = rect.x + rect.width / 2;
      availableHeight = rect.height - 2 * padY; // eslint-disable-line good-practices/no-single-usage-variable

      if (!isLeaf && availableHeight < lineHeight) {
        textCalConf.height = -1;
      }

      if (!forcedLabel && isLeaf) {
        // If it is a leaf node the label will be placed in the middle, horizontally and vertically
        textCalConf.height = showChildLabels ? textCalConf.height ? textCalConf.height : rect.height - 2 * padY : -1;
        textCalConf.y = rect.y + rect.height / 2;
      } else {
        // If it is not leaf node the label will be placed at the top considering the padding and the
        // children area will shrink
        if (!titleHideFlag) {
          // Places the label of the parent
          textCalConf.height = textCalConf.height ? textCalConf.height : lineHeight;
          textCalConf.y = rect.y + padY + halfLineHeight;
        } else {
          // Hides the label of parent.
          textCalConf.y = -1;
          padY = 0;
          lineHeight = 0;
          visibility = HIDDEN_STR;
        }
      } // Calculation of shift which will be applied to move the starting point of chidren


      rectShiftY += 2 * padY; // eslint-disable-line good-practices/no-single-usage-variable

      rectShiftY += lineHeight; // eslint-disable-line good-practices/no-single-usage-variable

      conf.rectShiftY = rectShiftY;
      conf.textRect = textCalConf;

      if (attrs.labelGlow) {
        highlightAttr['stroke-width'] = attrs.labelGlowRadius;
        highlightAttr.opacity = attrs.labelGlowIntensity;
        highlightAttr.stroke = attrs.labelGlowColor;
        highlightAttr.visibility = visibility === 'hidden' ? 'hidden' : 'visible';
      } else {
        highlightAttr.visibility = HIDDEN_STR;
      } // CSS for node labels


      textAttr = {
        // eslint-disable-line good-practices/no-single-usage-variable
        fontSize: attrs.labelFontSize || attrs.baseFontSize,
        fontFamily: attrs.labelFont || attrs.baseFont,
        fill: (0, _lib.convertColor)(meta && meta.fontcolor && normalizeColorCode(meta.fontcolor) || attrs.labelFontColor || attrs.baseFontColor),
        fontWeight: attrs.labelFontBold && 'bold',
        fontStyle: attrs.labelFontItalic && 'italic',
        visibility: visibility
      };
      return {
        conf: conf,
        attr: textAttr,
        highlight: highlightAttr
      };
    };
  }
  /**
   * This function tells that node is within the current range of gradient legend
   * @param {Object} dsConf - contains reference to dataset configuration
   * @param {number} nodeColorValue - contains the svalue of the node
   * @return {boolean} true/false
  */


  function isInRange(dsConf, nodeColorValue) {
    // eslint-disable-line good-practices/no-function-dependency
    var range = dsConf.range;

    if (!range) {
      return true;
    } else if (range.min <= nodeColorValue && nodeColorValue <= range.max) {
      return true;
    }

    return false;
  }
  /**
    * Manages color of all the nodes. This colors the leaf node taking configuration from the xml/json
    * by using ColorRangeManager.
    * For non-leaf (title) nodes it provides color if user has provided one in defaultParentBGColor attribute.
    * The title nodes are not colored from the ColorRangeManager.
    * This takes the initial parameters and initialize the state and hold it until it is called again
    * @param  {Object}            attrs            - All the chart attributes sanitized
    * @param  {ColorRangeManager} colorRange       - instance of ColorRangeManager that has all the information about the
    *                                               color distribution. This function merely calls the APIs
    * @param  {boolean}           isNavigationBar  - whether it is for navigation bar or not
    * @return {Function}                           - Returns a function that returns a color code when a node
    *                                                is passed keeping in the state intact.
    */


  function mapColorManager(attrs, colorRange, isNavigationBar) {
    // eslint-disable-next-line good-practices/no-single-usage-variable
    var defaultParentBGColor = normalizeColorCode(isNavigationBar ? attrs.defaultNavigationBarBGColor : attrs.defaultParentBGColor);
    /**
      * Uses the saved state and returns the color for a node calculating the node value.
      * @param  {TreeNode} node             - node which is subjected to be colored
      * @param  {boolean}  isNavigationBar  - whether it is for navigation bar or not
      * @param  {object}  dsConf  - reference to dataset configuration
      * @return {string}                    - color in hex
      */

    return function (node, isNavigationBar, dsConf) {
      // eslint-disable-line
      var colorProp = {},
          cssConf = node.cssConf,
          meta = node.meta,
          overriddenColor = meta.fillcolor ? normalizeColorCode(meta.fillcolor) : UNDEF,
          parentColor,
          parentStyle,
          parentNode = node.getParent(),
          // eslint-disable-line good-practices/no-single-usage-variable
      thisNodeColor,
          nodeColorValue = node.getColorValue(); // temp CODE

      attrs.isLegendEnabled = true;

      if (attrs.isLegendEnabled && (nodeColorValue === 0 || nodeColorValue)) {
        if (colorRange && colorRange.getColorByValue(nodeColorValue)) {
          if (isInRange(dsConf, nodeColorValue)) {
            node.presentColor = '#' + colorRange.getColorByValue(nodeColorValue);
          } else {
            node.presentColor = normalizeColorCode(dsConf.rangeOutBgColor);
          }
        } else {
          node.presentColor = normalizeColorCode(colorRange && colorRange.rangeOutsideColor);
        }
      } else {
        node.presentColor = UNDEF;
      }

      if (overriddenColor) {
        node.presentColor = overriddenColor;
      } // Get the generalized color for a node. Later overriden for non-leaf nodes


      thisNodeColor = attrs.isLegendEnabled && (nodeColorValue === 0 || nodeColorValue) ? colorRange && colorRange.getColorByValue(nodeColorValue) && '#' + colorRange.getColorByValue(nodeColorValue) || normalizeColorCode(colorRange && colorRange.rangeOutsideColor) : UNDEF; // Check if the current node in context is a leaf node which in turn is dependent if there is a depth
      // restriction imposed.

      if (node.isLeaf(maxDepth)) {
        // If the node is not leaf node apply title colors property if available
        colorProp.fill = overriddenColor || thisNodeColor || defaultParentBGColor;
      } else {
        parentStyle = (parentNode || node).cssConf;
        parentColor = parentStyle && parentStyle.fill;
        thisNodeColor = thisNodeColor || parentColor;
        colorProp.fill = overriddenColor || thisNodeColor;
      } // apply node border thickness and color


      colorProp.stroke = isNavigationBar ? attrs.navigationBarBorderColor : attrs.plotBorderColor;
      colorProp.strokeWidth = isNavigationBar ? attrs.navigationBarBorderThickness : attrs.plotBorderThickness;
      colorProp['stroke-dasharray'] = NONE; // applicable for only the treemap.

      if (!isNavigationBar) {
        if (cssConf && cssConf['stroke-dasharray'] === '--') {
          colorProp['stroke-dasharray'] = cssConf['stroke-dasharray'];
          colorProp.strokeWidth = cssConf.strokeWidth;
        }
      }

      return colorProp;
    };
  }
  /*
       * Serves the purpose of application context. Any Object can be stored and retrieved through the lifetime
       * of the chart instance. This gives back a singleton instance per id. Like if two different store is needed,
       * this is called with two different id. If the ids are kept same same instance is returned.
       */
  // eslint-disable-next-line good-practices/no-function-dependency


  context = function () {
    var objContainer = {},
        pointer;
    /**
     * Constructor to create instance per id
     */

    function C_() {
      // eslint-disable-line good-practices/no-function-dependency
      // Container of instances of particular id
      this.con = {};
    }

    C_.prototype.constructor = C_;

    C_.prototype.get = function (key) {
      // eslint-disable-line good-practices/no-function-dependency
      return this.con[key];
    };

    C_.prototype.set = function (key, value) {
      // eslint-disable-line good-practices/no-function-dependency
      this.con[key] = value;
    };

    C_.prototype['delete'] = function (key) {
      // eslint-disable-line good-practices/no-function-dependency
      return delete this.con[key];
    };

    return {
      /**
        * Returns singleton instances per id
        * @param  {string} id - name of id
        * @return {Object}    - returns object if already instantiated or create one and return
        */
      getInstance: function getInstance(id) {
        // eslint-disable-line
        var _con;

        if (objContainer[id]) {
          _con = objContainer[id]; // Already instantiated, get the reference and return

          pointer = _con;
          return pointer;
        } // Not available in container means not instantiated, creates a new instance and returns


        pointer = _con = objContainer[id] = new C_(); // eslint-disable-line good-practices/no-single-usage-variable

        return pointer;
      }
    };
  }();
  /**
    * Sets the visible root node.
    * @param {TreeNode} node - On drill down/ up the visible root needs to be changed.
    */


  function setVisibleRoot(node) {
    visibleRoot = node;
  }
  /**
    * Fetch the visible root.
    * @return {TreeRoot} - The visible root for the current view.
    */


  function getVisibleRoot() {
    return visibleRoot;
  }
  /**
    * It registers the different events and the functionality
    * @param {algorithmFactory} algorithmAPI  - all the apis for the running algorithm
    * @param {Object} dsStore - dataset instance
    * @param {Object} canvasMeasurement  - Simple key-value pair of information
    *                                      of the available drawing area.
    * @param {Object} rendererAPI  - API needed to render the objects in the drawing area.
    * @return {Object}             - contains event callback fn
    */


  function abstractEventRegisterer(algorithmAPI, dsStore, canvasMeasurement, rendererAPI) {
    var chart = dsStore.getFromEnv('chart'),
        btns = dsStore.getFromEnv('toolbarBtns'),
        attrs = dsStore.conf,
        // legend = dsStore.getFromEnv('gLegend'),
    drawTreeFn = algorithmAPI.drawTree,
        removeFn = rendererAPI.disposeChild,
        _backToParent,
        context = afAPI.context,
        // eslint-disable-line
    args = arguments,
        stateContextId = CLICKEDSTATE,
        visibleState = VISIBLEROOT,
        plotClickEvt = DATAPLOTCLICK,
        // eslint-disable-line good-practices/no-single-usage-variable
    plotRollOverEvt = DATAPLOTROLLOVER,
        plotRollOutEvt = DATAPLOTROLLOUT,
        stateContext,
        _resetTree,
        dataUprootMap = {
      colorValue: 'svalue',
      label: 'name',
      value: 'value',
      rect: 'metrics'
    };

    stateContext = context.getInstance(stateContextId); // Save reference of internal subroutines, for later use

    chart._intSR = {};
    /**
     * function to extract event data
     * @param {Object} node - tree node
     * @return {Object}     - event data
     */

    function extractEventData(node) {
      var res = {},
          key,
          resKey;

      for (key in dataUprootMap) {
        resKey = dataUprootMap[key];
        res[resKey] = node[key];
      }

      res.fillColor = node.meta.fillcolor || node.cssConf.fill;
      res.fontColor = node.meta.fontcolor || node.cssConf.stroke;
      return res;
    }
    /**
      * Goes back to immediate parent of the view.
      * @param {boolean} raiseEventFlag - If true event will be raised. Otherwise no.
      *
      */


    chart._intSR.backToParent = _backToParent = function backToParent(raiseEventFlag) {
      var target = this,
          _t = target,
          _p = _t && target.getParent(),
          context = afAPI.context,
          // eslint-disable-line
      stateContextId = CLICKEDSTATE,
          // eslint-disable-line
      visibleState = VISIBLEROOT,
          // eslint-disable-line
      stateContext = context.getInstance(stateContextId),
          // eslint-disable-line
      clickedState = stateContext.get(visibleState) || {};

      chart.config.trackerConfig.length = 0;
      chart.triggerKDTreePartioning();

      if (raiseEventFlag) {
        /** @todo eventname should be taken from constants */

        /** @todo common event handling API */
        chart.fireChartInstanceEvent('beforedrillup', {
          node: target,
          withoutHead: !attrs.showParent
        }, UNDEF, function () {
          // If the event is not prevented in anyway
          if (_p) {
            clickedState.state = DRILLUP;
            clickedState.node = [{
              virginNode: afAPI.getVisibleRoot()
            }, _p]; // Remove all the elements from the paper and redraw the tree
            // using a different root node.

            removeFn(_t);
            drawTreeFn.apply(_p, args);
          } // Render complete now raise the event

          /** @todo eventname should be taken from constants */


          chart.fireChartInstanceEvent(DRILLUP, {
            node: target,
            withoutHead: !attrs.showParent,
            drillUp: _backToParent,
            drillUpToTop: _resetTree
          });
          target = target && target.getParent();
        }, function () {
          // Event is prevented
          chart.fireChartInstanceEvent('drillupcancelled', {
            node: target,
            withoutHead: !attrs.showParent
          });
        });
      } else {
        if (_p) {
          clickedState.state = DRILLUP;
          clickedState.node = [{
            virginNode: afAPI.getVisibleRoot()
          }, _p]; // Remove all the elements from the paper and redraw the tree
          // using a different root node.

          removeFn(_t);
          drawTreeFn.apply(_p, [algorithmAPI, dsStore, canvasMeasurement, rendererAPI]);
        }

        target = target && target.getParent();
      }
    };
    /**
      * Goes back to absolute parent of the view.
      * @param {boolean} raiseEventFlag - If true event will be raised. Otherwise no.
      *
      * @todo donot pollute the chart object. Function access restructuring.
      */


    chart._intSR.resetTree = _resetTree = function resetTree(raiseEventFlag) {
      var target = this,
          _p = target && target.getParent(),
          _t,
          context = afAPI.context,
          // eslint-disable-line
      stateContextId = CLICKEDSTATE,
          // eslint-disable-line
      visibleState = VISIBLEROOT,
          // eslint-disable-line
      stateContext = context.getInstance(stateContextId),
          // eslint-disable-line
      clickedState = stateContext.get(visibleState) || {};

      chart.config.trackerConfig.length = 0;
      chart.triggerKDTreePartioning();

      while (_p) {
        // Swaps the references. Keep clicked node in one variable and parent in
        // another variable.
        _t = _p;
        _p = _p.getParent();
      }

      if (raiseEventFlag) {
        // @todo eventname should be taken from constants
        chart.fireChartInstanceEvent('beforedrillup', {
          node: target,
          withoutHead: !attrs.showParent
        }, UNDEF, function () {
          if (_t) {
            clickedState.state = DRILLUP;
            clickedState.node = [{
              virginNode: afAPI.getVisibleRoot()
            }, _t]; // Remove all the elements from the paper and redraw the tree using
            // a different root node.

            removeFn(_t);
            drawTreeFn.apply(_t, args);
            /* @todo eventname should be taken from constants */

            chart.fireChartInstanceEvent(DRILLUP, {
              node: target,
              sender: chart.fusionCharts,
              withoutHead: !attrs.showParent,
              drillUp: _backToParent,
              drillUpToTop: _resetTree
            });
          }
        }, function () {
          chart.fireChartInstanceEvent('drillupcancelled', {
            node: target,
            withoutHead: !attrs.showParent
          });
        });
      } else {
        if (_t) {
          clickedState.state = DRILLUP;
          clickedState.node = [{
            virginNode: afAPI.getVisibleRoot()
          }, _t]; // Remove all the elements from the paper and redraw the tree using a different
          // root node.

          removeFn(_t);
          drawTreeFn.apply(_t, args);
        }
      }
    };

    return {
      click: function click(node, baseNode) {
        var thisVNode = node.virginNode,
            eventName,
            parent,
            animationManager = chart.getFromEnv('animationManager'),
            target;
        chart.state = CLICK_STR;
        chart.fireChartInstanceEvent(plotClickEvt, extractEventData(node.virginNode));
        parent = thisVNode.getParent();

        if (!parent) {
          // If the click is on root node, return since it is not possible to go back and
          // display the parent
          return;
        }

        if (thisVNode === baseNode) {
          // If the top most rectangle is clicked show the parent rectangle of it. This
          // is for iterative click (once drilled down)
          target = parent; // trackerConfig array made empty for new kd-tree

          chart.flushKDTree();
          eventName = DRILLUP;
        } else {
          if (thisVNode.next) {
            // If the click is not on top most rectangle (base node)and base node
            // has children, drill down to the clicked node
            target = thisVNode; // trackerConfig array made empty for new kd-tree

            chart.flushKDTree();
            eventName = DRILLDOWN;
          } else {
            // If the click is not on top most rectangle (base node)and base node
            // doesnot have any more chidren drill down to the parent node of clicked node
            target = parent;

            if (baseNode === target) {
              eventName = UNDEF;
              return;
            } // trackerConfig array made empty for new kd-tree

            /** @todo eventname should be taken from constants */


            eventName = DRILLDOWN;
          }
        } // Reset the legend once any traversal happens
        // (legend && legend.enabled) && legend.resetLegend();
        // algorithmAPI.applyShadeFiltering.reset();


        eventName && chart.fireChartInstanceEvent('before' + eventName, {
          node: target,
          withoutHead: !attrs.showParent
        }, UNDEF, function () {
          chart.config.trackerConfig.length = 0;
          stateContext.set(visibleState, {
            node: node,
            state: eventName
          }); // Remove everything from the paper

          removeFn.call(rendererAPI, target); // reset the visible Root

          setVisibleRoot(target); // setting the animation state to drill for drill-down animation

          animationManager.setAnimationState('drill');
          chart.setState('drill', true); // Redraw by assigning a new root

          containerManager.draw(); // eslint-disable-next-line good-practices/no-function-dependency

          animationManager.onAnimationComplete(function () {
            chart.setState('drill', false);
          }); // @todo eventname should be taken from constants

          chart.fireChartInstanceEvent(eventName, {
            node: target,
            withoutHead: !attrs.showParent,
            drillUp: _backToParent,
            drillUpToTop: _resetTree
          });
        }, function () {
          // Event is cancelled
          chart.fireChartInstanceEvent(eventName + 'cancelled', {
            node: target,
            withoutHead: !attrs.showParent
          });
        });
        chart.addJob('attachEventToBtns', function () {
          chart._lastAttached.backToParent && btns.back && btns.back.removeEventListener('fc-click', chart._lastAttached.backToParent);
          chart._lastAttached.resetTree && btns.home && btns.home.removeEventListener('fc-click', chart._lastAttached.resetTree);
          chart._lastAttached.backToParent = _backToParent.bind(target);
          chart._lastAttached.resetTree = _resetTree.bind(target);
          btns.back && btns.back.addEventListener('fc-click', chart._lastAttached.backToParent);
          btns.home && btns.home.addEventListener('fc-click', chart._lastAttached.resetTree);
        }, _schedular.priorityList.kdTree);
        chart.resetSingleTracker();
      },
      mouseover: function mouseover(node) {
        var evtData = extractEventData(node.virginNode);
        chart.fireChartInstanceEvent(plotRollOverEvt, evtData, UNDEF, UNDEF, function () {
          chart.fireChartInstanceEvent(plotRollOverEvt + 'cancelled', evtData);
        });
      },
      mouseout: function mouseout(node) {
        var evtData = extractEventData(node.virginNode); // eslint-disable-line good-practices/no-single-usage-variable

        chart.fireChartInstanceEvent(plotRollOutEvt, extractEventData(node.virginNode), UNDEF, UNDEF, function () {
          chart.fireChartInstanceEvent(plotRollOutEvt + 'cancelled', evtData);
        });
      }
    };
  }

  visibilityController = function () {
    // eslint-disable-line good-practices/no-single-usage-variable
    var restOfTheTreeArr = [],
        nextVisibileTreeRoot,
        inProgress = false,
        // eslint-disable-line good-practices/no-single-usage-variable
    attrVisible = {
      visibility: 'visible',
      opacity: 1
    };
    return {
      controlPreAnimVisibility: function controlPreAnimVisibility(node, superNode) {
        var rootNode, tempNode, itr, dfItr, nextNode, overAttr;

        if (!node) {
          return;
        }

        tempNode = node;

        while (true) {
          tempNode = tempNode.getParent();

          if (!tempNode) {
            break;
          }

          rootNode = tempNode;
        }

        itr = iterator(rootNode, {
          exception: node
        }); // eslint-disable-line good-practices/no-single-usage-variable

        dfItr = itr.df; // eslint-disable-line good-practices/no-single-usage-variable

        while (true) {
          nextNode = dfItr.next();

          if (!nextNode) {
            break;
          }

          overAttr = nextNode.overAttr || (nextNode.overAttr = {});
          overAttr.visibility = HIDDEN_STR;
          restOfTheTreeArr.push(nextNode);
        }

        nextVisibileTreeRoot = superNode || node.getParent();
        inProgress = false;
        return restOfTheTreeArr;
      },
      displayAll: function displayAll(node) {
        var itr, overAttr, dfItr, nextNode;

        if (!node) {
          return;
        }

        itr = iterator(node.getParent() || node); // eslint-disable-line good-practices/no-single-usage-variable

        dfItr = itr.df; // eslint-disable-line good-practices/no-single-usage-variable

        while (true) {
          nextNode = dfItr.next();

          if (!nextNode) {
            break;
          }

          overAttr = nextNode.overAttr || (nextNode.overAttr = {});
          overAttr.visibility = VISIBLE_STR;
        }

        nextVisibileTreeRoot = UNDEF;
        restOfTheTreeArr.length = 0;
        inProgress = false;
      },
      controlPostAnimVisibility: function controlPostAnimVisibility() {
        var textItem, dirtyNode, itr, dfItr, nextNode;

        if (inProgress) {
          return;
        }

        inProgress = true; // eslint-disable-line good-practices/no-single-usage-variable

        if (!nextVisibileTreeRoot) {
          return;
        }

        itr = iterator(nextVisibileTreeRoot); // eslint-disable-line good-practices/no-single-usage-variable

        dfItr = itr.df; // eslint-disable-line good-practices/no-single-usage-variable

        while (true) {
          nextNode = dfItr.next(maxDepth);

          if (!nextNode) {
            break;
          }

          if (nextNode.dirtyNode) {
            dirtyNode = nextNode.dirtyNode;
            dirtyNode && dirtyNode.plotItem.attr(attrVisible);
            textItem = dirtyNode && dirtyNode.textItem;
            textItem && textItem.label && textItem.label.attr(attrVisible);
            textItem && textItem.label && textItem.highlightMask.attr(attrVisible);
          }
        }

        nextVisibileTreeRoot = UNDEF;
        restOfTheTreeArr.length = 0;
      }
    };
  }();

  afAPI.AbstractTreeMaker = AbstractTreeMaker;
  afAPI.iterator = iterator;
  afAPI.initConfigurationForlabel = initConfigurationForlabel;
  afAPI.context = context;
  afAPI.mapColorManager = mapColorManager;
  afAPI.abstractEventRegisterer = abstractEventRegisterer;
  afAPI.setMaxDepth = setMaxDepth;
  afAPI.getVisibleRoot = getVisibleRoot;
  afAPI.setVisibleRoot = setVisibleRoot;
  afAPI.visibilityController = visibilityController;
  return afAPI;
},

/**
  * Defines the tiling algorithm and exposes api to access those.
  * @param {Object} afAPI - APIs to create algorithm factoy
  * @param {Object} algorithmFactory - Algorithm Factory APIs
  * @return {Object} algorithmFactory - Algorithm Factory APIs
  */
algorithmFactoryCreator = function algorithmFactoryCreator(afAPI, algorithmFactory) {
  var algo,
      AbstractTreeMaker = afAPI.AbstractTreeMaker,
      // eslint-disable-line good-practices/no-single-usage-variable
  algorithm,
      treeMaker,
      tree,
      bucketIterationMode,
      depthIncrement,
      maxDepth;
  /**
   * Function to set null/zero values to sum of its child values
   * by traversing the tree in post-oder
   * @param {Object} node, particular node of the tree
   */

  function postOrderTraversal(node) {
    var children = node.getChildren(),
        childNode,
        sumOfvalues = 0; // eslint-disable-line good-practices/no-single-usage-variable
    // traverse the children recursively and calculate the sum of values of its children

    for (var i = 0; i < (children && children.length); i++) {
      childNode = children[i];
      postOrderTraversal(childNode);
      sumOfvalues += childNode.getValue() || 0;
    } // assign sum of the values of childnodes to parent node only if value of parent node is null


    if (isNaN(node.value)) {
      node.value = sumOfvalues;
    }
  } // drawingAreaMeasurement;


  algo = {
    'sliceanddice': {
      /**
        * Provides a more managed way to calculate space for child.
        * This takes minimum space configuration and applies it over all the subsequent calculation
        * @param {Integer} horizontalPadding  - space between parent and child in x direction
        * @param {Integer} verticalPadding  - space between parent and child in y direction
        * @return {Function} - A function to be called, everytime space for a new node needs to be
        * calculated
        */
      areaBaseCalculator: function areaBaseCalculator(horizontalPadding, verticalPadding) {
        // eslint-disable-line good-practices/no-function-dependency
        var sx = horizontalPadding,
            sy = verticalPadding;
        /*
                   * Provides the basic information of the tree so that the current node can use that and
                   * calculate the space
                   * @param node {TreeNode} - node which is the subject to calculation
                   * @param posOffsetApplyFn {Function} - logic of calculation. This function is called with
                   *      meta information, immediate left sibling (if any) and parent. The context
                   *      of this function is changed with the one which is subject to calculation.
                   * @param options {Object} - provides additional options to the calculation.
                                              Something like space for label.
                   * @return {Object} - returns what ever posOffsetApplyFn returns.
                   */

        return function (node, posOffsetApplyFn, options) {
          var parent,
              leftSibling,
              denominator,
              meta = {},
              eHeight,
              eWidth,
              parentRect,
              textMargin = 0,
              negSpacesY = 0;

          if (!node) {
            return;
          }

          if (options) {
            textMargin = options.textMargin || textMargin;
          }

          negSpacesY = textMargin;
          parent = node.getParent(); // Get immediate left sibling

          leftSibling = node.getSibling('left');

          if (parent) {
            // Denomitor to calculate the area. Every parent value is the sum of all children value
            denominator = parent.getValue();
            parentRect = parent.rect; // Calculate the width and hight of the space where children will be drawn.
            // This ideally depend on the space that was passed when the outer most function
            // was called

            eHeight = parentRect.height - 2 * sy - negSpacesY;
            eWidth = parentRect.width - 2 * sx;
            /*
                           * This is the inner logical rectangle where the child is drawn. If horizontalPadding
                             and verticalPadding
                           * is zero it is as same as the outermost rectangle. Something like
                           *
                           *  Parent rect
                           *  -----------------------
                           * |  verticalPadding     s|
                           * |  ------------------- p|
                           * | | effective rect    |a|
                           * | | where child will  |c|
                           * | | be drawn          |e|
                           * | |                   |x|
                           */

            meta.effectiveRect = {
              height: eHeight,
              width: eWidth,
              x: parentRect.x + sx,
              y: parentRect.y + sy + negSpacesY
            };
            meta.effectiveArea = eHeight * eWidth;
            meta.ratio = node.getValue() / denominator;

            if (leftSibling) {
              // If this is not the first children, this will be drawn relative
              // to the former children
              return posOffsetApplyFn.call(node, meta, leftSibling, parent);
            } // Flag indication that the last retrieved is parent


            meta.lastIsParent = true; // First children. This will be drawn relative

            return posOffsetApplyFn.call(node, meta, parent);
          } // If parent is not present the it is the root node. For root node use the
          // original canvas area. If parent is not present there is also no chance to
          // have siblings of the node. Since there can only be only one root node


          return null;
        };
      },

      /**
        * Initializes the state required when the legend is dragged and effect to be applied
        * @param {Object}   bucketInstance  - instace of bucket
        * @param {Object}   overrideEffect  - style to be applied in key-value pair
        * @param {Function} rangeOutFn      - Function to be executed when outliers are found
        * @return {Function}                - Control function that operates on outliers by adjusting the range
        */
      applyShadeFiltering: function applyShadeFiltering(bucketInstance, overrideEffect, rangeOutFn) {
        // eslint-disable-line good-practices/no-function-dependency
        // Set style information
        bucketInstance.setRangeOutEffect(overrideEffect, rangeOutFn);

        this.applyShadeFiltering.reset = function () {
          bucketInstance.resetPointers();
        };
        /**
          * Control the effect to be executed on outliers.
          * @param {Object} limits  - an simple javascript object containing the start and end limit of
          *                           the legend
          */


        return function (limits) {
          bucketInstance.moveLowerShadePointer(limits.start);
          bucketInstance.moveHigherShadePointer(limits.end);
        };
      },

      /**
        * logic of calculation. This function is called with meta information, immediate left sibling
        * (if any) and parent. The context of this function is changed with the one which is subject to
        * calculation.
        * @return {Object} -
        */
      alternateModeManager: function alternateModeManager() {
        // eslint-disable-line good-practices/no-function-dependency
        return function (meta, lastPoint) {
          // eslint-disable-line good-practices/no-function-dependency
          var height,
              width,
              isDirectionVertical,
              dx,
              dy,
              cNode = this,
              baseArea = meta.effectiveArea,
              // eslint-disable-line good-practices/no-single-usage-variable
          ratio = meta.ratio,
              // eslint-disable-line good-practices/no-single-usage-variable
          childArea = baseArea * ratio,
              effectiveRect = meta.effectiveRect,
              lastRect = lastPoint.rect,
              lastIsParent = meta.lastIsParent; // eslint-disable-line good-practices/no-single-usage-variable

          if (lastIsParent) {
            // If the node is the first children, take measurement of the effective rect
            dx = effectiveRect.x;
            dy = effectiveRect.y;
            height = effectiveRect.height;
            width = effectiveRect.width; // First direction is vertical (or parameterized)

            isDirectionVertical = cNode.isDirectionVertical = true;
          } else {
            // If the node is not the first child, get the remaining height and width where
            // the drawing will happen
            height = effectiveRect.height + effectiveRect.y - (lastRect.height + lastRect.y);
            width = effectiveRect.width + effectiveRect.x - (lastRect.width + lastRect.x); // Every child drawing direction will be opposite of what the immediate left
            // sibling used to be

            isDirectionVertical = cNode.isDirectionVertical = !lastPoint.isDirectionVertical;
          }

          if (isDirectionVertical) {
            // If this orientation is vertical possible that the last one is horizontal
            width = childArea / height;
            dx = dx !== UNDEF ? dx : lastRect.x;
            dy = dy !== UNDEF ? dy : lastRect.y + lastRect.height;
          } else {
            height = childArea / width;
            dx = dx !== UNDEF ? dx : lastRect.x + lastRect.width;
            dy = dy !== UNDEF ? dy : lastRect.y;
          }

          return {
            height: height,
            width: width,
            x: dx,
            y: dy
          };
        };
      },
      horizontalVerticalManager: function horizontalVerticalManager(slicingMode) {
        // eslint-disable-line good-practices/no-function-dependency
        var isVerticalSlicing = Boolean(slicingMode === 'vertical'); // eslint-disable-line good-practices/no-single-usage-variable

        return function (meta, lastPoint) {
          var height,
              width,
              isDirectionVertical,
              dx,
              dy,
              cNode = this,
              baseArea = meta.effectiveArea,
              // eslint-disable-line good-practices/no-single-usage-variable
          ratio = meta.ratio,
              // eslint-disable-line good-practices/no-single-usage-variable
          childArea = baseArea * ratio,
              effectiveRect = meta.effectiveRect,
              lastRect = lastPoint.rect,
              lastIsParent = meta.lastIsParent; // eslint-disable-line good-practices/no-single-usage-variable

          if (lastIsParent) {
            // If the node is the first children, take measurement of the effective rect
            dx = effectiveRect.x;
            dy = effectiveRect.y;
            height = effectiveRect.height;
            width = effectiveRect.width; // First direction is vertical (or parameterized)

            isDirectionVertical = cNode.isDirectionVertical = !lastPoint.isDirectionVertical;
          } else {
            // If the node is not the first child, get the remaining height and width where
            // the drawing will happen
            height = effectiveRect.height + effectiveRect.y - (lastRect.height + lastRect.y);
            width = effectiveRect.width + effectiveRect.x - (lastRect.width + lastRect.x); // Every child drawing direction will be opposite of what the immediate left
            // sibling used to be

            isDirectionVertical = cNode.isDirectionVertical = !arguments[2].isDirectionVertical;
          } // toogle the directional flag as per the slicing mode.


          isDirectionVertical = isVerticalSlicing ? isDirectionVertical : !isDirectionVertical;

          if (isDirectionVertical) {
            // If this orientation is vertical possible that the last one is horizontal
            if (height === 0) {
              height = effectiveRect.height;
              dx = dx !== UNDEF ? dx : lastRect.x + lastRect.width;
              dy = dy !== UNDEF ? dy : lastRect.y;
            }

            width = childArea / height;
            dx = dx !== UNDEF ? dx : lastRect.x;
            dy = dy !== UNDEF ? dy : lastRect.y + lastRect.height;
          } else {
            if (width === 0) {
              width = effectiveRect.width;
              dx = dx !== UNDEF ? dx : lastRect.x;
              dy = dy !== UNDEF ? dy : lastRect.y + lastRect.height;
            }

            height = childArea / width;
            dx = dx !== UNDEF ? dx : lastRect.x + lastRect.width;
            dy = dy !== UNDEF ? dy : lastRect.y;
          }

          return {
            height: height,
            width: width,
            x: dx,
            y: dy
          };
        };
      },

      /**
        * Maps the logical tree to nested rectangle and render on the paper.
        * @param {algorithmFactory} algorithmAPI  - all the apis for the running algorithm
        * @param {Object} dsStore - dataset instance
        * @param {Object} canvasMeasurement  - Simple key-value pair of information
        *                                      of the available drawing area.
        * @param {Object} rendererAPI  - API needed to render the objects in the drawing area.
        */
      drawTree: function drawTree(algorithmAPI, dsStore, canvasMeasurement, rendererAPI) {
        var treeRoot = this,
            chart = dsStore.getFromEnv('chart'),
            config = chart.config || (chart.config = {}),
            trackerConfig = config.trackerConfig || (config.trackerConfig = []),
            // eslint-disable-line good-practices/no-single-usage-variable
        numberFormatter = dsStore.getFromEnv('number-formatter'),
            btns = dsStore.getFromEnv('toolbarBtns'),
            drawRectFn = rendererAPI.drawRect,
            // eslint-disable-line good-practices/no-single-usage-variable
        drawTextFn = rendererAPI.drawText,
            // eslint-disable-line good-practices/no-single-usage-variable
        drawHotFn = rendererAPI.drawHot,
            // eslint-disable-line good-practices/no-single-usage-variable
        xShift = canvasMeasurement.horizontalPadding,
            // eslint-disable-line good-practices/no-single-usage-variable
        yShift = canvasMeasurement.verticalPadding,
            // eslint-disable-line good-practices/no-single-usage-variable
        smartLabel = dsStore.getFromEnv('smartLabel'),
            lineHeight,
            labelPadding = {
          // eslint-disable-line good-practices/no-single-usage-variable
          x: 5,
          y: 5
        },
            iterator = afAPI.iterator,
            // eslint-disable-line good-practices/no-single-usage-variable
        itr = iterator(treeRoot),
            // eslint-disable-line good-practices/no-single-usage-variable
        dfItr = itr.df,
            baseNode,
            getNextAreaBase = algorithmAPI.areaBaseCalculator(xShift, yShift),
            // eslint-disable-line good-practices/no-single-usage-variable
        attrs = dsStore.conf,
            highlightParentsOnHover = attrs.highlightParentsOnHover,
            // eslint-disable-line good-practices/no-single-usage-variable
        getTextConf,
            context = afAPI.context,
            visController = afAPI.visibilityController,
            colorRange = dsStore.conf.colorRange,
            // eslint-disable-line good-practices/no-single-usage-variable
        localColorProvider = afAPI.mapColorManager(attrs, colorRange),
            // eslint-disable-line good-practices/no-single-usage-variable
        abstractEvtReg = afAPI.abstractEventRegisterer(algorithmAPI, dsStore, canvasMeasurement, rendererAPI),
            clickEvtImpl = abstractEvtReg.click,
            // eslint-disable-line good-practices/no-single-usage-variable
        mouseoverEvtImpl = abstractEvtReg.mouseover,
            // eslint-disable-line good-practices/no-single-usage-variable
        mouseoutEvtImpl = abstractEvtReg.mouseout,
            // eslint-disable-line good-practices/no-single-usage-variable
        slicingMode = attrs.slicingMode,
            temp = slicingMode === 'alternate' ? 'alternateModeManager' // eslint-disable-line good-practices/no-single-usage-variable
        : 'horizontalVerticalManager',
            postNodeFetcher = algorithmAPI[temp](slicingMode),
            // eslint-disable-line good-practices/no-single-usage-variable
        _baseNode,
            _intSR = chart._intSR,
            resetTree,
            backToParent,
            stateContextId = CLICKEDSTATE,
            // eslint-disable-line good-practices/no-single-usage-variable
        visibleState = VISIBLEROOT,
            // eslint-disable-line good-practices/no-single-usage-variable
        stateContext,
            clickedState,
            csNode;

        stateContext = context.getInstance(stateContextId); // eslint-disable-line good-practices/no-single-usage-variable

        clickedState = stateContext.get(visibleState) || {};
        csNode = clickedState.node;

        if (clickedState.node && clickedState.state) {
          if (clickedState.state.toLowerCase() === DRILLUP) {
            if (csNode instanceof Array) {
              visController.controlPreAnimVisibility(csNode[0].virginNode, csNode[1]);
            } else {
              visController.controlPreAnimVisibility(csNode.virginNode);
            }
          } else {
            visController.displayAll(clickedState.node.virginNode);
          }
        }

        lineHeight = attrs.parentLabelLineHeight; // eslint-disable-line good-practices/no-single-usage-variable
        // Gets label configuration

        getTextConf = afAPI.initConfigurationForlabel(labelPadding, lineHeight, attrs); // eslint-disable-line good-practices/no-single-usage-variable
        // First time iteration to get the root node
        // maximum level of tree traversal is set to the value incremented with the current node depth

        baseNode = dfItr.next(maxDepth = afAPI.setMaxDepth(treeRoot.getDepth() + depthIncrement)); // eslint-disable-line good-practices/no-single-usage-variable

        _baseNode = baseNode;

        while (_baseNode.getParent()) {
          // The loop is added if the root of the tree is passed via attributes otherwise we could
          // have done just by saving the reference in a variable.
          _baseNode = _baseNode.getParent();
        } // traverse the tree and calculate effective node value


        !config.valuesset && postOrderTraversal(_baseNode);
        config.valuesset = true;

        if (!attrs.showNavigationBar) {
          if (_baseNode !== baseNode) {
            btns.home.show();
            btns.back.show();
          } else {
            btns.home.hide();
            btns.back.hide();
          }
        } else {
          btns.home.hide();
          btns.back.hide();
        }

        smartLabel.useEllipsesOnOverflow(chart.config.useEllipsesWhenOverflow);
        smartLabel.setStyle(attrs._setStyle = {
          fontSize: (attrs.labelFontSize || attrs.baseFontSize) + 'px',
          fontFamily: attrs.labelFont || attrs.baseFont,
          lineHeight: 1.2 * (attrs.labelFontSize || attrs.baseFontSize) + 'px'
        }); // Save the state in reflow conf
        // reflowData.tree = baseNode;

        backToParent = _intSR.backToParent; // eslint-disable-line good-practices/no-single-usage-variable

        resetTree = _intSR.resetTree; // eslint-disable-line good-practices/no-single-usage-variable

        chart.addJob('attachEventToBtns', function () {
          chart._lastAttached.backToParent && btns.back && btns.back.removeEventListener('fc-click', chart._lastAttached.backToParent);
          chart._lastAttached.resetTree && btns.home && btns.home.removeEventListener('fc-click', chart._lastAttached.resetTree);
          chart._lastAttached.backToParent = backToParent.bind(baseNode);
          chart._lastAttached.resetTree = resetTree.bind(baseNode);
          btns.back && btns.back.addEventListener('fc-click', chart._lastAttached.backToParent);
          btns.home && btns.home.addEventListener('fc-click', chart._lastAttached.resetTree);
        }, _schedular.priorityList.kdTree);
        /**
          * This function recursively draws the tree using depth first algorithm.
          * @param node {TreeMap} - node to be drawn;
          * @param drawingArea {Object} - ultimate drawing area of the node. By ultimate it means
          *                              no more operation will be performed
          */

        (function rec(node, drawingArea) {
          var nextNode,
              _rect,
              _textRect,
              hotItem,
              labelItem,
              highlightItem,
              textItem,
              nodeDrawingArea,
              rect,
              textRect,
              textConfObj,
              textConf,
              options = {},
              label,
              plotItem,
              plotDetails = {},
              evtFns = {},
              hoverContextPointerName = HOVER,
              cssConf = {},
              colorDimension = _lib.BLANKSTRING,
              // eslint-disable-line good-practices/no-single-usage-variable
          //   colorValue,
          formattedValue,
              formattedsValue; // if there is no node or there is node value of node then skip drawing of that node


          if (!node || isNaN(node.value) || typeof node.value === 'undefined') {
            // break condition of recursive iteration
            return;
          }

          formattedValue = numberFormatter.yAxis(node.getValue());
          formattedsValue = numberFormatter.sYAxis(node.getColorValue());
          node.setPath(); // cache the previous rectangular configurations for animating the rectangle.

          _rect = node.rect || {};
          _textRect = node.textRect || {};
          rect = node.rect = {};
          textRect = node.textRect = {}; // Get rectangle to draw the node

          rect.width = drawingArea.width;
          rect.height = drawingArea.height;
          rect.x = drawingArea.x;
          rect.y = drawingArea.y; // Get the color and border configuration

          cssConf = localColorProvider(node, UNDEF, dsStore.conf);
          plotItem = node.plotItem; // If plotItem exists, then its the interacted sub-tree which is updated with a
          // different animations

          if (plotItem) {
            // dispose the graphic rectangle for the selected node.
            rendererAPI.graphicPool(true, 'plotItem', plotItem, _rect);
          }

          node.__props || (node.__props = {});
          node.__props.curr = Object.assign({}, rect);
          node.__props.node = Object.assign({}, node);
          plotItem = node.plotItem = drawRectFn(rect, Object.assign({}, cssConf, (node.getColorValue() || node.getColorValue() === 0) && {
            fill: node.presentColor
          } || {}), _rect, node.overAttr, node);
          node.__props.prev = Object.assign({}, rect);
          node.cssConf = cssConf; // Get the configuration to draw text

          textConfObj = getTextConf(node, rect);
          textConf = textConfObj.conf; // Offset that will be used to plot the children

          options.textMargin = textConf.rectShiftY;
          textRect = node.textRect = textConf.textRect; // Get the normalized text

          label = smartLabel.getSmartText(textConf.label, textRect.width, textRect.height).text; // eslint-disable-line good-practices/no-single-usage-variable
          // Saves the reference so that the event listener can use it, and also useful for disposing.

          node.plotItem = plotItem;
          labelItem = node.labelItem;

          if (labelItem) {
            highlightItem = node.highlightItem;
            rendererAPI.graphicPool(true, 'labelItem', labelItem, _rect);
            rendererAPI.graphicPool(true, 'highlightItem', highlightItem, _rect);
          } else {
            _textRect = _textRect || {};
          }

          textItem = drawTextFn(label, textRect, {
            textAttrs: textConfObj.attr,
            highlightAttrs: textConfObj.highlight
          }, _textRect, node.overAttr, node);
          node.labelItem = textItem.label;
          node.highlightItem = textItem.highlightMask; // Save all the references so that it can be used as context

          plotDetails.virginNode = node;
          plotDetails.plotItem = plotItem;
          plotDetails.textItem = textItem; // Save circular reference for query

          plotDetails.virginNode.dirtyNode = plotDetails;

          if (node.getColorValue()) {
            colorDimension = attrs.tooltipSeparationCharacter + formattedsValue;
          }

          if (attrs.showTooltip) {
            plotDetails.toolText = (0, _lib.parseTooltext)(attrs.plotToolText, [1, 2, 3, 119, 122], {
              label: node.getLabel(),
              formattedValue: formattedValue,
              formattedsValue: formattedsValue
            }, {
              value: node.getValue(),
              svalue: node.getColorValue()
            }) || node.getLabel() + attrs.tooltipSeparationCharacter + formattedValue + colorDimension;
          } else {
            plotDetails.toolText = _lib.BLANKSTRING;
          }

          plotDetails.rect = rect; // @todo - the abstract event handler should come from algorithmAP

          evtFns.hover = [function (forcedTracker) {
            var elem = this,
                parentElem,
                targetElement,
                virginNode,
                hoverContext,
                css,
                maskRgba,
                hoverMaskAlpha = 60; // eslint-disable-line good-practices/no-single-usage-variable
            // Get the context if created or create a new one and get

            hoverContext = context.getInstance(hoverContextPointerName); // eslint-disable-line good-practices/no-single-usage-variable

            virginNode = elem.virginNode;

            if (highlightParentsOnHover && !virginNode.next) {
              // If all the sibling leaves to be hovered together attribute is set and
              // the node is really a leaf
              parentElem = virginNode.getParent();
              targetElement = parentElem || virginNode;
            } else {
              // Set hover effect on the child itself
              targetElement = elem.virginNode;
            } // Set it on context


            hoverContext.set('element', targetElement);
            css = targetElement.cssConf; // eslint-disable-line good-practices/no-single-usage-variable

            maskRgba = (0, _lib.convertColor)((0, _lib.getLightColor)(css.fill, 80), hoverMaskAlpha); // eslint-disable-line good-practices/no-single-usage-variable

            forcedTracker.attr({
              'fill': maskRgba
            });
            mouseoverEvtImpl(this);
          }.bind(plotDetails), function (tracker) {
            var hoverContext,
                targetElement,
                fill,
                unmaskRgba,
                hoverMaskAlpha = 0; // eslint-disable-line good-practices/no-single-usage-variable
            // Get the context, which is most definitely created during the mouseover

            hoverContext = context.getInstance(hoverContextPointerName); // eslint-disable-line good-practices/no-single-usage-variable

            targetElement = hoverContext.get('element') || {};
            fill = targetElement.cssConf && targetElement.cssConf.fill; // eslint-disable-line good-practices/no-single-usage-variable

            unmaskRgba = (0, _lib.convertColor)(fill || '#fff', hoverMaskAlpha); // eslint-disable-line good-practices/no-single-usage-variable

            tracker.attr({
              'fill': unmaskRgba
            });
            mouseoutEvtImpl(this);
          }.bind(plotDetails)];
          evtFns.tooltip = [plotDetails.toolText];
          evtFns.click = [function () {
            clickEvtImpl(this, baseNode);
          }.bind(plotDetails)];
          hotItem = node.hotItem;

          if (hotItem) {
            rendererAPI.graphicPool(true, 'hotItem', hotItem, _rect);
          } // hotItem = node.hotItem = drawHotFn(plotDetails, evtFns);


          trackerConfig.push({
            node: node,
            key: 'hotItem',
            plotDetails: plotDetails,
            evtFns: evtFns,
            callback: drawHotFn
          }); // Get the next node which will be plotted

          nextNode = dfItr.next(maxDepth);
          nodeDrawingArea = getNextAreaBase(nextNode, postNodeFetcher, options); // eslint-disable-line good-practices/no-single-usage-variable
          // Recursively call the same function to draw the tree

          rec(nextNode, nodeDrawingArea);
        })(baseNode, canvasMeasurement);
      }
    },
    'squarified': {
      // eslint-disable-next-line good-practices/no-function-dependency
      orderNodes: function orderNodes() {
        // eslint-disable-next-line good-practices/no-function-dependency
        return this.sort(function (m, n) {
          return parseFloat(m.value, 10) < parseFloat(n.value, 10) ? 1 : -1;
        });
      },

      /**
        * Provides a more managed way to calculate space for child.
        * This takes minimum space configuration and applies it over all the subsequent calculation
        * @param {Integer} horizontalPadding  - space between parent and child in x direction
        * @param {Integer} verticalPadding  - space between parent and child in y direction
        * @return {Function} - A function to be called, everytime space for a new node needs
        *                      to be calculated
        */
      areaBaseCalculator: function areaBaseCalculator(horizontalPadding, verticalPadding) {
        // eslint-disable-line good-practices/no-function-dependency
        var sx = horizontalPadding,
            sy = verticalPadding;
        /**
          * Provides the basic information of the tree so that the current node can use that and
          * calculate the space
          * @param {TreeNode} nodes - node which is the subject to calculation
          * @param {Function} posOffsetApplyFn - logic of calculation. This function is called with meta
          *       information, immediate left sibling (if any) and parent. The context of this function
          *       is changed with the one which is subject to calculation.
          * @param {Object} options - provides additional options to the calculation.
                                    Something like space for label.
          * @return {Object} - returns what ever posOffsetApplyFn returns.
          */

        return function (nodes, posOffsetApplyFn, options) {
          var parent,
              meta = {},
              eHeight,
              eWidth,
              textMargin = 0,
              negSpacesY = 0,
              anyNode,
              parentRect;

          if (!nodes || nodes.length === 0) {
            return;
          }

          if (options) {
            textMargin = options.textMargin || textMargin;
          }

          negSpacesY = textMargin;
          anyNode = nodes[0];
          parent = anyNode.getParent();

          if (parent) {
            parentRect = parent.rect; // Calculate the width and hight of the space where children will be drawn.
            // This ideally depend on the space that was passed when the outer most
            // function was called

            eHeight = parentRect.height - 2 * sy - negSpacesY;
            eWidth = parentRect.width - 2 * sx;
            /*
                           * This is the inner logical rectangle where the child is drawn.
                           * If horizontalPadding and verticalPadding is zero
                           * it is as same as the outermost rectangle. Something like
                           *
                           *  Parent rect
                           *  -----------------------
                           * |  verticalPadding     s|
                           * |  ------------------- p|
                           * | | effective rect    |a|
                           * | | where child will  |c|
                           * | | be drawn          |e|
                           * | |                   |x|
                           */

            meta.effectiveRect = {
              height: eHeight,
              width: eWidth,
              x: parentRect.x + sx,
              y: parentRect.y + sy + negSpacesY
            };
            meta.effectiveArea = eHeight * eWidth;
            return posOffsetApplyFn.call(anyNode, meta, parent);
          } // If parent is not present the it is the root node. For root node use the original
          // canvas area. If parent is not present there is also no chance to have siblings
          // of the node. Since there can only be only one root node


          return null;
        };
      },

      /**
        * The squarified algorithm is a recursive way to find the best aspect ratio of a node, given an
        * incremental state. Here we create layouts based on the aspect ratio of parent container.
        * Inside this layout the rects are placed one by one and is checked for best aspect ratio.
        * If at any given state the aspect ratio of a node increases than what it had before
        * the layout manager restores the previous state.
        * Here layout means the rectanglular plot inside which the new nodes are contained.
        */
      layoutManager: function () {
        // eslint-disable-line good-practices/no-function-dependency

        /**
          * Creates a new layout depending on the value of width and height of the available area.
          */
        var RowLayout = /*#__PURE__*/function () {
          /**
            * constructor
            * @param {Object} root - parent rectangle of the current layout
            * @param {Integer} totalValue - total value of the parent which will be set in denominator
            *                               and is used when the plot assignment happens.
            */
          function RowLayout(root, totalValue) {
            this.totalValue = totalValue;
            this._rHeight = root.height;
            this._rWidth = root.width;
            this._rx = root.x;
            this._ry = root.y;
            this._rTotalArea = root.height * root.width; // Nodes which are placed in the current layout

            this.nodes = []; // Previous aspect ratio before the last node is added in the layout

            this._prevAR = UNDEF;

            if (this._rHeight < this._rWidth) {
              // If the height of parent rectangle is larger than the width then the layout is
              // formed in vertical direction.
              this._hSegmented = true;
            }
          }
          /**
            * Adds node the current layout then calculates and compares the aspect ratio.
            * @param {TreeNode} nodeObj  - node to be added in the current layout
            * @return {TreeNode | boolean} - if the new layout (affter addition of node) is not stable
            *                              (aspect ratio is more than the last one) return false, otherwise
            *                              return the last added node
            */


          var _proto3 = RowLayout.prototype;

          _proto3.addNode = function addNode(nodeObj) {
            var node = nodeObj,
                totalArea = this._rTotalArea,
                area,
                // eslint-disable-line good-practices/no-single-usage-variable
            ratio,
                width,
                height,
                i,
                len,
                length,
                snVal,
                snArea,
                snHeight,
                snWidth,
                rect,
                _hSegmented = this._hSegmented,
                _x = this._rx,
                _y = this._ry,
                _nextX,
                _nextY,
                _rect,
                remainingHeight,
                remainingWidth,
                maxSide,
                minSide,
                aspectRatio,
                valueSoFar = 0,
                cRect; // Push node in the current layout to calculate the current aspect ratio and to determine
            // whether it is larger than the previous one;


            this.nodes.push(node);

            for (i = 0, length = this.nodes.length; i < length; i++) {
              // The numeraic value of all the nodes which are in the layout stack currently.
              // Using this we can calculate the assignment of area of the complete layout stack unit.
              valueSoFar += parseFloat(this.nodes[i].getValue(), 10);
            }

            ratio = valueSoFar / this.totalValue; // eslint-disable-line good-practices/no-single-usage-variable

            area = totalArea * ratio;

            if (_hSegmented) {
              // If width is greater than height of the parent rectangle, make vertical segmentation,
              // since we can reach close to 1 aspect ratio in this way
              height = this._rHeight;
              width = area / height; // Next point from where the next layout will be laid out

              _nextX = _x + width;
              _nextY = _y; // Remaining area for after the current layout is laid

              remainingHeight = this._rHeight;
              remainingWidth = this._rWidth - width;
            } else {
              // If width is less than height of the parent rectangle, make horizontal segmentation,
              // since we can reach close to 1 aspect ratio in this way
              width = this._rWidth;
              height = area / width; // Next point from where the next layout will be laid out

              _nextX = _x;
              _nextY = _y + height; // Remaining area for after the current layout is laid

              remainingHeight = this._rHeight - height;
              remainingWidth = this._rWidth;
            }

            for (i = 0, len = this.nodes.length; i < len; i++) {
              // eslint-disable-line good-practices/no-single-usage-variable
              node = this.nodes[i];
              snVal = node.getValue(); // Proportional area inside the layout

              snArea = snVal / valueSoFar * area; // Keeps reference to the measurement of previous rect so that in case the aspect ratio
              // is smaller than the previous one, we can restore the state

              node.hRect = node.rect || {};
              node._hRect = node._rect || {}; // Holds information of the current rect

              rect = node.rect = {};

              if (_hSegmented) {
                rect.width = snWidth = width;
                rect.height = snHeight = snArea / snWidth;
                rect.x = _x;
                rect.y = _y;
                _y += snHeight;
              } else {
                rect.height = snHeight = height;
                rect.width = snWidth = snArea / snHeight;
                rect.x = _x;
                rect.y = _y;
                _x += snWidth;
              } // Calculates the aspect ratio


              maxSide = Math.max(rect.height, rect.width);
              minSide = Math.min(rect.height, rect.width); // aspectratio can be infinity if minSide is zero. Incase, it is infinite, change it to 0

              aspectRatio = maxSide / minSide;
              !isFinite(aspectRatio) && (aspectRatio = 0);
              node.aspectRatio = aspectRatio;
            }

            if (this.nodes.length > 1) {
              if (this.prevAR < node.aspectRatio) {
                // If the previous aspect ratio is less than the current one, we infer the
                // old layout is more stable. Hence we restore to the previous state.
                this.nodes.pop().rect = {};

                for (i = 0, length = this.nodes.length; i < length; i++) {
                  // Restore all the newly calculated rect to the previous one.
                  if (length === 1 && this.nodes[i].firstPassed) {
                    this.nodes[i].rect = this.nodes[i]._hRect;
                  } else {
                    this.nodes[i].rect = this.nodes[i].hRect;
                  }

                  _rect = this.nodes[i]._rect = {};
                  cRect = this.nodes[i].rect;
                  _rect.width = cRect.width;
                  _rect.height = cRect.height;
                  _rect.x = cRect.x;
                  _rect.y = cRect.y;
                } // Forcefully return false to inform the caller that the old layout was stable and
                // the system has restored from the new state to the old state


                return false;
              }
            } else {
              if (node) {
                _rect = node._rect = {};
                cRect = node.rect;
                _rect.width = cRect.width;
                _rect.height = cRect.height;
                _rect.x = cRect.x;
                _rect.y = cRect.y;
                node.firstPassed = true;
              }
            }

            this.prevAR = node.aspectRatio;
            this.height = height;
            this.width = width;
            /**
              * Provides the measurement of the remaining area for the next layout to be laid out.
              * @return {Object} - {
              *      height: {Integer},
              *      width: {Integer},
              *      x: {Integer},
              *      y: {Integer},
              * }
              */

            this.getNextLogicalDivision = function () {
              return {
                height: remainingHeight,
                width: remainingWidth,
                x: _nextX,
                y: _nextY
              };
            }; // Keep on returning the node last added if the layout is stable


            return node;
          };

          return RowLayout;
        }();

        return {
          RowLayout: RowLayout
        };
      }(),

      /*
        * Initializes the state required when the legend is dragged and effect to be applied
        * @param overrideEffect {Object} - style to be applied in key-value pair
        * @param rangeOutFn {Function} - Function to be executed when outliers are found
        * @return {Function} - Control function that operates on outliers by adjusting the range
        */
      applyShadeFiltering: function applyShadeFiltering(bucketInstance, overrideEffect, rangeOutFn) {
        // eslint-disable-line good-practices/no-function-dependency
        bucketInstance.setRangeOutEffect(overrideEffect, rangeOutFn);

        this.applyShadeFiltering.reset = function () {
          bucketInstance.resetPointers();
        };
        /*
          * Control the effect to be executed on outliers.
          * @param limits {Object} - an simple javascript object containing the start and end limit of
          *                          the legend
          */


        return function (limits) {
          bucketInstance.moveLowerShadePointer(limits.start);
          bucketInstance.moveHigherShadePointer(limits.end);
        };
      },
      drawTree: function drawTree(algorithmAPI, dsStore, canvasMeasurement, rendererAPI) {
        var treeRoot = this,
            chart = dsStore.getFromEnv('chart'),
            config = dsStore.getFromEnv('chartConfig'),
            trackerConfig = config.trackerConfig || (config.trackerConfig = []),
            // eslint-disable-line good-practices/no-single-usage-variable
        numberFormatter = dsStore.getFromEnv('number-formatter'),
            btns = dsStore.getFromEnv('toolbarBtns'),
            labelPadding = {
          // eslint-disable-line good-practices/no-single-usage-variable
          x: 5,
          y: 5
        },
            lineHeight,
            xShift = canvasMeasurement.horizontalPadding,
            // eslint-disable-line good-practices/no-single-usage-variable
        yShift = canvasMeasurement.verticalPadding,
            // eslint-disable-line good-practices/no-single-usage-variable
        getNextAreaBase = algorithmAPI.areaBaseCalculator(xShift, yShift),
            // eslint-disable-line good-practices/no-single-usage-variable
        RowLayout = algorithmAPI.layoutManager.RowLayout,
            smartLabel = dsStore.getFromEnv('smartLabel'),
            drawRectFn = rendererAPI.drawRect,
            // eslint-disable-line good-practices/no-single-usage-variable
        drawTextFn = rendererAPI.drawText,
            // eslint-disable-line good-practices/no-single-usage-variable
        drawHotFn = rendererAPI.drawHot,
            // eslint-disable-line good-practices/no-single-usage-variable
        iterator = afAPI.iterator,
            // eslint-disable-line good-practices/no-single-usage-variable
        itr = iterator(treeRoot),
            // eslint-disable-line good-practices/no-single-usage-variable
        bfItr = itr.bf,
            // eslint-disable-line good-practices/no-single-usage-variable
        baseNode,
            attrs = dsStore.conf,
            highlightParentsOnHover = attrs.highlightParentsOnHover,
            // eslint-disable-line good-practices/no-single-usage-variable
        getTextConf,
            context = afAPI.context,
            colorRange = dsStore.conf.colorRange,
            // eslint-disable-line good-practices/no-single-usage-variable
        localColorProvider = afAPI.mapColorManager(attrs, colorRange),
            // eslint-disable-line good-practices/no-single-usage-variable
        abstractEvtReg = afAPI.abstractEventRegisterer(algorithmAPI, dsStore, canvasMeasurement, rendererAPI),
            clickEvtImpl = abstractEvtReg.click,
            // eslint-disable-line good-practices/no-single-usage-variable
        mouseoverEvtImpl = abstractEvtReg.mouseover,
            // eslint-disable-line good-practices/no-single-usage-variable
        mouseoutEvtImpl = abstractEvtReg.mouseout,
            // eslint-disable-line good-practices/no-single-usage-variable
        _baseNode,
            _intSR = chart._intSR,
            backToParent,
            resetTree,
            visController = afAPI.visibilityController,
            stateContextId = CLICKEDSTATE,
            // eslint-disable-line good-practices/no-single-usage-variable
        visibleState = VISIBLEROOT,
            // eslint-disable-line good-practices/no-single-usage-variable
        stateContext,
            clickedState,
            csNode;

        stateContext = context.getInstance(stateContextId); // eslint-disable-line good-practices/no-single-usage-variable

        clickedState = stateContext.get(visibleState) || {};
        csNode = clickedState.node;

        if (clickedState.node && clickedState.state) {
          if (clickedState.state.toLowerCase() === DRILLUP) {
            if (csNode instanceof Array) {
              visController.controlPreAnimVisibility(csNode[0].virginNode, csNode[1]);
            } else {
              visController.controlPreAnimVisibility(csNode.virginNode);
            }
          } else {
            visController.displayAll(clickedState.node.virginNode);
          }
        }

        lineHeight = attrs.parentLabelLineHeight; // eslint-disable-line good-practices/no-single-usage-variable

        getTextConf = afAPI.initConfigurationForlabel(labelPadding, lineHeight, attrs); // eslint-disable-line good-practices/no-single-usage-variable
        // Get the root node
        // maximum level of tree traversal is set to the value incremented with the current node depth

        baseNode = bfItr.next(maxDepth = afAPI.setMaxDepth(treeRoot.getDepth() + depthIncrement));
        _baseNode = baseNode;

        while (_baseNode.getParent()) {
          _baseNode = _baseNode.getParent();
        } // traverse the tree and calculate effective node value


        !config.valuesset && postOrderTraversal(_baseNode);
        config.valuesset = true;

        if (!attrs.showNavigationBar) {
          if (_baseNode !== baseNode) {
            btns.home.show();
            btns.back.show();
          } else {
            btns.home.hide();
            btns.back.hide();
          }
        } else {
          btns.home.hide();
          btns.back.hide();
        }

        smartLabel.useEllipsesOnOverflow(chart.config.useEllipsesWhenOverflow);
        smartLabel.setStyle(attrs._setStyle = {
          fontSize: (attrs.labelFontSize || attrs.baseFontSize) + 'px',
          fontFamily: attrs.labelFont || attrs.baseFont,
          lineHeight: 1.2 * (attrs.labelFontSize || attrs.baseFontSize) + 'px'
        }); // Save the state in reflow conf
        // reflowData.tree = baseNode;

        backToParent = _intSR.backToParent; // eslint-disable-line good-practices/no-single-usage-variable

        resetTree = _intSR.resetTree; // eslint-disable-line good-practices/no-single-usage-variable

        chart.addJob('attachEventToBtns', function () {
          chart._lastAttached.backToParent && btns.back && btns.back.removeEventListener('fc-click', chart._lastAttached.backToParent);
          chart._lastAttached.resetTree && btns.home && btns.home.removeEventListener('fc-click', chart._lastAttached.resetTree);
          chart._lastAttached.backToParent = backToParent.bind(baseNode);
          chart._lastAttached.resetTree = resetTree.bind(baseNode);
          btns.back && btns.back.addEventListener('fc-click', chart._lastAttached.backToParent);
          btns.home && btns.home.addEventListener('fc-click', chart._lastAttached.resetTree);
        }, _schedular.priorityList.kdTree);
        /*
          * This function recursively draws the tree using breadth first algorithm.
          * @param node {TreeMap} - node to be drawn;
          * @param drawingArea {Object} - ultimate drawing area of the node. By ultimate it means
          *                              no more operation will be performed
          */

        (function rec(node, drawingArea) {
          var rect,
              _rect = {},
              highlightItem,
              hotItem,
              labelItem,
              _textRect,
              textRect,
              nextNodes,
              textItem,
              index,
              length,
              totalValPlotted = 0,
              // eslint-disable-line good-practices/no-single-usage-variable
          bfsQueue,
              bfsNode,
              plotItem,
              textConf,
              label,
              options = {},
              textConfObj,
              plotDetails = {},
              evtFns = {},
              hoverContextPointerName = HOVER,
              cssConf = {},
              colorDimension = _lib.BLANKSTRING,
              // eslint-disable-line good-practices/no-single-usage-variable
          //   colorValue,
          formattedValue,
              formattedsValue; // if there is no node or there is node value of node then skip drawing of that node


          if (!node || !node.value) {
            return;
          }

          formattedValue = numberFormatter.yAxis(node.getValue());
          formattedsValue = numberFormatter.sYAxis(node.getColorValue());
          node.setPath(); // cache the previous rectangular configurations for animating the rectangle.

          rect = node.__initRect;

          if (rect) {
            _rect.x = rect.x;
            _rect.y = rect.y;
            _rect.width = rect.width;
            _rect.height = rect.height;
          }

          _textRect = node.textRect || {};
          rect = node.rect = node.__initRect = {};
          textRect = node.textRect = {}; // Get rectangle to draw the node

          rect.width = drawingArea.width;
          rect.height = drawingArea.height;
          rect.x = drawingArea.x;
          rect.y = drawingArea.y; // Draws the rectangle

          cssConf = localColorProvider(node, UNDEF, dsStore.conf); // plotItem = drawRectFn(rect, cssConf);

          plotItem = node.plotItem; // If plotItem exists, then its the interacted sub-tree which is updated with a
          // different animations

          if (plotItem) {
            // dispose the graphic rectangle for the selected node.
            rendererAPI.graphicPool(true, 'plotItem', plotItem, _rect);
          }

          node.__props || (node.__props = {});
          node.__props.curr = Object.assign({}, rect);
          node.__props.node = Object.assign({}, node);
          plotItem = node.plotItem = drawRectFn(rect, Object.assign({}, cssConf, (node.getColorValue() || node.getColorValue() === 0) && {
            fill: node.presentColor
          } || {}), _rect, node.overAttr, node);
          node.__props.prev = Object.assign({}, rect);
          node.cssConf = cssConf; // Get the configuration to draw text

          textConfObj = getTextConf(node, rect);
          textConf = textConfObj.conf; // Offset that will be used to plot the children

          options.textMargin = textConf.rectShiftY;
          textRect = node.textRect = textConf.textRect; // Get the normalized text

          label = smartLabel.getSmartText(textConf.label, textRect.width, textRect.height).text; // eslint-disable-line good-practices/no-single-usage-variable

          labelItem = node.labelItem;

          if (labelItem) {
            highlightItem = node.highlightItem;
            rendererAPI.graphicPool(true, 'labelItem', labelItem, _rect);
            rendererAPI.graphicPool(true, 'highlightItem', highlightItem, _rect);
          } else {
            _textRect = _textRect || {};
          }

          textItem = drawTextFn(label, textRect, {
            textAttrs: textConfObj.attr,
            highlightAttrs: textConfObj.highlight
          }, _textRect, node.overAttr, node);
          node.labelItem = textItem.label;
          node.highlightItem = textItem.highlightMask; // Saves the reference so that the event listener can use it

          node.plotItem = plotItem; // Save all the references so that it can be used as context

          plotDetails.virginNode = node;
          plotDetails.plotItem = plotItem;
          plotDetails.textItem = textItem; // Save circular reference for query

          plotDetails.virginNode.dirtyNode = plotDetails;

          if (node.getColorValue()) {
            colorDimension = attrs.tooltipSeparationCharacter + formattedsValue;
          }

          if (attrs.showTooltip) {
            plotDetails.toolText = (0, _lib.parseTooltext)(attrs.plotToolText, [1, 2, 3, 119, 122], {
              label: node.getLabel(),
              formattedValue: formattedValue,
              formattedsValue: formattedsValue
            }, {
              value: node.getValue(),
              svalue: node.getColorValue()
            }) || node.getLabel() + attrs.tooltipSeparationCharacter + formattedValue + colorDimension;
          } else {
            plotDetails.toolText = _lib.BLANKSTRING;
          }

          plotDetails.rect = rect;
          evtFns.hover = [function (targetElementNew) {
            var elem = this,
                parentElem,
                targetElement,
                virginNode,
                hoverContext,
                css,
                maskRgba,
                hoverMaskAlpha = 60; // eslint-disable-line good-practices/no-single-usage-variable
            // Get the context if created or create a new one and get

            hoverContext = context.getInstance(hoverContextPointerName); // eslint-disable-line good-practices/no-single-usage-variable

            virginNode = elem.virginNode;

            if (highlightParentsOnHover && !virginNode.next) {
              // If all the sibling leaves to be hovered together attribute is set and
              // the node is really a leaf
              parentElem = virginNode.getParent();
              targetElement = parentElem || virginNode;
            } else {
              // Set hover effect on the child itself
              targetElement = elem.virginNode;
            } // Set it on context


            hoverContext.set('element', targetElement);
            css = targetElement.cssConf;
            maskRgba = (0, _lib.convertColor)(css.fill && (0, _lib.getLightColor)(css.fill, 80), hoverMaskAlpha); // eslint-disable-line good-practices/no-single-usage-variable
            // targetElement.plotItem.tracker.attr({'fill' : maskRgba});

            targetElementNew.attr({
              'fill': maskRgba
            });
            mouseoverEvtImpl(this);
          }.bind(plotDetails), function (targetElementNew) {
            var hoverContext,
                targetElement,
                fill,
                unmaskRgba,
                hoverMaskAlpha = 0; // eslint-disable-line good-practices/no-single-usage-variable
            // Get the context, which is most definitely created during the mouseover

            hoverContext = context.getInstance(hoverContextPointerName); // eslint-disable-line good-practices/no-single-usage-variable

            targetElement = hoverContext.get('element') || {}; // eslint-disable-line good-practices/no-single-usage-variable

            fill = targetElement.cssConf && targetElement.cssConf.fill; // eslint-disable-line good-practices/no-single-usage-variable

            unmaskRgba = (0, _lib.convertColor)(fill || '#fff', hoverMaskAlpha); // eslint-disable-line good-practices/no-single-usage-variable
            // targetElement.plotItem.tracker.attr({'fill' : unmaskRgba});

            targetElementNew.attr({
              'fill': unmaskRgba
            });
            mouseoutEvtImpl(this);
          }.bind(plotDetails)];
          evtFns.tooltip = [plotDetails.toolText];
          evtFns.click = [function () {
            clickEvtImpl(this, baseNode);
          }.bind(plotDetails)];
          hotItem = node.hotItem;

          if (hotItem) {
            rendererAPI.graphicPool(true, 'hotItem', hotItem, _rect);
          } // hotItem = node.hotItem = drawHotFn(plotDetails, evtFns);


          trackerConfig.push({
            node: node,
            key: 'hotItem',
            plotDetails: plotDetails,
            evtFns: evtFns,
            callback: drawHotFn
          }); // Get the next level (if it was in level n, the following function returns node of  n+1
          // level) of nodes which belongs to this parent

          nextNodes = maxDepth !== UNDEF ? node.getDepth() >= maxDepth ? UNDEF : node.getChildren() : node.getChildren();

          if (!nextNodes) {
            // If its a leaf node, no further level is possible hence return
            return;
          } // Get the nodes of next level which stable rect information. Which we canuse to call this
          // function recursively to draw the complete tree


          bfsQueue = getNextAreaBase(nextNodes, function (meta, parent) {
            var row,
                nodeLimit,
                nodeIndex = 0,
                node,
                // eslint-disable-line
            layout,
                nextDiv,
                queue = []; // Logically create a new layout

            row = new RowLayout({
              width: meta.effectiveRect.width,
              height: meta.effectiveRect.height,
              x: meta.effectiveRect.x,
              y: meta.effectiveRect.y
            }, parent.getValue());
            nodeLimit = nextNodes.length; // eslint-disable-line good-practices/no-single-usage-variable

            while (true) {
              if (nodeIndex++ === nodeLimit) {
                break;
              }

              node = nextNodes[nodeIndex - 1]; // Adds node in the layout to calculate the stability

              layout = row.addNode(node);

              if (layout === false) {
                // The current layout is not stable. The layoutManager has already reverted the
                // changes. Get the remaining logical division so that a new layout is laid
                nextDiv = row.getNextLogicalDivision(); // Create a new layout

                row = new RowLayout(nextDiv, parent.getValue() - totalValPlotted);
                nodeIndex--;
              } else {
                // Layout is stable, adds it in the queue
                totalValPlotted += parseFloat(node.getValue(), 10);
                queue.push(node);
              }
            }

            return queue;
          }, options);

          for (index = 0, length = bfsQueue.length; index < length; index++) {
            // eslint-disable-line good-practices/no-single-usage-variable
            // For all nodes of level n andd common parent, call this function recursively
            bfsNode = bfsQueue[index];
            rec(bfsNode, bfsNode.rect);
          }
        })(baseNode, canvasMeasurement);
      }
    }
  };
  /**
    * Gives the full implementation of the AbstractTreeMaker. Ususally AbstractTreeMaker can be used directly
    * if the ordering is not intended. The more specific version of the treemap needs to have ordering of
    * nodes. TreeMaker at this movement only give that implementation.
    */

  var TreeMaker = /*#__PURE__*/function (_AbstractTreeMaker) {
    (0, _inheritsLoose2.default)(TreeMaker, _AbstractTreeMaker);

    function TreeMaker() {
      return _AbstractTreeMaker.apply(this, arguments) || this;
    }

    /**
     * Provides the name of the chart extension
     *
     * @static
     * @return {string} The name of the chart extension
     */
    TreeMaker.getName = function getName() {
      return 'TreeMaker';
    }
    /**
      * Provides the order of the node. This order is algorithm specific. This function acts as a bridge to pass
      * the ordering logic from algorithm to AbstractTreeMaker. This is called from AbstractTreeMaker only.
      * @param {Array.<TreeNode>} children  - array of children at a praticular level for a particular parent.
      */
    // eslint-disable-next-line
    ;

    var _proto4 = TreeMaker.prototype;

    _proto4.order = function order(children) {
      var algorithmAPI = algo[algorithm],
          orderNodeFn = algorithmAPI.orderNodes;

      if (orderNodeFn) {
        return orderNodeFn.apply(children, [algorithmAPI]);
      }

      return children;
    };

    return TreeMaker;
  }(AbstractTreeMaker);
  /**
    * Initialize the algorithm factory by passing information regarding the algorithm.
    * @param {string} algoName  - name of the algorithm
    * @param {boolean} flag  - flag to inform treemaker whether it should form bucket of the leaf nodes.
    *                      Enable this if the legend is used
    * @param {number | undefined} permitterDepth  - The maximum depth of visual that can be seen in the tree at once
    * @return {Object} API for algo [squarified or sliceanddice]
    */


  function init(algoName, flag, permitterDepth) {
    algorithm = algoName; // eslint-disable-line good-practices/no-single-usage-variable

    bucketIterationMode = flag;
    depthIncrement = afAPI.setMaxDepth(permitterDepth);
    return algo[algorithm];
  }
  /**
    * Takes the syle and operation to be applied / performed on the outliers if the legend is dragged.
    * @param {Object} css - key-value pair of the style to be applied on the outliers. Where the key is the
    *                      name of the syle (like fill, stroke-width) and value is the value associated.
    * @param {Function} shadeOutFN - function to be executed once new outliers are found. For every outliers
    *                              this function is called once
    * @return {Function} - a function that sets the range if legend is dragged to find the outliers. After
    *                      finding out the new outliers it executes the shadeOutFN on it function.
    */


  function applyShadeFiltering(css, shadeOutFN) {
    var algorithmAPI = algo[algorithm],
        // eslint-disable-line good-practices/no-single-usage-variable
    args,
        shadeFilter; // Initializes the filter

    shadeFilter = algorithmAPI.applyShadeFiltering(treeMaker.getBucket(), css, shadeOutFN); // eslint-disable-line good-practices/no-single-usage-variable
    // Sets the range, find the outliers and apply / perform operation on them.

    return function (limits) {
      // Modifies the argument object to send it to the filter implementation. As part of the modification
      // it pushes the limit in front of the argument object so that it become the first argument.
      args = Array.prototype.slice.call(arguments, 0);
      args.unshift(limits);
      shadeFilter.apply(treeMaker.getBucket(), args);
    };
  }
  /**
    * Create tree from the data given. It requires a root to start with.
    * @param  {Object}   nodes       - the configuration object of FusionCharts
    * @param  {Function} cleansingFn - function to get the number formatted values.
    * @param  {boolean}  update      - whether it is update state or not
    * @return {TreeNode}             - the root of the newly prepared tee
    */


  function makeTree(nodes, cleansingFn, update) {
    // todo cleansingFn should be defined when called from addData to get the number formatted values.
    var tempTree;
    treeMaker = new TreeMaker(nodes, bucketIterationMode, cleansingFn); // eslint-disable-line good-practices/no-single-usage-variable

    tempTree = treeMaker.get();

    if (update !== false) {
      tree = tempTree;
    }

    afAPI.setVisibleRoot(tempTree);
    return tempTree;
  }
  /**
    * Prepares all the arguments and call the draw function of the algorithm in use.
    * This function can not be called from outside and needs another function to return it after making
    * use of initialization parameter and setting up all the algorithm related preprocessing.
    */


  function plotTree() {
    var algorithmAPI = algo[algorithm],
        args; // initialise the realTimeModule with the configurations for drawing the nodes.

    algorithmFactory.realTimeUpdate = realTimeUpdate.apply(this, arguments); // Prepares the arguments

    args = Array.prototype.slice.call(arguments, 0);
    args.unshift(algorithmAPI); // Calls the draw function of the algorithm

    algorithmAPI.drawTree.apply(afAPI.getVisibleRoot(), args);
  }
  /**
    * Adds or deletes the nodes dynamically to the chart.
    * @return {Function} - fn to handle realtime data update
    */


  function realTimeUpdate() {
    // Initialise the function with the drawing area and rendering API.
    var rendererAPI,
        args,
        algorithmAPI = algo[algorithm]; // Prepares the arguments

    args = Array.prototype.slice.call(arguments, 0);
    args.unshift(algorithmAPI);
    rendererAPI = args.slice(-1)[0]; // eslint-disable-line good-practices/no-single-usage-variable

    return function () {
      // modifier can be either for add or delete.
      var _args = Array.prototype.slice.call(arguments, 0),
          _getCleanValue = _args.shift(),
          // eslint-disable-line good-practices/no-single-usage-variable
      // modifier determines if to add or delete the nodes/ subTree.
      modifier = _args.shift(),
          // eslint-disable-line good-practices/no-single-usage-variable
      // eslint-disable-next-line good-practices/no-function-dependency
      api = treeOpt(tree, function (visibleRoot) {
        // eslint-disable-line good-practices/no-single-usage-variable
        // Calls the draw function of the algorithm. Attached as a callback.
        algorithmAPI.drawTree.apply(visibleRoot || tree, args);
      }, rendererAPI, _getCleanValue); // api to add or delete the nodes from the tree.


      api[modifier].apply(this, _args);
    };
  }
  /**
    * Forcefully set the root of the tree. Try not to use it as this function was only created to keep state
    * over successive call of renderer.
    * @param {TreeNode} base - the root of the newly prepared tee
    * @return {TreeNode}     - the root of the newly prepared tee
    */


  function setTreeBase(base) {
    return base && (tree = base);
  }
  /**
    * Initermediate bridge function that performs the tree making operation and drawing area assignment.
    * @param {Object}   nodes - the root of the newly prepared tee
    * @param {Function} cleansingFn - function to return valid number or null if the value is invalid
    * @return {Function} - returns plotTree to call the draw the function of the algorithm
    */


  function plotOnCanvas(nodes, cleansingFn) {
    tree = makeTree(nodes, cleansingFn); //   drawingAreaMeasurement = drawingArea;

    return plotTree;
  } // AlgorithmFactory API


  algorithmFactory.init = init;
  algorithmFactory.plotOnCanvas = plotOnCanvas;
  algorithmFactory.applyShadeFiltering = applyShadeFiltering;
  algorithmFactory.setTreeBase = setTreeBase;
  algorithmFactory.realTimeUpdate = realTimeUpdate;
  algorithmFactory.makeTree = makeTree;
  return algorithmFactory;
},

/*
 * Does the additons / deletion operations on the tree
*/
treeOpt = function treeOpt(baseNode, drawTreeFn, rendererAPI, _getCleanValue) {
  // incremental change that needs to be updated in the rest of the tree due to additions/ deletions of
  // the node/subtree.
  var change;
  /**
    * Takes the path of the node to be fetched and return the node element.
    * @param {Array} path  - node reference wrt global node.
    * @return {nodeElement} node  - a particular node in the tree as per specified in the traversal path.
    */

  function getNode(path) {
    var childNode,
        index = 0,
        parentNode = baseNode;

    if (!path.length) {
      return baseNode;
    }

    while (parentNode) {
      childNode = searchSibling.call(parentNode, path[index]);

      if (index === path.length - 1 && childNode) {
        // sets the incremental change.
        change = childNode.getValue();
        return childNode;
      }

      parentNode = childNode;
      index += 1;
    }
  }
  /**
    * Searches for a node by its name amongst the siblings.
    * @param {string} label  - Label of the node being searched.
    * @return {nodeElement} node  - The node element amongst the siblings having the same label name.
    */


  function searchSibling(label) {
    // eslint-disable-line good-practices/no-function-dependency
    var index,
        node,
        sibling,
        parentNode = this,
        // eslint-disable-line good-practices/no-single-usage-variable
    childrenArr = parentNode.getChildren() || [],
        len = childrenArr.length,
        // eslint-disable-line good-practices/no-single-usage-variable
    sanitized = function sanitized(str) {
      // eslint-disable-line good-practices/no-function-dependency
      return str.toLowerCase().trim();
    };

    for (index = 0; index < len; index += 1) {
      sibling = childrenArr[index];

      if (sanitized(sibling.label) === sanitized(label)) {
        node = sibling;
        break;
      }
    }

    return node;
  }

  return {
    /*
           * Delete a node/ even a subTree from the original tree and redraw the tree if required.
           * @param path {Array} - Contains the information of the node/subtree to be deleted in reference to the
           global node.
           * @param draw {Boolean} - Whether to redraw the tree immediately after the change.
          */
    deleteData: function deleteData(path, draw) {
      // fetch the element to the corresonding path.
      var afAPI,
          // todo: RED-3367 commit refer.
      targetNode = getNode(path),
          itr = afAPI.iterator(targetNode),
          // eslint-disable-line good-practices/no-single-usage-variable
      dfItr = itr.df,
          // eslint-disable-line good-practices/no-single-usage-variable
      // detach the node element from the actual tree.
      parentNode = targetNode && targetNode.getParent(),
          leftSiblingCount = targetNode && targetNode.getSiblingCount('left'),
          // eslint-disable-line good-practices/no-single-usage-variable
      childrenArr = parentNode && parentNode.getChildren(),
          // eslint-disable-line good-practices/no-single-usage-variable
      visibleRoot = afAPI.getVisibleRoot(); // incase the path specified is not a valid one or root node is asked to remove.

      if (!targetNode || !parentNode) {
        return;
      } // set parent node to undefined, to break the parent-child links.


      childrenArr.splice(leftSiblingCount, 1);

      if (targetNode === visibleRoot) {
        visibleRoot = targetNode.getParent() || visibleRoot;
      } // generically dispose the tree to be deleted.


      while (targetNode) {
        rendererAPI.disposeItems(targetNode);
        targetNode = dfItr.next();
      } // update the tree with the reduced value responsible for this detachment.


      while (parentNode) {
        // reduces the changed value from the existing value of the parent node.
        parentNode.setValue(-change, true);
        parentNode = parentNode.getParent();
      }

      if (draw) {
        // draw the tree as per the specified algorithim.
        drawTreeFn(visibleRoot);
      }
    },
    addData: function addData(nodes, path, draw, index) {
      var afAPI,
          // todo: RED-3367 commit refer.
      algorithmFactory,
          newNode,
          tree,
          parentNode,
          oldValue,
          //   childrenArr,
      change = 0,
          // eslint-disable-line
      incremental = true,
          // eslint-disable-line good-practices/no-single-usage-variable
      visibleRoot = afAPI.getVisibleRoot(); // eslint-disable-line good-practices/no-single-usage-variable

      while (nodes.length) {
        newNode = nodes.pop();
        tree = algorithmFactory.makeTree(newNode, _getCleanValue, false);
        change = tree.getValue();
        parentNode = getNode(path || []); // incase the path specified is not a valid one

        if (!parentNode) {
          continue;
        } // if there is no child node for the insertion node, its value is over-ridden by its inserted child.


        if (!parentNode.getChildren()) {
          // cache the old value for the insertion node before the add child operation.
          oldValue = parentNode.getValue(); // flag to set the absolute value for the node.

          incremental = false;
        }

        parentNode.addChildren(tree, index); // update the tree with the added value responsible for this attachment.

        while (parentNode) {
          // increases the changed value from the existing value of the parent node.
          parentNode.setValue(change, incremental);

          if (oldValue) {
            change -= oldValue;
            oldValue = UNDEF;
            incremental = true;
          }

          parentNode = parentNode.getParent();
        }
      }

      if (draw) {
        // draw the tree as per the specified algorithim.
        drawTreeFn(visibleRoot);
      }
    }
  };
},

/**
  * Useful in managing the container elements and folding/unfolding of them.
  * @param  {Object}  afAPI             algorithm factory apis
  * @param  {Object}  containerManager  containerManagerCreator APIs [initially it is blank object]
  * @return {Object}                    contains containerManagerCreator APIs
  */
containerManagerCreator = function containerManagerCreator(afAPI, containerManager) {
  var datasetDefStore,
      drawTreeFn,
      metaInf,
      dsConf,
      rendererAPI,
      updateContainers,
      forceCSS = false,
      // eslint-disable-line good-practices/no-single-usage-variable

  /**
    * Draw the navigation bars - both the navigation history or the stacked children bar.
    * @param  {Object}   drawingAreaMeasurement  - Entire drawing area information for the entire
    *                                              bar to be drawn.
    * @param  {boolean}  isStacked               - A flag to determine if the navigation bar is a stacked or not.
    */
  drawNavigation = function drawNavigation(drawingAreaMeasurement, isStacked) {
    var navigationPath,
        len,
        colorRange = dsConf.colorRange,
        // eslint-disable-line good-practices/no-single-usage-variable
    // map the color range for fetching the css colors for drawing the bars.
    localColorProvider = afAPI.mapColorManager(dsConf, colorRange, true),
        // eslint-disable-line good-practices/no-single-usage-variable

    /**
      * Responsible for setting the elements to be placed in the navigation bar. In stacked bar, it is
      * supposedly the childNodes, where as in the navigation History bar it is traversal path to reach
      * to that node.
      * @param {boolean} isStacked  - A flag to determine if the navigation bar is a stacked or not.
      */
    setNavigationPath = function setNavigationPath(isStacked) {
      // eslint-disable-line
      // fetch the visible root for any drilled state.
      var visibleRoot = getVisibleRoot();

      if (!isStacked) {
        // fetches the traversal path of the visible root node element, i.e. fetch the traversal
        // path that was taken to reach the cuurent visible state of the tree.
        navigationPath = dsConf.navigationBarNodes = visibleRoot.getPath() || [].concat(visibleRoot);
      } else {
        // fetches the child nodes to construct the stacked bar.
        navigationPath = visibleRoot.getChildren();
      }

      navigationPath.pop(); // sets the length for the navigation path

      len = navigationPath.length;
    },

    /**
      * Determine the width of indivual segments of the constituting elements inside the bar.
      * @return {Function} - A function to overwrite the segmentRectangle to attain the above
      *                      functionality
      */
    segmentRectangle = function () {
      // store the already allocated width, incremented after every segment is drawn.
      var allocatedWidth;
      return {
        /**
          * A function to fetch the rectangular area required by the segment element.
          * @param  {Object}   drawingAreaMeasurement - Entire drawing area information for the entire
          *                                             bar to be drawn.
          * @param  {number}   pos                    - The posiiton index of the segment element to be drawn.
          * @param  {boolean}  isStacked              - A flag to construct the stacked or navigation History bar
          * @return {Object}                          - The rectangular area configuration for the segmented element.
          */
        get: function get(drawingAreaMeasurement, pos, isStacked) {
          // eslint-disable-line
          var segmentRect = {
            y: drawingAreaMeasurement.startY,
            height: drawingAreaMeasurement.effectiveHeight
          },
              node = navigationPath[pos],
              parentNode = node.getParent(); // eslint-disable-line good-practices/no-single-usage-variable
          // The segmentRectangle starts from the drawingAreMeasurement start point.

          if (allocatedWidth) {
            segmentRect._x = drawingAreaMeasurement.startX + drawingAreaMeasurement.effectiveWidth;
            segmentRect._width = 0;
          } else {
            segmentRect._x = drawingAreaMeasurement.startX;
            segmentRect._width = drawingAreaMeasurement.effectiveWidth;
          }

          segmentRect.x = allocatedWidth || (allocatedWidth = drawingAreaMeasurement.startX); // for stacked navigation path.

          if (!isStacked) {
            // incrementally add the allocated width.
            // All the elements are equispaced.
            allocatedWidth += segmentRect.width = drawingAreaMeasurement.effectiveWidth / len;
          } else {
            // for simple hierarchial navigation history bar.
            // the unit width is proportional to the value of the childnodes wrt the parent node.
            // increment the width allocation
            allocatedWidth += segmentRect.width = drawingAreaMeasurement.effectiveWidth * (node.getValue() / parentNode.getValue());
          }

          return segmentRect;
        },

        /**
          * Reset the allocated Width.
          */
        resetAllocation: function resetAllocation() {
          allocatedWidth = UNDEF;
        }
      };
    }(),
        // eslint-disable-next-line good-practices/no-function-dependency
    fetchFlatnessPosition = function fetchFlatnessPosition(startIndex, endIndex) {
      var shape;

      if (endIndex === 1) {
        shape = BOTH;
      } else if (startIndex === 0) {
        shape = LEFT;
      } else if (startIndex < endIndex - 1) {
        shape = NO;
      } else {
        shape = RIGHT;
      }

      return shape;
    },
        labelPadding = {
      // eslint-disable-line good-practices/no-single-usage-variable
      x: 5,
      y: 5
    },
        lineHeight = dsConf.parentLabelLineHeight,
        // eslint-disable-line good-practices/no-single-usage-variable
    // Gets label configuration
    getTextConf = afAPI.initConfigurationForlabel(labelPadding, lineHeight, dsConf),
        // eslint-disable-line good-practices/no-single-usage-variable
    drawPathFn = rendererAPI.drawPolyPath,
        // eslint-disable-line good-practices/no-single-usage-variable
    drawTextFn = rendererAPI.drawText,
        // eslint-disable-line good-practices/no-single-usage-variable
    drawHotFn = rendererAPI.drawHot,
        // eslint-disable-line good-practices/no-single-usage-variable
    navigationMapper = {
      navigationHistory: {
        path: 'polyPathItem',
        label: 'pathlabelItem',
        highlightItem: 'pathhighlightItem',
        hotItem: 'pathhotItem'
      }
    },
        chart = datasetDefStore.getFromEnv('chart'),
        trackerConfig = chart.config.trackerConfig,
        // legend = datasetDefStore.getFromEnv('gLegend'),
    smartLabel = datasetDefStore.getFromEnv('smartLabel'),
        clickFn = function clickFn(node) {
      return function () {
        var context = afAPI.context,
            // eslint-disable-line good-practices/no-single-usage-variable
        stateContextId = CLICKEDSTATE,
            // eslint-disable-line good-practices/no-single-usage-variable
        visibleState = VISIBLEROOT,
            // eslint-disable-line good-practices/no-single-usage-variable
        animationManager = chart.getFromEnv('animationManager'),
            stateContext = context.getInstance(stateContextId),
            // eslint-disable-line good-practices/no-single-usage-variable
        clickedState = stateContext.get(visibleState) || {};
        trackerConfig.length = 0;
        clickedState.state = DRILLUP;
        clickedState.node = [{
          virginNode: afAPI.getVisibleRoot()
        }, node];
        rendererAPI.disposeChild(node); // setting the animation state to drill for drill-up animation

        animationManager.setAnimationState('drill');
        chart.setState('drill', true); // Reset the legend once any traversal happens
        // (legend && legend.enabled) && legend.resetLegend();

        containerManager.draw([node, node, node]); // eslint-disable-next-line good-practices/no-function-dependency

        animationManager.onAnimationComplete(function () {
          chart.setState('drill', false);
        });
        chart.resetSingleTracker();
      };
    },
        // eslint-disable-next-line good-practices/no-function-dependency
    hoverInFn = function hoverInFn() {
      // eslint-disable-next-line good-practices/no-function-dependency
      return function () {
        /* // set the height proportion.
                      _heightProportion.set({
                          treeMap: 0.9,
                          navigationBar: 0,
                          stackedNavigation: 0.1
                      });
                      // draw the container box.
                      draw([node, fetchGlobalRoot(node), node]); */
      };
    },
        // eslint-disable-next-line good-practices/no-function-dependency
    hoverOutFn = function hoverOutFn() {
      // eslint-disable-next-line good-practices/no-function-dependency
      return function () {
        /* // set the height proportion.
                          _heightProportion.set({
                              treeMap: 0.9,
                              navigationBar: 0.1,
                              stackedNavigation: 0
                          });
                          // draw the container box.
                          draw(); */
      };
    },
        // eslint-disable-next-line good-practices/no-function-dependency
    toolTipFn = function toolTipFn(node) {
      return dsConf.showTooltip ? node.getLabel() : _lib.BLANKSTRING;
    },
        i,
        offset,
        pathObj,
        node,
        segmentRect,
        textConfObj,
        label,
        textConf,
        pathText,
        _setStyle = dsConf._setStyle,
        // eslint-disable-line good-practices/no-single-usage-variable
    textRect,
        navigationRatio = _heightProportion.get().navigationBar,
        // eslint-disable-line good-practices/no-single-usage-variable
    verticalPadding = 2 * _getVerticalPadding('navigationBar'),
        // eslint-disable-line good-practices/no-single-usage-variable
    navigationHeight = navigationRatio * metaInf.effectiveHeight,
        // eslint-disable-line good-practices/no-single-usage-variable
    logicalFontSize = Math.min(navigationHeight - (verticalPadding + 6), _setStyle.fontSize.replace(/\D+/g, '')),
        fontSizeStr = logicalFontSize + 'px';

    navigationMapper.stacked = {
      path: STACKED_STR + navigationMapper.navigationHistory.path,
      label: STACKED_STR + navigationMapper.navigationHistory.label,
      highlightItem: STACKED_STR + navigationMapper.navigationHistory.highlightItem,
      hotItem: STACKED_STR + navigationMapper.navigationHistory.hotItem
    };
    segmentRectangle.resetAllocation(); // get the navigation history of the visibleRoot

    setNavigationPath(isStacked);
    smartLabel.setStyle({
      fontSize: fontSizeStr,
      lineHeight: fontSizeStr
    });

    for (i = 0; i < len; i += 1) {
      node = navigationPath[i];
      segmentRect = segmentRectangle.get(drawingAreaMeasurement, i, isStacked);
      offset = (pathObj = createNavigationPath(segmentRect, isStacked ? 'both' : fetchFlatnessPosition(i, len), UNDEF, node)).offset;
      node[navigationMapper[isStacked ? 'stacked' : 'navigationHistory'].path] = drawPathFn(pathObj, localColorProvider(node, true, dsConf), node); // Get the configuration to draw text

      textConfObj = getTextConf(node, segmentRect, true);
      textConf = textConfObj.conf;
      textRect = textConf.textRect;
      textRect.width -= 2 * offset; // for vertically aligning the text.

      textRect.y = segmentRect.y + segmentRect.height / 2;
      label = smartLabel.getSmartText(textConf.label, textRect.width, Math.max(logicalFontSize, textRect.height)).text;
      pathText = drawTextFn(label, textRect, {
        textAttrs: textConfObj.attr,
        highlightAttrs: textConfObj.highlight
      }, {
        y: segmentRect.height / 10,
        'font-size': dsConf._setStyle.fontSize,
        'font-family': dsConf._setStyle.fontFamily
      }, (isStacked ? 'stacked' : '') + 'path', node);
      node[navigationMapper[isStacked ? 'stacked' : 'navigationHistory'].label] = pathText.label;
      node[navigationMapper[isStacked ? 'stacked' : 'navigationHistory'].highlightItem] = pathText.highlightMask;
      trackerConfig.push({
        node: node,
        key: navigationMapper[isStacked ? 'stacked' : 'navigationHistory'].hotItem,
        plotDetails: {
          rect: segmentRect
        },
        evtFns: {
          click: [clickFn(node, isStacked)],
          hover: [hoverInFn(node), hoverOutFn()],
          tooltip: [toolTipFn(node)]
        },
        callback: drawHotFn
      });
    }
  },

  /**
    * Fetch the drawing function for a container element.
    * @param  {string}    type  - Type of the container box
    * @return {Function}        - A function to fecth the drawing function for that type.
    */
  getDrawFn = function getDrawFn(type) {
    // map the type with the drawing functions.
    var drawFn = {
      // eslint-disable-line good-practices/no-single-usage-variable
      'treeMap': drawTree,
      'navigationBar': drawNavigation,
      'stackedNavigation': drawStackedNavigation
    }; // Returns the drawing function for a type of the container box.

    return drawFn[type];
  },

  /**
    * Set and retrive the height allocations for navigation, treemap and stacked bar.
    */
  _heightProportion = function () {
    // initial height allocations.
    var heightProportion = {
      // eslint-disable-line good-practices/no-single-usage-variable
      'treeMap': 1,
      'navigationBar': 0,
      'stackedNavigation': 0
    };
    return {
      /**
        * sets the height allocation with the parameterised input value.
        * @param {boolean}   hasNavigationBar  - whether there is navigation bar or not
        */
      set: function set(hasNavigationBar) {
        var singleLineRatio,
            navigationRatio = (0, _lib.pluckNumber)(dsConf.navigationBarHeightRatio, dsConf.navigationBarHeight / metaInf.effectiveHeight, 0.15),
            maxFontSize = dsConf.labelFontSize ? Math.max(dsConf.labelFontSize, // eslint-disable-line good-practices/no-single-usage-variable
        dsConf.baseFontSize) : dsConf.baseFontSize,
            verticalPadding = 2 * _getVerticalPadding('navigationBar'); // eslint-disable-line good-practices/no-single-usage-variable
        // 3 px gap is maintained vertically.


        singleLineRatio = (6 + maxFontSize + verticalPadding) / metaInf.effectiveHeight; // eslint-disable-line good-practices/no-single-usage-variable

        navigationRatio = Math.max(singleLineRatio, navigationRatio);

        if (navigationRatio < 0.05) {
          navigationRatio = 0.05;
        } else if (navigationRatio > 0.40) {
          navigationRatio = 0.40;
        }

        dsConf.navigationBarHeightRatio = navigationRatio;

        if (hasNavigationBar) {
          heightProportion = {
            treeMap: 1 - navigationRatio,
            navigationBar: navigationRatio,
            stackedNavigation: 0
          };
        } else {
          heightProportion = {
            treeMap: 1,
            navigationBar: 0,
            stackedNavigation: 0
          };
        }
      },

      /**
        * Fetch the height allocation defination.
        * @return {Object} - the height proportion.
        */
      get: function get() {
        return heightProportion;
      }
    };
  }(),
      allocatedHeightProp = 0,
      _getVerticalPadding = function _getVerticalPadding(type) {
    var verticalPadding = dsConf.verticalPadding,
        // eslint-disable-line good-practices/no-single-usage-variable
    plotBorderThickness = dsConf.plotBorderThickness,
        // eslint-disable-line good-practices/no-single-usage-variable
    navigationBarBorderThickness = dsConf.navigationBarBorderThickness; // eslint-disable-line good-practices/no-single-usage-variable

    return verticalPadding + (type === 'navigationBar' ? navigationBarBorderThickness : plotBorderThickness);
  },

  /**
    * Fectches the drawing area information for a particular type of container element.
    * @param {string} type  - type of the container element
    * @return {Function}    - a fucntion that takes type as input and calculate the area requirements using the
    *                         heightProportion mapping.
    */
  getDrawingArea = function getDrawingArea(type) {
    var width = metaInf.effectiveWidth,
        // eslint-disable-line good-practices/no-single-usage-variable
    height = metaInf.effectiveHeight,
        verticalPadding = _getVerticalPadding(type),
        // maps the height requirements for each type of the container element.
    heightProportion = _heightProportion.get(),
        // eslint-disable-line good-practices/no-single-usage-variable
    requiredHeightProp = heightProportion[type];

    if (allocatedHeightProp >= 1) {
      allocatedHeightProp = 0;
    }

    allocatedHeightProp += requiredHeightProp; // take the vertical padding as the seperator between the box elements.

    return {
      effectiveHeight: Math.round(requiredHeightProp * height * 100) / 100 - verticalPadding,
      effectiveWidth: width,
      startX: metaInf.startX,
      startY: metaInf.startY + verticalPadding + Math.round((allocatedHeightProp - requiredHeightProp) * height * 100) / 100
    };
  };
  /**
    * Container to draw the navigation bar or the treemap within it.
    */


  var Container = /*#__PURE__*/function () {
    function Container() {}

    var _proto5 = Container.prototype;

    /**
      * Initialise the container box with drawing configurations
      * @param {Object}   configuration  - Contains the drawingAreaMeasurement and name for the container box element.
      * @param {Function} drawFn         - Set the draw function defined for that type of container element.
      */
    _proto5.init = function init(configuration, drawFn) {
      var container = this,
          containerConf = container.conf || (container.conf = {}); // eslint-disable-line good-practices/no-single-usage-variable

      containerConf.name = configuration.name;
      container.setDrawingArea(configuration.drawingAreaMeasurement);
      container.draw = container.draw(drawFn);
    }
    /**
      * sets the drawing area for the container element
      * @param {Object} drawingAreaMeasurement  - drawing area for the container element.
      */
    ;

    _proto5.setDrawingArea = function setDrawingArea(drawingAreaMeasurement) {
      var containerConf = this.conf; // eslint-disable-line good-practices/no-single-usage-variable

      containerConf.drawingAreaMeasurement = drawingAreaMeasurement;
    }
    /**
     * drawing informations
     * @param {Function} drawFn  - Set the draw function defined for that type of container element
     * @return {Function} -
     */
    // eslint-disable-next-line
    ;

    _proto5.draw = function draw(drawFn) {
      return function () {
        var containerConf = this.conf,
            drawingAreaMeasurement = containerConf.drawingAreaMeasurement; // eslint-disable-line good-practices/no-single-usage-variable

        if (drawingAreaMeasurement.effectiveHeight > 0) {
          drawFn(containerConf.drawingAreaMeasurement);
        }
      };
    } // eslint-disable-next-line
    ;

    _proto5.eventCallback = function eventCallback() {};

    return Container;
  }();
  /**
   * Initialise the containerManager
   */


  function init() {
    var type,
        containersArr = ['navigationBar', 'treeMap', 'stackedNavigation'],
        args = Array.prototype.slice.call(arguments, 0);
    datasetDefStore = args[0]; // eslint-disable-line good-practices/no-single-usage-variable

    metaInf = args[1];
    dsConf = datasetDefStore.conf;
    rendererAPI = args[2]; // tree = args[3];

    drawTreeFn = args[4];

    if (updateContainers.get().length >= containersArr.length) {
      updateContainers.set();
    }

    while (containersArr.length) {
      type = containersArr.shift();
      updateContainers.set({
        type: type,
        drawFn: getDrawFn(type),
        drawingArea: getDrawingArea(type)
      });
    }
  }
  /**
    * Fetch the visible root.
    * @return {TreeRoot} - The visible root for the current view.
    */


  function getVisibleRoot() {
    return afAPI.getVisibleRoot();
  }
  /**
   * draws tree with specific treemap layout algorithm
   * @param {Object} drawingAreaMeasurement effective area to inform layout algorithm how much space is available
   */


  function drawTree(drawingAreaMeasurement) {
    var _temp = dsConf.plotBorderThickness; // eslint-disable-line good-practices/no-single-usage-variable

    if (forceCSS) {
      dsConf.plotBorderThickness = 0;
    }

    drawTreeFn.apply(afAPI.getVisibleRoot(), [datasetDefStore, {
      width: drawingAreaMeasurement.effectiveWidth,
      height: drawingAreaMeasurement.effectiveHeight,
      x: drawingAreaMeasurement.startX,
      y: drawingAreaMeasurement.startY,
      horizontalPadding: dsConf.horizontalPadding,
      verticalPadding: dsConf.verticalPadding
    }, rendererAPI]);
    dsConf.plotBorderThickness = _temp;
  }
  /**
    * Creates a custom path for the navigation bar element.
    * @param  {Object} rect    - Holds the basic configuration for the custom path.
    * @param  {string} shape   - Decides the shape modification required.
    * @param  {number} _offset - Decides the strech of the central angle of the navigation bar seperator.
    * @return {Object}         - path is the actual custom required path._path is the path internally might be useful in
    *                            folding in/out of the navigation bar
    */


  function createNavigationPath(rect, shape, _offset) {
    var x = rect.x,
        // eslint-disable-line good-practices/no-single-usage-variable
    y = rect.y,
        width = rect.width,
        height = rect.height,
        centerHalfAngle = dsConf.seperatorAngle / 2,
        init = ['M', x, y],
        // eslint-disable-line
    offset = (0, _lib.pluckNumber)(centerHalfAngle ? height / 2 * (1 - Math.tan(centerHalfAngle)) : _offset, 15),
        _init = ['M', rect._x, y],
        // eslint-disable-line good-practices/no-single-usage-variable
    pathFetcher = function pathFetcher(width) {
      // eslint-disable-line
      return {
        'both': ['h', width, 'v', height / 2, 'v', height / 2, 'h', -width, 'v', -height / 2, 'v', -height / 2],
        'right': ['h', width, 'v', height / 2, 'v', height / 2, 'h', -width, 'l', offset, -height / 2, 'l', -offset, -height / 2],
        'no': ['h', width, 'l', offset, height / 2, 'l', -offset, height / 2, 'h', -width, 'l', offset, -height / 2, 'l', -offset, -height / 2],
        'left': ['h', width, 'l', offset, height / 2, 'l', -offset, height / 2, 'h', -width, 'v', -height / 2, 'v', -height / 2]
      };
    };

    return {
      path: init.concat(pathFetcher(width)[shape]),
      _path: _init.concat(pathFetcher(rect._width).both),
      offset: offset
    };
  }
  /**
    * function to draw stacked navigation bar
    */


  function drawStackedNavigation() {
    var args = Array.prototype.splice.call(arguments, 0);
    args.push(true);
    getDrawFn('navigationBar').apply(this, args);
  }

  updateContainers = function () {
    var containers = [];
    return {
      get: function get() {
        return containers;
      },
      set: function set(config) {
        var container;

        if (config) {
          container = new Container();
          container.init({
            name: config.type,
            drawingAreaMeasurement: config.drawingArea
          }, config.drawFn);
          containers.push(container);
        } else {
          containers.length = 0;
        }

        return containers;
      }
    };
  }();
  /**
    * Adds all the graphics element in a pool which is again reused.
    */


  function remove() {
    var visibleRoot = afAPI.getVisibleRoot(); // dispose the elements

    visibleRoot && rendererAPI.disposeChild(visibleRoot);
  }
  /**
   * handles draw job of container
   * @param {Array} visibleRootArr  visible roots
   */


  function draw(visibleRootArr) {
    var i,
        containersArr,
        containerElement,
        visibleRoot = afAPI.getVisibleRoot(); // mark nodes for removal

    rendererAPI.disposeSelectedChildren(visibleRoot, visibleRootArr ? visibleRootArr[1] : visibleRoot); // The height proportions are set as per the target Root of the treemap container.

    visibleRootArr && (visibleRoot = visibleRootArr[1]); // no navigation bar if the target Node is the Global node.

    if (!visibleRoot.getParent()) {
      containerManager.heightProportion.set(false);
    } else if (dsConf.showNavigationBar) {
      // on every drill the height proportions are changed.
      containerManager.heightProportion.set(true);
    } // fetch the container elements.


    containersArr = updateContainers.get();

    for (i = 0; i < containersArr.length; i += 1) {
      containerElement = containersArr[i];
      containerElement.setDrawingArea(getDrawingArea(containerElement.conf.name));
      visibleRootArr && afAPI.setVisibleRoot(visibleRootArr[i]);
      containerElement.draw();
    } // remove the graphical elements of the nodes that are marked for removal after draw has occured


    rendererAPI.hideNodes();
  }

  containerManager.init = init;
  containerManager.draw = draw;
  containerManager.heightProportion = _heightProportion;
  containerManager.remove = remove;
  return containerManager;
},

/**
 * Returns the default color since no code is passed
 * @param   {string} hex color code
 * @return  {string}     a valid color code
 */
normalizeColorCode = function normalizeColorCode(hex) {
  if (!hex) {
    // Returns the default color since no code is passed
    return '#' + MOTHER_OF_ALL_COLOR;
  }

  return hex.replace(/^#*/, '#');
},
    MOTHER_OF_ALL_COLOR = 'E5E5E5',

/**
 * store refernece of APIs
 * @return {Object} - API to create tree
 */
ref = function ref() {
  var afAPI = {},
      algorithmFactory = {},
      // eslint-disable-line good-practices/no-single-usage-variable
  containerManager = {};
  return {
    afAPI: afAPICreator(afAPI, containerManager),
    algorithmFactory: algorithmFactoryCreator(afAPI, algorithmFactory, containerManager),
    containerManager: containerManagerCreator(afAPI, containerManager),
    treeOpt: treeOpt
  };
};
/**
 * Nodes are resided in the bucket in a ascending order depending on their color value.
 * It applies range-out css on the nodes if it outlies of the range.
 */


var Bucket = /*#__PURE__*/function () {
  /**
   * constructor
   */
  function Bucket() {
    this._b = [];
    this._css = UNDEF; // Default function to be operated on outliers.

    this.rangeOurEffectApplyFn = _lib.stubFN; // statePointers are simple object that remembers state. It has two properties which get updated when the
    // legend is dragged. The .value property is the value which the pointer is detecting. This value might not be
    // the one from the array elements. It can be any number between the first and last range. The .index property
    // is the index of the immediate element that just surpasses the value of .value
    // This initially points to the first element of the array. Since the array is sorted, this in turns points
    // the lowest value node. When the slider is dragged the lower pointer moves accordingly based on the value of
    // legend slider. Any nodes that resides left side of the slider are outliers.

    this.statePointerLow = {
      value: UNDEF,
      index: UNDEF
    }; // This initially points to the last element of the array. Since the array is sorted, this in turns points
    // the highest value node. When the slider is dragged the higher pointer moves accordingly based on the value of
    // legend slider. Any nodes that resides right side of the slider are outliers.

    this.statePointerHigh = {
      value: UNDEF,
      index: UNDEF
    };
  }
  /**
   * resets statePointers
   */


  var _proto6 = Bucket.prototype;

  _proto6.resetPointers = function resetPointers() {
    this.statePointerLow = {
      value: UNDEF,
      index: UNDEF
    };
    this.statePointerHigh = {
      value: UNDEF,
      index: UNDEF
    };
  }
  /**
    * Sets what operation to be performed if a node remains in the outlier area.
    * @param {Object}   css                    - the style object to be applied
    * @param {Function} rangeOurEffectApplyFn  - the function to be executed. This function is called with the
    *                                            outlier node and css.
    */
  ;

  _proto6.setRangeOutEffect = function setRangeOutEffect(css, rangeOurEffectApplyFn) {
    this._css = css;
    this.rangeOurEffectApplyFn = rangeOurEffectApplyFn;
  }
  /**
    * Place node in the bucket cumulatively in sorted manner. This use binary search and insert policy.
    * @param {TreeNode} node  - node to be inserted. Make sure the node is leaf. This does not check if the node passed
    *                           is leaf node or not.
    */
  ;

  _proto6.addInBucket = function addInBucket(node) {
    var arr = this._b,
        val = node.getColorValue(),
        minIndex = 0,
        maxIndex = arr.length - 1,
        targetIndex;

    if (!val && val !== 0) {
      return;
    } // Get position where the current node will fit in the ascending array. This position is based on the value of
    // the node.


    targetIndex = function () {
      // eslint-disable-line good-practices/no-single-usage-variable
      var _i, _elem, _elemVal; // Initially the whole array is the window. And continue until the window is shrinked to zero.


      while (minIndex <= maxIndex) {
        // Apply sort of divide and conquer to get the middle index (floored if the index is not integer). This
        // becomes the pivot element
        targetIndex = _i = (minIndex + maxIndex) / 2 | 0;
        _elem = arr[_i];
        _elemVal = _elem.getColorValue();

        if (_elemVal < val) {
          // If value of the element to be entered is greater than the current calculated pivot element value
          // shift the left hand of the window starting from the pivot element and recalculate.
          minIndex = _i + 1;
        } else if (_elemVal > val) {
          // If value of the element to be entered is less than the current calculated pivot element value
          // shift the right hand of the window starting from the pivot element and recalculate.
          maxIndex = _i - 1;
        } else {
          // Both are same. Return the current position.
          return _i;
        }
      } // Return the index which is ready for use in splice


      return ~maxIndex;
    }(); // Add the element at that location


    arr.splice(Math.abs(targetIndex), 0, node);
  }
  /**
    * Moves the lowerStatePointer and perform operation on the outliers which resides at left side of the pointer.
    * @param {Integer} value  - value according to which the lowerStatePointer would be moved.
    */
  ;

  _proto6.moveLowerShadePointer = function moveLowerShadePointer(value) {
    var arr = this._b,
        index,
        bucketElem,
        _val,
        statePtr = this.statePointerLow,
        stateIndex = statePtr.index,
        stateVal = statePtr.value,
        pointerAheadFlag = false; // Assign a initial pointer state if legend is dragged for the first time otherwise resume the previous state


    index = stateIndex = stateIndex !== UNDEF ? stateIndex : 0;
    stateVal = stateVal !== UNDEF ? stateVal : Number.NEGATIVE_INFINITY;

    if (value === stateVal) {
      // Do not move the pointer if the last state value and the current one is same.
      return;
    }

    if (stateVal <= value) {
      // If the legend is moved further right from the the last position.
      while (true) {
        // Iterate over the new changed range to find the outliers.
        bucketElem = arr[index++];
        _val = bucketElem ? bucketElem.getColorValue() : 0;

        if (value <= _val || !bucketElem) {
          // When no more outliers are to be iterated, break
          break;
        } // A flag to bring the pointer back to its correct position.


        pointerAheadFlag = true; // Apply style and execute the operation on outliers

        bucketElem.rangeOutEffect = this._css;
        this.rangeOurEffectApplyFn.call(bucketElem, this._css);
      } // Fix the pointer position


      index = pointerAheadFlag ? index - 2 : index - 1;
    } else {
      // If the legend is moved further left from the the last position.
      while (true) {
        // Remove some elements from outlier region. i.e. rollback the changes done when they were in outliers.
        bucketElem = arr[index--];
        _val = bucketElem ? bucketElem.getColorValue() : 0;

        if (value > _val || !bucketElem) {
          break;
        } // Restore the previous style which was in use before it had become a outliers


        bucketElem.cssConf = bucketElem.cssConf || {}; // A flag to bring the pointer back to its correct position.

        pointerAheadFlag = true;
        delete bucketElem.rangeOutEffect; // Forcefully made the opacity 1. This is against the guard that if the opacity is changed through
        // configuration during legend dragging

        bucketElem.cssConf.opacity = 1;
        this.rangeOurEffectApplyFn.call(bucketElem, bucketElem.cssConf);
      } // Fix the pointer position


      index = pointerAheadFlag ? index + 2 : index + 1;
    } // Saves the current state


    statePtr.index = index;
    statePtr.value = value;
  }
  /**
    * Moves the higherStatePointer and perform operation on the outliers which resides at right side of the pointer.
    * @param {Integer} value - value according to which the higherStatePointer would be moved.
    */
  ;

  _proto6.moveHigherShadePointer = function moveHigherShadePointer(value) {
    var arr = this._b,
        length = arr.length,
        // eslint-disable-line good-practices/no-single-usage-variable
    index,
        bucketElem,
        _val,
        statePtr = this.statePointerHigh,
        stateIndex = statePtr.index,
        stateVal = statePtr.value,
        pointerAheadFlag = false; // Assign a initial pointer state if legend is dragged for the first time otherwise resume the previous state


    index = stateIndex = stateIndex !== UNDEF ? stateIndex : length - 1;
    stateVal = stateVal !== UNDEF ? stateVal : Number.POSITIVE_INFINITY;

    if (value === stateVal) {
      // Donot move the pointer if the last state value and the current one is same.
      return;
    }

    if (stateVal > value) {
      // If the legend is moved further left from the the last position.
      while (true) {
        // Iterate over the new changed range to find the outliers.
        bucketElem = arr[index--];
        _val = bucketElem ? bucketElem.getColorValue() : 0;

        if (value >= _val || !bucketElem) {
          // When no more outliers are to be iterated, break
          break;
        } // A flag to bring the pointer back to its correct position.


        pointerAheadFlag = true; // Apply style and execute the operation on outliers

        bucketElem.rangeOutEffect = this._css;
        this.rangeOurEffectApplyFn.call(bucketElem, this._css);
      } // Fix the pointer position


      index = pointerAheadFlag ? index + 2 : index + 1;
    } else {
      // If the legend is moved further right from the the last position.
      while (true) {
        // Remove some elements from outlier region. i.e. rollback the changes done when they were in outliers.
        bucketElem = arr[index++];
        _val = bucketElem ? bucketElem.getColorValue() : 0;

        if (value < _val || !bucketElem) {
          break;
        } // Restore the previous style which was in use before it had become a outliers


        bucketElem.cssConf = bucketElem.cssConf || {}; // A flag to bring the pointer back to its correct position.

        pointerAheadFlag = true;
        delete bucketElem.rangeOutEffect; // Forcefully made the opacity 1. This is against the guard that if the opacity is changed through
        // configuration during legend dragging

        bucketElem.cssConf.opacity = 1;
        this.rangeOurEffectApplyFn.call(bucketElem, bucketElem.cssConf);
      } // Fix the pointer position


      index = pointerAheadFlag ? index - 2 : index - 1;
    } // Saves the current state


    statePtr.index = index;
    statePtr.value = value;
  };

  return Bucket;
}();
/**
  * Singular node in a tree. A node consists of label and value associated with it.
  * One single node can have two references. One to the children and one to the parent.
  * Using this references the complete tree can be traveresd.
  * If the the node is a leaf then reference to children (next) would be undefined.
  * If the node is the root node the refernce to the parent would be undefined.
  */


var TreeNode = /*#__PURE__*/function () {
  /**
   * connstructor function
   * @param {string}  label       - label of the node. Usually a catagory or specific item.
   * @param {Integer} value       - value of the node.
   * @param {Float}   colorValue  - color value as the range in which this node belongs to
   */
  function TreeNode(label, value, colorValue) {
    // Currently this label is unique (which should be the case ideally). This label serves the purpose of id.
    this.label = label;
    this.id = id++;
    this.value = parseFloat(value, 10);
    this.colorValue = parseFloat(colorValue, 10); // Refernce to child nodes. The tree here is a generic tree. Hence can have any number of child, and is a array.

    this.next = UNDEF; // Reference to the parent of the current node. Single treenode element, since only one node can be parent.

    this.prev = UNDEF; // Stores the meta information specific to set level like back ground color

    this.meta = {};
  }
  /**
   * fetches css property
   * @return {Object} - css config
   */


  var _proto7 = TreeNode.prototype;

  _proto7.getCSSconf = function getCSSconf() {
    return this.cssConf;
  }
  /**
   * Fetches the path wrt the global root node.
   * @return {Array}  path
   */
  ;

  _proto7.getPath = function getPath() {
    return this.path;
  }
  /**
    * Sets the path wrt the global root.
    */
  ;

  _proto7.setPath = function setPath() {
    var node = this,
        parentNode = node.getParent();
    node.path = (parentNode ? parentNode.getPath() : []).concat(node);
  }
  /**
    * Adds a child to the existing list of children of the current node.
    * Link the child nodes with the ancestors. This linking is done one at a time.
    * Since the tree is a generic one, the links are saved as sorted array.
    * @param {TreeNode}         ref - reference to the next child
    * @return {Array.<TreeNode>}    - Array of all children
    */
  ;

  _proto7.addChild = function addChild(ref) {
    // eslint-disable-line
    if (ref instanceof TreeNode) {
      // Add at the end of the existing child. If no child is present create a list.
      this.next = this.next || [];
      [].push.call(this.next, ref); // Set the parent as well

      ref.setParent(this);
    } // Return the list of updated child


    return this.next;
  }
  /**
    * Get all the children of the current node.
    * @return {Array.<TreeNode>} - Array of all children
    */
  ;

  _proto7.getChildren = function getChildren() {
    return this.next;
  }
  /**
    * add children to a specific node(parent node in this context) to a specified index.
    * Can be a multiple child insertions at a time.
    * Default index remains at the end of the object.
    * @param {TreeNode}   newNode   new tree node
    * @param {Integer}    indexVal     index where to add the node in the node array
    */
  ;

  _proto7.addChildren = function addChildren(newNode, indexVal) {
    var parentNode = this,
        index = indexVal,
        childrenArr = parentNode.getChildren() || (parentNode.next = []),
        len = childrenArr.length; // default place in the end

    if (!index) {
      index = len - 1;
    } // applying extreme conditions.


    index = index > len - 1 ? len - 1 : index < 0 ? 0 : index;
    childrenArr.splice(index, 0, newNode);
    newNode.setParent(this);
  }
  /**
    * Fetch the depth of the current node.
    * @return {number} - Depth of the node element in the tree structure.
    */
  ;

  _proto7.getDepth = function getDepth() {
    return this.meta.depth;
  }
  /**
    * Check if the node is a leaf node.
    * @param  {number}   maxDepth  -  Depth Traversal restrictions.
    * @return {boolean}            - If the node is a leaf node keeping the imposed restrictions intact.
    */
  ;

  _proto7.isLeaf = function isLeaf(maxDepth) {
    var node = this; //  if no depth restrictions being imposed, only node.next is used to determine its virginity

    return (maxDepth ? node.getDepth() < maxDepth : true) && node.next;
  }
  /**
    * Set a parent node of the current node
    * @param  {TreeNode}   ref - reference to the next child
    * @return {TreeNode}       - Current node with updated parent reference.
    */
  ;

  _proto7.setParent = function setParent(ref) {
    // eslint-disable-line
    if (ref instanceof TreeNode) {
      this.prev = ref;
    }

    return this;
  }
  /**
    * Get siblings' count of the current node
    * @param  {Enum}  side  - specifies the side from which siblings are to be counted. Can be either 'left' or 'right'
    * @return {Integer}       - sibling count including the current node
    */
  ;

  _proto7.getSiblingCount = function getSiblingCount(side) {
    var parent,
        counter = 0,
        // eslint-disable-line good-practices/no-single-usage-variable
    node = this,
        currentSibling = node;

    if (!(this instanceof TreeNode)) {
      // IF the instance is not of TreeNode which should not be case at any given point time.
      return;
    } // Traverse up the parent node, so that we get the reference to list of children


    parent = node.getParent(); //  get sibling count specific to a particular side.

    if (side) {
      while (currentSibling) {
        currentSibling = currentSibling.getSibling(side);

        if (currentSibling) {
          counter += 1;
        }
      }

      return counter;
    }

    if (parent) {
      // If parent is present, which is not the case for the root node, return the count of children.
      // Which in turns is the count of sibling.
      return parent.getChildren().length;
    }
  }
  /**
    * Get the parent of the current node.
    * @return {TreeNode} - parent
    */
  ;

  _proto7.getParent = function getParent() {
    return this.prev;
  }
  /**
    * Get the label of the current node.
    * @return {string} - label
    */
  ;

  _proto7.getLabel = function getLabel() {
    return this.label;
  }
  /**
    * Get the value of the current node.
    * @return {Integer} - value
    */
  ;

  _proto7.getValue = function getValue() {
    return this.value;
  }
  /**
    * Sets the value of the current node.
    * @param  {Integer} value        - The updated value for the node.
    * @param  {boolean} incremental  - A flag to update the value incrementally and not on absolute scale.
    */
  ;

  _proto7.setValue = function setValue(value, incremental) {
    var node = this;

    if (incremental) {
      node.value += value;
    } else {
      node.value = value;
    }
  }
  /**
    * Get the colorValue of the current node.
    * @return {Integer} - value
    */
  ;

  _proto7.getColorValue = function getColorValue() {
    return this.colorValue;
  }
  /**
    * Get the immediate sibling of the current node. The sibling can be retrieved either from the left side or right.
    * @param  {Enum} side  - specifies the side from which sibling to be retrieved. Can be either 'left' or 'right'
    * @return {TreeMap} - the sibling of the specified side
    */
  ;

  _proto7.getSibling = function getSibling(side) {
    var nSideStr = side.toLowerCase(),
        // eslint-disable-line good-practices/no-single-usage-variable
    parent = this.getParent(),
        label = this.getLabel(),
        // eslint-disable-line good-practices/no-single-usage-variable
    children,
        index,
        tLabel,
        child;

    if (!parent) {
      // If the parent is not present, means the node is root node. Hence no sibling present.
      return;
    } // Retrieves all the sibling


    children = parent.getChildren(); // Searches node by label as label name is most likely to be same in one category.

    for (index = 0; index < children.length; index++) {
      child = children[index];
      tLabel = child.getLabel();

      if (tLabel === label) {
        switch (nSideStr) {
          case 'left':
            return children[index - 1];

          case 'right':
            return children[index + 1];
        }
      }
    }
  }
  /**
    * Set the meta information. Like which is specific to a set label
    * @param {string}          key    - the key of the set label attr like color
    * @param {string | Object} value  - the value of the key
    */
  ;

  _proto7.setMeta = function setMeta(key, value) {
    this.meta[key] = value;
  }
  /**
    * Set the depth information.
    * @param {number} depth  - The level at which the node is present in reference to the tree.
    */
  ;

  _proto7.setDepth = function setDepth(depth) {
    this.meta.depth = depth;
  }
  /**
    * Get the meta information by key or completely. If the key is passed it returns back the value or the complete
    * meta information.
    * @param  {string} key  - the key of the set label attr like color
    * @return {string | Object | undefined} - the value of the key or if the key is not passed the complete meta obj.
    */
  ;

  _proto7.getMeta = function getMeta(key) {
    if (!key) {
      return this.meta;
    }

    return this.meta[key];
  };

  return TreeNode;
}();

var _default = ref;
exports["default"] = _default;

/***/ }),

/***/ 1605:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _commonspacemanager = _interopRequireDefault(__webpack_require__(519));

var _schedular = __webpack_require__(286);

var _lib = __webpack_require__(274);

var _toolbox = __webpack_require__(418);

var _treemap = _interopRequireDefault(__webpack_require__(1606));

var _helper = _interopRequireDefault(__webpack_require__(1608));

var _dependencyManager = __webpack_require__(282);

var _singleseriesDataset = _interopRequireDefault(__webpack_require__(594));

var _legendSpacemanager = __webpack_require__(627);

var _legend = _interopRequireDefault(__webpack_require__(629));

var _colorrange = _interopRequireDefault(__webpack_require__(1444));

var _legendmanager = _interopRequireDefault(__webpack_require__(1448));

var _mouseTracker = _interopRequireDefault(__webpack_require__(592));

var _redraphaelShapes = _interopRequireDefault(__webpack_require__(442));

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }] */
var Raphael = (0, _dependencyManager.getDep)('redraphael', 'plugin'),
    // mathRound = Math.round,
MOUSEOUT = 'fc-mouseout',
    UNDEF; // TRACKER_FILL = 'rgba(255,0,0,' + (isIE ? 0.002 : 0.000001) + ')'; // invisible but clickable
// Resolve dependency to draw button shape

(0, _redraphaelShapes.default)(Raphael); // Icon drawing at toolbar. Back and reset button.

Raphael.addSymbol({
  backIcon: function backIcon(x, y, radius) {
    var rad = radius - 1,
        x1 = x,
        // eslint-disable-line good-practices/no-single-usage-variable
    y1 = y - rad,
        // eslint-disable-line good-practices/no-single-usage-variable
    x2 = x - rad,
        // eslint-disable-line good-practices/no-single-usage-variable
    y2 = y,
        // eslint-disable-line good-practices/no-single-usage-variable
    x3 = x,
        y3 = y + rad,
        x4 = x3,
        y4 = y3 - rad / 2,
        x5 = x4 + rad,
        y5 = y4,
        x6 = x5,
        // eslint-disable-line good-practices/no-single-usage-variable
    y6 = y5 - rad,
        // eslint-disable-line good-practices/no-single-usage-variable
    x7 = x5 - rad,
        // eslint-disable-line good-practices/no-single-usage-variable
    y7 = y6; // eslint-disable-line good-practices/no-single-usage-variable

    return ['M', x1, y1, 'L', x2, y2, x3, y3, x4, y4, x5, y5, x6, y6, x7, y7, 'Z'];
  },
  homeIcon: function homeIcon(x, y, radius) {
    var rad = radius - 1,
        len = rad * 2,
        x1 = x,
        // eslint-disable-line good-practices/no-single-usage-variable
    y1 = y - rad,
        // eslint-disable-line good-practices/no-single-usage-variable
    x2 = x - rad,
        y2 = y,
        x3 = x2 + len / 6,
        y3 = y2,
        // eslint-disable-line good-practices/no-single-usage-variable
    x4 = x3,
        y4 = y + rad,
        x5 = x4 + len / 4,
        y5 = y4,
        x6 = x5,
        y6 = y5 - rad / 2,
        x7 = x6 + len / 6,
        y7 = y6,
        // eslint-disable-line good-practices/no-single-usage-variable
    x8 = x7,
        // eslint-disable-line good-practices/no-single-usage-variable
    y8 = y6 + rad / 2,
        x9 = x7 + len / 4,
        y9 = y8,
        x10 = x9,
        // eslint-disable-line good-practices/no-single-usage-variable
    y10 = y9 - rad,
        x11 = x9 + len / 6,
        // eslint-disable-line good-practices/no-single-usage-variable
    y11 = y10; // eslint-disable-line good-practices/no-single-usage-variable

    return ['M', x1, y1, 'L', x2, y2, x3, y3, x4, y4, x5, y5, x6, y6, x7, y7, x8, y8, x9, y9, x10, y10, x11, y11, 'Z'];
  }
});
/**
 * chart API of treemap
 */

var TreeMap = /*#__PURE__*/function (_CommonSpaceManager) {
  (0, _inheritsLoose2.default)(TreeMap, _CommonSpaceManager);

  /**
   * Provides the name of the chart extension
   *
   * @static
   * @return {string} The name of the chart extension
   */
  TreeMap.getName = function getName() {
    return 'TreeMap';
  }
  /**
   * constructor function of this class
   */
  ;

  function TreeMap() {
    var _this;

    _this = _CommonSpaceManager.call(this) || this;
    _this._lastAttached = {};
    _this.hasGradientLegend = true;

    _this.addToEnv('ref', (0, _helper.default)());

    _this.registerFactory('legend', _legend.default); // decide and create legend after creating canvas


    _this.registerFactory('legend', _legendmanager.default, ['canvas']); // create color manager after creating legend-decider


    _this.registerFactory('colormanager-decider', _colorrange.default, ['legend']);

    _this.registerFactory('mouseTracker', _mouseTracker.default);

    _this.registerFactory('dataset', _singleseriesDataset.default, ['vCanvas']);

    return _this;
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */


  var _proto = TreeMap.prototype;

  _proto.getName = function getName() {
    return 'TreeMap';
  }
  /**
   * parse defualt configuration of the chart
   */
  ;

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _CommonSpaceManager.prototype.__setDefaultConfig.call(this);

    this.config.enablemousetracking = true;
    this.config.skipCanvasDrawing = true;
    this.config.valuefontbold = 0;
  }
  /**
   * Configures the chart component
   * @param {Object} dataObj User input json
   */
  ;

  _proto.configureAttributes = function configureAttributes(dataObj) {
    var iapi = this;
    iapi.config.skipConfigureIteration = {};
    iapi.config.valuesset = false;
    iapi.parseChartAttr(dataObj);
    iapi.createComponent(dataObj);
    iapi.setTooltipStyle();
    iapi.configureChildren(); // after configure chart calls its async draw
  };

  _proto.mouseoutHandler = function mouseoutHandler(e, _lastDatasetIndex, _lastPointIndex) {
    var chart = this,
        datasets = chart.config.datasetOrder || chart.getDatasets(),
        // eslint-disable-line good-practices/no-single-usage-variable
    mouseTracker = chart.getChildren('mouseTracker')[0];

    datasets[_lastDatasetIndex]._firePlotEvent(MOUSEOUT, _lastPointIndex, e); // delete stored last ds details


    delete mouseTracker._lastDatasetIndex;
    delete mouseTracker._lastPointIndex;
  }
  /**
   * This method delegates the handling of  mouse event to the chart's event handler
   * @param  {Object} e The Event Object
   * @param  {Object} data The data object
   * @private
   */
  ;

  _proto._mouseEvtHandler = function _mouseEvtHandler(e, data) {
    var chart = this,
        mouseTracker = data.mouseTracker,
        oriEvent = e.originalEvent,
        // eslint-disable-line good-practices/no-single-usage-variable
    chartConfig = chart.config,
        canvasLeft = chartConfig.canvasLeft,
        // eslint-disable-line good-practices/no-single-usage-variable
    canvasRight = chartConfig.canvasRight,
        // eslint-disable-line good-practices/no-single-usage-variable
    canvasBottom = chartConfig.canvasBottom,
        // eslint-disable-line good-practices/no-single-usage-variable
    canvasTop = chartConfig.canvasTop,
        // eslint-disable-line good-practices/no-single-usage-variable
    datasets = chartConfig.datasetOrder || chart.getDatasets(),
        coordinate = (0, _lib.getMouseCoordinate)(chart.getFromEnv('chart-container'), oriEvent, chart),
        chartX = coordinate.chartX,
        chartY = coordinate.chartY,
        dataset,
        hoveredInfo,
        pointFound = false,
        i = datasets.length,
        j,
        l,
        derivedEvensInfo,
        _lastDatasetIndex = mouseTracker._lastDatasetIndex,
        _lastPointIndex = mouseTracker._lastPointIndex; // @todo we have to implement this for charts with more than one canvas like candle stick
    // if inside the canvas

    if (chartX > canvasLeft && chartX < canvasRight && chartY > canvasTop && chartY < canvasBottom || chart.config.plotOverFlow) {
      // @todo make sure the datasets are as per their z-order
      while (i-- && !pointFound) {
        dataset = datasets[i];

        if (dataset) {
          hoveredInfo = dataset._getHoveredPlot && dataset._getHoveredPlot(chartX, chartY);

          if (hoveredInfo && hoveredInfo.hovered) {
            pointFound = true;
            hoveredInfo.datasetIndex = i;
            derivedEvensInfo = mouseTracker.getMouseEvents(e, hoveredInfo.datasetIndex, hoveredInfo.pointIndex);
          }
        }
      }
    } // @todo instead of sending event names, create a event object of that type and send it
    // fire out on last hovered plot


    if ((!pointFound || derivedEvensInfo && derivedEvensInfo.fireOut) && _lastDatasetIndex !== UNDEF) {
      if (datasets[_lastDatasetIndex] && datasets[_lastDatasetIndex]._firePlotEvent) {
        // when mouseout is fired and there aren't any events that need to be fired over the current plot,
        // call mouseouthandler through settimeout.
        if (derivedEvensInfo && !derivedEvensInfo.events.length) {
          mouseTracker.mouseoutTimer = setTimeout(function () {
            chart.mouseoutHandler(e, _lastDatasetIndex, _lastPointIndex);
          }, 20);
        } else {
          chart.mouseoutHandler(e, _lastDatasetIndex, _lastPointIndex);
          clearTimeout(mouseTracker.mouseoutTimer);
        }
      } // @todo scope to have sticky tracked tooltip

    } // fire remaining events


    if (pointFound) {
      l = derivedEvensInfo.events && derivedEvensInfo.events.length;

      if (l) {
        // store the index of the hovered DS and plot
        mouseTracker._lastDatasetIndex = hoveredInfo.datasetIndex;
        _lastPointIndex = mouseTracker._lastPointIndex = hoveredInfo.pointIndex;
      }

      for (j = 0; j < l; j += 1) {
        dataset && dataset._firePlotEvent && dataset._firePlotEvent(derivedEvensInfo.events[j], _lastPointIndex, e);
      }
    }
  }
  /**
   * Checks whether the chart specific data is valid or not.
   * @return {boolean} if JSON data is valid or not
   */
  ;

  _proto._checkInvalidSpecificData = function _checkInvalidSpecificData() {
    var jsonData = this.getFromEnv('dataSource'); // eslint-disable-line good-practices/no-single-usage-variable

    if (!jsonData.data) {
      return true;
    }
  }
  /**
    * Remove a node from the specified path.
    * tree {Object} - A subtree or even a single node
    * path {Array} - Specify the position of the node to be removed wrt the root node for the tree. The last
    * value in path here denotes the insertion point of the tree. Elements insertion orders have a visual effect on
    * the slice and dice algorithims.
    * draw {Boolean} - A flag when set to false, will not update the visual after the removal.
    */
  ;

  _proto.addData = function addData() {
    var ref = this.getFromEnv('ref'),
        // eslint-disable-line good-practices/no-single-usage-variable
    algorithmFactory = ref.algorithmFactory,
        // eslint-disable-line good-practices/no-single-usage-variable
    args = Array.prototype.slice.call(arguments, 0);
    args.unshift('addData'); // attaching the data cleaning function for applying number formatting

    args.unshift(this._getCleanValue());
    algorithmFactory.realTimeUpdate.apply(this, args);
  }
  /**
    * Remove a node from the specified path.
    * path {Array} - Specify the position of the node to be removed wrt the root node for the tree.
    * draw {Boolean} - A flag when set to false, will not update the visual after the removal.
    */
  ;

  _proto.removeData = function removeData() {
    var ref = this.getFromEnv('ref'),
        // eslint-disable-line good-practices/no-single-usage-variable
    algorithmFactory = ref.algorithmFactory,
        // eslint-disable-line good-practices/no-single-usage-variable
    args = Array.prototype.slice.call(arguments, 0);
    args.unshift('deleteData'); // attaching the data cleaning function for applying number formatting

    args.unshift(this._getCleanValue());
    algorithmFactory.realTimeUpdate.apply(this, args);
  }
  /**
   * to trigger kd tree partitioning
   */
  ;

  _proto.triggerKDTreePartioning = function triggerKDTreePartioning() {
    var dataset = this.getDatasets()[0];
    dataset.addJob('partitioning', dataset.kdTreePartioning.bind(dataset), _schedular.priorityList.tracker);
  }
  /**
   * to reset css property of tracker element
   */
  ;

  _proto.resetSingleTracker = function resetSingleTracker() {
    var dataset = this.getDatasets()[0],
        singleTracker = dataset && dataset.graphics && dataset.graphics.singleTracker;
    singleTracker && singleTracker.attr({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      stroke: 'rgba(255,255,255,0)',
      'fill-opacity': 0
    });
  }
  /**
   * function to calculate and allote space for legend
   */
  ;

  _proto._manageLegendSpace = function _manageLegendSpace() {
    _legendSpacemanager._manageLegendSpace.call(this);
  }
  /**
  * function to calculate and allote space for gradient legend
  * @param {number} allottedSpace alloted space for gradient legend
  * @return {Object} calculated dimension
  */
  ;

  _proto.manageGradientLegendSpace = function manageGradientLegendSpace(allottedSpace) {
    return _legendSpacemanager.manageGradientLegendSpace.call(this, allottedSpace);
  }
  /**
   * to flush out kdTree
   */
  ;

  _proto.flushKDTree = function flushKDTree() {
    var dataset = this.getDatasets()[0]; // eslint-disable-line good-practices/no-single-usage-variable

    dataset.kdTree = {};
  }
  /**
   * Create a toolbox with a context menu.
   * Add context menus for export and print options if enabled.
   * Create the chart Menu bar as a chart component.
   */
  ;

  _proto.attachMenuButtons = function attachMenuButtons() {
    _CommonSpaceManager.prototype.attachMenuButtons.call(this);

    var chart = this,
        config = chart.config,
        toolBar,
        toolBarType = config.toolbarVAlign === 't' ? 'chartMenuBar' : 'actionBar',
        toolConf = chart.getFromEnv('tool-config');
    toolBar = chart.getChildren(toolBarType)[0];

    for (var i = 0; i < 2; i++) {
      toolBar.attachChild(_toolbox.Tool, 'tool', (i === 0 ? 'home' : 'back') + "-" + toolBar.getId() + "-" + chart.getId());
    }

    toolBar.getChild("back-" + toolBar.getId() + "-" + chart.getId()).configure(Object.assign({}, toolConf, {
      name: 'backIcon',
      isHidden: true
    }));
    toolBar.getChild("home-" + toolBar.getId() + "-" + chart.getId()).configure(Object.assign({}, toolConf, {
      name: 'homeIcon',
      isHidden: true
    }));
    chart.addToEnv('toolbarBtns', {
      back: toolBar.getChild("back-" + toolBar.getId() + "-" + chart.getId()),
      home: toolBar.getChild("home-" + toolBar.getId() + "-" + chart.getId())
    });
  }
  /**
    * return a valid value as per the input [either number or null]
    * @return {Function} Returning the number formatted value.
    */
  ;

  _proto._getCleanValue = function _getCleanValue() {
    var numberFormatter = this.getFromEnv('number-formatter'); // eslint-disable-line good-practices/no-single-usage-variable
    // storing the reference for number formatter for future use.

    return function (value) {
      return numberFormatter.getCleanValue(value);
    };
  }
  /**
   * This method return the dataset definations for this charts
   * @return {Object}       TreeMap dataset definition
   */
  ;

  _proto.getDSdef = function getDSdef() {
    return _treemap.default;
  };

  return TreeMap;
}(_commonspacemanager.default);

var _default = TreeMap;
exports["default"] = _default;

/***/ }),

/***/ 1607:
/***/ ((__unused_webpack_module, exports) => {



exports.__esModule = true;
exports["default"] = void 0;
var _default = {
  '*.dataset.treeMap': function datasetTreeMap() {
    var dataset = this,
        canvasConfig = dataset.getFromEnv('canvasConfig'),
        canvasYCentre = canvasConfig.canvasLeft + canvasConfig.canvasHeight / 2,
        canvasXCentre = canvasConfig.canvasWidth / 2 + canvasConfig.canvasTop,
        labelAnim = {
      appearing: [{
        initialAttr: {
          opacity: 0
        },
        finalAttr: {
          opacity: 1
        },
        slot: 'final'
      }],
      updating: [{
        initialAttr: {
          opacity: 0
        },
        finalAttr: {
          opacity: 1
        },
        slot: 'final'
      }],
      disappearing: [{
        initialAttr: {
          opacity: 1
        },
        finalAttr: {
          opacity: 0
        },
        slot: 'initial'
      }]
    },
        pathAnim = {
      appearing: [{
        initialAttr: {
          opacity: 0
        },
        finalAttr: {
          opacity: 1
        },
        slot: 'final'
      }],
      updating: function updating(inputJSON) {
        var elPresent = typeof inputJSON.el !== 'string';
        return [{
          initialAttr: {
            opacity: 0,
            path: elPresent ? inputJSON.el.attr('path') : inputJSON.attr.path
          },
          finalAttr: {
            opacity: 1,
            path: inputJSON.attr.path
          },
          slot: 'final'
        }];
      }
    },
        plotAnim = {
      appearing: function appearing() {
        return [{
          initialAttr: {
            x: canvasXCentre,
            y: canvasYCentre,
            width: 0,
            height: 0,
            opacity: 0
          },
          finalAttr: {
            opacity: 1
          },
          slot: 'plot'
        }];
      },
      disappearing: [{
        finalAttr: {
          opacity: 0
        },
        slot: 'initial'
      }],
      updating: function updating(inputJSON) {
        var x = inputJSON.props.prev && inputJSON.props.prev.x === inputJSON.attr.x,
            y = inputJSON.props.prev && inputJSON.props.prev.y === inputJSON.attr.y,
            h = inputJSON.props.prev && inputJSON.props.prev.height === inputJSON.attr.height,
            w = inputJSON.props.prev && inputJSON.props.prev.width === inputJSON.attr.width;

        if (x && y && h && w) {
          return [{
            initialAttr: {
              opacity: 0
            },
            finalAttr: {
              opacity: 1
            },
            slot: 'final'
          }];
        }

        if (inputJSON.props.prev) {
          return [{
            initialAttr: {
              x: inputJSON.props.prev.x,
              y: inputJSON.props.prev.y,
              width: inputJSON.props.prev.width,
              height: inputJSON.props.prev.height
            },
            slot: 'plot'
          }];
        }

        return [{
          initialAttr: {
            x: inputJSON.attr.x,
            y: inputJSON.attr.y,
            width: inputJSON.attr.width,
            height: inputJSON.attr.height
          },
          slot: 'plot'
        }];
      }
    };
    return {
      'rect.appearing': plotAnim.appearing,
      'rect.updating': plotAnim.updating,
      'rect.disappearing': plotAnim.disappearing,
      'path.appearing': pathAnim.appearing,
      'path.updating': pathAnim.updating,
      'path.disappearing': plotAnim.disappearing,
      'labelItem.appearing': labelAnim.appearing,
      'labelItem.updating': labelAnim.updating,
      'labelItem.disappearing': labelAnim.disappearing,
      'highlightItem.appearing': labelAnim.appearing,
      'highlightItem.updating': labelAnim.updating,
      'highlightItem.disappearing': labelAnim.disappearing,
      'gen.disappearing': labelAnim.disappearing,
      '*': null
    };
  }
};
exports["default"] = _default;

/***/ }),

/***/ 1606:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(292));

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _componentInterface = __webpack_require__(290);

var _schedular = __webpack_require__(286);

var _lib = __webpack_require__(274);

var _dependencyManager = __webpack_require__(282);

var _index = _interopRequireDefault(__webpack_require__(1607));

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }] */
var UNDEF,
    HIDDEN = 'hidden',
    DEFAULT_CURSOR = _lib.preDefStr.DEFAULT,
    POINTER = 'pointer',
    MOUSEOVER = 'mouseOver',
    ROLLOVER = 'DataPlotRollOver',
    HIDDEN_STR = 'hidden',
    ROUND_STR = 'round',

/**
 * Helper function to create a RedRaphael group.
 * @param  {string} groupName                Name of the group to be created.
 * @param  {Element} parentContainer         The parent container in which the group will be appended.
 * @param {Object} dataset The concerned dataset
 * @return {Element}                         The group that was created.
 */
createGroup = function createGroup(groupName, parentContainer, dataset) {
  return dataset.getFromEnv('animationManager').setAnimation({
    el: 'group',
    attr: {
      name: groupName
    },
    container: parentContainer,
    state: 'appearing',
    component: dataset,
    doNotRemove: true,
    label: 'group'
  });
},
    // Check a point is in range w.r.t
// to given range
inRange = function inRange(a, r1, r2) {
  return a >= r1 && a <= r2;
},
    swap = function swap(arr, i, j) {
  var tmp = arr[i]; // eslint-disable-line good-practices/no-single-usage-variable

  arr[i] = arr[j];
  arr[j] = tmp;
},

/* eslint-disable require-jsdoc */
kdTreeAbs = function kdTreeAbs(arrVal) {
  'use strict'; // Max radius will be tolerance

  var arr = arrVal,
      tolerance = arr && arr[0] && arr[0].plotDetails.rect || 5,
      i,
      max = Math.max,
      floor = Math.floor,
      sqrt = Math.sqrt,
      min = Math.min,
      log = Math.log,
      exp = Math.exp,
      pow = Math.pow,
      result = {}; // eslint-disable-line good-practices/no-single-usage-variable

  arr = arr || []; // Find tolerance as the max radius
  // of the element

  for (i = arr.length; i--;) {
    if (arr[i].r > tolerance) {
      tolerance = arr[i].r;
    } // Setting the index


    arr[i].x = +arr[i].plotDetails.rect.x;
    arr[i].y = +arr[i].plotDetails.rect.y;
  } // KdTree Definition below


  function buildKdTree(arr, leftVal, rightVal, isY) {
    // eslint-disable-line
    var ob = {},
        mid,
        left = leftVal,
        right = rightVal,
        access = isY ? 'y' : 'x';

    if (left === right) {
      ob.point = arr[left];
      return ob;
    }

    if (right - left === 1) {
      if (arr[left][access] > arr[right][access]) {
        ob.point = arr[left];
        ob.left = {
          point: arr[right]
        };
      } else {
        ob.point = arr[right];
        ob.left = {
          point: arr[left]
        };
      }

      return ob;
    }

    mid = left + right >> 1;

    if (isY) {
      quickselectY(arr, mid, left, right);
    } else {
      quickselectX(arr, mid, left, right);
    }

    ob.point = arr[mid];
    ob.left = buildKdTree(arr, left, mid - 1, !isY);
    ob.right = buildKdTree(arr, mid + 1, right, !isY);
    return ob;
  }

  function quickselectX(arr, k, leftVal, rightVal) {
    // eslint-disable-line
    var left = leftVal,
        right = rightVal,
        n,
        m,
        z,
        s,
        sd,
        newLeft,
        newRight,
        t,
        i,
        j; // eslint-disable-line

    while (right > left) {
      if (right - left > 600) {
        n = right - left + 1;
        m = k - left + 1;
        z = log(n);
        s = 0.5 * exp(2 * z / 3);
        sd = 0.5 * sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
        newLeft = max(left, floor(k - m * s / n + sd));
        newRight = min(right, floor(k + (n - m) * s / n + sd));
        quickselectX(arr, k, newLeft, newRight);
      }

      t = arr[k];
      i = left;
      j = right;
      swap(arr, left, k);

      if (arr[right].x > t.x) {
        swap(arr, left, right);
      }

      while (i < j) {
        swap(arr, i, j);
        i++;
        j--;

        while (arr[i].x < t.x) {
          i++;
        }

        while (arr[j].x > t.x) {
          j--;
        }
      }

      if (arr[left].x === t.x) {
        swap(arr, left, j);
      } else {
        j++;
        swap(arr, j, right);
      }

      if (j <= k) {
        left = j + 1;
      }

      if (k <= j) {
        right = j - 1;
      }
    }
  }

  function quickselectY(arr, k, leftVal, rightVal) {
    // eslint-disable-line
    var left = leftVal,
        right = rightVal,
        n,
        m,
        z,
        s,
        sd,
        newLeft,
        newRight,
        t,
        i,
        // eslint-disable-line
    j;

    while (right > left) {
      if (right - left > 600) {
        n = right - left + 1;
        m = k - left + 1;
        z = log(n);
        s = 0.5 * exp(2 * z / 3);
        sd = 0.5 * sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
        newLeft = max(left, floor(k - m * s / n + sd));
        newRight = min(right, floor(k + (n - m) * s / n + sd));
        quickselectY(arr, k, newLeft, newRight);
      }

      t = arr[k];
      i = left;
      j = right;
      swap(arr, left, k);

      if (arr[right].y > t.y) {
        swap(arr, left, right);
      }

      while (i < j) {
        swap(arr, i, j);
        i++;
        j--;

        while (arr[i].y < t.y) {
          i++;
        }

        while (arr[j].y > t.y) {
          j--;
        }
      }

      if (arr[left].y === t.y) {
        swap(arr, left, j);
      } else {
        j++;
        swap(arr, j, right);
      }

      if (j <= k) {
        left = j + 1;
      }

      if (k <= j) {
        right = j - 1;
      }
    }
  }

  result = {
    // eslint-disable-line good-practices/no-single-usage-variable
    tree: buildKdTree(arr, 0, arr.length - 1, false),
    search: function search(x, y) {
      // Helper function for search
      // to apply data if found
      // eslint-disable-next-line
      function apply(ob) {
        var currentHovered = inRange(x, ob.x1, ob.x2) && inRange(y, ob.y1, ob.y2),
            currentDist = calcDist(x, y, ob.point.x, ob.point.y);

        if (!res) {
          res = ob;
          lastHovered = currentHovered;
          lastDist = currentDist;
          return;
        }

        if (currentHovered) {
          if (lastHovered) {
            if (ob.point.i > res.point.i) {
              res = ob;
              lastHovered = currentHovered;
              lastDist = currentDist;
            }
          } else {
            res = ob;
            lastHovered = currentHovered;
            lastDist = currentDist;
          }
        } else {
          if (!lastHovered) {
            if (currentDist < lastDist) {
              res = ob;
              lastHovered = currentHovered;
              lastDist = currentDist;
            }
          }
        }
      } // Calculate  distance between two points
      // eslint-disable-next-line


      function calcDist(x, y, p, q) {
        return sqrt(pow(x - p, 2) + pow(y - q, 2));
      } // X and Y searching different for
      // maintaing performance


      function searchX(ob) {
        // Not found
        if (!ob || !ob.point) {
          return;
        } // If match found return


        if (inRange(ob.point.x, x1, x2) && inRange(ob.point.y, y1, y2)) {
          apply(ob);
        } // If smaller x1 go left


        if (x1 <= ob.point.x) {
          searchY(ob.left);
        } // If bigger x2 goto right


        if (x2 >= ob.point.x) {
          searchY(ob.right);
        }
      }

      function searchY(ob) {
        // Not found
        if (!ob || !ob.point) {
          return;
        } // If match found return


        if (inRange(ob.point.x, x1, x2) && inRange(ob.point.y, y1, y2)) {
          apply(ob);
        } // If smaller x1 go left


        if (y1 <= ob.point.y) {
          searchX(ob.left);
        } // If bigger x2 goto right


        if (y2 >= ob.point.y) {
          searchX(ob.right);
        }
      } // Actual search logic


      var tree = this.tree,
          // eslint-disable-line good-practices/no-single-usage-variable
      res,
          x1 = x - tolerance,
          x2 = x + tolerance,
          y1 = y - tolerance,
          y2 = y + tolerance,
          lastHovered = false,
          lastDist = 0; // eslint-disable-line good-practices/no-single-usage-variable

      searchX(tree); // Return point otherwise undefined value

      return res && res.point || res;
    },
    // eslint-disable-next-line good-practices/no-function-dependency
    searchTreemap: function searchTreemap(x, y) {
      var res,
          // Higher index will be the result
      apply = function apply(ob) {
        if (!res) {
          res = ob;
          return;
        }

        if (ob.i > res.i) {
          res = ob;
        }
      },
          search = function search(ob, isY) {
        // Not found
        if (!ob || !ob.point) {
          return;
        }

        var x1 = ob.point.x,
            x2 = x1 + ob.point.plotDetails.rect.width,
            y1 = ob.point.y,
            y2 = y1 + ob.point.plotDetails.rect.height;
        ob.point.x2 = x2;
        ob.point.y2 = y2; // Found

        if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
          apply(ob.point);
        }

        search(ob.left, !isY);
        search(ob.right, !isY);
      };

      search(this.tree, false);
      return res;
    }
  }; // ------
  // eslint-disable-next-line good-practices/no-function-dependency

  arr.sort(function (a, b) {
    return a.i - b.i;
  });
  return result;
};
/* eslint-enable require-jsdoc */


(0, _dependencyManager.addDep)({
  name: 'treeMapAnimation',
  type: 'animationRule',
  extension: _index.default
});
/**
 * Dataset for treemap
 */

var TreeMapDS = /*#__PURE__*/function (_ComponentInterface) {
  (0, _inheritsLoose2.default)(TreeMapDS, _ComponentInterface);

  /**
   * constructor fn
   */
  function TreeMapDS() {
    var _this;

    _this = _ComponentInterface.call(this) || this;
    var datasetDefStore = (0, _assertThisInitialized2.default)(_this); // Stub for saving all the child component

    datasetDefStore.components = {}; // Stub for saving all the computed configuration

    datasetDefStore.conf = {}; // Stub for saving all the graphics component

    datasetDefStore.graphics = {
      elemStore: {
        rect: [],
        label: [],
        highlight: [],
        hot: [],
        polypath: []
      }
    };
    return _this;
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */


  var _proto = TreeMapDS.prototype;

  _proto.getName = function getName() {
    return 'treeMap';
  }
  /**
    * Function for parsing all the attributes and value given by the user at chart,dataset and set level.
    * This function is called once from the init() function of the Column class.
    * @param  {Object} datasetJSON JSON for dataset configurations
    */
  ;

  _proto.configureAttributes = function configureAttributes(datasetJSON) {
    if (!datasetJSON) {
      return;
    }

    this.config.JSONData = datasetJSON.data[0];
    var algorithm,
        maxDepth,
        showNavigationBar,
        datasetDefStore = this,
        chart = datasetDefStore.getFromEnv('chart'),
        // eslint-disable-line good-practices/no-single-usage-variable
    dsConf = datasetDefStore.conf,
        rawChartAttr = chart.getFromEnv('chart-attrib');
    dsConf.metaTreeInf = {};
    algorithm = rawChartAttr.algorithm || 'squarified'; // eslint-disable-line good-practices/no-single-usage-variable

    dsConf.algorithm = algorithm.toLowerCase();
    dsConf.range = UNDEF; // horizontalPadding and verticalPadding is the separation space between parent drawing area
    // and child drawing area

    dsConf.horizontalPadding = (0, _lib.pluckNumber)(rawChartAttr.horizontalpadding, 5);
    dsConf.horizontalPadding = dsConf.horizontalPadding < 0 ? 0 : dsConf.horizontalPadding;
    dsConf.verticalPadding = (0, _lib.pluckNumber)(rawChartAttr.verticalpadding, 5);
    dsConf.verticalPadding = dsConf.verticalPadding < 0 ? 0 : dsConf.verticalPadding; // Hides the node which are not leaf nodes by using all the available spaces.
    // This attribute including horizontalPadding and verticalPadding is used to display only the child nodes

    dsConf.showParent = (0, _lib.pluckNumber)(rawChartAttr.showparent, 1);
    dsConf.showChildLabels = (0, _lib.pluckNumber)(rawChartAttr.showchildlabels, 0);
    dsConf.showHoverEffect = (0, _lib.pluckNumber)(rawChartAttr.showhovereffect, 1); // Hovers on all the leaf nodes which belong to a particular parent. Disbales single leaf hovering

    dsConf.highlightParentsOnHover = (0, _lib.pluckNumber)(rawChartAttr.highlightparentsonhover, 0); // Background color of nodes which are not leaf nodes. The leaf nodes color is managed by
    // the colorRangeManager

    dsConf.defaultParentBGColor = (0, _lib.pluck)(rawChartAttr.defaultparentbgcolor, UNDEF);
    dsConf.defaultNavigationBarBGColor = (0, _lib.pluck)(rawChartAttr.defaultnavigationbarbgcolor, dsConf.defaultParentBGColor);
    dsConf.showTooltip = (0, _lib.pluckNumber)(rawChartAttr.showtooltip, 1); // Font cosmetics

    dsConf.baseFontSize = (0, _lib.pluckNumber)(rawChartAttr.basefontsize, 10);
    dsConf.baseFontSize = dsConf.baseFontSize < 1 ? 1 : dsConf.baseFontSize;
    dsConf.labelFontSize = (0, _lib.pluckNumber)(this.computeFontSize(rawChartAttr.labelfontsize), UNDEF);
    dsConf.labelFontSize = dsConf.labelFontSize < 1 ? 1 : dsConf.labelFontSize;
    dsConf.baseFont = (0, _lib.pluck)(rawChartAttr.basefont, 'Verdana, Sans');
    dsConf.labelFont = (0, _lib.pluck)(rawChartAttr.labelfont, UNDEF);
    dsConf.showTextOutline = (0, _lib.pluckNumber)(rawChartAttr.textoutline, 0);
    dsConf.baseFontColor = (0, _lib.pluck)(rawChartAttr.basefontcolor, '#000000').replace(/^#?([a-f0-9]+)/ig, '#$1');
    dsConf.labelFontColor = (0, _lib.pluck)(rawChartAttr.labelfontcolor, UNDEF);
    dsConf.labelFontColor && (dsConf.labelFontColor = dsConf.labelFontColor.replace(/^#?([a-f0-9]+)/ig, '#$1'));
    dsConf.labelFontBold = (0, _lib.pluckNumber)(rawChartAttr.labelfontbold, 0);
    dsConf.labelFontItalic = (0, _lib.pluckNumber)(rawChartAttr.labelfontitalic, 0); // Border cosmetics

    dsConf.plotBorderThickness = (0, _lib.pluckNumber)(rawChartAttr.plotborderthickness, 1);
    dsConf.plotBorderThickness = dsConf.plotBorderThickness < 0 ? 0 : dsConf.plotBorderThickness > 5 ? 5 : dsConf.plotBorderThickness;
    dsConf.plotBorderColor = (0, _lib.pluck)(rawChartAttr.plotbordercolor, '#000000').replace(/^#?([a-f0-9]+)/ig, '#$1'); // Extended tooltip support

    dsConf.tooltipSeparationCharacter = (0, _lib.pluck)(rawChartAttr.tooltipsepchar, ',');
    dsConf.plotToolText = (0, _lib.parseUnsafeString)((0, _lib.pluck)(rawChartAttr.plottooltext, ''), false); // Parent label line height configuration

    dsConf.parentLabelLineHeight = (0, _lib.pluckNumber)(rawChartAttr.parentlabellineheight, 12);
    dsConf.parentLabelLineHeight = dsConf.parentLabelLineHeight < 0 ? 0 : dsConf.parentLabelLineHeight; // Label glow is required since if the user choose a background that is as same as the color of the label,
    // the glow is required to work as a layer between text and background that will make the label stand out
    // Note: label glow will not be applied if textOutline is enabled

    dsConf.labelGlow = dsConf.showTextOutline ? 0 : (0, _lib.pluckNumber)(rawChartAttr.labelglow, 1);
    dsConf.labelGlowIntensity = (0, _lib.pluckNumber)(rawChartAttr.labelglowintensity, 100) / 100;
    dsConf.labelGlowIntensity = dsConf.labelGlowIntensity < 0 ? 0 : dsConf.labelGlowIntensity > 1 ? 1 : dsConf.labelGlowIntensity;
    dsConf.labelGlowColor = (0, _lib.pluck)(rawChartAttr.labelglowcolor, '#ffffff').replace(/^#?([a-f0-9]+)/ig, '#$1');
    dsConf.labelGlowRadius = (0, _lib.pluckNumber)(rawChartAttr.labelglowradius, 2);
    dsConf.labelGlowRadius = dsConf.labelGlowRadius < 0 ? 0 : dsConf.labelGlowRadius > 10 ? 10 : dsConf.labelGlowRadius; // Tool bar configuration

    dsConf.btnResetChartTooltext = (0, _lib.pluck)(rawChartAttr.btnresetcharttooltext, 'Back to Top');
    dsConf.btnBackChartTooltext = (0, _lib.pluck)(rawChartAttr.btnbackcharttooltext, 'Back to Parent'); // Legend Effects Configuration

    dsConf.rangeOutBgColor = (0, _lib.pluck)(rawChartAttr.rangeoutbgcolor, '#808080').replace(/^#?([a-f0-9]+)/ig, '#$1');
    dsConf.rangeOutBgAlpha = (0, _lib.pluckNumber)(rawChartAttr.rangeoutbgalpha, 100);
    dsConf.rangeOutBgAlpha = dsConf.rangeOutBgAlpha < 1 || dsConf.rangeOutBgAlpha > 100 ? 100 : dsConf.rangeOutBgAlpha; // maximum levels to display in the tree at a time.

    maxDepth = (0, _lib.pluckNumber)(rawChartAttr.maxdepth);
    dsConf.maxDepth = maxDepth !== UNDEF ? Math.max(maxDepth, 1) : UNDEF;
    showNavigationBar = dsConf.showNavigationBar = (0, _lib.pluckNumber)(rawChartAttr.shownavigationbar, 1); // eslint-disable-line good-practices/no-single-usage-variable

    dsConf.slicingMode = (0, _lib.pluck)(rawChartAttr.slicingmode, 'alternate');
    dsConf.navigationBarHeight = (0, _lib.pluckNumber)(rawChartAttr.navigationbarheight);
    dsConf.navigationBarHeightRatio = (0, _lib.pluckNumber)(rawChartAttr.navigationbarheightratio);
    dsConf.navigationBarBorderColor = (0, _lib.pluck)(rawChartAttr.navigationbarbordercolor, dsConf.plotBorderColor).replace(/^#?([a-f0-9]+)/ig, '#$1');
    dsConf.navigationBarBorderThickness = showNavigationBar ? (0, _lib.pluckNumber)(rawChartAttr.navigationbarborderthickness, dsConf.plotBorderThickness) : 0;
    dsConf.seperatorAngle = (0, _lib.pluckNumber)(rawChartAttr.seperatorangle) * (Math.PI / 180);
    dsConf.isConfigured = true;
    datasetDefStore.setState('dirty', true);
  }
  /**
   * function to create group for dataset
   */
  ;

  _proto.createContainer = function createContainer() {
    var dataset = this,
        datasetGroup,
        datalabelGroup,
        trackerGroup,
        labelHighlightGroup,
        parentContainer = dataset.getLinkedParent().getChildContainer();
    datasetGroup = dataset.getContainer('plots') || // eslint-disable-line good-practices/no-single-usage-variable
    dataset.addContainer('plots', createGroup('plots', parentContainer.defaultGroup, dataset));
    datalabelGroup = dataset.getContainer('datalabels') || dataset.addContainer('datalabels', createGroup('datalabels', parentContainer.defaultGroup, dataset).insertAfter(datasetGroup));
    trackerGroup = dataset.getContainer('tracker') || dataset.addContainer('tracker', // eslint-disable-line good-practices/no-single-usage-variable
    createGroup('tracker', parentContainer.defaultGroup, dataset));
    !dataset.getContainer('line-hot') && dataset.addContainer('line-hot', createGroup('line-hot', trackerGroup, dataset));
    labelHighlightGroup = dataset.getContainer('labelhighlight') || // eslint-disable-line good-practices/no-single-usage-variable
    dataset.addContainer('labelhighlight', createGroup('labelhighlight', datalabelGroup, dataset));
    !dataset.getContainer('labelfloat') && dataset.addContainer('labelfloat', createGroup('labelfloat', datalabelGroup, dataset).insertAfter(labelHighlightGroup));
  }
  /**
   * Function that retunr the nearest plot details
   * @param {number} chartX x-axis position of the mouse cordinate
   * @param {number} chartY x-axis position of the mouse cordinate
   * @return {Object} return an object with details of nearest polt and whether it is hovered or not
   */
  ;

  _proto._getHoveredPlot = function _getHoveredPlot(chartX, chartY) {
    var dataset = this,
        trackerElem,
        m,
        keys;
    keys = Object.keys(dataset.config.kdTree || {});

    for (m = keys.length - 1; m > -1; m--) {
      if (dataset.config.kdTree[keys[m]].searchTreemap(chartX, chartY)) {
        trackerElem = dataset.config.kdTree[keys[m]].searchTreemap(chartX, chartY);
        break;
      }
    }

    if (trackerElem) {
      dataset.pointObj = trackerElem;
      return {
        pointIndex: trackerElem.i || trackerElem.index,
        hovered: true,
        pointObj: trackerElem
      };
    }
  } // eslint-disable-next-line
  ;

  _proto.kdTreePartioning = function kdTreePartioning() {
    var dataset = this,
        trackerConfigArray = dataset.getFromEnv('chartConfig').trackerConfig,
        m,
        keys,
        trackerObjPartition = {};

    for (m = trackerConfigArray.length; m--;) {
      trackerConfigArray[m].i = m;

      if (trackerObjPartition[trackerConfigArray[m].node.meta.depth] === UNDEF) {
        trackerObjPartition[trackerConfigArray[m].node.meta.depth] = [];
      }

      trackerObjPartition[trackerConfigArray[m].node.meta.depth].push(trackerConfigArray[m]);
    }

    dataset.config.kdTree = {};
    keys = Object.keys(trackerObjPartition);

    for (m = keys.length - 1; m > -1; m--) {
      dataset.config.kdTree[keys[m]] = kdTreeAbs && kdTreeAbs(trackerObjPartition[keys[m]]);
    }
  }
  /**
   * function to handle hover in effect on element
   * @param {Object} elem    graphics element
   * @param {Object} event   original event reference
   * @param {Component} dataset - dataset component
   */
  ;

  _proto._rolloverResponseSetter = function _rolloverResponseSetter(elem, event, dataset) {
    var elData = elem.getData(),
        animationManager = dataset.getFromEnv('animationManager'),
        chart = this.getFromEnv('chart'); // Check whether the plot is in dragged state or not if
    // drag then dont fire rolloverevent

    if (elData && elData.showHoverEffect !== 0) {
      // when drill animation is occuring, then rollover effect must be disabled
      if (!chart.getState('drill')) {
        animationManager.setAnimationState(MOUSEOVER);
        animationManager.setAnimation({
          el: elem,
          label: 'rect',
          component: dataset,
          attr: elem.getData().setRolloverAttr
        });
      }

      chart.plotEventHandler(elem, event, ROLLOVER);
    }
  }
  /**
   * Returns parent of the hovered node. When the parent node is in navigation bar, hovered node is returned
   *
   * @param {any} [nodePath=[]] list of nodes from root to currently hovered node
   * @returns {boolean | Object} if drill depth is less than 2, false is returned. Else corresponding parent is returned
   * @memberof TreeMapDS
   */
  ;

  _proto._getParentNode = function _getParentNode(nodePath) {
    if (nodePath === void 0) {
      nodePath = [];
    }

    var navigationBarNodes = this.conf.navigationBarNodes || [],
        i,
        len = navigationBarNodes.length,
        // eslint-disable-line good-practices/no-single-usage-variable
    nodePathLen = nodePath.length,
        parent = nodePath[nodePathLen - 2],
        self = nodePath[nodePathLen - 1],
        // eslint-disable-line good-practices/no-single-usage-variable
    isParentInNavBar = false; // eslint-disable-line good-practices/no-single-usage-variable

    if (nodePathLen < 2) {
      return false;
    }

    for (i = 0; i < len; i++) {
      if (navigationBarNodes[i].id === parent.id) {
        isParentInNavBar = true;
        break;
      }
    }

    return isParentInNavBar ? self : parent;
  }
  /**
   * This method handles all mouse events of an dataset.
   * @param {string} eventType    name of the event
   * @param {number} plotIndex    index of the plot where this event has been occured
   * @param {Event}  e            reference of the original mouse event
   */
  ;

  _proto._firePlotEvent = function _firePlotEvent(eventType, plotIndex, e) {
    var dataset = this,
        currentToolTip = dataset.config.currentToolTip,
        data = dataset.getFromEnv('chartConfig').trackerConfig[plotIndex || 0],
        setElement = data && data.node && data.node.plotItem,
        toolText = data && data.plotDetails && data.plotDetails.toolText,
        toolTipController = dataset.getFromEnv('toolTipController'),
        originalEvent = e.originalEvent,
        singleTracker = dataset.graphics.singleTracker,
        plotDetails = dataset.pointObj.plotDetails,
        attr,
        parent = dataset._getParentNode(data && data.node.path),
        rectParent = parent && parent.rect;

    if (!setElement) {
      setElement = data && (data.node.plotItem || data.node.polyPathItem);
      plotDetails = {};
      plotDetails.rect = {};
    } else if (dataset.conf.highlightParentsOnHover && parent) {
      attr = {
        x: rectParent.x,
        y: rectParent.y,
        width: rectParent.width,
        height: rectParent.height,
        stroke: 'rgba(255,255,255,0)'
      };
    } else {
      attr = {
        x: plotDetails.rect.x || 0,
        y: plotDetails.rect.y || 0,
        width: plotDetails.rect.width || 0,
        height: plotDetails.rect.height || 0,
        stroke: 'rgba(255,255,255,0)'
      };
    }

    singleTracker = dataset.graphics.singleTracker = dataset.getFromEnv('animationManager').setAnimation({
      el: dataset.graphics.singleTracker || 'rect',
      attr: attr,
      component: dataset,
      label: 'tracker',
      container: dataset.getContainer('tracker'),
      doNotRemove: true
    }).toFront();

    if (setElement) {
      setElement.node.style.cursor = POINTER;
      singleTracker.node.style.cursor = POINTER;

      switch (eventType) {
        case 'fc-mouseover':
          if (dataset.conf.showHoverEffect) {
            data.evtFns.hover[0](singleTracker);
          } else {
            // added tracker fill to update the cosmetics when hover effect is not required
            // but it is necessary to show pointer in text as well so tracker is not removed
            // but updated
            singleTracker.attr('fill', _lib.TRACKER_FILL);
          }

          if (toolText) {
            if (currentToolTip) {
              toolTipController.draw(originalEvent, toolText, currentToolTip);
            } else {
              currentToolTip = dataset.config.currentToolTip = toolTipController.draw(originalEvent, toolText);
            }
          } // dataset._rolloverResponseSetter(setElement, originalEvent);


          break;

        case 'fc-mouseout':
          setElement.node.style.cursor = DEFAULT_CURSOR;
          singleTracker.node.style.cursor = POINTER;
          singleTracker.attr({
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            stroke: '#ffffff',
            'stroke-width': '0px'
          });
          singleTracker.toFront();
          toolTipController.hide(currentToolTip);
          data.evtFns.hover[1](singleTracker);
          break;

        case 'fc-click':
          // plotEventHandler.call(setElement, chart, originalEvent);
          // style.cursor = POINTER;
          data && data.evtFns && data.evtFns.click && data.evtFns.click[0]();
          dataset.config.kdTree = {}; // @todo - get the schedular and add the job

          dataset.addJob('click', dataset.kdTreePartioning.bind(dataset), _schedular.priorityList.tracker);
          break;

        case 'fc-mousemove':
          // style.cursor = POINTER;
          if (toolText) {
            if (currentToolTip) {
              toolTipController.draw(originalEvent, toolText, currentToolTip);
            } else {
              currentToolTip = dataset.config.currentToolTip = toolTipController.draw(originalEvent, toolText);
            }
          }

      }
    }
  }
  /**
   * function to handle drawing job of treemap dataset
   */
  ;

  _proto.draw = function draw() {
    var datasetDefStore = this,
        dsConf = datasetDefStore.conf,
        chart = datasetDefStore.getFromEnv('chart'),
        // jobList = chart.getJobList(),
    chartConf = datasetDefStore.getFromEnv('chartConfig'),
        trackerConfig = chartConf.trackerConfig,
        canvasLeft = chartConf.canvasLeft,
        canvasTop = chartConf.canvasTop,
        datasetLayer,
        metaInf = dsConf.metaTreeInf,
        elemStore = datasetDefStore.graphics.elemStore,
        rendererAPI = {},
        graphicPool = dsConf._graphicPool || (dsConf._graphicPool = {}),
        drawingAreaCenterPoint = {},
        groupLabelCssProps = ['fontFamily', 'fontSize', 'fontWeight', 'fontStyle'],
        groupLabelCss = {
      cursor: POINTER
    },
        // for cursor on the top group labels text
    // groupLabelCss = {},
    nodeRect,
        tree,
        attrs = dsConf,
        // legend = datasetDefStore.getFromEnv('gLegend'),
    drawTreeFn,
        shadeFilter,
        ref = this.getFromEnv('ref'),
        // afAPI = ref.afAPI,
    // visController = afAPI.visibilityController,
    index,
        length,
        animationManager = datasetDefStore.getFromEnv('animationManager'),
        containerManager = ref.containerManager,
        chartLevelAttr,
        algorithmFactory = ref.algorithmFactory,
        // object to store the nodes which needs to be removed
    removeNodeItemsObjectArr = {},
        attr;
    trackerConfig && (trackerConfig.length = 0);
    datasetDefStore.createContainer();
    chartLevelAttr = _lib.parsexAxisStyles.apply(this, [{}, {}, datasetDefStore.getFromEnv('chart-attrib'), {
      fontFamily: 'Verdana,sans',
      fontSize: '10px'
    }]); // Extract the required css from the list of css (guard for IE)

    for (index = 0, length = groupLabelCssProps.length; index < length; index++) {
      attr = groupLabelCssProps[index];

      if (attr in chartLevelAttr) {
        groupLabelCss[attr] = chartLevelAttr[attr];
      }
    } // transport all the previously drawn elements to graphic pool.(graphics reusability)


    containerManager.remove();
    datasetLayer = datasetDefStore.getContainer('plots');
    datasetDefStore.getContainer('datalabels').css(groupLabelCss); // lineHotLayer = datasetDefStore.getContainer('line-hot');

    dsConf.colorRange = datasetDefStore.getFromEnv('colorManager'); // Measurement for available drawing area

    metaInf.effectiveWidth = chartConf.canvasRight - canvasLeft;
    metaInf.effectiveHeight = chartConf.canvasBottom - canvasTop;
    metaInf.startX = canvasLeft;
    metaInf.startY = canvasTop; // Starting point of animation. Animation starts from the center of the paper.

    drawingAreaCenterPoint.x = metaInf.effectiveWidth / 2;
    drawingAreaCenterPoint.y = metaInf.effectiveHeight / 2; // Starting point of animation. Animation starts from the center of the paper.

    drawingAreaCenterPoint.x = metaInf.effectiveWidth / 2;
    drawingAreaCenterPoint.y = metaInf.effectiveHeight / 2;
    /**
      * A function to draw a polygon of specific path and style configuration
      * @param {Object}  config - configuration of node
      * @param {Object} styleAttrs - The style object needed to be applied on the polygon element.
      * @param {TreeNode}  node   - single treenode
      * @return {graphicsElement} - newly created or reused graphics path element
      */

    rendererAPI.drawPolyPath = function (config, styleAttrs, node) {
      var pathElem; // the current node should not be removed, so deleting it from the removeNodeItemsObjectArr object

      removeNodeItemsObjectArr[node.id] && delete removeNodeItemsObjectArr[node.id]; // look up for dumped 'polypathItem' inside the garbage pool or create a new path.

      pathElem = animationManager.setAnimation({
        el: rendererAPI.graphicPool(false, 'polyPathItem') || 'path',
        container: datasetLayer,
        attr: {
          path: config.path
        },
        css: styleAttrs,
        state: chart.getState('drill') ? 'updating' : 'appearing',
        label: 'path',
        component: datasetDefStore
      });
      pathElem && elemStore.polypath.push(pathElem); // return the polygon path element.

      return pathElem;
    }; // eslint-disable-next-line


    rendererAPI.drawRect = function (rect, styleAttrs, _rect, overriddenAttrs, node) {
      var prop,
          pVal,
          beforeAnimationStateRect = {},
          overrideCss = {},
          // clicked = (chart.getState('state') === 'click'),
      // accordianTrue = (chart.getState('state') === 'initial') || (chart.getState('state') === 'update'),
      // resize = (chart.getState('state') === 'resize'),
      newElem; // the current node should not be removed, so deleting it from the removeNodeItemsObjectArr object

      removeNodeItemsObjectArr[node.id] && delete removeNodeItemsObjectArr[node.id];

      for (prop in rect) {
        pVal = rect[prop];

        if (pVal < 0) {
          // If value of any rect proerty is negative, give it zero pixel, so it become invisible
          rect[prop] = 0; // Explicit visibility hidden required for IE8

          overrideCss.visibility = HIDDEN_STR;
        }
      } // If animation is applied. For animation to happen we need a 'from state' and a 'to state'.
      // During the time duration the transition happens 'from state'  to 'to states'.


      (0, _lib.extend2)(beforeAnimationStateRect, rect); // From state measurement of the animation

      beforeAnimationStateRect.x = drawingAreaCenterPoint.x;
      beforeAnimationStateRect.y = drawingAreaCenterPoint.y;
      beforeAnimationStateRect.height = 0;
      beforeAnimationStateRect.width = 0;
      nodeRect = animationManager.setAnimation({
        // eslint-disable-line good-practices/no-single-usage-variable
        el: rendererAPI.graphicPool(false, 'plotItem') || 'rect',
        container: datasetLayer,
        attr: rect,
        css: Object.assign(styleAttrs, overrideCss),
        state: chart.getState('drill') ? 'updating' : 'appearing',
        props: node.__props,
        label: 'rect',
        component: datasetDefStore
      }).toFront(); // Store the reference, so that we canus retrieve it later.
      // todo: remove...

      newElem && elemStore.rect.push(newElem);
      return nodeRect;
    };
    /*
      * Draw a text on the paper. This texts are drawn under datalabel layer.
      * @param textVal {String} - text to be drawn on paper
      * @param coordinates {Object} - Start co ordinate of the text. In {x: 10, y: 10} format
      * @return {Element} - the element which is drawn on paper
      */
    // eslint-disable-next-line


    rendererAPI.drawText = function (textVal, coordinates, attrs, _coordinates, overAttr, node) {
      if (overAttr === void 0) {
        overAttr = {};
      }

      // previously _coordinates is used 'from state' to 'to state' animation
      var mandatoryStyle = {},
          newTextElem,
          text = textVal,
          newHighlightElem,
          state,
          label,
          labelAttrs,
          highlightMask,
          visibility,
          textAttrs = attrs.textAttrs,
          highlightsAttrs = attrs.highlightAttrs;
      state = chart.getState('drill') ? 'updating' : 'appearing'; // the current node should not be removed, so deleting it from the removeNodeItemsObjectArr object

      removeNodeItemsObjectArr[node.id] && delete removeNodeItemsObjectArr[node.id]; // There are two layers of datalabel placement happens here. The 1st layer from the top is the
      // real text. And below this is the text that brings the highlight effect. This effect is acheived
      // by making the strong-width bigger.

      (0, _lib.extend2)(mandatoryStyle, textAttrs);
      delete mandatoryStyle.fill;
      mandatoryStyle['stroke-linejoin'] = ROUND_STR;
      delete overAttr.opacity; // If the coordinates are negative valued, texts are made BLANK.

      text = coordinates.x < 0 || coordinates.y < 0 ? _lib.BLANKSTRING : text;
      labelAttrs = Object.assign({}, textAttrs, overAttr, {
        text: text,
        x: coordinates.x,
        y: coordinates.y,
        visibility: 'visible'
      });
      label = animationManager.setAnimation({
        el: rendererAPI.graphicPool(false, 'labelItem') || rendererAPI.graphicPool(false, 'pathlabelItem') || 'text',
        container: datasetDefStore.getContainer('labelfloat'),
        component: datasetDefStore,
        attr: labelAttrs,
        state: state,
        label: 'labelItem'
      });
      label.outlineText(datasetDefStore.conf.showTextOutline, labelAttrs.fill);
      label.show();
      visibility = highlightsAttrs.visibility !== HIDDEN;
      delete highlightsAttrs.visibility;
      highlightMask = animationManager.setAnimation({
        el: rendererAPI.graphicPool(false, 'highlightItem') || rendererAPI.graphicPool(false, 'pathhighlightItem') || 'text',
        container: datasetDefStore.getContainer('labelhighlight'),
        component: datasetDefStore,
        attr: Object.assign({}, overAttr, highlightsAttrs, {
          x: coordinates.x,
          y: coordinates.y,
          text: visibility ? text : '',
          visibility: 'visible'
        }),
        css: {
          lineHeight: mandatoryStyle.fontSize * 1.2 + 'px'
        },
        state: state,
        label: 'highlightItem'
      });
      datasetDefStore.prevLabelGlowVisibility !== visibility && visibility === true && highlightMask.show();
      datasetDefStore.prevLabelGlowVisibility = visibility; // Store the reference in the array

      elemStore.label.push(newTextElem);
      elemStore.highlight.push(newHighlightElem);
      return {
        label: label,
        highlightMask: highlightMask
      };
    };
    /*
      * Dispose the graphic elements related to a node element.
      * @param node - {TreeNode} - The node element reference wrt whom the graphic elements needs to be detached.
      * @param disposeList - {Array} - The  disposing graphics elements names which are to be only removed.
    */


    rendererAPI.disposeItems = function (node, disposeList) {
      var i,
          item,
          prop,
          disposeNames = disposeList || ['plotItem', 'labelItem', 'hotItem', 'highlightItem', 'polyPathItem', 'pathlabelItem', 'pathhighlightItem', 'stackedpolyPathItem', 'stackedpathlabelItem', 'stackedpathhighlightItem'];

      for (i = 0; i < disposeNames.length; i += 1) {
        prop = disposeNames[i];
        item = node[prop]; // push these elements in the graphic pool for reusing in future.

        item && item.type === 'text' && item.attr({
          text: '',
          'text-bound': []
        });
        item && !item.removed && (item = animationManager.setAnimation({
          el: item,
          component: datasetDefStore
        })); // hide the elements.
        // detach the node and the graphic element linkage.

        node[prop] = UNDEF;
      }
    };
    /*
      * Recursively destroy all childs of the tree node.
    */


    rendererAPI.disposeChild = function () {
      var rendererAPI,
          // eslint-disable-line
      disposeItems = function disposeItems() {
        return rendererAPI.disposeItems;
      },
          removeFn = function removeFn(currentNode, depth) {
        var index, // eslint-disable-line
        childrenArr; // dispose the graphics elements for the element.

        disposeItems(currentNode); // todo: put it in closure

        for (index = 0; index < (currentNode.getChildren() || []).length; index++) {
          childrenArr = currentNode.getChildren();
          index = removeFn(childrenArr[index], index);
        }

        return depth;
      };

      return function (node) {
        var parentNode = node.getParent();

        if (!rendererAPI) {
          rendererAPI = this;
          disposeItems = disposeItems();
        } // check if its not the global origin


        if (parentNode) {
          rendererAPI.disposeChild(parentNode);
        } else {
          /* dispose the graphics elements, if any. Store it for future re-use and unlink its reference
          from the node element */
          removeFn(node, 0);
        }
      };
    }();
    /**
     * Utility function to dispose child nodes
     */


    rendererAPI.disposeSelectedChildren = function () {
      var rendererAPI,
          // eslint-disable-line
      disposeSelectedItems = function disposeSelectedItems() {
        return rendererAPI.addRemovalNodes;
      },
          removeItems = function removeItems(currentNode, depth) {
        var index, // eslint-disable-line
        childrenArr;
        disposeSelectedItems(currentNode);

        for (index = 0; index < (currentNode.getChildren() || []).length; ++index) {
          childrenArr = currentNode.getChildren();
          index = removeItems(childrenArr[index], index);
        }

        return depth;
      };

      return function (node) {
        var parentNode = node.getParent();

        if (!rendererAPI) {
          rendererAPI = this;
          disposeSelectedItems = disposeSelectedItems();
        }

        if (parentNode) {
          rendererAPI.addRemovalNodes(parentNode);
        } else {
          removeItems(node, 0);
        }
      };
    }();
    /**
     * Function to add a particular node to removeNodeItemsObjectArr
     * @param {Object} node - The tree-node
     */


    rendererAPI.addRemovalNodes = function (node) {
      removeNodeItemsObjectArr[node.id] = node;
    };
    /**
     * Function to animate and hide the graphical elements of node present in removeNodeItemsObjectArr
     */


    rendererAPI.hideNodes = function () {
      var i,
          item,
          node,
          prop,
          disposeNames = ['plotItem', 'labelItem', 'hotItem', 'highlightItem', 'polyPathItem', 'pathlabelItem', 'pathhighlightItem', 'stackedpolyPathItem', 'stackedpathlabelItem', 'stackedpathhighlightItem'];

      for (var itr in removeNodeItemsObjectArr) {
        node = removeNodeItemsObjectArr[itr];

        for (i = 0; i < disposeNames.length; i += 1) {
          prop = disposeNames[i];
          item = node[prop];
          item && item.type === 'text' && item.attr({
            text: '',
            'text-bound': []
          });
          item = item && !item.removed && animationManager.setAnimation({
            el: item,
            component: datasetDefStore,
            label: 'gen'
          }); // detach the node and the graphic element linkage.

          node[prop] = UNDEF;
        }
      }
    };
    /**
     * store or fetch an element of the type.
     * param add {boolean} - If to add the element or fetch an element.
     * param type {'string'} - If a hot element, rectangle, texts...
     * param elem {svg element}
     */


    rendererAPI.graphicPool = function () {
      // eslint-disable-next-line good-practices/no-function-dependency
      return function (add, type, elem) {
        var freeElement,
            dumpArr = graphicPool[type]; // create a storage array for the specified type if not existing.

        if (!dumpArr) {
          dumpArr = graphicPool[type] = [];
        }

        if (type === 'hotItem' || type === 'pathhotItem') {
          elem.remove();
        } // adds the elemnt to the graphics pool


        if (add) {
          dumpArr.push(elem);
        } else {
          // fectches an element from the pool and remove that from the free pool.
          // slice out the first element from the array of free elements.
          freeElement = dumpArr.splice(0, 1)[0];

          if (freeElement) {
            freeElement.show();
            return freeElement;
          }
        }
      };
    }(); // dispose the complimentary tree.
    // eslint-disable-next-line good-practices/no-function-dependency


    rendererAPI.disposeComplimentary = function (targetNode) {
      var child,
          childrenArr,
          rendererAPI = this,
          // eslint-disable-line
      parentNode = targetNode.getParent(),
          leftSiblingCount = targetNode.getSiblingCount('left');

      if (parentNode) {
        childrenArr = parentNode.getChildren(); // set parent node to undefined, to break the parent-child links.

        child = childrenArr.splice(leftSiblingCount, 1)[0]; // generically dispose the discontinous tree.

        rendererAPI.disposeChild(targetNode); // re-eastablish the broken parent-child relationships for the node.

        childrenArr.splice(leftSiblingCount, 0, child);
      } // bridge code: Cannot dispose hotItems.


      rendererAPI.removeLayers();
    };
    /**
      * Remove everything that has been drawn in the layers. It doesnot remove the layer directly.
      * Instead it removes the children. All the children of datasetLayer, datalabelLayer, hotLayer
      * are removed
      */


    rendererAPI.removeLayers = function () {
      var index, // eslint-disable-line
      length, // eslint-disable-line

      /* dataset,
      datalabel,
      highlight, */
      hot,
      /* _datasetLayer,
      _datalabelLayer,
      _highlightLayer, */
      _hotLayer;
      /* datasetLayerLength,
      datalabelLayerLength,
      highlightLayerLength, */

      /* _datasetLayer = elemStore.rect, datasetLayerLength = _datasetLayer.length;
        _datalabelLayer = elemStore.label, datalabelLayerLength = _datalabelLayer.length;
        _highlightLayer = elemStore.highlight, highlightLayerLength = _highlightLayer.length; */


      _hotLayer = elemStore.hot; // Get the length of maximum element inside among three layers
      // length = Math.max(datasetLayerLength, datalabelLayerLength, highlightLayerLength, hotLayerLength);

      length = _hotLayer.length; // eslint-disable-line good-practices/no-single-usage-variable

      for (index = 0; index < length; index++) {
        /* dataset = _datasetLayer[index];
        datalabel = _datalabelLayer[index];
        highlight = _highlightLayer[index]; */
        hot = _hotLayer[index]; // Remove the element from DOM

        /* dataset && dataset.remove();
        datalabel && datalabel.remove();
        highlight && highlight.remove(); */

        hot && hot.remove();
      } // Empty the arry which was holding the reference

      /* _datasetLayer.length = 0;
      _datalabelLayer.length = 0; */


      _hotLayer.length = 0;
    };

    if (datasetDefStore.getState('dirty')) {
      algorithmFactory.init(dsConf.algorithm, true, dsConf.maxDepth); // Retrieves draw function of algorithm

      drawTreeFn = algorithmFactory.plotOnCanvas(datasetDefStore.config.JSONData, chart._getCleanValue()); // initialise the container manager.

      containerManager.init(datasetDefStore, metaInf, rendererAPI, tree, drawTreeFn);
    } // draw the indivual containers inside the container manager.


    containerManager.draw();
    shadeFilter = algorithmFactory.applyShadeFiltering({
      // eslint-disable-line good-practices/no-single-usage-variable
      fill: attrs.rangeOutBgColor,
      opacity: attrs.rangeOutBgAlpha * 0.01
    }, function (css) {
      // eslint-disable-line good-practices/no-function-dependency
      var nodeInf = this;
      nodeInf.plotItem && nodeInf.plotItem.css(css);
    }); // if (legend && legend.enabled) {
    //   legend.resetLegend();
    //   // legend.clearListeners();
    // }
    // listen to event fired by legends and decide what to do
    // eslint-disable-next-line

    datasetDefStore.addExtEventListener('legendUpdate', function (e, d) {
      shadeFilter.call(this, {
        start: d.maxMinArray[0].min,
        end: d.maxMinArray[0].max
      });
      dsConf.range = {
        min: d.maxMinArray[0].min,
        max: d.maxMinArray[0].max
      };
    }, datasetDefStore.getFromEnv('colorManager'));
    dsConf.isConfigured = false; // add the job to build kd tree

    datasetDefStore.addJob('buildKDTreeID', datasetDefStore.kdTreePartioning.bind(datasetDefStore), _schedular.priorityList.tracker);
  }
  /**
   * Returns the type of the component
   * @return {string} The type of the component, in this case a dataset.
   */
  ;

  _proto.getType = function getType() {
    return 'dataset';
  }
  /**
   * function to set index for the dataset component
   * @param {number} index    index according to the index JSON
   */
  ;

  _proto.setJSONIndex = function setJSONIndex(index) {
    this.config.index = index;
  }
  /**
   * function to return index for the dataset component
   * @return {number}    index according to the index JSON
   */
  ;

  _proto.getJSONIndex = function getJSONIndex() {
    return this.config.index || 0;
  };

  return TreeMapDS;
}(_componentInterface.ComponentInterface);

var _default = TreeMapDS;
exports["default"] = _default;

/***/ }),

/***/ 1603:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _treemap = _interopRequireDefault(__webpack_require__(1604));

exports.Treemap = _treemap.default;
var _default = {
  name: 'treemap',
  type: 'package',
  requiresFusionCharts: true,
  extension: function extension(FusionCharts) {
    return FusionCharts.addDep(_treemap.default);
  }
};
exports["default"] = _default;

/***/ }),

/***/ 1604:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _treemap = _interopRequireDefault(__webpack_require__(1605));

var _default = _treemap.default;
exports["default"] = _default;

/***/ })

}]);
}));

//# sourceMappingURL=http://localhost:3052/4.1.0-beta.1/map/eval/fusioncharts.treemap.js.map