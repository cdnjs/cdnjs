import { C as ComponentBehavior } from './component-ccd3f174.js';
import './index-b33ae2bb.js';

class DebuggerBehaviour extends ComponentBehavior {
  static get params() {
    return {
      component: 'debugger',
      props: ['target'],
    };
  }
}

export default DebuggerBehaviour;
