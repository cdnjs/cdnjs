/*
Copyright 2014, modulex-dd@1.0.1
MIT Licensed
build time: Thu, 16 Oct 2014 07:15:25 GMT
*/
modulex.add("dd", ["util","base","ua","node","event-dom/gesture/basic","event-dom/gesture/pan"], function(require, exports, module) {
var _util_ = require("util");
var base = require("base");
var ua = require("ua");
var _node_ = require("node");
var eventDomGestureBasic = require("event-dom/gesture/basic");
var eventDomGesturePan = require("event-dom/gesture/pan");
/*
combined modules:
dd
dd/ddm
dd/draggable
dd/draggable-delegate
dd/droppable-delegate
dd/droppable
*/
var ddDdm, ddDraggable, ddDraggableDelegate, ddDroppable, ddDroppableDelegate, dd;
ddDdm = function (exports) {
  /**
   * @ignore
   * dd support for kissy, dd objects central management module
   * @author yiminghe@gmail.com
   */
  var util = _util_;
  var Base = base;
  var UA = ua, $ = _node_, win = window, doc = win.document, $doc = $(doc), $win = $(win), ie6 = UA.ie === 6, MOVE_DELAY = 30, SHIM_Z_INDEX = 999999;
  var adjustShimSize = util.throttle(function () {
    var self = this, activeDrag;
    if ((activeDrag = self.get('activeDrag')) && activeDrag.get('shim')) {
      self._shim.css({
        width: $doc.width(),
        height: $doc.height()
      });
    }
  }, MOVE_DELAY);
  /*
   垫片只需创建一次
   */
  var activeShim = function (self) {
    //创造垫片，防止进入iframe，外面document监听不到 mousedown/up/move
    self._shim = $('<div ' + 'style="' + //red for debug
    'background-color:red;' + 'position:' + (ie6 ? 'absolute' : 'fixed') + ';' + 'left:0;' + 'width:100%;' + 'height:100%;' + 'top:0;' + 'cursor:' + self.get('dragCursor') + ';' + 'z-index:' + //覆盖iframe上面即可
    SHIM_Z_INDEX + ';' + '"><' + '/div>').prependTo(doc.body || doc.documentElement).css('opacity', 0);
    activeShim = showShim;
    if (ie6) {
      // ie6 不支持 fixed 以及 width/height 100%
      // support dd-scroll
      // prevent empty when scroll outside initial window
      $win.on('resize scroll', adjustShimSize, self);
    }
    showShim(self);
  };
  /*
   负责拖动涉及的全局事件：
   1.全局统一的鼠标移动监控
   2.全局统一的鼠标弹起监控，用来通知当前拖动对象停止
   3.为了跨越 iframe 而统一在底下的遮罩层
   */
  /**
   * @class KISSY.DD.DDM
   * @singleton
   * @private
   * @extends KISSY.Base
   * Manager for Drag and Drop.
   */
  var DDManger = Base.extend({
    /**
     * @ignore
     */
    addDrop: function (d) {
      this.get('drops').push(d);
    },
    /**
     * @ignore
     */
    removeDrop: function (d) {
      var self = this, drops = self.get('drops'), index = util.indexOf(d, drops);
      if (index !== -1) {
        drops.splice(index, 1);
      }
    },
    /**
     * 真正开始 drag
     * 当前拖动对象通知全局：我要开始啦
     * 全局设置当前拖动对象
     * @ignore
     */
    start: function (e, drag) {
      var self = this;
      self.setInternal('activeDrag', drag);
      // 真正开始移动了才激活垫片
      if (drag.get('shim')) {
        activeShim(self);
      }
      // avoid unnecessary drop check
      self.__needDropCheck = 0;
      if (drag.get('groups')) {
        _activeDrops(self);
        if (self.get('validDrops').length) {
          cacheWH(drag.get('node'));
          self.__needDropCheck = 1;
        }
      }
    },
    /**
     * @ignore
     */
    addValidDrop: function (drop) {
      this.get('validDrops').push(drop);
    },
    _notifyDropsMove: function (ev, activeDrag) {
      var self = this;
      var drops = self.get('validDrops'), mode = activeDrag.get('mode'), activeDrop = 0, oldDrop, vArea = 0, dragRegion = region(activeDrag.get('node')), dragArea = area(dragRegion);
      util.each(drops, function (drop) {
        if (drop.get('disabled')) {
          return undefined;
        }
        var a, node = drop.getNodeFromTarget(ev, // node
          activeDrag.get('dragNode')[0], // proxy node
          activeDrag.get('node')[0]);
        if (!node) {
          return undefined;
        }
        if (mode === 'point') {
          //取鼠标所在的 drop 区域
          if (inNodeByPointer(node, activeDrag.mousePos)) {
            a = area(region(node));
            if (!activeDrop) {
              activeDrop = drop;
              vArea = a;
            } else {
              // 当前得到的可放置元素范围更小，取范围小的那个
              if (a < vArea) {
                activeDrop = drop;
                vArea = a;
              }
            }
          }
        } else if (mode === 'intersect') {
          //取一个和activeDrag交集最大的drop区域
          a = area(intersect(dragRegion, region(node)));
          if (a > vArea) {
            vArea = a;
            activeDrop = drop;
          }
        } else if (mode === 'strict') {
          //drag 全部在 drop 里面
          a = area(intersect(dragRegion, region(node)));
          if (a === dragArea) {
            activeDrop = drop;
            return false;
          }
        }
        return undefined;
      });
      oldDrop = self.get('activeDrop');
      if (oldDrop && oldDrop !== activeDrop) {
        oldDrop._handleOut(ev);
        activeDrag._handleOut(ev);
      }
      self.setInternal('activeDrop', activeDrop);
      if (activeDrop) {
        if (oldDrop !== activeDrop) {
          activeDrop._handleEnter(ev);
        } else {
          // 注意处理代理时内部节点变化导致的 out、enter
          activeDrop._handleOver(ev);
        }
      }
    },
    move: function (ev, activeDrag) {
      // chrome8: click 时 mousedown-mousemove-mouseup-click 也会触发 mousemove
      var self = this;
      // for drop-free draggable performance
      if (self.__needDropCheck) {
        self._notifyDropsMove(ev, activeDrag);
      }
    },
    /**
     * 全局通知当前拖动对象：结束拖动了！
     * @ignore
     */
    end: function (e) {
      var self = this, activeDrop = self.get('activeDrop');
      if (self._shim) {
        self._shim.hide();
      }
      _deActiveDrops(self);
      if (activeDrop) {
        activeDrop._end(e);
      }
      self.setInternal('activeDrop', null);
      self.setInternal('activeDrag', null);
    }
  }, {
    ATTRS: {
      /**
       * cursor style when dragging,if shimmed the shim will get the cursor.
       * Defaults to: 'move'.
       * @property dragCursor
       * @type {String}
       */
      /**
       * @ignore
       */
      dragCursor: { value: 'move' },
      /**
       * currently active draggable object
       * @type {KISSY.DD.Draggable}
       * @readonly
       * @property activeDrag
       */
      /**
       * @ignore
       */
      activeDrag: {},
      /**
       * currently active droppable object
       * @type {KISSY.DD.Droppable}
       * @readonly
       * @property activeDrop
       */
      /**
       * @ignore
       */
      activeDrop: {},
      /**
       * an array of drop targets.
       * @property drops
       * @type {KISSY.DD.Droppable[]}
       * @private
       */
      /**
       * @ignore
       */
      drops: {
        valueFn: function () {
          return [];
        }
      },
      /**
       * a array of the valid drop targets for this interaction
       * @property validDrops
       * @type {KISSY.DD.Droppable[]}
       * @private
       */
      /**
       * @ignore
       */
      validDrops: {
        valueFn: function () {
          return [];
        }
      }
    }
  });
  function showShim(self) {
    // determine cursor according to activeHandler and dragCursor
    var ah = self.get('activeDrag').get('activeHandler'), cur = 'auto';
    if (ah) {
      cur = ah.css('cursor');
    }
    if (cur === 'auto') {
      cur = self.get('dragCursor');
    }
    self._shim.css({
      cursor: cur,
      display: 'block'
    });
    if (ie6) {
      adjustShimSize.call(self);
    }
  }
  function _activeDrops(self) {
    var drops = self.get('drops');
    self.setInternal('validDrops', []);
    if (drops.length) {
      util.each(drops, function (d) {
        d._active();
      });
    }
  }
  function _deActiveDrops(self) {
    var drops = self.get('drops');
    self.setInternal('validDrops', []);
    if (drops.length) {
      util.each(drops, function (d) {
        d._deActive();
      });
    }
  }
  function region(node) {
    var offset = node.offset();
    return {
      left: offset.left,
      right: offset.left + (node.__ddCachedWidth || node.outerWidth()),
      top: offset.top,
      bottom: offset.top + (node.__ddCachedHeight || node.outerHeight())
    };
  }
  function inRegion(region, pointer) {
    return region.left <= pointer.left && region.right >= pointer.left && region.top <= pointer.top && region.bottom >= pointer.top;
  }
  function area(region) {
    if (region.top >= region.bottom || region.left >= region.right) {
      return 0;
    }
    return (region.right - region.left) * (region.bottom - region.top);
  }
  function intersect(r1, r2) {
    var t = Math.max(r1.top, r2.top), r = Math.min(r1.right, r2.right), b = Math.min(r1.bottom, r2.bottom), l = Math.max(r1.left, r2.left);
    return {
      left: l,
      right: r,
      top: t,
      bottom: b
    };
  }
  function inNodeByPointer(node, point) {
    return inRegion(region(node), point);
  }
  function cacheWH(node) {
    if (node) {
      node.__ddCachedWidth = node.outerWidth();
      node.__ddCachedHeight = node.outerHeight();
    }
  }
  var DDM = new DDManger();
  DDM.inRegion = inRegion;
  DDM.region = region;
  DDM.area = area;
  DDM.cacheWH = cacheWH;
  DDM.PREFIX_CLS = 'ks-dd-';
  exports = DDM;
  return exports;
}();
ddDraggable = function (exports) {
  /**
   * @ignore
   * dd support for kissy, drag for dd
   * @author yiminghe@gmail.com
   */
  var BasicGesture = eventDomGestureBasic, DDM = ddDdm, Base = base, PanGesture = eventDomGesturePan;
  var util = _util_;
  var UA = ua, $ = _node_, doc = document, $doc = $(doc), each = util.each, ie = UA.ie, PREFIX_CLS = DDM.PREFIX_CLS;
  function checkValid(fn) {
    return function () {
      if (this._isValidDrag) {
        fn.apply(this, arguments);
      }
    };
  }
  var onDragStart = checkValid(function (e) {
    this._start(e);
  });
  var onDrag = checkValid(function (e) {
    this._move(e);
  });
  //    var onDragPre = checkValid(function (e) {
  //        e.preventDefault();
  //    });
  var onDragEnd = checkValid(function (e) {
    this._end(e);
  });
  /**
   * @class KISSY.DD.Draggable
   * @extends KISSY.Base
   * Provide abilities to make specified node draggable
   */
  var Draggable = Base.extend({
    initializer: function () {
      var self = this;
      self.addTarget(DDM);
      self._allowMove = self.get('move');
    },
    _onSetNode: function (n) {
      var self = this;
      // dragNode is equal to node in single mode
      self.setInternal('dragNode', n);
    },
    onGestureStart: function (e) {
      var self = this, t = e.target;
      if (self._checkDragStartValid(e)) {
        if (!self._checkHandler(t)) {
          return;
        }
        self._prepare(e);
      }
    },
    getEventTargetEl: function () {
      return this.get('node');
    },
    start: function () {
      var self = this, node = self.getEventTargetEl();
      if (node) {
        node.on(PanGesture.PAN_START, onDragStart, self).on(PanGesture.PAN, onDrag, self).on(PanGesture.PAN_END, onDragEnd, self).on(BasicGesture.START, onGestureStart, self).on('dragstart', preventDefault);
      }
    },
    stop: function () {
      var self = this, node = self.getEventTargetEl();
      if (node) {
        node.detach(PanGesture.PAN_START, onDragStart, self).detach(PanGesture.PAN, onDrag, self).detach(PanGesture.PAN_END, onDragEnd, self).detach(BasicGesture.START, onGestureStart, self).detach('dragstart', preventDefault);
      }
    },
    _onSetDisabled: function (d) {
      var self = this, node = self.get('dragNode');
      if (node) {
        node[d ? 'addClass' : 'removeClass'](PREFIX_CLS + '-disabled');
      }
      self[d ? 'stop' : 'start']();
    },
    _checkHandler: function (t) {
      var self = this, handlers = self.get('handlers'), ret = 0;
      each(handlers, function (handler) {
        //子区域内点击也可以启动
        if (handler[0] === t || handler.contains(t)) {
          ret = 1;
          self.setInternal('activeHandler', handler);
          return false;
        }
        return undefined;
      });
      return ret;
    },
    _checkDragStartValid: function (e) {
      var self = this;
      if (self.get('primaryButtonOnly') && e.which !== 1) {
        return 0;
      }
      return 1;
    },
    _prepare: function (e) {
      var self = this;
      self._isValidDrag = 1;
      if (ie) {
        fixIEMouseDown();
        $doc.on(BasicGesture.END, {
          fn: fixIEMouseUp,
          once: true
        });
      }
      // http://blogs.msdn.com/b/ie/archive/2011/10/19/handling-multi-touch-and-mouse-input-in-all-browsers.aspx
      // stop panning and zooming so we can draw for win8?
      //            if (e.originalEvent['preventManipulation']) {
      //                e.originalEvent.preventManipulation();
      //            }
      // 防止 firefox/chrome 选中 text
      // 非 ie，阻止了 html dd 的默认行为
      if (self.get('halt')) {
        e.stopPropagation();
      }
      // in touch device
      // prevent touchdown will prevent native scroll
      // need to prevent on move conditionally
      // will prevent text selection and link click
      if (e.gestureType === 'mouse') {
        e.preventDefault();
      }
      if (self._allowMove) {
        self.setInternal('startNodePos', self.get('node').offset());
      }
    },
    _start: function (e) {
      var self = this;
      // prevent touch scroll
      if (e.gestureType === 'touch') {
        e.preventDefault();
      }
      self.mousePos = {
        left: e.pageX,
        top: e.pageY
      };
      DDM.start(e, self);
      self.fire('dragstart', {
        drag: self,
        gestureType: e.gestureType,
        startPos: e.startPos,
        deltaX: e.deltaX,
        deltaY: e.deltaY,
        pageX: e.pageX,
        pageY: e.pageY
      });
      self.get('dragNode').addClass(PREFIX_CLS + 'dragging');
    },
    _move: function (e) {
      var self = this, pageX = e.pageX, pageY = e.pageY;
      // prevent touch scroll
      if (e.gestureType === 'touch') {
        e.preventDefault();
      }
      self.mousePos = {
        left: pageX,
        top: pageY
      };
      var customEvent = {
        drag: self,
        gestureType: e.gestureType,
        startPos: e.startPos,
        deltaX: e.deltaX,
        deltaY: e.deltaY,
        pageX: e.pageX,
        pageY: e.pageY
      };
      var move = self._allowMove;
      if (move) {
        var startNodePos = self.get('startNodePos');
        var left = startNodePos.left + e.deltaX, top = startNodePos.top + e.deltaY;
        customEvent.left = left;
        customEvent.top = top;
        self.setInternal('actualPos', {
          left: left,
          top: top
        });
        self.fire('dragalign', customEvent);
      }
      var def = 1;
      // allow call preventDefault on handlers
      if (self.fire('drag', customEvent) === false) {
        def = 0;
      }
      DDM.move(e, self);
      // 防止 ie 选择到字
      // touch need direction
      if (self.get('preventDefaultOnMove')) {
        e.preventDefault();
      }
      if (def && move) {
        // 取 'node' , 改 node 可能是代理哦
        self.get('node').offset(self.get('actualPos'));
      }
    },
    /**
     * force to stop this drag operation
     * @member KISSY.DD.Draggable
     */
    stopDrag: function () {
      if (this._isValidDrag) {
        this._end();
      }
    },
    _end: function (e) {
      e = e || {};
      var self = this, activeDrop;
      self._isValidDrag = 0;
      // 如果已经开始，收尾工作
      self.get('node').removeClass(PREFIX_CLS + 'drag-over');
      self.get('dragNode').removeClass(PREFIX_CLS + 'dragging');
      if (activeDrop = DDM.get('activeDrop')) {
        self.fire('dragdrophit', {
          drag: self,
          drop: activeDrop
        });
      } else {
        self.fire('dragdropmiss', { drag: self });
      }
      DDM.end(e, self);
      self.fire('dragend', {
        drag: self,
        gestureType: e.gestureType,
        startPos: e.startPos,
        deltaX: e.deltaX,
        deltaY: e.deltaY,
        pageX: e.pageX,
        pageY: e.pageY
      });
    },
    _handleOut: function () {
      var self = this;
      self.get('node').removeClass(PREFIX_CLS + 'drag-over');
      // html5 => dragleave
      self.fire('dragexit', {
        drag: self,
        drop: DDM.get('activeDrop')
      });
    },
    _handleEnter: function (e) {
      var self = this;
      self.get('node').addClass(PREFIX_CLS + 'drag-over');
      //第一次先触发 dropenter, dragenter
      self.fire('dragenter', e);
    },
    _handleOver: function (e) {
      this.fire('dragover', e);
    },
    /**
     * make the drag node undraggable
     * @member KISSY.DD.Draggable
     * @private
     */
    destructor: function () {
      this.stop();
    }
  }, {
    name: 'Draggable',
    ATTRS: {
      /**
       * the dragged node. maybe a proxy node.
       * @property node
       * @type {HTMLElement|KISSY.Node}
       * @readonly
       */
      /**
       * the dragged node.
       * @cfg {HTMLElement|KISSY.Node} node
       */
      /**
       * @ignore
       */
      node: {
        setter: function (v) {
          if (!(v instanceof $)) {
            return $(v);
          }
          return undefined;
        }
      },
      /**
       * the draggable element.
       * @property dragNode
       * @type {HTMLElement}
       * @readonly
       */
      /**
       * @ignore
       */
      dragNode: {},
      /**
       * use protective shim to cross iframe.
       *
       * Defaults to: false
       *
       * @cfg {Boolean} shim
       *
       */
      /**
       * @ignore
       */
      shim: { value: false },
      /**
       * valid handlers to initiate a drag operation.
       *
       * Default same with {@link KISSY.DD.Draggable#cfg-node} config.
       *
       * @cfg {HTMLElement[]|Function[]|String[]} handlers
       */
      /**
       * @ignore
       */
      handlers: {
        valueFn: function () {
          return [];
        },
        getter: function (vs) {
          var self = this;
          if (!vs.length) {
            vs[0] = self.get('node');
          }
          each(vs, function (v, i) {
            if (typeof v === 'function') {
              v = v.call(self);
            }
            // search inside node
            if (typeof v === 'string') {
              v = self.get('node').one(v);
            }
            if (v.nodeType) {
              v = $(v);
            }
            vs[i] = v;
          });
          self.setInternal('handlers', vs);
          return vs;
        }
      },
      /**
       * the handler which fired the drag event.
       * @type {KISSY.Node}
       * @property activeHandler
       * @readonly
       */
      /**
       * @ignore
       */
      activeHandler: {},
      /**
       * drop mode.
       * @cfg {KISSY.DD.Draggable.DropMode} mode
       */
      /**
       * @ignore
       */
      mode: { value: 'point' },
      /**
       * set to disable this draggable so that it can not be dragged.
       *
       * Defaults to: false
       *
       * @type {Boolean}
       * @property disabled
       */
      /**
       * @ignore
       */
      disabled: { value: false },
      /**
       * whether the drag node moves with cursor, can be used to resize element.
       *
       * Defaults to: false
       *
       * @cfg {Boolean} move
       */
      /**
       * @ignore
       */
      move: { value: false },
      /**
       * whether a drag operation can only be trigged by primary(left) mouse button.
       * Setting false will allow for all mousedown events to trigger drag.
       * @cfg {Boolean} primaryButtonOnly
       */
      /**
       * @ignore
       */
      primaryButtonOnly: { value: true },
      /**
       * whether halt mousedown event.
       *
       * Defaults to: true
       *
       * @cfg {Boolean} halt
       */
      /**
       * @ignore
       */
      halt: { value: true },
      /**
       * groups this draggable object belongs to, can interact with droppable.
       * if this draggable does not want to interact with droppable for performance,
       * can set this to false.
       * for example:
       *      @example
       *      {
           *          'group1':1,
           *          'group2':1
           *      }
       *
       * @cfg {Object} groups
       */
      /**
       * @ignore
       */
      groups: { value: true },
      /**
       * node position ar drag start.
       * only valid when move is set to true.
       *
       * for example:
       *      @example
       *      {
           *          left: 100,
           *          top: 200
           *      }
       *
       * @property startNodePos
       * @type {Object}
       * @readonly
       */
      /**
       * @ignore
       */
      startNodePos: {},
      /**
       * The xy that the node will be set to.
       * Changing this will alter the position as it's dragged.
       * only valid when move is set to true.
       * @property actualPos
       * @type {Object}
       * @readonly
       */
      /**
       * @ignore
       */
      actualPos: {},
      preventDefaultOnMove: { value: true }
    },
    inheritedStatics: {
      /**
       * drag drop mode enum.
       * @enum {String} KISSY.DD.Draggable.DropMode
       */
      DropMode: {
        /**
         * In point mode, a Drop is targeted by the cursor being over the Target
         */
        POINT: 'point',
        /**
         * In intersect mode, a Drop is targeted by 'part' of the drag node being over the Target
         */
        INTERSECT: 'intersect',
        /**
         * In strict mode, a Drop is targeted by the 'entire' drag node being over the Target
         */
        STRICT: 'strict'
      }
    }
  });
  var _ieSelectBack;
  function fixIEMouseUp() {
    doc.body.onselectstart = _ieSelectBack;
    // http://stackoverflow.com/questions/1685326/responding-to-the-onmousemove-event-outside-of-the-browser-window-in-ie
    // ie6 will not response to event when cursor is out of window.
    if (doc.body.releaseCapture) {
      doc.body.releaseCapture();
    }
  }
  // prevent select text in ie
  function fixIEMouseDown() {
    _ieSelectBack = doc.body.onselectstart;
    doc.body.onselectstart = fixIESelect;
    // http://stackoverflow.com/questions/1685326/responding-to-the-onmousemove-event-outside-of-the-browser-window-in-ie
    // ie6 will not response to event when cursor is out of window.
    if (doc.body.setCapture) {
      doc.body.setCapture();
    }
  }
  /*
   1. keeps IE from blowing up on images as drag handlers.
   IE 在 img 上拖动时默认不能拖动（不触发 mousemove，mouseup 事件，mouseup 后接着触发 mousemove ...）
   2. 防止 html5 draggable 元素的拖放默认行为 (选中文字拖放)
   3. 防止默认的选择文本行为(??场景？)
   */
  function preventDefault(e) {
    e.preventDefault();
  }
  /*
   keeps IE from selecting text
   */
  function fixIESelect() {
    return false;
  }
  function onGestureStart(e) {
    this._isValidDrag = 0;
    this.onGestureStart(e);
  }
  exports = Draggable;
  return exports;
}();
ddDraggableDelegate = function (exports) {
  /**
   * @ignore
   * delegate all draggable nodes to one draggable object
   * @author yiminghe@gmail.com
   */
  var DDM = ddDdm, Draggable = ddDraggable, PREFIX_CLS = DDM.PREFIX_CLS, $ = _node_;
  /**
   * @extends KISSY.DD.Draggable
   * @class KISSY.DD.DraggableDelegate
   * drag multiple nodes under a container element
   * using only one draggable instance as a delegate.
   */
  exports = Draggable.extend({
    _onSetNode: function () {
    },
    _onSetDisabled: function (d) {
      var self = this;
      var container = self.get('container');
      if (container) {
        container[d ? 'addClass' : 'removeClass'](PREFIX_CLS + '-disabled');
        self[d ? 'stop' : 'start']();
      }
    },
    getEventTargetEl: function () {
      return this.get('container');
    },
    onGestureStart: function (ev) {
      var self = this, handler, node;
      if (!self._checkDragStartValid(ev)) {
        return;
      }
      var handlers = self.get('handlers'), target = $(ev.target);
      if (handlers.length) {
        handler = self._getHandler(target);
      } else {
        handler = target;
      }
      if (handler) {
        node = self._getNode(handler);
      }
      if (!node) {
        return;
      }
      self.setInternal('activeHandler', handler);
      self.setInternal('node', node);
      self.setInternal('dragNode', node);
      self._prepare(ev);
    },
    _getHandler: function (target) {
      var self = this, node = self.get('container'), handlers = self.get('handlers');
      while (target && target[0] !== node[0]) {
        for (var i = 0; i < handlers.length; i++) {
          var h = handlers[i];
          if (target.test(h)) {
            return target;
          }
        }
        target = target.parent();
      }
      return null;
    },
    _getNode: function (h) {
      return h.closest(this.get('selector'), this.get('container'));
    }
  }, {
    ATTRS: {
      container: {
        setter: function (v) {
          return $(v);
        }
      },
      selector: {},
      handlers: {
        valueFn: function () {
          return [];
        },
        getter: 0
      }
    }
  });
  return exports;
}();
ddDroppable = function (exports) {
  var $ = _node_, DDM = ddDdm, Base = base, PREFIX_CLS = DDM.PREFIX_CLS;
  var util = _util_;
  function validDrop(dropGroups, dragGroups) {
    if (dragGroups === true) {
      return 1;
    }
    for (var d in dropGroups) {
      if (dragGroups[d]) {
        return 1;
      }
    }
    return 0;
  }
  exports = Base.extend({
    initializer: function () {
      var self = this;
      self.addTarget(DDM);
      DDM.addDrop(this);
    },
    getNodeFromTarget: function (ev, dragNode, proxyNode) {
      var node = this.get('node'), domNode = node[0];
      return domNode === dragNode || domNode === proxyNode ? null : node;
    },
    _active: function () {
      var self = this, drag = DDM.get('activeDrag'), node = self.get('node'), dropGroups = self.get('groups'), dragGroups = drag.get('groups');
      if (validDrop(dropGroups, dragGroups)) {
        DDM.addValidDrop(self);
        if (node) {
          node.addClass(PREFIX_CLS + 'drop-active-valid');
          DDM.cacheWH(node);
        }
      } else if (node) {
        node.addClass(PREFIX_CLS + 'drop-active-invalid');
      }
    },
    _deActive: function () {
      var node = this.get('node');
      if (node) {
        node.removeClass(PREFIX_CLS + 'drop-active-valid').removeClass(PREFIX_CLS + 'drop-active-invalid');
      }
    },
    __getCustomEvt: function (ev) {
      return util.mix({
        drag: DDM.get('activeDrag'),
        drop: this
      }, ev);
    },
    _handleOut: function () {
      var self = this, ret = self.__getCustomEvt();
      self.get('node').removeClass(PREFIX_CLS + 'drop-over');
      self.fire('dropexit', ret);
    },
    _handleEnter: function (ev) {
      var self = this, e = self.__getCustomEvt(ev);
      e.drag._handleEnter(e);
      self.get('node').addClass(PREFIX_CLS + 'drop-over');
      self.fire('dropenter', e);
    },
    _handleOver: function (ev) {
      var self = this, e = self.__getCustomEvt(ev);
      e.drag._handleOver(e);
      self.fire('dropover', e);
    },
    _end: function () {
      var self = this, ret = self.__getCustomEvt();
      self.get('node').removeClass(PREFIX_CLS + 'drop-over');
      self.fire('drophit', ret);
    },
    destructor: function () {
      DDM.removeDrop(this);
    }
  }, {
    name: 'Droppable',
    ATTRS: {
      node: {
        setter: function (v) {
          if (v) {
            return $(v);
          }
        }
      },
      groups: {
        valueFn: function () {
          return {};
        }
      },
      disabled: {}
    }
  });
  return exports;
}();
ddDroppableDelegate = function (exports) {
  var $ = _node_, DDM = ddDdm, Droppable = ddDroppable;
  var util = _util_;
  function dragStart() {
    var self = this, container = self.get('container'), allNodes = [], selector = self.get('selector');
    container.all(selector).each(function (n) {
      DDM.cacheWH(n);
      allNodes.push(n);
    });
    self.__allNodes = allNodes;
  }
  var DroppableDelegate = Droppable.extend({
    initializer: function () {
      DDM.on('dragstart', dragStart, this);
    },
    getNodeFromTarget: function (ev, dragNode, proxyNode) {
      var pointer = {
          left: ev.pageX,
          top: ev.pageY
        }, self = this, allNodes = self.__allNodes, ret = 0, vArea = Number.MAX_VALUE;
      if (allNodes) {
        util.each(allNodes, function (n) {
          var domNode = n[0];
          if (domNode === proxyNode || domNode === dragNode) {
            return;
          }
          var r = DDM.region(n);
          if (DDM.inRegion(r, pointer)) {
            var a = DDM.area(r);
            if (a < vArea) {
              vArea = a;
              ret = n;
            }
          }
        });
      }
      if (ret) {
        self.setInternal('lastNode', self.get('node'));
        self.setInternal('node', ret);
      }
      return ret;
    },
    _handleOut: function () {
      var self = this;
      self.callSuper();
      self.setInternal('node', 0);
      self.setInternal('lastNode', 0);
    },
    _handleOver: function (ev) {
      var self = this, node = self.get('node'), superOut = DroppableDelegate.superclass._handleOut, superOver = self.callSuper, superEnter = DroppableDelegate.superclass._handleEnter, lastNode = self.get('lastNode');
      if (lastNode[0] !== node[0]) {
        self.setInternal('node', lastNode);
        superOut.apply(self, arguments);
        self.setInternal('node', node);
        superEnter.call(self, ev);
      } else {
        superOver.call(self, ev);
      }
    },
    _end: function (e) {
      var self = this;
      self.callSuper(e);
      self.setInternal('node', 0);
    }
  }, {
    ATTRS: {
      lastNode: {},
      selector: {},
      container: {
        setter: function (v) {
          return $(v);
        }
      }
    }
  });
  exports = DroppableDelegate;
  return exports;
}();
dd = function (exports) {
  var DDM = ddDdm, Draggable = ddDraggable, DraggableDelegate = ddDraggableDelegate, DroppableDelegate = ddDroppableDelegate, Droppable = ddDroppable;
  exports = {
    version: '1.0.1',
    Draggable: Draggable,
    DDM: DDM,
    Droppable: Droppable,
    DroppableDelegate: DroppableDelegate,
    DraggableDelegate: DraggableDelegate
  };
  return exports;
}();
module.exports = dd;
});