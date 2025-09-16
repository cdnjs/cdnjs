'use strict';

const registerComponent = (Vue, component, name) => {
  const componentName = name || component.name;
  if (componentName == null) {
    throw new Error("Buefy.registerComponent: missing component name");
  }
  Vue.component(componentName, component);
};
const registerComponentProgrammatic = (Vue, property, component, injectionKey) => {
  if (!Vue.config.globalProperties.$buefy) Vue.config.globalProperties.$buefy = {};
  Vue.config.globalProperties.$buefy[property] = component;
  Vue.provide(injectionKey, component);
};

exports.registerComponent = registerComponent;
exports.registerComponentProgrammatic = registerComponentProgrammatic;
