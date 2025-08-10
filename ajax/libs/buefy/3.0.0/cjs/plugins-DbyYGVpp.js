'use strict';

const registerComponent = (Vue, component, name) => {
  const componentName = name || component.name;
  if (componentName == null) {
    throw new Error("Buefy.registerComponent: missing component name");
  }
  Vue.component(componentName, component);
};
const registerComponentProgrammatic = (Vue, property, component) => {
  if (!Vue.config.globalProperties.$buefy) Vue.config.globalProperties.$buefy = {};
  Vue.config.globalProperties.$buefy[property] = component;
};

exports.registerComponent = registerComponent;
exports.registerComponentProgrammatic = registerComponentProgrammatic;
