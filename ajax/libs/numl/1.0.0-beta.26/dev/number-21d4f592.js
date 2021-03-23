import { F as FormatterBehavior } from './formatter-4fa0f9d3.js';
import { n as numberFormat } from './number-cbe7d4dd.js';
import './index-0902736c.js';

class NumberBehavior extends FormatterBehavior {
  static get formatter() {
    return numberFormat;
  }
}

export default NumberBehavior;
