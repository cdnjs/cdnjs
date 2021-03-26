import { C as ComponentBehavior } from './component-8af4ce99.js';
import './index-7da957b6.js';

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
