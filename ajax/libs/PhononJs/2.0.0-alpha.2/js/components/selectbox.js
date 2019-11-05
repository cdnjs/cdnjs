/*!
  * Selectbox v2.0.0-alpha.1 (https://phonon-framework.github.io)
  * Copyright 2015-2019 qathom
  * Licensed under MIT (https://github.com/phonon-framework/phonon/blob/master/LICENSE.md)
  */
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Util = _interopDefault(require('../util.js'));

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var Component = function () {
  function Component(name, defaultProps, props) {
    var _this = this;

    this.template = '';
    this.id = null;
    this.eventHandlers = [];
    this.registeredElements = [];
    this.name = name;
    var element = typeof props.element === 'string' ? document.querySelector(props.element) : props.element;
    var config = {};

    if (element) {
      var dataConfig = Util.Selector.attrConfig(element);

      if (dataConfig) {
        config = dataConfig;
      }
    }

    this.defaultProps = defaultProps;
    this.props = Object.assign(defaultProps, config, props, {
      element: element
    });
    this.id = this.uid();

    this.elementListener = function (event) {
      return _this.onBeforeElementEvent(event);
    };

    this.setEventsHandler();
  }

  Component.prototype.setTemplate = function (template) {
    this.template = template;
  };

  Component.prototype.getTemplate = function () {
    return this.template;
  };

  Component.prototype.getElement = function () {
    return this.getProp('element') || null;
  };

  Component.prototype.setElement = function (element) {
    this.props.element = element;
  };

  Component.prototype.getId = function () {
    return this.id;
  };

  Component.prototype.uid = function () {
    return Math.random().toString(36).substr(2, 10);
  };

  Component.prototype.getName = function () {
    return this.name;
  };

  Component.prototype.getProps = function () {
    return this.props;
  };

  Component.prototype.getProp = function (name) {
    var defaultValue = this.defaultProps[name];
    return typeof this.props[name] !== 'undefined' ? this.props[name] : defaultValue;
  };

  Component.prototype.setProps = function (props) {
    var componentProps = Object.assign({}, props);
    this.props = Object.assign(this.props, componentProps);
  };

  Component.prototype.setProp = function (name, value) {
    if (typeof this.props[name] === 'undefined') {
      throw new Error('Cannot set an invalid prop');
    }

    this.props[name] = value;
  };

  Component.prototype.registerElements = function (elements) {
    var _this = this;

    elements.forEach(function (element) {
      return _this.registerElement(element);
    });
  };

  Component.prototype.registerElement = function (element) {
    element.target.addEventListener(element.event, this.elementListener);
    this.registeredElements.push(element);
  };

  Component.prototype.unregisterElements = function () {
    var _this = this;

    this.registeredElements.forEach(function (element) {
      _this.unregisterElement(element);
    });
  };

  Component.prototype.unregisterElement = function (element) {
    var registeredElementIndex = this.registeredElements.findIndex(function (el) {
      return el.target === element.target && el.event === element.event;
    });

    if (registeredElementIndex > -1) {
      element.target.removeEventListener(element.event, this.elementListener);
      this.registeredElements.splice(registeredElementIndex, 1);
    } else {
      console.error('Warning! Could not remove element:' + ' ' + (element.target + " with event: " + element.event + "."));
    }
  };

  Component.prototype.triggerEvent = function (eventName, detail, objectEventOnly) {
    var _this = this;

    if (detail === void 0) {
      detail = {};
    }

    if (objectEventOnly === void 0) {
      objectEventOnly = false;
    }

    var eventNameObject = eventName.split('.').reduce(function (acc, current, index) {
      if (index === 0) {
        return current;
      }

      return acc + current.charAt(0).toUpperCase() + current.slice(1);
    });
    var eventNameAlias = "on" + eventNameObject.charAt(0).toUpperCase() + eventNameObject.slice(1);
    var props = this.getProps();
    this.eventHandlers.forEach(function (scope) {
      if (typeof scope[eventNameObject] === 'function') {
        scope[eventNameObject].apply(_this, [detail]);
      }

      if (typeof scope[eventNameAlias] === 'function') {
        props[eventNameAlias].apply(_this, [detail]);
      }
    });

    if (objectEventOnly) {
      return;
    }

    var element = this.getElement();

    if (element) {
      Util.Dispatch.elementEvent(element, eventName, this.name, detail);
    } else {
      Util.Dispatch.winDocEvent(eventName, this.name, detail);
    }
  };

  Component.prototype.preventClosable = function () {
    return false;
  };

  Component.prototype.destroy = function () {
    this.unregisterElements();
  };

  Component.prototype.onElementEvent = function (event) {};

  Component.prototype.setEventsHandler = function () {
    var props = this.getProps();
    var scope = Object.keys(props).reduce(function (cur, key) {
      if (typeof props[key] === 'function') {
        cur[key] = props[key];
      }

      return cur;
    }, {});

    if (Object.keys(scope).length > 0) {
      this.eventHandlers.push(scope);
    }
  };

  Component.prototype.onBeforeElementEvent = function (event) {
    if (this.preventClosable()) {
      return;
    }

    this.onElementEvent(event);
  };

  return Component;
}();

var Selectbox = function (_super) {
  __extends(Selectbox, _super);

  function Selectbox(props) {
    var _this = _super.call(this, 'selectbox', {
      name: null,
      selectable: true,
      filterItems: null,
      multiple: false,
      tag: false
    }, props) || this;

    if (!_this.getProp('name')) {
      var hiddenInput = _this.getElement().querySelector('input[type="hidden"]');

      if (hiddenInput) {
        _this.setProp('name', hiddenInput.getAttribute('name'));
      }
    }

    _this.filterItemsHandler = function (event) {
      var target = event.target;

      if (!target) {
        return;
      }

      var search = target.value;

      if (search === '') {
        _this.showItems();

        return;
      }

      _this.getItems().forEach(function (item) {
        var filterItems = _this.getProp('filterItems');

        var fn = typeof filterItems === 'function' ? filterItems : _this.filterItems;

        if (fn(search, item)) {
          item.element.style.display = 'block';
        } else {
          item.element.style.display = 'none';
        }
      });
    };

    _this.registerElement({
      target: _this.getElement(),
      event: Util.Event.CLICK
    });

    _this.searchInputInContainer = _this.getElement().querySelector('.selectbox-input-container .input-select-one') !== null;

    var selectedItem = _this.getItemData(_this.getElement().querySelector('[data-selected]'));

    if (selectedItem) {
      _this.setSelected(selectedItem.value, selectedItem.text);
    }

    return _this;
  }

  Selectbox.attachDOM = function () {
    Util.Observer.subscribe({
      componentClass: 'selectbox',
      onAdded: function onAdded(element, create) {
        create(new Selectbox({
          element: element
        }));
      },
      onRemoved: function onRemoved(element, remove) {
        remove('Selectbox', element);
      }
    });
  };

  Selectbox.prototype.getSearchInput = function () {
    return this.getElement().querySelector('.input-select-one');
  };

  Selectbox.prototype.filterItems = function (search, item) {
    if (search === void 0) {
      search = '';
    }

    return item.value.indexOf(search) > -1 || item.text.indexOf(search) > -1;
  };

  Selectbox.prototype.showItems = function () {
    this.getItems().forEach(function (item) {
      item.element.style.display = 'block';
    });
  };

  Selectbox.prototype.getItems = function () {
    var _this = this;

    var items = Array.from(this.getElement().querySelectorAll('.selectbox-menu-item') || []);
    return items.map(function (item) {
      var info = _this.getItemData(item);

      return {
        text: info.text,
        value: info.value,
        element: item
      };
    });
  };

  Selectbox.prototype.setSelected = function (value, text) {
    if (value === void 0) {
      value = '';
    }

    if (text === void 0) {
      text = '';
    }

    var selectable = this.getProp('selectable');

    if (!selectable) {
      return false;
    }

    var element = this.getElement();
    var multiple = this.getProp('multiple');

    if (multiple) {
      this.addItemSelection(value);
    } else {
      var itemsSelected = Array.from(element.querySelectorAll('.selectbox-item-selection .item-selected') || []);

      if (itemsSelected.length === 0) {
        this.addItemSelection(value);
      }
    }

    var lastSelectedEl = element.querySelector('.selectbox-item-selection .item-selected:last-child');
    var spanEl = lastSelectedEl.querySelector('[data-value]');

    if (spanEl) {
      spanEl.innerHTML = text;
    } else {
      lastSelectedEl.innerHTML = text;
    }

    var hiddenInputs = Array.from(this.getElement().querySelectorAll('input[type="hidden"]') || []);
    var lastInput = hiddenInputs.slice(-1).pop();

    if (lastInput) {
      lastInput.setAttribute('value', value);
    }

    this.updateActiveList();
    this.setSearchInputWidth();
    var searchInput = this.getSearchInput();

    if (value === '') {
      this.showPlaceholder();
    } else {
      this.showPlaceholder(false);
    }

    return true;
  };

  Selectbox.prototype.getSelected = function () {
    var hiddenInputs = Array.from(this.getElement().querySelectorAll('input[type="hidden"]') || []);

    if (!this.getProp('multiple')) {
      return hiddenInputs.length > 0 ? hiddenInputs[0].value : '';
    }

    return hiddenInputs.map(function (input) {
      return input.value;
    });
  };

  Selectbox.prototype.setSearchInputWidth = function () {
    if (!this.searchInputInContainer) {
      return;
    }

    var selectbox = this.getElement();
    var selection = selectbox.querySelector('.selectbox-item-selection');
    var availableSpace = selectbox.offsetWidth - selection.offsetWidth;
    var searchInput = this.getSearchInput();

    if (!searchInput) {
      throw new Error('Selectbox: search input is not defined');
    }

    var selectedItemWidth = Array.from(selectbox.querySelectorAll('.item-selected') || []).reduce(function (total, el) {
      return total + el.offsetWidth;
    }, 0);

    if (availableSpace > 0) {
      searchInput.style.width = "calc(100% - " + (selectedItemWidth + 15) + "px)";
    }

    searchInput.style.left = selectedItemWidth + "px";
  };

  Selectbox.prototype.getItemData = function (item) {
    if (item === void 0) {
      item = null;
    }

    var text = '';
    var value = '';

    if (item) {
      text = item.getAttribute('data-text') || item.innerHTML;
      var selectedTextNode = item.querySelector('.text');

      if (selectedTextNode) {
        text = selectedTextNode.innerHTML;
      }

      value = item.getAttribute('data-value') || '';
    }

    return {
      text: text,
      value: value
    };
  };

  Selectbox.prototype.onElementEvent = function (event) {
    var target = event.target;

    if (event.type === Util.Event.START) {
      var selectbox = Util.Selector.closest(target, '.selectbox');

      if (!selectbox || selectbox !== this.getElement()) {
        this.hide();
      }
    } else if (event.type === Util.Event.CLICK) {
      var dataToggleAttr = target.getAttribute('data-toggle');

      if (dataToggleAttr && dataToggleAttr === 'selectbox') {
        this.toggle();
        return;
      }

      var dismissButton = Util.Selector.closest(target, '[data-dismiss="selectbox"]');

      if (dismissButton) {
        this.hide();
        return;
      }

      var selectedTag = Util.Selector.closest(target, '.icon-close');

      if (selectedTag) {
        this.removeSelected(selectedTag.parentNode);
        return;
      }

      var item = Util.Selector.closest(target, '.selectbox-menu-item');

      if (item && !item.classList.contains('disabled')) {
        var itemInfo = this.getItemData(item);

        if (this.getSelected() !== itemInfo.value) {
          this.setSelected(itemInfo.value, itemInfo.text);
          var selectInput = this.getElement().querySelector('.input-select-one').value = '';
          var detail = {
            item: item,
            text: itemInfo.text,
            value: itemInfo.value
          };
          this.triggerEvent(Util.Event.ITEM_SELECTED, detail);
        }

        this.hide();
        return;
      }

      var selectboxMenu = Util.Selector.closest(target, '.selectbox-menu');

      if (selectboxMenu) {
        return;
      }

      this.toggle();
    } else if (event.type === 'keyup' && event.keyCode === 8) {
      var inputTarget = event.target;

      if (inputTarget.value !== '') {
        return;
      }

      if (!this.searchInputInContainer) {
        return;
      }

      this.removeLastSelected();
    }
  };

  Selectbox.prototype.addItemSelection = function (value) {
    var itemSelectedEl = document.createElement('div');
    itemSelectedEl.classList.add('item-selected');

    if (this.getProp('tag')) {
      itemSelectedEl.classList.add('tag');
      var spanEl = document.createElement('span');
      spanEl.setAttribute('data-value', 'true');
      itemSelectedEl.appendChild(spanEl);
      var closeEl = document.createElement('button');
      closeEl.setAttribute('type', 'button');
      closeEl.classList.add('icon-close');
      var iconEl = document.createElement('span');
      iconEl.setAttribute('class', 'icon');
      iconEl.setAttribute('aria-hidden', 'true');
      closeEl.appendChild(iconEl);
      itemSelectedEl.appendChild(closeEl);
    }

    var element = this.getElement();
    element.querySelector('.selectbox-item-selection').appendChild(itemSelectedEl);
    var selectbox = this.getElement();
    var hiddenInputs = Array.from(selectbox.querySelectorAll('input[type="hidden"]') || []);
    var lastHiddenInput = hiddenInputs.length > 0 ? hiddenInputs[hiddenInputs.length - 1] : null;

    if (!this.getProp('multiple') && !lastHiddenInput || this.getProp('multiple')) {
      var hiddenInput = document.createElement('input');
      hiddenInput.setAttribute('type', 'hidden');
      var name_1 = this.getProp('name');
      hiddenInput.setAttribute('name', this.getProp('multiple') ? name_1 + "[]" : name_1);
      hiddenInput.setAttribute('value', value);
      selectbox.insertBefore(hiddenInput, lastHiddenInput ? lastHiddenInput.nextSibling : selectbox.firstChild);
    }
  };

  Selectbox.prototype.removeLastSelected = function () {
    var selectbox = this.getElement();
    var selectedItems = Array.from(selectbox.querySelectorAll('.selectbox-item-selection .item-selected') || []);

    if (selectedItems.length === 0) {
      return;
    }

    var lastSelectedItem = selectedItems[selectedItems.length - 1];
    this.removeSelected(lastSelectedItem);
  };

  Selectbox.prototype.removeSelected = function (selectedItem) {
    var selectbox = this.getElement();
    var selectedItems = Array.from(selectbox.querySelectorAll('.selectbox-item-selection .item-selected') || []);

    if (selectedItems.length === 0) {
      return;
    }

    selectbox.querySelector('.selectbox-item-selection').removeChild(selectedItem);

    if (this.getProp('multiple')) {
      var values = this.getSelected();
      var hiddenInput = selectbox.querySelector("input[type=\"hidden\"][value=\"" + values.slice(-1).pop() + "\"]");
      this.getElement().removeChild(hiddenInput);
    } else {
      var hiddenInput = selectbox.querySelector('input[type="hidden"]');

      if (!this.getProp('multiple') && hiddenInput) {
        hiddenInput.setAttribute('value', '');
      }
    }

    this.updateActiveList();
    this.setSearchInputWidth();

    if (selectedItems.length === 1) {
      this.showPlaceholder();
    }
  };

  Selectbox.prototype.showPlaceholder = function (show) {
    if (show === void 0) {
      show = true;
    }

    var searchInput = this.getSearchInput();

    if (!searchInput) {
      return;
    }

    if (show && searchInput.classList.contains('hide-placeholder')) {
      searchInput.classList.remove('hide-placeholder');
    } else if (!show && !searchInput.classList.contains('hide-placeholder')) {
      searchInput.classList.add('hide-placeholder');
    }
  };

  Selectbox.prototype.updateActiveList = function () {
    var _this = this;

    var selected = this.getSelected();
    var selectedItems = Array.isArray(selected) ? selected : [selected];
    var items = Array.from(this.getElement().querySelectorAll('.selectbox-menu-item') || []);
    items.forEach(function (item) {
      var data = _this.getItemData(item);

      if (selectedItems.indexOf(data.value) > -1) {
        if (!item.classList.contains('selected')) {
          item.classList.add('selected');
        }
      } else {
        if (item.classList.contains('selected')) {
          item.classList.remove('selected');
        }
      }
    });
  };

  Selectbox.prototype.toggle = function () {
    if (this.getElement().classList.contains('active')) {
      return this.hide();
    }

    return this.show();
  };

  Selectbox.prototype.show = function () {
    var element = this.getElement();

    if (element.classList.contains('active')) {
      return false;
    }

    element.classList.add('active');
    var selectboxMenu = element.querySelector('.selectbox-menu');
    var selectInput = this.getSearchInput();
    selectboxMenu.scrollTop = 0;
    this.triggerEvent(Util.Event.SHOW);
    this.triggerEvent(Util.Event.SHOWN);
    this.registerElement({
      target: document.body,
      event: Util.Event.START
    });

    if (selectInput) {
      this.registerElement({
        target: selectInput,
        event: 'keyup'
      });
      selectInput.addEventListener('keyup', this.filterItemsHandler);
      selectInput.focus();
    }

    var closeButton = element.querySelector('[data-dismiss="selectbox"]');

    if (closeButton) {
      this.registerElement({
        target: closeButton,
        event: Util.Event.CLICK
      });
    }

    return true;
  };

  Selectbox.prototype.hide = function () {
    var element = this.getElement();

    if (!element.classList.contains('active')) {
      return false;
    }

    element.classList.remove('active');
    this.triggerEvent(Util.Event.HIDE);
    this.triggerEvent(Util.Event.HIDDEN);
    this.unregisterElement({
      target: document.body,
      event: Util.Event.START
    });
    var closeButton = element.querySelector('[data-dismiss="selectbox"]');

    if (closeButton) {
      this.unregisterElement({
        target: closeButton,
        event: Util.Event.CLICK
      });
    }

    var selectInput = this.getSearchInput();

    if (selectInput) {
      selectInput.removeEventListener('keyup', this.filterItemsHandler);
      selectInput.value = '';
      this.unregisterElement({
        target: selectInput,
        event: 'keyup'
      });
    }

    this.showItems();
    return true;
  };

  return Selectbox;
}(Component);
Selectbox.attachDOM();

module.exports = Selectbox;
//# sourceMappingURL=selectbox.js.map
