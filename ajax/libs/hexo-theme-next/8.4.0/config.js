if (!window.NexT) window.NexT = {};

(function() {
  const className = 'next-config';

  const staticConfig = {};
  let variableConfig = {};

  const parse = (text) => {
    const jsonString = new DOMParser()
      .parseFromString(text, 'text/html').documentElement
      .textContent;
    return JSON.parse(jsonString || '{}');
  };

  const update = (name) => {
    const targetEle = document.querySelector(`.${className}[data-name="${name}"]`);
    if (!targetEle) return;
    const parsedConfig = parse(targetEle.text);
    if (name === 'main') {
      Object.assign(staticConfig, parsedConfig);
    } else {
      variableConfig[name] = parsedConfig;
    }
  };

  update('main');

  window.CONFIG = new Proxy({}, {
    get(overrideConfig, name) {
      let existing;
      if (name in staticConfig) {
        existing = staticConfig[name];
      } else {
        if (!(name in variableConfig)) update(name);
        existing = variableConfig[name];
      }

      let override = overrideConfig[name];
      if (override === undefined && typeof existing === 'object') {
        override = {};
        overrideConfig[name] = override;
      }

      if (typeof override === 'object') {
        return new Proxy({...existing, ...override}, {
          set(target, prop, value) {
            override[prop] = value;
            return true;
          }
        });
      }
      return existing;
    }
  });

  document.addEventListener('pjax:success', () => {
    variableConfig = {};
  });
})();
