import { W as WidgetBehavior, y as fixture, i as isEqual } from './index-e74c1c40.js';

class FileInputBehavior extends WidgetBehavior {
  static get params() {
    return {
      input: true,
      localized: false,
      tag: 'input',
      type: 'file',
      acceptValue: false,
      provideValue: true,
    };
  }

  init() {
    const tag = this.tagName = this.params.tag;
    const { host } = this;

    const existRef = host.querySelector(tag);

    if (existRef) {
      this.ref = existRef;
    } else {
      const container = fixture('<nu-block place="cover" opacity="0" overflow="n"><input/></nu-block>');

      host.appendChild(container);

      this.ref = container.querySelector('input');
    }

    this.setType();

    this.value = null;
    this.props.disabled = () => {
      return this.transferAttr('disabled', this.ref) != null;
    };
    this.props.multiple = () => {
      return this.transferAttr('multiple', this.ref) != null;
    };
    this.props.accept = () => {
      return this.transferAttr('accept', this.ref);
    };
    this.props.placeholder = () => this.transferAttr('placeholder', this.ref, '...');

    super.init();

    const { ref } = this;

    ref.addEventListener('input', (event) => {
      event.stopPropagation();

      this.setValue(ref.files);
    });

    ref.addEventListener('change', (event) => {
      event.stopPropagation();

      this.emit('change', this.value);
    });

    ref.addEventListener('blur', () => {
      if (host.id) {
        this.emit('nu-blur', host.nuId, { bubbles: true });
      }
    });

    host.nuRef = ref;

    if (host.hasAttribute('label')) {
      host.nuChanged('label', null);
      host.removeAttribute('aria-label');
    }

    if (host.hasAttribute('labelledby')) {
      host.nuChanged('label', null);
      host.removeAttribute('aria-labelledby');
    }

    this.inputGroup = null;

    this.linkContext('inputgroup', () => {
      this.setEmptyMod();
    }, 'inputGroup');

    // recheck for autocomplete
    setTimeout(() => {
      this.setEmptyMod();
    }, 500);
  }

  setEmptyMod() {
    if (!this.ref) return;

    this.setMod('placeholder', !this.ref.value);

    const inputGroup = this.inputGroup;

    if (inputGroup) {
      inputGroup.setMod('placeholder', !this.ref.value);
    }
  }

  setValue(fileList, silent) {
    if (fileList) {
      if (!(fileList instanceof FileList) || isEqual(this.value, fileList)) return;

      this.value = this.multiple ? fileList : fileList[0];
    } else {
      this.value = null;
    }

    if (this.params.provideValue) {
      this.setValueToContext();
    }

    this.setEmptyMod();

    if (!silent) {
      this.emit('input', this.value);
    }

    this.setFormValue();
  }

  setType() {
    if (this.ref ) {
      this.ref.type = this.params.type;
    } else {
      setTimeout(() => this.setType());
    }
  }

  getTypedValue(value) {
    return value;
  }
}

export default FileInputBehavior;
