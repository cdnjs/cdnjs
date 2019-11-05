/*!
  * ModalPrompt v2.0.0-alpha.1 (https://phonon-framework.github.io)
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

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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

var Modal = function (_super) {
  __extends(Modal, _super);

  function Modal(props, autoCreate) {
    if (autoCreate === void 0) {
      autoCreate = true;
    }

    var _this = _super.call(this, 'modal', {
      title: null,
      message: null,
      cancelable: true,
      background: null,
      cancelableKeyCodes: [27, 13],
      buttons: [{
        event: 'confirm',
        text: 'Ok',
        dismiss: true,
        "class": 'btn btn-primary'
      }],
      center: true
    }, props) || this;

    _this.backdropSelector = 'modal-backdrop';
    _this.elementGenerated = false;

    _this.setTemplate('' + '<div class="modal" tabindex="-1" role="modal" data-no-boot>' + '<div class="modal-inner" role="document">' + '<div class="modal-content">' + '<div class="modal-header">' + '<h5 class="modal-title"></h5>' + '<button type="button" class="icon-close" data-dismiss="modal" aria-label="Close">' + '<span class="icon" aria-hidden="true"></span>' + '</button>' + '</div>' + '<div class="modal-body">' + '<p></p>' + '</div>' + '<div class="modal-footer">' + '</div>' + '</div>' + '</div>' + '</div>');

    if (autoCreate && _this.getElement() === null) {
      _this.build();
    }

    return _this;
  }

  Modal.attachDOM = function () {
    var className = 'modal';
    Util.Observer.subscribe({
      componentClass: className,
      onAdded: function onAdded(element, create) {
        create(new Modal({
          element: element
        }));
      },
      onRemoved: function onRemoved(element, remove) {
        remove('Modal', element);
      }
    });
    document.addEventListener(Util.Event.CLICK, function (event) {
      var target = event.target;

      if (!target) {
        return;
      }

      var toggleEl = Util.Selector.closest(target, "[data-toggle=\"" + className + "\"]");

      if (toggleEl) {
        var selector = toggleEl.getAttribute('data-target');

        if (!selector) {
          return;
        }

        var modal = document.querySelector(selector);

        if (!modal) {
          return;
        }

        var modalComponent = Util.Observer.getComponent(className, {
          element: modal
        });

        if (!modalComponent) {
          return;
        }

        target.blur();
        modalComponent.show();
      }
    });
  };

  Modal.prototype.build = function () {
    var _this = this;

    this.elementGenerated = true;
    var builder = document.createElement('div');
    builder.innerHTML = this.getTemplate();
    this.setElement(builder.firstChild);
    var element = this.getElement();
    var title = this.getProp('title');

    if (title !== null) {
      element.querySelector('.modal-title').innerHTML = title;
    }

    var message = this.getProp('message');

    if (message !== null) {
      element.querySelector('.modal-body').firstChild.innerHTML = message;
    } else {
      this.removeTextBody();
    }

    var cancelable = this.getProp('cancelable');

    if (!cancelable) {
      element.querySelector('.close').style.display = 'none';
    }

    var buttons = this.getProp('buttons');

    if (Array.isArray(buttons) && buttons.length > 0) {
      buttons.forEach(function (button) {
        element.querySelector('.modal-footer').appendChild(_this.buildButton(button));
      });
    } else {
      this.removeFooter();
    }

    document.body.appendChild(element);
  };

  Modal.prototype.show = function () {
    var _this = this;

    var element = this.getElement();

    if (element === null) {
      this.build();
    }

    if (element.classList.contains('show')) {
      return false;
    }

    document.body.style.overflow = 'hidden';

    (function () {
      return __awaiter(_this, void 0, void 0, function () {
        var _onShown;

        var _this = this;

        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4, Util.sleep(20)];

            case 1:
              _a.sent();

              this.triggerEvent(Util.Event.SHOW);
              this.buildBackdrop();
              this.attachEvents();

              _onShown = function onShown() {
                _this.triggerEvent(Util.Event.SHOWN);

                element.removeEventListener(Util.Event.TRANSITION_END, _onShown);
              };

              element.addEventListener(Util.Event.TRANSITION_END, _onShown);

              if (this.getProp('center')) {
                this.center();
              }

              element.classList.add('show');
              return [2];
          }
        });
      });
    })();

    return true;
  };

  Modal.prototype.hide = function () {
    var _this = this;

    var element = this.getElement();

    if (!element.classList.contains('show')) {
      return false;
    }

    document.body.style.overflow = 'visible';
    this.triggerEvent(Util.Event.HIDE);
    this.detachEvents();
    element.classList.add('hide');
    element.classList.remove('show');
    var backdrop = this.getBackdrop();

    var onHidden = function onHidden() {
      if (backdrop) {
        document.body.removeChild(backdrop);
        backdrop.removeEventListener(Util.Event.TRANSITION_END, onHidden);
      }

      element.classList.remove('hide');

      _this.triggerEvent(Util.Event.HIDDEN);

      if (_this.elementGenerated) {
        document.body.removeChild(element);
      }
    };

    if (backdrop) {
      backdrop.addEventListener(Util.Event.TRANSITION_END, onHidden);
      backdrop.classList.add('fadeout');
    }

    return true;
  };

  Modal.prototype.onElementEvent = function (event) {
    if (event.type === 'keyup') {
      var keycodes = this.getProp('cancelableKeyCodes');

      if (keycodes.find(function (k) {
        return k === event.keyCode;
      })) {
        this.hide();
      }

      return;
    }

    if (event.type === Util.Event.START) {
      this.hide();
      return;
    }

    if (event.type === Util.Event.CLICK) {
      var target = event.target;
      var eventName = target.getAttribute('data-event');

      if (eventName) {
        this.triggerEvent(eventName);
      }

      var dismissButton = Util.Selector.closest(target, '[data-dismiss]');

      if (dismissButton && dismissButton.getAttribute('data-dismiss') === 'modal') {
        this.hide();
      }
    }
  };

  Modal.prototype.buildButton = function (buttonInfo) {
    var button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('class', buttonInfo["class"] || 'btn');
    button.setAttribute('data-event', buttonInfo.event);
    button.innerHTML = buttonInfo.text;

    if (buttonInfo.dismiss) {
      button.setAttribute('data-dismiss', 'modal');
    }

    return button;
  };

  Modal.prototype.buildBackdrop = function () {
    var backdrop = document.createElement('div');
    backdrop.setAttribute('data-id', this.getId());
    backdrop.classList.add(this.backdropSelector);
    document.body.appendChild(backdrop);
  };

  Modal.prototype.getBackdrop = function () {
    return document.querySelector("." + this.backdropSelector + "[data-id=\"" + this.getId() + "\"]");
  };

  Modal.prototype.removeTextBody = function () {
    var element = this.getElement();
    element.querySelector('.modal-body').removeChild(element.querySelector('.modal-body').firstChild);
  };

  Modal.prototype.removeFooter = function () {
    var element = this.getElement();
    var footer = element.querySelector('.modal-footer');
    element.querySelector('.modal-content').removeChild(footer);
  };

  Modal.prototype.center = function () {
    var element = this.getElement();
    var computedStyle = window.getComputedStyle(element);

    if (computedStyle && computedStyle.height) {
      var height = computedStyle.height.slice(0, computedStyle.height.length - 2);
      var top_1 = window.innerHeight / 2 - parseFloat(height) / 2;
      element.style.top = top_1 + "px";
    }
  };

  Modal.prototype.attachEvents = function () {
    var _this = this;

    var element = this.getElement();
    var buttons = Array.from(element.querySelectorAll('[data-dismiss], .modal-footer button') || []);
    buttons.forEach(function (button) {
      return _this.registerElement({
        target: button,
        event: Util.Event.CLICK
      });
    });
    var cancelable = this.getProp('cancelable');
    var backdrop = this.getBackdrop();

    if (cancelable && backdrop) {
      this.registerElement({
        target: backdrop,
        event: Util.Event.START
      });
      this.registerElement({
        target: document,
        event: 'keyup'
      });
    }
  };

  Modal.prototype.detachEvents = function () {
    var _this = this;

    var element = this.getElement();
    var buttons = Array.from(element.querySelectorAll('[data-dismiss], .modal-footer button') || []);
    buttons.forEach(function (button) {
      return _this.unregisterElement({
        target: button,
        event: Util.Event.CLICK
      });
    });
    var cancelable = this.getProp('cancelable');

    if (cancelable) {
      var backdrop = this.getBackdrop();
      this.unregisterElement({
        target: backdrop,
        event: Util.Event.START
      });
      this.unregisterElement({
        target: document,
        event: 'keyup'
      });
    }
  };

  return Modal;
}(Component);
Modal.attachDOM();

var ModalPrompt = function (_super) {
  __extends(ModalPrompt, _super);

  function ModalPrompt(props) {
    var _this = _super.call(this, Object.assign({
      buttons: [{
        event: 'cancel',
        text: 'Cancel',
        dismiss: true,
        "class": 'btn btn-secondary'
      }, {
        event: 'confirm',
        text: 'Ok',
        dismiss: true,
        "class": 'btn btn-primary'
      }],
      inputValue: ''
    }, props), false) || this;

    _this.setTemplate('' + '<div class="modal" tabindex="-1" role="modal" data-no-boot>' + '<div class="modal-inner" role="document">' + '<div class="modal-content">' + '<div class="modal-header">' + '<h5 class="modal-title"></h5>' + '<button type="button" class="icon-close" data-dismiss="modal" aria-label="Close">' + '<span class="icon" aria-hidden="true"></span>' + '</button>' + '</div>' + '<div class="modal-body">' + '<p></p>' + '<input class="form-control" type="text" value="">' + '</div>' + '<div class="modal-footer">' + '</div>' + '</div>' + '</div>' + '</div>');

    if (_this.getElement() === null) {
      _this.build();
    }

    return _this;
  }

  ModalPrompt.prototype.show = function () {
    _super.prototype.show.call(this);

    var defaultValue = this.getProp('inputValue');

    if (typeof defaultValue === 'string') {
      this.setInputValue(defaultValue);
    }

    this.attachInputEvent();
    return true;
  };

  ModalPrompt.prototype.hide = function () {
    _super.prototype.hide.call(this);

    this.detachInputEvent();
    return true;
  };

  ModalPrompt.prototype.setInputValue = function (value) {
    if (value === void 0) {
      value = '';
    }

    this.getInput().value = value;
  };

  ModalPrompt.prototype.getInputValue = function () {
    return this.getInput().value;
  };

  ModalPrompt.prototype.onElementEvent = function (event) {
    if (event.target === this.getInput()) {
      return;
    }
  };

  ModalPrompt.prototype.getInput = function () {
    return this.getElement().querySelector('.form-control');
  };

  ModalPrompt.prototype.attachInputEvent = function () {
    this.registerElement({
      target: this.getInput(),
      event: 'keyup'
    });
  };

  ModalPrompt.prototype.detachInputEvent = function () {
    this.unregisterElement({
      target: this.getInput(),
      event: 'keyup'
    });
  };

  return ModalPrompt;
}(Modal);

module.exports = ModalPrompt;
//# sourceMappingURL=modalprompt.js.map
