export default class OrgChart extends HTMLElement {
  constructor(options) {
    super(); // always call super() first in the ctor.

    /* Frankly, I do believe Show DOM has the narrow usage range. */
    // Attach a shadow root to the element.
    // let shadowRoot = this.attachShadow({mode: 'open'});

    // shadowRoot.innerHTML = `
    //   <style> </style>
    //   <div class="container"> </div>
    // `;

    Promise.prototype.finally = function (callback) {
      let P = this.constructor;

      return this.then(
        value => P.resolve(callback()).then(() => value),
        reason => P.resolve(callback()).then(() => { throw reason; })
      );
    };

    let that = this,
      defaultOptions = {
        'nodeTitle': 'name',
        'nodeId': 'id',
        'toggleSiblingsResp': false,
        'depth': 999,
        'chartClass': '',
        'parentNodeSymbol': 'fa-users',
        'draggable': false,
        'direction': 't2b',
        'pan': false,
        'zoom': false
      },
      opts = Object.assign(defaultOptions, options);

    this.options = opts;

    this.addEventListener('click', this._clickChart.bind(this));

    if (opts.pan && opts.chartContainer) {
      let chartContainer = document.querySelector(opts.chartContainer);

      chartContainer.style.overflow = 'hidden';
      this.addEventListener('mousedown', this._onPanStart.bind(this));
      this.addEventListener('touchstart', this._onPanStart.bind(this));
      document.body.addEventListener('mouseup', this._onPanEnd.bind(this));
      document.body.addEventListener('touchend', this._onPanEnd.bind(this));
    }

    if (opts.zoom && opts.chartContainer) {
      let chartContainer = document.querySelector(opts.chartContainer);

      chartContainer.addEventListener('wheel', this._onWheeling.bind(this));
      chartContainer.addEventListener('touchstart', this._onTouchStart.bind(this));
      document.body.addEventListener('touchmove', this._onTouchMove.bind(this));
      document.body.addEventListener('touchend', this._onTouchEnd.bind(this));
    }
  }
  connectedCallback() {
    let that = this,
      opts = this.options,
      data = opts.data;

    this.setAttribute('class', 'orgchart' + (opts.chartClass !== '' ? ' ' + opts.chartClass : '') +
      (opts.direction !== 't2b' ? ' ' + opts.direction : ''));
    if (typeof data === 'object') { // local json datasource
      this.buildHierarchy(this, opts.ajaxURL ? data : this._attachRel(data, '00'), 0);
    } else if (typeof data === 'string' && data.startsWith('#')) { // ul datasource
      this.buildHierarchy(this, this._buildJsonDS(document.querySelector(data).children[0]), 0);
    } else { // ajax datasource
      let spinner = document.createElement('i');

      spinner.setAttribute('class', 'fa fa-circle-o-notch fa-spin spinner');
      this.appendChild(spinner);
      this._getJSON(data)
      .then(function (resp) {
        that.buildHierarchy(that, opts.ajaxURL ? resp : that._attachRel(resp, '00'), 0);
      })
      .catch(function (err) {
        console.error('failed to fetch datasource for orgchart', err);
      })
      .finally(function () {
        let spinner = that.querySelector('.spinner');

        spinner.parentNode.removeChild(spinner);
      });
    }
  }

  disconnectedCallback() {

  }

  attributeChangedCallback(attrName, oldVal, newVal) {

  }

  _closest(el, fn) {
    return el && ((fn(el) && el !== this) ? el : this._closest(el.parentNode, fn));
  }
  _siblings(el, expr) {
    return Array.from(el.parentNode.children).filter((child) => {
      if (child !== el) {
        if (expr) {
          return el.matches(expr);
        }
        return true;
      }
      return false;
    });
  }
  _prevAll(el, expr) {
    let sibs = [],
      prevSib = el.previousElementSibling;

    while (prevSib) {
      if (!expr || prevSib.matches(expr)) {
        sibs.push(prevSib);
      }
      prevSib = prevSib.previousElementSibling;
    }
    return sibs;
  }
  _nextAll(el, expr) {
    let sibs = [];
    let nextSib = el.nextElementSibling;

    while (nextSib) {
      if (!expr || nextSib.matches(expr)) {
        sibs.push(nextSib);
      }
      nextSib = nextSib.nextElementSibling;
    }
    return sibs;
  }
  _isVisible(el) {
    return el.offsetParent !== null;
  }
  _addClass(elements, classNames) {
    elements.forEach((el) => {
      if (classNames.indexOf(' ') > 0) {
        classNames.split(' ').forEach((className) => el.classList.add(className));
      } else {
        el.classList.add(classNames);
      }
    });
  }
  _removeClass(elements, classNames) {
    elements.forEach((el) => {
      if (classNames.indexOf(' ') > 0) {
        classNames.split(' ').forEach((className) => el.classList.remove(className));
      } else {
        el.classList.remove(classNames);
      }
    });
  }
  _css(elements, prop, val) {
    elements.forEach((el) => {
      el.style[prop] = val;
    });
  }
  _removeAttr(elements, attr) {
    elements.forEach((el) => {
      el.removeAttribute(attr);
    });
  }
  _one(el, type, listener, self) {
    let one = function (event) {
      try {
        listener.call(self, event);
      } finally {
        el.removeEventListener(type, one);
      }
    };

    el.addEventListener(type, one);
  }
  _getDescElements(ancestors, selector) {
    let results = [];

    ancestors.forEach((el) => results.push(...el.querySelectorAll(selector)));
    return results;
  }
  _getJSON(url) {
    return new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest();

      function handler() {
        if (this.readyState !== 4) {
          return;
        }
        if (this.status === 200) {
          resolve(JSON.parse(this.response));
        } else {
          reject(new Error(this.statusText));
        }
      }
      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      // xhr.setRequestHeader('Accept', 'application/json');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send();
    });
  }
  _buildJsonDS(li) {
    let subObj = {
      'name': li.firstChild.textContent.trim(),
      'relationship': (li.parentNode.parentNode.nodeName === 'LI' ? '1' : '0') +
        (li.parentNode.children.length > 1 ? 1 : 0) + (li.children.length ? 1 : 0)
    };

    if (li.id) {
      subObj.id = li.id;
    }
    if (li.querySelector('ul')) {
      Array.from(li.querySelector('ul').children).forEach((el) => {
        if (!subObj.children) { subObj.children = []; }
        subObj.children.push(this._buildJsonDS(el));
      });
    }
    return subObj;
  }
  _attachRel(data, flags) {
    data.relationship = flags + (data.children && data.children.length > 0 ? 1 : 0);
    if (data.children) {
      for (let item of data.children) {
        this._attachRel(item, '1' + (data.children.length > 1 ? 1 : 0));
      }
    }
    return data;
  }
  _repaint(node) {
    if (node) {
      node.style.offsetWidth = node.offsetWidth;
    }
  }
  // whether the cursor is hovering over the node
  _isInAction(node) {
    return node.querySelector(':scope > .edge').className.indexOf('fa-') > -1;
  }
  // detect the exist/display state of related node
  _getNodeState(node, relation) {
    let criteria,
      state = { 'exist': false, 'visible': false };

    if (relation === 'parent') {
      criteria = this._closest(node, (el) => el.classList && el.classList.contains('nodes'));
      if (criteria) {
        state.exist = true;
      }
      if (state.exist && this._isVisible(criteria.parentNode.children[0])) {
        state.visible = true;
      }
    } else if (relation === 'children') {
      criteria = this._closest(node, (el) => el.nodeName === 'TR').nextElementSibling;
      if (criteria) {
        state.exist = true;
      }
      if (state.exist && this._isVisible(criteria)) {
        state.visible = true;
      }
    } else if (relation === 'siblings') {
      criteria = this._siblings(this._closest(node, (el) => el.nodeName === 'TABLE').parentNode);
      if (criteria.length) {
        state.exist = true;
      }
      if (state.exist && criteria.some((el) => this._isVisible(el))) {
        state.visible = true;
      }
    }

    return state;
  }
  // find the related nodes
  getRelatedNodes(node, relation) {
    if (relation === 'parent') {
      return this._closest(node, (el) => el.classList.contains('nodes'))
        .parentNode.children[0].querySelector('.node');
    } else if (relation === 'children') {
      return Array.from(this._closest(node, (el) => el.nodeName === 'TABLE').lastChild.children)
        .map((el) => el.querySelector('.node'));
    } else if (relation === 'siblings') {
      return this._siblings(this._closest(node, (el) => el.nodeName === 'TABLE').parentNode)
        .map((el) => el.querySelector('.node'));
    }
    return [];
  }
  _switchHorizontalArrow(node) {
    let opts = this.options,
      leftEdge = node.querySelector('.leftEdge'),
      rightEdge = node.querySelector('.rightEdge'),
      temp = this._closest(node, (el) => el.nodeName === 'TABLE').parentNode;

    if (opts.toggleSiblingsResp && (typeof opts.ajaxURL === 'undefined' ||
      this._closest(node, (el) => el.classList.contains('.nodes')).dataset.siblingsLoaded)) {
      let prevSib = temp.previousElementSibling,
        nextSib = temp.nextElementSibling;

      if (prevSib) {
        if (prevSib.classList.contains('hidden')) {
          leftEdge.classList.add('fa-chevron-left');
          leftEdge.classList.remove('fa-chevron-right');
        } else {
          leftEdge.classList.add('fa-chevron-right');
          leftEdge.classList.remove('fa-chevron-left');
        }
      }
      if (nextSib) {
        if (nextSib.classList.contains('hidden')) {
          rightEdge.classList.add('fa-chevron-right');
          rightEdge.classList.remove('fa-chevron-left');
        } else {
          rightEdge.classList.add('fa-chevron-left');
          rightEdge.classList.remove('fa-chevron-right');
        }
      }
    } else {
      let sibs = this._siblings(temp),
        sibsVisible = sibs.length ? !sibs.some((el) => el.classList.contains('hidden')) : false;

      leftEdge.classList.toggle('fa-chevron-right', sibsVisible);
      leftEdge.classList.toggle('fa-chevron-left', !sibsVisible);
      rightEdge.classList.toggle('fa-chevron-left', sibsVisible);
      rightEdge.classList.toggle('fa-chevron-right', !sibsVisible);
    }
  }
  _hoverNode(event) {
    let node = event.target,
      flag = false,
      topEdge = node.querySelector(':scope > .topEdge'),
      bottomEdge = node.querySelector(':scope > .bottomEdge'),
      leftEdge = node.querySelector(':scope > .leftEdge');

    if (event.type === 'mouseenter') {
      if (topEdge) {
        flag = this._getNodeState(node, 'parent').visible;
        topEdge.classList.toggle('fa-chevron-up', !flag);
        topEdge.classList.toggle('fa-chevron-down', flag);
      }
      if (bottomEdge) {
        flag = this._getNodeState(node, 'children').visible;
        bottomEdge.classList.toggle('fa-chevron-down', !flag);
        bottomEdge.classList.toggle('fa-chevron-up', flag);
      }
      if (leftEdge) {
        this._switchHorizontalArrow(node);
      }
    } else {
      Array.from(node.querySelectorAll(':scope > .edge')).forEach((el) => {
        el.classList.remove('fa-chevron-up', 'fa-chevron-down', 'fa-chevron-right', 'fa-chevron-left');
      });
    }
  }
  // define node click event handler
  _clickNode(event) {
    let clickedNode = event.currentTarget,
      focusedNode = this.querySelector('.focused');

    if (focusedNode) {
      focusedNode.classList.remove('focused');
    }
    clickedNode.classList.add('focused');
  }
  // build the parent node of specific node
  _buildParentNode(currentRoot, nodeData, callback) {
    let that = this,
      table = document.createElement('table');

    nodeData.relationship = '001';
    this._createNode(nodeData, 0)
      .then(function (nodeDiv) {
        nodeDiv.classList.remove('slide-up');
        nodeDiv.classList.add('slide-down');
        let parentTr = document.createElement('tr'),
          superiorLine = document.createElement('tr'),
          inferiorLine = document.createElement('tr'),
          childrenTr = document.createElement('tr');

        parentTr.setAttribute('class', 'hidden');
        parentTr.innerHTML = `<td colspan="2"></td>`;
        table.appendChild(parentTr);
        superiorLine.setAttribute('class', 'lines hidden');
        superiorLine.innerHTML = `<td colspan="2"><div class="downLine"></div></td>`;
        table.appendChild(superiorLine);
        inferiorLine.setAttribute('class', 'lines hidden');
        inferiorLine.innerHTML = `<td class="rightLine">&nbsp;</td><td class="leftLine">&nbsp;</td>`;
        table.appendChild(inferiorLine);
        childrenTr.setAttribute('class', 'nodes');
        childrenTr.innerHTML = `<td colspan="2"></td>`;
        table.appendChild(childrenTr);
        table.querySelector('td').appendChild(nodeDiv);
        that.insertBefore(table, that.children[0]);
        table.children[3].children[0].appendChild(that.lastChild);
        callback();
      })
      .catch(function (err) {
        console.error('Failed to create parent node', err);
      });
  }
  _switchVerticalArrow(arrow) {
    arrow.classList.toggle('fa-chevron-up');
    arrow.classList.toggle('fa-chevron-down');
  }
  // show the parent node of the specified node
  showParent(node) {
    // just show only one superior level
    let temp = this._prevAll(this._closest(node, (el) => el.classList.contains('nodes')));

    this._removeClass(temp, 'hidden');
    // just show only one line
    this._addClass(Array(temp[0].children).slice(1, -1), 'hidden');
    // show parent node with animation
    let parent = temp[2].querySelector('.node');

    this._one(parent, 'transitionend', function () {
      parent.classList.remove('slide');
      if (this._isInAction(node)) {
        this._switchVerticalArrow(node.querySelector(':scope > .topEdge'));
      }
    }, this);
    this._repaint(parent);
    parent.classList.add('slide');
    parent.classList.remove('slide-down');
  }
  // show the sibling nodes of the specified node
  showSiblings(node, direction) {
    // firstly, show the sibling td tags
    let siblings = [],
      temp = this._closest(node, (el) => el.nodeName === 'TABLE').parentNode;

    if (direction) {
      siblings = direction === 'left' ? this._prevAll(temp) : this._nextAll(temp);
    } else {
      siblings = this._siblings(temp);
    }
    this._removeClass(siblings, 'hidden');
    // secondly, show the lines
    let upperLevel = this._prevAll(this._closest(node, (el) => el.classList.contains('nodes')));

    temp = Array.from(upperLevel[0].querySelectorAll(':scope > .hidden'));
    if (direction) {
      this._removeClass(temp.slice(0, siblings.length * 2), 'hidden');
    } else {
      this._removeClass(temp, 'hidden');
    }
    // thirdly, do some cleaning stuff
    if (!this._getNodeState(node, 'parent').visible) {
      this._removeClass(upperLevel, 'hidden');
      let parent = upperLevel[2].querySelector('.node');

      this._one(parent, 'transitionend', function (event) {
        event.target.classList.remove('slide');
      }, this);
      this._repaint(parent);
      parent.classList.add('slide');
      parent.classList.remove('slide-down');
    }
    // lastly, show the sibling nodes with animation
    siblings.forEach((sib) => {
      Array.from(sib.querySelectorAll('.node')).forEach((node) => {
        if (this._isVisible(node)) {
          node.classList.add('slide');
          node.classList.remove('slide-left', 'slide-right');
        }
      });
    });
    this._one(siblings[0].querySelector('.slide'), 'transitionend', function () {
      siblings.forEach((sib) => {
        this._removeClass(Array.from(sib.querySelectorAll('.slide')), 'slide');
      });
      if (this._isInAction(node)) {
        this._switchHorizontalArrow(node);
        node.querySelector('.topEdge').classList.remove('fa-chevron-up');
        node.querySelector('.topEdge').classList.add('fa-chevron-down');
      }
    }, this);
  }
  // hide the sibling nodes of the specified node
  hideSiblings(node, direction) {
    let nodeContainer = this._closest(node, (el) => el.nodeName === 'TABLE').parentNode,
      siblings = this._siblings(nodeContainer);

    siblings.forEach((sib) => {
      if (sib.querySelector('.spinner')) {
        this.dataset.inAjax = false;
      }
    });

    if (!direction || (direction && direction === 'left')) {
      let preSibs = this._prevAll(nodeContainer);

      preSibs.forEach((sib) => {
        Array.from(sib.querySelectorAll('.node')).forEach((node) => {
          if (this._isVisible(node)) {
            node.classList.add('slide', 'slide-right');
          }
        });
      });
    }
    if (!direction || (direction && direction !== 'left')) {
      let nextSibs = this._nextAll(nodeContainer);

      nextSibs.forEach((sib) => {
        Array.from(sib.querySelectorAll('.node')).forEach((node) => {
          if (this._isVisible(node)) {
            node.classList.add('slide', 'slide-left');
          }
        });
      });
    }

    let animatedNodes = [];

    this._siblings(nodeContainer).forEach((sib) => {
      Array.prototype.push.apply(animatedNodes, Array.from(sib.querySelectorAll('.slide')));
    });
    let lines = [];

    for (let node of animatedNodes) {
      let temp = this._closest(node, function (el) {
        return el.classList.contains('nodes');
      }).previousElementSibling;

      lines.push(temp);
      lines.push(temp.previousElementSibling);
    }
    lines = [...new Set(lines)];
    lines.forEach(function (line) {
      line.style.visibility = 'hidden';
    });

    this._one(animatedNodes[0], 'transitionend', function (event) {
      lines.forEach(function (line) {
        line.removeAttribute('style');
      });
      let sibs = [];

      if (direction) {
        if (direction === 'left') {
          sibs = this._prevAll(nodeContainer, ':not(.hidden)');
        } else {
          sibs = this._nextAll(nodeContainer, ':not(.hidden)');
        }
      } else {
        sibs = this._siblings(nodeContainer);
      }
      let temp = Array.from(this._closest(nodeContainer, function (el) {
        return el.classList.contains('nodes');
      }).previousElementSibling.querySelectorAll(':scope > :not(.hidden)'));

      let someLines = temp.slice(1, direction ? sibs.length * 2 + 1 : -1);

      this._addClass(someLines, 'hidden');
      this._removeClass(animatedNodes, 'slide');
      sibs.forEach((sib) => {
        Array.from(sib.querySelectorAll('.node')).slice(1).forEach((node) => {
          if (this._isVisible(node)) {
            node.classList.remove('slide-left', 'slide-right');
            node.classList.add('slide-up');
          }
        });
      });
      sibs.forEach((sib) => {
        this._addClass(Array.from(sib.querySelectorAll('.lines')), 'hidden');
        this._addClass(Array.from(sib.querySelectorAll('.nodes')), 'hidden');
        this._addClass(Array.from(sib.querySelectorAll('.verticalNodes')), 'hidden');
      });
      this._addClass(sibs, 'hidden');

      if (this._isInAction(node)) {
        this._switchHorizontalArrow(node);
      }
    }, this);
  }
  // recursively hide the ancestor node and sibling nodes of the specified node
  hideParent(node) {
    let temp = Array.from(this._closest(node, function (el) {
      return el.classList.contains('nodes');
    }).parentNode.children).slice(0, 3);

    if (temp[0].querySelector('.spinner')) {
      this.dataset.inAjax = false;
    }
    // hide the sibling nodes
    if (this._getNodeState(node, 'siblings').visible) {
      this.hideSiblings(node);
    }
    // hide the lines
    let lines = temp.slice(1);

    this._css(lines, 'visibility', 'hidden');
    // hide the superior nodes with transition
    let parent = temp[0].querySelector('.node'),
      grandfatherVisible = this._getNodeState(parent, 'parent').visible;

    if (parent && this._isVisible(parent)) {
      parent.classList.add('slide', 'slide-down');
      this._one(parent, 'transitionend', function () {
        parent.classList.remove('slide');
        this._removeAttr(lines, 'style');
        this._addClass(temp, 'hidden');
      }, this);
    }
    // if the current node has the parent node, hide it recursively
    if (parent && grandfatherVisible) {
      this.hideParent(parent);
    }
  }
  // exposed method
  addParent(currentRoot, data) {
    let that = this;

    this._buildParentNode(currentRoot, data, function () {
      if (!currentRoot.querySelector(':scope > .topEdge')) {
        let topEdge = document.createElement('i');

        topEdge.setAttribute('class', 'edge verticalEdge topEdge fa');
        currentRoot.appendChild(topEdge);
      }
      that.showParent(currentRoot);
    });
  }
  // start up loading status for requesting new nodes
  _startLoading(arrow, node) {
    let opts = this.options;

    if (typeof this.dataset.inAjax !== 'undefined' && this.dataset.inAjax === 'true') {
      return false;
    }

    arrow.classList.add('hidden');
    let spinner = document.createElement('i');

    spinner.setAttribute('class', 'fa fa-circle-o-notch fa-spin spinner');
    node.appendChild(spinner);
    this._addClass(Array.from(node.querySelectorAll(':scope > *:not(.spinner)')), 'hazy');
    this.dataset.inAjax = true;

    return true;
  }
  // terminate loading status for requesting new nodes
  _endLoading(arrow, node) {
    let opts = this.options;

    arrow.classList.remove('hidden');
    node.querySelector(':scope > .spinner').remove();
    this._removeClass(Array.from(node.querySelectorAll(':scope > .hazy')), 'hazy');
    this.dataset.inAjax = false;
  }
  // define click event handler for the top edge
  _clickTopEdge(event) {
    event.stopPropagation();
    let that = this,
      topEdge = event.target,
      node = topEdge.parentNode,
      parentState = this._getNodeState(node, 'parent'),
      opts = this.options;

    if (parentState.exist) {
      let temp = this._closest(node, function (el) {
        return el.classList.contains('nodes');
      });
      let parent = temp.parentNode.firstChild.querySelector('.node');

      if (parent.classList.contains('slide')) { return; }
      // hide the ancestor nodes and sibling nodes of the specified node
      if (parentState.visible) {
        this.hideParent(node);
        this._one(parent, 'transitionend', function () {
          if (this._isInAction(node)) {
            this._switchVerticalArrow(topEdge);
            this._switchHorizontalArrow(node);
          }
        }, this);
      } else { // show the ancestors and siblings
        this.showParent(node);
      }
    } else {
      // load the new parent node of the specified node by ajax request
      let nodeId = topEdge.parentNode.id;

      // start up loading status
      if (this._startLoading(topEdge, node)) {
        // load new nodes
        this._getJSON(typeof opts.ajaxURL.parent === 'function' ?
          opts.ajaxURL.parent(node.dataset.source) : opts.ajaxURL.parent + nodeId)
        .then(function (resp) {
          if (that.dataset.inAjax === 'true') {
            if (Object.keys(resp).length) {
              that.addParent(node, resp);
            }
          }
        })
        .catch(function (err) {
          console.error('Failed to get parent node data.', err);
        })
        .finally(function () {
          that._endLoading(topEdge, node);
        });
      }
    }
  }
  // recursively hide the descendant nodes of the specified node
  hideChildren(node) {
    let that = this,
      temp = this._nextAll(node.parentNode.parentNode),
      lastItem = temp[temp.length - 1],
      lines = [];

    if (lastItem.querySelector('.spinner')) {
      this.dataset.inAjax = false;
    }
    let descendants = Array.from(lastItem.querySelectorAll('.node')).filter((el) => that._isVisible(el)),
      isVerticalDesc = lastItem.classList.contains('verticalNodes');

    if (!isVerticalDesc) {
      descendants.forEach((desc) => {
        Array.prototype.push.apply(lines,
          that._prevAll(that._closest(desc, (el) => el.classList.contains('nodes')), '.lines'));
      });
      lines = [...new Set(lines)];
      this._css(lines, 'visibility', 'hidden');
    }
    this._one(descendants[0], 'transitionend', function (event) {
      this._removeClass(descendants, 'slide');
      if (isVerticalDesc) {
        that._addClass(temp, 'hidden');
      } else {
        lines.forEach((el) => {
          el.removeAttribute('style');
          el.classList.add('hidden');
          el.parentNode.lastChild.classList.add('hidden');
        });
        this._addClass(Array.from(lastItem.querySelectorAll('.verticalNodes')), 'hidden');
      }
      if (this._isInAction(node)) {
        this._switchVerticalArrow(node.querySelector('.bottomEdge'));
      }
    }, this);
    this._addClass(descendants, 'slide slide-up');
  }
  // show the children nodes of the specified node
  showChildren(node) {
    let that = this,
      temp = this._nextAll(node.parentNode.parentNode),
      descendants = [];

    this._removeClass(temp, 'hidden');
    if (temp.some((el) => el.classList.contains('verticalNodes'))) {
      temp.forEach((el) => {
        Array.prototype.push.apply(descendants, Array.from(el.querySelectorAll('.node')).filter((el) => {
          return that._isVisible(el);
        }));
      });
    } else {
      Array.from(temp[2].children).forEach((el) => {
        Array.prototype.push.apply(descendants,
          Array.from(el.querySelector('tr').querySelectorAll('.node')).filter((el) => {
            return that._isVisible(el);
          }));
      });
    }
    // the two following statements are used to enforce browser to repaint
    this._repaint(descendants[0]);
    this._one(descendants[0], 'transitionend', (event) => {
      this._removeClass(descendants, 'slide');
      if (this._isInAction(node)) {
        this._switchVerticalArrow(node.querySelector('.bottomEdge'));
      }
    }, this);
    this._addClass(descendants, 'slide');
    this._removeClass(descendants, 'slide-up');
  }
  // build the child nodes of specific node
  _buildChildNode(appendTo, nodeData, callback) {
    let data = nodeData.children || nodeData.siblings;

    appendTo.querySelector('td').setAttribute('colSpan', data.length * 2);
    this.buildHierarchy(appendTo, { 'children': data }, 0, callback);
  }
  // exposed method
  addChildren(node, data) {
    let that = this,
      opts = this.options,
      count = 0;

    this.dataset.inEdit = 'addChildren';
    this._buildChildNode.call(this, this._closest(node, (el) => el.nodeName === 'TABLE'), data, function () {
      if (++count === data.children.length) {
        if (!node.querySelector('.bottomEdge')) {
          let bottomEdge = document.createElement('i');

          bottomEdge.setAttribute('class', 'edge verticalEdge bottomEdge fa');
          node.appendChild(bottomEdge);
        }
        if (!node.querySelector('.symbol')) {
          let symbol = document.createElement('i');

          symbol.setAttribute('class', 'fa ' + opts.parentNodeSymbol + ' symbol');
          node.querySelector(':scope > .title').appendChild(symbol);
        }
        that.showChildren(node);
        that.dataset.inEdit = '';
      }
    });
  }
  // bind click event handler for the bottom edge
  _clickBottomEdge(event) {
    event.stopPropagation();
    let that = this,
      opts = this.options,
      bottomEdge = event.target,
      node = bottomEdge.parentNode,
      childrenState = this._getNodeState(node, 'children');

    if (childrenState.exist) {
      let temp = this._closest(node, function (el) {
        return el.nodeName === 'TR';
      }).parentNode.lastChild;

      if (Array.from(temp.querySelectorAll('.node')).some((node) => {
        return this._isVisible(node) && node.classList.contains('slide');
      })) { return; }
      // hide the descendant nodes of the specified node
      if (childrenState.visible) {
        this.hideChildren(node);
      } else { // show the descendants
        this.showChildren(node);
      }
    } else { // load the new children nodes of the specified node by ajax request
      let nodeId = bottomEdge.parentNode.id;

      if (this._startLoading(bottomEdge, node)) {
        this._getJSON(typeof opts.ajaxURL.children === 'function' ?
          opts.ajaxURL.children(node.dataset.source) : opts.ajaxURL.children + nodeId)
        .then(function (resp) {
          if (that.dataset.inAjax === 'true') {
            if (resp.children.length) {
              that.addChildren(node, resp);
            }
          }
        })
        .catch(function (err) {
          console.error('Failed to get children nodes data', err);
        })
        .finally(function () {
          that._endLoading(bottomEdge, node);
        });
      }
    }
  }
  // subsequent processing of build sibling nodes
  _complementLine(oneSibling, siblingCount, existingSibligCount) {
    let temp = oneSibling.parentNode.parentNode.children;

    temp[0].children[0].setAttribute('colspan', siblingCount * 2);
    temp[1].children[0].setAttribute('colspan', siblingCount * 2);
    for (let i = 0; i < existingSibligCount; i++) {
      let rightLine = document.createElement('td'),
        leftLine = document.createElement('td');

      rightLine.setAttribute('class', 'rightLine topLine');
      rightLine.innerHTML = '&nbsp;';
      temp[2].insertBefore(rightLine, temp[2].children[1]);
      leftLine.setAttribute('class', 'leftLine topLine');
      leftLine.innerHTML = '&nbsp;';
      temp[2].insertBefore(leftLine, temp[2].children[1]);
    }
  }
  // build the sibling nodes of specific node
  _buildSiblingNode(nodeChart, nodeData, callback) {
    let that = this,
      newSiblingCount = nodeData.siblings ? nodeData.siblings.length : nodeData.children.length,
      existingSibligCount = nodeChart.parentNode.nodeName === 'TD' ? this._closest(nodeChart, (el) => {
        return el.nodeName === 'TR';
      }).children.length : 1,
      siblingCount = existingSibligCount + newSiblingCount,
      insertPostion = (siblingCount > 1) ? Math.floor(siblingCount / 2 - 1) : 0;

    // just build the sibling nodes for the specific node
    if (nodeChart.parentNode.nodeName === 'TD') {
      let temp = this._prevAll(nodeChart.parentNode.parentNode);

      temp[0].remove();
      temp[1].remove();
      let childCount = 0;

      that._buildChildNode.call(that, that._closest(nodeChart.parentNode, (el) => el.nodeName === 'TABLE'),
        nodeData, () => {
          if (++childCount === newSiblingCount) {
            let siblingTds = Array.from(that._closest(nodeChart.parentNode, (el) => el.nodeName === 'TABLE')
              .lastChild.children);

            if (existingSibligCount > 1) {
              let temp = nodeChart.parentNode.parentNode;

              Array.from(temp.children).forEach((el) => {
                siblingTds[0].parentNode.insertBefore(el, siblingTds[0]);
              });
              temp.remove();
              that._complementLine(siblingTds[0], siblingCount, existingSibligCount);
              that._addClass(siblingTds, 'hidden');
              siblingTds.forEach((el) => {
                that._addClass(el.querySelectorAll('.node'), 'slide-left');
              });
            } else {
              let temp = nodeChart.parentNode.parentNode;

              siblingTds[insertPostion].parentNode.insertBefore(nodeChart.parentNode, siblingTds[insertPostion + 1]);
              temp.remove();
              that._complementLine(siblingTds[insertPostion], siblingCount, 1);
              that._addClass(siblingTds, 'hidden');
              that._addClass(that._getDescElements(siblingTds.slice(0, insertPostion + 1), '.node'), 'slide-right');
              that._addClass(that._getDescElements(siblingTds.slice(insertPostion + 1), '.node'), 'slide-left');
            }
            callback();
          }
        });
    } else { // build the sibling nodes and parent node for the specific ndoe
      let nodeCount = 0;

      that.buildHierarchy.call(that, that, nodeData, 0, () => {
        if (++nodeCount === siblingCount) {
          let temp = nodeChart.nextElementSibling.children[3]
            .children[insertPostion],
            td = document.createElement('td');

          td.setAttribute('colspan', 2);
          td.appendChild(nodeChart);
          temp.parentNode.insertBefore(td, temp.nextElementSibling);
          that._complementLine(temp, siblingCount, 1);

          let temp2 = that._closest(nodeChart, (el) => el.classList && el.classList.contains('nodes'))
            .parentNode.children[0];

          temp2.classList.add('hidden');
          that._addClass(Array.from(temp2.querySelectorAll('.node')), 'slide-down');

          let temp3 = this._siblings(nodeChart.parentNode);

          that._addClass(temp3, 'hidden');
          that._addClass(that._getDescElements(temp3.slice(0, insertPostion), '.node'), 'slide-right');
          that._addClass(that._getDescElements(temp3.slice(insertPostion), '.node'), 'slide-left');
          callback();
        }
      });
    }
  }
  addSiblings(node, data) {
    let that = this;

    this.dataset.inEdit = 'addSiblings';
    this._buildSiblingNode.call(this, this._closest(node, (el) => el.nodeName === 'TABLE'), data, () => {
      that._closest(node, (el) => el.classList && el.classList.contains('nodes'))
        .dataset.siblingsLoaded = true;
      if (!node.querySelector('.leftEdge')) {
        let rightEdge = document.createElement('i'),
          leftEdge = document.createElement('i');

        rightEdge.setAttribute('class', 'edge horizontalEdge rightEdge fa');
        node.appendChild(rightEdge);
        leftEdge.setAttribute('class', 'edge horizontalEdge leftEdge fa');
        node.appendChild(leftEdge);
      }
      that.showSiblings(node);
      that.dataset.inEdit = '';
    });
  }
  removeNodes(node) {
    let parent = this._closest(node, el => el.nodeName === 'TABLE').parentNode,
      sibs = this._siblings(parent.parentNode);

    if (parent.nodeName === 'TD') {
      if (this._getNodeState(node, 'siblings').exist) {
        sibs[2].querySelector('.topLine').nextElementSibling.remove();
        sibs[2].querySelector('.topLine').remove();
        sibs[0].children[0].setAttribute('colspan', sibs[2].children.length);
        sibs[1].children[0].setAttribute('colspan', sibs[2].children.length);
        parent.remove();
      } else {
        sibs[0].children[0].removeAttribute('colspan');
        sibs[0].querySelector('.bottomEdge').remove();
        this._siblings(sibs[0]).forEach(el => el.remove());
      }
    } else {
      Array.from(parent.parentNode.children).forEach(el => el.remove());
    }
  }
  // bind click event handler for the left and right edges
  _clickHorizontalEdge(event) {
    event.stopPropagation();
    let that = this,
      opts = this.options,
      hEdge = event.target,
      node = hEdge.parentNode,
      siblingsState = this._getNodeState(node, 'siblings');

    if (siblingsState.exist) {
      let temp = this._closest(node, function (el) {
          return el.nodeName === 'TABLE';
        }).parentNode,
        siblings = this._siblings(temp);

      if (siblings.some((el) => {
        let node = el.querySelector('.node');

        return this._isVisible(node) && node.classList.contains('slide');
      })) { return; }
      if (opts.toggleSiblingsResp) {
        let prevSib = this._closest(node, (el) => el.nodeName === 'TABLE').parentNode.previousElementSibling,
          nextSib = this._closest(node, (el) => el.nodeName === 'TABLE').parentNode.nextElementSibling;

        if (hEdge.classList.contains('leftEdge')) {
          if (prevSib.classList.contains('hidden')) {
            this.showSiblings(node, 'left');
          } else {
            this.hideSiblings(node, 'left');
          }
        } else {
          if (nextSib.classList.contains('hidden')) {
            this.showSiblings(node, 'right');
          } else {
            this.hideSiblings(node, 'right');
          }
        }
      } else {
        if (siblingsState.visible) {
          this.hideSiblings(node);
        } else {
          this.showSiblings(node);
        }
      }
    } else {
      // load the new sibling nodes of the specified node by ajax request
      let nodeId = hEdge.parentNode.id,
        url = (this._getNodeState(node, 'parent').exist) ?
          (typeof opts.ajaxURL.siblings === 'function' ?
            opts.ajaxURL.siblings(JSON.parse(node.dataset.source)) : opts.ajaxURL.siblings + nodeId) :
          (typeof opts.ajaxURL.families === 'function' ?
            opts.ajaxURL.families(JSON.parse(node.dataset.source)) : opts.ajaxURL.families + nodeId);

      if (this._startLoading(hEdge, node)) {
        this._getJSON(url)
        .then(function (resp) {
          if (that.dataset.inAjax === 'true') {
            if (resp.siblings || resp.children) {
              that.addSiblings(node, resp);
            }
          }
        })
        .catch(function (err) {
          console.error('Failed to get sibling nodes data', err);
        })
        .finally(function () {
          that._endLoading(hEdge, node);
        });
      }
    }
  }
  // event handler for toggle buttons in Hybrid(horizontal + vertical) OrgChart
  _clickToggleButton(event) {
    let that = this,
      toggleBtn = event.target,
      descWrapper = toggleBtn.parentNode.nextElementSibling,
      descendants = Array.from(descWrapper.querySelectorAll('.node')),
      children = Array.from(descWrapper.children).map(item => item.querySelector('.node'));

    if (children.some((item) => item.classList.contains('slide'))) { return; }
    toggleBtn.classList.toggle('fa-plus-square');
    toggleBtn.classList.toggle('fa-minus-square');
    if (descendants[0].classList.contains('slide-up')) {
      descWrapper.classList.remove('hidden');
      this._repaint(children[0]);
      this._addClass(children, 'slide');
      this._removeClass(children, 'slide-up');
      this._one(children[0], 'transitionend', () => {
        that._removeClass(children, 'slide');
      });
    } else {
      this._addClass(descendants, 'slide slide-up');
      this._one(descendants[0], 'transitionend', () => {
        that._removeClass(descendants, 'slide');
        descendants.forEach(desc => {
          let ul = that._closest(desc, function (el) {
            return el.nodeName === 'UL';
          });

          ul.classList.add('hidden');
        });
      });

      descendants.forEach(desc => {
        let subTBs = Array.from(desc.querySelectorAll('.toggleBtn'));

        that._removeClass(subTBs, 'fa-minus-square');
        that._addClass(subTBs, 'fa-plus-square');
      });
    }
  }
  _dispatchClickEvent(event) {
    let classList = event.target.classList;

    if (classList.contains('topEdge')) {
      this._clickTopEdge(event);
    } else if (classList.contains('rightEdge') || classList.contains('leftEdge')) {
      this._clickHorizontalEdge(event);
    } else if (classList.contains('bottomEdge')) {
      this._clickBottomEdge(event);
    } else if (classList.contains('toggleBtn')) {
      this._clickToggleButton(event);
    } else {
      this._clickNode(event);
    }
  }
  _onDragStart(event) {
    let nodeDiv = event.target,
      opts = this.options,
      isFirefox = /firefox/.test(window.navigator.userAgent.toLowerCase());

    if (isFirefox) {
      event.dataTransfer.setData('text/html', 'hack for firefox');
    }
    // if users enable zoom or direction options
    if (this.style.transform) {
      let ghostNode, nodeCover;

      if (!document.querySelector('.ghost-node')) {
        ghostNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        ghostNode.classList.add('ghost-node');
        nodeCover = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        ghostNode.appendChild(nodeCover);
        this.appendChild(ghostNode);
      } else {
        ghostNode = this.querySelector(':scope > .ghost-node');
        nodeCover = ghostNode.children[0];
      }
      let transValues = this.style.transform.split(','),
        scale = Math.abs(window.parseFloat((opts.direction === 't2b' || opts.direction === 'b2t') ?
          transValues[0].slice(transValues[0].indexOf('(') + 1) : transValues[1]));

      ghostNode.setAttribute('width', nodeDiv.offsetWidth);
      ghostNode.setAttribute('height', nodeDiv.offsetHeight);
      nodeCover.setAttribute('x', 5 * scale);
      nodeCover.setAttribute('y', 5 * scale);
      nodeCover.setAttribute('width', 120 * scale);
      nodeCover.setAttribute('height', 40 * scale);
      nodeCover.setAttribute('rx', 4 * scale);
      nodeCover.setAttribute('ry', 4 * scale);
      nodeCover.setAttribute('stroke-width', 1 * scale);
      let xOffset = event.offsetX * scale,
        yOffset = event.offsetY * scale;

      if (opts.direction === 'l2r') {
        xOffset = event.offsetY * scale;
        yOffset = event.offsetX * scale;
      } else if (opts.direction === 'r2l') {
        xOffset = nodeDiv.offsetWidth - event.offsetY * scale;
        yOffset = event.offsetX * scale;
      } else if (opts.direction === 'b2t') {
        xOffset = nodeDiv.offsetWidth - event.offsetX * scale;
        yOffset = nodeDiv.offsetHeight - event.offsetY * scale;
      }
      if (isFirefox) { // hack for old version of Firefox(< 48.0)
        let ghostNodeWrapper = document.createElement('img');

        ghostNodeWrapper.src = 'data:image/svg+xml;utf8,' + (new XMLSerializer()).serializeToString(ghostNode);
        event.dataTransfer.setDragImage(ghostNodeWrapper, xOffset, yOffset);
        nodeCover.setAttribute('fill', 'rgb(255, 255, 255)');
        nodeCover.setAttribute('stroke', 'rgb(191, 0, 0)');
      } else {
        event.dataTransfer.setDragImage(ghostNode, xOffset, yOffset);
      }
    }
    let dragged = event.target,
      dragZone = this._closest(dragged, (el) => {
        return el.classList && el.classList.contains('nodes');
      }).parentNode.children[0].querySelector('.node'),
      dragHier = Array.from(this._closest(dragged, (el) => {
        return el.nodeName === 'TABLE';
      }).querySelectorAll('.node'));

    this.dragged = dragged;
    Array.from(this.querySelectorAll('.node')).forEach(function (node) {
      if (!dragHier.includes(node)) {
        if (opts.dropCriteria) {
          if (opts.dropCriteria(dragged, dragZone, node)) {
            node.classList.add('allowedDrop');
          }
        } else {
          node.classList.add('allowedDrop');
        }
      }
    });
  }
  _onDragOver(event) {
    event.preventDefault();
    let dropZone = event.currentTarget;

    if (!dropZone.classList.contains('allowedDrop')) {
      event.dataTransfer.dropEffect = 'none';
    }
  }
  _onDragEnd(event) {
    Array.from(this.querySelectorAll('.allowedDrop')).forEach(function (el) {
      el.classList.remove('allowedDrop');
    });
  }
  _onDrop(event) {
    let dropZone = event.currentTarget,
      dragged = this.dragged,
      dragZone = this._closest(dragged, function (el) {
        return el.classList && el.classList.contains('nodes');
      }).parentNode.children[0].children[0];

    this._removeClass(Array.from(this.querySelectorAll('.allowedDrop')), 'allowedDrop');
    // firstly, deal with the hierarchy of drop zone
    if (!dropZone.parentNode.parentNode.nextElementSibling) { // if the drop zone is a leaf node
      let bottomEdge = document.createElement('i');

      bottomEdge.setAttribute('class', 'edge verticalEdge bottomEdge fa');
      dropZone.appendChild(bottomEdge);
      dropZone.parentNode.setAttribute('colspan', 2);
      let table = this._closest(dropZone, function (el) {
          return el.nodeName === 'TABLE';
        }),
        upperTr = document.createElement('tr'),
        lowerTr = document.createElement('tr'),
        nodeTr = document.createElement('tr');

      upperTr.setAttribute('class', 'lines');
      upperTr.innerHTML = `<td colspan="2"><div class="downLine"></div></td>`;
      table.appendChild(upperTr);
      lowerTr.setAttribute('class', 'lines');
      lowerTr.innerHTML = `<td class="rightLine">&nbsp;</td><td class="leftLine">&nbsp;</td>`;
      table.appendChild(lowerTr);
      nodeTr.setAttribute('class', 'nodes');
      table.appendChild(nodeTr);
      Array.from(dragged.querySelectorAll('.horizontalEdge')).forEach((hEdge) => {
        dragged.removeChild(hEdge);
      });
      let draggedTd = this._closest(dragged, (el) => el.nodeName === 'TABLE').parentNode;

      nodeTr.appendChild(draggedTd);
    } else {
      let dropColspan = window.parseInt(dropZone.parentNode.colSpan) + 2;

      dropZone.parentNode.setAttribute('colspan', dropColspan);
      dropZone.parentNode.parentNode.nextElementSibling.children[0].setAttribute('colspan', dropColspan);
      if (!dragged.querySelector('.horizontalEdge')) {
        let rightEdge = document.createElement('i'),
          leftEdge = document.createElement('i');

        rightEdge.setAttribute('class', 'edge horizontalEdge rightEdge fa');
        dragged.appendChild(rightEdge);
        leftEdge.setAttribute('class', 'edge horizontalEdge leftEdge fa');
        dragged.appendChild(leftEdge);
      }
      let temp = dropZone.parentNode.parentNode.nextElementSibling.nextElementSibling,
        leftline = document.createElement('td'),
        rightline = document.createElement('td');

      leftline.setAttribute('class', 'leftLine topLine');
      leftline.innerHTML = `&nbsp;`;
      temp.insertBefore(leftline, temp.children[1]);
      rightline.setAttribute('class', 'rightLine topLine');
      rightline.innerHTML = `&nbsp;`;
      temp.insertBefore(rightline, temp.children[2]);
      temp.nextElementSibling.appendChild(this._closest(dragged, function (el) {
        return el.nodeName === 'TABLE';
      }).parentNode);

      let dropSibs = this._siblings(this._closest(dragged, function (el) {
        return el.nodeName === 'TABLE';
      }).parentNode).map((el) => el.querySelector('.node'));

      if (dropSibs.length === 1) {
        let rightEdge = document.createElement('i'),
          leftEdge = document.createElement('i');

        rightEdge.setAttribute('class', 'edge horizontalEdge rightEdge fa');
        dropSibs[0].appendChild(rightEdge);
        leftEdge.setAttribute('class', 'edge horizontalEdge leftEdge fa');
        dropSibs[0].appendChild(leftEdge);
      }
    }
    // secondly, deal with the hierarchy of dragged node
    let dragColSpan = window.parseInt(dragZone.colSpan);

    if (dragColSpan > 2) {
      dragZone.setAttribute('colspan', dragColSpan - 2);
      dragZone.parentNode.nextElementSibling.children[0].setAttribute('colspan', dragColSpan - 2);
      let temp = dragZone.parentNode.nextElementSibling.nextElementSibling;

      temp.children[1].remove();
      temp.children[1].remove();

      let dragSibs = Array.from(dragZone.parentNode.parentNode.children[3].children).map(function (td) {
        return td.querySelector('.node');
      });

      if (dragSibs.length === 1) {
        dragSibs[0].querySelector('.leftEdge').remove();
        dragSibs[0].querySelector('.rightEdge').remove();
      }
    } else {
      dragZone.removeAttribute('colspan');
      dragZone.querySelector('.node').removeChild(dragZone.querySelector('.bottomEdge'));
      Array.from(dragZone.parentNode.parentNode.children).slice(1).forEach((tr) => tr.remove());
    }
    let customE = new CustomEvent('nodedropped.orgchart', { 'detail': {
      'draggedNode': dragged,
      'dragZone': dragZone.children[0],
      'dropZone': dropZone
    }});

    this.dispatchEvent(customE);
  }
  // create node
  _createNode(nodeData, level) {
    let that = this,
      opts = this.options;

    return new Promise(function (resolve, reject) {
      if (nodeData.children) {
        for (let child of nodeData.children) {
          child.parentId = nodeData.id;
        }
      }

      // construct the content of node
      let nodeDiv = document.createElement('div');

      delete nodeData.children;
      nodeDiv.dataset.source = JSON.stringify(nodeData);
      if (nodeData[opts.nodeId]) {
        nodeDiv.id = nodeData[opts.nodeId];
      }
      let inEdit = that.dataset.inEdit,
        isHidden;

      if (inEdit) {
        isHidden = inEdit === 'addChildren' ? ' slide-up' : '';
      } else {
        isHidden = level >= opts.depth ? ' slide-up' : '';
      }
      nodeDiv.setAttribute('class', 'node ' + (nodeData.className || '') + isHidden);
      if (opts.draggable) {
        nodeDiv.setAttribute('draggable', true);
      }
      if (nodeData.parentId) {
        nodeDiv.setAttribute('data-parent', nodeData.parentId);
      }
      nodeDiv.innerHTML = `
        <div class="title">${nodeData[opts.nodeTitle]}</div>
        ${opts.nodeContent ? `<div class="content">${nodeData[opts.nodeContent]}</div>` : ''}
      `;
      // append 4 direction arrows or expand/collapse buttons
      let flags = nodeData.relationship || '';

      if (opts.verticalDepth && (level + 2) > opts.verticalDepth) {
        if ((level + 1) >= opts.verticalDepth && Number(flags.substr(2, 1))) {
          let toggleBtn = document.createElement('i'),
            icon = level + 1 >= opts.depth ? 'plus' : 'minus';

          toggleBtn.setAttribute('class', 'toggleBtn fa fa-' + icon + '-square');
          nodeDiv.appendChild(toggleBtn);
        }
      } else {
        if (Number(flags.substr(0, 1))) {
          let topEdge = document.createElement('i');

          topEdge.setAttribute('class', 'edge verticalEdge topEdge fa');
          nodeDiv.appendChild(topEdge);
        }
        if (Number(flags.substr(1, 1))) {
          let rightEdge = document.createElement('i'),
            leftEdge = document.createElement('i');

          rightEdge.setAttribute('class', 'edge horizontalEdge rightEdge fa');
          nodeDiv.appendChild(rightEdge);
          leftEdge.setAttribute('class', 'edge horizontalEdge leftEdge fa');
          nodeDiv.appendChild(leftEdge);
        }
        if (Number(flags.substr(2, 1))) {
          let bottomEdge = document.createElement('i'),
            symbol = document.createElement('i'),
            title = nodeDiv.querySelector(':scope > .title');

          bottomEdge.setAttribute('class', 'edge verticalEdge bottomEdge fa');
          nodeDiv.appendChild(bottomEdge);
          symbol.setAttribute('class', 'fa ' + opts.parentNodeSymbol + ' symbol');
          title.insertBefore(symbol, title.children[0]);
        }
      }

      nodeDiv.addEventListener('mouseenter', that._hoverNode.bind(that));
      nodeDiv.addEventListener('mouseleave', that._hoverNode.bind(that));
      nodeDiv.addEventListener('click', that._dispatchClickEvent.bind(that));
      if (opts.draggable) {
        nodeDiv.addEventListener('dragstart', that._onDragStart.bind(that));
        nodeDiv.addEventListener('dragover', that._onDragOver.bind(that));
        nodeDiv.addEventListener('dragend', that._onDragEnd.bind(that));
        nodeDiv.addEventListener('drop', that._onDrop.bind(that));
      }
      // allow user to append dom modification after finishing node create of orgchart
      if (opts.createNode) {
        opts.createNode(nodeDiv, nodeData);
      }

      resolve(nodeDiv);
    });
  }
  buildHierarchy(appendTo, nodeData, level, callback) {
    // Construct the node
    let that = this,
      opts = this.options,
      nodeWrapper,
      childNodes = nodeData.children,
      isVerticalNode = opts.verticalDepth && (level + 1) >= opts.verticalDepth;

    if (Object.keys(nodeData).length > 1) { // if nodeData has nested structure
      nodeWrapper = isVerticalNode ? appendTo : document.createElement('table');
      if (!isVerticalNode) {
        appendTo.appendChild(nodeWrapper);
      }
      this._createNode(nodeData, level)
      .then(function (nodeDiv) {
        if (isVerticalNode) {
          nodeWrapper.insertBefore(nodeDiv, nodeWrapper.firstChild);
        } else {
          let tr = document.createElement('tr');

          tr.innerHTML = `
            <td ${childNodes ? `colspan="${childNodes.length * 2}"` : ''}>
            </td>
          `;
          tr.children[0].appendChild(nodeDiv);
          nodeWrapper.insertBefore(tr, nodeWrapper.children[0] ? nodeWrapper.children[0] : null);
        }
        if (callback) {
          callback();
        }
      })
      .catch(function (err) {
        console.error('Failed to creat node', err);
      });
    }
    // Construct the inferior nodes and connectiong lines
    if (childNodes) {
      if (Object.keys(nodeData).length === 1) { // if nodeData is just an array
        nodeWrapper = appendTo;
      }
      let isHidden,
        isVerticalLayer = opts.verticalDepth && (level + 2) >= opts.verticalDepth,
        inEdit = that.dataset.inEdit;

      if (inEdit) {
        isHidden = inEdit === 'addSiblings' ? '' : ' hidden';
      } else {
        isHidden = level + 1 >= opts.depth ? ' hidden' : '';
      }

      // draw the line close to parent node
      if (!isVerticalLayer) {
        let tr = document.createElement('tr');

        tr.setAttribute('class', 'lines' + isHidden);
        tr.innerHTML = `
          <td colspan="${ childNodes.length * 2 }">
            <div class="downLine"></div>
          </td>
        `;
        nodeWrapper.appendChild(tr);
      }
      // draw the lines close to children nodes
      let lineLayer = document.createElement('tr');

      lineLayer.setAttribute('class', 'lines' + isHidden);
      lineLayer.innerHTML = `
        <td class="rightLine">&nbsp;</td>
        ${childNodes.slice(1).map(() => `
          <td class="leftLine topLine">&nbsp;</td>
          <td class="rightLine topLine">&nbsp;</td>
          `).join('')}
        <td class="leftLine">&nbsp;</td>
      `;
      let nodeLayer;

      if (isVerticalLayer) {
        nodeLayer = document.createElement('ul');
        if (isHidden) {
          nodeLayer.classList.add(isHidden.trim());
        }
        if (level + 2 === opts.verticalDepth) {
          let tr = document.createElement('tr');

          tr.setAttribute('class', 'verticalNodes' + isHidden);
          tr.innerHTML = `<td></td>`;
          tr.firstChild.appendChild(nodeLayer);
          nodeWrapper.appendChild(tr);
        } else {
          nodeWrapper.appendChild(nodeLayer);
        }
      } else {
        nodeLayer = document.createElement('tr');
        nodeLayer.setAttribute('class', 'nodes' + isHidden);
        nodeWrapper.appendChild(lineLayer);
        nodeWrapper.appendChild(nodeLayer);
      }
      // recurse through children nodes
      childNodes.forEach((child) => {
        let nodeCell;

        if (isVerticalLayer) {
          nodeCell = document.createElement('li');
        } else {
          nodeCell = document.createElement('td');
          nodeCell.setAttribute('colspan', 2);
        }
        nodeLayer.appendChild(nodeCell);
        that.buildHierarchy(nodeCell, child, level + 1, callback);
      });
    }
  }
  _clickChart(event) {
    let closestNode = this._closest(event.target, function (el) {
      return el.classList && el.classList.contains('node');
    });

    if (!closestNode && this.querySelector('.node.focused')) {
      this.querySelector('.node.focused').classList.remove('focused');
    }
  }
  _loopChart(chart) {
    let subObj = { 'id': chart.querySelector('.node').id };

    if (chart.children[3]) {
      Array.from(chart.children[3].children).forEach((el) => {
        if (!subObj.children) { subObj.children = []; }
        subObj.children.push(this._loopChart(el.firstChild));
      });
    }
    return subObj;
  }
  getHierarchy() {
    if (!this.querySelector('.node').id) {
      return 'Error: Nodes of orghcart to be exported must have id attribute!';
    }
    return this._loopChart(this.querySelector('table'));
  }
  _onPanStart(event) {
    let chart = event.currentTarget;

    if (this._closest(event.target, (el) => el.classList && el.classList.contains('node')) ||
      (event.touches && event.touches.length > 1)) {
      chart.dataset.panning = false;
      return;
    }
    chart.style.cursor = 'move';
    chart.dataset.panning = true;

    let lastX = 0,
      lastY = 0,
      lastTf = window.getComputedStyle(chart).transform;

    if (lastTf !== 'none') {
      let temp = lastTf.split(',');

      if (!lastTf.includes('3d')) {
        lastX = Number.parseInt(temp[4], 10);
        lastY = Number.parseInt(temp[5], 10);
      } else {
        lastX = Number.parseInt(temp[12], 10);
        lastY = Number.parseInt(temp[13], 10);
      }
    }
    let startX = 0,
      startY = 0;

    if (!event.targetTouches) { // pan on desktop
      startX = event.pageX - lastX;
      startY = event.pageY - lastY;
    } else if (event.targetTouches.length === 1) { // pan on mobile device
      startX = event.targetTouches[0].pageX - lastX;
      startY = event.targetTouches[0].pageY - lastY;
    } else if (event.targetTouches.length > 1) {
      return;
    }
    chart.dataset.panStart = JSON.stringify({ 'startX': startX, 'startY': startY });
    chart.addEventListener('mousemove', this._onPanning.bind(this));
    chart.addEventListener('touchmove', this._onPanning.bind(this));
  }
  _onPanning(event) {
    let chart = event.currentTarget;

    if (chart.dataset.panning === 'false') {
      return;
    }
    let newX = 0,
      newY = 0,
      panStart = JSON.parse(chart.dataset.panStart),
      startX = panStart.startX,
      startY = panStart.startY;

    if (!event.targetTouches) { // pand on desktop
      newX = event.pageX - startX;
      newY = event.pageY - startY;
    } else if (event.targetTouches.length === 1) { // pan on mobile device
      newX = event.targetTouches[0].pageX - startX;
      newY = event.targetTouches[0].pageY - startY;
    } else if (event.targetTouches.length > 1) {
      return;
    }
    let lastTf = window.getComputedStyle(chart).transform;

    if (lastTf === 'none') {
      if (!lastTf.includes('3d')) {
        chart.style.transform = 'matrix(1, 0, 0, 1, ' + newX + ', ' + newY + ')';
      } else {
        chart.style.transform = 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, ' + newX + ', ' + newY + ', 0, 1)';
      }
    } else {
      let matrix = lastTf.split(',');

      if (!lastTf.includes('3d')) {
        matrix[4] = newX;
        matrix[5] = newY + ')';
      } else {
        matrix[12] = newX;
        matrix[13] = newY;
      }
      chart.style.transform = matrix.join(',');
    }
  }
  _onPanEnd(event) {
    if (this.dataset.panning === 'true') {
      this.dataset.panning = false;
      this.style.cursor = 'default';
      document.body.removeEventListener('mousemove', this._onPanning);
      document.body.removeEventListener('touchmove', this._onPanning);
    }
  }
  _setChartScale(chart, newScale) {
    let lastTf = window.getComputedStyle(chart).transform;

    if (lastTf === 'none') {
      chart.style.transform = 'scale(' + newScale + ',' + newScale + ')';
    } else {
      let matrix = lastTf.split(',');

      if (!lastTf.includes('3d')) {
        matrix[0] = 'matrix(' + newScale;
        matrix[3] = newScale;
        chart.style.transform = lastTf + ' scale(' + newScale + ',' + newScale + ')';
      } else {
        chart.style.transform = lastTf + ' scale3d(' + newScale + ',' + newScale + ', 1)';
      }
    }
    chart.dataset.scale = newScale;
  }
  _onWheeling(event) {
    event.preventDefault();

    let newScale = event.deltaY > 0 ? 0.8 : 1.2;

    this._setChartScale(this, newScale);
  }
  _getPinchDist(event) {
    return Math.sqrt((event.touches[0].clientX - event.touches[1].clientX) *
      (event.touches[0].clientX - event.touches[1].clientX) +
      (event.touches[0].clientY - event.touches[1].clientY) *
      (event.touches[0].clientY - event.touches[1].clientY));
  }
  _onTouchStart(event) {
    if (event.touches && event.touches.length === 2) {
      let dist = this._getPinchDist(event);

      this.dataset.pinching = true;
      this.dataset.pinchDistStart = dist;
    }
  }
  _onTouchMove(event) {
    if (this.dataset.pinching) {
      let dist = this._getPinchDist(event);

      this.dataset.pinchDistEnd = dist;
    }
  }
  _onTouchEnd(event) {
    if (this.dataset.pinching) {
      this.dataset.pinching = false;
      let diff = this.dataset.pinchDistEnd - this.dataset.pinchDistStart;

      if (diff > 0) {
        this._setChartScale(this, 1);
      } else if (diff < 0) {
        this._setChartScale(this, -1);
      }
    }
  }
}

window.customElements.define('org-chart', OrgChart);
