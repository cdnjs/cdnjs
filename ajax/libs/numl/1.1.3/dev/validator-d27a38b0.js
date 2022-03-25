import { W as WidgetBehavior, t as devMode, w as warn, H as hideEffect } from './index-e74c1c40.js';

let CUS_VAL_COUNT = 0;

class ValidatorBehavior extends WidgetBehavior {
  static get params() {
    return {
      primary: true,
      linkValue: false,
      linkHostValue: false,
    };
  }

  init() {
    const { host } = this;

    this.props.for = (val) => {
      this.fieldId = val;
    };
    this.props.assert = (assert) => {
      this.disconnectForm(this.currentForm, true);

      if (assert) {
        [this.assert, this.assertValue] = assert.split(':');
      } else {
        this.assert = null;
      }

      this.connectForm();
    };

    host.nuSetAssert = (val) => {
      this.disconnectForm(this.currentForm, true);

      if (typeof val === 'function') {
        this.assert = val.name || `customValidator${++CUS_VAL_COUNT}`;
        this.assertValue = val;
      } else if (typeof val === 'string') {
        [this.assert, this.assertValue] = val.split(':');
      } else if (devMode) {
        this.assert = null;
        this.assertValue = null;
        warn('validator: wrong assert method', val);
      }

      this.connectForm();
    };
    host.nuGetAssert = () => this.assert || this.assertValue;

    super.init();
  }

  get field() {
    return this.host.getAttribute('for').trim();
  }

  connected() {
    const { host } = this;

    if (host._assert != null) {
      host.nuSetAssert(host._assert);

      delete host._assert;
    }

    this.linkContext('form', (form) => {
      if (this.currentForm && form !== this.currentForm) {
        this.disconnectForm(this.currentForm, !!form);
      }

      this.currentForm = form;

      if (!form) return;

      this.connectForm();
    });
  }

  changed(name, value) {
    super.changed(name, value);

    if (this.form) {
      this.connectForm();
    }
  }

  connectForm() {
    let { fieldId, assert, form, assertValue } = this;

    if (!fieldId || !assert || !form) return;

    this.form.registerCheck(fieldId, this, assert, assertValue);
  }

  disconnectForm(form = this.currentForm, dontDelete) {
    const { fieldId, assert } = this;

    if (!fieldId || !assert || !form) return;

    form.unregisterCheck(fieldId, assert);

    if (!dontDelete) {
      delete this.form;
    }
  }

  setValidity(bool) {
    const { host } = this;

    if (this.validity === bool) return;

    super.setValidity(bool);

    hideEffect(host, bool, 'collapse');
  }
}

export default ValidatorBehavior;
