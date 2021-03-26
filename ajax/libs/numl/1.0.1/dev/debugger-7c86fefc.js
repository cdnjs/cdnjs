import { C as ComponentBehavior } from './component-8af4ce99.js';
import './index-7da957b6.js';

class DebuggerBehaviour extends ComponentBehavior {
  static get params() {
    return {
      component: 'debugger',
      props: ['target'],
    };
  }
}

export default DebuggerBehaviour;
