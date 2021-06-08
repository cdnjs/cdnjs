import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';
import { mount as enzymeMount } from 'enzyme';
/**
 * Can't just mount <React.Fragment>{node}</React.Fragment>
 * because that swallows wrapper.setProps
 *
 * why class component:
 * https://github.com/airbnb/enzyme/issues/2043
 */
// eslint-disable-next-line react/prefer-stateless-function

class Mode extends React.Component {
  render() {
    // Excess props will come from e.g. enzyme setProps
    const _this$props = this.props,
          {
      __element,
      __strict
    } = _this$props,
          other = _objectWithoutPropertiesLoose(_this$props, ["__element", "__strict"]);

    const Component = __strict ? React.StrictMode : React.Fragment;
    return /*#__PURE__*/React.createElement(Component, null, /*#__PURE__*/React.cloneElement(__element, other));
  }

} // Generate an enhanced mount function.


process.env.NODE_ENV !== "production" ? Mode.propTypes = {
  /**
   * this is essentially children. However we can't use children because then
   * using `wrapper.setProps({ children })` would work differently if this component
   * would be the root.
   */
  __element: PropTypes.element.isRequired,
  __strict: PropTypes.bool.isRequired
} : void 0;
export default function createMount(options = {}) {
  const {
    mount = enzymeMount,
    strict: globalStrict
  } = options,
        globalEnzymeOptions = _objectWithoutPropertiesLoose(options, ["mount", "strict"]);

  const attachTo = document.createElement('div');
  attachTo.className = 'app';
  attachTo.setAttribute('id', 'app');
  document.body.insertBefore(attachTo, document.body.firstChild);

  const mountWithContext = function mountWithContext(node, localOptions = {}) {
    const {
      disableUnnmount = false,
      strict = globalStrict
    } = localOptions,
          localEnzymeOptions = _objectWithoutPropertiesLoose(localOptions, ["disableUnnmount", "strict"]);

    if (!disableUnnmount) {
      ReactDOM.unmountComponentAtNode(attachTo);
    } // some tests require that no other components are in the tree
    // e.g. when doing .instance(), .state() etc.


    return mount(strict == null ? node : /*#__PURE__*/React.createElement(Mode, {
      __element: node,
      __strict: Boolean(strict)
    }), _extends({
      attachTo
    }, globalEnzymeOptions, localEnzymeOptions));
  };

  mountWithContext.attachTo = attachTo;

  mountWithContext.cleanUp = () => {
    ReactDOM.unmountComponentAtNode(attachTo);
    attachTo.parentElement.removeChild(attachTo);
  };

  return mountWithContext;
}