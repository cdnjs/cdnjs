import { C as ComponentBehavior } from './component-67837f6e.js';
import './index-e74c1c40.js';

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
