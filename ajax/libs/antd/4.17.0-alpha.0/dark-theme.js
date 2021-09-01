const { darkThemeSingle } = require('./theme');
const defaultTheme = require('./default-theme');

module.exports = {
  ...defaultTheme,
  ...darkThemeSingle
}