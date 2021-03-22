import { C as ComponentBehavior } from './component-48d0de63.js';
import './index-daa057ce.js';

class DateInputBehaviour extends ComponentBehavior {
  static get params() {
    return {
      input: true,
      localized: true,
      component: 'dateinput',
      props: ['value', 'begin', 'end', 'mode', 'host', 'placeholder'],
    };
  }
}

export default DateInputBehaviour;
