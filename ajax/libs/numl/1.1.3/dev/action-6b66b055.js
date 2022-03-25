import { W as WidgetBehavior, A as ALIAS_ATTR, c as deepQuery, h, q as queryById, j as Routing, i as isEqual } from './index-e74c1c40.js';
import { handleLinkState, handleLinksState } from './current-1bf6b12c.js';

class ActionBehavior extends WidgetBehavior {
  static get params() {
    return {
      input: true,
      role: 'button',
    };
  }

  init() {
    this.value = null;
    this.offValue = null;
    // require mixins
    this.require('active', 'focus', 'hover');

    const pressedAttr = ALIAS_ATTR(this.host, 'pressed');

    this.props.to = null;
    this.props.pressed = (bool) => this.set(bool != null, true);
    this.props.checked = pressedAttr;
    this.props.selected = pressedAttr;

    this.setMod('action', true);

    super.init();

    const { host } = this;

    host.NuAction = this;

    this.on('keydown', (event) => {
      if (event.key === 'Escape' && host.nuHasAria('expanded')) {
        this.set(false);
      }

      if (this.listbox) {
        // don't toggle popup while event is handled
        this.ignorePopup = true;

        if (!event.nuListBoxHandled) {
          // delegate focus to the listbox
          this.listbox.host.focus();
          // delegate event handling to the listbox
          if (event.key !== 'Enter' && event.key !== ' ') {
            this.listbox.onKeyDown(event);
          }
        }

        setTimeout(() => {
          // remove toggle prevention
          this.ignorePopup = false;
        }, 100);
      }
    });

    /**
     * @type {RadioGroupBehavior}
     */
    this.radioGroup = null;

    if (this.to) {
      this.changed('to', this.to);
    }
  }

  connected() {
    super.connected();

    this.linkContext('radiogroup', () => this.verifyRadioGroup(), 'radioGroup');

    if (this.role === 'button' && this.to) {
      this.role = 'link';
    }

    this.createLink();
    this.setContext('button', this);
  }

  disconnected() {
    if (this.radioGroup) {
      this.radioGroup.removeItem(this);
    }
  }

  changed(name, value) {
    super.changed(name, value);

    if (name === 'to') {
      this.createLink();

      const { $link } = this;

      if ($link) {
        $link.href = this.href;
        $link.target = this.newTab ? '_blank' : '_self';
      }
    }
  }

  verifyRadioGroup() {
    const radioGroup = this.radioGroup;

    if (!radioGroup) return;

    radioGroup.addItem(this);

    this.setAttr('link-value', '');
    this.role = radioGroup.params.itemRole;

    if (this.value == null) {
      if (!radioGroup.counter) radioGroup.counter = 0;

      this.setValue(String(radioGroup.counter++));
    }

    this.fromContextValue(radioGroup.value);
  }

  linkPopup(popup) {
    if (this.popup) return;

    this.popup = popup;
    this.setAria('haspopup', true);
    this.setAria('expanded', this.pressed || false);

    this.setMod('dropdown', true);

    if (this.listbox) {
      this.setAria('haspopup', 'listbox');
    }
  }

  unlinkPopup(popup) {
    if (this.popup !== popup) return;

    const { host } = this;

    delete this.popup;
    host.nuSetAria('haspopup', null);
    host.nuSetAria('expanded', null);
    this.role = this.host.constructor.nuRole;

    this.setMod('dropdown', false);
  }

  createLink() {
    const { host } = this;

    let $link;

    if (!this.to) {
      if (this.$link) {
        delete this.$link;
        host.removeChild(this.$link);
      }

      return;
    }

    if (!this.$link) {
      $link = deepQuery(host, 'a');

      if (!$link) {
        $link = h('a');
      }

      $link.href = this.href;
      $link.target = this.newTab ? '_blank' : '_self';
      $link.setAttribute('tabindex', '-1');
      $link.setAttribute('aria-hidden', 'true');
      $link.setAttribute('role', 'none');
      $link.innerHTML = '';

      this.$link = $link;

      setTimeout(() => {
        host.appendChild(this.$link);
        handleLinkState(host);
      });

      this.$link.addEventListener('click', (evt) => {
        if (this.disabled) {
          evt.preventDefault();
          return;
        }

        if (evt.button === 0 && !this.disabled) {
          this.tap(evt);
        }

        evt.stopPropagation();
      });
    } else {
      $link = this.$link;
    }

    $link.href = this.href;
    $link.target = this.newTab ? '_blank' : '_self';

    if (($link && $link.href).includes('//')) {
      this.$link.setAttribute('rel', 'noreferrer');
    } else {
      this.$link.removeAttribute('rel');
    }
  }

  tap(evt) {
    const { host } = this;

    if (this.to && evt.target !== this.$link) {
      this.$link.click();

      return;
    }

    if (this.to && evt.target === this.$link) {
      if (this.href.startsWith('#')) {
        const id = this.href.slice(1);
        const elm = queryById(host, id);

        if (elm) {
          elm.scrollIntoView({ behavior: 'smooth' });

          history.replaceState(null, '', `#${id}`);

          evt.preventDefault();

          handleLinksState(true);

          setTimeout(() => {
            this.emit('tap');

            setTimeout(() => {
              handleLinksState();
            });
          }, 0);

          return;
        }
      }
    }

    if (this.disabled) return;

    if (this.isRadio() && this.pressed) return;

    if (this.scrollto) {
      host.nuScrollTo(this.scrollto);
    }

    if (this.to) {
      const to = this.to;
      const href = to.replace(/^!/, '');
      const openNewTab = to.startsWith('!') || evt.metaKey || evt.shiftKey;
      const useLink = Routing.route(href, openNewTab);

      if (!useLink) {
        evt.preventDefault();
        evt.stopPropagation();
      }

      this.doAction('close', true);
    }

    setTimeout(() => {
      this.emit('tap');

      setTimeout(() => {
        handleLinksState();
      });
    }, 0);

    if (this.isToggle()) {
      this.toggle();
    } else {
      if (!this.popup) {
        this.control();
      }

      this.doActions(this.value);
    }
  }

  get emitValue() {
    if (this.isToggle()) {
      if (this.value != null) {
        return this.pressed ? this.value : (this.offValue != null ? this.offValue : this.value);
      }

      return this.pressed;
    }

    return this.value;
  }

  toggle() {
    if (!this.isToggle()) return;

    if (this.pressed && !this.isUnpressable()) {
      return;
    }

    this.set(!this.pressed);
  }

  set(pressed, silent, force) {
    if (pressed === this.pressed) return;

    if (!this.isToggle() && !force) return;

    const { host } = this;

    pressed = pressed || false;

    this.pressed = pressed;

    if (pressed && this.isRadio() && this.radioGroup) {
      this.radioGroup.setCurrent(this);
    }

    if (this.popup) {
      host.nuSetAria('expanded', pressed);
    } else if (this.isCheckbox()) {
      host.nuSetAria('checked', pressed);
    } else if (this.isSelectable()) {
      host.nuSetAria('selected', pressed);
    } else {
      host.nuSetAria('pressed', pressed);
    }

    if (!silent && this.isToggle()) {
      this.emit('pressed', this.pressed);

      if (!this.popup) {
        this.emit('input', this.emitValue);
      }
    }

    if (!this.popup) {
      // run dry control system if silent mode is active or trigger option is not set
      this.control(silent & !this.hasAttr('trigger'));
    }

    if (pressed && this.listbox) {
      this.listbox.host.focus();
    }

    this.setMod('pressed', pressed);
    this.setContext('disabled', !pressed);

    if (pressed) {
      this.doActions(this.value);
    }

    this.toggleInnerPopup();
  }

  toggleInnerPopup(bool, ignoreMultiple) {
    const innerPopup = this.host.nuDeepQuery(`[is-popup]${ignoreMultiple ? ':not([multiple])' : ''}`);
    const method = bool == null
      ? (this.pressed ? 'open' : 'close')
      : (bool ? 'open' : 'close');

    if (innerPopup) {
      innerPopup.nuPopup[method]();
    }
  }

  setValue(value, silent) {
    if (!this.ignorePopup) {
      this.toggleInnerPopup(false, true);
    }

    super.setValue(value, silent);
  }

  setByValue(val) {
    let value = this.value;
    let offValue = this.offValue;

    if (value != null) {
      value = this.getTypedValue(value);

      if (isEqual(value, val)) {
        return this.set(true);
      }

      if (offValue != null) {
        offValue = this.getTypedValue(offValue);

        if (offValue === val) {
          return this.set(false);
        }
      }

      return this.set(false);
    }

    this.set(val != null);
  }

  isToggle() {
    const { host } = this;

    return host.hasAttribute('toggle')
      || host.nuHasAria('pressed')
      || host.nuHasAria('expanded')
      || host.nuHasAria('checked')
      || host.nuHasAria('selected')
      || ['checkbox', 'radio', 'tab', 'switch'].includes(this.role);
  }

  isUnpressable() {
    return !['radio', 'tab'].includes(this.role);
  }

  isRadio() {
    return ['radio', 'tab'].includes(this.role);
  }

  isSelectable() {
    return ['tab'].includes(this.role);
  }

  isCheckbox() {
    return ['radio', 'checkbox', 'switch'].includes(this.role);
  }

  fromContextValue(value) {
    if (!this.isToggle() || value == null) return;

    this.set(isEqual(this.value, value));
  }

  control(dryRun) {
    let state = null;

    if (this.isToggle() && !this.valueBubbled) {
      state = !!this.pressed;
    }

    this.use('control')
      .then(Control => Control.apply(state, this.getTypedValue(this.emitValue), dryRun));
  }

  get href() {
    const { to = '' } = this;

    return to.replace(/^!/, '');
  }

  get newTab() {
    const { to = '' } = this;

    return to.startsWith('!');
  }
}

export default ActionBehavior;
