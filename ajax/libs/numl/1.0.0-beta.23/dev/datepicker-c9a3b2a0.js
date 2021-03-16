import './index-903a7eb6.js';
import { C as ComponentBehavior } from './component-513dc429.js';

class DatePickerBehaviour extends ComponentBehavior {
  static get params() {
    return {
      input: true,
      localized: true,
      component: 'datepicker',
      provideValue: false,
      props: ['value', 'begin', 'end', 'mode', 'lang', 'host'],
    };
  }
}

export default DatePickerBehaviour;
