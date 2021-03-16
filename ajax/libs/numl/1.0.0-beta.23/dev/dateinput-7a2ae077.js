import './index-903a7eb6.js';
import { C as ComponentBehavior } from './component-513dc429.js';

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
