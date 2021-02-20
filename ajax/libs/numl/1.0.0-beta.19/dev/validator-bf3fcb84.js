import { W as WidgetBehavior, v as devMode, w as warn, H as hideEffect } from './index-6a06a0ad.js';

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
      if (assert) {
        [this.assert, this.assertValue] = assert.split(':');
      } else {
        this.assert = null;
      }
    };

    host.nuSetAssert = (val) => {
      if (typeof val === 'function') {
        this.assert = val.name;
        this.assertValue = val;
      } else if (typeof val === 'string') {
        [this.assert, this.assertValue] = val.split(':');
      } else if (devMode) {
        warn('validator: wrong assert method', val);
      }
    };
    host.nuGetAssert = () => this.assert;

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
    const { fieldId, assert, form, assertValue, assertMethod } = this;

    if (!fieldId || !assert || !form) return;

    this.form.registerCheck(fieldId, this, assertMethod || assert, assertValue);
  }

  disconnectForm(form = this.currentForm, dontDelete) {
    const { fieldId, assert } = this;

    if (!fieldId || !assert) return;

    form.unregisterCheck(fieldId);

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
