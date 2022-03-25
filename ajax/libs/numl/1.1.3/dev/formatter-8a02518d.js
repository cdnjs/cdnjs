import { W as WidgetBehavior } from './index-e74c1c40.js';

class FormatterBehavior extends WidgetBehavior {
  static get formatter() {}

  static get params() {
    return {
      localized: true,
    };
  }

  init() {
    super.init();
  }

  connected() {
    super.connected();

    this.apply();
  }

  changed(name, value) {
    super.changed(name, value);

    if (name in this.props) {
      if (this.isConnected) {
        this.apply();
      }
    }
  }

  apply() {
    if (!this.locale) {
      this.setLocale(this.lang);
    }

    this.host.innerHTML = this.constructor.formatter(this.value, this.locale, this);
  }

  fromHostValue(value, silent) {
    this.value = value;
    this.apply();
  }
}

export { FormatterBehavior as F };
