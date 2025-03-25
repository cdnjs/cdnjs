/*
JqTree 1.8.8

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
      addLoadingClass(element) {
        element.classList.add("jqtree-loading");
      }
      getDomElement(parentNode) {
        if (parentNode?.element) {
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
          $el,
          isLoading,
          node
        });
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
      removeLoadingClass(element) {
        element.classList.remove("jqtree-loading");
      }
      submitRequest(urlInfoInput, handleSuccess, handleError) {
        const urlInfo = typeof urlInfoInput === "string" ? {
          url: urlInfoInput
        } : urlInfoInput;
        const ajaxSettings = {
          cache: false,
          dataType: "json",
          error: handleError,
          method: "GET",
          success: handleSuccess,
          ...urlInfo
        };
        ajaxSettings.method = ajaxSettings.method?.toUpperCase() ?? "GET";
        void jQuery.ajax(ajaxSettings);
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
    }

    let Position = /*#__PURE__*/function (Position) {
      Position[Position["Before"] = 1] = "Before";
      Position[Position["After"] = 2] = "After";
      Position[Position["Inside"] = 3] = "Inside";
      Position[Position["None"] = 4] = "None";
      return Position;
    }({});
    const positionNames = {
      after: Position.After,
      before: Position.Before,
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
      move(pageX, pageY) {
        this.element.style.left = `${pageX - this.offsetX}px`;
        this.element.style.top = `${pageY - this.offsetY}px`;
      }
      remove() {
        this.element.remove();
      }
    }

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
          node,
          position,
          top
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
        if (node !== currentNode && node.element) {
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
            bottom: areaTop + areaHeight,
            node: position.node,
            position: position.position,
            top: areaTop
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
      clear() {
        if (this.dragElement) {
          this.dragElement.remove();
          this.dragElement = null;
        }
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
      generateHitAreas() {
        const tree = this.getTree();
        if (!this.currentItem || !tree) {
          this.hitAreas = [];
        } else {
          this.hitAreas = generateHitAreas(tree, this.currentItem.node, this.getTreeDimensions().bottom);
        }
      }
      getTreeDimensions() {
        // Return the dimensions of the tree. Add a margin to the bottom to allow
        // to drag-and-drop after the last element.
        const treePosition = getElementPosition(this.treeElement);
        const left = treePosition.left + this.getScrollLeft();
        const top = treePosition.top;
        return {
          bottom: top + this.treeElement.clientHeight + 16,
          left,
          right: left + this.treeElement.clientWidth,
          top
        };
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
              do_move: doMove,
              moved_node: movedNode,
              original_event: positionInfo.originalEvent,
              position: getPositionName(position),
              previous_parent: previousParent,
              target_node: targetNode
            }
          });
          if (!event.isDefaultPrevented()) {
            doMove();
          }
        }
      }
      mustCaptureElement(element) {
        const nodeName = element.nodeName;
        return nodeName !== "INPUT" && nodeName !== "SELECT" && nodeName !== "TEXTAREA";
      }
      mustOpenFolderTimer(area) {
        const node = area.node;
        return node.isFolder() && !node.is_open && area.position === Position.Inside;
      }
      removeDropHint() {
        if (this.previousGhost) {
          this.previousGhost.remove();
        }
      }
      removeHitAreas() {
        this.hitAreas = [];
      }
      removeHover() {
        this.hoveredArea = null;
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
    }

    class ElementsRenderer {
      constructor(_ref) {
        let {
          $element,
          autoEscape,
          buttonLeft,
          closedIcon,
          dragAndDrop,
          getTree,
          isNodeSelected,
          onCreateLi,
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
        this.openedIconElement = this.createButtonElement(openedIcon ?? "+");
        this.closedIconElement = this.createButtonElement(closedIcon ?? "-");
      }
      attachNodeData(node, li) {
        node.element = li;
        jQuery(li).data("node", node);
      }
      createButtonElement(value) {
        if (typeof value === "string") {
          // convert value to html
          const div = document.createElement("div");
          div.innerHTML = value;
          return document.createTextNode(div.innerHTML);
        } else if (value.nodeType) {
          return value;
        } else {
          return jQuery(value)[0];
        }
      }
      createDomElements(element, children, isRootNode, level) {
        const ul = this.createUl(isRootNode);
        element.appendChild(ul);
        for (const child of children) {
          const li = this.createLi(child, level);
          ul.appendChild(li);
          if (child.hasChildren()) {
            this.createDomElements(li, child.children, false, level + 1);
          }
        }
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

      /* Create the <li> element
       * Attach it to node.element.
       * Call onCreateLi
       */
      createLi(node, level) {
        const isSelected = Boolean(this.isNodeSelected(node));
        const mustShowFolder = node.isFolder() || node.isEmptyFolder && this.showEmptyFolder;
        const li = mustShowFolder ? this.createFolderLi(node, level, isSelected) : this.createNodeLi(node, level, isSelected);
        this.attachNodeData(node, li);
        if (this.onCreateLi) {
          this.onCreateLi(node, jQuery(li), isSelected);
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
      setTreeItemAriaAttributes(element, name, level, isSelected) {
        element.setAttribute("aria-label", name);
        element.setAttribute("aria-level", `${level}`);
        element.setAttribute("aria-selected", getBoolString(isSelected));
        element.setAttribute("role", "treeitem");
      }
      render(fromNode) {
        if (fromNode?.parent) {
          this.renderFromNode(fromNode);
        } else {
          this.renderFromRoot();
        }
      }
      renderFromNode(node) {
        if (!node.element) {
          return;
        }

        // remember current li
        const $previousLi = jQuery(node.element);

        // create element
        const li = this.createLi(node, node.getLevel());

        // add element to dom
        $previousLi.after(li);

        // remove previous li
        $previousLi.remove();

        // create children
        this.createDomElements(li, node.children, false, node.getLevel() + 1);
      }
      renderFromRoot() {
        this.$element.empty();
        const tree = this.getTree();
        if (this.$element[0] && tree) {
          this.createDomElements(this.$element[0], tree.children, true, 1);
        }
      }
    }

    class KeyHandler {
      handleKeyDown = e => {
        if (!this.canHandleKeyboard()) {
          return;
        }
        let isKeyHandled = false;
        const selectedNode = this.getSelectedNode();
        if (selectedNode) {
          switch (e.key) {
            case "ArrowDown":
              isKeyHandled = this.moveDown(selectedNode);
              break;
            case "ArrowLeft":
              isKeyHandled = this.moveLeft(selectedNode);
              break;
            case "ArrowRight":
              isKeyHandled = this.moveRight(selectedNode);
              break;
            case "ArrowUp":
              isKeyHandled = this.moveUp(selectedNode);
              break;
          }
        }
        if (isKeyHandled) {
          e.preventDefault();
        }
      };
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
          document.addEventListener("keydown", this.handleKeyDown);
        }
      }
      canHandleKeyboard() {
        return this.keyboardSupport && this.isFocusOnTree();
      }
      moveLeft(selectedNode) {
        if (selectedNode.isFolder() && selectedNode.is_open) {
          // Left on an open node closes the node
          this.closeNode(selectedNode);
          return true;
        } else {
          // Left on a closed or end node moves focus to the node's parent
          return this.selectNode(selectedNode.getParent());
        }
      }
      moveRight(selectedNode) {
        if (!selectedNode.isFolder()) {
          return false;
        } else {
          // folder node
          if (selectedNode.is_open) {
            // Right moves to the first child of an open node
            return this.selectNode(selectedNode.getNextVisibleNode());
          } else {
            // Right expands a closed node
            this.openNode(selectedNode);
            return true;
          }
        }
      }

      /* Select the node.
       * Don't do anything if the node is null.
       * Result: a different node was selected.
       */
      selectNode(node) {
        if (!node) {
          return false;
        } else {
          this.originalSelectNode(node);
          return true;
        }
      }
      deinit() {
        if (this.keyboardSupport) {
          document.removeEventListener("keydown", this.handleKeyDown);
        }
      }
      moveDown(selectedNode) {
        return this.selectNode(selectedNode.getNextVisibleNode());
      }
      moveUp(selectedNode) {
        return this.selectNode(selectedNode.getPreviousVisibleNode());
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
      handleClick = e => {
        if (!e.target) {
          return;
        }
        const clickTarget = this.getClickTarget(e.target);
        if (!clickTarget) {
          return;
        }
        switch (clickTarget.type) {
          case "button":
            this.onClickButton(clickTarget.node);
            e.preventDefault();
            e.stopPropagation();
            break;
          case "label":
            {
              const event = this.triggerEvent("tree.click", {
                click_event: e,
                node: clickTarget.node
              });
              if (!event.isDefaultPrevented()) {
                this.onClickTitle(clickTarget.node);
              }
              break;
            }
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
              click_event: e,
              node
            });
            return false;
          }
        }
        return null;
      };
      handleDblclick = e => {
        if (!e.target) {
          return;
        }
        const clickTarget = this.getClickTarget(e.target);
        if (clickTarget?.type === "label") {
          this.triggerEvent("tree.dblclick", {
            click_event: e,
            node: clickTarget.node
          });
        }
      };
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
      mouseMove = e => {
        this.handleMouseMove(e, getPositionInfoFromMouseEvent(e));
      };
      mouseUp = e => {
        this.handleMouseUp(getPositionInfoFromMouseEvent(e));
      };
      touchEnd = e => {
        if (e.touches.length > 1) {
          return;
        }
        const touch = e.touches[0];
        if (!touch) {
          return;
        }
        this.handleMouseUp(getPositionInfoFromTouch(touch, e));
      };
      touchMove = e => {
        if (e.touches.length > 1) {
          return;
        }
        const touch = e.touches[0];
        if (!touch) {
          return;
        }
        this.handleMouseMove(e, getPositionInfoFromTouch(touch, e));
      };
      touchStart = e => {
        if (e.touches.length > 1) {
          return;
        }
        const touch = e.touches[0];
        if (!touch) {
          return;
        }
        this.handleMouseDown(getPositionInfoFromTouch(touch, e));
      };
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
      getClickTarget(element) {
        const button = element.closest(".jqtree-toggler");
        if (button) {
          const node = this.getNode(button);
          if (node) {
            return {
              node,
              type: "button"
            };
          }
        } else {
          const jqTreeElement = element.closest(".jqtree-element");
          if (jqTreeElement) {
            const node = this.getNode(jqTreeElement);
            if (node) {
              return {
                node,
                type: "label"
              };
            }
          }
        }
        return null;
      }
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
          this.isMouseStarted = this.onMouseStart(this.mouseDownInfo);
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
      handleMouseUp(positionInfo) {
        this.removeMouseMoveEventListeners();
        this.isMouseDelayMet = false;
        this.mouseDownInfo = null;
        if (this.isMouseStarted) {
          this.isMouseStarted = false;
          this.onMouseStop(positionInfo);
        }
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
      removeMouseMoveEventListeners() {
        document.removeEventListener("mousemove", this.mouseMove);
        document.removeEventListener("touchmove", this.touchMove);
        document.removeEventListener("mouseup", this.mouseUp);
        document.removeEventListener("touchend", this.touchEnd);
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
    }

    const isNodeRecordWithChildren = data => typeof data === "object" && "children" in data && data.children instanceof Array;

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
      createNode(nodeData) {
        const nodeClass = this.getNodeClass();
        return new nodeClass(nodeData);
      }
      doRemoveChild(node) {
        this.children.splice(this.getChildIndex(node), 1);
        this.tree?.removeNodeFromIndex(node);
      }
      getNodeClass() {
        return this.nodeClass ?? this.tree?.nodeClass ?? Node;
      }

      // Load children data from nodeInfo if it has children
      loadChildrenFromData(nodeInfo) {
        if (isNodeRecordWithChildren(nodeInfo) && nodeInfo.children.length) {
          this.loadFromData(nodeInfo.children);
        }
      }
      setParent(parent) {
        this.parent = parent;
        this.tree = parent.tree;
        this.tree?.addNodeToIndex(this);
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
      addNodeToIndex(node) {
        if (node.id != null) {
          this.idMapping.set(node.id, node);
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
      append(nodeInfo) {
        const node = this.createNode(nodeInfo);
        this.addChild(node);
        node.loadChildrenFromData(nodeInfo);
        return node;
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

      /*
      Get child index.
       var index = getChildIndex(node);
      */
      getChildIndex(node) {
        return this.children.indexOf(node);
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
              tmpNode.children = getDataFromNodes(node.children);
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
            return lastChild.getLastChild();
          }
        }
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
      getNextNode() {
        let includeChildren = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        if (includeChildren && this.hasChildren()) {
          return this.children[0] ?? null;
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
      getNextSibling() {
        if (!this.parent) {
          return null;
        } else {
          const nextIndex = this.parent.getChildIndex(this) + 1;
          if (nextIndex < this.parent.children.length) {
            return this.parent.children[nextIndex] ?? null;
          } else {
            return null;
          }
        }
      }
      getNextVisibleNode() {
        if (this.hasChildren() && this.is_open) {
          // First child
          return this.children[0] ?? null;
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
      getNodeById(nodeId) {
        return this.idMapping.get(nodeId) ?? null;
      }
      getNodeByName(name) {
        return this.getNodeByCallback(node => node.name === name);
      }
      getNodeByNameMustExist(name) {
        const node = this.getNodeByCallback(n => n.name === name);
        if (!node) {
          throw new Error(`Node with name ${name} not found`);
        }
        return node;
      }
      getNodesByProperty(key, value) {
        return this.filter(node => node[key] === value);
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
      getPreviousSibling() {
        if (!this.parent) {
          return null;
        } else {
          const previousIndex = this.parent.getChildIndex(this) - 1;
          if (previousIndex >= 0) {
            return this.parent.children[previousIndex] ?? null;
          } else {
            return null;
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

      /*
      Does the tree have children?
       if (tree.hasChildren()) {
          //
      }
      */
      hasChildren() {
        return this.children.length !== 0;
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
      isFolder() {
        return this.hasChildren() || this.load_on_demand;
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
          for (const child of node.children) {
            const result = callback(child, level);
            if (result && child.hasChildren()) {
              _iterate(child, level + 1);
            }
          }
        };
        _iterate(this, 0);
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
      prepend(nodeInfo) {
        const node = this.createNode(nodeInfo);
        this.addChildAtPosition(node, 0);
        node.loadChildrenFromData(nodeInfo);
        return node;
      }
      remove() {
        if (this.parent) {
          this.parent.removeChild(this);
          this.parent = null;
        }
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
      removeChildren() {
        this.iterate(child => {
          this.tree?.removeNodeFromIndex(child);
          return true;
        });
        this.children = [];
      }
      removeNodeFromIndex(node) {
        if (node.id != null) {
          this.idMapping.delete(node.id);
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
      constructor(node, element, position) {
        this.element = element;
        this.node = node;
        this.ghost = this.createGhostElement();
        switch (position) {
          case Position.After:
            this.moveAfter();
            break;
          case Position.Before:
            this.moveBefore();
            break;
          case Position.Inside:
            {
              if (node.isFolder() && node.is_open) {
                this.moveInsideOpenFolder();
              } else {
                this.moveInside();
              }
            }
        }
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
      moveAfter() {
        this.element.after(this.ghost);
      }
      moveBefore() {
        this.element.before(this.ghost);
      }
      moveInside() {
        this.element.after(this.ghost);
        this.ghost.classList.add("jqtree-inside");
      }
      moveInsideOpenFolder() {
        const childElement = this.node.children[0]?.element;
        if (childElement) {
          childElement.before(this.ghost);
        }
      }
      remove() {
        this.ghost.remove();
      }
    }

    class NodeElement {
      constructor(_ref) {
        let {
          getScrollLeft,
          node,
          tabIndex,
          treeElement
        } = _ref;
        this.getScrollLeft = getScrollLeft;
        this.tabIndex = tabIndex;
        this.treeElement = treeElement;
        this.init(node);
      }
      getTitleSpan() {
        return this.element.querySelector(":scope > .jqtree-element > span.jqtree-title");
      }
      getUl() {
        return this.element.querySelector(":scope > ul");
      }
      mustShowBorderDropHint(position) {
        return position === Position.Inside;
      }
      addDropHint(position) {
        if (this.mustShowBorderDropHint(position)) {
          return new BorderDropHint(this.element, this.getScrollLeft());
        } else {
          return new GhostDropHint(this.node, this.element, position);
        }
      }
      deselect() {
        this.element.classList.remove("jqtree-selected");
        const titleSpan = this.getTitleSpan();
        titleSpan.removeAttribute("tabindex");
        titleSpan.setAttribute("aria-selected", "false");
        titleSpan.blur();
      }
      init(node) {
        this.node = node;
        if (!node.element) {
          node.element = this.treeElement;
        }
        this.element = node.element;
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
    }

    class FolderElement extends NodeElement {
      constructor(_ref) {
        let {
          closedIconElement,
          getScrollLeft,
          node,
          openedIconElement,
          tabIndex,
          treeElement,
          triggerEvent
        } = _ref;
        super({
          getScrollLeft,
          node,
          tabIndex,
          treeElement
        });
        this.closedIconElement = closedIconElement;
        this.openedIconElement = openedIconElement;
        this.triggerEvent = triggerEvent;
      }
      mustShowBorderDropHint(position) {
        return !this.node.is_open && position === Position.Inside;
      }
      getButton() {
        return this.element.querySelector(":scope > .jqtree-element > a.jqtree-toggler");
      }
      close(slide, animationSpeed) {
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
      open(onFinished, slide, animationSpeed) {
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
      getKeyName() {
        if (typeof this.saveStateOption === "string") {
          return this.saveStateOption;
        } else {
          return "tree";
        }
      }
      loadFromStorage() {
        if (this.onGetStateFromStorage) {
          return this.onGetStateFromStorage();
        } else {
          return localStorage.getItem(this.getKeyName());
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
      parseState(jsonData) {
        const state = JSON.parse(jsonData);

        // Check if selected_node is an int (instead of an array)
        if (state.selected_node && isInt(state.selected_node)) {
          // Convert to array
          state.selected_node = [state.selected_node];
        }
        return state;
      }
      resetSelection() {
        const selectedNodes = this.getSelectedNodes();
        selectedNodes.forEach(node => {
          this.removeFromSelection(node);
        });
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
      getNodeIdToBeSelected() {
        const state = this.getStateFromStorage();
        if (state?.selected_node) {
          return state.selected_node[0] ?? null;
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
      getStateFromStorage() {
        const jsonData = this.loadFromStorage();
        if (jsonData) {
          return this.parseState(jsonData);
        } else {
          return null;
        }
      }
      saveState() {
        const state = JSON.stringify(this.getState());
        if (this.onSetStateFromStorage) {
          this.onSetStateFromStorage(state);
        } else {
          localStorage.setItem(this.getKeyName(), state);
        }
      }

      /*
      Set initial state
      Don't handle nodes that are loaded on demand
       result: must load on demand (boolean)
      */
      setInitialState(state) {
        let mustLoadOnDemand = false;
        if (state.open_nodes) {
          mustLoadOnDemand = this.openInitialNodes(state.open_nodes);
        }
        this.resetSelection();
        if (state.selected_node) {
          this.selectInitialNodes(state.selected_node);
        }
        return mustLoadOnDemand;
      }
      setInitialStateOnDemand(state, cbFinished) {
        let loadingCount = 0;
        let nodeIds = state.open_nodes;
        const openNodes = () => {
          if (!nodeIds) {
            return;
          }
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
          if (state.selected_node) {
            if (this.selectInitialNodes(state.selected_node)) {
              this.refreshElements(null);
            }
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
      getScrollParentBottom() {
        if (this.scrollParentBottom == null) {
          this.scrollParentBottom = this.getScrollParentTop() + this.container.clientHeight;
        }
        return this.scrollParentBottom;
      }
      getScrollParentTop() {
        if (this.scrollParentTop == null) {
          this.scrollParentTop = getOffsetTop(this.container);
        }
        return this.scrollParentTop;
      }
      scrollHorizontally() {
        if (!this.horizontalScrollDirection) {
          return;
        }
        const distance = this.horizontalScrollDirection === "left" ? -20 : 20;
        this.container.scrollBy({
          behavior: "instant",
          left: distance,
          top: 0
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
          behavior: "instant",
          left: 0,
          top: distance
        });
        this.refreshHitAreas();
        setTimeout(this.scrollVertically.bind(this), 40);
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
      canScrollDown() {
        const documentElement = document.documentElement;
        return documentElement.scrollTop + documentElement.clientHeight < this.getDocumentScrollHeight();
      }
      canScrollRight() {
        const documentElement = document.documentElement;
        return documentElement.scrollLeft + documentElement.clientWidth < this.getDocumentScrollWidth();
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
      getNewVerticalScrollDirection(pageY) {
        const scrollTop = jQuery(document).scrollTop() ?? 0;
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
          behavior: "instant",
          left: distance,
          top: 0
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
          behavior: "instant",
          left: 0,
          top: distance
        });
        this.refreshHitAreas();
        setTimeout(this.scrollVertically.bind(this), 40);
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
      checkHorizontalScrolling(positionInfo) {
        this.getScrollParent().checkHorizontalScrolling(positionInfo.pageX);
      }
      checkVerticalScrolling(positionInfo) {
        this.getScrollParent().checkVerticalScrolling(positionInfo.pageY);
      }
      getScrollParent() {
        if (!this.scrollParent) {
          this.scrollParent = createScrollParent(this.treeElement, this.refreshHitAreas);
        }
        return this.scrollParent;
      }
      checkScrolling(positionInfo) {
        this.checkVerticalScrolling(positionInfo);
        this.checkHorizontalScrolling(positionInfo);
      }
      getScrollLeft() {
        return this.getScrollParent().getScrollLeft();
      }
      scrollToY(top) {
        this.getScrollParent().scrollToY(top);
      }
      stopScrolling() {
        this.getScrollParent().stopScrolling();
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
      addToSelection(node) {
        if (node.id != null) {
          this.selectedNodes.add(node.id);
        } else {
          this.selectedSingleNode = node;
        }
      }
      clear() {
        this.selectedNodes.clear();
        this.selectedSingleNode = null;
      }
      getSelectedNode() {
        const selectedNodes = this.getSelectedNodes();
        if (selectedNodes.length) {
          return selectedNodes[0] ?? false;
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
          this.selectedNodes.forEach(id => {
            const node = this.getNodeById(id);
            if (node && parent.isParentOf(node)) {
              selectedNodes.push(node);
            }
          });
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
            destroyWidget(this);
            return undefined;
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
      static defaults = {};
      constructor(el, options) {
        this.$el = jQuery(el);

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const defaults = this.constructor.defaults;
        this.options = {
          ...defaults,
          ...options
        };
      }
      static register(widgetClass, widgetName) {
        register(widgetClass, widgetName);
      }
      deinit() {
        //
      }
      destroy() {
        this.deinit();
      }
      init() {
        //
      }
    }

    const version = "1.8.8";

    const NODE_PARAM_IS_EMPTY = "Node parameter is empty";
    const PARAM_IS_EMPTY = "Parameter is empty: ";
    class JqTreeWidget extends SimpleWidget {
      static defaults = (() => ({
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
      }))();
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
          $element: $treeElement,
          autoEscape,
          buttonLeft,
          closedIcon,
          dragAndDrop,
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
      containsElement(element) {
        const node = this.getNode(element);
        return node != null && node.tree === this.tree;
      }
      createFolderElement(node) {
        const closedIconElement = this.renderer.closedIconElement;
        const getScrollLeft = this.scrollHandler.getScrollLeft.bind(this.scrollHandler);
        const openedIconElement = this.renderer.openedIconElement;
        const tabIndex = this.options.tabIndex;
        const treeElement = this.element.get(0);
        const triggerEvent = this.triggerEvent.bind(this);
        return new FolderElement({
          closedIconElement,
          getScrollLeft,
          node,
          openedIconElement,
          tabIndex,
          treeElement,
          triggerEvent
        });
      }
      createNodeElement(node) {
        const getScrollLeft = this.scrollHandler.getScrollLeft.bind(this.scrollHandler);
        const tabIndex = this.options.tabIndex;
        const treeElement = this.element.get(0);
        return new NodeElement({
          getScrollLeft,
          node,
          tabIndex,
          treeElement
        });
      }
      deselectCurrentNode() {
        const node = this.getSelectedNode();
        if (node) {
          this.removeFromSelection(node);
        }
      }
      deselectNodes(parentNode) {
        const selectedNodesUnderParent = this.selectNodeHandler.getSelectedNodesUnder(parentNode);
        for (const n of selectedNodesUnderParent) {
          this.selectNodeHandler.removeFromSelection(n);
        }
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
          parent_node: parentNode,
          tree_data: data
        });
      }
      doLoadDataFromUrl(urlInfoParam, parentNode, onFinished) {
        const urlInfo = urlInfoParam ?? this.getDataUrlInfo(parentNode);
        this.dataLoader.loadFromUrl(urlInfo, parentNode, onFinished);
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
          ...(optionsParam ?? {})
        };
        const canSelect = () => {
          if (this.options.onCanSelectNode) {
            return this.options.selectable && this.options.onCanSelectNode(node);
          } else {
            return this.options.selectable;
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
            deselected_node: deselectedNode,
            node
          });
          this.openParents(node);
        }
        saveState();
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
      getDataUrlInfo(node) {
        const dataUrl = this.options.dataUrl ?? this.element.data("url");
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
            urlInfo.data = data;
          } else {
            // Add selected_node parameter
            const selectedNodeId = this.getNodeIdToBeSelected();
            if (selectedNodeId) {
              const data = {
                selected_node: selectedNodeId
              };
              urlInfo.data = data;
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
      getDefaultClosedIcon() {
        if (this.options.rtl) {
          // triangle to the left
          return "&#x25c0;";
        } else {
          // triangle to the right
          return "&#x25ba;";
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
      getNodeElement(element) {
        const node = this.getNode(element);
        if (node) {
          return this.getNodeElementForNode(node);
        } else {
          return null;
        }
      }
      getNodeElementForNode(node) {
        if (node.isFolder()) {
          return this.createFolderElement(node);
        } else {
          return this.createNodeElement(node);
        }
      }
      getNodeIdToBeSelected() {
        if (this.options.saveState) {
          return this.saveStateHandler.getNodeIdToBeSelected();
        } else {
          return null;
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
      initTree(data) {
        const doInit = () => {
          if (!this.isInitialized) {
            this.isInitialized = true;
            this.triggerEvent("tree.init");
          }
        };
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
      isFocusOnTree() {
        const activeElement = document.activeElement;
        return Boolean(activeElement && activeElement.tagName === "SPAN" && this.containsElement(activeElement));
      }
      isSelectedNodeInSubtree(subtree) {
        const selectedNode = this.getSelectedNode();
        if (!selectedNode) {
          return false;
        } else {
          return subtree === selectedNode || subtree.isParentOf(selectedNode);
        }
      }
      loadFolderOnDemand(node) {
        let slide = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        let onFinished = arguments.length > 2 ? arguments[2] : undefined;
        node.is_loading = true;
        this.doLoadDataFromUrl(null, node, () => {
          this.openNodeInternal(node, slide, onFinished);
        });
      }
      loadSubtree(data, parentNode) {
        parentNode.loadFromData(data);
        parentNode.load_on_demand = false;
        parentNode.is_loading = false;
        this.refreshElements(parentNode);
      }
      mouseCapture(positionInfo) {
        if (this.options.dragAndDrop) {
          return this.dndHandler.mouseCapture(positionInfo);
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
      mouseStart(positionInfo) {
        if (this.options.dragAndDrop) {
          return this.dndHandler.mouseStart(positionInfo);
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
      openNodeInternal(node) {
        let slide = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        let onFinished = arguments.length > 2 ? arguments[2] : undefined;
        const doOpenNode = (_node, _slide, _onFinished) => {
          if (!node.children.length) {
            return;
          }
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
      openParents(node) {
        const parent = node.parent;
        if (parent?.parent && !parent.is_open) {
          this.openNode(parent, false);
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
      saveState() {
        if (this.options.saveState) {
          this.saveStateHandler.saveState();
        }
      }
      selectCurrentNode(mustSetFocus) {
        const node = this.getSelectedNode();
        if (node) {
          const nodeElement = this.getNodeElementForNode(node);
          nodeElement.select(mustSetFocus);
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
      triggerEvent(eventName, values) {
        const event = jQuery.Event(eventName, values);
        this.element.trigger(event);
        return event;
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
      addToSelection(node, mustSetFocus) {
        if (!node) {
          throw Error(NODE_PARAM_IS_EMPTY);
        }
        this.selectNodeHandler.addToSelection(node);
        this.openParents(node);
        this.getNodeElementForNode(node).select(mustSetFocus ?? true);
        this.saveState();
        return this.element;
      }
      appendNode(newNodeInfo, parentNodeParam) {
        const parentNode = parentNodeParam ?? this.tree;
        const node = parentNode.append(newNodeInfo);
        this.refreshElements(parentNode);
        return node;
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
      deinit() {
        this.element.empty();
        this.element.off();
        this.keyHandler.deinit();
        this.mouseHandler.deinit();
        this.tree = new Node({}, true);
        super.deinit();
      }
      getNodeByCallback(callback) {
        return this.tree.getNodeByCallback(callback);
      }
      getNodeByHtmlElement(inputElement) {
        const element = inputElement instanceof HTMLElement ? inputElement : inputElement[0];
        if (!element) {
          return null;
        }
        return this.getNode(element);
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
      getSelectedNode() {
        return this.selectNodeHandler.getSelectedNode();
      }
      getSelectedNodes() {
        return this.selectNodeHandler.getSelectedNodes();
      }
      getState() {
        return this.saveStateHandler.getState();
      }
      getStateFromStorage() {
        return this.saveStateHandler.getStateFromStorage();
      }
      getTree() {
        return this.tree;
      }
      getVersion() {
        return version;
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
      isDragging() {
        return this.dndHandler.isDragging;
      }
      isNodeSelected(node) {
        if (!node) {
          throw Error(NODE_PARAM_IS_EMPTY);
        }
        return this.selectNodeHandler.isNodeSelected(node);
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
      moveDown() {
        const selectedNode = this.getSelectedNode();
        if (selectedNode) {
          this.keyHandler.moveDown(selectedNode);
        }
        return this.element;
      }
      moveNode(node, targetNode, position) {
        if (!node) {
          throw Error(NODE_PARAM_IS_EMPTY);
        }
        if (!targetNode) {
          throw Error(PARAM_IS_EMPTY + "targetNode");
        }
        if (!position) {
          throw Error(PARAM_IS_EMPTY + "position");
        }
        const positionIndex = getPosition(position);
        if (positionIndex !== undefined) {
          this.tree.moveNode(node, targetNode, positionIndex);
          this.refreshElements(null);
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
            slide = this.options.slide;
          }
          return [slide, onFinished];
        };
        const [slide, onFinished] = parseParams();
        this.openNodeInternal(node, slide, onFinished);
        return this.element;
      }
      prependNode(newNodeInfo, parentNodeParam) {
        const parentNode = parentNodeParam ?? this.tree;
        const node = parentNode.prepend(newNodeInfo);
        this.refreshElements(parentNode);
        return node;
      }
      refresh() {
        this.refreshElements(null);
        return this.element;
      }
      refreshHitAreas() {
        this.dndHandler.refresh();
        return this.element;
      }
      reload(onFinished) {
        this.doLoadDataFromUrl(null, null, onFinished);
        return this.element;
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
      scrollToNode(node) {
        if (!node) {
          throw Error(NODE_PARAM_IS_EMPTY);
        }
        if (!node.element) {
          return this.element;
        }
        const top = getOffsetTop(node.element) - getOffsetTop(this.$el.get(0));
        this.scrollHandler.scrollToY(top);
        return this.element;
      }
      selectNode(node, optionsParam) {
        this.doSelectNode(node, optionsParam);
        return this.element;
      }
      setOption(option, value) {
        this.options[option] = value;
        return this.element;
      }
      setState(state) {
        if (state) {
          this.saveStateHandler.setInitialState(state);
          this.refreshElements(null);
        }
        return this.element;
      }
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
      toJson() {
        return JSON.stringify(this.tree.getData());
      }
      updateNode(node, data) {
        if (!node) {
          throw Error(NODE_PARAM_IS_EMPTY);
        }
        if (!data) {
          return this.element;
        }
        const idIsChanged = typeof data === "object" && data.id && data.id !== node.id;
        if (idIsChanged) {
          this.tree.removeNodeFromIndex(node);
        }
        node.setData(data);
        if (idIsChanged) {
          this.tree.addNodeToIndex(node);
        }
        if (typeof data === "object" && data.children && data.children instanceof Array) {
          node.removeChildren();
          if (data.children.length) {
            node.loadFromData(data.children);
          }
        }
        this.refreshElements(node);
        return this.element;
      }
    }
    SimpleWidget.register(JqTreeWidget, "tree");

    exports.JqTreeWidget = JqTreeWidget;

    return exports;

})({});
//# sourceMappingURL=tree.jquery.debug.js.map
