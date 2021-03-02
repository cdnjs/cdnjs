import './index-78d32569.js';
import { F as FormatterBehavior } from './formatter-ebf19751.js';
import { n as numberFormat } from './number-e0f29998.js';

class NumberBehavior extends FormatterBehavior {
  static get formatter() {
    return numberFormat;
  }
}

export default NumberBehavior;
