import { W as WidgetBehavior, i as isEqual, d as deepQueryAll, a as scrollParentToChild, b as BOOL_TYPE } from './index-e74c1c40.js';

/**
 * @see https://www.w3.org/TR/wai-aria-practices/examples/listbox/listbox-collapsible.html
 */

class ListBoxBehavior extends WidgetBehavior {
  static get params() {
    return {
      input: true,
      provideValue: true,
    };
  }

  init() {
    this.props.multiple = (val) => {
      const bool = BOOL_TYPE(val);

      if (bool) {
        this.setAttr('type', 'array');
      }

      this.setAria('aria-multiselectable', bool);

      return bool;
    };

    this.multiple = this.host.hasAttribute('multiple');

    this.isPopup = this.host.hasAttribute('nu-popup');

    if (this.isPopup) {
      this.forceLinkValue();
    }

    this.host.nuListBox = this;
    this.options = [];

    super.init();

    this.setName('listbox');
    this.setContext('listbox', this, true);

    // this.on('blur', () => {
    // Clear active descendant
    // this.setActive();
    // });

    this.linkContext('button', (button) => {
      if (button && this.linkValue) {
        button.listbox = this;

        if (button.popup) {
          button.setAria('haspopup', 'listbox');
        }
      }
    });

    this.on('keydown', this.onKeyDown.bind(this));
    this.on('keyup', this.onKeyUp.bind(this));
  }

  connected() {
    super.connected();

    setTimeout(() => {
      if (!this.current && this.options.length) {
        this.current = this.options[0].value;
      }
    });
  }

  setValue(value, silent) {
    if (this.multiple && !Array.isArray(value) && value != null) {
      if (typeof value ==='string') {
        value = value.split(/,/g).map(val => val.trim());
      } else {
        value = [value];
      }
    }

    if (isEqual(this.value, value)) return;

    super.setValue(value, silent);
  }

  toggleOption(toggleValue, silent) {
    if (!this.multiple) {
      this.setValue(toggleValue, silent);

      return;
    }

    const option = this.getOptionByValue(toggleValue);

    // ignore if there is no option with such value
    if (!option) return;

    let value = [...(this.value || [])];

    if (!Array.isArray(value)) {
      value = [];
    }

    this.current = toggleValue;

    // toggle option value
    if (value.includes(toggleValue)) {
      value.splice(value.indexOf(toggleValue), 1);
    } else {
      value.push(toggleValue);
    }

    this.updateCurrent();

    this.setValue(value, silent);
  }

  onKeyUp(evt) {
    switch (evt.key) {
      case ' ':
        evt.stopPropagation();
        evt.preventDefault();
        this.toggleOption(this.current);

        if (!this.multiple && evt.target === this.host && this.isPopup) {
          this.use('popup')
            .then(Popup => Popup.close());
        }
        break;
      default:
        return;
    }

    evt.nuListBoxHandled = true;
  }

  onKeyDown(evt) {
    const options = this.orderedOptions;
    const currentOption = this.currentOption;

    if (!options.length || (currentOption && !options.includes(currentOption))) return;

    const index = options.indexOf(currentOption);

    let newCurrent;

    switch (evt.key) {
      case 'Home':
        if (!this.isEdgeMoveAllowed()) return;

        newCurrent = options[0].value;

        break;
      case 'End':
        if (!this.isEdgeMoveAllowed()) return;

        newCurrent = options.slice(-1)[0].value;

        break;
      case 'ArrowUp':
        if (index > 0) {
          newCurrent = options[index - 1].value;
        } else if (index === -1) {
          newCurrent = options.slice(-1)[0].value;
        } else {
          return;
        }

        this.openPopup();

        break;
      case 'ArrowDown':
        if (index < options.length - 1) {
          newCurrent = options[index + 1].value;
        } else if (index === -1) {
          newCurrent = options[0].value;
        } else {
          return;
        }

        this.openPopup();

        break;
      case ' ':
        evt.preventDefault();
        evt.stopPropagation();
        return;
      case 'Enter':
        this.setValue(this.current);

        if (evt.target === this.host && this.isPopup) {
          this.use('popup')
            .then(Popup => Popup.close());
        }
        break;
      default:
        return;
    }

    evt.nuListBoxHandled = true;

    setTimeout(() => {
      if (newCurrent != null) {
        this.current = newCurrent;
      }

      this.updateCurrent();
    });

    evt.preventDefault();
    // evt.stopPropagation();
  }

  isEdgeMoveAllowed() {
    if (!this.isPopup) return true;

    const popup = this.host.nuPopup;

    if (popup) {
      return popup.isOpen;
    }

    return true;
  }

  openPopup() {
    if (!this.isPopup) return;

    const popup = this.host.nuPopup;

    if (!popup || popup.isOpen) return;

    if (this.button) {
      this.button.set(true, true);
    }
  }

  addOption(option) {
    if (!this.options.includes(option)) {
      this.options.push(option);

      if (!this.current) {
        if (this.multiple ? (this.value || []).includes(option.value) : isEqual(this.value, option.value)) {
          this.current = option.value;
        }
      }
    }
  }

  get orderedOptions() {
    const ownHosts = this.options.map(option => option.host);

    return deepQueryAll(this.host, '[nu-option]:not([disabled])')
      .filter(host => ownHosts.includes(host))
      .map(host => this.options.find(option => option.host === host))
      .filter(option => option);
  }

  get currentOption() {
    return this.options.find(option => isEqual(option.value, this.current));
  }

  removeOption(option) {
    if (this.options.includes(option)) {
      this.options.splice(this.options.indexOf(option), 1);

      if (this.current === option.value) {
        this.current = false;
      }
    }
  }

  getOptionByValue(value) {
    return this.options.find(option => isEqual(option.value, value));
  }

  updateCurrent() {
    this.options.forEach(option => {
      option.setCurrent();
    });

    setTimeout(() => {
      const currentOption = this.currentOption;

      if (currentOption) {
        scrollParentToChild(this.host, currentOption.host);
      }
    });
  }
}

export default ListBoxBehavior;
