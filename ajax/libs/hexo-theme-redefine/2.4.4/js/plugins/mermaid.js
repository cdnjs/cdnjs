if (Global.theme_config.plugins.mermaid.enable === true) {
  try {
    swup.hooks.on("page:view", () => {
      mermaid.init();
    });
  } catch (e) {}
}
