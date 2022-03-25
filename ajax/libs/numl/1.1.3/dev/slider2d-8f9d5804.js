import SliderBehavior from './slider-7ebe5162.js';
import { x as getTwoFloatsFromAttr, W as WidgetBehavior, i as isEqual } from './index-e74c1c40.js';

const EVENT_MAP = {
  'mousemove': 'onDragging',
  'touchmove': 'onDragging',
  'mouseup': 'onDragEnd',
  'touchend': 'onDragEnd',
  'contextmenu': 'onDragEnd',
};

function normalizeValue(value, min, max) {
  if (value !== value) {
    value = min;
  }

  if (value < min) value = min;
  if (value > max) value = max;

  return value;
}

class Slider2dBehavior extends SliderBehavior {
  init() {
    // this.value = [0, 0];
    // this.min = [0, 0];
    // this.max = [100, 100];
    // this.step = [1, 1];

    this.props.min = (val) => {
      return getTwoFloatsFromAttr(val, 0);
    };
    this.props.max = (val) => {
      return getTwoFloatsFromAttr(val, 100);
    };
    this.props.step = (val) => {
      return getTwoFloatsFromAttr(val, 1);
    };
    this.props.value = (val) => {
      if (val != null) {
        this.setValue(getTwoFloatsFromAttr(val, 0), true);
      }
    };

    WidgetBehavior.prototype.init.apply(this);

    this.require('active', 'focus', 'hover');

    this.on('keydown', (evt) => {
      const stepX = this.step[0] * (evt.shiftKey ? 10 : 1);
      const stepY = this.step[1] * (evt.shiftKey ? 10 : 1);

      switch (evt.key) {
        case 'ArrowUp':
          this.setYValue(this.value[1] + stepY);
          break;
        case 'ArrowRight':
          this.setXValue(this.value[0] + stepX);
          break;
        case 'ArrowDown':
          this.setYValue(this.value[1] - stepY);
          break;
        case 'ArrowLeft':
          this.setYValue(this.value[1] - stepX);
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
    const pageX = (evt.pageX || (evt.touches && evt.touches.length && evt.touches[0].pageX)) - window.scrollX;
    const x = Math.max(0, Math.min(1,
        (pageX - rect.x) / (rect.width)));

    const pageY = (evt.pageY || (evt.touches && evt.touches.length && evt.touches[0].pageY)) - window.scrollY;
    const y = 1 - Math.max(0, Math.min(1,
        (pageY - rect.y) / (rect.height)));

    this.setXPercents(x);
    this.setYPercents(y);
  }

  setXPercents(value) {
    if (value == null) return;

    const min = this.min[0];
    const max = this.max[0];
    const step = this.step[0];

    this.setXValue(Math.round(value * (max - min) / step) * step + min);
  }

  setYPercents(value) {
    if (value == null) return;

    const min = this.min[1];
    const max = this.max[1];
    const step = this.step[1];

    this.setYValue(Math.round(value * (max - min) / step) * step + min);
  }

  setXValue(value) {
    const x = this.value[0];

    const min = this.min[0];
    const max = this.max[0];

    value = normalizeValue(value, min, max);

    if (value === x) return;

    this.setValue([value, this.value[1]]);
  }

  setYValue(value) {
    const y = this.value[1];

    const min = this.min[1];
    const max = this.max[1];

    value = normalizeValue(value, min, max);

    if (value === y) return;

    this.setValue([this.value[0], value]);
  }

  setValue(value, silent) {
    const { host } = this;

    if (typeof value === 'string') {
      value = getTwoFloatsFromAttr(value);
    }

    if (!Array.isArray(value)) value = [this.min[0], this.min[1]];

    value = [
      normalizeValue(value[0], this.min[0], this.max[0]),
      normalizeValue(value[1], this.min[1], this.max[1]),
    ];

    if (isEqual(value, this.value)) return;

    this.value = value;

    host.style.setProperty('--local-offset-x', this.getXOffset(value[0]));
    host.style.setProperty('--local-offset-y', this.getYOffset(value[1]));

    if (!silent) {
      this.emit('input', value);
    }

    this.control();
  }

  getXOffset(value) {
    let min = this.min[0];
    let max = this.max[0];

    let offset = (value - min) / (max - min) * 100;

    return `${offset.toFixed(2)}%`;
  }

  getYOffset(value) {
    let min = this.min[1];
    let max = this.max[1];

    let offset = (value - min) / (max - min) * 100;

    return `${offset.toFixed(2)}%`;
  }
}

export default Slider2dBehavior;
