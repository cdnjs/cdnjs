import { W as WidgetBehavior, i as isEqual } from './index-e74c1c40.js';

class OptionBehavior extends WidgetBehavior {
  static get params() {
    return {
      // contextValue: true,
      provideValue: false,
    };
  }

  init() {
    this.props.disabled = (val) => {
      const bool = val != null;

      if (bool) {
        this.unlinkListBox();
      } else {
        this.linkListBox();
      }

      return bool;
    };

    this.forceLinkValue();
    this.host.nuOption = this;

    super.init();

    this.linkContext('listbox', (listbox) => {
      if (this.listbox) {
        this.removeOption();
      }

      this.listbox = listbox;

      if (listbox && this.hasValue) {
        this.addOption(listbox);
        this.setCurrent();
      }
    }, false);

    this.on('click', () => {
      if (this.disabled) return;

      this.doAction('input', this.value);
      // this.doAction('close');
    });
  }

  disconnected() {
    super.disconnected();

    const listbox = this.listbox;

    if (listbox && this.hasValue) {
      this.removeOption();
    }
  }

  fromContextValue(value) {
    this.log('link context value', value);
    if (this.listbox) {
      this.addOption();
      this.setCurrent();
    }
  }

  setValue(value, silent) {
    this.unlinkListBox();

    super.setValue(value, silent);

    this.linkListBox();
  }

  linkListBox() {
    if (this.listbox && this.hasValue && !this.disabled) {
      this.addOption();
      this.setCurrent();
    }
  }

  unlinkListBox() {
    if (this.listbox && this.hasValue) {
      this.removeOption();
    }
  }

  addOption(listbox = this.listbox) {
    listbox.addOption(this);
  }

  setCurrent() {
    const isSelected = this.listbox ? (
      !this.listbox.multiple
        ? isEqual(this.value, this.listbox.value)
        : (this.listbox.value || []).includes(this.value)
    ) : false;
    const isCurrent = this.listbox ? this.listbox.current === this.value : false;

    this.setMod('current', isCurrent);
    this.setMod('pressed', isSelected); // synonym to "selected"
    this.setAria('selected', isSelected);

    if (this.listbox && isCurrent) {
      this.listbox.setAria('activedescendant', this.uniqId);
    }
  }

  removeOption() {
    if (this.listbox) {
      this.listbox.removeOption(this);
    }
  }
}

export default OptionBehavior;
