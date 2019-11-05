/*!
  * Accordion v2.0.0-alpha.1 (https://phonon-framework.github.io)
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

var Collapse = function (_super) {
  __extends(Collapse, _super);

  function Collapse(props) {
    if (props === void 0) {
      props = {
        toggle: false
      };
    }

    var _this = _super.call(this, 'collapse', {
      toggle: false
    }, props) || this;

    var toggle = _this.getProp('toggle');

    if (toggle) {
      _this.toggle();
    }

    return _this;
  }

  Collapse.attachDOM = function () {
    var className = 'collapse';
    Util.Observer.subscribe({
      componentClass: className,
      onAdded: function onAdded(element, create) {
        create(new Collapse({
          element: element
        }));
      },
      onRemoved: function onRemoved(element, remove) {
        remove('Collapse', element);
      }
    });
    document.addEventListener(Util.Event.CLICK, function (event) {
      if (!event.target) {
        return;
      }

      var target = Util.Selector.closest(event.target, '[data-toggle]');

      if (!target) {
        return;
      }

      var dataToggleAttr = target.getAttribute('data-toggle');

      if (dataToggleAttr && dataToggleAttr === className) {
        var id = target.getAttribute('data-target') || target.getAttribute('href');

        if (!id) {
          return;
        }

        event.preventDefault();
        var collapse = document.querySelector(id);

        if (!collapse) {
          return;
        }

        var collapseComponent = Util.Observer.getComponent(className, {
          element: collapse
        });

        if (!collapseComponent) {
          return;
        }

        collapseComponent.toggle({
          element: collapse,
          toggle: true
        });
      }
    });
  };

  Collapse.prototype.getHeight = function () {
    return this.getElement().getBoundingClientRect(this.getElement()).height;
  };

  Collapse.prototype.toggle = function () {
    if (this.isVisible()) {
      return this.hide();
    }

    return this.show();
  };

  Collapse.prototype.show = function () {
    var _this = this;

    var element = this.getElement();

    if (element.classList.contains('collapsing') || this.isVisible()) {
      return false;
    }

    this.triggerEvent(Util.Event.SHOW);

    var onCollapsed = function onCollapsed() {
      _this.triggerEvent(Util.Event.SHOWN);

      element.classList.add('show');
      element.classList.remove('collapsing');
      element.removeEventListener(Util.Event.TRANSITION_END, onCollapsed);
      element.setAttribute('aria-expanded', true);
      element.style.height = 'auto';
    };

    if (!element.classList.contains('collapsing')) {
      element.classList.add('collapsing');
    }

    element.addEventListener(Util.Event.TRANSITION_END, onCollapsed);
    var height = this.getHeight();
    element.style.height = '0px';
    setTimeout(function () {
      element.style.height = height + "px";
    }, 20);
    return true;
  };

  Collapse.prototype.hide = function () {
    var _this = this;

    var element = this.getElement();

    if (element.classList.contains('collapsing')) {
      return false;
    }

    if (!element.classList.contains('show')) {
      return false;
    }

    this.triggerEvent(Util.Event.HIDE);

    var onCollapsed = function onCollapsed() {
      _this.triggerEvent(Util.Event.HIDDEN);

      element.classList.remove('collapsing');
      element.style.height = 'auto';
      element.removeEventListener(Util.Event.TRANSITION_END, onCollapsed);
      element.setAttribute('aria-expanded', false);
    };

    element.style.height = element.offsetHeight + "px";
    setTimeout(function () {
      element.style.height = '0px';
    }, 20);
    element.addEventListener(Util.Event.TRANSITION_END, onCollapsed);

    if (!element.classList.contains('collapsing')) {
      element.classList.add('collapsing');
    }

    element.classList.remove('show');
    return true;
  };

  Collapse.prototype.isVisible = function () {
    return this.getElement().classList.contains('show');
  };

  return Collapse;
}(Component);
Collapse.attachDOM();

var Accordion = function (_super) {
  __extends(Accordion, _super);

  function Accordion(props) {
    var _this = _super.call(this, 'accordion', {
      multiple: false
    }, props) || this;

    _this.collapses = [];

    var element = _this.getElement();

    var toggles = Array.from(element.querySelectorAll('[data-toggle="accordion"]') || []);
    toggles.forEach(function (toggle) {
      var collapseId = toggle.getAttribute('href') || toggle.getAttribute('data-target');

      if (collapseId === null) {
        throw new Error('Accordion: collapse is missing href or data-target attribute');
      }

      var collapse = document.querySelector(collapseId);

      if (collapse) {
        _this.addCollapse(collapse);
      }
    });

    _this.registerElement({
      target: element,
      event: Util.Event.CLICK
    });

    return _this;
  }

  Accordion.attachDOM = function () {
    Util.Observer.subscribe({
      componentClass: 'accordion',
      onAdded: function onAdded(element, create) {
        create(new Accordion({
          element: element
        }));
      },
      onRemoved: function onRemoved(element, remove) {
        remove('Accordion', element);
      }
    });
  };

  Accordion.prototype.addCollapse = function (element) {
    var collapse = new Collapse({
      element: element
    });
    this.collapses.push(collapse);
    return collapse;
  };

  Accordion.prototype.getCollapse = function (element) {
    var el = this.getElement();
    var collapse = this.collapses.find(function (c) {
      return el.getAttribute('id') === element.getAttribute('id');
    });

    if (!collapse) {
      collapse = this.addCollapse(element);
    }

    return collapse;
  };

  Accordion.prototype.getCollapses = function () {
    return this.collapses;
  };

  Accordion.prototype.setCollapses = function (showCollapse) {
    var _this = this;

    var element = this.getElement();
    var collapse = this.getCollapse(showCollapse);
    var multipleOpen = this.getProp('multiple');

    if (!multipleOpen) {
      this.collapses.filter(function (c) {
        return c.getElement() !== collapse.getElement();
      }).forEach(function (c) {
        _this.toggleIcon(c.getElement(), 'icon-minus', 'icon-plus');

        c.hide();
      });
    }

    var v = collapse.isVisible();
    this.toggleIcon(collapse.getElement(), v ? 'icon-minus' : 'icon-plus', v ? 'icon-plus' : 'icon-minus');
    collapse.toggle();
  };

  Accordion.prototype.onElementEvent = function (event) {
    var target = event.target;
    var toggleEl = Util.Selector.closest(target, '[data-toggle="accordion"]');

    if (!toggleEl) {
      return;
    }

    var collapseId = toggleEl.getAttribute('data-target') || toggleEl.getAttribute('href');

    if (!collapseId) {
      return;
    }

    var collapseEl = document.querySelector(collapseId);
    var accordion = Util.Selector.closest(toggleEl, '.accordion');

    if (!accordion || !collapseEl) {
      return;
    }

    event.preventDefault();
    this.show(collapseEl);
  };

  Accordion.prototype.toggleIcon = function (collapse, remove, add) {
    var id = collapse.getAttribute('id');
    var selector = "[data-toggle=\"accordion\"][href=\"#" + id + "\"] .collapse-toggle";
    var iconEl = document.querySelector(selector);

    if (!iconEl) {
      return;
    }

    if (iconEl.classList.contains(remove)) {
      iconEl.classList.remove(remove);
      iconEl.classList.add(add);
    }
  };

  Accordion.prototype.show = function (collapseEl) {
    var collapse = collapseEl;

    if (typeof collapseEl === 'string') {
      collapse = document.querySelector(collapseEl);
    }

    if (!collapse) {
      throw new Error("The collapsible " + collapseEl + " is an invalid HTMLElement.");
    }

    this.setCollapses(collapse);
    return true;
  };

  Accordion.prototype.hide = function (collapseEl) {
    var collapse = collapseEl;

    if (typeof collapseEl === 'string') {
      collapse = document.querySelector(collapseEl);
    }

    if (!collapse) {
      throw new Error("The collapsible " + collapseEl + " is an invalid HTMLElement.");
    }

    var collapseObj = this.getCollapse(collapse);
    return collapseObj.hide();
  };

  return Accordion;
}(Component);
Accordion.attachDOM();

module.exports = Accordion;
//# sourceMappingURL=accordion.js.map
