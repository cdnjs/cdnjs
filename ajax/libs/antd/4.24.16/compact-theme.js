const { compactThemeSingle } = require('./theme');
const defaultTheme = require('./default-theme');

module.exports = {
  ...defaultTheme,
  ...compactThemeSingle
}