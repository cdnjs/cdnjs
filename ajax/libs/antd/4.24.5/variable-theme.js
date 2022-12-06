const { variableThemeSingle } = require('./theme');
const defaultTheme = require('./default-theme');

module.exports = {
  ...defaultTheme,
  ...variableThemeSingle
}