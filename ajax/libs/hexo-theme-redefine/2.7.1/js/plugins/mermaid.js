if (theme.plugins.mermaid.enable === true) {
  try {
    swup.hooks.on("page:view", () => {
      mermaid.initialize();
    });
  } catch (e) {}
}
