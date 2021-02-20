import './index-6a06a0ad.js';
import { C as ComponentBehavior } from './component-97189c12.js';

class DebuggerBehaviour extends ComponentBehavior {
  static get params() {
    return {
      component: 'debugger',
      props: ['target'],
    };
  }
}

export default DebuggerBehaviour;
