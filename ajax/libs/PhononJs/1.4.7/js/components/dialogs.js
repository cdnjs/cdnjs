/* ========================================================================
 * Phonon: dialogs.js v0.0.6
 * http://phonon.quarkdev.com
 * ========================================================================
 * Licensed under MIT (http://phonon.quarkdev.com)
 * ======================================================================== */
;(function (window, phonon) {

	'use strict';

	var lastTrigger = false;
	var dialogs = [];
	var fireEvent = null;

	function addCancelCallback(dialog, cancelCallback) {
		for (var i = 0; i < dialogs.length; i++) {
			if(dialogs[i].dialog === dialog) {
				dialogs[i].cancelCallback = cancelCallback;
				break;
			}
		}
	}

	var createBackdrop = function (id) {
		var backdrop = document.createElement('div');
		backdrop.setAttribute('data-id', id);
		backdrop.classList.add('backdrop-dialog');
		return backdrop;
	};

	var findTrigger = function (target) {
		var triggers = document.querySelectorAll('[data-dialog-id], [data-dialog-close]'), i;
		for (; target && target !== document; target = target.parentNode) {
			for (i = triggers.length; i--;) {
				if (triggers[i] === target) {
					return target;
				}
			}
		}
	};

	var getDialog = function (event) {
		var dialogToggle = findTrigger(event.target);
		if (dialogToggle) {
			var dialogId = dialogToggle.getAttribute('data-dialog-id');
			if(dialogId) {
				return document.querySelector('#'+dialogId);
			} else {
				return findDialog(event.target);
			}
		}
	};

	var findDialog = function (target) {
		var dialogs = document.querySelectorAll('.dialog'), i;

		for (; target && target !== document; target = target.parentNode) {
			for (i = dialogs.length; i--;) {
				if (dialogs[i] === target && target.classList.contains('active')) {
					return target;
				}
			}
		}
	};

	var findDialogObject = function(id) {

		var i = dialogs.length - 1;
		for (; i >= 0; i--) {
			if(dialogs[i].dialog.id === id) {
				var d = dialogs[i];
				d.index = i;
				return d;
			}
		}
		return false;
	};

		var dialogId = 0;

	var buildDialog = function (type, text, title, cancelable, textOk, textCancel) {
		text = (typeof text === 'string' ? '<p>' + text + '</p>' : '');
		var noTitle = typeof title;
		title = (noTitle === 'string' ? title : type);
		cancelable = (typeof cancelable === 'boolean' ? cancelable : true);
		textOk = (typeof textOk === 'string' ? textOk : 'Ok');
		textCancel = (typeof textCancel === 'string' ? textCancel : 'Cancel');

		var id = 'auto-gen-' + type + '-' + (dialogId++);

		var div = document.createElement('div');
		div.setAttribute('class', 'dialog');
		div.setAttribute('data-cancelable', cancelable);
		div.setAttribute('data-auto', 'true');
		div.id = id;

		var nodeTitle = (noTitle === undefined ? '' : '<h3>'+title+'</h3>');
		var btnCancel = '<li><a class="btn btn-flat btn-cancel" data-dialog-close="true">' + textCancel + '</a></li>';
		var input = '';
		var indicator = '';

		if(type === 'alert') {
			btnCancel = '';
		} else if(type === 'prompt') {
			input = '<input type="text" placeholder="">';
		} else if(type === 'passPrompt') {
			input = '<input type="password" placeholder="Password">';
		} else if(type === 'indicator') {
			text = '';
			indicator = '<div class="circle-progress active padded-bottom"><div class="spinner"></div></div>';
		}

		var actions = (type === 'indicator' ? '' : '<ul class="buttons">' +
			btnCancel +
			'<li><a class="btn btn-flat primary btn-confirm" data-dialog-close="true">' + textOk + '</a></li>' +
		'</ul>');

		var alert = '<div class="content">' +
			'<div class="padded-full">' +
				nodeTitle +
				text +
				input +
				indicator +
			'</div>'+
		'</div>' + actions;

		div.innerHTML = alert;

		document.body.appendChild(div);

		return div;
	};


	document.on(phonon.event.start, function (evt) {

		if(dialogs.length > 0) {
			var previous = dialogs[dialogs.length - 1], p = findDialog(evt.target);

			if (!p) {
				if(previous.dialog.getAttribute('data-cancelable') !== 'false') {

					// close the previous active dialog
					close(previous.dialog);

					// call the cancel callback
					if(typeof previous.cancelCallback === 'function') previous.cancelCallback();
				}
			}

			if (p && p !== previous.dialog) {
				// Case where there are two active dialogs
				if (p.id !== previous.dialog.id) {
					close(previous.dialog);
				}
			}
		}
	});

	document.on('tap', function(evt) {

		var trigger = findTrigger(evt.target), dialog = null;

		if (trigger) {
			dialog = getDialog(evt);

			lastTrigger = trigger;

			if(dialog) {

				if(dialog.classList.contains('active')) {
					close(dialog);
				} else {
					open(dialog);
				}
			}
		}
	});

	document.on('keypress', function(evt) {

		if(dialogs.length > 0) {

			if(evt.which == 13 || evt.keyCode == 13) {
				var previous = dialogs[dialogs.length - 1];
								var btnConfirm = previous.dialog.querySelector('.btn-confirm');
								if (btnConfirm && typeof btnConfirm.fireConfirm != 'undefined') {
									btnConfirm.fireConfirm();
								}
								close(previous.dialog);

				return false;
			}
		}

		return true;
	});

	function onHide() {

		var obj = findDialogObject(this.getAttribute('data-id'));
		var backdrop = obj.backdrop;

		backdrop.classList.remove('fadeout');
		document.body.removeChild(backdrop);

		var dialog = obj.dialog;
		dialog.style.visibility = 'hidden';
		dialog.style.display = 'none';

		dialog.classList.remove('close');

		// remove autogenerated dialogs, see: #199
		if (dialog.getAttribute('data-auto')) {
			document.body.removeChild(dialog);
		}

		dialogs.splice(obj.index, 1);

		this.off(phonon.event.transitionEnd, onHide, false);
	}

	function center (target) {

		var computedStyle = getComputedStyle(target),
		width = computedStyle.width,
		height = computedStyle.height;

		width = width.slice(0, width.length - 2);
		height = height.slice(0, height.length - 2);

		var top = (window.innerHeight / 2) - (height / 2);
		target.style.top = top + 'px';
	}

	function open (dialog) {
		dialog.style.visibility = 'visible';
		dialog.style.display = 'block';

		if(!dialog.classList.contains('active')) {

			center(dialog);

			dialog.classList.add('active');

			var preloader = dialog.querySelector('.circle-progress');

			if(preloader) phonon.preloader(preloader).show();

			var backdrop = createBackdrop(dialog.id);
			dialogs.push( {dialog: dialog, backdrop: backdrop} );

			document.body.appendChild(backdrop);
		}
	}

	function close(dialog) {

		off(dialog)

		if(dialog.classList.contains('active')) {

			dialog.classList.remove('active');
			dialog.classList.add('close');

			var preloader = dialog.querySelector('.circle-progress');
			if(preloader) phonon.preloader(preloader).hide();

			var obj = findDialogObject(dialog.id);

			var backdrop = obj.backdrop;

			backdrop.on(phonon.event.transitionEnd, onHide, false);

			// fix issue #62
			window.setTimeout(function() {
				backdrop.classList.add('fadeout');
			}, 1);
		}
	}

	function on(dialog, eventName, callback) {

		fireEvent = function() {

			var input = dialog.querySelector('input');
			var inputValue; // undefined by default
			if(input) {
				inputValue = input.value;
			}

			callback(inputValue);
		};

		if(eventName === 'confirm') {
			var btnConfirm = dialog.querySelector('.btn-confirm');
			if(btnConfirm) {
				btnConfirm.fireConfirm = fireEvent;
				btnConfirm.on('tap', fireEvent);
			}
		} else {

			// keep cancel callback for backdrop taps
			addCancelCallback(dialog, callback);

			var btnCancel = dialog.querySelector('.btn-cancel');
			if(btnCancel) {
				btnCancel.on('tap', fireEvent);
			}
		}
	}

	/**
	 * Resets tap events when the dialog is closed
	 */
	function off(dialog) {

		if(typeof fireEvent !== 'function') return;

		var buttons = dialog.querySelectorAll('.btn-confirm, .btn-cancel');
		if(buttons) {
			var i = 0;
			var l = buttons.length;
			for (; i < l; i++) {
				buttons[i].off('tap', fireEvent)
			}
		}
	}

	function closeActive() {
		var closable = (dialogs.length > 0 ? true : false);
		if(closable) {
			var dialog = dialogs[dialogs.length - 1].dialog;
			if(dialog.getAttribute('data-cancelable') !== 'false') {
				close(dialog);
			}
		}
		return closable;
	}

	phonon.dialog = function(el) {

		if(typeof el === 'undefined') {
			return {
				alert: function(text, title, cancelable, textOk) {
					var dialog = buildDialog('alert', text, title, cancelable, textOk);
					open(dialog);
					return {
						on: function(eventName, callback) {
							on(dialog, eventName, callback);
						}
					};
				},
				confirm: function(text, title, cancelable, textOk, textCancel) {
					var dialog = buildDialog('confirm', text, title, cancelable, textOk, textCancel);
					open(dialog);
					return {
						on: function(eventName, callback) {
							on(dialog, eventName, callback);
						}
					};
				},
				prompt: function(text, title, cancelable, textOk, textCancel) {
					var dialog = buildDialog('prompt', text, title, cancelable, textOk, textCancel);
					open(dialog);
					return {
						on: function(eventName, callback) {
							on(dialog, eventName, callback);
						}
					};
				},
				passPrompt: function(text, title, cancelable, textOk, textCancel) {
					var dialog = buildDialog('passPrompt', text, title, cancelable, textOk, textCancel);
					open(dialog);
					return {
						on: function(eventName, callback) {
							on(dialog, eventName, callback);
						}
					};
				},
				indicator: function(title, cancelable) {
					var dialog = buildDialog('indicator', '', title, cancelable);
					open(dialog);
					return {
						on: function(eventName, callback) {
							on(dialog, eventName, callback);
							return this;
						},
						open: function() {
							open(dialog);
							return this;
						},
						close: function() {
							close(dialog);
							return this;
						}
					};
				}
			}
		}

		var dialog = (typeof el === 'string' ? document.querySelector(el) : el);
		if(dialog === null) {
			throw new Error('The following element ' + el + ' does not exists');
		}

		return {
			open: function() {
				open(dialog);
				return this;
			},
			close: function() {
				close(dialog);
				return this;
			},
			on: function(eventName, callback) {
				on(dialog, eventName, callback);
				return this;
			},
			isActive: function() {
				return (dialog.classList.contains('active') ? true : false);
			}
		};
	};

	phonon.dialogUtil = {
		closeActive: closeActive
	};

	window.phonon = phonon;

	if(typeof exports === 'object') {
		module.exports = phonon.dialog;
	} else if(typeof define === 'function' && define.amd) {
		define(function() { return phonon.dialog });
	}

}(typeof window !== 'undefined' ? window : this, window.phonon || {}));
