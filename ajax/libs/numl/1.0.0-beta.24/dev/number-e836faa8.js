import { F as FormatterBehavior } from './formatter-6fa3e51b.js';
import { n as numberFormat } from './number-c98f63d8.js';
import './index-99934d20.js';

class NumberBehavior extends FormatterBehavior {
  static get formatter() {
    return numberFormat;
  }
}

export default NumberBehavior;
