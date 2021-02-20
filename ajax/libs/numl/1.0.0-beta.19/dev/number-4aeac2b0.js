import './index-6a06a0ad.js';
import { F as FormatterBehavior } from './formatter-916af8ac.js';
import { n as numberFormat } from './number-a4bed465.js';

class NumberBehavior extends FormatterBehavior {
  static get formatter() {
    return numberFormat;
  }
}

export default NumberBehavior;
