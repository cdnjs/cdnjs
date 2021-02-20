import './index-6a06a0ad.js';
import { C as ComponentBehavior } from './component-97189c12.js';

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
