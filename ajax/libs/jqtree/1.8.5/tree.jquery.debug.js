/*
JqTree 1.8.5

Copyright 2024 Marco Braak

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
@license

*/
var jqtree = (function (exports) {
    'use strict';

    const version = "1.8.5";

    let Position = /*#__PURE__*/function (Position) {
      Position[Position["Before"] = 1] = "Before";
      Position[Position["After"] = 2] = "After";
      Position[Position["Inside"] = 3] = "Inside";
      Position[Position["None"] = 4] = "None";
      return Position;
    }({});
    const positionNames = {
      before: Position.Before,
      after: Position.After,
      inside: Position.Inside,
      none: Position.None
    };
    const getPositionName = position => {
      for (const name in positionNames) {
        if (Object.prototype.hasOwnProperty.call(positionNames, name)) {
          if (positionNames[name] === position) {
            return name;
          }
        }
      }
      return "";
    };
    const getPosition = name => positionNames[name];

    class DragElement {
      constructor(_ref) {
        let {
          autoEscape,
          nodeName,
          offsetX,
          offsetY,
          treeElement
        } = _ref;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.element = this.createElement(nodeName, autoEscape);
        treeElement.appendChild(this.element);
      }
      move(pageX, pageY) {
        this.element.style.left = `${pageX - this.offsetX}px`;
        this.element.style.top = `${pageY - this.offsetY}px`;
      }
      remove() {
        this.element.remove();
      }
      createElement(nodeName, autoEscape) {
        const element = document.createElement("span");
        element.classList.add("jqtree-title", "jqtree-dragging");
        if (autoEscape) {
          element.textContent = nodeName;
        } else {
          element.innerHTML = nodeName;
        }
        element.style.position = "absolute";
        return element;
      }
    }

    const isInt = n => typeof n === "number" && n % 1 === 0;
    const isFunction = v => typeof v === "function";
    const getBoolString = value => value ? "true" : "false";
    const getOffsetTop = element => getElementPosition(element).top;
    const getElementPosition = element => {
      const rect = element.getBoundingClientRect();
      return {
        left: rect.x + window.scrollX,
        top: rect.y + window.scrollY
      };
    };

    const iterateVisibleNodes = (tree, _ref) => {
      let {
        handleAfterOpenFolder,
        handleClosedFolder,
        handleFirstNode,
        handleNode,
        handleOpenFolder
      } = _ref;
      let isFirstNode = true;
      const iterate = (node, nextNode) => {
        let mustIterateInside = (node.is_open || !node.element) && node.hasChildren();
        let element = null;

        // Is the element visible?
        if (node.element?.offsetParent) {
          element = node.element;
          if (isFirstNode) {
            handleFirstNode(node);
            isFirstNode = false;
          }
          if (!node.hasChildren()) {
            handleNode(node, nextNode, node.element);
          } else if (node.is_open) {
            if (!handleOpenFolder(node, node.element)) {
              mustIterateInside = false;
            }
          } else {
            handleClosedFolder(node, nextNode, element);
          }
        }
        if (mustIterateInside) {
          const childrenLength = node.children.length;
          node.children.forEach((_, i) => {
            const child = node.children[i];
            if (child) {
              if (i === childrenLength - 1) {
                iterate(child, null);
              } else {
                const nextChild = node.children[i + 1];
                if (nextChild) {
                  iterate(child, nextChild);
                }
              }
            }
          });
          if (node.is_open && element) {
            handleAfterOpenFolder(node, nextNode);
          }
        }
      };
      iterate(tree, null);
    };

    const generateHitPositions = (tree, currentNode) => {
      const hitPositions = [];
      let lastTop = 0;
      const addHitPosition = (node, position, top) => {
        hitPositions.push({
          top,
          node,
          position
        });
        lastTop = top;
      };
      const handleAfterOpenFolder = (node, nextNode) => {
        if (node === currentNode || nextNode === currentNode) {
          // Cannot move before or after current item
          addHitPosition(node, Position.None, lastTop);
        } else {
          addHitPosition(node, Position.After, lastTop);
        }
      };
      const handleClosedFolder = (node, nextNode, element) => {
        const top = getOffsetTop(element);
        if (node === currentNode) {
          // Cannot move after current item
          addHitPosition(node, Position.None, top);
        } else {
          addHitPosition(node, Position.Inside, top);

          // Cannot move before current item
          if (nextNode !== currentNode) {
            addHitPosition(node, Position.After, top);
          }
        }
      };
      const handleFirstNode = node => {
        if (node !== currentNode) {
          addHitPosition(node, Position.Before, getOffsetTop(node.element));
        }
      };
      const handleNode = (node, nextNode, element) => {
        const top = getOffsetTop(element);
        if (node === currentNode) {
          // Cannot move inside current item
          addHitPosition(node, Position.None, top);
        } else {
          addHitPosition(node, Position.Inside, top);
        }
        if (nextNode === currentNode || node === currentNode) {
          // Cannot move before or after current item
          addHitPosition(node, Position.None, top);
        } else {
          addHitPosition(node, Position.After, top);
        }
      };
      const handleOpenFolder = (node, element) => {
        if (node === currentNode) {
          // Cannot move inside current item

          // Dnd over the current element is not possible: add a position with type None for the top and the bottom.
          const top = getOffsetTop(element);
          const height = element.clientHeight;
          addHitPosition(node, Position.None, top);
          if (height > 5) {
            // Subtract 5 pixels to allow more space for the next element.
            addHitPosition(node, Position.None, top + height - 5);
          }

          // Stop iterating
          return false;
        }

        // Cannot move before current item
        if (node.children[0] !== currentNode) {
          addHitPosition(node, Position.Inside, getOffsetTop(element));
        }

        // Continue iterating
        return true;
      };
      iterateVisibleNodes(tree, {
        handleAfterOpenFolder,
        handleClosedFolder,
        handleFirstNode,
        handleNode,
        handleOpenFolder
      });
      return hitPositions;
    };
    const generateHitAreasForGroup = (hitAreas, positionsInGroup, top, bottom) => {
      // limit positions in group
      const positionCount = Math.min(positionsInGroup.length, 4);
      const areaHeight = Math.round((bottom - top) / positionCount);
      let areaTop = top;
      for (let i = 0; i < positionCount; i++) {
        const position = positionsInGroup[i];
        if (position.position !== Position.None) {
          hitAreas.push({
            top: areaTop,
            bottom: areaTop + areaHeight,
            node: position.node,
            position: position.position
          });
        }
        areaTop += areaHeight;
      }
    };
    const generateHitAreasFromPositions = (hitPositions, treeBottom) => {
      if (!hitPositions.length) {
        return [];
      }
      let previousTop = hitPositions[0].top;
      let group = [];
      const hitAreas = [];
      for (const position of hitPositions) {
        if (position.top !== previousTop && group.length) {
          generateHitAreasForGroup(hitAreas, group, previousTop, position.top);
          previousTop = position.top;
          group = [];
        }
        group.push(position);
      }
      generateHitAreasForGroup(hitAreas, group, previousTop, treeBottom);
      return hitAreas;
    };
    const generateHitAreas = (tree, currentNode, treeBottom) => generateHitAreasFromPositions(generateHitPositions(tree, currentNode), treeBottom);

    class DragAndDropHandler {
      constructor(_ref) {
        let {
          autoEscape,
          getNodeElement,
          getNodeElementForNode,
          getScrollLeft,
          getTree,
          onCanMove,
          onCanMoveTo,
          onDragMove,
          onDragStop,
          onIsMoveHandle,
          openNode,
          refreshElements,
          slide,
          treeElement,
          triggerEvent
        } = _ref;
        this.autoEscape = autoEscape;
        this.getNodeElement = getNodeElement;
        this.getNodeElementForNode = getNodeElementForNode;
        this.getScrollLeft = getScrollLeft;
        this.getTree = getTree;
        this.onCanMove = onCanMove;
        this.onCanMoveTo = onCanMoveTo;
        this.onDragMove = onDragMove;
        this.onDragStop = onDragStop;
        this.onIsMoveHandle = onIsMoveHandle;
        this.openNode = openNode;
        this.refreshElements = refreshElements;
        this.slide = slide;
        this.treeElement = treeElement;
        this.triggerEvent = triggerEvent;
        this.hoveredArea = null;
        this.hitAreas = [];
        this.isDragging = false;
        this.currentItem = null;
      }
      mouseCapture(positionInfo) {
        const element = positionInfo.target;
        if (!this.mustCaptureElement(element)) {
          return null;
        }
        if (this.onIsMoveHandle && !this.onIsMoveHandle(jQuery(element))) {
          return null;
        }
        let nodeElement = this.getNodeElement(element);
        if (nodeElement && this.onCanMove) {
          if (!this.onCanMove(nodeElement.node)) {
            nodeElement = null;
          }
        }
        this.currentItem = nodeElement;
        return this.currentItem != null;
      }
      mouseStart(positionInfo) {
        if (!this.currentItem) {
          return false;
        }
        this.refresh();
        const {
          left,
          top
        } = getElementPosition(positionInfo.target);
        const node = this.currentItem.node;
        this.dragElement = new DragElement({
          autoEscape: this.autoEscape ?? true,
          nodeName: node.name,
          offsetX: positionInfo.pageX - left,
          offsetY: positionInfo.pageY - top,
          treeElement: this.treeElement
        });
        this.isDragging = true;
        this.currentItem.element.classList.add("jqtree-moving");
        return true;
      }
      mouseDrag(positionInfo) {
        if (!this.currentItem || !this.dragElement) {
          return false;
        }
        this.dragElement.move(positionInfo.pageX, positionInfo.pageY);
        const area = this.findHoveredArea(positionInfo.pageX, positionInfo.pageY);
        if (area && this.canMoveToArea(area)) {
          if (!area.node.isFolder()) {
            this.stopOpenFolderTimer();
          }
          if (this.hoveredArea !== area) {
            this.hoveredArea = area;

            // If this is a closed folder, start timer to open it
            if (this.mustOpenFolderTimer(area)) {
              this.startOpenFolderTimer(area.node);
            } else {
              this.stopOpenFolderTimer();
            }
            this.updateDropHint();
          }
        } else {
          this.removeDropHint();
          this.stopOpenFolderTimer();
          this.hoveredArea = area;
        }
        if (!area) {
          if (this.onDragMove) {
            this.onDragMove(this.currentItem.node, positionInfo.originalEvent);
          }
        }
        return true;
      }
      mouseStop(positionInfo) {
        this.moveItem(positionInfo);
        this.clear();
        this.removeHover();
        this.removeDropHint();
        this.removeHitAreas();
        const currentItem = this.currentItem;
        if (this.currentItem) {
          this.currentItem.element.classList.remove("jqtree-moving");
          this.currentItem = null;
        }
        this.isDragging = false;
        if (!this.hoveredArea && currentItem) {
          if (this.onDragStop) {
            this.onDragStop(currentItem.node, positionInfo.originalEvent);
          }
        }
        return false;
      }
      refresh() {
        this.removeHitAreas();
        if (this.currentItem) {
          this.generateHitAreas();
          this.currentItem = this.getNodeElementForNode(this.currentItem.node);
          if (this.isDragging) {
            this.currentItem.element.classList.add("jqtree-moving");
          }
        }
      }
      generateHitAreas() {
        const tree = this.getTree();
        if (!this.currentItem || !tree) {
          this.hitAreas = [];
        } else {
          this.hitAreas = generateHitAreas(tree, this.currentItem.node, this.getTreeDimensions().bottom);
        }
      }
      mustCaptureElement(element) {
        const nodeName = element.nodeName;
        return nodeName !== "INPUT" && nodeName !== "SELECT" && nodeName !== "TEXTAREA";
      }
      canMoveToArea(area) {
        if (!this.onCanMoveTo) {
          return true;
        }
        if (!this.currentItem) {
          return false;
        }
        const positionName = getPositionName(area.position);
        return this.onCanMoveTo(this.currentItem.node, area.node, positionName);
      }
      removeHitAreas() {
        this.hitAreas = [];
      }
      clear() {
        if (this.dragElement) {
          this.dragElement.remove();
          this.dragElement = null;
        }
      }
      removeDropHint() {
        if (this.previousGhost) {
          this.previousGhost.remove();
        }
      }
      removeHover() {
        this.hoveredArea = null;
      }
      findHoveredArea(x, y) {
        const dimensions = this.getTreeDimensions();
        if (x < dimensions.left || y < dimensions.top || x > dimensions.right || y > dimensions.bottom) {
          return null;
        }
        let low = 0;
        let high = this.hitAreas.length;
        while (low < high) {
          const mid = low + high >> 1;
          const area = this.hitAreas[mid];
          if (!area) {
            return null;
          }
          if (y < area.top) {
            high = mid;
          } else if (y > area.bottom) {
            low = mid + 1;
          } else {
            return area;
          }
        }
        return null;
      }
      mustOpenFolderTimer(area) {
        const node = area.node;
        return node.isFolder() && !node.is_open && area.position === Position.Inside;
      }
      updateDropHint() {
        if (!this.hoveredArea) {
          return;
        }

        // remove previous drop hint
        this.removeDropHint();

        // add new drop hint
        const nodeElement = this.getNodeElementForNode(this.hoveredArea.node);
        this.previousGhost = nodeElement.addDropHint(this.hoveredArea.position);
      }
      startOpenFolderTimer(folder) {
        const openFolder = () => {
          this.openNode(folder, this.slide, () => {
            this.refresh();
            this.updateDropHint();
          });
        };
        this.stopOpenFolderTimer();
        const openFolderDelay = this.openFolderDelay;
        if (openFolderDelay !== false) {
          this.openFolderTimer = window.setTimeout(openFolder, openFolderDelay);
        }
      }
      stopOpenFolderTimer() {
        if (this.openFolderTimer) {
          clearTimeout(this.openFolderTimer);
          this.openFolderTimer = null;
        }
      }
      moveItem(positionInfo) {
        if (this.currentItem && this.hoveredArea && this.hoveredArea.position !== Position.None && this.canMoveToArea(this.hoveredArea)) {
          const movedNode = this.currentItem.node;
          const targetNode = this.hoveredArea.node;
          const position = this.hoveredArea.position;
          const previousParent = movedNode.parent;
          if (position === Position.Inside) {
            this.hoveredArea.node.is_open = true;
          }
          const doMove = () => {
            const tree = this.getTree();
            if (tree) {
              tree.moveNode(movedNode, targetNode, position);
              this.treeElement.textContent = "";
              this.refreshElements(null);
            }
          };
          const event = this.triggerEvent("tree.move", {
            move_info: {
              moved_node: movedNode,
              target_node: targetNode,
              position: getPositionName(position),
              previous_parent: previousParent,
              do_move: doMove,
              original_event: positionInfo.originalEvent
            }
          });
          if (!event.isDefaultPrevented()) {
            doMove();
          }
        }
      }
      getTreeDimensions() {
        // Return the dimensions of the tree. Add a margin to the bottom to allow
        // to drag-and-drop after the last element.
        const treePosition = getElementPosition(this.treeElement);
        const left = treePosition.left + this.getScrollLeft();
        const top = treePosition.top;
        return {
          left,
          top,
          right: left + this.treeElement.clientWidth,
          bottom: top + this.treeElement.clientHeight + 16
        };
      }
    }

    class ElementsRenderer {
      constructor(_ref) {
        let {
          autoEscape,
          buttonLeft,
          closedIcon,
          onCreateLi,
          dragAndDrop,
          $element,
          getTree,
          isNodeSelected,
          openedIcon,
          rtl,
          showEmptyFolder,
          tabIndex
        } = _ref;
        this.autoEscape = autoEscape;
        this.buttonLeft = buttonLeft;
        this.dragAndDrop = dragAndDrop;
        this.$element = $element;
        this.getTree = getTree;
        this.isNodeSelected = isNodeSelected;
        this.onCreateLi = onCreateLi;
        this.rtl = rtl;
        this.showEmptyFolder = showEmptyFolder;
        this.tabIndex = tabIndex;
        this.openedIconElement = this.createButtonElement(openedIcon || "+");
        this.closedIconElement = this.createButtonElement(closedIcon || "-");
      }
      render(fromNode) {
        if (fromNode && fromNode.parent) {
          this.renderFromNode(fromNode);
        } else {
          this.renderFromRoot();
        }
      }
      renderFromRoot() {
        this.$element.empty();
        const tree = this.getTree();
        if (this.$element[0] && tree) {
          this.createDomElements(this.$element[0], tree.children, true, 1);
        }
      }
      renderFromNode(node) {
        // remember current li
        const $previousLi = jQuery(node.element);

        // create element
        const li = this.createLi(node, node.getLevel());
        this.attachNodeData(node, li);

        // add element to dom
        $previousLi.after(li);

        // remove previous li
        $previousLi.remove();

        // create children
        if (node.children) {
          this.createDomElements(li, node.children, false, node.getLevel() + 1);
        }
      }
      createDomElements(element, children, isRootNode, level) {
        const ul = this.createUl(isRootNode);
        element.appendChild(ul);
        for (const child of children) {
          const li = this.createLi(child, level);
          ul.appendChild(li);
          this.attachNodeData(child, li);
          if (child.hasChildren()) {
            this.createDomElements(li, child.children, false, level + 1);
          }
        }
      }
      attachNodeData(node, li) {
        node.element = li;
        jQuery(li).data("node", node);
      }
      createUl(isRootNode) {
        let classString;
        let role;
        if (!isRootNode) {
          classString = "";
          role = "group";
        } else {
          classString = "jqtree-tree";
          role = "tree";
          if (this.rtl) {
            classString += " jqtree-rtl";
          }
        }
        if (this.dragAndDrop) {
          classString += " jqtree-dnd";
        }
        const ul = document.createElement("ul");
        ul.className = `jqtree_common ${classString}`;
        ul.setAttribute("role", role);
        return ul;
      }
      createLi(node, level) {
        const isSelected = Boolean(this.isNodeSelected(node));
        const mustShowFolder = node.isFolder() || node.isEmptyFolder && this.showEmptyFolder;
        const li = mustShowFolder ? this.createFolderLi(node, level, isSelected) : this.createNodeLi(node, level, isSelected);
        if (this.onCreateLi) {
          this.onCreateLi(node, jQuery(li), isSelected);
        }
        return li;
      }
      setTreeItemAriaAttributes(element, name, level, isSelected) {
        element.setAttribute("aria-label", name);
        element.setAttribute("aria-level", `${level}`);
        element.setAttribute("aria-selected", getBoolString(isSelected));
        element.setAttribute("role", "treeitem");
      }
      createFolderLi(node, level, isSelected) {
        const buttonClasses = this.getButtonClasses(node);
        const folderClasses = this.getFolderClasses(node, isSelected);
        const iconElement = node.is_open ? this.openedIconElement : this.closedIconElement;

        // li
        const li = document.createElement("li");
        li.className = `jqtree_common ${folderClasses}`;
        li.setAttribute("role", "none");

        // div
        const div = document.createElement("div");
        div.className = "jqtree-element jqtree_common";
        div.setAttribute("role", "none");
        li.appendChild(div);

        // button link
        const buttonLink = document.createElement("a");
        buttonLink.className = buttonClasses;
        if (iconElement) {
          buttonLink.appendChild(iconElement.cloneNode(true));
        }
        if (this.buttonLeft) {
          div.appendChild(buttonLink);
        }

        // title span
        const titleSpan = this.createTitleSpan(node.name, isSelected, true, level);
        titleSpan.setAttribute("aria-expanded", getBoolString(node.is_open));
        div.appendChild(titleSpan);
        if (!this.buttonLeft) {
          div.appendChild(buttonLink);
        }
        return li;
      }
      createNodeLi(node, level, isSelected) {
        const liClasses = ["jqtree_common"];
        if (isSelected) {
          liClasses.push("jqtree-selected");
        }
        const classString = liClasses.join(" ");

        // li
        const li = document.createElement("li");
        li.className = classString;
        li.setAttribute("role", "none");

        // div
        const div = document.createElement("div");
        div.className = "jqtree-element jqtree_common";
        div.setAttribute("role", "none");
        li.appendChild(div);

        // title span
        const titleSpan = this.createTitleSpan(node.name, isSelected, false, level);
        div.appendChild(titleSpan);
        return li;
      }
      createTitleSpan(nodeName, isSelected, isFolder, level) {
        const titleSpan = document.createElement("span");
        let classes = "jqtree-title jqtree_common";
        if (isFolder) {
          classes += " jqtree-title-folder";
        }
        classes += ` jqtree-title-button-${this.buttonLeft ? "left" : "right"}`;
        titleSpan.className = classes;
        if (isSelected) {
          const tabIndex = this.tabIndex;
          if (tabIndex !== undefined) {
            titleSpan.setAttribute("tabindex", `${tabIndex}`);
          }
        }
        this.setTreeItemAriaAttributes(titleSpan, nodeName, level, isSelected);
        if (this.autoEscape) {
          titleSpan.textContent = nodeName;
        } else {
          titleSpan.innerHTML = nodeName;
        }
        return titleSpan;
      }
      getButtonClasses(node) {
        const classes = ["jqtree-toggler", "jqtree_common"];
        if (!node.is_open) {
          classes.push("jqtree-closed");
        }
        if (this.buttonLeft) {
          classes.push("jqtree-toggler-left");
        } else {
          classes.push("jqtree-toggler-right");
        }
        return classes.join(" ");
      }
      getFolderClasses(node, isSelected) {
        const classes = ["jqtree-folder"];
        if (!node.is_open) {
          classes.push("jqtree-closed");
        }
        if (isSelected) {
          classes.push("jqtree-selected");
        }
        if (node.is_loading) {
          classes.push("jqtree-loading");
        }
        return classes.join(" ");
      }
      createButtonElement(value) {
        if (typeof value === "string") {
          // convert value to html
          const div = document.createElement("div");
          div.innerHTML = value;
          return document.createTextNode(div.innerHTML);
        } else if (value == null) {
          return undefined;
        } else if (value.nodeType) {
          return value;
        } else {
          return jQuery(value)[0];
        }
      }
    }

    class DataLoader {
      constructor(_ref) {
        let {
          dataFilter,
          loadData,
          onLoadFailed,
          onLoading,
          treeElement,
          triggerEvent
        } = _ref;
        this.dataFilter = dataFilter;
        this.loadData = loadData;
        this.onLoadFailed = onLoadFailed;
        this.onLoading = onLoading;
        this.treeElement = treeElement;
        this.triggerEvent = triggerEvent;
      }
      loadFromUrl(urlInfo, parentNode, onFinished) {
        if (!urlInfo) {
          return;
        }
        const element = this.getDomElement(parentNode);
        this.addLoadingClass(element);
        this.notifyLoading(true, parentNode, element);
        const stopLoading = () => {
          this.removeLoadingClass(element);
          this.notifyLoading(false, parentNode, element);
        };
        const handleSuccess = data => {
          stopLoading();
          this.loadData(this.parseData(data), parentNode);
          if (onFinished && typeof onFinished === "function") {
            onFinished();
          }
        };
        const handleError = jqXHR => {
          stopLoading();
          if (this.onLoadFailed) {
            this.onLoadFailed(jqXHR);
          }
        };
        this.submitRequest(urlInfo, handleSuccess, handleError);
      }
      addLoadingClass(element) {
        element.classList.add("jqtree-loading");
      }
      removeLoadingClass(element) {
        element.classList.remove("jqtree-loading");
      }
      getDomElement(parentNode) {
        if (parentNode) {
          return parentNode.element;
        } else {
          return this.treeElement;
        }
      }
      notifyLoading(isLoading, node, element) {
        const $el = jQuery(element);
        if (this.onLoading) {
          this.onLoading(isLoading, node, $el);
        }
        this.triggerEvent("tree.loading_data", {
          isLoading,
          node,
          $el
        });
      }
      submitRequest(urlInfoInput, handleSuccess, handleError) {
        const urlInfo = typeof urlInfoInput === "string" ? {
          url: urlInfoInput
        } : urlInfoInput;
        const ajaxSettings = {
          method: "GET",
          cache: false,
          dataType: "json",
          success: handleSuccess,
          error: handleError,
          ...urlInfo
        };
        ajaxSettings.method = ajaxSettings.method?.toUpperCase() || "GET";
        void jQuery.ajax(ajaxSettings);
      }
      parseData(data) {
        const getParsedData = () => {
          if (typeof data === "string") {
            return JSON.parse(data);
          } else {
            return data;
          }
        };
        const parsedData = getParsedData();
        if (this.dataFilter) {
          return this.dataFilter(parsedData);
        } else {
          return parsedData;
        }
      }
    }

    class KeyHandler {
      constructor(_ref) {
        let {
          closeNode,
          getSelectedNode,
          isFocusOnTree,
          keyboardSupport,
          openNode,
          selectNode
        } = _ref;
        this.closeNode = closeNode;
        this.getSelectedNode = getSelectedNode;
        this.isFocusOnTree = isFocusOnTree;
        this.keyboardSupport = keyboardSupport;
        this.openNode = openNode;
        this.originalSelectNode = selectNode;
        if (keyboardSupport) {
          this.handleKeyDownHandler = this.handleKeyDown.bind(this);
          document.addEventListener("keydown", this.handleKeyDownHandler);
        }
      }
      deinit() {
        if (this.handleKeyDownHandler) {
          document.removeEventListener("keydown", this.handleKeyDownHandler);
        }
      }
      moveDown(selectedNode) {
        return this.selectNode(selectedNode.getNextVisibleNode());
      }
      moveUp(selectedNode) {
        return this.selectNode(selectedNode.getPreviousVisibleNode());
      }
      moveRight(selectedNode) {
        if (!selectedNode.isFolder()) {
          return true;
        } else {
          // folder node
          if (selectedNode.is_open) {
            // Right moves to the first child of an open node
            return this.selectNode(selectedNode.getNextVisibleNode());
          } else {
            // Right expands a closed node
            this.openNode(selectedNode);
            return false;
          }
        }
      }
      moveLeft(selectedNode) {
        if (selectedNode.isFolder() && selectedNode.is_open) {
          // Left on an open node closes the node
          this.closeNode(selectedNode);
          return false;
        } else {
          // Left on a closed or end node moves focus to the node's parent
          return this.selectNode(selectedNode.getParent());
        }
      }
      selectNode(node) {
        if (!node) {
          return true;
        } else {
          this.originalSelectNode(node);
          return false;
        }
      }
      handleKeyDown = e => {
        if (!this.canHandleKeyboard()) {
          return true;
        }
        const selectedNode = this.getSelectedNode();
        if (!selectedNode) {
          return true;
        }
        switch (e.key) {
          case "ArrowDown":
            return this.moveDown(selectedNode);
          case "ArrowUp":
            return this.moveUp(selectedNode);
          case "ArrowRight":
            return this.moveRight(selectedNode);
          case "ArrowLeft":
            return this.moveLeft(selectedNode);
          default:
            return true;
        }
      };
      canHandleKeyboard() {
        return this.keyboardSupport && this.isFocusOnTree();
      }
    }

    const getPositionInfoFromMouseEvent = e => ({
      originalEvent: e,
      pageX: e.pageX,
      pageY: e.pageY,
      target: e.target
    });
    const getPositionInfoFromTouch = (touch, e) => ({
      originalEvent: e,
      pageX: touch.pageX,
      pageY: touch.pageY,
      target: touch.target
    });

    class MouseHandler {
      constructor(_ref) {
        let {
          element,
          getMouseDelay,
          getNode,
          onClickButton,
          onClickTitle,
          onMouseCapture,
          onMouseDrag,
          onMouseStart,
          onMouseStop,
          triggerEvent,
          useContextMenu
        } = _ref;
        this.element = element;
        this.getMouseDelay = getMouseDelay;
        this.getNode = getNode;
        this.onClickButton = onClickButton;
        this.onClickTitle = onClickTitle;
        this.onMouseCapture = onMouseCapture;
        this.onMouseDrag = onMouseDrag;
        this.onMouseStart = onMouseStart;
        this.onMouseStop = onMouseStop;
        this.triggerEvent = triggerEvent;
        this.useContextMenu = useContextMenu;
        element.addEventListener("click", this.handleClick);
        element.addEventListener("dblclick", this.handleDblclick);
        element.addEventListener("mousedown", this.mouseDown, {
          passive: false
        });
        element.addEventListener("touchstart", this.touchStart, {
          passive: false
        });
        if (useContextMenu) {
          element.addEventListener("contextmenu", this.handleContextmenu);
        }
        this.isMouseStarted = false;
        this.mouseDelayTimer = null;
        this.isMouseDelayMet = false;
        this.mouseDownInfo = null;
      }
      deinit() {
        this.element.removeEventListener("click", this.handleClick);
        this.element.removeEventListener("dblclick", this.handleDblclick);
        if (this.useContextMenu) {
          this.element.removeEventListener("contextmenu", this.handleContextmenu);
        }
        this.element.removeEventListener("mousedown", this.mouseDown);
        this.element.removeEventListener("touchstart", this.touchStart);
        this.removeMouseMoveEventListeners();
      }
      mouseDown = e => {
        // Left mouse button?
        if (e.button !== 0) {
          return;
        }
        const result = this.handleMouseDown(getPositionInfoFromMouseEvent(e));
        if (result && e.cancelable) {
          e.preventDefault();
        }
      };
      handleMouseDown(positionInfo) {
        // We may have missed mouseup (out of window)
        if (this.isMouseStarted) {
          this.handleMouseUp(positionInfo);
        }
        this.mouseDownInfo = positionInfo;
        if (!this.onMouseCapture(positionInfo)) {
          return false;
        }
        this.handleStartMouse();
        return true;
      }
      handleStartMouse() {
        document.addEventListener("mousemove", this.mouseMove, {
          passive: false
        });
        document.addEventListener("touchmove", this.touchMove, {
          passive: false
        });
        document.addEventListener("mouseup", this.mouseUp, {
          passive: false
        });
        document.addEventListener("touchend", this.touchEnd, {
          passive: false
        });
        const mouseDelay = this.getMouseDelay();
        if (mouseDelay) {
          this.startMouseDelayTimer(mouseDelay);
        } else {
          this.isMouseDelayMet = true;
        }
      }
      startMouseDelayTimer(mouseDelay) {
        if (this.mouseDelayTimer) {
          clearTimeout(this.mouseDelayTimer);
        }
        this.mouseDelayTimer = window.setTimeout(() => {
          if (this.mouseDownInfo) {
            this.isMouseDelayMet = true;
          }
        }, mouseDelay);
        this.isMouseDelayMet = false;
      }
      mouseMove = e => {
        this.handleMouseMove(e, getPositionInfoFromMouseEvent(e));
      };
      handleMouseMove(e, positionInfo) {
        if (this.isMouseStarted) {
          this.onMouseDrag(positionInfo);
          if (e.cancelable) {
            e.preventDefault();
          }
          return;
        }
        if (!this.isMouseDelayMet) {
          return;
        }
        if (this.mouseDownInfo) {
          this.isMouseStarted = this.onMouseStart(this.mouseDownInfo) !== false;
        }
        if (this.isMouseStarted) {
          this.onMouseDrag(positionInfo);
          if (e.cancelable) {
            e.preventDefault();
          }
        } else {
          this.handleMouseUp(positionInfo);
        }
      }
      mouseUp = e => {
        this.handleMouseUp(getPositionInfoFromMouseEvent(e));
      };
      handleMouseUp(positionInfo) {
        this.removeMouseMoveEventListeners();
        this.isMouseDelayMet = false;
        this.mouseDownInfo = null;
        if (this.isMouseStarted) {
          this.isMouseStarted = false;
          this.onMouseStop(positionInfo);
        }
      }
      removeMouseMoveEventListeners() {
        document.removeEventListener("mousemove", this.mouseMove);
        document.removeEventListener("touchmove", this.touchMove);
        document.removeEventListener("mouseup", this.mouseUp);
        document.removeEventListener("touchend", this.touchEnd);
      }
      touchStart = e => {
        if (!e) {
          return;
        }
        if (e.touches.length > 1) {
          return;
        }
        const touch = e.touches[0];
        if (!touch) {
          return;
        }
        this.handleMouseDown(getPositionInfoFromTouch(touch, e));
      };
      touchMove = e => {
        if (!e) {
          return;
        }
        if (e.touches.length > 1) {
          return;
        }
        const touch = e.touches[0];
        if (!touch) {
          return;
        }
        this.handleMouseMove(e, getPositionInfoFromTouch(touch, e));
      };
      touchEnd = e => {
        if (!e) {
          return;
        }
        if (e.touches.length > 1) {
          return;
        }
        const touch = e.touches[0];
        if (!touch) {
          return;
        }
        this.handleMouseUp(getPositionInfoFromTouch(touch, e));
      };
      handleClick = e => {
        if (!e.target) {
          return;
        }
        const clickTarget = this.getClickTarget(e.target);
        if (!clickTarget) {
          return;
        }
        if (clickTarget.type === "button") {
          this.onClickButton(clickTarget.node);
          e.preventDefault();
          e.stopPropagation();
        } else if (clickTarget.type === "label") {
          const event = this.triggerEvent("tree.click", {
            node: clickTarget.node,
            click_event: e
          });
          if (!event.isDefaultPrevented()) {
            this.onClickTitle(clickTarget.node);
          }
        }
      };
      handleDblclick = e => {
        if (!e.target) {
          return;
        }
        const clickTarget = this.getClickTarget(e.target);
        if (clickTarget?.type === "label") {
          this.triggerEvent("tree.dblclick", {
            node: clickTarget.node,
            click_event: e
          });
        }
      };
      handleContextmenu = e => {
        if (!e.target) {
          return;
        }
        const div = e.target.closest("ul.jqtree-tree .jqtree-element");
        if (div) {
          const node = this.getNode(div);
          if (node) {
            e.preventDefault();
            e.stopPropagation();
            this.triggerEvent("tree.contextmenu", {
              node,
              click_event: e
            });
            return false;
          }
        }
        return null;
      };
      getClickTarget(element) {
        const button = element.closest(".jqtree-toggler");
        if (button) {
          const node = this.getNode(button);
          if (node) {
            return {
              type: "button",
              node
            };
          }
        } else {
          const jqTreeElement = element.closest(".jqtree-element");
          if (jqTreeElement) {
            const node = this.getNode(jqTreeElement);
            if (node) {
              return {
                type: "label",
                node
              };
            }
          }
        }
        return null;
      }
    }

    class SaveStateHandler {
      constructor(_ref) {
        let {
          addToSelection,
          getNodeById,
          getSelectedNodes,
          getTree,
          onGetStateFromStorage,
          onSetStateFromStorage,
          openNode,
          refreshElements,
          removeFromSelection,
          saveState
        } = _ref;
        this.addToSelection = addToSelection;
        this.getNodeById = getNodeById;
        this.getSelectedNodes = getSelectedNodes;
        this.getTree = getTree;
        this.onGetStateFromStorage = onGetStateFromStorage;
        this.onSetStateFromStorage = onSetStateFromStorage;
        this.openNode = openNode;
        this.refreshElements = refreshElements;
        this.removeFromSelection = removeFromSelection;
        this.saveStateOption = saveState;
      }
      saveState() {
        const state = JSON.stringify(this.getState());
        if (this.onSetStateFromStorage) {
          this.onSetStateFromStorage(state);
        } else if (this.supportsLocalStorage()) {
          localStorage.setItem(this.getKeyName(), state);
        }
      }
      getStateFromStorage() {
        const jsonData = this.loadFromStorage();
        if (jsonData) {
          return this.parseState(jsonData);
        } else {
          return null;
        }
      }
      getState() {
        const getOpenNodeIds = () => {
          const openNodes = [];
          this.getTree()?.iterate(node => {
            if (node.is_open && node.id && node.hasChildren()) {
              openNodes.push(node.id);
            }
            return true;
          });
          return openNodes;
        };
        const getSelectedNodeIds = () => {
          const selectedNodeIds = [];
          this.getSelectedNodes().forEach(node => {
            if (node.id != null) {
              selectedNodeIds.push(node.id);
            }
          });
          return selectedNodeIds;
        };
        return {
          open_nodes: getOpenNodeIds(),
          selected_node: getSelectedNodeIds()
        };
      }

      /*
      Set initial state
      Don't handle nodes that are loaded on demand
       result: must load on demand
      */
      setInitialState(state) {
        if (!state) {
          return false;
        } else {
          let mustLoadOnDemand = false;
          if (state.open_nodes) {
            mustLoadOnDemand = this.openInitialNodes(state.open_nodes);
          }
          if (state.selected_node) {
            this.resetSelection();
            this.selectInitialNodes(state.selected_node);
          }
          return mustLoadOnDemand;
        }
      }
      setInitialStateOnDemand(state, cbFinished) {
        let loadingCount = 0;
        let nodeIds = state.open_nodes;
        const openNodes = () => {
          const newNodesIds = [];
          for (const nodeId of nodeIds) {
            const node = this.getNodeById(nodeId);
            if (!node) {
              newNodesIds.push(nodeId);
            } else {
              if (!node.is_loading) {
                if (node.load_on_demand) {
                  loadAndOpenNode(node);
                } else {
                  this.openNode(node, false);
                }
              }
            }
          }
          nodeIds = newNodesIds;
          if (this.selectInitialNodes(state.selected_node)) {
            this.refreshElements(null);
          }
          if (loadingCount === 0) {
            cbFinished();
          }
        };
        const loadAndOpenNode = node => {
          loadingCount += 1;
          this.openNode(node, false, () => {
            loadingCount -= 1;
            openNodes();
          });
        };
        openNodes();
      }
      getNodeIdToBeSelected() {
        const state = this.getStateFromStorage();
        if (state?.selected_node) {
          return state.selected_node[0] || null;
        } else {
          return null;
        }
      }
      parseState(jsonData) {
        const state = JSON.parse(jsonData);

        // Check if selected_node is an int (instead of an array)
        if (state && state.selected_node && isInt(state.selected_node)) {
          // Convert to array
          state.selected_node = [state.selected_node];
        }
        return state;
      }
      loadFromStorage() {
        if (this.onGetStateFromStorage) {
          return this.onGetStateFromStorage();
        } else if (this.supportsLocalStorage()) {
          return localStorage.getItem(this.getKeyName());
        } else {
          return null;
        }
      }
      openInitialNodes(nodeIds) {
        let mustLoadOnDemand = false;
        for (const nodeId of nodeIds) {
          const node = this.getNodeById(nodeId);
          if (node) {
            if (!node.load_on_demand) {
              node.is_open = true;
            } else {
              mustLoadOnDemand = true;
            }
          }
        }
        return mustLoadOnDemand;
      }
      selectInitialNodes(nodeIds) {
        let selectCount = 0;
        for (const nodeId of nodeIds) {
          const node = this.getNodeById(nodeId);
          if (node) {
            selectCount += 1;
            this.addToSelection(node);
          }
        }
        return selectCount !== 0;
      }
      resetSelection() {
        const selectedNodes = this.getSelectedNodes();
        selectedNodes.forEach(node => {
          this.removeFromSelection(node);
        });
      }
      getKeyName() {
        if (typeof this.saveStateOption === "string") {
          return this.saveStateOption;
        } else {
          return "tree";
        }
      }
      supportsLocalStorage() {
        const testSupport = () => {
          // Is local storage supported?
          if (localStorage == null) {
            return false;
          } else {
            // Check if it's possible to store an item. Safari does not allow this in private browsing mode.
            try {
              const key = "_storage_test";
              sessionStorage.setItem(key, "value");
              sessionStorage.removeItem(key);
            } catch (error) {
              return false;
            }
            return true;
          }
        };
        if (this._supportsLocalStorage == null) {
          this._supportsLocalStorage = testSupport();
        }
        return this._supportsLocalStorage;
      }
    }

    class ContainerScrollParent {
      constructor(_ref) {
        let {
          container,
          refreshHitAreas
        } = _ref;
        this.container = container;
        this.refreshHitAreas = refreshHitAreas;
      }
      checkHorizontalScrolling(pageX) {
        const newHorizontalScrollDirection = this.getNewHorizontalScrollDirection(pageX);
        if (this.horizontalScrollDirection !== newHorizontalScrollDirection) {
          this.horizontalScrollDirection = newHorizontalScrollDirection;
          if (this.horizontalScrollTimeout != null) {
            window.clearTimeout(this.verticalScrollTimeout);
          }
          if (newHorizontalScrollDirection) {
            this.horizontalScrollTimeout = window.setTimeout(this.scrollHorizontally.bind(this), 40);
          }
        }
      }
      checkVerticalScrolling(pageY) {
        const newVerticalScrollDirection = this.getNewVerticalScrollDirection(pageY);
        if (this.verticalScrollDirection !== newVerticalScrollDirection) {
          this.verticalScrollDirection = newVerticalScrollDirection;
          if (this.verticalScrollTimeout != null) {
            window.clearTimeout(this.verticalScrollTimeout);
            this.verticalScrollTimeout = undefined;
          }
          if (newVerticalScrollDirection) {
            this.verticalScrollTimeout = window.setTimeout(this.scrollVertically.bind(this), 40);
          }
        }
      }
      getScrollLeft() {
        return this.container.scrollLeft;
      }
      scrollToY(top) {
        this.container.scrollTop = top;
      }
      stopScrolling() {
        this.horizontalScrollDirection = undefined;
        this.verticalScrollDirection = undefined;
        this.scrollParentTop = undefined;
        this.scrollParentBottom = undefined;
      }
      getNewHorizontalScrollDirection(pageX) {
        const scrollParentOffset = getElementPosition(this.container);
        const rightEdge = scrollParentOffset.left + this.container.clientWidth;
        const leftEdge = scrollParentOffset.left;
        const isNearRightEdge = pageX > rightEdge - 20;
        const isNearLeftEdge = pageX < leftEdge + 20;
        if (isNearRightEdge) {
          return "right";
        } else if (isNearLeftEdge) {
          return "left";
        }
        return undefined;
      }
      getNewVerticalScrollDirection(pageY) {
        if (pageY < this.getScrollParentTop()) {
          return "top";
        }
        if (pageY > this.getScrollParentBottom()) {
          return "bottom";
        }
        return undefined;
      }
      scrollHorizontally() {
        if (!this.horizontalScrollDirection) {
          return;
        }
        const distance = this.horizontalScrollDirection === "left" ? -20 : 20;
        this.container.scrollBy({
          left: distance,
          top: 0,
          behavior: "instant"
        });
        this.refreshHitAreas();
        setTimeout(this.scrollHorizontally.bind(this), 40);
      }
      scrollVertically() {
        if (!this.verticalScrollDirection) {
          return;
        }
        const distance = this.verticalScrollDirection === "top" ? -20 : 20;
        this.container.scrollBy({
          left: 0,
          top: distance,
          behavior: "instant"
        });
        this.refreshHitAreas();
        setTimeout(this.scrollVertically.bind(this), 40);
      }
      getScrollParentTop() {
        if (this.scrollParentTop == null) {
          this.scrollParentTop = getOffsetTop(this.container);
        }
        return this.scrollParentTop;
      }
      getScrollParentBottom() {
        if (this.scrollParentBottom == null) {
          this.scrollParentBottom = this.getScrollParentTop() + this.container.clientHeight;
        }
        return this.scrollParentBottom;
      }
    }

    class DocumentScrollParent {
      constructor(_ref) {
        let {
          refreshHitAreas,
          treeElement
        } = _ref;
        this.refreshHitAreas = refreshHitAreas;
        this.treeElement = treeElement;
      }
      checkHorizontalScrolling(pageX) {
        const newHorizontalScrollDirection = this.getNewHorizontalScrollDirection(pageX);
        if (this.horizontalScrollDirection !== newHorizontalScrollDirection) {
          this.horizontalScrollDirection = newHorizontalScrollDirection;
          if (this.horizontalScrollTimeout != null) {
            window.clearTimeout(this.horizontalScrollTimeout);
          }
          if (newHorizontalScrollDirection) {
            this.horizontalScrollTimeout = window.setTimeout(this.scrollHorizontally.bind(this), 40);
          }
        }
      }
      checkVerticalScrolling(pageY) {
        const newVerticalScrollDirection = this.getNewVerticalScrollDirection(pageY);
        if (this.verticalScrollDirection !== newVerticalScrollDirection) {
          this.verticalScrollDirection = newVerticalScrollDirection;
          if (this.verticalScrollTimeout != null) {
            window.clearTimeout(this.verticalScrollTimeout);
            this.verticalScrollTimeout = undefined;
          }
          if (newVerticalScrollDirection) {
            this.verticalScrollTimeout = window.setTimeout(this.scrollVertically.bind(this), 40);
          }
        }
      }
      getScrollLeft() {
        return document.documentElement.scrollLeft;
      }
      scrollToY(top) {
        const treeTop = getOffsetTop(this.treeElement);
        document.documentElement.scrollTop = top + treeTop;
      }
      stopScrolling() {
        this.horizontalScrollDirection = undefined;
        this.verticalScrollDirection = undefined;
        this.documentScrollHeight = undefined;
        this.documentScrollWidth = undefined;
      }
      getNewHorizontalScrollDirection(pageX) {
        const scrollLeft = document.documentElement.scrollLeft;
        const windowWidth = window.innerWidth;
        const isNearRightEdge = pageX > windowWidth - 20;
        const isNearLeftEdge = pageX - scrollLeft < 20;
        if (isNearRightEdge && this.canScrollRight()) {
          return "right";
        }
        if (isNearLeftEdge) {
          return "left";
        }
        return undefined;
      }
      canScrollRight() {
        const documentElement = document.documentElement;
        return documentElement.scrollLeft + documentElement.clientWidth < this.getDocumentScrollWidth();
      }
      canScrollDown() {
        const documentElement = document.documentElement;
        return documentElement.scrollTop + documentElement.clientHeight < this.getDocumentScrollHeight();
      }
      getDocumentScrollHeight() {
        // Store the original scroll height because the scroll height can increase when the drag element is moved beyond the scroll height.
        if (this.documentScrollHeight == null) {
          this.documentScrollHeight = document.documentElement.scrollHeight;
        }
        return this.documentScrollHeight;
      }
      getDocumentScrollWidth() {
        // Store the original scroll width because the scroll width can increase when the drag element is moved beyond the scroll width.
        if (this.documentScrollWidth == null) {
          this.documentScrollWidth = document.documentElement.scrollWidth;
        }
        return this.documentScrollWidth;
      }
      getNewVerticalScrollDirection(pageY) {
        const scrollTop = jQuery(document).scrollTop() || 0;
        const distanceTop = pageY - scrollTop;
        if (distanceTop < 20) {
          return "top";
        }
        const windowHeight = window.innerHeight;
        if (windowHeight - (pageY - scrollTop) < 20 && this.canScrollDown()) {
          return "bottom";
        }
        return undefined;
      }
      scrollHorizontally() {
        if (!this.horizontalScrollDirection) {
          return;
        }
        const distance = this.horizontalScrollDirection === "left" ? -20 : 20;
        window.scrollBy({
          left: distance,
          top: 0,
          behavior: "instant"
        });
        this.refreshHitAreas();
        setTimeout(this.scrollHorizontally.bind(this), 40);
      }
      scrollVertically() {
        if (!this.verticalScrollDirection) {
          return;
        }
        const distance = this.verticalScrollDirection === "top" ? -20 : 20;
        window.scrollBy({
          left: 0,
          top: distance,
          behavior: "instant"
        });
        this.refreshHitAreas();
        setTimeout(this.scrollVertically.bind(this), 40);
      }
    }

    const isOverflow = overflowValue => overflowValue === "auto" || overflowValue === "scroll";
    const hasOverFlow = element => {
      const style = getComputedStyle(element);
      return isOverflow(style.overflowX) || isOverflow(style.overflowY);
    };
    const getParentWithOverflow = treeElement => {
      if (hasOverFlow(treeElement)) {
        return treeElement;
      }
      let parent = treeElement.parentElement;
      while (parent) {
        if (hasOverFlow(parent)) {
          return parent;
        }
        parent = parent.parentElement;
      }
      return null;
    };
    const createScrollParent = (treeElement, refreshHitAreas) => {
      const container = getParentWithOverflow(treeElement);
      if (container && container.tagName !== "HTML") {
        return new ContainerScrollParent({
          container,
          refreshHitAreas
        });
      } else {
        return new DocumentScrollParent({
          refreshHitAreas,
          treeElement
        });
      }
    };

    class ScrollHandler {
      constructor(_ref) {
        let {
          refreshHitAreas,
          treeElement
        } = _ref;
        this.refreshHitAreas = refreshHitAreas;
        this.scrollParent = undefined;
        this.treeElement = treeElement;
      }
      checkScrolling(positionInfo) {
        this.checkVerticalScrolling(positionInfo);
        this.checkHorizontalScrolling(positionInfo);
      }
      stopScrolling() {
        this.getScrollParent().stopScrolling();
      }
      scrollToY(top) {
        this.getScrollParent().scrollToY(top);
      }
      getScrollLeft() {
        return this.getScrollParent().getScrollLeft();
      }
      checkVerticalScrolling(positionInfo) {
        this.getScrollParent().checkVerticalScrolling(positionInfo.pageY);
      }
      checkHorizontalScrolling(positionInfo) {
        this.getScrollParent().checkHorizontalScrolling(positionInfo.pageX);
      }
      getScrollParent() {
        if (!this.scrollParent) {
          this.scrollParent = createScrollParent(this.treeElement, this.refreshHitAreas);
        }
        return this.scrollParent;
      }
    }

    class SelectNodeHandler {
      constructor(_ref) {
        let {
          getNodeById
        } = _ref;
        this.getNodeById = getNodeById;
        this.selectedNodes = new Set();
        this.clear();
      }
      getSelectedNode() {
        const selectedNodes = this.getSelectedNodes();
        if (selectedNodes.length) {
          return selectedNodes[0] || false;
        } else {
          return false;
        }
      }
      getSelectedNodes() {
        if (this.selectedSingleNode) {
          return [this.selectedSingleNode];
        } else {
          const selectedNodes = [];
          this.selectedNodes.forEach(id => {
            const node = this.getNodeById(id);
            if (node) {
              selectedNodes.push(node);
            }
          });
          return selectedNodes;
        }
      }
      getSelectedNodesUnder(parent) {
        if (this.selectedSingleNode) {
          if (parent.isParentOf(this.selectedSingleNode)) {
            return [this.selectedSingleNode];
          } else {
            return [];
          }
        } else {
          const selectedNodes = [];
          for (const id in this.selectedNodes) {
            if (Object.prototype.hasOwnProperty.call(this.selectedNodes, id)) {
              const node = this.getNodeById(id);
              if (node && parent.isParentOf(node)) {
                selectedNodes.push(node);
              }
            }
          }
          return selectedNodes;
        }
      }
      isNodeSelected(node) {
        if (node.id != null) {
          return this.selectedNodes.has(node.id);
        } else if (this.selectedSingleNode) {
          return this.selectedSingleNode.element === node.element;
        } else {
          return false;
        }
      }
      clear() {
        this.selectedNodes.clear();
        this.selectedSingleNode = null;
      }
      removeFromSelection(node) {
        let includeChildren = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        if (node.id == null) {
          if (this.selectedSingleNode && node.element === this.selectedSingleNode.element) {
            this.selectedSingleNode = null;
          }
        } else {
          this.selectedNodes.delete(node.id);
          if (includeChildren) {
            node.iterate(() => {
              if (node.id != null) {
                this.selectedNodes.delete(node.id);
              }
              return true;
            });
          }
        }
      }
      addToSelection(node) {
        if (node.id != null) {
          this.selectedNodes.add(node.id);
        } else {
          this.selectedSingleNode = node;
        }
      }
    }

    const register = (widgetClass, widgetName) => {
      const getDataKey = () => `simple_widget_${widgetName}`;
      const getWidgetData = (el, dataKey) => {
        const widget = jQuery.data(el, dataKey);
        if (widget && widget instanceof SimpleWidget) {
          return widget;
        } else {
          return null;
        }
      };
      const createWidget = ($el, options) => {
        const dataKey = getDataKey();
        for (const el of $el.get()) {
          const existingWidget = getWidgetData(el, dataKey);
          if (!existingWidget) {
            const simpleWidgetClass = widgetClass;
            const widget = new simpleWidgetClass(el, options);
            if (!jQuery.data(el, dataKey)) {
              jQuery.data(el, dataKey, widget);
            }

            // Call init after setting data, so we can call methods
            widget.init();
          }
        }
        return $el;
      };
      const destroyWidget = $el => {
        const dataKey = getDataKey();
        for (const el of $el.get()) {
          const widget = getWidgetData(el, dataKey);
          if (widget) {
            widget.destroy();
          }
          jQuery.removeData(el, dataKey);
        }
      };
      const callFunction = ($el, functionName, args) => {
        let result = null;
        for (const el of $el.get()) {
          const widget = jQuery.data(el, getDataKey());
          if (widget && widget instanceof SimpleWidget) {
            const simpleWidget = widget;
            const widgetFunction = simpleWidget[functionName];
            if (widgetFunction && typeof widgetFunction === "function") {
              result = widgetFunction.apply(widget, args);
            }
          }
        }
        return result;
      };

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      jQuery.fn[widgetName] = function (argument1) {
        if (!argument1) {
          return createWidget(this, null);
        } else if (typeof argument1 === "object") {
          const options = argument1;
          return createWidget(this, options);
        } else if (typeof argument1 === "string" && argument1[0] !== "_") {
          const functionName = argument1;
          if (functionName === "destroy") {
            return destroyWidget(this);
          } else if (functionName === "get_widget_class") {
            return widgetClass;
          } else {
            for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              args[_key - 1] = arguments[_key];
            }
            return callFunction(this, functionName, args);
          }
        } else {
          return undefined;
        }
      };
    };
    class SimpleWidget {
      static register(widgetClass, widgetName) {
        register(widgetClass, widgetName);
      }
      static defaults = {};
      constructor(el, options) {
        this.$el = jQuery(el);

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const defaults = this.constructor["defaults"];
        this.options = {
          ...defaults,
          ...options
        };
      }
      destroy() {
        this.deinit();
      }
      init() {
        //
      }
      deinit() {
        //
      }
    }

    const isNodeRecordWithChildren = data => typeof data === "object" && "children" in data && data["children"] instanceof Array;

    class Node {
      constructor() {
        let nodeData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        let isRoot = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        let nodeClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Node;
        this.name = "";
        this.load_on_demand = false;
        this.isEmptyFolder = nodeData != null && isNodeRecordWithChildren(nodeData) && nodeData.children.length === 0;
        this.setData(nodeData);
        this.children = [];
        this.parent = null;
        if (isRoot) {
          this.idMapping = new Map();
          this.tree = this;
          this.nodeClass = nodeClass;
        }
      }

      /*
      Set the data of this node.
       setData(string): set the name of the node
      setData(object): set attributes of the node
       Examples:
          setData('node1')
           setData({ name: 'node1', id: 1});
           setData({ name: 'node2', id: 2, color: 'green'});
       * This is an internal function; it is not in the docs
      * Does not remove existing node values
      */
      setData(o) {
        if (!o) {
          return;
        } else if (typeof o === "string") {
          this.name = o;
        } else if (typeof o === "object") {
          for (const key in o) {
            if (Object.prototype.hasOwnProperty.call(o, key)) {
              const value = o[key];
              if (key === "label" || key === "name") {
                // You can use the 'label' key instead of 'name'; this is a legacy feature
                if (typeof value === "string") {
                  this.name = value;
                }
              } else if (key !== "children" && key !== "parent") {
                // You can't update the children or the parent using this function
                this[key] = value;
              }
            }
          }
        }
      }

      /*
      Create tree from data.
       Structure of data is:
      [
          {
              name: 'node1',
              children: [
                  { name: 'child1' },
                  { name: 'child2' }
              ]
          },
          {
              name: 'node2'
          }
      ]
      */
      loadFromData(data) {
        this.removeChildren();
        for (const childData of data) {
          const node = this.createNode(childData);
          this.addChild(node);
          if (isNodeRecordWithChildren(childData)) {
            node.loadFromData(childData.children);
          }
        }
        return this;
      }

      /*
      Add child.
       tree.addChild(
          new Node('child1')
      );
      */
      addChild(node) {
        this.children.push(node);
        node.setParent(this);
      }

      /*
      Add child at position. Index starts at 0.
       tree.addChildAtPosition(
          new Node('abc'),
          1
      );
      */
      addChildAtPosition(node, index) {
        this.children.splice(index, 0, node);
        node.setParent(this);
      }

      /*
      Remove child. This also removes the children of the node.
       tree.removeChild(tree.children[0]);
      */
      removeChild(node) {
        // remove children from the index
        node.removeChildren();
        this.doRemoveChild(node);
      }

      /*
      Get child index.
       var index = getChildIndex(node);
      */
      getChildIndex(node) {
        return this.children.indexOf(node);
      }

      /*
      Does the tree have children?
       if (tree.hasChildren()) {
          //
      }
      */
      hasChildren() {
        return this.children.length !== 0;
      }
      isFolder() {
        return this.hasChildren() || this.load_on_demand;
      }

      /*
      Iterate over all the nodes in the tree.
       Calls callback with (node, level).
       The callback must return true to continue the iteration on current node.
       tree.iterate(
          function(node, level) {
             console.log(node.name);
              // stop iteration after level 2
             return (level <= 2);
          }
      );
       */
      iterate(callback) {
        const _iterate = (node, level) => {
          if (node.children) {
            for (const child of node.children) {
              const result = callback(child, level);
              if (result && child.hasChildren()) {
                _iterate(child, level + 1);
              }
            }
          }
        };
        _iterate(this, 0);
      }

      /*
      Move node relative to another node.
       Argument position: Position.BEFORE, Position.AFTER or Position.Inside
       // move node1 after node2
      tree.moveNode(node1, node2, Position.AFTER);
      */
      moveNode(movedNode, targetNode, position) {
        if (!movedNode.parent || movedNode.isParentOf(targetNode)) {
          // - Node is parent of target node
          // - Or, parent is empty
          return false;
        } else {
          movedNode.parent.doRemoveChild(movedNode);
          switch (position) {
            case Position.After:
              {
                if (targetNode.parent) {
                  targetNode.parent.addChildAtPosition(movedNode, targetNode.parent.getChildIndex(targetNode) + 1);
                  return true;
                }
                return false;
              }
            case Position.Before:
              {
                if (targetNode.parent) {
                  targetNode.parent.addChildAtPosition(movedNode, targetNode.parent.getChildIndex(targetNode));
                  return true;
                }
                return false;
              }
            case Position.Inside:
              {
                // move inside as first child
                targetNode.addChildAtPosition(movedNode, 0);
                return true;
              }
            default:
              return false;
          }
        }
      }

      /*
      Get the tree as data.
      */
      getData() {
        let includeParent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        const getDataFromNodes = nodes => {
          return nodes.map(node => {
            const tmpNode = {};
            for (const k in node) {
              if (["parent", "children", "element", "idMapping", "load_on_demand", "nodeClass", "tree", "isEmptyFolder"].indexOf(k) === -1 && Object.prototype.hasOwnProperty.call(node, k)) {
                const v = node[k];
                tmpNode[k] = v;
              }
            }
            if (node.hasChildren()) {
              tmpNode["children"] = getDataFromNodes(node.children);
            }
            return tmpNode;
          });
        };
        if (includeParent) {
          return getDataFromNodes([this]);
        } else {
          return getDataFromNodes(this.children);
        }
      }
      getNodeByName(name) {
        return this.getNodeByCallback(node => node.name === name);
      }
      getNodeByNameMustExist(name) {
        const node = this.getNodeByCallback(n => n.name === name);
        if (!node) {
          throw `Node with name ${name} not found`;
        }
        return node;
      }
      getNodeByCallback(callback) {
        let result = null;
        this.iterate(node => {
          if (result) {
            return false;
          } else if (callback(node)) {
            result = node;
            return false;
          } else {
            return true;
          }
        });
        return result;
      }
      addAfter(nodeInfo) {
        if (!this.parent) {
          return null;
        } else {
          const node = this.createNode(nodeInfo);
          const childIndex = this.parent.getChildIndex(this);
          this.parent.addChildAtPosition(node, childIndex + 1);
          node.loadChildrenFromData(nodeInfo);
          return node;
        }
      }
      addBefore(nodeInfo) {
        if (!this.parent) {
          return null;
        } else {
          const node = this.createNode(nodeInfo);
          const childIndex = this.parent.getChildIndex(this);
          this.parent.addChildAtPosition(node, childIndex);
          node.loadChildrenFromData(nodeInfo);
          return node;
        }
      }
      addParent(nodeInfo) {
        if (!this.parent) {
          return null;
        } else {
          const newParent = this.createNode(nodeInfo);
          if (this.tree) {
            newParent.setParent(this.tree);
          }
          const originalParent = this.parent;
          for (const child of originalParent.children) {
            newParent.addChild(child);
          }
          originalParent.children = [];
          originalParent.addChild(newParent);
          return newParent;
        }
      }
      remove() {
        if (this.parent) {
          this.parent.removeChild(this);
          this.parent = null;
        }
      }
      append(nodeInfo) {
        const node = this.createNode(nodeInfo);
        this.addChild(node);
        node.loadChildrenFromData(nodeInfo);
        return node;
      }
      prepend(nodeInfo) {
        const node = this.createNode(nodeInfo);
        this.addChildAtPosition(node, 0);
        node.loadChildrenFromData(nodeInfo);
        return node;
      }
      isParentOf(node) {
        let parent = node.parent;
        while (parent) {
          if (parent === this) {
            return true;
          }
          parent = parent.parent;
        }
        return false;
      }
      getLevel() {
        let level = 0;
        let node = this; // eslint-disable-line @typescript-eslint/no-this-alias

        while (node.parent) {
          level += 1;
          node = node.parent;
        }
        return level;
      }
      getNodeById(nodeId) {
        return this.idMapping.get(nodeId) || null;
      }
      addNodeToIndex(node) {
        if (node.id != null) {
          this.idMapping.set(node.id, node);
        }
      }
      removeNodeFromIndex(node) {
        if (node.id != null) {
          this.idMapping.delete(node.id);
        }
      }
      removeChildren() {
        this.iterate(child => {
          this.tree?.removeNodeFromIndex(child);
          return true;
        });
        this.children = [];
      }
      getPreviousSibling() {
        if (!this.parent) {
          return null;
        } else {
          const previousIndex = this.parent.getChildIndex(this) - 1;
          if (previousIndex >= 0) {
            return this.parent.children[previousIndex] || null;
          } else {
            return null;
          }
        }
      }
      getNextSibling() {
        if (!this.parent) {
          return null;
        } else {
          const nextIndex = this.parent.getChildIndex(this) + 1;
          if (nextIndex < this.parent.children.length) {
            return this.parent.children[nextIndex] || null;
          } else {
            return null;
          }
        }
      }
      getNodesByProperty(key, value) {
        return this.filter(node => node[key] === value);
      }
      filter(f) {
        const result = [];
        this.iterate(node => {
          if (f(node)) {
            result.push(node);
          }
          return true;
        });
        return result;
      }
      getNextNode() {
        let includeChildren = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        if (includeChildren && this.hasChildren()) {
          return this.children[0] || null;
        } else if (!this.parent) {
          return null;
        } else {
          const nextSibling = this.getNextSibling();
          if (nextSibling) {
            return nextSibling;
          } else {
            return this.parent.getNextNode(false);
          }
        }
      }
      getNextVisibleNode() {
        if (this.hasChildren() && this.is_open) {
          // First child
          return this.children[0] || null;
        } else {
          if (!this.parent) {
            return null;
          } else {
            const nextSibling = this.getNextSibling();
            if (nextSibling) {
              // Next sibling
              return nextSibling;
            } else {
              // Next node of parent
              return this.parent.getNextNode(false);
            }
          }
        }
      }
      getPreviousNode() {
        if (!this.parent) {
          return null;
        } else {
          const previousSibling = this.getPreviousSibling();
          if (!previousSibling) {
            return this.getParent();
          } else if (previousSibling.hasChildren()) {
            return previousSibling.getLastChild();
          } else {
            return previousSibling;
          }
        }
      }
      getPreviousVisibleNode() {
        if (!this.parent) {
          return null;
        } else {
          const previousSibling = this.getPreviousSibling();
          if (!previousSibling) {
            return this.getParent();
          } else if (!previousSibling.hasChildren() || !previousSibling.is_open) {
            // Previous sibling
            return previousSibling;
          } else {
            // Last child of previous sibling
            return previousSibling.getLastChild();
          }
        }
      }
      getParent() {
        // Return parent except if it is the root node
        if (!this.parent) {
          return null;
        } else if (!this.parent.parent) {
          // Root node -> null
          return null;
        } else {
          return this.parent;
        }
      }
      getLastChild() {
        if (!this.hasChildren()) {
          return null;
        } else {
          const lastChild = this.children[this.children.length - 1];
          if (!lastChild) {
            return null;
          }
          if (!(lastChild.hasChildren() && lastChild.is_open)) {
            return lastChild;
          } else {
            return lastChild?.getLastChild();
          }
        }
      }

      // Init Node from data without making it the root of the tree
      initFromData(data) {
        const addNode = nodeData => {
          this.setData(nodeData);
          if (isNodeRecordWithChildren(nodeData) && nodeData.children.length) {
            addChildren(nodeData.children);
          }
        };
        const addChildren = childrenData => {
          for (const child of childrenData) {
            const node = this.createNode();
            node.initFromData(child);
            this.addChild(node);
          }
        };
        addNode(data);
      }
      setParent(parent) {
        this.parent = parent;
        this.tree = parent.tree;
        this.tree?.addNodeToIndex(this);
      }
      doRemoveChild(node) {
        this.children.splice(this.getChildIndex(node), 1);
        this.tree?.removeNodeFromIndex(node);
      }
      getNodeClass() {
        return this.nodeClass || this?.tree?.nodeClass || Node;
      }
      createNode(nodeData) {
        const nodeClass = this.getNodeClass();
        return new nodeClass(nodeData);
      }

      // Load children data from nodeInfo if it has children
      loadChildrenFromData(nodeInfo) {
        if (isNodeRecordWithChildren(nodeInfo) && nodeInfo.children.length) {
          this.loadFromData(nodeInfo.children);
        }
      }
    }

    class BorderDropHint {
      constructor(element, scrollLeft) {
        const div = element.querySelector(":scope > .jqtree-element");
        if (!div) {
          this.hint = undefined;
          return;
        }
        const width = Math.max(element.offsetWidth + scrollLeft - 4, 0);
        const height = Math.max(element.clientHeight - 4, 0);
        const hint = document.createElement("span");
        hint.className = "jqtree-border";
        hint.style.width = `${width}px`;
        hint.style.height = `${height}px`;
        this.hint = hint;
        div.append(this.hint);
      }
      remove() {
        this.hint?.remove();
      }
    }

    class GhostDropHint {
      constructor(element) {
        this.element = element;
        this.ghost = this.createGhostElement();
        this.element.after(this.ghost);
        this.ghost.classList.add("jqtree-inside");
      }
      remove() {
        this.ghost.remove();
      }
      createGhostElement() {
        const ghost = document.createElement("li");
        ghost.className = "jqtree_common jqtree-ghost";
        const circleSpan = document.createElement("span");
        circleSpan.className = "jqtree_common jqtree-circle";
        ghost.append(circleSpan);
        const lineSpan = document.createElement("span");
        lineSpan.className = "jqtree_common jqtree-line";
        ghost.append(lineSpan);
        return ghost;
      }
    }

    class NodeElement {
      constructor(_ref) {
        let {
          getScrollLeft,
          node,
          tabIndex,
          $treeElement
        } = _ref;
        this.getScrollLeft = getScrollLeft;
        this.tabIndex = tabIndex;
        this.$treeElement = $treeElement;
        this.init(node);
      }
      init(node) {
        this.node = node;
        if (!node.element) {
          const element = this.$treeElement.get(0);
          if (element) {
            node.element = element;
          }
        }
        if (node.element) {
          this.element = node.element;
        }
      }
      addDropHint(position) {
        if (this.mustShowBorderDropHint(position)) {
          return new BorderDropHint(this.element, this.getScrollLeft());
        } else {
          return new GhostDropHint(this.element);
        }
      }
      select(mustSetFocus) {
        this.element.classList.add("jqtree-selected");
        const titleSpan = this.getTitleSpan();
        const tabIndex = this.tabIndex;

        // Check for null or undefined
        if (tabIndex != null) {
          titleSpan.setAttribute("tabindex", tabIndex.toString());
        }
        titleSpan.setAttribute("aria-selected", "true");
        if (mustSetFocus) {
          titleSpan.focus();
        }
      }
      deselect() {
        this.element.classList.remove("jqtree-selected");
        const titleSpan = this.getTitleSpan();
        titleSpan.removeAttribute("tabindex");
        titleSpan.setAttribute("aria-selected", "false");
        titleSpan.blur();
      }
      getUl() {
        return this.element.querySelector(":scope > ul");
      }
      getTitleSpan() {
        return this.element.querySelector(":scope > .jqtree-element > span.jqtree-title");
      }
      mustShowBorderDropHint(position) {
        return position === Position.Inside;
      }
    }

    class FolderElement extends NodeElement {
      constructor(_ref) {
        let {
          closedIconElement,
          getScrollLeft,
          node,
          openedIconElement,
          tabIndex,
          $treeElement,
          triggerEvent
        } = _ref;
        super({
          getScrollLeft,
          node,
          tabIndex,
          $treeElement
        });
        this.closedIconElement = closedIconElement;
        this.openedIconElement = openedIconElement;
        this.triggerEvent = triggerEvent;
      }
      open(onFinished) {
        let slide = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        let animationSpeed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "fast";
        if (this.node.is_open) {
          return;
        }
        this.node.is_open = true;
        const button = this.getButton();
        button.classList.remove("jqtree-closed");
        button.innerHTML = "";
        const openedIconElement = this.openedIconElement;
        if (openedIconElement) {
          const icon = openedIconElement.cloneNode(true);
          button.appendChild(icon);
        }
        const doOpen = () => {
          this.element.classList.remove("jqtree-closed");
          const titleSpan = this.getTitleSpan();
          titleSpan.setAttribute("aria-expanded", "true");
          if (onFinished) {
            onFinished(this.node);
          }
          this.triggerEvent("tree.open", {
            node: this.node
          });
        };
        if (slide) {
          jQuery(this.getUl()).slideDown(animationSpeed, doOpen);
        } else {
          jQuery(this.getUl()).show();
          doOpen();
        }
      }
      close() {
        let slide = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        let animationSpeed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "fast";
        if (!this.node.is_open) {
          return;
        }
        this.node.is_open = false;
        const button = this.getButton();
        button.classList.add("jqtree-closed");
        button.innerHTML = "";
        const closedIconElement = this.closedIconElement;
        if (closedIconElement) {
          const icon = closedIconElement.cloneNode(true);
          button.appendChild(icon);
        }
        const doClose = () => {
          this.element.classList.add("jqtree-closed");
          const titleSpan = this.getTitleSpan();
          titleSpan.setAttribute("aria-expanded", "false");
          this.triggerEvent("tree.close", {
            node: this.node
          });
        };
        if (slide) {
          jQuery(this.getUl()).slideUp(animationSpeed, doClose);
        } else {
          jQuery(this.getUl()).hide();
          doClose();
        }
      }
      mustShowBorderDropHint(position) {
        return !this.node.is_open && position === Position.Inside;
      }
      getButton() {
        return this.element.querySelector(":scope > .jqtree-element > a.jqtree-toggler");
      }
    }

    const NODE_PARAM_IS_EMPTY = "Node parameter is empty";
    const PARAM_IS_EMPTY = "Parameter is empty: ";
    class JqTreeWidget extends SimpleWidget {
      static defaults = {
        animationSpeed: "fast",
        autoEscape: true,
        autoOpen: false,
        // true / false / int (open n levels starting at 0)
        buttonLeft: true,
        // The symbol to use for a closed node - ► BLACK RIGHT-POINTING POINTER
        // http://www.fileformat.info/info/unicode/char/25ba/index.htm
        closedIcon: undefined,
        data: undefined,
        dataFilter: undefined,
        dataUrl: undefined,
        dragAndDrop: false,
        keyboardSupport: true,
        nodeClass: Node,
        onCanMove: undefined,
        // Can this node be moved?
        onCanMoveTo: undefined,
        // Can this node be moved to this position? function(moved_node, target_node, position)
        onCanSelectNode: undefined,
        onCreateLi: undefined,
        onDragMove: undefined,
        onDragStop: undefined,
        onGetStateFromStorage: undefined,
        onIsMoveHandle: undefined,
        onLoadFailed: undefined,
        onLoading: undefined,
        onSetStateFromStorage: undefined,
        openedIcon: "&#x25bc;",
        openFolderDelay: 500,
        // The delay for opening a folder during drag and drop; the value is in milliseconds
        // The symbol to use for an open node - ▼ BLACK DOWN-POINTING TRIANGLE
        // http://www.fileformat.info/info/unicode/char/25bc/index.htm
        rtl: undefined,
        // right-to-left support; true / false (default)
        saveState: false,
        // true / false / string (cookie name)
        selectable: true,
        showEmptyFolder: false,
        slide: true,
        // must display slide animation?
        startDndDelay: 300,
        // The delay for starting dnd (in milliseconds)
        tabIndex: 0,
        useContextMenu: true
      };
      toggle(node) {
        let slideParam = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        if (!node) {
          throw Error(NODE_PARAM_IS_EMPTY);
        }
        const slide = slideParam ?? this.options.slide;
        if (node.is_open) {
          this.closeNode(node, slide);
        } else {
          this.openNode(node, slide);
        }
        return this.element;
      }
      getTree() {
        return this.tree;
      }
      selectNode(node, optionsParam) {
        this.doSelectNode(node, optionsParam);
        return this.element;
      }
      getSelectedNode() {
        return this.selectNodeHandler.getSelectedNode();
      }
      toJson() {
        return JSON.stringify(this.tree.getData());
      }
      loadData(data, parentNode) {
        this.doLoadData(data, parentNode);
        return this.element;
      }

      /*
      signatures:
      - loadDataFromUrl(url, parent_node=null, on_finished=null)
          loadDataFromUrl('/my_data');
          loadDataFromUrl('/my_data', node1);
          loadDataFromUrl('/my_data', node1, function() { console.log('finished'); });
          loadDataFromUrl('/my_data', null, function() { console.log('finished'); });
       - loadDataFromUrl(parent_node=null, on_finished=null)
          loadDataFromUrl();
          loadDataFromUrl(node1);
          loadDataFromUrl(null, function() { console.log('finished'); });
          loadDataFromUrl(node1, function() { console.log('finished'); });
      */
      loadDataFromUrl(param1, param2, param3) {
        if (typeof param1 === "string") {
          // first parameter is url
          this.doLoadDataFromUrl(param1, param2, param3 ?? null);
        } else {
          // first parameter is not url
          this.doLoadDataFromUrl(null, param1, param2);
        }
        return this.element;
      }
      reload(onFinished) {
        this.doLoadDataFromUrl(null, null, onFinished);
        return this.element;
      }
      refresh() {
        this.refreshElements(null);
        return this.element;
      }
      getNodeById(nodeId) {
        return this.tree.getNodeById(nodeId);
      }
      getNodeByName(name) {
        return this.tree.getNodeByName(name);
      }
      getNodeByNameMustExist(name) {
        return this.tree.getNodeByNameMustExist(name);
      }
      getNodesByProperty(key, value) {
        return this.tree.getNodesByProperty(key, value);
      }
      getNodeByHtmlElement(inputElement) {
        const element = inputElement instanceof HTMLElement ? inputElement : inputElement[0];
        if (!element) {
          return null;
        }
        return this.getNode(element);
      }
      getNodeByCallback(callback) {
        return this.tree.getNodeByCallback(callback);
      }
      openNode(node, param1, param2) {
        if (!node) {
          throw Error(NODE_PARAM_IS_EMPTY);
        }
        const parseParams = () => {
          let onFinished;
          let slide;
          if (isFunction(param1)) {
            onFinished = param1;
            slide = null;
          } else {
            slide = param1;
            onFinished = param2;
          }
          if (slide == null) {
            slide = this.options.slide ?? false;
          }
          return [slide, onFinished];
        };
        const [slide, onFinished] = parseParams();
        this.openNodeInternal(node, slide, onFinished);
        return this.element;
      }
      closeNode(node, slideParam) {
        if (!node) {
          throw Error(NODE_PARAM_IS_EMPTY);
        }
        const slide = slideParam ?? this.options.slide;
        if (node.isFolder() || node.isEmptyFolder) {
          this.createFolderElement(node).close(slide, this.options.animationSpeed);
          this.saveState();
        }
        return this.element;
      }
      isDragging() {
        return this.dndHandler.isDragging;
      }
      refreshHitAreas() {
        this.dndHandler.refresh();
        return this.element;
      }
      addNodeAfter(newNodeInfo, existingNode) {
        const newNode = existingNode.addAfter(newNodeInfo);
        if (newNode) {
          this.refreshElements(existingNode.parent);
        }
        return newNode;
      }
      addNodeBefore(newNodeInfo, existingNode) {
        if (!existingNode) {
          throw Error(PARAM_IS_EMPTY + "existingNode");
        }
        const newNode = existingNode.addBefore(newNodeInfo);
        if (newNode) {
          this.refreshElements(existingNode.parent);
        }
        return newNode;
      }
      addParentNode(newNodeInfo, existingNode) {
        if (!existingNode) {
          throw Error(PARAM_IS_EMPTY + "existingNode");
        }
        const newNode = existingNode.addParent(newNodeInfo);
        if (newNode) {
          this.refreshElements(newNode.parent);
        }
        return newNode;
      }
      removeNode(node) {
        if (!node) {
          throw Error(NODE_PARAM_IS_EMPTY);
        }
        if (!node.parent) {
          throw Error("Node has no parent");
        }
        this.selectNodeHandler.removeFromSelection(node, true); // including children

        const parent = node.parent;
        node.remove();
        this.refreshElements(parent);
        return this.element;
      }
      appendNode(newNodeInfo, parentNodeParam) {
        const parentNode = parentNodeParam || this.tree;
        const node = parentNode.append(newNodeInfo);
        this.refreshElements(parentNode);
        return node;
      }
      prependNode(newNodeInfo, parentNodeParam) {
        const parentNode = parentNodeParam ?? this.tree;
        const node = parentNode.prepend(newNodeInfo);
        this.refreshElements(parentNode);
        return node;
      }
      updateNode(node, data) {
        if (!node) {
          throw Error(NODE_PARAM_IS_EMPTY);
        }
        const idIsChanged = typeof data === "object" && data.id && data.id !== node.id;
        if (idIsChanged) {
          this.tree.removeNodeFromIndex(node);
        }
        node.setData(data);
        if (idIsChanged) {
          this.tree.addNodeToIndex(node);
        }
        if (typeof data === "object" && data["children"] && data["children"] instanceof Array) {
          node.removeChildren();
          if (data.children.length) {
            node.loadFromData(data.children);
          }
        }
        this.refreshElements(node);
        return this.element;
      }
      isSelectedNodeInSubtree(subtree) {
        const selectedNode = this.getSelectedNode();
        if (!selectedNode) {
          return false;
        } else {
          return subtree === selectedNode || subtree.isParentOf(selectedNode);
        }
      }
      moveNode(node, targetNode, position) {
        if (!node) {
          throw Error(NODE_PARAM_IS_EMPTY);
        }
        if (!targetNode) {
          throw Error(PARAM_IS_EMPTY + "targetNode");
        }
        const positionIndex = getPosition(position);
        if (positionIndex !== undefined) {
          this.tree.moveNode(node, targetNode, positionIndex);
          this.refreshElements(null);
        }
        return this.element;
      }
      getStateFromStorage() {
        return this.saveStateHandler.getStateFromStorage();
      }
      addToSelection(node, mustSetFocus) {
        if (!node) {
          throw Error(NODE_PARAM_IS_EMPTY);
        }
        this.selectNodeHandler.addToSelection(node);
        this.openParents(node);
        this.getNodeElementForNode(node).select(mustSetFocus === undefined ? true : mustSetFocus);
        this.saveState();
        return this.element;
      }
      getSelectedNodes() {
        return this.selectNodeHandler.getSelectedNodes();
      }
      isNodeSelected(node) {
        if (!node) {
          throw Error(NODE_PARAM_IS_EMPTY);
        }
        return this.selectNodeHandler.isNodeSelected(node);
      }
      removeFromSelection(node) {
        if (!node) {
          throw Error(NODE_PARAM_IS_EMPTY);
        }
        this.selectNodeHandler.removeFromSelection(node);
        this.getNodeElementForNode(node).deselect();
        this.saveState();
        return this.element;
      }
      scrollToNode(node) {
        if (!node) {
          throw Error(NODE_PARAM_IS_EMPTY);
        }
        const top = getOffsetTop(node.element) - getOffsetTop(this.$el.get(0));
        this.scrollHandler.scrollToY(top);
        return this.element;
      }
      getState() {
        return this.saveStateHandler.getState();
      }
      setState(state) {
        this.saveStateHandler.setInitialState(state);
        this.refreshElements(null);
        return this.element;
      }
      setOption(option, value) {
        this.options[option] = value;
        return this.element;
      }
      moveDown() {
        const selectedNode = this.getSelectedNode();
        if (selectedNode) {
          this.keyHandler.moveDown(selectedNode);
        }
        return this.element;
      }
      moveUp() {
        const selectedNode = this.getSelectedNode();
        if (selectedNode) {
          this.keyHandler.moveUp(selectedNode);
        }
        return this.element;
      }
      getVersion() {
        return version;
      }
      openNodeInternal(node) {
        let slide = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        let onFinished = arguments.length > 2 ? arguments[2] : undefined;
        const doOpenNode = (_node, _slide, _onFinished) => {
          const folderElement = this.createFolderElement(_node);
          folderElement.open(_onFinished, _slide, this.options.animationSpeed);
        };
        if (node.isFolder() || node.isEmptyFolder) {
          if (node.load_on_demand) {
            this.loadFolderOnDemand(node, slide, onFinished);
          } else {
            let parent = node.parent;
            while (parent) {
              // nb: do not open root element
              if (parent.parent) {
                doOpenNode(parent, false);
              }
              parent = parent.parent;
            }
            doOpenNode(node, slide, onFinished);
            this.saveState();
          }
        }
      }

      /*
      Redraw the tree or part of the tree.
       from_node: redraw this subtree
      */
      refreshElements(fromNode) {
        const mustSetFocus = this.isFocusOnTree();
        const mustSelect = fromNode ? this.isSelectedNodeInSubtree(fromNode) : false;
        this.renderer.render(fromNode);
        if (mustSelect) {
          this.selectCurrentNode(mustSetFocus);
        }
        this.triggerEvent("tree.refresh");
      }
      getNodeElementForNode(node) {
        if (node.isFolder()) {
          return this.createFolderElement(node);
        } else {
          return this.createNodeElement(node);
        }
      }
      getNodeElement(element) {
        const node = this.getNode(element);
        if (node) {
          return this.getNodeElementForNode(node);
        } else {
          return null;
        }
      }
      init() {
        super.init();
        this.element = this.$el;
        this.isInitialized = false;
        this.options.rtl = this.getRtlOption();
        if (this.options.closedIcon == null) {
          this.options.closedIcon = this.getDefaultClosedIcon();
        }
        this.connectHandlers();
        this.initData();
      }
      deinit() {
        this.element.empty();
        this.element.off();
        this.keyHandler.deinit();
        this.mouseHandler.deinit();
        this.tree = new Node({}, true);
        super.deinit();
      }
      triggerEvent(eventName, values) {
        const event = jQuery.Event(eventName, values);
        this.element.trigger(event);
        return event;
      }
      mouseCapture(positionInfo) {
        if (this.options.dragAndDrop) {
          return this.dndHandler.mouseCapture(positionInfo);
        } else {
          return false;
        }
      }
      mouseStart(positionInfo) {
        if (this.options.dragAndDrop) {
          return this.dndHandler.mouseStart(positionInfo);
        } else {
          return false;
        }
      }
      mouseDrag(positionInfo) {
        if (this.options.dragAndDrop) {
          const result = this.dndHandler.mouseDrag(positionInfo);
          this.scrollHandler.checkScrolling(positionInfo);
          return result;
        } else {
          return false;
        }
      }
      mouseStop(positionInfo) {
        if (this.options.dragAndDrop) {
          this.scrollHandler.stopScrolling();
          return this.dndHandler.mouseStop(positionInfo);
        } else {
          return false;
        }
      }
      initData() {
        if (this.options.data) {
          this.doLoadData(this.options.data, null);
        } else {
          const dataUrl = this.getDataUrlInfo(null);
          if (dataUrl) {
            this.doLoadDataFromUrl(null, null, null);
          } else {
            this.doLoadData([], null);
          }
        }
      }
      getDataUrlInfo(node) {
        const dataUrl = this.options.dataUrl || this.element.data("url");
        const getUrlFromString = url => {
          const urlInfo = {
            url
          };
          setUrlInfoData(urlInfo);
          return urlInfo;
        };
        const setUrlInfoData = urlInfo => {
          if (node?.id) {
            // Load on demand of a subtree; add node parameter
            const data = {
              node: node.id
            };
            urlInfo["data"] = data;
          } else {
            // Add selected_node parameter
            const selectedNodeId = this.getNodeIdToBeSelected();
            if (selectedNodeId) {
              const data = {
                selected_node: selectedNodeId
              };
              urlInfo["data"] = data;
            }
          }
        };
        if (typeof dataUrl === "function") {
          return dataUrl(node);
        } else if (typeof dataUrl === "string") {
          return getUrlFromString(dataUrl);
        } else if (dataUrl && typeof dataUrl === "object") {
          setUrlInfoData(dataUrl);
          return dataUrl;
        } else {
          return null;
        }
      }
      getNodeIdToBeSelected() {
        if (this.options.saveState) {
          return this.saveStateHandler.getNodeIdToBeSelected();
        } else {
          return null;
        }
      }
      initTree(data) {
        const doInit = () => {
          if (!this.isInitialized) {
            this.isInitialized = true;
            this.triggerEvent("tree.init");
          }
        };
        if (!this.options.nodeClass) {
          return;
        }
        this.tree = new this.options.nodeClass(null, true, this.options.nodeClass);
        this.selectNodeHandler.clear();
        this.tree.loadFromData(data);
        const mustLoadOnDemand = this.setInitialState();
        this.refreshElements(null);
        if (!mustLoadOnDemand) {
          doInit();
        } else {
          // Load data on demand and then init the tree
          this.setInitialStateOnDemand(doInit);
        }
      }

      // Set initial state, either by restoring the state or auto-opening nodes
      // result: must load nodes on demand?
      setInitialState() {
        const restoreState = () => {
          // result: is state restored, must load on demand?
          if (!this.options.saveState) {
            return [false, false];
          } else {
            const state = this.saveStateHandler.getStateFromStorage();
            if (!state) {
              return [false, false];
            } else {
              const mustLoadOnDemand = this.saveStateHandler.setInitialState(state);

              // return true: the state is restored
              return [true, mustLoadOnDemand];
            }
          }
        };
        const autoOpenNodes = () => {
          // result: must load on demand?
          if (this.options.autoOpen === false) {
            return false;
          }
          const maxLevel = this.getAutoOpenMaxLevel();
          let mustLoadOnDemand = false;
          this.tree.iterate((node, level) => {
            if (node.load_on_demand) {
              mustLoadOnDemand = true;
              return false;
            } else if (!node.hasChildren()) {
              return false;
            } else {
              node.is_open = true;
              return level !== maxLevel;
            }
          });
          return mustLoadOnDemand;
        };
        let [isRestored, mustLoadOnDemand] = restoreState(); // eslint-disable-line prefer-const

        if (!isRestored) {
          mustLoadOnDemand = autoOpenNodes();
        }
        return mustLoadOnDemand;
      }

      // Set the initial state for nodes that are loaded on demand
      // Call cb_finished when done
      setInitialStateOnDemand(cbFinished) {
        const restoreState = () => {
          if (!this.options.saveState) {
            return false;
          } else {
            const state = this.saveStateHandler.getStateFromStorage();
            if (!state) {
              return false;
            } else {
              this.saveStateHandler.setInitialStateOnDemand(state, cbFinished);
              return true;
            }
          }
        };
        const autoOpenNodes = () => {
          const maxLevel = this.getAutoOpenMaxLevel();
          let loadingCount = 0;
          const loadAndOpenNode = node => {
            loadingCount += 1;
            this.openNodeInternal(node, false, () => {
              loadingCount -= 1;
              openNodes();
            });
          };
          const openNodes = () => {
            this.tree.iterate((node, level) => {
              if (node.load_on_demand) {
                if (!node.is_loading) {
                  loadAndOpenNode(node);
                }
                return false;
              } else {
                this.openNodeInternal(node, false);
                return level !== maxLevel;
              }
            });
            if (loadingCount === 0) {
              cbFinished();
            }
          };
          openNodes();
        };
        if (!restoreState()) {
          autoOpenNodes();
        }
      }
      getAutoOpenMaxLevel() {
        if (this.options.autoOpen === true) {
          return -1;
        } else if (typeof this.options.autoOpen === "number") {
          return this.options.autoOpen;
        } else if (typeof this.options.autoOpen === "string") {
          return parseInt(this.options.autoOpen, 10);
        } else {
          return 0;
        }
      }
      getNode(element) {
        const liElement = element.closest("li.jqtree_common");
        if (liElement) {
          return jQuery(liElement).data("node");
        } else {
          return null;
        }
      }
      saveState() {
        if (this.options.saveState) {
          this.saveStateHandler.saveState();
        }
      }
      selectCurrentNode(mustSetFocus) {
        const node = this.getSelectedNode();
        if (node) {
          const nodeElement = this.getNodeElementForNode(node);
          if (nodeElement) {
            nodeElement.select(mustSetFocus);
          }
        }
      }
      deselectCurrentNode() {
        const node = this.getSelectedNode();
        if (node) {
          this.removeFromSelection(node);
        }
      }
      getDefaultClosedIcon() {
        if (this.options.rtl) {
          // triangle to the left
          return "&#x25c0;";
        } else {
          // triangle to the right
          return "&#x25ba;";
        }
      }
      getRtlOption() {
        if (this.options.rtl != null) {
          return this.options.rtl;
        } else {
          const dataRtl = this.element.data("rtl");
          if (dataRtl !== null && dataRtl !== false && dataRtl !== undefined) {
            return true;
          } else {
            return false;
          }
        }
      }
      doSelectNode(node, optionsParam) {
        const saveState = () => {
          if (this.options.saveState) {
            this.saveStateHandler.saveState();
          }
        };
        if (!node) {
          // Called with empty node -> deselect current node
          this.deselectCurrentNode();
          saveState();
          return;
        }
        const defaultOptions = {
          mustSetFocus: true,
          mustToggle: true
        };
        const selectOptions = {
          ...defaultOptions,
          ...(optionsParam || {})
        };
        const canSelect = () => {
          if (this.options.onCanSelectNode) {
            return this.options.selectable === true && this.options.onCanSelectNode(node);
          } else {
            return this.options.selectable === true;
          }
        };
        if (!canSelect()) {
          return;
        }
        if (this.selectNodeHandler.isNodeSelected(node)) {
          if (selectOptions.mustToggle) {
            this.deselectCurrentNode();
            this.triggerEvent("tree.select", {
              node: null,
              previous_node: node
            });
          }
        } else {
          const deselectedNode = this.getSelectedNode() || null;
          this.deselectCurrentNode();
          this.addToSelection(node, selectOptions.mustSetFocus);
          this.triggerEvent("tree.select", {
            node,
            deselected_node: deselectedNode
          });
          this.openParents(node);
        }
        saveState();
      }
      doLoadData(data, parentNode) {
        if (data) {
          if (parentNode) {
            this.deselectNodes(parentNode);
            this.loadSubtree(data, parentNode);
          } else {
            this.initTree(data);
          }
          if (this.isDragging()) {
            this.dndHandler.refresh();
          }
        }
        this.triggerEvent("tree.load_data", {
          tree_data: data,
          parent_node: parentNode
        });
      }
      deselectNodes(parentNode) {
        const selectedNodesUnderParent = this.selectNodeHandler.getSelectedNodesUnder(parentNode);
        for (const n of selectedNodesUnderParent) {
          this.selectNodeHandler.removeFromSelection(n);
        }
      }
      loadSubtree(data, parentNode) {
        parentNode.loadFromData(data);
        parentNode.load_on_demand = false;
        parentNode.is_loading = false;
        this.refreshElements(parentNode);
      }
      doLoadDataFromUrl(urlInfoParam, parentNode, onFinished) {
        const urlInfo = urlInfoParam || this.getDataUrlInfo(parentNode);
        this.dataLoader.loadFromUrl(urlInfo, parentNode, onFinished);
      }
      loadFolderOnDemand(node) {
        let slide = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        let onFinished = arguments.length > 2 ? arguments[2] : undefined;
        node.is_loading = true;
        this.doLoadDataFromUrl(null, node, () => {
          this.openNodeInternal(node, slide, onFinished);
        });
      }
      containsElement(element) {
        const node = this.getNode(element);
        return node != null && node.tree === this.tree;
      }
      isFocusOnTree() {
        const activeElement = document.activeElement;
        return Boolean(activeElement && activeElement.tagName === "SPAN" && this.containsElement(activeElement));
      }
      connectHandlers() {
        const {
          autoEscape,
          buttonLeft,
          closedIcon,
          dataFilter,
          dragAndDrop,
          keyboardSupport,
          onCanMove,
          onCanMoveTo,
          onCreateLi,
          onDragMove,
          onDragStop,
          onGetStateFromStorage,
          onIsMoveHandle,
          onLoadFailed,
          onLoading,
          onSetStateFromStorage,
          openedIcon,
          openFolderDelay,
          rtl,
          saveState,
          showEmptyFolder,
          slide,
          tabIndex
        } = this.options;
        const closeNode = this.closeNode.bind(this);
        const getNodeElement = this.getNodeElement.bind(this);
        const getNodeElementForNode = this.getNodeElementForNode.bind(this);
        const getNodeById = this.getNodeById.bind(this);
        const getSelectedNode = this.getSelectedNode.bind(this);
        const getTree = this.getTree.bind(this);
        const isFocusOnTree = this.isFocusOnTree.bind(this);
        const loadData = this.loadData.bind(this);
        const openNode = this.openNodeInternal.bind(this);
        const refreshElements = this.refreshElements.bind(this);
        const refreshHitAreas = this.refreshHitAreas.bind(this);
        const selectNode = this.selectNode.bind(this);
        const $treeElement = this.element;
        const treeElement = this.element.get(0);
        const triggerEvent = this.triggerEvent.bind(this);
        const selectNodeHandler = new SelectNodeHandler({
          getNodeById
        });
        const addToSelection = selectNodeHandler.addToSelection.bind(selectNodeHandler);
        const getSelectedNodes = selectNodeHandler.getSelectedNodes.bind(selectNodeHandler);
        const isNodeSelected = selectNodeHandler.isNodeSelected.bind(selectNodeHandler);
        const removeFromSelection = selectNodeHandler.removeFromSelection.bind(selectNodeHandler);
        const getMouseDelay = () => this.options.startDndDelay ?? 0;
        const dataLoader = new DataLoader({
          dataFilter,
          loadData,
          onLoadFailed,
          onLoading,
          treeElement,
          triggerEvent
        });
        const saveStateHandler = new SaveStateHandler({
          addToSelection,
          getNodeById,
          getSelectedNodes,
          getTree,
          onGetStateFromStorage,
          onSetStateFromStorage,
          openNode,
          refreshElements,
          removeFromSelection,
          saveState
        });
        const scrollHandler = new ScrollHandler({
          refreshHitAreas,
          treeElement
        });
        const getScrollLeft = scrollHandler.getScrollLeft.bind(scrollHandler);
        const dndHandler = new DragAndDropHandler({
          autoEscape,
          getNodeElement,
          getNodeElementForNode,
          getScrollLeft,
          getTree,
          onCanMove,
          onCanMoveTo,
          onDragMove,
          onDragStop,
          onIsMoveHandle,
          openFolderDelay,
          openNode,
          refreshElements,
          slide,
          treeElement,
          triggerEvent
        });
        const keyHandler = new KeyHandler({
          closeNode,
          getSelectedNode,
          isFocusOnTree,
          keyboardSupport,
          openNode,
          selectNode
        });
        const renderer = new ElementsRenderer({
          autoEscape,
          buttonLeft,
          closedIcon,
          dragAndDrop,
          $element: $treeElement,
          getTree,
          isNodeSelected,
          onCreateLi,
          openedIcon,
          rtl,
          showEmptyFolder,
          tabIndex
        });
        const getNode = this.getNode.bind(this);
        const onMouseCapture = this.mouseCapture.bind(this);
        const onMouseDrag = this.mouseDrag.bind(this);
        const onMouseStart = this.mouseStart.bind(this);
        const onMouseStop = this.mouseStop.bind(this);
        const mouseHandler = new MouseHandler({
          element: treeElement,
          getMouseDelay,
          getNode,
          onClickButton: this.toggle.bind(this),
          onClickTitle: this.doSelectNode.bind(this),
          onMouseCapture,
          onMouseDrag,
          onMouseStart,
          onMouseStop,
          triggerEvent,
          useContextMenu: this.options.useContextMenu
        });
        this.dataLoader = dataLoader;
        this.dndHandler = dndHandler;
        this.keyHandler = keyHandler;
        this.mouseHandler = mouseHandler;
        this.renderer = renderer;
        this.saveStateHandler = saveStateHandler;
        this.scrollHandler = scrollHandler;
        this.selectNodeHandler = selectNodeHandler;
      }
      createFolderElement(node) {
        const closedIconElement = this.renderer.closedIconElement;
        const getScrollLeft = this.scrollHandler.getScrollLeft.bind(this.scrollHandler);
        const openedIconElement = this.renderer.openedIconElement;
        const tabIndex = this.options.tabIndex;
        const $treeElement = this.element;
        const triggerEvent = this.triggerEvent.bind(this);
        return new FolderElement({
          closedIconElement,
          getScrollLeft,
          node,
          openedIconElement,
          tabIndex,
          $treeElement,
          triggerEvent
        });
      }
      createNodeElement(node) {
        const getScrollLeft = this.scrollHandler.getScrollLeft.bind(this.scrollHandler);
        const tabIndex = this.options.tabIndex;
        const $treeElement = this.element;
        return new NodeElement({
          getScrollLeft,
          node,
          tabIndex,
          $treeElement
        });
      }
      openParents(node) {
        const parent = node.parent;
        if (parent && parent.parent && !parent.is_open) {
          this.openNode(parent, false);
        }
      }
    }
    SimpleWidget.register(JqTreeWidget, "tree");

    exports.JqTreeWidget = JqTreeWidget;

    return exports;

})({});
//# sourceMappingURL=tree.jquery.debug.js.map
