(() => {
  // packages/intersect/src/index.js
  function src_default(Alpine) {
    Alpine.directive("intersect", Alpine.skipDuringClone((el, { value, expression, modifiers }, { evaluateLater, cleanup }) => {
      let evaluate = evaluateLater(expression);
      let options = {
        rootMargin: getRootMargin(modifiers),
        threshold: getThreshold(modifiers)
      };
      let observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting === (value === "leave"))
            return;
          evaluate();
          modifiers.includes("once") && observer.disconnect();
        });
      }, options);
      observer.observe(el);
      cleanup(() => {
        observer.disconnect();
      });
    }));
  }
  function getThreshold(modifiers) {
    if (modifiers.includes("full"))
      return 0.99;
    if (modifiers.includes("half"))
      return 0.5;
    if (!modifiers.includes("threshold"))
      return 0;
    let threshold = modifiers[modifiers.indexOf("threshold") + 1];
    if (threshold === "100")
      return 1;
    if (threshold === "0")
      return 0;
    return Number(`.${threshold}`);
  }
  function getLengthValue(rawValue) {
    let match = rawValue.match(/^(-?[0-9]+)(px|%)?$/);
    return match ? match[1] + (match[2] || "px") : void 0;
  }
  function getRootMargin(modifiers) {
    const key = "margin";
    const fallback = "0px 0px 0px 0px";
    const index = modifiers.indexOf(key);
    if (index === -1)
      return fallback;
    let values = [];
    for (let i = 1; i < 5; i++) {
      values.push(getLengthValue(modifiers[index + i] || ""));
    }
    values = values.filter((v) => v !== void 0);
    return values.length ? values.join(" ").trim() : fallback;
  }

  // packages/intersect/builds/cdn.js
  document.addEventListener("alpine:init", () => {
    window.Alpine.plugin(src_default);
  });
})();
