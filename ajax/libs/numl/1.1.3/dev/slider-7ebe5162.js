import { W as WidgetBehavior, v as getFloatFromAttr, i as isEqual } from './index-e74c1c40.js';

const EVENT_MAP = {
  'mousemove': 'onDragging',
  'touchmove': 'onDragging',
  'mouseup': 'onDragEnd',
  'touchend': 'onDragEnd',
  'contextmenu': 'onDragEnd',
};

class SliderBehavior extends WidgetBehavior {
  static get params() {
    return {
      input: true,
    };
  }

  init() {
    this.props.min = (val) => {
      return getFloatFromAttr(val, 0);
    };
    this.props.max = (val) => {
      return getFloatFromAttr(val, 100);
    };
    this.props.step = (val) => {
      return getFloatFromAttr(val, 1);
    };
    this.props.value = (val) => {
      if (val != null) {
        this.setValue(getFloatFromAttr(val, 0), true);
      }
    };

    super.init();

    this.require('orient', 'active', 'focus', 'hover');

    this.on('keydown', (evt) => {
      const step = this.step * (evt.shiftKey ? 10 : 1);

      switch (evt.key) {
        case 'ArrowUp':
        case 'ArrowRight':
          this.setValue(this.value + step);
          break;
        case 'ArrowDown':
        case 'ArrowLeft':
          this.setValue(this.value - step);
          break;
        default:
          return;
      }

      evt.preventDefault();
    });
  }

  connected() {
    super.connected();

    const { host } = this;

    this.onDragStart = this.onDragStart.bind(this);
    this.onDragging = this.onDragging.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);

    host.nuSetContext('disabled', this.disabled);

    ['mousedown', 'touchstart']
      .forEach(eventName => {
        this.on(eventName, this.onDragStart, { passive: true });
      });
  }

  changed(name, value) {
    super.changed(name, value);

    if (this.isConnected && ['min', 'max'].includes(name)) {
      this.setValue(this.value);
    }
  }

  onDragStart(evt) {
    if (this.disabled) return;

    this.setValueByEvent(evt);
    this.dragging = true;

    Object.entries(EVENT_MAP)
      .forEach(([event, handler]) => {
        window.addEventListener(event, this[handler], { passive: true });
      });
  }

  onDragging(evt) {
    if (this.dragging) {
      this.setValueByEvent(evt);
    }
  }

  onDragEnd(evt) {
    if (this.dragging) {
      // skip, it causes a bug on touch devices where no point information presented on such event
      // this.setValueByEvent(evt);
      this.dragging = false;
      Object.entries(EVENT_MAP)
        .forEach(([event, handler]) => {
          window.removeEventListener(event, this[handler]);
        });
    }
  }

  setValueByEvent(evt) {
    const { host } = this;

    const rect = host.getBoundingClientRect();

    let value;

    this.use('orient').then(Orient => Orient.set(rect.width > rect.height ? 'h' : 'v'));

    if (rect.width > rect.height) {
      const pageX = (evt.pageX || (evt.touches && evt.touches.length && evt.touches[0].pageX)) - window.scrollX;
      value = Math.max(0, Math.min(1,
        (pageX - rect.x) / (rect.width)));
    } else {
      const pageY = (evt.pageY || (evt.touches && evt.touches.length && evt.touches[0].pageY)) - window.scrollY;
      value = 1 - Math.max(0, Math.min(1,
        (pageY - rect.y) / (rect.height)));
    }

    this.setPercents(value);
  }

  setPercents(value) {
    if (value == null) return;

    const min = this.min;
    const max = this.max;
    const step = this.step;

    this.setValue(Math.round(value * (max - min) / step) * step + min);
  }

  setValue(value, silent) {
    const { host } = this;
    const min = this.min;
    const max = this.max;

    if (value !== value) {
      value = min;
    }

    if (value < min) value = min;
    if (value > max) value = max;

    if (isEqual(value, this.value)) return;

    this.value = value;

    host.style.setProperty('--local-offset', this.getOffset(value));

    this.setAria('valuemin', min);
    this.setAria('valuemax', max);
    this.setAria('valuenow', value);

    if (!silent) {
      this.emit('input', value);
    }

    this.control();
  }

  getOffset(value) {
    let min = this.min;
    let max = this.max;

    let offset = (value - min) / (max - min) * 100;

    return `${offset.toFixed(2)}%`;
  }
}

export default SliderBehavior;
