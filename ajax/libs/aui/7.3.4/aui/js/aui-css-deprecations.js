/*!
 * @atlassian/aui - Atlassian User Interface Framework
 * @version v7.3.4
 * @link https://docs.atlassian.com/aui/latest/
 * @license SEE LICENSE IN LICENSE.md
 * @author Atlassian Pty Ltd.
 */
// src/js/aui-css-deprecations.js
(typeof window === 'undefined' ? global : window).__5da98071ced051dcfcbdcd443e8fa73a = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  var _deprecation = __9feed2cd031dda809b84ccc68552fd5e;
  
  var _amdify = __12d695ed1a919c5abd72fab59b642068;
  
  var _amdify2 = _interopRequireDefault(_amdify);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  (0, _deprecation.css)('.aui-badge', {
      displayName: 'AUI Badges class'
  });
  (0, _deprecation.css)('.aui-dropdown2-trigger.aui-style-dropdown2triggerlegacy1', {
      displayName: 'Dropdown2 legacy trigger'
  });
  (0, _deprecation.css)('.aui-message span.aui-icon', {
      displayName: 'Message icon span'
  });
  (0, _deprecation.css)('.aui-zebra', {
      displayName: 'Zebra table rows'
  });
  (0, _deprecation.css)('.aui-nav-pagination > li.aui-nav-current', {
      alternativeName: 'aui-nav-selected'
  });
  (0, _deprecation.css)('.aui-tabs.vertical-tabs', {
      displayName: 'Vertical tabs'
  });
  (0, _deprecation.css)('form.aui span.content');
  (0, _deprecation.css)(['form.aui .button', 'form.aui .buttons-container'], {
      displayName: 'Unprefixed buttons',
      alternativeName: 'aui-button and aui-buttons'
  });
  (0, _deprecation.css)(['form.aui .icon-date', 'form.aui .icon-range', 'form.aui .icon-help', 'form.aui .icon-required', 'form.aui .icon-inline-help', 'form.aui .icon-users', '.aui-icon-date', '.aui-icon-range', '.aui-icon-help', '.aui-icon-required', '.aui-icon-users', '.aui-icon-inline-help'], {
      displayName: 'Form icons'
  });
  (0, _deprecation.css)(['.aui-icon.icon-move-d', '.aui-icon.icon-move', '.aui-icon.icon-dropdown-d', '.aui-icon.icon-dropdown', '.aui-icon.icon-dropdown-active-d', '.aui-icon.icon-dropdown-active', '.aui-icon.icon-minimize-d', '.aui-icon.icon-minimize', '.aui-icon.icon-maximize-d', '.aui-icon.icon-maximize'], {
      displayName: 'Core icons'
  });
  (0, _deprecation.css)(['.aui-message.error', '.aui-message.warning', '.aui-message.hint', '.aui-message.info', '.aui-message.success'], {
      displayName: 'Unprefixed message types AUI-2150'
  });
  (0, _deprecation.css)(['.aui-dropdown2 .active', '.aui-dropdown2 .checked', '.aui-dropdown2 .disabled', '.aui-dropdown2 .interactive'], {
      displayName: 'Unprefixed dropdown2 css AUI-2150'
  });
  
  (0, _deprecation.css)(['aui-page-header-marketing', 'aui-page-header-hero'], {
      displayName: 'Marketing style headings'
  });
  
  // 5.9.0
  // -----
  
  var fiveNineZero = {
      // Inline Dialog
      'arrow': 'aui-inline-dialog-arrow',
      'contents': 'aui-inline-dialog-contents',
  
      // Messages
      'error': 'aui-message-error',
      'generic': 'aui-message-generic',
      'hint': 'aui-message-hint',
      'info': 'aui-message-info',
      'success': 'aui-message-success',
      'warning': 'aui-message-warning'
  };
  var name;
  
  for (name in fiveNineZero) {
      if (Object.hasOwnProperty.call(fiveNineZero, name)) {
          (0, _deprecation.css)(name, {
              alternativeName: fiveNineZero[name],
              removeVersion: '8.0.0',
              sinceVersion: '5.9.0'
          });
      }
  }
  
  // 6.1.0
  // -----
  
  (0, _deprecation.css)(['.aui-header-logo-atlassian', '.aui-header-logo-aui', '.aui-header-logo-bamboo', '.aui-header-logo-bitbucket', '.aui-header-logo-stash', '.aui-header-logo-clover', '.aui-header-logo-confluence', '.aui-header-logo-crowd', '.aui-header-logo-crucible', '.aui-header-logo-fecru', '.aui-header-logo-fisheye', '.aui-header-logo-hipchat', '.aui-header-logo-jira', '.aui-header-logo-jira-core', '.aui-header-logo-jira-software', '.aui-header-logo-jira-service-desk', '.aui-header-logo-answer', '.aui-header-logo-community', '.aui-header-logo-developers', '.aui-header-logo-expert', '.aui-header-logo-partner-program', '.aui-header-logo-marketplace', '.aui-header-logo-support', '.aui-header-logo-university', '.aui-header-logo-cloud'], {
      displayName: 'Atlassian Brand Logos'
  });
  
  // 7.1.0
  // -----
  
  (0, _deprecation.css)('.aui-badge', {
      displayName: 'AUI Badge CSS class',
      alternativeName: 'aui-badge',
      sinceVersion: '7.1.0',
      extraInfo: 'The badge pattern is best used as a web component instead of a CSS class'
  });
  
  (0, _amdify2.default)('aui/css-deprecation-warnings');
  
  return module.exports;
}).call(this);