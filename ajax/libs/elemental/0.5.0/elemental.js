(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Elemental = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

exports.Alert = require('./components/Alert');
exports.BlankState = require('./components/BlankState');
exports.Button = require('./components/Button');
exports.ButtonGroup = require('./components/ButtonGroup');
exports.Checkbox = require('./components/Checkbox');
exports.Card = require('./components/Card');
exports.Col = require('./components/Col');
exports.Container = require('./components/Container');
exports.Dropdown = require('./components/Dropdown');
exports.EmailInputGroup = require('./components/EmailInputGroup');
exports.FileDragAndDrop = require('./components/FileDragAndDrop');
exports.FileUpload = require('./components/FileUpload');
exports.Form = require('./components/Form');
exports.FormField = require('./components/FormField');
exports.FormIcon = require('./components/FormIcon');
exports.FormIconField = require('./components/FormIconField');
exports.FormInput = require('./components/FormInput');
exports.FormLabel = require('./components/FormLabel');
exports.FormNote = require('./components/FormNote');
exports.FormRow = require('./components/FormRow');
exports.FormSelect = require('./components/FormSelect');
exports.Glyph = require('./components/Glyph');
exports.InputGroup = require('./components/InputGroup');
exports.InputGroupSection = require('./components/InputGroupSection');
exports.Modal = require('./components/Modal');
exports.ModalBody = require('./components/ModalBody');
exports.ModalFooter = require('./components/ModalFooter');
exports.ModalHeader = require('./components/ModalHeader');
exports.Pagination = require('./components/Pagination');
exports.PasswordInputGroup = require('./components/PasswordInputGroup');
exports.Pill = require('./components/Pill');
exports.Radio = require('./components/Radio');
exports.ResponsiveText = require('./components/ResponsiveText');
exports.Row = require('./components/Row');
exports.RadioGroup = require('./components/RadioGroup');
exports.SegmentedControl = require('./components/SegmentedControl');
exports.Spinner = require('./components/Spinner');
exports.Table = require('./components/Table');

},{"./components/Alert":3,"./components/BlankState":4,"./components/Button":5,"./components/ButtonGroup":6,"./components/Card":7,"./components/Checkbox":8,"./components/Col":9,"./components/Container":10,"./components/Dropdown":11,"./components/EmailInputGroup":12,"./components/FileDragAndDrop":13,"./components/FileUpload":14,"./components/Form":15,"./components/FormField":16,"./components/FormIcon":17,"./components/FormIconField":18,"./components/FormInput":19,"./components/FormLabel":20,"./components/FormNote":21,"./components/FormRow":22,"./components/FormSelect":23,"./components/Glyph":24,"./components/InputGroup":25,"./components/InputGroupSection":26,"./components/Modal":27,"./components/ModalBody":28,"./components/ModalFooter":29,"./components/ModalHeader":30,"./components/Pagination":31,"./components/PasswordInputGroup":32,"./components/Pill":33,"./components/Radio":34,"./components/RadioGroup":35,"./components/ResponsiveText":36,"./components/Row":37,"./components/SegmentedControl":38,"./components/Spinner":39,"./components/Table":40}],2:[function(require,module,exports){
'use strict';

var list = [{ label: 'Alert', value: 'alert', className: 'octicon octicon-alert' }, { label: 'Arrow Down', value: 'arrow-down', className: 'octicon octicon-arrow-down' }, { label: 'Arrow Left', value: 'arrow-left', className: 'octicon octicon-arrow-left' }, { label: 'Arrow Right', value: 'arrow-right', className: 'octicon octicon-arrow-right' }, { label: 'Arrow Small-down', value: 'arrow-small-down', className: 'octicon octicon-arrow-small-down' }, { label: 'Arrow Small-left', value: 'arrow-small-left', className: 'octicon octicon-arrow-small-left' }, { label: 'Arrow Small-right', value: 'arrow-small-right', className: 'octicon octicon-arrow-small-right' }, { label: 'Arrow Small-up', value: 'arrow-small-up', className: 'octicon octicon-arrow-small-up' }, { label: 'Arrow Up', value: 'arrow-up', className: 'octicon octicon-arrow-up' }, { label: 'Microscope', value: 'microscope', className: 'octicon octicon-microscope' }, { label: 'Beaker', value: 'beaker', className: 'octicon octicon-beaker' }, { label: 'Bell', value: 'bell', className: 'octicon octicon-bell' }, { label: 'Book', value: 'book', className: 'octicon octicon-book' }, { label: 'Bookmark', value: 'bookmark', className: 'octicon octicon-bookmark' }, { label: 'Briefcase', value: 'briefcase', className: 'octicon octicon-briefcase' }, { label: 'Broadcast', value: 'broadcast', className: 'octicon octicon-broadcast' }, { label: 'Browser', value: 'browser', className: 'octicon octicon-browser' }, { label: 'Bug', value: 'bug', className: 'octicon octicon-bug' }, { label: 'Calendar', value: 'calendar', className: 'octicon octicon-calendar' }, { label: 'Check', value: 'check', className: 'octicon octicon-check' }, { label: 'Checklist', value: 'checklist', className: 'octicon octicon-checklist' }, { label: 'Chevron Down', value: 'chevron-down', className: 'octicon octicon-chevron-down' }, { label: 'Chevron Left', value: 'chevron-left', className: 'octicon octicon-chevron-left' }, { label: 'Chevron Right', value: 'chevron-right', className: 'octicon octicon-chevron-right' }, { label: 'Chevron Up', value: 'chevron-up', className: 'octicon octicon-chevron-up' }, { label: 'Circle Slash', value: 'circle-slash', className: 'octicon octicon-circle-slash' }, { label: 'Circuit Board', value: 'circuit-board', className: 'octicon octicon-circuit-board' }, { label: 'Clippy', value: 'clippy', className: 'octicon octicon-clippy' }, { label: 'Clock', value: 'clock', className: 'octicon octicon-clock' }, { label: 'Cloud Download', value: 'cloud-download', className: 'octicon octicon-cloud-download' }, { label: 'Cloud Upload', value: 'cloud-upload', className: 'octicon octicon-cloud-upload' }, { label: 'Code', value: 'code', className: 'octicon octicon-code' }, { label: 'Color Mode', value: 'color-mode', className: 'octicon octicon-color-mode' }, { label: 'Comment Add', value: 'comment-add', className: 'octicon octicon-comment-add' }, { label: 'Comment', value: 'comment', className: 'octicon octicon-comment' }, { label: 'Comment Discussion', value: 'comment-discussion', className: 'octicon octicon-comment-discussion' }, { label: 'Credit Card', value: 'credit-card', className: 'octicon octicon-credit-card' }, { label: 'Dash', value: 'dash', className: 'octicon octicon-dash' }, { label: 'Dashboard', value: 'dashboard', className: 'octicon octicon-dashboard' }, { label: 'Database', value: 'database', className: 'octicon octicon-database' }, { label: 'Clone', value: 'clone', className: 'octicon octicon-clone' }, { label: 'Desktop Download', value: 'desktop-download', className: 'octicon octicon-desktop-download' }, { label: 'Device Camera', value: 'device-camera', className: 'octicon octicon-device-camera' }, { label: 'Device Camera-video', value: 'device-camera-video', className: 'octicon octicon-device-camera-video' }, { label: 'Device Desktop', value: 'device-desktop', className: 'octicon octicon-device-desktop' }, { label: 'Device Mobile', value: 'device-mobile', className: 'octicon octicon-device-mobile' }, { label: 'Diff', value: 'diff', className: 'octicon octicon-diff' }, { label: 'Diff Added', value: 'diff-added', className: 'octicon octicon-diff-added' }, { label: 'Diff Ignored', value: 'diff-ignored', className: 'octicon octicon-diff-ignored' }, { label: 'Diff Modified', value: 'diff-modified', className: 'octicon octicon-diff-modified' }, { label: 'Diff Removed', value: 'diff-removed', className: 'octicon octicon-diff-removed' }, { label: 'Diff Renamed', value: 'diff-renamed', className: 'octicon octicon-diff-renamed' }, { label: 'Ellipsis', value: 'ellipsis', className: 'octicon octicon-ellipsis' }, { label: 'Eye Unwatch', value: 'eye-unwatch', className: 'octicon octicon-eye-unwatch' }, { label: 'Eye Watch', value: 'eye-watch', className: 'octicon octicon-eye-watch' }, { label: 'Eye', value: 'eye', className: 'octicon octicon-eye' }, { label: 'File Binary', value: 'file-binary', className: 'octicon octicon-file-binary' }, { label: 'File Code', value: 'file-code', className: 'octicon octicon-file-code' }, { label: 'File Directory', value: 'file-directory', className: 'octicon octicon-file-directory' }, { label: 'File Media', value: 'file-media', className: 'octicon octicon-file-media' }, { label: 'File Pdf', value: 'file-pdf', className: 'octicon octicon-file-pdf' }, { label: 'File Submodule', value: 'file-submodule', className: 'octicon octicon-file-submodule' }, { label: 'File Symlink-directory', value: 'file-symlink-directory', className: 'octicon octicon-file-symlink-directory' }, { label: 'File Symlink-file', value: 'file-symlink-file', className: 'octicon octicon-file-symlink-file' }, { label: 'File Text', value: 'file-text', className: 'octicon octicon-file-text' }, { label: 'File Zip', value: 'file-zip', className: 'octicon octicon-file-zip' }, { label: 'Flame', value: 'flame', className: 'octicon octicon-flame' }, { label: 'Fold', value: 'fold', className: 'octicon octicon-fold' }, { label: 'Gear', value: 'gear', className: 'octicon octicon-gear' }, { label: 'Gift', value: 'gift', className: 'octicon octicon-gift' }, { label: 'Gist', value: 'gist', className: 'octicon octicon-gist' }, { label: 'Gist Secret', value: 'gist-secret', className: 'octicon octicon-gist-secret' }, { label: 'Git Branch-create', value: 'git-branch-create', className: 'octicon octicon-git-branch-create' }, { label: 'Git Branch-delete', value: 'git-branch-delete', className: 'octicon octicon-git-branch-delete' }, { label: 'Git Branch', value: 'git-branch', className: 'octicon octicon-git-branch' }, { label: 'Git Commit', value: 'git-commit', className: 'octicon octicon-git-commit' }, { label: 'Git Compare', value: 'git-compare', className: 'octicon octicon-git-compare' }, { label: 'Git Merge', value: 'git-merge', className: 'octicon octicon-git-merge' }, { label: 'Git Pull-request-abandoned', value: 'git-pull-request-abandoned', className: 'octicon octicon-git-pull-request-abandoned' }, { label: 'Git Pull-request', value: 'git-pull-request', className: 'octicon octicon-git-pull-request' }, { label: 'Globe', value: 'globe', className: 'octicon octicon-globe' }, { label: 'Graph', value: 'graph', className: 'octicon octicon-graph' }, { label: 'Heart', value: 'heart', className: 'octicon octicon-heart' }, { label: 'History', value: 'history', className: 'octicon octicon-history' }, { label: 'Home', value: 'home', className: 'octicon octicon-home' }, { label: 'Horizontal Rule', value: 'horizontal-rule', className: 'octicon octicon-horizontal-rule' }, { label: 'Hubot', value: 'hubot', className: 'octicon octicon-hubot' }, { label: 'Inbox', value: 'inbox', className: 'octicon octicon-inbox' }, { label: 'Info', value: 'info', className: 'octicon octicon-info' }, { label: 'Issue Closed', value: 'issue-closed', className: 'octicon octicon-issue-closed' }, { label: 'Issue Opened', value: 'issue-opened', className: 'octicon octicon-issue-opened' }, { label: 'Issue Reopened', value: 'issue-reopened', className: 'octicon octicon-issue-reopened' }, { label: 'Jersey', value: 'jersey', className: 'octicon octicon-jersey' }, { label: 'Key', value: 'key', className: 'octicon octicon-key' }, { label: 'Keyboard', value: 'keyboard', className: 'octicon octicon-keyboard' }, { label: 'Law', value: 'law', className: 'octicon octicon-law' }, { label: 'Light Bulb', value: 'light-bulb', className: 'octicon octicon-light-bulb' }, { label: 'Link', value: 'link', className: 'octicon octicon-link' }, { label: 'Link External', value: 'link-external', className: 'octicon octicon-link-external' }, { label: 'List Ordered', value: 'list-ordered', className: 'octicon octicon-list-ordered' }, { label: 'List Unordered', value: 'list-unordered', className: 'octicon octicon-list-unordered' }, { label: 'Location', value: 'location', className: 'octicon octicon-location' }, { label: 'Gist Private', value: 'gist-private', className: 'octicon octicon-gist-private' }, { label: 'Mirror Private', value: 'mirror-private', className: 'octicon octicon-mirror-private' }, { label: 'Git Fork-private', value: 'git-fork-private', className: 'octicon octicon-git-fork-private' }, { label: 'Lock', value: 'lock', className: 'octicon octicon-lock' }, { label: 'Logo Github', value: 'logo-github', className: 'octicon octicon-logo-github' }, { label: 'Mail', value: 'mail', className: 'octicon octicon-mail' }, { label: 'Mail Read', value: 'mail-read', className: 'octicon octicon-mail-read' }, { label: 'Mail Reply', value: 'mail-reply', className: 'octicon octicon-mail-reply' }, { label: 'Mark Github', value: 'mark-github', className: 'octicon octicon-mark-github' }, { label: 'Markdown', value: 'markdown', className: 'octicon octicon-markdown' }, { label: 'Megaphone', value: 'megaphone', className: 'octicon octicon-megaphone' }, { label: 'Mention', value: 'mention', className: 'octicon octicon-mention' }, { label: 'Milestone', value: 'milestone', className: 'octicon octicon-milestone' }, { label: 'Mirror Public', value: 'mirror-public', className: 'octicon octicon-mirror-public' }, { label: 'Mirror', value: 'mirror', className: 'octicon octicon-mirror' }, { label: 'Mortar Board', value: 'mortar-board', className: 'octicon octicon-mortar-board' }, { label: 'Mute', value: 'mute', className: 'octicon octicon-mute' }, { label: 'No Newline', value: 'no-newline', className: 'octicon octicon-no-newline' }, { label: 'Octoface', value: 'octoface', className: 'octicon octicon-octoface' }, { label: 'Organization', value: 'organization', className: 'octicon octicon-organization' }, { label: 'Package', value: 'package', className: 'octicon octicon-package' }, { label: 'Paintcan', value: 'paintcan', className: 'octicon octicon-paintcan' }, { label: 'Pencil', value: 'pencil', className: 'octicon octicon-pencil' }, { label: 'Person Add', value: 'person-add', className: 'octicon octicon-person-add' }, { label: 'Person Follow', value: 'person-follow', className: 'octicon octicon-person-follow' }, { label: 'Person', value: 'person', className: 'octicon octicon-person' }, { label: 'Pin', value: 'pin', className: 'octicon octicon-pin' }, { label: 'Plug', value: 'plug', className: 'octicon octicon-plug' }, { label: 'Repo Create', value: 'repo-create', className: 'octicon octicon-repo-create' }, { label: 'Gist New', value: 'gist-new', className: 'octicon octicon-gist-new' }, { label: 'File Directory-create', value: 'file-directory-create', className: 'octicon octicon-file-directory-create' }, { label: 'File Add', value: 'file-add', className: 'octicon octicon-file-add' }, { label: 'Plus', value: 'plus', className: 'octicon octicon-plus' }, { label: 'Primitive Dot', value: 'primitive-dot', className: 'octicon octicon-primitive-dot' }, { label: 'Primitive Square', value: 'primitive-square', className: 'octicon octicon-primitive-square' }, { label: 'Pulse', value: 'pulse', className: 'octicon octicon-pulse' }, { label: 'Question', value: 'question', className: 'octicon octicon-question' }, { label: 'Quote', value: 'quote', className: 'octicon octicon-quote' }, { label: 'Radio Tower', value: 'radio-tower', className: 'octicon octicon-radio-tower' }, { label: 'Repo Delete', value: 'repo-delete', className: 'octicon octicon-repo-delete' }, { label: 'Repo', value: 'repo', className: 'octicon octicon-repo' }, { label: 'Repo Clone', value: 'repo-clone', className: 'octicon octicon-repo-clone' }, { label: 'Repo Force-push', value: 'repo-force-push', className: 'octicon octicon-repo-force-push' }, { label: 'Gist Fork', value: 'gist-fork', className: 'octicon octicon-gist-fork' }, { label: 'Repo Forked', value: 'repo-forked', className: 'octicon octicon-repo-forked' }, { label: 'Repo Pull', value: 'repo-pull', className: 'octicon octicon-repo-pull' }, { label: 'Repo Push', value: 'repo-push', className: 'octicon octicon-repo-push' }, { label: 'Rocket', value: 'rocket', className: 'octicon octicon-rocket' }, { label: 'Rss', value: 'rss', className: 'octicon octicon-rss' }, { label: 'Ruby', value: 'ruby', className: 'octicon octicon-ruby' }, { label: 'Screen Full', value: 'screen-full', className: 'octicon octicon-screen-full' }, { label: 'Screen Normal', value: 'screen-normal', className: 'octicon octicon-screen-normal' }, { label: 'Search Save', value: 'search-save', className: 'octicon octicon-search-save' }, { label: 'Search', value: 'search', className: 'octicon octicon-search' }, { label: 'Server', value: 'server', className: 'octicon octicon-server' }, { label: 'Settings', value: 'settings', className: 'octicon octicon-settings' }, { label: 'Shield', value: 'shield', className: 'octicon octicon-shield' }, { label: 'Log In', value: 'log-in', className: 'octicon octicon-log-in' }, { label: 'Sign In', value: 'sign-in', className: 'octicon octicon-sign-in' }, { label: 'Log Out', value: 'log-out', className: 'octicon octicon-log-out' }, { label: 'Sign Out', value: 'sign-out', className: 'octicon octicon-sign-out' }, { label: 'Squirrel', value: 'squirrel', className: 'octicon octicon-squirrel' }, { label: 'Star Add', value: 'star-add', className: 'octicon octicon-star-add' }, { label: 'Star Delete', value: 'star-delete', className: 'octicon octicon-star-delete' }, { label: 'Star', value: 'star', className: 'octicon octicon-star' }, { label: 'Stop', value: 'stop', className: 'octicon octicon-stop' }, { label: 'Repo Sync', value: 'repo-sync', className: 'octicon octicon-repo-sync' }, { label: 'Sync', value: 'sync', className: 'octicon octicon-sync' }, { label: 'Tag Remove', value: 'tag-remove', className: 'octicon octicon-tag-remove' }, { label: 'Tag Add', value: 'tag-add', className: 'octicon octicon-tag-add' }, { label: 'Tag', value: 'tag', className: 'octicon octicon-tag' }, { label: 'Telescope', value: 'telescope', className: 'octicon octicon-telescope' }, { label: 'Terminal', value: 'terminal', className: 'octicon octicon-terminal' }, { label: 'Three Bars', value: 'three-bars', className: 'octicon octicon-three-bars' }, { label: 'Thumbsdown', value: 'thumbsdown', className: 'octicon octicon-thumbsdown' }, { label: 'Thumbsup', value: 'thumbsup', className: 'octicon octicon-thumbsup' }, { label: 'Tools', value: 'tools', className: 'octicon octicon-tools' }, { label: 'Trashcan', value: 'trashcan', className: 'octicon octicon-trashcan' }, { label: 'Triangle Down', value: 'triangle-down', className: 'octicon octicon-triangle-down' }, { label: 'Triangle Left', value: 'triangle-left', className: 'octicon octicon-triangle-left' }, { label: 'Triangle Right', value: 'triangle-right', className: 'octicon octicon-triangle-right' }, { label: 'Triangle Up', value: 'triangle-up', className: 'octicon octicon-triangle-up' }, { label: 'Unfold', value: 'unfold', className: 'octicon octicon-unfold' }, { label: 'Unmute', value: 'unmute', className: 'octicon octicon-unmute' }, { label: 'Versions', value: 'versions', className: 'octicon octicon-versions' }, { label: 'Watch', value: 'watch', className: 'octicon octicon-watch' }, { label: 'Remove Close', value: 'remove-close', className: 'octicon octicon-remove-close' }, { label: 'X', value: 'x', className: 'octicon octicon-x' }, { label: 'Zap', value: 'zap', className: 'octicon octicon-zap' }];

var map = {};
list.forEach(function (icon) {
	map[icon.value] = icon;
});
function pluck(arr, key) {
	return arr.map(function (obj) {
		return obj[key];
	});
}

module.exports = {
	list: list,
	keys: pluck(list, 'value'),
	map: map
};

},{}],3:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var classNames = require('classnames');

var ALERT_TYPES = ['danger', 'error', // alias for danger
'info', 'primary', 'success', 'warning'];

module.exports = React.createClass({
	displayName: 'ElementalAlert',
	propTypes: {
		children: React.PropTypes.node.isRequired,
		className: React.PropTypes.string,
		type: React.PropTypes.oneOf(ALERT_TYPES).isRequired
	},
	render: function render() {
		var componentClass = classNames('Alert', 'Alert--' + this.props.type, this.props.className);

		return React.createElement(
			'div',
			{ className: componentClass },
			this.props.children
		);
	}
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"classnames":undefined}],4:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

module.exports = React.createClass({
	displayName: 'BlankState',
	propTypes: {
		children: React.PropTypes.node.isRequired
	},
	render: function render() {
		return React.createElement('div', _extends({ className: 'BlankState' }, this.props));
	}
});

module.exports.Heading = React.createClass({
	displayName: 'BlankStateHeading',
	propTypes: {
		children: React.PropTypes.node.isRequired
	},
	render: function render() {
		return React.createElement('h2', _extends({ className: 'BlankState__heading' }, this.props));
	}
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],5:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var classNames = require('classnames');
var blacklist = require('blacklist');

var BUTTON_SIZES = ['lg', 'sm', 'xs'];

var BUTTON_TYPES = ['default', 'default-primary', 'default-success', 'default-warning', 'default-danger', 'hollow-primary', 'hollow-success', 'hollow-warning', 'hollow-danger', 'primary', 'success', 'warning', 'danger', 'link', 'link-text', 'link-cancel', 'link-delete'];

module.exports = React.createClass({
	displayName: 'Button',
	propTypes: {
		block: React.PropTypes.bool,
		className: React.PropTypes.string,
		href: React.PropTypes.string,
		isActive: React.PropTypes.bool,
		size: React.PropTypes.oneOf(BUTTON_SIZES),
		submit: React.PropTypes.bool,
		type: React.PropTypes.oneOf(BUTTON_TYPES)
	},
	getDefaultProps: function getDefaultProps() {
		return {
			type: 'default'
		};
	},
	render: function render() {
		// classes
		var componentClass = classNames('Button', 'Button--' + this.props.type, this.props.size ? 'Button--' + this.props.size : null, {
			'Button--block': this.props.block,
			'is-active': this.props.isActive
		}, this.props.className);

		// props
		var props = blacklist(this.props, 'type', 'size', 'className');
		props.className = componentClass;

		var tag = 'button';
		props.type = this.props.submit ? 'submit' : 'button';

		if (props.href) {
			tag = 'a';
			props.type = null;
		}

		return React.createElement(tag, props, this.props.children);
	}
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"blacklist":undefined,"classnames":undefined}],6:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var classnames = require('classnames');
var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

module.exports = React.createClass({
	displayName: 'ButtonGroup',
	propTypes: {
		children: React.PropTypes.node.isRequired,
		className: React.PropTypes.string
	},
	render: function render() {
		var className = classnames('ButtonGroup', this.props.className);
		return React.createElement('div', _extends({}, this.props, { className: className }));
	}
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"classnames":undefined}],7:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

module.exports = React.createClass({
	displayName: 'Card',
	propTypes: {
		children: React.PropTypes.node.isRequired,
		style: React.PropTypes.object
	},
	render: function render() {
		var style = {
			backgroundColor: 'white',
			borderRadius: _constants2['default'].borderRadius.sm,
			boxShadow: '0 2px 3px rgba(0, 0, 0, 0.075), 0 0 0 1px rgba(0,0,0,0.1)',
			marginBottom: _constants2['default'].spacing.md,
			padding: _constants2['default'].spacing.md
		};
		return React.createElement('div', _extends({}, this.props, { style: _extends(style, this.props.style) }));
	}
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../constants":41}],8:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var blacklist = require('blacklist');
var classNames = require('classnames');
var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var Checkbox = React.createClass({
	displayName: 'Checkbox',

	propTypes: {
		className: React.PropTypes.string,
		disabled: React.PropTypes.bool,
		focusOnMount: React.PropTypes.bool,
		indeterminate: React.PropTypes.bool,
		inline: React.PropTypes.bool,
		label: React.PropTypes.string,
		style: React.PropTypes.object,
		title: React.PropTypes.string
	},

	componentDidMount: function componentDidMount() {
		if (this.props.focusOnMount) {
			this.refs.target.focus();
		}
		this.setIndeterminate(this.props.indeterminate);
	},

	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		this.setIndeterminate(nextProps.indeterminate);
	},

	setIndeterminate: function setIndeterminate(value) {
		this.refs.target.indeterminate = value;
	},

	render: function render() {
		var componentClass = classNames('Checkbox', {
			'Checkbox--disabled': this.props.disabled,
			'Checkbox--inline': this.props.inline
		}, this.props.className);
		var props = blacklist(this.props, 'className', 'label', 'style', 'title');

		return React.createElement(
			'label',
			{ className: componentClass, style: this.props.style, title: this.props.title },
			React.createElement('input', _extends({ ref: 'target', type: 'checkbox', className: 'Checkbox__input' }, props)),
			this.props.label && React.createElement(
				'span',
				{ className: 'Checkbox__label' },
				this.props.label
			)
		);
	}
});

module.exports = Checkbox;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"blacklist":undefined,"classnames":undefined}],9:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _blacklist = require('blacklist');

var _blacklist2 = _interopRequireDefault(_blacklist);

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

module.exports = _react2['default'].createClass({
	displayName: 'Col',
	propTypes: {
		/* eslint-disable react/jsx-sort-prop-types */
		basis: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.number, // allow pixels
		_react2['default'].PropTypes.string]),
		// allow percentage
		children: _react2['default'].PropTypes.node,
		gutter: _react2['default'].PropTypes.number,
		style: _react2['default'].PropTypes.object,
		lg: _react2['default'].PropTypes.string, // width as a percentage or fraction
		md: _react2['default'].PropTypes.string, // width as a percentage or fraction
		sm: _react2['default'].PropTypes.string, // width as a percentage or fraction
		xs: _react2['default'].PropTypes.string },
	// width as a percentage or fraction
	/* eslint-enable */
	getDefaultProps: function getDefaultProps() {
		return {
			gutter: _constants2['default'].width.gutter
		};
	},
	getInitialState: function getInitialState() {
		return {
			windowWidth: window.innerWidth
		};
	},
	componentDidMount: function componentDidMount() {
		window.addEventListener('resize', this.handleResize);
	},
	componentWillUnmount: function componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	},
	handleResize: function handleResize() {
		this.setState({
			windowWidth: window.innerWidth
		});
	},
	render: function render() {
		var _props = this.props;
		var basis = _props.basis;
		var gutter = _props.gutter;
		var xs = _props.xs;
		var sm = _props.sm;
		var md = _props.md;
		var lg = _props.lg;
		var windowWidth = this.state.windowWidth;

		var columnStyle = {
			minHeight: 1,
			paddingLeft: gutter / 2,
			paddingRight: gutter / 2
		};

		// if no width control is provided fill available space
		if (!basis && !xs && !sm && !md && !lg) {
			columnStyle.flex = '1 1 auto';
			columnStyle.msFlex = '1 1 auto';
			columnStyle.WebkitFlex = '1 1 auto';
		}

		// set widths / flex-basis
		if (basis) {
			columnStyle.flex = '1 0 ' + basis;
			columnStyle.msFlex = '1 0 ' + basis;
			columnStyle.WebkitFlex = '1 0 ' + basis;
		} else if (windowWidth < _constants2['default'].breakpoint.xs) {
			columnStyle.width = xs;
		} else if (windowWidth < _constants2['default'].breakpoint.sm) {
			columnStyle.width = sm || xs;
		} else if (windowWidth < _constants2['default'].breakpoint.md) {
			columnStyle.width = md || sm || xs;
		} else {
			columnStyle.width = lg || md || sm || xs;
		}

		if (!columnStyle.width) {
			columnStyle.width = '100%';
		}

		if (columnStyle.width in _constants2['default'].fractions) {
			columnStyle.width = _constants2['default'].fractions[columnStyle.width];
		}

		var props = (0, _blacklist2['default'])(this.props, 'basis', 'gutter', 'style', 'xs', 'sm', 'md', 'lg');

		return _react2['default'].createElement('div', _extends({ style: _extends(columnStyle, this.props.style) }, props));
	}
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../constants":41,"blacklist":undefined}],10:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _blacklist = require('blacklist');

var _blacklist2 = _interopRequireDefault(_blacklist);

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

module.exports = _react2['default'].createClass({
	displayName: 'Container',
	propTypes: {
		children: _react2['default'].PropTypes.node.isRequired,
		clearfix: _react2['default'].PropTypes.bool,
		gutter: _react2['default'].PropTypes.number,
		maxWidth: _react2['default'].PropTypes.number,
		style: _react2['default'].PropTypes.object
	},
	getDefaultProps: function getDefaultProps() {
		return {
			gutter: _constants2['default'].width.gutter,
			maxWidth: _constants2['default'].width.container
		};
	},
	render: function render() {
		var _props = this.props;
		var gutter = _props.gutter;
		var maxWidth = _props.maxWidth;

		var containerStyle = {
			marginLeft: 'auto',
			marginRight: 'auto',
			paddingLeft: gutter,
			paddingRight: gutter,
			maxWidth: maxWidth
		};
		var clearfixStyle = { clear: 'both', display: 'table' };
		var props = (0, _blacklist2['default'])(this.props, 'gutter', 'maxWidth', 'style');

		return this.props.clearfix ? _react2['default'].createElement(
			'div',
			_extends({ style: _extends(containerStyle, this.props.style) }, props),
			_react2['default'].createElement('span', { style: clearfixStyle }),
			this.props.children,
			_react2['default'].createElement('span', { style: clearfixStyle })
		) : _react2['default'].createElement('div', _extends({ style: _extends(containerStyle, this.props.style) }, props));
	}
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../constants":41,"blacklist":undefined}],11:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var Transition = require('react-addons-css-transition-group');
var blacklist = require('blacklist');
var classNames = require('classnames');
var Button = require('./Button');

var ESC_KEYCODE = 27;

module.exports = React.createClass({
	displayName: 'Dropdown',
	propTypes: {
		alignRight: React.PropTypes.bool,
		buttonHasDisclosureArrow: React.PropTypes.bool,
		buttonLabel: React.PropTypes.string,
		buttonType: React.PropTypes.string,
		children: React.PropTypes.element,
		className: React.PropTypes.string,
		isOpen: React.PropTypes.bool,
		items: React.PropTypes.array.isRequired,
		onSelect: React.PropTypes.func
	},
	getDefaultProps: function getDefaultProps() {
		return {
			buttonHasDisclosureArrow: true,
			onSelect: function onSelect() {}
		};
	},
	getInitialState: function getInitialState() {
		return {
			isOpen: this.props.isOpen || false
		};
	},
	openDropdown: function openDropdown() {
		this.setState({ isOpen: true });
	},
	closeDropdown: function closeDropdown() {
		this.setState({ isOpen: false });
	},
	componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
		if (nextState.isOpen) {
			window.addEventListener('keydown', this.handleKeyDown);
		} else {
			window.removeEventListener('keydown', this.handleKeyDown);
		}
	},
	handleKeyDown: function handleKeyDown(e) {
		if (e.keyCode === ESC_KEYCODE) {
			this.closeDropdown();
		}
	},

	renderChildren: function renderChildren() {
		var _this = this;

		return React.Children.map(this.props.children, function (child) {
			return React.cloneElement(child, {
				onClick: _this.state.isOpen ? _this.closeDropdown : _this.openDropdown,
				className: classNames(child.props.className, 'Dropdown-toggle')
			});
		});
	},
	renderButton: function renderButton() {
		var disclosureArrow = this.props.buttonHasDisclosureArrow ? React.createElement('span', { className: 'disclosure-arrow' }) : null;

		return React.createElement(
			Button,
			{ type: this.props.buttonType, onClick: this.state.isOpen ? this.closeDropdown : this.openDropdown, className: 'Dropdown-toggle' },
			this.props.buttonLabel,
			disclosureArrow
		);
	},

	onClick: function onClick(selectedItem) {
		this.setState({
			isOpen: !this.state.isOpen
		});

		this.props.onSelect(selectedItem);
	},
	renderDropdownMenu: function renderDropdownMenu() {
		var self = this;
		if (!this.state.isOpen) return null;

		var dropdownMenuItems = this.props.items.map(function (item, i) {
			var menuItem;
			if (item.type === 'header') {
				menuItem = React.createElement(
					'li',
					{ key: 'item-' + i, className: 'Dropdown-menu__header' },
					item.label
				);
			} else if (item.type === 'divider') {
				menuItem = React.createElement('li', { key: 'item-' + i, className: 'Dropdown-menu__divider' });
			} else {
				menuItem = React.createElement(
					'li',
					{ key: 'item-' + i, className: 'Dropdown-menu__item' },
					React.createElement(
						'span',
						{ className: 'Dropdown-menu__action', onClick: self.onClick.bind(self, item.value) },
						item.label
					)
				);
			}
			return menuItem;
		});

		return React.createElement(
			'ul',
			{ key: 'Dropdown-menu', className: 'Dropdown-menu', role: 'menu' },
			dropdownMenuItems
		);
	},
	renderDropdownMenuBackground: function renderDropdownMenuBackground() {
		if (!this.state.isOpen) return null;
		return React.createElement('div', { className: 'Dropdown-menu-backdrop', onClick: this.closeDropdown });
	},

	render: function render() {
		// classes
		var dropdownClass = classNames('Dropdown', {
			'is-open': this.state.isOpen,
			'align-right': this.props.alignRight
		}, this.props.className);

		// props
		var props = blacklist(this.props, 'alignRight', 'buttonHasDisclosureArrow', 'buttonLabel', 'buttonType', 'className', 'isOpen', 'items');

		return React.createElement(
			'span',
			_extends({ className: dropdownClass }, props),
			React.Children.count(this.props.children) ? this.renderChildren() : this.renderButton(),
			React.createElement(
				Transition,
				{ transitionName: 'Dropdown-menu', transitionEnterTimeout: 100, transitionLeaveTimeout: 100 },
				this.renderDropdownMenu()
			),
			this.renderDropdownMenuBackground()
		);
	}
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Button":5,"blacklist":undefined,"classnames":undefined,"react-addons-css-transition-group":undefined}],12:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var classNames = require('classnames');

var REGEXP_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function validateEmail(value) {
	return REGEXP_EMAIL.test(value);
}

module.exports = React.createClass({
	displayName: 'EmailInputGroup',
	propTypes: {
		alwaysValidate: React.PropTypes.bool,
		className: React.PropTypes.string,
		invalidMessage: React.PropTypes.string,
		label: React.PropTypes.string,
		onChange: React.PropTypes.func,
		required: React.PropTypes.bool,
		requiredMessage: React.PropTypes.string,
		value: React.PropTypes.string
	},
	getDefaultProps: function getDefaultProps() {
		return {
			requiredMessage: 'Email address is required',
			invalidMessage: 'Please enter a valid email address'
		};
	},
	getInitialState: function getInitialState() {
		return {
			isValid: true,
			validationIsActive: this.props.alwaysValidate
		};
	},
	componentDidMount: function componentDidMount() {
		if (this.state.validationIsActive) {
			this.validateInput(this.props.value);
		}
	},
	componentWillReceiveProps: function componentWillReceiveProps(newProps) {
		if (this.state.validationIsActive) {
			if (newProps.value !== this.props.value && newProps.value !== this._lastChangeValue && !newProps.alwaysValidate) {
				// reset validation state if the value was changed outside the component
				return this.setState({
					isValid: true,
					validationIsActive: false
				});
			}
			this.validateInput(newProps.value);
		}
	},
	handleChange: function handleChange(e) {
		this._lastChangeValue = e.target.value;
		if (this.props.onChange) this.props.onChange(e);
	},
	handleBlur: function handleBlur() {
		if (!this.props.alwaysValidate) {
			this.setState({ validationIsActive: false });
		}
		this.validateInput(this.props.value);
	},
	validateInput: function validateInput(value) {
		var newState = {
			isValid: true
		};
		if (value.length && !validateEmail(value) || !value.length && this.props.required) {
			newState.isValid = false;
		}
		if (!newState.isValid) {
			newState.validationIsActive = true;
		}
		this.setState(newState);
	},
	render: function render() {
		var validationMessage;
		if (!this.state.isValid) {
			validationMessage = React.createElement(
				'div',
				{ className: 'form-validation is-invalid' },
				this.props.value.length ? this.props.invalidMessage : this.props.requiredMessage
			);
		}
		var formGroupClass = classNames('FormField', {
			'is-invalid': !this.state.isValid
		}, this.props.className);

		var componentLabel = this.props.label ? React.createElement(
			'label',
			{ className: 'FormLabel', htmlFor: 'inputEmail' },
			this.props.label
		) : null;

		return React.createElement(
			'div',
			{ className: formGroupClass },
			componentLabel,
			React.createElement('input', { onChange: this.handleChange, onBlur: this.handleBlur, value: this.props.value, type: 'email', className: 'FormInput', placeholder: 'Enter email', id: 'inputEmail' }),
			validationMessage
		);
	}
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"classnames":undefined}],13:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var classNames = require('classnames');

/*
	Based on: https://github.com/paramaggarwal/react-dropzone
*/

var Dropzone = React.createClass({
	displayName: 'Dropzone',

	propTypes: {
		className: React.PropTypes.string,
		label: React.PropTypes.string,
		labelActive: React.PropTypes.string,
		onDrop: React.PropTypes.func.isRequired
	},
	getDefaultProps: function getDefaultProps() {
		return {
			label: 'Drag Files Here',
			labelActive: 'Drop to Upload'
		};
	},
	getInitialState: function getInitialState() {
		return {
			isDragActive: false
		};
	},

	onDragLeave: function onDragLeave() {
		this.setState({
			isDragActive: false
		});
	},

	onDragOver: function onDragOver(e) {
		e.preventDefault();
		e.dataTransfer.dropEffect = 'copy';

		this.setState({
			isDragActive: true
		});
	},

	onDrop: function onDrop(e) {
		e.preventDefault();

		this.setState({
			isDragActive: false
		});

		var files;
		if (e.dataTransfer) {
			files = e.dataTransfer.files;
		} else if (e.target) {
			files = e.target.files;
		}

		if (this.props.onDrop) {
			files = Array.prototype.slice.call(files);
			this.props.onDrop(files);
		}
	},

	onClick: function onClick() {
		this.refs.fileInput.click();
	},

	render: function render() {

		var className = classNames('FileDragAndDrop', {
			'active': this.state.isDragActive
		}, this.props.className);

		return React.createElement(
			'button',
			{ className: className, onClick: this.onClick, onDragLeave: this.onDragLeave, onDragOver: this.onDragOver, onDrop: this.onDrop },
			React.createElement('input', { style: { display: 'none' }, type: 'file', multiple: true, ref: 'fileInput', onChange: this.onDrop }),
			React.createElement(
				'div',
				{ className: 'FileDragAndDrop__label' },
				this.state.isDragActive ? this.props.labelActive : this.props.label
			),
			this.props.children
		);
	}

});

module.exports = Dropzone;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"classnames":undefined}],14:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var blacklist = require('blacklist');

var Button = require('./Button');
var Spinner = require('./Spinner');

module.exports = React.createClass({
	displayName: 'FileUpload',
	propTypes: {
		buttonLabelChange: React.PropTypes.string,
		buttonLabelInitial: React.PropTypes.string,
		disabled: React.PropTypes.bool,
		file: React.PropTypes.object, // https://developer.mozilla.org/en/docs/Using_files_from_web_applications
		onChange: React.PropTypes.func
	},
	getDefaultProps: function getDefaultProps() {
		return {
			buttonLabelInitial: 'Upload File',
			buttonLabelChange: 'Change File'
		};
	},
	getInitialState: function getInitialState() {
		return {
			file: {},
			loading: false
		};
	},
	componentDidMount: function componentDidMount() {
		this.refs.fileInput.addEventListener('click', function () {
			this.value = '';
		}, false);
	},
	triggerFileBrowser: function triggerFileBrowser() {
		this.refs.fileInput.click();
	},
	handleChange: function handleChange(e) {
		var self = this;
		var reader = new FileReader();
		var file = e.target.files[0];

		reader.readAsDataURL(file);

		reader.onloadstart = function () {
			console.time('onLoad');
			self.setState({
				loading: true
			});
		};
		reader.onloadend = function (upload) {
			console.timeEnd('onLoad');
			self.setState({
				loading: false,
				file: file,
				dataURI: upload.target.result
			});
		};
	},
	cancelUpload: function cancelUpload() {
		this.setState({
			dataURI: false,
			file: {}
		});
	},

	render: function render() {
		var _state = this.state;
		var dataURI = _state.dataURI;
		var file = _state.file;

		// props
		var props = blacklist(this.props, 'buttonClassChange', 'buttonClassInitial', 'buttonLabelChange', 'buttonLabelInitial', 'disabled', 'file', 'onChange');

		// elements
		var component = React.createElement(
			Button,
			{ onClick: this.triggerFileBrowser, disabled: this.props.disabled || this.state.loading },
			this.state.loading && React.createElement(Spinner, null),
			this.props.buttonLabelInitial
		);

		if (dataURI) {
			component = React.createElement(
				'div',
				{ className: 'FileUpload' },
				React.createElement(
					'div',
					{ className: 'FileUpload__image' },
					React.createElement('img', { className: 'FileUpload__image-src', src: dataURI })
				),
				React.createElement(
					'div',
					{ className: 'FileUpload__content' },
					React.createElement(
						'div',
						{ className: 'FileUpload__message' },
						file.name,
						' (',
						Math.round(file.size / 1024),
						'Kb)'
					),
					React.createElement(
						'div',
						{ className: 'FileUpload__buttons' },
						React.createElement(
							Button,
							{ onClick: this.triggerFileBrowser, disabled: this.state.loading },
							this.state.loading && React.createElement(Spinner, null),
							this.props.buttonLabelChange
						),
						React.createElement(
							Button,
							{ onClick: this.cancelUpload, type: 'link-cancel', disabled: this.state.loading },
							'Cancel'
						)
					)
				)
			);
		}

		return React.createElement(
			'div',
			null,
			component,
			React.createElement('input', _extends({ style: { display: 'none' }, type: 'file', ref: 'fileInput', onChange: this.handleChange }, props))
		);
	}
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Button":5,"./Spinner":39,"blacklist":undefined}],15:[function(require,module,exports){
(function (global){
'use strict';

var blacklist = require('blacklist');
var classnames = require('classnames');
var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

module.exports = React.createClass({
	displayName: 'Form',
	propTypes: {
		children: React.PropTypes.node.isRequired,
		className: React.PropTypes.string,
		component: React.PropTypes.oneOfType([React.PropTypes.element, React.PropTypes.string]),
		type: React.PropTypes.oneOf(['basic', 'horizontal', 'inline'])
	},
	getDefaultProps: function getDefaultProps() {
		return {
			component: 'form',
			type: 'basic'
		};
	},
	render: function render() {
		var props = blacklist(this.props, 'children', 'type');
		props.className = classnames('Form', 'Form--' + this.props.type, this.props.className);

		return React.createElement(this.props.component, props, this.props.children);
	}
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"blacklist":undefined,"classnames":undefined}],16:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var blacklist = require('blacklist');
var classNames = require('classnames');

module.exports = React.createClass({
	displayName: 'FormField',
	propTypes: {
		className: React.PropTypes.string,
		htmlFor: React.PropTypes.string,
		id: React.PropTypes.string,
		label: React.PropTypes.string,
		offsetAbsentLabel: React.PropTypes.bool,
		width: React.PropTypes.oneOf(['one-half', 'two-quarters', 'three-sixths', 'one-quarter', 'three-quarters', 'one-third', 'two-sixths', 'two-thirds', 'four-sixths', 'one-fifth', 'two-fifths', 'three-fifths', 'four-fifths', 'one-sixth', 'five-sixths'])
	},
	render: function render() {
		// classes
		var componentClass = classNames('FormField', {
			'offset-absent-label': this.props.offsetAbsentLabel
		}, this.props.width, this.props.className);

		// props
		var props = blacklist(this.props, 'className', 'label', 'offsetAbsentLabel', 'width');

		// elements
		var componentLabel = this.props.label ? React.createElement(
			'label',
			{ className: 'FormLabel', htmlFor: this.props.id || this.props.htmlFor },
			this.props.label
		) : null;

		return React.createElement(
			'div',
			_extends({ className: componentClass }, props),
			componentLabel,
			this.props.children
		);
	}
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"blacklist":undefined,"classnames":undefined}],17:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var classNames = require('classnames');
var Spinner = require('./Spinner');

var icons = require('../Octicons').map;

module.exports = React.createClass({
	displayName: 'FormIcon',
	propTypes: {
		className: React.PropTypes.string,
		color: React.PropTypes.oneOf(['danger', 'default', 'muted', 'primary', 'success', 'warning']),
		fill: React.PropTypes.oneOf(['danger', 'default', 'muted', 'primary', 'success', 'warning']),
		icon: React.PropTypes.string,
		isLoading: React.PropTypes.bool,
		type: React.PropTypes.string
	},
	render: function render() {
		// classes
		var className = classNames('IconField__icon', icons[this.props.icon].className, this.props.fill ? 'IconField__icon-fill--' + this.props.fill : null, this.props.type ? 'IconField__icon-color--' + this.props.type : null, this.props.className);

		var component = this.props.isLoading ? React.createElement(Spinner, { size: 'sm' }) : React.createElement('div', { className: className });

		return component;
	}
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../Octicons":2,"./Spinner":39,"classnames":undefined}],18:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var blacklist = require('blacklist');
var classNames = require('classnames');

var FormField = require('./FormField');
var Spinner = require('./Spinner');

var ICON_MAP = require('../Octicons').map;
var ICON_KEYS = require('../Octicons').keys;
var COLOR_VARIANTS = ['danger', 'default', 'primary', 'success', 'warning'];

module.exports = React.createClass({
	displayName: 'FormIconField',
	propTypes: {
		className: React.PropTypes.string,
		iconColor: React.PropTypes.oneOf(COLOR_VARIANTS),
		iconFill: React.PropTypes.oneOf(COLOR_VARIANTS),
		iconIsLoading: React.PropTypes.bool,
		iconKey: React.PropTypes.oneOf(ICON_KEYS).isRequired,
		iconPosition: React.PropTypes.oneOf(['left', 'right'])
	},
	getDefaultProps: function getDefaultProps() {
		return {
			iconPosition: 'left'
		};
	},
	render: function render() {
		// props
		var props = blacklist(this.props, 'children', 'iconPosition', 'iconKey', 'iconFill', 'iconColor', 'iconIsLoading');

		// classes
		var fieldClass = classNames('IconField', {
			'has-fill-icon': this.props.iconFill,
			'is-loading-icon': this.props.iconIsLoading
		}, this.props.iconFill ? 'field-context-' + this.props.iconFill : null, this.props.iconColor ? 'field-context-' + this.props.iconColor : null, this.props.iconPosition);

		var iconClass = classNames('IconField__icon', this.props.iconFill ? 'IconField__icon-fill--' + this.props.iconFill : null, this.props.iconColor ? 'IconField__icon-color--' + this.props.iconColor : null, ICON_MAP[this.props.iconKey].className);

		var icon = this.props.iconIsLoading ? React.createElement(Spinner, { size: 'sm' }) : React.createElement('span', { className: iconClass });

		return React.createElement(
			FormField,
			props,
			React.createElement(
				'div',
				{ className: fieldClass },
				this.props.children,
				icon
			)
		);
	}
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../Octicons":2,"./FormField":16,"./Spinner":39,"blacklist":undefined,"classnames":undefined}],19:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var blacklist = require('blacklist');
var classNames = require('classnames');

module.exports = React.createClass({
	displayName: 'FormInput',
	propTypes: {
		className: React.PropTypes.string,
		disabled: React.PropTypes.bool,
		focusOnMount: React.PropTypes.bool,
		href: React.PropTypes.string,
		id: React.PropTypes.string,
		multiline: React.PropTypes.bool,
		name: React.PropTypes.string,
		noedit: React.PropTypes.bool,
		onChange: React.PropTypes.func,
		size: React.PropTypes.oneOf(['lg', 'sm', 'xs']),
		type: React.PropTypes.string,
		value: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string])
	},

	getDefaultProps: function getDefaultProps() {
		return {
			type: 'text'
		};
	},

	componentDidMount: function componentDidMount() {
		// if (this.props.focusOnMount) {
		// 	setTimeout(() => {
		// 		this.focus();
		// 	}, 10);
		// }
	},

	focus: function focus() {
		// If used in the future, will need to import ReactDOM from 'react-dom' to use findDOMNode().
		// React.findDOMNode(this.refs.target).focus();
	},

	render: function render() {
		// classes
		var className = classNames({
			'FormInput-noedit': this.props.noedit,
			'FormInput-noedit--multiline': this.props.noedit && this.props.multiline,
			'FormInput': !this.props.noedit
		}, this.props.size ? 'FormInput--' + this.props.size : null, this.props.className);

		var props = _extends(blacklist(this.props, 'className'), {
			className: className,
			id: this.props.id || this.props.name
		});

		// element
		var componentElement = 'input';
		if (this.props.noedit && this.props.href) {
			componentElement = 'a';
			props.type = null;
			props.children = props.children || props.value;
		} else if (this.props.noedit) {
			componentElement = 'div';
			props.type = null;
			props.children = props.children || props.value;
		} else if (this.props.multiline) {
			componentElement = 'textarea';
		}

		return React.createElement(componentElement, props);
	}
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"blacklist":undefined,"classnames":undefined}],20:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var blacklist = require('blacklist');
var classNames = require('classnames');

module.exports = React.createClass({
	displayName: 'FormLabel',
	propTypes: {
		className: React.PropTypes.string,
		htmlFor: React.PropTypes.string,
		id: React.PropTypes.string,
		style: React.PropTypes.object,
		verticalAlign: React.PropTypes.oneOf(['baseline', 'bottom', 'inherit', 'initial', 'middle', 'sub', 'super', 'text-bottom', 'text-top', 'top'])
	},
	render: function render() {
		// classes
		var className = classNames('FormLabel', this.props.className);

		// props
		var props = blacklist(this.props, 'htmlFor', 'id', 'className', 'style');

		// style
		var style;
		if (this.props.verticalAlign) {
			style = {
				verticalAlign: this.props.verticalAlign
			};
		}

		return React.createElement(
			'label',
			_extends({ className: className, htmlFor: this.props.htmlFor || this.props.id, style: style || this.props.style }, props),
			this.props.children
		);
	}
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"blacklist":undefined,"classnames":undefined}],21:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var blacklist = require('blacklist');
var classNames = require('classnames');

var NOTE_TYPES = ['default', 'primary', 'success', 'warning', 'danger'];

module.exports = React.createClass({
	displayName: 'FormNote',
	propTypes: {
		className: React.PropTypes.string,
		note: React.PropTypes.string,
		type: React.PropTypes.oneOf(NOTE_TYPES)
	},
	getDefaultProps: function getDefaultProps() {
		return {
			type: 'default'
		};
	},
	render: function render() {
		// classes
		var componentClass = classNames('FormNote', this.props.type ? 'FormNote--' + this.props.type : null, this.props.className);

		// props
		var props = blacklist(this.props, 'className', 'note', 'type');

		// allow users to pass through the note as an attribute or as children
		return React.createElement(
			'div',
			_extends({ className: componentClass, dangerouslySetInnerHTML: this.props.note ? { __html: this.props.note } : null }, props),
			this.props.children
		);
	}
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"blacklist":undefined,"classnames":undefined}],22:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var classNames = require('classnames');

module.exports = React.createClass({
	displayName: 'FormRow',
	propTypes: {
		className: React.PropTypes.string
	},
	render: function render() {
		var className = classNames('FormRow', this.props.className);

		return React.createElement(
			'div',
			{ className: className },
			this.props.children
		);
	}
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"classnames":undefined}],23:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _blacklist = require('blacklist');

var _blacklist2 = _interopRequireDefault(_blacklist);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _icons = require('../icons');

var _icons2 = _interopRequireDefault(_icons);

module.exports = _react2['default'].createClass({
	displayName: 'FormSelect',
	propTypes: {
		alwaysValidate: _react2['default'].PropTypes.bool,
		className: _react2['default'].PropTypes.string,
		disabled: _react2['default'].PropTypes.bool,
		firstOption: _react2['default'].PropTypes.string,
		htmlFor: _react2['default'].PropTypes.string,
		id: _react2['default'].PropTypes.string,
		label: _react2['default'].PropTypes.string,
		onChange: _react2['default'].PropTypes.func.isRequired,
		options: _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.shape({
			label: _react2['default'].PropTypes.string,
			value: _react2['default'].PropTypes.string
		})).isRequired,
		prependEmptyOption: _react2['default'].PropTypes.bool,
		required: _react2['default'].PropTypes.bool,
		requiredMessage: _react2['default'].PropTypes.string,
		value: _react2['default'].PropTypes.string
	},

	getDefaultProps: function getDefaultProps() {
		return {
			requiredMessage: 'This field is required'
		};
	},

	getInitialState: function getInitialState() {
		return {
			isValid: true,
			validationIsActive: this.props.alwaysValidate
		};
	},

	componentDidMount: function componentDidMount() {
		if (this.state.validationIsActive) {
			this.validateInput(this.props.value);
		}
	},

	componentWillReceiveProps: function componentWillReceiveProps(newProps) {
		if (this.state.validationIsActive) {
			if (newProps.value !== this.props.value && newProps.value !== this._lastChangeValue && !newProps.alwaysValidate) {
				// reset validation state if the value was changed outside the component
				return this.setState({
					isValid: true,
					validationIsActive: false
				});
			}
			this.validateInput(newProps.value);
		}
	},

	handleChange: function handleChange(e) {
		this._lastChangeValue = e.target.value;
		if (this.props.onChange) this.props.onChange(e.target.value);
	},

	handleBlur: function handleBlur() {
		if (!this.props.alwaysValidate) {
			this.setState({ validationIsActive: false });
		}
		this.validateInput(this.props.value);
	},

	validateInput: function validateInput(value) {
		var newState = {
			isValid: true
		};
		if (this.props.required && (!value || value && !value.length)) {
			newState.isValid = false;
		}
		if (!newState.isValid) {
			newState.validationIsActive = true;
		}
		this.setState(newState);
	},

	renderIcon: function renderIcon(icon) {
		var iconClassname = (0, _classnames2['default'])('FormSelect__arrows', {
			'FormSelect__arrows--disabled': this.props.disabled
		});

		return _react2['default'].createElement('span', { dangerouslySetInnerHTML: { __html: icon }, className: iconClassname });
	},

	render: function render() {
		// props
		var props = (0, _blacklist2['default'])(this.props, 'prependEmptyOption', 'firstOption', 'alwaysValidate', 'htmlFor', 'id', 'label', 'onChange', 'options', 'required', 'requiredMessage', 'className');

		// classes
		var componentClass = (0, _classnames2['default'])('FormField', {
			'is-invalid': !this.state.isValid
		}, this.props.className);

		// validation message
		var validationMessage = undefined;
		if (!this.state.isValid) {
			validationMessage = _react2['default'].createElement(
				'div',
				{ className: 'form-validation is-invalid' },
				this.props.requiredMessage
			);
		}

		// dynamic elements
		var forAndID = this.props.htmlFor || this.props.id;
		var componentLabel = this.props.label ? _react2['default'].createElement(
			'label',
			{ className: 'FormLabel', htmlFor: forAndID },
			this.props.label
		) : null;

		// options
		var options = this.props.options.map(function (opt, i) {
			return _react2['default'].createElement(
				'option',
				{ key: 'option-' + i, value: opt.value },
				opt.label
			);
		});
		if (this.props.prependEmptyOption || this.props.firstOption) {
			options.unshift(_react2['default'].createElement(
				'option',
				{ key: 'option-blank', value: '' },
				this.props.firstOption ? this.props.firstOption : 'Select...'
			));
		}

		return _react2['default'].createElement(
			'div',
			{ className: componentClass },
			componentLabel,
			_react2['default'].createElement(
				'select',
				_extends({ className: 'FormInput FormSelect', id: forAndID, onChange: this.handleChange, onBlur: this.handleBlur }, props),
				options
			),
			this.renderIcon(_icons2['default'].selectArrows),
			validationMessage
		);
	}
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../icons":42,"blacklist":undefined,"classnames":undefined}],24:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var classNames = require('classnames');

var icons = require('../Octicons').map;
var validNames = require('../Octicons').keys;

var Glyph = React.createClass({
	displayName: 'Glyph',
	propTypes: {
		className: React.PropTypes.string,
		icon: React.PropTypes.oneOf(validNames),
		type: React.PropTypes.oneOf(['danger', 'default', 'muted', 'primary', 'success', 'warning'])
	},
	render: function render() {
		// classes
		var className = classNames('Glyph__icon', icons[this.props.icon].className, this.props.type ? 'IconField__icon-color--' + this.props.type : null, this.props.className);
		return React.createElement('i', { className: className });
	}
});

module.exports = Glyph;
module.exports.names = validNames;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../Octicons":2,"classnames":undefined}],25:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var classNames = require('classnames');

module.exports = React.createClass({
	displayName: 'InputGroup',
	propTypes: {
		className: React.PropTypes.string,
		contiguous: React.PropTypes.bool
	},
	render: function render() {
		// classes
		var className = classNames('InputGroup', {
			'InputGroup--contiguous': this.props.contiguous
		}, this.props.className);

		return React.createElement('div', _extends({}, this.props, { className: className }));
	}
});

// expose the child to the top level export
module.exports.Section = require('./InputGroupSection');

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./InputGroupSection":26,"classnames":undefined}],26:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var classNames = require('classnames');

module.exports = React.createClass({
	displayName: 'InputGroupSection',
	propTypes: {
		className: React.PropTypes.string,
		grow: React.PropTypes.bool
	},
	render: function render() {
		// classes
		var className = classNames('InputGroup_section', {
			'InputGroup_section--grow': this.props.grow
		}, this.props.className);

		return React.createElement('div', _extends({}, this.props, { className: className }));
	}
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"classnames":undefined}],27:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _blacklist = require('blacklist');

var _blacklist2 = _interopRequireDefault(_blacklist);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var TransitionPortal = _react2['default'].createClass({
	displayName: 'TransitionPortal',
	portalElement: null,
	render: function render() {
		return null;
	},
	componentDidMount: function componentDidMount() {
		var p = document.createElement('div');
		document.body.appendChild(p);
		this.portalElement = p;
		this.componentDidUpdate();
	},
	componentWillUnmount: function componentWillUnmount() {
		document.body.removeChild(this.portalElement);
	},
	componentDidUpdate: function componentDidUpdate() {
		_reactDom2['default'].render(_react2['default'].createElement(
			_reactAddonsCssTransitionGroup2['default'],
			this.props,
			this.props.children
		), this.portalElement);
	}
});

module.exports = _react2['default'].createClass({
	displayName: 'Modal',
	propTypes: {
		backdropClosesModal: _react2['default'].PropTypes.bool,
		className: _react2['default'].PropTypes.string,
		isOpen: _react2['default'].PropTypes.bool,
		onCancel: _react2['default'].PropTypes.func
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		if (nextProps.isOpen) {
			window.addEventListener('keydown', this.handleKeyDown);
			document.body.style.overflow = 'hidden';
		} else {
			window.removeEventListener('keydown', this.handleKeyDown);
			document.body.style.overflow = null;
		}
	},

	handleKeyDown: function handleKeyDown(event) {
		if (event.keyCode === 27) {
			this.props.onCancel();
		}
	},
	handleModalClick: function handleModalClick(event) {
		if (event.target.dataset.modal) this.props.onCancel();
	},
	renderDialog: function renderDialog() {
		if (!this.props.isOpen) return;

		return _react2['default'].createElement(
			'div',
			{ className: 'Modal-dialog' },
			_react2['default'].createElement(
				'div',
				{ className: 'Modal-content' },
				this.props.children
			)
		);
	},
	renderBackdrop: function renderBackdrop() {
		if (!this.props.isOpen) return;

		return _react2['default'].createElement('div', { className: 'Modal-backdrop', onClick: this.props.backdropClosesModal ? this.props.onCancel : null });
	},
	render: function render() {
		var className = (0, _classnames2['default'])('Modal', {
			'is-open': this.props.isOpen
		}, this.props.className);

		var props = (0, _blacklist2['default'])(this.props, 'backdropClosesModal', 'className', 'isOpen', 'onCancel');

		return _react2['default'].createElement(
			'div',
			null,
			_react2['default'].createElement(
				TransitionPortal,
				_extends({}, props, { 'data-modal': 'true', className: className, onClick: this.handleModalClick, transitionName: 'Modal-dialog', transitionEnterTimeout: 260, transitionLeaveTimeout: 140, component: 'div' }),
				this.renderDialog()
			),
			_react2['default'].createElement(
				TransitionPortal,
				{ transitionName: 'Modal-background', transitionEnterTimeout: 140, transitionLeaveTimeout: 240, component: 'div' },
				this.renderBackdrop()
			)
		);
	}
});

// expose the children to the top level export
module.exports.Body = require('./ModalBody');
module.exports.Footer = require('./ModalFooter');
module.exports.Header = require('./ModalHeader');

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./ModalBody":28,"./ModalFooter":29,"./ModalHeader":30,"blacklist":undefined,"classnames":undefined,"react-addons-css-transition-group":undefined,"react-dom":undefined}],28:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var classnames = require('classnames');
var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

module.exports = React.createClass({
	displayName: 'ModalBody',
	propTypes: {
		children: React.PropTypes.node.isRequired,
		className: React.PropTypes.string
	},
	render: function render() {
		var className = classnames('Modal__body', this.props.className);
		return React.createElement('div', _extends({}, this.props, { className: className }));
	}
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"classnames":undefined}],29:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var classnames = require('classnames');
var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

module.exports = React.createClass({
	displayName: 'ModalFooter',
	propTypes: {
		children: React.PropTypes.node.isRequired,
		className: React.PropTypes.string
	},
	render: function render() {
		var className = classnames('Modal__footer', this.props.className);
		return React.createElement('div', _extends({}, this.props, { className: className }));
	}
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"classnames":undefined}],30:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var classnames = require('classnames');
var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

module.exports = React.createClass({
	displayName: 'ModalHeader',
	propTypes: {
		children: React.PropTypes.node,
		className: React.PropTypes.string,
		onClose: React.PropTypes.func,
		showCloseButton: React.PropTypes.bool,
		text: React.PropTypes.string
	},
	render: function render() {

		// elements
		var className = classnames('Modal__header', this.props.className);
		var close = this.props.showCloseButton ? React.createElement('button', { type: 'button', onClick: this.props.onClose, className: 'Modal__header__close' }) : null;
		var text = this.props.text ? React.createElement(
			'h4',
			{ className: 'Modal__header__text' },
			this.props.text
		) : null;
		return React.createElement(
			'div',
			_extends({}, this.props, { className: className }),
			close,
			text,
			this.props.children
		);
	}
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"classnames":undefined}],31:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var classNames = require('classnames');

module.exports = React.createClass({
	displayName: 'Pagination',
	propTypes: {
		className: React.PropTypes.string,
		currentPage: React.PropTypes.number.isRequired,
		onPageSelect: React.PropTypes.func,
		pageSize: React.PropTypes.number.isRequired,
		plural: React.PropTypes.string,
		singular: React.PropTypes.string,
		style: React.PropTypes.object,
		total: React.PropTypes.number.isRequired,
		limit: React.PropTypes.number
	},
	renderCount: function renderCount() {
		var count = '';
		var _props = this.props;
		var currentPage = _props.currentPage;
		var pageSize = _props.pageSize;
		var plural = _props.plural;
		var singular = _props.singular;
		var total = _props.total;

		if (!total) {
			count = 'No ' + (plural || 'records');
		} else if (total > pageSize) {
			var start = pageSize * (currentPage - 1) + 1;
			var end = Math.min(start + pageSize - 1, total);
			count = 'Showing ' + start + ' to ' + end + ' of ' + total;
		} else {
			count = 'Showing ' + total;
			if (total > 1 && plural) {
				count += ' ' + plural;
			} else if (total === 1 && singular) {
				count += ' ' + singular;
			}
		}
		return React.createElement(
			'div',
			{ className: 'Pagination__count' },
			count
		);
	},
	onPageSelect: function onPageSelect(i) {
		if (!this.props.onPageSelect) return;
		this.props.onPageSelect(i);
	},
	renderPages: function renderPages() {
		var _this = this;

		if (this.props.total <= this.props.pageSize) return null;

		var pages = [];
		var _props2 = this.props;
		var currentPage = _props2.currentPage;
		var pageSize = _props2.pageSize;
		var total = _props2.total;
		var limit = _props2.limit;

		var totalPages = Math.ceil(total / pageSize);
		var minPage = 0;
		var maxPage = totalPages;

		if (limit && limit < totalPages) {
			limit = Math.floor(limit / 2);
			minPage = currentPage - limit - 1;
			maxPage = currentPage + limit;

			if (minPage < 0) {
				maxPage = maxPage - minPage;
				minPage = 0;
			}

			if (maxPage > totalPages) {
				minPage = totalPages - 2 * limit - 1;
				maxPage = totalPages;
			}
		}

		if (minPage > 0) {
			pages.push(React.createElement(
				'button',
				{ key: 'page_start', className: 'Pagination__list__item', onClick: function () {
						return _this.onPageSelect(1);
					} },
				'...'
			));
		}

		var _loop = function (i) {
			var page = i + 1;
			var current = page === currentPage;
			var className = classNames('Pagination__list__item', {
				'is-selected': current
			});
			/* eslint-disable no-loop-func */
			pages.push(React.createElement(
				'button',
				{ key: 'page_' + page, className: className, onClick: function () {
						return _this.onPageSelect(page);
					} },
				page
			));
			/* eslint-enable */
		};

		for (var i = minPage; i < maxPage; i++) {
			_loop(i);
		}

		if (maxPage < totalPages) {
			pages.push(React.createElement(
				'button',
				{ key: 'page_end', className: 'Pagination__list__item', onClick: function () {
						return _this.onPageSelect(totalPages);
					} },
				'...'
			));
		}

		return React.createElement(
			'div',
			{ className: 'Pagination__list' },
			pages
		);
	},
	render: function render() {
		var className = classNames('Pagination', this.props.className);
		return React.createElement(
			'div',
			{ className: className, style: this.props.style },
			this.renderCount(),
			this.renderPages()
		);
	}
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"classnames":undefined}],32:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var classNames = require('classnames');

function validatePassword(value) {
	return value.length >= 8;
}

module.exports = React.createClass({
	displayName: 'PasswordInputGroup',
	propTypes: {
		alwaysValidate: React.PropTypes.bool,
		className: React.PropTypes.string,
		validatePassword: React.PropTypes.func,
		invalidMessage: React.PropTypes.string,
		label: React.PropTypes.string,
		onChange: React.PropTypes.func,
		required: React.PropTypes.bool,
		requiredMessage: React.PropTypes.string,
		value: React.PropTypes.string
	},
	getDefaultProps: function getDefaultProps() {
		return {
			validatePassword: validatePassword,
			requiredMessage: 'Password is required',
			invalidMessage: 'Password must be at least 8 characters in length'
		};
	},
	getInitialState: function getInitialState() {
		return {
			isValid: true,
			validationIsActive: this.props.alwaysValidate
		};
	},
	componentDidMount: function componentDidMount() {
		if (this.state.validationIsActive) {
			this.validateInput(this.props.value);
		}
	},
	componentWillReceiveProps: function componentWillReceiveProps(newProps) {
		if (this.state.validationIsActive) {
			if (newProps.value !== this.props.value && newProps.value !== this._lastChangeValue && !newProps.alwaysValidate) {
				// reset validation state if the value was changed outside the component
				return this.setState({
					isValid: true,
					validationIsActive: false
				});
			}
			this.validateInput(newProps.value);
		}
	},
	handleChange: function handleChange(e) {
		this._lastChangeValue = e.target.value;
		if (this.props.onChange) this.props.onChange(e);
	},
	handleBlur: function handleBlur() {
		if (!this.props.alwaysValidate) {
			this.setState({ validationIsActive: false });
		}
		this.validateInput(this.props.value);
	},
	validateInput: function validateInput(value) {
		var newState = {
			isValid: true
		};
		if (value.length && !this.props.validatePassword(value) || !value.length && this.props.required) {
			newState.isValid = false;
		}
		if (!newState.isValid) {
			newState.validationIsActive = true;
		}
		this.setState(newState);
	},
	render: function render() {
		var validationMessage;
		if (!this.state.isValid) {
			validationMessage = React.createElement(
				'div',
				{ className: 'form-validation is-invalid' },
				this.props.value.length ? this.props.invalidMessage : this.props.requiredMessage
			);
		}
		var formGroupClass = classNames('FormField', {
			'is-invalid': !this.state.isValid
		}, this.props.className);

		var componentLabel = this.props.label ? React.createElement(
			'label',
			{ className: 'FormLabel', htmlFor: 'inputPassword' },
			this.props.label
		) : null;

		return React.createElement(
			'div',
			{ className: formGroupClass },
			componentLabel,
			React.createElement('input', { onChange: this.handleChange, onBlur: this.handleBlur, value: this.props.value, type: 'password', className: 'FormInput', placeholder: 'Enter password', id: 'inputPassword' }),
			validationMessage
		);
	}
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"classnames":undefined}],33:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var blacklist = require('blacklist');
var classNames = require('classnames');

var ALERT_TYPES = ['danger', 'default', 'info', 'primary', 'success', 'warning', 'danger-inverted', 'default-inverted', 'info-inverted', 'primary-inverted', 'success-inverted', 'warning-inverted'];

module.exports = React.createClass({
	displayName: 'Pill',
	propTypes: {
		className: React.PropTypes.string,
		label: React.PropTypes.string.isRequired,
		onClear: React.PropTypes.func,
		onClick: React.PropTypes.func,
		type: React.PropTypes.oneOf(ALERT_TYPES)
	},
	getDefaultProps: function getDefaultProps() {
		return {
			type: 'default'
		};
	},
	renderClearButton: function renderClearButton() {
		if (!this.props.onClear) return null;
		return React.createElement(
			'button',
			{ type: 'button', onClick: this.props.onClear, className: 'Pill__clear' },
			'×'
		);
	},
	render: function render() {
		var componentClass = classNames('Pill', 'Pill--' + this.props.type, this.props.className);

		var props = blacklist(this.props, 'className', 'label', 'onClear', 'onClick', 'type');
		props.className = componentClass;

		return React.createElement(
			'div',
			props,
			React.createElement(
				'button',
				{ type: 'button', onClick: this.props.onClick, className: 'Pill__label' },
				this.props.label
			),
			this.renderClearButton()
		);
	}
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"blacklist":undefined,"classnames":undefined}],34:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var blacklist = require('blacklist');
var classNames = require('classnames');
var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var Radio = React.createClass({
	displayName: 'Radio',

	propTypes: {
		className: React.PropTypes.string,
		disabled: React.PropTypes.bool,
		inline: React.PropTypes.bool,
		label: React.PropTypes.string
	},
	render: function render() {
		var componentClass = classNames('Radio', {
			'Radio--disabled': this.props.disabled,
			'Radio--inline': this.props.inline
		}, this.props.className);
		var props = blacklist(this.props, 'className', 'label');

		return React.createElement(
			'label',
			{ className: componentClass },
			React.createElement('input', _extends({ type: 'radio', className: 'Radio__input' }, props)),
			this.props.label && React.createElement(
				'span',
				{ className: 'Radio__label' },
				this.props.label
			)
		);
	}
});

module.exports = Radio;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"blacklist":undefined,"classnames":undefined}],35:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var blacklist = require('blacklist');
var classNames = require('classnames');

module.exports = React.createClass({
	displayName: 'RadioGroup',
	propTypes: {
		alwaysValidate: React.PropTypes.bool,
		className: React.PropTypes.string,
		inline: React.PropTypes.bool,
		label: React.PropTypes.string,
		onChange: React.PropTypes.func.isRequired,
		options: React.PropTypes.array.isRequired,
		required: React.PropTypes.bool,
		requiredMessage: React.PropTypes.string,
		value: React.PropTypes.string
	},
	getDefaultProps: function getDefaultProps() {
		return {
			requiredMessage: 'This field is required'
		};
	},
	getInitialState: function getInitialState() {
		return {
			isValid: true,
			validationIsActive: this.props.alwaysValidate
		};
	},
	componentDidMount: function componentDidMount() {
		if (this.state.validationIsActive) {
			this.validateInput(this.props.value);
		}
	},
	componentWillReceiveProps: function componentWillReceiveProps(newProps) {
		if (this.state.validationIsActive) {
			if (newProps.value !== this.props.value && newProps.value !== this._lastChangeValue && !newProps.alwaysValidate) {
				// reset validation state if the value was changed outside the component
				return this.setState({
					isValid: true,
					validationIsActive: false
				});
			}
			this.validateInput(newProps.value);
		}
	},
	handleChange: function handleChange(e) {
		this._lastChangeValue = e.target.value;
		if (this.props.onChange) this.props.onChange(e.target.value);
	},
	handleBlur: function handleBlur() {
		if (!this.props.alwaysValidate) {
			this.setState({ validationIsActive: false });
		}
		this.validateInput(this.props.value);
	},
	validateInput: function validateInput(value) {
		var newState = {
			isValid: true
		};
		if (this.props.required && (!value || value && !value.length)) {
			newState.isValid = false;
		}
		if (!newState.isValid) {
			newState.validationIsActive = true;
		}
		this.setState(newState);
	},
	render: function render() {
		var self = this;

		// props
		var props = blacklist(this.props, 'alwaysValidate', 'label', 'onChange', 'options', 'required', 'requiredMessage', 'value');

		// classes
		var componentClass = classNames('FormField', {
			'is-invalid': !this.state.isValid
		}, this.props.className);

		// validation message
		var validationMessage;
		if (!this.state.isValid) {
			validationMessage = React.createElement(
				'div',
				{ className: 'form-validation is-invalid' },
				this.props.requiredMessage
			);
		}

		// dynamic elements
		var componentLabel = this.props.label ? React.createElement(
			'label',
			{ className: 'FormLabel' },
			this.props.label
		) : null;

		// options
		var radios = this.props.options.map(function (radio, i) {
			return React.createElement(
				'label',
				{ key: 'radio-' + i, className: 'Radio' },
				React.createElement('input', { value: radio.value, type: 'radio', onChange: self.handleChange, onBlur: self.handleBlur, name: self.props.name, className: 'Radio__input' }),
				React.createElement(
					'span',
					{ className: 'Radio__label' },
					radio.label
				)
			);
		});
		if (this.props.inline) {
			radios = React.createElement(
				'div',
				{ className: 'inline-controls' },
				radios
			);
		}

		return React.createElement(
			'div',
			_extends({ className: componentClass }, props),
			componentLabel,
			radios,
			validationMessage
		);
	}
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"blacklist":undefined,"classnames":undefined}],36:[function(require,module,exports){
(function (global){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _blacklist = require('blacklist');

var _blacklist2 = _interopRequireDefault(_blacklist);

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

module.exports = _react2['default'].createClass({
	displayName: 'ResponsiveText',
	propTypes: {
		hiddenLG: _react2['default'].PropTypes.string,
		hiddenMD: _react2['default'].PropTypes.string,
		hiddenSM: _react2['default'].PropTypes.string,
		hiddenXS: _react2['default'].PropTypes.string,
		visibleLG: _react2['default'].PropTypes.string,
		visibleMD: _react2['default'].PropTypes.string,
		visibleSM: _react2['default'].PropTypes.string,
		visibleXS: _react2['default'].PropTypes.string
	},
	getInitialState: function getInitialState() {
		return {
			windowWidth: window.innerWidth
		};
	},
	componentDidMount: function componentDidMount() {
		window.addEventListener('resize', this.handleResize);
	},
	componentWillUnmount: function componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	},
	handleResize: function handleResize() {
		this.setState({
			windowWidth: window.innerWidth
		});
	},
	render: function render() {
		var _props = this.props;
		var hiddenXS = _props.hiddenXS;
		var hiddenSM = _props.hiddenSM;
		var hiddenMD = _props.hiddenMD;
		var hiddenLG = _props.hiddenLG;
		var visibleXS = _props.visibleXS;
		var visibleSM = _props.visibleSM;
		var visibleMD = _props.visibleMD;
		var visibleLG = _props.visibleLG;
		var windowWidth = this.state.windowWidth;

		var text = undefined;

		// set widths / flex-basis
		if (windowWidth < _constants2['default'].breakpoint.xs) {
			text = visibleXS || hiddenSM || hiddenMD || hiddenLG;
		} else if (windowWidth < _constants2['default'].breakpoint.sm) {
			text = hiddenXS || visibleSM || hiddenMD || hiddenLG;
		} else if (windowWidth < _constants2['default'].breakpoint.md) {
			text = hiddenXS || hiddenSM || visibleMD || hiddenLG;
		} else {
			text = hiddenXS || hiddenSM || hiddenMD || visibleLG;
		}

		var props = (0, _blacklist2['default'])(this.props, {
			'hiddenXS': true,
			'hiddenSM': true,
			'hiddenMD': true,
			'hiddenLG': true,
			'visibleXS': true,
			'visibleSM': true,
			'visibleMD': true,
			'visibleLG': true
		});

		return _react2['default'].createElement(
			'span',
			props,
			text
		);
	}
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../constants":41,"blacklist":undefined}],37:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _blacklist = require('blacklist');

var _blacklist2 = _interopRequireDefault(_blacklist);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

module.exports = _react2['default'].createClass({
	displayName: 'Row',
	propTypes: {
		children: _react2['default'].PropTypes.node.isRequired,
		className: _react2['default'].PropTypes.string,
		gutter: _react2['default'].PropTypes.number,
		style: _react2['default'].PropTypes.object
	},
	getDefaultProps: function getDefaultProps() {
		return {
			gutter: _constants2['default'].width.gutter
		};
	},
	render: function render() {
		var gutter = this.props.gutter;

		var rowStyle = {
			display: 'flex',
			flexWrap: 'wrap',
			msFlexWrap: 'wrap',
			WebkitFlexWrap: 'wrap',
			marginLeft: gutter / -2,
			marginRight: gutter / -2
		};
		var className = (0, _classnames2['default'])('Row', this.props.className);
		var props = (0, _blacklist2['default'])(this.props, 'className', 'gutter', 'style');

		return _react2['default'].createElement('div', _extends({}, props, { style: _extends(rowStyle, this.props.style), className: className }));
	}
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../constants":41,"blacklist":undefined,"classnames":undefined}],38:[function(require,module,exports){
(function (global){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

module.exports = _react2['default'].createClass({
	displayName: 'SegmentedControl',

	propTypes: {
		className: _react2['default'].PropTypes.string,
		equalWidthSegments: _react2['default'].PropTypes.bool,
		onChange: _react2['default'].PropTypes.func.isRequired,
		options: _react2['default'].PropTypes.array.isRequired,
		type: _react2['default'].PropTypes.oneOf(['default', 'muted', 'danger', 'info', 'primary', 'success', 'warning']),
		value: _react2['default'].PropTypes.string
	},

	getDefaultProps: function getDefaultProps() {
		return {
			type: 'default'
		};
	},

	onChange: function onChange(value) {
		this.props.onChange(value);
	},

	render: function render() {
		var _this = this;

		var componentClassName = (0, _classnames2['default'])('SegmentedControl', 'SegmentedControl--' + this.props.type, {
			'SegmentedControl--equal-widths': this.props.equalWidthSegments
		}, this.props.className);

		var options = this.props.options.map(function (op) {

			var buttonClassName = (0, _classnames2['default'])('SegmentedControl__button', {
				'is-selected': op.value === _this.props.value
			});

			return _react2['default'].createElement(
				'span',
				{ key: 'option-' + op.value, className: 'SegmentedControl__item' },
				_react2['default'].createElement(
					'button',
					{ type: 'button', onClick: _this.onChange.bind(_this, op.value), className: buttonClassName },
					op.label
				)
			);
		});

		return _react2['default'].createElement(
			'div',
			{ className: componentClassName },
			options
		);
	}
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"classnames":undefined}],39:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var classNames = require('classnames');

module.exports = React.createClass({
	displayName: 'Spinner',
	propTypes: {
		className: React.PropTypes.string,
		size: React.PropTypes.oneOf(['sm', 'md', 'lg']),
		type: React.PropTypes.oneOf(['default', 'primary', 'inverted'])
	},
	getDefaultProps: function getDefaultProps() {
		return {
			type: 'default',
			size: 'sm'
		};
	},
	render: function render() {
		var componentClass = classNames('Spinner', 'Spinner--' + this.props.type, 'Spinner--' + this.props.size, this.props.className);

		return React.createElement(
			'div',
			{ className: componentClass },
			React.createElement('span', { className: 'Spinner_dot Spinner_dot--first' }),
			React.createElement('span', { className: 'Spinner_dot Spinner_dot--second' }),
			React.createElement('span', { className: 'Spinner_dot Spinner_dot--third' })
		);
	}
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"classnames":undefined}],40:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

module.exports = _react2['default'].createClass({
	displayName: 'Table',

	propTypes: {
		children: _react2['default'].PropTypes.any,
		className: _react2['default'].PropTypes.string
	},

	render: function render() {
		// classes
		var className = (0, _classnames2['default'])('Table', this.props.className);

		// render table element
		return _react2['default'].createElement('table', _extends({ className: className }, this.props));
	}
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"classnames":undefined}],41:[function(require,module,exports){
// breakpoints
'use strict';

exports.breakpoint = {
	xs: 480,
	sm: 768,
	md: 992,
	lg: 1200
};

// border radii
exports.borderRadius = {
	xs: 2,
	sm: 4,
	md: 8,
	lg: 16,
	xl: 32
};

// color
exports.color = {
	appDanger: '#d64242',
	appInfo: '#56cdfc',
	appPrimary: '#1385e5',
	appSuccess: '#34c240',
	appWarning: '#fa9f47',
	brandPrimary: '#31adb8'
};

// spacing
exports.spacing = {
	xs: 5,
	sm: 10,
	md: 20,
	lg: 40,
	xl: 80
};

// widths
exports.width = {
	container: 1170,
	gutter: 20
};

// fractions (for col widths)

function perc(n) {
	return n * 100 + '%';
}

function denominators(n) {
	for (var d = 2; d <= 20; d++) {
		if (n < d) {
			exports.fractions[n + '/' + d] = perc(n / d);
		}
	}
}

exports.fractions = {};

for (var numerator = 1; numerator <= 19; numerator++) {
	denominators(numerator);
}

},{}],42:[function(require,module,exports){
'use strict';

module.exports = {
	selectArrows: require('./selectArrows')
};

},{"./selectArrows":43}],43:[function(require,module,exports){
'use strict';

module.exports = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>' + '<svg width="7px" height="11px" viewBox="0 0 7 11" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' + '<path d="M3.5,0 L7,4 L0,4 L3.5,0 Z M3.5,11 L7,7 L0,7 L3.5,11 Z" />' + '</svg>';

},{}]},{},[1])(1)
});