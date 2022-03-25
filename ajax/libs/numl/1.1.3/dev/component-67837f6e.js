import { F as extractModule, W as WidgetBehavior, t as devMode, l as log, G as toCamelCase, i as isEqual } from './index-e74c1c40.js';

var Components = {
  datepicker: () => extractModule(import('./datepicker-3ec0ac36.js')),
  dateinput: () => extractModule(import('./dateinput-827fd3da.js')),
  debugger: () => extractModule(import('./debugger-edbb31b1.js')),
};

class ComponentBehavior extends WidgetBehavior {
  static get params() {
    return {
      primary: true,
      provideValue: false,
      props: ['host'],
    };
  }

  constructor(host, params) {
    super(host, params);

    const loader = Components[this.params.component || params.split(/\s/)[0]];

    if (loader) {
      this.componentPromise = loader();
    }
  }

  init() {
    this.props.type = 'date';

    super.init();

    const { host } = this;

    this.componentPromise
      .then(Component => {
        const target = this.isShadowAllowed
          ? host.attachShadow({ mode: 'open' }) : host;

        if (target === host) {
          this.setMod('host', true);
        }

        this.Component = Component;

        if (devMode) {
          log('create component with state', this.componentProps);
        }

        this.component = new Component({
          target,
          props: this.componentProps,
        });

        this.component.$on('input', (event) => {
          this.setValue(event.detail, true);
          this.emit('input', event.detail);
          this.doActions(event.detail);
        });
      });
  }

  get componentProps() {
    const props = [...this.params.props]
      .reduce((data, attr) => {
        if (attr === 'lang') {
          attr = 'locale';
        }

        data[toCamelCase(attr)] = this[attr];

        return data;
      }, {});

    if (this.params.props.includes('lang')) {
      props.locale = props.locale || 'en';
    }

    return props;
  }

  changed(name, value) {
    super.changed(name, value);

    if (name === 'lang') {
      name = 'locale';
    }

    if (this.component) {
      const prototype = this.Component.prototype;

      if (name in prototype) {
        this.set({ [name]: this[name] });
      }
    }
  }

  set(data) {
    log('set component state', data);
    if (typeof data === 'object' && this.component) {
      this.component.$set(data);

      return true;
    } else {
      return false;
    }
  }

  setValue(value, silent) {
    if (isEqual(value, this.value)) return;

    super.setValue(value, silent || !this.component);

    this.set({ value });
  }
}

export { ComponentBehavior as C };
