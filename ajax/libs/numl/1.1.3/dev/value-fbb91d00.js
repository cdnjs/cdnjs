import { W as WidgetBehavior, i as isEqual, q as queryById, m as query } from './index-e74c1c40.js';

class ValueBehavior extends WidgetBehavior {
  static get params() {
    return {
      provideValue: false,
      contextValue: false,
    };
  }

  init() {
    super.init();

    this.linkContext('typedValue', (value) => {
      if (value === undefined && !this.value) return;

      this.setValue(value);
    }, 'parentValue');

    if (!this.value) {
      this.setValue(null);
    }
  }

  setValue(value) {
    if (isEqual(this.value, value)) return;

    this.value = value;

    this.apply();
  }

  fromHostValue(value) {
    super.fromHostValue(value);

    this.apply();
  }

  apply() {
    let { list, value } = this;

    if (list != null) {
      const listEl = list ? queryById(this.host, list) : query(this.host, '[nu-listbox]');

      if (listEl && listEl.nuListBox && listEl.nuListBox.options.length) {
        const listbox = listEl.nuListBox;

        let html = '';

        this.setAria('label', false);

        if (listbox.multiple) {
          const values = listbox.value || [];

          if (values.length) {
            html += '<nu-flex gap flow="row wrap">';

            const rawValues = [];

            values.forEach(value => {
              const option = listbox.getOptionByValue(value);

              if (option) {
                html += `<nu-badge>${option.host.innerHTML}</nu-badge>`;
                rawValues.push(option.host.innerText);
              }
            });

            html += '&nbsp;</nu-flex>';

            this.setAria('label', rawValues.join(','));
          }
        } else {
          const option = listbox.getOptionByValue(value);

          if (option) {
            html = option.host.innerHTML;

            this.setAria('label', option.host.innerText);
          }
        }

        if (html) {
          this.setMod('placeholder', false);
          this.host.innerHTML = html;
        } else {
          this.setMod('placeholder', true);
          this.host.innerHTML = this.placeholder || '&nbsp;';
        }

        return;
      } else {
        setTimeout(() => {
          if (this.list != null) {
            this.apply();
          }
        });
      }
    }

    const hasValue = value != null;

    if (value == null) {
      value = '&nbsp;';
    } else if (value instanceof Date) {
      value = `<nu-datetime value="${String(value)}" date></nu-datetime>`;
    } else if (Array.isArray(value) && value[0] instanceof Date) {
      value = `
        <nu-flex gap>
          <nu-datetime value="${String(value[0])}" date></nu-datetime>
          <nu-el>–</nu-el>
          <nu-datetime value="${String(value[1])}" date></nu-datetime>
        </nu-flex>
      `;
    } else if (typeof value === 'boolean') {
      value = value ? '<nu-icon name="check checkmark"></nu-icon>' : '<nu-icon name="minus"></nu-icon>';
    } else if (Array.isArray(value)) {
      value = `</nu-block>${value.join('</nu-block><nu-block>')}</nu-block>`;
    } else if (value instanceof File) {
      value = value.name;
    } else if (value instanceof FileList) {
      const files = [];

      for (const file of value) {
        files.push(file.name);
      }

      value = `</nu-block>${files.join('</nu-block><nu-block>')}</nu-block>`;
    } else if (typeof value === 'object') {
      value = `<pre>${JSON.stringify(value, null, 2)}</pre>`;
    }

    this.host.innerHTML = hasValue ? value : (this.placeholder || '&nbsp;');

    this.setMod('placeholder', !hasValue);
  }
}

export default ValueBehavior;
